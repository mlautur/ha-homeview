var we=globalThis,xe=we.ShadowRoot&&(we.ShadyCSS===void 0||we.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Oe=Symbol(),lt=new WeakMap,ne=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(xe&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=lt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&lt.set(e,t))}return t}toString(){return this.cssText}},ct=r=>new ne(typeof r=="string"?r:r+"",void 0,Oe),C=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((i,s,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1],r[0]);return new ne(e,r,Oe)},ht=(r,t)=>{if(xe)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=we.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}},Ie=xe?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return ct(e)})(r):r;var{is:di,defineProperty:ui,getOwnPropertyDescriptor:pi,getOwnPropertyNames:fi,getOwnPropertySymbols:mi,getPrototypeOf:gi}=Object,G=globalThis,dt=G.trustedTypes,vi=dt?dt.emptyScript:"",He=G.reactiveElementPolyfillSupport,oe=(r,t)=>r,ze={toAttribute(r,t){switch(t){case Boolean:r=r?vi:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},pt=(r,t)=>!di(r,t),ut={attribute:!0,type:String,converter:ze,reflect:!1,useDefault:!1,hasChanged:pt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),G.litPropertyMetadata??(G.litPropertyMetadata=new WeakMap);var D=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ut){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&ui(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:n}=pi(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let a=s==null?void 0:s.call(this);n==null||n.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ut}static _$Ei(){if(this.hasOwnProperty(oe("elementProperties")))return;let t=gi(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(oe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(oe("properties"))){let e=this.properties,i=[...fi(e),...mi(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(Ie(s))}else t!==void 0&&e.push(Ie(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ht(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var n;let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let o=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:ze).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){var n,o;let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let a=i.getPropertyOptions(s),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:ze;this._$Em=s;let h=l.fromAttribute(e,a.type);this[s]=h??((o=this._$Ej)==null?void 0:o.get(s))??h,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){var o;if(t!==void 0){let a=this.constructor;if(s===!1&&(n=this[t]),i??(i=a.getPropertyOptions(t)),!((i.hasChanged??pt)(n,e)||i.useDefault&&i.reflect&&n===((o=this._$Ej)==null?void 0:o.get(t))&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[n,o]of s){let{wrapped:a}=o,l=this[n];a!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,o,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[oe("elementProperties")]=new Map,D[oe("finalized")]=new Map,He==null||He({ReactiveElement:D}),(G.reactiveElementVersions??(G.reactiveElementVersions=[])).push("2.1.2");var le=globalThis,ft=r=>r,_e=le.trustedTypes,mt=_e?_e.createPolicy("lit-html",{createHTML:r=>r}):void 0,xt="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,_t="?"+N,bi=`<${_t}>`,W=document,ce=()=>W.createComment(""),he=r=>r===null||typeof r!="object"&&typeof r!="function",We=Array.isArray,yi=r=>We(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Fe=`[ 	
\f\r]`,ae=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gt=/-->/g,vt=/>/g,B=RegExp(`>|${Fe}(?:([^\\s"'>=/]+)(${Fe}*=${Fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bt=/'/g,yt=/"/g,kt=/^(?:script|style|textarea|title)$/i,je=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),b=je(1),_=je(2),Qi=je(3),j=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),wt=new WeakMap,q=W.createTreeWalker(W,129);function $t(r,t){if(!We(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return mt!==void 0?mt.createHTML(t):t}var wi=(r,t)=>{let e=r.length-1,i=[],s,n=t===2?"<svg>":t===3?"<math>":"",o=ae;for(let a=0;a<e;a++){let l=r[a],h,d,c=-1,u=0;for(;u<l.length&&(o.lastIndex=u,d=o.exec(l),d!==null);)u=o.lastIndex,o===ae?d[1]==="!--"?o=gt:d[1]!==void 0?o=vt:d[2]!==void 0?(kt.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=B):d[3]!==void 0&&(o=B):o===B?d[0]===">"?(o=s??ae,c=-1):d[1]===void 0?c=-2:(c=o.lastIndex-d[2].length,h=d[1],o=d[3]===void 0?B:d[3]==='"'?yt:bt):o===yt||o===bt?o=B:o===gt||o===vt?o=ae:(o=B,s=void 0);let f=o===B&&r[a+1].startsWith("/>")?" ":"";n+=o===ae?l+bi:c>=0?(i.push(h),l.slice(0,c)+xt+l.slice(c)+N+f):l+N+(c===-2?a:f)}return[$t(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},de=class r{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0,a=t.length-1,l=this.parts,[h,d]=wi(t,e);if(this.el=r.createElement(h,i),q.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=q.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(xt)){let u=d[o++],f=s.getAttribute(c).split(N),p=/([.?@])?(.*)/.exec(u);l.push({type:1,index:n,name:p[2],strings:f,ctor:p[1]==="."?Ge:p[1]==="?"?Ne:p[1]==="@"?Be:J}),s.removeAttribute(c)}else c.startsWith(N)&&(l.push({type:6,index:n}),s.removeAttribute(c));if(kt.test(s.tagName)){let c=s.textContent.split(N),u=c.length-1;if(u>0){s.textContent=_e?_e.emptyScript:"";for(let f=0;f<u;f++)s.append(c[f],ce()),q.nextNode(),l.push({type:2,index:++n});s.append(c[u],ce())}}}else if(s.nodeType===8)if(s.data===_t)l.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf(N,c+1))!==-1;)l.push({type:7,index:n}),c+=N.length-1}n++}}static createElement(t,e){let i=W.createElement("template");return i.innerHTML=t,i}};function X(r,t,e=r,i){var o,a;if(t===j)return t;let s=i!==void 0?(o=e._$Co)==null?void 0:o[i]:e._$Cl,n=he(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),n===void 0?s=void 0:(s=new n(r),s._$AT(r,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=X(r,s._$AS(r,t.values),s,i)),t}var Ue=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??W).importNode(e,!0);q.currentNode=s;let n=q.nextNode(),o=0,a=0,l=i[0];for(;l!==void 0;){if(o===l.index){let h;l.type===2?h=new ue(n,n.nextSibling,this,t):l.type===1?h=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(h=new qe(n,this,t)),this._$AV.push(h),l=i[++a]}o!==(l==null?void 0:l.index)&&(n=q.nextNode(),o++)}return q.currentNode=W,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},ue=class r{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),he(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==j&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):yi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==v&&he(this._$AH)?this._$AA.nextSibling.data=t:this.T(W.createTextNode(t)),this._$AH=t}$(t){var n;let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=de.createElement($t(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(e);else{let o=new Ue(s,this),a=o.u(this.options);o.p(e),this.T(a),this._$AH=o}}_$AC(t){let e=wt.get(t.strings);return e===void 0&&wt.set(t.strings,e=new de(t)),e}k(t){We(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let n of t)s===e.length?e.push(i=new r(this.O(ce()),this.O(ce()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t!==this._$AB;){let s=ft(t).nextSibling;ft(t).remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=v}_$AI(t,e=this,i,s){let n=this.strings,o=!1;if(n===void 0)t=X(this,t,e,0),o=!he(t)||t!==this._$AH&&t!==j,o&&(this._$AH=t);else{let a=t,l,h;for(t=n[0],l=0;l<n.length-1;l++)h=X(this,a[i+l],e,l),h===j&&(h=this._$AH[l]),o||(o=!he(h)||h!==this._$AH[l]),h===v?t=v:t!==v&&(t+=(h??"")+n[l+1]),this._$AH[l]=h}o&&!s&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ge=class extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}},Ne=class extends J{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}},Be=class extends J{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??v)===j)return;let i=this._$AH,s=t===v&&i!==v||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==v&&(i===v||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}},qe=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}};var De=le.litHtmlPolyfillSupport;De==null||De(de,ue),(le.litHtmlVersions??(le.litHtmlVersions=[])).push("3.3.3");var Mt=(r,t,e)=>{let i=(e==null?void 0:e.renderBefore)??t,s=i._$litPart$;if(s===void 0){let n=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new ue(t.insertBefore(ce(),n),n,void 0,e??{})}return s._$AI(r),s};var V=globalThis,O=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return j}},St;O._$litElement$=!0,O.finalized=!0,(St=V.litElementHydrateSupport)==null||St.call(V,{LitElement:O});var Ve=V.litElementPolyfillSupport;Ve==null||Ve({LitElement:O});(V.litElementVersions??(V.litElementVersions=[])).push("4.2.2");function pe(r,t,e={}){r.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}var Z=r=>r.split(".")[0];function ke(r,t){var s,n,o,a,l;let e=(s=r.entities)==null?void 0:s[t],i=(e==null?void 0:e.area_id)??(e!=null&&e.device_id?(o=(n=r.devices)==null?void 0:n[e.device_id])==null?void 0:o.area_id:void 0);return i?(l=(a=r.areas)==null?void 0:a[i])==null?void 0:l.name:void 0}function At(r,t){var e;return((e=r.states[t])==null?void 0:e.attributes.friendly_name)??t}var Q=r=>!r||r.state==="unavailable"||r.state==="unknown";function H(r,t,e){let i=window;i.customCards??(i.customCards=[]),i.customCards.push({type:r,name:t,description:e,preview:!0})}var xi=r=>{var t;return r.media_class==="image"||!!((t=r.media_content_type)!=null&&t.startsWith("image/"))};function Ke(r){let t=r.attributes;return typeof t.temperature=="number"?{mode:"single",value:t.temperature}:typeof t.target_temp_low=="number"&&typeof t.target_temp_high=="number"?{mode:"dual",low:t.target_temp_low,high:t.target_temp_high}:{mode:"none"}}function Et(r,t,e,i){let s=Math.round(r/t)*t;return+Math.min(i,Math.max(e,s)).toFixed(t<1?1:0)}function Ct(r){let t=r.attributes;if(t.hvac_action==="cooling")return"high";if(t.hvac_action==="heating")return"low";let e=t.current_temperature;return typeof e=="number"&&typeof t.target_temp_low=="number"&&typeof t.target_temp_high=="number"&&Math.abs(e-t.target_temp_high)<Math.abs(e-t.target_temp_low)?"high":"low"}function Ye(r,t){switch(r){case"lock":return t!=="locked"&&t!=="locking";case"cover":return t==="open"||t==="opening";case"scene":return!1;default:return t==="on"}}function Tt(r,t){switch(r){case"lock":return t==="locked"?["lock","unlock"]:["lock","lock"];case"scene":return["scene","turn_on"];case"script":return t==="on"?["script","turn_off"]:["script","turn_on"];case"cover":return["cover","toggle"];case"light":case"switch":case"fan":case"input_boolean":return[r,"toggle"];default:return["homeassistant","toggle"]}}function Pt(r,t,e){let i=t+e/60;return{h:(r%12+i/60)*30,m:i*6,s:e*6}}function Xe(r,t=new Date){if(!r)return{h:t.getHours(),m:t.getMinutes(),s:t.getSeconds(),ms:t.getMilliseconds()};let e=new Intl.DateTimeFormat("en-GB",{timeZone:r,hour:"numeric",minute:"numeric",second:"numeric",hourCycle:"h23"}).formatToParts(t),i=s=>{var n;return+(((n=e.find(o=>o.type===s))==null?void 0:n.value)??0)};return{h:i("hour"),m:i("minute"),s:i("second"),ms:t.getMilliseconds()}}function K(r){return(Array.isArray(r)?r:[r]).filter(e=>typeof e=="string").map(e=>e.trim()).filter(Boolean)}async function Rt(r,t,e){let i=new Set,s=K(t).map(a=>[a,0]),n=0,o;for(;s.length&&i.size<5e4;){let[a,l]=s.shift(),h;try{h=await r.callWS({type:"media_source/browse_media",media_content_id:a})}catch(d){if(l>0)throw d;o??(o=d);continue}l===0&&n++;for(let d of h.children??[])if(xi(d)?i.add(d.media_content_id):e&&d.can_expand&&l<3&&s.push([d.media_content_id,l+1]),i.size>=5e4)break}if(!n&&o)throw o;return[...i]}function Me(r,t){let e,i=new Promise((s,n)=>{e=setTimeout(()=>n(new Error("Home Assistant did not answer")),t)});return Promise.race([r,i]).finally(()=>clearTimeout(e))}function Lt(r,t){let e={...r};for(let i of t)i in e&&!Array.isArray(e[i])&&(e[i]=K(e[i]));return e}function Ot(r,t){let e={...r};for(let i of t){if(!(i in e))continue;let s=e[i];if(Array.isArray(s)&&s.some(o=>typeof o!="string"||!o.trim()))continue;let n=K(s);n.length?e[i]=n.length===1?n[0]:n:delete e[i]}return e}function It(r,t,e){let i=Math.abs(r),s=Math.abs(t);if(i<10&&s<10)return e<600?"tap":null;let n=Math.max(i,s)/Math.max(e,1)>.5;return i>s*1.2&&(i>=60||n&&i>=25)?r<0?"left":"right":s>i*1.2&&(s>=90||n&&s>=30)?t<0?"up":"down":null}var $e=class{constructor(t=100){this.list=[];this.pos=-1;this.max=t}peek(t){return this.list[this.pos+t]}step(t){let e=this.peek(t);return e!==void 0&&(this.pos+=t),e}push(t){this.list.splice(this.pos+1,1/0,t),this.list.length>this.max&&this.list.shift(),this.pos=this.list.length-1}drop(t){let e=this.list.indexOf(t);e<0||(this.list.splice(e,1),e<=this.pos&&this.pos--)}clear(){this.list=[],this.pos=-1}};function Ht(r,t=Math.random){let e=r.slice();for(let i=e.length-1;i>0;i--){let s=Math.floor(t()*(i+1));[e[i],e[s]]=[e[s],e[i]]}return e}function zt(r,t){switch(t.type){case"run-start":return r==="idle"?"listening":r;case"stt-vad-end":case"stt-end":case"intent-start":return"thinking";case"tts-start":case"tts-end":return"responding";case"error":return"error";default:return r}}function _i(r){return r==="NotAllowedError"||r==="SecurityError"?"Microphone access was denied":r==="NotFoundError"?"No microphone found":r==="stt-no-text-recognized"?"Didn't catch that":r==="pipeline-not-found"?"Assist pipeline not found":r==="timeout"?"Assist timed out":r.startsWith("wake")?"Wake word detection failed":r.startsWith("stt")?"Couldn't recognize speech":r.startsWith("intent")?"Couldn't handle the request":r.startsWith("tts")?"Couldn't speak the reply":"Something went wrong"}function Ft(r){let t=r??{},e=typeof t.code=="string"?t.code:typeof t.name=="string"?t.name:"",i=typeof t.message=="string"&&t.message||e||String(r);return{text:_i(e),detail:i}}function Dt(r){switch(r){case"listening":return"listening";case"processing":return"thinking";case"responding":return"responding";case void 0:case"unavailable":return"error";default:return"idle"}}var ki=[{name:"",type:"expandable",flatten:!0,title:"Glass and wallpaper",schema:[{name:"wallpaper",label:"Wallpaper",helper:"Built-in champagne or teal, an image URL such as /local/wall.jpg, or 'view' to use the view background set in Home Assistant. A view background always wins.",selector:{select:{custom_value:!0,mode:"dropdown",options:[{value:"champagne",label:"Champagne (built-in)"},{value:"teal",label:"Teal (built-in)"},{value:"view",label:"View background"}]}}},{name:"glass",label:"Glass rendering",helper:"Auto pre-renders the refraction (fast, works everywhere). Live refracts in real time (Chromium only, GPU heavy). Frost is plain blur.",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (pre-rendered)"},{value:"live",label:"Live (Chromium)"},{value:"frost",label:"Frost"}]}}}]}],$i=r=>r.replace(/_/g," ").replace(/^./,t=>t.toUpperCase()),fe=class extends O{constructor(){super(...arguments);this.fields=[]}setConfig(e){this._config=e}render(){return!this.hass||!this._config?v:b`<ha-form
      .hass=${this.hass}
      .data=${Lt(this._config,this.listNames())}
      .schema=${[...this.fields,...ki]}
      .computeLabel=${e=>e.label??$i(e.name)}
      .computeHelper=${e=>e.helper}
      @value-changed=${this.changed}
    ></ha-form>`}listNames(){return this.fields.filter(e=>e.list).map(e=>e.name)}changed(e){e.stopPropagation();let i=Ot({...e.detail.value},this.listNames());for(let[s,n]of Object.entries(i))(n===""||n===void 0||n===null)&&delete i[s];pe(this,"config-changed",{config:i})}};fe.properties={hass:{attribute:!1},fields:{attribute:!1},_config:{state:!0}};function Mi(r,t=3){return Math.round((Math.sqrt(12*r*r/t+1)-1)/2)}function Ut(r,t,e=3){let i=Mi(t,e);if(i<1)return r;let{width:s,height:n}=r,o=r.data,a=new Uint8ClampedArray(o.length),l=(h,d,c)=>{let u=c?s:n,f=c?n:s,p=c?4:s*4,x=2*i+1;for(let M=0;M<f;M++){let P=c?M*s*4:M*4;for(let T=0;T<4;T++){let w=0;for(let m=-i;m<=i;m++)w+=h[P+Math.min(u-1,Math.max(0,m))*p+T];for(let m=0;m<u;m++){d[P+m*p+T]=w/x;let g=Math.min(u-1,m+i+1),y=Math.max(0,m-i);w+=h[P+g*p+T]-h[P+y*p+T]}}}};for(let h=0;h<e;h++)l(o,a,!0),l(a,o,!1);return a=new Uint8ClampedArray(0),r}function Gt(r,t,e,i,s){let n=new Uint8ClampedArray(i*s*4);for(let o=0;o<s;o++){let a=Math.min(r.height-1,Math.max(0,e+o));for(let l=0;l<i;l++){let h=Math.min(r.width-1,Math.max(0,t+l)),d=(a*r.width+h)*4,c=(o*i+l)*4;n[c]=r.data[d],n[c+1]=r.data[d+1],n[c+2]=r.data[d+2],n[c+3]=r.data[d+3]}}return{width:i,height:s,data:n}}function Nt(r,t,e,i,s,n){let o=t.width,a=t.height,l=r.width,h=r.height,d=r.data,c=t.data,u=new Uint8ClampedArray(o*a*4),f=(s.scale+s.aberration)*n,p=s.scale*n,x=Math.max(0,s.scale-s.aberration)*n,M=1.25,P=1.03,T=(w,m,g)=>{w=Math.min(l-1.001,Math.max(0,w)),m=Math.min(h-1.001,Math.max(0,m));let y=w|0,k=m|0,S=w-y,I=m-k,R=(k*l+y)*4+g,L=R+l*4;return(d[R]*(1-S)+d[R+4]*S)*(1-I)+(d[L]*(1-S)+d[L+4]*S)*I};for(let w=0;w<a;w++)for(let m=0;m<o;m++){let g=(w*o+m)*4;if(!c[g+3])continue;let y=c[g]/255-.5,k=c[g+1]/255-.5,S=e+m+.5,I=i+w+.5,R=T(S+f*y,I+f*k,0),L=T(S+p*y,I+p*k,1),F=T(S+x*y,I+x*k,2),U=.2126*R+.7152*L+.0722*F;R=(U+(R-U)*M)*P,L=(U+(L-U)*M)*P,F=(U+(F-U)*M)*P;let re=c[g+2]/255*s.specular;u[g]=R+(255-R)*re,u[g+1]=L+(255-L)*re,u[g+2]=F+(255-F)*re,u[g+3]=255}return{width:o,height:a,data:u}}function Bt(r){let t=n=>{let o=n/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4},e=0,i=0,s=r.data;for(let n=0;n<s.length;n+=16)s[n+3]!==0&&(e+=.2126*t(s[n])+.7152*t(s[n+1])+.0722*t(s[n+2]),i++);return i?e/i:0}function qt(r,t=.07,e=.1,i=.5){let s=.30000000000000004;return r<=s?e:Math.min(i,Math.max(e,(r-s)/(r-t)))}var Si=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
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
</svg>`;function Ai(){let r="";for(let e=0,i=120;i<1100;e++,i+=105)r+=`<path d="M-100 ${i} L520 ${i+330} L1100 ${i-40} L1100 ${i+15} L520 ${i+385} L-100 ${i+55}Z" fill="url(#band-${e%2?"b":"a"})" opacity="${e%2?".9":".75"}"/>`;let t="";for(let e=0;e<16;e++)t+=`<path d="M0 0 C 70 -60 200 -55 250 -8 C 180 -20 80 -10 0 0Z" transform="rotate(${e*22.5})" fill="${e%2?"url(#blade)":"#1d6158"}"/>`;return`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a7a6f"/><stop offset="1" stop-color="#123f3a"/></linearGradient>
<linearGradient id="band-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fae9f"/><stop offset="1" stop-color="#2a7d71"/></linearGradient>
<linearGradient id="band-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c5f56"/><stop offset="1" stop-color="#124a43"/></linearGradient>
<linearGradient id="blade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5dbcad"/><stop offset="1" stop-color="#2b8073"/></linearGradient>
<pattern id="stripe" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="16" height="16" fill="#1a5a52"/><rect width="7" height="16" fill="#2f8578"/></pattern>
</defs>
<rect width="1000" height="1000" fill="url(#bg)"/>
<g>${r}</g>
<g transform="translate(150 230)">${t}<circle r="26" fill="#64c2b3"/></g>
<g transform="translate(720 690) rotate(45)"><rect x="-150" y="-150" width="300" height="300" fill="url(#stripe)"/><rect x="-150" y="-150" width="300" height="300" fill="none" stroke="#6cc6b7" stroke-width="6" opacity=".6"/></g>
<g transform="translate(860 300) rotate(45)"><rect x="-90" y="-90" width="180" height="180" fill="#3a9586"/><rect x="-90" y="-90" width="180" height="90" fill="#50ab9c"/></g>
</svg>`}var Ei={champagne:{svg:Si,base:"#928980",glass:"84 74 64"},teal:{svg:Ai(),base:"#174c46",glass:"255 255 255"}},Ci=r=>r==="champagne"||r==="teal";function Wt(r){if(Ci(r)){let t=Ei[r];return`${t.base} center / cover no-repeat url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(t.svg)}")`}return`center / cover no-repeat url("${r.replace(/"/g,"%22")}")`}var jt=new WeakMap,Kt=/^(ha-dialog|ha-md-dialog|hui-dialog-|ha-more-info)/;function Yt(r){for(let t=r;t;t=t instanceof ShadowRoot?t.host:t.parentNode)if(t instanceof HTMLElement&&Kt.test(t.localName))return!0;return!1}function Xt(r){let t=r;for(;t;){if(t instanceof ShadowRoot||t instanceof Document){let e=t.querySelector("hui-view-background");if(e)return e}if(t instanceof HTMLElement&&Kt.test(t.localName))return null;t=t instanceof ShadowRoot?t.host:t.parentNode}return null}function Jt(r){let t=jt.get(r);return t||(t=new Je(r),jt.set(r,t)),t}var Vt=()=>Math.min(window.devicePixelRatio||1,2),Ti=150;function Pi(r){let t=/url\((['"]?)(.*?)\1\)/.exec(r);return t?t[2]:null}function Ri(r,t,e,i,s,n){let o=e,a=i,l=s.trim().split(/\s+/);if(l[0]==="cover"||l[0]==="contain"){let c=l[0]==="cover"?Math.max(r/e,t/i):Math.min(r/e,t/i);o=e*c,a=i*c}else if(l[0]!=="auto"||l[1]&&l[1]!=="auto"){let c=(p,x)=>p==="auto"||p===void 0?null:p.endsWith("%")?parseFloat(p)/100*x:parseFloat(p),u=c(l[0],r),f=c(l[1]??"auto",t);u!==null&&f!==null?(o=u,a=f):u!==null?(o=u,a=i*u/e):f!==null&&(a=f,o=e*f/i)}let h=n.trim().split(/\s+/),d=(c,u)=>c?c.endsWith("%")?parseFloat(c)/100*u||0:c==="left"||c==="top"?0:c==="right"||c==="bottom"?u:c==="center"?u/2:parseFloat(c)||0:u/2;return{x:d(h[0],r-o),y:d(h[1]??"50%",t-a),w:o,h:a}}var Je=class{constructor(t){this.snapshot=null;this.failure=null;this.listeners=new Set;this.key="";this.version=0;this.pending=null;this.recheck=!1;this.timer=0;this.settle=0;this.overrides=new Map;this.el=t}subscribe(t){return this.listeners.add(t),this.listeners.size===1?this.start():this.snapshot&&queueMicrotask(t),()=>{this.listeners.delete(t),this.listeners.size||this.stop()}}setWallpaper(t,e,i=!0){e?this.overrides.set(t,{value:e,explicit:i}):this.overrides.delete(t);let s=this.el.parentElement??this.el.getRootNode().host;if(!s)return;let n=[...this.overrides.values()],o=n.find(a=>a.explicit)??n[0];o?s.style.setProperty("--lovelace-background",Wt(o.value)):s.style.removeProperty("--lovelace-background"),this.check()}check(){if(this.pending){this.recheck=!0;return}let t=getComputedStyle(this.el),e=this.el.getBoundingClientRect();if(e.width<1||e.height<1)return;let i=[t.backgroundImage,t.backgroundSize,t.backgroundPosition,t.backgroundColor,t.opacity,Math.round(e.width),Math.round(e.height),Vt()].join("|");i!==this.key&&(this.key=i,clearTimeout(this.settle),this.settle=window.setTimeout(()=>{let s=this.el.getBoundingClientRect();this.pending=this.raster(getComputedStyle(this.el),s).finally(()=>{this.pending=null,this.recheck&&(this.recheck=!1,this.check())})},Ti))}origin(){let t=this.el.getBoundingClientRect();return{x:t.x,y:t.y}}start(){this.ro=new ResizeObserver(()=>this.check()),this.ro.observe(this.el),this.mo=new MutationObserver(()=>this.check()),this.mo.observe(this.el,{attributes:!0,attributeFilter:["style","class","fixed-background"]}),this.el.parentElement&&this.mo.observe(this.el.parentElement,{attributes:!0,attributeFilter:["style"]}),this.timer=window.setInterval(()=>this.check(),2e3),this.check()}stop(){var t,e;clearTimeout(this.settle),(t=this.ro)==null||t.disconnect(),(e=this.mo)==null||e.disconnect(),clearInterval(this.timer),this.key=""}async raster(t,e){let i=Vt(),s=Math.max(1,Math.round(e.width*i)),n=Math.max(1,Math.round(e.height*i));try{let o=document.createElement("canvas");o.width=s,o.height=n;let a=o.getContext("2d",{willReadFrequently:!0});if(!a)throw new Error("no 2d context");let l=getComputedStyle(document.documentElement).backgroundColor;a.fillStyle=l&&l!=="rgba(0, 0, 0, 0)"?l:"#111",a.fillRect(0,0,s,n),a.globalAlpha=parseFloat(t.opacity)||1,a.fillStyle=t.backgroundColor,a.fillRect(0,0,s,n);let h=t.backgroundImage;if(h&&h!=="none"){let c=Pi(h);if(!c||/gradient\(/.test(h.replace(/url\(.*?\)/g,"")))throw new Error("background is not a plain image");let u=await Li(c),f=Ri(e.width,e.height,u.naturalWidth||e.width,u.naturalHeight||e.height,t.backgroundSize,t.backgroundPosition);a.drawImage(u,f.x*i,f.y*i,f.w*i,f.h*i)}let d=a.getImageData(0,0,s,n);this.failure=null,this.snapshot={pixels:{width:s,height:n,data:d.data},x:e.x,y:e.y,k:i,version:++this.version}}catch(o){this.failure=o instanceof Error?o.message:String(o),this.snapshot=null}this.listeners.forEach(o=>o())}};function Li(r){return new Promise((t,e)=>{let i=new Image,s=new URL(r,location.href);s.origin!==location.origin&&s.protocol.startsWith("http")&&(i.crossOrigin="anonymous"),i.onload=()=>t(i),i.onerror=()=>e(new Error(`cannot load background ${r.slice(0,80)}`)),i.src=r})}function Oi(r,t,e,i,s){let n=Math.abs(r)-e+s,o=Math.abs(t)-i+s;return Math.min(Math.max(n,o),0)+Math.hypot(Math.max(n,0),Math.max(o,0))-s}function Ii(r){let t=1-Math.min(1,Math.max(0,r)),e=(1-t**4)**.75;if(e<1e-6)return 0;let i=Math.atan(Math.min(t**3/e,8)),s=Math.sin(i)/1.5;return s>=1?Math.sin(i):Math.sin(i-Math.asin(s))}function Zt(r,t,e,i,s){let n=Math.max(1,Math.round(r*s)),o=Math.max(1,Math.round(t*s)),a=n/2,l=o/2,h=Math.min(e*s,a,l),d=Math.max(1,i*s),c=Math.ceil(d),u=new Float32Array(c+1);for(let m=1;m<=c;m++)u[m]=u[m-1]+Ii(m/c);let f=m=>{if(m<=0)return 0;if(m>=c)return u[c];let g=Math.floor(m),y=m-g;return u[g]*(1-y)+u[g+1]*y},p=new Float32Array(n*o),x=new Float32Array(n*o);for(let m=0;m<o;m++)for(let g=0;g<n;g++){let y=Oi(g-a+.5,m-l+.5,a,l,h);x[m*n+g]=y,p[m*n+g]=y>0?0:f(Math.min(d,-y))}let M=1.35,P=-.54,T=-.84,w=new Uint8ClampedArray(n*o*4);for(let m=0;m<o;m++)for(let g=0;g<n;g++){let y=m*n+g,k=y<<2,S=x[y];if(S>0){w[k]=w[k+1]=w[k+2]=128,w[k+3]=0;continue}if(S<-d-2){w[k]=w[k+1]=128,w[k+2]=0,w[k+3]=255;continue}let I=Math.max(0,g-1),R=Math.min(n-1,g+1),L=Math.max(0,m-1),F=Math.min(o-1,m+1),U=Math.max(-1,Math.min(1,(p[m*n+R]-p[m*n+I])/(R-I||1)*M)),re=Math.max(-1,Math.min(1,(p[F*n+g]-p[L*n+g])/(F-L||1)*M)),st=0;if(S>=-d){let rt=x[m*n+R]-x[m*n+I],nt=x[F*n+g]-x[L*n+g],ot=Math.hypot(rt,nt)||1,at=rt/ot*P+nt/ot*T,hi=(1-Math.min(1,-S/d))**1.6;st=(Math.max(0,at)+Math.max(0,-at)*.35)*hi}w[k]=128+U*127,w[k+1]=128+re*127,w[k+2]=Math.round(st*255),w[k+3]=255}return{width:n,height:o,data:w}}function Qt(r,t,e={}){return{radius:t,bevel:Math.max(4,Math.round(r*(e.bevel??.13))),scale:Math.round(r*(e.refraction??.3)),aberration:Math.max(1,Math.round(r*(e.aberration??.02))),frost:+(r*(e.frost??.007)).toFixed(2),specular:.55}}function ei(){let r=navigator.userAgent;return!(/Safari/.test(r)&&!/Chrome|Chromium|Edg|OPR/.test(r))&&(CSS.supports("backdrop-filter","url(#x)")||CSS.supports("-webkit-backdrop-filter","url(#x)"))}function ti(r,t,e,i,s){let n=Math.ceil(s.scale+s.aberration+4),o=n/e*100,a=n/i*100,l=(h,d)=>`<feDisplacementMap in="SourceGraphic" in2="map" scale="${h}" xChannelSelector="R" yChannelSelector="G" result="${d}"/>`;return`<filter id="${r}" color-interpolation-filters="sRGB" x="-${o}%" y="-${a}%" width="${100+2*o}%" height="${100+2*a}%">
  <feImage href="${t}" x="0" y="0" width="${e}" height="${i}" preserveAspectRatio="none" result="map"/>
  ${l(s.scale+s.aberration,"dR")}<feColorMatrix in="dR" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
  ${l(s.scale,"dG")}<feColorMatrix in="dG" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>
  ${l(Math.max(0,s.scale-s.aberration),"dB")}<feColorMatrix in="dB" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>
  <feBlend in="r" in2="g" mode="screen" result="rg"/><feBlend in="rg" in2="b" mode="screen" result="rgb"/>
  <feGaussianBlur in="rgb" stdDeviation="${s.frost}" result="frosted"/>
  <feColorMatrix in="map" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 ${s.specular} 0 0" result="spec"/>
  <feComposite in="spec" in2="frosted" operator="over"/>
</filter>`}var Ze=window.homeview??(window.homeview={timings:[]}),me=new Map;function ii(r,t,e,i){let s=[r,t,e.radius.toFixed(1),e.bevel,i].join("|"),n=me.get(s);return n||(n=Zt(r,t,e.radius,e.bevel,i),me.size>24&&me.delete(me.keys().next().value),me.set(s,n)),n}var ge=new Set,Qe=!1;function si(){Qe||(Qe=!0,requestAnimationFrame(()=>{Qe=!1;let r=performance.now();for(let t of ge)if(ge.delete(t),t.bakeNow(),performance.now()-r>12)break;ge.size&&si()}))}var Hi=()=>matchMedia("(prefers-reduced-transparency: reduce)").matches,Se=class{constructor(t,e="rect"){this.mode="frost";this.opts={};this.shape="rect";this.backdrop=null;this.poll=0;this.lastKey="";this.onScroll=()=>this.request();this.host=t,this.shape=e,t.addController(this)}setOptions(t){let e=JSON.stringify(t)!==JSON.stringify(this.opts);this.opts={...t},e&&this.host.isConnected&&this.attach()}hostConnected(){requestAnimationFrame(()=>this.attach()),window.addEventListener("scroll",this.onScroll,{capture:!0,passive:!0}),window.addEventListener("resize",this.onScroll,{passive:!0}),this.poll=window.setInterval(()=>this.request(),700)}hostDisconnected(){var t;this.detach(),window.removeEventListener("scroll",this.onScroll,{capture:!0}),window.removeEventListener("resize",this.onScroll),clearInterval(this.poll),(t=this.ro)==null||t.disconnect(),this.ro=void 0,ge.delete(this)}hostUpdated(){let t=this.card();t&&!this.ro&&(this.ro=new ResizeObserver(()=>this.request()),this.ro.observe(t)),this.request()}card(){return this.host.renderRoot.querySelector(".hv-glass")}canvas(){return this.host.renderRoot.querySelector("canvas.hv-bake")}detach(){var t,e;(t=this.unsub)==null||t.call(this),this.unsub=void 0,(e=this.backdrop)==null||e.setWallpaper(this,void 0),this.backdrop=null}attach(){if(!this.host.isConnected)return;this.detach();let t=Xt(this.host);this.backdrop=t?Jt(t):null;let e=this.opts.wallpaper??"champagne";this.backdrop&&e!=="view"&&e!=="none"&&this.backdrop.setWallpaper(this,e,this.opts.wallpaper!==void 0),this.backdrop&&(this.unsub=this.backdrop.subscribe(()=>this.request(!0))),this.lastKey="",this.request(!0)}request(t=!1){t&&(this.lastKey=""),!(!this.host.isConnected||!this.card())&&this.key()!==this.lastKey&&(ge.add(this),si())}geometry(){let t=this.card();if(!t)return null;let e=t.offsetWidth,i=t.offsetHeight;if(e<8||i<8)return null;let s=t.getBoundingClientRect();return{x:s.x+s.width/2-e/2,y:s.y+s.height/2-i/2,w:e,h:i}}key(){var i,s,n;let t=this.geometry();if(!t)return"none";let e=((i=this.backdrop)==null?void 0:i.origin())??{x:0,y:0};return[Math.round(t.x-e.x),Math.round(t.y-e.y),t.w,t.h,((n=(s=this.backdrop)==null?void 0:s.snapshot)==null?void 0:n.version)??-1,this.mode,JSON.stringify(this.opts)].join("|")}params(t,e){let i=this.card(),s=Math.max(110,Math.min(260,Math.min(t,e))),n=this.shape==="circle"?Math.min(t,e)/2:parseFloat(getComputedStyle(i).borderTopLeftRadius)||0;return Qt(s,n,this.opts)}resolveMode(){var e;let t=this.opts.glass??"auto";return Hi()||t==="frost"?"frost":t==="live"?ei()?"live":"frost":(e=this.backdrop)!=null&&e.snapshot?"baked":"frost"}bakeNow(){let t=this.card(),e=this.canvas(),i=this.geometry();if(!t||!e||!i||!t.style.getPropertyValue("--hv-radius"))return;if(this.mode=this.resolveMode(),this.lastKey=this.key(),t.dataset.glass=this.mode,this.mode!=="live"&&t.style.removeProperty("backdrop-filter"),this.mode==="frost"){t.style.setProperty("--hv-tint-rgb","84 74 64"),t.style.setProperty("--hv-tint-a",".28");return}let s=this.params(i.w,i.h);if(this.mode==="live"){this.applyLive(t,i.w,i.h,s);return}let n=performance.now(),o=this.backdrop.snapshot,a=o.k,l=this.backdrop.origin(),h=ii(i.w,i.h,s,a),d=s.frost*a,c=Math.ceil((s.scale+s.aberration)*a+d*3+2),u=Math.round((i.x-l.x)*a)-c,f=Math.round((i.y-l.y)*a)-c,p=Ut(Gt(o.pixels,u,f,h.width+2*c,h.height+2*c),d),x=Nt(p,h,c,c,s,a);e.width=x.width,e.height=x.height,e.getContext("2d").putImageData(new ImageData(x.data,x.width,x.height),0,0);let M=Bt(x);M<.18?(t.style.setProperty("--hv-tint-rgb","255 255 255"),t.style.setProperty("--hv-tint-a",".13")):(t.style.setProperty("--hv-tint-rgb","84 74 64"),t.style.setProperty("--hv-tint-a",String(Math.max(.13,qt(M)).toFixed(3)))),Ze.timings.push({card:this.host.localName,w:i.w,h:i.h,ms:Math.round(performance.now()-n)}),Ze.timings.length>200&&Ze.timings.splice(0,100)}applyLive(t,e,i,s){let n=Math.min(window.devicePixelRatio||1,2),o=ii(e,i,s,n),a=document.createElement("canvas");a.width=o.width,a.height=o.height,a.getContext("2d").putImageData(new ImageData(o.data,o.width,o.height),0,0);let l=a.toDataURL("image/png"),h=`hv-${Math.random().toString(36).slice(2,9)}`,c=this.host.renderRoot.querySelector("svg.hv-filters");c||(c=document.createElementNS("http://www.w3.org/2000/svg","svg"),c.setAttribute("class","hv-filters"),c.setAttribute("aria-hidden","true"),c.setAttribute("style","position:absolute;width:0;height:0;overflow:hidden"),this.host.renderRoot.appendChild(c)),c.innerHTML=ti(h,l,e,i,s);let u=`url(#${h}) saturate(1.25) brightness(1.03)`;t.style.setProperty("backdrop-filter",u),t.style.setProperty("-webkit-backdrop-filter",u),t.style.setProperty("--hv-tint-rgb","255 255 255"),t.style.setProperty("--hv-tint-a",".13")}};var z=C`
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
`,A=class extends O{constructor(t="rect"){super(),this.glass=new Se(this,t)}static getConfigElement(){let t=document.createElement("homeview-card-editor");return t.fields=this.editorFields,t}setConfig(t){if(!t)throw new Error("Invalid configuration");this.validate(t),this._config=t,this.glass.setOptions({glass:t.glass,wallpaper:t.wallpaper,bevel:t.bevel,refraction:t.refraction,aberration:t.aberration,frost:t.frost})}validate(t){}getCardSize(){return 3}get square(){var t,e;return typeof((e=(t=this._config)==null?void 0:t.grid_options)==null?void 0:e.rows)!="number"}refFrom(t,e){return Math.min(t,e)}get onScreen(){return this.getClientRects().length>0}resume(){}cardClass(){return""}render(){return this._config?b`<ha-card class="hv-glass ${this.square?"square":""} ${this.cardClass()}">
      <canvas class="hv-bake" aria-hidden="true"></canvas>
      <div class="hv-tint"></div>
      <div class="hv-content">${this.renderContent()}</div>
    </ha-card>`:b``}firstUpdated(t){let e=this.renderRoot.querySelector("ha-card");e&&(this.sizer=new ResizeObserver(()=>{let i=this.refFrom(e.offsetWidth,e.offsetHeight);e.style.setProperty("--hv-ref",`${i}px`),e.style.setProperty("--hv-radius",`${Math.round(Math.max(14,Math.min(34,i*.125)))}px`),e.toggleAttribute("data-wide",e.offsetWidth>e.offsetHeight*1.5),e.toggleAttribute("data-short",e.offsetHeight<240),this.glass.request(!0),e.offsetWidth&&this.resume()}),this.sizer.observe(e))}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.sizer)==null||t.disconnect(),this.sizer=void 0}connectedCallback(){super.connectedCallback(),this.hasUpdated&&!this.sizer&&this.firstUpdated(new Map)}};A.properties={hass:{attribute:!1},_config:{state:!0}},A.editorFields=[];var E=r=>_`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${r}</svg>`,$={sun:E(_`<circle cx="12" cy="12" r="4.3"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2.2v2.4M12 19.4v2.4M2.2 12h2.4M19.4 12h2.4M5.1 5.1l1.7 1.7M17.2 17.2l1.7 1.7M5.1 18.9l1.7-1.7M17.2 6.8l1.7-1.7"/></g>`),moon:E(_`<path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8a8.6 8.6 0 1 0 10.8 10.8z"/><path d="M17 3.2l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6zM20.6 7.6l.4.9.9.4-.9.4-.4.9-.4-.9-.9-.4.9-.4z"/>`),lock:E(_`<path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="4.75" y="9.5" width="14.5" height="12" rx="2.6"/>`),unlock:E(_`<path d="M7.5 10V7.5a4.5 4.5 0 0 1 8.7-1.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><rect x="4.75" y="9.5" width="14.5" height="12" rx="2.6"/>`),light:E(_`<rect x="11.1" y="1.5" width="1.8" height="5" rx=".9"/><rect x="8.6" y="1.2" width="6.8" height="1.9" rx=".95"/><path d="M12 6.2c-4.1 0-7.6 3.2-8 7.3-.05.5.35.9.85.9h14.3c.5 0 .9-.4.85-.9-.4-4.1-3.9-7.3-8-7.3z"/><path d="M8.6 15.6h6.8a3.4 3.4 0 0 1-6.8 0z"/>`),fan:E(_`<circle cx="12" cy="10" r="8.2" fill="none" stroke="currentColor" stroke-width="1.6"/><g class="blades"><path d="M12 10c-.4-2.6.2-5 1.9-5.6 1.6-.5 2.6 1.4 1.4 3.1-.8 1.2-2 1.9-3.3 2.5z"/><path d="M12 10c2.4 1 4.2 2.8 3.8 4.5-.4 1.6-2.6 1.5-3.4-.4-.6-1.3-.6-2.7-.4-4.1z"/><path d="M12 10c-2 1.6-4.4 2.3-5.6 1.1-1.2-1.2.1-3 2.1-2.8 1.4.1 2.5.9 3.5 1.7z"/></g><circle cx="12" cy="10" r="1.3"/><path d="M10.6 18.1h2.8l.9 3.4H9.7z"/><rect x="7.5" y="21" width="9" height="1.8" rx=".9"/>`),curtains:E(_`<rect x="2" y="2.5" width="20" height="1.8" rx=".9"/><path d="M4 4.3h6.5c-.3 4.6-1.4 9.8-3.5 16.9H4z"/><path d="M20 4.3h-6.5c.3 4.6 1.4 9.8 3.5 16.9H20z"/>`),curtainsOpen:E(_`<rect x="2" y="2.5" width="20" height="1.8" rx=".9"/><path d="M4 4.3h3.2c-.2 4.6-.6 9.8-1.4 16.9H4z"/><path d="M20 4.3h-3.2c.2 4.6.6 9.8 1.4 16.9H20z"/>`),garage:E(_`<path d="M2 9.6 12 3l10 6.6V21a1 1 0 0 1-1 1h-1.6V11.4H4.6V22H3a1 1 0 0 1-1-1z"/><rect x="6.2" y="13" width="11.6" height="2" rx=".5"/><rect x="6.2" y="16.2" width="11.6" height="2" rx=".5"/><rect x="6.2" y="19.4" width="11.6" height="2" rx=".5"/>`),garageOpen:E(_`<path d="M2 9.6 12 3l10 6.6V21a1 1 0 0 1-1 1h-1.6V11.4H4.6V22H3a1 1 0 0 1-1-1z"/><rect x="6.2" y="13" width="11.6" height="2" rx=".5"/>`),power:E(_`<path d="M12 2.5v8.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M7.1 5.4a8 8 0 1 0 9.8 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`),play:E(_`<path d="M8 4.7v14.6c0 .9 1 1.4 1.7.9l11-7.3c.7-.4.7-1.4 0-1.8l-11-7.3C9 3.3 8 3.8 8 4.7z"/><path d="M3.5 6.5l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z"/>`),dot:E(_`<circle cx="12" cy="12" r="6"/>`),chevronUp:_`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 15l7-7 7 7"/></svg>`,chevronDown:_`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>`,mic:E(_`<rect x="8.5" y="2" width="7" height="12.5" rx="3.5"/><path d="M5 11a7 7 0 0 0 14 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 18v3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),keyboard:E(_`<rect x="2" y="5.5" width="20" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6 9.5h1.6M9.2 9.5h1.6M12.4 9.5h1.6M15.6 9.5h1.6M6 12.5h1.6M15.6 12.5h1.6M9.2 12.5h4.8M7.5 15.5h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`),retry:E(_`<path d="M19 12a7 7 0 1 1-2.05-4.95" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M20 3.6v6h-6z"/>`),stop:E(_`<rect x="6" y="6" width="12" height="12" rx="2.5"/>`),close:_`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,send:E(_`<path d="M3.4 11.2 19.6 4.1c.8-.3 1.6.5 1.3 1.3l-7.1 16.2c-.3.8-1.5.7-1.7-.1l-1.6-6.2-6.2-1.6c-.8-.2-.9-1.4-.1-1.7z"/>`)};function ri(r,t,e){switch(r){case"light":return $.light;case"lock":return e?$.unlock:$.lock;case"fan":return $.fan;case"cover":return t==="garage"||t==="gate"?e?$.garageOpen:$.garage:e?$.curtainsOpen:$.curtains;case"scene":return $.sun;case"script":return $.play;case"switch":case"input_boolean":return $.power;default:return $.dot}}var zi={easing:"cubic-bezier(.34,1.56,.64,1)",duration:520};function Fi(r,t,e,i=1){let s=Math.sqrt(t/i),n=e/(2*Math.sqrt(t*i));if(n>=1)return 1-Math.exp(-s*r)*(1+s*r);let o=s*Math.sqrt(1-n*n);return 1-Math.exp(-n*s*r)*(Math.cos(o*r)+n*s/o*Math.sin(o*r))}function Di(r=210,t=17,e=1,i=48){let s=a=>Fi(a,r,t,e),n=0;for(;n<4&&!(Math.abs(1-s(n))<.002&&Math.abs(1-s(n+.05))<.002);)n+=.01;let o=Array.from({length:i+1},(a,l)=>+s(l/i*n).toFixed(4));return o[i]=1,{easing:`linear(${o.join(",")})`,duration:Math.round(n*1e3)}}var Ae;function ni(){if(Ae)return Ae;let r=Di();return Ae=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("transition-timing-function","linear(0, 1)")?r:zi,Ae}var Ui=800,ee=class extends A{constructor(){super(...arguments);this.sendTimer=0;this.lastDir=0}static getStubConfig(e){return{entity:Object.keys(e.states).find(i=>i.startsWith("climate."))??""}}validate(e){if(!e.entity||!e.entity.startsWith("climate."))throw new Error("Pick a climate entity")}getGridOptions(){return{columns:8,rows:"auto",min_columns:6,min_rows:4}}getCardSize(){return 6}refFrom(e,i){return Math.min(e,i)/2}get stateObj(){var e;return(e=this.hass)==null?void 0:e.states[this._config.entity]}get step(){var e,i,s;return((e=this._config)==null?void 0:e.step)??((i=this.stateObj)==null?void 0:i.attributes.target_temp_step)??(((s=this.hass)==null?void 0:s.config.unit_system.temperature)==="\xB0C"?.5:1)}current(){let e=this.stateObj;if(!e)return{mode:"none"};let i=Ke(e),s=this._pending;return s&&Date.now()-s.at<6e3?{...i,...Object.fromEntries(Object.entries(s).filter(([n,o])=>n!=="at"&&o!==void 0))}:i}activeSide(){return this.current().mode!=="dual"?"single":this._side??Ct(this.stateObj)}willUpdate(e){if(e.has("hass")&&this._pending&&this.stateObj&&!this.sendTimer){let i=Ke(this.stateObj),s=this._pending;((s.value===void 0||s.value===i.value)&&(s.low===void 0||s.low===i.low)&&(s.high===void 0||s.high===i.high)||Date.now()-s.at>6e3)&&(this._pending=void 0)}}shown(){let e=this.current(),i=this.activeSide();return i==="single"?e.value:i==="low"?e.low:e.high}stepBy(e){let i=this.stateObj;if(!i)return;let s=this.current(),n=this.activeSide(),o=i.attributes,a=o.min_temp??-1/0,l=o.max_temp??1/0,h=this.step,d=this.shown();if(d===void 0)return;let c=a,u=l;n==="low"&&s.high!==void 0&&(u=Math.min(l,s.high-h)),n==="high"&&s.low!==void 0&&(c=Math.max(a,s.low+h));let f=Et(d+e*h,h,c,u);if(f===d)return;this.ghost(e);let p={...this._pending??{},at:Date.now()};n==="single"?p.value=f:p[n]=f,this._pending=p,clearTimeout(this.sendTimer),this.sendTimer=window.setTimeout(()=>this.send(),Ui)}send(){this.sendTimer=0;let e=this.stateObj;if(!e||!this.hass||!this._pending)return;let i=this.current(),s=i.mode==="dual"?{target_temp_low:i.low,target_temp_high:i.high}:{temperature:i.value};this._pending={...this._pending,at:Date.now()},this.hass.callService("climate","set_temperature",s,{entity_id:e.entity_id})}ghost(e){this.lastDir=e;let i=this.renderRoot.querySelector(".num:not(.ghost)");if(!i||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let s=i.cloneNode(!0);s.classList.add("ghost"),i.parentElement.appendChild(s),s.animate([{transform:"none",opacity:1},{transform:`translateY(${-36*e}%) scale(.9)`,opacity:0}],{duration:200,easing:"cubic-bezier(.4,0,1,1)",fill:"forwards"}).finished.then(()=>s.remove(),()=>s.remove())}updated(e){var o;if((o=super.updated)==null||o.call(this,e),!this.lastDir)return;let i=this.lastDir;this.lastDir=0;let s=this.renderRoot.querySelector(".num:not(.ghost)");if(!s||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let n=ni();s.animate([{transform:`translateY(${40*i}%) scale(.9)`},{transform:"none"}],{duration:n.duration,easing:n.easing}),s.animate([{opacity:0},{opacity:1}],{duration:180,easing:"ease-out"})}fmt(e){return e===void 0?"--":this.step<1?e.toFixed(1):String(Math.round(e))}renderContent(){let e=this._config;if(!this.hass)return v;let i=this.stateObj;if(!i)return b`<div class="center warning ink">Entity not found: ${e.entity}</div>`;let s=this.current(),n=this.activeSide(),o=i.state==="off",a=Q(i),l=this.shown(),h=i.attributes.current_temperature,d=e.subtitle??ke(this.hass,e.entity)??i.attributes.friendly_name,c=i.attributes,u=!a&&l!==void 0,f=!u||l>=((n==="low"&&s.high!==void 0?s.high-this.step:c.max_temp)??1/0),p=!u||l<=((n==="high"&&s.low!==void 0?s.low+this.step:c.min_temp)??-1/0);return b`<div class="thermo">
      <div class="temp" aria-live="polite">
        <span class="num ink ${o||a?"dim":""}">${a?"--":s.mode==="none"?this.fmt(h):this.fmt(l)}</span>
        ${s.mode==="dual"?b`<div class="sides ink">
              <button class="side ${n==="low"?"sel":""}" @click=${()=>this._side="low"} aria-pressed=${String(n==="low")}>Heat ${this.fmt(s.low)}</button>
              <button class="side ${n==="high"?"sel":""}" @click=${()=>this._side="high"} aria-pressed=${String(n==="high")}>Cool ${this.fmt(s.high)}</button>
            </div>`:v}
      </div>
      <div class="bar">
        <button class="chev" aria-label="Lower setpoint" ?disabled=${p} @click=${()=>this.stepBy(-1)}>${$.chevronDown}</button>
        <div class="label ink">
          <div class="title">${e.name??"Thermostat"}</div>
          <div class="sub">${o?"Off":d}${typeof h=="number"?b` &bull; ${this.fmt(h)}&deg;`:v}</div>
        </div>
        <button class="chev" aria-label="Raise setpoint" ?disabled=${f} @click=${()=>this.stepBy(1)}>${$.chevronUp}</button>
      </div>
    </div>`}};ee.properties={...A.properties,_pending:{state:!0},_side:{state:!0}},ee.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"climate"}}}},{name:"name",selector:{text:{}}},{name:"subtitle",helper:"Defaults to the entity's area",selector:{text:{}}},{name:"step",helper:"Defaults to the entity's target temperature step",selector:{number:{min:.1,max:5,step:.1,mode:"box"}}}],ee.styles=[z,C`
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
    `];customElements.define("homeview-thermostat-card",ee);H("homeview-thermostat-card","HomeView Thermostat","Large liquid-glass thermostat with spring setpoint and heat/cool support.");var oi=["light","switch","fan","lock","cover","scene","script","input_boolean"],Gi=500,te=class extends A{constructor(){super(...arguments);this._confirming=!1;this._flash=!1;this.holdTimer=0;this.held=!1;this.confirmTimer=0;this.down=()=>{this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=window.setTimeout(()=>{this.held=!0,pe(this,"hass-more-info",{entityId:this._config.entity})},Gi)};this.up=()=>clearTimeout(this.holdTimer);this.cancel=()=>clearTimeout(this.holdTimer);this.onTap=()=>{if(this.held){this.held=!1;return}let e=this._config,i=e.tap_action??"toggle";if(i==="none"||!this.hass)return;if(i==="more-info"){pe(this,"hass-more-info",{entityId:e.entity});return}let s=this.hass.states[e.entity];if(!s)return;let n=Z(e.entity);if(n==="lock"&&s.state==="locked"&&e.confirm_unlock&&!this._confirming){this._confirming=!0,clearTimeout(this.confirmTimer),this.confirmTimer=window.setTimeout(()=>this._confirming=!1,3e3);return}this._confirming=!1;let o=Tt(n,s.state);o&&(n==="scene"&&(this._flash=!0,setTimeout(()=>this._flash=!1,1200)),this.hass.callService(o[0],o[1],{},{entity_id:e.entity}))}}static getStubConfig(e){return{entity:Object.keys(e.states).find(s=>Z(s)==="light")??Object.keys(e.states).find(s=>oi.includes(Z(s)))??""}}validate(e){if(!e.entity)throw new Error("Pick an entity")}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}getCardSize(){return 3}cardClass(){var o;let e=this._config,i=(o=this.hass)==null?void 0:o.states[e.entity],s=Z(e.entity),n=i&&!Q(i)&&Ye(s,i.state);return`tile ${s} ${n||this._flash?"on":""} ${Q(i)?"unavailable":""} ${this._confirming?"confirming":""}`}renderContent(){let e=this._config;if(!this.hass)return v;let i=this.hass.states[e.entity],s=Z(e.entity),n=!!i&&!Q(i)&&Ye(s,i.state),o=e.name??(i?At(this.hass,e.entity):e.entity),a=e.subtitle??ke(this.hass,e.entity)??"";i?i.state==="unavailable"?a="Unavailable":this._confirming?a="Tap again to unlock":s==="lock"&&["locking","unlocking","jammed","opening","open"].includes(i.state)&&(a=i.state[0].toUpperCase()+i.state.slice(1)):a="Entity not found";let l=i?s==="lock"||s==="cover"?i.state:s==="scene"||s==="script"?"":n?"on":"off":"missing";return b`<button
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
      <span class="icon">${e.icon?b`<ha-icon .icon=${e.icon}></ha-icon>`:ri(s,i==null?void 0:i.attributes.device_class,n)}</span>
      <span class="label ink"><span class="title">${o}</span><br /><span class="sub">${a}</span></span>
    </button>`}};te.properties={...A.properties,_confirming:{state:!0},_flash:{state:!0}},te.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:oi}}}},{name:"name",selector:{text:{}}},{name:"subtitle",helper:"Defaults to the entity's area",selector:{text:{}}},{name:"icon",helper:"Optional mdi: icon; HomeView glyphs are used by default",selector:{icon:{}}},{name:"tap_action",label:"Tap action",selector:{select:{mode:"dropdown",options:[{value:"toggle",label:"Toggle / run"},{value:"more-info",label:"More info"},{value:"none",label:"Nothing"}]}}},{name:"confirm_unlock",label:"Confirm before unlocking (locks)",selector:{boolean:{}}}],te.styles=[z,C`
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
    `];customElements.define("homeview-tile-card",te);H("homeview-tile-card","HomeView Tile","Liquid-glass tile for lights, switches, fans, locks, covers, scenes and scripts.");var ve=class extends A{constructor(){super("circle");this.raf=0;this.timer=0;this.loop=()=>{if(this.raf=this.timer=0,!this.onScreen)return;this.draw();let e=this.mode();e==="sweep"?this.raf=requestAnimationFrame(this.loop):this.timer=window.setTimeout(this.loop,(e==="off"?6e4-new Date().getSeconds()*1e3:1e3)-new Date().getMilliseconds()+5)}}static getStubConfig(){return{seconds:"sweep"}}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}validate(e){if(e.time_zone)try{new Intl.DateTimeFormat("en",{timeZone:e.time_zone})}catch{throw new Error(`Unknown time zone: ${e.time_zone}`)}}cardClass(){return"clock"}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){var e;super.disconnectedCallback(),cancelAnimationFrame(this.raf),clearTimeout(this.timer),(e=this.fit)==null||e.disconnect(),this.fit=void 0}firstUpdated(e){super.firstUpdated(e),this.fit??(this.fit=new ResizeObserver(()=>this.fitFace())),this.fit.observe(this)}fitFace(){let e=this.renderRoot.querySelector("ha-card");if(!e)return;let i=this.clientWidth,s=this.clientHeight,n=this.square||!i||!s?0:Math.min(i,s);e.style.width=e.style.height=n?`${n}px`:"",e.style.margin=n?`${(s-n)/2}px auto 0`:""}resume(){!this.raf&&!this.timer&&this.loop()}mode(){var i;let e=((i=this._config)==null?void 0:i.seconds)??"sweep";return e==="sweep"&&matchMedia("(prefers-reduced-motion: reduce)").matches?"tick":e}draw(){var o,a;let e=this.renderRoot,i=e.querySelector("#hh");if(!i)return;let s=Xe((o=this._config)==null?void 0:o.time_zone),n=Pt(s.h,s.m,s.s+(this.mode()==="sweep"?s.ms/1e3:0));i.setAttribute("transform",`rotate(${n.h})`),e.querySelector("#mh").setAttribute("transform",`rotate(${n.m})`),(a=e.querySelector("#sh"))==null||a.setAttribute("transform",`rotate(${n.s})`)}renderContent(){var s;let e=Array.from({length:12},(n,o)=>_`<line class="tick" x1="0" x2="0" y1="-84" y2="-68" transform="rotate(${o*30})"/>`),i=Xe((s=this._config)==null?void 0:s.time_zone);return b`<svg class="face" viewBox="-100 -100 200 200" role="img" aria-label="Clock, ${String(i.h).padStart(2,"0")}:${String(i.m).padStart(2,"0")}">
      ${e}
      <line class="hand" id="hh" x1="0" y1="0" x2="0" y2="-42" stroke-width="7" />
      <line class="hand" id="mh" x1="0" y1="0" x2="0" y2="-66" stroke-width="5.5" />
      ${this.mode()==="off"?"":_`<line class="hand" id="sh" x1="0" y1="18" x2="0" y2="-80" stroke-width="1.8" />`}
      <circle r="4.2" fill="#fff" />
    </svg>`}updated(e){var i;(i=super.updated)==null||i.call(this,e),this.draw()}};ve.editorFields=[{name:"seconds",label:"Seconds hand",selector:{select:{mode:"dropdown",options:[{value:"sweep",label:"Smooth sweep"},{value:"tick",label:"Tick"},{value:"off",label:"Hidden"}]}}},{name:"time_zone",label:"Time zone",helper:"IANA name such as Europe/Paris; defaults to this device's time",selector:{text:{}}}],ve.styles=[z,C`
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
    `];customElements.define("homeview-clock-card",ve);H("homeview-clock-card","HomeView Clock","Analog clock on a round liquid-glass face.");function Ee(r,t,e){let i,s,n=h=>{i||h.pointerType==="mouse"&&h.button!==0||(i={id:h.pointerId,x:h.clientX,y:h.clientY,t:h.timeStamp},s=void 0)},o=h=>{if(!i||h.pointerId!==i.id)return;let d=h.clientX-i.x,c=h.clientY-i.y;if(!s){if(Math.max(Math.abs(d),Math.abs(c))<8)return;if(s=Math.abs(d)>=Math.abs(c)?"x":"y",s==="y"&&!e){i=void 0;return}try{r.setPointerCapture(h.pointerId)}catch{}}t.move(d,c,s)},a=h=>{if(!i||h.pointerId!==i.id)return;let d=h.clientX-i.x,c=h.clientY-i.y,u=It(d,c,h.timeStamp-i.t);i=void 0;let f=u==="tap"||!s||(s==="x"?u==="left"||u==="right":u==="up"||u==="down");t.end(f?u:null,d,c)},l=h=>{!i||h.pointerId!==i.id||(i=void 0,t.end(null,0,0))};return r.addEventListener("pointerdown",n),r.addEventListener("pointermove",o),r.addEventListener("pointerup",a),r.addEventListener("pointercancel",l),()=>{r.removeEventListener("pointerdown",n),r.removeEventListener("pointermove",o),r.removeEventListener("pointerup",a),r.removeEventListener("pointercancel",l)}}var Y=420,Ce=()=>({urls:["",""],front:0,drag:0,side:0,still:!1});function be(r,t){return b`${r.urls.map((e,i)=>{if(!e)return v;let s=i===r.front,n=s?`${r.drag}px`:`calc(${r.side} * (100% + var(--hv-gap, 0px)) + ${r.drag}px)`,o=`${s?"front":r.side?"beside":""} ${r.still?"still":""}`;return b`<img class=${o} src=${e} alt="" draggable="false" style="object-fit:${t};transform:translateX(${n})" />`})}`}var Te=C`
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
`;var Ni=3e3,et="homeviewSlideshow",ye=class extends O{constructor(){super(...arguments);this.state=Ce();this.hours=3;this._pull=0;this._chrome=!0;this._closing=!1;this.closeTimer=0;this.chromeTimer=0;this.onPop=()=>{var e;(e=history.state)!=null&&e[et]||this.close(!0)};this.onKey=e=>{var i,s;if(e.key==="Escape")this.close();else if(e.key==="ArrowRight")(i=this.host)==null||i.step(1);else if(e.key==="ArrowLeft")(s=this.host)==null||s.step(-1);else return;e.preventDefault()};this.onVisible=()=>{document.visibilityState==="visible"&&!this._closing&&this.keepAwake()};this.noScroll=e=>e.preventDefault()}connectedCallback(){super.connectedCallback(),this.setAttribute("role","dialog"),this.setAttribute("aria-modal","true"),this.setAttribute("aria-label","Photo slideshow"),this.tabIndex=-1,history.pushState({...history.state??{},[et]:!0},""),window.addEventListener("popstate",this.onPop),window.addEventListener("keydown",this.onKey),document.addEventListener("visibilitychange",this.onVisible),this.addEventListener("touchmove",this.noScroll,{passive:!1}),this.closeTimer=window.setTimeout(()=>this.close(),this.hours*3600*1e3),this.showChrome(),this.keepAwake()}disconnectedCallback(){var e,i;super.disconnectedCallback(),(e=this.untrack)==null||e.call(this),this.untrack=void 0,window.removeEventListener("popstate",this.onPop),window.removeEventListener("keydown",this.onKey),document.removeEventListener("visibilitychange",this.onVisible),this.removeEventListener("touchmove",this.noScroll),clearTimeout(this.closeTimer),clearTimeout(this.chromeTimer),(i=this.wake)==null||i.release().catch(()=>{}),this.wake=void 0}firstUpdated(){this.untrack=Ee(this,{move:(e,i,s)=>{var n;this.axis=s,s==="x"?(n=this.host)==null||n.dragTo(e):this._pull=i>0?i:i/4},end:e=>{var s;let i=this.axis;if(this.axis=void 0,e==="tap")return this.showChrome(!this._chrome);if(i==="x")return(s=this.host)==null?void 0:s.dragEnd(e);if(e==="down")return this.close();this._pull=0}},!0),this.focus()}close(e=!1){var i;this._closing||(this._closing=!0,!e&&((i=history.state)!=null&&i[et])&&history.back(),window.setTimeout(()=>{var s;this.remove(),(s=this.host)==null||s.slideshowClosed()},320))}async keepAwake(){var e;try{this.wake=await((e=navigator.wakeLock)==null?void 0:e.request("screen"))}catch{}}showChrome(e=!0){this._chrome=e,clearTimeout(this.chromeTimer),e&&(this.chromeTimer=window.setTimeout(()=>this._chrome=!1,Ni))}render(){let e=this._pull,i=e>0?Math.max(0,1-e/500):1,s=this.axis!=="y";return b`<div class="backdrop ${s?"settle":""}" style="opacity:${i}">${be(this.state,"cover")}</div>
      <div class="stage ${s?"settle":""}" style="transform:translateY(${e}px) scale(${e>0?1-e/2500:1})">
        ${be(this.state,"contain")}
      </div>
      ${this._chrome?b`<button class="close" aria-label="Close slideshow" @pointerdown=${n=>n.stopPropagation()} @click=${()=>this.close()}>${$.close}</button>`:v}`}updated(){this.toggleAttribute("closing",this._closing)}};ye.properties={state:{attribute:!1},_pull:{state:!0},_chrome:{state:!0},_closing:{state:!0}},ye.styles=[Te,C`
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
    `];customElements.get("homeview-photo-slideshow")||customElements.define("homeview-photo-slideshow",ye);var Bi=1800*1e3,tt=30*1e3,qi=r=>Math.min(300*1e3,10*1e3*2**r),Wi=3e3*1e3,ie=class extends A{constructor(){super(...arguments);this._stage=Ce();this._error="";this.items=[];this.index=-1;this.timer=0;this.settleTimer=0;this.listedAt=0;this.fails=0;this.parked=!1;this.loadedFor="";this.listRun=0;this.listFails=0;this.shown=new $e;this.nav=0;this.dragging=!1;this.onKey=e=>{if(e.key==="Enter"||e.key===" ")this.openSlideshow();else if(e.key==="ArrowRight")this.step(1);else if(e.key==="ArrowLeft")this.step(-1);else return;e.preventDefault()}}static getStubConfig(){return{media:"media-source://media_source/local",interval:30,recursive:!0}}validate(e){let i=K(e.media);if(!i.length||i.some(n=>!n.startsWith("media-source://")))throw new Error("Set media to a media-source:// folder, or a list of them");let s=e.fullscreen_hours;if(s!==void 0&&!(typeof s=="number"&&s>0))throw new Error("Set fullscreen_hours to a number of hours above 0")}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}disconnectedCallback(){var e;super.disconnectedCallback(),clearTimeout(this.timer),this.loadedFor="",(e=this.slideshow)==null||e.close()}connectedCallback(){super.connectedCallback(),this.hass&&this._config&&this.requestUpdate()}firstUpdated(e){super.firstUpdated(e);let i=this.renderRoot.querySelector("ha-card");!i||this.untrack||(this.untrack=Ee(i,{move:s=>this.dragTo(s),end:s=>s==="tap"?this.openSlideshow():this.dragEnd(s)},!1))}updated(e){var i;(i=super.updated)==null||i.call(this,e),this.slideshow&&(this.slideshow.state=this._stage),this.load()}load(){let e=this._config;if(!this.hass||!e||!this.onScreen)return!1;let i=JSON.stringify([K(e.media),!!e.recursive,!!e.shuffle]);return i===this.loadedFor?!1:(this.loadedFor=i,this.listFails=0,this.relist(!0),!0)}async relist(e){var o;let i=this._config,s=this.hass,n=++this.listRun;clearTimeout(this.timer);try{let a=await Rt({callWS:l=>Me(s.callWS(l),tt)},i.media,!!i.recursive);if(n!==this.listRun)return;this.items=i.shuffle?Ht(a):a,this.listedAt=Date.now(),this.listFails=0,this._error=a.length?"":"No pictures in this folder",e&&(this.index=-1,this.shown.clear(),this.ahead=void 0,this.advance())}catch(a){if(n!==this.listRun||!e)return;let l=a;if(this._error=`Cannot open ${K(i.media).join(", ")}: ${l.message??((o=l.error)==null?void 0:o.message)??a}`,!this.isConnected)return;this.timer=window.setTimeout(()=>{this.onScreen?this.relist(!0):this.loadedFor=""},qi(this.listFails++))}}async advance(){if(clearTimeout(this.timer),!this._config||!this.items.length||!this.isConnected||(this.parked=!this.onScreen&&!this.slideshow,this.parked))return;let e=this.nav;Date.now()-this.listedAt>Bi&&await this.relist(!1),e===this.nav&&await this.go(1,!1)}schedule(){clearTimeout(this.timer),!(!this._config||!this.isConnected)&&(this.timer=window.setTimeout(()=>void this.advance(),Math.max(5,this._config.interval??30)*1e3))}unseen(){var i;if(!this.items.length)return;let e=this.items[(this.index+1)%this.items.length];return((i=this.ahead)==null?void 0:i.id)===e?this.ahead:{id:e}}async fetch(e){if(!e.url||Date.now()-(e.at??0)>Wi){e.ready=!1;let s=await Me(this.hass.callWS({type:"media_source/resolve_media",media_content_id:e.id,expires:3600}),tt);e.url=s.url.startsWith("http")?s.url:this.hass.hassUrl(s.url),e.at=Date.now()}let i=new Image;return i.src=e.url,await Me(i.decode(),tt),e.ready=!0,e.url}async prefetch(){let e=this.shown.peek(1)??(this.ahead=this.unseen());if(!(!e||e.ready))try{await this.fetch(e)}catch{}}async go(e,i){let s=++this.nav;for(clearTimeout(this.timer);;){let n=this.shown.peek(e),o=n??(e>0?this.unseen():void 0);if(!o)break;n||(this.index=(this.index+1)%this.items.length);try{let a=await this.fetch(o);if(s!==this.nav)return;n?this.shown.step(e):this.shown.push(o),o===this.ahead&&(this.ahead=void 0),this.fails=0,await this.show(a,i?e:0),this.prefetch();break}catch{if(s!==this.nav)return;if(o===this.ahead&&(this.ahead=void 0),n&&this.shown.drop(o),++this.fails>=Math.min(this.items.length,20))break}}this.settle(),this.schedule()}async show(e,i){clearTimeout(this.settleTimer);let s=this._stage,n=1-s.front,o=[...s.urls];if(o[n]=e,!i){this._stage={urls:o,front:n,drag:0,side:0,still:!1};return}(s.urls[n]!==e||s.side!==i)&&(this._stage={...s,urls:o,side:i,still:!0},await this.painted()),this._stage={urls:o,front:n,drag:0,side:-i,still:!1}}settle(){let e=this._stage;!e.drag&&!e.side||(clearTimeout(this.settleTimer),this._stage={...e,drag:0,still:!1},this.settleTimer=window.setTimeout(()=>this._stage={...this._stage,side:0,still:!0},Y+60))}async painted(){var e,i,s;await this.updateComplete,this.slideshow&&(this.slideshow.state=this._stage,await this.slideshow.updateComplete,(i=(e=this.slideshow.shadowRoot)==null?void 0:e.querySelector("img"))==null||i.getBoundingClientRect()),(s=this.renderRoot.querySelector("img"))==null||s.getBoundingClientRect()}dragTo(e){this.dragging||(this.dragging=!0,this.nav++,clearTimeout(this.timer),clearTimeout(this.settleTimer));let i=e<0?1:-1,s=this.shown.peek(i)??(i>0?this.ahead:void 0),n=s!=null&&s.ready?s.url:"",o=this._stage,a=[...o.urls];n&&(a[1-o.front]=n);let l=i<0?!this.shown.peek(-1):this.items.length<2;this._stage={...o,urls:a,drag:l?e/3:e,side:n?i:0,still:!0}}dragEnd(e){if(this.dragging){if(this.dragging=!1,e==="left"||e==="right"){this.go(e==="left"?1:-1,!0);return}this.settle(),this.schedule()}}step(e){this.items.length&&this.go(e,!0)}openSlideshow(){var i;if(this.slideshow||!this._stage.urls[this._stage.front]||Yt(this))return;let e=document.createElement("homeview-photo-slideshow");e.hours=((i=this._config)==null?void 0:i.fullscreen_hours)??3,e.host=this,e.state=this._stage,this.slideshow=e,document.body.appendChild(e)}slideshowClosed(){var e;this.slideshow=void 0,this.isConnected&&((e=this.renderRoot.querySelector("ha-card"))==null||e.focus({preventScroll:!0}))}resume(){!this.load()&&this.parked&&this.advance()}render(){if(!this._config)return b``;let e=this._config.fit??"cover",i=!!this._stage.urls[this._stage.front];return b`<ha-card
      class="photo ${this.square?"square":""} ${i?"shown":""}"
      role=${i?"button":v}
      tabindex=${i?"0":v}
      aria-label=${i?"Photo frame: open the full-screen slideshow":v}
      @keydown=${this.onKey}
    >
      ${be(this._stage,e)} ${this._error?b`<div class="msg">${this._error}</div>`:v}
    </ha-card>`}renderContent(){return v}};ie.properties={...A.properties,_stage:{state:!0},_error:{state:!0}},ie.editorFields=[{name:"media",label:"Media folders",required:!0,list:!0,helper:"One or more media-source folders, e.g. media-source://media_source/local/photos; the slideshow cycles through all of them. Open Media in the sidebar to find a folder; DLNA, Synology Photos and other media servers HA can browse work too.",selector:{text:{multiple:!0}}},{name:"interval",label:"Seconds per picture",selector:{number:{min:5,max:3600,step:1,mode:"box",unit_of_measurement:"s"}}},{name:"shuffle",selector:{boolean:{}}},{name:"recursive",label:"Include subfolders",selector:{boolean:{}}},{name:"fit",selector:{select:{mode:"dropdown",options:[{value:"cover",label:"Fill"},{value:"contain",label:"Fit whole picture"}]}}},{name:"fullscreen_hours",label:"Full-screen slideshow closes after",helper:"Tap a picture for a full-screen slideshow. Swipe down to close it; otherwise it closes by itself after this long (3 hours by default).",selector:{number:{min:.5,max:24,step:.5,mode:"box",unit_of_measurement:"h"}}}],ie.styles=[z,Te,C`
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
    `];customElements.define("homeview-photo-card",ie);H("homeview-photo-card","HomeView Photo Frame","Slideshow of pictures from a Home Assistant media source.");var Pe=class{constructor(t,e=16e3){this.acc=0;this.n=0;this.pos=0;this.ratio=t/e}push(t){if(this.ratio<=1)return t.slice();let e=[];for(let i=0;i<t.length;i++)this.acc+=t[i],this.n++,this.pos+=1,this.pos>=this.ratio&&(e.push(this.acc/this.n),this.acc=0,this.n=0,this.pos-=this.ratio);return Float32Array.from(e)}},Re=class{constructor(t=1.2,e=7,i=15){this.heard=!1;this.floor=.01;this.sum=0;this.n=0;this.run=0;this.quiet=0;this.frames=0;this.silence=t,this.noSpeech=e,this.max=i}push(t){for(let i of t)this.sum+=i*i,!(++this.n<320)&&(this.frame(Math.sqrt(this.sum/this.n)),this.sum=0,this.n=0);let e=this.frames/50;return this.heard?this.quiet>=this.silence-1e-9||e>=this.max?"end":"listen":e>=Math.min(this.noSpeech,this.max)?"none":"listen"}frame(t){if(this.frames++,t>Math.max(this.floor*3,.006)){this.run+=.02,this.run>=.1&&(this.heard=!0,this.quiet=0);return}this.run=0,this.floor=t<this.floor?t:this.floor+(t-this.floor)*(.02/2),this.heard&&(this.quiet+=.02)}};function ai(r){let t=new Int16Array(r.length);for(let e=0;e<r.length;e++){let i=Math.max(-1,Math.min(1,r[e]));t[e]=i<0?i*32768:i*32767}return t}function Le(r,t){let e=t?new Uint8Array(t.buffer,t.byteOffset,t.byteLength):new Uint8Array(0),i=new Uint8Array(1+e.length);return i[0]=r,i.set(e,1),i}var li=`
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
`;async function ci(r,t,e){let i,s=()=>i==null?void 0:i.getTracks().forEach(o=>o.stop()),n=()=>{if(t.aborted)throw new DOMException("Aborted","AbortError")};try{i=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}),n(),await r.resume(),n();let o=!1,a=f=>{o||e(f)},l,h=()=>{};if(r.audioWorklet){let f=URL.createObjectURL(new Blob([li],{type:"text/javascript"}));try{await r.audioWorklet.addModule(f)}finally{URL.revokeObjectURL(f)}n();let p=new AudioWorkletNode(r,"homeview-recorder");p.port.onmessage=x=>a(x.data),h=()=>p.port.onmessage=null,l=p}else{let f=r.createScriptProcessor(4096,1,1);f.onaudioprocess=p=>a(p.inputBuffer.getChannelData(0)),h=()=>f.onaudioprocess=null,f.connect(r.destination),l=f}let d=r.createMediaStreamSource(i),c=r.createAnalyser();c.fftSize=256,c.smoothingTimeConstant=.6,d.connect(c),d.connect(l);let u=l;return{analyser:c,close(){o||(o=!0,h(),u.disconnect(),d.disconnect(),s())}}}catch(o){throw s(),o}}var ji=16e3,Vi=30,Ki=6,it={idle:"Tap to talk",listening:"Listening",thinking:"Thinking",responding:"Responding",error:"Something went wrong"},se=class extends A{constructor(){super(...arguments);this._phase="idle";this._heard="";this._reply="";this._error="";this._detail="";this._showDetail=!1;this.lastText="";this._typing=!1;this.handlerId=null;this.pending=[];this.audioDone=!1;this.runId=0;this.speaking=!1;this.stopTimer=0;this.raf=0;this.levels=new Float32Array(48);this.t0=performance.now();this.loop=()=>{this.raf=this.draw()?requestAnimationFrame(this.loop):0};this.showDetail=e=>{e.preventDefault(),this._showDetail=!0};this.submit=e=>{e.preventDefault();let i=e.target.elements.namedItem("q");this.ask(i.value),i.value=""}}static getStubConfig(){return{speak:!0}}getGridOptions(){return{columns:12,rows:"auto",min_columns:6,min_rows:3}}getCardSize(){return 5}get square(){return!1}refFrom(e,i){return Math.min(e,i,220)}cardClass(){var i,s;return`voice ${typeof((s=(i=this._config)==null?void 0:i.grid_options)==null?void 0:s.rows)!="number"?"wide":""} ${this.phase()}`}phase(){var i,s,n;let e=(i=this._config)==null?void 0:i.satellite;return e?Dt((n=(s=this.hass)==null?void 0:s.states[e])==null?void 0:n.state):this._phase}micBlocked(){var e;return window.isSecureContext?(e=navigator.mediaDevices)!=null&&e.getUserMedia?null:"unsupported":"insecure"}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){var e;super.disconnectedCallback(),cancelAnimationFrame(this.raf),this.teardown(),this.speaking=!1,this._phase!=="error"&&(this._phase="idle"),this.stopAudio(),(e=this.ctx)==null||e.close(),this.ctx=void 0,this.analyser=void 0}stopAudio(){let e=this.audio;e&&(e.pause(),e.removeAttribute("src"),e.load())}async talk(){var s;if(this._phase==="listening")return this.endAudio();if(this._phase==="thinking"||this._phase==="responding")return;if(this.micBlocked()){this._typing=!0;return}let e=this.ctx??(this.ctx=new AudioContext);this.teardown(),this.reset(),this.lastText="",this.endpointer=new Re,this.resampler=new Pe(e.sampleRate);let i=this.abort=new AbortController;this._phase="listening",this.analyser=void 0;try{let n=await ci(e,i.signal,o=>this.onAudio(o));if(i.signal.aborted)return n.close();this.mic=n,this.analyser=n.analyser,this.stopTimer=window.setTimeout(()=>this.endAudio(),ji),await this.run({start_stage:"stt",end_stage:((s=this._config)==null?void 0:s.speak)===!1?"intent":"tts",input:{sample_rate:16e3,no_vad:!0}})}catch(n){i.signal.aborted||this.fail(n)}}retry(){this.lastText?this.ask(this.lastText):this.talk()}async ask(e){var i;if(e.trim()){this.teardown(),this.reset(),this.lastText=e,this._heard=e,this._phase="thinking";try{await this.run({start_stage:"intent",end_stage:((i=this._config)==null?void 0:i.speak)===!1?"intent":"tts",input:{text:e}})}catch(s){this.fail(s)}}}async run(e){let i=this._config,s=++this.runId,n=await this.hass.connection.subscribeMessage(o=>s===this.runId&&this.onEvent(o),{type:"assist_pipeline/run",...e,...i.pipeline?{pipeline:i.pipeline}:{},...this.conversationId?{conversation_id:this.conversationId}:{}});s===this.runId?this.unsub=n:await n().catch(()=>{})}onEvent(e){var n,o,a,l,h,d,c,u,f;let i=e.data??{};if(e.type==="run-start"){this.handlerId=((n=i.runner_data)==null?void 0:n.stt_binary_handler_id)??null;for(let p of this.pending)this.sendPcm(p);this.pending=[],this.audioDone&&this.handlerId!==null&&((a=(o=this.hass)==null?void 0:o.connection.socket)==null||a.send(Le(this.handlerId))),this.audioDone=!1}if((e.type==="stt-vad-end"||e.type==="stt-end")&&this.endAudio(),e.type==="stt-end"&&(this._heard=((l=i.stt_output)==null?void 0:l.text)??""),e.type==="intent-end"){let p=i.intent_output;this.conversationId=(p==null?void 0:p.conversation_id)??this.conversationId,this._reply=((c=(d=(h=p==null?void 0:p.response)==null?void 0:h.speech)==null?void 0:d.plain)==null?void 0:c.speech)??""}e.type==="tts-end"&&((u=i.tts_output)!=null&&u.url)&&this.play(i.tts_output.url),e.type==="error"&&this.fail(i);let s=zt(this._phase,e);if(e.type==="run-end"){(f=this.unsub)==null||f.call(this),this.unsub=void 0,this.speaking||(this._phase=this._phase==="error"?"error":"idle");return}this._phase=s}onAudio(e){var o;if(this._phase!=="listening"||!this.resampler)return;let i=this.resampler.push(e),s=ai(i);this.handlerId===null?this.pending.push(s):this.sendPcm(s);let n=(o=this.endpointer)==null?void 0:o.push(i);n==="end"?this.endAudio():n==="none"&&this.noSpeech()}noSpeech(){this.fail({code:"stt-no-text-recognized",message:"No speech was detected"})}sendPcm(e){var i,s;this.handlerId!==null&&((s=(i=this.hass)==null?void 0:i.connection.socket)==null||s.send(Le(this.handlerId,e)))}endAudio(){var e,i;if(clearTimeout(this.stopTimer),!this.mic&&this._phase==="listening"){this._phase="idle",this.teardown();return}this.mic&&(this.handlerId!==null?(i=(e=this.hass)==null?void 0:e.connection.socket)==null||i.send(Le(this.handlerId)):this.audioDone=!0),this._phase==="listening"&&(this._phase="thinking"),this.stopMic()}stopMic(){var e;(e=this.mic)==null||e.close(),this.mic=void 0,this.handlerId=null}play(e){var d;let i=e.startsWith("http")?e:this.hass.hassUrl(e);(d=this.audio)==null||d.pause();let s=new Audio(i);this.audio=s;try{this.ctx??(this.ctx=new AudioContext);let c=this.ctx.createMediaElementSource(s);this.analyser??(this.analyser=this.ctx.createAnalyser()),this.analyser.fftSize=256,c.connect(this.analyser),this.analyser.connect(this.ctx.destination),this.ctx.resume()}catch{}this._phase="responding",this.speaking=!0;let n=!1,o=0,a=0;s.onplaying=()=>{n=!0,a=0};let l=window.setInterval(()=>{this.audio!==s||!this.speaking?h():s.currentTime!==o?(o=s.currentTime,a=0):++a>=(n?Ki:Vi)&&h(!0)},1e3),h=(c=!1)=>{if(clearInterval(l),!(this.audio!==s||!this.speaking)){if(this.speaking=!1,!c){this._phase="idle";return}this.stopAudio(),this.fail({code:"tts-failed",message:"The spoken reply stopped before it finished"})}};s.onended=()=>h(),s.onerror=()=>h(),s.play().catch(()=>h())}fail(e){let{text:i,detail:s}=Ft(e);console.warn("HomeView voice:",s),this._error=i,this._detail=s,this._phase="error",this.teardown()}reset(){var e;this._heard="",this._reply="",this._error="",this._detail="",this._showDetail=!1,this.pending=[],this.audioDone=!1,this.handlerId=null,this.speaking=!1,(e=this.audio)==null||e.pause()}async teardown(){var i;this.runId++,(i=this.abort)==null||i.abort(),this.abort=void 0,clearTimeout(this.stopTimer),this.stopMic();let e=this.unsub;this.unsub=void 0,await(e==null?void 0:e().catch(()=>{}))}draw(){var w,m;let e=(w=this.renderRoot)==null?void 0:w.querySelector("canvas.viz");if(!e)return!0;let i=Math.min(window.devicePixelRatio||1,2),s=e.clientWidth,n=e.clientHeight;if(!s||!n)return!1;(e.width!==Math.round(s*i)||e.height!==Math.round(n*i))&&(e.width=Math.round(s*i),e.height=Math.round(n*i));let o=e.getContext("2d");o.setTransform(i,0,0,i,0,0),o.clearRect(0,0,s,n);let a=this.phase(),l=(performance.now()-this.t0)/1e3,h=this.levels.length,d=a!=="idle"&&a!=="error",c=matchMedia("(prefers-reduced-motion: reduce)").matches,u=this.analyser?new Uint8Array(this.analyser.frequencyBinCount):null,f=!!u&&(a==="listening"||a==="responding")&&!((m=this._config)!=null&&m.satellite);f&&this.analyser.getByteFrequencyData(u);for(let g=0;g<h;g++){let y=0;if(f)y=(u[Math.min(u.length-1,2+Math.floor(Math.abs(g-h/2)/(h/2)*40))]/255)**1.4;else if(a==="listening"||a==="responding")y=.25+.2*Math.sin(l*5+g*.6)*Math.sin(l*1.7+g*.21);else if(a==="thinking"){let k=g/h*Math.PI*2;y=.12+.3*Math.max(0,Math.cos(k-l*3))**6}else y=.06;c&&(y=Math.min(y,.15)),Math.abs(y-this.levels[g])>.002&&(d=!0),this.levels[g]+=(y-this.levels[g])*.25}let p=s/2,x=n/2,M=Math.min(s,n)*.34,P=o.createRadialGradient(p,x,M*.1,p,x,M*1.25),T=a==="error"?"255 120 110":a==="listening"?"255 255 255":"255 236 210";P.addColorStop(0,`rgb(${T} / ${a==="idle"?.22:.42})`),P.addColorStop(1,`rgb(${T} / 0)`),o.fillStyle=P,o.beginPath(),o.arc(p,x,M*1.25,0,Math.PI*2),o.fill(),o.strokeStyle="rgb(255 255 255 / 0.95)",o.lineCap="round",o.lineWidth=Math.max(2,M*.06),o.shadowColor="rgb(40 30 20 / 0.25)",o.shadowBlur=4;for(let g=0;g<h;g++){let y=g/h*Math.PI*2-Math.PI/2,k=M*(.08+this.levels[g]*.9),S=M*.78;o.beginPath(),o.moveTo(p+Math.cos(y)*S,x+Math.sin(y)*S),o.lineTo(p+Math.cos(y)*(S+k),x+Math.sin(y)*(S+k)),o.stroke()}return d}renderContent(){var c;let e=this._config,i=this.phase(),s=!e.satellite&&this.micBlocked(),n=e.satellite?(c=this.hass)==null?void 0:c.states[e.satellite]:void 0,o=e.satellite?n?`${n.attributes.friendly_name??e.satellite}: ${i==="idle"?"Ready":it[i]}`:`Satellite not found: ${e.satellite}`:i==="error"?this._error||it.error:i==="idle"&&s?"Type a request":it[i],a=i==="error"&&!e.satellite,[l,h]=i==="listening"?["Stop listening",$.stop]:a?["Try again",$.retry]:["Talk to Assist",$.mic],d=a&&this._showDetail;return b`<div class="voice-wrap ${d?"covered":""}">
      <div class="head ink">
        <span class="title">${e.name??"Assist"}</span>
        ${a?b`<span class="sub status" aria-live="polite" role="button" tabindex="0" title=${this._detail} @click=${this.showDetail} @keydown=${u=>(u.key==="Enter"||u.key===" ")&&this.showDetail(u)}>${o}</span>`:b`<span class="sub status" aria-live="polite">${o}</span>`}
      </div>
      <button class="orb" ?disabled=${!!e.satellite} aria-label=${l} @click=${()=>void(a?this.retry():this.talk())}>
        <canvas class="viz" aria-hidden="true"></canvas>
        <span class="mic">${h}</span>
      </button>
      <div class="lines ink" aria-live="polite">
        ${this._heard?b`<div class="heard">&ldquo;${this._heard}&rdquo;</div>`:v}
        ${this._reply?b`<div class="reply">${this._reply}</div>`:v}
        ${a&&this._detail?b`<button class="more" @click=${this.showDetail}><span>Details</span></button>`:v}
        ${s==="insecure"&&!this._heard&&!this._reply&&!a?b`<div class="notice">The microphone needs Home Assistant over HTTPS. Type instead, or see the README for options.</div>`:v}
      </div>
      ${e.satellite?v:this._typing||s?b`<form class="type" @submit=${this.submit}>
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
    </div>`}resume(){!this.raf&&this.isConnected&&this.loop()}updated(e){var i,s;(i=super.updated)==null||i.call(this,e),e.has("_typing")&&this._typing&&((s=this.renderRoot.querySelector("input[name=q]"))==null||s.focus()),!this.raf&&this.isConnected&&this.loop()}};se.properties={...A.properties,_phase:{state:!0},_heard:{state:!0},_reply:{state:!0},_error:{state:!0},_detail:{state:!0},_showDetail:{state:!0},_typing:{state:!0}},se.editorFields=[{name:"name",selector:{text:{}}},{name:"pipeline",label:"Assist pipeline",helper:"Defaults to the preferred pipeline",selector:{assist_pipeline:{}}},{name:"satellite",label:"Voice satellite (optional)",helper:"Show this assist_satellite's state instead of using this device's microphone",selector:{entity:{filter:{domain:"assist_satellite"}}}},{name:"speak",label:"Play spoken replies",selector:{boolean:{}}}],se.styles=[z,C`
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
    `];customElements.define("homeview-voice-card",se);H("homeview-voice-card","HomeView Voice","Talk to Home Assistant Assist with an audio-reactive liquid-glass visualizer.");customElements.get("homeview-card-editor")||customElements.define("homeview-card-editor",fe);console.info("%c HOMEVIEW %c 0.1.4 ","background:#928980;color:#fff;border-radius:3px 0 0 3px","background:#2b241d;color:#fff;border-radius:0 3px 3px 0");
