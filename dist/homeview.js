var wt=globalThis,xt=wt.ShadowRoot&&(wt.ShadyCSS===void 0||wt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ot=Symbol(),le=new WeakMap,nt=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Ot)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(xt&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=le.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&le.set(t,e))}return e}toString(){return this.cssText}},ce=r=>new nt(typeof r=="string"?r:r+"",void 0,Ot),C=(r,...e)=>{let t=r.length===1?r[0]:e.reduce((i,s,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1],r[0]);return new nt(t,r,Ot)},he=(r,e)=>{if(xt)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=wt.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,r.appendChild(i)}},It=xt?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return ce(t)})(r):r;var{is:di,defineProperty:pi,getOwnPropertyDescriptor:ui,getOwnPropertyNames:fi,getOwnPropertySymbols:mi,getPrototypeOf:gi}=Object,G=globalThis,de=G.trustedTypes,vi=de?de.emptyScript:"",Ht=G.reactiveElementPolyfillSupport,ot=(r,e)=>r,zt={toAttribute(r,e){switch(e){case Boolean:r=r?vi:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},ue=(r,e)=>!di(r,e),pe={attribute:!0,type:String,converter:zt,reflect:!1,useDefault:!1,hasChanged:ue};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),G.litPropertyMetadata??(G.litPropertyMetadata=new WeakMap);var D=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=pe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&pi(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:n}=ui(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){let a=s==null?void 0:s.call(this);n==null||n.call(this,o),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??pe}static _$Ei(){if(this.hasOwnProperty(ot("elementProperties")))return;let e=gi(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ot("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ot("properties"))){let t=this.properties,i=[...fi(t),...mi(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(It(s))}else e!==void 0&&t.push(It(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return he(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var n;let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let o=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:zt).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){var n,o;let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let a=i.getPropertyOptions(s),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:zt;this._$Em=s;let h=l.fromAttribute(t,a.type);this[s]=h??((o=this._$Ej)==null?void 0:o.get(s))??h,this._$Em=null}}requestUpdate(e,t,i,s=!1,n){var o;if(e!==void 0){let a=this.constructor;if(s===!1&&(n=this[e]),i??(i=a.getPropertyOptions(e)),!((i.hasChanged??ue)(n,t)||i.useDefault&&i.reflect&&n===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[n,o]of s){let{wrapped:a}=o,l=this[n];a!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,o,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[ot("elementProperties")]=new Map,D[ot("finalized")]=new Map,Ht==null||Ht({ReactiveElement:D}),(G.reactiveElementVersions??(G.reactiveElementVersions=[])).push("2.1.2");var lt=globalThis,fe=r=>r,_t=lt.trustedTypes,me=_t?_t.createPolicy("lit-html",{createHTML:r=>r}):void 0,xe="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,_e="?"+N,bi=`<${_e}>`,W=document,ct=()=>W.createComment(""),ht=r=>r===null||typeof r!="object"&&typeof r!="function",Wt=Array.isArray,yi=r=>Wt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Ft=`[ 	
\f\r]`,at=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,ve=/>/g,B=RegExp(`>|${Ft}(?:([^\\s"'>=/]+)(${Ft}*=${Ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,ye=/"/g,ke=/^(?:script|style|textarea|title)$/i,jt=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),b=jt(1),_=jt(2),ts=jt(3),j=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),we=new WeakMap,q=W.createTreeWalker(W,129);function $e(r,e){if(!Wt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return me!==void 0?me.createHTML(e):e}var wi=(r,e)=>{let t=r.length-1,i=[],s,n=e===2?"<svg>":e===3?"<math>":"",o=at;for(let a=0;a<t;a++){let l=r[a],h,d,c=-1,p=0;for(;p<l.length&&(o.lastIndex=p,d=o.exec(l),d!==null);)p=o.lastIndex,o===at?d[1]==="!--"?o=ge:d[1]!==void 0?o=ve:d[2]!==void 0?(ke.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=B):d[3]!==void 0&&(o=B):o===B?d[0]===">"?(o=s??at,c=-1):d[1]===void 0?c=-2:(c=o.lastIndex-d[2].length,h=d[1],o=d[3]===void 0?B:d[3]==='"'?ye:be):o===ye||o===be?o=B:o===ge||o===ve?o=at:(o=B,s=void 0);let f=o===B&&r[a+1].startsWith("/>")?" ":"";n+=o===at?l+bi:c>=0?(i.push(h),l.slice(0,c)+xe+l.slice(c)+N+f):l+N+(c===-2?a:f)}return[$e(r,n+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},dt=class r{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,o=0,a=e.length-1,l=this.parts,[h,d]=wi(e,t);if(this.el=r.createElement(h,i),q.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=q.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(xe)){let p=d[o++],f=s.getAttribute(c).split(N),u=/([.?@])?(.*)/.exec(p);l.push({type:1,index:n,name:u[2],strings:f,ctor:u[1]==="."?Gt:u[1]==="?"?Nt:u[1]==="@"?Bt:J}),s.removeAttribute(c)}else c.startsWith(N)&&(l.push({type:6,index:n}),s.removeAttribute(c));if(ke.test(s.tagName)){let c=s.textContent.split(N),p=c.length-1;if(p>0){s.textContent=_t?_t.emptyScript:"";for(let f=0;f<p;f++)s.append(c[f],ct()),q.nextNode(),l.push({type:2,index:++n});s.append(c[p],ct())}}}else if(s.nodeType===8)if(s.data===_e)l.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf(N,c+1))!==-1;)l.push({type:7,index:n}),c+=N.length-1}n++}}static createElement(e,t){let i=W.createElement("template");return i.innerHTML=e,i}};function X(r,e,t=r,i){var o,a;if(e===j)return e;let s=i!==void 0?(o=t._$Co)==null?void 0:o[i]:t._$Cl,n=ht(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),n===void 0?s=void 0:(s=new n(r),s._$AT(r,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=X(r,s._$AS(r,e.values),s,i)),e}var Ut=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??W).importNode(t,!0);q.currentNode=s;let n=q.nextNode(),o=0,a=0,l=i[0];for(;l!==void 0;){if(o===l.index){let h;l.type===2?h=new pt(n,n.nextSibling,this,e):l.type===1?h=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(h=new qt(n,this,e)),this._$AV.push(h),l=i[++a]}o!==(l==null?void 0:l.index)&&(n=q.nextNode(),o++)}return q.currentNode=W,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},pt=class r{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),ht(e)?e===v||e==null||e===""?(this._$AH!==v&&this._$AR(),this._$AH=v):e!==this._$AH&&e!==j&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):yi(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==v&&ht(this._$AH)?this._$AA.nextSibling.data=e:this.T(W.createTextNode(e)),this._$AH=e}$(e){var n;let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=dt.createElement($e(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(t);else{let o=new Ut(s,this),a=o.u(this.options);o.p(t),this.T(a),this._$AH=o}}_$AC(e){let t=we.get(e.strings);return t===void 0&&we.set(e.strings,t=new dt(e)),t}k(e){Wt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let n of e)s===t.length?t.push(i=new r(this.O(ct()),this.O(ct()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){let s=fe(e).nextSibling;fe(e).remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=v}_$AI(e,t=this,i,s){let n=this.strings,o=!1;if(n===void 0)e=X(this,e,t,0),o=!ht(e)||e!==this._$AH&&e!==j,o&&(this._$AH=e);else{let a=e,l,h;for(e=n[0],l=0;l<n.length-1;l++)h=X(this,a[i+l],t,l),h===j&&(h=this._$AH[l]),o||(o=!ht(h)||h!==this._$AH[l]),h===v?e=v:e!==v&&(e+=(h??"")+n[l+1]),this._$AH[l]=h}o&&!s&&this.j(e)}j(e){e===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Gt=class extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===v?void 0:e}},Nt=class extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==v)}},Bt=class extends J{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??v)===j)return;let i=this._$AH,s=e===v&&i!==v||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==v&&(i===v||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}},qt=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}};var Dt=lt.litHtmlPolyfillSupport;Dt==null||Dt(dt,pt),(lt.litHtmlVersions??(lt.litHtmlVersions=[])).push("3.3.3");var Me=(r,e,t)=>{let i=(t==null?void 0:t.renderBefore)??e,s=i._$litPart$;if(s===void 0){let n=(t==null?void 0:t.renderBefore)??null;i._$litPart$=s=new pt(e.insertBefore(ct(),n),n,void 0,t??{})}return s._$AI(r),s};var V=globalThis,O=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Me(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return j}},Se;O._$litElement$=!0,O.finalized=!0,(Se=V.litElementHydrateSupport)==null||Se.call(V,{LitElement:O});var Vt=V.litElementPolyfillSupport;Vt==null||Vt({LitElement:O});(V.litElementVersions??(V.litElementVersions=[])).push("4.2.2");function ut(r,e,t={}){r.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}var Z=r=>r.split(".")[0];function kt(r,e){var s,n,o,a,l;let t=(s=r.entities)==null?void 0:s[e],i=(t==null?void 0:t.area_id)??(t!=null&&t.device_id?(o=(n=r.devices)==null?void 0:n[t.device_id])==null?void 0:o.area_id:void 0);return i?(l=(a=r.areas)==null?void 0:a[i])==null?void 0:l.name:void 0}function Ae(r,e){var t;return((t=r.states[e])==null?void 0:t.attributes.friendly_name)??e}var Q=r=>!r||r.state==="unavailable"||r.state==="unknown";function H(r,e,t){let i=window;i.customCards??(i.customCards=[]),i.customCards.push({type:r,name:e,description:t,preview:!0})}var xi=r=>{var e;return r.media_class==="image"||!!((e=r.media_content_type)!=null&&e.startsWith("image/"))};function Kt(r){let e=r.attributes;return typeof e.temperature=="number"?{mode:"single",value:e.temperature}:typeof e.target_temp_low=="number"&&typeof e.target_temp_high=="number"?{mode:"dual",low:e.target_temp_low,high:e.target_temp_high}:{mode:"none"}}function Ee(r,e,t,i){let s=Math.round(r/e)*e;return+Math.min(i,Math.max(t,s)).toFixed(e<1?1:0)}function Ce(r){let e=r.attributes;if(e.hvac_action==="cooling")return"high";if(e.hvac_action==="heating")return"low";let t=e.current_temperature;return typeof t=="number"&&typeof e.target_temp_low=="number"&&typeof e.target_temp_high=="number"&&Math.abs(t-e.target_temp_high)<Math.abs(t-e.target_temp_low)?"high":"low"}function Yt(r,e){switch(r){case"lock":return e!=="locked"&&e!=="locking";case"cover":return e==="open"||e==="opening";case"scene":return!1;default:return e==="on"}}function Te(r,e){switch(r){case"lock":return e==="locked"?["lock","unlock"]:["lock","lock"];case"scene":return["scene","turn_on"];case"script":return e==="on"?["script","turn_off"]:["script","turn_on"];case"cover":return["cover","toggle"];case"light":case"switch":case"fan":case"input_boolean":return[r,"toggle"];default:return["homeassistant","toggle"]}}function Pe(r,e,t){let i=e+t/60;return{h:(r%12+i/60)*30,m:i*6,s:t*6}}function Xt(r,e=new Date){if(!r)return{h:e.getHours(),m:e.getMinutes(),s:e.getSeconds(),ms:e.getMilliseconds()};let t=new Intl.DateTimeFormat("en-GB",{timeZone:r,hour:"numeric",minute:"numeric",second:"numeric",hourCycle:"h23"}).formatToParts(e),i=s=>{var n;return+(((n=t.find(o=>o.type===s))==null?void 0:n.value)??0)};return{h:i("hour"),m:i("minute"),s:i("second"),ms:e.getMilliseconds()}}function K(r){return(Array.isArray(r)?r:[r]).filter(t=>typeof t=="string").map(t=>t.trim()).filter(Boolean)}async function Re(r,e,t){let i=new Set,s=K(e).map(a=>[a,0]),n=0,o;for(;s.length&&i.size<5e4;){let[a,l]=s.shift(),h;try{h=await r.callWS({type:"media_source/browse_media",media_content_id:a})}catch(d){if(l>0)throw d;o??(o=d);continue}l===0&&n++;for(let d of h.children??[])if(xi(d)?i.add(d.media_content_id):t&&d.can_expand&&l<3&&s.push([d.media_content_id,l+1]),i.size>=5e4)break}if(!n&&o)throw o;return[...i]}function Mt(r,e){let t,i=new Promise((s,n)=>{t=setTimeout(()=>n(new Error("Home Assistant did not answer")),e)});return Promise.race([r,i]).finally(()=>clearTimeout(t))}function Le(r,e){let t={...r};for(let i of e)i in t&&!Array.isArray(t[i])&&(t[i]=K(t[i]));return t}function Oe(r,e){let t={...r};for(let i of e){if(!(i in t))continue;let s=t[i];if(Array.isArray(s)&&s.some(o=>typeof o!="string"||!o.trim()))continue;let n=K(s);n.length?t[i]=n.length===1?n[0]:n:delete t[i]}return t}function Ie(r,e,t){let i=Math.abs(r),s=Math.abs(e);if(i<10&&s<10)return t<600?"tap":null;let n=Math.max(i,s)/Math.max(t,1)>.5;return i>s*1.2&&(i>=60||n&&i>=25)?r<0?"left":"right":s>i*1.2&&(s>=90||n&&s>=30)?e<0?"up":"down":null}var $t=class{constructor(e=100){this.list=[];this.pos=-1;this.max=e}peek(e){return this.list[this.pos+e]}step(e){let t=this.peek(e);return t!==void 0&&(this.pos+=e),t}push(e){this.list.splice(this.pos+1,1/0,e),this.list.length>this.max&&this.list.shift(),this.pos=this.list.length-1}drop(e){let t=this.list.indexOf(e);t<0||(this.list.splice(t,1),t<=this.pos&&this.pos--)}clear(){this.list=[],this.pos=-1}};function He(r,e=Math.random){let t=r.slice();for(let i=t.length-1;i>0;i--){let s=Math.floor(e()*(i+1));[t[i],t[s]]=[t[s],t[i]]}return t}function ze(r,e){switch(e.type){case"run-start":return r==="idle"?"listening":r;case"stt-vad-end":case"stt-end":case"intent-start":return"thinking";case"tts-start":case"tts-end":return"responding";case"error":return"error";default:return r}}function _i(r){return r==="NotAllowedError"||r==="SecurityError"?"Microphone access was denied":r==="NotFoundError"?"No microphone found":r==="stt-no-text-recognized"?"Didn't catch that":r==="pipeline-not-found"?"Assist pipeline not found":r==="timeout"?"Assist timed out":r.startsWith("wake")?"Wake word detection failed":r.startsWith("stt")?"Couldn't recognize speech":r.startsWith("intent")?"Couldn't handle the request":r.startsWith("tts")?"Couldn't speak the reply":"Something went wrong"}function Fe(r){let e=r??{},t=typeof e.code=="string"?e.code:typeof e.name=="string"?e.name:"",i=typeof e.message=="string"&&e.message||t||String(r);return{text:_i(t),detail:i}}function De(r){switch(r){case"listening":return"listening";case"processing":return"thinking";case"responding":return"responding";case void 0:case"unavailable":return"error";default:return"idle"}}var ki=[{name:"",type:"expandable",flatten:!0,title:"Glass and wallpaper",schema:[{name:"wallpaper",label:"Wallpaper",helper:"Built-in champagne or teal, an image URL such as /local/wall.jpg, or 'view' to use the view background set in Home Assistant. A view background always wins.",selector:{select:{custom_value:!0,mode:"dropdown",options:[{value:"champagne",label:"Champagne (built-in)"},{value:"teal",label:"Teal (built-in)"},{value:"view",label:"View background"}]}}},{name:"glass",label:"Glass rendering",helper:"Auto pre-renders the refraction (fast, works everywhere). Live refracts in real time (Chromium only, GPU heavy). Frost is plain blur.",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (pre-rendered)"},{value:"live",label:"Live (Chromium)"},{value:"frost",label:"Frost"}]}}}]}],$i=r=>r.replace(/_/g," ").replace(/^./,e=>e.toUpperCase()),ft=class extends O{constructor(){super(...arguments);this.fields=[]}setConfig(t){this._config=t}render(){return!this.hass||!this._config?v:b`<ha-form
      .hass=${this.hass}
      .data=${Le(this._config,this.listNames())}
      .schema=${[...this.fields,...ki]}
      .computeLabel=${t=>t.label??$i(t.name)}
      .computeHelper=${t=>t.helper}
      @value-changed=${this.changed}
    ></ha-form>`}listNames(){return this.fields.filter(t=>t.list).map(t=>t.name)}changed(t){t.stopPropagation();let i=Oe({...t.detail.value},this.listNames());for(let[s,n]of Object.entries(i))(n===""||n===void 0||n===null)&&delete i[s];ut(this,"config-changed",{config:i})}};ft.properties={hass:{attribute:!1},fields:{attribute:!1},_config:{state:!0}};function Mi(r,e=3){return Math.round((Math.sqrt(12*r*r/e+1)-1)/2)}function Ue(r,e,t=3){let i=Mi(e,t);if(i<1)return r;let{width:s,height:n}=r,o=r.data,a=new Uint8ClampedArray(o.length),l=(h,d,c)=>{let p=c?s:n,f=c?n:s,u=c?4:s*4,x=2*i+1;for(let M=0;M<f;M++){let P=c?M*s*4:M*4;for(let T=0;T<4;T++){let w=0;for(let m=-i;m<=i;m++)w+=h[P+Math.min(p-1,Math.max(0,m))*u+T];for(let m=0;m<p;m++){d[P+m*u+T]=w/x;let g=Math.min(p-1,m+i+1),y=Math.max(0,m-i);w+=h[P+g*u+T]-h[P+y*u+T]}}}};for(let h=0;h<t;h++)l(o,a,!0),l(a,o,!1);return a=new Uint8ClampedArray(0),r}function Ge(r,e,t,i,s){let n=new Uint8ClampedArray(i*s*4);for(let o=0;o<s;o++){let a=Math.min(r.height-1,Math.max(0,t+o));for(let l=0;l<i;l++){let h=Math.min(r.width-1,Math.max(0,e+l)),d=(a*r.width+h)*4,c=(o*i+l)*4;n[c]=r.data[d],n[c+1]=r.data[d+1],n[c+2]=r.data[d+2],n[c+3]=r.data[d+3]}}return{width:i,height:s,data:n}}function Ne(r,e,t,i,s,n){let o=e.width,a=e.height,l=r.width,h=r.height,d=r.data,c=e.data,p=new Uint8ClampedArray(o*a*4),f=(s.scale+s.aberration)*n,u=s.scale*n,x=Math.max(0,s.scale-s.aberration)*n,M=1.25,P=1.03,T=(w,m,g)=>{w=Math.min(l-1.001,Math.max(0,w)),m=Math.min(h-1.001,Math.max(0,m));let y=w|0,k=m|0,S=w-y,I=m-k,R=(k*l+y)*4+g,L=R+l*4;return(d[R]*(1-S)+d[R+4]*S)*(1-I)+(d[L]*(1-S)+d[L+4]*S)*I};for(let w=0;w<a;w++)for(let m=0;m<o;m++){let g=(w*o+m)*4;if(!c[g+3])continue;let y=c[g]/255-.5,k=c[g+1]/255-.5,S=t+m+.5,I=i+w+.5,R=T(S+f*y,I+f*k,0),L=T(S+u*y,I+u*k,1),F=T(S+x*y,I+x*k,2),U=.2126*R+.7152*L+.0722*F;R=(U+(R-U)*M)*P,L=(U+(L-U)*M)*P,F=(U+(F-U)*M)*P;let rt=c[g+2]/255*s.specular;p[g]=R+(255-R)*rt,p[g+1]=L+(255-L)*rt,p[g+2]=F+(255-F)*rt,p[g+3]=255}return{width:o,height:a,data:p}}function Be(r){let e=n=>{let o=n/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4},t=0,i=0,s=r.data;for(let n=0;n<s.length;n+=16)s[n+3]!==0&&(t+=.2126*e(s[n])+.7152*e(s[n+1])+.0722*e(s[n+2]),i++);return i?t/i:0}function qe(r,e=.07,t=.1,i=.5){let s=.30000000000000004;return r<=s?t:Math.min(i,Math.max(t,(r-s)/(r-e)))}var Si=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b3aba2"/><stop offset=".55" stop-color="#928980"/><stop offset="1" stop-color="#6d655d"/></linearGradient>
<radialGradient id="disc" cx=".62" cy=".7" r=".75" fx=".7" fy=".78"><stop offset="0" stop-color="#b3aba1"/><stop offset=".6" stop-color="#9a9187"/><stop offset="1" stop-color="#877e73"/></radialGradient>
<radialGradient id="satin" cx=".5" cy=".5" r=".55" fx=".34" fy=".28"><stop offset="0" stop-color="#d0c8be"/><stop offset=".3" stop-color="#aba297"/><stop offset=".7" stop-color="#887e73"/><stop offset="1" stop-color="#5a524a"/></radialGradient>
<radialGradient id="satin2" cx=".5" cy=".5" r=".55" fx=".3" fy=".3"><stop offset="0" stop-color="#d6cec4"/><stop offset=".45" stop-color="#a0978c"/><stop offset="1" stop-color="#696158"/></radialGradient>
<radialGradient id="dark" cx=".5" cy=".5" r=".55" fx=".38" fy=".3"><stop offset="0" stop-color="#bdb5ab"/><stop offset=".5" stop-color="#7c746b"/><stop offset="1" stop-color="#4c463f"/></radialGradient>
<linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ece7e1"/><stop offset=".5" stop-color="#c3bab0"/><stop offset="1" stop-color="#8a8177"/></linearGradient>
<filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="28"/></filter>
</defs>
<rect width="1000" height="1000" fill="url(#bg)"/>
<circle cx="170" cy="90" r="560" fill="url(#disc)"/>
<ellipse cx="230" cy="660" rx="430" ry="60" fill="#7c7164" opacity=".18" filter="url(#soft)"/>
<circle cx="430" cy="640" r="345" fill="none" stroke="url(#ring)" stroke-width="64" opacity=".75"/>
<ellipse cx="1000" cy="330" rx="140" ry="40" fill="#5f574e" opacity=".22" filter="url(#soft)"/>
<circle cx="1030" cy="150" r="380" fill="url(#satin2)"/>
<ellipse cx="600" cy="810" rx="250" ry="55" fill="#4f483f" opacity=".35" filter="url(#soft)"/>
<circle cx="575" cy="575" r="240" fill="url(#satin)"/>
<circle cx="70" cy="905" r="235" fill="url(#dark)"/>
<ellipse cx="900" cy="1000" rx="170" ry="40" fill="#4f483f" opacity=".3" filter="url(#soft)"/>
<circle cx="905" cy="860" r="165" fill="url(#satin2)"/>
<circle cx="575" cy="575" r="290" fill="none" stroke="#fbf7f0" stroke-width="5" opacity=".55"/>
<circle cx="1030" cy="150" r="430" fill="none" stroke="#fbf7f0" stroke-width="3" opacity=".5"/>
</svg>`;function Ai(){let r="";for(let t=0,i=120;i<1100;t++,i+=105)r+=`<path d="M-100 ${i} L520 ${i+330} L1100 ${i-40} L1100 ${i+15} L520 ${i+385} L-100 ${i+55}Z" fill="url(#band-${t%2?"b":"a"})" opacity="${t%2?".9":".75"}"/>`;let e="";for(let t=0;t<16;t++)e+=`<path d="M0 0 C 70 -60 200 -55 250 -8 C 180 -20 80 -10 0 0Z" transform="rotate(${t*22.5})" fill="${t%2?"url(#blade)":"#1d6158"}"/>`;return`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a7a6f"/><stop offset="1" stop-color="#123f3a"/></linearGradient>
<linearGradient id="band-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fae9f"/><stop offset="1" stop-color="#2a7d71"/></linearGradient>
<linearGradient id="band-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c5f56"/><stop offset="1" stop-color="#124a43"/></linearGradient>
<linearGradient id="blade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5dbcad"/><stop offset="1" stop-color="#2b8073"/></linearGradient>
<pattern id="stripe" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="16" height="16" fill="#1a5a52"/><rect width="7" height="16" fill="#2f8578"/></pattern>
</defs>
<rect width="1000" height="1000" fill="url(#bg)"/>
<g>${r}</g>
<g transform="translate(150 230)">${e}<circle r="26" fill="#64c2b3"/></g>
<g transform="translate(720 690) rotate(45)"><rect x="-150" y="-150" width="300" height="300" fill="url(#stripe)"/><rect x="-150" y="-150" width="300" height="300" fill="none" stroke="#6cc6b7" stroke-width="6" opacity=".6"/></g>
<g transform="translate(860 300) rotate(45)"><rect x="-90" y="-90" width="180" height="180" fill="#3a9586"/><rect x="-90" y="-90" width="180" height="90" fill="#50ab9c"/></g>
</svg>`}var Ei={champagne:{svg:Si,base:"#928980",glass:"84 74 64"},teal:{svg:Ai(),base:"#174c46",glass:"255 255 255"}},Ci=r=>r==="champagne"||r==="teal";function We(r){if(Ci(r)){let e=Ei[r];return`${e.base} center / cover no-repeat url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(e.svg)}")`}return`center / cover no-repeat url("${r.replace(/"/g,"%22")}")`}var je=new WeakMap,Ke=/^(ha-dialog|ha-md-dialog|hui-dialog-|ha-more-info)/;function Ye(r){for(let e=r;e;e=e instanceof ShadowRoot?e.host:e.parentNode)if(e instanceof HTMLElement&&Ke.test(e.localName))return!0;return!1}function Xe(r){let e=r;for(;e;){if(e instanceof ShadowRoot||e instanceof Document){let t=e.querySelector("hui-view-background");if(t)return t}if(e instanceof HTMLElement&&Ke.test(e.localName))return null;e=e instanceof ShadowRoot?e.host:e.parentNode}return null}function Je(r){let e=je.get(r);return e||(e=new Jt(r),je.set(r,e)),e}var Ve=()=>Math.min(window.devicePixelRatio||1,2),Ti=150;function Pi(r){let e=/url\((['"]?)(.*?)\1\)/.exec(r);return e?e[2]:null}function Ri(r,e,t,i,s,n){let o=t,a=i,l=s.trim().split(/\s+/);if(l[0]==="cover"||l[0]==="contain"){let c=l[0]==="cover"?Math.max(r/t,e/i):Math.min(r/t,e/i);o=t*c,a=i*c}else if(l[0]!=="auto"||l[1]&&l[1]!=="auto"){let c=(u,x)=>u==="auto"||u===void 0?null:u.endsWith("%")?parseFloat(u)/100*x:parseFloat(u),p=c(l[0],r),f=c(l[1]??"auto",e);p!==null&&f!==null?(o=p,a=f):p!==null?(o=p,a=i*p/t):f!==null&&(a=f,o=t*f/i)}let h=n.trim().split(/\s+/),d=(c,p)=>c?c.endsWith("%")?parseFloat(c)/100*p||0:c==="left"||c==="top"?0:c==="right"||c==="bottom"?p:c==="center"?p/2:parseFloat(c)||0:p/2;return{x:d(h[0],r-o),y:d(h[1]??"50%",e-a),w:o,h:a}}var Jt=class{constructor(e){this.snapshot=null;this.failure=null;this.listeners=new Set;this.key="";this.version=0;this.pending=null;this.recheck=!1;this.timer=0;this.settle=0;this.overrides=new Map;this.el=e}subscribe(e){return this.listeners.add(e),this.listeners.size===1?this.start():this.snapshot&&queueMicrotask(e),()=>{this.listeners.delete(e),this.listeners.size||this.stop()}}setWallpaper(e,t,i=!0){t?this.overrides.set(e,{value:t,explicit:i}):this.overrides.delete(e);let s=this.el.parentElement??this.el.getRootNode().host;if(!s)return;let n=[...this.overrides.values()],o=n.find(a=>a.explicit)??n[0];o?s.style.setProperty("--lovelace-background",We(o.value)):s.style.removeProperty("--lovelace-background"),this.check()}check(){if(this.pending){this.recheck=!0;return}let e=getComputedStyle(this.el),t=this.el.getBoundingClientRect();if(t.width<1||t.height<1)return;let i=[e.backgroundImage,e.backgroundSize,e.backgroundPosition,e.backgroundColor,e.opacity,Math.round(t.width),Math.round(t.height),Ve()].join("|");i!==this.key&&(this.key=i,clearTimeout(this.settle),this.settle=window.setTimeout(()=>{let s=this.el.getBoundingClientRect();this.pending=this.raster(getComputedStyle(this.el),s).finally(()=>{this.pending=null,this.recheck&&(this.recheck=!1,this.check())})},Ti))}origin(){let e=this.el.getBoundingClientRect();return{x:e.x,y:e.y}}start(){this.ro=new ResizeObserver(()=>this.check()),this.ro.observe(this.el),this.mo=new MutationObserver(()=>this.check()),this.mo.observe(this.el,{attributes:!0,attributeFilter:["style","class","fixed-background"]}),this.el.parentElement&&this.mo.observe(this.el.parentElement,{attributes:!0,attributeFilter:["style"]}),this.timer=window.setInterval(()=>this.check(),2e3),this.check()}stop(){var e,t;clearTimeout(this.settle),(e=this.ro)==null||e.disconnect(),(t=this.mo)==null||t.disconnect(),clearInterval(this.timer),this.key=""}async raster(e,t){let i=Ve(),s=Math.max(1,Math.round(t.width*i)),n=Math.max(1,Math.round(t.height*i));try{let o=document.createElement("canvas");o.width=s,o.height=n;let a=o.getContext("2d",{willReadFrequently:!0});if(!a)throw new Error("no 2d context");let l=getComputedStyle(document.documentElement).backgroundColor;a.fillStyle=l&&l!=="rgba(0, 0, 0, 0)"?l:"#111",a.fillRect(0,0,s,n),a.globalAlpha=parseFloat(e.opacity)||1,a.fillStyle=e.backgroundColor,a.fillRect(0,0,s,n);let h=e.backgroundImage;if(h&&h!=="none"){let c=Pi(h);if(!c||/gradient\(/.test(h.replace(/url\(.*?\)/g,"")))throw new Error("background is not a plain image");let p=await Li(c),f=Ri(t.width,t.height,p.naturalWidth||t.width,p.naturalHeight||t.height,e.backgroundSize,e.backgroundPosition);a.drawImage(p,f.x*i,f.y*i,f.w*i,f.h*i)}let d=a.getImageData(0,0,s,n);this.failure=null,this.snapshot={pixels:{width:s,height:n,data:d.data},x:t.x,y:t.y,k:i,version:++this.version}}catch(o){this.failure=o instanceof Error?o.message:String(o),this.snapshot=null}this.listeners.forEach(o=>o())}};function Li(r){return new Promise((e,t)=>{let i=new Image,s=new URL(r,location.href);s.origin!==location.origin&&s.protocol.startsWith("http")&&(i.crossOrigin="anonymous"),i.onload=()=>e(i),i.onerror=()=>t(new Error(`cannot load background ${r.slice(0,80)}`)),i.src=r})}function Oi(r,e,t,i,s){let n=Math.abs(r)-t+s,o=Math.abs(e)-i+s;return Math.min(Math.max(n,o),0)+Math.hypot(Math.max(n,0),Math.max(o,0))-s}function Ii(r){let e=1-Math.min(1,Math.max(0,r)),t=(1-e**4)**.75;if(t<1e-6)return 0;let i=Math.atan(Math.min(e**3/t,8)),s=Math.sin(i)/1.5;return s>=1?Math.sin(i):Math.sin(i-Math.asin(s))}function Ze(r,e,t,i,s){let n=Math.max(1,Math.round(r*s)),o=Math.max(1,Math.round(e*s)),a=n/2,l=o/2,h=Math.min(t*s,a,l),d=Math.max(1,i*s),c=Math.ceil(d),p=new Float32Array(c+1);for(let m=1;m<=c;m++)p[m]=p[m-1]+Ii(m/c);let f=m=>{if(m<=0)return 0;if(m>=c)return p[c];let g=Math.floor(m),y=m-g;return p[g]*(1-y)+p[g+1]*y},u=new Float32Array(n*o),x=new Float32Array(n*o);for(let m=0;m<o;m++)for(let g=0;g<n;g++){let y=Oi(g-a+.5,m-l+.5,a,l,h);x[m*n+g]=y,u[m*n+g]=y>0?0:f(Math.min(d,-y))}let M=1.35,P=-.54,T=-.84,w=new Uint8ClampedArray(n*o*4);for(let m=0;m<o;m++)for(let g=0;g<n;g++){let y=m*n+g,k=y<<2,S=x[y];if(S>0){w[k]=w[k+1]=w[k+2]=128,w[k+3]=0;continue}if(S<-d-2){w[k]=w[k+1]=128,w[k+2]=0,w[k+3]=255;continue}let I=Math.max(0,g-1),R=Math.min(n-1,g+1),L=Math.max(0,m-1),F=Math.min(o-1,m+1),U=Math.max(-1,Math.min(1,(u[m*n+R]-u[m*n+I])/(R-I||1)*M)),rt=Math.max(-1,Math.min(1,(u[F*n+g]-u[L*n+g])/(F-L||1)*M)),se=0;if(S>=-d){let re=x[m*n+R]-x[m*n+I],ne=x[F*n+g]-x[L*n+g],oe=Math.hypot(re,ne)||1,ae=re/oe*P+ne/oe*T,hi=(1-Math.min(1,-S/d))**1.6;se=(Math.max(0,ae)+Math.max(0,-ae)*.35)*hi}w[k]=128+U*127,w[k+1]=128+rt*127,w[k+2]=Math.round(se*255),w[k+3]=255}return{width:n,height:o,data:w}}function Qe(r,e,t={}){return{radius:e,bevel:Math.max(4,Math.round(r*(t.bevel??.13))),scale:Math.round(r*(t.refraction??.3)),aberration:Math.max(1,Math.round(r*(t.aberration??.02))),frost:+(r*(t.frost??.007)).toFixed(2),specular:.55}}function ti(){let r=navigator.userAgent;return!(/Safari/.test(r)&&!/Chrome|Chromium|Edg|OPR/.test(r))&&(CSS.supports("backdrop-filter","url(#x)")||CSS.supports("-webkit-backdrop-filter","url(#x)"))}function ei(r,e,t,i,s){let n=Math.ceil(s.scale+s.aberration+4),o=n/t*100,a=n/i*100,l=(h,d)=>`<feDisplacementMap in="SourceGraphic" in2="map" scale="${h}" xChannelSelector="R" yChannelSelector="G" result="${d}"/>`;return`<filter id="${r}" color-interpolation-filters="sRGB" x="-${o}%" y="-${a}%" width="${100+2*o}%" height="${100+2*a}%">
  <feImage href="${e}" x="0" y="0" width="${t}" height="${i}" preserveAspectRatio="none" result="map"/>
  ${l(s.scale+s.aberration,"dR")}<feColorMatrix in="dR" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
  ${l(s.scale,"dG")}<feColorMatrix in="dG" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>
  ${l(Math.max(0,s.scale-s.aberration),"dB")}<feColorMatrix in="dB" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>
  <feBlend in="r" in2="g" mode="screen" result="rg"/><feBlend in="rg" in2="b" mode="screen" result="rgb"/>
  <feGaussianBlur in="rgb" stdDeviation="${s.frost}" result="frosted"/>
  <feColorMatrix in="map" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 ${s.specular} 0 0" result="spec"/>
  <feComposite in="spec" in2="frosted" operator="over"/>
</filter>`}var Zt=window.homeview??(window.homeview={timings:[]}),mt=new Map;function ii(r,e,t,i){let s=[r,e,t.radius.toFixed(1),t.bevel,i].join("|"),n=mt.get(s);return n||(n=Ze(r,e,t.radius,t.bevel,i),mt.size>24&&mt.delete(mt.keys().next().value),mt.set(s,n)),n}var gt=new Set,Qt=!1;function si(){Qt||(Qt=!0,requestAnimationFrame(()=>{Qt=!1;let r=performance.now();for(let e of gt)if(gt.delete(e),e.bakeNow(),performance.now()-r>12)break;gt.size&&si()}))}var Hi=()=>matchMedia("(prefers-reduced-transparency: reduce)").matches,St=class{constructor(e,t="rect"){this.mode="frost";this.opts={};this.shape="rect";this.backdrop=null;this.poll=0;this.lastKey="";this.onScroll=()=>this.request();this.host=e,this.shape=t,e.addController(this)}setOptions(e){let t=JSON.stringify(e)!==JSON.stringify(this.opts);this.opts={...e},t&&this.host.isConnected&&this.attach()}hostConnected(){requestAnimationFrame(()=>this.attach()),window.addEventListener("scroll",this.onScroll,{capture:!0,passive:!0}),window.addEventListener("resize",this.onScroll,{passive:!0}),this.poll=window.setInterval(()=>this.request(),700)}hostDisconnected(){var e;this.detach(),window.removeEventListener("scroll",this.onScroll,{capture:!0}),window.removeEventListener("resize",this.onScroll),clearInterval(this.poll),(e=this.ro)==null||e.disconnect(),this.ro=void 0,gt.delete(this)}hostUpdated(){let e=this.card();e&&!this.ro&&(this.ro=new ResizeObserver(()=>this.request()),this.ro.observe(e)),this.request()}card(){return this.host.renderRoot.querySelector(".hv-glass")}canvas(){return this.host.renderRoot.querySelector("canvas.hv-bake")}detach(){var e,t;(e=this.unsub)==null||e.call(this),this.unsub=void 0,(t=this.backdrop)==null||t.setWallpaper(this,void 0),this.backdrop=null}attach(){if(!this.host.isConnected)return;this.detach();let e=Xe(this.host);this.backdrop=e?Je(e):null;let t=this.opts.wallpaper??"champagne";this.backdrop&&t!=="view"&&t!=="none"&&this.backdrop.setWallpaper(this,t,this.opts.wallpaper!==void 0),this.backdrop&&(this.unsub=this.backdrop.subscribe(()=>this.request(!0))),this.lastKey="",this.request(!0)}request(e=!1){e&&(this.lastKey=""),!(!this.host.isConnected||!this.card())&&this.key()!==this.lastKey&&(gt.add(this),si())}geometry(){let e=this.card();if(!e)return null;let t=e.offsetWidth,i=e.offsetHeight;if(t<8||i<8)return null;let s=e.getBoundingClientRect();return{x:s.x+s.width/2-t/2,y:s.y+s.height/2-i/2,w:t,h:i}}key(){var i,s,n;let e=this.geometry();if(!e)return"none";let t=((i=this.backdrop)==null?void 0:i.origin())??{x:0,y:0};return[Math.round(e.x-t.x),Math.round(e.y-t.y),e.w,e.h,((n=(s=this.backdrop)==null?void 0:s.snapshot)==null?void 0:n.version)??-1,this.mode,JSON.stringify(this.opts)].join("|")}params(e,t){let i=this.card(),s=Math.max(110,Math.min(260,Math.min(e,t))),n=this.shape==="circle"?Math.min(e,t)/2:parseFloat(getComputedStyle(i).borderTopLeftRadius)||0;return Qe(s,n,this.opts)}resolveMode(){var t;let e=this.opts.glass??"auto";return Hi()||e==="frost"?"frost":e==="live"?ti()?"live":"frost":(t=this.backdrop)!=null&&t.snapshot?"baked":"frost"}bakeNow(){let e=this.card(),t=this.canvas(),i=this.geometry();if(!e||!t||!i||!e.style.getPropertyValue("--hv-radius"))return;if(this.mode=this.resolveMode(),this.lastKey=this.key(),e.dataset.glass=this.mode,this.mode!=="live"&&e.style.removeProperty("backdrop-filter"),this.mode==="frost"){e.style.setProperty("--hv-tint-rgb","84 74 64"),e.style.setProperty("--hv-tint-a",".28");return}let s=this.params(i.w,i.h);if(this.mode==="live"){this.applyLive(e,i.w,i.h,s);return}let n=performance.now(),o=this.backdrop.snapshot,a=o.k,l=this.backdrop.origin(),h=ii(i.w,i.h,s,a),d=s.frost*a,c=Math.ceil((s.scale+s.aberration)*a+d*3+2),p=Math.round((i.x-l.x)*a)-c,f=Math.round((i.y-l.y)*a)-c,u=Ue(Ge(o.pixels,p,f,h.width+2*c,h.height+2*c),d),x=Ne(u,h,c,c,s,a);t.width=x.width,t.height=x.height,t.getContext("2d").putImageData(new ImageData(x.data,x.width,x.height),0,0);let M=Be(x);M<.18?(e.style.setProperty("--hv-tint-rgb","255 255 255"),e.style.setProperty("--hv-tint-a",".13")):(e.style.setProperty("--hv-tint-rgb","84 74 64"),e.style.setProperty("--hv-tint-a",String(Math.max(.13,qe(M)).toFixed(3)))),Zt.timings.push({card:this.host.localName,w:i.w,h:i.h,ms:Math.round(performance.now()-n)}),Zt.timings.length>200&&Zt.timings.splice(0,100)}applyLive(e,t,i,s){let n=Math.min(window.devicePixelRatio||1,2),o=ii(t,i,s,n),a=document.createElement("canvas");a.width=o.width,a.height=o.height,a.getContext("2d").putImageData(new ImageData(o.data,o.width,o.height),0,0);let l=a.toDataURL("image/png"),h=`hv-${Math.random().toString(36).slice(2,9)}`,c=this.host.renderRoot.querySelector("svg.hv-filters");c||(c=document.createElementNS("http://www.w3.org/2000/svg","svg"),c.setAttribute("class","hv-filters"),c.setAttribute("aria-hidden","true"),c.setAttribute("style","position:absolute;width:0;height:0;overflow:hidden"),this.host.renderRoot.appendChild(c)),c.innerHTML=ei(h,l,t,i,s);let p=`url(#${h}) saturate(1.25) brightness(1.03)`;e.style.setProperty("backdrop-filter",p),e.style.setProperty("-webkit-backdrop-filter",p),e.style.setProperty("--hv-tint-rgb","255 255 255"),e.style.setProperty("--hv-tint-a",".13")}};var z=C`
  :host {
    display: block;
    height: 100%;
    --hv-ink: #fff;
    --hv-ink-2: rgb(255 255 255 / 0.82);
    --hv-shadow-text: 0 1px 3px rgb(40 30 20 / 0.32), 0 0 14px rgb(40 30 20 / 0.14);
    --hv-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --hv-font: -apple-system, "SF Pro Display", "Inter", system-ui, "Segoe UI", Roboto, sans-serif;
  }
  ha-card.hv-glass {
    position: relative;
    isolation: isolate;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    border: none;
    border-radius: var(--hv-radius, 24px);
    background: none;
    color: var(--hv-ink);
    font-family: var(--hv-font);
    -webkit-font-smoothing: antialiased;
    box-shadow:
      0 0 0 0.75px rgb(60 46 32 / 0.2),
      0 calc(var(--hv-ref, 200px) * 0.03) calc(var(--hv-ref, 200px) * 0.09) rgb(60 45 30 / 0.14);
    transition: box-shadow 0.35s ease;
  }
  ha-card.hv-glass.square {
    aspect-ratio: 1;
    height: auto;
  }
  ha-card.hv-glass[data-glass="frost"] {
    backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
    -webkit-backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
  }
  canvas.hv-bake {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    border-radius: inherit;
    pointer-events: none;
    transition: opacity 0.5s ease;
  }
  ha-card:not([data-glass="baked"]) canvas.hv-bake {
    opacity: 0;
  }
  .hv-tint {
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    background: var(--hv-fill, rgb(var(--hv-tint-rgb, 84 74 64) / var(--hv-tint-a, 0.13)));
    transition: background-color 0.35s ease;
  }
  /* specular edge + soft inner shading on top of the refraction */
  ha-card.hv-glass::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 2;
    box-shadow:
      inset 0 0 0 1px rgb(255 255 255 / 0.16),
      inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.8),
      inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.4),
      inset 0 0 calc(var(--hv-ref, 200px) * 0.035) rgb(50 38 26 / 0.1);
  }
  .hv-content {
    position: relative;
    height: 100%;
    box-sizing: border-box;
  }
  .title {
    font-size: calc(var(--hv-ref, 200px) * 0.098);
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.25;
  }
  .sub {
    font-size: calc(var(--hv-ref, 200px) * 0.096);
    font-weight: 400;
    color: var(--hv-ink-2);
    line-height: 1.3;
  }
  .ink {
    text-shadow: var(--hv-shadow-text);
  }
  .warning {
    font-size: calc(var(--hv-ref, 200px) * 0.075);
    color: var(--hv-ink-2);
    text-align: center;
    padding: 0 8%;
  }
  button {
    font: inherit;
    color: inherit;
  }
  :focus-visible {
    outline: 2px solid rgb(255 255 255 / 0.9);
    outline-offset: 3px;
  }
  @media (prefers-reduced-transparency: reduce) {
    ha-card.hv-glass {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
    .hv-tint {
      background: rgb(var(--hv-tint-rgb, 84 74 64)) !important;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition-duration: 0.01ms !important;
      animation: none !important;
    }
  }
`,A=class extends O{constructor(e="rect"){super(),this.glass=new St(this,e)}static getConfigElement(){let e=document.createElement("homeview-card-editor");return e.fields=this.editorFields,e}setConfig(e){if(!e)throw new Error("Invalid configuration");this.validate(e),this._config=e,this.glass.setOptions({glass:e.glass,wallpaper:e.wallpaper,bevel:e.bevel,refraction:e.refraction,aberration:e.aberration,frost:e.frost})}validate(e){}getCardSize(){return 3}get square(){var e,t;return typeof((t=(e=this._config)==null?void 0:e.grid_options)==null?void 0:t.rows)!="number"}refFrom(e,t){return Math.min(e,t)}get onScreen(){return this.getClientRects().length>0}resume(){}cardClass(){return""}render(){return this._config?b`<ha-card class="hv-glass ${this.square?"square":""} ${this.cardClass()}">
      <canvas class="hv-bake" aria-hidden="true"></canvas>
      <div class="hv-tint"></div>
      <div class="hv-content">${this.renderContent()}</div>
    </ha-card>`:b``}firstUpdated(e){let t=this.renderRoot.querySelector("ha-card");t&&(this.sizer=new ResizeObserver(()=>{let i=this.refFrom(t.offsetWidth,t.offsetHeight);t.style.setProperty("--hv-ref",`${i}px`),t.style.setProperty("--hv-radius",`${Math.round(Math.max(14,Math.min(34,i*.125)))}px`),t.toggleAttribute("data-wide",t.offsetWidth>t.offsetHeight*1.5),t.toggleAttribute("data-short",t.offsetHeight<240),this.glass.request(!0),t.offsetWidth&&this.resume()}),this.sizer.observe(t))}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.sizer)==null||e.disconnect(),this.sizer=void 0}connectedCallback(){super.connectedCallback(),this.hasUpdated&&!this.sizer&&this.firstUpdated(new Map)}};A.properties={hass:{attribute:!1},_config:{state:!0}},A.editorFields=[];var E=r=>_`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${r}</svg>`,$={sun:E(_`<circle cx="12" cy="12" r="4.3"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2.2v2.4M12 19.4v2.4M2.2 12h2.4M19.4 12h2.4M5.1 5.1l1.7 1.7M17.2 17.2l1.7 1.7M5.1 18.9l1.7-1.7M17.2 6.8l1.7-1.7"/></g>`),moon:E(_`<path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8a8.6 8.6 0 1 0 10.8 10.8z"/><path d="M17 3.2l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6zM20.6 7.6l.4.9.9.4-.9.4-.4.9-.4-.9-.9-.4.9-.4z"/>`),lock:E(_`<path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="4.75" y="9.5" width="14.5" height="12" rx="2.6"/>`),unlock:E(_`<path d="M7.5 10V7.5a4.5 4.5 0 0 1 8.7-1.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><rect x="4.75" y="9.5" width="14.5" height="12" rx="2.6"/>`),light:E(_`<rect x="11.1" y="1.5" width="1.8" height="5" rx=".9"/><rect x="8.6" y="1.2" width="6.8" height="1.9" rx=".95"/><path d="M12 6.2c-4.1 0-7.6 3.2-8 7.3-.05.5.35.9.85.9h14.3c.5 0 .9-.4.85-.9-.4-4.1-3.9-7.3-8-7.3z"/><path d="M8.6 15.6h6.8a3.4 3.4 0 0 1-6.8 0z"/>`),fan:E(_`<circle cx="12" cy="10" r="8.2" fill="none" stroke="currentColor" stroke-width="1.6"/><g class="blades"><path d="M12 10c-.4-2.6.2-5 1.9-5.6 1.6-.5 2.6 1.4 1.4 3.1-.8 1.2-2 1.9-3.3 2.5z"/><path d="M12 10c2.4 1 4.2 2.8 3.8 4.5-.4 1.6-2.6 1.5-3.4-.4-.6-1.3-.6-2.7-.4-4.1z"/><path d="M12 10c-2 1.6-4.4 2.3-5.6 1.1-1.2-1.2.1-3 2.1-2.8 1.4.1 2.5.9 3.5 1.7z"/></g><circle cx="12" cy="10" r="1.3"/><path d="M10.6 18.1h2.8l.9 3.4H9.7z"/><rect x="7.5" y="21" width="9" height="1.8" rx=".9"/>`),curtains:E(_`<rect x="2" y="2.5" width="20" height="1.8" rx=".9"/><path d="M4 4.3h6.5c-.3 4.6-1.4 9.8-3.5 16.9H4z"/><path d="M20 4.3h-6.5c.3 4.6 1.4 9.8 3.5 16.9H20z"/>`),curtainsOpen:E(_`<rect x="2" y="2.5" width="20" height="1.8" rx=".9"/><path d="M4 4.3h3.2c-.2 4.6-.6 9.8-1.4 16.9H4z"/><path d="M20 4.3h-3.2c.2 4.6.6 9.8 1.4 16.9H20z"/>`),garage:E(_`<path d="M2 9.6 12 3l10 6.6V21a1 1 0 0 1-1 1h-1.6V11.4H4.6V22H3a1 1 0 0 1-1-1z"/><rect x="6.2" y="13" width="11.6" height="2" rx=".5"/><rect x="6.2" y="16.2" width="11.6" height="2" rx=".5"/><rect x="6.2" y="19.4" width="11.6" height="2" rx=".5"/>`),garageOpen:E(_`<path d="M2 9.6 12 3l10 6.6V21a1 1 0 0 1-1 1h-1.6V11.4H4.6V22H3a1 1 0 0 1-1-1z"/><rect x="6.2" y="13" width="11.6" height="2" rx=".5"/>`),power:E(_`<path d="M12 2.5v8.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M7.1 5.4a8 8 0 1 0 9.8 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`),play:E(_`<path d="M8 4.7v14.6c0 .9 1 1.4 1.7.9l11-7.3c.7-.4.7-1.4 0-1.8l-11-7.3C9 3.3 8 3.8 8 4.7z"/><path d="M3.5 6.5l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z"/>`),dot:E(_`<circle cx="12" cy="12" r="6"/>`),chevronUp:_`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 15l7-7 7 7"/></svg>`,chevronDown:_`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>`,mic:E(_`<rect x="8.5" y="2" width="7" height="12.5" rx="3.5"/><path d="M5 11a7 7 0 0 0 14 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 18v3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),keyboard:E(_`<rect x="2" y="5.5" width="20" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6 9.5h1.6M9.2 9.5h1.6M12.4 9.5h1.6M15.6 9.5h1.6M6 12.5h1.6M15.6 12.5h1.6M9.2 12.5h4.8M7.5 15.5h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`),retry:E(_`<path d="M19 12a7 7 0 1 1-2.05-4.95" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M20 3.6v6h-6z"/>`),stop:E(_`<rect x="6" y="6" width="12" height="12" rx="2.5"/>`),close:_`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,send:E(_`<path d="M3.4 11.2 19.6 4.1c.8-.3 1.6.5 1.3 1.3l-7.1 16.2c-.3.8-1.5.7-1.7-.1l-1.6-6.2-6.2-1.6c-.8-.2-.9-1.4-.1-1.7z"/>`)};function ri(r,e,t){switch(r){case"light":return $.light;case"lock":return t?$.unlock:$.lock;case"fan":return $.fan;case"cover":return e==="garage"||e==="gate"?t?$.garageOpen:$.garage:t?$.curtainsOpen:$.curtains;case"scene":return $.sun;case"script":return $.play;case"switch":case"input_boolean":return $.power;default:return $.dot}}var zi={easing:"cubic-bezier(.34,1.56,.64,1)",duration:520};function Fi(r,e,t,i=1){let s=Math.sqrt(e/i),n=t/(2*Math.sqrt(e*i));if(n>=1)return 1-Math.exp(-s*r)*(1+s*r);let o=s*Math.sqrt(1-n*n);return 1-Math.exp(-n*s*r)*(Math.cos(o*r)+n*s/o*Math.sin(o*r))}function Di(r=210,e=17,t=1,i=48){let s=a=>Fi(a,r,e,t),n=0;for(;n<4&&!(Math.abs(1-s(n))<.002&&Math.abs(1-s(n+.05))<.002);)n+=.01;let o=Array.from({length:i+1},(a,l)=>+s(l/i*n).toFixed(4));return o[i]=1,{easing:`linear(${o.join(",")})`,duration:Math.round(n*1e3)}}var At;function ni(){if(At)return At;let r=Di();return At=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("transition-timing-function","linear(0, 1)")?r:zi,At}var Ui=800,tt=class extends A{constructor(){super(...arguments);this.sendTimer=0;this.lastDir=0}static getStubConfig(t){return{entity:Object.keys(t.states).find(i=>i.startsWith("climate."))??""}}validate(t){if(!t.entity||!t.entity.startsWith("climate."))throw new Error("Pick a climate entity")}getGridOptions(){return{columns:8,rows:"auto",min_columns:6,min_rows:4}}getCardSize(){return 6}refFrom(t,i){return Math.min(t,i)/2}get stateObj(){var t;return(t=this.hass)==null?void 0:t.states[this._config.entity]}get step(){var t,i,s;return((t=this._config)==null?void 0:t.step)??((i=this.stateObj)==null?void 0:i.attributes.target_temp_step)??(((s=this.hass)==null?void 0:s.config.unit_system.temperature)==="\xB0C"?.5:1)}current(){let t=this.stateObj;if(!t)return{mode:"none"};let i=Kt(t),s=this._pending;return s&&Date.now()-s.at<6e3?{...i,...Object.fromEntries(Object.entries(s).filter(([n,o])=>n!=="at"&&o!==void 0))}:i}activeSide(){return this.current().mode!=="dual"?"single":this._side??Ce(this.stateObj)}willUpdate(t){if(t.has("hass")&&this._pending&&this.stateObj&&!this.sendTimer){let i=Kt(this.stateObj),s=this._pending;((s.value===void 0||s.value===i.value)&&(s.low===void 0||s.low===i.low)&&(s.high===void 0||s.high===i.high)||Date.now()-s.at>6e3)&&(this._pending=void 0)}}shown(){let t=this.current(),i=this.activeSide();return i==="single"?t.value:i==="low"?t.low:t.high}stepBy(t){let i=this.stateObj;if(!i)return;let s=this.current(),n=this.activeSide(),o=i.attributes,a=o.min_temp??-1/0,l=o.max_temp??1/0,h=this.step,d=this.shown();if(d===void 0)return;let c=a,p=l;n==="low"&&s.high!==void 0&&(p=Math.min(l,s.high-h)),n==="high"&&s.low!==void 0&&(c=Math.max(a,s.low+h));let f=Ee(d+t*h,h,c,p);if(f===d)return;this.ghost(t);let u={...this._pending??{},at:Date.now()};n==="single"?u.value=f:u[n]=f,this._pending=u,clearTimeout(this.sendTimer),this.sendTimer=window.setTimeout(()=>this.send(),Ui)}send(){this.sendTimer=0;let t=this.stateObj;if(!t||!this.hass||!this._pending)return;let i=this.current(),s=i.mode==="dual"?{target_temp_low:i.low,target_temp_high:i.high}:{temperature:i.value};this._pending={...this._pending,at:Date.now()},this.hass.callService("climate","set_temperature",s,{entity_id:t.entity_id})}ghost(t){this.lastDir=t;let i=this.renderRoot.querySelector(".num:not(.ghost)");if(!i||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let s=i.cloneNode(!0);s.classList.add("ghost"),i.parentElement.appendChild(s),s.animate([{transform:"none",opacity:1},{transform:`translateY(${-36*t}%) scale(.9)`,opacity:0}],{duration:200,easing:"cubic-bezier(.4,0,1,1)",fill:"forwards"}).finished.then(()=>s.remove(),()=>s.remove())}updated(t){var o;if((o=super.updated)==null||o.call(this,t),!this.lastDir)return;let i=this.lastDir;this.lastDir=0;let s=this.renderRoot.querySelector(".num:not(.ghost)");if(!s||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let n=ni();s.animate([{transform:`translateY(${40*i}%) scale(.9)`},{transform:"none"}],{duration:n.duration,easing:n.easing}),s.animate([{opacity:0},{opacity:1}],{duration:180,easing:"ease-out"})}fmt(t){return t===void 0?"--":this.step<1?t.toFixed(1):String(Math.round(t))}renderContent(){let t=this._config;if(!this.hass)return v;let i=this.stateObj;if(!i)return b`<div class="center warning ink">Entity not found: ${t.entity}</div>`;let s=this.current(),n=this.activeSide(),o=i.state==="off",a=Q(i),l=this.shown(),h=i.attributes.current_temperature,d=t.subtitle??kt(this.hass,t.entity)??i.attributes.friendly_name,c=i.attributes,p=!a&&l!==void 0,f=!p||l>=((n==="low"&&s.high!==void 0?s.high-this.step:c.max_temp)??1/0),u=!p||l<=((n==="high"&&s.low!==void 0?s.low+this.step:c.min_temp)??-1/0);return b`<div class="thermo">
      <div class="temp" aria-live="polite">
        <span class="num ink ${o||a?"dim":""}">${a?"--":s.mode==="none"?this.fmt(h):this.fmt(l)}</span>
        ${s.mode==="dual"?b`<div class="sides ink">
              <button class="side ${n==="low"?"sel":""}" @click=${()=>this._side="low"} aria-pressed=${String(n==="low")}>Heat ${this.fmt(s.low)}</button>
              <button class="side ${n==="high"?"sel":""}" @click=${()=>this._side="high"} aria-pressed=${String(n==="high")}>Cool ${this.fmt(s.high)}</button>
            </div>`:v}
      </div>
      <div class="bar">
        <button class="chev" aria-label="Lower setpoint" ?disabled=${u} @click=${()=>this.stepBy(-1)}>${$.chevronDown}</button>
        <div class="label ink">
          <div class="title">${t.name??"Thermostat"}</div>
          <div class="sub">${o?"Off":d}${typeof h=="number"?b` &bull; ${this.fmt(h)}&deg;`:v}</div>
        </div>
        <button class="chev" aria-label="Raise setpoint" ?disabled=${f} @click=${()=>this.stepBy(1)}>${$.chevronUp}</button>
      </div>
    </div>`}};tt.properties={...A.properties,_pending:{state:!0},_side:{state:!0}},tt.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"climate"}}}},{name:"name",selector:{text:{}}},{name:"subtitle",helper:"Defaults to the entity's area",selector:{text:{}}},{name:"step",helper:"Defaults to the entity's target temperature step",selector:{number:{min:.1,max:5,step:.1,mode:"box"}}}],tt.styles=[z,C`
      .thermo {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
      }
      .temp {
        position: relative;
        flex: 1;
        width: 100%;
        display: grid;
        place-items: center;
        overflow: hidden;
        padding-top: calc(var(--hv-ref) * 0.06);
      }
      .num {
        grid-area: 1 / 1;
        font-size: calc(var(--hv-ref) * 0.82);
        font-weight: 520;
        line-height: 1;
        letter-spacing: -0.035em;
        font-variant-numeric: tabular-nums;
        text-shadow: 0 2px 8px rgb(40 30 20 / 0.12);
        will-change: transform;
      }
      .num.dim {
        opacity: 0.55;
      }
      .sides {
        position: absolute;
        bottom: calc(var(--hv-ref) * 0.02);
        display: flex;
        gap: calc(var(--hv-ref) * 0.05);
      }
      .side {
        appearance: none;
        border: 0;
        cursor: pointer;
        border-radius: 999px;
        padding: calc(var(--hv-ref) * 0.025) calc(var(--hv-ref) * 0.07);
        min-height: 32px;
        background: rgb(255 255 255 / 0.12);
        font-size: calc(var(--hv-ref) * 0.075);
        font-weight: 600;
      }
      .side.sel {
        background: rgb(255 255 255 / 0.85);
        color: #2b241d;
        text-shadow: none;
      }
      .bar {
        width: 100%;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        padding: 0 calc(var(--hv-ref) * 0.1) calc(var(--hv-ref) * 0.14);
      }
      .label {
        text-align: center;
        min-width: 0;
      }
      .label .sub {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .chev {
        appearance: none;
        border: 0;
        background: none;
        cursor: pointer;
        width: calc(var(--hv-ref) * 0.3);
        height: calc(var(--hv-ref) * 0.3);
        min-width: 44px;
        min-height: 44px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        -webkit-tap-highlight-color: transparent;
        transition: background-color 0.2s, transform 0.35s var(--hv-spring);
      }
      .chev svg {
        width: calc(var(--hv-ref) * 0.2);
        height: calc(var(--hv-ref) * 0.2);
        filter: drop-shadow(var(--hv-shadow-text));
      }
      .chev:active {
        transform: scale(0.86);
        background: rgb(255 255 255 / 0.16);
      }
      .chev:disabled {
        opacity: 0.35;
        cursor: default;
      }
      .center {
        height: 100%;
        display: grid;
        place-items: center;
      }
    `];customElements.define("homeview-thermostat-card",tt);H("homeview-thermostat-card","HomeView Thermostat","Large liquid-glass thermostat with spring setpoint and heat/cool support.");var oi=["light","switch","fan","lock","cover","scene","script","input_boolean"],Gi=500,et=class extends A{constructor(){super(...arguments);this._confirming=!1;this._flash=!1;this.holdTimer=0;this.held=!1;this.confirmTimer=0;this.down=()=>{this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=window.setTimeout(()=>{this.held=!0,ut(this,"hass-more-info",{entityId:this._config.entity})},Gi)};this.up=()=>clearTimeout(this.holdTimer);this.cancel=()=>clearTimeout(this.holdTimer);this.onTap=()=>{if(this.held){this.held=!1;return}let t=this._config,i=t.tap_action??"toggle";if(i==="none"||!this.hass)return;if(i==="more-info"){ut(this,"hass-more-info",{entityId:t.entity});return}let s=this.hass.states[t.entity];if(!s)return;let n=Z(t.entity);if(n==="lock"&&s.state==="locked"&&t.confirm_unlock&&!this._confirming){this._confirming=!0,clearTimeout(this.confirmTimer),this.confirmTimer=window.setTimeout(()=>this._confirming=!1,3e3);return}this._confirming=!1;let o=Te(n,s.state);o&&(n==="scene"&&(this._flash=!0,setTimeout(()=>this._flash=!1,1200)),this.hass.callService(o[0],o[1],{},{entity_id:t.entity}))}}static getStubConfig(t){return{entity:Object.keys(t.states).find(s=>Z(s)==="light")??Object.keys(t.states).find(s=>oi.includes(Z(s)))??""}}validate(t){if(!t.entity)throw new Error("Pick an entity")}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}getCardSize(){return 3}cardClass(){var o;let t=this._config,i=(o=this.hass)==null?void 0:o.states[t.entity],s=Z(t.entity),n=i&&!Q(i)&&Yt(s,i.state);return`tile ${s} ${n||this._flash?"on":""} ${Q(i)?"unavailable":""} ${this._confirming?"confirming":""}`}renderContent(){let t=this._config;if(!this.hass)return v;let i=this.hass.states[t.entity],s=Z(t.entity),n=!!i&&!Q(i)&&Yt(s,i.state),o=t.name??(i?Ae(this.hass,t.entity):t.entity),a=t.subtitle??kt(this.hass,t.entity)??"";i?i.state==="unavailable"?a="Unavailable":this._confirming?a="Tap again to unlock":s==="lock"&&["locking","unlocking","jammed","opening","open"].includes(i.state)&&(a=i.state[0].toUpperCase()+i.state.slice(1)):a="Entity not found";let l=i?s==="lock"||s==="cover"?i.state:s==="scene"||s==="script"?"":n?"on":"off":"missing";return b`<button
      class="hit"
      aria-label="${[o,a,l].filter(Boolean).join(", ")}"
      aria-pressed=${s==="scene"||s==="script"?v:String(n)}
      ?disabled=${!i||i.state==="unavailable"}
      @pointerdown=${this.down}
      @pointerup=${this.up}
      @pointerleave=${this.cancel}
      @pointercancel=${this.cancel}
      @click=${this.onTap}
      @contextmenu=${h=>h.preventDefault()}
    >
      <span class="icon">${t.icon?b`<ha-icon .icon=${t.icon}></ha-icon>`:ri(s,i==null?void 0:i.attributes.device_class,n)}</span>
      <span class="label ink"><span class="title">${o}</span><br /><span class="sub">${a}</span></span>
    </button>`}};et.properties={...A.properties,_confirming:{state:!0},_flash:{state:!0}},et.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:oi}}}},{name:"name",selector:{text:{}}},{name:"subtitle",helper:"Defaults to the entity's area",selector:{text:{}}},{name:"icon",helper:"Optional mdi: icon; HomeView glyphs are used by default",selector:{icon:{}}},{name:"tap_action",label:"Tap action",selector:{select:{mode:"dropdown",options:[{value:"toggle",label:"Toggle / run"},{value:"more-info",label:"More info"},{value:"none",label:"Nothing"}]}}},{name:"confirm_unlock",label:"Confirm before unlocking (locks)",selector:{boolean:{}}}],et.styles=[z,C`
      .hit {
        appearance: none;
        border: 0;
        background: none;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: calc(var(--hv-ref) * 0.07);
        text-align: center;
        border-radius: inherit;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        user-select: none;
        -webkit-user-select: none;
      }
      .hit:disabled {
        cursor: default;
        opacity: 0.55;
      }
      ha-card.tile {
        transition: transform 0.45s var(--hv-spring), box-shadow 0.35s ease;
      }
      ha-card.tile:active {
        transform: scale(0.94);
        transition-duration: 0.12s;
      }
      .icon {
        width: calc(var(--hv-ref) * 0.31);
        height: calc(var(--hv-ref) * 0.31);
        display: grid;
        place-items: center;
        --mdc-icon-size: calc(var(--hv-ref) * 0.27);
      }
      .icon svg {
        width: 100%;
        height: 100%;
        display: block;
        filter: drop-shadow(var(--hv-shadow-text));
        transition: color 0.35s ease, filter 0.35s ease;
      }
      .label {
        padding: 0 6px;
        max-width: 100%;
        overflow: hidden;
      }
      .label .title,
      .label .sub {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        max-width: 100%;
      }
      /* active: warm-white glass, dark ink (Apple Home "on" convention) */
      ha-card.on {
        --hv-fill: rgb(255 255 255 / 0.8);
      }
      ha-card.on .label {
        text-shadow: none;
        color: #2b241d;
      }
      ha-card.on .label .sub {
        color: rgb(43 36 29 / 0.62);
      }
      ha-card.on .icon svg {
        filter: none;
      }
      ha-card.light.on {
        --hv-fill: rgb(255 246 226 / 0.82);
        box-shadow:
          0 0 calc(var(--hv-ref) * 0.25) rgb(255 196 90 / 0.55),
          0 calc(var(--hv-ref) * 0.03) calc(var(--hv-ref) * 0.09) rgb(60 45 30 / 0.14);
      }
      ha-card.light.on .icon {
        color: #f2a524;
      }
      ha-card.light.on .icon svg {
        filter: drop-shadow(0 0 calc(var(--hv-ref) * 0.05) rgb(255 190 70 / 0.9));
      }
      ha-card.lock.on {
        --hv-fill: rgb(255 240 225 / 0.8);
      }
      ha-card.lock.on .icon {
        color: #e8792b;
      }
      ha-card.confirming .icon {
        color: #ffb27a;
      }
      ha-card.confirming .sub {
        color: #fff;
        font-weight: 600;
      }
      ha-card.fan.on .icon {
        color: #2f9d8f;
      }
      ha-card.fan.on .blades {
        animation: spin 1.1s linear infinite;
        transform-origin: 12px 10px;
      }
      ha-card.cover.on .icon {
        color: #3478f6;
      }
      ha-card.scene.on .icon,
      ha-card.script.on .icon {
        color: #6e66d6;
      }
      ha-card.switch.on .icon,
      ha-card.input_boolean.on .icon {
        color: #f2a524;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `];customElements.define("homeview-tile-card",et);H("homeview-tile-card","HomeView Tile","Liquid-glass tile for lights, switches, fans, locks, covers, scenes and scripts.");var vt=class extends A{constructor(){super("circle");this.raf=0;this.timer=0;this.loop=()=>{if(this.raf=this.timer=0,!this.onScreen)return;this.draw();let t=this.mode();t==="sweep"?this.raf=requestAnimationFrame(this.loop):this.timer=window.setTimeout(this.loop,(t==="off"?6e4-new Date().getSeconds()*1e3:1e3)-new Date().getMilliseconds()+5)}}static getStubConfig(){return{seconds:"sweep"}}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}validate(t){if(t.time_zone)try{new Intl.DateTimeFormat("en",{timeZone:t.time_zone})}catch{throw new Error(`Unknown time zone: ${t.time_zone}`)}}cardClass(){return"clock"}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){var t;super.disconnectedCallback(),cancelAnimationFrame(this.raf),clearTimeout(this.timer),(t=this.fit)==null||t.disconnect(),this.fit=void 0}firstUpdated(t){super.firstUpdated(t),this.fit??(this.fit=new ResizeObserver(()=>this.fitFace())),this.fit.observe(this)}fitFace(){let t=this.renderRoot.querySelector("ha-card");if(!t)return;let i=this.clientWidth,s=this.clientHeight,n=this.square||!i||!s?0:Math.min(i,s);t.style.width=t.style.height=n?`${n}px`:"",t.style.margin=n?`${(s-n)/2}px auto 0`:""}resume(){!this.raf&&!this.timer&&this.loop()}mode(){var i;let t=((i=this._config)==null?void 0:i.seconds)??"sweep";return t==="sweep"&&matchMedia("(prefers-reduced-motion: reduce)").matches?"tick":t}draw(){var o,a;let t=this.renderRoot,i=t.querySelector("#hh");if(!i)return;let s=Xt((o=this._config)==null?void 0:o.time_zone),n=Pe(s.h,s.m,s.s+(this.mode()==="sweep"?s.ms/1e3:0));i.setAttribute("transform",`rotate(${n.h})`),t.querySelector("#mh").setAttribute("transform",`rotate(${n.m})`),(a=t.querySelector("#sh"))==null||a.setAttribute("transform",`rotate(${n.s})`)}renderContent(){var s;let t=Array.from({length:12},(n,o)=>_`<line class="tick" x1="0" x2="0" y1="-84" y2="-68" transform="rotate(${o*30})"/>`),i=Xt((s=this._config)==null?void 0:s.time_zone);return b`<svg class="face" viewBox="-100 -100 200 200" role="img" aria-label="Clock, ${String(i.h).padStart(2,"0")}:${String(i.m).padStart(2,"0")}">
      ${t}
      <line class="hand" id="hh" x1="0" y1="0" x2="0" y2="-42" stroke-width="7" />
      <line class="hand" id="mh" x1="0" y1="0" x2="0" y2="-66" stroke-width="5.5" />
      ${this.mode()==="off"?"":_`<line class="hand" id="sh" x1="0" y1="18" x2="0" y2="-80" stroke-width="1.8" />`}
      <circle r="4.2" fill="#fff" />
    </svg>`}updated(t){var i;(i=super.updated)==null||i.call(this,t),this.draw()}};vt.editorFields=[{name:"seconds",label:"Seconds hand",selector:{select:{mode:"dropdown",options:[{value:"sweep",label:"Smooth sweep"},{value:"tick",label:"Tick"},{value:"off",label:"Hidden"}]}}},{name:"time_zone",label:"Time zone",helper:"IANA name such as Europe/Paris; defaults to this device's time",selector:{text:{}}}],vt.styles=[z,C`
      ha-card.hv-glass.clock {
        border-radius: 50%;
        aspect-ratio: 1;
      }
      .face {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: visible;
      }
      .tick {
        stroke: #fff;
        stroke-width: 4.4;
        stroke-linecap: round;
      }
      .hand {
        stroke: #fff;
        stroke-linecap: round;
        filter: drop-shadow(0 1px 1.5px rgb(40 30 20 / 0.25));
      }
    `];customElements.define("homeview-clock-card",vt);H("homeview-clock-card","HomeView Clock","Analog clock on a round liquid-glass face.");function Et(r,e,t){let i,s,n=h=>{i||h.pointerType==="mouse"&&h.button!==0||(i={id:h.pointerId,x:h.clientX,y:h.clientY,t:h.timeStamp},s=void 0)},o=h=>{if(!i||h.pointerId!==i.id)return;let d=h.clientX-i.x,c=h.clientY-i.y;if(!s){if(Math.max(Math.abs(d),Math.abs(c))<8)return;if(s=Math.abs(d)>=Math.abs(c)?"x":"y",s==="y"&&!t){i=void 0;return}try{r.setPointerCapture(h.pointerId)}catch{}}e.move(d,c,s)},a=h=>{if(!i||h.pointerId!==i.id)return;let d=h.clientX-i.x,c=h.clientY-i.y,p=Ie(d,c,h.timeStamp-i.t);i=void 0;let f=!s||(s==="x"?p==="left"||p==="right":p==="up"||p==="down");e.end(f?p:null,d,c)},l=h=>{!i||h.pointerId!==i.id||(i=void 0,e.end(null,0,0))};return r.addEventListener("pointerdown",n),r.addEventListener("pointermove",o),r.addEventListener("pointerup",a),r.addEventListener("pointercancel",l),()=>{r.removeEventListener("pointerdown",n),r.removeEventListener("pointermove",o),r.removeEventListener("pointerup",a),r.removeEventListener("pointercancel",l)}}var Y=420,Ct=()=>({urls:["",""],front:0,drag:0,side:0,still:!1});function bt(r,e){return b`${r.urls.map((t,i)=>{if(!t)return v;let s=i===r.front,n=s?`${r.drag}px`:`calc(${r.side} * (100% + var(--hv-gap, 0px)) + ${r.drag}px)`,o=`${s?"front":r.side?"beside":""} ${r.still?"still":""}`;return b`<img class=${o} src=${t} alt="" draggable="false" style="object-fit:${e};transform:translateX(${n})" />`})}`}var Tt=C`
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    opacity: 0;
    transition:
      opacity 1.2s ease,
      transform ${Y}ms cubic-bezier(0.22, 1, 0.36, 1);
    -webkit-user-drag: none;
    user-select: none;
    -webkit-user-select: none;
  }
  img.front,
  img.beside {
    opacity: 1;
  }
  img.beside {
    transition: transform ${Y}ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  img.still {
    transition: none;
  }
`;var Ni=3e3,Bi=3*3600*1e3,te="homeviewSlideshow",yt=class extends O{constructor(){super(...arguments);this.state=Ct();this._pull=0;this._chrome=!0;this._closing=!1;this.closeTimer=0;this.chromeTimer=0;this.onPop=()=>{var t;(t=history.state)!=null&&t[te]||this.close(!0)};this.onKey=t=>{var i,s;if(t.key==="Escape")this.close();else if(t.key==="ArrowRight")(i=this.host)==null||i.step(1);else if(t.key==="ArrowLeft")(s=this.host)==null||s.step(-1);else return;t.preventDefault()};this.onVisible=()=>{document.visibilityState==="visible"&&!this._closing&&this.keepAwake()};this.noScroll=t=>t.preventDefault()}connectedCallback(){super.connectedCallback(),this.setAttribute("role","dialog"),this.setAttribute("aria-modal","true"),this.setAttribute("aria-label","Photo slideshow"),this.tabIndex=-1,history.pushState({...history.state??{},[te]:!0},""),window.addEventListener("popstate",this.onPop),window.addEventListener("keydown",this.onKey),document.addEventListener("visibilitychange",this.onVisible),this.addEventListener("touchmove",this.noScroll,{passive:!1}),this.closeTimer=window.setTimeout(()=>this.close(),Bi),this.showChrome(),this.keepAwake()}disconnectedCallback(){var t,i;super.disconnectedCallback(),(t=this.untrack)==null||t.call(this),this.untrack=void 0,window.removeEventListener("popstate",this.onPop),window.removeEventListener("keydown",this.onKey),document.removeEventListener("visibilitychange",this.onVisible),this.removeEventListener("touchmove",this.noScroll),clearTimeout(this.closeTimer),clearTimeout(this.chromeTimer),(i=this.wake)==null||i.release().catch(()=>{}),this.wake=void 0}firstUpdated(){this.untrack=Et(this,{move:(t,i,s)=>{var n;this.axis=s,s==="x"?(n=this.host)==null||n.dragTo(t):this._pull=i>0?i:i/4},end:t=>{var s;let i=this.axis;if(this.axis=void 0,t==="tap")return this.showChrome(!this._chrome);if(i==="x")return(s=this.host)==null?void 0:s.dragEnd(t);if(t==="down")return this.close();this._pull=0}},!0),this.focus()}close(t=!1){var i;this._closing||(this._closing=!0,!t&&((i=history.state)!=null&&i[te])&&history.back(),window.setTimeout(()=>{var s;this.remove(),(s=this.host)==null||s.slideshowClosed()},320))}async keepAwake(){var t;try{this.wake=await((t=navigator.wakeLock)==null?void 0:t.request("screen"))}catch{}}showChrome(t=!0){this._chrome=t,clearTimeout(this.chromeTimer),t&&(this.chromeTimer=window.setTimeout(()=>this._chrome=!1,Ni))}render(){let t=this._pull,i=t>0?Math.max(0,1-t/500):1,s=this.axis!=="y";return b`<div class="backdrop ${s?"settle":""}" style="opacity:${i}">${bt(this.state,"cover")}</div>
      <div class="stage ${s?"settle":""}" style="transform:translateY(${t}px) scale(${t>0?1-t/2500:1})">
        ${bt(this.state,"contain")}
      </div>
      ${this._chrome?b`<button class="close" aria-label="Close slideshow" @pointerdown=${n=>n.stopPropagation()} @click=${()=>this.close()}>${$.close}</button>`:v}`}updated(){this.toggleAttribute("closing",this._closing)}};yt.properties={state:{attribute:!1},_pull:{state:!0},_chrome:{state:!0},_closing:{state:!0}},yt.styles=[Tt,C`
      :host {
        position: fixed;
        inset: 0;
        z-index: 2147483000;
        display: block;
        overflow: hidden;
        --hv-gap: 28px;
        background: #000;
        touch-action: none;
        overscroll-behavior: contain;
        outline: none;
        cursor: default;
        animation: open 0.32s ease both;
        transition: opacity 0.32s ease;
      }
      :host([closing]) {
        opacity: 0;
      }
      @keyframes open {
        from {
          opacity: 0;
        }
      }
      .backdrop,
      .stage {
        position: absolute;
        inset: 0;
      }
      .settle {
        transition:
          transform ${Y}ms cubic-bezier(0.22, 1, 0.36, 1),
          opacity ${Y}ms ease;
      }
      .backdrop img {
        filter: blur(40px) saturate(1.3) brightness(0.55);
        scale: 1.15;
        will-change: transform;
      }
      .close {
        position: absolute;
        top: max(16px, env(safe-area-inset-top));
        right: max(16px, env(safe-area-inset-right));
        width: 44px;
        height: 44px;
        padding: 11px;
        border: 0;
        border-radius: 50%;
        color: #fff;
        background: rgb(255 255 255 / 0.16);
        backdrop-filter: blur(20px) saturate(1.6);
        -webkit-backdrop-filter: blur(20px) saturate(1.6);
        box-shadow:
          inset 0 0 0 0.5px rgb(255 255 255 / 0.4),
          0 4px 16px rgb(0 0 0 / 0.25);
        cursor: pointer;
        animation: open 0.25s ease both;
      }
      .close svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .close:focus-visible {
        outline: 2px solid rgb(255 255 255 / 0.9);
        outline-offset: 3px;
      }
      @media (prefers-reduced-motion: reduce) {
        :host,
        .close {
          animation: none;
        }
        .settle,
        img {
          transition-duration: 0.01ms !important;
        }
      }
    `];customElements.get("homeview-photo-slideshow")||customElements.define("homeview-photo-slideshow",yt);var qi=1800*1e3,ee=30*1e3,Wi=r=>Math.min(300*1e3,10*1e3*2**r),ji=3e3*1e3,it=class extends A{constructor(){super(...arguments);this._stage=Ct();this._error="";this.items=[];this.index=-1;this.timer=0;this.settleTimer=0;this.listedAt=0;this.fails=0;this.parked=!1;this.loadedFor="";this.listRun=0;this.listFails=0;this.shown=new $t;this.nav=0;this.dragging=!1;this.onKey=t=>{if(t.key==="Enter"||t.key===" ")this.openSlideshow();else if(t.key==="ArrowRight")this.step(1);else if(t.key==="ArrowLeft")this.step(-1);else return;t.preventDefault()}}static getStubConfig(){return{media:"media-source://media_source/local",interval:30,recursive:!0}}validate(t){let i=K(t.media);if(!i.length||i.some(s=>!s.startsWith("media-source://")))throw new Error("Set media to a media-source:// folder, or a list of them")}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}disconnectedCallback(){var t;super.disconnectedCallback(),clearTimeout(this.timer),this.loadedFor="",(t=this.slideshow)==null||t.close()}connectedCallback(){super.connectedCallback(),this.hass&&this._config&&this.requestUpdate()}firstUpdated(t){super.firstUpdated(t);let i=this.renderRoot.querySelector("ha-card");!i||this.untrack||(this.untrack=Et(i,{move:s=>this.dragTo(s),end:s=>s==="tap"?this.openSlideshow():this.dragEnd(s)},!1))}updated(t){var i;(i=super.updated)==null||i.call(this,t),this.slideshow&&(this.slideshow.state=this._stage),this.load()}load(){let t=this._config;if(!this.hass||!t||!this.onScreen)return!1;let i=JSON.stringify([K(t.media),!!t.recursive,!!t.shuffle]);return i===this.loadedFor?!1:(this.loadedFor=i,this.listFails=0,this.relist(!0),!0)}async relist(t){var o;let i=this._config,s=this.hass,n=++this.listRun;clearTimeout(this.timer);try{let a=await Re({callWS:l=>Mt(s.callWS(l),ee)},i.media,!!i.recursive);if(n!==this.listRun)return;this.items=i.shuffle?He(a):a,this.listedAt=Date.now(),this.listFails=0,this._error=a.length?"":"No pictures in this folder",t&&(this.index=-1,this.shown.clear(),this.ahead=void 0,this.advance())}catch(a){if(n!==this.listRun||!t)return;let l=a;if(this._error=`Cannot open ${K(i.media).join(", ")}: ${l.message??((o=l.error)==null?void 0:o.message)??a}`,!this.isConnected)return;this.timer=window.setTimeout(()=>{this.onScreen?this.relist(!0):this.loadedFor=""},Wi(this.listFails++))}}async advance(){if(clearTimeout(this.timer),!this._config||!this.items.length||!this.isConnected||(this.parked=!this.onScreen&&!this.slideshow,this.parked))return;let t=this.nav;Date.now()-this.listedAt>qi&&await this.relist(!1),t===this.nav&&await this.go(1,!1)}schedule(){clearTimeout(this.timer),!(!this._config||!this.isConnected)&&(this.timer=window.setTimeout(()=>void this.advance(),Math.max(5,this._config.interval??30)*1e3))}unseen(){var i;if(!this.items.length)return;let t=this.items[(this.index+1)%this.items.length];return((i=this.ahead)==null?void 0:i.id)===t?this.ahead:{id:t}}async fetch(t){if(!t.url||Date.now()-(t.at??0)>ji){t.ready=!1;let s=await Mt(this.hass.callWS({type:"media_source/resolve_media",media_content_id:t.id,expires:3600}),ee);t.url=s.url.startsWith("http")?s.url:this.hass.hassUrl(s.url),t.at=Date.now()}let i=new Image;return i.src=t.url,await Mt(i.decode(),ee),t.ready=!0,t.url}async prefetch(){let t=this.shown.peek(1)??(this.ahead=this.unseen());if(!(!t||t.ready))try{await this.fetch(t)}catch{}}async go(t,i){let s=++this.nav;for(clearTimeout(this.timer);;){let n=this.shown.peek(t),o=n??(t>0?this.unseen():void 0);if(!o)break;n||(this.index=(this.index+1)%this.items.length);try{let a=await this.fetch(o);if(s!==this.nav)return;n?this.shown.step(t):this.shown.push(o),o===this.ahead&&(this.ahead=void 0),this.fails=0,await this.show(a,i?t:0),this.prefetch();break}catch{if(s!==this.nav)return;if(o===this.ahead&&(this.ahead=void 0),n&&this.shown.drop(o),++this.fails>=Math.min(this.items.length,20))break}}this.settle(),this.schedule()}async show(t,i){clearTimeout(this.settleTimer);let s=this._stage,n=1-s.front,o=[...s.urls];if(o[n]=t,!i){this._stage={urls:o,front:n,drag:0,side:0,still:!1};return}(s.urls[n]!==t||s.side!==i)&&(this._stage={...s,urls:o,side:i,still:!0},await this.painted()),this._stage={urls:o,front:n,drag:0,side:-i,still:!1}}settle(){let t=this._stage;!t.drag&&!t.side||(clearTimeout(this.settleTimer),this._stage={...t,drag:0,still:!1},this.settleTimer=window.setTimeout(()=>this._stage={...this._stage,side:0,still:!0},Y+60))}async painted(){var t,i,s;await this.updateComplete,this.slideshow&&(this.slideshow.state=this._stage,await this.slideshow.updateComplete,(i=(t=this.slideshow.shadowRoot)==null?void 0:t.querySelector("img"))==null||i.getBoundingClientRect()),(s=this.renderRoot.querySelector("img"))==null||s.getBoundingClientRect()}dragTo(t){this.dragging||(this.dragging=!0,this.nav++,clearTimeout(this.timer),clearTimeout(this.settleTimer));let i=t<0?1:-1,s=this.shown.peek(i)??(i>0?this.ahead:void 0),n=s!=null&&s.ready?s.url:"",o=this._stage,a=[...o.urls];n&&(a[1-o.front]=n);let l=i<0?!this.shown.peek(-1):this.items.length<2;this._stage={...o,urls:a,drag:l?t/3:t,side:n?i:0,still:!0}}dragEnd(t){if(this.dragging){if(this.dragging=!1,t==="left"||t==="right"){this.go(t==="left"?1:-1,!0);return}this.settle(),this.schedule()}}step(t){this.items.length&&this.go(t,!0)}openSlideshow(){if(this.slideshow||!this._stage.urls[this._stage.front]||Ye(this))return;let t=document.createElement("homeview-photo-slideshow");t.host=this,t.state=this._stage,this.slideshow=t,document.body.appendChild(t)}slideshowClosed(){var t;this.slideshow=void 0,this.isConnected&&((t=this.renderRoot.querySelector("ha-card"))==null||t.focus({preventScroll:!0}))}resume(){!this.load()&&this.parked&&this.advance()}render(){if(!this._config)return b``;let t=this._config.fit??"cover",i=!!this._stage.urls[this._stage.front];return b`<ha-card
      class="photo ${this.square?"square":""} ${i?"shown":""}"
      role=${i?"button":v}
      tabindex=${i?"0":v}
      aria-label=${i?"Photo frame: open the full-screen slideshow":v}
      @keydown=${this.onKey}
    >
      ${bt(this._stage,t)} ${this._error?b`<div class="msg">${this._error}</div>`:v}
    </ha-card>`}renderContent(){return v}};it.properties={...A.properties,_stage:{state:!0},_error:{state:!0}},it.editorFields=[{name:"media",label:"Media folders",required:!0,list:!0,helper:"One or more media-source folders, e.g. media-source://media_source/local/photos; the slideshow cycles through all of them. Open Media in the sidebar to find a folder; DLNA, Synology Photos and other media servers HA can browse work too.",selector:{text:{multiple:!0}}},{name:"interval",label:"Seconds per picture",selector:{number:{min:5,max:3600,step:1,mode:"box",unit_of_measurement:"s"}}},{name:"shuffle",selector:{boolean:{}}},{name:"recursive",label:"Include subfolders",selector:{boolean:{}}},{name:"fit",selector:{select:{mode:"dropdown",options:[{value:"cover",label:"Fill"},{value:"contain",label:"Fit whole picture"}]}}}],it.styles=[z,Tt,C`
      ha-card.photo {
        position: relative;
        height: 100%;
        overflow: hidden;
        border: none;
        border-radius: var(--hv-radius, 24px);
        background: rgb(0 0 0 / 0.25);
        box-shadow: 0 calc(var(--hv-ref, 200px) * 0.03) calc(var(--hv-ref, 200px) * 0.09) rgb(40 30 20 / 0.18);
        --hv-gap: 12px;
        /* horizontal drags are ours (swipe), vertical ones still scroll the page */
        touch-action: pan-y;
        user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
      }
      ha-card.photo.shown {
        cursor: pointer;
      }
      ha-card.photo.square {
        aspect-ratio: 1;
        height: auto;
      }
      ha-card.photo::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        box-shadow: inset 0 0 0 0.5px rgb(255 255 255 / 0.35);
        pointer-events: none;
      }
      .msg {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        padding: 12%;
        text-align: center;
        overflow-wrap: anywhere;
        color: #fff;
        font-family: var(--hv-font);
        font-size: calc(var(--hv-ref, 200px) * 0.075);
        text-shadow: var(--hv-shadow-text);
      }
    `];customElements.define("homeview-photo-card",it);H("homeview-photo-card","HomeView Photo Frame","Slideshow of pictures from a Home Assistant media source.");var Pt=class{constructor(e,t=16e3){this.acc=0;this.n=0;this.pos=0;this.ratio=e/t}push(e){if(this.ratio<=1)return e.slice();let t=[];for(let i=0;i<e.length;i++)this.acc+=e[i],this.n++,this.pos+=1,this.pos>=this.ratio&&(t.push(this.acc/this.n),this.acc=0,this.n=0,this.pos-=this.ratio);return Float32Array.from(t)}},Rt=class{constructor(e=1.2,t=7,i=15){this.heard=!1;this.floor=.01;this.sum=0;this.n=0;this.run=0;this.quiet=0;this.frames=0;this.silence=e,this.noSpeech=t,this.max=i}push(e){for(let i of e)this.sum+=i*i,!(++this.n<320)&&(this.frame(Math.sqrt(this.sum/this.n)),this.sum=0,this.n=0);let t=this.frames/50;return this.heard?this.quiet>=this.silence-1e-9||t>=this.max?"end":"listen":t>=Math.min(this.noSpeech,this.max)?"none":"listen"}frame(e){if(this.frames++,e>Math.max(this.floor*3,.006)){this.run+=.02,this.run>=.1&&(this.heard=!0,this.quiet=0);return}this.run=0,this.floor=e<this.floor?e:this.floor+(e-this.floor)*(.02/2),this.heard&&(this.quiet+=.02)}};function ai(r){let e=new Int16Array(r.length);for(let t=0;t<r.length;t++){let i=Math.max(-1,Math.min(1,r[t]));e[t]=i<0?i*32768:i*32767}return e}function Lt(r,e){let t=e?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(0),i=new Uint8Array(1+t.length);return i[0]=r,i.set(t,1),i}var li=`
class HomeViewRecorder extends AudioWorkletProcessor {
  constructor() { super(); this.buf = []; this.len = 0; }
  process(inputs) {
    const ch = inputs[0] && inputs[0][0];
    if (ch) {
      this.buf.push(ch.slice(0)); this.len += ch.length;
      if (this.len >= 2048) {
        const out = new Float32Array(this.len); let o = 0;
        for (const b of this.buf) { out.set(b, o); o += b.length; }
        this.port.postMessage(out, [out.buffer]); this.buf = []; this.len = 0;
      }
    }
    return true;
  }
}
// added once per tap to the card's one AudioContext: the name is already taken from the second tap on
try { registerProcessor("homeview-recorder", HomeViewRecorder); } catch {}
`;async function ci(r,e,t){let i,s=()=>i==null?void 0:i.getTracks().forEach(o=>o.stop()),n=()=>{if(e.aborted)throw new DOMException("Aborted","AbortError")};try{i=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}),n(),await r.resume(),n();let o=!1,a=f=>{o||t(f)},l,h=()=>{};if(r.audioWorklet){let f=URL.createObjectURL(new Blob([li],{type:"text/javascript"}));try{await r.audioWorklet.addModule(f)}finally{URL.revokeObjectURL(f)}n();let u=new AudioWorkletNode(r,"homeview-recorder");u.port.onmessage=x=>a(x.data),h=()=>u.port.onmessage=null,l=u}else{let f=r.createScriptProcessor(4096,1,1);f.onaudioprocess=u=>a(u.inputBuffer.getChannelData(0)),h=()=>f.onaudioprocess=null,f.connect(r.destination),l=f}let d=r.createMediaStreamSource(i),c=r.createAnalyser();c.fftSize=256,c.smoothingTimeConstant=.6,d.connect(c),d.connect(l);let p=l;return{analyser:c,close(){o||(o=!0,h(),p.disconnect(),d.disconnect(),s())}}}catch(o){throw s(),o}}var Vi=16e3,Ki=30,Yi=6,ie={idle:"Tap to talk",listening:"Listening",thinking:"Thinking",responding:"Responding",error:"Something went wrong"},st=class extends A{constructor(){super(...arguments);this._phase="idle";this._heard="";this._reply="";this._error="";this._detail="";this._showDetail=!1;this.lastText="";this._typing=!1;this.handlerId=null;this.pending=[];this.audioDone=!1;this.runId=0;this.speaking=!1;this.stopTimer=0;this.raf=0;this.levels=new Float32Array(48);this.t0=performance.now();this.loop=()=>{this.raf=this.draw()?requestAnimationFrame(this.loop):0};this.showDetail=t=>{t.preventDefault(),this._showDetail=!0};this.submit=t=>{t.preventDefault();let i=t.target.elements.namedItem("q");this.ask(i.value),i.value=""}}static getStubConfig(){return{speak:!0}}getGridOptions(){return{columns:12,rows:"auto",min_columns:6,min_rows:3}}getCardSize(){return 5}get square(){return!1}refFrom(t,i){return Math.min(t,i,220)}cardClass(){var i,s;return`voice ${typeof((s=(i=this._config)==null?void 0:i.grid_options)==null?void 0:s.rows)!="number"?"wide":""} ${this.phase()}`}phase(){var i,s,n;let t=(i=this._config)==null?void 0:i.satellite;return t?De((n=(s=this.hass)==null?void 0:s.states[t])==null?void 0:n.state):this._phase}micBlocked(){var t;return window.isSecureContext?(t=navigator.mediaDevices)!=null&&t.getUserMedia?null:"unsupported":"insecure"}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){var t;super.disconnectedCallback(),cancelAnimationFrame(this.raf),this.teardown(),this.speaking=!1,this._phase!=="error"&&(this._phase="idle"),this.stopAudio(),(t=this.ctx)==null||t.close(),this.ctx=void 0,this.analyser=void 0}stopAudio(){let t=this.audio;t&&(t.pause(),t.removeAttribute("src"),t.load())}async talk(){var s;if(this._phase==="listening")return this.endAudio();if(this._phase==="thinking"||this._phase==="responding")return;if(this.micBlocked()){this._typing=!0;return}let t=this.ctx??(this.ctx=new AudioContext);this.teardown(),this.reset(),this.lastText="",this.endpointer=new Rt,this.resampler=new Pt(t.sampleRate);let i=this.abort=new AbortController;this._phase="listening",this.analyser=void 0;try{let n=await ci(t,i.signal,o=>this.onAudio(o));if(i.signal.aborted)return n.close();this.mic=n,this.analyser=n.analyser,this.stopTimer=window.setTimeout(()=>this.endAudio(),Vi),await this.run({start_stage:"stt",end_stage:((s=this._config)==null?void 0:s.speak)===!1?"intent":"tts",input:{sample_rate:16e3,no_vad:!0}})}catch(n){i.signal.aborted||this.fail(n)}}retry(){this.lastText?this.ask(this.lastText):this.talk()}async ask(t){var i;if(t.trim()){this.teardown(),this.reset(),this.lastText=t,this._heard=t,this._phase="thinking";try{await this.run({start_stage:"intent",end_stage:((i=this._config)==null?void 0:i.speak)===!1?"intent":"tts",input:{text:t}})}catch(s){this.fail(s)}}}async run(t){let i=this._config,s=++this.runId,n=await this.hass.connection.subscribeMessage(o=>s===this.runId&&this.onEvent(o),{type:"assist_pipeline/run",...t,...i.pipeline?{pipeline:i.pipeline}:{},...this.conversationId?{conversation_id:this.conversationId}:{}});s===this.runId?this.unsub=n:await n().catch(()=>{})}onEvent(t){var n,o,a,l,h,d,c,p,f;let i=t.data??{};if(t.type==="run-start"){this.handlerId=((n=i.runner_data)==null?void 0:n.stt_binary_handler_id)??null;for(let u of this.pending)this.sendPcm(u);this.pending=[],this.audioDone&&this.handlerId!==null&&((a=(o=this.hass)==null?void 0:o.connection.socket)==null||a.send(Lt(this.handlerId))),this.audioDone=!1}if((t.type==="stt-vad-end"||t.type==="stt-end")&&this.endAudio(),t.type==="stt-end"&&(this._heard=((l=i.stt_output)==null?void 0:l.text)??""),t.type==="intent-end"){let u=i.intent_output;this.conversationId=(u==null?void 0:u.conversation_id)??this.conversationId,this._reply=((c=(d=(h=u==null?void 0:u.response)==null?void 0:h.speech)==null?void 0:d.plain)==null?void 0:c.speech)??""}t.type==="tts-end"&&((p=i.tts_output)!=null&&p.url)&&this.play(i.tts_output.url),t.type==="error"&&this.fail(i);let s=ze(this._phase,t);if(t.type==="run-end"){(f=this.unsub)==null||f.call(this),this.unsub=void 0,this.speaking||(this._phase=this._phase==="error"?"error":"idle");return}this._phase=s}onAudio(t){var o;if(this._phase!=="listening"||!this.resampler)return;let i=this.resampler.push(t),s=ai(i);this.handlerId===null?this.pending.push(s):this.sendPcm(s);let n=(o=this.endpointer)==null?void 0:o.push(i);n==="end"?this.endAudio():n==="none"&&this.noSpeech()}noSpeech(){this.fail({code:"stt-no-text-recognized",message:"No speech was detected"})}sendPcm(t){var i,s;this.handlerId!==null&&((s=(i=this.hass)==null?void 0:i.connection.socket)==null||s.send(Lt(this.handlerId,t)))}endAudio(){var t,i;if(clearTimeout(this.stopTimer),!this.mic&&this._phase==="listening"){this._phase="idle",this.teardown();return}this.mic&&(this.handlerId!==null?(i=(t=this.hass)==null?void 0:t.connection.socket)==null||i.send(Lt(this.handlerId)):this.audioDone=!0),this._phase==="listening"&&(this._phase="thinking"),this.stopMic()}stopMic(){var t;(t=this.mic)==null||t.close(),this.mic=void 0,this.handlerId=null}play(t){var d;let i=t.startsWith("http")?t:this.hass.hassUrl(t);(d=this.audio)==null||d.pause();let s=new Audio(i);this.audio=s;try{this.ctx??(this.ctx=new AudioContext);let c=this.ctx.createMediaElementSource(s);this.analyser??(this.analyser=this.ctx.createAnalyser()),this.analyser.fftSize=256,c.connect(this.analyser),this.analyser.connect(this.ctx.destination),this.ctx.resume()}catch{}this._phase="responding",this.speaking=!0;let n=!1,o=0,a=0;s.onplaying=()=>{n=!0,a=0};let l=window.setInterval(()=>{this.audio!==s||!this.speaking?h():s.currentTime!==o?(o=s.currentTime,a=0):++a>=(n?Yi:Ki)&&h(!0)},1e3),h=(c=!1)=>{if(clearInterval(l),!(this.audio!==s||!this.speaking)){if(this.speaking=!1,!c){this._phase="idle";return}this.stopAudio(),this.fail({code:"tts-failed",message:"The spoken reply stopped before it finished"})}};s.onended=()=>h(),s.onerror=()=>h(),s.play().catch(()=>h())}fail(t){let{text:i,detail:s}=Fe(t);console.warn("HomeView voice:",s),this._error=i,this._detail=s,this._phase="error",this.teardown()}reset(){var t;this._heard="",this._reply="",this._error="",this._detail="",this._showDetail=!1,this.pending=[],this.audioDone=!1,this.handlerId=null,this.speaking=!1,(t=this.audio)==null||t.pause()}async teardown(){var i;this.runId++,(i=this.abort)==null||i.abort(),this.abort=void 0,clearTimeout(this.stopTimer),this.stopMic();let t=this.unsub;this.unsub=void 0,await(t==null?void 0:t().catch(()=>{}))}draw(){var w,m;let t=(w=this.renderRoot)==null?void 0:w.querySelector("canvas.viz");if(!t)return!0;let i=Math.min(window.devicePixelRatio||1,2),s=t.clientWidth,n=t.clientHeight;if(!s||!n)return!1;(t.width!==Math.round(s*i)||t.height!==Math.round(n*i))&&(t.width=Math.round(s*i),t.height=Math.round(n*i));let o=t.getContext("2d");o.setTransform(i,0,0,i,0,0),o.clearRect(0,0,s,n);let a=this.phase(),l=(performance.now()-this.t0)/1e3,h=this.levels.length,d=a!=="idle"&&a!=="error",c=matchMedia("(prefers-reduced-motion: reduce)").matches,p=this.analyser?new Uint8Array(this.analyser.frequencyBinCount):null,f=!!p&&(a==="listening"||a==="responding")&&!((m=this._config)!=null&&m.satellite);f&&this.analyser.getByteFrequencyData(p);for(let g=0;g<h;g++){let y=0;if(f)y=(p[Math.min(p.length-1,2+Math.floor(Math.abs(g-h/2)/(h/2)*40))]/255)**1.4;else if(a==="listening"||a==="responding")y=.25+.2*Math.sin(l*5+g*.6)*Math.sin(l*1.7+g*.21);else if(a==="thinking"){let k=g/h*Math.PI*2;y=.12+.3*Math.max(0,Math.cos(k-l*3))**6}else y=.06;c&&(y=Math.min(y,.15)),Math.abs(y-this.levels[g])>.002&&(d=!0),this.levels[g]+=(y-this.levels[g])*.25}let u=s/2,x=n/2,M=Math.min(s,n)*.34,P=o.createRadialGradient(u,x,M*.1,u,x,M*1.25),T=a==="error"?"255 120 110":a==="listening"?"255 255 255":"255 236 210";P.addColorStop(0,`rgb(${T} / ${a==="idle"?.22:.42})`),P.addColorStop(1,`rgb(${T} / 0)`),o.fillStyle=P,o.beginPath(),o.arc(u,x,M*1.25,0,Math.PI*2),o.fill(),o.strokeStyle="rgb(255 255 255 / 0.95)",o.lineCap="round",o.lineWidth=Math.max(2,M*.06),o.shadowColor="rgb(40 30 20 / 0.25)",o.shadowBlur=4;for(let g=0;g<h;g++){let y=g/h*Math.PI*2-Math.PI/2,k=M*(.08+this.levels[g]*.9),S=M*.78;o.beginPath(),o.moveTo(u+Math.cos(y)*S,x+Math.sin(y)*S),o.lineTo(u+Math.cos(y)*(S+k),x+Math.sin(y)*(S+k)),o.stroke()}return d}renderContent(){var c;let t=this._config,i=this.phase(),s=!t.satellite&&this.micBlocked(),n=t.satellite?(c=this.hass)==null?void 0:c.states[t.satellite]:void 0,o=t.satellite?n?`${n.attributes.friendly_name??t.satellite}: ${i==="idle"?"Ready":ie[i]}`:`Satellite not found: ${t.satellite}`:i==="error"?this._error||ie.error:i==="idle"&&s?"Type a request":ie[i],a=i==="error"&&!t.satellite,[l,h]=i==="listening"?["Stop listening",$.stop]:a?["Try again",$.retry]:["Talk to Assist",$.mic],d=a&&this._showDetail;return b`<div class="voice-wrap ${d?"covered":""}">
      <div class="head ink">
        <span class="title">${t.name??"Assist"}</span>
        ${a?b`<span class="sub status" aria-live="polite" role="button" tabindex="0" title=${this._detail} @click=${this.showDetail} @keydown=${p=>(p.key==="Enter"||p.key===" ")&&this.showDetail(p)}>${o}</span>`:b`<span class="sub status" aria-live="polite">${o}</span>`}
      </div>
      <button class="orb" ?disabled=${!!t.satellite} aria-label=${l} @click=${()=>void(a?this.retry():this.talk())}>
        <canvas class="viz" aria-hidden="true"></canvas>
        <span class="mic">${h}</span>
      </button>
      <div class="lines ink" aria-live="polite">
        ${this._heard?b`<div class="heard">&ldquo;${this._heard}&rdquo;</div>`:v}
        ${this._reply?b`<div class="reply">${this._reply}</div>`:v}
        ${a&&this._detail?b`<button class="more" @click=${this.showDetail}><span>Details</span></button>`:v}
        ${s==="insecure"&&!this._heard&&!this._reply&&!a?b`<div class="notice">The microphone needs Home Assistant over HTTPS. Type instead, or see the README for options.</div>`:v}
      </div>
      ${t.satellite?v:this._typing||s?b`<form class="type" @submit=${this.submit}>
              <input name="q" type="text" placeholder="Ask Assist" autocomplete="off" aria-label="Request" />
              <button class="send" aria-label="Send">${$.send}</button>
            </form>`:b`<button class="kbd" aria-label="Type a request" @click=${()=>this._typing=!0}>${$.keyboard}</button>`}
      ${d?b`<div class="sheet ink" role="dialog" aria-label="Error details">
            <div class="sheet-head">
              <span class="title">${this._error}</span>
              <button class="more" @click=${()=>this._showDetail=!1}><span>Done</span></button>
            </div>
            <div class="detail">${this._detail}</div>
          </div>`:v}
    </div>`}resume(){!this.raf&&this.isConnected&&this.loop()}updated(t){var i,s;(i=super.updated)==null||i.call(this,t),t.has("_typing")&&this._typing&&((s=this.renderRoot.querySelector("input[name=q]"))==null||s.focus()),!this.raf&&this.isConnected&&this.loop()}};st.properties={...A.properties,_phase:{state:!0},_heard:{state:!0},_reply:{state:!0},_error:{state:!0},_detail:{state:!0},_showDetail:{state:!0},_typing:{state:!0}},st.editorFields=[{name:"name",selector:{text:{}}},{name:"pipeline",label:"Assist pipeline",helper:"Defaults to the preferred pipeline",selector:{assist_pipeline:{}}},{name:"satellite",label:"Voice satellite (optional)",helper:"Show this assist_satellite's state instead of using this device's microphone",selector:{entity:{filter:{domain:"assist_satellite"}}}},{name:"speak",label:"Play spoken replies",selector:{boolean:{}}}],st.styles=[z,C`
      ha-card.voice.wide {
        aspect-ratio: 1.6;
        height: auto;
      }
      .voice-wrap {
        height: 100%;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto minmax(0, 1fr) auto auto;
        justify-items: center;
        padding: calc(var(--hv-ref) * 0.07) calc(var(--hv-ref) * 0.08);
        gap: calc(var(--hv-ref) * 0.03);
      }
      /* wide card: orb on the left, conversation on the right */
      ha-card[data-wide] .voice-wrap {
        grid-template-columns: minmax(0, 36%) minmax(0, 1fr) 44px;
        grid-template-rows: auto minmax(0, 1fr) auto;
        grid-template-areas: "orb head kbd" "orb lines lines" "orb type type";
        justify-items: start;
        align-items: center;
        column-gap: calc(var(--hv-ref) * 0.06);
      }
      ha-card[data-wide] .head {
        grid-area: head;
        text-align: left;
        align-self: end;
      }
      ha-card[data-wide] .orb {
        grid-area: orb;
        width: 100%;
        height: 100%;
        min-height: 0;
      }
      ha-card[data-wide] .lines {
        grid-area: lines;
        text-align: left;
        align-self: stretch;
        align-items: start;
        justify-self: stretch;
      }
      ha-card[data-wide] .kbd {
        grid-area: kbd;
        align-self: start;
      }
      ha-card[data-wide] .type {
        grid-area: type;
        justify-self: stretch;
        width: auto;
      }
      .head {
        text-align: center;
        display: flex;
        flex-direction: column;
        min-width: 0;
        max-width: 100%;
      }
      /* never more than two lines, whatever Home Assistant reports */
      .status {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        overflow-wrap: anywhere;
      }
      .orb {
        appearance: none;
        border: 0;
        background: none;
        padding: 0;
        cursor: pointer;
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 0;
        display: grid;
        place-items: center;
        container-type: size;
        -webkit-tap-highlight-color: transparent;
        transition: transform 0.45s var(--hv-spring);
      }
      .orb:active {
        transform: scale(0.95);
        transition-duration: 0.12s;
      }
      .orb:disabled {
        cursor: default;
      }
      canvas.viz {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      /* stays inside the ring (drawn from 0.26 of the orb's short side) when the orb is squeezed */
      .mic {
        position: relative;
        width: calc(var(--hv-ref) * 0.2);
        height: calc(var(--hv-ref) * 0.2);
        width: min(calc(var(--hv-ref) * 0.2), 38cqmin);
        height: min(calc(var(--hv-ref) * 0.2), 38cqmin);
        filter: drop-shadow(var(--hv-shadow-text));
      }
      .mic svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .lines {
        text-align: center;
        max-width: 100%;
        min-height: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        font-size: calc(var(--hv-ref) * 0.082);
        line-height: 1.35;
        min-height: 1.35em;
      }
      .heard {
        color: var(--hv-ink-2);
      }
      .reply {
        font-weight: 600;
      }
      .heard,
      .reply,
      .notice {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        overflow-wrap: anywhere;
        flex: none;
      }
      .notice {
        -webkit-line-clamp: 3;
      }
      [role="button"] {
        cursor: pointer;
      }
      /* a failed run keeps what was heard and answered to one line each, beside "Details" */
      ha-card.error .heard,
      ha-card.error .reply {
        -webkit-line-clamp: 1;
      }
      /* a short cell keeps the answer (when only speaking failed) and the way to the details */
      ha-card.error[data-short] .heard {
        display: none;
      }
      /* a short, narrow cell only has room for the status, the orb and the keyboard */
      ha-card[data-short]:not([data-wide]) .lines {
        display: none;
      }
      ha-card[data-short]:not([data-wide]) .status {
        -webkit-line-clamp: 1;
      }
      .voice-wrap.covered > :not(.sheet) {
        visibility: hidden;
      }
      /* the full error, over the card's own content */
      .sheet {
        position: absolute;
        inset: 0;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: calc(var(--hv-ref) * 0.03);
        padding: calc(var(--hv-ref) * 0.07) calc(var(--hv-ref) * 0.08);
      }
      .sheet-head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
      }
      .sheet-head .title {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .detail {
        min-height: 0;
        overflow-y: auto;
        overflow-wrap: anywhere;
        font-size: calc(var(--hv-ref) * 0.07);
        line-height: 1.35;
        color: var(--hv-ink-2);
        user-select: text;
        -webkit-user-select: text;
      }
      .more {
        appearance: none;
        border: 0;
        background: none;
        padding: 0;
        line-height: 1.25;
        flex: none;
        cursor: pointer;
        color: var(--hv-ink-2);
        font-size: calc(var(--hv-ref) * 0.07);
      }
      /* on the label, not the button: WebKit does not underline button text */
      .more span {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .notice {
        color: var(--hv-ink-2);
        font-size: calc(var(--hv-ref) * 0.07);
      }
      .kbd,
      .send {
        appearance: none;
        border: 0;
        background: rgb(255 255 255 / 0.14);
        border-radius: 999px;
        width: 44px;
        height: 44px;
        display: grid;
        place-items: center;
        cursor: pointer;
      }
      .kbd svg,
      .send svg {
        width: 22px;
        height: 22px;
      }
      .type {
        display: flex;
        gap: 8px;
        width: 100%;
      }
      .type input {
        flex: 1;
        min-width: 0;
        min-height: 44px;
        border: 0;
        border-radius: 999px;
        padding: 0 16px;
        font: inherit;
        font-size: 16px;
        color: #2b241d;
        background: rgb(255 255 255 / 0.85);
      }
    `];customElements.define("homeview-voice-card",st);H("homeview-voice-card","HomeView Voice","Talk to Home Assistant Assist with an audio-reactive liquid-glass visualizer.");customElements.get("homeview-card-editor")||customElements.define("homeview-card-editor",ft);console.info("%c HOMEVIEW %c 0.1.4 ","background:#928980;color:#fff;border-radius:3px 0 0 3px","background:#2b241d;color:#fff;border-radius:0 3px 3px 0");
