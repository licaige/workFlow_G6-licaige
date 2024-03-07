interface IContainer {
  callback: () => {};
  singleton: boolean;
  instance?: {};
}
interface NewAble<T> {
  new (...args: any[]): T;
}
type TBind<T> = [key: string, Fn: NewAble<T>];
class CreateIoc {
  private container: Map<PropertyKey, IContainer>;
  constructor() {
    this.container = new Map<string, IContainer>();
  }
  public bind<T>(...params: TBind<T>) {
    const [key, Fn] = params;
    const callback = () => new Fn();
    this.container.set(key, { callback, singleton: false });
  }
  public use<T>(namspace: string) {
    const item = this.container.get(namspace);
    if (item !== undefined) {
      return item.singleton ? (item.instance as T) : (item?.callback() as T);
    } else {
      throw new Error('没有找到item');
    }
  }
}
interface IUserService {
  test(str: string): void;
}
class UserService implements IUserService {
  constructor() {}
  public test(str: string): void {
    console.log('[ str ]', str);
  }
}
const ioc = new CreateIoc();
ioc.bind('userService', UserService);
const user = ioc.use<IUserService>('userService');
user.test('玛利亚');
