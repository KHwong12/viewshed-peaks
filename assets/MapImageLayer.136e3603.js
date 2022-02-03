var O=Object.defineProperty,I=Object.defineProperties;var j=Object.getOwnPropertyDescriptors;var v=Object.getOwnPropertySymbols;var M=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable;var x=(e,t,r)=>t in e?O(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,p=(e,t)=>{for(var r in t||(t={}))M.call(t,r)&&x(e,r,t[r]);if(v)for(var r of v(t))P.call(t,r)&&x(e,r,t[r]);return e},m=(e,t)=>I(e,j(t));import{lH as E,lI as J,lJ as N,lK as L,lL as U,lM as T,lN as q,lO as F,lP as R,lQ as A,cu as k,M as K,A as z,bp as H,fb as S,lR as V,U as w,bu as f,J as C,at as D,j$ as G,lS as W,r as a,t as n,d6 as B,ev as _,d7 as Q,lT as X,w as Y}from"./vendor.d423bc92.js";import{f as Z,y as ee,K as te}from"./SublayersOwner.56fb1d8c.js";import{c as re}from"./ExportImageParameters.794f82a0.js";import{e as $}from"./sublayerUtils.5227ee88.js";let s=class extends E(J(N(Z(ee(L(U(T(q(F(R(A(k(K))))))))))))){constructor(...e){super(...e),this.datesInUnknownTimezone=!1,this.dpi=96,this.gdbVersion=null,this.imageFormat="png24",this.imageMaxHeight=2048,this.imageMaxWidth=2048,this.imageTransparency=!0,this.isReference=null,this.labelsVisible=!1,this.operationalLayerType="ArcGISMapServiceLayer",this.sourceJSON=null,this.sublayers=null,this.type="map-image",this.url=null}normalizeCtorArgs(e,t){return typeof e=="string"?p({url:e},t):e}load(e){const t=z(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service"]},e).catch(H).then(()=>this._fetchService(t))),Promise.resolve(this)}readImageFormat(e,t){const r=t.supportedImageFormatTypes;return r&&r.indexOf("PNG32")>-1?"png32":"png24"}writeSublayers(e,t,r,i){if(!this.loaded||!e)return;const y=e.slice().reverse().flatten(({sublayers:o})=>o&&o.toArray().reverse()).toArray();let l=!1;if(this.capabilities&&this.capabilities.operations.supportsExportMap&&this.capabilities.exportMap.supportsDynamicLayers){const o=S(i.origin);if(o===3){const d=this.createSublayersForOrigin("service").sublayers;l=$(y,d,2)}else if(o>3){const d=this.createSublayersForOrigin("portal-item");l=$(y,d.sublayers,S(d.origin))}}const u=[],c=p({writeSublayerStructure:l},i);let h=l;y.forEach(o=>{const d=o.write({},c);u.push(d),h=h||o.originOf("visible")==="user"}),u.some(o=>Object.keys(o).length>1)&&(t.layers=u),h&&(t.visibleLayers=y.filter(o=>o.visible).map(o=>o.id))}createExportImageParameters(e,t,r,i){const y=i&&i.pixelRatio||1;e&&this.version>=10&&(e=e.clone().shiftCentralMeridian());const l=new re({layer:this,floors:i==null?void 0:i.floors,scale:V({extent:e,width:t})*y}),u=l.toJSON();l.destroy();const c=!i||!i.rotation||this.version<10.3?{}:{rotation:-i.rotation},h=e&&e.spatialReference,o=h.wkid||JSON.stringify(h.toJSON());u.dpi*=y;const d={};if(i!=null&&i.timeExtent){const{start:g,end:b}=i.timeExtent.toJSON();d.time=g&&b&&g===b?""+g:`${g==null?"null":g},${b==null?"null":b}`}else this.timeInfo&&!this.timeInfo.hasLiveData&&(d.time="null,null");return p(p(p({bbox:e&&e.xmin+","+e.ymin+","+e.xmax+","+e.ymax,bboxSR:o,imageSR:o,size:t+","+r},u),c),d)}async fetchImage(e,t,r,i){var y;const l={responseType:"image",signal:(y=i==null?void 0:i.signal)!=null?y:null,query:m(p(p(m(p(p({},this.parsedUrl.query),this.createExportImageParameters(e,t,r,i)),{f:"image"}),this.refreshParameters),this.customParameters),{token:this.apiKey})},u=this.parsedUrl.path+"/export";return l.query.dynamicLayers!=null&&!this.capabilities.exportMap.supportsDynamicLayers?Promise.reject(new w("mapimagelayer:dynamiclayer-not-supported",`service ${this.url} doesn't support dynamic layers, which is required to be able to change the sublayer's order, rendering, labeling or source.`,{query:l.query})):f(u,l).then(c=>c.data).catch(c=>{throw C(c)?c:new w("mapimagelayer:image-fetch-error",`Unable to load image: ${u}`,{error:c})})}async fetchRecomputedExtents(e={}){const t=m(p({},e),{query:m(p({returnUpdates:!0,f:"json"},this.customParameters),{token:this.apiKey})}),{data:r}=await f(this.url,t),{extent:i,fullExtent:y,timeExtent:l}=r,u=i||y;return{fullExtent:u&&D.fromJSON(u),timeExtent:l&&G.fromJSON({start:l[0],end:l[1]})}}loadAll(){return W(this,e=>{e(this.allSublayers)})}async _fetchService(e){if(this.sourceJSON)return void this.read(this.sourceJSON,{origin:"service",url:this.parsedUrl});const{data:t,ssl:r}=await f(this.parsedUrl.path,{query:m(p(p({f:"json"},this.parsedUrl.query),this.customParameters),{token:this.apiKey}),signal:e});r&&(this.url=this.url.replace(/^http:/i,"https:")),this.sourceJSON=t,this.read(t,{origin:"service",url:this.parsedUrl})}};a([n({type:Boolean})],s.prototype,"datesInUnknownTimezone",void 0),a([n()],s.prototype,"dpi",void 0),a([n()],s.prototype,"gdbVersion",void 0),a([n()],s.prototype,"imageFormat",void 0),a([B("imageFormat",["supportedImageFormatTypes"])],s.prototype,"readImageFormat",null),a([n({json:{origins:{service:{read:{source:"maxImageHeight"}}}}})],s.prototype,"imageMaxHeight",void 0),a([n({json:{origins:{service:{read:{source:"maxImageWidth"}}}}})],s.prototype,"imageMaxWidth",void 0),a([n()],s.prototype,"imageTransparency",void 0),a([n({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:()=>({enabled:!1})}}})],s.prototype,"isReference",void 0),a([n({json:{read:!1,write:!1}})],s.prototype,"labelsVisible",void 0),a([n({type:["ArcGISMapServiceLayer"]})],s.prototype,"operationalLayerType",void 0),a([n({json:{read:!1,write:!1}})],s.prototype,"popupEnabled",void 0),a([n()],s.prototype,"sourceJSON",void 0),a([n({json:{write:{ignoreOrigin:!0}}})],s.prototype,"sublayers",void 0),a([_("sublayers",{layers:{type:[te]},visibleLayers:{type:[Q]}})],s.prototype,"writeSublayers",null),a([n({type:["show","hide","hide-children"]})],s.prototype,"listMode",void 0),a([n({json:{read:!1},readOnly:!0,value:"map-image"})],s.prototype,"type",void 0),a([n(X)],s.prototype,"url",void 0),s=a([Y("esri.layers.MapImageLayer")],s);const le=s;export{le as default};