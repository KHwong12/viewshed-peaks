import{r as s,t as o,w as j,da as N,g as J,A as x,cQ as g,E as U,oQ as k,U as $,lP as z,lQ as A,og as Z,lH as V,of as W,lI as H,lJ as K,lL as X,lM as Y,lO as ee,lN as te,M as se,oh as D,dc as re,O as R,oi as oe,o1 as ie,oj as ne,fm as ae,at as pe,fU as T,j as le,ol as ue,ok as de,oc as ce,df as ye,B as he,l_ as fe,de as me,on as ge,m1 as ve,lT as Se,di as be}from"./vendor.d423bc92.js";import{N as we,v as C,x as xe,k as Ie,T as Fe,S as Oe,I as je,F as E,j as $e}from"./ogcFeatureUtils.6a6275c8.js";import"./geojson.6e4b46ff.js";import"./clientSideDefaults.f09cd21b.js";import"./QueryEngineCapabilities.83e56447.js";let f=class extends N{constructor(){super(...arguments),this.featureDefinition=null,this.type="ogc-feature"}load(e){return this.addResolvingPromise(this._loadOGCServices(this.layer,e)),this.when()}getFeatureDefinition(){const{featureDefinition:{collection:e,layerDefinition:t,spatialReference:n,supportedCrs:r},layer:{apiKey:a,capabilities:l,customParameters:p}}=this;return{capabilities:l,collection:e,layerDefinition:t,queryParameters:{apiKey:a,customParameters:p},spatialReference:n,supportedCrs:r}}queryExtent(e,t={}){return null}queryFeatureCount(e,t={}){return null}queryFeatures(e,t={}){return this.queryFeaturesJSON(e,t).then(n=>J.fromJSON(n))}queryFeaturesJSON(e,t={}){const n=this.getFeatureDefinition();return this.load(t).then(()=>we(n,e,t))}queryObjectIds(e,t={}){return null}supportsSpatialReference(e){return!(!e.isWGS84&&!e.isWebMercator)||!!this.featureDefinition.supportedCrs[e.wkid]}_conformsToType(e,t){var n;const r=new RegExp(`^${t}$`,"i");return(n=e.conformsTo.some(a=>r.test(a)))!=null&&n}_getCapabilities(e,t){var n,r,a,l,p,u,c;const d=x(t)?(n=t.components)==null?void 0:n.parameters:null;return{attachment:null,data:{isVersioned:!1,supportsAttachment:!1,supportsM:!1,supportsZ:e},metadata:{supportsAdvancedFieldProperties:!1},operations:{supportsCalculate:!1,supportsTruncate:!1,supportsValidateSql:!1,supportsAdd:!1,supportsDelete:!1,supportsEditing:!1,supportsChangeTracking:!1,supportsQuery:!1,supportsQueryAttachments:!1,supportsResizeAttachments:!1,supportsSync:!1,supportsUpdate:!1,supportsExceedsLimitStatistics:!1},query:{maxRecordCount:(r=(a=d==null||(l=d.limit)==null||(p=l.schema)==null?void 0:p.maximum)!=null?a:d==null||(u=d.limitFeatures)==null||(c=u.schema)==null?void 0:c.maximum)!=null?r:5e3,maxRecordCountFactor:void 0,standardMaxRecordCount:void 0,supportsCacheHint:!1,supportsCentroid:!1,supportsDisjointSpatialRelationship:!1,supportsDistance:!1,supportsDistinct:!1,supportsExtent:!1,supportsFormatPBF:!1,supportsGeometryProperties:!1,supportsHavingClause:!1,supportsHistoricMoment:!1,supportsMaxRecordCountFactor:!1,supportsOrderBy:!1,supportsPagination:!1,supportsPercentileStatistics:!1,supportsQuantization:!1,supportsQuantizationEditMode:!1,supportsQueryByOthers:!1,supportsQueryGeometry:!1,supportsResultType:!1,supportsStandardizedQueriesOnly:!1,supportsTopFeaturesQuery:!1,supportsStatistics:!1,supportsSqlExpression:!1,tileMaxRecordCount:void 0},queryRelated:{supportsCount:!1,supportsOrderBy:!1,supportsPagination:!1},editing:{supportsDeleteByAnonymous:!1,supportsDeleteByOthers:!1,supportsGeometryUpdate:!1,supportsGlobalId:!1,supportsReturnServiceEditsInSourceSpatialReference:!1,supportsRollbackOnFailure:!1,supportsUpdateByAnonymous:!1,supportsUpdateByOthers:!1,supportsUploadWithItemId:!1,supportsUpdateWithoutM:!1}}}_getExtent(e){var t;const n=(t=e.extent)==null?void 0:t.spatial;if(!n)return null;const r=n.bbox[0],a=r.length===4,l=r[0],p=r[1],u=a?void 0:r[2];return{xmin:l,ymin:p,xmax:a?r[2]:r[3],ymax:a?r[3]:r[4],zmin:u,zmax:a?void 0:r[5],spatialReference:g.WGS84.toJSON()}}_getStorageSpatialReference(e){var t;const n=(t=e.storageCrs)!=null?t:E,r=C(n);return U(r)?g.WGS84:new g({wkid:r})}_getSupportedSpatialReferences(e,t){var n;const r="#/crs",a=(n=e.crs)!=null?n:[E],l=a.includes(r)?a.filter(u=>u!==r).concat(t.crs):a,p=/^http:\/\/www\.opengis.net\/def\/crs\/epsg\/.*\/3785$/i;return l.filter(u=>!p.test(u))}async _loadOGCServices(e,t){const n=x(t)?t.signal:null,{apiKey:r,collectionId:a,customParameters:l,fields:p,geometryType:u,hasZ:c,objectIdField:d,timeInfo:I,url:P}=e,_={fields:p==null?void 0:p.map(h=>h.toJSON()),geometryType:k.toJSON(u),hasZ:c,objectIdField:d,timeInfo:I==null?void 0:I.toJSON()},m={apiKey:r,customParameters:l,signal:n},v=await xe(P,m),[F,O]=await Promise.all([Ie(v,m),Fe(v,m)]);if(!this._conformsToType(F,"http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/geojson"))throw new $("ogc-feature-layer:no-geojson-support","Server does not support geojson");const y=O.collections.find(h=>h.id===a);if(!y)throw new $("ogc-feature-layer:collection-not-found","Server does not contain the named collection");const q=this._conformsToType(F,"http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/oas30")?await Oe(v,m):null,S=await je(y,_,m),G=this._getCapabilities(S.hasZ,q),Q=this._getExtent(y),B=this._getStorageSpatialReference(y).toJSON(),M=this._getSupportedSpatialReferences(y,O),L=new RegExp(`^${$e}`,"i"),b={};for(const h of M){const w=C(h);x(w)&&(b[w]||(b[w]=h.replace(L,"")))}S.extent=Q,this.featureDefinition={capabilities:G,collection:y,layerDefinition:S,queryParameters:{},spatialReference:B,supportedCrs:b}}};s([o()],f.prototype,"featureDefinition",void 0),s([o({constructOnly:!0})],f.prototype,"layer",void 0),s([o()],f.prototype,"type",void 0),f=s([j("esri.layers.graphics.sources.OGCFeatureSource")],f);const De=f,Re=be();let i=class extends z(A(Z(V(W(H(K(X(Y(ee(te(se))))))))))){constructor(e){super(e),this.collectionId=null,this.copyright=null,this.definitionExpression=null,this.description=null,this.displayField=null,this.elevationInfo=null,this.featureReduction=null,this.fields=null,this.fieldsIndex=null,this.fullExtent=null,this.geometryType=null,this.hasZ=void 0,this.labelingInfo=null,this.labelsVisible=!0,this.legendEnabled=!0,this.objectIdField=null,this.operationalLayerType="OGCFeatureLayer",this.popupEnabled=!0,this.popupTemplate=null,this.screenSizePerspectiveEnabled=!0,this.source=new De({layer:this}),this.spatialReference=null,this.title=null,this.type="ogc-feature",this.typeIdField=null,this.types=null,this.url=null}destroy(){var e;(e=this.source)==null||e.destroy()}load(e){return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["OGCFeatureServer"]},e).then(()=>this._fetchService(e))),this.when()}get defaultPopupTemplate(){return this.createPopupTemplate()}get isTable(){return this.loaded&&this.geometryType==null}set renderer(e){D(e,this.fieldsIndex),this._set("renderer",e)}on(e,t){return super.on(e,t)}createPopupTemplate(e){return re(this,e)}createQuery(){return new R}getField(e){return this.fieldsIndex.get(e)}getFieldDomain(e,t){var n;let r,a=!1;const l=t==null||(n=t.feature)==null?void 0:n.attributes,p=this.typeIdField&&(l==null?void 0:l[this.typeIdField]);return p!=null&&this.types&&(a=this.types.some(u=>{var c,d;return u.id==p&&(r=(c=u.domains)==null?void 0:c[e],((d=r)==null?void 0:d.type)==="inherited"&&(r=this._getLayerDomain(e)),!0)})),a||r||(r=this._getLayerDomain(e)),r}queryFeatures(e,t){return this.load().then(()=>this.source.queryFeatures(R.from(e)||this.createQuery(),t)).then(n=>{var r;return n==null||(r=n.features)==null||r.forEach(a=>{a.layer=a.sourceLayer=this}),n})}async _fetchService(e){await this.source.load(e),this.read(this.source.featureDefinition,{origin:"service"}),D(this.renderer,this.fieldsIndex),oe(this.timeInfo,this.fieldsIndex)}_getLayerDomain(e){if(!this.fields)return null;for(const t of this.fields)if(t.name===e&&t.domain)return t.domain;return null}};s([o({readOnly:!0,json:{origins:{service:{read:!0}}}})],i.prototype,"capabilities",void 0),s([o({type:String,json:{write:!0}})],i.prototype,"collectionId",void 0),s([o({type:String})],i.prototype,"copyright",void 0),s([o({readOnly:!0})],i.prototype,"defaultPopupTemplate",null),s([o({type:String})],i.prototype,"definitionExpression",void 0),s([o({readOnly:!0,type:String,json:{origins:{service:{name:"collection.description"}}}})],i.prototype,"description",void 0),s([o({type:String})],i.prototype,"displayField",void 0),s([o(ie)],i.prototype,"elevationInfo",void 0),s([o(ne)],i.prototype,"featureReduction",void 0),s([o({type:[ae],json:{origins:{service:{name:"layerDefinition.fields"}}}})],i.prototype,"fields",void 0),s([o(Re.fieldsIndex)],i.prototype,"fieldsIndex",void 0),s([o({readOnly:!0,type:pe,json:{origins:{service:{name:"layerDefinition.extent"}}}})],i.prototype,"fullExtent",void 0),s([o({type:T.apiValues,json:{origins:{service:{name:"layerDefinition.geometryType",read:{reader:T.read}}}}})],i.prototype,"geometryType",void 0),s([o({type:Boolean,json:{origins:{service:{name:"layerDefinition.hasZ"}}}})],i.prototype,"hasZ",void 0),s([o({type:Boolean,readOnly:!0})],i.prototype,"isTable",null),s([o({type:[le],json:{origins:{"web-document":{name:"layerDefinition.drawingInfo.labelingInfo",read:{reader:ue},write:!0}}}})],i.prototype,"labelingInfo",void 0),s([o(de)],i.prototype,"labelsVisible",void 0),s([o(ce)],i.prototype,"legendEnabled",void 0),s([o({type:String,json:{origins:{service:{name:"layerDefinition.objectIdField"}}}})],i.prototype,"objectIdField",void 0),s([o({type:["OGCFeatureLayer"]})],i.prototype,"operationalLayerType",void 0),s([o(ye)],i.prototype,"popupEnabled",void 0),s([o({type:he,json:{name:"popupInfo",write:!0}})],i.prototype,"popupTemplate",void 0),s([o({types:fe,json:{origins:{service:{name:"layerDefinition.drawingInfo.renderer",write:!1},"web-scene":{types:me,name:"layerDefinition.drawingInfo.renderer",write:!0}},name:"layerDefinition.drawingInfo.renderer",write:!0}})],i.prototype,"renderer",null),s([o(ge)],i.prototype,"screenSizePerspectiveEnabled",void 0),s([o({readOnly:!0})],i.prototype,"source",void 0),s([o({readOnly:!0,type:g,json:{origins:{service:{read:!0}}}})],i.prototype,"spatialReference",void 0),s([o({type:String,json:{write:{enabled:!0,ignoreOrigin:!0,isRequired:!0},origins:{service:{name:"collection.title"}}}})],i.prototype,"title",void 0),s([o({readOnly:!0,json:{read:!1}})],i.prototype,"type",void 0),s([o({type:String,readOnly:!0})],i.prototype,"typeIdField",void 0),s([o({type:[ve]})],i.prototype,"types",void 0),s([o(Se)],i.prototype,"url",void 0),i=s([j("esri.layers.OGCFeatureLayer")],i);const qe=i;export{qe as default};
