var J=Object.defineProperty,x=Object.defineProperties;var F=Object.getOwnPropertyDescriptors;var A=Object.getOwnPropertySymbols;var O=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable;var $=(r,e,a)=>e in r?J(r,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[e]=a,d=(r,e)=>{for(var a in e||(e={}))O.call(e,a)&&$(r,a,e[a]);if(A)for(var a of A(e))q.call(e,a)&&$(r,a,e[a]);return r},m=(r,e)=>x(r,F(e));import{e as s,d as o,aB as S,cR as p,ba as I,v as K,h as v,i as R,dK as z,jF as C,r as E,ev as M,cz as Q,aJ as T,jo as V,eu as Z,bd as D,jp as G}from"./index.89a7b683.js";import{a as H,u as B,d as L,b as U,p as W,o as X}from"./networkService.72361ae4.js";function b(r){return r.features.map(e=>{const a=Q.fromJSON(r.spatialReference),l=v.fromJSON(e);return T(l.geometry).spatialReference=a,l})}function f(r){return C(r.features.map(e=>(E(e.geometry)&&(e.geometry.spatialReference=r.spatialReference),M(e.geometry))))}let t=class extends z{constructor(r){super(r),this.facilities=null,this.messages=null,this.pointBarriers=null,this.polylineBarriers=null,this.polygonBarriers=null,this.serviceAreaPolylines=null,this.serviceAreaPolygons=null}readFacilities(r){return f(r)}readPointBarriers(r,e){return f(e.barriers)}readPolylineBarriers(r){return f(r)}readPolygonBarriers(r){return f(r)}readIncidents(r,e){return b(e.saPolylines)}readServiceAreaPolygons(r,e){return b(e.saPolygons)}};s([o({type:[S]})],t.prototype,"facilities",void 0),s([p("facilities")],t.prototype,"readFacilities",null),s([o({type:[H]})],t.prototype,"messages",void 0),s([o({type:[S]})],t.prototype,"pointBarriers",void 0),s([p("pointBarriers",["barriers"])],t.prototype,"readPointBarriers",null),s([o({type:[I]})],t.prototype,"polylineBarriers",void 0),s([p("polylineBarriers")],t.prototype,"readPolylineBarriers",null),s([o({type:[K]})],t.prototype,"polygonBarriers",void 0),s([p("polygonBarriers")],t.prototype,"readPolygonBarriers",null),s([o({type:[v]})],t.prototype,"serviceAreaPolylines",void 0),s([p("serviceAreaPolylines",["saPolylines"])],t.prototype,"readIncidents",null),s([o({type:[v]})],t.prototype,"serviceAreaPolygons",void 0),s([p("serviceAreaPolygons",["saPolygons"])],t.prototype,"readServiceAreaPolygons",null),t=s([R("esri.rest.support.ServiceAreaSolveResult")],t);const Y=t,_=X({accumulateAttributes:{name:"accumulateAttributeNames"},attributeParameterValues:!0,defaultBreaks:!0,facilities:!0,outSpatialReference:{name:"outSR",getter:r=>r.outSpatialReference.wkid},pointBarriers:{name:"barriers"},polylineBarriers:!0,polygonBarriers:!0,restrictionAttributes:{name:"restrictionAttributeNames"},returnPointBarriers:{name:"returnBarriers"},travelMode:!0});async function ee(r,e,a){const l=[],u=[],n={},y={},P=V(r),{path:h}=P;e.facilities&&e.facilities.features&&B(e.facilities.features,u,"facilities.features",n),e.pointBarriers&&e.pointBarriers.features&&B(e.pointBarriers.features,u,"pointBarriers.features",n),e.polylineBarriers&&e.polylineBarriers.features&&B(e.polylineBarriers.features,u,"polylineBarriers.features",n),e.polygonBarriers&&e.polygonBarriers.features&&B(e.polygonBarriers.features,u,"polygonBarriers.features",n);const j=await Z(u);for(const i in n){const c=n[i];l.push(i),y[i]=j.slice(c[0],c[1])}if(L(y,l)){let i=null;try{i=await U(h,e.apiKey,a)}catch{}i&&!i.hasZ&&W(y,l)}for(const i in y)y[i].forEach((c,w)=>{e.get(i)[w].geometry=c});const k=m(d({},a),{query:m(d(d({},P.query),_.toQueryParams(e)),{f:"json"})}),{data:N}=await D(`${h}/solveServiceArea`,k);return Y.fromJSON(N)}let g=class extends G{constructor(r){super(r),this.url=null}solve(r,e){return ee(this.url,r,e)}};s([o()],g.prototype,"url",void 0),g=s([R("esri.tasks.ServiceAreaTask")],g);const ae=g;export{ae as default};
