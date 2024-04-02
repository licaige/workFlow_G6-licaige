(window.webpackJsonp=window.webpackJsonp||[]).push([[155],{628:function(t,a,v){"use strict";v.r(a);var r=v(45),s=Object(r.a)({},(function(){var t=this,a=t.$createElement,v=t._self._c||a;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"javascript-基础算法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#javascript-基础算法"}},[t._v("#")]),t._v(" JavaScript 基础算法")]),t._v(" "),v("h2",{attrs:{id:"算法中解决问题的两种思想"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#算法中解决问题的两种思想"}},[t._v("#")]),t._v(" 算法中解决问题的两种思想")]),t._v(" "),v("h3",{attrs:{id:"递归"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#递归"}},[t._v("#")]),t._v(" 递归")]),t._v(" "),v("p",[t._v("递归算法是一种函数调用自身的算法。")]),t._v(" "),v("p",[t._v("递归的基本性质就是函数调用，在处理问题的时候，递归往往是把一个大规模的问题不断地变小然后进行推导的过程。具体来说就是将一个问题的规模变小，然后再利用从小规模问题中得出的结果，结合当前的值或者情况，得出最终的结果。")]),t._v(" "),v("p",[t._v("通俗来说，把要实现的递归函数看成是已经实现好的，直接利用，解决一些子问题，然后需要考虑的就是如何根据子问题的解以及当前面对的情况得出答案。这种算法也被称为自顶向下（Top-Down）算法。")]),t._v(" "),v("h4",{attrs:{id:"递归一般的解题步骤"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#递归一般的解题步骤"}},[t._v("#")]),t._v(" 递归一般的解题步骤")]),t._v(" "),v("ol",[v("li",[t._v("判断当前情况是否非法，如果非法就立即返回，这一步也称为完整性检查（Sanity Check）。例如：看看当前处理的情况是否越界，是否出现了不满足条件的情况。通常，这一部分代码都是写在最前面的")]),t._v(" "),v("li",[t._v("判断是否满足结束递归的条件。在这一步中，处理的基本上都是一些推导过程中所定义的初始情况。")]),t._v(" "),v("li",[t._v("将问题的规模缩小，递归调用。在归并排序和快速排序中将问题的规模缩小了一半，而在汉诺塔或者 leetcode 91 题解码的例子中是将问题的规模缩小了一个。")]),t._v(" "),v("li",[t._v("利用在小规模问题中的答案，结合当前的数据进行整合，得出最终的答案。")])]),t._v(" "),v("h3",{attrs:{id:"回溯"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#回溯"}},[t._v("#")]),t._v(" 回溯")]),t._v(" "),v("p",[t._v("回溯实际上是一种试探算法，这种算法跟暴力搜索最大的不同在于，在回溯算法里，是一步一步地小心翼翼地进行向前试探，会对每一步探测到的情况进行评估，如果当前的情况已经无法满足要求，那么就没有必要继续进行下去。")]),t._v(" "),v("p",[t._v("回溯算法的特点在于，当出现非法的情况时，算法可以回退到之前的情景，可以是返回一步，有时候甚至可以返回多步，然后再去尝试别的路径和办法。这也就意味着，想要采用回溯算法，就必须保证每次都有多种尝试的可能。")]),t._v(" "),v("h4",{attrs:{id:"回溯一般的解题步骤"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#回溯一般的解题步骤"}},[t._v("#")]),t._v(" 回溯一般的解题步骤")]),t._v(" "),v("ol",[v("li",[t._v("判断当前情况是否非法，如果非法就立即返回。")]),t._v(" "),v("li",[t._v("当前情况是否已经满足递归结束条件，如果是就将当前结果保存起来并返回。")]),t._v(" "),v("li",[t._v("当前情况下，遍历所有可能出现的情况并进行下一步的尝试。")]),t._v(" "),v("li",[t._v("递归完毕后，立即回溯，回溯的方法就是取消前一步进行的尝试")])])])}),[],!1,null,null,null);a.default=s.exports}}]);