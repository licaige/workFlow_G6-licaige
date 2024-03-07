import { registerMicroApps, start, setDefaultMountApp } from "qiankun";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

createApp(App).mount("#app");
// 开发模式时，entry的值为子应用的开发演示环境的地址
if ("development" === import.meta.env.MODE) {
  registerMicroApps([
    {
      name: "app_01",
      entry: "//localhost:8081/",
      container: "#container",
      activeRule: "/app_01",
    },
    {
      name: "app_02",
      entry: "//localhost:8082/",
      container: "#container",
      activeRule: "/app_02",
    },
  ]);
} else {
  // 生产环境时，entry的路径为app在部署时的真实路径
  registerMicroApps([
    {
      name: "app_01",
      entry: "./sub/app-01",
      container: "#container",
      activeRule: "/app_01",
    },
    {
      name: "app_02",
      entry: "./sub/app-02",
      container: "#container",
      activeRule: "/app_02",
    },
  ]);
}

setDefaultMountApp("/app_01");

// 启动 qiankun
start();
