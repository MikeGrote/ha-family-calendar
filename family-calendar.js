const Xe = globalThis, rn = Xe.ShadowRoot && (Xe.ShadyCSS === void 0 || Xe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, sn = /* @__PURE__ */ Symbol(), Bn = /* @__PURE__ */ new WeakMap();
let Yr = class {
  constructor(e, n, r) {
    if (this._$cssResult$ = !0, r !== sn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (rn && e === void 0) {
      const r = n !== void 0 && n.length === 1;
      r && (e = Bn.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Bn.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ws = (t) => new Yr(typeof t == "string" ? t : t + "", void 0, sn), js = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((r, i, s) => r + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[s + 1], t[0]);
  return new Yr(n, t, sn);
}, Vs = (t, e) => {
  if (rn) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const r = document.createElement("style"), i = Xe.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = n.cssText, t.appendChild(r);
  }
}, $n = rn ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const r of e.cssRules) n += r.cssText;
  return Ws(n);
})(t) : t;
const { is: Gs, defineProperty: Qs, getOwnPropertyDescriptor: qs, getOwnPropertyNames: Zs, getOwnPropertySymbols: Ys, getPrototypeOf: Js } = Object, _t = globalThis, Un = _t.trustedTypes, Ks = Un ? Un.emptyScript : "", Xs = _t.reactiveElementPolyfillSupport, Oe = (t, e) => t, lt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ks : null;
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
} }, ln = (t, e) => !Gs(t, e), zn = { attribute: !0, type: String, converter: lt, reflect: !1, useDefault: !1, hasChanged: ln };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), _t.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ae = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = zn) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, r, n);
      i !== void 0 && Qs(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, n, r) {
    const { get: i, set: s } = qs(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? zn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Oe("elementProperties"))) return;
    const e = Js(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Oe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Oe("properties"))) {
      const n = this.properties, r = [...Zs(n), ...Ys(n)];
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
      for (const i of r) n.unshift($n(i));
    } else e !== void 0 && n.push($n(e));
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
    return Vs(e, this.constructor.elementStyles), e;
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
      const s = (r.converter?.toAttribute !== void 0 ? r.converter : lt).toAttribute(n, r.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, n) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const s = r.getPropertyOptions(i), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : lt;
      this._$Em = i;
      const o = l.fromAttribute(n, s.type);
      this[i] = o ?? this._$Ej?.get(i) ?? o, this._$Em = null;
    }
  }
  requestUpdate(e, n, r, i = !1, s) {
    if (e !== void 0) {
      const l = this.constructor;
      if (i === !1 && (s = this[e]), r ??= l.getPropertyOptions(e), !((r.hasChanged ?? ln)(s, n) || r.useDefault && r.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(l._$Eu(e, r)))) return;
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
Ae.elementStyles = [], Ae.shadowRootOptions = { mode: "open" }, Ae[Oe("elementProperties")] = /* @__PURE__ */ new Map(), Ae[Oe("finalized")] = /* @__PURE__ */ new Map(), Xs?.({ ReactiveElement: Ae }), (_t.reactiveElementVersions ??= []).push("2.1.2");
const on = globalThis, Fn = (t) => t, ot = on.trustedTypes, Ln = ot ? ot.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Jr = "$lit$", J = `lit$${Math.random().toFixed(9).slice(2)}$`, Kr = "?" + J, el = `<${Kr}>`, he = document, $e = () => he.createComment(""), Ue = (t) => t === null || typeof t != "object" && typeof t != "function", an = Array.isArray, tl = (t) => an(t) || typeof t?.[Symbol.iterator] == "function", Dt = `[ 	
\f\r]`, Ie = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Wn = /-->/g, jn = />/g, oe = RegExp(`>|${Dt}(?:([^\\s"'>=/]+)(${Dt}*=${Dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vn = /'/g, Gn = /"/g, Xr = /^(?:script|style|textarea|title)$/i, nl = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), Qn = nl(1), we = /* @__PURE__ */ Symbol.for("lit-noChange"), I = /* @__PURE__ */ Symbol.for("lit-nothing"), qn = /* @__PURE__ */ new WeakMap(), ue = he.createTreeWalker(he, 129);
function ei(t, e) {
  if (!an(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ln !== void 0 ? Ln.createHTML(e) : e;
}
const rl = (t, e) => {
  const n = t.length - 1, r = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", l = Ie;
  for (let o = 0; o < n; o++) {
    const a = t[o];
    let d, c, h = -1, p = 0;
    for (; p < a.length && (l.lastIndex = p, c = l.exec(a), c !== null); ) p = l.lastIndex, l === Ie ? c[1] === "!--" ? l = Wn : c[1] !== void 0 ? l = jn : c[2] !== void 0 ? (Xr.test(c[2]) && (i = RegExp("</" + c[2], "g")), l = oe) : c[3] !== void 0 && (l = oe) : l === oe ? c[0] === ">" ? (l = i ?? Ie, h = -1) : c[1] === void 0 ? h = -2 : (h = l.lastIndex - c[2].length, d = c[1], l = c[3] === void 0 ? oe : c[3] === '"' ? Gn : Vn) : l === Gn || l === Vn ? l = oe : l === Wn || l === jn ? l = Ie : (l = oe, i = void 0);
    const u = l === oe && t[o + 1].startsWith("/>") ? " " : "";
    s += l === Ie ? a + el : h >= 0 ? (r.push(d), a.slice(0, h) + Jr + a.slice(h) + J + u) : a + J + (h === -2 ? o : u);
  }
  return [ei(t, s + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
let Wt = class ti {
  constructor({ strings: e, _$litType$: n }, r) {
    let i;
    this.parts = [];
    let s = 0, l = 0;
    const o = e.length - 1, a = this.parts, [d, c] = rl(e, n);
    if (this.el = ti.createElement(d, r), ue.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = ue.nextNode()) !== null && a.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Jr)) {
          const p = c[l++], u = i.getAttribute(h).split(J), m = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: s, name: m[2], strings: u, ctor: m[1] === "." ? sl : m[1] === "?" ? ll : m[1] === "@" ? ol : St }), i.removeAttribute(h);
        } else h.startsWith(J) && (a.push({ type: 6, index: s }), i.removeAttribute(h));
        if (Xr.test(i.tagName)) {
          const h = i.textContent.split(J), p = h.length - 1;
          if (p > 0) {
            i.textContent = ot ? ot.emptyScript : "";
            for (let u = 0; u < p; u++) i.append(h[u], $e()), ue.nextNode(), a.push({ type: 2, index: ++s });
            i.append(h[p], $e());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Kr) a.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(J, h + 1)) !== -1; ) a.push({ type: 7, index: s }), h += J.length - 1;
      }
      s++;
    }
  }
  static createElement(e, n) {
    const r = he.createElement("template");
    return r.innerHTML = e, r;
  }
};
function De(t, e, n = t, r) {
  if (e === we) return e;
  let i = r !== void 0 ? n._$Co?.[r] : n._$Cl;
  const s = Ue(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== s && (i?._$AO?.(!1), s === void 0 ? i = void 0 : (i = new s(t), i._$AT(t, n, r)), r !== void 0 ? (n._$Co ??= [])[r] = i : n._$Cl = i), i !== void 0 && (e = De(t, i._$AS(t, e.values), i, r)), e;
}
class il {
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
    const { el: { content: n }, parts: r } = this._$AD, i = (e?.creationScope ?? he).importNode(n, !0);
    ue.currentNode = i;
    let s = ue.nextNode(), l = 0, o = 0, a = r[0];
    for (; a !== void 0; ) {
      if (l === a.index) {
        let d;
        a.type === 2 ? d = new cn(s, s.nextSibling, this, e) : a.type === 1 ? d = new a.ctor(s, a.name, a.strings, this, e) : a.type === 6 && (d = new al(s, this, e)), this._$AV.push(d), a = r[++o];
      }
      l !== a?.index && (s = ue.nextNode(), l++);
    }
    return ue.currentNode = he, i;
  }
  p(e) {
    let n = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, n), n += r.strings.length - 2) : r._$AI(e[n])), n++;
  }
}
let cn = class ni {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, n, r, i) {
    this.type = 2, this._$AH = I, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    e = De(this, e, n), Ue(e) ? e === I || e == null || e === "" ? (this._$AH !== I && this._$AR(), this._$AH = I) : e !== this._$AH && e !== we && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : tl(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== I && Ue(this._$AH) ? this._$AA.nextSibling.data = e : this.T(he.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: n, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = Wt.createElement(ei(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(n);
    else {
      const s = new il(i, this), l = s.u(this.options);
      s.p(n), this.T(l), this._$AH = s;
    }
  }
  _$AC(e) {
    let n = qn.get(e.strings);
    return n === void 0 && qn.set(e.strings, n = new Wt(e)), n;
  }
  k(e) {
    an(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let r, i = 0;
    for (const s of e) i === n.length ? n.push(r = new ni(this.O($e()), this.O($e()), this, this.options)) : r = n[i], r._$AI(s), i++;
    i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); e !== this._$AB; ) {
      const r = Fn(e).nextSibling;
      Fn(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}, St = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, r, i, s) {
    this.type = 1, this._$AH = I, this._$AN = void 0, this.element = e, this.name = n, this._$AM = i, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = I;
  }
  _$AI(e, n = this, r, i) {
    const s = this.strings;
    let l = !1;
    if (s === void 0) e = De(this, e, n, 0), l = !Ue(e) || e !== this._$AH && e !== we, l && (this._$AH = e);
    else {
      const o = e;
      let a, d;
      for (e = s[0], a = 0; a < s.length - 1; a++) d = De(this, o[r + a], n, a), d === we && (d = this._$AH[a]), l ||= !Ue(d) || d !== this._$AH[a], d === I ? e = I : e !== I && (e += (d ?? "") + s[a + 1]), this._$AH[a] = d;
    }
    l && !i && this.j(e);
  }
  j(e) {
    e === I ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}, sl = class extends St {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === I ? void 0 : e;
  }
}, ll = class extends St {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== I);
  }
}, ol = class extends St {
  constructor(e, n, r, i, s) {
    super(e, n, r, i, s), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = De(this, e, n, 0) ?? I) === we) return;
    const r = this._$AH, i = e === I && r !== I || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, s = e !== I && (r === I || i);
    i && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}, al = class {
  constructor(e, n, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    De(this, e);
  }
};
const cl = on.litHtmlPolyfillSupport;
cl?.(Wt, cn), (on.litHtmlVersions ??= []).push("3.3.2");
const dl = (t, e, n) => {
  const r = n?.renderBefore ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const s = n?.renderBefore ?? null;
    r._$litPart$ = i = new cn(e.insertBefore($e(), s), s, void 0, n ?? {});
  }
  return i._$AI(t), i;
};
const dn = globalThis;
let Pe = class extends Ae {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = dl(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return we;
  }
};
Pe._$litElement$ = !0, Pe.finalized = !0, dn.litElementHydrateSupport?.({ LitElement: Pe });
const ul = dn.litElementPolyfillSupport;
ul?.({ LitElement: Pe });
(dn.litElementVersions ??= []).push("4.2.2");
const fl = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const hl = { attribute: !0, type: String, converter: lt, reflect: !1, hasChanged: ln }, pl = (t = hl, e, n) => {
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
function un(t) {
  return (e, n) => typeof n == "object" ? pl(t, e, n) : ((r, i, s) => {
    const l = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, r), l ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(t, e, n);
}
function ri(t) {
  return un({ ...t, state: !0, attribute: !1 });
}
const gl = (t, e, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, n), n);
function ml(t, e) {
  return (n, r, i) => {
    const s = (l) => l.renderRoot?.querySelector(t) ?? null;
    return gl(n, r, { get() {
      return s(this);
    } });
  };
}
var Ct, E, ii, si, Re, de, Zn, li, oi, at = {}, ai = [], vl = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function K(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function ci(t) {
  var e = t.parentNode;
  e && e.removeChild(t);
}
function f(t, e, n) {
  var r, i, s, l = {};
  for (s in e) s == "key" ? r = e[s] : s == "ref" ? i = e[s] : l[s] = e[s];
  if (arguments.length > 2 && (l.children = arguments.length > 3 ? Ct.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null) for (s in t.defaultProps) l[s] === void 0 && (l[s] = t.defaultProps[s]);
  return et(t, l, r, i, null);
}
function et(t, e, n, r, i) {
  var s = { type: t, props: e, key: n, ref: r, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: i ?? ++ii };
  return i == null && E.vnode != null && E.vnode(s), s;
}
function H() {
  return { current: null };
}
function x(t) {
  return t.children;
}
function bl(t, e, n, r, i) {
  var s;
  for (s in n) s === "children" || s === "key" || s in e || ct(t, s, null, n[s], r);
  for (s in e) i && typeof e[s] != "function" || s === "children" || s === "key" || s === "value" || s === "checked" || n[s] === e[s] || ct(t, s, e[s], n[s], r);
}
function Yn(t, e, n) {
  e[0] === "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || vl.test(e) ? n : n + "px";
}
function ct(t, e, n, r, i) {
  var s;
  e: if (e === "style") if (typeof n == "string") t.style.cssText = n;
  else {
    if (typeof r == "string" && (t.style.cssText = r = ""), r) for (e in r) n && e in n || Yn(t.style, e, "");
    if (n) for (e in n) r && n[e] === r[e] || Yn(t.style, e, n[e]);
  }
  else if (e[0] === "o" && e[1] === "n") s = e !== (e = e.replace(/Capture$/, "")), e = e.toLowerCase() in t ? e.toLowerCase().slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + s] = n, n ? r || t.addEventListener(e, s ? Kn : Jn, s) : t.removeEventListener(e, s ? Kn : Jn, s);
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
function Jn(t) {
  Re = !0;
  try {
    return this.l[t.type + !1](E.event ? E.event(t) : t);
  } finally {
    Re = !1;
  }
}
function Kn(t) {
  Re = !0;
  try {
    return this.l[t.type + !0](E.event ? E.event(t) : t);
  } finally {
    Re = !1;
  }
}
function $(t, e) {
  this.props = t, this.context = e;
}
function ze(t, e) {
  if (e == null) return t.__ ? ze(t.__, t.__.__k.indexOf(t) + 1) : null;
  for (var n; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) return n.__e;
  return typeof t.type == "function" ? ze(t) : null;
}
function di(t) {
  var e, n;
  if ((t = t.__) != null && t.__c != null) {
    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) {
      t.__e = t.__c.base = n.__e;
      break;
    }
    return di(t);
  }
}
function yl(t) {
  Re ? setTimeout(t) : li(t);
}
function jt(t) {
  (!t.__d && (t.__d = !0) && de.push(t) && !dt.__r++ || Zn !== E.debounceRendering) && ((Zn = E.debounceRendering) || yl)(dt);
}
function dt() {
  var t, e, n, r, i, s, l, o;
  for (de.sort(function(a, d) {
    return a.__v.__b - d.__v.__b;
  }); t = de.shift(); ) t.__d && (e = de.length, r = void 0, i = void 0, l = (s = (n = t).__v).__e, (o = n.__P) && (r = [], (i = K({}, s)).__v = s.__v + 1, fn(o, s, i, n.__n, o.ownerSVGElement !== void 0, s.__h != null ? [l] : null, r, l ?? ze(s), s.__h), gi(r, s), s.__e != l && di(s)), de.length > e && de.sort(function(a, d) {
    return a.__v.__b - d.__v.__b;
  }));
  dt.__r = 0;
}
function ui(t, e, n, r, i, s, l, o, a, d) {
  var c, h, p, u, m, v, b, y = r && r.__k || ai, A = y.length;
  for (n.__k = [], c = 0; c < e.length; c++) if ((u = n.__k[c] = (u = e[c]) == null || typeof u == "boolean" ? null : typeof u == "string" || typeof u == "number" || typeof u == "bigint" ? et(null, u, null, null, u) : Array.isArray(u) ? et(x, { children: u }, null, null, null) : u.__b > 0 ? et(u.type, u.props, u.key, u.ref ? u.ref : null, u.__v) : u) != null) {
    if (u.__ = n, u.__b = n.__b + 1, (p = y[c]) === null || p && u.key == p.key && u.type === p.type) y[c] = void 0;
    else for (h = 0; h < A; h++) {
      if ((p = y[h]) && u.key == p.key && u.type === p.type) {
        y[h] = void 0;
        break;
      }
      p = null;
    }
    fn(t, u, p = p || at, i, s, l, o, a, d), m = u.__e, (h = u.ref) && p.ref != h && (b || (b = []), p.ref && b.push(p.ref, null, u), b.push(h, u.__c || m, u)), m != null ? (v == null && (v = m), typeof u.type == "function" && u.__k === p.__k ? u.__d = a = fi(u, a, t) : a = hi(t, u, p, y, m, a), typeof n.type == "function" && (n.__d = a)) : a && p.__e == a && a.parentNode != t && (a = ze(p));
  }
  for (n.__e = v, c = A; c--; ) y[c] != null && (typeof n.type == "function" && y[c].__e != null && y[c].__e == n.__d && (n.__d = pi(r).nextSibling), vi(y[c], y[c]));
  if (b) for (c = 0; c < b.length; c++) mi(b[c], b[++c], b[++c]);
}
function fi(t, e, n) {
  for (var r, i = t.__k, s = 0; i && s < i.length; s++) (r = i[s]) && (r.__ = t, e = typeof r.type == "function" ? fi(r, e, n) : hi(n, r, r, i, r.__e, e));
  return e;
}
function ut(t, e) {
  return e = e || [], t == null || typeof t == "boolean" || (Array.isArray(t) ? t.some(function(n) {
    ut(n, e);
  }) : e.push(t)), e;
}
function hi(t, e, n, r, i, s) {
  var l, o, a;
  if (e.__d !== void 0) l = e.__d, e.__d = void 0;
  else if (n == null || i != s || i.parentNode == null) e: if (s == null || s.parentNode !== t) t.appendChild(i), l = null;
  else {
    for (o = s, a = 0; (o = o.nextSibling) && a < r.length; a += 1) if (o == i) break e;
    t.insertBefore(i, s), l = s;
  }
  return l !== void 0 ? l : i.nextSibling;
}
function pi(t) {
  var e, n, r;
  if (t.type == null || typeof t.type == "string") return t.__e;
  if (t.__k) {
    for (e = t.__k.length - 1; e >= 0; e--) if ((n = t.__k[e]) && (r = pi(n))) return r;
  }
  return null;
}
function fn(t, e, n, r, i, s, l, o, a) {
  var d, c, h, p, u, m, v, b, y, A, C, S, P, T, O, D = e.type;
  if (e.constructor !== void 0) return null;
  n.__h != null && (a = n.__h, o = e.__e = n.__e, e.__h = null, s = [o]), (d = E.__b) && d(e);
  try {
    e: if (typeof D == "function") {
      if (b = e.props, y = (d = D.contextType) && r[d.__c], A = d ? y ? y.props.value : d.__ : r, n.__c ? v = (c = e.__c = n.__c).__ = c.__E : ("prototype" in D && D.prototype.render ? e.__c = c = new D(b, A) : (e.__c = c = new $(b, A), c.constructor = D, c.render = El), y && y.sub(c), c.props = b, c.state || (c.state = {}), c.context = A, c.__n = r, h = c.__d = !0, c.__h = [], c._sb = []), c.__s == null && (c.__s = c.state), D.getDerivedStateFromProps != null && (c.__s == c.state && (c.__s = K({}, c.__s)), K(c.__s, D.getDerivedStateFromProps(b, c.__s))), p = c.props, u = c.state, c.__v = e, h) D.getDerivedStateFromProps == null && c.componentWillMount != null && c.componentWillMount(), c.componentDidMount != null && c.__h.push(c.componentDidMount);
      else {
        if (D.getDerivedStateFromProps == null && b !== p && c.componentWillReceiveProps != null && c.componentWillReceiveProps(b, A), !c.__e && c.shouldComponentUpdate != null && c.shouldComponentUpdate(b, c.__s, A) === !1 || e.__v === n.__v) {
          for (e.__v !== n.__v && (c.props = b, c.state = c.__s, c.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.forEach(function(ye) {
            ye && (ye.__ = e);
          }), C = 0; C < c._sb.length; C++) c.__h.push(c._sb[C]);
          c._sb = [], c.__h.length && l.push(c);
          break e;
        }
        c.componentWillUpdate != null && c.componentWillUpdate(b, c.__s, A), c.componentDidUpdate != null && c.__h.push(function() {
          c.componentDidUpdate(p, u, m);
        });
      }
      if (c.context = A, c.props = b, c.__P = t, S = E.__r, P = 0, "prototype" in D && D.prototype.render) {
        for (c.state = c.__s, c.__d = !1, S && S(e), d = c.render(c.props, c.state, c.context), T = 0; T < c._sb.length; T++) c.__h.push(c._sb[T]);
        c._sb = [];
      } else do
        c.__d = !1, S && S(e), d = c.render(c.props, c.state, c.context), c.state = c.__s;
      while (c.__d && ++P < 25);
      c.state = c.__s, c.getChildContext != null && (r = K(K({}, r), c.getChildContext())), h || c.getSnapshotBeforeUpdate == null || (m = c.getSnapshotBeforeUpdate(p, u)), O = d != null && d.type === x && d.key == null ? d.props.children : d, ui(t, Array.isArray(O) ? O : [O], e, n, r, i, s, l, o, a), c.base = e.__e, e.__h = null, c.__h.length && l.push(c), v && (c.__E = c.__ = null), c.__e = !1;
    } else s == null && e.__v === n.__v ? (e.__k = n.__k, e.__e = n.__e) : e.__e = Al(n.__e, e, n, r, i, s, l, a);
    (d = E.diffed) && d(e);
  } catch (ye) {
    e.__v = null, (a || s != null) && (e.__e = o, e.__h = !!a, s[s.indexOf(o)] = null), E.__e(ye, e, n);
  }
}
function gi(t, e) {
  E.__c && E.__c(e, t), t.some(function(n) {
    try {
      t = n.__h, n.__h = [], t.some(function(r) {
        r.call(n);
      });
    } catch (r) {
      E.__e(r, n.__v);
    }
  });
}
function Al(t, e, n, r, i, s, l, o) {
  var a, d, c, h = n.props, p = e.props, u = e.type, m = 0;
  if (u === "svg" && (i = !0), s != null) {
    for (; m < s.length; m++) if ((a = s[m]) && "setAttribute" in a == !!u && (u ? a.localName === u : a.nodeType === 3)) {
      t = a, s[m] = null;
      break;
    }
  }
  if (t == null) {
    if (u === null) return document.createTextNode(p);
    t = i ? document.createElementNS("http://www.w3.org/2000/svg", u) : document.createElement(u, p.is && p), s = null, o = !1;
  }
  if (u === null) h === p || o && t.data === p || (t.data = p);
  else {
    if (s = s && Ct.call(t.childNodes), d = (h = n.props || at).dangerouslySetInnerHTML, c = p.dangerouslySetInnerHTML, !o) {
      if (s != null) for (h = {}, m = 0; m < t.attributes.length; m++) h[t.attributes[m].name] = t.attributes[m].value;
      (c || d) && (c && (d && c.__html == d.__html || c.__html === t.innerHTML) || (t.innerHTML = c && c.__html || ""));
    }
    if (bl(t, p, h, i, o), c) e.__k = [];
    else if (m = e.props.children, ui(t, Array.isArray(m) ? m : [m], e, n, r, i && u !== "foreignObject", s, l, s ? s[0] : n.__k && ze(n, 0), o), s != null) for (m = s.length; m--; ) s[m] != null && ci(s[m]);
    o || ("value" in p && (m = p.value) !== void 0 && (m !== t.value || u === "progress" && !m || u === "option" && m !== h.value) && ct(t, "value", m, h.value, !1), "checked" in p && (m = p.checked) !== void 0 && m !== t.checked && ct(t, "checked", m, h.checked, !1));
  }
  return t;
}
function mi(t, e, n) {
  try {
    typeof t == "function" ? t(e) : t.current = e;
  } catch (r) {
    E.__e(r, n);
  }
}
function vi(t, e, n) {
  var r, i;
  if (E.unmount && E.unmount(t), (r = t.ref) && (r.current && r.current !== t.__e || mi(r, null, e)), (r = t.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (s) {
      E.__e(s, e);
    }
    r.base = r.__P = null, t.__c = void 0;
  }
  if (r = t.__k) for (i = 0; i < r.length; i++) r[i] && vi(r[i], e, n || typeof t.type != "function");
  n || t.__e == null || ci(t.__e), t.__ = t.__e = t.__d = void 0;
}
function El(t, e, n) {
  return this.constructor(t, n);
}
function Fe(t, e, n) {
  var r, i, s;
  E.__ && E.__(t, e), i = (r = !1) ? null : e.__k, s = [], fn(e, t = e.__k = f(x, null, [t]), i || at, at, e.ownerSVGElement !== void 0, i ? null : e.firstChild ? Ct.call(e.childNodes) : null, s, i ? i.__e : e.firstChild, r), gi(s, t);
}
function _l(t, e) {
  var n = { __c: e = "__cC" + oi++, __: t, Consumer: function(r, i) {
    return r.children(i);
  }, Provider: function(r) {
    var i, s;
    return this.getChildContext || (i = [], (s = {})[e] = this, this.getChildContext = function() {
      return s;
    }, this.shouldComponentUpdate = function(l) {
      this.props.value !== l.value && i.some(function(o) {
        o.__e = !0, jt(o);
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
Ct = ai.slice, E = { __e: function(t, e, n, r) {
  for (var i, s, l; e = e.__; ) if ((i = e.__c) && !i.__) try {
    if ((s = i.constructor) && s.getDerivedStateFromError != null && (i.setState(s.getDerivedStateFromError(t)), l = i.__d), i.componentDidCatch != null && (i.componentDidCatch(t, r || {}), l = i.__d), l) return i.__E = i;
  } catch (o) {
    t = o;
  }
  throw t;
} }, ii = 0, si = function(t) {
  return t != null && t.constructor === void 0;
}, Re = !1, $.prototype.setState = function(t, e) {
  var n;
  n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = K({}, this.state), typeof t == "function" && (t = t(K({}, n), this.props)), t && K(n, t), t != null && this.__v && (e && this._sb.push(e), jt(this));
}, $.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), jt(this));
}, $.prototype.render = x, de = [], li = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, dt.__r = 0, oi = 0;
var W, Rt, Xn, bi = [], xt = [], er = E.__b, tr = E.__r, nr = E.diffed, rr = E.__c, ir = E.unmount;
function Sl() {
  for (var t; t = bi.shift(); ) if (t.__P && t.__H) try {
    t.__H.__h.forEach(tt), t.__H.__h.forEach(Vt), t.__H.__h = [];
  } catch (e) {
    t.__H.__h = [], E.__e(e, t.__v);
  }
}
E.__b = function(t) {
  W = null, er && er(t);
}, E.__r = function(t) {
  tr && tr(t);
  var e = (W = t.__c).__H;
  e && (Rt === W ? (e.__h = [], W.__h = [], e.__.forEach(function(n) {
    n.__N && (n.__ = n.__N), n.__V = xt, n.__N = n.i = void 0;
  })) : (e.__h.forEach(tt), e.__h.forEach(Vt), e.__h = [])), Rt = W;
}, E.diffed = function(t) {
  nr && nr(t);
  var e = t.__c;
  e && e.__H && (e.__H.__h.length && (bi.push(e) !== 1 && Xn === E.requestAnimationFrame || ((Xn = E.requestAnimationFrame) || Cl)(Sl)), e.__H.__.forEach(function(n) {
    n.i && (n.__H = n.i), n.__V !== xt && (n.__ = n.__V), n.i = void 0, n.__V = xt;
  })), Rt = W = null;
}, E.__c = function(t, e) {
  e.some(function(n) {
    try {
      n.__h.forEach(tt), n.__h = n.__h.filter(function(r) {
        return !r.__ || Vt(r);
      });
    } catch (r) {
      e.some(function(i) {
        i.__h && (i.__h = []);
      }), e = [], E.__e(r, n.__v);
    }
  }), rr && rr(t, e);
}, E.unmount = function(t) {
  ir && ir(t);
  var e, n = t.__c;
  n && n.__H && (n.__H.__.forEach(function(r) {
    try {
      tt(r);
    } catch (i) {
      e = i;
    }
  }), n.__H = void 0, e && E.__e(e, n.__v));
};
var sr = typeof requestAnimationFrame == "function";
function Cl(t) {
  var e, n = function() {
    clearTimeout(r), sr && cancelAnimationFrame(e), setTimeout(t);
  }, r = setTimeout(n, 100);
  sr && (e = requestAnimationFrame(n));
}
function tt(t) {
  var e = W, n = t.__c;
  typeof n == "function" && (t.__c = void 0, n()), W = e;
}
function Vt(t) {
  var e = W;
  t.__c = t.__(), W = e;
}
function wl(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function lr(t, e) {
  for (var n in t) if (n !== "__source" && !(n in e)) return !0;
  for (var r in e) if (r !== "__source" && t[r] !== e[r]) return !0;
  return !1;
}
function or(t) {
  this.props = t;
}
(or.prototype = new $()).isPureReactComponent = !0, or.prototype.shouldComponentUpdate = function(t, e) {
  return lr(this.props, t) || lr(this.state, e);
};
var ar = E.__b;
E.__b = function(t) {
  t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), ar && ar(t);
};
var Dl = E.__e;
E.__e = function(t, e, n, r) {
  if (t.then) {
    for (var i, s = e; s = s.__; ) if ((i = s.__c) && i.__c) return e.__e == null && (e.__e = n.__e, e.__k = n.__k), i.__c(t, e);
  }
  Dl(t, e, n, r);
};
var cr = E.unmount;
function yi(t, e, n) {
  return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), t.__c.__H = null), (t = wl({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c = null), t.__k = t.__k && t.__k.map(function(r) {
    return yi(r, e, n);
  })), t;
}
function Ai(t, e, n) {
  return t && (t.__v = null, t.__k = t.__k && t.__k.map(function(r) {
    return Ai(r, e, n);
  }), t.__c && t.__c.__P === e && (t.__e && n.insertBefore(t.__e, t.__d), t.__c.__e = !0, t.__c.__P = n)), t;
}
function Tt() {
  this.__u = 0, this.t = null, this.__b = null;
}
function Ei(t) {
  var e = t.__.__c;
  return e && e.__a && e.__a(t);
}
function Ve() {
  this.u = null, this.o = null;
}
E.unmount = function(t) {
  var e = t.__c;
  e && e.__R && e.__R(), e && t.__h === !0 && (t.type = null), cr && cr(t);
}, (Tt.prototype = new $()).__c = function(t, e) {
  var n = e.__c, r = this;
  r.t == null && (r.t = []), r.t.push(n);
  var i = Ei(r.__v), s = !1, l = function() {
    s || (s = !0, n.__R = null, i ? i(o) : o());
  };
  n.__R = l;
  var o = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var d = r.state.__a;
        r.__v.__k[0] = Ai(d, d.__c.__P, d.__c.__O);
      }
      var c;
      for (r.setState({ __a: r.__b = null }); c = r.t.pop(); ) c.forceUpdate();
    }
  }, a = e.__h === !0;
  r.__u++ || a || r.setState({ __a: r.__b = r.__v.__k[0] }), t.then(l, l);
}, Tt.prototype.componentWillUnmount = function() {
  this.t = [];
}, Tt.prototype.render = function(t, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = yi(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var i = e.__a && f(x, null, t.fallback);
  return i && (i.__h = null), [f(x, null, e.__a ? null : t.children), i];
};
var dr = function(t, e, n) {
  if (++n[1] === n[0] && t.o.delete(e), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.o.size)) for (n = t.u; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    t.u = n = n[2];
  }
};
function Rl(t) {
  return this.getChildContext = function() {
    return t.context;
  }, t.children;
}
function xl(t) {
  var e = this, n = t.i;
  e.componentWillUnmount = function() {
    Fe(null, e.l), e.l = null, e.i = null;
  }, e.i && e.i !== n && e.componentWillUnmount(), t.__v ? (e.l || (e.i = n, e.l = { nodeType: 1, parentNode: n, childNodes: [], appendChild: function(r) {
    this.childNodes.push(r), e.i.appendChild(r);
  }, insertBefore: function(r, i) {
    this.childNodes.push(r), e.i.appendChild(r);
  }, removeChild: function(r) {
    this.childNodes.splice(this.childNodes.indexOf(r) >>> 1, 1), e.i.removeChild(r);
  } }), Fe(f(Rl, { context: e.context }, t.__v), e.l)) : e.l && e.componentWillUnmount();
}
function Tl(t, e) {
  var n = f(xl, { __v: t, i: e });
  return n.containerInfo = e, n;
}
(Ve.prototype = new $()).__a = function(t) {
  var e = this, n = Ei(e.__v), r = e.o.get(t);
  return r[0]++, function(i) {
    var s = function() {
      e.props.revealOrder ? (r.push(i), dr(e, t, r)) : i();
    };
    n ? n(s) : s();
  };
}, Ve.prototype.render = function(t) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var e = ut(t.children);
  t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
  for (var n = e.length; n--; ) this.o.set(e[n], this.u = [1, 0, this.u]);
  return t.children;
}, Ve.prototype.componentDidUpdate = Ve.prototype.componentDidMount = function() {
  var t = this;
  this.o.forEach(function(e, n) {
    dr(t, n, e);
  });
};
var kl = typeof Symbol < "u" && Symbol.for && /* @__PURE__ */ Symbol.for("react.element") || 60103, Ml = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Il = typeof document < "u", Nl = function(t) {
  return (typeof Symbol < "u" && typeof /* @__PURE__ */ Symbol() == "symbol" ? /fil|che|rad/i : /fil|che|ra/i).test(t);
};
$.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
  Object.defineProperty($.prototype, t, { configurable: !0, get: function() {
    return this["UNSAFE_" + t];
  }, set: function(e) {
    Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
  } });
});
var ur = E.event;
function Ol() {
}
function Pl() {
  return this.cancelBubble;
}
function Hl() {
  return this.defaultPrevented;
}
E.event = function(t) {
  return ur && (t = ur(t)), t.persist = Ol, t.isPropagationStopped = Pl, t.isDefaultPrevented = Hl, t.nativeEvent = t;
};
var fr = { configurable: !0, get: function() {
  return this.class;
} }, hr = E.vnode;
E.vnode = function(t) {
  var e = t.type, n = t.props, r = n;
  if (typeof e == "string") {
    var i = e.indexOf("-") === -1;
    for (var s in r = {}, n) {
      var l = n[s];
      Il && s === "children" && e === "noscript" || s === "value" && "defaultValue" in n && l == null || (s === "defaultValue" && "value" in n && n.value == null ? s = "value" : s === "download" && l === !0 ? l = "" : /ondoubleclick/i.test(s) ? s = "ondblclick" : /^onchange(textarea|input)/i.test(s + e) && !Nl(n.type) ? s = "oninput" : /^onfocus$/i.test(s) ? s = "onfocusin" : /^onblur$/i.test(s) ? s = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(s) ? s = s.toLowerCase() : i && Ml.test(s) ? s = s.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : l === null && (l = void 0), /^oninput$/i.test(s) && (s = s.toLowerCase(), r[s] && (s = "oninputCapture")), r[s] = l);
    }
    e == "select" && r.multiple && Array.isArray(r.value) && (r.value = ut(n.children).forEach(function(o) {
      o.props.selected = r.value.indexOf(o.props.value) != -1;
    })), e == "select" && r.defaultValue != null && (r.value = ut(n.children).forEach(function(o) {
      o.props.selected = r.multiple ? r.defaultValue.indexOf(o.props.value) != -1 : r.defaultValue == o.props.value;
    })), t.props = r, n.class != n.className && (fr.enumerable = "className" in n, n.className != null && (r.class = n.className), Object.defineProperty(r, "className", fr));
  }
  t.$$typeof = kl, hr && hr(t);
};
var pr = E.__r;
E.__r = function(t) {
  pr && pr(t), t.__c;
};
const _i = [], Gt = /* @__PURE__ */ new Map();
function hn(t) {
  _i.push(t), Gt.forEach((e) => {
    Ci(e, t);
  });
}
function Bl(t) {
  t.isConnected && // sometimes true if SSR system simulates DOM
  t.getRootNode && Si(t.getRootNode());
}
function Si(t) {
  let e = Gt.get(t);
  if (!e || !e.isConnected) {
    if (e = t.querySelector("style[data-fullcalendar]"), !e) {
      e = document.createElement("style"), e.setAttribute("data-fullcalendar", "");
      const n = Ul();
      n && (e.nonce = n);
      const r = t === document ? document.head : t, i = t === document ? r.querySelector("script,link[rel=stylesheet],link[as=style],style") : r.firstChild;
      r.insertBefore(e, i);
    }
    Gt.set(t, e), $l(e);
  }
}
function $l(t) {
  for (const e of _i)
    Ci(t, e);
}
function Ci(t, e) {
  const { sheet: n } = t, r = n.cssRules.length;
  e.split("}").forEach((i, s) => {
    i = i.trim(), i && n.insertRule(i + "}", r + s);
  });
}
let kt;
function Ul() {
  return kt === void 0 && (kt = zl()), kt;
}
function zl() {
  const t = document.querySelector('meta[name="csp-nonce"]');
  if (t && t.hasAttribute("content"))
    return t.getAttribute("content");
  const e = document.querySelector("script[nonce]");
  return e && e.nonce || "";
}
typeof document < "u" && Si(document);
var Fl = ':root{--fc-small-font-size:.85em;--fc-page-bg-color:#fff;--fc-neutral-bg-color:hsla(0,0%,82%,.3);--fc-neutral-text-color:grey;--fc-border-color:#ddd;--fc-button-text-color:#fff;--fc-button-bg-color:#2c3e50;--fc-button-border-color:#2c3e50;--fc-button-hover-bg-color:#1e2b37;--fc-button-hover-border-color:#1a252f;--fc-button-active-bg-color:#1a252f;--fc-button-active-border-color:#151e27;--fc-event-bg-color:#3788d8;--fc-event-border-color:#3788d8;--fc-event-text-color:#fff;--fc-event-selected-overlay-color:rgba(0,0,0,.25);--fc-more-link-bg-color:#d0d0d0;--fc-more-link-text-color:inherit;--fc-event-resizer-thickness:8px;--fc-event-resizer-dot-total-width:8px;--fc-event-resizer-dot-border-width:1px;--fc-non-business-color:hsla(0,0%,84%,.3);--fc-bg-event-color:#8fdf82;--fc-bg-event-opacity:0.3;--fc-highlight-color:rgba(188,232,241,.3);--fc-today-bg-color:rgba(255,220,40,.15);--fc-now-indicator-color:red}.fc-not-allowed,.fc-not-allowed .fc-event{cursor:not-allowed}.fc{display:flex;flex-direction:column;font-size:1em}.fc,.fc *,.fc :after,.fc :before{box-sizing:border-box}.fc table{border-collapse:collapse;border-spacing:0;font-size:1em}.fc th{text-align:center}.fc td,.fc th{padding:0;vertical-align:top}.fc a[data-navlink]{cursor:pointer}.fc a[data-navlink]:hover{text-decoration:underline}.fc-direction-ltr{direction:ltr;text-align:left}.fc-direction-rtl{direction:rtl;text-align:right}.fc-theme-standard td,.fc-theme-standard th{border:1px solid var(--fc-border-color)}.fc-liquid-hack td,.fc-liquid-hack th{position:relative}@font-face{font-family:fcicons;font-style:normal;font-weight:400;src:url("data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBfAAAAC8AAAAYGNtYXAXVtKNAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZgYydxIAAAF4AAAFNGhlYWQUJ7cIAAAGrAAAADZoaGVhB20DzAAABuQAAAAkaG10eCIABhQAAAcIAAAALGxvY2ED4AU6AAAHNAAAABhtYXhwAA8AjAAAB0wAAAAgbmFtZXsr690AAAdsAAABhnBvc3QAAwAAAAAI9AAAACAAAwPAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpBgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6Qb//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAWIAjQKeAskAEwAAJSc3NjQnJiIHAQYUFwEWMjc2NCcCnuLiDQ0MJAz/AA0NAQAMJAwNDcni4gwjDQwM/wANIwz/AA0NDCMNAAAAAQFiAI0CngLJABMAACUBNjQnASYiBwYUHwEHBhQXFjI3AZ4BAA0N/wAMJAwNDeLiDQ0MJAyNAQAMIw0BAAwMDSMM4uINIwwNDQAAAAIA4gC3Ax4CngATACcAACUnNzY0JyYiDwEGFB8BFjI3NjQnISc3NjQnJiIPAQYUHwEWMjc2NCcB87e3DQ0MIw3VDQ3VDSMMDQ0BK7e3DQ0MJAzVDQ3VDCQMDQ3zuLcMJAwNDdUNIwzWDAwNIwy4twwkDA0N1Q0jDNYMDA0jDAAAAgDiALcDHgKeABMAJwAAJTc2NC8BJiIHBhQfAQcGFBcWMjchNzY0LwEmIgcGFB8BBwYUFxYyNwJJ1Q0N1Q0jDA0Nt7cNDQwjDf7V1Q0N1QwkDA0Nt7cNDQwkDLfWDCMN1Q0NDCQMt7gMIw0MDNYMIw3VDQ0MJAy3uAwjDQwMAAADAFUAAAOrA1UAMwBoAHcAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMhMjY1NCYjISIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAAVYRGRkR/qoRGRkRA1UFBAUOCQkVDAsZDf2rDRkLDBUJCA4FBQUFBQUOCQgVDAsZDQJVDRkLDBUJCQ4FBAVVAgECBQMCBwQECAX9qwQJAwQHAwMFAQICAgIBBQMDBwQDCQQCVQUIBAQHAgMFAgEC/oAZEhEZGRESGQAAAAADAFUAAAOrA1UAMwBoAIkAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMzFRQWMzI2PQEzMjY1NCYrATU0JiMiBh0BIyIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAgBkSEhmAERkZEYAZEhIZgBEZGREDVQUEBQ4JCRUMCxkN/asNGQsMFQkIDgUFBQUFBQ4JCBUMCxkNAlUNGQsMFQkJDgUEBVUCAQIFAwIHBAQIBf2rBAkDBAcDAwUBAgICAgEFAwMHBAMJBAJVBQgEBAcCAwUCAQL+gIASGRkSgBkSERmAEhkZEoAZERIZAAABAOIAjQMeAskAIAAAExcHBhQXFjI/ARcWMjc2NC8BNzY0JyYiDwEnJiIHBhQX4uLiDQ0MJAzi4gwkDA0N4uINDQwkDOLiDCQMDQ0CjeLiDSMMDQ3h4Q0NDCMN4uIMIw0MDOLiDAwNIwwAAAABAAAAAQAAa5n0y18PPPUACwQAAAAAANivOVsAAAAA2K85WwAAAAADqwNVAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAOrAAEAAAAAAAAAAAAAAAAAAAALBAAAAAAAAAAAAAAAAgAAAAQAAWIEAAFiBAAA4gQAAOIEAABVBAAAVQQAAOIAAAAAAAoAFAAeAEQAagCqAOoBngJkApoAAQAAAAsAigADAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGZjaWNvbnMAZgBjAGkAYwBvAG4Ac1ZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGZjaWNvbnMAZgBjAGkAYwBvAG4Ac2ZjaWNvbnMAZgBjAGkAYwBvAG4Ac1JlZ3VsYXIAUgBlAGcAdQBsAGEAcmZjaWNvbnMAZgBjAGkAYwBvAG4Ac0ZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=") format("truetype")}.fc-icon{speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:inline-block;font-family:fcicons!important;font-style:normal;font-variant:normal;font-weight:400;height:1em;line-height:1;text-align:center;text-transform:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:1em}.fc-icon-chevron-left:before{content:"\\e900"}.fc-icon-chevron-right:before{content:"\\e901"}.fc-icon-chevrons-left:before{content:"\\e902"}.fc-icon-chevrons-right:before{content:"\\e903"}.fc-icon-minus-square:before{content:"\\e904"}.fc-icon-plus-square:before{content:"\\e905"}.fc-icon-x:before{content:"\\e906"}.fc .fc-button{border-radius:0;font-family:inherit;font-size:inherit;line-height:inherit;margin:0;overflow:visible;text-transform:none}.fc .fc-button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}.fc .fc-button{-webkit-appearance:button}.fc .fc-button:not(:disabled){cursor:pointer}.fc .fc-button{background-color:transparent;border:1px solid transparent;border-radius:.25em;display:inline-block;font-size:1em;font-weight:400;line-height:1.5;padding:.4em .65em;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle}.fc .fc-button:hover{text-decoration:none}.fc .fc-button:focus{box-shadow:0 0 0 .2rem rgba(44,62,80,.25);outline:0}.fc .fc-button:disabled{opacity:.65}.fc .fc-button-primary{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:hover{background-color:var(--fc-button-hover-bg-color);border-color:var(--fc-button-hover-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:disabled{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button-primary:not(:disabled).fc-button-active,.fc .fc-button-primary:not(:disabled):active{background-color:var(--fc-button-active-bg-color);border-color:var(--fc-button-active-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:not(:disabled).fc-button-active:focus,.fc .fc-button-primary:not(:disabled):active:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button .fc-icon{font-size:1.5em;vertical-align:middle}.fc .fc-button-group{display:inline-flex;position:relative;vertical-align:middle}.fc .fc-button-group>.fc-button{flex:1 1 auto;position:relative}.fc .fc-button-group>.fc-button.fc-button-active,.fc .fc-button-group>.fc-button:active,.fc .fc-button-group>.fc-button:focus,.fc .fc-button-group>.fc-button:hover{z-index:1}.fc-direction-ltr .fc-button-group>.fc-button:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0;margin-left:-1px}.fc-direction-ltr .fc-button-group>.fc-button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.fc-direction-rtl .fc-button-group>.fc-button:not(:first-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.fc-direction-rtl .fc-button-group>.fc-button:not(:last-child){border-bottom-left-radius:0;border-top-left-radius:0}.fc .fc-toolbar{align-items:center;display:flex;justify-content:space-between}.fc .fc-toolbar.fc-header-toolbar{margin-bottom:1.5em}.fc .fc-toolbar.fc-footer-toolbar{margin-top:1.5em}.fc .fc-toolbar-title{font-size:1.75em;margin:0}.fc-direction-ltr .fc-toolbar>*>:not(:first-child){margin-left:.75em}.fc-direction-rtl .fc-toolbar>*>:not(:first-child){margin-right:.75em}.fc-direction-rtl .fc-toolbar-ltr{flex-direction:row-reverse}.fc .fc-scroller{-webkit-overflow-scrolling:touch;position:relative}.fc .fc-scroller-liquid{height:100%}.fc .fc-scroller-liquid-absolute{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-scroller-harness{direction:ltr;overflow:hidden;position:relative}.fc .fc-scroller-harness-liquid{height:100%}.fc-direction-rtl .fc-scroller-harness>.fc-scroller{direction:rtl}.fc-theme-standard .fc-scrollgrid{border:1px solid var(--fc-border-color)}.fc .fc-scrollgrid,.fc .fc-scrollgrid table{table-layout:fixed;width:100%}.fc .fc-scrollgrid table{border-left-style:hidden;border-right-style:hidden;border-top-style:hidden}.fc .fc-scrollgrid{border-bottom-width:0;border-collapse:separate;border-right-width:0}.fc .fc-scrollgrid-liquid{height:100%}.fc .fc-scrollgrid-section,.fc .fc-scrollgrid-section table,.fc .fc-scrollgrid-section>td{height:1px}.fc .fc-scrollgrid-section-liquid>td{height:100%}.fc .fc-scrollgrid-section>*{border-left-width:0;border-top-width:0}.fc .fc-scrollgrid-section-footer>*,.fc .fc-scrollgrid-section-header>*{border-bottom-width:0}.fc .fc-scrollgrid-section-body table,.fc .fc-scrollgrid-section-footer table{border-bottom-style:hidden}.fc .fc-scrollgrid-section-sticky>*{background:var(--fc-page-bg-color);position:sticky;z-index:3}.fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky>*{top:0}.fc .fc-scrollgrid-section-footer.fc-scrollgrid-section-sticky>*{bottom:0}.fc .fc-scrollgrid-sticky-shim{height:1px;margin-bottom:-1px}.fc-sticky{position:sticky}.fc .fc-view-harness{flex-grow:1;position:relative}.fc .fc-view-harness-active>.fc-view{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-col-header-cell-cushion{display:inline-block;padding:2px 4px}.fc .fc-bg-event,.fc .fc-highlight,.fc .fc-non-business{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-non-business{background:var(--fc-non-business-color)}.fc .fc-bg-event{background:var(--fc-bg-event-color);opacity:var(--fc-bg-event-opacity)}.fc .fc-bg-event .fc-event-title{font-size:var(--fc-small-font-size);font-style:italic;margin:.5em}.fc .fc-highlight{background:var(--fc-highlight-color)}.fc .fc-cell-shaded,.fc .fc-day-disabled{background:var(--fc-neutral-bg-color)}a.fc-event,a.fc-event:hover{text-decoration:none}.fc-event.fc-event-draggable,.fc-event[href]{cursor:pointer}.fc-event .fc-event-main{position:relative;z-index:2}.fc-event-dragging:not(.fc-event-selected){opacity:.75}.fc-event-dragging.fc-event-selected{box-shadow:0 2px 7px rgba(0,0,0,.3)}.fc-event .fc-event-resizer{display:none;position:absolute;z-index:4}.fc-event-selected .fc-event-resizer,.fc-event:hover .fc-event-resizer{display:block}.fc-event-selected .fc-event-resizer{background:var(--fc-page-bg-color);border-color:inherit;border-radius:calc(var(--fc-event-resizer-dot-total-width)/2);border-style:solid;border-width:var(--fc-event-resizer-dot-border-width);height:var(--fc-event-resizer-dot-total-width);width:var(--fc-event-resizer-dot-total-width)}.fc-event-selected .fc-event-resizer:before{bottom:-20px;content:"";left:-20px;position:absolute;right:-20px;top:-20px}.fc-event-selected,.fc-event:focus{box-shadow:0 2px 5px rgba(0,0,0,.2)}.fc-event-selected:before,.fc-event:focus:before{bottom:0;content:"";left:0;position:absolute;right:0;top:0;z-index:3}.fc-event-selected:after,.fc-event:focus:after{background:var(--fc-event-selected-overlay-color);bottom:-1px;content:"";left:-1px;position:absolute;right:-1px;top:-1px;z-index:1}.fc-h-event{background-color:var(--fc-event-bg-color);border:1px solid var(--fc-event-border-color);display:block}.fc-h-event .fc-event-main{color:var(--fc-event-text-color)}.fc-h-event .fc-event-main-frame{display:flex}.fc-h-event .fc-event-time{max-width:100%;overflow:hidden}.fc-h-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-width:0}.fc-h-event .fc-event-title{display:inline-block;left:0;max-width:100%;overflow:hidden;right:0;vertical-align:top}.fc-h-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-start),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-end){border-bottom-left-radius:0;border-left-width:0;border-top-left-radius:0}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-end),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-start){border-bottom-right-radius:0;border-right-width:0;border-top-right-radius:0}.fc-h-event:not(.fc-event-selected) .fc-event-resizer{bottom:0;top:0;width:var(--fc-event-resizer-thickness)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end{cursor:w-resize;left:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start{cursor:e-resize;right:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-h-event.fc-event-selected .fc-event-resizer{margin-top:calc(var(--fc-event-resizer-dot-total-width)*-.5);top:50%}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-start,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-end{left:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-end,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-start{right:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc .fc-popover{box-shadow:0 2px 6px rgba(0,0,0,.15);position:absolute;z-index:9999}.fc .fc-popover-header{align-items:center;display:flex;flex-direction:row;justify-content:space-between;padding:3px 4px}.fc .fc-popover-title{margin:0 2px}.fc .fc-popover-close{cursor:pointer;font-size:1.1em;opacity:.65}.fc-theme-standard .fc-popover{background:var(--fc-page-bg-color);border:1px solid var(--fc-border-color)}.fc-theme-standard .fc-popover-header{background:var(--fc-neutral-bg-color)}';
hn(Fl);
class pn {
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
function Ll(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function G(t, e) {
  if (t.closest)
    return t.closest(e);
  if (!document.documentElement.contains(t))
    return null;
  do {
    if (Wl(t, e))
      return t;
    t = t.parentElement || t.parentNode;
  } while (t !== null && t.nodeType === 1);
  return null;
}
function Wl(t, e) {
  return (t.matches || t.matchesSelector || t.msMatchesSelector).call(t, e);
}
function jl(t, e) {
  let n = t instanceof HTMLElement ? [t] : t, r = [];
  for (let i = 0; i < n.length; i += 1) {
    let s = n[i].querySelectorAll(e);
    for (let l = 0; l < s.length; l += 1)
      r.push(s[l]);
  }
  return r;
}
const Vl = /(top|left|right|bottom|width|height)$/i;
function Gl(t, e) {
  for (let n in e)
    wi(t, n, e[n]);
}
function wi(t, e, n) {
  n == null ? t.style[e] = "" : typeof n == "number" && Vl.test(e) ? t.style[e] = `${n}px` : t.style[e] = n;
}
function Ql(t) {
  var e, n;
  return (n = (e = t.composedPath) === null || e === void 0 ? void 0 : e.call(t)[0]) !== null && n !== void 0 ? n : t.target;
}
let gr = 0;
function wt() {
  return gr += 1, "fc-dom-" + gr;
}
function ql(t, e) {
  return (n) => {
    let r = G(n.target, t);
    r && e.call(r, n, r);
  };
}
function Di(t, e, n, r) {
  let i = ql(n, r);
  return t.addEventListener(e, i), () => {
    t.removeEventListener(e, i);
  };
}
function Zl(t, e, n, r) {
  let i;
  return Di(t, "mouseover", e, (s, l) => {
    if (l !== i) {
      i = l, n(s, l);
      let o = (a) => {
        i = null, r(a, l), l.removeEventListener("mouseleave", o);
      };
      l.addEventListener("mouseleave", o);
    }
  });
}
function Ri(t) {
  return Object.assign({ onClick: t }, xi(t));
}
function xi(t) {
  return {
    tabIndex: 0,
    onKeyDown(e) {
      (e.key === "Enter" || e.key === " ") && (t(e), e.preventDefault());
    }
  };
}
let mr = 0;
function me() {
  return mr += 1, String(mr);
}
function Yl(t) {
  let e = [], n = [], r, i;
  for (typeof t == "string" ? n = t.split(/\s*,\s*/) : typeof t == "function" ? n = [t] : Array.isArray(t) && (n = t), r = 0; r < n.length; r += 1)
    i = n[r], typeof i == "string" ? e.push(i.charAt(0) === "-" ? { field: i.substring(1), order: -1 } : { field: i, order: 1 }) : typeof i == "function" && e.push({ func: i });
  return e;
}
function Jl(t, e, n) {
  let r, i;
  for (r = 0; r < n.length; r += 1)
    if (i = Kl(t, e, n[r]), i)
      return i;
  return 0;
}
function Kl(t, e, n) {
  return n.func ? n.func(t, e) : Xl(t[n.field], e[n.field]) * (n.order || 1);
}
function Xl(t, e) {
  return !t && !e ? 0 : e == null ? -1 : t == null ? 1 : typeof t == "string" || typeof e == "string" ? String(t).localeCompare(String(e)) : t - e;
}
function _e(t, e) {
  let n = String(t);
  return "000".substr(0, e - n.length) + n;
}
function He(t, e, n) {
  return typeof t == "function" ? t(...e) : typeof t == "string" ? e.reduce((r, i, s) => r.replace("$" + s, i || ""), t) : n;
}
function nt(t) {
  return t % 1 === 0;
}
function eo(t) {
  let e = t.querySelector(".fc-scrollgrid-shrink-frame"), n = t.querySelector(".fc-scrollgrid-shrink-cushion");
  if (!e)
    throw new Error("needs fc-scrollgrid-shrink-frame className");
  if (!n)
    throw new Error("needs fc-scrollgrid-shrink-cushion className");
  return t.getBoundingClientRect().width - e.getBoundingClientRect().width + // the cell padding+border
  n.getBoundingClientRect().width;
}
const vr = ["years", "months", "days", "milliseconds"], to = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
function w(t, e) {
  return typeof t == "string" ? no(t) : typeof t == "object" && t ? br(t) : typeof t == "number" ? br({ [e || "milliseconds"]: t }) : null;
}
function no(t) {
  let e = to.exec(t);
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
function br(t) {
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
function ro(t, e) {
  return t.years === e.years && t.months === e.months && t.days === e.days && t.milliseconds === e.milliseconds;
}
function Qt(t, e) {
  return {
    years: t.years + e.years,
    months: t.months + e.months,
    days: t.days + e.days,
    milliseconds: t.milliseconds + e.milliseconds
  };
}
function io(t, e) {
  return {
    years: t.years - e.years,
    months: t.months - e.months,
    days: t.days - e.days,
    milliseconds: t.milliseconds - e.milliseconds
  };
}
function so(t, e) {
  return {
    years: t.years * e,
    months: t.months * e,
    days: t.days * e,
    milliseconds: t.milliseconds * e
  };
}
function lo(t) {
  return Se(t) / 365;
}
function oo(t) {
  return Se(t) / 30;
}
function Se(t) {
  return F(t) / 864e5;
}
function F(t) {
  return t.years * (365 * 864e5) + t.months * (30 * 864e5) + t.days * 864e5 + t.milliseconds;
}
function gn(t, e) {
  let n = null;
  for (let r = 0; r < vr.length; r += 1) {
    let i = vr[r];
    if (e[i]) {
      let s = t[i] / e[i];
      if (!nt(s) || n !== null && n !== s)
        return null;
      n = s;
    } else if (t[i])
      return null;
  }
  return n;
}
function qt(t) {
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
function ne(t, e, n) {
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
const ao = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
function yr(t, e) {
  let n = X(t);
  return n[2] += e * 7, B(n);
}
function N(t, e) {
  let n = X(t);
  return n[2] += e, B(n);
}
function re(t, e) {
  let n = X(t);
  return n[6] += e, B(n);
}
function co(t, e) {
  return ve(t, e) / 7;
}
function ve(t, e) {
  return (e.valueOf() - t.valueOf()) / (1e3 * 60 * 60 * 24);
}
function uo(t, e) {
  return (e.valueOf() - t.valueOf()) / (1e3 * 60 * 60);
}
function fo(t, e) {
  return (e.valueOf() - t.valueOf()) / (1e3 * 60);
}
function ho(t, e) {
  return (e.valueOf() - t.valueOf()) / 1e3;
}
function po(t, e) {
  let n = k(t), r = k(e);
  return {
    years: 0,
    months: 0,
    days: Math.round(ve(n, r)),
    milliseconds: e.valueOf() - r.valueOf() - (t.valueOf() - n.valueOf())
  };
}
function go(t, e) {
  let n = ft(t, e);
  return n !== null && n % 7 === 0 ? n / 7 : null;
}
function ft(t, e) {
  return ee(t) === ee(e) ? Math.round(ve(t, e)) : null;
}
function k(t) {
  return B([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ]);
}
function mo(t) {
  return B([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours()
  ]);
}
function vo(t) {
  return B([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours(),
    t.getUTCMinutes()
  ]);
}
function bo(t) {
  return B([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours(),
    t.getUTCMinutes(),
    t.getUTCSeconds()
  ]);
}
function yo(t, e, n) {
  let r = t.getUTCFullYear(), i = Mt(t, r, e, n);
  if (i < 1)
    return Mt(t, r - 1, e, n);
  let s = Mt(t, r + 1, e, n);
  return s >= 1 ? Math.min(i, s) : i;
}
function Mt(t, e, n, r) {
  let i = B([e, 0, 1 + Ao(e, n, r)]), s = k(t), l = Math.round(ve(i, s));
  return Math.floor(l / 7) + 1;
}
function Ao(t, e, n) {
  let r = 7 + e - n;
  return -((7 + B([t, 0, r]).getUTCDay() - e) % 7) + r - 1;
}
function Ar(t) {
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
function Er(t) {
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
function X(t) {
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
function B(t) {
  return t.length === 1 && (t = t.concat([0])), new Date(Date.UTC(...t));
}
function Ti(t) {
  return !isNaN(t.valueOf());
}
function ee(t) {
  return t.getUTCHours() * 1e3 * 60 * 60 + t.getUTCMinutes() * 1e3 * 60 + t.getUTCSeconds() * 1e3 + t.getUTCMilliseconds();
}
function ki(t, e, n = !1) {
  let r = t.toISOString();
  return r = r.replace(".000", ""), n && (r = r.replace("T00:00:00Z", "")), r.length > 10 && (e == null ? r = r.replace("Z", "") : e !== 0 && (r = r.replace("Z", vn(e, !0)))), r;
}
function mn(t) {
  return t.toISOString().replace(/T.*$/, "");
}
function Eo(t) {
  return t.toISOString().match(/^\d{4}-\d{2}/)[0];
}
function _o(t) {
  return _e(t.getUTCHours(), 2) + ":" + _e(t.getUTCMinutes(), 2) + ":" + _e(t.getUTCSeconds(), 2);
}
function vn(t, e = !1) {
  let n = t < 0 ? "-" : "+", r = Math.abs(t), i = Math.floor(r / 60), s = Math.round(r % 60);
  return e ? `${n + _e(i, 2)}:${_e(s, 2)}` : `GMT${n}${i}${s ? `:${_e(s, 2)}` : ""}`;
}
function _(t, e, n) {
  let r, i;
  return function(...s) {
    if (!r)
      i = t.apply(this, s);
    else if (!ne(r, s)) {
      let l = t.apply(this, s);
      (!e || !e(l, i)) && (i = l);
    }
    return r = s, i;
  };
}
function rt(t, e, n) {
  let r, i;
  return (s) => (r ? L(r, s) || (i = t.call(this, s)) : i = t.call(this, s), r = s, i);
}
const It = {
  week: 3,
  separator: 9,
  omitZeroMinute: 9,
  meridiem: 9,
  omitCommas: 9
}, ht = {
  timeZoneName: 7,
  era: 6,
  year: 5,
  month: 4,
  day: 2,
  weekday: 2,
  hour: 1,
  minute: 1,
  second: 1
}, Ge = /\s*([ap])\.?m\.?/i, So = /,/g, Co = /\s+/g, wo = /\u200e/g, Do = /UTC|GMT/;
class Ro {
  constructor(e) {
    let n = {}, r = {}, i = 9;
    for (let s in e)
      s in It ? (r[s] = e[s], It[s] < 9 && (i = Math.min(It[s], i))) : (n[s] = e[s], s in ht && (i = Math.min(ht[s], i)));
    this.standardDateProps = n, this.extendedSettings = r, this.smallestUnitNum = i, this.buildFormattingFunc = _(_r);
  }
  format(e, n) {
    return this.buildFormattingFunc(this.standardDateProps, this.extendedSettings, n)(e);
  }
  formatRange(e, n, r, i) {
    let { standardDateProps: s, extendedSettings: l } = this, o = No(e.marker, n.marker, r.calendarSystem);
    if (!o)
      return this.format(e, r);
    let a = o;
    a > 1 && // the two dates are different in a way that's larger scale than time
    (s.year === "numeric" || s.year === "2-digit") && (s.month === "numeric" || s.month === "2-digit") && (s.day === "numeric" || s.day === "2-digit") && (a = 1);
    let d = this.format(e, r), c = this.format(n, r);
    if (d === c)
      return d;
    let h = Oo(s, a), p = _r(h, l, r), u = p(e), m = p(n), v = Po(d, u, c, m), b = l.separator || i || r.defaultSeparator || "";
    return v ? v.before + u + b + m + v.after : d + b + c;
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
function _r(t, e, n) {
  let r = Object.keys(t).length;
  return r === 1 && t.timeZoneName === "short" ? (i) => vn(i.timeZoneOffset) : r === 0 && e.week ? (i) => Io(n.computeWeekNumber(i.marker), n.weekText, n.weekTextLong, n.locale, e.week) : xo(t, e, n);
}
function xo(t, e, n) {
  t = Object.assign({}, t), e = Object.assign({}, e), To(t, e), t.timeZone = "UTC";
  let r = new Intl.DateTimeFormat(n.locale.codes, t), i;
  if (e.omitZeroMinute) {
    let s = Object.assign({}, t);
    delete s.minute, i = new Intl.DateTimeFormat(n.locale.codes, s);
  }
  return (s) => {
    let { marker: l } = s, o;
    i && !l.getUTCMinutes() ? o = i : o = r;
    let a = o.format(l);
    return ko(a, s, t, e, n);
  };
}
function To(t, e) {
  t.timeZoneName && (t.hour || (t.hour = "2-digit"), t.minute || (t.minute = "2-digit")), t.timeZoneName === "long" && (t.timeZoneName = "short"), e.omitZeroMinute && (t.second || t.millisecond) && delete e.omitZeroMinute;
}
function ko(t, e, n, r, i) {
  return t = t.replace(wo, ""), n.timeZoneName === "short" && (t = Mo(t, i.timeZone === "UTC" || e.timeZoneOffset == null ? "UTC" : (
    // important to normalize for IE, which does "GMT"
    vn(e.timeZoneOffset)
  ))), r.omitCommas && (t = t.replace(So, "").trim()), r.omitZeroMinute && (t = t.replace(":00", "")), r.meridiem === !1 ? t = t.replace(Ge, "").trim() : r.meridiem === "narrow" ? t = t.replace(Ge, (s, l) => l.toLocaleLowerCase()) : r.meridiem === "short" ? t = t.replace(Ge, (s, l) => `${l.toLocaleLowerCase()}m`) : r.meridiem === "lowercase" && (t = t.replace(Ge, (s) => s.toLocaleLowerCase())), t = t.replace(Co, " "), t = t.trim(), t;
}
function Mo(t, e) {
  let n = !1;
  return t = t.replace(Do, () => (n = !0, e)), n || (t += ` ${e}`), t;
}
function Io(t, e, n, r, i) {
  let s = [];
  return i === "long" ? s.push(n) : (i === "short" || i === "narrow") && s.push(e), (i === "long" || i === "short") && s.push(" "), s.push(r.simpleNumberFormat.format(t)), r.options.direction === "rtl" && s.reverse(), s.join("");
}
function No(t, e, n) {
  return n.getMarkerYear(t) !== n.getMarkerYear(e) ? 5 : n.getMarkerMonth(t) !== n.getMarkerMonth(e) ? 4 : n.getMarkerDay(t) !== n.getMarkerDay(e) ? 2 : ee(t) !== ee(e) ? 1 : 0;
}
function Oo(t, e) {
  let n = {};
  for (let r in t)
    (!(r in ht) || // not a date part prop (like timeZone)
    ht[r] <= e) && (n[r] = t[r]);
  return n;
}
function Po(t, e, n, r) {
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
      let h = n.substr(a);
      if (l === c && o === h)
        return {
          before: l,
          after: o
        };
    }
  }
  return null;
}
function Sr(t, e) {
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
function pt(t, e, n, r) {
  let i = Sr(t, n.calendarSystem), s = e ? Sr(e, n.calendarSystem) : null;
  return {
    date: i,
    start: i,
    end: s,
    timeZone: n.timeZone,
    localeCodes: n.locale.codes,
    defaultSeparator: r || n.defaultSeparator
  };
}
class Ho {
  constructor(e) {
    this.cmdStr = e;
  }
  format(e, n, r) {
    return n.cmdFormatter(this.cmdStr, pt(e, null, n, r));
  }
  formatRange(e, n, r, i) {
    return r.cmdFormatter(this.cmdStr, pt(e, n, r, i));
  }
}
class Bo {
  constructor(e) {
    this.func = e;
  }
  format(e, n, r) {
    return this.func(pt(e, null, n, r));
  }
  formatRange(e, n, r, i) {
    return this.func(pt(e, n, r, i));
  }
}
function M(t) {
  return typeof t == "object" && t ? new Ro(t) : typeof t == "string" ? new Ho(t) : typeof t == "function" ? new Bo(t) : null;
}
const Cr = {
  navLinkDayClick: g,
  navLinkWeekClick: g,
  duration: w,
  bootstrapFontAwesome: g,
  buttonIcons: g,
  customButtons: g,
  defaultAllDayEventDuration: w,
  defaultTimedEventDuration: w,
  nextDayThreshold: w,
  scrollTime: w,
  scrollTimeReset: Boolean,
  slotMinTime: w,
  slotMaxTime: w,
  dayPopoverFormat: M,
  slotDuration: w,
  snapDuration: w,
  headerToolbar: g,
  footerToolbar: g,
  defaultRangeSeparator: String,
  titleRangeSeparator: String,
  forceEventDuration: Boolean,
  dayHeaders: Boolean,
  dayHeaderFormat: M,
  dayHeaderClassNames: g,
  dayHeaderContent: g,
  dayHeaderDidMount: g,
  dayHeaderWillUnmount: g,
  dayCellClassNames: g,
  dayCellContent: g,
  dayCellDidMount: g,
  dayCellWillUnmount: g,
  initialView: String,
  aspectRatio: Number,
  weekends: Boolean,
  weekNumberCalculation: g,
  weekNumbers: Boolean,
  weekNumberClassNames: g,
  weekNumberContent: g,
  weekNumberDidMount: g,
  weekNumberWillUnmount: g,
  editable: Boolean,
  viewClassNames: g,
  viewDidMount: g,
  viewWillUnmount: g,
  nowIndicator: Boolean,
  nowIndicatorSnap: g,
  nowIndicatorClassNames: g,
  nowIndicatorContent: g,
  nowIndicatorDidMount: g,
  nowIndicatorWillUnmount: g,
  showNonCurrentDates: Boolean,
  lazyFetching: Boolean,
  startParam: String,
  endParam: String,
  timeZoneParam: String,
  timeZone: String,
  locales: g,
  locale: g,
  themeSystem: String,
  dragRevertDuration: Number,
  dragScroll: Boolean,
  allDayMaintainDuration: Boolean,
  unselectAuto: Boolean,
  dropAccept: g,
  eventOrder: Yl,
  eventOrderStrict: Boolean,
  handleWindowResize: Boolean,
  windowResizeDelay: Number,
  longPressDelay: Number,
  eventDragMinDistance: Number,
  expandRows: Boolean,
  height: g,
  contentHeight: g,
  direction: String,
  weekNumberFormat: M,
  eventResizableFromStart: Boolean,
  displayEventTime: Boolean,
  displayEventEnd: Boolean,
  weekText: String,
  weekTextLong: String,
  progressiveEventRendering: Boolean,
  businessHours: g,
  initialDate: g,
  now: g,
  eventDataTransform: g,
  stickyHeaderDates: g,
  stickyFooterScrollbar: g,
  viewHeight: g,
  defaultAllDay: Boolean,
  eventSourceFailure: g,
  eventSourceSuccess: g,
  eventDisplay: String,
  eventStartEditable: Boolean,
  eventDurationEditable: Boolean,
  eventOverlap: g,
  eventConstraint: g,
  eventAllow: g,
  eventBackgroundColor: String,
  eventBorderColor: String,
  eventTextColor: String,
  eventColor: String,
  eventClassNames: g,
  eventContent: g,
  eventDidMount: g,
  eventWillUnmount: g,
  selectConstraint: g,
  selectOverlap: g,
  selectAllow: g,
  droppable: Boolean,
  unselectCancel: String,
  slotLabelFormat: g,
  slotLaneClassNames: g,
  slotLaneContent: g,
  slotLaneDidMount: g,
  slotLaneWillUnmount: g,
  slotLabelClassNames: g,
  slotLabelContent: g,
  slotLabelDidMount: g,
  slotLabelWillUnmount: g,
  dayMaxEvents: g,
  dayMaxEventRows: g,
  dayMinWidth: Number,
  slotLabelInterval: w,
  allDayText: String,
  allDayClassNames: g,
  allDayContent: g,
  allDayDidMount: g,
  allDayWillUnmount: g,
  slotMinWidth: Number,
  navLinks: Boolean,
  eventTimeFormat: M,
  rerenderDelay: Number,
  moreLinkText: g,
  moreLinkHint: g,
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
  plugins: g,
  firstDay: Number,
  dayCount: Number,
  dateAlignment: String,
  dateIncrement: w,
  hiddenDays: g,
  fixedWeekCount: Boolean,
  validRange: g,
  visibleRange: g,
  titleFormat: g,
  eventInteractive: Boolean,
  // only used by list-view, but languages define the value, so we need it in base options
  noEventsText: String,
  viewHint: g,
  navLinkHint: g,
  closeHint: String,
  timeHint: String,
  eventHint: String,
  moreLinkClick: g,
  moreLinkClassNames: g,
  moreLinkContent: g,
  moreLinkDidMount: g,
  moreLinkWillUnmount: g,
  monthStartFormat: M,
  // for connectors
  // (can't be part of plugin system b/c must be provided at runtime)
  handleCustomRendering: g,
  customRenderingMetaMap: g,
  customRenderingReplaces: Boolean
}, Be = {
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
}, wr = {
  datesSet: g,
  eventsSet: g,
  eventAdd: g,
  eventChange: g,
  eventRemove: g,
  windowResize: g,
  eventClick: g,
  eventMouseEnter: g,
  eventMouseLeave: g,
  select: g,
  unselect: g,
  loading: g,
  // internal
  _unmount: g,
  _beforeprint: g,
  _afterprint: g,
  _noEventDrop: g,
  _noEventResize: g,
  _resize: g,
  _scrollRequest: g
}, Dr = {
  buttonText: g,
  buttonHints: g,
  views: g,
  plugins: g,
  initialEvents: g,
  events: g,
  eventSources: g
}, ae = {
  headerToolbar: ce,
  footerToolbar: ce,
  buttonText: ce,
  buttonHints: ce,
  buttonIcons: ce,
  dateIncrement: ce,
  plugins: Qe,
  events: Qe,
  eventSources: Qe,
  resources: Qe
};
function ce(t, e) {
  return typeof t == "object" && typeof e == "object" && t && e ? L(t, e) : t === e;
}
function Qe(t, e) {
  return Array.isArray(t) && Array.isArray(e) ? ne(t, e) : t === e;
}
const $o = {
  type: String,
  component: g,
  buttonText: String,
  buttonTextKey: String,
  dateProfileGeneratorClass: g,
  usesMinMaxTime: Boolean,
  classNames: g,
  content: g,
  didMount: g,
  willUnmount: g
};
function Nt(t) {
  return yn(t, ae);
}
function bn(t, e) {
  let n = {}, r = {};
  for (let i in e)
    i in t && (n[i] = e[i](t[i]));
  for (let i in t)
    i in e || (r[i] = t[i]);
  return { refined: n, extra: r };
}
function g(t) {
  return t;
}
const { hasOwnProperty: gt } = Object.prototype;
function yn(t, e) {
  let n = {};
  if (e) {
    for (let r in e)
      if (e[r] === ce) {
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
        i.length && (n[r] = yn(i));
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
function pe(t, e) {
  let n = {};
  for (let r in t)
    n[r] = e(t[r], r);
  return n;
}
function Mi(t) {
  let e = {};
  for (let n of t)
    e[n] = !0;
  return e;
}
function An(t) {
  let e = [];
  for (let n in t)
    e.push(t[n]);
  return e;
}
function L(t, e) {
  if (t === e)
    return !0;
  for (let n in t)
    if (gt.call(t, n) && !(n in e))
      return !1;
  for (let n in e)
    if (gt.call(e, n) && t[n] !== e[n])
      return !1;
  return !0;
}
const Uo = /^on[A-Z]/;
function zo(t, e) {
  const n = Fo(t, e);
  for (let r of n)
    if (!Uo.test(r))
      return !1;
  return !0;
}
function Fo(t, e) {
  let n = [];
  for (let r in t)
    gt.call(t, r) && (r in e || n.push(r));
  for (let r in e)
    gt.call(e, r) && t[r] !== e[r] && n.push(r);
  return n;
}
function Ot(t, e, n = {}) {
  if (t === e)
    return !0;
  for (let r in e)
    if (!(r in t && Lo(t[r], e[r], n[r]))) return !1;
  for (let r in t)
    if (!(r in e))
      return !1;
  return !0;
}
function Lo(t, e, n) {
  return t === e || n === !0 ? !0 : n ? n(t, e) : !1;
}
function Wo(t, e = 0, n, r = 1) {
  let i = [];
  n == null && (n = Object.keys(t).length);
  for (let s = e; s < n; s += r) {
    let l = t[s];
    l !== void 0 && i.push(l);
  }
  return i;
}
let Ii = {};
function jo(t, e) {
  Ii[t] = e;
}
function Vo(t) {
  return new Ii[t]();
}
class Go {
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
    return B(e);
  }
  markerToArray(e) {
    return X(e);
  }
}
jo("gregory", Go);
const Qo = /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;
function qo(t) {
  let e = Qo.exec(t);
  if (e) {
    let n = new Date(Date.UTC(Number(e[1]), e[3] ? Number(e[3]) - 1 : 0, Number(e[5] || 1), Number(e[7] || 0), Number(e[8] || 0), Number(e[10] || 0), e[12] ? +`0.${e[12]}` * 1e3 : 0));
    if (Ti(n)) {
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
class Zo {
  constructor(e) {
    let n = this.timeZone = e.timeZone, r = n !== "local" && n !== "UTC";
    e.namedTimeZoneImpl && r && (this.namedTimeZoneImpl = new e.namedTimeZoneImpl(n)), this.canComputeOffset = !!(!r || this.namedTimeZoneImpl), this.calendarSystem = Vo(e.calendarSystem), this.locale = e.locale, this.weekDow = e.locale.week.dow, this.weekDoy = e.locale.week.doy, e.weekNumberCalculation === "ISO" && (this.weekDow = 1, this.weekDoy = 4), typeof e.firstDay == "number" && (this.weekDow = e.firstDay), typeof e.weekNumberCalculation == "function" && (this.weekNumberFunc = e.weekNumberCalculation), this.weekText = e.weekText != null ? e.weekText : e.locale.options.weekText, this.weekTextLong = (e.weekTextLong != null ? e.weekTextLong : e.locale.options.weekTextLong) || this.weekText, this.cmdFormatter = e.cmdFormatter, this.defaultSeparator = e.defaultSeparator;
  }
  // Creating / Parsing
  createMarker(e) {
    let n = this.createMarkerMeta(e);
    return n === null ? null : n.marker;
  }
  createNowMarker() {
    return this.canComputeOffset ? this.timestampToMarker((/* @__PURE__ */ new Date()).valueOf()) : B(Ar(/* @__PURE__ */ new Date()));
  }
  createMarkerMeta(e) {
    if (typeof e == "string")
      return this.parse(e);
    let n = null;
    return typeof e == "number" ? n = this.timestampToMarker(e) : e instanceof Date ? (e = e.valueOf(), isNaN(e) || (n = this.timestampToMarker(e))) : Array.isArray(e) && (n = B(e)), n === null || !Ti(n) ? null : { marker: n, isTimeUnspecified: !1, forcedTzo: null };
  }
  parse(e) {
    let n = qo(e);
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
    return ee(e) === ee(n) && r.getMarkerDay(e) === r.getMarkerDay(n) && r.getMarkerMonth(e) === r.getMarkerMonth(n) ? r.getMarkerYear(n) - r.getMarkerYear(e) : null;
  }
  diffWholeMonths(e, n) {
    let { calendarSystem: r } = this;
    return ee(e) === ee(n) && r.getMarkerDay(e) === r.getMarkerDay(n) ? r.getMarkerMonth(n) - r.getMarkerMonth(e) + (r.getMarkerYear(n) - r.getMarkerYear(e)) * 12 : null;
  }
  // Range / Duration
  greatestWholeUnit(e, n) {
    let r = this.diffWholeYears(e, n);
    return r !== null ? { unit: "year", value: r } : (r = this.diffWholeMonths(e, n), r !== null ? { unit: "month", value: r } : (r = go(e, n), r !== null ? { unit: "week", value: r } : (r = ft(e, n), r !== null ? { unit: "day", value: r } : (r = uo(e, n), nt(r) ? { unit: "hour", value: r } : (r = fo(e, n), nt(r) ? { unit: "minute", value: r } : (r = ho(e, n), nt(r) ? { unit: "second", value: r } : { unit: "millisecond", value: n.valueOf() - e.valueOf() }))))));
  }
  countDurationsBetween(e, n, r) {
    let i;
    return r.years && (i = this.diffWholeYears(e, n), i !== null) ? i / lo(r) : r.months && (i = this.diffWholeMonths(e, n), i !== null) ? i / oo(r) : r.days && (i = ft(e, n), i !== null) ? i / Se(r) : (n.valueOf() - e.valueOf()) / F(r);
  }
  // Start-Of
  // these DON'T return zoned-dates. only UTC start-of dates
  startOf(e, n) {
    return n === "year" ? this.startOfYear(e) : n === "month" ? this.startOfMonth(e) : n === "week" ? this.startOfWeek(e) : n === "day" ? k(e) : n === "hour" ? mo(e) : n === "minute" ? vo(e) : n === "second" ? bo(e) : null;
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
    return this.weekNumberFunc ? this.weekNumberFunc(this.toDate(e)) : yo(e, this.weekDow, this.weekDoy);
  }
  // TODO: choke on timeZoneName: long
  format(e, n, r = {}) {
    return n.format({
      marker: e,
      timeZoneOffset: r.forcedTzo != null ? r.forcedTzo : this.offsetForMarker(e)
    }, this);
  }
  formatRange(e, n, r, i = {}) {
    return i.isEndExclusive && (n = re(n, -1)), r.formatRange({
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
    return n.omitTimeZoneOffset || (n.forcedTzo != null ? r = n.forcedTzo : r = this.offsetForMarker(e)), ki(e, r, n.omitTime);
  }
  // TimeZone
  timestampToMarker(e) {
    return this.timeZone === "local" ? B(Ar(new Date(e))) : this.timeZone === "UTC" || !this.namedTimeZoneImpl ? new Date(e) : B(this.namedTimeZoneImpl.timestampToArray(e));
  }
  offsetForMarker(e) {
    return this.timeZone === "local" ? -Er(X(e)).getTimezoneOffset() : this.timeZone === "UTC" ? 0 : this.namedTimeZoneImpl ? this.namedTimeZoneImpl.offsetForArray(X(e)) : null;
  }
  // Conversion
  toDate(e, n) {
    return this.timeZone === "local" ? Er(X(e)) : this.timeZone === "UTC" ? new Date(e.valueOf()) : this.namedTimeZoneImpl ? new Date(e.valueOf() - this.namedTimeZoneImpl.offsetForArray(X(e)) * 1e3 * 60) : new Date(e.valueOf() - (n || 0));
  }
}
class We {
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
We.prototype.classes = {};
We.prototype.iconClasses = {};
We.prototype.baseIconClass = "";
We.prototype.iconOverridePrefix = "";
function mt(t) {
  t();
  let e = E.debounceRendering, n = [];
  function r(i) {
    n.push(i);
  }
  for (E.debounceRendering = r, Fe(f(Yo, {}), document.createElement("div")); n.length; )
    n.shift()();
  E.debounceRendering = e;
}
class Yo extends $ {
  render() {
    return f("div", {});
  }
  componentDidMount() {
    this.setState({});
  }
}
function Ni(t) {
  let e = _l(t), n = e.Provider;
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
class Jo {
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
const Y = Ni({});
function Ko(t, e, n, r, i, s, l, o, a, d, c, h, p, u) {
  return {
    dateEnv: i,
    nowManager: s,
    options: n,
    pluginHooks: o,
    emitter: c,
    dispatch: a,
    getCurrentData: d,
    calendarApi: h,
    viewSpec: t,
    viewApi: e,
    dateProfileGenerator: r,
    theme: l,
    isRtl: n.direction === "rtl",
    addResizeHandler(m) {
      c.on("_resize", m);
    },
    removeResizeHandler(m) {
      c.off("_resize", m);
    },
    createScrollResponder(m) {
      return new Jo(m, c, w(n.scrollTime), n.scrollTimeReset);
    },
    registerInteractiveComponent: p,
    unregisterInteractiveComponent: u
  };
}
class be extends $ {
  // debug: boolean
  shouldComponentUpdate(e, n) {
    return !Ot(
      this.props,
      e,
      this.propEquality
      /*, this.debug */
    ) || !Ot(
      this.state,
      n,
      this.stateEquality
      /*, this.debug */
    );
  }
  // HACK for freakin' React StrictMode
  safeSetState(e) {
    Ot(this.state, Object.assign(Object.assign({}, this.state), e), this.stateEquality) || this.setState(e);
  }
}
be.addPropsEquality = Xo;
be.addStateEquality = ea;
be.contextType = Y;
be.prototype.propEquality = {};
be.prototype.stateEquality = {};
class R extends be {
}
R.contextType = Y;
function Xo(t) {
  let e = Object.create(this.prototype.propEquality);
  Object.assign(e, t), this.prototype.propEquality = e;
}
function ea(t) {
  let e = Object.create(this.prototype.stateEquality);
  Object.assign(e, t), this.prototype.stateEquality = e;
}
function j(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
class En extends R {
  constructor() {
    super(...arguments), this.id = me(), this.queuedDomNodes = [], this.currentDomNodes = [], this.handleEl = (e) => {
      const { options: n } = this.context, { generatorName: r } = this.props;
      (!n.customRenderingReplaces || !Zt(r, n)) && this.updateElRef(e);
    }, this.updateElRef = (e) => {
      this.props.elRef && j(this.props.elRef, e);
    };
  }
  render() {
    const { props: e, context: n } = this, { options: r } = n, { customGenerator: i, defaultGenerator: s, renderProps: l } = e, o = Oi(e, [], this.handleEl);
    let a = !1, d, c = [], h;
    if (i != null) {
      const p = typeof i == "function" ? i(l, f) : i;
      if (p === !0)
        a = !0;
      else {
        const u = p && typeof p == "object";
        u && "html" in p ? o.dangerouslySetInnerHTML = { __html: p.html } : u && "domNodes" in p ? c = Array.prototype.slice.call(p.domNodes) : (u ? si(p) : typeof p != "function") ? d = p : h = p;
      }
    } else
      a = !Zt(e.generatorName, r);
    return a && s && (d = s(l)), this.queuedDomNodes = c, this.currentGeneratorMeta = h, f(e.elTag, o, d);
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
      }, r), { elClasses: (r.elClasses || []).filter(ta) }));
    }
  }
  applyQueueudDomNodes() {
    const { queuedDomNodes: e, currentDomNodes: n } = this, r = this.base;
    if (!ne(e, n)) {
      n.forEach(Ll);
      for (let i of e)
        r.appendChild(i);
      this.currentDomNodes = e;
    }
  }
}
En.addPropsEquality({
  elClasses: ne,
  elStyle: L,
  elAttrs: zo,
  renderProps: L
});
function Zt(t, e) {
  var n;
  return !!(e.handleCustomRendering && t && (!((n = e.customRenderingMetaMap) === null || n === void 0) && n[t]));
}
function Oi(t, e, n) {
  const r = Object.assign(Object.assign({}, t.elAttrs), { ref: n });
  return (t.elClasses || e) && (r.className = (t.elClasses || []).concat(e || []).concat(r.className || []).filter(Boolean).join(" ")), t.elStyle && (r.style = t.elStyle), r;
}
function ta(t) {
  return !!t;
}
const Pi = Ni(0);
class U extends $ {
  constructor() {
    super(...arguments), this.InnerContent = na.bind(void 0, this), this.handleEl = (e) => {
      this.el = e, this.props.elRef && (j(this.props.elRef, e), e && this.didMountMisfire && this.componentDidMount());
    };
  }
  render() {
    const { props: e } = this, n = ra(e.classNameGenerator, e.renderProps);
    if (e.children) {
      const r = Oi(e, n, this.handleEl), i = e.children(this.InnerContent, e.renderProps, r);
      return e.elTag ? f(e.elTag, r, i) : i;
    } else
      return f(En, Object.assign(Object.assign({}, e), { elRef: this.handleEl, elTag: e.elTag || "div", elClasses: (e.elClasses || []).concat(n), renderId: this.context }));
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
U.contextType = Pi;
function na(t, e) {
  const n = t.props;
  return f(En, Object.assign({ renderProps: n.renderProps, generatorName: n.generatorName, customGenerator: n.customGenerator, defaultGenerator: n.defaultGenerator, renderId: t.context }, e));
}
function ra(t, e) {
  const n = typeof t == "function" ? t(e) : t || [];
  return typeof n == "string" ? [n] : n;
}
class vt extends R {
  render() {
    let { props: e, context: n } = this, { options: r } = n, i = { view: n.viewApi };
    return f(U, { elRef: e.elRef, elTag: e.elTag || "div", elAttrs: e.elAttrs, elClasses: [
      ...Hi(e.viewSpec),
      ...e.elClasses || []
    ], elStyle: e.elStyle, renderProps: i, classNameGenerator: r.viewClassNames, generatorName: void 0, didMount: r.viewDidMount, willUnmount: r.viewWillUnmount }, () => e.children);
  }
}
function Hi(t) {
  return [
    `fc-${t.type}-view`,
    "fc-view"
  ];
}
function ia(t, e) {
  let n = null, r = null;
  return t.start && (n = e.createMarker(t.start)), t.end && (r = e.createMarker(t.end)), !n && !r || n && r && r < n ? null : { start: n, end: r };
}
function Rr(t, e) {
  let n = [], { start: r } = e, i, s;
  for (t.sort(sa), i = 0; i < t.length; i += 1)
    s = t[i], s.start > r && n.push({ start: r, end: s.start }), s.end > r && (r = s.end);
  return r < e.end && n.push({ start: r, end: e.end }), n;
}
function sa(t, e) {
  return t.start.valueOf() - e.start.valueOf();
}
function ge(t, e) {
  let { start: n, end: r } = t, i = null;
  return e.start !== null && (n === null ? n = e.start : n = new Date(Math.max(n.valueOf(), e.start.valueOf()))), e.end != null && (r === null ? r = e.end : r = new Date(Math.min(r.valueOf(), e.end.valueOf()))), (n === null || r === null || n < r) && (i = { start: n, end: r }), i;
}
function la(t, e) {
  return (t.end === null || e.start === null || t.end > e.start) && (t.start === null || e.end === null || t.start < e.end);
}
function q(t, e) {
  return (t.start === null || e >= t.start) && (t.end === null || e < t.end);
}
function oa(t, e) {
  return e.start != null && t < e.start ? e.start : e.end != null && t >= e.end ? new Date(e.end.valueOf() - 1) : t;
}
function Bi(t) {
  let e = Math.floor(ve(t.start, t.end)) || 1, n = k(t.start), r = N(n, e);
  return { start: n, end: r };
}
function $i(t, e = w(0)) {
  let n = null, r = null;
  if (t.end) {
    r = k(t.end);
    let i = t.end.valueOf() - r.valueOf();
    i && i >= F(e) && (r = N(r, 1));
  }
  return t.start && (n = k(t.start), r && r <= n && (r = N(n, 1))), { start: n, end: r };
}
function qe(t, e, n, r) {
  return r === "year" ? w(n.diffWholeYears(t, e), "year") : r === "month" ? w(n.diffWholeMonths(t, e), "month") : po(t, e);
}
class Ui {
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
    return s = this.buildValidRange(), s = this.trimHiddenDays(s), r && (e = oa(e, s)), l = this.buildCurrentRangeInfo(e, n), o = /^(year|month|week|day)$/.test(l.unit), a = this.buildRenderRange(this.trimHiddenDays(l.range), l.unit, o), a = this.trimHiddenDays(a), d = a, i.showNonCurrentDates || (d = ge(d, l.range)), d = this.adjustActiveRange(d), d = ge(d, s), c = la(l.range, s), q(a, e) || (e = a.start), {
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
    return r.duration ? (i = r.duration, s = r.durationUnit, l = this.buildRangeFromDuration(e, n, i, s)) : (o = this.props.dayCount) ? (s = "day", l = this.buildRangeFromDayCount(e, n, o)) : (l = this.buildCustomVisibleRange(e)) ? s = r.dateEnv.greatestWholeUnit(l.start, l.end).unit : (i = this.getFallbackDuration(), s = qt(i).unit, l = this.buildRangeFromDuration(e, n, i, s)), { duration: i, unit: s, range: l };
  }
  getFallbackDuration() {
    return w({ day: 1 });
  }
  // Returns a new activeRange to have time values (un-ambiguate)
  // slotMinTime or slotMaxTime causes the range to expand.
  adjustActiveRange(e) {
    let { dateEnv: n, usesMinMaxTime: r, slotMinTime: i, slotMaxTime: s } = this.props, { start: l, end: o } = e;
    return r && (Se(i) < 0 && (l = k(l), l = n.add(l, i)), Se(s) > 1 && (o = k(o), o = N(o, -1), o = n.add(o, s))), { start: l, end: o };
  }
  // Builds the "current" range when it is specified as an explicit duration.
  // `unit` is the already-computed greatestDurationDenominator unit of duration.
  buildRangeFromDuration(e, n, r, i) {
    let { dateEnv: s, dateAlignment: l } = this.props, o, a, d;
    if (!l) {
      let { dateIncrement: h } = this.props;
      h && F(h) < F(r) ? l = qt(h).unit : l = i;
    }
    Se(r) <= 1 && this.isHiddenDay(o) && (o = this.skipHiddenDays(o, n), o = k(o));
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
      a = N(a, 1), this.isHiddenDay(a) || (l += 1);
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
    return n || ((r = this.props.dateAlignment) ? w(1, r) : e || w({ days: 1 }));
  }
  refineRange(e) {
    if (e) {
      let n = ia(e, this.props.dateEnv);
      return n && (n = $i(n)), n;
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
      e = N(e, n);
    return e;
  }
}
function _n(t, e, n, r) {
  return {
    instanceId: me(),
    defId: t,
    range: e,
    forcedStartTzo: n ?? null,
    forcedEndTzo: r ?? null
  };
}
function aa(t, e, n, r) {
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
function je(t, e, n) {
  let { dateEnv: r, pluginHooks: i, options: s } = n, { defs: l, instances: o } = t;
  o = xe(o, (a) => !l[a.defId].recurringDef);
  for (let a in l) {
    let d = l[a];
    if (d.recurringDef) {
      let { duration: c } = d.recurringDef;
      c || (c = d.allDay ? s.defaultAllDayEventDuration : s.defaultTimedEventDuration);
      let h = ca(d, c, e, r, i.recurringTypes);
      for (let p of h) {
        let u = _n(a, {
          start: p,
          end: r.add(p, c)
        });
        o[u.instanceId] = u;
      }
    }
  }
  return { defs: l, instances: o };
}
function ca(t, e, n, r, i) {
  let l = i[t.recurringDef.typeId].expand(t.recurringDef.typeData, {
    start: r.subtract(n.start, e),
    end: n.end
  }, r);
  return t.allDay && (l = l.map(k)), l;
}
const it = {
  id: String,
  groupId: String,
  title: String,
  url: String,
  interactive: Boolean
}, zi = {
  start: g,
  end: g,
  date: g,
  allDay: Boolean
}, da = Object.assign(Object.assign(Object.assign({}, it), zi), { extendedProps: g });
function Fi(t, e, n, r, i = Sn(n), s, l) {
  let { refined: o, extra: a } = Li(t, n, i), d = fa(e, n), c = aa(o, d, n.dateEnv, n.pluginHooks.recurringTypes);
  if (c) {
    let p = Yt(o, a, e ? e.sourceId : "", c.allDay, !!c.duration, n, s);
    return p.recurringDef = {
      typeId: c.typeId,
      typeData: c.typeData,
      duration: c.duration
    }, { def: p, instance: null };
  }
  let h = ua(o, d, n, r);
  if (h) {
    let p = Yt(o, a, e ? e.sourceId : "", h.allDay, h.hasEnd, n, s), u = _n(p.defId, h.range, h.forcedStartTzo, h.forcedEndTzo);
    return l && p.publicId && l[p.publicId] && (u.instanceId = l[p.publicId]), { def: p, instance: u };
  }
  return null;
}
function Li(t, e, n = Sn(e)) {
  return bn(t, n);
}
function Sn(t) {
  return Object.assign(Object.assign(Object.assign({}, bt), da), t.pluginHooks.eventRefiners);
}
function Yt(t, e, n, r, i, s, l) {
  let o = {
    title: t.title || "",
    groupId: t.groupId || "",
    publicId: t.id || "",
    url: t.url || "",
    recurringDef: null,
    defId: (l && t.id ? l[t.id] : "") || me(),
    sourceId: n,
    allDay: r,
    hasEnd: i,
    interactive: t.interactive,
    ui: yt(t, s),
    extendedProps: Object.assign(Object.assign({}, t.extendedProps || {}), e)
  };
  for (let a of s.pluginHooks.eventDefMemberAdders)
    Object.assign(o, a(t));
  return Object.freeze(o.ui.classNames), Object.freeze(o.extendedProps), o;
}
function ua(t, e, n, r) {
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
function fa(t, e) {
  let n = null;
  return t && (n = t.defaultAllDay), n == null && (n = e.options.defaultAllDay), n;
}
function Le(t, e, n, r, i, s) {
  let l = Z(), o = Sn(n);
  for (let a of t) {
    let d = Fi(a, e, n, r, o, i, s);
    d && Jt(d, l);
  }
  return l;
}
function Jt(t, e = Z()) {
  return e.defs[t.def.defId] = t.def, t.instance && (e.instances[t.instance.instanceId] = t.instance), e;
}
function ha(t, e) {
  let n = t.instances[e];
  if (n) {
    let r = t.defs[n.defId], i = wn(t, (s) => pa(r, s));
    return i.defs[r.defId] = r, i.instances[n.instanceId] = n, i;
  }
  return Z();
}
function pa(t, e) {
  return !!(t.groupId && t.groupId === e.groupId);
}
function Z() {
  return { defs: {}, instances: {} };
}
function Cn(t, e) {
  return {
    defs: Object.assign(Object.assign({}, t.defs), e.defs),
    instances: Object.assign(Object.assign({}, t.instances), e.instances)
  };
}
function wn(t, e) {
  let n = xe(t.defs, e), r = xe(t.instances, (i) => n[i.defId]);
  return { defs: n, instances: r };
}
function ga(t, e) {
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
function ma(t, e) {
  return Array.isArray(t) ? Le(t, null, e, !0) : typeof t == "object" && t ? Le([t], null, e, !0) : t != null ? String(t) : null;
}
function xr(t) {
  return Array.isArray(t) ? t : typeof t == "string" ? t.split(/\s+/) : [];
}
const bt = {
  display: String,
  editable: Boolean,
  startEditable: Boolean,
  durationEditable: Boolean,
  constraint: g,
  overlap: g,
  allow: g,
  className: xr,
  classNames: xr,
  color: String,
  backgroundColor: String,
  borderColor: String,
  textColor: String
}, va = {
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
function yt(t, e) {
  let n = ma(t.constraint, e);
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
function Wi(t) {
  return t.reduce(ba, va);
}
function ba(t, e) {
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
const ya = {
  id: String,
  defaultAllDay: Boolean,
  url: String,
  format: String,
  events: g,
  eventDataTransform: g,
  // for any network-related sources
  success: g,
  failure: g
};
function ji(t, e, n = Vi(e)) {
  let r;
  if (typeof t == "string" ? r = { url: t } : typeof t == "function" || Array.isArray(t) ? r = { events: t } : typeof t == "object" && t && (r = t), r) {
    let { refined: i, extra: s } = bn(r, n), l = Aa(i, e);
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
        sourceId: me(),
        sourceDefId: l.sourceDefId,
        meta: l.meta,
        ui: yt(i, e),
        extendedProps: s
      };
  }
  return null;
}
function Vi(t) {
  return Object.assign(Object.assign(Object.assign({}, bt), ya), t.pluginHooks.eventSourceRefiners);
}
function Aa(t, e) {
  let n = e.pluginHooks.eventSourceDefs;
  for (let r = n.length - 1; r >= 0; r -= 1) {
    let s = n[r].parseMeta(t);
    if (s)
      return { sourceDefId: r, meta: s };
  }
  return null;
}
function Ea(t, e, n, r, i) {
  switch (e.type) {
    case "RECEIVE_EVENTS":
      return _a(t, n[e.sourceId], e.fetchId, e.fetchRange, e.rawEvents, i);
    case "RESET_RAW_EVENTS":
      return Sa(t, n[e.sourceId], e.rawEvents, r.activeRange, i);
    case "ADD_EVENTS":
      return Ca(
        t,
        e.eventStore,
        // new ones
        r ? r.activeRange : null,
        i
      );
    case "RESET_EVENTS":
      return e.eventStore;
    case "MERGE_EVENTS":
      return Cn(t, e.eventStore);
    case "PREV":
    // TODO: how do we track all actions that affect dateProfile :(
    case "NEXT":
    case "CHANGE_DATE":
    case "CHANGE_VIEW_TYPE":
      return r ? je(t, r.activeRange, i) : t;
    case "REMOVE_EVENTS":
      return ga(t, e.eventStore);
    case "REMOVE_EVENT_SOURCE":
      return Qi(t, e.sourceId);
    case "REMOVE_ALL_EVENT_SOURCES":
      return wn(t, (s) => !s.sourceId);
    case "REMOVE_ALL_EVENTS":
      return Z();
    default:
      return t;
  }
}
function _a(t, e, n, r, i, s) {
  if (e && // not already removed
  n === e.latestFetchId) {
    let l = Le(Gi(i, e, s), e, s);
    return r && (l = je(l, r, s)), Cn(Qi(t, e.sourceId), l);
  }
  return t;
}
function Sa(t, e, n, r, i) {
  const { defIdMap: s, instanceIdMap: l } = wa(t);
  let o = Le(Gi(n, e, i), e, i, !1, s, l);
  return je(o, r, i);
}
function Gi(t, e, n) {
  let r = n.options.eventDataTransform, i = e ? e.eventDataTransform : null;
  return i && (t = Tr(t, i)), r && (t = Tr(t, r)), t;
}
function Tr(t, e) {
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
function Ca(t, e, n, r) {
  return n && (e = je(e, n, r)), Cn(t, e);
}
function kr(t, e, n) {
  let { defs: r } = t, i = pe(t.instances, (s) => r[s.defId].allDay ? s : Object.assign(Object.assign({}, s), { range: {
    start: n.createMarker(e.toDate(s.range.start, s.forcedStartTzo)),
    end: n.createMarker(e.toDate(s.range.end, s.forcedEndTzo))
  }, forcedStartTzo: n.canComputeOffset ? null : s.forcedStartTzo, forcedEndTzo: n.canComputeOffset ? null : s.forcedEndTzo }));
  return { defs: r, instances: i };
}
function Qi(t, e) {
  return wn(t, (n) => n.sourceId !== e);
}
function wa(t) {
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
class Da {
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
    Ra(this.handlers, e, n);
  }
  off(e, n) {
    xa(this.handlers, e, n);
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
function Ra(t, e, n) {
  (t[e] || (t[e] = [])).push(n);
}
function xa(t, e, n) {
  n ? t[e] && (t[e] = t[e].filter((r) => r !== n)) : delete t[e];
}
const Ta = {
  startTime: "09:00",
  endTime: "17:00",
  daysOfWeek: [1, 2, 3, 4, 5],
  display: "inverse-background",
  classNames: "fc-non-business",
  groupId: "_businessHours"
  // so multiple defs get grouped
};
function ka(t, e) {
  return Le(Ma(t), null, e);
}
function Ma(t) {
  let e;
  return t === !0 ? e = [{}] : Array.isArray(t) ? e = t.filter((n) => n.daysOfWeek) : typeof t == "object" && t ? e = [t] : e = [], e = e.map((n) => Object.assign(Object.assign({}, Ta), n)), e;
}
function Ia(t, e, n) {
  n.emitter.trigger("select", Object.assign(Object.assign({}, Oa(t, n)), { jsEvent: null, view: n.viewApi || n.calendarApi.view }));
}
function Na(t, e) {
  e.emitter.trigger("unselect", {
    jsEvent: t ? t.origEvent : null,
    view: e.viewApi || e.calendarApi.view
  });
}
function Oa(t, e) {
  let n = {};
  for (let r of e.pluginHooks.dateSpanTransforms)
    Object.assign(n, r(t, e));
  return Object.assign(n, Qa(t, e.dateEnv)), n;
}
function Mr(t, e, n) {
  let { dateEnv: r, options: i } = n, s = e;
  return t ? (s = k(s), s = r.add(s, i.defaultAllDayEventDuration)) : s = r.add(s, i.defaultTimedEventDuration), s;
}
function Pa(t, e, n, r) {
  let i = Zi(t.defs, e), s = Z();
  for (let l in t.defs) {
    let o = t.defs[l];
    s.defs[l] = Ha(o, i[l], n, r);
  }
  for (let l in t.instances) {
    let o = t.instances[l], a = s.defs[o.defId];
    s.instances[l] = Ba(o, a, i[o.defId], n, r);
  }
  return s;
}
function Ha(t, e, n, r) {
  let i = n.standardProps || {};
  i.hasEnd == null && e.durationEditable && (n.startDelta || n.endDelta) && (i.hasEnd = !0);
  let s = Object.assign(Object.assign(Object.assign({}, t), i), { ui: Object.assign(Object.assign({}, t.ui), i.ui) });
  n.extendedProps && (s.extendedProps = Object.assign(Object.assign({}, s.extendedProps), n.extendedProps));
  for (let l of r.pluginHooks.eventDefMutationAppliers)
    l(s, n, r);
  return !s.hasEnd && r.options.forceEventDuration && (s.hasEnd = !0), s;
}
function Ba(t, e, n, r, i) {
  let { dateEnv: s } = i, l = r.standardProps && r.standardProps.allDay === !0, o = r.standardProps && r.standardProps.hasEnd === !1, a = Object.assign({}, t);
  return l && (a.range = Bi(a.range)), r.datesDelta && n.startEditable && (a.range = {
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
    end: Mr(e.allDay, a.range.start, i)
  }), e.allDay && (a.range = {
    start: k(a.range.start),
    end: k(a.range.end)
  }), a.range.end < a.range.start && (a.range.end = Mr(e.allDay, a.range.start, i)), a;
}
class Ee {
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
class z {
  // instance will be null if expressing a recurring event that has no current instances,
  // OR if trying to validate an incoming external event that has no dates assigned
  constructor(e, n, r) {
    this._context = e, this._def = n, this._instance = r || null;
  }
  /*
  TODO: make event struct more responsible for this
  */
  setProp(e, n) {
    if (e in zi)
      console.warn("Could not set date-related prop 'name'. Use one of the date-related methods instead.");
    else if (e === "id")
      n = it[e](n), this.mutate({
        standardProps: { publicId: n }
        // hardcoded internal name
      });
    else if (e in it)
      n = it[e](n), this.mutate({
        standardProps: { [e]: n }
      });
    else if (e in bt) {
      let r = bt[e](n);
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
      let s = this._instance.range, l = qe(s.start, i, r, n.granularity);
      n.maintainDuration ? this.mutate({ datesDelta: l }) : this.mutate({ startDelta: l });
    }
  }
  setEnd(e, n = {}) {
    let { dateEnv: r } = this._context, i;
    if (!(e != null && (i = r.createMarker(e), !i)) && this._instance)
      if (i) {
        let s = qe(this._instance.range.end, i, r, n.granularity);
        this.mutate({ endDelta: s });
      } else
        this.mutate({ standardProps: { hasEnd: !1 } });
  }
  setDates(e, n, r = {}) {
    let { dateEnv: i } = this._context, s = { allDay: r.allDay }, l = i.createMarker(e), o;
    if (l && !(n != null && (o = i.createMarker(n), !o)) && this._instance) {
      let a = this._instance.range;
      r.allDay === !0 && (a = Bi(a));
      let d = qe(a.start, l, i, r.granularity);
      if (o) {
        let c = qe(a.end, o, i, r.granularity);
        ro(d, c) ? this.mutate({ datesDelta: d, standardProps: s }) : this.mutate({ startDelta: d, endDelta: c, standardProps: s });
      } else
        s.hasEnd = !1, this.mutate({ datesDelta: d, standardProps: s });
    }
  }
  moveStart(e) {
    let n = w(e);
    n && this.mutate({ startDelta: n });
  }
  moveEnd(e) {
    let n = w(e);
    n && this.mutate({ endDelta: n });
  }
  moveDates(e) {
    let n = w(e);
    n && this.mutate({ datesDelta: n });
  }
  setAllDay(e, n = {}) {
    let r = { allDay: e }, { maintainDuration: i } = n;
    i == null && (i = this._context.options.allDayMaintainDuration), this._def.allDay !== e && (r.hasEnd = i), this.mutate({ standardProps: r });
  }
  formatRange(e) {
    let { dateEnv: n } = this._context, r = this._instance, i = M(e);
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
      let r = this._def, i = this._context, { eventStore: s } = i.getCurrentData(), l = ha(s, n.instanceId);
      l = Pa(l, {
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
      let a = new z(i, r, n);
      this._def = l.defs[r.defId], this._instance = l.instances[n.instanceId], i.dispatch({
        type: "MERGE_EVENTS",
        eventStore: l
      }), i.emitter.trigger("eventChange", {
        oldEvent: a,
        event: this,
        relatedEvents: Dn(l, i, n),
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
    let e = this._context, n = qi(this);
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
    return e ? new Ee(this._context, this._context.getCurrentData().eventSources[e]) : null;
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
function qi(t) {
  let e = t._def, n = t._instance;
  return {
    defs: { [e.defId]: e },
    instances: n ? { [n.instanceId]: n } : {}
  };
}
function Dn(t, e, n) {
  let { defs: r, instances: i } = t, s = [], l = n ? n.instanceId : "";
  for (let o in i) {
    let a = i[o], d = r[a.defId];
    a.instanceId !== l && s.push(new z(e, d, a));
  }
  return s;
}
function Ir(t, e, n, r) {
  let i = {}, s = {}, l = {}, o = [], a = [], d = Zi(t.defs, e);
  for (let c in t.defs) {
    let h = t.defs[c];
    d[h.defId].display === "inverse-background" && (h.groupId ? (i[h.groupId] = [], l[h.groupId] || (l[h.groupId] = h)) : s[c] = []);
  }
  for (let c in t.instances) {
    let h = t.instances[c], p = t.defs[h.defId], u = d[p.defId], m = h.range, v = !p.allDay && r ? $i(m, r) : m, b = ge(v, n);
    b && (u.display === "inverse-background" ? p.groupId ? i[p.groupId].push(b) : s[h.defId].push(b) : u.display !== "none" && (u.display === "background" ? o : a).push({
      def: p,
      ui: u,
      instance: h,
      range: b,
      isStart: v.start && v.start.valueOf() === b.start.valueOf(),
      isEnd: v.end && v.end.valueOf() === b.end.valueOf()
    }));
  }
  for (let c in i) {
    let h = i[c], p = Rr(h, n);
    for (let u of p) {
      let m = l[c], v = d[m.defId];
      o.push({
        def: m,
        ui: v,
        instance: null,
        range: u,
        isStart: !1,
        isEnd: !1
      });
    }
  }
  for (let c in s) {
    let h = s[c], p = Rr(h, n);
    for (let u of p)
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
function $a(t) {
  return t.ui.display === "background" || t.ui.display === "inverse-background";
}
function Nr(t, e) {
  t.fcSeg = e;
}
function Kt(t) {
  return t.fcSeg || t.parentNode.fcSeg || // for the harness
  null;
}
function Zi(t, e) {
  return pe(t, (n) => Yi(n, e));
}
function Yi(t, e) {
  let n = [];
  return e[""] && n.push(e[""]), e[t.defId] && n.push(e[t.defId]), n.push(t.ui), Wi(n);
}
function Ji(t, e) {
  let n = t.map(Ua);
  return n.sort((r, i) => Jl(r, i, e)), n.map((r) => r._seg);
}
function Ua(t) {
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
function za(t, e) {
  let { pluginHooks: n } = e, r = n.isDraggableTransformers, { def: i, ui: s } = t.eventRange, l = s.startEditable;
  for (let o of r)
    l = o(l, i, s, e);
  return l;
}
function Fa(t, e) {
  return t.isStart && t.eventRange.ui.durationEditable && e.options.eventResizableFromStart;
}
function La(t, e) {
  return t.isEnd && t.eventRange.ui.durationEditable;
}
function Ki(t, e, n, r, i, s, l) {
  let { dateEnv: o, options: a } = n, { displayEventTime: d, displayEventEnd: c } = a, h = t.eventRange.def, p = t.eventRange.instance;
  d == null && (d = r !== !1), c == null && (c = i !== !1);
  let u = p.range.start, m = p.range.end, v = t.start || t.eventRange.range.start, b = t.end || t.eventRange.range.end, y = k(u).valueOf() === k(v).valueOf(), A = k(re(m, -1)).valueOf() === k(re(b, -1)).valueOf();
  return d && !h.allDay && (y || A) ? (v = y ? u : v, b = A ? m : b, c && h.hasEnd ? o.formatRange(v, b, e, {
    forcedStartTzo: p.forcedStartTzo,
    forcedEndTzo: p.forcedEndTzo
  }) : o.format(v, e, {
    forcedTzo: p.forcedStartTzo
    // nooooo, same
  })) : "";
}
function te(t, e, n) {
  let r = t.eventRange.range;
  return {
    isPast: r.end <= (n || e.start),
    isFuture: r.start >= (n || e.end),
    isToday: e && q(e, r.start)
  };
}
function Wa(t) {
  let e = ["fc-event"];
  return t.isMirror && e.push("fc-event-mirror"), t.isDraggable && e.push("fc-event-draggable"), (t.isStartResizable || t.isEndResizable) && e.push("fc-event-resizable"), t.isDragging && e.push("fc-event-dragging"), t.isResizing && e.push("fc-event-resizing"), t.isSelected && e.push("fc-event-selected"), t.isStart && e.push("fc-event-start"), t.isEnd && e.push("fc-event-end"), t.isPast && e.push("fc-event-past"), t.isToday && e.push("fc-event-today"), t.isFuture && e.push("fc-event-future"), e;
}
function Xi(t) {
  return t.instance ? t.instance.instanceId : `${t.def.defId}:${t.range.start.toISOString()}`;
}
function es(t, e) {
  let { def: n, instance: r } = t.eventRange, { url: i } = n;
  if (i)
    return { href: i };
  let { emitter: s, options: l } = e, { eventInteractive: o } = l;
  return o == null && (o = n.interactive, o == null && (o = !!s.hasHandlers("eventClick"))), o ? xi((a) => {
    s.trigger("eventClick", {
      el: a.target,
      event: new z(e, n, r),
      jsEvent: a,
      view: e.viewApi
    });
  }) : {};
}
const ja = {
  start: g,
  end: g,
  allDay: Boolean
};
function Va(t, e, n) {
  let r = Ga(t, e), { range: i } = r;
  if (!i.start)
    return null;
  if (!i.end) {
    if (n == null)
      return null;
    i.end = e.add(i.start, n);
  }
  return r;
}
function Ga(t, e) {
  let { refined: n, extra: r } = bn(t, ja), i = n.start ? e.createMarkerMeta(n.start) : null, s = n.end ? e.createMarkerMeta(n.end) : null, { allDay: l } = n;
  return l == null && (l = i && i.isTimeUnspecified && (!s || s.isTimeUnspecified)), Object.assign({ range: {
    start: i ? i.marker : null,
    end: s ? s.marker : null
  }, allDay: l }, r);
}
function Qa(t, e) {
  return Object.assign(Object.assign({}, ns(t.range, e, t.allDay)), { allDay: t.allDay });
}
function ts(t, e, n) {
  return Object.assign(Object.assign({}, ns(t, e, n)), { timeZone: e.timeZone });
}
function ns(t, e, n) {
  return {
    start: e.toDate(t.start),
    end: e.toDate(t.end),
    startStr: e.formatIso(t.start, { omitTime: n }),
    endStr: e.formatIso(t.end, { omitTime: n })
  };
}
function qa(t, e, n) {
  let r = Li({ editable: !1 }, n), i = Yt(
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
    ui: Yi(i, e),
    instance: _n(i.defId, t.range),
    range: t.range,
    isStart: !0,
    isEnd: !0
  };
}
function Za(t, e, n) {
  let r = !1, i = function(o) {
    r || (r = !0, e(o));
  }, s = function(o) {
    r || (r = !0, n(o));
  }, l = t(i, s);
  l && typeof l.then == "function" && l.then(i, s);
}
class Or extends Error {
  constructor(e, n) {
    super(e), this.response = n;
  }
}
function Ya(t, e, n) {
  t = t.toUpperCase();
  const r = {
    method: t
  };
  return t === "GET" ? e += (e.indexOf("?") === -1 ? "?" : "&") + new URLSearchParams(n) : (r.body = new URLSearchParams(n), r.headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  }), fetch(e, r).then((i) => {
    if (i.ok)
      return i.json().then((s) => [s, i], () => {
        throw new Or("Failure parsing JSON", i);
      });
    throw new Or("Request failed", i);
  });
}
let Pt;
function rs() {
  return Pt == null && (Pt = Ja()), Pt;
}
function Ja() {
  if (typeof document > "u")
    return !0;
  let t = document.createElement("div");
  t.style.position = "absolute", t.style.top = "0px", t.style.left = "0px", t.innerHTML = "<table><tr><td><div></div></td></tr></table>", t.querySelector("table").style.height = "100px", t.querySelector("div").style.height = "100%", document.body.appendChild(t);
  let n = t.querySelector("div").offsetHeight > 0;
  return document.body.removeChild(t), n;
}
class Ka extends R {
  constructor() {
    super(...arguments), this.state = {
      forPrint: !1
    }, this.handleBeforePrint = () => {
      mt(() => {
        this.setState({ forPrint: !0 });
      });
    }, this.handleAfterPrint = () => {
      mt(() => {
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
    return rs() || l.push("fc-liquid-hack"), e.children(l, s, i, r);
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
class is {
  constructor(e) {
    this.component = e.component, this.isHitComboAllowed = e.isHitComboAllowed || null;
  }
  destroy() {
  }
}
function Xa(t, e) {
  return {
    component: t,
    el: e.el,
    useEventCenter: e.useEventCenter != null ? e.useEventCenter : !0,
    isHitComboAllowed: e.isHitComboAllowed || null
  };
}
const Pr = {};
class ke extends $ {
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
    return i ? (s = n.dateEnv.startOf(r, e.unit), l = n.dateEnv.add(s, w(1, e.unit)).valueOf() - r.valueOf()) : (s = r, l = 1e3 * 60), l = Math.min(1e3 * 60 * 60 * 24, l), {
      state: { nowDate: s, todayRange: ec(s) },
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
ke.contextType = Y;
function ec(t) {
  let e = k(t), n = N(e, 1);
  return { start: e, end: n };
}
class tc {
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
    let n = this.getCurrentData(), r = w(e);
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
    return r.format(r.createMarker(e), M(n));
  }
  // `settings` is for formatter AND isEndExclusive
  formatRange(e, n, r) {
    let { dateEnv: i } = this.getCurrentData();
    return i.formatRange(i.createMarker(e), i.createMarker(n), M(r), r);
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
    let i = this.getCurrentData(), s = Va(r, i.dateEnv, w({ days: 1 }));
    s && (this.dispatch({ type: "SELECT_DATES", selection: s }), Ia(s, null, i));
  }
  unselect(e) {
    let n = this.getCurrentData();
    n.dateSelection && (this.dispatch({ type: "UNSELECT_DATES" }), Na(e, n));
  }
  // Public Events API
  // -----------------------------------------------------------------------------------------------------------------
  addEvent(e, n) {
    if (e instanceof z) {
      let l = e._def, o = e._instance;
      return this.getCurrentData().eventStore.defs[l.defId] || (this.dispatch({
        type: "ADD_EVENTS",
        eventStore: Jt({ def: l, instance: o })
        // TODO: better util for two args?
      }), this.triggerEventAdd(e)), e;
    }
    let r = this.getCurrentData(), i;
    if (n instanceof Ee)
      i = n.internalEventSource;
    else if (typeof n == "boolean")
      n && ([i] = An(r.eventSources));
    else if (n != null) {
      let l = this.getEventSourceById(n);
      if (!l)
        return console.warn(`Could not find an event source with ID "${n}"`), null;
      i = l.internalEventSource;
    }
    let s = Fi(e, i, r, !1);
    if (s) {
      let l = new z(r, s.def, s.def.recurringDef ? null : s.instance);
      return this.dispatch({
        type: "ADD_EVENTS",
        eventStore: Jt(s)
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
          eventStore: qi(e)
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
          return new z(n, l, null);
        for (let o in i) {
          let a = i[o];
          if (a.defId === l.defId)
            return new z(n, l, a);
        }
      }
    }
    return null;
  }
  getEvents() {
    let e = this.getCurrentData();
    return Dn(e.eventStore, e);
  }
  removeAllEvents() {
    this.dispatch({ type: "REMOVE_ALL_EVENTS" });
  }
  // Public Event Sources API
  // -----------------------------------------------------------------------------------------------------------------
  getEventSources() {
    let e = this.getCurrentData(), n = e.eventSources, r = [];
    for (let i in n)
      r.push(new Ee(e, n[i]));
    return r;
  }
  getEventSourceById(e) {
    let n = this.getCurrentData(), r = n.eventSources;
    e = String(e);
    for (let i in r)
      if (r[i].publicId === e)
        return new Ee(n, r[i]);
    return null;
  }
  addEventSource(e) {
    let n = this.getCurrentData();
    if (e instanceof Ee)
      return n.eventSources[e.internalEventSource.sourceId] || this.dispatch({
        type: "ADD_EVENT_SOURCES",
        sources: [e.internalEventSource]
      }), e;
    let r = ji(e, n);
    return r ? (this.dispatch({ type: "ADD_EVENT_SOURCES", sources: [r] }), new Ee(n, r)) : null;
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
    let n = w(e);
    n && this.trigger("_scrollRequest", { time: n });
  }
}
function nc(t, e) {
  let n = {
    left: Math.max(t.left, e.left),
    right: Math.min(t.right, e.right),
    top: Math.max(t.top, e.top),
    bottom: Math.min(t.bottom, e.bottom)
  };
  return n.left < n.right && n.top < n.bottom ? n : !1;
}
const Ht = Z();
class rc {
  constructor() {
    this.getKeysForEventDefs = _(this._getKeysForEventDefs), this.splitDateSelection = _(this._splitDateSpan), this.splitEventStore = _(this._splitEventStore), this.splitIndividualUi = _(this._splitIndividualUi), this.splitEventDrag = _(this._splitInteraction), this.splitEventResize = _(this._splitInteraction), this.eventUiBuilders = {};
  }
  splitProps(e) {
    let n = this.getKeyInfo(e), r = this.getKeysForEventDefs(e.eventStore), i = this.splitDateSelection(e.dateSelection), s = this.splitIndividualUi(e.eventUiBases, r), l = this.splitEventStore(e.eventStore, r), o = this.splitEventDrag(e.eventDrag), a = this.splitEventResize(e.eventResize), d = {};
    this.eventUiBuilders = pe(n, (c, h) => this.eventUiBuilders[h] || _(ic));
    for (let c in n) {
      let h = n[c], p = l[c] || Ht, u = this.eventUiBuilders[c];
      d[c] = {
        businessHours: h.businessHours || e.businessHours,
        dateSelection: i[c] || null,
        eventStore: p,
        eventUiBases: u(e.eventUiBases[""], h.ui, s[c]),
        eventSelection: p.instances[e.eventSelection] ? e.eventSelection : "",
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
    return pe(e.defs, (n) => this.getKeysForEventDef(n));
  }
  _splitEventStore(e, n) {
    let { defs: r, instances: i } = e, s = {};
    for (let l in r)
      for (let o of n[l])
        s[o] || (s[o] = Z()), s[o].defs[l] = r[l];
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
          affectedEvents: r[o] || Ht,
          mutatedEvents: s[o] || Ht,
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
function ic(t, e, n) {
  let r = [];
  t && r.push(t), e && r.push(e);
  let i = {
    "": Wi(r)
  };
  return n && Object.assign(i, n), i;
}
function ss(t, e, n, r) {
  return {
    dow: t.getUTCDay(),
    isDisabled: !!(r && (!r.activeRange || !q(r.activeRange, t))),
    isOther: !!(r && !q(r.currentRange, t)),
    isToday: !!(e && q(e, t)),
    isPast: !!(e && t < e.start),
    isFuture: !!(e && t >= e.end)
  };
}
function Rn(t, e) {
  let n = [
    "fc-day",
    `fc-day-${ao[t.dow]}`
  ];
  return t.isDisabled ? n.push("fc-day-disabled") : (t.isToday && (n.push("fc-day-today"), n.push(e.getClass("today"))), t.isPast && n.push("fc-day-past"), t.isFuture && n.push("fc-day-future"), t.isOther && n.push("fc-day-other")), n;
}
const sc = M({ year: "numeric", month: "long", day: "numeric" }), lc = M({ week: "long" });
function At(t, e, n = "day", r = !0) {
  const { dateEnv: i, options: s, calendarApi: l } = t;
  let o = i.format(e, n === "week" ? lc : sc);
  if (s.navLinks) {
    let a = i.toDate(e);
    const d = (c) => {
      let h = n === "day" ? s.navLinkDayClick : n === "week" ? s.navLinkWeekClick : null;
      typeof h == "function" ? h.call(l, i.toDate(e), c) : (typeof h == "string" && (n = h), l.zoomTo(e, n));
    };
    return Object.assign({ title: He(s.navLinkHint, [o, a], o), "data-navlink": "" }, r ? Ri(d) : { onClick: d });
  }
  return { "aria-label": o };
}
let Bt;
function oc() {
  return Bt || (Bt = ac()), Bt;
}
function ac() {
  let t = document.createElement("div");
  t.style.overflow = "scroll", t.style.position = "absolute", t.style.top = "-9999px", t.style.left = "-9999px", document.body.appendChild(t);
  let e = cc(t);
  return document.body.removeChild(t), e;
}
function cc(t) {
  return {
    x: t.offsetHeight - t.clientHeight,
    y: t.offsetWidth - t.clientWidth
  };
}
function dc(t) {
  let e = uc(t), n = t.getBoundingClientRect();
  for (let r of e) {
    let i = nc(n, r.getBoundingClientRect());
    if (i)
      n = i;
    else
      return null;
  }
  return n;
}
function uc(t) {
  let e = [];
  for (; t instanceof HTMLElement; ) {
    let n = window.getComputedStyle(t);
    if (n.position === "fixed")
      break;
    /(auto|scroll)/.test(n.overflow + n.overflowY + n.overflowX) && e.push(t), t = t.parentNode;
  }
  return e;
}
class Te {
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
    return Ze(this.tops || [], e.tops || []) && Ze(this.bottoms || [], e.bottoms || []) && Ze(this.lefts || [], e.lefts || []) && Ze(this.rights || [], e.rights || []);
  }
}
function Ze(t, e) {
  const n = t.length;
  if (n !== e.length)
    return !1;
  for (let r = 0; r < n; r++)
    if (Math.round(t[r]) !== Math.round(e[r]))
      return !1;
  return !0;
}
class V extends R {
  constructor() {
    super(...arguments), this.uid = me();
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
    !G(e, ".fc-event-mirror");
  }
  isValidDateDownEl(e) {
    return !G(e, ".fc-event:not(.fc-bg-event)") && !G(e, ".fc-more-link") && // a "more.." link
    !G(e, "a[data-navlink]") && // a clickable nav link
    !G(e, ".fc-popover");
  }
}
class ls {
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
      const i = Object.assign(Object.assign({}, n), { span: xn(n.span, e.touchingEntry.span) });
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
    n.lateral === -1 ? ($t(i, n.level, n.levelCoord), $t(r, n.level, [e])) : $t(r[n.level], n.lateral, e), this.stackCnts[fe(e)] = n.stackCnt;
  }
  /*
  does not care about limits
  */
  findInsertion(e) {
    let { levelCoords: n, entriesByLevel: r, strictOrder: i, stackCnts: s } = this, l = n.length, o = 0, a = -1, d = -1, c = null, h = 0;
    for (let m = 0; m < l; m += 1) {
      const v = n[m];
      if (!i && v >= o + this.getEntryThickness(e))
        break;
      let b = r[m], y, A = en(b, e.span.start, Xt), C = A[0] + A[1];
      for (
        ;
        // loop through entries that horizontally intersect
        (y = b[C]) && // but not past the whole entry list
        y.span.start < e.span.end;
      ) {
        let S = v + this.getEntryThickness(y);
        S > o && (o = S, c = y, a = m, d = C), S === o && (h = Math.max(h, s[fe(y)] + 1)), C += 1;
      }
    }
    let p = 0;
    if (c)
      for (p = a + 1; p < l && n[p] < o; )
        p += 1;
    let u = -1;
    return p < l && n[p] === o && (u = en(r[p], e.span.end, Xt)[0]), {
      touchingLevel: a,
      touchingLateral: d,
      touchingEntry: c,
      stackCnt: h,
      levelCoord: o,
      level: p,
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
function Xt(t) {
  return t.span.end;
}
function fe(t) {
  return t.index + ":" + t.span.start;
}
function fc(t) {
  let e = [];
  for (let n of t) {
    let r = [], i = {
      span: n.span,
      entries: [n]
    };
    for (let s of e)
      xn(s.span, i.span) ? i = {
        entries: s.entries.concat(i.entries),
        span: hc(s.span, i.span)
      } : r.push(s);
    r.push(i), e = r;
  }
  return e;
}
function hc(t, e) {
  return {
    start: Math.min(t.start, e.start),
    end: Math.max(t.end, e.end)
  };
}
function xn(t, e) {
  let n = Math.max(t.start, e.start), r = Math.min(t.end, e.end);
  return n < r ? { start: n, end: r } : null;
}
function $t(t, e, n) {
  t.splice(e, 0, n);
}
function en(t, e, n) {
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
function pc(t, e) {
  return !t || e > 10 ? M({ weekday: "short" }) : e > 1 ? M({ weekday: "short", month: "numeric", day: "numeric", omitCommas: !0 }) : M({ weekday: "long" });
}
const os = "fc-col-header-cell";
function as(t) {
  return t.text;
}
class gc extends R {
  render() {
    let { dateEnv: e, options: n, theme: r, viewApi: i } = this.context, { props: s } = this, { date: l, dateProfile: o } = s, a = ss(l, s.todayRange, null, o), d = [os].concat(Rn(a, r)), c = e.format(l, s.dayHeaderFormat), h = !a.isDisabled && s.colCnt > 1 ? At(this.context, l) : {}, p = e.toDate(l);
    e.namedTimeZoneImpl && (p = re(p, 36e5));
    let u = Object.assign(Object.assign(Object.assign({ date: p, view: i }, s.extraRenderProps), { text: c }), a);
    return f(U, { elTag: "th", elClasses: d, elAttrs: Object.assign({ role: "columnheader", colSpan: s.colSpan, "data-date": a.isDisabled ? void 0 : mn(l) }, s.extraDataAttrs), renderProps: u, generatorName: "dayHeaderContent", customGenerator: n.dayHeaderContent, defaultGenerator: as, classNameGenerator: n.dayHeaderClassNames, didMount: n.dayHeaderDidMount, willUnmount: n.dayHeaderWillUnmount }, (m) => f("div", { className: "fc-scrollgrid-sync-inner" }, !a.isDisabled && f(m, { elTag: "a", elAttrs: h, elClasses: [
      "fc-col-header-cell-cushion",
      s.isSticky && "fc-sticky"
    ] })));
  }
}
const mc = M({ weekday: "long" });
class vc extends R {
  render() {
    let { props: e } = this, { dateEnv: n, theme: r, viewApi: i, options: s } = this.context, l = N(/* @__PURE__ */ new Date(2592e5), e.dow), o = {
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
    return f(U, { elTag: "th", elClasses: [
      os,
      ...Rn(o, r),
      ...e.extraClassNames || []
    ], elAttrs: Object.assign({ role: "columnheader", colSpan: e.colSpan }, e.extraDataAttrs), renderProps: d, generatorName: "dayHeaderContent", customGenerator: s.dayHeaderContent, defaultGenerator: as, classNameGenerator: s.dayHeaderClassNames, didMount: s.dayHeaderDidMount, willUnmount: s.dayHeaderWillUnmount }, (c) => f(
      "div",
      { className: "fc-scrollgrid-sync-inner" },
      f(c, { elTag: "a", elClasses: [
        "fc-col-header-cell-cushion",
        e.isSticky && "fc-sticky"
      ], elAttrs: {
        "aria-label": n.format(l, mc)
      } })
    ));
  }
}
class cs extends R {
  constructor() {
    super(...arguments), this.createDayHeaderFormatter = _(bc);
  }
  render() {
    let { context: e } = this, { dates: n, dateProfile: r, datesRepDistinctDays: i, renderIntro: s } = this.props, l = this.createDayHeaderFormatter(e.options.dayHeaderFormat, i, n.length);
    return f(ke, { unit: "day" }, (o, a) => f(
      "tr",
      { role: "row" },
      s && s("day"),
      n.map((d) => i ? f(gc, { key: d.toISOString(), date: d, dateProfile: r, todayRange: a, colCnt: n.length, dayHeaderFormat: l }) : f(vc, { key: d.getUTCDay(), dow: d.getUTCDay(), dayHeaderFormat: l }))
    ));
  }
}
function bc(t, e, n) {
  return t || pc(e, n);
}
class ds {
  constructor(e, n) {
    let r = e.start, { end: i } = e, s = [], l = [], o = -1;
    for (; r < i; )
      n.isHiddenDay(r) ? s.push(o + 0.5) : (o += 1, s.push(o), l.push(r)), r = N(r, 1);
    this.dates = l, this.indices = s, this.cnt = l.length;
  }
  sliceRange(e) {
    let n = this.getDateDayIndex(e.start), r = this.getDateDayIndex(N(e.end, -1)), i = Math.max(0, n), s = Math.min(this.cnt - 1, r);
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
    let { indices: n } = this, r = Math.floor(ve(this.dates[0], e));
    return r < 0 ? n[0] - 1 : r >= n.length ? n[n.length - 1] + 1 : n[r];
  }
}
class us {
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
class fs {
  constructor() {
    this.sliceBusinessHours = _(this._sliceBusinessHours), this.sliceDateSelection = _(this._sliceDateSpan), this.sliceEventStore = _(this._sliceEventStore), this.sliceEventDrag = _(this._sliceInteraction), this.sliceEventResize = _(this._sliceInteraction), this.forceDayIfListItem = !1;
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
      { range: { start: e, end: re(e, 1) }, allDay: !1 },
      // add 1 ms, protect against null range
      n,
      r,
      {},
      i,
      ...s
    );
  }
  _sliceBusinessHours(e, n, r, i, ...s) {
    return e ? this._sliceEventStore(je(e, Ye(n, !!r), i), {}, n, r, ...s).bg : [];
  }
  _sliceEventStore(e, n, r, i, ...s) {
    if (e) {
      let l = Ir(e, n, Ye(r, !!i), i);
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
    let l = Ir(e.mutatedEvents, n, Ye(r, !!i), i);
    return {
      segs: this.sliceEventRanges(l.fg, s),
      affectedInstances: e.affectedEvents.instances,
      isEvent: e.isEvent
    };
  }
  _sliceDateSpan(e, n, r, i, s, ...l) {
    if (!e)
      return [];
    let o = Ye(n, !!r), a = ge(e.range, o);
    if (a) {
      e = Object.assign(Object.assign({}, e), { range: a });
      let d = qa(e, i, s), c = this.sliceRange(e.range, ...l);
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
      end: N(r.start, 1)
    });
    let i = this.sliceRange(r, ...n);
    for (let s of i)
      s.eventRange = e, s.isStart = e.isStart && s.isStart, s.isEnd = e.isEnd && s.isEnd;
    return i;
  }
}
function Ye(t, e) {
  let n = t.activeRange;
  return e ? n : {
    start: re(n.start, t.slotMinTime.milliseconds),
    end: re(n.end, t.slotMaxTime.milliseconds - 864e5)
    // 864e5 = ms in a day
  };
}
const Je = /^(visible|hidden)$/;
class yc extends R {
  constructor() {
    super(...arguments), this.handleEl = (e) => {
      this.el = e, j(this.props.elRef, e);
    };
  }
  render() {
    let { props: e } = this, { liquid: n, liquidIsAbsolute: r } = e, i = n && r, s = ["fc-scroller"];
    return n && (r ? s.push("fc-scroller-liquid-absolute") : s.push("fc-scroller-liquid")), f("div", { ref: this.handleEl, className: s.join(" "), style: {
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
    if (Je.test(this.props.overflowX))
      return !1;
    let { el: e } = this, n = this.el.getBoundingClientRect().width - this.getYScrollbarWidth(), { children: r } = e;
    for (let i = 0; i < r.length; i += 1)
      if (r[i].getBoundingClientRect().width > n)
        return !0;
    return !1;
  }
  needsYScrolling() {
    if (Je.test(this.props.overflowY))
      return !1;
    let { el: e } = this, n = this.el.getBoundingClientRect().height - this.getXScrollbarWidth(), { children: r } = e;
    for (let i = 0; i < r.length; i += 1)
      if (r[i].getBoundingClientRect().height > n)
        return !0;
    return !1;
  }
  getXScrollbarWidth() {
    return Je.test(this.props.overflowX) ? 0 : this.el.offsetHeight - this.el.clientHeight;
  }
  getYScrollbarWidth() {
    return Je.test(this.props.overflowY) ? 0 : this.el.offsetWidth - this.el.clientWidth;
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
    return Wo(this.currentMap, e, n, r);
  }
  getAll() {
    return An(this.currentMap);
  }
}
function Ac(t) {
  let e = jl(t, ".fc-scrollgrid-shrink"), n = 0;
  for (let r of e)
    n = Math.max(n, eo(r));
  return Math.ceil(n);
}
function hs(t, e) {
  return t.liquid && e.liquid;
}
function Ec(t, e) {
  return e.maxHeight != null || // if its possible for the height to max out, we might need scrollbars
  hs(t, e);
}
function _c(t, e, n, r) {
  let { expandRows: i } = n;
  return typeof e.content == "function" ? e.content(n) : f("table", {
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
  }, n.tableColGroupNode, f(r ? "thead" : "tbody", {
    role: "presentation"
  }, typeof e.rowContent == "function" ? e.rowContent(n) : e.rowContent));
}
function Sc(t, e) {
  return ne(t, e, L);
}
function Cc(t, e) {
  let n = [];
  for (let r of t) {
    let i = r.span || 1;
    for (let s = 0; s < i; s += 1)
      n.push(f("col", { style: {
        width: r.width === "shrink" ? wc(e) : r.width || "",
        minWidth: r.minWidth || ""
      } }));
  }
  return f("colgroup", {}, ...n);
}
function wc(t) {
  return t ?? 4;
}
function Dc(t) {
  for (let e of t)
    if (e.width === "shrink")
      return !0;
  return !1;
}
function Rc(t, e) {
  let n = [
    "fc-scrollgrid",
    e.theme.getClass("table")
  ];
  return t && n.push("fc-scrollgrid-liquid"), n;
}
function xc(t, e) {
  let n = [
    "fc-scrollgrid-section",
    `fc-scrollgrid-section-${t.type}`,
    t.className
    // used?
  ];
  return e && t.liquid && t.maxHeight == null && n.push("fc-scrollgrid-section-liquid"), t.isSticky && n.push("fc-scrollgrid-section-sticky"), n;
}
function tn(t) {
  return f("div", { className: "fc-scrollgrid-sticky-shim", style: {
    width: t.clientWidth,
    minWidth: t.tableMinWidth
  } });
}
function Et(t) {
  let { stickyHeaderDates: e } = t;
  return (e == null || e === "auto") && (e = t.height === "auto" || t.viewHeight === "auto"), e;
}
function ps(t) {
  let { stickyFooterScrollbar: e } = t;
  return (e == null || e === "auto") && (e = t.height === "auto" || t.viewHeight === "auto"), e;
}
class Tn extends R {
  constructor() {
    super(...arguments), this.processCols = _((e) => e, Sc), this.renderMicroColGroup = _(Cc), this.scrollerRefs = new Q(), this.scrollerElRefs = new Q(this._handleScrollerEl.bind(this)), this.state = {
      shrinkWidth: null,
      forceYScrollbars: !1,
      scrollerClientWidths: {},
      scrollerClientHeights: {}
    }, this.handleSizing = () => {
      this.safeSetState(Object.assign({ shrinkWidth: this.computeShrinkWidth() }, this.computeScrollerDims()));
    };
  }
  render() {
    let { props: e, state: n, context: r } = this, i = e.sections || [], s = this.processCols(e.cols), l = this.renderMicroColGroup(s, n.shrinkWidth), o = Rc(e.liquid, r);
    e.collapsibleWidth && o.push("fc-scrollgrid-collapsible");
    let a = i.length, d = 0, c, h = [], p = [], u = [];
    for (; d < a && (c = i[d]).type === "header"; )
      h.push(this.renderSection(c, l, !0)), d += 1;
    for (; d < a && (c = i[d]).type === "body"; )
      p.push(this.renderSection(c, l, !1)), d += 1;
    for (; d < a && (c = i[d]).type === "footer"; )
      u.push(this.renderSection(c, l, !0)), d += 1;
    let m = !rs();
    const v = { role: "rowgroup" };
    return f("table", {
      role: "grid",
      className: o.join(" "),
      style: { height: e.height }
    }, !!(!m && h.length) && f("thead", v, ...h), !!(!m && p.length) && f("tbody", v, ...p), !!(!m && u.length) && f("tfoot", v, ...u), m && f("tbody", v, ...h, ...p, ...u));
  }
  renderSection(e, n, r) {
    return "outerContent" in e ? f(x, { key: e.key }, e.outerContent) : f("tr", { key: e.key, role: "presentation", className: xc(e, this.props.liquid).join(" ") }, this.renderChunkTd(e, n, e.chunk, r));
  }
  renderChunkTd(e, n, r, i) {
    if ("outerContent" in r)
      return r.outerContent;
    let { props: s } = this, { forceYScrollbars: l, scrollerClientWidths: o, scrollerClientHeights: a } = this.state, d = Ec(s, e), c = hs(s, e), h = s.liquid ? l ? "scroll" : d ? "auto" : "hidden" : "visible", p = e.key, u = _c(e, r, {
      tableColGroupNode: n,
      tableMinWidth: "",
      clientWidth: !s.collapsibleWidth && o[p] !== void 0 ? o[p] : null,
      clientHeight: a[p] !== void 0 ? a[p] : null,
      expandRows: e.expandRows,
      syncRowHeights: !1,
      rowSyncHeights: [],
      reportRowHeightChange: () => {
      }
    }, i);
    return f(i ? "th" : "td", {
      ref: r.elRef,
      role: "presentation"
    }, f(
      "div",
      { className: `fc-scroller-harness${c ? " fc-scroller-harness-liquid" : ""}` },
      f(yc, { ref: this.scrollerRefs.createRef(p), elRef: this.scrollerElRefs.createRef(p), overflowY: h, overflowX: s.liquid ? "hidden" : "visible", maxHeight: e.maxHeight, liquid: c, liquidIsAbsolute: !0 }, u)
    ));
  }
  _handleScrollerEl(e, n) {
    let r = Tc(this.props.sections, n);
    r && j(r.chunk.scrollerElRef, e);
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
    return Dc(this.props.cols) ? Ac(this.scrollerElRefs.getAll()) : 0;
  }
  computeScrollerDims() {
    let e = oc(), { scrollerRefs: n, scrollerElRefs: r } = this, i = !1, s = {}, l = {};
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
Tn.addStateEquality({
  scrollerClientWidths: L,
  scrollerClientHeights: L
});
function Tc(t, e) {
  for (let n of t)
    if (n.key === e)
      return n;
  return null;
}
class kn extends R {
  constructor() {
    super(...arguments), this.buildPublicEvent = _((e, n, r) => new z(e, n, r)), this.handleEl = (e) => {
      this.el = e, j(this.props.elRef, e), e && Nr(e, this.props.seg);
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
      isDraggable: !e.disableDragging && za(i, n),
      isStartResizable: !e.disableResizing && Fa(i, n),
      isEndResizable: !e.disableResizing && La(i),
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
    return f(U, { elRef: this.handleEl, elTag: e.elTag, elAttrs: e.elAttrs, elClasses: [
      ...Wa(o),
      ...i.eventRange.ui.classNames,
      ...e.elClasses || []
    ], elStyle: e.elStyle, renderProps: o, generatorName: "eventContent", customGenerator: r.eventContent, defaultGenerator: e.defaultGenerator, classNameGenerator: r.eventClassNames, didMount: r.eventDidMount, willUnmount: r.eventWillUnmount }, e.children);
  }
  componentDidUpdate(e) {
    this.el && this.props.seg !== e.seg && Nr(this.el, this.props.seg);
  }
}
class Mn extends R {
  render() {
    let { props: e, context: n } = this, { options: r } = n, { seg: i } = e, { ui: s } = i.eventRange, l = r.eventTimeFormat || e.defaultTimeFormat, o = Ki(i, l, n, e.defaultDisplayEventTime, e.defaultDisplayEventEnd);
    return f(kn, Object.assign({}, e, { elTag: "a", elStyle: {
      borderColor: s.borderColor,
      backgroundColor: s.backgroundColor
    }, elAttrs: es(i, n), defaultGenerator: kc, timeText: o }), (a, d) => f(
      x,
      null,
      f(a, { elTag: "div", elClasses: ["fc-event-main"], elStyle: { color: d.textColor } }),
      !!d.isStartResizable && f("div", { className: "fc-event-resizer fc-event-resizer-start" }),
      !!d.isEndResizable && f("div", { className: "fc-event-resizer fc-event-resizer-end" })
    ));
  }
}
Mn.addPropsEquality({
  seg: L
});
function kc(t) {
  return f(
    "div",
    { className: "fc-event-main-frame" },
    t.timeText && f("div", { className: "fc-event-time" }, t.timeText),
    f(
      "div",
      { className: "fc-event-title-container" },
      f("div", { className: "fc-event-title fc-sticky" }, t.event.title || f(x, null, " "))
    )
  );
}
const In = (t) => f(Y.Consumer, null, (e) => {
  let { options: n } = e, r = {
    isAxis: t.isAxis,
    date: e.dateEnv.toDate(t.date),
    view: e.viewApi
  };
  return f(U, { elRef: t.elRef, elTag: t.elTag || "div", elAttrs: t.elAttrs, elClasses: t.elClasses, elStyle: t.elStyle, renderProps: r, generatorName: "nowIndicatorContent", customGenerator: n.nowIndicatorContent, classNameGenerator: n.nowIndicatorClassNames, didMount: n.nowIndicatorDidMount, willUnmount: n.nowIndicatorWillUnmount }, t.children);
}), Mc = M({ day: "numeric" });
class Nn extends R {
  constructor() {
    super(...arguments), this.refineRenderProps = rt(Ic);
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
    return f(U, { elRef: e.elRef, elTag: e.elTag, elAttrs: Object.assign(Object.assign({}, e.elAttrs), i.isDisabled ? {} : { "data-date": mn(e.date) }), elClasses: [
      ...Rn(i, n.theme),
      ...e.elClasses || []
    ], elStyle: e.elStyle, renderProps: i, generatorName: "dayCellContent", customGenerator: r.dayCellContent, defaultGenerator: e.defaultGenerator, classNameGenerator: (
      // don't use custom classNames if disabled
      i.isDisabled ? void 0 : r.dayCellClassNames
    ), didMount: r.dayCellDidMount, willUnmount: r.dayCellWillUnmount }, e.children);
  }
}
function On(t) {
  return !!(t.dayCellContent || Zt("dayCellContent", t));
}
function Ic(t) {
  let { date: e, dateEnv: n, dateProfile: r, isMonthStart: i } = t, s = ss(e, t.todayRange, null, r), l = t.showDayNumber ? n.format(e, i ? t.monthStartFormat : Mc) : "";
  return Object.assign(Object.assign(Object.assign({ date: n.toDate(e), view: t.viewApi }, s), {
    isMonthStart: i,
    dayNumberText: l
  }), t.extraRenderProps);
}
class gs extends R {
  render() {
    let { props: e } = this, { seg: n } = e;
    return f(kn, { elTag: "div", elClasses: ["fc-bg-event"], elStyle: { backgroundColor: n.eventRange.ui.backgroundColor }, defaultGenerator: Nc, seg: n, timeText: "", isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: !1, isPast: e.isPast, isFuture: e.isFuture, isToday: e.isToday, disableDragging: !0, disableResizing: !0 });
  }
}
function Nc(t) {
  let { title: e } = t.event;
  return e && f("div", { className: "fc-event-title" }, t.event.title);
}
function ms(t) {
  return f("div", { className: `fc-${t}` });
}
const vs = (t) => f(Y.Consumer, null, (e) => {
  let { dateEnv: n, options: r } = e, { date: i } = t, s = r.weekNumberFormat || t.defaultFormat, l = n.computeWeekNumber(i), o = n.format(i, s), a = { num: l, text: o, date: i };
  return f(
    U,
    { elRef: t.elRef, elTag: t.elTag, elAttrs: t.elAttrs, elClasses: t.elClasses, elStyle: t.elStyle, renderProps: a, generatorName: "weekNumberContent", customGenerator: r.weekNumberContent, defaultGenerator: Oc, classNameGenerator: r.weekNumberClassNames, didMount: r.weekNumberDidMount, willUnmount: r.weekNumberWillUnmount },
    t.children
  );
});
function Oc(t) {
  return t.text;
}
const Ut = 10;
class Pc extends R {
  constructor() {
    super(...arguments), this.state = {
      titleId: wt()
    }, this.handleRootEl = (e) => {
      this.rootEl = e, this.props.elRef && j(this.props.elRef, e);
    }, this.handleDocumentMouseDown = (e) => {
      const n = Ql(e);
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
    return Tl(f(
      "div",
      Object.assign({}, r.extraAttrs, { id: r.id, className: s.join(" "), "aria-labelledby": i.titleId, ref: this.handleRootEl }),
      f(
        "div",
        { className: "fc-popover-header " + e.getClass("popoverHeader") },
        f("span", { className: "fc-popover-title", id: i.titleId }, r.title),
        f("span", { className: "fc-popover-close " + e.getIconClass("close"), title: n.closeHint, onClick: this.handleCloseClick })
      ),
      f("div", { className: "fc-popover-body " + e.getClass("popoverContent") }, r.children)
    ), r.parentEl);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleDocumentMouseDown), document.addEventListener("keydown", this.handleDocumentKeyDown), this.updateSize();
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleDocumentMouseDown), document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }
  updateSize() {
    let { isRtl: e } = this.context, { alignmentEl: n, alignGridTop: r } = this.props, { rootEl: i } = this, s = dc(n);
    if (s) {
      let l = i.getBoundingClientRect(), o = r ? G(n, ".fc-scrollgrid").getBoundingClientRect().top : s.top, a = e ? s.right - l.width : s.left;
      o = Math.max(o, Ut), a = Math.min(a, document.documentElement.clientWidth - Ut - l.width), a = Math.max(a, Ut);
      let d = i.offsetParent.getBoundingClientRect();
      Gl(i, {
        top: o - d.top,
        left: a - d.left
      });
    }
  }
}
class Hc extends V {
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
    return f(Nn, { elRef: this.handleRootEl, date: i, dateProfile: l, todayRange: s }, (a, d, c) => f(
      Pc,
      { elRef: c.ref, id: r.id, title: o, extraClassNames: ["fc-more-popover"].concat(c.className || []), extraAttrs: c, parentEl: r.parentEl, alignmentEl: r.alignmentEl, alignGridTop: r.alignGridTop, onClose: r.onClose },
      On(e) && f(a, { elTag: "div", elClasses: ["fc-more-popover-misc"] }),
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
class bs extends R {
  constructor() {
    super(...arguments), this.state = {
      isPopoverOpen: !1,
      popoverId: wt()
    }, this.handleLinkEl = (e) => {
      this.linkEl = e, this.props.elRef && j(this.props.elRef, e);
    }, this.handleClick = (e) => {
      let { props: n, context: r } = this, { moreLinkClick: i } = r.options, s = Hr(n).start;
      function l(o) {
        let { def: a, instance: d, range: c } = o.eventRange;
        return {
          event: new z(r, a, d),
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
    return f(Y.Consumer, null, (r) => {
      let { viewApi: i, options: s, calendarApi: l } = r, { moreLinkText: o } = s, { moreCnt: a } = e, d = Hr(e), c = typeof o == "function" ? o.call(l, a) : `+${a} ${o}`, h = He(s.moreLinkHint, [a], c), p = {
        num: a,
        shortText: `+${a}`,
        text: c,
        view: i
      };
      return f(
        x,
        null,
        !!e.moreCnt && f(U, { elTag: e.elTag || "a", elRef: this.handleLinkEl, elClasses: [
          ...e.elClasses || [],
          "fc-more-link"
        ], elStyle: e.elStyle, elAttrs: Object.assign(Object.assign(Object.assign({}, e.elAttrs), Ri(this.handleClick)), { title: h, "aria-expanded": n.isPopoverOpen, "aria-controls": n.isPopoverOpen ? n.popoverId : "" }), renderProps: p, generatorName: "moreLinkContent", customGenerator: s.moreLinkContent, defaultGenerator: e.defaultGenerator || Bc, classNameGenerator: s.moreLinkClassNames, didMount: s.moreLinkDidMount, willUnmount: s.moreLinkWillUnmount }, e.children),
        n.isPopoverOpen && f(Hc, { id: n.popoverId, startDate: d.start, endDate: d.end, dateProfile: e.dateProfile, todayRange: e.todayRange, extraDateSpan: e.extraDateSpan, parentEl: this.parentEl, alignmentEl: e.alignmentElRef ? e.alignmentElRef.current : this.linkEl, alignGridTop: e.alignGridTop, forceTimed: e.forceTimed, onClose: this.handlePopoverClose }, e.popoverContent())
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
    this.linkEl && (this.parentEl = G(this.linkEl, ".fc-view-harness"));
  }
}
function Bc(t) {
  return t.text;
}
function Hr(t) {
  if (t.allDayDate)
    return {
      start: t.allDayDate,
      end: N(t.allDayDate, 1)
    };
  let { hiddenSegs: e } = t;
  return {
    start: ys(e),
    end: Uc(e)
  };
}
function ys(t) {
  return t.reduce($c).eventRange.range.start;
}
function $c(t, e) {
  return t.eventRange.range.start < e.eventRange.range.start ? t : e;
}
function Uc(t) {
  return t.reduce(zc).eventRange.range.end;
}
function zc(t, e) {
  return t.eventRange.range.end > e.eventRange.range.end ? t : e;
}
const Fc = [], As = {
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
}, Es = Object.assign(Object.assign({}, As), {
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
function Lc(t) {
  let e = t.length > 0 ? t[0].code : "en", n = Fc.concat(t), r = {
    en: Es
  };
  for (let i of n)
    r[i.code] = i;
  return {
    map: r,
    defaultCode: e
  };
}
function _s(t, e) {
  return typeof t == "object" && !Array.isArray(t) ? Ss(t.code, [t.code], t) : Wc(t, e);
}
function Wc(t, e) {
  let n = [].concat(t || []), r = jc(n, e) || Es;
  return Ss(t, n, r);
}
function jc(t, e) {
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
function Ss(t, e, n) {
  let r = yn([As, n], ["buttonText"]);
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
    id: me(),
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
function Vc(t, e) {
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
      a === void 0 ? (n[o] = l.id, i(l.deps), r = Qc(r, l)) : a !== l.id && console.warn(`Duplicate plugin '${o}'`);
    }
  }
  return t && i(t), i(e), r;
}
function Gc() {
  let t = [], e = [], n;
  return (r, i) => ((!n || !ne(r, t) || !ne(i, e)) && (n = Vc(r, i)), t = r, e = i, n);
}
function Qc(t, e) {
  return {
    premiumReleaseDate: qc(t.premiumReleaseDate, e.premiumReleaseDate),
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
function qc(t, e) {
  return t === void 0 ? e : e === void 0 ? t : new Date(Math.max(t.valueOf(), e.valueOf()));
}
class le extends We {
}
le.prototype.classes = {
  root: "fc-theme-standard",
  tableCellShaded: "fc-cell-shaded",
  buttonGroup: "fc-button-group",
  button: "fc-button fc-button-primary",
  buttonActive: "fc-button-active"
};
le.prototype.baseIconClass = "fc-icon";
le.prototype.iconClasses = {
  close: "fc-icon-x",
  prev: "fc-icon-chevron-left",
  next: "fc-icon-chevron-right",
  prevYear: "fc-icon-chevrons-left",
  nextYear: "fc-icon-chevrons-right"
};
le.prototype.rtlIconClasses = {
  prev: "fc-icon-chevron-right",
  next: "fc-icon-chevron-left",
  prevYear: "fc-icon-chevrons-right",
  nextYear: "fc-icon-chevrons-left"
};
le.prototype.iconOverrideOption = "buttonIcons";
le.prototype.iconOverrideCustomButtonOption = "icon";
le.prototype.iconOverridePrefix = "fc-icon-";
function Zc(t, e) {
  let n = {}, r;
  for (r in t)
    nn(r, n, t, e);
  for (r in e)
    nn(r, n, t, e);
  return n;
}
function nn(t, e, n, r) {
  if (e[t])
    return e[t];
  let i = Yc(t, e, n, r);
  return i && (e[t] = i), i;
}
function Yc(t, e, n, r) {
  let i = n[t], s = r[t], l = (c) => i && i[c] !== null ? i[c] : s && s[c] !== null ? s[c] : null, o = l("component"), a = l("superType"), d = null;
  if (a) {
    if (a === t)
      throw new Error("Can't have a custom view type that references itself");
    d = nn(a, e, n, r);
  }
  return !o && d && (o = d.component), o ? {
    type: t,
    component: o,
    defaults: Object.assign(Object.assign({}, d ? d.defaults : {}), i ? i.rawOptions : {}),
    overrides: Object.assign(Object.assign({}, d ? d.overrides : {}), s ? s.rawOptions : {})
  } : null;
}
function Br(t) {
  return pe(t, Jc);
}
function Jc(t) {
  let e = typeof t == "function" ? { component: t } : t, { component: n } = e;
  return e.content ? n = $r(e) : n && !(n.prototype instanceof R) && (n = $r(Object.assign(Object.assign({}, e), { content: n }))), {
    superType: e.type,
    component: n,
    rawOptions: e
    // includes type and component too :(
  };
}
function $r(t) {
  return (e) => f(Y.Consumer, null, (n) => f(U, { elTag: "div", elClasses: Hi(n.viewSpec), renderProps: Object.assign(Object.assign({}, e), { nextDayThreshold: n.options.nextDayThreshold }), generatorName: void 0, customGenerator: t.content, classNameGenerator: t.classNames, didMount: t.didMount, willUnmount: t.willUnmount }));
}
function Kc(t, e, n, r) {
  let i = Br(t), s = Br(e.views), l = Zc(i, s);
  return pe(l, (o) => Xc(o, s, e, n, r));
}
function Xc(t, e, n, r, i) {
  let s = t.overrides.duration || t.defaults.duration || r.duration || n.duration, l = null, o = "", a = "", d = {};
  if (s && (l = ed(s), l)) {
    let p = qt(l);
    o = p.unit, p.value === 1 && (a = o, d = e[o] ? e[o].rawOptions : {});
  }
  let c = (p) => {
    let u = p.buttonText || {}, m = t.defaults.buttonTextKey;
    return m != null && u[m] != null ? u[m] : u[t.type] != null ? u[t.type] : u[a] != null ? u[a] : null;
  }, h = (p) => {
    let u = p.buttonHints || {}, m = t.defaults.buttonTextKey;
    return m != null && u[m] != null ? u[m] : u[t.type] != null ? u[t.type] : u[a] != null ? u[a] : null;
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
    buttonTextDefault: c(i) || t.defaults.buttonText || c(Be) || t.type,
    // not DRY
    buttonTitleOverride: h(r) || h(n) || t.overrides.buttonHint,
    buttonTitleDefault: h(i) || t.defaults.buttonHint || h(Be)
    // will eventually fall back to buttonText
  };
}
let Ur = {};
function ed(t) {
  let e = JSON.stringify(t), n = Ur[e];
  return n === void 0 && (n = w(t), Ur[e] = n), n;
}
function td(t, e) {
  return e.type === "CHANGE_VIEW_TYPE" && (t = e.viewType), t;
}
function nd(t, e) {
  return e.type === "CHANGE_DATE" ? e.dateMarker : t;
}
function rd(t, e, n) {
  let r = t.initialDate;
  return r != null ? e.createMarker(r) : n.getDateMarker();
}
function id(t, e) {
  return e.type === "SET_OPTION" ? Object.assign(Object.assign({}, t), { [e.optionName]: e.rawOptionValue }) : t;
}
function sd(t, e, n, r) {
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
function ld(t, e, n) {
  let r = e ? e.activeRange : null;
  return ws({}, hd(t, n), r, n);
}
function od(t, e, n, r) {
  let i = n ? n.activeRange : null;
  switch (e.type) {
    case "ADD_EVENT_SOURCES":
      return ws(t, e.sources, i, r);
    case "REMOVE_EVENT_SOURCE":
      return cd(t, e.sourceId);
    case "PREV":
    // TODO: how do we track all actions that affect dateProfile :(
    case "NEXT":
    case "CHANGE_DATE":
    case "CHANGE_VIEW_TYPE":
      return n ? Ds(t, i, r) : t;
    case "FETCH_EVENT_SOURCES":
      return Pn(t, e.sourceIds ? (
        // why no type?
        Mi(e.sourceIds)
      ) : Rs(t, r), i, e.isRefetch || !1, r);
    case "RECEIVE_EVENTS":
    case "RECEIVE_EVENT_ERROR":
      return fd(t, e.sourceId, e.fetchId, e.fetchRange);
    case "REMOVE_ALL_EVENT_SOURCES":
      return {};
    default:
      return t;
  }
}
function ad(t, e, n) {
  let r = e ? e.activeRange : null;
  return Pn(t, Rs(t, n), r, !0, n);
}
function Cs(t) {
  for (let e in t)
    if (t[e].isFetching)
      return !0;
  return !1;
}
function ws(t, e, n, r) {
  let i = {};
  for (let s of e)
    i[s.sourceId] = s;
  return n && (i = Ds(i, n, r)), Object.assign(Object.assign({}, t), i);
}
function cd(t, e) {
  return xe(t, (n) => n.sourceId !== e);
}
function Ds(t, e, n) {
  return Pn(t, xe(t, (r) => dd(r, e, n)), e, !1, n);
}
function dd(t, e, n) {
  return xs(t, n) ? !n.options.lazyFetching || !t.fetchRange || t.isFetching || // always cancel outdated in-progress fetches
  e.start < t.fetchRange.start || e.end > t.fetchRange.end : !t.latestFetchId;
}
function Pn(t, e, n, r, i) {
  let s = {};
  for (let l in t) {
    let o = t[l];
    e[l] ? s[l] = ud(o, n, r, i) : s[l] = o;
  }
  return s;
}
function ud(t, e, n, r) {
  let { options: i, calendarApi: s } = r, l = r.pluginHooks.eventSourceDefs[t.sourceDefId], o = me();
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
function fd(t, e, n, r) {
  let i = t[e];
  return i && // not already removed
  n === i.latestFetchId ? Object.assign(Object.assign({}, t), { [e]: Object.assign(Object.assign({}, i), { isFetching: !1, fetchRange: r }) }) : t;
}
function Rs(t, e) {
  return xe(t, (n) => xs(n, e));
}
function hd(t, e) {
  let n = Vi(e), r = [].concat(t.eventSources || []), i = [];
  t.initialEvents && r.unshift(t.initialEvents), t.events && r.unshift(t.events);
  for (let s of r) {
    let l = ji(s, e, n);
    l && i.push(l);
  }
  return i;
}
function xs(t, e) {
  return !e.pluginHooks.eventSourceDefs[t.sourceDefId].ignoreRange;
}
function pd(t, e) {
  switch (e.type) {
    case "UNSELECT_DATES":
      return null;
    case "SELECT_DATES":
      return e.selection;
    default:
      return t;
  }
}
function gd(t, e) {
  switch (e.type) {
    case "UNSELECT_EVENT":
      return "";
    case "SELECT_EVENT":
      return e.eventInstanceId;
    default:
      return t;
  }
}
function md(t, e) {
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
function vd(t, e) {
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
function bd(t, e, n, r, i) {
  let s = t.headerToolbar ? zr(t.headerToolbar, t, e, n, r, i) : null, l = t.footerToolbar ? zr(t.footerToolbar, t, e, n, r, i) : null;
  return { header: s, footer: l };
}
function zr(t, e, n, r, i, s) {
  let l = {}, o = [], a = !1;
  for (let d in t) {
    let c = t[d], h = yd(c, e, n, r, i, s);
    l[d] = h.widgets, o.push(...h.viewsWithButtons), a = a || h.hasTitle;
  }
  return { sectionWidgets: l, viewsWithButtons: o, hasTitle: a };
}
function yd(t, e, n, r, i, s) {
  let l = e.direction === "rtl", o = e.customButtons || {}, a = n.buttonText || {}, d = e.buttonText || {}, c = n.buttonHints || {}, h = e.buttonHints || {}, p = t ? t.split(" ") : [], u = [], m = !1;
  return { widgets: p.map((b) => b.split(",").map((y) => {
    if (y === "title")
      return m = !0, { buttonName: y };
    let A, C, S, P, T, O;
    if (A = o[y])
      S = (D) => {
        A.click && A.click.call(D.target, D, D.target);
      }, (P = r.getCustomButtonIconClass(A)) || (P = r.getIconClass(y, l)) || (T = A.text), O = A.hint || A.text;
    else if (C = i[y]) {
      u.push(y), S = () => {
        s.changeView(y);
      }, (T = C.buttonTextOverride) || (P = r.getIconClass(y, l)) || (T = C.buttonTextDefault);
      let D = C.buttonTextOverride || C.buttonTextDefault;
      O = He(
        C.buttonTitleOverride || C.buttonTitleDefault || e.viewHint,
        [D, y],
        // view-name = buttonName
        D
      );
    } else if (s[y])
      if (S = () => {
        s[y]();
      }, (T = a[y]) || (P = r.getIconClass(y, l)) || (T = d[y]), y === "prevYear" || y === "nextYear") {
        let D = y === "prevYear" ? "prev" : "next";
        O = He(c[D] || h[D], [
          d.year || "year",
          "year"
        ], d[y]);
      } else
        O = (D) => He(c[y] || h[y], [
          d[D] || D,
          D
        ], d[y]);
    return { buttonName: y, buttonClick: S, buttonIcon: P, buttonText: T, buttonHint: O };
  })), viewsWithButtons: u, hasTitle: m };
}
class Ad {
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
let Ed = {
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
const _d = se({
  name: "array-event-source",
  eventSourceDefs: [Ed]
});
let Sd = {
  parseMeta(t) {
    return typeof t.events == "function" ? t.events : null;
  },
  fetch(t, e, n) {
    const { dateEnv: r } = t.context, i = t.eventSource.meta;
    Za(i.bind(null, ts(t.range, r)), (s) => e({ rawEvents: s }), n);
  }
};
const Cd = se({
  name: "func-event-source",
  eventSourceDefs: [Sd]
}), wd = {
  method: String,
  extraParams: g,
  startParam: String,
  endParam: String,
  timeZoneParam: String
};
let Dd = {
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
    const { meta: r } = t.eventSource, i = xd(r, t.range, t.context);
    Ya(r.method, r.url, i).then(([s, l]) => {
      e({ rawEvents: s, response: l });
    }, n);
  }
};
const Rd = se({
  name: "json-event-source",
  eventSourceRefiners: wd,
  eventSourceDefs: [Dd]
});
function xd(t, e, n) {
  let { dateEnv: r, options: i } = n, s, l, o, a, d = {};
  return s = t.startParam, s == null && (s = i.startParam), l = t.endParam, l == null && (l = i.endParam), o = t.timeZoneParam, o == null && (o = i.timeZoneParam), typeof t.extraParams == "function" ? a = t.extraParams() : a = t.extraParams || {}, Object.assign(d, a), d[s] = r.formatIso(e.start), d[l] = r.formatIso(e.end), r.timeZone !== "local" && (d[o] = r.timeZone), d;
}
const Td = {
  daysOfWeek: g,
  startTime: w,
  endTime: w,
  duration: w,
  startRecur: g,
  endRecur: g
};
let kd = {
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
      return t.duration && (r = t.duration), !r && t.startTime && t.endTime && (r = io(t.endTime, t.startTime)), {
        allDayGuess: !t.startTime && !t.endTime,
        duration: r,
        typeData: n
        // doesn't need endTime anymore but oh well
      };
    }
    return null;
  },
  expand(t, e, n) {
    let r = ge(e, { start: t.startRecur, end: t.endRecur });
    return r ? Id(t.daysOfWeek, t.startTime, t.dateEnv, n, r) : [];
  }
};
const Md = se({
  name: "simple-recurring-event",
  recurringTypes: [kd],
  eventRefiners: Td
});
function Id(t, e, n, r, i) {
  let s = t ? Mi(t) : null, l = k(i.start), o = i.end, a = [];
  for (e && (e.milliseconds < 0 ? o = N(o, 1) : e.milliseconds >= 1e3 * 60 * 60 * 24 && (l = N(l, -1))); l < o; ) {
    let d;
    (!s || s[l.getUTCDay()]) && (e ? d = r.add(l, e) : d = l, a.push(r.createMarker(n.toDate(d)))), l = N(l, 1);
  }
  return a;
}
const Nd = se({
  name: "change-handler",
  optionChangeHandlers: {
    events(t, e) {
      Fr([t], e);
    },
    eventSources: Fr
  }
});
function Fr(t, e) {
  let n = An(e.getCurrentData().eventSources);
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
function Od(t, e) {
  e.emitter.trigger("datesSet", Object.assign(Object.assign({}, ts(t.activeRange, e.dateEnv)), { view: e.viewApi }));
}
function Pd(t, e) {
  let { emitter: n } = e;
  n.hasHandlers("eventsSet") && n.trigger("eventsSet", Dn(t, e));
}
const Hd = [
  _d,
  Cd,
  Rd,
  Md,
  Nd,
  se({
    name: "misc",
    isLoadingFuncs: [
      (t) => Cs(t.eventSources)
    ],
    propSetHandlers: {
      dateProfile: Od,
      eventStore: Pd
    }
  })
];
class Bd {
  constructor(e, n) {
    this.runTaskOption = e, this.drainedOption = n, this.queue = [], this.delayedRunner = new pn(this.drain.bind(this));
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
function $d(t, e, n) {
  let r;
  return /^(year|month)$/.test(t.currentRangeUnit) ? r = t.currentRange : r = t.activeRange, n.formatRange(r.start, r.end, M(e.titleFormat || Ud(t)), {
    isEndExclusive: t.isRangeAllDay,
    defaultSeparator: e.titleRangeSeparator
  });
}
function Ud(t) {
  let { currentRangeUnit: e } = t;
  if (e === "year")
    return { year: "numeric" };
  if (e === "month")
    return { year: "numeric", month: "long" };
  let n = ft(t.currentRange.start, t.currentRange.end);
  return n !== null && n > 1 ? { year: "numeric", month: "short", day: "numeric" } : { year: "numeric", month: "long", day: "numeric" };
}
class Lr {
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
class zd {
  constructor(e) {
    this.computeCurrentViewData = _(this._computeCurrentViewData), this.organizeRawLocales = _(Lc), this.buildLocale = _(_s), this.buildPluginHooks = Gc(), this.buildDateEnv = _(Fd), this.buildTheme = _(Ld), this.parseToolbars = _(bd), this.buildViewSpecs = _(Kc), this.buildDateProfileGenerator = rt(Wd), this.buildViewApi = _(jd), this.buildViewUiProps = rt(Qd), this.buildEventUiBySource = _(Vd, L), this.buildEventUiBases = _(Gd), this.parseContextBusinessHours = rt(qd), this.buildTitle = _($d), this.nowManager = new Lr(), this.emitter = new Da(), this.actionRunner = new Bd(this._handleAction.bind(this), this.updateData.bind(this)), this.currentCalendarOptionsInput = {}, this.currentCalendarOptionsRefined = {}, this.currentViewOptionsInput = {}, this.currentViewOptionsRefined = {}, this.currentCalendarOptionsRefiners = {}, this.optionsForRefining = [], this.optionsForHandling = [], this.getCurrentData = () => this.data, this.dispatch = (p) => {
      this.actionRunner.request(p);
    }, this.props = e, this.actionRunner.pause(), this.nowManager = new Lr();
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
    }, o = rd(r.calendarOptions, r.dateEnv, this.nowManager), a = s.dateProfileGenerator.build(o);
    q(a.activeRange, o) || (o = a.currentRange.start);
    for (let p of r.pluginHooks.contextInit)
      p(l);
    let d = ld(r.calendarOptions, a, l), c = {
      dynamicOptionOverrides: n,
      currentViewType: i,
      currentDate: o,
      dateProfile: a,
      businessHours: this.parseContextBusinessHours(l),
      eventSources: d,
      eventUiBases: {},
      eventStore: Z(),
      renderableEventStore: Z(),
      dateSelection: null,
      eventSelection: "",
      eventDrag: null,
      eventResize: null,
      selectionConfig: this.buildViewUiProps(l).selectionConfig
    }, h = Object.assign(Object.assign({}, l), c);
    for (let p of r.pluginHooks.reducers)
      Object.assign(c, p(null, null, h));
    zt(c, l) && this.emitter.trigger("loading", !0), this.state = c, this.updateData(), this.actionRunner.resume();
  }
  resetOptions(e, n) {
    let { props: r } = this;
    n === void 0 ? r.optionOverrides = e : (r.optionOverrides = Object.assign(Object.assign({}, r.optionOverrides || {}), e), this.optionsForRefining.push(...n)), (n === void 0 || n.length) && this.actionRunner.request({
      type: "NOTHING"
    });
  }
  _handleAction(e) {
    let { props: n, state: r, emitter: i } = this, s = id(r.dynamicOptionOverrides, e), l = this.computeOptionsData(n.optionOverrides, s, n.calendarApi), o = td(r.currentViewType, e), a = this.computeCurrentViewData(o, l, n.optionOverrides, s);
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
    }, { currentDate: c, dateProfile: h } = r;
    this.data && this.data.dateProfileGenerator !== a.dateProfileGenerator && (h = a.dateProfileGenerator.build(c)), c = nd(c, e), h = sd(h, e, c, a.dateProfileGenerator), (e.type === "PREV" || // TODO: move this logic into DateProfileGenerator
    e.type === "NEXT" || // "
    !q(h.currentRange, c)) && (c = h.currentRange.start);
    let p = od(r.eventSources, e, h, d), u = Ea(r.eventStore, e, p, h, d), v = Cs(p) && !a.options.progressiveEventRendering && r.renderableEventStore || u, { eventUiSingleBase: b, selectionConfig: y } = this.buildViewUiProps(d), A = this.buildEventUiBySource(p), C = this.buildEventUiBases(v.defs, b, A), S = {
      dynamicOptionOverrides: s,
      currentViewType: o,
      currentDate: c,
      dateProfile: h,
      eventSources: p,
      eventStore: u,
      renderableEventStore: v,
      selectionConfig: y,
      eventUiBases: C,
      businessHours: this.parseContextBusinessHours(d),
      dateSelection: pd(r.dateSelection, e),
      eventSelection: gd(r.eventSelection, e),
      eventDrag: md(r.eventDrag, e),
      eventResize: vd(r.eventResize, e)
    }, P = Object.assign(Object.assign({}, d), S);
    for (let D of l.pluginHooks.reducers)
      Object.assign(S, D(r, e, P));
    let T = zt(r, d), O = zt(S, d);
    !T && O ? i.trigger("loading", !0) : T && !O && i.trigger("loading", !1), this.state = S, n.onAction && n.onAction(e);
  }
  updateData() {
    let { props: e, state: n } = this, r = this.data, i = this.computeOptionsData(e.optionOverrides, n.dynamicOptionOverrides, e.calendarApi), s = this.computeCurrentViewData(n.currentViewType, i, e.optionOverrides, n.dynamicOptionOverrides), l = this.data = Object.assign(Object.assign(Object.assign({ nowManager: this.nowManager, viewTitle: this.buildTitle(n.dateProfile, s.options, i.dateEnv), calendarApi: e.calendarApi, dispatch: this.dispatch, emitter: this.emitter, getCurrentData: this.getCurrentData }, i), s), n), o = i.pluginHooks.optionChangeHandlers, a = r && r.calendarOptions, d = i.calendarOptions;
    if (a && a !== d) {
      a.timeZone !== d.timeZone && (n.eventSources = l.eventSources = ad(l.eventSources, n.dateProfile, l), n.eventStore = l.eventStore = kr(l.eventStore, r.dateEnv, l.dateEnv), n.renderableEventStore = l.renderableEventStore = kr(l.renderableEventStore, r.dateEnv, l.dateEnv));
      for (let c in o)
        (this.optionsForHandling.indexOf(c) !== -1 || a[c] !== d[c]) && o[c](d[c], l);
    }
    this.optionsForHandling = [], e.onData && e.onData(l);
  }
  computeOptionsData(e, n, r) {
    if (!this.optionsForRefining.length && e === this.stableOptionOverrides && n === this.stableDynamicOptionOverrides)
      return this.stableCalendarOptionsData;
    let { refinedOptions: i, pluginHooks: s, localeDefaults: l, availableLocaleData: o, extra: a } = this.processRawCalendarOptions(e, n);
    Wr(a);
    let d = this.buildDateEnv(i.timeZone, i.locale, i.weekNumberCalculation, i.firstDay, i.weekText, s, o, i.defaultRangeSeparator), c = this.buildViewSpecs(s.views, this.stableOptionOverrides, this.stableDynamicOptionOverrides, l), h = this.buildTheme(i, s), p = this.parseToolbars(i, this.stableOptionOverrides, h, c, r);
    return this.stableCalendarOptionsData = {
      calendarOptions: i,
      pluginHooks: s,
      dateEnv: d,
      viewSpecs: c,
      theme: h,
      toolbarConfig: p,
      localeDefaults: l,
      availableRawLocales: o.map
    };
  }
  // always called from behind a memoizer
  processRawCalendarOptions(e, n) {
    let { locales: r, locale: i } = Nt([
      Be,
      e,
      n
    ]), s = this.organizeRawLocales(r), l = s.map, o = this.buildLocale(i || s.defaultCode, l).options, a = this.buildPluginHooks(e.plugins || [], Hd), d = this.currentCalendarOptionsRefiners = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Cr), wr), Dr), a.listenerRefiners), a.optionRefiners), c = {}, h = Nt([
      Be,
      o,
      e,
      n
    ]), p = {}, u = this.currentCalendarOptionsInput, m = this.currentCalendarOptionsRefined, v = !1;
    for (let b in h)
      this.optionsForRefining.indexOf(b) === -1 && (h[b] === u[b] || ae[b] && b in u && ae[b](u[b], h[b])) ? p[b] = m[b] : d[b] ? (p[b] = d[b](h[b]), v = !0) : c[b] = u[b];
    return v && (this.currentCalendarOptionsInput = h, this.currentCalendarOptionsRefined = p, this.stableOptionOverrides = e, this.stableDynamicOptionOverrides = n), this.optionsForHandling.push(...this.optionsForRefining), this.optionsForRefining = [], {
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
    Wr(o), this.nowManager.handleInput(n.dateEnv, l.now);
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
    let l = Nt([
      Be,
      e.optionDefaults,
      r,
      i,
      e.optionOverrides,
      s
    ]), o = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Cr), wr), Dr), $o), n.listenerRefiners), n.optionRefiners), a = {}, d = this.currentViewOptionsInput, c = this.currentViewOptionsRefined, h = !1, p = {};
    for (let u in l)
      l[u] === d[u] || ae[u] && ae[u](l[u], d[u]) ? a[u] = c[u] : (l[u] === this.currentCalendarOptionsInput[u] || ae[u] && ae[u](l[u], this.currentCalendarOptionsInput[u]) ? u in this.currentCalendarOptionsRefined && (a[u] = this.currentCalendarOptionsRefined[u]) : o[u] ? a[u] = o[u](l[u]) : p[u] = l[u], h = !0);
    return h && (this.currentViewOptionsInput = l, this.currentViewOptionsRefined = a), {
      rawOptions: this.currentViewOptionsInput,
      refinedOptions: this.currentViewOptionsRefined,
      extra: p
    };
  }
}
function Fd(t, e, n, r, i, s, l, o) {
  let a = _s(e || l.defaultCode, l.map);
  return new Zo({
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
function Ld(t, e) {
  let n = e.themeClasses[t.themeSystem] || le;
  return new n(t);
}
function Wd(t) {
  let e = t.dateProfileGeneratorClass || Ui;
  return new e(t);
}
function jd(t, e, n) {
  return new Ad(t, e, n);
}
function Vd(t) {
  return pe(t, (e) => e.ui);
}
function Gd(t, e, n) {
  let r = { "": e };
  for (let i in t) {
    let s = t[i];
    s.sourceId && n[s.sourceId] && (r[i] = n[s.sourceId]);
  }
  return r;
}
function Qd(t) {
  let { options: e } = t;
  return {
    eventUiSingleBase: yt({
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
    selectionConfig: yt({
      constraint: e.selectConstraint,
      overlap: typeof e.selectOverlap == "boolean" ? e.selectOverlap : void 0,
      allow: e.selectAllow
    }, t)
  };
}
function zt(t, e) {
  for (let n of e.pluginHooks.isLoadingFuncs)
    if (n(t))
      return !0;
  return !1;
}
function qd(t) {
  return ka(t.options.businessHours, t);
}
function Wr(t, e) {
  for (let n in t)
    console.warn(`Unknown option '${n}'`);
}
class Zd extends R {
  render() {
    let e = this.props.widgetGroups.map((n) => this.renderWidgetGroup(n));
    return f("div", { className: "fc-toolbar-chunk" }, ...e);
  }
  renderWidgetGroup(e) {
    let { props: n } = this, { theme: r } = this.context, i = [], s = !0;
    for (let l of e) {
      let { buttonName: o, buttonClick: a, buttonText: d, buttonIcon: c, buttonHint: h } = l;
      if (o === "title")
        s = !1, i.push(f("h2", { className: "fc-toolbar-title", id: n.titleId }, n.title));
      else {
        let p = o === n.activeButton, u = !n.isTodayEnabled && o === "today" || !n.isPrevEnabled && o === "prev" || !n.isNextEnabled && o === "next", m = [`fc-${o}-button`, r.getClass("button")];
        p && m.push(r.getClass("buttonActive")), i.push(f("button", { type: "button", title: typeof h == "function" ? h(n.navUnit) : h, disabled: u, "aria-pressed": p, className: m.join(" "), onClick: a }, d || (c ? f("span", { className: c, role: "img" }) : "")));
      }
    }
    if (i.length > 1) {
      let l = s && r.getClass("buttonGroup") || "";
      return f("div", { className: l }, ...i);
    }
    return i[0];
  }
}
class jr extends R {
  render() {
    let { model: e, extraClassName: n } = this.props, r = !1, i, s, l = e.sectionWidgets, o = l.center;
    return l.left ? (r = !0, i = l.left) : i = l.start, l.right ? (r = !0, s = l.right) : s = l.end, f(
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
    return f(Zd, { key: e, widgetGroups: n, title: r.title, navUnit: r.navUnit, activeButton: r.activeButton, isTodayEnabled: r.isTodayEnabled, isPrevEnabled: r.isPrevEnabled, isNextEnabled: r.isNextEnabled, titleId: r.titleId });
  }
}
class Yd extends R {
  constructor() {
    super(...arguments), this.state = {
      availableWidth: null
    }, this.handleEl = (e) => {
      this.el = e, j(this.props.elRef, e), this.updateAvailableWidth();
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
    return r ? n.availableWidth !== null ? s = n.availableWidth / r : l = `${1 / r * 100}%` : s = e.height || "", f("div", { "aria-labelledby": e.labeledById, ref: this.handleEl, className: i.join(" "), style: { height: s, paddingBottom: l } }, e.children);
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
class Jd extends is {
  constructor(e) {
    super(e), this.handleSegClick = (n, r) => {
      let { component: i } = this, { context: s } = i, l = Kt(r);
      if (l && // might be the <div> surrounding the more link
      i.isValidSegDownEl(n.target)) {
        let o = G(n.target, ".fc-event-forced-url"), a = o ? o.querySelector("a[href]").href : "";
        s.emitter.trigger("eventClick", {
          el: r,
          event: new z(i.context, l.eventRange.def, l.eventRange.instance),
          jsEvent: n,
          view: s.viewApi
        }), a && !n.defaultPrevented && (window.location.href = a);
      }
    }, this.destroy = Di(
      e.el,
      "click",
      ".fc-event",
      // on both fg and bg events
      this.handleSegClick
    );
  }
}
class Kd extends is {
  constructor(e) {
    super(e), this.handleEventElRemove = (n) => {
      n === this.currentSegEl && this.handleSegLeave(null, this.currentSegEl);
    }, this.handleSegEnter = (n, r) => {
      Kt(r) && (this.currentSegEl = r, this.triggerEvent("eventMouseEnter", n, r));
    }, this.handleSegLeave = (n, r) => {
      this.currentSegEl && (this.currentSegEl = null, this.triggerEvent("eventMouseLeave", n, r));
    }, this.removeHoverListeners = Zl(
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
    let { component: i } = this, { context: s } = i, l = Kt(r);
    (!n || i.isValidSegDownEl(n.target)) && s.emitter.trigger(e, {
      el: r,
      event: new z(s, l.eventRange.def, l.eventRange.instance),
      jsEvent: n,
      view: s.viewApi
    });
  }
}
class Xd extends be {
  constructor() {
    super(...arguments), this.buildViewContext = _(Ko), this.buildViewPropTransformers = _(tu), this.buildToolbarProps = _(eu), this.headerRef = H(), this.footerRef = H(), this.interactionsStore = {}, this.state = {
      viewLabelId: wt()
    }, this.registerInteractiveComponent = (e, n) => {
      let r = Xa(e, n), l = [
        Jd,
        Kd
      ].concat(this.props.pluginHooks.componentInteractions).map((o) => new o(r));
      this.interactionsStore[e.uid] = l, Pr[e.uid] = r;
    }, this.unregisterInteractiveComponent = (e) => {
      let n = this.interactionsStore[e.uid];
      if (n) {
        for (let r of n)
          r.destroy();
        delete this.interactionsStore[e.uid];
      }
      delete Pr[e.uid];
    }, this.resizeRunner = new pn(() => {
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
    return f(
      Y.Provider,
      { value: o },
      f(ke, { unit: "day" }, (d) => {
        let c = this.buildToolbarProps(e.viewSpec, e.dateProfile, e.dateProfileGenerator, e.currentDate, d, e.viewTitle);
        return f(
          x,
          null,
          n.header && f(jr, Object.assign({ ref: this.headerRef, extraClassName: "fc-header-toolbar", model: n.header, titleId: a }, c)),
          f(
            Yd,
            { liquid: i, height: s, aspectRatio: l, labeledById: a },
            this.renderView(e),
            this.buildAppendContent()
          ),
          n.footer && f(jr, Object.assign({ ref: this.footerRef, extraClassName: "fc-footer-toolbar", model: n.footer, titleId: "" }, c))
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
    return f(x, {}, ...n);
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
    return f(l, Object.assign({}, i));
  }
}
function eu(t, e, n, r, i, s) {
  let l = n.build(i, void 0, !1), o = n.buildPrev(e, r, !1), a = n.buildNext(e, r, !1);
  return {
    title: s,
    activeButton: t.type,
    navUnit: t.singleUnit,
    isTodayEnabled: l.isValid && !q(e.currentRange, i),
    isPrevEnabled: o.isValid,
    isNextEnabled: a.isValid
  };
}
function tu(t) {
  return t.map((e) => new e());
}
class nu extends tc {
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
        mt(() => {
          Fe(f(Ka, { options: r.calendarOptions, theme: r.theme, emitter: r.emitter }, (i, s, l, o) => (this.setClassNames(i), this.setHeight(s), f(
            Pi.Provider,
            { value: this.customContentRenderId },
            f(Xd, Object.assign({ isHeightAuto: l, forPrint: o }, r))
          ))), this.el);
        });
      } else this.isRendered && (this.isRendered = !1, Fe(null, this.el), this.setClassNames([]), this.setHeight(""));
    }, Bl(e), this.el = e, this.renderRunner = new pn(this.handleRenderRequest), new zd({
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
    mt(() => {
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
    if (!ne(e, this.currentClassNames)) {
      let { classList: n } = this.el;
      for (let r of this.currentClassNames)
        n.remove(r);
      for (let r of e)
        n.add(r);
      this.currentClassNames = e;
    }
  }
  setHeight(e) {
    wi(this.el, "height", e);
  }
}
class ru extends V {
  constructor() {
    super(...arguments), this.headerElRef = H();
  }
  renderSimpleLayout(e, n) {
    let { props: r, context: i } = this, s = [], l = Et(i.options);
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
    }), f(
      vt,
      { elClasses: ["fc-daygrid"], viewSpec: i.viewSpec },
      f(Tn, { liquid: !r.isHeightAuto && !r.forPrint, collapsibleWidth: r.forPrint, cols: [], sections: s })
    );
  }
  renderHScrollLayout(e, n, r, i) {
    let s = this.context.pluginHooks.scrollGridImpl;
    if (!s)
      throw new Error("No ScrollGrid implementation");
    let { props: l, context: o } = this, a = !l.forPrint && Et(o.options), d = !l.forPrint && ps(o.options), c = [];
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
        content: tn
      }]
    }), f(
      vt,
      { elClasses: ["fc-daygrid"], viewSpec: o.viewSpec },
      f(s, { liquid: !l.isHeightAuto && !l.forPrint, forPrint: l.forPrint, collapsibleWidth: l.forPrint, colGroups: [{ cols: [{ span: r, minWidth: i }] }], sections: c })
    );
  }
}
function st(t, e) {
  let n = [];
  for (let r = 0; r < e; r += 1)
    n[r] = [];
  for (let r of t)
    n[r.row].push(r);
  return n;
}
function Ke(t, e) {
  let n = [];
  for (let r = 0; r < e; r += 1)
    n[r] = [];
  for (let r of t)
    n[r.firstCol].push(r);
  return n;
}
function Vr(t, e) {
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
const Ts = M({
  hour: "numeric",
  minute: "2-digit",
  omitZeroMinute: !0,
  meridiem: "narrow"
});
function ks(t) {
  let { display: e } = t.eventRange.ui;
  return e === "list-item" || e === "auto" && !t.eventRange.def.allDay && t.firstCol === t.lastCol && // can't be multi-day
  t.isStart && // "
  t.isEnd;
}
class Ms extends R {
  render() {
    let { props: e } = this;
    return f(Mn, Object.assign({}, e, { elClasses: ["fc-daygrid-event", "fc-daygrid-block-event", "fc-h-event"], defaultTimeFormat: Ts, defaultDisplayEventEnd: e.defaultDisplayEventEnd, disableResizing: !e.seg.eventRange.def.allDay }));
  }
}
class Is extends R {
  render() {
    let { props: e, context: n } = this, { options: r } = n, { seg: i } = e, s = r.eventTimeFormat || Ts, l = Ki(i, s, n, !0, e.defaultDisplayEventEnd);
    return f(kn, Object.assign({}, e, { elTag: "a", elClasses: ["fc-daygrid-event", "fc-daygrid-dot-event"], elAttrs: es(e.seg, n), defaultGenerator: iu, timeText: l, isResizing: !1, isDateSelecting: !1 }));
  }
}
function iu(t) {
  return f(
    x,
    null,
    f("div", { className: "fc-daygrid-event-dot", style: { borderColor: t.borderColor || t.backgroundColor } }),
    t.timeText && f("div", { className: "fc-event-time" }, t.timeText),
    f("div", { className: "fc-event-title" }, t.event.title || f(x, null, " "))
  );
}
class su extends R {
  constructor() {
    super(...arguments), this.compileSegs = _(lu);
  }
  render() {
    let { props: e } = this, { allSegs: n, invisibleSegs: r } = this.compileSegs(e.singlePlacements);
    return f(bs, { elClasses: ["fc-daygrid-more-link"], dateProfile: e.dateProfile, todayRange: e.todayRange, allDayDate: e.allDayDate, moreCnt: e.moreCnt, allSegs: n, hiddenSegs: r, alignmentElRef: e.alignmentElRef, alignGridTop: e.alignGridTop, extraDateSpan: e.extraDateSpan, popoverContent: () => {
      let i = (e.eventDrag ? e.eventDrag.affectedInstances : null) || (e.eventResize ? e.eventResize.affectedInstances : null) || {};
      return f(x, null, n.map((s) => {
        let l = s.eventRange.instance.instanceId;
        return f("div", { className: "fc-daygrid-event-harness", key: l, style: {
          visibility: i[l] ? "hidden" : ""
        } }, ks(s) ? f(Is, Object.assign({ seg: s, isDragging: !1, isSelected: l === e.eventSelection, defaultDisplayEventEnd: !1 }, te(s, e.todayRange))) : f(Ms, Object.assign({ seg: s, isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: l === e.eventSelection, defaultDisplayEventEnd: !1 }, te(s, e.todayRange))));
      }));
    } });
  }
}
function lu(t) {
  let e = [], n = [];
  for (let r of t)
    e.push(r.seg), r.isVisible || n.push(r.seg);
  return { allSegs: e, invisibleSegs: n };
}
const ou = M({ week: "narrow" });
class au extends V {
  constructor() {
    super(...arguments), this.rootElRef = H(), this.state = {
      dayNumberId: wt()
    }, this.handleRootEl = (e) => {
      j(this.rootElRef, e), j(this.props.elRef, e);
    };
  }
  render() {
    let { context: e, props: n, state: r, rootElRef: i } = this, { options: s, dateEnv: l } = e, { date: o, dateProfile: a } = n;
    const d = n.showDayNumber && du(o, a.currentRange, l);
    return f(Nn, { elTag: "td", elRef: this.handleRootEl, elClasses: [
      "fc-daygrid-day",
      ...n.extraClassNames || []
    ], elAttrs: Object.assign(Object.assign(Object.assign({}, n.extraDataAttrs), n.showDayNumber ? { "aria-labelledby": r.dayNumberId } : {}), { role: "gridcell" }), defaultGenerator: cu, date: o, dateProfile: a, todayRange: n.todayRange, showDayNumber: n.showDayNumber, isMonthStart: d, extraRenderProps: n.extraRenderProps }, (c, h) => f(
      "div",
      { ref: n.innerElRef, className: "fc-daygrid-day-frame fc-scrollgrid-sync-inner", style: { minHeight: n.minHeight } },
      n.showWeekNumber && f(vs, { elTag: "a", elClasses: ["fc-daygrid-week-number"], elAttrs: At(e, o, "week"), date: o, defaultFormat: ou }),
      !h.isDisabled && (n.showDayNumber || On(s) || n.forceDayTop) ? f(
        "div",
        { className: "fc-daygrid-day-top" },
        f(c, { elTag: "a", elClasses: [
          "fc-daygrid-day-number",
          d && "fc-daygrid-month-start"
        ], elAttrs: Object.assign(Object.assign({}, At(e, o)), { id: r.dayNumberId }) })
      ) : n.showDayNumber ? (
        // for creating correct amount of space (see issue #7162)
        f(
          "div",
          { className: "fc-daygrid-day-top", style: { visibility: "hidden" } },
          f("a", { className: "fc-daygrid-day-number" }, " ")
        )
      ) : void 0,
      f(
        "div",
        { className: "fc-daygrid-day-events", ref: n.fgContentElRef },
        n.fgContent,
        f(
          "div",
          { className: "fc-daygrid-day-bottom", style: { marginTop: n.moreMarginTop } },
          f(su, { allDayDate: o, singlePlacements: n.singlePlacements, moreCnt: n.moreCnt, alignmentElRef: i, alignGridTop: !n.showDayNumber, extraDateSpan: n.extraDateSpan, dateProfile: n.dateProfile, eventSelection: n.eventSelection, eventDrag: n.eventDrag, eventResize: n.eventResize, todayRange: n.todayRange })
        )
      ),
      f("div", { className: "fc-daygrid-day-bg" }, n.bgContent)
    ));
  }
}
function cu(t) {
  return t.dayNumberText || f(x, null, " ");
}
function du(t, e, n) {
  const { start: r, end: i } = e, s = re(i, -1), l = n.getYear(r), o = n.getMonth(r), a = n.getYear(s), d = n.getMonth(s);
  return !(l === a && o === d) && // first date in current view?
  (t.valueOf() === r.valueOf() || // a month-start that's within the current range?
  n.getDay(t) === 1 && t.valueOf() < i.valueOf());
}
function Ns(t) {
  return t.eventRange.instance.instanceId + ":" + t.firstCol;
}
function Os(t) {
  return Ns(t) + ":" + t.lastCol;
}
function uu(t, e, n, r, i, s, l) {
  let o = new pu((y) => {
    let A = t[y.index].eventRange.instance.instanceId + ":" + y.span.start + ":" + (y.span.end - 1);
    return i[A] || 1;
  });
  o.allowReslicing = !0, o.strictOrder = r, e === !0 || n === !0 ? (o.maxCoord = s, o.hiddenConsumes = !0) : typeof e == "number" ? o.maxStackCnt = e : typeof n == "number" && (o.maxStackCnt = n, o.hiddenConsumes = !0);
  let a = [], d = [];
  for (let y = 0; y < t.length; y += 1) {
    let A = t[y], C = Os(A);
    i[C] != null ? a.push({
      index: y,
      span: {
        start: A.firstCol,
        end: A.lastCol + 1
      }
    }) : d.push(A);
  }
  let c = o.addSegs(a), h = o.toRects(), { singleColPlacements: p, multiColPlacements: u, leftoverMargins: m } = fu(h, t, l), v = [], b = [];
  for (let y of d) {
    u[y.firstCol].push({
      seg: y,
      isVisible: !1,
      isAbsolute: !0,
      absoluteTop: 0,
      marginTop: 0
    });
    for (let A = y.firstCol; A <= y.lastCol; A += 1)
      p[A].push({
        seg: Ce(y, A, A + 1, l),
        isVisible: !1,
        isAbsolute: !1,
        absoluteTop: 0,
        marginTop: 0
      });
  }
  for (let y = 0; y < l.length; y += 1)
    v.push(0);
  for (let y of c) {
    let A = t[y.index], C = y.span;
    u[C.start].push({
      seg: Ce(A, C.start, C.end, l),
      isVisible: !1,
      isAbsolute: !0,
      absoluteTop: 0,
      marginTop: 0
    });
    for (let S = C.start; S < C.end; S += 1)
      v[S] += 1, p[S].push({
        seg: Ce(A, S, S + 1, l),
        isVisible: !1,
        isAbsolute: !1,
        absoluteTop: 0,
        marginTop: 0
      });
  }
  for (let y = 0; y < l.length; y += 1)
    b.push(m[y]);
  return { singleColPlacements: p, multiColPlacements: u, moreCnts: v, moreMarginTops: b };
}
function fu(t, e, n) {
  let r = hu(t, n.length), i = [], s = [], l = [];
  for (let o = 0; o < n.length; o += 1) {
    let a = r[o], d = [], c = 0, h = 0;
    for (let u of a) {
      let m = e[u.index];
      d.push({
        seg: Ce(m, o, o + 1, n),
        isVisible: !0,
        isAbsolute: !1,
        absoluteTop: u.levelCoord,
        marginTop: u.levelCoord - c
      }), c = u.levelCoord + u.thickness;
    }
    let p = [];
    c = 0, h = 0;
    for (let u of a) {
      let m = e[u.index], v = u.span.end - u.span.start > 1, b = u.span.start === o;
      h += u.levelCoord - c, c = u.levelCoord + u.thickness, v ? (h += u.thickness, b && p.push({
        seg: Ce(m, u.span.start, u.span.end, n),
        isVisible: !0,
        isAbsolute: !0,
        absoluteTop: u.levelCoord,
        marginTop: 0
      })) : b && (p.push({
        seg: Ce(m, u.span.start, u.span.end, n),
        isVisible: !0,
        isAbsolute: !1,
        absoluteTop: u.levelCoord,
        marginTop: h
        // claim the margin
      }), h = 0);
    }
    i.push(d), s.push(p), l.push(h);
  }
  return { singleColPlacements: i, multiColPlacements: s, leftoverMargins: l };
}
function hu(t, e) {
  let n = [];
  for (let r = 0; r < e; r += 1)
    n.push([]);
  for (let r of t)
    for (let i = r.span.start; i < r.span.end; i += 1)
      n[i].push(r);
  return n;
}
function Ce(t, e, n, r) {
  if (t.firstCol === e && t.lastCol === n - 1)
    return t;
  let i = t.eventRange, s = i.range, l = ge(s, {
    start: r[e].date,
    end: N(r[n - 1].date, 1)
  });
  return Object.assign(Object.assign({}, t), { firstCol: e, lastCol: n - 1, eventRange: {
    def: i.def,
    ui: Object.assign(Object.assign({}, i.ui), { durationEditable: !1 }),
    instance: i.instance,
    range: l
  }, isStart: t.isStart && l.start.valueOf() === s.start.valueOf(), isEnd: t.isEnd && l.end.valueOf() === s.end.valueOf() });
}
class pu extends ls {
  constructor() {
    super(...arguments), this.hiddenConsumes = !1, this.forceHidden = {};
  }
  addSegs(e) {
    const n = super.addSegs(e), { entriesByLevel: r } = this, i = (s) => !this.forceHidden[fe(s)];
    for (let s = 0; s < r.length; s += 1)
      r[s] = r[s].filter(i);
    return n;
  }
  handleInvalidInsertion(e, n, r) {
    const { entriesByLevel: i, forceHidden: s } = this, { touchingEntry: l, touchingLevel: o, touchingLateral: a } = e;
    if (this.hiddenConsumes && l) {
      const d = fe(l);
      if (!s[d])
        if (this.allowReslicing) {
          const c = Object.assign(Object.assign({}, l), { span: xn(l.span, n.span) }), h = fe(c);
          s[h] = !0, i[o][a] = c, r.push(c), this.splitEntry(l, n, r);
        } else
          s[d] = !0, r.push(l);
    }
    super.handleInvalidInsertion(e, n, r);
  }
}
class Ps extends V {
  constructor() {
    super(...arguments), this.cellElRefs = new Q(), this.frameElRefs = new Q(), this.fgElRefs = new Q(), this.segHarnessRefs = new Q(), this.rootElRef = H(), this.state = {
      framePositions: null,
      maxContentHeight: null,
      segHeights: {}
    }, this.handleResize = (e) => {
      e && this.updateSizing(!0);
    };
  }
  render() {
    let { props: e, state: n, context: r } = this, { options: i } = r, s = e.cells.length, l = Ke(e.businessHourSegs, s), o = Ke(e.bgEventSegs, s), a = Ke(this.getHighlightSegs(), s), d = Ke(this.getMirrorSegs(), s), { singleColPlacements: c, multiColPlacements: h, moreCnts: p, moreMarginTops: u } = uu(Ji(e.fgEventSegs, i.eventOrder), e.dayMaxEvents, e.dayMaxEventRows, i.eventOrderStrict, n.segHeights, n.maxContentHeight, e.cells), m = (
      // TODO: messy way to compute this
      e.eventDrag && e.eventDrag.affectedInstances || e.eventResize && e.eventResize.affectedInstances || {}
    );
    return f(
      "tr",
      { ref: this.rootElRef, role: "row" },
      e.renderIntro && e.renderIntro(),
      e.cells.map((v, b) => {
        let y = this.renderFgSegs(b, e.forPrint ? c[b] : h[b], e.todayRange, m), A = this.renderFgSegs(b, gu(d[b], h), e.todayRange, {}, !!e.eventDrag, !!e.eventResize, !1);
        return f(au, { key: v.key, elRef: this.cellElRefs.createRef(v.key), innerElRef: this.frameElRefs.createRef(v.key), dateProfile: e.dateProfile, date: v.date, showDayNumber: e.showDayNumbers, showWeekNumber: e.showWeekNumbers && b === 0, forceDayTop: e.showWeekNumbers, todayRange: e.todayRange, eventSelection: e.eventSelection, eventDrag: e.eventDrag, eventResize: e.eventResize, extraRenderProps: v.extraRenderProps, extraDataAttrs: v.extraDataAttrs, extraClassNames: v.extraClassNames, extraDateSpan: v.extraDateSpan, moreCnt: p[b], moreMarginTop: u[b], singlePlacements: c[b], fgContentElRef: this.fgElRefs.createRef(v.key), fgContent: (
          // Fragment scopes the keys
          f(
            x,
            null,
            f(x, null, y),
            f(x, null, A)
          )
        ), bgContent: (
          // Fragment scopes the keys
          f(
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
    this.updateSizing(!L(e, r));
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
    let { context: a } = this, { eventSelection: d } = this.props, { framePositions: c } = this.state, h = this.props.cells.length === 1, p = s || l || o, u = [];
    if (c)
      for (let m of n) {
        let { seg: v } = m, { instanceId: b } = v.eventRange.instance, y = m.isVisible && !i[b], A = m.isAbsolute, C = "", S = "";
        A && (a.isRtl ? (S = 0, C = c.lefts[v.lastCol] - c.lefts[v.firstCol]) : (C = 0, S = c.rights[v.firstCol] - c.rights[v.lastCol])), u.push(f("div", { className: "fc-daygrid-event-harness" + (A ? " fc-daygrid-event-harness-abs" : ""), key: Ns(v), ref: p ? null : this.segHarnessRefs.createRef(Os(v)), style: {
          visibility: y ? "" : "hidden",
          marginTop: A ? "" : m.marginTop,
          top: A ? m.absoluteTop : "",
          left: C,
          right: S
        } }, ks(v) ? f(Is, Object.assign({ seg: v, isDragging: s, isSelected: b === d, defaultDisplayEventEnd: h }, te(v, r))) : f(Ms, Object.assign({ seg: v, isDragging: s, isResizing: l, isDateSelecting: o, isSelected: b === d, defaultDisplayEventEnd: h }, te(v, r)))));
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
        l.push(f("div", { key: Xi(o.eventRange), className: "fc-daygrid-bg-harness", style: a }, n === "bg-event" ? f(gs, Object.assign({ seg: o }, te(o, i))) : ms(n)));
      }
    return f(x, {}, ...l);
  }
  updateSizing(e) {
    let { props: n, state: r, frameElRefs: i } = this;
    if (!n.forPrint && n.clientWidth !== null) {
      if (e) {
        let a = n.cells.map((d) => i.currentMap[d.key]);
        if (a.length) {
          let d = this.rootElRef.current, c = new Te(
            d,
            a,
            !0,
            // isHorizontal
            !1
          );
          (!r.framePositions || !r.framePositions.similarTo(c)) && this.setState({
            framePositions: new Te(
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
Ps.addStateEquality({
  segHeights: L
});
function gu(t, e) {
  if (!t.length)
    return [];
  let n = mu(e);
  return t.map((r) => ({
    seg: r,
    isVisible: !0,
    isAbsolute: !0,
    absoluteTop: n[r.eventRange.instance.instanceId],
    marginTop: 0
  }));
}
function mu(t) {
  let e = {};
  for (let n of t)
    for (let r of n)
      e[r.seg.eventRange.instance.instanceId] = r.absoluteTop;
  return e;
}
class vu extends V {
  constructor() {
    super(...arguments), this.splitBusinessHourSegs = _(st), this.splitBgEventSegs = _(bu), this.splitFgEventSegs = _(st), this.splitDateSelectionSegs = _(st), this.splitEventDrag = _(Vr), this.splitEventResize = _(Vr), this.rowRefs = new Q();
  }
  render() {
    let { props: e, context: n } = this, r = e.cells.length, i = this.splitBusinessHourSegs(e.businessHourSegs, r), s = this.splitBgEventSegs(e.bgEventSegs, r), l = this.splitFgEventSegs(e.fgEventSegs, r), o = this.splitDateSelectionSegs(e.dateSelectionSegs, r), a = this.splitEventDrag(e.eventDrag, r), d = this.splitEventResize(e.eventResize, r), c = r >= 7 && e.clientWidth ? e.clientWidth / n.options.aspectRatio / 6 : null;
    return f(ke, { unit: "day" }, (h, p) => f(x, null, e.cells.map((u, m) => f(Ps, {
      ref: this.rowRefs.createRef(m),
      key: u.length ? u[0].date.toISOString() : m,
      showDayNumbers: r > 1,
      showWeekNumbers: e.showWeekNumbers,
      todayRange: p,
      dateProfile: e.dateProfile,
      cells: u,
      renderIntro: e.renderRowIntro,
      businessHourSegs: i[m],
      eventSelection: e.eventSelection,
      bgEventSegs: s[m],
      fgEventSegs: l[m],
      dateSelectionSegs: o[m],
      eventDrag: a[m],
      eventResize: d[m],
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
    this.rowPositions = new Te(
      this.rootEl,
      this.rowRefs.collect().map((e) => e.getCellEls()[0]),
      // first cell el in each row. TODO: not optimal
      !1,
      !0
    ), this.colPositions = new Te(
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
    let r = this.props.cells[e][n].date, i = N(r, 1);
    return { start: r, end: i };
  }
}
function bu(t, e) {
  return st(t.filter(yu), e);
}
function yu(t) {
  return t.eventRange.def.allDay;
}
class Au extends V {
  constructor() {
    super(...arguments), this.elRef = H(), this.needsScrollReset = !1;
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
    return f(
      "div",
      { ref: this.elRef, className: l.join(" "), style: {
        // these props are important to give this wrapper correct dimensions for interactions
        // TODO: if we set it here, can we avoid giving to inner tables?
        width: e.clientWidth,
        minWidth: e.tableMinWidth
      } },
      f(
        "table",
        { role: "presentation", className: "fc-scrollgrid-sync-table", style: {
          width: e.clientWidth,
          minWidth: e.tableMinWidth,
          height: i ? e.clientHeight : ""
        } },
        e.colGroupNode,
        f(
          "tbody",
          { role: "presentation" },
          f(vu, { dateProfile: e.dateProfile, cells: e.cells, renderRowIntro: e.renderRowIntro, showWeekNumbers: e.showWeekNumbers, clientWidth: e.clientWidth, clientHeight: e.clientHeight, businessHourSegs: e.businessHourSegs, bgEventSegs: e.bgEventSegs, fgEventSegs: e.fgEventSegs, dateSelectionSegs: e.dateSelectionSegs, eventSelection: e.eventSelection, eventDrag: e.eventDrag, eventResize: e.eventResize, dayMaxEvents: r, dayMaxEventRows: n, forPrint: e.forPrint, isHitComboAllowed: e.isHitComboAllowed })
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
      const e = Eu(this.elRef.current, this.props.dateProfile);
      if (e) {
        const n = e.closest(".fc-daygrid-body"), r = n.closest(".fc-scroller"), i = e.getBoundingClientRect().top - n.getBoundingClientRect().top;
        r.scrollTop = i ? i + 1 : 0;
      }
      this.needsScrollReset = !1;
    }
  }
}
function Eu(t, e) {
  let n;
  return e.currentRangeUnit.match(/year|month/) && (n = t.querySelector(`[data-date="${Eo(e.currentDate)}-01"]`)), n || (n = t.querySelector(`[data-date="${mn(e.currentDate)}"]`)), n;
}
class _u extends fs {
  constructor() {
    super(...arguments), this.forceDayIfListItem = !0;
  }
  sliceRange(e, n) {
    return n.sliceRange(e);
  }
}
class Hs extends V {
  constructor() {
    super(...arguments), this.slicer = new _u(), this.tableRef = H();
  }
  render() {
    let { props: e, context: n } = this;
    return f(Au, Object.assign({ ref: this.tableRef }, this.slicer.sliceProps(e, e.dateProfile, e.nextDayThreshold, n, e.dayTableModel), { dateProfile: e.dateProfile, cells: e.dayTableModel.cells, colGroupNode: e.colGroupNode, tableMinWidth: e.tableMinWidth, renderRowIntro: e.renderRowIntro, dayMaxEvents: e.dayMaxEvents, dayMaxEventRows: e.dayMaxEventRows, showWeekNumbers: e.showWeekNumbers, expandRows: e.expandRows, headerAlignElRef: e.headerAlignElRef, clientWidth: e.clientWidth, clientHeight: e.clientHeight, forPrint: e.forPrint }));
  }
}
class Su extends ru {
  constructor() {
    super(...arguments), this.buildDayTableModel = _(Cu), this.headerRef = H(), this.tableRef = H();
  }
  render() {
    let { options: e, dateProfileGenerator: n } = this.context, { props: r } = this, i = this.buildDayTableModel(r.dateProfile, n), s = e.dayHeaders && f(cs, { ref: this.headerRef, dateProfile: r.dateProfile, dates: i.headerDates, datesRepDistinctDays: i.rowCnt === 1 }), l = (o) => f(Hs, { ref: this.tableRef, dateProfile: r.dateProfile, dayTableModel: i, businessHours: r.businessHours, dateSelection: r.dateSelection, eventStore: r.eventStore, eventUiBases: r.eventUiBases, eventSelection: r.eventSelection, eventDrag: r.eventDrag, eventResize: r.eventResize, nextDayThreshold: e.nextDayThreshold, colGroupNode: o.tableColGroupNode, tableMinWidth: o.tableMinWidth, dayMaxEvents: e.dayMaxEvents, dayMaxEventRows: e.dayMaxEventRows, showWeekNumbers: e.weekNumbers, expandRows: !r.isHeightAuto, headerAlignElRef: this.headerElRef, clientWidth: o.clientWidth, clientHeight: o.clientHeight, forPrint: r.forPrint });
    return e.dayMinWidth ? this.renderHScrollLayout(s, l, i.colCnt, e.dayMinWidth) : this.renderSimpleLayout(s, l);
  }
}
function Cu(t, e) {
  let n = new ds(t.renderRange, e);
  return new us(n, /year|month|week/.test(t.currentRangeUnit));
}
class wu extends Ui {
  // Computes the date range that will be rendered
  buildRenderRange(e, n, r) {
    let i = super.buildRenderRange(e, n, r), { props: s } = this;
    return Du({
      currentRange: i,
      snapToWeek: /^(year|month)$/.test(n),
      fixedWeekCount: s.fixedWeekCount,
      dateEnv: s.dateEnv
    });
  }
}
function Du(t) {
  let { dateEnv: e, currentRange: n } = t, { start: r, end: i } = n, s;
  if (t.snapToWeek && (r = e.startOfWeek(r), s = e.startOfWeek(i), s.valueOf() !== i.valueOf() && (i = yr(s, 1))), t.fixedWeekCount) {
    let l = e.startOfWeek(e.startOfMonth(N(n.end, -1))), o = Math.ceil(
      // could be partial weeks due to hiddenDays
      co(l, i)
    );
    i = yr(i, 6 - o);
  }
  return { start: r, end: i };
}
var Ru = ':root{--fc-daygrid-event-dot-width:8px}.fc-daygrid-day-events:after,.fc-daygrid-day-events:before,.fc-daygrid-day-frame:after,.fc-daygrid-day-frame:before,.fc-daygrid-event-harness:after,.fc-daygrid-event-harness:before{clear:both;content:"";display:table}.fc .fc-daygrid-body{position:relative;z-index:1}.fc .fc-daygrid-day.fc-day-today{background-color:var(--fc-today-bg-color)}.fc .fc-daygrid-day-frame{min-height:100%;position:relative}.fc .fc-daygrid-day-top{display:flex;flex-direction:row-reverse}.fc .fc-day-other .fc-daygrid-day-top{opacity:.3}.fc .fc-daygrid-day-number{padding:4px;position:relative;z-index:4}.fc .fc-daygrid-month-start{font-size:1.1em;font-weight:700}.fc .fc-daygrid-day-events{margin-top:1px}.fc .fc-daygrid-body-balanced .fc-daygrid-day-events{left:0;position:absolute;right:0}.fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events{min-height:2em;position:relative}.fc .fc-daygrid-body-natural .fc-daygrid-day-events{margin-bottom:1em}.fc .fc-daygrid-event-harness{position:relative}.fc .fc-daygrid-event-harness-abs{left:0;position:absolute;right:0;top:0}.fc .fc-daygrid-bg-harness{bottom:0;position:absolute;top:0}.fc .fc-daygrid-day-bg .fc-non-business{z-index:1}.fc .fc-daygrid-day-bg .fc-bg-event{z-index:2}.fc .fc-daygrid-day-bg .fc-highlight{z-index:3}.fc .fc-daygrid-event{margin-top:1px;z-index:6}.fc .fc-daygrid-event.fc-event-mirror{z-index:7}.fc .fc-daygrid-day-bottom{font-size:.85em;margin:0 2px}.fc .fc-daygrid-day-bottom:after,.fc .fc-daygrid-day-bottom:before{clear:both;content:"";display:table}.fc .fc-daygrid-more-link{border-radius:3px;cursor:pointer;line-height:1;margin-top:1px;max-width:100%;overflow:hidden;padding:2px;position:relative;white-space:nowrap;z-index:4}.fc .fc-daygrid-more-link:hover{background-color:rgba(0,0,0,.1)}.fc .fc-daygrid-week-number{background-color:var(--fc-neutral-bg-color);color:var(--fc-neutral-text-color);min-width:1.5em;padding:2px;position:absolute;text-align:center;top:0;z-index:5}.fc .fc-more-popover .fc-popover-body{min-width:220px;padding:10px}.fc-direction-ltr .fc-daygrid-event.fc-event-start,.fc-direction-rtl .fc-daygrid-event.fc-event-end{margin-left:2px}.fc-direction-ltr .fc-daygrid-event.fc-event-end,.fc-direction-rtl .fc-daygrid-event.fc-event-start{margin-right:2px}.fc-direction-ltr .fc-daygrid-more-link{float:left}.fc-direction-ltr .fc-daygrid-week-number{border-radius:0 0 3px 0;left:0}.fc-direction-rtl .fc-daygrid-more-link{float:right}.fc-direction-rtl .fc-daygrid-week-number{border-radius:0 0 0 3px;right:0}.fc-liquid-hack .fc-daygrid-day-frame{position:static}.fc-daygrid-event{border-radius:3px;font-size:var(--fc-small-font-size);position:relative;white-space:nowrap}.fc-daygrid-block-event .fc-event-time{font-weight:700}.fc-daygrid-block-event .fc-event-time,.fc-daygrid-block-event .fc-event-title{padding:1px}.fc-daygrid-dot-event{align-items:center;display:flex;padding:2px 0}.fc-daygrid-dot-event .fc-event-title{flex-grow:1;flex-shrink:1;font-weight:700;min-width:0;overflow:hidden}.fc-daygrid-dot-event.fc-event-mirror,.fc-daygrid-dot-event:hover{background:rgba(0,0,0,.1)}.fc-daygrid-dot-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-daygrid-event-dot{border:calc(var(--fc-daygrid-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-daygrid-event-dot-width)/2);box-sizing:content-box;height:0;margin:0 4px;width:0}.fc-direction-ltr .fc-daygrid-event .fc-event-time{margin-right:3px}.fc-direction-rtl .fc-daygrid-event .fc-event-time{margin-left:3px}';
hn(Ru);
class xu extends rc {
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
    return e.allDay ? $a(e) ? ["timed", "allDay"] : ["allDay"] : ["timed"];
  }
}
const Tu = M({
  hour: "numeric",
  minute: "2-digit",
  omitZeroMinute: !0,
  meridiem: "short"
});
function Bs(t) {
  let e = [
    "fc-timegrid-slot",
    "fc-timegrid-slot-label",
    t.isLabeled ? "fc-scrollgrid-shrink" : "fc-timegrid-slot-minor"
  ];
  return f(Y.Consumer, null, (n) => {
    if (!t.isLabeled)
      return f("td", { className: e.join(" "), "data-time": t.isoTimeStr });
    let { dateEnv: r, options: i, viewApi: s } = n, l = (
      // TODO: fully pre-parse
      i.slotLabelFormat == null ? Tu : Array.isArray(i.slotLabelFormat) ? M(i.slotLabelFormat[0]) : M(i.slotLabelFormat)
    ), o = {
      level: 0,
      time: t.time,
      date: r.toDate(t.date),
      view: s,
      text: r.format(t.date, l)
    };
    return f(U, { elTag: "td", elClasses: e, elAttrs: {
      "data-time": t.isoTimeStr
    }, renderProps: o, generatorName: "slotLabelContent", customGenerator: i.slotLabelContent, defaultGenerator: ku, classNameGenerator: i.slotLabelClassNames, didMount: i.slotLabelDidMount, willUnmount: i.slotLabelWillUnmount }, (a) => f(
      "div",
      { className: "fc-timegrid-slot-label-frame fc-scrollgrid-shrink-frame" },
      f(a, { elTag: "div", elClasses: [
        "fc-timegrid-slot-label-cushion",
        "fc-scrollgrid-shrink-cushion"
      ] })
    ));
  });
}
function ku(t) {
  return t.text;
}
class Mu extends R {
  render() {
    return this.props.slatMetas.map((e) => f(
      "tr",
      { key: e.key },
      f(Bs, Object.assign({}, e))
    ));
  }
}
const Iu = M({ week: "short" }), Nu = 5;
class Ou extends V {
  constructor() {
    super(...arguments), this.allDaySplitter = new xu(), this.headerElRef = H(), this.rootElRef = H(), this.scrollerElRef = H(), this.state = {
      slatCoords: null
    }, this.handleScrollTopRequest = (e) => {
      let n = this.scrollerElRef.current;
      n && (n.scrollTop = e);
    }, this.renderHeadAxis = (e, n = "") => {
      let { options: r } = this.context, { dateProfile: i } = this.props, s = i.renderRange, o = ve(s.start, s.end) === 1 ? At(this.context, s.start, "week") : {};
      return r.weekNumbers && e === "day" ? f(vs, { elTag: "th", elClasses: [
        "fc-timegrid-axis",
        "fc-scrollgrid-shrink"
      ], elAttrs: {
        "aria-hidden": !0
      }, date: s.start, defaultFormat: Iu }, (a) => f(
        "div",
        { className: [
          "fc-timegrid-axis-frame",
          "fc-scrollgrid-shrink-frame",
          "fc-timegrid-axis-frame-liquid"
        ].join(" "), style: { height: n } },
        f(a, { elTag: "a", elClasses: [
          "fc-timegrid-axis-cushion",
          "fc-scrollgrid-shrink-cushion",
          "fc-scrollgrid-sync-inner"
        ], elAttrs: o })
      )) : f(
        "th",
        { "aria-hidden": !0, className: "fc-timegrid-axis" },
        f("div", { className: "fc-timegrid-axis-frame", style: { height: n } })
      );
    }, this.renderTableRowAxis = (e) => {
      let { options: n, viewApi: r } = this.context, i = {
        text: n.allDayText,
        view: r
      };
      return (
        // TODO: make reusable hook. used in list view too
        f(U, { elTag: "td", elClasses: [
          "fc-timegrid-axis",
          "fc-scrollgrid-shrink"
        ], elAttrs: {
          "aria-hidden": !0
        }, renderProps: i, generatorName: "allDayContent", customGenerator: n.allDayContent, defaultGenerator: Pu, classNameGenerator: n.allDayClassNames, didMount: n.allDayDidMount, willUnmount: n.allDayWillUnmount }, (s) => f(
          "div",
          { className: [
            "fc-timegrid-axis-frame",
            "fc-scrollgrid-shrink-frame",
            e == null ? " fc-timegrid-axis-frame-liquid" : ""
          ].join(" "), style: { height: e } },
          f(s, { elTag: "span", elClasses: [
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
    let { context: i, props: s } = this, l = [], o = Et(i.options);
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
        f(
          "tr",
          { role: "presentation", className: "fc-scrollgrid-section" },
          f("td", { className: "fc-timegrid-divider " + i.theme.getClass("tableCellShaded") })
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
    }), f(
      vt,
      { elRef: this.rootElRef, elClasses: ["fc-timegrid"], viewSpec: i.viewSpec },
      f(Tn, { liquid: !s.isHeightAuto && !s.forPrint, collapsibleWidth: s.forPrint, cols: [{ width: "shrink" }], sections: l })
    );
  }
  renderHScrollLayout(e, n, r, i, s, l, o) {
    let a = this.context.pluginHooks.scrollGridImpl;
    if (!a)
      throw new Error("No ScrollGrid implementation");
    let { context: d, props: c } = this, h = !c.forPrint && Et(d.options), p = !c.forPrint && ps(d.options), u = [];
    e && u.push({
      type: "header",
      key: "header",
      isSticky: h,
      syncRowHeights: !0,
      chunks: [
        {
          key: "axis",
          rowContent: (v) => f("tr", { role: "presentation" }, this.renderHeadAxis("day", v.rowSyncHeights[0]))
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
          rowContent: (v) => f("tr", { role: "presentation" }, this.renderTableRowAxis(v.rowSyncHeights[0]))
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
        f(
          "tr",
          { role: "presentation", className: "fc-scrollgrid-section" },
          f("td", { colSpan: 2, className: "fc-timegrid-divider " + d.theme.getClass("tableCellShaded") })
        )
      )
    }));
    let m = d.options.nowIndicator;
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
            f(
              "div",
              { className: "fc-timegrid-axis-chunk" },
              f(
                "table",
                { "aria-hidden": !0, style: { height: v.expandRows ? v.clientHeight : "" } },
                v.tableColGroupNode,
                f(
                  "tbody",
                  null,
                  f(Mu, { slatMetas: l })
                )
              ),
              f(
                "div",
                { className: "fc-timegrid-now-indicator-container" },
                f(ke, {
                  unit: m ? "minute" : "day"
                  /* hacky */
                }, (b) => {
                  let y = m && o && o.safeComputeTop(b);
                  return typeof y == "number" ? f(In, { elClasses: ["fc-timegrid-now-indicator-arrow"], elStyle: { top: y }, isAxis: !0, date: b }) : null;
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
    }), p && u.push({
      key: "footer",
      type: "footer",
      isSticky: !0,
      chunks: [
        {
          key: "axis",
          content: tn
        },
        {
          key: "cols",
          content: tn
        }
      ]
    }), f(
      vt,
      { elRef: this.rootElRef, elClasses: ["fc-timegrid"], viewSpec: d.viewSpec },
      f(a, { liquid: !c.isHeightAuto && !c.forPrint, forPrint: c.forPrint, collapsibleWidth: !1, colGroups: [
        { width: "shrink", cols: [{ width: "shrink" }] },
        { cols: [{ span: i, minWidth: s }] }
      ], sections: u })
    );
  }
  /* Dimensions
  ------------------------------------------------------------------------------------------------------------------*/
  getAllDayMaxEventProps() {
    let { dayMaxEvents: e, dayMaxEventRows: n } = this.context.options;
    return (e === !0 || n === !0) && (e = void 0, n = Nu), { dayMaxEvents: e, dayMaxEventRows: n };
  }
}
function Pu(t) {
  return t.text;
}
class Hu {
  constructor(e, n, r) {
    this.positions = e, this.dateProfile = n, this.slotDuration = r;
  }
  safeComputeTop(e) {
    let { dateProfile: n } = this;
    if (q(n.currentRange, e)) {
      let r = k(e), i = e.valueOf() - r.valueOf();
      if (i >= F(n.slotMinTime) && i < F(n.slotMaxTime))
        return this.computeTimeTop(w(i));
    }
    return null;
  }
  // Computes the top coordinate, relative to the bounds of the grid, of the given date.
  // A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
  computeDateTop(e, n) {
    return n || (n = k(e)), this.computeTimeTop(w(e.valueOf() - n.valueOf()));
  }
  // Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
  // This is a makeshify way to compute the time-top. Assumes all slatMetas dates are uniform.
  // Eventually allow computation with arbirary slat dates.
  computeTimeTop(e) {
    let { positions: n, dateProfile: r } = this, i = n.els.length, s = (e.milliseconds - F(r.slotMinTime)) / F(this.slotDuration), l, o;
    return s = Math.max(0, s), s = Math.min(i, s), l = Math.floor(s), l = Math.min(l, i - 1), o = s - l, n.tops[l] + n.getHeight(l) * o;
  }
}
class Bu extends R {
  render() {
    let { props: e, context: n } = this, { options: r } = n, { slatElRefs: i } = e;
    return f("tbody", null, e.slatMetas.map((s, l) => {
      let o = {
        time: s.time,
        date: n.dateEnv.toDate(s.date),
        view: n.viewApi
      };
      return f(
        "tr",
        { key: s.key, ref: i.createRef(s.key) },
        e.axis && f(Bs, Object.assign({}, s)),
        f(U, { elTag: "td", elClasses: [
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
class $u extends R {
  constructor() {
    super(...arguments), this.rootElRef = H(), this.slatElRefs = new Q();
  }
  render() {
    let { props: e, context: n } = this;
    return f(
      "div",
      { ref: this.rootElRef, className: "fc-timegrid-slots" },
      f(
        "table",
        { "aria-hidden": !0, className: n.theme.getClass("table"), style: {
          minWidth: e.tableMinWidth,
          width: e.clientWidth,
          height: e.minHeight
        } },
        e.tableColGroupNode,
        f(Bu, { slatElRefs: this.slatElRefs, axis: e.axis, slatMetas: e.slatMetas })
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
    n.onCoords && n.clientWidth !== null && this.rootElRef.current.offsetHeight && n.onCoords(new Hu(new Te(this.rootElRef.current, Uu(this.slatElRefs.currentMap, n.slatMetas), !1, !0), this.props.dateProfile, e.options.slotDuration));
  }
}
function Uu(t, e) {
  return e.map((n) => t[n.key]);
}
function Ne(t, e) {
  let n = [], r;
  for (r = 0; r < e; r += 1)
    n.push([]);
  if (t)
    for (r = 0; r < t.length; r += 1)
      n[t[r].col].push(t[r]);
  return n;
}
function Gr(t, e) {
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
class zu extends R {
  render() {
    let { props: e } = this;
    return f(bs, { elClasses: ["fc-timegrid-more-link"], elStyle: {
      top: e.top,
      bottom: e.bottom
    }, allDayDate: null, moreCnt: e.hiddenSegs.length, allSegs: e.hiddenSegs, hiddenSegs: e.hiddenSegs, extraDateSpan: e.extraDateSpan, dateProfile: e.dateProfile, todayRange: e.todayRange, popoverContent: () => Us(e.hiddenSegs, e), defaultGenerator: Fu, forceTimed: !0 }, (n) => f(n, { elTag: "div", elClasses: ["fc-timegrid-more-link-inner", "fc-sticky"] }));
  }
}
function Fu(t) {
  return t.shortText;
}
function Lu(t, e, n) {
  let r = new ls();
  e != null && (r.strictOrder = e), n != null && (r.maxStackCnt = n);
  let i = r.addSegs(t), s = fc(i), l = Wu(r);
  return l = Qu(l, 1), { segRects: qu(l), hiddenGroups: s };
}
function Wu(t) {
  const { entriesByLevel: e } = t, n = Hn((r, i) => r + ":" + i, (r, i) => {
    let s = Gu(t, r, i), l = Qr(s, n), o = e[r][i];
    return [
      Object.assign(Object.assign({}, o), { nextLevelNodes: l[0] }),
      o.thickness + l[1]
      // the pressure builds
    ];
  });
  return Qr(e.length ? { level: 0, lateralStart: 0, lateralEnd: e[0].length } : null, n)[0];
}
function Qr(t, e) {
  if (!t)
    return [[], 0];
  let { level: n, lateralStart: r, lateralEnd: i } = t, s = r, l = [];
  for (; s < i; )
    l.push(e(n, s)), s += 1;
  return l.sort(ju), [
    l.map(Vu),
    l[0][1]
    // first item's pressure
  ];
}
function ju(t, e) {
  return e[1] - t[1];
}
function Vu(t) {
  return t[0];
}
function Gu(t, e, n) {
  let { levelCoords: r, entriesByLevel: i } = t, s = i[e][n], l = r[e] + s.thickness, o = r.length, a = e;
  for (; a < o && r[a] < l; a += 1)
    ;
  for (; a < o; a += 1) {
    let d = i[a], c, h = en(d, s.span.start, Xt), p = h[0] + h[1], u = p;
    for (
      ;
      // loop through entries that horizontally intersect
      (c = d[u]) && // but not past the whole seg list
      c.span.start < s.span.end;
    )
      u += 1;
    if (p < u)
      return { level: a, lateralStart: p, lateralEnd: u };
  }
  return null;
}
function Qu(t, e) {
  const n = Hn((r, i, s) => fe(r), (r, i, s) => {
    let { nextLevelNodes: l, thickness: o } = r, a = o + s, d = o / a, c, h = [];
    if (!l.length)
      c = e;
    else
      for (let u of l)
        if (c === void 0) {
          let m = n(u, i, a);
          c = m[0], h.push(m[1]);
        } else {
          let m = n(u, c, 0);
          h.push(m[1]);
        }
    let p = (c - i) * d;
    return [c - p, Object.assign(Object.assign({}, r), { thickness: p, nextLevelNodes: h })];
  });
  return t.map((r) => n(r, 0, 0)[1]);
}
function qu(t) {
  let e = [];
  const n = Hn((i, s, l) => fe(i), (i, s, l) => {
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
function Hn(t, e) {
  const n = {};
  return (...r) => {
    let i = t(...r);
    return i in n ? n[i] : n[i] = e(...r);
  };
}
function qr(t, e, n = null, r = 0) {
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
function Zu(t, e, n, r) {
  let i = [], s = [];
  for (let d = 0; d < t.length; d += 1) {
    let c = e[d];
    c ? i.push({
      index: d,
      thickness: 1,
      span: c
    }) : s.push(t[d]);
  }
  let { segRects: l, hiddenGroups: o } = Lu(i, n, r), a = [];
  for (let d of l)
    a.push({
      seg: t[d.index],
      rect: d
    });
  for (let d of s)
    a.push({ seg: d, rect: null });
  return { segPlacements: a, hiddenGroups: o };
}
const Yu = M({
  hour: "numeric",
  minute: "2-digit",
  meridiem: !1
});
class $s extends R {
  render() {
    return f(Mn, Object.assign({}, this.props, { elClasses: [
      "fc-timegrid-event",
      "fc-v-event",
      this.props.isShort && "fc-timegrid-event-short"
    ], defaultTimeFormat: Yu }));
  }
}
class Ju extends R {
  constructor() {
    super(...arguments), this.sortEventSegs = _(Ji);
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
    return f(Nn, { elTag: "td", elRef: e.elRef, elClasses: [
      "fc-timegrid-col",
      ...e.extraClassNames || []
    ], elAttrs: Object.assign({ role: "gridcell" }, e.extraDataAttrs), date: e.date, dateProfile: e.dateProfile, todayRange: e.todayRange, extraRenderProps: e.extraRenderProps }, (a) => f(
      "div",
      { className: "fc-timegrid-col-frame" },
      f(
        "div",
        { className: "fc-timegrid-col-bg" },
        this.renderFillSegs(e.businessHourSegs, "non-business"),
        this.renderFillSegs(e.bgEventSegs, "bg-event"),
        this.renderFillSegs(e.dateSelectionSegs, "highlight")
      ),
      f("div", { className: "fc-timegrid-col-events" }, this.renderFgSegs(o, l, !1, !1, !1)),
      f("div", { className: "fc-timegrid-col-events" }, this.renderFgSegs(s, {}, !!e.eventDrag, !!e.eventResize, !!i, "mirror")),
      f("div", { className: "fc-timegrid-now-indicator-container" }, this.renderNowIndicator(e.nowIndicatorSegs)),
      On(r) && f(a, { elTag: "div", elClasses: ["fc-timegrid-col-misc"] })
    ));
  }
  renderFgSegs(e, n, r, i, s, l) {
    let { props: o } = this;
    return o.forPrint ? Us(e, o) : this.renderPositionedFgSegs(e, n, r, i, s, l);
  }
  renderPositionedFgSegs(e, n, r, i, s, l) {
    let { eventMaxStack: o, eventShortHeight: a, eventOrderStrict: d, eventMinHeight: c } = this.context.options, { date: h, slatCoords: p, eventSelection: u, todayRange: m, nowDate: v } = this.props, b = r || i || s, y = qr(e, h, p, c), { segPlacements: A, hiddenGroups: C } = Zu(e, y, d, o);
    return f(
      x,
      null,
      this.renderHiddenGroups(C, e),
      A.map((S) => {
        let { seg: P, rect: T } = S, O = P.eventRange.instance.instanceId, D = b || !!(!n[O] && T), ye = Ft(T && T.span), zs = !b && T ? this.computeSegHStyle(T) : { left: 0, right: 0 }, Fs = !!T && T.stackForward > 0, Ls = !!T && T.span.end - T.span.start < a;
        return f(
          "div",
          { className: "fc-timegrid-event-harness" + (Fs ? " fc-timegrid-event-harness-inset" : ""), key: l || O, style: Object.assign(Object.assign({ visibility: D ? "" : "hidden" }, ye), zs) },
          f($s, Object.assign({ seg: P, isDragging: r, isResizing: i, isDateSelecting: s, isSelected: O === u, isShort: Ls }, te(P, m, v)))
        );
      })
    );
  }
  // will already have eventMinHeight applied because segInputs already had it
  renderHiddenGroups(e, n) {
    let { extraDateSpan: r, dateProfile: i, todayRange: s, nowDate: l, eventSelection: o, eventDrag: a, eventResize: d } = this.props;
    return f(x, null, e.map((c) => {
      let h = Ft(c.span), p = Ku(c.entries, n);
      return f(zu, { key: ki(ys(p)), hiddenSegs: p, top: h.top, bottom: h.bottom, extraDateSpan: r, dateProfile: i, todayRange: s, nowDate: l, eventSelection: o, eventDrag: a, eventResize: d });
    }));
  }
  renderFillSegs(e, n) {
    let { props: r, context: i } = this, l = qr(e, r.date, r.slatCoords, i.options.eventMinHeight).map((o, a) => {
      let d = e[a];
      return f("div", { key: Xi(d.eventRange), className: "fc-timegrid-bg-harness", style: Ft(o) }, n === "bg-event" ? f(gs, Object.assign({ seg: d }, te(d, r.todayRange, r.nowDate))) : ms(n));
    });
    return f(x, null, l);
  }
  renderNowIndicator(e) {
    let { slatCoords: n, date: r } = this.props;
    return n ? e.map((i, s) => f(
      In,
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
function Us(t, { todayRange: e, nowDate: n, eventSelection: r, eventDrag: i, eventResize: s }) {
  let l = (i ? i.affectedInstances : null) || (s ? s.affectedInstances : null) || {};
  return f(x, null, t.map((o) => {
    let a = o.eventRange.instance.instanceId;
    return f(
      "div",
      { key: a, style: { visibility: l[a] ? "hidden" : "" } },
      f($s, Object.assign({ seg: o, isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: a === r, isShort: !1 }, te(o, e, n)))
    );
  }));
}
function Ft(t) {
  return t ? {
    top: t.start,
    bottom: -t.end
  } : { top: "", bottom: "" };
}
function Ku(t, e) {
  return t.map((n) => e[n.index]);
}
class Xu extends R {
  constructor() {
    super(...arguments), this.splitFgEventSegs = _(Ne), this.splitBgEventSegs = _(Ne), this.splitBusinessHourSegs = _(Ne), this.splitNowIndicatorSegs = _(Ne), this.splitDateSelectionSegs = _(Ne), this.splitEventDrag = _(Gr), this.splitEventResize = _(Gr), this.rootElRef = H(), this.cellElRefs = new Q();
  }
  render() {
    let { props: e, context: n } = this, r = n.options.nowIndicator && e.slatCoords && e.slatCoords.safeComputeTop(e.nowDate), i = e.cells.length, s = this.splitFgEventSegs(e.fgEventSegs, i), l = this.splitBgEventSegs(e.bgEventSegs, i), o = this.splitBusinessHourSegs(e.businessHourSegs, i), a = this.splitNowIndicatorSegs(e.nowIndicatorSegs, i), d = this.splitDateSelectionSegs(e.dateSelectionSegs, i), c = this.splitEventDrag(e.eventDrag, i), h = this.splitEventResize(e.eventResize, i);
    return f(
      "div",
      { className: "fc-timegrid-cols", ref: this.rootElRef },
      f(
        "table",
        { role: "presentation", style: {
          minWidth: e.tableMinWidth,
          width: e.clientWidth
        } },
        e.tableColGroupNode,
        f(
          "tbody",
          { role: "presentation" },
          f(
            "tr",
            { role: "row" },
            e.axis && f(
              "td",
              { "aria-hidden": !0, className: "fc-timegrid-col fc-timegrid-axis" },
              f(
                "div",
                { className: "fc-timegrid-col-frame" },
                f("div", { className: "fc-timegrid-now-indicator-container" }, typeof r == "number" && f(In, { elClasses: ["fc-timegrid-now-indicator-arrow"], elStyle: { top: r }, isAxis: !0, date: e.nowDate }))
              )
            ),
            e.cells.map((p, u) => f(Ju, { key: p.key, elRef: this.cellElRefs.createRef(p.key), dateProfile: e.dateProfile, date: p.date, nowDate: e.nowDate, todayRange: e.todayRange, extraRenderProps: p.extraRenderProps, extraDataAttrs: p.extraDataAttrs, extraClassNames: p.extraClassNames, extraDateSpan: p.extraDateSpan, fgEventSegs: s[u], bgEventSegs: l[u], businessHourSegs: o[u], nowIndicatorSegs: a[u], dateSelectionSegs: d[u], eventDrag: c[u], eventResize: h[u], slatCoords: e.slatCoords, eventSelection: e.eventSelection, forPrint: e.forPrint }))
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
    e.onColCoords && e.clientWidth !== null && e.onColCoords(new Te(
      this.rootElRef.current,
      ef(this.cellElRefs.currentMap, e.cells),
      !0,
      // horizontal
      !1
    ));
  }
}
function ef(t, e) {
  return e.map((n) => t[n.key]);
}
class tf extends V {
  constructor() {
    super(...arguments), this.processSlotOptions = _(nf), this.state = {
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
    return f(
      "div",
      { className: "fc-timegrid-body", ref: this.handleRootEl, style: {
        // these props are important to give this wrapper correct dimensions for interactions
        // TODO: if we set it here, can we avoid giving to inner tables?
        width: e.clientWidth,
        minWidth: e.tableMinWidth
      } },
      f($u, { axis: e.axis, dateProfile: e.dateProfile, slatMetas: e.slatMetas, clientWidth: e.clientWidth, minHeight: e.expandRows ? e.clientHeight : "", tableMinWidth: e.tableMinWidth, tableColGroupNode: e.axis ? e.tableColGroupNode : null, onCoords: this.handleSlatCoords }),
      f(Xu, { cells: e.cells, axis: e.axis, dateProfile: e.dateProfile, businessHourSegs: e.businessHourSegs, bgEventSegs: e.bgEventSegs, fgEventSegs: e.fgEventSegs, dateSelectionSegs: e.dateSelectionSegs, eventSelection: e.eventSelection, eventDrag: e.eventDrag, eventResize: e.eventResize, todayRange: e.todayRange, nowDate: e.nowDate, nowIndicatorSegs: e.nowIndicatorSegs, clientWidth: e.clientWidth, tableMinWidth: e.tableMinWidth, tableColGroupNode: e.tableColGroupNode, slatCoords: n.slatCoords, onColCoords: this.handleColCoords, forPrint: e.forPrint })
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
    let { dateEnv: r, options: i } = this.context, { colCoords: s } = this, { dateProfile: l } = this.props, { slatCoords: o } = this.state, { snapDuration: a, snapsPerSlot: d } = this.processSlotOptions(this.props.slotDuration, i.snapDuration), c = s.leftToIndex(e), h = o.positions.topToIndex(n);
    if (c != null && h != null) {
      let p = this.props.cells[c], u = o.positions.tops[h], m = o.positions.getHeight(h), v = (n - u) / m, b = Math.floor(v * d), y = h * d + b, A = this.props.cells[c].date, C = Qt(l.slotMinTime, so(a, y)), S = r.add(A, C), P = r.add(S, a);
      return {
        dateProfile: l,
        dateSpan: Object.assign({ range: { start: S, end: P }, allDay: !1 }, p.extraDateSpan),
        dayEl: s.els[c],
        rect: {
          left: s.lefts[c],
          right: s.rights[c],
          top: u,
          bottom: u + m
        },
        layer: 0
      };
    }
    return null;
  }
}
function nf(t, e) {
  let n = e || t, r = gn(t, n);
  return r === null && (n = t, r = 1), { snapDuration: n, snapsPerSlot: r };
}
class rf extends fs {
  sliceRange(e, n) {
    let r = [];
    for (let i = 0; i < n.length; i += 1) {
      let s = ge(e, n[i]);
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
class sf extends V {
  constructor() {
    super(...arguments), this.buildDayRanges = _(lf), this.slicer = new rf(), this.timeColsRef = H();
  }
  render() {
    let { props: e, context: n } = this, { dateProfile: r, dayTableModel: i } = e, { nowIndicator: s, nextDayThreshold: l } = n.options, o = this.buildDayRanges(i, r, n.dateEnv);
    return f(ke, { unit: s ? "minute" : "day" }, (a, d) => f(tf, Object.assign({ ref: this.timeColsRef }, this.slicer.sliceProps(e, r, null, n, o), { forPrint: e.forPrint, axis: e.axis, dateProfile: r, slatMetas: e.slatMetas, slotDuration: e.slotDuration, cells: i.cells[0], tableColGroupNode: e.tableColGroupNode, tableMinWidth: e.tableMinWidth, clientWidth: e.clientWidth, clientHeight: e.clientHeight, expandRows: e.expandRows, nowDate: a, nowIndicatorSegs: s && this.slicer.sliceNowDate(a, r, l, n, o), todayRange: d, onScrollTopRequest: e.onScrollTopRequest, onSlatCoords: e.onSlatCoords })));
  }
}
function lf(t, e, n) {
  let r = [];
  for (let i of t.headerDates)
    r.push({
      start: n.add(i, e.slotMinTime),
      end: n.add(i, e.slotMaxTime)
    });
  return r;
}
const Zr = [
  { hours: 1 },
  { minutes: 30 },
  { minutes: 15 },
  { seconds: 30 },
  { seconds: 15 }
];
function of(t, e, n, r, i) {
  let s = /* @__PURE__ */ new Date(0), l = t, o = w(0), a = n || af(r), d = [];
  for (; F(l) < F(e); ) {
    let c = i.add(s, l), h = gn(o, a) !== null;
    d.push({
      date: c,
      time: l,
      key: c.toISOString(),
      isoTimeStr: _o(c),
      isLabeled: h
    }), l = Qt(l, r), o = Qt(o, r);
  }
  return d;
}
function af(t) {
  let e, n, r;
  for (e = Zr.length - 1; e >= 0; e -= 1)
    if (n = w(Zr[e]), r = gn(n, t), r !== null && r > 1)
      return n;
  return t;
}
class cf extends Ou {
  constructor() {
    super(...arguments), this.buildTimeColsModel = _(df), this.buildSlatMetas = _(of);
  }
  render() {
    let { options: e, dateEnv: n, dateProfileGenerator: r } = this.context, { props: i } = this, { dateProfile: s } = i, l = this.buildTimeColsModel(s, r), o = this.allDaySplitter.splitProps(i), a = this.buildSlatMetas(s.slotMinTime, s.slotMaxTime, e.slotLabelInterval, e.slotDuration, n), { dayMinWidth: d } = e, c = !d, h = d, p = e.dayHeaders && f(cs, { dates: l.headerDates, dateProfile: s, datesRepDistinctDays: !0, renderIntro: c ? this.renderHeadAxis : null }), u = e.allDaySlot !== !1 && ((v) => f(Hs, Object.assign({}, o.allDay, { dateProfile: s, dayTableModel: l, nextDayThreshold: e.nextDayThreshold, tableMinWidth: v.tableMinWidth, colGroupNode: v.tableColGroupNode, renderRowIntro: c ? this.renderTableRowAxis : null, showWeekNumbers: !1, expandRows: !1, headerAlignElRef: this.headerElRef, clientWidth: v.clientWidth, clientHeight: v.clientHeight, forPrint: i.forPrint }, this.getAllDayMaxEventProps()))), m = (v) => f(sf, Object.assign({}, o.timed, { dayTableModel: l, dateProfile: s, axis: c, slotDuration: e.slotDuration, slatMetas: a, forPrint: i.forPrint, tableColGroupNode: v.tableColGroupNode, tableMinWidth: v.tableMinWidth, clientWidth: v.clientWidth, clientHeight: v.clientHeight, onSlatCoords: this.handleSlatCoords, expandRows: v.expandRows, onScrollTopRequest: this.handleScrollTopRequest }));
    return h ? this.renderHScrollLayout(p, u, m, l.colCnt, d, a, this.state.slatCoords) : this.renderSimpleLayout(p, u, m);
  }
}
function df(t, e) {
  let n = new ds(t.renderRange, e);
  return new us(n, !1);
}
var uf = '.fc-v-event{background-color:var(--fc-event-bg-color);border:1px solid var(--fc-event-border-color);display:block}.fc-v-event .fc-event-main{color:var(--fc-event-text-color);height:100%}.fc-v-event .fc-event-main-frame{display:flex;flex-direction:column;height:100%}.fc-v-event .fc-event-time{flex-grow:0;flex-shrink:0;max-height:100%;overflow:hidden}.fc-v-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-height:0}.fc-v-event .fc-event-title{bottom:0;max-height:100%;overflow:hidden;top:0}.fc-v-event:not(.fc-event-start){border-top-left-radius:0;border-top-right-radius:0;border-top-width:0}.fc-v-event:not(.fc-event-end){border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-width:0}.fc-v-event.fc-event-selected:before{left:-10px;right:-10px}.fc-v-event .fc-event-resizer-start{cursor:n-resize}.fc-v-event .fc-event-resizer-end{cursor:s-resize}.fc-v-event:not(.fc-event-selected) .fc-event-resizer{height:var(--fc-event-resizer-thickness);left:0;right:0}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-start{top:calc(var(--fc-event-resizer-thickness)/-2)}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-end{bottom:calc(var(--fc-event-resizer-thickness)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer{left:50%;margin-left:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer-start{top:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer-end{bottom:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc .fc-timegrid .fc-daygrid-body{z-index:2}.fc .fc-timegrid-divider{padding:0 0 2px}.fc .fc-timegrid-body{min-height:100%;position:relative;z-index:1}.fc .fc-timegrid-axis-chunk{position:relative}.fc .fc-timegrid-axis-chunk>table,.fc .fc-timegrid-slots{position:relative;z-index:1}.fc .fc-timegrid-slot{border-bottom:0;height:1.5em}.fc .fc-timegrid-slot:empty:before{content:"\\00a0"}.fc .fc-timegrid-slot-minor{border-top-style:dotted}.fc .fc-timegrid-slot-label-cushion{display:inline-block;white-space:nowrap}.fc .fc-timegrid-slot-label{vertical-align:middle}.fc .fc-timegrid-axis-cushion,.fc .fc-timegrid-slot-label-cushion{padding:0 4px}.fc .fc-timegrid-axis-frame-liquid{height:100%}.fc .fc-timegrid-axis-frame{align-items:center;display:flex;justify-content:flex-end;overflow:hidden}.fc .fc-timegrid-axis-cushion{flex-shrink:0;max-width:60px}.fc-direction-ltr .fc-timegrid-slot-label-frame{text-align:right}.fc-direction-rtl .fc-timegrid-slot-label-frame{text-align:left}.fc-liquid-hack .fc-timegrid-axis-frame-liquid{bottom:0;height:auto;left:0;position:absolute;right:0;top:0}.fc .fc-timegrid-col.fc-day-today{background-color:var(--fc-today-bg-color)}.fc .fc-timegrid-col-frame{min-height:100%;position:relative}.fc-media-screen.fc-liquid-hack .fc-timegrid-col-frame{bottom:0;height:auto;left:0;position:absolute;right:0;top:0}.fc-media-screen .fc-timegrid-cols{bottom:0;left:0;position:absolute;right:0;top:0}.fc-media-screen .fc-timegrid-cols>table{height:100%}.fc-media-screen .fc-timegrid-col-bg,.fc-media-screen .fc-timegrid-col-events,.fc-media-screen .fc-timegrid-now-indicator-container{left:0;position:absolute;right:0;top:0}.fc .fc-timegrid-col-bg{z-index:2}.fc .fc-timegrid-col-bg .fc-non-business{z-index:1}.fc .fc-timegrid-col-bg .fc-bg-event{z-index:2}.fc .fc-timegrid-col-bg .fc-highlight{z-index:3}.fc .fc-timegrid-bg-harness{left:0;position:absolute;right:0}.fc .fc-timegrid-col-events{z-index:3}.fc .fc-timegrid-now-indicator-container{bottom:0;overflow:hidden}.fc-direction-ltr .fc-timegrid-col-events{margin:0 2.5% 0 2px}.fc-direction-rtl .fc-timegrid-col-events{margin:0 2px 0 2.5%}.fc-timegrid-event-harness{position:absolute}.fc-timegrid-event-harness>.fc-timegrid-event{bottom:0;left:0;position:absolute;right:0;top:0}.fc-timegrid-event-harness-inset .fc-timegrid-event,.fc-timegrid-event.fc-event-mirror,.fc-timegrid-more-link{box-shadow:0 0 0 1px var(--fc-page-bg-color)}.fc-timegrid-event,.fc-timegrid-more-link{border-radius:3px;font-size:var(--fc-small-font-size)}.fc-timegrid-event{margin-bottom:1px}.fc-timegrid-event .fc-event-main{padding:1px 1px 0}.fc-timegrid-event .fc-event-time{font-size:var(--fc-small-font-size);margin-bottom:1px;white-space:nowrap}.fc-timegrid-event-short .fc-event-main-frame{flex-direction:row;overflow:hidden}.fc-timegrid-event-short .fc-event-time:after{content:"\\00a0-\\00a0"}.fc-timegrid-event-short .fc-event-title{font-size:var(--fc-small-font-size)}.fc-timegrid-more-link{background:var(--fc-more-link-bg-color);color:var(--fc-more-link-text-color);cursor:pointer;margin-bottom:1px;position:absolute;z-index:9999}.fc-timegrid-more-link-inner{padding:3px 2px;top:0}.fc-direction-ltr .fc-timegrid-more-link{right:0}.fc-direction-rtl .fc-timegrid-more-link{left:0}.fc .fc-timegrid-now-indicator-arrow,.fc .fc-timegrid-now-indicator-line{pointer-events:none}.fc .fc-timegrid-now-indicator-line{border-color:var(--fc-now-indicator-color);border-style:solid;border-width:1px 0 0;left:0;position:absolute;right:0;z-index:4}.fc .fc-timegrid-now-indicator-arrow{border-color:var(--fc-now-indicator-color);border-style:solid;margin-top:-5px;position:absolute;z-index:4}.fc-direction-ltr .fc-timegrid-now-indicator-arrow{border-bottom-color:transparent;border-top-color:transparent;border-width:5px 0 5px 6px;left:0}.fc-direction-rtl .fc-timegrid-now-indicator-arrow{border-bottom-color:transparent;border-top-color:transparent;border-width:5px 6px 5px 0;right:0}';
hn(uf);
const ff = {
  allDaySlot: Boolean
};
var hf = se({
  name: "@fullcalendar/timegrid",
  initialView: "timeGridWeek",
  optionRefiners: ff,
  views: {
    timeGrid: {
      component: cf,
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
function Lt(t) {
  return t === "Tag" || t === "Monat" ? "r" : t === "Jahr" ? "s" : "";
}
var pf = {
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
      return `Vorherige${Lt(t)} ${t}`;
    },
    next(t) {
      return `Nächste${Lt(t)} ${t}`;
    },
    today(t) {
      return t === "Tag" ? "Heute" : `Diese${Lt(t)} ${t}`;
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
}, gf = se({
  name: "@fullcalendar/daygrid",
  initialView: "dayGridMonth",
  views: {
    dayGrid: {
      component: Su,
      dateProfileGeneratorClass: wu
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
const mf = js`
  :host {
    display: block;
    width: 100%;
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
`;
var vf = Object.defineProperty, bf = Object.getOwnPropertyDescriptor, Me = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? bf(e, n) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (i = (r ? l(e, n, i) : l(i)) || i);
  return r && i && vf(e, n, i), i;
};
let ie = class extends Pe {
  constructor() {
    super(...arguments), this.activeCalendars = [], this.isCompact = !1, this.allFetchedEvents = [], this.calendar = null, this.events = [];
  }
  setConfig(t) {
    if (!t.entities)
      throw new Error("Bitte Kalender-Entitäten angeben!");
    this.config = t, this.activeCalendars = [...t.entities];
  }
  getCardSize() {
    return 10;
  }
  render() {
    return Qn`
      <ha-card>
        <div class="header">
          <div class="filters">
            ${this.config?.entities?.map((t) => {
      const e = this.config.colors?.[t] || "#0078d4", n = this.activeCalendars.includes(t), r = this.hass?.states[t]?.attributes?.friendly_name || t;
      return Qn`
                <button 
                  class="filter-chip ${n ? "active" : ""}"
                  style="--chip-color: ${e}"
                  @click=${() => this.toggleCalendar(t)}
                >
                  <span class="dot"></span>
                  ${r}
                </button>
              `;
    })}
            
            <div style="flex: 1"></div>
            
            <button 
              class="filter-chip ${this.isCompact ? "active" : ""}"
              style="--chip-color: #666"
              @click=${this.toggleCompact}
            >
              <span class="dot"></span>
              Kompakt
            </button>
          </div>
        </div>
        <div id="calendar"></div>
      </ha-card>
    `;
  }
  toggleCompact() {
    this.isCompact = !this.isCompact;
    const t = this.isCompact ? "dayGridWeek" : "timeGridWeek";
    this.calendar?.changeView(t);
  }
  toggleCalendar(t) {
    this.activeCalendars.includes(t) ? this.activeCalendars = this.activeCalendars.filter((e) => e !== t) : this.activeCalendars = [...this.activeCalendars, t], this.applyFilters();
  }
  applyFilters() {
    if (!this.calendar) return;
    const t = this.allFetchedEvents.filter(
      (e) => this.activeCalendars.includes(e.extendedProps.entityId)
    );
    this.calendar.removeAllEvents(), this.calendar.addEventSource(t), this.events = t, this.calendar.view && this.adjustTimeRange(this.calendar.view.activeStart, this.calendar.view.activeEnd);
  }
  firstUpdated() {
    this.calendarEl && (this.calendar = new nu(this.calendarEl, {
      plugins: [hf, gf],
      initialView: "timeGridWeek",
      locale: pf,
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "timeGridWeek,dayGridMonth"
      },
      height: "85vh",
      allDaySlot: !0,
      slotMinTime: "06:00:00",
      slotMaxTime: "22:00:00",
      slotLabelFormat: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      },
      eventTimeFormat: {
        hour: "2-digit",
        minute: "2-digit",
        meridiem: !1
      },
      // Callback wenn sich der sichtbare Zeitraum ändert (z.B. "Nächste Woche")
      datesSet: (t) => {
        this.adjustTimeRange(t.start, t.end);
      },
      events: []
    }), this.calendar.render(), this.hass && this.config && this.fetchEvents());
  }
  updated(t) {
    t.has("hass") && this.fetchEvents();
  }
  // Berechnet die sichtbaren Zeiten dynamisch
  adjustTimeRange(t, e) {
    if (!this.calendar || this.calendar.view.type === "dayGridWeek") return;
    if (this.events.length === 0) {
      this.calendar.setOption("slotMinTime", "06:00:00"), this.calendar.setOption("slotMaxTime", "22:00:00");
      return;
    }
    let n = 1440, r = 0, i = !1;
    const s = this.events.filter((l) => {
      const o = new Date(l.start);
      return new Date(l.end) > t && o < e;
    });
    if (s.length === 0) {
      this.calendar.setOption("slotMinTime", "06:00:00"), this.calendar.setOption("slotMaxTime", "22:00:00");
      return;
    }
    if (s.forEach((l) => {
      const o = new Date(l.start), a = new Date(l.end), d = o.getHours() * 60 + o.getMinutes(), c = a.getHours() * 60 + a.getMinutes();
      l.allDay || (d < n && (n = d), c > r && (r = c), i = !0);
    }), i) {
      n = Math.max(0, n - 60), r = Math.min(1440, r + 60);
      const l = (o) => {
        const a = Math.floor(o / 60).toString().padStart(2, "0"), d = (o % 60).toString().padStart(2, "0");
        return `${a}:${d}:00`;
      };
      this.calendar.setOption("slotMinTime", l(n)), this.calendar.setOption("slotMaxTime", l(r));
    }
  }
  async fetchEvents() {
    if (!this.hass || !this.config || !this.calendar) return;
    const t = /* @__PURE__ */ new Date();
    t.setDate(t.getDate() - 7);
    const e = /* @__PURE__ */ new Date();
    e.setDate(e.getDate() + 14);
    const n = t.toISOString(), r = e.toISOString(), i = [];
    for (const s of this.config.entities)
      try {
        const l = await this.hass.callWS({
          type: "calendar/event_list",
          entity_id: s,
          start: n,
          end: r
        }), o = this.config.colors?.[s] || "#0078d4", a = l.map((d) => ({
          title: d.summary,
          start: d.start.dateTime || d.start.date,
          end: d.end.dateTime || d.end.date,
          backgroundColor: o,
          borderColor: o,
          allDay: !d.start.dateTime,
          extendedProps: { entityId: s }
        }));
        i.push(...a);
      } catch (l) {
        console.error("Fehler beim Laden von", s, l);
      }
    this.allFetchedEvents = i, this.applyFilters();
  }
};
ie.styles = mf;
Me([
  un({ attribute: !1 })
], ie.prototype, "hass", 2);
Me([
  un()
], ie.prototype, "config", 2);
Me([
  ri()
], ie.prototype, "activeCalendars", 2);
Me([
  ri()
], ie.prototype, "isCompact", 2);
Me([
  ml("#calendar")
], ie.prototype, "calendarEl", 2);
ie = Me([
  fl("family-calendar")
], ie);
export {
  ie as FamilyCalendar
};
