import{lb as g,lc as N,ld as S,bf as b,le as w,lf as x,x as j,be as O,lg as f,lh as $,li as k,lj as p,lk as v,ll as h,lm as d,ln as B}from"./index.89a7b683.js";function R(e,l,t,a){return e.name?e.styleName&&e.styleName==="Esri2DPointSymbolsStyle"?F(e,l,a):x(e,l,a).then(o=>E(o,e.name,l,t,a)):Promise.reject(new j("symbolstyleutils:style-symbol-reference-name-missing","Missing name in style symbol reference"))}function E(e,l,t,a,o){const u=e.data,y={portal:t&&t.portal||O.getDefault(),url:b(e.baseUrl),origin:"portal-item"},s=u.items.find(r=>r.name===l);if(!s){const r=`The symbol name '${l}' could not be found`;return Promise.reject(new j("symbolstyleutils:symbol-name-not-found",r,{symbolName:l}))}let m=f($(s,a),y),i=s.thumbnail&&s.thumbnail.href;const c=s.thumbnail&&s.thumbnail.imageData;k()&&(m=p(m),i=p(i));const U={portal:t.portal,url:b(w(m)),origin:"portal-item"};return g(m,o).then(r=>{const D=a==="cimRef"?N(r.data):r.data,n=S(D,U);if(n&&v(n)){if(i){const P=f(i,y);n.thumbnail=new h({url:P})}else c&&(n.thumbnail=new h({url:`data:image/png;base64,${c}`}));e.styleUrl?n.styleOrigin=new d({portal:t.portal,styleUrl:e.styleUrl,name:l}):e.styleName&&(n.styleOrigin=new d({portal:t.portal,styleName:e.styleName,name:l}))}return n})}function F(e,l,t){const a=B.replace(/\{SymbolName\}/gi,e.name);return g(a,t).then(o=>{const u=N(o.data);return S(u,{portal:l.portal,url:b(w(a)),origin:"portal-item"})})}export{E as fetchSymbolFromStyle,R as resolveWebStyleSymbol};
