(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,60074,e=>{"use strict";let t=globalThis,a=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap,i=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(a&&void 0===e){let a=void 0!==t&&1===t.length;a&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&s.set(t,e))}return e}toString(){return this.cssText}},o=(e,...t)=>new i(1===e.length?e[0]:t.reduce((t,a,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[r+1],e[0]),e,r),n=a?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t,a="";for(let t of e.cssRules)a+=t.cssText;return new i("string"==typeof(t=a)?t:t+"",void 0,r)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,y=globalThis,v=y.trustedTypes,g=v?v.emptyScript:"",m=y.reactiveElementPolyfillSupport,k={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let a=e;switch(t){case Boolean:a=null!==e;break;case Number:a=null===e?null:Number(e);break;case Object:case Array:try{a=JSON.parse(e)}catch(e){a=null}}return a}},b=(e,t)=>!l(e,t),f={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),y.litPropertyMetadata??(y.litPropertyMetadata=new WeakMap);let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=f){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let a=Symbol(),r=this.getPropertyDescriptor(e,a,t);void 0!==r&&d(this.prototype,e,r)}}static getPropertyDescriptor(e,t,a){let{get:r,set:s}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let i=null==r?void 0:r.call(this);null==s||s.call(this,t),this.requestUpdate(e,i,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??f}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let e=this.properties;for(let t of[...h(e),...p(e)])this.createProperty(t,e[t])}let e=this[Symbol.metadata];if(null!==e){let t=litPropertyMetadata.get(e);if(void 0!==t)for(let[e,a]of t)this.elementProperties.set(e,a)}for(let[e,t]of(this._$Eh=new Map,this.elementProperties)){let a=this._$Eu(e,t);void 0!==a&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e))for(let a of new Set(e.flat(1/0).reverse()))t.unshift(n(a));else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){let a=t.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),null==(e=this.constructor.l)||e.forEach(e=>e(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),void 0!==this.renderRoot&&this.isConnected&&(null==(t=e.hostConnected)||t.call(e))}removeController(e){var t;null==(t=this._$EO)||t.delete(e)}_$E_(){let e=new Map;for(let t of this.constructor.elementProperties.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(a)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let a of r){let r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=a.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null==(e=this._$EO)||e.forEach(e=>{var t;return null==(t=e.hostConnected)?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null==(e=this._$EO)||e.forEach(e=>{var t;return null==(t=e.hostDisconnected)?void 0:t.call(e)})}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){var a;let r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(void 0!==s&&!0===r.reflect){let i=(void 0!==(null==(a=r.converter)?void 0:a.toAttribute)?r.converter:k).toAttribute(t,r.type);this._$Em=e,null==i?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,t){var a,r;let s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){let e=s.getPropertyOptions(i),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null==(a=e.converter)?void 0:a.fromAttribute)?e.converter:k;this._$Em=i;let n=o.fromAttribute(t,e.type);this[i]=n??(null==(r=this._$Ej)?void 0:r.get(i))??n,this._$Em=null}}requestUpdate(e,t,a,r=!1,s){var i;if(void 0!==e){let o=this.constructor;if(!1===r&&(s=this[e]),a??(a=o.getPropertyOptions(e)),!((a.hasChanged??b)(s,t)||a.useDefault&&a.reflect&&s===(null==(i=this._$Ej)?void 0:i.get(e))&&!this.hasAttribute(o._$Eu(e,a))))return;this.C(e,t,a)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:r,wrapped:s},i){a&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,i??t??this[e]),!0!==s||void 0!==i)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,a]of e){let{wrapped:e}=a,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,a,r)}}let t=!1,a=this._$AL;try{(t=this.shouldUpdate(a))?(this.willUpdate(a),null==(e=this._$EO)||e.forEach(e=>{var t;return null==(t=e.hostUpdate)?void 0:t.call(e)}),this.update(a)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(a)}willUpdate(e){}_$AE(e){var t;null==(t=this._$EO)||t.forEach(e=>{var t;return null==(t=e.hostUpdated)?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x.elementProperties=new Map,x.finalized=new Map,null==m||m({ReactiveElement:x}),(y.reactiveElementVersions??(y.reactiveElementVersions=[])).push("2.1.2");let $=globalThis,_=e=>e,w=$.trustedTypes,S=w?w.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+A,O=`<${E}>`,T=document,z=()=>T.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,H=Array.isArray,j="[ 	\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,B=/>/g,N=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,U=/"/g,L=/^(?:script|style|textarea|title)$/i,V=(e,...t)=>({_$litType$:1,strings:e,values:t}),R=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),F=new WeakMap,K=T.createTreeWalker(T,129);function Y(e,t){if(!H(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}class W{constructor({strings:e,_$litType$:t},a){let r;this.parts=[];let s=0,i=0;const o=e.length-1,n=this.parts,[l,d]=((e,t)=>{let a=e.length-1,r=[],s,i=2===t?"<svg>":3===t?"<math>":"",o=D;for(let t=0;t<a;t++){let a=e[t],n,l,d=-1,c=0;for(;c<a.length&&(o.lastIndex=c,null!==(l=o.exec(a)));)c=o.lastIndex,o===D?"!--"===l[1]?o=M:void 0!==l[1]?o=B:void 0!==l[2]?(L.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=N):void 0!==l[3]&&(o=N):o===N?">"===l[0]?(o=s??D,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,n=l[1],o=void 0===l[3]?N:'"'===l[3]?U:q):o===U||o===q?o=N:o===M||o===B?o=D:(o=N,s=void 0);let h=o===N&&e[t+1].startsWith("/>")?" ":"";i+=o===D?a+O:d>=0?(r.push(n),a.slice(0,d)+C+a.slice(d)+A+h):a+A+(-2===d?t:h)}return[Y(e,i+(e[a]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]})(e,t);if(this.el=W.createElement(l,a),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=K.nextNode())&&n.length<o;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(C)){const t=d[i++],a=r.getAttribute(e).split(A),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:s,name:o[2],strings:a,ctor:"."===o[1]?Q:"?"===o[1]?ee:"@"===o[1]?et:G}),r.removeAttribute(e)}else e.startsWith(A)&&(n.push({type:6,index:s}),r.removeAttribute(e));if(L.test(r.tagName)){const e=r.textContent.split(A),t=e.length-1;if(t>0){r.textContent=w?w.emptyScript:"";for(let a=0;a<t;a++)r.append(e[a],z()),K.nextNode(),n.push({type:2,index:++s});r.append(e[t],z())}}}else if(8===r.nodeType)if(r.data===E)n.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(A,e+1));)n.push({type:7,index:s}),e+=A.length-1}s++}}static createElement(e,t){let a=T.createElement("template");return a.innerHTML=e,a}}function J(e,t,a=e,r){var s,i;if(t===R)return t;let o=void 0!==r?null==(s=a._$Co)?void 0:s[r]:a._$Cl,n=P(t)?void 0:t._$litDirective$;return(null==o?void 0:o.constructor)!==n&&(null==(i=null==o?void 0:o._$AO)||i.call(o,!1),void 0===n?o=void 0:(o=new n(e))._$AT(e,a,r),void 0!==r?(a._$Co??(a._$Co=[]))[r]=o:a._$Cl=o),void 0!==o&&(t=J(e,o._$AS(e,t.values),o,r)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:a}=this._$AD,r=((null==e?void 0:e.creationScope)??T).importNode(t,!0);K.currentNode=r;let s=K.nextNode(),i=0,o=0,n=a[0];for(;void 0!==n;){if(i===n.index){let t;2===n.type?t=new Z(s,s.nextSibling,this,e):1===n.type?t=new n.ctor(s,n.name,n.strings,this,e):6===n.type&&(t=new ea(s,this,e)),this._$AV.push(t),n=a[++o]}i!==(null==n?void 0:n.index)&&(s=K.nextNode(),i++)}return K.currentNode=T,r}p(e){let t=0;for(let a of this._$AV)void 0!==a&&(void 0!==a.strings?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}}class Z{get _$AU(){var e;return(null==(e=this._$AM)?void 0:e._$AU)??this._$Cv}constructor(e,t,a,r){this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=r,this._$Cv=(null==r?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){let a;P(e=J(this,e,t))?e===I||null==e||""===e?(this._$AH!==I&&this._$AR(),this._$AH=I):e!==this._$AH&&e!==R&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):H(a=e)||"function"==typeof(null==a?void 0:a[Symbol.iterator])?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==I&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){var t;let{values:a,_$litType$:r}=e,s="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=W.createElement(Y(r.h,r.h[0]),this.options)),r);if((null==(t=this._$AH)?void 0:t._$AD)===s)this._$AH.p(a);else{let e=new X(s,this),t=e.u(this.options);e.p(a),this.T(t),this._$AH=e}}_$AC(e){let t=F.get(e.strings);return void 0===t&&F.set(e.strings,t=new W(e)),t}k(e){H(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,a,r=0;for(let s of e)r===t.length?t.push(a=new Z(this.O(z()),this.O(z()),this,this.options)):a=t[r],a._$AI(s),r++;r<t.length&&(this._$AR(a&&a._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var a;for(null==(a=this._$AP)||a.call(this,!1,!0,t);e!==this._$AB;){let t=_(e).nextSibling;_(e).remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cv=e,null==(t=this._$AP)||t.call(this,e))}}class G{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,r,s){this.type=1,this._$AH=I,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,a.length>2||""!==a[0]||""!==a[1]?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=I}_$AI(e,t=this,a,r){let s=this.strings,i=!1;if(void 0===s)(i=!P(e=J(this,e,t,0))||e!==this._$AH&&e!==R)&&(this._$AH=e);else{let r,o,n=e;for(e=s[0],r=0;r<s.length-1;r++)(o=J(this,n[a+r],t,r))===R&&(o=this._$AH[r]),i||(i=!P(o)||o!==this._$AH[r]),o===I?e=I:e!==I&&(e+=(o??"")+s[r+1]),this._$AH[r]=o}i&&!r&&this.j(e)}j(e){e===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Q extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===I?void 0:e}}class ee extends G{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==I)}}class et extends G{constructor(e,t,a,r,s){super(e,t,a,r,s),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??I)===R)return;let a=this._$AH,r=e===I&&a!==I||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,s=e!==I&&(a===I||r);r&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;"function"==typeof this._$AH?this._$AH.call((null==(t=this.options)?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class ea{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}let er=$.litHtmlPolyfillSupport;null==er||er(W,Z),($.litHtmlVersions??($.litHtmlVersions=[])).push("3.3.3");let es=globalThis;class ei extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,a)=>{let r=(null==a?void 0:a.renderBefore)??t,s=r._$litPart$;if(void 0===s){let e=(null==a?void 0:a.renderBefore)??null;r._$litPart$=s=new Z(t.insertBefore(z(),e),e,void 0,a??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null==(e=this._$Do)||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null==(e=this._$Do)||e.setConnected(!1)}render(){return R}}ei._$litElement$=!0,ei.finalized=!0,null==(eu=es.litElementHydrateSupport)||eu.call(es,{LitElement:ei});let eo=es.litElementPolyfillSupport;null==eo||eo({LitElement:ei}),(es.litElementVersions??(es.litElementVersions=[])).push("4.2.2");let en=class extends ei{emitEvent(e,t,a=!0){let r=e.startsWith("kady-")?e:`kady-${e}`;return this.dispatchEvent(new CustomEvent(r,{bubbles:a,composed:!0,cancelable:!0,detail:t}))}hasSlotContent(e){return e?Array.from(this.children).some(t=>t.getAttribute("slot")===e):Array.from(this.childNodes).some(e=>{var t;return e.nodeType===Node.TEXT_NODE?!!(null==(t=e.textContent)?void 0:t.trim()):e.nodeType===Node.ELEMENT_NODE&&!e.hasAttribute("slot")})}slotHasAssignedContent(e){return e.target.assignedNodes().some(e=>{var t;return e.nodeType===Node.TEXT_NODE?!!(null==(t=e.textContent)?void 0:t.trim()):e.nodeType===Node.ELEMENT_NODE})}};en.baseStyles=o`
    :host {
      box-sizing: border-box;
      font-family: var(--kady-font-body);
      color: var(--kady-ink);
    }
    *, *::before, *::after {
      box-sizing: border-box;
    }
  `;let el=en,ed=e=>(t,a)=>{void 0!==a?a.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ec={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:b};function eh(e){return(t,a)=>{let r;return"object"==typeof a?((e=ec,t,a)=>{let{kind:r,metadata:s}=a,i=globalThis.litPropertyMetadata.get(s);if(void 0===i&&globalThis.litPropertyMetadata.set(s,i=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),i.set(a.name,e),"accessor"===r){let{name:r}=a;return{set(a){let s=t.get.call(this);t.set.call(this,a),this.requestUpdate(r,s,e,!0,a)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){let{name:r}=a;return function(a){let s=this[r];t.call(this,a),this.requestUpdate(r,s,e,!0,a)}}throw Error("Unsupported decorator location: "+r)})(e,t,a):(r=t.hasOwnProperty(a),t.constructor.createProperty(a,e),r?Object.getOwnPropertyDescriptor(t,a):void 0)}}function ep(e){return eh({...e,state:!0,attribute:!1})}var eu,ey=Object.defineProperty,ev=Object.getOwnPropertyDescriptor,eg=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?ev(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&ey(t,a,i),i};let em=class extends el{constructor(){super(...arguments),this.variant="primary",this.disabled=!1,this.type="button"}emit(e){if(this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}let t={name:this.name,value:this.value,variant:this.variant,type:this.type,href:this.href,originalEvent:e};if(this.emitEvent("click",t),"submit"===this.type){let t=this.closest("form");t&&!e.defaultPrevented&&t.requestSubmit()}}render(){let e=`btn ${this.variant}`;return this.href&&!this.disabled?V`<a
        class=${e}
        href=${this.href}
        role="button"
        @click=${this.emit}
      >
        <slot></slot>
      </a>`:V`<button
      class=${e}
      type=${this.type}
      name=${this.name??""}
      value=${this.value??""}
      ?disabled=${this.disabled}
      @click=${this.emit}
    >
      <slot></slot>
    </button>`}};em.styles=[el.baseStyles,o`
      :host {
        display: inline-block;
      }
      .btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--kady-space-2);
        padding: var(--kady-space-2) var(--kady-space-4);
        border-radius: var(--kady-radius-md);
        font-family: var(--kady-font-body);
        font-size: var(--kady-text-sm);
        font-weight: 600;
        line-height: var(--kady-leading);
        cursor: pointer;
        text-align: center;
        transition: background var(--kady-transition-fast), color var(--kady-transition-fast), box-shadow var(--kady-transition-fast);
        box-sizing: border-box;
      }
      .btn:focus-visible {
        outline: var(--kady-focus-ring);
        outline-offset: 2px;
      }
      :host([disabled]) .btn {
        opacity: var(--kady-disabled-opacity);
        pointer-events: none;
        cursor: not-allowed;
      }
      .primary {
        background: var(--kady-primary);
        color: var(--kady-ink-inverse);
      }
      .primary:hover {
        background: var(--kady-primary-hover);
        box-shadow: var(--kady-shadow-glow-primary);
      }
      .secondary {
        background: var(--kady-surface);
        color: var(--kady-ink);
        border: 1px solid var(--kady-line-strong);
      }
      .secondary:hover {
        border-color: var(--kady-primary);
        background: var(--kady-surface-raised);
      }
      .ghost {
        background: transparent;
        color: var(--kady-ink);
      }
      .ghost:hover {
        background: var(--kady-surface-raised);
        color: var(--kady-primary);
      }
      .danger {
        background: var(--kady-danger);
        color: var(--kady-ink-inverse);
      }
      .danger:hover {
        opacity: 0.9;
      }
    `],eg([eh()],em.prototype,"variant",2),eg([eh({type:Boolean,reflect:!0})],em.prototype,"disabled",2),eg([eh()],em.prototype,"href",2),eg([eh()],em.prototype,"name",2),eg([eh()],em.prototype,"value",2),eg([eh()],em.prototype,"type",2),em=eg([ed("kady-button")],em);var ek=Object.defineProperty,eb=Object.getOwnPropertyDescriptor,ef=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?eb(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&ek(t,a,i),i};let ex=class extends el{constructor(){super(...arguments),this.variant="neutral",this.size="sm",this.dot=!1}render(){let e=`badge size-${this.size} ${this.variant}`;return V`
      <span class=${e}>
        ${this.dot?V`<span class="dot" aria-hidden="true"></span>`:null}
        <slot></slot>
      </span>
    `}};ex.styles=[el.baseStyles,o`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: var(--kady-space-1);
        font-family: var(--kady-font-body);
        font-weight: 600;
        line-height: 1;
        border-radius: var(--kady-radius-sm);
        white-space: nowrap;
        user-select: none;
        box-sizing: border-box;
      }

      /* Tailles */
      .size-sm {
        font-size: var(--kady-text-xs);
        padding: 0.1875rem 0.4375rem;
      }
      .size-md {
        font-size: var(--kady-text-sm);
        padding: 0.25rem 0.625rem;
        border-radius: var(--kady-radius-md);
      }

      /* Live dot indicator */
      .dot {
        display: inline-block;
        width: 0.375rem;
        height: 0.375rem;
        border-radius: 50%;
        background: currentColor;
        flex-shrink: 0;
      }

      /* Variantes basées strictement sur les tokens */
      .primary {
        background: var(--kady-primary);
        color: var(--kady-surface);
      }
      .accent {
        background: var(--kady-accent);
        color: var(--kady-surface);
      }
      .secondary {
        background: var(--kady-surface);
        color: var(--kady-primary);
        box-shadow: inset 0 0 0 1px var(--kady-line);
      }
      .success {
        background: color-mix(in srgb, var(--kady-success) 14%, transparent);
        color: var(--kady-success);
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--kady-success) 28%, transparent);
      }
      .warning {
        background: color-mix(in srgb, var(--kady-warning) 14%, transparent);
        color: var(--kady-warning);
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--kady-warning) 28%, transparent);
      }
      .danger {
        background: color-mix(in srgb, var(--kady-danger) 14%, transparent);
        color: var(--kady-danger);
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--kady-danger) 28%, transparent);
      }
      .neutral {
        background: color-mix(in srgb, var(--kady-ink) 6%, transparent);
        color: var(--kady-ink-muted);
        box-shadow: inset 0 0 0 1px var(--kady-line);
      }
    `],ef([eh()],ex.prototype,"variant",2),ef([eh()],ex.prototype,"size",2),ef([eh({type:Boolean})],ex.prototype,"dot",2),ex=ef([ed("kady-badge")],ex);var e$=Object.defineProperty,e_=Object.getOwnPropertyDescriptor,ew=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?e_(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&e$(t,a,i),i};let eS=class extends el{constructor(){super(...arguments),this.variant="default",this._hasHeader=!1,this._hasFooter=!1}connectedCallback(){super.connectedCallback(),this._hasHeader=this.hasSlotContent("header"),this._hasFooter=this.hasSlotContent("footer")}handleClick(e){if("interactive"===this.variant){for(let t of e.composedPath()){if(t===this)break;if(t instanceof Element&&t.matches(eS.INTERACTIVE_SELECTOR))return}this.emitEvent("click",{originalEvent:e})}}handleKeydown(e){"interactive"===this.variant&&("Enter"===e.key||" "===e.key||"Spacebar"===e.key)&&(e.preventDefault(),this.emitEvent("click",{originalEvent:e}))}handleHeaderSlotChange(e){this._hasHeader=this.slotHasAssignedContent(e)}handleFooterSlotChange(e){this._hasFooter=this.slotHasAssignedContent(e)}render(){let e=`card variant-${this.variant}`;return V`
      <div
        class=${e}
        tabindex=${"interactive"===this.variant?"0":"-1"}
        role=${"interactive"===this.variant?"button":"region"}
        @click=${this.handleClick}
        @keydown=${this.handleKeydown}
      >
        <div class="header ${this._hasHeader?"":"hidden"}">
          <slot name="header" @slotchange=${this.handleHeaderSlotChange}></slot>
        </div>
        <div class="body">
          <slot></slot>
        </div>
        <div class="footer ${this._hasFooter?"":"hidden"}">
          <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
        </div>
      </div>
    `}};eS.styles=[el.baseStyles,o`
      :host {
        display: block;
      }

      .card {
        display: flex;
        flex-direction: column;
        background: var(--kady-surface);
        border: 1px solid var(--kady-line);
        border-radius: var(--kady-radius-lg);
        overflow: hidden;
        transition: transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease;
      }

      .variant-default {
        box-shadow: var(--kady-shadow-sm);
      }

      .variant-raised {
        box-shadow: var(--kady-shadow-md);
        border-color: color-mix(in srgb, var(--kady-line) 80%, var(--kady-primary));
      }

      .variant-interactive {
        cursor: pointer;
        box-shadow: var(--kady-shadow-sm);
      }

      .variant-interactive:hover {
        transform: translateY(-2px);
        box-shadow: var(--kady-shadow-md);
        border-color: var(--kady-primary);
      }

      .variant-interactive:focus-visible {
        outline: var(--kady-focus-ring);
        outline-offset: 2px;
      }

      .header {
        padding: var(--kady-space-4);
        border-bottom: 1px solid var(--kady-line);
        font-weight: 600;
        font-size: var(--kady-text-base);
        background: color-mix(in srgb, var(--kady-paper) 40%, var(--kady-surface));
      }

      .header.hidden,
      .footer.hidden {
        display: none;
      }

      .body {
        padding: var(--kady-space-4);
        flex: 1 1 auto;
        line-height: var(--kady-leading);
        font-size: var(--kady-text-sm);
      }

      .footer {
        padding: var(--kady-space-3) var(--kady-space-4);
        border-top: 1px solid var(--kady-line);
        background: color-mix(in srgb, var(--kady-paper) 30%, var(--kady-surface));
        font-size: var(--kady-text-xs);
        color: var(--kady-ink-muted);
      }
    `],eS.INTERACTIVE_SELECTOR="a[href], button, input, select, textarea, kady-button, [role='button']",ew([eh()],eS.prototype,"variant",2),ew([ep()],eS.prototype,"_hasHeader",2),ew([ep()],eS.prototype,"_hasFooter",2),eS=ew([ed("kady-card")],eS);var eC=Object.defineProperty,eA=Object.getOwnPropertyDescriptor,eE=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?eA(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&eC(t,a,i),i};let eO=class extends el{constructor(){var e;super(),this.label="",this.placeholder="",this.error="",this.type="text",this.disabled=!1,this.required=!1,this.name="",this._value="",this._defaultValue="",this._hasDefault=!1,this._hasLabelSlot=!1,this._hasErrorSlot=!1,this.internals=this.attachInternals(),this.fieldId=`kady-input-${(null==(e=crypto.randomUUID)?void 0:e.call(crypto))??Math.random().toString(36).slice(2)}`}get value(){return this._value}set value(e){let t=this._value;t!==e&&(this._value=e,this.requestUpdate("value",t),this.internals.setFormValue(e),this._updateValidity())}get form(){return this.internals.form}connectedCallback(){super.connectedCallback(),this._hasDefault||(this._hasDefault=!0,this._defaultValue=this.value),this.internals.setFormValue(this.value),this._updateValidity()}formResetCallback(){this.value=this._defaultValue}formDisabledCallback(e){this.disabled=e}_updateValidity(){var e;let t=(null==(e=this.renderRoot)?void 0:e.querySelector("input"))??void 0;this.required&&!this.value?this.internals.setValidity({valueMissing:!0},"Champ requis",t):this.internals.setValidity({})}updated(){this._updateValidity()}handleInput(e){let t=e.target;this.value=t.value,this.emitEvent("input",{value:this.value,name:this.name})}handleChange(e){let t=e.target;this.value=t.value,this.emitEvent("change",{value:this.value,name:this.name})}handleLabelSlotChange(e){this._hasLabelSlot=this.slotHasAssignedContent(e)}handleErrorSlotChange(e){this._hasErrorSlot=this.slotHasAssignedContent(e)}render(){let e=!!(this.error&&this.error.trim().length>0),t=`field ${e?"has-error":""}`,a=!!this.label||this._hasLabelSlot,r=e||this._hasErrorSlot;return V`
      <div class=${t}>
        <div class="label-wrapper ${a?"":"hidden"}">
          <slot name="label" @slotchange=${this.handleLabelSlotChange}>
            <label class="label" for=${this.fieldId}>
              ${this.label}
              ${this.required?V`<span class="required-marker" aria-hidden="true">*</span>`:null}
            </label>
          </slot>
        </div>

        <div class="input-wrapper">
          <div class="prefix">
            <slot name="prefix"></slot>
          </div>
          <input
            id=${this.fieldId}
            type=${this.type}
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            name=${this.name}
            aria-label=${this.label||null}
            @input=${this.handleInput}
            @change=${this.handleChange}
            aria-invalid=${e?"true":"false"}
          />
          <div class="suffix">
            <slot name="suffix"></slot>
          </div>
        </div>

        <div class="error-wrapper ${r?"":"hidden"}">
          <slot name="error" @slotchange=${this.handleErrorSlotChange}>
            <span class="error-text" role="alert">${this.error}</span>
          </slot>
        </div>
      </div>
    `}};eO.formAssociated=!0,eO.styles=[el.baseStyles,o`
      :host {
        display: block;
      }

      .hidden {
        display: none;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: var(--kady-space-1);
      }

      .label {
        font-size: var(--kady-text-sm);
        font-weight: 600;
        color: var(--kady-ink);
        display: flex;
        align-items: center;
        gap: var(--kady-space-1);
      }

      .required-marker {
        color: var(--kady-accent);
      }

      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        background: var(--kady-surface);
        border: 1px solid var(--kady-line);
        border-radius: var(--kady-radius-md);
        transition: border-color 120ms ease, box-shadow 120ms ease;
      }

      .input-wrapper:focus-within {
        border-color: var(--kady-accent);
        outline: var(--kady-focus-ring);
        outline-offset: 1px;
      }

      .prefix,
      .suffix {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 var(--kady-space-2);
        color: var(--kady-ink-muted);
      }

      input {
        all: unset;
        box-sizing: border-box;
        width: 100%;
        flex: 1 1 auto;
        padding: var(--kady-space-2) var(--kady-space-3);
        font-family: var(--kady-font-body);
        font-size: var(--kady-text-sm);
        line-height: var(--kady-leading);
        color: var(--kady-ink);
      }

      input::placeholder {
        color: var(--kady-ink-muted);
      }

      :host([disabled]) .field {
        opacity: var(--kady-disabled-opacity);
        cursor: not-allowed;
      }

      :host([disabled]) .input-wrapper {
        pointer-events: none;
        background: color-mix(in srgb, var(--kady-paper) 60%, var(--kady-surface));
      }

      .has-error .input-wrapper {
        border-color: var(--kady-danger);
      }

      .has-error .input-wrapper:focus-within {
        border-color: var(--kady-danger);
        outline: 2px solid var(--kady-danger);
      }

      .error-text {
        font-size: var(--kady-text-xs);
        color: var(--kady-danger);
        margin-top: var(--kady-space-1);
      }
    `],eE([eh()],eO.prototype,"label",2),eE([eh()],eO.prototype,"placeholder",2),eE([eh()],eO.prototype,"error",2),eE([eh()],eO.prototype,"type",2),eE([eh({type:Boolean,reflect:!0})],eO.prototype,"disabled",2),eE([eh({type:Boolean})],eO.prototype,"required",2),eE([eh()],eO.prototype,"name",2),eE([ep()],eO.prototype,"_hasLabelSlot",2),eE([ep()],eO.prototype,"_hasErrorSlot",2),eE([eh()],eO.prototype,"value",1),eO=eE([ed("kady-input")],eO);var eT=Object.defineProperty,ez=Object.getOwnPropertyDescriptor,eP=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?ez(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&eT(t,a,i),i};let eH=class extends el{constructor(){var e;super(),this.label="",this.options=[],this.placeholder="",this.error="",this.disabled=!1,this.required=!1,this.name="",this._value="",this._defaultValue="",this._hasDefault=!1,this._slottedOptions=[],this._hasLabelSlot=!1,this._hasErrorSlot=!1,this.internals=this.attachInternals(),this.fieldId=`kady-select-${(null==(e=crypto.randomUUID)?void 0:e.call(crypto))??Math.random().toString(36).slice(2)}`}get value(){return this._value}set value(e){let t=this._value;t!==e&&(this._value=e,this.requestUpdate("value",t),this.internals.setFormValue(e),this._updateValidity())}get form(){return this.internals.form}connectedCallback(){super.connectedCallback(),this._hasDefault||(this._hasDefault=!0,this._defaultValue=this.value),this.internals.setFormValue(this.value),this._updateValidity()}formResetCallback(){this.value=this._defaultValue}formDisabledCallback(e){this.disabled=e}_updateValidity(){var e;let t=(null==(e=this.renderRoot)?void 0:e.querySelector("select"))??void 0;this.required&&!this.value?this.internals.setValidity({valueMissing:!0},"Champ requis",t):this.internals.setValidity({})}updated(){this._updateValidity()}get parsedOptions(){return this.options&&this.options.length>0?this.options:this._slottedOptions}handleSlotChange(e){let t=e.target.assignedElements({flatten:!0}),a=[];for(let e of t)"option"===e.tagName.toLowerCase()&&a.push({value:e.value,label:e.textContent||e.value,disabled:e.disabled});this._slottedOptions=a}handleChange(e){let t=e.target;this.value=t.value,this.emitEvent("change",{value:this.value,name:this.name})}handleLabelSlotChange(e){this._hasLabelSlot=this.slotHasAssignedContent(e)}handleErrorSlotChange(e){this._hasErrorSlot=this.slotHasAssignedContent(e)}render(){let e=!!(this.error&&this.error.trim().length>0),t=`field ${e?"has-error":""}`,a=this.parsedOptions,r=!!this.label||this._hasLabelSlot,s=e||this._hasErrorSlot;return V`
      <div class=${t}>
        <div class="label-wrapper ${r?"":"hidden"}">
          <slot name="label" @slotchange=${this.handleLabelSlotChange}>
            <label class="label" for=${this.fieldId}>
              ${this.label}
              ${this.required?V`<span class="required-marker" aria-hidden="true">*</span>`:null}
            </label>
          </slot>
        </div>
        <div class="select-wrapper">
          <select
            id=${this.fieldId}
            .value=${this.value}
            ?disabled=${this.disabled}
            ?required=${this.required}
            name=${this.name}
            aria-label=${this.label||null}
            @change=${this.handleChange}
            aria-invalid=${e?"true":"false"}
          >
            ${this.placeholder?V`<option value="" disabled ?selected=${!this.value}>${this.placeholder}</option>`:null}
            ${a.map(e=>V`
                <option
                  value=${e.value}
                  ?selected=${e.value===this.value}
                  ?disabled=${e.disabled}
                >
                  ${e.label}
                </option>
              `)}
          </select>
          <span class="chevron" aria-hidden="true"></span>
        </div>
        <div class="error-wrapper ${s?"":"hidden"}">
          <slot name="error" @slotchange=${this.handleErrorSlotChange}>
            <span class="error-text" role="alert">${this.error}</span>
          </slot>
        </div>
        <div class="slotted-source">
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
      </div>
    `}};eH.formAssociated=!0,eH.styles=[el.baseStyles,o`
      :host {
        display: block;
      }

      .hidden {
        display: none;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: var(--kady-space-1);
      }

      .label {
        font-size: var(--kady-text-sm);
        font-weight: 600;
        color: var(--kady-ink);
        display: flex;
        align-items: center;
        gap: var(--kady-space-1);
      }

      .required-marker {
        color: var(--kady-accent);
      }

      .select-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }

      select {
        all: unset;
        box-sizing: border-box;
        width: 100%;
        padding: var(--kady-space-2) var(--kady-space-8) var(--kady-space-2) var(--kady-space-3);
        font-family: var(--kady-font-body);
        font-size: var(--kady-text-sm);
        line-height: var(--kady-leading);
        color: var(--kady-ink);
        background: var(--kady-surface);
        border: 1px solid var(--kady-line);
        border-radius: var(--kady-radius-md);
        cursor: pointer;
        transition: border-color 120ms ease, box-shadow 120ms ease;
      }

      select:focus-visible {
        border-color: var(--kady-accent);
        outline: var(--kady-focus-ring);
        outline-offset: 1px;
      }

      /* Flèche chevron stylée en pur CSS tokens */
      .chevron {
        position: absolute;
        right: var(--kady-space-3);
        pointer-events: none;
        width: 0.6rem;
        height: 0.6rem;
        border-right: 2px solid var(--kady-ink-muted);
        border-bottom: 2px solid var(--kady-ink-muted);
        transform: rotate(45deg) translateY(-25%);
        transition: border-color 120ms ease;
      }

      select:focus + .chevron {
        border-color: var(--kady-accent);
      }

      :host([disabled]) .field {
        opacity: var(--kady-disabled-opacity);
        cursor: not-allowed;
      }

      :host([disabled]) select {
        pointer-events: none;
        background: color-mix(in srgb, var(--kady-paper) 60%, var(--kady-surface));
      }

      .has-error select {
        border-color: var(--kady-danger);
      }

      .has-error select:focus-visible {
        border-color: var(--kady-danger);
        outline: 2px solid var(--kady-danger);
      }

      .error-text {
        font-size: var(--kady-text-xs);
        color: var(--kady-danger);
        margin-top: var(--kady-space-1);
      }

      /* Slot caché servant de source de repli pour les balises <option> */
      .slotted-source {
        display: none;
      }
    `],eP([eh()],eH.prototype,"label",2),eP([eh({type:Array,attribute:!0,converter:{fromAttribute:e=>{if(null===e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}}})],eH.prototype,"options",2),eP([eh()],eH.prototype,"placeholder",2),eP([eh()],eH.prototype,"error",2),eP([eh({type:Boolean,reflect:!0})],eH.prototype,"disabled",2),eP([eh({type:Boolean})],eH.prototype,"required",2),eP([eh()],eH.prototype,"name",2),eP([ep()],eH.prototype,"_slottedOptions",2),eP([ep()],eH.prototype,"_hasLabelSlot",2),eP([ep()],eH.prototype,"_hasErrorSlot",2),eP([eh()],eH.prototype,"value",1),eH=eP([ed("kady-select")],eH);var ej=Object.defineProperty,eD=Object.getOwnPropertyDescriptor,eM=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?eD(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&ej(t,a,i),i};let eB=class extends el{constructor(){var e;super(),this.label="",this.placeholder="",this.error="",this.rows=4,this.resize="vertical",this.disabled=!1,this.required=!1,this.name="",this._value="",this._defaultValue="",this._hasDefault=!1,this._hasLabelSlot=!1,this._hasErrorSlot=!1,this._hasHelperSlot=!1,this.internals=this.attachInternals(),this.fieldId=`kady-textarea-${(null==(e=crypto.randomUUID)?void 0:e.call(crypto))??Math.random().toString(36).slice(2)}`}get value(){return this._value}set value(e){let t=this._value;t!==e&&(this._value=e,this.requestUpdate("value",t),this.internals.setFormValue(e),this._updateValidity())}get form(){return this.internals.form}connectedCallback(){super.connectedCallback(),this._hasDefault||(this._hasDefault=!0,this._defaultValue=this.value),this.internals.setFormValue(this.value),this._updateValidity()}formResetCallback(){this.value=this._defaultValue}formDisabledCallback(e){this.disabled=e}_updateValidity(){var e;let t=(null==(e=this.renderRoot)?void 0:e.querySelector("textarea"))??void 0;this.required&&!this.value?this.internals.setValidity({valueMissing:!0},"Champ requis",t):this.internals.setValidity({})}updated(){this._updateValidity()}handleInput(e){let t=e.target;this.value=t.value,this.emitEvent("input",{value:this.value,name:this.name})}handleChange(e){let t=e.target;this.value=t.value,this.emitEvent("change",{value:this.value,name:this.name})}handleLabelSlotChange(e){this._hasLabelSlot=this.slotHasAssignedContent(e)}handleErrorSlotChange(e){this._hasErrorSlot=this.slotHasAssignedContent(e)}handleHelperSlotChange(e){this._hasHelperSlot=this.slotHasAssignedContent(e)}render(){let e=!!(this.error&&this.error.trim().length>0),t=`field ${e?"has-error":""}`,a=!!this.label||this._hasLabelSlot,r=e||this._hasErrorSlot,s=r||this._hasHelperSlot;return V`
      <div class=${t}>
        <div class="label-wrapper ${a?"":"hidden"}">
          <slot name="label" @slotchange=${this.handleLabelSlotChange}>
            <label class="label" for=${this.fieldId}>
              ${this.label}
              ${this.required?V`<span class="required-marker" aria-hidden="true">*</span>`:null}
            </label>
          </slot>
        </div>

        <div class="textarea-wrapper">
          <textarea
            id=${this.fieldId}
            rows=${this.rows}
            style="resize: ${this.resize};"
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            name=${this.name}
            aria-label=${this.label||null}
            @input=${this.handleInput}
            @change=${this.handleChange}
            aria-invalid=${e?"true":"false"}
          ></textarea>
        </div>

        <div class="bottom-bar ${s?"":"hidden"}">
          <div class="error-wrapper ${r?"":"hidden"}">
            <slot name="error" @slotchange=${this.handleErrorSlotChange}>
              <span class="error-text" role="alert">${this.error}</span>
            </slot>
          </div>
          <div class="helper-wrapper ${this._hasHelperSlot?"":"hidden"}">
            <slot name="helper" @slotchange=${this.handleHelperSlotChange}></slot>
          </div>
        </div>
      </div>
    `}};eB.formAssociated=!0,eB.styles=[el.baseStyles,o`
      :host {
        display: block;
      }

      .hidden {
        display: none;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: var(--kady-space-1);
      }

      .label {
        font-size: var(--kady-text-sm);
        font-weight: 600;
        color: var(--kady-ink);
        display: flex;
        align-items: center;
        gap: var(--kady-space-1);
      }

      .required-marker {
        color: var(--kady-accent);
      }

      .textarea-wrapper {
        position: relative;
        display: flex;
        background: var(--kady-surface);
        border: 1px solid var(--kady-line);
        border-radius: var(--kady-radius-md);
        transition: border-color 120ms ease, box-shadow 120ms ease;
      }

      .textarea-wrapper:focus-within {
        border-color: var(--kady-accent);
        outline: var(--kady-focus-ring);
        outline-offset: 1px;
      }

      textarea {
        all: unset;
        box-sizing: border-box;
        width: 100%;
        flex: 1 1 auto;
        padding: var(--kady-space-2) var(--kady-space-3);
        font-family: var(--kady-font-body);
        font-size: var(--kady-text-sm);
        line-height: var(--kady-leading);
        color: var(--kady-ink);
        white-space: pre-wrap;
        word-break: break-word;
      }

      textarea::placeholder {
        color: var(--kady-ink-muted);
      }

      :host([disabled]) .field {
        opacity: var(--kady-disabled-opacity);
        cursor: not-allowed;
      }

      :host([disabled]) .textarea-wrapper {
        pointer-events: none;
        background: color-mix(in srgb, var(--kady-paper) 60%, var(--kady-surface));
      }

      .has-error .textarea-wrapper {
        border-color: var(--kady-danger);
      }

      .has-error .textarea-wrapper:focus-within {
        border-color: var(--kady-danger);
        outline: 2px solid var(--kady-danger);
      }

      .bottom-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--kady-space-2);
        margin-top: var(--kady-space-1);
      }

      .error-text {
        font-size: var(--kady-text-xs);
        color: var(--kady-danger);
      }

      .helper-text {
        font-size: var(--kady-text-xs);
        color: var(--kady-ink-muted);
      }
    `],eM([eh()],eB.prototype,"label",2),eM([eh()],eB.prototype,"placeholder",2),eM([eh()],eB.prototype,"error",2),eM([eh({type:Number})],eB.prototype,"rows",2),eM([eh()],eB.prototype,"resize",2),eM([eh({type:Boolean,reflect:!0})],eB.prototype,"disabled",2),eM([eh({type:Boolean})],eB.prototype,"required",2),eM([eh()],eB.prototype,"name",2),eM([ep()],eB.prototype,"_hasLabelSlot",2),eM([ep()],eB.prototype,"_hasErrorSlot",2),eM([ep()],eB.prototype,"_hasHelperSlot",2),eM([eh()],eB.prototype,"value",1),eB=eM([ed("kady-textarea")],eB);var eN=Object.defineProperty,eq=Object.getOwnPropertyDescriptor,eU=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?eq(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&eN(t,a,i),i};let eL=class extends el{constructor(){var e;super(),this.open=!1,this.heading="",this.size="md",this.dismissible=!0,this._hasHeaderSlot=!1,this._hasFooterSlot=!1,this._titleId=`kady-modal-${(null==(e=crypto.randomUUID)?void 0:e.call(crypto))??Math.random().toString(36).slice(2)}`}firstUpdated(){this.syncDialogState()}updated(e){e.has("open")&&this.syncDialogState()}syncDialogState(){if(this.dialogEl)if(this.open&&!this.dialogEl.open)try{this.dialogEl.showModal(),this.emitEvent("open")}catch{}else!this.open&&this.dialogEl.open&&this.dialogEl.close()}showModal(){this.open=!0}close(e=""){this.open=!1,this.dialogEl&&this.dialogEl.open&&this.dialogEl.close(e),this.emitEvent("close",{returnValue:e})}handleCancel(e){this.dismissible?(this.open=!1,this.emitEvent("close",{returnValue:"cancel"})):e.preventDefault()}handleBackdropClick(e){if(!this.dismissible||!this.dialogEl)return;let t=this.dialogEl.getBoundingClientRect();t.top<=e.clientY&&e.clientY<=t.top+t.height&&t.left<=e.clientX&&e.clientX<=t.left+t.width||this.close("backdrop")}handleHeaderSlotChange(e){this._hasHeaderSlot=this.slotHasAssignedContent(e)}handleFooterSlotChange(e){this._hasFooterSlot=this.slotHasAssignedContent(e)}render(){let e=!!this.heading||this._hasHeaderSlot;return V`
      <dialog
        class="size-${this.size}"
        @cancel=${this.handleCancel}
        @click=${this.handleBackdropClick}
        aria-labelledby=${this._hasHeaderSlot?I:this._titleId}
      >
        ${e?V`
              <div class="modal-header">
                <slot name="header" @slotchange=${this.handleHeaderSlotChange}>
                  <h2 id=${this._titleId} class="heading">${this.heading}</h2>
                </slot>
                ${this.dismissible?V`
                      <button
                        type="button"
                        class="close-btn"
                        @click=${()=>this.close("close-button")}
                        aria-label="Fermer le dialogue"
                      >
                        <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    `:null}
              </div>
            `:null}

        <div class="modal-body">
          <slot></slot>
        </div>

        <div class="modal-footer ${this._hasFooterSlot?"":"hidden"}">
          <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
        </div>
      </dialog>
    `}};eL.styles=[el.baseStyles,o`
      :host {
        display: contents;
      }

      dialog {
        all: unset;
        box-sizing: border-box;
        position: fixed;
        inset: 0;
        margin: auto;
        z-index: 1000;
        display: none;
        flex-direction: column;
        max-width: calc(100vw - 2rem);
        max-height: calc(100vh - 4rem);
        background: var(--kady-surface);
        border: 1px solid var(--kady-line-strong);
        border-radius: var(--kady-radius-lg);
        box-shadow: var(--kady-shadow-md);
        color: var(--kady-ink);
        overflow: hidden;
        opacity: 0;
        transform: scale(0.96) translateY(8px);
        transition: opacity 180ms ease, transform 180ms ease;
      }

      dialog[open] {
        display: flex;
        opacity: 1;
        transform: scale(1) translateY(0);
      }

      dialog::backdrop {
        background: var(--kady-backdrop);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        opacity: 0;
        transition: opacity 180ms ease;
      }

      dialog[open]::backdrop {
        opacity: 1;
      }

      /* Tailles de modal */
      dialog.size-sm {
        width: 100%;
        max-width: 400px;
      }
      dialog.size-md {
        width: 100%;
        max-width: 560px;
      }
      dialog.size-lg {
        width: 100%;
        max-width: 760px;
      }
      dialog.size-xl {
        width: 100%;
        max-width: 960px;
      }

      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--kady-space-4) var(--kady-space-6);
        border-bottom: 1px solid var(--kady-line);
        background: var(--kady-surface-raised);
      }

      .heading {
        margin: 0;
        font-family: var(--kady-font-display);
        font-size: var(--kady-text-lg);
        font-weight: 600;
        color: var(--kady-ink);
        line-height: 1.25;
      }

      .close-btn {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: var(--kady-radius-md);
        color: var(--kady-ink-muted);
        cursor: pointer;
        transition: background 120ms ease, color 120ms ease;
      }

      .close-btn:hover {
        background: color-mix(in srgb, var(--kady-ink) 8%, transparent);
        color: var(--kady-ink);
      }

      .close-btn:focus-visible {
        outline: var(--kady-focus-ring);
        outline-offset: 1px;
      }

      .close-icon {
        width: 1.25rem;
        height: 1.25rem;
      }

      .modal-body {
        padding: var(--kady-space-6);
        overflow-y: auto;
        flex: 1 1 auto;
        font-size: var(--kady-text-base);
        line-height: var(--kady-leading);
        color: var(--kady-ink);
      }

      .modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--kady-space-3);
        padding: var(--kady-space-4) var(--kady-space-6);
        border-top: 1px solid var(--kady-line);
        background: var(--kady-surface);
      }

      /* Barres masquées tant que le slot correspondant est vide
         (sinon un modal sans footer affiche une barre vide avec bordure/fond). */
      .modal-header.hidden,
      .modal-footer.hidden {
        display: none;
      }
    `],eU([eh({type:Boolean,reflect:!0})],eL.prototype,"open",2),eU([eh()],eL.prototype,"heading",2),eU([eh()],eL.prototype,"size",2),eU([eh({type:Boolean})],eL.prototype,"dismissible",2),eU([(e,t,a)=>{let r;return(r={get(){var e;return(null==(e=this.renderRoot)?void 0:e.querySelector("dialog"))??null}}).configurable=!0,r.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,r),r}],eL.prototype,"dialogEl",2),eU([ep()],eL.prototype,"_hasHeaderSlot",2),eU([ep()],eL.prototype,"_hasFooterSlot",2),eL=eU([ed("kady-modal")],eL);var eV=Object.defineProperty,eR=Object.getOwnPropertyDescriptor,eI=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?eR(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&eV(t,a,i),i};let eF=class extends el{constructor(){super(...arguments),this.variant="info",this.title="",this.dismissible=!1,this.open=!0,this._hasTitleSlot=!1,this._hasActionSlot=!1}dismiss(){this.open=!1,this.emitEvent("dismiss")}renderDefaultIcon(){switch(this.variant){case"success":return V`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        `;case"warning":return V`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        `;case"danger":return V`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        `;default:return V`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        `}}render(){if(!this.open)return null;let e=!!this.title||this._hasTitleSlot;return V`
      <div class="alert variant-${this.variant}" role="alert">
        <div class="icon-wrapper">
          <slot name="icon">
            ${this.renderDefaultIcon()}
          </slot>
        </div>

        <div class="content">
          ${e?V`
                <div class="title">
                  <slot name="title" @slotchange=${e=>this._hasTitleSlot=this.slotHasAssignedContent(e)}>
                    ${this.title}
                  </slot>
                </div>
              `:null}
          <div class="body">
            <slot></slot>
          </div>
          <div class="action-wrapper ${this._hasActionSlot?"":"hidden"}">
            <slot name="action" @slotchange=${e=>this._hasActionSlot=this.slotHasAssignedContent(e)}></slot>
          </div>
        </div>

        ${this.dismissible?V`
              <button
                type="button"
                class="close-btn"
                @click=${this.dismiss}
                aria-label="Fermer l'alerte"
              >
                <svg class="icon-svg" style="width: 1rem; height: 1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            `:null}
      </div>
    `}};eF.styles=[el.baseStyles,o`
      :host {
        display: block;
      }

      :host([hidden]),
      .hidden {
        display: none !important;
      }

      .alert {
        position: relative;
        display: flex;
        align-items: flex-start;
        gap: var(--kady-space-3);
        padding: var(--kady-space-3) var(--kady-space-4);
        border-radius: var(--kady-radius-md);
        border: 1px solid var(--alert-border);
        background: var(--alert-bg);
        color: var(--kady-ink);
        font-size: var(--kady-text-sm);
        line-height: var(--kady-leading);
        transition: opacity 150ms ease, transform 150ms ease;
      }

      /* Variantes */
      .variant-info {
        --alert-border: color-mix(in srgb, var(--kady-accent) 35%, transparent);
        --alert-bg: color-mix(in srgb, var(--kady-accent) 8%, var(--kady-surface));
        --alert-icon-color: var(--kady-accent);
      }

      .variant-success {
        --alert-border: color-mix(in srgb, var(--kady-success) 35%, transparent);
        --alert-bg: color-mix(in srgb, var(--kady-success) 8%, var(--kady-surface));
        --alert-icon-color: var(--kady-success);
      }

      .variant-warning {
        --alert-border: color-mix(in srgb, var(--kady-warning) 35%, transparent);
        --alert-bg: color-mix(in srgb, var(--kady-warning) 8%, var(--kady-surface));
        --alert-icon-color: var(--kady-warning);
      }

      .variant-danger {
        --alert-border: color-mix(in srgb, var(--kady-danger) 35%, transparent);
        --alert-bg: color-mix(in srgb, var(--kady-danger) 8%, var(--kady-surface));
        --alert-icon-color: var(--kady-danger);
      }

      .icon-wrapper {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--alert-icon-color);
        margin-top: 2px;
      }

      .icon-svg {
        width: 1.25rem;
        height: 1.25rem;
      }

      .content {
        flex: 1 1 auto;
        min-width: 0;
      }

      .title {
        font-weight: 600;
        color: var(--kady-ink);
        margin-bottom: var(--kady-space-1);
      }

      .body {
        color: var(--kady-ink);
      }

      .action-wrapper {
        margin-top: var(--kady-space-2);
      }

      .close-btn {
        all: unset;
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: var(--kady-radius-sm);
        color: var(--kady-ink-muted);
        cursor: pointer;
        margin-top: 1px;
        transition: background 120ms ease, color 120ms ease;
      }

      .close-btn:hover {
        background: color-mix(in srgb, var(--kady-ink) 10%, transparent);
        color: var(--kady-ink);
      }

      .close-btn:focus-visible {
        outline: var(--kady-focus-ring);
        outline-offset: 1px;
      }
    `],eI([eh()],eF.prototype,"variant",2),eI([eh()],eF.prototype,"title",2),eI([eh({type:Boolean})],eF.prototype,"dismissible",2),eI([eh({type:Boolean,reflect:!0})],eF.prototype,"open",2),eI([ep()],eF.prototype,"_hasTitleSlot",2),eI([ep()],eF.prototype,"_hasActionSlot",2),eF=eI([ed("kady-alert")],eF);var eK=Object.defineProperty,eY=Object.getOwnPropertyDescriptor,eW=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?eY(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&eK(t,a,i),i};let eJ=class extends el{constructor(){super(...arguments),this.variant="info",this.message="",this.title="",this.duration=4e3,this.position="bottom-right",this.open=!1,this.dismissible=!0,this._hasActionSlot=!1,this._timer=null}connectedCallback(){super.connectedCallback(),this._hasActionSlot=this.hasSlotContent("action")}handleActionSlotChange(e){this._hasActionSlot=this.slotHasAssignedContent(e)}updated(e){e.has("open")&&(this.open?this.startTimer():this.clearTimer())}disconnectedCallback(){super.disconnectedCallback(),this.clearTimer()}startTimer(){this.clearTimer(),this.duration>0&&(this._timer=setTimeout(()=>{this.close()},this.duration))}clearTimer(){this._timer&&(clearTimeout(this._timer),this._timer=null)}close(){this.clearTimer(),this.open=!1,this.emitEvent("close")}show(){this.open=!0}renderIcon(){switch(this.variant){case"success":return V`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        `;case"warning":return V`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        `;case"danger":return V`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        `;default:return V`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        `}}render(){return V`
      <div class="toast variant-${this.variant} ${this.open?"visible":""}" role="status" aria-live="polite">
        <div class="icon-wrapper">
          ${this.renderIcon()}
        </div>
        <div class="content">
          ${this.title?V`<div class="title">${this.title}</div>`:null}
          <div class="body">
            <slot>${this.message}</slot>
          </div>
          <div class="action-wrapper ${this._hasActionSlot?"":"hidden"}">
            <slot name="action" @slotchange=${this.handleActionSlotChange}></slot>
          </div>
        </div>
        ${this.dismissible?V`
              <button
                type="button"
                class="close-btn"
                @click=${this.close}
                aria-label="Fermer la notification"
              >
                <svg class="icon-svg" style="width: 1rem; height: 1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            `:null}
      </div>
    `}};eJ.styles=[el.baseStyles,o`
      :host {
        position: fixed;
        z-index: 2000;
        pointer-events: none;
      }

      /* Positions */
      :host([position="top-right"]) { top: var(--kady-space-4); right: var(--kady-space-4); }
      :host([position="top-left"]) { top: var(--kady-space-4); left: var(--kady-space-4); }
      :host([position="top-center"]) { top: var(--kady-space-4); left: 50%; transform: translateX(-50%); }
      :host([position="bottom-right"]) { bottom: var(--kady-space-4); right: var(--kady-space-4); }
      :host([position="bottom-left"]) { bottom: var(--kady-space-4); left: var(--kady-space-4); }
      :host([position="bottom-center"]) { bottom: var(--kady-space-4); left: 50%; transform: translateX(-50%); }

      .toast {
        pointer-events: auto;
        display: flex;
        align-items: flex-start;
        gap: var(--kady-space-3);
        min-width: 280px;
        max-width: 420px;
        padding: var(--kady-space-3) var(--kady-space-4);
        border-radius: var(--kady-radius-md);
        border: 1px solid var(--toast-border);
        background: var(--toast-bg);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        box-shadow: var(--kady-shadow-md);
        color: var(--kady-ink);
        font-size: var(--kady-text-sm);
        line-height: var(--kady-leading);
        opacity: 0;
        transform: translateY(10px) scale(0.97);
        transition: opacity 180ms cubic-bezier(0.16, 1, 0.3, 1), transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      .toast.visible {
        opacity: 1;
        transform: translateY(0) scale(1);
      }

      .variant-info {
        --toast-border: color-mix(in srgb, var(--kady-accent) 40%, transparent);
        --toast-bg: color-mix(in srgb, var(--kady-accent) 12%, var(--kady-surface-raised));
        --toast-icon-color: var(--kady-accent);
      }
      .variant-success {
        --toast-border: color-mix(in srgb, var(--kady-success) 40%, transparent);
        --toast-bg: color-mix(in srgb, var(--kady-success) 12%, var(--kady-surface-raised));
        --toast-icon-color: var(--kady-success);
      }
      .variant-warning {
        --toast-border: color-mix(in srgb, var(--kady-warning) 40%, transparent);
        --toast-bg: color-mix(in srgb, var(--kady-warning) 12%, var(--kady-surface-raised));
        --toast-icon-color: var(--kady-warning);
      }
      .variant-danger {
        --toast-border: color-mix(in srgb, var(--kady-danger) 40%, transparent);
        --toast-bg: color-mix(in srgb, var(--kady-danger) 12%, var(--kady-surface-raised));
        --toast-icon-color: var(--kady-danger);
      }

      .icon-wrapper {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--toast-icon-color);
        margin-top: 1px;
      }

      .icon-svg {
        width: 1.25rem;
        height: 1.25rem;
      }

      .content {
        flex: 1 1 auto;
        min-width: 0;
      }

      .title {
        font-weight: 600;
        color: var(--kady-ink);
        margin-bottom: 2px;
      }

      .body {
        color: var(--kady-ink);
      }

      .action-wrapper {
        margin-top: var(--kady-space-2);
      }

      .action-wrapper.hidden {
        display: none;
      }

      .close-btn {
        all: unset;
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: var(--kady-radius-sm);
        color: var(--kady-ink-muted);
        cursor: pointer;
        transition: background 120ms ease, color 120ms ease;
      }

      .close-btn:hover {
        background: color-mix(in srgb, var(--kady-ink) 10%, transparent);
        color: var(--kady-ink);
      }

      .close-btn:focus-visible {
        outline: var(--kady-focus-ring);
        outline-offset: 1px;
      }
    `],eW([eh()],eJ.prototype,"variant",2),eW([eh()],eJ.prototype,"message",2),eW([eh()],eJ.prototype,"title",2),eW([eh({type:Number})],eJ.prototype,"duration",2),eW([eh({reflect:!0})],eJ.prototype,"position",2),eW([eh({type:Boolean,reflect:!0})],eJ.prototype,"open",2),eW([eh({type:Boolean})],eJ.prototype,"dismissible",2),eW([ep()],eJ.prototype,"_hasActionSlot",2),eJ=eW([ed("kady-toast")],eJ);var eX=Object.defineProperty,eZ=Object.getOwnPropertyDescriptor,eG=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?eZ(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&eX(t,a,i),i};let eQ=class extends el{constructor(){super(...arguments),this.density="normal",this.striped=!1,this.stickyHeader=!1,this._hasPaginationSlot=!1}connectedCallback(){super.connectedCallback(),this._hasPaginationSlot=this.hasSlotContent("pagination")}handlePaginationSlotChange(e){this._hasPaginationSlot=this.slotHasAssignedContent(e)}render(){return V`
      <div class="table-container">
        <slot></slot>
      </div>
      <div class="pagination-bar ${this._hasPaginationSlot?"":"hidden"}">
        <slot name="pagination" @slotchange=${this.handlePaginationSlotChange}></slot>
      </div>
    `}};eQ.styles=[el.baseStyles,o`
      :host {
        display: block;
        background: var(--kady-surface);
        border: 1px solid var(--kady-line);
        border-radius: var(--kady-radius-lg);
        overflow: hidden;
      }

      .table-container {
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }

      ::slotted(table) {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-family: var(--kady-font-body);
        font-size: var(--kady-text-sm);
        color: var(--kady-ink);
      }

      .pagination-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--kady-space-3) var(--kady-space-4);
        border-top: 1px solid var(--kady-line);
        background: var(--kady-surface-raised);
        font-size: var(--kady-text-xs);
        color: var(--kady-ink-muted);
      }

      .hidden {
        display: none;
      }
    `],eG([eh({reflect:!0})],eQ.prototype,"density",2),eG([eh({type:Boolean,reflect:!0})],eQ.prototype,"striped",2),eG([eh({type:Boolean,reflect:!0,attribute:"sticky-header"})],eQ.prototype,"stickyHeader",2),eG([ep()],eQ.prototype,"_hasPaginationSlot",2),eQ=eG([ed("kady-table")],eQ);var e0=Object.defineProperty,e1=Object.getOwnPropertyDescriptor,e2=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?e1(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&e0(t,a,i),i};let e4=class extends el{constructor(){super(...arguments),this.size="md",this.variant="primary",this.label="Chargement en cours"}render(){return V`
      <span
        class="spinner size-${this.size} variant-${this.variant}"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <slot>
          <span class="sr-only">${this.label}</span>
        </slot>
      </span>
    `}};e4.styles=[el.baseStyles,o`
      :host {
        display: inline-flex;
        vertical-align: middle;
        line-height: 1;
      }

      .spinner {
        display: inline-block;
        box-sizing: border-box;
        border-radius: 50%;
        border-style: solid;
        animation: kady-spin 750ms linear infinite;
      }

      /* Tailles */
      .size-sm {
        width: 1rem;
        height: 1rem;
        border-width: 2px;
      }

      .size-md {
        width: 1.5rem;
        height: 1.5rem;
        border-width: 2.5px;
      }

      .size-lg {
        width: 2.25rem;
        height: 2.25rem;
        border-width: 3.5px;
      }

      /* Variantes tokens */
      .variant-primary {
        color: var(--kady-primary);
        border-color: color-mix(in srgb, var(--kady-primary) 20%, transparent);
        border-top-color: var(--kady-primary);
      }

      .variant-accent {
        color: var(--kady-accent);
        border-color: color-mix(in srgb, var(--kady-accent) 20%, transparent);
        border-top-color: var(--kady-accent);
      }

      .variant-surface {
        color: var(--kady-surface);
        border-color: color-mix(in srgb, var(--kady-surface) 25%, transparent);
        border-top-color: var(--kady-surface);
      }

      /* Lecteur d'écran uniquement */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      @keyframes kady-spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `],e2([eh()],e4.prototype,"size",2),e2([eh()],e4.prototype,"variant",2),e2([eh()],e4.prototype,"label",2),e4=e2([ed("kady-spinner")],e4);var e6=Object.defineProperty,e5=Object.getOwnPropertyDescriptor,e3=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?e5(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&e6(t,a,i),i};let e8=class extends el{constructor(){super(...arguments),this.title="",this.description="",this._hasTitleSlot=!1,this._hasDescriptionSlot=!1,this._hasActionSlot=!1}handleTitleSlotChange(e){this._hasTitleSlot=this.slotHasAssignedContent(e)}handleDescriptionSlotChange(e){this._hasDescriptionSlot=this.slotHasAssignedContent(e)}handleActionSlotChange(e){this._hasActionSlot=this.slotHasAssignedContent(e)}render(){let e=!!this.title||this._hasTitleSlot,t=!!this.description||this._hasDescriptionSlot;return V`
      <div class="empty-container">
        <div class="icon-wrapper" aria-hidden="true">
          <slot name="icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
              <line x1="6" y1="6" x2="6.01" y2="6"></line>
              <line x1="6" y1="18" x2="6.01" y2="18"></line>
            </svg>
          </slot>
        </div>

        <slot
          name="title"
          class=${e?"":"hidden"}
          @slotchange=${this.handleTitleSlotChange}
        >
          <h3 class="title">${this.title}</h3>
        </slot>

        <slot
          name="description"
          class=${t?"":"hidden"}
          @slotchange=${this.handleDescriptionSlotChange}
        >
          <p class="description">${this.description}</p>
        </slot>

        <div class="custom-content">
          <slot></slot>
        </div>

        <div class="action-wrapper ${this._hasActionSlot?"":"hidden"}">
          <slot name="action" @slotchange=${this.handleActionSlotChange}></slot>
        </div>
      </div>
    `}};e8.styles=[el.baseStyles,o`
      :host {
        display: block;
      }

      .empty-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: var(--kady-space-8) var(--kady-space-4);
        background: var(--kady-surface);
        border: 1px dashed var(--kady-line);
        border-radius: var(--kady-radius-lg);
        box-sizing: border-box;
      }

      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        background: color-mix(in srgb, var(--kady-paper) 80%, var(--kady-surface));
        color: var(--kady-ink-muted);
        margin-bottom: var(--kady-space-4);
      }

      ::slotted([slot="icon"]) {
        width: 1.75rem;
        height: 1.75rem;
        fill: currentColor;
      }

      .title {
        margin: 0 0 var(--kady-space-2) 0;
        font-family: var(--kady-font-display);
        font-size: var(--kady-text-xl);
        font-weight: 700;
        color: var(--kady-ink);
      }

      .description {
        margin: 0;
        font-size: var(--kady-text-sm);
        color: var(--kady-ink-muted);
        line-height: var(--kady-leading);
        max-width: 440px;
      }

      .custom-content {
        margin-top: var(--kady-space-2);
      }

      .action-wrapper {
        margin-top: var(--kady-space-6);
        display: flex;
        gap: var(--kady-space-3);
        align-items: center;
        justify-content: center;
      }

      /* Après les règles display des conteneurs pour que la cascade gagne. */
      .hidden {
        display: none;
      }
    `],e3([eh()],e8.prototype,"title",2),e3([eh()],e8.prototype,"description",2),e3([ep()],e8.prototype,"_hasTitleSlot",2),e3([ep()],e8.prototype,"_hasDescriptionSlot",2),e3([ep()],e8.prototype,"_hasActionSlot",2),e8=e3([ed("kady-empty-state")],e8);var e7=Object.defineProperty,e9=Object.getOwnPropertyDescriptor,te=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?e9(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&e7(t,a,i),i};let tt=class extends el{constructor(){super(...arguments),this.hostname="kady-box-01",this.ip="127.0.0.1",this.status="online",this.cpu="--",this.ram="--",this.temp="--",this.uptime="--",this.footerNote="Nœud HaaS autonome"}get statusLabel(){switch(this.status){case"online":return"En ligne";case"offline":return"Hors ligne";case"updating":return"Mise à jour";case"error":return"Erreur matérielle";default:return this.status}}get statusVariant(){switch(this.status){case"online":return"success";case"offline":default:return"neutral";case"updating":return"warning";case"error":return"danger"}}render(){return V`
      <kady-card>
        <div slot="header" class="header-row">
          <div class="title-group">
            <div class="hostname-wrapper">
              <slot name="hostname">
                <h4 class="hostname">${this.hostname}</h4>
              </slot>
              <slot name="status">
                <kady-badge variant=${this.statusVariant} ?dot=${!0} size="sm">
                  <slot name="status-label">${this.statusLabel}</slot>
                </kady-badge>
              </slot>
            </div>
            <slot name="ip">
              <span class="ip">IPv4: ${this.ip}</span>
            </slot>
          </div>
        </div>

        <slot>
          <div class="metrics-grid">
            <div class="metric-item">
              <span class="metric-label">CPU</span>
              <slot name="cpu">
                <kady-badge variant="neutral" size="sm">${this.cpu}</kady-badge>
              </slot>
            </div>
            <div class="metric-item">
              <span class="metric-label">RAM</span>
              <slot name="ram">
                <kady-badge variant="neutral" size="sm">${this.ram}</kady-badge>
              </slot>
            </div>
            ${void 0!==this.disk?V`
                  <div class="metric-item">
                    <span class="metric-label">Disque</span>
                    <slot name="disk">
                      <kady-badge variant="neutral" size="sm">${this.disk}</kady-badge>
                    </slot>
                  </div>
                `:null}
            <div class="metric-item">
              <span class="metric-label">Temp.</span>
              <slot name="temp">
                <kady-badge variant="neutral" size="sm">${this.temp}</kady-badge>
              </slot>
            </div>
            <div class="metric-item">
              <span class="metric-label">Uptime</span>
              <slot name="uptime">
                <kady-badge variant="neutral" size="sm">${this.uptime}</kady-badge>
              </slot>
            </div>
          </div>
        </slot>

        <div slot="footer" class="footer-row">
          <slot name="footer-note">
            <span class="uptime-label">${this.footerNote}</span>
          </slot>
          <div class="actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </kady-card>
    `}};tt.styles=[el.baseStyles,o`
      :host {
        display: block;
      }

      .header-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: var(--kady-space-3);
        flex-wrap: wrap;
      }

      .title-group {
        display: flex;
        flex-direction: column;
        gap: var(--kady-space-1);
      }

      .hostname-wrapper {
        display: flex;
        align-items: center;
        gap: var(--kady-space-2);
        flex-wrap: wrap;
      }

      .hostname {
        font-family: var(--kady-font-display);
        font-size: var(--kady-text-lg);
        font-weight: 700;
        margin: 0;
        color: var(--kady-ink);
      }

      .ip {
        font-size: var(--kady-text-xs);
        color: var(--kady-ink-muted);
        font-family: monospace;
      }

      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
        gap: var(--kady-space-3);
        background: color-mix(in srgb, var(--kady-paper) 45%, var(--kady-surface));
        border: 1px solid var(--kady-line);
        border-radius: var(--kady-radius-md);
        padding: var(--kady-space-3);
      }

      .metric-item {
        display: flex;
        flex-direction: column;
        gap: var(--kady-space-1);
      }

      .metric-label {
        font-size: var(--kady-text-xs);
        color: var(--kady-ink-muted);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        font-weight: 600;
      }

      .footer-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--kady-space-3);
        flex-wrap: wrap;
        width: 100%;
      }

      .uptime-label {
        font-size: var(--kady-text-xs);
        color: var(--kady-ink-muted);
      }

      .actions {
        display: flex;
        align-items: center;
        gap: var(--kady-space-2);
        margin-left: auto;
      }
    `],te([eh()],tt.prototype,"hostname",2),te([eh()],tt.prototype,"ip",2),te([eh()],tt.prototype,"status",2),te([eh()],tt.prototype,"cpu",2),te([eh()],tt.prototype,"ram",2),te([eh()],tt.prototype,"disk",2),te([eh()],tt.prototype,"temp",2),te([eh()],tt.prototype,"uptime",2),te([eh()],tt.prototype,"footerNote",2),tt=te([ed("kady-box-status")],tt);var ta=Object.defineProperty,tr=Object.getOwnPropertyDescriptor,ts=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?tr(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&ta(t,a,i),i};let ti=class extends el{constructor(){super(...arguments),this.used=0,this.total=100,this.unit="tokens",this.label="Consommation de tokens",this.warningThreshold=75,this.dangerThreshold=90}get percentage(){return this.total<=0?0:Math.min(100,Math.max(0,Math.round(this.used/this.total*100)))}get statusClass(){let e=this.percentage;return e>=this.dangerThreshold?"status-danger":e>=this.warningThreshold?"status-warning":"status-normal"}get badgeVariant(){let e=this.percentage;return e>=this.dangerThreshold?"danger":e>=this.warningThreshold?"warning":"primary"}formatNumber(e){return new Intl.NumberFormat("fr-FR").format(e)}render(){let e=this.percentage,t=`usage-wrapper ${this.statusClass}`;return V`
      <div class=${t}>
        <div class="header-row">
          <slot name="label">
            <span class="label">${this.label}</span>
          </slot>
          <slot name="percentage">
            <kady-badge variant=${this.badgeVariant} size="sm">${e}%</kady-badge>
          </slot>
        </div>

        <div
          class="track"
          role="progressbar"
          aria-valuenow=${this.used}
          aria-valuemin="0"
          aria-valuemax=${this.total}
          aria-label=${this.label}
        >
          <div class="fill" style="width: ${e}%;"></div>
        </div>

        <slot name="details">
          <div class="details-row">
            <span>${this.formatNumber(this.used)} ${this.unit} utilisés</span>
            <span>Quota: ${this.formatNumber(this.total)} ${this.unit}</span>
          </div>
        </slot>

        <slot></slot>
      </div>
    `}};ti.styles=[el.baseStyles,o`
      :host {
        display: block;
      }

      .usage-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--kady-space-2);
      }

      .header-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-size: var(--kady-text-sm);
      }

      .label {
        font-weight: 600;
        color: var(--kady-ink);
      }

      .track {
        position: relative;
        width: 100%;
        height: 0.625rem;
        background: color-mix(in srgb, var(--kady-line) 70%, transparent);
        border-radius: var(--kady-radius-sm);
        overflow: hidden;
      }

      .fill {
        height: 100%;
        border-radius: var(--kady-radius-sm);
        transition: width 350ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      .details-row {
        display: flex;
        justify-content: space-between;
        font-size: var(--kady-text-xs);
        color: var(--kady-ink-muted);
      }

      /* États selon les seuils */
      .status-normal .fill {
        background: var(--kady-primary);
      }

      .status-warning .fill {
        background: var(--kady-warning);
      }

      .status-danger .fill {
        background: var(--kady-danger);
      }
    `],ts([eh({type:Number})],ti.prototype,"used",2),ts([eh({type:Number})],ti.prototype,"total",2),ts([eh()],ti.prototype,"unit",2),ts([eh()],ti.prototype,"label",2),ts([eh({type:Number})],ti.prototype,"warningThreshold",2),ts([eh({type:Number})],ti.prototype,"dangerThreshold",2),ti=ts([ed("kady-token-usage-bar")],ti);var to=Object.defineProperty,tn=Object.getOwnPropertyDescriptor,tl=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?tn(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&to(t,a,i),i};let td=class extends el{constructor(){super(...arguments),this.value="0",this.currency="€",this.change="",this.label="MRR Récurrent",this.title="",this.period="vs mois précédent",this.subtitle="",this._hasTitleSlot=!1,this._hasDeltaSlot=!1,this._hasFooterSlot=!1}handleTitleSlotChange(e){this._hasTitleSlot=this.slotHasAssignedContent(e)}handleDeltaSlotChange(e){this._hasDeltaSlot=this.slotHasAssignedContent(e)}handleFooterSlotChange(e){this._hasFooterSlot=this.slotHasAssignedContent(e)}get computedChangeType(){if(this.changeType)return this.changeType;let e=String(this.change).trim();return e.startsWith("+")?"positive":e.startsWith("-")?"negative":"neutral"}get badgeVariant(){let e=this.computedChangeType;return"positive"===e?"success":"negative"===e?"danger":"neutral"}formatValue(e){return"number"==typeof e?new Intl.NumberFormat("fr-FR").format(e):String(e)}render(){let e=this.computedChangeType,t=this.title||this.label,a=!!t||this._hasTitleSlot,r=!!this.subtitle||this._hasFooterSlot,s=!!this.change||this._hasDeltaSlot;return V`
      <kady-card>
        <div
          slot=${a?"header":I}
          class="stat-header ${a?"":"hidden"}"
        >
          <slot name="title" @slotchange=${this.handleTitleSlotChange}>
            <span class="label">${t}</span>
          </slot>
        </div>

        <div class="stat-body">
          <div class="value-row">
            <slot name="value">
              <span class="value">${this.formatValue(this.value)}</span>
              <span class="currency">${this.currency}</span>
            </slot>
          </div>

          <div class="delta-row ${s?"":"hidden"}">
            <slot name="delta" @slotchange=${this.handleDeltaSlotChange}>
              <kady-badge variant=${this.badgeVariant} size="sm">
                <span aria-hidden="true">${"positive"===e?"↑":"negative"===e?"↓":"→"}</span>
                ${this.change}
              </kady-badge>
              ${this.period?V`<span class="period">${this.period}</span>`:null}
            </slot>
          </div>

          <slot></slot>
        </div>

        <div
          slot=${r?"footer":I}
          class="stat-footer ${r?"":"hidden"}"
        >
          <slot name="footer" @slotchange=${this.handleFooterSlotChange}>
            <div class="subtitle">${this.subtitle}</div>
          </slot>
        </div>
      </kady-card>
    `}};td.styles=[el.baseStyles,o`
      :host {
        display: block;
      }

      .stat-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .label {
        font-size: var(--kady-text-xs);
        color: var(--kady-ink-muted);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 0;
      }

      .stat-body {
        display: flex;
        flex-direction: column;
        gap: var(--kady-space-2);
      }

      .value-row {
        display: flex;
        align-items: baseline;
        gap: var(--kady-space-1);
      }

      .value {
        font-family: var(--kady-font-display);
        font-size: var(--kady-text-3xl);
        font-weight: 700;
        color: var(--kady-ink);
        line-height: 1.1;
      }

      .currency {
        font-size: var(--kady-text-xl);
        font-weight: 600;
        color: var(--kady-ink-muted);
      }

      .delta-row {
        display: flex;
        align-items: center;
        gap: var(--kady-space-2);
        flex-wrap: wrap;
        margin-top: var(--kady-space-1);
      }

      .period {
        font-size: var(--kady-text-xs);
        color: var(--kady-ink-muted);
      }

      .stat-footer {
        font-size: var(--kady-text-xs);
        color: var(--kady-ink-muted);
      }

      .subtitle {
        margin: 0;
      }

      /* Après les règles display des conteneurs pour que la cascade gagne. */
      .hidden {
        display: none;
      }
    `],tl([eh()],td.prototype,"value",2),tl([eh()],td.prototype,"currency",2),tl([eh()],td.prototype,"change",2),tl([eh()],td.prototype,"changeType",2),tl([eh()],td.prototype,"label",2),tl([eh()],td.prototype,"title",2),tl([eh()],td.prototype,"period",2),tl([eh()],td.prototype,"subtitle",2),tl([ep()],td.prototype,"_hasTitleSlot",2),tl([ep()],td.prototype,"_hasDeltaSlot",2),tl([ep()],td.prototype,"_hasFooterSlot",2),td=tl([ed("kady-mrr-stat")],td);var tc=Object.defineProperty,th=Object.getOwnPropertyDescriptor,tp=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?th(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&tc(t,a,i),i};let tu=class extends el{constructor(){super(...arguments),this.title="",this.events=[],this._hasHeaderSlot=!1}handleHeaderSlotChange(e){this._hasHeaderSlot=this.slotHasAssignedContent(e)}get parsedEvents(){return this.events||[]}mapStatusToBadge(e){switch(e){case"success":return"success";case"warning":return"warning";case"danger":return"danger";default:return"neutral"}}render(){let e=this.parsedEvents,t=!!this.title||this._hasHeaderSlot;return V`
      <div class="timeline-wrapper">
        <slot
          name="header"
          class=${t?"":"hidden"}
          @slotchange=${this.handleHeaderSlotChange}
        >
          <h4 class="timeline-title">${this.title}</h4>
        </slot>

        <div class="timeline">
          ${e.map(e=>V`
              <div class="event-item">
                <span class="event-dot dot-${e.status||"info"}" aria-hidden="true"></span>
                <div class="event-header">
                  <span class="event-title">${e.title}</span>
                  <span class="event-timestamp">${e.timestamp}</span>
                  ${e.badge?V`<kady-badge variant=${this.mapStatusToBadge(e.status)} size="sm">${e.badge}</kady-badge>`:null}
                </div>
                ${e.description?V`<p class="event-description">${e.description}</p>`:null}
              </div>
            `)}
          <slot></slot>
        </div>
      </div>
    `}};tu.styles=[el.baseStyles,o`
      :host {
        display: block;
      }

      .timeline-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--kady-space-4);
      }

      .timeline-title {
        font-family: var(--kady-font-display);
        font-size: var(--kady-text-lg);
        font-weight: 700;
        color: var(--kady-ink);
        margin: 0;
      }

      .timeline {
        position: relative;
        padding-left: var(--kady-space-6);
        display: flex;
        flex-direction: column;
        gap: var(--kady-space-4);
      }

      /* Ligne verticale conductrice */
      .timeline::before {
        content: "";
        position: absolute;
        left: 0.4375rem;
        top: 0.5rem;
        bottom: 0.5rem;
        width: 2px;
        background: var(--kady-line);
      }

      .event-item {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--kady-space-1);
      }

      /* Puce circulaire d'état */
      .event-dot {
        position: absolute;
        left: calc(-1 * var(--kady-space-6) + 0.1875rem);
        top: 0.25rem;
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 50%;
        background: var(--kady-surface);
        border: 2px solid var(--kady-primary);
        box-sizing: border-box;
      }

      .dot-info {
        border-color: var(--kady-primary);
      }
      .dot-success {
        border-color: var(--kady-success);
        background: var(--kady-success);
      }
      .dot-warning {
        border-color: var(--kady-warning);
        background: var(--kady-warning);
      }
      .dot-danger {
        border-color: var(--kady-danger);
        background: var(--kady-danger);
      }

      .event-header {
        display: flex;
        align-items: baseline;
        gap: var(--kady-space-2);
        flex-wrap: wrap;
      }

      .event-title {
        font-size: var(--kady-text-sm);
        font-weight: 600;
        color: var(--kady-ink);
      }

      .event-timestamp {
        font-size: var(--kady-text-xs);
        color: var(--kady-ink-muted);
      }

      .event-description {
        margin: 0;
        font-size: var(--kady-text-xs);
        color: var(--kady-ink-muted);
        line-height: var(--kady-leading);
      }

      .hidden {
        display: none;
      }
    `],tp([eh()],tu.prototype,"title",2),tp([eh({type:Array,attribute:!0,converter:{fromAttribute:e=>{if(null===e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}}})],tu.prototype,"events",2),tp([ep()],tu.prototype,"_hasHeaderSlot",2),tu=tp([ed("kady-event-timeline")],tu);var ty=Object.defineProperty,tv=Object.getOwnPropertyDescriptor,tg=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?tv(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&ty(t,a,i),i};let tm=[{label:"Résidence des données",cloud:"Stockées chez un tiers hébergeur, hors de vos locaux",kady:"Stockées et traitées sur votre appliance, dans vos locaux"},{label:"Latence",cloud:"Dépendante du réseau public et des clusters distants",kady:"Latence locale, indépendante de la connexion Internet"},{label:"Coût récurrent",cloud:"Facturation à l'usage (tokens), variable selon la charge",kady:"Coût matériel fixe, prévisible sur la durée"},{label:"Souveraineté",cloud:"Soumise aux lois extraterritoriales du pays d'hébergement",kady:"Maîtrise physique complète de la chaîne de traitement"},{label:"Personnalisation",cloud:"Modèles et paramètres limités aux options du fournisseur",kady:"Modèles, prompts et intégrations choisis librement"},{label:"Maintenance",cloud:"Pannes et maintenances planifiées subies côté fournisseur",kady:"Maintenance planifiée sous votre contrôle, avec support"}],tk=class extends el{constructor(){super(...arguments),this.title="",this.subtitle="",this.colCriterion="Critère",this.colCloud="Cloud Externe",this.colKady="Appliance Locale",this.criteria=[]}render(){let e=!!(this.title||this.subtitle),t=this.criteria.length>0?this.criteria:tm;return V`
      <div class="wrapper">
        ${e?V`
              <div class="header">
                <slot name="header">
                  ${this.title?V`<h2 class="title">${this.title}</h2>`:null}
                  ${this.subtitle?V`<p class="subtitle">${this.subtitle}</p>`:null}
                </slot>
              </div>
            `:null}

        <div class="table-container">
          <slot name="table">
            <table>
              <thead>
                <tr>
                  <th class="col-criterion">
                    <slot name="col-criterion-title">${this.colCriterion}</slot>
                  </th>
                  <th class="col-cloud">
                    <span class="th-dot" aria-hidden="true"></span
                    ><slot name="col-cloud-title">${this.colCloud}</slot>
                  </th>
                  <th class="col-kady">
                    <span class="th-dot" aria-hidden="true"></span
                    ><slot name="col-kady-title">${this.colKady}</slot>
                  </th>
                </tr>
              </thead>
              <tbody>
                ${t.map(e=>V`
                    <tr>
                      <td class="cell-criterion">${e.label}</td>
                      <td class="cell-cloud">
                        <div class="cell-content">
                          <span class="icon icon-cross" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="15" y1="9" x2="9" y2="15"></line>
                              <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                          </span>
                          <span>${e.cloud}</span>
                        </div>
                      </td>
                      <td class="cell-kady">
                        <div class="cell-content">
                          <span class="icon icon-check" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          </span>
                          <span>${e.kady}</span>
                        </div>
                      </td>
                    </tr>
                  `)}
              </tbody>
            </table>
          </slot>
        </div>
      </div>
    `}};tk.styles=[el.baseStyles,o`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--kady-space-6);
      }

      .header {
        text-align: center;
        max-width: 680px;
        margin: 0 auto var(--kady-space-8);
      }

      .title {
        font-family: var(--kady-font-display);
        font-size: var(--kady-text-3xl);
        font-weight: 700;
        color: var(--kady-ink);
        line-height: var(--kady-leading-tight);
        margin: 0 0 var(--kady-space-2) 0;
      }

      .subtitle {
        font-size: var(--kady-text-base);
        color: var(--kady-ink-muted);
        margin: 0;
      }

      .table-container {
        overflow-x: auto;
        border-radius: var(--kady-radius-lg);
        border: 1px solid var(--kady-line);
        background: var(--kady-surface);
        box-shadow: var(--kady-shadow-md);
      }

      table {
        width: 100%;
        /* separate (pas collapse) : avec collapse, le fond des cellules
           (colonnes colorées) peint PAR-DESSUS la bordure du conteneur
           arrondi — le trait du haut disparaît et les coins carrés
           débordent. separate + spacing 0 garde le même rendu de grille
           (les bordures sont portées par tr/th, pas par table). */
        border-collapse: separate;
        border-spacing: 0;
        text-align: left;
      }

      thead th {
        padding: var(--kady-space-6) var(--kady-space-6);
        font-family: var(--kady-font-display);
        font-size: var(--kady-text-xs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        border-bottom: 1px solid var(--kady-line);
      }

      .col-criterion {
        width: 26%;
        color: var(--kady-ink-muted);
      }

      /* En-têtes en pastilles : la distinction cloud/kady est portée par
         une puce colorée devant le libellé, pas par du texte saturé. */
      .col-cloud,
      .col-kady {
        width: 37%;
        color: var(--kady-ink);
      }

      .col-cloud .th-dot,
      .col-kady .th-dot {
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        margin-right: var(--kady-space-2);
        vertical-align: baseline;
      }

      .col-cloud .th-dot {
        background: var(--kady-danger);
      }

      .col-kady .th-dot {
        background: var(--kady-accent);
        box-shadow: 0 0 0 4px color-mix(in srgb, var(--kady-accent) 18%, transparent);
      }

      /* Colonnes teintées, très léger : le fond porte la distinction sans
         crier ; les coins internes hauts/bas suivent le radius du cadre. */
      .col-cloud,
      .cell-cloud {
        background: color-mix(in srgb, var(--kady-danger) 3%, transparent);
      }

      .col-kady,
      .cell-kady {
        background: color-mix(in srgb, var(--kady-accent) 5%, transparent);
      }

      /* En border-collapse: separate, les bordures sur <tr> ne se peignent
         pas — elles vivent sur les cellules. */
      tbody td {
        border-bottom: 1px solid var(--kady-line);
      }

      tbody tr {
        transition: background 120ms ease;
      }

      tbody tr:last-child td {
        border-bottom: none;
      }

      tbody tr:hover {
        background: color-mix(in srgb, var(--kady-surface-raised) 50%, transparent);
      }

      td {
        padding: var(--kady-space-6) var(--kady-space-6);
        font-size: var(--kady-text-base);
        line-height: var(--kady-leading);
        vertical-align: top;
      }

      /* Coins internes du bas : les colonnes teintées suivent le radius
         du cadre (le haut est sur les th, même principe). */
      tbody tr:last-child .cell-cloud,
      tbody tr:last-child .cell-kady {
        border-bottom-right-radius: calc(var(--kady-radius-lg) - 1px);
      }

      tbody tr:last-child .cell-cloud {
        border-bottom-left-radius: 0;
      }

      tbody tr:last-child td:first-child {
        border-bottom-left-radius: calc(var(--kady-radius-lg) - 1px);
      }

      tbody tr:last-child td:last-child {
        border-bottom-right-radius: calc(var(--kady-radius-lg) - 1px);
      }

      .cell-criterion {
        font-weight: 600;
        color: var(--kady-ink);
      }

      .cell-cloud {
        color: var(--kady-ink-muted);
      }

      .cell-kady {
        color: var(--kady-ink);
        font-weight: 500;
      }

      /* Icônes en pastilles rondes : plus moderne que le glyph nu. */
      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .icon svg {
        width: 0.85rem;
        height: 0.85rem;
      }

      .icon-cross {
        color: var(--kady-danger);
        background: color-mix(in srgb, var(--kady-danger) 12%, transparent);
      }

      .icon-check {
        color: var(--kady-accent-strong);
        background: color-mix(in srgb, var(--kady-accent) 14%, transparent);
      }

      .cell-content {
        display: flex;
        align-items: flex-start;
        gap: var(--kady-space-3);
      }
    `],tg([eh()],tk.prototype,"title",2),tg([eh()],tk.prototype,"subtitle",2),tg([eh()],tk.prototype,"colCriterion",2),tg([eh()],tk.prototype,"colCloud",2),tg([eh()],tk.prototype,"colKady",2),tg([eh({type:Array,converter:function(e){if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}})],tk.prototype,"criteria",2),tk=tg([ed("kady-anti-saas-compare")],tk);var tb=Object.defineProperty,tf=Object.getOwnPropertyDescriptor,tx=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?tf(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&tb(t,a,i),i};let t$=class extends el{constructor(){super(...arguments),this.eyebrow="",this.title="",this.subtitle="",this._hasEyebrowSlot=!1,this._hasTitleSlot=!1,this._hasSubtitleSlot=!1,this._hasCtaSlot=!1,this._hasMediaSlot=!1}handleEyebrowSlotChange(e){this._hasEyebrowSlot=this.slotHasAssignedContent(e)}handleTitleSlotChange(e){this._hasTitleSlot=this.slotHasAssignedContent(e)}handleSubtitleSlotChange(e){this._hasSubtitleSlot=this.slotHasAssignedContent(e)}handleCtaSlotChange(e){this._hasCtaSlot=this.slotHasAssignedContent(e)}handleMediaSlotChange(e){this._hasMediaSlot=this.slotHasAssignedContent(e)}render(){let e=!!this.eyebrow||this._hasEyebrowSlot,t=!!this.title||this._hasTitleSlot,a=!!this.subtitle||this._hasSubtitleSlot;return V`
      <section class="hero-container">
        <div class="content-col">
          <div class="eyebrow-wrapper ${e?"":"hidden"}">
            <slot name="eyebrow" @slotchange=${this.handleEyebrowSlotChange}>
              ${this.eyebrow?V`<span class="eyebrow-text">${this.eyebrow}</span>`:null}
            </slot>
          </div>

          <slot
            name="title"
            class=${t?"":"hidden"}
            @slotchange=${this.handleTitleSlotChange}
          >
            ${this.title?V`<h1 class="title">${this.title}</h1>`:null}
          </slot>

          <slot
            name="subtitle"
            class=${a?"":"hidden"}
            @slotchange=${this.handleSubtitleSlotChange}
          >
            ${this.subtitle?V`<p class="subtitle">${this.subtitle}</p>`:null}
          </slot>

          <slot></slot>

          <div class="cta-group ${this._hasCtaSlot?"":"hidden"}">
            <slot name="cta" @slotchange=${this.handleCtaSlotChange}></slot>
          </div>
        </div>

        <div class="media-col ${this._hasMediaSlot?"":"hidden"}">
          <slot name="media" @slotchange=${this.handleMediaSlotChange}></slot>
        </div>
      </section>
    `}};t$.styles=[el.baseStyles,o`
      :host {
        display: block;
      }

      .hero-container {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--kady-space-8);
        align-items: center;
        padding: var(--kady-space-8) var(--kady-space-4);
        max-width: 1200px;
        margin: 0 auto;
        box-sizing: border-box;
      }

      @media (min-width: 768px) {
        .hero-container {
          grid-template-columns: 1.1fr 0.9fr;
          padding: var(--kady-space-12) var(--kady-space-6);
        }
      }

      .content-col {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--kady-space-3);
      }

      .eyebrow-wrapper {
        display: flex;
        align-items: center;
        gap: var(--kady-space-2);
      }

      .eyebrow-text {
        font-size: var(--kady-text-xs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--kady-accent);
      }

      .title {
        font-family: var(--kady-font-display);
        font-size: var(--kady-text-3xl);
        font-weight: 700;
        line-height: 1.15;
        color: var(--kady-ink);
        margin: 0;
      }

      @media (min-width: 768px) {
        .title {
          font-size: 2.75rem;
        }
      }

      .subtitle {
        font-size: var(--kady-text-base);
        line-height: var(--kady-leading);
        color: var(--kady-ink-muted);
        margin: 0;
        max-width: 540px;
      }

      .cta-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--kady-space-3);
        margin-top: var(--kady-space-4);
      }

      .media-col {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      ::slotted([slot="media"]) {
        max-width: 100%;
        height: auto;
        border-radius: var(--kady-radius-lg);
      }

      /* Après les règles display des conteneurs pour que la cascade gagne. */
      .hidden {
        display: none;
      }
    `],tx([eh()],t$.prototype,"eyebrow",2),tx([eh()],t$.prototype,"title",2),tx([eh()],t$.prototype,"subtitle",2),tx([ep()],t$.prototype,"_hasEyebrowSlot",2),tx([ep()],t$.prototype,"_hasTitleSlot",2),tx([ep()],t$.prototype,"_hasSubtitleSlot",2),tx([ep()],t$.prototype,"_hasCtaSlot",2),tx([ep()],t$.prototype,"_hasMediaSlot",2),t$=tx([ed("kady-hero")],t$);var t_=Object.defineProperty,tw=Object.getOwnPropertyDescriptor,tS=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?tw(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&t_(t,a,i),i};let tC=class extends el{constructor(){super(...arguments),this.title="",this.subtitle="",this.features=[],this._hasHeaderSlot=!1,this._hasTitleSlot=!1,this._hasSubtitleSlot=!1}handleHeaderSlotChange(e){this._hasHeaderSlot=this.slotHasAssignedContent(e)}handleTitleSlotChange(e){this._hasTitleSlot=this.slotHasAssignedContent(e)}handleSubtitleSlotChange(e){this._hasSubtitleSlot=this.slotHasAssignedContent(e)}get parsedFeatures(){return this.features||[]}render(){let e=this.parsedFeatures,t=!!(this.title||this.subtitle||this._hasHeaderSlot||this._hasTitleSlot||this._hasSubtitleSlot),a=Math.floor(Number(this.columns)),r=Number.isFinite(a)&&a>0?`grid-template-columns: repeat(${a}, 1fr);`:I;return V`
      <div class="section-wrapper">
        <div class="header-block ${t?"":"hidden"}">
          <slot name="header" @slotchange=${this.handleHeaderSlotChange}>
            <slot name="title" @slotchange=${this.handleTitleSlotChange}>
              ${this.title?V`<h2 class="section-title">${this.title}</h2>`:null}
            </slot>
            <slot name="subtitle" @slotchange=${this.handleSubtitleSlotChange}>
              ${this.subtitle?V`<p class="section-subtitle">${this.subtitle}</p>`:null}
            </slot>
          </slot>
        </div>

        <div class="grid" style=${r}>
          ${e.map(e=>V`
              <kady-card class="feature-card">
                <div class="card-content">
                  <div class="card-top">
                    <div class="icon-container" aria-hidden="true">
                      ${e.icon||"✦"}
                    </div>
                    ${e.badge?V`<kady-badge variant="accent" size="sm">${e.badge}</kady-badge>`:null}
                  </div>
                  <h3 class="feature-title">${e.title}</h3>
                  <p class="feature-desc">${e.description}</p>
                </div>
              </kady-card>
            `)}
          <slot></slot>
        </div>
      </div>
    `}};tC.styles=[el.baseStyles,o`
      :host {
        display: block;
      }

      .section-wrapper {
        padding: var(--kady-space-8) 0;
        max-width: 1200px;
        margin: 0 auto;
      }

      .header-block {
        text-align: center;
        margin-bottom: var(--kady-space-8);
        max-width: 680px;
        margin-left: auto;
        margin-right: auto;
      }

      .section-title {
        font-family: var(--kady-font-display);
        font-size: var(--kady-text-2xl);
        font-weight: 700;
        color: var(--kady-ink);
        margin: 0 0 var(--kady-space-2) 0;
      }

      .section-subtitle {
        font-size: var(--kady-text-base);
        color: var(--kady-ink-muted);
        line-height: var(--kady-leading);
        margin: 0;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--kady-space-6);
      }

      .feature-card {
        height: 100%;
        transition: transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease;
      }

      .feature-card:hover {
        transform: translateY(-2px);
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: var(--kady-space-3);
        height: 100%;
      }

      .icon-container {
        width: 2.75rem;
        height: 2.75rem;
        border-radius: var(--kady-radius-md);
        background: color-mix(in srgb, var(--kady-paper) 70%, var(--kady-surface));
        border: 1px solid var(--kady-line);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--kady-primary);
        font-size: 1.25rem;
      }

      .card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .feature-title {
        font-family: var(--kady-font-display);
        font-size: var(--kady-text-lg);
        font-weight: 700;
        margin: 0;
        color: var(--kady-ink);
      }

      .feature-desc {
        font-size: var(--kady-text-sm);
        color: var(--kady-ink-muted);
        line-height: var(--kady-leading);
        margin: 0;
        flex: 1 1 auto;
      }

      ::slotted(kady-card) {
        height: 100%;
      }

      .hidden {
        display: none;
      }
    `],tS([eh()],tC.prototype,"title",2),tS([eh()],tC.prototype,"subtitle",2),tS([eh({type:Array,attribute:!0,converter:{fromAttribute:e=>{if(null===e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}}})],tC.prototype,"features",2),tS([eh({type:Number})],tC.prototype,"columns",2),tS([ep()],tC.prototype,"_hasHeaderSlot",2),tS([ep()],tC.prototype,"_hasTitleSlot",2),tS([ep()],tC.prototype,"_hasSubtitleSlot",2),tC=tS([ed("kady-feature-grid")],tC);var tA=Object.defineProperty,tE=Object.getOwnPropertyDescriptor,tO=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?tE(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&tA(t,a,i),i};let tT=class extends el{constructor(){super(...arguments),this.title="",this.description="",this.variant="primary",this._hasTitleSlot=!1,this._hasDescriptionSlot=!1,this._hasActionsSlot=!1}handleTitleSlotChange(e){this._hasTitleSlot=this.slotHasAssignedContent(e)}handleDescriptionSlotChange(e){this._hasDescriptionSlot=this.slotHasAssignedContent(e)}handleActionsSlotChange(e){this._hasActionsSlot=this.slotHasAssignedContent(e)}render(){let e=!!this.title||this._hasTitleSlot,t=!!this.description||this._hasDescriptionSlot;return V`
      <kady-card class="cta-card variant-${this.variant}">
        <div class="band-content">
          <div class="text-content">
            <slot
              name="title"
              class=${e?"":"hidden"}
              @slotchange=${this.handleTitleSlotChange}
            >
              ${this.title?V`<h2 class="title">${this.title}</h2>`:null}
            </slot>
            <slot
              name="description"
              class=${t?"":"hidden"}
              @slotchange=${this.handleDescriptionSlotChange}
            >
              ${this.description?V`<p class="description">${this.description}</p>`:null}
            </slot>
            <slot></slot>
          </div>
          <div class="actions-wrapper ${this._hasActionsSlot?"":"hidden"}">
            <slot name="actions" @slotchange=${this.handleActionsSlotChange}></slot>
          </div>
        </div>
      </kady-card>
    `}};tT.styles=[el.baseStyles,o`
      :host {
        display: block;
      }

      .cta-card {
        border-radius: var(--kady-radius-lg);
        box-shadow: var(--kady-shadow-md);
        overflow: hidden;
      }

      .cta-card.variant-primary {
        --kady-surface: var(--kady-primary);
        --kady-ink: var(--kady-ink-inverse);
        --kady-line: var(--kady-primary-strong);
        color: var(--kady-ink-inverse);
      }

      .cta-card.variant-surface {
        --kady-surface: var(--kady-surface);
        --kady-ink: var(--kady-ink);
        --kady-line: var(--kady-line);
      }

      .cta-card.variant-accent {
        --kady-surface: var(--kady-accent);
        --kady-ink: var(--kady-ink-inverse);
        --kady-line: var(--kady-accent-strong);
        color: var(--kady-ink-inverse);
      }

      .band-content {
        display: flex;
        flex-direction: column;
        gap: var(--kady-space-6);
        padding: var(--kady-space-4) var(--kady-space-2);
      }

      @media (min-width: 768px) {
        .band-content {
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
      }

      .text-content {
        display: flex;
        flex-direction: column;
        gap: var(--kady-space-2);
        max-width: 640px;
      }

      .title {
        font-family: var(--kady-font-display);
        font-size: var(--kady-text-2xl);
        font-weight: 700;
        line-height: 1.2;
        margin: 0;
      }

      .description {
        font-size: var(--kady-text-base);
        line-height: var(--kady-leading);
        margin: 0;
        opacity: 0.9;
      }

      .actions-wrapper {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--kady-space-3);
        flex-shrink: 0;
      }

      /* Après les règles display des conteneurs pour que la cascade gagne. */
      .hidden {
        display: none;
      }
    `],tO([eh()],tT.prototype,"title",2),tO([eh()],tT.prototype,"description",2),tO([eh()],tT.prototype,"variant",2),tO([ep()],tT.prototype,"_hasTitleSlot",2),tO([ep()],tT.prototype,"_hasDescriptionSlot",2),tO([ep()],tT.prototype,"_hasActionsSlot",2),tT=tO([ed("kady-cta-band")],tT);var tz=Object.defineProperty,tP=Object.getOwnPropertyDescriptor,tH=(e,t,a,r)=>{for(var s,i=r>1?void 0:r?tP(t,a):t,o=e.length-1;o>=0;o--)(s=e[o])&&(i=(r?s(t,a,i):s(i))||i);return r&&i&&tz(t,a,i),i};let tj=0,tD=class extends el{constructor(){super(...arguments),this.sticky=!1,this.themeToggle=!1,this.links=[],this.label="Navigation",this._menuOpen=!1,this._isMobile=!1,this._scrolled=!1,this._theme="dark",this._hasBrandSlot=!1,this._hasActionsSlot=!1,this._hasDefaultSlot=!1,this._panelId=`kady-navbar-links-${++tj}`,this._mql=window.matchMedia("(max-width: 767px)"),this._themeObserver=null,this._onBreakpoint=()=>{this._isMobile=this._mql.matches,this._isMobile||(this._menuOpen=!1)},this._onScroll=()=>{let e=window.scrollY>8;e!==this._scrolled&&(this._scrolled=e)},this._onDocClick=e=>{this._menuOpen&&!e.composedPath().includes(this)&&(this._menuOpen=!1)},this._onDocKeydown=e=>{var t;"Escape"===e.key&&this._menuOpen&&(this._menuOpen=!1,null==(t=this.renderRoot.querySelector(".burger"))||t.focus())}}connectedCallback(){super.connectedCallback(),this._isMobile=this._mql.matches,this._mql.addEventListener("change",this._onBreakpoint),this._syncTheme(),this._themeObserver=new MutationObserver(()=>this._syncTheme()),this._themeObserver.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),this._syncScrollListener()}disconnectedCallback(){var e;this._mql.removeEventListener("change",this._onBreakpoint),null==(e=this._themeObserver)||e.disconnect(),this._themeObserver=null,window.removeEventListener("scroll",this._onScroll),this._removeMenuDismissers(),super.disconnectedCallback()}updated(e){e.has("sticky")&&this._syncScrollListener(),e.has("_menuOpen")&&(this._removeMenuDismissers(),this._menuOpen&&(document.addEventListener("click",this._onDocClick,!0),document.addEventListener("keydown",this._onDocKeydown)))}_syncScrollListener(){this.sticky?(window.addEventListener("scroll",this._onScroll,{passive:!0}),this._onScroll()):(window.removeEventListener("scroll",this._onScroll),this._scrolled=!1)}_syncTheme(){this._theme="light"===document.documentElement.getAttribute("data-theme")?"light":"dark"}_toggleTheme(){this.emitEvent("theme-toggle",{theme:"dark"===this._theme?"light":"dark"})}_toggleMenu(){this._menuOpen=!this._menuOpen}_onLinkClick(){this._menuOpen&&(this._menuOpen=!1)}_removeMenuDismissers(){document.removeEventListener("click",this._onDocClick,!0),document.removeEventListener("keydown",this._onDocKeydown)}_onBrandSlot(e){this._hasBrandSlot=this.slotHasAssignedContent(e)}_onActionsSlot(e){this._hasActionsSlot=this.slotHasAssignedContent(e)}_onDefaultSlot(e){this._hasDefaultSlot=this.slotHasAssignedContent(e)}render(){let e=!this._hasDefaultSlot&&this.links.length>0,t=this._hasDefaultSlot||this.links.length>0,a=this._menuOpen&&this._isMobile;return V`
      <div class="shell">
        <header class="pill ${this._scrolled?"scrolled":""}">
          <div class="brand-wrap ${this._hasBrandSlot?"":"hidden"}">
            <slot name="brand" @slotchange=${this._onBrandSlot}></slot>
          </div>

          <nav class="nav" aria-label=${this.label}>
            <div
              id=${this._panelId}
              class="links ${a?"open":""} ${t?"":"hidden"}"
              aria-hidden=${this._isMobile&&!a?"true":"false"}
              @click=${this._onLinkClick}
            >
              <slot @slotchange=${this._onDefaultSlot}></slot>
              ${e?this.links.map(e=>V`<a class="link" href=${e.href}>${e.label}</a>`):I}
            </div>
          </nav>

          <div class="actions">
            <button
              type="button"
              class="burger"
              aria-label="Ouvrir le menu"
              aria-expanded=${this._menuOpen?"true":"false"}
              aria-controls=${this._panelId}
              @click=${this._toggleMenu}
            >
              ${this._menuOpen?V`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>`:V`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>`}
            </button>

            ${this.themeToggle?V`<button
                  type="button"
                  class="theme-toggle"
                  aria-label="Basculer le thème"
                  title="Basculer entre mode sombre et clair"
                  @click=${this._toggleTheme}
                >
                  ${"light"===this._theme?V`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                      </svg>`:V`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                      </svg>`}
                </button>`:I}

            <div class="actions-slot ${this._hasActionsSlot?"":"hidden"}">
              <slot name="actions" @slotchange=${this._onActionsSlot}></slot>
            </div>
          </div>
        </header>
      </div>
    `}};tD.styles=[el.baseStyles,o`
      :host {
        display: block;
      }

      /* Pilule centrée, largeur contenue (même gabarit que kady-hero). */
      .shell {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--kady-space-6);
      }

      :host([sticky]) {
        position: sticky;
        top: var(--kady-space-4);
        z-index: 100;
      }

      .pill {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--kady-space-4);
        padding: var(--kady-space-2) var(--kady-space-6);
        border-radius: 9999px;
        border: 1px solid var(--kady-line);
        background: color-mix(in srgb, var(--kady-surface) 72%, transparent);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        box-shadow: var(--kady-shadow-sm);
        transition: background var(--kady-transition-base), box-shadow var(--kady-transition-base);
      }

      /* Fond qui se densifie au scroll (sticky). */
      .pill.scrolled {
        background: color-mix(in srgb, var(--kady-surface) 94%, transparent);
        box-shadow: var(--kady-shadow-md);
      }

      .brand-wrap {
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
      }

      .nav {
        display: flex;
        align-items: center;
        min-width: 0;
      }

      .links {
        display: flex;
        align-items: center;
        gap: var(--kady-space-1);
      }

      /* Liens injectés par le consommateur (<a> directs dans le slot). */
      .links ::slotted(a) {
        display: inline-block;
        color: var(--kady-ink-muted);
        text-decoration: none;
        font-size: var(--kady-text-sm);
        font-weight: 500;
        padding: var(--kady-space-2) var(--kady-space-4);
        border-radius: 9999px;
        transition: color var(--kady-transition-fast), background var(--kady-transition-fast);
      }
      .links ::slotted(a:hover) {
        color: var(--kady-ink);
        background: color-mix(in srgb, var(--kady-primary) 8%, transparent);
      }
      .links ::slotted(a[aria-current="page"]) {
        color: var(--kady-accent);
      }
      .links ::slotted(a:focus-visible) {
        outline: var(--kady-focus-ring);
        outline-offset: 2px;
      }

      /* Liens générés depuis la propriété "links". */
      .link {
        display: inline-block;
        color: var(--kady-ink-muted);
        text-decoration: none;
        font-size: var(--kady-text-sm);
        font-weight: 500;
        padding: var(--kady-space-2) var(--kady-space-4);
        border-radius: 9999px;
        transition: color var(--kady-transition-fast), background var(--kady-transition-fast);
      }
      .link:hover {
        color: var(--kady-ink);
        background: color-mix(in srgb, var(--kady-primary) 8%, transparent);
      }
      .link:focus-visible {
        outline: var(--kady-focus-ring);
        outline-offset: 2px;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: var(--kady-space-3);
        flex-shrink: 0;
      }

      .actions-slot {
        display: inline-flex;
        align-items: center;
        gap: var(--kady-space-2);
      }

      /* Pastille thème : ronde, teinte primaire, comme la source Karulab. */
      .theme-toggle,
      .burger {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.35rem;
        height: 2.35rem;
        border-radius: 50%;
        background: color-mix(in srgb, var(--kady-primary) 10%, transparent);
        border: 1px solid var(--kady-line);
        color: var(--kady-ink);
        cursor: pointer;
        flex-shrink: 0;
        box-sizing: border-box;
        transition: background var(--kady-transition-base), border-color var(--kady-transition-base),
          transform var(--kady-transition-base);
      }
      .theme-toggle:hover {
        background: color-mix(in srgb, var(--kady-primary) 20%, transparent);
        border-color: var(--kady-primary);
        transform: scale(1.08) rotate(12deg);
      }
      .burger:hover {
        background: color-mix(in srgb, var(--kady-primary) 20%, transparent);
        border-color: var(--kady-primary);
      }
      .theme-toggle:focus-visible,
      .burger:focus-visible {
        outline: var(--kady-focus-ring);
        outline-offset: 2px;
      }

      .burger {
        display: none;
      }

      @keyframes kady-navbar-drop {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Mobile : les liens passent en tiroir sous la barre. */
      @media (max-width: 767px) {
        .shell {
          padding: 0 var(--kady-space-3);
        }
        .pill {
          padding: var(--kady-space-2) var(--kady-space-4);
        }
        .burger {
          display: inline-flex;
        }
        .links {
          display: none;
          position: absolute;
          top: calc(100% + var(--kady-space-2));
          left: var(--kady-space-3);
          right: var(--kady-space-3);
          flex-direction: column;
          align-items: stretch;
          gap: var(--kady-space-1);
          padding: var(--kady-space-3);
          background: color-mix(in srgb, var(--kady-surface) 94%, transparent);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--kady-line);
          border-radius: var(--kady-radius-lg);
          box-shadow: var(--kady-shadow-md);
        }
        .links.open {
          display: flex;
          animation: kady-navbar-drop var(--kady-transition-base);
        }
        .links ::slotted(a),
        .link {
          padding: var(--kady-space-3) var(--kady-space-4);
          border-radius: var(--kady-radius-md);
          font-size: var(--kady-text-base);
        }
      }

      /* Après les règles display pour que la cascade gagne (convention kady-hero). */
      .hidden {
        display: none;
      }
    `],tH([eh({type:Boolean,reflect:!0})],tD.prototype,"sticky",2),tH([eh({type:Boolean,reflect:!0,attribute:"theme-toggle"})],tD.prototype,"themeToggle",2),tH([eh({type:Array,converter:function(e){if(!e)return[];try{let t=JSON.parse(e);if(!Array.isArray(t))return[];return t.filter(e=>null!==e&&"object"==typeof e&&"string"==typeof e.href&&"string"==typeof e.label).map(e=>({href:e.href,label:e.label}))}catch{return[]}}})],tD.prototype,"links",2),tH([eh()],tD.prototype,"label",2),tH([ep()],tD.prototype,"_menuOpen",2),tH([ep()],tD.prototype,"_isMobile",2),tH([ep()],tD.prototype,"_scrolled",2),tH([ep()],tD.prototype,"_theme",2),tH([ep()],tD.prototype,"_hasBrandSlot",2),tH([ep()],tD.prototype,"_hasActionsSlot",2),tH([ep()],tD.prototype,"_hasDefaultSlot",2),tD=tH([ed("kady-navbar")],tD),e.s(["KadyAlert",0,eF,"KadyAntiSaasCompare",0,tk,"KadyBadge",0,ex,"KadyBoxStatus",0,tt,"KadyButton",0,em,"KadyCard",0,eS,"KadyCtaBand",0,tT,"KadyElement",0,el,"KadyEmptyState",0,e8,"KadyEventTimeline",0,tu,"KadyFeatureGrid",0,tC,"KadyHero",0,t$,"KadyInput",0,eO,"KadyModal",0,eL,"KadyMrrStat",0,td,"KadyNavbar",0,tD,"KadySelect",0,eH,"KadySpinner",0,e4,"KadyTable",0,eQ,"KadyTextarea",0,eB,"KadyToast",0,eJ,"KadyTokenUsageBar",0,ti])}]);