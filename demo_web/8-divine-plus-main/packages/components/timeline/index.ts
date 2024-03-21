import Timeline from "./timeline.vue";
import TimelineItem from "./timeline-item.vue";
import { withInstall } from "@/utils/withInstall";

const DvTimeline = withInstall(Timeline, { TimelineItem });
export default DvTimeline;
