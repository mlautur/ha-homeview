var Ge=globalThis,je=Ge.ShadowRoot&&(Ge.ShadyCSS===void 0||Ge.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,wt=Symbol(),ti=new WeakMap,ke=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==wt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(je&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=ti.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&ti.set(e,i))}return i}toString(){return this.cssText}},ii=r=>new ke(typeof r=="string"?r:r+"",void 0,wt),$=(r,...i)=>{let e=r.length===1?r[0]:i.reduce((t,s,n)=>t+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1],r[0]);return new ke(e,r,wt)},si=(r,i)=>{if(je)r.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),s=Ge.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,r.appendChild(t)}},xt=je?r=>r:r=>r instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return ii(e)})(r):r;var{is:Ps,defineProperty:Rs,getOwnPropertyDescriptor:Os,getOwnPropertyNames:Ls,getOwnPropertySymbols:zs,getPrototypeOf:Ds}=Object,J=globalThis,ri=J.trustedTypes,Is=ri?ri.emptyScript:"",_t=J.reactiveElementPolyfillSupport,$e=(r,i)=>r,kt={toAttribute(r,i){switch(i){case Boolean:r=r?Is:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,i){let e=r;switch(i){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ai=(r,i)=>!Ps(r,i),ni={attribute:!0,type:String,converter:kt,reflect:!1,useDefault:!1,hasChanged:ai};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),J.litPropertyMetadata??(J.litPropertyMetadata=new WeakMap);var W=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??(this.l=[])).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=ni){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(i,t,e);s!==void 0&&Rs(this.prototype,i,s)}}static getPropertyDescriptor(i,e,t){let{get:s,set:n}=Os(this.prototype,i)??{get(){return this[e]},set(a){this[e]=a}};return{get:s,set(a){let o=s==null?void 0:s.call(this);n==null||n.call(this,a),this.requestUpdate(i,o,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??ni}static _$Ei(){if(this.hasOwnProperty($e("elementProperties")))return;let i=Ds(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty($e("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($e("properties"))){let e=this.properties,t=[...Ls(e),...zs(e)];for(let s of t)this.createProperty(s,e[s])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let s of t)e.unshift(xt(s))}else i!==void 0&&e.push(xt(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var i;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(i=this.constructor.l)==null||i.forEach(e=>e(this))}addController(i){var e;(this._$EO??(this._$EO=new Set)).add(i),this.renderRoot!==void 0&&this.isConnected&&((e=i.hostConnected)==null||e.call(i))}removeController(i){var e;(e=this._$EO)==null||e.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return si(i,this.constructor.elementStyles),i}connectedCallback(){var i;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(i=this._$EO)==null||i.forEach(e=>{var t;return(t=e.hostConnected)==null?void 0:t.call(e)})}enableUpdating(i){}disconnectedCallback(){var i;(i=this._$EO)==null||i.forEach(e=>{var t;return(t=e.hostDisconnected)==null?void 0:t.call(e)})}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){var n;let t=this.constructor.elementProperties.get(i),s=this.constructor._$Eu(i,t);if(s!==void 0&&t.reflect===!0){let a=(((n=t.converter)==null?void 0:n.toAttribute)!==void 0?t.converter:kt).toAttribute(e,t.type);this._$Em=i,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(i,e){var n,a;let t=this.constructor,s=t._$Eh.get(i);if(s!==void 0&&this._$Em!==s){let o=t.getPropertyOptions(s),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:kt;this._$Em=s;let c=l.fromAttribute(e,o.type);this[s]=c??((a=this._$Ej)==null?void 0:a.get(s))??c,this._$Em=null}}requestUpdate(i,e,t,s=!1,n){var a;if(i!==void 0){let o=this.constructor;if(s===!1&&(n=this[i]),t??(t=o.getPropertyOptions(i)),!((t.hasChanged??ai)(n,e)||t.useDefault&&t.reflect&&n===((a=this._$Ej)==null?void 0:a.get(i))&&!this.hasAttribute(o._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:s,wrapped:n},a){t&&!(this._$Ej??(this._$Ej=new Map)).has(i)&&(this._$Ej.set(i,a??e??this[i]),n!==!0||a!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),s===!0&&this._$Em!==i&&(this._$Eq??(this._$Eq=new Set)).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[n,a]of this._$Ep)this[n]=a;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[n,a]of s){let{wrapped:o}=a,l=this[n];o!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,a,l)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),(t=this._$EO)==null||t.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(e)):this._$EM()}catch(s){throw i=!1,this._$EM(),s}i&&this._$AE(e)}willUpdate(i){}_$AE(i){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostUpdated)==null?void 0:s.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(i){}firstUpdated(i){}};W.elementStyles=[],W.shadowRootOptions={mode:"open"},W[$e("elementProperties")]=new Map,W[$e("finalized")]=new Map,_t==null||_t({ReactiveElement:W}),(J.reactiveElementVersions??(J.reactiveElementVersions=[])).push("2.1.2");var Ce=globalThis,oi=r=>r,Ve=Ce.trustedTypes,li=Ve?Ve.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ct="$lit$",K=`lit$${Math.random().toFixed(9).slice(2)}$`,Et="?"+K,Hs=`<${Et}>`,se=document,Ee=()=>se.createComment(""),Me=r=>r===null||typeof r!="object"&&typeof r!="function",Mt=Array.isArray,mi=r=>Mt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",$t=`[ 	
\f\r]`,Se=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ci=/-->/g,di=/>/g,te=RegExp(`>|${$t}(?:([^\\s"'>=/]+)(${$t}*=${$t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),hi=/'/g,pi=/"/g,fi=/^(?:script|style|textarea|title)$/i,Tt=r=>(i,...e)=>({_$litType$:r,strings:i,values:e}),p=Tt(1),w=Tt(2),Vr=Tt(3),re=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),ui=new WeakMap,ie=se.createTreeWalker(se,129);function gi(r,i){if(!Mt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return li!==void 0?li.createHTML(i):i}var vi=(r,i)=>{let e=r.length-1,t=[],s,n=i===2?"<svg>":i===3?"<math>":"",a=Se;for(let o=0;o<e;o++){let l=r[o],c,h,d=-1,u=0;for(;u<l.length&&(a.lastIndex=u,h=a.exec(l),h!==null);)u=a.lastIndex,a===Se?h[1]==="!--"?a=ci:h[1]!==void 0?a=di:h[2]!==void 0?(fi.test(h[2])&&(s=RegExp("</"+h[2],"g")),a=te):h[3]!==void 0&&(a=te):a===te?h[0]===">"?(a=s??Se,d=-1):h[1]===void 0?d=-2:(d=a.lastIndex-h[2].length,c=h[1],a=h[3]===void 0?te:h[3]==='"'?pi:hi):a===pi||a===hi?a=te:a===ci||a===di?a=Se:(a=te,s=void 0);let f=a===te&&r[o+1].startsWith("/>")?" ":"";n+=a===Se?l+Hs:d>=0?(t.push(c),l.slice(0,d)+Ct+l.slice(d)+K+f):l+K+(d===-2?o:f)}return[gi(r,n+(r[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},Te=class r{constructor({strings:i,_$litType$:e},t){let s;this.parts=[];let n=0,a=0,o=i.length-1,l=this.parts,[c,h]=vi(i,e);if(this.el=r.createElement(c,t),ie.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=ie.nextNode())!==null&&l.length<o;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(Ct)){let u=h[a++],f=s.getAttribute(d).split(K),g=/([.?@])?(.*)/.exec(u);l.push({type:1,index:n,name:g[2],strings:f,ctor:g[1]==="."?Ke:g[1]==="?"?Ye:g[1]==="@"?Xe:ae}),s.removeAttribute(d)}else d.startsWith(K)&&(l.push({type:6,index:n}),s.removeAttribute(d));if(fi.test(s.tagName)){let d=s.textContent.split(K),u=d.length-1;if(u>0){s.textContent=Ve?Ve.emptyScript:"";for(let f=0;f<u;f++)s.append(d[f],Ee()),ie.nextNode(),l.push({type:2,index:++n});s.append(d[u],Ee())}}}else if(s.nodeType===8)if(s.data===Et)l.push({type:2,index:n});else{let d=-1;for(;(d=s.data.indexOf(K,d+1))!==-1;)l.push({type:7,index:n}),d+=K.length-1}n++}}static createElement(i,e){let t=se.createElement("template");return t.innerHTML=i,t}};function ne(r,i,e=r,t){var a,o;if(i===re)return i;let s=t!==void 0?(a=e._$Co)==null?void 0:a[t]:e._$Cl,n=Me(i)?void 0:i._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((o=s==null?void 0:s._$AO)==null||o.call(s,!1),n===void 0?s=void 0:(s=new n(r),s._$AT(r,e,t)),t!==void 0?(e._$Co??(e._$Co=[]))[t]=s:e._$Cl=s),s!==void 0&&(i=ne(r,s._$AS(r,i.values),s,t)),i}var We=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,s=((i==null?void 0:i.creationScope)??se).importNode(e,!0);ie.currentNode=s;let n=ie.nextNode(),a=0,o=0,l=t[0];for(;l!==void 0;){if(a===l.index){let c;l.type===2?c=new de(n,n.nextSibling,this,i):l.type===1?c=new l.ctor(n,l.name,l.strings,this,i):l.type===6&&(c=new Je(n,this,i)),this._$AV.push(c),l=t[++o]}a!==(l==null?void 0:l.index)&&(n=ie.nextNode(),a++)}return ie.currentNode=se,s}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},de=class r{get _$AU(){var i;return((i=this._$AM)==null?void 0:i._$AU)??this._$Cv}constructor(i,e,t,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&(i==null?void 0:i.nodeType)===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=ne(this,i,e),Me(i)?i===m||i==null||i===""?(this._$AH!==m&&this._$AR(),this._$AH=m):i!==this._$AH&&i!==re&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):mi(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==m&&Me(this._$AH)?this._$AA.nextSibling.data=i:this.T(se.createTextNode(i)),this._$AH=i}$(i){var n;let{values:e,_$litType$:t}=i,s=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=Te.createElement(gi(t.h,t.h[0]),this.options)),t);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(e);else{let a=new We(s,this),o=a.u(this.options);a.p(e),this.T(o),this._$AH=a}}_$AC(i){let e=ui.get(i.strings);return e===void 0&&ui.set(i.strings,e=new Te(i)),e}k(i){Mt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let n of i)s===e.length?e.push(t=new r(this.O(Ee()),this.O(Ee()),this,this.options)):t=e[s],t._$AI(n),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(i=this._$AA.nextSibling,e){var t;for((t=this._$AP)==null?void 0:t.call(this,!1,!0,e);i!==this._$AB;){let s=oi(i).nextSibling;oi(i).remove(),i=s}}setConnected(i){var e;this._$AM===void 0&&(this._$Cv=i,(e=this._$AP)==null||e.call(this,i))}},ae=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,s,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=i,this.name=e,this._$AM=s,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=m}_$AI(i,e=this,t,s){let n=this.strings,a=!1;if(n===void 0)i=ne(this,i,e,0),a=!Me(i)||i!==this._$AH&&i!==re,a&&(this._$AH=i);else{let o=i,l,c;for(i=n[0],l=0;l<n.length-1;l++)c=ne(this,o[t+l],e,l),c===re&&(c=this._$AH[l]),a||(a=!Me(c)||c!==this._$AH[l]),c===m?i=m:i!==m&&(i+=(c??"")+n[l+1]),this._$AH[l]=c}a&&!s&&this.j(i)}j(i){i===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},Ke=class extends ae{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===m?void 0:i}},Ye=class extends ae{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==m)}},Xe=class extends ae{constructor(i,e,t,s,n){super(i,e,t,s,n),this.type=5}_$AI(i,e=this){if((i=ne(this,i,e,0)??m)===re)return;let t=this._$AH,s=i===m&&t!==m||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,n=i!==m&&(t===m||s);s&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,i):this._$AH.handleEvent(i)}},Je=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){ne(this,i)}},bi={M:Ct,P:K,A:Et,C:1,L:vi,R:We,D:mi,V:ne,I:de,H:ae,N:Ye,U:Xe,B:Ke,F:Je},St=Ce.litHtmlPolyfillSupport;St==null||St(Te,de),(Ce.litHtmlVersions??(Ce.litHtmlVersions=[])).push("3.3.3");var yi=(r,i,e)=>{let t=(e==null?void 0:e.renderBefore)??i,s=t._$litPart$;if(s===void 0){let n=(e==null?void 0:e.renderBefore)??null;t._$litPart$=s=new de(i.insertBefore(Ee(),n),n,void 0,e??{})}return s._$AI(r),s};var oe=globalThis,D=class extends W{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let i=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=i.firstChild),i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=yi(e,this.renderRoot,this.renderOptions)}connectedCallback(){var i;super.connectedCallback(),(i=this._$Do)==null||i.setConnected(!0)}disconnectedCallback(){var i;super.disconnectedCallback(),(i=this._$Do)==null||i.setConnected(!1)}render(){return re}},wi;D._$litElement$=!0,D.finalized=!0,(wi=oe.litElementHydrateSupport)==null||wi.call(oe,{LitElement:D});var At=oe.litElementPolyfillSupport;At==null||At({LitElement:D});(oe.litElementVersions??(oe.litElementVersions=[])).push("4.2.2");function H(r,i,e={}){r.dispatchEvent(new CustomEvent(i,{detail:e,bubbles:!0,composed:!0}))}function Ae(r){history.pushState(null,"",r),H(window,"location-changed",{replace:!1})}var O=r=>r.split(".")[0];function Ze(r,i){var s,n,a,o,l;let e=(s=r.entities)==null?void 0:s[i],t=(e==null?void 0:e.area_id)??(e!=null&&e.device_id?(a=(n=r.devices)==null?void 0:n[e.device_id])==null?void 0:a.area_id:void 0);return t?(l=(o=r.areas)==null?void 0:o[t])==null?void 0:l.name:void 0}function N(r,i){var e;return((e=r.states[i])==null?void 0:e.attributes.friendly_name)??i}var A=r=>!r||r.state==="unavailable"||r.state==="unknown";function L(r,i,e){let t=window;t.customCards??(t.customCards=[]),t.customCards.push({type:r,name:i,description:e,preview:!0})}var Fs=r=>{var i;return r.media_class==="image"||!!((i=r.media_content_type)!=null&&i.startsWith("image/"))};function Pt(r){let i=r.attributes;return typeof i.temperature=="number"?{mode:"single",value:i.temperature}:typeof i.target_temp_low=="number"&&typeof i.target_temp_high=="number"?{mode:"dual",low:i.target_temp_low,high:i.target_temp_high}:{mode:"none"}}function xi(r,i,e,t){let s=Math.round(r/i)*i;return+Math.min(t,Math.max(e,s)).toFixed(i<1?1:0)}function _i(r){let i=r.attributes;if(i.hvac_action==="cooling")return"high";if(i.hvac_action==="heating")return"low";let e=i.current_temperature;return typeof e=="number"&&typeof i.target_temp_low=="number"&&typeof i.target_temp_high=="number"&&Math.abs(e-i.target_temp_high)<Math.abs(e-i.target_temp_low)?"high":"low"}function Rt(r,i){switch(r){case"media_player":return i==="playing";case"lock":return i!=="locked"&&i!=="unlocking";case"cover":return i==="open"||i==="opening";case"scene":return!1;default:return i==="on"}}function ki(r,i){switch(r){case"lock":return i==="locked"?["lock","unlock"]:["lock","lock"];case"scene":return["scene","turn_on"];case"script":return i==="on"?["script","turn_off"]:["script","turn_on"];case"cover":return["cover","toggle"];case"media_player":return i==="playing"||i==="paused"?["media_player","media_play_pause"]:null;case"light":case"switch":case"fan":case"input_boolean":return[r,"toggle"];default:return["homeassistant","toggle"]}}function $i(r,i,e){let t=i+e/60;return{h:(r%12+t/60)*30,m:t*6,s:e*6}}function Ot(r,i=new Date){if(!r)return{h:i.getHours(),m:i.getMinutes(),s:i.getSeconds(),ms:i.getMilliseconds()};let e=new Intl.DateTimeFormat("en-GB",{timeZone:r,hour:"numeric",minute:"numeric",second:"numeric",hourCycle:"h23"}).formatToParts(i),t=s=>{var n;return+(((n=e.find(a=>a.type===s))==null?void 0:n.value)??0)};return{h:t("hour"),m:t("minute"),s:t("second"),ms:i.getMilliseconds()}}function Si(r,i,e,t){let s=e==="system"?void 0:i,n=e==="12"?"h12":e==="24"?"h23":void 0;return{time:new Intl.DateTimeFormat(s,{hour:"numeric",minute:"2-digit",hourCycle:n,timeZone:t}).formatToParts(r).filter(l=>l.type!=="dayPeriod").map(l=>l.value).join("").replace(/[\s\u202f]+/g," ").trim(),date:r.toLocaleDateString(s,{weekday:"long",month:"long",day:"numeric",timeZone:t})}}function le(r){return(Array.isArray(r)?r:[r]).filter(e=>typeof e=="string").map(e=>e.trim()).filter(Boolean)}async function Ci(r,i,e){let t=new Set,s=le(i).map(o=>[o,0]),n=0,a;for(;s.length&&t.size<5e4;){let[o,l]=s.shift(),c;try{c=await r.callWS({type:"media_source/browse_media",media_content_id:o})}catch(h){if(l>0)throw h;a??(a=h);continue}l===0&&n++;for(let h of c.children??[])if(Fs(h)?t.add(h.media_content_id):e&&h.can_expand&&l<3&&s.push([h.media_content_id,l+1]),t.size>=5e4)break}if(!n&&a)throw a;return[...t]}function G(r,i){let e,t=new Promise((s,n)=>{e=setTimeout(()=>n(new Error("Home Assistant did not answer")),i)});return Promise.race([r,t]).finally(()=>clearTimeout(e))}function Ei(r,i){let e={...r};for(let t of i)t in e&&!Array.isArray(e[t])&&(e[t]=le(e[t]));return e}function Mi(r,i){let e={...r};for(let t of i){if(!(t in e))continue;let s=e[t];if(Array.isArray(s)&&s.some(a=>typeof a!="string"||!a.trim()))continue;let n=le(s);n.length?e[t]=n.length===1?n[0]:n:delete e[t]}return e}function Ti(r,i,e){let t=Math.abs(r),s=Math.abs(i);if(t<10&&s<10)return e<600?"tap":null;let n=Math.max(t,s)/Math.max(e,1)>.5;return t>s*1.2&&(t>=60||n&&t>=25)?r<0?"left":"right":s>t*1.2&&(s>=90||n&&s>=30)?i<0?"up":"down":null}var Qe=class{constructor(i=100){this.list=[];this.pos=-1;this.max=i}peek(i){return this.list[this.pos+i]}step(i){let e=this.peek(i);return e!==void 0&&(this.pos+=i),e}push(i){this.list.splice(this.pos+1,1/0,i),this.list.length>this.max&&this.list.shift(),this.pos=this.list.length-1}drop(i){let e=this.list.indexOf(i);e<0||(this.list.splice(e,1),e<=this.pos&&this.pos--)}clear(){this.list=[],this.pos=-1}};function Ai(r,i=Math.random){let e=r.slice();for(let t=e.length-1;t>0;t--){let s=Math.floor(i()*(t+1));[e[t],e[s]]=[e[s],e[t]]}return e}function Pi(r,i){switch(i.type){case"run-start":return r==="idle"?"listening":r;case"stt-vad-end":case"stt-end":case"intent-start":return"thinking";case"tts-start":case"tts-end":return"responding";case"error":return"error";default:return r}}function Ns(r){return r==="NotAllowedError"||r==="SecurityError"?"Microphone access was denied":r==="NotFoundError"?"No microphone found":r==="stt-no-text-recognized"?"Didn't catch that":r==="pipeline-not-found"?"Assist pipeline not found":r==="timeout"?"Assist timed out":r.startsWith("wake")?"Wake word detection failed":r.startsWith("stt")?"Couldn't recognize speech":r.startsWith("intent")?"Couldn't handle the request":r.startsWith("tts")?"Couldn't speak the reply":"Something went wrong"}function Ri(r){let i=r??{},e=typeof i.code=="string"?i.code:typeof i.name=="string"?i.name:"",t=typeof i.message=="string"&&i.message||e||String(r);return{text:Ns(e),detail:t}}function Lt(r){switch(r){case"listening":return"listening";case"processing":return"thinking";case"responding":return"responding";case void 0:case"unavailable":return"error";default:return"idle"}}var ce=r=>r.state==="idle"&&r.attributes.media_title?"paused":r.state;function Oi(r,i){let e=r.attributes,t=ce(r),s=t==="playing"||t==="paused";if(!s||!e.media_title)return{title:i,sub:s?Z(t):"Not playing"};let n=e.media_artist||e.media_album_artist||e.app_name||"";return{title:String(e.media_title),sub:t==="paused"?n?`Paused \xB7 ${n}`:"Paused":String(n||i)}}var Z=r=>r&&r[0].toUpperCase()+r.slice(1).replace(/_/g," "),Us=1,Bs=4;function Li(r){let i=r??0;return i&Us?"daily":i&Bs?"twice_daily":void 0}function zi(r){if(!(r!=null&&r.length))return{};let i=c=>typeof c=="number"&&isFinite(c)?c:void 0,e=r[0].is_daytime===void 0,t=e?r.slice(0,1):r.slice(0,2),s=t.map(c=>i(c.precipitation_probability)).filter(c=>c!==void 0),n=t.map(c=>i(c.precipitation)).filter(c=>c!==void 0),a={rain:s.length?Math.max(...s):void 0,amount:n.length?n.reduce((c,h)=>c+h,0):void 0};if(e)return{high:i(r[0].temperature),low:i(r[0].templow),...a};let o=t.find(c=>c.is_daytime),l=t.find(c=>!c.is_daytime);return{high:i(o==null?void 0:o.temperature),low:i((l==null?void 0:l.temperature)??(l==null?void 0:l.templow)),...a}}function Di(r,i){if(!(r!=null&&r.length)||i<1)return[];let e=s=>typeof s=="number"&&isFinite(s)?s:void 0;if(r[0].is_daytime===void 0)return r.slice(0,i).map(s=>({datetime:s.datetime,condition:s.condition,high:e(s.temperature),low:e(s.templow),rain:e(s.precipitation_probability)}));let t=new Map;for(let s of r){let n=B(s.datetime),a=isNaN(n.getTime())?s.datetime:`${n.getFullYear()}-${n.getMonth()}-${n.getDate()}`;t.set(a,[...t.get(a)??[],s])}return[...t.values()].slice(0,i).map(s=>{let n=s.find(l=>l.is_daytime),a=s.find(l=>!l.is_daytime),o=s.map(l=>e(l.precipitation_probability)).filter(l=>l!==void 0);return{datetime:(n??s[0]).datetime,condition:(n??s[0]).condition,high:e(n==null?void 0:n.temperature),low:e((a==null?void 0:a.temperature)??(a==null?void 0:a.templow)),rain:o.length?Math.max(...o):void 0}})}var zt={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"},qs={"clear-night":"Clear",partlycloudy:"Partly Cloudy","lightning-rainy":"Thunderstorms","snowy-rainy":"Sleet","windy-variant":"Windy",exceptional:"Alert",rainy:"Rain",snowy:"Snow"},Ii=r=>qs[r]??Z(r),Gs=r=>r.start.length===10;function B(r){if(r.length===10){let[i,e,t]=r.split("-").map(Number);return new Date(i,e-1,t)}return new Date(r)}var et=r=>new Date(r.getFullYear(),r.getMonth(),r.getDate()),he=r=>{var i;return((i=r.summary)==null?void 0:i.trim())||"Busy"};function tt(r,i,e){return r.filter(t=>B(t.end)>i).sort((t,s)=>B(t.start).getTime()-B(s.start).getTime()||he(t).localeCompare(he(s))).slice(0,e)}function Hi(r,i,e){let t=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1),s=tt(r,i,1/0);return{today:s.filter(n=>B(n.start)<t).length,events:s.slice(0,e)}}function Dt(r,i){let e=B(r.start);return Math.round((et(e<i?i:e).getTime()-et(i).getTime())/864e5)}var It=(r,i,e)=>new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(Dt(r,i),"day");function it(r,i,e){let t=B(r.start),s=et(t<i?i:t),n=s.getTime()===et(i).getTime(),a=s.toLocaleDateString(e,{weekday:"short"});return{label:n?"TODAY":a.toUpperCase(),day:s.getDate(),today:n,weekday:a,month:s.toLocaleDateString(e,{month:"short"}).toUpperCase(),key:`${s.getFullYear()}-${s.getMonth()}-${s.getDate()}`}}function Pe(r,i){if(Gs(r))return"All day";let e=t=>B(t).toLocaleTimeString(i,{hour:"numeric",minute:"2-digit"});return`${e(r.start)} \u2013 ${e(r.end)}`}function Fi(r,i,e){return`${r}${r.includes("?")?"&":"?"}hv=${Math.floor(i/(e*1e3))}`}var st=r=>Math.min(20,Math.max(0,Number(r)||0));function rt(r){return Array.isArray(r)?r.flatMap(i=>{let e=typeof i=="string"?{entity:i}:i;return!e||typeof e.entity!="string"||!e.entity.startsWith("camera.")?[]:[{entity:e.entity,name:typeof e.name=="string"?e.name:void 0}]}):[]}var nt=(r,i,e)=>r+i>=0&&r+i<e?r+i:null,Ni=r=>r<=2?Math.max(1,r):r===4?2:3,Ht=["cleaning","paused","returning"];function Ft(r,i){let t={docked:"Docked",cleaning:"Cleaning",paused:"Paused",returning:"Returning to dock",idle:"Idle",error:"Error",unavailable:"Offline"}[r]??Z(r);return i===void 0||r==="unavailable"?t:`${t} \xB7 ${Math.round(i)}%`}function Ui(r){return r.map(i=>Number(i.split("_").pop())).filter(i=>Number.isInteger(i))}var Y={PAUSE:1,SEEK:2,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS:16,NEXT:32,PLAY:16384,SHUFFLE:32768,REPEAT:262144};function Bi(r,i){let e=r.attributes,t=Number(e.media_duration);if(!(t>0))return null;let s=Number(e.media_position);isFinite(s)||(s=0);let n=Date.parse(e.media_position_updated_at??"");return r.state==="playing"&&isFinite(n)&&(s+=(i-n)/1e3),{pos:Math.min(t,Math.max(0,s)),dur:t}}function Re(r){let i=Math.max(0,Math.floor(r)),e=Math.floor(i/3600),t=Math.floor(i%3600/60),s=String(i%60).padStart(2,"0");return e?`${e}:${String(t).padStart(2,"0")}:${s}`:`${t}:${s}`}var qi=r=>r==="all"?"one":r==="one"?"off":"all";function Gi(r,i,e,t,s){let n=r.state;if(r.state=i,i==="playing")return r.quietSince=void 0,n!==void 0&&n!=="playing"&&n!=="unavailable"&&n!=="unknown"&&!e?{go:"music"}:{};if(!e||s<=0)return r.quietSince=void 0,{};r.quietSince??(r.quietSince=t);let a=r.quietSince+s-t;return a>0?{wakeIn:a}:(r.quietSince=void 0,{go:"home"})}function ji(r,i,e,t,s){let n=i==="unknown"?"error":Lt(i);if(!e&&(n==="listening"||n==="thinking"||n==="responding"))return(!r.phase||r.idleSince!==void 0)&&(r.replied=!1),r.phase=n,r.replied||(r.replied=n==="responding"),r.idleSince=void 0,{show:n};if(n==="idle"&&!e&&r.phase&&r.replied){r.idleSince??(r.idleSince=t);let a=r.idleSince+s-t;if(a>0)return{show:r.phase,hideIn:a}}return r.phase=void 0,r.replied=!1,r.idleSince=void 0,{}}function Vi(r){var t,s,n,a,o,l,c,h,d;let i=(n=(s=(t=r.find(u=>u.type==="stt-end"))==null?void 0:t.data)==null?void 0:s.stt_output)==null?void 0:n.text,e=(d=(h=(c=(l=(o=(a=r.find(u=>u.type==="intent-end"))==null?void 0:a.data)==null?void 0:o.intent_output)==null?void 0:l.response)==null?void 0:c.speech)==null?void 0:h.plain)==null?void 0:d.speech;return{heard:i||void 0,reply:e||void 0}}function Wi(r,i,e=3e4){let t=i?Date.parse(i)-e:-1/0,s;for(let n of r)Date.parse(n.timestamp)>=t&&(!s||Date.parse(n.timestamp)>Date.parse(s.timestamp))&&(s=n);return s}function Ki(r,i){return i.reply??(i.heard?`\u201C${i.heard}\u201D`:{listening:"Listening",thinking:"Thinking",responding:"Responding"}[r])}var js=[{name:"",type:"expandable",flatten:!0,title:"Glass and wallpaper",schema:[{name:"wallpaper",label:"Wallpaper",helper:"Built-in champagne or teal, an image URL such as /local/wall.jpg, or 'view' to use the view background set in Home Assistant. A view background always wins.",selector:{select:{custom_value:!0,mode:"dropdown",options:[{value:"champagne",label:"Champagne (built-in)"},{value:"teal",label:"Teal (built-in)"},{value:"view",label:"View background"}]}}},{name:"glass",label:"Glass rendering",helper:"Auto pre-renders the refraction (fast, works everywhere). Live refracts in real time (Chromium only, GPU heavy). Frost is plain blur.",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (pre-rendered)"},{value:"live",label:"Live (Chromium)"},{value:"frost",label:"Frost"}]}}}]}],Vs=[{name:"music_page",type:"expandable",title:"Open the music page when a player starts",schema:[{name:"entity",label:"Media player",selector:{entity:{filter:{domain:"media_player"}}}},{name:"path",label:"Music page",helper:"A dashboard path such as /echo-show/music. Put this option on one card in every view.",selector:{text:{}}},{name:"home_path",label:"Then go back to",helper:"A dashboard path such as /echo-show/home, once the player has been quiet on the music page. Leave empty to stay.",selector:{text:{}}},{name:"return_after",label:"Go back after (seconds)",helper:"Default 60. 0 never goes back.",selector:{number:{min:0,max:3600,mode:"box",unit_of_measurement:"s"}}}]}],Ws=[{name:"voice_overlay",type:"expandable",title:"Show the voice assistant over every page",schema:[{name:"satellite",label:"Voice satellite",helper:"Its listening, thinking and responding light up the screen's edge. Put this option on one card in every view.",selector:{entity:{filter:{domain:"assist_satellite"}}}},{name:"transcript",label:"Show what was heard and the reply",helper:"Reads Assist's debug log, so it needs a Home Assistant admin user. Otherwise only the status shows.",selector:{boolean:{}}}]}],Ks=r=>r.replace(/_/g," ").replace(/^./,i=>i.toUpperCase()),Oe=class extends D{constructor(){super(...arguments);this.fields=[]}setConfig(e){this._config=e}render(){return!this.hass||!this._config?m:p`<ha-form
      .hass=${this.hass}
      .data=${Ei(this._config,this.listNames())}
      .schema=${[...this.fields,...Vs,...Ws,...js]}
      .computeLabel=${e=>e.label??Ks(e.name)}
      .computeHelper=${e=>e.helper}
      @value-changed=${this.changed}
    ></ha-form>`}listNames(){return this.fields.filter(e=>e.list).map(e=>e.name)}changed(e){e.stopPropagation();let t=Mi({...e.detail.value},this.listNames()),s=n=>n===""||n===void 0||n===null;for(let n of["music_page","voice_overlay"]){let a=t[n];if(!a||typeof a!="object")continue;let o=Object.fromEntries(Object.entries(a).filter(([,l])=>!s(l)));t[n]=Object.keys(o).length?o:void 0}for(let[n,a]of Object.entries(t))s(a)&&delete t[n];H(this,"config-changed",{config:t})}};Oe.properties={hass:{attribute:!1},fields:{attribute:!1},_config:{state:!0}};function Ys(r,i=3){return Math.round((Math.sqrt(12*r*r/i+1)-1)/2)}function Yi(r,i,e=3){let t=Ys(i,e);if(t<1)return r;let{width:s,height:n}=r,a=r.data,o=new Uint8ClampedArray(a.length),l=(c,h,d)=>{let u=d?s:n,f=d?n:s,g=d?4:s*4,k=2*t+1;for(let M=0;M<f;M++){let x=d?M*s*4:M*4;for(let P=0;P<4;P++){let _=0;for(let v=-t;v<=t;v++)_+=c[x+Math.min(u-1,Math.max(0,v))*g+P];for(let v=0;v<u;v++){h[x+v*g+P]=_/k;let y=Math.min(u-1,v+t+1),S=Math.max(0,v-t);_+=c[x+y*g+P]-c[x+S*g+P]}}}};for(let c=0;c<e;c++)l(a,o,!0),l(o,a,!1);return o=new Uint8ClampedArray(0),r}function Xi(r,i,e,t,s){let n=new Uint8ClampedArray(t*s*4);for(let a=0;a<s;a++){let o=Math.min(r.height-1,Math.max(0,e+a));for(let l=0;l<t;l++){let c=Math.min(r.width-1,Math.max(0,i+l)),h=(o*r.width+c)*4,d=(a*t+l)*4;n[d]=r.data[h],n[d+1]=r.data[h+1],n[d+2]=r.data[h+2],n[d+3]=r.data[h+3]}}return{width:t,height:s,data:n}}function Ji(r,i,e,t,s,n){let a=i.width,o=i.height,l=r.width,c=r.height,h=r.data,d=i.data,u=new Uint8ClampedArray(a*o*4),f=(s.scale+s.aberration)*n,g=s.scale*n,k=Math.max(0,s.scale-s.aberration)*n,M=1.25,x=1.03,P=(_,v,y)=>{_=Math.min(l-1.001,Math.max(0,_)),v=Math.min(c-1.001,Math.max(0,v));let S=_|0,T=v|0,R=_-S,q=v-T,F=(T*l+S)*4+y,U=F+l*4;return(h[F]*(1-R)+h[F+4]*R)*(1-q)+(h[U]*(1-R)+h[U+4]*R)*q};for(let _=0;_<o;_++)for(let v=0;v<a;v++){let y=(_*a+v)*4;if(!d[y+3])continue;let S=d[y]/255-.5,T=d[y+1]/255-.5,R=e+v+.5,q=t+_+.5,F=P(R+f*S,q+f*T,0),U=P(R+g*S,q+g*T,1),V=P(R+k*S,q+k*T,2),X=.2126*F+.7152*U+.0722*V;F=(X+(F-X)*M)*x,U=(X+(U-X)*M)*x,V=(X+(V-X)*M)*x;let _e=d[y+2]/255*s.specular;u[y]=F+(255-F)*_e,u[y+1]=U+(255-U)*_e,u[y+2]=V+(255-V)*_e,u[y+3]=255}return{width:a,height:o,data:u}}function Zi(r){let i=n=>{let a=n/255;return a<=.03928?a/12.92:((a+.055)/1.055)**2.4},e=0,t=0,s=r.data;for(let n=0;n<s.length;n+=16)s[n+3]!==0&&(e+=.2126*i(s[n])+.7152*i(s[n+1])+.0722*i(s[n+2]),t++);return t?e/t:0}function Qi(r,i=.07,e=.1,t=.5){let s=.30000000000000004;return r<=s?e:Math.min(t,Math.max(e,(r-s)/(r-i)))}var Xs=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
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
</svg>`;function Js(){let r="";for(let e=0,t=120;t<1100;e++,t+=105)r+=`<path d="M-100 ${t} L520 ${t+330} L1100 ${t-40} L1100 ${t+15} L520 ${t+385} L-100 ${t+55}Z" fill="url(#band-${e%2?"b":"a"})" opacity="${e%2?".9":".75"}"/>`;let i="";for(let e=0;e<16;e++)i+=`<path d="M0 0 C 70 -60 200 -55 250 -8 C 180 -20 80 -10 0 0Z" transform="rotate(${e*22.5})" fill="${e%2?"url(#blade)":"#1d6158"}"/>`;return`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a7a6f"/><stop offset="1" stop-color="#123f3a"/></linearGradient>
<linearGradient id="band-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fae9f"/><stop offset="1" stop-color="#2a7d71"/></linearGradient>
<linearGradient id="band-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c5f56"/><stop offset="1" stop-color="#124a43"/></linearGradient>
<linearGradient id="blade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5dbcad"/><stop offset="1" stop-color="#2b8073"/></linearGradient>
<pattern id="stripe" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="16" height="16" fill="#1a5a52"/><rect width="7" height="16" fill="#2f8578"/></pattern>
</defs>
<rect width="1000" height="1000" fill="url(#bg)"/>
<g>${r}</g>
<g transform="translate(150 230)">${i}<circle r="26" fill="#64c2b3"/></g>
<g transform="translate(720 690) rotate(45)"><rect x="-150" y="-150" width="300" height="300" fill="url(#stripe)"/><rect x="-150" y="-150" width="300" height="300" fill="none" stroke="#6cc6b7" stroke-width="6" opacity=".6"/></g>
<g transform="translate(860 300) rotate(45)"><rect x="-90" y="-90" width="180" height="180" fill="#3a9586"/><rect x="-90" y="-90" width="180" height="90" fill="#50ab9c"/></g>
</svg>`}var Zs={champagne:{svg:Xs,base:"#928980",glass:"84 74 64"},teal:{svg:Js(),base:"#174c46",glass:"255 255 255"}},Qs=r=>r==="champagne"||r==="teal";function es(r){if(Qs(r)){let i=Zs[r];return`${i.base} center / cover no-repeat url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(i.svg)}")`}return`center / cover no-repeat url("${r.replace(/"/g,"%22")}")`}var ts=new WeakMap,ss=/^(ha-dialog|ha-md-dialog|hui-dialog-|ha-more-info)/;function pe(r){for(let i=r;i;i=i instanceof ShadowRoot?i.host:i.parentNode)if(i instanceof HTMLElement&&ss.test(i.localName))return!0;return!1}function rs(r){let i=r;for(;i;){if(i instanceof ShadowRoot||i instanceof Document){let e=i.querySelector("hui-view-background");if(e)return e}if(i instanceof HTMLElement&&ss.test(i.localName))return null;i=i instanceof ShadowRoot?i.host:i.parentNode}return null}function ns(r){let i=ts.get(r);return i||(i=new Nt(r),ts.set(r,i)),i}var is=()=>Math.min(window.devicePixelRatio||1,2),er=150;function tr(r){let i=/url\((['"]?)(.*?)\1\)/.exec(r);return i?i[2]:null}function ir(r,i,e,t,s,n){let a=e,o=t,l=s.trim().split(/\s+/);if(l[0]==="cover"||l[0]==="contain"){let d=l[0]==="cover"?Math.max(r/e,i/t):Math.min(r/e,i/t);a=e*d,o=t*d}else if(l[0]!=="auto"||l[1]&&l[1]!=="auto"){let d=(g,k)=>g==="auto"||g===void 0?null:g.endsWith("%")?parseFloat(g)/100*k:parseFloat(g),u=d(l[0],r),f=d(l[1]??"auto",i);u!==null&&f!==null?(a=u,o=f):u!==null?(a=u,o=t*u/e):f!==null&&(o=f,a=e*f/t)}let c=n.trim().split(/\s+/),h=(d,u)=>d?d.endsWith("%")?parseFloat(d)/100*u||0:d==="left"||d==="top"?0:d==="right"||d==="bottom"?u:d==="center"?u/2:parseFloat(d)||0:u/2;return{x:h(c[0],r-a),y:h(c[1]??"50%",i-o),w:a,h:o}}var Nt=class{constructor(i){this.snapshot=null;this.failure=null;this.listeners=new Set;this.key="";this.version=0;this.pending=null;this.recheck=!1;this.timer=0;this.settle=0;this.overrides=new Map;this.el=i}subscribe(i){return this.listeners.add(i),this.listeners.size===1?this.start():this.snapshot&&queueMicrotask(i),()=>{this.listeners.delete(i),this.listeners.size||this.stop()}}setWallpaper(i,e,t=!0){e?this.overrides.set(i,{value:e,explicit:t}):this.overrides.delete(i);let s=this.el.parentElement??this.el.getRootNode().host;if(!s)return;let n=[...this.overrides.values()],a=n.find(o=>o.explicit)??n[0];a?s.style.setProperty("--lovelace-background",es(a.value)):s.style.removeProperty("--lovelace-background"),this.check()}check(){if(this.pending){this.recheck=!0;return}let i=getComputedStyle(this.el),e=this.el.getBoundingClientRect();if(e.width<1||e.height<1)return;let t=[i.backgroundImage,i.backgroundSize,i.backgroundPosition,i.backgroundColor,i.opacity,Math.round(e.width),Math.round(e.height),is()].join("|");t!==this.key&&(this.key=t,clearTimeout(this.settle),this.settle=window.setTimeout(()=>{let s=this.el.getBoundingClientRect();this.pending=this.raster(getComputedStyle(this.el),s).finally(()=>{this.pending=null,this.recheck&&(this.recheck=!1,this.check())})},er))}origin(){let i=this.el.getBoundingClientRect();return{x:i.x,y:i.y}}start(){this.ro=new ResizeObserver(()=>this.check()),this.ro.observe(this.el),this.mo=new MutationObserver(()=>this.check()),this.mo.observe(this.el,{attributes:!0,attributeFilter:["style","class","fixed-background"]}),this.el.parentElement&&this.mo.observe(this.el.parentElement,{attributes:!0,attributeFilter:["style"]}),this.timer=window.setInterval(()=>this.check(),2e3),this.check()}stop(){var i,e;clearTimeout(this.settle),(i=this.ro)==null||i.disconnect(),(e=this.mo)==null||e.disconnect(),clearInterval(this.timer),this.key=""}async raster(i,e){let t=is(),s=Math.max(1,Math.round(e.width*t)),n=Math.max(1,Math.round(e.height*t));try{let a=document.createElement("canvas");a.width=s,a.height=n;let o=a.getContext("2d",{willReadFrequently:!0});if(!o)throw new Error("no 2d context");let l=getComputedStyle(document.documentElement).backgroundColor;o.fillStyle=l&&l!=="rgba(0, 0, 0, 0)"?l:"#111",o.fillRect(0,0,s,n),o.globalAlpha=parseFloat(i.opacity)||1,o.fillStyle=i.backgroundColor,o.fillRect(0,0,s,n);let c=i.backgroundImage;if(c&&c!=="none"){let d=tr(c);if(!d||/gradient\(/.test(c.replace(/url\(.*?\)/g,"")))throw new Error("background is not a plain image");let u=await sr(d),f=ir(e.width,e.height,u.naturalWidth||e.width,u.naturalHeight||e.height,i.backgroundSize,i.backgroundPosition);o.drawImage(u,f.x*t,f.y*t,f.w*t,f.h*t)}let h=o.getImageData(0,0,s,n);this.failure=null,this.snapshot={pixels:{width:s,height:n,data:h.data},x:e.x,y:e.y,k:t,version:++this.version}}catch(a){this.failure=a instanceof Error?a.message:String(a),this.snapshot=null}this.listeners.forEach(a=>a())}};function sr(r){return new Promise((i,e)=>{let t=new Image,s=new URL(r,location.href);s.origin!==location.origin&&s.protocol.startsWith("http")&&(t.crossOrigin="anonymous"),t.onload=()=>i(t),t.onerror=()=>e(new Error(`cannot load background ${r.slice(0,80)}`)),t.src=r})}function rr(r,i,e,t,s){let n=Math.abs(r)-e+s,a=Math.abs(i)-t+s;return Math.min(Math.max(n,a),0)+Math.hypot(Math.max(n,0),Math.max(a,0))-s}function nr(r){let i=1-Math.min(1,Math.max(0,r)),e=(1-i**4)**.75;if(e<1e-6)return 0;let t=Math.atan(Math.min(i**3/e,8)),s=Math.sin(t)/1.5;return s>=1?Math.sin(t):Math.sin(t-Math.asin(s))}function as(r,i,e,t,s){let n=Math.max(1,Math.round(r*s)),a=Math.max(1,Math.round(i*s)),o=n/2,l=a/2,c=Math.min(e*s,o,l),h=Math.max(1,t*s),d=Math.ceil(h),u=new Float32Array(d+1);for(let v=1;v<=d;v++)u[v]=u[v-1]+nr(v/d);let f=v=>{if(v<=0)return 0;if(v>=d)return u[d];let y=Math.floor(v),S=v-y;return u[y]*(1-S)+u[y+1]*S},g=new Float32Array(n*a),k=new Float32Array(n*a);for(let v=0;v<a;v++)for(let y=0;y<n;y++){let S=rr(y-o+.5,v-l+.5,o,l,c);k[v*n+y]=S,g[v*n+y]=S>0?0:f(Math.min(h,-S))}let M=1.35,x=-.54,P=-.84,_=new Uint8ClampedArray(n*a*4);for(let v=0;v<a;v++)for(let y=0;y<n;y++){let S=v*n+y,T=S<<2,R=k[S];if(R>0){_[T]=_[T+1]=_[T+2]=128,_[T+3]=0;continue}if(R<-h-2){_[T]=_[T+1]=128,_[T+2]=0,_[T+3]=255;continue}let q=Math.max(0,y-1),F=Math.min(n-1,y+1),U=Math.max(0,v-1),V=Math.min(a-1,v+1),X=Math.max(-1,Math.min(1,(g[v*n+F]-g[v*n+q])/(F-q||1)*M)),_e=Math.max(-1,Math.min(1,(g[V*n+y]-g[U*n+y])/(V-U||1)*M)),Xt=0;if(R>=-h){let Jt=k[v*n+F]-k[v*n+q],Zt=k[V*n+y]-k[U*n+y],Qt=Math.hypot(Jt,Zt)||1,ei=Jt/Qt*x+Zt/Qt*P,As=(1-Math.min(1,-R/h))**1.6;Xt=(Math.max(0,ei)+Math.max(0,-ei)*.35)*As}_[T]=128+X*127,_[T+1]=128+_e*127,_[T+2]=Math.round(Xt*255),_[T+3]=255}return{width:n,height:a,data:_}}function os(r,i,e={}){return{radius:i,bevel:Math.max(4,Math.round(r*(e.bevel??.13))),scale:Math.round(r*(e.refraction??.3)),aberration:Math.max(1,Math.round(r*(e.aberration??.02))),frost:+(r*(e.frost??.007)).toFixed(2),specular:.55}}function ls(){let r=navigator.userAgent;return!(/Safari/.test(r)&&!/Chrome|Chromium|Edg|OPR/.test(r))&&(CSS.supports("backdrop-filter","url(#x)")||CSS.supports("-webkit-backdrop-filter","url(#x)"))}function cs(r,i,e,t,s){let n=Math.ceil(s.scale+s.aberration+4),a=n/e*100,o=n/t*100,l=(c,h)=>`<feDisplacementMap in="SourceGraphic" in2="map" scale="${c}" xChannelSelector="R" yChannelSelector="G" result="${h}"/>`;return`<filter id="${r}" color-interpolation-filters="sRGB" x="-${a}%" y="-${o}%" width="${100+2*a}%" height="${100+2*o}%">
  <feImage href="${i}" x="0" y="0" width="${e}" height="${t}" preserveAspectRatio="none" result="map"/>
  ${l(s.scale+s.aberration,"dR")}<feColorMatrix in="dR" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
  ${l(s.scale,"dG")}<feColorMatrix in="dG" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>
  ${l(Math.max(0,s.scale-s.aberration),"dB")}<feColorMatrix in="dB" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>
  <feBlend in="r" in2="g" mode="screen" result="rg"/><feBlend in="rg" in2="b" mode="screen" result="rgb"/>
  <feGaussianBlur in="rgb" stdDeviation="${s.frost}" result="frosted"/>
  <feColorMatrix in="map" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 ${s.specular} 0 0" result="spec"/>
  <feComposite in="spec" in2="frosted" operator="over"/>
</filter>`}var Ut=window.homeview??(window.homeview={timings:[]}),Le=new Map;function ds(r,i,e,t){let s=[r,i,e.radius.toFixed(1),e.bevel,t].join("|"),n=Le.get(s);return n||(n=as(r,i,e.radius,e.bevel,t),Le.size>24&&Le.delete(Le.keys().next().value),Le.set(s,n)),n}var ze=new Set,Bt=!1;function hs(){Bt||(Bt=!0,requestAnimationFrame(()=>{Bt=!1;let r=performance.now();for(let i of ze)if(ze.delete(i),i.bakeNow(),performance.now()-r>12)break;ze.size&&hs()}))}var ar=()=>matchMedia("(prefers-reduced-transparency: reduce)").matches,at=class{constructor(i,e="rect"){this.mode="frost";this.opts={};this.shape="rect";this.backdrop=null;this.poll=0;this.lastKey="";this.onScroll=()=>this.request();this.host=i,this.shape=e,i.addController(this)}setOptions(i){let e=JSON.stringify(i)!==JSON.stringify(this.opts);this.opts={...i},e&&this.host.isConnected&&this.attach()}hostConnected(){requestAnimationFrame(()=>this.attach()),window.addEventListener("scroll",this.onScroll,{capture:!0,passive:!0}),window.addEventListener("resize",this.onScroll,{passive:!0}),this.poll=window.setInterval(()=>this.request(),700)}hostDisconnected(){var i;this.detach(),window.removeEventListener("scroll",this.onScroll,{capture:!0}),window.removeEventListener("resize",this.onScroll),clearInterval(this.poll),(i=this.ro)==null||i.disconnect(),this.ro=void 0,ze.delete(this)}hostUpdated(){let i=this.card();i&&!this.ro&&(this.ro=new ResizeObserver(()=>this.request()),this.ro.observe(i)),this.request()}card(){return this.host.renderRoot.querySelector(".hv-glass")}canvas(){return this.host.renderRoot.querySelector("canvas.hv-bake")}detach(){var i,e;(i=this.unsub)==null||i.call(this),this.unsub=void 0,(e=this.backdrop)==null||e.setWallpaper(this,void 0),this.backdrop=null}attach(){if(!this.host.isConnected)return;this.detach();let i=rs(this.host);this.backdrop=i?ns(i):null;let e=this.opts.wallpaper??"champagne";this.backdrop&&e!=="view"&&e!=="none"&&this.backdrop.setWallpaper(this,e,this.opts.wallpaper!==void 0),this.backdrop&&(this.unsub=this.backdrop.subscribe(()=>this.request(!0))),this.lastKey="",this.request(!0)}request(i=!1){i&&(this.lastKey=""),!(!this.host.isConnected||!this.card())&&this.key()!==this.lastKey&&(ze.add(this),hs())}geometry(){let i=this.card();if(!i)return null;let e=i.offsetWidth,t=i.offsetHeight;if(e<8||t<8)return null;let s=i.getBoundingClientRect();return{x:s.x+s.width/2-e/2,y:s.y+s.height/2-t/2,w:e,h:t}}key(){var t,s,n;let i=this.geometry();if(!i)return"none";let e=((t=this.backdrop)==null?void 0:t.origin())??{x:0,y:0};return[Math.round(i.x-e.x),Math.round(i.y-e.y),i.w,i.h,((n=(s=this.backdrop)==null?void 0:s.snapshot)==null?void 0:n.version)??-1,this.mode,JSON.stringify(this.opts)].join("|")}params(i,e){let t=this.card(),s=Math.max(110,Math.min(260,Math.min(i,e))),n=this.shape==="circle"?Math.min(i,e)/2:parseFloat(getComputedStyle(t).borderTopLeftRadius)||0;return os(s,n,this.opts)}resolveMode(){var e;let i=this.opts.glass??"auto";return ar()||i==="frost"?"frost":i==="live"?ls()?"live":"frost":(e=this.backdrop)!=null&&e.snapshot?"baked":"frost"}bakeNow(){let i=this.card(),e=this.canvas(),t=this.geometry();if(!i||!e||!t||!i.style.getPropertyValue("--hv-radius"))return;if(this.mode=this.resolveMode(),this.lastKey=this.key(),i.dataset.glass=this.mode,this.mode!=="live"&&i.style.removeProperty("backdrop-filter"),this.mode==="frost"){i.style.setProperty("--hv-tint-rgb","84 74 64"),i.style.setProperty("--hv-tint-a",".28");return}let s=this.params(t.w,t.h);if(this.mode==="live"){this.applyLive(i,t.w,t.h,s);return}let n=performance.now(),a=this.backdrop.snapshot,o=a.k,l=this.backdrop.origin(),c=ds(t.w,t.h,s,o),h=s.frost*o,d=Math.ceil((s.scale+s.aberration)*o+h*3+2),u=Math.round((t.x-l.x)*o)-d,f=Math.round((t.y-l.y)*o)-d,g=Yi(Xi(a.pixels,u,f,c.width+2*d,c.height+2*d),h),k=Ji(g,c,d,d,s,o);e.width=k.width,e.height=k.height,e.getContext("2d").putImageData(new ImageData(k.data,k.width,k.height),0,0);let M=Zi(k);M<.18?(i.style.setProperty("--hv-tint-rgb","255 255 255"),i.style.setProperty("--hv-tint-a",".13")):(i.style.setProperty("--hv-tint-rgb","84 74 64"),i.style.setProperty("--hv-tint-a",String(Math.max(.13,Qi(M)).toFixed(3)))),Ut.timings.push({card:this.host.localName,w:t.w,h:t.h,ms:Math.round(performance.now()-n)}),Ut.timings.length>200&&Ut.timings.splice(0,100)}applyLive(i,e,t,s){let n=Math.min(window.devicePixelRatio||1,2),a=ds(e,t,s,n),o=document.createElement("canvas");o.width=a.width,o.height=a.height,o.getContext("2d").putImageData(new ImageData(a.data,a.width,a.height),0,0);let l=o.toDataURL("image/png"),c=`hv-${Math.random().toString(36).slice(2,9)}`,d=this.host.renderRoot.querySelector("svg.hv-filters");d||(d=document.createElementNS("http://www.w3.org/2000/svg","svg"),d.setAttribute("class","hv-filters"),d.setAttribute("aria-hidden","true"),d.setAttribute("style","position:absolute;width:0;height:0;overflow:hidden"),this.host.renderRoot.appendChild(d)),d.innerHTML=cs(c,l,e,t,s);let u=`url(#${c}) saturate(1.25) brightness(1.03)`;i.style.setProperty("backdrop-filter",u),i.style.setProperty("-webkit-backdrop-filter",u),i.style.setProperty("--hv-tint-rgb","255 255 255"),i.style.setProperty("--hv-tint-a",".13")}};function ot(r,i,e,t){let s=new Map,n=new Map;return{feed(a,o,l){let c=o?r(o):void 0,h=n.get(a);if(h&&h!==c){n.delete(a);let u=s.get(h);u.cards.delete(a),u.cards.size||(s.delete(h),u.w.stop(),s.size||t==null||t())}if(!c)return;s.size||e==null||e(),n.set(a,c);let d=s.get(c);d||s.set(c,d={w:i({...o}),cards:new Set}),d.cards.add(a),l&&(d.hass=l),d.hass&&d.w.look(d.hass)},lookAll(){s.forEach(a=>a.hass&&a.w.look(a.hass))}}}var ps=r=>r.replace(/\/+$/,"");function or(r){let{entity:i,path:e,home_path:t,return_after:s=60}=r,n={},a=0,o=l=>{var d;clearTimeout(a),a=0;let c=ps(location.pathname)===ps(e),h=Gi(n,(d=l.states[i])==null?void 0:d.state,c,Date.now(),t?s*1e3:0);new URLSearchParams(location.search).has("edit")||(h.go==="music"?Ae(e):h.go==="home"?Ae(t):h.wakeIn&&(a=window.setTimeout(()=>o(l),h.wakeIn)))};return{look:o,stop:()=>clearTimeout(a)}}var lt=()=>us.lookAll(),us=ot(r=>r.entity&&r.path?JSON.stringify([r.entity,r.path,r.home_path,r.return_after]):void 0,or,()=>{window.addEventListener("location-changed",lt),window.addEventListener("popstate",lt)},()=>{window.removeEventListener("location-changed",lt),window.removeEventListener("popstate",lt)}),ct=us.feed;function ue(r,i,e){let t,s,n=c=>{t||c.pointerType==="mouse"&&c.button!==0||(t={id:c.pointerId,x:c.clientX,y:c.clientY,t:c.timeStamp},s=void 0)},a=c=>{if(!t||c.pointerId!==t.id)return;let h=c.clientX-t.x,d=c.clientY-t.y;if(!s){if(Math.max(Math.abs(h),Math.abs(d))<8)return;if(s=Math.abs(h)>=Math.abs(d)?"x":"y",s==="y"&&!e){t=void 0;return}try{r.setPointerCapture(c.pointerId)}catch{}}i.move(h,d,s)},o=c=>{if(!t||c.pointerId!==t.id)return;let h=c.clientX-t.x,d=c.clientY-t.y,u=Ti(h,d,c.timeStamp-t.t);t=void 0;let f=!s||(s==="x"?u==="left"||u==="right":u==="up"||u==="down");i.end(f?u:null,h,d)},l=c=>{!t||c.pointerId!==t.id||(t=void 0,i.end(null,0,0))};return r.addEventListener("pointerdown",n),r.addEventListener("pointermove",a),r.addEventListener("pointerup",o),r.addEventListener("pointercancel",l),()=>{r.removeEventListener("pointerdown",n),r.removeEventListener("pointermove",a),r.removeEventListener("pointerup",o),r.removeEventListener("pointercancel",l)}}var C=r=>w`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${r}</svg>`,b={sun:C(w`<circle cx="12" cy="12" r="4.3"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2.2v2.4M12 19.4v2.4M2.2 12h2.4M19.4 12h2.4M5.1 5.1l1.7 1.7M17.2 17.2l1.7 1.7M5.1 18.9l1.7-1.7M17.2 6.8l1.7-1.7"/></g>`),moon:C(w`<path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8a8.6 8.6 0 1 0 10.8 10.8z"/><path d="M17 3.2l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6zM20.6 7.6l.4.9.9.4-.9.4-.4.9-.4-.9-.9-.4.9-.4z"/>`),padlock:w`<svg class="padlock" viewBox="0 0 24 24" fill="currentColor" overflow="visible" aria-hidden="true"><g class="pl"><path class="sh-open" d="M16.55 12V7a4.4 4.4 0 0 1 8.8 0v2.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path class="sh-closed" d="M7.75 12V7a4.4 4.4 0 0 1 8.8 0v5" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="5" y="11" width="14" height="11.25" rx="2.4"/></g></svg>`,light:C(w`<rect x="11.1" y="1.5" width="1.8" height="5" rx=".9"/><rect x="8.6" y="1.2" width="6.8" height="1.9" rx=".95"/><path d="M12 6.2c-4.1 0-7.6 3.2-8 7.3-.05.5.35.9.85.9h14.3c.5 0 .9-.4.85-.9-.4-4.1-3.9-7.3-8-7.3z"/><path d="M8.6 15.6h6.8a3.4 3.4 0 0 1-6.8 0z"/>`),fan:C(w`<circle cx="12" cy="10" r="8.2" fill="none" stroke="currentColor" stroke-width="1.6"/><g class="blades"><path d="M12 10c-.4-2.6.2-5 1.9-5.6 1.6-.5 2.6 1.4 1.4 3.1-.8 1.2-2 1.9-3.3 2.5z"/><path d="M12 10c2.4 1 4.2 2.8 3.8 4.5-.4 1.6-2.6 1.5-3.4-.4-.6-1.3-.6-2.7-.4-4.1z"/><path d="M12 10c-2 1.6-4.4 2.3-5.6 1.1-1.2-1.2.1-3 2.1-2.8 1.4.1 2.5.9 3.5 1.7z"/></g><circle cx="12" cy="10" r="1.3"/><path d="M10.6 18.1h2.8l.9 3.4H9.7z"/><rect x="7.5" y="21" width="9" height="1.8" rx=".9"/>`),curtains:C(w`<rect x="2" y="2.5" width="20" height="1.8" rx=".9"/><path d="M4 4.3h6.5c-.3 4.6-1.4 9.8-3.5 16.9H4z"/><path d="M20 4.3h-6.5c.3 4.6 1.4 9.8 3.5 16.9H20z"/>`),curtainsOpen:C(w`<rect x="2" y="2.5" width="20" height="1.8" rx=".9"/><path d="M4 4.3h3.2c-.2 4.6-.6 9.8-1.4 16.9H4z"/><path d="M20 4.3h-3.2c.2 4.6.6 9.8 1.4 16.9H20z"/>`),garage:C(w`<path d="M2 9.6 12 3l10 6.6V21a1 1 0 0 1-1 1h-1.6V11.4H4.6V22H3a1 1 0 0 1-1-1z"/><rect x="6.2" y="13" width="11.6" height="2" rx=".5"/><rect x="6.2" y="16.2" width="11.6" height="2" rx=".5"/><rect x="6.2" y="19.4" width="11.6" height="2" rx=".5"/>`),garageOpen:C(w`<path d="M2 9.6 12 3l10 6.6V21a1 1 0 0 1-1 1h-1.6V11.4H4.6V22H3a1 1 0 0 1-1-1z"/><rect x="6.2" y="13" width="11.6" height="2" rx=".5"/>`),power:C(w`<path d="M12 2.5v8.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M7.1 5.4a8 8 0 1 0 9.8 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`),play:C(w`<path d="M8 4.7v14.6c0 .9 1 1.4 1.7.9l11-7.3c.7-.4.7-1.4 0-1.8l-11-7.3C9 3.3 8 3.8 8 4.7z"/><path d="M3.5 6.5l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z"/>`),dot:C(w`<circle cx="12" cy="12" r="6"/>`),music:C(w`<path d="M20 2.6v12.9a3.4 3.4 0 1 1-1.9-3.06V7.1L9.6 8.9v8.6a3.4 3.4 0 1 1-1.9-3.06V5.6c0-.6.4-1.1 1-1.2l10.1-2.4c.6-.15 1.2.3 1.2.6z"/>`),start:C(w`<path d="M7 4.7v14.6c0 .9 1 1.4 1.7.9l11-7.3c.7-.4.7-1.4 0-1.8l-11-7.3C8 3.3 7 3.8 7 4.7z"/>`),home:C(w`<path d="M3 11.2 12 3.5l9 7.7V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>`),locate:C(w`<circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),pause:C(w`<rect x="6" y="4.5" width="4.2" height="15" rx="1.4"/><rect x="13.8" y="4.5" width="4.2" height="15" rx="1.4"/>`),vacuum:C(w`<path fill-rule="evenodd" d="M12 2.4a9.6 9.6 0 1 1 0 19.2 9.6 9.6 0 0 1 0-19.2zM4.2 9.16a8.3 8.3 0 0 1 15.6 0l-1.13.41a7.1 7.1 0 0 0-13.34 0zM12 5.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8zm0 1.1a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6z"/>`),calendar:C(w`<rect x="3" y="4.5" width="18" height="16.5" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 9.5h18" stroke="currentColor" stroke-width="1.8"/><path d="M8 2.5v4M16 2.5v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><rect x="6.5" y="12.5" width="3" height="2.6" rx=".6"/><rect x="10.5" y="12.5" width="3" height="2.6" rx=".6"/><rect x="14.5" y="12.5" width="3" height="2.6" rx=".6"/><rect x="6.5" y="16.3" width="3" height="2.6" rx=".6"/><rect x="10.5" y="16.3" width="3" height="2.6" rx=".6"/>`),camera:C(w`<rect x="2" y="6" width="14.5" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M16.5 10.4 22 7.2v9.6l-5.5-3.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`),drop:C(w`<path d="M12 3c-.2 0-.4.1-.5.3C9.6 6 6.5 10.3 6.5 14a5.5 5.5 0 0 0 11 0c0-3.7-3.1-8-5-10.7-.1-.2-.3-.3-.5-.3z" fill="none" stroke="currentColor" stroke-width="1.8"/>`),chevronUp:w`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 15l7-7 7 7"/></svg>`,chevronDown:w`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>`,mic:C(w`<rect x="8.5" y="2" width="7" height="12.5" rx="3.5"/><path d="M5 11a7 7 0 0 0 14 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 18v3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),keyboard:C(w`<rect x="2" y="5.5" width="20" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6 9.5h1.6M9.2 9.5h1.6M12.4 9.5h1.6M15.6 9.5h1.6M6 12.5h1.6M15.6 12.5h1.6M9.2 12.5h4.8M7.5 15.5h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`),retry:C(w`<path d="M19 12a7 7 0 1 1-2.05-4.95" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M20 3.6v6h-6z"/>`),stop:C(w`<rect x="6" y="6" width="12" height="12" rx="2.5"/>`),close:w`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,grid:C(w`<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/>`),muted:C(w`<path d="M3 9.3v5.4c0 .6.4 1 1 1h3.2l4.3 3.8c.6.5 1.5.1 1.5-.7V5.2c0-.8-.9-1.2-1.5-.7L7.2 8.3H4c-.6 0-1 .4-1 1z"/><path d="m16 9 5 6m0-6-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),sound:C(w`<path d="M3 9.3v5.4c0 .6.4 1 1 1h3.2l4.3 3.8c.6.5 1.5.1 1.5-.7V5.2c0-.8-.9-1.2-1.5-.7L7.2 8.3H4c-.6 0-1 .4-1 1z"/><path d="M16 8.5a4.6 4.6 0 0 1 0 7M18.8 5.8a8.4 8.4 0 0 1 0 12.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),previous:C(w`<rect x="4" y="5" width="2.6" height="14" rx="1.1"/><path d="M19.5 6.3v11.4c0 .9-1 1.4-1.7.9L9.4 12.9a1.1 1.1 0 0 1 0-1.8l8.4-5.7c.7-.5 1.7 0 1.7.9z"/>`),next:C(w`<rect x="17.4" y="5" width="2.6" height="14" rx="1.1"/><path d="M4.5 6.3v11.4c0 .9 1 1.4 1.7.9l8.4-5.7a1.1 1.1 0 0 0 0-1.8L6.2 5.4c-.7-.5-1.7 0-1.7.9z"/>`),shuffle:C(w`<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h3.2c1.6 0 3 .8 3.9 2.1l3.8 5.8c.9 1.3 2.3 2.1 3.9 2.1H20M3 17h3.2c1.6 0 3-.8 3.9-2.1l.5-.8M13.4 9.9l.5-.8C14.8 7.8 16.2 7 17.8 7H20"/><path d="M17.5 4.5 20 7l-2.5 2.5M17.5 14.5 20 17l-2.5 2.5"/></g>`),repeat:C(w`<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11V9.5A3.5 3.5 0 0 1 7.5 6H19M20 13v1.5a3.5 3.5 0 0 1-3.5 3.5H5"/><path d="M16.5 3.5 19 6l-2.5 2.5M7.5 20.5 5 18l2.5-2.5"/></g>`),repeatOne:C(w`<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11V9.5A3.5 3.5 0 0 1 7.5 6H19M20 13v1.5a3.5 3.5 0 0 1-3.5 3.5H5"/><path d="M16.5 3.5 19 6l-2.5 2.5M7.5 20.5 5 18l2.5-2.5"/></g><path d="M10.5 10.6 12.3 9.5v5.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`),send:C(w`<path d="M3.4 11.2 19.6 4.1c.8-.3 1.6.5 1.3 1.3l-7.1 16.2c-.3.8-1.5.7-1.7-.1l-1.6-6.2-6.2-1.6c-.8-.2-.9-1.4-.1-1.7z"/>`)};function ms(r,i,e){switch(r){case"light":return b.light;case"lock":return b.padlock;case"fan":return b.fan;case"cover":return i==="garage"||i==="gate"?e?b.garageOpen:b.garage:e?b.curtainsOpen:b.curtains;case"scene":return b.sun;case"script":return b.play;case"switch":case"input_boolean":return b.power;case"media_player":return e?b.pause:b.music;case"vacuum":return b.vacuum;default:return b.dot}}var j=420,dt=()=>({urls:["",""],front:0,drag:0,side:0,still:!1});function De(r,i){return p`${r.urls.map((e,t)=>{if(!e)return m;let s=t===r.front,n=s?`${r.drag}px`:`calc(${r.side} * (100% + var(--hv-gap, 0px)) + ${r.drag}px)`,a=`${s?"front":r.side?"beside":""} ${r.still?"still":""}`;return p`<img class=${a} src=${e} alt="" draggable="false" style="object-fit:${i};transform:translateX(${n})" />`})}`}var ht=$`
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    opacity: 0;
    transition:
      opacity 1.2s ease,
      transform ${j}ms cubic-bezier(0.22, 1, 0.36, 1);
    -webkit-user-drag: none;
    user-select: none;
    -webkit-user-select: none;
  }
  img.front,
  img.beside {
    opacity: 1;
  }
  img.beside {
    transition: transform ${j}ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  img.still {
    transition: none;
  }
`;var lr=3e3,qt="homeviewOverlay",cr=320;function Q(r){var i;(((i=document.querySelector("home-assistant"))==null?void 0:i.shadowRoot)??document.body).appendChild(r)}var I=class extends D{constructor(){super(...arguments);this._pull=0;this._chrome=!0;this._closing=!1;this.closeTimer=0;this.chromeTimer=0;this.ownClose=!1;this.onPop=()=>{var e;(e=history.state)!=null&&e[qt]||this.close(!0)};this.onKey=e=>{if(e.key==="Escape")this.close();else if(!(e.key==="ArrowRight"||e.key==="ArrowLeft")||!this.arrow(e.key==="ArrowRight"?1:-1))return;e.preventDefault()};this.onVisible=()=>{document.visibilityState==="visible"&&!this._closing&&this.keepAwake()};this.noScroll=e=>e.preventDefault()}renderBackdrop(){return m}dragX(e){}dragXEnd(e){}arrow(e){return!1}closed(){}connectedCallback(){super.connectedCallback(),this.setAttribute("role","dialog"),this.setAttribute("aria-modal","true"),this.setAttribute("aria-label",this.label),this.tabIndex=-1,history.pushState({...history.state??{},[qt]:!0},""),window.addEventListener("popstate",this.onPop),window.addEventListener("keydown",this.onKey),document.addEventListener("visibilitychange",this.onVisible),this.addEventListener("touchmove",this.noScroll,{passive:!1}),this.closeTimer=window.setTimeout(()=>this.close(),this.openMs),this.showChrome(),this.keepAwake()}disconnectedCallback(){var e,t;super.disconnectedCallback(),(e=this.untrack)==null||e.call(this),this.untrack=void 0,window.removeEventListener("popstate",this.onPop),window.removeEventListener("keydown",this.onKey),document.removeEventListener("visibilitychange",this.onVisible),this.removeEventListener("touchmove",this.noScroll),clearTimeout(this.closeTimer),clearTimeout(this.chromeTimer),(t=this.wake)==null||t.release().catch(()=>{}),this.wake=void 0}firstUpdated(){this.untrack=ue(this,{move:(e,t,s)=>{this.axis=s,s==="x"?this.dragX(e):this._pull=t>0?t:t/4},end:e=>{let t=this.axis;if(this.axis=void 0,e==="tap")return this.showChrome(!this._chrome);if(t==="x")return this.dragXEnd(e);if(e==="down")return this.close();this._pull=0}},!0),this.focus()}close(e=!1){var t;this._closing||(this._closing=!0,!e&&((t=history.state)!=null&&t[qt])&&history.back(),window.setTimeout(()=>{this.remove(),this.closed()},cr))}async keepAwake(){var e;try{this.wake=await((e=navigator.wakeLock)==null?void 0:e.request("screen"))}catch{}}showChrome(e=!0){this._chrome=e||this.ownClose,!this.ownClose&&(clearTimeout(this.chromeTimer),e&&(this.chromeTimer=window.setTimeout(()=>this._chrome=!1,lr)))}render(){let e=this._pull,t=e>0?Math.max(0,1-e/500):1,s=this.axis!=="y";return p`<div class="backdrop ${s?"settle":""}" style="opacity:${t}">${this.renderBackdrop()}</div>
      <div class="stage ${s?"settle":""}" style="transform:translateY(${e}px) scale(${e>0?1-e/2500:1})">${this.renderBody()}</div>
      ${this._chrome&&!this.ownClose?this.closeButton():m}`}closeButton(){return p`<button class="close" aria-label=${this.closeLabel} @pointerdown=${e=>e.stopPropagation()} @click=${()=>this.close()}>${b.close}</button>`}updated(){this.toggleAttribute("closing",this._closing)}};I.properties={_pull:{state:!0},_chrome:{state:!0},_closing:{state:!0}},I.overlayStyles=$`
    /* a release settles back (or slides on) at the photo frame's slide speed */
    :host {
      position: fixed;
      inset: 0;
      z-index: 2147483000;
      display: block;
      overflow: hidden;
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
        transform ${j}ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity ${j}ms ease;
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
      .settle {
        transition-duration: 0.01ms !important;
      }
    }
  `;var dr=2e3,hr=1500,me=400;function pr(r,i){let e=t=>Math.abs(Math.sin(i*t)*Math.sin(i*t*.37+1.3));return r==="listening"?.3+.55*e(5.3):r==="responding"?.28+.5*e(6.1):.12}var Ie=class extends D{constructor(){super(...arguments);this.line="";this.raf=0;this.stopAt=0;this.last=0;this.angle=0;this.lvl=0;this.frame=e=>{let t=this.last?Math.min(.1,(e-this.last)/1e3):0;this.last=e;let s=this.phase??"responding",n=e/1e3;this.lvl+=(pr(s,n)-this.lvl)*.2,this.angle=(this.angle+t*(s==="thinking"?260:s==="listening"?40:70))%360;let a=this.style;a.setProperty("--a",`${this.angle.toFixed(1)}deg`),a.setProperty("--k",Math.min(1,s==="thinking"?.9:.55+this.lvl*.6).toFixed(3)),a.setProperty("--bw",`${(s==="thinking"?6:5+this.lvl*9).toFixed(1)}px`),a.setProperty("--gw",`${(14+this.lvl*22).toFixed(1)}px`),a.setProperty("--dot",s==="thinking"?(.35+.65*Math.abs(Math.sin(n*4))).toFixed(2):"1"),e<this.stopAt?this.raf=requestAnimationFrame(this.frame):this.raf=this.last=0}}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this.raf),this.raf=0}updated(){let e=!!this.phase;e!==this.hasAttribute("shown")&&this.toggleAttribute("shown",e),this.setAttribute("data-phase",this.phase??""),this.stopAt=e?1/0:performance.now()+me+50,this.raf||(this.raf=requestAnimationFrame(this.frame))}render(){return p`<div class="shade"></div>
      <div class="bloomwrap"><div class="light bloom"></div></div>
      <div class="light ring"></div>
      <div class="pill" role="status" aria-live="polite"><span class="dot"></span><span class="txt">${this.line}</span></div>`}};Ie.properties={phase:{attribute:!1},line:{attribute:!1}},Ie.styles=$`
    :host {
      position: fixed;
      inset: 0;
      /* over everything, HomeView's own full-screen pages included */
      z-index: 2147483600;
      pointer-events: none;
      overflow: hidden;
      visibility: hidden;
      transition: visibility 0s linear ${me}ms;
      --a: 0deg;
      --k: 0.6;
      --bw: 6px;
      --gw: 22px;
      --dot: 1;
      color: #fff;
      font-family: -apple-system, "SF Pro Display", "Inter", system-ui, "Segoe UI", Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    :host([shown]) {
      visibility: visible;
      transition: none;
    }
    /* each piece fades itself: an opacity on the host would cut the pill's frost off from the page behind it */
    .shade,
    .bloomwrap,
    .light,
    .pill {
      opacity: 0;
      transition: opacity ${me}ms ease;
    }
    :host([shown]) .shade,
    :host([shown]) .bloomwrap,
    :host([shown]) .light,
    :host([shown]) .pill {
      opacity: 1;
    }
    .shade,
    .bloomwrap,
    .light {
      position: absolute;
      inset: 0;
    }
    /* a soft dark band just inside the light: on a pale wallpaper the light would melt into it */
    .shade {
      box-shadow:
        inset 0 0 0 var(--bw) rgb(50 36 22 / 0.18),
        inset 0 0 calc(var(--gw) * 1.6) calc(var(--gw) * 0.35) rgb(50 36 22 / calc(0.12 + var(--k) * 0.3));
    }
    .light {
      --w: var(--bw);
      padding: var(--w);
      background: conic-gradient(
        from var(--a),
        rgb(255 255 255 / var(--k)),
        rgb(255 214 170 / calc(var(--k) * 0.7)) 8%,
        rgb(255 222 190 / calc(var(--k) * 0.35)) 20%,
        rgb(255 222 190 / calc(var(--k) * 0.35)) 36%,
        rgb(255 236 214 / calc(var(--k) * 0.8)) 46%,
        rgb(255 255 255 / var(--k)) 52%,
        rgb(255 200 160 / calc(var(--k) * 0.6)) 60%,
        rgb(255 222 190 / calc(var(--k) * 0.35)) 72%,
        rgb(255 222 190 / calc(var(--k) * 0.35)) 88%,
        rgb(255 240 222 / calc(var(--k) * 0.8)) 96%,
        rgb(255 255 255 / var(--k))
      );
      /* only the rim: the padding box minus the content box */
      -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask:
        linear-gradient(#000 0 0) content-box exclude,
        linear-gradient(#000 0 0);
    }
    /* the blur sits on a wrapper: on the masked rim itself it would be cut back to the rim. No blend mode: one here
       would isolate the overlay, and the pill's frost would then blur only the overlay, not the page behind it */
    .bloomwrap {
      filter: blur(10px) brightness(1.3);
    }
    .bloom {
      --w: var(--gw);
    }
    .pill {
      position: absolute;
      left: 50%;
      bottom: max(22px, env(safe-area-inset-bottom));
      box-sizing: border-box;
      max-width: min(660px, calc(100vw - 80px));
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 22px 10px 16px;
      border-radius: 999px;
      font-size: 17px;
      line-height: 1.3;
      white-space: nowrap;
      text-shadow:
        0 1px 3px rgb(40 30 20 / 0.32),
        0 0 14px rgb(40 30 20 / 0.14);
      /* HomeView frost with its specular edge (base.ts .hv-frost) */
      background: rgb(84 74 64 / 0.2);
      backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
      -webkit-backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
      box-shadow:
        0 0 0 0.75px rgb(60 46 32 / 0.2),
        0 6px 18px rgb(60 45 30 / 0.14),
        inset 0 0 0 1px rgb(255 255 255 / 0.16),
        inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.8),
        inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.4);
      transform: translate(-50%, 10px);
      transition:
        opacity ${me}ms ease,
        transform 0.24s ease;
    }
    :host([shown]) .pill {
      transform: translate(-50%, 0);
      transition:
        opacity ${me}ms ease,
        transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .dot {
      flex: none;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 10px #fff;
      opacity: var(--dot);
    }
    .txt {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (prefers-reduced-transparency: reduce) {
      .pill {
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        background: rgb(84 74 64);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host,
      .shade,
      .bloomwrap,
      .light,
      .pill,
      :host([shown]) .pill {
        transition-duration: 0.01ms;
        transition-delay: 0s;
      }
    }
  `;customElements.get("homeview-voice-overlay")||customElements.define("homeview-voice-overlay",Ie);var Gt=new Map;async function ur(r,i){if(!(r.user&&!r.user.is_admin))try{let{pipelines:e}=await r.callWS({type:"assist_pipeline/pipeline/list"}),t=await Promise.all(e.map(({id:a})=>r.callWS({type:"assist_pipeline/pipeline_debug/list",pipeline_id:a}).then(o=>o.pipeline_runs.map(l=>({...l,pipeline_id:a}))))),s=Wi(t.flat(),i);if(!s)return;let{events:n}=await r.callWS({type:"assist_pipeline/pipeline_debug/get",pipeline_id:s.pipeline_id,pipeline_run_id:s.pipeline_run_id});return Vi(n)}catch{return}}function mr(r,i){let e=Gt.get(r);e||Gt.set(r,e={mem:{},text:{},ask:0,timer:0,drop:0});let t=e;clearTimeout(t.drop);let s=()=>{let a=t.mem.phase;!a&&!t.el||(t.el||Q(t.el=document.createElement("homeview-voice-overlay")),t.el.phase=a,a&&(t.el.line=Ki(a,t.text)))},n=a=>{clearTimeout(t.timer),t.timer=0;let o=a.states[i.satellite],l=!t.mem.phase||t.mem.idleSince!==void 0,c=ji(t.mem,o==null?void 0:o.state,new URLSearchParams(location.search).has("edit"),Date.now(),dr);if((!c.show||l&&t.mem.idleSince===void 0)&&(t.text={},t.since=c.show?o==null?void 0:o.last_changed:void 0,t.readFor=void 0,t.ask++),c.hideIn&&(t.timer=window.setTimeout(()=>n(a),c.hideIn)),s(),i.transcript&&c.show&&o&&o.state!=="listening"&&o.state!==t.readFor){t.readFor=o.state;let h=++t.ask;ur(a,t.since).then(d=>{!d||h!==t.ask||!t.mem.phase||(t.text={heard:d.heard??t.text.heard,reply:d.reply??t.text.reply},s())})}};return{look:n,stop:()=>{clearTimeout(t.timer),t.drop=window.setTimeout(()=>{Gt.delete(r);let a=t.el;a&&(a.phase=void 0,window.setTimeout(()=>a.remove(),me))},hr)}}}var fr=ot(r=>r.satellite?JSON.stringify([r.satellite,!!r.transcript]):void 0,r=>mr(JSON.stringify([r.satellite,!!r.transcript]),r)),pt=fr.feed;var z=$`
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
  /* bare: text straight on the wallpaper, no glass surface (digital clock, full-page layouts) */
  ha-card.hv-bare {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    border: none;
    border-radius: 0;
    background: none;
    box-shadow: none;
    color: var(--hv-ink);
    font-family: var(--hv-font);
    -webkit-font-smoothing: antialiased;
  }
  /* a glass piece inside a card: frost, with the cards' specular edge */
  .hv-frost {
    position: relative;
    isolation: isolate;
    border-radius: var(--hv-radius, 24px);
    background: rgb(84 74 64 / 0.2);
    backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
    -webkit-backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
    box-shadow:
      0 0 0 0.75px rgb(60 46 32 / 0.2),
      0 calc(var(--hv-ref, 200px) * 0.015) calc(var(--hv-ref, 200px) * 0.045) rgb(60 45 30 / 0.14);
  }
  .hv-frost::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow:
      inset 0 0 0 1px rgb(255 255 255 / 0.16),
      inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.8),
      inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.4);
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
    .hv-frost {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      background: rgb(84 74 64) !important;
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
`,E=class extends D{constructor(i="rect"){super(),this.glass=new at(this,i)}static getConfigElement(){let i=document.createElement("homeview-card-editor");return i.fields=this.editorFields,i}setConfig(i){if(!i)throw new Error("Invalid configuration");this.validate(i),this._config=i,this.glass.setOptions({glass:i.glass,wallpaper:i.wallpaper,bevel:i.bevel,refraction:i.refraction,aberration:i.aberration,frost:i.frost})}validate(i){}getCardSize(){return 3}get square(){var i,e;return typeof((e=(i=this._config)==null?void 0:i.grid_options)==null?void 0:e.rows)!="number"}refFrom(i,e){return Math.min(i,e)}get onScreen(){return this.getClientRects().length>0}resume(){}cardClass(){return""}get bare(){return!1}render(){return this._config?this.bare?p`<ha-card class="hv-bare ${this.cardClass()}"><div class="hv-content">${this.renderContent()}</div></ha-card>`:p`<ha-card class="hv-glass ${this.square?"square":""} ${this.cardClass()}">
      <canvas class="hv-bake" aria-hidden="true"></canvas>
      <div class="hv-tint"></div>
      <div class="hv-content">${this.renderContent()}</div>
    </ha-card>`:p``}firstUpdated(i){this.observeCard()}updated(i){var e,t;super.updated(i),this.isConnected&&(i.has("hass")||i.has("_config"))&&(ct(this,(e=this._config)==null?void 0:e.music_page,this.hass),pt(this,(t=this._config)==null?void 0:t.voice_overlay,this.hass)),this.sizer&&this.renderRoot.querySelector("ha-card")!==this.sized&&this.observeCard()}observeCard(){var e;let i=this.renderRoot.querySelector("ha-card");(e=this.sizer)==null||e.disconnect(),this.sized=i??void 0,i&&(this.sizer=new ResizeObserver(()=>{let t=this.refFrom(i.offsetWidth,i.offsetHeight);i.style.setProperty("--hv-ref",`${t}px`),i.style.setProperty("--hv-radius",`${Math.round(Math.max(14,Math.min(34,t*.125)))}px`),i.toggleAttribute("data-wide",i.offsetWidth>i.offsetHeight*1.5),i.toggleAttribute("data-short",i.offsetHeight<240),this.glass.request(!0),i.offsetWidth&&this.resume()}),this.sizer.observe(i))}disconnectedCallback(){var i;super.disconnectedCallback(),(i=this.sizer)==null||i.disconnect(),this.sizer=void 0,ct(this,void 0),pt(this,void 0)}connectedCallback(){var i,e;super.connectedCallback(),this.hasUpdated&&!this.sizer&&this.observeCard(),this.hasUpdated&&(ct(this,(i=this._config)==null?void 0:i.music_page),pt(this,(e=this._config)==null?void 0:e.voice_overlay))}};E.properties={hass:{attribute:!1},_config:{state:!0}},E.editorFields=[];var gr={easing:"cubic-bezier(.34,1.56,.64,1)",duration:520};function vr(r,i,e,t=1){let s=Math.sqrt(i/t),n=e/(2*Math.sqrt(i*t));if(n>=1)return 1-Math.exp(-s*r)*(1+s*r);let a=s*Math.sqrt(1-n*n);return 1-Math.exp(-n*s*r)*(Math.cos(a*r)+n*s/a*Math.sin(a*r))}function br(r=210,i=17,e=1,t=48){let s=o=>vr(o,r,i,e),n=0;for(;n<4&&!(Math.abs(1-s(n))<.002&&Math.abs(1-s(n+.05))<.002);)n+=.01;let a=Array.from({length:t+1},(o,l)=>+s(l/t*n).toFixed(4));return a[t]=1,{easing:`linear(${a.join(",")})`,duration:Math.round(n*1e3)}}var ut;function fs(){if(ut)return ut;let r=br();return ut=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("transition-timing-function","linear(0, 1)")?r:gr,ut}var yr=800,fe=class extends E{constructor(){super(...arguments);this.sendTimer=0;this.lastDir=0}static getStubConfig(e){return{entity:Object.keys(e.states).find(t=>t.startsWith("climate."))??""}}validate(e){if(!e.entity||!e.entity.startsWith("climate."))throw new Error("Pick a climate entity")}getGridOptions(){return{columns:8,rows:"auto",min_columns:6,min_rows:4}}getCardSize(){return 6}refFrom(e,t){return Math.min(e,t)/2}get stateObj(){var e;return(e=this.hass)==null?void 0:e.states[this._config.entity]}get step(){var e,t,s;return((e=this._config)==null?void 0:e.step)??((t=this.stateObj)==null?void 0:t.attributes.target_temp_step)??(((s=this.hass)==null?void 0:s.config.unit_system.temperature)==="\xB0C"?.5:1)}current(){let e=this.stateObj;if(!e)return{mode:"none"};let t=Pt(e),s=this._pending;return s&&Date.now()-s.at<6e3?{...t,...Object.fromEntries(Object.entries(s).filter(([n,a])=>n!=="at"&&a!==void 0))}:t}activeSide(){return this.current().mode!=="dual"?"single":this._side??_i(this.stateObj)}willUpdate(e){if(e.has("hass")&&this._pending&&this.stateObj&&!this.sendTimer){let t=Pt(this.stateObj),s=this._pending;((s.value===void 0||s.value===t.value)&&(s.low===void 0||s.low===t.low)&&(s.high===void 0||s.high===t.high)||Date.now()-s.at>6e3)&&(this._pending=void 0)}}shown(){let e=this.current(),t=this.activeSide();return t==="single"?e.value:t==="low"?e.low:e.high}stepBy(e){let t=this.stateObj;if(!t)return;let s=this.current(),n=this.activeSide(),a=t.attributes,o=a.min_temp??-1/0,l=a.max_temp??1/0,c=this.step,h=this.shown();if(h===void 0)return;let d=o,u=l;n==="low"&&s.high!==void 0&&(u=Math.min(l,s.high-c)),n==="high"&&s.low!==void 0&&(d=Math.max(o,s.low+c));let f=xi(h+e*c,c,d,u);if(f===h)return;this.ghost(e);let g={...this._pending??{},at:Date.now()};n==="single"?g.value=f:g[n]=f,this._pending=g,clearTimeout(this.sendTimer),this.sendTimer=window.setTimeout(()=>this.send(),yr)}send(){this.sendTimer=0;let e=this.stateObj;if(!e||!this.hass||!this._pending)return;let t=this.current(),s=t.mode==="dual"?{target_temp_low:t.low,target_temp_high:t.high}:{temperature:t.value};this._pending={...this._pending,at:Date.now()},this.hass.callService("climate","set_temperature",s,{entity_id:e.entity_id})}ghost(e){this.lastDir=e;let t=this.renderRoot.querySelector(".num:not(.ghost)");if(!t||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let s=t.cloneNode(!0);s.classList.add("ghost"),t.parentElement.appendChild(s),s.animate([{transform:"none",opacity:1},{transform:`translateY(${-36*e}%) scale(.9)`,opacity:0}],{duration:200,easing:"cubic-bezier(.4,0,1,1)",fill:"forwards"}).finished.then(()=>s.remove(),()=>s.remove())}updated(e){var a;if((a=super.updated)==null||a.call(this,e),!this.lastDir)return;let t=this.lastDir;this.lastDir=0;let s=this.renderRoot.querySelector(".num:not(.ghost)");if(!s||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let n=fs();s.animate([{transform:`translateY(${40*t}%) scale(.9)`},{transform:"none"}],{duration:n.duration,easing:n.easing}),s.animate([{opacity:0},{opacity:1}],{duration:180,easing:"ease-out"})}fmt(e){return e===void 0?"--":this.step<1?e.toFixed(1):String(Math.round(e))}renderContent(){let e=this._config;if(!this.hass)return m;let t=this.stateObj;if(!t)return p`<div class="center warning ink">Entity not found: ${e.entity}</div>`;let s=this.current(),n=this.activeSide(),a=t.state==="off",o=A(t),l=this.shown(),c=t.attributes.current_temperature,h=e.subtitle??Ze(this.hass,e.entity)??t.attributes.friendly_name,d=t.attributes,u=!o&&l!==void 0,f=!u||l>=((n==="low"&&s.high!==void 0?s.high-this.step:d.max_temp)??1/0),g=!u||l<=((n==="high"&&s.low!==void 0?s.low+this.step:d.min_temp)??-1/0);return p`<div class="thermo">
      <div class="temp" aria-live="polite">
        <span class="num ink ${a||o?"dim":""}">${o?"--":s.mode==="none"?this.fmt(c):this.fmt(l)}</span>
        ${s.mode==="dual"?p`<div class="sides ink">
              <button class="side ${n==="low"?"sel":""}" @click=${()=>this._side="low"} aria-pressed=${String(n==="low")}>Heat ${this.fmt(s.low)}</button>
              <button class="side ${n==="high"?"sel":""}" @click=${()=>this._side="high"} aria-pressed=${String(n==="high")}>Cool ${this.fmt(s.high)}</button>
            </div>`:m}
      </div>
      <div class="bar">
        <button class="chev" aria-label="Lower setpoint" ?disabled=${g} @click=${()=>this.stepBy(-1)}>${b.chevronDown}</button>
        <div class="label ink">
          <div class="title">${e.name??"Thermostat"}</div>
          <div class="sub">${a?"Off":h}${typeof c=="number"?p` &bull; ${this.fmt(c)}&deg;`:m}</div>
        </div>
        <button class="chev" aria-label="Raise setpoint" ?disabled=${f} @click=${()=>this.stepBy(1)}>${b.chevronUp}</button>
      </div>
    </div>`}};fe.properties={...E.properties,_pending:{state:!0},_side:{state:!0}},fe.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"climate"}}}},{name:"name",selector:{text:{}}},{name:"subtitle",helper:"Defaults to the entity's area",selector:{text:{}}},{name:"step",helper:"Defaults to the entity's target temperature step",selector:{number:{min:.1,max:5,step:.1,mode:"box"}}}],fe.styles=[z,$`
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
    `];customElements.define("homeview-thermostat-card",fe);L("homeview-thermostat-card","HomeView Thermostat","Large liquid-glass thermostat with spring setpoint and heat/cool support.");var gs=["light","switch","fan","lock","cover","scene","script","input_boolean","media_player"],wr=500,ee=class extends E{constructor(){super(...arguments);this._confirming=!1;this._flash=!1;this.holdTimer=0;this.held=!1;this.confirmTimer=0;this.down=()=>{this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=window.setTimeout(()=>{this.held=!0,H(this,"hass-more-info",{entityId:this._config.entity})},wr)};this.up=()=>clearTimeout(this.holdTimer);this.cancel=()=>clearTimeout(this.holdTimer);this.onTap=()=>{if(this.held){this.held=!1;return}let e=this._config,t=e.tap_action??"toggle";if(t==="none"||!this.hass)return;if(t==="more-info"){H(this,"hass-more-info",{entityId:e.entity});return}if(t==="navigate"){Ae(e.navigation_path.trim());return}let s=this.hass.states[e.entity];if(!s)return;let n=O(e.entity);if(n==="lock"&&s.state==="locked"&&e.confirm_unlock&&!this._confirming){this._confirming=!0,clearTimeout(this.confirmTimer),this.confirmTimer=window.setTimeout(()=>this._confirming=!1,3e3);return}this._confirming=!1;let a=ki(n,ce(s));a&&(n==="scene"&&(this._flash=!0,setTimeout(()=>this._flash=!1,1200)),this.hass.callService(a[0],a[1],{},{entity_id:e.entity}))}}static getStubConfig(e){return{entity:Object.keys(e.states).find(s=>O(s)==="light")??Object.keys(e.states).find(s=>gs.includes(O(s)))??""}}validate(e){var t;if(!e.entity)throw new Error("Pick an entity");if(e.tap_action==="navigate"&&!((t=e.navigation_path)!=null&&t.trim()))throw new Error("Add the navigation_path to open, such as /lovelace/music")}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}getCardSize(){return 3}cardClass(){var a;let e=this._config,t=(a=this.hass)==null?void 0:a.states[e.entity],s=O(e.entity),n=t&&!A(t)&&Rt(s,t.state)&&s!=="media_player";return`tile ${s} ${n||this._flash?"on":""} ${A(t)?"unavailable":""} ${this._confirming?"confirming":""}`}renderContent(){let e=this._config;if(!this.hass)return m;let t=this.hass.states[e.entity],s=O(e.entity),n=!!t&&!A(t)&&Rt(s,t.state),a=e.name??(t?N(this.hass,e.entity):e.entity),o=e.subtitle??Ze(this.hass,e.entity)??"",l="";t&&s==="media_player"&&!A(t)&&({title:a,sub:o}=Oi(t,a),["playing","paused"].includes(ce(t))&&t.attributes.entity_picture&&(l=this.hass.hassUrl(t.attributes.entity_picture))),t?t.state==="unavailable"?o="Unavailable":this._confirming?o="Tap again to unlock":s==="lock"&&["locking","unlocking","jammed","opening","open"].includes(t.state)&&(o=t.state[0].toUpperCase()+t.state.slice(1)+(t.state.endsWith("ing")?"\u2026":"")):o="Entity not found";let c=t?s==="lock"||s==="cover"||s==="media_player"?ce(t):s==="scene"||s==="script"?"":n?"on":"off":"missing";return p`<button
      class="hit"
      aria-label="${[a,o,c].filter(Boolean).join(", ")}"
      aria-pressed=${s==="scene"||s==="script"||s==="media_player"||e.tap_action==="navigate"?m:String(n)}
      ?disabled=${!t||t.state==="unavailable"}
      @pointerdown=${this.down}
      @pointerup=${this.up}
      @pointerleave=${this.cancel}
      @pointercancel=${this.cancel}
      @click=${this.onTap}
      @contextmenu=${h=>h.preventDefault()}
    >
      <span class="icon">${l?p`<img class="art" src=${l} alt="" draggable="false" />`:e.icon?p`<ha-icon .icon=${e.icon}></ha-icon>`:ms(s,t==null?void 0:t.attributes.device_class,n)}</span>
      <span class="label ink"><span class="title">${a}</span><br /><span class="sub">${o}</span></span>
    </button>`}};ee.properties={...E.properties,_confirming:{state:!0},_flash:{state:!0}},ee.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:gs}}}},{name:"name",selector:{text:{}}},{name:"subtitle",helper:"Defaults to the entity's area",selector:{text:{}}},{name:"icon",helper:"Optional mdi: icon; HomeView glyphs are used by default",selector:{icon:{}}},{name:"tap_action",label:"Tap action",selector:{select:{mode:"dropdown",options:[{value:"toggle",label:"Toggle / run"},{value:"more-info",label:"More info"},{value:"navigate",label:"Open a view"},{value:"none",label:"Nothing"}]}}},{name:"navigation_path",label:"View to open",helper:"With Open a view: a dashboard path such as /echo-show/music",selector:{text:{}}},{name:"confirm_unlock",label:"Confirm before unlocking (locks)",selector:{boolean:{}}}],ee.styles=[z,$`
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
        box-sizing: border-box;
        padding: 0 calc(var(--hv-ref) * 0.07);
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
      /* active: frosted white glass and dark ink, as Apple's HomeView "on" tiles; the glyph glows warm gold on every
         wallpaper. The glass swaps in ~0.1 s; the glyph follows a beat later, as on the panel. */
      ha-card.tile .hv-tint {
        transition-duration: 0.08s;
      }
      /* the ink fades with the glass so it never sits white on white mid-swap */
      ha-card.tile .label,
      ha-card.tile .label .sub {
        transition: color 0.08s ease, text-shadow 0.08s ease;
      }
      ha-card.tile .icon svg {
        transition: color 0.18s ease 0.08s, filter 0.18s ease 0.08s;
      }
      ha-card.on {
        --hv-fill: rgb(255 255 255 / 0.8);
      }
      ha-card.on .icon {
        color: rgb(242 165 36);
      }
      ha-card.on .label {
        text-shadow: none;
        color: #1d1d1f;
      }
      ha-card.on .label .sub {
        color: rgb(29 29 31 / 0.6);
      }
      ha-card.on .icon svg {
        filter: drop-shadow(0 0 calc(var(--hv-ref) * 0.05) rgb(242 165 36 / 0.7));
      }
      /* padlock: locking flips the shackle 180deg about the leg it shares with the closed shackle (scaleX through 0)
         and slides the lock home; unlocking runs the same flip back. Transforms only, so it stays on the compositor. */
      .padlock .pl {
        transition: transform 0.2s cubic-bezier(0.3, 0, 0.2, 1) 0.22s;
      }
      .padlock .sh-open,
      .padlock .sh-closed {
        transform-origin: 16.55px 0;
      }
      ha-card:not(.on) .padlock .sh-open,
      ha-card.on .padlock .sh-closed {
        transform: scaleX(0);
        transition: transform 0.1s cubic-bezier(0.4, 0, 1, 1) 0.22s;
      }
      ha-card:not(.on) .padlock .sh-closed,
      ha-card.on .padlock .sh-open {
        transform: none;
        transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1) 0.32s;
      }
      ha-card.on .padlock .pl {
        transform: translateX(-1.9px);
      }
      @media (prefers-reduced-motion: reduce) {
        .padlock * {
          transition: none !important;
        }
      }
      ha-card.confirming .icon {
        color: #ffb27a;
      }
      ha-card.confirming .sub {
        color: #fff;
        font-weight: 600;
      }
      ha-card.fan.on .blades {
        animation: spin 1.1s linear infinite;
        transform-origin: 12px 10px;
      }
      .icon img.art {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: calc(var(--hv-ref) * 0.05);
        box-shadow: 0 calc(var(--hv-ref) * 0.015) calc(var(--hv-ref) * 0.05) rgb(40 30 20 / 0.3);
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `];customElements.define("homeview-tile-card",ee);L("homeview-tile-card","HomeView Tile","Liquid-glass tile for lights, switches, fans, locks, covers, scenes and scripts.");var He=class extends E{constructor(){super("circle");this.raf=0;this.timer=0;this.loop=()=>{if(this.raf=this.timer=0,!this.onScreen)return;this.draw();let e=this.mode();e==="sweep"?this.raf=requestAnimationFrame(this.loop):this.timer=window.setTimeout(this.loop,(e==="off"?6e4-new Date().getSeconds()*1e3:1e3)-new Date().getMilliseconds()+5)}}static getStubConfig(){return{seconds:"sweep"}}getGridOptions(){return this.digital?{columns:6,rows:3,min_columns:3,min_rows:2}:{columns:4,rows:"auto",min_columns:3,min_rows:2}}get digital(){var e;return((e=this._config)==null?void 0:e.face)==="digital"}get bare(){return this.digital}get square(){return!this.digital&&super.square}refFrom(e,t){return this.digital?Math.min(t,e*.7):super.refFrom(e,t)}validate(e){if(e.face&&e.face!=="analog"&&e.face!=="digital")throw new Error(`Unknown face: ${e.face} (analog or digital)`);if(e.time_zone)try{new Intl.DateTimeFormat("en",{timeZone:e.time_zone})}catch{throw new Error(`Unknown time zone: ${e.time_zone}`)}}cardClass(){return this.digital?"digital":"clock"}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){var e;super.disconnectedCallback(),cancelAnimationFrame(this.raf),clearTimeout(this.timer),(e=this.fit)==null||e.disconnect(),this.fit=void 0}firstUpdated(e){super.firstUpdated(e),this.fit??(this.fit=new ResizeObserver(()=>this.fitFace())),this.fit.observe(this)}fitFace(){let e=this.renderRoot.querySelector("ha-card");if(!e)return;let t=this.clientWidth,s=this.clientHeight,n=this.square||this.digital||!t||!s?0:Math.min(t,s);e.style.width=e.style.height=n?`${n}px`:"",e.style.margin=n?`${(s-n)/2}px auto 0`:""}resume(){!this.raf&&!this.timer&&this.loop()}mode(){var t;if(this.digital)return"off";let e=((t=this._config)==null?void 0:t.seconds)??"sweep";return e==="sweep"&&matchMedia("(prefers-reduced-motion: reduce)").matches?"tick":e}draw(){var a,o;if(this.digital){let l=this.renderRoot.querySelector(".time"),c=this.now();l&&l.textContent!==c.time&&this.requestUpdate();return}let e=this.renderRoot,t=e.querySelector("#hh");if(!t)return;let s=Ot((a=this._config)==null?void 0:a.time_zone),n=$i(s.h,s.m,s.s+(this.mode()==="sweep"?s.ms/1e3:0));t.setAttribute("transform",`rotate(${n.h})`),e.querySelector("#mh").setAttribute("transform",`rotate(${n.m})`),(o=e.querySelector("#sh"))==null||o.setAttribute("transform",`rotate(${n.s})`)}now(){var e,t,s,n,a,o;return Si(new Date,((t=(e=this.hass)==null?void 0:e.locale)==null?void 0:t.language)??((s=this.hass)==null?void 0:s.language),(a=(n=this.hass)==null?void 0:n.locale)==null?void 0:a.time_format,(o=this._config)==null?void 0:o.time_zone)}renderContent(){var s;if(this.digital){let n=this.now();return p`<div class="digital-face ink">
        <span class="time">${n.time}</span><span class="date">${n.date}</span>
      </div>`}let e=Array.from({length:12},(n,a)=>w`<line class="tick" x1="0" x2="0" y1="-84" y2="-68" transform="rotate(${a*30})"/>`),t=Ot((s=this._config)==null?void 0:s.time_zone);return p`<svg class="face" viewBox="-100 -100 200 200" role="img" aria-label="Clock, ${String(t.h).padStart(2,"0")}:${String(t.m).padStart(2,"0")}">
      ${e}
      <line class="hand" id="hh" x1="0" y1="0" x2="0" y2="-42" stroke-width="7" />
      <line class="hand" id="mh" x1="0" y1="0" x2="0" y2="-66" stroke-width="5.5" />
      ${this.mode()==="off"?"":w`<line class="hand" id="sh" x1="0" y1="18" x2="0" y2="-80" stroke-width="1.8" />`}
      <circle r="4.2" fill="#fff" />
    </svg>`}updated(e){var t;(t=super.updated)==null||t.call(this,e),this.draw()}};He.editorFields=[{name:"face",label:"Face",selector:{select:{mode:"dropdown",options:[{value:"analog",label:"Analog, on glass"},{value:"digital",label:"Digital, on the wallpaper"}]}}},{name:"seconds",label:"Seconds hand (analog)",selector:{select:{mode:"dropdown",options:[{value:"sweep",label:"Smooth sweep"},{value:"tick",label:"Tick"},{value:"off",label:"Hidden"}]}}},{name:"time_zone",label:"Time zone",helper:"IANA name such as Europe/Paris; defaults to this device's time",selector:{text:{}}}],He.styles=[z,$`
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
      .digital-face {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: calc(var(--hv-ref) * 0.05);
        white-space: nowrap;
        overflow: hidden;
      }
      .time {
        font-size: calc(var(--hv-ref) * 0.46);
        font-weight: 300;
        line-height: 1;
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
      }
      .date {
        font-size: calc(var(--hv-ref) * 0.115);
        font-weight: 400;
        line-height: 1.2;
        color: rgb(255 255 255 / 0.9);
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
    `];customElements.define("homeview-clock-card",He);L("homeview-clock-card","HomeView Clock","Analog clock on a round liquid-glass face, or a big digital time and date.");var Fe=class extends I{constructor(){super(...arguments);this.state=dt();this.label="Photo slideshow";this.closeLabel="Close slideshow";this.openMs=3*3600*1e3}renderBackdrop(){return De(this.state,"cover")}renderBody(){return De(this.state,"contain")}dragX(e){var t;(t=this.host)==null||t.dragTo(e)}dragXEnd(e){var t;(t=this.host)==null||t.dragEnd(e)}arrow(e){var t;return(t=this.host)==null||t.step(e),!0}closed(){var e;(e=this.host)==null||e.slideshowClosed()}};Fe.properties={...I.properties,state:{attribute:!1}},Fe.styles=[ht,I.overlayStyles,$`
      :host {
        --hv-gap: 28px;
      }
      .backdrop img {
        filter: blur(40px) saturate(1.3) brightness(0.55);
        scale: 1.15;
        will-change: transform;
      }
      @media (prefers-reduced-motion: reduce) {
        img {
          transition-duration: 0.01ms !important;
        }
      }
    `];customElements.get("homeview-photo-slideshow")||customElements.define("homeview-photo-slideshow",Fe);var xr=1800*1e3,jt=30*1e3,_r=r=>Math.min(300*1e3,10*1e3*2**r),kr=3e3*1e3,ge=class extends E{constructor(){super(...arguments);this._stage=dt();this._error="";this.items=[];this.index=-1;this.timer=0;this.settleTimer=0;this.listedAt=0;this.fails=0;this.parked=!1;this.loadedFor="";this.listRun=0;this.listFails=0;this.shown=new Qe;this.nav=0;this.dragging=!1;this.onKey=e=>{if(e.key==="Enter"||e.key===" ")this.openSlideshow();else if(e.key==="ArrowRight")this.step(1);else if(e.key==="ArrowLeft")this.step(-1);else return;e.preventDefault()}}static getStubConfig(){return{media:"media-source://media_source/local",interval:30,recursive:!0}}validate(e){let t=le(e.media);if(!t.length||t.some(s=>!s.startsWith("media-source://")))throw new Error("Set media to a media-source:// folder, or a list of them")}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}disconnectedCallback(){var e;super.disconnectedCallback(),clearTimeout(this.timer),this.loadedFor="",(e=this.slideshow)==null||e.close()}connectedCallback(){super.connectedCallback(),this.hass&&this._config&&this.requestUpdate()}firstUpdated(e){super.firstUpdated(e);let t=this.renderRoot.querySelector("ha-card");!t||this.untrack||(this.untrack=ue(t,{move:s=>{var n;return((n=this._config)==null?void 0:n.swipe)!==!1&&this.dragTo(s)},end:s=>s==="tap"?this.openSlideshow():this.dragEnd(s)},!1))}updated(e){var t;(t=super.updated)==null||t.call(this,e),this.slideshow&&(this.slideshow.state=this._stage),this.load()}load(){let e=this._config;if(!this.hass||!e||!this.onScreen)return!1;let t=JSON.stringify([le(e.media),!!e.recursive,!!e.shuffle]);return t===this.loadedFor?!1:(this.loadedFor=t,this.listFails=0,this.relist(!0),!0)}async relist(e){var a;let t=this._config,s=this.hass,n=++this.listRun;clearTimeout(this.timer);try{let o=await Ci({callWS:l=>G(s.callWS(l),jt)},t.media,!!t.recursive);if(n!==this.listRun)return;this.items=t.shuffle?Ai(o):o,this.listedAt=Date.now(),this.listFails=0,this._error=o.length?"":"No pictures in this folder",e&&(this.index=-1,this.shown.clear(),this.ahead=void 0,this.advance())}catch(o){if(n!==this.listRun||!e)return;let l=o;if(this._error=`Cannot open ${le(t.media).join(", ")}: ${l.message??((a=l.error)==null?void 0:a.message)??o}`,!this.isConnected)return;this.timer=window.setTimeout(()=>{this.onScreen?this.relist(!0):this.loadedFor=""},_r(this.listFails++))}}async advance(){if(clearTimeout(this.timer),!this._config||!this.items.length||!this.isConnected||(this.parked=!this.onScreen&&!this.slideshow,this.parked))return;let e=this.nav;Date.now()-this.listedAt>xr&&await this.relist(!1),e===this.nav&&await this.go(1,!1)}schedule(){clearTimeout(this.timer),!(!this._config||!this.isConnected)&&(this.timer=window.setTimeout(()=>void this.advance(),Math.max(5,this._config.interval??30)*1e3))}unseen(){var t;if(!this.items.length)return;let e=this.items[(this.index+1)%this.items.length];return((t=this.ahead)==null?void 0:t.id)===e?this.ahead:{id:e}}async fetch(e){if(!e.url||Date.now()-(e.at??0)>kr){e.ready=!1;let s=await G(this.hass.callWS({type:"media_source/resolve_media",media_content_id:e.id,expires:3600}),jt);e.url=s.url.startsWith("http")?s.url:this.hass.hassUrl(s.url),e.at=Date.now()}let t=new Image;return t.src=e.url,await G(t.decode(),jt),e.ready=!0,e.url}async prefetch(){let e=this.shown.peek(1)??(this.ahead=this.unseen());if(!(!e||e.ready))try{await this.fetch(e)}catch{}}async go(e,t){let s=++this.nav;for(clearTimeout(this.timer);;){let n=this.shown.peek(e),a=n??(e>0?this.unseen():void 0);if(!a)break;n||(this.index=(this.index+1)%this.items.length);try{let o=await this.fetch(a);if(s!==this.nav)return;n?this.shown.step(e):this.shown.push(a),a===this.ahead&&(this.ahead=void 0),this.fails=0,await this.show(o,t?e:0),this.prefetch();break}catch{if(s!==this.nav)return;if(a===this.ahead&&(this.ahead=void 0),n&&this.shown.drop(a),++this.fails>=Math.min(this.items.length,20))break}}this.settle(),this.schedule()}async show(e,t){clearTimeout(this.settleTimer);let s=this._stage,n=1-s.front,a=[...s.urls];if(a[n]=e,!t){this._stage={urls:a,front:n,drag:0,side:0,still:!1};return}(s.urls[n]!==e||s.side!==t)&&(this._stage={...s,urls:a,side:t,still:!0},await this.painted()),this._stage={urls:a,front:n,drag:0,side:-t,still:!1}}settle(){let e=this._stage;!e.drag&&!e.side||(clearTimeout(this.settleTimer),this._stage={...e,drag:0,still:!1},this.settleTimer=window.setTimeout(()=>this._stage={...this._stage,side:0,still:!0},j+60))}async painted(){var e,t,s;await this.updateComplete,this.slideshow&&(this.slideshow.state=this._stage,await this.slideshow.updateComplete,(t=(e=this.slideshow.shadowRoot)==null?void 0:e.querySelector("img"))==null||t.getBoundingClientRect()),(s=this.renderRoot.querySelector("img"))==null||s.getBoundingClientRect()}dragTo(e){this.dragging||(this.dragging=!0,this.nav++,clearTimeout(this.timer),clearTimeout(this.settleTimer));let t=e<0?1:-1,s=this.shown.peek(t)??(t>0?this.ahead:void 0),n=s!=null&&s.ready?s.url:"",a=this._stage,o=[...a.urls];n&&(o[1-a.front]=n);let l=t<0?!this.shown.peek(-1):this.items.length<2;this._stage={...a,urls:o,drag:l?e/3:e,side:n?t:0,still:!0}}dragEnd(e){if(this.dragging){if(this.dragging=!1,e==="left"||e==="right"){this.go(e==="left"?1:-1,!0);return}this.settle(),this.schedule()}}step(e){this.items.length&&this.go(e,!0)}openSlideshow(){if(this.slideshow||!this._stage.urls[this._stage.front]||pe(this))return;let e=document.createElement("homeview-photo-slideshow");e.host=this,e.state=this._stage,this.slideshow=e,Q(e)}slideshowClosed(){var e;this.slideshow=void 0,this.isConnected&&((e=this.renderRoot.querySelector("ha-card"))==null||e.focus({preventScroll:!0}))}resume(){!this.load()&&this.parked&&this.advance()}render(){if(!this._config)return p``;let e=this._config.fit??"cover",t=!!this._stage.urls[this._stage.front],s=this._config.swipe!==!1;return p`<ha-card
      class="photo ${s?"swiper":""} ${this.square?"square":""} ${t?"shown":""}"
      role=${t?"button":m}
      tabindex=${t?"0":m}
      aria-label=${t?"Photo frame: open the full-screen slideshow":m}
      @keydown=${this.onKey}
    >
      ${De(this._stage,e)} ${this._error?p`<div class="msg">${this._error}</div>`:m}
    </ha-card>`}renderContent(){return m}};ge.properties={...E.properties,_stage:{state:!0},_error:{state:!0}},ge.editorFields=[{name:"media",label:"Media folders",required:!0,list:!0,helper:"One or more media-source folders, e.g. media-source://media_source/local/photos; the slideshow cycles through all of them. Open Media in the sidebar to find a folder; DLNA, Synology Photos and other media servers HA can browse work too.",selector:{text:{multiple:!0}}},{name:"interval",label:"Seconds per picture",selector:{number:{min:5,max:3600,step:1,mode:"box",unit_of_measurement:"s"}}},{name:"shuffle",selector:{boolean:{}}},{name:"recursive",label:"Include subfolders",selector:{boolean:{}}},{name:"swipe",label:"Swipe for the next picture",selector:{boolean:{}}},{name:"fit",selector:{select:{mode:"dropdown",options:[{value:"cover",label:"Fill"},{value:"contain",label:"Fit whole picture"}]}}}],ge.styles=[z,ht,$`
      ha-card.photo {
        position: relative;
        height: 100%;
        overflow: hidden;
        border: none;
        border-radius: var(--hv-radius, 24px);
        background: rgb(0 0 0 / 0.25);
        box-shadow: 0 calc(var(--hv-ref, 200px) * 0.03) calc(var(--hv-ref, 200px) * 0.09) rgb(40 30 20 / 0.18);
        --hv-gap: 12px;
        user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
      }
      /* horizontal drags are ours (swipe), vertical ones still scroll the page */
      ha-card.photo.swiper {
        touch-action: pan-y;
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
    `];customElements.define("homeview-photo-card",ge);L("homeview-photo-card","HomeView Photo Frame","Slideshow of pictures from a Home Assistant media source.");var mt=class{constructor(i,e=16e3){this.acc=0;this.n=0;this.pos=0;this.ratio=i/e}push(i){if(this.ratio<=1)return i.slice();let e=[];for(let t=0;t<i.length;t++)this.acc+=i[t],this.n++,this.pos+=1,this.pos>=this.ratio&&(e.push(this.acc/this.n),this.acc=0,this.n=0,this.pos-=this.ratio);return Float32Array.from(e)}},ft=class{constructor(i=1.2,e=7,t=15){this.heard=!1;this.floor=.01;this.sum=0;this.n=0;this.run=0;this.quiet=0;this.frames=0;this.silence=i,this.noSpeech=e,this.max=t}push(i){for(let t of i)this.sum+=t*t,!(++this.n<320)&&(this.frame(Math.sqrt(this.sum/this.n)),this.sum=0,this.n=0);let e=this.frames/50;return this.heard?this.quiet>=this.silence-1e-9||e>=this.max?"end":"listen":e>=Math.min(this.noSpeech,this.max)?"none":"listen"}frame(i){if(this.frames++,i>Math.max(this.floor*3,.006)){this.run+=.02,this.run>=.1&&(this.heard=!0,this.quiet=0);return}this.run=0,this.floor=i<this.floor?i:this.floor+(i-this.floor)*(.02/2),this.heard&&(this.quiet+=.02)}};function vs(r){let i=new Int16Array(r.length);for(let e=0;e<r.length;e++){let t=Math.max(-1,Math.min(1,r[e]));i[e]=t<0?t*32768:t*32767}return i}function gt(r,i){let e=i?new Uint8Array(i.buffer,i.byteOffset,i.byteLength):new Uint8Array(0),t=new Uint8Array(1+e.length);return t[0]=r,t.set(e,1),t}var bs=`
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
`;async function ys(r,i,e){let t,s=()=>t==null?void 0:t.getTracks().forEach(a=>a.stop()),n=()=>{if(i.aborted)throw new DOMException("Aborted","AbortError")};try{t=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}),n(),await r.resume(),n();let a=!1,o=f=>{a||e(f)},l,c=()=>{};if(r.audioWorklet){let f=URL.createObjectURL(new Blob([bs],{type:"text/javascript"}));try{await r.audioWorklet.addModule(f)}finally{URL.revokeObjectURL(f)}n();let g=new AudioWorkletNode(r,"homeview-recorder");g.port.onmessage=k=>o(k.data),c=()=>g.port.onmessage=null,l=g}else{let f=r.createScriptProcessor(4096,1,1);f.onaudioprocess=g=>o(g.inputBuffer.getChannelData(0)),c=()=>f.onaudioprocess=null,f.connect(r.destination),l=f}let h=r.createMediaStreamSource(t),d=r.createAnalyser();d.fftSize=256,d.smoothingTimeConstant=.6,h.connect(d),h.connect(l);let u=l;return{analyser:d,close(){a||(a=!0,c(),u.disconnect(),h.disconnect(),s())}}}catch(a){throw s(),a}}var $r=16e3,Sr=30,Cr=6,Vt={idle:"Tap to talk",listening:"Listening",thinking:"Thinking",responding:"Responding",error:"Something went wrong"},ve=class extends E{constructor(){super(...arguments);this._phase="idle";this._heard="";this._reply="";this._error="";this._detail="";this._showDetail=!1;this.lastText="";this._typing=!1;this.handlerId=null;this.pending=[];this.audioDone=!1;this.runId=0;this.speaking=!1;this.stopTimer=0;this.raf=0;this.levels=new Float32Array(48);this.t0=performance.now();this.loop=()=>{this.raf=this.draw()?requestAnimationFrame(this.loop):0};this.showDetail=e=>{e.preventDefault(),this._showDetail=!0};this.submit=e=>{e.preventDefault();let t=e.target.elements.namedItem("q");this.ask(t.value),t.value=""}}static getStubConfig(){return{speak:!0}}getGridOptions(){return{columns:12,rows:"auto",min_columns:6,min_rows:3}}getCardSize(){return 5}get square(){return!1}refFrom(e,t){return Math.min(e,t,220)}cardClass(){var t,s;return`voice ${typeof((s=(t=this._config)==null?void 0:t.grid_options)==null?void 0:s.rows)!="number"?"wide":""} ${this.phase()}`}phase(){var t,s,n;let e=(t=this._config)==null?void 0:t.satellite;return e?Lt((n=(s=this.hass)==null?void 0:s.states[e])==null?void 0:n.state):this._phase}micBlocked(){var e;return window.isSecureContext?(e=navigator.mediaDevices)!=null&&e.getUserMedia?null:"unsupported":"insecure"}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){var e;super.disconnectedCallback(),cancelAnimationFrame(this.raf),this.teardown(),this.speaking=!1,this._phase!=="error"&&(this._phase="idle"),this.stopAudio(),(e=this.ctx)==null||e.close(),this.ctx=void 0,this.analyser=void 0}stopAudio(){let e=this.audio;e&&(e.pause(),e.removeAttribute("src"),e.load())}async talk(){var s;if(this._phase==="listening")return this.endAudio();if(this._phase==="thinking"||this._phase==="responding")return;if(this.micBlocked()){this._typing=!0;return}let e=this.ctx??(this.ctx=new AudioContext);this.teardown(),this.reset(),this.lastText="",this.endpointer=new ft,this.resampler=new mt(e.sampleRate);let t=this.abort=new AbortController;this._phase="listening",this.analyser=void 0;try{let n=await ys(e,t.signal,a=>this.onAudio(a));if(t.signal.aborted)return n.close();this.mic=n,this.analyser=n.analyser,this.stopTimer=window.setTimeout(()=>this.endAudio(),$r),await this.run({start_stage:"stt",end_stage:((s=this._config)==null?void 0:s.speak)===!1?"intent":"tts",input:{sample_rate:16e3,no_vad:!0}})}catch(n){t.signal.aborted||this.fail(n)}}retry(){this.lastText?this.ask(this.lastText):this.talk()}async ask(e){var t;if(e.trim()){this.teardown(),this.reset(),this.lastText=e,this._heard=e,this._phase="thinking";try{await this.run({start_stage:"intent",end_stage:((t=this._config)==null?void 0:t.speak)===!1?"intent":"tts",input:{text:e}})}catch(s){this.fail(s)}}}async run(e){let t=this._config,s=++this.runId,n=await this.hass.connection.subscribeMessage(a=>s===this.runId&&this.onEvent(a),{type:"assist_pipeline/run",...e,...t.pipeline?{pipeline:t.pipeline}:{},...this.conversationId?{conversation_id:this.conversationId}:{}});s===this.runId?this.unsub=n:await n().catch(()=>{})}onEvent(e){var n,a,o,l,c,h,d,u,f;let t=e.data??{};if(e.type==="run-start"){this.handlerId=((n=t.runner_data)==null?void 0:n.stt_binary_handler_id)??null;for(let g of this.pending)this.sendPcm(g);this.pending=[],this.audioDone&&this.handlerId!==null&&((o=(a=this.hass)==null?void 0:a.connection.socket)==null||o.send(gt(this.handlerId))),this.audioDone=!1}if((e.type==="stt-vad-end"||e.type==="stt-end")&&this.endAudio(),e.type==="stt-end"&&(this._heard=((l=t.stt_output)==null?void 0:l.text)??""),e.type==="intent-end"){let g=t.intent_output;this.conversationId=(g==null?void 0:g.conversation_id)??this.conversationId,this._reply=((d=(h=(c=g==null?void 0:g.response)==null?void 0:c.speech)==null?void 0:h.plain)==null?void 0:d.speech)??""}e.type==="tts-end"&&((u=t.tts_output)!=null&&u.url)&&this.play(t.tts_output.url),e.type==="error"&&this.fail(t);let s=Pi(this._phase,e);if(e.type==="run-end"){(f=this.unsub)==null||f.call(this),this.unsub=void 0,this.speaking||(this._phase=this._phase==="error"?"error":"idle");return}this._phase=s}onAudio(e){var a;if(this._phase!=="listening"||!this.resampler)return;let t=this.resampler.push(e),s=vs(t);this.handlerId===null?this.pending.push(s):this.sendPcm(s);let n=(a=this.endpointer)==null?void 0:a.push(t);n==="end"?this.endAudio():n==="none"&&this.noSpeech()}noSpeech(){this.fail({code:"stt-no-text-recognized",message:"No speech was detected"})}sendPcm(e){var t,s;this.handlerId!==null&&((s=(t=this.hass)==null?void 0:t.connection.socket)==null||s.send(gt(this.handlerId,e)))}endAudio(){var e,t;if(clearTimeout(this.stopTimer),!this.mic&&this._phase==="listening"){this._phase="idle",this.teardown();return}this.mic&&(this.handlerId!==null?(t=(e=this.hass)==null?void 0:e.connection.socket)==null||t.send(gt(this.handlerId)):this.audioDone=!0),this._phase==="listening"&&(this._phase="thinking"),this.stopMic()}stopMic(){var e;(e=this.mic)==null||e.close(),this.mic=void 0,this.handlerId=null}play(e){var h;let t=e.startsWith("http")?e:this.hass.hassUrl(e);(h=this.audio)==null||h.pause();let s=new Audio(t);this.audio=s;try{this.ctx??(this.ctx=new AudioContext);let d=this.ctx.createMediaElementSource(s);this.analyser??(this.analyser=this.ctx.createAnalyser()),this.analyser.fftSize=256,d.connect(this.analyser),this.analyser.connect(this.ctx.destination),this.ctx.resume()}catch{}this._phase="responding",this.speaking=!0;let n=!1,a=0,o=0;s.onplaying=()=>{n=!0,o=0};let l=window.setInterval(()=>{this.audio!==s||!this.speaking?c():s.currentTime!==a?(a=s.currentTime,o=0):++o>=(n?Cr:Sr)&&c(!0)},1e3),c=(d=!1)=>{if(clearInterval(l),!(this.audio!==s||!this.speaking)){if(this.speaking=!1,!d){this._phase="idle";return}this.stopAudio(),this.fail({code:"tts-failed",message:"The spoken reply stopped before it finished"})}};s.onended=()=>c(),s.onerror=()=>c(),s.play().catch(()=>c())}fail(e){let{text:t,detail:s}=Ri(e);console.warn("HomeView voice:",s),this._error=t,this._detail=s,this._phase="error",this.teardown()}reset(){var e;this._heard="",this._reply="",this._error="",this._detail="",this._showDetail=!1,this.pending=[],this.audioDone=!1,this.handlerId=null,this.speaking=!1,(e=this.audio)==null||e.pause()}async teardown(){var t;this.runId++,(t=this.abort)==null||t.abort(),this.abort=void 0,clearTimeout(this.stopTimer),this.stopMic();let e=this.unsub;this.unsub=void 0,await(e==null?void 0:e().catch(()=>{}))}draw(){var _,v;let e=(_=this.renderRoot)==null?void 0:_.querySelector("canvas.viz");if(!e)return!0;let t=Math.min(window.devicePixelRatio||1,2),s=e.clientWidth,n=e.clientHeight;if(!s||!n)return!1;(e.width!==Math.round(s*t)||e.height!==Math.round(n*t))&&(e.width=Math.round(s*t),e.height=Math.round(n*t));let a=e.getContext("2d");a.setTransform(t,0,0,t,0,0),a.clearRect(0,0,s,n);let o=this.phase(),l=(performance.now()-this.t0)/1e3,c=this.levels.length,h=o!=="idle"&&o!=="error",d=matchMedia("(prefers-reduced-motion: reduce)").matches,u=this.analyser?new Uint8Array(this.analyser.frequencyBinCount):null,f=!!u&&(o==="listening"||o==="responding")&&!((v=this._config)!=null&&v.satellite);f&&this.analyser.getByteFrequencyData(u);for(let y=0;y<c;y++){let S=0;if(f)S=(u[Math.min(u.length-1,2+Math.floor(Math.abs(y-c/2)/(c/2)*40))]/255)**1.4;else if(o==="listening"||o==="responding")S=.25+.2*Math.sin(l*5+y*.6)*Math.sin(l*1.7+y*.21);else if(o==="thinking"){let T=y/c*Math.PI*2;S=.12+.3*Math.max(0,Math.cos(T-l*3))**6}else S=.06;d&&(S=Math.min(S,.15)),Math.abs(S-this.levels[y])>.002&&(h=!0),this.levels[y]+=(S-this.levels[y])*.25}let g=s/2,k=n/2,M=Math.min(s,n)*.34,x=a.createRadialGradient(g,k,M*.1,g,k,M*1.25),P=o==="error"?"255 120 110":o==="listening"?"255 255 255":"255 236 210";x.addColorStop(0,`rgb(${P} / ${o==="idle"?.22:.42})`),x.addColorStop(1,`rgb(${P} / 0)`),a.fillStyle=x,a.beginPath(),a.arc(g,k,M*1.25,0,Math.PI*2),a.fill(),a.strokeStyle="rgb(255 255 255 / 0.95)",a.lineCap="round",a.lineWidth=Math.max(2,M*.06),a.shadowColor="rgb(40 30 20 / 0.25)",a.shadowBlur=4;for(let y=0;y<c;y++){let S=y/c*Math.PI*2-Math.PI/2,T=M*(.08+this.levels[y]*.9),R=M*.78;a.beginPath(),a.moveTo(g+Math.cos(S)*R,k+Math.sin(S)*R),a.lineTo(g+Math.cos(S)*(R+T),k+Math.sin(S)*(R+T)),a.stroke()}return h}renderContent(){var d;let e=this._config,t=this.phase(),s=!e.satellite&&this.micBlocked(),n=e.satellite?(d=this.hass)==null?void 0:d.states[e.satellite]:void 0,a=e.satellite?n?`${n.attributes.friendly_name??e.satellite}: ${t==="idle"?"Ready":Vt[t]}`:`Satellite not found: ${e.satellite}`:t==="error"?this._error||Vt.error:t==="idle"&&s?"Type a request":Vt[t],o=t==="error"&&!e.satellite,[l,c]=t==="listening"?["Stop listening",b.stop]:o?["Try again",b.retry]:["Talk to Assist",b.mic],h=o&&this._showDetail;return p`<div class="voice-wrap ${h?"covered":""}">
      <div class="head ink">
        <span class="title">${e.name??"Assist"}</span>
        ${o?p`<span class="sub status" aria-live="polite" role="button" tabindex="0" title=${this._detail} @click=${this.showDetail} @keydown=${u=>(u.key==="Enter"||u.key===" ")&&this.showDetail(u)}>${a}</span>`:p`<span class="sub status" aria-live="polite">${a}</span>`}
      </div>
      <button class="orb" ?disabled=${!!e.satellite} aria-label=${l} @click=${()=>void(o?this.retry():this.talk())}>
        <canvas class="viz" aria-hidden="true"></canvas>
        <span class="mic">${c}</span>
      </button>
      <div class="lines ink" aria-live="polite">
        ${this._heard?p`<div class="heard">&ldquo;${this._heard}&rdquo;</div>`:m}
        ${this._reply?p`<div class="reply">${this._reply}</div>`:m}
        ${o&&this._detail?p`<button class="more" @click=${this.showDetail}><span>Details</span></button>`:m}
        ${s==="insecure"&&!this._heard&&!this._reply&&!o?p`<div class="notice">The microphone needs Home Assistant over HTTPS. Type instead, or see the README for options.</div>`:m}
      </div>
      ${e.satellite?m:this._typing||s?p`<form class="type" @submit=${this.submit}>
              <input name="q" type="text" placeholder="Ask Assist" autocomplete="off" aria-label="Request" />
              <button class="send" aria-label="Send">${b.send}</button>
            </form>`:p`<button class="kbd" aria-label="Type a request" @click=${()=>this._typing=!0}>${b.keyboard}</button>`}
      ${h?p`<div class="sheet ink" role="dialog" aria-label="Error details">
            <div class="sheet-head">
              <span class="title">${this._error}</span>
              <button class="more" @click=${()=>this._showDetail=!1}><span>Done</span></button>
            </div>
            <div class="detail">${this._detail}</div>
          </div>`:m}
    </div>`}resume(){!this.raf&&this.isConnected&&this.loop()}updated(e){var t,s;(t=super.updated)==null||t.call(this,e),e.has("_typing")&&this._typing&&((s=this.renderRoot.querySelector("input[name=q]"))==null||s.focus()),!this.raf&&this.isConnected&&this.loop()}};ve.properties={...E.properties,_phase:{state:!0},_heard:{state:!0},_reply:{state:!0},_error:{state:!0},_detail:{state:!0},_showDetail:{state:!0},_typing:{state:!0}},ve.editorFields=[{name:"name",selector:{text:{}}},{name:"pipeline",label:"Assist pipeline",helper:"Defaults to the preferred pipeline",selector:{assist_pipeline:{}}},{name:"satellite",label:"Voice satellite (optional)",helper:"Show this assist_satellite's state instead of using this device's microphone",selector:{entity:{filter:{domain:"assist_satellite"}}}},{name:"speak",label:"Play spoken replies",selector:{boolean:{}}}],ve.styles=[z,$`
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
    `];customElements.define("homeview-voice-card",ve);L("homeview-voice-card","HomeView Voice","Talk to Home Assistant Assist with an audio-reactive liquid-glass visualizer.");var be=class extends E{constructor(){super(...arguments);this._now=new Date;this.subscribedTo="";this.tick=0;this.minute=()=>{this.tick=0,this.onScreen&&(this._now=new Date,this.tick=window.setTimeout(this.minute,6e4-Date.now()%6e4+50))};this.more=()=>H(this,"hass-more-info",{entityId:this._config.entity})}static getStubConfig(e){return{entity:Object.keys(e.states).find(t=>O(t)==="weather")??""}}validate(e){if(!e.entity||O(e.entity)!=="weather")throw new Error("Pick a weather entity");let t=e.forecast_days;if(t!==void 0&&(!Number.isInteger(t)||t<1||t>7))throw new Error("forecast_days is a whole number from 1 to 7")}getGridOptions(){return this.page?{columns:"full",rows:8,min_columns:6,min_rows:4}:{columns:6,rows:"auto",min_columns:4,min_rows:2}}get page(){var e;return!!((e=this._config)!=null&&e.forecast_days)}get bare(){return this.page}get square(){return!this.page&&super.square}refFrom(e,t){return this.page?Math.min(e/2,t):super.refFrom(e,t)}cardClass(){return this.page?"weather page":"weather"}connectedCallback(){super.connectedCallback(),this.resume()}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe(),clearTimeout(this.tick),this.tick=0}resume(){!this.onScreen||!this.hass||!this._config||(this.subscribe(),this.tick||this.minute())}updated(e){var t;(t=super.updated)==null||t.call(this,e),(e.has("hass")||e.has("_config"))&&this.resume()}subscribe(){let e=this._config.entity,t=this.hass.states[e],s=Li(t==null?void 0:t.attributes.supported_features),n=s?`${e}|${s}`:"";n!==this.subscribedTo&&(this.unsubscribe(),this.subscribedTo=n,s&&(this.unsub=this.hass.connection.subscribeMessage(a=>this._forecast=a.forecast??void 0,{type:"weather/subscribe_forecast",entity_id:e,forecast_type:s}),this.unsub.catch(()=>{this.subscribedTo===n&&(this.subscribedTo="")})))}unsubscribe(){let e=this.unsub;this.unsub=void 0,this.subscribedTo="",this._forecast=void 0,e==null||e.then(t=>t()).catch(()=>{})}renderContent(){var u,f;let e=this._config;if(!this.hass)return m;let t=this.hass.states[e.entity];if(!t)return p`<div class="center warning">Entity not found: ${e.entity}</div>`;let s=this.hass.language,n=this._now,a=e.show_time===!1?m:p`<div class="top ink">
            <span class="time">${n.toLocaleTimeString(s,{hour:"numeric",minute:"2-digit"})}</span>
            <span class="date">${n.toLocaleDateString(s,{weekday:"long",month:"short",day:"numeric"})}</span>
          </div>`;if(A(t))return p`<button class="hit" @click=${this.more}>${a}<div class="center warning">Weather unavailable</div></button>`;let o=Number(t.attributes.temperature),l=isFinite(o)?`${Math.round(o)}\xB0`:"\u2013",c=((f=(u=this.hass).formatEntityState)==null?void 0:f.call(u,t))??Ii(t.state),h=zi(this._forecast),d=g=>g===void 0?"\u2013":`${Math.round(g)}\xB0`;return this.page?this.renderPage(t,l,c,h,d):p`<button class="hit" aria-label="${c}, ${l}" @click=${this.more}>
      ${a}
      <div class="now ink">
        <span class="temp ${l.length>3?"long":""}">${l}</span>
        <span class="cond"><ha-icon .icon=${zt[t.state]??"mdi:weather-partly-cloudy"}></ha-icon><span>${c}</span></span>
      </div>
      <div class="outlook ink">
        <span>H: ${d(h.high)}</span><i></i><span class="dim">L: ${d(h.low)}</span><i></i><span class="rain">${b.drop}${this.wet(h,t.attributes.precipitation_unit)}</span>
      </div>
    </button>`}renderPage(e,t,s,n,a){let o=this.hass.language,l=new Date().toDateString(),c=Di(this._forecast,this._config.forecast_days),h=this.wet(n,e.attributes.precipitation_unit),d=[`${a(n.high)} / ${a(n.low)}`,h==="\u2013"?"":`${h} rain`].filter(Boolean).join(" \xB7 ");return p`<button class="hit" aria-label="${s}, ${t}" @click=${this.more}>
      <div class="hero ink">
        <div class="where">
          <div class="pcond">${s}</div>
          <div class="place">${e.attributes.friendly_name??""}</div>
        </div>
        <div class="big">
          <div class="ptemp">${t}</div>
          <div class="hl">${d}</div>
        </div>
      </div>
      <div class="days hv-frost ink" style="--n:${this._config.forecast_days}">
        ${c.length?c.map(u=>{let f=B(u.datetime),g=f.toDateString()===l?"Today":f.toLocaleDateString(o,{weekday:"short"});return p`<div class="day">
                <span class="dh">${a(u.high)}</span><span class="dl">${a(u.low)}</span>
                <ha-icon .icon=${zt[u.condition??""]??"mdi:weather-partly-cloudy"}></ha-icon>
                <span class="dn">${g}</span>
              </div>`}):p`<div class="none">No forecast</div>`}
      </div>
    </button>`}wet(e,t){return e.rain!==void 0?`${Math.round(e.rain)}%`:e.amount!==void 0?`${Math.round(e.amount*10)/10}${t?` ${t}`:""}`:"\u2013"}};be.properties={...E.properties,_forecast:{state:!0},_now:{state:!0}},be.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"weather"}}}},{name:"show_time",label:"Show the time and date",selector:{boolean:{}}},{name:"forecast_days",label:"Forecast days",helper:"1-7 days in a row: turns the card into a full weather page",selector:{number:{min:1,max:7,mode:"box"}}}],be.styles=[z,$`
      .hit {
        appearance: none;
        border: 0;
        background: none;
        margin: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: calc(var(--hv-ref) * 0.07) calc(var(--hv-ref) * 0.075) calc(var(--hv-ref) * 0.06);
        display: flex;
        flex-direction: column;
        cursor: pointer;
        text-align: left;
        border-radius: inherit;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }
      .top {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
        white-space: nowrap;
      }
      .time {
        font-size: calc(var(--hv-ref) * 0.075);
        font-weight: 600;
      }
      .date {
        font-size: calc(var(--hv-ref) * 0.055);
        color: var(--hv-ink-2);
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .now {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: calc(var(--hv-ref) * 0.025);
      }
      .temp {
        font-size: calc(var(--hv-ref) * 0.42);
        font-weight: 500;
        line-height: 0.85;
        letter-spacing: -0.04em;
        /* the degree sign hangs right: nudge the number back to the optical centre */
        padding-left: 0.12em;
        font-family: ui-rounded, "SF Pro Rounded", var(--hv-font);
      }
      .temp.long {
        font-size: calc(var(--hv-ref) * 0.32);
      }
      .cond {
        display: flex;
        align-items: center;
        gap: calc(var(--hv-ref) * 0.03);
        font-size: calc(var(--hv-ref) * 0.08);
        font-weight: 600;
        --mdc-icon-size: calc(var(--hv-ref) * 0.11);
      }
      .outlook {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: calc(var(--hv-ref) * 0.05);
        border-top: 0.5px solid rgb(255 255 255 / 0.35);
        padding-top: calc(var(--hv-ref) * 0.045);
        font-size: calc(var(--hv-ref) * 0.075);
        font-weight: 500;
        white-space: nowrap;
      }
      .outlook i {
        width: 0;
        height: 1em;
        border-left: 0.5px solid rgb(255 255 255 / 0.35);
      }
      .dim {
        color: var(--hv-ink-2);
      }
      .rain {
        display: flex;
        align-items: center;
        gap: 0.15em;
      }
      .rain svg {
        width: 0.95em;
        height: 0.95em;
      }
      .center {
        flex: 1;
        display: grid;
        place-items: center;
      }
      /* a short wide cell (3 rows): no clock line, temperature and outlook side by side */
      ha-card[data-short][data-wide] .hit {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: 1fr auto;
        column-gap: calc(var(--hv-ref) * 0.12);
        align-items: center;
      }
      ha-card[data-short][data-wide] .top {
        display: none;
      }
      ha-card[data-short][data-wide] .now {
        grid-row: 1 / 3;
        flex-direction: column;
      }
      ha-card[data-short][data-wide] .outlook {
        grid-column: 2;
        grid-row: 1 / 3;
        flex-direction: column;
        align-items: flex-start;
        border: 0;
        border-left: 0.5px solid rgb(255 255 255 / 0.35);
        padding: 0 0 0 calc(var(--hv-ref) * 0.12);
        gap: calc(var(--hv-ref) * 0.04);
      }
      ha-card[data-short][data-wide] .outlook i {
        display: none;
      }
      /* the forecast page (reference: 4.5% edge, condition top left, temperature top right, a row of days) */
      ha-card.page .hit {
        display: flex;
        flex-direction: column;
        padding: calc(var(--hv-ref) * 0.045);
        gap: calc(var(--hv-ref) * 0.045);
      }
      .hero {
        flex: 1;
        min-height: 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: calc(var(--hv-ref) * 0.04);
        padding: 0 calc(var(--hv-ref) * 0.04);
      }
      .where {
        min-width: 0;
        padding-top: calc(var(--hv-ref) * 0.025);
      }
      .pcond {
        font-size: calc(var(--hv-ref) * 0.133);
        font-weight: 600;
        letter-spacing: -0.02em;
        line-height: 1.05;
      }
      .place,
      .hl {
        margin-top: calc(var(--hv-ref) * 0.012);
        font-size: calc(var(--hv-ref) * 0.046);
        color: rgb(255 255 255 / 0.88);
        white-space: nowrap;
      }
      .big {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: none;
        margin-right: calc(var(--hv-ref) * 0.03);
      }
      .ptemp {
        font-size: calc(var(--hv-ref) * 0.275);
        font-weight: 300;
        letter-spacing: -0.04em;
        line-height: 1;
        padding-left: 0.12em;
      }
      .days {
        flex: none;
        height: calc(var(--hv-ref) * 0.41);
        display: grid;
        grid-template-columns: repeat(var(--n), 1fr);
        align-items: center;
      }
      .day {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: calc(var(--hv-ref) * 0.01);
        line-height: 1.15;
      }
      .dh {
        font-size: calc(var(--hv-ref) * 0.07);
        font-weight: 600;
      }
      .dl,
      .dn {
        font-size: calc(var(--hv-ref) * 0.044);
        color: rgb(255 255 255 / 0.88);
      }
      .day ha-icon {
        --mdc-icon-size: calc(var(--hv-ref) * 0.085);
        margin: calc(var(--hv-ref) * 0.008) 0;
        filter: drop-shadow(var(--hv-shadow-text));
      }
      .none {
        grid-column: 1 / -1;
        text-align: center;
        font-size: calc(var(--hv-ref) * 0.05);
        color: var(--hv-ink-2);
      }
    `];customElements.define("homeview-weather-card",be);L("homeview-weather-card","HomeView Weather","Time, temperature, condition and today's high, low and rain chance on liquid glass, or a full page with the next days.");var Er=["strip","day","list"],ws=["#ff9f0a","#30d158","#0a84ff","#bf5af2","#ff375f","#64d2ff"],xs=900*1e3,Mr=30*1e3,Tr=190,vt={pad:.07,head:.13,gap:.03,row:.22},_s={edge:.045,row:.227},Wt=r=>(r.entities??[]).map(i=>typeof i=="string"?{entity:i}:i).map((i,e)=>({entity:i.entity,color:i.color??ws[e%ws.length]})),ye=class extends E{constructor(){super(...arguments);this._error="";this._width=0;this._height=0;this._now=new Date;this.fetchedAt=0;this.fetchedFor="";this.calendarStates="";this.run=0;this.tick=0;this.minute=()=>{this.tick=0,this.onScreen&&(this._now=new Date,this.refresh(),this.tick=window.setTimeout(this.minute,6e4-Date.now()%6e4+50))}}static getStubConfig(e){return{entities:Object.keys(e.states).filter(t=>O(t)==="calendar").slice(0,2),grid_options:{columns:"full",rows:2}}}validate(e){if(!Array.isArray(e.entities)||!e.entities.length)throw new Error("Add one or more calendar entities");for(let t of Wt(e))if(!t.entity||O(t.entity)!=="calendar")throw new Error(`Not a calendar: ${t.entity}`);if(e.layout&&!Er.includes(e.layout))throw new Error(`Unknown layout: ${e.layout} (strip, day or list)`)}get kind(){var e;return((e=this._config)==null?void 0:e.layout)??"strip"}getGridOptions(){return this.kind==="day"?{columns:12,rows:4,min_columns:6,min_rows:3}:this.kind==="list"?{columns:"full",rows:8,min_columns:6,min_rows:4}:{columns:"full",rows:2,min_columns:6,min_rows:1}}get square(){return!1}get bare(){return this.kind==="list"}refFrom(e,t){return this._width=e,this._height=t,this.kind==="day"?Math.min(t,e*.5):this.kind==="list"?Math.min(e/2,t):Math.min(e,t*2)}room(){let e=this._width,t=this._height;if(!e||!t)return 1;if(this.kind==="strip")return Math.max(1,Math.floor(e*.82/Tr));let s=this.refFrom(e,t);return this.kind==="day"?Math.max(1,Math.floor((t-s*(2*vt.pad+vt.head+vt.gap)+1)/(s*vt.row))):Math.max(1,Math.floor((t-s*2*_s.edge+1)/(s*_s.row)))}cardClass(){return`calendar ${this.kind}`}connectedCallback(){super.connectedCallback(),this.resume()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.tick),this.tick=0,this.run++,this.fetchedFor=""}resume(){!this.onScreen||!this.hass||!this._config||(this.refresh(),this.tick||this.minute())}updated(e){var t;(t=super.updated)==null||t.call(this,e),(e.has("hass")||e.has("_config"))&&this.resume()}refresh(){let e=this._config,t=Wt(e).map(o=>o.entity),s=JSON.stringify([t,e.days??7]),n=t.map(o=>{var l,c;return`${(l=this.hass.states[o])==null?void 0:l.state}|${((c=this.hass.states[o])==null?void 0:c.attributes.message)??""}`}).join(",");(s!==this.fetchedFor||n!==this.calendarStates||Date.now()-this.fetchedAt>xs)&&(this.fetchedFor=s,this.calendarStates=n,this.fetchedAt=Date.now(),this.fetch(t,e.days??7,++this.run))}async fetch(e,t,s){try{let n=await G(this.hass.callWS({type:"call_service",domain:"calendar",service:"get_events",target:{entity_id:e},service_data:{duration:{days:t}},return_response:!0}),Mr);if(s!==this.run)return;this._events=e.flatMap(a=>{var o,l;return(((l=(o=n.response)==null?void 0:o[a])==null?void 0:l.events)??[]).map(c=>({...c,calendar:a}))}),this._error=""}catch(n){if(s!==this.run)return;this._error=(n==null?void 0:n.message)??String(n),this.fetchedAt=Date.now()-xs+6e4,console.warn("HomeView calendar:",n)}}renderContent(){let e=this._config;if(!this.hass)return m;let t=Object.fromEntries(Wt(e).map(u=>[u.entity,u.color])),s=u=>t[u.calendar??""]??"#fff",n=this.hass.language,a=Math.min(e.count??(this.kind==="strip"?3:1/0),this.room()),o=u=>p`<div class="note ink">${u}</div>`,l=this._events?void 0:o(this._error?"Calendar unavailable":"Loading\u2026");if(this.kind==="day")return this.renderDay(a,s,l);if(this.kind==="list")return this.renderList(a,s,l);let c=p`<div class="head ink">${b.calendar}<span>${e.title??"Up next"}</span></div>`,h=this._events?tt(this._events,this._now,a):[],d;return l?d=l:h.length?d=p`${h.map(u=>{let f=it(u,this._now,n);return p`<div class="event ${f.today?"today":""}">
          <div class="badge"><span class="wd">${f.label}</span><span class="day">${f.day}</span></div>
          <div class="text ink">
            <div class="summary">${he(u)}</div>
            <div class="when"><i style="background:${s(u)}"></i>${Pe(u,n)}</div>
          </div>
        </div>`})}`:d=o("Nothing coming up"),p`<div class="strip" title=${this._error||m}>${c}${d}</div>`}renderDay(e,t,s){let n=this._config,a=this.hass.language,o=this._events?Hi(this._events,this._now,e):{today:0,events:[]},l=o.events,c=o.today-Math.min(o.today,l.length),h=s?"":o.today?c>0?`+${c} more today`:"":l.length?"Nothing else today":"",d=f=>{let g=Dt(f,this._now);return g===0?Pe(f,a):`${g===1?Z(It(f,this._now,a)):it(f,this._now,a).weekday} \xB7 ${Pe(f,a)}`},u;return s?u=s:l.length?u=p`${l.map(f=>p`<div class="row ${B(f.start)<=this._now?"now":""}">
          <i class="bar" style="background:${t(f)}"></i>
          <div class="text ink">
            <div class="summary">${he(f)}</div>
            <div class="when">${d(f)}</div>
          </div>
        </div>`)}`:u=p`<div class="note ink">Nothing coming up</div>`,p`<div class="dayview" title=${this._error||m}>
      <div class="dhead ink">
        ${b.calendar}<span class="dtitle">${n.title??(o.today||s?"Today":"Up next")}</span>
        <span class="aside">${h}</span>
      </div>
      <div class="rows">${u}</div>
    </div>`}renderList(e,t,s){let n=this.hass.language,a=this._events?tt(this._events,this._now,e):[],o="",l=a.map(c=>{let h=it(c,this._now,n),d=h.key!==o;return o=h.key,p`<div class="lrow">
        <div class="lbadge ${d&&h.today?"hv-frost today":""}">
          ${d?p`<small>${h.weekday}</small><b>${h.day}</b><small class="mon">${h.month}</small>`:m}
        </div>
        <i class="rule"></i>
        <div class="text">
          <div class="ltitle">${he(c)}</div>
          <div class="lwhen"><i style="background:${t(c)}"></i>${Pe(c,n)}</div>
        </div>
        <div class="rel">${d?It(c,this._now,n):""}</div>
      </div>`});return p`<div class="agenda ink" title=${this._error||m}>
      ${s??(l.length?l:p`<div class="note">Nothing coming up</div>`)}
    </div>`}};ye.properties={...E.properties,_events:{state:!0},_error:{state:!0},_width:{state:!0},_height:{state:!0},_now:{state:!0}},ye.editorFields=[{name:"entities",label:"Calendars",required:!0,selector:{entity:{multiple:!0,filter:{domain:"calendar"}}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"strip",label:"Strip: the next events in a row"},{value:"day",label:"Day: today, else what's next"},{value:"list",label:"List: a full-page agenda"}]}}},{name:"title",helper:"Strip and day: defaults to Up next, or Today",selector:{text:{}}},{name:"days",label:"Days ahead",selector:{number:{min:1,max:60,mode:"box"}}},{name:"count",label:"Most events shown",selector:{number:{min:1,max:6,mode:"box"}}}],ye.styles=[z,$`
      .strip {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: calc(var(--hv-ref) * 0.05);
        padding: calc(var(--hv-ref) * 0.04) calc(var(--hv-ref) * 0.06);
      }
      .head {
        flex: none;
        width: calc(var(--hv-ref) * 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: calc(var(--hv-ref) * 0.01);
        font-size: calc(var(--hv-ref) * 0.058);
        font-weight: 600;
        white-space: nowrap;
      }
      .head svg {
        width: calc(var(--hv-ref) * 0.125);
        height: calc(var(--hv-ref) * 0.125);
        filter: drop-shadow(var(--hv-shadow-text));
      }
      .event {
        flex: 1 1 0;
        min-width: 0;
        align-self: stretch;
        display: flex;
        align-items: center;
        gap: calc(var(--hv-ref) * 0.05);
        padding: 0 calc(var(--hv-ref) * 0.04) 0 calc(var(--hv-ref) * 0.06);
        border-left: 0.5px solid rgb(255 255 255 / 0.3);
      }
      .event.today {
        background: rgb(255 255 255 / 0.1);
        border-radius: calc(var(--hv-ref) * 0.05);
        border-left-color: transparent;
      }
      .badge {
        flex: none;
        width: calc(var(--hv-ref) * 0.225);
        height: calc(var(--hv-ref) * 0.235);
        box-sizing: border-box;
        border-radius: calc(var(--hv-ref) * 0.05);
        background: rgb(255 255 255 / 0.14);
        box-shadow:
          inset 0 0 0 0.5px rgb(255 255 255 / 0.4),
          inset 1px 1px 0 rgb(255 255 255 / 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .today .badge {
        background: rgb(255 255 255 / 0.3);
      }
      .wd {
        font-size: calc(var(--hv-ref) * 0.05);
        font-weight: 600;
        letter-spacing: 0.04em;
        line-height: 1.2;
        color: var(--hv-ink-2);
      }
      .today .wd {
        color: var(--hv-ink);
      }
      .day {
        font-size: calc(var(--hv-ref) * 0.1);
        font-weight: 600;
        line-height: 1;
        font-family: ui-rounded, "SF Pro Rounded", var(--hv-font);
      }
      .text {
        min-width: 0;
      }
      .summary {
        font-size: calc(var(--hv-ref) * 0.075);
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .when {
        margin-top: 2px;
        font-size: calc(var(--hv-ref) * 0.062);
        color: var(--hv-ink-2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .when i {
        display: inline-block;
        width: 0.6em;
        height: 0.6em;
        border-radius: 50%;
        margin-right: 0.4em;
        vertical-align: 0.05em;
      }
      .note {
        flex: 1;
        padding-left: calc(var(--hv-ref) * 0.06);
        font-size: calc(var(--hv-ref) * 0.07);
        color: var(--hv-ink-2);
      }

      /* day: a quadrant panel (pad 0.07, head 0.13, gap 0.03, rows 0.22 of --hv-ref; see DAY) */
      .dayview {
        height: 100%;
        box-sizing: border-box;
        padding: calc(var(--hv-ref) * 0.07) calc(var(--hv-ref) * 0.08);
        display: flex;
        flex-direction: column;
        gap: calc(var(--hv-ref) * 0.03);
      }
      .dhead {
        flex: none;
        height: calc(var(--hv-ref) * 0.13);
        display: flex;
        align-items: center;
        gap: calc(var(--hv-ref) * 0.035);
        font-size: calc(var(--hv-ref) * 0.075);
        font-weight: 600;
        white-space: nowrap;
      }
      .dhead svg {
        flex: none;
        width: calc(var(--hv-ref) * 0.1);
        height: calc(var(--hv-ref) * 0.1);
        filter: drop-shadow(var(--hv-shadow-text));
      }
      .dtitle {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .aside {
        margin-left: auto;
        font-size: calc(var(--hv-ref) * 0.066);
        font-weight: 400;
        color: var(--hv-ink-2);
      }
      .rows {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .rows .note {
        flex: 1;
        display: grid;
        place-items: center;
        padding: 0 0 calc(var(--hv-ref) * 0.08);
        font-size: calc(var(--hv-ref) * 0.08);
      }
      .row {
        flex: none;
        height: calc(var(--hv-ref) * 0.22);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: calc(var(--hv-ref) * 0.05);
        padding: 0 calc(var(--hv-ref) * 0.03);
        border-radius: calc(var(--hv-ref) * 0.05);
      }
      .row.now {
        background: rgb(255 255 255 / 0.12);
      }
      .bar {
        flex: none;
        width: calc(var(--hv-ref) * 0.02);
        min-width: 3px;
        height: 70%;
        border-radius: 2px;
        box-shadow: 0 0 0 0.5px rgb(255 255 255 / 0.4);
      }
      .row .summary {
        font-size: calc(var(--hv-ref) * 0.088);
        line-height: 1.2;
      }
      .row .when {
        margin-top: 0;
        font-size: calc(var(--hv-ref) * 0.066);
        line-height: 1.25;
      }

      /* list: a full-page agenda on the wallpaper (edge 0.045, rows 0.227 of --hv-ref; see LIST) */
      .agenda {
        height: 100%;
        box-sizing: border-box;
        padding: calc(var(--hv-ref) * 0.045) calc(var(--hv-ref) * 0.083);
        /* a deeper shadow: the text sits on the light parts of the wallpaper too */
        --hv-shadow-text: 0 1px 3px rgb(40 30 20 / 0.45), 0 0 16px rgb(40 30 20 / 0.28);
      }
      .agenda .note {
        padding: calc(var(--hv-ref) * 0.04) 0;
        font-size: calc(var(--hv-ref) * 0.054);
      }
      .lrow {
        height: calc(var(--hv-ref) * 0.227);
        display: grid;
        grid-template-columns: calc(var(--hv-ref) * 0.158) auto minmax(0, 1fr) auto;
        column-gap: calc(var(--hv-ref) * 0.0375);
        align-items: center;
      }
      .lbadge {
        height: calc(var(--hv-ref) * 0.19);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 1.05;
        --hv-radius: calc(var(--hv-ref) * 0.045);
      }
      .lbadge small {
        font-size: calc(var(--hv-ref) * 0.031);
        color: rgb(255 255 255 / 0.9);
      }
      .lbadge small.mon {
        font-size: calc(var(--hv-ref) * 0.027);
        letter-spacing: 0.06em;
      }
      .lbadge b {
        font-size: calc(var(--hv-ref) * 0.079);
        font-weight: 600;
        font-family: ui-rounded, "SF Pro Rounded", var(--hv-font);
      }
      .rule {
        width: 3px;
        height: calc(var(--hv-ref) * 0.167);
        border-radius: 2px;
        background: rgb(255 255 255 / 0.7);
        box-shadow: 0 0 4px rgb(40 30 20 / 0.2);
      }
      .ltitle {
        font-size: calc(var(--hv-ref) * 0.054);
        font-weight: 600;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .lwhen {
        margin-top: calc(var(--hv-ref) * 0.008);
        font-size: calc(var(--hv-ref) * 0.035);
        color: rgb(255 255 255 / 0.9);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .lwhen i {
        display: inline-block;
        width: 0.55em;
        height: 0.55em;
        border-radius: 50%;
        margin-right: 0.5em;
        vertical-align: 0.05em;
        box-shadow: 0 0 0 0.5px rgb(255 255 255 / 0.5);
      }
      .rel {
        font-size: calc(var(--hv-ref) * 0.035);
        font-weight: 500;
        white-space: nowrap;
      }
    `];customElements.define("homeview-calendar-card",ye);L("homeview-calendar-card","HomeView Up Next","The next events from your calendars: a liquid-glass strip, a day panel, or a full-page agenda.");var ks=r=>(...i)=>({_$litDirective$:r,values:i}),bt=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,e,t){this._$Ct=i,this._$AM=e,this._$Ci=t}_$AS(i,e){return this.update(i,e)}update(i,e){return this.render(...e)}};var{I:to}=bi;var Ar={},$s=(r,i=Ar)=>r._$AH=i;var Ss=ks(class extends bt{constructor(){super(...arguments),this.key=m}render(r,i){return this.key=r,i}update(r,[i,e]){return i!==this.key&&($s(r),this.key=i),e}});var Cs=["touchend","touchcancel","mouseup"],Pr=16,yt={x:88,y:76},Kt=16;async function Yt(r){if(customElements.get("ha-camera-stream"))return!0;try{let i=window.loadCardHelpers;return i?((await i()).createCardElement({type:"picture-entity",entity:r,camera_view:"live"}),await G(customElements.whenDefined("ha-camera-stream"),5e3),!0):!1}catch{return!1}}var Ne=class extends D{constructor(){super(...arguments);this._cur=0;this._drag=0;this._slide=0;this._still=!1;this._picker=!1;this._muted=!0;this._seen=!1;this._box={w:0,h:0};this.stamp=Date.now();this.slideTimer=0;this.asked=!1;this.inView=!1;this.ours=!1;this.onVisible=()=>this.setSeen();this.claim=e=>{this.ours&&(this.ours=!1,e.stopPropagation())};this.togglePicker=()=>{this._picker=!this._picker,this._picker&&(this.stamp=Date.now())};this.goHome=()=>{var t;let e=((t=this.config)==null?void 0:t.home_path)||`/${location.pathname.split("/")[1]??""}`;history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))};this.onKey=e=>{if(e.key==="Escape"&&this._picker)this._picker=!1;else if(e.key==="ArrowRight"&&!this._picker)this.step(1);else if(e.key==="ArrowLeft"&&!this._picker)this.step(-1);else return;e.preventDefault(),e.stopPropagation()}}get cams(){var e;return rt((e=this.config)==null?void 0:e.entities)}get crop(){var e;return st((e=this.config)==null?void 0:e.crop_top)}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisible);for(let e of Cs)window.addEventListener(e,this.claim,!0);this.hasUpdated&&this.watch()}disconnectedCallback(){var e,t,s;super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onVisible);for(let n of Cs)window.removeEventListener(n,this.claim,!0);(e=this.untrack)==null||e.call(this),this.untrack=void 0,(t=this.watchers)==null||t.io.disconnect(),(s=this.watchers)==null||s.ro.disconnect(),this.watchers=void 0,this.finishSlide(),this._muted=!0,this._picker=!1,this.inView=!1,this._seen=!1}willUpdate(e){e.has("config")&&(this._cur=this.at(this._cur)),!this.asked&&this.cams.length&&this.hass&&(this.asked=!0,Yt(this.cams[0].entity).then(t=>this._player=t))}firstUpdated(){this.watch()}watch(){let e=this.renderRoot.querySelector(".stage");if(!e||this.watchers)return;let t=new IntersectionObserver(([n])=>{this.inView=n.isIntersecting,this.setSeen()}),s=new ResizeObserver(([n])=>this._box={w:n.contentRect.width,h:n.contentRect.height});t.observe(this),s.observe(e),this.watchers={io:t,ro:s},this.untrack=ue(e,{move:n=>this.dragTo(n),end:n=>this.dragEnd(n)},!1)}setSeen(){let e=this.inView&&document.visibilityState!=="hidden";e!==this._seen&&(this._seen=e,e?this.stamp=Date.now():this._muted=!0)}dragTo(e){if(this._picker){this.ours=!0;return}this.finishSlide();let t=nt(this._cur,e<0?1:-1,this.cams.length)!==null;this.ours=t,this._still=!0,this._drag=t?e:e/3}dragEnd(e){if(!this._picker){if(e==="left"||e==="right")return this.step(e==="left"?1:-1);this._still=!1,this._drag=0}}step(e){if(this._slide){this.finishSlide(),this.moveAgain().then(()=>this.step(e));return}if(nt(this._cur,e,this.cams.length)===null){this._still=!1,this._drag=0;return}clearTimeout(this.slideTimer),this._still=!1,this._drag=0,this._slide=e,this.slideTimer=window.setTimeout(()=>this.finishSlide(),j)}finishSlide(){this._slide&&(clearTimeout(this.slideTimer),this.show(this._cur+this._slide),this.moveAgain())}async moveAgain(){var e;await this.updateComplete,(e=this.renderRoot.querySelector(".cam"))==null||e.getBoundingClientRect(),this._still=!1}show(e){this._cur=this.at(e),this._slide=0,this._drag=0,this._still=!0,this._muted=!0}at(e){return Math.max(0,Math.min(e,this.cams.length-1))}pick(e){this.show(e),this._picker=!1,this.moveAgain().then(()=>{var t;return(t=this.renderRoot.querySelector(".grid-btn"))==null?void 0:t.focus({preventScroll:!0})})}nameOf(e){return e.name??(this.hass?N(this.hass,e.entity):e.entity)}snapshot(e){var n;let t=(n=this.hass)==null?void 0:n.states[e.entity],s=t&&!A(t)?t.attributes.entity_picture:void 0;return s&&this.hass?this.hass.hassUrl(`${s}${s.includes("?")?"&":"?"}hv=${this.stamp}`):""}stream(e){var a;let t=(a=this.hass)==null?void 0:a.states[e.entity];if(!t||A(t)||!this.hass||!this._seen||this._player===void 0||!this._box.h)return m;let s=this._box.w/(this._box.h*(1+this.crop/100)),n=customElements.get("ha-camera-stream")&&this._player;return Ss(`${e.entity}:${this._muted}`,n?p`<ha-camera-stream .hass=${this.hass} .stateObj=${t} .muted=${this._muted} .controls=${!1} .fitMode=${"cover"} .aspectRatio=${s}></ha-camera-stream>`:p`<img class="live" src=${this.hass.hassUrl(`/api/camera_proxy_stream/${e.entity}?token=${t.attributes.access_token}`)} alt="" draggable="false" />`)}camAt(e){var c;let t=this.cams;if(e&&nt(this._cur,e,t.length)===null)return m;let s=t[this._cur+e],n=(c=this.hass)==null?void 0:c.states[s.entity],a=this.snapshot(s),o=n?A(n)?"Offline":"":"Camera not found",l=`calc(${e-this._slide} * (100% + ${Pr}px) + ${this._drag}px)`;return p`<div class="cam" style="transform:translateX(${l})" aria-hidden=${e?"true":"false"}>
      <div class="frame" style="top:${-this.crop}%;height:${100+this.crop}%">
        ${a?p`<img class="snap" src=${a} alt="" draggable="false" />`:m} ${e?m:this.stream(s)}
      </div>
      ${o?p`<div class="empty">${b.camera}<span>${o}</span></div>`:m}
    </div>`}picker(){let e=this.cams,t=Ni(e.length),s=Math.ceil(e.length/t),n=(this._box.h-2*yt.y-(s-1)*Kt)/s,a=Math.max(44,Math.min(n*16/9,(this._box.w-2*yt.x-(t-1)*Kt)/t));return p`<div class="picker" role="dialog" aria-label="Cameras" @click=${o=>o.target===o.currentTarget&&(this._picker=!1)}>
      <div class="tiles" style="grid-template-columns:repeat(${t}, ${a}px)">
        ${e.map((o,l)=>{let c=this.snapshot(o),h=this.nameOf(o);return p`<button class="tile ${l===this._cur?"cur":""}" aria-label=${h} aria-current=${l===this._cur?"true":"false"} @click=${()=>this.pick(l)}>
            ${c?p`<img src=${c} alt="" draggable="false" style="top:${-this.crop}%;height:${100+this.crop}%" />`:p`<span class="tile-icon">${b.camera}</span>`}
            <span class="tile-name">${h}</span>
          </button>`})}
      </div>
    </div>`}render(){let e=this.cams;if(!e.length||!this.hass)return p``;let t=e[this.at(this._cur)],s=this.hass.states[t.entity],n=!!s&&!A(s),a=this.nameOf(t),o=e.length>1;return p`<div
      class="stage ${this._still?"still":""}"
      role="region"
      aria-roledescription="carousel"
      aria-label="Cameras: ${a}, ${this._cur+1} of ${e.length}"
      tabindex="0"
      @keydown=${this.onKey}
    >
      ${this.camAt(-1)}${this.camAt(0)}${this.camAt(1)}
      <div class="shade top"></div>
      <div class="shade bottom"></div>
      <div class="glass pill" aria-live="polite"><span class="rec ${n?"on":""}"></span><span class="pill-name">${a}</span></div>
      <button class="glass round home" aria-label="Home" @click=${this.goHome}>${b.home}</button>
      ${o?p`<div class="glass dots" aria-hidden="true">${e.map((l,c)=>p`<i class=${c===this._cur?"cur":""}></i>`)}</div>
            <button class="glass round grid-btn" aria-label=${this._picker?"Close cameras":"All cameras"} aria-expanded=${this._picker?"true":"false"} @click=${this.togglePicker}>
              ${this._picker?b.close:b.grid}
            </button>`:m}
      <button class="glass round mute" aria-label=${this._muted?"Unmute":"Mute"} @click=${()=>this._muted=!this._muted}>
        ${this._muted?b.muted:b.sound}
      </button>
      ${this._picker?this.picker():m}
    </div>`}};Ne.properties={hass:{attribute:!1},config:{attribute:!1},_cur:{state:!0},_drag:{state:!0},_slide:{state:!0},_still:{state:!0},_picker:{state:!0},_muted:{state:!0},_seen:{state:!0},_player:{state:!0},_box:{state:!0}},Ne.styles=$`
    :host([wide]) {
      height: auto;
      aspect-ratio: 2;
    }
    :host {
      display: block;
      height: 100%;
      font-family: -apple-system, "SF Pro Display", "Inter", system-ui, "Segoe UI", Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #fff;
    }
    .stage {
      position: relative;
      height: 100%;
      overflow: hidden;
      background: #000;
      outline: none;
      /* no drag scrolls: horizontal ones change the camera, or past the first or last one the view (Swipe Navigation) */
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    .cam {
      position: absolute;
      inset: 0;
      overflow: hidden;
      transition: transform ${j}ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .still .cam {
      transition: none;
    }
    .frame {
      position: absolute;
      left: 0;
      width: 100%;
    }
    .frame > * {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      -webkit-user-drag: none;
      pointer-events: none;
    }
    ha-camera-stream {
      --video-max-height: none;
    }
    .empty {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      font-size: 20px;
      color: rgb(255 255 255 / 0.85);
      background: linear-gradient(180deg, rgb(88 96 104 / 0.55), rgb(40 42 44 / 0.7));
    }
    .empty svg {
      width: 64px;
      height: 64px;
    }
    /* soft shading under the controls, so white glyphs read on a bright picture */
    .shade {
      position: absolute;
      left: 0;
      right: 0;
      height: 110px;
      pointer-events: none;
    }
    .shade.top {
      top: 0;
      background: linear-gradient(rgb(0 0 0 / 0.32), transparent);
    }
    .shade.bottom {
      bottom: 0;
      background: linear-gradient(transparent, rgb(0 0 0 / 0.32));
    }
    /* HomeView frost glass (base.ts), for the controls over the picture */
    .glass {
      position: absolute;
      box-sizing: border-box;
      isolation: isolate;
      border: 0;
      color: #fff;
      background: rgb(84 74 64 / 0.13);
      backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
      -webkit-backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
      box-shadow:
        0 0 0 0.75px rgb(60 46 32 / 0.2),
        0 6px 18px rgb(60 45 30 / 0.14);
      text-shadow: 0 1px 3px rgb(40 30 20 / 0.32), 0 0 14px rgb(40 30 20 / 0.14);
    }
    .glass::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      box-shadow:
        inset 0 0 0 1px rgb(255 255 255 / 0.16),
        inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.8),
        inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.4),
        inset 0 0 7px rgb(50 38 26 / 0.1);
    }
    .pill {
      left: 20px;
      top: 18px;
      height: 44px;
      max-width: calc(100% - 120px);
      padding: 0 18px 0 14px;
      border-radius: 22px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 17px;
      font-weight: 600;
      white-space: nowrap;
      pointer-events: none;
    }
    .pill-name {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .rec {
      flex: none;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: rgb(255 255 255 / 0.5);
    }
    .rec.on {
      background: #ff453a;
      box-shadow: 0 0 8px #ff453a;
    }
    .round {
      width: 52px;
      height: 52px;
      padding: 14px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 3;
      transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .round:active {
      transform: scale(0.9);
      transition-duration: 0.12s;
    }
    .round svg {
      width: 100%;
      height: 100%;
      display: block;
      filter: drop-shadow(0 1px 2px rgb(40 30 20 / 0.35));
    }
    .home {
      right: 20px;
      top: 14px;
    }
    .grid-btn {
      left: 20px;
      bottom: 14px;
    }
    .mute {
      right: 20px;
      bottom: 14px;
    }
    .dots {
      left: 50%;
      bottom: 22px;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      padding: 10px 14px;
      border-radius: 14px;
      pointer-events: none;
    }
    .dots i {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background: rgb(255 255 255 / 0.5);
      transition:
        width 0.3s ease,
        background-color 0.3s ease;
    }
    .dots i.cur {
      width: 22px;
      background: #fff;
    }
    .picker {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: grid;
      place-items: center;
      padding: ${yt.y}px ${yt.x}px;
      background: rgb(0 0 0 / 0.42);
      backdrop-filter: blur(22px) saturate(1.5);
      -webkit-backdrop-filter: blur(22px) saturate(1.5);
      animation: fade 0.25s ease both;
    }
    @keyframes fade {
      from {
        opacity: 0;
      }
    }
    .tiles {
      display: grid;
      gap: ${Kt}px;
    }
    .tile {
      position: relative;
      aspect-ratio: 16 / 9;
      min-height: 44px;
      overflow: hidden;
      padding: 0;
      border: 0;
      border-radius: 18px;
      background: linear-gradient(180deg, rgb(88 96 104 / 0.55), rgb(40 42 44 / 0.7));
      color: #fff;
      font: inherit;
      cursor: pointer;
      box-shadow:
        inset 0 0 0 0.5px rgb(255 255 255 / 0.35),
        0 6px 18px rgb(0 0 0 / 0.25);
      transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .tile:active {
      transform: scale(0.96);
      transition-duration: 0.12s;
    }
    .tile.cur {
      box-shadow:
        0 0 0 3px #fff,
        0 6px 18px rgb(0 0 0 / 0.25);
    }
    .tile img {
      position: absolute;
      left: 0;
      width: 100%;
      object-fit: cover;
      pointer-events: none;
    }
    .tile-icon {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      color: rgb(255 255 255 / 0.85);
    }
    .tile-icon svg {
      width: 40px;
      height: 40px;
    }
    .tile-name {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 28px 14px 10px;
      text-align: left;
      font-size: 16px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: linear-gradient(transparent, rgb(0 0 0 / 0.55));
      text-shadow: 0 1px 3px rgb(0 0 0 / 0.4);
    }
    :focus-visible {
      outline: 2px solid rgb(255 255 255 / 0.9);
      outline-offset: 3px;
    }
    .stage:focus-visible {
      outline-offset: -3px;
    }
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        transition-duration: 0.01ms !important;
        animation: none !important;
      }
    }
    @media (prefers-reduced-transparency: reduce) {
      .glass,
      .picker {
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
      }
      .glass {
        background: rgb(84 74 64 / 0.85);
      }
      .picker {
        background: rgb(0 0 0 / 0.85);
      }
    }
  `;customElements.get("homeview-camera-page")||customElements.define("homeview-camera-page",Ne);var Es=2,we=class extends E{constructor(){super(...arguments);this._src="";this.loading="";this._fails=0;this.timer=0;this.onVisible=()=>this.resume();this.snap=()=>{this.timer=0;let e=this._config;if(!(e!=null&&e.entity)||this.page||!this.hass||!this.onScreen||document.visibilityState==="hidden")return;let t=Math.max(2,e.refresh??10);this.timer=window.setTimeout(this.snap,t*1e3);let s=this.hass.states[e.entity],n=s&&!A(s)?s.attributes.entity_picture:void 0;if(!n){this._src="";return}let a=this.hass.hassUrl(Fi(n,Date.now(),t));if(a===this._src||a===this.loading)return;this.loading=a;let o=new Image;o.onload=()=>{this.loading===a&&(this._src=a,this._fails=0)},o.onerror=()=>{this.loading===a&&(this.loading="",this._fails++)},o.src=a};this.tap=()=>{let e=this._config,t=e.tap_action??"live";if(t==="none"||!this.hass)return;let s=this.hass.states[e.entity];if(t==="more-info"||!s||A(s)||pe(this)){H(this,"hass-more-info",{entityId:e.entity});return}if(this.live)return;let n=document.createElement("homeview-camera-live");n.hass=this.hass,n.entity=e.entity,n.name=this.name(),n.onClosed=()=>{var a;this.live=void 0,this.isConnected&&((a=this.renderRoot.querySelector("ha-card"))==null||a.focus({preventScroll:!0}))},this.live=n,Q(n)};this.onKey=e=>{e.key!=="Enter"&&e.key!==" "||(e.preventDefault(),this.tap())}}static getStubConfig(e){return{entity:Object.keys(e.states).find(t=>O(t)==="camera")??""}}validate(e){if(Array.isArray(e.entities)&&e.entities.length){if(!rt(e.entities).length)throw new Error("Add one or more camera entities")}else if(!e.entity||O(e.entity)!=="camera")throw new Error("Pick a camera entity")}get page(){var e;return Array.isArray((e=this._config)==null?void 0:e.entities)&&this._config.entities.length>0}get square(){return!this.page&&super.square}getGridOptions(){return this.page?{columns:"full",rows:"auto",min_columns:6,min_rows:4}:{columns:6,rows:"auto",min_columns:3,min_rows:2}}connectedCallback(){super.connectedCallback(),this.resume(),document.addEventListener("visibilitychange",this.onVisible)}disconnectedCallback(){var e;super.disconnectedCallback(),clearTimeout(this.timer),this.timer=0,document.removeEventListener("visibilitychange",this.onVisible),(e=this.live)==null||e.close()}resume(){this.timer||this.snap()}updated(e){var t;(t=super.updated)==null||t.call(this,e),e.has("_config")&&(this._src="",this._fails=0,clearTimeout(this.timer),this.timer=0),this.timer||this.snap(),this.live&&e.has("hass")&&this.hass&&(this.live.hass=this.hass)}name(){let e=this._config;return e.name??(this.hass?N(this.hass,e.entity):e.entity)}render(){var h;let e=this._config;if(!e||!this.hass)return p``;if(this.page){let d=this.layout==="panel"||typeof((h=e.grid_options)==null?void 0:h.rows)=="number";return p`<homeview-camera-page .hass=${this.hass} .config=${e} ?wide=${!d}></homeview-camera-page>`}if(!e.entity)return p``;let t=this.hass.states[e.entity],s=!t||A(t),n=this.name(),a=e.fit??"cover",o=a==="cover"?st(e.crop_top):0,l=this._fails>=Es?"":this._src,c=t?s?"Offline":this._fails>=Es?"Not responding":"Loading\u2026":"Camera not found";return p`<ha-card
      class="camera ${this.square?"square":""} ${l?"shown":""}"
      role="button"
      tabindex="0"
      aria-label="${n}: ${s?"offline":"open the live view"}"
      @click=${this.tap}
      @keydown=${this.onKey}
    >
      ${l?p`<img src=${l} alt="" draggable="false" style="object-fit:${a};top:${-o}%;height:${100+o}%" />`:m}
      ${!l||s?p`<div class="empty">${b.camera}<span>${c}</span></div>`:m}
      <div class="name">${n}</div>
    </ha-card>`}renderContent(){return m}};we.properties={...E.properties,layout:{attribute:!1},_src:{state:!0},_fails:{state:!0}},we.editorFields=[{name:"entity",label:"Camera (tile)",selector:{entity:{filter:{domain:"camera"}}}},{name:"entities",label:"Cameras (full-screen page)",helper:"Set these instead of one camera for a page of live cameras that fills a panel view: swipe between them. A name per camera can be set in YAML.",selector:{entity:{multiple:!0,filter:{domain:"camera"}}}},{name:"home_path",label:"Home button goes to",helper:"Page only. Defaults to the dashboard's first view, e.g. /echo-show/home",selector:{text:{}}},{name:"name",selector:{text:{}}},{name:"refresh",label:"Seconds between snapshots",selector:{number:{min:2,max:600,mode:"box",unit_of_measurement:"s"}}},{name:"fit",selector:{select:{mode:"dropdown",options:[{value:"cover",label:"Fill"},{value:"contain",label:"Fit whole picture"}]}}},{name:"crop_top",label:"Hide the top (percent, when filling)",selector:{number:{min:0,max:20,mode:"box",unit_of_measurement:"%"}}},{name:"tap_action",label:"Tap action",selector:{select:{mode:"dropdown",options:[{value:"live",label:"Live view, full screen"},{value:"more-info",label:"More info"},{value:"none",label:"Nothing"}]}}}],we.styles=[z,$`
      ha-card.camera {
        position: relative;
        height: 100%;
        overflow: hidden;
        border: none;
        border-radius: var(--hv-radius, 24px);
        background: linear-gradient(180deg, rgb(88 96 104 / 0.55), rgb(40 42 44 / 0.7));
        box-shadow: 0 calc(var(--hv-ref, 200px) * 0.03) calc(var(--hv-ref, 200px) * 0.09) rgb(40 30 20 / 0.18);
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        -webkit-tap-highlight-color: transparent;
        font-family: var(--hv-font);
        transition: transform 0.45s var(--hv-spring);
      }
      ha-card.camera:active {
        transform: scale(0.97);
        transition-duration: 0.12s;
      }
      ha-card.camera.square {
        aspect-ratio: 1;
        height: auto;
      }
      ha-card.camera::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        box-shadow: inset 0 0 0 0.5px rgb(255 255 255 / 0.35);
        pointer-events: none;
      }
      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        -webkit-user-drag: none;
      }
      .empty {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: calc(var(--hv-ref, 200px) * 0.04);
        color: rgb(255 255 255 / 0.85);
        font-size: calc(var(--hv-ref, 200px) * 0.075);
      }
      .empty svg {
        width: calc(var(--hv-ref, 200px) * 0.2);
        height: calc(var(--hv-ref, 200px) * 0.2);
      }
      .name {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: calc(var(--hv-ref, 200px) * 0.2) calc(var(--hv-ref, 200px) * 0.08) calc(var(--hv-ref, 200px) * 0.07);
        background: linear-gradient(180deg, transparent, rgb(0 0 0 / 0.5));
        color: #fff;
        font-size: calc(var(--hv-ref, 200px) * 0.085);
        font-weight: 600;
        text-shadow: 0 1px 3px rgb(0 0 0 / 0.4);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        pointer-events: none;
      }
    `];var Ue=class extends I{constructor(){super(...arguments);this.entity="";this.name="";this.label="Camera live view";this.closeLabel="Close live view";this.openMs=600*1e3}connectedCallback(){super.connectedCallback(),Yt(this.entity).then(e=>this._player=e)}closed(){var e;(e=this.onClosed)==null||e.call(this)}renderBody(){var s;let e=(s=this.hass)==null?void 0:s.states[this.entity],t=m;return e&&this.hass&&this._player?t=p`<ha-camera-stream .hass=${this.hass} .stateObj=${e} .muted=${!0} .controls=${!1} fit-mode="contain"></ha-camera-stream>`:e&&this.hass&&this._player===!1&&(t=p`<img src=${this.hass.hassUrl(`/api/camera_proxy_stream/${this.entity}?token=${e.attributes.access_token}`)} alt="" draggable="false" />`),p`${t}${this._chrome?p`<div class="title">${this.name}</div>`:m}`}};Ue.properties={...I.properties,hass:{attribute:!1},_player:{state:!0}},Ue.styles=[I.overlayStyles,$`
      ha-camera-stream,
      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
        -webkit-user-drag: none;
        /* the overlay owns every gesture: a swipe down closes it */
        pointer-events: none;
      }
      ha-camera-stream {
        --video-max-height: 100vh;
      }
      /* bottom left: cameras burn their clock into the top left */
      .title {
        position: absolute;
        bottom: max(20px, env(safe-area-inset-bottom));
        left: max(24px, env(safe-area-inset-left));
        color: #fff;
        font: 600 20px/44px -apple-system, "SF Pro Display", "Inter", system-ui, "Segoe UI", Roboto, sans-serif;
        text-shadow: 0 1px 4px rgb(0 0 0 / 0.5);
      }
    `];customElements.get("homeview-camera-live")||customElements.define("homeview-camera-live",Ue);customElements.define("homeview-camera-card",we);L("homeview-camera-card","HomeView Camera","Camera snapshot tile; tap for the live view full screen.");var Rr=4,Or=16,Lr=32,zr=256,Dr=512,Ir=8192,Hr=500;function Ms(r,i){var t,s;let e=(s=(t=r.entities)==null?void 0:t[i])==null?void 0:s.device_id;return e?Object.entries(r.entities??{}).filter(([n,a])=>a.device_id===e&&n!==i&&r.states[n]).map(([n])=>n):[]}function Ts(r,i){var n,a;let e=i.battery??Ms(r,i.entity).find(o=>O(o)==="sensor"&&r.states[o].attributes.device_class==="battery"),t=e?(n=r.states[e])==null?void 0:n.state:(a=r.states[i.entity])==null?void 0:a.attributes.battery_level,s=Number(t);return t==null||t===""||!isFinite(s)?void 0:s}function Fr(r,i){return i.map?i.map:Ms(r,i.entity).find(e=>(O(e)==="image"||O(e)==="camera")&&!A(r.states[e])&&r.states[e].attributes.entity_picture)}var Be=class extends E{constructor(){super(...arguments);this.holdTimer=0;this.held=!1;this.down=()=>{this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=window.setTimeout(()=>{this.held=!0,H(this,"hass-more-info",{entityId:this._config.entity})},Hr)};this.up=()=>clearTimeout(this.holdTimer);this.tap=()=>{if(this.held){this.held=!1;return}if(!this.hass||this.panel)return;if(pe(this))return H(this,"hass-more-info",{entityId:this._config.entity});let e=document.createElement("homeview-vacuum-panel");e.hass=this.hass,e.config=this._config,e.onClosed=()=>{var t;this.panel=void 0,this.isConnected&&((t=this.renderRoot.querySelector("button"))==null||t.focus({preventScroll:!0}))},this.panel=e,Q(e)}}static getStubConfig(e){return{entity:Object.keys(e.states).find(t=>O(t)==="vacuum")??""}}validate(e){if(!e.entity||O(e.entity)!=="vacuum")throw new Error("Pick a vacuum entity")}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.panel)==null||e.close()}updated(e){var t;(t=super.updated)==null||t.call(this,e),this.panel&&e.has("hass")&&this.hass&&(this.panel.hass=this.hass)}cardClass(){var s;let e=(s=this.hass)==null?void 0:s.states[this._config.entity];return`tile vacuum ${!!e&&Ht.includes(e.state)?"on":""} ${(e==null?void 0:e.state)==="cleaning"?"cleaning":""} ${A(e)?"unavailable":""}`}renderContent(){let e=this._config;if(!this.hass)return m;let t=this.hass.states[e.entity],s=e.name??(t?N(this.hass,e.entity):e.entity),n=t?Ft(t.state,Ts(this.hass,e)):"Entity not found";return p`<button
      class="hit"
      aria-label="${s}, ${n}"
      aria-haspopup="dialog"
      ?disabled=${!t}
      @pointerdown=${this.down}
      @pointerup=${this.up}
      @pointerleave=${this.up}
      @pointercancel=${this.up}
      @click=${this.tap}
      @contextmenu=${a=>a.preventDefault()}
    >
      <span class="icon">${b.vacuum}</span>
      <span class="label ink"><span class="title">${s}</span><br /><span class="sub">${n}</span></span>
    </button>`}};Be.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"vacuum"}}}},{name:"name",selector:{text:{}}},{name:"battery",helper:"Defaults to the robot's own battery sensor",selector:{entity:{filter:{domain:"sensor",device_class:"battery"}}}},{name:"map",helper:"Defaults to the robot's own map image",selector:{entity:{filter:{domain:["image","camera"]}}}},{name:"modes",label:"Mode choices",helper:"Select entities offered in the panel, such as mop mode or intensity",selector:{entity:{multiple:!0,filter:{domain:"select"}}}}],Be.styles=[...ee.styles,$`
      ha-card.vacuum.on .icon {
        color: #0a9d8f;
      }
      ha-card.cleaning .icon svg {
        animation: spin 2.4s linear infinite;
      }
    `];var qe=class extends I{constructor(){super(...arguments);this._picked=[];this.label="Vacuum";this.closeLabel="Close vacuum";this.openMs=1800*1e3;this.ownClose=!0;this.start=()=>{let e=Ui(this._picked);e.length?(this.call("vacuum","send_command",{command:"app_segment_clean",params:[{segments:e,repeat:1}]}),this._picked=[]):this.call("vacuum","start")}}connectedCallback(){super.connectedCallback(),this.loadRooms()}closed(){var e;(e=this.onClosed)==null||e.call(this)}async loadRooms(){var t,s;let e=this.config;if(!(!this.hass||((s=(t=this.hass.entities)==null?void 0:t[e.entity])==null?void 0:s.platform)!=="roborock"))try{let n=await G(this.hass.callWS({type:"vacuum/get_segments",entity_id:e.entity}),15e3);this._rooms=n.segments??[]}catch(n){console.warn("HomeView vacuum: no rooms",n),this._rooms=[]}}call(e,t,s={},n=this.config.entity){var a;(a=this.hass)==null||a.callService(e,t,s,{entity_id:n})}toggleRoom(e){this._picked=this._picked.includes(e)?this._picked.filter(t=>t!==e):[...this._picked,e]}chips(e,t,s,n=!1){return p`<div class="chips">
      ${e.map(a=>p`<button class="chip ${a===t?"on":""}" ?disabled=${n} aria-pressed=${String(a===t)} @click=${()=>s(a)}>${Z(a)}</button>`)}
    </div>`}renderBody(){var k,M;let e=this.config,t=this.hass,s=t==null?void 0:t.states[e.entity];if(!t||!s)return p`<div class="scrim" @click=${()=>this.close()}></div>`;let n=Number(s.attributes.supported_features)||0,a=A(s),o=Ht.includes(s.state),l=Ts(t,e),c=e.name??N(t,e.entity),h=Fr(t,e),d=h?(k=t.states[h])==null?void 0:k.attributes.entity_picture:void 0,u=(s.attributes.fan_speed_list??[]).filter(x=>x!=="custom"),f=(x,P,_,v,y=!1)=>v?p`<button class="act ${y?"primary":""}" ?disabled=${a} @click=${_}>${P}<span>${x}</span></button>`:m,g=this._picked.length;return p`<div class="scrim" @click=${()=>this.close()}></div>
      <section class="sheet" @pointerdown=${x=>x.stopPropagation()} @touchmove=${x=>x.stopPropagation()}>
        <header>
          <span class="robot ${s.state==="cleaning"?"cleaning":""}">${b.vacuum}</span>
          <div>
            <h2>${Ft(s.state)}</h2>
            <p>${[c,l===void 0?"":`${Math.round(l)}% battery`].filter(Boolean).join(" \xB7 ")}</p>
          </div>
          ${this.closeButton()}
        </header>
        <div class="cols ${d?"":"nomap"}">
          ${d?p`<div class="map"><img src=${t.hassUrl(d)} alt="Map" draggable="false" /></div>`:m}
          <div class="controls">
            <div class="acts">
              ${f(s.state==="paused"?"Resume":g?`Clean ${g} room${g>1?"s":""}`:"Start",p`<span class="g">${b.start}</span>`,this.start,!!(n&Ir)&&s.state!=="cleaning",!0)}
              ${f("Pause",p`<span class="g">${b.pause}</span>`,()=>this.call("vacuum","pause"),!!(n&Rr)&&s.state==="cleaning")}
              ${f("Dock",p`<span class="g">${b.home}</span>`,()=>this.call("vacuum","return_to_base"),!!(n&Or)&&(o||s.state==="idle"||s.state==="error"))}
              ${f("Locate",p`<span class="g">${b.locate}</span>`,()=>this.call("vacuum","locate"),!!(n&Dr))}
            </div>
            ${(M=this._rooms)!=null&&M.length&&n&zr&&!o?p`<h3>Rooms</h3>
                  <div class="chips">
                    <button class="chip ${g?"":"on"}" aria-pressed=${String(!g)} @click=${()=>this._picked=[]}>Entire home</button>
                    ${this._rooms.map(x=>p`<button class="chip ${this._picked.includes(x.id)?"on":""}" aria-pressed=${String(this._picked.includes(x.id))} @click=${()=>this.toggleRoom(x.id)}>${x.name}</button>`)}
                  </div>`:m}
            ${u.length&&n&Lr?p`<h3>Suction</h3>
                  ${this.chips(u,s.attributes.fan_speed,x=>this.call("vacuum","set_fan_speed",{fan_speed:x}),a)}`:m}
            ${(e.modes??[]).map(x=>{let P=t.states[x];if(!P)return m;let _=(P.attributes.options??[]).filter(y=>y!=="custom"),v=N(t,x).replace(N(t,e.entity),"").trim()||x;return p`<h3>${Z(v)}</h3>
                ${this.chips(_,P.state,y=>this.call("select","select_option",{option:y},x),A(P))}`})}
          </div>
        </div>
      </section>`}};qe.properties={...I.properties,hass:{attribute:!1},_rooms:{state:!0},_picked:{state:!0}},qe.styles=[I.overlayStyles,$`
      /* tinted enough to read without the blur (browsers that drop backdrop-filter here) */
      :host {
        background: rgb(28 22 16 / 0.5);
        backdrop-filter: blur(18px) saturate(1.3);
        -webkit-backdrop-filter: blur(18px) saturate(1.3);
        font-family: -apple-system, "SF Pro Display", "Inter", system-ui, "Segoe UI", Roboto, sans-serif;
        color: #fff;
      }
      .stage {
        display: grid;
        place-items: center;
        padding: max(24px, env(safe-area-inset-top)) 16px 24px;
        box-sizing: border-box;
      }
      .scrim {
        position: absolute;
        inset: 0;
      }
      .sheet {
        position: relative;
        width: min(860px, 100%);
        max-height: 100%;
        box-sizing: border-box;
        overflow: auto;
        overscroll-behavior: contain;
        touch-action: pan-y;
        padding: 26px 28px 28px;
        border-radius: 32px;
        background: rgb(74 64 54 / 0.78);
        backdrop-filter: blur(30px) saturate(1.6);
        -webkit-backdrop-filter: blur(30px) saturate(1.6);
        box-shadow:
          inset 0 0 0 1px rgb(255 255 255 / 0.18),
          inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.7),
          0 24px 60px rgb(0 0 0 / 0.3);
        text-shadow: 0 1px 3px rgb(40 30 20 / 0.3);
      }
      header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 20px;
      }
      header > div {
        flex: 1;
        min-width: 0;
      }
      header .close {
        position: static;
        flex: none;
        align-self: flex-start;
      }
      .robot svg {
        width: 48px;
        height: 48px;
        display: block;
      }
      .robot.cleaning svg {
        color: #4fe0cf;
        animation: spin 2.4s linear infinite;
      }
      h2 {
        margin: 0;
        font-size: 28px;
        font-weight: 700;
        line-height: 1.1;
      }
      header p {
        margin: 4px 0 0;
        font-size: 16px;
        color: rgb(255 255 255 / 0.8);
      }
      .cols {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        align-items: start;
      }
      .cols.nomap {
        grid-template-columns: 1fr;
      }
      @media (max-width: 640px) {
        .cols {
          grid-template-columns: 1fr;
        }
      }
      .map {
        border-radius: 20px;
        background: rgb(255 255 255 / 0.12);
        box-shadow: inset 0 0 0 0.5px rgb(255 255 255 / 0.35);
        padding: 10px;
        aspect-ratio: 1;
        box-sizing: border-box;
      }
      .map img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        -webkit-user-drag: none;
      }
      h3 {
        margin: 18px 0 8px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: rgb(255 255 255 / 0.72);
      }
      .acts {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      button {
        font: inherit;
        color: inherit;
        border: 0;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        text-shadow: none;
        transition:
          background 0.2s ease,
          transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      button:active {
        transform: scale(0.95);
      }
      button:disabled {
        opacity: 0.45;
        cursor: default;
      }
      .act {
        height: 48px;
        min-width: 120px;
        border-radius: 24px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 600;
        background: rgb(255 255 255 / 0.16);
        box-shadow: inset 0 0 0 0.5px rgb(255 255 255 / 0.4);
        white-space: nowrap;
      }
      .act.primary {
        background: rgb(255 255 255 / 0.88);
        color: #2b241d;
      }
      .g svg {
        width: 18px;
        height: 18px;
        display: block;
      }
      .chip {
        height: 40px;
        border-radius: 20px;
        padding: 0 16px;
        font-size: 15px;
        font-weight: 600;
        background: rgb(255 255 255 / 0.14);
        box-shadow: inset 0 0 0 0.5px rgb(255 255 255 / 0.35);
      }
      .chip.on {
        background: rgb(255 255 255 / 0.88);
        color: #2b241d;
      }
      :focus-visible {
        outline: 2px solid rgb(255 255 255 / 0.9);
        outline-offset: 3px;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `];customElements.get("homeview-vacuum-panel")||customElements.define("homeview-vacuum-panel",qe);customElements.define("homeview-vacuum-card",Be);L("homeview-vacuum-card","HomeView Vacuum","Robot vacuum tile with a glass panel: map, rooms, start / pause / dock and suction.");var Nr=250,Ur=5e3,xe=class extends E{constructor(){super(...arguments);this._now=Date.now();this._vol=!1;this._artFailed="";this.dragging=!1;this.ticker=0;this.seekTimer=0;this.volDone=0;this.volTimer=0;this.volSent=0;this.onVisible=()=>this.resume();this.seeking=e=>{var t;this.dragging=!0,clearTimeout(this.seekTimer),this._seek=[Number(e.target.value),(t=this.state())==null?void 0:t.attributes.media_position_updated_at]};this.seek=e=>{var s;let t=Number(e.target.value);this.dragging=!1,this._seek=[t,(s=this.state())==null?void 0:s.attributes.media_position_updated_at],this.call("media_seek",{seek_position:t}),this.seekEnd()};this.seekEnd=()=>{this.dragging=!1,clearTimeout(this.seekTimer),this.seekTimer=window.setTimeout(()=>this._seek=void 0,5e3)};this.volumeInput=e=>{clearTimeout(this.volDone),this.volDone=0,this._volume=Number(e.target.value)/100,this.keepPopover(),!(Date.now()-this.volSent<Nr)&&(this.volSent=Date.now(),this.call("volume_set",{volume_level:this._volume}))};this.volumeEnd=()=>{this.volDone||this._volume===void 0||(this.call("volume_set",{volume_level:this._volume}),this.volDone=window.setTimeout(()=>this._volume=void 0,1500))};this.toggleVolume=()=>{this._vol=!this._vol,this.keepPopover()};this.onOutside=e=>{if(!this._vol)return;let t=this.renderRoot.querySelector(".volwrap");t&&!e.composedPath().includes(t)&&(this._vol=!1)};this.onKey=e=>{e.key==="Escape"&&this._vol&&(this._vol=!1)};this.close=()=>{var t;let e=(t=this._config)==null?void 0:t.navigation_path;e&&(history.pushState(null,"",e),H(window,"location-changed",{replace:!1}))}}static getStubConfig(e){return{entity:Object.keys(e.states).find(t=>O(t)==="media_player")??""}}validate(e){if(!e.entity||O(e.entity)!=="media_player")throw new Error("Pick a media player entity")}getGridOptions(){return{columns:"full",rows:8,min_columns:6,min_rows:4}}getCardSize(){return 8}get square(){return!1}refFrom(e,t){return Math.min(t,e/2)}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisible),document.addEventListener("pointerdown",this.onOutside,!0),window.addEventListener("keydown",this.onKey)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onVisible),document.removeEventListener("pointerdown",this.onOutside,!0),window.removeEventListener("keydown",this.onKey),this.tick(!1),clearTimeout(this.seekTimer),clearTimeout(this.volTimer),clearTimeout(this.volDone)}resume(){var e;this._now=Date.now(),this.tick(((e=this.state())==null?void 0:e.state)==="playing"&&this.onScreen&&document.visibilityState!=="hidden")}tick(e){e&&!this.ticker?this.ticker=window.setInterval(()=>{!this.onScreen||document.visibilityState==="hidden"?this.tick(!1):this._now=Date.now()},1e3):!e&&this.ticker&&(clearInterval(this.ticker),this.ticker=0)}updated(e){var s;if((s=super.updated)==null||s.call(this,e),!e.has("hass")&&!e.has("_config"))return;this.resume();let t=this.state();this._seek&&!this.dragging&&t&&t.attributes.media_position_updated_at!==this._seek[1]&&(this._seek=void 0)}state(){return this._config&&this.hass?this.hass.states[this._config.entity]:void 0}call(e,t={}){var s;(s=this.hass)==null||s.callService("media_player",e,t,{entity_id:this._config.entity})}keepPopover(){clearTimeout(this.volTimer),this._vol&&(this.volTimer=window.setTimeout(()=>this._vol=!1,Ur))}render(){let e=this._config;if(!e||!this.hass)return p``;let t=this.state(),s=!t||A(t),n=(t==null?void 0:t.attributes)??{},a=s?0:Number(n.supported_features)||0,o=!!t&&["playing","paused","buffering"].includes(ce(t)),l=e.name??(t?N(this.hass,e.entity):e.entity),c=o&&n.entity_picture?this.hass.hassUrl(n.entity_picture):"",h=c&&c!==this._artFailed?c:"",d=o&&n.media_title?String(n.media_title):t?s?"Unavailable":"Not playing":"Player not found",u=o&&n.media_title?String(n.media_artist||n.media_album_artist||n.app_name||""):l,f=o&&n.media_title?String(n.media_album_name||""):"",g=o&&t?Bi(t,this._now):null,k=this._seek?this._seek[0]:(g==null?void 0:g.pos)??0,M=(t==null?void 0:t.state)==="playing",x=this._volume??(typeof n.volume_level=="number"?n.volume_level:0),P=!!n.is_volume_muted||x===0,_=n.repeat??"off",v=(y,S,T,R={})=>p`<button
        class="g ${R.cls??""} ${R.pressed?"on":""}"
        aria-label=${y}
        aria-pressed=${R.pressed===void 0?m:String(R.pressed)}
        ?disabled=${R.disabled}
        @click=${T}
      >
        ${S}
      </button>`;return p`<ha-card class="media" aria-label="Now playing on ${l}">
      ${h?p`<div class="bg" aria-hidden="true"><img src=${h} alt="" /></div><div class="scrim"></div>`:m}
      <div class="np">
        <div class="art">
          ${h?p`<img src=${h} alt=${f||d} draggable="false" @error=${()=>this._artFailed=h} />`:p`<div class="none">${b.music}</div>`}
        </div>
        <div class="col ink">
          <div class="title">${d}</div>
          ${u?p`<div class="artist">${u}</div>`:m}
          ${f?p`<div class="album">${f}</div>`:m}
          ${g?p`<div class="prog">
                <input
                  type="range"
                  min="0"
                  max=${g.dur}
                  step="1"
                  .value=${String(Math.round(k))}
                  style="--p:${k/g.dur*100}%"
                  aria-label="Position"
                  aria-valuetext="${Re(k)} of ${Re(g.dur)}"
                  ?disabled=${!(a&Y.SEEK)}
                  @input=${this.seeking}
                  @change=${this.seek}
                  @pointerup=${this.seekEnd}
                  @pointercancel=${this.seekEnd}
                  @lostpointercapture=${this.seekEnd}
                  @blur=${this.seekEnd}
                />
                <div class="times"><span>${Re(k)}</span><span>${Re(g.dur)}</span></div>
              </div>`:m}
          <div class="row">
            ${v("Previous",b.previous,()=>this.call("media_previous_track"),{cls:"skip",disabled:!o||!(a&Y.PREVIOUS)})}
            ${v(M?"Pause":"Play",M?b.pause:b.start,()=>this.call(o?"media_play_pause":"media_play"),{cls:"play",disabled:s||!(a&(Y.PLAY|Y.PAUSE))})}
            ${v("Next",b.next,()=>this.call("media_next_track"),{cls:"skip",disabled:!o||!(a&Y.NEXT)})}
          </div>
          <div class="row sec">
            ${a&Y.VOLUME_SET?p`<div class="volwrap">
                  ${v(`Volume ${Math.round(x*100)}%`,P?b.muted:b.sound,this.toggleVolume,{pressed:this._vol})}
                  ${this._vol?p`<div class="pop" role="group" aria-label="Volume">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          .value=${String(Math.round(x*100))}
                          style="--p:${x*100}%"
                          aria-label="Volume"
                          @input=${this.volumeInput}
                          @change=${this.volumeEnd}
                          @pointerup=${this.volumeEnd}
                          @pointercancel=${this.volumeEnd}
                          @lostpointercapture=${this.volumeEnd}
                          @blur=${this.volumeEnd}
                        />
                        <span class="pct">${Math.round(x*100)}</span>
                      </div>`:m}
                </div>`:m}
            ${this._vol?m:p`${a&Y.SHUFFLE?v("Shuffle",b.shuffle,()=>this.call("shuffle_set",{shuffle:!n.shuffle}),{pressed:!!n.shuffle}):m}
            ${a&Y.REPEAT?v(`Repeat ${_==="one"?"one":_==="all"?"all":"off"}`,_==="one"?b.repeatOne:b.repeat,()=>this.call("repeat_set",{repeat:qi(_)}),{pressed:_!=="off"}):m}`}
          </div>
        </div>
      </div>
      ${e.navigation_path?p`<div class="top">${v("Close",b.close,this.close,{cls:"close"})}</div>`:m}
    </ha-card>`}renderContent(){return m}};xe.properties={...E.properties,_now:{state:!0},_seek:{state:!0},_volume:{state:!0},_vol:{state:!0},_artFailed:{state:!0}},xe.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"media_player"}}}},{name:"name",selector:{text:{}}},{name:"navigation_path",label:"Close button goes to",helper:"A dashboard path such as /echo-show/home. Leave empty for no close button.",selector:{text:{}}}],xe.styles=[z,$`
      :host {
        /* the layout is drawn at 960x480; one unit is one pixel there */
        --u: calc(var(--hv-ref, 480px) / 480);
        --hv-btn: 48px;
      }
      ha-card.media {
        position: relative;
        isolation: isolate;
        height: 100%;
        min-height: 240px;
        overflow: hidden;
        border: none;
        border-radius: var(--ha-card-border-radius, 0);
        background: none;
        box-shadow: none;
        color: #fff;
        font-family: var(--hv-font);
        -webkit-font-smoothing: antialiased;
        user-select: none;
        -webkit-user-select: none;
      }
      /* the album art, blurred and enlarged, behind everything; nothing playing leaves the wallpaper */
      .bg {
        position: absolute;
        inset: calc(var(--u) * -60);
        z-index: -2;
      }
      .bg img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: blur(calc(var(--u) * 48)) saturate(1.3);
        transform: scale(1.15);
      }
      .scrim {
        position: absolute;
        inset: 0;
        z-index: -1;
        background: linear-gradient(90deg, rgb(20 14 20 / 0.25), rgb(20 14 20 / 0.45));
      }
      .np {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: calc(var(--u) * 40);
        padding: 0 calc(var(--u) * 40) 0 calc(var(--u) * 56);
        box-sizing: border-box;
      }
      .art {
        flex: none;
        width: calc(var(--u) * 352);
        height: calc(var(--u) * 352);
        border-radius: calc(var(--u) * 24);
        overflow: hidden;
        box-shadow:
          0 0 0 0.75px rgb(60 46 32 / 0.25),
          0 calc(var(--u) * 14) calc(var(--u) * 36) rgb(20 12 10 / 0.35);
      }
      .art img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        -webkit-user-drag: none;
      }
      /* nothing playing: an empty frosted square with a note */
      .art .none {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        background: rgb(84 74 64 / 0.28);
        backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
        -webkit-backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
        box-shadow:
          inset 0 0 0 1px rgb(255 255 255 / 0.16),
          inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.8),
          inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.4);
        border-radius: inherit;
      }
      .art .none svg {
        width: 34%;
        height: 34%;
        color: rgb(255 255 255 / 0.85);
        filter: drop-shadow(var(--hv-shadow-text));
      }
      .col {
        flex: 1;
        min-width: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .col .title {
        font-size: calc(var(--u) * 36);
        font-weight: 700;
        letter-spacing: -0.01em;
        line-height: 1.15;
        max-width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .artist,
      .album {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .artist {
        font-size: calc(var(--u) * 20);
        color: rgb(255 255 255 / 0.88);
        margin-top: calc(var(--u) * 8);
      }
      .album {
        font-size: calc(var(--u) * 18);
        color: rgb(255 255 255 / 0.76);
        margin-top: calc(var(--u) * 4);
      }
      .prog {
        width: min(calc(var(--u) * 400), 100%);
        margin-top: calc(var(--u) * 14);
      }
      .times {
        display: flex;
        justify-content: space-between;
        font-size: max(12px, calc(var(--u) * 13));
        color: rgb(255 255 255 / 0.8);
        margin-top: calc(var(--u) * -4);
        font-variant-numeric: tabular-nums;
      }
      /* sliders: a thin white track in a 44px-tall touch area */
      input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        display: block;
        width: 100%;
        height: 44px;
        margin: 0;
        background: none;
        cursor: pointer;
        touch-action: none;
        --track: max(4px, calc(var(--u) * 6));
        --knob: max(14px, calc(var(--u) * 16));
      }
      input[type="range"]:disabled {
        cursor: default;
      }
      input[type="range"]::-webkit-slider-runnable-track {
        height: var(--track);
        border-radius: 99px;
        background: linear-gradient(90deg, #fff var(--p, 0%), rgb(255 255 255 / 0.28) var(--p, 0%));
      }
      input[type="range"]::-moz-range-track {
        height: var(--track);
        border-radius: 99px;
        background: linear-gradient(90deg, #fff var(--p, 0%), rgb(255 255 255 / 0.28) var(--p, 0%));
      }
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: var(--knob);
        height: var(--knob);
        margin-top: calc((var(--track) - var(--knob)) / 2);
        border-radius: 50%;
        background: #fff;
        border: 0;
        box-shadow: 0 1px 4px rgb(0 0 0 / 0.35);
      }
      input[type="range"]::-moz-range-thumb {
        width: var(--knob);
        height: var(--knob);
        border-radius: 50%;
        background: #fff;
        border: 0;
        box-shadow: 0 1px 4px rgb(0 0 0 / 0.35);
      }
      input[type="range"]:disabled::-webkit-slider-thumb {
        visibility: hidden;
      }
      input[type="range"]:disabled::-moz-range-thumb {
        visibility: hidden;
      }
      .row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: calc(var(--u) * 28);
        margin-top: calc(var(--u) * 14);
      }
      .row.sec {
        gap: max(10px, calc(var(--u) * 20));
        margin-top: calc(var(--u) * 16);
      }
      /* frosted glass buttons, the HomeView card glass at button size */
      button.g {
        position: relative;
        isolation: isolate;
        flex: none;
        width: max(44px, calc(var(--u) * 48));
        height: max(44px, calc(var(--u) * 48));
        padding: 0;
        border: 0;
        border-radius: 50%;
        display: grid;
        place-items: center;
        cursor: pointer;
        color: #fff;
        background: rgb(84 74 64 / 0.13);
        backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
        -webkit-backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
        box-shadow:
          0 0 0 0.75px rgb(60 46 32 / 0.2),
          0 calc(var(--u) * 6) calc(var(--u) * 18) rgb(60 45 30 / 0.14);
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        transition:
          transform 0.45s var(--hv-spring),
          background-color 0.2s ease,
          opacity 0.2s ease;
      }
      button.g::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        box-shadow:
          inset 0 0 0 1px rgb(255 255 255 / 0.16),
          inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.8),
          inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.4),
          inset 0 0 7px rgb(50 38 26 / 0.1);
      }
      button.g svg {
        width: 46%;
        height: 46%;
        display: block;
        filter: drop-shadow(0 1px 2px rgb(40 30 20 / 0.35));
      }
      button.g:active:not(:disabled) {
        transform: scale(0.9);
        transition-duration: 0.12s;
      }
      button.g:disabled {
        opacity: 0.4;
        cursor: default;
      }
      button.g.skip {
        width: max(44px, calc(var(--u) * 60));
        height: max(44px, calc(var(--u) * 60));
      }
      button.g.skip svg {
        width: 40%;
        height: 40%;
      }
      /* play / pause: a solid white disc, the one thing to find at a glance */
      button.g.play {
        width: max(56px, calc(var(--u) * 76));
        height: max(56px, calc(var(--u) * 76));
        background: #fff;
        color: #2b241d;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        box-shadow: 0 calc(var(--u) * 6) calc(var(--u) * 18) rgb(20 12 10 / 0.3);
      }
      button.g.play svg {
        width: 42%;
        height: 42%;
        filter: none;
      }
      button.g.play::after {
        box-shadow: none;
      }
      /* shuffle / repeat on, and the open volume button: white glass, dark glyph */
      button.g.on {
        background: rgb(255 255 255 / 0.85);
        color: #2b241d;
      }
      button.g.on svg {
        filter: none;
      }
      .top {
        position: absolute;
        top: max(12px, calc(var(--u) * 18));
        right: max(12px, calc(var(--u) * 20));
      }
      /* the volume slider opens beside its button, in place of shuffle and repeat */
      .volwrap {
        display: flex;
        align-items: center;
        gap: max(10px, calc(var(--u) * 12));
      }
      .pop {
        width: max(200px, calc(var(--u) * 236));
        height: max(44px, calc(var(--u) * 48));
        box-sizing: border-box;
        padding: 0 16px 0 18px;
        display: flex;
        align-items: center;
        gap: 10px;
        border-radius: 999px;
        background: rgb(84 74 64 / 0.13);
        backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
        -webkit-backdrop-filter: blur(22px) saturate(1.5) brightness(1.04);
        box-shadow:
          0 0 0 0.75px rgb(60 46 32 / 0.2),
          inset 0 0 0 1px rgb(255 255 255 / 0.16),
          inset 1.5px 1.5px 0.5px -0.5px rgb(255 255 255 / 0.8),
          inset -1px -1px 0.5px -0.5px rgb(255 255 255 / 0.4);
        transform-origin: left center;
        animation: pop 0.35s var(--hv-spring);
      }
      .pop input {
        flex: 1;
        min-width: 0;
      }
      .pct {
        width: 2.4em;
        text-align: right;
        font-size: 15px;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        text-shadow: var(--hv-shadow-text);
      }
      @keyframes pop {
        from {
          opacity: 0;
          transform: scaleX(0.6);
        }
      }
    `];customElements.define("homeview-media-card",xe);L("homeview-media-card","HomeView Now Playing","One media player full screen: album art, progress, transport, volume, shuffle and repeat.");customElements.get("homeview-card-editor")||customElements.define("homeview-card-editor",Oe);console.info("%c HOMEVIEW %c 0.1.10 ","background:#928980;color:#fff;border-radius:3px 0 0 3px","background:#2b241d;color:#fff;border-radius:0 3px 3px 0");
