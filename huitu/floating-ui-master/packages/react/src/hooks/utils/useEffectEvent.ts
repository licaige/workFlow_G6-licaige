import * as React from 'react';

type AnyFunction = (...args: any[]) => any;

// `toString()` prevents bundlers from trying to `import { useInsertionEffect } from 'react'`
const useInsertionEffect = (React as any)['useInsertionEffect'.toString()] as
  | AnyFunction
  | undefined;

const useSafeInsertionEffect = useInsertionEffect || ((fn) => fn());

export function useEffectEvent<T extends AnyFunction>(callback?: T) {
  const ref = React.useRef<AnyFunction | undefined>(() => {
    if (__DEV__) {
      throw new Error('Cannot call an event handler while rendering.');
    }
  });

  useSafeInsertionEffect(() => {
    ref.current = callback;
  });

  return React.useCallback<AnyFunction>(
    (...args) => ref.current?.(...args),
    [],
  ) as T;
}
