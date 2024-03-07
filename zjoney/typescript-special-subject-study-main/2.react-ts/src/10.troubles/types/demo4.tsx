// unique symbol
// const sym = Symbol('foo');

// function extendObject(obj: any, sym: symbol, value: any) {
//   obj[sym] = value;
// }

// extendObject({}, sym, 42); // Works with all symbols
//================================================================
type OrderID = string & { readonly brand: unique symbol };
type UserID = string & { readonly brand: unique symbol };
type ID = OrderID | UserID;
//伴侣对象模式顶替如上
function OrderID(id: string) {
  return id as OrderID;
}
function UserID(id: string) {
  return id as UserID;
}
function queryForUser(id: UserID) {
  // ...
}
//这样去锁定错误
queryForUser(OrderID('foobar'));
