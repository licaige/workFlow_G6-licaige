import Breadcrumb from "./breadcrumb.vue";
import BreadcrumbItem from "./breadcrumb-item.vue";
import { withInstall } from "../../utils";

const DvBreadcrumb = withInstall(Breadcrumb, { BreadcrumbItem });
export default DvBreadcrumb;
