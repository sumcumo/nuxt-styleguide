(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{131:function(n,e,t){var o=t(139);"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);(0,t(53).default)("0fc2007b",o,!0,{})},132:function(n,e,t){var o=t(143);"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);(0,t(53).default)("51519e42",o,!0,{})},133:function(n,e,t){"use strict";t(25),t(134);var o={data:function(){return{rootCategory:"$$root",routes:this.$styleguide.routes.reduce(function(n,e){var t=e.category||"$$root";return n[t]||(n[t]=[]),n[t].push(e),n},{})}},methods:{findIndex:function(n){return n.find(function(n){return"index"===n.name.toLowerCase()})}}},a=(t(138),t(14)),r=Object(a.a)(o,function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("nav",[t("ul",{staticClass:"nsg-nav"},n._l(n.routes,function(e,o){return"Pages"!==o?t("li",{key:o,staticClass:"nsg-list-section"},[o!==n.rootCategory?t("h3",{staticClass:"nsg-title"},[n.findIndex(e)?t("a",{class:"nsg-title-content "+(n.findIndex(e).path===n.$route.path?"nsg-active":""),attrs:{href:n.findIndex(e).path}},[n._v("\n          "+n._s(o)+"\n        ")]):t("span",{staticClass:"nsg-title-content"},[n._v("\n          "+n._s(o)+"\n        ")])]):n._e(),n._v(" "),"Icons"!==o?t("ul",{staticClass:"nsg-nav-list"},n._l(e,function(e){return t("li",{key:e.name},["index"!==e.name.toLowerCase()?t("a",{class:"nsg-nav-item "+(e.path===n.$route.path?"nsg-active":""),attrs:{href:e.path}},[n._v("\n            "+n._s(e.name)+"\n          ")]):n._e()])})):n._e()]):n._e()}))])},[],!1,null,"131e4173",null);r.options.__file="nav.vue";e.a=r.exports},134:function(n,e,t){"use strict";var o=t(6),a=t(135)(5),r=!0;"find"in[]&&Array(1).find(function(){r=!1}),o(o.P+o.F*r,"Array",{find:function(n){return a(this,n,arguments.length>1?arguments[1]:void 0)}}),t(55)("find")},135:function(n,e,t){var o=t(21),a=t(54),r=t(37),i=t(36),s=t(136);n.exports=function(n,e){var t=1==n,l=2==n,c=3==n,g=4==n,d=6==n,m=5==n||d,u=e||s;return function(e,s,p){for(var v,f,h=r(e),b=a(h),y=o(s,p,3),x=i(b.length),I=0,k=t?u(e,x):l?u(e,0):void 0;x>I;I++)if((m||I in b)&&(f=y(v=b[I],I,h),n))if(t)k[I]=f;else if(f)switch(n){case 3:return!0;case 5:return v;case 6:return I;case 2:k.push(v)}else if(g)return!1;return d?-1:c||g?g:k}}},136:function(n,e,t){var o=t(137);n.exports=function(n,e){return new(o(n))(e)}},137:function(n,e,t){var o=t(7),a=t(80),r=t(1)("species");n.exports=function(n){var e;return a(n)&&("function"!=typeof(e=n.constructor)||e!==Array&&!a(e.prototype)||(e=void 0),o(e)&&null===(e=e[r])&&(e=void 0)),void 0===e?Array:e}},138:function(n,e,t){"use strict";var o=t(131);t.n(o).a},139:function(n,e,t){(n.exports=t(52)(!1)).push([n.i,'\n.nsg-nav[data-v-131e4173]{margin:0 .5rem;padding:5rem 0 1rem;box-sizing:border-box\n}\n.nsg-nav-list[data-v-131e4173]{margin:0;padding:0;list-style-type:none\n}\n.nsg-list-section[data-v-131e4173]{margin-bottom:2rem;width:100%\n}\n.nsg-title[data-v-131e4173]{padding:0;margin:0;font-size:.9rem;text-transform:uppercase;letter-spacing:.05em\n}\n.nsg-title a[data-v-131e4173]{color:#0785b9;color:var(--primary-color-500);text-decoration:none;cursor:pointer\n}\n.nsg-title-content[data-v-131e4173]{cursor:default;display:inline-block;padding:.5rem 1rem\n}\n.nsg-nav-item[data-v-131e4173]{position:relative;display:block;margin:.25rem 0;padding:.25em 1rem;font-size:.9rem;box-sizing:border-box;color:inherit;text-decoration:none;cursor:pointer\n}\n.nsg-nav-item[data-v-131e4173]:before{content:"";height:100%;width:4px;background-color:#55b0b7;background-color:var(--secondary-color-500);position:absolute;top:0;left:0;opacity:0;transition:opacity .2s ease-in-out\n}\n.nsg-active[data-v-131e4173]{color:#2f5457;color:var(--secondary-color-800)\n}\n.nsg-active[data-v-131e4173]:before{opacity:.6\n}\n.nsg-nav-item[data-v-131e4173]:active,.nsg-nav-item[data-v-131e4173]:focus,.nsg-nav-item[data-v-131e4173]:hover{color:#2f5457;color:var(--secondary-color-800)\n}\n.nsg-nav-item[data-v-131e4173]:active:before,.nsg-nav-item[data-v-131e4173]:focus:before,.nsg-nav-item[data-v-131e4173]:hover:before{opacity:1\n}',""])},140:function(n,e,t){var o=t(141);"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);(0,t(53).default)("00dccfb4",o,!0,{})},141:function(n,e,t){(n.exports=t(52)(!1)).push([n.i,"code[class*=language-],pre[class*=language-]{color:#000;background:none;text-shadow:0 1px #fff;font-family:Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*=language-]::-moz-selection,code[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection{text-shadow:none;background:#b3d4fc}code[class*=language-]::selection,code[class*=language-] ::selection,pre[class*=language-]::selection,pre[class*=language-] ::selection{text-shadow:none;background:#b3d4fc}@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#708090}.token.punctuation{color:#999}.namespace{opacity:.7}.token.boolean,.token.constant,.token.deleted,.token.number,.token.property,.token.symbol,.token.tag{color:#905}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#690}.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url{color:#9a6e3a;background:hsla(0,0%,100%,.5)}.token.atrule,.token.attr-value,.token.keyword{color:#07a}.token.class-name,.token.function{color:#dd4a68}.token.important,.token.regex,.token.variable{color:#e90}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}",""])},142:function(n,e,t){"use strict";var o=t(132);t.n(o).a},143:function(n,e,t){(n.exports=t(52)(!1)).push([n.i,'\n:root{--white:var(--theme-clr-white,#fff);--black:var(--theme-clr-black,#111);--grey-100:var(--theme-clr-gray-100,#f2f3f3);--grey-200:var(--theme-clr-gray-200,#e6e6e7);--grey-300:var(--theme-clr-gray-300,#cecfd0);--primary-color-200:var(----theme-clr-primary-200,#e7eff6);--primary-color-500:var(----theme-clr-primary-500,#0785b9);--primary-color-800:var(----theme-clr-primary-800,#294355);--secondary-color-200:var(----theme-clr-secondary-200,#e4f1f2);--secondary-color-500:var(----theme-clr-secondary-500,#55b0b7);--secondary-color-800:var(----theme-clr-secondary-800,#2f5457);--sidebarWidth:250px\n}\nbody{padding:0;margin:0;min-width:100vw\n}\nbody:before{content:"";display:block;position:absolute;top:0;left:0;right:0;height:4px;background-color:#0785b9;background-color:var(--primary-color-500);z-index:1337\n}\n.nsg-frame{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;display:block;padding:3em 0;width:100vw\n}\n.nsg-sidebar{position:absolute;top:0;left:0;width:100%;height:100vh;background:#111;background:var(--black);color:#fff;color:var(--white);-webkit-transform:translateY(-100vh);transform:translateY(-100vh);transition:-webkit-transform .2s ease-in;transition:transform .2s ease-in;transition:transform .2s ease-in,-webkit-transform .2s ease-in;z-index:42\n}\n.nsg-sidebar__content{max-height:100%;overflow:auto\n}\n.nsg-content{box-sizing:border-box;max-width:900px;margin-top:5rem;padding:1rem;line-height:1.5\n}\nh1{font-weight:700\n}\nh1,h2,h3{padding:0 0 1rem;margin:0\n}\np+h1,p+h2,p+h3{margin-top:3rem\n}\n.nsg-content a{color:#0785b9;color:var(--primary-color-500)\n}\n.nsg-content pre{border-radius:2px;padding:.7em;margin-bottom:3rem\n}\n.nsg-content h1 code,.nsg-content h2 code,.nsg-content h3 code,.nsg-content p code{background-color:#e6e6e7;background-color:var(--grey-200);border-radius:1px;padding:.1em .3em;font-size:1.1em\n}\n.nsg-hamburger{display:block;position:relative;width:32px;position:fixed;right:25px;top:25px;z-index:50;color:#111;color:var(--black)\n}\n.nsg-hamburger svg{fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421\n}\n.nsg-icon-closed,.nsg-icon-open{fill:currentColor\n}\n.nsg-icon-open{display:none\n}\n#nsg-toggleNav{opacity:0;visibility:hidden;position:absolute;z-index:-1\n}\n#nsg-toggleNav:checked~.sidebar{-webkit-transform:translateY(0);transform:translateY(0)\n}\n#nsg-toggleNav:checked~.hamburger{color:#fff;color:var(--white)\n}\n#nsg-toggleNav:checked~.hamburger .icon-closed{display:none\n}\n#nsg-toggleNav:checked~.hamburger .icon-open{display:block\n}\n@media (min-width:851px){\n.nsg-hamburger{display:none\n}\n.nsg-frame{display:grid;justify-content:start;grid-template-columns:250px 1fr;grid-column-gap:20px;padding:0\n}\n.nsg-content{grid-column:2\n}\n.nsg-sidebar{width:250px;width:var(--sidebarWidth);height:100vh;position:fixed;background:#f2f3f3;background:var(--grey-100);color:#111;color:var(--black);border-top:4px solid #0785b9;border-top:4px solid var(--primary-color-500);-webkit-transform:none;transform:none;transition:none\n}\n}\n@media (min-width:1140px){\n.nsg-frame{grid-template-columns:250px 1fr minmax(800px,4fr) 1fr;grid-template-columns:var(--sidebarWidth) 1fr minmax(800px,4fr) 1fr\n}\n.nsg-content{grid-column:3;margin-left:auto;margin-right:auto\n}\n}',""])},146:function(n,e,t){"use strict";var o=t(133);t(140);var a={components:{StyleguideNav:o.a}},r=(t(142),t(14)),i=Object(r.a)(a,function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"nsg-frame"},[t("div",{staticClass:"nsg-sidebar__placebo"},[t("input",{attrs:{id:"nsg-toggleNav",type:"checkbox"}}),n._v(" "),t("label",{staticClass:"hamburger",attrs:{for:"nsg-toggleNav"}},[t("svg",{staticClass:"nsg-icon-closed",attrs:{width:"100%",height:"100%",viewBox:"0 0 12 10",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve"}},[t("g",[t("path",{attrs:{d:"M11.024,8.886l0,0.957l-11.024,0l0,-0.957l11.024,0Zm-11.024,-4.449l11.024,0l0,0.957l-11.024,0l0,-0.957Zm0,-4.437l11.024,0l0,0.944l-11.024,0l0,-0.944Z"}})])]),n._v(" "),t("svg",{staticClass:"nsg-icon-open",attrs:{width:"100%",height:"100%",viewBox:"0 0 11 11",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","xml:space":"preserve"}},[t("g",[t("path",{attrs:{d:"M0.861,0.026l9.743,9.743l-0.835,0.835l-9.743,-9.743l0.835,-0.835Z"}}),n._v(" "),t("path",{attrs:{d:"M0.001,9.79l9.789,-9.789l0.839,0.839l-9.789,9.789l-0.839,-0.839Z"}})])])]),n._v(" "),t("div",{staticClass:"nsg-sidebar"},[t("div",{staticClass:"nsg-sidebar__content"},[t("h1",[n._v("TESTING")]),n._v(" "),t("StyleguideNav")],1)])]),n._v(" "),t("div",{staticClass:"nsg-content"},[n._t("default")],2)])},[],!1,null,null,null);i.options.__file="frame.vue";e.a=i.exports},194:function(n,e,t){var o=t(224);"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);(0,t(53).default)("705d5e71",o,!0,{})},223:function(n,e,t){"use strict";var o=t(194);t.n(o).a},224:function(n,e,t){(n.exports=t(52)(!1)).push([n.i,"\n.nsg-single-icon{display:flex;align-items:center\n}\n.nsg-single-icon img{margin-right:.3em\n}",""])},225:function(n,e){n.exports="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjMwIiB2aWV3Qm94PSIwIDAgMzIgMzAiIHdpZHRoPSIzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEpIj48cmVjdCBmaWxsPSIjZDllM2VlIiBoZWlnaHQ9IjI0IiByeD0iMSIgc3Ryb2tlPSIjZDllM2VlIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHdpZHRoPSIyOCIgeD0iMiIgeT0iNSIvPjxwYXRoIGQ9Im0wIDNoMjh2NmgtMjh6IiBmaWxsPSIjMDBhZmNmIi8+PGNpcmNsZSBjeD0iMTMuOTIxMDUzIiBjeT0iMTcuOTIxMDUzIiBmaWxsPSIjZmZmIiByPSI1LjkyMTA1MyIgc3Ryb2tlPSIjMjYzMDQ3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJtMCAzaDI4djZoLTI4eiIgZmlsbD0iIzAwYWZjZiIvPjxnIHN0cm9rZT0iIzI2MzA0NyI+PHJlY3QgaGVpZ2h0PSIyNCIgcng9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgd2lkdGg9IjI4IiB5PSIzIi8+PHBhdGggZD0ibS41IDkuNWgyNyIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIvPjxnIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNSkiPjxwYXRoIGQ9Im0xLjUuNXY1Ii8+PHBhdGggZD0ibTE2LjUuNXY1Ii8+PC9nPjxnIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgdHJhbnNmb3JtPSJtYXRyaXgoLjcwNzEwNjc4IC43MDcxMDY3OCAtLjcwNzEwNjc4IC43MDcxMDY3OCAxMy45NDk3NDcgMTMpIj48cGF0aCBkPSJtMy41LjV2Ni4wMDE2NDc5NSIvPjxwYXRoIGQ9Im0uNSAzLjUgNS45NjU1NzYxNy4wMzA1Nzg2MSIvPjwvZz48L2c+PC9nPjwvc3ZnPg=="},247:function(n,e,t){"use strict";t.r(e);t(0);var o={components:{SgFrame:t(146).a},props:{single:{type:Boolean,default:!1},name:{type:String,default:null},iconUrl:{type:String,default:null},importPath:{type:String,default:null}}},a=(t(223),t(14)),r=Object(a.a)(o,function(){var n=this,e=n.$createElement,t=n._self._c||e;return n.single?t("div",{staticClass:"nsg-single-icon"},[t("img",{attrs:{src:n.iconUrl}}),n._v("\n  "+n._s(n.name)+"\n")]):t("sg-frame",[t("h1",[n._v(n._s(n.name))]),n._v(" "),t("img",{attrs:{src:n.iconUrl}})])},[],!1,null,null,null);r.options.__file="Icon.vue";var i=r.exports,s=t(225),l=t.n(s);e.default={layout:"default",render(n){return n(i,{props:Object.assign({},this.$attrs,{iconUrl:l.a,name:"Cal",importName:"Cal",importPath:"@sum.cumo/nuxt-styleguide-demo-library/icons/cal.svg"})})}}}}]);