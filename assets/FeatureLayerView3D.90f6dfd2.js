import{r as t,t as i,w as s,fY as a,U as r,aZ as o}from"./vendor.d423bc92.js";import{x as p}from"./FeatureLayerViewBase3D.05484b15.js";import"./EventedSet.2ddd43ec.js";import"./Graphics3DFeatureLikeLayerView.3154b596.js";import"./Graphics3DScaleVisibility.e0687830.js";import"./optimizedFeatureQueryEngineAdapter.3d6ba7a2.js";import"./centroid.d8eb382d.js";import"./PooledRBush.2ccf2077.js";import"./quickselect.32614045.js";import"./Graphics3DObjectStates.af9a6581.js";import"./QueryEngine.5cc290e3.js";import"./WhereClause.34680e97.js";import"./json.2d0d6862.js";import"./QueryEngineCapabilities.83e56447.js";import"./utils.be34ef8d.js";import"./ClassBreaksDefinition.5f2e3a30.js";import"./Graphics3DFrustumVisibility.0f54595c.js";import"./attributeUtils.a1b96ab7.js";import"./projectExtentUtils.1289c9eb.js";import"./popupUtils.a905553f.js";import"./RefreshableLayerView.dc4ceb0c.js";let e=class extends p{constructor(){super(...arguments),this.type="feature-3d",this.direct3DObjectFeatureLayerDisplayEnabled=a()}initialize(){this.layer.infoFor3D&&!this.direct3DObjectFeatureLayerDisplayEnabled&&this.addResolvingPromise(Promise.reject(new r("featurelayerview3d:unsupported-geometry-type",`Unsupported geometry type ${this.layer.geometryType}`))),this.layer.geometryType!=="mesh"||o(this.layer.spatialReference,this.view.spatialReference)||this.addResolvingPromise(Promise.reject(new r("layerview:spatial-reference-incompatible","The spatial references of the feature layer layer is incompatible with the spatial reference of the view")))}};t([i({constructOnly:!0})],e.prototype,"direct3DObjectFeatureLayerDisplayEnabled",void 0),t([i()],e.prototype,"layer",void 0),e=t([s("esri.views.3d.layers.FeatureLayerView3D")],e);const P=e;export{P as default};
