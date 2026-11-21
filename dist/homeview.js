var ze=globalThis,De=ze.ShadowRoot&&(ze.ShadyCSS===void 0||ze.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ze=Symbol(),Pt=new WeakMap,ve=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==Ze)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(De&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=Pt.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&Pt.set(e,i))}return i}toString(){return this.cssText}},Lt=s=>new ve(typeof s=="string"?s:s+"",void 0,Ze),S=(s,...i)=>{let e=s.length===1?s[0]:i.reduce((t,r,n)=>t+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[n+1],s[0]);return new ve(e,s,Ze)},Ot=(s,i)=>{if(De)s.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),r=ze.litNonce;r!==void 0&&t.setAttribute("nonce",r),t.textContent=e.cssText,s.appendChild(t)}},Qe=De?s=>s:s=>s instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return Lt(e)})(s):s;var{is:Yi,defineProperty:Xi,getOwnPropertyDescriptor:Ji,getOwnPropertyNames:Zi,getOwnPropertySymbols:Qi,getPrototypeOf:er}=Object,K=globalThis,zt=K.trustedTypes,tr=zt?zt.emptyScript:"",et=K.reactiveElementPolyfillSupport,be=(s,i)=>s,tt={toAttribute(s,i){switch(i){case Boolean:s=s?tr:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,i){let e=s;switch(i){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},It=(s,i)=>!Yi(s,i),Dt={attribute:!0,type:String,converter:tt,reflect:!1,useDefault:!1,hasChanged:It};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),K.litPropertyMetadata??(K.litPropertyMetadata=new WeakMap);var j=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??(this.l=[])).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=Dt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),r=this.getPropertyDescriptor(i,t,e);r!==void 0&&Xi(this.prototype,i,r)}}static getPropertyDescriptor(i,e,t){let{get:r,set:n}=Ji(this.prototype,i)??{get(){return this[e]},set(a){this[e]=a}};return{get:r,set(a){let o=r==null?void 0:r.call(this);n==null||n.call(this,a),this.requestUpdate(i,o,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??Dt}static _$Ei(){if(this.hasOwnProperty(be("elementProperties")))return;let i=er(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(be("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(be("properties"))){let e=this.properties,t=[...Zi(e),...Qi(e)];for(let r of t)this.createProperty(r,e[r])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let r=this._$Eu(e,t);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let r of t)e.unshift(Qe(r))}else i!==void 0&&e.push(Qe(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var i;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(i=this.constructor.l)==null||i.forEach(e=>e(this))}addController(i){var e;(this._$EO??(this._$EO=new Set)).add(i),this.renderRoot!==void 0&&this.isConnected&&((e=i.hostConnected)==null||e.call(i))}removeController(i){var e;(e=this._$EO)==null||e.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ot(i,this.constructor.elementStyles),i}connectedCallback(){var i;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(i=this._$EO)==null||i.forEach(e=>{var t;return(t=e.hostConnected)==null?void 0:t.call(e)})}enableUpdating(i){}disconnectedCallback(){var i;(i=this._$EO)==null||i.forEach(e=>{var t;return(t=e.hostDisconnected)==null?void 0:t.call(e)})}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){var n;let t=this.constructor.elementProperties.get(i),r=this.constructor._$Eu(i,t);if(r!==void 0&&t.reflect===!0){let a=(((n=t.converter)==null?void 0:n.toAttribute)!==void 0?t.converter:tt).toAttribute(e,t.type);this._$Em=i,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(i,e){var n,a;let t=this.constructor,r=t._$Eh.get(i);if(r!==void 0&&this._$Em!==r){let o=t.getPropertyOptions(r),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((n=o.converter)==null?void 0:n.fromAttribute)!==void 0?o.converter:tt;this._$Em=r;let c=l.fromAttribute(e,o.type);this[r]=c??((a=this._$Ej)==null?void 0:a.get(r))??c,this._$Em=null}}requestUpdate(i,e,t,r=!1,n){var a;if(i!==void 0){let o=this.constructor;if(r===!1&&(n=this[i]),t??(t=o.getPropertyOptions(i)),!((t.hasChanged??It)(n,e)||t.useDefault&&t.reflect&&n===((a=this._$Ej)==null?void 0:a.get(i))&&!this.hasAttribute(o._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:r,wrapped:n},a){t&&!(this._$Ej??(this._$Ej=new Map)).has(i)&&(this._$Ej.set(i,a??e??this[i]),n!==!0||a!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),r===!0&&this._$Em!==i&&(this._$Eq??(this._$Eq=new Set)).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[n,a]of this._$Ep)this[n]=a;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[n,a]of r){let{wrapped:o}=a,l=this[n];o!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,a,l)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),(t=this._$EO)==null||t.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(e)):this._$EM()}catch(r){throw i=!1,this._$EM(),r}i&&this._$AE(e)}willUpdate(i){}_$AE(i){var e;(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostUpdated)==null?void 0:r.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(i){}firstUpdated(i){}};j.elementStyles=[],j.shadowRootOptions={mode:"open"},j[be("elementProperties")]=new Map,j[be("finalized")]=new Map,et==null||et({ReactiveElement:j}),(K.reactiveElementVersions??(K.reactiveElementVersions=[])).push("2.1.2");var we=globalThis,Ft=s=>s,Ie=we.trustedTypes,Ht=Ie?Ie.createPolicy("lit-html",{createHTML:s=>s}):void 0,jt="$lit$",Y=`lit$${Math.random().toFixed(9).slice(2)}$`,Wt="?"+Y,ir=`<${Wt}>`,ee=document,xe=()=>ee.createComment(""),_e=s=>s===null||typeof s!="object"&&typeof s!="function",ct=Array.isArray,rr=s=>ct(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",it=`[ 	
\f\r]`,ye=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Nt=/-->/g,Ut=/>/g,Z=RegExp(`>|${it}(?:([^\\s"'>=/]+)(${it}*=${it}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bt=/'/g,Gt=/"/g,Vt=/^(?:script|style|textarea|title)$/i,dt=s=>(i,...e)=>({_$litType$:s,strings:i,values:e}),u=dt(1),_=dt(2),es=dt(3),te=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),qt=new WeakMap,Q=ee.createTreeWalker(ee,129);function Kt(s,i){if(!ct(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ht!==void 0?Ht.createHTML(i):i}var sr=(s,i)=>{let e=s.length-1,t=[],r,n=i===2?"<svg>":i===3?"<math>":"",a=ye;for(let o=0;o<e;o++){let l=s[o],c,h,d=-1,p=0;for(;p<l.length&&(a.lastIndex=p,h=a.exec(l),h!==null);)p=a.lastIndex,a===ye?h[1]==="!--"?a=Nt:h[1]!==void 0?a=Ut:h[2]!==void 0?(Vt.test(h[2])&&(r=RegExp("</"+h[2],"g")),a=Z):h[3]!==void 0&&(a=Z):a===Z?h[0]===">"?(a=r??ye,d=-1):h[1]===void 0?d=-2:(d=a.lastIndex-h[2].length,c=h[1],a=h[3]===void 0?Z:h[3]==='"'?Gt:Bt):a===Gt||a===Bt?a=Z:a===Nt||a===Ut?a=ye:(a=Z,r=void 0);let m=a===Z&&s[o+1].startsWith("/>")?" ":"";n+=a===ye?l+ir:d>=0?(t.push(c),l.slice(0,d)+jt+l.slice(d)+Y+m):l+Y+(d===-2?o:m)}return[Kt(s,n+(s[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},ke=class s{constructor({strings:i,_$litType$:e},t){let r;this.parts=[];let n=0,a=0,o=i.length-1,l=this.parts,[c,h]=sr(i,e);if(this.el=s.createElement(c,t),Q.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=Q.nextNode())!==null&&l.length<o;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(jt)){let p=h[a++],m=r.getAttribute(d).split(Y),f=/([.?@])?(.*)/.exec(p);l.push({type:1,index:n,name:f[2],strings:m,ctor:f[1]==="."?nt:f[1]==="?"?at:f[1]==="@"?ot:ae}),r.removeAttribute(d)}else d.startsWith(Y)&&(l.push({type:6,index:n}),r.removeAttribute(d));if(Vt.test(r.tagName)){let d=r.textContent.split(Y),p=d.length-1;if(p>0){r.textContent=Ie?Ie.emptyScript:"";for(let m=0;m<p;m++)r.append(d[m],xe()),Q.nextNode(),l.push({type:2,index:++n});r.append(d[p],xe())}}}else if(r.nodeType===8)if(r.data===Wt)l.push({type:2,index:n});else{let d=-1;for(;(d=r.data.indexOf(Y,d+1))!==-1;)l.push({type:7,index:n}),d+=Y.length-1}n++}}static createElement(i,e){let t=ee.createElement("template");return t.innerHTML=i,t}};function ne(s,i,e=s,t){var a,o;if(i===te)return i;let r=t!==void 0?(a=e._$Co)==null?void 0:a[t]:e._$Cl,n=_e(i)?void 0:i._$litDirective$;return(r==null?void 0:r.constructor)!==n&&((o=r==null?void 0:r._$AO)==null||o.call(r,!1),n===void 0?r=void 0:(r=new n(s),r._$AT(s,e,t)),t!==void 0?(e._$Co??(e._$Co=[]))[t]=r:e._$Cl=r),r!==void 0&&(i=ne(s,r._$AS(s,i.values),r,t)),i}var st=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,r=((i==null?void 0:i.creationScope)??ee).importNode(e,!0);Q.currentNode=r;let n=Q.nextNode(),a=0,o=0,l=t[0];for(;l!==void 0;){if(a===l.index){let c;l.type===2?c=new $e(n,n.nextSibling,this,i):l.type===1?c=new l.ctor(n,l.name,l.strings,this,i):l.type===6&&(c=new lt(n,this,i)),this._$AV.push(c),l=t[++o]}a!==(l==null?void 0:l.index)&&(n=Q.nextNode(),a++)}return Q.currentNode=ee,r}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},$e=class s{get _$AU(){var i;return((i=this._$AM)==null?void 0:i._$AU)??this._$Cv}constructor(i,e,t,r){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&(i==null?void 0:i.nodeType)===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=ne(this,i,e),_e(i)?i===g||i==null||i===""?(this._$AH!==g&&this._$AR(),this._$AH=g):i!==this._$AH&&i!==te&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):rr(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==g&&_e(this._$AH)?this._$AA.nextSibling.data=i:this.T(ee.createTextNode(i)),this._$AH=i}$(i){var n;let{values:e,_$litType$:t}=i,r=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=ke.createElement(Kt(t.h,t.h[0]),this.options)),t);if(((n=this._$AH)==null?void 0:n._$AD)===r)this._$AH.p(e);else{let a=new st(r,this),o=a.u(this.options);a.p(e),this.T(o),this._$AH=a}}_$AC(i){let e=qt.get(i.strings);return e===void 0&&qt.set(i.strings,e=new ke(i)),e}k(i){ct(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,r=0;for(let n of i)r===e.length?e.push(t=new s(this.O(xe()),this.O(xe()),this,this.options)):t=e[r],t._$AI(n),r++;r<e.length&&(this._$AR(t&&t._$AB.nextSibling,r),e.length=r)}_$AR(i=this._$AA.nextSibling,e){var t;for((t=this._$AP)==null?void 0:t.call(this,!1,!0,e);i!==this._$AB;){let r=Ft(i).nextSibling;Ft(i).remove(),i=r}}setConnected(i){var e;this._$AM===void 0&&(this._$Cv=i,(e=this._$AP)==null||e.call(this,i))}},ae=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,r,n){this.type=1,this._$AH=g,this._$AN=void 0,this.element=i,this.name=e,this._$AM=r,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=g}_$AI(i,e=this,t,r){let n=this.strings,a=!1;if(n===void 0)i=ne(this,i,e,0),a=!_e(i)||i!==this._$AH&&i!==te,a&&(this._$AH=i);else{let o=i,l,c;for(i=n[0],l=0;l<n.length-1;l++)c=ne(this,o[t+l],e,l),c===te&&(c=this._$AH[l]),a||(a=!_e(c)||c!==this._$AH[l]),c===g?i=g:i!==g&&(i+=(c??"")+n[l+1]),this._$AH[l]=c}a&&!r&&this.j(i)}j(i){i===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},nt=class extends ae{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===g?void 0:i}},at=class extends ae{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==g)}},ot=class extends ae{constructor(i,e,t,r,n){super(i,e,t,r,n),this.type=5}_$AI(i,e=this){if((i=ne(this,i,e,0)??g)===te)return;let t=this._$AH,r=i===g&&t!==g||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,n=i!==g&&(t===g||r);r&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,i):this._$AH.handleEvent(i)}},lt=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){ne(this,i)}};var rt=we.litHtmlPolyfillSupport;rt==null||rt(ke,$e),(we.litHtmlVersions??(we.litHtmlVersions=[])).push("3.3.3");var Yt=(s,i,e)=>{let t=(e==null?void 0:e.renderBefore)??i,r=t._$litPart$;if(r===void 0){let n=(e==null?void 0:e.renderBefore)??null;t._$litPart$=r=new $e(i.insertBefore(xe(),n),n,void 0,e??{})}return r._$AI(s),r};var ie=globalThis,N=class extends j{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let i=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=i.firstChild),i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Yt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var i;super.connectedCallback(),(i=this._$Do)==null||i.setConnected(!0)}disconnectedCallback(){var i;super.disconnectedCallback(),(i=this._$Do)==null||i.setConnected(!1)}render(){return te}},Xt;N._$litElement$=!0,N.finalized=!0,(Xt=ie.litElementHydrateSupport)==null||Xt.call(ie,{LitElement:N});var ht=ie.litElementPolyfillSupport;ht==null||ht({LitElement:N});(ie.litElementVersions??(ie.litElementVersions=[])).push("4.2.2");function F(s,i,e={}){s.dispatchEvent(new CustomEvent(i,{detail:e,bubbles:!0,composed:!0}))}function Jt(s){history.pushState(null,"",s),F(window,"location-changed",{replace:!1})}var R=s=>s.split(".")[0];function Fe(s,i){var r,n,a,o,l;let e=(r=s.entities)==null?void 0:r[i],t=(e==null?void 0:e.area_id)??(e!=null&&e.device_id?(a=(n=s.devices)==null?void 0:n[e.device_id])==null?void 0:a.area_id:void 0);return t?(l=(o=s.areas)==null?void 0:o[t])==null?void 0:l.name:void 0}function W(s,i){var e;return((e=s.states[i])==null?void 0:e.attributes.friendly_name)??i}var L=s=>!s||s.state==="unavailable"||s.state==="unknown";function O(s,i,e){let t=window;t.customCards??(t.customCards=[]),t.customCards.push({type:s,name:i,description:e,preview:!0})}var nr=s=>{var i;return s.media_class==="image"||!!((i=s.media_content_type)!=null&&i.startsWith("image/"))};function pt(s){let i=s.attributes;return typeof i.temperature=="number"?{mode:"single",value:i.temperature}:typeof i.target_temp_low=="number"&&typeof i.target_temp_high=="number"?{mode:"dual",low:i.target_temp_low,high:i.target_temp_high}:{mode:"none"}}function Zt(s,i,e,t){let r=Math.round(s/i)*i;return+Math.min(t,Math.max(e,r)).toFixed(i<1?1:0)}function Qt(s){let i=s.attributes;if(i.hvac_action==="cooling")return"high";if(i.hvac_action==="heating")return"low";let e=i.current_temperature;return typeof e=="number"&&typeof i.target_temp_low=="number"&&typeof i.target_temp_high=="number"&&Math.abs(e-i.target_temp_high)<Math.abs(e-i.target_temp_low)?"high":"low"}function ut(s,i){switch(s){case"media_player":return i==="playing";case"lock":return i!=="locked"&&i!=="unlocking";case"cover":return i==="open"||i==="opening";case"scene":return!1;default:return i==="on"}}function ei(s,i){switch(s){case"lock":return i==="locked"?["lock","unlock"]:["lock","lock"];case"scene":return["scene","turn_on"];case"script":return i==="on"?["script","turn_off"]:["script","turn_on"];case"cover":return["cover","toggle"];case"media_player":return i==="playing"||i==="paused"?["media_player","media_play_pause"]:null;case"light":case"switch":case"fan":case"input_boolean":return[s,"toggle"];default:return["homeassistant","toggle"]}}function ti(s,i,e){let t=i+e/60;return{h:(s%12+t/60)*30,m:t*6,s:e*6}}function mt(s,i=new Date){if(!s)return{h:i.getHours(),m:i.getMinutes(),s:i.getSeconds(),ms:i.getMilliseconds()};let e=new Intl.DateTimeFormat("en-GB",{timeZone:s,hour:"numeric",minute:"numeric",second:"numeric",hourCycle:"h23"}).formatToParts(i),t=r=>{var n;return+(((n=e.find(a=>a.type===r))==null?void 0:n.value)??0)};return{h:t("hour"),m:t("minute"),s:t("second"),ms:i.getMilliseconds()}}function ii(s,i,e,t){let r=e==="system"?void 0:i,n=e==="12"?!0:e==="24"?!1:void 0;return{time:new Intl.DateTimeFormat(r,{hour:"numeric",minute:"2-digit",hour12:n,timeZone:t}).formatToParts(s).filter(l=>l.type!=="dayPeriod").map(l=>l.value).join("").replace(/[\s\u202f]+/g," ").trim(),date:s.toLocaleDateString(r,{weekday:"long",month:"long",day:"numeric",timeZone:t})}}function re(s){return(Array.isArray(s)?s:[s]).filter(e=>typeof e=="string").map(e=>e.trim()).filter(Boolean)}async function ri(s,i,e){let t=new Set,r=re(i).map(o=>[o,0]),n=0,a;for(;r.length&&t.size<5e4;){let[o,l]=r.shift(),c;try{c=await s.callWS({type:"media_source/browse_media",media_content_id:o})}catch(h){if(l>0)throw h;a??(a=h);continue}l===0&&n++;for(let h of c.children??[])if(nr(h)?t.add(h.media_content_id):e&&h.can_expand&&l<3&&r.push([h.media_content_id,l+1]),t.size>=5e4)break}if(!n&&a)throw a;return[...t]}function G(s,i){let e,t=new Promise((r,n)=>{e=setTimeout(()=>n(new Error("Home Assistant did not answer")),i)});return Promise.race([s,t]).finally(()=>clearTimeout(e))}function si(s,i){let e={...s};for(let t of i)t in e&&!Array.isArray(e[t])&&(e[t]=re(e[t]));return e}function ni(s,i){let e={...s};for(let t of i){if(!(t in e))continue;let r=e[t];if(Array.isArray(r)&&r.some(a=>typeof a!="string"||!a.trim()))continue;let n=re(r);n.length?e[t]=n.length===1?n[0]:n:delete e[t]}return e}function ai(s,i,e){let t=Math.abs(s),r=Math.abs(i);if(t<10&&r<10)return e<600?"tap":null;let n=Math.max(t,r)/Math.max(e,1)>.5;return t>r*1.2&&(t>=60||n&&t>=25)?s<0?"left":"right":r>t*1.2&&(r>=90||n&&r>=30)?i<0?"up":"down":null}var He=class{constructor(i=100){this.list=[];this.pos=-1;this.max=i}peek(i){return this.list[this.pos+i]}step(i){let e=this.peek(i);return e!==void 0&&(this.pos+=i),e}push(i){this.list.splice(this.pos+1,1/0,i),this.list.length>this.max&&this.list.shift(),this.pos=this.list.length-1}drop(i){let e=this.list.indexOf(i);e<0||(this.list.splice(e,1),e<=this.pos&&this.pos--)}clear(){this.list=[],this.pos=-1}};function oi(s,i=Math.random){let e=s.slice();for(let t=e.length-1;t>0;t--){let r=Math.floor(i()*(t+1));[e[t],e[r]]=[e[r],e[t]]}return e}function li(s,i){switch(i.type){case"run-start":return s==="idle"?"listening":s;case"stt-vad-end":case"stt-end":case"intent-start":return"thinking";case"tts-start":case"tts-end":return"responding";case"error":return"error";default:return s}}function ar(s){return s==="NotAllowedError"||s==="SecurityError"?"Microphone access was denied":s==="NotFoundError"?"No microphone found":s==="stt-no-text-recognized"?"Didn't catch that":s==="pipeline-not-found"?"Assist pipeline not found":s==="timeout"?"Assist timed out":s.startsWith("wake")?"Wake word detection failed":s.startsWith("stt")?"Couldn't recognize speech":s.startsWith("intent")?"Couldn't handle the request":s.startsWith("tts")?"Couldn't speak the reply":"Something went wrong"}function ci(s){let i=s??{},e=typeof i.code=="string"?i.code:typeof i.name=="string"?i.name:"",t=typeof i.message=="string"&&i.message||e||String(s);return{text:ar(e),detail:t}}function di(s){switch(s){case"listening":return"listening";case"processing":return"thinking";case"responding":return"responding";case void 0:case"unavailable":return"error";default:return"idle"}}function hi(s,i){let e=s.attributes,t=s.state==="playing"||s.state==="paused";if(!t||!e.media_title)return{title:i,sub:t?X(s.state):"Not playing"};let r=e.media_artist||e.media_album_artist||e.app_name||"";return{title:String(e.media_title),sub:s.state==="paused"?r?`Paused \xB7 ${r}`:"Paused":String(r||i)}}var X=s=>s&&s[0].toUpperCase()+s.slice(1).replace(/_/g," "),or=1,lr=4;function pi(s){let i=s??0;return i&or?"daily":i&lr?"twice_daily":void 0}function ui(s){if(!(s!=null&&s.length))return{};let i=c=>typeof c=="number"&&isFinite(c)?c:void 0,e=s[0].is_daytime===void 0,t=e?s.slice(0,1):s.slice(0,2),r=t.map(c=>i(c.precipitation_probability)).filter(c=>c!==void 0),n=t.map(c=>i(c.precipitation)).filter(c=>c!==void 0),a={rain:r.length?Math.max(...r):void 0,amount:n.length?n.reduce((c,h)=>c+h,0):void 0};if(e)return{high:i(s[0].temperature),low:i(s[0].templow),...a};let o=t.find(c=>c.is_daytime),l=t.find(c=>!c.is_daytime);return{high:i(o==null?void 0:o.temperature),low:i((l==null?void 0:l.temperature)??(l==null?void 0:l.templow)),...a}}function mi(s,i){if(!(s!=null&&s.length)||i<1)return[];let e=r=>typeof r=="number"&&isFinite(r)?r:void 0;if(s[0].is_daytime===void 0)return s.slice(0,i).map(r=>({datetime:r.datetime,condition:r.condition,high:e(r.temperature),low:e(r.templow),rain:e(r.precipitation_probability)}));let t=new Map;for(let r of s){let n=U(r.datetime),a=isNaN(n.getTime())?r.datetime:`${n.getFullYear()}-${n.getMonth()}-${n.getDate()}`;t.set(a,[...t.get(a)??[],r])}return[...t.values()].slice(0,i).map(r=>{let n=r.find(l=>l.is_daytime),a=r.find(l=>!l.is_daytime),o=r.map(l=>e(l.precipitation_probability)).filter(l=>l!==void 0);return{datetime:(n??r[0]).datetime,condition:(n??r[0]).condition,high:e(n==null?void 0:n.temperature),low:e((a==null?void 0:a.temperature)??(a==null?void 0:a.templow)),rain:o.length?Math.max(...o):void 0}})}var ft={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"},cr={"clear-night":"Clear",partlycloudy:"Partly Cloudy","lightning-rainy":"Thunderstorms","snowy-rainy":"Sleet","windy-variant":"Windy",exceptional:"Alert",rainy:"Rain",snowy:"Snow"},fi=s=>cr[s]??X(s),dr=s=>s.start.length===10;function U(s){if(s.length===10){let[i,e,t]=s.split("-").map(Number);return new Date(i,e-1,t)}return new Date(s)}var Ne=s=>new Date(s.getFullYear(),s.getMonth(),s.getDate()),oe=s=>{var i;return((i=s.summary)==null?void 0:i.trim())||"Busy"};function Ue(s,i,e){return s.filter(t=>U(t.end)>i).sort((t,r)=>U(t.start).getTime()-U(r.start).getTime()||oe(t).localeCompare(oe(r))).slice(0,e)}function gi(s,i,e){let t=new Date(i.getFullYear(),i.getMonth(),i.getDate()+1),r=Ue(s,i,1/0);return{today:r.filter(n=>U(n.start)<t).length,events:r.slice(0,e)}}function gt(s,i){let e=U(s.start);return Math.round((Ne(e<i?i:e).getTime()-Ne(i).getTime())/864e5)}var vt=(s,i,e)=>new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(gt(s,i),"day");function Be(s,i,e){let t=U(s.start),r=Ne(t<i?i:t),n=r.getTime()===Ne(i).getTime(),a=r.toLocaleDateString(e,{weekday:"short"});return{label:n?"TODAY":a.toUpperCase(),day:r.getDate(),today:n,weekday:a,month:r.toLocaleDateString(e,{month:"short"}).toUpperCase(),key:`${r.getFullYear()}-${r.getMonth()}-${r.getDate()}`}}function Se(s,i){if(dr(s))return"All day";let e=t=>U(t).toLocaleTimeString(i,{hour:"numeric",minute:"2-digit"});return`${e(s.start)} \u2013 ${e(s.end)}`}function vi(s,i,e){return`${s}${s.includes("?")?"&":"?"}hv=${Math.floor(i/(e*1e3))}`}var bt=["cleaning","paused","returning"];function yt(s,i){let t={docked:"Docked",cleaning:"Cleaning",paused:"Paused",returning:"Returning to dock",idle:"Idle",error:"Error",unavailable:"Offline"}[s]??X(s);return i===void 0||s==="unavailable"?t:`${t} \xB7 ${Math.round(i)}%`}function bi(s){return s.map(i=>Number(i.split("_").pop())).filter(i=>Number.isInteger(i))}var hr=[{name:"",type:"expandable",flatten:!0,title:"Glass and wallpaper",schema:[{name:"wallpaper",label:"Wallpaper",helper:"Built-in champagne or teal, an image URL such as /local/wall.jpg, or 'view' to use the view background set in Home Assistant. A view background always wins.",selector:{select:{custom_value:!0,mode:"dropdown",options:[{value:"champagne",label:"Champagne (built-in)"},{value:"teal",label:"Teal (built-in)"},{value:"view",label:"View background"}]}}},{name:"glass",label:"Glass rendering",helper:"Auto pre-renders the refraction (fast, works everywhere). Live refracts in real time (Chromium only, GPU heavy). Frost is plain blur.",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (pre-rendered)"},{value:"live",label:"Live (Chromium)"},{value:"frost",label:"Frost"}]}}}]}],pr=s=>s.replace(/_/g," ").replace(/^./,i=>i.toUpperCase()),Ce=class extends N{constructor(){super(...arguments);this.fields=[]}setConfig(e){this._config=e}render(){return!this.hass||!this._config?g:u`<ha-form
      .hass=${this.hass}
      .data=${si(this._config,this.listNames())}
      .schema=${[...this.fields,...hr]}
      .computeLabel=${e=>e.label??pr(e.name)}
      .computeHelper=${e=>e.helper}
      @value-changed=${this.changed}
    ></ha-form>`}listNames(){return this.fields.filter(e=>e.list).map(e=>e.name)}changed(e){e.stopPropagation();let t=ni({...e.detail.value},this.listNames());for(let[r,n]of Object.entries(t))(n===""||n===void 0||n===null)&&delete t[r];F(this,"config-changed",{config:t})}};Ce.properties={hass:{attribute:!1},fields:{attribute:!1},_config:{state:!0}};function ur(s,i=3){return Math.round((Math.sqrt(12*s*s/i+1)-1)/2)}function yi(s,i,e=3){let t=ur(i,e);if(t<1)return s;let{width:r,height:n}=s,a=s.data,o=new Uint8ClampedArray(a.length),l=(c,h,d)=>{let p=d?r:n,m=d?n:r,f=d?4:r*4,k=2*t+1;for(let T=0;T<m;T++){let w=d?T*r*4:T*4;for(let A=0;A<4;A++){let x=0;for(let v=-t;v<=t;v++)x+=c[w+Math.min(p-1,Math.max(0,v))*f+A];for(let v=0;v<p;v++){h[w+v*f+A]=x/k;let b=Math.min(p-1,v+t+1),$=Math.max(0,v-t);x+=c[w+b*f+A]-c[w+$*f+A]}}}};for(let c=0;c<e;c++)l(a,o,!0),l(o,a,!1);return o=new Uint8ClampedArray(0),s}function wi(s,i,e,t,r){let n=new Uint8ClampedArray(t*r*4);for(let a=0;a<r;a++){let o=Math.min(s.height-1,Math.max(0,e+a));for(let l=0;l<t;l++){let c=Math.min(s.width-1,Math.max(0,i+l)),h=(o*s.width+c)*4,d=(a*t+l)*4;n[d]=s.data[h],n[d+1]=s.data[h+1],n[d+2]=s.data[h+2],n[d+3]=s.data[h+3]}}return{width:t,height:r,data:n}}function xi(s,i,e,t,r,n){let a=i.width,o=i.height,l=s.width,c=s.height,h=s.data,d=i.data,p=new Uint8ClampedArray(a*o*4),m=(r.scale+r.aberration)*n,f=r.scale*n,k=Math.max(0,r.scale-r.aberration)*n,T=1.25,w=1.03,A=(x,v,b)=>{x=Math.min(l-1.001,Math.max(0,x)),v=Math.min(c-1.001,Math.max(0,v));let $=x|0,M=v|0,P=x-$,B=v-M,I=(M*l+$)*4+b,H=I+l*4;return(h[I]*(1-P)+h[I+4]*P)*(1-B)+(h[H]*(1-P)+h[H+4]*P)*B};for(let x=0;x<o;x++)for(let v=0;v<a;v++){let b=(x*a+v)*4;if(!d[b+3])continue;let $=d[b]/255-.5,M=d[b+1]/255-.5,P=e+v+.5,B=t+x+.5,I=A(P+m*$,B+m*M,0),H=A(P+f*$,B+f*M,1),q=A(P+k*$,B+k*M,2),V=.2126*I+.7152*H+.0722*q;I=(V+(I-V)*T)*w,H=(V+(H-V)*T)*w,q=(V+(q-V)*T)*w;let ge=d[b+2]/255*r.specular;p[b]=I+(255-I)*ge,p[b+1]=H+(255-H)*ge,p[b+2]=q+(255-q)*ge,p[b+3]=255}return{width:a,height:o,data:p}}function _i(s){let i=n=>{let a=n/255;return a<=.03928?a/12.92:((a+.055)/1.055)**2.4},e=0,t=0,r=s.data;for(let n=0;n<r.length;n+=16)r[n+3]!==0&&(e+=.2126*i(r[n])+.7152*i(r[n+1])+.0722*i(r[n+2]),t++);return t?e/t:0}function ki(s,i=.07,e=.1,t=.5){let r=.30000000000000004;return s<=r?e:Math.min(t,Math.max(e,(s-r)/(s-i)))}var mr=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
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
</svg>`;function fr(){let s="";for(let e=0,t=120;t<1100;e++,t+=105)s+=`<path d="M-100 ${t} L520 ${t+330} L1100 ${t-40} L1100 ${t+15} L520 ${t+385} L-100 ${t+55}Z" fill="url(#band-${e%2?"b":"a"})" opacity="${e%2?".9":".75"}"/>`;let i="";for(let e=0;e<16;e++)i+=`<path d="M0 0 C 70 -60 200 -55 250 -8 C 180 -20 80 -10 0 0Z" transform="rotate(${e*22.5})" fill="${e%2?"url(#blade)":"#1d6158"}"/>`;return`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a7a6f"/><stop offset="1" stop-color="#123f3a"/></linearGradient>
<linearGradient id="band-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fae9f"/><stop offset="1" stop-color="#2a7d71"/></linearGradient>
<linearGradient id="band-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c5f56"/><stop offset="1" stop-color="#124a43"/></linearGradient>
<linearGradient id="blade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5dbcad"/><stop offset="1" stop-color="#2b8073"/></linearGradient>
<pattern id="stripe" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="16" height="16" fill="#1a5a52"/><rect width="7" height="16" fill="#2f8578"/></pattern>
</defs>
<rect width="1000" height="1000" fill="url(#bg)"/>
<g>${s}</g>
<g transform="translate(150 230)">${i}<circle r="26" fill="#64c2b3"/></g>
<g transform="translate(720 690) rotate(45)"><rect x="-150" y="-150" width="300" height="300" fill="url(#stripe)"/><rect x="-150" y="-150" width="300" height="300" fill="none" stroke="#6cc6b7" stroke-width="6" opacity=".6"/></g>
<g transform="translate(860 300) rotate(45)"><rect x="-90" y="-90" width="180" height="180" fill="#3a9586"/><rect x="-90" y="-90" width="180" height="90" fill="#50ab9c"/></g>
</svg>`}var gr={champagne:{svg:mr,base:"#928980",glass:"84 74 64"},teal:{svg:fr(),base:"#174c46",glass:"255 255 255"}},vr=s=>s==="champagne"||s==="teal";function $i(s){if(vr(s)){let i=gr[s];return`${i.base} center / cover no-repeat url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(i.svg)}")`}return`center / cover no-repeat url("${s.replace(/"/g,"%22")}")`}var Si=new WeakMap,Mi=/^(ha-dialog|ha-md-dialog|hui-dialog-|ha-more-info)/;function le(s){for(let i=s;i;i=i instanceof ShadowRoot?i.host:i.parentNode)if(i instanceof HTMLElement&&Mi.test(i.localName))return!0;return!1}function Ei(s){let i=s;for(;i;){if(i instanceof ShadowRoot||i instanceof Document){let e=i.querySelector("hui-view-background");if(e)return e}if(i instanceof HTMLElement&&Mi.test(i.localName))return null;i=i instanceof ShadowRoot?i.host:i.parentNode}return null}function Ti(s){let i=Si.get(s);return i||(i=new wt(s),Si.set(s,i)),i}var Ci=()=>Math.min(window.devicePixelRatio||1,2),br=150;function yr(s){let i=/url\((['"]?)(.*?)\1\)/.exec(s);return i?i[2]:null}function wr(s,i,e,t,r,n){let a=e,o=t,l=r.trim().split(/\s+/);if(l[0]==="cover"||l[0]==="contain"){let d=l[0]==="cover"?Math.max(s/e,i/t):Math.min(s/e,i/t);a=e*d,o=t*d}else if(l[0]!=="auto"||l[1]&&l[1]!=="auto"){let d=(f,k)=>f==="auto"||f===void 0?null:f.endsWith("%")?parseFloat(f)/100*k:parseFloat(f),p=d(l[0],s),m=d(l[1]??"auto",i);p!==null&&m!==null?(a=p,o=m):p!==null?(a=p,o=t*p/e):m!==null&&(o=m,a=e*m/t)}let c=n.trim().split(/\s+/),h=(d,p)=>d?d.endsWith("%")?parseFloat(d)/100*p||0:d==="left"||d==="top"?0:d==="right"||d==="bottom"?p:d==="center"?p/2:parseFloat(d)||0:p/2;return{x:h(c[0],s-a),y:h(c[1]??"50%",i-o),w:a,h:o}}var wt=class{constructor(i){this.snapshot=null;this.failure=null;this.listeners=new Set;this.key="";this.version=0;this.pending=null;this.recheck=!1;this.timer=0;this.settle=0;this.overrides=new Map;this.el=i}subscribe(i){return this.listeners.add(i),this.listeners.size===1?this.start():this.snapshot&&queueMicrotask(i),()=>{this.listeners.delete(i),this.listeners.size||this.stop()}}setWallpaper(i,e,t=!0){e?this.overrides.set(i,{value:e,explicit:t}):this.overrides.delete(i);let r=this.el.parentElement??this.el.getRootNode().host;if(!r)return;let n=[...this.overrides.values()],a=n.find(o=>o.explicit)??n[0];a?r.style.setProperty("--lovelace-background",$i(a.value)):r.style.removeProperty("--lovelace-background"),this.check()}check(){if(this.pending){this.recheck=!0;return}let i=getComputedStyle(this.el),e=this.el.getBoundingClientRect();if(e.width<1||e.height<1)return;let t=[i.backgroundImage,i.backgroundSize,i.backgroundPosition,i.backgroundColor,i.opacity,Math.round(e.width),Math.round(e.height),Ci()].join("|");t!==this.key&&(this.key=t,clearTimeout(this.settle),this.settle=window.setTimeout(()=>{let r=this.el.getBoundingClientRect();this.pending=this.raster(getComputedStyle(this.el),r).finally(()=>{this.pending=null,this.recheck&&(this.recheck=!1,this.check())})},br))}origin(){let i=this.el.getBoundingClientRect();return{x:i.x,y:i.y}}start(){this.ro=new ResizeObserver(()=>this.check()),this.ro.observe(this.el),this.mo=new MutationObserver(()=>this.check()),this.mo.observe(this.el,{attributes:!0,attributeFilter:["style","class","fixed-background"]}),this.el.parentElement&&this.mo.observe(this.el.parentElement,{attributes:!0,attributeFilter:["style"]}),this.timer=window.setInterval(()=>this.check(),2e3),this.check()}stop(){var i,e;clearTimeout(this.settle),(i=this.ro)==null||i.disconnect(),(e=this.mo)==null||e.disconnect(),clearInterval(this.timer),this.key=""}async raster(i,e){let t=Ci(),r=Math.max(1,Math.round(e.width*t)),n=Math.max(1,Math.round(e.height*t));try{let a=document.createElement("canvas");a.width=r,a.height=n;let o=a.getContext("2d",{willReadFrequently:!0});if(!o)throw new Error("no 2d context");let l=getComputedStyle(document.documentElement).backgroundColor;o.fillStyle=l&&l!=="rgba(0, 0, 0, 0)"?l:"#111",o.fillRect(0,0,r,n),o.globalAlpha=parseFloat(i.opacity)||1,o.fillStyle=i.backgroundColor,o.fillRect(0,0,r,n);let c=i.backgroundImage;if(c&&c!=="none"){let d=yr(c);if(!d||/gradient\(/.test(c.replace(/url\(.*?\)/g,"")))throw new Error("background is not a plain image");let p=await xr(d),m=wr(e.width,e.height,p.naturalWidth||e.width,p.naturalHeight||e.height,i.backgroundSize,i.backgroundPosition);o.drawImage(p,m.x*t,m.y*t,m.w*t,m.h*t)}let h=o.getImageData(0,0,r,n);this.failure=null,this.snapshot={pixels:{width:r,height:n,data:h.data},x:e.x,y:e.y,k:t,version:++this.version}}catch(a){this.failure=a instanceof Error?a.message:String(a),this.snapshot=null}this.listeners.forEach(a=>a())}};function xr(s){return new Promise((i,e)=>{let t=new Image,r=new URL(s,location.href);r.origin!==location.origin&&r.protocol.startsWith("http")&&(t.crossOrigin="anonymous"),t.onload=()=>i(t),t.onerror=()=>e(new Error(`cannot load background ${s.slice(0,80)}`)),t.src=s})}function _r(s,i,e,t,r){let n=Math.abs(s)-e+r,a=Math.abs(i)-t+r;return Math.min(Math.max(n,a),0)+Math.hypot(Math.max(n,0),Math.max(a,0))-r}function kr(s){let i=1-Math.min(1,Math.max(0,s)),e=(1-i**4)**.75;if(e<1e-6)return 0;let t=Math.atan(Math.min(i**3/e,8)),r=Math.sin(t)/1.5;return r>=1?Math.sin(t):Math.sin(t-Math.asin(r))}function Ai(s,i,e,t,r){let n=Math.max(1,Math.round(s*r)),a=Math.max(1,Math.round(i*r)),o=n/2,l=a/2,c=Math.min(e*r,o,l),h=Math.max(1,t*r),d=Math.ceil(h),p=new Float32Array(d+1);for(let v=1;v<=d;v++)p[v]=p[v-1]+kr(v/d);let m=v=>{if(v<=0)return 0;if(v>=d)return p[d];let b=Math.floor(v),$=v-b;return p[b]*(1-$)+p[b+1]*$},f=new Float32Array(n*a),k=new Float32Array(n*a);for(let v=0;v<a;v++)for(let b=0;b<n;b++){let $=_r(b-o+.5,v-l+.5,o,l,c);k[v*n+b]=$,f[v*n+b]=$>0?0:m(Math.min(h,-$))}let T=1.35,w=-.54,A=-.84,x=new Uint8ClampedArray(n*a*4);for(let v=0;v<a;v++)for(let b=0;b<n;b++){let $=v*n+b,M=$<<2,P=k[$];if(P>0){x[M]=x[M+1]=x[M+2]=128,x[M+3]=0;continue}if(P<-h-2){x[M]=x[M+1]=128,x[M+2]=0,x[M+3]=255;continue}let B=Math.max(0,b-1),I=Math.min(n-1,b+1),H=Math.max(0,v-1),q=Math.min(a-1,v+1),V=Math.max(-1,Math.min(1,(f[v*n+I]-f[v*n+B])/(I-B||1)*T)),ge=Math.max(-1,Math.min(1,(f[q*n+b]-f[H*n+b])/(q-H||1)*T)),Mt=0;if(P>=-h){let Et=k[v*n+I]-k[v*n+B],Tt=k[q*n+b]-k[H*n+b],At=Math.hypot(Et,Tt)||1,Rt=Et/At*w+Tt/At*A,Ki=(1-Math.min(1,-P/h))**1.6;Mt=(Math.max(0,Rt)+Math.max(0,-Rt)*.35)*Ki}x[M]=128+V*127,x[M+1]=128+ge*127,x[M+2]=Math.round(Mt*255),x[M+3]=255}return{width:n,height:a,data:x}}function Ri(s,i,e={}){return{radius:i,bevel:Math.max(4,Math.round(s*(e.bevel??.13))),scale:Math.round(s*(e.refraction??.3)),aberration:Math.max(1,Math.round(s*(e.aberration??.02))),frost:+(s*(e.frost??.007)).toFixed(2),specular:.55}}function Pi(){let s=navigator.userAgent;return!(/Safari/.test(s)&&!/Chrome|Chromium|Edg|OPR/.test(s))&&(CSS.supports("backdrop-filter","url(#x)")||CSS.supports("-webkit-backdrop-filter","url(#x)"))}function Li(s,i,e,t,r){let n=Math.ceil(r.scale+r.aberration+4),a=n/e*100,o=n/t*100,l=(c,h)=>`<feDisplacementMap in="SourceGraphic" in2="map" scale="${c}" xChannelSelector="R" yChannelSelector="G" result="${h}"/>`;return`<filter id="${s}" color-interpolation-filters="sRGB" x="-${a}%" y="-${o}%" width="${100+2*a}%" height="${100+2*o}%">
  <feImage href="${i}" x="0" y="0" width="${e}" height="${t}" preserveAspectRatio="none" result="map"/>
  ${l(r.scale+r.aberration,"dR")}<feColorMatrix in="dR" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
  ${l(r.scale,"dG")}<feColorMatrix in="dG" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>
  ${l(Math.max(0,r.scale-r.aberration),"dB")}<feColorMatrix in="dB" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>
  <feBlend in="r" in2="g" mode="screen" result="rg"/><feBlend in="rg" in2="b" mode="screen" result="rgb"/>
  <feGaussianBlur in="rgb" stdDeviation="${r.frost}" result="frosted"/>
  <feColorMatrix in="map" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 ${r.specular} 0 0" result="spec"/>
  <feComposite in="spec" in2="frosted" operator="over"/>
</filter>`}var xt=window.homeview??(window.homeview={timings:[]}),Me=new Map;function Oi(s,i,e,t){let r=[s,i,e.radius.toFixed(1),e.bevel,t].join("|"),n=Me.get(r);return n||(n=Ai(s,i,e.radius,e.bevel,t),Me.size>24&&Me.delete(Me.keys().next().value),Me.set(r,n)),n}var Ee=new Set,_t=!1;function zi(){_t||(_t=!0,requestAnimationFrame(()=>{_t=!1;let s=performance.now();for(let i of Ee)if(Ee.delete(i),i.bakeNow(),performance.now()-s>12)break;Ee.size&&zi()}))}var $r=()=>matchMedia("(prefers-reduced-transparency: reduce)").matches,Ge=class{constructor(i,e="rect"){this.mode="frost";this.opts={};this.shape="rect";this.backdrop=null;this.poll=0;this.lastKey="";this.onScroll=()=>this.request();this.host=i,this.shape=e,i.addController(this)}setOptions(i){let e=JSON.stringify(i)!==JSON.stringify(this.opts);this.opts={...i},e&&this.host.isConnected&&this.attach()}hostConnected(){requestAnimationFrame(()=>this.attach()),window.addEventListener("scroll",this.onScroll,{capture:!0,passive:!0}),window.addEventListener("resize",this.onScroll,{passive:!0}),this.poll=window.setInterval(()=>this.request(),700)}hostDisconnected(){var i;this.detach(),window.removeEventListener("scroll",this.onScroll,{capture:!0}),window.removeEventListener("resize",this.onScroll),clearInterval(this.poll),(i=this.ro)==null||i.disconnect(),this.ro=void 0,Ee.delete(this)}hostUpdated(){let i=this.card();i&&!this.ro&&(this.ro=new ResizeObserver(()=>this.request()),this.ro.observe(i)),this.request()}card(){return this.host.renderRoot.querySelector(".hv-glass")}canvas(){return this.host.renderRoot.querySelector("canvas.hv-bake")}detach(){var i,e;(i=this.unsub)==null||i.call(this),this.unsub=void 0,(e=this.backdrop)==null||e.setWallpaper(this,void 0),this.backdrop=null}attach(){if(!this.host.isConnected)return;this.detach();let i=Ei(this.host);this.backdrop=i?Ti(i):null;let e=this.opts.wallpaper??"champagne";this.backdrop&&e!=="view"&&e!=="none"&&this.backdrop.setWallpaper(this,e,this.opts.wallpaper!==void 0),this.backdrop&&(this.unsub=this.backdrop.subscribe(()=>this.request(!0))),this.lastKey="",this.request(!0)}request(i=!1){i&&(this.lastKey=""),!(!this.host.isConnected||!this.card())&&this.key()!==this.lastKey&&(Ee.add(this),zi())}geometry(){let i=this.card();if(!i)return null;let e=i.offsetWidth,t=i.offsetHeight;if(e<8||t<8)return null;let r=i.getBoundingClientRect();return{x:r.x+r.width/2-e/2,y:r.y+r.height/2-t/2,w:e,h:t}}key(){var t,r,n;let i=this.geometry();if(!i)return"none";let e=((t=this.backdrop)==null?void 0:t.origin())??{x:0,y:0};return[Math.round(i.x-e.x),Math.round(i.y-e.y),i.w,i.h,((n=(r=this.backdrop)==null?void 0:r.snapshot)==null?void 0:n.version)??-1,this.mode,JSON.stringify(this.opts)].join("|")}params(i,e){let t=this.card(),r=Math.max(110,Math.min(260,Math.min(i,e))),n=this.shape==="circle"?Math.min(i,e)/2:parseFloat(getComputedStyle(t).borderTopLeftRadius)||0;return Ri(r,n,this.opts)}resolveMode(){var e;let i=this.opts.glass??"auto";return $r()||i==="frost"?"frost":i==="live"?Pi()?"live":"frost":(e=this.backdrop)!=null&&e.snapshot?"baked":"frost"}bakeNow(){let i=this.card(),e=this.canvas(),t=this.geometry();if(!i||!e||!t||!i.style.getPropertyValue("--hv-radius"))return;if(this.mode=this.resolveMode(),this.lastKey=this.key(),i.dataset.glass=this.mode,this.mode!=="live"&&i.style.removeProperty("backdrop-filter"),this.mode==="frost"){i.style.setProperty("--hv-tint-rgb","84 74 64"),i.style.setProperty("--hv-tint-a",".28");return}let r=this.params(t.w,t.h);if(this.mode==="live"){this.applyLive(i,t.w,t.h,r);return}let n=performance.now(),a=this.backdrop.snapshot,o=a.k,l=this.backdrop.origin(),c=Oi(t.w,t.h,r,o),h=r.frost*o,d=Math.ceil((r.scale+r.aberration)*o+h*3+2),p=Math.round((t.x-l.x)*o)-d,m=Math.round((t.y-l.y)*o)-d,f=yi(wi(a.pixels,p,m,c.width+2*d,c.height+2*d),h),k=xi(f,c,d,d,r,o);e.width=k.width,e.height=k.height,e.getContext("2d").putImageData(new ImageData(k.data,k.width,k.height),0,0);let T=_i(k);T<.18?(i.style.setProperty("--hv-tint-rgb","255 255 255"),i.style.setProperty("--hv-tint-a",".13")):(i.style.setProperty("--hv-tint-rgb","84 74 64"),i.style.setProperty("--hv-tint-a",String(Math.max(.13,ki(T)).toFixed(3)))),xt.timings.push({card:this.host.localName,w:t.w,h:t.h,ms:Math.round(performance.now()-n)}),xt.timings.length>200&&xt.timings.splice(0,100)}applyLive(i,e,t,r){let n=Math.min(window.devicePixelRatio||1,2),a=Oi(e,t,r,n),o=document.createElement("canvas");o.width=a.width,o.height=a.height,o.getContext("2d").putImageData(new ImageData(a.data,a.width,a.height),0,0);let l=o.toDataURL("image/png"),c=`hv-${Math.random().toString(36).slice(2,9)}`,d=this.host.renderRoot.querySelector("svg.hv-filters");d||(d=document.createElementNS("http://www.w3.org/2000/svg","svg"),d.setAttribute("class","hv-filters"),d.setAttribute("aria-hidden","true"),d.setAttribute("style","position:absolute;width:0;height:0;overflow:hidden"),this.host.renderRoot.appendChild(d)),d.innerHTML=Li(c,l,e,t,r);let p=`url(#${c}) saturate(1.25) brightness(1.03)`;i.style.setProperty("backdrop-filter",p),i.style.setProperty("-webkit-backdrop-filter",p),i.style.setProperty("--hv-tint-rgb","255 255 255"),i.style.setProperty("--hv-tint-a",".13")}};var z=S`
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
`,C=class extends N{constructor(i="rect"){super(),this.glass=new Ge(this,i)}static getConfigElement(){let i=document.createElement("homeview-card-editor");return i.fields=this.editorFields,i}setConfig(i){if(!i)throw new Error("Invalid configuration");this.validate(i),this._config=i,this.glass.setOptions({glass:i.glass,wallpaper:i.wallpaper,bevel:i.bevel,refraction:i.refraction,aberration:i.aberration,frost:i.frost})}validate(i){}getCardSize(){return 3}get square(){var i,e;return typeof((e=(i=this._config)==null?void 0:i.grid_options)==null?void 0:e.rows)!="number"}refFrom(i,e){return Math.min(i,e)}get onScreen(){return this.getClientRects().length>0}resume(){}cardClass(){return""}get bare(){return!1}render(){return this._config?this.bare?u`<ha-card class="hv-bare ${this.cardClass()}"><div class="hv-content">${this.renderContent()}</div></ha-card>`:u`<ha-card class="hv-glass ${this.square?"square":""} ${this.cardClass()}">
      <canvas class="hv-bake" aria-hidden="true"></canvas>
      <div class="hv-tint"></div>
      <div class="hv-content">${this.renderContent()}</div>
    </ha-card>`:u``}firstUpdated(i){this.observeCard()}updated(i){super.updated(i),this.sizer&&this.renderRoot.querySelector("ha-card")!==this.sized&&this.observeCard()}observeCard(){var e;let i=this.renderRoot.querySelector("ha-card");(e=this.sizer)==null||e.disconnect(),this.sized=i??void 0,i&&(this.sizer=new ResizeObserver(()=>{let t=this.refFrom(i.offsetWidth,i.offsetHeight);i.style.setProperty("--hv-ref",`${t}px`),i.style.setProperty("--hv-radius",`${Math.round(Math.max(14,Math.min(34,t*.125)))}px`),i.toggleAttribute("data-wide",i.offsetWidth>i.offsetHeight*1.5),i.toggleAttribute("data-short",i.offsetHeight<240),this.glass.request(!0),i.offsetWidth&&this.resume()}),this.sizer.observe(i))}disconnectedCallback(){var i;super.disconnectedCallback(),(i=this.sizer)==null||i.disconnect(),this.sizer=void 0}connectedCallback(){super.connectedCallback(),this.hasUpdated&&!this.sizer&&this.observeCard()}};C.properties={hass:{attribute:!1},_config:{state:!0}},C.editorFields=[];var E=s=>_`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${s}</svg>`,y={sun:E(_`<circle cx="12" cy="12" r="4.3"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2.2v2.4M12 19.4v2.4M2.2 12h2.4M19.4 12h2.4M5.1 5.1l1.7 1.7M17.2 17.2l1.7 1.7M5.1 18.9l1.7-1.7M17.2 6.8l1.7-1.7"/></g>`),moon:E(_`<path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8a8.6 8.6 0 1 0 10.8 10.8z"/><path d="M17 3.2l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6zM20.6 7.6l.4.9.9.4-.9.4-.4.9-.4-.9-.9-.4.9-.4z"/>`),padlock:_`<svg class="padlock" viewBox="0 0 24 24" fill="currentColor" overflow="visible" aria-hidden="true"><g class="pl"><path class="sh-open" d="M16.55 12V7a4.4 4.4 0 0 1 8.8 0v2.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path class="sh-closed" d="M7.75 12V7a4.4 4.4 0 0 1 8.8 0v5" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="5" y="11" width="14" height="11.25" rx="2.4"/></g></svg>`,light:E(_`<rect x="11.1" y="1.5" width="1.8" height="5" rx=".9"/><rect x="8.6" y="1.2" width="6.8" height="1.9" rx=".95"/><path d="M12 6.2c-4.1 0-7.6 3.2-8 7.3-.05.5.35.9.85.9h14.3c.5 0 .9-.4.85-.9-.4-4.1-3.9-7.3-8-7.3z"/><path d="M8.6 15.6h6.8a3.4 3.4 0 0 1-6.8 0z"/>`),fan:E(_`<circle cx="12" cy="10" r="8.2" fill="none" stroke="currentColor" stroke-width="1.6"/><g class="blades"><path d="M12 10c-.4-2.6.2-5 1.9-5.6 1.6-.5 2.6 1.4 1.4 3.1-.8 1.2-2 1.9-3.3 2.5z"/><path d="M12 10c2.4 1 4.2 2.8 3.8 4.5-.4 1.6-2.6 1.5-3.4-.4-.6-1.3-.6-2.7-.4-4.1z"/><path d="M12 10c-2 1.6-4.4 2.3-5.6 1.1-1.2-1.2.1-3 2.1-2.8 1.4.1 2.5.9 3.5 1.7z"/></g><circle cx="12" cy="10" r="1.3"/><path d="M10.6 18.1h2.8l.9 3.4H9.7z"/><rect x="7.5" y="21" width="9" height="1.8" rx=".9"/>`),curtains:E(_`<rect x="2" y="2.5" width="20" height="1.8" rx=".9"/><path d="M4 4.3h6.5c-.3 4.6-1.4 9.8-3.5 16.9H4z"/><path d="M20 4.3h-6.5c.3 4.6 1.4 9.8 3.5 16.9H20z"/>`),curtainsOpen:E(_`<rect x="2" y="2.5" width="20" height="1.8" rx=".9"/><path d="M4 4.3h3.2c-.2 4.6-.6 9.8-1.4 16.9H4z"/><path d="M20 4.3h-3.2c.2 4.6.6 9.8 1.4 16.9H20z"/>`),garage:E(_`<path d="M2 9.6 12 3l10 6.6V21a1 1 0 0 1-1 1h-1.6V11.4H4.6V22H3a1 1 0 0 1-1-1z"/><rect x="6.2" y="13" width="11.6" height="2" rx=".5"/><rect x="6.2" y="16.2" width="11.6" height="2" rx=".5"/><rect x="6.2" y="19.4" width="11.6" height="2" rx=".5"/>`),garageOpen:E(_`<path d="M2 9.6 12 3l10 6.6V21a1 1 0 0 1-1 1h-1.6V11.4H4.6V22H3a1 1 0 0 1-1-1z"/><rect x="6.2" y="13" width="11.6" height="2" rx=".5"/>`),power:E(_`<path d="M12 2.5v8.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M7.1 5.4a8 8 0 1 0 9.8 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`),play:E(_`<path d="M8 4.7v14.6c0 .9 1 1.4 1.7.9l11-7.3c.7-.4.7-1.4 0-1.8l-11-7.3C9 3.3 8 3.8 8 4.7z"/><path d="M3.5 6.5l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z"/>`),dot:E(_`<circle cx="12" cy="12" r="6"/>`),music:E(_`<path d="M20 2.6v12.9a3.4 3.4 0 1 1-1.9-3.06V7.1L9.6 8.9v8.6a3.4 3.4 0 1 1-1.9-3.06V5.6c0-.6.4-1.1 1-1.2l10.1-2.4c.6-.15 1.2.3 1.2.6z"/>`),start:E(_`<path d="M7 4.7v14.6c0 .9 1 1.4 1.7.9l11-7.3c.7-.4.7-1.4 0-1.8l-11-7.3C8 3.3 7 3.8 7 4.7z"/>`),home:E(_`<path d="M3 11.2 12 3.5l9 7.7V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>`),locate:E(_`<circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),pause:E(_`<rect x="6" y="4.5" width="4.2" height="15" rx="1.4"/><rect x="13.8" y="4.5" width="4.2" height="15" rx="1.4"/>`),vacuum:E(_`<path fill-rule="evenodd" d="M12 2.4a9.6 9.6 0 1 1 0 19.2 9.6 9.6 0 0 1 0-19.2zM4.2 9.16a8.3 8.3 0 0 1 15.6 0l-1.13.41a7.1 7.1 0 0 0-13.34 0zM12 5.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8zm0 1.1a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6z"/>`),calendar:E(_`<rect x="3" y="4.5" width="18" height="16.5" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 9.5h18" stroke="currentColor" stroke-width="1.8"/><path d="M8 2.5v4M16 2.5v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><rect x="6.5" y="12.5" width="3" height="2.6" rx=".6"/><rect x="10.5" y="12.5" width="3" height="2.6" rx=".6"/><rect x="14.5" y="12.5" width="3" height="2.6" rx=".6"/><rect x="6.5" y="16.3" width="3" height="2.6" rx=".6"/><rect x="10.5" y="16.3" width="3" height="2.6" rx=".6"/>`),camera:E(_`<rect x="2" y="6" width="14.5" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M16.5 10.4 22 7.2v9.6l-5.5-3.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`),drop:E(_`<path d="M12 3c-.2 0-.4.1-.5.3C9.6 6 6.5 10.3 6.5 14a5.5 5.5 0 0 0 11 0c0-3.7-3.1-8-5-10.7-.1-.2-.3-.3-.5-.3z" fill="none" stroke="currentColor" stroke-width="1.8"/>`),chevronUp:_`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 15l7-7 7 7"/></svg>`,chevronDown:_`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>`,mic:E(_`<rect x="8.5" y="2" width="7" height="12.5" rx="3.5"/><path d="M5 11a7 7 0 0 0 14 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 18v3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),keyboard:E(_`<rect x="2" y="5.5" width="20" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6 9.5h1.6M9.2 9.5h1.6M12.4 9.5h1.6M15.6 9.5h1.6M6 12.5h1.6M15.6 12.5h1.6M9.2 12.5h4.8M7.5 15.5h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`),retry:E(_`<path d="M19 12a7 7 0 1 1-2.05-4.95" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M20 3.6v6h-6z"/>`),stop:E(_`<rect x="6" y="6" width="12" height="12" rx="2.5"/>`),close:_`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,send:E(_`<path d="M3.4 11.2 19.6 4.1c.8-.3 1.6.5 1.3 1.3l-7.1 16.2c-.3.8-1.5.7-1.7-.1l-1.6-6.2-6.2-1.6c-.8-.2-.9-1.4-.1-1.7z"/>`)};function Di(s,i,e){switch(s){case"light":return y.light;case"lock":return y.padlock;case"fan":return y.fan;case"cover":return i==="garage"||i==="gate"?e?y.garageOpen:y.garage:e?y.curtainsOpen:y.curtains;case"scene":return y.sun;case"script":return y.play;case"switch":case"input_boolean":return y.power;case"media_player":return e?y.pause:y.music;case"vacuum":return y.vacuum;default:return y.dot}}var Sr={easing:"cubic-bezier(.34,1.56,.64,1)",duration:520};function Cr(s,i,e,t=1){let r=Math.sqrt(i/t),n=e/(2*Math.sqrt(i*t));if(n>=1)return 1-Math.exp(-r*s)*(1+r*s);let a=r*Math.sqrt(1-n*n);return 1-Math.exp(-n*r*s)*(Math.cos(a*s)+n*r/a*Math.sin(a*s))}function Mr(s=210,i=17,e=1,t=48){let r=o=>Cr(o,s,i,e),n=0;for(;n<4&&!(Math.abs(1-r(n))<.002&&Math.abs(1-r(n+.05))<.002);)n+=.01;let a=Array.from({length:t+1},(o,l)=>+r(l/t*n).toFixed(4));return a[t]=1,{easing:`linear(${a.join(",")})`,duration:Math.round(n*1e3)}}var qe;function Ii(){if(qe)return qe;let s=Mr();return qe=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("transition-timing-function","linear(0, 1)")?s:Sr,qe}var Er=800,ce=class extends C{constructor(){super(...arguments);this.sendTimer=0;this.lastDir=0}static getStubConfig(e){return{entity:Object.keys(e.states).find(t=>t.startsWith("climate."))??""}}validate(e){if(!e.entity||!e.entity.startsWith("climate."))throw new Error("Pick a climate entity")}getGridOptions(){return{columns:8,rows:"auto",min_columns:6,min_rows:4}}getCardSize(){return 6}refFrom(e,t){return Math.min(e,t)/2}get stateObj(){var e;return(e=this.hass)==null?void 0:e.states[this._config.entity]}get step(){var e,t,r;return((e=this._config)==null?void 0:e.step)??((t=this.stateObj)==null?void 0:t.attributes.target_temp_step)??(((r=this.hass)==null?void 0:r.config.unit_system.temperature)==="\xB0C"?.5:1)}current(){let e=this.stateObj;if(!e)return{mode:"none"};let t=pt(e),r=this._pending;return r&&Date.now()-r.at<6e3?{...t,...Object.fromEntries(Object.entries(r).filter(([n,a])=>n!=="at"&&a!==void 0))}:t}activeSide(){return this.current().mode!=="dual"?"single":this._side??Qt(this.stateObj)}willUpdate(e){if(e.has("hass")&&this._pending&&this.stateObj&&!this.sendTimer){let t=pt(this.stateObj),r=this._pending;((r.value===void 0||r.value===t.value)&&(r.low===void 0||r.low===t.low)&&(r.high===void 0||r.high===t.high)||Date.now()-r.at>6e3)&&(this._pending=void 0)}}shown(){let e=this.current(),t=this.activeSide();return t==="single"?e.value:t==="low"?e.low:e.high}stepBy(e){let t=this.stateObj;if(!t)return;let r=this.current(),n=this.activeSide(),a=t.attributes,o=a.min_temp??-1/0,l=a.max_temp??1/0,c=this.step,h=this.shown();if(h===void 0)return;let d=o,p=l;n==="low"&&r.high!==void 0&&(p=Math.min(l,r.high-c)),n==="high"&&r.low!==void 0&&(d=Math.max(o,r.low+c));let m=Zt(h+e*c,c,d,p);if(m===h)return;this.ghost(e);let f={...this._pending??{},at:Date.now()};n==="single"?f.value=m:f[n]=m,this._pending=f,clearTimeout(this.sendTimer),this.sendTimer=window.setTimeout(()=>this.send(),Er)}send(){this.sendTimer=0;let e=this.stateObj;if(!e||!this.hass||!this._pending)return;let t=this.current(),r=t.mode==="dual"?{target_temp_low:t.low,target_temp_high:t.high}:{temperature:t.value};this._pending={...this._pending,at:Date.now()},this.hass.callService("climate","set_temperature",r,{entity_id:e.entity_id})}ghost(e){this.lastDir=e;let t=this.renderRoot.querySelector(".num:not(.ghost)");if(!t||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let r=t.cloneNode(!0);r.classList.add("ghost"),t.parentElement.appendChild(r),r.animate([{transform:"none",opacity:1},{transform:`translateY(${-36*e}%) scale(.9)`,opacity:0}],{duration:200,easing:"cubic-bezier(.4,0,1,1)",fill:"forwards"}).finished.then(()=>r.remove(),()=>r.remove())}updated(e){var a;if((a=super.updated)==null||a.call(this,e),!this.lastDir)return;let t=this.lastDir;this.lastDir=0;let r=this.renderRoot.querySelector(".num:not(.ghost)");if(!r||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let n=Ii();r.animate([{transform:`translateY(${40*t}%) scale(.9)`},{transform:"none"}],{duration:n.duration,easing:n.easing}),r.animate([{opacity:0},{opacity:1}],{duration:180,easing:"ease-out"})}fmt(e){return e===void 0?"--":this.step<1?e.toFixed(1):String(Math.round(e))}renderContent(){let e=this._config;if(!this.hass)return g;let t=this.stateObj;if(!t)return u`<div class="center warning ink">Entity not found: ${e.entity}</div>`;let r=this.current(),n=this.activeSide(),a=t.state==="off",o=L(t),l=this.shown(),c=t.attributes.current_temperature,h=e.subtitle??Fe(this.hass,e.entity)??t.attributes.friendly_name,d=t.attributes,p=!o&&l!==void 0,m=!p||l>=((n==="low"&&r.high!==void 0?r.high-this.step:d.max_temp)??1/0),f=!p||l<=((n==="high"&&r.low!==void 0?r.low+this.step:d.min_temp)??-1/0);return u`<div class="thermo">
      <div class="temp" aria-live="polite">
        <span class="num ink ${a||o?"dim":""}">${o?"--":r.mode==="none"?this.fmt(c):this.fmt(l)}</span>
        ${r.mode==="dual"?u`<div class="sides ink">
              <button class="side ${n==="low"?"sel":""}" @click=${()=>this._side="low"} aria-pressed=${String(n==="low")}>Heat ${this.fmt(r.low)}</button>
              <button class="side ${n==="high"?"sel":""}" @click=${()=>this._side="high"} aria-pressed=${String(n==="high")}>Cool ${this.fmt(r.high)}</button>
            </div>`:g}
      </div>
      <div class="bar">
        <button class="chev" aria-label="Lower setpoint" ?disabled=${f} @click=${()=>this.stepBy(-1)}>${y.chevronDown}</button>
        <div class="label ink">
          <div class="title">${e.name??"Thermostat"}</div>
          <div class="sub">${a?"Off":h}${typeof c=="number"?u` &bull; ${this.fmt(c)}&deg;`:g}</div>
        </div>
        <button class="chev" aria-label="Raise setpoint" ?disabled=${m} @click=${()=>this.stepBy(1)}>${y.chevronUp}</button>
      </div>
    </div>`}};ce.properties={...C.properties,_pending:{state:!0},_side:{state:!0}},ce.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"climate"}}}},{name:"name",selector:{text:{}}},{name:"subtitle",helper:"Defaults to the entity's area",selector:{text:{}}},{name:"step",helper:"Defaults to the entity's target temperature step",selector:{number:{min:.1,max:5,step:.1,mode:"box"}}}],ce.styles=[z,S`
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
    `];customElements.define("homeview-thermostat-card",ce);O("homeview-thermostat-card","HomeView Thermostat","Large liquid-glass thermostat with spring setpoint and heat/cool support.");var Fi=["light","switch","fan","lock","cover","scene","script","input_boolean","media_player"],Tr=500,J=class extends C{constructor(){super(...arguments);this._confirming=!1;this._flash=!1;this.holdTimer=0;this.held=!1;this.confirmTimer=0;this.down=()=>{this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=window.setTimeout(()=>{this.held=!0,F(this,"hass-more-info",{entityId:this._config.entity})},Tr)};this.up=()=>clearTimeout(this.holdTimer);this.cancel=()=>clearTimeout(this.holdTimer);this.onTap=()=>{if(this.held){this.held=!1;return}let e=this._config,t=e.tap_action??"toggle";if(t==="none"||!this.hass)return;if(t==="more-info"){F(this,"hass-more-info",{entityId:e.entity});return}if(t==="navigate"){Jt(e.navigation_path.trim());return}let r=this.hass.states[e.entity];if(!r)return;let n=R(e.entity);if(n==="lock"&&r.state==="locked"&&e.confirm_unlock&&!this._confirming){this._confirming=!0,clearTimeout(this.confirmTimer),this.confirmTimer=window.setTimeout(()=>this._confirming=!1,3e3);return}this._confirming=!1;let a=ei(n,r.state);a&&(n==="scene"&&(this._flash=!0,setTimeout(()=>this._flash=!1,1200)),this.hass.callService(a[0],a[1],{},{entity_id:e.entity}))}}static getStubConfig(e){return{entity:Object.keys(e.states).find(r=>R(r)==="light")??Object.keys(e.states).find(r=>Fi.includes(R(r)))??""}}validate(e){var t;if(!e.entity)throw new Error("Pick an entity");if(e.tap_action==="navigate"&&!((t=e.navigation_path)!=null&&t.trim()))throw new Error("Add the navigation_path to open, such as /lovelace/music")}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}getCardSize(){return 3}cardClass(){var a;let e=this._config,t=(a=this.hass)==null?void 0:a.states[e.entity],r=R(e.entity),n=t&&!L(t)&&ut(r,t.state)&&r!=="media_player";return`tile ${r} ${n||this._flash?"on":""} ${L(t)?"unavailable":""} ${this._confirming?"confirming":""}`}renderContent(){let e=this._config;if(!this.hass)return g;let t=this.hass.states[e.entity],r=R(e.entity),n=!!t&&!L(t)&&ut(r,t.state),a=e.name??(t?W(this.hass,e.entity):e.entity),o=e.subtitle??Fe(this.hass,e.entity)??"",l="";t&&r==="media_player"&&!L(t)&&({title:a,sub:o}=hi(t,a),(t.state==="playing"||t.state==="paused")&&t.attributes.entity_picture&&(l=this.hass.hassUrl(t.attributes.entity_picture))),t?t.state==="unavailable"?o="Unavailable":this._confirming?o="Tap again to unlock":r==="lock"&&["locking","unlocking","jammed","opening","open"].includes(t.state)&&(o=t.state[0].toUpperCase()+t.state.slice(1)+(t.state.endsWith("ing")?"\u2026":"")):o="Entity not found";let c=t?r==="lock"||r==="cover"||r==="media_player"?t.state:r==="scene"||r==="script"?"":n?"on":"off":"missing";return u`<button
      class="hit"
      aria-label="${[a,o,c].filter(Boolean).join(", ")}"
      aria-pressed=${r==="scene"||r==="script"||r==="media_player"||e.tap_action==="navigate"?g:String(n)}
      ?disabled=${!t||t.state==="unavailable"}
      @pointerdown=${this.down}
      @pointerup=${this.up}
      @pointerleave=${this.cancel}
      @pointercancel=${this.cancel}
      @click=${this.onTap}
      @contextmenu=${h=>h.preventDefault()}
    >
      <span class="icon">${l?u`<img class="art" src=${l} alt="" draggable="false" />`:e.icon?u`<ha-icon .icon=${e.icon}></ha-icon>`:Di(r,t==null?void 0:t.attributes.device_class,n)}</span>
      <span class="label ink"><span class="title">${a}</span><br /><span class="sub">${o}</span></span>
    </button>`}};J.properties={...C.properties,_confirming:{state:!0},_flash:{state:!0}},J.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:Fi}}}},{name:"name",selector:{text:{}}},{name:"subtitle",helper:"Defaults to the entity's area",selector:{text:{}}},{name:"icon",helper:"Optional mdi: icon; HomeView glyphs are used by default",selector:{icon:{}}},{name:"tap_action",label:"Tap action",selector:{select:{mode:"dropdown",options:[{value:"toggle",label:"Toggle / run"},{value:"more-info",label:"More info"},{value:"navigate",label:"Open a view"},{value:"none",label:"Nothing"}]}}},{name:"navigation_path",label:"View to open",helper:"With Open a view: a dashboard path such as /echo-show/music",selector:{text:{}}},{name:"confirm_unlock",label:"Confirm before unlocking (locks)",selector:{boolean:{}}}],J.styles=[z,S`
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
    `];customElements.define("homeview-tile-card",J);O("homeview-tile-card","HomeView Tile","Liquid-glass tile for lights, switches, fans, locks, covers, scenes and scripts.");var Te=class extends C{constructor(){super("circle");this.raf=0;this.timer=0;this.loop=()=>{if(this.raf=this.timer=0,!this.onScreen)return;this.draw();let e=this.mode();e==="sweep"?this.raf=requestAnimationFrame(this.loop):this.timer=window.setTimeout(this.loop,(e==="off"?6e4-new Date().getSeconds()*1e3:1e3)-new Date().getMilliseconds()+5)}}static getStubConfig(){return{seconds:"sweep"}}getGridOptions(){return this.digital?{columns:6,rows:3,min_columns:3,min_rows:2}:{columns:4,rows:"auto",min_columns:3,min_rows:2}}get digital(){var e;return((e=this._config)==null?void 0:e.face)==="digital"}get bare(){return this.digital}get square(){return!this.digital&&super.square}refFrom(e,t){return this.digital?Math.min(t,e*.7):super.refFrom(e,t)}validate(e){if(e.face&&e.face!=="analog"&&e.face!=="digital")throw new Error(`Unknown face: ${e.face} (analog or digital)`);if(e.time_zone)try{new Intl.DateTimeFormat("en",{timeZone:e.time_zone})}catch{throw new Error(`Unknown time zone: ${e.time_zone}`)}}cardClass(){return this.digital?"digital":"clock"}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){var e;super.disconnectedCallback(),cancelAnimationFrame(this.raf),clearTimeout(this.timer),(e=this.fit)==null||e.disconnect(),this.fit=void 0}firstUpdated(e){super.firstUpdated(e),this.fit??(this.fit=new ResizeObserver(()=>this.fitFace())),this.fit.observe(this)}fitFace(){let e=this.renderRoot.querySelector("ha-card");if(!e)return;let t=this.clientWidth,r=this.clientHeight,n=this.square||this.digital||!t||!r?0:Math.min(t,r);e.style.width=e.style.height=n?`${n}px`:"",e.style.margin=n?`${(r-n)/2}px auto 0`:""}resume(){!this.raf&&!this.timer&&this.loop()}mode(){var t;if(this.digital)return"off";let e=((t=this._config)==null?void 0:t.seconds)??"sweep";return e==="sweep"&&matchMedia("(prefers-reduced-motion: reduce)").matches?"tick":e}draw(){var a,o;if(this.digital){let l=this.renderRoot.querySelector(".time"),c=this.now();l&&l.textContent!==c.time&&this.requestUpdate();return}let e=this.renderRoot,t=e.querySelector("#hh");if(!t)return;let r=mt((a=this._config)==null?void 0:a.time_zone),n=ti(r.h,r.m,r.s+(this.mode()==="sweep"?r.ms/1e3:0));t.setAttribute("transform",`rotate(${n.h})`),e.querySelector("#mh").setAttribute("transform",`rotate(${n.m})`),(o=e.querySelector("#sh"))==null||o.setAttribute("transform",`rotate(${n.s})`)}now(){var e,t,r,n,a,o;return ii(new Date,((t=(e=this.hass)==null?void 0:e.locale)==null?void 0:t.language)??((r=this.hass)==null?void 0:r.language),(a=(n=this.hass)==null?void 0:n.locale)==null?void 0:a.time_format,(o=this._config)==null?void 0:o.time_zone)}renderContent(){var r;if(this.digital){let n=this.now();return u`<div class="digital-face ink">
        <span class="time">${n.time}</span><span class="date">${n.date}</span>
      </div>`}let e=Array.from({length:12},(n,a)=>_`<line class="tick" x1="0" x2="0" y1="-84" y2="-68" transform="rotate(${a*30})"/>`),t=mt((r=this._config)==null?void 0:r.time_zone);return u`<svg class="face" viewBox="-100 -100 200 200" role="img" aria-label="Clock, ${String(t.h).padStart(2,"0")}:${String(t.m).padStart(2,"0")}">
      ${e}
      <line class="hand" id="hh" x1="0" y1="0" x2="0" y2="-42" stroke-width="7" />
      <line class="hand" id="mh" x1="0" y1="0" x2="0" y2="-66" stroke-width="5.5" />
      ${this.mode()==="off"?"":_`<line class="hand" id="sh" x1="0" y1="18" x2="0" y2="-80" stroke-width="1.8" />`}
      <circle r="4.2" fill="#fff" />
    </svg>`}updated(e){var t;(t=super.updated)==null||t.call(this,e),this.draw()}};Te.editorFields=[{name:"face",label:"Face",selector:{select:{mode:"dropdown",options:[{value:"analog",label:"Analog, on glass"},{value:"digital",label:"Digital, on the wallpaper"}]}}},{name:"seconds",label:"Seconds hand (analog)",selector:{select:{mode:"dropdown",options:[{value:"sweep",label:"Smooth sweep"},{value:"tick",label:"Tick"},{value:"off",label:"Hidden"}]}}},{name:"time_zone",label:"Time zone",helper:"IANA name such as Europe/Paris; defaults to this device's time",selector:{text:{}}}],Te.styles=[z,S`
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
    `];customElements.define("homeview-clock-card",Te);O("homeview-clock-card","HomeView Clock","Analog clock on a round liquid-glass face, or a big digital time and date.");function je(s,i,e){let t,r,n=c=>{t||c.pointerType==="mouse"&&c.button!==0||(t={id:c.pointerId,x:c.clientX,y:c.clientY,t:c.timeStamp},r=void 0)},a=c=>{if(!t||c.pointerId!==t.id)return;let h=c.clientX-t.x,d=c.clientY-t.y;if(!r){if(Math.max(Math.abs(h),Math.abs(d))<8)return;if(r=Math.abs(h)>=Math.abs(d)?"x":"y",r==="y"&&!e){t=void 0;return}try{s.setPointerCapture(c.pointerId)}catch{}}i.move(h,d,r)},o=c=>{if(!t||c.pointerId!==t.id)return;let h=c.clientX-t.x,d=c.clientY-t.y,p=ai(h,d,c.timeStamp-t.t);t=void 0;let m=!r||(r==="x"?p==="left"||p==="right":p==="up"||p==="down");i.end(m?p:null,h,d)},l=c=>{!t||c.pointerId!==t.id||(t=void 0,i.end(null,0,0))};return s.addEventListener("pointerdown",n),s.addEventListener("pointermove",a),s.addEventListener("pointerup",o),s.addEventListener("pointercancel",l),()=>{s.removeEventListener("pointerdown",n),s.removeEventListener("pointermove",a),s.removeEventListener("pointerup",o),s.removeEventListener("pointercancel",l)}}var se=420,We=()=>({urls:["",""],front:0,drag:0,side:0,still:!1});function Ae(s,i){return u`${s.urls.map((e,t)=>{if(!e)return g;let r=t===s.front,n=r?`${s.drag}px`:`calc(${s.side} * (100% + var(--hv-gap, 0px)) + ${s.drag}px)`,a=`${r?"front":s.side?"beside":""} ${s.still?"still":""}`;return u`<img class=${a} src=${e} alt="" draggable="false" style="object-fit:${i};transform:translateX(${n})" />`})}`}var Ve=S`
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    opacity: 0;
    transition:
      opacity 1.2s ease,
      transform ${se}ms cubic-bezier(0.22, 1, 0.36, 1);
    -webkit-user-drag: none;
    user-select: none;
    -webkit-user-select: none;
  }
  img.front,
  img.beside {
    opacity: 1;
  }
  img.beside {
    transition: transform ${se}ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  img.still {
    transition: none;
  }
`;var Ar=3e3,kt="homeviewOverlay",Rr=320;function de(s){var i;(((i=document.querySelector("home-assistant"))==null?void 0:i.shadowRoot)??document.body).appendChild(s)}var D=class extends N{constructor(){super(...arguments);this._pull=0;this._chrome=!0;this._closing=!1;this.closeTimer=0;this.chromeTimer=0;this.ownClose=!1;this.onPop=()=>{var e;(e=history.state)!=null&&e[kt]||this.close(!0)};this.onKey=e=>{if(e.key==="Escape")this.close();else if(!(e.key==="ArrowRight"||e.key==="ArrowLeft")||!this.arrow(e.key==="ArrowRight"?1:-1))return;e.preventDefault()};this.onVisible=()=>{document.visibilityState==="visible"&&!this._closing&&this.keepAwake()};this.noScroll=e=>e.preventDefault()}renderBackdrop(){return g}dragX(e){}dragXEnd(e){}arrow(e){return!1}closed(){}connectedCallback(){super.connectedCallback(),this.setAttribute("role","dialog"),this.setAttribute("aria-modal","true"),this.setAttribute("aria-label",this.label),this.tabIndex=-1,history.pushState({...history.state??{},[kt]:!0},""),window.addEventListener("popstate",this.onPop),window.addEventListener("keydown",this.onKey),document.addEventListener("visibilitychange",this.onVisible),this.addEventListener("touchmove",this.noScroll,{passive:!1}),this.closeTimer=window.setTimeout(()=>this.close(),this.openMs),this.showChrome(),this.keepAwake()}disconnectedCallback(){var e,t;super.disconnectedCallback(),(e=this.untrack)==null||e.call(this),this.untrack=void 0,window.removeEventListener("popstate",this.onPop),window.removeEventListener("keydown",this.onKey),document.removeEventListener("visibilitychange",this.onVisible),this.removeEventListener("touchmove",this.noScroll),clearTimeout(this.closeTimer),clearTimeout(this.chromeTimer),(t=this.wake)==null||t.release().catch(()=>{}),this.wake=void 0}firstUpdated(){this.untrack=je(this,{move:(e,t,r)=>{this.axis=r,r==="x"?this.dragX(e):this._pull=t>0?t:t/4},end:e=>{let t=this.axis;if(this.axis=void 0,e==="tap")return this.showChrome(!this._chrome);if(t==="x")return this.dragXEnd(e);if(e==="down")return this.close();this._pull=0}},!0),this.focus()}close(e=!1){var t;this._closing||(this._closing=!0,!e&&((t=history.state)!=null&&t[kt])&&history.back(),window.setTimeout(()=>{this.remove(),this.closed()},Rr))}async keepAwake(){var e;try{this.wake=await((e=navigator.wakeLock)==null?void 0:e.request("screen"))}catch{}}showChrome(e=!0){this._chrome=e||this.ownClose,!this.ownClose&&(clearTimeout(this.chromeTimer),e&&(this.chromeTimer=window.setTimeout(()=>this._chrome=!1,Ar)))}render(){let e=this._pull,t=e>0?Math.max(0,1-e/500):1,r=this.axis!=="y";return u`<div class="backdrop ${r?"settle":""}" style="opacity:${t}">${this.renderBackdrop()}</div>
      <div class="stage ${r?"settle":""}" style="transform:translateY(${e}px) scale(${e>0?1-e/2500:1})">${this.renderBody()}</div>
      ${this._chrome&&!this.ownClose?this.closeButton():g}`}closeButton(){return u`<button class="close" aria-label=${this.closeLabel} @pointerdown=${e=>e.stopPropagation()} @click=${()=>this.close()}>${y.close}</button>`}updated(){this.toggleAttribute("closing",this._closing)}};D.properties={_pull:{state:!0},_chrome:{state:!0},_closing:{state:!0}},D.overlayStyles=S`
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
        transform ${se}ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity ${se}ms ease;
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
  `;var Re=class extends D{constructor(){super(...arguments);this.state=We();this.label="Photo slideshow";this.closeLabel="Close slideshow";this.openMs=3*3600*1e3}renderBackdrop(){return Ae(this.state,"cover")}renderBody(){return Ae(this.state,"contain")}dragX(e){var t;(t=this.host)==null||t.dragTo(e)}dragXEnd(e){var t;(t=this.host)==null||t.dragEnd(e)}arrow(e){var t;return(t=this.host)==null||t.step(e),!0}closed(){var e;(e=this.host)==null||e.slideshowClosed()}};Re.properties={...D.properties,state:{attribute:!1}},Re.styles=[Ve,D.overlayStyles,S`
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
    `];customElements.get("homeview-photo-slideshow")||customElements.define("homeview-photo-slideshow",Re);var Pr=1800*1e3,$t=30*1e3,Lr=s=>Math.min(300*1e3,10*1e3*2**s),Or=3e3*1e3,he=class extends C{constructor(){super(...arguments);this._stage=We();this._error="";this.items=[];this.index=-1;this.timer=0;this.settleTimer=0;this.listedAt=0;this.fails=0;this.parked=!1;this.loadedFor="";this.listRun=0;this.listFails=0;this.shown=new He;this.nav=0;this.dragging=!1;this.onKey=e=>{if(e.key==="Enter"||e.key===" ")this.openSlideshow();else if(e.key==="ArrowRight")this.step(1);else if(e.key==="ArrowLeft")this.step(-1);else return;e.preventDefault()}}static getStubConfig(){return{media:"media-source://media_source/local",interval:30,recursive:!0}}validate(e){let t=re(e.media);if(!t.length||t.some(r=>!r.startsWith("media-source://")))throw new Error("Set media to a media-source:// folder, or a list of them")}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}disconnectedCallback(){var e;super.disconnectedCallback(),clearTimeout(this.timer),this.loadedFor="",(e=this.slideshow)==null||e.close()}connectedCallback(){super.connectedCallback(),this.hass&&this._config&&this.requestUpdate()}firstUpdated(e){super.firstUpdated(e);let t=this.renderRoot.querySelector("ha-card");!t||this.untrack||(this.untrack=je(t,{move:r=>this.dragTo(r),end:r=>r==="tap"?this.openSlideshow():this.dragEnd(r)},!1))}updated(e){var t;(t=super.updated)==null||t.call(this,e),this.slideshow&&(this.slideshow.state=this._stage),this.load()}load(){let e=this._config;if(!this.hass||!e||!this.onScreen)return!1;let t=JSON.stringify([re(e.media),!!e.recursive,!!e.shuffle]);return t===this.loadedFor?!1:(this.loadedFor=t,this.listFails=0,this.relist(!0),!0)}async relist(e){var a;let t=this._config,r=this.hass,n=++this.listRun;clearTimeout(this.timer);try{let o=await ri({callWS:l=>G(r.callWS(l),$t)},t.media,!!t.recursive);if(n!==this.listRun)return;this.items=t.shuffle?oi(o):o,this.listedAt=Date.now(),this.listFails=0,this._error=o.length?"":"No pictures in this folder",e&&(this.index=-1,this.shown.clear(),this.ahead=void 0,this.advance())}catch(o){if(n!==this.listRun||!e)return;let l=o;if(this._error=`Cannot open ${re(t.media).join(", ")}: ${l.message??((a=l.error)==null?void 0:a.message)??o}`,!this.isConnected)return;this.timer=window.setTimeout(()=>{this.onScreen?this.relist(!0):this.loadedFor=""},Lr(this.listFails++))}}async advance(){if(clearTimeout(this.timer),!this._config||!this.items.length||!this.isConnected||(this.parked=!this.onScreen&&!this.slideshow,this.parked))return;let e=this.nav;Date.now()-this.listedAt>Pr&&await this.relist(!1),e===this.nav&&await this.go(1,!1)}schedule(){clearTimeout(this.timer),!(!this._config||!this.isConnected)&&(this.timer=window.setTimeout(()=>void this.advance(),Math.max(5,this._config.interval??30)*1e3))}unseen(){var t;if(!this.items.length)return;let e=this.items[(this.index+1)%this.items.length];return((t=this.ahead)==null?void 0:t.id)===e?this.ahead:{id:e}}async fetch(e){if(!e.url||Date.now()-(e.at??0)>Or){e.ready=!1;let r=await G(this.hass.callWS({type:"media_source/resolve_media",media_content_id:e.id,expires:3600}),$t);e.url=r.url.startsWith("http")?r.url:this.hass.hassUrl(r.url),e.at=Date.now()}let t=new Image;return t.src=e.url,await G(t.decode(),$t),e.ready=!0,e.url}async prefetch(){let e=this.shown.peek(1)??(this.ahead=this.unseen());if(!(!e||e.ready))try{await this.fetch(e)}catch{}}async go(e,t){let r=++this.nav;for(clearTimeout(this.timer);;){let n=this.shown.peek(e),a=n??(e>0?this.unseen():void 0);if(!a)break;n||(this.index=(this.index+1)%this.items.length);try{let o=await this.fetch(a);if(r!==this.nav)return;n?this.shown.step(e):this.shown.push(a),a===this.ahead&&(this.ahead=void 0),this.fails=0,await this.show(o,t?e:0),this.prefetch();break}catch{if(r!==this.nav)return;if(a===this.ahead&&(this.ahead=void 0),n&&this.shown.drop(a),++this.fails>=Math.min(this.items.length,20))break}}this.settle(),this.schedule()}async show(e,t){clearTimeout(this.settleTimer);let r=this._stage,n=1-r.front,a=[...r.urls];if(a[n]=e,!t){this._stage={urls:a,front:n,drag:0,side:0,still:!1};return}(r.urls[n]!==e||r.side!==t)&&(this._stage={...r,urls:a,side:t,still:!0},await this.painted()),this._stage={urls:a,front:n,drag:0,side:-t,still:!1}}settle(){let e=this._stage;!e.drag&&!e.side||(clearTimeout(this.settleTimer),this._stage={...e,drag:0,still:!1},this.settleTimer=window.setTimeout(()=>this._stage={...this._stage,side:0,still:!0},se+60))}async painted(){var e,t,r;await this.updateComplete,this.slideshow&&(this.slideshow.state=this._stage,await this.slideshow.updateComplete,(t=(e=this.slideshow.shadowRoot)==null?void 0:e.querySelector("img"))==null||t.getBoundingClientRect()),(r=this.renderRoot.querySelector("img"))==null||r.getBoundingClientRect()}dragTo(e){this.dragging||(this.dragging=!0,this.nav++,clearTimeout(this.timer),clearTimeout(this.settleTimer));let t=e<0?1:-1,r=this.shown.peek(t)??(t>0?this.ahead:void 0),n=r!=null&&r.ready?r.url:"",a=this._stage,o=[...a.urls];n&&(o[1-a.front]=n);let l=t<0?!this.shown.peek(-1):this.items.length<2;this._stage={...a,urls:o,drag:l?e/3:e,side:n?t:0,still:!0}}dragEnd(e){if(this.dragging){if(this.dragging=!1,e==="left"||e==="right"){this.go(e==="left"?1:-1,!0);return}this.settle(),this.schedule()}}step(e){this.items.length&&this.go(e,!0)}openSlideshow(){if(this.slideshow||!this._stage.urls[this._stage.front]||le(this))return;let e=document.createElement("homeview-photo-slideshow");e.host=this,e.state=this._stage,this.slideshow=e,de(e)}slideshowClosed(){var e;this.slideshow=void 0,this.isConnected&&((e=this.renderRoot.querySelector("ha-card"))==null||e.focus({preventScroll:!0}))}resume(){!this.load()&&this.parked&&this.advance()}render(){if(!this._config)return u``;let e=this._config.fit??"cover",t=!!this._stage.urls[this._stage.front];return u`<ha-card
      class="photo swiper ${this.square?"square":""} ${t?"shown":""}"
      role=${t?"button":g}
      tabindex=${t?"0":g}
      aria-label=${t?"Photo frame: open the full-screen slideshow":g}
      @keydown=${this.onKey}
    >
      ${Ae(this._stage,e)} ${this._error?u`<div class="msg">${this._error}</div>`:g}
    </ha-card>`}renderContent(){return g}};he.properties={...C.properties,_stage:{state:!0},_error:{state:!0}},he.editorFields=[{name:"media",label:"Media folders",required:!0,list:!0,helper:"One or more media-source folders, e.g. media-source://media_source/local/photos; the slideshow cycles through all of them. Open Media in the sidebar to find a folder; DLNA, Synology Photos and other media servers HA can browse work too.",selector:{text:{multiple:!0}}},{name:"interval",label:"Seconds per picture",selector:{number:{min:5,max:3600,step:1,mode:"box",unit_of_measurement:"s"}}},{name:"shuffle",selector:{boolean:{}}},{name:"recursive",label:"Include subfolders",selector:{boolean:{}}},{name:"fit",selector:{select:{mode:"dropdown",options:[{value:"cover",label:"Fill"},{value:"contain",label:"Fit whole picture"}]}}}],he.styles=[z,Ve,S`
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
    `];customElements.define("homeview-photo-card",he);O("homeview-photo-card","HomeView Photo Frame","Slideshow of pictures from a Home Assistant media source.");var Ke=class{constructor(i,e=16e3){this.acc=0;this.n=0;this.pos=0;this.ratio=i/e}push(i){if(this.ratio<=1)return i.slice();let e=[];for(let t=0;t<i.length;t++)this.acc+=i[t],this.n++,this.pos+=1,this.pos>=this.ratio&&(e.push(this.acc/this.n),this.acc=0,this.n=0,this.pos-=this.ratio);return Float32Array.from(e)}},Ye=class{constructor(i=1.2,e=7,t=15){this.heard=!1;this.floor=.01;this.sum=0;this.n=0;this.run=0;this.quiet=0;this.frames=0;this.silence=i,this.noSpeech=e,this.max=t}push(i){for(let t of i)this.sum+=t*t,!(++this.n<320)&&(this.frame(Math.sqrt(this.sum/this.n)),this.sum=0,this.n=0);let e=this.frames/50;return this.heard?this.quiet>=this.silence-1e-9||e>=this.max?"end":"listen":e>=Math.min(this.noSpeech,this.max)?"none":"listen"}frame(i){if(this.frames++,i>Math.max(this.floor*3,.006)){this.run+=.02,this.run>=.1&&(this.heard=!0,this.quiet=0);return}this.run=0,this.floor=i<this.floor?i:this.floor+(i-this.floor)*(.02/2),this.heard&&(this.quiet+=.02)}};function Hi(s){let i=new Int16Array(s.length);for(let e=0;e<s.length;e++){let t=Math.max(-1,Math.min(1,s[e]));i[e]=t<0?t*32768:t*32767}return i}function Xe(s,i){let e=i?new Uint8Array(i.buffer,i.byteOffset,i.byteLength):new Uint8Array(0),t=new Uint8Array(1+e.length);return t[0]=s,t.set(e,1),t}var Ni=`
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
`;async function Ui(s,i,e){let t,r=()=>t==null?void 0:t.getTracks().forEach(a=>a.stop()),n=()=>{if(i.aborted)throw new DOMException("Aborted","AbortError")};try{t=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}),n(),await s.resume(),n();let a=!1,o=m=>{a||e(m)},l,c=()=>{};if(s.audioWorklet){let m=URL.createObjectURL(new Blob([Ni],{type:"text/javascript"}));try{await s.audioWorklet.addModule(m)}finally{URL.revokeObjectURL(m)}n();let f=new AudioWorkletNode(s,"homeview-recorder");f.port.onmessage=k=>o(k.data),c=()=>f.port.onmessage=null,l=f}else{let m=s.createScriptProcessor(4096,1,1);m.onaudioprocess=f=>o(f.inputBuffer.getChannelData(0)),c=()=>m.onaudioprocess=null,m.connect(s.destination),l=m}let h=s.createMediaStreamSource(t),d=s.createAnalyser();d.fftSize=256,d.smoothingTimeConstant=.6,h.connect(d),h.connect(l);let p=l;return{analyser:d,close(){a||(a=!0,c(),p.disconnect(),h.disconnect(),r())}}}catch(a){throw r(),a}}var zr=16e3,Dr=30,Ir=6,St={idle:"Tap to talk",listening:"Listening",thinking:"Thinking",responding:"Responding",error:"Something went wrong"},pe=class extends C{constructor(){super(...arguments);this._phase="idle";this._heard="";this._reply="";this._error="";this._detail="";this._showDetail=!1;this.lastText="";this._typing=!1;this.handlerId=null;this.pending=[];this.audioDone=!1;this.runId=0;this.speaking=!1;this.stopTimer=0;this.raf=0;this.levels=new Float32Array(48);this.t0=performance.now();this.loop=()=>{this.raf=this.draw()?requestAnimationFrame(this.loop):0};this.showDetail=e=>{e.preventDefault(),this._showDetail=!0};this.submit=e=>{e.preventDefault();let t=e.target.elements.namedItem("q");this.ask(t.value),t.value=""}}static getStubConfig(){return{speak:!0}}getGridOptions(){return{columns:12,rows:"auto",min_columns:6,min_rows:3}}getCardSize(){return 5}get square(){return!1}refFrom(e,t){return Math.min(e,t,220)}cardClass(){var t,r;return`voice ${typeof((r=(t=this._config)==null?void 0:t.grid_options)==null?void 0:r.rows)!="number"?"wide":""} ${this.phase()}`}phase(){var t,r,n;let e=(t=this._config)==null?void 0:t.satellite;return e?di((n=(r=this.hass)==null?void 0:r.states[e])==null?void 0:n.state):this._phase}micBlocked(){var e;return window.isSecureContext?(e=navigator.mediaDevices)!=null&&e.getUserMedia?null:"unsupported":"insecure"}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){var e;super.disconnectedCallback(),cancelAnimationFrame(this.raf),this.teardown(),this.speaking=!1,this._phase!=="error"&&(this._phase="idle"),this.stopAudio(),(e=this.ctx)==null||e.close(),this.ctx=void 0,this.analyser=void 0}stopAudio(){let e=this.audio;e&&(e.pause(),e.removeAttribute("src"),e.load())}async talk(){var r;if(this._phase==="listening")return this.endAudio();if(this._phase==="thinking"||this._phase==="responding")return;if(this.micBlocked()){this._typing=!0;return}let e=this.ctx??(this.ctx=new AudioContext);this.teardown(),this.reset(),this.lastText="",this.endpointer=new Ye,this.resampler=new Ke(e.sampleRate);let t=this.abort=new AbortController;this._phase="listening",this.analyser=void 0;try{let n=await Ui(e,t.signal,a=>this.onAudio(a));if(t.signal.aborted)return n.close();this.mic=n,this.analyser=n.analyser,this.stopTimer=window.setTimeout(()=>this.endAudio(),zr),await this.run({start_stage:"stt",end_stage:((r=this._config)==null?void 0:r.speak)===!1?"intent":"tts",input:{sample_rate:16e3,no_vad:!0}})}catch(n){t.signal.aborted||this.fail(n)}}retry(){this.lastText?this.ask(this.lastText):this.talk()}async ask(e){var t;if(e.trim()){this.teardown(),this.reset(),this.lastText=e,this._heard=e,this._phase="thinking";try{await this.run({start_stage:"intent",end_stage:((t=this._config)==null?void 0:t.speak)===!1?"intent":"tts",input:{text:e}})}catch(r){this.fail(r)}}}async run(e){let t=this._config,r=++this.runId,n=await this.hass.connection.subscribeMessage(a=>r===this.runId&&this.onEvent(a),{type:"assist_pipeline/run",...e,...t.pipeline?{pipeline:t.pipeline}:{},...this.conversationId?{conversation_id:this.conversationId}:{}});r===this.runId?this.unsub=n:await n().catch(()=>{})}onEvent(e){var n,a,o,l,c,h,d,p,m;let t=e.data??{};if(e.type==="run-start"){this.handlerId=((n=t.runner_data)==null?void 0:n.stt_binary_handler_id)??null;for(let f of this.pending)this.sendPcm(f);this.pending=[],this.audioDone&&this.handlerId!==null&&((o=(a=this.hass)==null?void 0:a.connection.socket)==null||o.send(Xe(this.handlerId))),this.audioDone=!1}if((e.type==="stt-vad-end"||e.type==="stt-end")&&this.endAudio(),e.type==="stt-end"&&(this._heard=((l=t.stt_output)==null?void 0:l.text)??""),e.type==="intent-end"){let f=t.intent_output;this.conversationId=(f==null?void 0:f.conversation_id)??this.conversationId,this._reply=((d=(h=(c=f==null?void 0:f.response)==null?void 0:c.speech)==null?void 0:h.plain)==null?void 0:d.speech)??""}e.type==="tts-end"&&((p=t.tts_output)!=null&&p.url)&&this.play(t.tts_output.url),e.type==="error"&&this.fail(t);let r=li(this._phase,e);if(e.type==="run-end"){(m=this.unsub)==null||m.call(this),this.unsub=void 0,this.speaking||(this._phase=this._phase==="error"?"error":"idle");return}this._phase=r}onAudio(e){var a;if(this._phase!=="listening"||!this.resampler)return;let t=this.resampler.push(e),r=Hi(t);this.handlerId===null?this.pending.push(r):this.sendPcm(r);let n=(a=this.endpointer)==null?void 0:a.push(t);n==="end"?this.endAudio():n==="none"&&this.noSpeech()}noSpeech(){this.fail({code:"stt-no-text-recognized",message:"No speech was detected"})}sendPcm(e){var t,r;this.handlerId!==null&&((r=(t=this.hass)==null?void 0:t.connection.socket)==null||r.send(Xe(this.handlerId,e)))}endAudio(){var e,t;if(clearTimeout(this.stopTimer),!this.mic&&this._phase==="listening"){this._phase="idle",this.teardown();return}this.mic&&(this.handlerId!==null?(t=(e=this.hass)==null?void 0:e.connection.socket)==null||t.send(Xe(this.handlerId)):this.audioDone=!0),this._phase==="listening"&&(this._phase="thinking"),this.stopMic()}stopMic(){var e;(e=this.mic)==null||e.close(),this.mic=void 0,this.handlerId=null}play(e){var h;let t=e.startsWith("http")?e:this.hass.hassUrl(e);(h=this.audio)==null||h.pause();let r=new Audio(t);this.audio=r;try{this.ctx??(this.ctx=new AudioContext);let d=this.ctx.createMediaElementSource(r);this.analyser??(this.analyser=this.ctx.createAnalyser()),this.analyser.fftSize=256,d.connect(this.analyser),this.analyser.connect(this.ctx.destination),this.ctx.resume()}catch{}this._phase="responding",this.speaking=!0;let n=!1,a=0,o=0;r.onplaying=()=>{n=!0,o=0};let l=window.setInterval(()=>{this.audio!==r||!this.speaking?c():r.currentTime!==a?(a=r.currentTime,o=0):++o>=(n?Ir:Dr)&&c(!0)},1e3),c=(d=!1)=>{if(clearInterval(l),!(this.audio!==r||!this.speaking)){if(this.speaking=!1,!d){this._phase="idle";return}this.stopAudio(),this.fail({code:"tts-failed",message:"The spoken reply stopped before it finished"})}};r.onended=()=>c(),r.onerror=()=>c(),r.play().catch(()=>c())}fail(e){let{text:t,detail:r}=ci(e);console.warn("HomeView voice:",r),this._error=t,this._detail=r,this._phase="error",this.teardown()}reset(){var e;this._heard="",this._reply="",this._error="",this._detail="",this._showDetail=!1,this.pending=[],this.audioDone=!1,this.handlerId=null,this.speaking=!1,(e=this.audio)==null||e.pause()}async teardown(){var t;this.runId++,(t=this.abort)==null||t.abort(),this.abort=void 0,clearTimeout(this.stopTimer),this.stopMic();let e=this.unsub;this.unsub=void 0,await(e==null?void 0:e().catch(()=>{}))}draw(){var x,v;let e=(x=this.renderRoot)==null?void 0:x.querySelector("canvas.viz");if(!e)return!0;let t=Math.min(window.devicePixelRatio||1,2),r=e.clientWidth,n=e.clientHeight;if(!r||!n)return!1;(e.width!==Math.round(r*t)||e.height!==Math.round(n*t))&&(e.width=Math.round(r*t),e.height=Math.round(n*t));let a=e.getContext("2d");a.setTransform(t,0,0,t,0,0),a.clearRect(0,0,r,n);let o=this.phase(),l=(performance.now()-this.t0)/1e3,c=this.levels.length,h=o!=="idle"&&o!=="error",d=matchMedia("(prefers-reduced-motion: reduce)").matches,p=this.analyser?new Uint8Array(this.analyser.frequencyBinCount):null,m=!!p&&(o==="listening"||o==="responding")&&!((v=this._config)!=null&&v.satellite);m&&this.analyser.getByteFrequencyData(p);for(let b=0;b<c;b++){let $=0;if(m)$=(p[Math.min(p.length-1,2+Math.floor(Math.abs(b-c/2)/(c/2)*40))]/255)**1.4;else if(o==="listening"||o==="responding")$=.25+.2*Math.sin(l*5+b*.6)*Math.sin(l*1.7+b*.21);else if(o==="thinking"){let M=b/c*Math.PI*2;$=.12+.3*Math.max(0,Math.cos(M-l*3))**6}else $=.06;d&&($=Math.min($,.15)),Math.abs($-this.levels[b])>.002&&(h=!0),this.levels[b]+=($-this.levels[b])*.25}let f=r/2,k=n/2,T=Math.min(r,n)*.34,w=a.createRadialGradient(f,k,T*.1,f,k,T*1.25),A=o==="error"?"255 120 110":o==="listening"?"255 255 255":"255 236 210";w.addColorStop(0,`rgb(${A} / ${o==="idle"?.22:.42})`),w.addColorStop(1,`rgb(${A} / 0)`),a.fillStyle=w,a.beginPath(),a.arc(f,k,T*1.25,0,Math.PI*2),a.fill(),a.strokeStyle="rgb(255 255 255 / 0.95)",a.lineCap="round",a.lineWidth=Math.max(2,T*.06),a.shadowColor="rgb(40 30 20 / 0.25)",a.shadowBlur=4;for(let b=0;b<c;b++){let $=b/c*Math.PI*2-Math.PI/2,M=T*(.08+this.levels[b]*.9),P=T*.78;a.beginPath(),a.moveTo(f+Math.cos($)*P,k+Math.sin($)*P),a.lineTo(f+Math.cos($)*(P+M),k+Math.sin($)*(P+M)),a.stroke()}return h}renderContent(){var d;let e=this._config,t=this.phase(),r=!e.satellite&&this.micBlocked(),n=e.satellite?(d=this.hass)==null?void 0:d.states[e.satellite]:void 0,a=e.satellite?n?`${n.attributes.friendly_name??e.satellite}: ${t==="idle"?"Ready":St[t]}`:`Satellite not found: ${e.satellite}`:t==="error"?this._error||St.error:t==="idle"&&r?"Type a request":St[t],o=t==="error"&&!e.satellite,[l,c]=t==="listening"?["Stop listening",y.stop]:o?["Try again",y.retry]:["Talk to Assist",y.mic],h=o&&this._showDetail;return u`<div class="voice-wrap ${h?"covered":""}">
      <div class="head ink">
        <span class="title">${e.name??"Assist"}</span>
        ${o?u`<span class="sub status" aria-live="polite" role="button" tabindex="0" title=${this._detail} @click=${this.showDetail} @keydown=${p=>(p.key==="Enter"||p.key===" ")&&this.showDetail(p)}>${a}</span>`:u`<span class="sub status" aria-live="polite">${a}</span>`}
      </div>
      <button class="orb" ?disabled=${!!e.satellite} aria-label=${l} @click=${()=>void(o?this.retry():this.talk())}>
        <canvas class="viz" aria-hidden="true"></canvas>
        <span class="mic">${c}</span>
      </button>
      <div class="lines ink" aria-live="polite">
        ${this._heard?u`<div class="heard">&ldquo;${this._heard}&rdquo;</div>`:g}
        ${this._reply?u`<div class="reply">${this._reply}</div>`:g}
        ${o&&this._detail?u`<button class="more" @click=${this.showDetail}><span>Details</span></button>`:g}
        ${r==="insecure"&&!this._heard&&!this._reply&&!o?u`<div class="notice">The microphone needs Home Assistant over HTTPS. Type instead, or see the README for options.</div>`:g}
      </div>
      ${e.satellite?g:this._typing||r?u`<form class="type" @submit=${this.submit}>
              <input name="q" type="text" placeholder="Ask Assist" autocomplete="off" aria-label="Request" />
              <button class="send" aria-label="Send">${y.send}</button>
            </form>`:u`<button class="kbd" aria-label="Type a request" @click=${()=>this._typing=!0}>${y.keyboard}</button>`}
      ${h?u`<div class="sheet ink" role="dialog" aria-label="Error details">
            <div class="sheet-head">
              <span class="title">${this._error}</span>
              <button class="more" @click=${()=>this._showDetail=!1}><span>Done</span></button>
            </div>
            <div class="detail">${this._detail}</div>
          </div>`:g}
    </div>`}resume(){!this.raf&&this.isConnected&&this.loop()}updated(e){var t,r;(t=super.updated)==null||t.call(this,e),e.has("_typing")&&this._typing&&((r=this.renderRoot.querySelector("input[name=q]"))==null||r.focus()),!this.raf&&this.isConnected&&this.loop()}};pe.properties={...C.properties,_phase:{state:!0},_heard:{state:!0},_reply:{state:!0},_error:{state:!0},_detail:{state:!0},_showDetail:{state:!0},_typing:{state:!0}},pe.editorFields=[{name:"name",selector:{text:{}}},{name:"pipeline",label:"Assist pipeline",helper:"Defaults to the preferred pipeline",selector:{assist_pipeline:{}}},{name:"satellite",label:"Voice satellite (optional)",helper:"Show this assist_satellite's state instead of using this device's microphone",selector:{entity:{filter:{domain:"assist_satellite"}}}},{name:"speak",label:"Play spoken replies",selector:{boolean:{}}}],pe.styles=[z,S`
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
    `];customElements.define("homeview-voice-card",pe);O("homeview-voice-card","HomeView Voice","Talk to Home Assistant Assist with an audio-reactive liquid-glass visualizer.");var ue=class extends C{constructor(){super(...arguments);this._now=new Date;this.subscribedTo="";this.tick=0;this.minute=()=>{this.tick=0,this.onScreen&&(this._now=new Date,this.tick=window.setTimeout(this.minute,6e4-Date.now()%6e4+50))};this.more=()=>F(this,"hass-more-info",{entityId:this._config.entity})}static getStubConfig(e){return{entity:Object.keys(e.states).find(t=>R(t)==="weather")??""}}validate(e){if(!e.entity||R(e.entity)!=="weather")throw new Error("Pick a weather entity");let t=e.forecast_days;if(t!==void 0&&(!Number.isInteger(t)||t<1||t>7))throw new Error("forecast_days is a whole number from 1 to 7")}getGridOptions(){return this.page?{columns:"full",rows:8,min_columns:6,min_rows:4}:{columns:6,rows:"auto",min_columns:4,min_rows:2}}get page(){var e;return!!((e=this._config)!=null&&e.forecast_days)}get bare(){return this.page}get square(){return!this.page&&super.square}refFrom(e,t){return this.page?Math.min(e/2,t):super.refFrom(e,t)}cardClass(){return this.page?"weather page":"weather"}connectedCallback(){super.connectedCallback(),this.resume()}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe(),clearTimeout(this.tick),this.tick=0}resume(){!this.onScreen||!this.hass||!this._config||(this.subscribe(),this.tick||this.minute())}updated(e){var t;(t=super.updated)==null||t.call(this,e),(e.has("hass")||e.has("_config"))&&this.resume()}subscribe(){let e=this._config.entity,t=this.hass.states[e],r=pi(t==null?void 0:t.attributes.supported_features),n=r?`${e}|${r}`:"";n!==this.subscribedTo&&(this.unsubscribe(),this.subscribedTo=n,r&&(this.unsub=this.hass.connection.subscribeMessage(a=>this._forecast=a.forecast??void 0,{type:"weather/subscribe_forecast",entity_id:e,forecast_type:r}),this.unsub.catch(()=>{this.subscribedTo===n&&(this.subscribedTo="")})))}unsubscribe(){let e=this.unsub;this.unsub=void 0,this.subscribedTo="",this._forecast=void 0,e==null||e.then(t=>t()).catch(()=>{})}renderContent(){var p,m;let e=this._config;if(!this.hass)return g;let t=this.hass.states[e.entity];if(!t)return u`<div class="center warning">Entity not found: ${e.entity}</div>`;let r=this.hass.language,n=this._now,a=e.show_time===!1?g:u`<div class="top ink">
            <span class="time">${n.toLocaleTimeString(r,{hour:"numeric",minute:"2-digit"})}</span>
            <span class="date">${n.toLocaleDateString(r,{weekday:"long",month:"short",day:"numeric"})}</span>
          </div>`;if(L(t))return u`<button class="hit" @click=${this.more}>${a}<div class="center warning">Weather unavailable</div></button>`;let o=Number(t.attributes.temperature),l=isFinite(o)?`${Math.round(o)}\xB0`:"\u2013",c=((m=(p=this.hass).formatEntityState)==null?void 0:m.call(p,t))??fi(t.state),h=ui(this._forecast),d=f=>f===void 0?"\u2013":`${Math.round(f)}\xB0`;return this.page?this.renderPage(t,l,c,h,d):u`<button class="hit" aria-label="${c}, ${l}" @click=${this.more}>
      ${a}
      <div class="now ink">
        <span class="temp ${l.length>3?"long":""}">${l}</span>
        <span class="cond"><ha-icon .icon=${ft[t.state]??"mdi:weather-partly-cloudy"}></ha-icon><span>${c}</span></span>
      </div>
      <div class="outlook ink">
        <span>H: ${d(h.high)}</span><i></i><span class="dim">L: ${d(h.low)}</span><i></i><span class="rain">${y.drop}${this.wet(h,t.attributes.precipitation_unit)}</span>
      </div>
    </button>`}renderPage(e,t,r,n,a){let o=this.hass.language,l=new Date().toDateString(),c=mi(this._forecast,this._config.forecast_days),h=this.wet(n,e.attributes.precipitation_unit),d=[`${a(n.high)} / ${a(n.low)}`,h==="\u2013"?"":`${h} rain`].filter(Boolean).join(" \xB7 ");return u`<button class="hit" aria-label="${r}, ${t}" @click=${this.more}>
      <div class="hero ink">
        <div class="where">
          <div class="pcond">${r}</div>
          <div class="place">${e.attributes.friendly_name??""}</div>
        </div>
        <div class="big">
          <div class="ptemp">${t}</div>
          <div class="hl">${d}</div>
        </div>
      </div>
      <div class="days hv-frost ink" style="--n:${this._config.forecast_days}">
        ${c.length?c.map(p=>{let m=U(p.datetime),f=m.toDateString()===l?"Today":m.toLocaleDateString(o,{weekday:"short"});return u`<div class="day">
                <span class="dh">${a(p.high)}</span><span class="dl">${a(p.low)}</span>
                <ha-icon .icon=${ft[p.condition??""]??"mdi:weather-partly-cloudy"}></ha-icon>
                <span class="dn">${f}</span>
              </div>`}):u`<div class="none">No forecast</div>`}
      </div>
    </button>`}wet(e,t){return e.rain!==void 0?`${Math.round(e.rain)}%`:e.amount!==void 0?`${Math.round(e.amount*10)/10}${t?` ${t}`:""}`:"\u2013"}};ue.properties={...C.properties,_forecast:{state:!0},_now:{state:!0}},ue.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"weather"}}}},{name:"show_time",label:"Show the time and date",selector:{boolean:{}}},{name:"forecast_days",label:"Forecast days",helper:"1-7 days in a row: turns the card into a full weather page",selector:{number:{min:1,max:7,mode:"box"}}}],ue.styles=[z,S`
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
    `];customElements.define("homeview-weather-card",ue);O("homeview-weather-card","HomeView Weather","Time, temperature, condition and today's high, low and rain chance on liquid glass, or a full page with the next days.");var Fr=["strip","day","list"],Bi=["#ff9f0a","#30d158","#0a84ff","#bf5af2","#ff375f","#64d2ff"],Gi=900*1e3,Hr=30*1e3,Nr=190,Je={pad:.07,head:.13,gap:.03,row:.22},qi={edge:.045,row:.227},Ct=s=>(s.entities??[]).map(i=>typeof i=="string"?{entity:i}:i).map((i,e)=>({entity:i.entity,color:i.color??Bi[e%Bi.length]})),me=class extends C{constructor(){super(...arguments);this._error="";this._width=0;this._height=0;this._now=new Date;this.fetchedAt=0;this.fetchedFor="";this.calendarStates="";this.run=0;this.tick=0;this.minute=()=>{this.tick=0,this.onScreen&&(this._now=new Date,this.refresh(),this.tick=window.setTimeout(this.minute,6e4-Date.now()%6e4+50))}}static getStubConfig(e){return{entities:Object.keys(e.states).filter(t=>R(t)==="calendar").slice(0,2),grid_options:{columns:"full",rows:2}}}validate(e){if(!Array.isArray(e.entities)||!e.entities.length)throw new Error("Add one or more calendar entities");for(let t of Ct(e))if(!t.entity||R(t.entity)!=="calendar")throw new Error(`Not a calendar: ${t.entity}`);if(e.layout&&!Fr.includes(e.layout))throw new Error(`Unknown layout: ${e.layout} (strip, day or list)`)}get kind(){var e;return((e=this._config)==null?void 0:e.layout)??"strip"}getGridOptions(){return this.kind==="day"?{columns:12,rows:4,min_columns:6,min_rows:3}:this.kind==="list"?{columns:"full",rows:8,min_columns:6,min_rows:4}:{columns:"full",rows:2,min_columns:6,min_rows:1}}get square(){return!1}get bare(){return this.kind==="list"}refFrom(e,t){return this._width=e,this._height=t,this.kind==="day"?Math.min(t,e*.5):this.kind==="list"?Math.min(e/2,t):Math.min(e,t*2)}room(){let e=this._width,t=this._height;if(!e||!t)return 1;if(this.kind==="strip")return Math.max(1,Math.floor(e*.82/Nr));let r=this.refFrom(e,t);return this.kind==="day"?Math.max(1,Math.floor((t-r*(2*Je.pad+Je.head+Je.gap)+1)/(r*Je.row))):Math.max(1,Math.floor((t-r*2*qi.edge+1)/(r*qi.row)))}cardClass(){return`calendar ${this.kind}`}connectedCallback(){super.connectedCallback(),this.resume()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.tick),this.tick=0,this.run++,this.fetchedFor=""}resume(){!this.onScreen||!this.hass||!this._config||(this.refresh(),this.tick||this.minute())}updated(e){var t;(t=super.updated)==null||t.call(this,e),(e.has("hass")||e.has("_config"))&&this.resume()}refresh(){let e=this._config,t=Ct(e).map(o=>o.entity),r=JSON.stringify([t,e.days??7]),n=t.map(o=>{var l,c;return`${(l=this.hass.states[o])==null?void 0:l.state}|${((c=this.hass.states[o])==null?void 0:c.attributes.message)??""}`}).join(",");(r!==this.fetchedFor||n!==this.calendarStates||Date.now()-this.fetchedAt>Gi)&&(this.fetchedFor=r,this.calendarStates=n,this.fetchedAt=Date.now(),this.fetch(t,e.days??7,++this.run))}async fetch(e,t,r){try{let n=await G(this.hass.callWS({type:"call_service",domain:"calendar",service:"get_events",target:{entity_id:e},service_data:{duration:{days:t}},return_response:!0}),Hr);if(r!==this.run)return;this._events=e.flatMap(a=>{var o,l;return(((l=(o=n.response)==null?void 0:o[a])==null?void 0:l.events)??[]).map(c=>({...c,calendar:a}))}),this._error=""}catch(n){if(r!==this.run)return;this._error=(n==null?void 0:n.message)??String(n),this.fetchedAt=Date.now()-Gi+6e4,console.warn("HomeView calendar:",n)}}renderContent(){let e=this._config;if(!this.hass)return g;let t=Object.fromEntries(Ct(e).map(p=>[p.entity,p.color])),r=p=>t[p.calendar??""]??"#fff",n=this.hass.language,a=Math.min(e.count??(this.kind==="strip"?3:1/0),this.room()),o=p=>u`<div class="note ink">${p}</div>`,l=this._events?void 0:o(this._error?"Calendar unavailable":"Loading\u2026");if(this.kind==="day")return this.renderDay(a,r,l);if(this.kind==="list")return this.renderList(a,r,l);let c=u`<div class="head ink">${y.calendar}<span>${e.title??"Up next"}</span></div>`,h=this._events?Ue(this._events,this._now,a):[],d;return l?d=l:h.length?d=u`${h.map(p=>{let m=Be(p,this._now,n);return u`<div class="event ${m.today?"today":""}">
          <div class="badge"><span class="wd">${m.label}</span><span class="day">${m.day}</span></div>
          <div class="text ink">
            <div class="summary">${oe(p)}</div>
            <div class="when"><i style="background:${r(p)}"></i>${Se(p,n)}</div>
          </div>
        </div>`})}`:d=o("Nothing coming up"),u`<div class="strip" title=${this._error||g}>${c}${d}</div>`}renderDay(e,t,r){let n=this._config,a=this.hass.language,o=this._events?gi(this._events,this._now,e):{today:0,events:[]},l=o.events,c=o.today-Math.min(o.today,l.length),h=r?"":o.today?c>0?`+${c} more today`:"":l.length?"Nothing else today":"",d=m=>{let f=gt(m,this._now);return f===0?Se(m,a):`${f===1?X(vt(m,this._now,a)):Be(m,this._now,a).weekday} \xB7 ${Se(m,a)}`},p;return r?p=r:l.length?p=u`${l.map(m=>u`<div class="row ${U(m.start)<=this._now?"now":""}">
          <i class="bar" style="background:${t(m)}"></i>
          <div class="text ink">
            <div class="summary">${oe(m)}</div>
            <div class="when">${d(m)}</div>
          </div>
        </div>`)}`:p=u`<div class="note ink">Nothing coming up</div>`,u`<div class="dayview" title=${this._error||g}>
      <div class="dhead ink">
        ${y.calendar}<span class="dtitle">${n.title??(o.today||r?"Today":"Up next")}</span>
        <span class="aside">${h}</span>
      </div>
      <div class="rows">${p}</div>
    </div>`}renderList(e,t,r){let n=this.hass.language,a=this._events?Ue(this._events,this._now,e):[],o="",l=a.map(c=>{let h=Be(c,this._now,n),d=h.key!==o;return o=h.key,u`<div class="lrow">
        <div class="lbadge ${d&&h.today?"hv-frost today":""}">
          ${d?u`<small>${h.weekday}</small><b>${h.day}</b><small class="mon">${h.month}</small>`:g}
        </div>
        <i class="rule"></i>
        <div class="text">
          <div class="ltitle">${oe(c)}</div>
          <div class="lwhen"><i style="background:${t(c)}"></i>${Se(c,n)}</div>
        </div>
        <div class="rel">${d?vt(c,this._now,n):""}</div>
      </div>`});return u`<div class="agenda ink" title=${this._error||g}>
      ${r??(l.length?l:u`<div class="note">Nothing coming up</div>`)}
    </div>`}};me.properties={...C.properties,_events:{state:!0},_error:{state:!0},_width:{state:!0},_height:{state:!0},_now:{state:!0}},me.editorFields=[{name:"entities",label:"Calendars",required:!0,selector:{entity:{multiple:!0,filter:{domain:"calendar"}}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"strip",label:"Strip: the next events in a row"},{value:"day",label:"Day: today, else what's next"},{value:"list",label:"List: a full-page agenda"}]}}},{name:"title",helper:"Strip and day: defaults to Up next, or Today",selector:{text:{}}},{name:"days",label:"Days ahead",selector:{number:{min:1,max:60,mode:"box"}}},{name:"count",label:"Most events shown",selector:{number:{min:1,max:6,mode:"box"}}}],me.styles=[z,S`
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
    `];customElements.define("homeview-calendar-card",me);O("homeview-calendar-card","HomeView Up Next","The next events from your calendars: a liquid-glass strip, a day panel, or a full-page agenda.");var ji=2,fe=class extends C{constructor(){super(...arguments);this._src="";this.loading="";this._fails=0;this.timer=0;this.onVisible=()=>this.resume();this.snap=()=>{this.timer=0;let e=this._config;if(!e||!this.hass||!this.onScreen||document.visibilityState==="hidden")return;let t=Math.max(2,e.refresh??10);this.timer=window.setTimeout(this.snap,t*1e3);let r=this.hass.states[e.entity],n=r&&!L(r)?r.attributes.entity_picture:void 0;if(!n){this._src="";return}let a=this.hass.hassUrl(vi(n,Date.now(),t));if(a===this._src||a===this.loading)return;this.loading=a;let o=new Image;o.onload=()=>{this.loading===a&&(this._src=a,this._fails=0)},o.onerror=()=>{this.loading===a&&(this.loading="",this._fails++)},o.src=a};this.tap=()=>{let e=this._config,t=e.tap_action??"live";if(t==="none"||!this.hass)return;let r=this.hass.states[e.entity];if(t==="more-info"||!r||L(r)||le(this)){F(this,"hass-more-info",{entityId:e.entity});return}if(this.live)return;let n=document.createElement("homeview-camera-live");n.hass=this.hass,n.entity=e.entity,n.name=this.name(),n.onClosed=()=>{var a;this.live=void 0,this.isConnected&&((a=this.renderRoot.querySelector("ha-card"))==null||a.focus({preventScroll:!0}))},this.live=n,de(n)};this.onKey=e=>{e.key!=="Enter"&&e.key!==" "||(e.preventDefault(),this.tap())}}static getStubConfig(e){return{entity:Object.keys(e.states).find(t=>R(t)==="camera")??""}}validate(e){if(!e.entity||R(e.entity)!=="camera")throw new Error("Pick a camera entity")}getGridOptions(){return{columns:6,rows:"auto",min_columns:3,min_rows:2}}connectedCallback(){super.connectedCallback(),this.resume(),document.addEventListener("visibilitychange",this.onVisible)}disconnectedCallback(){var e;super.disconnectedCallback(),clearTimeout(this.timer),this.timer=0,document.removeEventListener("visibilitychange",this.onVisible),(e=this.live)==null||e.close()}resume(){this.timer||this.snap()}updated(e){var t;(t=super.updated)==null||t.call(this,e),e.has("_config")&&(this._src="",this._fails=0,clearTimeout(this.timer),this.timer=0),this.timer||this.snap(),this.live&&e.has("hass")&&this.hass&&(this.live.hass=this.hass)}name(){let e=this._config;return e.name??(this.hass?W(this.hass,e.entity):e.entity)}render(){let e=this._config;if(!e||!this.hass)return u``;let t=this.hass.states[e.entity],r=!t||L(t),n=this.name(),a=e.fit??"cover",o=a==="cover"?Math.min(20,Math.max(0,Number(e.crop_top)||0)):0,l=this._fails>=ji?"":this._src,c=t?r?"Offline":this._fails>=ji?"Not responding":"Loading\u2026":"Camera not found";return u`<ha-card
      class="camera ${this.square?"square":""} ${l?"shown":""}"
      role="button"
      tabindex="0"
      aria-label="${n}: ${r?"offline":"open the live view"}"
      @click=${this.tap}
      @keydown=${this.onKey}
    >
      ${l?u`<img src=${l} alt="" draggable="false" style="object-fit:${a};top:${-o}%;height:${100+o}%" />`:g}
      ${!l||r?u`<div class="empty">${y.camera}<span>${c}</span></div>`:g}
      <div class="name">${n}</div>
    </ha-card>`}renderContent(){return g}};fe.properties={...C.properties,_src:{state:!0},_fails:{state:!0}},fe.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"camera"}}}},{name:"name",selector:{text:{}}},{name:"refresh",label:"Seconds between snapshots",selector:{number:{min:2,max:600,mode:"box",unit_of_measurement:"s"}}},{name:"fit",selector:{select:{mode:"dropdown",options:[{value:"cover",label:"Fill"},{value:"contain",label:"Fit whole picture"}]}}},{name:"crop_top",label:"Hide the top (percent, when filling)",selector:{number:{min:0,max:20,mode:"box",unit_of_measurement:"%"}}},{name:"tap_action",label:"Tap action",selector:{select:{mode:"dropdown",options:[{value:"live",label:"Live view, full screen"},{value:"more-info",label:"More info"},{value:"none",label:"Nothing"}]}}}],fe.styles=[z,S`
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
    `];async function Ur(s){if(customElements.get("ha-camera-stream"))return!0;try{let i=window.loadCardHelpers;return i?((await i()).createCardElement({type:"picture-entity",entity:s,camera_view:"live"}),await G(customElements.whenDefined("ha-camera-stream"),5e3),!0):!1}catch{return!1}}var Pe=class extends D{constructor(){super(...arguments);this.entity="";this.name="";this.label="Camera live view";this.closeLabel="Close live view";this.openMs=600*1e3}connectedCallback(){super.connectedCallback(),Ur(this.entity).then(e=>this._player=e)}closed(){var e;(e=this.onClosed)==null||e.call(this)}renderBody(){var r;let e=(r=this.hass)==null?void 0:r.states[this.entity],t=g;return e&&this.hass&&this._player?t=u`<ha-camera-stream .hass=${this.hass} .stateObj=${e} .muted=${!0} .controls=${!1} fit-mode="contain"></ha-camera-stream>`:e&&this.hass&&this._player===!1&&(t=u`<img src=${this.hass.hassUrl(`/api/camera_proxy_stream/${this.entity}?token=${e.attributes.access_token}`)} alt="" draggable="false" />`),u`${t}${this._chrome?u`<div class="title">${this.name}</div>`:g}`}};Pe.properties={...D.properties,hass:{attribute:!1},_player:{state:!0}},Pe.styles=[D.overlayStyles,S`
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
    `];customElements.get("homeview-camera-live")||customElements.define("homeview-camera-live",Pe);customElements.define("homeview-camera-card",fe);O("homeview-camera-card","HomeView Camera","Camera snapshot tile; tap for the live view full screen.");var Br=4,Gr=16,qr=32,jr=256,Wr=512,Vr=8192,Kr=500;function Wi(s,i){var t,r;let e=(r=(t=s.entities)==null?void 0:t[i])==null?void 0:r.device_id;return e?Object.entries(s.entities??{}).filter(([n,a])=>a.device_id===e&&n!==i&&s.states[n]).map(([n])=>n):[]}function Vi(s,i){var n,a;let e=i.battery??Wi(s,i.entity).find(o=>R(o)==="sensor"&&s.states[o].attributes.device_class==="battery"),t=e?(n=s.states[e])==null?void 0:n.state:(a=s.states[i.entity])==null?void 0:a.attributes.battery_level,r=Number(t);return t==null||t===""||!isFinite(r)?void 0:r}function Yr(s,i){return i.map?i.map:Wi(s,i.entity).find(e=>(R(e)==="image"||R(e)==="camera")&&!L(s.states[e])&&s.states[e].attributes.entity_picture)}var Le=class extends C{constructor(){super(...arguments);this.holdTimer=0;this.held=!1;this.down=()=>{this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=window.setTimeout(()=>{this.held=!0,F(this,"hass-more-info",{entityId:this._config.entity})},Kr)};this.up=()=>clearTimeout(this.holdTimer);this.tap=()=>{if(this.held){this.held=!1;return}if(!this.hass||this.panel)return;if(le(this))return F(this,"hass-more-info",{entityId:this._config.entity});let e=document.createElement("homeview-vacuum-panel");e.hass=this.hass,e.config=this._config,e.onClosed=()=>{var t;this.panel=void 0,this.isConnected&&((t=this.renderRoot.querySelector("button"))==null||t.focus({preventScroll:!0}))},this.panel=e,de(e)}}static getStubConfig(e){return{entity:Object.keys(e.states).find(t=>R(t)==="vacuum")??""}}validate(e){if(!e.entity||R(e.entity)!=="vacuum")throw new Error("Pick a vacuum entity")}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.panel)==null||e.close()}updated(e){var t;(t=super.updated)==null||t.call(this,e),this.panel&&e.has("hass")&&this.hass&&(this.panel.hass=this.hass)}cardClass(){var r;let e=(r=this.hass)==null?void 0:r.states[this._config.entity];return`tile vacuum ${!!e&&bt.includes(e.state)?"on":""} ${(e==null?void 0:e.state)==="cleaning"?"cleaning":""} ${L(e)?"unavailable":""}`}renderContent(){let e=this._config;if(!this.hass)return g;let t=this.hass.states[e.entity],r=e.name??(t?W(this.hass,e.entity):e.entity),n=t?yt(t.state,Vi(this.hass,e)):"Entity not found";return u`<button
      class="hit"
      aria-label="${r}, ${n}"
      aria-haspopup="dialog"
      ?disabled=${!t}
      @pointerdown=${this.down}
      @pointerup=${this.up}
      @pointerleave=${this.up}
      @pointercancel=${this.up}
      @click=${this.tap}
      @contextmenu=${a=>a.preventDefault()}
    >
      <span class="icon">${y.vacuum}</span>
      <span class="label ink"><span class="title">${r}</span><br /><span class="sub">${n}</span></span>
    </button>`}};Le.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"vacuum"}}}},{name:"name",selector:{text:{}}},{name:"battery",helper:"Defaults to the robot's own battery sensor",selector:{entity:{filter:{domain:"sensor",device_class:"battery"}}}},{name:"map",helper:"Defaults to the robot's own map image",selector:{entity:{filter:{domain:["image","camera"]}}}},{name:"modes",label:"Mode choices",helper:"Select entities offered in the panel, such as mop mode or intensity",selector:{entity:{multiple:!0,filter:{domain:"select"}}}}],Le.styles=[...J.styles,S`
      ha-card.vacuum.on .icon {
        color: #0a9d8f;
      }
      ha-card.cleaning .icon svg {
        animation: spin 2.4s linear infinite;
      }
    `];var Oe=class extends D{constructor(){super(...arguments);this._picked=[];this.label="Vacuum";this.closeLabel="Close vacuum";this.openMs=1800*1e3;this.ownClose=!0;this.start=()=>{let e=bi(this._picked);e.length?(this.call("vacuum","send_command",{command:"app_segment_clean",params:[{segments:e,repeat:1}]}),this._picked=[]):this.call("vacuum","start")}}connectedCallback(){super.connectedCallback(),this.loadRooms()}closed(){var e;(e=this.onClosed)==null||e.call(this)}async loadRooms(){var t,r;let e=this.config;if(!(!this.hass||((r=(t=this.hass.entities)==null?void 0:t[e.entity])==null?void 0:r.platform)!=="roborock"))try{let n=await G(this.hass.callWS({type:"vacuum/get_segments",entity_id:e.entity}),15e3);this._rooms=n.segments??[]}catch(n){console.warn("HomeView vacuum: no rooms",n),this._rooms=[]}}call(e,t,r={},n=this.config.entity){var a;(a=this.hass)==null||a.callService(e,t,r,{entity_id:n})}toggleRoom(e){this._picked=this._picked.includes(e)?this._picked.filter(t=>t!==e):[...this._picked,e]}chips(e,t,r,n=!1){return u`<div class="chips">
      ${e.map(a=>u`<button class="chip ${a===t?"on":""}" ?disabled=${n} aria-pressed=${String(a===t)} @click=${()=>r(a)}>${X(a)}</button>`)}
    </div>`}renderBody(){var k,T;let e=this.config,t=this.hass,r=t==null?void 0:t.states[e.entity];if(!t||!r)return u`<div class="scrim" @click=${()=>this.close()}></div>`;let n=Number(r.attributes.supported_features)||0,a=L(r),o=bt.includes(r.state),l=Vi(t,e),c=e.name??W(t,e.entity),h=Yr(t,e),d=h?(k=t.states[h])==null?void 0:k.attributes.entity_picture:void 0,p=(r.attributes.fan_speed_list??[]).filter(w=>w!=="custom"),m=(w,A,x,v,b=!1)=>v?u`<button class="act ${b?"primary":""}" ?disabled=${a} @click=${x}>${A}<span>${w}</span></button>`:g,f=this._picked.length;return u`<div class="scrim" @click=${()=>this.close()}></div>
      <section class="sheet" @pointerdown=${w=>w.stopPropagation()} @touchmove=${w=>w.stopPropagation()}>
        <header>
          <span class="robot ${r.state==="cleaning"?"cleaning":""}">${y.vacuum}</span>
          <div>
            <h2>${yt(r.state)}</h2>
            <p>${[c,l===void 0?"":`${Math.round(l)}% battery`].filter(Boolean).join(" \xB7 ")}</p>
          </div>
          ${this.closeButton()}
        </header>
        <div class="cols ${d?"":"nomap"}">
          ${d?u`<div class="map"><img src=${t.hassUrl(d)} alt="Map" draggable="false" /></div>`:g}
          <div class="controls">
            <div class="acts">
              ${m(r.state==="paused"?"Resume":f?`Clean ${f} room${f>1?"s":""}`:"Start",u`<span class="g">${y.start}</span>`,this.start,!!(n&Vr)&&r.state!=="cleaning",!0)}
              ${m("Pause",u`<span class="g">${y.pause}</span>`,()=>this.call("vacuum","pause"),!!(n&Br)&&r.state==="cleaning")}
              ${m("Dock",u`<span class="g">${y.home}</span>`,()=>this.call("vacuum","return_to_base"),!!(n&Gr)&&(o||r.state==="idle"||r.state==="error"))}
              ${m("Locate",u`<span class="g">${y.locate}</span>`,()=>this.call("vacuum","locate"),!!(n&Wr))}
            </div>
            ${(T=this._rooms)!=null&&T.length&&n&jr&&!o?u`<h3>Rooms</h3>
                  <div class="chips">
                    <button class="chip ${f?"":"on"}" aria-pressed=${String(!f)} @click=${()=>this._picked=[]}>Entire home</button>
                    ${this._rooms.map(w=>u`<button class="chip ${this._picked.includes(w.id)?"on":""}" aria-pressed=${String(this._picked.includes(w.id))} @click=${()=>this.toggleRoom(w.id)}>${w.name}</button>`)}
                  </div>`:g}
            ${p.length&&n&qr?u`<h3>Suction</h3>
                  ${this.chips(p,r.attributes.fan_speed,w=>this.call("vacuum","set_fan_speed",{fan_speed:w}),a)}`:g}
            ${(e.modes??[]).map(w=>{let A=t.states[w];if(!A)return g;let x=(A.attributes.options??[]).filter(b=>b!=="custom"),v=W(t,w).replace(W(t,e.entity),"").trim()||w;return u`<h3>${X(v)}</h3>
                ${this.chips(x,A.state,b=>this.call("select","select_option",{option:b},w),L(A))}`})}
          </div>
        </div>
      </section>`}};Oe.properties={...D.properties,hass:{attribute:!1},_rooms:{state:!0},_picked:{state:!0}},Oe.styles=[D.overlayStyles,S`
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
    `];customElements.get("homeview-vacuum-panel")||customElements.define("homeview-vacuum-panel",Oe);customElements.define("homeview-vacuum-card",Le);O("homeview-vacuum-card","HomeView Vacuum","Robot vacuum tile with a glass panel: map, rooms, start / pause / dock and suction.");customElements.get("homeview-card-editor")||customElements.define("homeview-card-editor",Ce);console.info("%c HOMEVIEW %c 0.1.7 ","background:#928980;color:#fff;border-radius:3px 0 0 3px","background:#2b241d;color:#fff;border-radius:0 3px 3px 0");
