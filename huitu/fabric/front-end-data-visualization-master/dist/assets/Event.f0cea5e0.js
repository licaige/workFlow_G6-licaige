import{A as r,C as f,o as d,e as u,f as n}from"./vendor.b99b632f.js";import{f as a}from"./fabric.49791ffe.js";const v=n("canvas",{width:"600",height:"600",id:"canvas",style:{border:"1px solid #ccc"}},null,-1),m=n("div",null,"\u6253\u5F00\u63A7\u5236\u53F0\uFF0C\u7136\u540E\u7528\u9F20\u6807\u70B9\u51FB\u753B\u5E03\u8BD5\u8BD5",-1),_={setup(b){const i=r();let t=null;function l(){t=new a.fabric.Canvas("canvas");let e=new a.fabric.Rect({top:20,left:20,width:100,height:50,fill:"#9896f1"});e.on("selected",s=>{console.log("\u9009\u4E2D\u77E9\u5F62\u5566",s)}),t.add(e),c()}function o(){t.off("mouse:down")}function c(){o(),t.on("mouse:down",e=>{console.log(`x\u8F74\u5750\u6807: ${e.e.clientX};    y\u8F74\u5750\u6807: ${e.e.clientY}`)})}return f(()=>{i.commit("setComponentPath","src/views/FabricJS/Basic/pages/Event/Event.vue"),l()}),(e,s)=>(d(),u("div",null,[v,n("button",{onClick:c},"\u6DFB\u52A0\u753B\u5E03\u70B9\u51FB\u4E8B\u4EF6"),n("button",{onClick:o},"\u79FB\u9664\u753B\u5E03\u70B9\u51FB\u4E8B\u4EF6"),m]))}};export{_ as default};
