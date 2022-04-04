var f=Object.defineProperty,g=Object.defineProperties;var S=Object.getOwnPropertyDescriptors;var m=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable;var h=(e,s,r)=>s in e?f(e,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[s]=r,c=(e,s)=>{for(var r in s||(s={}))v.call(s,r)&&h(e,r,s[r]);if(m)for(var r of m(s))D.call(s,r)&&h(e,r,s[r]);return e},p=(e,s)=>g(e,S(s));import{cd as L,p as x,r as O,e as a,d as n,fd as E,i as P}from"./index.89a7b683.js";import{n as N}from"./sublayerUtils.5227ee88.js";import{n as u,l as I}from"./floorFilterUtils.1acb5b5d.js";const J={visible:"visibleSublayers",definitionExpression:"layerDefs",labelingInfo:"hasDynamicLayers",labelsVisible:"hasDynamicLayers",opacity:"hasDynamicLayers",minScale:"visibleSublayers",maxScale:"visibleSublayers",renderer:"hasDynamicLayers",source:"hasDynamicLayers"};let i=class extends L(x){constructor(e){super(e),this.floors=null,this.scale=0}destroy(){this.layer=null}get dynamicLayers(){if(!this.hasDynamicLayers)return null;const e=this.visibleSublayers.map(s=>{const r=u(this.floors,s);return s.toExportImageJSON(r)});return e.length?JSON.stringify(e):null}get hasDynamicLayers(){return this.layer&&N(this.visibleSublayers,this.layer.serviceSublayers,this.layer)}set layer(e){this._get("layer")!==e&&(this._set("layer",e),this.handles.remove("layer"),e&&this.handles.add([e.allSublayers.on("change",()=>this.notifyChange("visibleSublayers")),e.on("sublayer-update",s=>this.notifyChange(J[s.propertyName]))],"layer"))}get layers(){const e=this.visibleSublayers;return e?e.length?"show:"+e.map(s=>s.id).join(","):"show:-1":null}get layerDefs(){var e;const s=!((e=this.floors)==null||!e.length),r=this.visibleSublayers.filter(l=>l.definitionExpression!=null||s&&l.floorInfo!=null);return r.length?JSON.stringify(r.reduce((l,t)=>{const o=u(this.floors,t),y=O(o)?I(o,t):t.definitionExpression;return l[t.id]=y,l},{})):null}get version(){this.commitProperty("layers"),this.commitProperty("layerDefs"),this.commitProperty("dynamicLayers"),this.commitProperty("timeExtent");const e=this.layer;return e&&(e.commitProperty("dpi"),e.commitProperty("imageFormat"),e.commitProperty("imageTransparency"),e.commitProperty("gdbVersion")),(this._get("version")||0)+1}get visibleSublayers(){const e=[];if(!this.layer)return e;const s=this.layer.sublayers,r=t=>{const o=this.scale,y=o===0,d=t.minScale===0||o<=t.minScale,b=t.maxScale===0||o>=t.maxScale;t.visible&&(y||d&&b)&&(t.sublayers?t.sublayers.forEach(r):e.unshift(t))};s&&s.forEach(r);const l=this._get("visibleSublayers");return!l||l.length!==e.length||l.some((t,o)=>e[o]!==t)?e:l}toJSON(){const e=this.layer;let s={dpi:e.dpi,format:e.imageFormat,transparent:e.imageTransparency,gdbVersion:e.gdbVersion||null};return this.hasDynamicLayers&&this.dynamicLayers?s.dynamicLayers=this.dynamicLayers:s=p(c({},s),{layers:this.layers,layerDefs:this.layerDefs}),s}};a([n({readOnly:!0})],i.prototype,"dynamicLayers",null),a([n()],i.prototype,"floors",void 0),a([n({readOnly:!0})],i.prototype,"hasDynamicLayers",null),a([n()],i.prototype,"layer",null),a([n({readOnly:!0})],i.prototype,"layers",null),a([n({readOnly:!0})],i.prototype,"layerDefs",null),a([n({type:Number})],i.prototype,"scale",void 0),a([n(E)],i.prototype,"timeExtent",void 0),a([n({readOnly:!0})],i.prototype,"version",null),a([n({readOnly:!0})],i.prototype,"visibleSublayers",null),i=a([P("esri.layers.mixins.ExportImageParameters")],i);export{i as c};
