module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.index);
  router.get('/users', controller.users.index);

  router.get('/add', controller.users.add);
  router.post('/doAdd', controller.users.doAdd);
}