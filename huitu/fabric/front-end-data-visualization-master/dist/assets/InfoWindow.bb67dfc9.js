import{A as r,b as s,C as d,D as p,o as u,e as v,s as _,v as m,f}from"./vendor.b99b632f.js";import{l as w}from"./logo.652bbcc2.js";import{_ as B}from"./index.8bb5b140.js";const M=o=>(_("data-v-454e2464"),o=o(),m(),o),h={class:"map__x"},I=M(()=>f("div",{id:"container"},null,-1)),L=[I],b={setup(o){const i=r(),e=s(null),n=s(null),a=s(null);function c(){const t=new BMapGL.InfoWindow("\u5185\u5BB9\uFF1A\u6570\u636E\u53EF\u89C6\u5316",{width:250,height:100,title:"\u6807\u9898\u6807\u9898",offset:new BMapGL.Size(0,-20)});e.value.openInfoWindow(t,n.value)}function l(){e.value=new BMapGL.Map("container"),n.value=new BMapGL.Point(113.298378,23.20661),e.value.centerAndZoom(n.value,18),e.value.enableScrollWheelZoom(!0);const t=new BMapGL.Icon(w,new BMapGL.Size(60,60));a.value=new BMapGL.Marker(n.value,{icon:t}),a.value.addEventListener("click",c),e.value.addOverlay(a.value)}return d(()=>{l(),i.commit("setComponentPath","src/views/BaiduMap/Basic/pages/Layer/InfoWindow.vue")}),p(()=>{a.value.removeEventListener("click",c)}),(t,k)=>(u(),v("div",h,L))}};var x=B(b,[["__scopeId","data-v-454e2464"]]);export{x as default};
