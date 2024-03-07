import { useCallback, useState, useEffect } from 'react';
interface Dissconnect {
  dissconnect: () => void;
}
export class Stateful<T> {
  private listeners = new Set<(value: T) => void>();
  constructor(protected value: T) {}
  snapshot(): T {
    return this.value;
  }
  private emit() {
    console.log('组件发生了变化', this.listeners);
    for (const listener of Array.from(this.listeners)) {
      listener(this.snapshot());
    }
  }
  protected update(value: T) {
    if (this.value !== value) {
      this.value = value;
      this.emit();
    }
  }
  subscribe(callback: (value: T) => void): Dissconnect {
    this.listeners.add(callback);
    return {
      dissconnect: () => {
        this.listeners.delete(callback);
      },
    };
  }
}

class Atom<T> extends Stateful<T> {
  public setState(value: T) {
    super.update(value);
  }
}
//2.Selector表示一小块派生状态。派生状态是状态通过纯函数计算得来。
class Selector<V> extends Stateful<V> {
  constructor(private readonly generate) {
    super(undefined as any);
    this.value = generate({ get: (dep) => this.addSub(dep) });
  }
  private registerDeps = new Set<Stateful<any>>();
  private addSub(dep) {
    if (!this.registerDeps.has(dep)) {
      dep.subscribe(() => this.updateSecector());
      this.registerDeps.add(dep);
    }
    return dep.snapshot();
  }
  private updateSecector() {
    this.update(this.generate({ get: (dep) => this.addSub(dep) }));
  }
}

export function atom<V>(value: {
  key: string; // 唯一标识
  default: V; // 默认值
}) {
  return new Atom(value.default);
}
// ({ get }) => {};
type SelectorGenerator<T> = (content: { get: <V>(dep: Stateful<T>) => V }) => T;
export function selector<V>(value: {
  key: string; // 唯一标识
  get: SelectorGenerator<V>;
}): Selector<V> {
  return new Selector(value.get);
}

export function useRecoilValue<T>(value: Stateful<T>) {
  const [, updateState] = useState({});
  useEffect(() => {
    const { dissconnect } = value.subscribe(() => updateState({}));
    return () => dissconnect();
  }, [value]);
  return value.snapshot();
}
export function useRecoilState<T>(atom: Atom<T>): [T, (value: T) => void] {
  const value = useRecoilValue(atom);
  return [value, useCallback((value) => atom.setState(value), [atom])];
}
// 1.默认走useRecoilValue
// 2.组件读取 Atom 数据将会隐式订阅它
// 3.() => updateState({}
// 4.atom.setState(value)
