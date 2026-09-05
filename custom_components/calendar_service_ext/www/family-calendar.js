const ft = globalThis, In = ft.ShadowRoot && (ft.ShadyCSS === void 0 || ft.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Nn = /* @__PURE__ */ Symbol(), Er = /* @__PURE__ */ new WeakMap();
let ji = class {
  constructor(e, n, r) {
    if (this._$cssResult$ = !0, r !== Nn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (In && e === void 0) {
      const r = n !== void 0 && n.length === 1;
      r && (e = Er.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Er.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ql = (t) => new ji(typeof t == "string" ? t : t + "", void 0, Nn), Ue = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((r, i, s) => r + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[s + 1], t[0]);
  return new ji(n, t, Nn);
}, Zl = (t, e) => {
  if (In) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const r = document.createElement("style"), i = ft.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = n.cssText, t.appendChild(r);
  }
}, Sr = In ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const r of e.cssRules) n += r.cssText;
  return Ql(n);
})(t) : t;
const { is: Xl, defineProperty: Kl, getOwnPropertyDescriptor: Jl, getOwnPropertyNames: eo, getOwnPropertySymbols: to, getPrototypeOf: no } = Object, $t = globalThis, Ar = $t.trustedTypes, ro = Ar ? Ar.emptyScript : "", io = $t.reactiveElementPolyfillSupport, Ge = (t, e) => t, yt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ro : null;
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
} }, On = (t, e) => !Xl(t, e), wr = { attribute: !0, type: String, converter: yt, reflect: !1, useDefault: !1, hasChanged: On };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), $t.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let De = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = wr) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, r, n);
      i !== void 0 && Kl(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, n, r) {
    const { get: i, set: s } = Jl(this.prototype, e) ?? { get() {
      return this[n];
    }, set(l) {
      this[n] = l;
    } };
    return { get: i, set(l) {
      const o = i?.call(this);
      s?.call(this, l), this.requestUpdate(e, o, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? wr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ge("elementProperties"))) return;
    const e = no(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ge("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ge("properties"))) {
      const n = this.properties, r = [...eo(n), ...to(n)];
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
      for (const i of r) n.unshift(Sr(i));
    } else e !== void 0 && n.push(Sr(e));
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
    return Zl(e, this.constructor.elementStyles), e;
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
      const s = (r.converter?.toAttribute !== void 0 ? r.converter : yt).toAttribute(n, r.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, n) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const s = r.getPropertyOptions(i), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : yt;
      this._$Em = i;
      const o = l.fromAttribute(n, s.type);
      this[i] = o ?? this._$Ej?.get(i) ?? o, this._$Em = null;
    }
  }
  requestUpdate(e, n, r, i = !1, s) {
    if (e !== void 0) {
      const l = this.constructor;
      if (i === !1 && (s = this[e]), r ??= l.getPropertyOptions(e), !((r.hasChanged ?? On)(s, n) || r.useDefault && r.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(l._$Eu(e, r)))) return;
      this.C(e, n, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: r, reflect: i, wrapped: s }, l) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, l ?? n ?? this[e]), s !== !0 || l !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (n = void 0), this._$AL.set(e, n)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        const { wrapped: l } = s, o = this[i];
        l !== !0 || this._$AL.has(i) || o === void 0 || this.C(i, void 0, s, o);
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
De.elementStyles = [], De.shadowRootOptions = { mode: "open" }, De[Ge("elementProperties")] = /* @__PURE__ */ new Map(), De[Ge("finalized")] = /* @__PURE__ */ new Map(), io?.({ ReactiveElement: De }), ($t.reactiveElementVersions ??= []).push("2.1.2");
const Pn = globalThis, Cr = (t) => t, Et = Pn.trustedTypes, Dr = Et ? Et.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Wi = "$lit$", ne = `lit$${Math.random().toFixed(9).slice(2)}$`, Vi = "?" + ne, so = `<${Vi}>`, ve = document, Ze = () => ve.createComment(""), Xe = (t) => t === null || typeof t != "object" && typeof t != "function", Hn = Array.isArray, lo = (t) => Hn(t) || typeof t?.[Symbol.iterator] == "function", Zt = `[ 	
\f\r]`, We = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _r = /-->/g, Rr = />/g, de = RegExp(`>|${Zt}(?:([^\\s"'>=/]+)(${Zt}*=${Zt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Tr = /'/g, xr = /"/g, Gi = /^(?:script|style|textarea|title)$/i, oo = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), B = oo(1), Oe = /* @__PURE__ */ Symbol.for("lit-noChange"), P = /* @__PURE__ */ Symbol.for("lit-nothing"), kr = /* @__PURE__ */ new WeakMap(), ge = ve.createTreeWalker(ve, 129);
function qi(t, e) {
  if (!Hn(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Dr !== void 0 ? Dr.createHTML(e) : e;
}
const ao = (t, e) => {
  const n = t.length - 1, r = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", l = We;
  for (let o = 0; o < n; o++) {
    const a = t[o];
    let d, c, f = -1, h = 0;
    for (; h < a.length && (l.lastIndex = h, c = l.exec(a), c !== null); ) h = l.lastIndex, l === We ? c[1] === "!--" ? l = _r : c[1] !== void 0 ? l = Rr : c[2] !== void 0 ? (Gi.test(c[2]) && (i = RegExp("</" + c[2], "g")), l = de) : c[3] !== void 0 && (l = de) : l === de ? c[0] === ">" ? (l = i ?? We, f = -1) : c[1] === void 0 ? f = -2 : (f = l.lastIndex - c[2].length, d = c[1], l = c[3] === void 0 ? de : c[3] === '"' ? xr : Tr) : l === xr || l === Tr ? l = de : l === _r || l === Rr ? l = We : (l = de, i = void 0);
    const u = l === de && t[o + 1].startsWith("/>") ? " " : "";
    s += l === We ? a + so : f >= 0 ? (r.push(d), a.slice(0, f) + Wi + a.slice(f) + ne + u) : a + ne + (f === -2 ? o : u);
  }
  return [qi(t, s + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
let mn = class Yi {
  constructor({ strings: e, _$litType$: n }, r) {
    let i;
    this.parts = [];
    let s = 0, l = 0;
    const o = e.length - 1, a = this.parts, [d, c] = ao(e, n);
    if (this.el = Yi.createElement(d, r), ge.currentNode = this.el.content, n === 2 || n === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (i = ge.nextNode()) !== null && a.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const f of i.getAttributeNames()) if (f.endsWith(Wi)) {
          const h = c[l++], u = i.getAttribute(f).split(ne), p = /([.?@])?(.*)/.exec(h);
          a.push({ type: 1, index: s, name: p[2], strings: u, ctor: p[1] === "." ? uo : p[1] === "?" ? fo : p[1] === "@" ? ho : Lt }), i.removeAttribute(f);
        } else f.startsWith(ne) && (a.push({ type: 6, index: s }), i.removeAttribute(f));
        if (Gi.test(i.tagName)) {
          const f = i.textContent.split(ne), h = f.length - 1;
          if (h > 0) {
            i.textContent = Et ? Et.emptyScript : "";
            for (let u = 0; u < h; u++) i.append(f[u], Ze()), ge.nextNode(), a.push({ type: 2, index: ++s });
            i.append(f[h], Ze());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Vi) a.push({ type: 2, index: s });
      else {
        let f = -1;
        for (; (f = i.data.indexOf(ne, f + 1)) !== -1; ) a.push({ type: 7, index: s }), f += ne.length - 1;
      }
      s++;
    }
  }
  static createElement(e, n) {
    const r = ve.createElement("template");
    return r.innerHTML = e, r;
  }
};
function Pe(t, e, n = t, r) {
  if (e === Oe) return e;
  let i = r !== void 0 ? n._$Co?.[r] : n._$Cl;
  const s = Xe(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== s && (i?._$AO?.(!1), s === void 0 ? i = void 0 : (i = new s(t), i._$AT(t, n, r)), r !== void 0 ? (n._$Co ??= [])[r] = i : n._$Cl = i), i !== void 0 && (e = Pe(t, i._$AS(t, e.values), i, r)), e;
}
class co {
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
    const { el: { content: n }, parts: r } = this._$AD, i = (e?.creationScope ?? ve).importNode(n, !0);
    ge.currentNode = i;
    let s = ge.nextNode(), l = 0, o = 0, a = r[0];
    for (; a !== void 0; ) {
      if (l === a.index) {
        let d;
        a.type === 2 ? d = new Bn(s, s.nextSibling, this, e) : a.type === 1 ? d = new a.ctor(s, a.name, a.strings, this, e) : a.type === 6 && (d = new go(s, this, e)), this._$AV.push(d), a = r[++o];
      }
      l !== a?.index && (s = ge.nextNode(), l++);
    }
    return ge.currentNode = ve, i;
  }
  p(e) {
    let n = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, n), n += r.strings.length - 2) : r._$AI(e[n])), n++;
  }
}
let Bn = class Qi {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, n, r, i) {
    this.type = 2, this._$AH = P, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    e = Pe(this, e, n), Xe(e) ? e === P || e == null || e === "" ? (this._$AH !== P && this._$AR(), this._$AH = P) : e !== this._$AH && e !== Oe && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : lo(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== P && Xe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ve.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: n, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = mn.createElement(qi(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(n);
    else {
      const s = new co(i, this), l = s.u(this.options);
      s.p(n), this.T(l), this._$AH = s;
    }
  }
  _$AC(e) {
    let n = kr.get(e.strings);
    return n === void 0 && kr.set(e.strings, n = new mn(e)), n;
  }
  k(e) {
    Hn(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let r, i = 0;
    for (const s of e) i === n.length ? n.push(r = new Qi(this.O(Ze()), this.O(Ze()), this, this.options)) : r = n[i], r._$AI(s), i++;
    i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); e !== this._$AB; ) {
      const r = Cr(e).nextSibling;
      Cr(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}, Lt = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, r, i, s) {
    this.type = 1, this._$AH = P, this._$AN = void 0, this.element = e, this.name = n, this._$AM = i, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = P;
  }
  _$AI(e, n = this, r, i) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) e = Pe(this, e, n, 0), l = !Xe(e) || e !== this._$AH && e !== Oe, l && (this._$AH = e);
    else {
      const o = e;
      let a, d;
      for (e = s[0], a = 0; a < s.length - 1; a++) d = Pe(this, o[r + a], n, a), d === Oe && (d = this._$AH[a]), l ||= !Xe(d) || d !== this._$AH[a], d === P ? e = P : e !== P && (e += (d ?? "") + s[a + 1]), this._$AH[a] = d;
    }
    l && !i && this.j(e);
  }
  j(e) {
    e === P ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}, uo = class extends Lt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === P ? void 0 : e;
  }
}, fo = class extends Lt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== P);
  }
}, ho = class extends Lt {
  constructor(e, n, r, i, s) {
    super(e, n, r, i, s), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = Pe(this, e, n, 0) ?? P) === Oe) return;
    const r = this._$AH, i = e === P && r !== P || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, s = e !== P && (r === P || i);
    i && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}, go = class {
  constructor(e, n, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Pe(this, e);
  }
};
const po = Pn.litHtmlPolyfillSupport;
po?.(mn, Bn), (Pn.litHtmlVersions ??= []).push("3.3.2");
const mo = (t, e, n) => {
  const r = n?.renderBefore ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const s = n?.renderBefore ?? null;
    r._$litPart$ = i = new Bn(e.insertBefore(Ze(), s), s, void 0, n ?? {});
  }
  return i._$AI(t), i;
};
const $n = globalThis;
let xe = class extends De {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = mo(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Oe;
  }
};
xe._$litElement$ = !0, xe.finalized = !0, $n.litElementHydrateSupport?.({ LitElement: xe });
const vo = $n.litElementPolyfillSupport;
vo?.({ LitElement: xe });
($n.litElementVersions ??= []).push("4.2.2");
const Zi = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const bo = { attribute: !0, type: String, converter: yt, reflect: !1, hasChanged: On }, yo = (t = bo, e, n) => {
  const { kind: r, metadata: i } = n;
  let s = globalThis.litPropertyMetadata.get(i);
  if (s === void 0 && globalThis.litPropertyMetadata.set(i, s = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(n.name, t), r === "accessor") {
    const { name: l } = n;
    return { set(o) {
      const a = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(l, a, t, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(l, void 0, t, o), o;
    } };
  }
  if (r === "setter") {
    const { name: l } = n;
    return function(o) {
      const a = this[l];
      e.call(this, o), this.requestUpdate(l, a, t, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function tt(t) {
  return (e, n) => typeof n == "object" ? yo(t, e, n) : ((r, i, s) => {
    const l = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, r), l ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(t, e, n);
}
function Ut(t) {
  return tt({ ...t, state: !0, attribute: !1 });
}
const Eo = (t, e, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, n), n);
function So(t, e) {
  return (n, r, i) => {
    const s = (l) => l.renderRoot?.querySelector(t) ?? null;
    return Eo(n, r, { get() {
      return s(this);
    } });
  };
}
var zt, S, Xi, Ki, He, he, Mr, Ji, es, St = {}, ts = [], Ao = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function re(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function ns(t) {
  var e = t.parentNode;
  e && e.removeChild(t);
}
function g(t, e, n) {
  var r, i, s, l = {};
  for (s in e) s == "key" ? r = e[s] : s == "ref" ? i = e[s] : l[s] = e[s];
  if (arguments.length > 2 && (l.children = arguments.length > 3 ? zt.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null) for (s in t.defaultProps) l[s] === void 0 && (l[s] = t.defaultProps[s]);
  return ht(t, l, r, i, null);
}
function ht(t, e, n, r, i) {
  var s = { type: t, props: e, key: n, ref: r, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: i ?? ++Xi };
  return i == null && S.vnode != null && S.vnode(s), s;
}
function L() {
  return { current: null };
}
function x(t) {
  return t.children;
}
function wo(t, e, n, r, i) {
  var s;
  for (s in n) s === "children" || s === "key" || s in e || At(t, s, null, n[s], r);
  for (s in e) i && typeof e[s] != "function" || s === "children" || s === "key" || s === "value" || s === "checked" || n[s] === e[s] || At(t, s, e[s], n[s], r);
}
function Ir(t, e, n) {
  e[0] === "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || Ao.test(e) ? n : n + "px";
}
function At(t, e, n, r, i) {
  var s;
  e: if (e === "style") if (typeof n == "string") t.style.cssText = n;
  else {
    if (typeof r == "string" && (t.style.cssText = r = ""), r) for (e in r) n && e in n || Ir(t.style, e, "");
    if (n) for (e in n) r && n[e] === r[e] || Ir(t.style, e, n[e]);
  }
  else if (e[0] === "o" && e[1] === "n") s = e !== (e = e.replace(/Capture$/, "")), e = e.toLowerCase() in t ? e.toLowerCase().slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + s] = n, n ? r || t.addEventListener(e, s ? Or : Nr, s) : t.removeEventListener(e, s ? Or : Nr, s);
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
function Nr(t) {
  He = !0;
  try {
    return this.l[t.type + !1](S.event ? S.event(t) : t);
  } finally {
    He = !1;
  }
}
function Or(t) {
  He = !0;
  try {
    return this.l[t.type + !0](S.event ? S.event(t) : t);
  } finally {
    He = !1;
  }
}
function z(t, e) {
  this.props = t, this.context = e;
}
function Ke(t, e) {
  if (e == null) return t.__ ? Ke(t.__, t.__.__k.indexOf(t) + 1) : null;
  for (var n; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) return n.__e;
  return typeof t.type == "function" ? Ke(t) : null;
}
function rs(t) {
  var e, n;
  if ((t = t.__) != null && t.__c != null) {
    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) {
      t.__e = t.__c.base = n.__e;
      break;
    }
    return rs(t);
  }
}
function Co(t) {
  He ? setTimeout(t) : Ji(t);
}
function vn(t) {
  (!t.__d && (t.__d = !0) && he.push(t) && !wt.__r++ || Mr !== S.debounceRendering) && ((Mr = S.debounceRendering) || Co)(wt);
}
function wt() {
  var t, e, n, r, i, s, l, o;
  for (he.sort(function(a, d) {
    return a.__v.__b - d.__v.__b;
  }); t = he.shift(); ) t.__d && (e = he.length, r = void 0, i = void 0, l = (s = (n = t).__v).__e, (o = n.__P) && (r = [], (i = re({}, s)).__v = s.__v + 1, Ln(o, s, i, n.__n, o.ownerSVGElement !== void 0, s.__h != null ? [l] : null, r, l ?? Ke(s), s.__h), as(r, s), s.__e != l && rs(s)), he.length > e && he.sort(function(a, d) {
    return a.__v.__b - d.__v.__b;
  }));
  wt.__r = 0;
}
function is(t, e, n, r, i, s, l, o, a, d) {
  var c, f, h, u, p, v, b, y = r && r.__k || ts, E = y.length;
  for (n.__k = [], c = 0; c < e.length; c++) if ((u = n.__k[c] = (u = e[c]) == null || typeof u == "boolean" ? null : typeof u == "string" || typeof u == "number" || typeof u == "bigint" ? ht(null, u, null, null, u) : Array.isArray(u) ? ht(x, { children: u }, null, null, null) : u.__b > 0 ? ht(u.type, u.props, u.key, u.ref ? u.ref : null, u.__v) : u) != null) {
    if (u.__ = n, u.__b = n.__b + 1, (h = y[c]) === null || h && u.key == h.key && u.type === h.type) y[c] = void 0;
    else for (f = 0; f < E; f++) {
      if ((h = y[f]) && u.key == h.key && u.type === h.type) {
        y[f] = void 0;
        break;
      }
      h = null;
    }
    Ln(t, u, h = h || St, i, s, l, o, a, d), p = u.__e, (f = u.ref) && h.ref != f && (b || (b = []), h.ref && b.push(h.ref, null, u), b.push(f, u.__c || p, u)), p != null ? (v == null && (v = p), typeof u.type == "function" && u.__k === h.__k ? u.__d = a = ss(u, a, t) : a = ls(t, u, h, y, p, a), typeof n.type == "function" && (n.__d = a)) : a && h.__e == a && a.parentNode != t && (a = Ke(h));
  }
  for (n.__e = v, c = E; c--; ) y[c] != null && (typeof n.type == "function" && y[c].__e != null && y[c].__e == n.__d && (n.__d = os(r).nextSibling), ds(y[c], y[c]));
  if (b) for (c = 0; c < b.length; c++) cs(b[c], b[++c], b[++c]);
}
function ss(t, e, n) {
  for (var r, i = t.__k, s = 0; i && s < i.length; s++) (r = i[s]) && (r.__ = t, e = typeof r.type == "function" ? ss(r, e, n) : ls(n, r, r, i, r.__e, e));
  return e;
}
function Ct(t, e) {
  return e = e || [], t == null || typeof t == "boolean" || (Array.isArray(t) ? t.some(function(n) {
    Ct(n, e);
  }) : e.push(t)), e;
}
function ls(t, e, n, r, i, s) {
  var l, o, a;
  if (e.__d !== void 0) l = e.__d, e.__d = void 0;
  else if (n == null || i != s || i.parentNode == null) e: if (s == null || s.parentNode !== t) t.appendChild(i), l = null;
  else {
    for (o = s, a = 0; (o = o.nextSibling) && a < r.length; a += 1) if (o == i) break e;
    t.insertBefore(i, s), l = s;
  }
  return l !== void 0 ? l : i.nextSibling;
}
function os(t) {
  var e, n, r;
  if (t.type == null || typeof t.type == "string") return t.__e;
  if (t.__k) {
    for (e = t.__k.length - 1; e >= 0; e--) if ((n = t.__k[e]) && (r = os(n))) return r;
  }
  return null;
}
function Ln(t, e, n, r, i, s, l, o, a) {
  var d, c, f, h, u, p, v, b, y, E, w, C, O, T, M, _ = e.type;
  if (e.constructor !== void 0) return null;
  n.__h != null && (a = n.__h, o = e.__e = n.__e, e.__h = null, s = [o]), (d = S.__b) && d(e);
  try {
    e: if (typeof _ == "function") {
      if (b = e.props, y = (d = _.contextType) && r[d.__c], E = d ? y ? y.props.value : d.__ : r, n.__c ? v = (c = e.__c = n.__c).__ = c.__E : ("prototype" in _ && _.prototype.render ? e.__c = c = new _(b, E) : (e.__c = c = new z(b, E), c.constructor = _, c.render = _o), y && y.sub(c), c.props = b, c.state || (c.state = {}), c.context = E, c.__n = r, f = c.__d = !0, c.__h = [], c._sb = []), c.__s == null && (c.__s = c.state), _.getDerivedStateFromProps != null && (c.__s == c.state && (c.__s = re({}, c.__s)), re(c.__s, _.getDerivedStateFromProps(b, c.__s))), h = c.props, u = c.state, c.__v = e, f) _.getDerivedStateFromProps == null && c.componentWillMount != null && c.componentWillMount(), c.componentDidMount != null && c.__h.push(c.componentDidMount);
      else {
        if (_.getDerivedStateFromProps == null && b !== h && c.componentWillReceiveProps != null && c.componentWillReceiveProps(b, E), !c.__e && c.shouldComponentUpdate != null && c.shouldComponentUpdate(b, c.__s, E) === !1 || e.__v === n.__v) {
          for (e.__v !== n.__v && (c.props = b, c.state = c.__s, c.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.forEach(function(te) {
            te && (te.__ = e);
          }), w = 0; w < c._sb.length; w++) c.__h.push(c._sb[w]);
          c._sb = [], c.__h.length && l.push(c);
          break e;
        }
        c.componentWillUpdate != null && c.componentWillUpdate(b, c.__s, E), c.componentDidUpdate != null && c.__h.push(function() {
          c.componentDidUpdate(h, u, p);
        });
      }
      if (c.context = E, c.props = b, c.__P = t, C = S.__r, O = 0, "prototype" in _ && _.prototype.render) {
        for (c.state = c.__s, c.__d = !1, C && C(e), d = c.render(c.props, c.state, c.context), T = 0; T < c._sb.length; T++) c.__h.push(c._sb[T]);
        c._sb = [];
      } else do
        c.__d = !1, C && C(e), d = c.render(c.props, c.state, c.context), c.state = c.__s;
      while (c.__d && ++O < 25);
      c.state = c.__s, c.getChildContext != null && (r = re(re({}, r), c.getChildContext())), f || c.getSnapshotBeforeUpdate == null || (p = c.getSnapshotBeforeUpdate(h, u)), M = d != null && d.type === x && d.key == null ? d.props.children : d, is(t, Array.isArray(M) ? M : [M], e, n, r, i, s, l, o, a), c.base = e.__e, e.__h = null, c.__h.length && l.push(c), v && (c.__E = c.__ = null), c.__e = !1;
    } else s == null && e.__v === n.__v ? (e.__k = n.__k, e.__e = n.__e) : e.__e = Do(n.__e, e, n, r, i, s, l, a);
    (d = S.diffed) && d(e);
  } catch (te) {
    e.__v = null, (a || s != null) && (e.__e = o, e.__h = !!a, s[s.indexOf(o)] = null), S.__e(te, e, n);
  }
}
function as(t, e) {
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
function Do(t, e, n, r, i, s, l, o) {
  var a, d, c, f = n.props, h = e.props, u = e.type, p = 0;
  if (u === "svg" && (i = !0), s != null) {
    for (; p < s.length; p++) if ((a = s[p]) && "setAttribute" in a == !!u && (u ? a.localName === u : a.nodeType === 3)) {
      t = a, s[p] = null;
      break;
    }
  }
  if (t == null) {
    if (u === null) return document.createTextNode(h);
    t = i ? document.createElementNS("http://www.w3.org/2000/svg", u) : document.createElement(u, h.is && h), s = null, o = !1;
  }
  if (u === null) f === h || o && t.data === h || (t.data = h);
  else {
    if (s = s && zt.call(t.childNodes), d = (f = n.props || St).dangerouslySetInnerHTML, c = h.dangerouslySetInnerHTML, !o) {
      if (s != null) for (f = {}, p = 0; p < t.attributes.length; p++) f[t.attributes[p].name] = t.attributes[p].value;
      (c || d) && (c && (d && c.__html == d.__html || c.__html === t.innerHTML) || (t.innerHTML = c && c.__html || ""));
    }
    if (wo(t, h, f, i, o), c) e.__k = [];
    else if (p = e.props.children, is(t, Array.isArray(p) ? p : [p], e, n, r, i && u !== "foreignObject", s, l, s ? s[0] : n.__k && Ke(n, 0), o), s != null) for (p = s.length; p--; ) s[p] != null && ns(s[p]);
    o || ("value" in h && (p = h.value) !== void 0 && (p !== t.value || u === "progress" && !p || u === "option" && p !== f.value) && At(t, "value", p, f.value, !1), "checked" in h && (p = h.checked) !== void 0 && p !== t.checked && At(t, "checked", p, f.checked, !1));
  }
  return t;
}
function cs(t, e, n) {
  try {
    typeof t == "function" ? t(e) : t.current = e;
  } catch (r) {
    S.__e(r, n);
  }
}
function ds(t, e, n) {
  var r, i;
  if (S.unmount && S.unmount(t), (r = t.ref) && (r.current && r.current !== t.__e || cs(r, null, e)), (r = t.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (s) {
      S.__e(s, e);
    }
    r.base = r.__P = null, t.__c = void 0;
  }
  if (r = t.__k) for (i = 0; i < r.length; i++) r[i] && ds(r[i], e, n || typeof t.type != "function");
  n || t.__e == null || ns(t.__e), t.__ = t.__e = t.__d = void 0;
}
function _o(t, e, n) {
  return this.constructor(t, n);
}
function Je(t, e, n) {
  var r, i, s;
  S.__ && S.__(t, e), i = (r = !1) ? null : e.__k, s = [], Ln(e, t = e.__k = g(x, null, [t]), i || St, St, e.ownerSVGElement !== void 0, i ? null : e.firstChild ? zt.call(e.childNodes) : null, s, i ? i.__e : e.firstChild, r), as(s, t);
}
function Ro(t, e) {
  var n = { __c: e = "__cC" + es++, __: t, Consumer: function(r, i) {
    return r.children(i);
  }, Provider: function(r) {
    var i, s;
    return this.getChildContext || (i = [], (s = {})[e] = this, this.getChildContext = function() {
      return s;
    }, this.shouldComponentUpdate = function(l) {
      this.props.value !== l.value && i.some(function(o) {
        o.__e = !0, vn(o);
      });
    }, this.sub = function(l) {
      i.push(l);
      var o = l.componentWillUnmount;
      l.componentWillUnmount = function() {
        i.splice(i.indexOf(l), 1), o && o.call(l);
      };
    }), r.children;
  } };
  return n.Provider.__ = n.Consumer.contextType = n;
}
zt = ts.slice, S = { __e: function(t, e, n, r) {
  for (var i, s, l; e = e.__; ) if ((i = e.__c) && !i.__) try {
    if ((s = i.constructor) && s.getDerivedStateFromError != null && (i.setState(s.getDerivedStateFromError(t)), l = i.__d), i.componentDidCatch != null && (i.componentDidCatch(t, r || {}), l = i.__d), l) return i.__E = i;
  } catch (o) {
    t = o;
  }
  throw t;
} }, Xi = 0, Ki = function(t) {
  return t != null && t.constructor === void 0;
}, He = !1, z.prototype.setState = function(t, e) {
  var n;
  n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = re({}, this.state), typeof t == "function" && (t = t(re({}, n), this.props)), t && re(n, t), t != null && this.__v && (e && this._sb.push(e), vn(this));
}, z.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), vn(this));
}, z.prototype.render = x, he = [], Ji = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, wt.__r = 0, es = 0;
var G, Xt, Pr, us = [], Kt = [], Hr = S.__b, Br = S.__r, $r = S.diffed, Lr = S.__c, Ur = S.unmount;
function To() {
  for (var t; t = us.shift(); ) if (t.__P && t.__H) try {
    t.__H.__h.forEach(gt), t.__H.__h.forEach(bn), t.__H.__h = [];
  } catch (e) {
    t.__H.__h = [], S.__e(e, t.__v);
  }
}
S.__b = function(t) {
  G = null, Hr && Hr(t);
}, S.__r = function(t) {
  Br && Br(t);
  var e = (G = t.__c).__H;
  e && (Xt === G ? (e.__h = [], G.__h = [], e.__.forEach(function(n) {
    n.__N && (n.__ = n.__N), n.__V = Kt, n.__N = n.i = void 0;
  })) : (e.__h.forEach(gt), e.__h.forEach(bn), e.__h = [])), Xt = G;
}, S.diffed = function(t) {
  $r && $r(t);
  var e = t.__c;
  e && e.__H && (e.__H.__h.length && (us.push(e) !== 1 && Pr === S.requestAnimationFrame || ((Pr = S.requestAnimationFrame) || xo)(To)), e.__H.__.forEach(function(n) {
    n.i && (n.__H = n.i), n.__V !== Kt && (n.__ = n.__V), n.i = void 0, n.__V = Kt;
  })), Xt = G = null;
}, S.__c = function(t, e) {
  e.some(function(n) {
    try {
      n.__h.forEach(gt), n.__h = n.__h.filter(function(r) {
        return !r.__ || bn(r);
      });
    } catch (r) {
      e.some(function(i) {
        i.__h && (i.__h = []);
      }), e = [], S.__e(r, n.__v);
    }
  }), Lr && Lr(t, e);
}, S.unmount = function(t) {
  Ur && Ur(t);
  var e, n = t.__c;
  n && n.__H && (n.__H.__.forEach(function(r) {
    try {
      gt(r);
    } catch (i) {
      e = i;
    }
  }), n.__H = void 0, e && S.__e(e, n.__v));
};
var zr = typeof requestAnimationFrame == "function";
function xo(t) {
  var e, n = function() {
    clearTimeout(r), zr && cancelAnimationFrame(e), setTimeout(t);
  }, r = setTimeout(n, 100);
  zr && (e = requestAnimationFrame(n));
}
function gt(t) {
  var e = G, n = t.__c;
  typeof n == "function" && (t.__c = void 0, n()), G = e;
}
function bn(t) {
  var e = G;
  t.__c = t.__(), G = e;
}
function ko(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function Fr(t, e) {
  for (var n in t) if (n !== "__source" && !(n in e)) return !0;
  for (var r in e) if (r !== "__source" && t[r] !== e[r]) return !0;
  return !1;
}
function jr(t) {
  this.props = t;
}
(jr.prototype = new z()).isPureReactComponent = !0, jr.prototype.shouldComponentUpdate = function(t, e) {
  return Fr(this.props, t) || Fr(this.state, e);
};
var Wr = S.__b;
S.__b = function(t) {
  t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), Wr && Wr(t);
};
var Mo = S.__e;
S.__e = function(t, e, n, r) {
  if (t.then) {
    for (var i, s = e; s = s.__; ) if ((i = s.__c) && i.__c) return e.__e == null && (e.__e = n.__e, e.__k = n.__k), i.__c(t, e);
  }
  Mo(t, e, n, r);
};
var Vr = S.unmount;
function fs(t, e, n) {
  return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), t.__c.__H = null), (t = ko({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c = null), t.__k = t.__k && t.__k.map(function(r) {
    return fs(r, e, n);
  })), t;
}
function hs(t, e, n) {
  return t && (t.__v = null, t.__k = t.__k && t.__k.map(function(r) {
    return hs(r, e, n);
  }), t.__c && t.__c.__P === e && (t.__e && n.insertBefore(t.__e, t.__d), t.__c.__e = !0, t.__c.__P = n)), t;
}
function Jt() {
  this.__u = 0, this.t = null, this.__b = null;
}
function gs(t) {
  var e = t.__.__c;
  return e && e.__a && e.__a(t);
}
function st() {
  this.u = null, this.o = null;
}
S.unmount = function(t) {
  var e = t.__c;
  e && e.__R && e.__R(), e && t.__h === !0 && (t.type = null), Vr && Vr(t);
}, (Jt.prototype = new z()).__c = function(t, e) {
  var n = e.__c, r = this;
  r.t == null && (r.t = []), r.t.push(n);
  var i = gs(r.__v), s = !1, l = function() {
    s || (s = !0, n.__R = null, i ? i(o) : o());
  };
  n.__R = l;
  var o = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var d = r.state.__a;
        r.__v.__k[0] = hs(d, d.__c.__P, d.__c.__O);
      }
      var c;
      for (r.setState({ __a: r.__b = null }); c = r.t.pop(); ) c.forceUpdate();
    }
  }, a = e.__h === !0;
  r.__u++ || a || r.setState({ __a: r.__b = r.__v.__k[0] }), t.then(l, l);
}, Jt.prototype.componentWillUnmount = function() {
  this.t = [];
}, Jt.prototype.render = function(t, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = fs(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var i = e.__a && g(x, null, t.fallback);
  return i && (i.__h = null), [g(x, null, e.__a ? null : t.children), i];
};
var Gr = function(t, e, n) {
  if (++n[1] === n[0] && t.o.delete(e), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.o.size)) for (n = t.u; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    t.u = n = n[2];
  }
};
function Io(t) {
  return this.getChildContext = function() {
    return t.context;
  }, t.children;
}
function No(t) {
  var e = this, n = t.i;
  e.componentWillUnmount = function() {
    Je(null, e.l), e.l = null, e.i = null;
  }, e.i && e.i !== n && e.componentWillUnmount(), t.__v ? (e.l || (e.i = n, e.l = { nodeType: 1, parentNode: n, childNodes: [], appendChild: function(r) {
    this.childNodes.push(r), e.i.appendChild(r);
  }, insertBefore: function(r, i) {
    this.childNodes.push(r), e.i.appendChild(r);
  }, removeChild: function(r) {
    this.childNodes.splice(this.childNodes.indexOf(r) >>> 1, 1), e.i.removeChild(r);
  } }), Je(g(Io, { context: e.context }, t.__v), e.l)) : e.l && e.componentWillUnmount();
}
function Oo(t, e) {
  var n = g(No, { __v: t, i: e });
  return n.containerInfo = e, n;
}
(st.prototype = new z()).__a = function(t) {
  var e = this, n = gs(e.__v), r = e.o.get(t);
  return r[0]++, function(i) {
    var s = function() {
      e.props.revealOrder ? (r.push(i), Gr(e, t, r)) : i();
    };
    n ? n(s) : s();
  };
}, st.prototype.render = function(t) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var e = Ct(t.children);
  t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
  for (var n = e.length; n--; ) this.o.set(e[n], this.u = [1, 0, this.u]);
  return t.children;
}, st.prototype.componentDidUpdate = st.prototype.componentDidMount = function() {
  var t = this;
  this.o.forEach(function(e, n) {
    Gr(t, n, e);
  });
};
var Po = typeof Symbol < "u" && Symbol.for && /* @__PURE__ */ Symbol.for("react.element") || 60103, Ho = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Bo = typeof document < "u", $o = function(t) {
  return (typeof Symbol < "u" && typeof /* @__PURE__ */ Symbol() == "symbol" ? /fil|che|rad/i : /fil|che|ra/i).test(t);
};
z.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
  Object.defineProperty(z.prototype, t, { configurable: !0, get: function() {
    return this["UNSAFE_" + t];
  }, set: function(e) {
    Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
  } });
});
var qr = S.event;
function Lo() {
}
function Uo() {
  return this.cancelBubble;
}
function zo() {
  return this.defaultPrevented;
}
S.event = function(t) {
  return qr && (t = qr(t)), t.persist = Lo, t.isPropagationStopped = Uo, t.isDefaultPrevented = zo, t.nativeEvent = t;
};
var Yr = { configurable: !0, get: function() {
  return this.class;
} }, Qr = S.vnode;
S.vnode = function(t) {
  var e = t.type, n = t.props, r = n;
  if (typeof e == "string") {
    var i = e.indexOf("-") === -1;
    for (var s in r = {}, n) {
      var l = n[s];
      Bo && s === "children" && e === "noscript" || s === "value" && "defaultValue" in n && l == null || (s === "defaultValue" && "value" in n && n.value == null ? s = "value" : s === "download" && l === !0 ? l = "" : /ondoubleclick/i.test(s) ? s = "ondblclick" : /^onchange(textarea|input)/i.test(s + e) && !$o(n.type) ? s = "oninput" : /^onfocus$/i.test(s) ? s = "onfocusin" : /^onblur$/i.test(s) ? s = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(s) ? s = s.toLowerCase() : i && Ho.test(s) ? s = s.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : l === null && (l = void 0), /^oninput$/i.test(s) && (s = s.toLowerCase(), r[s] && (s = "oninputCapture")), r[s] = l);
    }
    e == "select" && r.multiple && Array.isArray(r.value) && (r.value = Ct(n.children).forEach(function(o) {
      o.props.selected = r.value.indexOf(o.props.value) != -1;
    })), e == "select" && r.defaultValue != null && (r.value = Ct(n.children).forEach(function(o) {
      o.props.selected = r.multiple ? r.defaultValue.indexOf(o.props.value) != -1 : r.defaultValue == o.props.value;
    })), t.props = r, n.class != n.className && (Yr.enumerable = "className" in n, n.className != null && (r.class = n.className), Object.defineProperty(r, "className", Yr));
  }
  t.$$typeof = Po, Qr && Qr(t);
};
var Zr = S.__r;
S.__r = function(t) {
  Zr && Zr(t), t.__c;
};
const ps = [], yn = /* @__PURE__ */ new Map();
function Un(t) {
  ps.push(t), yn.forEach((e) => {
    vs(e, t);
  });
}
function Fo(t) {
  t.isConnected && // sometimes true if SSR system simulates DOM
  t.getRootNode && ms(t.getRootNode());
}
function ms(t) {
  let e = yn.get(t);
  if (!e || !e.isConnected) {
    if (e = t.querySelector("style[data-fullcalendar]"), !e) {
      e = document.createElement("style"), e.setAttribute("data-fullcalendar", "");
      const n = Wo();
      n && (e.nonce = n);
      const r = t === document ? document.head : t, i = t === document ? r.querySelector("script,link[rel=stylesheet],link[as=style],style") : r.firstChild;
      r.insertBefore(e, i);
    }
    yn.set(t, e), jo(e);
  }
}
function jo(t) {
  for (const e of ps)
    vs(t, e);
}
function vs(t, e) {
  const { sheet: n } = t, r = n.cssRules.length;
  e.split("}").forEach((i, s) => {
    i = i.trim(), i && n.insertRule(i + "}", r + s);
  });
}
let en;
function Wo() {
  return en === void 0 && (en = Vo()), en;
}
function Vo() {
  const t = document.querySelector('meta[name="csp-nonce"]');
  if (t && t.hasAttribute("content"))
    return t.getAttribute("content");
  const e = document.querySelector("script[nonce]");
  return e && e.nonce || "";
}
typeof document < "u" && ms(document);
var Go = ':root{--fc-small-font-size:.85em;--fc-page-bg-color:#fff;--fc-neutral-bg-color:hsla(0,0%,82%,.3);--fc-neutral-text-color:grey;--fc-border-color:#ddd;--fc-button-text-color:#fff;--fc-button-bg-color:#2c3e50;--fc-button-border-color:#2c3e50;--fc-button-hover-bg-color:#1e2b37;--fc-button-hover-border-color:#1a252f;--fc-button-active-bg-color:#1a252f;--fc-button-active-border-color:#151e27;--fc-event-bg-color:#3788d8;--fc-event-border-color:#3788d8;--fc-event-text-color:#fff;--fc-event-selected-overlay-color:rgba(0,0,0,.25);--fc-more-link-bg-color:#d0d0d0;--fc-more-link-text-color:inherit;--fc-event-resizer-thickness:8px;--fc-event-resizer-dot-total-width:8px;--fc-event-resizer-dot-border-width:1px;--fc-non-business-color:hsla(0,0%,84%,.3);--fc-bg-event-color:#8fdf82;--fc-bg-event-opacity:0.3;--fc-highlight-color:rgba(188,232,241,.3);--fc-today-bg-color:rgba(255,220,40,.15);--fc-now-indicator-color:red}.fc-not-allowed,.fc-not-allowed .fc-event{cursor:not-allowed}.fc{display:flex;flex-direction:column;font-size:1em}.fc,.fc *,.fc :after,.fc :before{box-sizing:border-box}.fc table{border-collapse:collapse;border-spacing:0;font-size:1em}.fc th{text-align:center}.fc td,.fc th{padding:0;vertical-align:top}.fc a[data-navlink]{cursor:pointer}.fc a[data-navlink]:hover{text-decoration:underline}.fc-direction-ltr{direction:ltr;text-align:left}.fc-direction-rtl{direction:rtl;text-align:right}.fc-theme-standard td,.fc-theme-standard th{border:1px solid var(--fc-border-color)}.fc-liquid-hack td,.fc-liquid-hack th{position:relative}@font-face{font-family:fcicons;font-style:normal;font-weight:400;src:url("data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBfAAAAC8AAAAYGNtYXAXVtKNAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZgYydxIAAAF4AAAFNGhlYWQUJ7cIAAAGrAAAADZoaGVhB20DzAAABuQAAAAkaG10eCIABhQAAAcIAAAALGxvY2ED4AU6AAAHNAAAABhtYXhwAA8AjAAAB0wAAAAgbmFtZXsr690AAAdsAAABhnBvc3QAAwAAAAAI9AAAACAAAwPAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpBgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6Qb//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAWIAjQKeAskAEwAAJSc3NjQnJiIHAQYUFwEWMjc2NCcCnuLiDQ0MJAz/AA0NAQAMJAwNDcni4gwjDQwM/wANIwz/AA0NDCMNAAAAAQFiAI0CngLJABMAACUBNjQnASYiBwYUHwEHBhQXFjI3AZ4BAA0N/wAMJAwNDeLiDQ0MJAyNAQAMIw0BAAwMDSMM4uINIwwNDQAAAAIA4gC3Ax4CngATACcAACUnNzY0JyYiDwEGFB8BFjI3NjQnISc3NjQnJiIPAQYUHwEWMjc2NCcB87e3DQ0MIw3VDQ3VDSMMDQ0BK7e3DQ0MJAzVDQ3VDCQMDQ3zuLcMJAwNDdUNIwzWDAwNIwy4twwkDA0N1Q0jDNYMDA0jDAAAAgDiALcDHgKeABMAJwAAJTc2NC8BJiIHBhQfAQcGFBcWMjchNzY0LwEmIgcGFB8BBwYUFxYyNwJJ1Q0N1Q0jDA0Nt7cNDQwjDf7V1Q0N1QwkDA0Nt7cNDQwkDLfWDCMN1Q0NDCQMt7gMIw0MDNYMIw3VDQ0MJAy3uAwjDQwMAAADAFUAAAOrA1UAMwBoAHcAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMhMjY1NCYjISIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAAVYRGRkR/qoRGRkRA1UFBAUOCQkVDAsZDf2rDRkLDBUJCA4FBQUFBQUOCQgVDAsZDQJVDRkLDBUJCQ4FBAVVAgECBQMCBwQECAX9qwQJAwQHAwMFAQICAgIBBQMDBwQDCQQCVQUIBAQHAgMFAgEC/oAZEhEZGRESGQAAAAADAFUAAAOrA1UAMwBoAIkAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMzFRQWMzI2PQEzMjY1NCYrATU0JiMiBh0BIyIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAgBkSEhmAERkZEYAZEhIZgBEZGREDVQUEBQ4JCRUMCxkN/asNGQsMFQkIDgUFBQUFBQ4JCBUMCxkNAlUNGQsMFQkJDgUEBVUCAQIFAwIHBAQIBf2rBAkDBAcDAwUBAgICAgEFAwMHBAMJBAJVBQgEBAcCAwUCAQL+gIASGRkSgBkSERmAEhkZEoAZERIZAAABAOIAjQMeAskAIAAAExcHBhQXFjI/ARcWMjc2NC8BNzY0JyYiDwEnJiIHBhQX4uLiDQ0MJAzi4gwkDA0N4uINDQwkDOLiDCQMDQ0CjeLiDSMMDQ3h4Q0NDCMN4uIMIw0MDOLiDAwNIwwAAAABAAAAAQAAa5n0y18PPPUACwQAAAAAANivOVsAAAAA2K85WwAAAAADqwNVAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAOrAAEAAAAAAAAAAAAAAAAAAAALBAAAAAAAAAAAAAAAAgAAAAQAAWIEAAFiBAAA4gQAAOIEAABVBAAAVQQAAOIAAAAAAAoAFAAeAEQAagCqAOoBngJkApoAAQAAAAsAigADAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGZjaWNvbnMAZgBjAGkAYwBvAG4Ac1ZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGZjaWNvbnMAZgBjAGkAYwBvAG4Ac2ZjaWNvbnMAZgBjAGkAYwBvAG4Ac1JlZ3VsYXIAUgBlAGcAdQBsAGEAcmZjaWNvbnMAZgBjAGkAYwBvAG4Ac0ZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=") format("truetype")}.fc-icon{speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:inline-block;font-family:fcicons!important;font-style:normal;font-variant:normal;font-weight:400;height:1em;line-height:1;text-align:center;text-transform:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:1em}.fc-icon-chevron-left:before{content:"\\e900"}.fc-icon-chevron-right:before{content:"\\e901"}.fc-icon-chevrons-left:before{content:"\\e902"}.fc-icon-chevrons-right:before{content:"\\e903"}.fc-icon-minus-square:before{content:"\\e904"}.fc-icon-plus-square:before{content:"\\e905"}.fc-icon-x:before{content:"\\e906"}.fc .fc-button{border-radius:0;font-family:inherit;font-size:inherit;line-height:inherit;margin:0;overflow:visible;text-transform:none}.fc .fc-button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}.fc .fc-button{-webkit-appearance:button}.fc .fc-button:not(:disabled){cursor:pointer}.fc .fc-button{background-color:transparent;border:1px solid transparent;border-radius:.25em;display:inline-block;font-size:1em;font-weight:400;line-height:1.5;padding:.4em .65em;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle}.fc .fc-button:hover{text-decoration:none}.fc .fc-button:focus{box-shadow:0 0 0 .2rem rgba(44,62,80,.25);outline:0}.fc .fc-button:disabled{opacity:.65}.fc .fc-button-primary{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:hover{background-color:var(--fc-button-hover-bg-color);border-color:var(--fc-button-hover-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:disabled{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button-primary:not(:disabled).fc-button-active,.fc .fc-button-primary:not(:disabled):active{background-color:var(--fc-button-active-bg-color);border-color:var(--fc-button-active-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:not(:disabled).fc-button-active:focus,.fc .fc-button-primary:not(:disabled):active:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button .fc-icon{font-size:1.5em;vertical-align:middle}.fc .fc-button-group{display:inline-flex;position:relative;vertical-align:middle}.fc .fc-button-group>.fc-button{flex:1 1 auto;position:relative}.fc .fc-button-group>.fc-button.fc-button-active,.fc .fc-button-group>.fc-button:active,.fc .fc-button-group>.fc-button:focus,.fc .fc-button-group>.fc-button:hover{z-index:1}.fc-direction-ltr .fc-button-group>.fc-button:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0;margin-left:-1px}.fc-direction-ltr .fc-button-group>.fc-button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.fc-direction-rtl .fc-button-group>.fc-button:not(:first-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.fc-direction-rtl .fc-button-group>.fc-button:not(:last-child){border-bottom-left-radius:0;border-top-left-radius:0}.fc .fc-toolbar{align-items:center;display:flex;justify-content:space-between}.fc .fc-toolbar.fc-header-toolbar{margin-bottom:1.5em}.fc .fc-toolbar.fc-footer-toolbar{margin-top:1.5em}.fc .fc-toolbar-title{font-size:1.75em;margin:0}.fc-direction-ltr .fc-toolbar>*>:not(:first-child){margin-left:.75em}.fc-direction-rtl .fc-toolbar>*>:not(:first-child){margin-right:.75em}.fc-direction-rtl .fc-toolbar-ltr{flex-direction:row-reverse}.fc .fc-scroller{-webkit-overflow-scrolling:touch;position:relative}.fc .fc-scroller-liquid{height:100%}.fc .fc-scroller-liquid-absolute{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-scroller-harness{direction:ltr;overflow:hidden;position:relative}.fc .fc-scroller-harness-liquid{height:100%}.fc-direction-rtl .fc-scroller-harness>.fc-scroller{direction:rtl}.fc-theme-standard .fc-scrollgrid{border:1px solid var(--fc-border-color)}.fc .fc-scrollgrid,.fc .fc-scrollgrid table{table-layout:fixed;width:100%}.fc .fc-scrollgrid table{border-left-style:hidden;border-right-style:hidden;border-top-style:hidden}.fc .fc-scrollgrid{border-bottom-width:0;border-collapse:separate;border-right-width:0}.fc .fc-scrollgrid-liquid{height:100%}.fc .fc-scrollgrid-section,.fc .fc-scrollgrid-section table,.fc .fc-scrollgrid-section>td{height:1px}.fc .fc-scrollgrid-section-liquid>td{height:100%}.fc .fc-scrollgrid-section>*{border-left-width:0;border-top-width:0}.fc .fc-scrollgrid-section-footer>*,.fc .fc-scrollgrid-section-header>*{border-bottom-width:0}.fc .fc-scrollgrid-section-body table,.fc .fc-scrollgrid-section-footer table{border-bottom-style:hidden}.fc .fc-scrollgrid-section-sticky>*{background:var(--fc-page-bg-color);position:sticky;z-index:3}.fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky>*{top:0}.fc .fc-scrollgrid-section-footer.fc-scrollgrid-section-sticky>*{bottom:0}.fc .fc-scrollgrid-sticky-shim{height:1px;margin-bottom:-1px}.fc-sticky{position:sticky}.fc .fc-view-harness{flex-grow:1;position:relative}.fc .fc-view-harness-active>.fc-view{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-col-header-cell-cushion{display:inline-block;padding:2px 4px}.fc .fc-bg-event,.fc .fc-highlight,.fc .fc-non-business{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-non-business{background:var(--fc-non-business-color)}.fc .fc-bg-event{background:var(--fc-bg-event-color);opacity:var(--fc-bg-event-opacity)}.fc .fc-bg-event .fc-event-title{font-size:var(--fc-small-font-size);font-style:italic;margin:.5em}.fc .fc-highlight{background:var(--fc-highlight-color)}.fc .fc-cell-shaded,.fc .fc-day-disabled{background:var(--fc-neutral-bg-color)}a.fc-event,a.fc-event:hover{text-decoration:none}.fc-event.fc-event-draggable,.fc-event[href]{cursor:pointer}.fc-event .fc-event-main{position:relative;z-index:2}.fc-event-dragging:not(.fc-event-selected){opacity:.75}.fc-event-dragging.fc-event-selected{box-shadow:0 2px 7px rgba(0,0,0,.3)}.fc-event .fc-event-resizer{display:none;position:absolute;z-index:4}.fc-event-selected .fc-event-resizer,.fc-event:hover .fc-event-resizer{display:block}.fc-event-selected .fc-event-resizer{background:var(--fc-page-bg-color);border-color:inherit;border-radius:calc(var(--fc-event-resizer-dot-total-width)/2);border-style:solid;border-width:var(--fc-event-resizer-dot-border-width);height:var(--fc-event-resizer-dot-total-width);width:var(--fc-event-resizer-dot-total-width)}.fc-event-selected .fc-event-resizer:before{bottom:-20px;content:"";left:-20px;position:absolute;right:-20px;top:-20px}.fc-event-selected,.fc-event:focus{box-shadow:0 2px 5px rgba(0,0,0,.2)}.fc-event-selected:before,.fc-event:focus:before{bottom:0;content:"";left:0;position:absolute;right:0;top:0;z-index:3}.fc-event-selected:after,.fc-event:focus:after{background:var(--fc-event-selected-overlay-color);bottom:-1px;content:"";left:-1px;position:absolute;right:-1px;top:-1px;z-index:1}.fc-h-event{background-color:var(--fc-event-bg-color);border:1px solid var(--fc-event-border-color);display:block}.fc-h-event .fc-event-main{color:var(--fc-event-text-color)}.fc-h-event .fc-event-main-frame{display:flex}.fc-h-event .fc-event-time{max-width:100%;overflow:hidden}.fc-h-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-width:0}.fc-h-event .fc-event-title{display:inline-block;left:0;max-width:100%;overflow:hidden;right:0;vertical-align:top}.fc-h-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-start),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-end){border-bottom-left-radius:0;border-left-width:0;border-top-left-radius:0}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-end),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-start){border-bottom-right-radius:0;border-right-width:0;border-top-right-radius:0}.fc-h-event:not(.fc-event-selected) .fc-event-resizer{bottom:0;top:0;width:var(--fc-event-resizer-thickness)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end{cursor:w-resize;left:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start{cursor:e-resize;right:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-h-event.fc-event-selected .fc-event-resizer{margin-top:calc(var(--fc-event-resizer-dot-total-width)*-.5);top:50%}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-start,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-end{left:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-end,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-start{right:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc .fc-popover{box-shadow:0 2px 6px rgba(0,0,0,.15);position:absolute;z-index:9999}.fc .fc-popover-header{align-items:center;display:flex;flex-direction:row;justify-content:space-between;padding:3px 4px}.fc .fc-popover-title{margin:0 2px}.fc .fc-popover-close{cursor:pointer;font-size:1.1em;opacity:.65}.fc-theme-standard .fc-popover{background:var(--fc-page-bg-color);border:1px solid var(--fc-border-color)}.fc-theme-standard .fc-popover-header{background:var(--fc-neutral-bg-color)}';
Un(Go);
class zn {
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
function Fn(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function $(t, e) {
  if (t.closest)
    return t.closest(e);
  if (!document.documentElement.contains(t))
    return null;
  do {
    if (qo(t, e))
      return t;
    t = t.parentElement || t.parentNode;
  } while (t !== null && t.nodeType === 1);
  return null;
}
function qo(t, e) {
  return (t.matches || t.matchesSelector || t.msMatchesSelector).call(t, e);
}
function Yo(t, e) {
  let n = t instanceof HTMLElement ? [t] : t, r = [];
  for (let i = 0; i < n.length; i += 1) {
    let s = n[i].querySelectorAll(e);
    for (let l = 0; l < s.length; l += 1)
      r.push(s[l]);
  }
  return r;
}
const Qo = /(top|left|right|bottom|width|height)$/i;
function qe(t, e) {
  for (let n in e)
    bs(t, n, e[n]);
}
function bs(t, e, n) {
  n == null ? t.style[e] = "" : typeof n == "number" && Qo.test(e) ? t.style[e] = `${n}px` : t.style[e] = n;
}
function ys(t) {
  var e, n;
  return (n = (e = t.composedPath) === null || e === void 0 ? void 0 : e.call(t)[0]) !== null && n !== void 0 ? n : t.target;
}
let Xr = 0;
function Ft() {
  return Xr += 1, "fc-dom-" + Xr;
}
function jt(t) {
  t.preventDefault();
}
function Zo(t, e) {
  return (n) => {
    let r = $(n.target, t);
    r && e.call(r, n, r);
  };
}
function Es(t, e, n, r) {
  let i = Zo(n, r);
  return t.addEventListener(e, i), () => {
    t.removeEventListener(e, i);
  };
}
function Xo(t, e, n, r) {
  let i;
  return Es(t, "mouseover", e, (s, l) => {
    if (l !== i) {
      i = l, n(s, l);
      let o = (a) => {
        i = null, r(a, l), l.removeEventListener("mouseleave", o);
      };
      l.addEventListener("mouseleave", o);
    }
  });
}
const Kr = [
  "webkitTransitionEnd",
  "otransitionend",
  "oTransitionEnd",
  "msTransitionEnd",
  "transitionend"
];
function Ko(t, e) {
  let n = (r) => {
    e(r), Kr.forEach((i) => {
      t.removeEventListener(i, n);
    });
  };
  Kr.forEach((r) => {
    t.addEventListener(r, n);
  });
}
function Ss(t) {
  return Object.assign({ onClick: t }, As(t));
}
function As(t) {
  return {
    tabIndex: 0,
    onKeyDown(e) {
      (e.key === "Enter" || e.key === " ") && (t(e), e.preventDefault());
    }
  };
}
let Jr = 0;
function Se() {
  return Jr += 1, String(Jr);
}
function jn() {
  document.body.classList.add("fc-not-allowed");
}
function Wn() {
  document.body.classList.remove("fc-not-allowed");
}
function Jo(t) {
  t.style.userSelect = "none", t.style.webkitUserSelect = "none", t.addEventListener("selectstart", jt);
}
function ea(t) {
  t.style.userSelect = "", t.style.webkitUserSelect = "", t.removeEventListener("selectstart", jt);
}
function ta(t) {
  t.addEventListener("contextmenu", jt);
}
function na(t) {
  t.removeEventListener("contextmenu", jt);
}
function ra(t) {
  let e = [], n = [], r, i;
  for (typeof t == "string" ? n = t.split(/\s*,\s*/) : typeof t == "function" ? n = [t] : Array.isArray(t) && (n = t), r = 0; r < n.length; r += 1)
    i = n[r], typeof i == "string" ? e.push(i.charAt(0) === "-" ? { field: i.substring(1), order: -1 } : { field: i, order: 1 }) : typeof i == "function" && e.push({ func: i });
  return e;
}
function ia(t, e, n) {
  let r, i;
  for (r = 0; r < n.length; r += 1)
    if (i = sa(t, e, n[r]), i)
      return i;
  return 0;
}
function sa(t, e, n) {
  return n.func ? n.func(t, e) : la(t[n.field], e[n.field]) * (n.order || 1);
}
function la(t, e) {
  return !t && !e ? 0 : e == null ? -1 : t == null ? 1 : typeof t == "string" || typeof e == "string" ? String(t).localeCompare(String(e)) : t - e;
}
function ke(t, e) {
  let n = String(t);
  return "000".substr(0, e - n.length) + n;
}
function Ye(t, e, n) {
  return typeof t == "function" ? t(...e) : typeof t == "string" ? e.reduce((r, i, s) => r.replace("$" + s, i || ""), t) : n;
}
function oa(t, e) {
  return t - e;
}
function pt(t) {
  return t % 1 === 0;
}
function aa(t) {
  let e = t.querySelector(".fc-scrollgrid-shrink-frame"), n = t.querySelector(".fc-scrollgrid-shrink-cushion");
  if (!e)
    throw new Error("needs fc-scrollgrid-shrink-frame className");
  if (!n)
    throw new Error("needs fc-scrollgrid-shrink-cushion className");
  return t.getBoundingClientRect().width - e.getBoundingClientRect().width + // the cell padding+border
  n.getBoundingClientRect().width;
}
const ei = ["years", "months", "days", "milliseconds"], ca = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
function D(t, e) {
  return typeof t == "string" ? da(t) : typeof t == "object" && t ? ti(t) : typeof t == "number" ? ti({ [e || "milliseconds"]: t }) : null;
}
function da(t) {
  let e = ca.exec(t);
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
function ti(t) {
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
function ua(t, e) {
  return t.years === e.years && t.months === e.months && t.days === e.days && t.milliseconds === e.milliseconds;
}
function En(t, e) {
  return {
    years: t.years + e.years,
    months: t.months + e.months,
    days: t.days + e.days,
    milliseconds: t.milliseconds + e.milliseconds
  };
}
function fa(t, e) {
  return {
    years: t.years - e.years,
    months: t.months - e.months,
    days: t.days - e.days,
    milliseconds: t.milliseconds - e.milliseconds
  };
}
function ha(t, e) {
  return {
    years: t.years * e,
    months: t.months * e,
    days: t.days * e,
    milliseconds: t.milliseconds * e
  };
}
function ga(t) {
  return Me(t) / 365;
}
function pa(t) {
  return Me(t) / 30;
}
function Me(t) {
  return W(t) / 864e5;
}
function W(t) {
  return t.years * (365 * 864e5) + t.months * (30 * 864e5) + t.days * 864e5 + t.milliseconds;
}
function Vn(t, e) {
  let n = null;
  for (let r = 0; r < ei.length; r += 1) {
    let i = ei[r];
    if (e[i]) {
      let s = t[i] / e[i];
      if (!pt(s) || n !== null && n !== s)
        return null;
      n = s;
    } else if (t[i])
      return null;
  }
  return n;
}
function Sn(t) {
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
function oe(t, e, n) {
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
const ma = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
function ni(t, e) {
  let n = ie(t);
  return n[2] += e * 7, U(n);
}
function H(t, e) {
  let n = ie(t);
  return n[2] += e, U(n);
}
function ae(t, e) {
  let n = ie(t);
  return n[6] += e, U(n);
}
function va(t, e) {
  return Ae(t, e) / 7;
}
function Ae(t, e) {
  return (e.valueOf() - t.valueOf()) / (1e3 * 60 * 60 * 24);
}
function ba(t, e) {
  return (e.valueOf() - t.valueOf()) / (1e3 * 60 * 60);
}
function ya(t, e) {
  return (e.valueOf() - t.valueOf()) / (1e3 * 60);
}
function Ea(t, e) {
  return (e.valueOf() - t.valueOf()) / 1e3;
}
function Sa(t, e) {
  let n = k(t), r = k(e);
  return {
    years: 0,
    months: 0,
    days: Math.round(Ae(n, r)),
    milliseconds: e.valueOf() - r.valueOf() - (t.valueOf() - n.valueOf())
  };
}
function Aa(t, e) {
  let n = Dt(t, e);
  return n !== null && n % 7 === 0 ? n / 7 : null;
}
function Dt(t, e) {
  return se(t) === se(e) ? Math.round(Ae(t, e)) : null;
}
function k(t) {
  return U([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ]);
}
function wa(t) {
  return U([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours()
  ]);
}
function Ca(t) {
  return U([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours(),
    t.getUTCMinutes()
  ]);
}
function Da(t) {
  return U([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours(),
    t.getUTCMinutes(),
    t.getUTCSeconds()
  ]);
}
function _a(t, e, n) {
  let r = t.getUTCFullYear(), i = tn(t, r, e, n);
  if (i < 1)
    return tn(t, r - 1, e, n);
  let s = tn(t, r + 1, e, n);
  return s >= 1 ? Math.min(i, s) : i;
}
function tn(t, e, n, r) {
  let i = U([e, 0, 1 + Ra(e, n, r)]), s = k(t), l = Math.round(Ae(i, s));
  return Math.floor(l / 7) + 1;
}
function Ra(t, e, n) {
  let r = 7 + e - n;
  return -((7 + U([t, 0, r]).getUTCDay() - e) % 7) + r - 1;
}
function ri(t) {
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
function ii(t) {
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
function ie(t) {
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
function U(t) {
  return t.length === 1 && (t = t.concat([0])), new Date(Date.UTC(...t));
}
function ws(t) {
  return !isNaN(t.valueOf());
}
function se(t) {
  return t.getUTCHours() * 1e3 * 60 * 60 + t.getUTCMinutes() * 1e3 * 60 + t.getUTCSeconds() * 1e3 + t.getUTCMilliseconds();
}
function Cs(t, e, n = !1) {
  let r = t.toISOString();
  return r = r.replace(".000", ""), n && (r = r.replace("T00:00:00Z", "")), r.length > 10 && (e == null ? r = r.replace("Z", "") : e !== 0 && (r = r.replace("Z", qn(e, !0)))), r;
}
function Gn(t) {
  return t.toISOString().replace(/T.*$/, "");
}
function Ta(t) {
  return t.toISOString().match(/^\d{4}-\d{2}/)[0];
}
function xa(t) {
  return ke(t.getUTCHours(), 2) + ":" + ke(t.getUTCMinutes(), 2) + ":" + ke(t.getUTCSeconds(), 2);
}
function qn(t, e = !1) {
  let n = t < 0 ? "-" : "+", r = Math.abs(t), i = Math.floor(r / 60), s = Math.round(r % 60);
  return e ? `${n + ke(i, 2)}:${ke(s, 2)}` : `GMT${n}${i}${s ? `:${ke(s, 2)}` : ""}`;
}
function A(t, e, n) {
  let r, i;
  return function(...s) {
    if (!r)
      i = t.apply(this, s);
    else if (!oe(r, s)) {
      let l = t.apply(this, s);
      (!e || !e(l, i)) && (i = l);
    }
    return r = s, i;
  };
}
function mt(t, e, n) {
  let r, i;
  return (s) => (r ? V(r, s) || (i = t.call(this, s)) : i = t.call(this, s), r = s, i);
}
const nn = {
  week: 3,
  separator: 9,
  omitZeroMinute: 9,
  meridiem: 9,
  omitCommas: 9
}, _t = {
  timeZoneName: 7,
  era: 6,
  year: 5,
  month: 4,
  day: 2,
  weekday: 2,
  hour: 1,
  minute: 1,
  second: 1
}, lt = /\s*([ap])\.?m\.?/i, ka = /,/g, Ma = /\s+/g, Ia = /\u200e/g, Na = /UTC|GMT/;
class Oa {
  constructor(e) {
    let n = {}, r = {}, i = 9;
    for (let s in e)
      s in nn ? (r[s] = e[s], nn[s] < 9 && (i = Math.min(nn[s], i))) : (n[s] = e[s], s in _t && (i = Math.min(_t[s], i)));
    this.standardDateProps = n, this.extendedSettings = r, this.smallestUnitNum = i, this.buildFormattingFunc = A(si);
  }
  format(e, n) {
    return this.buildFormattingFunc(this.standardDateProps, this.extendedSettings, n)(e);
  }
  formatRange(e, n, r, i) {
    let { standardDateProps: s, extendedSettings: l } = this, o = Ua(e.marker, n.marker, r.calendarSystem);
    if (!o)
      return this.format(e, r);
    let a = o;
    a > 1 && // the two dates are different in a way that's larger scale than time
    (s.year === "numeric" || s.year === "2-digit") && (s.month === "numeric" || s.month === "2-digit") && (s.day === "numeric" || s.day === "2-digit") && (a = 1);
    let d = this.format(e, r), c = this.format(n, r);
    if (d === c)
      return d;
    let f = za(s, a), h = si(f, l, r), u = h(e), p = h(n), v = Fa(d, u, c, p), b = l.separator || i || r.defaultSeparator || "";
    return v ? v.before + u + b + p + v.after : d + b + c;
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
function si(t, e, n) {
  let r = Object.keys(t).length;
  return r === 1 && t.timeZoneName === "short" ? (i) => qn(i.timeZoneOffset) : r === 0 && e.week ? (i) => La(n.computeWeekNumber(i.marker), n.weekText, n.weekTextLong, n.locale, e.week) : Pa(t, e, n);
}
function Pa(t, e, n) {
  t = Object.assign({}, t), e = Object.assign({}, e), Ha(t, e), t.timeZone = "UTC";
  let r = new Intl.DateTimeFormat(n.locale.codes, t), i;
  if (e.omitZeroMinute) {
    let s = Object.assign({}, t);
    delete s.minute, i = new Intl.DateTimeFormat(n.locale.codes, s);
  }
  return (s) => {
    let { marker: l } = s, o;
    i && !l.getUTCMinutes() ? o = i : o = r;
    let a = o.format(l);
    return Ba(a, s, t, e, n);
  };
}
function Ha(t, e) {
  t.timeZoneName && (t.hour || (t.hour = "2-digit"), t.minute || (t.minute = "2-digit")), t.timeZoneName === "long" && (t.timeZoneName = "short"), e.omitZeroMinute && (t.second || t.millisecond) && delete e.omitZeroMinute;
}
function Ba(t, e, n, r, i) {
  return t = t.replace(Ia, ""), n.timeZoneName === "short" && (t = $a(t, i.timeZone === "UTC" || e.timeZoneOffset == null ? "UTC" : (
    // important to normalize for IE, which does "GMT"
    qn(e.timeZoneOffset)
  ))), r.omitCommas && (t = t.replace(ka, "").trim()), r.omitZeroMinute && (t = t.replace(":00", "")), r.meridiem === !1 ? t = t.replace(lt, "").trim() : r.meridiem === "narrow" ? t = t.replace(lt, (s, l) => l.toLocaleLowerCase()) : r.meridiem === "short" ? t = t.replace(lt, (s, l) => `${l.toLocaleLowerCase()}m`) : r.meridiem === "lowercase" && (t = t.replace(lt, (s) => s.toLocaleLowerCase())), t = t.replace(Ma, " "), t = t.trim(), t;
}
function $a(t, e) {
  let n = !1;
  return t = t.replace(Na, () => (n = !0, e)), n || (t += ` ${e}`), t;
}
function La(t, e, n, r, i) {
  let s = [];
  return i === "long" ? s.push(n) : (i === "short" || i === "narrow") && s.push(e), (i === "long" || i === "short") && s.push(" "), s.push(r.simpleNumberFormat.format(t)), r.options.direction === "rtl" && s.reverse(), s.join("");
}
function Ua(t, e, n) {
  return n.getMarkerYear(t) !== n.getMarkerYear(e) ? 5 : n.getMarkerMonth(t) !== n.getMarkerMonth(e) ? 4 : n.getMarkerDay(t) !== n.getMarkerDay(e) ? 2 : se(t) !== se(e) ? 1 : 0;
}
function za(t, e) {
  let n = {};
  for (let r in t)
    (!(r in _t) || // not a date part prop (like timeZone)
    _t[r] <= e) && (n[r] = t[r]);
  return n;
}
function Fa(t, e, n, r) {
  let i = 0;
  for (; i < t.length; ) {
    let s = t.indexOf(e, i);
    if (s === -1)
      break;
    let l = t.substr(0, s);
    i = s + e.length;
    let o = t.substr(i), a = 0;
    for (; a < n.length; ) {
      let d = n.indexOf(r, a);
      if (d === -1)
        break;
      let c = n.substr(0, d);
      a = d + r.length;
      let f = n.substr(a);
      if (l === c && o === f)
        return {
          before: l,
          after: o
        };
    }
  }
  return null;
}
function li(t, e) {
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
function Rt(t, e, n, r) {
  let i = li(t, n.calendarSystem), s = e ? li(e, n.calendarSystem) : null;
  return {
    date: i,
    start: i,
    end: s,
    timeZone: n.timeZone,
    localeCodes: n.locale.codes,
    defaultSeparator: r || n.defaultSeparator
  };
}
class ja {
  constructor(e) {
    this.cmdStr = e;
  }
  format(e, n, r) {
    return n.cmdFormatter(this.cmdStr, Rt(e, null, n, r));
  }
  formatRange(e, n, r, i) {
    return r.cmdFormatter(this.cmdStr, Rt(e, n, r, i));
  }
}
class Wa {
  constructor(e) {
    this.func = e;
  }
  format(e, n, r) {
    return this.func(Rt(e, null, n, r));
  }
  formatRange(e, n, r, i) {
    return this.func(Rt(e, n, r, i));
  }
}
function N(t) {
  return typeof t == "object" && t ? new Oa(t) : typeof t == "string" ? new ja(t) : typeof t == "function" ? new Wa(t) : null;
}
const oi = {
  navLinkDayClick: m,
  navLinkWeekClick: m,
  duration: D,
  bootstrapFontAwesome: m,
  buttonIcons: m,
  customButtons: m,
  defaultAllDayEventDuration: D,
  defaultTimedEventDuration: D,
  nextDayThreshold: D,
  scrollTime: D,
  scrollTimeReset: Boolean,
  slotMinTime: D,
  slotMaxTime: D,
  dayPopoverFormat: N,
  slotDuration: D,
  snapDuration: D,
  headerToolbar: m,
  footerToolbar: m,
  defaultRangeSeparator: String,
  titleRangeSeparator: String,
  forceEventDuration: Boolean,
  dayHeaders: Boolean,
  dayHeaderFormat: N,
  dayHeaderClassNames: m,
  dayHeaderContent: m,
  dayHeaderDidMount: m,
  dayHeaderWillUnmount: m,
  dayCellClassNames: m,
  dayCellContent: m,
  dayCellDidMount: m,
  dayCellWillUnmount: m,
  initialView: String,
  aspectRatio: Number,
  weekends: Boolean,
  weekNumberCalculation: m,
  weekNumbers: Boolean,
  weekNumberClassNames: m,
  weekNumberContent: m,
  weekNumberDidMount: m,
  weekNumberWillUnmount: m,
  editable: Boolean,
  viewClassNames: m,
  viewDidMount: m,
  viewWillUnmount: m,
  nowIndicator: Boolean,
  nowIndicatorSnap: m,
  nowIndicatorClassNames: m,
  nowIndicatorContent: m,
  nowIndicatorDidMount: m,
  nowIndicatorWillUnmount: m,
  showNonCurrentDates: Boolean,
  lazyFetching: Boolean,
  startParam: String,
  endParam: String,
  timeZoneParam: String,
  timeZone: String,
  locales: m,
  locale: m,
  themeSystem: String,
  dragRevertDuration: Number,
  dragScroll: Boolean,
  allDayMaintainDuration: Boolean,
  unselectAuto: Boolean,
  dropAccept: m,
  eventOrder: ra,
  eventOrderStrict: Boolean,
  handleWindowResize: Boolean,
  windowResizeDelay: Number,
  longPressDelay: Number,
  eventDragMinDistance: Number,
  expandRows: Boolean,
  height: m,
  contentHeight: m,
  direction: String,
  weekNumberFormat: N,
  eventResizableFromStart: Boolean,
  displayEventTime: Boolean,
  displayEventEnd: Boolean,
  weekText: String,
  weekTextLong: String,
  progressiveEventRendering: Boolean,
  businessHours: m,
  initialDate: m,
  now: m,
  eventDataTransform: m,
  stickyHeaderDates: m,
  stickyFooterScrollbar: m,
  viewHeight: m,
  defaultAllDay: Boolean,
  eventSourceFailure: m,
  eventSourceSuccess: m,
  eventDisplay: String,
  eventStartEditable: Boolean,
  eventDurationEditable: Boolean,
  eventOverlap: m,
  eventConstraint: m,
  eventAllow: m,
  eventBackgroundColor: String,
  eventBorderColor: String,
  eventTextColor: String,
  eventColor: String,
  eventClassNames: m,
  eventContent: m,
  eventDidMount: m,
  eventWillUnmount: m,
  selectConstraint: m,
  selectOverlap: m,
  selectAllow: m,
  droppable: Boolean,
  unselectCancel: String,
  slotLabelFormat: m,
  slotLaneClassNames: m,
  slotLaneContent: m,
  slotLaneDidMount: m,
  slotLaneWillUnmount: m,
  slotLabelClassNames: m,
  slotLabelContent: m,
  slotLabelDidMount: m,
  slotLabelWillUnmount: m,
  dayMaxEvents: m,
  dayMaxEventRows: m,
  dayMinWidth: Number,
  slotLabelInterval: D,
  allDayText: String,
  allDayClassNames: m,
  allDayContent: m,
  allDayDidMount: m,
  allDayWillUnmount: m,
  slotMinWidth: Number,
  navLinks: Boolean,
  eventTimeFormat: N,
  rerenderDelay: Number,
  moreLinkText: m,
  moreLinkHint: m,
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
  plugins: m,
  firstDay: Number,
  dayCount: Number,
  dateAlignment: String,
  dateIncrement: D,
  hiddenDays: m,
  fixedWeekCount: Boolean,
  validRange: m,
  visibleRange: m,
  titleFormat: m,
  eventInteractive: Boolean,
  // only used by list-view, but languages define the value, so we need it in base options
  noEventsText: String,
  viewHint: m,
  navLinkHint: m,
  closeHint: String,
  timeHint: String,
  eventHint: String,
  moreLinkClick: m,
  moreLinkClassNames: m,
  moreLinkContent: m,
  moreLinkDidMount: m,
  moreLinkWillUnmount: m,
  monthStartFormat: N,
  // for connectors
  // (can't be part of plugin system b/c must be provided at runtime)
  handleCustomRendering: m,
  customRenderingMetaMap: m,
  customRenderingReplaces: Boolean
}, Qe = {
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
}, ai = {
  datesSet: m,
  eventsSet: m,
  eventAdd: m,
  eventChange: m,
  eventRemove: m,
  windowResize: m,
  eventClick: m,
  eventMouseEnter: m,
  eventMouseLeave: m,
  select: m,
  unselect: m,
  loading: m,
  // internal
  _unmount: m,
  _beforeprint: m,
  _afterprint: m,
  _noEventDrop: m,
  _noEventResize: m,
  _resize: m,
  _scrollRequest: m
}, ci = {
  buttonText: m,
  buttonHints: m,
  views: m,
  plugins: m,
  initialEvents: m,
  events: m,
  eventSources: m
}, ue = {
  headerToolbar: fe,
  footerToolbar: fe,
  buttonText: fe,
  buttonHints: fe,
  buttonIcons: fe,
  dateIncrement: fe,
  plugins: ot,
  events: ot,
  eventSources: ot,
  resources: ot
};
function fe(t, e) {
  return typeof t == "object" && typeof e == "object" && t && e ? V(t, e) : t === e;
}
function ot(t, e) {
  return Array.isArray(t) && Array.isArray(e) ? oe(t, e) : t === e;
}
const Va = {
  type: String,
  component: m,
  buttonText: String,
  buttonTextKey: String,
  dateProfileGeneratorClass: m,
  usesMinMaxTime: Boolean,
  classNames: m,
  content: m,
  didMount: m,
  willUnmount: m
};
function rn(t) {
  return Qn(t, ue);
}
function Yn(t, e) {
  let n = {}, r = {};
  for (let i in e)
    i in t && (n[i] = e[i](t[i]));
  for (let i in t)
    i in e || (r[i] = t[i]);
  return { refined: n, extra: r };
}
function m(t) {
  return t;
}
const { hasOwnProperty: Tt } = Object.prototype;
function Qn(t, e) {
  let n = {};
  if (e) {
    for (let r in e)
      if (e[r] === fe) {
        let i = [];
        for (let s = t.length - 1; s >= 0; s -= 1) {
          let l = t[s][r];
          if (typeof l == "object" && l)
            i.unshift(l);
          else if (l !== void 0) {
            n[r] = l;
            break;
          }
        }
        i.length && (n[r] = Qn(i));
      }
  }
  for (let r = t.length - 1; r >= 0; r -= 1) {
    let i = t[r];
    for (let s in i)
      s in n || (n[s] = i[s]);
  }
  return n;
}
function be(t, e) {
  let n = {};
  for (let r in t)
    e(t[r], r) && (n[r] = t[r]);
  return n;
}
function X(t, e) {
  let n = {};
  for (let r in t)
    n[r] = e(t[r], r);
  return n;
}
function Ds(t) {
  let e = {};
  for (let n of t)
    e[n] = !0;
  return e;
}
function Zn(t) {
  let e = [];
  for (let n in t)
    e.push(t[n]);
  return e;
}
function V(t, e) {
  if (t === e)
    return !0;
  for (let n in t)
    if (Tt.call(t, n) && !(n in e))
      return !1;
  for (let n in e)
    if (Tt.call(e, n) && t[n] !== e[n])
      return !1;
  return !0;
}
const Ga = /^on[A-Z]/;
function qa(t, e) {
  const n = Ya(t, e);
  for (let r of n)
    if (!Ga.test(r))
      return !1;
  return !0;
}
function Ya(t, e) {
  let n = [];
  for (let r in t)
    Tt.call(t, r) && (r in e || n.push(r));
  for (let r in e)
    Tt.call(e, r) && t[r] !== e[r] && n.push(r);
  return n;
}
function sn(t, e, n = {}) {
  if (t === e)
    return !0;
  for (let r in e)
    if (!(r in t && Qa(t[r], e[r], n[r]))) return !1;
  for (let r in t)
    if (!(r in e))
      return !1;
  return !0;
}
function Qa(t, e, n) {
  return t === e || n === !0 ? !0 : n ? n(t, e) : !1;
}
function Za(t, e = 0, n, r = 1) {
  let i = [];
  n == null && (n = Object.keys(t).length);
  for (let s = e; s < n; s += r) {
    let l = t[s];
    l !== void 0 && i.push(l);
  }
  return i;
}
let _s = {};
function Xa(t, e) {
  _s[t] = e;
}
function Ka(t) {
  return new _s[t]();
}
class Ja {
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
    return U(e);
  }
  markerToArray(e) {
    return ie(e);
  }
}
Xa("gregory", Ja);
const ec = /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;
function tc(t) {
  let e = ec.exec(t);
  if (e) {
    let n = new Date(Date.UTC(Number(e[1]), e[3] ? Number(e[3]) - 1 : 0, Number(e[5] || 1), Number(e[7] || 0), Number(e[8] || 0), Number(e[10] || 0), e[12] ? +`0.${e[12]}` * 1e3 : 0));
    if (ws(n)) {
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
class nc {
  constructor(e) {
    let n = this.timeZone = e.timeZone, r = n !== "local" && n !== "UTC";
    e.namedTimeZoneImpl && r && (this.namedTimeZoneImpl = new e.namedTimeZoneImpl(n)), this.canComputeOffset = !!(!r || this.namedTimeZoneImpl), this.calendarSystem = Ka(e.calendarSystem), this.locale = e.locale, this.weekDow = e.locale.week.dow, this.weekDoy = e.locale.week.doy, e.weekNumberCalculation === "ISO" && (this.weekDow = 1, this.weekDoy = 4), typeof e.firstDay == "number" && (this.weekDow = e.firstDay), typeof e.weekNumberCalculation == "function" && (this.weekNumberFunc = e.weekNumberCalculation), this.weekText = e.weekText != null ? e.weekText : e.locale.options.weekText, this.weekTextLong = (e.weekTextLong != null ? e.weekTextLong : e.locale.options.weekTextLong) || this.weekText, this.cmdFormatter = e.cmdFormatter, this.defaultSeparator = e.defaultSeparator;
  }
  // Creating / Parsing
  createMarker(e) {
    let n = this.createMarkerMeta(e);
    return n === null ? null : n.marker;
  }
  createNowMarker() {
    return this.canComputeOffset ? this.timestampToMarker((/* @__PURE__ */ new Date()).valueOf()) : U(ri(/* @__PURE__ */ new Date()));
  }
  createMarkerMeta(e) {
    if (typeof e == "string")
      return this.parse(e);
    let n = null;
    return typeof e == "number" ? n = this.timestampToMarker(e) : e instanceof Date ? (e = e.valueOf(), isNaN(e) || (n = this.timestampToMarker(e))) : Array.isArray(e) && (n = U(e)), n === null || !ws(n) ? null : { marker: n, isTimeUnspecified: !1, forcedTzo: null };
  }
  parse(e) {
    let n = tc(e);
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
    return se(e) === se(n) && r.getMarkerDay(e) === r.getMarkerDay(n) && r.getMarkerMonth(e) === r.getMarkerMonth(n) ? r.getMarkerYear(n) - r.getMarkerYear(e) : null;
  }
  diffWholeMonths(e, n) {
    let { calendarSystem: r } = this;
    return se(e) === se(n) && r.getMarkerDay(e) === r.getMarkerDay(n) ? r.getMarkerMonth(n) - r.getMarkerMonth(e) + (r.getMarkerYear(n) - r.getMarkerYear(e)) * 12 : null;
  }
  // Range / Duration
  greatestWholeUnit(e, n) {
    let r = this.diffWholeYears(e, n);
    return r !== null ? { unit: "year", value: r } : (r = this.diffWholeMonths(e, n), r !== null ? { unit: "month", value: r } : (r = Aa(e, n), r !== null ? { unit: "week", value: r } : (r = Dt(e, n), r !== null ? { unit: "day", value: r } : (r = ba(e, n), pt(r) ? { unit: "hour", value: r } : (r = ya(e, n), pt(r) ? { unit: "minute", value: r } : (r = Ea(e, n), pt(r) ? { unit: "second", value: r } : { unit: "millisecond", value: n.valueOf() - e.valueOf() }))))));
  }
  countDurationsBetween(e, n, r) {
    let i;
    return r.years && (i = this.diffWholeYears(e, n), i !== null) ? i / ga(r) : r.months && (i = this.diffWholeMonths(e, n), i !== null) ? i / pa(r) : r.days && (i = Dt(e, n), i !== null) ? i / Me(r) : (n.valueOf() - e.valueOf()) / W(r);
  }
  // Start-Of
  // these DON'T return zoned-dates. only UTC start-of dates
  startOf(e, n) {
    return n === "year" ? this.startOfYear(e) : n === "month" ? this.startOfMonth(e) : n === "week" ? this.startOfWeek(e) : n === "day" ? k(e) : n === "hour" ? wa(e) : n === "minute" ? Ca(e) : n === "second" ? Da(e) : null;
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
    return this.weekNumberFunc ? this.weekNumberFunc(this.toDate(e)) : _a(e, this.weekDow, this.weekDoy);
  }
  // TODO: choke on timeZoneName: long
  format(e, n, r = {}) {
    return n.format({
      marker: e,
      timeZoneOffset: r.forcedTzo != null ? r.forcedTzo : this.offsetForMarker(e)
    }, this);
  }
  formatRange(e, n, r, i = {}) {
    return i.isEndExclusive && (n = ae(n, -1)), r.formatRange({
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
    return n.omitTimeZoneOffset || (n.forcedTzo != null ? r = n.forcedTzo : r = this.offsetForMarker(e)), Cs(e, r, n.omitTime);
  }
  // TimeZone
  timestampToMarker(e) {
    return this.timeZone === "local" ? U(ri(new Date(e))) : this.timeZone === "UTC" || !this.namedTimeZoneImpl ? new Date(e) : U(this.namedTimeZoneImpl.timestampToArray(e));
  }
  offsetForMarker(e) {
    return this.timeZone === "local" ? -ii(ie(e)).getTimezoneOffset() : this.timeZone === "UTC" ? 0 : this.namedTimeZoneImpl ? this.namedTimeZoneImpl.offsetForArray(ie(e)) : null;
  }
  // Conversion
  toDate(e, n) {
    return this.timeZone === "local" ? ii(ie(e)) : this.timeZone === "UTC" ? new Date(e.valueOf()) : this.namedTimeZoneImpl ? new Date(e.valueOf() - this.namedTimeZoneImpl.offsetForArray(ie(e)) * 1e3 * 60) : new Date(e.valueOf() - (n || 0));
  }
}
class nt {
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
nt.prototype.classes = {};
nt.prototype.iconClasses = {};
nt.prototype.baseIconClass = "";
nt.prototype.iconOverridePrefix = "";
function xt(t) {
  t();
  let e = S.debounceRendering, n = [];
  function r(i) {
    n.push(i);
  }
  for (S.debounceRendering = r, Je(g(rc, {}), document.createElement("div")); n.length; )
    n.shift()();
  S.debounceRendering = e;
}
class rc extends z {
  render() {
    return g("div", {});
  }
  componentDidMount() {
    this.setState({});
  }
}
function Rs(t) {
  let e = Ro(t), n = e.Provider;
  return e.Provider = function() {
    let r = !this.getChildContext, i = n.apply(this, arguments);
    if (r) {
      let s = [];
      this.shouldComponentUpdate = (l) => {
        this.props.value !== l.value && s.forEach((o) => {
          o.context = l.value, o.forceUpdate();
        });
      }, this.sub = (l) => {
        s.push(l);
        let o = l.componentWillUnmount;
        l.componentWillUnmount = () => {
          s.splice(s.indexOf(l), 1), o && o.call(l);
        };
      };
    }
    return i;
  }, e;
}
class ic {
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
const J = Rs({});
function sc(t, e, n, r, i, s, l, o, a, d, c, f, h, u) {
  return {
    dateEnv: i,
    nowManager: s,
    options: n,
    pluginHooks: o,
    emitter: c,
    dispatch: a,
    getCurrentData: d,
    calendarApi: f,
    viewSpec: t,
    viewApi: e,
    dateProfileGenerator: r,
    theme: l,
    isRtl: n.direction === "rtl",
    addResizeHandler(p) {
      c.on("_resize", p);
    },
    removeResizeHandler(p) {
      c.off("_resize", p);
    },
    createScrollResponder(p) {
      return new ic(p, c, D(n.scrollTime), n.scrollTimeReset);
    },
    registerInteractiveComponent: h,
    unregisterInteractiveComponent: u
  };
}
class we extends z {
  // debug: boolean
  shouldComponentUpdate(e, n) {
    return !sn(
      this.props,
      e,
      this.propEquality
      /*, this.debug */
    ) || !sn(
      this.state,
      n,
      this.stateEquality
      /*, this.debug */
    );
  }
  // HACK for freakin' React StrictMode
  safeSetState(e) {
    sn(this.state, Object.assign(Object.assign({}, this.state), e), this.stateEquality) || this.setState(e);
  }
}
we.addPropsEquality = lc;
we.addStateEquality = oc;
we.contextType = J;
we.prototype.propEquality = {};
we.prototype.stateEquality = {};
class R extends we {
}
R.contextType = J;
function lc(t) {
  let e = Object.create(this.prototype.propEquality);
  Object.assign(e, t), this.prototype.propEquality = e;
}
function oc(t) {
  let e = Object.create(this.prototype.stateEquality);
  Object.assign(e, t), this.prototype.stateEquality = e;
}
function q(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
class Xn extends R {
  constructor() {
    super(...arguments), this.id = Se(), this.queuedDomNodes = [], this.currentDomNodes = [], this.handleEl = (e) => {
      const { options: n } = this.context, { generatorName: r } = this.props;
      (!n.customRenderingReplaces || !An(r, n)) && this.updateElRef(e);
    }, this.updateElRef = (e) => {
      this.props.elRef && q(this.props.elRef, e);
    };
  }
  render() {
    const { props: e, context: n } = this, { options: r } = n, { customGenerator: i, defaultGenerator: s, renderProps: l } = e, o = Ts(e, [], this.handleEl);
    let a = !1, d, c = [], f;
    if (i != null) {
      const h = typeof i == "function" ? i(l, g) : i;
      if (h === !0)
        a = !0;
      else {
        const u = h && typeof h == "object";
        u && "html" in h ? o.dangerouslySetInnerHTML = { __html: h.html } : u && "domNodes" in h ? c = Array.prototype.slice.call(h.domNodes) : (u ? Ki(h) : typeof h != "function") ? d = h : f = h;
      }
    } else
      a = !An(e.generatorName, r);
    return a && s && (d = s(l)), this.queuedDomNodes = c, this.currentGeneratorMeta = f, g(e.elTag, o, d);
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
    const { props: r, context: i } = this, { handleCustomRendering: s, customRenderingMetaMap: l } = i.options;
    if (s) {
      const o = (n = this.currentGeneratorMeta) !== null && n !== void 0 ? n : l?.[r.generatorName];
      o && s(Object.assign(Object.assign({
        id: this.id,
        isActive: e,
        containerEl: this.base,
        reportNewContainerEl: this.updateElRef,
        // front-end framework tells us about new container els
        generatorMeta: o
      }, r), { elClasses: (r.elClasses || []).filter(ac) }));
    }
  }
  applyQueueudDomNodes() {
    const { queuedDomNodes: e, currentDomNodes: n } = this, r = this.base;
    if (!oe(e, n)) {
      n.forEach(Fn);
      for (let i of e)
        r.appendChild(i);
      this.currentDomNodes = e;
    }
  }
}
Xn.addPropsEquality({
  elClasses: oe,
  elStyle: V,
  elAttrs: qa,
  renderProps: V
});
function An(t, e) {
  var n;
  return !!(e.handleCustomRendering && t && (!((n = e.customRenderingMetaMap) === null || n === void 0) && n[t]));
}
function Ts(t, e, n) {
  const r = Object.assign(Object.assign({}, t.elAttrs), { ref: n });
  return (t.elClasses || e) && (r.className = (t.elClasses || []).concat(e || []).concat(r.className || []).filter(Boolean).join(" ")), t.elStyle && (r.style = t.elStyle), r;
}
function ac(t) {
  return !!t;
}
const xs = Rs(0);
class j extends z {
  constructor() {
    super(...arguments), this.InnerContent = cc.bind(void 0, this), this.handleEl = (e) => {
      this.el = e, this.props.elRef && (q(this.props.elRef, e), e && this.didMountMisfire && this.componentDidMount());
    };
  }
  render() {
    const { props: e } = this, n = dc(e.classNameGenerator, e.renderProps);
    if (e.children) {
      const r = Ts(e, n, this.handleEl), i = e.children(this.InnerContent, e.renderProps, r);
      return e.elTag ? g(e.elTag, r, i) : i;
    } else
      return g(Xn, Object.assign(Object.assign({}, e), { elRef: this.handleEl, elTag: e.elTag || "div", elClasses: (e.elClasses || []).concat(n), renderId: this.context }));
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
j.contextType = xs;
function cc(t, e) {
  const n = t.props;
  return g(Xn, Object.assign({ renderProps: n.renderProps, generatorName: n.generatorName, customGenerator: n.customGenerator, defaultGenerator: n.defaultGenerator, renderId: t.context }, e));
}
function dc(t, e) {
  const n = typeof t == "function" ? t(e) : t || [];
  return typeof n == "string" ? [n] : n;
}
class kt extends R {
  render() {
    let { props: e, context: n } = this, { options: r } = n, i = { view: n.viewApi };
    return g(j, { elRef: e.elRef, elTag: e.elTag || "div", elAttrs: e.elAttrs, elClasses: [
      ...ks(e.viewSpec),
      ...e.elClasses || []
    ], elStyle: e.elStyle, renderProps: i, classNameGenerator: r.viewClassNames, generatorName: void 0, didMount: r.viewDidMount, willUnmount: r.viewWillUnmount }, () => e.children);
  }
}
function ks(t) {
  return [
    `fc-${t.type}-view`,
    "fc-view"
  ];
}
function uc(t, e) {
  let n = null, r = null;
  return t.start && (n = e.createMarker(t.start)), t.end && (r = e.createMarker(t.end)), !n && !r || n && r && r < n ? null : { start: n, end: r };
}
function di(t, e) {
  let n = [], { start: r } = e, i, s;
  for (t.sort(fc), i = 0; i < t.length; i += 1)
    s = t[i], s.start > r && n.push({ start: r, end: s.start }), s.end > r && (r = s.end);
  return r < e.end && n.push({ start: r, end: e.end }), n;
}
function fc(t, e) {
  return t.start.valueOf() - e.start.valueOf();
}
function ye(t, e) {
  let { start: n, end: r } = t, i = null;
  return e.start !== null && (n === null ? n = e.start : n = new Date(Math.max(n.valueOf(), e.start.valueOf()))), e.end != null && (r === null ? r = e.end : r = new Date(Math.min(r.valueOf(), e.end.valueOf()))), (n === null || r === null || n < r) && (i = { start: n, end: r }), i;
}
function hc(t, e) {
  return (t.start === null ? null : t.start.valueOf()) === (e.start === null ? null : e.start.valueOf()) && (t.end === null ? null : t.end.valueOf()) === (e.end === null ? null : e.end.valueOf());
}
function Kn(t, e) {
  return (t.end === null || e.start === null || t.end > e.start) && (t.start === null || e.end === null || t.start < e.end);
}
function Wt(t, e) {
  return (t.start === null || e.start !== null && e.start >= t.start) && (t.end === null || e.end !== null && e.end <= t.end);
}
function Z(t, e) {
  return (t.start === null || e >= t.start) && (t.end === null || e < t.end);
}
function gc(t, e) {
  return e.start != null && t < e.start ? e.start : e.end != null && t >= e.end ? new Date(e.end.valueOf() - 1) : t;
}
function Ms(t) {
  let e = Math.floor(Ae(t.start, t.end)) || 1, n = k(t.start), r = H(n, e);
  return { start: n, end: r };
}
function Is(t, e = D(0)) {
  let n = null, r = null;
  if (t.end) {
    r = k(t.end);
    let i = t.end.valueOf() - r.valueOf();
    i && i >= W(e) && (r = H(r, 1));
  }
  return t.start && (n = k(t.start), r && r <= n && (r = H(n, 1))), { start: n, end: r };
}
function Re(t, e, n, r) {
  return r === "year" ? D(n.diffWholeYears(t, e), "year") : r === "month" ? D(n.diffWholeMonths(t, e), "month") : Sa(t, e);
}
class Ns {
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
    let { props: i } = this, s, l, o, a, d, c;
    return s = this.buildValidRange(), s = this.trimHiddenDays(s), r && (e = gc(e, s)), l = this.buildCurrentRangeInfo(e, n), o = /^(year|month|week|day)$/.test(l.unit), a = this.buildRenderRange(this.trimHiddenDays(l.range), l.unit, o), a = this.trimHiddenDays(a), d = a, i.showNonCurrentDates || (d = ye(d, l.range)), d = this.adjustActiveRange(d), d = ye(d, s), c = Kn(l.range, s), Z(a, e) || (e = a.start), {
      currentDate: e,
      // constraint for where prev/next operations can go and where events can be dragged/resized to.
      // an object with optional start and end properties.
      validRange: s,
      // range the view is formally responsible for.
      // for example, a month view might have 1st-31st, excluding padded dates
      currentRange: l.range,
      // name of largest unit being displayed, like "month" or "week"
      currentRangeUnit: l.unit,
      isRangeAllDay: o,
      // dates that display events and accept drag-n-drop
      // will be `null` if no dates accept events
      activeRange: d,
      // date range with a rendered skeleton
      // includes not-active days that need some sort of DOM
      renderRange: a,
      // Duration object that denotes the first visible time of any given day
      slotMinTime: i.slotMinTime,
      // Duration object that denotes the exclusive visible end time of any given day
      slotMaxTime: i.slotMaxTime,
      isValid: c,
      // how far the current date will move for a prev/next operation
      dateIncrement: this.buildDateIncrement(l.duration)
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
    let { props: r } = this, i = null, s = null, l = null, o;
    return r.duration ? (i = r.duration, s = r.durationUnit, l = this.buildRangeFromDuration(e, n, i, s)) : (o = this.props.dayCount) ? (s = "day", l = this.buildRangeFromDayCount(e, n, o)) : (l = this.buildCustomVisibleRange(e)) ? s = r.dateEnv.greatestWholeUnit(l.start, l.end).unit : (i = this.getFallbackDuration(), s = Sn(i).unit, l = this.buildRangeFromDuration(e, n, i, s)), { duration: i, unit: s, range: l };
  }
  getFallbackDuration() {
    return D({ day: 1 });
  }
  // Returns a new activeRange to have time values (un-ambiguate)
  // slotMinTime or slotMaxTime causes the range to expand.
  adjustActiveRange(e) {
    let { dateEnv: n, usesMinMaxTime: r, slotMinTime: i, slotMaxTime: s } = this.props, { start: l, end: o } = e;
    return r && (Me(i) < 0 && (l = k(l), l = n.add(l, i)), Me(s) > 1 && (o = k(o), o = H(o, -1), o = n.add(o, s))), { start: l, end: o };
  }
  // Builds the "current" range when it is specified as an explicit duration.
  // `unit` is the already-computed greatestDurationDenominator unit of duration.
  buildRangeFromDuration(e, n, r, i) {
    let { dateEnv: s, dateAlignment: l } = this.props, o, a, d;
    if (!l) {
      let { dateIncrement: f } = this.props;
      f && W(f) < W(r) ? l = Sn(f).unit : l = i;
    }
    Me(r) <= 1 && this.isHiddenDay(o) && (o = this.skipHiddenDays(o, n), o = k(o));
    function c() {
      o = s.startOf(e, l), a = s.add(o, r), d = { start: o, end: a };
    }
    return c(), this.trimHiddenDays(d) || (e = this.skipHiddenDays(e, n), c()), d;
  }
  // Builds the "current" range when a dayCount is specified.
  buildRangeFromDayCount(e, n, r) {
    let { dateEnv: i, dateAlignment: s } = this.props, l = 0, o = e, a;
    s && (o = i.startOf(o, s)), o = k(o), o = this.skipHiddenDays(o, n), a = o;
    do
      a = H(a, 1), this.isHiddenDay(a) || (l += 1);
    while (l < r);
    return { start: o, end: a };
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
    return n || ((r = this.props.dateAlignment) ? D(1, r) : e || D({ days: 1 }));
  }
  refineRange(e) {
    if (e) {
      let n = uc(e, this.props.dateEnv);
      return n && (n = Is(n)), n;
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
function Jn(t, e, n, r) {
  return {
    instanceId: Se(),
    defId: t,
    range: e,
    forcedStartTzo: n ?? null,
    forcedEndTzo: r ?? null
  };
}
function pc(t, e, n, r) {
  for (let i = 0; i < r.length; i += 1) {
    let s = r[i].parse(t, n);
    if (s) {
      let { allDay: l } = t;
      return l == null && (l = e, l == null && (l = s.allDayGuess, l == null && (l = !1))), {
        allDay: l,
        duration: s.duration,
        typeData: s.typeData,
        typeId: i
      };
    }
  }
  return null;
}
function Ee(t, e, n) {
  let { dateEnv: r, pluginHooks: i, options: s } = n, { defs: l, instances: o } = t;
  o = be(o, (a) => !l[a.defId].recurringDef);
  for (let a in l) {
    let d = l[a];
    if (d.recurringDef) {
      let { duration: c } = d.recurringDef;
      c || (c = d.allDay ? s.defaultAllDayEventDuration : s.defaultTimedEventDuration);
      let f = mc(d, c, e, r, i.recurringTypes);
      for (let h of f) {
        let u = Jn(a, {
          start: h,
          end: r.add(h, c)
        });
        o[u.instanceId] = u;
      }
    }
  }
  return { defs: l, instances: o };
}
function mc(t, e, n, r, i) {
  let l = i[t.recurringDef.typeId].expand(t.recurringDef.typeData, {
    start: r.subtract(n.start, e),
    end: n.end
  }, r);
  return t.allDay && (l = l.map(k)), l;
}
const vt = {
  id: String,
  groupId: String,
  title: String,
  url: String,
  interactive: Boolean
}, Os = {
  start: m,
  end: m,
  date: m,
  allDay: Boolean
}, vc = Object.assign(Object.assign(Object.assign({}, vt), Os), { extendedProps: m });
function Ps(t, e, n, r, i = er(n), s, l) {
  let { refined: o, extra: a } = Hs(t, n, i), d = yc(e, n), c = pc(o, d, n.dateEnv, n.pluginHooks.recurringTypes);
  if (c) {
    let h = wn(o, a, e ? e.sourceId : "", c.allDay, !!c.duration, n, s);
    return h.recurringDef = {
      typeId: c.typeId,
      typeData: c.typeData,
      duration: c.duration
    }, { def: h, instance: null };
  }
  let f = bc(o, d, n, r);
  if (f) {
    let h = wn(o, a, e ? e.sourceId : "", f.allDay, f.hasEnd, n, s), u = Jn(h.defId, f.range, f.forcedStartTzo, f.forcedEndTzo);
    return l && h.publicId && l[h.publicId] && (u.instanceId = l[h.publicId]), { def: h, instance: u };
  }
  return null;
}
function Hs(t, e, n = er(e)) {
  return Yn(t, n);
}
function er(t) {
  return Object.assign(Object.assign(Object.assign({}, Mt), vc), t.pluginHooks.eventRefiners);
}
function wn(t, e, n, r, i, s, l) {
  let o = {
    title: t.title || "",
    groupId: t.groupId || "",
    publicId: t.id || "",
    url: t.url || "",
    recurringDef: null,
    defId: (l && t.id ? l[t.id] : "") || Se(),
    sourceId: n,
    allDay: r,
    hasEnd: i,
    interactive: t.interactive,
    ui: It(t, s),
    extendedProps: Object.assign(Object.assign({}, t.extendedProps || {}), e)
  };
  for (let a of s.pluginHooks.eventDefMemberAdders)
    Object.assign(o, a(t));
  return Object.freeze(o.ui.classNames), Object.freeze(o.extendedProps), o;
}
function bc(t, e, n, r) {
  let { allDay: i } = t, s, l = null, o = !1, a, d = null, c = t.start != null ? t.start : t.date;
  if (s = n.dateEnv.createMarkerMeta(c), s)
    l = s.marker;
  else if (!r)
    return null;
  return t.end != null && (a = n.dateEnv.createMarkerMeta(t.end)), i == null && (e != null ? i = e : i = (!s || s.isTimeUnspecified) && (!a || a.isTimeUnspecified)), i && l && (l = k(l)), a && (d = a.marker, i && (d = k(d)), l && d <= l && (d = null)), d ? o = !0 : r || (o = n.options.forceEventDuration || !1, d = n.dateEnv.add(l, i ? n.options.defaultAllDayEventDuration : n.options.defaultTimedEventDuration)), {
    allDay: i,
    hasEnd: o,
    range: { start: l, end: d },
    forcedStartTzo: s ? s.forcedTzo : null,
    forcedEndTzo: a ? a.forcedTzo : null
  };
}
function yc(t, e) {
  let n = null;
  return t && (n = t.defaultAllDay), n == null && (n = e.options.defaultAllDay), n;
}
function et(t, e, n, r, i, s) {
  let l = F(), o = er(n);
  for (let a of t) {
    let d = Ps(a, e, n, r, o, i, s);
    d && Cn(d, l);
  }
  return l;
}
function Cn(t, e = F()) {
  return e.defs[t.def.defId] = t.def, t.instance && (e.instances[t.instance.instanceId] = t.instance), e;
}
function tr(t, e) {
  let n = t.instances[e];
  if (n) {
    let r = t.defs[n.defId], i = Vt(t, (s) => Ec(r, s));
    return i.defs[r.defId] = r, i.instances[n.instanceId] = n, i;
  }
  return F();
}
function Ec(t, e) {
  return !!(t.groupId && t.groupId === e.groupId);
}
function F() {
  return { defs: {}, instances: {} };
}
function nr(t, e) {
  return {
    defs: Object.assign(Object.assign({}, t.defs), e.defs),
    instances: Object.assign(Object.assign({}, t.instances), e.instances)
  };
}
function Vt(t, e) {
  let n = be(t.defs, e), r = be(t.instances, (i) => n[i.defId]);
  return { defs: n, instances: r };
}
function Sc(t, e) {
  let { defs: n, instances: r } = t, i = {}, s = {};
  for (let l in n)
    e.defs[l] || (i[l] = n[l]);
  for (let l in r)
    !e.instances[l] && // not explicitly excluded
    i[r[l].defId] && (s[l] = r[l]);
  return {
    defs: i,
    instances: s
  };
}
function Ac(t, e) {
  return Array.isArray(t) ? et(t, null, e, !0) : typeof t == "object" && t ? et([t], null, e, !0) : t != null ? String(t) : null;
}
function ui(t) {
  return Array.isArray(t) ? t : typeof t == "string" ? t.split(/\s+/) : [];
}
const Mt = {
  display: String,
  editable: Boolean,
  startEditable: Boolean,
  durationEditable: Boolean,
  constraint: m,
  overlap: m,
  allow: m,
  className: ui,
  classNames: ui,
  color: String,
  backgroundColor: String,
  borderColor: String,
  textColor: String
}, wc = {
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
function It(t, e) {
  let n = Ac(t.constraint, e);
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
function Bs(t) {
  return t.reduce(Cc, wc);
}
function Cc(t, e) {
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
const Dc = {
  id: String,
  defaultAllDay: Boolean,
  url: String,
  format: String,
  events: m,
  eventDataTransform: m,
  // for any network-related sources
  success: m,
  failure: m
};
function $s(t, e, n = Ls(e)) {
  let r;
  if (typeof t == "string" ? r = { url: t } : typeof t == "function" || Array.isArray(t) ? r = { events: t } : typeof t == "object" && t && (r = t), r) {
    let { refined: i, extra: s } = Yn(r, n), l = _c(i, e);
    if (l)
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
        sourceId: Se(),
        sourceDefId: l.sourceDefId,
        meta: l.meta,
        ui: It(i, e),
        extendedProps: s
      };
  }
  return null;
}
function Ls(t) {
  return Object.assign(Object.assign(Object.assign({}, Mt), Dc), t.pluginHooks.eventSourceRefiners);
}
function _c(t, e) {
  let n = e.pluginHooks.eventSourceDefs;
  for (let r = n.length - 1; r >= 0; r -= 1) {
    let s = n[r].parseMeta(t);
    if (s)
      return { sourceDefId: r, meta: s };
  }
  return null;
}
function Rc(t, e, n, r, i) {
  switch (e.type) {
    case "RECEIVE_EVENTS":
      return Tc(t, n[e.sourceId], e.fetchId, e.fetchRange, e.rawEvents, i);
    case "RESET_RAW_EVENTS":
      return xc(t, n[e.sourceId], e.rawEvents, r.activeRange, i);
    case "ADD_EVENTS":
      return kc(
        t,
        e.eventStore,
        // new ones
        r ? r.activeRange : null,
        i
      );
    case "RESET_EVENTS":
      return e.eventStore;
    case "MERGE_EVENTS":
      return nr(t, e.eventStore);
    case "PREV":
    // TODO: how do we track all actions that affect dateProfile :(
    case "NEXT":
    case "CHANGE_DATE":
    case "CHANGE_VIEW_TYPE":
      return r ? Ee(t, r.activeRange, i) : t;
    case "REMOVE_EVENTS":
      return Sc(t, e.eventStore);
    case "REMOVE_EVENT_SOURCE":
      return zs(t, e.sourceId);
    case "REMOVE_ALL_EVENT_SOURCES":
      return Vt(t, (s) => !s.sourceId);
    case "REMOVE_ALL_EVENTS":
      return F();
    default:
      return t;
  }
}
function Tc(t, e, n, r, i, s) {
  if (e && // not already removed
  n === e.latestFetchId) {
    let l = et(Us(i, e, s), e, s);
    return r && (l = Ee(l, r, s)), nr(zs(t, e.sourceId), l);
  }
  return t;
}
function xc(t, e, n, r, i) {
  const { defIdMap: s, instanceIdMap: l } = Ic(t);
  let o = et(Us(n, e, i), e, i, !1, s, l);
  return Ee(o, r, i);
}
function Us(t, e, n) {
  let r = n.options.eventDataTransform, i = e ? e.eventDataTransform : null;
  return i && (t = fi(t, i)), r && (t = fi(t, r)), t;
}
function fi(t, e) {
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
function kc(t, e, n, r) {
  return n && (e = Ee(e, n, r)), nr(t, e);
}
function hi(t, e, n) {
  let { defs: r } = t, i = X(t.instances, (s) => r[s.defId].allDay ? s : Object.assign(Object.assign({}, s), { range: {
    start: n.createMarker(e.toDate(s.range.start, s.forcedStartTzo)),
    end: n.createMarker(e.toDate(s.range.end, s.forcedEndTzo))
  }, forcedStartTzo: n.canComputeOffset ? null : s.forcedStartTzo, forcedEndTzo: n.canComputeOffset ? null : s.forcedEndTzo }));
  return { defs: r, instances: i };
}
function zs(t, e) {
  return Vt(t, (n) => n.sourceId !== e);
}
function Mc(t, e) {
  return {
    defs: t.defs,
    instances: be(t.instances, (n) => !e[n.instanceId])
  };
}
function Ic(t) {
  const { defs: e, instances: n } = t, r = {}, i = {};
  for (let s in e) {
    const l = e[s], { publicId: o } = l;
    o && (r[o] = s);
  }
  for (let s in n) {
    const l = n[s], o = e[l.defId], { publicId: a } = o;
    a && (i[a] = s);
  }
  return { defIdMap: r, instanceIdMap: i };
}
class Gt {
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
    Nc(this.handlers, e, n);
  }
  off(e, n) {
    Oc(this.handlers, e, n);
  }
  trigger(e, ...n) {
    let r = this.handlers[e] || [], i = this.options && this.options[e], s = [].concat(i || [], r);
    for (let l of s)
      l.apply(this.thisContext, n);
  }
  hasHandlers(e) {
    return !!(this.handlers[e] && this.handlers[e].length || this.options && this.options[e]);
  }
}
function Nc(t, e, n) {
  (t[e] || (t[e] = [])).push(n);
}
function Oc(t, e, n) {
  n ? t[e] && (t[e] = t[e].filter((r) => r !== n)) : delete t[e];
}
const Pc = {
  startTime: "09:00",
  endTime: "17:00",
  daysOfWeek: [1, 2, 3, 4, 5],
  display: "inverse-background",
  classNames: "fc-non-business",
  groupId: "_businessHours"
  // so multiple defs get grouped
};
function Hc(t, e) {
  return et(Bc(t), null, e);
}
function Bc(t) {
  let e;
  return t === !0 ? e = [{}] : Array.isArray(t) ? e = t.filter((n) => n.daysOfWeek) : typeof t == "object" && t ? e = [t] : e = [], e = e.map((n) => Object.assign(Object.assign({}, Pc), n)), e;
}
function Fs(t, e, n) {
  n.emitter.trigger("select", Object.assign(Object.assign({}, rr(t, n)), { jsEvent: e ? e.origEvent : null, view: n.viewApi || n.calendarApi.view }));
}
function $c(t, e) {
  e.emitter.trigger("unselect", {
    jsEvent: t ? t.origEvent : null,
    view: e.viewApi || e.calendarApi.view
  });
}
function rr(t, e) {
  let n = {};
  for (let r of e.pluginHooks.dateSpanTransforms)
    Object.assign(n, r(t, e));
  return Object.assign(n, Kc(t, e.dateEnv)), n;
}
function gi(t, e, n) {
  let { dateEnv: r, options: i } = n, s = e;
  return t ? (s = k(s), s = r.add(s, i.defaultAllDayEventDuration)) : s = r.add(s, i.defaultTimedEventDuration), s;
}
function ir(t, e, n, r) {
  let i = Nt(t.defs, e), s = F();
  for (let l in t.defs) {
    let o = t.defs[l];
    s.defs[l] = Lc(o, i[l], n, r);
  }
  for (let l in t.instances) {
    let o = t.instances[l], a = s.defs[o.defId];
    s.instances[l] = Uc(o, a, i[o.defId], n, r);
  }
  return s;
}
function Lc(t, e, n, r) {
  let i = n.standardProps || {};
  i.hasEnd == null && e.durationEditable && (n.startDelta || n.endDelta) && (i.hasEnd = !0);
  let s = Object.assign(Object.assign(Object.assign({}, t), i), { ui: Object.assign(Object.assign({}, t.ui), i.ui) });
  n.extendedProps && (s.extendedProps = Object.assign(Object.assign({}, s.extendedProps), n.extendedProps));
  for (let l of r.pluginHooks.eventDefMutationAppliers)
    l(s, n, r);
  return !s.hasEnd && r.options.forceEventDuration && (s.hasEnd = !0), s;
}
function Uc(t, e, n, r, i) {
  let { dateEnv: s } = i, l = r.standardProps && r.standardProps.allDay === !0, o = r.standardProps && r.standardProps.hasEnd === !1, a = Object.assign({}, t);
  return l && (a.range = Ms(a.range)), r.datesDelta && n.startEditable && (a.range = {
    start: s.add(a.range.start, r.datesDelta),
    end: s.add(a.range.end, r.datesDelta)
  }), r.startDelta && n.durationEditable && (a.range = {
    start: s.add(a.range.start, r.startDelta),
    end: a.range.end
  }), r.endDelta && n.durationEditable && (a.range = {
    start: a.range.start,
    end: s.add(a.range.end, r.endDelta)
  }), o && (a.range = {
    start: a.range.start,
    end: gi(e.allDay, a.range.start, i)
  }), e.allDay && (a.range = {
    start: k(a.range.start),
    end: k(a.range.end)
  }), a.range.end < a.range.start && (a.range.end = gi(e.allDay, a.range.start, i)), a;
}
class _e {
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
class I {
  // instance will be null if expressing a recurring event that has no current instances,
  // OR if trying to validate an incoming external event that has no dates assigned
  constructor(e, n, r) {
    this._context = e, this._def = n, this._instance = r || null;
  }
  /*
  TODO: make event struct more responsible for this
  */
  setProp(e, n) {
    if (e in Os)
      console.warn("Could not set date-related prop 'name'. Use one of the date-related methods instead.");
    else if (e === "id")
      n = vt[e](n), this.mutate({
        standardProps: { publicId: n }
        // hardcoded internal name
      });
    else if (e in vt)
      n = vt[e](n), this.mutate({
        standardProps: { [e]: n }
      });
    else if (e in Mt) {
      let r = Mt[e](n);
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
      let s = this._instance.range, l = Re(s.start, i, r, n.granularity);
      n.maintainDuration ? this.mutate({ datesDelta: l }) : this.mutate({ startDelta: l });
    }
  }
  setEnd(e, n = {}) {
    let { dateEnv: r } = this._context, i;
    if (!(e != null && (i = r.createMarker(e), !i)) && this._instance)
      if (i) {
        let s = Re(this._instance.range.end, i, r, n.granularity);
        this.mutate({ endDelta: s });
      } else
        this.mutate({ standardProps: { hasEnd: !1 } });
  }
  setDates(e, n, r = {}) {
    let { dateEnv: i } = this._context, s = { allDay: r.allDay }, l = i.createMarker(e), o;
    if (l && !(n != null && (o = i.createMarker(n), !o)) && this._instance) {
      let a = this._instance.range;
      r.allDay === !0 && (a = Ms(a));
      let d = Re(a.start, l, i, r.granularity);
      if (o) {
        let c = Re(a.end, o, i, r.granularity);
        ua(d, c) ? this.mutate({ datesDelta: d, standardProps: s }) : this.mutate({ startDelta: d, endDelta: c, standardProps: s });
      } else
        s.hasEnd = !1, this.mutate({ datesDelta: d, standardProps: s });
    }
  }
  moveStart(e) {
    let n = D(e);
    n && this.mutate({ startDelta: n });
  }
  moveEnd(e) {
    let n = D(e);
    n && this.mutate({ endDelta: n });
  }
  moveDates(e) {
    let n = D(e);
    n && this.mutate({ datesDelta: n });
  }
  setAllDay(e, n = {}) {
    let r = { allDay: e }, { maintainDuration: i } = n;
    i == null && (i = this._context.options.allDayMaintainDuration), this._def.allDay !== e && (r.hasEnd = i), this.mutate({ standardProps: r });
  }
  formatRange(e) {
    let { dateEnv: n } = this._context, r = this._instance, i = N(e);
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
      let r = this._def, i = this._context, { eventStore: s } = i.getCurrentData(), l = tr(s, n.instanceId);
      l = ir(l, {
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
      let a = new I(i, r, n);
      this._def = l.defs[r.defId], this._instance = l.instances[n.instanceId], i.dispatch({
        type: "MERGE_EVENTS",
        eventStore: l
      }), i.emitter.trigger("eventChange", {
        oldEvent: a,
        event: this,
        relatedEvents: pe(l, i, n),
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
    let e = this._context, n = js(this);
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
    return e ? new _e(this._context, this._context.getCurrentData().eventSources[e]) : null;
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
    let n = this._def, { ui: r } = n, { startStr: i, endStr: s } = this, l = {
      allDay: n.allDay
    };
    return n.title && (l.title = n.title), i && (l.start = i), s && (l.end = s), n.publicId && (l.id = n.publicId), n.groupId && (l.groupId = n.groupId), n.url && (l.url = n.url), r.display && r.display !== "auto" && (l.display = r.display), e.collapseColor && r.backgroundColor && r.backgroundColor === r.borderColor ? l.color = r.backgroundColor : (r.backgroundColor && (l.backgroundColor = r.backgroundColor), r.borderColor && (l.borderColor = r.borderColor)), r.textColor && (l.textColor = r.textColor), r.classNames.length && (l.classNames = r.classNames), Object.keys(n.extendedProps).length && (e.collapseExtendedProps ? Object.assign(l, n.extendedProps) : l.extendedProps = n.extendedProps), l;
  }
  toJSON() {
    return this.toPlainObject();
  }
}
function js(t) {
  let e = t._def, n = t._instance;
  return {
    defs: { [e.defId]: e },
    instances: n ? { [n.instanceId]: n } : {}
  };
}
function pe(t, e, n) {
  let { defs: r, instances: i } = t, s = [], l = n ? n.instanceId : "";
  for (let o in i) {
    let a = i[o], d = r[a.defId];
    a.instanceId !== l && s.push(new I(e, d, a));
  }
  return s;
}
function pi(t, e, n, r) {
  let i = {}, s = {}, l = {}, o = [], a = [], d = Nt(t.defs, e);
  for (let c in t.defs) {
    let f = t.defs[c];
    d[f.defId].display === "inverse-background" && (f.groupId ? (i[f.groupId] = [], l[f.groupId] || (l[f.groupId] = f)) : s[c] = []);
  }
  for (let c in t.instances) {
    let f = t.instances[c], h = t.defs[f.defId], u = d[h.defId], p = f.range, v = !h.allDay && r ? Is(p, r) : p, b = ye(v, n);
    b && (u.display === "inverse-background" ? h.groupId ? i[h.groupId].push(b) : s[f.defId].push(b) : u.display !== "none" && (u.display === "background" ? o : a).push({
      def: h,
      ui: u,
      instance: f,
      range: b,
      isStart: v.start && v.start.valueOf() === b.start.valueOf(),
      isEnd: v.end && v.end.valueOf() === b.end.valueOf()
    }));
  }
  for (let c in i) {
    let f = i[c], h = di(f, n);
    for (let u of h) {
      let p = l[c], v = d[p.defId];
      o.push({
        def: p,
        ui: v,
        instance: null,
        range: u,
        isStart: !1,
        isEnd: !1
      });
    }
  }
  for (let c in s) {
    let f = s[c], h = di(f, n);
    for (let u of h)
      o.push({
        def: t.defs[c],
        ui: d[c],
        instance: null,
        range: u,
        isStart: !1,
        isEnd: !1
      });
  }
  return { bg: o, fg: a };
}
function zc(t) {
  return t.ui.display === "background" || t.ui.display === "inverse-background";
}
function mi(t, e) {
  t.fcSeg = e;
}
function Be(t) {
  return t.fcSeg || t.parentNode.fcSeg || // for the harness
  null;
}
function Nt(t, e) {
  return X(t, (n) => Ws(n, e));
}
function Ws(t, e) {
  let n = [];
  return e[""] && n.push(e[""]), e[t.defId] && n.push(e[t.defId]), n.push(t.ui), Bs(n);
}
function Vs(t, e) {
  let n = t.map(Fc);
  return n.sort((r, i) => ia(r, i, e)), n.map((r) => r._seg);
}
function Fc(t) {
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
function jc(t, e) {
  let { pluginHooks: n } = e, r = n.isDraggableTransformers, { def: i, ui: s } = t.eventRange, l = s.startEditable;
  for (let o of r)
    l = o(l, i, s, e);
  return l;
}
function Wc(t, e) {
  return t.isStart && t.eventRange.ui.durationEditable && e.options.eventResizableFromStart;
}
function Vc(t, e) {
  return t.isEnd && t.eventRange.ui.durationEditable;
}
function Gs(t, e, n, r, i, s, l) {
  let { dateEnv: o, options: a } = n, { displayEventTime: d, displayEventEnd: c } = a, f = t.eventRange.def, h = t.eventRange.instance;
  d == null && (d = r !== !1), c == null && (c = i !== !1);
  let u = h.range.start, p = h.range.end, v = t.start || t.eventRange.range.start, b = t.end || t.eventRange.range.end, y = k(u).valueOf() === k(v).valueOf(), E = k(ae(p, -1)).valueOf() === k(ae(b, -1)).valueOf();
  return d && !f.allDay && (y || E) ? (v = y ? u : v, b = E ? p : b, c && f.hasEnd ? o.formatRange(v, b, e, {
    forcedStartTzo: h.forcedStartTzo,
    forcedEndTzo: h.forcedEndTzo
  }) : o.format(v, e, {
    forcedTzo: h.forcedStartTzo
    // nooooo, same
  })) : "";
}
function le(t, e, n) {
  let r = t.eventRange.range;
  return {
    isPast: r.end <= (n || e.start),
    isFuture: r.start >= (n || e.end),
    isToday: e && Z(e, r.start)
  };
}
function Gc(t) {
  let e = ["fc-event"];
  return t.isMirror && e.push("fc-event-mirror"), t.isDraggable && e.push("fc-event-draggable"), (t.isStartResizable || t.isEndResizable) && e.push("fc-event-resizable"), t.isDragging && e.push("fc-event-dragging"), t.isResizing && e.push("fc-event-resizing"), t.isSelected && e.push("fc-event-selected"), t.isStart && e.push("fc-event-start"), t.isEnd && e.push("fc-event-end"), t.isPast && e.push("fc-event-past"), t.isToday && e.push("fc-event-today"), t.isFuture && e.push("fc-event-future"), e;
}
function qs(t) {
  return t.instance ? t.instance.instanceId : `${t.def.defId}:${t.range.start.toISOString()}`;
}
function Ys(t, e) {
  let { def: n, instance: r } = t.eventRange, { url: i } = n;
  if (i)
    return { href: i };
  let { emitter: s, options: l } = e, { eventInteractive: o } = l;
  return o == null && (o = n.interactive, o == null && (o = !!s.hasHandlers("eventClick"))), o ? As((a) => {
    s.trigger("eventClick", {
      el: a.target,
      event: new I(e, n, r),
      jsEvent: a,
      view: e.viewApi
    });
  }) : {};
}
const qc = {
  start: m,
  end: m,
  allDay: Boolean
};
function Yc(t, e, n) {
  let r = Qc(t, e), { range: i } = r;
  if (!i.start)
    return null;
  if (!i.end) {
    if (n == null)
      return null;
    i.end = e.add(i.start, n);
  }
  return r;
}
function Qc(t, e) {
  let { refined: n, extra: r } = Yn(t, qc), i = n.start ? e.createMarkerMeta(n.start) : null, s = n.end ? e.createMarkerMeta(n.end) : null, { allDay: l } = n;
  return l == null && (l = i && i.isTimeUnspecified && (!s || s.isTimeUnspecified)), Object.assign({ range: {
    start: i ? i.marker : null,
    end: s ? s.marker : null
  }, allDay: l }, r);
}
function Zc(t, e) {
  return hc(t.range, e.range) && t.allDay === e.allDay && Xc(t, e);
}
function Xc(t, e) {
  for (let n in e)
    if (n !== "range" && n !== "allDay" && t[n] !== e[n])
      return !1;
  for (let n in t)
    if (!(n in e))
      return !1;
  return !0;
}
function Kc(t, e) {
  return Object.assign(Object.assign({}, Zs(t.range, e, t.allDay)), { allDay: t.allDay });
}
function Qs(t, e, n) {
  return Object.assign(Object.assign({}, Zs(t, e, n)), { timeZone: e.timeZone });
}
function Zs(t, e, n) {
  return {
    start: e.toDate(t.start),
    end: e.toDate(t.end),
    startStr: e.formatIso(t.start, { omitTime: n }),
    endStr: e.formatIso(t.end, { omitTime: n })
  };
}
function Jc(t, e, n) {
  let r = Hs({ editable: !1 }, n), i = wn(
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
    ui: Ws(i, e),
    instance: Jn(i.defId, t.range),
    range: t.range,
    isStart: !0,
    isEnd: !0
  };
}
function ed(t, e, n) {
  let r = !1, i = function(o) {
    r || (r = !0, e(o));
  }, s = function(o) {
    r || (r = !0, n(o));
  }, l = t(i, s);
  l && typeof l.then == "function" && l.then(i, s);
}
class vi extends Error {
  constructor(e, n) {
    super(e), this.response = n;
  }
}
function td(t, e, n) {
  t = t.toUpperCase();
  const r = {
    method: t
  };
  return t === "GET" ? e += (e.indexOf("?") === -1 ? "?" : "&") + new URLSearchParams(n) : (r.body = new URLSearchParams(n), r.headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  }), fetch(e, r).then((i) => {
    if (i.ok)
      return i.json().then((s) => [s, i], () => {
        throw new vi("Failure parsing JSON", i);
      });
    throw new vi("Request failed", i);
  });
}
let ln;
function Xs() {
  return ln == null && (ln = nd()), ln;
}
function nd() {
  if (typeof document > "u")
    return !0;
  let t = document.createElement("div");
  t.style.position = "absolute", t.style.top = "0px", t.style.left = "0px", t.innerHTML = "<table><tr><td><div></div></td></tr></table>", t.querySelector("table").style.height = "100px", t.querySelector("div").style.height = "100%", document.body.appendChild(t);
  let n = t.querySelector("div").offsetHeight > 0;
  return document.body.removeChild(t), n;
}
class rd extends R {
  constructor() {
    super(...arguments), this.state = {
      forPrint: !1
    }, this.handleBeforePrint = () => {
      xt(() => {
        this.setState({ forPrint: !0 });
      });
    }, this.handleAfterPrint = () => {
      xt(() => {
        this.setState({ forPrint: !1 });
      });
    };
  }
  render() {
    let { props: e } = this, { options: n } = e, { forPrint: r } = this.state, i = r || n.height === "auto" || n.contentHeight === "auto", s = !i && n.height != null ? n.height : "", l = [
      "fc",
      r ? "fc-media-print" : "fc-media-screen",
      `fc-direction-${n.direction}`,
      e.theme.getClass("root")
    ];
    return Xs() || l.push("fc-liquid-hack"), e.children(l, s, i, r);
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
class ze {
  constructor(e) {
    this.component = e.component, this.isHitComboAllowed = e.isHitComboAllowed || null;
  }
  destroy() {
  }
}
function id(t, e) {
  return {
    component: t,
    el: e.el,
    useEventCenter: e.useEventCenter != null ? e.useEventCenter : !0,
    isHitComboAllowed: e.isHitComboAllowed || null
  };
}
function sr(t) {
  return {
    [t.component.uid]: t
  };
}
const Dn = {};
class Fe extends z {
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
    let s, l;
    return i ? (s = n.dateEnv.startOf(r, e.unit), l = n.dateEnv.add(s, D(1, e.unit)).valueOf() - r.valueOf()) : (s = r, l = 1e3 * 60), l = Math.min(1e3 * 60 * 60 * 24, l), {
      state: { nowDate: s, todayRange: sd(s) },
      waitMs: l
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
Fe.contextType = J;
function sd(t) {
  let e = k(t), n = H(e, 1);
  return { start: e, end: n };
}
class ld {
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
    let { viewSpecs: n, toolbarConfig: r } = this.getCurrentData(), i = [].concat(r.header ? r.header.viewsWithButtons : [], r.footer ? r.footer.viewsWithButtons : []), s, l;
    for (let o in n)
      i.push(o);
    for (s = 0; s < i.length; s += 1)
      if (l = n[i[s]], l && l.singleUnit === e)
        return l;
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
    let n = this.getCurrentData(), r = D(e);
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
    return r.format(r.createMarker(e), N(n));
  }
  // `settings` is for formatter AND isEndExclusive
  formatRange(e, n, r) {
    let { dateEnv: i } = this.getCurrentData();
    return i.formatRange(i.createMarker(e), i.createMarker(n), N(r), r);
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
    let i = this.getCurrentData(), s = Yc(r, i.dateEnv, D({ days: 1 }));
    s && (this.dispatch({ type: "SELECT_DATES", selection: s }), Fs(s, null, i));
  }
  unselect(e) {
    let n = this.getCurrentData();
    n.dateSelection && (this.dispatch({ type: "UNSELECT_DATES" }), $c(e, n));
  }
  // Public Events API
  // -----------------------------------------------------------------------------------------------------------------
  addEvent(e, n) {
    if (e instanceof I) {
      let l = e._def, o = e._instance;
      return this.getCurrentData().eventStore.defs[l.defId] || (this.dispatch({
        type: "ADD_EVENTS",
        eventStore: Cn({ def: l, instance: o })
        // TODO: better util for two args?
      }), this.triggerEventAdd(e)), e;
    }
    let r = this.getCurrentData(), i;
    if (n instanceof _e)
      i = n.internalEventSource;
    else if (typeof n == "boolean")
      n && ([i] = Zn(r.eventSources));
    else if (n != null) {
      let l = this.getEventSourceById(n);
      if (!l)
        return console.warn(`Could not find an event source with ID "${n}"`), null;
      i = l.internalEventSource;
    }
    let s = Ps(e, i, r, !1);
    if (s) {
      let l = new I(r, s.def, s.def.recurringDef ? null : s.instance);
      return this.dispatch({
        type: "ADD_EVENTS",
        eventStore: Cn(s)
      }), this.triggerEventAdd(l), l;
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
          eventStore: js(e)
        });
      }
    });
  }
  // TODO: optimize
  getEventById(e) {
    let n = this.getCurrentData(), { defs: r, instances: i } = n.eventStore;
    e = String(e);
    for (let s in r) {
      let l = r[s];
      if (l.publicId === e) {
        if (l.recurringDef)
          return new I(n, l, null);
        for (let o in i) {
          let a = i[o];
          if (a.defId === l.defId)
            return new I(n, l, a);
        }
      }
    }
    return null;
  }
  getEvents() {
    let e = this.getCurrentData();
    return pe(e.eventStore, e);
  }
  removeAllEvents() {
    this.dispatch({ type: "REMOVE_ALL_EVENTS" });
  }
  // Public Event Sources API
  // -----------------------------------------------------------------------------------------------------------------
  getEventSources() {
    let e = this.getCurrentData(), n = e.eventSources, r = [];
    for (let i in n)
      r.push(new _e(e, n[i]));
    return r;
  }
  getEventSourceById(e) {
    let n = this.getCurrentData(), r = n.eventSources;
    e = String(e);
    for (let i in r)
      if (r[i].publicId === e)
        return new _e(n, r[i]);
    return null;
  }
  addEventSource(e) {
    let n = this.getCurrentData();
    if (e instanceof _e)
      return n.eventSources[e.internalEventSource.sourceId] || this.dispatch({
        type: "ADD_EVENT_SOURCES",
        sources: [e.internalEventSource]
      }), e;
    let r = $s(e, n);
    return r ? (this.dispatch({ type: "ADD_EVENT_SOURCES", sources: [r] }), new _e(n, r)) : null;
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
    let n = D(e);
    n && this.trigger("_scrollRequest", { time: n });
  }
}
function od(t, e) {
  return t.left >= e.left && t.left < e.right && t.top >= e.top && t.top < e.bottom;
}
function Ks(t, e) {
  let n = {
    left: Math.max(t.left, e.left),
    right: Math.min(t.right, e.right),
    top: Math.max(t.top, e.top),
    bottom: Math.min(t.bottom, e.bottom)
  };
  return n.left < n.right && n.top < n.bottom ? n : !1;
}
function ad(t, e) {
  return {
    left: Math.min(Math.max(t.left, e.left), e.right),
    top: Math.min(Math.max(t.top, e.top), e.bottom)
  };
}
function cd(t) {
  return {
    left: (t.left + t.right) / 2,
    top: (t.top + t.bottom) / 2
  };
}
function dd(t, e) {
  return {
    left: t.left - e.left,
    top: t.top - e.top
  };
}
const on = F();
class ud {
  constructor() {
    this.getKeysForEventDefs = A(this._getKeysForEventDefs), this.splitDateSelection = A(this._splitDateSpan), this.splitEventStore = A(this._splitEventStore), this.splitIndividualUi = A(this._splitIndividualUi), this.splitEventDrag = A(this._splitInteraction), this.splitEventResize = A(this._splitInteraction), this.eventUiBuilders = {};
  }
  splitProps(e) {
    let n = this.getKeyInfo(e), r = this.getKeysForEventDefs(e.eventStore), i = this.splitDateSelection(e.dateSelection), s = this.splitIndividualUi(e.eventUiBases, r), l = this.splitEventStore(e.eventStore, r), o = this.splitEventDrag(e.eventDrag), a = this.splitEventResize(e.eventResize), d = {};
    this.eventUiBuilders = X(n, (c, f) => this.eventUiBuilders[f] || A(fd));
    for (let c in n) {
      let f = n[c], h = l[c] || on, u = this.eventUiBuilders[c];
      d[c] = {
        businessHours: f.businessHours || e.businessHours,
        dateSelection: i[c] || null,
        eventStore: h,
        eventUiBases: u(e.eventUiBases[""], f.ui, s[c]),
        eventSelection: h.instances[e.eventSelection] ? e.eventSelection : "",
        eventDrag: o[c] || null,
        eventResize: a[c] || null
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
    return X(e.defs, (n) => this.getKeysForEventDef(n));
  }
  _splitEventStore(e, n) {
    let { defs: r, instances: i } = e, s = {};
    for (let l in r)
      for (let o of n[l])
        s[o] || (s[o] = F()), s[o].defs[l] = r[l];
    for (let l in i) {
      let o = i[l];
      for (let a of n[o.defId])
        s[a] && (s[a].instances[l] = o);
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
      let r = this._splitEventStore(e.affectedEvents, this._getKeysForEventDefs(e.affectedEvents)), i = this._getKeysForEventDefs(e.mutatedEvents), s = this._splitEventStore(e.mutatedEvents, i), l = (o) => {
        n[o] || (n[o] = {
          affectedEvents: r[o] || on,
          mutatedEvents: s[o] || on,
          isEvent: e.isEvent
        });
      };
      for (let o in r)
        l(o);
      for (let o in s)
        l(o);
    }
    return n;
  }
}
function fd(t, e, n) {
  let r = [];
  t && r.push(t), e && r.push(e);
  let i = {
    "": Bs(r)
  };
  return n && Object.assign(i, n), i;
}
function Js(t, e, n, r) {
  return {
    dow: t.getUTCDay(),
    isDisabled: !!(r && (!r.activeRange || !Z(r.activeRange, t))),
    isOther: !!(r && !Z(r.currentRange, t)),
    isToday: !!(e && Z(e, t)),
    isPast: !!(e && t < e.start),
    isFuture: !!(e && t >= e.end)
  };
}
function lr(t, e) {
  let n = [
    "fc-day",
    `fc-day-${ma[t.dow]}`
  ];
  return t.isDisabled ? n.push("fc-day-disabled") : (t.isToday && (n.push("fc-day-today"), n.push(e.getClass("today"))), t.isPast && n.push("fc-day-past"), t.isFuture && n.push("fc-day-future"), t.isOther && n.push("fc-day-other")), n;
}
const hd = N({ year: "numeric", month: "long", day: "numeric" }), gd = N({ week: "long" });
function Ot(t, e, n = "day", r = !0) {
  const { dateEnv: i, options: s, calendarApi: l } = t;
  let o = i.format(e, n === "week" ? gd : hd);
  if (s.navLinks) {
    let a = i.toDate(e);
    const d = (c) => {
      let f = n === "day" ? s.navLinkDayClick : n === "week" ? s.navLinkWeekClick : null;
      typeof f == "function" ? f.call(l, i.toDate(e), c) : (typeof f == "string" && (n = f), l.zoomTo(e, n));
    };
    return Object.assign({ title: Ye(s.navLinkHint, [o, a], o), "data-navlink": "" }, r ? Ss(d) : { onClick: d });
  }
  return { "aria-label": o };
}
let an = null;
function pd() {
  return an === null && (an = md()), an;
}
function md() {
  let t = document.createElement("div");
  qe(t, {
    position: "absolute",
    top: -1e3,
    left: 0,
    border: 0,
    padding: 0,
    overflow: "scroll",
    direction: "rtl"
  }), t.innerHTML = "<div></div>", document.body.appendChild(t);
  let n = t.firstChild.getBoundingClientRect().left > t.getBoundingClientRect().left;
  return Fn(t), n;
}
let cn;
function vd() {
  return cn || (cn = bd()), cn;
}
function bd() {
  let t = document.createElement("div");
  t.style.overflow = "scroll", t.style.position = "absolute", t.style.top = "-9999px", t.style.left = "-9999px", document.body.appendChild(t);
  let e = el(t);
  return document.body.removeChild(t), e;
}
function el(t) {
  return {
    x: t.offsetHeight - t.clientHeight,
    y: t.offsetWidth - t.clientWidth
  };
}
function yd(t, e = !1) {
  let n = window.getComputedStyle(t), r = parseInt(n.borderLeftWidth, 10) || 0, i = parseInt(n.borderRightWidth, 10) || 0, s = parseInt(n.borderTopWidth, 10) || 0, l = parseInt(n.borderBottomWidth, 10) || 0, o = el(t), a = o.y - r - i, d = o.x - s - l, c = {
    borderLeft: r,
    borderRight: i,
    borderTop: s,
    borderBottom: l,
    scrollbarBottom: d,
    scrollbarLeft: 0,
    scrollbarRight: 0
  };
  return pd() && n.direction === "rtl" ? c.scrollbarLeft = a : c.scrollbarRight = a, e && (c.paddingLeft = parseInt(n.paddingLeft, 10) || 0, c.paddingRight = parseInt(n.paddingRight, 10) || 0, c.paddingTop = parseInt(n.paddingTop, 10) || 0, c.paddingBottom = parseInt(n.paddingBottom, 10) || 0), c;
}
function Ed(t, e = !1, n) {
  let r = or(t), i = yd(t, e), s = {
    left: r.left + i.borderLeft + i.scrollbarLeft,
    right: r.right - i.borderRight - i.scrollbarRight,
    top: r.top + i.borderTop,
    bottom: r.bottom - i.borderBottom - i.scrollbarBottom
  };
  return e && (s.left += i.paddingLeft, s.right -= i.paddingRight, s.top += i.paddingTop, s.bottom -= i.paddingBottom), s;
}
function or(t) {
  let e = t.getBoundingClientRect();
  return {
    left: e.left + window.scrollX,
    top: e.top + window.scrollY,
    right: e.right + window.scrollX,
    bottom: e.bottom + window.scrollY
  };
}
function Sd(t) {
  let e = tl(t), n = t.getBoundingClientRect();
  for (let r of e) {
    let i = Ks(n, r.getBoundingClientRect());
    if (i)
      n = i;
    else
      return null;
  }
  return n;
}
function tl(t) {
  let e = [];
  for (; t instanceof HTMLElement; ) {
    let n = window.getComputedStyle(t);
    if (n.position === "fixed")
      break;
    /(auto|scroll)/.test(n.overflow + n.overflowY + n.overflowX) && e.push(t), t = t.parentNode;
  }
  return e;
}
class $e {
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
    return at(this.tops || [], e.tops || []) && at(this.bottoms || [], e.bottoms || []) && at(this.lefts || [], e.lefts || []) && at(this.rights || [], e.rights || []);
  }
}
function at(t, e) {
  const n = t.length;
  if (n !== e.length)
    return !1;
  for (let r = 0; r < n; r++)
    if (Math.round(t[r]) !== Math.round(e[r]))
      return !1;
  return !0;
}
class ar {
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
class Ad extends ar {
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
class wd extends ar {
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
class Y extends R {
  constructor() {
    super(...arguments), this.uid = Se();
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
    !$(e, ".fc-event-mirror");
  }
  isValidDateDownEl(e) {
    return !$(e, ".fc-event:not(.fc-bg-event)") && !$(e, ".fc-more-link") && // a "more.." link
    !$(e, "a[data-navlink]") && // a clickable nav link
    !$(e, ".fc-popover");
  }
}
class nl {
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
      const i = Object.assign(Object.assign({}, n), { span: cr(n.span, e.touchingEntry.span) });
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
    n.lateral === -1 ? (dn(i, n.level, n.levelCoord), dn(r, n.level, [e])) : dn(r[n.level], n.lateral, e), this.stackCnts[me(e)] = n.stackCnt;
  }
  /*
  does not care about limits
  */
  findInsertion(e) {
    let { levelCoords: n, entriesByLevel: r, strictOrder: i, stackCnts: s } = this, l = n.length, o = 0, a = -1, d = -1, c = null, f = 0;
    for (let p = 0; p < l; p += 1) {
      const v = n[p];
      if (!i && v >= o + this.getEntryThickness(e))
        break;
      let b = r[p], y, E = Rn(b, e.span.start, _n), w = E[0] + E[1];
      for (
        ;
        // loop through entries that horizontally intersect
        (y = b[w]) && // but not past the whole entry list
        y.span.start < e.span.end;
      ) {
        let C = v + this.getEntryThickness(y);
        C > o && (o = C, c = y, a = p, d = w), C === o && (f = Math.max(f, s[me(y)] + 1)), w += 1;
      }
    }
    let h = 0;
    if (c)
      for (h = a + 1; h < l && n[h] < o; )
        h += 1;
    let u = -1;
    return h < l && n[h] === o && (u = Rn(r[h], e.span.end, _n)[0]), {
      touchingLevel: a,
      touchingLateral: d,
      touchingEntry: c,
      stackCnt: f,
      levelCoord: o,
      level: h,
      lateral: u
    };
  }
  // sorted by levelCoord (lowest to highest)
  toRects() {
    let { entriesByLevel: e, levelCoords: n } = this, r = e.length, i = [];
    for (let s = 0; s < r; s += 1) {
      let l = e[s], o = n[s];
      for (let a of l)
        i.push(Object.assign(Object.assign({}, a), { thickness: this.getEntryThickness(a), levelCoord: o }));
    }
    return i;
  }
}
function _n(t) {
  return t.span.end;
}
function me(t) {
  return t.index + ":" + t.span.start;
}
function Cd(t) {
  let e = [];
  for (let n of t) {
    let r = [], i = {
      span: n.span,
      entries: [n]
    };
    for (let s of e)
      cr(s.span, i.span) ? i = {
        entries: s.entries.concat(i.entries),
        span: Dd(s.span, i.span)
      } : r.push(s);
    r.push(i), e = r;
  }
  return e;
}
function Dd(t, e) {
  return {
    start: Math.min(t.start, e.start),
    end: Math.max(t.end, e.end)
  };
}
function cr(t, e) {
  let n = Math.max(t.start, e.start), r = Math.min(t.end, e.end);
  return n < r ? { start: n, end: r } : null;
}
function dn(t, e, n) {
  t.splice(e, 0, n);
}
function Rn(t, e, n) {
  let r = 0, i = t.length;
  if (!i || e < n(t[r]))
    return [0, 0];
  if (e > n(t[i - 1]))
    return [i, 0];
  for (; r < i; ) {
    let s = Math.floor(r + (i - r) / 2), l = n(t[s]);
    if (e < l)
      i = s;
    else if (e > l)
      r = s + 1;
    else
      return [s, 1];
  }
  return [r, 0];
}
class _d {
  constructor(e, n) {
    this.emitter = new Gt();
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
const dr = {};
function Rd(t, e) {
  return !t || e > 10 ? N({ weekday: "short" }) : e > 1 ? N({ weekday: "short", month: "numeric", day: "numeric", omitCommas: !0 }) : N({ weekday: "long" });
}
const rl = "fc-col-header-cell";
function il(t) {
  return t.text;
}
class Td extends R {
  render() {
    let { dateEnv: e, options: n, theme: r, viewApi: i } = this.context, { props: s } = this, { date: l, dateProfile: o } = s, a = Js(l, s.todayRange, null, o), d = [rl].concat(lr(a, r)), c = e.format(l, s.dayHeaderFormat), f = !a.isDisabled && s.colCnt > 1 ? Ot(this.context, l) : {}, h = e.toDate(l);
    e.namedTimeZoneImpl && (h = ae(h, 36e5));
    let u = Object.assign(Object.assign(Object.assign({ date: h, view: i }, s.extraRenderProps), { text: c }), a);
    return g(j, { elTag: "th", elClasses: d, elAttrs: Object.assign({ role: "columnheader", colSpan: s.colSpan, "data-date": a.isDisabled ? void 0 : Gn(l) }, s.extraDataAttrs), renderProps: u, generatorName: "dayHeaderContent", customGenerator: n.dayHeaderContent, defaultGenerator: il, classNameGenerator: n.dayHeaderClassNames, didMount: n.dayHeaderDidMount, willUnmount: n.dayHeaderWillUnmount }, (p) => g("div", { className: "fc-scrollgrid-sync-inner" }, !a.isDisabled && g(p, { elTag: "a", elAttrs: f, elClasses: [
      "fc-col-header-cell-cushion",
      s.isSticky && "fc-sticky"
    ] })));
  }
}
const xd = N({ weekday: "long" });
class kd extends R {
  render() {
    let { props: e } = this, { dateEnv: n, theme: r, viewApi: i, options: s } = this.context, l = H(/* @__PURE__ */ new Date(2592e5), e.dow), o = {
      dow: e.dow,
      isDisabled: !1,
      isFuture: !1,
      isPast: !1,
      isToday: !1,
      isOther: !1
    }, a = n.format(l, e.dayHeaderFormat), d = Object.assign(Object.assign(Object.assign(Object.assign({
      // TODO: make this public?
      date: l
    }, o), { view: i }), e.extraRenderProps), { text: a });
    return g(j, { elTag: "th", elClasses: [
      rl,
      ...lr(o, r),
      ...e.extraClassNames || []
    ], elAttrs: Object.assign({ role: "columnheader", colSpan: e.colSpan }, e.extraDataAttrs), renderProps: d, generatorName: "dayHeaderContent", customGenerator: s.dayHeaderContent, defaultGenerator: il, classNameGenerator: s.dayHeaderClassNames, didMount: s.dayHeaderDidMount, willUnmount: s.dayHeaderWillUnmount }, (c) => g(
      "div",
      { className: "fc-scrollgrid-sync-inner" },
      g(c, { elTag: "a", elClasses: [
        "fc-col-header-cell-cushion",
        e.isSticky && "fc-sticky"
      ], elAttrs: {
        "aria-label": n.format(l, xd)
      } })
    ));
  }
}
class sl extends R {
  constructor() {
    super(...arguments), this.createDayHeaderFormatter = A(Md);
  }
  render() {
    let { context: e } = this, { dates: n, dateProfile: r, datesRepDistinctDays: i, renderIntro: s } = this.props, l = this.createDayHeaderFormatter(e.options.dayHeaderFormat, i, n.length);
    return g(Fe, { unit: "day" }, (o, a) => g(
      "tr",
      { role: "row" },
      s && s("day"),
      n.map((d) => i ? g(Td, { key: d.toISOString(), date: d, dateProfile: r, todayRange: a, colCnt: n.length, dayHeaderFormat: l }) : g(kd, { key: d.getUTCDay(), dow: d.getUTCDay(), dayHeaderFormat: l }))
    ));
  }
}
function Md(t, e, n) {
  return t || Rd(e, n);
}
class ll {
  constructor(e, n) {
    let r = e.start, { end: i } = e, s = [], l = [], o = -1;
    for (; r < i; )
      n.isHiddenDay(r) ? s.push(o + 0.5) : (o += 1, s.push(o), l.push(r)), r = H(r, 1);
    this.dates = l, this.indices = s, this.cnt = l.length;
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
    let { indices: n } = this, r = Math.floor(Ae(this.dates[0], e));
    return r < 0 ? n[0] - 1 : r >= n.length ? n[n.length - 1] + 1 : n[r];
  }
}
class ol {
  constructor(e, n) {
    let { dates: r } = e, i, s, l;
    if (n) {
      for (s = r[0].getUTCDay(), i = 1; i < r.length && r[i].getUTCDay() !== s; i += 1)
        ;
      l = Math.ceil(r.length / i);
    } else
      l = 1, i = r.length;
    this.rowCnt = l, this.colCnt = i, this.daySeries = e, this.cells = this.buildCells(), this.headerDates = this.buildHeaderDates();
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
      let { firstIndex: s, lastIndex: l } = r, o = s;
      for (; o <= l; ) {
        let a = Math.floor(o / n), d = Math.min((a + 1) * n, l + 1);
        i.push({
          row: a,
          firstCol: o % n,
          lastCol: (d - 1) % n,
          isStart: r.isStart && o === s,
          isEnd: r.isEnd && d - 1 === l
        }), o = d;
      }
    }
    return i;
  }
}
class al {
  constructor() {
    this.sliceBusinessHours = A(this._sliceBusinessHours), this.sliceDateSelection = A(this._sliceDateSpan), this.sliceEventStore = A(this._sliceEventStore), this.sliceEventDrag = A(this._sliceInteraction), this.sliceEventResize = A(this._sliceInteraction), this.forceDayIfListItem = !1;
  }
  sliceProps(e, n, r, i, ...s) {
    let { eventUiBases: l } = e, o = this.sliceEventStore(e.eventStore, l, n, r, ...s);
    return {
      dateSelectionSegs: this.sliceDateSelection(e.dateSelection, n, r, l, i, ...s),
      businessHourSegs: this.sliceBusinessHours(e.businessHours, n, r, i, ...s),
      fgEventSegs: o.fg,
      bgEventSegs: o.bg,
      eventDrag: this.sliceEventDrag(e.eventDrag, l, n, r, ...s),
      eventResize: this.sliceEventResize(e.eventResize, l, n, r, ...s),
      eventSelection: e.eventSelection
    };
  }
  sliceNowDate(e, n, r, i, ...s) {
    return this._sliceDateSpan(
      { range: { start: e, end: ae(e, 1) }, allDay: !1 },
      // add 1 ms, protect against null range
      n,
      r,
      {},
      i,
      ...s
    );
  }
  _sliceBusinessHours(e, n, r, i, ...s) {
    return e ? this._sliceEventStore(Ee(e, ct(n, !!r), i), {}, n, r, ...s).bg : [];
  }
  _sliceEventStore(e, n, r, i, ...s) {
    if (e) {
      let l = pi(e, n, ct(r, !!i), i);
      return {
        bg: this.sliceEventRanges(l.bg, s),
        fg: this.sliceEventRanges(l.fg, s)
      };
    }
    return { bg: [], fg: [] };
  }
  _sliceInteraction(e, n, r, i, ...s) {
    if (!e)
      return null;
    let l = pi(e.mutatedEvents, n, ct(r, !!i), i);
    return {
      segs: this.sliceEventRanges(l.fg, s),
      affectedInstances: e.affectedEvents.instances,
      isEvent: e.isEvent
    };
  }
  _sliceDateSpan(e, n, r, i, s, ...l) {
    if (!e)
      return [];
    let o = ct(n, !!r), a = ye(e.range, o);
    if (a) {
      e = Object.assign(Object.assign({}, e), { range: a });
      let d = Jc(e, i, s), c = this.sliceRange(e.range, ...l);
      for (let f of c)
        f.eventRange = d;
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
function ct(t, e) {
  let n = t.activeRange;
  return e ? n : {
    start: ae(n.start, t.slotMinTime.milliseconds),
    end: ae(n.end, t.slotMaxTime.milliseconds - 864e5)
    // 864e5 = ms in a day
  };
}
function cl(t, e, n) {
  let { instances: r } = t.mutatedEvents;
  for (let i in r)
    if (!Wt(e.validRange, r[i].range))
      return !1;
  return dl({ eventDrag: t }, n);
}
function Id(t, e, n) {
  return Wt(e.validRange, t.range) ? dl({ dateSelection: t }, n) : !1;
}
function dl(t, e) {
  let n = e.getCurrentData(), r = Object.assign({ businessHours: n.businessHours, dateSelection: "", eventStore: n.eventStore, eventUiBases: n.eventUiBases, eventSelection: "", eventDrag: null, eventResize: null }, t);
  return (e.pluginHooks.isPropsValid || Nd)(r, e);
}
function Nd(t, e, n = {}, r) {
  return !(t.eventDrag && !Od(t, e, n, r) || t.dateSelection && !Pd(t, e, n, r));
}
function Od(t, e, n, r) {
  let i = e.getCurrentData(), s = t.eventDrag, l = s.mutatedEvents, o = l.defs, a = l.instances, d = Nt(o, s.isEvent ? t.eventUiBases : { "": i.selectionConfig });
  r && (d = X(d, r));
  let c = Mc(t.eventStore, s.affectedEvents.instances), f = c.defs, h = c.instances, u = Nt(f, t.eventUiBases);
  for (let p in a) {
    let v = a[p], b = v.range, y = d[v.defId], E = o[v.defId];
    if (!ul(y.constraints, b, c, t.businessHours, e))
      return !1;
    let { eventOverlap: w } = e.options, C = typeof w == "function" ? w : null;
    for (let T in h) {
      let M = h[T];
      if (Kn(b, M.range) && (u[M.defId].overlap === !1 && s.isEvent || y.overlap === !1 || C && !C(
        new I(e, f[M.defId], M),
        // still event
        new I(e, E, v)
      )))
        return !1;
    }
    let O = i.eventStore;
    for (let T of y.allows) {
      let M = Object.assign(Object.assign({}, n), { range: v.range, allDay: E.allDay }), _ = O.defs[E.defId], te = O.instances[p], je;
      if (_ ? je = new I(e, _, te) : je = new I(e, E), !T(rr(M, e), je))
        return !1;
    }
  }
  return !0;
}
function Pd(t, e, n, r) {
  let i = t.eventStore, s = i.defs, l = i.instances, o = t.dateSelection, a = o.range, { selectionConfig: d } = e.getCurrentData();
  if (r && (d = r(d)), !ul(d.constraints, a, i, t.businessHours, e))
    return !1;
  let { selectOverlap: c } = e.options, f = typeof c == "function" ? c : null;
  for (let h in l) {
    let u = l[h];
    if (Kn(a, u.range) && (d.overlap === !1 || f && !f(new I(e, s[u.defId], u), null)))
      return !1;
  }
  for (let h of d.allows) {
    let u = Object.assign(Object.assign({}, n), o);
    if (!h(rr(u, e), null))
      return !1;
  }
  return !0;
}
function ul(t, e, n, r, i) {
  for (let s of t)
    if (!Bd(Hd(s, e, n, r, i), e))
      return !1;
  return !0;
}
function Hd(t, e, n, r, i) {
  return t === "businessHours" ? un(Ee(r, e, i)) : typeof t == "string" ? un(Vt(n, (s) => s.groupId === t)) : typeof t == "object" && t ? un(Ee(t, e, i)) : [];
}
function un(t) {
  let { instances: e } = t, n = [];
  for (let r in e)
    n.push(e[r].range);
  return n;
}
function Bd(t, e) {
  for (let n of t)
    if (Wt(n, e))
      return !0;
  return !1;
}
const dt = /^(visible|hidden)$/;
class $d extends R {
  constructor() {
    super(...arguments), this.handleEl = (e) => {
      this.el = e, q(this.props.elRef, e);
    };
  }
  render() {
    let { props: e } = this, { liquid: n, liquidIsAbsolute: r } = e, i = n && r, s = ["fc-scroller"];
    return n && (r ? s.push("fc-scroller-liquid-absolute") : s.push("fc-scroller-liquid")), g("div", { ref: this.handleEl, className: s.join(" "), style: {
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
    if (dt.test(this.props.overflowX))
      return !1;
    let { el: e } = this, n = this.el.getBoundingClientRect().width - this.getYScrollbarWidth(), { children: r } = e;
    for (let i = 0; i < r.length; i += 1)
      if (r[i].getBoundingClientRect().width > n)
        return !0;
    return !1;
  }
  needsYScrolling() {
    if (dt.test(this.props.overflowY))
      return !1;
    let { el: e } = this, n = this.el.getBoundingClientRect().height - this.getXScrollbarWidth(), { children: r } = e;
    for (let i = 0; i < r.length; i += 1)
      if (r[i].getBoundingClientRect().height > n)
        return !0;
    return !1;
  }
  getXScrollbarWidth() {
    return dt.test(this.props.overflowX) ? 0 : this.el.offsetHeight - this.el.clientHeight;
  }
  getYScrollbarWidth() {
    return dt.test(this.props.overflowY) ? 0 : this.el.offsetWidth - this.el.clientWidth;
  }
}
class Q {
  constructor(e) {
    this.masterCallback = e, this.currentMap = {}, this.depths = {}, this.callbackMap = {}, this.handleValue = (n, r) => {
      let { depths: i, currentMap: s } = this, l = !1, o = !1;
      n !== null ? (l = r in s, s[r] = n, i[r] = (i[r] || 0) + 1, o = !0) : (i[r] -= 1, i[r] || (delete s[r], delete this.callbackMap[r], l = !0)), this.masterCallback && (l && this.masterCallback(null, String(r)), o && this.masterCallback(n, String(r)));
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
    return Za(this.currentMap, e, n, r);
  }
  getAll() {
    return Zn(this.currentMap);
  }
}
function Ld(t) {
  let e = Yo(t, ".fc-scrollgrid-shrink"), n = 0;
  for (let r of e)
    n = Math.max(n, aa(r));
  return Math.ceil(n);
}
function fl(t, e) {
  return t.liquid && e.liquid;
}
function Ud(t, e) {
  return e.maxHeight != null || // if its possible for the height to max out, we might need scrollbars
  fl(t, e);
}
function zd(t, e, n, r) {
  let { expandRows: i } = n;
  return typeof e.content == "function" ? e.content(n) : g("table", {
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
  }, n.tableColGroupNode, g(r ? "thead" : "tbody", {
    role: "presentation"
  }, typeof e.rowContent == "function" ? e.rowContent(n) : e.rowContent));
}
function Fd(t, e) {
  return oe(t, e, V);
}
function jd(t, e) {
  let n = [];
  for (let r of t) {
    let i = r.span || 1;
    for (let s = 0; s < i; s += 1)
      n.push(g("col", { style: {
        width: r.width === "shrink" ? Wd(e) : r.width || "",
        minWidth: r.minWidth || ""
      } }));
  }
  return g("colgroup", {}, ...n);
}
function Wd(t) {
  return t ?? 4;
}
function Vd(t) {
  for (let e of t)
    if (e.width === "shrink")
      return !0;
  return !1;
}
function Gd(t, e) {
  let n = [
    "fc-scrollgrid",
    e.theme.getClass("table")
  ];
  return t && n.push("fc-scrollgrid-liquid"), n;
}
function qd(t, e) {
  let n = [
    "fc-scrollgrid-section",
    `fc-scrollgrid-section-${t.type}`,
    t.className
    // used?
  ];
  return e && t.liquid && t.maxHeight == null && n.push("fc-scrollgrid-section-liquid"), t.isSticky && n.push("fc-scrollgrid-section-sticky"), n;
}
function Tn(t) {
  return g("div", { className: "fc-scrollgrid-sticky-shim", style: {
    width: t.clientWidth,
    minWidth: t.tableMinWidth
  } });
}
function Pt(t) {
  let { stickyHeaderDates: e } = t;
  return (e == null || e === "auto") && (e = t.height === "auto" || t.viewHeight === "auto"), e;
}
function hl(t) {
  let { stickyFooterScrollbar: e } = t;
  return (e == null || e === "auto") && (e = t.height === "auto" || t.viewHeight === "auto"), e;
}
class ur extends R {
  constructor() {
    super(...arguments), this.processCols = A((e) => e, Fd), this.renderMicroColGroup = A(jd), this.scrollerRefs = new Q(), this.scrollerElRefs = new Q(this._handleScrollerEl.bind(this)), this.state = {
      shrinkWidth: null,
      forceYScrollbars: !1,
      scrollerClientWidths: {},
      scrollerClientHeights: {}
    }, this.handleSizing = () => {
      this.safeSetState(Object.assign({ shrinkWidth: this.computeShrinkWidth() }, this.computeScrollerDims()));
    };
  }
  render() {
    let { props: e, state: n, context: r } = this, i = e.sections || [], s = this.processCols(e.cols), l = this.renderMicroColGroup(s, n.shrinkWidth), o = Gd(e.liquid, r);
    e.collapsibleWidth && o.push("fc-scrollgrid-collapsible");
    let a = i.length, d = 0, c, f = [], h = [], u = [];
    for (; d < a && (c = i[d]).type === "header"; )
      f.push(this.renderSection(c, l, !0)), d += 1;
    for (; d < a && (c = i[d]).type === "body"; )
      h.push(this.renderSection(c, l, !1)), d += 1;
    for (; d < a && (c = i[d]).type === "footer"; )
      u.push(this.renderSection(c, l, !0)), d += 1;
    let p = !Xs();
    const v = { role: "rowgroup" };
    return g("table", {
      role: "grid",
      className: o.join(" "),
      style: { height: e.height }
    }, !!(!p && f.length) && g("thead", v, ...f), !!(!p && h.length) && g("tbody", v, ...h), !!(!p && u.length) && g("tfoot", v, ...u), p && g("tbody", v, ...f, ...h, ...u));
  }
  renderSection(e, n, r) {
    return "outerContent" in e ? g(x, { key: e.key }, e.outerContent) : g("tr", { key: e.key, role: "presentation", className: qd(e, this.props.liquid).join(" ") }, this.renderChunkTd(e, n, e.chunk, r));
  }
  renderChunkTd(e, n, r, i) {
    if ("outerContent" in r)
      return r.outerContent;
    let { props: s } = this, { forceYScrollbars: l, scrollerClientWidths: o, scrollerClientHeights: a } = this.state, d = Ud(s, e), c = fl(s, e), f = s.liquid ? l ? "scroll" : d ? "auto" : "hidden" : "visible", h = e.key, u = zd(e, r, {
      tableColGroupNode: n,
      tableMinWidth: "",
      clientWidth: !s.collapsibleWidth && o[h] !== void 0 ? o[h] : null,
      clientHeight: a[h] !== void 0 ? a[h] : null,
      expandRows: e.expandRows,
      syncRowHeights: !1,
      rowSyncHeights: [],
      reportRowHeightChange: () => {
      }
    }, i);
    return g(i ? "th" : "td", {
      ref: r.elRef,
      role: "presentation"
    }, g(
      "div",
      { className: `fc-scroller-harness${c ? " fc-scroller-harness-liquid" : ""}` },
      g($d, { ref: this.scrollerRefs.createRef(h), elRef: this.scrollerElRefs.createRef(h), overflowY: f, overflowX: s.liquid ? "hidden" : "visible", maxHeight: e.maxHeight, liquid: c, liquidIsAbsolute: !0 }, u)
    ));
  }
  _handleScrollerEl(e, n) {
    let r = Yd(this.props.sections, n);
    r && q(r.chunk.scrollerElRef, e);
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
    return Vd(this.props.cols) ? Ld(this.scrollerElRefs.getAll()) : 0;
  }
  computeScrollerDims() {
    let e = vd(), { scrollerRefs: n, scrollerElRefs: r } = this, i = !1, s = {}, l = {};
    for (let o in n.currentMap) {
      let a = n.currentMap[o];
      if (a && a.needsYScrolling()) {
        i = !0;
        break;
      }
    }
    for (let o of this.props.sections) {
      let a = o.key, d = r.currentMap[a];
      if (d) {
        let c = d.parentNode;
        s[a] = Math.floor(c.getBoundingClientRect().width - (i ? e.y : 0)), l[a] = Math.floor(c.getBoundingClientRect().height);
      }
    }
    return { forceYScrollbars: i, scrollerClientWidths: s, scrollerClientHeights: l };
  }
}
ur.addStateEquality({
  scrollerClientWidths: V,
  scrollerClientHeights: V
});
function Yd(t, e) {
  for (let n of t)
    if (n.key === e)
      return n;
  return null;
}
class fr extends R {
  constructor() {
    super(...arguments), this.buildPublicEvent = A((e, n, r) => new I(e, n, r)), this.handleEl = (e) => {
      this.el = e, q(this.props.elRef, e), e && mi(e, this.props.seg);
    };
  }
  render() {
    const { props: e, context: n } = this, { options: r } = n, { seg: i } = e, { eventRange: s } = i, { ui: l } = s, o = {
      event: this.buildPublicEvent(n, s.def, s.instance),
      view: n.viewApi,
      timeText: e.timeText,
      textColor: l.textColor,
      backgroundColor: l.backgroundColor,
      borderColor: l.borderColor,
      isDraggable: !e.disableDragging && jc(i, n),
      isStartResizable: !e.disableResizing && Wc(i, n),
      isEndResizable: !e.disableResizing && Vc(i),
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
    return g(j, { elRef: this.handleEl, elTag: e.elTag, elAttrs: e.elAttrs, elClasses: [
      ...Gc(o),
      ...i.eventRange.ui.classNames,
      ...e.elClasses || []
    ], elStyle: e.elStyle, renderProps: o, generatorName: "eventContent", customGenerator: r.eventContent, defaultGenerator: e.defaultGenerator, classNameGenerator: r.eventClassNames, didMount: r.eventDidMount, willUnmount: r.eventWillUnmount }, e.children);
  }
  componentDidUpdate(e) {
    this.el && this.props.seg !== e.seg && mi(this.el, this.props.seg);
  }
}
class hr extends R {
  render() {
    let { props: e, context: n } = this, { options: r } = n, { seg: i } = e, { ui: s } = i.eventRange, l = r.eventTimeFormat || e.defaultTimeFormat, o = Gs(i, l, n, e.defaultDisplayEventTime, e.defaultDisplayEventEnd);
    return g(fr, Object.assign({}, e, { elTag: "a", elStyle: {
      borderColor: s.borderColor,
      backgroundColor: s.backgroundColor
    }, elAttrs: Ys(i, n), defaultGenerator: Qd, timeText: o }), (a, d) => g(
      x,
      null,
      g(a, { elTag: "div", elClasses: ["fc-event-main"], elStyle: { color: d.textColor } }),
      !!d.isStartResizable && g("div", { className: "fc-event-resizer fc-event-resizer-start" }),
      !!d.isEndResizable && g("div", { className: "fc-event-resizer fc-event-resizer-end" })
    ));
  }
}
hr.addPropsEquality({
  seg: V
});
function Qd(t) {
  return g(
    "div",
    { className: "fc-event-main-frame" },
    t.timeText && g("div", { className: "fc-event-time" }, t.timeText),
    g(
      "div",
      { className: "fc-event-title-container" },
      g("div", { className: "fc-event-title fc-sticky" }, t.event.title || g(x, null, " "))
    )
  );
}
const gr = (t) => g(J.Consumer, null, (e) => {
  let { options: n } = e, r = {
    isAxis: t.isAxis,
    date: e.dateEnv.toDate(t.date),
    view: e.viewApi
  };
  return g(j, { elRef: t.elRef, elTag: t.elTag || "div", elAttrs: t.elAttrs, elClasses: t.elClasses, elStyle: t.elStyle, renderProps: r, generatorName: "nowIndicatorContent", customGenerator: n.nowIndicatorContent, classNameGenerator: n.nowIndicatorClassNames, didMount: n.nowIndicatorDidMount, willUnmount: n.nowIndicatorWillUnmount }, t.children);
}), Zd = N({ day: "numeric" });
class pr extends R {
  constructor() {
    super(...arguments), this.refineRenderProps = mt(Xd);
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
    return g(j, { elRef: e.elRef, elTag: e.elTag, elAttrs: Object.assign(Object.assign({}, e.elAttrs), i.isDisabled ? {} : { "data-date": Gn(e.date) }), elClasses: [
      ...lr(i, n.theme),
      ...e.elClasses || []
    ], elStyle: e.elStyle, renderProps: i, generatorName: "dayCellContent", customGenerator: r.dayCellContent, defaultGenerator: e.defaultGenerator, classNameGenerator: (
      // don't use custom classNames if disabled
      i.isDisabled ? void 0 : r.dayCellClassNames
    ), didMount: r.dayCellDidMount, willUnmount: r.dayCellWillUnmount }, e.children);
  }
}
function mr(t) {
  return !!(t.dayCellContent || An("dayCellContent", t));
}
function Xd(t) {
  let { date: e, dateEnv: n, dateProfile: r, isMonthStart: i } = t, s = Js(e, t.todayRange, null, r), l = t.showDayNumber ? n.format(e, i ? t.monthStartFormat : Zd) : "";
  return Object.assign(Object.assign(Object.assign({ date: n.toDate(e), view: t.viewApi }, s), {
    isMonthStart: i,
    dayNumberText: l
  }), t.extraRenderProps);
}
class gl extends R {
  render() {
    let { props: e } = this, { seg: n } = e;
    return g(fr, { elTag: "div", elClasses: ["fc-bg-event"], elStyle: { backgroundColor: n.eventRange.ui.backgroundColor }, defaultGenerator: Kd, seg: n, timeText: "", isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: !1, isPast: e.isPast, isFuture: e.isFuture, isToday: e.isToday, disableDragging: !0, disableResizing: !0 });
  }
}
function Kd(t) {
  let { title: e } = t.event;
  return e && g("div", { className: "fc-event-title" }, t.event.title);
}
function pl(t) {
  return g("div", { className: `fc-${t}` });
}
const ml = (t) => g(J.Consumer, null, (e) => {
  let { dateEnv: n, options: r } = e, { date: i } = t, s = r.weekNumberFormat || t.defaultFormat, l = n.computeWeekNumber(i), o = n.format(i, s), a = { num: l, text: o, date: i };
  return g(
    j,
    { elRef: t.elRef, elTag: t.elTag, elAttrs: t.elAttrs, elClasses: t.elClasses, elStyle: t.elStyle, renderProps: a, generatorName: "weekNumberContent", customGenerator: r.weekNumberContent, defaultGenerator: Jd, classNameGenerator: r.weekNumberClassNames, didMount: r.weekNumberDidMount, willUnmount: r.weekNumberWillUnmount },
    t.children
  );
});
function Jd(t) {
  return t.text;
}
const fn = 10;
class eu extends R {
  constructor() {
    super(...arguments), this.state = {
      titleId: Ft()
    }, this.handleRootEl = (e) => {
      this.rootEl = e, this.props.elRef && q(this.props.elRef, e);
    }, this.handleDocumentMouseDown = (e) => {
      const n = ys(e);
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
    return Oo(g(
      "div",
      Object.assign({}, r.extraAttrs, { id: r.id, className: s.join(" "), "aria-labelledby": i.titleId, ref: this.handleRootEl }),
      g(
        "div",
        { className: "fc-popover-header " + e.getClass("popoverHeader") },
        g("span", { className: "fc-popover-title", id: i.titleId }, r.title),
        g("span", { className: "fc-popover-close " + e.getIconClass("close"), title: n.closeHint, onClick: this.handleCloseClick })
      ),
      g("div", { className: "fc-popover-body " + e.getClass("popoverContent") }, r.children)
    ), r.parentEl);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleDocumentMouseDown), document.addEventListener("keydown", this.handleDocumentKeyDown), this.updateSize();
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleDocumentMouseDown), document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }
  updateSize() {
    let { isRtl: e } = this.context, { alignmentEl: n, alignGridTop: r } = this.props, { rootEl: i } = this, s = Sd(n);
    if (s) {
      let l = i.getBoundingClientRect(), o = r ? $(n, ".fc-scrollgrid").getBoundingClientRect().top : s.top, a = e ? s.right - l.width : s.left;
      o = Math.max(o, fn), a = Math.min(a, document.documentElement.clientWidth - fn - l.width), a = Math.max(a, fn);
      let d = i.offsetParent.getBoundingClientRect();
      qe(i, {
        top: o - d.top,
        left: a - d.left
      });
    }
  }
}
class tu extends Y {
  constructor() {
    super(...arguments), this.handleRootEl = (e) => {
      this.rootEl = e, e ? this.context.registerInteractiveComponent(this, {
        el: e,
        useEventCenter: !1
      }) : this.context.unregisterInteractiveComponent(this);
    };
  }
  render() {
    let { options: e, dateEnv: n } = this.context, { props: r } = this, { startDate: i, todayRange: s, dateProfile: l } = r, o = n.format(i, e.dayPopoverFormat);
    return g(pr, { elRef: this.handleRootEl, date: i, dateProfile: l, todayRange: s }, (a, d, c) => g(
      eu,
      { elRef: c.ref, id: r.id, title: o, extraClassNames: ["fc-more-popover"].concat(c.className || []), extraAttrs: c, parentEl: r.parentEl, alignmentEl: r.alignmentEl, alignGridTop: r.alignGridTop, onClose: r.onClose },
      mr(e) && g(a, { elTag: "div", elClasses: ["fc-more-popover-misc"] }),
      r.children
    ));
  }
  queryHit(e, n, r, i) {
    let { rootEl: s, props: l } = this;
    return e >= 0 && e < r && n >= 0 && n < i ? {
      dateProfile: l.dateProfile,
      dateSpan: Object.assign({ allDay: !l.forceTimed, range: {
        start: l.startDate,
        end: l.endDate
      } }, l.extraDateSpan),
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
class vl extends R {
  constructor() {
    super(...arguments), this.state = {
      isPopoverOpen: !1,
      popoverId: Ft()
    }, this.handleLinkEl = (e) => {
      this.linkEl = e, this.props.elRef && q(this.props.elRef, e);
    }, this.handleClick = (e) => {
      let { props: n, context: r } = this, { moreLinkClick: i } = r.options, s = bi(n).start;
      function l(o) {
        let { def: a, instance: d, range: c } = o.eventRange;
        return {
          event: new I(r, a, d),
          start: r.dateEnv.toDate(c.start),
          end: r.dateEnv.toDate(c.end),
          isStart: o.isStart,
          isEnd: o.isEnd
        };
      }
      typeof i == "function" && (i = i({
        date: s,
        allDay: !!n.allDayDate,
        allSegs: n.allSegs.map(l),
        hiddenSegs: n.hiddenSegs.map(l),
        jsEvent: e,
        view: r.viewApi
      })), !i || i === "popover" ? this.setState({ isPopoverOpen: !0 }) : typeof i == "string" && r.calendarApi.zoomTo(s, i);
    }, this.handlePopoverClose = () => {
      this.setState({ isPopoverOpen: !1 });
    };
  }
  render() {
    let { props: e, state: n } = this;
    return g(J.Consumer, null, (r) => {
      let { viewApi: i, options: s, calendarApi: l } = r, { moreLinkText: o } = s, { moreCnt: a } = e, d = bi(e), c = typeof o == "function" ? o.call(l, a) : `+${a} ${o}`, f = Ye(s.moreLinkHint, [a], c), h = {
        num: a,
        shortText: `+${a}`,
        text: c,
        view: i
      };
      return g(
        x,
        null,
        !!e.moreCnt && g(j, { elTag: e.elTag || "a", elRef: this.handleLinkEl, elClasses: [
          ...e.elClasses || [],
          "fc-more-link"
        ], elStyle: e.elStyle, elAttrs: Object.assign(Object.assign(Object.assign({}, e.elAttrs), Ss(this.handleClick)), { title: f, "aria-expanded": n.isPopoverOpen, "aria-controls": n.isPopoverOpen ? n.popoverId : "" }), renderProps: h, generatorName: "moreLinkContent", customGenerator: s.moreLinkContent, defaultGenerator: e.defaultGenerator || nu, classNameGenerator: s.moreLinkClassNames, didMount: s.moreLinkDidMount, willUnmount: s.moreLinkWillUnmount }, e.children),
        n.isPopoverOpen && g(tu, { id: n.popoverId, startDate: d.start, endDate: d.end, dateProfile: e.dateProfile, todayRange: e.todayRange, extraDateSpan: e.extraDateSpan, parentEl: this.parentEl, alignmentEl: e.alignmentElRef ? e.alignmentElRef.current : this.linkEl, alignGridTop: e.alignGridTop, forceTimed: e.forceTimed, onClose: this.handlePopoverClose }, e.popoverContent())
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
    this.linkEl && (this.parentEl = $(this.linkEl, ".fc-view-harness"));
  }
}
function nu(t) {
  return t.text;
}
function bi(t) {
  if (t.allDayDate)
    return {
      start: t.allDayDate,
      end: H(t.allDayDate, 1)
    };
  let { hiddenSegs: e } = t;
  return {
    start: bl(e),
    end: iu(e)
  };
}
function bl(t) {
  return t.reduce(ru).eventRange.range.start;
}
function ru(t, e) {
  return t.eventRange.range.start < e.eventRange.range.start ? t : e;
}
function iu(t) {
  return t.reduce(su).eventRange.range.end;
}
function su(t, e) {
  return t.eventRange.range.end > e.eventRange.range.end ? t : e;
}
const lu = [], yl = {
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
}, El = Object.assign(Object.assign({}, yl), {
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
function ou(t) {
  let e = t.length > 0 ? t[0].code : "en", n = lu.concat(t), r = {
    en: El
  };
  for (let i of n)
    r[i.code] = i;
  return {
    map: r,
    defaultCode: e
  };
}
function Sl(t, e) {
  return typeof t == "object" && !Array.isArray(t) ? Al(t.code, [t.code], t) : au(t, e);
}
function au(t, e) {
  let n = [].concat(t || []), r = cu(n, e) || El;
  return Al(t, n, r);
}
function cu(t, e) {
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
function Al(t, e, n) {
  let r = Qn([yl, n], ["buttonText"]);
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
function ee(t) {
  return {
    id: Se(),
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
function du(t, e) {
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
    for (let l of s) {
      const o = l.name, a = n[o];
      a === void 0 ? (n[o] = l.id, i(l.deps), r = fu(r, l)) : a !== l.id && console.warn(`Duplicate plugin '${o}'`);
    }
  }
  return t && i(t), i(e), r;
}
function uu() {
  let t = [], e = [], n;
  return (r, i) => ((!n || !oe(r, t) || !oe(i, e)) && (n = du(r, i)), t = r, e = i, n);
}
function fu(t, e) {
  return {
    premiumReleaseDate: hu(t.premiumReleaseDate, e.premiumReleaseDate),
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
function hu(t, e) {
  return t === void 0 ? e : e === void 0 ? t : new Date(Math.max(t.valueOf(), e.valueOf()));
}
class ce extends nt {
}
ce.prototype.classes = {
  root: "fc-theme-standard",
  tableCellShaded: "fc-cell-shaded",
  buttonGroup: "fc-button-group",
  button: "fc-button fc-button-primary",
  buttonActive: "fc-button-active"
};
ce.prototype.baseIconClass = "fc-icon";
ce.prototype.iconClasses = {
  close: "fc-icon-x",
  prev: "fc-icon-chevron-left",
  next: "fc-icon-chevron-right",
  prevYear: "fc-icon-chevrons-left",
  nextYear: "fc-icon-chevrons-right"
};
ce.prototype.rtlIconClasses = {
  prev: "fc-icon-chevron-right",
  next: "fc-icon-chevron-left",
  prevYear: "fc-icon-chevrons-right",
  nextYear: "fc-icon-chevrons-left"
};
ce.prototype.iconOverrideOption = "buttonIcons";
ce.prototype.iconOverrideCustomButtonOption = "icon";
ce.prototype.iconOverridePrefix = "fc-icon-";
function gu(t, e) {
  let n = {}, r;
  for (r in t)
    xn(r, n, t, e);
  for (r in e)
    xn(r, n, t, e);
  return n;
}
function xn(t, e, n, r) {
  if (e[t])
    return e[t];
  let i = pu(t, e, n, r);
  return i && (e[t] = i), i;
}
function pu(t, e, n, r) {
  let i = n[t], s = r[t], l = (c) => i && i[c] !== null ? i[c] : s && s[c] !== null ? s[c] : null, o = l("component"), a = l("superType"), d = null;
  if (a) {
    if (a === t)
      throw new Error("Can't have a custom view type that references itself");
    d = xn(a, e, n, r);
  }
  return !o && d && (o = d.component), o ? {
    type: t,
    component: o,
    defaults: Object.assign(Object.assign({}, d ? d.defaults : {}), i ? i.rawOptions : {}),
    overrides: Object.assign(Object.assign({}, d ? d.overrides : {}), s ? s.rawOptions : {})
  } : null;
}
function yi(t) {
  return X(t, mu);
}
function mu(t) {
  let e = typeof t == "function" ? { component: t } : t, { component: n } = e;
  return e.content ? n = Ei(e) : n && !(n.prototype instanceof R) && (n = Ei(Object.assign(Object.assign({}, e), { content: n }))), {
    superType: e.type,
    component: n,
    rawOptions: e
    // includes type and component too :(
  };
}
function Ei(t) {
  return (e) => g(J.Consumer, null, (n) => g(j, { elTag: "div", elClasses: ks(n.viewSpec), renderProps: Object.assign(Object.assign({}, e), { nextDayThreshold: n.options.nextDayThreshold }), generatorName: void 0, customGenerator: t.content, classNameGenerator: t.classNames, didMount: t.didMount, willUnmount: t.willUnmount }));
}
function vu(t, e, n, r) {
  let i = yi(t), s = yi(e.views), l = gu(i, s);
  return X(l, (o) => bu(o, s, e, n, r));
}
function bu(t, e, n, r, i) {
  let s = t.overrides.duration || t.defaults.duration || r.duration || n.duration, l = null, o = "", a = "", d = {};
  if (s && (l = yu(s), l)) {
    let h = Sn(l);
    o = h.unit, h.value === 1 && (a = o, d = e[o] ? e[o].rawOptions : {});
  }
  let c = (h) => {
    let u = h.buttonText || {}, p = t.defaults.buttonTextKey;
    return p != null && u[p] != null ? u[p] : u[t.type] != null ? u[t.type] : u[a] != null ? u[a] : null;
  }, f = (h) => {
    let u = h.buttonHints || {}, p = t.defaults.buttonTextKey;
    return p != null && u[p] != null ? u[p] : u[t.type] != null ? u[t.type] : u[a] != null ? u[a] : null;
  };
  return {
    type: t.type,
    component: t.component,
    duration: l,
    durationUnit: o,
    singleUnit: a,
    optionDefaults: t.defaults,
    optionOverrides: Object.assign(Object.assign({}, d), t.overrides),
    buttonTextOverride: c(r) || c(n) || // constructor-specified buttonText lookup hash takes precedence
    t.overrides.buttonText,
    buttonTextDefault: c(i) || t.defaults.buttonText || c(Qe) || t.type,
    // not DRY
    buttonTitleOverride: f(r) || f(n) || t.overrides.buttonHint,
    buttonTitleDefault: f(i) || t.defaults.buttonHint || f(Qe)
    // will eventually fall back to buttonText
  };
}
let Si = {};
function yu(t) {
  let e = JSON.stringify(t), n = Si[e];
  return n === void 0 && (n = D(t), Si[e] = n), n;
}
function Eu(t, e) {
  return e.type === "CHANGE_VIEW_TYPE" && (t = e.viewType), t;
}
function Su(t, e) {
  return e.type === "CHANGE_DATE" ? e.dateMarker : t;
}
function Au(t, e, n) {
  let r = t.initialDate;
  return r != null ? e.createMarker(r) : n.getDateMarker();
}
function wu(t, e) {
  return e.type === "SET_OPTION" ? Object.assign(Object.assign({}, t), { [e.optionName]: e.rawOptionValue }) : t;
}
function Cu(t, e, n, r) {
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
function Du(t, e, n) {
  let r = e ? e.activeRange : null;
  return Cl({}, Iu(t, n), r, n);
}
function _u(t, e, n, r) {
  let i = n ? n.activeRange : null;
  switch (e.type) {
    case "ADD_EVENT_SOURCES":
      return Cl(t, e.sources, i, r);
    case "REMOVE_EVENT_SOURCE":
      return Tu(t, e.sourceId);
    case "PREV":
    // TODO: how do we track all actions that affect dateProfile :(
    case "NEXT":
    case "CHANGE_DATE":
    case "CHANGE_VIEW_TYPE":
      return n ? Dl(t, i, r) : t;
    case "FETCH_EVENT_SOURCES":
      return vr(t, e.sourceIds ? (
        // why no type?
        Ds(e.sourceIds)
      ) : _l(t, r), i, e.isRefetch || !1, r);
    case "RECEIVE_EVENTS":
    case "RECEIVE_EVENT_ERROR":
      return Mu(t, e.sourceId, e.fetchId, e.fetchRange);
    case "REMOVE_ALL_EVENT_SOURCES":
      return {};
    default:
      return t;
  }
}
function Ru(t, e, n) {
  let r = e ? e.activeRange : null;
  return vr(t, _l(t, n), r, !0, n);
}
function wl(t) {
  for (let e in t)
    if (t[e].isFetching)
      return !0;
  return !1;
}
function Cl(t, e, n, r) {
  let i = {};
  for (let s of e)
    i[s.sourceId] = s;
  return n && (i = Dl(i, n, r)), Object.assign(Object.assign({}, t), i);
}
function Tu(t, e) {
  return be(t, (n) => n.sourceId !== e);
}
function Dl(t, e, n) {
  return vr(t, be(t, (r) => xu(r, e, n)), e, !1, n);
}
function xu(t, e, n) {
  return Rl(t, n) ? !n.options.lazyFetching || !t.fetchRange || t.isFetching || // always cancel outdated in-progress fetches
  e.start < t.fetchRange.start || e.end > t.fetchRange.end : !t.latestFetchId;
}
function vr(t, e, n, r, i) {
  let s = {};
  for (let l in t) {
    let o = t[l];
    e[l] ? s[l] = ku(o, n, r, i) : s[l] = o;
  }
  return s;
}
function ku(t, e, n, r) {
  let { options: i, calendarApi: s } = r, l = r.pluginHooks.eventSourceDefs[t.sourceDefId], o = Se();
  return l.fetch({
    eventSource: t,
    range: e,
    isRefetch: n,
    context: r
  }, (a) => {
    let { rawEvents: d } = a;
    i.eventSourceSuccess && (d = i.eventSourceSuccess.call(s, d, a.response) || d), t.success && (d = t.success.call(s, d, a.response) || d), r.dispatch({
      type: "RECEIVE_EVENTS",
      sourceId: t.sourceId,
      fetchId: o,
      fetchRange: e,
      rawEvents: d
    });
  }, (a) => {
    let d = !1;
    i.eventSourceFailure && (i.eventSourceFailure.call(s, a), d = !0), t.failure && (t.failure(a), d = !0), d || console.warn(a.message, a), r.dispatch({
      type: "RECEIVE_EVENT_ERROR",
      sourceId: t.sourceId,
      fetchId: o,
      fetchRange: e,
      error: a
    });
  }), Object.assign(Object.assign({}, t), { isFetching: !0, latestFetchId: o });
}
function Mu(t, e, n, r) {
  let i = t[e];
  return i && // not already removed
  n === i.latestFetchId ? Object.assign(Object.assign({}, t), { [e]: Object.assign(Object.assign({}, i), { isFetching: !1, fetchRange: r }) }) : t;
}
function _l(t, e) {
  return be(t, (n) => Rl(n, e));
}
function Iu(t, e) {
  let n = Ls(e), r = [].concat(t.eventSources || []), i = [];
  t.initialEvents && r.unshift(t.initialEvents), t.events && r.unshift(t.events);
  for (let s of r) {
    let l = $s(s, e, n);
    l && i.push(l);
  }
  return i;
}
function Rl(t, e) {
  return !e.pluginHooks.eventSourceDefs[t.sourceDefId].ignoreRange;
}
function Nu(t, e) {
  switch (e.type) {
    case "UNSELECT_DATES":
      return null;
    case "SELECT_DATES":
      return e.selection;
    default:
      return t;
  }
}
function Ou(t, e) {
  switch (e.type) {
    case "UNSELECT_EVENT":
      return "";
    case "SELECT_EVENT":
      return e.eventInstanceId;
    default:
      return t;
  }
}
function Pu(t, e) {
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
function Hu(t, e) {
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
function Bu(t, e, n, r, i) {
  let s = t.headerToolbar ? Ai(t.headerToolbar, t, e, n, r, i) : null, l = t.footerToolbar ? Ai(t.footerToolbar, t, e, n, r, i) : null;
  return { header: s, footer: l };
}
function Ai(t, e, n, r, i, s) {
  let l = {}, o = [], a = !1;
  for (let d in t) {
    let c = t[d], f = $u(c, e, n, r, i, s);
    l[d] = f.widgets, o.push(...f.viewsWithButtons), a = a || f.hasTitle;
  }
  return { sectionWidgets: l, viewsWithButtons: o, hasTitle: a };
}
function $u(t, e, n, r, i, s) {
  let l = e.direction === "rtl", o = e.customButtons || {}, a = n.buttonText || {}, d = e.buttonText || {}, c = n.buttonHints || {}, f = e.buttonHints || {}, h = t ? t.split(" ") : [], u = [], p = !1;
  return { widgets: h.map((b) => b.split(",").map((y) => {
    if (y === "title")
      return p = !0, { buttonName: y };
    let E, w, C, O, T, M;
    if (E = o[y])
      C = (_) => {
        E.click && E.click.call(_.target, _, _.target);
      }, (O = r.getCustomButtonIconClass(E)) || (O = r.getIconClass(y, l)) || (T = E.text), M = E.hint || E.text;
    else if (w = i[y]) {
      u.push(y), C = () => {
        s.changeView(y);
      }, (T = w.buttonTextOverride) || (O = r.getIconClass(y, l)) || (T = w.buttonTextDefault);
      let _ = w.buttonTextOverride || w.buttonTextDefault;
      M = Ye(
        w.buttonTitleOverride || w.buttonTitleDefault || e.viewHint,
        [_, y],
        // view-name = buttonName
        _
      );
    } else if (s[y])
      if (C = () => {
        s[y]();
      }, (T = a[y]) || (O = r.getIconClass(y, l)) || (T = d[y]), y === "prevYear" || y === "nextYear") {
        let _ = y === "prevYear" ? "prev" : "next";
        M = Ye(c[_] || f[_], [
          d.year || "year",
          "year"
        ], d[y]);
      } else
        M = (_) => Ye(c[y] || f[y], [
          d[_] || _,
          _
        ], d[y]);
    return { buttonName: y, buttonClick: C, buttonIcon: O, buttonText: T, buttonHint: M };
  })), viewsWithButtons: u, hasTitle: p };
}
class Lu {
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
let Uu = {
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
const zu = ee({
  name: "array-event-source",
  eventSourceDefs: [Uu]
});
let Fu = {
  parseMeta(t) {
    return typeof t.events == "function" ? t.events : null;
  },
  fetch(t, e, n) {
    const { dateEnv: r } = t.context, i = t.eventSource.meta;
    ed(i.bind(null, Qs(t.range, r)), (s) => e({ rawEvents: s }), n);
  }
};
const ju = ee({
  name: "func-event-source",
  eventSourceDefs: [Fu]
}), Wu = {
  method: String,
  extraParams: m,
  startParam: String,
  endParam: String,
  timeZoneParam: String
};
let Vu = {
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
    const { meta: r } = t.eventSource, i = qu(r, t.range, t.context);
    td(r.method, r.url, i).then(([s, l]) => {
      e({ rawEvents: s, response: l });
    }, n);
  }
};
const Gu = ee({
  name: "json-event-source",
  eventSourceRefiners: Wu,
  eventSourceDefs: [Vu]
});
function qu(t, e, n) {
  let { dateEnv: r, options: i } = n, s, l, o, a, d = {};
  return s = t.startParam, s == null && (s = i.startParam), l = t.endParam, l == null && (l = i.endParam), o = t.timeZoneParam, o == null && (o = i.timeZoneParam), typeof t.extraParams == "function" ? a = t.extraParams() : a = t.extraParams || {}, Object.assign(d, a), d[s] = r.formatIso(e.start), d[l] = r.formatIso(e.end), r.timeZone !== "local" && (d[o] = r.timeZone), d;
}
const Yu = {
  daysOfWeek: m,
  startTime: D,
  endTime: D,
  duration: D,
  startRecur: m,
  endRecur: m
};
let Qu = {
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
      return t.duration && (r = t.duration), !r && t.startTime && t.endTime && (r = fa(t.endTime, t.startTime)), {
        allDayGuess: !t.startTime && !t.endTime,
        duration: r,
        typeData: n
        // doesn't need endTime anymore but oh well
      };
    }
    return null;
  },
  expand(t, e, n) {
    let r = ye(e, { start: t.startRecur, end: t.endRecur });
    return r ? Xu(t.daysOfWeek, t.startTime, t.dateEnv, n, r) : [];
  }
};
const Zu = ee({
  name: "simple-recurring-event",
  recurringTypes: [Qu],
  eventRefiners: Yu
});
function Xu(t, e, n, r, i) {
  let s = t ? Ds(t) : null, l = k(i.start), o = i.end, a = [];
  for (e && (e.milliseconds < 0 ? o = H(o, 1) : e.milliseconds >= 1e3 * 60 * 60 * 24 && (l = H(l, -1))); l < o; ) {
    let d;
    (!s || s[l.getUTCDay()]) && (e ? d = r.add(l, e) : d = l, a.push(r.createMarker(n.toDate(d)))), l = H(l, 1);
  }
  return a;
}
const Ku = ee({
  name: "change-handler",
  optionChangeHandlers: {
    events(t, e) {
      wi([t], e);
    },
    eventSources: wi
  }
});
function wi(t, e) {
  let n = Zn(e.getCurrentData().eventSources);
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
    for (let l = 0; l < n.length; l += 1)
      if (n[l]._raw === i) {
        n.splice(l, 1), s = !0;
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
function Ju(t, e) {
  e.emitter.trigger("datesSet", Object.assign(Object.assign({}, Qs(t.activeRange, e.dateEnv)), { view: e.viewApi }));
}
function ef(t, e) {
  let { emitter: n } = e;
  n.hasHandlers("eventsSet") && n.trigger("eventsSet", pe(t, e));
}
const tf = [
  zu,
  ju,
  Gu,
  Zu,
  Ku,
  ee({
    name: "misc",
    isLoadingFuncs: [
      (t) => wl(t.eventSources)
    ],
    propSetHandlers: {
      dateProfile: Ju,
      eventStore: ef
    }
  })
];
class nf {
  constructor(e, n) {
    this.runTaskOption = e, this.drainedOption = n, this.queue = [], this.delayedRunner = new zn(this.drain.bind(this));
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
function rf(t, e, n) {
  let r;
  return /^(year|month)$/.test(t.currentRangeUnit) ? r = t.currentRange : r = t.activeRange, n.formatRange(r.start, r.end, N(e.titleFormat || sf(t)), {
    isEndExclusive: t.isRangeAllDay,
    defaultSeparator: e.titleRangeSeparator
  });
}
function sf(t) {
  let { currentRangeUnit: e } = t;
  if (e === "year")
    return { year: "numeric" };
  if (e === "month")
    return { year: "numeric", month: "long" };
  let n = Dt(t.currentRange.start, t.currentRange.end);
  return n !== null && n > 1 ? { year: "numeric", month: "short", day: "numeric" } : { year: "numeric", month: "long", day: "numeric" };
}
class Ci {
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
class lf {
  constructor(e) {
    this.computeCurrentViewData = A(this._computeCurrentViewData), this.organizeRawLocales = A(ou), this.buildLocale = A(Sl), this.buildPluginHooks = uu(), this.buildDateEnv = A(of), this.buildTheme = A(af), this.parseToolbars = A(Bu), this.buildViewSpecs = A(vu), this.buildDateProfileGenerator = mt(cf), this.buildViewApi = A(df), this.buildViewUiProps = mt(hf), this.buildEventUiBySource = A(uf, V), this.buildEventUiBases = A(ff), this.parseContextBusinessHours = mt(gf), this.buildTitle = A(rf), this.nowManager = new Ci(), this.emitter = new Gt(), this.actionRunner = new nf(this._handleAction.bind(this), this.updateData.bind(this)), this.currentCalendarOptionsInput = {}, this.currentCalendarOptionsRefined = {}, this.currentViewOptionsInput = {}, this.currentViewOptionsRefined = {}, this.currentCalendarOptionsRefiners = {}, this.optionsForRefining = [], this.optionsForHandling = [], this.getCurrentData = () => this.data, this.dispatch = (h) => {
      this.actionRunner.request(h);
    }, this.props = e, this.actionRunner.pause(), this.nowManager = new Ci();
    let n = {}, r = this.computeOptionsData(e.optionOverrides, n, e.calendarApi), i = r.calendarOptions.initialView || r.pluginHooks.initialView, s = this.computeCurrentViewData(i, r, e.optionOverrides, n);
    e.calendarApi.currentDataManager = this, this.emitter.setThisContext(e.calendarApi), this.emitter.setOptions(s.options);
    let l = {
      nowManager: this.nowManager,
      dateEnv: r.dateEnv,
      options: r.calendarOptions,
      pluginHooks: r.pluginHooks,
      calendarApi: e.calendarApi,
      dispatch: this.dispatch,
      emitter: this.emitter,
      getCurrentData: this.getCurrentData
    }, o = Au(r.calendarOptions, r.dateEnv, this.nowManager), a = s.dateProfileGenerator.build(o);
    Z(a.activeRange, o) || (o = a.currentRange.start);
    for (let h of r.pluginHooks.contextInit)
      h(l);
    let d = Du(r.calendarOptions, a, l), c = {
      dynamicOptionOverrides: n,
      currentViewType: i,
      currentDate: o,
      dateProfile: a,
      businessHours: this.parseContextBusinessHours(l),
      eventSources: d,
      eventUiBases: {},
      eventStore: F(),
      renderableEventStore: F(),
      dateSelection: null,
      eventSelection: "",
      eventDrag: null,
      eventResize: null,
      selectionConfig: this.buildViewUiProps(l).selectionConfig
    }, f = Object.assign(Object.assign({}, l), c);
    for (let h of r.pluginHooks.reducers)
      Object.assign(c, h(null, null, f));
    hn(c, l) && this.emitter.trigger("loading", !0), this.state = c, this.updateData(), this.actionRunner.resume();
  }
  resetOptions(e, n) {
    let { props: r } = this;
    n === void 0 ? r.optionOverrides = e : (r.optionOverrides = Object.assign(Object.assign({}, r.optionOverrides || {}), e), this.optionsForRefining.push(...n)), (n === void 0 || n.length) && this.actionRunner.request({
      type: "NOTHING"
    });
  }
  _handleAction(e) {
    let { props: n, state: r, emitter: i } = this, s = wu(r.dynamicOptionOverrides, e), l = this.computeOptionsData(n.optionOverrides, s, n.calendarApi), o = Eu(r.currentViewType, e), a = this.computeCurrentViewData(o, l, n.optionOverrides, s);
    n.calendarApi.currentDataManager = this, i.setThisContext(n.calendarApi), i.setOptions(a.options);
    let d = {
      nowManager: this.nowManager,
      dateEnv: l.dateEnv,
      options: l.calendarOptions,
      pluginHooks: l.pluginHooks,
      calendarApi: n.calendarApi,
      dispatch: this.dispatch,
      emitter: i,
      getCurrentData: this.getCurrentData
    }, { currentDate: c, dateProfile: f } = r;
    this.data && this.data.dateProfileGenerator !== a.dateProfileGenerator && (f = a.dateProfileGenerator.build(c)), c = Su(c, e), f = Cu(f, e, c, a.dateProfileGenerator), (e.type === "PREV" || // TODO: move this logic into DateProfileGenerator
    e.type === "NEXT" || // "
    !Z(f.currentRange, c)) && (c = f.currentRange.start);
    let h = _u(r.eventSources, e, f, d), u = Rc(r.eventStore, e, h, f, d), v = wl(h) && !a.options.progressiveEventRendering && r.renderableEventStore || u, { eventUiSingleBase: b, selectionConfig: y } = this.buildViewUiProps(d), E = this.buildEventUiBySource(h), w = this.buildEventUiBases(v.defs, b, E), C = {
      dynamicOptionOverrides: s,
      currentViewType: o,
      currentDate: c,
      dateProfile: f,
      eventSources: h,
      eventStore: u,
      renderableEventStore: v,
      selectionConfig: y,
      eventUiBases: w,
      businessHours: this.parseContextBusinessHours(d),
      dateSelection: Nu(r.dateSelection, e),
      eventSelection: Ou(r.eventSelection, e),
      eventDrag: Pu(r.eventDrag, e),
      eventResize: Hu(r.eventResize, e)
    }, O = Object.assign(Object.assign({}, d), C);
    for (let _ of l.pluginHooks.reducers)
      Object.assign(C, _(r, e, O));
    let T = hn(r, d), M = hn(C, d);
    !T && M ? i.trigger("loading", !0) : T && !M && i.trigger("loading", !1), this.state = C, n.onAction && n.onAction(e);
  }
  updateData() {
    let { props: e, state: n } = this, r = this.data, i = this.computeOptionsData(e.optionOverrides, n.dynamicOptionOverrides, e.calendarApi), s = this.computeCurrentViewData(n.currentViewType, i, e.optionOverrides, n.dynamicOptionOverrides), l = this.data = Object.assign(Object.assign(Object.assign({ nowManager: this.nowManager, viewTitle: this.buildTitle(n.dateProfile, s.options, i.dateEnv), calendarApi: e.calendarApi, dispatch: this.dispatch, emitter: this.emitter, getCurrentData: this.getCurrentData }, i), s), n), o = i.pluginHooks.optionChangeHandlers, a = r && r.calendarOptions, d = i.calendarOptions;
    if (a && a !== d) {
      a.timeZone !== d.timeZone && (n.eventSources = l.eventSources = Ru(l.eventSources, n.dateProfile, l), n.eventStore = l.eventStore = hi(l.eventStore, r.dateEnv, l.dateEnv), n.renderableEventStore = l.renderableEventStore = hi(l.renderableEventStore, r.dateEnv, l.dateEnv));
      for (let c in o)
        (this.optionsForHandling.indexOf(c) !== -1 || a[c] !== d[c]) && o[c](d[c], l);
    }
    this.optionsForHandling = [], e.onData && e.onData(l);
  }
  computeOptionsData(e, n, r) {
    if (!this.optionsForRefining.length && e === this.stableOptionOverrides && n === this.stableDynamicOptionOverrides)
      return this.stableCalendarOptionsData;
    let { refinedOptions: i, pluginHooks: s, localeDefaults: l, availableLocaleData: o, extra: a } = this.processRawCalendarOptions(e, n);
    Di(a);
    let d = this.buildDateEnv(i.timeZone, i.locale, i.weekNumberCalculation, i.firstDay, i.weekText, s, o, i.defaultRangeSeparator), c = this.buildViewSpecs(s.views, this.stableOptionOverrides, this.stableDynamicOptionOverrides, l), f = this.buildTheme(i, s), h = this.parseToolbars(i, this.stableOptionOverrides, f, c, r);
    return this.stableCalendarOptionsData = {
      calendarOptions: i,
      pluginHooks: s,
      dateEnv: d,
      viewSpecs: c,
      theme: f,
      toolbarConfig: h,
      localeDefaults: l,
      availableRawLocales: o.map
    };
  }
  // always called from behind a memoizer
  processRawCalendarOptions(e, n) {
    let { locales: r, locale: i } = rn([
      Qe,
      e,
      n
    ]), s = this.organizeRawLocales(r), l = s.map, o = this.buildLocale(i || s.defaultCode, l).options, a = this.buildPluginHooks(e.plugins || [], tf), d = this.currentCalendarOptionsRefiners = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, oi), ai), ci), a.listenerRefiners), a.optionRefiners), c = {}, f = rn([
      Qe,
      o,
      e,
      n
    ]), h = {}, u = this.currentCalendarOptionsInput, p = this.currentCalendarOptionsRefined, v = !1;
    for (let b in f)
      this.optionsForRefining.indexOf(b) === -1 && (f[b] === u[b] || ue[b] && b in u && ue[b](u[b], f[b])) ? h[b] = p[b] : d[b] ? (h[b] = d[b](f[b]), v = !0) : c[b] = u[b];
    return v && (this.currentCalendarOptionsInput = f, this.currentCalendarOptionsRefined = h, this.stableOptionOverrides = e, this.stableDynamicOptionOverrides = n), this.optionsForHandling.push(...this.optionsForRefining), this.optionsForRefining = [], {
      rawOptions: this.currentCalendarOptionsInput,
      refinedOptions: this.currentCalendarOptionsRefined,
      pluginHooks: a,
      availableLocaleData: s,
      localeDefaults: o,
      extra: c
    };
  }
  _computeCurrentViewData(e, n, r, i) {
    let s = n.viewSpecs[e];
    if (!s)
      throw new Error(`viewType "${e}" is not available. Please make sure you've loaded all neccessary plugins`);
    let { refinedOptions: l, extra: o } = this.processRawViewOptions(s, n.pluginHooks, n.localeDefaults, r, i);
    Di(o), this.nowManager.handleInput(n.dateEnv, l.now);
    let a = this.buildDateProfileGenerator({
      dateProfileGeneratorClass: s.optionDefaults.dateProfileGeneratorClass,
      nowManager: this.nowManager,
      duration: s.duration,
      durationUnit: s.durationUnit,
      usesMinMaxTime: s.optionDefaults.usesMinMaxTime,
      dateEnv: n.dateEnv,
      calendarApi: this.props.calendarApi,
      slotMinTime: l.slotMinTime,
      slotMaxTime: l.slotMaxTime,
      showNonCurrentDates: l.showNonCurrentDates,
      dayCount: l.dayCount,
      dateAlignment: l.dateAlignment,
      dateIncrement: l.dateIncrement,
      hiddenDays: l.hiddenDays,
      weekends: l.weekends,
      validRangeInput: l.validRange,
      visibleRangeInput: l.visibleRange,
      fixedWeekCount: l.fixedWeekCount
    }), d = this.buildViewApi(e, this.getCurrentData, n.dateEnv);
    return { viewSpec: s, options: l, dateProfileGenerator: a, viewApi: d };
  }
  processRawViewOptions(e, n, r, i, s) {
    let l = rn([
      Qe,
      e.optionDefaults,
      r,
      i,
      e.optionOverrides,
      s
    ]), o = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, oi), ai), ci), Va), n.listenerRefiners), n.optionRefiners), a = {}, d = this.currentViewOptionsInput, c = this.currentViewOptionsRefined, f = !1, h = {};
    for (let u in l)
      l[u] === d[u] || ue[u] && ue[u](l[u], d[u]) ? a[u] = c[u] : (l[u] === this.currentCalendarOptionsInput[u] || ue[u] && ue[u](l[u], this.currentCalendarOptionsInput[u]) ? u in this.currentCalendarOptionsRefined && (a[u] = this.currentCalendarOptionsRefined[u]) : o[u] ? a[u] = o[u](l[u]) : h[u] = l[u], f = !0);
    return f && (this.currentViewOptionsInput = l, this.currentViewOptionsRefined = a), {
      rawOptions: this.currentViewOptionsInput,
      refinedOptions: this.currentViewOptionsRefined,
      extra: h
    };
  }
}
function of(t, e, n, r, i, s, l, o) {
  let a = Sl(e || l.defaultCode, l.map);
  return new nc({
    calendarSystem: "gregory",
    timeZone: t,
    namedTimeZoneImpl: s.namedTimeZonedImpl,
    locale: a,
    weekNumberCalculation: n,
    firstDay: r,
    weekText: i,
    cmdFormatter: s.cmdFormatter,
    defaultSeparator: o
  });
}
function af(t, e) {
  let n = e.themeClasses[t.themeSystem] || ce;
  return new n(t);
}
function cf(t) {
  let e = t.dateProfileGeneratorClass || Ns;
  return new e(t);
}
function df(t, e, n) {
  return new Lu(t, e, n);
}
function uf(t) {
  return X(t, (e) => e.ui);
}
function ff(t, e, n) {
  let r = { "": e };
  for (let i in t) {
    let s = t[i];
    s.sourceId && n[s.sourceId] && (r[i] = n[s.sourceId]);
  }
  return r;
}
function hf(t) {
  let { options: e } = t;
  return {
    eventUiSingleBase: It({
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
    selectionConfig: It({
      constraint: e.selectConstraint,
      overlap: typeof e.selectOverlap == "boolean" ? e.selectOverlap : void 0,
      allow: e.selectAllow
    }, t)
  };
}
function hn(t, e) {
  for (let n of e.pluginHooks.isLoadingFuncs)
    if (n(t))
      return !0;
  return !1;
}
function gf(t) {
  return Hc(t.options.businessHours, t);
}
function Di(t, e) {
  for (let n in t)
    console.warn(`Unknown option '${n}'`);
}
class pf extends R {
  render() {
    let e = this.props.widgetGroups.map((n) => this.renderWidgetGroup(n));
    return g("div", { className: "fc-toolbar-chunk" }, ...e);
  }
  renderWidgetGroup(e) {
    let { props: n } = this, { theme: r } = this.context, i = [], s = !0;
    for (let l of e) {
      let { buttonName: o, buttonClick: a, buttonText: d, buttonIcon: c, buttonHint: f } = l;
      if (o === "title")
        s = !1, i.push(g("h2", { className: "fc-toolbar-title", id: n.titleId }, n.title));
      else {
        let h = o === n.activeButton, u = !n.isTodayEnabled && o === "today" || !n.isPrevEnabled && o === "prev" || !n.isNextEnabled && o === "next", p = [`fc-${o}-button`, r.getClass("button")];
        h && p.push(r.getClass("buttonActive")), i.push(g("button", { type: "button", title: typeof f == "function" ? f(n.navUnit) : f, disabled: u, "aria-pressed": h, className: p.join(" "), onClick: a }, d || (c ? g("span", { className: c, role: "img" }) : "")));
      }
    }
    if (i.length > 1) {
      let l = s && r.getClass("buttonGroup") || "";
      return g("div", { className: l }, ...i);
    }
    return i[0];
  }
}
class _i extends R {
  render() {
    let { model: e, extraClassName: n } = this.props, r = !1, i, s, l = e.sectionWidgets, o = l.center;
    return l.left ? (r = !0, i = l.left) : i = l.start, l.right ? (r = !0, s = l.right) : s = l.end, g(
      "div",
      { className: [
        n || "",
        "fc-toolbar",
        r ? "fc-toolbar-ltr" : ""
      ].join(" ") },
      this.renderSection("start", i || []),
      this.renderSection("center", o || []),
      this.renderSection("end", s || [])
    );
  }
  renderSection(e, n) {
    let { props: r } = this;
    return g(pf, { key: e, widgetGroups: n, title: r.title, navUnit: r.navUnit, activeButton: r.activeButton, isTodayEnabled: r.isTodayEnabled, isPrevEnabled: r.isPrevEnabled, isNextEnabled: r.isNextEnabled, titleId: r.titleId });
  }
}
class mf extends R {
  constructor() {
    super(...arguments), this.state = {
      availableWidth: null
    }, this.handleEl = (e) => {
      this.el = e, q(this.props.elRef, e), this.updateAvailableWidth();
    }, this.handleResize = () => {
      this.updateAvailableWidth();
    };
  }
  render() {
    let { props: e, state: n } = this, { aspectRatio: r } = e, i = [
      "fc-view-harness",
      r || e.liquid || e.height ? "fc-view-harness-active" : "fc-view-harness-passive"
      // let the view do the height
    ], s = "", l = "";
    return r ? n.availableWidth !== null ? s = n.availableWidth / r : l = `${1 / r * 100}%` : s = e.height || "", g("div", { "aria-labelledby": e.labeledById, ref: this.handleEl, className: i.join(" "), style: { height: s, paddingBottom: l } }, e.children);
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
class vf extends ze {
  constructor(e) {
    super(e), this.handleSegClick = (n, r) => {
      let { component: i } = this, { context: s } = i, l = Be(r);
      if (l && // might be the <div> surrounding the more link
      i.isValidSegDownEl(n.target)) {
        let o = $(n.target, ".fc-event-forced-url"), a = o ? o.querySelector("a[href]").href : "";
        s.emitter.trigger("eventClick", {
          el: r,
          event: new I(i.context, l.eventRange.def, l.eventRange.instance),
          jsEvent: n,
          view: s.viewApi
        }), a && !n.defaultPrevented && (window.location.href = a);
      }
    }, this.destroy = Es(
      e.el,
      "click",
      ".fc-event",
      // on both fg and bg events
      this.handleSegClick
    );
  }
}
class bf extends ze {
  constructor(e) {
    super(e), this.handleEventElRemove = (n) => {
      n === this.currentSegEl && this.handleSegLeave(null, this.currentSegEl);
    }, this.handleSegEnter = (n, r) => {
      Be(r) && (this.currentSegEl = r, this.triggerEvent("eventMouseEnter", n, r));
    }, this.handleSegLeave = (n, r) => {
      this.currentSegEl && (this.currentSegEl = null, this.triggerEvent("eventMouseLeave", n, r));
    }, this.removeHoverListeners = Xo(
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
    let { component: i } = this, { context: s } = i, l = Be(r);
    (!n || i.isValidSegDownEl(n.target)) && s.emitter.trigger(e, {
      el: r,
      event: new I(s, l.eventRange.def, l.eventRange.instance),
      jsEvent: n,
      view: s.viewApi
    });
  }
}
class yf extends we {
  constructor() {
    super(...arguments), this.buildViewContext = A(sc), this.buildViewPropTransformers = A(Sf), this.buildToolbarProps = A(Ef), this.headerRef = L(), this.footerRef = L(), this.interactionsStore = {}, this.state = {
      viewLabelId: Ft()
    }, this.registerInteractiveComponent = (e, n) => {
      let r = id(e, n), l = [
        vf,
        bf
      ].concat(this.props.pluginHooks.componentInteractions).map((o) => new o(r));
      this.interactionsStore[e.uid] = l, Dn[e.uid] = r;
    }, this.unregisterInteractiveComponent = (e) => {
      let n = this.interactionsStore[e.uid];
      if (n) {
        for (let r of n)
          r.destroy();
        delete this.interactionsStore[e.uid];
      }
      delete Dn[e.uid];
    }, this.resizeRunner = new zn(() => {
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
    let { props: e } = this, { toolbarConfig: n, options: r } = e, i = !1, s = "", l;
    e.isHeightAuto || e.forPrint ? s = "" : r.height != null ? i = !0 : r.contentHeight != null ? s = r.contentHeight : l = Math.max(r.aspectRatio, 0.5);
    let o = this.buildViewContext(e.viewSpec, e.viewApi, e.options, e.dateProfileGenerator, e.dateEnv, e.nowManager, e.theme, e.pluginHooks, e.dispatch, e.getCurrentData, e.emitter, e.calendarApi, this.registerInteractiveComponent, this.unregisterInteractiveComponent), a = n.header && n.header.hasTitle ? this.state.viewLabelId : void 0;
    return g(
      J.Provider,
      { value: o },
      g(Fe, { unit: "day" }, (d) => {
        let c = this.buildToolbarProps(e.viewSpec, e.dateProfile, e.dateProfileGenerator, e.currentDate, d, e.viewTitle);
        return g(
          x,
          null,
          n.header && g(_i, Object.assign({ ref: this.headerRef, extraClassName: "fc-header-toolbar", model: n.header, titleId: a }, c)),
          g(
            mf,
            { liquid: i, height: s, aspectRatio: l, labeledById: a },
            this.renderView(e),
            this.buildAppendContent()
          ),
          n.footer && g(_i, Object.assign({ ref: this.footerRef, extraClassName: "fc-footer-toolbar", model: n.footer, titleId: "" }, c))
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
    return g(x, {}, ...n);
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
    for (let o of s)
      Object.assign(i, o.transform(i, e));
    let l = r.component;
    return g(l, Object.assign({}, i));
  }
}
function Ef(t, e, n, r, i, s) {
  let l = n.build(i, void 0, !1), o = n.buildPrev(e, r, !1), a = n.buildNext(e, r, !1);
  return {
    title: s,
    activeButton: t.type,
    navUnit: t.singleUnit,
    isTodayEnabled: l.isValid && !Z(e.currentRange, i),
    isPrevEnabled: o.isValid,
    isNextEnabled: a.isValid
  };
}
function Sf(t) {
  return t.map((e) => new e());
}
class Af extends ld {
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
        xt(() => {
          Je(g(rd, { options: r.calendarOptions, theme: r.theme, emitter: r.emitter }, (i, s, l, o) => (this.setClassNames(i), this.setHeight(s), g(
            xs.Provider,
            { value: this.customContentRenderId },
            g(yf, Object.assign({ isHeightAuto: l, forPrint: o }, r))
          ))), this.el);
        });
      } else this.isRendered && (this.isRendered = !1, Je(null, this.el), this.setClassNames([]), this.setHeight(""));
    }, Fo(e), this.el = e, this.renderRunner = new zn(this.handleRenderRequest), new lf({
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
    xt(() => {
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
    if (!oe(e, this.currentClassNames)) {
      let { classList: n } = this.el;
      for (let r of this.currentClassNames)
        n.remove(r);
      for (let r of e)
        n.add(r);
      this.currentClassNames = e;
    }
  }
  setHeight(e) {
    bs(this.el, "height", e);
  }
}
function gn(t) {
  return t === "Tag" || t === "Monat" ? "r" : t === "Jahr" ? "s" : "";
}
var wf = {
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
      return `Vorherige${gn(t)} ${t}`;
    },
    next(t) {
      return `Nächste${gn(t)} ${t}`;
    },
    today(t) {
      return t === "Tag" ? "Heute" : `Diese${gn(t)} ${t}`;
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
class Cf extends Y {
  constructor() {
    super(...arguments), this.headerElRef = L();
  }
  renderSimpleLayout(e, n) {
    let { props: r, context: i } = this, s = [], l = Pt(i.options);
    return e && s.push({
      type: "header",
      key: "header",
      isSticky: l,
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
    }), g(
      kt,
      { elClasses: ["fc-daygrid"], viewSpec: i.viewSpec },
      g(ur, { liquid: !r.isHeightAuto && !r.forPrint, collapsibleWidth: r.forPrint, cols: [], sections: s })
    );
  }
  renderHScrollLayout(e, n, r, i) {
    let s = this.context.pluginHooks.scrollGridImpl;
    if (!s)
      throw new Error("No ScrollGrid implementation");
    let { props: l, context: o } = this, a = !l.forPrint && Pt(o.options), d = !l.forPrint && hl(o.options), c = [];
    return e && c.push({
      type: "header",
      key: "header",
      isSticky: a,
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
        content: Tn
      }]
    }), g(
      kt,
      { elClasses: ["fc-daygrid"], viewSpec: o.viewSpec },
      g(s, { liquid: !l.isHeightAuto && !l.forPrint, forPrint: l.forPrint, collapsibleWidth: l.forPrint, colGroups: [{ cols: [{ span: r, minWidth: i }] }], sections: c })
    );
  }
}
function bt(t, e) {
  let n = [];
  for (let r = 0; r < e; r += 1)
    n[r] = [];
  for (let r of t)
    n[r.row].push(r);
  return n;
}
function ut(t, e) {
  let n = [];
  for (let r = 0; r < e; r += 1)
    n[r] = [];
  for (let r of t)
    n[r.firstCol].push(r);
  return n;
}
function Ri(t, e) {
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
const Tl = N({
  hour: "numeric",
  minute: "2-digit",
  omitZeroMinute: !0,
  meridiem: "narrow"
});
function xl(t) {
  let { display: e } = t.eventRange.ui;
  return e === "list-item" || e === "auto" && !t.eventRange.def.allDay && t.firstCol === t.lastCol && // can't be multi-day
  t.isStart && // "
  t.isEnd;
}
class kl extends R {
  render() {
    let { props: e } = this;
    return g(hr, Object.assign({}, e, { elClasses: ["fc-daygrid-event", "fc-daygrid-block-event", "fc-h-event"], defaultTimeFormat: Tl, defaultDisplayEventEnd: e.defaultDisplayEventEnd, disableResizing: !e.seg.eventRange.def.allDay }));
  }
}
class Ml extends R {
  render() {
    let { props: e, context: n } = this, { options: r } = n, { seg: i } = e, s = r.eventTimeFormat || Tl, l = Gs(i, s, n, !0, e.defaultDisplayEventEnd);
    return g(fr, Object.assign({}, e, { elTag: "a", elClasses: ["fc-daygrid-event", "fc-daygrid-dot-event"], elAttrs: Ys(e.seg, n), defaultGenerator: Df, timeText: l, isResizing: !1, isDateSelecting: !1 }));
  }
}
function Df(t) {
  return g(
    x,
    null,
    g("div", { className: "fc-daygrid-event-dot", style: { borderColor: t.borderColor || t.backgroundColor } }),
    t.timeText && g("div", { className: "fc-event-time" }, t.timeText),
    g("div", { className: "fc-event-title" }, t.event.title || g(x, null, " "))
  );
}
class _f extends R {
  constructor() {
    super(...arguments), this.compileSegs = A(Rf);
  }
  render() {
    let { props: e } = this, { allSegs: n, invisibleSegs: r } = this.compileSegs(e.singlePlacements);
    return g(vl, { elClasses: ["fc-daygrid-more-link"], dateProfile: e.dateProfile, todayRange: e.todayRange, allDayDate: e.allDayDate, moreCnt: e.moreCnt, allSegs: n, hiddenSegs: r, alignmentElRef: e.alignmentElRef, alignGridTop: e.alignGridTop, extraDateSpan: e.extraDateSpan, popoverContent: () => {
      let i = (e.eventDrag ? e.eventDrag.affectedInstances : null) || (e.eventResize ? e.eventResize.affectedInstances : null) || {};
      return g(x, null, n.map((s) => {
        let l = s.eventRange.instance.instanceId;
        return g("div", { className: "fc-daygrid-event-harness", key: l, style: {
          visibility: i[l] ? "hidden" : ""
        } }, xl(s) ? g(Ml, Object.assign({ seg: s, isDragging: !1, isSelected: l === e.eventSelection, defaultDisplayEventEnd: !1 }, le(s, e.todayRange))) : g(kl, Object.assign({ seg: s, isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: l === e.eventSelection, defaultDisplayEventEnd: !1 }, le(s, e.todayRange))));
      }));
    } });
  }
}
function Rf(t) {
  let e = [], n = [];
  for (let r of t)
    e.push(r.seg), r.isVisible || n.push(r.seg);
  return { allSegs: e, invisibleSegs: n };
}
const Tf = N({ week: "narrow" });
class xf extends Y {
  constructor() {
    super(...arguments), this.rootElRef = L(), this.state = {
      dayNumberId: Ft()
    }, this.handleRootEl = (e) => {
      q(this.rootElRef, e), q(this.props.elRef, e);
    };
  }
  render() {
    let { context: e, props: n, state: r, rootElRef: i } = this, { options: s, dateEnv: l } = e, { date: o, dateProfile: a } = n;
    const d = n.showDayNumber && Mf(o, a.currentRange, l);
    return g(pr, { elTag: "td", elRef: this.handleRootEl, elClasses: [
      "fc-daygrid-day",
      ...n.extraClassNames || []
    ], elAttrs: Object.assign(Object.assign(Object.assign({}, n.extraDataAttrs), n.showDayNumber ? { "aria-labelledby": r.dayNumberId } : {}), { role: "gridcell" }), defaultGenerator: kf, date: o, dateProfile: a, todayRange: n.todayRange, showDayNumber: n.showDayNumber, isMonthStart: d, extraRenderProps: n.extraRenderProps }, (c, f) => g(
      "div",
      { ref: n.innerElRef, className: "fc-daygrid-day-frame fc-scrollgrid-sync-inner", style: { minHeight: n.minHeight } },
      n.showWeekNumber && g(ml, { elTag: "a", elClasses: ["fc-daygrid-week-number"], elAttrs: Ot(e, o, "week"), date: o, defaultFormat: Tf }),
      !f.isDisabled && (n.showDayNumber || mr(s) || n.forceDayTop) ? g(
        "div",
        { className: "fc-daygrid-day-top" },
        g(c, { elTag: "a", elClasses: [
          "fc-daygrid-day-number",
          d && "fc-daygrid-month-start"
        ], elAttrs: Object.assign(Object.assign({}, Ot(e, o)), { id: r.dayNumberId }) })
      ) : n.showDayNumber ? (
        // for creating correct amount of space (see issue #7162)
        g(
          "div",
          { className: "fc-daygrid-day-top", style: { visibility: "hidden" } },
          g("a", { className: "fc-daygrid-day-number" }, " ")
        )
      ) : void 0,
      g(
        "div",
        { className: "fc-daygrid-day-events", ref: n.fgContentElRef },
        n.fgContent,
        g(
          "div",
          { className: "fc-daygrid-day-bottom", style: { marginTop: n.moreMarginTop } },
          g(_f, { allDayDate: o, singlePlacements: n.singlePlacements, moreCnt: n.moreCnt, alignmentElRef: i, alignGridTop: !n.showDayNumber, extraDateSpan: n.extraDateSpan, dateProfile: n.dateProfile, eventSelection: n.eventSelection, eventDrag: n.eventDrag, eventResize: n.eventResize, todayRange: n.todayRange })
        )
      ),
      g("div", { className: "fc-daygrid-day-bg" }, n.bgContent)
    ));
  }
}
function kf(t) {
  return t.dayNumberText || g(x, null, " ");
}
function Mf(t, e, n) {
  const { start: r, end: i } = e, s = ae(i, -1), l = n.getYear(r), o = n.getMonth(r), a = n.getYear(s), d = n.getMonth(s);
  return !(l === a && o === d) && // first date in current view?
  (t.valueOf() === r.valueOf() || // a month-start that's within the current range?
  n.getDay(t) === 1 && t.valueOf() < i.valueOf());
}
function Il(t) {
  return t.eventRange.instance.instanceId + ":" + t.firstCol;
}
function Nl(t) {
  return Il(t) + ":" + t.lastCol;
}
function If(t, e, n, r, i, s, l) {
  let o = new Pf((y) => {
    let E = t[y.index].eventRange.instance.instanceId + ":" + y.span.start + ":" + (y.span.end - 1);
    return i[E] || 1;
  });
  o.allowReslicing = !0, o.strictOrder = r, e === !0 || n === !0 ? (o.maxCoord = s, o.hiddenConsumes = !0) : typeof e == "number" ? o.maxStackCnt = e : typeof n == "number" && (o.maxStackCnt = n, o.hiddenConsumes = !0);
  let a = [], d = [];
  for (let y = 0; y < t.length; y += 1) {
    let E = t[y], w = Nl(E);
    i[w] != null ? a.push({
      index: y,
      span: {
        start: E.firstCol,
        end: E.lastCol + 1
      }
    }) : d.push(E);
  }
  let c = o.addSegs(a), f = o.toRects(), { singleColPlacements: h, multiColPlacements: u, leftoverMargins: p } = Nf(f, t, l), v = [], b = [];
  for (let y of d) {
    u[y.firstCol].push({
      seg: y,
      isVisible: !1,
      isAbsolute: !0,
      absoluteTop: 0,
      marginTop: 0
    });
    for (let E = y.firstCol; E <= y.lastCol; E += 1)
      h[E].push({
        seg: Ie(y, E, E + 1, l),
        isVisible: !1,
        isAbsolute: !1,
        absoluteTop: 0,
        marginTop: 0
      });
  }
  for (let y = 0; y < l.length; y += 1)
    v.push(0);
  for (let y of c) {
    let E = t[y.index], w = y.span;
    u[w.start].push({
      seg: Ie(E, w.start, w.end, l),
      isVisible: !1,
      isAbsolute: !0,
      absoluteTop: 0,
      marginTop: 0
    });
    for (let C = w.start; C < w.end; C += 1)
      v[C] += 1, h[C].push({
        seg: Ie(E, C, C + 1, l),
        isVisible: !1,
        isAbsolute: !1,
        absoluteTop: 0,
        marginTop: 0
      });
  }
  for (let y = 0; y < l.length; y += 1)
    b.push(p[y]);
  return { singleColPlacements: h, multiColPlacements: u, moreCnts: v, moreMarginTops: b };
}
function Nf(t, e, n) {
  let r = Of(t, n.length), i = [], s = [], l = [];
  for (let o = 0; o < n.length; o += 1) {
    let a = r[o], d = [], c = 0, f = 0;
    for (let u of a) {
      let p = e[u.index];
      d.push({
        seg: Ie(p, o, o + 1, n),
        isVisible: !0,
        isAbsolute: !1,
        absoluteTop: u.levelCoord,
        marginTop: u.levelCoord - c
      }), c = u.levelCoord + u.thickness;
    }
    let h = [];
    c = 0, f = 0;
    for (let u of a) {
      let p = e[u.index], v = u.span.end - u.span.start > 1, b = u.span.start === o;
      f += u.levelCoord - c, c = u.levelCoord + u.thickness, v ? (f += u.thickness, b && h.push({
        seg: Ie(p, u.span.start, u.span.end, n),
        isVisible: !0,
        isAbsolute: !0,
        absoluteTop: u.levelCoord,
        marginTop: 0
      })) : b && (h.push({
        seg: Ie(p, u.span.start, u.span.end, n),
        isVisible: !0,
        isAbsolute: !1,
        absoluteTop: u.levelCoord,
        marginTop: f
        // claim the margin
      }), f = 0);
    }
    i.push(d), s.push(h), l.push(f);
  }
  return { singleColPlacements: i, multiColPlacements: s, leftoverMargins: l };
}
function Of(t, e) {
  let n = [];
  for (let r = 0; r < e; r += 1)
    n.push([]);
  for (let r of t)
    for (let i = r.span.start; i < r.span.end; i += 1)
      n[i].push(r);
  return n;
}
function Ie(t, e, n, r) {
  if (t.firstCol === e && t.lastCol === n - 1)
    return t;
  let i = t.eventRange, s = i.range, l = ye(s, {
    start: r[e].date,
    end: H(r[n - 1].date, 1)
  });
  return Object.assign(Object.assign({}, t), { firstCol: e, lastCol: n - 1, eventRange: {
    def: i.def,
    ui: Object.assign(Object.assign({}, i.ui), { durationEditable: !1 }),
    instance: i.instance,
    range: l
  }, isStart: t.isStart && l.start.valueOf() === s.start.valueOf(), isEnd: t.isEnd && l.end.valueOf() === s.end.valueOf() });
}
class Pf extends nl {
  constructor() {
    super(...arguments), this.hiddenConsumes = !1, this.forceHidden = {};
  }
  addSegs(e) {
    const n = super.addSegs(e), { entriesByLevel: r } = this, i = (s) => !this.forceHidden[me(s)];
    for (let s = 0; s < r.length; s += 1)
      r[s] = r[s].filter(i);
    return n;
  }
  handleInvalidInsertion(e, n, r) {
    const { entriesByLevel: i, forceHidden: s } = this, { touchingEntry: l, touchingLevel: o, touchingLateral: a } = e;
    if (this.hiddenConsumes && l) {
      const d = me(l);
      if (!s[d])
        if (this.allowReslicing) {
          const c = Object.assign(Object.assign({}, l), { span: cr(l.span, n.span) }), f = me(c);
          s[f] = !0, i[o][a] = c, r.push(c), this.splitEntry(l, n, r);
        } else
          s[d] = !0, r.push(l);
    }
    super.handleInvalidInsertion(e, n, r);
  }
}
class Ol extends Y {
  constructor() {
    super(...arguments), this.cellElRefs = new Q(), this.frameElRefs = new Q(), this.fgElRefs = new Q(), this.segHarnessRefs = new Q(), this.rootElRef = L(), this.state = {
      framePositions: null,
      maxContentHeight: null,
      segHeights: {}
    }, this.handleResize = (e) => {
      e && this.updateSizing(!0);
    };
  }
  render() {
    let { props: e, state: n, context: r } = this, { options: i } = r, s = e.cells.length, l = ut(e.businessHourSegs, s), o = ut(e.bgEventSegs, s), a = ut(this.getHighlightSegs(), s), d = ut(this.getMirrorSegs(), s), { singleColPlacements: c, multiColPlacements: f, moreCnts: h, moreMarginTops: u } = If(Vs(e.fgEventSegs, i.eventOrder), e.dayMaxEvents, e.dayMaxEventRows, i.eventOrderStrict, n.segHeights, n.maxContentHeight, e.cells), p = (
      // TODO: messy way to compute this
      e.eventDrag && e.eventDrag.affectedInstances || e.eventResize && e.eventResize.affectedInstances || {}
    );
    return g(
      "tr",
      { ref: this.rootElRef, role: "row" },
      e.renderIntro && e.renderIntro(),
      e.cells.map((v, b) => {
        let y = this.renderFgSegs(b, e.forPrint ? c[b] : f[b], e.todayRange, p), E = this.renderFgSegs(b, Hf(d[b], f), e.todayRange, {}, !!e.eventDrag, !!e.eventResize, !1);
        return g(xf, { key: v.key, elRef: this.cellElRefs.createRef(v.key), innerElRef: this.frameElRefs.createRef(v.key), dateProfile: e.dateProfile, date: v.date, showDayNumber: e.showDayNumbers, showWeekNumber: e.showWeekNumbers && b === 0, forceDayTop: e.showWeekNumbers, todayRange: e.todayRange, eventSelection: e.eventSelection, eventDrag: e.eventDrag, eventResize: e.eventResize, extraRenderProps: v.extraRenderProps, extraDataAttrs: v.extraDataAttrs, extraClassNames: v.extraClassNames, extraDateSpan: v.extraDateSpan, moreCnt: h[b], moreMarginTop: u[b], singlePlacements: c[b], fgContentElRef: this.fgElRefs.createRef(v.key), fgContent: (
          // Fragment scopes the keys
          g(
            x,
            null,
            g(x, null, y),
            g(x, null, E)
          )
        ), bgContent: (
          // Fragment scopes the keys
          g(
            x,
            null,
            this.renderFillSegs(a[b], "highlight"),
            this.renderFillSegs(l[b], "non-business"),
            this.renderFillSegs(o[b], "bg-event")
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
    this.updateSizing(!V(e, r));
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
  renderFgSegs(e, n, r, i, s, l, o) {
    let { context: a } = this, { eventSelection: d } = this.props, { framePositions: c } = this.state, f = this.props.cells.length === 1, h = s || l || o, u = [];
    if (c)
      for (let p of n) {
        let { seg: v } = p, { instanceId: b } = v.eventRange.instance, y = p.isVisible && !i[b], E = p.isAbsolute, w = "", C = "";
        E && (a.isRtl ? (C = 0, w = c.lefts[v.lastCol] - c.lefts[v.firstCol]) : (w = 0, C = c.rights[v.firstCol] - c.rights[v.lastCol])), u.push(g("div", { className: "fc-daygrid-event-harness" + (E ? " fc-daygrid-event-harness-abs" : ""), key: Il(v), ref: h ? null : this.segHarnessRefs.createRef(Nl(v)), style: {
          visibility: y ? "" : "hidden",
          marginTop: E ? "" : p.marginTop,
          top: E ? p.absoluteTop : "",
          left: w,
          right: C
        } }, xl(v) ? g(Ml, Object.assign({ seg: v, isDragging: s, isSelected: b === d, defaultDisplayEventEnd: f }, le(v, r))) : g(kl, Object.assign({ seg: v, isDragging: s, isResizing: l, isDateSelecting: o, isSelected: b === d, defaultDisplayEventEnd: f }, le(v, r)))));
      }
    return u;
  }
  renderFillSegs(e, n) {
    let { isRtl: r } = this.context, { todayRange: i } = this.props, { framePositions: s } = this.state, l = [];
    if (s)
      for (let o of e) {
        let a = r ? {
          right: 0,
          left: s.lefts[o.lastCol] - s.lefts[o.firstCol]
        } : {
          left: 0,
          right: s.rights[o.firstCol] - s.rights[o.lastCol]
        };
        l.push(g("div", { key: qs(o.eventRange), className: "fc-daygrid-bg-harness", style: a }, n === "bg-event" ? g(gl, Object.assign({ seg: o }, le(o, i))) : pl(n)));
      }
    return g(x, {}, ...l);
  }
  updateSizing(e) {
    let { props: n, state: r, frameElRefs: i } = this;
    if (!n.forPrint && n.clientWidth !== null) {
      if (e) {
        let a = n.cells.map((d) => i.currentMap[d.key]);
        if (a.length) {
          let d = this.rootElRef.current, c = new $e(
            d,
            a,
            !0,
            // isHorizontal
            !1
          );
          (!r.framePositions || !r.framePositions.similarTo(c)) && this.setState({
            framePositions: new $e(
              d,
              a,
              !0,
              // isHorizontal
              !1
            )
          });
        }
      }
      const s = this.state.segHeights, l = this.querySegHeights(), o = n.dayMaxEvents === !0 || n.dayMaxEventRows === !0;
      this.safeSetState({
        // HACK to prevent oscillations of events being shown/hidden from max-event-rows
        // Essentially, once you compute an element's height, never null-out.
        // TODO: always display all events, as visibility:hidden?
        segHeights: Object.assign(Object.assign({}, s), l),
        maxContentHeight: o ? this.computeMaxContentHeight() : null
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
Ol.addStateEquality({
  segHeights: V
});
function Hf(t, e) {
  if (!t.length)
    return [];
  let n = Bf(e);
  return t.map((r) => ({
    seg: r,
    isVisible: !0,
    isAbsolute: !0,
    absoluteTop: n[r.eventRange.instance.instanceId],
    marginTop: 0
  }));
}
function Bf(t) {
  let e = {};
  for (let n of t)
    for (let r of n)
      e[r.seg.eventRange.instance.instanceId] = r.absoluteTop;
  return e;
}
class $f extends Y {
  constructor() {
    super(...arguments), this.splitBusinessHourSegs = A(bt), this.splitBgEventSegs = A(Lf), this.splitFgEventSegs = A(bt), this.splitDateSelectionSegs = A(bt), this.splitEventDrag = A(Ri), this.splitEventResize = A(Ri), this.rowRefs = new Q();
  }
  render() {
    let { props: e, context: n } = this, r = e.cells.length, i = this.splitBusinessHourSegs(e.businessHourSegs, r), s = this.splitBgEventSegs(e.bgEventSegs, r), l = this.splitFgEventSegs(e.fgEventSegs, r), o = this.splitDateSelectionSegs(e.dateSelectionSegs, r), a = this.splitEventDrag(e.eventDrag, r), d = this.splitEventResize(e.eventResize, r), c = r >= 7 && e.clientWidth ? e.clientWidth / n.options.aspectRatio / 6 : null;
    return g(Fe, { unit: "day" }, (f, h) => g(x, null, e.cells.map((u, p) => g(Ol, {
      ref: this.rowRefs.createRef(p),
      key: u.length ? u[0].date.toISOString() : p,
      showDayNumbers: r > 1,
      showWeekNumbers: e.showWeekNumbers,
      todayRange: h,
      dateProfile: e.dateProfile,
      cells: u,
      renderIntro: e.renderRowIntro,
      businessHourSegs: i[p],
      eventSelection: e.eventSelection,
      bgEventSegs: s[p],
      fgEventSegs: l[p],
      dateSelectionSegs: o[p],
      eventDrag: a[p],
      eventResize: d[p],
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
    this.rowPositions = new $e(
      this.rootEl,
      this.rowRefs.collect().map((e) => e.getCellEls()[0]),
      // first cell el in each row. TODO: not optimal
      !1,
      !0
    ), this.colPositions = new $e(
      this.rootEl,
      this.rowRefs.currentMap[0].getCellEls(),
      // cell els in first row
      !0,
      // horizontal
      !1
    );
  }
  queryHit(e, n) {
    let { colPositions: r, rowPositions: i } = this, s = r.leftToIndex(e), l = i.topToIndex(n);
    if (l != null && s != null) {
      let o = this.props.cells[l][s];
      return {
        dateProfile: this.props.dateProfile,
        dateSpan: Object.assign({ range: this.getCellRange(l, s), allDay: !0 }, o.extraDateSpan),
        dayEl: this.getCellEl(l, s),
        rect: {
          left: r.lefts[s],
          right: r.rights[s],
          top: i.tops[l],
          bottom: i.bottoms[l]
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
function Lf(t, e) {
  return bt(t.filter(Uf), e);
}
function Uf(t) {
  return t.eventRange.def.allDay;
}
class zf extends Y {
  constructor() {
    super(...arguments), this.elRef = L(), this.needsScrollReset = !1;
  }
  render() {
    let { props: e } = this, { dayMaxEventRows: n, dayMaxEvents: r, expandRows: i } = e, s = r === !0 || n === !0;
    s && !i && (s = !1, n = null, r = null);
    let l = [
      "fc-daygrid-body",
      s ? "fc-daygrid-body-balanced" : "fc-daygrid-body-unbalanced",
      i ? "" : "fc-daygrid-body-natural"
      // will height of one row depend on the others?
    ];
    return g(
      "div",
      { ref: this.elRef, className: l.join(" "), style: {
        // these props are important to give this wrapper correct dimensions for interactions
        // TODO: if we set it here, can we avoid giving to inner tables?
        width: e.clientWidth,
        minWidth: e.tableMinWidth
      } },
      g(
        "table",
        { role: "presentation", className: "fc-scrollgrid-sync-table", style: {
          width: e.clientWidth,
          minWidth: e.tableMinWidth,
          height: i ? e.clientHeight : ""
        } },
        e.colGroupNode,
        g(
          "tbody",
          { role: "presentation" },
          g($f, { dateProfile: e.dateProfile, cells: e.cells, renderRowIntro: e.renderRowIntro, showWeekNumbers: e.showWeekNumbers, clientWidth: e.clientWidth, clientHeight: e.clientHeight, businessHourSegs: e.businessHourSegs, bgEventSegs: e.bgEventSegs, fgEventSegs: e.fgEventSegs, dateSelectionSegs: e.dateSelectionSegs, eventSelection: e.eventSelection, eventDrag: e.eventDrag, eventResize: e.eventResize, dayMaxEvents: r, dayMaxEventRows: n, forPrint: e.forPrint, isHitComboAllowed: e.isHitComboAllowed })
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
      const e = Ff(this.elRef.current, this.props.dateProfile);
      if (e) {
        const n = e.closest(".fc-daygrid-body"), r = n.closest(".fc-scroller"), i = e.getBoundingClientRect().top - n.getBoundingClientRect().top;
        r.scrollTop = i ? i + 1 : 0;
      }
      this.needsScrollReset = !1;
    }
  }
}
function Ff(t, e) {
  let n;
  return e.currentRangeUnit.match(/year|month/) && (n = t.querySelector(`[data-date="${Ta(e.currentDate)}-01"]`)), n || (n = t.querySelector(`[data-date="${Gn(e.currentDate)}"]`)), n;
}
class jf extends al {
  constructor() {
    super(...arguments), this.forceDayIfListItem = !0;
  }
  sliceRange(e, n) {
    return n.sliceRange(e);
  }
}
class Pl extends Y {
  constructor() {
    super(...arguments), this.slicer = new jf(), this.tableRef = L();
  }
  render() {
    let { props: e, context: n } = this;
    return g(zf, Object.assign({ ref: this.tableRef }, this.slicer.sliceProps(e, e.dateProfile, e.nextDayThreshold, n, e.dayTableModel), { dateProfile: e.dateProfile, cells: e.dayTableModel.cells, colGroupNode: e.colGroupNode, tableMinWidth: e.tableMinWidth, renderRowIntro: e.renderRowIntro, dayMaxEvents: e.dayMaxEvents, dayMaxEventRows: e.dayMaxEventRows, showWeekNumbers: e.showWeekNumbers, expandRows: e.expandRows, headerAlignElRef: e.headerAlignElRef, clientWidth: e.clientWidth, clientHeight: e.clientHeight, forPrint: e.forPrint }));
  }
}
class Wf extends Cf {
  constructor() {
    super(...arguments), this.buildDayTableModel = A(Vf), this.headerRef = L(), this.tableRef = L();
  }
  render() {
    let { options: e, dateProfileGenerator: n } = this.context, { props: r } = this, i = this.buildDayTableModel(r.dateProfile, n), s = e.dayHeaders && g(sl, { ref: this.headerRef, dateProfile: r.dateProfile, dates: i.headerDates, datesRepDistinctDays: i.rowCnt === 1 }), l = (o) => g(Pl, { ref: this.tableRef, dateProfile: r.dateProfile, dayTableModel: i, businessHours: r.businessHours, dateSelection: r.dateSelection, eventStore: r.eventStore, eventUiBases: r.eventUiBases, eventSelection: r.eventSelection, eventDrag: r.eventDrag, eventResize: r.eventResize, nextDayThreshold: e.nextDayThreshold, colGroupNode: o.tableColGroupNode, tableMinWidth: o.tableMinWidth, dayMaxEvents: e.dayMaxEvents, dayMaxEventRows: e.dayMaxEventRows, showWeekNumbers: e.weekNumbers, expandRows: !r.isHeightAuto, headerAlignElRef: this.headerElRef, clientWidth: o.clientWidth, clientHeight: o.clientHeight, forPrint: r.forPrint });
    return e.dayMinWidth ? this.renderHScrollLayout(s, l, i.colCnt, e.dayMinWidth) : this.renderSimpleLayout(s, l);
  }
}
function Vf(t, e) {
  let n = new ll(t.renderRange, e);
  return new ol(n, /year|month|week/.test(t.currentRangeUnit));
}
class Gf extends Ns {
  // Computes the date range that will be rendered
  buildRenderRange(e, n, r) {
    let i = super.buildRenderRange(e, n, r), { props: s } = this;
    return qf({
      currentRange: i,
      snapToWeek: /^(year|month)$/.test(n),
      fixedWeekCount: s.fixedWeekCount,
      dateEnv: s.dateEnv
    });
  }
}
function qf(t) {
  let { dateEnv: e, currentRange: n } = t, { start: r, end: i } = n, s;
  if (t.snapToWeek && (r = e.startOfWeek(r), s = e.startOfWeek(i), s.valueOf() !== i.valueOf() && (i = ni(s, 1))), t.fixedWeekCount) {
    let l = e.startOfWeek(e.startOfMonth(H(n.end, -1))), o = Math.ceil(
      // could be partial weeks due to hiddenDays
      va(l, i)
    );
    i = ni(i, 6 - o);
  }
  return { start: r, end: i };
}
var Yf = ':root{--fc-daygrid-event-dot-width:8px}.fc-daygrid-day-events:after,.fc-daygrid-day-events:before,.fc-daygrid-day-frame:after,.fc-daygrid-day-frame:before,.fc-daygrid-event-harness:after,.fc-daygrid-event-harness:before{clear:both;content:"";display:table}.fc .fc-daygrid-body{position:relative;z-index:1}.fc .fc-daygrid-day.fc-day-today{background-color:var(--fc-today-bg-color)}.fc .fc-daygrid-day-frame{min-height:100%;position:relative}.fc .fc-daygrid-day-top{display:flex;flex-direction:row-reverse}.fc .fc-day-other .fc-daygrid-day-top{opacity:.3}.fc .fc-daygrid-day-number{padding:4px;position:relative;z-index:4}.fc .fc-daygrid-month-start{font-size:1.1em;font-weight:700}.fc .fc-daygrid-day-events{margin-top:1px}.fc .fc-daygrid-body-balanced .fc-daygrid-day-events{left:0;position:absolute;right:0}.fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events{min-height:2em;position:relative}.fc .fc-daygrid-body-natural .fc-daygrid-day-events{margin-bottom:1em}.fc .fc-daygrid-event-harness{position:relative}.fc .fc-daygrid-event-harness-abs{left:0;position:absolute;right:0;top:0}.fc .fc-daygrid-bg-harness{bottom:0;position:absolute;top:0}.fc .fc-daygrid-day-bg .fc-non-business{z-index:1}.fc .fc-daygrid-day-bg .fc-bg-event{z-index:2}.fc .fc-daygrid-day-bg .fc-highlight{z-index:3}.fc .fc-daygrid-event{margin-top:1px;z-index:6}.fc .fc-daygrid-event.fc-event-mirror{z-index:7}.fc .fc-daygrid-day-bottom{font-size:.85em;margin:0 2px}.fc .fc-daygrid-day-bottom:after,.fc .fc-daygrid-day-bottom:before{clear:both;content:"";display:table}.fc .fc-daygrid-more-link{border-radius:3px;cursor:pointer;line-height:1;margin-top:1px;max-width:100%;overflow:hidden;padding:2px;position:relative;white-space:nowrap;z-index:4}.fc .fc-daygrid-more-link:hover{background-color:rgba(0,0,0,.1)}.fc .fc-daygrid-week-number{background-color:var(--fc-neutral-bg-color);color:var(--fc-neutral-text-color);min-width:1.5em;padding:2px;position:absolute;text-align:center;top:0;z-index:5}.fc .fc-more-popover .fc-popover-body{min-width:220px;padding:10px}.fc-direction-ltr .fc-daygrid-event.fc-event-start,.fc-direction-rtl .fc-daygrid-event.fc-event-end{margin-left:2px}.fc-direction-ltr .fc-daygrid-event.fc-event-end,.fc-direction-rtl .fc-daygrid-event.fc-event-start{margin-right:2px}.fc-direction-ltr .fc-daygrid-more-link{float:left}.fc-direction-ltr .fc-daygrid-week-number{border-radius:0 0 3px 0;left:0}.fc-direction-rtl .fc-daygrid-more-link{float:right}.fc-direction-rtl .fc-daygrid-week-number{border-radius:0 0 0 3px;right:0}.fc-liquid-hack .fc-daygrid-day-frame{position:static}.fc-daygrid-event{border-radius:3px;font-size:var(--fc-small-font-size);position:relative;white-space:nowrap}.fc-daygrid-block-event .fc-event-time{font-weight:700}.fc-daygrid-block-event .fc-event-time,.fc-daygrid-block-event .fc-event-title{padding:1px}.fc-daygrid-dot-event{align-items:center;display:flex;padding:2px 0}.fc-daygrid-dot-event .fc-event-title{flex-grow:1;flex-shrink:1;font-weight:700;min-width:0;overflow:hidden}.fc-daygrid-dot-event.fc-event-mirror,.fc-daygrid-dot-event:hover{background:rgba(0,0,0,.1)}.fc-daygrid-dot-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-daygrid-event-dot{border:calc(var(--fc-daygrid-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-daygrid-event-dot-width)/2);box-sizing:content-box;height:0;margin:0 4px;width:0}.fc-direction-ltr .fc-daygrid-event .fc-event-time{margin-right:3px}.fc-direction-rtl .fc-daygrid-event .fc-event-time{margin-left:3px}';
Un(Yf);
var Qf = ee({
  name: "@fullcalendar/daygrid",
  initialView: "dayGridMonth",
  views: {
    dayGrid: {
      component: Wf,
      dateProfileGeneratorClass: Gf
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
dr.touchMouseIgnoreWait = 500;
let kn = 0, Ht = 0, Mn = !1;
class Hl {
  constructor(e) {
    this.subjectEl = null, this.selector = "", this.handleSelector = "", this.shouldIgnoreMove = !1, this.shouldWatchScroll = !0, this.isDragging = !1, this.isTouchDragging = !1, this.wasTouchScroll = !1, this.handleMouseDown = (n) => {
      if (!this.shouldIgnoreMouse() && Zf(n) && this.tryStart(n)) {
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
        r.removeEventListener("touchmove", this.handleTouchMove), r.removeEventListener("touchend", this.handleTouchEnd), r.removeEventListener("touchcancel", this.handleTouchEnd), window.removeEventListener("scroll", this.handleTouchScroll, !0), this.emitter.trigger("pointerup", this.createEventFromTouch(n)), this.cleanup(), this.isTouchDragging = !1, Xf();
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
    }, this.containerEl = e, this.emitter = new Gt(), e.addEventListener("mousedown", this.handleMouseDown), e.addEventListener("touchstart", this.handleTouchStart, { passive: !0 }), Kf();
  }
  destroy() {
    this.containerEl.removeEventListener("mousedown", this.handleMouseDown), this.containerEl.removeEventListener("touchstart", this.handleTouchStart, { passive: !0 }), Jf();
  }
  tryStart(e) {
    let n = this.querySubjectEl(e), r = e.target;
    return n && (!this.handleSelector || $(r, this.handleSelector)) ? (this.subjectEl = n, this.isDragging = !0, this.wasTouchScroll = !1, !0) : !1;
  }
  cleanup() {
    Mn = !1, this.isDragging = !1, this.subjectEl = null, this.destroyScrollWatch();
  }
  querySubjectEl(e) {
    return this.selector ? $(e.target, this.selector) : this.containerEl;
  }
  shouldIgnoreMouse() {
    return kn || this.isTouchDragging;
  }
  // can be called by user of this class, to cancel touch-based scrolling for the current drag
  cancelTouchScroll() {
    this.isDragging && (Mn = !0);
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
    let r = e.touches, i, s, l = 0, o = 0;
    return r && r.length ? (i = r[0].pageX, s = r[0].pageY) : (i = e.pageX, s = e.pageY), n ? (this.origPageX = i, this.origPageY = s) : (l = i - this.origPageX, o = s - this.origPageY), {
      origEvent: e,
      isTouch: !0,
      subjectEl: this.subjectEl,
      pageX: i,
      pageY: s,
      deltaX: l,
      deltaY: o
    };
  }
}
function Zf(t) {
  return t.button === 0 && !t.ctrlKey;
}
function Xf() {
  kn += 1, setTimeout(() => {
    kn -= 1;
  }, dr.touchMouseIgnoreWait);
}
function Kf() {
  Ht += 1, Ht === 1 && window.addEventListener("touchmove", Bl, { passive: !1 });
}
function Jf() {
  Ht -= 1, Ht || window.removeEventListener("touchmove", Bl, { passive: !1 });
}
function Bl(t) {
  Mn && t.preventDefault();
}
class eh {
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
    r.style.transition = "top " + n + "ms,left " + n + "ms", qe(r, {
      left: i.left,
      top: i.top
    }), Ko(r, () => {
      r.style.transition = "", e();
    });
  }
  cleanup() {
    this.mirrorEl && (Fn(this.mirrorEl), this.mirrorEl = null), this.sourceEl = null;
  }
  updateElPosition() {
    this.sourceEl && this.isVisible && qe(this.getMirrorEl(), {
      left: this.sourceElRect.left + this.deltaX,
      top: this.sourceElRect.top + this.deltaY
    });
  }
  getMirrorEl() {
    let e = this.sourceElRect, n = this.mirrorEl;
    return n || (n = this.mirrorEl = this.sourceEl.cloneNode(!0), n.style.userSelect = "none", n.style.webkitUserSelect = "none", n.style.pointerEvents = "none", n.classList.add("fc-event-dragging"), qe(n, {
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
class $l extends ar {
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
class Ll extends $l {
  constructor(e, n) {
    super(new Ad(e), n);
  }
  getEventTarget() {
    return this.scrollController.el;
  }
  computeClientRect() {
    return Ed(this.scrollController.el);
  }
}
class th extends $l {
  constructor(e) {
    super(new wd(), e);
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
const Ti = typeof performance == "function" ? performance.now : Date.now;
class nh {
  constructor() {
    this.isEnabled = !0, this.scrollQuery = [window, ".fc-scroller"], this.edgeThreshold = 50, this.maxVelocity = 300, this.pointerScreenX = null, this.pointerScreenY = null, this.isAnimating = !1, this.scrollCaches = null, this.everMovedUp = !1, this.everMovedDown = !1, this.everMovedLeft = !1, this.everMovedRight = !1, this.animate = () => {
      if (this.isAnimating) {
        let e = this.computeBestEdge(this.pointerScreenX + window.scrollX, this.pointerScreenY + window.scrollY);
        if (e) {
          let n = Ti();
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
      let r = e - window.scrollX, i = n - window.scrollY, s = this.pointerScreenY === null ? 0 : i - this.pointerScreenY, l = this.pointerScreenX === null ? 0 : r - this.pointerScreenX;
      s < 0 ? this.everMovedUp = !0 : s > 0 && (this.everMovedDown = !0), l < 0 ? this.everMovedLeft = !0 : l > 0 && (this.everMovedRight = !0), this.pointerScreenX = r, this.pointerScreenY = i, this.isAnimating || (this.isAnimating = !0, this.requestAnimation(Ti()));
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
    let { scrollCache: r } = e, { edgeThreshold: i } = this, s = i - e.distance, l = (
      // the closer to the edge, the faster we scroll
      s * s / (i * i) * // quadratic
      this.maxVelocity * n
    ), o = 1;
    switch (e.name) {
      case "left":
        o = -1;
      // falls through
      case "right":
        r.setScrollLeft(r.getScrollLeft() + l * o);
        break;
      case "top":
        o = -1;
      // falls through
      case "bottom":
        r.setScrollTop(r.getScrollTop() + l * o);
        break;
    }
  }
  // left/top are relative to document topleft
  computeBestEdge(e, n) {
    let { edgeThreshold: r } = this, i = null, s = this.scrollCaches || [];
    for (let l of s) {
      let o = l.clientRect, a = e - o.left, d = o.right - e, c = n - o.top, f = o.bottom - n;
      a >= 0 && d >= 0 && c >= 0 && f >= 0 && (c <= r && this.everMovedUp && l.canScrollUp() && (!i || i.distance > c) && (i = { scrollCache: l, name: "top", distance: c }), f <= r && this.everMovedDown && l.canScrollDown() && (!i || i.distance > f) && (i = { scrollCache: l, name: "bottom", distance: f }), a <= r && this.everMovedLeft && l.canScrollLeft() && (!i || i.distance > a) && (i = { scrollCache: l, name: "left", distance: a }), d <= r && this.everMovedRight && l.canScrollRight() && (!i || i.distance > d) && (i = { scrollCache: l, name: "right", distance: d }));
    }
    return i;
  }
  buildCaches(e) {
    return this.queryScrollEls(e).map((n) => n === window ? new th(!1) : new Ll(n, !1));
  }
  queryScrollEls(e) {
    let n = [];
    for (let r of this.scrollQuery)
      typeof r == "object" ? n.push(r) : n.push(...Array.prototype.slice.call(e.getRootNode().querySelectorAll(r)));
    return n;
  }
}
class rt extends _d {
  constructor(e, n) {
    super(e), this.containerEl = e, this.delay = null, this.minDistance = 0, this.touchScrollAllowed = !0, this.mirrorNeedsRevert = !1, this.isInteracting = !1, this.isDragging = !1, this.isDelayEnded = !1, this.isDistanceSurpassed = !1, this.delayTimeoutId = null, this.onPointerDown = (i) => {
      this.isDragging || (this.isInteracting = !0, this.isDelayEnded = !1, this.isDistanceSurpassed = !1, Jo(document.body), ta(document.body), i.isTouch || i.origEvent.preventDefault(), this.emitter.trigger("pointerdown", i), this.isInteracting && // not destroyed via pointerdown handler
      !this.pointer.shouldIgnoreMove && (this.mirror.setIsVisible(!1), this.mirror.start(i.subjectEl, i.pageX, i.pageY), this.startDelay(i), this.minDistance || this.handleDistanceSurpassed(i)));
    }, this.onPointerMove = (i) => {
      if (this.isInteracting) {
        if (this.emitter.trigger("pointermove", i), !this.isDistanceSurpassed) {
          let s = this.minDistance, l, { deltaX: o, deltaY: a } = i;
          l = o * o + a * a, l >= s * s && this.handleDistanceSurpassed(i);
        }
        this.isDragging && (i.origEvent.type !== "scroll" && (this.mirror.handleMove(i.pageX, i.pageY), this.autoScroller.handleMove(i.pageX, i.pageY)), this.emitter.trigger("dragmove", i));
      }
    }, this.onPointerUp = (i) => {
      this.isInteracting && (this.isInteracting = !1, ea(document.body), na(document.body), this.emitter.trigger("pointerup", i), this.isDragging && (this.autoScroller.stop(), this.tryStopDrag(i)), this.delayTimeoutId && (clearTimeout(this.delayTimeoutId), this.delayTimeoutId = null));
    };
    let r = this.pointer = new Hl(e);
    r.emitter.on("pointerdown", this.onPointerDown), r.emitter.on("pointermove", this.onPointerMove), r.emitter.on("pointerup", this.onPointerUp), n && (r.selector = n), this.mirror = new eh(), this.autoScroller = new nh();
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
class rh {
  constructor(e) {
    this.el = e, this.origRect = or(e), this.scrollCaches = tl(e).map((n) => new Ll(n, !0));
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
      if (!ih(i.getEventTarget()) && !od(r, i.clientRect))
        return !1;
    return !0;
  }
}
function ih(t) {
  let e = t.tagName;
  return e === "HTML" || e === "BODY";
}
class qt {
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
    }, this.droppableStore = n, e.emitter.on("pointerdown", this.handlePointerDown), e.emitter.on("dragstart", this.handleDragStart), e.emitter.on("dragmove", this.handleDragMove), e.emitter.on("pointerup", this.handlePointerUp), e.emitter.on("dragend", this.handleDragEnd), this.dragging = e, this.emitter = new Gt();
  }
  // sets initialHit
  // sets coordAdjust
  processFirstCoord(e) {
    let n = { left: e.pageX, top: e.pageY }, r = n, i = e.subjectEl, s;
    i instanceof HTMLElement && (s = or(i), r = ad(r, s));
    let l = this.initialHit = this.queryHitForOffset(r.left, r.top);
    if (l) {
      if (this.useSubjectCenter && s) {
        let o = Ks(s, l.rect);
        o && (r = cd(o));
      }
      this.coordAdjust = dd(r, n);
    } else
      this.coordAdjust = { left: 0, top: 0 };
  }
  handleMove(e, n) {
    let r = this.queryHitForOffset(e.pageX + this.coordAdjust.left, e.pageY + this.coordAdjust.top);
    (n || !Yt(this.movingHit, r)) && (this.movingHit = r, this.emitter.trigger("hitupdate", r, !1, e));
  }
  prepareHits() {
    this.offsetTrackers = X(this.droppableStore, (e) => (e.component.prepareHits(), new rh(e.el)));
  }
  releaseHits() {
    let { offsetTrackers: e } = this;
    for (let n in e)
      e[n].destroy();
    this.offsetTrackers = {};
  }
  queryHitForOffset(e, n) {
    let { droppableStore: r, offsetTrackers: i } = this, s = null;
    for (let l in r) {
      let o = r[l].component, a = i[l];
      if (a && // wasn't destroyed mid-drag
      a.isWithinClipping(e, n)) {
        let d = a.computeLeft(), c = a.computeTop(), f = e - d, h = n - c, { origRect: u } = a, p = u.right - u.left, v = u.bottom - u.top;
        if (
          // must be within the element's bounds
          f >= 0 && f < p && h >= 0 && h < v
        ) {
          let b = o.queryHit(f, h, p, v);
          b && // make sure the hit is within activeRange, meaning it's not a dead cell
          Wt(b.dateProfile.activeRange, b.dateSpan.range) && // Ensure the component we are querying for the hit is accessibly my the pointer
          // Prevents obscured calendars (ex: under a modal dialog) from accepting hit
          // https://github.com/fullcalendar/fullcalendar/issues/5026
          (this.disablePointCheck || a.el.contains(a.el.getRootNode().elementFromPoint(
            // add-back origins to get coordinate relative to top-left of window viewport
            f + d - window.scrollX,
            h + c - window.scrollY
          ))) && (!s || b.layer > s.layer) && (b.componentId = l, b.context = o.context, b.rect.left += d, b.rect.right += d, b.rect.top += c, b.rect.bottom += c, s = b);
        }
      }
    }
    return s;
  }
}
function Yt(t, e) {
  return !t && !e ? !0 : !!t != !!e ? !1 : Zc(t.dateSpan, e.dateSpan);
}
function Ul(t, e) {
  let n = {};
  for (let r of e.pluginHooks.datePointTransforms)
    Object.assign(n, r(t, e));
  return Object.assign(n, sh(t, e.dateEnv)), n;
}
function sh(t, e) {
  return {
    date: e.toDate(t.range.start),
    dateStr: e.formatIso(t.range.start, { omitTime: t.allDay }),
    allDay: t.allDay
  };
}
class lh extends ze {
  constructor(e) {
    super(e), this.handlePointerDown = (r) => {
      let { dragging: i } = this, s = r.origEvent.target;
      i.setIgnoreMove(!this.component.isValidDateDownEl(s));
    }, this.handleDragEnd = (r) => {
      let { component: i } = this, { pointer: s } = this.dragging;
      if (!s.wasTouchScroll) {
        let { initialHit: l, finalHit: o } = this.hitDragging;
        if (l && o && Yt(l, o)) {
          let { context: a } = i, d = Object.assign(Object.assign({}, Ul(l.dateSpan, a)), { dayEl: l.dayEl, jsEvent: r.origEvent, view: a.viewApi || a.calendarApi.view });
          a.emitter.trigger("dateClick", d);
        }
      }
    }, this.dragging = new rt(e.el), this.dragging.autoScroller.isEnabled = !1;
    let n = this.hitDragging = new qt(this.dragging, sr(e));
    n.emitter.on("pointerdown", this.handlePointerDown), n.emitter.on("dragend", this.handleDragEnd);
  }
  destroy() {
    this.dragging.destroy();
  }
}
class oh extends ze {
  constructor(e) {
    super(e), this.dragSelection = null, this.handlePointerDown = (l) => {
      let { component: o, dragging: a } = this, { options: d } = o.context, c = d.selectable && o.isValidDateDownEl(l.origEvent.target);
      a.setIgnoreMove(!c), a.delay = l.isTouch ? ah(o) : null;
    }, this.handleDragStart = (l) => {
      this.component.context.calendarApi.unselect(l);
    }, this.handleHitUpdate = (l, o) => {
      let { context: a } = this.component, d = null, c = !1;
      if (l) {
        let f = this.hitDragging.initialHit;
        l.componentId === f.componentId && this.isHitComboAllowed && !this.isHitComboAllowed(f, l) || (d = ch(f, l, a.pluginHooks.dateSelectionTransformers)), (!d || !Id(d, l.dateProfile, a)) && (c = !0, d = null);
      }
      d ? a.dispatch({ type: "SELECT_DATES", selection: d }) : o || a.dispatch({ type: "UNSELECT_DATES" }), c ? jn() : Wn(), o || (this.dragSelection = d);
    }, this.handlePointerUp = (l) => {
      this.dragSelection && (Fs(this.dragSelection, l, this.component.context), this.dragSelection = null);
    };
    let { component: n } = e, { options: r } = n.context, i = this.dragging = new rt(e.el);
    i.touchScrollAllowed = !1, i.minDistance = r.selectMinDistance || 0, i.autoScroller.isEnabled = r.dragScroll;
    let s = this.hitDragging = new qt(this.dragging, sr(e));
    s.emitter.on("pointerdown", this.handlePointerDown), s.emitter.on("dragstart", this.handleDragStart), s.emitter.on("hitupdate", this.handleHitUpdate), s.emitter.on("pointerup", this.handlePointerUp);
  }
  destroy() {
    this.dragging.destroy();
  }
}
function ah(t) {
  let { options: e } = t.context, n = e.selectLongPressDelay;
  return n == null && (n = e.longPressDelay), n;
}
function ch(t, e, n) {
  let r = t.dateSpan, i = e.dateSpan, s = [
    r.range.start,
    r.range.end,
    i.range.start,
    i.range.end
  ];
  s.sort(oa);
  let l = {};
  for (let o of n) {
    let a = o(t, e);
    if (a === !1)
      return null;
    a && Object.assign(l, a);
  }
  return l.range = { start: s[0], end: s[3] }, l.allDay = r.allDay, l;
}
class it extends ze {
  constructor(e) {
    super(e), this.subjectEl = null, this.subjectSeg = null, this.isDragging = !1, this.eventRange = null, this.relevantEvents = null, this.receivingContext = null, this.validMutation = null, this.mutatedRelevantEvents = null, this.handlePointerDown = (l) => {
      let o = l.origEvent.target, { component: a, dragging: d } = this, { mirror: c } = d, { options: f } = a.context, h = a.context;
      this.subjectEl = l.subjectEl;
      let u = this.subjectSeg = Be(l.subjectEl), v = (this.eventRange = u.eventRange).instance.instanceId;
      this.relevantEvents = tr(h.getCurrentData().eventStore, v), d.minDistance = l.isTouch ? 0 : f.eventDragMinDistance, d.delay = // only do a touch delay if touch and this event hasn't been selected yet
      l.isTouch && v !== a.props.eventSelection ? uh(a) : null, f.fixedMirrorParent ? c.parentNode = f.fixedMirrorParent : c.parentNode = $(o, ".fc"), c.revertDuration = f.dragRevertDuration;
      let b = a.isValidSegDownEl(o) && !$(o, ".fc-event-resizer");
      d.setIgnoreMove(!b), this.isDragging = b && l.subjectEl.classList.contains("fc-event-draggable");
    }, this.handleDragStart = (l) => {
      let o = this.component.context, a = this.eventRange, d = a.instance.instanceId;
      l.isTouch ? d !== this.component.props.eventSelection && o.dispatch({ type: "SELECT_EVENT", eventInstanceId: d }) : o.dispatch({ type: "UNSELECT_EVENT" }), this.isDragging && (o.calendarApi.unselect(l), o.emitter.trigger("eventDragStart", {
        el: this.subjectEl,
        event: new I(o, a.def, a.instance),
        jsEvent: l.origEvent,
        view: o.viewApi
      }));
    }, this.handleHitUpdate = (l, o) => {
      if (!this.isDragging)
        return;
      let a = this.relevantEvents, d = this.hitDragging.initialHit, c = this.component.context, f = null, h = null, u = null, p = !1, v = {
        affectedEvents: a,
        mutatedEvents: F(),
        isEvent: !0
      };
      if (l) {
        f = l.context;
        let b = f.options;
        c === f || b.editable && b.droppable ? (h = dh(d, l, this.eventRange.instance.range.start, f.getCurrentData().pluginHooks.eventDragMutationMassagers), h && (u = ir(a, f.getCurrentData().eventUiBases, h, f), v.mutatedEvents = u, cl(v, l.dateProfile, f) || (p = !0, h = null, u = null, v.mutatedEvents = F()))) : f = null;
      }
      this.displayDrag(f, v), p ? jn() : Wn(), o || (c === f && // TODO: write test for this
      Yt(d, l) && (h = null), this.dragging.setMirrorNeedsRevert(!h), this.dragging.setMirrorIsVisible(!l || !this.subjectEl.getRootNode().querySelector(".fc-event-mirror")), this.receivingContext = f, this.validMutation = h, this.mutatedRelevantEvents = u);
    }, this.handlePointerUp = () => {
      this.isDragging || this.cleanup();
    }, this.handleDragEnd = (l) => {
      if (this.isDragging) {
        let o = this.component.context, a = o.viewApi, { receivingContext: d, validMutation: c } = this, f = this.eventRange.def, h = this.eventRange.instance, u = new I(o, f, h), p = this.relevantEvents, v = this.mutatedRelevantEvents, { finalHit: b } = this.hitDragging;
        if (this.clearDrag(), o.emitter.trigger("eventDragStop", {
          el: this.subjectEl,
          event: u,
          jsEvent: l.origEvent,
          view: a
        }), c) {
          if (d === o) {
            let y = new I(o, v.defs[f.defId], h ? v.instances[h.instanceId] : null);
            o.dispatch({
              type: "MERGE_EVENTS",
              eventStore: v
            });
            let E = {
              oldEvent: u,
              event: y,
              relatedEvents: pe(v, o, h),
              revert() {
                o.dispatch({
                  type: "MERGE_EVENTS",
                  eventStore: p
                  // the pre-change data
                });
              }
            }, w = {};
            for (let C of o.getCurrentData().pluginHooks.eventDropTransformers)
              Object.assign(w, C(c, o));
            o.emitter.trigger("eventDrop", Object.assign(Object.assign(Object.assign({}, E), w), { el: l.subjectEl, delta: c.datesDelta, jsEvent: l.origEvent, view: a })), o.emitter.trigger("eventChange", E);
          } else if (d) {
            let y = {
              event: u,
              relatedEvents: pe(p, o, h),
              revert() {
                o.dispatch({
                  type: "MERGE_EVENTS",
                  eventStore: p
                });
              }
            };
            o.emitter.trigger("eventLeave", Object.assign(Object.assign({}, y), { draggedEl: l.subjectEl, view: a })), o.dispatch({
              type: "REMOVE_EVENTS",
              eventStore: p
            }), o.emitter.trigger("eventRemove", y);
            let E = v.defs[f.defId], w = v.instances[h.instanceId], C = new I(d, E, w);
            d.dispatch({
              type: "MERGE_EVENTS",
              eventStore: v
            });
            let O = {
              event: C,
              relatedEvents: pe(v, d, w),
              revert() {
                d.dispatch({
                  type: "REMOVE_EVENTS",
                  eventStore: v
                });
              }
            };
            d.emitter.trigger("eventAdd", O), l.isTouch && d.dispatch({
              type: "SELECT_EVENT",
              eventInstanceId: h.instanceId
            }), d.emitter.trigger("drop", Object.assign(Object.assign({}, Ul(b.dateSpan, d)), { draggedEl: l.subjectEl, jsEvent: l.origEvent, view: b.context.viewApi })), d.emitter.trigger("eventReceive", Object.assign(Object.assign({}, O), { draggedEl: l.subjectEl, view: b.context.viewApi }));
          }
        } else
          o.emitter.trigger("_noEventDrop");
      }
      this.cleanup();
    };
    let { component: n } = this, { options: r } = n.context, i = this.dragging = new rt(e.el);
    i.pointer.selector = it.SELECTOR, i.touchScrollAllowed = !1, i.autoScroller.isEnabled = r.dragScroll;
    let s = this.hitDragging = new qt(this.dragging, Dn);
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
        mutatedEvents: F(),
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
it.SELECTOR = ".fc-event-draggable, .fc-event-resizable";
function dh(t, e, n, r) {
  let i = t.dateSpan, s = e.dateSpan, l = i.range.start, o = s.range.start, a = {};
  i.allDay !== s.allDay && (a.allDay = s.allDay, a.hasEnd = e.context.options.allDayMaintainDuration, s.allDay ? l = k(n) : l = n);
  let d = Re(l, o, t.context.dateEnv, t.componentId === e.componentId ? t.largeUnit : null);
  d.milliseconds && (a.allDay = !1);
  let c = {
    datesDelta: d,
    standardProps: a
  };
  for (let f of r)
    f(c, t, e);
  return c;
}
function uh(t) {
  let { options: e } = t.context, n = e.eventLongPressDelay;
  return n == null && (n = e.longPressDelay), n;
}
class fh extends ze {
  constructor(e) {
    super(e), this.draggingSegEl = null, this.draggingSeg = null, this.eventRange = null, this.relevantEvents = null, this.validMutation = null, this.mutatedRelevantEvents = null, this.handlePointerDown = (s) => {
      let { component: l } = this, o = this.querySegEl(s), a = Be(o), d = this.eventRange = a.eventRange;
      this.dragging.minDistance = l.context.options.eventDragMinDistance, this.dragging.setIgnoreMove(!this.component.isValidSegDownEl(s.origEvent.target) || s.isTouch && this.component.props.eventSelection !== d.instance.instanceId);
    }, this.handleDragStart = (s) => {
      let { context: l } = this.component, o = this.eventRange;
      this.relevantEvents = tr(l.getCurrentData().eventStore, this.eventRange.instance.instanceId);
      let a = this.querySegEl(s);
      this.draggingSegEl = a, this.draggingSeg = Be(a), l.calendarApi.unselect(), l.emitter.trigger("eventResizeStart", {
        el: a,
        event: new I(l, o.def, o.instance),
        jsEvent: s.origEvent,
        view: l.viewApi
      });
    }, this.handleHitUpdate = (s, l, o) => {
      let { context: a } = this.component, d = this.relevantEvents, c = this.hitDragging.initialHit, f = this.eventRange.instance, h = null, u = null, p = !1, v = {
        affectedEvents: d,
        mutatedEvents: F(),
        isEvent: !0
      };
      s && (s.componentId === c.componentId && this.isHitComboAllowed && !this.isHitComboAllowed(c, s) || (h = hh(c, s, o.subjectEl.classList.contains("fc-event-resizer-start"), f.range))), h && (u = ir(d, a.getCurrentData().eventUiBases, h, a), v.mutatedEvents = u, cl(v, s.dateProfile, a) || (p = !0, h = null, u = null, v.mutatedEvents = null)), u ? a.dispatch({
        type: "SET_EVENT_RESIZE",
        state: v
      }) : a.dispatch({ type: "UNSET_EVENT_RESIZE" }), p ? jn() : Wn(), l || (h && Yt(c, s) && (h = null), this.validMutation = h, this.mutatedRelevantEvents = u);
    }, this.handleDragEnd = (s) => {
      let { context: l } = this.component, o = this.eventRange.def, a = this.eventRange.instance, d = new I(l, o, a), c = this.relevantEvents, f = this.mutatedRelevantEvents;
      if (l.emitter.trigger("eventResizeStop", {
        el: this.draggingSegEl,
        event: d,
        jsEvent: s.origEvent,
        view: l.viewApi
      }), this.validMutation) {
        let h = new I(l, f.defs[o.defId], a ? f.instances[a.instanceId] : null);
        l.dispatch({
          type: "MERGE_EVENTS",
          eventStore: f
        });
        let u = {
          oldEvent: d,
          event: h,
          relatedEvents: pe(f, l, a),
          revert() {
            l.dispatch({
              type: "MERGE_EVENTS",
              eventStore: c
              // the pre-change events
            });
          }
        };
        l.emitter.trigger("eventResize", Object.assign(Object.assign({}, u), { el: this.draggingSegEl, startDelta: this.validMutation.startDelta || D(0), endDelta: this.validMutation.endDelta || D(0), jsEvent: s.origEvent, view: l.viewApi })), l.emitter.trigger("eventChange", u);
      } else
        l.emitter.trigger("_noEventResize");
      this.draggingSeg = null, this.relevantEvents = null, this.validMutation = null;
    };
    let { component: n } = e, r = this.dragging = new rt(e.el);
    r.pointer.selector = ".fc-event-resizer", r.touchScrollAllowed = !1, r.autoScroller.isEnabled = n.context.options.dragScroll;
    let i = this.hitDragging = new qt(this.dragging, sr(e));
    i.emitter.on("pointerdown", this.handlePointerDown), i.emitter.on("dragstart", this.handleDragStart), i.emitter.on("hitupdate", this.handleHitUpdate), i.emitter.on("dragend", this.handleDragEnd);
  }
  destroy() {
    this.dragging.destroy();
  }
  querySegEl(e) {
    return $(e.subjectEl, ".fc-event");
  }
}
function hh(t, e, n, r) {
  let i = t.context.dateEnv, s = t.dateSpan.range.start, l = e.dateSpan.range.start, o = Re(s, l, i, t.largeUnit);
  if (n) {
    if (i.add(r.start, o) < r.end)
      return { startDelta: o };
  } else if (i.add(r.end, o) > r.start)
    return { endDelta: o };
  return null;
}
class gh {
  constructor(e) {
    this.context = e, this.isRecentPointerDateSelect = !1, this.matchesCancel = !1, this.matchesEvent = !1, this.onSelect = (r) => {
      r.jsEvent && (this.isRecentPointerDateSelect = !0);
    }, this.onDocumentPointerDown = (r) => {
      let i = this.context.options.unselectCancel, s = ys(r.origEvent);
      this.matchesCancel = !!$(s, i), this.matchesEvent = !!$(s, it.SELECTOR);
    }, this.onDocumentPointerUp = (r) => {
      let { context: i } = this, { documentPointer: s } = this, l = i.getCurrentData();
      if (!s.wasTouchScroll) {
        if (l.dateSelection && // an existing date selection?
        !this.isRecentPointerDateSelect) {
          let o = i.options.unselectAuto;
          o && (!o || !this.matchesCancel) && i.calendarApi.unselect(r);
        }
        l.eventSelection && // an existing event selected?
        !this.matchesEvent && i.dispatch({ type: "UNSELECT_EVENT" });
      }
      this.isRecentPointerDateSelect = !1;
    };
    let n = this.documentPointer = new Hl(document);
    n.shouldIgnoreMove = !0, n.shouldWatchScroll = !1, n.emitter.on("pointerdown", this.onDocumentPointerDown), n.emitter.on("pointerup", this.onDocumentPointerUp), e.emitter.on("select", this.onSelect);
  }
  destroy() {
    this.context.emitter.off("select", this.onSelect), this.documentPointer.destroy();
  }
}
const ph = {
  fixedMirrorParent: m
}, mh = {
  dateClick: m,
  eventDragStart: m,
  eventDragStop: m,
  eventDrop: m,
  eventResizeStart: m,
  eventResizeStop: m,
  eventResize: m,
  drop: m,
  eventReceive: m,
  eventLeave: m
};
dr.dataAttrPrefix = "";
var vh = ee({
  name: "@fullcalendar/interaction",
  componentInteractions: [lh, oh, it, fh],
  calendarInteractions: [gh],
  elementDraggingImpl: rt,
  optionRefiners: ph,
  listenerRefiners: mh
});
class bh extends ud {
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
    return e.allDay ? zc(e) ? ["timed", "allDay"] : ["allDay"] : ["timed"];
  }
}
const yh = N({
  hour: "numeric",
  minute: "2-digit",
  omitZeroMinute: !0,
  meridiem: "short"
});
function zl(t) {
  let e = [
    "fc-timegrid-slot",
    "fc-timegrid-slot-label",
    t.isLabeled ? "fc-scrollgrid-shrink" : "fc-timegrid-slot-minor"
  ];
  return g(J.Consumer, null, (n) => {
    if (!t.isLabeled)
      return g("td", { className: e.join(" "), "data-time": t.isoTimeStr });
    let { dateEnv: r, options: i, viewApi: s } = n, l = (
      // TODO: fully pre-parse
      i.slotLabelFormat == null ? yh : Array.isArray(i.slotLabelFormat) ? N(i.slotLabelFormat[0]) : N(i.slotLabelFormat)
    ), o = {
      level: 0,
      time: t.time,
      date: r.toDate(t.date),
      view: s,
      text: r.format(t.date, l)
    };
    return g(j, { elTag: "td", elClasses: e, elAttrs: {
      "data-time": t.isoTimeStr
    }, renderProps: o, generatorName: "slotLabelContent", customGenerator: i.slotLabelContent, defaultGenerator: Eh, classNameGenerator: i.slotLabelClassNames, didMount: i.slotLabelDidMount, willUnmount: i.slotLabelWillUnmount }, (a) => g(
      "div",
      { className: "fc-timegrid-slot-label-frame fc-scrollgrid-shrink-frame" },
      g(a, { elTag: "div", elClasses: [
        "fc-timegrid-slot-label-cushion",
        "fc-scrollgrid-shrink-cushion"
      ] })
    ));
  });
}
function Eh(t) {
  return t.text;
}
class Sh extends R {
  render() {
    return this.props.slatMetas.map((e) => g(
      "tr",
      { key: e.key },
      g(zl, Object.assign({}, e))
    ));
  }
}
const Ah = N({ week: "short" }), wh = 5;
class Ch extends Y {
  constructor() {
    super(...arguments), this.allDaySplitter = new bh(), this.headerElRef = L(), this.rootElRef = L(), this.scrollerElRef = L(), this.state = {
      slatCoords: null
    }, this.handleScrollTopRequest = (e) => {
      let n = this.scrollerElRef.current;
      n && (n.scrollTop = e);
    }, this.renderHeadAxis = (e, n = "") => {
      let { options: r } = this.context, { dateProfile: i } = this.props, s = i.renderRange, o = Ae(s.start, s.end) === 1 ? Ot(this.context, s.start, "week") : {};
      return r.weekNumbers && e === "day" ? g(ml, { elTag: "th", elClasses: [
        "fc-timegrid-axis",
        "fc-scrollgrid-shrink"
      ], elAttrs: {
        "aria-hidden": !0
      }, date: s.start, defaultFormat: Ah }, (a) => g(
        "div",
        { className: [
          "fc-timegrid-axis-frame",
          "fc-scrollgrid-shrink-frame",
          "fc-timegrid-axis-frame-liquid"
        ].join(" "), style: { height: n } },
        g(a, { elTag: "a", elClasses: [
          "fc-timegrid-axis-cushion",
          "fc-scrollgrid-shrink-cushion",
          "fc-scrollgrid-sync-inner"
        ], elAttrs: o })
      )) : g(
        "th",
        { "aria-hidden": !0, className: "fc-timegrid-axis" },
        g("div", { className: "fc-timegrid-axis-frame", style: { height: n } })
      );
    }, this.renderTableRowAxis = (e) => {
      let { options: n, viewApi: r } = this.context, i = {
        text: n.allDayText,
        view: r
      };
      return (
        // TODO: make reusable hook. used in list view too
        g(j, { elTag: "td", elClasses: [
          "fc-timegrid-axis",
          "fc-scrollgrid-shrink"
        ], elAttrs: {
          "aria-hidden": !0
        }, renderProps: i, generatorName: "allDayContent", customGenerator: n.allDayContent, defaultGenerator: Dh, classNameGenerator: n.allDayClassNames, didMount: n.allDayDidMount, willUnmount: n.allDayWillUnmount }, (s) => g(
          "div",
          { className: [
            "fc-timegrid-axis-frame",
            "fc-scrollgrid-shrink-frame",
            e == null ? " fc-timegrid-axis-frame-liquid" : ""
          ].join(" "), style: { height: e } },
          g(s, { elTag: "span", elClasses: [
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
    let { context: i, props: s } = this, l = [], o = Pt(i.options);
    return e && l.push({
      type: "header",
      key: "header",
      isSticky: o,
      chunk: {
        elRef: this.headerElRef,
        tableClassName: "fc-col-header",
        rowContent: e
      }
    }), n && (l.push({
      type: "body",
      key: "all-day",
      chunk: { content: n }
    }), l.push({
      type: "body",
      key: "all-day-divider",
      outerContent: (
        // TODO: rename to cellContent so don't need to define <tr>?
        g(
          "tr",
          { role: "presentation", className: "fc-scrollgrid-section" },
          g("td", { className: "fc-timegrid-divider " + i.theme.getClass("tableCellShaded") })
        )
      )
    })), l.push({
      type: "body",
      key: "body",
      liquid: !0,
      expandRows: !!i.options.expandRows,
      chunk: {
        scrollerElRef: this.scrollerElRef,
        content: r
      }
    }), g(
      kt,
      { elRef: this.rootElRef, elClasses: ["fc-timegrid"], viewSpec: i.viewSpec },
      g(ur, { liquid: !s.isHeightAuto && !s.forPrint, collapsibleWidth: s.forPrint, cols: [{ width: "shrink" }], sections: l })
    );
  }
  renderHScrollLayout(e, n, r, i, s, l, o) {
    let a = this.context.pluginHooks.scrollGridImpl;
    if (!a)
      throw new Error("No ScrollGrid implementation");
    let { context: d, props: c } = this, f = !c.forPrint && Pt(d.options), h = !c.forPrint && hl(d.options), u = [];
    e && u.push({
      type: "header",
      key: "header",
      isSticky: f,
      syncRowHeights: !0,
      chunks: [
        {
          key: "axis",
          rowContent: (v) => g("tr", { role: "presentation" }, this.renderHeadAxis("day", v.rowSyncHeights[0]))
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
          rowContent: (v) => g("tr", { role: "presentation" }, this.renderTableRowAxis(v.rowSyncHeights[0]))
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
        g(
          "tr",
          { role: "presentation", className: "fc-scrollgrid-section" },
          g("td", { colSpan: 2, className: "fc-timegrid-divider " + d.theme.getClass("tableCellShaded") })
        )
      )
    }));
    let p = d.options.nowIndicator;
    return u.push({
      type: "body",
      key: "body",
      liquid: !0,
      expandRows: !!d.options.expandRows,
      chunks: [
        {
          key: "axis",
          content: (v) => (
            // TODO: make this now-indicator arrow more DRY with TimeColsContent
            g(
              "div",
              { className: "fc-timegrid-axis-chunk" },
              g(
                "table",
                { "aria-hidden": !0, style: { height: v.expandRows ? v.clientHeight : "" } },
                v.tableColGroupNode,
                g(
                  "tbody",
                  null,
                  g(Sh, { slatMetas: l })
                )
              ),
              g(
                "div",
                { className: "fc-timegrid-now-indicator-container" },
                g(Fe, {
                  unit: p ? "minute" : "day"
                  /* hacky */
                }, (b) => {
                  let y = p && o && o.safeComputeTop(b);
                  return typeof y == "number" ? g(gr, { elClasses: ["fc-timegrid-now-indicator-arrow"], elStyle: { top: y }, isAxis: !0, date: b }) : null;
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
    }), h && u.push({
      key: "footer",
      type: "footer",
      isSticky: !0,
      chunks: [
        {
          key: "axis",
          content: Tn
        },
        {
          key: "cols",
          content: Tn
        }
      ]
    }), g(
      kt,
      { elRef: this.rootElRef, elClasses: ["fc-timegrid"], viewSpec: d.viewSpec },
      g(a, { liquid: !c.isHeightAuto && !c.forPrint, forPrint: c.forPrint, collapsibleWidth: !1, colGroups: [
        { width: "shrink", cols: [{ width: "shrink" }] },
        { cols: [{ span: i, minWidth: s }] }
      ], sections: u })
    );
  }
  /* Dimensions
  ------------------------------------------------------------------------------------------------------------------*/
  getAllDayMaxEventProps() {
    let { dayMaxEvents: e, dayMaxEventRows: n } = this.context.options;
    return (e === !0 || n === !0) && (e = void 0, n = wh), { dayMaxEvents: e, dayMaxEventRows: n };
  }
}
function Dh(t) {
  return t.text;
}
class _h {
  constructor(e, n, r) {
    this.positions = e, this.dateProfile = n, this.slotDuration = r;
  }
  safeComputeTop(e) {
    let { dateProfile: n } = this;
    if (Z(n.currentRange, e)) {
      let r = k(e), i = e.valueOf() - r.valueOf();
      if (i >= W(n.slotMinTime) && i < W(n.slotMaxTime))
        return this.computeTimeTop(D(i));
    }
    return null;
  }
  // Computes the top coordinate, relative to the bounds of the grid, of the given date.
  // A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
  computeDateTop(e, n) {
    return n || (n = k(e)), this.computeTimeTop(D(e.valueOf() - n.valueOf()));
  }
  // Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
  // This is a makeshify way to compute the time-top. Assumes all slatMetas dates are uniform.
  // Eventually allow computation with arbirary slat dates.
  computeTimeTop(e) {
    let { positions: n, dateProfile: r } = this, i = n.els.length, s = (e.milliseconds - W(r.slotMinTime)) / W(this.slotDuration), l, o;
    return s = Math.max(0, s), s = Math.min(i, s), l = Math.floor(s), l = Math.min(l, i - 1), o = s - l, n.tops[l] + n.getHeight(l) * o;
  }
}
class Rh extends R {
  render() {
    let { props: e, context: n } = this, { options: r } = n, { slatElRefs: i } = e;
    return g("tbody", null, e.slatMetas.map((s, l) => {
      let o = {
        time: s.time,
        date: n.dateEnv.toDate(s.date),
        view: n.viewApi
      };
      return g(
        "tr",
        { key: s.key, ref: i.createRef(s.key) },
        e.axis && g(zl, Object.assign({}, s)),
        g(j, { elTag: "td", elClasses: [
          "fc-timegrid-slot",
          "fc-timegrid-slot-lane",
          !s.isLabeled && "fc-timegrid-slot-minor"
        ], elAttrs: {
          "data-time": s.isoTimeStr
        }, renderProps: o, generatorName: "slotLaneContent", customGenerator: r.slotLaneContent, classNameGenerator: r.slotLaneClassNames, didMount: r.slotLaneDidMount, willUnmount: r.slotLaneWillUnmount })
      );
    }));
  }
}
class Th extends R {
  constructor() {
    super(...arguments), this.rootElRef = L(), this.slatElRefs = new Q();
  }
  render() {
    let { props: e, context: n } = this;
    return g(
      "div",
      { ref: this.rootElRef, className: "fc-timegrid-slots" },
      g(
        "table",
        { "aria-hidden": !0, className: n.theme.getClass("table"), style: {
          minWidth: e.tableMinWidth,
          width: e.clientWidth,
          height: e.minHeight
        } },
        e.tableColGroupNode,
        g(Rh, { slatElRefs: this.slatElRefs, axis: e.axis, slatMetas: e.slatMetas })
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
    n.onCoords && n.clientWidth !== null && this.rootElRef.current.offsetHeight && n.onCoords(new _h(new $e(this.rootElRef.current, xh(this.slatElRefs.currentMap, n.slatMetas), !1, !0), this.props.dateProfile, e.options.slotDuration));
  }
}
function xh(t, e) {
  return e.map((n) => t[n.key]);
}
function Ve(t, e) {
  let n = [], r;
  for (r = 0; r < e; r += 1)
    n.push([]);
  if (t)
    for (r = 0; r < t.length; r += 1)
      n[t[r].col].push(t[r]);
  return n;
}
function xi(t, e) {
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
class kh extends R {
  render() {
    let { props: e } = this;
    return g(vl, { elClasses: ["fc-timegrid-more-link"], elStyle: {
      top: e.top,
      bottom: e.bottom
    }, allDayDate: null, moreCnt: e.hiddenSegs.length, allSegs: e.hiddenSegs, hiddenSegs: e.hiddenSegs, extraDateSpan: e.extraDateSpan, dateProfile: e.dateProfile, todayRange: e.todayRange, popoverContent: () => jl(e.hiddenSegs, e), defaultGenerator: Mh, forceTimed: !0 }, (n) => g(n, { elTag: "div", elClasses: ["fc-timegrid-more-link-inner", "fc-sticky"] }));
  }
}
function Mh(t) {
  return t.shortText;
}
function Ih(t, e, n) {
  let r = new nl();
  e != null && (r.strictOrder = e), n != null && (r.maxStackCnt = n);
  let i = r.addSegs(t), s = Cd(i), l = Nh(r);
  return l = Bh(l, 1), { segRects: $h(l), hiddenGroups: s };
}
function Nh(t) {
  const { entriesByLevel: e } = t, n = br((r, i) => r + ":" + i, (r, i) => {
    let s = Hh(t, r, i), l = ki(s, n), o = e[r][i];
    return [
      Object.assign(Object.assign({}, o), { nextLevelNodes: l[0] }),
      o.thickness + l[1]
      // the pressure builds
    ];
  });
  return ki(e.length ? { level: 0, lateralStart: 0, lateralEnd: e[0].length } : null, n)[0];
}
function ki(t, e) {
  if (!t)
    return [[], 0];
  let { level: n, lateralStart: r, lateralEnd: i } = t, s = r, l = [];
  for (; s < i; )
    l.push(e(n, s)), s += 1;
  return l.sort(Oh), [
    l.map(Ph),
    l[0][1]
    // first item's pressure
  ];
}
function Oh(t, e) {
  return e[1] - t[1];
}
function Ph(t) {
  return t[0];
}
function Hh(t, e, n) {
  let { levelCoords: r, entriesByLevel: i } = t, s = i[e][n], l = r[e] + s.thickness, o = r.length, a = e;
  for (; a < o && r[a] < l; a += 1)
    ;
  for (; a < o; a += 1) {
    let d = i[a], c, f = Rn(d, s.span.start, _n), h = f[0] + f[1], u = h;
    for (
      ;
      // loop through entries that horizontally intersect
      (c = d[u]) && // but not past the whole seg list
      c.span.start < s.span.end;
    )
      u += 1;
    if (h < u)
      return { level: a, lateralStart: h, lateralEnd: u };
  }
  return null;
}
function Bh(t, e) {
  const n = br((r, i, s) => me(r), (r, i, s) => {
    let { nextLevelNodes: l, thickness: o } = r, a = o + s, d = o / a, c, f = [];
    if (!l.length)
      c = e;
    else
      for (let u of l)
        if (c === void 0) {
          let p = n(u, i, a);
          c = p[0], f.push(p[1]);
        } else {
          let p = n(u, c, 0);
          f.push(p[1]);
        }
    let h = (c - i) * d;
    return [c - h, Object.assign(Object.assign({}, r), { thickness: h, nextLevelNodes: f })];
  });
  return t.map((r) => n(r, 0, 0)[1]);
}
function $h(t) {
  let e = [];
  const n = br((i, s, l) => me(i), (i, s, l) => {
    let o = Object.assign(Object.assign({}, i), {
      levelCoord: s,
      stackDepth: l,
      stackForward: 0
    });
    return e.push(o), o.stackForward = r(i.nextLevelNodes, s + i.thickness, l + 1) + 1;
  });
  function r(i, s, l) {
    let o = 0;
    for (let a of i)
      o = Math.max(n(a, s, l), o);
    return o;
  }
  return r(t, 0, 0), e;
}
function br(t, e) {
  const n = {};
  return (...r) => {
    let i = t(...r);
    return i in n ? n[i] : n[i] = e(...r);
  };
}
function Mi(t, e, n = null, r = 0) {
  let i = [];
  if (n)
    for (let s = 0; s < t.length; s += 1) {
      let l = t[s], o = n.computeDateTop(l.start, e), a = Math.max(
        o + (r || 0),
        // :(
        n.computeDateTop(l.end, e)
      );
      i.push({
        start: Math.round(o),
        end: Math.round(a)
        //
      });
    }
  return i;
}
function Lh(t, e, n, r) {
  let i = [], s = [];
  for (let d = 0; d < t.length; d += 1) {
    let c = e[d];
    c ? i.push({
      index: d,
      thickness: 1,
      span: c
    }) : s.push(t[d]);
  }
  let { segRects: l, hiddenGroups: o } = Ih(i, n, r), a = [];
  for (let d of l)
    a.push({
      seg: t[d.index],
      rect: d
    });
  for (let d of s)
    a.push({ seg: d, rect: null });
  return { segPlacements: a, hiddenGroups: o };
}
const Uh = N({
  hour: "numeric",
  minute: "2-digit",
  meridiem: !1
});
class Fl extends R {
  render() {
    return g(hr, Object.assign({}, this.props, { elClasses: [
      "fc-timegrid-event",
      "fc-v-event",
      this.props.isShort && "fc-timegrid-event-short"
    ], defaultTimeFormat: Uh }));
  }
}
class zh extends R {
  constructor() {
    super(...arguments), this.sortEventSegs = A(Vs);
  }
  // TODO: memoize event-placement?
  render() {
    let { props: e, context: n } = this, { options: r } = n, i = r.selectMirror, s = (
      // yuck
      e.eventDrag && e.eventDrag.segs || e.eventResize && e.eventResize.segs || i && e.dateSelectionSegs || []
    ), l = (
      // TODO: messy way to compute this
      e.eventDrag && e.eventDrag.affectedInstances || e.eventResize && e.eventResize.affectedInstances || {}
    ), o = this.sortEventSegs(e.fgEventSegs, r.eventOrder);
    return g(pr, { elTag: "td", elRef: e.elRef, elClasses: [
      "fc-timegrid-col",
      ...e.extraClassNames || []
    ], elAttrs: Object.assign({ role: "gridcell" }, e.extraDataAttrs), date: e.date, dateProfile: e.dateProfile, todayRange: e.todayRange, extraRenderProps: e.extraRenderProps }, (a) => g(
      "div",
      { className: "fc-timegrid-col-frame" },
      g(
        "div",
        { className: "fc-timegrid-col-bg" },
        this.renderFillSegs(e.businessHourSegs, "non-business"),
        this.renderFillSegs(e.bgEventSegs, "bg-event"),
        this.renderFillSegs(e.dateSelectionSegs, "highlight")
      ),
      g("div", { className: "fc-timegrid-col-events" }, this.renderFgSegs(o, l, !1, !1, !1)),
      g("div", { className: "fc-timegrid-col-events" }, this.renderFgSegs(s, {}, !!e.eventDrag, !!e.eventResize, !!i, "mirror")),
      g("div", { className: "fc-timegrid-now-indicator-container" }, this.renderNowIndicator(e.nowIndicatorSegs)),
      mr(r) && g(a, { elTag: "div", elClasses: ["fc-timegrid-col-misc"] })
    ));
  }
  renderFgSegs(e, n, r, i, s, l) {
    let { props: o } = this;
    return o.forPrint ? jl(e, o) : this.renderPositionedFgSegs(e, n, r, i, s, l);
  }
  renderPositionedFgSegs(e, n, r, i, s, l) {
    let { eventMaxStack: o, eventShortHeight: a, eventOrderStrict: d, eventMinHeight: c } = this.context.options, { date: f, slatCoords: h, eventSelection: u, todayRange: p, nowDate: v } = this.props, b = r || i || s, y = Mi(e, f, h, c), { segPlacements: E, hiddenGroups: w } = Lh(e, y, d, o);
    return g(
      x,
      null,
      this.renderHiddenGroups(w, e),
      E.map((C) => {
        let { seg: O, rect: T } = C, M = O.eventRange.instance.instanceId, _ = b || !!(!n[M] && T), te = pn(T && T.span), je = !b && T ? this.computeSegHStyle(T) : { left: 0, right: 0 }, ql = !!T && T.stackForward > 0, Yl = !!T && T.span.end - T.span.start < a;
        return g(
          "div",
          { className: "fc-timegrid-event-harness" + (ql ? " fc-timegrid-event-harness-inset" : ""), key: l || M, style: Object.assign(Object.assign({ visibility: _ ? "" : "hidden" }, te), je) },
          g(Fl, Object.assign({ seg: O, isDragging: r, isResizing: i, isDateSelecting: s, isSelected: M === u, isShort: Yl }, le(O, p, v)))
        );
      })
    );
  }
  // will already have eventMinHeight applied because segInputs already had it
  renderHiddenGroups(e, n) {
    let { extraDateSpan: r, dateProfile: i, todayRange: s, nowDate: l, eventSelection: o, eventDrag: a, eventResize: d } = this.props;
    return g(x, null, e.map((c) => {
      let f = pn(c.span), h = Fh(c.entries, n);
      return g(kh, { key: Cs(bl(h)), hiddenSegs: h, top: f.top, bottom: f.bottom, extraDateSpan: r, dateProfile: i, todayRange: s, nowDate: l, eventSelection: o, eventDrag: a, eventResize: d });
    }));
  }
  renderFillSegs(e, n) {
    let { props: r, context: i } = this, l = Mi(e, r.date, r.slatCoords, i.options.eventMinHeight).map((o, a) => {
      let d = e[a];
      return g("div", { key: qs(d.eventRange), className: "fc-timegrid-bg-harness", style: pn(o) }, n === "bg-event" ? g(gl, Object.assign({ seg: d }, le(d, r.todayRange, r.nowDate))) : pl(n));
    });
    return g(x, null, l);
  }
  renderNowIndicator(e) {
    let { slatCoords: n, date: r } = this.props;
    return n ? e.map((i, s) => g(
      gr,
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
    let { isRtl: n, options: r } = this.context, i = r.slotEventOverlap, s = e.levelCoord, l = e.levelCoord + e.thickness, o, a;
    i && (l = Math.min(1, s + (l - s) * 2)), n ? (o = 1 - l, a = s) : (o = s, a = 1 - l);
    let d = {
      zIndex: e.stackDepth + 1,
      left: o * 100 + "%",
      right: a * 100 + "%"
    };
    return i && !e.stackForward && (d[n ? "marginLeft" : "marginRight"] = 20), d;
  }
}
function jl(t, { todayRange: e, nowDate: n, eventSelection: r, eventDrag: i, eventResize: s }) {
  let l = (i ? i.affectedInstances : null) || (s ? s.affectedInstances : null) || {};
  return g(x, null, t.map((o) => {
    let a = o.eventRange.instance.instanceId;
    return g(
      "div",
      { key: a, style: { visibility: l[a] ? "hidden" : "" } },
      g(Fl, Object.assign({ seg: o, isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: a === r, isShort: !1 }, le(o, e, n)))
    );
  }));
}
function pn(t) {
  return t ? {
    top: t.start,
    bottom: -t.end
  } : { top: "", bottom: "" };
}
function Fh(t, e) {
  return t.map((n) => e[n.index]);
}
class jh extends R {
  constructor() {
    super(...arguments), this.splitFgEventSegs = A(Ve), this.splitBgEventSegs = A(Ve), this.splitBusinessHourSegs = A(Ve), this.splitNowIndicatorSegs = A(Ve), this.splitDateSelectionSegs = A(Ve), this.splitEventDrag = A(xi), this.splitEventResize = A(xi), this.rootElRef = L(), this.cellElRefs = new Q();
  }
  render() {
    let { props: e, context: n } = this, r = n.options.nowIndicator && e.slatCoords && e.slatCoords.safeComputeTop(e.nowDate), i = e.cells.length, s = this.splitFgEventSegs(e.fgEventSegs, i), l = this.splitBgEventSegs(e.bgEventSegs, i), o = this.splitBusinessHourSegs(e.businessHourSegs, i), a = this.splitNowIndicatorSegs(e.nowIndicatorSegs, i), d = this.splitDateSelectionSegs(e.dateSelectionSegs, i), c = this.splitEventDrag(e.eventDrag, i), f = this.splitEventResize(e.eventResize, i);
    return g(
      "div",
      { className: "fc-timegrid-cols", ref: this.rootElRef },
      g(
        "table",
        { role: "presentation", style: {
          minWidth: e.tableMinWidth,
          width: e.clientWidth
        } },
        e.tableColGroupNode,
        g(
          "tbody",
          { role: "presentation" },
          g(
            "tr",
            { role: "row" },
            e.axis && g(
              "td",
              { "aria-hidden": !0, className: "fc-timegrid-col fc-timegrid-axis" },
              g(
                "div",
                { className: "fc-timegrid-col-frame" },
                g("div", { className: "fc-timegrid-now-indicator-container" }, typeof r == "number" && g(gr, { elClasses: ["fc-timegrid-now-indicator-arrow"], elStyle: { top: r }, isAxis: !0, date: e.nowDate }))
              )
            ),
            e.cells.map((h, u) => g(zh, { key: h.key, elRef: this.cellElRefs.createRef(h.key), dateProfile: e.dateProfile, date: h.date, nowDate: e.nowDate, todayRange: e.todayRange, extraRenderProps: h.extraRenderProps, extraDataAttrs: h.extraDataAttrs, extraClassNames: h.extraClassNames, extraDateSpan: h.extraDateSpan, fgEventSegs: s[u], bgEventSegs: l[u], businessHourSegs: o[u], nowIndicatorSegs: a[u], dateSelectionSegs: d[u], eventDrag: c[u], eventResize: f[u], slatCoords: e.slatCoords, eventSelection: e.eventSelection, forPrint: e.forPrint }))
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
    e.onColCoords && e.clientWidth !== null && e.onColCoords(new $e(
      this.rootElRef.current,
      Wh(this.cellElRefs.currentMap, e.cells),
      !0,
      // horizontal
      !1
    ));
  }
}
function Wh(t, e) {
  return e.map((n) => t[n.key]);
}
class Vh extends Y {
  constructor() {
    super(...arguments), this.processSlotOptions = A(Gh), this.state = {
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
    return g(
      "div",
      { className: "fc-timegrid-body", ref: this.handleRootEl, style: {
        // these props are important to give this wrapper correct dimensions for interactions
        // TODO: if we set it here, can we avoid giving to inner tables?
        width: e.clientWidth,
        minWidth: e.tableMinWidth
      } },
      g(Th, { axis: e.axis, dateProfile: e.dateProfile, slatMetas: e.slatMetas, clientWidth: e.clientWidth, minHeight: e.expandRows ? e.clientHeight : "", tableMinWidth: e.tableMinWidth, tableColGroupNode: e.axis ? e.tableColGroupNode : null, onCoords: this.handleSlatCoords }),
      g(jh, { cells: e.cells, axis: e.axis, dateProfile: e.dateProfile, businessHourSegs: e.businessHourSegs, bgEventSegs: e.bgEventSegs, fgEventSegs: e.fgEventSegs, dateSelectionSegs: e.dateSelectionSegs, eventSelection: e.eventSelection, eventDrag: e.eventDrag, eventResize: e.eventResize, todayRange: e.todayRange, nowDate: e.nowDate, nowIndicatorSegs: e.nowIndicatorSegs, clientWidth: e.clientWidth, tableMinWidth: e.tableMinWidth, tableColGroupNode: e.tableColGroupNode, slatCoords: n.slatCoords, onColCoords: this.handleColCoords, forPrint: e.forPrint })
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
    let { dateEnv: r, options: i } = this.context, { colCoords: s } = this, { dateProfile: l } = this.props, { slatCoords: o } = this.state, { snapDuration: a, snapsPerSlot: d } = this.processSlotOptions(this.props.slotDuration, i.snapDuration), c = s.leftToIndex(e), f = o.positions.topToIndex(n);
    if (c != null && f != null) {
      let h = this.props.cells[c], u = o.positions.tops[f], p = o.positions.getHeight(f), v = (n - u) / p, b = Math.floor(v * d), y = f * d + b, E = this.props.cells[c].date, w = En(l.slotMinTime, ha(a, y)), C = r.add(E, w), O = r.add(C, a);
      return {
        dateProfile: l,
        dateSpan: Object.assign({ range: { start: C, end: O }, allDay: !1 }, h.extraDateSpan),
        dayEl: s.els[c],
        rect: {
          left: s.lefts[c],
          right: s.rights[c],
          top: u,
          bottom: u + p
        },
        layer: 0
      };
    }
    return null;
  }
}
function Gh(t, e) {
  let n = e || t, r = Vn(t, n);
  return r === null && (n = t, r = 1), { snapDuration: n, snapsPerSlot: r };
}
class qh extends al {
  sliceRange(e, n) {
    let r = [];
    for (let i = 0; i < n.length; i += 1) {
      let s = ye(e, n[i]);
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
class Yh extends Y {
  constructor() {
    super(...arguments), this.buildDayRanges = A(Qh), this.slicer = new qh(), this.timeColsRef = L();
  }
  render() {
    let { props: e, context: n } = this, { dateProfile: r, dayTableModel: i } = e, { nowIndicator: s, nextDayThreshold: l } = n.options, o = this.buildDayRanges(i, r, n.dateEnv);
    return g(Fe, { unit: s ? "minute" : "day" }, (a, d) => g(Vh, Object.assign({ ref: this.timeColsRef }, this.slicer.sliceProps(e, r, null, n, o), { forPrint: e.forPrint, axis: e.axis, dateProfile: r, slatMetas: e.slatMetas, slotDuration: e.slotDuration, cells: i.cells[0], tableColGroupNode: e.tableColGroupNode, tableMinWidth: e.tableMinWidth, clientWidth: e.clientWidth, clientHeight: e.clientHeight, expandRows: e.expandRows, nowDate: a, nowIndicatorSegs: s && this.slicer.sliceNowDate(a, r, l, n, o), todayRange: d, onScrollTopRequest: e.onScrollTopRequest, onSlatCoords: e.onSlatCoords })));
  }
}
function Qh(t, e, n) {
  let r = [];
  for (let i of t.headerDates)
    r.push({
      start: n.add(i, e.slotMinTime),
      end: n.add(i, e.slotMaxTime)
    });
  return r;
}
const Ii = [
  { hours: 1 },
  { minutes: 30 },
  { minutes: 15 },
  { seconds: 30 },
  { seconds: 15 }
];
function Zh(t, e, n, r, i) {
  let s = /* @__PURE__ */ new Date(0), l = t, o = D(0), a = n || Xh(r), d = [];
  for (; W(l) < W(e); ) {
    let c = i.add(s, l), f = Vn(o, a) !== null;
    d.push({
      date: c,
      time: l,
      key: c.toISOString(),
      isoTimeStr: xa(c),
      isLabeled: f
    }), l = En(l, r), o = En(o, r);
  }
  return d;
}
function Xh(t) {
  let e, n, r;
  for (e = Ii.length - 1; e >= 0; e -= 1)
    if (n = D(Ii[e]), r = Vn(n, t), r !== null && r > 1)
      return n;
  return t;
}
class Kh extends Ch {
  constructor() {
    super(...arguments), this.buildTimeColsModel = A(Jh), this.buildSlatMetas = A(Zh);
  }
  render() {
    let { options: e, dateEnv: n, dateProfileGenerator: r } = this.context, { props: i } = this, { dateProfile: s } = i, l = this.buildTimeColsModel(s, r), o = this.allDaySplitter.splitProps(i), a = this.buildSlatMetas(s.slotMinTime, s.slotMaxTime, e.slotLabelInterval, e.slotDuration, n), { dayMinWidth: d } = e, c = !d, f = d, h = e.dayHeaders && g(sl, { dates: l.headerDates, dateProfile: s, datesRepDistinctDays: !0, renderIntro: c ? this.renderHeadAxis : null }), u = e.allDaySlot !== !1 && ((v) => g(Pl, Object.assign({}, o.allDay, { dateProfile: s, dayTableModel: l, nextDayThreshold: e.nextDayThreshold, tableMinWidth: v.tableMinWidth, colGroupNode: v.tableColGroupNode, renderRowIntro: c ? this.renderTableRowAxis : null, showWeekNumbers: !1, expandRows: !1, headerAlignElRef: this.headerElRef, clientWidth: v.clientWidth, clientHeight: v.clientHeight, forPrint: i.forPrint }, this.getAllDayMaxEventProps()))), p = (v) => g(Yh, Object.assign({}, o.timed, { dayTableModel: l, dateProfile: s, axis: c, slotDuration: e.slotDuration, slatMetas: a, forPrint: i.forPrint, tableColGroupNode: v.tableColGroupNode, tableMinWidth: v.tableMinWidth, clientWidth: v.clientWidth, clientHeight: v.clientHeight, onSlatCoords: this.handleSlatCoords, expandRows: v.expandRows, onScrollTopRequest: this.handleScrollTopRequest }));
    return f ? this.renderHScrollLayout(h, u, p, l.colCnt, d, a, this.state.slatCoords) : this.renderSimpleLayout(h, u, p);
  }
}
function Jh(t, e) {
  let n = new ll(t.renderRange, e);
  return new ol(n, !1);
}
var eg = '.fc-v-event{background-color:var(--fc-event-bg-color);border:1px solid var(--fc-event-border-color);display:block}.fc-v-event .fc-event-main{color:var(--fc-event-text-color);height:100%}.fc-v-event .fc-event-main-frame{display:flex;flex-direction:column;height:100%}.fc-v-event .fc-event-time{flex-grow:0;flex-shrink:0;max-height:100%;overflow:hidden}.fc-v-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-height:0}.fc-v-event .fc-event-title{bottom:0;max-height:100%;overflow:hidden;top:0}.fc-v-event:not(.fc-event-start){border-top-left-radius:0;border-top-right-radius:0;border-top-width:0}.fc-v-event:not(.fc-event-end){border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-width:0}.fc-v-event.fc-event-selected:before{left:-10px;right:-10px}.fc-v-event .fc-event-resizer-start{cursor:n-resize}.fc-v-event .fc-event-resizer-end{cursor:s-resize}.fc-v-event:not(.fc-event-selected) .fc-event-resizer{height:var(--fc-event-resizer-thickness);left:0;right:0}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-start{top:calc(var(--fc-event-resizer-thickness)/-2)}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-end{bottom:calc(var(--fc-event-resizer-thickness)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer{left:50%;margin-left:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer-start{top:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer-end{bottom:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc .fc-timegrid .fc-daygrid-body{z-index:2}.fc .fc-timegrid-divider{padding:0 0 2px}.fc .fc-timegrid-body{min-height:100%;position:relative;z-index:1}.fc .fc-timegrid-axis-chunk{position:relative}.fc .fc-timegrid-axis-chunk>table,.fc .fc-timegrid-slots{position:relative;z-index:1}.fc .fc-timegrid-slot{border-bottom:0;height:1.5em}.fc .fc-timegrid-slot:empty:before{content:"\\00a0"}.fc .fc-timegrid-slot-minor{border-top-style:dotted}.fc .fc-timegrid-slot-label-cushion{display:inline-block;white-space:nowrap}.fc .fc-timegrid-slot-label{vertical-align:middle}.fc .fc-timegrid-axis-cushion,.fc .fc-timegrid-slot-label-cushion{padding:0 4px}.fc .fc-timegrid-axis-frame-liquid{height:100%}.fc .fc-timegrid-axis-frame{align-items:center;display:flex;justify-content:flex-end;overflow:hidden}.fc .fc-timegrid-axis-cushion{flex-shrink:0;max-width:60px}.fc-direction-ltr .fc-timegrid-slot-label-frame{text-align:right}.fc-direction-rtl .fc-timegrid-slot-label-frame{text-align:left}.fc-liquid-hack .fc-timegrid-axis-frame-liquid{bottom:0;height:auto;left:0;position:absolute;right:0;top:0}.fc .fc-timegrid-col.fc-day-today{background-color:var(--fc-today-bg-color)}.fc .fc-timegrid-col-frame{min-height:100%;position:relative}.fc-media-screen.fc-liquid-hack .fc-timegrid-col-frame{bottom:0;height:auto;left:0;position:absolute;right:0;top:0}.fc-media-screen .fc-timegrid-cols{bottom:0;left:0;position:absolute;right:0;top:0}.fc-media-screen .fc-timegrid-cols>table{height:100%}.fc-media-screen .fc-timegrid-col-bg,.fc-media-screen .fc-timegrid-col-events,.fc-media-screen .fc-timegrid-now-indicator-container{left:0;position:absolute;right:0;top:0}.fc .fc-timegrid-col-bg{z-index:2}.fc .fc-timegrid-col-bg .fc-non-business{z-index:1}.fc .fc-timegrid-col-bg .fc-bg-event{z-index:2}.fc .fc-timegrid-col-bg .fc-highlight{z-index:3}.fc .fc-timegrid-bg-harness{left:0;position:absolute;right:0}.fc .fc-timegrid-col-events{z-index:3}.fc .fc-timegrid-now-indicator-container{bottom:0;overflow:hidden}.fc-direction-ltr .fc-timegrid-col-events{margin:0 2.5% 0 2px}.fc-direction-rtl .fc-timegrid-col-events{margin:0 2px 0 2.5%}.fc-timegrid-event-harness{position:absolute}.fc-timegrid-event-harness>.fc-timegrid-event{bottom:0;left:0;position:absolute;right:0;top:0}.fc-timegrid-event-harness-inset .fc-timegrid-event,.fc-timegrid-event.fc-event-mirror,.fc-timegrid-more-link{box-shadow:0 0 0 1px var(--fc-page-bg-color)}.fc-timegrid-event,.fc-timegrid-more-link{border-radius:3px;font-size:var(--fc-small-font-size)}.fc-timegrid-event{margin-bottom:1px}.fc-timegrid-event .fc-event-main{padding:1px 1px 0}.fc-timegrid-event .fc-event-time{font-size:var(--fc-small-font-size);margin-bottom:1px;white-space:nowrap}.fc-timegrid-event-short .fc-event-main-frame{flex-direction:row;overflow:hidden}.fc-timegrid-event-short .fc-event-time:after{content:"\\00a0-\\00a0"}.fc-timegrid-event-short .fc-event-title{font-size:var(--fc-small-font-size)}.fc-timegrid-more-link{background:var(--fc-more-link-bg-color);color:var(--fc-more-link-text-color);cursor:pointer;margin-bottom:1px;position:absolute;z-index:9999}.fc-timegrid-more-link-inner{padding:3px 2px;top:0}.fc-direction-ltr .fc-timegrid-more-link{right:0}.fc-direction-rtl .fc-timegrid-more-link{left:0}.fc .fc-timegrid-now-indicator-arrow,.fc .fc-timegrid-now-indicator-line{pointer-events:none}.fc .fc-timegrid-now-indicator-line{border-color:var(--fc-now-indicator-color);border-style:solid;border-width:1px 0 0;left:0;position:absolute;right:0;z-index:4}.fc .fc-timegrid-now-indicator-arrow{border-color:var(--fc-now-indicator-color);border-style:solid;margin-top:-5px;position:absolute;z-index:4}.fc-direction-ltr .fc-timegrid-now-indicator-arrow{border-bottom-color:transparent;border-top-color:transparent;border-width:5px 0 5px 6px;left:0}.fc-direction-rtl .fc-timegrid-now-indicator-arrow{border-bottom-color:transparent;border-top-color:transparent;border-width:5px 6px 5px 0;right:0}';
Un(eg);
const tg = {
  allDaySlot: Boolean
};
var ng = ee({
  name: "@fullcalendar/timegrid",
  initialView: "timeGridWeek",
  optionRefiners: tg,
  views: {
    timeGrid: {
      component: Kh,
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
function Wl(t) {
  const e = new Date(t);
  return e.setMinutes(e.getMinutes() - e.getTimezoneOffset()), e.toISOString();
}
function Bt(t, e) {
  if (!t) return "";
  const n = Wl(t);
  return e ? n.slice(0, 10) : n.slice(0, 16);
}
function Ni(t, e) {
  if (!t) return "";
  const n = Wl(t);
  return e ? n.slice(0, 10) : n.slice(0, 19);
}
function Oi(t, e) {
  return t ? e ? t.slice(0, 10) : `${t.slice(0, 10)}T09:00` : "";
}
function Pi(t) {
  const e = String(Math.floor(t / 60)).padStart(2, "0"), n = String(t % 60).padStart(2, "0");
  return `${e}:${n}:00`;
}
const Vl = "06:00:00", Gl = "22:00:00", Hi = 60, Bi = 1440;
function rg(t, e, n) {
  const r = t.filter((l) => {
    if (l.allDay) return !1;
    const o = new Date(l.start);
    return new Date(l.end) > e && o < n;
  });
  if (r.length === 0)
    return { min: Vl, max: Gl };
  let i = Bi, s = 0;
  for (const l of r) {
    const o = new Date(l.start), a = new Date(l.end);
    i = Math.min(i, o.getHours() * 60 + o.getMinutes()), s = Math.max(s, a.getHours() * 60 + a.getMinutes());
  }
  return {
    min: Pi(Math.max(0, i - Hi)),
    max: Pi(Math.min(Bi, s + Hi))
  };
}
function ig(t, e) {
  const n = new Af(t, {
    plugins: [ng, Qf, vh],
    initialView: "timeGridWeek",
    locale: wf,
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
    slotMinTime: Vl,
    slotMaxTime: Gl,
    slotLabelFormat: { hour: "2-digit", minute: "2-digit", hour12: !1 },
    eventTimeFormat: { hour: "2-digit", minute: "2-digit", meridiem: !1 },
    events: []
  });
  return n.render(), n;
}
async function sg(t, e, n, r) {
  const i = encodeURIComponent(n), s = encodeURIComponent(r);
  return t.callApi("GET", `calendars/${e}?start=${i}&end=${s}`);
}
async function lg(t, e, n) {
  await t.callWS({ type: "calendar/event/create", entity_id: e, event: n });
}
async function $i(t, e, n, r, i = {}) {
  await t.callWS({
    type: "calendar/event/update",
    entity_id: e,
    uid: n,
    ...i,
    event: r
  });
}
async function og(t, e, n, r = {}) {
  await t.callWS({
    type: "calendar/event/delete",
    entity_id: e,
    uid: n,
    ...r
  });
}
const ag = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"];
function cg(t) {
  const e = /FREQ=([A-Z]+)/.exec(t)?.[1] ?? "", n = /UNTIL=(\d{4})(\d{2})(\d{2})/.exec(t);
  return {
    frequency: ag.includes(e) ? e : "",
    until: n ? `${n[1]}-${n[2]}-${n[3]}` : ""
  };
}
function dg(t, e) {
  if (!t) return;
  if (!e) return `FREQ=${t}`;
  const r = (/* @__PURE__ */ new Date(`${e}T23:59:59`)).toISOString().replace(/[-:]/g, "").slice(0, 15);
  return `FREQ=${t};UNTIL=${r}Z`;
}
function Te() {
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
function Li(t, e, n, r) {
  return {
    ...Te(),
    showModal: !0,
    isAllDay: n,
    newEventCalendar: r,
    newEventStart: Bt(t, n),
    newEventEnd: Bt(e, n)
  };
}
function ug(t) {
  const e = t.extendedProps, n = cg(e.rrule);
  return {
    ...Te(),
    showModal: !0,
    editMode: !0,
    isAllDay: t.allDay,
    currentEventId: e.uid || (t.id ?? ""),
    currentRecurrenceId: e.recurrenceId,
    currentRrule: e.rrule,
    newEventTitle: t.title,
    newEventCalendar: e.entityId,
    newEventStart: Bt(t.start, t.allDay),
    newEventEnd: Bt(t.end ?? t.start, t.allDay),
    newEventRecurrence: n.frequency,
    newEventUntil: n.until
  };
}
function fg(t, e) {
  return e === t.isAllDay ? {} : {
    isAllDay: e,
    newEventStart: Oi(t.newEventStart, e),
    newEventEnd: Oi(t.newEventEnd, e)
  };
}
function hg(t) {
  const e = t;
  return e ? { newEventRecurrence: e } : { newEventRecurrence: "", newEventUntil: "" };
}
function gg(t) {
  return t.newEventTitle.trim() ? t.newEventCalendar ? !t.newEventStart || !t.newEventEnd ? "Bitte Start und Ende angeben." : null : "Bitte einen Kalender auswählen." : "Bitte einen Titel eingeben.";
}
function Ui(t) {
  const e = {
    summary: t.newEventTitle.trim(),
    dtstart: t.newEventStart,
    dtend: t.newEventEnd
  }, n = dg(t.newEventRecurrence, t.newEventUntil);
  return n && (e.rrule = n), e;
}
function zi(t) {
  return t.currentRecurrenceId ? {
    recurrence_id: t.currentRecurrenceId,
    recurrence_range: "THISANDFUTURE"
  } : {};
}
const yr = "#0078d4";
function pg(t, e, n = yr) {
  const r = {
    entityId: e,
    uid: t.uid ?? "",
    recurrenceId: t.recurrence_id ?? "",
    rrule: t.rrule ?? ""
  };
  return {
    id: t.uid,
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
function mg(t, e) {
  return t.filter(
    (n) => e.includes(n.extendedProps.entityId)
  );
}
const Fi = 7, vg = 100;
class bg {
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
    }, vg);
  }
  /** Wendet die Filter an und passt die Zeitachse an. */
  applyFilters() {
    const e = this.ctx.calendar();
    if (!e) return;
    this.visible = mg(this.all, this.ctx.activeCalendars()), e.removeAllEventSources(), e.addEventSource(this.visible);
    const n = e.view;
    this.adjustTimeRange(n.activeStart, n.activeEnd), e.updateSize();
  }
  adjustTimeRange(e, n) {
    const r = this.ctx.calendar();
    if (!r || r.view.type !== "timeGridWeek") return;
    const i = rg(this.visible, e, n);
    r.setOption("slotMinTime", i.min), r.setOption("slotMaxTime", i.max);
  }
  dispose() {
    this.clear("refreshTimer"), this.clear("resizeTimer");
  }
  async load() {
    const e = this.ctx.hass(), n = this.ctx.config();
    if (!e || !n || !this.ctx.calendar()) return;
    const { start: r, end: i } = this.window(), s = [];
    for (const l of n.entities)
      try {
        const o = await sg(e, l, r, i), a = n.colors?.[l] ?? yr;
        s.push(...o.map((d) => pg(d, l, a)));
      } catch (o) {
        console.error("Family Calendar: Laden fehlgeschlagen für", l, o), this.ctx.onError("Kalender konnte nicht geladen werden.", l);
      }
    this.all = s, this.applyFilters();
  }
  window() {
    const e = this.ctx.calendar()?.view, n = e ? new Date(e.activeStart) : /* @__PURE__ */ new Date(), r = e ? new Date(e.activeEnd) : /* @__PURE__ */ new Date();
    return e || r.setDate(r.getDate() + 14), n.setDate(n.getDate() - Fi), r.setDate(r.getDate() + Fi), { start: n.toISOString(), end: r.toISOString() };
  }
  clear(e) {
    const n = this[e];
    n !== void 0 && (clearTimeout(n), this[e] = void 0);
  }
}
const yg = Ue`
  #calendar {
    --fc-border-color: var(--grid-line);
    --fc-page-bg-color: transparent;
    --fc-neutral-bg-color: transparent;
    --fc-today-bg-color: rgba(0, 122, 255, 0.08);
    --fc-now-indicator-color: #ff3b30;
    
    font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    height: 100%;
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
`, Eg = Ue`
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
`, Sg = Ue`
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
`, Ag = Ue`
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
`, wg = Ue`
  ${Ag}
  ${Sg}
  ${yg}
  ${Eg}
`, Ne = (t) => t.target.value;
function Cg(t) {
  const e = t.isAllDay ? "date" : "datetime-local";
  return B`
    <div class="modal-overlay" @click=${() => t.onCancel()}>
      <div class="modal-content" @click=${(n) => n.stopPropagation()}>
        <h3>${t.editMode ? "Termin bearbeiten" : "Neuer Termin"}</h3>

        <div class="form-group">
          <label>Titel</label>
          <input
            type="text"
            .value=${t.title}
            @input=${(n) => t.onTitle(Ne(n))}
            placeholder="Termin Titel"
            autofocus
          />
        </div>

        ${Dg(t)}

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
          <input type=${e} .value=${t.start} @input=${(n) => t.onStart(Ne(n))} />
        </div>

        <div class="form-group">
          <label>Bis</label>
          <input type=${e} .value=${t.end} @input=${(n) => t.onEnd(Ne(n))} />
        </div>

        ${_g(t)}

        <div class="modal-actions">
          ${t.editMode ? Tg(t) : ""}
          <button class="btn-cancel" @click=${() => t.onCancel()}>Abbrechen</button>
          <button class="btn-save" @click=${() => t.onSave()}>
            ${t.editMode ? "Aktualisieren" : "Speichern"}
          </button>
        </div>
      </div>
    </div>
  `;
}
function Dg(t) {
  return B`
    <div class="form-group">
      <label>Kalender</label>
      ${t.editMode ? B`<p class="readonly-value">${t.nameOf(t.calendar)}</p>` : B`
            <select .value=${t.calendar} @change=${(e) => t.onCalendar(Ne(e))}>
              ${t.entities.map(
    (e) => B`<option value=${e}>${t.nameOf(e)}</option>`
  )}
            </select>
          `}
    </div>
  `;
}
function _g(t) {
  return t.editMode && !t.isSeries ? B`
      <div class="form-group">
        <label>Wiederholung</label>
        <p class="readonly-value">Keine</p>
      </div>
    ` : B`
    <div class="form-group">
      <label>Wiederholung</label>
      <select .value=${t.frequency} @change=${(e) => t.onFrequency(Ne(e))}>
        ${t.isSeries ? "" : B`<option value="">Keine</option>`}
        <option value="DAILY">Täglich</option>
        <option value="WEEKLY">Wöchentlich</option>
        <option value="MONTHLY">Monatlich</option>
        <option value="YEARLY">Jährlich</option>
      </select>
    </div>
    ${t.frequency ? Rg(t) : ""}
  `;
}
function Rg(t) {
  return B`
    <div class="form-group">
      <label>Serie endet am</label>
      <input type="date" .value=${t.until} @input=${(e) => t.onUntil(Ne(e))} />
      <p class="field-hint">
        ${t.until ? "" : "Leer lassen für eine Serie ohne Ende. "}
        ${t.isSeries ? "Änderungen gelten ab diesem Termin, frühere bleiben stehen." : ""}
      </p>
    </div>
  `;
}
function Tg(t) {
  return t.confirmDelete ? B`
    <button class="btn-delete btn-delete--confirm" @click=${() => t.onDelete()}>
      Wirklich löschen?
    </button>
  ` : B`<button class="btn-delete" @click=${() => t.onConfirmDelete()}>Löschen</button>`;
}
function xg(t) {
  return B`
    <div class="header">
      <div class="filters">
        ${t.links.map((e) => kg(e, t.onNavigate))}
        ${t.entities.map((e) => Mg(e, t))}
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
function kg(t, e) {
  const n = t.name ?? t.path;
  return B`
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
function Mg(t, e) {
  const n = e.activeCalendars.includes(t);
  return B`
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
var Ig = Object.defineProperty, Ng = Object.getOwnPropertyDescriptor, Ce = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Ng(e, n) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (i = (r ? l(e, n, i) : l(i)) || i);
  return r && i && Ig(e, n, i), i;
};
const Og = 500, Pg = [0, 250, 1e3, 2500];
let K = class extends xe {
  constructor() {
    super(...arguments), this.activeCalendars = [], this.isCompact = !1, this.form = Te(), this.calendar = null, this.loader = new bg({
      hass: () => this.hass,
      config: () => this.config,
      calendar: () => this.calendar,
      activeCalendars: () => this.activeCalendars,
      onError: (t, e) => this.notify(`${this.friendlyName(e)}: ${t}`)
    });
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
    return B`
      <ha-card>
        ${xg({
      links: this.config?.links ?? [],
      entities: this.config?.entities ?? [],
      activeCalendars: this.activeCalendars,
      isCompact: this.isCompact,
      colorOf: (t) => this.config.colors?.[t] ?? yr,
      nameOf: (t) => this.friendlyName(t),
      onNavigate: (t) => this.navigate(t),
      onToggleCalendar: (t) => this.toggleCalendar(t),
      onToggleCompact: () => this.toggleCompact(),
      onNewEvent: () => this.openNewEvent()
    })}
        <div id="calendar"></div>
        ${this.form.showModal ? this.renderDialog() : ""}
      </ha-card>
    `;
  }
  renderDialog() {
    const t = this.form, e = (n) => {
      this.form = { ...this.form, ...n };
    };
    return Cg({
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
      onAllDay: (n) => e(fg(t, n)),
      onStart: (n) => e({ newEventStart: n }),
      onEnd: (n) => e({ newEventEnd: n }),
      onFrequency: (n) => e(hg(n)),
      onUntil: (n) => e({ newEventUntil: n }),
      onConfirmDelete: () => e({ confirmDelete: !0 }),
      onDelete: () => {
        this.deleteEvent();
      },
      onCancel: () => this.form = Te(),
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
      this.calendar = ig(this.calendarEl, {
        onSelect: (t) => this.handleDateSelect(t),
        onEventClick: (t) => this.handleEventClick(t),
        onEventMoved: (t) => {
          this.handleEventMoved(t);
        },
        onDatesSet: (t) => {
          this.loader.adjustTimeRange(t.start, t.end), this.refresh();
        }
      }), this.resizeObserver = new ResizeObserver(() => this.loader.scheduleResize()), this.resizeObserver.observe(this.calendarEl);
      for (const t of Pg)
        window.setTimeout(() => this.calendar?.updateSize(), t);
    }
  }
  updated(t) {
    t.has("hass") && this.loader.hasRelevantChange() && this.refresh();
  }
  /** Nachladen anstossen, entprellt. */
  refresh() {
    this.loader.scheduleFetch(this.config?.refreshDebounceMs ?? Og);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.loader.dispose(), this.resizeObserver?.disconnect(), this.resizeObserver = void 0, this.calendar?.destroy(), this.calendar = null;
  }
  /** Aendert sich nur, wenn einer der konfigurierten Kalender sich meldet. */
  // ------------------------------------------------------------------- Daten
  // -------------------------------------------------------------- Bedienung
  toggleCompact() {
    this.isCompact = !this.isCompact, this.calendar?.changeView(this.isCompact ? "dayGridWeek" : "timeGridWeek");
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
    this.form = Li(t, e, !1, this.config.entities[0] ?? "");
  }
  handleDateSelect(t) {
    t.view.calendar.unselect(), this.form = Li(t.start, t.end, t.allDay, this.config.entities[0] ?? "");
  }
  handleEventClick(t) {
    this.form = ug(t.event);
  }
  // ------------------------------------------------------------- Schreiben
  async saveEvent() {
    const t = gg(this.form);
    if (t) return this.notify(t);
    const e = this.form;
    try {
      e.editMode && e.currentEventId ? await $i(
        this.hass,
        e.newEventCalendar,
        e.currentEventId,
        Ui(e),
        zi(e)
      ) : await lg(this.hass, e.newEventCalendar, Ui(e)), this.form = Te(), this.refresh();
    } catch (n) {
      console.error("Family Calendar: Speichern fehlgeschlagen", n), this.notify(`Termin konnte nicht gespeichert werden: ${this.errorText(n)}`);
    }
  }
  async deleteEvent() {
    const t = this.form;
    try {
      await og(this.hass, t.newEventCalendar, t.currentEventId, zi(t)), this.form = Te(), this.refresh();
    } catch (e) {
      console.error("Family Calendar: Löschen fehlgeschlagen", e), this.notify(`Termin konnte nicht gelöscht werden: ${this.errorText(e)}`), this.form = { ...this.form, confirmDelete: !1 };
    }
  }
  /** Termin wurde gezogen oder in der Dauer geaendert. */
  async handleEventMoved(t) {
    const e = t.event, n = e.extendedProps;
    if (!n.uid) {
      t.revert(), this.notify("Dieser Termin hat keine Kennung und lässt sich nicht verschieben.");
      return;
    }
    const r = {
      summary: e.title,
      dtstart: Ni(e.start, e.allDay),
      dtend: Ni(e.end ?? e.start, e.allDay)
    };
    try {
      const i = n.recurrenceId ? { recurrence_id: n.recurrenceId } : {};
      await $i(this.hass, n.entityId, n.uid, r, i), this.refresh();
    } catch (i) {
      t.revert(), console.error("Family Calendar: Verschieben fehlgeschlagen", i), this.notify(`Termin konnte nicht verschoben werden: ${this.errorText(i)}`);
    }
  }
  /** Reichweite einer Aenderung an einem Serientermin. */
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
K.styles = wg;
Ce([
  tt({ attribute: !1 })
], K.prototype, "hass", 2);
Ce([
  tt({ attribute: !1 })
], K.prototype, "config", 2);
Ce([
  Ut()
], K.prototype, "activeCalendars", 2);
Ce([
  Ut()
], K.prototype, "isCompact", 2);
Ce([
  Ut()
], K.prototype, "form", 2);
Ce([
  So("#calendar")
], K.prototype, "calendarEl", 2);
K = Ce([
  Zi("family-calendar")
], K);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-calendar",
  name: "Family Calendar",
  description: "Wochen- und Monatsansicht über mehrere Kalender, mit Anlegen und Bearbeiten.",
  preview: !1
});
const Hg = Ue`
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
`;
function Bg(t) {
  return B`
    <ha-card>
      <nav>${t.items.map((e) => $g(e, t))}</nav>
    </ha-card>
  `;
}
function $g(t, e) {
  const n = e.isActive(t), r = [
    "item",
    n ? "item--active" : "",
    t.disabled ? "item--disabled" : ""
  ].filter(Boolean).join(" ");
  return B`
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
var Lg = Object.defineProperty, Ug = Object.getOwnPropertyDescriptor, Qt = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Ug(e, n) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (i = (r ? l(e, n, i) : l(i)) || i);
  return r && i && Lg(e, n, i), i;
};
let Le = class extends xe {
  constructor() {
    super(...arguments), this.compact = !1, this.currentPath = window.location.pathname, this.onLocationChanged = () => {
      this.currentPath = window.location.pathname;
    };
  }
  setConfig(t) {
    if (!t.items?.length)
      throw new Error("Bitte mindestens einen Eintrag angeben!");
    this.config = t, this.compact = t.compact ?? !1;
  }
  getCardSize() {
    return 1;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("location-changed", this.onLocationChanged), window.addEventListener("popstate", this.onLocationChanged);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("location-changed", this.onLocationChanged), window.removeEventListener("popstate", this.onLocationChanged);
  }
  render() {
    return Bg({
      items: this.config.items,
      isActive: (t) => this.isActive(t),
      onSelect: (t) => this.select(t)
    });
  }
  isActive(t) {
    return t.disabled ? !1 : this.currentPath === t.path;
  }
  select(t) {
    t.disabled || this.currentPath === t.path || (history.pushState(null, "", t.path), window.dispatchEvent(new CustomEvent("location-changed", { bubbles: !0, composed: !0 })), this.currentPath = t.path);
  }
};
Le.styles = Hg;
Qt([
  tt({ attribute: !1 })
], Le.prototype, "config", 2);
Qt([
  tt({ type: Boolean, reflect: !0 })
], Le.prototype, "compact", 2);
Qt([
  Ut()
], Le.prototype, "currentPath", 2);
Le = Qt([
  Zi("family-nav")
], Le);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-nav",
  name: "Family Navigation",
  description: "Seitenleiste zum Wechseln zwischen den Bereichen des Familien-Dashboards.",
  preview: !1
});
