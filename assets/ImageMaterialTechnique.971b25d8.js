import{bK as u,bL as g,bM as l,bN as b,bO as v,bP as h,bQ as d,bR as m,bS as f,e as i,bT as s,bU as y,bV as $,bW as T,bX as P,bY as x,bZ as E,b_ as F,b$ as _,c0 as C,c1 as w,c2 as O,c3 as S,c4 as D,c5 as A,c6 as H,c7 as j,c8 as z,c9 as G,ca as U,cb as V}from"./index.89a7b683.js";function W(r){const e=new u;return e.include(g,{linearDepth:!1}),e.vertex.uniforms.add("proj","mat4").add("view","mat4"),e.attributes.add("position","vec3"),e.attributes.add("uv0","vec2"),e.varyings.add("vpos","vec3"),r.multipassTerrainEnabled&&e.varyings.add("depth","float"),e.vertex.uniforms.add("textureCoordinateScaleFactor","vec2"),e.vertex.code.add(l`
    void main(void) {
      vpos = position;
      ${r.multipassTerrainEnabled?"depth = (view * vec4(vpos, 1.0)).z;":""}
      vTexCoord = uv0 * textureCoordinateScaleFactor;
      gl_Position = transformPosition(proj, view, vpos);
    }
  `),e.include(b,r),r.multipassTerrainEnabled&&(e.fragment.include(v),e.include(h,r)),e.fragment.uniforms.add("tex","sampler2D"),e.fragment.uniforms.add("opacity","float"),e.varyings.add("vTexCoord","vec2"),r.output===7?e.fragment.code.add(l`
    void main() {
      discardBySlice(vpos);
      ${r.multipassTerrainEnabled?"terrainDepthTest(gl_FragCoord, depth);":""}

      float alpha = texture2D(tex, vTexCoord).a * opacity;
      if (alpha  < ${l.float(d)}) {
        discard;
      }

      gl_FragColor = vec4(alpha);
    }
    `):(e.fragment.include(m),e.fragment.code.add(l`
    void main() {
      discardBySlice(vpos);
      ${r.multipassTerrainEnabled?"terrainDepthTest(gl_FragCoord, depth);":""}
      gl_FragColor = texture2D(tex, vTexCoord) * opacity;

      if (gl_FragColor.a < ${l.float(d)}) {
        discard;
      }

      gl_FragColor = highlightSlice(gl_FragColor, vpos);
      ${r.OITEnabled?"gl_FragColor = premultiplyAlpha(gl_FragColor);":""}
    }
    `)),e}const B=Object.freeze({__proto__:null,build:W});class p extends T{initializeProgram(e){const a=p.shader.get(),t=this.configuration,n=a.build({output:t.output,slicePlaneEnabled:t.slicePlaneEnabled,sliceHighlightDisabled:!1,sliceEnabledForVertexPrograms:!1,OITEnabled:t.transparencyPassType===0,multipassTerrainEnabled:t.multipassTerrainEnabled,cullAboveGround:t.cullAboveGround});return new P(e.rctx,n,x)}bindPass(e,a){E(this.program,a.camera.projectionMatrix),this.program.setUniform1f("opacity",e.opacity),a.multipassTerrainEnabled&&(this.program.setUniform2fv("cameraNearFar",a.camera.nearFar),this.program.setUniform2fv("inverseViewport",a.inverseViewport),F(this.program,a))}bindDraw(e){_(this.program,e),C(this.program,this.configuration,e),this.program.rebindTextures()}setPipelineState(e,a){const t=this.configuration,n=e===3,c=e===2;return w({blending:t.output!==0&&t.output!==7||!t.transparent?null:n?I:O(e),culling:S(t.cullFace),depthTest:{func:D(e)},depthWrite:n?t.writeDepth&&A:H(e),colorWrite:j,stencilWrite:t.sceneHasOcludees?z:null,stencilTest:t.sceneHasOcludees?a?G:U:null,polygonOffset:n||c?null:V(t.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this.setPipelineState(this.configuration.transparencyPassType,!0),this.setPipelineState(this.configuration.transparencyPassType,!1)}getPipelineState(e,a){return a?this._occludeePipelineState:super.getPipelineState(e,a)}}p.shader=new y(B,()=>import("./ImageMaterial.glsl.618bb66b.js"));const I=f(1,771);class o extends ${constructor(){super(...arguments),this.output=0,this.cullFace=0,this.slicePlaneEnabled=!1,this.transparent=!1,this.enableOffset=!0,this.writeDepth=!0,this.sceneHasOcludees=!1,this.transparencyPassType=3,this.multipassTerrainEnabled=!1,this.cullAboveGround=!1}}i([s({count:8})],o.prototype,"output",void 0),i([s({count:3})],o.prototype,"cullFace",void 0),i([s()],o.prototype,"slicePlaneEnabled",void 0),i([s()],o.prototype,"transparent",void 0),i([s()],o.prototype,"enableOffset",void 0),i([s()],o.prototype,"writeDepth",void 0),i([s()],o.prototype,"sceneHasOcludees",void 0),i([s({count:4})],o.prototype,"transparencyPassType",void 0),i([s()],o.prototype,"multipassTerrainEnabled",void 0),i([s()],o.prototype,"cullAboveGround",void 0);export{p as E,o as O,W as s};
