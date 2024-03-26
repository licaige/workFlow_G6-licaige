import {
  contains,
  getDocument,
  isMouseLikePointerType,
} from '@floating-ui/react/utils';
import {isElement} from '@floating-ui/utils/dom';
import * as React from 'react';
import useModernLayoutEffect from 'use-isomorphic-layout-effect';

import {
  useFloatingParentNodeId,
  useFloatingTree,
} from '../components/FloatingTree';
import type {
  ElementProps,
  FloatingContext,
  FloatingTreeType,
  OpenChangeReason,
  ReferenceType,
} from '../types';
import {createAttribute} from '../utils/createAttribute';
import {useLatestRef} from './utils/useLatestRef';

const safePolygonIdentifier = createAttribute('safe-polygon');

export interface HandleCloseFn<RT extends ReferenceType = ReferenceType> {
  (
    context: FloatingContext<RT> & {
      onClose: () => void;
      tree?: FloatingTreeType<RT> | null;
      leave?: boolean;
    },
  ): (event: MouseEvent) => void;
  __options: {
    blockPointerEvents: boolean;
  };
}

export function getDelay(
  value: UseHoverProps['delay'],
  prop: 'open' | 'close',
  pointerType?: PointerEvent['pointerType'],
) {
  if (pointerType && !isMouseLikePointerType(pointerType)) {
    return 0;
  }

  if (typeof value === 'number') {
    return value;
  }

  return value?.[prop];
}

export interface UseHoverProps<RT extends ReferenceType = ReferenceType> {
  /**
   * Whether the Hook is enabled, including all internal Effects and event
   * handlers.
   * @default true
   */
  enabled?: boolean;
  /**
   * Instead of closing the floating element when the cursor leaves its
   * reference, we can leave it open until a certain condition is satisfied,
   * e.g. to let them traverse into the floating element.
   * @default null
   */
  handleClose?: HandleCloseFn<RT> | null;
  /**
   * Waits until the user’s cursor is at “rest” over the reference element
   *  before changing the `open` state.
   * @default 0
   */
  restMs?: number;
  /**
   * Waits for the specified time when the event listener runs before changing
   * the `open` state.
   * @default 0
   */
  delay?: number | Partial<{open: number; close: number}>;
  /**
   * Whether the logic only runs for mouse input, ignoring touch input.
   * Note: due to a bug with Linux Chrome, "pen" inputs are considered "mouse".
   * @default false
   */
  mouseOnly?: boolean;
  /**
   * Whether moving the cursor over the floating element will open it, without a
   * regular hover event required.
   * @default true
   */
  move?: boolean;
}

/**
 * Opens the floating element while hovering over the reference element, like
 * CSS `:hover`.
 * @see https://floating-ui.com/docs/useHover
 */
