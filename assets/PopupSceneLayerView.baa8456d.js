import{r as f,w as P,U as u,A as l,cy as w,cz as F}from"./vendor.d423bc92.js";import{d as h,t as m}from"./popupUtils.a905553f.js";const L=y=>{let a=class extends y{_validateFetchPopupFeatures(p){const{layer:e}=this,{popupEnabled:s}=e;return s?h(e,p)?void 0:new u("scenelayerview3d:fetchPopupFeatures","Layer does not define a popup template",{layer:e}):new u("scenelayerview3d:fetchPopupFeatures","Popups are disabled",{layer:e})}async prepareFetchPopupFeatures(p){}async fetchPopupFeatures(p,e){const s=this._validateFetchPopupFeatures(e);if(s)return Promise.reject(s);const i=l(e)?e.clientGraphics:null;if(!i||i.length===0)return Promise.resolve([]);const d=this.layer.type==="scene"&&l(this.layer.associatedLayer)?this.layer.associatedLayer:this.layer,c=w(this.layer.fieldsIndex,await m(d,h(this.layer,e)));await this.prepareFetchPopupFeatures(c);const n=new Set,o=[],r=[];for(const t of i)F(c,t,n)?r.push(t):o.push(t);return r.length===0?Promise.resolve(o):this.whenGraphicAttributes(r,[...n]).catch(()=>r).then(t=>o.concat(t))}};return a=f([P("esri.views.3d.layers.support.PopupSceneLayerView")],a),a};export{L as c};