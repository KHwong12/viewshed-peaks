import{ag as y,by as f,A as n,E as d,ft as g,K as v,O as u,aG as F,h as m,r as i,t as a,cC as b,cA as w,w as _}from"./vendor.d423bc92.js";import{WhereClause as S}from"./WhereClause.34680e97.js";import{$ as E,u as j}from"./I3SMeshView3D.6aa0abb1.js";import{o as I,c as C,s as x,i as Q,a as q}from"./SceneLayerView.fc252625.js";import{O as h,d as O,a as D,n as A}from"./I3SQueryFeatureStore.b25284c2.js";import{d as R}from"./I3SUtil.d646bdba.js";import{p as $}from"./DefinitionExpressionSceneLayerView.811804fe.js";import{c as L}from"./PopupSceneLayerView.baa8456d.js";import"./I3SAttributeOverrides.4bd7adb0.js";import"./I3SBinaryReader.46990efd.js";import"./SceneModification.aa606202.js";import"./persistable.cd5a03c6.js";import"./multiOriginJSONSupportUtils.f4e66410.js";import"./Graphics3DScaleVisibility.e0687830.js";import"./optimizedFeatureQueryEngineAdapter.3d6ba7a2.js";import"./centroid.d8eb382d.js";import"./PooledRBush.2ccf2077.js";import"./quickselect.32614045.js";import"./SceneLayerWorker.94ac04c2.js";import"./attributeUtils.a1b96ab7.js";import"./QueryEngine.5cc290e3.js";import"./json.2d0d6862.js";import"./QueryEngineCapabilities.83e56447.js";import"./utils.be34ef8d.js";import"./ClassBreaksDefinition.5f2e3a30.js";import"./popupUtils.a905553f.js";const V=y.getLogger("esri.views.3d.layers.SceneLayerView3D"),c=q();let r=class extends E($(L(f(I)))){constructor(){super(...arguments),this.type="scene-layer-3d",this.lodFactor=1,this.progressiveLoadFactor=1,this._elevationContext="scene",this._isIntegratedMesh=!1,this._supportsLabeling=!0,this._interactiveEditingSessions=new Map,this._queryEngine=null}get filter(){return n(this.viewFilter)?this.viewFilter.filter:null}set filter(e){!d(e)&&h.checkSupport(e)?n(this.viewFilter)?this.viewFilter.filter=e:this.viewFilter=new h({filter:e,layerFieldsIndex:this.layer.fieldsIndex,loadAsyncModule:t=>this._loadAsyncModule(t),applyFilters:()=>this._applyFilters(!0),addSqlFilter:(t,s)=>this.addSqlFilter(t,s,this.logError)}):this.viewFilter=null}get requiredFields(){var e,t;return(e=(t=this.fieldsHelper)==null?void 0:t.requiredFields)!=null?e:[]}get floorFilterClause(){const e=g(this);return n(e)?S.create(e,this.layer.fieldsIndex):null}get lodCrossfadeinDuration(){var e,t;return(e=(t=this.view)==null?void 0:t.qualitySettings.sceneService["3dObject"].lodCrossfadeinDuration)!=null?e:0}get lodCrossfadeoutDuration(){var e,t;return(e=(t=this.view)==null?void 0:t.qualitySettings.sceneService["3dObject"].lodCrossfadeoutDuration)!=null?e:0}get lodCrossfadeUncoveredDuration(){var e,t;return(e=(t=this.view)==null?void 0:t.qualitySettings.sceneService["3dObject"].lodCrossfadeUncoveredDuration)!=null?e:0}initialize(){this.fieldsHelper=new C({layerView:this}),this.updatingHandles.add(this.layer,"rangeInfos",e=>this._rangeInfosChanged(e),2),this.updatingHandles.add(this.layer,"renderer",e=>this.updatingHandles.addPromise(this._rendererChange(e)),2);for(const e of["parsedDefinitionExpression","filter","viewFilter.parsedWhereClause","viewFilter.parsedGeometry","viewFilter.sortedObjectIds","floorFilterClause"])this.updatingHandles.add(this,e,()=>this._filterChange());for(const e of["filter","viewFilter.parsedGeometry"])this.updatingHandles.add(this,e,()=>this._geometryFilterChange());this.handles.add(this.layer.on("apply-edits",e=>this.updatingHandles.addPromise(e.result))),this.handles.add(this.layer.on("edits",e=>this._handleEdits(e)))}destroy(){this.fieldsHelper=v(this.fieldsHelper)}_rangeInfosChanged(e){e!=null&&e.length>0&&V.warn("Unsupported property: rangeInfos are currently only serialized to and from web scenes but do not affect rendering.")}createQuery(){const e={outFields:["*"],returnGeometry:!1,outSpatialReference:this.view.spatialReference};return n(this.filter)?this.filter.createQuery(e):new u(e)}queryExtent(e,t){return this._ensureQueryEngine().executeQueryForExtent(this._ensureQuery(e),t==null?void 0:t.signal)}queryFeatureCount(e,t){return this._ensureQueryEngine().executeQueryForCount(this._ensureQuery(e),t==null?void 0:t.signal)}queryFeatures(e,t){return this._ensureQueryEngine().executeQuery(this._ensureQuery(e),t==null?void 0:t.signal).then(s=>{if(s==null||!s.features)return s;const l=this.layer;for(const o of s.features)o.layer=l,o.sourceLayer=l;return s})}queryObjectIds(e,t){return this._ensureQueryEngine().executeQueryForIds(this._ensureQuery(e),t==null?void 0:t.signal)}_ensureQueryEngine(){return this._queryEngine||(this._queryEngine=this._createQueryEngine()),this._queryEngine}_createQueryEngine(){const e=j(this.view.spatialReference,this.view.renderSpatialReference,this._collection);return new O({layerView:this,priority:F.FEATURE_QUERY_ENGINE,spatialIndex:new D({featureAdapter:new A({objectIdField:this.layer.objectIdField,attributeStorageInfo:this.layer.attributeStorageInfo,getFeatureExtent:e}),forAllFeatures:(t,s)=>this._forAllFeatures((l,o,p)=>t({id:l,index:o,meta:p}),s,2),getFeatureExtent:e,sourceSpatialReference:R(this.layer),viewSpatialReference:this.view.spatialReference})})}highlight(e){const t=this._highlights;if(e instanceof u){const{set:s,handle:l}=t.acquireSet();return this.queryObjectIds(e).then(o=>t.setFeatureIds(s,o)),l}return super.highlight(e)}createInteractiveEditSession(e){return x(this.attributeEditingContext,e)}_createLayerGraphic(e){const t=new m(null,null,e);return t.layer=this.layer,t.sourceLayer=this.layer,t}canResume(){return super.canResume()&&(!this._controller||this._controller.rootNodeVisible)}getFilters(){const e=super.getFilters();return this.floorFilterClause&&this.addSqlFilter(e,this.floorFilterClause,this.logError),this.addSqlFilter(e,this.parsedDefinitionExpression,this.logError),n(this.viewFilter)&&this.viewFilter.addFilters(e,this.view,this._controller.crsIndex,this._collection),e}_ensureQuery(e){return this._addDefinitionExpressionToQuery(d(e)?this.createQuery():u.from(e))}get attributeEditingContext(){return{sessions:this._interactiveEditingSessions,fieldsIndex:this.layer.fieldsIndex,objectIdField:this._getObjectIdField(),forEachNode:e=>this._forAllNodes(t=>n(t)?e(t.node,t.featureIds):null),attributeStorageInfo:this.i3slayer.attributeStorageInfo,attributeOverrides:this.attributeOverrides,getAttributeData:e=>this.getAttributeData(e),setAttributeData:(e,t)=>this.setAttributeData(e,t),clearMemCache:()=>this.clearMemCache()}}_handleEdits(e){Q(this.attributeEditingContext,e)}get hasGeometryFilter(){const e=this.viewFilter;return n(e)&&n(e.parsedGeometry)}computeNodeFiltering(e){const t=this.viewFilter;return d(t)||t.isMBSGeoemtryVisible(e,this.view.spatialReference,this._controller.crsIndex)?0:1}};i([a({aliasOf:"layer"})],r.prototype,"i3slayer",void 0),i([a()],r.prototype,"suspended",void 0),i([a(b)],r.prototype,"updatingProgress",void 0),i([a({type:w})],r.prototype,"filter",null),i([a()],r.prototype,"viewFilter",void 0),i([a(c.requiredFields)],r.prototype,"requiredFields",null),i([a(c.availableFields)],r.prototype,"availableFields",void 0),i([a()],r.prototype,"fieldsHelper",void 0),i([a()],r.prototype,"floorFilterClause",null),i([a({readOnly:!0,aliasOf:"view.qualitySettings.sceneService.3dObject.lodFactor"})],r.prototype,"lodFactor",void 0),i([a({readOnly:!0,aliasOf:"_controller.updatingProgress"})],r.prototype,"updatingProgressValue",void 0),r=i([_("esri.views.3d.layers.SceneLayerView3D")],r);const ue=r;export{ue as default};