import React from 'react';
import { UNSAFE_RouteContext } from 'react-router-dom';
const NavigationContext = React.createContext();
const LocationContext = React.createContext();
const RouteContext = React.createContext();
export { NavigationContext, LocationContext }
/**
 * 底层的路由容器
 * @param {*} children 要渲染的子节点 
 * @param {*} location 路径
 * @param {*} navigator 导航器
 */
export function Router({ children, location, navigator }) {
  return (
    <NavigationContext.Provider value={{ navigator }}>
      <LocationContext.Provider value={{ location }}>
        {children}
      </LocationContext.Provider>
    </NavigationContext.Provider>
  )
}
export function Routes({ children }) {//children=[Route,Route,Route]
  return useRoutes(createRoutesFromChildren(children));
}
export function Route() {
  return null;
}
export function useLocation() {
  return React.useContext(LocationContext).location;
}
export function useSearchParams() {
  const location = React.useContext(LocationContext).location;
  const pathname = location.pathname;
  return new URLSearchParams(pathname.split('?')[1]);
}
export function useParams() {
  let { matches } = React.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch?.params || {};
}
export function useRoutes(routes) {
  let location = useLocation();
  let pathname = location.pathname;
  //获取匹配的结果
  let matches = matchRoutes(routes, { pathname });
  //渲染匹配的结果
  return _renderMatches(matches);
}
function _renderMatches(matches) {
  if (!matches) return null;
  return matches.reduceRight((outlet, match, index) => {
    return (
      <RouteContext.Provider value={{ outlet, matches: matches.slice(0, index + 1) }}>
        {match.route.element}
      </RouteContext.Provider>
    )
  }, null);
}

export function useOutlet() {
  let { outlet } = React.useContext(RouteContext);
  return outlet;
}
export function Outlet() {
  return useOutlet();
}
function matchRoutes(routes, location) {
  //获取路径名
  let pathname = location.pathname;
  //打平所有的分支路径
  let branches = flattenRoutes(routes);
  console.log(branches);
  rankRouteBranches(branches);
  let matches = null;
  //如果有一个分支匹配了，后面的就走了，直接返回渲染就可以了
  for (let i = 0; matches == null && i < branches.length; i++) {
    matches = matchRouteBranch(branches[i], pathname);
  }
  return matches;
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => {
    return a.score !== b.score ? b.score - a.score :
      compareIndexes(
        a.routesMeta.map(meta => meta.childrenIndex),
        b.routesMeta.map(meta => meta.childrenIndex),
      )
  });
}
/**
 * 比较a和b的索引
 * @param {*} a 是一个数组
 * @param {*} b 是一个数组
 */
function compareIndexes(a, b) {
  //先判断是不是兄弟 
  let sibling = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return sibling ? a[a.length - 1] - b[b.length - 1] : 0;
}
/**
 * 把当前的路径匹配分支
 * @param {*} branch 
 * @param {*} pathname 
 */
