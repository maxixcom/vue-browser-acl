!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).VueBrowserAcl={})}(this,(function(e){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(n=(a=c.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function n(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var o="GLOBAL_RULE",i=function(e){return"boolean"==typeof e||void 0===e||"function"==typeof e&&""===e.name},a=function(){function e(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).strict,r=void 0!==t&&t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.strict=r,this.rules=new Map,this.policies=new Map,this.registry=new WeakMap}var t;return(t=[{key:"rule",value:function(e,t){var r=this,n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];i(t)&&(n=void 0===t||t,t="GLOBAL_RULE");var o=this.subjectMapper(t),a=Array.isArray(e)?e:[e];return a.forEach((function(e){var t=r.rules.get(o)||{};t[e]=n,r.rules.set(o,t)})),this}},{key:"policy",value:function(e,t){var r="function"==typeof e?new e:e,n=this.subjectMapper(t);return this.policies.set(n,r),this}},{key:"register",value:function(e,t){return this.registry.set(e,t),this}},{key:"can",value:function(e,t,r){r=void 0===r?"GLOBAL_RULE":r;var n=this.subjectMapper(r),o=this.policies.get(n),i=o||this.rules.get(n);if(void 0===i){if(this.strict)throw new Error('Unknown subject "'.concat(n,'"'));return!1}for(var a=arguments.length,c=new Array(a>3?a-3:0),u=3;u<a;u++)c[u-3]=arguments[u];if(o&&"function"==typeof o.beforeAll){var l=o.beforeAll.apply(o,[t,e,r,n].concat(c));if(void 0!==l)return l}if("function"==typeof i[t])return Boolean(i[t].apply(i,[e,r,n].concat(c)));if(this.strict&&void 0===i[t])throw new Error('Unknown verb "'.concat(t,'"'));return Boolean(i[t])}},{key:"some",value:function(e,t,r){for(var n=this,o=arguments.length,i=new Array(o>3?o-3:0),a=3;a<o;a++)i[a-3]=arguments[a];return r.some((function(r){return n.can.apply(n,[e,t,r].concat(i))}))}},{key:"every",value:function(e,t,r){for(var n=this,o=arguments.length,i=new Array(o>3?o-3:0),a=3;a<o;a++)i[a-3]=arguments[a];return r.every((function(r){return n.can.apply(n,[e,t,r].concat(i))}))}},{key:"mixin",value:function(e){var t=this;return e.prototype.can=function(){return t.can.apply(t,[this].concat(Array.prototype.slice.call(arguments)))},e.prototype.can.every=function(){return t.every.apply(t,[this].concat(Array.prototype.slice.call(arguments)))},e.prototype.can.some=function(){return t.some.apply(t,[this].concat(Array.prototype.slice.call(arguments)))},this}},{key:"subjectMapper",value:function(e){if("string"==typeof e)return e;var t="function"==typeof e;return t&&this.registry.has(e)?this.registry.get(e):!t&&this.registry.has(e.constructor)?this.registry.get(e.constructor):t?e.name:e.constructor.name}},{key:"reset",value:function(){return this.rules=new Map,this.policies=new Map,this.registry=new WeakMap,this}},{key:"removeRules",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=this.subjectMapper(e);if(this.rules.has(r)){if(t){var n=this.rules.get(r);return delete n[t],this}this.rules.delete(r)}return this}},{key:"removePolicy",value:function(e){var t=this.subjectMapper(e);return this.policies.delete(t),this}},{key:"removeAll",value:function(e){return this.removeRules(e),this.removePolicy(e),this}}])&&function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(e.prototype,t),e}(),c={install:function(e,i,c){var y=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},v="function"==typeof i?i:function(){return i},h=Boolean(y.strict);y=Object.assign({acl:{strict:h},aliases:["role"],assumeGlobal:!h,caseMode:!0,debug:!1,directive:"can",failRoute:"/",helper:!0,strict:!1},y);var d=l(y),m=c;"function"==typeof c&&c(m=new a(y.acl)),m.router=function(e){y.router=e;var t=function(e,t){for(var r,n=arguments.length,o=new Array(n>2?n-2:0),i=2;i<n;i++)o[i-2]=arguments[i];return t&&(r=m).can.apply(r,[v(),e,t].concat(o))||!t&&!y.strict},i=function(e,i,a){var c=null,u=e.reduce((function(e,u){return e.then((function(e){if(!0!==e)return e;c=u.fail;var l=d(u),s="function"==typeof l?l(i,a,t):Promise.resolve(t.apply(void 0,n(function(e){var t=r((d(e)||"").split(" "),2),n=t[0],i=void 0===n?null:n,a=t[1];return[i,void 0===a?y.assumeGlobal?o:null:a]}(u))));if(y.strict&&!(s instanceof Promise))throw new Error("$route.meta.can must return a promise in strict mode");return s})).catch((function(e){return y.debug&&console.error(e),!1}))}),Promise.resolve(!0));return u.getFail=function(){return c},u};e.beforeEach((function(e,t,r){var n=e.matched.filter((function(e){return e.meta&&d(e.meta)})).map((function(e){return e.meta})),o=i(n,e,t);o.then((function(e){if(!0===e)return r();var n="$from"===o.getFail()?t.path:o.getFail();r(n||y.failRoute)}))}))},y.router&&m.router(y.router);var b=function(e,i,a){var c,l,h,d,b,g=i.modifiers.disable?"disable":"hide";if(h=i.arg,Array.isArray(i.value)&&i.expression.startsWith("[")){var w=r(i.modifiers.global?f(i):s(i),3);l=w[0],d=w[1],b=w[2]}else if("string"==typeof i.value){var A=r(p(i,a,y),3);l=A[0],d=A[1],b=A[2]}else h&&"object"===t(i.value)?(l=h,d=i.value,b=[]):void 0===i.value&&!i.modifiers.global&&y.assumeGlobal&&(l=h,d=o,b=[]);if(y.assumeGlobal&&!d&&(d=o,b=b||[],l=l||h),!l||!d)throw new Error("Missing verb or subject");var j=(i.modifiers.some?"some":i.modifiers.every&&"every")||"can",k=(c=m)[j].apply(c,[v(),l,d].concat(n(b))),M=i.modifiers.not;e.disabled=!1,e.readOnly=!1,(k&&M||!k&&!M)&&("hide"===g?u(e,a):"disable"===g?e.disabled=!0:"readonly"===g&&(e.readOnly=!0))},g=[y.directive].concat(n(y.aliases));if(g.forEach((function(t){return e.directive(t,b)})),y.helper){var w="$".concat(y.directive);e.prototype[w]=function(){var e;return(e=m).can.apply(e,[v()].concat(Array.prototype.slice.call(arguments)))},e.prototype[w].not=function(){var e;return!(e=m).can.apply(e,[v()].concat(Array.prototype.slice.call(arguments)))},e.prototype[w].every=function(){var e;return(e=m).every.apply(e,[v()].concat(Array.prototype.slice.call(arguments)))},e.prototype[w].some=function(){var e;return(e=m).some.apply(e,[v()].concat(Array.prototype.slice.call(arguments)))}}}};function u(e,t){var r=document.createComment(" ");Object.defineProperty(r,"setAttribute",{value:function(){}}),t.text=" ",t.elm=r,t.isComment=!0,t.tag=void 0,t.data.directives=void 0,t.componentInstance&&(t.componentInstance.$el=r),e.parentNode&&e.parentNode.replaceChild(r,e)}var l=function(e){return function(t){return[e.directive].concat(n(e.aliases)).map((function(e){return t[e]})).filter((function(e){return e})).shift()}},s=function(e){var t=e.arg,r=e.value;return[t||r[0],t?r[0]:r[1],t?r.slice(1):r.slice(2)]},f=function(e){var t=e.arg,r=e.value;return[t||r[0],o,t?r:r.slice(1)]},p=function(e,t,n){var o=e.arg,i=e.value,a=e.modifiers,c=r(o?[o,i]:i.split(" "),2),u=c[0],l=c[1];if(l&&a.global)throw new Error("You cannot provide subject and use global modifier at the same time");return"string"==typeof l&&n.caseMode&&l[0].match(/[a-z]/)&&(l=t.context[l]),[u,l,[]]};e.default=c,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=vue-browser-acl.umd.js.map
