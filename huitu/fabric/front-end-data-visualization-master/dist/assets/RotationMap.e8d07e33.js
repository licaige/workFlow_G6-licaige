import{A as c,b as p,C as l,o as u,e as _,f as a,F as m,s as d,v as f}from"./vendor.b99b632f.js";import{T as v}from"./TileImage.0ebee0ae.js";import{O as b}from"./OSM.7622e957.js";import{M as g,V as w}from"./ol.bb58850a.js";import{_ as R}from"./index.8bb5b140.js";import"./XYZ.0d304f3a.js";const M=t=>(d("data-v-6f85d7c3"),t=t(),f(),t),j=M(()=>a("div",{id:"map",class:"map__x"},null,-1)),x={setup(t){const s=c(),e=p(null);function n(){e.value=new g({target:"map",layers:[new v({source:new b})],view:new w({projection:"EPSG:4326",center:[114.064839,22.548857],minZoom:10,zoom:12})})}function i(){let o=e.value.getView().getRotation();e.value.getView().setRotation(o+1)}function r(){let o=e.value.getView().getRotation();e.value.getView().setRotation(o-1)}return l(()=>{s.commit("setComponentPath","src/views/OpenLayers/Basic/pages/RotationMap/RotationMap.vue"),n()}),(o,S)=>(u(),_(m,null,[j,a("div",{class:"btn__x"},[a("button",{onClick:i},"\u21BB"),a("button",{onClick:r},"\u21BA")])],64))}};var C=R(x,[["__scopeId","data-v-6f85d7c3"]]);export{C as default};