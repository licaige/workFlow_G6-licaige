import{A as x,b as l,C as S,o as b,e as y,f as p,t as j,F as V,s as F,v as P}from"./vendor.b99b632f.js";import{b as d,c as i,d as c,L as m,S as v}from"./Vector.c1a6c122.js";import{G as k}from"./GeoJSON.bd168292.js";import{C}from"./MapOfChina.61651cea.js";import{M as E,V as T}from"./ol.bb58850a.js";import{_ as G}from"./index.8bb5b140.js";import{T as g}from"./Text.cc0ffa7e.js";import"./LineString.191ddcd6.js";import"./MultiPolygon.abfd4d82.js";const M=r=>(F("data-v-1fe12542"),r=r(),P(),r),I=M(()=>p("div",{id:"map",class:"map__x"},null,-1)),O={setup(r){const w=x(),t=l(null);function _(){let o=new d({fill:new c({color:"rgba(255, 255, 255, 0.6)"}),stroke:new i({color:"#319FD3",width:1}),text:new g({font:"12px Calibri,sans-serif",fill:new c({color:"#000"}),stroke:new i({color:"#fff",width:3})})});t.value=new E({target:"map",layers:[new m({source:new v({features:new k().readFeatures(C,{dataProjection:"EPSG:4326",featureProjection:"EPSG:4326"})}),style:e=>(o.getText().setText(e.get("name")),o)})],view:new T({projection:"EPSG:4326",center:[104.064839,30.548857],zoom:4})}),t.value.on("pointermove",e=>{if(e.dragging)return;let a=t.value.getEventPixel(e.originalEvent);h(a)})}const s=l(null),f=new d({stroke:new i({color:"#f00",width:1}),fill:new c({color:"rgba(255, 0, 0, 0.1)"}),text:new g({font:"12px Calibri, sans-serif",fill:new c({color:"#000"}),stroke:new i({color:"#f00",width:3})})}),n=l(null),u=l("");function h(o){s.value||(s.value=new m({source:new v,map:t.value,style:a=>(f.getText().setText(a.get("name")),f)}));let e=t.value.forEachFeatureAtPixel(o,a=>a);e?(console.log(e.get("name")),u.value=e.get("name")):u.value="",e!==n.value&&(n.value&&s.value.getSource().removeFeature(n.value),e&&s.value.getSource().addFeature(e),n.value=e)}return S(()=>{w.commit("setComponentPath","src/views/OpenLayers/Basic/pages/VectorHigh/VectorHigh.vue"),_()}),(o,e)=>(b(),y(V,null,[I,p("div",null,j(u.value),1)],64))}};var K=G(O,[["__scopeId","data-v-1fe12542"]]);export{K as default};