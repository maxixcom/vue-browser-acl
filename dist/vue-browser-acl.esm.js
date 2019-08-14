var e="GLOBAL_RULE",t=function(e){return"boolean"==typeof e||void 0===e||"function"==typeof e&&""===e.name},r=function(){function e(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).strict,r=void 0!==t&&t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.strict=r,this.rules=new Map,this.policies=new Map,this.registry=new WeakMap}var r;return(r=[{key:"rule",value:function(e,r){var n=this,o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];t(r)&&(o=void 0===r||r,r="GLOBAL_RULE");var i=this.subjectMapper(r),a=Array.isArray(e)?e:[e];return a.forEach(function(e){var t=n.rules.get(i)||{};t[e]=o,n.rules.set(i,t)}),this}},{key:"policy",value:function(e,t){var r="function"==typeof e?new e:e,n=this.subjectMapper(t);return this.policies.set(n,r),this}},{key:"register",value:function(e,t){return this.registry.set(e,t),this}},{key:"can",value:function(e,t,r){r=void 0===r?"GLOBAL_RULE":r;var n=this.subjectMapper(r),o=this.policies.get(n),i=o||this.rules.get(n);if(void 0===i){if(this.strict)throw new Error('Unknown subject "'.concat(n,'"'));return!1}for(var a=arguments.length,s=new Array(a>3?a-3:0),c=3;c<a;c++)s[c-3]=arguments[c];if(o&&"function"==typeof o.beforeAll){var u=o.beforeAll.apply(o,[t,e,r,n].concat(s));if(void 0!==u)return u}if("function"==typeof i[t])return Boolean(i[t].apply(i,[e,r,n].concat(s)));if(this.strict&&void 0===i[t])throw new Error('Unknown verb "'.concat(t,'"'));return Boolean(i[t])}},{key:"some",value:function(e,t,r){for(var n=this,o=arguments.length,i=new Array(o>3?o-3:0),a=3;a<o;a++)i[a-3]=arguments[a];return r.some(function(r){return n.can.apply(n,[e,t,r].concat(i))})}},{key:"every",value:function(e,t,r){for(var n=this,o=arguments.length,i=new Array(o>3?o-3:0),a=3;a<o;a++)i[a-3]=arguments[a];return r.every(function(r){return n.can.apply(n,[e,t,r].concat(i))})}},{key:"mixin",value:function(e){var t=this;return e.prototype.can=function(){return t.can.apply(t,[this].concat(Array.prototype.slice.call(arguments)))},e.prototype.can.every=function(){return t.every.apply(t,[this].concat(Array.prototype.slice.call(arguments)))},e.prototype.can.some=function(){return t.some.apply(t,[this].concat(Array.prototype.slice.call(arguments)))},this}},{key:"subjectMapper",value:function(e){if("string"==typeof e)return e;var t="function"==typeof e;return t&&this.registry.has(e)?this.registry.get(e):!t&&this.registry.has(e.constructor)?this.registry.get(e.constructor):t?e.name:e.constructor.name}},{key:"reset",value:function(){return this.rules=new Map,this.policies=new Map,this.registry=new WeakMap,this}},{key:"removeRules",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=this.subjectMapper(e);if(this.rules.has(r)){if(t){var n=this.rules.get(r);return delete n[t],this}this.rules.delete(r)}return this}},{key:"removePolicy",value:function(e){var t=this.subjectMapper(e);return this.policies.delete(t),this}},{key:"removeAll",value:function(e){return this.removeRules(e),this.removePolicy(e),this}}])&&function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(e.prototype,r),e}(),n={install:function(t,n,s,c={}){const u="function"==typeof n?n:()=>n,l=Boolean(c.strict);c=Object.assign({acl:{strict:l},assumeGlobal:!l,caseMode:!0,debug:!1,directive:"can",failRoute:"/",helper:!0,strict:!1},c);let f=s;if(s instanceof r||s(f=new r(c.acl)),f.router=function(t){c.router=t;const r=(e,t,...r)=>t&&f.can(u(),e,t,...r)||!t&&!c.strict,n=(t,n,o)=>{let i=null;const a=t.reduce((t,a)=>t.then(t=>{if(!0!==t)return t;i=a.fail;const s="function"==typeof a.can?a.can(n,o,r):Promise.resolve(r(...(t=>{const[r=null,n=(c.assumeGlobal?e:null)]=(t.can||"").split(" ");return[r,n]})(a)));if(c.strict&&!(s instanceof Promise))throw new Error("$route.meta.can must return a promise in strict mode");return s}).catch(e=>(c.debug&&console.error(e),!1)),Promise.resolve(!0));return a.getFail=()=>i,a};t.beforeEach((e,t,r)=>{const o=e.matched.filter(e=>e.meta&&e.meta.can).map(e=>e.meta),i=n(o,e,t);i.then(e=>{if(!0===e)return r();const n="$from"===i.getFail()?t.path:i.getFail();r(n||c.failRoute)})})},c.router&&f.router(c.router),t.directive(c.directive,function(t,r,n){const s=r.modifiers.disable?"disable":"hide";let l,p,v,h;if(p=r.arg,Array.isArray(r.value)&&r.expression.startsWith("[")?[l,v,h]=r.modifiers.global?i(r):o(r):"string"==typeof r.value?[l,v,h]=a(r,n,c):p&&"object"==typeof r.value?(l=p,v=r.value,h=[]):void 0===r.value&&!r.modifiers.global&&c.assumeGlobal&&(l=p,v=e,h=[]),c.assumeGlobal&&!v&&(v=e,h=h||[],l=l||p),!l||!v)throw new Error("Missing verb or subject");const y=(r.modifiers.some?"some":r.modifiers.every&&"every")||"can",d=f[y](u(),l,v,...h),m=r.modifiers.not;(d&&m||!d&&!m)&&("hide"===s?function(e,t){const r=document.createComment(" ");Object.defineProperty(r,"setAttribute",{value:()=>void 0}),t.text=" ",t.elm=r,t.isComment=!0,t.tag=void 0,t.data.directives=void 0,t.componentInstance&&(t.componentInstance.$el=r);e.parentNode&&e.parentNode.replaceChild(r,e)}(t,n):"disable"===s?t.disabled=!0:"readonly"===s&&(t.readOnly=!0))}),c.helper){const e=`$${c.directive}`;t.prototype[e]=function(){return f.can(u(),...arguments)},t.prototype[e].not=function(){return!f.can(u(),...arguments)},t.prototype[e].every=function(){return f.every(u(),...arguments)},t.prototype[e].some=function(){return f.some(u(),...arguments)}}}};const o=({arg:e,value:t})=>[e||t[0],e?t[0]:t[1],e?t.slice(1):t.slice(2)],i=({arg:t,value:r})=>[t||r[0],e,t?r:r.slice(1)],a=({arg:e,value:t,modifiers:r},n,o)=>{let[i,a]=e?[e,t]:t.split(" ");if(a&&r.global)throw new Error("You cannot provide subject and use global modifier at the same time");return"string"==typeof a&&o.caseMode&&a[0].match(/[a-z]/)&&(a=n.context[a]),[i,a,[]]};export default n;
//# sourceMappingURL=vue-browser-acl.esm.js.map
