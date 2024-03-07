import { App as TApp, createApp } from 'vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/es/helper';
import router from 'router'
import 'assets/scss/index.scss'
import App from 'App.vue'

let app: TApp;

function render(props: any) {
  const { container } = props;
  app = createApp(App)
  // 路由挂载
  app.use(router(props))
  const c = container
    ? container.querySelector("#app")
    : document.getElementById("app")
  app.mount(c)
}

renderWithQiankun({
  mount(props) {
    console.log("vue3sub mount", props);
    render(props);
  },
  bootstrap() {
    console.log("bootstrap");
  },
  unmount(props: any) {
    console.log("vue3sub unmount", props);
    app.unmount();
  },
  update(props: any) {
    console.log("vue3sub update", props);
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