export function useHover<RT extends ReferenceType = ReferenceType>(
  context: FloatingContext<RT>,
  props: UseHoverProps<RT> = {},
): ElementProps {
  const {
    open,
    onOpenChange,
    dataRef,
    events,
    elements: {domReference, floating},
    refs,
  } = context;
  const {
    enabled = true,
    delay = 0,
    handleClose = null,
    mouseOnly = false,
    restMs = 0,
    move = true,
  } = props;

  const tree = useFloatingTree<RT>();
  const parentId = useFloatingParentNodeId();
  const handleCloseRef = useLatestRef(handleClose);
  const delayRef = useLatestRef(delay);

  const pointerTypeRef = React.useRef<string>();
  const timeoutRef = React.useRef<any>();
  const handlerRef = React.useRef<(event: MouseEvent) => void>();
  const restTimeoutRef = React.useRef<any>();
  const blockMouseMoveRef = React.useRef(true);
  const performedPointerEventsMutationRef = React.useRef(false);
  const unbindMouseMoveRef = React.useRef(() => {});

  const isHoverOpen = React.useCallback(() => {
    const type = dataRef.current.openEvent?.type;
    return type?.includes('mouse') && type !== 'mousedown';
  }, [dataRef]);

  // When closing before opening, clear the delay timeouts to cancel it
  // from showing.
  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    function onOpenChange({open}: {open: boolean}) {
      if (!open) {
        clearTimeout(timeoutRef.current);
        clearTimeout(restTimeoutRef.current);
        blockMouseMoveRef.current = true;
      }
    }

    events.on('openchange', onOpenChange);
    return () => {
      events.off('openchange', onOpenChange);
    };
  }, [enabled, events]);

  React.useEffect(() => {
    if (!enabled || !handleCloseRef.current || !open) {
      return;
    }

    function onLeave(event: MouseEvent) {
      if (isHoverOpen()) {
        onOpenChange(false, event, 'hover');
      }
    }

    const html = getDocument(floating).documentElement;
    html.addEventListener('mouseleave', onLeave);
    return () => {
      html.removeEventListener('mouseleave', onLeave);
    };
  }, [floating, open, onOpenChange, enabled, handleCloseRef, isHoverOpen]);

  const closeWithDelay = React.useCallback(
    (
      event: Event,
      runElseBranch = true,
      reason: OpenChangeReason = 'hover',
    ) => {
      const closeDelay = getDelay(
        delayRef.current,
        'close',
        pointerTypeRef.current,
      );
      if (closeDelay && !handlerRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(
          () => onOpenChange(false, event, reason),
          closeDelay,
        );
      } else if (runElseBranch) {
        clearTimeout(timeoutRef.current);
        onOpenChange(false, event, reason);
      }
    },
    [delayRef, onOpenChange],
  );

  const cleanupMouseMoveHandler = React.useCallback(() => {
    unbindMouseMoveRef.current();
    handlerRef.current = undefined;
  }, []);

  const clearPointerEvents = React.useCallback(() => {
    if (performedPointerEventsMutationRef.current) {
      const body = getDocument(refs.floating.current).body;
      body.style.pointerEvents = '';
      body.removeAttribute(safePolygonIdentifier);
      performedPointerEventsMutationRef.current = false;
    }
  }, [refs]);

  // Registering the mouse events on the reference directly to bypass React's
  // delegation system. If the cursor was on a disabled element and then entered
  // the reference (no gap), `mouseenter` doesn't fire in the delegation system.
  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    function isClickLikeOpenEvent() {
      return dataRef.current.openEvent
        ? ['click', 'mousedown'].includes(dataRef.current.openEvent.type)
        : false;
    }

    function onMouseEnter(event: MouseEvent) {
      clearTimeout(timeoutRef.current);
      blockMouseMoveRef.current = false;

      if (
        (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current)) ||
        (restMs > 0 && getDelay(delayRef.current, 'open') === 0)
      ) {
        return;
      }

      const openDelay = getDelay(
        delayRef.current,
        'open',
        pointerTypeRef.current,
      );

      if (openDelay) {
        timeoutRef.current = setTimeout(() => {
          onOpenChange(true, event, 'hover');
        }, openDelay);
      } else {
        onOpenChange(true, event, 'hover');
      }
    }

    function onMouseLeave(event: MouseEvent) {
      if (isClickLikeOpenEvent()) {
        return;
      }

      unbindMouseMoveRef.current();

      const doc = getDocument(floating);
      clearTimeout(restTimeoutRef.current);

      if (handleCloseRef.current) {
        // Prevent clearing `onScrollMouseLeave` timeout.
        if (!open) {
          clearTimeout(timeoutRef.current);
        }

        handlerRef.current = handleCloseRef.current({
          ...context,
          tree,
          x: event.clientX,
          y: event.clientY,
          onClose() {
            clearPointerEvents();
            cleanupMouseMoveHandler();
            closeWithDelay(event, true, 'safe-polygon');
          },
        });

        const handler = handlerRef.current;

        doc.addEventListener('mousemove', handler);
        unbindMouseMoveRef.current = () => {
          doc.removeEventListener('mousemove', handler);
        };

        return;
      }

      // Allow interactivity without `safePolygon` on touch devices. With a
      // pointer, a short close delay is an alternative, so it should work
      // consistently.
      const shouldClose =
        pointerTypeRef.current === 'touch'
          ? !contains(floating, event.relatedTarget as Element | null)
          : true;
      if (shouldClose) {
        closeWithDelay(event);
      }
    }

    // Ensure the floating element closes after scrolling even if the pointer
    // did not move.
    // https://github.com/floating-ui/floating-ui/discussions/1692
    function onScrollMouseLeave(event: MouseEvent) {
      if (isClickLikeOpenEvent()) {
        return;
      }

      handleCloseRef.current?.({
        ...context,
        tree,
        x: event.clientX,
        y: event.clientY,
        onClose() {
          clearPointerEvents();
          cleanupMouseMoveHandler();
          closeWithDelay(event);
        },
      })(event);
    }

    if (isElement(domReference)) {
      const ref = domReference as unknown as HTMLElement;
      open && ref.addEventListener('mouseleave', onScrollMouseLeave);
      floating?.addEventListener('mouseleave', onScrollMouseLeave);
      move && ref.addEventListener('mousemove', onMouseEnter, {once: true});
      ref.addEventListener('mouseenter', onMouseEnter);
      ref.addEventListener('mouseleave', onMouseLeave);
      return () => {
        open && ref.removeEventListener('mouseleave', onScrollMouseLeave);
        floating?.removeEventListener('mouseleave', onScrollMouseLeave);
        move && ref.removeEventListener('mousemove', onMouseEnter);
        ref.removeEventListener('mouseenter', onMouseEnter);
        ref.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, [
    domReference,
    floating,
    enabled,
    context,
    mouseOnly,
    restMs,
    move,
    closeWithDelay,
    cleanupMouseMoveHandler,
    clearPointerEvents,
    onOpenChange,
    open,
    tree,
    delayRef,
    handleCloseRef,
    dataRef,
  ]);

  // Block pointer-events of every element other than the reference and floating
  // while the floating element is open and has a `handleClose` handler. Also
  // handles nested floating elements.
  // https://github.com/floating-ui/floating-ui/issues/1722
  useModernLayoutEffect(() => {
    if (!enabled) {
      return;
    }

    if (
      open &&
      handleCloseRef.current?.__options.blockPointerEvents &&
      isHoverOpen()
    ) {
      const body = getDocument(floating).body;
      body.setAttribute(safePolygonIdentifier, '');
      body.style.pointerEvents = 'none';
      performedPointerEventsMutationRef.current = true;

      if (isElement(domReference) && floating) {
        const ref = domReference as unknown as HTMLElement | SVGSVGElement;

        const parentFloating = tree?.nodesRef.current.find(
          (node) => node.id === parentId,
        )?.context?.elements.floating;

        if (parentFloating) {
          parentFloating.style.pointerEvents = '';
        }

        ref.style.pointerEvents = 'auto';
        floating.style.pointerEvents = 'auto';

        return () => {
          ref.style.pointerEvents = '';
          floating.style.pointerEvents = '';
        };
      }
    }
  }, [
    enabled,
    open,
    parentId,
    floating,
    domReference,
    tree,
    handleCloseRef,
    isHoverOpen,
  ]);

  useModernLayoutEffect(() => {
    if (!open) {
      pointerTypeRef.current = undefined;
      cleanupMouseMoveHandler();
      clearPointerEvents();
    }
  }, [open, cleanupMouseMoveHandler, clearPointerEvents]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  React.useEffect(() => {
    return () => {
      cleanupMouseMoveHandler();
      clearTimeout(timeoutRef.current);
      clearTimeout(restTimeoutRef.current);
      clearPointerEvents();
    };
  }, [enabled, domReference, cleanupMouseMoveHandler, clearPointerEvents]);

  return React.useMemo(() => {
    if (!enabled) {
      return {};
    }

    function setPointerRef(event: React.PointerEvent) {
      pointerTypeRef.current = event.pointerType;
    }

    return {
      reference: {
        onPointerDown: setPointerRef,
        onPointerEnter: setPointerRef,
        onMouseMove(event) {
          if (open || restMs === 0) {
            return;
          }

          clearTimeout(restTimeoutRef.current);
          restTimeoutRef.current = setTimeout(() => {
            if (!blockMouseMoveRef.current) {
              onOpenChange(true, event.nativeEvent, 'hover');
            }
          }, restMs);
        },
      },
      floating: {
        onMouseEnter() {
          clearTimeout(timeoutRef.current);
        },
        onMouseLeave(event) {
          closeWithDelay(event.nativeEvent, false);
        },
      },
    };
  }, [enabled, restMs, open, onOpenChange, closeWithDelay]);
}
