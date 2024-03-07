import createListComponent from './createListComponent';
const DEFAULT_ESTIMATED_SIZE = 50;//默认情况下，如果用户不传的话，会有默认的条目高度
//计算或者说预估内容的总高度
const getEstimatedTotalSize = ({ itemCount }, { estimatedItemSize, itemMetadataMap, lastMeasuredIndex }) => {
  //此处应该是测量过的真实高度+未测试过的预估高度
  let totalSizeOfMeasuredItems = 0;//测试过的总高度
  if (lastMeasuredIndex >= 0) {
    const itemMetadata = itemMetadataMap[lastMeasuredIndex];
    totalSizeOfMeasuredItems = itemMetadata.offset + itemMetadata.size;
  }
  const numUnMeasuredItems = itemCount - lastMeasuredIndex - 1;//未测试过的条目的数量
  const totalSizeOfUnmeasuredItems = numUnMeasuredItems * estimatedItemSize;//未测试过的条目的总高度
  //总高度=测量过的高度+未测试过的高度
  return totalSizeOfMeasuredItems + totalSizeOfUnmeasuredItems;
}
//查找最近的条目 
function findNearestItem(props, instanceProps, offset) {
  const { lastMeasuredIndex, itemMetadataMap } = instanceProps;//后面如果lastMeasuredIndex如果有值的话
  let lastMeasuredItemOffset = lastMeasuredIndex > 0 ? itemMetadataMap[lastMeasuredIndex].offset : 0;
  //在源码里此处用的是二分查找，把时间复杂度从n=>logN
  if (lastMeasuredItemOffset >= offset) {//说明此卷去高度对应的条目已经测试过高度了，可以直接查找它的索引
    return findNearestItemBinarySearch(props, instanceProps, lastMeasuredIndex, 0, offset);
  } else {
    return findNearestItemExponentialSearch(props, instanceProps, Math.max(0, lastMeasuredIndex), offset);
  }
}
function findNearestItemExponentialSearch(props, instanceProps, index, offset) {
  const { itemCount } = props;
  let interval = 1;
  //找到offset值大于等于当前容器向上卷曲的高度的offset值
  while (index < itemCount && getItemMetadata(props, index, instanceProps).offset < offset) {
    index += interval;
    interval *= 2;
  }
  return findNearestItemBinarySearch(props, instanceProps, Math.min(index, itemCount - 1), Math.floor(index / 2), offset);
  // 1 2 4 8 16 32 64
}
function findNearestItemBinarySearch(props, instanceProps, high, low, offset) {
  while (low <= high) {
    const middle = low + Math.floor(((high - low) / 2));
    const currentOffset = getItemMetadata(props, middle, instanceProps).offset;
    if (currentOffset === offset) {
      return middle;
    } else if (currentOffset < offset) {
      low = middle + 1;
    } else if (currentOffset > offset) {
      high = middle - 1;
    }
  }
  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
}

//获取每个条目对应的元数据 index=>{ size, offset }
function getItemMetadata(props, index, instanceProps) {
  const { itemSize } = props;//可以根据索引获取每个条目的高度
  const { itemMetadataMap, lastMeasuredIndex } = instanceProps;
  //当前你想获取的条目比上一次测量过的条索引还要大，说明此条目尚未测试过，还不知道它真实的offset size
  if (index > lastMeasuredIndex) {
    //计算上一次测试过的那个条目它的下一个offset是多少
    let offset = 0;
    if (lastMeasuredIndex >= 0) {
      const itemMetadata = itemMetadataMap[lastMeasuredIndex];
      offset = itemMetadata.offset + itemMetadata.size;//这是计算上一次测量过的条目的下一个条条目的offset值
    }
    for (let i = lastMeasuredIndex + 1; i <= index; i++) {
      let size = itemSize ? itemSize(i) : DEFAULT_ESTIMATED_SIZE;//通过调用itemSize方法获取此索引对应的条目的高度
      itemMetadataMap[i] = { size, offset };//把此条目对应的高度size和刚刚计算出来的offset值放到元数据中进行保存
      offset += size;//下一个条目的offset是自己的offset+自己的高度
    }
    instanceProps.lastMeasuredIndex = index;
  }
  return itemMetadataMap[index]
}
const VariableSizeList = createListComponent({
  getEstimatedTotalSize, //预计内容的高度为每个条目的高度乘以条目数
  getItemSize: (props, index, instanceProps) => getItemMetadata(props, index, instanceProps).size,
  getItemOffset: (props, index, instanceProps) => getItemMetadata(props, index, instanceProps).offset,
  getStartIndexForOffset: (props, offset, instanceProps) => findNearestItem(props, instanceProps, offset),
  getStopIndexForStartIndex: (props, startIndex, scrollOffset, instanceProps) => {
    const { height, itemCount } = props;
    //获取开始索引对应的元数据
    const itemMetadata = getItemMetadata(props, startIndex, instanceProps);
    //最大的offset值 起始条目offset+容器的高度
    const maxOffset = itemMetadata.offset + height;
    let offset = itemMetadata.offset + itemMetadata.size;
    let stopIndex = startIndex;
    while (stopIndex < itemCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemMetadata(props, stopIndex, instanceProps).size;//每次索引加1，offset加上每个条目的高度
    }
    return stopIndex;
  },
  initInstanceProps: (props) => {
    const { estimatedItemSize } = props;//先从属性要获取预估预计的条目高度
    const instanceProps = {
      estimatedItemSize: estimatedItemSize || DEFAULT_ESTIMATED_SIZE,
      itemMetadataMap: {},//记录每个条目的信息{size:每个索引对应的条目的高度,offset:生个索引对应的条目的top值，也就是偏移量}
      lastMeasuredIndex: -1 //在渲染的过程中不停的真实测量每个条目的高度 ,测量其实就是计算每个条目真正的高度和offset值/top值
    }
    return instanceProps;
  },
  getOffsetForIndex: (props, index) => {
    const { itemSize } = props;
    return itemSize * index;
  }
});
export default VariableSizeList;




//为什么使用HOC。因为逻辑复用，不同的组件
//VariableSizeList FixedSizeList会通过 createListComponent这个高阶组件实现逻辑的复用
//因为每个条目高度不一样，所以我们需要记录或者保存每个条目它的高度和offset值，方便进行读写计算
//index={size,offset}