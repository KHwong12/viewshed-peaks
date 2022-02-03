import{F as u,a as d,M as v}from"./arcadeUtils.af7f668d.js";import{mv as i,mm as m,mk as f,mX as c,ms as l,mt as p,mu as h,me as b,mx as w}from"./vendor.d423bc92.js";import"./FeatureSetReader.7bc592c2.js";import"./centroid.d8eb382d.js";function y(e){return e&&e.domain?e.domain.type==="coded-value"||e.domain.type==="codedValue"?d.convertObjectToArcadeDictionary({type:"codedValue",name:e.domain.name,dataType:v[e.field.type],codedValues:e.domain.codedValues.map(r=>({name:r.name,code:r.code}))}):d.convertObjectToArcadeDictionary({type:"range",name:e.domain.name,dataType:v[e.field.type],min:e.domain.min,max:e.domain.max}):null}function x(e){e.mode==="async"&&(e.functions.domain=function(r,o){return e.standardFunctionAsync(r,o,function(a,s,n){if(i(n,2,3),n[0]instanceof u)return y(n[0].fullDomain(m(n[1]),n[2]===void 0?void 0:f(n[2])));if(c(n[0]))return n[0]._ensureLoaded().then(()=>y(l(m(n[1]),n[0],null,n[2]===void 0?void 0:f(n[2]))));throw new Error("Invalid Parameter")})},e.functions.subtypes=function(r,o){return e.standardFunctionAsync(r,o,function(a,s,n){if(i(n,1,1),n[0]instanceof u){const t=n[0].subtypes();return t?d.convertObjectToArcadeDictionary(t):null}if(c(n[0]))return n[0]._ensureLoaded().then(()=>{const t=n[0].subtypes();return t?d.convertObjectToArcadeDictionary(t):null});throw new Error("Invalid Parameter")})},e.functions.domainname=function(r,o){return e.standardFunctionAsync(r,o,function(a,s,n){if(i(n,2,4),n[0]instanceof u)return n[0].domainValueLookup(m(n[1]),n[2],n[3]===void 0?void 0:f(n[3]));if(c(n[0]))return n[0]._ensureLoaded().then(()=>{const t=l(m(n[1]),n[0],null,n[3]===void 0?void 0:f(n[3]));return p(t,n[2])});throw new Error("Invalid Parameter")})},e.signatures.push({name:"domainname",min:"2",max:"4"}),e.functions.domaincode=function(r,o){return e.standardFunctionAsync(r,o,function(a,s,n){if(i(n,2,4),n[0]instanceof u)return n[0].domainCodeLookup(m(n[1]),n[2],n[3]===void 0?void 0:f(n[3]));if(c(n[0]))return n[0]._ensureLoaded().then(()=>{const t=l(m(n[1]),n[0],null,n[3]===void 0?void 0:f(n[3]));return h(t,n[2])});throw new Error("Invalid Parameter")})},e.signatures.push({name:"domaincode",min:"2",max:"4"})),e.functions.text=function(r,o){return e.standardFunctionAsync(r,o,function(a,s,n){if(i(n,1,2),!c(n[0]))return b(n[0],n[1]);{const t=w(n[1],"");if(t==="")return n[0].castToText();if(t.toLowerCase()==="schema")return n[0].convertToText("schema",a.abortSignal);if(t.toLowerCase()==="featureset")return n[0].convertToText("featureset",a.abortSignal)}})},e.functions.gdbversion=function(r,o){return e.standardFunctionAsync(r,o,function(a,s,n){if(i(n,1,1),n[0]instanceof u)return n[0].gdbVersion();if(c(n[0]))return n[0].load().then(t=>t.gdbVersion);throw new Error("Invalid Parameter")})},e.functions.schema=function(r,o){return e.standardFunctionAsync(r,o,function(a,s,n){if(i(n,1,1),c(n[0]))return n[0].load().then(()=>d.convertObjectToArcadeDictionary(n[0].schema()));if(n[0]instanceof u){const t=n[0].schema();return t?d.convertObjectToArcadeDictionary(t):null}throw new Error("Invalid Parameter")})}}export{x as registerFunctions};
