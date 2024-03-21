export const watermarkProps = {
  content: {
    type: String,
    default() {
      return "";
    },
  },
  fontsize: {
    type: String,
    default() {
      return "16px";
    },
  },
  fontcolor: {
    type: String,
    default() {
      return "";
    },
  },
  zIndex: {
    type: [String, Number],
    default() {
      return -9999;
    },
  },
  gap: {
    type: [Number, String],
    default() {
      return 10;
    },
  },
  imgSrc: {
    type: String,
    default() {
      return "";
    },
  },
  imgWidth: {
    type: [Number, String],
    default: 120,
  },
  imgHeight: {
    type: [Number, String],
    default: 64,
  },
};
