var vt=globalThis,bt=vt.ShadowRoot&&(vt.ShadyCSS===void 0||vt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$t=Symbol(),Yt=new WeakMap,st=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==$t)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(bt&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=Yt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Yt.set(t,e))}return e}toString(){return this.cssText}},Zt=s=>new st(typeof s=="string"?s:s+"",void 0,$t),R=(s,...e)=>{let t=s.length===1?s[0]:e.reduce((i,r,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[n+1],s[0]);return new st(t,s,$t)},Qt=(s,e)=>{if(bt)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),r=vt.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)}},Mt=bt?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Zt(t)})(s):s;var{is:Xe,defineProperty:Ye,getOwnPropertyDescriptor:Ze,getOwnPropertyNames:Qe,getOwnPropertySymbols:ti,getPrototypeOf:ei}=Object,B=globalThis,te=B.trustedTypes,ii=te?te.emptyScript:"",St=B.reactiveElementPolyfillSupport,nt=(s,e)=>s,At={toAttribute(s,e){switch(e){case Boolean:s=s?ii:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},ie=(s,e)=>!Xe(s,e),ee={attribute:!0,type:String,converter:At,reflect:!1,useDefault:!1,hasChanged:ie};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),B.litPropertyMetadata??(B.litPropertyMetadata=new WeakMap);var U=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&Ye(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){let{get:r,set:n}=Ze(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){let a=r==null?void 0:r.call(this);n==null||n.call(this,o),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ee}static _$Ei(){if(this.hasOwnProperty(nt("elementProperties")))return;let e=ei(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(nt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(nt("properties"))){let t=this.properties,i=[...Qe(t),...ti(t)];for(let r of i)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let r of i)t.unshift(Mt(r))}else e!==void 0&&t.push(Mt(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Qt(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var n;let i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){let o=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:At).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){var n,o;let i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let a=i.getPropertyOptions(r),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:At;this._$Em=r;let h=l.fromAttribute(t,a.type);this[r]=h??((o=this._$Ej)==null?void 0:o.get(r))??h,this._$Em=null}}requestUpdate(e,t,i,r=!1,n){var o;if(e!==void 0){let a=this.constructor;if(r===!1&&(n=this[e]),i??(i=a.getPropertyOptions(e)),!((i.hasChanged??ie)(n,t)||i.useDefault&&i.reflect&&n===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:n},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[n,o]of r){let{wrapped:a}=o,l=this[n];a!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,o,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};U.elementStyles=[],U.shadowRootOptions={mode:"open"},U[nt("elementProperties")]=new Map,U[nt("finalized")]=new Map,St==null||St({ReactiveElement:U}),(B.reactiveElementVersions??(B.reactiveElementVersions=[])).push("2.1.2");var at=globalThis,re=s=>s,yt=at.trustedTypes,se=yt?yt.createPolicy("lit-html",{createHTML:s=>s}):void 0,he="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,de="?"+N,ri=`<${de}>`,j=document,lt=()=>j.createComment(""),ct=s=>s===null||typeof s!="object"&&typeof s!="function",Ht=Array.isArray,si=s=>Ht(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",Ct=`[ 	
\f\r]`,ot=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ne=/-->/g,oe=/>/g,G=RegExp(`>|${Ct}(?:([^\\s"'>=/]+)(${Ct}*=${Ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ae=/'/g,le=/"/g,pe=/^(?:script|style|textarea|title)$/i,It=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),y=It(1),k=It(2),Oi=It(3),W=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),ce=new WeakMap,q=j.createTreeWalker(j,129);function ue(s,e){if(!Ht(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return se!==void 0?se.createHTML(e):e}var ni=(s,e)=>{let t=s.length-1,i=[],r,n=e===2?"<svg>":e===3?"<math>":"",o=ot;for(let a=0;a<t;a++){let l=s[a],h,p,c=-1,d=0;for(;d<l.length&&(o.lastIndex=d,p=o.exec(l),p!==null);)d=o.lastIndex,o===ot?p[1]==="!--"?o=ne:p[1]!==void 0?o=oe:p[2]!==void 0?(pe.test(p[2])&&(r=RegExp("</"+p[2],"g")),o=G):p[3]!==void 0&&(o=G):o===G?p[0]===">"?(o=r??ot,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,h=p[1],o=p[3]===void 0?G:p[3]==='"'?le:ae):o===le||o===ae?o=G:o===ne||o===oe?o=ot:(o=G,r=void 0);let v=o===G&&s[a+1].startsWith("/>")?" ":"";n+=o===ot?l+ri:c>=0?(i.push(h),l.slice(0,c)+he+l.slice(c)+N+v):l+N+(c===-2?a:v)}return[ue(s,n+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},ht=class s{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let n=0,o=0,a=e.length-1,l=this.parts,[h,p]=ni(e,t);if(this.el=s.createElement(h,i),q.currentNode=this.el.content,t===2||t===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=q.nextNode())!==null&&l.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(let c of r.getAttributeNames())if(c.endsWith(he)){let d=p[o++],v=r.getAttribute(c).split(N),m=/([.?@])?(.*)/.exec(d);l.push({type:1,index:n,name:m[2],strings:v,ctor:m[1]==="."?Pt:m[1]==="?"?Rt:m[1]==="@"?Ot:X}),r.removeAttribute(c)}else c.startsWith(N)&&(l.push({type:6,index:n}),r.removeAttribute(c));if(pe.test(r.tagName)){let c=r.textContent.split(N),d=c.length-1;if(d>0){r.textContent=yt?yt.emptyScript:"";for(let v=0;v<d;v++)r.append(c[v],lt()),q.nextNode(),l.push({type:2,index:++n});r.append(c[d],lt())}}}else if(r.nodeType===8)if(r.data===de)l.push({type:2,index:n});else{let c=-1;for(;(c=r.data.indexOf(N,c+1))!==-1;)l.push({type:7,index:n}),c+=N.length-1}n++}}static createElement(e,t){let i=j.createElement("template");return i.innerHTML=e,i}};function J(s,e,t=s,i){var o,a;if(e===W)return e;let r=i!==void 0?(o=t._$Co)==null?void 0:o[i]:t._$Cl,n=ct(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==n&&((a=r==null?void 0:r._$AO)==null||a.call(r,!1),n===void 0?r=void 0:(r=new n(s),r._$AT(s,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=J(s,r._$AS(s,e.values),r,i)),e}var Tt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??j).importNode(t,!0);q.currentNode=r;let n=q.nextNode(),o=0,a=0,l=i[0];for(;l!==void 0;){if(o===l.index){let h;l.type===2?h=new dt(n,n.nextSibling,this,e):l.type===1?h=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(h=new Lt(n,this,e)),this._$AV.push(h),l=i[++a]}o!==(l==null?void 0:l.index)&&(n=q.nextNode(),o++)}return q.currentNode=j,r}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},dt=class s{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),ct(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==W&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):si(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&ct(this._$AH)?this._$AA.nextSibling.data=e:this.T(j.createTextNode(e)),this._$AH=e}$(e){var n;let{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ht.createElement(ue(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===r)this._$AH.p(t);else{let o=new Tt(r,this),a=o.u(this.options);o.p(t),this.T(a),this._$AH=o}}_$AC(e){let t=ce.get(e.strings);return t===void 0&&ce.set(e.strings,t=new ht(e)),t}k(e){Ht(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,r=0;for(let n of e)r===t.length?t.push(i=new s(this.O(lt()),this.O(lt()),this,this.options)):i=t[r],i._$AI(n),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){let r=re(e).nextSibling;re(e).remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}},X=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,n){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=g}_$AI(e,t=this,i,r){let n=this.strings,o=!1;if(n===void 0)e=J(this,e,t,0),o=!ct(e)||e!==this._$AH&&e!==W,o&&(this._$AH=e);else{let a=e,l,h;for(e=n[0],l=0;l<n.length-1;l++)h=J(this,a[i+l],t,l),h===W&&(h=this._$AH[l]),o||(o=!ct(h)||h!==this._$AH[l]),h===g?e=g:e!==g&&(e+=(h??"")+n[l+1]),this._$AH[l]=h}o&&!r&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Pt=class extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}},Rt=class extends X{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}},Ot=class extends X{constructor(e,t,i,r,n){super(e,t,i,r,n),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??g)===W)return;let i=this._$AH,r=e===g&&i!==g||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==g&&(i===g||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}},Lt=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}};var Et=at.litHtmlPolyfillSupport;Et==null||Et(ht,dt),(at.litHtmlVersions??(at.litHtmlVersions=[])).push("3.3.3");var fe=(s,e,t)=>{let i=(t==null?void 0:t.renderBefore)??e,r=i._$litPart$;if(r===void 0){let n=(t==null?void 0:t.renderBefore)??null;i._$litPart$=r=new dt(e.insertBefore(lt(),n),n,void 0,t??{})}return r._$AI(s),r};var V=globalThis,H=class extends U{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=fe(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return W}},me;H._$litElement$=!0,H.finalized=!0,(me=V.litElementHydrateSupport)==null||me.call(V,{LitElement:H});var zt=V.litElementPolyfillSupport;zt==null||zt({LitElement:H});(V.litElementVersions??(V.litElementVersions=[])).push("4.2.2");function pt(s,e,t={}){s.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}var Y=s=>s.split(".")[0];function wt(s,e){var r,n,o,a,l;let t=(r=s.entities)==null?void 0:r[e],i=(t==null?void 0:t.area_id)??(t!=null&&t.device_id?(o=(n=s.devices)==null?void 0:n[t.device_id])==null?void 0:o.area_id:void 0);return i?(l=(a=s.areas)==null?void 0:a[i])==null?void 0:l.name:void 0}function ge(s,e){var t;return((t=s.states[e])==null?void 0:t.attributes.friendly_name)??e}var Z=s=>!s||s.state==="unavailable"||s.state==="unknown";function I(s,e,t){let i=window;i.customCards??(i.customCards=[]),i.customCards.push({type:s,name:e,description:t,preview:!0})}var oi=s=>{var e;return s.media_class==="image"||!!((e=s.media_content_type)!=null&&e.startsWith("image/"))};function Ft(s){let e=s.attributes;return typeof e.temperature=="number"?{mode:"single",value:e.temperature}:typeof e.target_temp_low=="number"&&typeof e.target_temp_high=="number"?{mode:"dual",low:e.target_temp_low,high:e.target_temp_high}:{mode:"none"}}function ve(s,e,t,i){let r=Math.round(s/e)*e;return+Math.min(i,Math.max(t,r)).toFixed(e<1?1:0)}function be(s){let e=s.attributes;if(e.hvac_action==="cooling")return"high";if(e.hvac_action==="heating")return"low";let t=e.current_temperature;return typeof t=="number"&&typeof e.target_temp_low=="number"&&typeof e.target_temp_high=="number"&&Math.abs(t-e.target_temp_high)<Math.abs(t-e.target_temp_low)?"high":"low"}function Ut(s,e){switch(s){case"lock":return e!=="locked"&&e!=="locking";case"cover":return e==="open"||e==="opening";case"scene":return!1;default:return e==="on"}}function ye(s,e){switch(s){case"lock":return e==="locked"?["lock","unlock"]:["lock","lock"];case"scene":return["scene","turn_on"];case"script":return e==="on"?["script","turn_off"]:["script","turn_on"];case"cover":return["cover","toggle"];case"light":case"switch":case"fan":case"input_boolean":return[s,"toggle"];default:return["homeassistant","toggle"]}}function we(s,e,t){let i=e+t/60;return{h:(s%12+i/60)*30,m:i*6,s:t*6}}function Dt(s,e=new Date){if(!s)return{h:e.getHours(),m:e.getMinutes(),s:e.getSeconds(),ms:e.getMilliseconds()};let t=new Intl.DateTimeFormat("en-GB",{timeZone:s,hour:"numeric",minute:"numeric",second:"numeric",hourCycle:"h23"}).formatToParts(e),i=r=>{var n;return+(((n=t.find(o=>o.type===r))==null?void 0:n.value)??0)};return{h:i("hour"),m:i("minute"),s:i("second"),ms:e.getMilliseconds()}}function K(s){return(Array.isArray(s)?s:[s]).filter(t=>typeof t=="string").map(t=>t.trim()).filter(Boolean)}async function xe(s,e,t){let i=new Set,r=K(e).map(a=>[a,0]),n=0,o;for(;r.length&&i.size<5e4;){let[a,l]=r.shift(),h;try{h=await s.callWS({type:"media_source/browse_media",media_content_id:a})}catch(p){if(l>0)throw p;o??(o=p);continue}l===0&&n++;for(let p of h.children??[])if(oi(p)?i.add(p.media_content_id):t&&p.can_expand&&l<3&&r.push([p.media_content_id,l+1]),i.size>=5e4)break}if(!n&&o)throw o;return[...i]}function _e(s,e){let t={...s};for(let i of e)i in t&&!Array.isArray(t[i])&&(t[i]=K(t[i]));return t}function ke(s,e){let t={...s};for(let i of e){if(!(i in t))continue;let r=t[i];if(Array.isArray(r)&&r.some(o=>typeof o!="string"||!o.trim()))continue;let n=K(r);n.length?t[i]=n.length===1?n[0]:n:delete t[i]}return t}function $e(s,e=Math.random){let t=s.slice();for(let i=t.length-1;i>0;i--){let r=Math.floor(e()*(i+1));[t[i],t[r]]=[t[r],t[i]]}return t}function Me(s,e){switch(e.type){case"run-start":return s==="idle"?"listening":s;case"stt-vad-end":case"stt-end":case"intent-start":return"thinking";case"tts-start":case"tts-end":return"responding";case"error":return"error";default:return s}}function ai(s){return s==="NotAllowedError"||s==="SecurityError"?"Microphone access was denied":s==="NotFoundError"?"No microphone found":s==="stt-no-text-recognized"?"Didn't catch that":s==="pipeline-not-found"?"Assist pipeline not found":s==="timeout"?"Assist timed out":s.startsWith("wake")?"Wake word detection failed":s.startsWith("stt")?"Couldn't recognize speech":s.startsWith("intent")?"Couldn't handle the request":s.startsWith("tts")?"Couldn't speak the reply":"Something went wrong"}function Se(s){let e=s??{},t=typeof e.code=="string"?e.code:typeof e.name=="string"?e.name:"",i=typeof e.message=="string"&&e.message||t||String(s);return{text:ai(t),detail:i}}function Ae(s){switch(s){case"listening":return"listening";case"processing":return"thinking";case"responding":return"responding";case void 0:case"unavailable":return"error";default:return"idle"}}var li=[{name:"",type:"expandable",flatten:!0,title:"Glass and wallpaper",schema:[{name:"wallpaper",label:"Wallpaper",helper:"Built-in champagne or teal, an image URL such as /local/wall.jpg, or 'view' to use the view background set in Home Assistant. A view background always wins.",selector:{select:{custom_value:!0,mode:"dropdown",options:[{value:"champagne",label:"Champagne (built-in)"},{value:"teal",label:"Teal (built-in)"},{value:"view",label:"View background"}]}}},{name:"glass",label:"Glass rendering",helper:"Auto pre-renders the refraction (fast, works everywhere). Live refracts in real time (Chromium only, GPU heavy). Frost is plain blur.",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (pre-rendered)"},{value:"live",label:"Live (Chromium)"},{value:"frost",label:"Frost"}]}}}]}],ci=s=>s.replace(/_/g," ").replace(/^./,e=>e.toUpperCase()),ut=class extends H{constructor(){super(...arguments);this.fields=[]}setConfig(t){this._config=t}render(){return!this.hass||!this._config?g:y`<ha-form
      .hass=${this.hass}
      .data=${_e(this._config,this.listNames())}
      .schema=${[...this.fields,...li]}
      .computeLabel=${t=>t.label??ci(t.name)}
      .computeHelper=${t=>t.helper}
      @value-changed=${this.changed}
    ></ha-form>`}listNames(){return this.fields.filter(t=>t.list).map(t=>t.name)}changed(t){t.stopPropagation();let i=ke({...t.detail.value},this.listNames());for(let[r,n]of Object.entries(i))(n===""||n===void 0||n===null)&&delete i[r];pt(this,"config-changed",{config:i})}};ut.properties={hass:{attribute:!1},fields:{attribute:!1},_config:{state:!0}};function hi(s,e=3){return Math.round((Math.sqrt(12*s*s/e+1)-1)/2)}function Ce(s,e,t=3){let i=hi(e,t);if(i<1)return s;let{width:r,height:n}=s,o=s.data,a=new Uint8ClampedArray(o.length),l=(h,p,c)=>{let d=c?r:n,v=c?n:r,m=c?4:r*4,x=2*i+1;for(let $=0;$<v;$++){let T=c?$*r*4:$*4;for(let E=0;E<4;E++){let w=0;for(let u=-i;u<=i;u++)w+=h[T+Math.min(d-1,Math.max(0,u))*m+E];for(let u=0;u<d;u++){p[T+u*m+E]=w/x;let f=Math.min(d-1,u+i+1),b=Math.max(0,u-i);w+=h[T+f*m+E]-h[T+b*m+E]}}}};for(let h=0;h<t;h++)l(o,a,!0),l(a,o,!1);return a=new Uint8ClampedArray(0),s}function Ee(s,e,t,i,r){let n=new Uint8ClampedArray(i*r*4);for(let o=0;o<r;o++){let a=Math.min(s.height-1,Math.max(0,t+o));for(let l=0;l<i;l++){let h=Math.min(s.width-1,Math.max(0,e+l)),p=(a*s.width+h)*4,c=(o*i+l)*4;n[c]=s.data[p],n[c+1]=s.data[p+1],n[c+2]=s.data[p+2],n[c+3]=s.data[p+3]}}return{width:i,height:r,data:n}}function Te(s,e,t,i,r,n){let o=e.width,a=e.height,l=s.width,h=s.height,p=s.data,c=e.data,d=new Uint8ClampedArray(o*a*4),v=(r.scale+r.aberration)*n,m=r.scale*n,x=Math.max(0,r.scale-r.aberration)*n,$=1.25,T=1.03,E=(w,u,f)=>{w=Math.min(l-1.001,Math.max(0,w)),u=Math.min(h-1.001,Math.max(0,u));let b=w|0,_=u|0,S=w-b,L=u-_,P=(_*l+b)*4+f,O=P+l*4;return(p[P]*(1-S)+p[P+4]*S)*(1-L)+(p[O]*(1-S)+p[O+4]*S)*L};for(let w=0;w<a;w++)for(let u=0;u<o;u++){let f=(w*o+u)*4;if(!c[f+3])continue;let b=c[f]/255-.5,_=c[f+1]/255-.5,S=t+u+.5,L=i+w+.5,P=E(S+v*b,L+v*_,0),O=E(S+m*b,L+m*_,1),F=E(S+x*b,L+x*_,2),D=.2126*P+.7152*O+.0722*F;P=(D+(P-D)*$)*T,O=(D+(O-D)*$)*T,F=(D+(F-D)*$)*T;let rt=c[f+2]/255*r.specular;d[f]=P+(255-P)*rt,d[f+1]=O+(255-O)*rt,d[f+2]=F+(255-F)*rt,d[f+3]=255}return{width:o,height:a,data:d}}function Pe(s){let e=n=>{let o=n/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4},t=0,i=0,r=s.data;for(let n=0;n<r.length;n+=16)r[n+3]!==0&&(t+=.2126*e(r[n])+.7152*e(r[n+1])+.0722*e(r[n+2]),i++);return i?t/i:0}function Re(s,e=.07,t=.1,i=.5){let r=.30000000000000004;return s<=r?t:Math.min(i,Math.max(t,(s-r)/(s-e)))}var di=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
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
</svg>`;function pi(){let s="";for(let t=0,i=120;i<1100;t++,i+=105)s+=`<path d="M-100 ${i} L520 ${i+330} L1100 ${i-40} L1100 ${i+15} L520 ${i+385} L-100 ${i+55}Z" fill="url(#band-${t%2?"b":"a"})" opacity="${t%2?".9":".75"}"/>`;let e="";for(let t=0;t<16;t++)e+=`<path d="M0 0 C 70 -60 200 -55 250 -8 C 180 -20 80 -10 0 0Z" transform="rotate(${t*22.5})" fill="${t%2?"url(#blade)":"#1d6158"}"/>`;return`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a7a6f"/><stop offset="1" stop-color="#123f3a"/></linearGradient>
<linearGradient id="band-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fae9f"/><stop offset="1" stop-color="#2a7d71"/></linearGradient>
<linearGradient id="band-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c5f56"/><stop offset="1" stop-color="#124a43"/></linearGradient>
<linearGradient id="blade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5dbcad"/><stop offset="1" stop-color="#2b8073"/></linearGradient>
<pattern id="stripe" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="16" height="16" fill="#1a5a52"/><rect width="7" height="16" fill="#2f8578"/></pattern>
</defs>
<rect width="1000" height="1000" fill="url(#bg)"/>
<g>${s}</g>
<g transform="translate(150 230)">${e}<circle r="26" fill="#64c2b3"/></g>
<g transform="translate(720 690) rotate(45)"><rect x="-150" y="-150" width="300" height="300" fill="url(#stripe)"/><rect x="-150" y="-150" width="300" height="300" fill="none" stroke="#6cc6b7" stroke-width="6" opacity=".6"/></g>
<g transform="translate(860 300) rotate(45)"><rect x="-90" y="-90" width="180" height="180" fill="#3a9586"/><rect x="-90" y="-90" width="180" height="90" fill="#50ab9c"/></g>
</svg>`}var ui={champagne:{svg:di,base:"#928980",glass:"84 74 64"},teal:{svg:pi(),base:"#174c46",glass:"255 255 255"}},fi=s=>s==="champagne"||s==="teal";function Oe(s){if(fi(s)){let e=ui[s];return`${e.base} center / cover no-repeat url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(e.svg)}")`}return`center / cover no-repeat url("${s.replace(/"/g,"%22")}")`}var Le=new WeakMap;function Ie(s){let e=s;for(;e;){if(e instanceof ShadowRoot||e instanceof Document){let t=e.querySelector("hui-view-background");if(t)return t}if(e instanceof HTMLElement&&/^(ha-dialog|ha-md-dialog|hui-dialog-|ha-more-info)/.test(e.localName))return null;e=e instanceof ShadowRoot?e.host:e.parentNode}return null}function ze(s){let e=Le.get(s);return e||(e=new Bt(s),Le.set(s,e)),e}var He=()=>Math.min(window.devicePixelRatio||1,2),mi=150;function gi(s){let e=/url\((['"]?)(.*?)\1\)/.exec(s);return e?e[2]:null}function vi(s,e,t,i,r,n){let o=t,a=i,l=r.trim().split(/\s+/);if(l[0]==="cover"||l[0]==="contain"){let c=l[0]==="cover"?Math.max(s/t,e/i):Math.min(s/t,e/i);o=t*c,a=i*c}else if(l[0]!=="auto"||l[1]&&l[1]!=="auto"){let c=(m,x)=>m==="auto"||m===void 0?null:m.endsWith("%")?parseFloat(m)/100*x:parseFloat(m),d=c(l[0],s),v=c(l[1]??"auto",e);d!==null&&v!==null?(o=d,a=v):d!==null?(o=d,a=i*d/t):v!==null&&(a=v,o=t*v/i)}let h=n.trim().split(/\s+/),p=(c,d)=>c?c.endsWith("%")?parseFloat(c)/100*d||0:c==="left"||c==="top"?0:c==="right"||c==="bottom"?d:c==="center"?d/2:parseFloat(c)||0:d/2;return{x:p(h[0],s-o),y:p(h[1]??"50%",e-a),w:o,h:a}}var Bt=class{constructor(e){this.snapshot=null;this.failure=null;this.listeners=new Set;this.key="";this.version=0;this.pending=null;this.recheck=!1;this.timer=0;this.settle=0;this.overrides=new Map;this.el=e}subscribe(e){return this.listeners.add(e),this.listeners.size===1?this.start():this.snapshot&&queueMicrotask(e),()=>{this.listeners.delete(e),this.listeners.size||this.stop()}}setWallpaper(e,t,i=!0){t?this.overrides.set(e,{value:t,explicit:i}):this.overrides.delete(e);let r=this.el.parentElement??this.el.getRootNode().host;if(!r)return;let n=[...this.overrides.values()],o=n.find(a=>a.explicit)??n[0];o?r.style.setProperty("--lovelace-background",Oe(o.value)):r.style.removeProperty("--lovelace-background"),this.check()}check(){if(this.pending){this.recheck=!0;return}let e=getComputedStyle(this.el),t=this.el.getBoundingClientRect();if(t.width<1||t.height<1)return;let i=[e.backgroundImage,e.backgroundSize,e.backgroundPosition,e.backgroundColor,e.opacity,Math.round(t.width),Math.round(t.height),He()].join("|");i!==this.key&&(this.key=i,clearTimeout(this.settle),this.settle=window.setTimeout(()=>{let r=this.el.getBoundingClientRect();this.pending=this.raster(getComputedStyle(this.el),r).finally(()=>{this.pending=null,this.recheck&&(this.recheck=!1,this.check())})},mi))}origin(){let e=this.el.getBoundingClientRect();return{x:e.x,y:e.y}}start(){this.ro=new ResizeObserver(()=>this.check()),this.ro.observe(this.el),this.mo=new MutationObserver(()=>this.check()),this.mo.observe(this.el,{attributes:!0,attributeFilter:["style","class","fixed-background"]}),this.el.parentElement&&this.mo.observe(this.el.parentElement,{attributes:!0,attributeFilter:["style"]}),this.timer=window.setInterval(()=>this.check(),2e3),this.check()}stop(){var e,t;clearTimeout(this.settle),(e=this.ro)==null||e.disconnect(),(t=this.mo)==null||t.disconnect(),clearInterval(this.timer),this.key=""}async raster(e,t){let i=He(),r=Math.max(1,Math.round(t.width*i)),n=Math.max(1,Math.round(t.height*i));try{let o=document.createElement("canvas");o.width=r,o.height=n;let a=o.getContext("2d",{willReadFrequently:!0});if(!a)throw new Error("no 2d context");let l=getComputedStyle(document.documentElement).backgroundColor;a.fillStyle=l&&l!=="rgba(0, 0, 0, 0)"?l:"#111",a.fillRect(0,0,r,n),a.globalAlpha=parseFloat(e.opacity)||1,a.fillStyle=e.backgroundColor,a.fillRect(0,0,r,n);let h=e.backgroundImage;if(h&&h!=="none"){let c=gi(h);if(!c||/gradient\(/.test(h.replace(/url\(.*?\)/g,"")))throw new Error("background is not a plain image");let d=await bi(c),v=vi(t.width,t.height,d.naturalWidth||t.width,d.naturalHeight||t.height,e.backgroundSize,e.backgroundPosition);a.drawImage(d,v.x*i,v.y*i,v.w*i,v.h*i)}let p=a.getImageData(0,0,r,n);this.failure=null,this.snapshot={pixels:{width:r,height:n,data:p.data},x:t.x,y:t.y,k:i,version:++this.version}}catch(o){this.failure=o instanceof Error?o.message:String(o),this.snapshot=null}this.listeners.forEach(o=>o())}};function bi(s){return new Promise((e,t)=>{let i=new Image,r=new URL(s,location.href);r.origin!==location.origin&&r.protocol.startsWith("http")&&(i.crossOrigin="anonymous"),i.onload=()=>e(i),i.onerror=()=>t(new Error(`cannot load background ${s.slice(0,80)}`)),i.src=s})}function yi(s,e,t,i,r){let n=Math.abs(s)-t+r,o=Math.abs(e)-i+r;return Math.min(Math.max(n,o),0)+Math.hypot(Math.max(n,0),Math.max(o,0))-r}function wi(s){let e=1-Math.min(1,Math.max(0,s)),t=(1-e**4)**.75;if(t<1e-6)return 0;let i=Math.atan(Math.min(e**3/t,8)),r=Math.sin(i)/1.5;return r>=1?Math.sin(i):Math.sin(i-Math.asin(r))}function Fe(s,e,t,i,r){let n=Math.max(1,Math.round(s*r)),o=Math.max(1,Math.round(e*r)),a=n/2,l=o/2,h=Math.min(t*r,a,l),p=Math.max(1,i*r),c=Math.ceil(p),d=new Float32Array(c+1);for(let u=1;u<=c;u++)d[u]=d[u-1]+wi(u/c);let v=u=>{if(u<=0)return 0;if(u>=c)return d[c];let f=Math.floor(u),b=u-f;return d[f]*(1-b)+d[f+1]*b},m=new Float32Array(n*o),x=new Float32Array(n*o);for(let u=0;u<o;u++)for(let f=0;f<n;f++){let b=yi(f-a+.5,u-l+.5,a,l,h);x[u*n+f]=b,m[u*n+f]=b>0?0:v(Math.min(p,-b))}let $=1.35,T=-.54,E=-.84,w=new Uint8ClampedArray(n*o*4);for(let u=0;u<o;u++)for(let f=0;f<n;f++){let b=u*n+f,_=b<<2,S=x[b];if(S>0){w[_]=w[_+1]=w[_+2]=128,w[_+3]=0;continue}if(S<-p-2){w[_]=w[_+1]=128,w[_+2]=0,w[_+3]=255;continue}let L=Math.max(0,f-1),P=Math.min(n-1,f+1),O=Math.max(0,u-1),F=Math.min(o-1,u+1),D=Math.max(-1,Math.min(1,(m[u*n+P]-m[u*n+L])/(P-L||1)*$)),rt=Math.max(-1,Math.min(1,(m[F*n+f]-m[O*n+f])/(F-O||1)*$)),Wt=0;if(S>=-p){let Vt=x[u*n+P]-x[u*n+L],Kt=x[F*n+f]-x[O*n+f],Jt=Math.hypot(Vt,Kt)||1,Xt=Vt/Jt*T+Kt/Jt*E,Je=(1-Math.min(1,-S/p))**1.6;Wt=(Math.max(0,Xt)+Math.max(0,-Xt)*.35)*Je}w[_]=128+D*127,w[_+1]=128+rt*127,w[_+2]=Math.round(Wt*255),w[_+3]=255}return{width:n,height:o,data:w}}function Ue(s,e,t={}){return{radius:e,bevel:Math.max(4,Math.round(s*(t.bevel??.13))),scale:Math.round(s*(t.refraction??.3)),aberration:Math.max(1,Math.round(s*(t.aberration??.02))),frost:+(s*(t.frost??.007)).toFixed(2),specular:.55}}function De(){let s=navigator.userAgent;return!(/Safari/.test(s)&&!/Chrome|Chromium|Edg|OPR/.test(s))&&(CSS.supports("backdrop-filter","url(#x)")||CSS.supports("-webkit-backdrop-filter","url(#x)"))}function Be(s,e,t,i,r){let n=Math.ceil(r.scale+r.aberration+4),o=n/t*100,a=n/i*100,l=(h,p)=>`<feDisplacementMap in="SourceGraphic" in2="map" scale="${h}" xChannelSelector="R" yChannelSelector="G" result="${p}"/>`;return`<filter id="${s}" color-interpolation-filters="sRGB" x="-${o}%" y="-${a}%" width="${100+2*o}%" height="${100+2*a}%">
  <feImage href="${e}" x="0" y="0" width="${t}" height="${i}" preserveAspectRatio="none" result="map"/>
  ${l(r.scale+r.aberration,"dR")}<feColorMatrix in="dR" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
  ${l(r.scale,"dG")}<feColorMatrix in="dG" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>
  ${l(Math.max(0,r.scale-r.aberration),"dB")}<feColorMatrix in="dB" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>
  <feBlend in="r" in2="g" mode="screen" result="rg"/><feBlend in="rg" in2="b" mode="screen" result="rgb"/>
  <feGaussianBlur in="rgb" stdDeviation="${r.frost}" result="frosted"/>
  <feColorMatrix in="map" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 ${r.specular} 0 0" result="spec"/>
  <feComposite in="spec" in2="frosted" operator="over"/>
</filter>`}var Nt=window.homeview??(window.homeview={timings:[]}),ft=new Map;function Ne(s,e,t,i){let r=[s,e,t.radius.toFixed(1),t.bevel,i].join("|"),n=ft.get(r);return n||(n=Fe(s,e,t.radius,t.bevel,i),ft.size>24&&ft.delete(ft.keys().next().value),ft.set(r,n)),n}var mt=new Set,Gt=!1;function Ge(){Gt||(Gt=!0,requestAnimationFrame(()=>{Gt=!1;let s=performance.now();for(let e of mt)if(mt.delete(e),e.bakeNow(),performance.now()-s>12)break;mt.size&&Ge()}))}var xi=()=>matchMedia("(prefers-reduced-transparency: reduce)").matches,xt=class{constructor(e,t="rect"){this.mode="frost";this.opts={};this.shape="rect";this.backdrop=null;this.poll=0;this.lastKey="";this.onScroll=()=>this.request();this.host=e,this.shape=t,e.addController(this)}setOptions(e){let t=JSON.stringify(e)!==JSON.stringify(this.opts);this.opts={...e},t&&this.host.isConnected&&this.attach()}hostConnected(){requestAnimationFrame(()=>this.attach()),window.addEventListener("scroll",this.onScroll,{capture:!0,passive:!0}),window.addEventListener("resize",this.onScroll,{passive:!0}),this.poll=window.setInterval(()=>this.request(),700)}hostDisconnected(){var e;this.detach(),window.removeEventListener("scroll",this.onScroll,{capture:!0}),window.removeEventListener("resize",this.onScroll),clearInterval(this.poll),(e=this.ro)==null||e.disconnect(),this.ro=void 0,mt.delete(this)}hostUpdated(){let e=this.card();e&&!this.ro&&(this.ro=new ResizeObserver(()=>this.request()),this.ro.observe(e)),this.request()}card(){return this.host.renderRoot.querySelector(".hv-glass")}canvas(){return this.host.renderRoot.querySelector("canvas.hv-bake")}detach(){var e,t;(e=this.unsub)==null||e.call(this),this.unsub=void 0,(t=this.backdrop)==null||t.setWallpaper(this,void 0),this.backdrop=null}attach(){if(!this.host.isConnected)return;this.detach();let e=Ie(this.host);this.backdrop=e?ze(e):null;let t=this.opts.wallpaper??"champagne";this.backdrop&&t!=="view"&&t!=="none"&&this.backdrop.setWallpaper(this,t,this.opts.wallpaper!==void 0),this.backdrop&&(this.unsub=this.backdrop.subscribe(()=>this.request(!0))),this.lastKey="",this.request(!0)}request(e=!1){e&&(this.lastKey=""),!(!this.host.isConnected||!this.card())&&this.key()!==this.lastKey&&(mt.add(this),Ge())}geometry(){let e=this.card();if(!e)return null;let t=e.offsetWidth,i=e.offsetHeight;if(t<8||i<8)return null;let r=e.getBoundingClientRect();return{x:r.x+r.width/2-t/2,y:r.y+r.height/2-i/2,w:t,h:i}}key(){var i,r,n;let e=this.geometry();if(!e)return"none";let t=((i=this.backdrop)==null?void 0:i.origin())??{x:0,y:0};return[Math.round(e.x-t.x),Math.round(e.y-t.y),e.w,e.h,((n=(r=this.backdrop)==null?void 0:r.snapshot)==null?void 0:n.version)??-1,this.mode,JSON.stringify(this.opts)].join("|")}params(e,t){let i=this.card(),r=Math.max(110,Math.min(260,Math.min(e,t))),n=this.shape==="circle"?Math.min(e,t)/2:parseFloat(getComputedStyle(i).borderTopLeftRadius)||0;return Ue(r,n,this.opts)}resolveMode(){var t;let e=this.opts.glass??"auto";return xi()||e==="frost"?"frost":e==="live"?De()?"live":"frost":(t=this.backdrop)!=null&&t.snapshot?"baked":"frost"}bakeNow(){let e=this.card(),t=this.canvas(),i=this.geometry();if(!e||!t||!i||!e.style.getPropertyValue("--hv-radius"))return;if(this.mode=this.resolveMode(),this.lastKey=this.key(),e.dataset.glass=this.mode,this.mode!=="live"&&e.style.removeProperty("backdrop-filter"),this.mode==="frost"){e.style.setProperty("--hv-tint-rgb","84 74 64"),e.style.setProperty("--hv-tint-a",".28");return}let r=this.params(i.w,i.h);if(this.mode==="live"){this.applyLive(e,i.w,i.h,r);return}let n=performance.now(),o=this.backdrop.snapshot,a=o.k,l=this.backdrop.origin(),h=Ne(i.w,i.h,r,a),p=r.frost*a,c=Math.ceil((r.scale+r.aberration)*a+p*3+2),d=Math.round((i.x-l.x)*a)-c,v=Math.round((i.y-l.y)*a)-c,m=Ce(Ee(o.pixels,d,v,h.width+2*c,h.height+2*c),p),x=Te(m,h,c,c,r,a);t.width=x.width,t.height=x.height,t.getContext("2d").putImageData(new ImageData(x.data,x.width,x.height),0,0);let $=Pe(x);$<.18?(e.style.setProperty("--hv-tint-rgb","255 255 255"),e.style.setProperty("--hv-tint-a",".13")):(e.style.setProperty("--hv-tint-rgb","84 74 64"),e.style.setProperty("--hv-tint-a",String(Math.max(.13,Re($)).toFixed(3)))),Nt.timings.push({card:this.host.localName,w:i.w,h:i.h,ms:Math.round(performance.now()-n)}),Nt.timings.length>200&&Nt.timings.splice(0,100)}applyLive(e,t,i,r){let n=Math.min(window.devicePixelRatio||1,2),o=Ne(t,i,r,n),a=document.createElement("canvas");a.width=o.width,a.height=o.height,a.getContext("2d").putImageData(new ImageData(o.data,o.width,o.height),0,0);let l=a.toDataURL("image/png"),h=`hv-${Math.random().toString(36).slice(2,9)}`,c=this.host.renderRoot.querySelector("svg.hv-filters");c||(c=document.createElementNS("http://www.w3.org/2000/svg","svg"),c.setAttribute("class","hv-filters"),c.setAttribute("aria-hidden","true"),c.setAttribute("style","position:absolute;width:0;height:0;overflow:hidden"),this.host.renderRoot.appendChild(c)),c.innerHTML=Be(h,l,t,i,r);let d=`url(#${h}) saturate(1.25) brightness(1.03)`;e.style.setProperty("backdrop-filter",d),e.style.setProperty("-webkit-backdrop-filter",d),e.style.setProperty("--hv-tint-rgb","255 255 255"),e.style.setProperty("--hv-tint-a",".13")}};var z=R`
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
`,A=class extends H{constructor(e="rect"){super(),this.glass=new xt(this,e)}static getConfigElement(){let e=document.createElement("homeview-card-editor");return e.fields=this.editorFields,e}setConfig(e){if(!e)throw new Error("Invalid configuration");this.validate(e),this._config=e,this.glass.setOptions({glass:e.glass,wallpaper:e.wallpaper,bevel:e.bevel,refraction:e.refraction,aberration:e.aberration,frost:e.frost})}validate(e){}getCardSize(){return 3}get square(){var e,t;return typeof((t=(e=this._config)==null?void 0:e.grid_options)==null?void 0:t.rows)!="number"}refFrom(e,t){return Math.min(e,t)}get onScreen(){return this.getClientRects().length>0}resume(){}cardClass(){return""}render(){return this._config?y`<ha-card class="hv-glass ${this.square?"square":""} ${this.cardClass()}">
      <canvas class="hv-bake" aria-hidden="true"></canvas>
      <div class="hv-tint"></div>
      <div class="hv-content">${this.renderContent()}</div>
    </ha-card>`:y``}firstUpdated(e){let t=this.renderRoot.querySelector("ha-card");t&&(this.sizer=new ResizeObserver(()=>{let i=this.refFrom(t.offsetWidth,t.offsetHeight);t.style.setProperty("--hv-ref",`${i}px`),t.style.setProperty("--hv-radius",`${Math.round(Math.max(14,Math.min(34,i*.125)))}px`),t.toggleAttribute("data-wide",t.offsetWidth>t.offsetHeight*1.5),t.toggleAttribute("data-short",t.offsetHeight<240),this.glass.request(!0),t.offsetWidth&&this.resume()}),this.sizer.observe(t))}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.sizer)==null||e.disconnect(),this.sizer=void 0}connectedCallback(){super.connectedCallback(),this.hasUpdated&&!this.sizer&&this.firstUpdated(new Map)}};A.properties={hass:{attribute:!1},_config:{state:!0}},A.editorFields=[];var C=s=>k`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${s}</svg>`,M={sun:C(k`<circle cx="12" cy="12" r="4.3"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2.2v2.4M12 19.4v2.4M2.2 12h2.4M19.4 12h2.4M5.1 5.1l1.7 1.7M17.2 17.2l1.7 1.7M5.1 18.9l1.7-1.7M17.2 6.8l1.7-1.7"/></g>`),moon:C(k`<path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8a8.6 8.6 0 1 0 10.8 10.8z"/><path d="M17 3.2l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6zM20.6 7.6l.4.9.9.4-.9.4-.4.9-.4-.9-.9-.4.9-.4z"/>`),lock:C(k`<path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="4.75" y="9.5" width="14.5" height="12" rx="2.6"/>`),unlock:C(k`<path d="M7.5 10V7.5a4.5 4.5 0 0 1 8.7-1.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><rect x="4.75" y="9.5" width="14.5" height="12" rx="2.6"/>`),light:C(k`<rect x="11.1" y="1.5" width="1.8" height="5" rx=".9"/><rect x="8.6" y="1.2" width="6.8" height="1.9" rx=".95"/><path d="M12 6.2c-4.1 0-7.6 3.2-8 7.3-.05.5.35.9.85.9h14.3c.5 0 .9-.4.85-.9-.4-4.1-3.9-7.3-8-7.3z"/><path d="M8.6 15.6h6.8a3.4 3.4 0 0 1-6.8 0z"/>`),fan:C(k`<circle cx="12" cy="10" r="8.2" fill="none" stroke="currentColor" stroke-width="1.6"/><g class="blades"><path d="M12 10c-.4-2.6.2-5 1.9-5.6 1.6-.5 2.6 1.4 1.4 3.1-.8 1.2-2 1.9-3.3 2.5z"/><path d="M12 10c2.4 1 4.2 2.8 3.8 4.5-.4 1.6-2.6 1.5-3.4-.4-.6-1.3-.6-2.7-.4-4.1z"/><path d="M12 10c-2 1.6-4.4 2.3-5.6 1.1-1.2-1.2.1-3 2.1-2.8 1.4.1 2.5.9 3.5 1.7z"/></g><circle cx="12" cy="10" r="1.3"/><path d="M10.6 18.1h2.8l.9 3.4H9.7z"/><rect x="7.5" y="21" width="9" height="1.8" rx=".9"/>`),curtains:C(k`<rect x="2" y="2.5" width="20" height="1.8" rx=".9"/><path d="M4 4.3h6.5c-.3 4.6-1.4 9.8-3.5 16.9H4z"/><path d="M20 4.3h-6.5c.3 4.6 1.4 9.8 3.5 16.9H20z"/>`),curtainsOpen:C(k`<rect x="2" y="2.5" width="20" height="1.8" rx=".9"/><path d="M4 4.3h3.2c-.2 4.6-.6 9.8-1.4 16.9H4z"/><path d="M20 4.3h-3.2c.2 4.6.6 9.8 1.4 16.9H20z"/>`),garage:C(k`<path d="M2 9.6 12 3l10 6.6V21a1 1 0 0 1-1 1h-1.6V11.4H4.6V22H3a1 1 0 0 1-1-1z"/><rect x="6.2" y="13" width="11.6" height="2" rx=".5"/><rect x="6.2" y="16.2" width="11.6" height="2" rx=".5"/><rect x="6.2" y="19.4" width="11.6" height="2" rx=".5"/>`),garageOpen:C(k`<path d="M2 9.6 12 3l10 6.6V21a1 1 0 0 1-1 1h-1.6V11.4H4.6V22H3a1 1 0 0 1-1-1z"/><rect x="6.2" y="13" width="11.6" height="2" rx=".5"/>`),power:C(k`<path d="M12 2.5v8.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M7.1 5.4a8 8 0 1 0 9.8 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`),play:C(k`<path d="M8 4.7v14.6c0 .9 1 1.4 1.7.9l11-7.3c.7-.4.7-1.4 0-1.8l-11-7.3C9 3.3 8 3.8 8 4.7z"/><path d="M3.5 6.5l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z"/>`),dot:C(k`<circle cx="12" cy="12" r="6"/>`),chevronUp:k`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 15l7-7 7 7"/></svg>`,chevronDown:k`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>`,mic:C(k`<rect x="8.5" y="2" width="7" height="12.5" rx="3.5"/><path d="M5 11a7 7 0 0 0 14 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 18v3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),keyboard:C(k`<rect x="2" y="5.5" width="20" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6 9.5h1.6M9.2 9.5h1.6M12.4 9.5h1.6M15.6 9.5h1.6M6 12.5h1.6M15.6 12.5h1.6M9.2 12.5h4.8M7.5 15.5h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`),retry:C(k`<path d="M19 12a7 7 0 1 1-2.05-4.95" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M20 3.6v6h-6z"/>`),stop:C(k`<rect x="6" y="6" width="12" height="12" rx="2.5"/>`),send:C(k`<path d="M3.4 11.2 19.6 4.1c.8-.3 1.6.5 1.3 1.3l-7.1 16.2c-.3.8-1.5.7-1.7-.1l-1.6-6.2-6.2-1.6c-.8-.2-.9-1.4-.1-1.7z"/>`)};function qe(s,e,t){switch(s){case"light":return M.light;case"lock":return t?M.unlock:M.lock;case"fan":return M.fan;case"cover":return e==="garage"||e==="gate"?t?M.garageOpen:M.garage:t?M.curtainsOpen:M.curtains;case"scene":return M.sun;case"script":return M.play;case"switch":case"input_boolean":return M.power;default:return M.dot}}var _i={easing:"cubic-bezier(.34,1.56,.64,1)",duration:520};function ki(s,e,t,i=1){let r=Math.sqrt(e/i),n=t/(2*Math.sqrt(e*i));if(n>=1)return 1-Math.exp(-r*s)*(1+r*s);let o=r*Math.sqrt(1-n*n);return 1-Math.exp(-n*r*s)*(Math.cos(o*s)+n*r/o*Math.sin(o*s))}function $i(s=210,e=17,t=1,i=48){let r=a=>ki(a,s,e,t),n=0;for(;n<4&&!(Math.abs(1-r(n))<.002&&Math.abs(1-r(n+.05))<.002);)n+=.01;let o=Array.from({length:i+1},(a,l)=>+r(l/i*n).toFixed(4));return o[i]=1,{easing:`linear(${o.join(",")})`,duration:Math.round(n*1e3)}}var _t;function je(){if(_t)return _t;let s=$i();return _t=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("transition-timing-function","linear(0, 1)")?s:_i,_t}var Mi=800,Q=class extends A{constructor(){super(...arguments);this.sendTimer=0;this.lastDir=0}static getStubConfig(t){return{entity:Object.keys(t.states).find(i=>i.startsWith("climate."))??""}}validate(t){if(!t.entity||!t.entity.startsWith("climate."))throw new Error("Pick a climate entity")}getGridOptions(){return{columns:8,rows:"auto",min_columns:6,min_rows:4}}getCardSize(){return 6}refFrom(t,i){return Math.min(t,i)/2}get stateObj(){var t;return(t=this.hass)==null?void 0:t.states[this._config.entity]}get step(){var t,i,r;return((t=this._config)==null?void 0:t.step)??((i=this.stateObj)==null?void 0:i.attributes.target_temp_step)??(((r=this.hass)==null?void 0:r.config.unit_system.temperature)==="\xB0C"?.5:1)}current(){let t=this.stateObj;if(!t)return{mode:"none"};let i=Ft(t),r=this._pending;return r&&Date.now()-r.at<6e3?{...i,...Object.fromEntries(Object.entries(r).filter(([n,o])=>n!=="at"&&o!==void 0))}:i}activeSide(){return this.current().mode!=="dual"?"single":this._side??be(this.stateObj)}willUpdate(t){if(t.has("hass")&&this._pending&&this.stateObj&&!this.sendTimer){let i=Ft(this.stateObj),r=this._pending;((r.value===void 0||r.value===i.value)&&(r.low===void 0||r.low===i.low)&&(r.high===void 0||r.high===i.high)||Date.now()-r.at>6e3)&&(this._pending=void 0)}}shown(){let t=this.current(),i=this.activeSide();return i==="single"?t.value:i==="low"?t.low:t.high}stepBy(t){let i=this.stateObj;if(!i)return;let r=this.current(),n=this.activeSide(),o=i.attributes,a=o.min_temp??-1/0,l=o.max_temp??1/0,h=this.step,p=this.shown();if(p===void 0)return;let c=a,d=l;n==="low"&&r.high!==void 0&&(d=Math.min(l,r.high-h)),n==="high"&&r.low!==void 0&&(c=Math.max(a,r.low+h));let v=ve(p+t*h,h,c,d);if(v===p)return;this.ghost(t);let m={...this._pending??{},at:Date.now()};n==="single"?m.value=v:m[n]=v,this._pending=m,clearTimeout(this.sendTimer),this.sendTimer=window.setTimeout(()=>this.send(),Mi)}send(){this.sendTimer=0;let t=this.stateObj;if(!t||!this.hass||!this._pending)return;let i=this.current(),r=i.mode==="dual"?{target_temp_low:i.low,target_temp_high:i.high}:{temperature:i.value};this._pending={...this._pending,at:Date.now()},this.hass.callService("climate","set_temperature",r,{entity_id:t.entity_id})}ghost(t){this.lastDir=t;let i=this.renderRoot.querySelector(".num:not(.ghost)");if(!i||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let r=i.cloneNode(!0);r.classList.add("ghost"),i.parentElement.appendChild(r),r.animate([{transform:"none",opacity:1},{transform:`translateY(${-36*t}%) scale(.9)`,opacity:0}],{duration:200,easing:"cubic-bezier(.4,0,1,1)",fill:"forwards"}).finished.then(()=>r.remove(),()=>r.remove())}updated(t){var o;if((o=super.updated)==null||o.call(this,t),!this.lastDir)return;let i=this.lastDir;this.lastDir=0;let r=this.renderRoot.querySelector(".num:not(.ghost)");if(!r||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let n=je();r.animate([{transform:`translateY(${40*i}%) scale(.9)`},{transform:"none"}],{duration:n.duration,easing:n.easing}),r.animate([{opacity:0},{opacity:1}],{duration:180,easing:"ease-out"})}fmt(t){return t===void 0?"--":this.step<1?t.toFixed(1):String(Math.round(t))}renderContent(){let t=this._config;if(!this.hass)return g;let i=this.stateObj;if(!i)return y`<div class="center warning ink">Entity not found: ${t.entity}</div>`;let r=this.current(),n=this.activeSide(),o=i.state==="off",a=Z(i),l=this.shown(),h=i.attributes.current_temperature,p=t.subtitle??wt(this.hass,t.entity)??i.attributes.friendly_name,c=i.attributes,d=!a&&l!==void 0,v=!d||l>=((n==="low"&&r.high!==void 0?r.high-this.step:c.max_temp)??1/0),m=!d||l<=((n==="high"&&r.low!==void 0?r.low+this.step:c.min_temp)??-1/0);return y`<div class="thermo">
      <div class="temp" aria-live="polite">
        <span class="num ink ${o||a?"dim":""}">${a?"--":r.mode==="none"?this.fmt(h):this.fmt(l)}</span>
        ${r.mode==="dual"?y`<div class="sides ink">
              <button class="side ${n==="low"?"sel":""}" @click=${()=>this._side="low"} aria-pressed=${String(n==="low")}>Heat ${this.fmt(r.low)}</button>
              <button class="side ${n==="high"?"sel":""}" @click=${()=>this._side="high"} aria-pressed=${String(n==="high")}>Cool ${this.fmt(r.high)}</button>
            </div>`:g}
      </div>
      <div class="bar">
        <button class="chev" aria-label="Lower setpoint" ?disabled=${m} @click=${()=>this.stepBy(-1)}>${M.chevronDown}</button>
        <div class="label ink">
          <div class="title">${t.name??"Thermostat"}</div>
          <div class="sub">${o?"Off":p}${typeof h=="number"?y` &bull; ${this.fmt(h)}&deg;`:g}</div>
        </div>
        <button class="chev" aria-label="Raise setpoint" ?disabled=${v} @click=${()=>this.stepBy(1)}>${M.chevronUp}</button>
      </div>
    </div>`}};Q.properties={...A.properties,_pending:{state:!0},_side:{state:!0}},Q.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"climate"}}}},{name:"name",selector:{text:{}}},{name:"subtitle",helper:"Defaults to the entity's area",selector:{text:{}}},{name:"step",helper:"Defaults to the entity's target temperature step",selector:{number:{min:.1,max:5,step:.1,mode:"box"}}}],Q.styles=[z,R`
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
    `];customElements.define("homeview-thermostat-card",Q);I("homeview-thermostat-card","HomeView Thermostat","Large liquid-glass thermostat with spring setpoint and heat/cool support.");var We=["light","switch","fan","lock","cover","scene","script","input_boolean"],Si=500,tt=class extends A{constructor(){super(...arguments);this._confirming=!1;this._flash=!1;this.holdTimer=0;this.held=!1;this.confirmTimer=0;this.down=()=>{this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=window.setTimeout(()=>{this.held=!0,pt(this,"hass-more-info",{entityId:this._config.entity})},Si)};this.up=()=>clearTimeout(this.holdTimer);this.cancel=()=>clearTimeout(this.holdTimer);this.onTap=()=>{if(this.held){this.held=!1;return}let t=this._config,i=t.tap_action??"toggle";if(i==="none"||!this.hass)return;if(i==="more-info"){pt(this,"hass-more-info",{entityId:t.entity});return}let r=this.hass.states[t.entity];if(!r)return;let n=Y(t.entity);if(n==="lock"&&r.state==="locked"&&t.confirm_unlock&&!this._confirming){this._confirming=!0,clearTimeout(this.confirmTimer),this.confirmTimer=window.setTimeout(()=>this._confirming=!1,3e3);return}this._confirming=!1;let o=ye(n,r.state);o&&(n==="scene"&&(this._flash=!0,setTimeout(()=>this._flash=!1,1200)),this.hass.callService(o[0],o[1],{},{entity_id:t.entity}))}}static getStubConfig(t){return{entity:Object.keys(t.states).find(r=>Y(r)==="light")??Object.keys(t.states).find(r=>We.includes(Y(r)))??""}}validate(t){if(!t.entity)throw new Error("Pick an entity")}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}getCardSize(){return 3}cardClass(){var o;let t=this._config,i=(o=this.hass)==null?void 0:o.states[t.entity],r=Y(t.entity),n=i&&!Z(i)&&Ut(r,i.state);return`tile ${r} ${n||this._flash?"on":""} ${Z(i)?"unavailable":""} ${this._confirming?"confirming":""}`}renderContent(){let t=this._config;if(!this.hass)return g;let i=this.hass.states[t.entity],r=Y(t.entity),n=!!i&&!Z(i)&&Ut(r,i.state),o=t.name??(i?ge(this.hass,t.entity):t.entity),a=t.subtitle??wt(this.hass,t.entity)??"";i?i.state==="unavailable"?a="Unavailable":this._confirming?a="Tap again to unlock":r==="lock"&&["locking","unlocking","jammed","opening","open"].includes(i.state)&&(a=i.state[0].toUpperCase()+i.state.slice(1)):a="Entity not found";let l=i?r==="lock"||r==="cover"?i.state:r==="scene"||r==="script"?"":n?"on":"off":"missing";return y`<button
      class="hit"
      aria-label="${[o,a,l].filter(Boolean).join(", ")}"
      aria-pressed=${r==="scene"||r==="script"?g:String(n)}
      ?disabled=${!i||i.state==="unavailable"}
      @pointerdown=${this.down}
      @pointerup=${this.up}
      @pointerleave=${this.cancel}
      @pointercancel=${this.cancel}
      @click=${this.onTap}
      @contextmenu=${h=>h.preventDefault()}
    >
      <span class="icon">${t.icon?y`<ha-icon .icon=${t.icon}></ha-icon>`:qe(r,i==null?void 0:i.attributes.device_class,n)}</span>
      <span class="label ink"><span class="title">${o}</span><br /><span class="sub">${a}</span></span>
    </button>`}};tt.properties={...A.properties,_confirming:{state:!0},_flash:{state:!0}},tt.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:We}}}},{name:"name",selector:{text:{}}},{name:"subtitle",helper:"Defaults to the entity's area",selector:{text:{}}},{name:"icon",helper:"Optional mdi: icon; HomeView glyphs are used by default",selector:{icon:{}}},{name:"tap_action",label:"Tap action",selector:{select:{mode:"dropdown",options:[{value:"toggle",label:"Toggle / run"},{value:"more-info",label:"More info"},{value:"none",label:"Nothing"}]}}},{name:"confirm_unlock",label:"Confirm before unlocking (locks)",selector:{boolean:{}}}],tt.styles=[z,R`
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
    `];customElements.define("homeview-tile-card",tt);I("homeview-tile-card","HomeView Tile","Liquid-glass tile for lights, switches, fans, locks, covers, scenes and scripts.");var gt=class extends A{constructor(){super("circle");this.raf=0;this.timer=0;this.loop=()=>{if(this.raf=this.timer=0,!this.onScreen)return;this.draw();let t=this.mode();t==="sweep"?this.raf=requestAnimationFrame(this.loop):this.timer=window.setTimeout(this.loop,(t==="off"?6e4-new Date().getSeconds()*1e3:1e3)-new Date().getMilliseconds()+5)}}static getStubConfig(){return{seconds:"sweep"}}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}validate(t){if(t.time_zone)try{new Intl.DateTimeFormat("en",{timeZone:t.time_zone})}catch{throw new Error(`Unknown time zone: ${t.time_zone}`)}}cardClass(){return"clock"}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){var t;super.disconnectedCallback(),cancelAnimationFrame(this.raf),clearTimeout(this.timer),(t=this.fit)==null||t.disconnect(),this.fit=void 0}firstUpdated(t){super.firstUpdated(t),this.fit??(this.fit=new ResizeObserver(()=>this.fitFace())),this.fit.observe(this)}fitFace(){let t=this.renderRoot.querySelector("ha-card");if(!t)return;let i=this.clientWidth,r=this.clientHeight,n=this.square||!i||!r?0:Math.min(i,r);t.style.width=t.style.height=n?`${n}px`:"",t.style.margin=n?`${(r-n)/2}px auto 0`:""}resume(){!this.raf&&!this.timer&&this.loop()}mode(){var i;let t=((i=this._config)==null?void 0:i.seconds)??"sweep";return t==="sweep"&&matchMedia("(prefers-reduced-motion: reduce)").matches?"tick":t}draw(){var o,a;let t=this.renderRoot,i=t.querySelector("#hh");if(!i)return;let r=Dt((o=this._config)==null?void 0:o.time_zone),n=we(r.h,r.m,r.s+(this.mode()==="sweep"?r.ms/1e3:0));i.setAttribute("transform",`rotate(${n.h})`),t.querySelector("#mh").setAttribute("transform",`rotate(${n.m})`),(a=t.querySelector("#sh"))==null||a.setAttribute("transform",`rotate(${n.s})`)}renderContent(){var r;let t=Array.from({length:12},(n,o)=>k`<line class="tick" x1="0" x2="0" y1="-84" y2="-68" transform="rotate(${o*30})"/>`),i=Dt((r=this._config)==null?void 0:r.time_zone);return y`<svg class="face" viewBox="-100 -100 200 200" role="img" aria-label="Clock, ${String(i.h).padStart(2,"0")}:${String(i.m).padStart(2,"0")}">
      ${t}
      <line class="hand" id="hh" x1="0" y1="0" x2="0" y2="-42" stroke-width="7" />
      <line class="hand" id="mh" x1="0" y1="0" x2="0" y2="-66" stroke-width="5.5" />
      ${this.mode()==="off"?"":k`<line class="hand" id="sh" x1="0" y1="18" x2="0" y2="-80" stroke-width="1.8" />`}
      <circle r="4.2" fill="#fff" />
    </svg>`}updated(t){var i;(i=super.updated)==null||i.call(this,t),this.draw()}};gt.editorFields=[{name:"seconds",label:"Seconds hand",selector:{select:{mode:"dropdown",options:[{value:"sweep",label:"Smooth sweep"},{value:"tick",label:"Tick"},{value:"off",label:"Hidden"}]}}},{name:"time_zone",label:"Time zone",helper:"IANA name such as Europe/Paris; defaults to this device's time",selector:{text:{}}}],gt.styles=[z,R`
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
    `];customElements.define("homeview-clock-card",gt);I("homeview-clock-card","HomeView Clock","Analog clock on a round liquid-glass face.");var Ai=1800*1e3,et=class extends A{constructor(){super(...arguments);this._urls=["",""];this._front=0;this._error="";this.items=[];this.index=-1;this.timer=0;this.listedAt=0;this.fails=0;this.parked=!1;this.loadedFor=""}static getStubConfig(){return{media:"media-source://media_source/local",interval:30,recursive:!0}}validate(t){let i=K(t.media);if(!i.length||i.some(r=>!r.startsWith("media-source://")))throw new Error("Set media to a media-source:// folder, or a list of them")}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timer),this.loadedFor=""}connectedCallback(){super.connectedCallback(),this.hass&&this._config&&this.requestUpdate()}updated(t){var i;(i=super.updated)==null||i.call(this,t),this.load()}load(){let t=this._config;if(!this.hass||!t||!this.onScreen)return!1;let i=JSON.stringify([K(t.media),!!t.recursive,!!t.shuffle]);return i===this.loadedFor?!1:(this.loadedFor=i,this.relist(!0),!0)}async relist(t){let i=this._config;try{let r=await xe(this.hass,i.media,!!i.recursive);this.items=i.shuffle?$e(r):r,this.listedAt=Date.now(),this._error=r.length?"":"No pictures in this folder",t&&(this.index=-1,this.next())}catch(r){this._error=`Cannot open ${K(i.media).join(", ")}: ${r.message??r}`}}async next(){clearTimeout(this.timer);let t=this._config;if(!t||!this.items.length||!this.isConnected||(this.parked=!this.onScreen,this.parked))return;Date.now()-this.listedAt>Ai&&await this.relist(!1),this.index=(this.index+1)%this.items.length;try{let r=await this.hass.callWS({type:"media_source/resolve_media",media_content_id:this.items[this.index],expires:3600}),n=r.url.startsWith("http")?r.url:this.hass.hassUrl(r.url),o=new Image;o.src=n,await o.decode();let a=1-this._front,l=[...this._urls];l[a]=n,this._urls=l,this._front=a,this.fails=0}catch{this.fails++}let i=this.fails>0&&this.fails<Math.min(this.items.length,20);this.timer=window.setTimeout(()=>void this.next(),i?0:Math.max(5,t.interval??30)*1e3)}resume(){!this.load()&&this.parked&&this.next()}render(){if(!this._config)return y``;let t=this._config.fit??"cover";return y`<ha-card class="photo ${this.square?"square":""}">
      ${this._urls.map((i,r)=>i?y`<img class=${r===this._front?"front":""} src=${i} alt="" style="object-fit:${t}" />`:g)}
      ${this._error?y`<div class="msg">${this._error}</div>`:g}
    </ha-card>`}renderContent(){return g}};et.properties={...A.properties,_urls:{state:!0},_front:{state:!0},_error:{state:!0}},et.editorFields=[{name:"media",label:"Media folders",required:!0,list:!0,helper:"One or more media-source folders, e.g. media-source://media_source/local/photos; the slideshow cycles through all of them. Open Media in the sidebar to find a folder; DLNA, Synology Photos and other media servers HA can browse work too.",selector:{text:{multiple:!0}}},{name:"interval",label:"Seconds per picture",selector:{number:{min:5,max:3600,step:1,mode:"box",unit_of_measurement:"s"}}},{name:"shuffle",selector:{boolean:{}}},{name:"recursive",label:"Include subfolders",selector:{boolean:{}}},{name:"fit",selector:{select:{mode:"dropdown",options:[{value:"cover",label:"Fill"},{value:"contain",label:"Fit whole picture"}]}}}],et.styles=[z,R`
      ha-card.photo {
        position: relative;
        height: 100%;
        overflow: hidden;
        border: none;
        border-radius: var(--hv-radius, 24px);
        background: rgb(0 0 0 / 0.25);
        box-shadow: 0 calc(var(--hv-ref, 200px) * 0.03) calc(var(--hv-ref, 200px) * 0.09) rgb(40 30 20 / 0.18);
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
      img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        opacity: 0;
        transition: opacity 1.2s ease;
      }
      img.front {
        opacity: 1;
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
    `];customElements.define("homeview-photo-card",et);I("homeview-photo-card","HomeView Photo Frame","Slideshow of pictures from a Home Assistant media source.");var kt=class{constructor(e,t=16e3){this.acc=0;this.n=0;this.pos=0;this.ratio=e/t}push(e){if(this.ratio<=1)return e.slice();let t=[];for(let i=0;i<e.length;i++)this.acc+=e[i],this.n++,this.pos+=1,this.pos>=this.ratio&&(t.push(this.acc/this.n),this.acc=0,this.n=0,this.pos-=this.ratio);return Float32Array.from(t)}};function Ve(s){let e=new Int16Array(s.length);for(let t=0;t<s.length;t++){let i=Math.max(-1,Math.min(1,s[t]));e[t]=i<0?i*32768:i*32767}return e}function qt(s,e){let t=e?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(0),i=new Uint8Array(1+t.length);return i[0]=s,i.set(t,1),i}var Ke=`
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
registerProcessor("homeview-recorder", HomeViewRecorder);
`;var Ci=15e3,jt={idle:"Tap to talk",listening:"Listening",thinking:"Thinking",responding:"Responding",error:"Something went wrong"},it=class extends A{constructor(){super(...arguments);this._phase="idle";this._heard="";this._reply="";this._error="";this._detail="";this._showDetail=!1;this.lastText="";this._typing=!1;this.handlerId=null;this.pending=[];this.speaking=!1;this.stopTimer=0;this.raf=0;this.levels=new Float32Array(48);this.t0=performance.now();this.loop=()=>{this.raf=this.draw()?requestAnimationFrame(this.loop):0};this.showDetail=t=>{t.preventDefault(),this._showDetail=!0};this.submit=t=>{t.preventDefault();let i=t.target.elements.namedItem("q");this.ask(i.value),i.value=""}}static getStubConfig(){return{speak:!0}}getGridOptions(){return{columns:12,rows:"auto",min_columns:6,min_rows:3}}getCardSize(){return 5}get square(){return!1}refFrom(t,i){return Math.min(t,i,220)}cardClass(){var i,r;return`voice ${typeof((r=(i=this._config)==null?void 0:i.grid_options)==null?void 0:r.rows)!="number"?"wide":""} ${this.phase()}`}phase(){var i,r,n;let t=(i=this._config)==null?void 0:i.satellite;return t?Ae((n=(r=this.hass)==null?void 0:r.states[t])==null?void 0:n.state):this._phase}micBlocked(){var t;return window.isSecureContext?(t=navigator.mediaDevices)!=null&&t.getUserMedia?null:"unsupported":"insecure"}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){var t;super.disconnectedCallback(),cancelAnimationFrame(this.raf),this.teardown(),(t=this.audio)==null||t.pause()}async talk(){var t;if(this._phase==="listening")return this.endAudio();if(!(this._phase==="thinking"||this._phase==="responding")){if(this.micBlocked()){this._typing=!0;return}this.reset(),this.lastText="";try{this.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}),this.ctx=new AudioContext,await this.ctx.resume();let i=this.ctx.createMediaStreamSource(this.stream);if(this.analyser=this.ctx.createAnalyser(),this.analyser.fftSize=256,this.analyser.smoothingTimeConstant=.6,i.connect(this.analyser),this.resampler=new kt(this.ctx.sampleRate),this.ctx.audioWorklet){let r=URL.createObjectURL(new Blob([Ke],{type:"text/javascript"}));await this.ctx.audioWorklet.addModule(r),URL.revokeObjectURL(r);let n=new AudioWorkletNode(this.ctx,"homeview-recorder");n.port.onmessage=o=>this.onAudio(o.data),i.connect(n),this.recorder=n}else{let r=this.ctx.createScriptProcessor(4096,1,1);r.onaudioprocess=n=>this.onAudio(n.inputBuffer.getChannelData(0)),i.connect(r),r.connect(this.ctx.destination),this.recorder=r}this._phase="listening",this.stopTimer=window.setTimeout(()=>this.endAudio(),Ci),await this.run({start_stage:"stt",end_stage:((t=this._config)==null?void 0:t.speak)===!1?"intent":"tts",input:{sample_rate:16e3}})}catch(i){this.fail(i)}}}retry(){this.lastText?this.ask(this.lastText):this.talk()}async ask(t){var i;if(t.trim()){this.reset(),this.lastText=t,this._heard=t,this._phase="thinking";try{await this.run({start_stage:"intent",end_stage:((i=this._config)==null?void 0:i.speak)===!1?"intent":"tts",input:{text:t}})}catch(r){this.fail(r)}}}async run(t){let i=this._config;this.unsub=await this.hass.connection.subscribeMessage(r=>this.onEvent(r),{type:"assist_pipeline/run",...t,...i.pipeline?{pipeline:i.pipeline}:{},...this.conversationId?{conversation_id:this.conversationId}:{}})}onEvent(t){var n,o,a,l,h,p,c;let i=t.data??{};if(t.type==="run-start"){this.handlerId=((n=i.runner_data)==null?void 0:n.stt_binary_handler_id)??null;for(let d of this.pending)this.sendPcm(d);this.pending=[]}if((t.type==="stt-vad-end"||t.type==="stt-end")&&this.endAudio(),t.type==="stt-end"&&(this._heard=((o=i.stt_output)==null?void 0:o.text)??""),t.type==="intent-end"){let d=i.intent_output;this.conversationId=(d==null?void 0:d.conversation_id)??this.conversationId,this._reply=((h=(l=(a=d==null?void 0:d.response)==null?void 0:a.speech)==null?void 0:l.plain)==null?void 0:h.speech)??""}t.type==="tts-end"&&((p=i.tts_output)!=null&&p.url)&&this.play(i.tts_output.url),t.type==="error"&&this.fail(i);let r=Me(this._phase,t);if(t.type==="run-end"){(c=this.unsub)==null||c.call(this),this.unsub=void 0,this.speaking||(this._phase=this._phase==="error"?"error":"idle");return}this._phase=r}onAudio(t){if(this._phase!=="listening"||!this.resampler)return;let i=Ve(this.resampler.push(t));this.handlerId===null?this.pending.push(i):this.sendPcm(i)}sendPcm(t){var i,r;this.handlerId!==null&&((r=(i=this.hass)==null?void 0:i.connection.socket)==null||r.send(qt(this.handlerId,t)))}endAudio(){var t,i;clearTimeout(this.stopTimer),this.handlerId!==null&&this.stream&&((i=(t=this.hass)==null?void 0:t.connection.socket)==null||i.send(qt(this.handlerId))),this._phase==="listening"&&(this._phase="thinking"),this.stopMic()}async stopMic(){var t,i;(t=this.stream)==null||t.getTracks().forEach(r=>r.stop()),this.stream=void 0,(i=this.recorder)==null||i.disconnect(),this.recorder=void 0,this.handlerId=null}play(t){var a;let i=t.startsWith("http")?t:this.hass.hassUrl(t);(a=this.audio)==null||a.pause();let r=new Audio(i);this.audio=r;try{this.ctx??(this.ctx=new AudioContext);let l=this.ctx.createMediaElementSource(r);this.analyser??(this.analyser=this.ctx.createAnalyser()),this.analyser.fftSize=256,l.connect(this.analyser),this.analyser.connect(this.ctx.destination),this.ctx.resume()}catch{}this._phase="responding",this.speaking=!0;let n=()=>{this.audio===r&&(this.speaking=!1,this._phase="idle")};r.onended=n,r.onerror=n;let o=window.setTimeout(n,3e4);r.onloadedmetadata=()=>{clearTimeout(o),Number.isFinite(r.duration)&&window.setTimeout(n,r.duration*1e3+3e3)},r.play().catch(n)}fail(t){let{text:i,detail:r}=Se(t);console.warn("HomeView voice:",r),this._error=i,this._detail=r,this._phase="error",this.teardown()}reset(){var t;this._heard="",this._reply="",this._error="",this._detail="",this._showDetail=!1,this.pending=[],this.handlerId=null,this.speaking=!1,(t=this.audio)==null||t.pause()}async teardown(){var t;clearTimeout(this.stopTimer),await this.stopMic(),await((t=this.unsub)==null?void 0:t.call(this).catch(()=>{})),this.unsub=void 0}draw(){var w,u;let t=(w=this.renderRoot)==null?void 0:w.querySelector("canvas.viz");if(!t)return!0;let i=Math.min(window.devicePixelRatio||1,2),r=t.clientWidth,n=t.clientHeight;if(!r||!n)return!1;(t.width!==Math.round(r*i)||t.height!==Math.round(n*i))&&(t.width=Math.round(r*i),t.height=Math.round(n*i));let o=t.getContext("2d");o.setTransform(i,0,0,i,0,0),o.clearRect(0,0,r,n);let a=this.phase(),l=(performance.now()-this.t0)/1e3,h=this.levels.length,p=a!=="idle"&&a!=="error",c=matchMedia("(prefers-reduced-motion: reduce)").matches,d=this.analyser?new Uint8Array(this.analyser.frequencyBinCount):null,v=!!d&&(a==="listening"||a==="responding")&&!((u=this._config)!=null&&u.satellite);v&&this.analyser.getByteFrequencyData(d);for(let f=0;f<h;f++){let b=0;if(v)b=(d[Math.min(d.length-1,2+Math.floor(Math.abs(f-h/2)/(h/2)*40))]/255)**1.4;else if(a==="listening"||a==="responding")b=.25+.2*Math.sin(l*5+f*.6)*Math.sin(l*1.7+f*.21);else if(a==="thinking"){let _=f/h*Math.PI*2;b=.12+.3*Math.max(0,Math.cos(_-l*3))**6}else b=.06;c&&(b=Math.min(b,.15)),Math.abs(b-this.levels[f])>.002&&(p=!0),this.levels[f]+=(b-this.levels[f])*.25}let m=r/2,x=n/2,$=Math.min(r,n)*.34,T=o.createRadialGradient(m,x,$*.1,m,x,$*1.25),E=a==="error"?"255 120 110":a==="listening"?"255 255 255":"255 236 210";T.addColorStop(0,`rgb(${E} / ${a==="idle"?.22:.42})`),T.addColorStop(1,`rgb(${E} / 0)`),o.fillStyle=T,o.beginPath(),o.arc(m,x,$*1.25,0,Math.PI*2),o.fill(),o.strokeStyle="rgb(255 255 255 / 0.95)",o.lineCap="round",o.lineWidth=Math.max(2,$*.06),o.shadowColor="rgb(40 30 20 / 0.25)",o.shadowBlur=4;for(let f=0;f<h;f++){let b=f/h*Math.PI*2-Math.PI/2,_=$*(.08+this.levels[f]*.9),S=$*.78;o.beginPath(),o.moveTo(m+Math.cos(b)*S,x+Math.sin(b)*S),o.lineTo(m+Math.cos(b)*(S+_),x+Math.sin(b)*(S+_)),o.stroke()}return p}renderContent(){var c;let t=this._config,i=this.phase(),r=!t.satellite&&this.micBlocked(),n=t.satellite?(c=this.hass)==null?void 0:c.states[t.satellite]:void 0,o=t.satellite?n?`${n.attributes.friendly_name??t.satellite}: ${i==="idle"?"Ready":jt[i]}`:`Satellite not found: ${t.satellite}`:i==="error"?this._error||jt.error:i==="idle"&&r?"Type a request":jt[i],a=i==="error"&&!t.satellite,[l,h]=i==="listening"?["Stop listening",M.stop]:a?["Try again",M.retry]:["Talk to Assist",M.mic],p=a&&this._showDetail;return y`<div class="voice-wrap ${p?"covered":""}">
      <div class="head ink">
        <span class="title">${t.name??"Assist"}</span>
        ${a?y`<span class="sub status" aria-live="polite" role="button" tabindex="0" title=${this._detail} @click=${this.showDetail} @keydown=${d=>(d.key==="Enter"||d.key===" ")&&this.showDetail(d)}>${o}</span>`:y`<span class="sub status" aria-live="polite">${o}</span>`}
      </div>
      <button class="orb" ?disabled=${!!t.satellite} aria-label=${l} @click=${()=>void(a?this.retry():this.talk())}>
        <canvas class="viz" aria-hidden="true"></canvas>
        <span class="mic">${h}</span>
      </button>
      <div class="lines ink" aria-live="polite">
        ${this._heard?y`<div class="heard">&ldquo;${this._heard}&rdquo;</div>`:g}
        ${this._reply?y`<div class="reply">${this._reply}</div>`:g}
        ${a&&this._detail?y`<button class="more" @click=${this.showDetail}>Details</button>`:g}
        ${r==="insecure"&&!this._heard&&!this._reply&&!a?y`<div class="notice">The microphone needs Home Assistant over HTTPS. Type instead, or see the README for options.</div>`:g}
      </div>
      ${t.satellite?g:this._typing||r?y`<form class="type" @submit=${this.submit}>
              <input name="q" type="text" placeholder="Ask Assist" autocomplete="off" aria-label="Request" />
              <button class="send" aria-label="Send">${M.send}</button>
            </form>`:y`<button class="kbd" aria-label="Type a request" @click=${()=>this._typing=!0}>${M.keyboard}</button>`}
      ${p?y`<div class="sheet ink" role="dialog" aria-label="Error details">
            <div class="sheet-head">
              <span class="title">${this._error}</span>
              <button class="more" @click=${()=>this._showDetail=!1}>Done</button>
            </div>
            <div class="detail">${this._detail}</div>
          </div>`:g}
    </div>`}resume(){!this.raf&&this.isConnected&&this.loop()}updated(t){var i,r;(i=super.updated)==null||i.call(this,t),t.has("_typing")&&this._typing&&((r=this.renderRoot.querySelector("input[name=q]"))==null||r.focus()),!this.raf&&this.isConnected&&this.loop()}};it.properties={...A.properties,_phase:{state:!0},_heard:{state:!0},_reply:{state:!0},_error:{state:!0},_detail:{state:!0},_showDetail:{state:!0},_typing:{state:!0}},it.editorFields=[{name:"name",selector:{text:{}}},{name:"pipeline",label:"Assist pipeline",helper:"Defaults to the preferred pipeline",selector:{assist_pipeline:{}}},{name:"satellite",label:"Voice satellite (optional)",helper:"Show this assist_satellite's state instead of using this device's microphone",selector:{entity:{filter:{domain:"assist_satellite"}}}},{name:"speak",label:"Play spoken replies",selector:{boolean:{}}}],it.styles=[z,R`
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
      .mic {
        position: relative;
        width: calc(var(--hv-ref) * 0.2);
        height: calc(var(--hv-ref) * 0.2);
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
        padding: 2px 0;
        flex: none;
        cursor: pointer;
        color: var(--hv-ink-2);
        font-size: calc(var(--hv-ref) * 0.07);
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
    `];customElements.define("homeview-voice-card",it);I("homeview-voice-card","HomeView Voice","Talk to Home Assistant Assist with an audio-reactive liquid-glass visualizer.");customElements.get("homeview-card-editor")||customElements.define("homeview-card-editor",ut);console.info("%c HOMEVIEW %c 0.1.1 ","background:#928980;color:#fff;border-radius:3px 0 0 3px","background:#2b241d;color:#fff;border-radius:0 3px 3px 0");
