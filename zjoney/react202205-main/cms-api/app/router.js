'use strict';
/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/', controller.home.index);
  router.resources('entity', '/entity', controller.entity);
  router.resources('menu', '/menu', controller.menu);
  router.resources("book", "/book", controller.book);
};