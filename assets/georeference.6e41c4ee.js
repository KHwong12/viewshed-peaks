import{an as H,k9 as j,hy as D,cZ as U,iI as V,ka as J,kb as z,r as p,t as g,w as W,dY as Z,aq as L,gL as K,iO as _,kc as Q,go as X,d1 as q,cG as m,d4 as B,kd as h,ke as tt,cH as nt,cF as I,dH as rt,kf as d,b8 as et,kg as at,kh as ot,ki as it,d as st,A as T,kj as lt,kk as ct,i_ as F,kl as ut,km as O,E as f,kn as k,ko as y,kp as pt,kq as gt,cR as ft,kr as ht,ai as yt,i6 as mt,d3 as $t,ks as At,kt as dt,ku as kt,kv as vt,kw as wt,kx as xt}from"./vendor.d423bc92.js";function $(t=Ft){return[t[0],t[1],t[2],t[3]]}function Yt(t,r,n=$()){return H(A(n),t),n[3]=r,n}function Gt(t,r,n=$()){return j(v,A(t),M(t)),j(P,A(r),M(r)),U(v,P,v),Tt(n,V(J(A(n),v)))}function A(t){return t}function M(t){return D(t[3])}function Tt(t,r){return t[3]=r,t}const Ft=[0,0,1,0],v=z(),P=z();$();var R;let u=R=class extends Z{constructor(t){super(t),this.origin=L(),this.translation=L(),this.rotation=$(),this.scale=K(1,1,1),this.geographic=!0}get localMatrix(){const t=m();return _(t,t,this.scale),Q(t,t,M(this.rotation),A(this.rotation)),X(t,t,this.translation),t}get localMatrixInverse(){return q(m(),this.localMatrix)}applyLocal(t,r){return B(r,t,this.localMatrix)}applyLocalInverse(t,r){return B(r,t,this.localMatrixInverse)}project(t,r){const n=new Float64Array(t.length),e=h.fromTypedArray(n),a=h.fromTypedArray(t);if(this.geographic){const s=tt(nt(r)),c=m();return I(r,this.origin,c,s),rt(c,c,this.localMatrix),d(e,a,c),et(n,s,0,n,r,0,n.length/3),n}const{localMatrix:o,origin:i}=this;at(o,ot)?it(e,a):d(e,a,o);for(let s=0;s<n.length;s+=3)n[s+0]+=i[0],n[s+1]+=i[1],n[s+2]+=i[2];return n}getOriginPoint(t){const[r,n,e]=this.origin;return new st({x:r,y:n,z:e,spatialReference:t})}equals(t){return T(t)&&this.geographic===t.geographic&&lt(this.origin,t.origin)&&ct(this.localMatrix,t.localMatrix)}clone(){const t={origin:F(this.origin),translation:F(this.translation),rotation:$(this.rotation),scale:F(this.scale),geographic:this.geographic};return new R(t)}};p([g({type:[Number],nonNullable:!0,json:{write:!0}})],u.prototype,"origin",void 0),p([g({type:[Number],nonNullable:!0,json:{write:!0}})],u.prototype,"translation",void 0),p([g({type:[Number],nonNullable:!0,json:{write:!0}})],u.prototype,"rotation",void 0),p([g({type:[Number],nonNullable:!0,json:{write:!0}})],u.prototype,"scale",void 0),p([g({type:Boolean,nonNullable:!0,json:{write:!0}})],u.prototype,"geographic",void 0),p([g()],u.prototype,"localMatrix",null),p([g()],u.prototype,"localMatrixInverse",null),u=R=p([W("esri.geometry.support.MeshTransform")],u);const Mt=u;function w(t,r){var n;return t.isGeographic||t.isWebMercator&&((n=r==null?void 0:r.geographic)==null||n)}function Y(t,r,n){return w(r.spatialReference,n)?Nt(t,r,n):Et(t,r,n)}function Rt(t,r,n){const{position:e,normal:a,tangent:o}=t;if(f(r))return{position:e,normal:a,tangent:o};const i=r.localMatrix;return Y({position:vt(e,new Float64Array(e.length),i),normal:T(a)?wt(a,new Float32Array(a.length),i):null,tangent:T(o)?xt(o,new Float32Array(o.length),i):null},r.getOriginPoint(n),{geographic:r.geographic})}function St(t,r,n){if(n!=null&&n.useTransform){var e;const{position:a,normal:o,tangent:i}=t;return{vertexAttributes:{position:a,normal:o,tangent:i},transform:new Mt({origin:[r.x,r.y,(e=r.z)!=null?e:0],geographic:w(r.spatialReference,n)})}}return{vertexAttributes:Y(t,r,n),transform:null}}function bt(t,r,n){return w(r.spatialReference,n)?G(t,r,n):b(t,r,n)}function Ct(t,r,n,e){if(f(r))return bt(t,n,e);const a=Rt(t,r,n.spatialReference);return n.equals(r.getOriginPoint(n.spatialReference))?b(a,n,e):w(n.spatialReference,e)?G(a,n,e):b(a,n,e)}function Et(t,r,n){const e=new Float64Array(t.position.length),a=t.position,o=r.x,i=r.y,s=r.z||0,{horizontal:c,vertical:x}=E(n?n.unit:null,r.spatialReference);for(let l=0;l<a.length;l+=3)e[l+0]=a[l+0]*c+o,e[l+1]=a[l+1]*c+i,e[l+2]=a[l+2]*x+s;return{position:e,normal:t.normal,tangent:t.tangent}}function Nt(t,r,n){const e=r.spatialReference,a=S(r,n,N),o=new Float64Array(t.position.length),i=jt(t.position,a,e,o),s=O(C,a);return{position:i,normal:zt(i,o,t.normal,s,e),tangent:Lt(i,o,t.tangent,s,e)}}function jt(t,r,n,e){d(h.fromTypedArray(e),h.fromTypedArray(t),r);const a=new Float64Array(t.length);return ut(e,a,n)}function zt(t,r,n,e,a){if(f(n))return null;const o=new Float32Array(n.length);return k(y.fromTypedArray(o),y.fromTypedArray(n),e),pt(o,t,r,a,o),o}function Lt(t,r,n,e,a){if(f(n))return null;const o=new Float32Array(n.length);k(y.fromTypedArray(o,4*Float32Array.BYTES_PER_ELEMENT),y.fromTypedArray(n,4*Float32Array.BYTES_PER_ELEMENT),e);for(let i=3;i<o.length;i+=4)o[i]=n[i];return gt(o,t,r,a,o),o}function b(t,r,n){const e=new Float64Array(t.position.length),a=t.position,o=r.x,i=r.y,s=r.z||0,{horizontal:c,vertical:x}=E(n?n.unit:null,r.spatialReference);for(let l=0;l<a.length;l+=3)e[l+0]=(a[l+0]-o)/c,e[l+1]=(a[l+1]-i)/c,e[l+2]=(a[l+2]-s)/x;return{position:e,normal:t.normal,tangent:t.tangent}}function G(t,r,n){const e=r.spatialReference;S(r,n,N);const a=q(It,N),o=new Float64Array(t.position.length),i=_t(t.position,e,a,o),s=O(C,a);return{position:i,normal:qt(t.normal,t.position,o,e,s),tangent:Bt(t.tangent,t.position,o,e,s)}}function S(t,r,n){I(t.spatialReference,[t.x,t.y,t.z||0],n,ft(t.spatialReference));const{horizontal:e,vertical:a}=E(r?r.unit:null,t.spatialReference);return _(n,n,[e,e,a]),n}function _t(t,r,n,e){const a=At(t,r,e),o=h.fromTypedArray(a),i=new Float64Array(a.length),s=h.fromTypedArray(i);return d(s,o,n),i}function qt(t,r,n,e,a){if(f(t))return null;const o=dt(t,r,n,e,new Float32Array(t.length)),i=y.fromTypedArray(o);return k(i,i,a),o}function Bt(t,r,n,e,a){if(f(t))return null;const o=kt(t,r,n,e,new Float32Array(t.length)),i=y.fromTypedArray(o,4*Float32Array.BYTES_PER_ELEMENT);return k(i,i,a),o}function E(t,r){if(f(t))return Ot;const n=r.isGeographic?1:ht(r),e=r.isGeographic?1:yt(r),a=mt(1,t,"meters");return{horizontal:a*n,vertical:a*e}}const N=m(),It=m(),C=$t(),Ot={horizontal:1,vertical:1};export{Ct as M,Mt as O,Rt as _,$ as a,St as b,M as c,Yt as d,bt as k,A as l,Gt as q,w as r,Y as x};