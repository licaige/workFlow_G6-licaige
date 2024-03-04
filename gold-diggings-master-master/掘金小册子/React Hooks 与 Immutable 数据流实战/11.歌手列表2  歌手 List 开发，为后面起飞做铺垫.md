> 本节代码对应 GitHub 分支: chapter4

[仓库传送门](https://github.com/sanyuan0704/react-cloud-music/tree/chapter4)

为了做出小小的分类横向滚动列表，可谓花了不少的力气。不过做完了这个，再来开发歌手列表，简直易如反掌了。

进入 Singers/index.js, 增加以下代码，

```
//mock 数据
const singerList = [1, 2,3, 4,5,6,7,8,9,10,11,12].map (item => {
  return {
    picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    name: "隔壁老樊",
    accountId: 277313426,
  }
}); 

// 渲染函数，返回歌手列表
const renderSingerList = () => {
  return (
    <List>
      {
        singerList.map ((item, index) => {
          return (
            <ListItem key={item.accountId+""+index}>
              <div className="img_wrapper">
                <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          )
        })
      }
    </List>
  )
};

```

然后将返回的 JSX 代码做一些改动:

```
return (
  <div>
    <NavContainer>
      <Horizen 
        list={categoryTypes} 
        title={"分类 (默认热门):"} 
        handleClick={(val) => handleUpdateCatetory (val)} 
        oldVal={category}></Horizen>
      <Horizen 
        list={alphaTypes} 
        title={"首字母:"} 
        handleClick={val => handleUpdateAlpha (val)} 
        oldVal={alpha}></Horizen>
    </NavContainer> 
    <ListContainer>
      <Scroll>
        { renderSingerList () }
      </Scroll>
    </ListContainer>
  </div>
)

```

现在项目会报错，因为样式组件还没有定义，我们在 style.js 中添加：

```
export const ListContainer = styled.div`
  position: fixed;
  top: 160px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
`;

export const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin:10px 0 10px 10px;
    color: ${style ["font-color-desc"]};
    font-size: ${style ["font-size-s"]};
  }
`;
export const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  padding: 5px 0;
  align-items: center;
  border-bottom: 1px solid ${style ["border-color"]};
  .img_wrapper {
    margin-right: 20px;
    img {
      border-radius: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name {
    font-size: ${style ["font-size-m"]};
    color: ${style ["font-color-desc"]};
    font-weight: 500;
  }
`;

```

在 index.js 中引入:

```
import { 
  NavContainer,
  ListContainer,
  List,
  ListItem
} from "./style";

```

现在你就能看到一个可以滚动的歌手列表啦！

![](https://user-gold-cdn.xitu.io/2019/10/18/16dddf3919da2c45?w=372&h=567&f=gif&s=766039)