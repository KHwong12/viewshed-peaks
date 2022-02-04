import{b$ as u,c0 as g,c1 as l,c2 as v,c3 as h,c4 as m,c5 as d,c6 as f,c7 as b,r as i,c8 as s,c9 as y,ca as $,cb as T,cc as P,cd as x,ce as E,cf as F,cg as C,ch as _,ci as w,cj as O,ck as S,cl as D,cm as j,cn as A,co as H,cp as z,cq as G,cr as I,cs as U}from"./vendor.d423bc92.js";function V(r){const e=new u;return e.include(g,{linearDepth:!1}),e.vertex.uniforms.add("proj","mat4").add("view","mat4"),e.attributes.add("position","vec3"),e.attributes.add("uv0","vec2"),e.varyings.add("vpos","vec3"),r.multipassTerrainEnabled&&e.varyings.add("depth","float"),e.vertex.uniforms.add("textureCoordinateScaleFactor","vec2"),e.vertex.code.add(l`
    void main(void) {
      vpos = position;
      ${r.multipassTerrainEnabled?"depth = (view * vec4(vpos, 1.0)).z;":""}
      vTexCoord = uv0 * textureCoordinateScaleFactor;
      gl_Position = transformPosition(proj, view, vpos);
    }
  `),e.include(v,r),r.multipassTerrainEnabled&&(e.fragment.include(h),e.include(m,r)),e.fragment.uniforms.add("tex","sampler2D"),e.fragment.uniforms.add("opacity","float"),e.varyings.add("vTexCoord","vec2"),r.output===7?e.fragment.code.add(l`
    void main() {
      discardBySlice(vpos);
      ${r.multipassTerrainEnabled?"terrainDepthTest(gl_FragCoord, depth);":""}

      float alpha = texture2D(tex, vTexCoord).a * opacity;
      if (alpha  < ${l.float(d)}) {
        discard;
      }

      gl_FragColor = vec4(alpha);
    }
    `):(e.fragment.include(f),e.fragment.code.add(l`
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
    `)),e}const W=Object.freeze({__proto__:null,build:V});class c extends T{initializeProgram(e){const a=c.shader.get(),t=this.configuration,n=a.build({output:t.output,slicePlaneEnabled:t.slicePlaneEnabled,sliceHighlightDisabled:!1,sliceEnabledForVertexPrograms:!1,OITEnabled:t.transparencyPassType===0,multipassTerrainEnabled:t.multipassTerrainEnabled,cullAboveGround:t.cullAboveGround});return new P(e.rctx,n,x)}bindPass(e,a){E(this.program,a.camera.projectionMatrix),this.program.setUniform1f("opacity",e.opacity),a.multipassTerrainEnabled&&(this.program.setUniform2fv("cameraNearFar",a.camera.nearFar),this.program.setUniform2fv("inverseViewport",a.inverseViewport),F(this.program,a))}bindDraw(e){C(this.program,e),_(this.program,this.configuration,e),this.program.rebindTextures()}setPipelineState(e,a){const t=this.configuration,n=e===3,p=e===2;return w({blending:t.output!==0&&t.output!==7||!t.transparent?null:n?B:O(e),culling:S(t.cullFace),depthTest:{func:D(e)},depthWrite:n?t.writeDepth&&j:A(e),colorWrite:H,stencilWrite:t.sceneHasOcludees?z:null,stencilTest:t.sceneHasOcludees?a?G:I:null,polygonOffset:n||p?null:U(t.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this.setPipelineState(this.configuration.transparencyPassType,!0),this.setPipelineState(this.configuration.transparencyPassType,!1)}getPipelineState(e,a){return a?this._occludeePipelineState:super.getPipelineState(e,a)}}c.shader=new y(W,()=>import("./ImageMaterial.glsl.61642bbc.js"));const B=b(1,771);class o extends ${constructor(){super(...arguments),this.output=0,this.cullFace=0,this.slicePlaneEnabled=!1,this.transparent=!1,this.enableOffset=!0,this.writeDepth=!0,this.sceneHasOcludees=!1,this.transparencyPassType=3,this.multipassTerrainEnabled=!1,this.cullAboveGround=!1}}i([s({count:8})],o.prototype,"output",void 0),i([s({count:3})],o.prototype,"cullFace",void 0),i([s()],o.prototype,"slicePlaneEnabled",void 0),i([s()],o.prototype,"transparent",void 0),i([s()],o.prototype,"enableOffset",void 0),i([s()],o.prototype,"writeDepth",void 0),i([s()],o.prototype,"sceneHasOcludees",void 0),i([s({count:4})],o.prototype,"transparencyPassType",void 0),i([s()],o.prototype,"multipassTerrainEnabled",void 0),i([s()],o.prototype,"cullAboveGround",void 0);export{c as E,o as O,V as s};
