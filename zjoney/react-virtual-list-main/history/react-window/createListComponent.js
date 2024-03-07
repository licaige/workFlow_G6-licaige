import React from 'react';
class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.domRef = React.createRef();
  }
  componentDidMount() {
    if (this.domRef.current) {
      const domNode = this.domRef.current.firstChild;
      const { index, onSizeChange } = this.props;
      this.resizeObserver = new ResizeObserver(() => {
        onSizeChange(index, domNode);
      });
      this.resizeObserver.observe(domNode);
    }
  }
  componentWillUnmount() {
    if (this.resizeObserver && this.domRef.current.firstChild) {
      this.resizeObserver.unobserve(this.domRef.current.firstChild);
    }
  }
  render() {
    const { index, style, ComponentType } = this.props;
    return (
      <div style={style} ref={this.domRef}>
        <ComponentType index={index} />
      </div >
    )
  }
}
function createListComponent({
  getEstimatedTotalSize,
  getItemSize,
  getItemOffset,
  getStartIndexForOffset,//根据向上卷去的高度计算开始索引
  getStopIndexForStartIndex,//根据开始索引和容器的高度计算结束索引
  initInstanceProps,
  getOffsetForIndex
}) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      //这个是类的实例的属性，用来存放内部的些状态变量
      this.instanceProps = initInstanceProps && initInstanceProps(this.props)
      this.state = { scrollOffset: 0, isScrolling: false }
      this.itemStyleCache = new Map();//存放生个条目的样式缓存
      this.outerRef = React.createRef();
      this.oldFirstRef = React.createRef();
      this.oldLastRef = React.createRef();
      this.firstRef = React.createRef();
      this.lastRef = React.createRef();
    }
    static defaultProps = {
      overscanCount: 2,
      useIsScrolling: false
    }
    componentDidMount() {
      //this.observe(this.oldFirstRef.current = this.firstRef.current);//初次渲染
      //this.observe(this.oldLastRef.current = this.lastRef.current);//初次渲染
    }
    componentDidUpdate() {
      /* if (this.oldFirstRef.current !== this.firstRef.current) {
        this.oldFirstRef.current = this.firstRef.current
        this.observe(this.firstRef.current);//每次更新后
      }
      if (this.oldLastRef.current !== this.lastRef.current) {
        this.oldLastRef.current = this.lastRef.current
        this.observe(this.oldLastRef.current);//每次更新后
      } */
    }
    observe = (dom) => {
      let io = new IntersectionObserver(this.onScroll, { root: this.outerRef.current });//观察条目DOM和容器的交叉区域 */
      /*  let io = new IntersectionObserver(entries => {
         entries.forEach(entry => {
           this.onScroll();
         });
       }, { root: this.outerRef.current });//观察条目DOM和容器的交叉区域 */
      io.observe(dom);
    }
    onSizeChange = (index, domNode) => {
      const height = domNode.offsetHeight;
      const { itemMetadataMap, lastMeasuredIndex } = this.instanceProps;
      const itemMetadata = itemMetadataMap[index];
      itemMetadata.size = height;//把此索引对应的条目改为真实的高度
      let offset = 0;
      for (let i = 0; i <= lastMeasuredIndex; i++) {
        const itemMetadata = itemMetadataMap[i];
        itemMetadata.offset = offset;
        offset = offset + itemMetadata.size;//此处累加的是真实的高度
      }
      this.itemStyleCache.clear();
      this.forceUpdate();
    }
    scrollToItem = (index) => {
      const { itemCount } = this.props;
      index = Math.max(0, Math.min(index, itemCount - 1));
      this.scrollTo(
        getOffsetForIndex(this.props, index)
      );
    }
    scrollTo = (scrollOffset) => {
      this.setState({ scrollOffset });
    }
    componentDidUpdate() {
      const { scrollOffset } = this.state;
      this.outerRef.current.scrollTop = scrollOffset;
    }
    render() {
      const { width, height, itemCount, children: ComponentType, isDynamic, useIsScrolling } = this.props;
      const containerStyle = { position: 'relative', width, height, overflow: 'auto', willChange: 'transform' };
      const contentStyle = { width: '100%', height: getEstimatedTotalSize(this.props, this.instanceProps) };
      const items = [];
      const { isScrolling } = this.state;
      if (itemCount > 0) {
        const [startIndex, stopIndex, originStartIndex, originStopIndex] = this.getRangeToRender();
        for (let index = startIndex; index <= stopIndex; index++) {
          if (isDynamic) {//如果需要动态计算的话，走这个逻辑
            let style = this.getItemStyle(index);
            items.push(
              <ListItem key={index} index={index} style={style} ComponentType={ComponentType}
                onSizeChange={this.onSizeChange}
                isScrolling={useIsScrolling && isScrolling}
              />
            );
            /* if (index === originStartIndex) {
              items.push(
                <span key={'span' + index} ref={this.firstRef} style={{ ...style, width: 0, height: 0 }}></span>
              );
              items.push(
                <ListItem key={index} index={index} style={style} ComponentType={ComponentType} onSizeChange={this.onSizeChange} />
              );
            } else if (index === originStopIndex) {
              items.push(
                <span key={'span' + index} ref={this.lastRef} style={{ ...style, width: 0, height: 0 }}></span>
              );
              items.push(
                <ListItem key={index} index={index} style={style} ComponentType={ComponentType} onSizeChange={this.onSizeChange} />
              );
            } else {
              items.push(
                <ListItem key={index} index={index} style={style} ComponentType={ComponentType} onSizeChange={this.onSizeChange} />
              );
            } */
          } else {
            let style = this.getItemStyle(index);
            items.push(
              <ComponentType key={index} index={index} style={style} isScrolling={useIsScrolling && isScrolling} />
            );
            /*  if (index === originStartIndex) {
               items.push(
                 <span key={'span' + index} ref={this.firstRef} style={{ ...style, width: 0, height: 0 }}></span>
               );
               items.push(
                 <ComponentType key={index} index={index} style={style} />
               );
             } else if (index === originStopIndex) {
               items.push(
                 <span key={'span' + index} ref={this.lastRef} style={{ ...style, width: 0, height: 0 }}></span>
               );
               items.push(
                 <ComponentType key={index} index={index} style={style} />
               );
             } else {
               items.push(
                 <ComponentType key={index} index={index} style={style} />
               );
             } */
          }
        }
      }
      return (
        <div style={containerStyle} ref={this.outerRef} onScroll={this.onScroll}>
          <div style={contentStyle}>
            {items}
          </div>
        </div>
      )
    }
    onScroll = () => {
      const { scrollTop } = this.outerRef.current;
      this.setState({ scrollOffset: scrollTop, isScrolling: true }, this._resetIsScrollingDebounced)
    }
    _resetIsScrollingTimeoutId
    _resetIsScrollingDebounced = () => {
      if (this._resetIsScrollingTimeoutId) clearTimeout(this._resetIsScrollingTimeoutId);
      this._resetIsScrollingTimeoutId = setTimeout(() => this.setState({ isScrolling: false }), 150);
    }
    getRangeToRender = () => {
      const { scrollOffset } = this.state;
      const { itemCount, overscanCount } = this.props;
      const startIndex = getStartIndexForOffset(this.props, scrollOffset, this.instanceProps);
      const stopIndex = getStopIndexForStartIndex(this.props, startIndex, scrollOffset, this.instanceProps);
      return [
        Math.max(0, startIndex - overscanCount),
        Math.min(itemCount - 1, stopIndex + overscanCount),
        startIndex,
        stopIndex];
    }
    getItemStyle = (index) => {
      let style;
      if (this.itemStyleCache.has(index)) {
        style = this.itemStyleCache.get(index);
      } else {
        style = {
          position: 'absolute',
          width: '100%',
          height: getItemSize(this.props, index, this.instanceProps),
          top: getItemOffset(this.props, index, this.instanceProps)
        }
        this.itemStyleCache.set(index, style);
      }
      return style;
    }
  }
}

export default createListComponent;