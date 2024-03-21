// 1
// 如果报错：找不到模块，需要配置两个地方
// - a. 在 components 文件夹下编写 index.d.ts
// - b. 在 package.json 中 include 添加路径  "packages/components/*"

// 2
// 注意区分：别名的设置
import BackTop from "./index.vue";
import { withInstall } from "../../utils/withInstall";

const DvBacktop = withInstall(BackTop);
export default DvBacktop;
