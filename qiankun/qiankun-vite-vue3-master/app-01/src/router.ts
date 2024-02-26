import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";
import { createRouter, createWebHashHistory } from "vue-router";
import PageO1 from "./views/Page01.vue";
import PageO2 from "./views/Page02.vue";

const router = createRouter({
  history: createWebHashHistory(
    qiankunWindow.__POWERED_BY_QIANKUN__ ? "/app-01" : "/"
  ),
  routes: [
    {
      path: "/page01",
      component: PageO1,
    },
    {
      path: "/page02",
      component: PageO2,
    },
  ],
});

export default router;
