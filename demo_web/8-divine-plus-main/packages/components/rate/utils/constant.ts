export const rateProps = {
  max: {
    type: Number,
    default: 5,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  texts: {
    type: Array,
    default: [],
  },
  showScore: {
    type: Boolean,
    default: false,
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
  allowHalf: {
    type: Boolean,
    default: false,
  },
  iconName: String,
  iconStyle: Object,
  iconSelectedStyle: Object,
  eventBoundary: Object,
};

export type TMax = {
  count: number;
  isHover?: boolean;
  isHalf: boolean;
};

export type TState = {
  max: TMax[];
  hoverIndex: number;
  isHalf: boolean;
};

export type TIconSelectStyle = {
  color?: string;
  fontSize?: string;
};
