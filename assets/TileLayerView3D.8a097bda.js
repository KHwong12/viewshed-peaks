import{r,t as s,w as d,U as u,aJ as g,A as v,bx as w,by as x,bz as b,E as c,aZ as F}from"./vendor.d423bc92.js";import{i as I}from"./RefreshableLayerView.dc4ceb0c.js";import{s as E}from"./clickToleranceUtils.f03f410d.js";import{a as L}from"./drapedUtils.0a78620b.js";const P=a=>{let t=class extends a{async fetchPopupFeatures(o,y){const{layer:n}=this;if(!o)return Promise.reject(new u("tilelayerview:fetchPopupFeatures","Nothing to fetch without area",{layer:n}));if(n.type!=="tile")return Promise.reject(new u("tilelayerview:fetchPopupFeatures","Layer type should be 'tile'",{type:n.type}));const f=this.get("view.scale"),m=n.allSublayers.toArray().filter(e=>{const l=e.minScale===0||f<=e.minScale,p=e.maxScale===0||f>=e.maxScale;return e.popupTemplate&&e.popupEnabled&&e.visible&&l&&p});return g(m.map(async e=>{const l=e.createQuery(),p=v(y)?y.event:null,h=E({renderer:e.renderer,event:p});return l.geometry=this.createFetchPopupFeaturesQueryGeometry(o,h),l.outFields=await e.popupTemplate.getRequiredFields(),(await e.queryFeatures(l)).features})).then(e=>[].concat(...e.map(l=>l.value).filter(Boolean)))}};return r([s()],t.prototype,"layer",void 0),t=r([d("esri.layers.mixins.TileLayerView")],t),t};let i=class extends I(w(P(x(b)))){constructor(){super(...arguments),this.type="tile-3d"}get imageFormatIsOpaque(){return this.layer.tileInfo.format==="jpg"}get hasMixedImageFormats(){return this.layer.tileInfo.format==="mixed"}get dataLevelRange(){if(this.tileInfo){const a=this.tileInfo.lods,t=a[0].scale,o=a[a.length-1].scale;return this.levelRangeFromScaleRange(t,o)}return{minLevel:0,maxLevel:0}}initialize(){if(this.layer.type==="web-tile"){const a=this.layer.get("fullExtent.spatialReference"),t=this.layer.get("tileInfo.spatialReference");if(c(a)||c(t)||!F(a,t)){const o=this.layer.originOf("fullExtent")==="defaults"||c(this.layer.fullExtent)?"SceneView requires fullExtent to be specified by the user on WebTileLayer":"SceneView requires fullExtent to be specified in the same spatial reference as tileInfo on WebTileLayer";this.addResolvingPromise(Promise.reject(new u("layerview:incompatible-fullextent",o)))}}this._addTilingSchemeMatchPromise()}createFetchPopupFeaturesQueryGeometry(a,t){return L(a,t,this.view)}async doRefresh(){this.suspended||this.emit("data-changed")}};r([s({readOnly:!0})],i.prototype,"imageFormatIsOpaque",null),r([s({readOnly:!0})],i.prototype,"hasMixedImageFormats",null),r([s({aliasOf:"layer.fullExtent"})],i.prototype,"fullExtent",void 0),r([s()],i.prototype,"layer",void 0),r([s({aliasOf:"layer.tileInfo"})],i.prototype,"tileInfo",void 0),r([s({readOnly:!0})],i.prototype,"dataLevelRange",null),i=r([d("esri.views.3d.layers.TileLayerView3D")],i);const T=i;export{T as default};