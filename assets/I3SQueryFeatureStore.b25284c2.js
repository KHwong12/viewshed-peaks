import{ag as le,r as c,t as l,cA as ue,w as L,ar as W,z as B,aP as de,E as _,A as S,cL as T,dS as pe,bZ as D,cQ as P,dT as ye,bk as U,dU as he,dV as fe,bi as ge,bc as me,bh as be,dp as M,aS as C,aR as G,aQ as q,u as Se,O as we,at as Ee,U as H,g as xe,a7 as Z,b5 as Ie,a4 as Oe,bF as Re,am as Fe,d2 as Qe}from"./vendor.d423bc92.js";import{WhereClause as je}from"./WhereClause.34680e97.js";import{e as _e,_ as ve,c as K}from"./I3SUtil.d646bdba.js";import{L as $e}from"./QueryEngine.5cc290e3.js";import{e as Me}from"./centroid.d8eb382d.js";const $=le.getLogger("esri.views.3d.layers.i3s.I3SMeshViewFilter");let y,h=class extends B{constructor(e){super(e),this._projectionEngineLoaded=!1}initialize(){de(this,"filter.geometry").then(()=>this.loadAsyncModule(Ge().then(e=>{this.destroyed||(this._geometryEngine=e,this.applyFilters())})))}get sortedObjectIds(){if(_(this.filter.objectIds))return null;const e=new Float64Array(this.filter.objectIds);return e.sort(),e}get parsedWhereClause(){const e=S(this.filter)?this.filter.where:null;if(_(e)||!e)return null;try{return je.create(e,this.layerFieldsIndex)}catch(t){$.error(`Failed to parse filter where clause: ${t}`)}return null}addFilters(e,t,r,s){const i=this.sortedObjectIds;S(i)&&e.push(a=>_e(i,!0,a)),this.addSqlFilter(e,this.parsedWhereClause);const n=this.parsedGeometry;if(S(n)){const a=this.spatialRelationship;e.push((o,u)=>Ve(o,u,s,t,r,n,a))}}isMBSGeoemtryVisible(e,t,r){const s=this.parsedGeometry;if(S(s)){const i=this.spatialRelationship,n=s[0].spatialReference||t;return T(e,r,J,n)?Je(J,s,n,i):($.warnOnce("SceneLayerView.filter.geometry is using unsupported SpatialReference, skipping geometry filter for MBS"),!0)}return!0}get parsedGeometry(){if(_(this.filter)||!this._geometryEngine)return null;const{geometry:e}=this.filter;if(_(e))return null;const{distance:t,units:r}=this.filter,s=this.spatialRelationship,i=e.type==="mesh"?e.extent:e;if(_(t)||t===0)return A(i,s);const n=r||pe(i.spatialReference);if(i.spatialReference.isWGS84)return A(this._geometryEngine.geodesicBuffer(i,t,n),s);const a=D(i,P.WGS84);if(S(a))return A(D(this._geometryEngine.geodesicBuffer(a,t,n),i.spatialReference),s);if(!this._projectionEngineLoaded&&(this.loadAsyncModule(ye().then(()=>this._projectionEngineLoaded=!0)),!this._projectionEngineLoaded))return null;let o=null;try{o=U(i,P.WGS84)}catch{}if(o)try{o=U(this._geometryEngine.geodesicBuffer(o,t,n),i.spatialReference)}catch{o=null}return o||$.error(`Filter by geodesic buffer (distance) unsupported, failed to project input geometry (${i.spatialReference.wkid}) to WGS84.`),A(o,s)}get spatialRelationship(){return S(this.filter)?this.filter.spatialRelationship:"intersects"}static checkSupport(e){return e.timeExtent?($.warn("Filters with a timeExtent are not supported for mesh scene layers"),!1):!!Ae(e.spatialRelationship)||($.warn(`Filters with spatialRelationship other than ${X.join(", ")} are not supported for mesh scene layers`),!1)}};function Ce(){return!!y}async function Ge(){return Ce()||(y=await import("./geometryEngine.89a19af3.js")),y}c([l({type:ue})],h.prototype,"filter",void 0),c([l()],h.prototype,"layerFieldsIndex",void 0),c([l()],h.prototype,"loadAsyncModule",void 0),c([l()],h.prototype,"applyFilters",void 0),c([l()],h.prototype,"addSqlFilter",void 0),c([l({readOnly:!0})],h.prototype,"sortedObjectIds",null),c([l({readOnly:!0})],h.prototype,"parsedWhereClause",null),c([l({readOnly:!0})],h.prototype,"parsedGeometry",null),c([l({readOnly:!0})],h.prototype,"spatialRelationship",null),c([l()],h.prototype,"_projectionEngineLoaded",void 0),c([l()],h.prototype,"_geometryEngine",void 0),h=c([L("esri.views.3d.layers.i3s.I3SMeshViewFilter")],h);const X=(e=>e)(["contains","intersects","disjoint"]);function Ae(e){return e!=null&&X.indexOf(e)>=0}function A(e,t){if(_(e))return null;if(t==="disjoint"&&e.type==="polygon"){const r=new Array(e.rings.length);for(let n=0;n<e.rings.length;++n){const a=he(1/0,1/0,-1/0,-1/0);fe(a,e.rings[n]),r[n]={type:"polygon",rings:[e.rings[n]],spatialReference:e.spatialReference,aabr:a}}r.sort((n,a)=>n.aabr[0]-a.aabr[0]);const s=new Set,i=new ge;for(let n=0;n<r.length;++n){const a=r[n];for(let o=n+1;o<r.length;++o){const u=r[o];if(u.aabr[0]>=a.aabr[2])break;s.add(u)}s.forEach(o=>{if(a!==o){if(o.aabr[2]<=a.aabr[0])s.delete(o);else if(y.intersects(a,o)){a.rings=a.rings.concat(o.rings),me(a.aabr,o.aabr,a.aabr),delete a._geVersion,s.delete(o);const u=be(r,o,r.length,i);r.splice(u,1)}}}),s.add(a)}for(const n of r)delete n.aabr;return r}return[e]}function Je(e,t,r,s){const i=Y(e,r);return t.every(n=>ee(n,i,s)!==1)}function Ve(e,t,r,s,i,n,a){const o=n[0].spatialReference||s.spatialReference;if(!T(t.node.mbs,i,J,o))return void $.warnOnce("SceneLayerView.filter.geometry is using unsupported SpatialReference, skipping geometry filter");const u=Y(J,o),d=ke(a,s,o,r,t.objectHandle);for(const p of n){if(e.length===0)return;switch(ee(p,u,a)){case 1:return void(e.length=0);case 0:continue}ve(e,t.featureIds,w=>Le(p,w,d))}}const J=[0,0,0,0];function ke(e,t,r,s,i){const n=t.renderSpatialReference,a=new Map,o={rings:[[[0,0,0],[0,0,0],[0,0,0],[0,0,0]]],hasZ:!1,hasM:!1,type:"polygon",spatialReference:r};o.rings[0][3]=o.rings[0][0];const u={indices:null,data:null,stride:0,startIndex:0,endIndex:0};let d,p;switch(e){case"intersects":d=(w,F)=>y.intersects(w,F)?0:2,p=z;break;case"contains":d=(w,F)=>y.contains(w,F)?2:1,p=z;break;default:d=(w,F)=>y.disjoint(w,F)?2:1,p=te}return{collection:s,object:i,type:e,maskSR:r,renderSR:n,aabbCache:a,triangle:o,positions:u,triangleTest:d,geometryTest:p}}function Y(e,t){const r={x:e[0],y:e[1],hasZ:!1,hasM:!1,type:"point",spatialReference:t},s=!t.isWGS84&&!t.isWebMercator?y.buffer(r,e[3],1):y.geodesicBuffer(r,e[3],1);return s.type="polygon",s}function ee(e,t,r){switch(r){case"intersects":case"contains":return z(e,t);case"disjoint":return te(e,t)}}function z(e,t){return y.intersects(e,t)?y.contains(e,t)?0:2:1}function te(e,t){return y.intersects(e,t)?y.contains(e,t)?1:2:0}const Ne=2**-32;function Le(e,t,r){const{collection:s,object:i,renderSR:n,maskSR:a,geometryTest:o,aabbCache:u}=r;let d=u.get(t);if(!d){const Q=s.getObjectTransform(i);s.getComponentAabb(i,t,O);const m=[[O[0],O[1],0],[O[0],O[4],0],[O[3],O[4],0],[O[3],O[1],0]];for(let f=0;f<4;++f)M(m[f],m[f],Q.rotationScale),C(m[f],m[f],Q.position),G(m[f],n,m[f],a);d={rings:[m],hasZ:!1,hasM:!1,type:"polygon",spatialReference:a},d.rings[0][4]=d.rings[0][0],u.set(t,d)}switch(o(e,d)){case 1:return!1;case 0:return!0}const{triangle:p,triangleTest:w,positions:F}=r,g=p.rings[0][0],E=p.rings[0][1],x=p.rings[0][2],v=s.getObjectTransform(i);s.getComponentPositions(i,t,F);const{indices:V,data:I,stride:k,startIndex:ne,endIndex:se}=F;for(let Q=ne;Q<se;Q+=3){const m=k*V[Q+0],f=k*V[Q+1],N=k*V[Q+2];q(g,I[m+0],I[m+1],I[m+2]),q(E,I[f+0],I[f+1],I[f+2]),q(x,I[N+0],I[N+1],I[N+2]),M(g,g,v.rotationScale),M(E,E,v.rotationScale),M(x,x,v.rotationScale),C(g,g,v.position),C(E,E,v.position),C(x,x,v.position),G(g,n,g,a),G(E,n,E,a),G(x,n,x,a);const ie=E[0]-g[0],ae=E[1]-g[1],oe=x[0]-g[0],ce=x[1]-g[1];if(!(Math.abs(ie*ce-ae*oe)<Ne))switch(delete p._geVersion,w(e,p)){case 1:return!1;case 0:return!0}}return r.type!=="intersects"}const O=W(),We=$e;let R=class extends B{constructor(e){super(e),this._dataQueryEngineInstance=null,this._handles=new Se}get defaultQueryJSON(){return new we({outSpatialReference:this.spatialReference}).toJSON()}get dataQueryEngine(){return this.ensureDataQueryEngine()}initialize(){this._handles.add(this.layerView.on("visible-geometry-changed",()=>this.spatialIndex.events.emit("changed")))}destroy(){this._dataQueryEngineInstance&&(this._dataQueryEngineInstance.destroy(),this._dataQueryEngineInstance=null),this._handles&&(this._handles.destroy(),this._handles=null),this._set("layerView",null)}async executeQueryForCount(e,t){return this.dataQueryEngine.executeQueryForCount(this._ensureQueryJSON(e),t)}async executeQueryForExtent(e,t){const{count:r,extent:s}=await this.dataQueryEngine.executeQueryForExtent(this._ensureQueryJSON(e),t);return{count:r,extent:Ee.fromJSON(s)}}async executeQueryForIds(e,t){return this.dataQueryEngine.executeQueryForIds(this._ensureQueryJSON(e),t)}async executeQuery(e,t){const r=this._ensureQueryJSON(e);if(r.returnGeometry)throw new H("feature-store:unsupported-query","returnGeometry is not yet supported for mesh scene layer queries");if(r.returnCentroid)throw new H("feature-store:unsupported-query","returnCentroid is not yet supported for mesh scene layer queries");const s=await this.dataQueryEngine.executeQuery(r,t),i=xe.fromJSON(s);return i.features.forEach(n=>{n.geometry=null}),i}_ensureQueryJSON(e){if(_(e))return this.defaultQueryJSON;const t=e.toJSON();return t.outSpatialReference||(e.outSpatialReference=this.spatialReference),t}ensureDataQueryEngine(){if(this._dataQueryEngineInstance)return this._dataQueryEngineInstance;const e=this.layer.objectIdField||"OBJECTID",t="esriGeometryPolygon",r=this.layer.fields.map(o=>o.toJSON()),s=this.layerView.view.resourceController.scheduler,i=this.spatialReference.toJSON(),n=this.priority,a=this.spatialIndex;return this._dataQueryEngineInstance=new We({hasZ:!0,hasM:!1,geometryType:t,fields:r,timeInfo:null,spatialReference:i,objectIdField:e,featureStore:a,scheduler:s,priority:n}),this._dataQueryEngineInstance}};c([l({constructOnly:!0})],R.prototype,"layerView",void 0),c([l({constructOnly:!0})],R.prototype,"priority",void 0),c([l({constructOnly:!0})],R.prototype,"spatialIndex",void 0),c([l({readOnly:!0,aliasOf:"layerView.view.spatialReference"})],R.prototype,"spatialReference",void 0),c([l({readOnly:!0,aliasOf:"layerView.i3slayer"})],R.prototype,"layer",void 0),c([l({readOnly:!0})],R.prototype,"defaultQueryJSON",null),R=c([L("esri.views.3d.layers.i3s.I3SQueryEngine")],R);const Ue=R;class He{constructor(t){this.objectIdField=t.objectIdField,this.getFeatureExtent=t.getFeatureExtent}getObjectId(t){return t.id}getAttributes(t){const{meta:r,index:s}=t,i={};this.objectIdField&&(i[this.objectIdField]=t.id);const n=S(r.attributeInfo)&&r.attributeInfo.attributeData;if(S(n))for(const a of Object.keys(n))i[a]=K(n[a],s);return i}getAttribute(t,r){if(r===this.objectIdField)return t.id;const{meta:s,index:i}=t,n=S(s.attributeInfo)&&s.attributeInfo.attributeData;return S(n)?K(n[r],i):null}getGeometry(t){if(t.geometry)return t.geometry;const[r,s,i,n,a]=this.getFeatureExtent(t,re);return new Z([5],[r,s,i,n,s,i,n,a,i,r,a,i,r,s,i])}getCentroid(t,r){if(t.geometry)return Me(new Z,t.geometry,r.hasZ,r.hasM);const[s,i,n,a,o,u]=this.getFeatureExtent(t,re);return new Z([0],[(s+a)/2,(i+o)/2,(n+u)/2])}cloneWithGeometry(t,r){const{id:s,index:i,meta:n}=t;return{id:s,index:i,meta:n,geometry:r}}}const re=W();let j=class extends B{constructor(e){super(e),this.events=new Oe}forEach(e){this.forAllFeatures(t=>(e(t),1))}forEachBounds(e,t,r){const s=this.getFeatureExtent;for(const i of e)t(s(i,r))}forEachInBounds(e,t){this.forAllFeatures(r=>{const s=this.getFeatureExtent(r,Be);return Re(e,Fe(s,Te))&&t(r),1},r=>{if(T(r.node.mbs,this.sourceSpatialReference,b,this.viewSpatialReference),b[0]>=e[0]&&b[2]<=e[2]&&b[1]>=e[1]&&b[3]<=e[3])return 1;const s=Math.max(e[0],Math.min(b[0],e[2])),i=Math.max(e[1],Math.min(b[1],e[3])),n=b[0]-s,a=b[1]-i;return n*n+a*a<=b[3]*b[3]?1:2})}};c([l({constructOnly:!0})],j.prototype,"featureAdapter",void 0),c([l({constructOnly:!0})],j.prototype,"forAllFeatures",void 0),c([l({constructOnly:!0})],j.prototype,"getFeatureExtent",void 0),c([l({constructOnly:!0})],j.prototype,"sourceSpatialReference",void 0),c([l({constructOnly:!0})],j.prototype,"viewSpatialReference",void 0),j=c([L("esri.views.3d.layers.i3s.I3SQueryFeatureStore")],j);const b=Qe(),Be=W(),Te=Ie(),Ke=j;export{h as O,Ke as a,Ue as d,He as n};