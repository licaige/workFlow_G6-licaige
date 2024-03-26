import {getPlatform} from '@floating-ui/react/utils';
import * as React from 'react';
import useModernLayoutEffect from 'use-isomorphic-layout-effect';

import {useId} from '../hooks/useId';

const activeLocks = new Set<string>();

interface FloatingOverlayProps {
  /**
   * Whether the overlay should lock scrolling on the document body.
   * @default false
   */
  lockScroll?: boolean;
}

/**
 * Provides base styling for a fixed overlay element to dim content or block
 * pointer events behind a floating element.
 * It's a regular `<div>`, so it can be styled via any CSS solution you prefer.
 * @see https://floating-ui.com/docs/FloatingOverlay
 */
export const FloatingOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & FloatingOverlayProps
>(function FloatingOverlay({lockScroll = false, ...rest}, ref) {
  const lockId = useId();

  useModernLayoutEffect(() => {
    if (!lockScroll) return;

    activeLocks.add(lockId);

    const isIOS = /iP(hone|ad|od)|iOS/.test(getPlatform());
    const bodyStyle = document.body.style;
    // RTL <body> scrollbar
    const scrollbarX =
      Math.round(document.documentElement.getBoundingClientRect().left) +
      document.documentElement.scrollLeft;
    const paddingProp = scrollbarX ? 'paddingLeft' : 'paddingRight';
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const scrollX = bodyStyle.left
      ? parseFloat(bodyStyle.left)
      : window.pageXOffset;
    const scrollY = bodyStyle.top
      ? parseFloat(bodyStyle.top)
      : window.pageYOffset;

    bodyStyle.overflow = 'hidden';

    if (scrollbarWidth) {
      bodyStyle[paddingProp] = `${scrollbarWidth}px`;
    }

    // Only iOS doesn't respect `overflow: hidden` on document.body, and this
    // technique has fewer side effects.
    if (isIOS) {
      // iOS 12 does not support `visualViewport`.
      const offsetLeft = window.visualViewport?.offsetLeft || 0;
      const offsetTop = window.visualViewport?.offsetTop || 0;

      Object.assign(bodyStyle, {
        position: 'fixed',
        top: `${-(scrollY - Math.floor(offsetTop))}px`,
        left: `${-(scrollX - Math.floor(offsetLeft))}px`,
        right: '0',
      });
    }

    return () => {
      activeLocks.delete(lockId);

      if (activeLocks.size === 0) {
        Object.assign(bodyStyle, {
          overflow: '',
          [paddingProp]: '',
        });

        if (isIOS) {
          Object.assign(bodyStyle, {
            position: '',
            top: '',
            left: '',
            right: '',
          });
          window.scrollTo(scrollX, scrollY);
        }
      }
    };
  }, [lockId, lockScroll]);

  return (
    <div
      ref={ref}
      {...rest}
      style={{
        position: 'fixed',
        overflow: 'auto',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...rest.style,
      }}
    />
  );
});
