declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

// declare function useNavigate(): NavigateFunction;

// interface NavigateFunction {
//   (
//     to: To,
//     options?: { replace?: boolean; state?: State }
//   ): void;
//   (delta: number): void;
// }


// declare type RefType<T> = T | null;

// declare type LabelValueOptions = {
//   label: string;
//   value: any;
//   [key: string]: string | number | boolean;
// }[];

// declare type TargetContext = '_self' | '_blank';

// declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
//   $el: T;
// }

// declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

// declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

// 定义 State 结构类型
// export type StoreState = number;

declare function Navigate(props: NavigateProps): null;

interface NavigateProps {
  to: To;
  replace?: boolean;
  state?: any;
}

declare function useNavigate(): NavigateFunction;

interface NavigateFunction {
  (
    to: To,
    options?: { replace?: boolean; state?: any }
  ): void;
  (delta: number): void;
}

declare function useNavigationType(): NavigationType;

type NavigationType = "POP" | "PUSH" | "REPLACE";

declare function useLocation(): Location;

interface Location extends Path {
  state: unknown;
  key: Key;
}

declare function useRoutes(
  routes: RouteObject[],
  location?: Partial<Location> | string
): React.ReactElement | null;

declare function useMatch<ParamKey extends string = string>(
  pattern: PathPattern | string
): PathMatch<ParamKey> | null;

declare function matchRoutes(
  routes: RouteObject[],
  location: Partial<Location> | string,
  basename?: string
): RouteMatch[] | null;

interface RouteMatch<ParamKey extends string = string> {
  params: Params<ParamKey>;
  pathname: string;
  route: RouteObject;
}

declare function useHref(to: To): string;

declare function useLinkClickHandler<
  E extends Element = HTMLAnchorElement
>(
  to: To,
  options?: {
    target?: React.HTMLAttributeAnchorTarget;
    replace?: boolean;
    state?: any;
  }
): (event: React.MouseEvent<E, MouseEvent>) => void;

declare function useOutlet(): React.ReactElement | null;

declare function useOutletContext<
  Context = unknown
>(): Context;

declare function useParams<
  K extends string = string
>(): Readonly<Params<K>>;

declare function useResolvedPath(to: To): Path;