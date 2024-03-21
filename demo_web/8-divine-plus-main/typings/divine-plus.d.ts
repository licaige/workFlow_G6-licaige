import type { App } from "vue";
import { DivinePlusComponent } from "./component";

import { DvContainer } from "./packages/container";
import { DvHeader } from "./packages/header";
import { DvFooter } from "./packages/footer";
import { DvAside } from "./packages/aside";
import { DvMain } from "./packages/main";

import { DvRow } from "./packages/row";
import { DvCol } from "./packages/col";

import { DvIcon } from "./packages/icon";
import { DvRate } from "./packages/rate";

import { DvEmpty } from "./packages/empty";
import { DvBacktop } from "./packages/backtop";
import { DvTag } from "./packages/tag";
import { DvBadge } from "./packages/badge";

import { DvWatermark } from "./packages/watermark";
import { DvMessage } from "./packages/message";
import { DvScrollbar } from "./packages/scrollbar";
import { DvLoading } from "./packages/loading";
import { DvProgress } from "./packages/progress";
import { DvInfiniteScroll } from "./packages/infinite-scroll";

import { DvTimeline } from "./packages/timeline";
import { DvTimelineItem } from "./packages/timeline-item";

import { DvBreadcrumb } from "./packages/breadcrumb";
import { DvBreadcrumbItem } from "./packages/breadcrumb-item";

import { DvCollapse } from "./packages/collapse";
import { DvCollapseItem } from "./packages/collapse-item";

export interface InstallationOptions {
  locale: any;
  i18n: any;
  size: string;
}

export const version: string;

export function install(vue: App, options?: InstallationOptions): void;

export type Component = DivinePlusComponent;

export const Container: DvContainer;
export const Header: DvHeader;
export const Footer: DvFooter;
export const Aside: DvAside;
export const Main: DvMain;

export const Row: DvRow;
export const Col: DvCol;

export const Icon: DvIcon;
export const Rate: DvRate;

export const Breadcrumb: DvBreadcrumb;
export const BreadcrumbItem: DvBreadcrumbItem;

export const Watermark: DvWatermark;
export const Empty: DvEmpty;
export const Backtop: DvBacktop;
export const Tag: DvTag;
export const Badge: DvBadge;
export const Progress: DvProgress;

export const Timeline: DvTimeline;
export const TimelineItem: DvTimelineItem;

export const DvMessage: DvMessage;
export const Message: DvMessage;
export const Scrollbar: DvScrollbar;
export const Loading: DvLoading;
export const InfiniteScroll: DvInfiniteScroll;

export const Collapse: DvCollapse;
export const CollapseItem: DvCollapseItem;
