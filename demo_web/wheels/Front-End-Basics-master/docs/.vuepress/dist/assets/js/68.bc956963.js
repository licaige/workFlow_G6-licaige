(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{511:function(n,t,v){"use strict";v.r(t);var a=v(45),_=Object(a.a)({},(function(){var n=this,t=n.$createElement,v=n._self._c||t;return v("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[v("h3",{attrs:{id:"按位取反操作符"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#按位取反操作符"}},[n._v("#")]),n._v(" 按位取反操作符")]),n._v(" "),v("p",[v("a",{attrs:{href:"https://blog.csdn.net/xiexievv/article/details/8124108",target:"_blank",rel:"noopener noreferrer"}},[n._v("引用链接"),v("OutboundLink")],1)]),n._v(" "),v("p",[v("strong",[n._v("首先搞懂  “反码”，“取反”，“按位取反（~）”，这3个概念是不一样的。")])]),n._v(" "),v("ul",[v("li",[v("p",[v("strong",[n._v("取反：0 变 1,1 变 0")])])]),n._v(" "),v("li",[v("p",[v("strong",[n._v("反码：正数的反码是其本身，对于负数其符号位不变其它各位取反(0变1,1变0)")])])]),n._v(" "),v("li",[v("p",[v("strong",[n._v("按位取反(~)： 这将是下面要讨论的。")])])])]),n._v(" "),v("p",[n._v("“~”运算符在c、c++、java、c#中都有，之前一直没有遇到这个运算符。")]),n._v(" "),v("p",[n._v("要弄懂这个运算符的计算方法，首先必须明白二进制数在内存中的存放形式，"),v("strong",[n._v("二进制数在内存中是以补码的形式存放的。")])]),n._v(" "),v("p",[n._v("另外正数和负数的补码不一样，"),v("strong",[n._v("正数的补码、反码都是其本身")]),n._v("，既：")]),n._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[n._v("正数9：\n\n原码为：0000 1001\n\n补码为：0000 1001\n\n反码为：0000 1001\n\n再例如： -2 \n\n求原码：1111 0010 （前面4个1表示符号位）\n\n求反码：1111 1101 （符号位不变，其余各位求反）\n\n求补码：1111 1110 （符号位不变，末位+1）\n\n所以-2在内存中存放为: 1111 1110\n\n")])])]),v("hr"),n._v(" "),v("p",[n._v("弄懂了上述情况后，如何计算就好办了")]),n._v(" "),v("p",[n._v("假设要对正数9按位取反——> (~9)，计算步骤如下，")]),n._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[n._v("原码为0000 1001，\n\n反码为0000 1001，\n\n补码为 0000 1001，\n\n对其取反 1111 0110（符号位一起进行取反,这不是反码更加不是最终结果,只是补码的取反仅此而已）\n\n我们还需要把他转换成原码，因为是负数所以进行负数补码到原码的逆运算\n\n先减1得反码： 1111 0101\n\n取反得原码：1111 1010，（**反码和原码是一个相对的概念，对反码取反就是原码。**取反过程符号位是不变的哦）\n\n前面4个1是符号位，1是负数，既得十进制：-10\n")])])]),v("p",[n._v("不知道说的明不明白，这里步骤就是：")]),n._v(" "),v("ol",[v("li",[v("p",[n._v("先对正数求补码")])]),n._v(" "),v("li",[v("p",[n._v("然后对补码取反，包括符号位")])]),n._v(" "),v("li",[v("p",[n._v("最后进行一个补码求原码的过程，一定要搞清概念啊。")])])]),n._v(" "),v("hr"),n._v(" "),v("p",[n._v("下面我们再反推计算 （~ -10）")]),n._v(" "),v("div",{staticClass:"language- extra-class"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[n._v("-10的原码：1111 1010 \n\n-10的反码：1111 0101 （符号位不变）\n\n-10的补码：1111 0110 （符号位不变，末位+1）\n\n补码取反：**0000 1001** （符号位一起取反）\n")])])]),v("p",[n._v("这是一个正数，那么我们对其求原码就可得到最终结果？")]),n._v(" "),v("p",[n._v("因为正数的补码，反码，原码都是一样的 那我们的最终结果是 0000 1001 ，十进制是 9，这与我们前面推算出的结果吻合。")]),n._v(" "),v("hr"),n._v(" "),v("p",[n._v("最后一个有趣的事实是：")]),n._v(" "),v("ol",[v("li",[v("p",[n._v("所有正整数的按位取反是其本身+1的负数")])]),n._v(" "),v("li",[v("p",[n._v("所有负整数的按位取反是其本身+1的绝对值")])]),n._v(" "),v("li",[v("p",[n._v("零的按位取反是 -1（0在数学界既不是正数也不是负数）")])])]),n._v(" "),v("h3",{attrs:{id:"内网网段"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#内网网段"}},[n._v("#")]),n._v(" 内网网段")]),n._v(" "),v("p",[v("a",{attrs:{href:"http://blog.kankanan.com/article/51857f51-ip-6bb5670954ea4e9b.html",target:"_blank",rel:"noopener noreferrer"}},[n._v("参考链接"),v("OutboundLink")],1)]),n._v(" "),v("p",[n._v("在IPv4地址协议中预留了3个IP地址段，作为私有地址，供组织机构内部使用。\n这三个地址段分别位于A、B、C三类地址内：")]),n._v(" "),v("ul",[v("li",[n._v("A类地址：10.0.0.0--10.255.255.255")]),n._v(" "),v("li",[n._v("B类地址：172.16.0.0--172.31.255.255")]),n._v(" "),v("li",[n._v("C类地址：192.168.0.0--192.168.255.255")])])])}),[],!1,null,null,null);t.default=_.exports}}]);