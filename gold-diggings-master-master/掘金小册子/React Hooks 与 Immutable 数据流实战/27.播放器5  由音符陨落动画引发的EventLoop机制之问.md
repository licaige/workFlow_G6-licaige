> 本节代码对应 GitHub 分支: chapter8

[仓库传送门](https://github.com/sanyuan0704/react-cloud-music/tree/chapter8)

不是说两个播放器功能已经做完了吗？确实。但是作为一个精美的 APP，我们还要搞！事！情！

话不多说，直接上 gif 效果图：

![](https://user-gold-cdn.xitu.io/2019/10/18/16dde187ddaf8cf6?w=368&h=666&f=gif&s=555679)

是不是很酷炫？

这一节就让我们来开始来一波骚操作：）

## musicNote 动画组件封装

我们先初始化组件:

```
//baseUI/music-note/index.js
import React, {useEffect, useImperativeHandle, useRef, forwardRef} from 'react';
import styled from'styled-components';
import { prefixStyle } from './../../api/utils';
import style from '../../assets/global-style';

const Container = styled.div`
  .icon_wrapper {
    position: fixed;
    z-index: 1000;
    margin-top: -10px;
    margin-left: -10px;
    color: ${style ["theme-color"]};
    font-size: 14px;
    display: none;
    transition: transform 1s cubic-bezier (.62,-0.1,.86,.57);
    transform: translate3d (0, 0, 0);
    >div {
      transition: transform 1s;
    }
  }
`

const MusicNote = forwardRef ((props, ref) => {

  const iconsRef = useRef ();
  // 容器中有 3 个音符，也就是同时只能有 3 个音符下落
  const ICON_NUMBER = 3;

  const transform = prefixStyle ("transform");

  // 原生 DOM 操作，返回一个 DOM 节点对象
  const createNode = (txt) => {
    const template = `<div class='icon_wrapper'>${txt}</div>`;
    let tempNode = document.createElement ('div');
    tempNode.innerHTML = template;
    return tempNode.firstChild;
  }

  useEffect (() => {
    for (let i = 0; i < ICON_NUMBER; i++){
      let node = createNode (`<div class="iconfont">&#xe642;</div>`);
      iconsRef.current.appendChild (node);
    }
    // 类数组转换成数组，当然也可以用 [...xxx] 解构语法或者 Array.from ()
    let domArray = [].slice.call (iconsRef.current.children);
    domArray.forEach (item => {
      item.running = false;
      item.addEventListener ('transitionend', function () {
        this.style ['display'] = 'none';
        this.style [transform] = `translate3d (0, 0, 0)`;
        this.running = false;

        let icon = this.querySelector ('div');
        icon.style [transform] = `translate3d (0, 0, 0)`;
      }, false);
    });
    //eslint-disable-next-line
  }, []);

  return (
    <Container ref={iconsRef}>
    </Container>
  )
})

export default React.memo (MusicNote);

```

接下来是下落动画的处理逻辑了:

```
const startAnimation = ({x, y}) => {
  for (let i = 0; i < ICON_NUMBER; i++) {
    let domArray = [].slice.call (iconsRef.current.children)
    let item = domArray [i]
    // 选择一个空闲的元素来开始动画
    if (item.running === false) {
      item.style.left = x + "px";
      item.style.top = y + "px";
      item.style.display = "inline-block";

      setTimeout (() => {
        item.running = true;
        item.style [transform] = `translate3d (0, 750px, 0)`;
        let icon = item.querySelector ("div");
        icon.style [transform] = `translate3d (-40px, 0, 0)`;
      }, 20);
      break;
    }
  }
};
// 外界调用的 ref 方法
useImperativeHandle (ref, () => ({
  startAnimation
}));

```

解释一下我为什么要用定时器？

1.  因为目前元素的 display 虽然变为了 inline-block, 但是元素显示出来需要・`浏览器的回流` 过程，无法立即显示。 也就是说元素目前还是 `隐藏` 的，那么 `元素的位置未知`，导致 transform 失效
2.  用 setTimout 的本质将动画逻辑放到下一次的 `宏任务`。事实上，当本次的宏任务完成后， 会触发 `浏览器 GUI 渲染线程` 的重绘工作，然后才执行下一次宏任务，那么下一次宏任务中元素就显示了，transform 便能生效。

这个涉及 JS 的 eventLoop 机制，如果有点懵推荐一篇通俗易懂的 [文章](https://juejin.im/post/5d5b4c2df265da03dd3d73e5):

## 动画运用到组件

首先我们需要改造 SongsList 组件。SongsList 其实是一个相当关键的组件，在很多地方都需要复用，而且和播放器的数据有交互，因此单独封装成一个应用型的组件。

```
import { changePlayList, changeCurrentIndex, changeSequecePlayList } from './../../application/Player/store/actionCreators';
import { connect } from 'react-redux';

//...
const { changePlayListDispatch, changeCurrentIndexDispatch, changeSequecePlayListDispatch } = props;

// 接受触发动画的函数
const { musicAnimation } = props;

const selectItem = (e, index) => {
  changePlayListDispatch (songs);
  changeSequecePlayListDispatch (songs);
  changeCurrentIndexDispatch (index);
  musicAnimation (e.nativeEvent.clientX, e.nativeEvent.clientY);
}
//...

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    changePlayListDispatch (data){
      dispatch (changePlayList (data));
    },
    changeCurrentIndexDispatch (data) {
      dispatch (changeCurrentIndex (data));
    },
    changeSequecePlayListDispatch (data) {
      dispatch (changeSequecePlayList (data))
    }
  }
};

// 将 ui 组件包装成容器组件
export default connect (null, mapDispatchToProps)(React.memo (SongsList));

```

这样一来，我们就不用模拟 playList 的数据啦。我们把 player/reducer 中 defaultState 里的 playList 和 sequenceList 置为 \[\]。

```
//player/index.js 中这份 mock 的代码也删除
useEffect (() => {
  changeCurrentIndexDispatch (0);
}, [])

```

### 歌手页音符实现

```
//Singer/index.js
import MusicNote from "../../baseUI/music-note/index";

//...
const musicNoteRef = useRef ();

const musicAnimation = (x, y) => {
  musicNoteRef.current.startAnimation ({ x, y });
};

return (
  <CSSTransition>
    <Contaniner>
      //...
        <SongsList
          songs={songs}
          showCollect={false}
          musicAnimation={musicAnimation}
        ></SongsList>
      //...
      <MusicNote ref={musicNoteRef}></MusicNote>
    </Contaniner>
  </CSSTransition>
)

```

### 歌单详情页音符实现

```
//Album/index.js
import MusicNote from "../../baseUI/music-note/index";

//...
const musicNoteRef = useRef ();

const musicAnimation = (x, y) => {
  musicNoteRef.current.startAnimation ({ x, y });
};

return (
  <CSSTransition>
    <Contaniner>
      //...
        <SongsList
          songs={currentAlbum.tracks}
          collectCount={currentAlbum.subscribedCount}
          showCollect={true}
          showBackground={true}
          musicAnimation={musicAnimation}
        ></SongsList>
      //...
      <MusicNote ref={musicNoteRef}></MusicNote>
    </Contaniner>
  </CSSTransition>
)

```

现在就成功地集成了音符掉落的动画了！