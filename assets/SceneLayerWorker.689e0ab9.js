import{ej as C,ek as c,r as j}from"./index.89a7b683.js";function H(){return T||(T=new Promise(e=>import("./i3s.716ba52d.js").then(t=>t.i).then(({default:t})=>{const r=t({locateFile:z,onRuntimeInitialized:()=>e(r)});delete r.then})).catch(e=>Promise.reject(e))),T}function z(e){return C(`esri/libs/i3s/${e}`)}let T;async function q(e){await p();const t=[e.geometryBuffer];return{result:R(e,t),transferList:t}}async function J(e){var t;await p();const r=[e.geometryBuffer],{geometryBuffer:a}=e,s=a.byteLength,y=o._malloc(s),f=new Uint8Array(o.HEAPU8.buffer,y,s);f.set(new Uint8Array(a));const b=o.dracoDecompressPointCloudData(y,f.byteLength);if(o._free(y),b.error.length>0)throw`i3s.wasm: ${b.error}`;const d=((t=b.featureIds)==null?void 0:t.length)>0?c(b.featureIds):null,g=c(b.positions);return d&&r.push(d.buffer),r.push(g.buffer),{result:{positions:g,featureIds:d},transferList:r}}async function K(e){await p(),G(e);const t={buffer:e.buffer};return{result:t,transferList:[t.buffer]}}async function Q(e){await p(),V(e)}async function W(e){await p(),o.setLegacySchema(e.context,e.jsonSchema)}function X(e){S(e)}let w,o;function V(e){const t=e.modifications,r=o._malloc(8*t.length),a=new Float64Array(o.HEAPU8.buffer,r,t.length);for(let s=0;s<t.length;++s)a[s]=t[s];o.setModifications(e.context,r,t.length,e.isGeodetic),o._free(r)}function R(e,t){if(!o)return null;const{context:r,localOrigin:a,globalTrafo:s,mbs:y,obb:f,elevationOffset:b,geometryBuffer:d,geometryDescriptor:g,indexToVertexProjector:v,vertexToRenderProjector:D}=e,A=o._malloc(d.byteLength),I=33,L=o._malloc(I*Float64Array.BYTES_PER_ELEMENT),F=new Uint8Array(o.HEAPU8.buffer,A,d.byteLength);F.set(new Uint8Array(d));const i=new Float64Array(o.HEAPU8.buffer,L,I);E(i,a);let u=i.byteOffset+3*i.BYTES_PER_ELEMENT,l=new Float64Array(i.buffer,u);E(l,s),u+=16*i.BYTES_PER_ELEMENT,l=new Float64Array(i.buffer,u),E(l,y),u+=4*i.BYTES_PER_ELEMENT,j(f)&&(l=new Float64Array(i.buffer,u),E(l,f.center),u+=3*i.BYTES_PER_ELEMENT,l=new Float64Array(i.buffer,u),E(l,f.halfSize),u+=3*i.BYTES_PER_ELEMENT,l=new Float64Array(i.buffer,u),E(l,f.quaternion));const M=g,N={isDraco:!1,isLegacy:!1,color:e.layouts.some(m=>m.some(h=>h.name==="color")),normal:e.needNormals&&e.layouts.some(m=>m.some(h=>h.name==="normalCompressed")),uv0:e.layouts.some(m=>m.some(h=>h.name==="uv0")),uvRegion:e.layouts.some(m=>m.some(h=>h.name==="uvRegion")),featureIndex:M.featureIndex},n=o.process(r,!!e.obb,A,F.byteLength,M,N,L,b,v,D,e.normalReferenceFrame);if(o._free(L),o._free(A),n.error.length>0)throw`i3s.wasm: ${n.error}`;if(n.discarded)return null;const _=n.componentOffsets.length>0?c(n.componentOffsets):null,P=n.featureIds.length>0?c(n.featureIds):null,B=c(n.interleavedVertedData).buffer,O=n.indicesType===1?c(new Uint16Array(n.indices.buffer,n.indices.byteOffset,n.indices.byteLength/2)):c(new Uint32Array(n.indices.buffer,n.indices.byteOffset,n.indices.byteLength/4)),U=c(n.positions),x=n.positionIndicesType===1?c(new Uint16Array(n.positionIndices.buffer,n.positionIndices.byteOffset,n.positionIndices.byteLength/2)):c(new Uint32Array(n.positionIndices.buffer,n.positionIndices.byteOffset,n.positionIndices.byteLength/4)),Y={layout:e.layouts[0],interleavedVertexData:B,indices:O,hasColors:n.hasColors,hasModifications:n.hasModifications,positionData:{data:U,indices:x}};return P&&t.push(P.buffer),_&&t.push(_.buffer),t.push(B),t.push(O.buffer),t.push(U.buffer),t.push(x.buffer),{componentOffsets:_,featureIds:P,transformedGeometry:Y,obb:n.obb}}function Z(e){return e===0?0:e===1?1:e===2?2:3}function G(e){const{context:t,buffer:r}=e,a=o._malloc(r.byteLength),s=r.byteLength/Float64Array.BYTES_PER_ELEMENT,y=new Float64Array(o.HEAPU8.buffer,a,s),f=new Float64Array(r);y.set(f),o.filterOBBs(t,a,s),f.set(y),o._free(a)}function S(e){o&&o.destroy(e)}function E(e,t){for(let r=0;r<t.length;++r)e[r]=t[r]}function p(){return o?Promise.resolve():(w||(w=H().then(e=>{o=e,w=null})),w)}const $={transform:R,destroy:S};export{X as destroyContext,J as dracoDecompressPointCloudData,K as filterObbsForModifications,G as filterObbsForModificationsSync,p as initialize,Z as interpretObbModificationResults,q as process,W as setLegacySchema,Q as setModifications,V as setModificationsSync,$ as test};
