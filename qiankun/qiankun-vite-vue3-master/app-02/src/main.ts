// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')

import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

import { App as VueApp, createApp } from "vue";
import App from "./App.vue";

let app: VueApp<Element>;
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  createApp(App).mount("#app");
} else {
  renderWithQiankun({
    mount(props) {
      console.log("--app 02 mount");

      app = createApp(App);
      app.mount(
        (props.container
          ? props.container.querySelector("#app")
          : document.getElementById("app")) as Element
      );
    },
    bootstrap() {
      console.log("--app 02 bootstrap");
    },
    update() {
      console.log("--app 02 update");
    },
    unmount() {
      console.log("--app 02 unmount");
      app?.unmount();
    },
  });
}
