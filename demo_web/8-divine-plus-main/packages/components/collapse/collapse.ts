import Collapse from "./collapse.vue";
import CollapseItem from "./collapse-item.vue";
import { withInstall } from "@/utils/withInstall";

const DvCollapse = withInstall(Collapse, { CollapseItem });
export default DvCollapse;
