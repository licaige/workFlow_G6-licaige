import type { ComputedRef } from "vue";
export const COLLAPSE = Symbol("collapse");

export interface ICollapseProvider {
  activeNames: ComputedRef<string[]>;
  onClickItem: (name: string) => void;
}
