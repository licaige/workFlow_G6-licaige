import{A as y,b as g,C as h,r as f,o as x,e as w,a as c,u as k,S as M,w as P,f as B}from"./vendor.b99b632f.js";import{f as d}from"./fabric.49791ffe.js";const S=B("canvas",{id:"canvas",width:"600",height:"600",style:{border:"1px solid #ccc"}},null,-1),F={setup(V){const p=y();let e=null,t=null,u=null,o=null,n=g("default");function m(a){switch(a){case"default":e.selection=!0,e.selectionColor="rgba(100, 100, 255, 0.3)",e.selectionBorderColor="rgba(255, 255, 255, 0.3)",e.skipTargetFind=!1;break;case"circle":e.selectionColor="transparent",e.selectionBorderColor="transparent",e.skipTargetFind=!0;break}}function b(){e=new d.fabric.Canvas("canvas"),e.on("mouse:down",v),e.on("mouse:move",C),e.on("mouse:up",_)}function v(a){t=a.absolutePointer,n.value==="circle"&&(o=new d.fabric.Circle({top:t.y,left:t.x,radius:0,fill:"transparent",stroke:"rgba(0, 0, 0, 0.2)"}),e.add(o))}function C(a){if(n.value==="circle"&&o){const l=a.absolutePointer;let s=Math.min(Math.abs(t.x-l.x),Math.abs(t.y-l.y))/2,i=l.y>t.y?t.y:t.y-s*2,r=l.x>t.x?t.x:t.x-s*2;o.set("radius",s),o.set("top",i),o.set("left",r),e.requestRenderAll()}}function _(a){u=a.absolutePointer,n.value==="circle"&&(JSON.stringify(t)===JSON.stringify(u)?e.remove(o):o&&o.set("stroke","#000"),o=null)}return h(()=>{p.commit("setComponentPath","src/views/FabricJS/Demo/pages/CreateCircle/CreateCircle.vue"),b()}),(a,l)=>{const s=f("el-option"),i=f("el-select");return x(),w("div",null,[c(i,{modelValue:k(n),"onUpdate:modelValue":l[0]||(l[0]=r=>M(n)?n.value=r:n=r),onChange:m},{default:P(()=>[c(s,{label:"\u9ED8\u8BA4(\u6846\u9009)",value:"default"}),c(s,{label:"\u5706\u5F62",value:"circle"})]),_:1},8,["modelValue"]),S])}}};export{F as default};