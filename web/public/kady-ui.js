/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a;
const t$2 = globalThis, e$4 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$4 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$4 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$4.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$4.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$4 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), i$3 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$3(o2, t2, s$2);
}, S$1 = (s2, o2) => {
  if (e$4) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$2.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$2 = e$4 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$4(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$2, defineProperty: e$3, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$3, getPrototypeOf: n$2 } = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$1 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f$1 = (t2, s2) => !i$2(t2, s2), b$1 = { attribute: true, type: String, converter: u$1, reflect: false, useDefault: false, hasChanged: f$1 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$1.litPropertyMetadata ?? (a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$1 = class y extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = b$1) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), h2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== h2 && e$3(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const { get: e2, set: r2 } = h$1(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2 == null ? void 0 : e2.call(this);
      r2 == null ? void 0 : r2.call(this, s3), this.requestUpdate(t2, h2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...r$3(t3), ...o$3(t3)];
      for (const i2 of s2) this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i2] of s2) this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i2.unshift(c$2(s3));
    } else void 0 !== s2 && i2.push(c$2(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t2.hostConnected) == null ? void 0 : _a2.call(t2));
  }
  removeController(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys()) this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostConnected) == null ? void 0 : _a3.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostDisconnected) == null ? void 0 : _a3.call(t2);
    });
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$ET(t2, s2) {
    var _a2;
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const h2 = (void 0 !== ((_a2 = i2.converter) == null ? void 0 : _a2.toAttribute) ? i2.converter : u$1).toAttribute(s2, i2.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a2, _b;
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u$1;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? ((_b = this._$Ej) == null ? void 0 : _b.get(e2)) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2, e2 = false, h2) {
    var _a2;
    if (void 0 !== t2) {
      const r2 = this.constructor;
      if (false === e2 && (h2 = this[t2]), i2 ?? (i2 = r2.getPropertyOptions(t2)), !((i2.hasChanged ?? f$1)(h2, s2) || i2.useDefault && i2.reflect && h2 === ((_a2 = this._$Ej) == null ? void 0 : _a2.get(t2)) && !this.hasAttribute(r2._$Eu(t2, i2)))) return;
      this.C(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i2, reflect: e2, wrapped: h2 }, r2) {
    i2 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i2 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i2] of t3) {
        const { wrapped: t4 } = i2, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i2, e2);
      }
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
        var _a3;
        return (_a3 = t3.hostUpdate) == null ? void 0 : _a3.call(t3);
      }), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t2 = false, this._$EM(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
      var _a3;
      return (_a3 = t3.hostUpdated) == null ? void 0 : _a3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t3) => this._$ET(t3, this[t3]))), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1 == null ? void 0 : p$1({ ReactiveElement: y$1 }), (a$1.reactiveElementVersions ?? (a$1.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = globalThis, i$1 = (t2) => t2, s$1 = t$1.trustedTypes, e$2 = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h = "$lit$", o$2 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$1 = "?" + o$2, r$2 = `<${n$1}>`, l = document, c = () => l.createComment(""), a = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u = Array.isArray, d = (t2) => u(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), f = "[ 	\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), b = x(1), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l.createTreeWalker(l, 129);
function V(t2, i2) {
  if (!u(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e$2 ? e$2.createHTML(i2) : i2;
}
const N = (t2, i2) => {
  const s2 = t2.length - 1, e2 = [];
  let n3, l2 = 2 === i2 ? "<svg>" : 3 === i2 ? "<math>" : "", c2 = v;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p) : void 0 !== u2[3] && (c2 = p) : c2 === p ? ">" === u2[0] ? (c2 = n3 ?? v, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p : c2 === _ || c2 === m ? c2 = v : (c2 = p, n3 = void 0);
    const x2 = c2 === p && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v ? s3 + r$2 : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h + s3.slice(d2) + o$2 + x2) : s3 + o$2 + (-2 === d2 ? i3 : x2);
  }
  return [V(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : 3 === i2 ? "</math>" : "")), e2];
};
class S {
  constructor({ strings: t2, _$litType$: i2 }, e2) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = N(t2, i2);
    if (this.el = S.createElement(f2, e2), P.currentNode = this.el.content, 2 === i2 || 3 === i2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h)) {
          const i3 = v2[a2++], s2 = r2.getAttribute(t3).split(o$2), e3 = /([.?@])?(.*)/.exec(i3);
          d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I : "?" === e3[1] ? L : "@" === e3[1] ? z : H }), r2.removeAttribute(t3);
        } else t3.startsWith(o$2) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
        if (y2.test(r2.tagName)) {
          const t3 = r2.textContent.split(o$2), i3 = t3.length - 1;
          if (i3 > 0) {
            r2.textContent = s$1 ? s$1.emptyScript : "";
            for (let s2 = 0; s2 < i3; s2++) r2.append(t3[s2], c()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t3[i3], c());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n$1) d2.push({ type: 2, index: l2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(o$2, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$2.length - 1;
      }
      l2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function M(t2, i2, s2 = t2, e2) {
  var _a2, _b;
  if (i2 === E) return i2;
  let h2 = void 0 !== e2 ? (_a2 = s2._$Co) == null ? void 0 : _a2[e2] : s2._$Cl;
  const o2 = a(i2) ? void 0 : i2._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = M(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
class R {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? l).importNode(i2, true);
    P.currentNode = e2;
    let h2 = P.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i3;
        2 === r2.type ? i3 = new k(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i3 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i3 = new Z(h2, this, t2)), this._$AV.push(i3), r2 = s2[++n3];
      }
      o2 !== (r2 == null ? void 0 : r2.index) && (h2 = P.nextNode(), o2++);
    }
    return P.currentNode = l, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class k {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = M(this, t2, i2), a(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(l.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a2;
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2) this._$AH.p(i2);
    else {
      const t3 = new R(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = C.get(t2.strings);
    return void 0 === i2 && C.set(t2.strings, i2 = new S(t2)), i2;
  }
  k(t2) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i2.length ? i2.push(s2 = new k(this.O(c()), this.O(c()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, s2) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, s2); t2 !== this._$AB; ) {
      const s3 = i$1(t2).nextSibling;
      i$1(t2).remove(), t2 = s3;
    }
  }
  setConnected(t2) {
    var _a2;
    void 0 === this._$AM && (this._$Cv = t2, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t2));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = M(this, t2, i2, 0), o2 = !a(t2) || t2 !== this._$AH && t2 !== E, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = M(this, e3[s2 + n3], i2, n3), r2 === E && (r2 = this._$AH[n3]), o2 || (o2 = !a(r2) || r2 !== this._$AH[n3]), r2 === A ? t2 = A : t2 !== A && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== A);
  }
}
class z extends H {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = M(this, t2, i2, 0) ?? A) === E) return;
    const s2 = this._$AH, e2 = t2 === A && s2 !== A || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== A && (s2 === A || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    M(this, t2);
  }
}
const B = t$1.litHtmlPolyfillSupport;
B == null ? void 0 : B(S, k), (t$1.litHtmlVersions ?? (t$1.litHtmlVersions = [])).push("3.3.3");
const D = (t2, i2, s2) => {
  const e2 = (s2 == null ? void 0 : s2.renderBefore) ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e2._$litPart$ = h2 = new k(i2.insertBefore(c(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s = globalThis;
class i extends y$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t2 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = D(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(false);
  }
  render() {
    return E;
  }
}
i._$litElement$ = true, i["finalized"] = true, (_a = s.litElementHydrateSupport) == null ? void 0 : _a.call(s, { LitElement: i });
const o$1 = s.litElementPolyfillSupport;
o$1 == null ? void 0 : o$1({ LitElement: i });
(s.litElementVersions ?? (s.litElementVersions = [])).push("4.2.2");
const _KadyElement = class _KadyElement extends i {
  /**
   * Émet un événement CustomEvent préfixé par 'kady-', avec bulles et passage
   * de la frontière du Shadow DOM (composed: true) pour une intégration native
   * avec HTMX (hx-trigger) et les écouteurs du document.
   *
   * @param name Nom de l'événement (préfixé automatiquement par 'kady-' si omis)
   * @param detail Données associées à l'événement
   * @param bubbles Indique si l'événement bouillonne dans l'arbre DOM (défaut: true)
   */
  emitEvent(name, detail, bubbles = true) {
    const eventName = name.startsWith("kady-") ? name : `kady-${name}`;
    return this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles,
        composed: true,
        cancelable: true,
        detail
      })
    );
  }
  /**
   * Vérifie si un slot nommé ou le slot par défaut possède du contenu dans le Light DOM.
   */
  hasSlotContent(name) {
    if (name) {
      return Array.from(this.children).some((el) => el.getAttribute("slot") === name);
    }
    return Array.from(this.childNodes).some((node) => {
      var _a2;
      if (node.nodeType === Node.TEXT_NODE) {
        return Boolean((_a2 = node.textContent) == null ? void 0 : _a2.trim());
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        return !node.hasAttribute("slot");
      }
      return false;
    });
  }
  /**
   * À utiliser dans un gestionnaire `@slotchange` : indique si le slot émetteur
   * possède du contenu réellement assigné dans le Light DOM.
   *
   * - Le contenu de repli (fallback) du <slot> est exclu (pas de `flatten`),
   *   afin que le repli via attribut content reste prioritaire sur un slot vide.
   * - Les nœuds de texte purement whitespace (indentation HTML) sont ignorés.
   */
  slotHasAssignedContent(e2) {
    const slot = e2.target;
    return slot.assignedNodes().some((node) => {
      var _a2;
      if (node.nodeType === Node.TEXT_NODE) {
        return Boolean((_a2 = node.textContent) == null ? void 0 : _a2.trim());
      }
      return node.nodeType === Node.ELEMENT_NODE;
    });
  }
};
_KadyElement.baseStyles = i$3`
    :host {
      box-sizing: border-box;
      font-family: var(--kady-font-body);
      color: var(--kady-ink);
    }
    *, *::before, *::after {
      box-sizing: border-box;
    }
  `;
