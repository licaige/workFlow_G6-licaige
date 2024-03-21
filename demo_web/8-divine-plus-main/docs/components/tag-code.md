```
 <section class="block">
  <h4>Tag 测试</h4>

  <dv-tag class="dvTagStyle">标签一</dv-tag>
  <dv-tag type="success" class="dvTagStyle">标签二</dv-tag>
  <dv-tag type="info" class="dvTagStyle">标签三</dv-tag>
  <dv-tag type="warning" class="dvTagStyle">标签四</dv-tag>
  <dv-tag
    type="danger"
    closable
    class="dvTagStyle"
    @close="onOff"
    v-if="!off"
    >可关闭</dv-tag
  >
  <dv-tag type="primary" backgroundColor="black" class="dvTagStyle"
    >自定义背景颜色</dv-tag
  >
  <dv-tag type="success" class="dvTagStyle" hit>是否带有边框描边</dv-tag>
  <dv-tag type="success" class="dvTagStyle" hit size="small"
    >size/small</dv-tag
  >

  <div style="margin: 20px 0">
    <dv-tag type="success" class="dvTagStyle" theme="dark"
      >主题/dark</dv-tag
    >
    <dv-tag type="success" class="dvTagStyle" them="plain"
      >主题/plain</dv-tag
    >
  </div>
</section>
```
