import{ac as h,eB as m,eL as o,A as g,eT as d,kJ as _,db as f,a_ as E,U as u,bA as w,J as F,ag as j}from"./vendor.d423bc92.js";import{m as q}from"./FeatureStore.5667e048.js";import{g as b,L as S,f as x}from"./QueryEngine.5cc290e3.js";import{O as T,L as C}from"./geojson.6e4b46ff.js";import{d as k}from"./sourceUtils.8559eeea.js";import{K as I}from"./wfsUtils.9263095d.js";import"./PooledRBush.2ccf2077.js";import"./quickselect.32614045.js";import"./optimizedFeatureQueryEngineAdapter.3d6ba7a2.js";import"./centroid.d8eb382d.js";import"./WhereClause.34680e97.js";import"./json.2d0d6862.js";import"./QueryEngineCapabilities.83e56447.js";import"./utils.be34ef8d.js";import"./ClassBreaksDefinition.5f2e3a30.js";import"./xmlUtils.9790bce4.js";class K{constructor(){this._queryEngine=null,this._customParameters=null,this._snapshotFeatures=async e=>{const{objectIdField:t}=this._queryEngine,r=await I(this._getFeatureUrl,this._featureType.typeName,this._getFeatureOutputFormat,{customParameters:this._customParameters,dateFields:this._queryEngine.fieldsIndex.dateFields.map(s=>s.name),signal:e});await T(r),h(e);const a=C(r,{geometryType:this._queryEngine.geometryType,hasZ:!1,objectIdField:t});if(!m(this._queryEngine.spatialReference,o))for(const s of a)g(s.geometry)&&(s.geometry=d(b(_(s.geometry,this._queryEngine.geometryType,!1,!1),o,this._queryEngine.spatialReference)));let n=1;for(const s of a){const i={};k(this._fieldsIndex,i,s.attributes,!0),s.attributes=i,s.attributes[t]==null&&(s.objectId=s.attributes[t]=n++)}return a}}destroy(){var e;(e=this._queryEngine)==null||e.destroy(),this._queryEngine=null}async load(e,t){const{getFeatureUrl:r,getFeatureOutputFormat:a,spatialReference:n,fields:s,geometryType:i,featureType:p,objectIdField:y,customParameters:c}=e;this._featureType=p,this._customParameters=c,this._getFeatureUrl=r,this._getFeatureOutputFormat=a,this._fieldsIndex=new f(s),await this._checkProjection(n),h(t),this._queryEngine=new S({fields:s,geometryType:i,hasM:!1,hasZ:!1,objectIdField:y,spatialReference:n,timeInfo:null,featureStore:new q({geometryType:i,hasM:!1,hasZ:!1})});const l=await this._snapshotFeatures(E(t.signal));return this._queryEngine.featureStore.addMany(l),{extent:this._queryEngine.fullExtent}}async applyEdits(){throw new u("wfs-source:editing-not-supported","applyEdits() is not supported on WFSLayer")}async queryFeatures(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQuery(e,t.signal)}async queryFeatureCount(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForCount(e,t.signal)}async queryObjectIds(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForIds(e,t.signal)}async queryExtent(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForExtent(e,t.signal)}async querySnapping(e,t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForSnapping(e,t.signal)}async refresh(e){var t;return this._customParameters=e,(t=this._snapshotTask)==null||t.abort(),this._snapshotTask=w(this._snapshotFeatures),this._snapshotTask.promise.then(r=>{this._queryEngine.featureStore.clear(),r&&this._queryEngine.featureStore.addMany(r)},r=>{this._queryEngine.featureStore.clear(),F(r)||j.getLogger("esri.layers.WFSLayer").error(new u("wfs-layer:getfeature-error","An error occurred during the GetFeature request",{error:r}))}),await this._waitSnapshotComplete(),{extent:this._queryEngine.fullExtent}}async _waitSnapshotComplete(){if(this._snapshotTask&&!this._snapshotTask.finished){try{await this._snapshotTask.promise}catch{}return this._waitSnapshotComplete()}}async _checkProjection(e){try{await x(o,e)}catch{throw new u("unsupported-projection","Projection not supported",{spatialReference:e})}}}export{K as default};
