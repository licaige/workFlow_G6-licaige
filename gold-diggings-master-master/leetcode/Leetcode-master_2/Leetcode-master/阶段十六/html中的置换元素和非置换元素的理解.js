/**

置换元素是指，该元素有自带的属性，并且css渲染模型不对此内容渲染，就好比img。而非置换元素是对于不是置换元素的都是。而置换元素常见在行内置换元素看到，主要是行内置换元素与行内元素的区别在于可控高度


置换元素的定义如下：

一个 内容 不受 CSS 视觉格式化模型控制，CSS 渲染模型并不考虑对此内容的渲染，且元素本身一般拥有固有尺寸（宽度，高度，宽高比）的元素，被称之为置换元素。

一般来说 span 这种行内非置换元素设置宽高是没有意义的，除非修改 display: inline-block。对于行内置换元素，是可以设置宽高的。比如常用的 img 标签自适应图片时，我们只需要定义一个宽或者高，剩下的就会自动帮我们计算。


置换元素是指：浏览器根据元素的标签和属性，来决定元素的具体显示内容。例如：浏览器根据标签的src属性显示图片。根据标签的type属性决定显示输入框还是按钮。

非置换元素：浏览器中的大多数元素都是不可置换元素，即其内容直接展示给浏览器。例如标签，
标签里的内容会被浏览器直接显示给用户。



*/