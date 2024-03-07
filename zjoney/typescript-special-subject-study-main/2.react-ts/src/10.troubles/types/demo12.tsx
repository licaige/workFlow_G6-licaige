//扩展下reactdom
declare module "react-router-dom" {
    import * as React from 'react';
    // ...
    type NavigateProps<T> = {
      to: string | number,
      replace?: boolean,
      state?: T
    }
    //...
    export class Navigate<T = any> extends React.Component<NavigateProps<T>>{}
