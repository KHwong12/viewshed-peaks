import{aa as x,r as M,b6 as f}from"./index.89a7b683.js";function R(n,s,e,a=new x){let i;if(e.type==="2d")i=s*e.resolution;else if(e.type==="3d"){const y=e.overlayPixelSizeInMapUnits(n),t=e.basemapSpatialReference;i=M(t)&&!t.equals(e.spatialReference)?f(t)/f(e.spatialReference):s*y}const r=n.x-i,l=n.y-i,m=n.x+i,p=n.y+i,{spatialReference:c}=e;return a.xmin=Math.min(r,m),a.ymin=Math.min(l,p),a.xmax=Math.max(r,m),a.ymax=Math.max(l,p),a.spatialReference=c,a}new x;export{R as a};
