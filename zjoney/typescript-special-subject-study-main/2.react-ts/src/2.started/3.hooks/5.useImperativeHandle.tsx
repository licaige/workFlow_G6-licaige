import { useImperativeHandle } from 'react';
type ListProps<ItemType> = {
  items: ItemType[];
  //没有特殊的设置 只有在透传子ref的时候记得
  innerRef?: React.Ref<{ scrollToItem(item: ItemType): void }>;
};

function List<ItemType>(props: ListProps<ItemType>) {
  useImperativeHandle(props.innerRef, () => ({
    scrollToItem() {},
  }));
  return null;
}