let KadyElement = _KadyElement;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 }, r$1 = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$1(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r(r2) {
  return n2({ ...r2, state: true, attribute: false });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1 = (e2, t2, c2) => (c2.configurable = true, c2.enumerable = true, Reflect.decorate && "object" != typeof t2 && Object.defineProperty(e2, t2, c2), c2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e2, r2) {
  return (n3, s2, i2) => {
    const o2 = (t2) => {
      var _a2;
      return ((_a2 = t2.renderRoot) == null ? void 0 : _a2.querySelector(e2)) ?? null;
    };
    return e$1(n3, s2, { get() {
      return o2(this);
    } });
  };
}
var __defProp$k = Object.defineProperty;
var __getOwnPropDesc$k = Object.getOwnPropertyDescriptor;
var __decorateClass$k = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$k(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$k(target, key, result);
  return result;
};
let KadyButton = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.variant = "primary";
    this.disabled = false;
    this.type = "button";
  }
  emit(e2) {
    if (this.disabled) {
      e2.preventDefault();
      e2.stopImmediatePropagation();
      return;
    }
    const detail = {
      name: this.name,
      value: this.value,
      variant: this.variant,
      type: this.type,
      href: this.href,
      originalEvent: e2
    };
    this.emitEvent("click", detail);
    if (this.type === "submit") {
      const form = this.closest("form");
      if (form && !e2.defaultPrevented) {
        form.requestSubmit();
      }
    }
  }
  render() {
    const cls = `btn ${this.variant}`;
    if (this.href && !this.disabled) {
      return b`<a
        class=${cls}
        href=${this.href}
        role="button"
        @click=${this.emit}
      >
        <slot></slot>
      </a>`;
    }
    return b`<button
      class=${cls}
      type=${this.type}
      name=${this.name ?? ""}
      value=${this.value ?? ""}
      ?disabled=${this.disabled}
      @click=${this.emit}
    >
      <slot></slot>
    </button>`;
  }
};
KadyButton.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$k([
  n2()
], KadyButton.prototype, "variant", 2);
__decorateClass$k([
  n2({ type: Boolean, reflect: true })
], KadyButton.prototype, "disabled", 2);
__decorateClass$k([
  n2()
], KadyButton.prototype, "href", 2);
__decorateClass$k([
  n2()
], KadyButton.prototype, "name", 2);
__decorateClass$k([
  n2()
], KadyButton.prototype, "value", 2);
__decorateClass$k([
  n2()
], KadyButton.prototype, "type", 2);
KadyButton = __decorateClass$k([
  t("kady-button")
], KadyButton);
var __defProp$j = Object.defineProperty;
var __getOwnPropDesc$j = Object.getOwnPropertyDescriptor;
var __decorateClass$j = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$j(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$j(target, key, result);
  return result;
};
let KadyBadge = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.variant = "neutral";
    this.size = "sm";
    this.dot = false;
  }
  render() {
    const cls = `badge size-${this.size} ${this.variant}`;
    return b`
      <span class=${cls}>
        ${this.dot ? b`<span class="dot" aria-hidden="true"></span>` : null}
        <slot></slot>
      </span>
    `;
  }
};
KadyBadge.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$j([
  n2()
], KadyBadge.prototype, "variant", 2);
__decorateClass$j([
  n2()
], KadyBadge.prototype, "size", 2);
__decorateClass$j([
  n2({ type: Boolean })
], KadyBadge.prototype, "dot", 2);
KadyBadge = __decorateClass$j([
  t("kady-badge")
], KadyBadge);
var __defProp$i = Object.defineProperty;
var __getOwnPropDesc$i = Object.getOwnPropertyDescriptor;
var __decorateClass$i = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$i(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$i(target, key, result);
  return result;
};
let KadyCard = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.variant = "default";
    this._hasHeader = false;
    this._hasFooter = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this._hasHeader = this.hasSlotContent("header");
    this._hasFooter = this.hasSlotContent("footer");
  }
  handleClick(e2) {
    if (this.variant !== "interactive") return;
    for (const node of e2.composedPath()) {
      if (node === this) break;
      if (node instanceof Element && node.matches(KadyCard.INTERACTIVE_SELECTOR)) return;
    }
    this.emitEvent("click", { originalEvent: e2 });
  }
  /** Accessibilité clavier : Enter/Espace sur la carte interactive = clic. */
  handleKeydown(e2) {
    if (this.variant !== "interactive") return;
    if (e2.key === "Enter" || e2.key === " " || e2.key === "Spacebar") {
      e2.preventDefault();
      this.emitEvent("click", { originalEvent: e2 });
    }
  }
  handleHeaderSlotChange(e2) {
    this._hasHeader = this.slotHasAssignedContent(e2);
  }
  handleFooterSlotChange(e2) {
    this._hasFooter = this.slotHasAssignedContent(e2);
  }
  render() {
    const cls = `card variant-${this.variant}`;
    return b`
      <div
        class=${cls}
        tabindex=${this.variant === "interactive" ? "0" : "-1"}
        role=${this.variant === "interactive" ? "button" : "region"}
        @click=${this.handleClick}
        @keydown=${this.handleKeydown}
      >
        <div class="header ${this._hasHeader ? "" : "hidden"}">
          <slot name="header" @slotchange=${this.handleHeaderSlotChange}></slot>
        </div>
        <div class="body">
          <slot></slot>
        </div>
        <div class="footer ${this._hasFooter ? "" : "hidden"}">
          <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
        </div>
      </div>
    `;
  }
};
KadyCard.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
KadyCard.INTERACTIVE_SELECTOR = "a[href], button, input, select, textarea, kady-button, [role='button']";
__decorateClass$i([
  n2()
], KadyCard.prototype, "variant", 2);
__decorateClass$i([
  r()
], KadyCard.prototype, "_hasHeader", 2);
__decorateClass$i([
  r()
], KadyCard.prototype, "_hasFooter", 2);
KadyCard = __decorateClass$i([
  t("kady-card")
], KadyCard);
var __defProp$h = Object.defineProperty;
var __getOwnPropDesc$h = Object.getOwnPropertyDescriptor;
var __decorateClass$h = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$h(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$h(target, key, result);
  return result;
};
let KadyInput = class extends KadyElement {
  constructor() {
    var _a2;
    super();
    this.label = "";
    this.placeholder = "";
    this.error = "";
    this.type = "text";
    this.disabled = false;
    this.required = false;
    this.name = "";
    this._value = "";
    this._defaultValue = "";
    this._hasDefault = false;
    this._hasLabelSlot = false;
    this._hasErrorSlot = false;
    this.internals = this.attachInternals();
    this.fieldId = `kady-input-${((_a2 = crypto.randomUUID) == null ? void 0 : _a2.call(crypto)) ?? Math.random().toString(36).slice(2)}`;
  }
  get value() {
    return this._value;
  }
  set value(newValue) {
    const old = this._value;
    if (old === newValue) return;
    this._value = newValue;
    this.requestUpdate("value", old);
    this.internals.setFormValue(newValue);
    this._updateValidity();
  }
  /** Formulaire ancêtre natif (null si le composant est hors formulaire). */
  get form() {
    return this.internals.form;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this._hasDefault) {
      this._hasDefault = true;
      this._defaultValue = this.value;
    }
    this.internals.setFormValue(this.value);
    this._updateValidity();
  }
  /** Restaure la valeur par défaut initiale lors d'un <form reset> natif. */
  formResetCallback() {
    this.value = this._defaultValue;
  }
  /** Reflète l'état disabled propagé par le <form>/<fieldset> parent. */
  formDisabledCallback(disabled) {
    this.disabled = disabled;
  }
  /**
   * Pilote la validité de bout en bout : un champ requis vide bloque le submit
   * natif du <form> (message d'ancrage sur l'input interne).
   */
  _updateValidity() {
    var _a2;
    const inputEl = ((_a2 = this.renderRoot) == null ? void 0 : _a2.querySelector("input")) ?? void 0;
    if (this.required && !this.value) {
      this.internals.setValidity({ valueMissing: true }, "Champ requis", inputEl);
    } else {
      this.internals.setValidity({});
    }
  }
  updated() {
    this._updateValidity();
  }
  handleInput(e2) {
    const target = e2.target;
    this.value = target.value;
    this.emitEvent("input", { value: this.value, name: this.name });
  }
  handleChange(e2) {
    const target = e2.target;
    this.value = target.value;
    this.emitEvent("change", { value: this.value, name: this.name });
  }
  handleLabelSlotChange(e2) {
    this._hasLabelSlot = this.slotHasAssignedContent(e2);
  }
  handleErrorSlotChange(e2) {
    this._hasErrorSlot = this.slotHasAssignedContent(e2);
  }
  render() {
    const hasError = Boolean(this.error && this.error.trim().length > 0);
    const fieldCls = `field ${hasError ? "has-error" : ""}`;
    const showLabel = Boolean(this.label) || this._hasLabelSlot;
    const showError = hasError || this._hasErrorSlot;
    return b`
      <div class=${fieldCls}>
        <div class="label-wrapper ${showLabel ? "" : "hidden"}">
          <slot name="label" @slotchange=${this.handleLabelSlotChange}>
            <label class="label" for=${this.fieldId}>
              ${this.label}
              ${this.required ? b`<span class="required-marker" aria-hidden="true">*</span>` : null}
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
            aria-label=${this.label || null}
            @input=${this.handleInput}
            @change=${this.handleChange}
            aria-invalid=${hasError ? "true" : "false"}
          />
          <div class="suffix">
            <slot name="suffix"></slot>
          </div>
        </div>

        <div class="error-wrapper ${showError ? "" : "hidden"}">
          <slot name="error" @slotchange=${this.handleErrorSlotChange}>
            <span class="error-text" role="alert">${this.error}</span>
          </slot>
        </div>
      </div>
    `;
  }
};
KadyInput.formAssociated = true;
KadyInput.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$h([
  n2()
], KadyInput.prototype, "label", 2);
__decorateClass$h([
  n2()
], KadyInput.prototype, "placeholder", 2);
__decorateClass$h([
  n2()
], KadyInput.prototype, "error", 2);
__decorateClass$h([
  n2()
], KadyInput.prototype, "type", 2);
__decorateClass$h([
  n2({ type: Boolean, reflect: true })
], KadyInput.prototype, "disabled", 2);
__decorateClass$h([
  n2({ type: Boolean })
], KadyInput.prototype, "required", 2);
__decorateClass$h([
  n2()
], KadyInput.prototype, "name", 2);
__decorateClass$h([
  r()
], KadyInput.prototype, "_hasLabelSlot", 2);
__decorateClass$h([
  r()
], KadyInput.prototype, "_hasErrorSlot", 2);
__decorateClass$h([
  n2()
], KadyInput.prototype, "value", 1);
KadyInput = __decorateClass$h([
  t("kady-input")
], KadyInput);
var __defProp$g = Object.defineProperty;
var __getOwnPropDesc$g = Object.getOwnPropertyDescriptor;
var __decorateClass$g = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$g(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$g(target, key, result);
  return result;
};
const jsonListConverter$2 = {
  type: Array,
  attribute: true,
  converter: {
    fromAttribute: (value) => {
      if (value === null) return [];
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
  }
};
let KadySelect = class extends KadyElement {
  constructor() {
    var _a2;
    super();
    this.label = "";
    this.options = [];
    this.placeholder = "";
    this.error = "";
    this.disabled = false;
    this.required = false;
    this.name = "";
    this._value = "";
    this._defaultValue = "";
    this._hasDefault = false;
    this._slottedOptions = [];
    this._hasLabelSlot = false;
    this._hasErrorSlot = false;
    this.internals = this.attachInternals();
    this.fieldId = `kady-select-${((_a2 = crypto.randomUUID) == null ? void 0 : _a2.call(crypto)) ?? Math.random().toString(36).slice(2)}`;
  }
  get value() {
    return this._value;
  }
  set value(newValue) {
    const old = this._value;
    if (old === newValue) return;
    this._value = newValue;
    this.requestUpdate("value", old);
    this.internals.setFormValue(newValue);
    this._updateValidity();
  }
  /** Formulaire ancêtre natif (null si le composant est hors formulaire). */
  get form() {
    return this.internals.form;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this._hasDefault) {
      this._hasDefault = true;
      this._defaultValue = this.value;
    }
    this.internals.setFormValue(this.value);
    this._updateValidity();
  }
  /** Restaure la valeur par défaut initiale lors d'un <form reset> natif. */
  formResetCallback() {
    this.value = this._defaultValue;
  }
  /** Reflète l'état disabled propagé par le <form>/<fieldset> parent. */
  formDisabledCallback(disabled) {
    this.disabled = disabled;
  }
  /**
   * Pilote la validité de bout en bout : un champ requis vide bloque le submit
   * natif du <form> (message d'ancrage sur le <select> interne).
   */
  _updateValidity() {
    var _a2;
    const selectEl = ((_a2 = this.renderRoot) == null ? void 0 : _a2.querySelector("select")) ?? void 0;
    if (this.required && !this.value) {
      this.internals.setValidity({ valueMissing: true }, "Champ requis", selectEl);
    } else {
      this.internals.setValidity({});
    }
  }
  updated() {
    this._updateValidity();
  }
  get parsedOptions() {
    return this.options && this.options.length > 0 ? this.options : this._slottedOptions;
  }
  handleSlotChange(e2) {
    const slot = e2.target;
    const nodes = slot.assignedElements({ flatten: true });
    const extracted = [];
    for (const el of nodes) {
      if (el.tagName.toLowerCase() === "option") {
        const opt = el;
        extracted.push({
          value: opt.value,
          label: opt.textContent || opt.value,
          disabled: opt.disabled
        });
      }
    }
    this._slottedOptions = extracted;
  }
  handleChange(e2) {
    const target = e2.target;
    this.value = target.value;
    this.emitEvent("change", { value: this.value, name: this.name });
  }
  handleLabelSlotChange(e2) {
    this._hasLabelSlot = this.slotHasAssignedContent(e2);
  }
  handleErrorSlotChange(e2) {
    this._hasErrorSlot = this.slotHasAssignedContent(e2);
  }
  render() {
    const hasError = Boolean(this.error && this.error.trim().length > 0);
    const fieldCls = `field ${hasError ? "has-error" : ""}`;
    const opts = this.parsedOptions;
    const showLabel = Boolean(this.label) || this._hasLabelSlot;
    const showError = hasError || this._hasErrorSlot;
    return b`
      <div class=${fieldCls}>
        <div class="label-wrapper ${showLabel ? "" : "hidden"}">
          <slot name="label" @slotchange=${this.handleLabelSlotChange}>
            <label class="label" for=${this.fieldId}>
              ${this.label}
              ${this.required ? b`<span class="required-marker" aria-hidden="true">*</span>` : null}
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
            aria-label=${this.label || null}
            @change=${this.handleChange}
            aria-invalid=${hasError ? "true" : "false"}
          >
            ${this.placeholder ? b`<option value="" disabled ?selected=${!this.value}>${this.placeholder}</option>` : null}
            ${opts.map(
      (opt) => b`
                <option
                  value=${opt.value}
                  ?selected=${opt.value === this.value}
                  ?disabled=${opt.disabled}
                >
                  ${opt.label}
                </option>
              `
    )}
          </select>
          <span class="chevron" aria-hidden="true"></span>
        </div>
        <div class="error-wrapper ${showError ? "" : "hidden"}">
          <slot name="error" @slotchange=${this.handleErrorSlotChange}>
            <span class="error-text" role="alert">${this.error}</span>
          </slot>
        </div>
        <div class="slotted-source">
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
};
KadySelect.formAssociated = true;
KadySelect.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$g([
  n2()
], KadySelect.prototype, "label", 2);
__decorateClass$g([
  n2(jsonListConverter$2)
], KadySelect.prototype, "options", 2);
__decorateClass$g([
  n2()
], KadySelect.prototype, "placeholder", 2);
__decorateClass$g([
  n2()
], KadySelect.prototype, "error", 2);
__decorateClass$g([
  n2({ type: Boolean, reflect: true })
], KadySelect.prototype, "disabled", 2);
__decorateClass$g([
  n2({ type: Boolean })
], KadySelect.prototype, "required", 2);
__decorateClass$g([
  n2()
], KadySelect.prototype, "name", 2);
__decorateClass$g([
  r()
], KadySelect.prototype, "_slottedOptions", 2);
__decorateClass$g([
  r()
], KadySelect.prototype, "_hasLabelSlot", 2);
__decorateClass$g([
  r()
], KadySelect.prototype, "_hasErrorSlot", 2);
__decorateClass$g([
  n2()
], KadySelect.prototype, "value", 1);
KadySelect = __decorateClass$g([
  t("kady-select")
], KadySelect);
var __defProp$f = Object.defineProperty;
var __getOwnPropDesc$f = Object.getOwnPropertyDescriptor;
var __decorateClass$f = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$f(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$f(target, key, result);
  return result;
};
let KadyTextarea = class extends KadyElement {
  constructor() {
    var _a2;
    super();
    this.label = "";
    this.placeholder = "";
    this.error = "";
    this.rows = 4;
    this.resize = "vertical";
    this.disabled = false;
    this.required = false;
    this.name = "";
    this._value = "";
    this._defaultValue = "";
    this._hasDefault = false;
    this._hasLabelSlot = false;
    this._hasErrorSlot = false;
    this._hasHelperSlot = false;
    this.internals = this.attachInternals();
    this.fieldId = `kady-textarea-${((_a2 = crypto.randomUUID) == null ? void 0 : _a2.call(crypto)) ?? Math.random().toString(36).slice(2)}`;
  }
  get value() {
    return this._value;
  }
  set value(newValue) {
    const old = this._value;
    if (old === newValue) return;
    this._value = newValue;
    this.requestUpdate("value", old);
    this.internals.setFormValue(newValue);
    this._updateValidity();
  }
  /** Formulaire ancêtre natif (null si le composant est hors formulaire). */
  get form() {
    return this.internals.form;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this._hasDefault) {
      this._hasDefault = true;
      this._defaultValue = this.value;
    }
    this.internals.setFormValue(this.value);
    this._updateValidity();
  }
  /** Restaure la valeur par défaut initiale lors d'un <form reset> natif. */
  formResetCallback() {
    this.value = this._defaultValue;
  }
  /** Reflète l'état disabled propagé par le <form>/<fieldset> parent. */
  formDisabledCallback(disabled) {
    this.disabled = disabled;
  }
  _updateValidity() {
    var _a2;
    const textareaEl = ((_a2 = this.renderRoot) == null ? void 0 : _a2.querySelector("textarea")) ?? void 0;
    if (this.required && !this.value) {
      this.internals.setValidity({ valueMissing: true }, "Champ requis", textareaEl);
    } else {
      this.internals.setValidity({});
    }
  }
  updated() {
    this._updateValidity();
  }
  handleInput(e2) {
    const target = e2.target;
    this.value = target.value;
    this.emitEvent("input", { value: this.value, name: this.name });
  }
  handleChange(e2) {
    const target = e2.target;
    this.value = target.value;
    this.emitEvent("change", { value: this.value, name: this.name });
  }
  handleLabelSlotChange(e2) {
    this._hasLabelSlot = this.slotHasAssignedContent(e2);
  }
  handleErrorSlotChange(e2) {
    this._hasErrorSlot = this.slotHasAssignedContent(e2);
  }
  handleHelperSlotChange(e2) {
    this._hasHelperSlot = this.slotHasAssignedContent(e2);
  }
  render() {
    const hasError = Boolean(this.error && this.error.trim().length > 0);
    const fieldCls = `field ${hasError ? "has-error" : ""}`;
    const showLabel = Boolean(this.label) || this._hasLabelSlot;
    const showError = hasError || this._hasErrorSlot;
    const showBottom = showError || this._hasHelperSlot;
    return b`
      <div class=${fieldCls}>
        <div class="label-wrapper ${showLabel ? "" : "hidden"}">
          <slot name="label" @slotchange=${this.handleLabelSlotChange}>
            <label class="label" for=${this.fieldId}>
              ${this.label}
              ${this.required ? b`<span class="required-marker" aria-hidden="true">*</span>` : null}
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
            aria-label=${this.label || null}
            @input=${this.handleInput}
            @change=${this.handleChange}
            aria-invalid=${hasError ? "true" : "false"}
          ></textarea>
        </div>

        <div class="bottom-bar ${showBottom ? "" : "hidden"}">
          <div class="error-wrapper ${showError ? "" : "hidden"}">
            <slot name="error" @slotchange=${this.handleErrorSlotChange}>
              <span class="error-text" role="alert">${this.error}</span>
            </slot>
          </div>
          <div class="helper-wrapper ${this._hasHelperSlot ? "" : "hidden"}">
            <slot name="helper" @slotchange=${this.handleHelperSlotChange}></slot>
          </div>
        </div>
      </div>
    `;
  }
};
KadyTextarea.formAssociated = true;
KadyTextarea.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$f([
  n2()
], KadyTextarea.prototype, "label", 2);
__decorateClass$f([
  n2()
], KadyTextarea.prototype, "placeholder", 2);
__decorateClass$f([
  n2()
], KadyTextarea.prototype, "error", 2);
__decorateClass$f([
  n2({ type: Number })
], KadyTextarea.prototype, "rows", 2);
__decorateClass$f([
  n2()
], KadyTextarea.prototype, "resize", 2);
__decorateClass$f([
  n2({ type: Boolean, reflect: true })
], KadyTextarea.prototype, "disabled", 2);
__decorateClass$f([
  n2({ type: Boolean })
], KadyTextarea.prototype, "required", 2);
__decorateClass$f([
  n2()
], KadyTextarea.prototype, "name", 2);
__decorateClass$f([
  r()
], KadyTextarea.prototype, "_hasLabelSlot", 2);
__decorateClass$f([
  r()
], KadyTextarea.prototype, "_hasErrorSlot", 2);
__decorateClass$f([
  r()
], KadyTextarea.prototype, "_hasHelperSlot", 2);
__decorateClass$f([
  n2()
], KadyTextarea.prototype, "value", 1);
KadyTextarea = __decorateClass$f([
  t("kady-textarea")
], KadyTextarea);
var __defProp$e = Object.defineProperty;
var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
var __decorateClass$e = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$e(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$e(target, key, result);
  return result;
};
let KadyModal = class extends KadyElement {
  constructor() {
    var _a2;
    super();
    this.open = false;
    this.heading = "";
    this.size = "md";
    this.dismissible = true;
    this._hasHeaderSlot = false;
    this._hasFooterSlot = false;
    this._titleId = `kady-modal-${((_a2 = crypto.randomUUID) == null ? void 0 : _a2.call(crypto)) ?? Math.random().toString(36).slice(2)}`;
  }
  firstUpdated() {
    this.syncDialogState();
  }
  updated(changedProps) {
    if (changedProps.has("open")) {
      this.syncDialogState();
    }
  }
  syncDialogState() {
    if (!this.dialogEl) return;
    if (this.open && !this.dialogEl.open) {
      try {
        this.dialogEl.showModal();
        this.emitEvent("open");
      } catch {
      }
    } else if (!this.open && this.dialogEl.open) {
      this.dialogEl.close();
    }
  }
  /** Ouvre le modal nativement via l'API HTMLDialogElement.showModal() */
  showModal() {
    this.open = true;
  }
  /** Ferme le modal avec une valeur optionnelle de retour */
  close(returnValue = "") {
    this.open = false;
    if (this.dialogEl && this.dialogEl.open) {
      this.dialogEl.close(returnValue);
    }
    this.emitEvent("close", { returnValue });
  }
  handleCancel(e2) {
    if (!this.dismissible) {
      e2.preventDefault();
      return;
    }
    this.open = false;
    this.emitEvent("close", { returnValue: "cancel" });
  }
  handleBackdropClick(e2) {
    if (!this.dismissible || !this.dialogEl) return;
    const rect = this.dialogEl.getBoundingClientRect();
    const isInDialog = rect.top <= e2.clientY && e2.clientY <= rect.top + rect.height && rect.left <= e2.clientX && e2.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      this.close("backdrop");
    }
  }
  handleHeaderSlotChange(e2) {
    this._hasHeaderSlot = this.slotHasAssignedContent(e2);
  }
  handleFooterSlotChange(e2) {
    this._hasFooterSlot = this.slotHasAssignedContent(e2);
  }
  render() {
    const showHeader = Boolean(this.heading) || this._hasHeaderSlot;
    return b`
      <dialog
        class="size-${this.size}"
        @cancel=${this.handleCancel}
        @click=${this.handleBackdropClick}
        aria-labelledby=${this._hasHeaderSlot ? A : this._titleId}
      >
        ${showHeader ? b`
              <div class="modal-header">
                <slot name="header" @slotchange=${this.handleHeaderSlotChange}>
                  <h2 id=${this._titleId} class="heading">${this.heading}</h2>
                </slot>
                ${this.dismissible ? b`
                      <button
                        type="button"
                        class="close-btn"
                        @click=${() => this.close("close-button")}
                        aria-label="Fermer le dialogue"
                      >
                        <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    ` : null}
              </div>
            ` : null}

        <div class="modal-body">
          <slot></slot>
        </div>

        <div class="modal-footer ${this._hasFooterSlot ? "" : "hidden"}">
          <slot name="footer" @slotchange=${this.handleFooterSlotChange}></slot>
        </div>
      </dialog>
    `;
  }
};
KadyModal.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$e([
  n2({ type: Boolean, reflect: true })
], KadyModal.prototype, "open", 2);
__decorateClass$e([
  n2()
], KadyModal.prototype, "heading", 2);
__decorateClass$e([
  n2()
], KadyModal.prototype, "size", 2);
__decorateClass$e([
  n2({ type: Boolean })
], KadyModal.prototype, "dismissible", 2);
__decorateClass$e([
  e("dialog")
], KadyModal.prototype, "dialogEl", 2);
__decorateClass$e([
  r()
], KadyModal.prototype, "_hasHeaderSlot", 2);
__decorateClass$e([
  r()
], KadyModal.prototype, "_hasFooterSlot", 2);
KadyModal = __decorateClass$e([
  t("kady-modal")
], KadyModal);
var __defProp$d = Object.defineProperty;
var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
var __decorateClass$d = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$d(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$d(target, key, result);
  return result;
};
let KadyAlert = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.variant = "info";
    this.title = "";
    this.dismissible = false;
    this.open = true;
    this._hasTitleSlot = false;
    this._hasActionSlot = false;
  }
  dismiss() {
    this.open = false;
    this.emitEvent("dismiss");
  }
  renderDefaultIcon() {
    switch (this.variant) {
      case "success":
        return b`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        `;
      case "warning":
        return b`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        `;
      case "danger":
        return b`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        `;
      case "info":
      default:
        return b`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        `;
    }
  }
  render() {
    if (!this.open) return null;
    const showTitle = Boolean(this.title) || this._hasTitleSlot;
    return b`
      <div class="alert variant-${this.variant}" role="alert">
        <div class="icon-wrapper">
          <slot name="icon">
            ${this.renderDefaultIcon()}
          </slot>
        </div>

        <div class="content">
          ${showTitle ? b`
                <div class="title">
                  <slot name="title" @slotchange=${(e2) => this._hasTitleSlot = this.slotHasAssignedContent(e2)}>
                    ${this.title}
                  </slot>
                </div>
              ` : null}
          <div class="body">
            <slot></slot>
          </div>
          <div class="action-wrapper ${this._hasActionSlot ? "" : "hidden"}">
            <slot name="action" @slotchange=${(e2) => this._hasActionSlot = this.slotHasAssignedContent(e2)}></slot>
          </div>
        </div>

        ${this.dismissible ? b`
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
            ` : null}
      </div>
    `;
  }
};
KadyAlert.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$d([
  n2()
], KadyAlert.prototype, "variant", 2);
__decorateClass$d([
  n2()
], KadyAlert.prototype, "title", 2);
__decorateClass$d([
  n2({ type: Boolean })
], KadyAlert.prototype, "dismissible", 2);
__decorateClass$d([
  n2({ type: Boolean, reflect: true })
], KadyAlert.prototype, "open", 2);
__decorateClass$d([
  r()
], KadyAlert.prototype, "_hasTitleSlot", 2);
__decorateClass$d([
  r()
], KadyAlert.prototype, "_hasActionSlot", 2);
KadyAlert = __decorateClass$d([
  t("kady-alert")
], KadyAlert);
var __defProp$c = Object.defineProperty;
var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
var __decorateClass$c = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$c(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$c(target, key, result);
  return result;
};
let KadyToast = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.variant = "info";
    this.message = "";
    this.title = "";
    this.duration = 4e3;
    this.position = "bottom-right";
    this.open = false;
    this.dismissible = true;
    this._hasActionSlot = false;
    this._timer = null;
  }
  connectedCallback() {
    super.connectedCallback();
    this._hasActionSlot = this.hasSlotContent("action");
  }
  handleActionSlotChange(e2) {
    this._hasActionSlot = this.slotHasAssignedContent(e2);
  }
  updated(changedProps) {
    if (changedProps.has("open")) {
      if (this.open) {
        this.startTimer();
      } else {
        this.clearTimer();
      }
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearTimer();
  }
  startTimer() {
    this.clearTimer();
    if (this.duration > 0) {
      this._timer = setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }
  clearTimer() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
  close() {
    this.clearTimer();
    this.open = false;
    this.emitEvent("close");
  }
  show() {
    this.open = true;
  }
  renderIcon() {
    switch (this.variant) {
      case "success":
        return b`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        `;
      case "warning":
        return b`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        `;
      case "danger":
        return b`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        `;
      case "info":
      default:
        return b`
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        `;
    }
  }
  render() {
    return b`
      <div class="toast variant-${this.variant} ${this.open ? "visible" : ""}" role="status" aria-live="polite">
        <div class="icon-wrapper">
          ${this.renderIcon()}
        </div>
        <div class="content">
          ${this.title ? b`<div class="title">${this.title}</div>` : null}
          <div class="body">
            <slot>${this.message}</slot>
          </div>
          <div class="action-wrapper ${this._hasActionSlot ? "" : "hidden"}">
            <slot name="action" @slotchange=${this.handleActionSlotChange}></slot>
          </div>
        </div>
        ${this.dismissible ? b`
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
            ` : null}
      </div>
    `;
  }
};
KadyToast.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$c([
  n2()
], KadyToast.prototype, "variant", 2);
__decorateClass$c([
  n2()
], KadyToast.prototype, "message", 2);
__decorateClass$c([
  n2()
], KadyToast.prototype, "title", 2);
__decorateClass$c([
  n2({ type: Number })
], KadyToast.prototype, "duration", 2);
__decorateClass$c([
  n2({ reflect: true })
], KadyToast.prototype, "position", 2);
__decorateClass$c([
  n2({ type: Boolean, reflect: true })
], KadyToast.prototype, "open", 2);
__decorateClass$c([
  n2({ type: Boolean })
], KadyToast.prototype, "dismissible", 2);
__decorateClass$c([
  r()
], KadyToast.prototype, "_hasActionSlot", 2);
KadyToast = __decorateClass$c([
  t("kady-toast")
], KadyToast);
var __defProp$b = Object.defineProperty;
var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
var __decorateClass$b = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$b(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$b(target, key, result);
  return result;
};
let KadyTable = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.density = "normal";
    this.striped = false;
    this.stickyHeader = false;
    this._hasPaginationSlot = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this._hasPaginationSlot = this.hasSlotContent("pagination");
  }
  handlePaginationSlotChange(e2) {
    this._hasPaginationSlot = this.slotHasAssignedContent(e2);
  }
  render() {
    return b`
      <div class="table-container">
        <slot></slot>
      </div>
      <div class="pagination-bar ${this._hasPaginationSlot ? "" : "hidden"}">
        <slot name="pagination" @slotchange=${this.handlePaginationSlotChange}></slot>
      </div>
    `;
  }
};
KadyTable.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$b([
  n2({ reflect: true })
], KadyTable.prototype, "density", 2);
__decorateClass$b([
  n2({ type: Boolean, reflect: true })
], KadyTable.prototype, "striped", 2);
__decorateClass$b([
  n2({ type: Boolean, reflect: true, attribute: "sticky-header" })
], KadyTable.prototype, "stickyHeader", 2);
__decorateClass$b([
  r()
], KadyTable.prototype, "_hasPaginationSlot", 2);
KadyTable = __decorateClass$b([
  t("kady-table")
], KadyTable);
var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$a(target, key, result);
  return result;
};
let KadySpinner = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.size = "md";
    this.variant = "primary";
    this.label = "Chargement en cours";
  }
  render() {
    return b`
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
    `;
  }
};
KadySpinner.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$a([
  n2()
], KadySpinner.prototype, "size", 2);
__decorateClass$a([
  n2()
], KadySpinner.prototype, "variant", 2);
__decorateClass$a([
  n2()
], KadySpinner.prototype, "label", 2);
KadySpinner = __decorateClass$a([
  t("kady-spinner")
], KadySpinner);
var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$9(target, key, result);
  return result;
};
let KadyEmptyState = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.title = "";
    this.description = "";
    this._hasTitleSlot = false;
    this._hasDescriptionSlot = false;
    this._hasActionSlot = false;
  }
  handleTitleSlotChange(e2) {
    this._hasTitleSlot = this.slotHasAssignedContent(e2);
  }
  handleDescriptionSlotChange(e2) {
    this._hasDescriptionSlot = this.slotHasAssignedContent(e2);
  }
  handleActionSlotChange(e2) {
    this._hasActionSlot = this.slotHasAssignedContent(e2);
  }
  render() {
    const showTitle = Boolean(this.title) || this._hasTitleSlot;
    const showDescription = Boolean(this.description) || this._hasDescriptionSlot;
    return b`
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
          class=${showTitle ? "" : "hidden"}
          @slotchange=${this.handleTitleSlotChange}
        >
          <h3 class="title">${this.title}</h3>
        </slot>

        <slot
          name="description"
          class=${showDescription ? "" : "hidden"}
          @slotchange=${this.handleDescriptionSlotChange}
        >
          <p class="description">${this.description}</p>
        </slot>

        <div class="custom-content">
          <slot></slot>
        </div>

        <div class="action-wrapper ${this._hasActionSlot ? "" : "hidden"}">
          <slot name="action" @slotchange=${this.handleActionSlotChange}></slot>
        </div>
      </div>
    `;
  }
};
KadyEmptyState.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$9([
  n2()
], KadyEmptyState.prototype, "title", 2);
__decorateClass$9([
  n2()
], KadyEmptyState.prototype, "description", 2);
__decorateClass$9([
  r()
], KadyEmptyState.prototype, "_hasTitleSlot", 2);
__decorateClass$9([
  r()
], KadyEmptyState.prototype, "_hasDescriptionSlot", 2);
__decorateClass$9([
  r()
], KadyEmptyState.prototype, "_hasActionSlot", 2);
KadyEmptyState = __decorateClass$9([
  t("kady-empty-state")
], KadyEmptyState);
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$8(target, key, result);
  return result;
};
let KadyBoxStatus = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.hostname = "kady-box-01";
    this.ip = "127.0.0.1";
    this.status = "online";
    this.cpu = "--";
    this.ram = "--";
    this.temp = "--";
    this.uptime = "--";
    this.footerNote = "Nœud HaaS autonome";
  }
  get statusLabel() {
    switch (this.status) {
      case "online":
        return "En ligne";
      case "offline":
        return "Hors ligne";
      case "updating":
        return "Mise à jour";
      case "error":
        return "Erreur matérielle";
      default:
        return this.status;
    }
  }
  get statusVariant() {
    switch (this.status) {
      case "online":
        return "success";
      case "offline":
        return "neutral";
      case "updating":
        return "warning";
      case "error":
        return "danger";
      default:
        return "neutral";
    }
  }
  render() {
    return b`
      <kady-card>
        <div slot="header" class="header-row">
          <div class="title-group">
            <div class="hostname-wrapper">
              <slot name="hostname">
                <h4 class="hostname">${this.hostname}</h4>
              </slot>
              <slot name="status">
                <kady-badge variant=${this.statusVariant} ?dot=${true} size="sm">
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
            ${this.disk !== void 0 ? b`
                  <div class="metric-item">
                    <span class="metric-label">Disque</span>
                    <slot name="disk">
                      <kady-badge variant="neutral" size="sm">${this.disk}</kady-badge>
                    </slot>
                  </div>
                ` : null}
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
    `;
  }
};
KadyBoxStatus.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$8([
  n2()
], KadyBoxStatus.prototype, "hostname", 2);
__decorateClass$8([
  n2()
], KadyBoxStatus.prototype, "ip", 2);
__decorateClass$8([
  n2()
], KadyBoxStatus.prototype, "status", 2);
__decorateClass$8([
  n2()
], KadyBoxStatus.prototype, "cpu", 2);
__decorateClass$8([
  n2()
], KadyBoxStatus.prototype, "ram", 2);
__decorateClass$8([
  n2()
], KadyBoxStatus.prototype, "disk", 2);
__decorateClass$8([
  n2()
], KadyBoxStatus.prototype, "temp", 2);
__decorateClass$8([
  n2()
], KadyBoxStatus.prototype, "uptime", 2);
__decorateClass$8([
  n2()
], KadyBoxStatus.prototype, "footerNote", 2);
KadyBoxStatus = __decorateClass$8([
  t("kady-box-status")
], KadyBoxStatus);
var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$7(target, key, result);
  return result;
};
let KadyTokenUsageBar = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.used = 0;
    this.total = 100;
    this.unit = "tokens";
    this.label = "Consommation de tokens";
    this.warningThreshold = 75;
    this.dangerThreshold = 90;
  }
  get percentage() {
    if (this.total <= 0) return 0;
    const pct = Math.round(this.used / this.total * 100);
    return Math.min(100, Math.max(0, pct));
  }
  get statusClass() {
    const p2 = this.percentage;
    if (p2 >= this.dangerThreshold) return "status-danger";
    if (p2 >= this.warningThreshold) return "status-warning";
    return "status-normal";
  }
  get badgeVariant() {
    const p2 = this.percentage;
    if (p2 >= this.dangerThreshold) return "danger";
    if (p2 >= this.warningThreshold) return "warning";
    return "primary";
  }
  formatNumber(num) {
    return new Intl.NumberFormat("fr-FR").format(num);
  }
  render() {
    const pct = this.percentage;
    const cls = `usage-wrapper ${this.statusClass}`;
    return b`
      <div class=${cls}>
        <div class="header-row">
          <slot name="label">
            <span class="label">${this.label}</span>
          </slot>
          <slot name="percentage">
            <kady-badge variant=${this.badgeVariant} size="sm">${pct}%</kady-badge>
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
          <div class="fill" style="width: ${pct}%;"></div>
        </div>

        <slot name="details">
          <div class="details-row">
            <span>${this.formatNumber(this.used)} ${this.unit} utilisés</span>
            <span>Quota: ${this.formatNumber(this.total)} ${this.unit}</span>
          </div>
        </slot>

        <slot></slot>
      </div>
    `;
  }
};
KadyTokenUsageBar.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$7([
  n2({ type: Number })
], KadyTokenUsageBar.prototype, "used", 2);
__decorateClass$7([
  n2({ type: Number })
], KadyTokenUsageBar.prototype, "total", 2);
__decorateClass$7([
  n2()
], KadyTokenUsageBar.prototype, "unit", 2);
__decorateClass$7([
  n2()
], KadyTokenUsageBar.prototype, "label", 2);
__decorateClass$7([
  n2({ type: Number })
], KadyTokenUsageBar.prototype, "warningThreshold", 2);
__decorateClass$7([
  n2({ type: Number })
], KadyTokenUsageBar.prototype, "dangerThreshold", 2);
KadyTokenUsageBar = __decorateClass$7([
  t("kady-token-usage-bar")
], KadyTokenUsageBar);
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$6(target, key, result);
  return result;
};
let KadyMrrStat = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.value = "0";
    this.currency = "€";
    this.change = "";
    this.label = "MRR Récurrent";
    this.title = "";
    this.period = "vs mois précédent";
    this.subtitle = "";
    this._hasTitleSlot = false;
    this._hasDeltaSlot = false;
    this._hasFooterSlot = false;
  }
  handleTitleSlotChange(e2) {
    this._hasTitleSlot = this.slotHasAssignedContent(e2);
  }
  handleDeltaSlotChange(e2) {
    this._hasDeltaSlot = this.slotHasAssignedContent(e2);
  }
  handleFooterSlotChange(e2) {
    this._hasFooterSlot = this.slotHasAssignedContent(e2);
  }
  get computedChangeType() {
    if (this.changeType) return this.changeType;
    const str = String(this.change).trim();
    if (str.startsWith("+")) return "positive";
    if (str.startsWith("-")) return "negative";
    return "neutral";
  }
  get badgeVariant() {
    const chgType = this.computedChangeType;
    if (chgType === "positive") return "success";
    if (chgType === "negative") return "danger";
    return "neutral";
  }
  formatValue(val) {
    if (typeof val === "number") {
      return new Intl.NumberFormat("fr-FR").format(val);
    }
    return String(val);
  }
  render() {
    const chgType = this.computedChangeType;
    const arrow = chgType === "positive" ? "↑" : chgType === "negative" ? "↓" : "→";
    const titleText = this.title || this.label;
    const showTitle = Boolean(titleText) || this._hasTitleSlot;
    const showFooter = Boolean(this.subtitle) || this._hasFooterSlot;
    const showDelta = Boolean(this.change) || this._hasDeltaSlot;
    return b`
      <kady-card>
        <div
          slot=${showTitle ? "header" : A}
          class="stat-header ${showTitle ? "" : "hidden"}"
        >
          <slot name="title" @slotchange=${this.handleTitleSlotChange}>
            <span class="label">${titleText}</span>
          </slot>
        </div>

        <div class="stat-body">
          <div class="value-row">
            <slot name="value">
              <span class="value">${this.formatValue(this.value)}</span>
              <span class="currency">${this.currency}</span>
            </slot>
          </div>

          <div class="delta-row ${showDelta ? "" : "hidden"}">
            <slot name="delta" @slotchange=${this.handleDeltaSlotChange}>
              <kady-badge variant=${this.badgeVariant} size="sm">
                <span aria-hidden="true">${arrow}</span>
                ${this.change}
              </kady-badge>
              ${this.period ? b`<span class="period">${this.period}</span>` : null}
            </slot>
          </div>

          <slot></slot>
        </div>

        <div
          slot=${showFooter ? "footer" : A}
          class="stat-footer ${showFooter ? "" : "hidden"}"
        >
          <slot name="footer" @slotchange=${this.handleFooterSlotChange}>
            <div class="subtitle">${this.subtitle}</div>
          </slot>
        </div>
      </kady-card>
    `;
  }
};
KadyMrrStat.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$6([
  n2()
], KadyMrrStat.prototype, "value", 2);
__decorateClass$6([
  n2()
], KadyMrrStat.prototype, "currency", 2);
__decorateClass$6([
  n2()
], KadyMrrStat.prototype, "change", 2);
__decorateClass$6([
  n2()
], KadyMrrStat.prototype, "changeType", 2);
__decorateClass$6([
  n2()
], KadyMrrStat.prototype, "label", 2);
__decorateClass$6([
  n2()
], KadyMrrStat.prototype, "title", 2);
__decorateClass$6([
  n2()
], KadyMrrStat.prototype, "period", 2);
__decorateClass$6([
  n2()
], KadyMrrStat.prototype, "subtitle", 2);
__decorateClass$6([
  r()
], KadyMrrStat.prototype, "_hasTitleSlot", 2);
__decorateClass$6([
  r()
], KadyMrrStat.prototype, "_hasDeltaSlot", 2);
__decorateClass$6([
  r()
], KadyMrrStat.prototype, "_hasFooterSlot", 2);
KadyMrrStat = __decorateClass$6([
  t("kady-mrr-stat")
], KadyMrrStat);
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$5(target, key, result);
  return result;
};
const jsonListConverter$1 = {
  type: Array,
  attribute: true,
  converter: {
    fromAttribute: (value) => {
      if (value === null) return [];
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
  }
};
let KadyEventTimeline = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.title = "";
    this.events = [];
    this._hasHeaderSlot = false;
  }
  handleHeaderSlotChange(e2) {
    this._hasHeaderSlot = this.slotHasAssignedContent(e2);
  }
  get parsedEvents() {
    return this.events || [];
  }
  mapStatusToBadge(status) {
    switch (status) {
      case "success":
        return "success";
      case "warning":
        return "warning";
      case "danger":
        return "danger";
      default:
        return "neutral";
    }
  }
  render() {
    const items = this.parsedEvents;
    const showHeader = Boolean(this.title) || this._hasHeaderSlot;
    return b`
      <div class="timeline-wrapper">
        <slot
          name="header"
          class=${showHeader ? "" : "hidden"}
          @slotchange=${this.handleHeaderSlotChange}
        >
          <h4 class="timeline-title">${this.title}</h4>
        </slot>

        <div class="timeline">
          ${items.map(
      (ev) => b`
              <div class="event-item">
                <span class="event-dot dot-${ev.status || "info"}" aria-hidden="true"></span>
                <div class="event-header">
                  <span class="event-title">${ev.title}</span>
                  <span class="event-timestamp">${ev.timestamp}</span>
                  ${ev.badge ? b`<kady-badge variant=${this.mapStatusToBadge(ev.status)} size="sm">${ev.badge}</kady-badge>` : null}
                </div>
                ${ev.description ? b`<p class="event-description">${ev.description}</p>` : null}
              </div>
            `
    )}
          <slot></slot>
        </div>
      </div>
    `;
  }
};
KadyEventTimeline.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$5([
  n2()
], KadyEventTimeline.prototype, "title", 2);
__decorateClass$5([
  n2(jsonListConverter$1)
], KadyEventTimeline.prototype, "events", 2);
__decorateClass$5([
  r()
], KadyEventTimeline.prototype, "_hasHeaderSlot", 2);
KadyEventTimeline = __decorateClass$5([
  t("kady-event-timeline")
], KadyEventTimeline);
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$4(target, key, result);
  return result;
};
function safeCriteriaConverter(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
const DEFAULT_CRITERIA = [
  {
    label: "Résidence des données",
    cloud: "Stockées chez un tiers hébergeur, hors de vos locaux",
    kady: "Stockées et traitées sur votre appliance, dans vos locaux"
  },
  {
    label: "Latence",
    cloud: "Dépendante du réseau public et des clusters distants",
    kady: "Latence locale, indépendante de la connexion Internet"
  },
  {
    label: "Coût récurrent",
    cloud: "Facturation à l'usage (tokens), variable selon la charge",
    kady: "Coût matériel fixe, prévisible sur la durée"
  },
  {
    label: "Souveraineté",
    cloud: "Soumise aux lois extraterritoriales du pays d'hébergement",
    kady: "Maîtrise physique complète de la chaîne de traitement"
  },
  {
    label: "Personnalisation",
    cloud: "Modèles et paramètres limités aux options du fournisseur",
    kady: "Modèles, prompts et intégrations choisis librement"
  },
  {
    label: "Maintenance",
    cloud: "Pannes et maintenances planifiées subies côté fournisseur",
    kady: "Maintenance planifiée sous votre contrôle, avec support"
  }
];
let KadyAntiSaasCompare = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.title = "";
    this.subtitle = "";
    this.colCriterion = "Critère";
    this.colCloud = "Cloud Externe";
    this.colKady = "Appliance Locale";
    this.criteria = [];
  }
  render() {
    const hasHeader = Boolean(this.title || this.subtitle);
    const rows = this.criteria.length > 0 ? this.criteria : DEFAULT_CRITERIA;
    return b`
      <div class="wrapper">
        ${hasHeader ? b`
              <div class="header">
                <slot name="header">
                  ${this.title ? b`<h2 class="title">${this.title}</h2>` : null}
                  ${this.subtitle ? b`<p class="subtitle">${this.subtitle}</p>` : null}
                </slot>
              </div>
            ` : null}

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
                ${rows.map(
      (c2) => b`
                    <tr>
                      <td class="cell-criterion">${c2.label}</td>
                      <td class="cell-cloud">
                        <div class="cell-content">
                          <span class="icon icon-cross" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="15" y1="9" x2="9" y2="15"></line>
                              <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                          </span>
                          <span>${c2.cloud}</span>
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
                          <span>${c2.kady}</span>
                        </div>
                      </td>
                    </tr>
                  `
    )}
              </tbody>
            </table>
          </slot>
        </div>
      </div>
    `;
  }
};
KadyAntiSaasCompare.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$4([
  n2()
], KadyAntiSaasCompare.prototype, "title", 2);
__decorateClass$4([
  n2()
], KadyAntiSaasCompare.prototype, "subtitle", 2);
__decorateClass$4([
  n2()
], KadyAntiSaasCompare.prototype, "colCriterion", 2);
__decorateClass$4([
  n2()
], KadyAntiSaasCompare.prototype, "colCloud", 2);
__decorateClass$4([
  n2()
], KadyAntiSaasCompare.prototype, "colKady", 2);
__decorateClass$4([
  n2({ type: Array, converter: safeCriteriaConverter })
], KadyAntiSaasCompare.prototype, "criteria", 2);
KadyAntiSaasCompare = __decorateClass$4([
  t("kady-anti-saas-compare")
], KadyAntiSaasCompare);
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
let KadyHero = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.eyebrow = "";
    this.title = "";
    this.subtitle = "";
    this._hasEyebrowSlot = false;
    this._hasTitleSlot = false;
    this._hasSubtitleSlot = false;
    this._hasCtaSlot = false;
    this._hasMediaSlot = false;
  }
  handleEyebrowSlotChange(e2) {
    this._hasEyebrowSlot = this.slotHasAssignedContent(e2);
  }
  handleTitleSlotChange(e2) {
    this._hasTitleSlot = this.slotHasAssignedContent(e2);
  }
  handleSubtitleSlotChange(e2) {
    this._hasSubtitleSlot = this.slotHasAssignedContent(e2);
  }
  handleCtaSlotChange(e2) {
    this._hasCtaSlot = this.slotHasAssignedContent(e2);
  }
  handleMediaSlotChange(e2) {
    this._hasMediaSlot = this.slotHasAssignedContent(e2);
  }
  render() {
    const showEyebrow = Boolean(this.eyebrow) || this._hasEyebrowSlot;
    const showTitle = Boolean(this.title) || this._hasTitleSlot;
    const showSubtitle = Boolean(this.subtitle) || this._hasSubtitleSlot;
    return b`
      <section class="hero-container">
        <div class="content-col">
          <div class="eyebrow-wrapper ${showEyebrow ? "" : "hidden"}">
            <slot name="eyebrow" @slotchange=${this.handleEyebrowSlotChange}>
              ${this.eyebrow ? b`<span class="eyebrow-text">${this.eyebrow}</span>` : null}
            </slot>
          </div>

          <slot
            name="title"
            class=${showTitle ? "" : "hidden"}
            @slotchange=${this.handleTitleSlotChange}
          >
            ${this.title ? b`<h1 class="title">${this.title}</h1>` : null}
          </slot>

          <slot
            name="subtitle"
            class=${showSubtitle ? "" : "hidden"}
            @slotchange=${this.handleSubtitleSlotChange}
          >
            ${this.subtitle ? b`<p class="subtitle">${this.subtitle}</p>` : null}
          </slot>

          <slot></slot>

          <div class="cta-group ${this._hasCtaSlot ? "" : "hidden"}">
            <slot name="cta" @slotchange=${this.handleCtaSlotChange}></slot>
          </div>
        </div>

        <div class="media-col ${this._hasMediaSlot ? "" : "hidden"}">
          <slot name="media" @slotchange=${this.handleMediaSlotChange}></slot>
        </div>
      </section>
    `;
  }
};
KadyHero.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$3([
  n2()
], KadyHero.prototype, "eyebrow", 2);
__decorateClass$3([
  n2()
], KadyHero.prototype, "title", 2);
__decorateClass$3([
  n2()
], KadyHero.prototype, "subtitle", 2);
__decorateClass$3([
  r()
], KadyHero.prototype, "_hasEyebrowSlot", 2);
__decorateClass$3([
  r()
], KadyHero.prototype, "_hasTitleSlot", 2);
__decorateClass$3([
  r()
], KadyHero.prototype, "_hasSubtitleSlot", 2);
__decorateClass$3([
  r()
], KadyHero.prototype, "_hasCtaSlot", 2);
__decorateClass$3([
  r()
], KadyHero.prototype, "_hasMediaSlot", 2);
KadyHero = __decorateClass$3([
  t("kady-hero")
], KadyHero);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
const jsonListConverter = {
  type: Array,
  attribute: true,
  converter: {
    fromAttribute: (value) => {
      if (value === null) return [];
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
  }
};
let KadyFeatureGrid = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.title = "";
    this.subtitle = "";
    this.features = [];
    this._hasHeaderSlot = false;
    this._hasTitleSlot = false;
    this._hasSubtitleSlot = false;
  }
  handleHeaderSlotChange(e2) {
    this._hasHeaderSlot = this.slotHasAssignedContent(e2);
  }
  handleTitleSlotChange(e2) {
    this._hasTitleSlot = this.slotHasAssignedContent(e2);
  }
  handleSubtitleSlotChange(e2) {
    this._hasSubtitleSlot = this.slotHasAssignedContent(e2);
  }
  get parsedFeatures() {
    return this.features || [];
  }
  render() {
    const items = this.parsedFeatures;
    const showHeader = Boolean(
      this.title || this.subtitle || this._hasHeaderSlot || this._hasTitleSlot || this._hasSubtitleSlot
    );
    const cols = Math.floor(Number(this.columns));
    const gridStyle = Number.isFinite(cols) && cols > 0 ? `grid-template-columns: repeat(${cols}, 1fr);` : A;
    return b`
      <div class="section-wrapper">
        <div class="header-block ${showHeader ? "" : "hidden"}">
          <slot name="header" @slotchange=${this.handleHeaderSlotChange}>
            <slot name="title" @slotchange=${this.handleTitleSlotChange}>
              ${this.title ? b`<h2 class="section-title">${this.title}</h2>` : null}
            </slot>
            <slot name="subtitle" @slotchange=${this.handleSubtitleSlotChange}>
              ${this.subtitle ? b`<p class="section-subtitle">${this.subtitle}</p>` : null}
            </slot>
          </slot>
        </div>

        <div class="grid" style=${gridStyle}>
          ${items.map(
      (f2) => b`
              <kady-card class="feature-card">
                <div class="card-content">
                  <div class="card-top">
                    <div class="icon-container" aria-hidden="true">
                      ${f2.icon || "✦"}
                    </div>
                    ${f2.badge ? b`<kady-badge variant="accent" size="sm">${f2.badge}</kady-badge>` : null}
                  </div>
                  <h3 class="feature-title">${f2.title}</h3>
                  <p class="feature-desc">${f2.description}</p>
                </div>
              </kady-card>
            `
    )}
          <slot></slot>
        </div>
      </div>
    `;
  }
};
KadyFeatureGrid.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$2([
  n2()
], KadyFeatureGrid.prototype, "title", 2);
__decorateClass$2([
  n2()
], KadyFeatureGrid.prototype, "subtitle", 2);
__decorateClass$2([
  n2(jsonListConverter)
], KadyFeatureGrid.prototype, "features", 2);
__decorateClass$2([
  n2({ type: Number })
], KadyFeatureGrid.prototype, "columns", 2);
__decorateClass$2([
  r()
], KadyFeatureGrid.prototype, "_hasHeaderSlot", 2);
__decorateClass$2([
  r()
], KadyFeatureGrid.prototype, "_hasTitleSlot", 2);
__decorateClass$2([
  r()
], KadyFeatureGrid.prototype, "_hasSubtitleSlot", 2);
KadyFeatureGrid = __decorateClass$2([
  t("kady-feature-grid")
], KadyFeatureGrid);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let KadyCtaBand = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.title = "";
    this.description = "";
    this.variant = "primary";
    this._hasTitleSlot = false;
    this._hasDescriptionSlot = false;
    this._hasActionsSlot = false;
  }
  handleTitleSlotChange(e2) {
    this._hasTitleSlot = this.slotHasAssignedContent(e2);
  }
  handleDescriptionSlotChange(e2) {
    this._hasDescriptionSlot = this.slotHasAssignedContent(e2);
  }
  handleActionsSlotChange(e2) {
    this._hasActionsSlot = this.slotHasAssignedContent(e2);
  }
  render() {
    const showTitle = Boolean(this.title) || this._hasTitleSlot;
    const showDescription = Boolean(this.description) || this._hasDescriptionSlot;
    return b`
      <kady-card class="cta-card variant-${this.variant}">
        <div class="band-content">
          <div class="text-content">
            <slot
              name="title"
              class=${showTitle ? "" : "hidden"}
              @slotchange=${this.handleTitleSlotChange}
            >
              ${this.title ? b`<h2 class="title">${this.title}</h2>` : null}
            </slot>
            <slot
              name="description"
              class=${showDescription ? "" : "hidden"}
              @slotchange=${this.handleDescriptionSlotChange}
            >
              ${this.description ? b`<p class="description">${this.description}</p>` : null}
            </slot>
            <slot></slot>
          </div>
          <div class="actions-wrapper ${this._hasActionsSlot ? "" : "hidden"}">
            <slot name="actions" @slotchange=${this.handleActionsSlotChange}></slot>
          </div>
        </div>
      </kady-card>
    `;
  }
};
KadyCtaBand.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass$1([
  n2()
], KadyCtaBand.prototype, "title", 2);
__decorateClass$1([
  n2()
], KadyCtaBand.prototype, "description", 2);
__decorateClass$1([
  n2()
], KadyCtaBand.prototype, "variant", 2);
__decorateClass$1([
  r()
], KadyCtaBand.prototype, "_hasTitleSlot", 2);
__decorateClass$1([
  r()
], KadyCtaBand.prototype, "_hasDescriptionSlot", 2);
__decorateClass$1([
  r()
], KadyCtaBand.prototype, "_hasActionsSlot", 2);
KadyCtaBand = __decorateClass$1([
  t("kady-cta-band")
], KadyCtaBand);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
function safeLinksConverter(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) => item !== null && typeof item === "object" && typeof item.href === "string" && typeof item.label === "string"
    ).map((item) => ({ href: item.href, label: item.label }));
  } catch {
    return [];
  }
}
let navbarUid = 0;
let KadyNavbar = class extends KadyElement {
  constructor() {
    super(...arguments);
    this.sticky = false;
    this.themeToggle = false;
    this.links = [];
    this.label = "Navigation";
    this._menuOpen = false;
    this._isMobile = false;
    this._scrolled = false;
    this._theme = "dark";
    this._hasBrandSlot = false;
    this._hasActionsSlot = false;
    this._hasDefaultSlot = false;
    this._panelId = `kady-navbar-links-${++navbarUid}`;
    this._mql = window.matchMedia("(max-width: 767px)");
    this._themeObserver = null;
    this._onBreakpoint = () => {
      this._isMobile = this._mql.matches;
      if (!this._isMobile) this._menuOpen = false;
    };
    this._onScroll = () => {
      const scrolled = window.scrollY > 8;
      if (scrolled !== this._scrolled) this._scrolled = scrolled;
    };
    this._onDocClick = (e2) => {
      if (this._menuOpen && !e2.composedPath().includes(this)) this._menuOpen = false;
    };
    this._onDocKeydown = (e2) => {
      var _a2;
      if (e2.key === "Escape" && this._menuOpen) {
        this._menuOpen = false;
        (_a2 = this.renderRoot.querySelector(".burger")) == null ? void 0 : _a2.focus();
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this._isMobile = this._mql.matches;
    this._mql.addEventListener("change", this._onBreakpoint);
    this._syncTheme();
    this._themeObserver = new MutationObserver(() => this._syncTheme());
    this._themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });
    this._syncScrollListener();
  }
  disconnectedCallback() {
    var _a2;
    this._mql.removeEventListener("change", this._onBreakpoint);
    (_a2 = this._themeObserver) == null ? void 0 : _a2.disconnect();
    this._themeObserver = null;
    window.removeEventListener("scroll", this._onScroll);
    this._removeMenuDismissers();
    super.disconnectedCallback();
  }
  updated(changed) {
    if (changed.has("sticky")) this._syncScrollListener();
    if (changed.has("_menuOpen")) {
      this._removeMenuDismissers();
      if (this._menuOpen) {
        document.addEventListener("click", this._onDocClick, true);
        document.addEventListener("keydown", this._onDocKeydown);
      }
    }
  }
  _syncScrollListener() {
    if (this.sticky) {
      window.addEventListener("scroll", this._onScroll, { passive: true });
      this._onScroll();
    } else {
      window.removeEventListener("scroll", this._onScroll);
      this._scrolled = false;
    }
  }
  _syncTheme() {
    this._theme = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }
  _toggleTheme() {
    this.emitEvent("theme-toggle", { theme: this._theme === "dark" ? "light" : "dark" });
  }
  _toggleMenu() {
    this._menuOpen = !this._menuOpen;
  }
  _onLinkClick() {
    if (this._menuOpen) this._menuOpen = false;
  }
  _removeMenuDismissers() {
    document.removeEventListener("click", this._onDocClick, true);
    document.removeEventListener("keydown", this._onDocKeydown);
  }
  _onBrandSlot(e2) {
    this._hasBrandSlot = this.slotHasAssignedContent(e2);
  }
  _onActionsSlot(e2) {
    this._hasActionsSlot = this.slotHasAssignedContent(e2);
  }
  _onDefaultSlot(e2) {
    this._hasDefaultSlot = this.slotHasAssignedContent(e2);
  }
  render() {
    const showGenerated = !this._hasDefaultSlot && this.links.length > 0;
    const showLinks = this._hasDefaultSlot || this.links.length > 0;
    const menuOpen = this._menuOpen && this._isMobile;
    return b`
      <div class="shell">
        <header class="pill ${this._scrolled ? "scrolled" : ""}">
          <div class="brand-wrap ${this._hasBrandSlot ? "" : "hidden"}">
            <slot name="brand" @slotchange=${this._onBrandSlot}></slot>
          </div>

          <nav class="nav" aria-label=${this.label}>
            <div
              id=${this._panelId}
              class="links ${menuOpen ? "open" : ""} ${showLinks ? "" : "hidden"}"
              aria-hidden=${this._isMobile && !menuOpen ? "true" : "false"}
              @click=${this._onLinkClick}
            >
              <slot @slotchange=${this._onDefaultSlot}></slot>
              ${showGenerated ? this.links.map(
      (l2) => b`<a class="link" href=${l2.href}>${l2.label}</a>`
    ) : A}
            </div>
          </nav>

          <div class="actions">
            <button
              type="button"
              class="burger"
              aria-label="Ouvrir le menu"
              aria-expanded=${this._menuOpen ? "true" : "false"}
              aria-controls=${this._panelId}
              @click=${this._toggleMenu}
            >
              ${this._menuOpen ? b`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>` : b`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>`}
            </button>

            ${this.themeToggle ? b`<button
                  type="button"
                  class="theme-toggle"
                  aria-label="Basculer le thème"
                  title="Basculer entre mode sombre et clair"
                  @click=${this._toggleTheme}
                >
                  ${this._theme === "light" ? b`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                      </svg>` : b`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                      </svg>`}
                </button>` : A}

            <div class="actions-slot ${this._hasActionsSlot ? "" : "hidden"}">
              <slot name="actions" @slotchange=${this._onActionsSlot}></slot>
            </div>
          </div>
        </header>
      </div>
    `;
  }
};
KadyNavbar.styles = [
  KadyElement.baseStyles,
  i$3`
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
    `
];
__decorateClass([
  n2({ type: Boolean, reflect: true })
], KadyNavbar.prototype, "sticky", 2);
__decorateClass([
  n2({ type: Boolean, reflect: true, attribute: "theme-toggle" })
], KadyNavbar.prototype, "themeToggle", 2);
__decorateClass([
  n2({ type: Array, converter: safeLinksConverter })
], KadyNavbar.prototype, "links", 2);
__decorateClass([
  n2()
], KadyNavbar.prototype, "label", 2);
__decorateClass([
  r()
], KadyNavbar.prototype, "_menuOpen", 2);
__decorateClass([
  r()
], KadyNavbar.prototype, "_isMobile", 2);
__decorateClass([
  r()
], KadyNavbar.prototype, "_scrolled", 2);
__decorateClass([
  r()
], KadyNavbar.prototype, "_theme", 2);
__decorateClass([
  r()
], KadyNavbar.prototype, "_hasBrandSlot", 2);
__decorateClass([
  r()
], KadyNavbar.prototype, "_hasActionsSlot", 2);
__decorateClass([
  r()
], KadyNavbar.prototype, "_hasDefaultSlot", 2);
KadyNavbar = __decorateClass([
  t("kady-navbar")
], KadyNavbar);
export {
  KadyAlert,
  KadyAntiSaasCompare,
  KadyBadge,
  KadyBoxStatus,
  KadyButton,
  KadyCard,
  KadyCtaBand,
  KadyElement,
  KadyEmptyState,
  KadyEventTimeline,
  KadyFeatureGrid,
  KadyHero,
  KadyInput,
  KadyModal,
  KadyMrrStat,
  KadyNavbar,
  KadySelect,
  KadySpinner,
  KadyTable,
  KadyTextarea,
  KadyToast,
  KadyTokenUsageBar
};
//# sourceMappingURL=kady-ui.js.map
