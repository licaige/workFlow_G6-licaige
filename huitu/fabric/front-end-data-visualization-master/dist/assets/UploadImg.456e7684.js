import{A as v,C as b,r,o as h,e as g,f as s,a as n,w as c,s as I,v as x,k as d}from"./vendor.b99b632f.js";import{f as w}from"./fabric.49791ffe.js";import{_ as C}from"./index.8bb5b140.js";const i=o=>(I("data-v-04c81ca6"),o=o(),x(),o),y={class:"btn__x"},S=d("\u4E0A\u4F20"),j=d("\u4FDD\u5B58\uFF1A\u6253\u5F00\u63A7\u5236\u53F0\u67E5\u770B"),k=i(()=>s("div",null,"\u6211\u6CA1\u505A\u4EFB\u4F55\u6587\u4EF6\u683C\u5F0F\u5F3A\u5236\u9650\u5236\uFF0C\u6240\u4EE5\u4E0A\u4F20\u975E\u56FE\u7247\u683C\u5F0F\u662F\u4F1A\u62A5\u9519\u7684\u3002",-1)),U=i(()=>s("canvas",{id:"canvas",width:"600",height:"600",style:{border:"1px solid #ccc"}},null,-1)),B={setup(o){const _=v();let e=null;function p(l){const t=new FileReader;return t.readAsDataURL(l),t.onload=()=>{const a=t.result;e.setBackgroundImage(a,e.renderAll.bind(e))},!1}function u(){e=new w.fabric.Canvas("canvas")}function f(){console.log(e.toJSON())}return b(()=>{_.commit("setComponentPath","src/views/FabricJS/Demo/pages/UploadImg/UploadImg.vue"),u()}),(l,t)=>{const a=r("el-button"),m=r("el-upload");return h(),g("div",null,[s("div",y,[n(m,{action:"https://jsonplaceholder.typicode.com/posts/",multiple:!1,"show-file-list":!1,limit:1,accept:".jpg,.png","before-upload":p},{default:c(()=>[n(a,{type:"primary"},{default:c(()=>[S]),_:1})]),_:1}),n(a,{onClick:f},{default:c(()=>[j]),_:1})]),k,U])}}};var D=C(B,[["__scopeId","data-v-04c81ca6"]]);export{D as default};
