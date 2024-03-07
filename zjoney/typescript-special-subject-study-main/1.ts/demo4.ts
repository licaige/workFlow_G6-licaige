declare function create<T extends new () => any>(c: T): InstanceType<T>;
class dengA {}
class dengB {}

let a1 = create(dengA);
let b1 = create(dengB);
