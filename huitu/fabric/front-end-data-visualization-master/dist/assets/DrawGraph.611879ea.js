import{A as G,b as d,I as O,C as k,o as m,e as f,J as q,L as F,f as j,F as x,g as H,u as N,s as R,v as T,t as E}from"./vendor.b99b632f.js";import{T as X}from"./TileImage.0ebee0ae.js";import{O as z}from"./OSM.7622e957.js";import{S as A,L as J}from"./Vector.c1a6c122.js";import{D as U,c as Y,a as Z}from"./Draw.f5c30f6c.js";import{M as K,V as Q,bb as W}from"./ol.bb58850a.js";import{_ as $}from"./index.8bb5b140.js";import"./XYZ.0d304f3a.js";import"./LineString.191ddcd6.js";import"./MultiPolygon.abfd4d82.js";const ee=o=>(R("data-v-0ba3cc5a"),o=o(),T(),o),ae=ee(()=>j("div",{id:"map",class:"map__x"},null,-1)),re=["value"],te={setup(o){const y=G(),a=d("Hexagram"),I=O([{value:"Circle",label:"\u5706"},{value:"Square",label:"\u65B9\u5F62"},{value:"Rectangle",label:"\u77E9\u5F62"},{value:"Hexagram",label:"\u516D\u8292\u661F"},{value:"None",label:"\u65E0"}]),i=d(null),D=new X({source:new z}),_=new A({wrapX:!1}),C=new J({source:_});function P(){i.value=new K({target:"map",layers:[D,C],view:new Q({projection:"EPSG:4326",center:[113.1206,23.034996],zoom:10})}),w()}const s=d(null);function w(){if(s.value!==null&&i.value.removeInteraction(s.value),a.value!=="None"){let r,l="Circle";a.value==="Square"?r=Y(4):a.value==="Rectangle"?r=Z():a.value==="Hexagram"&&(r=function(e,n){for(var c=e[0],b=e[1],v=c[0]-b[0],p=c[1]-b[1],h=Math.sqrt(v*v+p*p),V=Math.atan2(p,v),t=[],g=12,u=0;u<g;++u){var S=V+u*2*Math.PI/g,M=u%2==0?1:.58,L=h*M*Math.cos(S),B=h*M*Math.sin(S);t.push([c[0]+L,c[1]+B])}return t.push(t[0].slice()),n?n.setCoordinates([t]):n=new W([t]),n}),s.value=new U({source:_,type:l,geometryFunction:r}),i.value.addInteraction(s.value)}}return k(()=>{y.commit("setComponentPath","src/views/OpenLayers/Basic/pages/DrawGraph/DrawGraph.vue"),P()}),(r,l)=>(m(),f(x,null,[ae,q(j("select",{id:"type","onUpdate:modelValue":l[0]||(l[0]=e=>a.value=e),onChange:w},[(m(!0),f(x,null,H(N(I),e=>(m(),f("option",{key:e.value,value:e.value},E(e.label),9,re))),128))],544),[[F,a.value]])],64))}};var me=$(te,[["__scopeId","data-v-0ba3cc5a"]]);export{me as default};