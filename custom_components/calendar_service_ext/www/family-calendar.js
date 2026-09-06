const At = globalThis, Qn = At.ShadowRoot && (At.ShadyCSS === void 0 || At.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Zn = /* @__PURE__ */ Symbol(), $r = /* @__PURE__ */ new WeakMap();
let ds = class {
  constructor(e, n, r) {
    if (this._$cssResult$ = !0, r !== Zn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (Qn && e === void 0) {
      const r = n !== void 0 && n.length === 1;
      r && (e = $r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && $r.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const xa = (t) => new ds(typeof t == "string" ? t : t + "", void 0, Zn), Y = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((r, i, s) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[s + 1], t[0]);
  return new ds(n, t, Zn);
}, Ra = (t, e) => {
  if (Qn) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const r = document.createElement("style"), i = At.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = n.cssText, t.appendChild(r);
  }
}, Hr = Qn ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const r of e.cssRules) n += r.cssText;
  return xa(n);
})(t) : t;
const { is: Ta, defineProperty: ka, getOwnPropertyDescriptor: Ma, getOwnPropertyNames: Ia, getOwnPropertySymbols: Na, getPrototypeOf: Oa } = Object, Kt = globalThis, Br = Kt.trustedTypes, Pa = Br ? Br.emptyScript : "", $a = Kt.reactiveElementPolyfillSupport, tt = (t, e) => t, kt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Pa : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let n = t;
  switch (e) {
    case Boolean:
      n = t !== null;
      break;
    case Number:
      n = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(t);
      } catch {
        n = null;
      }
  }
  return n;
} }, Kn = (t, e) => !Ta(t, e), Lr = { attribute: !0, type: String, converter: kt, reflect: !1, useDefault: !1, hasChanged: Kn };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Kt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ne = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Lr) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, r, n);
      i !== void 0 && ka(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, n, r) {
    const { get: i, set: s } = Ma(this.prototype, e) ?? { get() {
      return this[n];
    }, set(o) {
      this[n] = o;
    } };
    return { get: i, set(o) {
      const a = i?.call(this);
      s?.call(this, o), this.requestUpdate(e, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Lr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(tt("elementProperties"))) return;
    const e = Oa(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(tt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(tt("properties"))) {
      const n = this.properties, r = [...Ia(n), ...Na(n)];
      for (const i of r) this.createProperty(i, n[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [r, i] of n) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, r] of this.elementProperties) {
      const i = this._$Eu(n, r);
      i !== void 0 && this._$Eh.set(i, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) n.unshift(Hr(i));
    } else e !== void 0 && n.push(Hr(e));
    return n;
  }
  static _$Eu(e, n) {
    const r = n.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const r of n.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ra(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, n, r) {
    this._$AK(e, r);
  }
  _$ET(e, n) {
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const s = (r.converter?.toAttribute !== void 0 ? r.converter : kt).toAttribute(n, r.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, n) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const s = r.getPropertyOptions(i), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : kt;
      this._$Em = i;
      const a = o.fromAttribute(n, s.type);
      this[i] = a ?? this._$Ej?.get(i) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, n, r, i = !1, s) {
    if (e !== void 0) {
      const o = this.constructor;
      if (i === !1 && (s = this[e]), r ??= o.getPropertyOptions(e), !((r.hasChanged ?? Kn)(s, n) || r.useDefault && r.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, r)))) return;
      this.C(e, n, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: r, reflect: i, wrapped: s }, o) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? n ?? this[e]), s !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (n = void 0), this._$AL.set(e, n)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, s] of this._$Ep) this[i] = s;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, s] of r) {
        const { wrapped: o } = s, a = this[i];
        o !== !0 || this._$AL.has(i) || a === void 0 || this.C(i, void 0, s, a);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((n) => n.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((n) => this._$ET(n, this[n])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Ne.elementStyles = [], Ne.shadowRootOptions = { mode: "open" }, Ne[tt("elementProperties")] = /* @__PURE__ */ new Map(), Ne[tt("finalized")] = /* @__PURE__ */ new Map(), $a?.({ ReactiveElement: Ne }), (Kt.reactiveElementVersions ??= []).push("2.1.2");
const Xn = globalThis, zr = (t) => t, Mt = Xn.trustedTypes, Ur = Mt ? Mt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, us = "$lit$", ae = `lit$${Math.random().toFixed(9).slice(2)}$`, fs = "?" + ae, Ha = `<${fs}>`, _e = document, st = () => _e.createComment(""), ot = (t) => t === null || typeof t != "object" && typeof t != "function", Jn = Array.isArray, Ba = (t) => Jn(t) || typeof t?.[Symbol.iterator] == "function", dn = `[ 	
\f\r]`, Je = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Fr = /-->/g, jr = />/g, ye = RegExp(`>|${dn}(?:([^\\s"'>=/]+)(${dn}*=${dn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Wr = /'/g, Vr = /"/g, hs = /^(?:script|style|textarea|title)$/i, La = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), w = La(1), Ue = /* @__PURE__ */ Symbol.for("lit-noChange"), $ = /* @__PURE__ */ Symbol.for("lit-nothing"), Gr = /* @__PURE__ */ new WeakMap(), Ae = _e.createTreeWalker(_e, 129);
function ps(t, e) {
  if (!Jn(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ur !== void 0 ? Ur.createHTML(e) : e;
}
const za = (t, e) => {
  const n = t.length - 1, r = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = Je;
  for (let a = 0; a < n; a++) {
    const l = t[a];
    let d, c, h = -1, f = 0;
    for (; f < l.length && (o.lastIndex = f, c = o.exec(l), c !== null); ) f = o.lastIndex, o === Je ? c[1] === "!--" ? o = Fr : c[1] !== void 0 ? o = jr : c[2] !== void 0 ? (hs.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = ye) : c[3] !== void 0 && (o = ye) : o === ye ? c[0] === ">" ? (o = i ?? Je, h = -1) : c[1] === void 0 ? h = -2 : (h = o.lastIndex - c[2].length, d = c[1], o = c[3] === void 0 ? ye : c[3] === '"' ? Vr : Wr) : o === Vr || o === Wr ? o = ye : o === Fr || o === jr ? o = Je : (o = ye, i = void 0);
    const u = o === ye && t[a + 1].startsWith("/>") ? " " : "";
    s += o === Je ? l + Ha : h >= 0 ? (r.push(d), l.slice(0, h) + us + l.slice(h) + ae + u) : l + ae + (h === -2 ? a : u);
  }
  return [ps(t, s + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
let Mn = class gs {
  constructor({ strings: e, _$litType$: n }, r) {
    let i;
    this.parts = [];
    let s = 0, o = 0;
    const a = e.length - 1, l = this.parts, [d, c] = za(e, n);
    if (this.el = gs.createElement(d, r), Ae.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = Ae.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(us)) {
          const f = c[o++], u = i.getAttribute(h).split(ae), g = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: s, name: g[2], strings: u, ctor: g[1] === "." ? Fa : g[1] === "?" ? ja : g[1] === "@" ? Wa : Xt }), i.removeAttribute(h);
        } else h.startsWith(ae) && (l.push({ type: 6, index: s }), i.removeAttribute(h));
        if (hs.test(i.tagName)) {
          const h = i.textContent.split(ae), f = h.length - 1;
          if (f > 0) {
            i.textContent = Mt ? Mt.emptyScript : "";
            for (let u = 0; u < f; u++) i.append(h[u], st()), Ae.nextNode(), l.push({ type: 2, index: ++s });
            i.append(h[f], st());
          }
        }
      } else if (i.nodeType === 8) if (i.data === fs) l.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(ae, h + 1)) !== -1; ) l.push({ type: 7, index: s }), h += ae.length - 1;
      }
      s++;
    }
  }
  static createElement(e, n) {
    const r = _e.createElement("template");
    return r.innerHTML = e, r;
  }
};
function Fe(t, e, n = t, r) {
  if (e === Ue) return e;
  let i = r !== void 0 ? n._$Co?.[r] : n._$Cl;
  const s = ot(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== s && (i?._$AO?.(!1), s === void 0 ? i = void 0 : (i = new s(t), i._$AT(t, n, r)), r !== void 0 ? (n._$Co ??= [])[r] = i : n._$Cl = i), i !== void 0 && (e = Fe(t, i._$AS(t, e.values), i, r)), e;
}
class Ua {
  constructor(e, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: n }, parts: r } = this._$AD, i = (e?.creationScope ?? _e).importNode(n, !0);
    Ae.currentNode = i;
    let s = Ae.nextNode(), o = 0, a = 0, l = r[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let d;
        l.type === 2 ? d = new er(s, s.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (d = new Va(s, this, e)), this._$AV.push(d), l = r[++a];
      }
      o !== l?.index && (s = Ae.nextNode(), o++);
    }
    return Ae.currentNode = _e, i;
  }
  p(e) {
    let n = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, n), n += r.strings.length - 2) : r._$AI(e[n])), n++;
  }
}
let er = class ms {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, n, r, i) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && e?.nodeType === 11 && (e = n.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, n = this) {
    e = Fe(this, e, n), ot(e) ? e === $ || e == null || e === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : e !== this._$AH && e !== Ue && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ba(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== $ && ot(this._$AH) ? this._$AA.nextSibling.data = e : this.T(_e.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: n, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = Mn.createElement(ps(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(n);
    else {
      const s = new Ua(i, this), o = s.u(this.options);
      s.p(n), this.T(o), this._$AH = s;
    }
  }
  _$AC(e) {
    let n = Gr.get(e.strings);
    return n === void 0 && Gr.set(e.strings, n = new Mn(e)), n;
  }
  k(e) {
    Jn(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let r, i = 0;
    for (const s of e) i === n.length ? n.push(r = new ms(this.O(st()), this.O(st()), this, this.options)) : r = n[i], r._$AI(s), i++;
    i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); e !== this._$AB; ) {
      const r = zr(e).nextSibling;
      zr(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}, Xt = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, r, i, s) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = e, this.name = n, this._$AM = i, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = $;
  }
  _$AI(e, n = this, r, i) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) e = Fe(this, e, n, 0), o = !ot(e) || e !== this._$AH && e !== Ue, o && (this._$AH = e);
    else {
      const a = e;
      let l, d;
      for (e = s[0], l = 0; l < s.length - 1; l++) d = Fe(this, a[r + l], n, l), d === Ue && (d = this._$AH[l]), o ||= !ot(d) || d !== this._$AH[l], d === $ ? e = $ : e !== $ && (e += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}, Fa = class extends Xt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === $ ? void 0 : e;
  }
}, ja = class extends Xt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== $);
  }
}, Wa = class extends Xt {
  constructor(e, n, r, i, s) {
    super(e, n, r, i, s), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = Fe(this, e, n, 0) ?? $) === Ue) return;
    const r = this._$AH, i = e === $ && r !== $ || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, s = e !== $ && (r === $ || i);
    i && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}, Va = class {
  constructor(e, n, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Fe(this, e);
  }
};
const Ga = Xn.litHtmlPolyfillSupport;
Ga?.(Mn, er), (Xn.litHtmlVersions ??= []).push("3.3.2");
const qa = (t, e, n) => {
  const r = n?.renderBefore ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const s = n?.renderBefore ?? null;
    r._$litPart$ = i = new er(e.insertBefore(st(), s), s, void 0, n ?? {});
  }
  return i._$AI(t), i;
};
const tr = globalThis;
let te = class extends Ne {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = qa(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Ue;
  }
};
te._$litElement$ = !0, te.finalized = !0, tr.litElementHydrateSupport?.({ LitElement: te });
const Ya = tr.litElementPolyfillSupport;
Ya?.({ LitElement: te });
(tr.litElementVersions ??= []).push("4.2.2");
const dt = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const Qa = { attribute: !0, type: String, converter: kt, reflect: !1, hasChanged: Kn }, Za = (t = Qa, e, n) => {
  const { kind: r, metadata: i } = n;
  let s = globalThis.litPropertyMetadata.get(i);
  if (s === void 0 && globalThis.litPropertyMetadata.set(i, s = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(n.name, t), r === "accessor") {
    const { name: o } = n;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(o, l, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, t, a), a;
    } };
  }
  if (r === "setter") {
    const { name: o } = n;
    return function(a) {
      const l = this[o];
      e.call(this, a), this.requestUpdate(o, l, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function V(t) {
  return (e, n) => typeof n == "object" ? Za(t, e, n) : ((r, i, s) => {
    const o = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, r), o ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(t, e, n);
}
function U(t) {
  return V({ ...t, state: !0, attribute: !1 });
}
const Ka = (t, e, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, n), n);
function vs(t, e) {
  return (n, r, i) => {
    const s = (o) => o.renderRoot?.querySelector(t) ?? null;
    return Ka(n, r, { get() {
      return s(this);
    } });
  };
}
const Xa = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
function je(t) {
  const e = new Date(t);
  return e.setHours(0, 0, 0, 0), e;
}
function Ja(t, e) {
  const n = Math.round(
    (je(t).getTime() - je(e).getTime()) / 864e5
  );
  return n === 0 ? "Heute" : n === 1 ? "Morgen" : Xa[t.getDay()];
}
function el(t, e, n) {
  const r = !t.start.dateTime;
  return {
    uid: t.uid ?? `${n}-${t.summary}-${t.start.date ?? ""}`,
    summary: t.summary,
    location: t.location ?? void 0,
    color: e,
    calendarName: n,
    allDay: r,
    start: new Date(t.start.dateTime ?? `${t.start.date}T00:00:00`),
    end: new Date(t.end.dateTime ?? `${t.end.date}T00:00:00`)
  };
}
function tl(t, e, n = /* @__PURE__ */ new Date()) {
  const r = [];
  for (let i = 0; i < e; i++) {
    const s = je(n);
    s.setDate(s.getDate() + i);
    const o = new Date(s);
    o.setDate(o.getDate() + 1);
    const a = t.filter((l) => l.start < o && l.end > s).sort(nl);
    r.push({ date: s, label: Ja(s, n), entries: a });
  }
  return r;
}
function nl(t, e) {
  return t.allDay !== e.allDay ? t.allDay ? -1 : 1 : t.start.getTime() - e.start.getTime();
}
function rl(t, e) {
  if (t.allDay) return "Ganztägig";
  const n = (s) => s.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }), r = je(t.start).getTime() === e.getTime(), i = je(t.end).getTime() === e.getTime();
  return r && i ? `${n(t.start)} – ${n(t.end)}` : r ? `ab ${n(t.start)}` : i ? `bis ${n(t.end)}` : "Ganztägig";
}
async function bs(t, e, n, r) {
  const i = encodeURIComponent(n), s = encodeURIComponent(r);
  return t.callApi("GET", `calendars/${e}?start=${i}&end=${s}`);
}
async function il(t, e, n) {
  await t.callWS({ type: "calendar/event/create", entity_id: e, event: n });
}
async function ys(t, e, n, r, i = {}) {
  await t.callWS({
    type: "calendar/event/update",
    entity_id: e,
    uid: n,
    ...i,
    event: r
  });
}
async function sl(t, e, n, r = {}) {
  await t.callWS({
    type: "calendar/event/delete",
    entity_id: e,
    uid: n,
    ...r
  });
}
const Jt = "#0078d4";
function ol(t, e, n = Jt) {
  const r = {
    entityId: e,
    uid: t.uid ?? "",
    recurrenceId: t.recurrence_id ?? "",
    rrule: t.rrule ?? ""
  };
  return {
    // Alle Instanzen einer Serie tragen dieselbe uid. FullCalendar fasst
    // Termine mit gleicher Kennung zu einer Gruppe zusammen und verschiebt
    // sie gemeinsam - bei einer Serie, von der nur dieser und die
    // folgenden Termine geaendert werden sollen, waere das falsch.
    id: t.recurrence_id ? `${t.uid ?? ""}::${t.recurrence_id}` : t.uid,
    title: t.summary,
    start: t.start.dateTime ?? t.start.date,
    end: t.end.dateTime ?? t.end.date,
    backgroundColor: n,
    borderColor: n,
    // Ohne Uhrzeit im Startfeld ist der Termin ganztaegig.
    allDay: !t.start.dateTime,
    extendedProps: r
  };
}
function al(t, e) {
  return t.filter(
    (n) => e.includes(n.extendedProps.entityId)
  );
}
const ll = Y`
  :host {
    display: block;
    color-scheme: light;
  }

  ha-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 10px 40px 0 rgba(31, 38, 135, 0.12);
    overflow: hidden;
  }

  .agenda {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 20px;
    max-height: 85vh;
    overflow-y: auto;
  }

  .day {
    padding: 12px 0 4px;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }

  .day:first-child {
    border-top: none;
    padding-top: 0;
  }

  .day-head {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 8px;
  }

  .day-number {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1;
    color: #1d1d1f;
    font-variant-numeric: tabular-nums;
  }

  .day-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #5f6368;
  }

  .day-month {
    font-size: 0.8rem;
    color: #86868b;
  }

  /* Heute wird hervorgehoben, damit der Blick zuerst dort landet. */
  .day--today .day-number,
  .day--today .day-label {
    color: #007aff;
  }

  .entry {
    display: flex;
    align-items: stretch;
    gap: 10px;
    margin-bottom: 6px;
    padding: 8px 10px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.7);
  }

  /* Farbstreifen statt farbiger Flaeche: Die Zuordnung bleibt erkennbar,
     der Text bleibt auf hellem Grund gut lesbar. */
  .stripe {
    flex: 0 0 4px;
    border-radius: 2px;
    background: var(--entry-color);
  }

  .entry-body {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .entry-title {
    font-size: 0.98rem;
    font-weight: 600;
    color: #1d1d1f;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .entry-meta {
    font-size: 0.82rem;
    color: #5f6368;
    font-variant-numeric: tabular-nums;
  }

  .empty {
    margin: 0 0 6px;
    padding: 6px 14px;
    font-size: 0.86rem;
    color: #9aa0a6;
  }

  .empty-all {
    margin: 0;
    padding: 24px 0;
    text-align: center;
    color: #5f6368;
  }
`;
function cl(t) {
  const e = t[0]?.date.getMonth();
  return t.some((n) => n.date.getMonth() !== e);
}
function dl(t) {
  const e = t.hideEmptyDays ? t.days.filter((n) => n.entries.length > 0) : t.days;
  return w`
    <ha-card>
      <div class="agenda">
        ${e.length === 0 ? w`<p class="empty-all">In den nächsten Tagen steht nichts an.</p>` : e.map((n) => ul(n, cl(e)))}
      </div>
    </ha-card>
  `;
}
function ul(t, e) {
  const n = t.label === "Heute";
  return w`
    <section class="day ${n ? "day--today" : ""}">
      <header class="day-head">
        <span class="day-number">${t.date.getDate()}</span>
        <span class="day-label">${t.label}</span>
        ${e ? w`<span class="day-month">
              ${t.date.toLocaleDateString("de-DE", { month: "short" })}
            </span>` : ""}
      </header>
      ${t.entries.length === 0 ? w`<p class="empty">Keine Termine</p>` : t.entries.map((r) => fl(r, t.date))}
    </section>
  `;
}
function fl(t, e) {
  return w`
    <article class="entry" style="--entry-color: ${t.color}" title=${t.calendarName}>
      <span class="stripe"></span>
      <div class="entry-body">
        <span class="entry-title">${t.summary}</span>
        <span class="entry-meta">
          ${rl(t, e)}${t.location ? w` · ${t.location}` : ""}
        </span>
      </div>
    </article>
  `;
}
var hl = Object.defineProperty, pl = Object.getOwnPropertyDescriptor, en = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? pl(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (r ? o(e, n, i) : o(i)) || i);
  return r && i && hl(e, n, i), i;
};
const gl = 7, ml = 500;
let We = class extends te {
  constructor() {
    super(...arguments), this.days = [], this.lastSignature = "";
  }
  setConfig(t) {
    if (!t.entities?.length)
      throw new Error("Bitte mindestens eine Kalender-Entität angeben!");
    this.config = t;
  }
  getCardSize() {
    return 8;
  }
  updated(t) {
    if (!t.has("hass")) return;
    const e = (this.config?.entities ?? []).map((n) => this.hass.states[n]?.last_updated ?? "missing").join("|");
    e !== this.lastSignature && (this.lastSignature = e, this.scheduleLoad());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.refreshTimer !== void 0 && (clearTimeout(this.refreshTimer), this.refreshTimer = void 0);
  }
  render() {
    return dl({
      days: this.days,
      hideEmptyDays: this.config?.hideEmptyDays ?? !1
    });
  }
  scheduleLoad() {
    this.refreshTimer !== void 0 && clearTimeout(this.refreshTimer), this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = void 0, this.load();
    }, this.config?.refreshDebounceMs ?? ml);
  }
  async load() {
    if (!this.hass || !this.config) return;
    const t = this.config.days ?? gl, e = je(/* @__PURE__ */ new Date()), n = new Date(e);
    n.setDate(n.getDate() + t);
    const r = [];
    for (const i of this.config.entities)
      try {
        const s = await bs(
          this.hass,
          i,
          e.toISOString(),
          n.toISOString()
        ), o = this.config.colors?.[i] ?? Jt, a = this.hass.states[i]?.attributes?.friendly_name ?? i;
        r.push(...s.map((l) => el(l, o, a)));
      } catch (s) {
        console.error("Family Agenda: Laden fehlgeschlagen für", i, s);
      }
    this.days = tl(r, t);
  }
};
We.styles = ll;
en([
  V({ attribute: !1 })
], We.prototype, "hass", 2);
en([
  V({ attribute: !1 })
], We.prototype, "config", 2);
en([
  U()
], We.prototype, "days", 2);
We = en([
  dt("family-agenda")
], We);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-agenda",
  name: "Family Agenda",
  description: "Übersicht der nächsten Tage als Liste, über mehrere Kalender.",
  preview: !1
});
var tn, S, Es, ws, Ve, Se, qr, Ss, As, It = {}, Ds = [], vl = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function le(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function Cs(t) {
  var e = t.parentNode;
  e && e.removeChild(t);
}
function p(t, e, n) {
  var r, i, s, o = {};
  for (s in e) s == "key" ? r = e[s] : s == "ref" ? i = e[s] : o[s] = e[s];
  if (arguments.length > 2 && (o.children = arguments.length > 3 ? tn.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null) for (s in t.defaultProps) o[s] === void 0 && (o[s] = t.defaultProps[s]);
  return Dt(t, o, r, i, null);
}
function Dt(t, e, n, r, i) {
  var s = { type: t, props: e, key: n, ref: r, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: i ?? ++Es };
  return i == null && S.vnode != null && S.vnode(s), s;
}
function L() {
  return { current: null };
}
function k(t) {
  return t.children;
}
function bl(t, e, n, r, i) {
  var s;
  for (s in n) s === "children" || s === "key" || s in e || Nt(t, s, null, n[s], r);
  for (s in e) i && typeof e[s] != "function" || s === "children" || s === "key" || s === "value" || s === "checked" || n[s] === e[s] || Nt(t, s, e[s], n[s], r);
}
function Yr(t, e, n) {
  e[0] === "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || vl.test(e) ? n : n + "px";
}
function Nt(t, e, n, r, i) {
  var s;
  e: if (e === "style") if (typeof n == "string") t.style.cssText = n;
  else {
    if (typeof r == "string" && (t.style.cssText = r = ""), r) for (e in r) n && e in n || Yr(t.style, e, "");
    if (n) for (e in n) r && n[e] === r[e] || Yr(t.style, e, n[e]);
  }
  else if (e[0] === "o" && e[1] === "n") s = e !== (e = e.replace(/Capture$/, "")), e = e.toLowerCase() in t ? e.toLowerCase().slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + s] = n, n ? r || t.addEventListener(e, s ? Zr : Qr, s) : t.removeEventListener(e, s ? Zr : Qr, s);
  else if (e !== "dangerouslySetInnerHTML") {
    if (i) e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (e !== "width" && e !== "height" && e !== "href" && e !== "list" && e !== "form" && e !== "tabIndex" && e !== "download" && e in t) try {
      t[e] = n ?? "";
      break e;
    } catch {
    }
    typeof n == "function" || (n == null || n === !1 && e.indexOf("-") == -1 ? t.removeAttribute(e) : t.setAttribute(e, n));
  }
}
function Qr(t) {
  Ve = !0;
  try {
    return this.l[t.type + !1](S.event ? S.event(t) : t);
  } finally {
    Ve = !1;
  }
}
function Zr(t) {
  Ve = !0;
  try {
    return this.l[t.type + !0](S.event ? S.event(t) : t);
  } finally {
    Ve = !1;
  }
}
function F(t, e) {
  this.props = t, this.context = e;
}
function at(t, e) {
  if (e == null) return t.__ ? at(t.__, t.__.__k.indexOf(t) + 1) : null;
  for (var n; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) return n.__e;
  return typeof t.type == "function" ? at(t) : null;
}
function _s(t) {
  var e, n;
  if ((t = t.__) != null && t.__c != null) {
    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) {
      t.__e = t.__c.base = n.__e;
      break;
    }
    return _s(t);
  }
}
function yl(t) {
  Ve ? setTimeout(t) : Ss(t);
}
function In(t) {
  (!t.__d && (t.__d = !0) && Se.push(t) && !Ot.__r++ || qr !== S.debounceRendering) && ((qr = S.debounceRendering) || yl)(Ot);
}
function Ot() {
  var t, e, n, r, i, s, o, a;
  for (Se.sort(function(l, d) {
    return l.__v.__b - d.__v.__b;
  }); t = Se.shift(); ) t.__d && (e = Se.length, r = void 0, i = void 0, o = (s = (n = t).__v).__e, (a = n.__P) && (r = [], (i = le({}, s)).__v = s.__v + 1, nr(a, s, i, n.__n, a.ownerSVGElement !== void 0, s.__h != null ? [o] : null, r, o ?? at(s), s.__h), Ms(r, s), s.__e != o && _s(s)), Se.length > e && Se.sort(function(l, d) {
    return l.__v.__b - d.__v.__b;
  }));
  Ot.__r = 0;
}
function xs(t, e, n, r, i, s, o, a, l, d) {
  var c, h, f, u, g, m, b, y = r && r.__k || Ds, E = y.length;
  for (n.__k = [], c = 0; c < e.length; c++) if ((u = n.__k[c] = (u = e[c]) == null || typeof u == "boolean" ? null : typeof u == "string" || typeof u == "number" || typeof u == "bigint" ? Dt(null, u, null, null, u) : Array.isArray(u) ? Dt(k, { children: u }, null, null, null) : u.__b > 0 ? Dt(u.type, u.props, u.key, u.ref ? u.ref : null, u.__v) : u) != null) {
    if (u.__ = n, u.__b = n.__b + 1, (f = y[c]) === null || f && u.key == f.key && u.type === f.type) y[c] = void 0;
    else for (h = 0; h < E; h++) {
      if ((f = y[h]) && u.key == f.key && u.type === f.type) {
        y[h] = void 0;
        break;
      }
      f = null;
    }
    nr(t, u, f = f || It, i, s, o, a, l, d), g = u.__e, (h = u.ref) && f.ref != h && (b || (b = []), f.ref && b.push(f.ref, null, u), b.push(h, u.__c || g, u)), g != null ? (m == null && (m = g), typeof u.type == "function" && u.__k === f.__k ? u.__d = l = Rs(u, l, t) : l = Ts(t, u, f, y, g, l), typeof n.type == "function" && (n.__d = l)) : l && f.__e == l && l.parentNode != t && (l = at(f));
  }
  for (n.__e = m, c = E; c--; ) y[c] != null && (typeof n.type == "function" && y[c].__e != null && y[c].__e == n.__d && (n.__d = ks(r).nextSibling), Ns(y[c], y[c]));
  if (b) for (c = 0; c < b.length; c++) Is(b[c], b[++c], b[++c]);
}
function Rs(t, e, n) {
  for (var r, i = t.__k, s = 0; i && s < i.length; s++) (r = i[s]) && (r.__ = t, e = typeof r.type == "function" ? Rs(r, e, n) : Ts(n, r, r, i, r.__e, e));
  return e;
}
function Pt(t, e) {
  return e = e || [], t == null || typeof t == "boolean" || (Array.isArray(t) ? t.some(function(n) {
    Pt(n, e);
  }) : e.push(t)), e;
}
function Ts(t, e, n, r, i, s) {
  var o, a, l;
  if (e.__d !== void 0) o = e.__d, e.__d = void 0;
  else if (n == null || i != s || i.parentNode == null) e: if (s == null || s.parentNode !== t) t.appendChild(i), o = null;
  else {
    for (a = s, l = 0; (a = a.nextSibling) && l < r.length; l += 1) if (a == i) break e;
    t.insertBefore(i, s), o = s;
  }
  return o !== void 0 ? o : i.nextSibling;
}
function ks(t) {
  var e, n, r;
  if (t.type == null || typeof t.type == "string") return t.__e;
  if (t.__k) {
    for (e = t.__k.length - 1; e >= 0; e--) if ((n = t.__k[e]) && (r = ks(n))) return r;
  }
  return null;
}
function nr(t, e, n, r, i, s, o, a, l) {
  var d, c, h, f, u, g, m, b, y, E, D, C, P, T, I, x = e.type;
  if (e.constructor !== void 0) return null;
  n.__h != null && (l = n.__h, a = e.__e = n.__e, e.__h = null, s = [a]), (d = S.__b) && d(e);
  try {
    e: if (typeof x == "function") {
      if (b = e.props, y = (d = x.contextType) && r[d.__c], E = d ? y ? y.props.value : d.__ : r, n.__c ? m = (c = e.__c = n.__c).__ = c.__E : ("prototype" in x && x.prototype.render ? e.__c = c = new x(b, E) : (e.__c = c = new F(b, E), c.constructor = x, c.render = wl), y && y.sub(c), c.props = b, c.state || (c.state = {}), c.context = E, c.__n = r, h = c.__d = !0, c.__h = [], c._sb = []), c.__s == null && (c.__s = c.state), x.getDerivedStateFromProps != null && (c.__s == c.state && (c.__s = le({}, c.__s)), le(c.__s, x.getDerivedStateFromProps(b, c.__s))), f = c.props, u = c.state, c.__v = e, h) x.getDerivedStateFromProps == null && c.componentWillMount != null && c.componentWillMount(), c.componentDidMount != null && c.__h.push(c.componentDidMount);
      else {
        if (x.getDerivedStateFromProps == null && b !== f && c.componentWillReceiveProps != null && c.componentWillReceiveProps(b, E), !c.__e && c.shouldComponentUpdate != null && c.shouldComponentUpdate(b, c.__s, E) === !1 || e.__v === n.__v) {
          for (e.__v !== n.__v && (c.props = b, c.state = c.__s, c.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.forEach(function(oe) {
            oe && (oe.__ = e);
          }), D = 0; D < c._sb.length; D++) c.__h.push(c._sb[D]);
          c._sb = [], c.__h.length && o.push(c);
          break e;
        }
        c.componentWillUpdate != null && c.componentWillUpdate(b, c.__s, E), c.componentDidUpdate != null && c.__h.push(function() {
          c.componentDidUpdate(f, u, g);
        });
      }
      if (c.context = E, c.props = b, c.__P = t, C = S.__r, P = 0, "prototype" in x && x.prototype.render) {
        for (c.state = c.__s, c.__d = !1, C && C(e), d = c.render(c.props, c.state, c.context), T = 0; T < c._sb.length; T++) c.__h.push(c._sb[T]);
        c._sb = [];
      } else do
        c.__d = !1, C && C(e), d = c.render(c.props, c.state, c.context), c.state = c.__s;
      while (c.__d && ++P < 25);
      c.state = c.__s, c.getChildContext != null && (r = le(le({}, r), c.getChildContext())), h || c.getSnapshotBeforeUpdate == null || (g = c.getSnapshotBeforeUpdate(f, u)), I = d != null && d.type === k && d.key == null ? d.props.children : d, xs(t, Array.isArray(I) ? I : [I], e, n, r, i, s, o, a, l), c.base = e.__e, e.__h = null, c.__h.length && o.push(c), m && (c.__E = c.__ = null), c.__e = !1;
    } else s == null && e.__v === n.__v ? (e.__k = n.__k, e.__e = n.__e) : e.__e = El(n.__e, e, n, r, i, s, o, l);
    (d = S.diffed) && d(e);
  } catch (oe) {
    e.__v = null, (l || s != null) && (e.__e = a, e.__h = !!l, s[s.indexOf(a)] = null), S.__e(oe, e, n);
  }
}
function Ms(t, e) {
  S.__c && S.__c(e, t), t.some(function(n) {
    try {
      t = n.__h, n.__h = [], t.some(function(r) {
        r.call(n);
      });
    } catch (r) {
      S.__e(r, n.__v);
    }
  });
}
function El(t, e, n, r, i, s, o, a) {
  var l, d, c, h = n.props, f = e.props, u = e.type, g = 0;
  if (u === "svg" && (i = !0), s != null) {
    for (; g < s.length; g++) if ((l = s[g]) && "setAttribute" in l == !!u && (u ? l.localName === u : l.nodeType === 3)) {
      t = l, s[g] = null;
      break;
    }
  }
  if (t == null) {
    if (u === null) return document.createTextNode(f);
    t = i ? document.createElementNS("http://www.w3.org/2000/svg", u) : document.createElement(u, f.is && f), s = null, a = !1;
  }
  if (u === null) h === f || a && t.data === f || (t.data = f);
  else {
    if (s = s && tn.call(t.childNodes), d = (h = n.props || It).dangerouslySetInnerHTML, c = f.dangerouslySetInnerHTML, !a) {
      if (s != null) for (h = {}, g = 0; g < t.attributes.length; g++) h[t.attributes[g].name] = t.attributes[g].value;
      (c || d) && (c && (d && c.__html == d.__html || c.__html === t.innerHTML) || (t.innerHTML = c && c.__html || ""));
    }
    if (bl(t, f, h, i, a), c) e.__k = [];
    else if (g = e.props.children, xs(t, Array.isArray(g) ? g : [g], e, n, r, i && u !== "foreignObject", s, o, s ? s[0] : n.__k && at(n, 0), a), s != null) for (g = s.length; g--; ) s[g] != null && Cs(s[g]);
    a || ("value" in f && (g = f.value) !== void 0 && (g !== t.value || u === "progress" && !g || u === "option" && g !== h.value) && Nt(t, "value", g, h.value, !1), "checked" in f && (g = f.checked) !== void 0 && g !== t.checked && Nt(t, "checked", g, h.checked, !1));
  }
  return t;
}
function Is(t, e, n) {
  try {
    typeof t == "function" ? t(e) : t.current = e;
  } catch (r) {
    S.__e(r, n);
  }
}
function Ns(t, e, n) {
  var r, i;
  if (S.unmount && S.unmount(t), (r = t.ref) && (r.current && r.current !== t.__e || Is(r, null, e)), (r = t.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (s) {
      S.__e(s, e);
    }
    r.base = r.__P = null, t.__c = void 0;
  }
  if (r = t.__k) for (i = 0; i < r.length; i++) r[i] && Ns(r[i], e, n || typeof t.type != "function");
  n || t.__e == null || Cs(t.__e), t.__ = t.__e = t.__d = void 0;
}
function wl(t, e, n) {
  return this.constructor(t, n);
}
function lt(t, e, n) {
  var r, i, s;
  S.__ && S.__(t, e), i = (r = !1) ? null : e.__k, s = [], nr(e, t = e.__k = p(k, null, [t]), i || It, It, e.ownerSVGElement !== void 0, i ? null : e.firstChild ? tn.call(e.childNodes) : null, s, i ? i.__e : e.firstChild, r), Ms(s, t);
}
function Sl(t, e) {
  var n = { __c: e = "__cC" + As++, __: t, Consumer: function(r, i) {
    return r.children(i);
  }, Provider: function(r) {
    var i, s;
    return this.getChildContext || (i = [], (s = {})[e] = this, this.getChildContext = function() {
      return s;
    }, this.shouldComponentUpdate = function(o) {
      this.props.value !== o.value && i.some(function(a) {
        a.__e = !0, In(a);
      });
    }, this.sub = function(o) {
      i.push(o);
      var a = o.componentWillUnmount;
      o.componentWillUnmount = function() {
        i.splice(i.indexOf(o), 1), a && a.call(o);
      };
    }), r.children;
  } };
  return n.Provider.__ = n.Consumer.contextType = n;
}
tn = Ds.slice, S = { __e: function(t, e, n, r) {
  for (var i, s, o; e = e.__; ) if ((i = e.__c) && !i.__) try {
    if ((s = i.constructor) && s.getDerivedStateFromError != null && (i.setState(s.getDerivedStateFromError(t)), o = i.__d), i.componentDidCatch != null && (i.componentDidCatch(t, r || {}), o = i.__d), o) return i.__E = i;
  } catch (a) {
    t = a;
  }
  throw t;
} }, Es = 0, ws = function(t) {
  return t != null && t.constructor === void 0;
}, Ve = !1, F.prototype.setState = function(t, e) {
  var n;
  n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = le({}, this.state), typeof t == "function" && (t = t(le({}, n), this.props)), t && le(n, t), t != null && this.__v && (e && this._sb.push(e), In(this));
}, F.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), In(this));
}, F.prototype.render = k, Se = [], Ss = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Ot.__r = 0, As = 0;
var Q, un, Kr, Os = [], fn = [], Xr = S.__b, Jr = S.__r, ei = S.diffed, ti = S.__c, ni = S.unmount;
function Al() {
  for (var t; t = Os.shift(); ) if (t.__P && t.__H) try {
    t.__H.__h.forEach(Ct), t.__H.__h.forEach(Nn), t.__H.__h = [];
  } catch (e) {
    t.__H.__h = [], S.__e(e, t.__v);
  }
}
S.__b = function(t) {
  Q = null, Xr && Xr(t);
}, S.__r = function(t) {
  Jr && Jr(t);
  var e = (Q = t.__c).__H;
  e && (un === Q ? (e.__h = [], Q.__h = [], e.__.forEach(function(n) {
    n.__N && (n.__ = n.__N), n.__V = fn, n.__N = n.i = void 0;
  })) : (e.__h.forEach(Ct), e.__h.forEach(Nn), e.__h = [])), un = Q;
}, S.diffed = function(t) {
  ei && ei(t);
  var e = t.__c;
  e && e.__H && (e.__H.__h.length && (Os.push(e) !== 1 && Kr === S.requestAnimationFrame || ((Kr = S.requestAnimationFrame) || Dl)(Al)), e.__H.__.forEach(function(n) {
    n.i && (n.__H = n.i), n.__V !== fn && (n.__ = n.__V), n.i = void 0, n.__V = fn;
  })), un = Q = null;
}, S.__c = function(t, e) {
  e.some(function(n) {
    try {
      n.__h.forEach(Ct), n.__h = n.__h.filter(function(r) {
        return !r.__ || Nn(r);
      });
    } catch (r) {
      e.some(function(i) {
        i.__h && (i.__h = []);
      }), e = [], S.__e(r, n.__v);
    }
  }), ti && ti(t, e);
}, S.unmount = function(t) {
  ni && ni(t);
  var e, n = t.__c;
  n && n.__H && (n.__H.__.forEach(function(r) {
    try {
      Ct(r);
    } catch (i) {
      e = i;
    }
  }), n.__H = void 0, e && S.__e(e, n.__v));
};
var ri = typeof requestAnimationFrame == "function";
function Dl(t) {
  var e, n = function() {
    clearTimeout(r), ri && cancelAnimationFrame(e), setTimeout(t);
  }, r = setTimeout(n, 100);
  ri && (e = requestAnimationFrame(n));
}
function Ct(t) {
  var e = Q, n = t.__c;
  typeof n == "function" && (t.__c = void 0, n()), Q = e;
}
function Nn(t) {
  var e = Q;
  t.__c = t.__(), Q = e;
}
function Cl(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function ii(t, e) {
  for (var n in t) if (n !== "__source" && !(n in e)) return !0;
  for (var r in e) if (r !== "__source" && t[r] !== e[r]) return !0;
  return !1;
}
function si(t) {
  this.props = t;
}
(si.prototype = new F()).isPureReactComponent = !0, si.prototype.shouldComponentUpdate = function(t, e) {
  return ii(this.props, t) || ii(this.state, e);
};
var oi = S.__b;
S.__b = function(t) {
  t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), oi && oi(t);
};
var _l = S.__e;
S.__e = function(t, e, n, r) {
  if (t.then) {
    for (var i, s = e; s = s.__; ) if ((i = s.__c) && i.__c) return e.__e == null && (e.__e = n.__e, e.__k = n.__k), i.__c(t, e);
  }
  _l(t, e, n, r);
};
var ai = S.unmount;
function Ps(t, e, n) {
  return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), t.__c.__H = null), (t = Cl({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c = null), t.__k = t.__k && t.__k.map(function(r) {
    return Ps(r, e, n);
  })), t;
}
function $s(t, e, n) {
  return t && (t.__v = null, t.__k = t.__k && t.__k.map(function(r) {
    return $s(r, e, n);
  }), t.__c && t.__c.__P === e && (t.__e && n.insertBefore(t.__e, t.__d), t.__c.__e = !0, t.__c.__P = n)), t;
}
function hn() {
  this.__u = 0, this.t = null, this.__b = null;
}
function Hs(t) {
  var e = t.__.__c;
  return e && e.__a && e.__a(t);
}
function pt() {
  this.u = null, this.o = null;
}
S.unmount = function(t) {
  var e = t.__c;
  e && e.__R && e.__R(), e && t.__h === !0 && (t.type = null), ai && ai(t);
}, (hn.prototype = new F()).__c = function(t, e) {
  var n = e.__c, r = this;
  r.t == null && (r.t = []), r.t.push(n);
  var i = Hs(r.__v), s = !1, o = function() {
    s || (s = !0, n.__R = null, i ? i(a) : a());
  };
  n.__R = o;
  var a = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var d = r.state.__a;
        r.__v.__k[0] = $s(d, d.__c.__P, d.__c.__O);
      }
      var c;
      for (r.setState({ __a: r.__b = null }); c = r.t.pop(); ) c.forceUpdate();
    }
  }, l = e.__h === !0;
  r.__u++ || l || r.setState({ __a: r.__b = r.__v.__k[0] }), t.then(o, o);
}, hn.prototype.componentWillUnmount = function() {
  this.t = [];
}, hn.prototype.render = function(t, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = Ps(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var i = e.__a && p(k, null, t.fallback);
  return i && (i.__h = null), [p(k, null, e.__a ? null : t.children), i];
};
var li = function(t, e, n) {
  if (++n[1] === n[0] && t.o.delete(e), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.o.size)) for (n = t.u; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    t.u = n = n[2];
  }
};
function xl(t) {
  return this.getChildContext = function() {
    return t.context;
  }, t.children;
}
function Rl(t) {
  var e = this, n = t.i;
  e.componentWillUnmount = function() {
    lt(null, e.l), e.l = null, e.i = null;
  }, e.i && e.i !== n && e.componentWillUnmount(), t.__v ? (e.l || (e.i = n, e.l = { nodeType: 1, parentNode: n, childNodes: [], appendChild: function(r) {
    this.childNodes.push(r), e.i.appendChild(r);
  }, insertBefore: function(r, i) {
    this.childNodes.push(r), e.i.appendChild(r);
  }, removeChild: function(r) {
    this.childNodes.splice(this.childNodes.indexOf(r) >>> 1, 1), e.i.removeChild(r);
  } }), lt(p(xl, { context: e.context }, t.__v), e.l)) : e.l && e.componentWillUnmount();
}
function Tl(t, e) {
  var n = p(Rl, { __v: t, i: e });
  return n.containerInfo = e, n;
}
(pt.prototype = new F()).__a = function(t) {
  var e = this, n = Hs(e.__v), r = e.o.get(t);
  return r[0]++, function(i) {
    var s = function() {
      e.props.revealOrder ? (r.push(i), li(e, t, r)) : i();
    };
    n ? n(s) : s();
  };
}, pt.prototype.render = function(t) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var e = Pt(t.children);
  t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
  for (var n = e.length; n--; ) this.o.set(e[n], this.u = [1, 0, this.u]);
  return t.children;
}, pt.prototype.componentDidUpdate = pt.prototype.componentDidMount = function() {
  var t = this;
  this.o.forEach(function(e, n) {
    li(t, n, e);
  });
};
var kl = typeof Symbol < "u" && Symbol.for && /* @__PURE__ */ Symbol.for("react.element") || 60103, Ml = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Il = typeof document < "u", Nl = function(t) {
  return (typeof Symbol < "u" && typeof /* @__PURE__ */ Symbol() == "symbol" ? /fil|che|rad/i : /fil|che|ra/i).test(t);
};
F.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
  Object.defineProperty(F.prototype, t, { configurable: !0, get: function() {
    return this["UNSAFE_" + t];
  }, set: function(e) {
    Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
  } });
});
var ci = S.event;
function Ol() {
}
function Pl() {
  return this.cancelBubble;
}
function $l() {
  return this.defaultPrevented;
}
S.event = function(t) {
  return ci && (t = ci(t)), t.persist = Ol, t.isPropagationStopped = Pl, t.isDefaultPrevented = $l, t.nativeEvent = t;
};
var di = { configurable: !0, get: function() {
  return this.class;
} }, ui = S.vnode;
S.vnode = function(t) {
  var e = t.type, n = t.props, r = n;
  if (typeof e == "string") {
    var i = e.indexOf("-") === -1;
    for (var s in r = {}, n) {
      var o = n[s];
      Il && s === "children" && e === "noscript" || s === "value" && "defaultValue" in n && o == null || (s === "defaultValue" && "value" in n && n.value == null ? s = "value" : s === "download" && o === !0 ? o = "" : /ondoubleclick/i.test(s) ? s = "ondblclick" : /^onchange(textarea|input)/i.test(s + e) && !Nl(n.type) ? s = "oninput" : /^onfocus$/i.test(s) ? s = "onfocusin" : /^onblur$/i.test(s) ? s = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(s) ? s = s.toLowerCase() : i && Ml.test(s) ? s = s.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : o === null && (o = void 0), /^oninput$/i.test(s) && (s = s.toLowerCase(), r[s] && (s = "oninputCapture")), r[s] = o);
    }
    e == "select" && r.multiple && Array.isArray(r.value) && (r.value = Pt(n.children).forEach(function(a) {
      a.props.selected = r.value.indexOf(a.props.value) != -1;
    })), e == "select" && r.defaultValue != null && (r.value = Pt(n.children).forEach(function(a) {
      a.props.selected = r.multiple ? r.defaultValue.indexOf(a.props.value) != -1 : r.defaultValue == a.props.value;
    })), t.props = r, n.class != n.className && (di.enumerable = "className" in n, n.className != null && (r.class = n.className), Object.defineProperty(r, "className", di));
  }
  t.$$typeof = kl, ui && ui(t);
};
var fi = S.__r;
S.__r = function(t) {
  fi && fi(t), t.__c;
};
const Bs = [], On = /* @__PURE__ */ new Map();
function rr(t) {
  Bs.push(t), On.forEach((e) => {
    zs(e, t);
  });
}
function Hl(t) {
  t.isConnected && // sometimes true if SSR system simulates DOM
  t.getRootNode && Ls(t.getRootNode());
}
function Ls(t) {
  let e = On.get(t);
  if (!e || !e.isConnected) {
    if (e = t.querySelector("style[data-fullcalendar]"), !e) {
      e = document.createElement("style"), e.setAttribute("data-fullcalendar", "");
      const n = Ll();
      n && (e.nonce = n);
      const r = t === document ? document.head : t, i = t === document ? r.querySelector("script,link[rel=stylesheet],link[as=style],style") : r.firstChild;
      r.insertBefore(e, i);
    }
    On.set(t, e), Bl(e);
  }
}
function Bl(t) {
  for (const e of Bs)
    zs(t, e);
}
function zs(t, e) {
  const { sheet: n } = t, r = n.cssRules.length;
  e.split("}").forEach((i, s) => {
    i = i.trim(), i && n.insertRule(i + "}", r + s);
  });
}
let pn;
function Ll() {
  return pn === void 0 && (pn = zl()), pn;
}
function zl() {
  const t = document.querySelector('meta[name="csp-nonce"]');
  if (t && t.hasAttribute("content"))
    return t.getAttribute("content");
  const e = document.querySelector("script[nonce]");
  return e && e.nonce || "";
}
typeof document < "u" && Ls(document);
var Ul = ':root{--fc-small-font-size:.85em;--fc-page-bg-color:#fff;--fc-neutral-bg-color:hsla(0,0%,82%,.3);--fc-neutral-text-color:grey;--fc-border-color:#ddd;--fc-button-text-color:#fff;--fc-button-bg-color:#2c3e50;--fc-button-border-color:#2c3e50;--fc-button-hover-bg-color:#1e2b37;--fc-button-hover-border-color:#1a252f;--fc-button-active-bg-color:#1a252f;--fc-button-active-border-color:#151e27;--fc-event-bg-color:#3788d8;--fc-event-border-color:#3788d8;--fc-event-text-color:#fff;--fc-event-selected-overlay-color:rgba(0,0,0,.25);--fc-more-link-bg-color:#d0d0d0;--fc-more-link-text-color:inherit;--fc-event-resizer-thickness:8px;--fc-event-resizer-dot-total-width:8px;--fc-event-resizer-dot-border-width:1px;--fc-non-business-color:hsla(0,0%,84%,.3);--fc-bg-event-color:#8fdf82;--fc-bg-event-opacity:0.3;--fc-highlight-color:rgba(188,232,241,.3);--fc-today-bg-color:rgba(255,220,40,.15);--fc-now-indicator-color:red}.fc-not-allowed,.fc-not-allowed .fc-event{cursor:not-allowed}.fc{display:flex;flex-direction:column;font-size:1em}.fc,.fc *,.fc :after,.fc :before{box-sizing:border-box}.fc table{border-collapse:collapse;border-spacing:0;font-size:1em}.fc th{text-align:center}.fc td,.fc th{padding:0;vertical-align:top}.fc a[data-navlink]{cursor:pointer}.fc a[data-navlink]:hover{text-decoration:underline}.fc-direction-ltr{direction:ltr;text-align:left}.fc-direction-rtl{direction:rtl;text-align:right}.fc-theme-standard td,.fc-theme-standard th{border:1px solid var(--fc-border-color)}.fc-liquid-hack td,.fc-liquid-hack th{position:relative}@font-face{font-family:fcicons;font-style:normal;font-weight:400;src:url("data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBfAAAAC8AAAAYGNtYXAXVtKNAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZgYydxIAAAF4AAAFNGhlYWQUJ7cIAAAGrAAAADZoaGVhB20DzAAABuQAAAAkaG10eCIABhQAAAcIAAAALGxvY2ED4AU6AAAHNAAAABhtYXhwAA8AjAAAB0wAAAAgbmFtZXsr690AAAdsAAABhnBvc3QAAwAAAAAI9AAAACAAAwPAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpBgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6Qb//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAWIAjQKeAskAEwAAJSc3NjQnJiIHAQYUFwEWMjc2NCcCnuLiDQ0MJAz/AA0NAQAMJAwNDcni4gwjDQwM/wANIwz/AA0NDCMNAAAAAQFiAI0CngLJABMAACUBNjQnASYiBwYUHwEHBhQXFjI3AZ4BAA0N/wAMJAwNDeLiDQ0MJAyNAQAMIw0BAAwMDSMM4uINIwwNDQAAAAIA4gC3Ax4CngATACcAACUnNzY0JyYiDwEGFB8BFjI3NjQnISc3NjQnJiIPAQYUHwEWMjc2NCcB87e3DQ0MIw3VDQ3VDSMMDQ0BK7e3DQ0MJAzVDQ3VDCQMDQ3zuLcMJAwNDdUNIwzWDAwNIwy4twwkDA0N1Q0jDNYMDA0jDAAAAgDiALcDHgKeABMAJwAAJTc2NC8BJiIHBhQfAQcGFBcWMjchNzY0LwEmIgcGFB8BBwYUFxYyNwJJ1Q0N1Q0jDA0Nt7cNDQwjDf7V1Q0N1QwkDA0Nt7cNDQwkDLfWDCMN1Q0NDCQMt7gMIw0MDNYMIw3VDQ0MJAy3uAwjDQwMAAADAFUAAAOrA1UAMwBoAHcAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMhMjY1NCYjISIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAAVYRGRkR/qoRGRkRA1UFBAUOCQkVDAsZDf2rDRkLDBUJCA4FBQUFBQUOCQgVDAsZDQJVDRkLDBUJCQ4FBAVVAgECBQMCBwQECAX9qwQJAwQHAwMFAQICAgIBBQMDBwQDCQQCVQUIBAQHAgMFAgEC/oAZEhEZGRESGQAAAAADAFUAAAOrA1UAMwBoAIkAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMzFRQWMzI2PQEzMjY1NCYrATU0JiMiBh0BIyIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAgBkSEhmAERkZEYAZEhIZgBEZGREDVQUEBQ4JCRUMCxkN/asNGQsMFQkIDgUFBQUFBQ4JCBUMCxkNAlUNGQsMFQkJDgUEBVUCAQIFAwIHBAQIBf2rBAkDBAcDAwUBAgICAgEFAwMHBAMJBAJVBQgEBAcCAwUCAQL+gIASGRkSgBkSERmAEhkZEoAZERIZAAABAOIAjQMeAskAIAAAExcHBhQXFjI/ARcWMjc2NC8BNzY0JyYiDwEnJiIHBhQX4uLiDQ0MJAzi4gwkDA0N4uINDQwkDOLiDCQMDQ0CjeLiDSMMDQ3h4Q0NDCMN4uIMIw0MDOLiDAwNIwwAAAABAAAAAQAAa5n0y18PPPUACwQAAAAAANivOVsAAAAA2K85WwAAAAADqwNVAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAOrAAEAAAAAAAAAAAAAAAAAAAALBAAAAAAAAAAAAAAAAgAAAAQAAWIEAAFiBAAA4gQAAOIEAABVBAAAVQQAAOIAAAAAAAoAFAAeAEQAagCqAOoBngJkApoAAQAAAAsAigADAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGZjaWNvbnMAZgBjAGkAYwBvAG4Ac1ZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGZjaWNvbnMAZgBjAGkAYwBvAG4Ac2ZjaWNvbnMAZgBjAGkAYwBvAG4Ac1JlZ3VsYXIAUgBlAGcAdQBsAGEAcmZjaWNvbnMAZgBjAGkAYwBvAG4Ac0ZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=") format("truetype")}.fc-icon{speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:inline-block;font-family:fcicons!important;font-style:normal;font-variant:normal;font-weight:400;height:1em;line-height:1;text-align:center;text-transform:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:1em}.fc-icon-chevron-left:before{content:"\\e900"}.fc-icon-chevron-right:before{content:"\\e901"}.fc-icon-chevrons-left:before{content:"\\e902"}.fc-icon-chevrons-right:before{content:"\\e903"}.fc-icon-minus-square:before{content:"\\e904"}.fc-icon-plus-square:before{content:"\\e905"}.fc-icon-x:before{content:"\\e906"}.fc .fc-button{border-radius:0;font-family:inherit;font-size:inherit;line-height:inherit;margin:0;overflow:visible;text-transform:none}.fc .fc-button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}.fc .fc-button{-webkit-appearance:button}.fc .fc-button:not(:disabled){cursor:pointer}.fc .fc-button{background-color:transparent;border:1px solid transparent;border-radius:.25em;display:inline-block;font-size:1em;font-weight:400;line-height:1.5;padding:.4em .65em;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle}.fc .fc-button:hover{text-decoration:none}.fc .fc-button:focus{box-shadow:0 0 0 .2rem rgba(44,62,80,.25);outline:0}.fc .fc-button:disabled{opacity:.65}.fc .fc-button-primary{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:hover{background-color:var(--fc-button-hover-bg-color);border-color:var(--fc-button-hover-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:disabled{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button-primary:not(:disabled).fc-button-active,.fc .fc-button-primary:not(:disabled):active{background-color:var(--fc-button-active-bg-color);border-color:var(--fc-button-active-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:not(:disabled).fc-button-active:focus,.fc .fc-button-primary:not(:disabled):active:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button .fc-icon{font-size:1.5em;vertical-align:middle}.fc .fc-button-group{display:inline-flex;position:relative;vertical-align:middle}.fc .fc-button-group>.fc-button{flex:1 1 auto;position:relative}.fc .fc-button-group>.fc-button.fc-button-active,.fc .fc-button-group>.fc-button:active,.fc .fc-button-group>.fc-button:focus,.fc .fc-button-group>.fc-button:hover{z-index:1}.fc-direction-ltr .fc-button-group>.fc-button:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0;margin-left:-1px}.fc-direction-ltr .fc-button-group>.fc-button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.fc-direction-rtl .fc-button-group>.fc-button:not(:first-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.fc-direction-rtl .fc-button-group>.fc-button:not(:last-child){border-bottom-left-radius:0;border-top-left-radius:0}.fc .fc-toolbar{align-items:center;display:flex;justify-content:space-between}.fc .fc-toolbar.fc-header-toolbar{margin-bottom:1.5em}.fc .fc-toolbar.fc-footer-toolbar{margin-top:1.5em}.fc .fc-toolbar-title{font-size:1.75em;margin:0}.fc-direction-ltr .fc-toolbar>*>:not(:first-child){margin-left:.75em}.fc-direction-rtl .fc-toolbar>*>:not(:first-child){margin-right:.75em}.fc-direction-rtl .fc-toolbar-ltr{flex-direction:row-reverse}.fc .fc-scroller{-webkit-overflow-scrolling:touch;position:relative}.fc .fc-scroller-liquid{height:100%}.fc .fc-scroller-liquid-absolute{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-scroller-harness{direction:ltr;overflow:hidden;position:relative}.fc .fc-scroller-harness-liquid{height:100%}.fc-direction-rtl .fc-scroller-harness>.fc-scroller{direction:rtl}.fc-theme-standard .fc-scrollgrid{border:1px solid var(--fc-border-color)}.fc .fc-scrollgrid,.fc .fc-scrollgrid table{table-layout:fixed;width:100%}.fc .fc-scrollgrid table{border-left-style:hidden;border-right-style:hidden;border-top-style:hidden}.fc .fc-scrollgrid{border-bottom-width:0;border-collapse:separate;border-right-width:0}.fc .fc-scrollgrid-liquid{height:100%}.fc .fc-scrollgrid-section,.fc .fc-scrollgrid-section table,.fc .fc-scrollgrid-section>td{height:1px}.fc .fc-scrollgrid-section-liquid>td{height:100%}.fc .fc-scrollgrid-section>*{border-left-width:0;border-top-width:0}.fc .fc-scrollgrid-section-footer>*,.fc .fc-scrollgrid-section-header>*{border-bottom-width:0}.fc .fc-scrollgrid-section-body table,.fc .fc-scrollgrid-section-footer table{border-bottom-style:hidden}.fc .fc-scrollgrid-section-sticky>*{background:var(--fc-page-bg-color);position:sticky;z-index:3}.fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky>*{top:0}.fc .fc-scrollgrid-section-footer.fc-scrollgrid-section-sticky>*{bottom:0}.fc .fc-scrollgrid-sticky-shim{height:1px;margin-bottom:-1px}.fc-sticky{position:sticky}.fc .fc-view-harness{flex-grow:1;position:relative}.fc .fc-view-harness-active>.fc-view{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-col-header-cell-cushion{display:inline-block;padding:2px 4px}.fc .fc-bg-event,.fc .fc-highlight,.fc .fc-non-business{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-non-business{background:var(--fc-non-business-color)}.fc .fc-bg-event{background:var(--fc-bg-event-color);opacity:var(--fc-bg-event-opacity)}.fc .fc-bg-event .fc-event-title{font-size:var(--fc-small-font-size);font-style:italic;margin:.5em}.fc .fc-highlight{background:var(--fc-highlight-color)}.fc .fc-cell-shaded,.fc .fc-day-disabled{background:var(--fc-neutral-bg-color)}a.fc-event,a.fc-event:hover{text-decoration:none}.fc-event.fc-event-draggable,.fc-event[href]{cursor:pointer}.fc-event .fc-event-main{position:relative;z-index:2}.fc-event-dragging:not(.fc-event-selected){opacity:.75}.fc-event-dragging.fc-event-selected{box-shadow:0 2px 7px rgba(0,0,0,.3)}.fc-event .fc-event-resizer{display:none;position:absolute;z-index:4}.fc-event-selected .fc-event-resizer,.fc-event:hover .fc-event-resizer{display:block}.fc-event-selected .fc-event-resizer{background:var(--fc-page-bg-color);border-color:inherit;border-radius:calc(var(--fc-event-resizer-dot-total-width)/2);border-style:solid;border-width:var(--fc-event-resizer-dot-border-width);height:var(--fc-event-resizer-dot-total-width);width:var(--fc-event-resizer-dot-total-width)}.fc-event-selected .fc-event-resizer:before{bottom:-20px;content:"";left:-20px;position:absolute;right:-20px;top:-20px}.fc-event-selected,.fc-event:focus{box-shadow:0 2px 5px rgba(0,0,0,.2)}.fc-event-selected:before,.fc-event:focus:before{bottom:0;content:"";left:0;position:absolute;right:0;top:0;z-index:3}.fc-event-selected:after,.fc-event:focus:after{background:var(--fc-event-selected-overlay-color);bottom:-1px;content:"";left:-1px;position:absolute;right:-1px;top:-1px;z-index:1}.fc-h-event{background-color:var(--fc-event-bg-color);border:1px solid var(--fc-event-border-color);display:block}.fc-h-event .fc-event-main{color:var(--fc-event-text-color)}.fc-h-event .fc-event-main-frame{display:flex}.fc-h-event .fc-event-time{max-width:100%;overflow:hidden}.fc-h-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-width:0}.fc-h-event .fc-event-title{display:inline-block;left:0;max-width:100%;overflow:hidden;right:0;vertical-align:top}.fc-h-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-start),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-end){border-bottom-left-radius:0;border-left-width:0;border-top-left-radius:0}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-end),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-start){border-bottom-right-radius:0;border-right-width:0;border-top-right-radius:0}.fc-h-event:not(.fc-event-selected) .fc-event-resizer{bottom:0;top:0;width:var(--fc-event-resizer-thickness)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end{cursor:w-resize;left:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start{cursor:e-resize;right:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-h-event.fc-event-selected .fc-event-resizer{margin-top:calc(var(--fc-event-resizer-dot-total-width)*-.5);top:50%}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-start,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-end{left:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-end,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-start{right:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc .fc-popover{box-shadow:0 2px 6px rgba(0,0,0,.15);position:absolute;z-index:9999}.fc .fc-popover-header{align-items:center;display:flex;flex-direction:row;justify-content:space-between;padding:3px 4px}.fc .fc-popover-title{margin:0 2px}.fc .fc-popover-close{cursor:pointer;font-size:1.1em;opacity:.65}.fc-theme-standard .fc-popover{background:var(--fc-page-bg-color);border:1px solid var(--fc-border-color)}.fc-theme-standard .fc-popover-header{background:var(--fc-neutral-bg-color)}';
rr(Ul);
class ir {
  constructor(e) {
    this.drainedOption = e, this.isRunning = !1, this.isDirty = !1, this.pauseDepths = {}, this.timeoutId = 0;
  }
  request(e) {
    this.isDirty = !0, this.isPaused() || (this.clearTimeout(), e == null ? this.tryDrain() : this.timeoutId = setTimeout(
      // NOT OPTIMAL! TODO: look at debounce
      this.tryDrain.bind(this),
      e
    ));
  }
  pause(e = "") {
    let { pauseDepths: n } = this;
    n[e] = (n[e] || 0) + 1, this.clearTimeout();
  }
  resume(e = "", n) {
    let { pauseDepths: r } = this;
    e in r && (n ? delete r[e] : (r[e] -= 1, r[e] <= 0 && delete r[e]), this.tryDrain());
  }
  isPaused() {
    return Object.keys(this.pauseDepths).length;
  }
  tryDrain() {
    if (!this.isRunning && !this.isPaused()) {
      for (this.isRunning = !0; this.isDirty; )
        this.isDirty = !1, this.drained();
      this.isRunning = !1;
    }
  }
  clear() {
    this.clearTimeout(), this.isDirty = !1, this.pauseDepths = {};
  }
  clearTimeout() {
    this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = 0);
  }
  drained() {
    this.drainedOption && this.drainedOption();
  }
}
function sr(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function B(t, e) {
  if (t.closest)
    return t.closest(e);
  if (!document.documentElement.contains(t))
    return null;
  do {
    if (Fl(t, e))
      return t;
    t = t.parentElement || t.parentNode;
  } while (t !== null && t.nodeType === 1);
  return null;
}
function Fl(t, e) {
  return (t.matches || t.matchesSelector || t.msMatchesSelector).call(t, e);
}
function jl(t, e) {
  let n = t instanceof HTMLElement ? [t] : t, r = [];
  for (let i = 0; i < n.length; i += 1) {
    let s = n[i].querySelectorAll(e);
    for (let o = 0; o < s.length; o += 1)
      r.push(s[o]);
  }
  return r;
}
const Wl = /(top|left|right|bottom|width|height)$/i;
function nt(t, e) {
  for (let n in e)
    Us(t, n, e[n]);
}
function Us(t, e, n) {
  n == null ? t.style[e] = "" : typeof n == "number" && Wl.test(e) ? t.style[e] = `${n}px` : t.style[e] = n;
}
function Fs(t) {
  var e, n;
  return (n = (e = t.composedPath) === null || e === void 0 ? void 0 : e.call(t)[0]) !== null && n !== void 0 ? n : t.target;
}
let hi = 0;
function nn() {
  return hi += 1, "fc-dom-" + hi;
}
function rn(t) {
  t.preventDefault();
}
function Vl(t, e) {
  return (n) => {
    let r = B(n.target, t);
    r && e.call(r, n, r);
  };
}
function js(t, e, n, r) {
  let i = Vl(n, r);
  return t.addEventListener(e, i), () => {
    t.removeEventListener(e, i);
  };
}
function Gl(t, e, n, r) {
  let i;
  return js(t, "mouseover", e, (s, o) => {
    if (o !== i) {
      i = o, n(s, o);
      let a = (l) => {
        i = null, r(l, o), o.removeEventListener("mouseleave", a);
      };
      o.addEventListener("mouseleave", a);
    }
  });
}
const pi = [
  "webkitTransitionEnd",
  "otransitionend",
  "oTransitionEnd",
  "msTransitionEnd",
  "transitionend"
];
function ql(t, e) {
  let n = (r) => {
    e(r), pi.forEach((i) => {
      t.removeEventListener(i, n);
    });
  };
  pi.forEach((r) => {
    t.addEventListener(r, n);
  });
}
function Ws(t) {
  return Object.assign({ onClick: t }, Vs(t));
}
function Vs(t) {
  return {
    tabIndex: 0,
    onKeyDown(e) {
      (e.key === "Enter" || e.key === " ") && (t(e), e.preventDefault());
    }
  };
}
let gi = 0;
function ke() {
  return gi += 1, String(gi);
}
function or() {
  document.body.classList.add("fc-not-allowed");
}
function ar() {
  document.body.classList.remove("fc-not-allowed");
}
function Yl(t) {
  t.style.userSelect = "none", t.style.webkitUserSelect = "none", t.addEventListener("selectstart", rn);
}
function Ql(t) {
  t.style.userSelect = "", t.style.webkitUserSelect = "", t.removeEventListener("selectstart", rn);
}
function Zl(t) {
  t.addEventListener("contextmenu", rn);
}
function Kl(t) {
  t.removeEventListener("contextmenu", rn);
}
function Xl(t) {
  let e = [], n = [], r, i;
  for (typeof t == "string" ? n = t.split(/\s*,\s*/) : typeof t == "function" ? n = [t] : Array.isArray(t) && (n = t), r = 0; r < n.length; r += 1)
    i = n[r], typeof i == "string" ? e.push(i.charAt(0) === "-" ? { field: i.substring(1), order: -1 } : { field: i, order: 1 }) : typeof i == "function" && e.push({ func: i });
  return e;
}
function Jl(t, e, n) {
  let r, i;
  for (r = 0; r < n.length; r += 1)
    if (i = ec(t, e, n[r]), i)
      return i;
  return 0;
}
function ec(t, e, n) {
  return n.func ? n.func(t, e) : tc(t[n.field], e[n.field]) * (n.order || 1);
}
function tc(t, e) {
  return !t && !e ? 0 : e == null ? -1 : t == null ? 1 : typeof t == "string" || typeof e == "string" ? String(t).localeCompare(String(e)) : t - e;
}
function He(t, e) {
  let n = String(t);
  return "000".substr(0, e - n.length) + n;
}
function rt(t, e, n) {
  return typeof t == "function" ? t(...e) : typeof t == "string" ? e.reduce((r, i, s) => r.replace("$" + s, i || ""), t) : n;
}
function nc(t, e) {
  return t - e;
}
function _t(t) {
  return t % 1 === 0;
}
function rc(t) {
  let e = t.querySelector(".fc-scrollgrid-shrink-frame"), n = t.querySelector(".fc-scrollgrid-shrink-cushion");
  if (!e)
    throw new Error("needs fc-scrollgrid-shrink-frame className");
  if (!n)
    throw new Error("needs fc-scrollgrid-shrink-cushion className");
  return t.getBoundingClientRect().width - e.getBoundingClientRect().width + // the cell padding+border
  n.getBoundingClientRect().width;
}
const mi = ["years", "months", "days", "milliseconds"], ic = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
function _(t, e) {
  return typeof t == "string" ? sc(t) : typeof t == "object" && t ? vi(t) : typeof t == "number" ? vi({ [e || "milliseconds"]: t }) : null;
}
function sc(t) {
  let e = ic.exec(t);
  if (e) {
    let n = e[1] ? -1 : 1;
    return {
      years: 0,
      months: 0,
      days: n * (e[2] ? parseInt(e[2], 10) : 0),
      milliseconds: n * ((e[3] ? parseInt(e[3], 10) : 0) * 60 * 60 * 1e3 + // hours
      (e[4] ? parseInt(e[4], 10) : 0) * 60 * 1e3 + // minutes
      (e[5] ? parseInt(e[5], 10) : 0) * 1e3 + // seconds
      (e[6] ? parseInt(e[6], 10) : 0))
    };
  }
  return null;
}
function vi(t) {
  let e = {
    years: t.years || t.year || 0,
    months: t.months || t.month || 0,
    days: t.days || t.day || 0,
    milliseconds: (t.hours || t.hour || 0) * 60 * 60 * 1e3 + // hours
    (t.minutes || t.minute || 0) * 60 * 1e3 + // minutes
    (t.seconds || t.second || 0) * 1e3 + // seconds
    (t.milliseconds || t.millisecond || t.ms || 0)
    // ms
  }, n = t.weeks || t.week;
  return n && (e.days += n * 7, e.specifiedWeeks = !0), e;
}
function oc(t, e) {
  return t.years === e.years && t.months === e.months && t.days === e.days && t.milliseconds === e.milliseconds;
}
function Pn(t, e) {
  return {
    years: t.years + e.years,
    months: t.months + e.months,
    days: t.days + e.days,
    milliseconds: t.milliseconds + e.milliseconds
  };
}
function ac(t, e) {
  return {
    years: t.years - e.years,
    months: t.months - e.months,
    days: t.days - e.days,
    milliseconds: t.milliseconds - e.milliseconds
  };
}
function lc(t, e) {
  return {
    years: t.years * e,
    months: t.months * e,
    days: t.days * e,
    milliseconds: t.milliseconds * e
  };
}
function cc(t) {
  return Be(t) / 365;
}
function dc(t) {
  return Be(t) / 30;
}
function Be(t) {
  return G(t) / 864e5;
}
function G(t) {
  return t.years * (365 * 864e5) + t.months * (30 * 864e5) + t.days * 864e5 + t.milliseconds;
}
function lr(t, e) {
  let n = null;
  for (let r = 0; r < mi.length; r += 1) {
    let i = mi[r];
    if (e[i]) {
      let s = t[i] / e[i];
      if (!_t(s) || n !== null && n !== s)
        return null;
      n = s;
    } else if (t[i])
      return null;
  }
  return n;
}
function $n(t) {
  let e = t.milliseconds;
  if (e) {
    if (e % 1e3 !== 0)
      return { unit: "millisecond", value: e };
    if (e % (1e3 * 60) !== 0)
      return { unit: "second", value: e / 1e3 };
    if (e % (1e3 * 60 * 60) !== 0)
      return { unit: "minute", value: e / (1e3 * 60) };
    if (e)
      return { unit: "hour", value: e / (1e3 * 60 * 60) };
  }
  return t.days ? t.specifiedWeeks && t.days % 7 === 0 ? { unit: "week", value: t.days / 7 } : { unit: "day", value: t.days } : t.months ? { unit: "month", value: t.months } : t.years ? { unit: "year", value: t.years } : { unit: "millisecond", value: 0 };
}
function fe(t, e, n) {
  if (t === e)
    return !0;
  let r = t.length, i;
  if (r !== e.length)
    return !1;
  for (i = 0; i < r; i += 1)
    if (!(n ? n(t[i], e[i]) : t[i] === e[i]))
      return !1;
  return !0;
}
const uc = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
function bi(t, e) {
  let n = ce(t);
  return n[2] += e * 7, z(n);
}
function H(t, e) {
  let n = ce(t);
  return n[2] += e, z(n);
}
function he(t, e) {
  let n = ce(t);
  return n[6] += e, z(n);
}
function fc(t, e) {
  return Me(t, e) / 7;
}
function Me(t, e) {
  return (e.valueOf() - t.valueOf()) / (1e3 * 60 * 60 * 24);
}
function hc(t, e) {
  return (e.valueOf() - t.valueOf()) / (1e3 * 60 * 60);
}
function pc(t, e) {
  return (e.valueOf() - t.valueOf()) / (1e3 * 60);
}
function gc(t, e) {
  return (e.valueOf() - t.valueOf()) / 1e3;
}
function mc(t, e) {
  let n = M(t), r = M(e);
  return {
    years: 0,
    months: 0,
    days: Math.round(Me(n, r)),
    milliseconds: e.valueOf() - r.valueOf() - (t.valueOf() - n.valueOf())
  };
}
function vc(t, e) {
  let n = $t(t, e);
  return n !== null && n % 7 === 0 ? n / 7 : null;
}
function $t(t, e) {
  return de(t) === de(e) ? Math.round(Me(t, e)) : null;
}
function M(t) {
  return z([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ]);
}
function bc(t) {
  return z([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours()
  ]);
}
function yc(t) {
  return z([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours(),
    t.getUTCMinutes()
  ]);
}
function Ec(t) {
  return z([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours(),
    t.getUTCMinutes(),
    t.getUTCSeconds()
  ]);
}
function wc(t, e, n) {
  let r = t.getUTCFullYear(), i = gn(t, r, e, n);
  if (i < 1)
    return gn(t, r - 1, e, n);
  let s = gn(t, r + 1, e, n);
  return s >= 1 ? Math.min(i, s) : i;
}
function gn(t, e, n, r) {
  let i = z([e, 0, 1 + Sc(e, n, r)]), s = M(t), o = Math.round(Me(i, s));
  return Math.floor(o / 7) + 1;
}
function Sc(t, e, n) {
  let r = 7 + e - n;
  return -((7 + z([t, 0, r]).getUTCDay() - e) % 7) + r - 1;
}
function yi(t) {
  return [
    t.getFullYear(),
    t.getMonth(),
    t.getDate(),
    t.getHours(),
    t.getMinutes(),
    t.getSeconds(),
    t.getMilliseconds()
  ];
}
function Ei(t) {
  return new Date(
    t[0],
    t[1] || 0,
    t[2] == null ? 1 : t[2],
    // day of month
    t[3] || 0,
    t[4] || 0,
    t[5] || 0
  );
}
function ce(t) {
  return [
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours(),
    t.getUTCMinutes(),
    t.getUTCSeconds(),
    t.getUTCMilliseconds()
  ];
}
function z(t) {
  return t.length === 1 && (t = t.concat([0])), new Date(Date.UTC(...t));
}
function Gs(t) {
  return !isNaN(t.valueOf());
}
function de(t) {
  return t.getUTCHours() * 1e3 * 60 * 60 + t.getUTCMinutes() * 1e3 * 60 + t.getUTCSeconds() * 1e3 + t.getUTCMilliseconds();
}
function qs(t, e, n = !1) {
  let r = t.toISOString();
  return r = r.replace(".000", ""), n && (r = r.replace("T00:00:00Z", "")), r.length > 10 && (e == null ? r = r.replace("Z", "") : e !== 0 && (r = r.replace("Z", dr(e, !0)))), r;
}
function cr(t) {
  return t.toISOString().replace(/T.*$/, "");
}
function Ac(t) {
  return t.toISOString().match(/^\d{4}-\d{2}/)[0];
}
function Dc(t) {
  return He(t.getUTCHours(), 2) + ":" + He(t.getUTCMinutes(), 2) + ":" + He(t.getUTCSeconds(), 2);
}
function dr(t, e = !1) {
  let n = t < 0 ? "-" : "+", r = Math.abs(t), i = Math.floor(r / 60), s = Math.round(r % 60);
  return e ? `${n + He(i, 2)}:${He(s, 2)}` : `GMT${n}${i}${s ? `:${He(s, 2)}` : ""}`;
}
function A(t, e, n) {
  let r, i;
  return function(...s) {
    if (!r)
      i = t.apply(this, s);
    else if (!fe(r, s)) {
      let o = t.apply(this, s);
      (!e || !e(o, i)) && (i = o);
    }
    return r = s, i;
  };
}
function xt(t, e, n) {
  let r, i;
  return (s) => (r ? q(r, s) || (i = t.call(this, s)) : i = t.call(this, s), r = s, i);
}
const mn = {
  week: 3,
  separator: 9,
  omitZeroMinute: 9,
  meridiem: 9,
  omitCommas: 9
}, Ht = {
  timeZoneName: 7,
  era: 6,
  year: 5,
  month: 4,
  day: 2,
  weekday: 2,
  hour: 1,
  minute: 1,
  second: 1
}, gt = /\s*([ap])\.?m\.?/i, Cc = /,/g, _c = /\s+/g, xc = /\u200e/g, Rc = /UTC|GMT/;
class Tc {
  constructor(e) {
    let n = {}, r = {}, i = 9;
    for (let s in e)
      s in mn ? (r[s] = e[s], mn[s] < 9 && (i = Math.min(mn[s], i))) : (n[s] = e[s], s in Ht && (i = Math.min(Ht[s], i)));
    this.standardDateProps = n, this.extendedSettings = r, this.smallestUnitNum = i, this.buildFormattingFunc = A(wi);
  }
  format(e, n) {
    return this.buildFormattingFunc(this.standardDateProps, this.extendedSettings, n)(e);
  }
  formatRange(e, n, r, i) {
    let { standardDateProps: s, extendedSettings: o } = this, a = Pc(e.marker, n.marker, r.calendarSystem);
    if (!a)
      return this.format(e, r);
    let l = a;
    l > 1 && // the two dates are different in a way that's larger scale than time
    (s.year === "numeric" || s.year === "2-digit") && (s.month === "numeric" || s.month === "2-digit") && (s.day === "numeric" || s.day === "2-digit") && (l = 1);
    let d = this.format(e, r), c = this.format(n, r);
    if (d === c)
      return d;
    let h = $c(s, l), f = wi(h, o, r), u = f(e), g = f(n), m = Hc(d, u, c, g), b = o.separator || i || r.defaultSeparator || "";
    return m ? m.before + u + b + g + m.after : d + b + c;
  }
  getSmallestUnit() {
    switch (this.smallestUnitNum) {
      case 7:
      case 6:
      case 5:
        return "year";
      case 4:
        return "month";
      case 3:
        return "week";
      case 2:
        return "day";
      default:
        return "time";
    }
  }
}
function wi(t, e, n) {
  let r = Object.keys(t).length;
  return r === 1 && t.timeZoneName === "short" ? (i) => dr(i.timeZoneOffset) : r === 0 && e.week ? (i) => Oc(n.computeWeekNumber(i.marker), n.weekText, n.weekTextLong, n.locale, e.week) : kc(t, e, n);
}
function kc(t, e, n) {
  t = Object.assign({}, t), e = Object.assign({}, e), Mc(t, e), t.timeZone = "UTC";
  let r = new Intl.DateTimeFormat(n.locale.codes, t), i;
  if (e.omitZeroMinute) {
    let s = Object.assign({}, t);
    delete s.minute, i = new Intl.DateTimeFormat(n.locale.codes, s);
  }
  return (s) => {
    let { marker: o } = s, a;
    i && !o.getUTCMinutes() ? a = i : a = r;
    let l = a.format(o);
    return Ic(l, s, t, e, n);
  };
}
function Mc(t, e) {
  t.timeZoneName && (t.hour || (t.hour = "2-digit"), t.minute || (t.minute = "2-digit")), t.timeZoneName === "long" && (t.timeZoneName = "short"), e.omitZeroMinute && (t.second || t.millisecond) && delete e.omitZeroMinute;
}
function Ic(t, e, n, r, i) {
  return t = t.replace(xc, ""), n.timeZoneName === "short" && (t = Nc(t, i.timeZone === "UTC" || e.timeZoneOffset == null ? "UTC" : (
    // important to normalize for IE, which does "GMT"
    dr(e.timeZoneOffset)
  ))), r.omitCommas && (t = t.replace(Cc, "").trim()), r.omitZeroMinute && (t = t.replace(":00", "")), r.meridiem === !1 ? t = t.replace(gt, "").trim() : r.meridiem === "narrow" ? t = t.replace(gt, (s, o) => o.toLocaleLowerCase()) : r.meridiem === "short" ? t = t.replace(gt, (s, o) => `${o.toLocaleLowerCase()}m`) : r.meridiem === "lowercase" && (t = t.replace(gt, (s) => s.toLocaleLowerCase())), t = t.replace(_c, " "), t = t.trim(), t;
}
function Nc(t, e) {
  let n = !1;
  return t = t.replace(Rc, () => (n = !0, e)), n || (t += ` ${e}`), t;
}
function Oc(t, e, n, r, i) {
  let s = [];
  return i === "long" ? s.push(n) : (i === "short" || i === "narrow") && s.push(e), (i === "long" || i === "short") && s.push(" "), s.push(r.simpleNumberFormat.format(t)), r.options.direction === "rtl" && s.reverse(), s.join("");
}
function Pc(t, e, n) {
  return n.getMarkerYear(t) !== n.getMarkerYear(e) ? 5 : n.getMarkerMonth(t) !== n.getMarkerMonth(e) ? 4 : n.getMarkerDay(t) !== n.getMarkerDay(e) ? 2 : de(t) !== de(e) ? 1 : 0;
}
function $c(t, e) {
  let n = {};
  for (let r in t)
    (!(r in Ht) || // not a date part prop (like timeZone)
    Ht[r] <= e) && (n[r] = t[r]);
  return n;
}
function Hc(t, e, n, r) {
  let i = 0;
  for (; i < t.length; ) {
    let s = t.indexOf(e, i);
    if (s === -1)
      break;
    let o = t.substr(0, s);
    i = s + e.length;
    let a = t.substr(i), l = 0;
    for (; l < n.length; ) {
      let d = n.indexOf(r, l);
      if (d === -1)
        break;
      let c = n.substr(0, d);
      l = d + r.length;
      let h = n.substr(l);
      if (o === c && a === h)
        return {
          before: o,
          after: a
        };
    }
  }
  return null;
}
function Si(t, e) {
  let n = e.markerToArray(t.marker);
  return {
    marker: t.marker,
    timeZoneOffset: t.timeZoneOffset,
    array: n,
    year: n[0],
    month: n[1],
    day: n[2],
    hour: n[3],
    minute: n[4],
    second: n[5],
    millisecond: n[6]
  };
}
function Bt(t, e, n, r) {
  let i = Si(t, n.calendarSystem), s = e ? Si(e, n.calendarSystem) : null;
  return {
    date: i,
    start: i,
    end: s,
    timeZone: n.timeZone,
    localeCodes: n.locale.codes,
    defaultSeparator: r || n.defaultSeparator
  };
}
class Bc {
  constructor(e) {
    this.cmdStr = e;
  }
  format(e, n, r) {
    return n.cmdFormatter(this.cmdStr, Bt(e, null, n, r));
  }
  formatRange(e, n, r, i) {
    return r.cmdFormatter(this.cmdStr, Bt(e, n, r, i));
  }
}
class Lc {
  constructor(e) {
    this.func = e;
  }
  format(e, n, r) {
    return this.func(Bt(e, null, n, r));
  }
  formatRange(e, n, r, i) {
    return this.func(Bt(e, n, r, i));
  }
}
function O(t) {
  return typeof t == "object" && t ? new Tc(t) : typeof t == "string" ? new Bc(t) : typeof t == "function" ? new Lc(t) : null;
}
const Ai = {
  navLinkDayClick: v,
  navLinkWeekClick: v,
  duration: _,
  bootstrapFontAwesome: v,
  buttonIcons: v,
  customButtons: v,
  defaultAllDayEventDuration: _,
  defaultTimedEventDuration: _,
  nextDayThreshold: _,
  scrollTime: _,
  scrollTimeReset: Boolean,
  slotMinTime: _,
  slotMaxTime: _,
  dayPopoverFormat: O,
  slotDuration: _,
  snapDuration: _,
  headerToolbar: v,
  footerToolbar: v,
  defaultRangeSeparator: String,
  titleRangeSeparator: String,
  forceEventDuration: Boolean,
  dayHeaders: Boolean,
  dayHeaderFormat: O,
  dayHeaderClassNames: v,
  dayHeaderContent: v,
  dayHeaderDidMount: v,
  dayHeaderWillUnmount: v,
  dayCellClassNames: v,
  dayCellContent: v,
  dayCellDidMount: v,
  dayCellWillUnmount: v,
  initialView: String,
  aspectRatio: Number,
  weekends: Boolean,
  weekNumberCalculation: v,
  weekNumbers: Boolean,
  weekNumberClassNames: v,
  weekNumberContent: v,
  weekNumberDidMount: v,
  weekNumberWillUnmount: v,
  editable: Boolean,
  viewClassNames: v,
  viewDidMount: v,
  viewWillUnmount: v,
  nowIndicator: Boolean,
  nowIndicatorSnap: v,
  nowIndicatorClassNames: v,
  nowIndicatorContent: v,
  nowIndicatorDidMount: v,
  nowIndicatorWillUnmount: v,
  showNonCurrentDates: Boolean,
  lazyFetching: Boolean,
  startParam: String,
  endParam: String,
  timeZoneParam: String,
  timeZone: String,
  locales: v,
  locale: v,
  themeSystem: String,
  dragRevertDuration: Number,
  dragScroll: Boolean,
  allDayMaintainDuration: Boolean,
  unselectAuto: Boolean,
  dropAccept: v,
  eventOrder: Xl,
  eventOrderStrict: Boolean,
  handleWindowResize: Boolean,
  windowResizeDelay: Number,
  longPressDelay: Number,
  eventDragMinDistance: Number,
  expandRows: Boolean,
  height: v,
  contentHeight: v,
  direction: String,
  weekNumberFormat: O,
  eventResizableFromStart: Boolean,
  displayEventTime: Boolean,
  displayEventEnd: Boolean,
  weekText: String,
  weekTextLong: String,
  progressiveEventRendering: Boolean,
  businessHours: v,
  initialDate: v,
  now: v,
  eventDataTransform: v,
  stickyHeaderDates: v,
  stickyFooterScrollbar: v,
  viewHeight: v,
  defaultAllDay: Boolean,
  eventSourceFailure: v,
  eventSourceSuccess: v,
  eventDisplay: String,
  eventStartEditable: Boolean,
  eventDurationEditable: Boolean,
  eventOverlap: v,
  eventConstraint: v,
  eventAllow: v,
  eventBackgroundColor: String,
  eventBorderColor: String,
  eventTextColor: String,
  eventColor: String,
  eventClassNames: v,
  eventContent: v,
  eventDidMount: v,
  eventWillUnmount: v,
  selectConstraint: v,
  selectOverlap: v,
  selectAllow: v,
  droppable: Boolean,
  unselectCancel: String,
  slotLabelFormat: v,
  slotLaneClassNames: v,
  slotLaneContent: v,
  slotLaneDidMount: v,
  slotLaneWillUnmount: v,
  slotLabelClassNames: v,
  slotLabelContent: v,
  slotLabelDidMount: v,
  slotLabelWillUnmount: v,
  dayMaxEvents: v,
  dayMaxEventRows: v,
  dayMinWidth: Number,
  slotLabelInterval: _,
  allDayText: String,
  allDayClassNames: v,
  allDayContent: v,
  allDayDidMount: v,
  allDayWillUnmount: v,
  slotMinWidth: Number,
  navLinks: Boolean,
  eventTimeFormat: O,
  rerenderDelay: Number,
  moreLinkText: v,
  moreLinkHint: v,
  selectMinDistance: Number,
  selectable: Boolean,
  selectLongPressDelay: Number,
  eventLongPressDelay: Number,
  selectMirror: Boolean,
  eventMaxStack: Number,
  eventMinHeight: Number,
  eventMinWidth: Number,
  eventShortHeight: Number,
  slotEventOverlap: Boolean,
  plugins: v,
  firstDay: Number,
  dayCount: Number,
  dateAlignment: String,
  dateIncrement: _,
  hiddenDays: v,
  fixedWeekCount: Boolean,
  validRange: v,
  visibleRange: v,
  titleFormat: v,
  eventInteractive: Boolean,
  // only used by list-view, but languages define the value, so we need it in base options
  noEventsText: String,
  viewHint: v,
  navLinkHint: v,
  closeHint: String,
  timeHint: String,
  eventHint: String,
  moreLinkClick: v,
  moreLinkClassNames: v,
  moreLinkContent: v,
  moreLinkDidMount: v,
  moreLinkWillUnmount: v,
  monthStartFormat: O,
  // for connectors
  // (can't be part of plugin system b/c must be provided at runtime)
  handleCustomRendering: v,
  customRenderingMetaMap: v,
  customRenderingReplaces: Boolean
}, it = {
  eventDisplay: "auto",
  defaultRangeSeparator: " - ",
  titleRangeSeparator: " – ",
  defaultTimedEventDuration: "01:00:00",
  defaultAllDayEventDuration: { day: 1 },
  forceEventDuration: !1,
  nextDayThreshold: "00:00:00",
  dayHeaders: !0,
  initialView: "",
  aspectRatio: 1.35,
  headerToolbar: {
    start: "title",
    center: "",
    end: "today prev,next"
  },
  weekends: !0,
  weekNumbers: !1,
  weekNumberCalculation: "local",
  editable: !1,
  nowIndicator: !1,
  scrollTime: "06:00:00",
  scrollTimeReset: !0,
  slotMinTime: "00:00:00",
  slotMaxTime: "24:00:00",
  showNonCurrentDates: !0,
  lazyFetching: !0,
  startParam: "start",
  endParam: "end",
  timeZoneParam: "timeZone",
  timeZone: "local",
  locales: [],
  locale: "",
  themeSystem: "standard",
  dragRevertDuration: 500,
  dragScroll: !0,
  allDayMaintainDuration: !1,
  unselectAuto: !0,
  dropAccept: "*",
  eventOrder: "start,-duration,allDay,title",
  dayPopoverFormat: { month: "long", day: "numeric", year: "numeric" },
  handleWindowResize: !0,
  windowResizeDelay: 100,
  longPressDelay: 1e3,
  eventDragMinDistance: 5,
  expandRows: !1,
  navLinks: !1,
  selectable: !1,
  eventMinHeight: 15,
  eventMinWidth: 30,
  eventShortHeight: 30,
  monthStartFormat: { month: "long", day: "numeric" },
  nowIndicatorSnap: "auto"
}, Di = {
  datesSet: v,
  eventsSet: v,
  eventAdd: v,
  eventChange: v,
  eventRemove: v,
  windowResize: v,
  eventClick: v,
  eventMouseEnter: v,
  eventMouseLeave: v,
  select: v,
  unselect: v,
  loading: v,
  // internal
  _unmount: v,
  _beforeprint: v,
  _afterprint: v,
  _noEventDrop: v,
  _noEventResize: v,
  _resize: v,
  _scrollRequest: v
}, Ci = {
  buttonText: v,
  buttonHints: v,
  views: v,
  plugins: v,
  initialEvents: v,
  events: v,
  eventSources: v
}, Ee = {
  headerToolbar: we,
  footerToolbar: we,
  buttonText: we,
  buttonHints: we,
  buttonIcons: we,
  dateIncrement: we,
  plugins: mt,
  events: mt,
  eventSources: mt,
  resources: mt
};
function we(t, e) {
  return typeof t == "object" && typeof e == "object" && t && e ? q(t, e) : t === e;
}
function mt(t, e) {
  return Array.isArray(t) && Array.isArray(e) ? fe(t, e) : t === e;
}
const zc = {
  type: String,
  component: v,
  buttonText: String,
  buttonTextKey: String,
  dateProfileGeneratorClass: v,
  usesMinMaxTime: Boolean,
  classNames: v,
  content: v,
  didMount: v,
  willUnmount: v
};
function vn(t) {
  return fr(t, Ee);
}
function ur(t, e) {
  let n = {}, r = {};
  for (let i in e)
    i in t && (n[i] = e[i](t[i]));
  for (let i in t)
    i in e || (r[i] = t[i]);
  return { refined: n, extra: r };
}
function v(t) {
  return t;
}
const { hasOwnProperty: Lt } = Object.prototype;
function fr(t, e) {
  let n = {};
  if (e) {
    for (let r in e)
      if (e[r] === we) {
        let i = [];
        for (let s = t.length - 1; s >= 0; s -= 1) {
          let o = t[s][r];
          if (typeof o == "object" && o)
            i.unshift(o);
          else if (o !== void 0) {
            n[r] = o;
            break;
          }
        }
        i.length && (n[r] = fr(i));
      }
  }
  for (let r = t.length - 1; r >= 0; r -= 1) {
    let i = t[r];
    for (let s in i)
      s in n || (n[s] = i[s]);
  }
  return n;
}
function xe(t, e) {
  let n = {};
  for (let r in t)
    e(t[r], r) && (n[r] = t[r]);
  return n;
}
function re(t, e) {
  let n = {};
  for (let r in t)
    n[r] = e(t[r], r);
  return n;
}
function Ys(t) {
  let e = {};
  for (let n of t)
    e[n] = !0;
  return e;
}
function hr(t) {
  let e = [];
  for (let n in t)
    e.push(t[n]);
  return e;
}
function q(t, e) {
  if (t === e)
    return !0;
  for (let n in t)
    if (Lt.call(t, n) && !(n in e))
      return !1;
  for (let n in e)
    if (Lt.call(e, n) && t[n] !== e[n])
      return !1;
  return !0;
}
const Uc = /^on[A-Z]/;
function Fc(t, e) {
  const n = jc(t, e);
  for (let r of n)
    if (!Uc.test(r))
      return !1;
  return !0;
}
function jc(t, e) {
  let n = [];
  for (let r in t)
    Lt.call(t, r) && (r in e || n.push(r));
  for (let r in e)
    Lt.call(e, r) && t[r] !== e[r] && n.push(r);
  return n;
}
function bn(t, e, n = {}) {
  if (t === e)
    return !0;
  for (let r in e)
    if (!(r in t && Wc(t[r], e[r], n[r]))) return !1;
  for (let r in t)
    if (!(r in e))
      return !1;
  return !0;
}
function Wc(t, e, n) {
  return t === e || n === !0 ? !0 : n ? n(t, e) : !1;
}
function Vc(t, e = 0, n, r = 1) {
  let i = [];
  n == null && (n = Object.keys(t).length);
  for (let s = e; s < n; s += r) {
    let o = t[s];
    o !== void 0 && i.push(o);
  }
  return i;
}
let Qs = {};
function Gc(t, e) {
  Qs[t] = e;
}
function qc(t) {
  return new Qs[t]();
}
class Yc {
  getMarkerYear(e) {
    return e.getUTCFullYear();
  }
  getMarkerMonth(e) {
    return e.getUTCMonth();
  }
  getMarkerDay(e) {
    return e.getUTCDate();
  }
  arrayToMarker(e) {
    return z(e);
  }
  markerToArray(e) {
    return ce(e);
  }
}
Gc("gregory", Yc);
const Qc = /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;
function Zc(t) {
  let e = Qc.exec(t);
  if (e) {
    let n = new Date(Date.UTC(Number(e[1]), e[3] ? Number(e[3]) - 1 : 0, Number(e[5] || 1), Number(e[7] || 0), Number(e[8] || 0), Number(e[10] || 0), e[12] ? +`0.${e[12]}` * 1e3 : 0));
    if (Gs(n)) {
      let r = null;
      return e[13] && (r = (e[15] === "-" ? -1 : 1) * (Number(e[16] || 0) * 60 + Number(e[18] || 0))), {
        marker: n,
        isTimeUnspecified: !e[6],
        timeZoneOffset: r
      };
    }
  }
  return null;
}
class Kc {
  constructor(e) {
    let n = this.timeZone = e.timeZone, r = n !== "local" && n !== "UTC";
    e.namedTimeZoneImpl && r && (this.namedTimeZoneImpl = new e.namedTimeZoneImpl(n)), this.canComputeOffset = !!(!r || this.namedTimeZoneImpl), this.calendarSystem = qc(e.calendarSystem), this.locale = e.locale, this.weekDow = e.locale.week.dow, this.weekDoy = e.locale.week.doy, e.weekNumberCalculation === "ISO" && (this.weekDow = 1, this.weekDoy = 4), typeof e.firstDay == "number" && (this.weekDow = e.firstDay), typeof e.weekNumberCalculation == "function" && (this.weekNumberFunc = e.weekNumberCalculation), this.weekText = e.weekText != null ? e.weekText : e.locale.options.weekText, this.weekTextLong = (e.weekTextLong != null ? e.weekTextLong : e.locale.options.weekTextLong) || this.weekText, this.cmdFormatter = e.cmdFormatter, this.defaultSeparator = e.defaultSeparator;
  }
  // Creating / Parsing
  createMarker(e) {
    let n = this.createMarkerMeta(e);
    return n === null ? null : n.marker;
  }
  createNowMarker() {
    return this.canComputeOffset ? this.timestampToMarker((/* @__PURE__ */ new Date()).valueOf()) : z(yi(/* @__PURE__ */ new Date()));
  }
  createMarkerMeta(e) {
    if (typeof e == "string")
      return this.parse(e);
    let n = null;
    return typeof e == "number" ? n = this.timestampToMarker(e) : e instanceof Date ? (e = e.valueOf(), isNaN(e) || (n = this.timestampToMarker(e))) : Array.isArray(e) && (n = z(e)), n === null || !Gs(n) ? null : { marker: n, isTimeUnspecified: !1, forcedTzo: null };
  }
  parse(e) {
    let n = Zc(e);
    if (n === null)
      return null;
    let { marker: r } = n, i = null;
    return n.timeZoneOffset !== null && (this.canComputeOffset ? r = this.timestampToMarker(r.valueOf() - n.timeZoneOffset * 60 * 1e3) : i = n.timeZoneOffset), { marker: r, isTimeUnspecified: n.isTimeUnspecified, forcedTzo: i };
  }
  // Accessors
  getYear(e) {
    return this.calendarSystem.getMarkerYear(e);
  }
  getMonth(e) {
    return this.calendarSystem.getMarkerMonth(e);
  }
  getDay(e) {
    return this.calendarSystem.getMarkerDay(e);
  }
  // Adding / Subtracting
  add(e, n) {
    let r = this.calendarSystem.markerToArray(e);
    return r[0] += n.years, r[1] += n.months, r[2] += n.days, r[6] += n.milliseconds, this.calendarSystem.arrayToMarker(r);
  }
  subtract(e, n) {
    let r = this.calendarSystem.markerToArray(e);
    return r[0] -= n.years, r[1] -= n.months, r[2] -= n.days, r[6] -= n.milliseconds, this.calendarSystem.arrayToMarker(r);
  }
  addYears(e, n) {
    let r = this.calendarSystem.markerToArray(e);
    return r[0] += n, this.calendarSystem.arrayToMarker(r);
  }
  addMonths(e, n) {
    let r = this.calendarSystem.markerToArray(e);
    return r[1] += n, this.calendarSystem.arrayToMarker(r);
  }
  // Diffing Whole Units
  diffWholeYears(e, n) {
    let { calendarSystem: r } = this;
    return de(e) === de(n) && r.getMarkerDay(e) === r.getMarkerDay(n) && r.getMarkerMonth(e) === r.getMarkerMonth(n) ? r.getMarkerYear(n) - r.getMarkerYear(e) : null;
  }
  diffWholeMonths(e, n) {
    let { calendarSystem: r } = this;
    return de(e) === de(n) && r.getMarkerDay(e) === r.getMarkerDay(n) ? r.getMarkerMonth(n) - r.getMarkerMonth(e) + (r.getMarkerYear(n) - r.getMarkerYear(e)) * 12 : null;
  }
  // Range / Duration
  greatestWholeUnit(e, n) {
    let r = this.diffWholeYears(e, n);
    return r !== null ? { unit: "year", value: r } : (r = this.diffWholeMonths(e, n), r !== null ? { unit: "month", value: r } : (r = vc(e, n), r !== null ? { unit: "week", value: r } : (r = $t(e, n), r !== null ? { unit: "day", value: r } : (r = hc(e, n), _t(r) ? { unit: "hour", value: r } : (r = pc(e, n), _t(r) ? { unit: "minute", value: r } : (r = gc(e, n), _t(r) ? { unit: "second", value: r } : { unit: "millisecond", value: n.valueOf() - e.valueOf() }))))));
  }
  countDurationsBetween(e, n, r) {
    let i;
    return r.years && (i = this.diffWholeYears(e, n), i !== null) ? i / cc(r) : r.months && (i = this.diffWholeMonths(e, n), i !== null) ? i / dc(r) : r.days && (i = $t(e, n), i !== null) ? i / Be(r) : (n.valueOf() - e.valueOf()) / G(r);
  }
  // Start-Of
  // these DON'T return zoned-dates. only UTC start-of dates
  startOf(e, n) {
    return n === "year" ? this.startOfYear(e) : n === "month" ? this.startOfMonth(e) : n === "week" ? this.startOfWeek(e) : n === "day" ? M(e) : n === "hour" ? bc(e) : n === "minute" ? yc(e) : n === "second" ? Ec(e) : null;
  }
  startOfYear(e) {
    return this.calendarSystem.arrayToMarker([
      this.calendarSystem.getMarkerYear(e)
    ]);
  }
  startOfMonth(e) {
    return this.calendarSystem.arrayToMarker([
      this.calendarSystem.getMarkerYear(e),
      this.calendarSystem.getMarkerMonth(e)
    ]);
  }
  startOfWeek(e) {
    return this.calendarSystem.arrayToMarker([
      this.calendarSystem.getMarkerYear(e),
      this.calendarSystem.getMarkerMonth(e),
      e.getUTCDate() - (e.getUTCDay() - this.weekDow + 7) % 7
    ]);
  }
  // Week Number
  computeWeekNumber(e) {
    return this.weekNumberFunc ? this.weekNumberFunc(this.toDate(e)) : wc(e, this.weekDow, this.weekDoy);
  }
  // TODO: choke on timeZoneName: long
  format(e, n, r = {}) {
    return n.format({
      marker: e,
      timeZoneOffset: r.forcedTzo != null ? r.forcedTzo : this.offsetForMarker(e)
    }, this);
  }
  formatRange(e, n, r, i = {}) {
    return i.isEndExclusive && (n = he(n, -1)), r.formatRange({
      marker: e,
      timeZoneOffset: i.forcedStartTzo != null ? i.forcedStartTzo : this.offsetForMarker(e)
    }, {
      marker: n,
      timeZoneOffset: i.forcedEndTzo != null ? i.forcedEndTzo : this.offsetForMarker(n)
    }, this, i.defaultSeparator);
  }
  /*
  DUMB: the omitTime arg is dumb. if we omit the time, we want to omit the timezone offset. and if we do that,
  might as well use buildIsoString or some other util directly
  */
  formatIso(e, n = {}) {
    let r = null;
    return n.omitTimeZoneOffset || (n.forcedTzo != null ? r = n.forcedTzo : r = this.offsetForMarker(e)), qs(e, r, n.omitTime);
  }
  // TimeZone
  timestampToMarker(e) {
    return this.timeZone === "local" ? z(yi(new Date(e))) : this.timeZone === "UTC" || !this.namedTimeZoneImpl ? new Date(e) : z(this.namedTimeZoneImpl.timestampToArray(e));
  }
  offsetForMarker(e) {
    return this.timeZone === "local" ? -Ei(ce(e)).getTimezoneOffset() : this.timeZone === "UTC" ? 0 : this.namedTimeZoneImpl ? this.namedTimeZoneImpl.offsetForArray(ce(e)) : null;
  }
  // Conversion
  toDate(e, n) {
    return this.timeZone === "local" ? Ei(ce(e)) : this.timeZone === "UTC" ? new Date(e.valueOf()) : this.namedTimeZoneImpl ? new Date(e.valueOf() - this.namedTimeZoneImpl.offsetForArray(ce(e)) * 1e3 * 60) : new Date(e.valueOf() - (n || 0));
  }
}
class ut {
  constructor(e) {
    this.iconOverrideOption && this.setIconOverride(e[this.iconOverrideOption]);
  }
  setIconOverride(e) {
    let n, r;
    if (typeof e == "object" && e) {
      n = Object.assign({}, this.iconClasses);
      for (r in e)
        n[r] = this.applyIconOverridePrefix(e[r]);
      this.iconClasses = n;
    } else e === !1 && (this.iconClasses = {});
  }
  applyIconOverridePrefix(e) {
    let n = this.iconOverridePrefix;
    return n && e.indexOf(n) !== 0 && (e = n + e), e;
  }
  getClass(e) {
    return this.classes[e] || "";
  }
  getIconClass(e, n) {
    let r;
    return n && this.rtlIconClasses ? r = this.rtlIconClasses[e] || this.iconClasses[e] : r = this.iconClasses[e], r ? `${this.baseIconClass} ${r}` : "";
  }
  getCustomButtonIconClass(e) {
    let n;
    return this.iconOverrideCustomButtonOption && (n = e[this.iconOverrideCustomButtonOption], n) ? `${this.baseIconClass} ${this.applyIconOverridePrefix(n)}` : "";
  }
}
ut.prototype.classes = {};
ut.prototype.iconClasses = {};
ut.prototype.baseIconClass = "";
ut.prototype.iconOverridePrefix = "";
function zt(t) {
  t();
  let e = S.debounceRendering, n = [];
  function r(i) {
    n.push(i);
  }
  for (S.debounceRendering = r, lt(p(Xc, {}), document.createElement("div")); n.length; )
    n.shift()();
  S.debounceRendering = e;
}
class Xc extends F {
  render() {
    return p("div", {});
  }
  componentDidMount() {
    this.setState({});
  }
}
function Zs(t) {
  let e = Sl(t), n = e.Provider;
  return e.Provider = function() {
    let r = !this.getChildContext, i = n.apply(this, arguments);
    if (r) {
      let s = [];
      this.shouldComponentUpdate = (o) => {
        this.props.value !== o.value && s.forEach((a) => {
          a.context = o.value, a.forceUpdate();
        });
      }, this.sub = (o) => {
        s.push(o);
        let a = o.componentWillUnmount;
        o.componentWillUnmount = () => {
          s.splice(s.indexOf(o), 1), a && a.call(o);
        };
      };
    }
    return i;
  }, e;
}
class Jc {
  constructor(e, n, r, i) {
    this.execFunc = e, this.emitter = n, this.scrollTime = r, this.scrollTimeReset = i, this.handleScrollRequest = (s) => {
      this.queuedRequest = Object.assign({}, this.queuedRequest || {}, s), this.drain();
    }, n.on("_scrollRequest", this.handleScrollRequest), this.fireInitialScroll();
  }
  detach() {
    this.emitter.off("_scrollRequest", this.handleScrollRequest);
  }
  update(e) {
    e && this.scrollTimeReset ? this.fireInitialScroll() : this.drain();
  }
  fireInitialScroll() {
    this.handleScrollRequest({
      time: this.scrollTime
    });
  }
  drain() {
    this.queuedRequest && this.execFunc(this.queuedRequest) && (this.queuedRequest = null);
  }
}
const ie = Zs({});
function ed(t, e, n, r, i, s, o, a, l, d, c, h, f, u) {
  return {
    dateEnv: i,
    nowManager: s,
    options: n,
    pluginHooks: a,
    emitter: c,
    dispatch: l,
    getCurrentData: d,
    calendarApi: h,
    viewSpec: t,
    viewApi: e,
    dateProfileGenerator: r,
    theme: o,
    isRtl: n.direction === "rtl",
    addResizeHandler(g) {
      c.on("_resize", g);
    },
    removeResizeHandler(g) {
      c.off("_resize", g);
    },
    createScrollResponder(g) {
      return new Jc(g, c, _(n.scrollTime), n.scrollTimeReset);
    },
    registerInteractiveComponent: f,
    unregisterInteractiveComponent: u
  };
}
class Ie extends F {
  // debug: boolean
  shouldComponentUpdate(e, n) {
    return !bn(
      this.props,
      e,
      this.propEquality
      /*, this.debug */
    ) || !bn(
      this.state,
      n,
      this.stateEquality
      /*, this.debug */
    );
  }
  // HACK for freakin' React StrictMode
  safeSetState(e) {
    bn(this.state, Object.assign(Object.assign({}, this.state), e), this.stateEquality) || this.setState(e);
  }
}
Ie.addPropsEquality = td;
Ie.addStateEquality = nd;
Ie.contextType = ie;
Ie.prototype.propEquality = {};
Ie.prototype.stateEquality = {};
class R extends Ie {
}
R.contextType = ie;
function td(t) {
  let e = Object.create(this.prototype.propEquality);
  Object.assign(e, t), this.prototype.propEquality = e;
}
function nd(t) {
  let e = Object.create(this.prototype.stateEquality);
  Object.assign(e, t), this.prototype.stateEquality = e;
}
function Z(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
class pr extends R {
  constructor() {
    super(...arguments), this.id = ke(), this.queuedDomNodes = [], this.currentDomNodes = [], this.handleEl = (e) => {
      const { options: n } = this.context, { generatorName: r } = this.props;
      (!n.customRenderingReplaces || !Hn(r, n)) && this.updateElRef(e);
    }, this.updateElRef = (e) => {
      this.props.elRef && Z(this.props.elRef, e);
    };
  }
  render() {
    const { props: e, context: n } = this, { options: r } = n, { customGenerator: i, defaultGenerator: s, renderProps: o } = e, a = Ks(e, [], this.handleEl);
    let l = !1, d, c = [], h;
    if (i != null) {
      const f = typeof i == "function" ? i(o, p) : i;
      if (f === !0)
        l = !0;
      else {
        const u = f && typeof f == "object";
        u && "html" in f ? a.dangerouslySetInnerHTML = { __html: f.html } : u && "domNodes" in f ? c = Array.prototype.slice.call(f.domNodes) : (u ? ws(f) : typeof f != "function") ? d = f : h = f;
      }
    } else
      l = !Hn(e.generatorName, r);
    return l && s && (d = s(o)), this.queuedDomNodes = c, this.currentGeneratorMeta = h, p(e.elTag, a, d);
  }
  componentDidMount() {
    this.applyQueueudDomNodes(), this.triggerCustomRendering(!0);
  }
  componentDidUpdate() {
    this.applyQueueudDomNodes(), this.triggerCustomRendering(!0);
  }
  componentWillUnmount() {
    this.triggerCustomRendering(!1);
  }
  triggerCustomRendering(e) {
    var n;
    const { props: r, context: i } = this, { handleCustomRendering: s, customRenderingMetaMap: o } = i.options;
    if (s) {
      const a = (n = this.currentGeneratorMeta) !== null && n !== void 0 ? n : o?.[r.generatorName];
      a && s(Object.assign(Object.assign({
        id: this.id,
        isActive: e,
        containerEl: this.base,
        reportNewContainerEl: this.updateElRef,
        // front-end framework tells us about new container els
        generatorMeta: a
      }, r), { elClasses: (r.elClasses || []).filter(rd) }));
    }
  }
  applyQueueudDomNodes() {
    const { queuedDomNodes: e, currentDomNodes: n } = this, r = this.base;
    if (!fe(e, n)) {
      n.forEach(sr);
      for (let i of e)
        r.appendChild(i);
      this.currentDomNodes = e;
    }
  }
}
pr.addPropsEquality({
  elClasses: fe,
  elStyle: q,
  elAttrs: Fc,
  renderProps: q
});
function Hn(t, e) {
  var n;
  return !!(e.handleCustomRendering && t && (!((n = e.customRenderingMetaMap) === null || n === void 0) && n[t]));
}
function Ks(t, e, n) {
  const r = Object.assign(Object.assign({}, t.elAttrs), { ref: n });
  return (t.elClasses || e) && (r.className = (t.elClasses || []).concat(e || []).concat(r.className || []).filter(Boolean).join(" ")), t.elStyle && (r.style = t.elStyle), r;
}
function rd(t) {
  return !!t;
}
const Xs = Zs(0);
class W extends F {
  constructor() {
    super(...arguments), this.InnerContent = id.bind(void 0, this), this.handleEl = (e) => {
      this.el = e, this.props.elRef && (Z(this.props.elRef, e), e && this.didMountMisfire && this.componentDidMount());
    };
  }
  render() {
    const { props: e } = this, n = sd(e.classNameGenerator, e.renderProps);
    if (e.children) {
      const r = Ks(e, n, this.handleEl), i = e.children(this.InnerContent, e.renderProps, r);
      return e.elTag ? p(e.elTag, r, i) : i;
    } else
      return p(pr, Object.assign(Object.assign({}, e), { elRef: this.handleEl, elTag: e.elTag || "div", elClasses: (e.elClasses || []).concat(n), renderId: this.context }));
  }
  componentDidMount() {
    var e, n;
    this.el ? (n = (e = this.props).didMount) === null || n === void 0 || n.call(e, Object.assign(Object.assign({}, this.props.renderProps), { el: this.el })) : this.didMountMisfire = !0;
  }
  componentWillUnmount() {
    var e, n;
    (n = (e = this.props).willUnmount) === null || n === void 0 || n.call(e, Object.assign(Object.assign({}, this.props.renderProps), { el: this.el }));
  }
}
W.contextType = Xs;
function id(t, e) {
  const n = t.props;
  return p(pr, Object.assign({ renderProps: n.renderProps, generatorName: n.generatorName, customGenerator: n.customGenerator, defaultGenerator: n.defaultGenerator, renderId: t.context }, e));
}
function sd(t, e) {
  const n = typeof t == "function" ? t(e) : t || [];
  return typeof n == "string" ? [n] : n;
}
class Ut extends R {
  render() {
    let { props: e, context: n } = this, { options: r } = n, i = { view: n.viewApi };
    return p(W, { elRef: e.elRef, elTag: e.elTag || "div", elAttrs: e.elAttrs, elClasses: [
      ...Js(e.viewSpec),
      ...e.elClasses || []
    ], elStyle: e.elStyle, renderProps: i, classNameGenerator: r.viewClassNames, generatorName: void 0, didMount: r.viewDidMount, willUnmount: r.viewWillUnmount }, () => e.children);
  }
}
function Js(t) {
  return [
    `fc-${t.type}-view`,
    "fc-view"
  ];
}
function od(t, e) {
  let n = null, r = null;
  return t.start && (n = e.createMarker(t.start)), t.end && (r = e.createMarker(t.end)), !n && !r || n && r && r < n ? null : { start: n, end: r };
}
function _i(t, e) {
  let n = [], { start: r } = e, i, s;
  for (t.sort(ad), i = 0; i < t.length; i += 1)
    s = t[i], s.start > r && n.push({ start: r, end: s.start }), s.end > r && (r = s.end);
  return r < e.end && n.push({ start: r, end: e.end }), n;
}
function ad(t, e) {
  return t.start.valueOf() - e.start.valueOf();
}
function Re(t, e) {
  let { start: n, end: r } = t, i = null;
  return e.start !== null && (n === null ? n = e.start : n = new Date(Math.max(n.valueOf(), e.start.valueOf()))), e.end != null && (r === null ? r = e.end : r = new Date(Math.min(r.valueOf(), e.end.valueOf()))), (n === null || r === null || n < r) && (i = { start: n, end: r }), i;
}
function ld(t, e) {
  return (t.start === null ? null : t.start.valueOf()) === (e.start === null ? null : e.start.valueOf()) && (t.end === null ? null : t.end.valueOf()) === (e.end === null ? null : e.end.valueOf());
}
function gr(t, e) {
  return (t.end === null || e.start === null || t.end > e.start) && (t.start === null || e.end === null || t.start < e.end);
}
function sn(t, e) {
  return (t.start === null || e.start !== null && e.start >= t.start) && (t.end === null || e.end !== null && e.end <= t.end);
}
function ne(t, e) {
  return (t.start === null || e >= t.start) && (t.end === null || e < t.end);
}
function cd(t, e) {
  return e.start != null && t < e.start ? e.start : e.end != null && t >= e.end ? new Date(e.end.valueOf() - 1) : t;
}
function eo(t) {
  let e = Math.floor(Me(t.start, t.end)) || 1, n = M(t.start), r = H(n, e);
  return { start: n, end: r };
}
function to(t, e = _(0)) {
  let n = null, r = null;
  if (t.end) {
    r = M(t.end);
    let i = t.end.valueOf() - r.valueOf();
    i && i >= G(e) && (r = H(r, 1));
  }
  return t.start && (n = M(t.start), r && r <= n && (r = H(n, 1))), { start: n, end: r };
}
function Pe(t, e, n, r) {
  return r === "year" ? _(n.diffWholeYears(t, e), "year") : r === "month" ? _(n.diffWholeMonths(t, e), "month") : mc(t, e);
}
class no {
  constructor(e) {
    this.props = e, this.initHiddenDays();
  }
  /* Date Range Computation
  ------------------------------------------------------------------------------------------------------------------*/
  // Builds a structure with info about what the dates/ranges will be for the "prev" view.
  buildPrev(e, n, r) {
    let { dateEnv: i } = this.props, s = i.subtract(
      i.startOf(n, e.currentRangeUnit),
      // important for start-of-month
      e.dateIncrement
    );
    return this.build(s, -1, r);
  }
  // Builds a structure with info about what the dates/ranges will be for the "next" view.
  buildNext(e, n, r) {
    let { dateEnv: i } = this.props, s = i.add(
      i.startOf(n, e.currentRangeUnit),
      // important for start-of-month
      e.dateIncrement
    );
    return this.build(s, 1, r);
  }
  // Builds a structure holding dates/ranges for rendering around the given date.
  // Optional direction param indicates whether the date is being incremented/decremented
  // from its previous value. decremented = -1, incremented = 1 (default).
  build(e, n, r = !0) {
    let { props: i } = this, s, o, a, l, d, c;
    return s = this.buildValidRange(), s = this.trimHiddenDays(s), r && (e = cd(e, s)), o = this.buildCurrentRangeInfo(e, n), a = /^(year|month|week|day)$/.test(o.unit), l = this.buildRenderRange(this.trimHiddenDays(o.range), o.unit, a), l = this.trimHiddenDays(l), d = l, i.showNonCurrentDates || (d = Re(d, o.range)), d = this.adjustActiveRange(d), d = Re(d, s), c = gr(o.range, s), ne(l, e) || (e = l.start), {
      currentDate: e,
      // constraint for where prev/next operations can go and where events can be dragged/resized to.
      // an object with optional start and end properties.
      validRange: s,
      // range the view is formally responsible for.
      // for example, a month view might have 1st-31st, excluding padded dates
      currentRange: o.range,
      // name of largest unit being displayed, like "month" or "week"
      currentRangeUnit: o.unit,
      isRangeAllDay: a,
      // dates that display events and accept drag-n-drop
      // will be `null` if no dates accept events
      activeRange: d,
      // date range with a rendered skeleton
      // includes not-active days that need some sort of DOM
      renderRange: l,
      // Duration object that denotes the first visible time of any given day
      slotMinTime: i.slotMinTime,
      // Duration object that denotes the exclusive visible end time of any given day
      slotMaxTime: i.slotMaxTime,
      isValid: c,
      // how far the current date will move for a prev/next operation
      dateIncrement: this.buildDateIncrement(o.duration)
      // pass a fallback (might be null) ^
    };
  }
  // Builds an object with optional start/end properties.
  // Indicates the minimum/maximum dates to display.
  // not responsible for trimming hidden days.
  buildValidRange() {
    let e = this.props.validRangeInput, n = typeof e == "function" ? e.call(this.props.calendarApi, this.props.dateEnv.toDate(this.props.nowManager.getDateMarker())) : e;
    return this.refineRange(n) || { start: null, end: null };
  }
  // Builds a structure with info about the "current" range, the range that is
  // highlighted as being the current month for example.
  // See build() for a description of `direction`.
  // Guaranteed to have `range` and `unit` properties. `duration` is optional.
  buildCurrentRangeInfo(e, n) {
    let { props: r } = this, i = null, s = null, o = null, a;
    return r.duration ? (i = r.duration, s = r.durationUnit, o = this.buildRangeFromDuration(e, n, i, s)) : (a = this.props.dayCount) ? (s = "day", o = this.buildRangeFromDayCount(e, n, a)) : (o = this.buildCustomVisibleRange(e)) ? s = r.dateEnv.greatestWholeUnit(o.start, o.end).unit : (i = this.getFallbackDuration(), s = $n(i).unit, o = this.buildRangeFromDuration(e, n, i, s)), { duration: i, unit: s, range: o };
  }
  getFallbackDuration() {
    return _({ day: 1 });
  }
  // Returns a new activeRange to have time values (un-ambiguate)
  // slotMinTime or slotMaxTime causes the range to expand.
  adjustActiveRange(e) {
    let { dateEnv: n, usesMinMaxTime: r, slotMinTime: i, slotMaxTime: s } = this.props, { start: o, end: a } = e;
    return r && (Be(i) < 0 && (o = M(o), o = n.add(o, i)), Be(s) > 1 && (a = M(a), a = H(a, -1), a = n.add(a, s))), { start: o, end: a };
  }
  // Builds the "current" range when it is specified as an explicit duration.
  // `unit` is the already-computed greatestDurationDenominator unit of duration.
  buildRangeFromDuration(e, n, r, i) {
    let { dateEnv: s, dateAlignment: o } = this.props, a, l, d;
    if (!o) {
      let { dateIncrement: h } = this.props;
      h && G(h) < G(r) ? o = $n(h).unit : o = i;
    }
    Be(r) <= 1 && this.isHiddenDay(a) && (a = this.skipHiddenDays(a, n), a = M(a));
    function c() {
      a = s.startOf(e, o), l = s.add(a, r), d = { start: a, end: l };
    }
    return c(), this.trimHiddenDays(d) || (e = this.skipHiddenDays(e, n), c()), d;
  }
  // Builds the "current" range when a dayCount is specified.
  buildRangeFromDayCount(e, n, r) {
    let { dateEnv: i, dateAlignment: s } = this.props, o = 0, a = e, l;
    s && (a = i.startOf(a, s)), a = M(a), a = this.skipHiddenDays(a, n), l = a;
    do
      l = H(l, 1), this.isHiddenDay(l) || (o += 1);
    while (o < r);
    return { start: a, end: l };
  }
  // Builds a normalized range object for the "visible" range,
  // which is a way to define the currentRange and activeRange at the same time.
  buildCustomVisibleRange(e) {
    let { props: n } = this, r = n.visibleRangeInput, i = typeof r == "function" ? r.call(n.calendarApi, n.dateEnv.toDate(e)) : r, s = this.refineRange(i);
    return s && (s.start == null || s.end == null) ? null : s;
  }
  // Computes the range that will represent the element/cells for *rendering*,
  // but which may have voided days/times.
  // not responsible for trimming hidden days.
  buildRenderRange(e, n, r) {
    return e;
  }
  // Compute the duration value that should be added/substracted to the current date
  // when a prev/next operation happens.
  buildDateIncrement(e) {
    let { dateIncrement: n } = this.props, r;
    return n || ((r = this.props.dateAlignment) ? _(1, r) : e || _({ days: 1 }));
  }
  refineRange(e) {
    if (e) {
      let n = od(e, this.props.dateEnv);
      return n && (n = to(n)), n;
    }
    return null;
  }
  /* Hidden Days
  ------------------------------------------------------------------------------------------------------------------*/
  // Initializes internal variables related to calculating hidden days-of-week
  initHiddenDays() {
    let e = this.props.hiddenDays || [], n = [], r = 0, i;
    for (this.props.weekends === !1 && e.push(0, 6), i = 0; i < 7; i += 1)
      (n[i] = e.indexOf(i) !== -1) || (r += 1);
    if (!r)
      throw new Error("invalid hiddenDays");
    this.isHiddenDayHash = n;
  }
  // Remove days from the beginning and end of the range that are computed as hidden.
  // If the whole range is trimmed off, returns null
  trimHiddenDays(e) {
    let { start: n, end: r } = e;
    return n && (n = this.skipHiddenDays(n)), r && (r = this.skipHiddenDays(r, -1, !0)), n == null || r == null || n < r ? { start: n, end: r } : null;
  }
  // Is the current day hidden?
  // `day` is a day-of-week index (0-6), or a Date (used for UTC)
  isHiddenDay(e) {
    return e instanceof Date && (e = e.getUTCDay()), this.isHiddenDayHash[e];
  }
  // Incrementing the current day until it is no longer a hidden day, returning a copy.
  // DOES NOT CONSIDER validRange!
  // If the initial value of `date` is not a hidden day, don't do anything.
  // Pass `isExclusive` as `true` if you are dealing with an end date.
  // `inc` defaults to `1` (increment one day forward each time)
  skipHiddenDays(e, n = 1, r = !1) {
    for (; this.isHiddenDayHash[(e.getUTCDay() + (r ? n : 0) + 7) % 7]; )
      e = H(e, n);
    return e;
  }
}
function mr(t, e, n, r) {
  return {
    instanceId: ke(),
    defId: t,
    range: e,
    forcedStartTzo: n ?? null,
    forcedEndTzo: r ?? null
  };
}
function dd(t, e, n, r) {
  for (let i = 0; i < r.length; i += 1) {
    let s = r[i].parse(t, n);
    if (s) {
      let { allDay: o } = t;
      return o == null && (o = e, o == null && (o = s.allDayGuess, o == null && (o = !1))), {
        allDay: o,
        duration: s.duration,
        typeData: s.typeData,
        typeId: i
      };
    }
  }
  return null;
}
function Te(t, e, n) {
  let { dateEnv: r, pluginHooks: i, options: s } = n, { defs: o, instances: a } = t;
  a = xe(a, (l) => !o[l.defId].recurringDef);
  for (let l in o) {
    let d = o[l];
    if (d.recurringDef) {
      let { duration: c } = d.recurringDef;
      c || (c = d.allDay ? s.defaultAllDayEventDuration : s.defaultTimedEventDuration);
      let h = ud(d, c, e, r, i.recurringTypes);
      for (let f of h) {
        let u = mr(l, {
          start: f,
          end: r.add(f, c)
        });
        a[u.instanceId] = u;
      }
    }
  }
  return { defs: o, instances: a };
}
function ud(t, e, n, r, i) {
  let o = i[t.recurringDef.typeId].expand(t.recurringDef.typeData, {
    start: r.subtract(n.start, e),
    end: n.end
  }, r);
  return t.allDay && (o = o.map(M)), o;
}
const Rt = {
  id: String,
  groupId: String,
  title: String,
  url: String,
  interactive: Boolean
}, ro = {
  start: v,
  end: v,
  date: v,
  allDay: Boolean
}, fd = Object.assign(Object.assign(Object.assign({}, Rt), ro), { extendedProps: v });
function io(t, e, n, r, i = vr(n), s, o) {
  let { refined: a, extra: l } = so(t, n, i), d = pd(e, n), c = dd(a, d, n.dateEnv, n.pluginHooks.recurringTypes);
  if (c) {
    let f = Bn(a, l, e ? e.sourceId : "", c.allDay, !!c.duration, n, s);
    return f.recurringDef = {
      typeId: c.typeId,
      typeData: c.typeData,
      duration: c.duration
    }, { def: f, instance: null };
  }
  let h = hd(a, d, n, r);
  if (h) {
    let f = Bn(a, l, e ? e.sourceId : "", h.allDay, h.hasEnd, n, s), u = mr(f.defId, h.range, h.forcedStartTzo, h.forcedEndTzo);
    return o && f.publicId && o[f.publicId] && (u.instanceId = o[f.publicId]), { def: f, instance: u };
  }
  return null;
}
function so(t, e, n = vr(e)) {
  return ur(t, n);
}
function vr(t) {
  return Object.assign(Object.assign(Object.assign({}, Ft), fd), t.pluginHooks.eventRefiners);
}
function Bn(t, e, n, r, i, s, o) {
  let a = {
    title: t.title || "",
    groupId: t.groupId || "",
    publicId: t.id || "",
    url: t.url || "",
    recurringDef: null,
    defId: (o && t.id ? o[t.id] : "") || ke(),
    sourceId: n,
    allDay: r,
    hasEnd: i,
    interactive: t.interactive,
    ui: jt(t, s),
    extendedProps: Object.assign(Object.assign({}, t.extendedProps || {}), e)
  };
  for (let l of s.pluginHooks.eventDefMemberAdders)
    Object.assign(a, l(t));
  return Object.freeze(a.ui.classNames), Object.freeze(a.extendedProps), a;
}
function hd(t, e, n, r) {
  let { allDay: i } = t, s, o = null, a = !1, l, d = null, c = t.start != null ? t.start : t.date;
  if (s = n.dateEnv.createMarkerMeta(c), s)
    o = s.marker;
  else if (!r)
    return null;
  return t.end != null && (l = n.dateEnv.createMarkerMeta(t.end)), i == null && (e != null ? i = e : i = (!s || s.isTimeUnspecified) && (!l || l.isTimeUnspecified)), i && o && (o = M(o)), l && (d = l.marker, i && (d = M(d)), o && d <= o && (d = null)), d ? a = !0 : r || (a = n.options.forceEventDuration || !1, d = n.dateEnv.add(o, i ? n.options.defaultAllDayEventDuration : n.options.defaultTimedEventDuration)), {
    allDay: i,
    hasEnd: a,
    range: { start: o, end: d },
    forcedStartTzo: s ? s.forcedTzo : null,
    forcedEndTzo: l ? l.forcedTzo : null
  };
}
function pd(t, e) {
  let n = null;
  return t && (n = t.defaultAllDay), n == null && (n = e.options.defaultAllDay), n;
}
function ct(t, e, n, r, i, s) {
  let o = j(), a = vr(n);
  for (let l of t) {
    let d = io(l, e, n, r, a, i, s);
    d && Ln(d, o);
  }
  return o;
}
function Ln(t, e = j()) {
  return e.defs[t.def.defId] = t.def, t.instance && (e.instances[t.instance.instanceId] = t.instance), e;
}
function br(t, e) {
  let n = t.instances[e];
  if (n) {
    let r = t.defs[n.defId], i = on(t, (s) => gd(r, s));
    return i.defs[r.defId] = r, i.instances[n.instanceId] = n, i;
  }
  return j();
}
function gd(t, e) {
  return !!(t.groupId && t.groupId === e.groupId);
}
function j() {
  return { defs: {}, instances: {} };
}
function yr(t, e) {
  return {
    defs: Object.assign(Object.assign({}, t.defs), e.defs),
    instances: Object.assign(Object.assign({}, t.instances), e.instances)
  };
}
function on(t, e) {
  let n = xe(t.defs, e), r = xe(t.instances, (i) => n[i.defId]);
  return { defs: n, instances: r };
}
function md(t, e) {
  let { defs: n, instances: r } = t, i = {}, s = {};
  for (let o in n)
    e.defs[o] || (i[o] = n[o]);
  for (let o in r)
    !e.instances[o] && // not explicitly excluded
    i[r[o].defId] && (s[o] = r[o]);
  return {
    defs: i,
    instances: s
  };
}
function vd(t, e) {
  return Array.isArray(t) ? ct(t, null, e, !0) : typeof t == "object" && t ? ct([t], null, e, !0) : t != null ? String(t) : null;
}
function xi(t) {
  return Array.isArray(t) ? t : typeof t == "string" ? t.split(/\s+/) : [];
}
const Ft = {
  display: String,
  editable: Boolean,
  startEditable: Boolean,
  durationEditable: Boolean,
  constraint: v,
  overlap: v,
  allow: v,
  className: xi,
  classNames: xi,
  color: String,
  backgroundColor: String,
  borderColor: String,
  textColor: String
}, bd = {
  display: null,
  startEditable: null,
  durationEditable: null,
  constraints: [],
  overlap: null,
  allows: [],
  backgroundColor: "",
  borderColor: "",
  textColor: "",
  classNames: []
};
function jt(t, e) {
  let n = vd(t.constraint, e);
  return {
    display: t.display || null,
    startEditable: t.startEditable != null ? t.startEditable : t.editable,
    durationEditable: t.durationEditable != null ? t.durationEditable : t.editable,
    constraints: n != null ? [n] : [],
    overlap: t.overlap != null ? t.overlap : null,
    allows: t.allow != null ? [t.allow] : [],
    backgroundColor: t.backgroundColor || t.color || "",
    borderColor: t.borderColor || t.color || "",
    textColor: t.textColor || "",
    classNames: (t.className || []).concat(t.classNames || [])
    // join singular and plural
  };
}
function oo(t) {
  return t.reduce(yd, bd);
}
function yd(t, e) {
  return {
    display: e.display != null ? e.display : t.display,
    startEditable: e.startEditable != null ? e.startEditable : t.startEditable,
    durationEditable: e.durationEditable != null ? e.durationEditable : t.durationEditable,
    constraints: t.constraints.concat(e.constraints),
    overlap: typeof e.overlap == "boolean" ? e.overlap : t.overlap,
    allows: t.allows.concat(e.allows),
    backgroundColor: e.backgroundColor || t.backgroundColor,
    borderColor: e.borderColor || t.borderColor,
    textColor: e.textColor || t.textColor,
    classNames: t.classNames.concat(e.classNames)
  };
}
const Ed = {
  id: String,
  defaultAllDay: Boolean,
  url: String,
  format: String,
  events: v,
  eventDataTransform: v,
  // for any network-related sources
  success: v,
  failure: v
};
function ao(t, e, n = lo(e)) {
  let r;
  if (typeof t == "string" ? r = { url: t } : typeof t == "function" || Array.isArray(t) ? r = { events: t } : typeof t == "object" && t && (r = t), r) {
    let { refined: i, extra: s } = ur(r, n), o = wd(i, e);
    if (o)
      return {
        _raw: t,
        isFetching: !1,
        latestFetchId: "",
        fetchRange: null,
        defaultAllDay: i.defaultAllDay,
        eventDataTransform: i.eventDataTransform,
        success: i.success,
        failure: i.failure,
        publicId: i.id || "",
        sourceId: ke(),
        sourceDefId: o.sourceDefId,
        meta: o.meta,
        ui: jt(i, e),
        extendedProps: s
      };
  }
  return null;
}
function lo(t) {
  return Object.assign(Object.assign(Object.assign({}, Ft), Ed), t.pluginHooks.eventSourceRefiners);
}
function wd(t, e) {
  let n = e.pluginHooks.eventSourceDefs;
  for (let r = n.length - 1; r >= 0; r -= 1) {
    let s = n[r].parseMeta(t);
    if (s)
      return { sourceDefId: r, meta: s };
  }
  return null;
}
function Sd(t, e, n, r, i) {
  switch (e.type) {
    case "RECEIVE_EVENTS":
      return Ad(t, n[e.sourceId], e.fetchId, e.fetchRange, e.rawEvents, i);
    case "RESET_RAW_EVENTS":
      return Dd(t, n[e.sourceId], e.rawEvents, r.activeRange, i);
    case "ADD_EVENTS":
      return Cd(
        t,
        e.eventStore,
        // new ones
        r ? r.activeRange : null,
        i
      );
    case "RESET_EVENTS":
      return e.eventStore;
    case "MERGE_EVENTS":
      return yr(t, e.eventStore);
    case "PREV":
    // TODO: how do we track all actions that affect dateProfile :(
    case "NEXT":
    case "CHANGE_DATE":
    case "CHANGE_VIEW_TYPE":
      return r ? Te(t, r.activeRange, i) : t;
    case "REMOVE_EVENTS":
      return md(t, e.eventStore);
    case "REMOVE_EVENT_SOURCE":
      return uo(t, e.sourceId);
    case "REMOVE_ALL_EVENT_SOURCES":
      return on(t, (s) => !s.sourceId);
    case "REMOVE_ALL_EVENTS":
      return j();
    default:
      return t;
  }
}
function Ad(t, e, n, r, i, s) {
  if (e && // not already removed
  n === e.latestFetchId) {
    let o = ct(co(i, e, s), e, s);
    return r && (o = Te(o, r, s)), yr(uo(t, e.sourceId), o);
  }
  return t;
}
function Dd(t, e, n, r, i) {
  const { defIdMap: s, instanceIdMap: o } = xd(t);
  let a = ct(co(n, e, i), e, i, !1, s, o);
  return Te(a, r, i);
}
function co(t, e, n) {
  let r = n.options.eventDataTransform, i = e ? e.eventDataTransform : null;
  return i && (t = Ri(t, i)), r && (t = Ri(t, r)), t;
}
function Ri(t, e) {
  let n;
  if (!e)
    n = t;
  else {
    n = [];
    for (let r of t) {
      let i = e(r);
      i ? n.push(i) : i == null && n.push(r);
    }
  }
  return n;
}
function Cd(t, e, n, r) {
  return n && (e = Te(e, n, r)), yr(t, e);
}
function Ti(t, e, n) {
  let { defs: r } = t, i = re(t.instances, (s) => r[s.defId].allDay ? s : Object.assign(Object.assign({}, s), { range: {
    start: n.createMarker(e.toDate(s.range.start, s.forcedStartTzo)),
    end: n.createMarker(e.toDate(s.range.end, s.forcedEndTzo))
  }, forcedStartTzo: n.canComputeOffset ? null : s.forcedStartTzo, forcedEndTzo: n.canComputeOffset ? null : s.forcedEndTzo }));
  return { defs: r, instances: i };
}
function uo(t, e) {
  return on(t, (n) => n.sourceId !== e);
}
function _d(t, e) {
  return {
    defs: t.defs,
    instances: xe(t.instances, (n) => !e[n.instanceId])
  };
}
function xd(t) {
  const { defs: e, instances: n } = t, r = {}, i = {};
  for (let s in e) {
    const o = e[s], { publicId: a } = o;
    a && (r[a] = s);
  }
  for (let s in n) {
    const o = n[s], a = e[o.defId], { publicId: l } = a;
    l && (i[l] = s);
  }
  return { defIdMap: r, instanceIdMap: i };
}
class an {
  constructor() {
    this.handlers = {}, this.thisContext = null;
  }
  setThisContext(e) {
    this.thisContext = e;
  }
  setOptions(e) {
    this.options = e;
  }
  on(e, n) {
    Rd(this.handlers, e, n);
  }
  off(e, n) {
    Td(this.handlers, e, n);
  }
  trigger(e, ...n) {
    let r = this.handlers[e] || [], i = this.options && this.options[e], s = [].concat(i || [], r);
    for (let o of s)
      o.apply(this.thisContext, n);
  }
  hasHandlers(e) {
    return !!(this.handlers[e] && this.handlers[e].length || this.options && this.options[e]);
  }
}
function Rd(t, e, n) {
  (t[e] || (t[e] = [])).push(n);
}
function Td(t, e, n) {
  n ? t[e] && (t[e] = t[e].filter((r) => r !== n)) : delete t[e];
}
const kd = {
  startTime: "09:00",
  endTime: "17:00",
  daysOfWeek: [1, 2, 3, 4, 5],
  display: "inverse-background",
  classNames: "fc-non-business",
  groupId: "_businessHours"
  // so multiple defs get grouped
};
function Md(t, e) {
  return ct(Id(t), null, e);
}
function Id(t) {
  let e;
  return t === !0 ? e = [{}] : Array.isArray(t) ? e = t.filter((n) => n.daysOfWeek) : typeof t == "object" && t ? e = [t] : e = [], e = e.map((n) => Object.assign(Object.assign({}, kd), n)), e;
}
function fo(t, e, n) {
  n.emitter.trigger("select", Object.assign(Object.assign({}, Er(t, n)), { jsEvent: e ? e.origEvent : null, view: n.viewApi || n.calendarApi.view }));
}
function Nd(t, e) {
  e.emitter.trigger("unselect", {
    jsEvent: t ? t.origEvent : null,
    view: e.viewApi || e.calendarApi.view
  });
}
function Er(t, e) {
  let n = {};
  for (let r of e.pluginHooks.dateSpanTransforms)
    Object.assign(n, r(t, e));
  return Object.assign(n, qd(t, e.dateEnv)), n;
}
function ki(t, e, n) {
  let { dateEnv: r, options: i } = n, s = e;
  return t ? (s = M(s), s = r.add(s, i.defaultAllDayEventDuration)) : s = r.add(s, i.defaultTimedEventDuration), s;
}
function wr(t, e, n, r) {
  let i = Wt(t.defs, e), s = j();
  for (let o in t.defs) {
    let a = t.defs[o];
    s.defs[o] = Od(a, i[o], n, r);
  }
  for (let o in t.instances) {
    let a = t.instances[o], l = s.defs[a.defId];
    s.instances[o] = Pd(a, l, i[a.defId], n, r);
  }
  return s;
}
function Od(t, e, n, r) {
  let i = n.standardProps || {};
  i.hasEnd == null && e.durationEditable && (n.startDelta || n.endDelta) && (i.hasEnd = !0);
  let s = Object.assign(Object.assign(Object.assign({}, t), i), { ui: Object.assign(Object.assign({}, t.ui), i.ui) });
  n.extendedProps && (s.extendedProps = Object.assign(Object.assign({}, s.extendedProps), n.extendedProps));
  for (let o of r.pluginHooks.eventDefMutationAppliers)
    o(s, n, r);
  return !s.hasEnd && r.options.forceEventDuration && (s.hasEnd = !0), s;
}
function Pd(t, e, n, r, i) {
  let { dateEnv: s } = i, o = r.standardProps && r.standardProps.allDay === !0, a = r.standardProps && r.standardProps.hasEnd === !1, l = Object.assign({}, t);
  return o && (l.range = eo(l.range)), r.datesDelta && n.startEditable && (l.range = {
    start: s.add(l.range.start, r.datesDelta),
    end: s.add(l.range.end, r.datesDelta)
  }), r.startDelta && n.durationEditable && (l.range = {
    start: s.add(l.range.start, r.startDelta),
    end: l.range.end
  }), r.endDelta && n.durationEditable && (l.range = {
    start: l.range.start,
    end: s.add(l.range.end, r.endDelta)
  }), a && (l.range = {
    start: l.range.start,
    end: ki(e.allDay, l.range.start, i)
  }), e.allDay && (l.range = {
    start: M(l.range.start),
    end: M(l.range.end)
  }), l.range.end < l.range.start && (l.range.end = ki(e.allDay, l.range.start, i)), l;
}
class Oe {
  constructor(e, n) {
    this.context = e, this.internalEventSource = n;
  }
  remove() {
    this.context.dispatch({
      type: "REMOVE_EVENT_SOURCE",
      sourceId: this.internalEventSource.sourceId
    });
  }
  refetch() {
    this.context.dispatch({
      type: "FETCH_EVENT_SOURCES",
      sourceIds: [this.internalEventSource.sourceId],
      isRefetch: !0
    });
  }
  get id() {
    return this.internalEventSource.publicId;
  }
  get url() {
    return this.internalEventSource.meta.url;
  }
  get format() {
    return this.internalEventSource.meta.format;
  }
}
class N {
  // instance will be null if expressing a recurring event that has no current instances,
  // OR if trying to validate an incoming external event that has no dates assigned
  constructor(e, n, r) {
    this._context = e, this._def = n, this._instance = r || null;
  }
  /*
  TODO: make event struct more responsible for this
  */
  setProp(e, n) {
    if (e in ro)
      console.warn("Could not set date-related prop 'name'. Use one of the date-related methods instead.");
    else if (e === "id")
      n = Rt[e](n), this.mutate({
        standardProps: { publicId: n }
        // hardcoded internal name
      });
    else if (e in Rt)
      n = Rt[e](n), this.mutate({
        standardProps: { [e]: n }
      });
    else if (e in Ft) {
      let r = Ft[e](n);
      e === "color" ? r = { backgroundColor: n, borderColor: n } : e === "editable" ? r = { startEditable: n, durationEditable: n } : r = { [e]: n }, this.mutate({
        standardProps: { ui: r }
      });
    } else
      console.warn(`Could not set prop '${e}'. Use setExtendedProp instead.`);
  }
  setExtendedProp(e, n) {
    this.mutate({
      extendedProps: { [e]: n }
    });
  }
  setStart(e, n = {}) {
    let { dateEnv: r } = this._context, i = r.createMarker(e);
    if (i && this._instance) {
      let s = this._instance.range, o = Pe(s.start, i, r, n.granularity);
      n.maintainDuration ? this.mutate({ datesDelta: o }) : this.mutate({ startDelta: o });
    }
  }
  setEnd(e, n = {}) {
    let { dateEnv: r } = this._context, i;
    if (!(e != null && (i = r.createMarker(e), !i)) && this._instance)
      if (i) {
        let s = Pe(this._instance.range.end, i, r, n.granularity);
        this.mutate({ endDelta: s });
      } else
        this.mutate({ standardProps: { hasEnd: !1 } });
  }
  setDates(e, n, r = {}) {
    let { dateEnv: i } = this._context, s = { allDay: r.allDay }, o = i.createMarker(e), a;
    if (o && !(n != null && (a = i.createMarker(n), !a)) && this._instance) {
      let l = this._instance.range;
      r.allDay === !0 && (l = eo(l));
      let d = Pe(l.start, o, i, r.granularity);
      if (a) {
        let c = Pe(l.end, a, i, r.granularity);
        oc(d, c) ? this.mutate({ datesDelta: d, standardProps: s }) : this.mutate({ startDelta: d, endDelta: c, standardProps: s });
      } else
        s.hasEnd = !1, this.mutate({ datesDelta: d, standardProps: s });
    }
  }
  moveStart(e) {
    let n = _(e);
    n && this.mutate({ startDelta: n });
  }
  moveEnd(e) {
    let n = _(e);
    n && this.mutate({ endDelta: n });
  }
  moveDates(e) {
    let n = _(e);
    n && this.mutate({ datesDelta: n });
  }
  setAllDay(e, n = {}) {
    let r = { allDay: e }, { maintainDuration: i } = n;
    i == null && (i = this._context.options.allDayMaintainDuration), this._def.allDay !== e && (r.hasEnd = i), this.mutate({ standardProps: r });
  }
  formatRange(e) {
    let { dateEnv: n } = this._context, r = this._instance, i = O(e);
    return this._def.hasEnd ? n.formatRange(r.range.start, r.range.end, i, {
      forcedStartTzo: r.forcedStartTzo,
      forcedEndTzo: r.forcedEndTzo
    }) : n.format(r.range.start, i, {
      forcedTzo: r.forcedStartTzo
    });
  }
  mutate(e) {
    let n = this._instance;
    if (n) {
      let r = this._def, i = this._context, { eventStore: s } = i.getCurrentData(), o = br(s, n.instanceId);
      o = wr(o, {
        "": {
          display: "",
          startEditable: !0,
          durationEditable: !0,
          constraints: [],
          overlap: null,
          allows: [],
          backgroundColor: "",
          borderColor: "",
          textColor: "",
          classNames: []
        }
      }, e, i);
      let l = new N(i, r, n);
      this._def = o.defs[r.defId], this._instance = o.instances[n.instanceId], i.dispatch({
        type: "MERGE_EVENTS",
        eventStore: o
      }), i.emitter.trigger("eventChange", {
        oldEvent: l,
        event: this,
        relatedEvents: De(o, i, n),
        revert() {
          i.dispatch({
            type: "RESET_EVENTS",
            eventStore: s
            // the ORIGINAL store
          });
        }
      });
    }
  }
  remove() {
    let e = this._context, n = ho(this);
    e.dispatch({
      type: "REMOVE_EVENTS",
      eventStore: n
    }), e.emitter.trigger("eventRemove", {
      event: this,
      relatedEvents: [],
      revert() {
        e.dispatch({
          type: "MERGE_EVENTS",
          eventStore: n
        });
      }
    });
  }
  get source() {
    let { sourceId: e } = this._def;
    return e ? new Oe(this._context, this._context.getCurrentData().eventSources[e]) : null;
  }
  get start() {
    return this._instance ? this._context.dateEnv.toDate(this._instance.range.start) : null;
  }
  get end() {
    return this._instance && this._def.hasEnd ? this._context.dateEnv.toDate(this._instance.range.end) : null;
  }
  get startStr() {
    let e = this._instance;
    return e ? this._context.dateEnv.formatIso(e.range.start, {
      omitTime: this._def.allDay,
      forcedTzo: e.forcedStartTzo
    }) : "";
  }
  get endStr() {
    let e = this._instance;
    return e && this._def.hasEnd ? this._context.dateEnv.formatIso(e.range.end, {
      omitTime: this._def.allDay,
      forcedTzo: e.forcedEndTzo
    }) : "";
  }
  // computable props that all access the def
  // TODO: find a TypeScript-compatible way to do this at scale
  get id() {
    return this._def.publicId;
  }
  get groupId() {
    return this._def.groupId;
  }
  get allDay() {
    return this._def.allDay;
  }
  get title() {
    return this._def.title;
  }
  get url() {
    return this._def.url;
  }
  get display() {
    return this._def.ui.display || "auto";
  }
  // bad. just normalize the type earlier
  get startEditable() {
    return this._def.ui.startEditable;
  }
  get durationEditable() {
    return this._def.ui.durationEditable;
  }
  get constraint() {
    return this._def.ui.constraints[0] || null;
  }
  get overlap() {
    return this._def.ui.overlap;
  }
  get allow() {
    return this._def.ui.allows[0] || null;
  }
  get backgroundColor() {
    return this._def.ui.backgroundColor;
  }
  get borderColor() {
    return this._def.ui.borderColor;
  }
  get textColor() {
    return this._def.ui.textColor;
  }
  // NOTE: user can't modify these because Object.freeze was called in event-def parsing
  get classNames() {
    return this._def.ui.classNames;
  }
  get extendedProps() {
    return this._def.extendedProps;
  }
  toPlainObject(e = {}) {
    let n = this._def, { ui: r } = n, { startStr: i, endStr: s } = this, o = {
      allDay: n.allDay
    };
    return n.title && (o.title = n.title), i && (o.start = i), s && (o.end = s), n.publicId && (o.id = n.publicId), n.groupId && (o.groupId = n.groupId), n.url && (o.url = n.url), r.display && r.display !== "auto" && (o.display = r.display), e.collapseColor && r.backgroundColor && r.backgroundColor === r.borderColor ? o.color = r.backgroundColor : (r.backgroundColor && (o.backgroundColor = r.backgroundColor), r.borderColor && (o.borderColor = r.borderColor)), r.textColor && (o.textColor = r.textColor), r.classNames.length && (o.classNames = r.classNames), Object.keys(n.extendedProps).length && (e.collapseExtendedProps ? Object.assign(o, n.extendedProps) : o.extendedProps = n.extendedProps), o;
  }
  toJSON() {
    return this.toPlainObject();
  }
}
function ho(t) {
  let e = t._def, n = t._instance;
  return {
    defs: { [e.defId]: e },
    instances: n ? { [n.instanceId]: n } : {}
  };
}
function De(t, e, n) {
  let { defs: r, instances: i } = t, s = [], o = n ? n.instanceId : "";
  for (let a in i) {
    let l = i[a], d = r[l.defId];
    l.instanceId !== o && s.push(new N(e, d, l));
  }
  return s;
}
function Mi(t, e, n, r) {
  let i = {}, s = {}, o = {}, a = [], l = [], d = Wt(t.defs, e);
  for (let c in t.defs) {
    let h = t.defs[c];
    d[h.defId].display === "inverse-background" && (h.groupId ? (i[h.groupId] = [], o[h.groupId] || (o[h.groupId] = h)) : s[c] = []);
  }
  for (let c in t.instances) {
    let h = t.instances[c], f = t.defs[h.defId], u = d[f.defId], g = h.range, m = !f.allDay && r ? to(g, r) : g, b = Re(m, n);
    b && (u.display === "inverse-background" ? f.groupId ? i[f.groupId].push(b) : s[h.defId].push(b) : u.display !== "none" && (u.display === "background" ? a : l).push({
      def: f,
      ui: u,
      instance: h,
      range: b,
      isStart: m.start && m.start.valueOf() === b.start.valueOf(),
      isEnd: m.end && m.end.valueOf() === b.end.valueOf()
    }));
  }
  for (let c in i) {
    let h = i[c], f = _i(h, n);
    for (let u of f) {
      let g = o[c], m = d[g.defId];
      a.push({
        def: g,
        ui: m,
        instance: null,
        range: u,
        isStart: !1,
        isEnd: !1
      });
    }
  }
  for (let c in s) {
    let h = s[c], f = _i(h, n);
    for (let u of f)
      a.push({
        def: t.defs[c],
        ui: d[c],
        instance: null,
        range: u,
        isStart: !1,
        isEnd: !1
      });
  }
  return { bg: a, fg: l };
}
function $d(t) {
  return t.ui.display === "background" || t.ui.display === "inverse-background";
}
function Ii(t, e) {
  t.fcSeg = e;
}
function Ge(t) {
  return t.fcSeg || t.parentNode.fcSeg || // for the harness
  null;
}
function Wt(t, e) {
  return re(t, (n) => po(n, e));
}
function po(t, e) {
  let n = [];
  return e[""] && n.push(e[""]), e[t.defId] && n.push(e[t.defId]), n.push(t.ui), oo(n);
}
function go(t, e) {
  let n = t.map(Hd);
  return n.sort((r, i) => Jl(r, i, e)), n.map((r) => r._seg);
}
function Hd(t) {
  let { eventRange: e } = t, n = e.def, r = e.instance ? e.instance.range : e.range, i = r.start ? r.start.valueOf() : 0, s = r.end ? r.end.valueOf() : 0;
  return Object.assign(Object.assign(Object.assign({}, n.extendedProps), n), {
    id: n.publicId,
    start: i,
    end: s,
    duration: s - i,
    allDay: Number(n.allDay),
    _seg: t
  });
}
function Bd(t, e) {
  let { pluginHooks: n } = e, r = n.isDraggableTransformers, { def: i, ui: s } = t.eventRange, o = s.startEditable;
  for (let a of r)
    o = a(o, i, s, e);
  return o;
}
function Ld(t, e) {
  return t.isStart && t.eventRange.ui.durationEditable && e.options.eventResizableFromStart;
}
function zd(t, e) {
  return t.isEnd && t.eventRange.ui.durationEditable;
}
function mo(t, e, n, r, i, s, o) {
  let { dateEnv: a, options: l } = n, { displayEventTime: d, displayEventEnd: c } = l, h = t.eventRange.def, f = t.eventRange.instance;
  d == null && (d = r !== !1), c == null && (c = i !== !1);
  let u = f.range.start, g = f.range.end, m = t.start || t.eventRange.range.start, b = t.end || t.eventRange.range.end, y = M(u).valueOf() === M(m).valueOf(), E = M(he(g, -1)).valueOf() === M(he(b, -1)).valueOf();
  return d && !h.allDay && (y || E) ? (m = y ? u : m, b = E ? g : b, c && h.hasEnd ? a.formatRange(m, b, e, {
    forcedStartTzo: f.forcedStartTzo,
    forcedEndTzo: f.forcedEndTzo
  }) : a.format(m, e, {
    forcedTzo: f.forcedStartTzo
    // nooooo, same
  })) : "";
}
function ue(t, e, n) {
  let r = t.eventRange.range;
  return {
    isPast: r.end <= (n || e.start),
    isFuture: r.start >= (n || e.end),
    isToday: e && ne(e, r.start)
  };
}
function Ud(t) {
  let e = ["fc-event"];
  return t.isMirror && e.push("fc-event-mirror"), t.isDraggable && e.push("fc-event-draggable"), (t.isStartResizable || t.isEndResizable) && e.push("fc-event-resizable"), t.isDragging && e.push("fc-event-dragging"), t.isResizing && e.push("fc-event-resizing"), t.isSelected && e.push("fc-event-selected"), t.isStart && e.push("fc-event-start"), t.isEnd && e.push("fc-event-end"), t.isPast && e.push("fc-event-past"), t.isToday && e.push("fc-event-today"), t.isFuture && e.push("fc-event-future"), e;
}
function vo(t) {
  return t.instance ? t.instance.instanceId : `${t.def.defId}:${t.range.start.toISOString()}`;
}
function bo(t, e) {
  let { def: n, instance: r } = t.eventRange, { url: i } = n;
  if (i)
    return { href: i };
  let { emitter: s, options: o } = e, { eventInteractive: a } = o;
  return a == null && (a = n.interactive, a == null && (a = !!s.hasHandlers("eventClick"))), a ? Vs((l) => {
    s.trigger("eventClick", {
      el: l.target,
      event: new N(e, n, r),
      jsEvent: l,
      view: e.viewApi
    });
  }) : {};
}
const Fd = {
  start: v,
  end: v,
  allDay: Boolean
};
function jd(t, e, n) {
  let r = Wd(t, e), { range: i } = r;
  if (!i.start)
    return null;
  if (!i.end) {
    if (n == null)
      return null;
    i.end = e.add(i.start, n);
  }
  return r;
}
function Wd(t, e) {
  let { refined: n, extra: r } = ur(t, Fd), i = n.start ? e.createMarkerMeta(n.start) : null, s = n.end ? e.createMarkerMeta(n.end) : null, { allDay: o } = n;
  return o == null && (o = i && i.isTimeUnspecified && (!s || s.isTimeUnspecified)), Object.assign({ range: {
    start: i ? i.marker : null,
    end: s ? s.marker : null
  }, allDay: o }, r);
}
function Vd(t, e) {
  return ld(t.range, e.range) && t.allDay === e.allDay && Gd(t, e);
}
function Gd(t, e) {
  for (let n in e)
    if (n !== "range" && n !== "allDay" && t[n] !== e[n])
      return !1;
  for (let n in t)
    if (!(n in e))
      return !1;
  return !0;
}
function qd(t, e) {
  return Object.assign(Object.assign({}, Eo(t.range, e, t.allDay)), { allDay: t.allDay });
}
function yo(t, e, n) {
  return Object.assign(Object.assign({}, Eo(t, e, n)), { timeZone: e.timeZone });
}
function Eo(t, e, n) {
  return {
    start: e.toDate(t.start),
    end: e.toDate(t.end),
    startStr: e.formatIso(t.start, { omitTime: n }),
    endStr: e.formatIso(t.end, { omitTime: n })
  };
}
function Yd(t, e, n) {
  let r = so({ editable: !1 }, n), i = Bn(
    r.refined,
    r.extra,
    "",
    // sourceId
    t.allDay,
    !0,
    // hasEnd
    n
  );
  return {
    def: i,
    ui: po(i, e),
    instance: mr(i.defId, t.range),
    range: t.range,
    isStart: !0,
    isEnd: !0
  };
}
function Qd(t, e, n) {
  let r = !1, i = function(a) {
    r || (r = !0, e(a));
  }, s = function(a) {
    r || (r = !0, n(a));
  }, o = t(i, s);
  o && typeof o.then == "function" && o.then(i, s);
}
class Ni extends Error {
  constructor(e, n) {
    super(e), this.response = n;
  }
}
function Zd(t, e, n) {
  t = t.toUpperCase();
  const r = {
    method: t
  };
  return t === "GET" ? e += (e.indexOf("?") === -1 ? "?" : "&") + new URLSearchParams(n) : (r.body = new URLSearchParams(n), r.headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  }), fetch(e, r).then((i) => {
    if (i.ok)
      return i.json().then((s) => [s, i], () => {
        throw new Ni("Failure parsing JSON", i);
      });
    throw new Ni("Request failed", i);
  });
}
let yn;
function wo() {
  return yn == null && (yn = Kd()), yn;
}
function Kd() {
  if (typeof document > "u")
    return !0;
  let t = document.createElement("div");
  t.style.position = "absolute", t.style.top = "0px", t.style.left = "0px", t.innerHTML = "<table><tr><td><div></div></td></tr></table>", t.querySelector("table").style.height = "100px", t.querySelector("div").style.height = "100%", document.body.appendChild(t);
  let n = t.querySelector("div").offsetHeight > 0;
  return document.body.removeChild(t), n;
}
class Xd extends R {
  constructor() {
    super(...arguments), this.state = {
      forPrint: !1
    }, this.handleBeforePrint = () => {
      zt(() => {
        this.setState({ forPrint: !0 });
      });
    }, this.handleAfterPrint = () => {
      zt(() => {
        this.setState({ forPrint: !1 });
      });
    };
  }
  render() {
    let { props: e } = this, { options: n } = e, { forPrint: r } = this.state, i = r || n.height === "auto" || n.contentHeight === "auto", s = !i && n.height != null ? n.height : "", o = [
      "fc",
      r ? "fc-media-print" : "fc-media-screen",
      `fc-direction-${n.direction}`,
      e.theme.getClass("root")
    ];
    return wo() || o.push("fc-liquid-hack"), e.children(o, s, i, r);
  }
  componentDidMount() {
    let { emitter: e } = this.props;
    e.on("_beforeprint", this.handleBeforePrint), e.on("_afterprint", this.handleAfterPrint);
  }
  componentWillUnmount() {
    let { emitter: e } = this.props;
    e.off("_beforeprint", this.handleBeforePrint), e.off("_afterprint", this.handleAfterPrint);
  }
}
class Ye {
  constructor(e) {
    this.component = e.component, this.isHitComboAllowed = e.isHitComboAllowed || null;
  }
  destroy() {
  }
}
function Jd(t, e) {
  return {
    component: t,
    el: e.el,
    useEventCenter: e.useEventCenter != null ? e.useEventCenter : !0,
    isHitComboAllowed: e.isHitComboAllowed || null
  };
}
function Sr(t) {
  return {
    [t.component.uid]: t
  };
}
const zn = {};
class Qe extends F {
  constructor(e, n) {
    super(e, n), this.handleRefresh = () => {
      let r = this.computeTiming();
      r.state.nowDate.valueOf() !== this.state.nowDate.valueOf() && this.setState(r.state), this.clearTimeout(), this.setTimeout(r.waitMs);
    }, this.handleVisibilityChange = () => {
      document.hidden || this.handleRefresh();
    }, this.state = this.computeTiming().state;
  }
  render() {
    let { props: e, state: n } = this;
    return e.children(n.nowDate, n.todayRange);
  }
  componentDidMount() {
    this.setTimeout(), this.context.nowManager.addResetListener(this.handleRefresh), document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }
  componentDidUpdate(e) {
    e.unit !== this.props.unit && (this.clearTimeout(), this.setTimeout());
  }
  componentWillUnmount() {
    this.clearTimeout(), this.context.nowManager.removeResetListener(this.handleRefresh), document.removeEventListener("visibilitychange", this.handleVisibilityChange);
  }
  computeTiming() {
    let { props: e, context: n } = this, r = n.nowManager.getDateMarker(), { nowIndicatorSnap: i } = n.options;
    i === "auto" && (i = // large unit?
    /year|month|week|day/.test(e.unit) || // if slotDuration 30 mins for example, would NOT appear to snap (legacy behavior)
    (e.unitValue || 1) === 1);
    let s, o;
    return i ? (s = n.dateEnv.startOf(r, e.unit), o = n.dateEnv.add(s, _(1, e.unit)).valueOf() - r.valueOf()) : (s = r, o = 1e3 * 60), o = Math.min(1e3 * 60 * 60 * 24, o), {
      state: { nowDate: s, todayRange: eu(s) },
      waitMs: o
    };
  }
  setTimeout(e = this.computeTiming().waitMs) {
    this.timeoutId = setTimeout(() => {
      const n = this.computeTiming();
      this.setState(n.state, () => {
        this.setTimeout(n.waitMs);
      });
    }, e);
  }
  clearTimeout() {
    this.timeoutId && clearTimeout(this.timeoutId);
  }
}
Qe.contextType = ie;
function eu(t) {
  let e = M(t), n = H(e, 1);
  return { start: e, end: n };
}
class tu {
  getCurrentData() {
    return this.currentDataManager.getCurrentData();
  }
  dispatch(e) {
    this.currentDataManager.dispatch(e);
  }
  get view() {
    return this.getCurrentData().viewApi;
  }
  batchRendering(e) {
    e();
  }
  updateSize() {
    this.trigger("_resize", !0);
  }
  // Options
  // -----------------------------------------------------------------------------------------------------------------
  setOption(e, n) {
    this.dispatch({
      type: "SET_OPTION",
      optionName: e,
      rawOptionValue: n
    });
  }
  getOption(e) {
    return this.currentDataManager.currentCalendarOptionsInput[e];
  }
  getAvailableLocaleCodes() {
    return Object.keys(this.getCurrentData().availableRawLocales);
  }
  // Trigger
  // -----------------------------------------------------------------------------------------------------------------
  on(e, n) {
    let { currentDataManager: r } = this;
    r.currentCalendarOptionsRefiners[e] ? r.emitter.on(e, n) : console.warn(`Unknown listener name '${e}'`);
  }
  off(e, n) {
    this.currentDataManager.emitter.off(e, n);
  }
  // not meant for public use
  trigger(e, ...n) {
    this.currentDataManager.emitter.trigger(e, ...n);
  }
  // View
  // -----------------------------------------------------------------------------------------------------------------
  changeView(e, n) {
    this.batchRendering(() => {
      if (this.unselect(), n)
        if (n.start && n.end)
          this.dispatch({
            type: "CHANGE_VIEW_TYPE",
            viewType: e
          }), this.dispatch({
            type: "SET_OPTION",
            optionName: "visibleRange",
            rawOptionValue: n
          });
        else {
          let { dateEnv: r } = this.getCurrentData();
          this.dispatch({
            type: "CHANGE_VIEW_TYPE",
            viewType: e,
            dateMarker: r.createMarker(n)
          });
        }
      else
        this.dispatch({
          type: "CHANGE_VIEW_TYPE",
          viewType: e
        });
    });
  }
  // Forces navigation to a view for the given date.
  // `viewType` can be a specific view name or a generic one like "week" or "day".
  // needs to change
  zoomTo(e, n) {
    let r = this.getCurrentData(), i;
    n = n || "day", i = r.viewSpecs[n] || this.getUnitViewSpec(n), this.unselect(), i ? this.dispatch({
      type: "CHANGE_VIEW_TYPE",
      viewType: i.type,
      dateMarker: e
    }) : this.dispatch({
      type: "CHANGE_DATE",
      dateMarker: e
    });
  }
  // Given a duration singular unit, like "week" or "day", finds a matching view spec.
  // Preference is given to views that have corresponding buttons.
  getUnitViewSpec(e) {
    let { viewSpecs: n, toolbarConfig: r } = this.getCurrentData(), i = [].concat(r.header ? r.header.viewsWithButtons : [], r.footer ? r.footer.viewsWithButtons : []), s, o;
    for (let a in n)
      i.push(a);
    for (s = 0; s < i.length; s += 1)
      if (o = n[i[s]], o && o.singleUnit === e)
        return o;
    return null;
  }
  // Current Date
  // -----------------------------------------------------------------------------------------------------------------
  prev() {
    this.unselect(), this.dispatch({ type: "PREV" });
  }
  next() {
    this.unselect(), this.dispatch({ type: "NEXT" });
  }
  prevYear() {
    let e = this.getCurrentData();
    this.unselect(), this.dispatch({
      type: "CHANGE_DATE",
      dateMarker: e.dateEnv.addYears(e.currentDate, -1)
    });
  }
  nextYear() {
    let e = this.getCurrentData();
    this.unselect(), this.dispatch({
      type: "CHANGE_DATE",
      dateMarker: e.dateEnv.addYears(e.currentDate, 1)
    });
  }
  today() {
    let e = this.getCurrentData();
    this.unselect(), this.dispatch({
      type: "CHANGE_DATE",
      dateMarker: e.nowManager.getDateMarker()
    });
  }
  gotoDate(e) {
    let n = this.getCurrentData();
    this.unselect(), this.dispatch({
      type: "CHANGE_DATE",
      dateMarker: n.dateEnv.createMarker(e)
    });
  }
  incrementDate(e) {
    let n = this.getCurrentData(), r = _(e);
    r && (this.unselect(), this.dispatch({
      type: "CHANGE_DATE",
      dateMarker: n.dateEnv.add(n.currentDate, r)
    }));
  }
  getDate() {
    let e = this.getCurrentData();
    return e.dateEnv.toDate(e.currentDate);
  }
  // Date Formatting Utils
  // -----------------------------------------------------------------------------------------------------------------
  formatDate(e, n) {
    let { dateEnv: r } = this.getCurrentData();
    return r.format(r.createMarker(e), O(n));
  }
  // `settings` is for formatter AND isEndExclusive
  formatRange(e, n, r) {
    let { dateEnv: i } = this.getCurrentData();
    return i.formatRange(i.createMarker(e), i.createMarker(n), O(r), r);
  }
  formatIso(e, n) {
    let { dateEnv: r } = this.getCurrentData();
    return r.formatIso(r.createMarker(e), { omitTime: n });
  }
  // Date Selection / Event Selection / DayClick
  // -----------------------------------------------------------------------------------------------------------------
  select(e, n) {
    let r;
    n == null ? e.start != null ? r = e : r = {
      start: e,
      end: null
    } : r = {
      start: e,
      end: n
    };
    let i = this.getCurrentData(), s = jd(r, i.dateEnv, _({ days: 1 }));
    s && (this.dispatch({ type: "SELECT_DATES", selection: s }), fo(s, null, i));
  }
  unselect(e) {
    let n = this.getCurrentData();
    n.dateSelection && (this.dispatch({ type: "UNSELECT_DATES" }), Nd(e, n));
  }
  // Public Events API
  // -----------------------------------------------------------------------------------------------------------------
  addEvent(e, n) {
    if (e instanceof N) {
      let o = e._def, a = e._instance;
      return this.getCurrentData().eventStore.defs[o.defId] || (this.dispatch({
        type: "ADD_EVENTS",
        eventStore: Ln({ def: o, instance: a })
        // TODO: better util for two args?
      }), this.triggerEventAdd(e)), e;
    }
    let r = this.getCurrentData(), i;
    if (n instanceof Oe)
      i = n.internalEventSource;
    else if (typeof n == "boolean")
      n && ([i] = hr(r.eventSources));
    else if (n != null) {
      let o = this.getEventSourceById(n);
      if (!o)
        return console.warn(`Could not find an event source with ID "${n}"`), null;
      i = o.internalEventSource;
    }
    let s = io(e, i, r, !1);
    if (s) {
      let o = new N(r, s.def, s.def.recurringDef ? null : s.instance);
      return this.dispatch({
        type: "ADD_EVENTS",
        eventStore: Ln(s)
      }), this.triggerEventAdd(o), o;
    }
    return null;
  }
  triggerEventAdd(e) {
    let { emitter: n } = this.getCurrentData();
    n.trigger("eventAdd", {
      event: e,
      relatedEvents: [],
      revert: () => {
        this.dispatch({
          type: "REMOVE_EVENTS",
          eventStore: ho(e)
        });
      }
    });
  }
  // TODO: optimize
  getEventById(e) {
    let n = this.getCurrentData(), { defs: r, instances: i } = n.eventStore;
    e = String(e);
    for (let s in r) {
      let o = r[s];
      if (o.publicId === e) {
        if (o.recurringDef)
          return new N(n, o, null);
        for (let a in i) {
          let l = i[a];
          if (l.defId === o.defId)
            return new N(n, o, l);
        }
      }
    }
    return null;
  }
  getEvents() {
    let e = this.getCurrentData();
    return De(e.eventStore, e);
  }
  removeAllEvents() {
    this.dispatch({ type: "REMOVE_ALL_EVENTS" });
  }
  // Public Event Sources API
  // -----------------------------------------------------------------------------------------------------------------
  getEventSources() {
    let e = this.getCurrentData(), n = e.eventSources, r = [];
    for (let i in n)
      r.push(new Oe(e, n[i]));
    return r;
  }
  getEventSourceById(e) {
    let n = this.getCurrentData(), r = n.eventSources;
    e = String(e);
    for (let i in r)
      if (r[i].publicId === e)
        return new Oe(n, r[i]);
    return null;
  }
  addEventSource(e) {
    let n = this.getCurrentData();
    if (e instanceof Oe)
      return n.eventSources[e.internalEventSource.sourceId] || this.dispatch({
        type: "ADD_EVENT_SOURCES",
        sources: [e.internalEventSource]
      }), e;
    let r = ao(e, n);
    return r ? (this.dispatch({ type: "ADD_EVENT_SOURCES", sources: [r] }), new Oe(n, r)) : null;
  }
  removeAllEventSources() {
    this.dispatch({ type: "REMOVE_ALL_EVENT_SOURCES" });
  }
  refetchEvents() {
    this.dispatch({ type: "FETCH_EVENT_SOURCES", isRefetch: !0 });
  }
  // Scroll
  // -----------------------------------------------------------------------------------------------------------------
  scrollToTime(e) {
    let n = _(e);
    n && this.trigger("_scrollRequest", { time: n });
  }
}
function nu(t, e) {
  return t.left >= e.left && t.left < e.right && t.top >= e.top && t.top < e.bottom;
}
function So(t, e) {
  let n = {
    left: Math.max(t.left, e.left),
    right: Math.min(t.right, e.right),
    top: Math.max(t.top, e.top),
    bottom: Math.min(t.bottom, e.bottom)
  };
  return n.left < n.right && n.top < n.bottom ? n : !1;
}
function ru(t, e) {
  return {
    left: Math.min(Math.max(t.left, e.left), e.right),
    top: Math.min(Math.max(t.top, e.top), e.bottom)
  };
}
function iu(t) {
  return {
    left: (t.left + t.right) / 2,
    top: (t.top + t.bottom) / 2
  };
}
function su(t, e) {
  return {
    left: t.left - e.left,
    top: t.top - e.top
  };
}
const En = j();
class ou {
  constructor() {
    this.getKeysForEventDefs = A(this._getKeysForEventDefs), this.splitDateSelection = A(this._splitDateSpan), this.splitEventStore = A(this._splitEventStore), this.splitIndividualUi = A(this._splitIndividualUi), this.splitEventDrag = A(this._splitInteraction), this.splitEventResize = A(this._splitInteraction), this.eventUiBuilders = {};
  }
  splitProps(e) {
    let n = this.getKeyInfo(e), r = this.getKeysForEventDefs(e.eventStore), i = this.splitDateSelection(e.dateSelection), s = this.splitIndividualUi(e.eventUiBases, r), o = this.splitEventStore(e.eventStore, r), a = this.splitEventDrag(e.eventDrag), l = this.splitEventResize(e.eventResize), d = {};
    this.eventUiBuilders = re(n, (c, h) => this.eventUiBuilders[h] || A(au));
    for (let c in n) {
      let h = n[c], f = o[c] || En, u = this.eventUiBuilders[c];
      d[c] = {
        businessHours: h.businessHours || e.businessHours,
        dateSelection: i[c] || null,
        eventStore: f,
        eventUiBases: u(e.eventUiBases[""], h.ui, s[c]),
        eventSelection: f.instances[e.eventSelection] ? e.eventSelection : "",
        eventDrag: a[c] || null,
        eventResize: l[c] || null
      };
    }
    return d;
  }
  _splitDateSpan(e) {
    let n = {};
    if (e) {
      let r = this.getKeysForDateSpan(e);
      for (let i of r)
        n[i] = e;
    }
    return n;
  }
  _getKeysForEventDefs(e) {
    return re(e.defs, (n) => this.getKeysForEventDef(n));
  }
  _splitEventStore(e, n) {
    let { defs: r, instances: i } = e, s = {};
    for (let o in r)
      for (let a of n[o])
        s[a] || (s[a] = j()), s[a].defs[o] = r[o];
    for (let o in i) {
      let a = i[o];
      for (let l of n[a.defId])
        s[l] && (s[l].instances[o] = a);
    }
    return s;
  }
  _splitIndividualUi(e, n) {
    let r = {};
    for (let i in e)
      if (i)
        for (let s of n[i])
          r[s] || (r[s] = {}), r[s][i] = e[i];
    return r;
  }
  _splitInteraction(e) {
    let n = {};
    if (e) {
      let r = this._splitEventStore(e.affectedEvents, this._getKeysForEventDefs(e.affectedEvents)), i = this._getKeysForEventDefs(e.mutatedEvents), s = this._splitEventStore(e.mutatedEvents, i), o = (a) => {
        n[a] || (n[a] = {
          affectedEvents: r[a] || En,
          mutatedEvents: s[a] || En,
          isEvent: e.isEvent
        });
      };
      for (let a in r)
        o(a);
      for (let a in s)
        o(a);
    }
    return n;
  }
}
function au(t, e, n) {
  let r = [];
  t && r.push(t), e && r.push(e);
  let i = {
    "": oo(r)
  };
  return n && Object.assign(i, n), i;
}
function Ao(t, e, n, r) {
  return {
    dow: t.getUTCDay(),
    isDisabled: !!(r && (!r.activeRange || !ne(r.activeRange, t))),
    isOther: !!(r && !ne(r.currentRange, t)),
    isToday: !!(e && ne(e, t)),
    isPast: !!(e && t < e.start),
    isFuture: !!(e && t >= e.end)
  };
}
function Ar(t, e) {
  let n = [
    "fc-day",
    `fc-day-${uc[t.dow]}`
  ];
  return t.isDisabled ? n.push("fc-day-disabled") : (t.isToday && (n.push("fc-day-today"), n.push(e.getClass("today"))), t.isPast && n.push("fc-day-past"), t.isFuture && n.push("fc-day-future"), t.isOther && n.push("fc-day-other")), n;
}
const lu = O({ year: "numeric", month: "long", day: "numeric" }), cu = O({ week: "long" });
function Vt(t, e, n = "day", r = !0) {
  const { dateEnv: i, options: s, calendarApi: o } = t;
  let a = i.format(e, n === "week" ? cu : lu);
  if (s.navLinks) {
    let l = i.toDate(e);
    const d = (c) => {
      let h = n === "day" ? s.navLinkDayClick : n === "week" ? s.navLinkWeekClick : null;
      typeof h == "function" ? h.call(o, i.toDate(e), c) : (typeof h == "string" && (n = h), o.zoomTo(e, n));
    };
    return Object.assign({ title: rt(s.navLinkHint, [a, l], a), "data-navlink": "" }, r ? Ws(d) : { onClick: d });
  }
  return { "aria-label": a };
}
let wn = null;
function du() {
  return wn === null && (wn = uu()), wn;
}
function uu() {
  let t = document.createElement("div");
  nt(t, {
    position: "absolute",
    top: -1e3,
    left: 0,
    border: 0,
    padding: 0,
    overflow: "scroll",
    direction: "rtl"
  }), t.innerHTML = "<div></div>", document.body.appendChild(t);
  let n = t.firstChild.getBoundingClientRect().left > t.getBoundingClientRect().left;
  return sr(t), n;
}
let Sn;
function fu() {
  return Sn || (Sn = hu()), Sn;
}
function hu() {
  let t = document.createElement("div");
  t.style.overflow = "scroll", t.style.position = "absolute", t.style.top = "-9999px", t.style.left = "-9999px", document.body.appendChild(t);
  let e = Do(t);
  return document.body.removeChild(t), e;
}
function Do(t) {
  return {
    x: t.offsetHeight - t.clientHeight,
    y: t.offsetWidth - t.clientWidth
  };
}
function pu(t, e = !1) {
  let n = window.getComputedStyle(t), r = parseInt(n.borderLeftWidth, 10) || 0, i = parseInt(n.borderRightWidth, 10) || 0, s = parseInt(n.borderTopWidth, 10) || 0, o = parseInt(n.borderBottomWidth, 10) || 0, a = Do(t), l = a.y - r - i, d = a.x - s - o, c = {
    borderLeft: r,
    borderRight: i,
    borderTop: s,
    borderBottom: o,
    scrollbarBottom: d,
    scrollbarLeft: 0,
    scrollbarRight: 0
  };
  return du() && n.direction === "rtl" ? c.scrollbarLeft = l : c.scrollbarRight = l, e && (c.paddingLeft = parseInt(n.paddingLeft, 10) || 0, c.paddingRight = parseInt(n.paddingRight, 10) || 0, c.paddingTop = parseInt(n.paddingTop, 10) || 0, c.paddingBottom = parseInt(n.paddingBottom, 10) || 0), c;
}
function gu(t, e = !1, n) {
  let r = Dr(t), i = pu(t, e), s = {
    left: r.left + i.borderLeft + i.scrollbarLeft,
    right: r.right - i.borderRight - i.scrollbarRight,
    top: r.top + i.borderTop,
    bottom: r.bottom - i.borderBottom - i.scrollbarBottom
  };
  return e && (s.left += i.paddingLeft, s.right -= i.paddingRight, s.top += i.paddingTop, s.bottom -= i.paddingBottom), s;
}
function Dr(t) {
  let e = t.getBoundingClientRect();
  return {
    left: e.left + window.scrollX,
    top: e.top + window.scrollY,
    right: e.right + window.scrollX,
    bottom: e.bottom + window.scrollY
  };
}
function mu(t) {
  let e = Co(t), n = t.getBoundingClientRect();
  for (let r of e) {
    let i = So(n, r.getBoundingClientRect());
    if (i)
      n = i;
    else
      return null;
  }
  return n;
}
function Co(t) {
  let e = [];
  for (; t instanceof HTMLElement; ) {
    let n = window.getComputedStyle(t);
    if (n.position === "fixed")
      break;
    /(auto|scroll)/.test(n.overflow + n.overflowY + n.overflowX) && e.push(t), t = t.parentNode;
  }
  return e;
}
class qe {
  constructor(e, n, r, i) {
    this.els = n;
    let s = this.originClientRect = e.getBoundingClientRect();
    r && this.buildElHorizontals(s.left), i && this.buildElVerticals(s.top);
  }
  // Populates the left/right internal coordinate arrays
  buildElHorizontals(e) {
    let n = [], r = [];
    for (let i of this.els) {
      let s = i.getBoundingClientRect();
      n.push(s.left - e), r.push(s.right - e);
    }
    this.lefts = n, this.rights = r;
  }
  // Populates the top/bottom internal coordinate arrays
  buildElVerticals(e) {
    let n = [], r = [];
    for (let i of this.els) {
      let s = i.getBoundingClientRect();
      n.push(s.top - e), r.push(s.bottom - e);
    }
    this.tops = n, this.bottoms = r;
  }
  // Given a left offset (from document left), returns the index of the el that it horizontally intersects.
  // If no intersection is made, returns undefined.
  leftToIndex(e) {
    let { lefts: n, rights: r } = this, i = n.length, s;
    for (s = 0; s < i; s += 1)
      if (e >= n[s] && e < r[s])
        return s;
  }
  // Given a top offset (from document top), returns the index of the el that it vertically intersects.
  // If no intersection is made, returns undefined.
  topToIndex(e) {
    let { tops: n, bottoms: r } = this, i = n.length, s;
    for (s = 0; s < i; s += 1)
      if (e >= n[s] && e < r[s])
        return s;
  }
  // Gets the width of the element at the given index
  getWidth(e) {
    return this.rights[e] - this.lefts[e];
  }
  // Gets the height of the element at the given index
  getHeight(e) {
    return this.bottoms[e] - this.tops[e];
  }
  similarTo(e) {
    return vt(this.tops || [], e.tops || []) && vt(this.bottoms || [], e.bottoms || []) && vt(this.lefts || [], e.lefts || []) && vt(this.rights || [], e.rights || []);
  }
}
function vt(t, e) {
  const n = t.length;
  if (n !== e.length)
    return !1;
  for (let r = 0; r < n; r++)
    if (Math.round(t[r]) !== Math.round(e[r]))
      return !1;
  return !0;
}
class Cr {
  getMaxScrollTop() {
    return this.getScrollHeight() - this.getClientHeight();
  }
  getMaxScrollLeft() {
    return this.getScrollWidth() - this.getClientWidth();
  }
  canScrollVertically() {
    return this.getMaxScrollTop() > 0;
  }
  canScrollHorizontally() {
    return this.getMaxScrollLeft() > 0;
  }
  canScrollUp() {
    return this.getScrollTop() > 0;
  }
  canScrollDown() {
    return this.getScrollTop() < this.getMaxScrollTop();
  }
  canScrollLeft() {
    return this.getScrollLeft() > 0;
  }
  canScrollRight() {
    return this.getScrollLeft() < this.getMaxScrollLeft();
  }
}
class vu extends Cr {
  constructor(e) {
    super(), this.el = e;
  }
  getScrollTop() {
    return this.el.scrollTop;
  }
  getScrollLeft() {
    return this.el.scrollLeft;
  }
  setScrollTop(e) {
    this.el.scrollTop = e;
  }
  setScrollLeft(e) {
    this.el.scrollLeft = e;
  }
  getScrollWidth() {
    return this.el.scrollWidth;
  }
  getScrollHeight() {
    return this.el.scrollHeight;
  }
  getClientHeight() {
    return this.el.clientHeight;
  }
  getClientWidth() {
    return this.el.clientWidth;
  }
}
class bu extends Cr {
  getScrollTop() {
    return window.scrollY;
  }
  getScrollLeft() {
    return window.scrollX;
  }
  setScrollTop(e) {
    window.scroll(window.scrollX, e);
  }
  setScrollLeft(e) {
    window.scroll(e, window.scrollY);
  }
  getScrollWidth() {
    return document.documentElement.scrollWidth;
  }
  getScrollHeight() {
    return document.documentElement.scrollHeight;
  }
  getClientHeight() {
    return document.documentElement.clientHeight;
  }
  getClientWidth() {
    return document.documentElement.clientWidth;
  }
}
class J extends R {
  constructor() {
    super(...arguments), this.uid = ke();
  }
  // Hit System
  // -----------------------------------------------------------------------------------------------------------------
  prepareHits() {
  }
  queryHit(e, n, r, i) {
    return null;
  }
  // Pointer Interaction Utils
  // -----------------------------------------------------------------------------------------------------------------
  isValidSegDownEl(e) {
    return !this.props.eventDrag && // HACK
    !this.props.eventResize && // HACK
    !B(e, ".fc-event-mirror");
  }
  isValidDateDownEl(e) {
    return !B(e, ".fc-event:not(.fc-bg-event)") && !B(e, ".fc-more-link") && // a "more.." link
    !B(e, "a[data-navlink]") && // a clickable nav link
    !B(e, ".fc-popover");
  }
}
class _o {
  constructor(e = (n) => n.thickness || 1) {
    this.getEntryThickness = e, this.strictOrder = !1, this.allowReslicing = !1, this.maxCoord = -1, this.maxStackCnt = -1, this.levelCoords = [], this.entriesByLevel = [], this.stackCnts = {};
  }
  addSegs(e) {
    let n = [];
    for (let r of e)
      this.insertEntry(r, n);
    return n;
  }
  insertEntry(e, n) {
    let r = this.findInsertion(e);
    this.isInsertionValid(r, e) ? this.insertEntryAt(e, r) : this.handleInvalidInsertion(r, e, n);
  }
  isInsertionValid(e, n) {
    return (this.maxCoord === -1 || e.levelCoord + this.getEntryThickness(n) <= this.maxCoord) && (this.maxStackCnt === -1 || e.stackCnt < this.maxStackCnt);
  }
  handleInvalidInsertion(e, n, r) {
    if (this.allowReslicing && e.touchingEntry) {
      const i = Object.assign(Object.assign({}, n), { span: _r(n.span, e.touchingEntry.span) });
      r.push(i), this.splitEntry(n, e.touchingEntry, r);
    } else
      r.push(n);
  }
  /*
  Does NOT add what hit the `barrier` into hiddenEntries. Should already be done.
  */
  splitEntry(e, n, r) {
    let i = e.span, s = n.span;
    i.start < s.start && this.insertEntry({
      index: e.index,
      thickness: e.thickness,
      span: { start: i.start, end: s.start }
    }, r), i.end > s.end && this.insertEntry({
      index: e.index,
      thickness: e.thickness,
      span: { start: s.end, end: i.end }
    }, r);
  }
  insertEntryAt(e, n) {
    let { entriesByLevel: r, levelCoords: i } = this;
    n.lateral === -1 ? (An(i, n.level, n.levelCoord), An(r, n.level, [e])) : An(r[n.level], n.lateral, e), this.stackCnts[Ce(e)] = n.stackCnt;
  }
  /*
  does not care about limits
  */
  findInsertion(e) {
    let { levelCoords: n, entriesByLevel: r, strictOrder: i, stackCnts: s } = this, o = n.length, a = 0, l = -1, d = -1, c = null, h = 0;
    for (let g = 0; g < o; g += 1) {
      const m = n[g];
      if (!i && m >= a + this.getEntryThickness(e))
        break;
      let b = r[g], y, E = Fn(b, e.span.start, Un), D = E[0] + E[1];
      for (
        ;
        // loop through entries that horizontally intersect
        (y = b[D]) && // but not past the whole entry list
        y.span.start < e.span.end;
      ) {
        let C = m + this.getEntryThickness(y);
        C > a && (a = C, c = y, l = g, d = D), C === a && (h = Math.max(h, s[Ce(y)] + 1)), D += 1;
      }
    }
    let f = 0;
    if (c)
      for (f = l + 1; f < o && n[f] < a; )
        f += 1;
    let u = -1;
    return f < o && n[f] === a && (u = Fn(r[f], e.span.end, Un)[0]), {
      touchingLevel: l,
      touchingLateral: d,
      touchingEntry: c,
      stackCnt: h,
      levelCoord: a,
      level: f,
      lateral: u
    };
  }
  // sorted by levelCoord (lowest to highest)
  toRects() {
    let { entriesByLevel: e, levelCoords: n } = this, r = e.length, i = [];
    for (let s = 0; s < r; s += 1) {
      let o = e[s], a = n[s];
      for (let l of o)
        i.push(Object.assign(Object.assign({}, l), { thickness: this.getEntryThickness(l), levelCoord: a }));
    }
    return i;
  }
}
function Un(t) {
  return t.span.end;
}
function Ce(t) {
  return t.index + ":" + t.span.start;
}
function yu(t) {
  let e = [];
  for (let n of t) {
    let r = [], i = {
      span: n.span,
      entries: [n]
    };
    for (let s of e)
      _r(s.span, i.span) ? i = {
        entries: s.entries.concat(i.entries),
        span: Eu(s.span, i.span)
      } : r.push(s);
    r.push(i), e = r;
  }
  return e;
}
function Eu(t, e) {
  return {
    start: Math.min(t.start, e.start),
    end: Math.max(t.end, e.end)
  };
}
function _r(t, e) {
  let n = Math.max(t.start, e.start), r = Math.min(t.end, e.end);
  return n < r ? { start: n, end: r } : null;
}
function An(t, e, n) {
  t.splice(e, 0, n);
}
function Fn(t, e, n) {
  let r = 0, i = t.length;
  if (!i || e < n(t[r]))
    return [0, 0];
  if (e > n(t[i - 1]))
    return [i, 0];
  for (; r < i; ) {
    let s = Math.floor(r + (i - r) / 2), o = n(t[s]);
    if (e < o)
      i = s;
    else if (e > o)
      r = s + 1;
    else
      return [s, 1];
  }
  return [r, 0];
}
class wu {
  constructor(e, n) {
    this.emitter = new an();
  }
  destroy() {
  }
  setMirrorIsVisible(e) {
  }
  setMirrorNeedsRevert(e) {
  }
  setAutoScrollEnabled(e) {
  }
}
const xr = {};
function Su(t, e) {
  return !t || e > 10 ? O({ weekday: "short" }) : e > 1 ? O({ weekday: "short", month: "numeric", day: "numeric", omitCommas: !0 }) : O({ weekday: "long" });
}
const xo = "fc-col-header-cell";
function Ro(t) {
  return t.text;
}
class Au extends R {
  render() {
    let { dateEnv: e, options: n, theme: r, viewApi: i } = this.context, { props: s } = this, { date: o, dateProfile: a } = s, l = Ao(o, s.todayRange, null, a), d = [xo].concat(Ar(l, r)), c = e.format(o, s.dayHeaderFormat), h = !l.isDisabled && s.colCnt > 1 ? Vt(this.context, o) : {}, f = e.toDate(o);
    e.namedTimeZoneImpl && (f = he(f, 36e5));
    let u = Object.assign(Object.assign(Object.assign({ date: f, view: i }, s.extraRenderProps), { text: c }), l);
    return p(W, { elTag: "th", elClasses: d, elAttrs: Object.assign({ role: "columnheader", colSpan: s.colSpan, "data-date": l.isDisabled ? void 0 : cr(o) }, s.extraDataAttrs), renderProps: u, generatorName: "dayHeaderContent", customGenerator: n.dayHeaderContent, defaultGenerator: Ro, classNameGenerator: n.dayHeaderClassNames, didMount: n.dayHeaderDidMount, willUnmount: n.dayHeaderWillUnmount }, (g) => p("div", { className: "fc-scrollgrid-sync-inner" }, !l.isDisabled && p(g, { elTag: "a", elAttrs: h, elClasses: [
      "fc-col-header-cell-cushion",
      s.isSticky && "fc-sticky"
    ] })));
  }
}
const Du = O({ weekday: "long" });
class Cu extends R {
  render() {
    let { props: e } = this, { dateEnv: n, theme: r, viewApi: i, options: s } = this.context, o = H(/* @__PURE__ */ new Date(2592e5), e.dow), a = {
      dow: e.dow,
      isDisabled: !1,
      isFuture: !1,
      isPast: !1,
      isToday: !1,
      isOther: !1
    }, l = n.format(o, e.dayHeaderFormat), d = Object.assign(Object.assign(Object.assign(Object.assign({
      // TODO: make this public?
      date: o
    }, a), { view: i }), e.extraRenderProps), { text: l });
    return p(W, { elTag: "th", elClasses: [
      xo,
      ...Ar(a, r),
      ...e.extraClassNames || []
    ], elAttrs: Object.assign({ role: "columnheader", colSpan: e.colSpan }, e.extraDataAttrs), renderProps: d, generatorName: "dayHeaderContent", customGenerator: s.dayHeaderContent, defaultGenerator: Ro, classNameGenerator: s.dayHeaderClassNames, didMount: s.dayHeaderDidMount, willUnmount: s.dayHeaderWillUnmount }, (c) => p(
      "div",
      { className: "fc-scrollgrid-sync-inner" },
      p(c, { elTag: "a", elClasses: [
        "fc-col-header-cell-cushion",
        e.isSticky && "fc-sticky"
      ], elAttrs: {
        "aria-label": n.format(o, Du)
      } })
    ));
  }
}
class To extends R {
  constructor() {
    super(...arguments), this.createDayHeaderFormatter = A(_u);
  }
  render() {
    let { context: e } = this, { dates: n, dateProfile: r, datesRepDistinctDays: i, renderIntro: s } = this.props, o = this.createDayHeaderFormatter(e.options.dayHeaderFormat, i, n.length);
    return p(Qe, { unit: "day" }, (a, l) => p(
      "tr",
      { role: "row" },
      s && s("day"),
      n.map((d) => i ? p(Au, { key: d.toISOString(), date: d, dateProfile: r, todayRange: l, colCnt: n.length, dayHeaderFormat: o }) : p(Cu, { key: d.getUTCDay(), dow: d.getUTCDay(), dayHeaderFormat: o }))
    ));
  }
}
function _u(t, e, n) {
  return t || Su(e, n);
}
class ko {
  constructor(e, n) {
    let r = e.start, { end: i } = e, s = [], o = [], a = -1;
    for (; r < i; )
      n.isHiddenDay(r) ? s.push(a + 0.5) : (a += 1, s.push(a), o.push(r)), r = H(r, 1);
    this.dates = o, this.indices = s, this.cnt = o.length;
  }
  sliceRange(e) {
    let n = this.getDateDayIndex(e.start), r = this.getDateDayIndex(H(e.end, -1)), i = Math.max(0, n), s = Math.min(this.cnt - 1, r);
    return i = Math.ceil(i), s = Math.floor(s), i <= s ? {
      firstIndex: i,
      lastIndex: s,
      isStart: n === i,
      isEnd: r === s
    } : null;
  }
  // Given a date, returns its chronolocial cell-index from the first cell of the grid.
  // If the date lies between cells (because of hiddenDays), returns a floating-point value between offsets.
  // If before the first offset, returns a negative number.
  // If after the last offset, returns an offset past the last cell offset.
  // Only works for *start* dates of cells. Will not work for exclusive end dates for cells.
  getDateDayIndex(e) {
    let { indices: n } = this, r = Math.floor(Me(this.dates[0], e));
    return r < 0 ? n[0] - 1 : r >= n.length ? n[n.length - 1] + 1 : n[r];
  }
}
class Mo {
  constructor(e, n) {
    let { dates: r } = e, i, s, o;
    if (n) {
      for (s = r[0].getUTCDay(), i = 1; i < r.length && r[i].getUTCDay() !== s; i += 1)
        ;
      o = Math.ceil(r.length / i);
    } else
      o = 1, i = r.length;
    this.rowCnt = o, this.colCnt = i, this.daySeries = e, this.cells = this.buildCells(), this.headerDates = this.buildHeaderDates();
  }
  buildCells() {
    let e = [];
    for (let n = 0; n < this.rowCnt; n += 1) {
      let r = [];
      for (let i = 0; i < this.colCnt; i += 1)
        r.push(this.buildCell(n, i));
      e.push(r);
    }
    return e;
  }
  buildCell(e, n) {
    let r = this.daySeries.dates[e * this.colCnt + n];
    return {
      key: r.toISOString(),
      date: r
    };
  }
  buildHeaderDates() {
    let e = [];
    for (let n = 0; n < this.colCnt; n += 1)
      e.push(this.cells[0][n].date);
    return e;
  }
  sliceRange(e) {
    let { colCnt: n } = this, r = this.daySeries.sliceRange(e), i = [];
    if (r) {
      let { firstIndex: s, lastIndex: o } = r, a = s;
      for (; a <= o; ) {
        let l = Math.floor(a / n), d = Math.min((l + 1) * n, o + 1);
        i.push({
          row: l,
          firstCol: a % n,
          lastCol: (d - 1) % n,
          isStart: r.isStart && a === s,
          isEnd: r.isEnd && d - 1 === o
        }), a = d;
      }
    }
    return i;
  }
}
class Io {
  constructor() {
    this.sliceBusinessHours = A(this._sliceBusinessHours), this.sliceDateSelection = A(this._sliceDateSpan), this.sliceEventStore = A(this._sliceEventStore), this.sliceEventDrag = A(this._sliceInteraction), this.sliceEventResize = A(this._sliceInteraction), this.forceDayIfListItem = !1;
  }
  sliceProps(e, n, r, i, ...s) {
    let { eventUiBases: o } = e, a = this.sliceEventStore(e.eventStore, o, n, r, ...s);
    return {
      dateSelectionSegs: this.sliceDateSelection(e.dateSelection, n, r, o, i, ...s),
      businessHourSegs: this.sliceBusinessHours(e.businessHours, n, r, i, ...s),
      fgEventSegs: a.fg,
      bgEventSegs: a.bg,
      eventDrag: this.sliceEventDrag(e.eventDrag, o, n, r, ...s),
      eventResize: this.sliceEventResize(e.eventResize, o, n, r, ...s),
      eventSelection: e.eventSelection
    };
  }
  sliceNowDate(e, n, r, i, ...s) {
    return this._sliceDateSpan(
      { range: { start: e, end: he(e, 1) }, allDay: !1 },
      // add 1 ms, protect against null range
      n,
      r,
      {},
      i,
      ...s
    );
  }
  _sliceBusinessHours(e, n, r, i, ...s) {
    return e ? this._sliceEventStore(Te(e, bt(n, !!r), i), {}, n, r, ...s).bg : [];
  }
  _sliceEventStore(e, n, r, i, ...s) {
    if (e) {
      let o = Mi(e, n, bt(r, !!i), i);
      return {
        bg: this.sliceEventRanges(o.bg, s),
        fg: this.sliceEventRanges(o.fg, s)
      };
    }
    return { bg: [], fg: [] };
  }
  _sliceInteraction(e, n, r, i, ...s) {
    if (!e)
      return null;
    let o = Mi(e.mutatedEvents, n, bt(r, !!i), i);
    return {
      segs: this.sliceEventRanges(o.fg, s),
      affectedInstances: e.affectedEvents.instances,
      isEvent: e.isEvent
    };
  }
  _sliceDateSpan(e, n, r, i, s, ...o) {
    if (!e)
      return [];
    let a = bt(n, !!r), l = Re(e.range, a);
    if (l) {
      e = Object.assign(Object.assign({}, e), { range: l });
      let d = Yd(e, i, s), c = this.sliceRange(e.range, ...o);
      for (let h of c)
        h.eventRange = d;
      return c;
    }
    return [];
  }
  /*
  "complete" seg means it has component and eventRange
  */
  sliceEventRanges(e, n) {
    let r = [];
    for (let i of e)
      r.push(...this.sliceEventRange(i, n));
    return r;
  }
  /*
  "complete" seg means it has component and eventRange
  */
  sliceEventRange(e, n) {
    let r = e.range;
    this.forceDayIfListItem && e.ui.display === "list-item" && (r = {
      start: r.start,
      end: H(r.start, 1)
    });
    let i = this.sliceRange(r, ...n);
    for (let s of i)
      s.eventRange = e, s.isStart = e.isStart && s.isStart, s.isEnd = e.isEnd && s.isEnd;
    return i;
  }
}
function bt(t, e) {
  let n = t.activeRange;
  return e ? n : {
    start: he(n.start, t.slotMinTime.milliseconds),
    end: he(n.end, t.slotMaxTime.milliseconds - 864e5)
    // 864e5 = ms in a day
  };
}
function No(t, e, n) {
  let { instances: r } = t.mutatedEvents;
  for (let i in r)
    if (!sn(e.validRange, r[i].range))
      return !1;
  return Oo({ eventDrag: t }, n);
}
function xu(t, e, n) {
  return sn(e.validRange, t.range) ? Oo({ dateSelection: t }, n) : !1;
}
function Oo(t, e) {
  let n = e.getCurrentData(), r = Object.assign({ businessHours: n.businessHours, dateSelection: "", eventStore: n.eventStore, eventUiBases: n.eventUiBases, eventSelection: "", eventDrag: null, eventResize: null }, t);
  return (e.pluginHooks.isPropsValid || Ru)(r, e);
}
function Ru(t, e, n = {}, r) {
  return !(t.eventDrag && !Tu(t, e, n, r) || t.dateSelection && !ku(t, e, n, r));
}
function Tu(t, e, n, r) {
  let i = e.getCurrentData(), s = t.eventDrag, o = s.mutatedEvents, a = o.defs, l = o.instances, d = Wt(a, s.isEvent ? t.eventUiBases : { "": i.selectionConfig });
  r && (d = re(d, r));
  let c = _d(t.eventStore, s.affectedEvents.instances), h = c.defs, f = c.instances, u = Wt(h, t.eventUiBases);
  for (let g in l) {
    let m = l[g], b = m.range, y = d[m.defId], E = a[m.defId];
    if (!Po(y.constraints, b, c, t.businessHours, e))
      return !1;
    let { eventOverlap: D } = e.options, C = typeof D == "function" ? D : null;
    for (let T in f) {
      let I = f[T];
      if (gr(b, I.range) && (u[I.defId].overlap === !1 && s.isEvent || y.overlap === !1 || C && !C(
        new N(e, h[I.defId], I),
        // still event
        new N(e, E, m)
      )))
        return !1;
    }
    let P = i.eventStore;
    for (let T of y.allows) {
      let I = Object.assign(Object.assign({}, n), { range: m.range, allDay: E.allDay }), x = P.defs[E.defId], oe = P.instances[g], Xe;
      if (x ? Xe = new N(e, x, oe) : Xe = new N(e, E), !T(Er(I, e), Xe))
        return !1;
    }
  }
  return !0;
}
function ku(t, e, n, r) {
  let i = t.eventStore, s = i.defs, o = i.instances, a = t.dateSelection, l = a.range, { selectionConfig: d } = e.getCurrentData();
  if (r && (d = r(d)), !Po(d.constraints, l, i, t.businessHours, e))
    return !1;
  let { selectOverlap: c } = e.options, h = typeof c == "function" ? c : null;
  for (let f in o) {
    let u = o[f];
    if (gr(l, u.range) && (d.overlap === !1 || h && !h(new N(e, s[u.defId], u), null)))
      return !1;
  }
  for (let f of d.allows) {
    let u = Object.assign(Object.assign({}, n), a);
    if (!f(Er(u, e), null))
      return !1;
  }
  return !0;
}
function Po(t, e, n, r, i) {
  for (let s of t)
    if (!Iu(Mu(s, e, n, r, i), e))
      return !1;
  return !0;
}
function Mu(t, e, n, r, i) {
  return t === "businessHours" ? Dn(Te(r, e, i)) : typeof t == "string" ? Dn(on(n, (s) => s.groupId === t)) : typeof t == "object" && t ? Dn(Te(t, e, i)) : [];
}
function Dn(t) {
  let { instances: e } = t, n = [];
  for (let r in e)
    n.push(e[r].range);
  return n;
}
function Iu(t, e) {
  for (let n of t)
    if (sn(n, e))
      return !0;
  return !1;
}
const yt = /^(visible|hidden)$/;
class Nu extends R {
  constructor() {
    super(...arguments), this.handleEl = (e) => {
      this.el = e, Z(this.props.elRef, e);
    };
  }
  render() {
    let { props: e } = this, { liquid: n, liquidIsAbsolute: r } = e, i = n && r, s = ["fc-scroller"];
    return n && (r ? s.push("fc-scroller-liquid-absolute") : s.push("fc-scroller-liquid")), p("div", { ref: this.handleEl, className: s.join(" "), style: {
      overflowX: e.overflowX,
      overflowY: e.overflowY,
      left: i && -(e.overcomeLeft || 0) || "",
      right: i && -(e.overcomeRight || 0) || "",
      bottom: i && -(e.overcomeBottom || 0) || "",
      marginLeft: !i && -(e.overcomeLeft || 0) || "",
      marginRight: !i && -(e.overcomeRight || 0) || "",
      marginBottom: !i && -(e.overcomeBottom || 0) || "",
      maxHeight: e.maxHeight || ""
    } }, e.children);
  }
  needsXScrolling() {
    if (yt.test(this.props.overflowX))
      return !1;
    let { el: e } = this, n = this.el.getBoundingClientRect().width - this.getYScrollbarWidth(), { children: r } = e;
    for (let i = 0; i < r.length; i += 1)
      if (r[i].getBoundingClientRect().width > n)
        return !0;
    return !1;
  }
  needsYScrolling() {
    if (yt.test(this.props.overflowY))
      return !1;
    let { el: e } = this, n = this.el.getBoundingClientRect().height - this.getXScrollbarWidth(), { children: r } = e;
    for (let i = 0; i < r.length; i += 1)
      if (r[i].getBoundingClientRect().height > n)
        return !0;
    return !1;
  }
  getXScrollbarWidth() {
    return yt.test(this.props.overflowX) ? 0 : this.el.offsetHeight - this.el.clientHeight;
  }
  getYScrollbarWidth() {
    return yt.test(this.props.overflowY) ? 0 : this.el.offsetWidth - this.el.clientWidth;
  }
}
class ee {
  constructor(e) {
    this.masterCallback = e, this.currentMap = {}, this.depths = {}, this.callbackMap = {}, this.handleValue = (n, r) => {
      let { depths: i, currentMap: s } = this, o = !1, a = !1;
      n !== null ? (o = r in s, s[r] = n, i[r] = (i[r] || 0) + 1, a = !0) : (i[r] -= 1, i[r] || (delete s[r], delete this.callbackMap[r], o = !0)), this.masterCallback && (o && this.masterCallback(null, String(r)), a && this.masterCallback(n, String(r)));
    };
  }
  createRef(e) {
    let n = this.callbackMap[e];
    return n || (n = this.callbackMap[e] = (r) => {
      this.handleValue(r, String(e));
    }), n;
  }
  // TODO: check callers that don't care about order. should use getAll instead
  // NOTE: this method has become less valuable now that we are encouraged to map order by some other index
  // TODO: provide ONE array-export function, buildArray, which fails on non-numeric indexes. caller can manipulate and "collect"
  collect(e, n, r) {
    return Vc(this.currentMap, e, n, r);
  }
  getAll() {
    return hr(this.currentMap);
  }
}
function Ou(t) {
  let e = jl(t, ".fc-scrollgrid-shrink"), n = 0;
  for (let r of e)
    n = Math.max(n, rc(r));
  return Math.ceil(n);
}
function $o(t, e) {
  return t.liquid && e.liquid;
}
function Pu(t, e) {
  return e.maxHeight != null || // if its possible for the height to max out, we might need scrollbars
  $o(t, e);
}
function $u(t, e, n, r) {
  let { expandRows: i } = n;
  return typeof e.content == "function" ? e.content(n) : p("table", {
    role: "presentation",
    className: [
      e.tableClassName,
      t.syncRowHeights ? "fc-scrollgrid-sync-table" : ""
    ].join(" "),
    style: {
      minWidth: n.tableMinWidth,
      width: n.clientWidth,
      height: i ? n.clientHeight : ""
      // css `height` on a <table> serves as a min-height
    }
  }, n.tableColGroupNode, p(r ? "thead" : "tbody", {
    role: "presentation"
  }, typeof e.rowContent == "function" ? e.rowContent(n) : e.rowContent));
}
function Hu(t, e) {
  return fe(t, e, q);
}
function Bu(t, e) {
  let n = [];
  for (let r of t) {
    let i = r.span || 1;
    for (let s = 0; s < i; s += 1)
      n.push(p("col", { style: {
        width: r.width === "shrink" ? Lu(e) : r.width || "",
        minWidth: r.minWidth || ""
      } }));
  }
  return p("colgroup", {}, ...n);
}
function Lu(t) {
  return t ?? 4;
}
function zu(t) {
  for (let e of t)
    if (e.width === "shrink")
      return !0;
  return !1;
}
function Uu(t, e) {
  let n = [
    "fc-scrollgrid",
    e.theme.getClass("table")
  ];
  return t && n.push("fc-scrollgrid-liquid"), n;
}
function Fu(t, e) {
  let n = [
    "fc-scrollgrid-section",
    `fc-scrollgrid-section-${t.type}`,
    t.className
    // used?
  ];
  return e && t.liquid && t.maxHeight == null && n.push("fc-scrollgrid-section-liquid"), t.isSticky && n.push("fc-scrollgrid-section-sticky"), n;
}
function jn(t) {
  return p("div", { className: "fc-scrollgrid-sticky-shim", style: {
    width: t.clientWidth,
    minWidth: t.tableMinWidth
  } });
}
function Gt(t) {
  let { stickyHeaderDates: e } = t;
  return (e == null || e === "auto") && (e = t.height === "auto" || t.viewHeight === "auto"), e;
}
function Ho(t) {
  let { stickyFooterScrollbar: e } = t;
  return (e == null || e === "auto") && (e = t.height === "auto" || t.viewHeight === "auto"), e;
}
class Rr extends R {
  constructor() {
    super(...arguments), this.processCols = A((e) => e, Hu), this.renderMicroColGroup = A(Bu), this.scrollerRefs = new ee(), this.scrollerElRefs = new ee(this._handleScrollerEl.bind(this)), this.state = {
      shrinkWidth: null,
      forceYScrollbars: !1,
      scrollerClientWidths: {},
      scrollerClientHeights: {}
    }, this.handleSizing = () => {
      this.safeSetState(Object.assign({ shrinkWidth: this.computeShrinkWidth() }, this.computeScrollerDims()));
    };
  }
  render() {
    let { props: e, state: n, context: r } = this, i = e.sections || [], s = this.processCols(e.cols), o = this.renderMicroColGroup(s, n.shrinkWidth), a = Uu(e.liquid, r);
    e.collapsibleWidth && a.push("fc-scrollgrid-collapsible");
    let l = i.length, d = 0, c, h = [], f = [], u = [];
    for (; d < l && (c = i[d]).type === "header"; )
      h.push(this.renderSection(c, o, !0)), d += 1;
    for (; d < l && (c = i[d]).type === "body"; )
      f.push(this.renderSection(c, o, !1)), d += 1;
    for (; d < l && (c = i[d]).type === "footer"; )
      u.push(this.renderSection(c, o, !0)), d += 1;
    let g = !wo();
    const m = { role: "rowgroup" };
    return p("table", {
      role: "grid",
      className: a.join(" "),
      style: { height: e.height }
    }, !!(!g && h.length) && p("thead", m, ...h), !!(!g && f.length) && p("tbody", m, ...f), !!(!g && u.length) && p("tfoot", m, ...u), g && p("tbody", m, ...h, ...f, ...u));
  }
  renderSection(e, n, r) {
    return "outerContent" in e ? p(k, { key: e.key }, e.outerContent) : p("tr", { key: e.key, role: "presentation", className: Fu(e, this.props.liquid).join(" ") }, this.renderChunkTd(e, n, e.chunk, r));
  }
  renderChunkTd(e, n, r, i) {
    if ("outerContent" in r)
      return r.outerContent;
    let { props: s } = this, { forceYScrollbars: o, scrollerClientWidths: a, scrollerClientHeights: l } = this.state, d = Pu(s, e), c = $o(s, e), h = s.liquid ? o ? "scroll" : d ? "auto" : "hidden" : "visible", f = e.key, u = $u(e, r, {
      tableColGroupNode: n,
      tableMinWidth: "",
      clientWidth: !s.collapsibleWidth && a[f] !== void 0 ? a[f] : null,
      clientHeight: l[f] !== void 0 ? l[f] : null,
      expandRows: e.expandRows,
      syncRowHeights: !1,
      rowSyncHeights: [],
      reportRowHeightChange: () => {
      }
    }, i);
    return p(i ? "th" : "td", {
      ref: r.elRef,
      role: "presentation"
    }, p(
      "div",
      { className: `fc-scroller-harness${c ? " fc-scroller-harness-liquid" : ""}` },
      p(Nu, { ref: this.scrollerRefs.createRef(f), elRef: this.scrollerElRefs.createRef(f), overflowY: h, overflowX: s.liquid ? "hidden" : "visible", maxHeight: e.maxHeight, liquid: c, liquidIsAbsolute: !0 }, u)
    ));
  }
  _handleScrollerEl(e, n) {
    let r = ju(this.props.sections, n);
    r && Z(r.chunk.scrollerElRef, e);
  }
  componentDidMount() {
    this.handleSizing(), this.context.addResizeHandler(this.handleSizing);
  }
  componentDidUpdate() {
    this.handleSizing();
  }
  componentWillUnmount() {
    this.context.removeResizeHandler(this.handleSizing);
  }
  computeShrinkWidth() {
    return zu(this.props.cols) ? Ou(this.scrollerElRefs.getAll()) : 0;
  }
  computeScrollerDims() {
    let e = fu(), { scrollerRefs: n, scrollerElRefs: r } = this, i = !1, s = {}, o = {};
    for (let a in n.currentMap) {
      let l = n.currentMap[a];
      if (l && l.needsYScrolling()) {
        i = !0;
        break;
      }
    }
    for (let a of this.props.sections) {
      let l = a.key, d = r.currentMap[l];
      if (d) {
        let c = d.parentNode;
        s[l] = Math.floor(c.getBoundingClientRect().width - (i ? e.y : 0)), o[l] = Math.floor(c.getBoundingClientRect().height);
      }
    }
    return { forceYScrollbars: i, scrollerClientWidths: s, scrollerClientHeights: o };
  }
}
Rr.addStateEquality({
  scrollerClientWidths: q,
  scrollerClientHeights: q
});
function ju(t, e) {
  for (let n of t)
    if (n.key === e)
      return n;
  return null;
}
class Tr extends R {
  constructor() {
    super(...arguments), this.buildPublicEvent = A((e, n, r) => new N(e, n, r)), this.handleEl = (e) => {
      this.el = e, Z(this.props.elRef, e), e && Ii(e, this.props.seg);
    };
  }
  render() {
    const { props: e, context: n } = this, { options: r } = n, { seg: i } = e, { eventRange: s } = i, { ui: o } = s, a = {
      event: this.buildPublicEvent(n, s.def, s.instance),
      view: n.viewApi,
      timeText: e.timeText,
      textColor: o.textColor,
      backgroundColor: o.backgroundColor,
      borderColor: o.borderColor,
      isDraggable: !e.disableDragging && Bd(i, n),
      isStartResizable: !e.disableResizing && Ld(i, n),
      isEndResizable: !e.disableResizing && zd(i),
      isMirror: !!(e.isDragging || e.isResizing || e.isDateSelecting),
      isStart: !!i.isStart,
      isEnd: !!i.isEnd,
      isPast: !!e.isPast,
      isFuture: !!e.isFuture,
      isToday: !!e.isToday,
      isSelected: !!e.isSelected,
      isDragging: !!e.isDragging,
      isResizing: !!e.isResizing
    };
    return p(W, { elRef: this.handleEl, elTag: e.elTag, elAttrs: e.elAttrs, elClasses: [
      ...Ud(a),
      ...i.eventRange.ui.classNames,
      ...e.elClasses || []
    ], elStyle: e.elStyle, renderProps: a, generatorName: "eventContent", customGenerator: r.eventContent, defaultGenerator: e.defaultGenerator, classNameGenerator: r.eventClassNames, didMount: r.eventDidMount, willUnmount: r.eventWillUnmount }, e.children);
  }
  componentDidUpdate(e) {
    this.el && this.props.seg !== e.seg && Ii(this.el, this.props.seg);
  }
}
class kr extends R {
  render() {
    let { props: e, context: n } = this, { options: r } = n, { seg: i } = e, { ui: s } = i.eventRange, o = r.eventTimeFormat || e.defaultTimeFormat, a = mo(i, o, n, e.defaultDisplayEventTime, e.defaultDisplayEventEnd);
    return p(Tr, Object.assign({}, e, { elTag: "a", elStyle: {
      borderColor: s.borderColor,
      backgroundColor: s.backgroundColor
    }, elAttrs: bo(i, n), defaultGenerator: Wu, timeText: a }), (l, d) => p(
      k,
      null,
      p(l, { elTag: "div", elClasses: ["fc-event-main"], elStyle: { color: d.textColor } }),
      !!d.isStartResizable && p("div", { className: "fc-event-resizer fc-event-resizer-start" }),
      !!d.isEndResizable && p("div", { className: "fc-event-resizer fc-event-resizer-end" })
    ));
  }
}
kr.addPropsEquality({
  seg: q
});
function Wu(t) {
  return p(
    "div",
    { className: "fc-event-main-frame" },
    t.timeText && p("div", { className: "fc-event-time" }, t.timeText),
    p(
      "div",
      { className: "fc-event-title-container" },
      p("div", { className: "fc-event-title fc-sticky" }, t.event.title || p(k, null, " "))
    )
  );
}
const Mr = (t) => p(ie.Consumer, null, (e) => {
  let { options: n } = e, r = {
    isAxis: t.isAxis,
    date: e.dateEnv.toDate(t.date),
    view: e.viewApi
  };
  return p(W, { elRef: t.elRef, elTag: t.elTag || "div", elAttrs: t.elAttrs, elClasses: t.elClasses, elStyle: t.elStyle, renderProps: r, generatorName: "nowIndicatorContent", customGenerator: n.nowIndicatorContent, classNameGenerator: n.nowIndicatorClassNames, didMount: n.nowIndicatorDidMount, willUnmount: n.nowIndicatorWillUnmount }, t.children);
}), Vu = O({ day: "numeric" });
class Ir extends R {
  constructor() {
    super(...arguments), this.refineRenderProps = xt(Gu);
  }
  render() {
    let { props: e, context: n } = this, { options: r } = n, i = this.refineRenderProps({
      date: e.date,
      dateProfile: e.dateProfile,
      todayRange: e.todayRange,
      isMonthStart: e.isMonthStart || !1,
      showDayNumber: e.showDayNumber,
      extraRenderProps: e.extraRenderProps,
      viewApi: n.viewApi,
      dateEnv: n.dateEnv,
      monthStartFormat: r.monthStartFormat
    });
    return p(W, { elRef: e.elRef, elTag: e.elTag, elAttrs: Object.assign(Object.assign({}, e.elAttrs), i.isDisabled ? {} : { "data-date": cr(e.date) }), elClasses: [
      ...Ar(i, n.theme),
      ...e.elClasses || []
    ], elStyle: e.elStyle, renderProps: i, generatorName: "dayCellContent", customGenerator: r.dayCellContent, defaultGenerator: e.defaultGenerator, classNameGenerator: (
      // don't use custom classNames if disabled
      i.isDisabled ? void 0 : r.dayCellClassNames
    ), didMount: r.dayCellDidMount, willUnmount: r.dayCellWillUnmount }, e.children);
  }
}
function Nr(t) {
  return !!(t.dayCellContent || Hn("dayCellContent", t));
}
function Gu(t) {
  let { date: e, dateEnv: n, dateProfile: r, isMonthStart: i } = t, s = Ao(e, t.todayRange, null, r), o = t.showDayNumber ? n.format(e, i ? t.monthStartFormat : Vu) : "";
  return Object.assign(Object.assign(Object.assign({ date: n.toDate(e), view: t.viewApi }, s), {
    isMonthStart: i,
    dayNumberText: o
  }), t.extraRenderProps);
}
class Bo extends R {
  render() {
    let { props: e } = this, { seg: n } = e;
    return p(Tr, { elTag: "div", elClasses: ["fc-bg-event"], elStyle: { backgroundColor: n.eventRange.ui.backgroundColor }, defaultGenerator: qu, seg: n, timeText: "", isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: !1, isPast: e.isPast, isFuture: e.isFuture, isToday: e.isToday, disableDragging: !0, disableResizing: !0 });
  }
}
function qu(t) {
  let { title: e } = t.event;
  return e && p("div", { className: "fc-event-title" }, t.event.title);
}
function Lo(t) {
  return p("div", { className: `fc-${t}` });
}
const zo = (t) => p(ie.Consumer, null, (e) => {
  let { dateEnv: n, options: r } = e, { date: i } = t, s = r.weekNumberFormat || t.defaultFormat, o = n.computeWeekNumber(i), a = n.format(i, s), l = { num: o, text: a, date: i };
  return p(
    W,
    { elRef: t.elRef, elTag: t.elTag, elAttrs: t.elAttrs, elClasses: t.elClasses, elStyle: t.elStyle, renderProps: l, generatorName: "weekNumberContent", customGenerator: r.weekNumberContent, defaultGenerator: Yu, classNameGenerator: r.weekNumberClassNames, didMount: r.weekNumberDidMount, willUnmount: r.weekNumberWillUnmount },
    t.children
  );
});
function Yu(t) {
  return t.text;
}
const Cn = 10;
class Qu extends R {
  constructor() {
    super(...arguments), this.state = {
      titleId: nn()
    }, this.handleRootEl = (e) => {
      this.rootEl = e, this.props.elRef && Z(this.props.elRef, e);
    }, this.handleDocumentMouseDown = (e) => {
      const n = Fs(e);
      this.rootEl.contains(n) || this.handleCloseClick();
    }, this.handleDocumentKeyDown = (e) => {
      e.key === "Escape" && this.handleCloseClick();
    }, this.handleCloseClick = () => {
      let { onClose: e } = this.props;
      e && e();
    };
  }
  render() {
    let { theme: e, options: n } = this.context, { props: r, state: i } = this, s = [
      "fc-popover",
      e.getClass("popover")
    ].concat(r.extraClassNames || []);
    return Tl(p(
      "div",
      Object.assign({}, r.extraAttrs, { id: r.id, className: s.join(" "), "aria-labelledby": i.titleId, ref: this.handleRootEl }),
      p(
        "div",
        { className: "fc-popover-header " + e.getClass("popoverHeader") },
        p("span", { className: "fc-popover-title", id: i.titleId }, r.title),
        p("span", { className: "fc-popover-close " + e.getIconClass("close"), title: n.closeHint, onClick: this.handleCloseClick })
      ),
      p("div", { className: "fc-popover-body " + e.getClass("popoverContent") }, r.children)
    ), r.parentEl);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleDocumentMouseDown), document.addEventListener("keydown", this.handleDocumentKeyDown), this.updateSize();
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleDocumentMouseDown), document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }
  updateSize() {
    let { isRtl: e } = this.context, { alignmentEl: n, alignGridTop: r } = this.props, { rootEl: i } = this, s = mu(n);
    if (s) {
      let o = i.getBoundingClientRect(), a = r ? B(n, ".fc-scrollgrid").getBoundingClientRect().top : s.top, l = e ? s.right - o.width : s.left;
      a = Math.max(a, Cn), l = Math.min(l, document.documentElement.clientWidth - Cn - o.width), l = Math.max(l, Cn);
      let d = i.offsetParent.getBoundingClientRect();
      nt(i, {
        top: a - d.top,
        left: l - d.left
      });
    }
  }
}
class Zu extends J {
  constructor() {
    super(...arguments), this.handleRootEl = (e) => {
      this.rootEl = e, e ? this.context.registerInteractiveComponent(this, {
        el: e,
        useEventCenter: !1
      }) : this.context.unregisterInteractiveComponent(this);
    };
  }
  render() {
    let { options: e, dateEnv: n } = this.context, { props: r } = this, { startDate: i, todayRange: s, dateProfile: o } = r, a = n.format(i, e.dayPopoverFormat);
    return p(Ir, { elRef: this.handleRootEl, date: i, dateProfile: o, todayRange: s }, (l, d, c) => p(
      Qu,
      { elRef: c.ref, id: r.id, title: a, extraClassNames: ["fc-more-popover"].concat(c.className || []), extraAttrs: c, parentEl: r.parentEl, alignmentEl: r.alignmentEl, alignGridTop: r.alignGridTop, onClose: r.onClose },
      Nr(e) && p(l, { elTag: "div", elClasses: ["fc-more-popover-misc"] }),
      r.children
    ));
  }
  queryHit(e, n, r, i) {
    let { rootEl: s, props: o } = this;
    return e >= 0 && e < r && n >= 0 && n < i ? {
      dateProfile: o.dateProfile,
      dateSpan: Object.assign({ allDay: !o.forceTimed, range: {
        start: o.startDate,
        end: o.endDate
      } }, o.extraDateSpan),
      dayEl: s,
      rect: {
        left: 0,
        top: 0,
        right: r,
        bottom: i
      },
      layer: 1
      // important when comparing with hits from other components
    } : null;
  }
}
class Uo extends R {
  constructor() {
    super(...arguments), this.state = {
      isPopoverOpen: !1,
      popoverId: nn()
    }, this.handleLinkEl = (e) => {
      this.linkEl = e, this.props.elRef && Z(this.props.elRef, e);
    }, this.handleClick = (e) => {
      let { props: n, context: r } = this, { moreLinkClick: i } = r.options, s = Oi(n).start;
      function o(a) {
        let { def: l, instance: d, range: c } = a.eventRange;
        return {
          event: new N(r, l, d),
          start: r.dateEnv.toDate(c.start),
          end: r.dateEnv.toDate(c.end),
          isStart: a.isStart,
          isEnd: a.isEnd
        };
      }
      typeof i == "function" && (i = i({
        date: s,
        allDay: !!n.allDayDate,
        allSegs: n.allSegs.map(o),
        hiddenSegs: n.hiddenSegs.map(o),
        jsEvent: e,
        view: r.viewApi
      })), !i || i === "popover" ? this.setState({ isPopoverOpen: !0 }) : typeof i == "string" && r.calendarApi.zoomTo(s, i);
    }, this.handlePopoverClose = () => {
      this.setState({ isPopoverOpen: !1 });
    };
  }
  render() {
    let { props: e, state: n } = this;
    return p(ie.Consumer, null, (r) => {
      let { viewApi: i, options: s, calendarApi: o } = r, { moreLinkText: a } = s, { moreCnt: l } = e, d = Oi(e), c = typeof a == "function" ? a.call(o, l) : `+${l} ${a}`, h = rt(s.moreLinkHint, [l], c), f = {
        num: l,
        shortText: `+${l}`,
        text: c,
        view: i
      };
      return p(
        k,
        null,
        !!e.moreCnt && p(W, { elTag: e.elTag || "a", elRef: this.handleLinkEl, elClasses: [
          ...e.elClasses || [],
          "fc-more-link"
        ], elStyle: e.elStyle, elAttrs: Object.assign(Object.assign(Object.assign({}, e.elAttrs), Ws(this.handleClick)), { title: h, "aria-expanded": n.isPopoverOpen, "aria-controls": n.isPopoverOpen ? n.popoverId : "" }), renderProps: f, generatorName: "moreLinkContent", customGenerator: s.moreLinkContent, defaultGenerator: e.defaultGenerator || Ku, classNameGenerator: s.moreLinkClassNames, didMount: s.moreLinkDidMount, willUnmount: s.moreLinkWillUnmount }, e.children),
        n.isPopoverOpen && p(Zu, { id: n.popoverId, startDate: d.start, endDate: d.end, dateProfile: e.dateProfile, todayRange: e.todayRange, extraDateSpan: e.extraDateSpan, parentEl: this.parentEl, alignmentEl: e.alignmentElRef ? e.alignmentElRef.current : this.linkEl, alignGridTop: e.alignGridTop, forceTimed: e.forceTimed, onClose: this.handlePopoverClose }, e.popoverContent())
      );
    });
  }
  componentDidMount() {
    this.updateParentEl();
  }
  componentDidUpdate() {
    this.updateParentEl();
  }
  updateParentEl() {
    this.linkEl && (this.parentEl = B(this.linkEl, ".fc-view-harness"));
  }
}
function Ku(t) {
  return t.text;
}
function Oi(t) {
  if (t.allDayDate)
    return {
      start: t.allDayDate,
      end: H(t.allDayDate, 1)
    };
  let { hiddenSegs: e } = t;
  return {
    start: Fo(e),
    end: Ju(e)
  };
}
function Fo(t) {
  return t.reduce(Xu).eventRange.range.start;
}
function Xu(t, e) {
  return t.eventRange.range.start < e.eventRange.range.start ? t : e;
}
function Ju(t) {
  return t.reduce(ef).eventRange.range.end;
}
function ef(t, e) {
  return t.eventRange.range.end > e.eventRange.range.end ? t : e;
}
const tf = [], jo = {
  code: "en",
  week: {
    dow: 0,
    doy: 4
    // 4 days need to be within the year to be considered the first week
  },
  direction: "ltr",
  buttonText: {
    prev: "prev",
    next: "next",
    prevYear: "prev year",
    nextYear: "next year",
    year: "year",
    today: "today",
    month: "month",
    week: "week",
    day: "day",
    list: "list"
  },
  weekText: "W",
  weekTextLong: "Week",
  closeHint: "Close",
  timeHint: "Time",
  eventHint: "Event",
  allDayText: "all-day",
  moreLinkText: "more",
  noEventsText: "No events to display"
}, Wo = Object.assign(Object.assign({}, jo), {
  // Includes things we don't want other locales to inherit,
  // things that derive from other translatable strings.
  buttonHints: {
    prev: "Previous $0",
    next: "Next $0",
    today(t, e) {
      return e === "day" ? "Today" : `This ${t}`;
    }
  },
  viewHint: "$0 view",
  navLinkHint: "Go to $0",
  moreLinkHint(t) {
    return `Show ${t} more event${t === 1 ? "" : "s"}`;
  }
});
function nf(t) {
  let e = t.length > 0 ? t[0].code : "en", n = tf.concat(t), r = {
    en: Wo
  };
  for (let i of n)
    r[i.code] = i;
  return {
    map: r,
    defaultCode: e
  };
}
function Vo(t, e) {
  return typeof t == "object" && !Array.isArray(t) ? Go(t.code, [t.code], t) : rf(t, e);
}
function rf(t, e) {
  let n = [].concat(t || []), r = sf(n, e) || Wo;
  return Go(t, n, r);
}
function sf(t, e) {
  for (let n = 0; n < t.length; n += 1) {
    let r = t[n].toLocaleLowerCase().split("-");
    for (let i = r.length; i > 0; i -= 1) {
      let s = r.slice(0, i).join("-");
      if (e[s])
        return e[s];
    }
  }
  return null;
}
function Go(t, e, n) {
  let r = fr([jo, n], ["buttonText"]);
  delete r.code;
  let { week: i } = r;
  return delete r.week, {
    codeArg: t,
    codes: e,
    week: i,
    simpleNumberFormat: new Intl.NumberFormat(t),
    options: r
  };
}
function se(t) {
  return {
    id: ke(),
    name: t.name,
    premiumReleaseDate: t.premiumReleaseDate ? new Date(t.premiumReleaseDate) : void 0,
    deps: t.deps || [],
    reducers: t.reducers || [],
    isLoadingFuncs: t.isLoadingFuncs || [],
    contextInit: [].concat(t.contextInit || []),
    eventRefiners: t.eventRefiners || {},
    eventDefMemberAdders: t.eventDefMemberAdders || [],
    eventSourceRefiners: t.eventSourceRefiners || {},
    isDraggableTransformers: t.isDraggableTransformers || [],
    eventDragMutationMassagers: t.eventDragMutationMassagers || [],
    eventDefMutationAppliers: t.eventDefMutationAppliers || [],
    dateSelectionTransformers: t.dateSelectionTransformers || [],
    datePointTransforms: t.datePointTransforms || [],
    dateSpanTransforms: t.dateSpanTransforms || [],
    views: t.views || {},
    viewPropsTransformers: t.viewPropsTransformers || [],
    isPropsValid: t.isPropsValid || null,
    externalDefTransforms: t.externalDefTransforms || [],
    viewContainerAppends: t.viewContainerAppends || [],
    eventDropTransformers: t.eventDropTransformers || [],
    componentInteractions: t.componentInteractions || [],
    calendarInteractions: t.calendarInteractions || [],
    themeClasses: t.themeClasses || {},
    eventSourceDefs: t.eventSourceDefs || [],
    cmdFormatter: t.cmdFormatter,
    recurringTypes: t.recurringTypes || [],
    namedTimeZonedImpl: t.namedTimeZonedImpl,
    initialView: t.initialView || "",
    elementDraggingImpl: t.elementDraggingImpl,
    optionChangeHandlers: t.optionChangeHandlers || {},
    scrollGridImpl: t.scrollGridImpl || null,
    listenerRefiners: t.listenerRefiners || {},
    optionRefiners: t.optionRefiners || {},
    propSetHandlers: t.propSetHandlers || {}
  };
}
function of(t, e) {
  let n = {}, r = {
    premiumReleaseDate: void 0,
    reducers: [],
    isLoadingFuncs: [],
    contextInit: [],
    eventRefiners: {},
    eventDefMemberAdders: [],
    eventSourceRefiners: {},
    isDraggableTransformers: [],
    eventDragMutationMassagers: [],
    eventDefMutationAppliers: [],
    dateSelectionTransformers: [],
    datePointTransforms: [],
    dateSpanTransforms: [],
    views: {},
    viewPropsTransformers: [],
    isPropsValid: null,
    externalDefTransforms: [],
    viewContainerAppends: [],
    eventDropTransformers: [],
    componentInteractions: [],
    calendarInteractions: [],
    themeClasses: {},
    eventSourceDefs: [],
    cmdFormatter: null,
    recurringTypes: [],
    namedTimeZonedImpl: null,
    initialView: "",
    elementDraggingImpl: null,
    optionChangeHandlers: {},
    scrollGridImpl: null,
    listenerRefiners: {},
    optionRefiners: {},
    propSetHandlers: {}
  };
  function i(s) {
    for (let o of s) {
      const a = o.name, l = n[a];
      l === void 0 ? (n[a] = o.id, i(o.deps), r = lf(r, o)) : l !== o.id && console.warn(`Duplicate plugin '${a}'`);
    }
  }
  return t && i(t), i(e), r;
}
function af() {
  let t = [], e = [], n;
  return (r, i) => ((!n || !fe(r, t) || !fe(i, e)) && (n = of(r, i)), t = r, e = i, n);
}
function lf(t, e) {
  return {
    premiumReleaseDate: cf(t.premiumReleaseDate, e.premiumReleaseDate),
    reducers: t.reducers.concat(e.reducers),
    isLoadingFuncs: t.isLoadingFuncs.concat(e.isLoadingFuncs),
    contextInit: t.contextInit.concat(e.contextInit),
    eventRefiners: Object.assign(Object.assign({}, t.eventRefiners), e.eventRefiners),
    eventDefMemberAdders: t.eventDefMemberAdders.concat(e.eventDefMemberAdders),
    eventSourceRefiners: Object.assign(Object.assign({}, t.eventSourceRefiners), e.eventSourceRefiners),
    isDraggableTransformers: t.isDraggableTransformers.concat(e.isDraggableTransformers),
    eventDragMutationMassagers: t.eventDragMutationMassagers.concat(e.eventDragMutationMassagers),
    eventDefMutationAppliers: t.eventDefMutationAppliers.concat(e.eventDefMutationAppliers),
    dateSelectionTransformers: t.dateSelectionTransformers.concat(e.dateSelectionTransformers),
    datePointTransforms: t.datePointTransforms.concat(e.datePointTransforms),
    dateSpanTransforms: t.dateSpanTransforms.concat(e.dateSpanTransforms),
    views: Object.assign(Object.assign({}, t.views), e.views),
    viewPropsTransformers: t.viewPropsTransformers.concat(e.viewPropsTransformers),
    isPropsValid: e.isPropsValid || t.isPropsValid,
    externalDefTransforms: t.externalDefTransforms.concat(e.externalDefTransforms),
    viewContainerAppends: t.viewContainerAppends.concat(e.viewContainerAppends),
    eventDropTransformers: t.eventDropTransformers.concat(e.eventDropTransformers),
    calendarInteractions: t.calendarInteractions.concat(e.calendarInteractions),
    componentInteractions: t.componentInteractions.concat(e.componentInteractions),
    themeClasses: Object.assign(Object.assign({}, t.themeClasses), e.themeClasses),
    eventSourceDefs: t.eventSourceDefs.concat(e.eventSourceDefs),
    cmdFormatter: e.cmdFormatter || t.cmdFormatter,
    recurringTypes: t.recurringTypes.concat(e.recurringTypes),
    namedTimeZonedImpl: e.namedTimeZonedImpl || t.namedTimeZonedImpl,
    initialView: t.initialView || e.initialView,
    elementDraggingImpl: t.elementDraggingImpl || e.elementDraggingImpl,
    optionChangeHandlers: Object.assign(Object.assign({}, t.optionChangeHandlers), e.optionChangeHandlers),
    scrollGridImpl: e.scrollGridImpl || t.scrollGridImpl,
    listenerRefiners: Object.assign(Object.assign({}, t.listenerRefiners), e.listenerRefiners),
    optionRefiners: Object.assign(Object.assign({}, t.optionRefiners), e.optionRefiners),
    propSetHandlers: Object.assign(Object.assign({}, t.propSetHandlers), e.propSetHandlers)
  };
}
function cf(t, e) {
  return t === void 0 ? e : e === void 0 ? t : new Date(Math.max(t.valueOf(), e.valueOf()));
}
class me extends ut {
}
me.prototype.classes = {
  root: "fc-theme-standard",
  tableCellShaded: "fc-cell-shaded",
  buttonGroup: "fc-button-group",
  button: "fc-button fc-button-primary",
  buttonActive: "fc-button-active"
};
me.prototype.baseIconClass = "fc-icon";
me.prototype.iconClasses = {
  close: "fc-icon-x",
  prev: "fc-icon-chevron-left",
  next: "fc-icon-chevron-right",
  prevYear: "fc-icon-chevrons-left",
  nextYear: "fc-icon-chevrons-right"
};
me.prototype.rtlIconClasses = {
  prev: "fc-icon-chevron-right",
  next: "fc-icon-chevron-left",
  prevYear: "fc-icon-chevrons-right",
  nextYear: "fc-icon-chevrons-left"
};
me.prototype.iconOverrideOption = "buttonIcons";
me.prototype.iconOverrideCustomButtonOption = "icon";
me.prototype.iconOverridePrefix = "fc-icon-";
function df(t, e) {
  let n = {}, r;
  for (r in t)
    Wn(r, n, t, e);
  for (r in e)
    Wn(r, n, t, e);
  return n;
}
function Wn(t, e, n, r) {
  if (e[t])
    return e[t];
  let i = uf(t, e, n, r);
  return i && (e[t] = i), i;
}
function uf(t, e, n, r) {
  let i = n[t], s = r[t], o = (c) => i && i[c] !== null ? i[c] : s && s[c] !== null ? s[c] : null, a = o("component"), l = o("superType"), d = null;
  if (l) {
    if (l === t)
      throw new Error("Can't have a custom view type that references itself");
    d = Wn(l, e, n, r);
  }
  return !a && d && (a = d.component), a ? {
    type: t,
    component: a,
    defaults: Object.assign(Object.assign({}, d ? d.defaults : {}), i ? i.rawOptions : {}),
    overrides: Object.assign(Object.assign({}, d ? d.overrides : {}), s ? s.rawOptions : {})
  } : null;
}
function Pi(t) {
  return re(t, ff);
}
function ff(t) {
  let e = typeof t == "function" ? { component: t } : t, { component: n } = e;
  return e.content ? n = $i(e) : n && !(n.prototype instanceof R) && (n = $i(Object.assign(Object.assign({}, e), { content: n }))), {
    superType: e.type,
    component: n,
    rawOptions: e
    // includes type and component too :(
  };
}
function $i(t) {
  return (e) => p(ie.Consumer, null, (n) => p(W, { elTag: "div", elClasses: Js(n.viewSpec), renderProps: Object.assign(Object.assign({}, e), { nextDayThreshold: n.options.nextDayThreshold }), generatorName: void 0, customGenerator: t.content, classNameGenerator: t.classNames, didMount: t.didMount, willUnmount: t.willUnmount }));
}
function hf(t, e, n, r) {
  let i = Pi(t), s = Pi(e.views), o = df(i, s);
  return re(o, (a) => pf(a, s, e, n, r));
}
function pf(t, e, n, r, i) {
  let s = t.overrides.duration || t.defaults.duration || r.duration || n.duration, o = null, a = "", l = "", d = {};
  if (s && (o = gf(s), o)) {
    let f = $n(o);
    a = f.unit, f.value === 1 && (l = a, d = e[a] ? e[a].rawOptions : {});
  }
  let c = (f) => {
    let u = f.buttonText || {}, g = t.defaults.buttonTextKey;
    return g != null && u[g] != null ? u[g] : u[t.type] != null ? u[t.type] : u[l] != null ? u[l] : null;
  }, h = (f) => {
    let u = f.buttonHints || {}, g = t.defaults.buttonTextKey;
    return g != null && u[g] != null ? u[g] : u[t.type] != null ? u[t.type] : u[l] != null ? u[l] : null;
  };
  return {
    type: t.type,
    component: t.component,
    duration: o,
    durationUnit: a,
    singleUnit: l,
    optionDefaults: t.defaults,
    optionOverrides: Object.assign(Object.assign({}, d), t.overrides),
    buttonTextOverride: c(r) || c(n) || // constructor-specified buttonText lookup hash takes precedence
    t.overrides.buttonText,
    buttonTextDefault: c(i) || t.defaults.buttonText || c(it) || t.type,
    // not DRY
    buttonTitleOverride: h(r) || h(n) || t.overrides.buttonHint,
    buttonTitleDefault: h(i) || t.defaults.buttonHint || h(it)
    // will eventually fall back to buttonText
  };
}
let Hi = {};
function gf(t) {
  let e = JSON.stringify(t), n = Hi[e];
  return n === void 0 && (n = _(t), Hi[e] = n), n;
}
function mf(t, e) {
  return e.type === "CHANGE_VIEW_TYPE" && (t = e.viewType), t;
}
function vf(t, e) {
  return e.type === "CHANGE_DATE" ? e.dateMarker : t;
}
function bf(t, e, n) {
  let r = t.initialDate;
  return r != null ? e.createMarker(r) : n.getDateMarker();
}
function yf(t, e) {
  return e.type === "SET_OPTION" ? Object.assign(Object.assign({}, t), { [e.optionName]: e.rawOptionValue }) : t;
}
function Ef(t, e, n, r) {
  let i;
  switch (e.type) {
    case "CHANGE_VIEW_TYPE":
      return r.build(e.dateMarker || n);
    case "CHANGE_DATE":
      return r.build(e.dateMarker);
    case "PREV":
      if (i = r.buildPrev(t, n), i.isValid)
        return i;
      break;
    case "NEXT":
      if (i = r.buildNext(t, n), i.isValid)
        return i;
      break;
  }
  return t;
}
function wf(t, e, n) {
  let r = e ? e.activeRange : null;
  return Yo({}, Rf(t, n), r, n);
}
function Sf(t, e, n, r) {
  let i = n ? n.activeRange : null;
  switch (e.type) {
    case "ADD_EVENT_SOURCES":
      return Yo(t, e.sources, i, r);
    case "REMOVE_EVENT_SOURCE":
      return Df(t, e.sourceId);
    case "PREV":
    // TODO: how do we track all actions that affect dateProfile :(
    case "NEXT":
    case "CHANGE_DATE":
    case "CHANGE_VIEW_TYPE":
      return n ? Qo(t, i, r) : t;
    case "FETCH_EVENT_SOURCES":
      return Or(t, e.sourceIds ? (
        // why no type?
        Ys(e.sourceIds)
      ) : Zo(t, r), i, e.isRefetch || !1, r);
    case "RECEIVE_EVENTS":
    case "RECEIVE_EVENT_ERROR":
      return xf(t, e.sourceId, e.fetchId, e.fetchRange);
    case "REMOVE_ALL_EVENT_SOURCES":
      return {};
    default:
      return t;
  }
}
function Af(t, e, n) {
  let r = e ? e.activeRange : null;
  return Or(t, Zo(t, n), r, !0, n);
}
function qo(t) {
  for (let e in t)
    if (t[e].isFetching)
      return !0;
  return !1;
}
function Yo(t, e, n, r) {
  let i = {};
  for (let s of e)
    i[s.sourceId] = s;
  return n && (i = Qo(i, n, r)), Object.assign(Object.assign({}, t), i);
}
function Df(t, e) {
  return xe(t, (n) => n.sourceId !== e);
}
function Qo(t, e, n) {
  return Or(t, xe(t, (r) => Cf(r, e, n)), e, !1, n);
}
function Cf(t, e, n) {
  return Ko(t, n) ? !n.options.lazyFetching || !t.fetchRange || t.isFetching || // always cancel outdated in-progress fetches
  e.start < t.fetchRange.start || e.end > t.fetchRange.end : !t.latestFetchId;
}
function Or(t, e, n, r, i) {
  let s = {};
  for (let o in t) {
    let a = t[o];
    e[o] ? s[o] = _f(a, n, r, i) : s[o] = a;
  }
  return s;
}
function _f(t, e, n, r) {
  let { options: i, calendarApi: s } = r, o = r.pluginHooks.eventSourceDefs[t.sourceDefId], a = ke();
  return o.fetch({
    eventSource: t,
    range: e,
    isRefetch: n,
    context: r
  }, (l) => {
    let { rawEvents: d } = l;
    i.eventSourceSuccess && (d = i.eventSourceSuccess.call(s, d, l.response) || d), t.success && (d = t.success.call(s, d, l.response) || d), r.dispatch({
      type: "RECEIVE_EVENTS",
      sourceId: t.sourceId,
      fetchId: a,
      fetchRange: e,
      rawEvents: d
    });
  }, (l) => {
    let d = !1;
    i.eventSourceFailure && (i.eventSourceFailure.call(s, l), d = !0), t.failure && (t.failure(l), d = !0), d || console.warn(l.message, l), r.dispatch({
      type: "RECEIVE_EVENT_ERROR",
      sourceId: t.sourceId,
      fetchId: a,
      fetchRange: e,
      error: l
    });
  }), Object.assign(Object.assign({}, t), { isFetching: !0, latestFetchId: a });
}
function xf(t, e, n, r) {
  let i = t[e];
  return i && // not already removed
  n === i.latestFetchId ? Object.assign(Object.assign({}, t), { [e]: Object.assign(Object.assign({}, i), { isFetching: !1, fetchRange: r }) }) : t;
}
function Zo(t, e) {
  return xe(t, (n) => Ko(n, e));
}
function Rf(t, e) {
  let n = lo(e), r = [].concat(t.eventSources || []), i = [];
  t.initialEvents && r.unshift(t.initialEvents), t.events && r.unshift(t.events);
  for (let s of r) {
    let o = ao(s, e, n);
    o && i.push(o);
  }
  return i;
}
function Ko(t, e) {
  return !e.pluginHooks.eventSourceDefs[t.sourceDefId].ignoreRange;
}
function Tf(t, e) {
  switch (e.type) {
    case "UNSELECT_DATES":
      return null;
    case "SELECT_DATES":
      return e.selection;
    default:
      return t;
  }
}
function kf(t, e) {
  switch (e.type) {
    case "UNSELECT_EVENT":
      return "";
    case "SELECT_EVENT":
      return e.eventInstanceId;
    default:
      return t;
  }
}
function Mf(t, e) {
  let n;
  switch (e.type) {
    case "UNSET_EVENT_DRAG":
      return null;
    case "SET_EVENT_DRAG":
      return n = e.state, {
        affectedEvents: n.affectedEvents,
        mutatedEvents: n.mutatedEvents,
        isEvent: n.isEvent
      };
    default:
      return t;
  }
}
function If(t, e) {
  let n;
  switch (e.type) {
    case "UNSET_EVENT_RESIZE":
      return null;
    case "SET_EVENT_RESIZE":
      return n = e.state, {
        affectedEvents: n.affectedEvents,
        mutatedEvents: n.mutatedEvents,
        isEvent: n.isEvent
      };
    default:
      return t;
  }
}
function Nf(t, e, n, r, i) {
  let s = t.headerToolbar ? Bi(t.headerToolbar, t, e, n, r, i) : null, o = t.footerToolbar ? Bi(t.footerToolbar, t, e, n, r, i) : null;
  return { header: s, footer: o };
}
function Bi(t, e, n, r, i, s) {
  let o = {}, a = [], l = !1;
  for (let d in t) {
    let c = t[d], h = Of(c, e, n, r, i, s);
    o[d] = h.widgets, a.push(...h.viewsWithButtons), l = l || h.hasTitle;
  }
  return { sectionWidgets: o, viewsWithButtons: a, hasTitle: l };
}
function Of(t, e, n, r, i, s) {
  let o = e.direction === "rtl", a = e.customButtons || {}, l = n.buttonText || {}, d = e.buttonText || {}, c = n.buttonHints || {}, h = e.buttonHints || {}, f = t ? t.split(" ") : [], u = [], g = !1;
  return { widgets: f.map((b) => b.split(",").map((y) => {
    if (y === "title")
      return g = !0, { buttonName: y };
    let E, D, C, P, T, I;
    if (E = a[y])
      C = (x) => {
        E.click && E.click.call(x.target, x, x.target);
      }, (P = r.getCustomButtonIconClass(E)) || (P = r.getIconClass(y, o)) || (T = E.text), I = E.hint || E.text;
    else if (D = i[y]) {
      u.push(y), C = () => {
        s.changeView(y);
      }, (T = D.buttonTextOverride) || (P = r.getIconClass(y, o)) || (T = D.buttonTextDefault);
      let x = D.buttonTextOverride || D.buttonTextDefault;
      I = rt(
        D.buttonTitleOverride || D.buttonTitleDefault || e.viewHint,
        [x, y],
        // view-name = buttonName
        x
      );
    } else if (s[y])
      if (C = () => {
        s[y]();
      }, (T = l[y]) || (P = r.getIconClass(y, o)) || (T = d[y]), y === "prevYear" || y === "nextYear") {
        let x = y === "prevYear" ? "prev" : "next";
        I = rt(c[x] || h[x], [
          d.year || "year",
          "year"
        ], d[y]);
      } else
        I = (x) => rt(c[y] || h[y], [
          d[x] || x,
          x
        ], d[y]);
    return { buttonName: y, buttonClick: C, buttonIcon: P, buttonText: T, buttonHint: I };
  })), viewsWithButtons: u, hasTitle: g };
}
class Pf {
  constructor(e, n, r) {
    this.type = e, this.getCurrentData = n, this.dateEnv = r;
  }
  get calendar() {
    return this.getCurrentData().calendarApi;
  }
  get title() {
    return this.getCurrentData().viewTitle;
  }
  get activeStart() {
    return this.dateEnv.toDate(this.getCurrentData().dateProfile.activeRange.start);
  }
  get activeEnd() {
    return this.dateEnv.toDate(this.getCurrentData().dateProfile.activeRange.end);
  }
  get currentStart() {
    return this.dateEnv.toDate(this.getCurrentData().dateProfile.currentRange.start);
  }
  get currentEnd() {
    return this.dateEnv.toDate(this.getCurrentData().dateProfile.currentRange.end);
  }
  getOption(e) {
    return this.getCurrentData().options[e];
  }
}
let $f = {
  ignoreRange: !0,
  parseMeta(t) {
    return Array.isArray(t.events) ? t.events : null;
  },
  fetch(t, e) {
    e({
      rawEvents: t.eventSource.meta
    });
  }
};
const Hf = se({
  name: "array-event-source",
  eventSourceDefs: [$f]
});
let Bf = {
  parseMeta(t) {
    return typeof t.events == "function" ? t.events : null;
  },
  fetch(t, e, n) {
    const { dateEnv: r } = t.context, i = t.eventSource.meta;
    Qd(i.bind(null, yo(t.range, r)), (s) => e({ rawEvents: s }), n);
  }
};
const Lf = se({
  name: "func-event-source",
  eventSourceDefs: [Bf]
}), zf = {
  method: String,
  extraParams: v,
  startParam: String,
  endParam: String,
  timeZoneParam: String
};
let Uf = {
  parseMeta(t) {
    return t.url && (t.format === "json" || !t.format) ? {
      url: t.url,
      format: "json",
      method: (t.method || "GET").toUpperCase(),
      extraParams: t.extraParams,
      startParam: t.startParam,
      endParam: t.endParam,
      timeZoneParam: t.timeZoneParam
    } : null;
  },
  fetch(t, e, n) {
    const { meta: r } = t.eventSource, i = jf(r, t.range, t.context);
    Zd(r.method, r.url, i).then(([s, o]) => {
      e({ rawEvents: s, response: o });
    }, n);
  }
};
const Ff = se({
  name: "json-event-source",
  eventSourceRefiners: zf,
  eventSourceDefs: [Uf]
});
function jf(t, e, n) {
  let { dateEnv: r, options: i } = n, s, o, a, l, d = {};
  return s = t.startParam, s == null && (s = i.startParam), o = t.endParam, o == null && (o = i.endParam), a = t.timeZoneParam, a == null && (a = i.timeZoneParam), typeof t.extraParams == "function" ? l = t.extraParams() : l = t.extraParams || {}, Object.assign(d, l), d[s] = r.formatIso(e.start), d[o] = r.formatIso(e.end), r.timeZone !== "local" && (d[a] = r.timeZone), d;
}
const Wf = {
  daysOfWeek: v,
  startTime: _,
  endTime: _,
  duration: _,
  startRecur: v,
  endRecur: v
};
let Vf = {
  parse(t, e) {
    if (t.daysOfWeek || t.startTime || t.endTime || t.startRecur || t.endRecur) {
      let n = {
        daysOfWeek: t.daysOfWeek || null,
        startTime: t.startTime || null,
        endTime: t.endTime || null,
        startRecur: t.startRecur ? e.createMarker(t.startRecur) : null,
        endRecur: t.endRecur ? e.createMarker(t.endRecur) : null,
        dateEnv: e
      }, r;
      return t.duration && (r = t.duration), !r && t.startTime && t.endTime && (r = ac(t.endTime, t.startTime)), {
        allDayGuess: !t.startTime && !t.endTime,
        duration: r,
        typeData: n
        // doesn't need endTime anymore but oh well
      };
    }
    return null;
  },
  expand(t, e, n) {
    let r = Re(e, { start: t.startRecur, end: t.endRecur });
    return r ? qf(t.daysOfWeek, t.startTime, t.dateEnv, n, r) : [];
  }
};
const Gf = se({
  name: "simple-recurring-event",
  recurringTypes: [Vf],
  eventRefiners: Wf
});
function qf(t, e, n, r, i) {
  let s = t ? Ys(t) : null, o = M(i.start), a = i.end, l = [];
  for (e && (e.milliseconds < 0 ? a = H(a, 1) : e.milliseconds >= 1e3 * 60 * 60 * 24 && (o = H(o, -1))); o < a; ) {
    let d;
    (!s || s[o.getUTCDay()]) && (e ? d = r.add(o, e) : d = o, l.push(r.createMarker(n.toDate(d)))), o = H(o, 1);
  }
  return l;
}
const Yf = se({
  name: "change-handler",
  optionChangeHandlers: {
    events(t, e) {
      Li([t], e);
    },
    eventSources: Li
  }
});
function Li(t, e) {
  let n = hr(e.getCurrentData().eventSources);
  if (n.length === 1 && t.length === 1 && Array.isArray(n[0]._raw) && Array.isArray(t[0])) {
    e.dispatch({
      type: "RESET_RAW_EVENTS",
      sourceId: n[0].sourceId,
      rawEvents: t[0]
    });
    return;
  }
  let r = [];
  for (let i of t) {
    let s = !1;
    for (let o = 0; o < n.length; o += 1)
      if (n[o]._raw === i) {
        n.splice(o, 1), s = !0;
        break;
      }
    s || r.push(i);
  }
  for (let i of n)
    e.dispatch({
      type: "REMOVE_EVENT_SOURCE",
      sourceId: i.sourceId
    });
  for (let i of r)
    e.calendarApi.addEventSource(i);
}
function Qf(t, e) {
  e.emitter.trigger("datesSet", Object.assign(Object.assign({}, yo(t.activeRange, e.dateEnv)), { view: e.viewApi }));
}
function Zf(t, e) {
  let { emitter: n } = e;
  n.hasHandlers("eventsSet") && n.trigger("eventsSet", De(t, e));
}
const Kf = [
  Hf,
  Lf,
  Ff,
  Gf,
  Yf,
  se({
    name: "misc",
    isLoadingFuncs: [
      (t) => qo(t.eventSources)
    ],
    propSetHandlers: {
      dateProfile: Qf,
      eventStore: Zf
    }
  })
];
class Xf {
  constructor(e, n) {
    this.runTaskOption = e, this.drainedOption = n, this.queue = [], this.delayedRunner = new ir(this.drain.bind(this));
  }
  request(e, n) {
    this.queue.push(e), this.delayedRunner.request(n);
  }
  pause(e) {
    this.delayedRunner.pause(e);
  }
  resume(e, n) {
    this.delayedRunner.resume(e, n);
  }
  drain() {
    let { queue: e } = this;
    for (; e.length; ) {
      let n = [], r;
      for (; r = e.shift(); )
        this.runTask(r), n.push(r);
      this.drained(n);
    }
  }
  runTask(e) {
    this.runTaskOption && this.runTaskOption(e);
  }
  drained(e) {
    this.drainedOption && this.drainedOption(e);
  }
}
function Jf(t, e, n) {
  let r;
  return /^(year|month)$/.test(t.currentRangeUnit) ? r = t.currentRange : r = t.activeRange, n.formatRange(r.start, r.end, O(e.titleFormat || eh(t)), {
    isEndExclusive: t.isRangeAllDay,
    defaultSeparator: e.titleRangeSeparator
  });
}
function eh(t) {
  let { currentRangeUnit: e } = t;
  if (e === "year")
    return { year: "numeric" };
  if (e === "month")
    return { year: "numeric", month: "long" };
  let n = $t(t.currentRange.start, t.currentRange.end);
  return n !== null && n > 1 ? { year: "numeric", month: "short", day: "numeric" } : { year: "numeric", month: "long", day: "numeric" };
}
class zi {
  constructor() {
    this.resetListeners = /* @__PURE__ */ new Set();
  }
  handleInput(e, n) {
    const r = this.dateEnv;
    if (e !== r && (typeof n == "function" ? this.nowFn = n : r || (this.nowAnchorDate = e.toDate(n ? e.createMarker(n) : e.createNowMarker()), this.nowAnchorQueried = Date.now()), this.dateEnv = e, r))
      for (const i of this.resetListeners.values())
        i();
  }
  getDateMarker() {
    return this.nowAnchorDate ? this.dateEnv.timestampToMarker(this.nowAnchorDate.valueOf() + (Date.now() - this.nowAnchorQueried)) : this.dateEnv.createMarker(this.nowFn());
  }
  addResetListener(e) {
    this.resetListeners.add(e);
  }
  removeResetListener(e) {
    this.resetListeners.delete(e);
  }
}
class th {
  constructor(e) {
    this.computeCurrentViewData = A(this._computeCurrentViewData), this.organizeRawLocales = A(nf), this.buildLocale = A(Vo), this.buildPluginHooks = af(), this.buildDateEnv = A(nh), this.buildTheme = A(rh), this.parseToolbars = A(Nf), this.buildViewSpecs = A(hf), this.buildDateProfileGenerator = xt(ih), this.buildViewApi = A(sh), this.buildViewUiProps = xt(lh), this.buildEventUiBySource = A(oh, q), this.buildEventUiBases = A(ah), this.parseContextBusinessHours = xt(ch), this.buildTitle = A(Jf), this.nowManager = new zi(), this.emitter = new an(), this.actionRunner = new Xf(this._handleAction.bind(this), this.updateData.bind(this)), this.currentCalendarOptionsInput = {}, this.currentCalendarOptionsRefined = {}, this.currentViewOptionsInput = {}, this.currentViewOptionsRefined = {}, this.currentCalendarOptionsRefiners = {}, this.optionsForRefining = [], this.optionsForHandling = [], this.getCurrentData = () => this.data, this.dispatch = (f) => {
      this.actionRunner.request(f);
    }, this.props = e, this.actionRunner.pause(), this.nowManager = new zi();
    let n = {}, r = this.computeOptionsData(e.optionOverrides, n, e.calendarApi), i = r.calendarOptions.initialView || r.pluginHooks.initialView, s = this.computeCurrentViewData(i, r, e.optionOverrides, n);
    e.calendarApi.currentDataManager = this, this.emitter.setThisContext(e.calendarApi), this.emitter.setOptions(s.options);
    let o = {
      nowManager: this.nowManager,
      dateEnv: r.dateEnv,
      options: r.calendarOptions,
      pluginHooks: r.pluginHooks,
      calendarApi: e.calendarApi,
      dispatch: this.dispatch,
      emitter: this.emitter,
      getCurrentData: this.getCurrentData
    }, a = bf(r.calendarOptions, r.dateEnv, this.nowManager), l = s.dateProfileGenerator.build(a);
    ne(l.activeRange, a) || (a = l.currentRange.start);
    for (let f of r.pluginHooks.contextInit)
      f(o);
    let d = wf(r.calendarOptions, l, o), c = {
      dynamicOptionOverrides: n,
      currentViewType: i,
      currentDate: a,
      dateProfile: l,
      businessHours: this.parseContextBusinessHours(o),
      eventSources: d,
      eventUiBases: {},
      eventStore: j(),
      renderableEventStore: j(),
      dateSelection: null,
      eventSelection: "",
      eventDrag: null,
      eventResize: null,
      selectionConfig: this.buildViewUiProps(o).selectionConfig
    }, h = Object.assign(Object.assign({}, o), c);
    for (let f of r.pluginHooks.reducers)
      Object.assign(c, f(null, null, h));
    _n(c, o) && this.emitter.trigger("loading", !0), this.state = c, this.updateData(), this.actionRunner.resume();
  }
  resetOptions(e, n) {
    let { props: r } = this;
    n === void 0 ? r.optionOverrides = e : (r.optionOverrides = Object.assign(Object.assign({}, r.optionOverrides || {}), e), this.optionsForRefining.push(...n)), (n === void 0 || n.length) && this.actionRunner.request({
      type: "NOTHING"
    });
  }
  _handleAction(e) {
    let { props: n, state: r, emitter: i } = this, s = yf(r.dynamicOptionOverrides, e), o = this.computeOptionsData(n.optionOverrides, s, n.calendarApi), a = mf(r.currentViewType, e), l = this.computeCurrentViewData(a, o, n.optionOverrides, s);
    n.calendarApi.currentDataManager = this, i.setThisContext(n.calendarApi), i.setOptions(l.options);
    let d = {
      nowManager: this.nowManager,
      dateEnv: o.dateEnv,
      options: o.calendarOptions,
      pluginHooks: o.pluginHooks,
      calendarApi: n.calendarApi,
      dispatch: this.dispatch,
      emitter: i,
      getCurrentData: this.getCurrentData
    }, { currentDate: c, dateProfile: h } = r;
    this.data && this.data.dateProfileGenerator !== l.dateProfileGenerator && (h = l.dateProfileGenerator.build(c)), c = vf(c, e), h = Ef(h, e, c, l.dateProfileGenerator), (e.type === "PREV" || // TODO: move this logic into DateProfileGenerator
    e.type === "NEXT" || // "
    !ne(h.currentRange, c)) && (c = h.currentRange.start);
    let f = Sf(r.eventSources, e, h, d), u = Sd(r.eventStore, e, f, h, d), m = qo(f) && !l.options.progressiveEventRendering && r.renderableEventStore || u, { eventUiSingleBase: b, selectionConfig: y } = this.buildViewUiProps(d), E = this.buildEventUiBySource(f), D = this.buildEventUiBases(m.defs, b, E), C = {
      dynamicOptionOverrides: s,
      currentViewType: a,
      currentDate: c,
      dateProfile: h,
      eventSources: f,
      eventStore: u,
      renderableEventStore: m,
      selectionConfig: y,
      eventUiBases: D,
      businessHours: this.parseContextBusinessHours(d),
      dateSelection: Tf(r.dateSelection, e),
      eventSelection: kf(r.eventSelection, e),
      eventDrag: Mf(r.eventDrag, e),
      eventResize: If(r.eventResize, e)
    }, P = Object.assign(Object.assign({}, d), C);
    for (let x of o.pluginHooks.reducers)
      Object.assign(C, x(r, e, P));
    let T = _n(r, d), I = _n(C, d);
    !T && I ? i.trigger("loading", !0) : T && !I && i.trigger("loading", !1), this.state = C, n.onAction && n.onAction(e);
  }
  updateData() {
    let { props: e, state: n } = this, r = this.data, i = this.computeOptionsData(e.optionOverrides, n.dynamicOptionOverrides, e.calendarApi), s = this.computeCurrentViewData(n.currentViewType, i, e.optionOverrides, n.dynamicOptionOverrides), o = this.data = Object.assign(Object.assign(Object.assign({ nowManager: this.nowManager, viewTitle: this.buildTitle(n.dateProfile, s.options, i.dateEnv), calendarApi: e.calendarApi, dispatch: this.dispatch, emitter: this.emitter, getCurrentData: this.getCurrentData }, i), s), n), a = i.pluginHooks.optionChangeHandlers, l = r && r.calendarOptions, d = i.calendarOptions;
    if (l && l !== d) {
      l.timeZone !== d.timeZone && (n.eventSources = o.eventSources = Af(o.eventSources, n.dateProfile, o), n.eventStore = o.eventStore = Ti(o.eventStore, r.dateEnv, o.dateEnv), n.renderableEventStore = o.renderableEventStore = Ti(o.renderableEventStore, r.dateEnv, o.dateEnv));
      for (let c in a)
        (this.optionsForHandling.indexOf(c) !== -1 || l[c] !== d[c]) && a[c](d[c], o);
    }
    this.optionsForHandling = [], e.onData && e.onData(o);
  }
  computeOptionsData(e, n, r) {
    if (!this.optionsForRefining.length && e === this.stableOptionOverrides && n === this.stableDynamicOptionOverrides)
      return this.stableCalendarOptionsData;
    let { refinedOptions: i, pluginHooks: s, localeDefaults: o, availableLocaleData: a, extra: l } = this.processRawCalendarOptions(e, n);
    Ui(l);
    let d = this.buildDateEnv(i.timeZone, i.locale, i.weekNumberCalculation, i.firstDay, i.weekText, s, a, i.defaultRangeSeparator), c = this.buildViewSpecs(s.views, this.stableOptionOverrides, this.stableDynamicOptionOverrides, o), h = this.buildTheme(i, s), f = this.parseToolbars(i, this.stableOptionOverrides, h, c, r);
    return this.stableCalendarOptionsData = {
      calendarOptions: i,
      pluginHooks: s,
      dateEnv: d,
      viewSpecs: c,
      theme: h,
      toolbarConfig: f,
      localeDefaults: o,
      availableRawLocales: a.map
    };
  }
  // always called from behind a memoizer
  processRawCalendarOptions(e, n) {
    let { locales: r, locale: i } = vn([
      it,
      e,
      n
    ]), s = this.organizeRawLocales(r), o = s.map, a = this.buildLocale(i || s.defaultCode, o).options, l = this.buildPluginHooks(e.plugins || [], Kf), d = this.currentCalendarOptionsRefiners = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Ai), Di), Ci), l.listenerRefiners), l.optionRefiners), c = {}, h = vn([
      it,
      a,
      e,
      n
    ]), f = {}, u = this.currentCalendarOptionsInput, g = this.currentCalendarOptionsRefined, m = !1;
    for (let b in h)
      this.optionsForRefining.indexOf(b) === -1 && (h[b] === u[b] || Ee[b] && b in u && Ee[b](u[b], h[b])) ? f[b] = g[b] : d[b] ? (f[b] = d[b](h[b]), m = !0) : c[b] = u[b];
    return m && (this.currentCalendarOptionsInput = h, this.currentCalendarOptionsRefined = f, this.stableOptionOverrides = e, this.stableDynamicOptionOverrides = n), this.optionsForHandling.push(...this.optionsForRefining), this.optionsForRefining = [], {
      rawOptions: this.currentCalendarOptionsInput,
      refinedOptions: this.currentCalendarOptionsRefined,
      pluginHooks: l,
      availableLocaleData: s,
      localeDefaults: a,
      extra: c
    };
  }
  _computeCurrentViewData(e, n, r, i) {
    let s = n.viewSpecs[e];
    if (!s)
      throw new Error(`viewType "${e}" is not available. Please make sure you've loaded all neccessary plugins`);
    let { refinedOptions: o, extra: a } = this.processRawViewOptions(s, n.pluginHooks, n.localeDefaults, r, i);
    Ui(a), this.nowManager.handleInput(n.dateEnv, o.now);
    let l = this.buildDateProfileGenerator({
      dateProfileGeneratorClass: s.optionDefaults.dateProfileGeneratorClass,
      nowManager: this.nowManager,
      duration: s.duration,
      durationUnit: s.durationUnit,
      usesMinMaxTime: s.optionDefaults.usesMinMaxTime,
      dateEnv: n.dateEnv,
      calendarApi: this.props.calendarApi,
      slotMinTime: o.slotMinTime,
      slotMaxTime: o.slotMaxTime,
      showNonCurrentDates: o.showNonCurrentDates,
      dayCount: o.dayCount,
      dateAlignment: o.dateAlignment,
      dateIncrement: o.dateIncrement,
      hiddenDays: o.hiddenDays,
      weekends: o.weekends,
      validRangeInput: o.validRange,
      visibleRangeInput: o.visibleRange,
      fixedWeekCount: o.fixedWeekCount
    }), d = this.buildViewApi(e, this.getCurrentData, n.dateEnv);
    return { viewSpec: s, options: o, dateProfileGenerator: l, viewApi: d };
  }
  processRawViewOptions(e, n, r, i, s) {
    let o = vn([
      it,
      e.optionDefaults,
      r,
      i,
      e.optionOverrides,
      s
    ]), a = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Ai), Di), Ci), zc), n.listenerRefiners), n.optionRefiners), l = {}, d = this.currentViewOptionsInput, c = this.currentViewOptionsRefined, h = !1, f = {};
    for (let u in o)
      o[u] === d[u] || Ee[u] && Ee[u](o[u], d[u]) ? l[u] = c[u] : (o[u] === this.currentCalendarOptionsInput[u] || Ee[u] && Ee[u](o[u], this.currentCalendarOptionsInput[u]) ? u in this.currentCalendarOptionsRefined && (l[u] = this.currentCalendarOptionsRefined[u]) : a[u] ? l[u] = a[u](o[u]) : f[u] = o[u], h = !0);
    return h && (this.currentViewOptionsInput = o, this.currentViewOptionsRefined = l), {
      rawOptions: this.currentViewOptionsInput,
      refinedOptions: this.currentViewOptionsRefined,
      extra: f
    };
  }
}
function nh(t, e, n, r, i, s, o, a) {
  let l = Vo(e || o.defaultCode, o.map);
  return new Kc({
    calendarSystem: "gregory",
    timeZone: t,
    namedTimeZoneImpl: s.namedTimeZonedImpl,
    locale: l,
    weekNumberCalculation: n,
    firstDay: r,
    weekText: i,
    cmdFormatter: s.cmdFormatter,
    defaultSeparator: a
  });
}
function rh(t, e) {
  let n = e.themeClasses[t.themeSystem] || me;
  return new n(t);
}
function ih(t) {
  let e = t.dateProfileGeneratorClass || no;
  return new e(t);
}
function sh(t, e, n) {
  return new Pf(t, e, n);
}
function oh(t) {
  return re(t, (e) => e.ui);
}
function ah(t, e, n) {
  let r = { "": e };
  for (let i in t) {
    let s = t[i];
    s.sourceId && n[s.sourceId] && (r[i] = n[s.sourceId]);
  }
  return r;
}
function lh(t) {
  let { options: e } = t;
  return {
    eventUiSingleBase: jt({
      display: e.eventDisplay,
      editable: e.editable,
      startEditable: e.eventStartEditable,
      durationEditable: e.eventDurationEditable,
      constraint: e.eventConstraint,
      overlap: typeof e.eventOverlap == "boolean" ? e.eventOverlap : void 0,
      allow: e.eventAllow,
      backgroundColor: e.eventBackgroundColor,
      borderColor: e.eventBorderColor,
      textColor: e.eventTextColor,
      color: e.eventColor
      // classNames: options.eventClassNames // render hook will handle this
    }, t),
    selectionConfig: jt({
      constraint: e.selectConstraint,
      overlap: typeof e.selectOverlap == "boolean" ? e.selectOverlap : void 0,
      allow: e.selectAllow
    }, t)
  };
}
function _n(t, e) {
  for (let n of e.pluginHooks.isLoadingFuncs)
    if (n(t))
      return !0;
  return !1;
}
function ch(t) {
  return Md(t.options.businessHours, t);
}
function Ui(t, e) {
  for (let n in t)
    console.warn(`Unknown option '${n}'`);
}
class dh extends R {
  render() {
    let e = this.props.widgetGroups.map((n) => this.renderWidgetGroup(n));
    return p("div", { className: "fc-toolbar-chunk" }, ...e);
  }
  renderWidgetGroup(e) {
    let { props: n } = this, { theme: r } = this.context, i = [], s = !0;
    for (let o of e) {
      let { buttonName: a, buttonClick: l, buttonText: d, buttonIcon: c, buttonHint: h } = o;
      if (a === "title")
        s = !1, i.push(p("h2", { className: "fc-toolbar-title", id: n.titleId }, n.title));
      else {
        let f = a === n.activeButton, u = !n.isTodayEnabled && a === "today" || !n.isPrevEnabled && a === "prev" || !n.isNextEnabled && a === "next", g = [`fc-${a}-button`, r.getClass("button")];
        f && g.push(r.getClass("buttonActive")), i.push(p("button", { type: "button", title: typeof h == "function" ? h(n.navUnit) : h, disabled: u, "aria-pressed": f, className: g.join(" "), onClick: l }, d || (c ? p("span", { className: c, role: "img" }) : "")));
      }
    }
    if (i.length > 1) {
      let o = s && r.getClass("buttonGroup") || "";
      return p("div", { className: o }, ...i);
    }
    return i[0];
  }
}
class Fi extends R {
  render() {
    let { model: e, extraClassName: n } = this.props, r = !1, i, s, o = e.sectionWidgets, a = o.center;
    return o.left ? (r = !0, i = o.left) : i = o.start, o.right ? (r = !0, s = o.right) : s = o.end, p(
      "div",
      { className: [
        n || "",
        "fc-toolbar",
        r ? "fc-toolbar-ltr" : ""
      ].join(" ") },
      this.renderSection("start", i || []),
      this.renderSection("center", a || []),
      this.renderSection("end", s || [])
    );
  }
  renderSection(e, n) {
    let { props: r } = this;
    return p(dh, { key: e, widgetGroups: n, title: r.title, navUnit: r.navUnit, activeButton: r.activeButton, isTodayEnabled: r.isTodayEnabled, isPrevEnabled: r.isPrevEnabled, isNextEnabled: r.isNextEnabled, titleId: r.titleId });
  }
}
class uh extends R {
  constructor() {
    super(...arguments), this.state = {
      availableWidth: null
    }, this.handleEl = (e) => {
      this.el = e, Z(this.props.elRef, e), this.updateAvailableWidth();
    }, this.handleResize = () => {
      this.updateAvailableWidth();
    };
  }
  render() {
    let { props: e, state: n } = this, { aspectRatio: r } = e, i = [
      "fc-view-harness",
      r || e.liquid || e.height ? "fc-view-harness-active" : "fc-view-harness-passive"
      // let the view do the height
    ], s = "", o = "";
    return r ? n.availableWidth !== null ? s = n.availableWidth / r : o = `${1 / r * 100}%` : s = e.height || "", p("div", { "aria-labelledby": e.labeledById, ref: this.handleEl, className: i.join(" "), style: { height: s, paddingBottom: o } }, e.children);
  }
  componentDidMount() {
    this.context.addResizeHandler(this.handleResize);
  }
  componentWillUnmount() {
    this.context.removeResizeHandler(this.handleResize);
  }
  updateAvailableWidth() {
    this.el && // needed. but why?
    this.props.aspectRatio && this.setState({ availableWidth: this.el.offsetWidth });
  }
}
class fh extends Ye {
  constructor(e) {
    super(e), this.handleSegClick = (n, r) => {
      let { component: i } = this, { context: s } = i, o = Ge(r);
      if (o && // might be the <div> surrounding the more link
      i.isValidSegDownEl(n.target)) {
        let a = B(n.target, ".fc-event-forced-url"), l = a ? a.querySelector("a[href]").href : "";
        s.emitter.trigger("eventClick", {
          el: r,
          event: new N(i.context, o.eventRange.def, o.eventRange.instance),
          jsEvent: n,
          view: s.viewApi
        }), l && !n.defaultPrevented && (window.location.href = l);
      }
    }, this.destroy = js(
      e.el,
      "click",
      ".fc-event",
      // on both fg and bg events
      this.handleSegClick
    );
  }
}
class hh extends Ye {
  constructor(e) {
    super(e), this.handleEventElRemove = (n) => {
      n === this.currentSegEl && this.handleSegLeave(null, this.currentSegEl);
    }, this.handleSegEnter = (n, r) => {
      Ge(r) && (this.currentSegEl = r, this.triggerEvent("eventMouseEnter", n, r));
    }, this.handleSegLeave = (n, r) => {
      this.currentSegEl && (this.currentSegEl = null, this.triggerEvent("eventMouseLeave", n, r));
    }, this.removeHoverListeners = Gl(
      e.el,
      ".fc-event",
      // on both fg and bg events
      this.handleSegEnter,
      this.handleSegLeave
    );
  }
  destroy() {
    this.removeHoverListeners();
  }
  triggerEvent(e, n, r) {
    let { component: i } = this, { context: s } = i, o = Ge(r);
    (!n || i.isValidSegDownEl(n.target)) && s.emitter.trigger(e, {
      el: r,
      event: new N(s, o.eventRange.def, o.eventRange.instance),
      jsEvent: n,
      view: s.viewApi
    });
  }
}
class ph extends Ie {
  constructor() {
    super(...arguments), this.buildViewContext = A(ed), this.buildViewPropTransformers = A(mh), this.buildToolbarProps = A(gh), this.headerRef = L(), this.footerRef = L(), this.interactionsStore = {}, this.state = {
      viewLabelId: nn()
    }, this.registerInteractiveComponent = (e, n) => {
      let r = Jd(e, n), o = [
        fh,
        hh
      ].concat(this.props.pluginHooks.componentInteractions).map((a) => new a(r));
      this.interactionsStore[e.uid] = o, zn[e.uid] = r;
    }, this.unregisterInteractiveComponent = (e) => {
      let n = this.interactionsStore[e.uid];
      if (n) {
        for (let r of n)
          r.destroy();
        delete this.interactionsStore[e.uid];
      }
      delete zn[e.uid];
    }, this.resizeRunner = new ir(() => {
      this.props.emitter.trigger("_resize", !0), this.props.emitter.trigger("windowResize", { view: this.props.viewApi });
    }), this.handleWindowResize = (e) => {
      let { options: n } = this.props;
      n.handleWindowResize && e.target === window && this.resizeRunner.request(n.windowResizeDelay);
    };
  }
  /*
  renders INSIDE of an outer div
  */
  render() {
    let { props: e } = this, { toolbarConfig: n, options: r } = e, i = !1, s = "", o;
    e.isHeightAuto || e.forPrint ? s = "" : r.height != null ? i = !0 : r.contentHeight != null ? s = r.contentHeight : o = Math.max(r.aspectRatio, 0.5);
    let a = this.buildViewContext(e.viewSpec, e.viewApi, e.options, e.dateProfileGenerator, e.dateEnv, e.nowManager, e.theme, e.pluginHooks, e.dispatch, e.getCurrentData, e.emitter, e.calendarApi, this.registerInteractiveComponent, this.unregisterInteractiveComponent), l = n.header && n.header.hasTitle ? this.state.viewLabelId : void 0;
    return p(
      ie.Provider,
      { value: a },
      p(Qe, { unit: "day" }, (d) => {
        let c = this.buildToolbarProps(e.viewSpec, e.dateProfile, e.dateProfileGenerator, e.currentDate, d, e.viewTitle);
        return p(
          k,
          null,
          n.header && p(Fi, Object.assign({ ref: this.headerRef, extraClassName: "fc-header-toolbar", model: n.header, titleId: l }, c)),
          p(
            uh,
            { liquid: i, height: s, aspectRatio: o, labeledById: l },
            this.renderView(e),
            this.buildAppendContent()
          ),
          n.footer && p(Fi, Object.assign({ ref: this.footerRef, extraClassName: "fc-footer-toolbar", model: n.footer, titleId: "" }, c))
        );
      })
    );
  }
  componentDidMount() {
    let { props: e } = this;
    this.calendarInteractions = e.pluginHooks.calendarInteractions.map((r) => new r(e)), window.addEventListener("resize", this.handleWindowResize);
    let { propSetHandlers: n } = e.pluginHooks;
    for (let r in n)
      n[r](e[r], e);
  }
  componentDidUpdate(e) {
    let { props: n } = this, { propSetHandlers: r } = n.pluginHooks;
    for (let i in r)
      n[i] !== e[i] && r[i](n[i], n);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize), this.resizeRunner.clear();
    for (let e of this.calendarInteractions)
      e.destroy();
    this.props.emitter.trigger("_unmount");
  }
  buildAppendContent() {
    let { props: e } = this, n = e.pluginHooks.viewContainerAppends.map((r) => r(e));
    return p(k, {}, ...n);
  }
  renderView(e) {
    let { pluginHooks: n } = e, { viewSpec: r } = e, i = {
      dateProfile: e.dateProfile,
      businessHours: e.businessHours,
      eventStore: e.renderableEventStore,
      eventUiBases: e.eventUiBases,
      dateSelection: e.dateSelection,
      eventSelection: e.eventSelection,
      eventDrag: e.eventDrag,
      eventResize: e.eventResize,
      isHeightAuto: e.isHeightAuto,
      forPrint: e.forPrint
    }, s = this.buildViewPropTransformers(n.viewPropsTransformers);
    for (let a of s)
      Object.assign(i, a.transform(i, e));
    let o = r.component;
    return p(o, Object.assign({}, i));
  }
}
function gh(t, e, n, r, i, s) {
  let o = n.build(i, void 0, !1), a = n.buildPrev(e, r, !1), l = n.buildNext(e, r, !1);
  return {
    title: s,
    activeButton: t.type,
    navUnit: t.singleUnit,
    isTodayEnabled: o.isValid && !ne(e.currentRange, i),
    isPrevEnabled: a.isValid,
    isNextEnabled: l.isValid
  };
}
function mh(t) {
  return t.map((e) => new e());
}
class vh extends tu {
  constructor(e, n = {}) {
    super(), this.isRendering = !1, this.isRendered = !1, this.currentClassNames = [], this.customContentRenderId = 0, this.handleAction = (r) => {
      switch (r.type) {
        case "SET_EVENT_DRAG":
        case "SET_EVENT_RESIZE":
          this.renderRunner.tryDrain();
      }
    }, this.handleData = (r) => {
      this.currentData = r, this.renderRunner.request(r.calendarOptions.rerenderDelay);
    }, this.handleRenderRequest = () => {
      if (this.isRendering) {
        this.isRendered = !0;
        let { currentData: r } = this;
        zt(() => {
          lt(p(Xd, { options: r.calendarOptions, theme: r.theme, emitter: r.emitter }, (i, s, o, a) => (this.setClassNames(i), this.setHeight(s), p(
            Xs.Provider,
            { value: this.customContentRenderId },
            p(ph, Object.assign({ isHeightAuto: o, forPrint: a }, r))
          ))), this.el);
        });
      } else this.isRendered && (this.isRendered = !1, lt(null, this.el), this.setClassNames([]), this.setHeight(""));
    }, Hl(e), this.el = e, this.renderRunner = new ir(this.handleRenderRequest), new th({
      optionOverrides: n,
      calendarApi: this,
      onAction: this.handleAction,
      onData: this.handleData
    });
  }
  render() {
    let e = this.isRendering;
    e ? this.customContentRenderId += 1 : this.isRendering = !0, this.renderRunner.request(), e && this.updateSize();
  }
  destroy() {
    this.isRendering && (this.isRendering = !1, this.renderRunner.request());
  }
  updateSize() {
    zt(() => {
      super.updateSize();
    });
  }
  batchRendering(e) {
    this.renderRunner.pause("batchRendering"), e(), this.renderRunner.resume("batchRendering");
  }
  pauseRendering() {
    this.renderRunner.pause("pauseRendering");
  }
  resumeRendering() {
    this.renderRunner.resume("pauseRendering", !0);
  }
  resetOptions(e, n) {
    this.currentDataManager.resetOptions(e, n);
  }
  setClassNames(e) {
    if (!fe(e, this.currentClassNames)) {
      let { classList: n } = this.el;
      for (let r of this.currentClassNames)
        n.remove(r);
      for (let r of e)
        n.add(r);
      this.currentClassNames = e;
    }
  }
  setHeight(e) {
    Us(this.el, "height", e);
  }
}
function xn(t) {
  return t === "Tag" || t === "Monat" ? "r" : t === "Jahr" ? "s" : "";
}
var bh = {
  code: "de",
  week: {
    dow: 1,
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  },
  buttonText: {
    prev: "Zurück",
    next: "Vor",
    today: "Heute",
    year: "Jahr",
    month: "Monat",
    week: "Woche",
    day: "Tag",
    list: "Terminübersicht"
  },
  weekText: "KW",
  weekTextLong: "Woche",
  allDayText: "Ganztägig",
  moreLinkText(t) {
    return "+ weitere " + t;
  },
  noEventsText: "Keine Ereignisse anzuzeigen",
  buttonHints: {
    prev(t) {
      return `Vorherige${xn(t)} ${t}`;
    },
    next(t) {
      return `Nächste${xn(t)} ${t}`;
    },
    today(t) {
      return t === "Tag" ? "Heute" : `Diese${xn(t)} ${t}`;
    }
  },
  viewHint(t) {
    return t + (t === "Woche" ? "n" : t === "Monat" ? "s" : "es") + "ansicht";
  },
  navLinkHint: "Gehe zu $0",
  moreLinkHint(t) {
    return "Zeige " + (t === 1 ? "ein weiteres Ereignis" : t + " weitere Ereignisse");
  },
  closeHint: "Schließen",
  timeHint: "Uhrzeit",
  eventHint: "Ereignis"
};
class yh extends J {
  constructor() {
    super(...arguments), this.headerElRef = L();
  }
  renderSimpleLayout(e, n) {
    let { props: r, context: i } = this, s = [], o = Gt(i.options);
    return e && s.push({
      type: "header",
      key: "header",
      isSticky: o,
      chunk: {
        elRef: this.headerElRef,
        tableClassName: "fc-col-header",
        rowContent: e
      }
    }), s.push({
      type: "body",
      key: "body",
      liquid: !0,
      chunk: { content: n }
    }), p(
      Ut,
      { elClasses: ["fc-daygrid"], viewSpec: i.viewSpec },
      p(Rr, { liquid: !r.isHeightAuto && !r.forPrint, collapsibleWidth: r.forPrint, cols: [], sections: s })
    );
  }
  renderHScrollLayout(e, n, r, i) {
    let s = this.context.pluginHooks.scrollGridImpl;
    if (!s)
      throw new Error("No ScrollGrid implementation");
    let { props: o, context: a } = this, l = !o.forPrint && Gt(a.options), d = !o.forPrint && Ho(a.options), c = [];
    return e && c.push({
      type: "header",
      key: "header",
      isSticky: l,
      chunks: [{
        key: "main",
        elRef: this.headerElRef,
        tableClassName: "fc-col-header",
        rowContent: e
      }]
    }), c.push({
      type: "body",
      key: "body",
      liquid: !0,
      chunks: [{
        key: "main",
        content: n
      }]
    }), d && c.push({
      type: "footer",
      key: "footer",
      isSticky: !0,
      chunks: [{
        key: "main",
        content: jn
      }]
    }), p(
      Ut,
      { elClasses: ["fc-daygrid"], viewSpec: a.viewSpec },
      p(s, { liquid: !o.isHeightAuto && !o.forPrint, forPrint: o.forPrint, collapsibleWidth: o.forPrint, colGroups: [{ cols: [{ span: r, minWidth: i }] }], sections: c })
    );
  }
}
function Tt(t, e) {
  let n = [];
  for (let r = 0; r < e; r += 1)
    n[r] = [];
  for (let r of t)
    n[r.row].push(r);
  return n;
}
function Et(t, e) {
  let n = [];
  for (let r = 0; r < e; r += 1)
    n[r] = [];
  for (let r of t)
    n[r.firstCol].push(r);
  return n;
}
function ji(t, e) {
  let n = [];
  if (t) {
    for (let r = 0; r < e; r += 1)
      n[r] = {
        affectedInstances: t.affectedInstances,
        isEvent: t.isEvent,
        segs: []
      };
    for (let r of t.segs)
      n[r.row].segs.push(r);
  } else
    for (let r = 0; r < e; r += 1)
      n[r] = null;
  return n;
}
const Xo = O({
  hour: "numeric",
  minute: "2-digit",
  omitZeroMinute: !0,
  meridiem: "narrow"
});
function Jo(t) {
  let { display: e } = t.eventRange.ui;
  return e === "list-item" || e === "auto" && !t.eventRange.def.allDay && t.firstCol === t.lastCol && // can't be multi-day
  t.isStart && // "
  t.isEnd;
}
class ea extends R {
  render() {
    let { props: e } = this;
    return p(kr, Object.assign({}, e, { elClasses: ["fc-daygrid-event", "fc-daygrid-block-event", "fc-h-event"], defaultTimeFormat: Xo, defaultDisplayEventEnd: e.defaultDisplayEventEnd, disableResizing: !e.seg.eventRange.def.allDay }));
  }
}
class ta extends R {
  render() {
    let { props: e, context: n } = this, { options: r } = n, { seg: i } = e, s = r.eventTimeFormat || Xo, o = mo(i, s, n, !0, e.defaultDisplayEventEnd);
    return p(Tr, Object.assign({}, e, { elTag: "a", elClasses: ["fc-daygrid-event", "fc-daygrid-dot-event"], elAttrs: bo(e.seg, n), defaultGenerator: Eh, timeText: o, isResizing: !1, isDateSelecting: !1 }));
  }
}
function Eh(t) {
  return p(
    k,
    null,
    p("div", { className: "fc-daygrid-event-dot", style: { borderColor: t.borderColor || t.backgroundColor } }),
    t.timeText && p("div", { className: "fc-event-time" }, t.timeText),
    p("div", { className: "fc-event-title" }, t.event.title || p(k, null, " "))
  );
}
class wh extends R {
  constructor() {
    super(...arguments), this.compileSegs = A(Sh);
  }
  render() {
    let { props: e } = this, { allSegs: n, invisibleSegs: r } = this.compileSegs(e.singlePlacements);
    return p(Uo, { elClasses: ["fc-daygrid-more-link"], dateProfile: e.dateProfile, todayRange: e.todayRange, allDayDate: e.allDayDate, moreCnt: e.moreCnt, allSegs: n, hiddenSegs: r, alignmentElRef: e.alignmentElRef, alignGridTop: e.alignGridTop, extraDateSpan: e.extraDateSpan, popoverContent: () => {
      let i = (e.eventDrag ? e.eventDrag.affectedInstances : null) || (e.eventResize ? e.eventResize.affectedInstances : null) || {};
      return p(k, null, n.map((s) => {
        let o = s.eventRange.instance.instanceId;
        return p("div", { className: "fc-daygrid-event-harness", key: o, style: {
          visibility: i[o] ? "hidden" : ""
        } }, Jo(s) ? p(ta, Object.assign({ seg: s, isDragging: !1, isSelected: o === e.eventSelection, defaultDisplayEventEnd: !1 }, ue(s, e.todayRange))) : p(ea, Object.assign({ seg: s, isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: o === e.eventSelection, defaultDisplayEventEnd: !1 }, ue(s, e.todayRange))));
      }));
    } });
  }
}
function Sh(t) {
  let e = [], n = [];
  for (let r of t)
    e.push(r.seg), r.isVisible || n.push(r.seg);
  return { allSegs: e, invisibleSegs: n };
}
const Ah = O({ week: "narrow" });
class Dh extends J {
  constructor() {
    super(...arguments), this.rootElRef = L(), this.state = {
      dayNumberId: nn()
    }, this.handleRootEl = (e) => {
      Z(this.rootElRef, e), Z(this.props.elRef, e);
    };
  }
  render() {
    let { context: e, props: n, state: r, rootElRef: i } = this, { options: s, dateEnv: o } = e, { date: a, dateProfile: l } = n;
    const d = n.showDayNumber && _h(a, l.currentRange, o);
    return p(Ir, { elTag: "td", elRef: this.handleRootEl, elClasses: [
      "fc-daygrid-day",
      ...n.extraClassNames || []
    ], elAttrs: Object.assign(Object.assign(Object.assign({}, n.extraDataAttrs), n.showDayNumber ? { "aria-labelledby": r.dayNumberId } : {}), { role: "gridcell" }), defaultGenerator: Ch, date: a, dateProfile: l, todayRange: n.todayRange, showDayNumber: n.showDayNumber, isMonthStart: d, extraRenderProps: n.extraRenderProps }, (c, h) => p(
      "div",
      { ref: n.innerElRef, className: "fc-daygrid-day-frame fc-scrollgrid-sync-inner", style: { minHeight: n.minHeight } },
      n.showWeekNumber && p(zo, { elTag: "a", elClasses: ["fc-daygrid-week-number"], elAttrs: Vt(e, a, "week"), date: a, defaultFormat: Ah }),
      !h.isDisabled && (n.showDayNumber || Nr(s) || n.forceDayTop) ? p(
        "div",
        { className: "fc-daygrid-day-top" },
        p(c, { elTag: "a", elClasses: [
          "fc-daygrid-day-number",
          d && "fc-daygrid-month-start"
        ], elAttrs: Object.assign(Object.assign({}, Vt(e, a)), { id: r.dayNumberId }) })
      ) : n.showDayNumber ? (
        // for creating correct amount of space (see issue #7162)
        p(
          "div",
          { className: "fc-daygrid-day-top", style: { visibility: "hidden" } },
          p("a", { className: "fc-daygrid-day-number" }, " ")
        )
      ) : void 0,
      p(
        "div",
        { className: "fc-daygrid-day-events", ref: n.fgContentElRef },
        n.fgContent,
        p(
          "div",
          { className: "fc-daygrid-day-bottom", style: { marginTop: n.moreMarginTop } },
          p(wh, { allDayDate: a, singlePlacements: n.singlePlacements, moreCnt: n.moreCnt, alignmentElRef: i, alignGridTop: !n.showDayNumber, extraDateSpan: n.extraDateSpan, dateProfile: n.dateProfile, eventSelection: n.eventSelection, eventDrag: n.eventDrag, eventResize: n.eventResize, todayRange: n.todayRange })
        )
      ),
      p("div", { className: "fc-daygrid-day-bg" }, n.bgContent)
    ));
  }
}
function Ch(t) {
  return t.dayNumberText || p(k, null, " ");
}
function _h(t, e, n) {
  const { start: r, end: i } = e, s = he(i, -1), o = n.getYear(r), a = n.getMonth(r), l = n.getYear(s), d = n.getMonth(s);
  return !(o === l && a === d) && // first date in current view?
  (t.valueOf() === r.valueOf() || // a month-start that's within the current range?
  n.getDay(t) === 1 && t.valueOf() < i.valueOf());
}
function na(t) {
  return t.eventRange.instance.instanceId + ":" + t.firstCol;
}
function ra(t) {
  return na(t) + ":" + t.lastCol;
}
function xh(t, e, n, r, i, s, o) {
  let a = new kh((y) => {
    let E = t[y.index].eventRange.instance.instanceId + ":" + y.span.start + ":" + (y.span.end - 1);
    return i[E] || 1;
  });
  a.allowReslicing = !0, a.strictOrder = r, e === !0 || n === !0 ? (a.maxCoord = s, a.hiddenConsumes = !0) : typeof e == "number" ? a.maxStackCnt = e : typeof n == "number" && (a.maxStackCnt = n, a.hiddenConsumes = !0);
  let l = [], d = [];
  for (let y = 0; y < t.length; y += 1) {
    let E = t[y], D = ra(E);
    i[D] != null ? l.push({
      index: y,
      span: {
        start: E.firstCol,
        end: E.lastCol + 1
      }
    }) : d.push(E);
  }
  let c = a.addSegs(l), h = a.toRects(), { singleColPlacements: f, multiColPlacements: u, leftoverMargins: g } = Rh(h, t, o), m = [], b = [];
  for (let y of d) {
    u[y.firstCol].push({
      seg: y,
      isVisible: !1,
      isAbsolute: !0,
      absoluteTop: 0,
      marginTop: 0
    });
    for (let E = y.firstCol; E <= y.lastCol; E += 1)
      f[E].push({
        seg: Le(y, E, E + 1, o),
        isVisible: !1,
        isAbsolute: !1,
        absoluteTop: 0,
        marginTop: 0
      });
  }
  for (let y = 0; y < o.length; y += 1)
    m.push(0);
  for (let y of c) {
    let E = t[y.index], D = y.span;
    u[D.start].push({
      seg: Le(E, D.start, D.end, o),
      isVisible: !1,
      isAbsolute: !0,
      absoluteTop: 0,
      marginTop: 0
    });
    for (let C = D.start; C < D.end; C += 1)
      m[C] += 1, f[C].push({
        seg: Le(E, C, C + 1, o),
        isVisible: !1,
        isAbsolute: !1,
        absoluteTop: 0,
        marginTop: 0
      });
  }
  for (let y = 0; y < o.length; y += 1)
    b.push(g[y]);
  return { singleColPlacements: f, multiColPlacements: u, moreCnts: m, moreMarginTops: b };
}
function Rh(t, e, n) {
  let r = Th(t, n.length), i = [], s = [], o = [];
  for (let a = 0; a < n.length; a += 1) {
    let l = r[a], d = [], c = 0, h = 0;
    for (let u of l) {
      let g = e[u.index];
      d.push({
        seg: Le(g, a, a + 1, n),
        isVisible: !0,
        isAbsolute: !1,
        absoluteTop: u.levelCoord,
        marginTop: u.levelCoord - c
      }), c = u.levelCoord + u.thickness;
    }
    let f = [];
    c = 0, h = 0;
    for (let u of l) {
      let g = e[u.index], m = u.span.end - u.span.start > 1, b = u.span.start === a;
      h += u.levelCoord - c, c = u.levelCoord + u.thickness, m ? (h += u.thickness, b && f.push({
        seg: Le(g, u.span.start, u.span.end, n),
        isVisible: !0,
        isAbsolute: !0,
        absoluteTop: u.levelCoord,
        marginTop: 0
      })) : b && (f.push({
        seg: Le(g, u.span.start, u.span.end, n),
        isVisible: !0,
        isAbsolute: !1,
        absoluteTop: u.levelCoord,
        marginTop: h
        // claim the margin
      }), h = 0);
    }
    i.push(d), s.push(f), o.push(h);
  }
  return { singleColPlacements: i, multiColPlacements: s, leftoverMargins: o };
}
function Th(t, e) {
  let n = [];
  for (let r = 0; r < e; r += 1)
    n.push([]);
  for (let r of t)
    for (let i = r.span.start; i < r.span.end; i += 1)
      n[i].push(r);
  return n;
}
function Le(t, e, n, r) {
  if (t.firstCol === e && t.lastCol === n - 1)
    return t;
  let i = t.eventRange, s = i.range, o = Re(s, {
    start: r[e].date,
    end: H(r[n - 1].date, 1)
  });
  return Object.assign(Object.assign({}, t), { firstCol: e, lastCol: n - 1, eventRange: {
    def: i.def,
    ui: Object.assign(Object.assign({}, i.ui), { durationEditable: !1 }),
    instance: i.instance,
    range: o
  }, isStart: t.isStart && o.start.valueOf() === s.start.valueOf(), isEnd: t.isEnd && o.end.valueOf() === s.end.valueOf() });
}
class kh extends _o {
  constructor() {
    super(...arguments), this.hiddenConsumes = !1, this.forceHidden = {};
  }
  addSegs(e) {
    const n = super.addSegs(e), { entriesByLevel: r } = this, i = (s) => !this.forceHidden[Ce(s)];
    for (let s = 0; s < r.length; s += 1)
      r[s] = r[s].filter(i);
    return n;
  }
  handleInvalidInsertion(e, n, r) {
    const { entriesByLevel: i, forceHidden: s } = this, { touchingEntry: o, touchingLevel: a, touchingLateral: l } = e;
    if (this.hiddenConsumes && o) {
      const d = Ce(o);
      if (!s[d])
        if (this.allowReslicing) {
          const c = Object.assign(Object.assign({}, o), { span: _r(o.span, n.span) }), h = Ce(c);
          s[h] = !0, i[a][l] = c, r.push(c), this.splitEntry(o, n, r);
        } else
          s[d] = !0, r.push(o);
    }
    super.handleInvalidInsertion(e, n, r);
  }
}
class ia extends J {
  constructor() {
    super(...arguments), this.cellElRefs = new ee(), this.frameElRefs = new ee(), this.fgElRefs = new ee(), this.segHarnessRefs = new ee(), this.rootElRef = L(), this.state = {
      framePositions: null,
      maxContentHeight: null,
      segHeights: {}
    }, this.handleResize = (e) => {
      e && this.updateSizing(!0);
    };
  }
  render() {
    let { props: e, state: n, context: r } = this, { options: i } = r, s = e.cells.length, o = Et(e.businessHourSegs, s), a = Et(e.bgEventSegs, s), l = Et(this.getHighlightSegs(), s), d = Et(this.getMirrorSegs(), s), { singleColPlacements: c, multiColPlacements: h, moreCnts: f, moreMarginTops: u } = xh(go(e.fgEventSegs, i.eventOrder), e.dayMaxEvents, e.dayMaxEventRows, i.eventOrderStrict, n.segHeights, n.maxContentHeight, e.cells), g = (
      // TODO: messy way to compute this
      e.eventDrag && e.eventDrag.affectedInstances || e.eventResize && e.eventResize.affectedInstances || {}
    );
    return p(
      "tr",
      { ref: this.rootElRef, role: "row" },
      e.renderIntro && e.renderIntro(),
      e.cells.map((m, b) => {
        let y = this.renderFgSegs(b, e.forPrint ? c[b] : h[b], e.todayRange, g), E = this.renderFgSegs(b, Mh(d[b], h), e.todayRange, {}, !!e.eventDrag, !!e.eventResize, !1);
        return p(Dh, { key: m.key, elRef: this.cellElRefs.createRef(m.key), innerElRef: this.frameElRefs.createRef(m.key), dateProfile: e.dateProfile, date: m.date, showDayNumber: e.showDayNumbers, showWeekNumber: e.showWeekNumbers && b === 0, forceDayTop: e.showWeekNumbers, todayRange: e.todayRange, eventSelection: e.eventSelection, eventDrag: e.eventDrag, eventResize: e.eventResize, extraRenderProps: m.extraRenderProps, extraDataAttrs: m.extraDataAttrs, extraClassNames: m.extraClassNames, extraDateSpan: m.extraDateSpan, moreCnt: f[b], moreMarginTop: u[b], singlePlacements: c[b], fgContentElRef: this.fgElRefs.createRef(m.key), fgContent: (
          // Fragment scopes the keys
          p(
            k,
            null,
            p(k, null, y),
            p(k, null, E)
          )
        ), bgContent: (
          // Fragment scopes the keys
          p(
            k,
            null,
            this.renderFillSegs(l[b], "highlight"),
            this.renderFillSegs(o[b], "non-business"),
            this.renderFillSegs(a[b], "bg-event")
          )
        ), minHeight: e.cellMinHeight });
      })
    );
  }
  componentDidMount() {
    this.updateSizing(!0), this.context.addResizeHandler(this.handleResize);
  }
  componentDidUpdate(e, n) {
    let r = this.props;
    this.updateSizing(!q(e, r));
  }
  componentWillUnmount() {
    this.context.removeResizeHandler(this.handleResize);
  }
  getHighlightSegs() {
    let { props: e } = this;
    return e.eventDrag && e.eventDrag.segs.length ? e.eventDrag.segs : e.eventResize && e.eventResize.segs.length ? e.eventResize.segs : e.dateSelectionSegs;
  }
  getMirrorSegs() {
    let { props: e } = this;
    return e.eventResize && e.eventResize.segs.length ? e.eventResize.segs : [];
  }
  renderFgSegs(e, n, r, i, s, o, a) {
    let { context: l } = this, { eventSelection: d } = this.props, { framePositions: c } = this.state, h = this.props.cells.length === 1, f = s || o || a, u = [];
    if (c)
      for (let g of n) {
        let { seg: m } = g, { instanceId: b } = m.eventRange.instance, y = g.isVisible && !i[b], E = g.isAbsolute, D = "", C = "";
        E && (l.isRtl ? (C = 0, D = c.lefts[m.lastCol] - c.lefts[m.firstCol]) : (D = 0, C = c.rights[m.firstCol] - c.rights[m.lastCol])), u.push(p("div", { className: "fc-daygrid-event-harness" + (E ? " fc-daygrid-event-harness-abs" : ""), key: na(m), ref: f ? null : this.segHarnessRefs.createRef(ra(m)), style: {
          visibility: y ? "" : "hidden",
          marginTop: E ? "" : g.marginTop,
          top: E ? g.absoluteTop : "",
          left: D,
          right: C
        } }, Jo(m) ? p(ta, Object.assign({ seg: m, isDragging: s, isSelected: b === d, defaultDisplayEventEnd: h }, ue(m, r))) : p(ea, Object.assign({ seg: m, isDragging: s, isResizing: o, isDateSelecting: a, isSelected: b === d, defaultDisplayEventEnd: h }, ue(m, r)))));
      }
    return u;
  }
  renderFillSegs(e, n) {
    let { isRtl: r } = this.context, { todayRange: i } = this.props, { framePositions: s } = this.state, o = [];
    if (s)
      for (let a of e) {
        let l = r ? {
          right: 0,
          left: s.lefts[a.lastCol] - s.lefts[a.firstCol]
        } : {
          left: 0,
          right: s.rights[a.firstCol] - s.rights[a.lastCol]
        };
        o.push(p("div", { key: vo(a.eventRange), className: "fc-daygrid-bg-harness", style: l }, n === "bg-event" ? p(Bo, Object.assign({ seg: a }, ue(a, i))) : Lo(n)));
      }
    return p(k, {}, ...o);
  }
  updateSizing(e) {
    let { props: n, state: r, frameElRefs: i } = this;
    if (!n.forPrint && n.clientWidth !== null) {
      if (e) {
        let l = n.cells.map((d) => i.currentMap[d.key]);
        if (l.length) {
          let d = this.rootElRef.current, c = new qe(
            d,
            l,
            !0,
            // isHorizontal
            !1
          );
          (!r.framePositions || !r.framePositions.similarTo(c)) && this.setState({
            framePositions: new qe(
              d,
              l,
              !0,
              // isHorizontal
              !1
            )
          });
        }
      }
      const s = this.state.segHeights, o = this.querySegHeights(), a = n.dayMaxEvents === !0 || n.dayMaxEventRows === !0;
      this.safeSetState({
        // HACK to prevent oscillations of events being shown/hidden from max-event-rows
        // Essentially, once you compute an element's height, never null-out.
        // TODO: always display all events, as visibility:hidden?
        segHeights: Object.assign(Object.assign({}, s), o),
        maxContentHeight: a ? this.computeMaxContentHeight() : null
      });
    }
  }
  querySegHeights() {
    let e = this.segHarnessRefs.currentMap, n = {};
    for (let r in e) {
      let i = Math.round(e[r].getBoundingClientRect().height);
      n[r] = Math.max(n[r] || 0, i);
    }
    return n;
  }
  computeMaxContentHeight() {
    let e = this.props.cells[0].key, n = this.cellElRefs.currentMap[e], r = this.fgElRefs.currentMap[e];
    return n.getBoundingClientRect().bottom - r.getBoundingClientRect().top;
  }
  getCellEls() {
    let e = this.cellElRefs.currentMap;
    return this.props.cells.map((n) => e[n.key]);
  }
}
ia.addStateEquality({
  segHeights: q
});
function Mh(t, e) {
  if (!t.length)
    return [];
  let n = Ih(e);
  return t.map((r) => ({
    seg: r,
    isVisible: !0,
    isAbsolute: !0,
    absoluteTop: n[r.eventRange.instance.instanceId],
    marginTop: 0
  }));
}
function Ih(t) {
  let e = {};
  for (let n of t)
    for (let r of n)
      e[r.seg.eventRange.instance.instanceId] = r.absoluteTop;
  return e;
}
class Nh extends J {
  constructor() {
    super(...arguments), this.splitBusinessHourSegs = A(Tt), this.splitBgEventSegs = A(Oh), this.splitFgEventSegs = A(Tt), this.splitDateSelectionSegs = A(Tt), this.splitEventDrag = A(ji), this.splitEventResize = A(ji), this.rowRefs = new ee();
  }
  render() {
    let { props: e, context: n } = this, r = e.cells.length, i = this.splitBusinessHourSegs(e.businessHourSegs, r), s = this.splitBgEventSegs(e.bgEventSegs, r), o = this.splitFgEventSegs(e.fgEventSegs, r), a = this.splitDateSelectionSegs(e.dateSelectionSegs, r), l = this.splitEventDrag(e.eventDrag, r), d = this.splitEventResize(e.eventResize, r), c = r >= 7 && e.clientWidth ? e.clientWidth / n.options.aspectRatio / 6 : null;
    return p(Qe, { unit: "day" }, (h, f) => p(k, null, e.cells.map((u, g) => p(ia, {
      ref: this.rowRefs.createRef(g),
      key: u.length ? u[0].date.toISOString() : g,
      showDayNumbers: r > 1,
      showWeekNumbers: e.showWeekNumbers,
      todayRange: f,
      dateProfile: e.dateProfile,
      cells: u,
      renderIntro: e.renderRowIntro,
      businessHourSegs: i[g],
      eventSelection: e.eventSelection,
      bgEventSegs: s[g],
      fgEventSegs: o[g],
      dateSelectionSegs: a[g],
      eventDrag: l[g],
      eventResize: d[g],
      dayMaxEvents: e.dayMaxEvents,
      dayMaxEventRows: e.dayMaxEventRows,
      clientWidth: e.clientWidth,
      clientHeight: e.clientHeight,
      cellMinHeight: c,
      forPrint: e.forPrint
    }))));
  }
  componentDidMount() {
    this.registerInteractiveComponent();
  }
  componentDidUpdate() {
    this.registerInteractiveComponent();
  }
  registerInteractiveComponent() {
    if (!this.rootEl) {
      const e = this.rowRefs.currentMap[0].getCellEls()[0], n = e ? e.closest(".fc-daygrid-body") : null;
      n && (this.rootEl = n, this.context.registerInteractiveComponent(this, {
        el: n,
        isHitComboAllowed: this.props.isHitComboAllowed
      }));
    }
  }
  componentWillUnmount() {
    this.rootEl && (this.context.unregisterInteractiveComponent(this), this.rootEl = null);
  }
  // Hit System
  // ----------------------------------------------------------------------------------------------------
  prepareHits() {
    this.rowPositions = new qe(
      this.rootEl,
      this.rowRefs.collect().map((e) => e.getCellEls()[0]),
      // first cell el in each row. TODO: not optimal
      !1,
      !0
    ), this.colPositions = new qe(
      this.rootEl,
      this.rowRefs.currentMap[0].getCellEls(),
      // cell els in first row
      !0,
      // horizontal
      !1
    );
  }
  queryHit(e, n) {
    let { colPositions: r, rowPositions: i } = this, s = r.leftToIndex(e), o = i.topToIndex(n);
    if (o != null && s != null) {
      let a = this.props.cells[o][s];
      return {
        dateProfile: this.props.dateProfile,
        dateSpan: Object.assign({ range: this.getCellRange(o, s), allDay: !0 }, a.extraDateSpan),
        dayEl: this.getCellEl(o, s),
        rect: {
          left: r.lefts[s],
          right: r.rights[s],
          top: i.tops[o],
          bottom: i.bottoms[o]
        },
        layer: 0
      };
    }
    return null;
  }
  getCellEl(e, n) {
    return this.rowRefs.currentMap[e].getCellEls()[n];
  }
  getCellRange(e, n) {
    let r = this.props.cells[e][n].date, i = H(r, 1);
    return { start: r, end: i };
  }
}
function Oh(t, e) {
  return Tt(t.filter(Ph), e);
}
function Ph(t) {
  return t.eventRange.def.allDay;
}
class $h extends J {
  constructor() {
    super(...arguments), this.elRef = L(), this.needsScrollReset = !1;
  }
  render() {
    let { props: e } = this, { dayMaxEventRows: n, dayMaxEvents: r, expandRows: i } = e, s = r === !0 || n === !0;
    s && !i && (s = !1, n = null, r = null);
    let o = [
      "fc-daygrid-body",
      s ? "fc-daygrid-body-balanced" : "fc-daygrid-body-unbalanced",
      i ? "" : "fc-daygrid-body-natural"
      // will height of one row depend on the others?
    ];
    return p(
      "div",
      { ref: this.elRef, className: o.join(" "), style: {
        // these props are important to give this wrapper correct dimensions for interactions
        // TODO: if we set it here, can we avoid giving to inner tables?
        width: e.clientWidth,
        minWidth: e.tableMinWidth
      } },
      p(
        "table",
        { role: "presentation", className: "fc-scrollgrid-sync-table", style: {
          width: e.clientWidth,
          minWidth: e.tableMinWidth,
          height: i ? e.clientHeight : ""
        } },
        e.colGroupNode,
        p(
          "tbody",
          { role: "presentation" },
          p(Nh, { dateProfile: e.dateProfile, cells: e.cells, renderRowIntro: e.renderRowIntro, showWeekNumbers: e.showWeekNumbers, clientWidth: e.clientWidth, clientHeight: e.clientHeight, businessHourSegs: e.businessHourSegs, bgEventSegs: e.bgEventSegs, fgEventSegs: e.fgEventSegs, dateSelectionSegs: e.dateSelectionSegs, eventSelection: e.eventSelection, eventDrag: e.eventDrag, eventResize: e.eventResize, dayMaxEvents: r, dayMaxEventRows: n, forPrint: e.forPrint, isHitComboAllowed: e.isHitComboAllowed })
        )
      )
    );
  }
  componentDidMount() {
    this.requestScrollReset();
  }
  componentDidUpdate(e) {
    e.dateProfile !== this.props.dateProfile ? this.requestScrollReset() : this.flushScrollReset();
  }
  requestScrollReset() {
    this.needsScrollReset = !0, this.flushScrollReset();
  }
  flushScrollReset() {
    if (this.needsScrollReset && this.props.clientWidth) {
      const e = Hh(this.elRef.current, this.props.dateProfile);
      if (e) {
        const n = e.closest(".fc-daygrid-body"), r = n.closest(".fc-scroller"), i = e.getBoundingClientRect().top - n.getBoundingClientRect().top;
        r.scrollTop = i ? i + 1 : 0;
      }
      this.needsScrollReset = !1;
    }
  }
}
function Hh(t, e) {
  let n;
  return e.currentRangeUnit.match(/year|month/) && (n = t.querySelector(`[data-date="${Ac(e.currentDate)}-01"]`)), n || (n = t.querySelector(`[data-date="${cr(e.currentDate)}"]`)), n;
}
class Bh extends Io {
  constructor() {
    super(...arguments), this.forceDayIfListItem = !0;
  }
  sliceRange(e, n) {
    return n.sliceRange(e);
  }
}
class sa extends J {
  constructor() {
    super(...arguments), this.slicer = new Bh(), this.tableRef = L();
  }
  render() {
    let { props: e, context: n } = this;
    return p($h, Object.assign({ ref: this.tableRef }, this.slicer.sliceProps(e, e.dateProfile, e.nextDayThreshold, n, e.dayTableModel), { dateProfile: e.dateProfile, cells: e.dayTableModel.cells, colGroupNode: e.colGroupNode, tableMinWidth: e.tableMinWidth, renderRowIntro: e.renderRowIntro, dayMaxEvents: e.dayMaxEvents, dayMaxEventRows: e.dayMaxEventRows, showWeekNumbers: e.showWeekNumbers, expandRows: e.expandRows, headerAlignElRef: e.headerAlignElRef, clientWidth: e.clientWidth, clientHeight: e.clientHeight, forPrint: e.forPrint }));
  }
}
class Lh extends yh {
  constructor() {
    super(...arguments), this.buildDayTableModel = A(zh), this.headerRef = L(), this.tableRef = L();
  }
  render() {
    let { options: e, dateProfileGenerator: n } = this.context, { props: r } = this, i = this.buildDayTableModel(r.dateProfile, n), s = e.dayHeaders && p(To, { ref: this.headerRef, dateProfile: r.dateProfile, dates: i.headerDates, datesRepDistinctDays: i.rowCnt === 1 }), o = (a) => p(sa, { ref: this.tableRef, dateProfile: r.dateProfile, dayTableModel: i, businessHours: r.businessHours, dateSelection: r.dateSelection, eventStore: r.eventStore, eventUiBases: r.eventUiBases, eventSelection: r.eventSelection, eventDrag: r.eventDrag, eventResize: r.eventResize, nextDayThreshold: e.nextDayThreshold, colGroupNode: a.tableColGroupNode, tableMinWidth: a.tableMinWidth, dayMaxEvents: e.dayMaxEvents, dayMaxEventRows: e.dayMaxEventRows, showWeekNumbers: e.weekNumbers, expandRows: !r.isHeightAuto, headerAlignElRef: this.headerElRef, clientWidth: a.clientWidth, clientHeight: a.clientHeight, forPrint: r.forPrint });
    return e.dayMinWidth ? this.renderHScrollLayout(s, o, i.colCnt, e.dayMinWidth) : this.renderSimpleLayout(s, o);
  }
}
function zh(t, e) {
  let n = new ko(t.renderRange, e);
  return new Mo(n, /year|month|week/.test(t.currentRangeUnit));
}
class Uh extends no {
  // Computes the date range that will be rendered
  buildRenderRange(e, n, r) {
    let i = super.buildRenderRange(e, n, r), { props: s } = this;
    return Fh({
      currentRange: i,
      snapToWeek: /^(year|month)$/.test(n),
      fixedWeekCount: s.fixedWeekCount,
      dateEnv: s.dateEnv
    });
  }
}
function Fh(t) {
  let { dateEnv: e, currentRange: n } = t, { start: r, end: i } = n, s;
  if (t.snapToWeek && (r = e.startOfWeek(r), s = e.startOfWeek(i), s.valueOf() !== i.valueOf() && (i = bi(s, 1))), t.fixedWeekCount) {
    let o = e.startOfWeek(e.startOfMonth(H(n.end, -1))), a = Math.ceil(
      // could be partial weeks due to hiddenDays
      fc(o, i)
    );
    i = bi(i, 6 - a);
  }
  return { start: r, end: i };
}
var jh = ':root{--fc-daygrid-event-dot-width:8px}.fc-daygrid-day-events:after,.fc-daygrid-day-events:before,.fc-daygrid-day-frame:after,.fc-daygrid-day-frame:before,.fc-daygrid-event-harness:after,.fc-daygrid-event-harness:before{clear:both;content:"";display:table}.fc .fc-daygrid-body{position:relative;z-index:1}.fc .fc-daygrid-day.fc-day-today{background-color:var(--fc-today-bg-color)}.fc .fc-daygrid-day-frame{min-height:100%;position:relative}.fc .fc-daygrid-day-top{display:flex;flex-direction:row-reverse}.fc .fc-day-other .fc-daygrid-day-top{opacity:.3}.fc .fc-daygrid-day-number{padding:4px;position:relative;z-index:4}.fc .fc-daygrid-month-start{font-size:1.1em;font-weight:700}.fc .fc-daygrid-day-events{margin-top:1px}.fc .fc-daygrid-body-balanced .fc-daygrid-day-events{left:0;position:absolute;right:0}.fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events{min-height:2em;position:relative}.fc .fc-daygrid-body-natural .fc-daygrid-day-events{margin-bottom:1em}.fc .fc-daygrid-event-harness{position:relative}.fc .fc-daygrid-event-harness-abs{left:0;position:absolute;right:0;top:0}.fc .fc-daygrid-bg-harness{bottom:0;position:absolute;top:0}.fc .fc-daygrid-day-bg .fc-non-business{z-index:1}.fc .fc-daygrid-day-bg .fc-bg-event{z-index:2}.fc .fc-daygrid-day-bg .fc-highlight{z-index:3}.fc .fc-daygrid-event{margin-top:1px;z-index:6}.fc .fc-daygrid-event.fc-event-mirror{z-index:7}.fc .fc-daygrid-day-bottom{font-size:.85em;margin:0 2px}.fc .fc-daygrid-day-bottom:after,.fc .fc-daygrid-day-bottom:before{clear:both;content:"";display:table}.fc .fc-daygrid-more-link{border-radius:3px;cursor:pointer;line-height:1;margin-top:1px;max-width:100%;overflow:hidden;padding:2px;position:relative;white-space:nowrap;z-index:4}.fc .fc-daygrid-more-link:hover{background-color:rgba(0,0,0,.1)}.fc .fc-daygrid-week-number{background-color:var(--fc-neutral-bg-color);color:var(--fc-neutral-text-color);min-width:1.5em;padding:2px;position:absolute;text-align:center;top:0;z-index:5}.fc .fc-more-popover .fc-popover-body{min-width:220px;padding:10px}.fc-direction-ltr .fc-daygrid-event.fc-event-start,.fc-direction-rtl .fc-daygrid-event.fc-event-end{margin-left:2px}.fc-direction-ltr .fc-daygrid-event.fc-event-end,.fc-direction-rtl .fc-daygrid-event.fc-event-start{margin-right:2px}.fc-direction-ltr .fc-daygrid-more-link{float:left}.fc-direction-ltr .fc-daygrid-week-number{border-radius:0 0 3px 0;left:0}.fc-direction-rtl .fc-daygrid-more-link{float:right}.fc-direction-rtl .fc-daygrid-week-number{border-radius:0 0 0 3px;right:0}.fc-liquid-hack .fc-daygrid-day-frame{position:static}.fc-daygrid-event{border-radius:3px;font-size:var(--fc-small-font-size);position:relative;white-space:nowrap}.fc-daygrid-block-event .fc-event-time{font-weight:700}.fc-daygrid-block-event .fc-event-time,.fc-daygrid-block-event .fc-event-title{padding:1px}.fc-daygrid-dot-event{align-items:center;display:flex;padding:2px 0}.fc-daygrid-dot-event .fc-event-title{flex-grow:1;flex-shrink:1;font-weight:700;min-width:0;overflow:hidden}.fc-daygrid-dot-event.fc-event-mirror,.fc-daygrid-dot-event:hover{background:rgba(0,0,0,.1)}.fc-daygrid-dot-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-daygrid-event-dot{border:calc(var(--fc-daygrid-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-daygrid-event-dot-width)/2);box-sizing:content-box;height:0;margin:0 4px;width:0}.fc-direction-ltr .fc-daygrid-event .fc-event-time{margin-right:3px}.fc-direction-rtl .fc-daygrid-event .fc-event-time{margin-left:3px}';
rr(jh);
var Wh = se({
  name: "@fullcalendar/daygrid",
  initialView: "dayGridMonth",
  views: {
    dayGrid: {
      component: Lh,
      dateProfileGeneratorClass: Uh
    },
    dayGridDay: {
      type: "dayGrid",
      duration: { days: 1 }
    },
    dayGridWeek: {
      type: "dayGrid",
      duration: { weeks: 1 }
    },
    dayGridMonth: {
      type: "dayGrid",
      duration: { months: 1 },
      fixedWeekCount: !0
    },
    dayGridYear: {
      type: "dayGrid",
      duration: { years: 1 }
    }
  }
});
xr.touchMouseIgnoreWait = 500;
let Vn = 0, qt = 0, Gn = !1;
class oa {
  constructor(e) {
    this.subjectEl = null, this.selector = "", this.handleSelector = "", this.shouldIgnoreMove = !1, this.shouldWatchScroll = !0, this.isDragging = !1, this.isTouchDragging = !1, this.wasTouchScroll = !1, this.handleMouseDown = (n) => {
      if (!this.shouldIgnoreMouse() && Vh(n) && this.tryStart(n)) {
        let r = this.createEventFromMouse(n, !0);
        this.emitter.trigger("pointerdown", r), this.initScrollWatch(r), this.shouldIgnoreMove || document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("mouseup", this.handleMouseUp);
      }
    }, this.handleMouseMove = (n) => {
      let r = this.createEventFromMouse(n);
      this.recordCoords(r), this.emitter.trigger("pointermove", r);
    }, this.handleMouseUp = (n) => {
      document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp), this.emitter.trigger("pointerup", this.createEventFromMouse(n)), this.cleanup();
    }, this.handleTouchStart = (n) => {
      if (this.tryStart(n)) {
        this.isTouchDragging = !0;
        let r = this.createEventFromTouch(n, !0);
        this.emitter.trigger("pointerdown", r), this.initScrollWatch(r);
        let i = n.target;
        this.shouldIgnoreMove || i.addEventListener("touchmove", this.handleTouchMove), i.addEventListener("touchend", this.handleTouchEnd), i.addEventListener("touchcancel", this.handleTouchEnd), window.addEventListener("scroll", this.handleTouchScroll, !0);
      }
    }, this.handleTouchMove = (n) => {
      let r = this.createEventFromTouch(n);
      this.recordCoords(r), this.emitter.trigger("pointermove", r);
    }, this.handleTouchEnd = (n) => {
      if (this.isDragging) {
        let r = n.target;
        r.removeEventListener("touchmove", this.handleTouchMove), r.removeEventListener("touchend", this.handleTouchEnd), r.removeEventListener("touchcancel", this.handleTouchEnd), window.removeEventListener("scroll", this.handleTouchScroll, !0), this.emitter.trigger("pointerup", this.createEventFromTouch(n)), this.cleanup(), this.isTouchDragging = !1, Gh();
      }
    }, this.handleTouchScroll = () => {
      this.wasTouchScroll = !0;
    }, this.handleScroll = (n) => {
      if (!this.shouldIgnoreMove) {
        let r = window.scrollX - this.prevScrollX + this.prevPageX, i = window.scrollY - this.prevScrollY + this.prevPageY;
        this.emitter.trigger("pointermove", {
          origEvent: n,
          isTouch: this.isTouchDragging,
          subjectEl: this.subjectEl,
          pageX: r,
          pageY: i,
          deltaX: r - this.origPageX,
          deltaY: i - this.origPageY
        });
      }
    }, this.containerEl = e, this.emitter = new an(), e.addEventListener("mousedown", this.handleMouseDown), e.addEventListener("touchstart", this.handleTouchStart, { passive: !0 }), qh();
  }
  destroy() {
    this.containerEl.removeEventListener("mousedown", this.handleMouseDown), this.containerEl.removeEventListener("touchstart", this.handleTouchStart, { passive: !0 }), Yh();
  }
  tryStart(e) {
    let n = this.querySubjectEl(e), r = e.target;
    return n && (!this.handleSelector || B(r, this.handleSelector)) ? (this.subjectEl = n, this.isDragging = !0, this.wasTouchScroll = !1, !0) : !1;
  }
  cleanup() {
    Gn = !1, this.isDragging = !1, this.subjectEl = null, this.destroyScrollWatch();
  }
  querySubjectEl(e) {
    return this.selector ? B(e.target, this.selector) : this.containerEl;
  }
  shouldIgnoreMouse() {
    return Vn || this.isTouchDragging;
  }
  // can be called by user of this class, to cancel touch-based scrolling for the current drag
  cancelTouchScroll() {
    this.isDragging && (Gn = !0);
  }
  // Scrolling that simulates pointermoves
  // ----------------------------------------------------------------------------------------------------
  initScrollWatch(e) {
    this.shouldWatchScroll && (this.recordCoords(e), window.addEventListener("scroll", this.handleScroll, !0));
  }
  recordCoords(e) {
    this.shouldWatchScroll && (this.prevPageX = e.pageX, this.prevPageY = e.pageY, this.prevScrollX = window.scrollX, this.prevScrollY = window.scrollY);
  }
  destroyScrollWatch() {
    this.shouldWatchScroll && window.removeEventListener("scroll", this.handleScroll, !0);
  }
  // Event Normalization
  // ----------------------------------------------------------------------------------------------------
  createEventFromMouse(e, n) {
    let r = 0, i = 0;
    return n ? (this.origPageX = e.pageX, this.origPageY = e.pageY) : (r = e.pageX - this.origPageX, i = e.pageY - this.origPageY), {
      origEvent: e,
      isTouch: !1,
      subjectEl: this.subjectEl,
      pageX: e.pageX,
      pageY: e.pageY,
      deltaX: r,
      deltaY: i
    };
  }
  createEventFromTouch(e, n) {
    let r = e.touches, i, s, o = 0, a = 0;
    return r && r.length ? (i = r[0].pageX, s = r[0].pageY) : (i = e.pageX, s = e.pageY), n ? (this.origPageX = i, this.origPageY = s) : (o = i - this.origPageX, a = s - this.origPageY), {
      origEvent: e,
      isTouch: !0,
      subjectEl: this.subjectEl,
      pageX: i,
      pageY: s,
      deltaX: o,
      deltaY: a
    };
  }
}
function Vh(t) {
  return t.button === 0 && !t.ctrlKey;
}
function Gh() {
  Vn += 1, setTimeout(() => {
    Vn -= 1;
  }, xr.touchMouseIgnoreWait);
}
function qh() {
  qt += 1, qt === 1 && window.addEventListener("touchmove", aa, { passive: !1 });
}
function Yh() {
  qt -= 1, qt || window.removeEventListener("touchmove", aa, { passive: !1 });
}
function aa(t) {
  Gn && t.preventDefault();
}
class Qh {
  constructor() {
    this.isVisible = !1, this.sourceEl = null, this.mirrorEl = null, this.sourceElRect = null, this.parentNode = document.body, this.zIndex = 9999, this.revertDuration = 0;
  }
  start(e, n, r) {
    this.sourceEl = e, this.sourceElRect = this.sourceEl.getBoundingClientRect(), this.origScreenX = n - window.scrollX, this.origScreenY = r - window.scrollY, this.deltaX = 0, this.deltaY = 0, this.updateElPosition();
  }
  handleMove(e, n) {
    this.deltaX = e - window.scrollX - this.origScreenX, this.deltaY = n - window.scrollY - this.origScreenY, this.updateElPosition();
  }
  // can be called before start
  setIsVisible(e) {
    e ? this.isVisible || (this.mirrorEl && (this.mirrorEl.style.display = ""), this.isVisible = e, this.updateElPosition()) : this.isVisible && (this.mirrorEl && (this.mirrorEl.style.display = "none"), this.isVisible = e);
  }
  // always async
  stop(e, n) {
    let r = () => {
      this.cleanup(), n();
    };
    e && this.mirrorEl && this.isVisible && this.revertDuration && // if 0, transition won't work
    (this.deltaX || this.deltaY) ? this.doRevertAnimation(r, this.revertDuration) : setTimeout(r, 0);
  }
  doRevertAnimation(e, n) {
    let r = this.mirrorEl, i = this.sourceEl.getBoundingClientRect();
    r.style.transition = "top " + n + "ms,left " + n + "ms", nt(r, {
      left: i.left,
      top: i.top
    }), ql(r, () => {
      r.style.transition = "", e();
    });
  }
  cleanup() {
    this.mirrorEl && (sr(this.mirrorEl), this.mirrorEl = null), this.sourceEl = null;
  }
  updateElPosition() {
    this.sourceEl && this.isVisible && nt(this.getMirrorEl(), {
      left: this.sourceElRect.left + this.deltaX,
      top: this.sourceElRect.top + this.deltaY
    });
  }
  getMirrorEl() {
    let e = this.sourceElRect, n = this.mirrorEl;
    return n || (n = this.mirrorEl = this.sourceEl.cloneNode(!0), n.style.userSelect = "none", n.style.webkitUserSelect = "none", n.style.pointerEvents = "none", n.classList.add("fc-event-dragging"), nt(n, {
      position: "fixed",
      zIndex: this.zIndex,
      visibility: "",
      boxSizing: "border-box",
      width: e.right - e.left,
      height: e.bottom - e.top,
      right: "auto",
      bottom: "auto",
      margin: 0
    }), this.parentNode.appendChild(n)), n;
  }
}
class la extends Cr {
  constructor(e, n) {
    super(), this.handleScroll = () => {
      this.scrollTop = this.scrollController.getScrollTop(), this.scrollLeft = this.scrollController.getScrollLeft(), this.handleScrollChange();
    }, this.scrollController = e, this.doesListening = n, this.scrollTop = this.origScrollTop = e.getScrollTop(), this.scrollLeft = this.origScrollLeft = e.getScrollLeft(), this.scrollWidth = e.getScrollWidth(), this.scrollHeight = e.getScrollHeight(), this.clientWidth = e.getClientWidth(), this.clientHeight = e.getClientHeight(), this.clientRect = this.computeClientRect(), this.doesListening && this.getEventTarget().addEventListener("scroll", this.handleScroll);
  }
  destroy() {
    this.doesListening && this.getEventTarget().removeEventListener("scroll", this.handleScroll);
  }
  getScrollTop() {
    return this.scrollTop;
  }
  getScrollLeft() {
    return this.scrollLeft;
  }
  setScrollTop(e) {
    this.scrollController.setScrollTop(e), this.doesListening || (this.scrollTop = Math.max(Math.min(e, this.getMaxScrollTop()), 0), this.handleScrollChange());
  }
  setScrollLeft(e) {
    this.scrollController.setScrollLeft(e), this.doesListening || (this.scrollLeft = Math.max(Math.min(e, this.getMaxScrollLeft()), 0), this.handleScrollChange());
  }
  getClientWidth() {
    return this.clientWidth;
  }
  getClientHeight() {
    return this.clientHeight;
  }
  getScrollWidth() {
    return this.scrollWidth;
  }
  getScrollHeight() {
    return this.scrollHeight;
  }
  handleScrollChange() {
  }
}
class ca extends la {
  constructor(e, n) {
    super(new vu(e), n);
  }
  getEventTarget() {
    return this.scrollController.el;
  }
  computeClientRect() {
    return gu(this.scrollController.el);
  }
}
class Zh extends la {
  constructor(e) {
    super(new bu(), e);
  }
  getEventTarget() {
    return window;
  }
  computeClientRect() {
    return {
      left: this.scrollLeft,
      right: this.scrollLeft + this.clientWidth,
      top: this.scrollTop,
      bottom: this.scrollTop + this.clientHeight
    };
  }
  // the window is the only scroll object that changes it's rectangle relative
  // to the document's topleft as it scrolls
  handleScrollChange() {
    this.clientRect = this.computeClientRect();
  }
}
const Wi = typeof performance == "function" ? performance.now : Date.now;
class Kh {
  constructor() {
    this.isEnabled = !0, this.scrollQuery = [window, ".fc-scroller"], this.edgeThreshold = 50, this.maxVelocity = 300, this.pointerScreenX = null, this.pointerScreenY = null, this.isAnimating = !1, this.scrollCaches = null, this.everMovedUp = !1, this.everMovedDown = !1, this.everMovedLeft = !1, this.everMovedRight = !1, this.animate = () => {
      if (this.isAnimating) {
        let e = this.computeBestEdge(this.pointerScreenX + window.scrollX, this.pointerScreenY + window.scrollY);
        if (e) {
          let n = Wi();
          this.handleSide(e, (n - this.msSinceRequest) / 1e3), this.requestAnimation(n);
        } else
          this.isAnimating = !1;
      }
    };
  }
  start(e, n, r) {
    this.isEnabled && (this.scrollCaches = this.buildCaches(r), this.pointerScreenX = null, this.pointerScreenY = null, this.everMovedUp = !1, this.everMovedDown = !1, this.everMovedLeft = !1, this.everMovedRight = !1, this.handleMove(e, n));
  }
  handleMove(e, n) {
    if (this.isEnabled) {
      let r = e - window.scrollX, i = n - window.scrollY, s = this.pointerScreenY === null ? 0 : i - this.pointerScreenY, o = this.pointerScreenX === null ? 0 : r - this.pointerScreenX;
      s < 0 ? this.everMovedUp = !0 : s > 0 && (this.everMovedDown = !0), o < 0 ? this.everMovedLeft = !0 : o > 0 && (this.everMovedRight = !0), this.pointerScreenX = r, this.pointerScreenY = i, this.isAnimating || (this.isAnimating = !0, this.requestAnimation(Wi()));
    }
  }
  stop() {
    if (this.isEnabled) {
      this.isAnimating = !1;
      for (let e of this.scrollCaches)
        e.destroy();
      this.scrollCaches = null;
    }
  }
  requestAnimation(e) {
    this.msSinceRequest = e, requestAnimationFrame(this.animate);
  }
  handleSide(e, n) {
    let { scrollCache: r } = e, { edgeThreshold: i } = this, s = i - e.distance, o = (
      // the closer to the edge, the faster we scroll
      s * s / (i * i) * // quadratic
      this.maxVelocity * n
    ), a = 1;
    switch (e.name) {
      case "left":
        a = -1;
      // falls through
      case "right":
        r.setScrollLeft(r.getScrollLeft() + o * a);
        break;
      case "top":
        a = -1;
      // falls through
      case "bottom":
        r.setScrollTop(r.getScrollTop() + o * a);
        break;
    }
  }
  // left/top are relative to document topleft
  computeBestEdge(e, n) {
    let { edgeThreshold: r } = this, i = null, s = this.scrollCaches || [];
    for (let o of s) {
      let a = o.clientRect, l = e - a.left, d = a.right - e, c = n - a.top, h = a.bottom - n;
      l >= 0 && d >= 0 && c >= 0 && h >= 0 && (c <= r && this.everMovedUp && o.canScrollUp() && (!i || i.distance > c) && (i = { scrollCache: o, name: "top", distance: c }), h <= r && this.everMovedDown && o.canScrollDown() && (!i || i.distance > h) && (i = { scrollCache: o, name: "bottom", distance: h }), l <= r && this.everMovedLeft && o.canScrollLeft() && (!i || i.distance > l) && (i = { scrollCache: o, name: "left", distance: l }), d <= r && this.everMovedRight && o.canScrollRight() && (!i || i.distance > d) && (i = { scrollCache: o, name: "right", distance: d }));
    }
    return i;
  }
  buildCaches(e) {
    return this.queryScrollEls(e).map((n) => n === window ? new Zh(!1) : new ca(n, !1));
  }
  queryScrollEls(e) {
    let n = [];
    for (let r of this.scrollQuery)
      typeof r == "object" ? n.push(r) : n.push(...Array.prototype.slice.call(e.getRootNode().querySelectorAll(r)));
    return n;
  }
}
class ft extends wu {
  constructor(e, n) {
    super(e), this.containerEl = e, this.delay = null, this.minDistance = 0, this.touchScrollAllowed = !0, this.mirrorNeedsRevert = !1, this.isInteracting = !1, this.isDragging = !1, this.isDelayEnded = !1, this.isDistanceSurpassed = !1, this.delayTimeoutId = null, this.onPointerDown = (i) => {
      this.isDragging || (this.isInteracting = !0, this.isDelayEnded = !1, this.isDistanceSurpassed = !1, Yl(document.body), Zl(document.body), i.isTouch || i.origEvent.preventDefault(), this.emitter.trigger("pointerdown", i), this.isInteracting && // not destroyed via pointerdown handler
      !this.pointer.shouldIgnoreMove && (this.mirror.setIsVisible(!1), this.mirror.start(i.subjectEl, i.pageX, i.pageY), this.startDelay(i), this.minDistance || this.handleDistanceSurpassed(i)));
    }, this.onPointerMove = (i) => {
      if (this.isInteracting) {
        if (this.emitter.trigger("pointermove", i), !this.isDistanceSurpassed) {
          let s = this.minDistance, o, { deltaX: a, deltaY: l } = i;
          o = a * a + l * l, o >= s * s && this.handleDistanceSurpassed(i);
        }
        this.isDragging && (i.origEvent.type !== "scroll" && (this.mirror.handleMove(i.pageX, i.pageY), this.autoScroller.handleMove(i.pageX, i.pageY)), this.emitter.trigger("dragmove", i));
      }
    }, this.onPointerUp = (i) => {
      this.isInteracting && (this.isInteracting = !1, Ql(document.body), Kl(document.body), this.emitter.trigger("pointerup", i), this.isDragging && (this.autoScroller.stop(), this.tryStopDrag(i)), this.delayTimeoutId && (clearTimeout(this.delayTimeoutId), this.delayTimeoutId = null));
    };
    let r = this.pointer = new oa(e);
    r.emitter.on("pointerdown", this.onPointerDown), r.emitter.on("pointermove", this.onPointerMove), r.emitter.on("pointerup", this.onPointerUp), n && (r.selector = n), this.mirror = new Qh(), this.autoScroller = new Kh();
  }
  destroy() {
    this.pointer.destroy(), this.onPointerUp({});
  }
  startDelay(e) {
    typeof this.delay == "number" ? this.delayTimeoutId = setTimeout(() => {
      this.delayTimeoutId = null, this.handleDelayEnd(e);
    }, this.delay) : this.handleDelayEnd(e);
  }
  handleDelayEnd(e) {
    this.isDelayEnded = !0, this.tryStartDrag(e);
  }
  handleDistanceSurpassed(e) {
    this.isDistanceSurpassed = !0, this.tryStartDrag(e);
  }
  tryStartDrag(e) {
    this.isDelayEnded && this.isDistanceSurpassed && (!this.pointer.wasTouchScroll || this.touchScrollAllowed) && (this.isDragging = !0, this.mirrorNeedsRevert = !1, this.autoScroller.start(e.pageX, e.pageY, this.containerEl), this.emitter.trigger("dragstart", e), this.touchScrollAllowed === !1 && this.pointer.cancelTouchScroll());
  }
  tryStopDrag(e) {
    this.mirror.stop(this.mirrorNeedsRevert, this.stopDrag.bind(this, e));
  }
  stopDrag(e) {
    this.isDragging = !1, this.emitter.trigger("dragend", e);
  }
  // fill in the implementations...
  setIgnoreMove(e) {
    this.pointer.shouldIgnoreMove = e;
  }
  setMirrorIsVisible(e) {
    this.mirror.setIsVisible(e);
  }
  setMirrorNeedsRevert(e) {
    this.mirrorNeedsRevert = e;
  }
  setAutoScrollEnabled(e) {
    this.autoScroller.isEnabled = e;
  }
}
class Xh {
  constructor(e) {
    this.el = e, this.origRect = Dr(e), this.scrollCaches = Co(e).map((n) => new ca(n, !0));
  }
  destroy() {
    for (let e of this.scrollCaches)
      e.destroy();
  }
  computeLeft() {
    let e = this.origRect.left;
    for (let n of this.scrollCaches)
      e += n.origScrollLeft - n.getScrollLeft();
    return e;
  }
  computeTop() {
    let e = this.origRect.top;
    for (let n of this.scrollCaches)
      e += n.origScrollTop - n.getScrollTop();
    return e;
  }
  isWithinClipping(e, n) {
    let r = { left: e, top: n };
    for (let i of this.scrollCaches)
      if (!Jh(i.getEventTarget()) && !nu(r, i.clientRect))
        return !1;
    return !0;
  }
}
function Jh(t) {
  let e = t.tagName;
  return e === "HTML" || e === "BODY";
}
class ln {
  constructor(e, n) {
    this.useSubjectCenter = !1, this.requireInitial = !0, this.disablePointCheck = !1, this.initialHit = null, this.movingHit = null, this.finalHit = null, this.handlePointerDown = (r) => {
      let { dragging: i } = this;
      this.initialHit = null, this.movingHit = null, this.finalHit = null, this.prepareHits(), this.processFirstCoord(r), this.initialHit || !this.requireInitial ? (i.setIgnoreMove(!1), this.emitter.trigger("pointerdown", r)) : i.setIgnoreMove(!0);
    }, this.handleDragStart = (r) => {
      this.emitter.trigger("dragstart", r), this.handleMove(r, !0);
    }, this.handleDragMove = (r) => {
      this.emitter.trigger("dragmove", r), this.handleMove(r);
    }, this.handlePointerUp = (r) => {
      this.releaseHits(), this.emitter.trigger("pointerup", r);
    }, this.handleDragEnd = (r) => {
      this.movingHit && this.emitter.trigger("hitupdate", null, !0, r), this.finalHit = this.movingHit, this.movingHit = null, this.emitter.trigger("dragend", r);
    }, this.droppableStore = n, e.emitter.on("pointerdown", this.handlePointerDown), e.emitter.on("dragstart", this.handleDragStart), e.emitter.on("dragmove", this.handleDragMove), e.emitter.on("pointerup", this.handlePointerUp), e.emitter.on("dragend", this.handleDragEnd), this.dragging = e, this.emitter = new an();
  }
  // sets initialHit
  // sets coordAdjust
  processFirstCoord(e) {
    let n = { left: e.pageX, top: e.pageY }, r = n, i = e.subjectEl, s;
    i instanceof HTMLElement && (s = Dr(i), r = ru(r, s));
    let o = this.initialHit = this.queryHitForOffset(r.left, r.top);
    if (o) {
      if (this.useSubjectCenter && s) {
        let a = So(s, o.rect);
        a && (r = iu(a));
      }
      this.coordAdjust = su(r, n);
    } else
      this.coordAdjust = { left: 0, top: 0 };
  }
  handleMove(e, n) {
    let r = this.queryHitForOffset(e.pageX + this.coordAdjust.left, e.pageY + this.coordAdjust.top);
    (n || !cn(this.movingHit, r)) && (this.movingHit = r, this.emitter.trigger("hitupdate", r, !1, e));
  }
  prepareHits() {
    this.offsetTrackers = re(this.droppableStore, (e) => (e.component.prepareHits(), new Xh(e.el)));
  }
  releaseHits() {
    let { offsetTrackers: e } = this;
    for (let n in e)
      e[n].destroy();
    this.offsetTrackers = {};
  }
  queryHitForOffset(e, n) {
    let { droppableStore: r, offsetTrackers: i } = this, s = null;
    for (let o in r) {
      let a = r[o].component, l = i[o];
      if (l && // wasn't destroyed mid-drag
      l.isWithinClipping(e, n)) {
        let d = l.computeLeft(), c = l.computeTop(), h = e - d, f = n - c, { origRect: u } = l, g = u.right - u.left, m = u.bottom - u.top;
        if (
          // must be within the element's bounds
          h >= 0 && h < g && f >= 0 && f < m
        ) {
          let b = a.queryHit(h, f, g, m);
          b && // make sure the hit is within activeRange, meaning it's not a dead cell
          sn(b.dateProfile.activeRange, b.dateSpan.range) && // Ensure the component we are querying for the hit is accessibly my the pointer
          // Prevents obscured calendars (ex: under a modal dialog) from accepting hit
          // https://github.com/fullcalendar/fullcalendar/issues/5026
          (this.disablePointCheck || l.el.contains(l.el.getRootNode().elementFromPoint(
            // add-back origins to get coordinate relative to top-left of window viewport
            h + d - window.scrollX,
            f + c - window.scrollY
          ))) && (!s || b.layer > s.layer) && (b.componentId = o, b.context = a.context, b.rect.left += d, b.rect.right += d, b.rect.top += c, b.rect.bottom += c, s = b);
        }
      }
    }
    return s;
  }
}
function cn(t, e) {
  return !t && !e ? !0 : !!t != !!e ? !1 : Vd(t.dateSpan, e.dateSpan);
}
function da(t, e) {
  let n = {};
  for (let r of e.pluginHooks.datePointTransforms)
    Object.assign(n, r(t, e));
  return Object.assign(n, ep(t, e.dateEnv)), n;
}
function ep(t, e) {
  return {
    date: e.toDate(t.range.start),
    dateStr: e.formatIso(t.range.start, { omitTime: t.allDay }),
    allDay: t.allDay
  };
}
class tp extends Ye {
  constructor(e) {
    super(e), this.handlePointerDown = (r) => {
      let { dragging: i } = this, s = r.origEvent.target;
      i.setIgnoreMove(!this.component.isValidDateDownEl(s));
    }, this.handleDragEnd = (r) => {
      let { component: i } = this, { pointer: s } = this.dragging;
      if (!s.wasTouchScroll) {
        let { initialHit: o, finalHit: a } = this.hitDragging;
        if (o && a && cn(o, a)) {
          let { context: l } = i, d = Object.assign(Object.assign({}, da(o.dateSpan, l)), { dayEl: o.dayEl, jsEvent: r.origEvent, view: l.viewApi || l.calendarApi.view });
          l.emitter.trigger("dateClick", d);
        }
      }
    }, this.dragging = new ft(e.el), this.dragging.autoScroller.isEnabled = !1;
    let n = this.hitDragging = new ln(this.dragging, Sr(e));
    n.emitter.on("pointerdown", this.handlePointerDown), n.emitter.on("dragend", this.handleDragEnd);
  }
  destroy() {
    this.dragging.destroy();
  }
}
class np extends Ye {
  constructor(e) {
    super(e), this.dragSelection = null, this.handlePointerDown = (o) => {
      let { component: a, dragging: l } = this, { options: d } = a.context, c = d.selectable && a.isValidDateDownEl(o.origEvent.target);
      l.setIgnoreMove(!c), l.delay = o.isTouch ? rp(a) : null;
    }, this.handleDragStart = (o) => {
      this.component.context.calendarApi.unselect(o);
    }, this.handleHitUpdate = (o, a) => {
      let { context: l } = this.component, d = null, c = !1;
      if (o) {
        let h = this.hitDragging.initialHit;
        o.componentId === h.componentId && this.isHitComboAllowed && !this.isHitComboAllowed(h, o) || (d = ip(h, o, l.pluginHooks.dateSelectionTransformers)), (!d || !xu(d, o.dateProfile, l)) && (c = !0, d = null);
      }
      d ? l.dispatch({ type: "SELECT_DATES", selection: d }) : a || l.dispatch({ type: "UNSELECT_DATES" }), c ? or() : ar(), a || (this.dragSelection = d);
    }, this.handlePointerUp = (o) => {
      this.dragSelection && (fo(this.dragSelection, o, this.component.context), this.dragSelection = null);
    };
    let { component: n } = e, { options: r } = n.context, i = this.dragging = new ft(e.el);
    i.touchScrollAllowed = !1, i.minDistance = r.selectMinDistance || 0, i.autoScroller.isEnabled = r.dragScroll;
    let s = this.hitDragging = new ln(this.dragging, Sr(e));
    s.emitter.on("pointerdown", this.handlePointerDown), s.emitter.on("dragstart", this.handleDragStart), s.emitter.on("hitupdate", this.handleHitUpdate), s.emitter.on("pointerup", this.handlePointerUp);
  }
  destroy() {
    this.dragging.destroy();
  }
}
function rp(t) {
  let { options: e } = t.context, n = e.selectLongPressDelay;
  return n == null && (n = e.longPressDelay), n;
}
function ip(t, e, n) {
  let r = t.dateSpan, i = e.dateSpan, s = [
    r.range.start,
    r.range.end,
    i.range.start,
    i.range.end
  ];
  s.sort(nc);
  let o = {};
  for (let a of n) {
    let l = a(t, e);
    if (l === !1)
      return null;
    l && Object.assign(o, l);
  }
  return o.range = { start: s[0], end: s[3] }, o.allDay = r.allDay, o;
}
class ht extends Ye {
  constructor(e) {
    super(e), this.subjectEl = null, this.subjectSeg = null, this.isDragging = !1, this.eventRange = null, this.relevantEvents = null, this.receivingContext = null, this.validMutation = null, this.mutatedRelevantEvents = null, this.handlePointerDown = (o) => {
      let a = o.origEvent.target, { component: l, dragging: d } = this, { mirror: c } = d, { options: h } = l.context, f = l.context;
      this.subjectEl = o.subjectEl;
      let u = this.subjectSeg = Ge(o.subjectEl), m = (this.eventRange = u.eventRange).instance.instanceId;
      this.relevantEvents = br(f.getCurrentData().eventStore, m), d.minDistance = o.isTouch ? 0 : h.eventDragMinDistance, d.delay = // only do a touch delay if touch and this event hasn't been selected yet
      o.isTouch && m !== l.props.eventSelection ? op(l) : null, h.fixedMirrorParent ? c.parentNode = h.fixedMirrorParent : c.parentNode = B(a, ".fc"), c.revertDuration = h.dragRevertDuration;
      let b = l.isValidSegDownEl(a) && !B(a, ".fc-event-resizer");
      d.setIgnoreMove(!b), this.isDragging = b && o.subjectEl.classList.contains("fc-event-draggable");
    }, this.handleDragStart = (o) => {
      let a = this.component.context, l = this.eventRange, d = l.instance.instanceId;
      o.isTouch ? d !== this.component.props.eventSelection && a.dispatch({ type: "SELECT_EVENT", eventInstanceId: d }) : a.dispatch({ type: "UNSELECT_EVENT" }), this.isDragging && (a.calendarApi.unselect(o), a.emitter.trigger("eventDragStart", {
        el: this.subjectEl,
        event: new N(a, l.def, l.instance),
        jsEvent: o.origEvent,
        view: a.viewApi
      }));
    }, this.handleHitUpdate = (o, a) => {
      if (!this.isDragging)
        return;
      let l = this.relevantEvents, d = this.hitDragging.initialHit, c = this.component.context, h = null, f = null, u = null, g = !1, m = {
        affectedEvents: l,
        mutatedEvents: j(),
        isEvent: !0
      };
      if (o) {
        h = o.context;
        let b = h.options;
        c === h || b.editable && b.droppable ? (f = sp(d, o, this.eventRange.instance.range.start, h.getCurrentData().pluginHooks.eventDragMutationMassagers), f && (u = wr(l, h.getCurrentData().eventUiBases, f, h), m.mutatedEvents = u, No(m, o.dateProfile, h) || (g = !0, f = null, u = null, m.mutatedEvents = j()))) : h = null;
      }
      this.displayDrag(h, m), g ? or() : ar(), a || (c === h && // TODO: write test for this
      cn(d, o) && (f = null), this.dragging.setMirrorNeedsRevert(!f), this.dragging.setMirrorIsVisible(!o || !this.subjectEl.getRootNode().querySelector(".fc-event-mirror")), this.receivingContext = h, this.validMutation = f, this.mutatedRelevantEvents = u);
    }, this.handlePointerUp = () => {
      this.isDragging || this.cleanup();
    }, this.handleDragEnd = (o) => {
      if (this.isDragging) {
        let a = this.component.context, l = a.viewApi, { receivingContext: d, validMutation: c } = this, h = this.eventRange.def, f = this.eventRange.instance, u = new N(a, h, f), g = this.relevantEvents, m = this.mutatedRelevantEvents, { finalHit: b } = this.hitDragging;
        if (this.clearDrag(), a.emitter.trigger("eventDragStop", {
          el: this.subjectEl,
          event: u,
          jsEvent: o.origEvent,
          view: l
        }), c) {
          if (d === a) {
            let y = new N(a, m.defs[h.defId], f ? m.instances[f.instanceId] : null);
            a.dispatch({
              type: "MERGE_EVENTS",
              eventStore: m
            });
            let E = {
              oldEvent: u,
              event: y,
              relatedEvents: De(m, a, f),
              revert() {
                a.dispatch({
                  type: "MERGE_EVENTS",
                  eventStore: g
                  // the pre-change data
                });
              }
            }, D = {};
            for (let C of a.getCurrentData().pluginHooks.eventDropTransformers)
              Object.assign(D, C(c, a));
            a.emitter.trigger("eventDrop", Object.assign(Object.assign(Object.assign({}, E), D), { el: o.subjectEl, delta: c.datesDelta, jsEvent: o.origEvent, view: l })), a.emitter.trigger("eventChange", E);
          } else if (d) {
            let y = {
              event: u,
              relatedEvents: De(g, a, f),
              revert() {
                a.dispatch({
                  type: "MERGE_EVENTS",
                  eventStore: g
                });
              }
            };
            a.emitter.trigger("eventLeave", Object.assign(Object.assign({}, y), { draggedEl: o.subjectEl, view: l })), a.dispatch({
              type: "REMOVE_EVENTS",
              eventStore: g
            }), a.emitter.trigger("eventRemove", y);
            let E = m.defs[h.defId], D = m.instances[f.instanceId], C = new N(d, E, D);
            d.dispatch({
              type: "MERGE_EVENTS",
              eventStore: m
            });
            let P = {
              event: C,
              relatedEvents: De(m, d, D),
              revert() {
                d.dispatch({
                  type: "REMOVE_EVENTS",
                  eventStore: m
                });
              }
            };
            d.emitter.trigger("eventAdd", P), o.isTouch && d.dispatch({
              type: "SELECT_EVENT",
              eventInstanceId: f.instanceId
            }), d.emitter.trigger("drop", Object.assign(Object.assign({}, da(b.dateSpan, d)), { draggedEl: o.subjectEl, jsEvent: o.origEvent, view: b.context.viewApi })), d.emitter.trigger("eventReceive", Object.assign(Object.assign({}, P), { draggedEl: o.subjectEl, view: b.context.viewApi }));
          }
        } else
          a.emitter.trigger("_noEventDrop");
      }
      this.cleanup();
    };
    let { component: n } = this, { options: r } = n.context, i = this.dragging = new ft(e.el);
    i.pointer.selector = ht.SELECTOR, i.touchScrollAllowed = !1, i.autoScroller.isEnabled = r.dragScroll;
    let s = this.hitDragging = new ln(this.dragging, zn);
    s.useSubjectCenter = e.useEventCenter, s.emitter.on("pointerdown", this.handlePointerDown), s.emitter.on("dragstart", this.handleDragStart), s.emitter.on("hitupdate", this.handleHitUpdate), s.emitter.on("pointerup", this.handlePointerUp), s.emitter.on("dragend", this.handleDragEnd);
  }
  destroy() {
    this.dragging.destroy();
  }
  // render a drag state on the next receivingCalendar
  displayDrag(e, n) {
    let r = this.component.context, i = this.receivingContext;
    i && i !== e && (i === r ? i.dispatch({
      type: "SET_EVENT_DRAG",
      state: {
        affectedEvents: n.affectedEvents,
        mutatedEvents: j(),
        isEvent: !0
      }
    }) : i.dispatch({ type: "UNSET_EVENT_DRAG" })), e && e.dispatch({ type: "SET_EVENT_DRAG", state: n });
  }
  clearDrag() {
    let e = this.component.context, { receivingContext: n } = this;
    n && n.dispatch({ type: "UNSET_EVENT_DRAG" }), e !== n && e.dispatch({ type: "UNSET_EVENT_DRAG" });
  }
  cleanup() {
    this.subjectSeg = null, this.isDragging = !1, this.eventRange = null, this.relevantEvents = null, this.receivingContext = null, this.validMutation = null, this.mutatedRelevantEvents = null;
  }
}
ht.SELECTOR = ".fc-event-draggable, .fc-event-resizable";
function sp(t, e, n, r) {
  let i = t.dateSpan, s = e.dateSpan, o = i.range.start, a = s.range.start, l = {};
  i.allDay !== s.allDay && (l.allDay = s.allDay, l.hasEnd = e.context.options.allDayMaintainDuration, s.allDay ? o = M(n) : o = n);
  let d = Pe(o, a, t.context.dateEnv, t.componentId === e.componentId ? t.largeUnit : null);
  d.milliseconds && (l.allDay = !1);
  let c = {
    datesDelta: d,
    standardProps: l
  };
  for (let h of r)
    h(c, t, e);
  return c;
}
function op(t) {
  let { options: e } = t.context, n = e.eventLongPressDelay;
  return n == null && (n = e.longPressDelay), n;
}
class ap extends Ye {
  constructor(e) {
    super(e), this.draggingSegEl = null, this.draggingSeg = null, this.eventRange = null, this.relevantEvents = null, this.validMutation = null, this.mutatedRelevantEvents = null, this.handlePointerDown = (s) => {
      let { component: o } = this, a = this.querySegEl(s), l = Ge(a), d = this.eventRange = l.eventRange;
      this.dragging.minDistance = o.context.options.eventDragMinDistance, this.dragging.setIgnoreMove(!this.component.isValidSegDownEl(s.origEvent.target) || s.isTouch && this.component.props.eventSelection !== d.instance.instanceId);
    }, this.handleDragStart = (s) => {
      let { context: o } = this.component, a = this.eventRange;
      this.relevantEvents = br(o.getCurrentData().eventStore, this.eventRange.instance.instanceId);
      let l = this.querySegEl(s);
      this.draggingSegEl = l, this.draggingSeg = Ge(l), o.calendarApi.unselect(), o.emitter.trigger("eventResizeStart", {
        el: l,
        event: new N(o, a.def, a.instance),
        jsEvent: s.origEvent,
        view: o.viewApi
      });
    }, this.handleHitUpdate = (s, o, a) => {
      let { context: l } = this.component, d = this.relevantEvents, c = this.hitDragging.initialHit, h = this.eventRange.instance, f = null, u = null, g = !1, m = {
        affectedEvents: d,
        mutatedEvents: j(),
        isEvent: !0
      };
      s && (s.componentId === c.componentId && this.isHitComboAllowed && !this.isHitComboAllowed(c, s) || (f = lp(c, s, a.subjectEl.classList.contains("fc-event-resizer-start"), h.range))), f && (u = wr(d, l.getCurrentData().eventUiBases, f, l), m.mutatedEvents = u, No(m, s.dateProfile, l) || (g = !0, f = null, u = null, m.mutatedEvents = null)), u ? l.dispatch({
        type: "SET_EVENT_RESIZE",
        state: m
      }) : l.dispatch({ type: "UNSET_EVENT_RESIZE" }), g ? or() : ar(), o || (f && cn(c, s) && (f = null), this.validMutation = f, this.mutatedRelevantEvents = u);
    }, this.handleDragEnd = (s) => {
      let { context: o } = this.component, a = this.eventRange.def, l = this.eventRange.instance, d = new N(o, a, l), c = this.relevantEvents, h = this.mutatedRelevantEvents;
      if (o.emitter.trigger("eventResizeStop", {
        el: this.draggingSegEl,
        event: d,
        jsEvent: s.origEvent,
        view: o.viewApi
      }), this.validMutation) {
        let f = new N(o, h.defs[a.defId], l ? h.instances[l.instanceId] : null);
        o.dispatch({
          type: "MERGE_EVENTS",
          eventStore: h
        });
        let u = {
          oldEvent: d,
          event: f,
          relatedEvents: De(h, o, l),
          revert() {
            o.dispatch({
              type: "MERGE_EVENTS",
              eventStore: c
              // the pre-change events
            });
          }
        };
        o.emitter.trigger("eventResize", Object.assign(Object.assign({}, u), { el: this.draggingSegEl, startDelta: this.validMutation.startDelta || _(0), endDelta: this.validMutation.endDelta || _(0), jsEvent: s.origEvent, view: o.viewApi })), o.emitter.trigger("eventChange", u);
      } else
        o.emitter.trigger("_noEventResize");
      this.draggingSeg = null, this.relevantEvents = null, this.validMutation = null;
    };
    let { component: n } = e, r = this.dragging = new ft(e.el);
    r.pointer.selector = ".fc-event-resizer", r.touchScrollAllowed = !1, r.autoScroller.isEnabled = n.context.options.dragScroll;
    let i = this.hitDragging = new ln(this.dragging, Sr(e));
    i.emitter.on("pointerdown", this.handlePointerDown), i.emitter.on("dragstart", this.handleDragStart), i.emitter.on("hitupdate", this.handleHitUpdate), i.emitter.on("dragend", this.handleDragEnd);
  }
  destroy() {
    this.dragging.destroy();
  }
  querySegEl(e) {
    return B(e.subjectEl, ".fc-event");
  }
}
function lp(t, e, n, r) {
  let i = t.context.dateEnv, s = t.dateSpan.range.start, o = e.dateSpan.range.start, a = Pe(s, o, i, t.largeUnit);
  if (n) {
    if (i.add(r.start, a) < r.end)
      return { startDelta: a };
  } else if (i.add(r.end, a) > r.start)
    return { endDelta: a };
  return null;
}
class cp {
  constructor(e) {
    this.context = e, this.isRecentPointerDateSelect = !1, this.matchesCancel = !1, this.matchesEvent = !1, this.onSelect = (r) => {
      r.jsEvent && (this.isRecentPointerDateSelect = !0);
    }, this.onDocumentPointerDown = (r) => {
      let i = this.context.options.unselectCancel, s = Fs(r.origEvent);
      this.matchesCancel = !!B(s, i), this.matchesEvent = !!B(s, ht.SELECTOR);
    }, this.onDocumentPointerUp = (r) => {
      let { context: i } = this, { documentPointer: s } = this, o = i.getCurrentData();
      if (!s.wasTouchScroll) {
        if (o.dateSelection && // an existing date selection?
        !this.isRecentPointerDateSelect) {
          let a = i.options.unselectAuto;
          a && (!a || !this.matchesCancel) && i.calendarApi.unselect(r);
        }
        o.eventSelection && // an existing event selected?
        !this.matchesEvent && i.dispatch({ type: "UNSELECT_EVENT" });
      }
      this.isRecentPointerDateSelect = !1;
    };
    let n = this.documentPointer = new oa(document);
    n.shouldIgnoreMove = !0, n.shouldWatchScroll = !1, n.emitter.on("pointerdown", this.onDocumentPointerDown), n.emitter.on("pointerup", this.onDocumentPointerUp), e.emitter.on("select", this.onSelect);
  }
  destroy() {
    this.context.emitter.off("select", this.onSelect), this.documentPointer.destroy();
  }
}
const dp = {
  fixedMirrorParent: v
}, up = {
  dateClick: v,
  eventDragStart: v,
  eventDragStop: v,
  eventDrop: v,
  eventResizeStart: v,
  eventResizeStop: v,
  eventResize: v,
  drop: v,
  eventReceive: v,
  eventLeave: v
};
xr.dataAttrPrefix = "";
var fp = se({
  name: "@fullcalendar/interaction",
  componentInteractions: [tp, np, ht, ap],
  calendarInteractions: [cp],
  elementDraggingImpl: ft,
  optionRefiners: dp,
  listenerRefiners: up
});
class hp extends ou {
  getKeyInfo() {
    return {
      allDay: {},
      timed: {}
    };
  }
  getKeysForDateSpan(e) {
    return e.allDay ? ["allDay"] : ["timed"];
  }
  getKeysForEventDef(e) {
    return e.allDay ? $d(e) ? ["timed", "allDay"] : ["allDay"] : ["timed"];
  }
}
const pp = O({
  hour: "numeric",
  minute: "2-digit",
  omitZeroMinute: !0,
  meridiem: "short"
});
function ua(t) {
  let e = [
    "fc-timegrid-slot",
    "fc-timegrid-slot-label",
    t.isLabeled ? "fc-scrollgrid-shrink" : "fc-timegrid-slot-minor"
  ];
  return p(ie.Consumer, null, (n) => {
    if (!t.isLabeled)
      return p("td", { className: e.join(" "), "data-time": t.isoTimeStr });
    let { dateEnv: r, options: i, viewApi: s } = n, o = (
      // TODO: fully pre-parse
      i.slotLabelFormat == null ? pp : Array.isArray(i.slotLabelFormat) ? O(i.slotLabelFormat[0]) : O(i.slotLabelFormat)
    ), a = {
      level: 0,
      time: t.time,
      date: r.toDate(t.date),
      view: s,
      text: r.format(t.date, o)
    };
    return p(W, { elTag: "td", elClasses: e, elAttrs: {
      "data-time": t.isoTimeStr
    }, renderProps: a, generatorName: "slotLabelContent", customGenerator: i.slotLabelContent, defaultGenerator: gp, classNameGenerator: i.slotLabelClassNames, didMount: i.slotLabelDidMount, willUnmount: i.slotLabelWillUnmount }, (l) => p(
      "div",
      { className: "fc-timegrid-slot-label-frame fc-scrollgrid-shrink-frame" },
      p(l, { elTag: "div", elClasses: [
        "fc-timegrid-slot-label-cushion",
        "fc-scrollgrid-shrink-cushion"
      ] })
    ));
  });
}
function gp(t) {
  return t.text;
}
class mp extends R {
  render() {
    return this.props.slatMetas.map((e) => p(
      "tr",
      { key: e.key },
      p(ua, Object.assign({}, e))
    ));
  }
}
const vp = O({ week: "short" }), bp = 5;
class yp extends J {
  constructor() {
    super(...arguments), this.allDaySplitter = new hp(), this.headerElRef = L(), this.rootElRef = L(), this.scrollerElRef = L(), this.state = {
      slatCoords: null
    }, this.handleScrollTopRequest = (e) => {
      let n = this.scrollerElRef.current;
      n && (n.scrollTop = e);
    }, this.renderHeadAxis = (e, n = "") => {
      let { options: r } = this.context, { dateProfile: i } = this.props, s = i.renderRange, a = Me(s.start, s.end) === 1 ? Vt(this.context, s.start, "week") : {};
      return r.weekNumbers && e === "day" ? p(zo, { elTag: "th", elClasses: [
        "fc-timegrid-axis",
        "fc-scrollgrid-shrink"
      ], elAttrs: {
        "aria-hidden": !0
      }, date: s.start, defaultFormat: vp }, (l) => p(
        "div",
        { className: [
          "fc-timegrid-axis-frame",
          "fc-scrollgrid-shrink-frame",
          "fc-timegrid-axis-frame-liquid"
        ].join(" "), style: { height: n } },
        p(l, { elTag: "a", elClasses: [
          "fc-timegrid-axis-cushion",
          "fc-scrollgrid-shrink-cushion",
          "fc-scrollgrid-sync-inner"
        ], elAttrs: a })
      )) : p(
        "th",
        { "aria-hidden": !0, className: "fc-timegrid-axis" },
        p("div", { className: "fc-timegrid-axis-frame", style: { height: n } })
      );
    }, this.renderTableRowAxis = (e) => {
      let { options: n, viewApi: r } = this.context, i = {
        text: n.allDayText,
        view: r
      };
      return (
        // TODO: make reusable hook. used in list view too
        p(W, { elTag: "td", elClasses: [
          "fc-timegrid-axis",
          "fc-scrollgrid-shrink"
        ], elAttrs: {
          "aria-hidden": !0
        }, renderProps: i, generatorName: "allDayContent", customGenerator: n.allDayContent, defaultGenerator: Ep, classNameGenerator: n.allDayClassNames, didMount: n.allDayDidMount, willUnmount: n.allDayWillUnmount }, (s) => p(
          "div",
          { className: [
            "fc-timegrid-axis-frame",
            "fc-scrollgrid-shrink-frame",
            e == null ? " fc-timegrid-axis-frame-liquid" : ""
          ].join(" "), style: { height: e } },
          p(s, { elTag: "span", elClasses: [
            "fc-timegrid-axis-cushion",
            "fc-scrollgrid-shrink-cushion",
            "fc-scrollgrid-sync-inner"
          ] })
        ))
      );
    }, this.handleSlatCoords = (e) => {
      this.setState({ slatCoords: e });
    };
  }
  // rendering
  // ----------------------------------------------------------------------------------------------------
  renderSimpleLayout(e, n, r) {
    let { context: i, props: s } = this, o = [], a = Gt(i.options);
    return e && o.push({
      type: "header",
      key: "header",
      isSticky: a,
      chunk: {
        elRef: this.headerElRef,
        tableClassName: "fc-col-header",
        rowContent: e
      }
    }), n && (o.push({
      type: "body",
      key: "all-day",
      chunk: { content: n }
    }), o.push({
      type: "body",
      key: "all-day-divider",
      outerContent: (
        // TODO: rename to cellContent so don't need to define <tr>?
        p(
          "tr",
          { role: "presentation", className: "fc-scrollgrid-section" },
          p("td", { className: "fc-timegrid-divider " + i.theme.getClass("tableCellShaded") })
        )
      )
    })), o.push({
      type: "body",
      key: "body",
      liquid: !0,
      expandRows: !!i.options.expandRows,
      chunk: {
        scrollerElRef: this.scrollerElRef,
        content: r
      }
    }), p(
      Ut,
      { elRef: this.rootElRef, elClasses: ["fc-timegrid"], viewSpec: i.viewSpec },
      p(Rr, { liquid: !s.isHeightAuto && !s.forPrint, collapsibleWidth: s.forPrint, cols: [{ width: "shrink" }], sections: o })
    );
  }
  renderHScrollLayout(e, n, r, i, s, o, a) {
    let l = this.context.pluginHooks.scrollGridImpl;
    if (!l)
      throw new Error("No ScrollGrid implementation");
    let { context: d, props: c } = this, h = !c.forPrint && Gt(d.options), f = !c.forPrint && Ho(d.options), u = [];
    e && u.push({
      type: "header",
      key: "header",
      isSticky: h,
      syncRowHeights: !0,
      chunks: [
        {
          key: "axis",
          rowContent: (m) => p("tr", { role: "presentation" }, this.renderHeadAxis("day", m.rowSyncHeights[0]))
        },
        {
          key: "cols",
          elRef: this.headerElRef,
          tableClassName: "fc-col-header",
          rowContent: e
        }
      ]
    }), n && (u.push({
      type: "body",
      key: "all-day",
      syncRowHeights: !0,
      chunks: [
        {
          key: "axis",
          rowContent: (m) => p("tr", { role: "presentation" }, this.renderTableRowAxis(m.rowSyncHeights[0]))
        },
        {
          key: "cols",
          content: n
        }
      ]
    }), u.push({
      key: "all-day-divider",
      type: "body",
      outerContent: (
        // TODO: rename to cellContent so don't need to define <tr>?
        p(
          "tr",
          { role: "presentation", className: "fc-scrollgrid-section" },
          p("td", { colSpan: 2, className: "fc-timegrid-divider " + d.theme.getClass("tableCellShaded") })
        )
      )
    }));
    let g = d.options.nowIndicator;
    return u.push({
      type: "body",
      key: "body",
      liquid: !0,
      expandRows: !!d.options.expandRows,
      chunks: [
        {
          key: "axis",
          content: (m) => (
            // TODO: make this now-indicator arrow more DRY with TimeColsContent
            p(
              "div",
              { className: "fc-timegrid-axis-chunk" },
              p(
                "table",
                { "aria-hidden": !0, style: { height: m.expandRows ? m.clientHeight : "" } },
                m.tableColGroupNode,
                p(
                  "tbody",
                  null,
                  p(mp, { slatMetas: o })
                )
              ),
              p(
                "div",
                { className: "fc-timegrid-now-indicator-container" },
                p(Qe, {
                  unit: g ? "minute" : "day"
                  /* hacky */
                }, (b) => {
                  let y = g && a && a.safeComputeTop(b);
                  return typeof y == "number" ? p(Mr, { elClasses: ["fc-timegrid-now-indicator-arrow"], elStyle: { top: y }, isAxis: !0, date: b }) : null;
                })
              )
            )
          )
        },
        {
          key: "cols",
          scrollerElRef: this.scrollerElRef,
          content: r
        }
      ]
    }), f && u.push({
      key: "footer",
      type: "footer",
      isSticky: !0,
      chunks: [
        {
          key: "axis",
          content: jn
        },
        {
          key: "cols",
          content: jn
        }
      ]
    }), p(
      Ut,
      { elRef: this.rootElRef, elClasses: ["fc-timegrid"], viewSpec: d.viewSpec },
      p(l, { liquid: !c.isHeightAuto && !c.forPrint, forPrint: c.forPrint, collapsibleWidth: !1, colGroups: [
        { width: "shrink", cols: [{ width: "shrink" }] },
        { cols: [{ span: i, minWidth: s }] }
      ], sections: u })
    );
  }
  /* Dimensions
  ------------------------------------------------------------------------------------------------------------------*/
  getAllDayMaxEventProps() {
    let { dayMaxEvents: e, dayMaxEventRows: n } = this.context.options;
    return (e === !0 || n === !0) && (e = void 0, n = bp), { dayMaxEvents: e, dayMaxEventRows: n };
  }
}
function Ep(t) {
  return t.text;
}
class wp {
  constructor(e, n, r) {
    this.positions = e, this.dateProfile = n, this.slotDuration = r;
  }
  safeComputeTop(e) {
    let { dateProfile: n } = this;
    if (ne(n.currentRange, e)) {
      let r = M(e), i = e.valueOf() - r.valueOf();
      if (i >= G(n.slotMinTime) && i < G(n.slotMaxTime))
        return this.computeTimeTop(_(i));
    }
    return null;
  }
  // Computes the top coordinate, relative to the bounds of the grid, of the given date.
  // A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
  computeDateTop(e, n) {
    return n || (n = M(e)), this.computeTimeTop(_(e.valueOf() - n.valueOf()));
  }
  // Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
  // This is a makeshify way to compute the time-top. Assumes all slatMetas dates are uniform.
  // Eventually allow computation with arbirary slat dates.
  computeTimeTop(e) {
    let { positions: n, dateProfile: r } = this, i = n.els.length, s = (e.milliseconds - G(r.slotMinTime)) / G(this.slotDuration), o, a;
    return s = Math.max(0, s), s = Math.min(i, s), o = Math.floor(s), o = Math.min(o, i - 1), a = s - o, n.tops[o] + n.getHeight(o) * a;
  }
}
class Sp extends R {
  render() {
    let { props: e, context: n } = this, { options: r } = n, { slatElRefs: i } = e;
    return p("tbody", null, e.slatMetas.map((s, o) => {
      let a = {
        time: s.time,
        date: n.dateEnv.toDate(s.date),
        view: n.viewApi
      };
      return p(
        "tr",
        { key: s.key, ref: i.createRef(s.key) },
        e.axis && p(ua, Object.assign({}, s)),
        p(W, { elTag: "td", elClasses: [
          "fc-timegrid-slot",
          "fc-timegrid-slot-lane",
          !s.isLabeled && "fc-timegrid-slot-minor"
        ], elAttrs: {
          "data-time": s.isoTimeStr
        }, renderProps: a, generatorName: "slotLaneContent", customGenerator: r.slotLaneContent, classNameGenerator: r.slotLaneClassNames, didMount: r.slotLaneDidMount, willUnmount: r.slotLaneWillUnmount })
      );
    }));
  }
}
class Ap extends R {
  constructor() {
    super(...arguments), this.rootElRef = L(), this.slatElRefs = new ee();
  }
  render() {
    let { props: e, context: n } = this;
    return p(
      "div",
      { ref: this.rootElRef, className: "fc-timegrid-slots" },
      p(
        "table",
        { "aria-hidden": !0, className: n.theme.getClass("table"), style: {
          minWidth: e.tableMinWidth,
          width: e.clientWidth,
          height: e.minHeight
        } },
        e.tableColGroupNode,
        p(Sp, { slatElRefs: this.slatElRefs, axis: e.axis, slatMetas: e.slatMetas })
      )
    );
  }
  componentDidMount() {
    this.updateSizing();
  }
  componentDidUpdate() {
    this.updateSizing();
  }
  componentWillUnmount() {
    this.props.onCoords && this.props.onCoords(null);
  }
  updateSizing() {
    let { context: e, props: n } = this;
    n.onCoords && n.clientWidth !== null && this.rootElRef.current.offsetHeight && n.onCoords(new wp(new qe(this.rootElRef.current, Dp(this.slatElRefs.currentMap, n.slatMetas), !1, !0), this.props.dateProfile, e.options.slotDuration));
  }
}
function Dp(t, e) {
  return e.map((n) => t[n.key]);
}
function et(t, e) {
  let n = [], r;
  for (r = 0; r < e; r += 1)
    n.push([]);
  if (t)
    for (r = 0; r < t.length; r += 1)
      n[t[r].col].push(t[r]);
  return n;
}
function Vi(t, e) {
  let n = [];
  if (t) {
    for (let r = 0; r < e; r += 1)
      n[r] = {
        affectedInstances: t.affectedInstances,
        isEvent: t.isEvent,
        segs: []
      };
    for (let r of t.segs)
      n[r.col].segs.push(r);
  } else
    for (let r = 0; r < e; r += 1)
      n[r] = null;
  return n;
}
class Cp extends R {
  render() {
    let { props: e } = this;
    return p(Uo, { elClasses: ["fc-timegrid-more-link"], elStyle: {
      top: e.top,
      bottom: e.bottom
    }, allDayDate: null, moreCnt: e.hiddenSegs.length, allSegs: e.hiddenSegs, hiddenSegs: e.hiddenSegs, extraDateSpan: e.extraDateSpan, dateProfile: e.dateProfile, todayRange: e.todayRange, popoverContent: () => ha(e.hiddenSegs, e), defaultGenerator: _p, forceTimed: !0 }, (n) => p(n, { elTag: "div", elClasses: ["fc-timegrid-more-link-inner", "fc-sticky"] }));
  }
}
function _p(t) {
  return t.shortText;
}
function xp(t, e, n) {
  let r = new _o();
  e != null && (r.strictOrder = e), n != null && (r.maxStackCnt = n);
  let i = r.addSegs(t), s = yu(i), o = Rp(r);
  return o = Ip(o, 1), { segRects: Np(o), hiddenGroups: s };
}
function Rp(t) {
  const { entriesByLevel: e } = t, n = Pr((r, i) => r + ":" + i, (r, i) => {
    let s = Mp(t, r, i), o = Gi(s, n), a = e[r][i];
    return [
      Object.assign(Object.assign({}, a), { nextLevelNodes: o[0] }),
      a.thickness + o[1]
      // the pressure builds
    ];
  });
  return Gi(e.length ? { level: 0, lateralStart: 0, lateralEnd: e[0].length } : null, n)[0];
}
function Gi(t, e) {
  if (!t)
    return [[], 0];
  let { level: n, lateralStart: r, lateralEnd: i } = t, s = r, o = [];
  for (; s < i; )
    o.push(e(n, s)), s += 1;
  return o.sort(Tp), [
    o.map(kp),
    o[0][1]
    // first item's pressure
  ];
}
function Tp(t, e) {
  return e[1] - t[1];
}
function kp(t) {
  return t[0];
}
function Mp(t, e, n) {
  let { levelCoords: r, entriesByLevel: i } = t, s = i[e][n], o = r[e] + s.thickness, a = r.length, l = e;
  for (; l < a && r[l] < o; l += 1)
    ;
  for (; l < a; l += 1) {
    let d = i[l], c, h = Fn(d, s.span.start, Un), f = h[0] + h[1], u = f;
    for (
      ;
      // loop through entries that horizontally intersect
      (c = d[u]) && // but not past the whole seg list
      c.span.start < s.span.end;
    )
      u += 1;
    if (f < u)
      return { level: l, lateralStart: f, lateralEnd: u };
  }
  return null;
}
function Ip(t, e) {
  const n = Pr((r, i, s) => Ce(r), (r, i, s) => {
    let { nextLevelNodes: o, thickness: a } = r, l = a + s, d = a / l, c, h = [];
    if (!o.length)
      c = e;
    else
      for (let u of o)
        if (c === void 0) {
          let g = n(u, i, l);
          c = g[0], h.push(g[1]);
        } else {
          let g = n(u, c, 0);
          h.push(g[1]);
        }
    let f = (c - i) * d;
    return [c - f, Object.assign(Object.assign({}, r), { thickness: f, nextLevelNodes: h })];
  });
  return t.map((r) => n(r, 0, 0)[1]);
}
function Np(t) {
  let e = [];
  const n = Pr((i, s, o) => Ce(i), (i, s, o) => {
    let a = Object.assign(Object.assign({}, i), {
      levelCoord: s,
      stackDepth: o,
      stackForward: 0
    });
    return e.push(a), a.stackForward = r(i.nextLevelNodes, s + i.thickness, o + 1) + 1;
  });
  function r(i, s, o) {
    let a = 0;
    for (let l of i)
      a = Math.max(n(l, s, o), a);
    return a;
  }
  return r(t, 0, 0), e;
}
function Pr(t, e) {
  const n = {};
  return (...r) => {
    let i = t(...r);
    return i in n ? n[i] : n[i] = e(...r);
  };
}
function qi(t, e, n = null, r = 0) {
  let i = [];
  if (n)
    for (let s = 0; s < t.length; s += 1) {
      let o = t[s], a = n.computeDateTop(o.start, e), l = Math.max(
        a + (r || 0),
        // :(
        n.computeDateTop(o.end, e)
      );
      i.push({
        start: Math.round(a),
        end: Math.round(l)
        //
      });
    }
  return i;
}
function Op(t, e, n, r) {
  let i = [], s = [];
  for (let d = 0; d < t.length; d += 1) {
    let c = e[d];
    c ? i.push({
      index: d,
      thickness: 1,
      span: c
    }) : s.push(t[d]);
  }
  let { segRects: o, hiddenGroups: a } = xp(i, n, r), l = [];
  for (let d of o)
    l.push({
      seg: t[d.index],
      rect: d
    });
  for (let d of s)
    l.push({ seg: d, rect: null });
  return { segPlacements: l, hiddenGroups: a };
}
const Pp = O({
  hour: "numeric",
  minute: "2-digit",
  meridiem: !1
});
class fa extends R {
  render() {
    return p(kr, Object.assign({}, this.props, { elClasses: [
      "fc-timegrid-event",
      "fc-v-event",
      this.props.isShort && "fc-timegrid-event-short"
    ], defaultTimeFormat: Pp }));
  }
}
class $p extends R {
  constructor() {
    super(...arguments), this.sortEventSegs = A(go);
  }
  // TODO: memoize event-placement?
  render() {
    let { props: e, context: n } = this, { options: r } = n, i = r.selectMirror, s = (
      // yuck
      e.eventDrag && e.eventDrag.segs || e.eventResize && e.eventResize.segs || i && e.dateSelectionSegs || []
    ), o = (
      // TODO: messy way to compute this
      e.eventDrag && e.eventDrag.affectedInstances || e.eventResize && e.eventResize.affectedInstances || {}
    ), a = this.sortEventSegs(e.fgEventSegs, r.eventOrder);
    return p(Ir, { elTag: "td", elRef: e.elRef, elClasses: [
      "fc-timegrid-col",
      ...e.extraClassNames || []
    ], elAttrs: Object.assign({ role: "gridcell" }, e.extraDataAttrs), date: e.date, dateProfile: e.dateProfile, todayRange: e.todayRange, extraRenderProps: e.extraRenderProps }, (l) => p(
      "div",
      { className: "fc-timegrid-col-frame" },
      p(
        "div",
        { className: "fc-timegrid-col-bg" },
        this.renderFillSegs(e.businessHourSegs, "non-business"),
        this.renderFillSegs(e.bgEventSegs, "bg-event"),
        this.renderFillSegs(e.dateSelectionSegs, "highlight")
      ),
      p("div", { className: "fc-timegrid-col-events" }, this.renderFgSegs(a, o, !1, !1, !1)),
      p("div", { className: "fc-timegrid-col-events" }, this.renderFgSegs(s, {}, !!e.eventDrag, !!e.eventResize, !!i, "mirror")),
      p("div", { className: "fc-timegrid-now-indicator-container" }, this.renderNowIndicator(e.nowIndicatorSegs)),
      Nr(r) && p(l, { elTag: "div", elClasses: ["fc-timegrid-col-misc"] })
    ));
  }
  renderFgSegs(e, n, r, i, s, o) {
    let { props: a } = this;
    return a.forPrint ? ha(e, a) : this.renderPositionedFgSegs(e, n, r, i, s, o);
  }
  renderPositionedFgSegs(e, n, r, i, s, o) {
    let { eventMaxStack: a, eventShortHeight: l, eventOrderStrict: d, eventMinHeight: c } = this.context.options, { date: h, slatCoords: f, eventSelection: u, todayRange: g, nowDate: m } = this.props, b = r || i || s, y = qi(e, h, f, c), { segPlacements: E, hiddenGroups: D } = Op(e, y, d, a);
    return p(
      k,
      null,
      this.renderHiddenGroups(D, e),
      E.map((C) => {
        let { seg: P, rect: T } = C, I = P.eventRange.instance.instanceId, x = b || !!(!n[I] && T), oe = Rn(T && T.span), Xe = !b && T ? this.computeSegHStyle(T) : { left: 0, right: 0 }, Ca = !!T && T.stackForward > 0, _a = !!T && T.span.end - T.span.start < l;
        return p(
          "div",
          { className: "fc-timegrid-event-harness" + (Ca ? " fc-timegrid-event-harness-inset" : ""), key: o || I, style: Object.assign(Object.assign({ visibility: x ? "" : "hidden" }, oe), Xe) },
          p(fa, Object.assign({ seg: P, isDragging: r, isResizing: i, isDateSelecting: s, isSelected: I === u, isShort: _a }, ue(P, g, m)))
        );
      })
    );
  }
  // will already have eventMinHeight applied because segInputs already had it
  renderHiddenGroups(e, n) {
    let { extraDateSpan: r, dateProfile: i, todayRange: s, nowDate: o, eventSelection: a, eventDrag: l, eventResize: d } = this.props;
    return p(k, null, e.map((c) => {
      let h = Rn(c.span), f = Hp(c.entries, n);
      return p(Cp, { key: qs(Fo(f)), hiddenSegs: f, top: h.top, bottom: h.bottom, extraDateSpan: r, dateProfile: i, todayRange: s, nowDate: o, eventSelection: a, eventDrag: l, eventResize: d });
    }));
  }
  renderFillSegs(e, n) {
    let { props: r, context: i } = this, o = qi(e, r.date, r.slatCoords, i.options.eventMinHeight).map((a, l) => {
      let d = e[l];
      return p("div", { key: vo(d.eventRange), className: "fc-timegrid-bg-harness", style: Rn(a) }, n === "bg-event" ? p(Bo, Object.assign({ seg: d }, ue(d, r.todayRange, r.nowDate))) : Lo(n));
    });
    return p(k, null, o);
  }
  renderNowIndicator(e) {
    let { slatCoords: n, date: r } = this.props;
    return n ? e.map((i, s) => p(
      Mr,
      {
        // key doesn't matter. will only ever be one
        key: s,
        elClasses: ["fc-timegrid-now-indicator-line"],
        elStyle: {
          top: n.computeDateTop(i.start, r)
        },
        isAxis: !1,
        date: r
      }
    )) : null;
  }
  computeSegHStyle(e) {
    let { isRtl: n, options: r } = this.context, i = r.slotEventOverlap, s = e.levelCoord, o = e.levelCoord + e.thickness, a, l;
    i && (o = Math.min(1, s + (o - s) * 2)), n ? (a = 1 - o, l = s) : (a = s, l = 1 - o);
    let d = {
      zIndex: e.stackDepth + 1,
      left: a * 100 + "%",
      right: l * 100 + "%"
    };
    return i && !e.stackForward && (d[n ? "marginLeft" : "marginRight"] = 20), d;
  }
}
function ha(t, { todayRange: e, nowDate: n, eventSelection: r, eventDrag: i, eventResize: s }) {
  let o = (i ? i.affectedInstances : null) || (s ? s.affectedInstances : null) || {};
  return p(k, null, t.map((a) => {
    let l = a.eventRange.instance.instanceId;
    return p(
      "div",
      { key: l, style: { visibility: o[l] ? "hidden" : "" } },
      p(fa, Object.assign({ seg: a, isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: l === r, isShort: !1 }, ue(a, e, n)))
    );
  }));
}
function Rn(t) {
  return t ? {
    top: t.start,
    bottom: -t.end
  } : { top: "", bottom: "" };
}
function Hp(t, e) {
  return t.map((n) => e[n.index]);
}
class Bp extends R {
  constructor() {
    super(...arguments), this.splitFgEventSegs = A(et), this.splitBgEventSegs = A(et), this.splitBusinessHourSegs = A(et), this.splitNowIndicatorSegs = A(et), this.splitDateSelectionSegs = A(et), this.splitEventDrag = A(Vi), this.splitEventResize = A(Vi), this.rootElRef = L(), this.cellElRefs = new ee();
  }
  render() {
    let { props: e, context: n } = this, r = n.options.nowIndicator && e.slatCoords && e.slatCoords.safeComputeTop(e.nowDate), i = e.cells.length, s = this.splitFgEventSegs(e.fgEventSegs, i), o = this.splitBgEventSegs(e.bgEventSegs, i), a = this.splitBusinessHourSegs(e.businessHourSegs, i), l = this.splitNowIndicatorSegs(e.nowIndicatorSegs, i), d = this.splitDateSelectionSegs(e.dateSelectionSegs, i), c = this.splitEventDrag(e.eventDrag, i), h = this.splitEventResize(e.eventResize, i);
    return p(
      "div",
      { className: "fc-timegrid-cols", ref: this.rootElRef },
      p(
        "table",
        { role: "presentation", style: {
          minWidth: e.tableMinWidth,
          width: e.clientWidth
        } },
        e.tableColGroupNode,
        p(
          "tbody",
          { role: "presentation" },
          p(
            "tr",
            { role: "row" },
            e.axis && p(
              "td",
              { "aria-hidden": !0, className: "fc-timegrid-col fc-timegrid-axis" },
              p(
                "div",
                { className: "fc-timegrid-col-frame" },
                p("div", { className: "fc-timegrid-now-indicator-container" }, typeof r == "number" && p(Mr, { elClasses: ["fc-timegrid-now-indicator-arrow"], elStyle: { top: r }, isAxis: !0, date: e.nowDate }))
              )
            ),
            e.cells.map((f, u) => p($p, { key: f.key, elRef: this.cellElRefs.createRef(f.key), dateProfile: e.dateProfile, date: f.date, nowDate: e.nowDate, todayRange: e.todayRange, extraRenderProps: f.extraRenderProps, extraDataAttrs: f.extraDataAttrs, extraClassNames: f.extraClassNames, extraDateSpan: f.extraDateSpan, fgEventSegs: s[u], bgEventSegs: o[u], businessHourSegs: a[u], nowIndicatorSegs: l[u], dateSelectionSegs: d[u], eventDrag: c[u], eventResize: h[u], slatCoords: e.slatCoords, eventSelection: e.eventSelection, forPrint: e.forPrint }))
          )
        )
      )
    );
  }
  componentDidMount() {
    this.updateCoords();
  }
  componentDidUpdate() {
    this.updateCoords();
  }
  updateCoords() {
    let { props: e } = this;
    e.onColCoords && e.clientWidth !== null && e.onColCoords(new qe(
      this.rootElRef.current,
      Lp(this.cellElRefs.currentMap, e.cells),
      !0,
      // horizontal
      !1
    ));
  }
}
function Lp(t, e) {
  return e.map((n) => t[n.key]);
}
class zp extends J {
  constructor() {
    super(...arguments), this.processSlotOptions = A(Up), this.state = {
      slatCoords: null
    }, this.handleRootEl = (e) => {
      e ? this.context.registerInteractiveComponent(this, {
        el: e,
        isHitComboAllowed: this.props.isHitComboAllowed
      }) : this.context.unregisterInteractiveComponent(this);
    }, this.handleScrollRequest = (e) => {
      let { onScrollTopRequest: n } = this.props, { slatCoords: r } = this.state;
      if (n && r) {
        if (e.time) {
          let i = r.computeTimeTop(e.time);
          i = Math.ceil(i), i && (i += 1), n(i);
        }
        return !0;
      }
      return !1;
    }, this.handleColCoords = (e) => {
      this.colCoords = e;
    }, this.handleSlatCoords = (e) => {
      this.setState({ slatCoords: e }), this.props.onSlatCoords && this.props.onSlatCoords(e);
    };
  }
  render() {
    let { props: e, state: n } = this;
    return p(
      "div",
      { className: "fc-timegrid-body", ref: this.handleRootEl, style: {
        // these props are important to give this wrapper correct dimensions for interactions
        // TODO: if we set it here, can we avoid giving to inner tables?
        width: e.clientWidth,
        minWidth: e.tableMinWidth
      } },
      p(Ap, { axis: e.axis, dateProfile: e.dateProfile, slatMetas: e.slatMetas, clientWidth: e.clientWidth, minHeight: e.expandRows ? e.clientHeight : "", tableMinWidth: e.tableMinWidth, tableColGroupNode: e.axis ? e.tableColGroupNode : null, onCoords: this.handleSlatCoords }),
      p(Bp, { cells: e.cells, axis: e.axis, dateProfile: e.dateProfile, businessHourSegs: e.businessHourSegs, bgEventSegs: e.bgEventSegs, fgEventSegs: e.fgEventSegs, dateSelectionSegs: e.dateSelectionSegs, eventSelection: e.eventSelection, eventDrag: e.eventDrag, eventResize: e.eventResize, todayRange: e.todayRange, nowDate: e.nowDate, nowIndicatorSegs: e.nowIndicatorSegs, clientWidth: e.clientWidth, tableMinWidth: e.tableMinWidth, tableColGroupNode: e.tableColGroupNode, slatCoords: n.slatCoords, onColCoords: this.handleColCoords, forPrint: e.forPrint })
    );
  }
  componentDidMount() {
    this.scrollResponder = this.context.createScrollResponder(this.handleScrollRequest);
  }
  componentDidUpdate(e) {
    this.scrollResponder.update(e.dateProfile !== this.props.dateProfile);
  }
  componentWillUnmount() {
    this.scrollResponder.detach();
  }
  queryHit(e, n) {
    let { dateEnv: r, options: i } = this.context, { colCoords: s } = this, { dateProfile: o } = this.props, { slatCoords: a } = this.state, { snapDuration: l, snapsPerSlot: d } = this.processSlotOptions(this.props.slotDuration, i.snapDuration), c = s.leftToIndex(e), h = a.positions.topToIndex(n);
    if (c != null && h != null) {
      let f = this.props.cells[c], u = a.positions.tops[h], g = a.positions.getHeight(h), m = (n - u) / g, b = Math.floor(m * d), y = h * d + b, E = this.props.cells[c].date, D = Pn(o.slotMinTime, lc(l, y)), C = r.add(E, D), P = r.add(C, l);
      return {
        dateProfile: o,
        dateSpan: Object.assign({ range: { start: C, end: P }, allDay: !1 }, f.extraDateSpan),
        dayEl: s.els[c],
        rect: {
          left: s.lefts[c],
          right: s.rights[c],
          top: u,
          bottom: u + g
        },
        layer: 0
      };
    }
    return null;
  }
}
function Up(t, e) {
  let n = e || t, r = lr(t, n);
  return r === null && (n = t, r = 1), { snapDuration: n, snapsPerSlot: r };
}
class Fp extends Io {
  sliceRange(e, n) {
    let r = [];
    for (let i = 0; i < n.length; i += 1) {
      let s = Re(e, n[i]);
      s && r.push({
        start: s.start,
        end: s.end,
        isStart: s.start.valueOf() === e.start.valueOf(),
        isEnd: s.end.valueOf() === e.end.valueOf(),
        col: i
      });
    }
    return r;
  }
}
class jp extends J {
  constructor() {
    super(...arguments), this.buildDayRanges = A(Wp), this.slicer = new Fp(), this.timeColsRef = L();
  }
  render() {
    let { props: e, context: n } = this, { dateProfile: r, dayTableModel: i } = e, { nowIndicator: s, nextDayThreshold: o } = n.options, a = this.buildDayRanges(i, r, n.dateEnv);
    return p(Qe, { unit: s ? "minute" : "day" }, (l, d) => p(zp, Object.assign({ ref: this.timeColsRef }, this.slicer.sliceProps(e, r, null, n, a), { forPrint: e.forPrint, axis: e.axis, dateProfile: r, slatMetas: e.slatMetas, slotDuration: e.slotDuration, cells: i.cells[0], tableColGroupNode: e.tableColGroupNode, tableMinWidth: e.tableMinWidth, clientWidth: e.clientWidth, clientHeight: e.clientHeight, expandRows: e.expandRows, nowDate: l, nowIndicatorSegs: s && this.slicer.sliceNowDate(l, r, o, n, a), todayRange: d, onScrollTopRequest: e.onScrollTopRequest, onSlatCoords: e.onSlatCoords })));
  }
}
function Wp(t, e, n) {
  let r = [];
  for (let i of t.headerDates)
    r.push({
      start: n.add(i, e.slotMinTime),
      end: n.add(i, e.slotMaxTime)
    });
  return r;
}
const Yi = [
  { hours: 1 },
  { minutes: 30 },
  { minutes: 15 },
  { seconds: 30 },
  { seconds: 15 }
];
function Vp(t, e, n, r, i) {
  let s = /* @__PURE__ */ new Date(0), o = t, a = _(0), l = n || Gp(r), d = [];
  for (; G(o) < G(e); ) {
    let c = i.add(s, o), h = lr(a, l) !== null;
    d.push({
      date: c,
      time: o,
      key: c.toISOString(),
      isoTimeStr: Dc(c),
      isLabeled: h
    }), o = Pn(o, r), a = Pn(a, r);
  }
  return d;
}
function Gp(t) {
  let e, n, r;
  for (e = Yi.length - 1; e >= 0; e -= 1)
    if (n = _(Yi[e]), r = lr(n, t), r !== null && r > 1)
      return n;
  return t;
}
class qp extends yp {
  constructor() {
    super(...arguments), this.buildTimeColsModel = A(Yp), this.buildSlatMetas = A(Vp);
  }
  render() {
    let { options: e, dateEnv: n, dateProfileGenerator: r } = this.context, { props: i } = this, { dateProfile: s } = i, o = this.buildTimeColsModel(s, r), a = this.allDaySplitter.splitProps(i), l = this.buildSlatMetas(s.slotMinTime, s.slotMaxTime, e.slotLabelInterval, e.slotDuration, n), { dayMinWidth: d } = e, c = !d, h = d, f = e.dayHeaders && p(To, { dates: o.headerDates, dateProfile: s, datesRepDistinctDays: !0, renderIntro: c ? this.renderHeadAxis : null }), u = e.allDaySlot !== !1 && ((m) => p(sa, Object.assign({}, a.allDay, { dateProfile: s, dayTableModel: o, nextDayThreshold: e.nextDayThreshold, tableMinWidth: m.tableMinWidth, colGroupNode: m.tableColGroupNode, renderRowIntro: c ? this.renderTableRowAxis : null, showWeekNumbers: !1, expandRows: !1, headerAlignElRef: this.headerElRef, clientWidth: m.clientWidth, clientHeight: m.clientHeight, forPrint: i.forPrint }, this.getAllDayMaxEventProps()))), g = (m) => p(jp, Object.assign({}, a.timed, { dayTableModel: o, dateProfile: s, axis: c, slotDuration: e.slotDuration, slatMetas: l, forPrint: i.forPrint, tableColGroupNode: m.tableColGroupNode, tableMinWidth: m.tableMinWidth, clientWidth: m.clientWidth, clientHeight: m.clientHeight, onSlatCoords: this.handleSlatCoords, expandRows: m.expandRows, onScrollTopRequest: this.handleScrollTopRequest }));
    return h ? this.renderHScrollLayout(f, u, g, o.colCnt, d, l, this.state.slatCoords) : this.renderSimpleLayout(f, u, g);
  }
}
function Yp(t, e) {
  let n = new ko(t.renderRange, e);
  return new Mo(n, !1);
}
var Qp = '.fc-v-event{background-color:var(--fc-event-bg-color);border:1px solid var(--fc-event-border-color);display:block}.fc-v-event .fc-event-main{color:var(--fc-event-text-color);height:100%}.fc-v-event .fc-event-main-frame{display:flex;flex-direction:column;height:100%}.fc-v-event .fc-event-time{flex-grow:0;flex-shrink:0;max-height:100%;overflow:hidden}.fc-v-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-height:0}.fc-v-event .fc-event-title{bottom:0;max-height:100%;overflow:hidden;top:0}.fc-v-event:not(.fc-event-start){border-top-left-radius:0;border-top-right-radius:0;border-top-width:0}.fc-v-event:not(.fc-event-end){border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-width:0}.fc-v-event.fc-event-selected:before{left:-10px;right:-10px}.fc-v-event .fc-event-resizer-start{cursor:n-resize}.fc-v-event .fc-event-resizer-end{cursor:s-resize}.fc-v-event:not(.fc-event-selected) .fc-event-resizer{height:var(--fc-event-resizer-thickness);left:0;right:0}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-start{top:calc(var(--fc-event-resizer-thickness)/-2)}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-end{bottom:calc(var(--fc-event-resizer-thickness)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer{left:50%;margin-left:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer-start{top:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer-end{bottom:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc .fc-timegrid .fc-daygrid-body{z-index:2}.fc .fc-timegrid-divider{padding:0 0 2px}.fc .fc-timegrid-body{min-height:100%;position:relative;z-index:1}.fc .fc-timegrid-axis-chunk{position:relative}.fc .fc-timegrid-axis-chunk>table,.fc .fc-timegrid-slots{position:relative;z-index:1}.fc .fc-timegrid-slot{border-bottom:0;height:1.5em}.fc .fc-timegrid-slot:empty:before{content:"\\00a0"}.fc .fc-timegrid-slot-minor{border-top-style:dotted}.fc .fc-timegrid-slot-label-cushion{display:inline-block;white-space:nowrap}.fc .fc-timegrid-slot-label{vertical-align:middle}.fc .fc-timegrid-axis-cushion,.fc .fc-timegrid-slot-label-cushion{padding:0 4px}.fc .fc-timegrid-axis-frame-liquid{height:100%}.fc .fc-timegrid-axis-frame{align-items:center;display:flex;justify-content:flex-end;overflow:hidden}.fc .fc-timegrid-axis-cushion{flex-shrink:0;max-width:60px}.fc-direction-ltr .fc-timegrid-slot-label-frame{text-align:right}.fc-direction-rtl .fc-timegrid-slot-label-frame{text-align:left}.fc-liquid-hack .fc-timegrid-axis-frame-liquid{bottom:0;height:auto;left:0;position:absolute;right:0;top:0}.fc .fc-timegrid-col.fc-day-today{background-color:var(--fc-today-bg-color)}.fc .fc-timegrid-col-frame{min-height:100%;position:relative}.fc-media-screen.fc-liquid-hack .fc-timegrid-col-frame{bottom:0;height:auto;left:0;position:absolute;right:0;top:0}.fc-media-screen .fc-timegrid-cols{bottom:0;left:0;position:absolute;right:0;top:0}.fc-media-screen .fc-timegrid-cols>table{height:100%}.fc-media-screen .fc-timegrid-col-bg,.fc-media-screen .fc-timegrid-col-events,.fc-media-screen .fc-timegrid-now-indicator-container{left:0;position:absolute;right:0;top:0}.fc .fc-timegrid-col-bg{z-index:2}.fc .fc-timegrid-col-bg .fc-non-business{z-index:1}.fc .fc-timegrid-col-bg .fc-bg-event{z-index:2}.fc .fc-timegrid-col-bg .fc-highlight{z-index:3}.fc .fc-timegrid-bg-harness{left:0;position:absolute;right:0}.fc .fc-timegrid-col-events{z-index:3}.fc .fc-timegrid-now-indicator-container{bottom:0;overflow:hidden}.fc-direction-ltr .fc-timegrid-col-events{margin:0 2.5% 0 2px}.fc-direction-rtl .fc-timegrid-col-events{margin:0 2px 0 2.5%}.fc-timegrid-event-harness{position:absolute}.fc-timegrid-event-harness>.fc-timegrid-event{bottom:0;left:0;position:absolute;right:0;top:0}.fc-timegrid-event-harness-inset .fc-timegrid-event,.fc-timegrid-event.fc-event-mirror,.fc-timegrid-more-link{box-shadow:0 0 0 1px var(--fc-page-bg-color)}.fc-timegrid-event,.fc-timegrid-more-link{border-radius:3px;font-size:var(--fc-small-font-size)}.fc-timegrid-event{margin-bottom:1px}.fc-timegrid-event .fc-event-main{padding:1px 1px 0}.fc-timegrid-event .fc-event-time{font-size:var(--fc-small-font-size);margin-bottom:1px;white-space:nowrap}.fc-timegrid-event-short .fc-event-main-frame{flex-direction:row;overflow:hidden}.fc-timegrid-event-short .fc-event-time:after{content:"\\00a0-\\00a0"}.fc-timegrid-event-short .fc-event-title{font-size:var(--fc-small-font-size)}.fc-timegrid-more-link{background:var(--fc-more-link-bg-color);color:var(--fc-more-link-text-color);cursor:pointer;margin-bottom:1px;position:absolute;z-index:9999}.fc-timegrid-more-link-inner{padding:3px 2px;top:0}.fc-direction-ltr .fc-timegrid-more-link{right:0}.fc-direction-rtl .fc-timegrid-more-link{left:0}.fc .fc-timegrid-now-indicator-arrow,.fc .fc-timegrid-now-indicator-line{pointer-events:none}.fc .fc-timegrid-now-indicator-line{border-color:var(--fc-now-indicator-color);border-style:solid;border-width:1px 0 0;left:0;position:absolute;right:0;z-index:4}.fc .fc-timegrid-now-indicator-arrow{border-color:var(--fc-now-indicator-color);border-style:solid;margin-top:-5px;position:absolute;z-index:4}.fc-direction-ltr .fc-timegrid-now-indicator-arrow{border-bottom-color:transparent;border-top-color:transparent;border-width:5px 0 5px 6px;left:0}.fc-direction-rtl .fc-timegrid-now-indicator-arrow{border-bottom-color:transparent;border-top-color:transparent;border-width:5px 6px 5px 0;right:0}';
rr(Qp);
const Zp = {
  allDaySlot: Boolean
};
var Kp = se({
  name: "@fullcalendar/timegrid",
  initialView: "timeGridWeek",
  optionRefiners: Zp,
  views: {
    timeGrid: {
      component: qp,
      usesMinMaxTime: !0,
      allDaySlot: !0,
      slotDuration: "00:30:00",
      slotEventOverlap: !0
      // a bad name. confused with overlap/constraint system
    },
    timeGridDay: {
      type: "timeGrid",
      duration: { days: 1 }
    },
    timeGridWeek: {
      type: "timeGrid",
      duration: { weeks: 1 }
    }
  }
});
function pa(t) {
  const e = t.getTimezoneOffset() * 6e4;
  return new Date(t.getTime() - e).toISOString();
}
function Yt(t, e) {
  if (!t) return "";
  const n = pa(t);
  return e ? n.slice(0, 10) : n.slice(0, 16);
}
function Qi(t, e) {
  if (!t) return "";
  const n = pa(t);
  return e ? n.slice(0, 10) : n.slice(0, 19);
}
function Zi(t, e) {
  return t ? e ? t.slice(0, 10) : `${t.slice(0, 10)}T09:00` : "";
}
function Ki(t) {
  const e = String(Math.floor(t / 60)).padStart(2, "0"), n = String(t % 60).padStart(2, "0");
  return `${e}:${n}:00`;
}
const ga = "06:00:00", ma = "22:00:00", Xi = 60, Tn = 1440;
function Xp(t, e) {
  return t.getFullYear() !== e.getFullYear() || t.getMonth() !== e.getMonth() || t.getDate() !== e.getDate();
}
function Jp(t, e, n) {
  const r = t.filter((o) => {
    if (o.allDay) return !1;
    const a = new Date(o.start);
    return new Date(o.end) > e && a < n;
  });
  if (r.length === 0)
    return { min: ga, max: ma };
  let i = Tn, s = 0;
  for (const o of r) {
    const a = new Date(o.start), l = new Date(o.end);
    if (Xp(a, l)) {
      i = 0, s = Tn;
      continue;
    }
    i = Math.min(i, a.getHours() * 60 + a.getMinutes()), s = Math.max(s, l.getHours() * 60 + l.getMinutes());
  }
  return {
    min: Ki(Math.max(0, i - Xi)),
    max: Ki(Math.min(Tn, s + Xi))
  };
}
function eg(t, e) {
  const n = new vh(t, {
    plugins: [Kp, Wh, fp],
    initialView: "timeGridWeek",
    locale: bh,
    selectable: !0,
    selectMirror: !0,
    editable: !0,
    eventDurationEditable: !0,
    select: e.onSelect,
    eventClick: e.onEventClick,
    eventDrop: e.onEventMoved,
    eventResize: e.onEventMoved,
    datesSet: e.onDatesSet,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "timeGridWeek,dayGridMonth"
    },
    height: "85vh",
    allDaySlot: !0,
    slotMinTime: ga,
    slotMaxTime: ma,
    slotLabelFormat: { hour: "2-digit", minute: "2-digit", hour12: !1 },
    eventTimeFormat: { hour: "2-digit", minute: "2-digit", meridiem: !1 },
    events: []
  });
  return n.render(), n;
}
const tg = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"];
function ng(t) {
  const e = /FREQ=([A-Z]+)/.exec(t)?.[1] ?? "", n = /UNTIL=(\d{4})(\d{2})(\d{2})/.exec(t);
  return {
    frequency: tg.includes(e) ? e : "",
    until: n ? `${n[1]}-${n[2]}-${n[3]}` : ""
  };
}
function rg(t, e) {
  if (!t) return;
  if (!e) return `FREQ=${t}`;
  const r = (/* @__PURE__ */ new Date(`${e}T23:59:59`)).toISOString().replace(/[-:]/g, "").slice(0, 15);
  return `FREQ=${t};UNTIL=${r}Z`;
}
function $e() {
  return {
    showModal: !1,
    editMode: !1,
    confirmDelete: !1,
    isAllDay: !1,
    currentEventId: "",
    currentRecurrenceId: "",
    currentRrule: "",
    newEventTitle: "",
    newEventCalendar: "",
    newEventStart: "",
    newEventEnd: "",
    newEventRecurrence: "",
    newEventUntil: ""
  };
}
function Ji(t, e, n, r) {
  return {
    ...$e(),
    showModal: !0,
    isAllDay: n,
    newEventCalendar: r,
    newEventStart: Yt(t, n),
    newEventEnd: Yt(e, n)
  };
}
function es(t) {
  const e = t.extendedProps, n = ng(e.rrule);
  return {
    ...$e(),
    showModal: !0,
    editMode: !0,
    isAllDay: t.allDay,
    currentEventId: e.uid || (t.id ?? ""),
    currentRecurrenceId: e.recurrenceId,
    currentRrule: e.rrule,
    newEventTitle: t.title,
    newEventCalendar: e.entityId,
    newEventStart: Yt(t.start, t.allDay),
    newEventEnd: Yt(t.end ?? t.start, t.allDay),
    newEventRecurrence: n.frequency,
    newEventUntil: n.until
  };
}
function ig(t, e) {
  return e === t.isAllDay ? {} : {
    isAllDay: e,
    newEventStart: Zi(t.newEventStart, e),
    newEventEnd: Zi(t.newEventEnd, e)
  };
}
function sg(t) {
  const e = t;
  return e ? { newEventRecurrence: e } : { newEventRecurrence: "", newEventUntil: "" };
}
function og(t) {
  return t.newEventTitle.trim() ? t.newEventCalendar ? !t.newEventStart || !t.newEventEnd ? "Bitte Start und Ende angeben." : null : "Bitte einen Kalender auswählen." : "Bitte einen Titel eingeben.";
}
function ts(t) {
  const e = {
    summary: t.newEventTitle.trim(),
    dtstart: t.newEventStart,
    dtend: t.newEventEnd
  }, n = rg(t.newEventRecurrence, t.newEventUntil);
  return n && (e.rrule = n), e;
}
function va(t) {
  return t.currentRecurrenceId ? {
    recurrence_id: t.currentRecurrenceId,
    recurrence_range: "THISANDFUTURE"
  } : {};
}
async function ag(t, e) {
  try {
    return e.editMode && e.currentEventId ? await ys(
      t.hass,
      e.newEventCalendar,
      e.currentEventId,
      ts(e),
      va(e)
    ) : await il(t.hass, e.newEventCalendar, ts(e)), !0;
  } catch (n) {
    return console.error("Family Calendar: Speichern fehlgeschlagen", n), t.notify(`Termin konnte nicht gespeichert werden: ${t.errorText(n)}`), !1;
  }
}
async function lg(t, e) {
  try {
    return await sl(
      t.hass,
      e.newEventCalendar,
      e.currentEventId,
      va(e)
    ), !0;
  } catch (n) {
    return console.error("Family Calendar: Löschen fehlgeschlagen", n), t.notify(`Termin konnte nicht gelöscht werden: ${t.errorText(n)}`), !1;
  }
}
async function cg(t, e) {
  const n = e.event, r = n.extendedProps;
  if (!r.uid)
    return e.revert(), t.notify("Dieser Termin hat keine Kennung und lässt sich nicht verschieben."), !1;
  const i = {
    summary: n.title,
    dtstart: Qi(n.start, n.allDay),
    dtend: Qi(n.end ?? n.start, n.allDay)
  };
  try {
    const s = r.recurrenceId ? { recurrence_id: r.recurrenceId } : {};
    return await ys(t.hass, r.entityId, r.uid, i, s), !0;
  } catch (s) {
    return e.revert(), console.error("Family Calendar: Verschieben fehlgeschlagen", s), t.notify(`Termin konnte nicht verschoben werden: ${t.errorText(s)}`), !1;
  }
}
function dg(t, e, n) {
  const r = [...t].sort((a, l) => e(a) - e(l) || n(a) - n(l)), i = [];
  let s = [], o = [];
  for (const a of r) {
    const l = e(a);
    s.every((h) => h <= l) && (ns(o, s.length), o = [], s = []);
    let d = s.findIndex((h) => h <= l);
    d === -1 && (d = s.length), s[d] = Math.max(n(a), l + 1);
    const c = { item: a, lane: d, lanes: 1 };
    o.push(c), i.push(c);
  }
  return ns(o, s.length), i;
}
function ns(t, e) {
  for (const n of t)
    n.lanes = Math.max(1, e);
}
const Qt = 1440, ug = {
  padMinutes: 30,
  minGapMinutes: 75,
  minGapPx: 26,
  maxGapPx: 76,
  maxPxPerMinute: 1.6
}, fg = 180, hg = 0.45;
function pg(t, e, n = {}) {
  const r = { ...ug, ...n }, i = rs(t.map(bg).filter((m) => m.to > m.from));
  if (i.length === 0 || e <= 0) return null;
  const s = rs(
    i.map((m) => ({
      from: Math.max(0, m.from - r.padMinutes),
      to: Math.min(Qt, m.to + r.padMinutes)
    }))
  ), o = yg(s, r.minGapMinutes), a = o.slice(1).map((m, b) => ({
    from: o[b].to,
    to: m.from
  })), l = a.map((m) => mg(m.to - m.from, r)), d = vg(l, e), c = o.reduce((m, b) => m + (b.to - b.from), 0), h = Math.max(0, e - ba(d)), f = Math.min(r.maxPxPerMinute, h / c), u = [];
  let g = 0;
  return o.forEach((m, b) => {
    if (b > 0) {
      const E = a[b - 1];
      u.push({ kind: "gap", ...E, top: g, height: d[b - 1] }), g += d[b - 1];
    }
    const y = (m.to - m.from) * f;
    u.push({ kind: "busy", ...m, top: g, height: y }), g += y;
  }), { segments: u, height: g, pxPerMinute: f, yOf: (m) => gg(u, g, m) };
}
function gg(t, e, n) {
  const r = t[0], i = t[t.length - 1];
  if (n <= r.from) return 0;
  if (n >= i.to) return e;
  for (const s of t)
    if (n >= s.from && n <= s.to) {
      const o = (n - s.from) / (s.to - s.from);
      return s.top + o * s.height;
    }
  return e;
}
function mg(t, e) {
  const n = 1 - Math.pow(2, -t / fg);
  return e.minGapPx + (e.maxGapPx - e.minGapPx) * n;
}
function vg(t, e) {
  const n = e * hg, r = ba(t);
  if (r <= n) return t;
  const i = n / r;
  return t.map((s) => s * i);
}
function ba(t) {
  return t.reduce((e, n) => e + n, 0);
}
function bg(t) {
  return {
    from: Math.max(0, Math.min(Qt, t.from)),
    to: Math.max(0, Math.min(Qt, t.to))
  };
}
function rs(t) {
  const e = [...t].sort((r, i) => r.from - i.from), n = [];
  for (const r of e) {
    const i = n[n.length - 1];
    i && r.from <= i.to ? i.to = Math.max(i.to, r.to) : n.push({ ...r });
  }
  return n;
}
function yg(t, e) {
  const n = [];
  for (const r of t) {
    const i = n[n.length - 1];
    i && r.from - i.to < e ? i.to = r.to : n.push({ ...r });
  }
  return n;
}
const Eg = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"], wg = 15, Sg = 34, kn = [30, 60, 120, 180, 360];
function Ag(t, e, n, r, i = /* @__PURE__ */ new Date()) {
  const s = t.map(Tg).filter((f) => f !== null), o = Rg(e, n), a = wa(i).getTime(), l = [], d = o.map((f) => {
    const u = f, g = Yn(f), m = s.filter((b) => !b.allDay && b.start < g && b.end > u);
    for (const b of m) l.push(ya(b, u, g));
    return { datum: f, mitUhrzeit: m };
  }), c = pg(l, r), h = d.map(({ datum: f, mitUhrzeit: u }) => ({
    date: f,
    weekday: Eg[f.getDay()],
    dayNumber: f.getDate(),
    isToday: f.getTime() === a,
    allDay: s.filter((g) => g.allDay && g.start < Yn(f) && g.end > f).map((g) => ({ event: g, color: g.color })),
    blocks: c ? Dg(u, f, c.yOf) : []
  }));
  return c ? {
    days: h,
    ticks: Cg(c.segments, c.pxPerMinute, c.yOf),
    gaps: c.segments.filter((f) => f.kind === "gap").map((f) => ({ top: f.top, height: f.height, label: xg(f.to - f.from) })),
    height: c.height,
    empty: !1
  } : { days: h, ticks: [], gaps: [], height: 0, empty: !0 };
}
function Dg(t, e, n) {
  const r = Yn(e), i = new Map(
    t.map((s) => [s, ya(s, e, r)])
  );
  return dg(
    t,
    (s) => i.get(s).from,
    (s) => i.get(s).to
  ).map(({ item: s, lane: o, lanes: a }) => {
    const l = i.get(s), d = n(l.from);
    return {
      event: s,
      color: s.color,
      top: d,
      height: Math.max(wg, n(l.to) - d),
      lane: o,
      lanes: a,
      time: _g(s, e, r)
    };
  });
}
function Cg(t, e, n) {
  const r = kn.find((s) => s * e >= Sg) ?? kn[kn.length - 1], i = [];
  for (const s of t) {
    if (s.kind !== "busy") continue;
    const o = Math.ceil(s.from / r) * r;
    for (let a = o; a <= s.to; a += r)
      i.push({ y: n(a), label: Ea(a) });
  }
  return i;
}
function ya(t, e, n) {
  const r = t.start <= e ? 0 : qn(t.start), i = t.end >= n ? Qt : qn(t.end);
  return { from: r, to: Math.max(i, r + 1) };
}
function _g(t, e, n) {
  const r = t.start >= e, i = t.end <= n;
  return r && i ? `${wt(t.start)} – ${wt(t.end)}` : r ? `ab ${wt(t.start)}` : i ? `bis ${wt(t.end)}` : "durchgehend";
}
function xg(t) {
  const e = Math.round(t), n = Math.floor(e / 60), r = e % 60;
  return n === 0 ? `${r} Min` : r === 0 ? `${n} Std` : `${n}:${String(r).padStart(2, "0")} Std`;
}
function qn(t) {
  return t.getHours() * 60 + t.getMinutes();
}
function wt(t) {
  return Ea(qn(t));
}
function Ea(t) {
  const e = Math.floor(t / 60), n = Math.round(t % 60);
  return `${String(e).padStart(2, "0")}:${String(n).padStart(2, "0")}`;
}
function Rg(t, e) {
  const n = wa(t);
  return Array.from({ length: e }, (r, i) => {
    const s = new Date(n);
    return s.setDate(s.getDate() + i), s;
  });
}
function wa(t) {
  const e = new Date(t);
  return e.setHours(0, 0, 0, 0), e;
}
function Yn(t) {
  const e = new Date(t);
  return e.setDate(e.getDate() + 1), e;
}
function Tg(t) {
  const e = is(t.start);
  if (!e) return null;
  const n = is(t.end) ?? e;
  return {
    id: typeof t.id == "string" ? t.id : "",
    title: t.title ?? "",
    start: e,
    end: n,
    allDay: t.allDay === !0,
    extendedProps: t.extendedProps ?? {},
    color: typeof t.backgroundColor == "string" ? t.backgroundColor : "#0078d4"
  };
}
function is(t) {
  if (t instanceof Date) return Number.isNaN(t.getTime()) ? null : t;
  if (typeof t != "string") return null;
  const e = /^\d{4}-\d{2}-\d{2}$/.test(t) ? `${t}T00:00:00` : t, n = new Date(e);
  return Number.isNaN(n.getTime()) ? null : n;
}
const kg = 7, Mg = 36, ss = 240;
class Ig {
  /** onChange stoesst das Neuzeichnen an. */
  constructor(e) {
    this.onChange = e, this.budgetPx = ss, this.onResize = () => this.measure();
  }
  /** Merkt sich den Rahmen und misst den verbleibenden Platz.
   *
   * Gemessen wird der Abstand vom oberen Rand des Rahmens bis zum unteren
   * Bildrand, nicht eine feste Hoehe in vh. Eine feste Hoehe kennt die
   * Kopfzeile nicht: Bricht die Kalenderauswahl auf zwei Zeilen um, rutscht
   * die Ansicht sonst unten aus dem Bild - und genau das Scrollen soll sie
   * ja ersparen.
   *
   * Die Messung laeuft nicht im Kreis, weil die Oberkante des Rahmens von
   * allem darueber bestimmt wird und nicht davon, was hineingezeichnet wird.
   */
  watch(e) {
    e !== this.frame && (this.frame = e, e ? window.addEventListener("resize", this.onResize) : window.removeEventListener("resize", this.onResize)), this.measure();
  }
  week(e, n) {
    return Ag(e, n, kg, this.budgetPx);
  }
  dispose() {
    window.removeEventListener("resize", this.onResize), this.frame = void 0;
  }
  measure() {
    if (!this.frame) return;
    const e = this.frame.getBoundingClientRect().top, n = Math.max(ss, Math.floor(window.innerHeight - e - Mg));
    Math.abs(n - this.budgetPx) <= 1 || (this.budgetPx = n, this.onChange());
  }
}
const os = 7, Ng = 100;
class Og {
  constructor(e) {
    this.ctx = e, this.all = [], this.visible = [], this.lastSignature = "";
  }
  /** Aendert sich nur, wenn einer der konfigurierten Kalender sich meldet.
   *
   * hass wird bei JEDER Zustandsaenderung im System neu zugewiesen. Ohne
   * diesen Vergleich wuerde die Karte dutzende Male pro Minute alles laden.
   */
  hasRelevantChange() {
    const e = this.ctx.hass(), n = this.ctx.config()?.entities;
    if (!e || !n) return !1;
    const r = n.map((i) => e.states[i]?.last_updated ?? "missing").join("|");
    return r === this.lastSignature ? !1 : (this.lastSignature = r, !0);
  }
  scheduleFetch(e) {
    this.clear("refreshTimer"), this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = void 0, this.load();
    }, e);
  }
  scheduleResize() {
    this.clear("resizeTimer"), this.resizeTimer = window.setTimeout(() => {
      this.resizeTimer = void 0, this.ctx.calendar()?.updateSize();
    }, Ng);
  }
  /** Wendet die Filter an und passt die Zeitachse an. */
  applyFilters() {
    const e = this.ctx.calendar();
    if (!e) return;
    this.visible = al(this.all, this.ctx.activeCalendars()), e.removeAllEventSources(), e.addEventSource(this.visible);
    const n = e.view;
    this.adjustTimeRange(n.activeStart, n.activeEnd), e.updateSize(), this.ctx.onVisibleChanged?.();
  }
  /** Die aktuell eingeschalteten Termine - Grundlage der Kompaktansicht. */
  visibleEvents() {
    return this.visible;
  }
  adjustTimeRange(e, n) {
    const r = this.ctx.calendar();
    if (!r || r.view.type !== "timeGridWeek") return;
    const i = Jp(this.visible, e, n);
    r.setOption("slotMinTime", i.min), r.setOption("slotMaxTime", i.max);
  }
  dispose() {
    this.clear("refreshTimer"), this.clear("resizeTimer");
  }
  async load() {
    const e = this.ctx.hass(), n = this.ctx.config();
    if (!e || !n || !this.ctx.calendar()) return;
    const { start: r, end: i } = this.window(), s = [];
    for (const o of n.entities)
      try {
        const a = await bs(e, o, r, i), l = n.colors?.[o] ?? Jt;
        s.push(...a.map((d) => ol(d, o, l)));
      } catch (a) {
        console.error("Family Calendar: Laden fehlgeschlagen für", o, a), this.ctx.onError("Kalender konnte nicht geladen werden.", o);
      }
    this.all = s, this.applyFilters();
  }
  window() {
    const e = this.ctx.calendar()?.view, n = e ? new Date(e.activeStart) : /* @__PURE__ */ new Date(), r = e ? new Date(e.activeEnd) : /* @__PURE__ */ new Date();
    return e || r.setDate(r.getDate() + 14), n.setDate(n.getDate() - os), r.setDate(r.getDate() + os), { start: n.toISOString(), end: r.toISOString() };
  }
  clear(e) {
    const n = this[e];
    n !== void 0 && (clearTimeout(n), this[e] = void 0);
  }
}
const Pg = Y`
  #calendar {
    --fc-border-color: var(--grid-line);
    --fc-page-bg-color: transparent;
    --fc-neutral-bg-color: transparent;
    --fc-today-bg-color: rgba(0, 122, 255, 0.08);
    --fc-now-indicator-color: #ff3b30;
    
    font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    height: 100%;
  }

  /* In der Kompaktansicht bleibt das Raster im DOM - es fuehrt weiter den
     sichtbaren Zeitraum und laedt nach. Verborgen wird es ueber [hidden],
     und das braucht hier eine eigene Regel: FullCalendar setzt auf seinen
     Wurzelknoten display:flex, und diese Regel schlaegt die eingebaute
     des Browsers. */
  #calendar[hidden] {
    display: none;
  }

  /* --- Header Styling (Apple Style) --- */
  .fc-theme-standard .fc-scrollgrid {
    border: none; /* Äußerer Rahmen weg */
  }

  .fc-col-header-cell {
    padding: 12px 0;
  }

  .fc-col-header-cell-cushion {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 0.95rem;
    text-transform: capitalize;
    text-decoration: none !important;
  }

  /* Wochentag kleiner und grau (falls FC das trennt, sonst allgemein) */
  .fc-day-header {
    font-weight: 500;
  }

  /* --- Grid & Slots --- */
  .fc-timegrid-slot {
    height: 3.5em !important; /* Luftiger */
    border-bottom: 1px solid var(--grid-line);
  }
  
  .fc-timegrid-axis-cushion {
    color: var(--text-secondary);
    font-size: 0.8rem;
    font-weight: 500;
  }

  /* --- Events (Modern Cards) --- */
  .fc-event {
    border: none !important;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    padding: 2px;
    font-size: 0.85rem;
    font-weight: 500;
    transition: transform 0.1s ease, box-shadow 0.1s ease;
  }

  .fc-event:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 5;
  }

  .fc-event-main {
    padding: 2px 4px;
    color: white; /* Text immer weiß für Kontrast */
  }

  .fc-v-event .fc-event-time {
    font-weight: 600;
    opacity: 0.9;
    margin-bottom: 1px;
    display: block;
  }

  /* --- Now Indicator (Roter Punkt + Linie) --- */
  .fc-timegrid-now-indicator-line {
    border-top-width: 2px;
    z-index: 4;
  }
  .fc-timegrid-now-indicator-arrow {
    border-color: #ff3b30;
    border-width: 6px;
    margin-top: -6px; /* Zentrieren */
    left: 0;
    z-index: 4;
  }

  /* --- Toolbar (Buttons) --- */
  .fc-header-toolbar {
    margin-bottom: 1.5em !important;
  }

  .fc-button {
    background-color: rgba(255,255,255,0.5) !important;
    border: 1px solid rgba(0,0,0,0.05) !important;
    color: var(--text-primary) !important;
    font-weight: 500 !important;
    border-radius: 8px !important;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important;
    text-transform: capitalize;
    padding: 6px 16px !important;
    transition: all 0.2s ease;
  }

  .fc-button:hover {
    background-color: rgba(255,255,255,0.8) !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
  }

  .fc-button-active {
    background-color: var(--accent-color) !important;
    color: white !important;
    box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3) !important;
  }

  .fc-toolbar-title {
    font-size: 1.5rem !important;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
  }

  /* --- Modern Scrollbar (Apple Style) --- */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
  
  /* Firefox Scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
  }

  /* --- Modal Styling --- */
`, $g = Y`
  /* Keine feste Hoehe: Die Ansicht ist genau so hoch, wie ihre Zeitachse
     gerechnet wurde - und die passt in den gemessenen Platz. */
  .compact {
    display: flex;
    flex-direction: column;
    padding: 0 12px 12px;
    box-sizing: border-box;
  }

  .compact-nav {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0 10px;
  }

  .compact-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-left: 4px;
  }

  .compact-step,
  .compact-today {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--grid-line);
    background: var(--surface-soft);
    color: var(--text-primary);
    border-radius: 8px;
    cursor: pointer;
    font: inherit;
    min-height: 34px;
  }

  .compact-step {
    width: 34px;
  }

  .compact-today {
    padding: 0 12px;
  }

  .compact-step:hover,
  .compact-today:hover {
    background: var(--surface-hover);
  }

  /* Achsenspalte und sieben Tage - dieselbe Aufteilung fuer Kopf und Koerper. */
  .compact-grid {
    display: grid;
    grid-template-columns: 58px repeat(7, minmax(0, 1fr));
    gap: 0 4px;
  }

  .compact-head {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 5px;
    padding: 4px 0 6px;
    border-bottom: 1px solid var(--grid-line);
    color: var(--text-secondary);
  }

  .compact-weekday {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .compact-daynum {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .compact-head.today .compact-daynum,
  .compact-head.today .compact-weekday {
    color: var(--accent-color);
  }

  .compact-axis-head,
  .compact-axis-label {
    border-bottom: 1px solid var(--grid-line);
  }

  .compact-axis-label {
    font-size: 0.7rem;
    color: var(--text-secondary);
    align-self: center;
    padding-bottom: 4px;
  }

  .compact-allday {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    padding: 4px 2px;
    border-bottom: 1px solid var(--grid-line);
    align-content: flex-start;
  }

  .compact-chip {
    display: block;
    width: 100%;
    border: none;
    border-radius: 5px;
    padding: 2px 6px;
    font: inherit;
    font-size: 0.72rem;
    text-align: left;
    color: #fff;
    background: var(--block-color);
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .compact-body {
    padding-top: 6px;
  }

  .compact-scale {
    position: relative;
  }

  .compact-empty {
    color: var(--text-secondary);
    text-align: center;
    margin-top: 24px;
  }

  .compact-axis {
    position: relative;
  }

  .compact-tick {
    position: absolute;
    right: 6px;
    transform: translateY(-50%);
    font-size: 0.72rem;
    color: var(--text-secondary);
    font-variant-numeric: tabular-nums;
  }

  .compact-break-label {
    position: absolute;
    right: 6px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 0.66rem;
    color: var(--text-secondary);
    opacity: 0.75;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .compact-day {
    position: relative;
    border-left: 1px solid var(--grid-line);
    border-radius: 4px;
    background: var(--surface-soft);
  }

  .compact-day.today {
    background: var(--today-tint);
  }

  /* Uebersprungene Zeit. Die Schraffur sagt: Hier gilt der Massstab nicht. */
  .compact-break {
    position: absolute;
    left: 0;
    right: 0;
    background: repeating-linear-gradient(
      -45deg,
      var(--break-stripe) 0 5px,
      transparent 5px 10px
    );
    border-top: 1px dashed var(--grid-line-strong);
    border-bottom: 1px dashed var(--grid-line-strong);
    pointer-events: none;
  }

  .compact-block {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1px;
    overflow: hidden;
    margin: 0 1px;
    padding: 2px 5px;
    border: none;
    border-left: 3px solid var(--block-color);
    border-radius: 4px;
    background: color-mix(in srgb, var(--block-color) 88%, #000);
    color: #fff;
    font: inherit;
    text-align: left;
    cursor: pointer;
    line-height: 1.15;
  }

  .compact-block:hover {
    filter: brightness(1.12);
  }

  .compact-block-title {
    font-size: 0.76rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .compact-block-time {
    font-size: 0.68rem;
    opacity: 0.85;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  /* Flache Bloecke haben nur Platz fuer eine Zeile. */
  .compact-block.flach {
    flex-direction: row;
    align-items: center;
    gap: 5px;
    padding: 0 5px;
  }

  /* In einer Zeile ist der Titel wichtiger als die Uhrzeit - die steht im
     Kurzhinweis und im Dialog. */
  .compact-block.flach .compact-block-time {
    display: none;
  }
`, Hg = Y`
  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation: fadeIn 0.2s ease;
  }

  .modal-content {
    background: rgba(255, 255, 255, 0.95);
    color: var(--text-primary);
    backdrop-filter: blur(20px);
    padding: 24px;
    border-radius: 16px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.5);
    animation: slideUp 0.2s ease;
  }

  .modal-content h3 {
    margin: 0 0 20px 0;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-group label {
    display: block;
    margin-bottom: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
  }

  .form-group input, .form-group select {
    width: 100%;
    color: var(--text-primary);
    padding: 10px;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.1);
    background: rgba(255,255,255,0.8);
    font-size: 1rem;
    box-sizing: border-box;
    transition: all 0.2s;
  }

  .form-group input:focus, .form-group select:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  }

  .btn-cancel, .btn-save {
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    font-size: 0.95rem;
  }

  .btn-cancel {
    background: transparent;
    color: var(--text-secondary);
  }

  .btn-cancel:hover {
    background: rgba(0,0,0,0.05);
  }

  .btn-save {
    background: var(--accent-color);
    color: white;
    box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
  }

  .btn-save:hover {
    background: #0062cc;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  /* Kontrollkaestchen mit seiner Beschriftung in einer Zeile. */
  .form-group--inline label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .form-group--inline input[type='checkbox'] {
    width: auto;
    margin: 0;
  }

  /* Feld, das nur anzeigt statt zu bearbeiten. */
  .readonly-value {
    margin: 0;
    padding: 10px 0;
    color: var(--text-primary);
    font-size: 1rem;
  }

  .field-hint {
    margin: 6px 0 0;
    font-size: 0.78rem;
    line-height: 1.35;
    color: var(--text-secondary);
  }

  .btn-delete {
    background-color: #d93025;
    color: white;
    margin-right: auto;
  }

  .btn-delete--confirm {
    background-color: #8c1d16;
  }
`, Bg = Y`
  .header {
    padding-bottom: 12px;
    border-bottom: 1px solid var(--glass-border);
    margin-bottom: 12px;
  }

  .filters {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .filter-chip {
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    padding: 6px 12px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;
    outline: none;
  }

  .filter-chip:hover {
    background: rgba(255, 255, 255, 0.6);
  }

  .filter-chip.active {
    background: white;
    color: var(--text-primary);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    border-color: transparent;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--chip-color);
    opacity: 0.5;
    transition: opacity 0.2s;
  }

  .filter-chip.active .dot {
    opacity: 1;
  }

  /* Sprungziele zu anderen Ansichten - klein und zurueckhaltend. */
  .link-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.55);
    color: var(--text-secondary);
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }

  .link-button:hover {
    background: rgba(255, 255, 255, 0.9);
    color: var(--text-primary);
  }

  .link-button ha-icon {
    --mdc-icon-size: 20px;
  }

  /* Hauptaktion der Karte - bewusst auffaelliger als die Filter-Chips. */
  .add-button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    min-height: 34px;
    padding: 0 14px 0 8px;
    border: none;
    border-radius: 17px;
    background: var(--accent-color);
    color: white;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
    transition: filter 0.2s;
  }

  .add-button:hover {
    filter: brightness(1.08);
  }

  .add-button ha-icon {
    --mdc-icon-size: 20px;
  }
`, Lg = Y`
  :host {
    display: block;
    width: 100%;
    /* Native Bedienelemente (Eingabefelder, Datumswaehler, Auswahllisten)
       erben keine Farben. Ohne color-scheme zeichnet der Browser sie nach
       seiner eigenen Einstellung - auf einem dunkel eingestellten Panel
       also weiss, und damit unsichtbar auf unserem hellen Grund. */
    color-scheme: light;
    /* Leichter bläulicher Verlauf für mehr Tiefe - Transparenter für Glass Effekt */
    --glass-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(235, 245, 255, 0.5));
    --glass-border: rgba(255, 255, 255, 0.4);
    /* Bläulicher Schatten für den "Floating"-Effekt */
    --glass-shadow: 0 10px 40px 0 rgba(31, 38, 135, 0.2);
    --text-primary: #1d1d1f;
    --text-secondary: #6e6e73;
    --grid-line: rgba(60, 60, 67, 0.08);
    --accent-color: #007aff;
    /* Flaechen und Linien der Kompaktansicht. Der Glaslook der Karte
       traegt dort nicht: Sieben Spalten mit je eigener Unschaerfe waeren
       teuer und unruhig. */
    --surface-soft: rgba(255, 255, 255, 0.34);
    --surface-hover: rgba(255, 255, 255, 0.62);
    --today-tint: rgba(0, 122, 255, 0.09);
    --grid-line-strong: rgba(60, 60, 67, 0.22);
    --break-stripe: rgba(60, 60, 67, 0.13);
  }

  ha-card {
    width: 100%;
    box-sizing: border-box;
    background: var(--glass-bg);
    backdrop-filter: blur(30px) saturate(180%);
    -webkit-backdrop-filter: blur(30px) saturate(180%);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    box-shadow: var(--glass-shadow);
    color: var(--text-primary);
    padding: 16px;
    overflow: hidden; /* Wichtig für abgerundete Ecken */
    display: flex;
    flex-direction: column;
  }
`, zg = Y`
  ${Lg}
  ${Bg}
  ${Pg}
  ${$g}
  ${Hg}
`;
function Ug(t) {
  const { week: e } = t;
  return w`
    <div class="compact">
      <div class="compact-nav">
        <button class="compact-step" @click=${t.onPrev} aria-label="Woche zurück">
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>
        <button class="compact-today" @click=${t.onToday}>Heute</button>
        <span class="compact-title">${t.title}</span>
        <button class="compact-step" @click=${t.onNext} aria-label="Woche vor">
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
      </div>

      <div class="compact-grid">
        <div class="compact-axis-head"></div>
        ${e.days.map(
    (n) => w`
            <div class="compact-head ${n.isToday ? "today" : ""}">
              <span class="compact-weekday">${n.weekday}</span>
              <span class="compact-daynum">${n.dayNumber}</span>
            </div>
          `
  )}

        ${e.days.some((n) => n.allDay.length > 0) ? w`
              <div class="compact-axis-label">Ganztägig</div>
              ${e.days.map(
    (n) => w`
                  <div class="compact-allday">
                    ${n.allDay.map(
      ({ event: r, color: i }) => w`
                        <button
                          class="compact-chip"
                          style="--block-color: ${i}"
                          title=${r.title}
                          @click=${() => t.onEvent(r)}
                        >
                          ${r.title}
                        </button>
                      `
    )}
                  </div>
                `
  )}
            ` : $}
      </div>

      <div class="compact-body">
        ${e.empty ? w`<p class="compact-empty">Diese Woche steht nichts mit Uhrzeit an.</p>` : w`
              <div class="compact-grid compact-scale" style="height: ${e.height}px">
                <div class="compact-axis">
                  ${e.gaps.map((n) => Wg(n))}
                  ${e.ticks.map(
    (n) => w`
                      <span class="compact-tick" style="top: ${n.y}px">${n.label}</span>
                    `
  )}
                </div>
                ${e.days.map((n) => Fg(n, e.gaps, t.onEvent))}
              </div>
            `}
      </div>
    </div>
  `;
}
function Fg(t, e, n) {
  return w`
    <div class="compact-day ${t.isToday ? "today" : ""}">
      ${e.map(
    (r) => w`
          <div class="compact-break" style="top: ${r.top}px; height: ${r.height}px"></div>
        `
  )}
      ${t.blocks.map((r) => jg(r, n))}
    </div>
  `;
}
function jg(t, e) {
  const n = 100 / t.lanes, r = [
    `top: ${t.top}px`,
    `height: ${t.height}px`,
    `left: ${t.lane * n}%`,
    `width: ${n}%`,
    `--block-color: ${t.color}`
  ].join("; ");
  return w`
    <button
      class="compact-block ${t.height < 30 ? "flach" : ""}"
      style=${r}
      title="${t.event.title} · ${t.time}"
      @click=${() => e(t.event)}
    >
      <span class="compact-block-title">${t.event.title}</span>
      <span class="compact-block-time">${t.time}</span>
    </button>
  `;
}
function Wg(t) {
  return w`
    <span
      class="compact-break-label"
      style="top: ${t.top}px; height: ${t.height}px"
      >${t.label}</span
    >
  `;
}
const ze = (t) => t.target.value;
function Vg(t) {
  const e = t.isAllDay ? "date" : "datetime-local";
  return w`
    <div class="modal-overlay" @click=${() => t.onCancel()}>
      <div class="modal-content" @click=${(n) => n.stopPropagation()}>
        <h3>${t.editMode ? "Termin bearbeiten" : "Neuer Termin"}</h3>

        <div class="form-group">
          <label>Titel</label>
          <input
            type="text"
            .value=${t.title}
            @input=${(n) => t.onTitle(ze(n))}
            placeholder="Termin Titel"
            autofocus
          />
        </div>

        ${Gg(t)}

        <div class="form-group form-group--inline">
          <label>
            <input
              type="checkbox"
              .checked=${t.isAllDay}
              @change=${(n) => t.onAllDay(n.target.checked)}
            />
            Ganztägig
          </label>
        </div>

        <div class="form-group">
          <label>Von</label>
          <input type=${e} .value=${t.start} @input=${(n) => t.onStart(ze(n))} />
        </div>

        <div class="form-group">
          <label>Bis</label>
          <input type=${e} .value=${t.end} @input=${(n) => t.onEnd(ze(n))} />
        </div>

        ${qg(t)}

        <div class="modal-actions">
          ${t.editMode ? Qg(t) : ""}
          <button class="btn-cancel" @click=${() => t.onCancel()}>Abbrechen</button>
          <button class="btn-save" @click=${() => t.onSave()}>
            ${t.editMode ? "Aktualisieren" : "Speichern"}
          </button>
        </div>
      </div>
    </div>
  `;
}
function Gg(t) {
  return w`
    <div class="form-group">
      <label>Kalender</label>
      ${t.editMode ? w`<p class="readonly-value">${t.nameOf(t.calendar)}</p>` : w`
            <select .value=${t.calendar} @change=${(e) => t.onCalendar(ze(e))}>
              ${t.entities.map(
    (e) => w`<option value=${e}>${t.nameOf(e)}</option>`
  )}
            </select>
          `}
    </div>
  `;
}
function qg(t) {
  return t.editMode && !t.isSeries ? w`
      <div class="form-group">
        <label>Wiederholung</label>
        <p class="readonly-value">Keine</p>
      </div>
    ` : w`
    <div class="form-group">
      <label>Wiederholung</label>
      <select .value=${t.frequency} @change=${(e) => t.onFrequency(ze(e))}>
        ${t.isSeries ? "" : w`<option value="">Keine</option>`}
        <option value="DAILY">Täglich</option>
        <option value="WEEKLY">Wöchentlich</option>
        <option value="MONTHLY">Monatlich</option>
        <option value="YEARLY">Jährlich</option>
      </select>
    </div>
    ${t.frequency ? Yg(t) : ""}
  `;
}
function Yg(t) {
  return w`
    <div class="form-group">
      <label>Serie endet am</label>
      <input type="date" .value=${t.until} @input=${(e) => t.onUntil(ze(e))} />
      <p class="field-hint">
        ${t.until ? "" : "Leer lassen für eine Serie ohne Ende. "}
        ${t.isSeries ? "Änderungen gelten ab diesem Termin, frühere bleiben stehen." : ""}
      </p>
    </div>
  `;
}
function Qg(t) {
  return t.confirmDelete ? w`
    <button class="btn-delete btn-delete--confirm" @click=${() => t.onDelete()}>
      Wirklich löschen?
    </button>
  ` : w`<button class="btn-delete" @click=${() => t.onConfirmDelete()}>Löschen</button>`;
}
function Zg(t) {
  return w`
    <div class="header">
      <div class="filters">
        ${t.links.map((e) => Kg(e, t.onNavigate))}
        ${t.entities.map((e) => Xg(e, t))}
        <div style="flex: 1"></div>
        <button class="add-button" @click=${() => t.onNewEvent()}>
          <ha-icon icon="mdi:plus"></ha-icon>
          Termin
        </button>
        <button
          class="filter-chip ${t.isCompact ? "active" : ""}"
          style="--chip-color: #666"
          @click=${() => t.onToggleCompact()}
        >
          <span class="dot"></span>
          Kompakt
        </button>
      </div>
    </div>
  `;
}
function Kg(t, e) {
  const n = t.name ?? t.path;
  return w`
    <button
      class="link-button"
      title=${n}
      aria-label=${n}
      @click=${() => e(t.path)}
    >
      <ha-icon .icon=${t.icon}></ha-icon>
    </button>
  `;
}
function Xg(t, e) {
  const n = e.activeCalendars.includes(t);
  return w`
    <button
      class="filter-chip ${n ? "active" : ""}"
      style="--chip-color: ${e.colorOf(t)}"
      @click=${() => e.onToggleCalendar(t)}
    >
      <span class="dot"></span>
      ${e.nameOf(t)}
    </button>
  `;
}
var Jg = Object.defineProperty, em = Object.getOwnPropertyDescriptor, ve = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? em(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (r ? o(e, n, i) : o(i)) || i);
  return r && i && Jg(e, n, i), i;
};
const tm = 500, nm = [0, 250, 1e3, 2500];
let K = class extends te {
  constructor() {
    super(...arguments), this.activeCalendars = [], this.isCompact = !1, this.form = $e(), this.calendar = null, this.loader = new Og({
      hass: () => this.hass,
      config: () => this.config,
      calendar: () => this.calendar,
      activeCalendars: () => this.activeCalendars,
      onError: (t, e) => this.notify(`${this.friendlyName(e)}: ${t}`),
      onVisibleChanged: () => this.requestUpdate()
    }), this.compact = new Ig(() => this.requestUpdate());
  }
  setConfig(t) {
    if (!t.entities?.length)
      throw new Error("Bitte mindestens eine Kalender-Entität angeben!");
    this.config = t, this.activeCalendars = [...t.entities];
  }
  getCardSize() {
    return 10;
  }
  // ---------------------------------------------------------------- Anzeige
  render() {
    return w`
      <ha-card>
        ${Zg({
      links: this.config?.links ?? [],
      entities: this.config?.entities ?? [],
      activeCalendars: this.activeCalendars,
      isCompact: this.isCompact,
      colorOf: (t) => this.config.colors?.[t] ?? Jt,
      nameOf: (t) => this.friendlyName(t),
      onNavigate: (t) => this.navigate(t),
      onToggleCalendar: (t) => this.toggleCalendar(t),
      onToggleCompact: () => this.toggleCompact(),
      onNewEvent: () => this.openNewEvent()
    })}
        <div id="calendar" ?hidden=${this.isCompact}></div>
        ${this.isCompact ? this.renderCompactView() : ""}
        ${this.form.showModal ? this.renderDialog() : ""}
      </ha-card>
    `;
  }
  /** Die Woche gestaucht: Termine massstabsgetreu, leere Zeit gerafft.
   *
   * FullCalendar bleibt dabei im Hintergrund bestehen. Es fuehrt weiter
   * den sichtbaren Zeitraum und laedt nach; nur gezeichnet wird hier
   * selbst, weil sein Raster die Zeit zwingend gleichmaessig auftraegt.
   */
  renderCompactView() {
    const t = this.calendar?.view;
    return Ug({
      week: this.compact.week(this.loader.visibleEvents(), t?.activeStart ?? /* @__PURE__ */ new Date()),
      title: t?.title ?? "",
      onEvent: (e) => {
        this.form = es(e);
      },
      onPrev: () => this.calendar?.prev(),
      onNext: () => this.calendar?.next(),
      onToday: () => this.calendar?.today()
    });
  }
  renderDialog() {
    const t = this.form, e = (n) => {
      this.form = { ...this.form, ...n };
    };
    return Vg({
      editMode: t.editMode,
      isSeries: t.currentRrule !== "",
      confirmDelete: t.confirmDelete,
      isAllDay: t.isAllDay,
      title: t.newEventTitle,
      calendar: t.newEventCalendar,
      start: t.newEventStart,
      end: t.newEventEnd,
      frequency: t.newEventRecurrence,
      until: t.newEventUntil,
      entities: this.config.entities,
      nameOf: (n) => this.friendlyName(n),
      onTitle: (n) => e({ newEventTitle: n }),
      onCalendar: (n) => e({ newEventCalendar: n }),
      onAllDay: (n) => e(ig(t, n)),
      onStart: (n) => e({ newEventStart: n }),
      onEnd: (n) => e({ newEventEnd: n }),
      onFrequency: (n) => e(sg(n)),
      onUntil: (n) => e({ newEventUntil: n }),
      onConfirmDelete: () => e({ confirmDelete: !0 }),
      onDelete: () => {
        this.deleteEvent();
      },
      onCancel: () => this.form = $e(),
      onSave: () => {
        this.saveEvent();
      }
    });
  }
  /** Wechselt die Ansicht, ohne die Seite neu zu laden. */
  navigate(t) {
    history.pushState(null, "", t), window.dispatchEvent(new CustomEvent("location-changed", { bubbles: !0, composed: !0 }));
  }
  // ------------------------------------------------------------ Lebenszyklus
  firstUpdated() {
    if (this.calendarEl) {
      this.calendar = eg(this.calendarEl, {
        onSelect: (t) => this.handleDateSelect(t),
        onEventClick: (t) => this.handleEventClick(t),
        onEventMoved: (t) => {
          this.handleEventMoved(t);
        },
        onDatesSet: (t) => {
          this.loader.adjustTimeRange(t.start, t.end), this.refresh();
        }
      }), this.resizeObserver = new ResizeObserver(() => this.loader.scheduleResize()), this.resizeObserver.observe(this.calendarEl);
      for (const t of nm)
        window.setTimeout(() => this.calendar?.updateSize(), t);
    }
  }
  updated(t) {
    t.has("hass") && this.loader.hasRelevantChange() && this.refresh(), this.compact.watch(this.isCompact ? this.compactBodyEl : void 0);
  }
  /** Nachladen anstossen, entprellt. */
  refresh() {
    this.loader.scheduleFetch(this.config?.refreshDebounceMs ?? tm);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.loader.dispose(), this.resizeObserver?.disconnect(), this.resizeObserver = void 0, this.compact.dispose(), this.calendar?.destroy(), this.calendar = null;
  }
  /** Aendert sich nur, wenn einer der konfigurierten Kalender sich meldet. */
  // ------------------------------------------------------------------- Daten
  // -------------------------------------------------------------- Bedienung
  toggleCompact() {
    this.isCompact = !this.isCompact, this.isCompact || this.calendar?.updateSize();
  }
  toggleCalendar(t) {
    this.activeCalendars = this.activeCalendars.includes(t) ? this.activeCalendars.filter((e) => e !== t) : [...this.activeCalendars, t], this.loader.applyFilters();
  }
  /** Neuer Termin ueber den Knopf.
   *
   * Auf einem Touchscreen ist das Aufziehen im Raster muehsam: Es verlangt
   * einen langen Druck, und daneben gegriffen packt man einen bestehenden
   * Termin. Der Knopf ist der verlaessliche Weg.
   */
  /** Neuer Termin ueber den Knopf.
   *
   * Auf einem Touchscreen ist das Aufziehen im Raster muehsam: Es verlangt
   * einen langen Druck, und daneben gegriffen packt man einen bestehenden
   * Termin. Der Knopf ist der verlaessliche Weg.
   */
  openNewEvent() {
    const t = /* @__PURE__ */ new Date();
    t.setMinutes(0, 0, 0), t.setHours(t.getHours() + 1);
    const e = new Date(t.getTime() + 3600 * 1e3);
    this.form = Ji(t, e, !1, this.config.entities[0] ?? "");
  }
  handleDateSelect(t) {
    t.view.calendar.unselect(), this.form = Ji(t.start, t.end, t.allDay, this.config.entities[0] ?? "");
  }
  handleEventClick(t) {
    this.form = es(t.event);
  }
  // ------------------------------------------------------------- Schreiben
  actions() {
    return {
      hass: this.hass,
      notify: (t) => this.notify(t),
      errorText: (t) => this.errorText(t)
    };
  }
  async saveEvent() {
    const t = og(this.form);
    if (t) return this.notify(t);
    await ag(this.actions(), this.form) && (this.form = $e(), this.refresh());
  }
  async deleteEvent() {
    await lg(this.actions(), this.form) ? (this.form = $e(), this.refresh()) : this.form = { ...this.form, confirmDelete: !1 };
  }
  async handleEventMoved(t) {
    await cg(this.actions(), t) && this.refresh();
  }
  // ------------------------------------------------------------------ Helfer
  friendlyName(t) {
    return this.hass?.states[t]?.attributes?.friendly_name ?? t;
  }
  errorText(t) {
    return t instanceof Error ? t.message : typeof t == "object" && t !== null && "message" in t ? String(t.message) : "Unbekannter Fehler";
  }
  /** Meldung als Home-Assistant-Toast statt als Browser-alert(). */
  notify(t) {
    this.dispatchEvent(
      new CustomEvent("hass-notification", {
        detail: { message: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
};
K.styles = zg;
ve([
  V({ attribute: !1 })
], K.prototype, "hass", 2);
ve([
  V({ attribute: !1 })
], K.prototype, "config", 2);
ve([
  U()
], K.prototype, "activeCalendars", 2);
ve([
  U()
], K.prototype, "isCompact", 2);
ve([
  U()
], K.prototype, "form", 2);
ve([
  vs("#calendar")
], K.prototype, "calendarEl", 2);
ve([
  vs(".compact-body")
], K.prototype, "compactBodyEl", 2);
K = ve([
  dt("family-calendar")
], K);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-calendar",
  name: "Family Calendar",
  description: "Wochen- und Monatsansicht über mehrere Kalender, mit Anlegen und Bearbeiten.",
  preview: !1
});
async function rm(t, e) {
  return ((await t.callWS({
    type: "media_source/browse_media",
    media_content_id: e
  })).children ?? []).filter((r) => r.media_class === "image").map((r) => r.media_content_id).sort((r, i) => r.localeCompare(i, "de"));
}
async function im(t, e) {
  return (await t.callWS({
    type: "media_source/resolve_media",
    media_content_id: e
  })).url;
}
const sm = Y`
  :host {
    display: block;
    color-scheme: dark;
  }

  ha-card {
    position: relative;
    height: 85vh;
    border-radius: 24px;
    overflow: hidden;
    background: #101418;
    border: none;
  }

  /* Zwei Ebenen uebereinander: Beim Wechsel blendet die obere ein, damit
     zwischen den Bildern kein schwarzer Moment entsteht. */
  .layer {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1.2s ease-in-out;
  }

  .layer--visible {
    opacity: 1;
  }

  /* Verlauf unten, damit die Uhrzeit auch auf hellen Bildern lesbar ist. */
  .scrim {
    position: absolute;
    inset: auto 0 0 0;
    height: 45%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent);
    pointer-events: none;
  }

  .clock {
    position: absolute;
    left: 40px;
    bottom: 32px;
    color: white;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  }

  .time {
    display: block;
    font-size: clamp(3rem, 9vw, 6rem);
    font-weight: 200;
    line-height: 1;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }

  .date {
    display: block;
    margin-top: 8px;
    font-size: clamp(1rem, 2.2vw, 1.5rem);
    font-weight: 400;
    opacity: 0.9;
  }

  .hint {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 32px;
    color: #9aa0a6;
    text-align: center;
  }
`;
function om(t) {
  return t.hasImages ? w`
    <ha-card>
      <div
        class="layer ${t.frontVisible ? "layer--visible" : ""}"
        style=${t.frontUrl ? `background-image: url("${t.frontUrl}")` : ""}
      ></div>
      <div
        class="layer ${t.frontVisible ? "" : "layer--visible"}"
        style=${t.backUrl ? `background-image: url("${t.backUrl}")` : ""}
      ></div>
      ${t.showClock ? am(t.now) : ""}
    </ha-card>
  ` : w`
      <ha-card>
        <div class="hint">
          Keine Bilder in <code>${t.folder}</code>.<br />
          Lege Fotos in den Medienordner, sie erscheinen dann von selbst.
        </div>
      </ha-card>
    `;
}
function am(t) {
  return w`
    <div class="scrim"></div>
    <div class="clock">
      <span class="time">
        ${t.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
      </span>
      <span class="date">
        ${t.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long"
  })}
      </span>
    </div>
  `;
}
var lm = Object.defineProperty, cm = Object.getOwnPropertyDescriptor, be = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? cm(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (r ? o(e, n, i) : o(i)) || i);
  return r && i && lm(e, n, i), i;
};
const dm = "media-source://media_source/local/fotos", um = 30, fm = 60, hm = 2e4;
let X = class extends te {
  constructor() {
    super(...arguments), this.frontUrl = "", this.backUrl = "", this.frontVisible = !0, this.hasImages = !1, this.now = /* @__PURE__ */ new Date(), this.images = [], this.index = -1, this.timers = [], this.started = !1;
  }
  setConfig(t) {
    this.config = t;
  }
  getCardSize() {
    return 12;
  }
  updated(t) {
    t.has("hass") && this.hass && !this.started && (this.started = !0, this.start());
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    for (const t of this.timers) clearInterval(t);
    this.timers = [], this.started = !1;
  }
  render() {
    return om({
      frontUrl: this.frontUrl,
      backUrl: this.backUrl,
      frontVisible: this.frontVisible,
      showClock: this.config?.showClock ?? !0,
      now: this.now,
      hasImages: this.hasImages,
      folder: this.folder
    });
  }
  get folder() {
    return this.config?.folder ?? dm;
  }
  async start() {
    await this.rescan(), await this.advance();
    const t = (this.config?.interval ?? um) * 1e3, e = (this.config?.rescanMinutes ?? fm) * 6e4;
    this.timers.push(window.setInterval(() => {
      this.advance();
    }, t)), this.timers.push(window.setInterval(() => {
      this.rescan();
    }, e)), this.timers.push(window.setInterval(() => this.now = /* @__PURE__ */ new Date(), hm));
  }
  /** Ordner neu einlesen, damit neue Bilder auftauchen. */
  async rescan() {
    try {
      this.images = await rm(this.hass, this.folder), this.hasImages = this.images.length > 0;
    } catch (t) {
      console.error("Family Photos: Ordner nicht lesbar", this.folder, t), this.hasImages = !1;
    }
  }
  /** Naechstes Bild einblenden. */
  async advance() {
    if (this.images.length !== 0) {
      this.index = (this.index + 1) % this.images.length;
      try {
        const t = await im(this.hass, this.images[this.index]);
        this.frontVisible ? this.backUrl = t : this.frontUrl = t, this.frontVisible = !this.frontVisible, this.now = /* @__PURE__ */ new Date();
      } catch (t) {
        console.error("Family Photos: Bild nicht abrufbar", t);
      }
    }
  }
};
X.styles = sm;
be([
  V({ attribute: !1 })
], X.prototype, "hass", 2);
be([
  V({ attribute: !1 })
], X.prototype, "config", 2);
be([
  U()
], X.prototype, "frontUrl", 2);
be([
  U()
], X.prototype, "backUrl", 2);
be([
  U()
], X.prototype, "frontVisible", 2);
be([
  U()
], X.prototype, "hasImages", 2);
be([
  U()
], X.prototype, "now", 2);
X = be([
  dt("family-photos")
], X);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-photos",
  name: "Family Photos",
  description: "Bilderrahmen mit Uhrzeit, gespeist aus einem Ordner der Medienablage.",
  preview: !1
});
const pm = Y`
  :host {
    display: block;
    height: 100%;
    color-scheme: light;
  }

  ha-card {
    height: 100%;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    box-shadow: 0 10px 40px 0 rgba(31, 38, 135, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.5);
    overflow: hidden;
  }

  nav {
    display: flex;
    flex-direction: column;
    padding: 12px 8px;
    gap: 2px;
  }

  .item {
    /* Bezugspunkt fuer den Balken des aktiven Eintrags. */
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    /* Grosszuegige Hoehe: Das Ziel wird mit dem Daumen getroffen. */
    min-height: 52px;
    padding: 0 12px;
    border: none;
    border-radius: 14px;
    background: transparent;
    color: #5f6368;
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }

  .item:hover:not(.item--disabled) {
    background: rgba(0, 0, 0, 0.04);
    color: #1d1d1f;
  }

  /* Der aktive Bereich bekommt Farbe und einen Balken am Rand. */
  .item--active {
    background: rgba(0, 122, 255, 0.1);
    color: #0062cc;
    font-weight: 600;
  }

  .item--active::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 28px;
    border-radius: 0 3px 3px 0;
    background: #007aff;
  }

  /* Geplante Bereiche bleiben sichtbar, sind aber erkennbar noch nichts. */
  .item--disabled {
    opacity: 0.38;
    cursor: default;
  }

  .item ha-icon {
    --mdc-icon-size: 24px;
    flex: 0 0 auto;
  }

  .label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host([compact]) .item {
    justify-content: center;
    padding: 0;
  }

  :host([compact]) .label {
    display: none;
  }
`, gm = Y`
  :host {
    display: block;
    color-scheme: light;
  }

  .shell {
    display: grid;
    grid-template-columns: var(--shell-nav-width, 190px) minmax(0, 1fr);
    gap: 12px;
    align-items: start;
  }

  :host([compact]) .shell {
    grid-template-columns: 68px minmax(0, 1fr);
  }

  .content {
    min-width: 0;
  }

  /* Nicht sichtbare Bereiche bleiben im DOM und behalten ihren Zustand.
     Genau das unterscheidet die Huelle von einem Kartentausch. */
  .area[hidden] {
    display: none;
  }

  .placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 240px;
    padding: 32px;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.6);
    border: 1px dashed rgba(0, 0, 0, 0.12);
    color: #86868b;
    text-align: center;
  }

  @media (max-width: 700px) {
    .shell {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;
function mm(t) {
  return w`
    <ha-card>
      <nav>${t.items.map((e) => vm(e, t))}</nav>
    </ha-card>
  `;
}
function vm(t, e) {
  const n = e.isActive(t), r = [
    "item",
    n ? "item--active" : "",
    t.disabled ? "item--disabled" : ""
  ].filter(Boolean).join(" ");
  return w`
    <button
      class=${r}
      ?disabled=${t.disabled}
      aria-current=${n ? "page" : "false"}
      title=${t.name}
      @click=${() => e.onSelect(t)}
    >
      <ha-icon .icon=${t.icon}></ha-icon>
      <span class="label">${t.name}</span>
    </button>
  `;
}
var bm = Object.defineProperty, ym = Object.getOwnPropertyDescriptor, Ze = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? ym(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (r ? o(e, n, i) : o(i)) || i);
  return r && i && bm(e, n, i), i;
};
let pe = class extends te {
  constructor() {
    super(...arguments), this.compact = !1, this.activeId = "", this.ready = !1, this.cards = /* @__PURE__ */ new Map(), this.previousId = "", this.onActivity = () => this.noteActivity();
  }
  setConfig(t) {
    if (!t.areas?.length)
      throw new Error("Bitte mindestens einen Bereich angeben!");
    this.config = t, this.compact = t.compact ?? !1, this.activeId = t.initial ?? t.areas.find((e) => !e.disabled)?.id ?? "";
  }
  getCardSize() {
    return 12;
  }
  connectedCallback() {
    super.connectedCallback();
    for (const t of ["pointerdown", "keydown", "wheel"])
      window.addEventListener(t, this.onActivity, { passive: !0 });
    this.restartIdleTimer();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    for (const t of ["pointerdown", "keydown", "wheel"])
      window.removeEventListener(t, this.onActivity);
    this.idleTimer !== void 0 && clearTimeout(this.idleTimer);
  }
  firstUpdated() {
    this.buildAreas();
  }
  /** Legt die Karten der Bereiche einmalig an. */
  async buildAreas() {
    const t = await window.loadCardHelpers?.();
    if (!t) {
      console.error("Family Shell: Kartenhilfen von Home Assistant nicht verfügbar");
      return;
    }
    for (const e of this.config.areas) {
      if (!e.card) continue;
      const n = t.createCardElement(e.card);
      n.hass = this.hass, this.cards.set(e.id, n);
    }
    this.ready = !0;
  }
  updated(t) {
    if (t.has("hass")) {
      for (const e of this.cards.values())
        e.hass = this.hass;
      this.followSyncEntity();
    }
  }
  /** Folgt dem Auswahlhelfer, damit Automationen umschalten koennen. */
  followSyncEntity() {
    const t = this.config.syncEntity;
    if (!t) return;
    const e = this.hass?.states[t]?.state;
    !e || e === this.activeId || this.config.areas.some((n) => n.id === e && !n.path) && this.switchTo(e);
  }
  render() {
    return w`
      <div class="shell">
        ${mm({
      items: this.config.areas,
      isActive: (t) => t.id === this.activeId && !this.pathOf(t.id),
      onSelect: (t) => this.select(t.id)
    })}
        <div class="content">
          ${this.ready ? this.config.areas.map((t) => this.renderArea(t)) : ""}
        </div>
      </div>
    `;
  }
  pathOf(t) {
    return this.config.areas.find((e) => e.id === t)?.path;
  }
  renderArea(t) {
    if (t.path) return w``;
    const e = this.cards.get(t.id), n = t.id !== this.activeId;
    return e ? w`<div class="area" ?hidden=${n}>${e}</div>` : n ? w`` : w`<div class="placeholder">Dieser Bereich ist noch nicht eingerichtet.</div>`;
  }
  select(t) {
    const e = this.config.areas.find((n) => n.id === t);
    if (e) {
      if (e.path) {
        history.pushState(null, "", e.path), window.dispatchEvent(new CustomEvent("location-changed", { bubbles: !0, composed: !0 }));
        return;
      }
      t !== this.activeId && (this.switchTo(t), this.reportToSyncEntity(t));
    }
  }
  switchTo(t) {
    t !== this.activeId && (this.previousId = this.activeId, this.activeId = t, window.setTimeout(() => window.dispatchEvent(new Event("resize")), 50));
  }
  /** Schreibt den Bereich in den Auswahlhelfer zurueck. */
  reportToSyncEntity(t) {
    const e = this.config.syncEntity;
    !e || this.hass?.states[e]?.state === t || this.hass?.callService("input_select", "select_option", {
      entity_id: e,
      option: t
    });
  }
  /** Eine Bedienung holt aus dem Ruhezustand zurueck. */
  noteActivity() {
    const t = this.config.idle;
    if (t && this.activeId === t.area) {
      const e = t.returnTo ?? this.previousId;
      e && e !== t.area && (this.switchTo(e), this.reportToSyncEntity(e));
    }
    this.restartIdleTimer();
  }
  restartIdleTimer() {
    this.idleTimer !== void 0 && clearTimeout(this.idleTimer);
    const t = this.config?.idle;
    !t?.after || !t.area || (this.idleTimer = window.setTimeout(() => {
      this.activeId !== t.area && (this.switchTo(t.area), this.reportToSyncEntity(t.area));
    }, t.after * 1e3));
  }
};
pe.styles = [gm, pm];
Ze([
  V({ attribute: !1 })
], pe.prototype, "hass", 2);
Ze([
  V({ attribute: !1 })
], pe.prototype, "config", 2);
Ze([
  V({ type: Boolean, reflect: !0 })
], pe.prototype, "compact", 2);
Ze([
  U()
], pe.prototype, "activeId", 2);
Ze([
  U()
], pe.prototype, "ready", 2);
pe = Ze([
  dt("family-shell")
], pe);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-shell",
  name: "Family Shell",
  description: "Seitenleiste mit Bereichen, die beim Wechseln geladen bleiben.",
  preview: !1
});
async function Em(t, e, n) {
  return t.connection.subscribeMessage((i) => n(i.items ?? []), {
    type: "todo/item/subscribe",
    entity_id: e
  });
}
async function wm(t, e, n, r = {}) {
  await t.callService("todo", "add_item", {
    entity_id: e,
    item: n,
    ...r.dueDate ? { due_date: r.dueDate } : {},
    ...r.description ? { description: r.description } : {}
  });
}
async function Sm(t, e, n, r) {
  await t.callService("todo", "update_item", {
    entity_id: e,
    item: n.uid,
    status: r
  });
}
async function Am(t, e, n, r) {
  await t.callService("todo", "update_item", {
    entity_id: e,
    item: n.uid,
    ...r.rename !== void 0 ? { rename: r.rename } : {},
    ...r.dueDate !== void 0 ? { due_date: r.dueDate } : {},
    ...r.description !== void 0 ? { description: r.description } : {}
  });
}
async function Dm(t, e, n) {
  await t.callService("todo", "remove_item", { entity_id: e, item: n.uid });
}
async function Cm(t, e) {
  await t.callService("todo", "remove_completed_items", { entity_id: e });
}
const _m = Y`
  :host {
    display: block;
    color-scheme: light;
  }

  ha-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 10px 40px 0 rgba(31, 38, 135, 0.12);
    padding: 20px;
  }

  .card-title {
    margin: 0 0 16px;
    font-size: 1.3rem;
    font-weight: 600;
    color: #1d1d1f;
  }

  .columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    align-items: start;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.6);
  }

  .column-head {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--list-color);
  }

  .column-name {
    flex: 1;
    font-size: 1rem;
    font-weight: 600;
    color: #1d1d1f;
  }

  /* Die Zahl der offenen Punkte ist die Information, die man aus drei
     Metern Entfernung noch lesen koennen soll. */
  .column-count {
    min-width: 26px;
    padding: 2px 8px;
    border-radius: 10px;
    background: var(--list-color);
    color: white;
    font-size: 0.85rem;
    font-weight: 700;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
    /* Grosszuegig, damit der Haken mit dem Daumen sitzt. */
    min-height: 46px;
    padding: 8px 10px;
    border-radius: 12px;
    transition: background 0.15s;
  }

  .item:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  .check {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 22px;
    height: 22px;
    margin-top: 2px;
    padding: 0;
    border: 2px solid #c7c7cc;
    border-radius: 7px;
    background: transparent;
    color: white;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }

  .item--done .check {
    background: var(--list-color);
    border-color: var(--list-color);
  }

  .check ha-icon {
    --mdc-icon-size: 16px;
  }

  .item-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
    padding: 0;
    border: none;
    background: transparent;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
  }

  .item-title {
    font-size: 0.95rem;
    color: #1d1d1f;
    overflow-wrap: anywhere;
  }

  .item--done .item-title {
    color: #9aa0a6;
    text-decoration: line-through;
  }

  .item-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 10px;
    font-size: 0.78rem;
    color: #5f6368;
  }

  .item-due {
    font-size: inherit;
  }

  /* Wiederholung ist Zusatzinformation - erkennbar, aber leiser als die
     Faelligkeit, die eine Handlung verlangt. */
  .item-repeat {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    color: #86868b;
  }

  .item-repeat ha-icon {
    --mdc-icon-size: 13px;
  }

  .item--overdue .item-due {
    color: #d93025;
    font-weight: 600;
  }

  .empty {
    margin: 4px 0;
    padding: 8px 10px;
    font-size: 0.88rem;
    color: #9aa0a6;
  }

  .add {
    display: flex;
    gap: 6px;
    margin-top: 4px;
  }

  .add input {
    flex: 1;
    min-width: 0;
    min-height: 40px;
    padding: 0 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.9);
    color: #1d1d1f;
    font-family: inherit;
    font-size: 0.92rem;
  }

  .add input:focus {
    outline: none;
    border-color: var(--list-color);
  }

  .add-more {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 40px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.9);
    color: #5f6368;
    cursor: pointer;
  }

  .add-more--open {
    border-color: var(--list-color);
    color: var(--list-color);
  }

  .add-more ha-icon {
    --mdc-icon-size: 20px;
  }

  .add-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.03);
  }

  .add-details label {
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-size: 0.78rem;
    color: #5f6368;
  }

  .add-details input,
  .add-details select {
    min-height: 36px;
    padding: 0 10px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    background: white;
    color: #1d1d1f;
    font-family: inherit;
    font-size: 0.9rem;
  }

  .add-hint {
    margin: 0;
    font-size: 0.76rem;
    line-height: 1.35;
    color: #86868b;
  }

  .add-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 40px;
    height: 40px;
    border: none;
    border-radius: 12px;
    background: var(--list-color);
    color: white;
    cursor: pointer;
  }

  .add-item ha-icon {
    --mdc-icon-size: 22px;
  }

  .clear {
    align-self: flex-start;
    padding: 6px 2px;
    border: none;
    background: none;
    color: #5f6368;
    font-family: inherit;
    font-size: 0.82rem;
    text-decoration: underline;
    cursor: pointer;
  }

  /* --------------------------------------------------------- Detaildialog */

  .dialog-overlay {
    position: fixed;
    inset: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(4px);
  }

  .dialog {
    width: 100%;
    max-width: 380px;
    padding: 24px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.97);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    color: #1d1d1f;
  }

  .dialog h3 {
    margin: 0 0 2px;
    font-size: 1.15rem;
    font-weight: 600;
  }

  .dialog-list {
    margin: 0 0 18px;
    font-size: 0.82rem;
    color: #86868b;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 14px;
    font-size: 0.82rem;
    color: #5f6368;
  }

  .field input,
  .field select {
    min-height: 40px;
    padding: 0 12px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    background: white;
    color: #1d1d1f;
    font-family: inherit;
    font-size: 0.95rem;
  }

  .dialog-hint {
    margin: 0 0 18px;
    font-size: 0.78rem;
    line-height: 1.4;
    color: #86868b;
  }

  .dialog-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .dialog-actions button {
    min-height: 40px;
    padding: 0 16px;
    border: none;
    border-radius: 12px;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-delete {
    margin-right: auto;
    background: #d93025;
    color: white;
  }

  .btn-delete--confirm {
    background: #8c1d16;
  }

  .btn-cancel {
    background: rgba(0, 0, 0, 0.06);
    color: #1d1d1f;
  }

  .btn-save {
    background: var(--list-color, #0078d4);
    color: white;
  }
`, Sa = /^\[wdh:\s*([^\]]+)\]\s*$/m, xm = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"];
function Aa(t) {
  if (!t) return null;
  const e = Sa.exec(t);
  if (!e) return null;
  const n = e[1], r = as(n, "FREQ");
  if (!r || !xm.includes(r)) return null;
  const i = Number.parseInt(as(n, "INTERVAL") ?? "1", 10);
  return {
    frequency: r,
    interval: Number.isFinite(i) && i > 0 ? i : 1
  };
}
function as(t, e) {
  for (const n of t.split(";")) {
    const [r, i] = n.split("=");
    if (r?.trim().toUpperCase() === e) return i?.trim().toUpperCase();
  }
}
function Da(t) {
  return t ? t.replace(Sa, "").trim() : "";
}
function ls(t, e, n = 1) {
  const r = Da(t);
  if (!e) return r;
  const i = n > 1 ? `FREQ=${e};INTERVAL=${n}` : `FREQ=${e}`;
  return r ? `${r}

[wdh: ${i}]` : `[wdh: ${i}]`;
}
const Rm = {
  DAILY: "Täglich",
  WEEKLY: "Wöchentlich",
  MONTHLY: "Monatlich",
  YEARLY: "Jährlich"
}, Tm = {
  DAILY: "Tage",
  WEEKLY: "Wochen",
  MONTHLY: "Monate",
  YEARLY: "Jahre"
};
function cs(t) {
  return t.interval <= 1 ? Rm[t.frequency] ?? "Wiederholt" : `Alle ${t.interval} ${Tm[t.frequency] ?? "Male"}`;
}
const St = (t) => t.target.value;
function km(t) {
  return w`
    <div class="dialog-overlay" @click=${() => t.onCancel()}>
      <div class="dialog" @click=${(e) => e.stopPropagation()}>
        <h3>Aufgabe</h3>
        <p class="dialog-list">${t.listName}</p>

        <label class="field">
          Titel
          <input type="text" .value=${t.title} @input=${(e) => t.onTitle(St(e))} />
        </label>

        <label class="field">
          Fällig am
          <input type="date" .value=${t.due} @input=${(e) => t.onDue(St(e))} />
        </label>

        <label class="field">
          Wiederholung
          <select
            .value=${t.frequency}
            @change=${(e) => t.onFrequency(St(e))}
          >
            <option value="">Keine</option>
            <option value="DAILY">Täglich</option>
            <option value="WEEKLY">Wöchentlich</option>
            <option value="MONTHLY">Monatlich</option>
            <option value="YEARLY">Jährlich</option>
          </select>
        </label>

        ${t.frequency ? w`
              <label class="field">
                Alle … Male
                <input
                  type="number"
                  min="1"
                  max="30"
                  .value=${String(t.interval)}
                  @input=${(e) => t.onInterval(Math.max(1, Number.parseInt(St(e), 10) || 1))}
                />
              </label>
              <p class="dialog-hint">
                Nach dem Abhaken erscheint die Aufgabe automatisch wieder.
              </p>
            ` : w`
              <p class="dialog-hint">
                Ohne Wiederholung bleibt die Aufgabe nach dem Abhaken erledigt.
              </p>
            `}

        <div class="dialog-actions">
          ${t.confirmDelete ? w`
                <button class="btn-delete btn-delete--confirm" @click=${() => t.onDelete()}>
                  Wirklich löschen?
                </button>
              ` : w`
                <button class="btn-delete" @click=${() => t.onConfirmDelete()}>Löschen</button>
              `}
          <button class="btn-cancel" @click=${() => t.onCancel()}>Abbrechen</button>
          <button class="btn-save" @click=${() => t.onSave()}>Speichern</button>
        </div>
      </div>
    </div>
  `;
}
function Zt(t) {
  if (!t.due) return null;
  const e = new Date(t.due.length === 10 ? `${t.due}T00:00:00` : t.due);
  return Number.isNaN(e.getTime()) ? null : e;
}
function Mm(t, e = /* @__PURE__ */ new Date()) {
  if (t.status === "completed") return !1;
  const n = Zt(t);
  if (!n) return !1;
  const r = new Date(e);
  return r.setHours(0, 0, 0, 0), n < r;
}
function Im(t, e = /* @__PURE__ */ new Date()) {
  const n = Zt(t);
  if (!n) return null;
  const r = Math.round(
    (new Date(n).setHours(0, 0, 0, 0) - new Date(e).setHours(0, 0, 0, 0)) / 864e5
  );
  return r < 0 ? r === -1 ? "Gestern" : `${Math.abs(r)} Tage überfällig` : r === 0 ? "Heute" : r === 1 ? "Morgen" : r < 7 ? n.toLocaleDateString("de-DE", { weekday: "long" }) : n.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
}
function Nm(t) {
  return [...t].sort((e, n) => {
    if (e.status !== n.status) return e.status === "completed" ? 1 : -1;
    const r = Zt(e), i = Zt(n);
    return r && i ? r.getTime() - i.getTime() : r ? -1 : i ? 1 : e.summary.localeCompare(n.summary, "de");
  });
}
function Om(t) {
  return t.filter((e) => e.status !== "completed").length;
}
const Pm = {
  text: "",
  due: "",
  frequency: "",
  interval: 1,
  expanded: !1
};
function $m(t) {
  return w`
    <ha-card>
      ${t.title ? w`<h2 class="card-title">${t.title}</h2>` : ""}
      <div class="columns">${t.lists.map((e) => Hm(e, t))}</div>
    </ha-card>
  `;
}
function Hm(t, e) {
  const n = e.items.get(t.entity) ?? [], r = e.showCompleted ? n : n.filter((o) => o.status !== "completed"), i = Om(n), s = n.length - i;
  return w`
    <section class="column" style="--list-color: ${t.color ?? "#0078d4"}">
      <header class="column-head">
        <span class="column-name">${t.name ?? e.nameOf(t.entity)}</span>
        <span class="column-count" title="offen">${i}</span>
      </header>

      <div class="items">
        ${r.length === 0 ? w`<p class="empty">${e.showDue ? "Nichts offen" : "Liste ist leer"}</p>` : Nm(r).map((o) => Bm(t, o, e))}
      </div>

      ${Lm(t, e)}

      ${e.showCompleted && s > 0 ? w`
            <button class="clear" @click=${() => e.onClearCompleted(t.entity)}>
              ${s} erledigte entfernen
            </button>
          ` : ""}
    </section>
  `;
}
function Bm(t, e, n) {
  const r = e.status === "completed", i = n.showDue ? Im(e) : null, s = Aa(e.description);
  return w`
    <div class="item ${r ? "item--done" : ""} ${Mm(e) ? "item--overdue" : ""}">
      <button
        class="check"
        aria-label=${r ? "Wieder öffnen" : "Abhaken"}
        @click=${() => n.onToggle(t.entity, e)}
      >
        ${r ? w`<ha-icon icon="mdi:check"></ha-icon>` : ""}
      </button>
      <button class="item-body" title="Ändern" @click=${() => n.onOpen(t.entity, e)}>
        <span class="item-title">${e.summary}</span>
        ${i || s ? w`
              <span class="item-meta">
                ${i ? w`<span class="item-due">${i}</span>` : ""}
                ${s ? w`
                      <span class="item-repeat" title=${cs(s)}>
                        <ha-icon icon="mdi:repeat"></ha-icon>
                        ${cs(s)}
                      </span>
                    ` : ""}
              </span>
            ` : ""}
      </button>
    </div>
  `;
}
function Lm(t, e) {
  const n = e.drafts.get(t.entity) ?? Pm, r = (i) => i.target.value;
  return w`
    <div class="add">
      <input
        type="text"
        placeholder=${e.showDue ? "Neue Aufgabe…" : "Neuer Eintrag…"}
        .value=${n.text}
        @input=${(i) => e.onDraft(t.entity, { text: r(i) })}
        @keydown=${(i) => i.key === "Enter" && e.onAdd(t.entity)}
      />
      ${e.showDue ? w`
            <button
              class="add-more ${n.expanded ? "add-more--open" : ""}"
              aria-label="Termin und Wiederholung"
              title="Termin und Wiederholung"
              @click=${() => e.onDraft(t.entity, { expanded: !n.expanded })}
            >
              <ha-icon icon="mdi:tune-variant"></ha-icon>
            </button>
          ` : ""}
      <button class="add-item" aria-label="Hinzufügen" @click=${() => e.onAdd(t.entity)}>
        <ha-icon icon="mdi:plus"></ha-icon>
      </button>
    </div>

    ${e.showDue && n.expanded ? zm(t, n, e) : ""}
  `;
}
function zm(t, e, n) {
  const r = (i) => i.target.value;
  return w`
    <div class="add-details">
      <label>
        Fällig am
        <input
          type="date"
          .value=${e.due}
          @input=${(i) => n.onDraft(t.entity, { due: r(i) })}
        />
      </label>
      <label>
        Wiederholung
        <select
          .value=${e.frequency}
          @change=${(i) => n.onDraft(t.entity, { frequency: r(i) })}
        >
          <option value="">Keine</option>
          <option value="DAILY">Täglich</option>
          <option value="WEEKLY">Wöchentlich</option>
          <option value="MONTHLY">Monatlich</option>
          <option value="YEARLY">Jährlich</option>
        </select>
      </label>
      ${e.frequency ? w`
            <label>
              Alle … Male
              <input
                type="number"
                min="1"
                max="30"
                .value=${String(e.interval)}
                @input=${(i) => n.onDraft(t.entity, {
    interval: Math.max(1, Number.parseInt(r(i), 10) || 1)
  })}
              />
            </label>
            <p class="add-hint">
              Nach dem Abhaken erscheint die Aufgabe automatisch wieder.
            </p>
          ` : ""}
    </div>
  `;
}
var Um = Object.defineProperty, Fm = Object.getOwnPropertyDescriptor, Ke = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Fm(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (i = (r ? o(e, n, i) : o(i)) || i);
  return r && i && Um(e, n, i), i;
};
let ge = class extends te {
  constructor() {
    super(...arguments), this.items = /* @__PURE__ */ new Map(), this.drafts = /* @__PURE__ */ new Map(), this.open = null, this.unsubscribes = [], this.subscribed = !1;
  }
  setConfig(t) {
    if (!t.lists?.length)
      throw new Error("Bitte mindestens eine Liste angeben!");
    this.config = t;
  }
  getCardSize() {
    return 8;
  }
  updated(t) {
    t.has("hass") && this.hass && !this.subscribed && (this.subscribed = !0, this.subscribeAll());
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    for (const t of this.unsubscribes) t();
    this.unsubscribes = [], this.subscribed = !1;
  }
  render() {
    return w`${this.renderCard()}${this.renderDialog()}`;
  }
  renderDialog() {
    const t = this.open;
    if (!t) return $;
    const e = this.config.lists.find((r) => r.entity === t.entityId), n = (r) => {
      this.open && (this.open = { ...this.open, ...r });
    };
    return km({
      title: t.title,
      due: t.due,
      frequency: t.frequency,
      interval: t.interval,
      listName: e?.name ?? this.nameOf(t.entityId),
      confirmDelete: t.confirmDelete,
      onTitle: (r) => n({ title: r }),
      onDue: (r) => n({ due: r }),
      onFrequency: (r) => n({ frequency: r }),
      onInterval: (r) => n({ interval: r }),
      onConfirmDelete: () => n({ confirmDelete: !0 }),
      onDelete: () => {
        this.deleteOpen();
      },
      onCancel: () => this.open = null,
      onSave: () => {
        this.saveOpen();
      }
    });
  }
  nameOf(t) {
    return this.hass?.states[t]?.attributes?.friendly_name ?? t;
  }
  renderCard() {
    return $m({
      lists: this.config.lists,
      items: this.items,
      drafts: this.drafts,
      showCompleted: this.config.showCompleted ?? !1,
      showDue: this.config.showDue ?? !0,
      title: this.config.title,
      nameOf: (t) => this.nameOf(t),
      onToggle: (t, e) => {
        this.toggle(t, e);
      },
      onOpen: (t, e) => this.openItem(t, e),
      onDraft: (t, e) => this.patchDraft(t, e),
      onAdd: (t) => {
        this.add(t);
      },
      onClearCompleted: (t) => {
        Cm(this.hass, t);
      }
    });
  }
  async subscribeAll() {
    for (const t of this.config.lists)
      try {
        const e = await Em(this.hass, t.entity, (n) => {
          this.items = new Map(this.items).set(t.entity, n);
        });
        this.unsubscribes.push(e);
      } catch (e) {
        console.error("Family Tasks: Liste nicht erreichbar", t.entity, e);
      }
  }
  async toggle(t, e) {
    const n = e.status === "completed" ? "needs_action" : "completed";
    try {
      await Sm(this.hass, t, e, n);
    } catch (r) {
      console.error("Family Tasks: Status liess sich nicht aendern", r), this.notify("Die Aufgabe ließ sich nicht ändern.");
    }
  }
  draftOf(t) {
    return this.drafts.get(t) ?? {
      text: "",
      due: "",
      frequency: "",
      interval: 1,
      expanded: !1
    };
  }
  patchDraft(t, e) {
    this.drafts = new Map(this.drafts).set(t, {
      ...this.draftOf(t),
      ...e
    });
  }
  async add(t) {
    const e = this.draftOf(t), n = e.text.trim();
    if (n) {
      this.patchDraft(t, { text: "", due: "", frequency: "", interval: 1 });
      try {
        await wm(this.hass, t, n, {
          dueDate: e.due || void 0,
          // Die Wiederholung reist in der Beschreibung mit - die Integration
          // liest sie beim Abhaken und legt die naechste Aufgabe an.
          description: e.frequency ? ls("", e.frequency, e.interval) : void 0
        });
      } catch (r) {
        console.error("Family Tasks: Anlegen fehlgeschlagen", r), this.patchDraft(t, e), this.notify("Die Aufgabe ließ sich nicht anlegen.");
      }
    }
  }
  /** Detailansicht mit den aktuellen Werten fuellen. */
  openItem(t, e) {
    const n = Aa(e.description);
    this.open = {
      entityId: t,
      item: e,
      title: e.summary,
      due: e.due ? e.due.slice(0, 10) : "",
      frequency: n?.frequency ?? "",
      interval: n?.interval ?? 1,
      confirmDelete: !1
    };
  }
  async saveOpen() {
    const t = this.open;
    if (!t) return;
    const e = t.title.trim();
    if (!e) return this.notify("Bitte einen Titel eingeben.");
    const n = Da(t.item.description), r = ls(n, t.frequency, t.interval);
    this.open = null;
    try {
      await Am(this.hass, t.entityId, t.item, {
        rename: e,
        dueDate: t.due || void 0,
        description: r
      });
    } catch (i) {
      console.error("Family Tasks: Aendern fehlgeschlagen", i), this.notify("Die Aufgabe ließ sich nicht ändern.");
    }
  }
  async deleteOpen() {
    const t = this.open;
    if (t) {
      this.open = null;
      try {
        await Dm(this.hass, t.entityId, t.item);
      } catch (e) {
        console.error("Family Tasks: Löschen fehlgeschlagen", e), this.notify("Die Aufgabe ließ sich nicht löschen.");
      }
    }
  }
  notify(t) {
    this.dispatchEvent(
      new CustomEvent("hass-notification", {
        detail: { message: t },
        bubbles: !0,
        composed: !0
      })
    );
  }
};
ge.styles = _m;
Ke([
  V({ attribute: !1 })
], ge.prototype, "hass", 2);
Ke([
  V({ attribute: !1 })
], ge.prototype, "config", 2);
Ke([
  U()
], ge.prototype, "items", 2);
Ke([
  U()
], ge.prototype, "drafts", 2);
Ke([
  U()
], ge.prototype, "open", 2);
ge = Ke([
  dt("family-tasks")
], ge);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-tasks",
  name: "Family Tasks",
  description: "Aufgaben- und Einkaufslisten nebeneinander, mit Abhaken und Anlegen.",
  preview: !1
});
