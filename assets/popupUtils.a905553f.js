import{A as i,dW as c,cx as x}from"./vendor.d423bc92.js";async function I(e,n=e.popupTemplate){if(!i(n))return[];const s=await n.getRequiredFields(e.fieldsIndex),{lastEditInfoEnabled:o}=n,{objectIdField:a,typeIdField:u,globalIdField:l,relationships:t}=e;if(s.includes("*"))return["*"];const f=o?await c(e):[],d=x(e.fieldsIndex,[...s,...f]);return u&&d.push(u),d&&a&&e.fieldsIndex.has(a)&&d.indexOf(a)===-1&&d.push(a),d&&l&&e.fieldsIndex.has(l)&&d.indexOf(l)===-1&&d.push(l),t&&t.forEach(r=>{const{keyField:p}=r;d&&p&&e.fieldsIndex.has(p)&&d.indexOf(p)===-1&&d.push(p)}),d}function m(e,n){return e.popupTemplate?e.popupTemplate:i(n)&&n.defaultPopupTemplateEnabled&&i(e.defaultPopupTemplate)?e.defaultPopupTemplate:null}export{m as d,I as t};
