import{ag as p,bx as c,by as f,bz as m,fS as u,U as g,r as s,t as a,w as y}from"./vendor.d423bc92.js";import{i as x}from"./RefreshableLayerView.dc4ceb0c.js";const d=p.getLogger("esri.views.3d.layers.WMTSLayerView3d");let r=class extends x(c(f(m))){constructor(){super(...arguments),this.type="wmts-3d"}get hasMixedImageFormats(){return!0}initialize(){const e=u(this.view,"basemapTerrain.tilingSchemeDone").then(()=>{const t=()=>new g("layerview:no-compatible-tiling-scheme","None of the tiling schemes supported by the service are compatible with the scene.");if(!this.view.basemapTerrain.tilingSchemeLocked)throw t();const l=this.view.basemapTerrain.tilingScheme,n=this.layer.activeLayer;let i;if(n&&n.tileMatrixSet){i=n.tileMatrixSet;const o=i.tileInfo,h=this._getTileInfoSupportError(o,i.fullExtent)||this._getTileInfoCompatibilityError(o,l);if(h)throw h}else{if(i=this._getCompatibleTileMatrixSet(),!i)throw t();n.tileMatrixSetId=i.id}this._set("tileInfo",i.tileInfo),this._set("fullExtent",i.fullExtent),this.layer.fullExtent=i.fullExtent});this.addResolvingPromise(e),this.when(()=>this._initialized())}refresh(){this.emit("data-changed")}canResume(){if(!super.canResume())return!1;const e=this.layer.activeLayer.tileMatrixSet;return e&&!this._getTileInfoError(e.tileInfo,e.fullExtent)}async doRefresh(){this.suspended||this.emit("data-changed")}_initialized(){this.updatingHandles.add(this,"layer.activeLayer.styleId",()=>this.refresh()),this.updatingHandles.add(this,"tileMatrixSet",()=>this.refresh()),this.updatingHandles.add(this.layer,"activeLayer",e=>{let t=e.tileMatrixSet;if(t){const l=this._getTileInfoError(t.tileInfo,t.fullExtent);l&&(d.error("The selected tile matrix set is not compatible with the view",l),t=null)}else t=this._getCompatibleTileMatrixSet(),t?e.tileMatrixSetId=t.id:d.error("The layer does not provide a tiling scheme that is compatible with the view");this.notifyChange("suspended"),this.canResume()&&this.refresh()})}_getCompatibleTileMatrixSet(){return this.layer.activeLayer.tileMatrixSets.find(e=>{const t=e.tileInfo;return!this._getTileInfoError(t,e.fullExtent)})}_getTileInfoError(e,t){return this._getTileInfoSupportError(e,t)||this._getTileInfoCompatibilityError(e,this.view.basemapTerrain.tilingScheme)}};s([a({readOnly:!0})],r.prototype,"hasMixedImageFormats",null),s([a()],r.prototype,"fullExtent",void 0),s([a()],r.prototype,"layer",void 0),s([a()],r.prototype,"suspended",void 0),s([a()],r.prototype,"tileInfo",void 0),r=s([y("esri.views.3d.layers.WMTSLayerView3D")],r);const b=r;export{b as default};
