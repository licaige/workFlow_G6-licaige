(function(e,t){typeof exports=="object"&&typeof module!="undefined"?t(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],t):(e=typeof globalThis!="undefined"?globalThis:e||self,t(e.index={},e.Vue))})(this,function(e,t){"use strict";const d={type:{type:String,default:"secondary"},size:{type:String,default:"medium"},disabled:{type:Boolean,default:!1},block:{type:Boolean,default:!1}};var n=t.defineComponent({name:"CButton",props:d,setup(o,{slots:u}){const{type:a,size:i,disabled:s,block:f}=t.toRefs(o),c=f.value?"c-btn--block":"";return()=>{const p=u.default?u.default():"\u6309\u94AE";return t.createVNode("button",{disabled:s.value,class:`c-btn c-btn--${a.value} c-btn--${i.value} ${c}`},[p])}}}),l={install(o){o.component(n.name,n)}};e.Button=n,e.default=l,Object.defineProperties(e,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});