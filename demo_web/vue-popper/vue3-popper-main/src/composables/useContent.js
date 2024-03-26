import { ref, onMounted, onBeforeUnmount, watch } from "vue";
//观察者模式
export default function useContent(slots, popperNode, content) {
  let observer = null;
  const hasContent = ref(false);

  onMounted(() => {
    if (slots.content !== undefined || content.value) {
      hasContent.value = true;
    }
    // 创建并返回一个新的 MutationObserver 它会在指定的 DOM 发生变化时被调用
    observer = new MutationObserver(checkContent);
    // 配置 MutationObserver 在 DOM 更改匹配给定选项时，通过其回调函数开始接收通知
    observer.observe(popperNode.value, {
      childList: true,
      subtree: true,
    });
  });
  // 阻止 MutationObserver 实例继续接收的通知，直到再次调用其 observe() 方法，
  // 该观察者对象包含的回调函数都不会再被调用。
  onBeforeUnmount(() => observer.disconnect());

  /**
   * Watch the content prop
   */
  watch(content, content => {
    if (content) {
      hasContent.value = true;
    } else {
      hasContent.value = false;
    }
  });

  /**
   * Check the content slot
   */
  const checkContent = () => {
    if (slots.content) {
      hasContent.value = true;
    } else {
      hasContent.value = false;
    }
  };

  return {
    hasContent,
  };
}
