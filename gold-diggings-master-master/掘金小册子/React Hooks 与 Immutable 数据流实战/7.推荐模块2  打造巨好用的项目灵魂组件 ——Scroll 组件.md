> 本节代码对应 GitHub 分支: chapter3

[仓库传送门](https://github.com/sanyuan0704/react-cloud-music/tree/chapter3)

本项目最大的亮点之一就是采用 better-scroll 打造了移动端滑动基础组件，不仅仅可以用在本项目，也可以直接移植到其他所有的移动端 React 项目。现在，我们来一起封装这个实用且强大的组件。

## 分步拆解 scroll 组件

```
// 安装 better-scroll
npm install better-scroll@next --save

```

我们依然采用函数式组件的形式进行开发，不过作为一个通用组件，scroll 组件在业务中会被经常取到原生 DOM 对象，而函数式组件天生不具备被上层组件直接调用 ref 的条件，因此需要用 React 当中一些特殊的方式来处理，即使用 forwardRef 进行包裹。

```
const Scroll = forwardRef ((props, ref) => {
  // 编写组件内容
})

```

首先梳理一下这个组件需要接受哪些参数:

```
Scroll.propTypes = {
  direction: PropTypes.oneOf (['vertical', 'horizental']),// 滚动的方向
  click: true,// 是否支持点击
  refresh: PropTypes.bool,// 是否刷新
  onScroll: PropTypes.func,// 滑动触发的回调函数
  pullUp: PropTypes.func,// 上拉加载逻辑
  pullDown: PropTypes.func,// 下拉加载逻辑
  pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向下吸底
};

```

目前归纳出了这些可能的参数，也正是后面的开发中所需要的，给他们赋默认值:

```
Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

```

现在来写 scroll 组件的核心逻辑代码，首先声明如下 hooks 变量:

```
//better-scroll 实例对象
const [bScroll, setBScroll] = useState ();
//current 指向初始化 bs 实例需要的 DOM 元素 
const scrollContaninerRef = useRef ();

```

从外面接受 props，解构赋值拿到这些参数:

```
const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props;
const { pullUp, pullDown, onScroll } = props;

```

接下来创建 better-scroll，

```
useEffect (() => {
  const scroll = new BScroll (scrollContaninerRef.current, {
    scrollX: direction === "horizental",
    scrollY: direction === "vertical",
    probeType: 3,
    click: click,
    bounce:{
      top: bounceTop,
      bottom: bounceBottom
    }
  });
  setBScroll (scroll);
  return () => {
    setBScroll (null);
  }
}, []);

```

每次重新渲染都要刷新实例，防止无法滑动:

```
useEffect (() => {
  if (refresh && bScroll){
    bScroll.refresh ();
  }
});

```

给实例绑定 scroll 事件，

```
useEffect (() => {
  if (!bScroll || !onScroll) return;
  bScroll.on ('scroll', (scroll) => {
    onScroll (scroll);
  })
  return () => {
    bScroll.off ('scroll');
  }
}, [onScroll, bScroll]);

```

进行上拉到底的判断，调用上拉刷新的函数

```
useEffect (() => {
  if (!bScroll || !pullUp) return;
  bScroll.on ('scrollEnd', () => {
    // 判断是否滑动到了底部
    if (bScroll.y <= bScroll.maxScrollY + 100){
      pullUp ();
    }
  });
  return () => {
    bScroll.off ('scrollEnd');
  }
}, [pullUp, bScroll]);

```

进行下拉的判断，调用下拉刷新的函数

```
useEffect (() => {
  if (!bScroll || !pullDown) return;
  bScroll.on ('touchEnd', (pos) => {
    // 判断用户的下拉动作
    if (pos.y > 50) {
      pullDown ();
    }
  });
  return () => {
    bScroll.off ('touchEnd');
  }
}, [pullDown, bScroll]);

```

完成了滑动事件、上拉下拉事件的判断，现在需要给外界暴露组件方法，如:

```
// 上层组件代码
const scrollRef = useRef ();
...
<Scroll ref={scrollRef}></Scroll>  

```

想要通过这种调用方法的方式刷新 scroll 组件：

```
scrollRef.current.refresh ();

```

这应该怎么办呢？ React Hooks 中的 useImperativeHandle 已经给了我们解决方案，我们这样做就好了:

```
// 一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
useImperativeHandle (ref, () => ({
  // 给外界暴露 refresh 方法
  refresh () {
    if (bScroll) {
      bScroll.refresh ();
      bScroll.scrollTo (0, 0);
    }
  },
  // 给外界暴露 getBScroll 方法，提供 bs 实例
  getBScroll () {
    if (bScroll) {
      return bScroll;
    }
  }
}));

```

剩下的是 UI 的渲染工作:

```
return (
  <ScrollContainer ref={scrollContaninerRef}>
    {props.children}
  </ScrollContainer>
);

```

同时贴出样式部分的 js 代码:

```
const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

```

加载动画部分涉及到 loading 组件我们放到下一章拆解：）

## 综合代码

这里给出综合后的代码:

```
import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from'styled-components';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const Scroll = forwardRef ((props, ref) => {
  const [bScroll, setBScroll] = useState ();

  const scrollContaninerRef = useRef ();

  const { direction, click, refresh,  bounceTop, bounceBottom } = props;

  const { pullUp, pullDown, onScroll } = props;

  useEffect (() => {
    const scroll = new BScroll (scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll (scroll);
    return () => {
      setBScroll (null);
    }
    //eslint-disable-next-line
  }, []);

  useEffect (() => {
    if (!bScroll || !onScroll) return;
    bScroll.on ('scroll', (scroll) => {
      onScroll (scroll);
    })
    return () => {
      bScroll.off ('scroll');
    }
  }, [onScroll, bScroll]);

  useEffect (() => {
    if (!bScroll || !pullUp) return;
    bScroll.on ('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100){
        pullUp ();
      }
    });
    return () => {
      bScroll.off ('scrollEnd');
    }
  }, [pullUp, bScroll]);

  useEffect (() => {
    if (!bScroll || !pullDown) return;
    bScroll.on ('touchEnd', (pos) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDown ();
      }
    });
    return () => {
      bScroll.off ('touchEnd');
    }
  }, [pullDown, bScroll]);


  useEffect (() => {
    if (refresh && bScroll){
      bScroll.refresh ();
    }
  });

  useImperativeHandle (ref, () => ({
    refresh () {
      if (bScroll) {
        bScroll.refresh ();
        bScroll.scrollTo (0, 0);
      }
    },
    getBScroll () {
      if (bScroll) {
        return bScroll;
      }
    }
  }));


  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
    </ScrollContainer>
  );
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

Scroll.propTypes = {
  direction: PropTypes.oneOf (['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向上吸顶
};

export default Scroll;

```

## 在项目中应用

scroll 组件已经初步实现。但是，这还不够。还有一些细节，比如防抖，loading 控制等等，后期会一步一步完善。更重要的是，我们还需要将它运用到项目中，进入到 Recommend 目录下的 index.js，函数返回的 JSX 代码变化如下：

```
<Content>
  <Scroll className="list">
    <div>
      <Slider bannerList={bannerList}></Slider>
      <RecommendList recommendList={recommendList}></RecommendList>
    </div>
  </Scroll>
</Content> 

```

可能你会不解，Content 样式组件是个什么鬼？在这里我要强调一下，better-scroll 的原理并不复杂，就是在容器元素高度固定，当子元素高度超过容器元素高度时，通过 transfrom 动画产生滑动效果，因此它的使用原则就是外部容器必须是固定高度，不然没法滚动。而 Content 就是这个外部容器。

我们在对应 style.js 中增加以下代码:

```
import styled from'styled-components';

export const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
`

```

现在打开页面，你就能体会到下拉吸顶、上拉吸底的感觉了。不过还是有一个问题，当你下拉的时候，中间会有一段空白，感觉比较突兀，没错，这就是默认的背景颜色。那么怎么来解决这个问题呢？

还是从遮罩入手吧，还记得那个.before 的 div 吗？

```
.before {
  position: absolute;
  top: -300px;
  height: 400px;
  width: 100%;
  background: ${style ["theme-color"]};
}

```

如此修改即可，这样下拉间隙就变成了主题色了。