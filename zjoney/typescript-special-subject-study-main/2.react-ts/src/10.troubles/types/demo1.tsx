interface Admin {
  role: string;
}
interface User {
  email: string;
}

// Method 1: use `in` keyword
function redirect(user: Admin | User) {
  if ('role' in user) {
    // use the `in` operator for typeguards since TS 2.7+
    routeToAdminPage(user.role);
  } else {
    routeToHomePage(user.email);
  }
}

// Method 2: 类型保护 是TS本身使用typeof和改进类型的方式instanceof
function isAdmin(user: Admin | User): user is Admin {
  return (user as any).role !== undefined;
}
