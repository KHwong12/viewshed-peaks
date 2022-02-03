var V=Object.defineProperty;var m=Object.getOwnPropertySymbols;var M=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable;var f=(t,e,r)=>e in t?V(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,g=(t,e)=>{for(var r in e||(e={}))M.call(e,r)&&f(t,r,e[r]);if(m)for(var r of m(e))U.call(e,r)&&f(t,r,e[r]);return t};import{r as i,t as s,w as c,cu as $,ct as k,z as F,fU as L,A as h,h as T,cA as D,by as C,bz as z,U as Q,O as A}from"./vendor.d423bc92.js";import{t as N,h as P}from"./createConnection.7446f31c.js";import{s as J,E as q}from"./EventedSet.2ddd43ec.js";import"./Graphics3DFeatureLikeLayerView.3154b596.js";import"./Graphics3DScaleVisibility.e0687830.js";import"./optimizedFeatureQueryEngineAdapter.3d6ba7a2.js";import"./centroid.d8eb382d.js";import"./PooledRBush.2ccf2077.js";import"./quickselect.32614045.js";import"./Graphics3DObjectStates.af9a6581.js";import"./QueryEngine.5cc290e3.js";import"./WhereClause.34680e97.js";import"./json.2d0d6862.js";import"./QueryEngineCapabilities.83e56447.js";import"./utils.be34ef8d.js";import"./ClassBreaksDefinition.5f2e3a30.js";import"./Graphics3DFrustumVisibility.0f54595c.js";import"./attributeUtils.a1b96ab7.js";import"./projectExtentUtils.1289c9eb.js";var d;const B=2500;let l=d=class extends T{getObjectId(){return this.objectId}clone(){return new d(g({objectId:this.objectId},this.cloneProperties()))}};i([s({type:Number,json:{read:!0}})],l.prototype,"objectId",void 0),l=d=i([c("esri.layers.graphics.controllers.StreamGraphic")],l);class Z{constructor(e){this.onUpdate=e,this._idToGraphic=new Map}destroy(){this._idToGraphic.clear()}add(e){this._idToGraphic.set(e.objectId,e)}get(e){return this._idToGraphic.get(e)}forEach(e){this._idToGraphic.forEach(e)}removeById(e){const r=this._idToGraphic.get(e);return r?(r.sourceLayer=r.layer=null,this._idToGraphic.delete(e),r):null}update(e,r){this.onUpdate(e,r)}get size(){return this._idToGraphic.size}}let n=class extends $(k(F)){constructor(){super(...arguments),this._updateInfo={websocket:0,client:0},this.graphics=new J}initialize(){this.addResolvingPromise(this.layer.when(()=>this._startup()))}destroy(){this.clear()}clear(){this._updateIntervalId&&(clearInterval(this._updateIntervalId),this._updateIntervalId=0),this.connection&&(this.connection.destroy(),this.connection=null),this.store&&(this.store.destroy(),this.store=null),this.graphics.clear(),this.handles.removeAll()}get updating(){return!this.connection||this.connection.connectionStatus==="connected"}_startup(){const{parsedUrl:t,spatialReference:e,definitionExpression:r,geometryDefinition:b,objectIdField:v,timeInfo:w,purgeOptions:_,maxReconnectionAttempts:j,maxReconnectionInterval:I,updateInterval:S}=this.layer,O=L.toJSON(this.layer.geometryType),E=e,u=this.layerView.view.spatialReference,G={geometry:b,where:r};this.clear(),this._set("connection",N(t,E,u,O,G,j,I)),this._outSpatialReference=u.toJSON(),this.store=new Z(this._onUpdate.bind(this)),this.featuresManager=new P(this.store,v,w.toJSON(),_),this.handles.add([this.connection.on("feature",a=>this._onFeature(a)),this.layer.watch("definitionExpression",()=>this._startup()),this.layer.watch("geometryDefinition",()=>this._startup()),this.layer.watch("purgeOptions",()=>this._startup())]);let y=performance.now();this._updateIntervalId=setInterval(()=>{const a=performance.now(),p=a-y;if(p>B){y=a;const x=Math.round(this._updateInfo.client/(p/1e3)),R=Math.round(this._updateInfo.websocket/(p/1e3));this._updateInfo.client=0,this._updateInfo.websocket=0,this.layerView.emit("update-rate",{client:x,websocket:R})}this.featuresManager.checkForUpdates()},S)}_onFeature(t){this._updateInfo.websocket++,this.layerView.hasEventListener("data-received")&&this.layerView.emit("data-received",{attributes:t.attributes,centroid:t.centroid,geometry:t.geometry});try{h(t.geometry)&&!t.geometry.spatialReference&&(t.geometry.spatialReference=this._outSpatialReference);const e=l.fromJSON(t);e.sourceLayer=e.layer=this.layer,this.featuresManager.add(e)}catch{}}_onUpdate(t,e){h(e)&&this.graphics.removeMany(e),h(t)&&(this._updateInfo.client+=t.length,this.graphics.addMany(t))}};i([s()],n.prototype,"connection",void 0),i([s()],n.prototype,"layer",void 0),i([s()],n.prototype,"layerView",void 0),i([s({readOnly:!0})],n.prototype,"updating",null),n=i([c("esri.layers.graphics.controllers.StreamController")],n);const W=n,H=t=>{let e=class extends t{constructor(...r){super(...r),this.connectionError=null,this.connectionStatus="disconnected",this.filter=null}};return i([s({readOnly:!0})],e.prototype,"connectionError",void 0),i([s({aliasOf:"controller.connection.connectionStatus",readOnly:!0})],e.prototype,"connectionStatus",void 0),i([s({type:D})],e.prototype,"filter",void 0),e=i([c("esri.layers.mixins.StreamLayerView")],e),e};let o=class extends H(q(C(z))){constructor(){super(...arguments),this.type="stream-3d",this.updatePolicy=0,this.hasZ=!0,this.hasM=!1}get connectionError(){const t=this.get("controller.connection.errorString");if(t)return new Q("stream-controller",t)}createQuery(){return new A({outFields:["*"],returnGeometry:!0,outSpatialReference:this.view.spatialReference})}queryLatestObservations(t,e){return this.queryEngine.executeQueryForLatestObservations(this._ensureQuery(t),e==null?void 0:e.signal)}createController(){return new W({layer:this.layer,layerView:this})}beforeSetController(){}};i([s({readOnly:!0})],o.prototype,"updatePolicy",void 0),i([s({readOnly:!0})],o.prototype,"connectionError",null),i([s()],o.prototype,"controller",void 0),i([s({readOnly:!0})],o.prototype,"hasZ",void 0),i([s({readOnly:!0})],o.prototype,"hasM",void 0),o=i([c("esri.views.3d.layers.StreamLayerView3D")],o);const ge=o;export{ge as default};
