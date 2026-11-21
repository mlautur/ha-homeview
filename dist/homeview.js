var Ie=globalThis,De=Ie.ShadowRoot&&(Ie.ShadyCSS===void 0||Ie.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,it=Symbol(),Lt=new WeakMap,ve=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==it)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(De&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=Lt.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&Lt.set(e,i))}return i}toString(){return this.cssText}},Ot=r=>new ve(typeof r=="string"?r:r+"",void 0,it),C=(r,...i)=>{let e=r.length===1?r[0]:i.reduce((t,s,n)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1],r[0]);return new ve(e,r,it)},Ht=(r,i)=>{if(De)r.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),s=Ie.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=e.cssText,r.appendChild(t)}},st=De?r=>r:r=>r instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return Ot(e)})(r):r;var{is:ts,defineProperty:is,getOwnPropertyDescriptor:ss,getOwnPropertyNames:rs,getOwnPropertySymbols:ns,getPrototypeOf:os}=Object,X=globalThis,It=X.trustedTypes,as=It?It.emptyScript:"",rt=X.reactiveElementPolyfillSupport,be=(r,i)=>r,nt={toAttribute(r,i){switch(i){case Boolean:r=r?as:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,i){let e=r;switch(i){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},zt=(r,i)=>!ts(r,i),Dt={attribute:!0,type:String,converter:nt,reflect:!1,useDefault:!1,hasChanged:zt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),X.litPropertyMetadata??(X.litPropertyMetadata=new WeakMap);var V=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??(this.l=[])).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=Dt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),s=this.getPropertyDescriptor(i,t,e);s!==void 0&&is(this.prototype,i,s)}}static getPropertyDescriptor(i,e,t){let{get:s,set:n}=ss(this.prototype,i)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let a=s==null?void 0:s.call(this);n==null||n.call(this,o),this.requestUpdate(i,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??Dt}static _$Ei(){if(this.hasOwnProperty(be("elementProperties")))return;let i=os(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(be("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(be("properties"))){let e=this.properties,t=[...rs(e),...ns(e)];for(let s of t)this.createProperty(s,e[s])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let s=this._$Eu(e,t);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let s of t)e.unshift(st(s))}else i!==void 0&&e.push(st(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var i;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(i=this.constructor.l)==null||i.forEach(e=>e(this))}addController(i){var e;(this._$EO??(this._$EO=new Set)).add(i),this.renderRoot!==void 0&&this.isConnected&&((e=i.hostConnected)==null||e.call(i))}removeController(i){var e;(e=this._$EO)==null||e.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ht(i,this.constructor.elementStyles),i}connectedCallback(){var i;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(i=this._$EO)==null||i.forEach(e=>{var t;return(t=e.hostConnected)==null?void 0:t.call(e)})}enableUpdating(i){}disconnectedCallback(){var i;(i=this._$EO)==null||i.forEach(e=>{var t;return(t=e.hostDisconnected)==null?void 0:t.call(e)})}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){var n;let t=this.constructor.elementProperties.get(i),s=this.constructor._$Eu(i,t);if(s!==void 0&&t.reflect===!0){let o=(((n=t.converter)==null?void 0:n.toAttribute)!==void 0?t.converter:nt).toAttribute(e,t.type);this._$Em=i,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(i,e){var n,o;let t=this.constructor,s=t._$Eh.get(i);if(s!==void 0&&this._$Em!==s){let a=t.getPropertyOptions(s),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:nt;this._$Em=s;let c=l.fromAttribute(e,a.type);this[s]=c??((o=this._$Ej)==null?void 0:o.get(s))??c,this._$Em=null}}requestUpdate(i,e,t,s=!1,n){var o;if(i!==void 0){let a=this.constructor;if(s===!1&&(n=this[i]),t??(t=a.getPropertyOptions(i)),!((t.hasChanged??zt)(n,e)||t.useDefault&&t.reflect&&n===((o=this._$Ej)==null?void 0:o.get(i))&&!this.hasAttribute(a._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:s,wrapped:n},o){t&&!(this._$Ej??(this._$Ej=new Map)).has(i)&&(this._$Ej.set(i,o??e??this[i]),n!==!0||o!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),s===!0&&this._$Em!==i&&(this._$Eq??(this._$Eq=new Set)).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[n,o]of s){let{wrapped:a}=o,l=this[n];a!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,o,l)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),(t=this._$EO)==null||t.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(e)):this._$EM()}catch(s){throw i=!1,this._$EM(),s}i&&this._$AE(e)}willUpdate(i){}_$AE(i){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostUpdated)==null?void 0:s.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(i){}firstUpdated(i){}};V.elementStyles=[],V.shadowRootOptions={mode:"open"},V[be("elementProperties")]=new Map,V[be("finalized")]=new Map,rt==null||rt({ReactiveElement:V}),(X.reactiveElementVersions??(X.reactiveElementVersions=[])).push("2.1.2");var we=globalThis,Ft=r=>r,ze=we.trustedTypes,Ut=ze?ze.createPolicy("lit-html",{createHTML:r=>r}):void 0,lt="$lit$",W=`lit$${Math.random().toFixed(9).slice(2)}$`,ct="?"+W,ls=`<${ct}>`,Q=document,xe=()=>Q.createComment(""),_e=r=>r===null||typeof r!="object"&&typeof r!="function",dt=Array.isArray,Vt=r=>dt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",ot=`[ 	
\f\r]`,ye=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Nt=/-->/g,Bt=/>/g,J=RegExp(`>|${ot}(?:([^\\s"'>=/]+)(${ot}*=${ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Gt=/'/g,qt=/"/g,Wt=/^(?:script|style|textarea|title)$/i,ht=r=>(i,...e)=>({_$litType$:r,strings:i,values:e}),p=ht(1),w=ht(2),rr=ht(3),ee=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),jt=new WeakMap,Z=Q.createTreeWalker(Q,129);function Kt(r,i){if(!dt(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ut!==void 0?Ut.createHTML(i):i}var Xt=(r,i)=>{let e=r.length-1,t=[],s,n=i===2?"<svg>":i===3?"<math>":"",o=ye;for(let a=0;a<e;a++){let l=r[a],c,h,d=-1,u=0;for(;u<l.length&&(o.lastIndex=u,h=o.exec(l),h!==null);)u=o.lastIndex,o===ye?h[1]==="!--"?o=Nt:h[1]!==void 0?o=Bt:h[2]!==void 0?(Wt.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=J):h[3]!==void 0&&(o=J):o===J?h[0]===">"?(o=s??ye,d=-1):h[1]===void 0?d=-2:(d=o.lastIndex-h[2].length,c=h[1],o=h[3]===void 0?J:h[3]==='"'?qt:Gt):o===qt||o===Gt?o=J:o===Nt||o===Bt?o=ye:(o=J,s=void 0);let g=o===J&&r[a+1].startsWith("/>")?" ":"";n+=o===ye?l+ls:d>=0?(t.push(c),l.slice(0,d)+lt+l.slice(d)+W+g):l+W+(d===-2?a:g)}return[Kt(r,n+(r[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},ke=class r{constructor({strings:i,_$litType$:e},t){let s;this.parts=[];let n=0,o=0,a=i.length-1,l=this.parts,[c,h]=Xt(i,e);if(this.el=r.createElement(c,t),Z.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=Z.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(lt)){let u=h[o++],g=s.getAttribute(d).split(W),f=/([.?@])?(.*)/.exec(u);l.push({type:1,index:n,name:f[2],strings:g,ctor:f[1]==="."?Ue:f[1]==="?"?Ne:f[1]==="@"?Be:ie}),s.removeAttribute(d)}else d.startsWith(W)&&(l.push({type:6,index:n}),s.removeAttribute(d));if(Wt.test(s.tagName)){let d=s.textContent.split(W),u=d.length-1;if(u>0){s.textContent=ze?ze.emptyScript:"";for(let g=0;g<u;g++)s.append(d[g],xe()),Z.nextNode(),l.push({type:2,index:++n});s.append(d[u],xe())}}}else if(s.nodeType===8)if(s.data===ct)l.push({type:2,index:n});else{let d=-1;for(;(d=s.data.indexOf(W,d+1))!==-1;)l.push({type:7,index:n}),d+=W.length-1}n++}}static createElement(i,e){let t=Q.createElement("template");return t.innerHTML=i,t}};function te(r,i,e=r,t){var o,a;if(i===ee)return i;let s=t!==void 0?(o=e._$Co)==null?void 0:o[t]:e._$Cl,n=_e(i)?void 0:i._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),n===void 0?s=void 0:(s=new n(r),s._$AT(r,e,t)),t!==void 0?(e._$Co??(e._$Co=[]))[t]=s:e._$Cl=s),s!==void 0&&(i=te(r,s._$AS(r,i.values),s,t)),i}var Fe=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,s=((i==null?void 0:i.creationScope)??Q).importNode(e,!0);Z.currentNode=s;let n=Z.nextNode(),o=0,a=0,l=t[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new ne(n,n.nextSibling,this,i):l.type===1?c=new l.ctor(n,l.name,l.strings,this,i):l.type===6&&(c=new Ge(n,this,i)),this._$AV.push(c),l=t[++a]}o!==(l==null?void 0:l.index)&&(n=Z.nextNode(),o++)}return Z.currentNode=Q,s}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},ne=class r{get _$AU(){var i;return((i=this._$AM)==null?void 0:i._$AU)??this._$Cv}constructor(i,e,t,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&(i==null?void 0:i.nodeType)===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=te(this,i,e),_e(i)?i===m||i==null||i===""?(this._$AH!==m&&this._$AR(),this._$AH=m):i!==this._$AH&&i!==ee&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):Vt(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==m&&_e(this._$AH)?this._$AA.nextSibling.data=i:this.T(Q.createTextNode(i)),this._$AH=i}$(i){var n;let{values:e,_$litType$:t}=i,s=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=ke.createElement(Kt(t.h,t.h[0]),this.options)),t);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(e);else{let o=new Fe(s,this),a=o.u(this.options);o.p(e),this.T(a),this._$AH=o}}_$AC(i){let e=jt.get(i.strings);return e===void 0&&jt.set(i.strings,e=new ke(i)),e}k(i){dt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,s=0;for(let n of i)s===e.length?e.push(t=new r(this.O(xe()),this.O(xe()),this,this.options)):t=e[s],t._$AI(n),s++;s<e.length&&(this._$AR(t&&t._$AB.nextSibling,s),e.length=s)}_$AR(i=this._$AA.nextSibling,e){var t;for((t=this._$AP)==null?void 0:t.call(this,!1,!0,e);i!==this._$AB;){let s=Ft(i).nextSibling;Ft(i).remove(),i=s}}setConnected(i){var e;this._$AM===void 0&&(this._$Cv=i,(e=this._$AP)==null||e.call(this,i))}},ie=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,s,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=i,this.name=e,this._$AM=s,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=m}_$AI(i,e=this,t,s){let n=this.strings,o=!1;if(n===void 0)i=te(this,i,e,0),o=!_e(i)||i!==this._$AH&&i!==ee,o&&(this._$AH=i);else{let a=i,l,c;for(i=n[0],l=0;l<n.length-1;l++)c=te(this,a[t+l],e,l),c===ee&&(c=this._$AH[l]),o||(o=!_e(c)||c!==this._$AH[l]),c===m?i=m:i!==m&&(i+=(c??"")+n[l+1]),this._$AH[l]=c}o&&!s&&this.j(i)}j(i){i===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},Ue=class extends ie{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===m?void 0:i}},Ne=class extends ie{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==m)}},Be=class extends ie{constructor(i,e,t,s,n){super(i,e,t,s,n),this.type=5}_$AI(i,e=this){if((i=te(this,i,e,0)??m)===ee)return;let t=this._$AH,s=i===m&&t!==m||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,n=i!==m&&(t===m||s);s&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,i):this._$AH.handleEvent(i)}},Ge=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){te(this,i)}},Yt={M:lt,P:W,A:ct,C:1,L:Xt,R:Fe,D:Vt,V:te,I:ne,H:ie,N:Ne,U:Be,B:Ue,F:Ge},at=we.litHtmlPolyfillSupport;at==null||at(ke,ne),(we.litHtmlVersions??(we.litHtmlVersions=[])).push("3.3.3");var Jt=(r,i,e)=>{let t=(e==null?void 0:e.renderBefore)??i,s=t._$litPart$;if(s===void 0){let n=(e==null?void 0:e.renderBefore)??null;t._$litPart$=s=new ne(i.insertBefore(xe(),n),n,void 0,e??{})}return s._$AI(r),s};var se=globalThis,D=class extends V{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let i=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=i.firstChild),i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Jt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var i;super.connectedCallback(),(i=this._$Do)==null||i.setConnected(!0)}disconnectedCallback(){var i;super.disconnectedCallback(),(i=this._$Do)==null||i.setConnected(!1)}render(){return ee}},Zt;D._$litElement$=!0,D.finalized=!0,(Zt=se.litElementHydrateSupport)==null||Zt.call(se,{LitElement:D});var pt=se.litElementPolyfillSupport;pt==null||pt({LitElement:D});(se.litElementVersions??(se.litElementVersions=[])).push("4.2.2");function U(r,i,e={}){r.dispatchEvent(new CustomEvent(i,{detail:e,bubbles:!0,composed:!0}))}var R=r=>r.split(".")[0];function qe(r,i){var s,n,o,a,l;let e=(s=r.entities)==null?void 0:s[i],t=(e==null?void 0:e.area_id)??(e!=null&&e.device_id?(o=(n=r.devices)==null?void 0:n[e.device_id])==null?void 0:o.area_id:void 0);return t?(l=(a=r.areas)==null?void 0:a[t])==null?void 0:l.name:void 0}function N(r,i){var e;return((e=r.states[i])==null?void 0:e.attributes.friendly_name)??i}var T=r=>!r||r.state==="unavailable"||r.state==="unknown";function O(r,i,e){let t=window;t.customCards??(t.customCards=[]),t.customCards.push({type:r,name:i,description:e,preview:!0})}var cs=r=>{var i;return r.media_class==="image"||!!((i=r.media_content_type)!=null&&i.startsWith("image/"))};function ut(r){let i=r.attributes;return typeof i.temperature=="number"?{mode:"single",value:i.temperature}:typeof i.target_temp_low=="number"&&typeof i.target_temp_high=="number"?{mode:"dual",low:i.target_temp_low,high:i.target_temp_high}:{mode:"none"}}function ei(r,i,e,t){let s=Math.round(r/i)*i;return+Math.min(t,Math.max(e,s)).toFixed(i<1?1:0)}function ti(r){let i=r.attributes;if(i.hvac_action==="cooling")return"high";if(i.hvac_action==="heating")return"low";let e=i.current_temperature;return typeof e=="number"&&typeof i.target_temp_low=="number"&&typeof i.target_temp_high=="number"&&Math.abs(e-i.target_temp_high)<Math.abs(e-i.target_temp_low)?"high":"low"}function mt(r,i){switch(r){case"media_player":return i==="playing";case"lock":return i!=="locked"&&i!=="unlocking";case"cover":return i==="open"||i==="opening";case"scene":return!1;default:return i==="on"}}function ii(r,i){switch(r){case"lock":return i==="locked"?["lock","unlock"]:["lock","lock"];case"scene":return["scene","turn_on"];case"script":return i==="on"?["script","turn_off"]:["script","turn_on"];case"cover":return["cover","toggle"];case"media_player":return i==="playing"||i==="paused"?["media_player","media_play_pause"]:null;case"light":case"switch":case"fan":case"input_boolean":return[r,"toggle"];default:return["homeassistant","toggle"]}}function si(r,i,e){let t=i+e/60;return{h:(r%12+t/60)*30,m:t*6,s:e*6}}function ft(r,i=new Date){if(!r)return{h:i.getHours(),m:i.getMinutes(),s:i.getSeconds(),ms:i.getMilliseconds()};let e=new Intl.DateTimeFormat("en-GB",{timeZone:r,hour:"numeric",minute:"numeric",second:"numeric",hourCycle:"h23"}).formatToParts(i),t=s=>{var n;return+(((n=e.find(o=>o.type===s))==null?void 0:n.value)??0)};return{h:t("hour"),m:t("minute"),s:t("second"),ms:i.getMilliseconds()}}function re(r){return(Array.isArray(r)?r:[r]).filter(e=>typeof e=="string").map(e=>e.trim()).filter(Boolean)}async function ri(r,i,e){let t=new Set,s=re(i).map(a=>[a,0]),n=0,o;for(;s.length&&t.size<5e4;){let[a,l]=s.shift(),c;try{c=await r.callWS({type:"media_source/browse_media",media_content_id:a})}catch(h){if(l>0)throw h;o??(o=h);continue}l===0&&n++;for(let h of c.children??[])if(cs(h)?t.add(h.media_content_id):e&&h.can_expand&&l<3&&s.push([h.media_content_id,l+1]),t.size>=5e4)break}if(!n&&o)throw o;return[...t]}function G(r,i){let e,t=new Promise((s,n)=>{e=setTimeout(()=>n(new Error("Home Assistant did not answer")),i)});return Promise.race([r,t]).finally(()=>clearTimeout(e))}function ni(r,i){let e={...r};for(let t of i)t in e&&!Array.isArray(e[t])&&(e[t]=re(e[t]));return e}function oi(r,i){let e={...r};for(let t of i){if(!(t in e))continue;let s=e[t];if(Array.isArray(s)&&s.some(o=>typeof o!="string"||!o.trim()))continue;let n=re(s);n.length?e[t]=n.length===1?n[0]:n:delete e[t]}return e}function ai(r,i,e){let t=Math.abs(r),s=Math.abs(i);if(t<10&&s<10)return e<600?"tap":null;let n=Math.max(t,s)/Math.max(e,1)>.5;return t>s*1.2&&(t>=60||n&&t>=25)?r<0?"left":"right":s>t*1.2&&(s>=90||n&&s>=30)?i<0?"up":"down":null}var je=class{constructor(i=100){this.list=[];this.pos=-1;this.max=i}peek(i){return this.list[this.pos+i]}step(i){let e=this.peek(i);return e!==void 0&&(this.pos+=i),e}push(i){this.list.splice(this.pos+1,1/0,i),this.list.length>this.max&&this.list.shift(),this.pos=this.list.length-1}drop(i){let e=this.list.indexOf(i);e<0||(this.list.splice(e,1),e<=this.pos&&this.pos--)}clear(){this.list=[],this.pos=-1}};function li(r,i=Math.random){let e=r.slice();for(let t=e.length-1;t>0;t--){let s=Math.floor(i()*(t+1));[e[t],e[s]]=[e[s],e[t]]}return e}function ci(r,i){switch(i.type){case"run-start":return r==="idle"?"listening":r;case"stt-vad-end":case"stt-end":case"intent-start":return"thinking";case"tts-start":case"tts-end":return"responding";case"error":return"error";default:return r}}function ds(r){return r==="NotAllowedError"||r==="SecurityError"?"Microphone access was denied":r==="NotFoundError"?"No microphone found":r==="stt-no-text-recognized"?"Didn't catch that":r==="pipeline-not-found"?"Assist pipeline not found":r==="timeout"?"Assist timed out":r.startsWith("wake")?"Wake word detection failed":r.startsWith("stt")?"Couldn't recognize speech":r.startsWith("intent")?"Couldn't handle the request":r.startsWith("tts")?"Couldn't speak the reply":"Something went wrong"}function di(r){let i=r??{},e=typeof i.code=="string"?i.code:typeof i.name=="string"?i.name:"",t=typeof i.message=="string"&&i.message||e||String(r);return{text:ds(e),detail:t}}function hi(r){switch(r){case"listening":return"listening";case"processing":return"thinking";case"responding":return"responding";case void 0:case"unavailable":return"error";default:return"idle"}}function pi(r,i){let e=r.attributes,t=r.state==="playing"||r.state==="paused";if(!t||!e.media_title)return{title:i,sub:t?oe(r.state):"Not playing"};let s=e.media_artist||e.media_album_artist||e.app_name||"";return{title:String(e.media_title),sub:r.state==="paused"?s?`Paused \xB7 ${s}`:"Paused":String(s||i)}}var oe=r=>r&&r[0].toUpperCase()+r.slice(1).replace(/_/g," "),hs=1,ps=4;function ui(r){let i=r??0;return i&hs?"daily":i&ps?"twice_daily":void 0}function mi(r){if(!(r!=null&&r.length))return{};let i=c=>typeof c=="number"&&isFinite(c)?c:void 0,e=r[0].is_daytime===void 0,t=e?r.slice(0,1):r.slice(0,2),s=t.map(c=>i(c.precipitation_probability)).filter(c=>c!==void 0),n=t.map(c=>i(c.precipitation)).filter(c=>c!==void 0),o={rain:s.length?Math.max(...s):void 0,amount:n.length?n.reduce((c,h)=>c+h,0):void 0};if(e)return{high:i(r[0].temperature),low:i(r[0].templow),...o};let a=t.find(c=>c.is_daytime),l=t.find(c=>!c.is_daytime);return{high:i(a==null?void 0:a.temperature),low:i((l==null?void 0:l.temperature)??(l==null?void 0:l.templow)),...o}}var fi={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"},us={"clear-night":"Clear",partlycloudy:"Partly Cloudy","lightning-rainy":"Thunderstorms","snowy-rainy":"Sleet","windy-variant":"Windy",exceptional:"Alert",rainy:"Rain",snowy:"Snow"},gi=r=>us[r]??oe(r),ms=r=>r.start.length===10;function $e(r){if(r.length===10){let[i,e,t]=r.split("-").map(Number);return new Date(i,e-1,t)}return new Date(r)}var Qt=r=>new Date(r.getFullYear(),r.getMonth(),r.getDate());function vi(r,i,e){return r.filter(t=>$e(t.end)>i).sort((t,s)=>$e(t.start).getTime()-$e(s.start).getTime()||t.summary.localeCompare(s.summary)).slice(0,e)}function bi(r,i,e){let t=$e(r.start),s=Qt(t<i?i:t),n=s.getTime()===Qt(i).getTime();return{label:n?"TODAY":s.toLocaleDateString(e,{weekday:"short"}).toUpperCase(),day:s.getDate(),today:n}}function yi(r,i){if(ms(r))return"All day";let e=t=>$e(t).toLocaleTimeString(i,{hour:"numeric",minute:"2-digit"});return`${e(r.start)} \u2013 ${e(r.end)}`}function wi(r,i,e){return`${r}${r.includes("?")?"&":"?"}hv=${Math.floor(i/(e*1e3))}`}var gt=r=>Math.min(20,Math.max(0,Number(r)||0));function Ve(r,i){return Array.isArray(r)?r.flatMap(e=>{let t=typeof e=="string"?{entity:e}:e;return!t||typeof t.entity!="string"||!t.entity.startsWith("camera.")?[]:[{entity:t.entity,name:typeof t.name=="string"?t.name:void 0,crop:gt(t.crop_top??i)}]}):[]}var Ce=(r,i)=>i?(r%i+i)%i:0,xi=r=>r<=2?Math.max(1,r):r===4?2:3,vt=["cleaning","paused","returning"];function bt(r,i){let t={docked:"Docked",cleaning:"Cleaning",paused:"Paused",returning:"Returning to dock",idle:"Idle",error:"Error",unavailable:"Offline"}[r]??oe(r);return i===void 0||r==="unavailable"?t:`${t} \xB7 ${Math.round(i)}%`}function _i(r){return r.map(i=>Number(i.split("_").pop())).filter(i=>Number.isInteger(i))}var fs=[{name:"",type:"expandable",flatten:!0,title:"Glass and wallpaper",schema:[{name:"wallpaper",label:"Wallpaper",helper:"Built-in champagne or teal, an image URL such as /local/wall.jpg, or 'view' to use the view background set in Home Assistant. A view background always wins.",selector:{select:{custom_value:!0,mode:"dropdown",options:[{value:"champagne",label:"Champagne (built-in)"},{value:"teal",label:"Teal (built-in)"},{value:"view",label:"View background"}]}}},{name:"glass",label:"Glass rendering",helper:"Auto pre-renders the refraction (fast, works everywhere). Live refracts in real time (Chromium only, GPU heavy). Frost is plain blur.",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (pre-rendered)"},{value:"live",label:"Live (Chromium)"},{value:"frost",label:"Frost"}]}}}]}],gs=r=>r.replace(/_/g," ").replace(/^./,i=>i.toUpperCase()),Se=class extends D{constructor(){super(...arguments);this.fields=[]}setConfig(e){this._config=e}render(){return!this.hass||!this._config?m:p`<ha-form
      .hass=${this.hass}
      .data=${ni(this._config,this.listNames())}
      .schema=${[...this.fields,...fs]}
      .computeLabel=${e=>e.label??gs(e.name)}
      .computeHelper=${e=>e.helper}
      @value-changed=${this.changed}
    ></ha-form>`}listNames(){return this.fields.filter(e=>e.list).map(e=>e.name)}changed(e){e.stopPropagation();let t=oi({...e.detail.value},this.listNames());for(let[s,n]of Object.entries(t))(n===""||n===void 0||n===null)&&delete t[s];U(this,"config-changed",{config:t})}};Se.properties={hass:{attribute:!1},fields:{attribute:!1},_config:{state:!0}};function vs(r,i=3){return Math.round((Math.sqrt(12*r*r/i+1)-1)/2)}function ki(r,i,e=3){let t=vs(i,e);if(t<1)return r;let{width:s,height:n}=r,o=r.data,a=new Uint8ClampedArray(o.length),l=(c,h,d)=>{let u=d?s:n,g=d?n:s,f=d?4:s*4,$=2*t+1;for(let A=0;A<g;A++){let x=d?A*s*4:A*4;for(let P=0;P<4;P++){let _=0;for(let v=-t;v<=t;v++)_+=c[x+Math.min(u-1,Math.max(0,v))*f+P];for(let v=0;v<u;v++){h[x+v*f+P]=_/$;let b=Math.min(u-1,v+t+1),k=Math.max(0,v-t);_+=c[x+b*f+P]-c[x+k*f+P]}}}};for(let c=0;c<e;c++)l(o,a,!0),l(a,o,!1);return a=new Uint8ClampedArray(0),r}function $i(r,i,e,t,s){let n=new Uint8ClampedArray(t*s*4);for(let o=0;o<s;o++){let a=Math.min(r.height-1,Math.max(0,e+o));for(let l=0;l<t;l++){let c=Math.min(r.width-1,Math.max(0,i+l)),h=(a*r.width+c)*4,d=(o*t+l)*4;n[d]=r.data[h],n[d+1]=r.data[h+1],n[d+2]=r.data[h+2],n[d+3]=r.data[h+3]}}return{width:t,height:s,data:n}}function Ci(r,i,e,t,s,n){let o=i.width,a=i.height,l=r.width,c=r.height,h=r.data,d=i.data,u=new Uint8ClampedArray(o*a*4),g=(s.scale+s.aberration)*n,f=s.scale*n,$=Math.max(0,s.scale-s.aberration)*n,A=1.25,x=1.03,P=(_,v,b)=>{_=Math.min(l-1.001,Math.max(0,_)),v=Math.min(c-1.001,Math.max(0,v));let k=_|0,E=v|0,L=_-k,B=v-E,z=(E*l+k)*4+b,F=z+l*4;return(h[z]*(1-L)+h[z+4]*L)*(1-B)+(h[F]*(1-L)+h[F+4]*L)*B};for(let _=0;_<a;_++)for(let v=0;v<o;v++){let b=(_*o+v)*4;if(!d[b+3])continue;let k=d[b]/255-.5,E=d[b+1]/255-.5,L=e+v+.5,B=t+_+.5,z=P(L+g*k,B+g*E,0),F=P(L+f*k,B+f*E,1),j=P(L+$*k,B+$*E,2),K=.2126*z+.7152*F+.0722*j;z=(K+(z-K)*A)*x,F=(K+(F-K)*A)*x,j=(K+(j-K)*A)*x;let ge=d[b+2]/255*s.specular;u[b]=z+(255-z)*ge,u[b+1]=F+(255-F)*ge,u[b+2]=j+(255-j)*ge,u[b+3]=255}return{width:o,height:a,data:u}}function Si(r){let i=n=>{let o=n/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4},e=0,t=0,s=r.data;for(let n=0;n<s.length;n+=16)s[n+3]!==0&&(e+=.2126*i(s[n])+.7152*i(s[n+1])+.0722*i(s[n+2]),t++);return t?e/t:0}function Mi(r,i=.07,e=.1,t=.5){let s=.30000000000000004;return r<=s?e:Math.min(t,Math.max(e,(r-s)/(r-i)))}var bs=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
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
</svg>`;function ys(){let r="";for(let e=0,t=120;t<1100;e++,t+=105)r+=`<path d="M-100 ${t} L520 ${t+330} L1100 ${t-40} L1100 ${t+15} L520 ${t+385} L-100 ${t+55}Z" fill="url(#band-${e%2?"b":"a"})" opacity="${e%2?".9":".75"}"/>`;let i="";for(let e=0;e<16;e++)i+=`<path d="M0 0 C 70 -60 200 -55 250 -8 C 180 -20 80 -10 0 0Z" transform="rotate(${e*22.5})" fill="${e%2?"url(#blade)":"#1d6158"}"/>`;return`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
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
</svg>`}var ws={champagne:{svg:bs,base:"#928980",glass:"84 74 64"},teal:{svg:ys(),base:"#174c46",glass:"255 255 255"}},xs=r=>r==="champagne"||r==="teal";function Ei(r){if(xs(r)){let i=ws[r];return`${i.base} center / cover no-repeat url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(i.svg)}")`}return`center / cover no-repeat url("${r.replace(/"/g,"%22")}")`}var Ai=new WeakMap,Pi=/^(ha-dialog|ha-md-dialog|hui-dialog-|ha-more-info)/;function ae(r){for(let i=r;i;i=i instanceof ShadowRoot?i.host:i.parentNode)if(i instanceof HTMLElement&&Pi.test(i.localName))return!0;return!1}function Ri(r){let i=r;for(;i;){if(i instanceof ShadowRoot||i instanceof Document){let e=i.querySelector("hui-view-background");if(e)return e}if(i instanceof HTMLElement&&Pi.test(i.localName))return null;i=i instanceof ShadowRoot?i.host:i.parentNode}return null}function Li(r){let i=Ai.get(r);return i||(i=new yt(r),Ai.set(r,i)),i}var Ti=()=>Math.min(window.devicePixelRatio||1,2),_s=150;function ks(r){let i=/url\((['"]?)(.*?)\1\)/.exec(r);return i?i[2]:null}function $s(r,i,e,t,s,n){let o=e,a=t,l=s.trim().split(/\s+/);if(l[0]==="cover"||l[0]==="contain"){let d=l[0]==="cover"?Math.max(r/e,i/t):Math.min(r/e,i/t);o=e*d,a=t*d}else if(l[0]!=="auto"||l[1]&&l[1]!=="auto"){let d=(f,$)=>f==="auto"||f===void 0?null:f.endsWith("%")?parseFloat(f)/100*$:parseFloat(f),u=d(l[0],r),g=d(l[1]??"auto",i);u!==null&&g!==null?(o=u,a=g):u!==null?(o=u,a=t*u/e):g!==null&&(a=g,o=e*g/t)}let c=n.trim().split(/\s+/),h=(d,u)=>d?d.endsWith("%")?parseFloat(d)/100*u||0:d==="left"||d==="top"?0:d==="right"||d==="bottom"?u:d==="center"?u/2:parseFloat(d)||0:u/2;return{x:h(c[0],r-o),y:h(c[1]??"50%",i-a),w:o,h:a}}var yt=class{constructor(i){this.snapshot=null;this.failure=null;this.listeners=new Set;this.key="";this.version=0;this.pending=null;this.recheck=!1;this.timer=0;this.settle=0;this.overrides=new Map;this.el=i}subscribe(i){return this.listeners.add(i),this.listeners.size===1?this.start():this.snapshot&&queueMicrotask(i),()=>{this.listeners.delete(i),this.listeners.size||this.stop()}}setWallpaper(i,e,t=!0){e?this.overrides.set(i,{value:e,explicit:t}):this.overrides.delete(i);let s=this.el.parentElement??this.el.getRootNode().host;if(!s)return;let n=[...this.overrides.values()],o=n.find(a=>a.explicit)??n[0];o?s.style.setProperty("--lovelace-background",Ei(o.value)):s.style.removeProperty("--lovelace-background"),this.check()}check(){if(this.pending){this.recheck=!0;return}let i=getComputedStyle(this.el),e=this.el.getBoundingClientRect();if(e.width<1||e.height<1)return;let t=[i.backgroundImage,i.backgroundSize,i.backgroundPosition,i.backgroundColor,i.opacity,Math.round(e.width),Math.round(e.height),Ti()].join("|");t!==this.key&&(this.key=t,clearTimeout(this.settle),this.settle=window.setTimeout(()=>{let s=this.el.getBoundingClientRect();this.pending=this.raster(getComputedStyle(this.el),s).finally(()=>{this.pending=null,this.recheck&&(this.recheck=!1,this.check())})},_s))}origin(){let i=this.el.getBoundingClientRect();return{x:i.x,y:i.y}}start(){this.ro=new ResizeObserver(()=>this.check()),this.ro.observe(this.el),this.mo=new MutationObserver(()=>this.check()),this.mo.observe(this.el,{attributes:!0,attributeFilter:["style","class","fixed-background"]}),this.el.parentElement&&this.mo.observe(this.el.parentElement,{attributes:!0,attributeFilter:["style"]}),this.timer=window.setInterval(()=>this.check(),2e3),this.check()}stop(){var i,e;clearTimeout(this.settle),(i=this.ro)==null||i.disconnect(),(e=this.mo)==null||e.disconnect(),clearInterval(this.timer),this.key=""}async raster(i,e){let t=Ti(),s=Math.max(1,Math.round(e.width*t)),n=Math.max(1,Math.round(e.height*t));try{let o=document.createElement("canvas");o.width=s,o.height=n;let a=o.getContext("2d",{willReadFrequently:!0});if(!a)throw new Error("no 2d context");let l=getComputedStyle(document.documentElement).backgroundColor;a.fillStyle=l&&l!=="rgba(0, 0, 0, 0)"?l:"#111",a.fillRect(0,0,s,n),a.globalAlpha=parseFloat(i.opacity)||1,a.fillStyle=i.backgroundColor,a.fillRect(0,0,s,n);let c=i.backgroundImage;if(c&&c!=="none"){let d=ks(c);if(!d||/gradient\(/.test(c.replace(/url\(.*?\)/g,"")))throw new Error("background is not a plain image");let u=await Cs(d),g=$s(e.width,e.height,u.naturalWidth||e.width,u.naturalHeight||e.height,i.backgroundSize,i.backgroundPosition);a.drawImage(u,g.x*t,g.y*t,g.w*t,g.h*t)}let h=a.getImageData(0,0,s,n);this.failure=null,this.snapshot={pixels:{width:s,height:n,data:h.data},x:e.x,y:e.y,k:t,version:++this.version}}catch(o){this.failure=o instanceof Error?o.message:String(o),this.snapshot=null}this.listeners.forEach(o=>o())}};function Cs(r){return new Promise((i,e)=>{let t=new Image,s=new URL(r,location.href);s.origin!==location.origin&&s.protocol.startsWith("http")&&(t.crossOrigin="anonymous"),t.onload=()=>i(t),t.onerror=()=>e(new Error(`cannot load background ${r.slice(0,80)}`)),t.src=r})}function Ss(r,i,e,t,s){let n=Math.abs(r)-e+s,o=Math.abs(i)-t+s;return Math.min(Math.max(n,o),0)+Math.hypot(Math.max(n,0),Math.max(o,0))-s}function Ms(r){let i=1-Math.min(1,Math.max(0,r)),e=(1-i**4)**.75;if(e<1e-6)return 0;let t=Math.atan(Math.min(i**3/e,8)),s=Math.sin(t)/1.5;return s>=1?Math.sin(t):Math.sin(t-Math.asin(s))}function Oi(r,i,e,t,s){let n=Math.max(1,Math.round(r*s)),o=Math.max(1,Math.round(i*s)),a=n/2,l=o/2,c=Math.min(e*s,a,l),h=Math.max(1,t*s),d=Math.ceil(h),u=new Float32Array(d+1);for(let v=1;v<=d;v++)u[v]=u[v-1]+Ms(v/d);let g=v=>{if(v<=0)return 0;if(v>=d)return u[d];let b=Math.floor(v),k=v-b;return u[b]*(1-k)+u[b+1]*k},f=new Float32Array(n*o),$=new Float32Array(n*o);for(let v=0;v<o;v++)for(let b=0;b<n;b++){let k=Ss(b-a+.5,v-l+.5,a,l,c);$[v*n+b]=k,f[v*n+b]=k>0?0:g(Math.min(h,-k))}let A=1.35,x=-.54,P=-.84,_=new Uint8ClampedArray(n*o*4);for(let v=0;v<o;v++)for(let b=0;b<n;b++){let k=v*n+b,E=k<<2,L=$[k];if(L>0){_[E]=_[E+1]=_[E+2]=128,_[E+3]=0;continue}if(L<-h-2){_[E]=_[E+1]=128,_[E+2]=0,_[E+3]=255;continue}let B=Math.max(0,b-1),z=Math.min(n-1,b+1),F=Math.max(0,v-1),j=Math.min(o-1,v+1),K=Math.max(-1,Math.min(1,(f[v*n+z]-f[v*n+B])/(z-B||1)*A)),ge=Math.max(-1,Math.min(1,(f[j*n+b]-f[F*n+b])/(j-F||1)*A)),Et=0;if(L>=-h){let At=$[v*n+z]-$[v*n+B],Tt=$[j*n+b]-$[F*n+b],Pt=Math.hypot(At,Tt)||1,Rt=At/Pt*x+Tt/Pt*P,es=(1-Math.min(1,-L/h))**1.6;Et=(Math.max(0,Rt)+Math.max(0,-Rt)*.35)*es}_[E]=128+K*127,_[E+1]=128+ge*127,_[E+2]=Math.round(Et*255),_[E+3]=255}return{width:n,height:o,data:_}}function Hi(r,i,e={}){return{radius:i,bevel:Math.max(4,Math.round(r*(e.bevel??.13))),scale:Math.round(r*(e.refraction??.3)),aberration:Math.max(1,Math.round(r*(e.aberration??.02))),frost:+(r*(e.frost??.007)).toFixed(2),specular:.55}}function Ii(){let r=navigator.userAgent;return!(/Safari/.test(r)&&!/Chrome|Chromium|Edg|OPR/.test(r))&&(CSS.supports("backdrop-filter","url(#x)")||CSS.supports("-webkit-backdrop-filter","url(#x)"))}function Di(r,i,e,t,s){let n=Math.ceil(s.scale+s.aberration+4),o=n/e*100,a=n/t*100,l=(c,h)=>`<feDisplacementMap in="SourceGraphic" in2="map" scale="${c}" xChannelSelector="R" yChannelSelector="G" result="${h}"/>`;return`<filter id="${r}" color-interpolation-filters="sRGB" x="-${o}%" y="-${a}%" width="${100+2*o}%" height="${100+2*a}%">
  <feImage href="${i}" x="0" y="0" width="${e}" height="${t}" preserveAspectRatio="none" result="map"/>
  ${l(s.scale+s.aberration,"dR")}<feColorMatrix in="dR" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
  ${l(s.scale,"dG")}<feColorMatrix in="dG" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>
  ${l(Math.max(0,s.scale-s.aberration),"dB")}<feColorMatrix in="dB" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>
  <feBlend in="r" in2="g" mode="screen" result="rg"/><feBlend in="rg" in2="b" mode="screen" result="rgb"/>
  <feGaussianBlur in="rgb" stdDeviation="${s.frost}" result="frosted"/>
  <feColorMatrix in="map" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 ${s.specular} 0 0" result="spec"/>
  <feComposite in="spec" in2="frosted" operator="over"/>
</filter>`}var wt=window.homeview??(window.homeview={timings:[]}),Me=new Map;function zi(r,i,e,t){let s=[r,i,e.radius.toFixed(1),e.bevel,t].join("|"),n=Me.get(s);return n||(n=Oi(r,i,e.radius,e.bevel,t),Me.size>24&&Me.delete(Me.keys().next().value),Me.set(s,n)),n}var Ee=new Set,xt=!1;function Fi(){xt||(xt=!0,requestAnimationFrame(()=>{xt=!1;let r=performance.now();for(let i of Ee)if(Ee.delete(i),i.bakeNow(),performance.now()-r>12)break;Ee.size&&Fi()}))}var Es=()=>matchMedia("(prefers-reduced-transparency: reduce)").matches,We=class{constructor(i,e="rect"){this.mode="frost";this.opts={};this.shape="rect";this.backdrop=null;this.poll=0;this.lastKey="";this.onScroll=()=>this.request();this.host=i,this.shape=e,i.addController(this)}setOptions(i){let e=JSON.stringify(i)!==JSON.stringify(this.opts);this.opts={...i},e&&this.host.isConnected&&this.attach()}hostConnected(){requestAnimationFrame(()=>this.attach()),window.addEventListener("scroll",this.onScroll,{capture:!0,passive:!0}),window.addEventListener("resize",this.onScroll,{passive:!0}),this.poll=window.setInterval(()=>this.request(),700)}hostDisconnected(){var i;this.detach(),window.removeEventListener("scroll",this.onScroll,{capture:!0}),window.removeEventListener("resize",this.onScroll),clearInterval(this.poll),(i=this.ro)==null||i.disconnect(),this.ro=void 0,Ee.delete(this)}hostUpdated(){let i=this.card();i&&!this.ro&&(this.ro=new ResizeObserver(()=>this.request()),this.ro.observe(i)),this.request()}card(){return this.host.renderRoot.querySelector(".hv-glass")}canvas(){return this.host.renderRoot.querySelector("canvas.hv-bake")}detach(){var i,e;(i=this.unsub)==null||i.call(this),this.unsub=void 0,(e=this.backdrop)==null||e.setWallpaper(this,void 0),this.backdrop=null}attach(){if(!this.host.isConnected)return;this.detach();let i=Ri(this.host);this.backdrop=i?Li(i):null;let e=this.opts.wallpaper??"champagne";this.backdrop&&e!=="view"&&e!=="none"&&this.backdrop.setWallpaper(this,e,this.opts.wallpaper!==void 0),this.backdrop&&(this.unsub=this.backdrop.subscribe(()=>this.request(!0))),this.lastKey="",this.request(!0)}request(i=!1){i&&(this.lastKey=""),!(!this.host.isConnected||!this.card())&&this.key()!==this.lastKey&&(Ee.add(this),Fi())}geometry(){let i=this.card();if(!i)return null;let e=i.offsetWidth,t=i.offsetHeight;if(e<8||t<8)return null;let s=i.getBoundingClientRect();return{x:s.x+s.width/2-e/2,y:s.y+s.height/2-t/2,w:e,h:t}}key(){var t,s,n;let i=this.geometry();if(!i)return"none";let e=((t=this.backdrop)==null?void 0:t.origin())??{x:0,y:0};return[Math.round(i.x-e.x),Math.round(i.y-e.y),i.w,i.h,((n=(s=this.backdrop)==null?void 0:s.snapshot)==null?void 0:n.version)??-1,this.mode,JSON.stringify(this.opts)].join("|")}params(i,e){let t=this.card(),s=Math.max(110,Math.min(260,Math.min(i,e))),n=this.shape==="circle"?Math.min(i,e)/2:parseFloat(getComputedStyle(t).borderTopLeftRadius)||0;return Hi(s,n,this.opts)}resolveMode(){var e;let i=this.opts.glass??"auto";return Es()||i==="frost"?"frost":i==="live"?Ii()?"live":"frost":(e=this.backdrop)!=null&&e.snapshot?"baked":"frost"}bakeNow(){let i=this.card(),e=this.canvas(),t=this.geometry();if(!i||!e||!t||!i.style.getPropertyValue("--hv-radius"))return;if(this.mode=this.resolveMode(),this.lastKey=this.key(),i.dataset.glass=this.mode,this.mode!=="live"&&i.style.removeProperty("backdrop-filter"),this.mode==="frost"){i.style.setProperty("--hv-tint-rgb","84 74 64"),i.style.setProperty("--hv-tint-a",".28");return}let s=this.params(t.w,t.h);if(this.mode==="live"){this.applyLive(i,t.w,t.h,s);return}let n=performance.now(),o=this.backdrop.snapshot,a=o.k,l=this.backdrop.origin(),c=zi(t.w,t.h,s,a),h=s.frost*a,d=Math.ceil((s.scale+s.aberration)*a+h*3+2),u=Math.round((t.x-l.x)*a)-d,g=Math.round((t.y-l.y)*a)-d,f=ki($i(o.pixels,u,g,c.width+2*d,c.height+2*d),h),$=Ci(f,c,d,d,s,a);e.width=$.width,e.height=$.height,e.getContext("2d").putImageData(new ImageData($.data,$.width,$.height),0,0);let A=Si($);A<.18?(i.style.setProperty("--hv-tint-rgb","255 255 255"),i.style.setProperty("--hv-tint-a",".13")):(i.style.setProperty("--hv-tint-rgb","84 74 64"),i.style.setProperty("--hv-tint-a",String(Math.max(.13,Mi(A)).toFixed(3)))),wt.timings.push({card:this.host.localName,w:t.w,h:t.h,ms:Math.round(performance.now()-n)}),wt.timings.length>200&&wt.timings.splice(0,100)}applyLive(i,e,t,s){let n=Math.min(window.devicePixelRatio||1,2),o=zi(e,t,s,n),a=document.createElement("canvas");a.width=o.width,a.height=o.height,a.getContext("2d").putImageData(new ImageData(o.data,o.width,o.height),0,0);let l=a.toDataURL("image/png"),c=`hv-${Math.random().toString(36).slice(2,9)}`,d=this.host.renderRoot.querySelector("svg.hv-filters");d||(d=document.createElementNS("http://www.w3.org/2000/svg","svg"),d.setAttribute("class","hv-filters"),d.setAttribute("aria-hidden","true"),d.setAttribute("style","position:absolute;width:0;height:0;overflow:hidden"),this.host.renderRoot.appendChild(d)),d.innerHTML=Di(c,l,e,t,s);let u=`url(#${c}) saturate(1.25) brightness(1.03)`;i.style.setProperty("backdrop-filter",u),i.style.setProperty("-webkit-backdrop-filter",u),i.style.setProperty("--hv-tint-rgb","255 255 255"),i.style.setProperty("--hv-tint-a",".13")}};var H=C`
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
`,S=class extends D{constructor(i="rect"){super(),this.glass=new We(this,i)}static getConfigElement(){let i=document.createElement("homeview-card-editor");return i.fields=this.editorFields,i}setConfig(i){if(!i)throw new Error("Invalid configuration");this.validate(i),this._config=i,this.glass.setOptions({glass:i.glass,wallpaper:i.wallpaper,bevel:i.bevel,refraction:i.refraction,aberration:i.aberration,frost:i.frost})}validate(i){}getCardSize(){return 3}get square(){var i,e;return typeof((e=(i=this._config)==null?void 0:i.grid_options)==null?void 0:e.rows)!="number"}refFrom(i,e){return Math.min(i,e)}get onScreen(){return this.getClientRects().length>0}resume(){}cardClass(){return""}render(){return this._config?p`<ha-card class="hv-glass ${this.square?"square":""} ${this.cardClass()}">
      <canvas class="hv-bake" aria-hidden="true"></canvas>
      <div class="hv-tint"></div>
      <div class="hv-content">${this.renderContent()}</div>
    </ha-card>`:p``}firstUpdated(i){let e=this.renderRoot.querySelector("ha-card");e&&(this.sizer=new ResizeObserver(()=>{let t=this.refFrom(e.offsetWidth,e.offsetHeight);e.style.setProperty("--hv-ref",`${t}px`),e.style.setProperty("--hv-radius",`${Math.round(Math.max(14,Math.min(34,t*.125)))}px`),e.toggleAttribute("data-wide",e.offsetWidth>e.offsetHeight*1.5),e.toggleAttribute("data-short",e.offsetHeight<240),this.glass.request(!0),e.offsetWidth&&this.resume()}),this.sizer.observe(e))}disconnectedCallback(){var i;super.disconnectedCallback(),(i=this.sizer)==null||i.disconnect(),this.sizer=void 0}connectedCallback(){super.connectedCallback(),this.hasUpdated&&!this.sizer&&this.firstUpdated(new Map)}};S.properties={hass:{attribute:!1},_config:{state:!0}},S.editorFields=[];var M=r=>w`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${r}</svg>`,y={sun:M(w`<circle cx="12" cy="12" r="4.3"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2.2v2.4M12 19.4v2.4M2.2 12h2.4M19.4 12h2.4M5.1 5.1l1.7 1.7M17.2 17.2l1.7 1.7M5.1 18.9l1.7-1.7M17.2 6.8l1.7-1.7"/></g>`),moon:M(w`<path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8a8.6 8.6 0 1 0 10.8 10.8z"/><path d="M17 3.2l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6zM20.6 7.6l.4.9.9.4-.9.4-.4.9-.4-.9-.9-.4.9-.4z"/>`),padlock:w`<svg class="padlock" viewBox="0 0 24 24" fill="currentColor" overflow="visible" aria-hidden="true"><g class="pl"><path class="sh-open" d="M16.55 12V7a4.4 4.4 0 0 1 8.8 0v2.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path class="sh-closed" d="M7.75 12V7a4.4 4.4 0 0 1 8.8 0v5" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="5" y="11" width="14" height="11.25" rx="2.4"/></g></svg>`,light:M(w`<rect x="11.1" y="1.5" width="1.8" height="5" rx=".9"/><rect x="8.6" y="1.2" width="6.8" height="1.9" rx=".95"/><path d="M12 6.2c-4.1 0-7.6 3.2-8 7.3-.05.5.35.9.85.9h14.3c.5 0 .9-.4.85-.9-.4-4.1-3.9-7.3-8-7.3z"/><path d="M8.6 15.6h6.8a3.4 3.4 0 0 1-6.8 0z"/>`),fan:M(w`<circle cx="12" cy="10" r="8.2" fill="none" stroke="currentColor" stroke-width="1.6"/><g class="blades"><path d="M12 10c-.4-2.6.2-5 1.9-5.6 1.6-.5 2.6 1.4 1.4 3.1-.8 1.2-2 1.9-3.3 2.5z"/><path d="M12 10c2.4 1 4.2 2.8 3.8 4.5-.4 1.6-2.6 1.5-3.4-.4-.6-1.3-.6-2.7-.4-4.1z"/><path d="M12 10c-2 1.6-4.4 2.3-5.6 1.1-1.2-1.2.1-3 2.1-2.8 1.4.1 2.5.9 3.5 1.7z"/></g><circle cx="12" cy="10" r="1.3"/><path d="M10.6 18.1h2.8l.9 3.4H9.7z"/><rect x="7.5" y="21" width="9" height="1.8" rx=".9"/>`),curtains:M(w`<rect x="2" y="2.5" width="20" height="1.8" rx=".9"/><path d="M4 4.3h6.5c-.3 4.6-1.4 9.8-3.5 16.9H4z"/><path d="M20 4.3h-6.5c.3 4.6 1.4 9.8 3.5 16.9H20z"/>`),curtainsOpen:M(w`<rect x="2" y="2.5" width="20" height="1.8" rx=".9"/><path d="M4 4.3h3.2c-.2 4.6-.6 9.8-1.4 16.9H4z"/><path d="M20 4.3h-3.2c.2 4.6.6 9.8 1.4 16.9H20z"/>`),garage:M(w`<path d="M2 9.6 12 3l10 6.6V21a1 1 0 0 1-1 1h-1.6V11.4H4.6V22H3a1 1 0 0 1-1-1z"/><rect x="6.2" y="13" width="11.6" height="2" rx=".5"/><rect x="6.2" y="16.2" width="11.6" height="2" rx=".5"/><rect x="6.2" y="19.4" width="11.6" height="2" rx=".5"/>`),garageOpen:M(w`<path d="M2 9.6 12 3l10 6.6V21a1 1 0 0 1-1 1h-1.6V11.4H4.6V22H3a1 1 0 0 1-1-1z"/><rect x="6.2" y="13" width="11.6" height="2" rx=".5"/>`),power:M(w`<path d="M12 2.5v8.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M7.1 5.4a8 8 0 1 0 9.8 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`),play:M(w`<path d="M8 4.7v14.6c0 .9 1 1.4 1.7.9l11-7.3c.7-.4.7-1.4 0-1.8l-11-7.3C9 3.3 8 3.8 8 4.7z"/><path d="M3.5 6.5l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z"/>`),dot:M(w`<circle cx="12" cy="12" r="6"/>`),music:M(w`<path d="M20 2.6v12.9a3.4 3.4 0 1 1-1.9-3.06V7.1L9.6 8.9v8.6a3.4 3.4 0 1 1-1.9-3.06V5.6c0-.6.4-1.1 1-1.2l10.1-2.4c.6-.15 1.2.3 1.2.6z"/>`),start:M(w`<path d="M7 4.7v14.6c0 .9 1 1.4 1.7.9l11-7.3c.7-.4.7-1.4 0-1.8l-11-7.3C8 3.3 7 3.8 7 4.7z"/>`),home:M(w`<path d="M3 11.2 12 3.5l9 7.7V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>`),locate:M(w`<circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3"/><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),pause:M(w`<rect x="6" y="4.5" width="4.2" height="15" rx="1.4"/><rect x="13.8" y="4.5" width="4.2" height="15" rx="1.4"/>`),vacuum:M(w`<path fill-rule="evenodd" d="M12 2.4a9.6 9.6 0 1 1 0 19.2 9.6 9.6 0 0 1 0-19.2zM4.2 9.16a8.3 8.3 0 0 1 15.6 0l-1.13.41a7.1 7.1 0 0 0-13.34 0zM12 5.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8zm0 1.1a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6z"/>`),calendar:M(w`<rect x="3" y="4.5" width="18" height="16.5" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 9.5h18" stroke="currentColor" stroke-width="1.8"/><path d="M8 2.5v4M16 2.5v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><rect x="6.5" y="12.5" width="3" height="2.6" rx=".6"/><rect x="10.5" y="12.5" width="3" height="2.6" rx=".6"/><rect x="14.5" y="12.5" width="3" height="2.6" rx=".6"/><rect x="6.5" y="16.3" width="3" height="2.6" rx=".6"/><rect x="10.5" y="16.3" width="3" height="2.6" rx=".6"/>`),camera:M(w`<rect x="2" y="6" width="14.5" height="12" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M16.5 10.4 22 7.2v9.6l-5.5-3.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`),drop:M(w`<path d="M12 3c-.2 0-.4.1-.5.3C9.6 6 6.5 10.3 6.5 14a5.5 5.5 0 0 0 11 0c0-3.7-3.1-8-5-10.7-.1-.2-.3-.3-.5-.3z" fill="none" stroke="currentColor" stroke-width="1.8"/>`),chevronUp:w`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 15l7-7 7 7"/></svg>`,chevronDown:w`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>`,mic:M(w`<rect x="8.5" y="2" width="7" height="12.5" rx="3.5"/><path d="M5 11a7 7 0 0 0 14 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 18v3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),keyboard:M(w`<rect x="2" y="5.5" width="20" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6 9.5h1.6M9.2 9.5h1.6M12.4 9.5h1.6M15.6 9.5h1.6M6 12.5h1.6M15.6 12.5h1.6M9.2 12.5h4.8M7.5 15.5h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`),retry:M(w`<path d="M19 12a7 7 0 1 1-2.05-4.95" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M20 3.6v6h-6z"/>`),stop:M(w`<rect x="6" y="6" width="12" height="12" rx="2.5"/>`),close:w`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,grid:M(w`<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/>`),muted:M(w`<path d="M3 9.3v5.4c0 .6.4 1 1 1h3.2l4.3 3.8c.6.5 1.5.1 1.5-.7V5.2c0-.8-.9-1.2-1.5-.7L7.2 8.3H4c-.6 0-1 .4-1 1z"/><path d="m16 9 5 6m0-6-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),sound:M(w`<path d="M3 9.3v5.4c0 .6.4 1 1 1h3.2l4.3 3.8c.6.5 1.5.1 1.5-.7V5.2c0-.8-.9-1.2-1.5-.7L7.2 8.3H4c-.6 0-1 .4-1 1z"/><path d="M16 8.5a4.6 4.6 0 0 1 0 7M18.8 5.8a8.4 8.4 0 0 1 0 12.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),send:M(w`<path d="M3.4 11.2 19.6 4.1c.8-.3 1.6.5 1.3 1.3l-7.1 16.2c-.3.8-1.5.7-1.7-.1l-1.6-6.2-6.2-1.6c-.8-.2-.9-1.4-.1-1.7z"/>`)};function Ui(r,i,e){switch(r){case"light":return y.light;case"lock":return y.padlock;case"fan":return y.fan;case"cover":return i==="garage"||i==="gate"?e?y.garageOpen:y.garage:e?y.curtainsOpen:y.curtains;case"scene":return y.sun;case"script":return y.play;case"switch":case"input_boolean":return y.power;case"media_player":return e?y.pause:y.music;case"vacuum":return y.vacuum;default:return y.dot}}var As={easing:"cubic-bezier(.34,1.56,.64,1)",duration:520};function Ts(r,i,e,t=1){let s=Math.sqrt(i/t),n=e/(2*Math.sqrt(i*t));if(n>=1)return 1-Math.exp(-s*r)*(1+s*r);let o=s*Math.sqrt(1-n*n);return 1-Math.exp(-n*s*r)*(Math.cos(o*r)+n*s/o*Math.sin(o*r))}function Ps(r=210,i=17,e=1,t=48){let s=a=>Ts(a,r,i,e),n=0;for(;n<4&&!(Math.abs(1-s(n))<.002&&Math.abs(1-s(n+.05))<.002);)n+=.01;let o=Array.from({length:t+1},(a,l)=>+s(l/t*n).toFixed(4));return o[t]=1,{easing:`linear(${o.join(",")})`,duration:Math.round(n*1e3)}}var Ke;function Ni(){if(Ke)return Ke;let r=Ps();return Ke=typeof CSS<"u"&&typeof CSS.supports=="function"&&CSS.supports("transition-timing-function","linear(0, 1)")?r:As,Ke}var Rs=800,le=class extends S{constructor(){super(...arguments);this.sendTimer=0;this.lastDir=0}static getStubConfig(e){return{entity:Object.keys(e.states).find(t=>t.startsWith("climate."))??""}}validate(e){if(!e.entity||!e.entity.startsWith("climate."))throw new Error("Pick a climate entity")}getGridOptions(){return{columns:8,rows:"auto",min_columns:6,min_rows:4}}getCardSize(){return 6}refFrom(e,t){return Math.min(e,t)/2}get stateObj(){var e;return(e=this.hass)==null?void 0:e.states[this._config.entity]}get step(){var e,t,s;return((e=this._config)==null?void 0:e.step)??((t=this.stateObj)==null?void 0:t.attributes.target_temp_step)??(((s=this.hass)==null?void 0:s.config.unit_system.temperature)==="\xB0C"?.5:1)}current(){let e=this.stateObj;if(!e)return{mode:"none"};let t=ut(e),s=this._pending;return s&&Date.now()-s.at<6e3?{...t,...Object.fromEntries(Object.entries(s).filter(([n,o])=>n!=="at"&&o!==void 0))}:t}activeSide(){return this.current().mode!=="dual"?"single":this._side??ti(this.stateObj)}willUpdate(e){if(e.has("hass")&&this._pending&&this.stateObj&&!this.sendTimer){let t=ut(this.stateObj),s=this._pending;((s.value===void 0||s.value===t.value)&&(s.low===void 0||s.low===t.low)&&(s.high===void 0||s.high===t.high)||Date.now()-s.at>6e3)&&(this._pending=void 0)}}shown(){let e=this.current(),t=this.activeSide();return t==="single"?e.value:t==="low"?e.low:e.high}stepBy(e){let t=this.stateObj;if(!t)return;let s=this.current(),n=this.activeSide(),o=t.attributes,a=o.min_temp??-1/0,l=o.max_temp??1/0,c=this.step,h=this.shown();if(h===void 0)return;let d=a,u=l;n==="low"&&s.high!==void 0&&(u=Math.min(l,s.high-c)),n==="high"&&s.low!==void 0&&(d=Math.max(a,s.low+c));let g=ei(h+e*c,c,d,u);if(g===h)return;this.ghost(e);let f={...this._pending??{},at:Date.now()};n==="single"?f.value=g:f[n]=g,this._pending=f,clearTimeout(this.sendTimer),this.sendTimer=window.setTimeout(()=>this.send(),Rs)}send(){this.sendTimer=0;let e=this.stateObj;if(!e||!this.hass||!this._pending)return;let t=this.current(),s=t.mode==="dual"?{target_temp_low:t.low,target_temp_high:t.high}:{temperature:t.value};this._pending={...this._pending,at:Date.now()},this.hass.callService("climate","set_temperature",s,{entity_id:e.entity_id})}ghost(e){this.lastDir=e;let t=this.renderRoot.querySelector(".num:not(.ghost)");if(!t||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let s=t.cloneNode(!0);s.classList.add("ghost"),t.parentElement.appendChild(s),s.animate([{transform:"none",opacity:1},{transform:`translateY(${-36*e}%) scale(.9)`,opacity:0}],{duration:200,easing:"cubic-bezier(.4,0,1,1)",fill:"forwards"}).finished.then(()=>s.remove(),()=>s.remove())}updated(e){var o;if((o=super.updated)==null||o.call(this,e),!this.lastDir)return;let t=this.lastDir;this.lastDir=0;let s=this.renderRoot.querySelector(".num:not(.ghost)");if(!s||matchMedia("(prefers-reduced-motion: reduce)").matches)return;let n=Ni();s.animate([{transform:`translateY(${40*t}%) scale(.9)`},{transform:"none"}],{duration:n.duration,easing:n.easing}),s.animate([{opacity:0},{opacity:1}],{duration:180,easing:"ease-out"})}fmt(e){return e===void 0?"--":this.step<1?e.toFixed(1):String(Math.round(e))}renderContent(){let e=this._config;if(!this.hass)return m;let t=this.stateObj;if(!t)return p`<div class="center warning ink">Entity not found: ${e.entity}</div>`;let s=this.current(),n=this.activeSide(),o=t.state==="off",a=T(t),l=this.shown(),c=t.attributes.current_temperature,h=e.subtitle??qe(this.hass,e.entity)??t.attributes.friendly_name,d=t.attributes,u=!a&&l!==void 0,g=!u||l>=((n==="low"&&s.high!==void 0?s.high-this.step:d.max_temp)??1/0),f=!u||l<=((n==="high"&&s.low!==void 0?s.low+this.step:d.min_temp)??-1/0);return p`<div class="thermo">
      <div class="temp" aria-live="polite">
        <span class="num ink ${o||a?"dim":""}">${a?"--":s.mode==="none"?this.fmt(c):this.fmt(l)}</span>
        ${s.mode==="dual"?p`<div class="sides ink">
              <button class="side ${n==="low"?"sel":""}" @click=${()=>this._side="low"} aria-pressed=${String(n==="low")}>Heat ${this.fmt(s.low)}</button>
              <button class="side ${n==="high"?"sel":""}" @click=${()=>this._side="high"} aria-pressed=${String(n==="high")}>Cool ${this.fmt(s.high)}</button>
            </div>`:m}
      </div>
      <div class="bar">
        <button class="chev" aria-label="Lower setpoint" ?disabled=${f} @click=${()=>this.stepBy(-1)}>${y.chevronDown}</button>
        <div class="label ink">
          <div class="title">${e.name??"Thermostat"}</div>
          <div class="sub">${o?"Off":h}${typeof c=="number"?p` &bull; ${this.fmt(c)}&deg;`:m}</div>
        </div>
        <button class="chev" aria-label="Raise setpoint" ?disabled=${g} @click=${()=>this.stepBy(1)}>${y.chevronUp}</button>
      </div>
    </div>`}};le.properties={...S.properties,_pending:{state:!0},_side:{state:!0}},le.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"climate"}}}},{name:"name",selector:{text:{}}},{name:"subtitle",helper:"Defaults to the entity's area",selector:{text:{}}},{name:"step",helper:"Defaults to the entity's target temperature step",selector:{number:{min:.1,max:5,step:.1,mode:"box"}}}],le.styles=[H,C`
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
    `];customElements.define("homeview-thermostat-card",le);O("homeview-thermostat-card","HomeView Thermostat","Large liquid-glass thermostat with spring setpoint and heat/cool support.");var Bi=["light","switch","fan","lock","cover","scene","script","input_boolean","media_player"],Ls=500,Y=class extends S{constructor(){super(...arguments);this._confirming=!1;this._flash=!1;this.holdTimer=0;this.held=!1;this.confirmTimer=0;this.down=()=>{this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=window.setTimeout(()=>{this.held=!0,U(this,"hass-more-info",{entityId:this._config.entity})},Ls)};this.up=()=>clearTimeout(this.holdTimer);this.cancel=()=>clearTimeout(this.holdTimer);this.onTap=()=>{if(this.held){this.held=!1;return}let e=this._config,t=e.tap_action??"toggle";if(t==="none"||!this.hass)return;if(t==="more-info"){U(this,"hass-more-info",{entityId:e.entity});return}let s=this.hass.states[e.entity];if(!s)return;let n=R(e.entity);if(n==="lock"&&s.state==="locked"&&e.confirm_unlock&&!this._confirming){this._confirming=!0,clearTimeout(this.confirmTimer),this.confirmTimer=window.setTimeout(()=>this._confirming=!1,3e3);return}this._confirming=!1;let o=ii(n,s.state);o&&(n==="scene"&&(this._flash=!0,setTimeout(()=>this._flash=!1,1200)),this.hass.callService(o[0],o[1],{},{entity_id:e.entity}))}}static getStubConfig(e){return{entity:Object.keys(e.states).find(s=>R(s)==="light")??Object.keys(e.states).find(s=>Bi.includes(R(s)))??""}}validate(e){if(!e.entity)throw new Error("Pick an entity")}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}getCardSize(){return 3}cardClass(){var o;let e=this._config,t=(o=this.hass)==null?void 0:o.states[e.entity],s=R(e.entity),n=t&&!T(t)&&mt(s,t.state)&&s!=="media_player";return`tile ${s} ${n||this._flash?"on":""} ${T(t)?"unavailable":""} ${this._confirming?"confirming":""}`}renderContent(){let e=this._config;if(!this.hass)return m;let t=this.hass.states[e.entity],s=R(e.entity),n=!!t&&!T(t)&&mt(s,t.state),o=e.name??(t?N(this.hass,e.entity):e.entity),a=e.subtitle??qe(this.hass,e.entity)??"",l="";t&&s==="media_player"&&!T(t)&&({title:o,sub:a}=pi(t,o),(t.state==="playing"||t.state==="paused")&&t.attributes.entity_picture&&(l=this.hass.hassUrl(t.attributes.entity_picture))),t?t.state==="unavailable"?a="Unavailable":this._confirming?a="Tap again to unlock":s==="lock"&&["locking","unlocking","jammed","opening","open"].includes(t.state)&&(a=t.state[0].toUpperCase()+t.state.slice(1)+(t.state.endsWith("ing")?"\u2026":"")):a="Entity not found";let c=t?s==="lock"||s==="cover"||s==="media_player"?t.state:s==="scene"||s==="script"?"":n?"on":"off":"missing";return p`<button
      class="hit"
      aria-label="${[o,a,c].filter(Boolean).join(", ")}"
      aria-pressed=${s==="scene"||s==="script"||s==="media_player"?m:String(n)}
      ?disabled=${!t||t.state==="unavailable"}
      @pointerdown=${this.down}
      @pointerup=${this.up}
      @pointerleave=${this.cancel}
      @pointercancel=${this.cancel}
      @click=${this.onTap}
      @contextmenu=${h=>h.preventDefault()}
    >
      <span class="icon">${l?p`<img class="art" src=${l} alt="" draggable="false" />`:e.icon?p`<ha-icon .icon=${e.icon}></ha-icon>`:Ui(s,t==null?void 0:t.attributes.device_class,n)}</span>
      <span class="label ink"><span class="title">${o}</span><br /><span class="sub">${a}</span></span>
    </button>`}};Y.properties={...S.properties,_confirming:{state:!0},_flash:{state:!0}},Y.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:Bi}}}},{name:"name",selector:{text:{}}},{name:"subtitle",helper:"Defaults to the entity's area",selector:{text:{}}},{name:"icon",helper:"Optional mdi: icon; HomeView glyphs are used by default",selector:{icon:{}}},{name:"tap_action",label:"Tap action",selector:{select:{mode:"dropdown",options:[{value:"toggle",label:"Toggle / run"},{value:"more-info",label:"More info"},{value:"none",label:"Nothing"}]}}},{name:"confirm_unlock",label:"Confirm before unlocking (locks)",selector:{boolean:{}}}],Y.styles=[H,C`
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
    `];customElements.define("homeview-tile-card",Y);O("homeview-tile-card","HomeView Tile","Liquid-glass tile for lights, switches, fans, locks, covers, scenes and scripts.");var Ae=class extends S{constructor(){super("circle");this.raf=0;this.timer=0;this.loop=()=>{if(this.raf=this.timer=0,!this.onScreen)return;this.draw();let e=this.mode();e==="sweep"?this.raf=requestAnimationFrame(this.loop):this.timer=window.setTimeout(this.loop,(e==="off"?6e4-new Date().getSeconds()*1e3:1e3)-new Date().getMilliseconds()+5)}}static getStubConfig(){return{seconds:"sweep"}}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}validate(e){if(e.time_zone)try{new Intl.DateTimeFormat("en",{timeZone:e.time_zone})}catch{throw new Error(`Unknown time zone: ${e.time_zone}`)}}cardClass(){return"clock"}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){var e;super.disconnectedCallback(),cancelAnimationFrame(this.raf),clearTimeout(this.timer),(e=this.fit)==null||e.disconnect(),this.fit=void 0}firstUpdated(e){super.firstUpdated(e),this.fit??(this.fit=new ResizeObserver(()=>this.fitFace())),this.fit.observe(this)}fitFace(){let e=this.renderRoot.querySelector("ha-card");if(!e)return;let t=this.clientWidth,s=this.clientHeight,n=this.square||!t||!s?0:Math.min(t,s);e.style.width=e.style.height=n?`${n}px`:"",e.style.margin=n?`${(s-n)/2}px auto 0`:""}resume(){!this.raf&&!this.timer&&this.loop()}mode(){var t;let e=((t=this._config)==null?void 0:t.seconds)??"sweep";return e==="sweep"&&matchMedia("(prefers-reduced-motion: reduce)").matches?"tick":e}draw(){var o,a;let e=this.renderRoot,t=e.querySelector("#hh");if(!t)return;let s=ft((o=this._config)==null?void 0:o.time_zone),n=si(s.h,s.m,s.s+(this.mode()==="sweep"?s.ms/1e3:0));t.setAttribute("transform",`rotate(${n.h})`),e.querySelector("#mh").setAttribute("transform",`rotate(${n.m})`),(a=e.querySelector("#sh"))==null||a.setAttribute("transform",`rotate(${n.s})`)}renderContent(){var s;let e=Array.from({length:12},(n,o)=>w`<line class="tick" x1="0" x2="0" y1="-84" y2="-68" transform="rotate(${o*30})"/>`),t=ft((s=this._config)==null?void 0:s.time_zone);return p`<svg class="face" viewBox="-100 -100 200 200" role="img" aria-label="Clock, ${String(t.h).padStart(2,"0")}:${String(t.m).padStart(2,"0")}">
      ${e}
      <line class="hand" id="hh" x1="0" y1="0" x2="0" y2="-42" stroke-width="7" />
      <line class="hand" id="mh" x1="0" y1="0" x2="0" y2="-66" stroke-width="5.5" />
      ${this.mode()==="off"?"":w`<line class="hand" id="sh" x1="0" y1="18" x2="0" y2="-80" stroke-width="1.8" />`}
      <circle r="4.2" fill="#fff" />
    </svg>`}updated(e){var t;(t=super.updated)==null||t.call(this,e),this.draw()}};Ae.editorFields=[{name:"seconds",label:"Seconds hand",selector:{select:{mode:"dropdown",options:[{value:"sweep",label:"Smooth sweep"},{value:"tick",label:"Tick"},{value:"off",label:"Hidden"}]}}},{name:"time_zone",label:"Time zone",helper:"IANA name such as Europe/Paris; defaults to this device's time",selector:{text:{}}}],Ae.styles=[H,C`
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
    `];customElements.define("homeview-clock-card",Ae);O("homeview-clock-card","HomeView Clock","Analog clock on a round liquid-glass face.");function ce(r,i,e){let t,s,n=c=>{t||c.pointerType==="mouse"&&c.button!==0||(t={id:c.pointerId,x:c.clientX,y:c.clientY,t:c.timeStamp},s=void 0)},o=c=>{if(!t||c.pointerId!==t.id)return;let h=c.clientX-t.x,d=c.clientY-t.y;if(!s){if(Math.max(Math.abs(h),Math.abs(d))<8)return;if(s=Math.abs(h)>=Math.abs(d)?"x":"y",s==="y"&&!e){t=void 0;return}try{r.setPointerCapture(c.pointerId)}catch{}}i.move(h,d,s)},a=c=>{if(!t||c.pointerId!==t.id)return;let h=c.clientX-t.x,d=c.clientY-t.y,u=ai(h,d,c.timeStamp-t.t);t=void 0;let g=!s||(s==="x"?u==="left"||u==="right":u==="up"||u==="down");i.end(g?u:null,h,d)},l=c=>{!t||c.pointerId!==t.id||(t=void 0,i.end(null,0,0))};return r.addEventListener("pointerdown",n),r.addEventListener("pointermove",o),r.addEventListener("pointerup",a),r.addEventListener("pointercancel",l),()=>{r.removeEventListener("pointerdown",n),r.removeEventListener("pointermove",o),r.removeEventListener("pointerup",a),r.removeEventListener("pointercancel",l)}}var q=420,Xe=()=>({urls:["",""],front:0,drag:0,side:0,still:!1});function Te(r,i){return p`${r.urls.map((e,t)=>{if(!e)return m;let s=t===r.front,n=s?`${r.drag}px`:`calc(${r.side} * (100% + var(--hv-gap, 0px)) + ${r.drag}px)`,o=`${s?"front":r.side?"beside":""} ${r.still?"still":""}`;return p`<img class=${o} src=${e} alt="" draggable="false" style="object-fit:${i};transform:translateX(${n})" />`})}`}var Ye=C`
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    opacity: 0;
    transition:
      opacity 1.2s ease,
      transform ${q}ms cubic-bezier(0.22, 1, 0.36, 1);
    -webkit-user-drag: none;
    user-select: none;
    -webkit-user-select: none;
  }
  img.front,
  img.beside {
    opacity: 1;
  }
  img.beside {
    transition: transform ${q}ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  img.still {
    transition: none;
  }
`;var Os=3e3,_t="homeviewOverlay",Hs=320;function de(r){var i;(((i=document.querySelector("home-assistant"))==null?void 0:i.shadowRoot)??document.body).appendChild(r)}var I=class extends D{constructor(){super(...arguments);this._pull=0;this._chrome=!0;this._closing=!1;this.closeTimer=0;this.chromeTimer=0;this.ownClose=!1;this.onPop=()=>{var e;(e=history.state)!=null&&e[_t]||this.close(!0)};this.onKey=e=>{if(e.key==="Escape")this.close();else if(!(e.key==="ArrowRight"||e.key==="ArrowLeft")||!this.arrow(e.key==="ArrowRight"?1:-1))return;e.preventDefault()};this.onVisible=()=>{document.visibilityState==="visible"&&!this._closing&&this.keepAwake()};this.noScroll=e=>e.preventDefault()}renderBackdrop(){return m}dragX(e){}dragXEnd(e){}arrow(e){return!1}closed(){}connectedCallback(){super.connectedCallback(),this.setAttribute("role","dialog"),this.setAttribute("aria-modal","true"),this.setAttribute("aria-label",this.label),this.tabIndex=-1,history.pushState({...history.state??{},[_t]:!0},""),window.addEventListener("popstate",this.onPop),window.addEventListener("keydown",this.onKey),document.addEventListener("visibilitychange",this.onVisible),this.addEventListener("touchmove",this.noScroll,{passive:!1}),this.closeTimer=window.setTimeout(()=>this.close(),this.openMs),this.showChrome(),this.keepAwake()}disconnectedCallback(){var e,t;super.disconnectedCallback(),(e=this.untrack)==null||e.call(this),this.untrack=void 0,window.removeEventListener("popstate",this.onPop),window.removeEventListener("keydown",this.onKey),document.removeEventListener("visibilitychange",this.onVisible),this.removeEventListener("touchmove",this.noScroll),clearTimeout(this.closeTimer),clearTimeout(this.chromeTimer),(t=this.wake)==null||t.release().catch(()=>{}),this.wake=void 0}firstUpdated(){this.untrack=ce(this,{move:(e,t,s)=>{this.axis=s,s==="x"?this.dragX(e):this._pull=t>0?t:t/4},end:e=>{let t=this.axis;if(this.axis=void 0,e==="tap")return this.showChrome(!this._chrome);if(t==="x")return this.dragXEnd(e);if(e==="down")return this.close();this._pull=0}},!0),this.focus()}close(e=!1){var t;this._closing||(this._closing=!0,!e&&((t=history.state)!=null&&t[_t])&&history.back(),window.setTimeout(()=>{this.remove(),this.closed()},Hs))}async keepAwake(){var e;try{this.wake=await((e=navigator.wakeLock)==null?void 0:e.request("screen"))}catch{}}showChrome(e=!0){this._chrome=e||this.ownClose,!this.ownClose&&(clearTimeout(this.chromeTimer),e&&(this.chromeTimer=window.setTimeout(()=>this._chrome=!1,Os)))}render(){let e=this._pull,t=e>0?Math.max(0,1-e/500):1,s=this.axis!=="y";return p`<div class="backdrop ${s?"settle":""}" style="opacity:${t}">${this.renderBackdrop()}</div>
      <div class="stage ${s?"settle":""}" style="transform:translateY(${e}px) scale(${e>0?1-e/2500:1})">${this.renderBody()}</div>
      ${this._chrome&&!this.ownClose?this.closeButton():m}`}closeButton(){return p`<button class="close" aria-label=${this.closeLabel} @pointerdown=${e=>e.stopPropagation()} @click=${()=>this.close()}>${y.close}</button>`}updated(){this.toggleAttribute("closing",this._closing)}};I.properties={_pull:{state:!0},_chrome:{state:!0},_closing:{state:!0}},I.overlayStyles=C`
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
        transform ${q}ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity ${q}ms ease;
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
  `;var Pe=class extends I{constructor(){super(...arguments);this.state=Xe();this.label="Photo slideshow";this.closeLabel="Close slideshow";this.openMs=3*3600*1e3}renderBackdrop(){return Te(this.state,"cover")}renderBody(){return Te(this.state,"contain")}dragX(e){var t;(t=this.host)==null||t.dragTo(e)}dragXEnd(e){var t;(t=this.host)==null||t.dragEnd(e)}arrow(e){var t;return(t=this.host)==null||t.step(e),!0}closed(){var e;(e=this.host)==null||e.slideshowClosed()}};Pe.properties={...I.properties,state:{attribute:!1}},Pe.styles=[Ye,I.overlayStyles,C`
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
    `];customElements.get("homeview-photo-slideshow")||customElements.define("homeview-photo-slideshow",Pe);var Is=1800*1e3,kt=30*1e3,Ds=r=>Math.min(300*1e3,10*1e3*2**r),zs=3e3*1e3,he=class extends S{constructor(){super(...arguments);this._stage=Xe();this._error="";this.items=[];this.index=-1;this.timer=0;this.settleTimer=0;this.listedAt=0;this.fails=0;this.parked=!1;this.loadedFor="";this.listRun=0;this.listFails=0;this.shown=new je;this.nav=0;this.dragging=!1;this.onKey=e=>{if(e.key==="Enter"||e.key===" ")this.openSlideshow();else if(e.key==="ArrowRight")this.step(1);else if(e.key==="ArrowLeft")this.step(-1);else return;e.preventDefault()}}static getStubConfig(){return{media:"media-source://media_source/local",interval:30,recursive:!0}}validate(e){let t=re(e.media);if(!t.length||t.some(s=>!s.startsWith("media-source://")))throw new Error("Set media to a media-source:// folder, or a list of them")}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}disconnectedCallback(){var e;super.disconnectedCallback(),clearTimeout(this.timer),this.loadedFor="",(e=this.slideshow)==null||e.close()}connectedCallback(){super.connectedCallback(),this.hass&&this._config&&this.requestUpdate()}firstUpdated(e){super.firstUpdated(e);let t=this.renderRoot.querySelector("ha-card");!t||this.untrack||(this.untrack=ce(t,{move:s=>this.dragTo(s),end:s=>s==="tap"?this.openSlideshow():this.dragEnd(s)},!1))}updated(e){var t;(t=super.updated)==null||t.call(this,e),this.slideshow&&(this.slideshow.state=this._stage),this.load()}load(){let e=this._config;if(!this.hass||!e||!this.onScreen)return!1;let t=JSON.stringify([re(e.media),!!e.recursive,!!e.shuffle]);return t===this.loadedFor?!1:(this.loadedFor=t,this.listFails=0,this.relist(!0),!0)}async relist(e){var o;let t=this._config,s=this.hass,n=++this.listRun;clearTimeout(this.timer);try{let a=await ri({callWS:l=>G(s.callWS(l),kt)},t.media,!!t.recursive);if(n!==this.listRun)return;this.items=t.shuffle?li(a):a,this.listedAt=Date.now(),this.listFails=0,this._error=a.length?"":"No pictures in this folder",e&&(this.index=-1,this.shown.clear(),this.ahead=void 0,this.advance())}catch(a){if(n!==this.listRun||!e)return;let l=a;if(this._error=`Cannot open ${re(t.media).join(", ")}: ${l.message??((o=l.error)==null?void 0:o.message)??a}`,!this.isConnected)return;this.timer=window.setTimeout(()=>{this.onScreen?this.relist(!0):this.loadedFor=""},Ds(this.listFails++))}}async advance(){if(clearTimeout(this.timer),!this._config||!this.items.length||!this.isConnected||(this.parked=!this.onScreen&&!this.slideshow,this.parked))return;let e=this.nav;Date.now()-this.listedAt>Is&&await this.relist(!1),e===this.nav&&await this.go(1,!1)}schedule(){clearTimeout(this.timer),!(!this._config||!this.isConnected)&&(this.timer=window.setTimeout(()=>void this.advance(),Math.max(5,this._config.interval??30)*1e3))}unseen(){var t;if(!this.items.length)return;let e=this.items[(this.index+1)%this.items.length];return((t=this.ahead)==null?void 0:t.id)===e?this.ahead:{id:e}}async fetch(e){if(!e.url||Date.now()-(e.at??0)>zs){e.ready=!1;let s=await G(this.hass.callWS({type:"media_source/resolve_media",media_content_id:e.id,expires:3600}),kt);e.url=s.url.startsWith("http")?s.url:this.hass.hassUrl(s.url),e.at=Date.now()}let t=new Image;return t.src=e.url,await G(t.decode(),kt),e.ready=!0,e.url}async prefetch(){let e=this.shown.peek(1)??(this.ahead=this.unseen());if(!(!e||e.ready))try{await this.fetch(e)}catch{}}async go(e,t){let s=++this.nav;for(clearTimeout(this.timer);;){let n=this.shown.peek(e),o=n??(e>0?this.unseen():void 0);if(!o)break;n||(this.index=(this.index+1)%this.items.length);try{let a=await this.fetch(o);if(s!==this.nav)return;n?this.shown.step(e):this.shown.push(o),o===this.ahead&&(this.ahead=void 0),this.fails=0,await this.show(a,t?e:0),this.prefetch();break}catch{if(s!==this.nav)return;if(o===this.ahead&&(this.ahead=void 0),n&&this.shown.drop(o),++this.fails>=Math.min(this.items.length,20))break}}this.settle(),this.schedule()}async show(e,t){clearTimeout(this.settleTimer);let s=this._stage,n=1-s.front,o=[...s.urls];if(o[n]=e,!t){this._stage={urls:o,front:n,drag:0,side:0,still:!1};return}(s.urls[n]!==e||s.side!==t)&&(this._stage={...s,urls:o,side:t,still:!0},await this.painted()),this._stage={urls:o,front:n,drag:0,side:-t,still:!1}}settle(){let e=this._stage;!e.drag&&!e.side||(clearTimeout(this.settleTimer),this._stage={...e,drag:0,still:!1},this.settleTimer=window.setTimeout(()=>this._stage={...this._stage,side:0,still:!0},q+60))}async painted(){var e,t,s;await this.updateComplete,this.slideshow&&(this.slideshow.state=this._stage,await this.slideshow.updateComplete,(t=(e=this.slideshow.shadowRoot)==null?void 0:e.querySelector("img"))==null||t.getBoundingClientRect()),(s=this.renderRoot.querySelector("img"))==null||s.getBoundingClientRect()}dragTo(e){this.dragging||(this.dragging=!0,this.nav++,clearTimeout(this.timer),clearTimeout(this.settleTimer));let t=e<0?1:-1,s=this.shown.peek(t)??(t>0?this.ahead:void 0),n=s!=null&&s.ready?s.url:"",o=this._stage,a=[...o.urls];n&&(a[1-o.front]=n);let l=t<0?!this.shown.peek(-1):this.items.length<2;this._stage={...o,urls:a,drag:l?e/3:e,side:n?t:0,still:!0}}dragEnd(e){if(this.dragging){if(this.dragging=!1,e==="left"||e==="right"){this.go(e==="left"?1:-1,!0);return}this.settle(),this.schedule()}}step(e){this.items.length&&this.go(e,!0)}openSlideshow(){if(this.slideshow||!this._stage.urls[this._stage.front]||ae(this))return;let e=document.createElement("homeview-photo-slideshow");e.host=this,e.state=this._stage,this.slideshow=e,de(e)}slideshowClosed(){var e;this.slideshow=void 0,this.isConnected&&((e=this.renderRoot.querySelector("ha-card"))==null||e.focus({preventScroll:!0}))}resume(){!this.load()&&this.parked&&this.advance()}render(){if(!this._config)return p``;let e=this._config.fit??"cover",t=!!this._stage.urls[this._stage.front];return p`<ha-card
      class="photo swiper ${this.square?"square":""} ${t?"shown":""}"
      role=${t?"button":m}
      tabindex=${t?"0":m}
      aria-label=${t?"Photo frame: open the full-screen slideshow":m}
      @keydown=${this.onKey}
    >
      ${Te(this._stage,e)} ${this._error?p`<div class="msg">${this._error}</div>`:m}
    </ha-card>`}renderContent(){return m}};he.properties={...S.properties,_stage:{state:!0},_error:{state:!0}},he.editorFields=[{name:"media",label:"Media folders",required:!0,list:!0,helper:"One or more media-source folders, e.g. media-source://media_source/local/photos; the slideshow cycles through all of them. Open Media in the sidebar to find a folder; DLNA, Synology Photos and other media servers HA can browse work too.",selector:{text:{multiple:!0}}},{name:"interval",label:"Seconds per picture",selector:{number:{min:5,max:3600,step:1,mode:"box",unit_of_measurement:"s"}}},{name:"shuffle",selector:{boolean:{}}},{name:"recursive",label:"Include subfolders",selector:{boolean:{}}},{name:"fit",selector:{select:{mode:"dropdown",options:[{value:"cover",label:"Fill"},{value:"contain",label:"Fit whole picture"}]}}}],he.styles=[H,Ye,C`
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
    `];customElements.define("homeview-photo-card",he);O("homeview-photo-card","HomeView Photo Frame","Slideshow of pictures from a Home Assistant media source.");var Je=class{constructor(i,e=16e3){this.acc=0;this.n=0;this.pos=0;this.ratio=i/e}push(i){if(this.ratio<=1)return i.slice();let e=[];for(let t=0;t<i.length;t++)this.acc+=i[t],this.n++,this.pos+=1,this.pos>=this.ratio&&(e.push(this.acc/this.n),this.acc=0,this.n=0,this.pos-=this.ratio);return Float32Array.from(e)}},Ze=class{constructor(i=1.2,e=7,t=15){this.heard=!1;this.floor=.01;this.sum=0;this.n=0;this.run=0;this.quiet=0;this.frames=0;this.silence=i,this.noSpeech=e,this.max=t}push(i){for(let t of i)this.sum+=t*t,!(++this.n<320)&&(this.frame(Math.sqrt(this.sum/this.n)),this.sum=0,this.n=0);let e=this.frames/50;return this.heard?this.quiet>=this.silence-1e-9||e>=this.max?"end":"listen":e>=Math.min(this.noSpeech,this.max)?"none":"listen"}frame(i){if(this.frames++,i>Math.max(this.floor*3,.006)){this.run+=.02,this.run>=.1&&(this.heard=!0,this.quiet=0);return}this.run=0,this.floor=i<this.floor?i:this.floor+(i-this.floor)*(.02/2),this.heard&&(this.quiet+=.02)}};function Gi(r){let i=new Int16Array(r.length);for(let e=0;e<r.length;e++){let t=Math.max(-1,Math.min(1,r[e]));i[e]=t<0?t*32768:t*32767}return i}function Qe(r,i){let e=i?new Uint8Array(i.buffer,i.byteOffset,i.byteLength):new Uint8Array(0),t=new Uint8Array(1+e.length);return t[0]=r,t.set(e,1),t}var qi=`
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
`;async function ji(r,i,e){let t,s=()=>t==null?void 0:t.getTracks().forEach(o=>o.stop()),n=()=>{if(i.aborted)throw new DOMException("Aborted","AbortError")};try{t=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}),n(),await r.resume(),n();let o=!1,a=g=>{o||e(g)},l,c=()=>{};if(r.audioWorklet){let g=URL.createObjectURL(new Blob([qi],{type:"text/javascript"}));try{await r.audioWorklet.addModule(g)}finally{URL.revokeObjectURL(g)}n();let f=new AudioWorkletNode(r,"homeview-recorder");f.port.onmessage=$=>a($.data),c=()=>f.port.onmessage=null,l=f}else{let g=r.createScriptProcessor(4096,1,1);g.onaudioprocess=f=>a(f.inputBuffer.getChannelData(0)),c=()=>g.onaudioprocess=null,g.connect(r.destination),l=g}let h=r.createMediaStreamSource(t),d=r.createAnalyser();d.fftSize=256,d.smoothingTimeConstant=.6,h.connect(d),h.connect(l);let u=l;return{analyser:d,close(){o||(o=!0,c(),u.disconnect(),h.disconnect(),s())}}}catch(o){throw s(),o}}var Fs=16e3,Us=30,Ns=6,$t={idle:"Tap to talk",listening:"Listening",thinking:"Thinking",responding:"Responding",error:"Something went wrong"},pe=class extends S{constructor(){super(...arguments);this._phase="idle";this._heard="";this._reply="";this._error="";this._detail="";this._showDetail=!1;this.lastText="";this._typing=!1;this.handlerId=null;this.pending=[];this.audioDone=!1;this.runId=0;this.speaking=!1;this.stopTimer=0;this.raf=0;this.levels=new Float32Array(48);this.t0=performance.now();this.loop=()=>{this.raf=this.draw()?requestAnimationFrame(this.loop):0};this.showDetail=e=>{e.preventDefault(),this._showDetail=!0};this.submit=e=>{e.preventDefault();let t=e.target.elements.namedItem("q");this.ask(t.value),t.value=""}}static getStubConfig(){return{speak:!0}}getGridOptions(){return{columns:12,rows:"auto",min_columns:6,min_rows:3}}getCardSize(){return 5}get square(){return!1}refFrom(e,t){return Math.min(e,t,220)}cardClass(){var t,s;return`voice ${typeof((s=(t=this._config)==null?void 0:t.grid_options)==null?void 0:s.rows)!="number"?"wide":""} ${this.phase()}`}phase(){var t,s,n;let e=(t=this._config)==null?void 0:t.satellite;return e?hi((n=(s=this.hass)==null?void 0:s.states[e])==null?void 0:n.state):this._phase}micBlocked(){var e;return window.isSecureContext?(e=navigator.mediaDevices)!=null&&e.getUserMedia?null:"unsupported":"insecure"}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){var e;super.disconnectedCallback(),cancelAnimationFrame(this.raf),this.teardown(),this.speaking=!1,this._phase!=="error"&&(this._phase="idle"),this.stopAudio(),(e=this.ctx)==null||e.close(),this.ctx=void 0,this.analyser=void 0}stopAudio(){let e=this.audio;e&&(e.pause(),e.removeAttribute("src"),e.load())}async talk(){var s;if(this._phase==="listening")return this.endAudio();if(this._phase==="thinking"||this._phase==="responding")return;if(this.micBlocked()){this._typing=!0;return}let e=this.ctx??(this.ctx=new AudioContext);this.teardown(),this.reset(),this.lastText="",this.endpointer=new Ze,this.resampler=new Je(e.sampleRate);let t=this.abort=new AbortController;this._phase="listening",this.analyser=void 0;try{let n=await ji(e,t.signal,o=>this.onAudio(o));if(t.signal.aborted)return n.close();this.mic=n,this.analyser=n.analyser,this.stopTimer=window.setTimeout(()=>this.endAudio(),Fs),await this.run({start_stage:"stt",end_stage:((s=this._config)==null?void 0:s.speak)===!1?"intent":"tts",input:{sample_rate:16e3,no_vad:!0}})}catch(n){t.signal.aborted||this.fail(n)}}retry(){this.lastText?this.ask(this.lastText):this.talk()}async ask(e){var t;if(e.trim()){this.teardown(),this.reset(),this.lastText=e,this._heard=e,this._phase="thinking";try{await this.run({start_stage:"intent",end_stage:((t=this._config)==null?void 0:t.speak)===!1?"intent":"tts",input:{text:e}})}catch(s){this.fail(s)}}}async run(e){let t=this._config,s=++this.runId,n=await this.hass.connection.subscribeMessage(o=>s===this.runId&&this.onEvent(o),{type:"assist_pipeline/run",...e,...t.pipeline?{pipeline:t.pipeline}:{},...this.conversationId?{conversation_id:this.conversationId}:{}});s===this.runId?this.unsub=n:await n().catch(()=>{})}onEvent(e){var n,o,a,l,c,h,d,u,g;let t=e.data??{};if(e.type==="run-start"){this.handlerId=((n=t.runner_data)==null?void 0:n.stt_binary_handler_id)??null;for(let f of this.pending)this.sendPcm(f);this.pending=[],this.audioDone&&this.handlerId!==null&&((a=(o=this.hass)==null?void 0:o.connection.socket)==null||a.send(Qe(this.handlerId))),this.audioDone=!1}if((e.type==="stt-vad-end"||e.type==="stt-end")&&this.endAudio(),e.type==="stt-end"&&(this._heard=((l=t.stt_output)==null?void 0:l.text)??""),e.type==="intent-end"){let f=t.intent_output;this.conversationId=(f==null?void 0:f.conversation_id)??this.conversationId,this._reply=((d=(h=(c=f==null?void 0:f.response)==null?void 0:c.speech)==null?void 0:h.plain)==null?void 0:d.speech)??""}e.type==="tts-end"&&((u=t.tts_output)!=null&&u.url)&&this.play(t.tts_output.url),e.type==="error"&&this.fail(t);let s=ci(this._phase,e);if(e.type==="run-end"){(g=this.unsub)==null||g.call(this),this.unsub=void 0,this.speaking||(this._phase=this._phase==="error"?"error":"idle");return}this._phase=s}onAudio(e){var o;if(this._phase!=="listening"||!this.resampler)return;let t=this.resampler.push(e),s=Gi(t);this.handlerId===null?this.pending.push(s):this.sendPcm(s);let n=(o=this.endpointer)==null?void 0:o.push(t);n==="end"?this.endAudio():n==="none"&&this.noSpeech()}noSpeech(){this.fail({code:"stt-no-text-recognized",message:"No speech was detected"})}sendPcm(e){var t,s;this.handlerId!==null&&((s=(t=this.hass)==null?void 0:t.connection.socket)==null||s.send(Qe(this.handlerId,e)))}endAudio(){var e,t;if(clearTimeout(this.stopTimer),!this.mic&&this._phase==="listening"){this._phase="idle",this.teardown();return}this.mic&&(this.handlerId!==null?(t=(e=this.hass)==null?void 0:e.connection.socket)==null||t.send(Qe(this.handlerId)):this.audioDone=!0),this._phase==="listening"&&(this._phase="thinking"),this.stopMic()}stopMic(){var e;(e=this.mic)==null||e.close(),this.mic=void 0,this.handlerId=null}play(e){var h;let t=e.startsWith("http")?e:this.hass.hassUrl(e);(h=this.audio)==null||h.pause();let s=new Audio(t);this.audio=s;try{this.ctx??(this.ctx=new AudioContext);let d=this.ctx.createMediaElementSource(s);this.analyser??(this.analyser=this.ctx.createAnalyser()),this.analyser.fftSize=256,d.connect(this.analyser),this.analyser.connect(this.ctx.destination),this.ctx.resume()}catch{}this._phase="responding",this.speaking=!0;let n=!1,o=0,a=0;s.onplaying=()=>{n=!0,a=0};let l=window.setInterval(()=>{this.audio!==s||!this.speaking?c():s.currentTime!==o?(o=s.currentTime,a=0):++a>=(n?Ns:Us)&&c(!0)},1e3),c=(d=!1)=>{if(clearInterval(l),!(this.audio!==s||!this.speaking)){if(this.speaking=!1,!d){this._phase="idle";return}this.stopAudio(),this.fail({code:"tts-failed",message:"The spoken reply stopped before it finished"})}};s.onended=()=>c(),s.onerror=()=>c(),s.play().catch(()=>c())}fail(e){let{text:t,detail:s}=di(e);console.warn("HomeView voice:",s),this._error=t,this._detail=s,this._phase="error",this.teardown()}reset(){var e;this._heard="",this._reply="",this._error="",this._detail="",this._showDetail=!1,this.pending=[],this.audioDone=!1,this.handlerId=null,this.speaking=!1,(e=this.audio)==null||e.pause()}async teardown(){var t;this.runId++,(t=this.abort)==null||t.abort(),this.abort=void 0,clearTimeout(this.stopTimer),this.stopMic();let e=this.unsub;this.unsub=void 0,await(e==null?void 0:e().catch(()=>{}))}draw(){var _,v;let e=(_=this.renderRoot)==null?void 0:_.querySelector("canvas.viz");if(!e)return!0;let t=Math.min(window.devicePixelRatio||1,2),s=e.clientWidth,n=e.clientHeight;if(!s||!n)return!1;(e.width!==Math.round(s*t)||e.height!==Math.round(n*t))&&(e.width=Math.round(s*t),e.height=Math.round(n*t));let o=e.getContext("2d");o.setTransform(t,0,0,t,0,0),o.clearRect(0,0,s,n);let a=this.phase(),l=(performance.now()-this.t0)/1e3,c=this.levels.length,h=a!=="idle"&&a!=="error",d=matchMedia("(prefers-reduced-motion: reduce)").matches,u=this.analyser?new Uint8Array(this.analyser.frequencyBinCount):null,g=!!u&&(a==="listening"||a==="responding")&&!((v=this._config)!=null&&v.satellite);g&&this.analyser.getByteFrequencyData(u);for(let b=0;b<c;b++){let k=0;if(g)k=(u[Math.min(u.length-1,2+Math.floor(Math.abs(b-c/2)/(c/2)*40))]/255)**1.4;else if(a==="listening"||a==="responding")k=.25+.2*Math.sin(l*5+b*.6)*Math.sin(l*1.7+b*.21);else if(a==="thinking"){let E=b/c*Math.PI*2;k=.12+.3*Math.max(0,Math.cos(E-l*3))**6}else k=.06;d&&(k=Math.min(k,.15)),Math.abs(k-this.levels[b])>.002&&(h=!0),this.levels[b]+=(k-this.levels[b])*.25}let f=s/2,$=n/2,A=Math.min(s,n)*.34,x=o.createRadialGradient(f,$,A*.1,f,$,A*1.25),P=a==="error"?"255 120 110":a==="listening"?"255 255 255":"255 236 210";x.addColorStop(0,`rgb(${P} / ${a==="idle"?.22:.42})`),x.addColorStop(1,`rgb(${P} / 0)`),o.fillStyle=x,o.beginPath(),o.arc(f,$,A*1.25,0,Math.PI*2),o.fill(),o.strokeStyle="rgb(255 255 255 / 0.95)",o.lineCap="round",o.lineWidth=Math.max(2,A*.06),o.shadowColor="rgb(40 30 20 / 0.25)",o.shadowBlur=4;for(let b=0;b<c;b++){let k=b/c*Math.PI*2-Math.PI/2,E=A*(.08+this.levels[b]*.9),L=A*.78;o.beginPath(),o.moveTo(f+Math.cos(k)*L,$+Math.sin(k)*L),o.lineTo(f+Math.cos(k)*(L+E),$+Math.sin(k)*(L+E)),o.stroke()}return h}renderContent(){var d;let e=this._config,t=this.phase(),s=!e.satellite&&this.micBlocked(),n=e.satellite?(d=this.hass)==null?void 0:d.states[e.satellite]:void 0,o=e.satellite?n?`${n.attributes.friendly_name??e.satellite}: ${t==="idle"?"Ready":$t[t]}`:`Satellite not found: ${e.satellite}`:t==="error"?this._error||$t.error:t==="idle"&&s?"Type a request":$t[t],a=t==="error"&&!e.satellite,[l,c]=t==="listening"?["Stop listening",y.stop]:a?["Try again",y.retry]:["Talk to Assist",y.mic],h=a&&this._showDetail;return p`<div class="voice-wrap ${h?"covered":""}">
      <div class="head ink">
        <span class="title">${e.name??"Assist"}</span>
        ${a?p`<span class="sub status" aria-live="polite" role="button" tabindex="0" title=${this._detail} @click=${this.showDetail} @keydown=${u=>(u.key==="Enter"||u.key===" ")&&this.showDetail(u)}>${o}</span>`:p`<span class="sub status" aria-live="polite">${o}</span>`}
      </div>
      <button class="orb" ?disabled=${!!e.satellite} aria-label=${l} @click=${()=>void(a?this.retry():this.talk())}>
        <canvas class="viz" aria-hidden="true"></canvas>
        <span class="mic">${c}</span>
      </button>
      <div class="lines ink" aria-live="polite">
        ${this._heard?p`<div class="heard">&ldquo;${this._heard}&rdquo;</div>`:m}
        ${this._reply?p`<div class="reply">${this._reply}</div>`:m}
        ${a&&this._detail?p`<button class="more" @click=${this.showDetail}><span>Details</span></button>`:m}
        ${s==="insecure"&&!this._heard&&!this._reply&&!a?p`<div class="notice">The microphone needs Home Assistant over HTTPS. Type instead, or see the README for options.</div>`:m}
      </div>
      ${e.satellite?m:this._typing||s?p`<form class="type" @submit=${this.submit}>
              <input name="q" type="text" placeholder="Ask Assist" autocomplete="off" aria-label="Request" />
              <button class="send" aria-label="Send">${y.send}</button>
            </form>`:p`<button class="kbd" aria-label="Type a request" @click=${()=>this._typing=!0}>${y.keyboard}</button>`}
      ${h?p`<div class="sheet ink" role="dialog" aria-label="Error details">
            <div class="sheet-head">
              <span class="title">${this._error}</span>
              <button class="more" @click=${()=>this._showDetail=!1}><span>Done</span></button>
            </div>
            <div class="detail">${this._detail}</div>
          </div>`:m}
    </div>`}resume(){!this.raf&&this.isConnected&&this.loop()}updated(e){var t,s;(t=super.updated)==null||t.call(this,e),e.has("_typing")&&this._typing&&((s=this.renderRoot.querySelector("input[name=q]"))==null||s.focus()),!this.raf&&this.isConnected&&this.loop()}};pe.properties={...S.properties,_phase:{state:!0},_heard:{state:!0},_reply:{state:!0},_error:{state:!0},_detail:{state:!0},_showDetail:{state:!0},_typing:{state:!0}},pe.editorFields=[{name:"name",selector:{text:{}}},{name:"pipeline",label:"Assist pipeline",helper:"Defaults to the preferred pipeline",selector:{assist_pipeline:{}}},{name:"satellite",label:"Voice satellite (optional)",helper:"Show this assist_satellite's state instead of using this device's microphone",selector:{entity:{filter:{domain:"assist_satellite"}}}},{name:"speak",label:"Play spoken replies",selector:{boolean:{}}}],pe.styles=[H,C`
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
    `];customElements.define("homeview-voice-card",pe);O("homeview-voice-card","HomeView Voice","Talk to Home Assistant Assist with an audio-reactive liquid-glass visualizer.");var ue=class extends S{constructor(){super(...arguments);this._now=new Date;this.subscribedTo="";this.tick=0;this.minute=()=>{this.tick=0,this.onScreen&&(this._now=new Date,this.tick=window.setTimeout(this.minute,6e4-Date.now()%6e4+50))};this.more=()=>U(this,"hass-more-info",{entityId:this._config.entity})}static getStubConfig(e){return{entity:Object.keys(e.states).find(t=>R(t)==="weather")??""}}validate(e){if(!e.entity||R(e.entity)!=="weather")throw new Error("Pick a weather entity")}getGridOptions(){return{columns:6,rows:"auto",min_columns:4,min_rows:2}}cardClass(){return"weather"}connectedCallback(){super.connectedCallback(),this.resume()}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe(),clearTimeout(this.tick),this.tick=0}resume(){!this.onScreen||!this.hass||!this._config||(this.subscribe(),this.tick||this.minute())}updated(e){var t;(t=super.updated)==null||t.call(this,e),(e.has("hass")||e.has("_config"))&&this.resume()}subscribe(){let e=this._config.entity,t=this.hass.states[e],s=ui(t==null?void 0:t.attributes.supported_features),n=s?`${e}|${s}`:"";n!==this.subscribedTo&&(this.unsubscribe(),this.subscribedTo=n,s&&(this.unsub=this.hass.connection.subscribeMessage(o=>this._forecast=o.forecast??void 0,{type:"weather/subscribe_forecast",entity_id:e,forecast_type:s}),this.unsub.catch(()=>{this.subscribedTo===n&&(this.subscribedTo="")})))}unsubscribe(){let e=this.unsub;this.unsub=void 0,this.subscribedTo="",this._forecast=void 0,e==null||e.then(t=>t()).catch(()=>{})}renderContent(){var u,g;let e=this._config;if(!this.hass)return m;let t=this.hass.states[e.entity];if(!t)return p`<div class="center warning">Entity not found: ${e.entity}</div>`;let s=this.hass.language,n=this._now,o=e.show_time===!1?m:p`<div class="top ink">
            <span class="time">${n.toLocaleTimeString(s,{hour:"numeric",minute:"2-digit"})}</span>
            <span class="date">${n.toLocaleDateString(s,{weekday:"long",month:"short",day:"numeric"})}</span>
          </div>`;if(T(t))return p`<button class="hit" @click=${this.more}>${o}<div class="center warning">Weather unavailable</div></button>`;let a=Number(t.attributes.temperature),l=isFinite(a)?`${Math.round(a)}\xB0`:"\u2013",c=((g=(u=this.hass).formatEntityState)==null?void 0:g.call(u,t))??gi(t.state),h=mi(this._forecast),d=f=>f===void 0?"\u2013":`${Math.round(f)}\xB0`;return p`<button class="hit" aria-label="${c}, ${l}" @click=${this.more}>
      ${o}
      <div class="now ink">
        <span class="temp ${l.length>3?"long":""}">${l}</span>
        <span class="cond"><ha-icon .icon=${fi[t.state]??"mdi:weather-partly-cloudy"}></ha-icon><span>${c}</span></span>
      </div>
      <div class="outlook ink">
        <span>H: ${d(h.high)}</span><i></i><span class="dim">L: ${d(h.low)}</span><i></i><span class="rain">${y.drop}${this.wet(h,t.attributes.precipitation_unit)}</span>
      </div>
    </button>`}wet(e,t){return e.rain!==void 0?`${Math.round(e.rain)}%`:e.amount!==void 0?`${Math.round(e.amount*10)/10}${t?` ${t}`:""}`:"\u2013"}};ue.properties={...S.properties,_forecast:{state:!0},_now:{state:!0}},ue.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"weather"}}}},{name:"show_time",label:"Show the time and date",selector:{boolean:{}}}],ue.styles=[H,C`
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
    `];customElements.define("homeview-weather-card",ue);O("homeview-weather-card","HomeView Weather","Time, temperature, condition and today's high, low and rain chance on liquid glass.");var Vi=["#ff9f0a","#30d158","#0a84ff","#bf5af2","#ff375f","#64d2ff"],Wi=900*1e3,Bs=30*1e3,Gs=190,Ct=r=>(r.entities??[]).map(i=>typeof i=="string"?{entity:i}:i).map((i,e)=>({entity:i.entity,color:i.color??Vi[e%Vi.length]})),me=class extends S{constructor(){super(...arguments);this._error="";this._width=0;this._now=new Date;this.fetchedAt=0;this.fetchedFor="";this.calendarStates="";this.run=0;this.tick=0;this.minute=()=>{this.tick=0,this.onScreen&&(this._now=new Date,this.refresh(),this.tick=window.setTimeout(this.minute,6e4-Date.now()%6e4+50))}}static getStubConfig(e){return{entities:Object.keys(e.states).filter(t=>R(t)==="calendar").slice(0,2),grid_options:{columns:"full",rows:2}}}validate(e){if(!Array.isArray(e.entities)||!e.entities.length)throw new Error("Add one or more calendar entities");for(let t of Ct(e))if(!t.entity||R(t.entity)!=="calendar")throw new Error(`Not a calendar: ${t.entity}`)}getGridOptions(){return{columns:"full",rows:2,min_columns:6,min_rows:1}}get square(){return!1}refFrom(e,t){return this._width=e,Math.min(e,t*2)}cardClass(){return"calendar"}connectedCallback(){super.connectedCallback(),this.resume()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.tick),this.tick=0,this.run++,this.fetchedFor=""}resume(){!this.onScreen||!this.hass||!this._config||(this.refresh(),this.tick||this.minute())}updated(e){var t;(t=super.updated)==null||t.call(this,e),(e.has("hass")||e.has("_config"))&&this.resume()}refresh(){let e=this._config,t=Ct(e).map(a=>a.entity),s=JSON.stringify([t,e.days??7]),n=t.map(a=>{var l,c;return`${(l=this.hass.states[a])==null?void 0:l.state}|${((c=this.hass.states[a])==null?void 0:c.attributes.message)??""}`}).join(",");(s!==this.fetchedFor||n!==this.calendarStates||Date.now()-this.fetchedAt>Wi)&&(this.fetchedFor=s,this.calendarStates=n,this.fetchedAt=Date.now(),this.fetch(t,e.days??7,++this.run))}async fetch(e,t,s){try{let n=await G(this.hass.callWS({type:"call_service",domain:"calendar",service:"get_events",target:{entity_id:e},service_data:{duration:{days:t}},return_response:!0}),Bs);if(s!==this.run)return;this._events=e.flatMap(o=>{var a,l;return(((l=(a=n.response)==null?void 0:a[o])==null?void 0:l.events)??[]).map(c=>({...c,calendar:o}))}),this._error=""}catch(n){if(s!==this.run)return;this._error=(n==null?void 0:n.message)??String(n),this.fetchedAt=Date.now()-Wi+6e4,console.warn("HomeView calendar:",n)}}renderContent(){let e=this._config;if(!this.hass)return m;let t=Object.fromEntries(Ct(e).map(c=>[c.entity,c.color])),s=this.hass.language,n=p`<div class="head ink">${y.calendar}<span>${e.title??"Up next"}</span></div>`,o=this._width?Math.max(1,Math.floor(this._width*.82/Gs)):1,a=this._events?vi(this._events,this._now,Math.min(e.count??3,o)):[],l;return this._events?a.length?l=p`${a.map(c=>{let h=bi(c,this._now,s);return p`<div class="event ${h.today?"today":""}">
          <div class="badge"><span class="wd">${h.label}</span><span class="day">${h.day}</span></div>
          <div class="text ink">
            <div class="summary">${c.summary}</div>
            <div class="when"><i style="background:${t[c.calendar??""]??"#fff"}"></i>${yi(c,s)}</div>
          </div>
        </div>`})}`:l=p`<div class="note ink">Nothing coming up</div>`:l=p`<div class="note ink">${this._error?"Calendar unavailable":"Loading\u2026"}</div>`,p`<div class="strip" title=${this._error||m}>${n}${l}</div>`}};me.properties={...S.properties,_events:{state:!0},_error:{state:!0},_width:{state:!0},_now:{state:!0}},me.editorFields=[{name:"entities",label:"Calendars",required:!0,selector:{entity:{multiple:!0,filter:{domain:"calendar"}}}},{name:"title",helper:"Defaults to Up next",selector:{text:{}}},{name:"days",label:"Days ahead",selector:{number:{min:1,max:60,mode:"box"}}},{name:"count",label:"Most events shown",selector:{number:{min:1,max:6,mode:"box"}}}],me.styles=[H,C`
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
    `];customElements.define("homeview-calendar-card",me);O("homeview-calendar-card","HomeView Up Next","The next events from your calendars, on a liquid-glass strip.");var Ki=r=>(...i)=>({_$litDirective$:r,values:i}),et=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,e,t){this._$Ct=i,this._$AM=e,this._$Ci=t}_$AS(i,e){return this.update(i,e)}update(i,e){return this.render(...e)}};var{I:to}=Yt;var qs={},Xi=(r,i=qs)=>r._$AH=i;var Yi=Ki(class extends et{constructor(){super(...arguments),this.key=m}render(r,i){return this.key=r,i}update(r,[i,e]){return i!==this.key&&(Xi(r),this.key=i),e}});var js=16,tt={x:88,y:76},St=16;async function Mt(r){if(customElements.get("ha-camera-stream"))return!0;try{let i=window.loadCardHelpers;return i?((await i()).createCardElement({type:"picture-entity",entity:r,camera_view:"live"}),await G(customElements.whenDefined("ha-camera-stream"),5e3),!0):!1}catch{return!1}}var Re=class extends D{constructor(){super(...arguments);this._cur=0;this._drag=0;this._slide=0;this._still=!1;this._picker=!1;this._muted=!0;this._seen=!1;this._box={w:0,h:0};this.stamp=Date.now();this.slideTimer=0;this.asked=!1;this.inView=!1;this.onVisible=()=>this.setSeen();this.togglePicker=()=>{this._picker=!this._picker,this._picker&&(this.stamp=Date.now())};this.goHome=()=>{var t;let e=((t=this.config)==null?void 0:t.home_path)||`/${location.pathname.split("/")[1]??""}`;history.pushState(null,"",e),window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))};this.onKey=e=>{if(e.key==="Escape"&&this._picker)this._picker=!1;else if(e.key==="ArrowRight"&&!this._picker)this.step(1);else if(e.key==="ArrowLeft"&&!this._picker)this.step(-1);else return;e.preventDefault(),e.stopPropagation()}}get cams(){var e,t;return Ve((e=this.config)==null?void 0:e.entities,(t=this.config)==null?void 0:t.crop_top)}connectedCallback(){super.connectedCallback(),document.addEventListener("visibilitychange",this.onVisible),this.hasUpdated&&this.watch()}disconnectedCallback(){var e,t,s;super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onVisible),(e=this.untrack)==null||e.call(this),this.untrack=void 0,(t=this.watchers)==null||t.io.disconnect(),(s=this.watchers)==null||s.ro.disconnect(),this.watchers=void 0,this.finishSlide(),this._muted=!0,this._picker=!1,this.inView=!1,this._seen=!1}willUpdate(e){e.has("config")&&(this._cur=Ce(this._cur,this.cams.length)),!this.asked&&this.cams.length&&this.hass&&(this.asked=!0,Mt(this.cams[0].entity).then(t=>this._player=t))}firstUpdated(){this.watch()}watch(){let e=this.renderRoot.querySelector(".stage");if(!e||this.watchers)return;let t=new IntersectionObserver(([n])=>{this.inView=n.isIntersecting,this.setSeen()}),s=new ResizeObserver(([n])=>this._box={w:n.contentRect.width,h:n.contentRect.height});t.observe(this),s.observe(e),this.watchers={io:t,ro:s},this.untrack=ce(e,{move:n=>this.dragTo(n),end:n=>this.dragEnd(n)},!1)}setSeen(){let e=this.inView&&document.visibilityState!=="hidden";e!==this._seen&&(this._seen=e,e?this.stamp=Date.now():this._muted=!0)}dragTo(e){this._picker||(this.finishSlide(),this._still=!0,this._drag=this.cams.length<2?e/3:e)}dragEnd(e){if(!this._picker){if((e==="left"||e==="right")&&this.cams.length>1)return this.step(e==="left"?1:-1);this._still=!1,this._drag=0}}step(e){if(!(this.cams.length<2)){if(this._slide){this.finishSlide(),this.moveAgain().then(()=>this.step(e));return}clearTimeout(this.slideTimer),this._still=!1,this._drag=0,this._slide=e,this.slideTimer=window.setTimeout(()=>this.finishSlide(),q)}}finishSlide(){this._slide&&(clearTimeout(this.slideTimer),this.show(this._cur+this._slide),this.moveAgain())}async moveAgain(){var e;await this.updateComplete,(e=this.renderRoot.querySelector(".cam"))==null||e.getBoundingClientRect(),this._still=!1}show(e){this._cur=Ce(e,this.cams.length),this._slide=0,this._drag=0,this._still=!0,this._muted=!0,this.stamp=Date.now()}pick(e){this.show(e),this._picker=!1,this.moveAgain().then(()=>{var t;return(t=this.renderRoot.querySelector(".grid-btn"))==null?void 0:t.focus({preventScroll:!0})})}nameOf(e){return e.name??(this.hass?N(this.hass,e.entity):e.entity)}snapshot(e){var n;let t=(n=this.hass)==null?void 0:n.states[e.entity],s=t&&!T(t)?t.attributes.entity_picture:void 0;return s&&this.hass?this.hass.hassUrl(`${s}${s.includes("?")?"&":"?"}hv=${this.stamp}`):""}stream(e){var o;let t=(o=this.hass)==null?void 0:o.states[e.entity];if(!t||T(t)||!this.hass||!this._seen||this._player===void 0||!this._box.h)return m;let s=this._box.w/(this._box.h*(1+e.crop/100)),n=customElements.get("ha-camera-stream")&&this._player;return Yi(`${e.entity}:${this._muted}`,n?p`<ha-camera-stream .hass=${this.hass} .stateObj=${t} .muted=${this._muted} .controls=${!1} .fitMode=${"cover"} .aspectRatio=${s}></ha-camera-stream>`:p`<img class="live" src=${this.hass.hassUrl(`/api/camera_proxy_stream/${e.entity}?token=${t.attributes.access_token}`)} alt="" draggable="false" />`)}camAt(e){var c;let t=this.cams;if(e&&t.length<2)return m;let s=t[Ce(this._cur+e,t.length)],n=(c=this.hass)==null?void 0:c.states[s.entity],o=this.snapshot(s),a=n?T(n)?"Offline":"":"Camera not found",l=`calc(${e-this._slide} * (100% + ${js}px) + ${this._drag}px)`;return p`<div class="cam" style="transform:translateX(${l})" aria-hidden=${e?"true":"false"}>
      <div class="frame" style="top:${-s.crop}%;height:${100+s.crop}%">
        ${o?p`<img class="snap" src=${o} alt="" draggable="false" />`:m} ${e?m:this.stream(s)}
      </div>
      ${a?p`<div class="empty">${y.camera}<span>${a}</span></div>`:m}
    </div>`}picker(){let e=this.cams,t=xi(e.length),s=Math.ceil(e.length/t),n=(this._box.h-2*tt.y-(s-1)*St)/s,o=Math.max(44,Math.min(n*16/9,(this._box.w-2*tt.x-(t-1)*St)/t));return p`<div class="picker" role="dialog" aria-label="Cameras" @click=${a=>a.target===a.currentTarget&&(this._picker=!1)}>
      <div class="tiles" style="grid-template-columns:repeat(${t}, ${o}px)">
        ${e.map((a,l)=>{let c=this.snapshot(a),h=this.nameOf(a);return p`<button class="tile ${l===this._cur?"cur":""}" aria-label=${h} aria-current=${l===this._cur?"true":"false"} @click=${()=>this.pick(l)}>
            ${c?p`<img src=${c} alt="" draggable="false" style="top:${-a.crop}%;height:${100+a.crop}%" />`:p`<span class="tile-icon">${y.camera}</span>`}
            <span class="tile-name">${h}</span>
          </button>`})}
      </div>
    </div>`}render(){let e=this.cams;if(!e.length||!this.hass)return p``;let t=e[Ce(this._cur,e.length)],s=this.hass.states[t.entity],n=!!s&&!T(s),o=this.nameOf(t),a=e.length>1;return p`<div
      class="stage swiper ${this._still?"still":""}"
      role="region"
      aria-roledescription="carousel"
      aria-label="Cameras: ${o}, ${this._cur+1} of ${e.length}"
      tabindex="0"
      @keydown=${this.onKey}
    >
      ${this.camAt(-1)}${this.camAt(0)}${this.camAt(1)}
      <div class="shade top"></div>
      <div class="shade bottom"></div>
      <div class="glass pill" aria-live="polite"><span class="rec ${n?"on":""}"></span><span class="pill-name">${o}</span></div>
      <button class="glass round home" aria-label="Home" @click=${this.goHome}>${y.home}</button>
      ${a?p`<div class="glass dots" aria-hidden="true">${e.map((l,c)=>p`<i class=${c===this._cur?"cur":""}></i>`)}</div>
            <button class="glass round grid-btn" aria-label=${this._picker?"Close cameras":"All cameras"} aria-expanded=${this._picker?"true":"false"} @click=${this.togglePicker}>
              ${this._picker?y.close:y.grid}
            </button>`:m}
      <button class="glass round mute" aria-label=${this._muted?"Unmute":"Mute"} @click=${()=>this._muted=!this._muted}>
        ${this._muted?y.muted:y.sound}
      </button>
      ${this._picker?this.picker():m}
    </div>`}};Re.properties={hass:{attribute:!1},config:{attribute:!1},_cur:{state:!0},_drag:{state:!0},_slide:{state:!0},_still:{state:!0},_picker:{state:!0},_muted:{state:!0},_seen:{state:!0},_player:{state:!0},_box:{state:!0}},Re.styles=C`
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
      /* every drag is ours: horizontal ones change the camera, and none scrolls or changes the view */
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    .cam {
      position: absolute;
      inset: 0;
      overflow: hidden;
      transition: transform ${q}ms cubic-bezier(0.22, 1, 0.36, 1);
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
      padding: ${tt.y}px ${tt.x}px;
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
      gap: ${St}px;
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
  `;customElements.get("homeview-camera-page")||customElements.define("homeview-camera-page",Re);var Ji=2,fe=class extends S{constructor(){super(...arguments);this._src="";this.loading="";this._fails=0;this.timer=0;this.onVisible=()=>this.resume();this.snap=()=>{this.timer=0;let e=this._config;if(!(e!=null&&e.entity)||this.page||!this.hass||!this.onScreen||document.visibilityState==="hidden")return;let t=Math.max(2,e.refresh??10);this.timer=window.setTimeout(this.snap,t*1e3);let s=this.hass.states[e.entity],n=s&&!T(s)?s.attributes.entity_picture:void 0;if(!n){this._src="";return}let o=this.hass.hassUrl(wi(n,Date.now(),t));if(o===this._src||o===this.loading)return;this.loading=o;let a=new Image;a.onload=()=>{this.loading===o&&(this._src=o,this._fails=0)},a.onerror=()=>{this.loading===o&&(this.loading="",this._fails++)},a.src=o};this.tap=()=>{let e=this._config,t=e.tap_action??"live";if(t==="none"||!this.hass)return;let s=this.hass.states[e.entity];if(t==="more-info"||!s||T(s)||ae(this)){U(this,"hass-more-info",{entityId:e.entity});return}if(this.live)return;let n=document.createElement("homeview-camera-live");n.hass=this.hass,n.entity=e.entity,n.name=this.name(),n.onClosed=()=>{var o;this.live=void 0,this.isConnected&&((o=this.renderRoot.querySelector("ha-card"))==null||o.focus({preventScroll:!0}))},this.live=n,de(n)};this.onKey=e=>{e.key!=="Enter"&&e.key!==" "||(e.preventDefault(),this.tap())}}static getStubConfig(e){return{entity:Object.keys(e.states).find(t=>R(t)==="camera")??""}}validate(e){if(Array.isArray(e.entities)&&e.entities.length){if(!Ve(e.entities).length)throw new Error("Add one or more camera entities")}else if(!e.entity||R(e.entity)!=="camera")throw new Error("Pick a camera entity")}get page(){var e;return Array.isArray((e=this._config)==null?void 0:e.entities)&&this._config.entities.length>0}get square(){return!this.page&&super.square}getGridOptions(){return this.page?{columns:"full",rows:"auto",min_columns:6,min_rows:4}:{columns:6,rows:"auto",min_columns:3,min_rows:2}}connectedCallback(){super.connectedCallback(),this.resume(),document.addEventListener("visibilitychange",this.onVisible)}disconnectedCallback(){var e;super.disconnectedCallback(),clearTimeout(this.timer),this.timer=0,document.removeEventListener("visibilitychange",this.onVisible),(e=this.live)==null||e.close()}resume(){this.timer||this.snap()}updated(e){var t;(t=super.updated)==null||t.call(this,e),e.has("_config")&&(this._src="",this._fails=0,clearTimeout(this.timer),this.timer=0),this.timer||this.snap(),this.live&&e.has("hass")&&this.hass&&(this.live.hass=this.hass)}name(){let e=this._config;return e.name??(this.hass?N(this.hass,e.entity):e.entity)}render(){let e=this._config;if(!e||!this.hass)return p``;if(this.page)return p`<homeview-camera-page .hass=${this.hass} .config=${e}></homeview-camera-page>`;if(!e.entity)return p``;let t=this.hass.states[e.entity],s=!t||T(t),n=this.name(),o=e.fit??"cover",a=o==="cover"?gt(e.crop_top):0,l=this._fails>=Ji?"":this._src,c=t?s?"Offline":this._fails>=Ji?"Not responding":"Loading\u2026":"Camera not found";return p`<ha-card
      class="camera ${this.square?"square":""} ${l?"shown":""}"
      role="button"
      tabindex="0"
      aria-label="${n}: ${s?"offline":"open the live view"}"
      @click=${this.tap}
      @keydown=${this.onKey}
    >
      ${l?p`<img src=${l} alt="" draggable="false" style="object-fit:${o};top:${-a}%;height:${100+a}%" />`:m}
      ${!l||s?p`<div class="empty">${y.camera}<span>${c}</span></div>`:m}
      <div class="name">${n}</div>
    </ha-card>`}renderContent(){return m}};fe.properties={...S.properties,_src:{state:!0},_fails:{state:!0}},fe.editorFields=[{name:"entity",label:"Camera (tile)",selector:{entity:{filter:{domain:"camera"}}}},{name:"entities",label:"Cameras (full-screen page)",helper:"Set these instead of one camera for a page of live cameras that fills a panel view: swipe between them. Name and crop_top per camera can be set in YAML.",selector:{entity:{multiple:!0,filter:{domain:"camera"}}}},{name:"home_path",label:"Home button goes to",helper:"Page only. Defaults to the dashboard's first view, e.g. /echo-show/home",selector:{text:{}}},{name:"name",selector:{text:{}}},{name:"refresh",label:"Seconds between snapshots",selector:{number:{min:2,max:600,mode:"box",unit_of_measurement:"s"}}},{name:"fit",selector:{select:{mode:"dropdown",options:[{value:"cover",label:"Fill"},{value:"contain",label:"Fit whole picture"}]}}},{name:"crop_top",label:"Hide the top (percent, when filling)",selector:{number:{min:0,max:20,mode:"box",unit_of_measurement:"%"}}},{name:"tap_action",label:"Tap action",selector:{select:{mode:"dropdown",options:[{value:"live",label:"Live view, full screen"},{value:"more-info",label:"More info"},{value:"none",label:"Nothing"}]}}}],fe.styles=[H,C`
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
    `];var Le=class extends I{constructor(){super(...arguments);this.entity="";this.name="";this.label="Camera live view";this.closeLabel="Close live view";this.openMs=600*1e3}connectedCallback(){super.connectedCallback(),Mt(this.entity).then(e=>this._player=e)}closed(){var e;(e=this.onClosed)==null||e.call(this)}renderBody(){var s;let e=(s=this.hass)==null?void 0:s.states[this.entity],t=m;return e&&this.hass&&this._player?t=p`<ha-camera-stream .hass=${this.hass} .stateObj=${e} .muted=${!0} .controls=${!1} fit-mode="contain"></ha-camera-stream>`:e&&this.hass&&this._player===!1&&(t=p`<img src=${this.hass.hassUrl(`/api/camera_proxy_stream/${this.entity}?token=${e.attributes.access_token}`)} alt="" draggable="false" />`),p`${t}${this._chrome?p`<div class="title">${this.name}</div>`:m}`}};Le.properties={...I.properties,hass:{attribute:!1},_player:{state:!0}},Le.styles=[I.overlayStyles,C`
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
    `];customElements.get("homeview-camera-live")||customElements.define("homeview-camera-live",Le);customElements.define("homeview-camera-card",fe);O("homeview-camera-card","HomeView Camera","Camera snapshot tile; tap for the live view full screen.");var Vs=4,Ws=16,Ks=32,Xs=256,Ys=512,Js=8192,Zs=500;function Zi(r,i){var t,s;let e=(s=(t=r.entities)==null?void 0:t[i])==null?void 0:s.device_id;return e?Object.entries(r.entities??{}).filter(([n,o])=>o.device_id===e&&n!==i&&r.states[n]).map(([n])=>n):[]}function Qi(r,i){var n,o;let e=i.battery??Zi(r,i.entity).find(a=>R(a)==="sensor"&&r.states[a].attributes.device_class==="battery"),t=e?(n=r.states[e])==null?void 0:n.state:(o=r.states[i.entity])==null?void 0:o.attributes.battery_level,s=Number(t);return t==null||t===""||!isFinite(s)?void 0:s}function Qs(r,i){return i.map?i.map:Zi(r,i.entity).find(e=>(R(e)==="image"||R(e)==="camera")&&!T(r.states[e])&&r.states[e].attributes.entity_picture)}var Oe=class extends S{constructor(){super(...arguments);this.holdTimer=0;this.held=!1;this.down=()=>{this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=window.setTimeout(()=>{this.held=!0,U(this,"hass-more-info",{entityId:this._config.entity})},Zs)};this.up=()=>clearTimeout(this.holdTimer);this.tap=()=>{if(this.held){this.held=!1;return}if(!this.hass||this.panel)return;if(ae(this))return U(this,"hass-more-info",{entityId:this._config.entity});let e=document.createElement("homeview-vacuum-panel");e.hass=this.hass,e.config=this._config,e.onClosed=()=>{var t;this.panel=void 0,this.isConnected&&((t=this.renderRoot.querySelector("button"))==null||t.focus({preventScroll:!0}))},this.panel=e,de(e)}}static getStubConfig(e){return{entity:Object.keys(e.states).find(t=>R(t)==="vacuum")??""}}validate(e){if(!e.entity||R(e.entity)!=="vacuum")throw new Error("Pick a vacuum entity")}getGridOptions(){return{columns:4,rows:"auto",min_columns:3,min_rows:2}}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.panel)==null||e.close()}updated(e){var t;(t=super.updated)==null||t.call(this,e),this.panel&&e.has("hass")&&this.hass&&(this.panel.hass=this.hass)}cardClass(){var s;let e=(s=this.hass)==null?void 0:s.states[this._config.entity];return`tile vacuum ${!!e&&vt.includes(e.state)?"on":""} ${(e==null?void 0:e.state)==="cleaning"?"cleaning":""} ${T(e)?"unavailable":""}`}renderContent(){let e=this._config;if(!this.hass)return m;let t=this.hass.states[e.entity],s=e.name??(t?N(this.hass,e.entity):e.entity),n=t?bt(t.state,Qi(this.hass,e)):"Entity not found";return p`<button
      class="hit"
      aria-label="${s}, ${n}"
      aria-haspopup="dialog"
      ?disabled=${!t}
      @pointerdown=${this.down}
      @pointerup=${this.up}
      @pointerleave=${this.up}
      @pointercancel=${this.up}
      @click=${this.tap}
      @contextmenu=${o=>o.preventDefault()}
    >
      <span class="icon">${y.vacuum}</span>
      <span class="label ink"><span class="title">${s}</span><br /><span class="sub">${n}</span></span>
    </button>`}};Oe.editorFields=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"vacuum"}}}},{name:"name",selector:{text:{}}},{name:"battery",helper:"Defaults to the robot's own battery sensor",selector:{entity:{filter:{domain:"sensor",device_class:"battery"}}}},{name:"map",helper:"Defaults to the robot's own map image",selector:{entity:{filter:{domain:["image","camera"]}}}},{name:"modes",label:"Mode choices",helper:"Select entities offered in the panel, such as mop mode or intensity",selector:{entity:{multiple:!0,filter:{domain:"select"}}}}],Oe.styles=[...Y.styles,C`
      ha-card.vacuum.on .icon {
        color: #0a9d8f;
      }
      ha-card.cleaning .icon svg {
        animation: spin 2.4s linear infinite;
      }
    `];var He=class extends I{constructor(){super(...arguments);this._picked=[];this.label="Vacuum";this.closeLabel="Close vacuum";this.openMs=1800*1e3;this.ownClose=!0;this.start=()=>{let e=_i(this._picked);e.length?(this.call("vacuum","send_command",{command:"app_segment_clean",params:[{segments:e,repeat:1}]}),this._picked=[]):this.call("vacuum","start")}}connectedCallback(){super.connectedCallback(),this.loadRooms()}closed(){var e;(e=this.onClosed)==null||e.call(this)}async loadRooms(){var t,s;let e=this.config;if(!(!this.hass||((s=(t=this.hass.entities)==null?void 0:t[e.entity])==null?void 0:s.platform)!=="roborock"))try{let n=await G(this.hass.callWS({type:"vacuum/get_segments",entity_id:e.entity}),15e3);this._rooms=n.segments??[]}catch(n){console.warn("HomeView vacuum: no rooms",n),this._rooms=[]}}call(e,t,s={},n=this.config.entity){var o;(o=this.hass)==null||o.callService(e,t,s,{entity_id:n})}toggleRoom(e){this._picked=this._picked.includes(e)?this._picked.filter(t=>t!==e):[...this._picked,e]}chips(e,t,s,n=!1){return p`<div class="chips">
      ${e.map(o=>p`<button class="chip ${o===t?"on":""}" ?disabled=${n} aria-pressed=${String(o===t)} @click=${()=>s(o)}>${oe(o)}</button>`)}
    </div>`}renderBody(){var $,A;let e=this.config,t=this.hass,s=t==null?void 0:t.states[e.entity];if(!t||!s)return p`<div class="scrim" @click=${()=>this.close()}></div>`;let n=Number(s.attributes.supported_features)||0,o=T(s),a=vt.includes(s.state),l=Qi(t,e),c=e.name??N(t,e.entity),h=Qs(t,e),d=h?($=t.states[h])==null?void 0:$.attributes.entity_picture:void 0,u=(s.attributes.fan_speed_list??[]).filter(x=>x!=="custom"),g=(x,P,_,v,b=!1)=>v?p`<button class="act ${b?"primary":""}" ?disabled=${o} @click=${_}>${P}<span>${x}</span></button>`:m,f=this._picked.length;return p`<div class="scrim" @click=${()=>this.close()}></div>
      <section class="sheet" @pointerdown=${x=>x.stopPropagation()} @touchmove=${x=>x.stopPropagation()}>
        <header>
          <span class="robot ${s.state==="cleaning"?"cleaning":""}">${y.vacuum}</span>
          <div>
            <h2>${bt(s.state)}</h2>
            <p>${[c,l===void 0?"":`${Math.round(l)}% battery`].filter(Boolean).join(" \xB7 ")}</p>
          </div>
          ${this.closeButton()}
        </header>
        <div class="cols ${d?"":"nomap"}">
          ${d?p`<div class="map"><img src=${t.hassUrl(d)} alt="Map" draggable="false" /></div>`:m}
          <div class="controls">
            <div class="acts">
              ${g(s.state==="paused"?"Resume":f?`Clean ${f} room${f>1?"s":""}`:"Start",p`<span class="g">${y.start}</span>`,this.start,!!(n&Js)&&s.state!=="cleaning",!0)}
              ${g("Pause",p`<span class="g">${y.pause}</span>`,()=>this.call("vacuum","pause"),!!(n&Vs)&&s.state==="cleaning")}
              ${g("Dock",p`<span class="g">${y.home}</span>`,()=>this.call("vacuum","return_to_base"),!!(n&Ws)&&(a||s.state==="idle"||s.state==="error"))}
              ${g("Locate",p`<span class="g">${y.locate}</span>`,()=>this.call("vacuum","locate"),!!(n&Ys))}
            </div>
            ${(A=this._rooms)!=null&&A.length&&n&Xs&&!a?p`<h3>Rooms</h3>
                  <div class="chips">
                    <button class="chip ${f?"":"on"}" aria-pressed=${String(!f)} @click=${()=>this._picked=[]}>Entire home</button>
                    ${this._rooms.map(x=>p`<button class="chip ${this._picked.includes(x.id)?"on":""}" aria-pressed=${String(this._picked.includes(x.id))} @click=${()=>this.toggleRoom(x.id)}>${x.name}</button>`)}
                  </div>`:m}
            ${u.length&&n&Ks?p`<h3>Suction</h3>
                  ${this.chips(u,s.attributes.fan_speed,x=>this.call("vacuum","set_fan_speed",{fan_speed:x}),o)}`:m}
            ${(e.modes??[]).map(x=>{let P=t.states[x];if(!P)return m;let _=(P.attributes.options??[]).filter(b=>b!=="custom"),v=N(t,x).replace(N(t,e.entity),"").trim()||x;return p`<h3>${oe(v)}</h3>
                ${this.chips(_,P.state,b=>this.call("select","select_option",{option:b},x),T(P))}`})}
          </div>
        </div>
      </section>`}};He.properties={...I.properties,hass:{attribute:!1},_rooms:{state:!0},_picked:{state:!0}},He.styles=[I.overlayStyles,C`
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
    `];customElements.get("homeview-vacuum-panel")||customElements.define("homeview-vacuum-panel",He);customElements.define("homeview-vacuum-card",Oe);O("homeview-vacuum-card","HomeView Vacuum","Robot vacuum tile with a glass panel: map, rooms, start / pause / dock and suction.");customElements.get("homeview-card-editor")||customElements.define("homeview-card-editor",Se);console.info("%c HOMEVIEW %c 0.1.7 ","background:#928980;color:#fff;border-radius:3px 0 0 3px","background:#2b241d;color:#fff;border-radius:0 3px 3px 0");
