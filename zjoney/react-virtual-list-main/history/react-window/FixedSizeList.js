import React from 'react';
import createListComponent from './createListComponent';

const FixedSizeList = createListComponent({
  getEstimatedTotalSize: ({ itemSize, itemCount }) => itemSize * itemCount, //预计内容的高度为每个条目的高度乘以条目数
  getItemSize: ({ itemSize }, index) => itemSize,
  getItemOffset: ({ itemSize }, index) => itemSize * index,
  getStartIndexForOffset: ({ itemSize }, offset) => Math.floor(offset / itemSize),
  getStopIndexForStartIndex: ({ height, itemSize }, startIndex) => {
    const numVisibleItems = Math.ceil(height / itemSize)//容器的高度除以每个条目的高度等于显示的条目数量
    return startIndex + numVisibleItems - 1;//因为结束索引是闭区间，也会包含在渲染列表里，所以要-1
  },
  getOffsetForIndex: (props, index) => {
    const { itemSize } = props;
    return itemSize * index;
  }
});
export default FixedSizeList;