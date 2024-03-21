import { definePropType } from "../../../utils/definePropType";

export const scrollbarProps = {
  height: {
    type: [Number, String],
    default: "",
  },
  maxHeight: {
    type: [Number, String],
    default: "",
  },
  wrapStyle: {
    type: [String, Object],
    default: "",
  },
  native: {
    type: Boolean,
    default: false,
  },
  always: {
    type: Boolean,
    default: false,
  },
  showHorizontalBar: {
    type: Boolean,
    default: false,
  },
  barStyle: {
    type: [Object],
    default: "",
  },
};

export const thumbProps = {
  direction: {
    type: definePropType<"horizontal" | "vertical">(String),
    default: "vertical",
  },
};
