import CreateListComponenC from "./createListComponent";

const FixedSizeList = CreateListComponenC({
  getItemHeight: ({ itemHeight }) => itemHeight,//每个条目的高度
  getEstimatedTotalSize: ({ itemHeight, itemCount }) => itemHeight * itemCount, //获取预计的总高度
  getItemOffset: ({ itemHeight }, index) => itemHeight * index, //获取每个条目的偏移量
  getStartIndexForOffset: ({ itemHeight }, offset) => Math.floor(offset / itemHeight),//获取起始索引
  getStopIndexForStartIndex: ({ height, itemHeight }, startIndex) => {//获取结束索引
    const numVisibleItems = Math.ceil(height / itemHeight);
    return startIndex + numVisibleItems - 1;
  },
  getOffsetForIndex: (props, index) => {
    debugger
    const { itemHeight } = props;
    return itemHeight * index;
  }
})

export default FixedSizeList