function matchRouteBranch(branch, pathname) {
  const { routesMeta } = branch;
  let matchesParams = {};    //路径参数对象 /user/detail/:id
  let matchedPathname = '/'; //已经匹配过的路径名
  let matches = [];
  //routesMeta:['/user','/add']
  for (let i = 0; i < routesMeta.length; i++) {
    let meta = routesMeta[i];//取出当前的meta对象
    let end = i === routesMeta.length - 1;//判断是否是最后一个meta对象
    //剩下将要匹配的路径
    let remainingPathname = matchedPathname === '/' ? pathname : pathname.slice(matchedPathname.length)
    //用meta里的相对路径和剩下的路径进行匹配
    let match = matchPath({ path: meta.relativePath, end }, remainingPathname);
    if (!match) return null;
    Object.assign(matchesParams, match.params);//合并本次匹配过程中创建的params路径参数对象，全并到matchesParams上
    matches.push({
      params: matchesParams,//路径参数
      pathname: joinPaths([matchedPathname, match.pathname]),//路径名 匹配的父路径加上本次匹配的路径 /usr/add
      pathnameBase: joinPaths([matchedPathname, match.pathnameBase]),//把*部分的内容给去掉回退回去 /user
      route: meta.route //路由信息
    });
    if (match.pathnameBase !== '/') {// 如果base的值
      //匹配的路径名在不停的变化中   /  /user   ///user  /user
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
const isSplat = s => s === '*';
const splatPenalty = -2;//如果路径里有*的话，说明是有通配符，分数-2
const indexRouteValue = 2;// 如果index有值的话，加上2分
const paramRe = /^:\w+$/;// :id :name
const dynamicSegmentValue = 3;
const emptySegmentValue = 1;
const staticSegmentValue = 10;

/**
 * 计算每个分支的分数
 * @param {*} path /user/add
 * @param {*} index 0/1/2
 */
function computeScore(path, index) {
  let segments = path.split('/');// /user/add=>['','user','add']
  let initialScore = segments.length;//基础分类就是分片数组的长度   /user 2  /usr/add 3
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  //1.过滤掉星 
  return segments.filter(s => !isSplat(s)).reduce((score, segment) => {
    return score + (
      paramRe.test(segment) ? dynamicSegmentValue : segment === '' ? emptySegmentValue : staticSegmentValue
    );
  }, initialScore)
}

/**
 * 打平所有的或者说拍平所有的分支
 * @param {*} routes 路由配置数组
 * @param {*} branches 分支
 * @param {*} parentMeta 父meta数组
 * @param {*} parentPath 父路径字符串
 */
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = '') {
  routes.forEach((route, index) => {
    let meta = {
      route,//{path:'/user/*',element=<User />}
      childrenIndex: index,//索引 0
      relativePath: route.path || ''// /user/*
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    branches.push({
      path,//不能直接用它进行匹配，为什么?
      routesMeta,
      score: computeScore(path, route.index)
    });
  });
  return branches;
}
function joinPaths(paths) {// /user/   /add  => /user///add => /usr/add
  return paths.join('/').replace(/\/\/+/g, '/');
}
function compilePath(path, end) {
  ///post/:id /post/100
  let paramNames = [];
  let regexpSource = "^" + path
    .replace(/\/*\*?$/, '')//把结束的 /* //* *全部转为空  /user
    .replace(/^\/*/, '/')//把开头的0个/或者1 个/或者多个 /变成一个/    add=?/add  ///add  /add
    .replace(/:(\w+)/g, (_, key) => {//key=id
      paramNames.push(key);
      return "([^\\/]+)";
    })
  //判断path是否以 * 结束 
  if (path.endsWith('*')) {
    paramNames.push('*');//把*添加到路径参数数组名数组中
    regexpSource += (
      path === '*' || path === '/*' ? "(.*)$" : "(?:\\/(.+)|\\/*)$"
    )
  } else {
    regexpSource += end ? "\\/*$" : "(?:\b|\\/|$)"
  }
  const matcher = new RegExp(regexpSource);
  return [matcher, paramNames];
}
export function matchPath({ path, end }, pathname) {
  let [matcher, paramNames] = compilePath(path, end);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, '$1');//把结束的/去掉，base里都是没有结束的/的
  let values = match.slice(1);
  let captureGroups = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index) => {
    if (paramName === '*') {
      let starValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - starValue.length).replace(/(.)\/+$/, '$1')
    }
    memo[paramName] = values[index];
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase
  }

}
export function createRoutesFromChildren(children) {
  const routes = [];
  React.Children.forEach(children, child => {
    let route = {
      path: child.props.path,//待匹配的路径
      element: child.props.element//要渲染的元素
    }
    if (child.props.children) {
      route.children = createRoutesFromChildren(child.props.children);
    }
    routes.push(route);
  });
  return routes;
}
// routes=[{path,element,children:[]}]

export function useNavigate() {
  const { navigator } = React.useContext(NavigationContext);//navigator=history
  let navigate = React.useCallback((to) => {
    navigator.push(to);//history.push(to);
  }, [navigator]);
  return navigate;
}

export function Navigate({ to }) {
  let navigate = useNavigate();
  React.useLayoutEffect(() => {
    navigate(to)
  });
  return null;
} 