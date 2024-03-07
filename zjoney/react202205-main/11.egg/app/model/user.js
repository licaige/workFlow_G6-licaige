module.exports = app => {
  const { INTEGER, DATE, STRING } = app.Sequelize;
  const User = app.model.define('User', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE
  });
  return User;//就可以在控制器和服务中通过app.model.User ctx.model.User
}