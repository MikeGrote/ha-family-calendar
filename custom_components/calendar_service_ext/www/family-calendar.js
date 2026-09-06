const _t = globalThis, Jn = _t.ShadowRoot && (_t.ShadyCSS === void 0 || _t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ei = /* @__PURE__ */ Symbol(), Ui = /* @__PURE__ */ new WeakMap();
let vs = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== ei) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (Jn && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = Ui.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ui.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ha = (t) => new vs(typeof t == "string" ? t : t + "", void 0, ei), q = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((i, r, s) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[s + 1], t[0]);
  return new vs(n, t, ei);
}, za = (t, e) => {
  if (Jn) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const i = document.createElement("style"), r = _t.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = n.cssText, t.appendChild(i);
  }
}, Fi = Jn ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return Ha(n);
})(t) : t;
const { is: Ba, defineProperty: La, getOwnPropertyDescriptor: Ua, getOwnPropertyNames: Fa, getOwnPropertySymbols: ja, getPrototypeOf: Wa } = Object, tn = globalThis, ji = tn.trustedTypes, Va = ji ? ji.emptyScript : "", Ga = tn.reactiveElementPolyfillSupport, st = (t, e) => t, Ot = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Va : null;
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
} }, ti = (t, e) => !Ba(t, e), Wi = { attribute: !0, type: String, converter: Ot, reflect: !1, useDefault: !1, hasChanged: ti };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), tn.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Pe = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Wi) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, i, n);
      r !== void 0 && La(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: r, set: s } = Ua(this.prototype, e) ?? { get() {
      return this[n];
    }, set(o) {
      this[n] = o;
    } };
    return { get: r, set(o) {
      const a = r?.call(this);
      s?.call(this, o), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Wi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(st("elementProperties"))) return;
    const e = Wa(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(st("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(st("properties"))) {
      const n = this.properties, i = [...Fa(n), ...ja(n)];
      for (const r of i) this.createProperty(r, n[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [i, r] of n) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, i] of this.elementProperties) {
      const r = this._$Eu(n, i);
      r !== void 0 && this._$Eh.set(r, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const r of i) n.unshift(Fi(r));
    } else e !== void 0 && n.push(Fi(e));
    return n;
  }
  static _$Eu(e, n) {
    const i = n.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const i of n.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return za(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, n, i) {
    this._$AK(e, i);
  }
  _$ET(e, n) {
    const i = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, i);
    if (r !== void 0 && i.reflect === !0) {
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : Ot).toAttribute(n, i.type);
      this._$Em = e, s == null ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
    }
  }
  _$AK(e, n) {
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const s = i.getPropertyOptions(r), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Ot;
      this._$Em = r;
      const a = o.fromAttribute(n, s.type);
      this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, n, i, r = !1, s) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (s = this[e]), i ??= o.getPropertyOptions(e), !((i.hasChanged ?? ti)(s, n) || i.useDefault && i.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: i, reflect: r, wrapped: s }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? n ?? this[e]), s !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (n = void 0), this._$AL.set(e, n)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [r, s] of this._$Ep) this[r] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, s] of i) {
        const { wrapped: o } = s, a = this[r];
        o !== !0 || this._$AL.has(r) || a === void 0 || this.C(r, void 0, s, a);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
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
Pe.elementStyles = [], Pe.shadowRootOptions = { mode: "open" }, Pe[st("elementProperties")] = /* @__PURE__ */ new Map(), Pe[st("finalized")] = /* @__PURE__ */ new Map(), Ga?.({ ReactiveElement: Pe }), (tn.reactiveElementVersions ??= []).push("2.1.2");
const ni = globalThis, Vi = (t) => t, $t = ni.trustedTypes, Gi = $t ? $t.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, bs = "$lit$", ue = `lit$${Math.random().toFixed(9).slice(2)}$`, ys = "?" + ue, qa = `<${ys}>`, Te = document, dt = () => Te.createComment(""), ut = (t) => t === null || typeof t != "object" && typeof t != "function", ii = Array.isArray, Ya = (t) => ii(t) || typeof t?.[Symbol.iterator] == "function", pn = `[ 	
\f\r]`, it = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qi = /-->/g, Yi = />/g, Se = RegExp(`>|${pn}(?:([^\\s"'>=/]+)(${pn}*=${pn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Qi = /'/g, Zi = /"/g, Es = /^(?:script|style|textarea|title)$/i, Qa = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), E = Qa(1), We = /* @__PURE__ */ Symbol.for("lit-noChange"), H = /* @__PURE__ */ Symbol.for("lit-nothing"), Ki = /* @__PURE__ */ new WeakMap(), xe = Te.createTreeWalker(Te, 129);
function ws(t, e) {
  if (!ii(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Gi !== void 0 ? Gi.createHTML(e) : e;
}
const Za = (t, e) => {
  const n = t.length - 1, i = [];
  let r, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = it;
  for (let a = 0; a < n; a++) {
    const l = t[a];
    let d, c, h = -1, f = 0;
    for (; f < l.length && (o.lastIndex = f, c = o.exec(l), c !== null); ) f = o.lastIndex, o === it ? c[1] === "!--" ? o = qi : c[1] !== void 0 ? o = Yi : c[2] !== void 0 ? (Es.test(c[2]) && (r = RegExp("</" + c[2], "g")), o = Se) : c[3] !== void 0 && (o = Se) : o === Se ? c[0] === ">" ? (o = r ?? it, h = -1) : c[1] === void 0 ? h = -2 : (h = o.lastIndex - c[2].length, d = c[1], o = c[3] === void 0 ? Se : c[3] === '"' ? Zi : Qi) : o === Zi || o === Qi ? o = Se : o === qi || o === Yi ? o = it : (o = Se, r = void 0);
    const u = o === Se && t[a + 1].startsWith("/>") ? " " : "";
    s += o === it ? l + qa : h >= 0 ? (i.push(d), l.slice(0, h) + bs + l.slice(h) + ue + u) : l + ue + (h === -2 ? a : u);
  }
  return [ws(t, s + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
let $n = class Ss {
  constructor({ strings: e, _$litType$: n }, i) {
    let r;
    this.parts = [];
    let s = 0, o = 0;
    const a = e.length - 1, l = this.parts, [d, c] = Za(e, n);
    if (this.el = Ss.createElement(d, i), xe.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = xe.nextNode()) !== null && l.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(bs)) {
          const f = c[o++], u = r.getAttribute(h).split(ue), g = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: s, name: g[2], strings: u, ctor: g[1] === "." ? Xa : g[1] === "?" ? Ja : g[1] === "@" ? el : nn }), r.removeAttribute(h);
        } else h.startsWith(ue) && (l.push({ type: 6, index: s }), r.removeAttribute(h));
        if (Es.test(r.tagName)) {
          const h = r.textContent.split(ue), f = h.length - 1;
          if (f > 0) {
            r.textContent = $t ? $t.emptyScript : "";
            for (let u = 0; u < f; u++) r.append(h[u], dt()), xe.nextNode(), l.push({ type: 2, index: ++s });
            r.append(h[f], dt());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ys) l.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(ue, h + 1)) !== -1; ) l.push({ type: 7, index: s }), h += ue.length - 1;
      }
      s++;
    }
  }
  static createElement(e, n) {
    const i = Te.createElement("template");
    return i.innerHTML = e, i;
  }
};
function Ve(t, e, n = t, i) {
  if (e === We) return e;
  let r = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const s = ut(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== s && (r?._$AO?.(!1), s === void 0 ? r = void 0 : (r = new s(t), r._$AT(t, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = r : n._$Cl = r), r !== void 0 && (e = Ve(t, r._$AS(t, e.values), r, i)), e;
}
class Ka {
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
    const { el: { content: n }, parts: i } = this._$AD, r = (e?.creationScope ?? Te).importNode(n, !0);
    xe.currentNode = r;
    let s = xe.nextNode(), o = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let d;
        l.type === 2 ? d = new ri(s, s.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (d = new tl(s, this, e)), this._$AV.push(d), l = i[++a];
      }
      o !== l?.index && (s = xe.nextNode(), o++);
    }
    return xe.currentNode = Te, r;
  }
  p(e) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, n), n += i.strings.length - 2) : i._$AI(e[n])), n++;
  }
}
let ri = class As {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, n, i, r) {
    this.type = 2, this._$AH = H, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = Ve(this, e, n), ut(e) ? e === H || e == null || e === "" ? (this._$AH !== H && this._$AR(), this._$AH = H) : e !== this._$AH && e !== We && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ya(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== H && ut(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Te.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: n, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = $n.createElement(ws(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(n);
    else {
      const s = new Ka(r, this), o = s.u(this.options);
      s.p(n), this.T(o), this._$AH = s;
    }
  }
  _$AC(e) {
    let n = Ki.get(e.strings);
    return n === void 0 && Ki.set(e.strings, n = new $n(e)), n;
  }
  k(e) {
    ii(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, r = 0;
    for (const s of e) r === n.length ? n.push(i = new As(this.O(dt()), this.O(dt()), this, this.options)) : i = n[r], i._$AI(s), r++;
    r < n.length && (this._$AR(i && i._$AB.nextSibling, r), n.length = r);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); e !== this._$AB; ) {
      const i = Vi(e).nextSibling;
      Vi(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}, nn = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, i, r, s) {
    this.type = 1, this._$AH = H, this._$AN = void 0, this.element = e, this.name = n, this._$AM = r, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = H;
  }
  _$AI(e, n = this, i, r) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) e = Ve(this, e, n, 0), o = !ut(e) || e !== this._$AH && e !== We, o && (this._$AH = e);
    else {
      const a = e;
      let l, d;
      for (e = s[0], l = 0; l < s.length - 1; l++) d = Ve(this, a[i + l], n, l), d === We && (d = this._$AH[l]), o ||= !ut(d) || d !== this._$AH[l], d === H ? e = H : e !== H && (e += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === H ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}, Xa = class extends nn {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === H ? void 0 : e;
  }
}, Ja = class extends nn {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== H);
  }
}, el = class extends nn {
  constructor(e, n, i, r, s) {
    super(e, n, i, r, s), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = Ve(this, e, n, 0) ?? H) === We) return;
    const i = this._$AH, r = e === H && i !== H || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== H && (i === H || r);
    r && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}, tl = class {
  constructor(e, n, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ve(this, e);
  }
};
const nl = ni.litHtmlPolyfillSupport;
nl?.($n, ri), (ni.litHtmlVersions ??= []).push("3.3.2");
const il = (t, e, n) => {
  const i = n?.renderBefore ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const s = n?.renderBefore ?? null;
    i._$litPart$ = r = new ri(e.insertBefore(dt(), s), s, void 0, n ?? {});
  }
  return r._$AI(t), r;
};
const si = globalThis;
let J = class extends Pe {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = il(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return We;
  }
};
J._$litElement$ = !0, J.finalized = !0, si.litElementHydrateSupport?.({ LitElement: J });
const rl = si.litElementPolyfillSupport;
rl?.({ LitElement: J });
(si.litElementVersions ??= []).push("4.2.2");
const Ke = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const sl = { attribute: !0, type: String, converter: Ot, reflect: !1, hasChanged: ti }, ol = (t = sl, e, n) => {
  const { kind: i, metadata: r } = n;
  let s = globalThis.litPropertyMetadata.get(r);
  if (s === void 0 && globalThis.litPropertyMetadata.set(r, s = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(n.name, t), i === "accessor") {
    const { name: o } = n;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(o, l, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, t, a), a;
    } };
  }
  if (i === "setter") {
    const { name: o } = n;
    return function(a) {
      const l = this[o];
      e.call(this, a), this.requestUpdate(o, l, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function j(t) {
  return (e, n) => typeof n == "object" ? ol(t, e, n) : ((i, r, s) => {
    const o = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, i), o ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(t, e, n);
}
function $(t) {
  return j({ ...t, state: !0, attribute: !1 });
}
const al = (t, e, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, n), n);
function oi(t, e) {
  return (n, i, r) => {
    const s = (o) => o.renderRoot?.querySelector(t) ?? null;
    return al(n, i, { get() {
      return s(this);
    } });
  };
}
const ll = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
function Ge(t) {
  const e = new Date(t);
  return e.setHours(0, 0, 0, 0), e;
}
function cl(t, e) {
  const n = Math.round(
    (Ge(t).getTime() - Ge(e).getTime()) / 864e5
  );
  return n === 0 ? "Heute" : n === 1 ? "Morgen" : ll[t.getDay()];
}
function dl(t, e, n) {
  const i = !t.start.dateTime;
  return {
    uid: t.uid ?? `${n}-${t.summary}-${t.start.date ?? ""}`,
    summary: t.summary,
    location: t.location ?? void 0,
    color: e,
    calendarName: n,
    allDay: i,
    start: new Date(t.start.dateTime ?? `${t.start.date}T00:00:00`),
    end: new Date(t.end.dateTime ?? `${t.end.date}T00:00:00`)
  };
}
function ul(t, e, n = /* @__PURE__ */ new Date()) {
  const i = [];
  for (let r = 0; r < e; r++) {
    const s = Ge(n);
    s.setDate(s.getDate() + r);
    const o = new Date(s);
    o.setDate(o.getDate() + 1);
    const a = t.filter((l) => l.start < o && l.end > s).sort(fl);
    i.push({ date: s, label: cl(s, n), entries: a });
  }
  return i;
}
function fl(t, e) {
  return t.allDay !== e.allDay ? t.allDay ? -1 : 1 : t.start.getTime() - e.start.getTime();
}
function hl(t, e) {
  if (t.allDay) return "Ganztägig";
  const n = (s) => s.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }), i = Ge(t.start).getTime() === e.getTime(), r = Ge(t.end).getTime() === e.getTime();
  return i && r ? `${n(t.start)} – ${n(t.end)}` : i ? `ab ${n(t.start)}` : r ? `bis ${n(t.end)}` : "Ganztägig";
}
async function Ds(t, e, n, i) {
  const r = encodeURIComponent(n), s = encodeURIComponent(i);
  return t.callApi("GET", `calendars/${e}?start=${r}&end=${s}`);
}
async function pl(t, e, n) {
  await t.callWS({ type: "calendar/event/create", entity_id: e, event: n });
}
async function Cs(t, e, n, i, r = {}) {
  await t.callWS({
    type: "calendar/event/update",
    entity_id: e,
    uid: n,
    ...r,
    event: i
  });
}
async function gl(t, e, n, i = {}) {
  await t.callWS({
    type: "calendar/event/delete",
    entity_id: e,
    uid: n,
    ...i
  });
}
const rn = "#0078d4";
function ml(t, e, n = rn) {
  const i = {
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
    extendedProps: i
  };
}
function vl(t, e) {
  return t.filter(
    (n) => e.includes(n.extendedProps.entityId)
  );
}
const bl = q`
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
function yl(t) {
  const e = t[0]?.date.getMonth();
  return t.some((n) => n.date.getMonth() !== e);
}
function El(t) {
  const e = t.hideEmptyDays ? t.days.filter((n) => n.entries.length > 0) : t.days;
  return E`
    <ha-card>
      <div class="agenda">
        ${e.length === 0 ? E`<p class="empty-all">In den nächsten Tagen steht nichts an.</p>` : e.map((n) => wl(n, yl(e)))}
      </div>
    </ha-card>
  `;
}
function wl(t, e) {
  const n = t.label === "Heute";
  return E`
    <section class="day ${n ? "day--today" : ""}">
      <header class="day-head">
        <span class="day-number">${t.date.getDate()}</span>
        <span class="day-label">${t.label}</span>
        ${e ? E`<span class="day-month">
              ${t.date.toLocaleDateString("de-DE", { month: "short" })}
            </span>` : ""}
      </header>
      ${t.entries.length === 0 ? E`<p class="empty">Keine Termine</p>` : t.entries.map((i) => Sl(i, t.date))}
    </section>
  `;
}
function Sl(t, e) {
  return E`
    <article class="entry" style="--entry-color: ${t.color}" title=${t.calendarName}>
      <span class="stripe"></span>
      <div class="entry-body">
        <span class="entry-title">${t.summary}</span>
        <span class="entry-meta">
          ${hl(t, e)}${t.location ? E` · ${t.location}` : ""}
        </span>
      </div>
    </article>
  `;
}
var Al = Object.defineProperty, Dl = Object.getOwnPropertyDescriptor, sn = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? Dl(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (i ? o(e, n, r) : o(r)) || r);
  return i && r && Al(e, n, r), r;
};
const Cl = 7, xl = 500;
let qe = class extends J {
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
    return El({
      days: this.days,
      hideEmptyDays: this.config?.hideEmptyDays ?? !1
    });
  }
  scheduleLoad() {
    this.refreshTimer !== void 0 && clearTimeout(this.refreshTimer), this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = void 0, this.load();
    }, this.config?.refreshDebounceMs ?? xl);
  }
  async load() {
    if (!this.hass || !this.config) return;
    const t = this.config.days ?? Cl, e = Ge(/* @__PURE__ */ new Date()), n = new Date(e);
    n.setDate(n.getDate() + t);
    const i = [];
    for (const r of this.config.entities)
      try {
        const s = await Ds(
          this.hass,
          r,
          e.toISOString(),
          n.toISOString()
        ), o = this.config.colors?.[r] ?? rn, a = this.hass.states[r]?.attributes?.friendly_name ?? r;
        i.push(...s.map((l) => dl(l, o, a)));
      } catch (s) {
        console.error("Family Agenda: Laden fehlgeschlagen für", r, s);
      }
    this.days = ul(i, t);
  }
};
qe.styles = bl;
sn([
  j({ attribute: !1 })
], qe.prototype, "hass", 2);
sn([
  j({ attribute: !1 })
], qe.prototype, "config", 2);
sn([
  $()
], qe.prototype, "days", 2);
qe = sn([
  Ke("family-agenda")
], qe);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-agenda",
  name: "Family Agenda",
  description: "Übersicht der nächsten Tage als Liste, über mehrere Kalender.",
  preview: !1
});
var on, S, xs, _s, Ye, Ce, Xi, Rs, Ts, Pt = {}, ks = [], _l = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function fe(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function Ms(t) {
  var e = t.parentNode;
  e && e.removeChild(t);
}
function p(t, e, n) {
  var i, r, s, o = {};
  for (s in e) s == "key" ? i = e[s] : s == "ref" ? r = e[s] : o[s] = e[s];
  if (arguments.length > 2 && (o.children = arguments.length > 3 ? on.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null) for (s in t.defaultProps) o[s] === void 0 && (o[s] = t.defaultProps[s]);
  return Rt(t, o, i, r, null);
}
function Rt(t, e, n, i, r) {
  var s = { type: t, props: e, key: n, ref: i, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: r ?? ++xs };
  return r == null && S.vnode != null && S.vnode(s), s;
}
function L() {
  return { current: null };
}
function k(t) {
  return t.children;
}
function Rl(t, e, n, i, r) {
  var s;
  for (s in n) s === "children" || s === "key" || s in e || Ht(t, s, null, n[s], i);
  for (s in e) r && typeof e[s] != "function" || s === "children" || s === "key" || s === "value" || s === "checked" || n[s] === e[s] || Ht(t, s, e[s], n[s], i);
}
function Ji(t, e, n) {
  e[0] === "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || _l.test(e) ? n : n + "px";
}
function Ht(t, e, n, i, r) {
  var s;
  e: if (e === "style") if (typeof n == "string") t.style.cssText = n;
  else {
    if (typeof i == "string" && (t.style.cssText = i = ""), i) for (e in i) n && e in n || Ji(t.style, e, "");
    if (n) for (e in n) i && n[e] === i[e] || Ji(t.style, e, n[e]);
  }
  else if (e[0] === "o" && e[1] === "n") s = e !== (e = e.replace(/Capture$/, "")), e = e.toLowerCase() in t ? e.toLowerCase().slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + s] = n, n ? i || t.addEventListener(e, s ? tr : er, s) : t.removeEventListener(e, s ? tr : er, s);
  else if (e !== "dangerouslySetInnerHTML") {
    if (r) e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (e !== "width" && e !== "height" && e !== "href" && e !== "list" && e !== "form" && e !== "tabIndex" && e !== "download" && e in t) try {
      t[e] = n ?? "";
      break e;
    } catch {
    }
    typeof n == "function" || (n == null || n === !1 && e.indexOf("-") == -1 ? t.removeAttribute(e) : t.setAttribute(e, n));
  }
}
function er(t) {
  Ye = !0;
  try {
    return this.l[t.type + !1](S.event ? S.event(t) : t);
  } finally {
    Ye = !1;
  }
}
function tr(t) {
  Ye = !0;
  try {
    return this.l[t.type + !0](S.event ? S.event(t) : t);
  } finally {
    Ye = !1;
  }
}
function W(t, e) {
  this.props = t, this.context = e;
}
function ft(t, e) {
  if (e == null) return t.__ ? ft(t.__, t.__.__k.indexOf(t) + 1) : null;
  for (var n; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) return n.__e;
  return typeof t.type == "function" ? ft(t) : null;
}
function Is(t) {
  var e, n;
  if ((t = t.__) != null && t.__c != null) {
    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) {
      t.__e = t.__c.base = n.__e;
      break;
    }
    return Is(t);
  }
}
function Tl(t) {
  Ye ? setTimeout(t) : Rs(t);
}
function Pn(t) {
  (!t.__d && (t.__d = !0) && Ce.push(t) && !zt.__r++ || Xi !== S.debounceRendering) && ((Xi = S.debounceRendering) || Tl)(zt);
}
function zt() {
  var t, e, n, i, r, s, o, a;
  for (Ce.sort(function(l, d) {
    return l.__v.__b - d.__v.__b;
  }); t = Ce.shift(); ) t.__d && (e = Ce.length, i = void 0, r = void 0, o = (s = (n = t).__v).__e, (a = n.__P) && (i = [], (r = fe({}, s)).__v = s.__v + 1, ai(a, s, r, n.__n, a.ownerSVGElement !== void 0, s.__h != null ? [o] : null, i, o ?? ft(s), s.__h), Hs(i, s), s.__e != o && Is(s)), Ce.length > e && Ce.sort(function(l, d) {
    return l.__v.__b - d.__v.__b;
  }));
  zt.__r = 0;
}
function Ns(t, e, n, i, r, s, o, a, l, d) {
  var c, h, f, u, g, m, b, y = i && i.__k || ks, w = y.length;
  for (n.__k = [], c = 0; c < e.length; c++) if ((u = n.__k[c] = (u = e[c]) == null || typeof u == "boolean" ? null : typeof u == "string" || typeof u == "number" || typeof u == "bigint" ? Rt(null, u, null, null, u) : Array.isArray(u) ? Rt(k, { children: u }, null, null, null) : u.__b > 0 ? Rt(u.type, u.props, u.key, u.ref ? u.ref : null, u.__v) : u) != null) {
    if (u.__ = n, u.__b = n.__b + 1, (f = y[c]) === null || f && u.key == f.key && u.type === f.type) y[c] = void 0;
    else for (h = 0; h < w; h++) {
      if ((f = y[h]) && u.key == f.key && u.type === f.type) {
        y[h] = void 0;
        break;
      }
      f = null;
    }
    ai(t, u, f = f || Pt, r, s, o, a, l, d), g = u.__e, (h = u.ref) && f.ref != h && (b || (b = []), f.ref && b.push(f.ref, null, u), b.push(h, u.__c || g, u)), g != null ? (m == null && (m = g), typeof u.type == "function" && u.__k === f.__k ? u.__d = l = Os(u, l, t) : l = $s(t, u, f, y, g, l), typeof n.type == "function" && (n.__d = l)) : l && f.__e == l && l.parentNode != t && (l = ft(f));
  }
  for (n.__e = m, c = w; c--; ) y[c] != null && (typeof n.type == "function" && y[c].__e != null && y[c].__e == n.__d && (n.__d = Ps(i).nextSibling), Bs(y[c], y[c]));
  if (b) for (c = 0; c < b.length; c++) zs(b[c], b[++c], b[++c]);
}
function Os(t, e, n) {
  for (var i, r = t.__k, s = 0; r && s < r.length; s++) (i = r[s]) && (i.__ = t, e = typeof i.type == "function" ? Os(i, e, n) : $s(n, i, i, r, i.__e, e));
  return e;
}
function Bt(t, e) {
  return e = e || [], t == null || typeof t == "boolean" || (Array.isArray(t) ? t.some(function(n) {
    Bt(n, e);
  }) : e.push(t)), e;
}
function $s(t, e, n, i, r, s) {
  var o, a, l;
  if (e.__d !== void 0) o = e.__d, e.__d = void 0;
  else if (n == null || r != s || r.parentNode == null) e: if (s == null || s.parentNode !== t) t.appendChild(r), o = null;
  else {
    for (a = s, l = 0; (a = a.nextSibling) && l < i.length; l += 1) if (a == r) break e;
    t.insertBefore(r, s), o = s;
  }
  return o !== void 0 ? o : r.nextSibling;
}
function Ps(t) {
  var e, n, i;
  if (t.type == null || typeof t.type == "string") return t.__e;
  if (t.__k) {
    for (e = t.__k.length - 1; e >= 0; e--) if ((n = t.__k[e]) && (i = Ps(n))) return i;
  }
  return null;
}
function ai(t, e, n, i, r, s, o, a, l) {
  var d, c, h, f, u, g, m, b, y, w, D, C, P, T, I, _ = e.type;
  if (e.constructor !== void 0) return null;
  n.__h != null && (l = n.__h, a = e.__e = n.__e, e.__h = null, s = [a]), (d = S.__b) && d(e);
  try {
    e: if (typeof _ == "function") {
      if (b = e.props, y = (d = _.contextType) && i[d.__c], w = d ? y ? y.props.value : d.__ : i, n.__c ? m = (c = e.__c = n.__c).__ = c.__E : ("prototype" in _ && _.prototype.render ? e.__c = c = new _(b, w) : (e.__c = c = new W(b, w), c.constructor = _, c.render = Ml), y && y.sub(c), c.props = b, c.state || (c.state = {}), c.context = w, c.__n = i, h = c.__d = !0, c.__h = [], c._sb = []), c.__s == null && (c.__s = c.state), _.getDerivedStateFromProps != null && (c.__s == c.state && (c.__s = fe({}, c.__s)), fe(c.__s, _.getDerivedStateFromProps(b, c.__s))), f = c.props, u = c.state, c.__v = e, h) _.getDerivedStateFromProps == null && c.componentWillMount != null && c.componentWillMount(), c.componentDidMount != null && c.__h.push(c.componentDidMount);
      else {
        if (_.getDerivedStateFromProps == null && b !== f && c.componentWillReceiveProps != null && c.componentWillReceiveProps(b, w), !c.__e && c.shouldComponentUpdate != null && c.shouldComponentUpdate(b, c.__s, w) === !1 || e.__v === n.__v) {
          for (e.__v !== n.__v && (c.props = b, c.state = c.__s, c.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.forEach(function(de) {
            de && (de.__ = e);
          }), D = 0; D < c._sb.length; D++) c.__h.push(c._sb[D]);
          c._sb = [], c.__h.length && o.push(c);
          break e;
        }
        c.componentWillUpdate != null && c.componentWillUpdate(b, c.__s, w), c.componentDidUpdate != null && c.__h.push(function() {
          c.componentDidUpdate(f, u, g);
        });
      }
      if (c.context = w, c.props = b, c.__P = t, C = S.__r, P = 0, "prototype" in _ && _.prototype.render) {
        for (c.state = c.__s, c.__d = !1, C && C(e), d = c.render(c.props, c.state, c.context), T = 0; T < c._sb.length; T++) c.__h.push(c._sb[T]);
        c._sb = [];
      } else do
        c.__d = !1, C && C(e), d = c.render(c.props, c.state, c.context), c.state = c.__s;
      while (c.__d && ++P < 25);
      c.state = c.__s, c.getChildContext != null && (i = fe(fe({}, i), c.getChildContext())), h || c.getSnapshotBeforeUpdate == null || (g = c.getSnapshotBeforeUpdate(f, u)), I = d != null && d.type === k && d.key == null ? d.props.children : d, Ns(t, Array.isArray(I) ? I : [I], e, n, i, r, s, o, a, l), c.base = e.__e, e.__h = null, c.__h.length && o.push(c), m && (c.__E = c.__ = null), c.__e = !1;
    } else s == null && e.__v === n.__v ? (e.__k = n.__k, e.__e = n.__e) : e.__e = kl(n.__e, e, n, i, r, s, o, l);
    (d = S.diffed) && d(e);
  } catch (de) {
    e.__v = null, (l || s != null) && (e.__e = a, e.__h = !!l, s[s.indexOf(a)] = null), S.__e(de, e, n);
  }
}
function Hs(t, e) {
  S.__c && S.__c(e, t), t.some(function(n) {
    try {
      t = n.__h, n.__h = [], t.some(function(i) {
        i.call(n);
      });
    } catch (i) {
      S.__e(i, n.__v);
    }
  });
}
function kl(t, e, n, i, r, s, o, a) {
  var l, d, c, h = n.props, f = e.props, u = e.type, g = 0;
  if (u === "svg" && (r = !0), s != null) {
    for (; g < s.length; g++) if ((l = s[g]) && "setAttribute" in l == !!u && (u ? l.localName === u : l.nodeType === 3)) {
      t = l, s[g] = null;
      break;
    }
  }
  if (t == null) {
    if (u === null) return document.createTextNode(f);
    t = r ? document.createElementNS("http://www.w3.org/2000/svg", u) : document.createElement(u, f.is && f), s = null, a = !1;
  }
  if (u === null) h === f || a && t.data === f || (t.data = f);
  else {
    if (s = s && on.call(t.childNodes), d = (h = n.props || Pt).dangerouslySetInnerHTML, c = f.dangerouslySetInnerHTML, !a) {
      if (s != null) for (h = {}, g = 0; g < t.attributes.length; g++) h[t.attributes[g].name] = t.attributes[g].value;
      (c || d) && (c && (d && c.__html == d.__html || c.__html === t.innerHTML) || (t.innerHTML = c && c.__html || ""));
    }
    if (Rl(t, f, h, r, a), c) e.__k = [];
    else if (g = e.props.children, Ns(t, Array.isArray(g) ? g : [g], e, n, i, r && u !== "foreignObject", s, o, s ? s[0] : n.__k && ft(n, 0), a), s != null) for (g = s.length; g--; ) s[g] != null && Ms(s[g]);
    a || ("value" in f && (g = f.value) !== void 0 && (g !== t.value || u === "progress" && !g || u === "option" && g !== h.value) && Ht(t, "value", g, h.value, !1), "checked" in f && (g = f.checked) !== void 0 && g !== t.checked && Ht(t, "checked", g, h.checked, !1));
  }
  return t;
}
function zs(t, e, n) {
  try {
    typeof t == "function" ? t(e) : t.current = e;
  } catch (i) {
    S.__e(i, n);
  }
}
function Bs(t, e, n) {
  var i, r;
  if (S.unmount && S.unmount(t), (i = t.ref) && (i.current && i.current !== t.__e || zs(i, null, e)), (i = t.__c) != null) {
    if (i.componentWillUnmount) try {
      i.componentWillUnmount();
    } catch (s) {
      S.__e(s, e);
    }
    i.base = i.__P = null, t.__c = void 0;
  }
  if (i = t.__k) for (r = 0; r < i.length; r++) i[r] && Bs(i[r], e, n || typeof t.type != "function");
  n || t.__e == null || Ms(t.__e), t.__ = t.__e = t.__d = void 0;
}
function Ml(t, e, n) {
  return this.constructor(t, n);
}
function ht(t, e, n) {
  var i, r, s;
  S.__ && S.__(t, e), r = (i = !1) ? null : e.__k, s = [], ai(e, t = e.__k = p(k, null, [t]), r || Pt, Pt, e.ownerSVGElement !== void 0, r ? null : e.firstChild ? on.call(e.childNodes) : null, s, r ? r.__e : e.firstChild, i), Hs(s, t);
}
function Il(t, e) {
  var n = { __c: e = "__cC" + Ts++, __: t, Consumer: function(i, r) {
    return i.children(r);
  }, Provider: function(i) {
    var r, s;
    return this.getChildContext || (r = [], (s = {})[e] = this, this.getChildContext = function() {
      return s;
    }, this.shouldComponentUpdate = function(o) {
      this.props.value !== o.value && r.some(function(a) {
        a.__e = !0, Pn(a);
      });
    }, this.sub = function(o) {
      r.push(o);
      var a = o.componentWillUnmount;
      o.componentWillUnmount = function() {
        r.splice(r.indexOf(o), 1), a && a.call(o);
      };
    }), i.children;
  } };
  return n.Provider.__ = n.Consumer.contextType = n;
}
on = ks.slice, S = { __e: function(t, e, n, i) {
  for (var r, s, o; e = e.__; ) if ((r = e.__c) && !r.__) try {
    if ((s = r.constructor) && s.getDerivedStateFromError != null && (r.setState(s.getDerivedStateFromError(t)), o = r.__d), r.componentDidCatch != null && (r.componentDidCatch(t, i || {}), o = r.__d), o) return r.__E = r;
  } catch (a) {
    t = a;
  }
  throw t;
} }, xs = 0, _s = function(t) {
  return t != null && t.constructor === void 0;
}, Ye = !1, W.prototype.setState = function(t, e) {
  var n;
  n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = fe({}, this.state), typeof t == "function" && (t = t(fe({}, n), this.props)), t && fe(n, t), t != null && this.__v && (e && this._sb.push(e), Pn(this));
}, W.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), Pn(this));
}, W.prototype.render = k, Ce = [], Rs = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, zt.__r = 0, Ts = 0;
var X, gn, nr, Ls = [], mn = [], ir = S.__b, rr = S.__r, sr = S.diffed, or = S.__c, ar = S.unmount;
function Nl() {
  for (var t; t = Ls.shift(); ) if (t.__P && t.__H) try {
    t.__H.__h.forEach(Tt), t.__H.__h.forEach(Hn), t.__H.__h = [];
  } catch (e) {
    t.__H.__h = [], S.__e(e, t.__v);
  }
}
S.__b = function(t) {
  X = null, ir && ir(t);
}, S.__r = function(t) {
  rr && rr(t);
  var e = (X = t.__c).__H;
  e && (gn === X ? (e.__h = [], X.__h = [], e.__.forEach(function(n) {
    n.__N && (n.__ = n.__N), n.__V = mn, n.__N = n.i = void 0;
  })) : (e.__h.forEach(Tt), e.__h.forEach(Hn), e.__h = [])), gn = X;
}, S.diffed = function(t) {
  sr && sr(t);
  var e = t.__c;
  e && e.__H && (e.__H.__h.length && (Ls.push(e) !== 1 && nr === S.requestAnimationFrame || ((nr = S.requestAnimationFrame) || Ol)(Nl)), e.__H.__.forEach(function(n) {
    n.i && (n.__H = n.i), n.__V !== mn && (n.__ = n.__V), n.i = void 0, n.__V = mn;
  })), gn = X = null;
}, S.__c = function(t, e) {
  e.some(function(n) {
    try {
      n.__h.forEach(Tt), n.__h = n.__h.filter(function(i) {
        return !i.__ || Hn(i);
      });
    } catch (i) {
      e.some(function(r) {
        r.__h && (r.__h = []);
      }), e = [], S.__e(i, n.__v);
    }
  }), or && or(t, e);
}, S.unmount = function(t) {
  ar && ar(t);
  var e, n = t.__c;
  n && n.__H && (n.__H.__.forEach(function(i) {
    try {
      Tt(i);
    } catch (r) {
      e = r;
    }
  }), n.__H = void 0, e && S.__e(e, n.__v));
};
var lr = typeof requestAnimationFrame == "function";
function Ol(t) {
  var e, n = function() {
    clearTimeout(i), lr && cancelAnimationFrame(e), setTimeout(t);
  }, i = setTimeout(n, 100);
  lr && (e = requestAnimationFrame(n));
}
function Tt(t) {
  var e = X, n = t.__c;
  typeof n == "function" && (t.__c = void 0, n()), X = e;
}
function Hn(t) {
  var e = X;
  t.__c = t.__(), X = e;
}
function $l(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function cr(t, e) {
  for (var n in t) if (n !== "__source" && !(n in e)) return !0;
  for (var i in e) if (i !== "__source" && t[i] !== e[i]) return !0;
  return !1;
}
function dr(t) {
  this.props = t;
}
(dr.prototype = new W()).isPureReactComponent = !0, dr.prototype.shouldComponentUpdate = function(t, e) {
  return cr(this.props, t) || cr(this.state, e);
};
var ur = S.__b;
S.__b = function(t) {
  t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), ur && ur(t);
};
var Pl = S.__e;
S.__e = function(t, e, n, i) {
  if (t.then) {
    for (var r, s = e; s = s.__; ) if ((r = s.__c) && r.__c) return e.__e == null && (e.__e = n.__e, e.__k = n.__k), r.__c(t, e);
  }
  Pl(t, e, n, i);
};
var fr = S.unmount;
function Us(t, e, n) {
  return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(i) {
    typeof i.__c == "function" && i.__c();
  }), t.__c.__H = null), (t = $l({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c = null), t.__k = t.__k && t.__k.map(function(i) {
    return Us(i, e, n);
  })), t;
}
function Fs(t, e, n) {
  return t && (t.__v = null, t.__k = t.__k && t.__k.map(function(i) {
    return Fs(i, e, n);
  }), t.__c && t.__c.__P === e && (t.__e && n.insertBefore(t.__e, t.__d), t.__c.__e = !0, t.__c.__P = n)), t;
}
function vn() {
  this.__u = 0, this.t = null, this.__b = null;
}
function js(t) {
  var e = t.__.__c;
  return e && e.__a && e.__a(t);
}
function bt() {
  this.u = null, this.o = null;
}
S.unmount = function(t) {
  var e = t.__c;
  e && e.__R && e.__R(), e && t.__h === !0 && (t.type = null), fr && fr(t);
}, (vn.prototype = new W()).__c = function(t, e) {
  var n = e.__c, i = this;
  i.t == null && (i.t = []), i.t.push(n);
  var r = js(i.__v), s = !1, o = function() {
    s || (s = !0, n.__R = null, r ? r(a) : a());
  };
  n.__R = o;
  var a = function() {
    if (!--i.__u) {
      if (i.state.__a) {
        var d = i.state.__a;
        i.__v.__k[0] = Fs(d, d.__c.__P, d.__c.__O);
      }
      var c;
      for (i.setState({ __a: i.__b = null }); c = i.t.pop(); ) c.forceUpdate();
    }
  }, l = e.__h === !0;
  i.__u++ || l || i.setState({ __a: i.__b = i.__v.__k[0] }), t.then(o, o);
}, vn.prototype.componentWillUnmount = function() {
  this.t = [];
}, vn.prototype.render = function(t, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), i = this.__v.__k[0].__c;
      this.__v.__k[0] = Us(this.__b, n, i.__O = i.__P);
    }
    this.__b = null;
  }
  var r = e.__a && p(k, null, t.fallback);
  return r && (r.__h = null), [p(k, null, e.__a ? null : t.children), r];
};
var hr = function(t, e, n) {
  if (++n[1] === n[0] && t.o.delete(e), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.o.size)) for (n = t.u; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    t.u = n = n[2];
  }
};
function Hl(t) {
  return this.getChildContext = function() {
    return t.context;
  }, t.children;
}
function zl(t) {
  var e = this, n = t.i;
  e.componentWillUnmount = function() {
    ht(null, e.l), e.l = null, e.i = null;
  }, e.i && e.i !== n && e.componentWillUnmount(), t.__v ? (e.l || (e.i = n, e.l = { nodeType: 1, parentNode: n, childNodes: [], appendChild: function(i) {
    this.childNodes.push(i), e.i.appendChild(i);
  }, insertBefore: function(i, r) {
    this.childNodes.push(i), e.i.appendChild(i);
  }, removeChild: function(i) {
    this.childNodes.splice(this.childNodes.indexOf(i) >>> 1, 1), e.i.removeChild(i);
  } }), ht(p(Hl, { context: e.context }, t.__v), e.l)) : e.l && e.componentWillUnmount();
}
function Bl(t, e) {
  var n = p(zl, { __v: t, i: e });
  return n.containerInfo = e, n;
}
(bt.prototype = new W()).__a = function(t) {
  var e = this, n = js(e.__v), i = e.o.get(t);
  return i[0]++, function(r) {
    var s = function() {
      e.props.revealOrder ? (i.push(r), hr(e, t, i)) : r();
    };
    n ? n(s) : s();
  };
}, bt.prototype.render = function(t) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var e = Bt(t.children);
  t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
  for (var n = e.length; n--; ) this.o.set(e[n], this.u = [1, 0, this.u]);
  return t.children;
}, bt.prototype.componentDidUpdate = bt.prototype.componentDidMount = function() {
  var t = this;
  this.o.forEach(function(e, n) {
    hr(t, n, e);
  });
};
var Ll = typeof Symbol < "u" && Symbol.for && /* @__PURE__ */ Symbol.for("react.element") || 60103, Ul = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Fl = typeof document < "u", jl = function(t) {
  return (typeof Symbol < "u" && typeof /* @__PURE__ */ Symbol() == "symbol" ? /fil|che|rad/i : /fil|che|ra/i).test(t);
};
W.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
  Object.defineProperty(W.prototype, t, { configurable: !0, get: function() {
    return this["UNSAFE_" + t];
  }, set: function(e) {
    Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
  } });
});
var pr = S.event;
function Wl() {
}
function Vl() {
  return this.cancelBubble;
}
function Gl() {
  return this.defaultPrevented;
}
S.event = function(t) {
  return pr && (t = pr(t)), t.persist = Wl, t.isPropagationStopped = Vl, t.isDefaultPrevented = Gl, t.nativeEvent = t;
};
var gr = { configurable: !0, get: function() {
  return this.class;
} }, mr = S.vnode;
S.vnode = function(t) {
  var e = t.type, n = t.props, i = n;
  if (typeof e == "string") {
    var r = e.indexOf("-") === -1;
    for (var s in i = {}, n) {
      var o = n[s];
      Fl && s === "children" && e === "noscript" || s === "value" && "defaultValue" in n && o == null || (s === "defaultValue" && "value" in n && n.value == null ? s = "value" : s === "download" && o === !0 ? o = "" : /ondoubleclick/i.test(s) ? s = "ondblclick" : /^onchange(textarea|input)/i.test(s + e) && !jl(n.type) ? s = "oninput" : /^onfocus$/i.test(s) ? s = "onfocusin" : /^onblur$/i.test(s) ? s = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(s) ? s = s.toLowerCase() : r && Ul.test(s) ? s = s.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : o === null && (o = void 0), /^oninput$/i.test(s) && (s = s.toLowerCase(), i[s] && (s = "oninputCapture")), i[s] = o);
    }
    e == "select" && i.multiple && Array.isArray(i.value) && (i.value = Bt(n.children).forEach(function(a) {
      a.props.selected = i.value.indexOf(a.props.value) != -1;
    })), e == "select" && i.defaultValue != null && (i.value = Bt(n.children).forEach(function(a) {
      a.props.selected = i.multiple ? i.defaultValue.indexOf(a.props.value) != -1 : i.defaultValue == a.props.value;
    })), t.props = i, n.class != n.className && (gr.enumerable = "className" in n, n.className != null && (i.class = n.className), Object.defineProperty(i, "className", gr));
  }
  t.$$typeof = Ll, mr && mr(t);
};
var vr = S.__r;
S.__r = function(t) {
  vr && vr(t), t.__c;
};
const Ws = [], zn = /* @__PURE__ */ new Map();
function li(t) {
  Ws.push(t), zn.forEach((e) => {
    Gs(e, t);
  });
}
function ql(t) {
  t.isConnected && // sometimes true if SSR system simulates DOM
  t.getRootNode && Vs(t.getRootNode());
}
function Vs(t) {
  let e = zn.get(t);
  if (!e || !e.isConnected) {
    if (e = t.querySelector("style[data-fullcalendar]"), !e) {
      e = document.createElement("style"), e.setAttribute("data-fullcalendar", "");
      const n = Ql();
      n && (e.nonce = n);
      const i = t === document ? document.head : t, r = t === document ? i.querySelector("script,link[rel=stylesheet],link[as=style],style") : i.firstChild;
      i.insertBefore(e, r);
    }
    zn.set(t, e), Yl(e);
  }
}
function Yl(t) {
  for (const e of Ws)
    Gs(t, e);
}
function Gs(t, e) {
  const { sheet: n } = t, i = n.cssRules.length;
  e.split("}").forEach((r, s) => {
    r = r.trim(), r && n.insertRule(r + "}", i + s);
  });
}
let bn;
function Ql() {
  return bn === void 0 && (bn = Zl()), bn;
}
function Zl() {
  const t = document.querySelector('meta[name="csp-nonce"]');
  if (t && t.hasAttribute("content"))
    return t.getAttribute("content");
  const e = document.querySelector("script[nonce]");
  return e && e.nonce || "";
}
typeof document < "u" && Vs(document);
var Kl = ':root{--fc-small-font-size:.85em;--fc-page-bg-color:#fff;--fc-neutral-bg-color:hsla(0,0%,82%,.3);--fc-neutral-text-color:grey;--fc-border-color:#ddd;--fc-button-text-color:#fff;--fc-button-bg-color:#2c3e50;--fc-button-border-color:#2c3e50;--fc-button-hover-bg-color:#1e2b37;--fc-button-hover-border-color:#1a252f;--fc-button-active-bg-color:#1a252f;--fc-button-active-border-color:#151e27;--fc-event-bg-color:#3788d8;--fc-event-border-color:#3788d8;--fc-event-text-color:#fff;--fc-event-selected-overlay-color:rgba(0,0,0,.25);--fc-more-link-bg-color:#d0d0d0;--fc-more-link-text-color:inherit;--fc-event-resizer-thickness:8px;--fc-event-resizer-dot-total-width:8px;--fc-event-resizer-dot-border-width:1px;--fc-non-business-color:hsla(0,0%,84%,.3);--fc-bg-event-color:#8fdf82;--fc-bg-event-opacity:0.3;--fc-highlight-color:rgba(188,232,241,.3);--fc-today-bg-color:rgba(255,220,40,.15);--fc-now-indicator-color:red}.fc-not-allowed,.fc-not-allowed .fc-event{cursor:not-allowed}.fc{display:flex;flex-direction:column;font-size:1em}.fc,.fc *,.fc :after,.fc :before{box-sizing:border-box}.fc table{border-collapse:collapse;border-spacing:0;font-size:1em}.fc th{text-align:center}.fc td,.fc th{padding:0;vertical-align:top}.fc a[data-navlink]{cursor:pointer}.fc a[data-navlink]:hover{text-decoration:underline}.fc-direction-ltr{direction:ltr;text-align:left}.fc-direction-rtl{direction:rtl;text-align:right}.fc-theme-standard td,.fc-theme-standard th{border:1px solid var(--fc-border-color)}.fc-liquid-hack td,.fc-liquid-hack th{position:relative}@font-face{font-family:fcicons;font-style:normal;font-weight:400;src:url("data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBfAAAAC8AAAAYGNtYXAXVtKNAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZgYydxIAAAF4AAAFNGhlYWQUJ7cIAAAGrAAAADZoaGVhB20DzAAABuQAAAAkaG10eCIABhQAAAcIAAAALGxvY2ED4AU6AAAHNAAAABhtYXhwAA8AjAAAB0wAAAAgbmFtZXsr690AAAdsAAABhnBvc3QAAwAAAAAI9AAAACAAAwPAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpBgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6Qb//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAWIAjQKeAskAEwAAJSc3NjQnJiIHAQYUFwEWMjc2NCcCnuLiDQ0MJAz/AA0NAQAMJAwNDcni4gwjDQwM/wANIwz/AA0NDCMNAAAAAQFiAI0CngLJABMAACUBNjQnASYiBwYUHwEHBhQXFjI3AZ4BAA0N/wAMJAwNDeLiDQ0MJAyNAQAMIw0BAAwMDSMM4uINIwwNDQAAAAIA4gC3Ax4CngATACcAACUnNzY0JyYiDwEGFB8BFjI3NjQnISc3NjQnJiIPAQYUHwEWMjc2NCcB87e3DQ0MIw3VDQ3VDSMMDQ0BK7e3DQ0MJAzVDQ3VDCQMDQ3zuLcMJAwNDdUNIwzWDAwNIwy4twwkDA0N1Q0jDNYMDA0jDAAAAgDiALcDHgKeABMAJwAAJTc2NC8BJiIHBhQfAQcGFBcWMjchNzY0LwEmIgcGFB8BBwYUFxYyNwJJ1Q0N1Q0jDA0Nt7cNDQwjDf7V1Q0N1QwkDA0Nt7cNDQwkDLfWDCMN1Q0NDCQMt7gMIw0MDNYMIw3VDQ0MJAy3uAwjDQwMAAADAFUAAAOrA1UAMwBoAHcAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMhMjY1NCYjISIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAAVYRGRkR/qoRGRkRA1UFBAUOCQkVDAsZDf2rDRkLDBUJCA4FBQUFBQUOCQgVDAsZDQJVDRkLDBUJCQ4FBAVVAgECBQMCBwQECAX9qwQJAwQHAwMFAQICAgIBBQMDBwQDCQQCVQUIBAQHAgMFAgEC/oAZEhEZGRESGQAAAAADAFUAAAOrA1UAMwBoAIkAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMzFRQWMzI2PQEzMjY1NCYrATU0JiMiBh0BIyIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAgBkSEhmAERkZEYAZEhIZgBEZGREDVQUEBQ4JCRUMCxkN/asNGQsMFQkIDgUFBQUFBQ4JCBUMCxkNAlUNGQsMFQkJDgUEBVUCAQIFAwIHBAQIBf2rBAkDBAcDAwUBAgICAgEFAwMHBAMJBAJVBQgEBAcCAwUCAQL+gIASGRkSgBkSERmAEhkZEoAZERIZAAABAOIAjQMeAskAIAAAExcHBhQXFjI/ARcWMjc2NC8BNzY0JyYiDwEnJiIHBhQX4uLiDQ0MJAzi4gwkDA0N4uINDQwkDOLiDCQMDQ0CjeLiDSMMDQ3h4Q0NDCMN4uIMIw0MDOLiDAwNIwwAAAABAAAAAQAAa5n0y18PPPUACwQAAAAAANivOVsAAAAA2K85WwAAAAADqwNVAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAOrAAEAAAAAAAAAAAAAAAAAAAALBAAAAAAAAAAAAAAAAgAAAAQAAWIEAAFiBAAA4gQAAOIEAABVBAAAVQQAAOIAAAAAAAoAFAAeAEQAagCqAOoBngJkApoAAQAAAAsAigADAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGZjaWNvbnMAZgBjAGkAYwBvAG4Ac1ZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGZjaWNvbnMAZgBjAGkAYwBvAG4Ac2ZjaWNvbnMAZgBjAGkAYwBvAG4Ac1JlZ3VsYXIAUgBlAGcAdQBsAGEAcmZjaWNvbnMAZgBjAGkAYwBvAG4Ac0ZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=") format("truetype")}.fc-icon{speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:inline-block;font-family:fcicons!important;font-style:normal;font-variant:normal;font-weight:400;height:1em;line-height:1;text-align:center;text-transform:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:1em}.fc-icon-chevron-left:before{content:"\\e900"}.fc-icon-chevron-right:before{content:"\\e901"}.fc-icon-chevrons-left:before{content:"\\e902"}.fc-icon-chevrons-right:before{content:"\\e903"}.fc-icon-minus-square:before{content:"\\e904"}.fc-icon-plus-square:before{content:"\\e905"}.fc-icon-x:before{content:"\\e906"}.fc .fc-button{border-radius:0;font-family:inherit;font-size:inherit;line-height:inherit;margin:0;overflow:visible;text-transform:none}.fc .fc-button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}.fc .fc-button{-webkit-appearance:button}.fc .fc-button:not(:disabled){cursor:pointer}.fc .fc-button{background-color:transparent;border:1px solid transparent;border-radius:.25em;display:inline-block;font-size:1em;font-weight:400;line-height:1.5;padding:.4em .65em;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle}.fc .fc-button:hover{text-decoration:none}.fc .fc-button:focus{box-shadow:0 0 0 .2rem rgba(44,62,80,.25);outline:0}.fc .fc-button:disabled{opacity:.65}.fc .fc-button-primary{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:hover{background-color:var(--fc-button-hover-bg-color);border-color:var(--fc-button-hover-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:disabled{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button-primary:not(:disabled).fc-button-active,.fc .fc-button-primary:not(:disabled):active{background-color:var(--fc-button-active-bg-color);border-color:var(--fc-button-active-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:not(:disabled).fc-button-active:focus,.fc .fc-button-primary:not(:disabled):active:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button .fc-icon{font-size:1.5em;vertical-align:middle}.fc .fc-button-group{display:inline-flex;position:relative;vertical-align:middle}.fc .fc-button-group>.fc-button{flex:1 1 auto;position:relative}.fc .fc-button-group>.fc-button.fc-button-active,.fc .fc-button-group>.fc-button:active,.fc .fc-button-group>.fc-button:focus,.fc .fc-button-group>.fc-button:hover{z-index:1}.fc-direction-ltr .fc-button-group>.fc-button:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0;margin-left:-1px}.fc-direction-ltr .fc-button-group>.fc-button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.fc-direction-rtl .fc-button-group>.fc-button:not(:first-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.fc-direction-rtl .fc-button-group>.fc-button:not(:last-child){border-bottom-left-radius:0;border-top-left-radius:0}.fc .fc-toolbar{align-items:center;display:flex;justify-content:space-between}.fc .fc-toolbar.fc-header-toolbar{margin-bottom:1.5em}.fc .fc-toolbar.fc-footer-toolbar{margin-top:1.5em}.fc .fc-toolbar-title{font-size:1.75em;margin:0}.fc-direction-ltr .fc-toolbar>*>:not(:first-child){margin-left:.75em}.fc-direction-rtl .fc-toolbar>*>:not(:first-child){margin-right:.75em}.fc-direction-rtl .fc-toolbar-ltr{flex-direction:row-reverse}.fc .fc-scroller{-webkit-overflow-scrolling:touch;position:relative}.fc .fc-scroller-liquid{height:100%}.fc .fc-scroller-liquid-absolute{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-scroller-harness{direction:ltr;overflow:hidden;position:relative}.fc .fc-scroller-harness-liquid{height:100%}.fc-direction-rtl .fc-scroller-harness>.fc-scroller{direction:rtl}.fc-theme-standard .fc-scrollgrid{border:1px solid var(--fc-border-color)}.fc .fc-scrollgrid,.fc .fc-scrollgrid table{table-layout:fixed;width:100%}.fc .fc-scrollgrid table{border-left-style:hidden;border-right-style:hidden;border-top-style:hidden}.fc .fc-scrollgrid{border-bottom-width:0;border-collapse:separate;border-right-width:0}.fc .fc-scrollgrid-liquid{height:100%}.fc .fc-scrollgrid-section,.fc .fc-scrollgrid-section table,.fc .fc-scrollgrid-section>td{height:1px}.fc .fc-scrollgrid-section-liquid>td{height:100%}.fc .fc-scrollgrid-section>*{border-left-width:0;border-top-width:0}.fc .fc-scrollgrid-section-footer>*,.fc .fc-scrollgrid-section-header>*{border-bottom-width:0}.fc .fc-scrollgrid-section-body table,.fc .fc-scrollgrid-section-footer table{border-bottom-style:hidden}.fc .fc-scrollgrid-section-sticky>*{background:var(--fc-page-bg-color);position:sticky;z-index:3}.fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky>*{top:0}.fc .fc-scrollgrid-section-footer.fc-scrollgrid-section-sticky>*{bottom:0}.fc .fc-scrollgrid-sticky-shim{height:1px;margin-bottom:-1px}.fc-sticky{position:sticky}.fc .fc-view-harness{flex-grow:1;position:relative}.fc .fc-view-harness-active>.fc-view{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-col-header-cell-cushion{display:inline-block;padding:2px 4px}.fc .fc-bg-event,.fc .fc-highlight,.fc .fc-non-business{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-non-business{background:var(--fc-non-business-color)}.fc .fc-bg-event{background:var(--fc-bg-event-color);opacity:var(--fc-bg-event-opacity)}.fc .fc-bg-event .fc-event-title{font-size:var(--fc-small-font-size);font-style:italic;margin:.5em}.fc .fc-highlight{background:var(--fc-highlight-color)}.fc .fc-cell-shaded,.fc .fc-day-disabled{background:var(--fc-neutral-bg-color)}a.fc-event,a.fc-event:hover{text-decoration:none}.fc-event.fc-event-draggable,.fc-event[href]{cursor:pointer}.fc-event .fc-event-main{position:relative;z-index:2}.fc-event-dragging:not(.fc-event-selected){opacity:.75}.fc-event-dragging.fc-event-selected{box-shadow:0 2px 7px rgba(0,0,0,.3)}.fc-event .fc-event-resizer{display:none;position:absolute;z-index:4}.fc-event-selected .fc-event-resizer,.fc-event:hover .fc-event-resizer{display:block}.fc-event-selected .fc-event-resizer{background:var(--fc-page-bg-color);border-color:inherit;border-radius:calc(var(--fc-event-resizer-dot-total-width)/2);border-style:solid;border-width:var(--fc-event-resizer-dot-border-width);height:var(--fc-event-resizer-dot-total-width);width:var(--fc-event-resizer-dot-total-width)}.fc-event-selected .fc-event-resizer:before{bottom:-20px;content:"";left:-20px;position:absolute;right:-20px;top:-20px}.fc-event-selected,.fc-event:focus{box-shadow:0 2px 5px rgba(0,0,0,.2)}.fc-event-selected:before,.fc-event:focus:before{bottom:0;content:"";left:0;position:absolute;right:0;top:0;z-index:3}.fc-event-selected:after,.fc-event:focus:after{background:var(--fc-event-selected-overlay-color);bottom:-1px;content:"";left:-1px;position:absolute;right:-1px;top:-1px;z-index:1}.fc-h-event{background-color:var(--fc-event-bg-color);border:1px solid var(--fc-event-border-color);display:block}.fc-h-event .fc-event-main{color:var(--fc-event-text-color)}.fc-h-event .fc-event-main-frame{display:flex}.fc-h-event .fc-event-time{max-width:100%;overflow:hidden}.fc-h-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-width:0}.fc-h-event .fc-event-title{display:inline-block;left:0;max-width:100%;overflow:hidden;right:0;vertical-align:top}.fc-h-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-start),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-end){border-bottom-left-radius:0;border-left-width:0;border-top-left-radius:0}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-end),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-start){border-bottom-right-radius:0;border-right-width:0;border-top-right-radius:0}.fc-h-event:not(.fc-event-selected) .fc-event-resizer{bottom:0;top:0;width:var(--fc-event-resizer-thickness)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end{cursor:w-resize;left:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start{cursor:e-resize;right:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-h-event.fc-event-selected .fc-event-resizer{margin-top:calc(var(--fc-event-resizer-dot-total-width)*-.5);top:50%}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-start,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-end{left:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-end,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-start{right:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc .fc-popover{box-shadow:0 2px 6px rgba(0,0,0,.15);position:absolute;z-index:9999}.fc .fc-popover-header{align-items:center;display:flex;flex-direction:row;justify-content:space-between;padding:3px 4px}.fc .fc-popover-title{margin:0 2px}.fc .fc-popover-close{cursor:pointer;font-size:1.1em;opacity:.65}.fc-theme-standard .fc-popover{background:var(--fc-page-bg-color);border:1px solid var(--fc-border-color)}.fc-theme-standard .fc-popover-header{background:var(--fc-neutral-bg-color)}';
li(Kl);
class ci {
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
    let { pauseDepths: i } = this;
    e in i && (n ? delete i[e] : (i[e] -= 1, i[e] <= 0 && delete i[e]), this.tryDrain());
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
function di(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function B(t, e) {
  if (t.closest)
    return t.closest(e);
  if (!document.documentElement.contains(t))
    return null;
  do {
    if (Xl(t, e))
      return t;
    t = t.parentElement || t.parentNode;
  } while (t !== null && t.nodeType === 1);
  return null;
}
function Xl(t, e) {
  return (t.matches || t.matchesSelector || t.msMatchesSelector).call(t, e);
}
function Jl(t, e) {
  let n = t instanceof HTMLElement ? [t] : t, i = [];
  for (let r = 0; r < n.length; r += 1) {
    let s = n[r].querySelectorAll(e);
    for (let o = 0; o < s.length; o += 1)
      i.push(s[o]);
  }
  return i;
}
const ec = /(top|left|right|bottom|width|height)$/i;
function ot(t, e) {
  for (let n in e)
    qs(t, n, e[n]);
}
function qs(t, e, n) {
  n == null ? t.style[e] = "" : typeof n == "number" && ec.test(e) ? t.style[e] = `${n}px` : t.style[e] = n;
}
function Ys(t) {
  var e, n;
  return (n = (e = t.composedPath) === null || e === void 0 ? void 0 : e.call(t)[0]) !== null && n !== void 0 ? n : t.target;
}
let br = 0;
function an() {
  return br += 1, "fc-dom-" + br;
}
function ln(t) {
  t.preventDefault();
}
function tc(t, e) {
  return (n) => {
    let i = B(n.target, t);
    i && e.call(i, n, i);
  };
}
function Qs(t, e, n, i) {
  let r = tc(n, i);
  return t.addEventListener(e, r), () => {
    t.removeEventListener(e, r);
  };
}
function nc(t, e, n, i) {
  let r;
  return Qs(t, "mouseover", e, (s, o) => {
    if (o !== r) {
      r = o, n(s, o);
      let a = (l) => {
        r = null, i(l, o), o.removeEventListener("mouseleave", a);
      };
      o.addEventListener("mouseleave", a);
    }
  });
}
const yr = [
  "webkitTransitionEnd",
  "otransitionend",
  "oTransitionEnd",
  "msTransitionEnd",
  "transitionend"
];
function ic(t, e) {
  let n = (i) => {
    e(i), yr.forEach((r) => {
      t.removeEventListener(r, n);
    });
  };
  yr.forEach((i) => {
    t.addEventListener(i, n);
  });
}
function Zs(t) {
  return Object.assign({ onClick: t }, Ks(t));
}
function Ks(t) {
  return {
    tabIndex: 0,
    onKeyDown(e) {
      (e.key === "Enter" || e.key === " ") && (t(e), e.preventDefault());
    }
  };
}
let Er = 0;
function Ne() {
  return Er += 1, String(Er);
}
function ui() {
  document.body.classList.add("fc-not-allowed");
}
function fi() {
  document.body.classList.remove("fc-not-allowed");
}
function rc(t) {
  t.style.userSelect = "none", t.style.webkitUserSelect = "none", t.addEventListener("selectstart", ln);
}
function sc(t) {
  t.style.userSelect = "", t.style.webkitUserSelect = "", t.removeEventListener("selectstart", ln);
}
function oc(t) {
  t.addEventListener("contextmenu", ln);
}
function ac(t) {
  t.removeEventListener("contextmenu", ln);
}
function lc(t) {
  let e = [], n = [], i, r;
  for (typeof t == "string" ? n = t.split(/\s*,\s*/) : typeof t == "function" ? n = [t] : Array.isArray(t) && (n = t), i = 0; i < n.length; i += 1)
    r = n[i], typeof r == "string" ? e.push(r.charAt(0) === "-" ? { field: r.substring(1), order: -1 } : { field: r, order: 1 }) : typeof r == "function" && e.push({ func: r });
  return e;
}
function cc(t, e, n) {
  let i, r;
  for (i = 0; i < n.length; i += 1)
    if (r = dc(t, e, n[i]), r)
      return r;
  return 0;
}
function dc(t, e, n) {
  return n.func ? n.func(t, e) : uc(t[n.field], e[n.field]) * (n.order || 1);
}
function uc(t, e) {
  return !t && !e ? 0 : e == null ? -1 : t == null ? 1 : typeof t == "string" || typeof e == "string" ? String(t).localeCompare(String(e)) : t - e;
}
function Le(t, e) {
  let n = String(t);
  return "000".substr(0, e - n.length) + n;
}
function at(t, e, n) {
  return typeof t == "function" ? t(...e) : typeof t == "string" ? e.reduce((i, r, s) => i.replace("$" + s, r || ""), t) : n;
}
function fc(t, e) {
  return t - e;
}
function kt(t) {
  return t % 1 === 0;
}
function hc(t) {
  let e = t.querySelector(".fc-scrollgrid-shrink-frame"), n = t.querySelector(".fc-scrollgrid-shrink-cushion");
  if (!e)
    throw new Error("needs fc-scrollgrid-shrink-frame className");
  if (!n)
    throw new Error("needs fc-scrollgrid-shrink-cushion className");
  return t.getBoundingClientRect().width - e.getBoundingClientRect().width + // the cell padding+border
  n.getBoundingClientRect().width;
}
const wr = ["years", "months", "days", "milliseconds"], pc = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
function x(t, e) {
  return typeof t == "string" ? gc(t) : typeof t == "object" && t ? Sr(t) : typeof t == "number" ? Sr({ [e || "milliseconds"]: t }) : null;
}
function gc(t) {
  let e = pc.exec(t);
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
function Sr(t) {
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
function mc(t, e) {
  return t.years === e.years && t.months === e.months && t.days === e.days && t.milliseconds === e.milliseconds;
}
function Bn(t, e) {
  return {
    years: t.years + e.years,
    months: t.months + e.months,
    days: t.days + e.days,
    milliseconds: t.milliseconds + e.milliseconds
  };
}
function vc(t, e) {
  return {
    years: t.years - e.years,
    months: t.months - e.months,
    days: t.days - e.days,
    milliseconds: t.milliseconds - e.milliseconds
  };
}
function bc(t, e) {
  return {
    years: t.years * e,
    months: t.months * e,
    days: t.days * e,
    milliseconds: t.milliseconds * e
  };
}
function yc(t) {
  return Ue(t) / 365;
}
function Ec(t) {
  return Ue(t) / 30;
}
function Ue(t) {
  return Q(t) / 864e5;
}
function Q(t) {
  return t.years * (365 * 864e5) + t.months * (30 * 864e5) + t.days * 864e5 + t.milliseconds;
}
function hi(t, e) {
  let n = null;
  for (let i = 0; i < wr.length; i += 1) {
    let r = wr[i];
    if (e[r]) {
      let s = t[r] / e[r];
      if (!kt(s) || n !== null && n !== s)
        return null;
      n = s;
    } else if (t[r])
      return null;
  }
  return n;
}
function Ln(t) {
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
function me(t, e, n) {
  if (t === e)
    return !0;
  let i = t.length, r;
  if (i !== e.length)
    return !1;
  for (r = 0; r < i; r += 1)
    if (!(n ? n(t[r], e[r]) : t[r] === e[r]))
      return !1;
  return !0;
}
const wc = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
function Ar(t, e) {
  let n = he(t);
  return n[2] += e * 7, U(n);
}
function z(t, e) {
  let n = he(t);
  return n[2] += e, U(n);
}
function ve(t, e) {
  let n = he(t);
  return n[6] += e, U(n);
}
function Sc(t, e) {
  return Oe(t, e) / 7;
}
function Oe(t, e) {
  return (e.valueOf() - t.valueOf()) / (1e3 * 60 * 60 * 24);
}
function Ac(t, e) {
  return (e.valueOf() - t.valueOf()) / (1e3 * 60 * 60);
}
function Dc(t, e) {
  return (e.valueOf() - t.valueOf()) / (1e3 * 60);
}
function Cc(t, e) {
  return (e.valueOf() - t.valueOf()) / 1e3;
}
function xc(t, e) {
  let n = M(t), i = M(e);
  return {
    years: 0,
    months: 0,
    days: Math.round(Oe(n, i)),
    milliseconds: e.valueOf() - i.valueOf() - (t.valueOf() - n.valueOf())
  };
}
function _c(t, e) {
  let n = Lt(t, e);
  return n !== null && n % 7 === 0 ? n / 7 : null;
}
function Lt(t, e) {
  return pe(t) === pe(e) ? Math.round(Oe(t, e)) : null;
}
function M(t) {
  return U([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ]);
}
function Rc(t) {
  return U([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours()
  ]);
}
function Tc(t) {
  return U([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours(),
    t.getUTCMinutes()
  ]);
}
function kc(t) {
  return U([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours(),
    t.getUTCMinutes(),
    t.getUTCSeconds()
  ]);
}
function Mc(t, e, n) {
  let i = t.getUTCFullYear(), r = yn(t, i, e, n);
  if (r < 1)
    return yn(t, i - 1, e, n);
  let s = yn(t, i + 1, e, n);
  return s >= 1 ? Math.min(r, s) : r;
}
function yn(t, e, n, i) {
  let r = U([e, 0, 1 + Ic(e, n, i)]), s = M(t), o = Math.round(Oe(r, s));
  return Math.floor(o / 7) + 1;
}
function Ic(t, e, n) {
  let i = 7 + e - n;
  return -((7 + U([t, 0, i]).getUTCDay() - e) % 7) + i - 1;
}
function Dr(t) {
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
function Cr(t) {
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
function he(t) {
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
function Xs(t) {
  return !isNaN(t.valueOf());
}
function pe(t) {
  return t.getUTCHours() * 1e3 * 60 * 60 + t.getUTCMinutes() * 1e3 * 60 + t.getUTCSeconds() * 1e3 + t.getUTCMilliseconds();
}
function Js(t, e, n = !1) {
  let i = t.toISOString();
  return i = i.replace(".000", ""), n && (i = i.replace("T00:00:00Z", "")), i.length > 10 && (e == null ? i = i.replace("Z", "") : e !== 0 && (i = i.replace("Z", gi(e, !0)))), i;
}
function pi(t) {
  return t.toISOString().replace(/T.*$/, "");
}
function Nc(t) {
  return t.toISOString().match(/^\d{4}-\d{2}/)[0];
}
function Oc(t) {
  return Le(t.getUTCHours(), 2) + ":" + Le(t.getUTCMinutes(), 2) + ":" + Le(t.getUTCSeconds(), 2);
}
function gi(t, e = !1) {
  let n = t < 0 ? "-" : "+", i = Math.abs(t), r = Math.floor(i / 60), s = Math.round(i % 60);
  return e ? `${n + Le(r, 2)}:${Le(s, 2)}` : `GMT${n}${r}${s ? `:${Le(s, 2)}` : ""}`;
}
function A(t, e, n) {
  let i, r;
  return function(...s) {
    if (!i)
      r = t.apply(this, s);
    else if (!me(i, s)) {
      let o = t.apply(this, s);
      (!e || !e(o, r)) && (r = o);
    }
    return i = s, r;
  };
}
function Mt(t, e, n) {
  let i, r;
  return (s) => (i ? Z(i, s) || (r = t.call(this, s)) : r = t.call(this, s), i = s, r);
}
const En = {
  week: 3,
  separator: 9,
  omitZeroMinute: 9,
  meridiem: 9,
  omitCommas: 9
}, Ut = {
  timeZoneName: 7,
  era: 6,
  year: 5,
  month: 4,
  day: 2,
  weekday: 2,
  hour: 1,
  minute: 1,
  second: 1
}, yt = /\s*([ap])\.?m\.?/i, $c = /,/g, Pc = /\s+/g, Hc = /\u200e/g, zc = /UTC|GMT/;
class Bc {
  constructor(e) {
    let n = {}, i = {}, r = 9;
    for (let s in e)
      s in En ? (i[s] = e[s], En[s] < 9 && (r = Math.min(En[s], r))) : (n[s] = e[s], s in Ut && (r = Math.min(Ut[s], r)));
    this.standardDateProps = n, this.extendedSettings = i, this.smallestUnitNum = r, this.buildFormattingFunc = A(xr);
  }
  format(e, n) {
    return this.buildFormattingFunc(this.standardDateProps, this.extendedSettings, n)(e);
  }
  formatRange(e, n, i, r) {
    let { standardDateProps: s, extendedSettings: o } = this, a = Vc(e.marker, n.marker, i.calendarSystem);
    if (!a)
      return this.format(e, i);
    let l = a;
    l > 1 && // the two dates are different in a way that's larger scale than time
    (s.year === "numeric" || s.year === "2-digit") && (s.month === "numeric" || s.month === "2-digit") && (s.day === "numeric" || s.day === "2-digit") && (l = 1);
    let d = this.format(e, i), c = this.format(n, i);
    if (d === c)
      return d;
    let h = Gc(s, l), f = xr(h, o, i), u = f(e), g = f(n), m = qc(d, u, c, g), b = o.separator || r || i.defaultSeparator || "";
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
function xr(t, e, n) {
  let i = Object.keys(t).length;
  return i === 1 && t.timeZoneName === "short" ? (r) => gi(r.timeZoneOffset) : i === 0 && e.week ? (r) => Wc(n.computeWeekNumber(r.marker), n.weekText, n.weekTextLong, n.locale, e.week) : Lc(t, e, n);
}
function Lc(t, e, n) {
  t = Object.assign({}, t), e = Object.assign({}, e), Uc(t, e), t.timeZone = "UTC";
  let i = new Intl.DateTimeFormat(n.locale.codes, t), r;
  if (e.omitZeroMinute) {
    let s = Object.assign({}, t);
    delete s.minute, r = new Intl.DateTimeFormat(n.locale.codes, s);
  }
  return (s) => {
    let { marker: o } = s, a;
    r && !o.getUTCMinutes() ? a = r : a = i;
    let l = a.format(o);
    return Fc(l, s, t, e, n);
  };
}
function Uc(t, e) {
  t.timeZoneName && (t.hour || (t.hour = "2-digit"), t.minute || (t.minute = "2-digit")), t.timeZoneName === "long" && (t.timeZoneName = "short"), e.omitZeroMinute && (t.second || t.millisecond) && delete e.omitZeroMinute;
}
function Fc(t, e, n, i, r) {
  return t = t.replace(Hc, ""), n.timeZoneName === "short" && (t = jc(t, r.timeZone === "UTC" || e.timeZoneOffset == null ? "UTC" : (
    // important to normalize for IE, which does "GMT"
    gi(e.timeZoneOffset)
  ))), i.omitCommas && (t = t.replace($c, "").trim()), i.omitZeroMinute && (t = t.replace(":00", "")), i.meridiem === !1 ? t = t.replace(yt, "").trim() : i.meridiem === "narrow" ? t = t.replace(yt, (s, o) => o.toLocaleLowerCase()) : i.meridiem === "short" ? t = t.replace(yt, (s, o) => `${o.toLocaleLowerCase()}m`) : i.meridiem === "lowercase" && (t = t.replace(yt, (s) => s.toLocaleLowerCase())), t = t.replace(Pc, " "), t = t.trim(), t;
}
function jc(t, e) {
  let n = !1;
  return t = t.replace(zc, () => (n = !0, e)), n || (t += ` ${e}`), t;
}
function Wc(t, e, n, i, r) {
  let s = [];
  return r === "long" ? s.push(n) : (r === "short" || r === "narrow") && s.push(e), (r === "long" || r === "short") && s.push(" "), s.push(i.simpleNumberFormat.format(t)), i.options.direction === "rtl" && s.reverse(), s.join("");
}
function Vc(t, e, n) {
  return n.getMarkerYear(t) !== n.getMarkerYear(e) ? 5 : n.getMarkerMonth(t) !== n.getMarkerMonth(e) ? 4 : n.getMarkerDay(t) !== n.getMarkerDay(e) ? 2 : pe(t) !== pe(e) ? 1 : 0;
}
function Gc(t, e) {
  let n = {};
  for (let i in t)
    (!(i in Ut) || // not a date part prop (like timeZone)
    Ut[i] <= e) && (n[i] = t[i]);
  return n;
}
function qc(t, e, n, i) {
  let r = 0;
  for (; r < t.length; ) {
    let s = t.indexOf(e, r);
    if (s === -1)
      break;
    let o = t.substr(0, s);
    r = s + e.length;
    let a = t.substr(r), l = 0;
    for (; l < n.length; ) {
      let d = n.indexOf(i, l);
      if (d === -1)
        break;
      let c = n.substr(0, d);
      l = d + i.length;
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
function _r(t, e) {
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
function Ft(t, e, n, i) {
  let r = _r(t, n.calendarSystem), s = e ? _r(e, n.calendarSystem) : null;
  return {
    date: r,
    start: r,
    end: s,
    timeZone: n.timeZone,
    localeCodes: n.locale.codes,
    defaultSeparator: i || n.defaultSeparator
  };
}
class Yc {
  constructor(e) {
    this.cmdStr = e;
  }
  format(e, n, i) {
    return n.cmdFormatter(this.cmdStr, Ft(e, null, n, i));
  }
  formatRange(e, n, i, r) {
    return i.cmdFormatter(this.cmdStr, Ft(e, n, i, r));
  }
}
class Qc {
  constructor(e) {
    this.func = e;
  }
  format(e, n, i) {
    return this.func(Ft(e, null, n, i));
  }
  formatRange(e, n, i, r) {
    return this.func(Ft(e, n, i, r));
  }
}
function O(t) {
  return typeof t == "object" && t ? new Bc(t) : typeof t == "string" ? new Yc(t) : typeof t == "function" ? new Qc(t) : null;
}
const Rr = {
  navLinkDayClick: v,
  navLinkWeekClick: v,
  duration: x,
  bootstrapFontAwesome: v,
  buttonIcons: v,
  customButtons: v,
  defaultAllDayEventDuration: x,
  defaultTimedEventDuration: x,
  nextDayThreshold: x,
  scrollTime: x,
  scrollTimeReset: Boolean,
  slotMinTime: x,
  slotMaxTime: x,
  dayPopoverFormat: O,
  slotDuration: x,
  snapDuration: x,
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
  eventOrder: lc,
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
  slotLabelInterval: x,
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
  dateIncrement: x,
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
}, lt = {
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
}, Tr = {
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
}, kr = {
  buttonText: v,
  buttonHints: v,
  views: v,
  plugins: v,
  initialEvents: v,
  events: v,
  eventSources: v
}, Ae = {
  headerToolbar: De,
  footerToolbar: De,
  buttonText: De,
  buttonHints: De,
  buttonIcons: De,
  dateIncrement: De,
  plugins: Et,
  events: Et,
  eventSources: Et,
  resources: Et
};
function De(t, e) {
  return typeof t == "object" && typeof e == "object" && t && e ? Z(t, e) : t === e;
}
function Et(t, e) {
  return Array.isArray(t) && Array.isArray(e) ? me(t, e) : t === e;
}
const Zc = {
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
function wn(t) {
  return vi(t, Ae);
}
function mi(t, e) {
  let n = {}, i = {};
  for (let r in e)
    r in t && (n[r] = e[r](t[r]));
  for (let r in t)
    r in e || (i[r] = t[r]);
  return { refined: n, extra: i };
}
function v(t) {
  return t;
}
const { hasOwnProperty: jt } = Object.prototype;
function vi(t, e) {
  let n = {};
  if (e) {
    for (let i in e)
      if (e[i] === De) {
        let r = [];
        for (let s = t.length - 1; s >= 0; s -= 1) {
          let o = t[s][i];
          if (typeof o == "object" && o)
            r.unshift(o);
          else if (o !== void 0) {
            n[i] = o;
            break;
          }
        }
        r.length && (n[i] = vi(r));
      }
  }
  for (let i = t.length - 1; i >= 0; i -= 1) {
    let r = t[i];
    for (let s in r)
      s in n || (n[s] = r[s]);
  }
  return n;
}
function ke(t, e) {
  let n = {};
  for (let i in t)
    e(t[i], i) && (n[i] = t[i]);
  return n;
}
function oe(t, e) {
  let n = {};
  for (let i in t)
    n[i] = e(t[i], i);
  return n;
}
function eo(t) {
  let e = {};
  for (let n of t)
    e[n] = !0;
  return e;
}
function bi(t) {
  let e = [];
  for (let n in t)
    e.push(t[n]);
  return e;
}
function Z(t, e) {
  if (t === e)
    return !0;
  for (let n in t)
    if (jt.call(t, n) && !(n in e))
      return !1;
  for (let n in e)
    if (jt.call(e, n) && t[n] !== e[n])
      return !1;
  return !0;
}
const Kc = /^on[A-Z]/;
function Xc(t, e) {
  const n = Jc(t, e);
  for (let i of n)
    if (!Kc.test(i))
      return !1;
  return !0;
}
function Jc(t, e) {
  let n = [];
  for (let i in t)
    jt.call(t, i) && (i in e || n.push(i));
  for (let i in e)
    jt.call(e, i) && t[i] !== e[i] && n.push(i);
  return n;
}
function Sn(t, e, n = {}) {
  if (t === e)
    return !0;
  for (let i in e)
    if (!(i in t && ed(t[i], e[i], n[i]))) return !1;
  for (let i in t)
    if (!(i in e))
      return !1;
  return !0;
}
function ed(t, e, n) {
  return t === e || n === !0 ? !0 : n ? n(t, e) : !1;
}
function td(t, e = 0, n, i = 1) {
  let r = [];
  n == null && (n = Object.keys(t).length);
  for (let s = e; s < n; s += i) {
    let o = t[s];
    o !== void 0 && r.push(o);
  }
  return r;
}
let to = {};
function nd(t, e) {
  to[t] = e;
}
function id(t) {
  return new to[t]();
}
class rd {
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
    return he(e);
  }
}
nd("gregory", rd);
const sd = /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;
function od(t) {
  let e = sd.exec(t);
  if (e) {
    let n = new Date(Date.UTC(Number(e[1]), e[3] ? Number(e[3]) - 1 : 0, Number(e[5] || 1), Number(e[7] || 0), Number(e[8] || 0), Number(e[10] || 0), e[12] ? +`0.${e[12]}` * 1e3 : 0));
    if (Xs(n)) {
      let i = null;
      return e[13] && (i = (e[15] === "-" ? -1 : 1) * (Number(e[16] || 0) * 60 + Number(e[18] || 0))), {
        marker: n,
        isTimeUnspecified: !e[6],
        timeZoneOffset: i
      };
    }
  }
  return null;
}
class ad {
  constructor(e) {
    let n = this.timeZone = e.timeZone, i = n !== "local" && n !== "UTC";
    e.namedTimeZoneImpl && i && (this.namedTimeZoneImpl = new e.namedTimeZoneImpl(n)), this.canComputeOffset = !!(!i || this.namedTimeZoneImpl), this.calendarSystem = id(e.calendarSystem), this.locale = e.locale, this.weekDow = e.locale.week.dow, this.weekDoy = e.locale.week.doy, e.weekNumberCalculation === "ISO" && (this.weekDow = 1, this.weekDoy = 4), typeof e.firstDay == "number" && (this.weekDow = e.firstDay), typeof e.weekNumberCalculation == "function" && (this.weekNumberFunc = e.weekNumberCalculation), this.weekText = e.weekText != null ? e.weekText : e.locale.options.weekText, this.weekTextLong = (e.weekTextLong != null ? e.weekTextLong : e.locale.options.weekTextLong) || this.weekText, this.cmdFormatter = e.cmdFormatter, this.defaultSeparator = e.defaultSeparator;
  }
  // Creating / Parsing
  createMarker(e) {
    let n = this.createMarkerMeta(e);
    return n === null ? null : n.marker;
  }
  createNowMarker() {
    return this.canComputeOffset ? this.timestampToMarker((/* @__PURE__ */ new Date()).valueOf()) : U(Dr(/* @__PURE__ */ new Date()));
  }
  createMarkerMeta(e) {
    if (typeof e == "string")
      return this.parse(e);
    let n = null;
    return typeof e == "number" ? n = this.timestampToMarker(e) : e instanceof Date ? (e = e.valueOf(), isNaN(e) || (n = this.timestampToMarker(e))) : Array.isArray(e) && (n = U(e)), n === null || !Xs(n) ? null : { marker: n, isTimeUnspecified: !1, forcedTzo: null };
  }
  parse(e) {
    let n = od(e);
    if (n === null)
      return null;
    let { marker: i } = n, r = null;
    return n.timeZoneOffset !== null && (this.canComputeOffset ? i = this.timestampToMarker(i.valueOf() - n.timeZoneOffset * 60 * 1e3) : r = n.timeZoneOffset), { marker: i, isTimeUnspecified: n.isTimeUnspecified, forcedTzo: r };
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
    let i = this.calendarSystem.markerToArray(e);
    return i[0] += n.years, i[1] += n.months, i[2] += n.days, i[6] += n.milliseconds, this.calendarSystem.arrayToMarker(i);
  }
  subtract(e, n) {
    let i = this.calendarSystem.markerToArray(e);
    return i[0] -= n.years, i[1] -= n.months, i[2] -= n.days, i[6] -= n.milliseconds, this.calendarSystem.arrayToMarker(i);
  }
  addYears(e, n) {
    let i = this.calendarSystem.markerToArray(e);
    return i[0] += n, this.calendarSystem.arrayToMarker(i);
  }
  addMonths(e, n) {
    let i = this.calendarSystem.markerToArray(e);
    return i[1] += n, this.calendarSystem.arrayToMarker(i);
  }
  // Diffing Whole Units
  diffWholeYears(e, n) {
    let { calendarSystem: i } = this;
    return pe(e) === pe(n) && i.getMarkerDay(e) === i.getMarkerDay(n) && i.getMarkerMonth(e) === i.getMarkerMonth(n) ? i.getMarkerYear(n) - i.getMarkerYear(e) : null;
  }
  diffWholeMonths(e, n) {
    let { calendarSystem: i } = this;
    return pe(e) === pe(n) && i.getMarkerDay(e) === i.getMarkerDay(n) ? i.getMarkerMonth(n) - i.getMarkerMonth(e) + (i.getMarkerYear(n) - i.getMarkerYear(e)) * 12 : null;
  }
  // Range / Duration
  greatestWholeUnit(e, n) {
    let i = this.diffWholeYears(e, n);
    return i !== null ? { unit: "year", value: i } : (i = this.diffWholeMonths(e, n), i !== null ? { unit: "month", value: i } : (i = _c(e, n), i !== null ? { unit: "week", value: i } : (i = Lt(e, n), i !== null ? { unit: "day", value: i } : (i = Ac(e, n), kt(i) ? { unit: "hour", value: i } : (i = Dc(e, n), kt(i) ? { unit: "minute", value: i } : (i = Cc(e, n), kt(i) ? { unit: "second", value: i } : { unit: "millisecond", value: n.valueOf() - e.valueOf() }))))));
  }
  countDurationsBetween(e, n, i) {
    let r;
    return i.years && (r = this.diffWholeYears(e, n), r !== null) ? r / yc(i) : i.months && (r = this.diffWholeMonths(e, n), r !== null) ? r / Ec(i) : i.days && (r = Lt(e, n), r !== null) ? r / Ue(i) : (n.valueOf() - e.valueOf()) / Q(i);
  }
  // Start-Of
  // these DON'T return zoned-dates. only UTC start-of dates
  startOf(e, n) {
    return n === "year" ? this.startOfYear(e) : n === "month" ? this.startOfMonth(e) : n === "week" ? this.startOfWeek(e) : n === "day" ? M(e) : n === "hour" ? Rc(e) : n === "minute" ? Tc(e) : n === "second" ? kc(e) : null;
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
    return this.weekNumberFunc ? this.weekNumberFunc(this.toDate(e)) : Mc(e, this.weekDow, this.weekDoy);
  }
  // TODO: choke on timeZoneName: long
  format(e, n, i = {}) {
    return n.format({
      marker: e,
      timeZoneOffset: i.forcedTzo != null ? i.forcedTzo : this.offsetForMarker(e)
    }, this);
  }
  formatRange(e, n, i, r = {}) {
    return r.isEndExclusive && (n = ve(n, -1)), i.formatRange({
      marker: e,
      timeZoneOffset: r.forcedStartTzo != null ? r.forcedStartTzo : this.offsetForMarker(e)
    }, {
      marker: n,
      timeZoneOffset: r.forcedEndTzo != null ? r.forcedEndTzo : this.offsetForMarker(n)
    }, this, r.defaultSeparator);
  }
  /*
  DUMB: the omitTime arg is dumb. if we omit the time, we want to omit the timezone offset. and if we do that,
  might as well use buildIsoString or some other util directly
  */
  formatIso(e, n = {}) {
    let i = null;
    return n.omitTimeZoneOffset || (n.forcedTzo != null ? i = n.forcedTzo : i = this.offsetForMarker(e)), Js(e, i, n.omitTime);
  }
  // TimeZone
  timestampToMarker(e) {
    return this.timeZone === "local" ? U(Dr(new Date(e))) : this.timeZone === "UTC" || !this.namedTimeZoneImpl ? new Date(e) : U(this.namedTimeZoneImpl.timestampToArray(e));
  }
  offsetForMarker(e) {
    return this.timeZone === "local" ? -Cr(he(e)).getTimezoneOffset() : this.timeZone === "UTC" ? 0 : this.namedTimeZoneImpl ? this.namedTimeZoneImpl.offsetForArray(he(e)) : null;
  }
  // Conversion
  toDate(e, n) {
    return this.timeZone === "local" ? Cr(he(e)) : this.timeZone === "UTC" ? new Date(e.valueOf()) : this.namedTimeZoneImpl ? new Date(e.valueOf() - this.namedTimeZoneImpl.offsetForArray(he(e)) * 1e3 * 60) : new Date(e.valueOf() - (n || 0));
  }
}
class gt {
  constructor(e) {
    this.iconOverrideOption && this.setIconOverride(e[this.iconOverrideOption]);
  }
  setIconOverride(e) {
    let n, i;
    if (typeof e == "object" && e) {
      n = Object.assign({}, this.iconClasses);
      for (i in e)
        n[i] = this.applyIconOverridePrefix(e[i]);
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
    let i;
    return n && this.rtlIconClasses ? i = this.rtlIconClasses[e] || this.iconClasses[e] : i = this.iconClasses[e], i ? `${this.baseIconClass} ${i}` : "";
  }
  getCustomButtonIconClass(e) {
    let n;
    return this.iconOverrideCustomButtonOption && (n = e[this.iconOverrideCustomButtonOption], n) ? `${this.baseIconClass} ${this.applyIconOverridePrefix(n)}` : "";
  }
}
gt.prototype.classes = {};
gt.prototype.iconClasses = {};
gt.prototype.baseIconClass = "";
gt.prototype.iconOverridePrefix = "";
function Wt(t) {
  t();
  let e = S.debounceRendering, n = [];
  function i(r) {
    n.push(r);
  }
  for (S.debounceRendering = i, ht(p(ld, {}), document.createElement("div")); n.length; )
    n.shift()();
  S.debounceRendering = e;
}
class ld extends W {
  render() {
    return p("div", {});
  }
  componentDidMount() {
    this.setState({});
  }
}
function no(t) {
  let e = Il(t), n = e.Provider;
  return e.Provider = function() {
    let i = !this.getChildContext, r = n.apply(this, arguments);
    if (i) {
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
    return r;
  }, e;
}
class cd {
  constructor(e, n, i, r) {
    this.execFunc = e, this.emitter = n, this.scrollTime = i, this.scrollTimeReset = r, this.handleScrollRequest = (s) => {
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
const ae = no({});
function dd(t, e, n, i, r, s, o, a, l, d, c, h, f, u) {
  return {
    dateEnv: r,
    nowManager: s,
    options: n,
    pluginHooks: a,
    emitter: c,
    dispatch: l,
    getCurrentData: d,
    calendarApi: h,
    viewSpec: t,
    viewApi: e,
    dateProfileGenerator: i,
    theme: o,
    isRtl: n.direction === "rtl",
    addResizeHandler(g) {
      c.on("_resize", g);
    },
    removeResizeHandler(g) {
      c.off("_resize", g);
    },
    createScrollResponder(g) {
      return new cd(g, c, x(n.scrollTime), n.scrollTimeReset);
    },
    registerInteractiveComponent: f,
    unregisterInteractiveComponent: u
  };
}
class $e extends W {
  // debug: boolean
  shouldComponentUpdate(e, n) {
    return !Sn(
      this.props,
      e,
      this.propEquality
      /*, this.debug */
    ) || !Sn(
      this.state,
      n,
      this.stateEquality
      /*, this.debug */
    );
  }
  // HACK for freakin' React StrictMode
  safeSetState(e) {
    Sn(this.state, Object.assign(Object.assign({}, this.state), e), this.stateEquality) || this.setState(e);
  }
}
$e.addPropsEquality = ud;
$e.addStateEquality = fd;
$e.contextType = ae;
$e.prototype.propEquality = {};
$e.prototype.stateEquality = {};
class R extends $e {
}
R.contextType = ae;
function ud(t) {
  let e = Object.create(this.prototype.propEquality);
  Object.assign(e, t), this.prototype.propEquality = e;
}
function fd(t) {
  let e = Object.create(this.prototype.stateEquality);
  Object.assign(e, t), this.prototype.stateEquality = e;
}
function ee(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
class yi extends R {
  constructor() {
    super(...arguments), this.id = Ne(), this.queuedDomNodes = [], this.currentDomNodes = [], this.handleEl = (e) => {
      const { options: n } = this.context, { generatorName: i } = this.props;
      (!n.customRenderingReplaces || !Un(i, n)) && this.updateElRef(e);
    }, this.updateElRef = (e) => {
      this.props.elRef && ee(this.props.elRef, e);
    };
  }
  render() {
    const { props: e, context: n } = this, { options: i } = n, { customGenerator: r, defaultGenerator: s, renderProps: o } = e, a = io(e, [], this.handleEl);
    let l = !1, d, c = [], h;
    if (r != null) {
      const f = typeof r == "function" ? r(o, p) : r;
      if (f === !0)
        l = !0;
      else {
        const u = f && typeof f == "object";
        u && "html" in f ? a.dangerouslySetInnerHTML = { __html: f.html } : u && "domNodes" in f ? c = Array.prototype.slice.call(f.domNodes) : (u ? _s(f) : typeof f != "function") ? d = f : h = f;
      }
    } else
      l = !Un(e.generatorName, i);
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
    const { props: i, context: r } = this, { handleCustomRendering: s, customRenderingMetaMap: o } = r.options;
    if (s) {
      const a = (n = this.currentGeneratorMeta) !== null && n !== void 0 ? n : o?.[i.generatorName];
      a && s(Object.assign(Object.assign({
        id: this.id,
        isActive: e,
        containerEl: this.base,
        reportNewContainerEl: this.updateElRef,
        // front-end framework tells us about new container els
        generatorMeta: a
      }, i), { elClasses: (i.elClasses || []).filter(hd) }));
    }
  }
  applyQueueudDomNodes() {
    const { queuedDomNodes: e, currentDomNodes: n } = this, i = this.base;
    if (!me(e, n)) {
      n.forEach(di);
      for (let r of e)
        i.appendChild(r);
      this.currentDomNodes = e;
    }
  }
}
yi.addPropsEquality({
  elClasses: me,
  elStyle: Z,
  elAttrs: Xc,
  renderProps: Z
});
function Un(t, e) {
  var n;
  return !!(e.handleCustomRendering && t && (!((n = e.customRenderingMetaMap) === null || n === void 0) && n[t]));
}
function io(t, e, n) {
  const i = Object.assign(Object.assign({}, t.elAttrs), { ref: n });
  return (t.elClasses || e) && (i.className = (t.elClasses || []).concat(e || []).concat(i.className || []).filter(Boolean).join(" ")), t.elStyle && (i.style = t.elStyle), i;
}
function hd(t) {
  return !!t;
}
const ro = no(0);
class G extends W {
  constructor() {
    super(...arguments), this.InnerContent = pd.bind(void 0, this), this.handleEl = (e) => {
      this.el = e, this.props.elRef && (ee(this.props.elRef, e), e && this.didMountMisfire && this.componentDidMount());
    };
  }
  render() {
    const { props: e } = this, n = gd(e.classNameGenerator, e.renderProps);
    if (e.children) {
      const i = io(e, n, this.handleEl), r = e.children(this.InnerContent, e.renderProps, i);
      return e.elTag ? p(e.elTag, i, r) : r;
    } else
      return p(yi, Object.assign(Object.assign({}, e), { elRef: this.handleEl, elTag: e.elTag || "div", elClasses: (e.elClasses || []).concat(n), renderId: this.context }));
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
G.contextType = ro;
function pd(t, e) {
  const n = t.props;
  return p(yi, Object.assign({ renderProps: n.renderProps, generatorName: n.generatorName, customGenerator: n.customGenerator, defaultGenerator: n.defaultGenerator, renderId: t.context }, e));
}
function gd(t, e) {
  const n = typeof t == "function" ? t(e) : t || [];
  return typeof n == "string" ? [n] : n;
}
class Vt extends R {
  render() {
    let { props: e, context: n } = this, { options: i } = n, r = { view: n.viewApi };
    return p(G, { elRef: e.elRef, elTag: e.elTag || "div", elAttrs: e.elAttrs, elClasses: [
      ...so(e.viewSpec),
      ...e.elClasses || []
    ], elStyle: e.elStyle, renderProps: r, classNameGenerator: i.viewClassNames, generatorName: void 0, didMount: i.viewDidMount, willUnmount: i.viewWillUnmount }, () => e.children);
  }
}
function so(t) {
  return [
    `fc-${t.type}-view`,
    "fc-view"
  ];
}
function md(t, e) {
  let n = null, i = null;
  return t.start && (n = e.createMarker(t.start)), t.end && (i = e.createMarker(t.end)), !n && !i || n && i && i < n ? null : { start: n, end: i };
}
function Mr(t, e) {
  let n = [], { start: i } = e, r, s;
  for (t.sort(vd), r = 0; r < t.length; r += 1)
    s = t[r], s.start > i && n.push({ start: i, end: s.start }), s.end > i && (i = s.end);
  return i < e.end && n.push({ start: i, end: e.end }), n;
}
function vd(t, e) {
  return t.start.valueOf() - e.start.valueOf();
}
function Me(t, e) {
  let { start: n, end: i } = t, r = null;
  return e.start !== null && (n === null ? n = e.start : n = new Date(Math.max(n.valueOf(), e.start.valueOf()))), e.end != null && (i === null ? i = e.end : i = new Date(Math.min(i.valueOf(), e.end.valueOf()))), (n === null || i === null || n < i) && (r = { start: n, end: i }), r;
}
function bd(t, e) {
  return (t.start === null ? null : t.start.valueOf()) === (e.start === null ? null : e.start.valueOf()) && (t.end === null ? null : t.end.valueOf()) === (e.end === null ? null : e.end.valueOf());
}
function Ei(t, e) {
  return (t.end === null || e.start === null || t.end > e.start) && (t.start === null || e.end === null || t.start < e.end);
}
function cn(t, e) {
  return (t.start === null || e.start !== null && e.start >= t.start) && (t.end === null || e.end !== null && e.end <= t.end);
}
function se(t, e) {
  return (t.start === null || e >= t.start) && (t.end === null || e < t.end);
}
function yd(t, e) {
  return e.start != null && t < e.start ? e.start : e.end != null && t >= e.end ? new Date(e.end.valueOf() - 1) : t;
}
function oo(t) {
  let e = Math.floor(Oe(t.start, t.end)) || 1, n = M(t.start), i = z(n, e);
  return { start: n, end: i };
}
function ao(t, e = x(0)) {
  let n = null, i = null;
  if (t.end) {
    i = M(t.end);
    let r = t.end.valueOf() - i.valueOf();
    r && r >= Q(e) && (i = z(i, 1));
  }
  return t.start && (n = M(t.start), i && i <= n && (i = z(n, 1))), { start: n, end: i };
}
function ze(t, e, n, i) {
  return i === "year" ? x(n.diffWholeYears(t, e), "year") : i === "month" ? x(n.diffWholeMonths(t, e), "month") : xc(t, e);
}
class lo {
  constructor(e) {
    this.props = e, this.initHiddenDays();
  }
  /* Date Range Computation
  ------------------------------------------------------------------------------------------------------------------*/
  // Builds a structure with info about what the dates/ranges will be for the "prev" view.
  buildPrev(e, n, i) {
    let { dateEnv: r } = this.props, s = r.subtract(
      r.startOf(n, e.currentRangeUnit),
      // important for start-of-month
      e.dateIncrement
    );
    return this.build(s, -1, i);
  }
  // Builds a structure with info about what the dates/ranges will be for the "next" view.
  buildNext(e, n, i) {
    let { dateEnv: r } = this.props, s = r.add(
      r.startOf(n, e.currentRangeUnit),
      // important for start-of-month
      e.dateIncrement
    );
    return this.build(s, 1, i);
  }
  // Builds a structure holding dates/ranges for rendering around the given date.
  // Optional direction param indicates whether the date is being incremented/decremented
  // from its previous value. decremented = -1, incremented = 1 (default).
  build(e, n, i = !0) {
    let { props: r } = this, s, o, a, l, d, c;
    return s = this.buildValidRange(), s = this.trimHiddenDays(s), i && (e = yd(e, s)), o = this.buildCurrentRangeInfo(e, n), a = /^(year|month|week|day)$/.test(o.unit), l = this.buildRenderRange(this.trimHiddenDays(o.range), o.unit, a), l = this.trimHiddenDays(l), d = l, r.showNonCurrentDates || (d = Me(d, o.range)), d = this.adjustActiveRange(d), d = Me(d, s), c = Ei(o.range, s), se(l, e) || (e = l.start), {
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
      slotMinTime: r.slotMinTime,
      // Duration object that denotes the exclusive visible end time of any given day
      slotMaxTime: r.slotMaxTime,
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
    let { props: i } = this, r = null, s = null, o = null, a;
    return i.duration ? (r = i.duration, s = i.durationUnit, o = this.buildRangeFromDuration(e, n, r, s)) : (a = this.props.dayCount) ? (s = "day", o = this.buildRangeFromDayCount(e, n, a)) : (o = this.buildCustomVisibleRange(e)) ? s = i.dateEnv.greatestWholeUnit(o.start, o.end).unit : (r = this.getFallbackDuration(), s = Ln(r).unit, o = this.buildRangeFromDuration(e, n, r, s)), { duration: r, unit: s, range: o };
  }
  getFallbackDuration() {
    return x({ day: 1 });
  }
  // Returns a new activeRange to have time values (un-ambiguate)
  // slotMinTime or slotMaxTime causes the range to expand.
  adjustActiveRange(e) {
    let { dateEnv: n, usesMinMaxTime: i, slotMinTime: r, slotMaxTime: s } = this.props, { start: o, end: a } = e;
    return i && (Ue(r) < 0 && (o = M(o), o = n.add(o, r)), Ue(s) > 1 && (a = M(a), a = z(a, -1), a = n.add(a, s))), { start: o, end: a };
  }
  // Builds the "current" range when it is specified as an explicit duration.
  // `unit` is the already-computed greatestDurationDenominator unit of duration.
  buildRangeFromDuration(e, n, i, r) {
    let { dateEnv: s, dateAlignment: o } = this.props, a, l, d;
    if (!o) {
      let { dateIncrement: h } = this.props;
      h && Q(h) < Q(i) ? o = Ln(h).unit : o = r;
    }
    Ue(i) <= 1 && this.isHiddenDay(a) && (a = this.skipHiddenDays(a, n), a = M(a));
    function c() {
      a = s.startOf(e, o), l = s.add(a, i), d = { start: a, end: l };
    }
    return c(), this.trimHiddenDays(d) || (e = this.skipHiddenDays(e, n), c()), d;
  }
  // Builds the "current" range when a dayCount is specified.
  buildRangeFromDayCount(e, n, i) {
    let { dateEnv: r, dateAlignment: s } = this.props, o = 0, a = e, l;
    s && (a = r.startOf(a, s)), a = M(a), a = this.skipHiddenDays(a, n), l = a;
    do
      l = z(l, 1), this.isHiddenDay(l) || (o += 1);
    while (o < i);
    return { start: a, end: l };
  }
  // Builds a normalized range object for the "visible" range,
  // which is a way to define the currentRange and activeRange at the same time.
  buildCustomVisibleRange(e) {
    let { props: n } = this, i = n.visibleRangeInput, r = typeof i == "function" ? i.call(n.calendarApi, n.dateEnv.toDate(e)) : i, s = this.refineRange(r);
    return s && (s.start == null || s.end == null) ? null : s;
  }
  // Computes the range that will represent the element/cells for *rendering*,
  // but which may have voided days/times.
  // not responsible for trimming hidden days.
  buildRenderRange(e, n, i) {
    return e;
  }
  // Compute the duration value that should be added/substracted to the current date
  // when a prev/next operation happens.
  buildDateIncrement(e) {
    let { dateIncrement: n } = this.props, i;
    return n || ((i = this.props.dateAlignment) ? x(1, i) : e || x({ days: 1 }));
  }
  refineRange(e) {
    if (e) {
      let n = md(e, this.props.dateEnv);
      return n && (n = ao(n)), n;
    }
    return null;
  }
  /* Hidden Days
  ------------------------------------------------------------------------------------------------------------------*/
  // Initializes internal variables related to calculating hidden days-of-week
  initHiddenDays() {
    let e = this.props.hiddenDays || [], n = [], i = 0, r;
    for (this.props.weekends === !1 && e.push(0, 6), r = 0; r < 7; r += 1)
      (n[r] = e.indexOf(r) !== -1) || (i += 1);
    if (!i)
      throw new Error("invalid hiddenDays");
    this.isHiddenDayHash = n;
  }
  // Remove days from the beginning and end of the range that are computed as hidden.
  // If the whole range is trimmed off, returns null
  trimHiddenDays(e) {
    let { start: n, end: i } = e;
    return n && (n = this.skipHiddenDays(n)), i && (i = this.skipHiddenDays(i, -1, !0)), n == null || i == null || n < i ? { start: n, end: i } : null;
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
  skipHiddenDays(e, n = 1, i = !1) {
    for (; this.isHiddenDayHash[(e.getUTCDay() + (i ? n : 0) + 7) % 7]; )
      e = z(e, n);
    return e;
  }
}
function wi(t, e, n, i) {
  return {
    instanceId: Ne(),
    defId: t,
    range: e,
    forcedStartTzo: n ?? null,
    forcedEndTzo: i ?? null
  };
}
function Ed(t, e, n, i) {
  for (let r = 0; r < i.length; r += 1) {
    let s = i[r].parse(t, n);
    if (s) {
      let { allDay: o } = t;
      return o == null && (o = e, o == null && (o = s.allDayGuess, o == null && (o = !1))), {
        allDay: o,
        duration: s.duration,
        typeData: s.typeData,
        typeId: r
      };
    }
  }
  return null;
}
function Ie(t, e, n) {
  let { dateEnv: i, pluginHooks: r, options: s } = n, { defs: o, instances: a } = t;
  a = ke(a, (l) => !o[l.defId].recurringDef);
  for (let l in o) {
    let d = o[l];
    if (d.recurringDef) {
      let { duration: c } = d.recurringDef;
      c || (c = d.allDay ? s.defaultAllDayEventDuration : s.defaultTimedEventDuration);
      let h = wd(d, c, e, i, r.recurringTypes);
      for (let f of h) {
        let u = wi(l, {
          start: f,
          end: i.add(f, c)
        });
        a[u.instanceId] = u;
      }
    }
  }
  return { defs: o, instances: a };
}
function wd(t, e, n, i, r) {
  let o = r[t.recurringDef.typeId].expand(t.recurringDef.typeData, {
    start: i.subtract(n.start, e),
    end: n.end
  }, i);
  return t.allDay && (o = o.map(M)), o;
}
const It = {
  id: String,
  groupId: String,
  title: String,
  url: String,
  interactive: Boolean
}, co = {
  start: v,
  end: v,
  date: v,
  allDay: Boolean
}, Sd = Object.assign(Object.assign(Object.assign({}, It), co), { extendedProps: v });
function uo(t, e, n, i, r = Si(n), s, o) {
  let { refined: a, extra: l } = fo(t, n, r), d = Dd(e, n), c = Ed(a, d, n.dateEnv, n.pluginHooks.recurringTypes);
  if (c) {
    let f = Fn(a, l, e ? e.sourceId : "", c.allDay, !!c.duration, n, s);
    return f.recurringDef = {
      typeId: c.typeId,
      typeData: c.typeData,
      duration: c.duration
    }, { def: f, instance: null };
  }
  let h = Ad(a, d, n, i);
  if (h) {
    let f = Fn(a, l, e ? e.sourceId : "", h.allDay, h.hasEnd, n, s), u = wi(f.defId, h.range, h.forcedStartTzo, h.forcedEndTzo);
    return o && f.publicId && o[f.publicId] && (u.instanceId = o[f.publicId]), { def: f, instance: u };
  }
  return null;
}
function fo(t, e, n = Si(e)) {
  return mi(t, n);
}
function Si(t) {
  return Object.assign(Object.assign(Object.assign({}, Gt), Sd), t.pluginHooks.eventRefiners);
}
function Fn(t, e, n, i, r, s, o) {
  let a = {
    title: t.title || "",
    groupId: t.groupId || "",
    publicId: t.id || "",
    url: t.url || "",
    recurringDef: null,
    defId: (o && t.id ? o[t.id] : "") || Ne(),
    sourceId: n,
    allDay: i,
    hasEnd: r,
    interactive: t.interactive,
    ui: qt(t, s),
    extendedProps: Object.assign(Object.assign({}, t.extendedProps || {}), e)
  };
  for (let l of s.pluginHooks.eventDefMemberAdders)
    Object.assign(a, l(t));
  return Object.freeze(a.ui.classNames), Object.freeze(a.extendedProps), a;
}
function Ad(t, e, n, i) {
  let { allDay: r } = t, s, o = null, a = !1, l, d = null, c = t.start != null ? t.start : t.date;
  if (s = n.dateEnv.createMarkerMeta(c), s)
    o = s.marker;
  else if (!i)
    return null;
  return t.end != null && (l = n.dateEnv.createMarkerMeta(t.end)), r == null && (e != null ? r = e : r = (!s || s.isTimeUnspecified) && (!l || l.isTimeUnspecified)), r && o && (o = M(o)), l && (d = l.marker, r && (d = M(d)), o && d <= o && (d = null)), d ? a = !0 : i || (a = n.options.forceEventDuration || !1, d = n.dateEnv.add(o, r ? n.options.defaultAllDayEventDuration : n.options.defaultTimedEventDuration)), {
    allDay: r,
    hasEnd: a,
    range: { start: o, end: d },
    forcedStartTzo: s ? s.forcedTzo : null,
    forcedEndTzo: l ? l.forcedTzo : null
  };
}
function Dd(t, e) {
  let n = null;
  return t && (n = t.defaultAllDay), n == null && (n = e.options.defaultAllDay), n;
}
function pt(t, e, n, i, r, s) {
  let o = V(), a = Si(n);
  for (let l of t) {
    let d = uo(l, e, n, i, a, r, s);
    d && jn(d, o);
  }
  return o;
}
function jn(t, e = V()) {
  return e.defs[t.def.defId] = t.def, t.instance && (e.instances[t.instance.instanceId] = t.instance), e;
}
function Ai(t, e) {
  let n = t.instances[e];
  if (n) {
    let i = t.defs[n.defId], r = dn(t, (s) => Cd(i, s));
    return r.defs[i.defId] = i, r.instances[n.instanceId] = n, r;
  }
  return V();
}
function Cd(t, e) {
  return !!(t.groupId && t.groupId === e.groupId);
}
function V() {
  return { defs: {}, instances: {} };
}
function Di(t, e) {
  return {
    defs: Object.assign(Object.assign({}, t.defs), e.defs),
    instances: Object.assign(Object.assign({}, t.instances), e.instances)
  };
}
function dn(t, e) {
  let n = ke(t.defs, e), i = ke(t.instances, (r) => n[r.defId]);
  return { defs: n, instances: i };
}
function xd(t, e) {
  let { defs: n, instances: i } = t, r = {}, s = {};
  for (let o in n)
    e.defs[o] || (r[o] = n[o]);
  for (let o in i)
    !e.instances[o] && // not explicitly excluded
    r[i[o].defId] && (s[o] = i[o]);
  return {
    defs: r,
    instances: s
  };
}
function _d(t, e) {
  return Array.isArray(t) ? pt(t, null, e, !0) : typeof t == "object" && t ? pt([t], null, e, !0) : t != null ? String(t) : null;
}
function Ir(t) {
  return Array.isArray(t) ? t : typeof t == "string" ? t.split(/\s+/) : [];
}
const Gt = {
  display: String,
  editable: Boolean,
  startEditable: Boolean,
  durationEditable: Boolean,
  constraint: v,
  overlap: v,
  allow: v,
  className: Ir,
  classNames: Ir,
  color: String,
  backgroundColor: String,
  borderColor: String,
  textColor: String
}, Rd = {
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
function qt(t, e) {
  let n = _d(t.constraint, e);
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
function ho(t) {
  return t.reduce(Td, Rd);
}
function Td(t, e) {
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
const kd = {
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
function po(t, e, n = go(e)) {
  let i;
  if (typeof t == "string" ? i = { url: t } : typeof t == "function" || Array.isArray(t) ? i = { events: t } : typeof t == "object" && t && (i = t), i) {
    let { refined: r, extra: s } = mi(i, n), o = Md(r, e);
    if (o)
      return {
        _raw: t,
        isFetching: !1,
        latestFetchId: "",
        fetchRange: null,
        defaultAllDay: r.defaultAllDay,
        eventDataTransform: r.eventDataTransform,
        success: r.success,
        failure: r.failure,
        publicId: r.id || "",
        sourceId: Ne(),
        sourceDefId: o.sourceDefId,
        meta: o.meta,
        ui: qt(r, e),
        extendedProps: s
      };
  }
  return null;
}
function go(t) {
  return Object.assign(Object.assign(Object.assign({}, Gt), kd), t.pluginHooks.eventSourceRefiners);
}
function Md(t, e) {
  let n = e.pluginHooks.eventSourceDefs;
  for (let i = n.length - 1; i >= 0; i -= 1) {
    let s = n[i].parseMeta(t);
    if (s)
      return { sourceDefId: i, meta: s };
  }
  return null;
}
function Id(t, e, n, i, r) {
  switch (e.type) {
    case "RECEIVE_EVENTS":
      return Nd(t, n[e.sourceId], e.fetchId, e.fetchRange, e.rawEvents, r);
    case "RESET_RAW_EVENTS":
      return Od(t, n[e.sourceId], e.rawEvents, i.activeRange, r);
    case "ADD_EVENTS":
      return $d(
        t,
        e.eventStore,
        // new ones
        i ? i.activeRange : null,
        r
      );
    case "RESET_EVENTS":
      return e.eventStore;
    case "MERGE_EVENTS":
      return Di(t, e.eventStore);
    case "PREV":
    // TODO: how do we track all actions that affect dateProfile :(
    case "NEXT":
    case "CHANGE_DATE":
    case "CHANGE_VIEW_TYPE":
      return i ? Ie(t, i.activeRange, r) : t;
    case "REMOVE_EVENTS":
      return xd(t, e.eventStore);
    case "REMOVE_EVENT_SOURCE":
      return vo(t, e.sourceId);
    case "REMOVE_ALL_EVENT_SOURCES":
      return dn(t, (s) => !s.sourceId);
    case "REMOVE_ALL_EVENTS":
      return V();
    default:
      return t;
  }
}
function Nd(t, e, n, i, r, s) {
  if (e && // not already removed
  n === e.latestFetchId) {
    let o = pt(mo(r, e, s), e, s);
    return i && (o = Ie(o, i, s)), Di(vo(t, e.sourceId), o);
  }
  return t;
}
function Od(t, e, n, i, r) {
  const { defIdMap: s, instanceIdMap: o } = Hd(t);
  let a = pt(mo(n, e, r), e, r, !1, s, o);
  return Ie(a, i, r);
}
function mo(t, e, n) {
  let i = n.options.eventDataTransform, r = e ? e.eventDataTransform : null;
  return r && (t = Nr(t, r)), i && (t = Nr(t, i)), t;
}
function Nr(t, e) {
  let n;
  if (!e)
    n = t;
  else {
    n = [];
    for (let i of t) {
      let r = e(i);
      r ? n.push(r) : r == null && n.push(i);
    }
  }
  return n;
}
function $d(t, e, n, i) {
  return n && (e = Ie(e, n, i)), Di(t, e);
}
function Or(t, e, n) {
  let { defs: i } = t, r = oe(t.instances, (s) => i[s.defId].allDay ? s : Object.assign(Object.assign({}, s), { range: {
    start: n.createMarker(e.toDate(s.range.start, s.forcedStartTzo)),
    end: n.createMarker(e.toDate(s.range.end, s.forcedEndTzo))
  }, forcedStartTzo: n.canComputeOffset ? null : s.forcedStartTzo, forcedEndTzo: n.canComputeOffset ? null : s.forcedEndTzo }));
  return { defs: i, instances: r };
}
function vo(t, e) {
  return dn(t, (n) => n.sourceId !== e);
}
function Pd(t, e) {
  return {
    defs: t.defs,
    instances: ke(t.instances, (n) => !e[n.instanceId])
  };
}
function Hd(t) {
  const { defs: e, instances: n } = t, i = {}, r = {};
  for (let s in e) {
    const o = e[s], { publicId: a } = o;
    a && (i[a] = s);
  }
  for (let s in n) {
    const o = n[s], a = e[o.defId], { publicId: l } = a;
    l && (r[l] = s);
  }
  return { defIdMap: i, instanceIdMap: r };
}
class un {
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
    zd(this.handlers, e, n);
  }
  off(e, n) {
    Bd(this.handlers, e, n);
  }
  trigger(e, ...n) {
    let i = this.handlers[e] || [], r = this.options && this.options[e], s = [].concat(r || [], i);
    for (let o of s)
      o.apply(this.thisContext, n);
  }
  hasHandlers(e) {
    return !!(this.handlers[e] && this.handlers[e].length || this.options && this.options[e]);
  }
}
function zd(t, e, n) {
  (t[e] || (t[e] = [])).push(n);
}
function Bd(t, e, n) {
  n ? t[e] && (t[e] = t[e].filter((i) => i !== n)) : delete t[e];
}
const Ld = {
  startTime: "09:00",
  endTime: "17:00",
  daysOfWeek: [1, 2, 3, 4, 5],
  display: "inverse-background",
  classNames: "fc-non-business",
  groupId: "_businessHours"
  // so multiple defs get grouped
};
function Ud(t, e) {
  return pt(Fd(t), null, e);
}
function Fd(t) {
  let e;
  return t === !0 ? e = [{}] : Array.isArray(t) ? e = t.filter((n) => n.daysOfWeek) : typeof t == "object" && t ? e = [t] : e = [], e = e.map((n) => Object.assign(Object.assign({}, Ld), n)), e;
}
function bo(t, e, n) {
  n.emitter.trigger("select", Object.assign(Object.assign({}, Ci(t, n)), { jsEvent: e ? e.origEvent : null, view: n.viewApi || n.calendarApi.view }));
}
function jd(t, e) {
  e.emitter.trigger("unselect", {
    jsEvent: t ? t.origEvent : null,
    view: e.viewApi || e.calendarApi.view
  });
}
function Ci(t, e) {
  let n = {};
  for (let i of e.pluginHooks.dateSpanTransforms)
    Object.assign(n, i(t, e));
  return Object.assign(n, iu(t, e.dateEnv)), n;
}
function $r(t, e, n) {
  let { dateEnv: i, options: r } = n, s = e;
  return t ? (s = M(s), s = i.add(s, r.defaultAllDayEventDuration)) : s = i.add(s, r.defaultTimedEventDuration), s;
}
function xi(t, e, n, i) {
  let r = Yt(t.defs, e), s = V();
  for (let o in t.defs) {
    let a = t.defs[o];
    s.defs[o] = Wd(a, r[o], n, i);
  }
  for (let o in t.instances) {
    let a = t.instances[o], l = s.defs[a.defId];
    s.instances[o] = Vd(a, l, r[a.defId], n, i);
  }
  return s;
}
function Wd(t, e, n, i) {
  let r = n.standardProps || {};
  r.hasEnd == null && e.durationEditable && (n.startDelta || n.endDelta) && (r.hasEnd = !0);
  let s = Object.assign(Object.assign(Object.assign({}, t), r), { ui: Object.assign(Object.assign({}, t.ui), r.ui) });
  n.extendedProps && (s.extendedProps = Object.assign(Object.assign({}, s.extendedProps), n.extendedProps));
  for (let o of i.pluginHooks.eventDefMutationAppliers)
    o(s, n, i);
  return !s.hasEnd && i.options.forceEventDuration && (s.hasEnd = !0), s;
}
function Vd(t, e, n, i, r) {
  let { dateEnv: s } = r, o = i.standardProps && i.standardProps.allDay === !0, a = i.standardProps && i.standardProps.hasEnd === !1, l = Object.assign({}, t);
  return o && (l.range = oo(l.range)), i.datesDelta && n.startEditable && (l.range = {
    start: s.add(l.range.start, i.datesDelta),
    end: s.add(l.range.end, i.datesDelta)
  }), i.startDelta && n.durationEditable && (l.range = {
    start: s.add(l.range.start, i.startDelta),
    end: l.range.end
  }), i.endDelta && n.durationEditable && (l.range = {
    start: l.range.start,
    end: s.add(l.range.end, i.endDelta)
  }), a && (l.range = {
    start: l.range.start,
    end: $r(e.allDay, l.range.start, r)
  }), e.allDay && (l.range = {
    start: M(l.range.start),
    end: M(l.range.end)
  }), l.range.end < l.range.start && (l.range.end = $r(e.allDay, l.range.start, r)), l;
}
class He {
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
  constructor(e, n, i) {
    this._context = e, this._def = n, this._instance = i || null;
  }
  /*
  TODO: make event struct more responsible for this
  */
  setProp(e, n) {
    if (e in co)
      console.warn("Could not set date-related prop 'name'. Use one of the date-related methods instead.");
    else if (e === "id")
      n = It[e](n), this.mutate({
        standardProps: { publicId: n }
        // hardcoded internal name
      });
    else if (e in It)
      n = It[e](n), this.mutate({
        standardProps: { [e]: n }
      });
    else if (e in Gt) {
      let i = Gt[e](n);
      e === "color" ? i = { backgroundColor: n, borderColor: n } : e === "editable" ? i = { startEditable: n, durationEditable: n } : i = { [e]: n }, this.mutate({
        standardProps: { ui: i }
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
    let { dateEnv: i } = this._context, r = i.createMarker(e);
    if (r && this._instance) {
      let s = this._instance.range, o = ze(s.start, r, i, n.granularity);
      n.maintainDuration ? this.mutate({ datesDelta: o }) : this.mutate({ startDelta: o });
    }
  }
  setEnd(e, n = {}) {
    let { dateEnv: i } = this._context, r;
    if (!(e != null && (r = i.createMarker(e), !r)) && this._instance)
      if (r) {
        let s = ze(this._instance.range.end, r, i, n.granularity);
        this.mutate({ endDelta: s });
      } else
        this.mutate({ standardProps: { hasEnd: !1 } });
  }
  setDates(e, n, i = {}) {
    let { dateEnv: r } = this._context, s = { allDay: i.allDay }, o = r.createMarker(e), a;
    if (o && !(n != null && (a = r.createMarker(n), !a)) && this._instance) {
      let l = this._instance.range;
      i.allDay === !0 && (l = oo(l));
      let d = ze(l.start, o, r, i.granularity);
      if (a) {
        let c = ze(l.end, a, r, i.granularity);
        mc(d, c) ? this.mutate({ datesDelta: d, standardProps: s }) : this.mutate({ startDelta: d, endDelta: c, standardProps: s });
      } else
        s.hasEnd = !1, this.mutate({ datesDelta: d, standardProps: s });
    }
  }
  moveStart(e) {
    let n = x(e);
    n && this.mutate({ startDelta: n });
  }
  moveEnd(e) {
    let n = x(e);
    n && this.mutate({ endDelta: n });
  }
  moveDates(e) {
    let n = x(e);
    n && this.mutate({ datesDelta: n });
  }
  setAllDay(e, n = {}) {
    let i = { allDay: e }, { maintainDuration: r } = n;
    r == null && (r = this._context.options.allDayMaintainDuration), this._def.allDay !== e && (i.hasEnd = r), this.mutate({ standardProps: i });
  }
  formatRange(e) {
    let { dateEnv: n } = this._context, i = this._instance, r = O(e);
    return this._def.hasEnd ? n.formatRange(i.range.start, i.range.end, r, {
      forcedStartTzo: i.forcedStartTzo,
      forcedEndTzo: i.forcedEndTzo
    }) : n.format(i.range.start, r, {
      forcedTzo: i.forcedStartTzo
    });
  }
  mutate(e) {
    let n = this._instance;
    if (n) {
      let i = this._def, r = this._context, { eventStore: s } = r.getCurrentData(), o = Ai(s, n.instanceId);
      o = xi(o, {
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
      }, e, r);
      let l = new N(r, i, n);
      this._def = o.defs[i.defId], this._instance = o.instances[n.instanceId], r.dispatch({
        type: "MERGE_EVENTS",
        eventStore: o
      }), r.emitter.trigger("eventChange", {
        oldEvent: l,
        event: this,
        relatedEvents: _e(o, r, n),
        revert() {
          r.dispatch({
            type: "RESET_EVENTS",
            eventStore: s
            // the ORIGINAL store
          });
        }
      });
    }
  }
  remove() {
    let e = this._context, n = yo(this);
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
    return e ? new He(this._context, this._context.getCurrentData().eventSources[e]) : null;
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
    let n = this._def, { ui: i } = n, { startStr: r, endStr: s } = this, o = {
      allDay: n.allDay
    };
    return n.title && (o.title = n.title), r && (o.start = r), s && (o.end = s), n.publicId && (o.id = n.publicId), n.groupId && (o.groupId = n.groupId), n.url && (o.url = n.url), i.display && i.display !== "auto" && (o.display = i.display), e.collapseColor && i.backgroundColor && i.backgroundColor === i.borderColor ? o.color = i.backgroundColor : (i.backgroundColor && (o.backgroundColor = i.backgroundColor), i.borderColor && (o.borderColor = i.borderColor)), i.textColor && (o.textColor = i.textColor), i.classNames.length && (o.classNames = i.classNames), Object.keys(n.extendedProps).length && (e.collapseExtendedProps ? Object.assign(o, n.extendedProps) : o.extendedProps = n.extendedProps), o;
  }
  toJSON() {
    return this.toPlainObject();
  }
}
function yo(t) {
  let e = t._def, n = t._instance;
  return {
    defs: { [e.defId]: e },
    instances: n ? { [n.instanceId]: n } : {}
  };
}
function _e(t, e, n) {
  let { defs: i, instances: r } = t, s = [], o = n ? n.instanceId : "";
  for (let a in r) {
    let l = r[a], d = i[l.defId];
    l.instanceId !== o && s.push(new N(e, d, l));
  }
  return s;
}
function Pr(t, e, n, i) {
  let r = {}, s = {}, o = {}, a = [], l = [], d = Yt(t.defs, e);
  for (let c in t.defs) {
    let h = t.defs[c];
    d[h.defId].display === "inverse-background" && (h.groupId ? (r[h.groupId] = [], o[h.groupId] || (o[h.groupId] = h)) : s[c] = []);
  }
  for (let c in t.instances) {
    let h = t.instances[c], f = t.defs[h.defId], u = d[f.defId], g = h.range, m = !f.allDay && i ? ao(g, i) : g, b = Me(m, n);
    b && (u.display === "inverse-background" ? f.groupId ? r[f.groupId].push(b) : s[h.defId].push(b) : u.display !== "none" && (u.display === "background" ? a : l).push({
      def: f,
      ui: u,
      instance: h,
      range: b,
      isStart: m.start && m.start.valueOf() === b.start.valueOf(),
      isEnd: m.end && m.end.valueOf() === b.end.valueOf()
    }));
  }
  for (let c in r) {
    let h = r[c], f = Mr(h, n);
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
    let h = s[c], f = Mr(h, n);
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
function Gd(t) {
  return t.ui.display === "background" || t.ui.display === "inverse-background";
}
function Hr(t, e) {
  t.fcSeg = e;
}
function Qe(t) {
  return t.fcSeg || t.parentNode.fcSeg || // for the harness
  null;
}
function Yt(t, e) {
  return oe(t, (n) => Eo(n, e));
}
function Eo(t, e) {
  let n = [];
  return e[""] && n.push(e[""]), e[t.defId] && n.push(e[t.defId]), n.push(t.ui), ho(n);
}
function wo(t, e) {
  let n = t.map(qd);
  return n.sort((i, r) => cc(i, r, e)), n.map((i) => i._seg);
}
function qd(t) {
  let { eventRange: e } = t, n = e.def, i = e.instance ? e.instance.range : e.range, r = i.start ? i.start.valueOf() : 0, s = i.end ? i.end.valueOf() : 0;
  return Object.assign(Object.assign(Object.assign({}, n.extendedProps), n), {
    id: n.publicId,
    start: r,
    end: s,
    duration: s - r,
    allDay: Number(n.allDay),
    _seg: t
  });
}
function Yd(t, e) {
  let { pluginHooks: n } = e, i = n.isDraggableTransformers, { def: r, ui: s } = t.eventRange, o = s.startEditable;
  for (let a of i)
    o = a(o, r, s, e);
  return o;
}
function Qd(t, e) {
  return t.isStart && t.eventRange.ui.durationEditable && e.options.eventResizableFromStart;
}
function Zd(t, e) {
  return t.isEnd && t.eventRange.ui.durationEditable;
}
function So(t, e, n, i, r, s, o) {
  let { dateEnv: a, options: l } = n, { displayEventTime: d, displayEventEnd: c } = l, h = t.eventRange.def, f = t.eventRange.instance;
  d == null && (d = i !== !1), c == null && (c = r !== !1);
  let u = f.range.start, g = f.range.end, m = t.start || t.eventRange.range.start, b = t.end || t.eventRange.range.end, y = M(u).valueOf() === M(m).valueOf(), w = M(ve(g, -1)).valueOf() === M(ve(b, -1)).valueOf();
  return d && !h.allDay && (y || w) ? (m = y ? u : m, b = w ? g : b, c && h.hasEnd ? a.formatRange(m, b, e, {
    forcedStartTzo: f.forcedStartTzo,
    forcedEndTzo: f.forcedEndTzo
  }) : a.format(m, e, {
    forcedTzo: f.forcedStartTzo
    // nooooo, same
  })) : "";
}
function ge(t, e, n) {
  let i = t.eventRange.range;
  return {
    isPast: i.end <= (n || e.start),
    isFuture: i.start >= (n || e.end),
    isToday: e && se(e, i.start)
  };
}
function Kd(t) {
  let e = ["fc-event"];
  return t.isMirror && e.push("fc-event-mirror"), t.isDraggable && e.push("fc-event-draggable"), (t.isStartResizable || t.isEndResizable) && e.push("fc-event-resizable"), t.isDragging && e.push("fc-event-dragging"), t.isResizing && e.push("fc-event-resizing"), t.isSelected && e.push("fc-event-selected"), t.isStart && e.push("fc-event-start"), t.isEnd && e.push("fc-event-end"), t.isPast && e.push("fc-event-past"), t.isToday && e.push("fc-event-today"), t.isFuture && e.push("fc-event-future"), e;
}
function Ao(t) {
  return t.instance ? t.instance.instanceId : `${t.def.defId}:${t.range.start.toISOString()}`;
}
function Do(t, e) {
  let { def: n, instance: i } = t.eventRange, { url: r } = n;
  if (r)
    return { href: r };
  let { emitter: s, options: o } = e, { eventInteractive: a } = o;
  return a == null && (a = n.interactive, a == null && (a = !!s.hasHandlers("eventClick"))), a ? Ks((l) => {
    s.trigger("eventClick", {
      el: l.target,
      event: new N(e, n, i),
      jsEvent: l,
      view: e.viewApi
    });
  }) : {};
}
const Xd = {
  start: v,
  end: v,
  allDay: Boolean
};
function Jd(t, e, n) {
  let i = eu(t, e), { range: r } = i;
  if (!r.start)
    return null;
  if (!r.end) {
    if (n == null)
      return null;
    r.end = e.add(r.start, n);
  }
  return i;
}
function eu(t, e) {
  let { refined: n, extra: i } = mi(t, Xd), r = n.start ? e.createMarkerMeta(n.start) : null, s = n.end ? e.createMarkerMeta(n.end) : null, { allDay: o } = n;
  return o == null && (o = r && r.isTimeUnspecified && (!s || s.isTimeUnspecified)), Object.assign({ range: {
    start: r ? r.marker : null,
    end: s ? s.marker : null
  }, allDay: o }, i);
}
function tu(t, e) {
  return bd(t.range, e.range) && t.allDay === e.allDay && nu(t, e);
}
function nu(t, e) {
  for (let n in e)
    if (n !== "range" && n !== "allDay" && t[n] !== e[n])
      return !1;
  for (let n in t)
    if (!(n in e))
      return !1;
  return !0;
}
function iu(t, e) {
  return Object.assign(Object.assign({}, xo(t.range, e, t.allDay)), { allDay: t.allDay });
}
function Co(t, e, n) {
  return Object.assign(Object.assign({}, xo(t, e, n)), { timeZone: e.timeZone });
}
function xo(t, e, n) {
  return {
    start: e.toDate(t.start),
    end: e.toDate(t.end),
    startStr: e.formatIso(t.start, { omitTime: n }),
    endStr: e.formatIso(t.end, { omitTime: n })
  };
}
function ru(t, e, n) {
  let i = fo({ editable: !1 }, n), r = Fn(
    i.refined,
    i.extra,
    "",
    // sourceId
    t.allDay,
    !0,
    // hasEnd
    n
  );
  return {
    def: r,
    ui: Eo(r, e),
    instance: wi(r.defId, t.range),
    range: t.range,
    isStart: !0,
    isEnd: !0
  };
}
function su(t, e, n) {
  let i = !1, r = function(a) {
    i || (i = !0, e(a));
  }, s = function(a) {
    i || (i = !0, n(a));
  }, o = t(r, s);
  o && typeof o.then == "function" && o.then(r, s);
}
class zr extends Error {
  constructor(e, n) {
    super(e), this.response = n;
  }
}
function ou(t, e, n) {
  t = t.toUpperCase();
  const i = {
    method: t
  };
  return t === "GET" ? e += (e.indexOf("?") === -1 ? "?" : "&") + new URLSearchParams(n) : (i.body = new URLSearchParams(n), i.headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  }), fetch(e, i).then((r) => {
    if (r.ok)
      return r.json().then((s) => [s, r], () => {
        throw new zr("Failure parsing JSON", r);
      });
    throw new zr("Request failed", r);
  });
}
let An;
function _o() {
  return An == null && (An = au()), An;
}
function au() {
  if (typeof document > "u")
    return !0;
  let t = document.createElement("div");
  t.style.position = "absolute", t.style.top = "0px", t.style.left = "0px", t.innerHTML = "<table><tr><td><div></div></td></tr></table>", t.querySelector("table").style.height = "100px", t.querySelector("div").style.height = "100%", document.body.appendChild(t);
  let n = t.querySelector("div").offsetHeight > 0;
  return document.body.removeChild(t), n;
}
class lu extends R {
  constructor() {
    super(...arguments), this.state = {
      forPrint: !1
    }, this.handleBeforePrint = () => {
      Wt(() => {
        this.setState({ forPrint: !0 });
      });
    }, this.handleAfterPrint = () => {
      Wt(() => {
        this.setState({ forPrint: !1 });
      });
    };
  }
  render() {
    let { props: e } = this, { options: n } = e, { forPrint: i } = this.state, r = i || n.height === "auto" || n.contentHeight === "auto", s = !r && n.height != null ? n.height : "", o = [
      "fc",
      i ? "fc-media-print" : "fc-media-screen",
      `fc-direction-${n.direction}`,
      e.theme.getClass("root")
    ];
    return _o() || o.push("fc-liquid-hack"), e.children(o, s, r, i);
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
class Xe {
  constructor(e) {
    this.component = e.component, this.isHitComboAllowed = e.isHitComboAllowed || null;
  }
  destroy() {
  }
}
function cu(t, e) {
  return {
    component: t,
    el: e.el,
    useEventCenter: e.useEventCenter != null ? e.useEventCenter : !0,
    isHitComboAllowed: e.isHitComboAllowed || null
  };
}
function _i(t) {
  return {
    [t.component.uid]: t
  };
}
const Wn = {};
class Je extends W {
  constructor(e, n) {
    super(e, n), this.handleRefresh = () => {
      let i = this.computeTiming();
      i.state.nowDate.valueOf() !== this.state.nowDate.valueOf() && this.setState(i.state), this.clearTimeout(), this.setTimeout(i.waitMs);
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
    let { props: e, context: n } = this, i = n.nowManager.getDateMarker(), { nowIndicatorSnap: r } = n.options;
    r === "auto" && (r = // large unit?
    /year|month|week|day/.test(e.unit) || // if slotDuration 30 mins for example, would NOT appear to snap (legacy behavior)
    (e.unitValue || 1) === 1);
    let s, o;
    return r ? (s = n.dateEnv.startOf(i, e.unit), o = n.dateEnv.add(s, x(1, e.unit)).valueOf() - i.valueOf()) : (s = i, o = 1e3 * 60), o = Math.min(1e3 * 60 * 60 * 24, o), {
      state: { nowDate: s, todayRange: du(s) },
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
Je.contextType = ae;
function du(t) {
  let e = M(t), n = z(e, 1);
  return { start: e, end: n };
}
class uu {
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
    let { currentDataManager: i } = this;
    i.currentCalendarOptionsRefiners[e] ? i.emitter.on(e, n) : console.warn(`Unknown listener name '${e}'`);
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
          let { dateEnv: i } = this.getCurrentData();
          this.dispatch({
            type: "CHANGE_VIEW_TYPE",
            viewType: e,
            dateMarker: i.createMarker(n)
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
    let i = this.getCurrentData(), r;
    n = n || "day", r = i.viewSpecs[n] || this.getUnitViewSpec(n), this.unselect(), r ? this.dispatch({
      type: "CHANGE_VIEW_TYPE",
      viewType: r.type,
      dateMarker: e
    }) : this.dispatch({
      type: "CHANGE_DATE",
      dateMarker: e
    });
  }
  // Given a duration singular unit, like "week" or "day", finds a matching view spec.
  // Preference is given to views that have corresponding buttons.
  getUnitViewSpec(e) {
    let { viewSpecs: n, toolbarConfig: i } = this.getCurrentData(), r = [].concat(i.header ? i.header.viewsWithButtons : [], i.footer ? i.footer.viewsWithButtons : []), s, o;
    for (let a in n)
      r.push(a);
    for (s = 0; s < r.length; s += 1)
      if (o = n[r[s]], o && o.singleUnit === e)
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
    let n = this.getCurrentData(), i = x(e);
    i && (this.unselect(), this.dispatch({
      type: "CHANGE_DATE",
      dateMarker: n.dateEnv.add(n.currentDate, i)
    }));
  }
  getDate() {
    let e = this.getCurrentData();
    return e.dateEnv.toDate(e.currentDate);
  }
  // Date Formatting Utils
  // -----------------------------------------------------------------------------------------------------------------
  formatDate(e, n) {
    let { dateEnv: i } = this.getCurrentData();
    return i.format(i.createMarker(e), O(n));
  }
  // `settings` is for formatter AND isEndExclusive
  formatRange(e, n, i) {
    let { dateEnv: r } = this.getCurrentData();
    return r.formatRange(r.createMarker(e), r.createMarker(n), O(i), i);
  }
  formatIso(e, n) {
    let { dateEnv: i } = this.getCurrentData();
    return i.formatIso(i.createMarker(e), { omitTime: n });
  }
  // Date Selection / Event Selection / DayClick
  // -----------------------------------------------------------------------------------------------------------------
  select(e, n) {
    let i;
    n == null ? e.start != null ? i = e : i = {
      start: e,
      end: null
    } : i = {
      start: e,
      end: n
    };
    let r = this.getCurrentData(), s = Jd(i, r.dateEnv, x({ days: 1 }));
    s && (this.dispatch({ type: "SELECT_DATES", selection: s }), bo(s, null, r));
  }
  unselect(e) {
    let n = this.getCurrentData();
    n.dateSelection && (this.dispatch({ type: "UNSELECT_DATES" }), jd(e, n));
  }
  // Public Events API
  // -----------------------------------------------------------------------------------------------------------------
  addEvent(e, n) {
    if (e instanceof N) {
      let o = e._def, a = e._instance;
      return this.getCurrentData().eventStore.defs[o.defId] || (this.dispatch({
        type: "ADD_EVENTS",
        eventStore: jn({ def: o, instance: a })
        // TODO: better util for two args?
      }), this.triggerEventAdd(e)), e;
    }
    let i = this.getCurrentData(), r;
    if (n instanceof He)
      r = n.internalEventSource;
    else if (typeof n == "boolean")
      n && ([r] = bi(i.eventSources));
    else if (n != null) {
      let o = this.getEventSourceById(n);
      if (!o)
        return console.warn(`Could not find an event source with ID "${n}"`), null;
      r = o.internalEventSource;
    }
    let s = uo(e, r, i, !1);
    if (s) {
      let o = new N(i, s.def, s.def.recurringDef ? null : s.instance);
      return this.dispatch({
        type: "ADD_EVENTS",
        eventStore: jn(s)
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
          eventStore: yo(e)
        });
      }
    });
  }
  // TODO: optimize
  getEventById(e) {
    let n = this.getCurrentData(), { defs: i, instances: r } = n.eventStore;
    e = String(e);
    for (let s in i) {
      let o = i[s];
      if (o.publicId === e) {
        if (o.recurringDef)
          return new N(n, o, null);
        for (let a in r) {
          let l = r[a];
          if (l.defId === o.defId)
            return new N(n, o, l);
        }
      }
    }
    return null;
  }
  getEvents() {
    let e = this.getCurrentData();
    return _e(e.eventStore, e);
  }
  removeAllEvents() {
    this.dispatch({ type: "REMOVE_ALL_EVENTS" });
  }
  // Public Event Sources API
  // -----------------------------------------------------------------------------------------------------------------
  getEventSources() {
    let e = this.getCurrentData(), n = e.eventSources, i = [];
    for (let r in n)
      i.push(new He(e, n[r]));
    return i;
  }
  getEventSourceById(e) {
    let n = this.getCurrentData(), i = n.eventSources;
    e = String(e);
    for (let r in i)
      if (i[r].publicId === e)
        return new He(n, i[r]);
    return null;
  }
  addEventSource(e) {
    let n = this.getCurrentData();
    if (e instanceof He)
      return n.eventSources[e.internalEventSource.sourceId] || this.dispatch({
        type: "ADD_EVENT_SOURCES",
        sources: [e.internalEventSource]
      }), e;
    let i = po(e, n);
    return i ? (this.dispatch({ type: "ADD_EVENT_SOURCES", sources: [i] }), new He(n, i)) : null;
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
    let n = x(e);
    n && this.trigger("_scrollRequest", { time: n });
  }
}
function fu(t, e) {
  return t.left >= e.left && t.left < e.right && t.top >= e.top && t.top < e.bottom;
}
function Ro(t, e) {
  let n = {
    left: Math.max(t.left, e.left),
    right: Math.min(t.right, e.right),
    top: Math.max(t.top, e.top),
    bottom: Math.min(t.bottom, e.bottom)
  };
  return n.left < n.right && n.top < n.bottom ? n : !1;
}
function hu(t, e) {
  return {
    left: Math.min(Math.max(t.left, e.left), e.right),
    top: Math.min(Math.max(t.top, e.top), e.bottom)
  };
}
function pu(t) {
  return {
    left: (t.left + t.right) / 2,
    top: (t.top + t.bottom) / 2
  };
}
function gu(t, e) {
  return {
    left: t.left - e.left,
    top: t.top - e.top
  };
}
const Dn = V();
class mu {
  constructor() {
    this.getKeysForEventDefs = A(this._getKeysForEventDefs), this.splitDateSelection = A(this._splitDateSpan), this.splitEventStore = A(this._splitEventStore), this.splitIndividualUi = A(this._splitIndividualUi), this.splitEventDrag = A(this._splitInteraction), this.splitEventResize = A(this._splitInteraction), this.eventUiBuilders = {};
  }
  splitProps(e) {
    let n = this.getKeyInfo(e), i = this.getKeysForEventDefs(e.eventStore), r = this.splitDateSelection(e.dateSelection), s = this.splitIndividualUi(e.eventUiBases, i), o = this.splitEventStore(e.eventStore, i), a = this.splitEventDrag(e.eventDrag), l = this.splitEventResize(e.eventResize), d = {};
    this.eventUiBuilders = oe(n, (c, h) => this.eventUiBuilders[h] || A(vu));
    for (let c in n) {
      let h = n[c], f = o[c] || Dn, u = this.eventUiBuilders[c];
      d[c] = {
        businessHours: h.businessHours || e.businessHours,
        dateSelection: r[c] || null,
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
      let i = this.getKeysForDateSpan(e);
      for (let r of i)
        n[r] = e;
    }
    return n;
  }
  _getKeysForEventDefs(e) {
    return oe(e.defs, (n) => this.getKeysForEventDef(n));
  }
  _splitEventStore(e, n) {
    let { defs: i, instances: r } = e, s = {};
    for (let o in i)
      for (let a of n[o])
        s[a] || (s[a] = V()), s[a].defs[o] = i[o];
    for (let o in r) {
      let a = r[o];
      for (let l of n[a.defId])
        s[l] && (s[l].instances[o] = a);
    }
    return s;
  }
  _splitIndividualUi(e, n) {
    let i = {};
    for (let r in e)
      if (r)
        for (let s of n[r])
          i[s] || (i[s] = {}), i[s][r] = e[r];
    return i;
  }
  _splitInteraction(e) {
    let n = {};
    if (e) {
      let i = this._splitEventStore(e.affectedEvents, this._getKeysForEventDefs(e.affectedEvents)), r = this._getKeysForEventDefs(e.mutatedEvents), s = this._splitEventStore(e.mutatedEvents, r), o = (a) => {
        n[a] || (n[a] = {
          affectedEvents: i[a] || Dn,
          mutatedEvents: s[a] || Dn,
          isEvent: e.isEvent
        });
      };
      for (let a in i)
        o(a);
      for (let a in s)
        o(a);
    }
    return n;
  }
}
function vu(t, e, n) {
  let i = [];
  t && i.push(t), e && i.push(e);
  let r = {
    "": ho(i)
  };
  return n && Object.assign(r, n), r;
}
function To(t, e, n, i) {
  return {
    dow: t.getUTCDay(),
    isDisabled: !!(i && (!i.activeRange || !se(i.activeRange, t))),
    isOther: !!(i && !se(i.currentRange, t)),
    isToday: !!(e && se(e, t)),
    isPast: !!(e && t < e.start),
    isFuture: !!(e && t >= e.end)
  };
}
function Ri(t, e) {
  let n = [
    "fc-day",
    `fc-day-${wc[t.dow]}`
  ];
  return t.isDisabled ? n.push("fc-day-disabled") : (t.isToday && (n.push("fc-day-today"), n.push(e.getClass("today"))), t.isPast && n.push("fc-day-past"), t.isFuture && n.push("fc-day-future"), t.isOther && n.push("fc-day-other")), n;
}
const bu = O({ year: "numeric", month: "long", day: "numeric" }), yu = O({ week: "long" });
function Qt(t, e, n = "day", i = !0) {
  const { dateEnv: r, options: s, calendarApi: o } = t;
  let a = r.format(e, n === "week" ? yu : bu);
  if (s.navLinks) {
    let l = r.toDate(e);
    const d = (c) => {
      let h = n === "day" ? s.navLinkDayClick : n === "week" ? s.navLinkWeekClick : null;
      typeof h == "function" ? h.call(o, r.toDate(e), c) : (typeof h == "string" && (n = h), o.zoomTo(e, n));
    };
    return Object.assign({ title: at(s.navLinkHint, [a, l], a), "data-navlink": "" }, i ? Zs(d) : { onClick: d });
  }
  return { "aria-label": a };
}
let Cn = null;
function Eu() {
  return Cn === null && (Cn = wu()), Cn;
}
function wu() {
  let t = document.createElement("div");
  ot(t, {
    position: "absolute",
    top: -1e3,
    left: 0,
    border: 0,
    padding: 0,
    overflow: "scroll",
    direction: "rtl"
  }), t.innerHTML = "<div></div>", document.body.appendChild(t);
  let n = t.firstChild.getBoundingClientRect().left > t.getBoundingClientRect().left;
  return di(t), n;
}
let xn;
function Su() {
  return xn || (xn = Au()), xn;
}
function Au() {
  let t = document.createElement("div");
  t.style.overflow = "scroll", t.style.position = "absolute", t.style.top = "-9999px", t.style.left = "-9999px", document.body.appendChild(t);
  let e = ko(t);
  return document.body.removeChild(t), e;
}
function ko(t) {
  return {
    x: t.offsetHeight - t.clientHeight,
    y: t.offsetWidth - t.clientWidth
  };
}
function Du(t, e = !1) {
  let n = window.getComputedStyle(t), i = parseInt(n.borderLeftWidth, 10) || 0, r = parseInt(n.borderRightWidth, 10) || 0, s = parseInt(n.borderTopWidth, 10) || 0, o = parseInt(n.borderBottomWidth, 10) || 0, a = ko(t), l = a.y - i - r, d = a.x - s - o, c = {
    borderLeft: i,
    borderRight: r,
    borderTop: s,
    borderBottom: o,
    scrollbarBottom: d,
    scrollbarLeft: 0,
    scrollbarRight: 0
  };
  return Eu() && n.direction === "rtl" ? c.scrollbarLeft = l : c.scrollbarRight = l, e && (c.paddingLeft = parseInt(n.paddingLeft, 10) || 0, c.paddingRight = parseInt(n.paddingRight, 10) || 0, c.paddingTop = parseInt(n.paddingTop, 10) || 0, c.paddingBottom = parseInt(n.paddingBottom, 10) || 0), c;
}
function Cu(t, e = !1, n) {
  let i = Ti(t), r = Du(t, e), s = {
    left: i.left + r.borderLeft + r.scrollbarLeft,
    right: i.right - r.borderRight - r.scrollbarRight,
    top: i.top + r.borderTop,
    bottom: i.bottom - r.borderBottom - r.scrollbarBottom
  };
  return e && (s.left += r.paddingLeft, s.right -= r.paddingRight, s.top += r.paddingTop, s.bottom -= r.paddingBottom), s;
}
function Ti(t) {
  let e = t.getBoundingClientRect();
  return {
    left: e.left + window.scrollX,
    top: e.top + window.scrollY,
    right: e.right + window.scrollX,
    bottom: e.bottom + window.scrollY
  };
}
function xu(t) {
  let e = Mo(t), n = t.getBoundingClientRect();
  for (let i of e) {
    let r = Ro(n, i.getBoundingClientRect());
    if (r)
      n = r;
    else
      return null;
  }
  return n;
}
function Mo(t) {
  let e = [];
  for (; t instanceof HTMLElement; ) {
    let n = window.getComputedStyle(t);
    if (n.position === "fixed")
      break;
    /(auto|scroll)/.test(n.overflow + n.overflowY + n.overflowX) && e.push(t), t = t.parentNode;
  }
  return e;
}
class Ze {
  constructor(e, n, i, r) {
    this.els = n;
    let s = this.originClientRect = e.getBoundingClientRect();
    i && this.buildElHorizontals(s.left), r && this.buildElVerticals(s.top);
  }
  // Populates the left/right internal coordinate arrays
  buildElHorizontals(e) {
    let n = [], i = [];
    for (let r of this.els) {
      let s = r.getBoundingClientRect();
      n.push(s.left - e), i.push(s.right - e);
    }
    this.lefts = n, this.rights = i;
  }
  // Populates the top/bottom internal coordinate arrays
  buildElVerticals(e) {
    let n = [], i = [];
    for (let r of this.els) {
      let s = r.getBoundingClientRect();
      n.push(s.top - e), i.push(s.bottom - e);
    }
    this.tops = n, this.bottoms = i;
  }
  // Given a left offset (from document left), returns the index of the el that it horizontally intersects.
  // If no intersection is made, returns undefined.
  leftToIndex(e) {
    let { lefts: n, rights: i } = this, r = n.length, s;
    for (s = 0; s < r; s += 1)
      if (e >= n[s] && e < i[s])
        return s;
  }
  // Given a top offset (from document top), returns the index of the el that it vertically intersects.
  // If no intersection is made, returns undefined.
  topToIndex(e) {
    let { tops: n, bottoms: i } = this, r = n.length, s;
    for (s = 0; s < r; s += 1)
      if (e >= n[s] && e < i[s])
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
    return wt(this.tops || [], e.tops || []) && wt(this.bottoms || [], e.bottoms || []) && wt(this.lefts || [], e.lefts || []) && wt(this.rights || [], e.rights || []);
  }
}
function wt(t, e) {
  const n = t.length;
  if (n !== e.length)
    return !1;
  for (let i = 0; i < n; i++)
    if (Math.round(t[i]) !== Math.round(e[i]))
      return !1;
  return !0;
}
class ki {
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
class _u extends ki {
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
class Ru extends ki {
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
class ne extends R {
  constructor() {
    super(...arguments), this.uid = Ne();
  }
  // Hit System
  // -----------------------------------------------------------------------------------------------------------------
  prepareHits() {
  }
  queryHit(e, n, i, r) {
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
class Io {
  constructor(e = (n) => n.thickness || 1) {
    this.getEntryThickness = e, this.strictOrder = !1, this.allowReslicing = !1, this.maxCoord = -1, this.maxStackCnt = -1, this.levelCoords = [], this.entriesByLevel = [], this.stackCnts = {};
  }
  addSegs(e) {
    let n = [];
    for (let i of e)
      this.insertEntry(i, n);
    return n;
  }
  insertEntry(e, n) {
    let i = this.findInsertion(e);
    this.isInsertionValid(i, e) ? this.insertEntryAt(e, i) : this.handleInvalidInsertion(i, e, n);
  }
  isInsertionValid(e, n) {
    return (this.maxCoord === -1 || e.levelCoord + this.getEntryThickness(n) <= this.maxCoord) && (this.maxStackCnt === -1 || e.stackCnt < this.maxStackCnt);
  }
  handleInvalidInsertion(e, n, i) {
    if (this.allowReslicing && e.touchingEntry) {
      const r = Object.assign(Object.assign({}, n), { span: Mi(n.span, e.touchingEntry.span) });
      i.push(r), this.splitEntry(n, e.touchingEntry, i);
    } else
      i.push(n);
  }
  /*
  Does NOT add what hit the `barrier` into hiddenEntries. Should already be done.
  */
  splitEntry(e, n, i) {
    let r = e.span, s = n.span;
    r.start < s.start && this.insertEntry({
      index: e.index,
      thickness: e.thickness,
      span: { start: r.start, end: s.start }
    }, i), r.end > s.end && this.insertEntry({
      index: e.index,
      thickness: e.thickness,
      span: { start: s.end, end: r.end }
    }, i);
  }
  insertEntryAt(e, n) {
    let { entriesByLevel: i, levelCoords: r } = this;
    n.lateral === -1 ? (_n(r, n.level, n.levelCoord), _n(i, n.level, [e])) : _n(i[n.level], n.lateral, e), this.stackCnts[Re(e)] = n.stackCnt;
  }
  /*
  does not care about limits
  */
  findInsertion(e) {
    let { levelCoords: n, entriesByLevel: i, strictOrder: r, stackCnts: s } = this, o = n.length, a = 0, l = -1, d = -1, c = null, h = 0;
    for (let g = 0; g < o; g += 1) {
      const m = n[g];
      if (!r && m >= a + this.getEntryThickness(e))
        break;
      let b = i[g], y, w = Gn(b, e.span.start, Vn), D = w[0] + w[1];
      for (
        ;
        // loop through entries that horizontally intersect
        (y = b[D]) && // but not past the whole entry list
        y.span.start < e.span.end;
      ) {
        let C = m + this.getEntryThickness(y);
        C > a && (a = C, c = y, l = g, d = D), C === a && (h = Math.max(h, s[Re(y)] + 1)), D += 1;
      }
    }
    let f = 0;
    if (c)
      for (f = l + 1; f < o && n[f] < a; )
        f += 1;
    let u = -1;
    return f < o && n[f] === a && (u = Gn(i[f], e.span.end, Vn)[0]), {
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
    let { entriesByLevel: e, levelCoords: n } = this, i = e.length, r = [];
    for (let s = 0; s < i; s += 1) {
      let o = e[s], a = n[s];
      for (let l of o)
        r.push(Object.assign(Object.assign({}, l), { thickness: this.getEntryThickness(l), levelCoord: a }));
    }
    return r;
  }
}
function Vn(t) {
  return t.span.end;
}
function Re(t) {
  return t.index + ":" + t.span.start;
}
function Tu(t) {
  let e = [];
  for (let n of t) {
    let i = [], r = {
      span: n.span,
      entries: [n]
    };
    for (let s of e)
      Mi(s.span, r.span) ? r = {
        entries: s.entries.concat(r.entries),
        span: ku(s.span, r.span)
      } : i.push(s);
    i.push(r), e = i;
  }
  return e;
}
function ku(t, e) {
  return {
    start: Math.min(t.start, e.start),
    end: Math.max(t.end, e.end)
  };
}
function Mi(t, e) {
  let n = Math.max(t.start, e.start), i = Math.min(t.end, e.end);
  return n < i ? { start: n, end: i } : null;
}
function _n(t, e, n) {
  t.splice(e, 0, n);
}
function Gn(t, e, n) {
  let i = 0, r = t.length;
  if (!r || e < n(t[i]))
    return [0, 0];
  if (e > n(t[r - 1]))
    return [r, 0];
  for (; i < r; ) {
    let s = Math.floor(i + (r - i) / 2), o = n(t[s]);
    if (e < o)
      r = s;
    else if (e > o)
      i = s + 1;
    else
      return [s, 1];
  }
  return [i, 0];
}
class Mu {
  constructor(e, n) {
    this.emitter = new un();
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
const Ii = {};
function Iu(t, e) {
  return !t || e > 10 ? O({ weekday: "short" }) : e > 1 ? O({ weekday: "short", month: "numeric", day: "numeric", omitCommas: !0 }) : O({ weekday: "long" });
}
const No = "fc-col-header-cell";
function Oo(t) {
  return t.text;
}
class Nu extends R {
  render() {
    let { dateEnv: e, options: n, theme: i, viewApi: r } = this.context, { props: s } = this, { date: o, dateProfile: a } = s, l = To(o, s.todayRange, null, a), d = [No].concat(Ri(l, i)), c = e.format(o, s.dayHeaderFormat), h = !l.isDisabled && s.colCnt > 1 ? Qt(this.context, o) : {}, f = e.toDate(o);
    e.namedTimeZoneImpl && (f = ve(f, 36e5));
    let u = Object.assign(Object.assign(Object.assign({ date: f, view: r }, s.extraRenderProps), { text: c }), l);
    return p(G, { elTag: "th", elClasses: d, elAttrs: Object.assign({ role: "columnheader", colSpan: s.colSpan, "data-date": l.isDisabled ? void 0 : pi(o) }, s.extraDataAttrs), renderProps: u, generatorName: "dayHeaderContent", customGenerator: n.dayHeaderContent, defaultGenerator: Oo, classNameGenerator: n.dayHeaderClassNames, didMount: n.dayHeaderDidMount, willUnmount: n.dayHeaderWillUnmount }, (g) => p("div", { className: "fc-scrollgrid-sync-inner" }, !l.isDisabled && p(g, { elTag: "a", elAttrs: h, elClasses: [
      "fc-col-header-cell-cushion",
      s.isSticky && "fc-sticky"
    ] })));
  }
}
const Ou = O({ weekday: "long" });
class $u extends R {
  render() {
    let { props: e } = this, { dateEnv: n, theme: i, viewApi: r, options: s } = this.context, o = z(/* @__PURE__ */ new Date(2592e5), e.dow), a = {
      dow: e.dow,
      isDisabled: !1,
      isFuture: !1,
      isPast: !1,
      isToday: !1,
      isOther: !1
    }, l = n.format(o, e.dayHeaderFormat), d = Object.assign(Object.assign(Object.assign(Object.assign({
      // TODO: make this public?
      date: o
    }, a), { view: r }), e.extraRenderProps), { text: l });
    return p(G, { elTag: "th", elClasses: [
      No,
      ...Ri(a, i),
      ...e.extraClassNames || []
    ], elAttrs: Object.assign({ role: "columnheader", colSpan: e.colSpan }, e.extraDataAttrs), renderProps: d, generatorName: "dayHeaderContent", customGenerator: s.dayHeaderContent, defaultGenerator: Oo, classNameGenerator: s.dayHeaderClassNames, didMount: s.dayHeaderDidMount, willUnmount: s.dayHeaderWillUnmount }, (c) => p(
      "div",
      { className: "fc-scrollgrid-sync-inner" },
      p(c, { elTag: "a", elClasses: [
        "fc-col-header-cell-cushion",
        e.isSticky && "fc-sticky"
      ], elAttrs: {
        "aria-label": n.format(o, Ou)
      } })
    ));
  }
}
class $o extends R {
  constructor() {
    super(...arguments), this.createDayHeaderFormatter = A(Pu);
  }
  render() {
    let { context: e } = this, { dates: n, dateProfile: i, datesRepDistinctDays: r, renderIntro: s } = this.props, o = this.createDayHeaderFormatter(e.options.dayHeaderFormat, r, n.length);
    return p(Je, { unit: "day" }, (a, l) => p(
      "tr",
      { role: "row" },
      s && s("day"),
      n.map((d) => r ? p(Nu, { key: d.toISOString(), date: d, dateProfile: i, todayRange: l, colCnt: n.length, dayHeaderFormat: o }) : p($u, { key: d.getUTCDay(), dow: d.getUTCDay(), dayHeaderFormat: o }))
    ));
  }
}
function Pu(t, e, n) {
  return t || Iu(e, n);
}
class Po {
  constructor(e, n) {
    let i = e.start, { end: r } = e, s = [], o = [], a = -1;
    for (; i < r; )
      n.isHiddenDay(i) ? s.push(a + 0.5) : (a += 1, s.push(a), o.push(i)), i = z(i, 1);
    this.dates = o, this.indices = s, this.cnt = o.length;
  }
  sliceRange(e) {
    let n = this.getDateDayIndex(e.start), i = this.getDateDayIndex(z(e.end, -1)), r = Math.max(0, n), s = Math.min(this.cnt - 1, i);
    return r = Math.ceil(r), s = Math.floor(s), r <= s ? {
      firstIndex: r,
      lastIndex: s,
      isStart: n === r,
      isEnd: i === s
    } : null;
  }
  // Given a date, returns its chronolocial cell-index from the first cell of the grid.
  // If the date lies between cells (because of hiddenDays), returns a floating-point value between offsets.
  // If before the first offset, returns a negative number.
  // If after the last offset, returns an offset past the last cell offset.
  // Only works for *start* dates of cells. Will not work for exclusive end dates for cells.
  getDateDayIndex(e) {
    let { indices: n } = this, i = Math.floor(Oe(this.dates[0], e));
    return i < 0 ? n[0] - 1 : i >= n.length ? n[n.length - 1] + 1 : n[i];
  }
}
class Ho {
  constructor(e, n) {
    let { dates: i } = e, r, s, o;
    if (n) {
      for (s = i[0].getUTCDay(), r = 1; r < i.length && i[r].getUTCDay() !== s; r += 1)
        ;
      o = Math.ceil(i.length / r);
    } else
      o = 1, r = i.length;
    this.rowCnt = o, this.colCnt = r, this.daySeries = e, this.cells = this.buildCells(), this.headerDates = this.buildHeaderDates();
  }
  buildCells() {
    let e = [];
    for (let n = 0; n < this.rowCnt; n += 1) {
      let i = [];
      for (let r = 0; r < this.colCnt; r += 1)
        i.push(this.buildCell(n, r));
      e.push(i);
    }
    return e;
  }
  buildCell(e, n) {
    let i = this.daySeries.dates[e * this.colCnt + n];
    return {
      key: i.toISOString(),
      date: i
    };
  }
  buildHeaderDates() {
    let e = [];
    for (let n = 0; n < this.colCnt; n += 1)
      e.push(this.cells[0][n].date);
    return e;
  }
  sliceRange(e) {
    let { colCnt: n } = this, i = this.daySeries.sliceRange(e), r = [];
    if (i) {
      let { firstIndex: s, lastIndex: o } = i, a = s;
      for (; a <= o; ) {
        let l = Math.floor(a / n), d = Math.min((l + 1) * n, o + 1);
        r.push({
          row: l,
          firstCol: a % n,
          lastCol: (d - 1) % n,
          isStart: i.isStart && a === s,
          isEnd: i.isEnd && d - 1 === o
        }), a = d;
      }
    }
    return r;
  }
}
class zo {
  constructor() {
    this.sliceBusinessHours = A(this._sliceBusinessHours), this.sliceDateSelection = A(this._sliceDateSpan), this.sliceEventStore = A(this._sliceEventStore), this.sliceEventDrag = A(this._sliceInteraction), this.sliceEventResize = A(this._sliceInteraction), this.forceDayIfListItem = !1;
  }
  sliceProps(e, n, i, r, ...s) {
    let { eventUiBases: o } = e, a = this.sliceEventStore(e.eventStore, o, n, i, ...s);
    return {
      dateSelectionSegs: this.sliceDateSelection(e.dateSelection, n, i, o, r, ...s),
      businessHourSegs: this.sliceBusinessHours(e.businessHours, n, i, r, ...s),
      fgEventSegs: a.fg,
      bgEventSegs: a.bg,
      eventDrag: this.sliceEventDrag(e.eventDrag, o, n, i, ...s),
      eventResize: this.sliceEventResize(e.eventResize, o, n, i, ...s),
      eventSelection: e.eventSelection
    };
  }
  sliceNowDate(e, n, i, r, ...s) {
    return this._sliceDateSpan(
      { range: { start: e, end: ve(e, 1) }, allDay: !1 },
      // add 1 ms, protect against null range
      n,
      i,
      {},
      r,
      ...s
    );
  }
  _sliceBusinessHours(e, n, i, r, ...s) {
    return e ? this._sliceEventStore(Ie(e, St(n, !!i), r), {}, n, i, ...s).bg : [];
  }
  _sliceEventStore(e, n, i, r, ...s) {
    if (e) {
      let o = Pr(e, n, St(i, !!r), r);
      return {
        bg: this.sliceEventRanges(o.bg, s),
        fg: this.sliceEventRanges(o.fg, s)
      };
    }
    return { bg: [], fg: [] };
  }
  _sliceInteraction(e, n, i, r, ...s) {
    if (!e)
      return null;
    let o = Pr(e.mutatedEvents, n, St(i, !!r), r);
    return {
      segs: this.sliceEventRanges(o.fg, s),
      affectedInstances: e.affectedEvents.instances,
      isEvent: e.isEvent
    };
  }
  _sliceDateSpan(e, n, i, r, s, ...o) {
    if (!e)
      return [];
    let a = St(n, !!i), l = Me(e.range, a);
    if (l) {
      e = Object.assign(Object.assign({}, e), { range: l });
      let d = ru(e, r, s), c = this.sliceRange(e.range, ...o);
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
    let i = [];
    for (let r of e)
      i.push(...this.sliceEventRange(r, n));
    return i;
  }
  /*
  "complete" seg means it has component and eventRange
  */
  sliceEventRange(e, n) {
    let i = e.range;
    this.forceDayIfListItem && e.ui.display === "list-item" && (i = {
      start: i.start,
      end: z(i.start, 1)
    });
    let r = this.sliceRange(i, ...n);
    for (let s of r)
      s.eventRange = e, s.isStart = e.isStart && s.isStart, s.isEnd = e.isEnd && s.isEnd;
    return r;
  }
}
function St(t, e) {
  let n = t.activeRange;
  return e ? n : {
    start: ve(n.start, t.slotMinTime.milliseconds),
    end: ve(n.end, t.slotMaxTime.milliseconds - 864e5)
    // 864e5 = ms in a day
  };
}
function Bo(t, e, n) {
  let { instances: i } = t.mutatedEvents;
  for (let r in i)
    if (!cn(e.validRange, i[r].range))
      return !1;
  return Lo({ eventDrag: t }, n);
}
function Hu(t, e, n) {
  return cn(e.validRange, t.range) ? Lo({ dateSelection: t }, n) : !1;
}
function Lo(t, e) {
  let n = e.getCurrentData(), i = Object.assign({ businessHours: n.businessHours, dateSelection: "", eventStore: n.eventStore, eventUiBases: n.eventUiBases, eventSelection: "", eventDrag: null, eventResize: null }, t);
  return (e.pluginHooks.isPropsValid || zu)(i, e);
}
function zu(t, e, n = {}, i) {
  return !(t.eventDrag && !Bu(t, e, n, i) || t.dateSelection && !Lu(t, e, n, i));
}
function Bu(t, e, n, i) {
  let r = e.getCurrentData(), s = t.eventDrag, o = s.mutatedEvents, a = o.defs, l = o.instances, d = Yt(a, s.isEvent ? t.eventUiBases : { "": r.selectionConfig });
  i && (d = oe(d, i));
  let c = Pd(t.eventStore, s.affectedEvents.instances), h = c.defs, f = c.instances, u = Yt(h, t.eventUiBases);
  for (let g in l) {
    let m = l[g], b = m.range, y = d[m.defId], w = a[m.defId];
    if (!Uo(y.constraints, b, c, t.businessHours, e))
      return !1;
    let { eventOverlap: D } = e.options, C = typeof D == "function" ? D : null;
    for (let T in f) {
      let I = f[T];
      if (Ei(b, I.range) && (u[I.defId].overlap === !1 && s.isEvent || y.overlap === !1 || C && !C(
        new N(e, h[I.defId], I),
        // still event
        new N(e, w, m)
      )))
        return !1;
    }
    let P = r.eventStore;
    for (let T of y.allows) {
      let I = Object.assign(Object.assign({}, n), { range: m.range, allDay: w.allDay }), _ = P.defs[w.defId], de = P.instances[g], nt;
      if (_ ? nt = new N(e, _, de) : nt = new N(e, w), !T(Ci(I, e), nt))
        return !1;
    }
  }
  return !0;
}
function Lu(t, e, n, i) {
  let r = t.eventStore, s = r.defs, o = r.instances, a = t.dateSelection, l = a.range, { selectionConfig: d } = e.getCurrentData();
  if (i && (d = i(d)), !Uo(d.constraints, l, r, t.businessHours, e))
    return !1;
  let { selectOverlap: c } = e.options, h = typeof c == "function" ? c : null;
  for (let f in o) {
    let u = o[f];
    if (Ei(l, u.range) && (d.overlap === !1 || h && !h(new N(e, s[u.defId], u), null)))
      return !1;
  }
  for (let f of d.allows) {
    let u = Object.assign(Object.assign({}, n), a);
    if (!f(Ci(u, e), null))
      return !1;
  }
  return !0;
}
function Uo(t, e, n, i, r) {
  for (let s of t)
    if (!Fu(Uu(s, e, n, i, r), e))
      return !1;
  return !0;
}
function Uu(t, e, n, i, r) {
  return t === "businessHours" ? Rn(Ie(i, e, r)) : typeof t == "string" ? Rn(dn(n, (s) => s.groupId === t)) : typeof t == "object" && t ? Rn(Ie(t, e, r)) : [];
}
function Rn(t) {
  let { instances: e } = t, n = [];
  for (let i in e)
    n.push(e[i].range);
  return n;
}
function Fu(t, e) {
  for (let n of t)
    if (cn(n, e))
      return !0;
  return !1;
}
const At = /^(visible|hidden)$/;
class ju extends R {
  constructor() {
    super(...arguments), this.handleEl = (e) => {
      this.el = e, ee(this.props.elRef, e);
    };
  }
  render() {
    let { props: e } = this, { liquid: n, liquidIsAbsolute: i } = e, r = n && i, s = ["fc-scroller"];
    return n && (i ? s.push("fc-scroller-liquid-absolute") : s.push("fc-scroller-liquid")), p("div", { ref: this.handleEl, className: s.join(" "), style: {
      overflowX: e.overflowX,
      overflowY: e.overflowY,
      left: r && -(e.overcomeLeft || 0) || "",
      right: r && -(e.overcomeRight || 0) || "",
      bottom: r && -(e.overcomeBottom || 0) || "",
      marginLeft: !r && -(e.overcomeLeft || 0) || "",
      marginRight: !r && -(e.overcomeRight || 0) || "",
      marginBottom: !r && -(e.overcomeBottom || 0) || "",
      maxHeight: e.maxHeight || ""
    } }, e.children);
  }
  needsXScrolling() {
    if (At.test(this.props.overflowX))
      return !1;
    let { el: e } = this, n = this.el.getBoundingClientRect().width - this.getYScrollbarWidth(), { children: i } = e;
    for (let r = 0; r < i.length; r += 1)
      if (i[r].getBoundingClientRect().width > n)
        return !0;
    return !1;
  }
  needsYScrolling() {
    if (At.test(this.props.overflowY))
      return !1;
    let { el: e } = this, n = this.el.getBoundingClientRect().height - this.getXScrollbarWidth(), { children: i } = e;
    for (let r = 0; r < i.length; r += 1)
      if (i[r].getBoundingClientRect().height > n)
        return !0;
    return !1;
  }
  getXScrollbarWidth() {
    return At.test(this.props.overflowX) ? 0 : this.el.offsetHeight - this.el.clientHeight;
  }
  getYScrollbarWidth() {
    return At.test(this.props.overflowY) ? 0 : this.el.offsetWidth - this.el.clientWidth;
  }
}
class re {
  constructor(e) {
    this.masterCallback = e, this.currentMap = {}, this.depths = {}, this.callbackMap = {}, this.handleValue = (n, i) => {
      let { depths: r, currentMap: s } = this, o = !1, a = !1;
      n !== null ? (o = i in s, s[i] = n, r[i] = (r[i] || 0) + 1, a = !0) : (r[i] -= 1, r[i] || (delete s[i], delete this.callbackMap[i], o = !0)), this.masterCallback && (o && this.masterCallback(null, String(i)), a && this.masterCallback(n, String(i)));
    };
  }
  createRef(e) {
    let n = this.callbackMap[e];
    return n || (n = this.callbackMap[e] = (i) => {
      this.handleValue(i, String(e));
    }), n;
  }
  // TODO: check callers that don't care about order. should use getAll instead
  // NOTE: this method has become less valuable now that we are encouraged to map order by some other index
  // TODO: provide ONE array-export function, buildArray, which fails on non-numeric indexes. caller can manipulate and "collect"
  collect(e, n, i) {
    return td(this.currentMap, e, n, i);
  }
  getAll() {
    return bi(this.currentMap);
  }
}
function Wu(t) {
  let e = Jl(t, ".fc-scrollgrid-shrink"), n = 0;
  for (let i of e)
    n = Math.max(n, hc(i));
  return Math.ceil(n);
}
function Fo(t, e) {
  return t.liquid && e.liquid;
}
function Vu(t, e) {
  return e.maxHeight != null || // if its possible for the height to max out, we might need scrollbars
  Fo(t, e);
}
function Gu(t, e, n, i) {
  let { expandRows: r } = n;
  return typeof e.content == "function" ? e.content(n) : p("table", {
    role: "presentation",
    className: [
      e.tableClassName,
      t.syncRowHeights ? "fc-scrollgrid-sync-table" : ""
    ].join(" "),
    style: {
      minWidth: n.tableMinWidth,
      width: n.clientWidth,
      height: r ? n.clientHeight : ""
      // css `height` on a <table> serves as a min-height
    }
  }, n.tableColGroupNode, p(i ? "thead" : "tbody", {
    role: "presentation"
  }, typeof e.rowContent == "function" ? e.rowContent(n) : e.rowContent));
}
function qu(t, e) {
  return me(t, e, Z);
}
function Yu(t, e) {
  let n = [];
  for (let i of t) {
    let r = i.span || 1;
    for (let s = 0; s < r; s += 1)
      n.push(p("col", { style: {
        width: i.width === "shrink" ? Qu(e) : i.width || "",
        minWidth: i.minWidth || ""
      } }));
  }
  return p("colgroup", {}, ...n);
}
function Qu(t) {
  return t ?? 4;
}
function Zu(t) {
  for (let e of t)
    if (e.width === "shrink")
      return !0;
  return !1;
}
function Ku(t, e) {
  let n = [
    "fc-scrollgrid",
    e.theme.getClass("table")
  ];
  return t && n.push("fc-scrollgrid-liquid"), n;
}
function Xu(t, e) {
  let n = [
    "fc-scrollgrid-section",
    `fc-scrollgrid-section-${t.type}`,
    t.className
    // used?
  ];
  return e && t.liquid && t.maxHeight == null && n.push("fc-scrollgrid-section-liquid"), t.isSticky && n.push("fc-scrollgrid-section-sticky"), n;
}
function qn(t) {
  return p("div", { className: "fc-scrollgrid-sticky-shim", style: {
    width: t.clientWidth,
    minWidth: t.tableMinWidth
  } });
}
function Zt(t) {
  let { stickyHeaderDates: e } = t;
  return (e == null || e === "auto") && (e = t.height === "auto" || t.viewHeight === "auto"), e;
}
function jo(t) {
  let { stickyFooterScrollbar: e } = t;
  return (e == null || e === "auto") && (e = t.height === "auto" || t.viewHeight === "auto"), e;
}
class Ni extends R {
  constructor() {
    super(...arguments), this.processCols = A((e) => e, qu), this.renderMicroColGroup = A(Yu), this.scrollerRefs = new re(), this.scrollerElRefs = new re(this._handleScrollerEl.bind(this)), this.state = {
      shrinkWidth: null,
      forceYScrollbars: !1,
      scrollerClientWidths: {},
      scrollerClientHeights: {}
    }, this.handleSizing = () => {
      this.safeSetState(Object.assign({ shrinkWidth: this.computeShrinkWidth() }, this.computeScrollerDims()));
    };
  }
  render() {
    let { props: e, state: n, context: i } = this, r = e.sections || [], s = this.processCols(e.cols), o = this.renderMicroColGroup(s, n.shrinkWidth), a = Ku(e.liquid, i);
    e.collapsibleWidth && a.push("fc-scrollgrid-collapsible");
    let l = r.length, d = 0, c, h = [], f = [], u = [];
    for (; d < l && (c = r[d]).type === "header"; )
      h.push(this.renderSection(c, o, !0)), d += 1;
    for (; d < l && (c = r[d]).type === "body"; )
      f.push(this.renderSection(c, o, !1)), d += 1;
    for (; d < l && (c = r[d]).type === "footer"; )
      u.push(this.renderSection(c, o, !0)), d += 1;
    let g = !_o();
    const m = { role: "rowgroup" };
    return p("table", {
      role: "grid",
      className: a.join(" "),
      style: { height: e.height }
    }, !!(!g && h.length) && p("thead", m, ...h), !!(!g && f.length) && p("tbody", m, ...f), !!(!g && u.length) && p("tfoot", m, ...u), g && p("tbody", m, ...h, ...f, ...u));
  }
  renderSection(e, n, i) {
    return "outerContent" in e ? p(k, { key: e.key }, e.outerContent) : p("tr", { key: e.key, role: "presentation", className: Xu(e, this.props.liquid).join(" ") }, this.renderChunkTd(e, n, e.chunk, i));
  }
  renderChunkTd(e, n, i, r) {
    if ("outerContent" in i)
      return i.outerContent;
    let { props: s } = this, { forceYScrollbars: o, scrollerClientWidths: a, scrollerClientHeights: l } = this.state, d = Vu(s, e), c = Fo(s, e), h = s.liquid ? o ? "scroll" : d ? "auto" : "hidden" : "visible", f = e.key, u = Gu(e, i, {
      tableColGroupNode: n,
      tableMinWidth: "",
      clientWidth: !s.collapsibleWidth && a[f] !== void 0 ? a[f] : null,
      clientHeight: l[f] !== void 0 ? l[f] : null,
      expandRows: e.expandRows,
      syncRowHeights: !1,
      rowSyncHeights: [],
      reportRowHeightChange: () => {
      }
    }, r);
    return p(r ? "th" : "td", {
      ref: i.elRef,
      role: "presentation"
    }, p(
      "div",
      { className: `fc-scroller-harness${c ? " fc-scroller-harness-liquid" : ""}` },
      p(ju, { ref: this.scrollerRefs.createRef(f), elRef: this.scrollerElRefs.createRef(f), overflowY: h, overflowX: s.liquid ? "hidden" : "visible", maxHeight: e.maxHeight, liquid: c, liquidIsAbsolute: !0 }, u)
    ));
  }
  _handleScrollerEl(e, n) {
    let i = Ju(this.props.sections, n);
    i && ee(i.chunk.scrollerElRef, e);
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
    return Zu(this.props.cols) ? Wu(this.scrollerElRefs.getAll()) : 0;
  }
  computeScrollerDims() {
    let e = Su(), { scrollerRefs: n, scrollerElRefs: i } = this, r = !1, s = {}, o = {};
    for (let a in n.currentMap) {
      let l = n.currentMap[a];
      if (l && l.needsYScrolling()) {
        r = !0;
        break;
      }
    }
    for (let a of this.props.sections) {
      let l = a.key, d = i.currentMap[l];
      if (d) {
        let c = d.parentNode;
        s[l] = Math.floor(c.getBoundingClientRect().width - (r ? e.y : 0)), o[l] = Math.floor(c.getBoundingClientRect().height);
      }
    }
    return { forceYScrollbars: r, scrollerClientWidths: s, scrollerClientHeights: o };
  }
}
Ni.addStateEquality({
  scrollerClientWidths: Z,
  scrollerClientHeights: Z
});
function Ju(t, e) {
  for (let n of t)
    if (n.key === e)
      return n;
  return null;
}
class Oi extends R {
  constructor() {
    super(...arguments), this.buildPublicEvent = A((e, n, i) => new N(e, n, i)), this.handleEl = (e) => {
      this.el = e, ee(this.props.elRef, e), e && Hr(e, this.props.seg);
    };
  }
  render() {
    const { props: e, context: n } = this, { options: i } = n, { seg: r } = e, { eventRange: s } = r, { ui: o } = s, a = {
      event: this.buildPublicEvent(n, s.def, s.instance),
      view: n.viewApi,
      timeText: e.timeText,
      textColor: o.textColor,
      backgroundColor: o.backgroundColor,
      borderColor: o.borderColor,
      isDraggable: !e.disableDragging && Yd(r, n),
      isStartResizable: !e.disableResizing && Qd(r, n),
      isEndResizable: !e.disableResizing && Zd(r),
      isMirror: !!(e.isDragging || e.isResizing || e.isDateSelecting),
      isStart: !!r.isStart,
      isEnd: !!r.isEnd,
      isPast: !!e.isPast,
      isFuture: !!e.isFuture,
      isToday: !!e.isToday,
      isSelected: !!e.isSelected,
      isDragging: !!e.isDragging,
      isResizing: !!e.isResizing
    };
    return p(G, { elRef: this.handleEl, elTag: e.elTag, elAttrs: e.elAttrs, elClasses: [
      ...Kd(a),
      ...r.eventRange.ui.classNames,
      ...e.elClasses || []
    ], elStyle: e.elStyle, renderProps: a, generatorName: "eventContent", customGenerator: i.eventContent, defaultGenerator: e.defaultGenerator, classNameGenerator: i.eventClassNames, didMount: i.eventDidMount, willUnmount: i.eventWillUnmount }, e.children);
  }
  componentDidUpdate(e) {
    this.el && this.props.seg !== e.seg && Hr(this.el, this.props.seg);
  }
}
class $i extends R {
  render() {
    let { props: e, context: n } = this, { options: i } = n, { seg: r } = e, { ui: s } = r.eventRange, o = i.eventTimeFormat || e.defaultTimeFormat, a = So(r, o, n, e.defaultDisplayEventTime, e.defaultDisplayEventEnd);
    return p(Oi, Object.assign({}, e, { elTag: "a", elStyle: {
      borderColor: s.borderColor,
      backgroundColor: s.backgroundColor
    }, elAttrs: Do(r, n), defaultGenerator: ef, timeText: a }), (l, d) => p(
      k,
      null,
      p(l, { elTag: "div", elClasses: ["fc-event-main"], elStyle: { color: d.textColor } }),
      !!d.isStartResizable && p("div", { className: "fc-event-resizer fc-event-resizer-start" }),
      !!d.isEndResizable && p("div", { className: "fc-event-resizer fc-event-resizer-end" })
    ));
  }
}
$i.addPropsEquality({
  seg: Z
});
function ef(t) {
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
const Pi = (t) => p(ae.Consumer, null, (e) => {
  let { options: n } = e, i = {
    isAxis: t.isAxis,
    date: e.dateEnv.toDate(t.date),
    view: e.viewApi
  };
  return p(G, { elRef: t.elRef, elTag: t.elTag || "div", elAttrs: t.elAttrs, elClasses: t.elClasses, elStyle: t.elStyle, renderProps: i, generatorName: "nowIndicatorContent", customGenerator: n.nowIndicatorContent, classNameGenerator: n.nowIndicatorClassNames, didMount: n.nowIndicatorDidMount, willUnmount: n.nowIndicatorWillUnmount }, t.children);
}), tf = O({ day: "numeric" });
class Hi extends R {
  constructor() {
    super(...arguments), this.refineRenderProps = Mt(nf);
  }
  render() {
    let { props: e, context: n } = this, { options: i } = n, r = this.refineRenderProps({
      date: e.date,
      dateProfile: e.dateProfile,
      todayRange: e.todayRange,
      isMonthStart: e.isMonthStart || !1,
      showDayNumber: e.showDayNumber,
      extraRenderProps: e.extraRenderProps,
      viewApi: n.viewApi,
      dateEnv: n.dateEnv,
      monthStartFormat: i.monthStartFormat
    });
    return p(G, { elRef: e.elRef, elTag: e.elTag, elAttrs: Object.assign(Object.assign({}, e.elAttrs), r.isDisabled ? {} : { "data-date": pi(e.date) }), elClasses: [
      ...Ri(r, n.theme),
      ...e.elClasses || []
    ], elStyle: e.elStyle, renderProps: r, generatorName: "dayCellContent", customGenerator: i.dayCellContent, defaultGenerator: e.defaultGenerator, classNameGenerator: (
      // don't use custom classNames if disabled
      r.isDisabled ? void 0 : i.dayCellClassNames
    ), didMount: i.dayCellDidMount, willUnmount: i.dayCellWillUnmount }, e.children);
  }
}
function zi(t) {
  return !!(t.dayCellContent || Un("dayCellContent", t));
}
function nf(t) {
  let { date: e, dateEnv: n, dateProfile: i, isMonthStart: r } = t, s = To(e, t.todayRange, null, i), o = t.showDayNumber ? n.format(e, r ? t.monthStartFormat : tf) : "";
  return Object.assign(Object.assign(Object.assign({ date: n.toDate(e), view: t.viewApi }, s), {
    isMonthStart: r,
    dayNumberText: o
  }), t.extraRenderProps);
}
class Wo extends R {
  render() {
    let { props: e } = this, { seg: n } = e;
    return p(Oi, { elTag: "div", elClasses: ["fc-bg-event"], elStyle: { backgroundColor: n.eventRange.ui.backgroundColor }, defaultGenerator: rf, seg: n, timeText: "", isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: !1, isPast: e.isPast, isFuture: e.isFuture, isToday: e.isToday, disableDragging: !0, disableResizing: !0 });
  }
}
function rf(t) {
  let { title: e } = t.event;
  return e && p("div", { className: "fc-event-title" }, t.event.title);
}
function Vo(t) {
  return p("div", { className: `fc-${t}` });
}
const Go = (t) => p(ae.Consumer, null, (e) => {
  let { dateEnv: n, options: i } = e, { date: r } = t, s = i.weekNumberFormat || t.defaultFormat, o = n.computeWeekNumber(r), a = n.format(r, s), l = { num: o, text: a, date: r };
  return p(
    G,
    { elRef: t.elRef, elTag: t.elTag, elAttrs: t.elAttrs, elClasses: t.elClasses, elStyle: t.elStyle, renderProps: l, generatorName: "weekNumberContent", customGenerator: i.weekNumberContent, defaultGenerator: sf, classNameGenerator: i.weekNumberClassNames, didMount: i.weekNumberDidMount, willUnmount: i.weekNumberWillUnmount },
    t.children
  );
});
function sf(t) {
  return t.text;
}
const Tn = 10;
class of extends R {
  constructor() {
    super(...arguments), this.state = {
      titleId: an()
    }, this.handleRootEl = (e) => {
      this.rootEl = e, this.props.elRef && ee(this.props.elRef, e);
    }, this.handleDocumentMouseDown = (e) => {
      const n = Ys(e);
      this.rootEl.contains(n) || this.handleCloseClick();
    }, this.handleDocumentKeyDown = (e) => {
      e.key === "Escape" && this.handleCloseClick();
    }, this.handleCloseClick = () => {
      let { onClose: e } = this.props;
      e && e();
    };
  }
  render() {
    let { theme: e, options: n } = this.context, { props: i, state: r } = this, s = [
      "fc-popover",
      e.getClass("popover")
    ].concat(i.extraClassNames || []);
    return Bl(p(
      "div",
      Object.assign({}, i.extraAttrs, { id: i.id, className: s.join(" "), "aria-labelledby": r.titleId, ref: this.handleRootEl }),
      p(
        "div",
        { className: "fc-popover-header " + e.getClass("popoverHeader") },
        p("span", { className: "fc-popover-title", id: r.titleId }, i.title),
        p("span", { className: "fc-popover-close " + e.getIconClass("close"), title: n.closeHint, onClick: this.handleCloseClick })
      ),
      p("div", { className: "fc-popover-body " + e.getClass("popoverContent") }, i.children)
    ), i.parentEl);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleDocumentMouseDown), document.addEventListener("keydown", this.handleDocumentKeyDown), this.updateSize();
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleDocumentMouseDown), document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }
  updateSize() {
    let { isRtl: e } = this.context, { alignmentEl: n, alignGridTop: i } = this.props, { rootEl: r } = this, s = xu(n);
    if (s) {
      let o = r.getBoundingClientRect(), a = i ? B(n, ".fc-scrollgrid").getBoundingClientRect().top : s.top, l = e ? s.right - o.width : s.left;
      a = Math.max(a, Tn), l = Math.min(l, document.documentElement.clientWidth - Tn - o.width), l = Math.max(l, Tn);
      let d = r.offsetParent.getBoundingClientRect();
      ot(r, {
        top: a - d.top,
        left: l - d.left
      });
    }
  }
}
class af extends ne {
  constructor() {
    super(...arguments), this.handleRootEl = (e) => {
      this.rootEl = e, e ? this.context.registerInteractiveComponent(this, {
        el: e,
        useEventCenter: !1
      }) : this.context.unregisterInteractiveComponent(this);
    };
  }
  render() {
    let { options: e, dateEnv: n } = this.context, { props: i } = this, { startDate: r, todayRange: s, dateProfile: o } = i, a = n.format(r, e.dayPopoverFormat);
    return p(Hi, { elRef: this.handleRootEl, date: r, dateProfile: o, todayRange: s }, (l, d, c) => p(
      of,
      { elRef: c.ref, id: i.id, title: a, extraClassNames: ["fc-more-popover"].concat(c.className || []), extraAttrs: c, parentEl: i.parentEl, alignmentEl: i.alignmentEl, alignGridTop: i.alignGridTop, onClose: i.onClose },
      zi(e) && p(l, { elTag: "div", elClasses: ["fc-more-popover-misc"] }),
      i.children
    ));
  }
  queryHit(e, n, i, r) {
    let { rootEl: s, props: o } = this;
    return e >= 0 && e < i && n >= 0 && n < r ? {
      dateProfile: o.dateProfile,
      dateSpan: Object.assign({ allDay: !o.forceTimed, range: {
        start: o.startDate,
        end: o.endDate
      } }, o.extraDateSpan),
      dayEl: s,
      rect: {
        left: 0,
        top: 0,
        right: i,
        bottom: r
      },
      layer: 1
      // important when comparing with hits from other components
    } : null;
  }
}
class qo extends R {
  constructor() {
    super(...arguments), this.state = {
      isPopoverOpen: !1,
      popoverId: an()
    }, this.handleLinkEl = (e) => {
      this.linkEl = e, this.props.elRef && ee(this.props.elRef, e);
    }, this.handleClick = (e) => {
      let { props: n, context: i } = this, { moreLinkClick: r } = i.options, s = Br(n).start;
      function o(a) {
        let { def: l, instance: d, range: c } = a.eventRange;
        return {
          event: new N(i, l, d),
          start: i.dateEnv.toDate(c.start),
          end: i.dateEnv.toDate(c.end),
          isStart: a.isStart,
          isEnd: a.isEnd
        };
      }
      typeof r == "function" && (r = r({
        date: s,
        allDay: !!n.allDayDate,
        allSegs: n.allSegs.map(o),
        hiddenSegs: n.hiddenSegs.map(o),
        jsEvent: e,
        view: i.viewApi
      })), !r || r === "popover" ? this.setState({ isPopoverOpen: !0 }) : typeof r == "string" && i.calendarApi.zoomTo(s, r);
    }, this.handlePopoverClose = () => {
      this.setState({ isPopoverOpen: !1 });
    };
  }
  render() {
    let { props: e, state: n } = this;
    return p(ae.Consumer, null, (i) => {
      let { viewApi: r, options: s, calendarApi: o } = i, { moreLinkText: a } = s, { moreCnt: l } = e, d = Br(e), c = typeof a == "function" ? a.call(o, l) : `+${l} ${a}`, h = at(s.moreLinkHint, [l], c), f = {
        num: l,
        shortText: `+${l}`,
        text: c,
        view: r
      };
      return p(
        k,
        null,
        !!e.moreCnt && p(G, { elTag: e.elTag || "a", elRef: this.handleLinkEl, elClasses: [
          ...e.elClasses || [],
          "fc-more-link"
        ], elStyle: e.elStyle, elAttrs: Object.assign(Object.assign(Object.assign({}, e.elAttrs), Zs(this.handleClick)), { title: h, "aria-expanded": n.isPopoverOpen, "aria-controls": n.isPopoverOpen ? n.popoverId : "" }), renderProps: f, generatorName: "moreLinkContent", customGenerator: s.moreLinkContent, defaultGenerator: e.defaultGenerator || lf, classNameGenerator: s.moreLinkClassNames, didMount: s.moreLinkDidMount, willUnmount: s.moreLinkWillUnmount }, e.children),
        n.isPopoverOpen && p(af, { id: n.popoverId, startDate: d.start, endDate: d.end, dateProfile: e.dateProfile, todayRange: e.todayRange, extraDateSpan: e.extraDateSpan, parentEl: this.parentEl, alignmentEl: e.alignmentElRef ? e.alignmentElRef.current : this.linkEl, alignGridTop: e.alignGridTop, forceTimed: e.forceTimed, onClose: this.handlePopoverClose }, e.popoverContent())
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
function lf(t) {
  return t.text;
}
function Br(t) {
  if (t.allDayDate)
    return {
      start: t.allDayDate,
      end: z(t.allDayDate, 1)
    };
  let { hiddenSegs: e } = t;
  return {
    start: Yo(e),
    end: df(e)
  };
}
function Yo(t) {
  return t.reduce(cf).eventRange.range.start;
}
function cf(t, e) {
  return t.eventRange.range.start < e.eventRange.range.start ? t : e;
}
function df(t) {
  return t.reduce(uf).eventRange.range.end;
}
function uf(t, e) {
  return t.eventRange.range.end > e.eventRange.range.end ? t : e;
}
const ff = [], Qo = {
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
}, Zo = Object.assign(Object.assign({}, Qo), {
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
function hf(t) {
  let e = t.length > 0 ? t[0].code : "en", n = ff.concat(t), i = {
    en: Zo
  };
  for (let r of n)
    i[r.code] = r;
  return {
    map: i,
    defaultCode: e
  };
}
function Ko(t, e) {
  return typeof t == "object" && !Array.isArray(t) ? Xo(t.code, [t.code], t) : pf(t, e);
}
function pf(t, e) {
  let n = [].concat(t || []), i = gf(n, e) || Zo;
  return Xo(t, n, i);
}
function gf(t, e) {
  for (let n = 0; n < t.length; n += 1) {
    let i = t[n].toLocaleLowerCase().split("-");
    for (let r = i.length; r > 0; r -= 1) {
      let s = i.slice(0, r).join("-");
      if (e[s])
        return e[s];
    }
  }
  return null;
}
function Xo(t, e, n) {
  let i = vi([Qo, n], ["buttonText"]);
  delete i.code;
  let { week: r } = i;
  return delete i.week, {
    codeArg: t,
    codes: e,
    week: r,
    simpleNumberFormat: new Intl.NumberFormat(t),
    options: i
  };
}
function le(t) {
  return {
    id: Ne(),
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
function mf(t, e) {
  let n = {}, i = {
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
  function r(s) {
    for (let o of s) {
      const a = o.name, l = n[a];
      l === void 0 ? (n[a] = o.id, r(o.deps), i = bf(i, o)) : l !== o.id && console.warn(`Duplicate plugin '${a}'`);
    }
  }
  return t && r(t), r(e), i;
}
function vf() {
  let t = [], e = [], n;
  return (i, r) => ((!n || !me(i, t) || !me(r, e)) && (n = mf(i, r)), t = i, e = r, n);
}
function bf(t, e) {
  return {
    premiumReleaseDate: yf(t.premiumReleaseDate, e.premiumReleaseDate),
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
function yf(t, e) {
  return t === void 0 ? e : e === void 0 ? t : new Date(Math.max(t.valueOf(), e.valueOf()));
}
class Ee extends gt {
}
Ee.prototype.classes = {
  root: "fc-theme-standard",
  tableCellShaded: "fc-cell-shaded",
  buttonGroup: "fc-button-group",
  button: "fc-button fc-button-primary",
  buttonActive: "fc-button-active"
};
Ee.prototype.baseIconClass = "fc-icon";
Ee.prototype.iconClasses = {
  close: "fc-icon-x",
  prev: "fc-icon-chevron-left",
  next: "fc-icon-chevron-right",
  prevYear: "fc-icon-chevrons-left",
  nextYear: "fc-icon-chevrons-right"
};
Ee.prototype.rtlIconClasses = {
  prev: "fc-icon-chevron-right",
  next: "fc-icon-chevron-left",
  prevYear: "fc-icon-chevrons-right",
  nextYear: "fc-icon-chevrons-left"
};
Ee.prototype.iconOverrideOption = "buttonIcons";
Ee.prototype.iconOverrideCustomButtonOption = "icon";
Ee.prototype.iconOverridePrefix = "fc-icon-";
function Ef(t, e) {
  let n = {}, i;
  for (i in t)
    Yn(i, n, t, e);
  for (i in e)
    Yn(i, n, t, e);
  return n;
}
function Yn(t, e, n, i) {
  if (e[t])
    return e[t];
  let r = wf(t, e, n, i);
  return r && (e[t] = r), r;
}
function wf(t, e, n, i) {
  let r = n[t], s = i[t], o = (c) => r && r[c] !== null ? r[c] : s && s[c] !== null ? s[c] : null, a = o("component"), l = o("superType"), d = null;
  if (l) {
    if (l === t)
      throw new Error("Can't have a custom view type that references itself");
    d = Yn(l, e, n, i);
  }
  return !a && d && (a = d.component), a ? {
    type: t,
    component: a,
    defaults: Object.assign(Object.assign({}, d ? d.defaults : {}), r ? r.rawOptions : {}),
    overrides: Object.assign(Object.assign({}, d ? d.overrides : {}), s ? s.rawOptions : {})
  } : null;
}
function Lr(t) {
  return oe(t, Sf);
}
function Sf(t) {
  let e = typeof t == "function" ? { component: t } : t, { component: n } = e;
  return e.content ? n = Ur(e) : n && !(n.prototype instanceof R) && (n = Ur(Object.assign(Object.assign({}, e), { content: n }))), {
    superType: e.type,
    component: n,
    rawOptions: e
    // includes type and component too :(
  };
}
function Ur(t) {
  return (e) => p(ae.Consumer, null, (n) => p(G, { elTag: "div", elClasses: so(n.viewSpec), renderProps: Object.assign(Object.assign({}, e), { nextDayThreshold: n.options.nextDayThreshold }), generatorName: void 0, customGenerator: t.content, classNameGenerator: t.classNames, didMount: t.didMount, willUnmount: t.willUnmount }));
}
function Af(t, e, n, i) {
  let r = Lr(t), s = Lr(e.views), o = Ef(r, s);
  return oe(o, (a) => Df(a, s, e, n, i));
}
function Df(t, e, n, i, r) {
  let s = t.overrides.duration || t.defaults.duration || i.duration || n.duration, o = null, a = "", l = "", d = {};
  if (s && (o = Cf(s), o)) {
    let f = Ln(o);
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
    buttonTextOverride: c(i) || c(n) || // constructor-specified buttonText lookup hash takes precedence
    t.overrides.buttonText,
    buttonTextDefault: c(r) || t.defaults.buttonText || c(lt) || t.type,
    // not DRY
    buttonTitleOverride: h(i) || h(n) || t.overrides.buttonHint,
    buttonTitleDefault: h(r) || t.defaults.buttonHint || h(lt)
    // will eventually fall back to buttonText
  };
}
let Fr = {};
function Cf(t) {
  let e = JSON.stringify(t), n = Fr[e];
  return n === void 0 && (n = x(t), Fr[e] = n), n;
}
function xf(t, e) {
  return e.type === "CHANGE_VIEW_TYPE" && (t = e.viewType), t;
}
function _f(t, e) {
  return e.type === "CHANGE_DATE" ? e.dateMarker : t;
}
function Rf(t, e, n) {
  let i = t.initialDate;
  return i != null ? e.createMarker(i) : n.getDateMarker();
}
function Tf(t, e) {
  return e.type === "SET_OPTION" ? Object.assign(Object.assign({}, t), { [e.optionName]: e.rawOptionValue }) : t;
}
function kf(t, e, n, i) {
  let r;
  switch (e.type) {
    case "CHANGE_VIEW_TYPE":
      return i.build(e.dateMarker || n);
    case "CHANGE_DATE":
      return i.build(e.dateMarker);
    case "PREV":
      if (r = i.buildPrev(t, n), r.isValid)
        return r;
      break;
    case "NEXT":
      if (r = i.buildNext(t, n), r.isValid)
        return r;
      break;
  }
  return t;
}
function Mf(t, e, n) {
  let i = e ? e.activeRange : null;
  return ea({}, zf(t, n), i, n);
}
function If(t, e, n, i) {
  let r = n ? n.activeRange : null;
  switch (e.type) {
    case "ADD_EVENT_SOURCES":
      return ea(t, e.sources, r, i);
    case "REMOVE_EVENT_SOURCE":
      return Of(t, e.sourceId);
    case "PREV":
    // TODO: how do we track all actions that affect dateProfile :(
    case "NEXT":
    case "CHANGE_DATE":
    case "CHANGE_VIEW_TYPE":
      return n ? ta(t, r, i) : t;
    case "FETCH_EVENT_SOURCES":
      return Bi(t, e.sourceIds ? (
        // why no type?
        eo(e.sourceIds)
      ) : na(t, i), r, e.isRefetch || !1, i);
    case "RECEIVE_EVENTS":
    case "RECEIVE_EVENT_ERROR":
      return Hf(t, e.sourceId, e.fetchId, e.fetchRange);
    case "REMOVE_ALL_EVENT_SOURCES":
      return {};
    default:
      return t;
  }
}
function Nf(t, e, n) {
  let i = e ? e.activeRange : null;
  return Bi(t, na(t, n), i, !0, n);
}
function Jo(t) {
  for (let e in t)
    if (t[e].isFetching)
      return !0;
  return !1;
}
function ea(t, e, n, i) {
  let r = {};
  for (let s of e)
    r[s.sourceId] = s;
  return n && (r = ta(r, n, i)), Object.assign(Object.assign({}, t), r);
}
function Of(t, e) {
  return ke(t, (n) => n.sourceId !== e);
}
function ta(t, e, n) {
  return Bi(t, ke(t, (i) => $f(i, e, n)), e, !1, n);
}
function $f(t, e, n) {
  return ia(t, n) ? !n.options.lazyFetching || !t.fetchRange || t.isFetching || // always cancel outdated in-progress fetches
  e.start < t.fetchRange.start || e.end > t.fetchRange.end : !t.latestFetchId;
}
function Bi(t, e, n, i, r) {
  let s = {};
  for (let o in t) {
    let a = t[o];
    e[o] ? s[o] = Pf(a, n, i, r) : s[o] = a;
  }
  return s;
}
function Pf(t, e, n, i) {
  let { options: r, calendarApi: s } = i, o = i.pluginHooks.eventSourceDefs[t.sourceDefId], a = Ne();
  return o.fetch({
    eventSource: t,
    range: e,
    isRefetch: n,
    context: i
  }, (l) => {
    let { rawEvents: d } = l;
    r.eventSourceSuccess && (d = r.eventSourceSuccess.call(s, d, l.response) || d), t.success && (d = t.success.call(s, d, l.response) || d), i.dispatch({
      type: "RECEIVE_EVENTS",
      sourceId: t.sourceId,
      fetchId: a,
      fetchRange: e,
      rawEvents: d
    });
  }, (l) => {
    let d = !1;
    r.eventSourceFailure && (r.eventSourceFailure.call(s, l), d = !0), t.failure && (t.failure(l), d = !0), d || console.warn(l.message, l), i.dispatch({
      type: "RECEIVE_EVENT_ERROR",
      sourceId: t.sourceId,
      fetchId: a,
      fetchRange: e,
      error: l
    });
  }), Object.assign(Object.assign({}, t), { isFetching: !0, latestFetchId: a });
}
function Hf(t, e, n, i) {
  let r = t[e];
  return r && // not already removed
  n === r.latestFetchId ? Object.assign(Object.assign({}, t), { [e]: Object.assign(Object.assign({}, r), { isFetching: !1, fetchRange: i }) }) : t;
}
function na(t, e) {
  return ke(t, (n) => ia(n, e));
}
function zf(t, e) {
  let n = go(e), i = [].concat(t.eventSources || []), r = [];
  t.initialEvents && i.unshift(t.initialEvents), t.events && i.unshift(t.events);
  for (let s of i) {
    let o = po(s, e, n);
    o && r.push(o);
  }
  return r;
}
function ia(t, e) {
  return !e.pluginHooks.eventSourceDefs[t.sourceDefId].ignoreRange;
}
function Bf(t, e) {
  switch (e.type) {
    case "UNSELECT_DATES":
      return null;
    case "SELECT_DATES":
      return e.selection;
    default:
      return t;
  }
}
function Lf(t, e) {
  switch (e.type) {
    case "UNSELECT_EVENT":
      return "";
    case "SELECT_EVENT":
      return e.eventInstanceId;
    default:
      return t;
  }
}
function Uf(t, e) {
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
function Ff(t, e) {
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
function jf(t, e, n, i, r) {
  let s = t.headerToolbar ? jr(t.headerToolbar, t, e, n, i, r) : null, o = t.footerToolbar ? jr(t.footerToolbar, t, e, n, i, r) : null;
  return { header: s, footer: o };
}
function jr(t, e, n, i, r, s) {
  let o = {}, a = [], l = !1;
  for (let d in t) {
    let c = t[d], h = Wf(c, e, n, i, r, s);
    o[d] = h.widgets, a.push(...h.viewsWithButtons), l = l || h.hasTitle;
  }
  return { sectionWidgets: o, viewsWithButtons: a, hasTitle: l };
}
function Wf(t, e, n, i, r, s) {
  let o = e.direction === "rtl", a = e.customButtons || {}, l = n.buttonText || {}, d = e.buttonText || {}, c = n.buttonHints || {}, h = e.buttonHints || {}, f = t ? t.split(" ") : [], u = [], g = !1;
  return { widgets: f.map((b) => b.split(",").map((y) => {
    if (y === "title")
      return g = !0, { buttonName: y };
    let w, D, C, P, T, I;
    if (w = a[y])
      C = (_) => {
        w.click && w.click.call(_.target, _, _.target);
      }, (P = i.getCustomButtonIconClass(w)) || (P = i.getIconClass(y, o)) || (T = w.text), I = w.hint || w.text;
    else if (D = r[y]) {
      u.push(y), C = () => {
        s.changeView(y);
      }, (T = D.buttonTextOverride) || (P = i.getIconClass(y, o)) || (T = D.buttonTextDefault);
      let _ = D.buttonTextOverride || D.buttonTextDefault;
      I = at(
        D.buttonTitleOverride || D.buttonTitleDefault || e.viewHint,
        [_, y],
        // view-name = buttonName
        _
      );
    } else if (s[y])
      if (C = () => {
        s[y]();
      }, (T = l[y]) || (P = i.getIconClass(y, o)) || (T = d[y]), y === "prevYear" || y === "nextYear") {
        let _ = y === "prevYear" ? "prev" : "next";
        I = at(c[_] || h[_], [
          d.year || "year",
          "year"
        ], d[y]);
      } else
        I = (_) => at(c[y] || h[y], [
          d[_] || _,
          _
        ], d[y]);
    return { buttonName: y, buttonClick: C, buttonIcon: P, buttonText: T, buttonHint: I };
  })), viewsWithButtons: u, hasTitle: g };
}
class Vf {
  constructor(e, n, i) {
    this.type = e, this.getCurrentData = n, this.dateEnv = i;
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
let Gf = {
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
const qf = le({
  name: "array-event-source",
  eventSourceDefs: [Gf]
});
let Yf = {
  parseMeta(t) {
    return typeof t.events == "function" ? t.events : null;
  },
  fetch(t, e, n) {
    const { dateEnv: i } = t.context, r = t.eventSource.meta;
    su(r.bind(null, Co(t.range, i)), (s) => e({ rawEvents: s }), n);
  }
};
const Qf = le({
  name: "func-event-source",
  eventSourceDefs: [Yf]
}), Zf = {
  method: String,
  extraParams: v,
  startParam: String,
  endParam: String,
  timeZoneParam: String
};
let Kf = {
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
    const { meta: i } = t.eventSource, r = Jf(i, t.range, t.context);
    ou(i.method, i.url, r).then(([s, o]) => {
      e({ rawEvents: s, response: o });
    }, n);
  }
};
const Xf = le({
  name: "json-event-source",
  eventSourceRefiners: Zf,
  eventSourceDefs: [Kf]
});
function Jf(t, e, n) {
  let { dateEnv: i, options: r } = n, s, o, a, l, d = {};
  return s = t.startParam, s == null && (s = r.startParam), o = t.endParam, o == null && (o = r.endParam), a = t.timeZoneParam, a == null && (a = r.timeZoneParam), typeof t.extraParams == "function" ? l = t.extraParams() : l = t.extraParams || {}, Object.assign(d, l), d[s] = i.formatIso(e.start), d[o] = i.formatIso(e.end), i.timeZone !== "local" && (d[a] = i.timeZone), d;
}
const eh = {
  daysOfWeek: v,
  startTime: x,
  endTime: x,
  duration: x,
  startRecur: v,
  endRecur: v
};
let th = {
  parse(t, e) {
    if (t.daysOfWeek || t.startTime || t.endTime || t.startRecur || t.endRecur) {
      let n = {
        daysOfWeek: t.daysOfWeek || null,
        startTime: t.startTime || null,
        endTime: t.endTime || null,
        startRecur: t.startRecur ? e.createMarker(t.startRecur) : null,
        endRecur: t.endRecur ? e.createMarker(t.endRecur) : null,
        dateEnv: e
      }, i;
      return t.duration && (i = t.duration), !i && t.startTime && t.endTime && (i = vc(t.endTime, t.startTime)), {
        allDayGuess: !t.startTime && !t.endTime,
        duration: i,
        typeData: n
        // doesn't need endTime anymore but oh well
      };
    }
    return null;
  },
  expand(t, e, n) {
    let i = Me(e, { start: t.startRecur, end: t.endRecur });
    return i ? ih(t.daysOfWeek, t.startTime, t.dateEnv, n, i) : [];
  }
};
const nh = le({
  name: "simple-recurring-event",
  recurringTypes: [th],
  eventRefiners: eh
});
function ih(t, e, n, i, r) {
  let s = t ? eo(t) : null, o = M(r.start), a = r.end, l = [];
  for (e && (e.milliseconds < 0 ? a = z(a, 1) : e.milliseconds >= 1e3 * 60 * 60 * 24 && (o = z(o, -1))); o < a; ) {
    let d;
    (!s || s[o.getUTCDay()]) && (e ? d = i.add(o, e) : d = o, l.push(i.createMarker(n.toDate(d)))), o = z(o, 1);
  }
  return l;
}
const rh = le({
  name: "change-handler",
  optionChangeHandlers: {
    events(t, e) {
      Wr([t], e);
    },
    eventSources: Wr
  }
});
function Wr(t, e) {
  let n = bi(e.getCurrentData().eventSources);
  if (n.length === 1 && t.length === 1 && Array.isArray(n[0]._raw) && Array.isArray(t[0])) {
    e.dispatch({
      type: "RESET_RAW_EVENTS",
      sourceId: n[0].sourceId,
      rawEvents: t[0]
    });
    return;
  }
  let i = [];
  for (let r of t) {
    let s = !1;
    for (let o = 0; o < n.length; o += 1)
      if (n[o]._raw === r) {
        n.splice(o, 1), s = !0;
        break;
      }
    s || i.push(r);
  }
  for (let r of n)
    e.dispatch({
      type: "REMOVE_EVENT_SOURCE",
      sourceId: r.sourceId
    });
  for (let r of i)
    e.calendarApi.addEventSource(r);
}
function sh(t, e) {
  e.emitter.trigger("datesSet", Object.assign(Object.assign({}, Co(t.activeRange, e.dateEnv)), { view: e.viewApi }));
}
function oh(t, e) {
  let { emitter: n } = e;
  n.hasHandlers("eventsSet") && n.trigger("eventsSet", _e(t, e));
}
const ah = [
  qf,
  Qf,
  Xf,
  nh,
  rh,
  le({
    name: "misc",
    isLoadingFuncs: [
      (t) => Jo(t.eventSources)
    ],
    propSetHandlers: {
      dateProfile: sh,
      eventStore: oh
    }
  })
];
class lh {
  constructor(e, n) {
    this.runTaskOption = e, this.drainedOption = n, this.queue = [], this.delayedRunner = new ci(this.drain.bind(this));
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
      let n = [], i;
      for (; i = e.shift(); )
        this.runTask(i), n.push(i);
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
function ch(t, e, n) {
  let i;
  return /^(year|month)$/.test(t.currentRangeUnit) ? i = t.currentRange : i = t.activeRange, n.formatRange(i.start, i.end, O(e.titleFormat || dh(t)), {
    isEndExclusive: t.isRangeAllDay,
    defaultSeparator: e.titleRangeSeparator
  });
}
function dh(t) {
  let { currentRangeUnit: e } = t;
  if (e === "year")
    return { year: "numeric" };
  if (e === "month")
    return { year: "numeric", month: "long" };
  let n = Lt(t.currentRange.start, t.currentRange.end);
  return n !== null && n > 1 ? { year: "numeric", month: "short", day: "numeric" } : { year: "numeric", month: "long", day: "numeric" };
}
class Vr {
  constructor() {
    this.resetListeners = /* @__PURE__ */ new Set();
  }
  handleInput(e, n) {
    const i = this.dateEnv;
    if (e !== i && (typeof n == "function" ? this.nowFn = n : i || (this.nowAnchorDate = e.toDate(n ? e.createMarker(n) : e.createNowMarker()), this.nowAnchorQueried = Date.now()), this.dateEnv = e, i))
      for (const r of this.resetListeners.values())
        r();
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
class uh {
  constructor(e) {
    this.computeCurrentViewData = A(this._computeCurrentViewData), this.organizeRawLocales = A(hf), this.buildLocale = A(Ko), this.buildPluginHooks = vf(), this.buildDateEnv = A(fh), this.buildTheme = A(hh), this.parseToolbars = A(jf), this.buildViewSpecs = A(Af), this.buildDateProfileGenerator = Mt(ph), this.buildViewApi = A(gh), this.buildViewUiProps = Mt(bh), this.buildEventUiBySource = A(mh, Z), this.buildEventUiBases = A(vh), this.parseContextBusinessHours = Mt(yh), this.buildTitle = A(ch), this.nowManager = new Vr(), this.emitter = new un(), this.actionRunner = new lh(this._handleAction.bind(this), this.updateData.bind(this)), this.currentCalendarOptionsInput = {}, this.currentCalendarOptionsRefined = {}, this.currentViewOptionsInput = {}, this.currentViewOptionsRefined = {}, this.currentCalendarOptionsRefiners = {}, this.optionsForRefining = [], this.optionsForHandling = [], this.getCurrentData = () => this.data, this.dispatch = (f) => {
      this.actionRunner.request(f);
    }, this.props = e, this.actionRunner.pause(), this.nowManager = new Vr();
    let n = {}, i = this.computeOptionsData(e.optionOverrides, n, e.calendarApi), r = i.calendarOptions.initialView || i.pluginHooks.initialView, s = this.computeCurrentViewData(r, i, e.optionOverrides, n);
    e.calendarApi.currentDataManager = this, this.emitter.setThisContext(e.calendarApi), this.emitter.setOptions(s.options);
    let o = {
      nowManager: this.nowManager,
      dateEnv: i.dateEnv,
      options: i.calendarOptions,
      pluginHooks: i.pluginHooks,
      calendarApi: e.calendarApi,
      dispatch: this.dispatch,
      emitter: this.emitter,
      getCurrentData: this.getCurrentData
    }, a = Rf(i.calendarOptions, i.dateEnv, this.nowManager), l = s.dateProfileGenerator.build(a);
    se(l.activeRange, a) || (a = l.currentRange.start);
    for (let f of i.pluginHooks.contextInit)
      f(o);
    let d = Mf(i.calendarOptions, l, o), c = {
      dynamicOptionOverrides: n,
      currentViewType: r,
      currentDate: a,
      dateProfile: l,
      businessHours: this.parseContextBusinessHours(o),
      eventSources: d,
      eventUiBases: {},
      eventStore: V(),
      renderableEventStore: V(),
      dateSelection: null,
      eventSelection: "",
      eventDrag: null,
      eventResize: null,
      selectionConfig: this.buildViewUiProps(o).selectionConfig
    }, h = Object.assign(Object.assign({}, o), c);
    for (let f of i.pluginHooks.reducers)
      Object.assign(c, f(null, null, h));
    kn(c, o) && this.emitter.trigger("loading", !0), this.state = c, this.updateData(), this.actionRunner.resume();
  }
  resetOptions(e, n) {
    let { props: i } = this;
    n === void 0 ? i.optionOverrides = e : (i.optionOverrides = Object.assign(Object.assign({}, i.optionOverrides || {}), e), this.optionsForRefining.push(...n)), (n === void 0 || n.length) && this.actionRunner.request({
      type: "NOTHING"
    });
  }
  _handleAction(e) {
    let { props: n, state: i, emitter: r } = this, s = Tf(i.dynamicOptionOverrides, e), o = this.computeOptionsData(n.optionOverrides, s, n.calendarApi), a = xf(i.currentViewType, e), l = this.computeCurrentViewData(a, o, n.optionOverrides, s);
    n.calendarApi.currentDataManager = this, r.setThisContext(n.calendarApi), r.setOptions(l.options);
    let d = {
      nowManager: this.nowManager,
      dateEnv: o.dateEnv,
      options: o.calendarOptions,
      pluginHooks: o.pluginHooks,
      calendarApi: n.calendarApi,
      dispatch: this.dispatch,
      emitter: r,
      getCurrentData: this.getCurrentData
    }, { currentDate: c, dateProfile: h } = i;
    this.data && this.data.dateProfileGenerator !== l.dateProfileGenerator && (h = l.dateProfileGenerator.build(c)), c = _f(c, e), h = kf(h, e, c, l.dateProfileGenerator), (e.type === "PREV" || // TODO: move this logic into DateProfileGenerator
    e.type === "NEXT" || // "
    !se(h.currentRange, c)) && (c = h.currentRange.start);
    let f = If(i.eventSources, e, h, d), u = Id(i.eventStore, e, f, h, d), m = Jo(f) && !l.options.progressiveEventRendering && i.renderableEventStore || u, { eventUiSingleBase: b, selectionConfig: y } = this.buildViewUiProps(d), w = this.buildEventUiBySource(f), D = this.buildEventUiBases(m.defs, b, w), C = {
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
      dateSelection: Bf(i.dateSelection, e),
      eventSelection: Lf(i.eventSelection, e),
      eventDrag: Uf(i.eventDrag, e),
      eventResize: Ff(i.eventResize, e)
    }, P = Object.assign(Object.assign({}, d), C);
    for (let _ of o.pluginHooks.reducers)
      Object.assign(C, _(i, e, P));
    let T = kn(i, d), I = kn(C, d);
    !T && I ? r.trigger("loading", !0) : T && !I && r.trigger("loading", !1), this.state = C, n.onAction && n.onAction(e);
  }
  updateData() {
    let { props: e, state: n } = this, i = this.data, r = this.computeOptionsData(e.optionOverrides, n.dynamicOptionOverrides, e.calendarApi), s = this.computeCurrentViewData(n.currentViewType, r, e.optionOverrides, n.dynamicOptionOverrides), o = this.data = Object.assign(Object.assign(Object.assign({ nowManager: this.nowManager, viewTitle: this.buildTitle(n.dateProfile, s.options, r.dateEnv), calendarApi: e.calendarApi, dispatch: this.dispatch, emitter: this.emitter, getCurrentData: this.getCurrentData }, r), s), n), a = r.pluginHooks.optionChangeHandlers, l = i && i.calendarOptions, d = r.calendarOptions;
    if (l && l !== d) {
      l.timeZone !== d.timeZone && (n.eventSources = o.eventSources = Nf(o.eventSources, n.dateProfile, o), n.eventStore = o.eventStore = Or(o.eventStore, i.dateEnv, o.dateEnv), n.renderableEventStore = o.renderableEventStore = Or(o.renderableEventStore, i.dateEnv, o.dateEnv));
      for (let c in a)
        (this.optionsForHandling.indexOf(c) !== -1 || l[c] !== d[c]) && a[c](d[c], o);
    }
    this.optionsForHandling = [], e.onData && e.onData(o);
  }
  computeOptionsData(e, n, i) {
    if (!this.optionsForRefining.length && e === this.stableOptionOverrides && n === this.stableDynamicOptionOverrides)
      return this.stableCalendarOptionsData;
    let { refinedOptions: r, pluginHooks: s, localeDefaults: o, availableLocaleData: a, extra: l } = this.processRawCalendarOptions(e, n);
    Gr(l);
    let d = this.buildDateEnv(r.timeZone, r.locale, r.weekNumberCalculation, r.firstDay, r.weekText, s, a, r.defaultRangeSeparator), c = this.buildViewSpecs(s.views, this.stableOptionOverrides, this.stableDynamicOptionOverrides, o), h = this.buildTheme(r, s), f = this.parseToolbars(r, this.stableOptionOverrides, h, c, i);
    return this.stableCalendarOptionsData = {
      calendarOptions: r,
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
    let { locales: i, locale: r } = wn([
      lt,
      e,
      n
    ]), s = this.organizeRawLocales(i), o = s.map, a = this.buildLocale(r || s.defaultCode, o).options, l = this.buildPluginHooks(e.plugins || [], ah), d = this.currentCalendarOptionsRefiners = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Rr), Tr), kr), l.listenerRefiners), l.optionRefiners), c = {}, h = wn([
      lt,
      a,
      e,
      n
    ]), f = {}, u = this.currentCalendarOptionsInput, g = this.currentCalendarOptionsRefined, m = !1;
    for (let b in h)
      this.optionsForRefining.indexOf(b) === -1 && (h[b] === u[b] || Ae[b] && b in u && Ae[b](u[b], h[b])) ? f[b] = g[b] : d[b] ? (f[b] = d[b](h[b]), m = !0) : c[b] = u[b];
    return m && (this.currentCalendarOptionsInput = h, this.currentCalendarOptionsRefined = f, this.stableOptionOverrides = e, this.stableDynamicOptionOverrides = n), this.optionsForHandling.push(...this.optionsForRefining), this.optionsForRefining = [], {
      rawOptions: this.currentCalendarOptionsInput,
      refinedOptions: this.currentCalendarOptionsRefined,
      pluginHooks: l,
      availableLocaleData: s,
      localeDefaults: a,
      extra: c
    };
  }
  _computeCurrentViewData(e, n, i, r) {
    let s = n.viewSpecs[e];
    if (!s)
      throw new Error(`viewType "${e}" is not available. Please make sure you've loaded all neccessary plugins`);
    let { refinedOptions: o, extra: a } = this.processRawViewOptions(s, n.pluginHooks, n.localeDefaults, i, r);
    Gr(a), this.nowManager.handleInput(n.dateEnv, o.now);
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
  processRawViewOptions(e, n, i, r, s) {
    let o = wn([
      lt,
      e.optionDefaults,
      i,
      r,
      e.optionOverrides,
      s
    ]), a = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Rr), Tr), kr), Zc), n.listenerRefiners), n.optionRefiners), l = {}, d = this.currentViewOptionsInput, c = this.currentViewOptionsRefined, h = !1, f = {};
    for (let u in o)
      o[u] === d[u] || Ae[u] && Ae[u](o[u], d[u]) ? l[u] = c[u] : (o[u] === this.currentCalendarOptionsInput[u] || Ae[u] && Ae[u](o[u], this.currentCalendarOptionsInput[u]) ? u in this.currentCalendarOptionsRefined && (l[u] = this.currentCalendarOptionsRefined[u]) : a[u] ? l[u] = a[u](o[u]) : f[u] = o[u], h = !0);
    return h && (this.currentViewOptionsInput = o, this.currentViewOptionsRefined = l), {
      rawOptions: this.currentViewOptionsInput,
      refinedOptions: this.currentViewOptionsRefined,
      extra: f
    };
  }
}
function fh(t, e, n, i, r, s, o, a) {
  let l = Ko(e || o.defaultCode, o.map);
  return new ad({
    calendarSystem: "gregory",
    timeZone: t,
    namedTimeZoneImpl: s.namedTimeZonedImpl,
    locale: l,
    weekNumberCalculation: n,
    firstDay: i,
    weekText: r,
    cmdFormatter: s.cmdFormatter,
    defaultSeparator: a
  });
}
function hh(t, e) {
  let n = e.themeClasses[t.themeSystem] || Ee;
  return new n(t);
}
function ph(t) {
  let e = t.dateProfileGeneratorClass || lo;
  return new e(t);
}
function gh(t, e, n) {
  return new Vf(t, e, n);
}
function mh(t) {
  return oe(t, (e) => e.ui);
}
function vh(t, e, n) {
  let i = { "": e };
  for (let r in t) {
    let s = t[r];
    s.sourceId && n[s.sourceId] && (i[r] = n[s.sourceId]);
  }
  return i;
}
function bh(t) {
  let { options: e } = t;
  return {
    eventUiSingleBase: qt({
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
    selectionConfig: qt({
      constraint: e.selectConstraint,
      overlap: typeof e.selectOverlap == "boolean" ? e.selectOverlap : void 0,
      allow: e.selectAllow
    }, t)
  };
}
function kn(t, e) {
  for (let n of e.pluginHooks.isLoadingFuncs)
    if (n(t))
      return !0;
  return !1;
}
function yh(t) {
  return Ud(t.options.businessHours, t);
}
function Gr(t, e) {
  for (let n in t)
    console.warn(`Unknown option '${n}'`);
}
class Eh extends R {
  render() {
    let e = this.props.widgetGroups.map((n) => this.renderWidgetGroup(n));
    return p("div", { className: "fc-toolbar-chunk" }, ...e);
  }
  renderWidgetGroup(e) {
    let { props: n } = this, { theme: i } = this.context, r = [], s = !0;
    for (let o of e) {
      let { buttonName: a, buttonClick: l, buttonText: d, buttonIcon: c, buttonHint: h } = o;
      if (a === "title")
        s = !1, r.push(p("h2", { className: "fc-toolbar-title", id: n.titleId }, n.title));
      else {
        let f = a === n.activeButton, u = !n.isTodayEnabled && a === "today" || !n.isPrevEnabled && a === "prev" || !n.isNextEnabled && a === "next", g = [`fc-${a}-button`, i.getClass("button")];
        f && g.push(i.getClass("buttonActive")), r.push(p("button", { type: "button", title: typeof h == "function" ? h(n.navUnit) : h, disabled: u, "aria-pressed": f, className: g.join(" "), onClick: l }, d || (c ? p("span", { className: c, role: "img" }) : "")));
      }
    }
    if (r.length > 1) {
      let o = s && i.getClass("buttonGroup") || "";
      return p("div", { className: o }, ...r);
    }
    return r[0];
  }
}
class qr extends R {
  render() {
    let { model: e, extraClassName: n } = this.props, i = !1, r, s, o = e.sectionWidgets, a = o.center;
    return o.left ? (i = !0, r = o.left) : r = o.start, o.right ? (i = !0, s = o.right) : s = o.end, p(
      "div",
      { className: [
        n || "",
        "fc-toolbar",
        i ? "fc-toolbar-ltr" : ""
      ].join(" ") },
      this.renderSection("start", r || []),
      this.renderSection("center", a || []),
      this.renderSection("end", s || [])
    );
  }
  renderSection(e, n) {
    let { props: i } = this;
    return p(Eh, { key: e, widgetGroups: n, title: i.title, navUnit: i.navUnit, activeButton: i.activeButton, isTodayEnabled: i.isTodayEnabled, isPrevEnabled: i.isPrevEnabled, isNextEnabled: i.isNextEnabled, titleId: i.titleId });
  }
}
class wh extends R {
  constructor() {
    super(...arguments), this.state = {
      availableWidth: null
    }, this.handleEl = (e) => {
      this.el = e, ee(this.props.elRef, e), this.updateAvailableWidth();
    }, this.handleResize = () => {
      this.updateAvailableWidth();
    };
  }
  render() {
    let { props: e, state: n } = this, { aspectRatio: i } = e, r = [
      "fc-view-harness",
      i || e.liquid || e.height ? "fc-view-harness-active" : "fc-view-harness-passive"
      // let the view do the height
    ], s = "", o = "";
    return i ? n.availableWidth !== null ? s = n.availableWidth / i : o = `${1 / i * 100}%` : s = e.height || "", p("div", { "aria-labelledby": e.labeledById, ref: this.handleEl, className: r.join(" "), style: { height: s, paddingBottom: o } }, e.children);
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
class Sh extends Xe {
  constructor(e) {
    super(e), this.handleSegClick = (n, i) => {
      let { component: r } = this, { context: s } = r, o = Qe(i);
      if (o && // might be the <div> surrounding the more link
      r.isValidSegDownEl(n.target)) {
        let a = B(n.target, ".fc-event-forced-url"), l = a ? a.querySelector("a[href]").href : "";
        s.emitter.trigger("eventClick", {
          el: i,
          event: new N(r.context, o.eventRange.def, o.eventRange.instance),
          jsEvent: n,
          view: s.viewApi
        }), l && !n.defaultPrevented && (window.location.href = l);
      }
    }, this.destroy = Qs(
      e.el,
      "click",
      ".fc-event",
      // on both fg and bg events
      this.handleSegClick
    );
  }
}
class Ah extends Xe {
  constructor(e) {
    super(e), this.handleEventElRemove = (n) => {
      n === this.currentSegEl && this.handleSegLeave(null, this.currentSegEl);
    }, this.handleSegEnter = (n, i) => {
      Qe(i) && (this.currentSegEl = i, this.triggerEvent("eventMouseEnter", n, i));
    }, this.handleSegLeave = (n, i) => {
      this.currentSegEl && (this.currentSegEl = null, this.triggerEvent("eventMouseLeave", n, i));
    }, this.removeHoverListeners = nc(
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
  triggerEvent(e, n, i) {
    let { component: r } = this, { context: s } = r, o = Qe(i);
    (!n || r.isValidSegDownEl(n.target)) && s.emitter.trigger(e, {
      el: i,
      event: new N(s, o.eventRange.def, o.eventRange.instance),
      jsEvent: n,
      view: s.viewApi
    });
  }
}
class Dh extends $e {
  constructor() {
    super(...arguments), this.buildViewContext = A(dd), this.buildViewPropTransformers = A(xh), this.buildToolbarProps = A(Ch), this.headerRef = L(), this.footerRef = L(), this.interactionsStore = {}, this.state = {
      viewLabelId: an()
    }, this.registerInteractiveComponent = (e, n) => {
      let i = cu(e, n), o = [
        Sh,
        Ah
      ].concat(this.props.pluginHooks.componentInteractions).map((a) => new a(i));
      this.interactionsStore[e.uid] = o, Wn[e.uid] = i;
    }, this.unregisterInteractiveComponent = (e) => {
      let n = this.interactionsStore[e.uid];
      if (n) {
        for (let i of n)
          i.destroy();
        delete this.interactionsStore[e.uid];
      }
      delete Wn[e.uid];
    }, this.resizeRunner = new ci(() => {
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
    let { props: e } = this, { toolbarConfig: n, options: i } = e, r = !1, s = "", o;
    e.isHeightAuto || e.forPrint ? s = "" : i.height != null ? r = !0 : i.contentHeight != null ? s = i.contentHeight : o = Math.max(i.aspectRatio, 0.5);
    let a = this.buildViewContext(e.viewSpec, e.viewApi, e.options, e.dateProfileGenerator, e.dateEnv, e.nowManager, e.theme, e.pluginHooks, e.dispatch, e.getCurrentData, e.emitter, e.calendarApi, this.registerInteractiveComponent, this.unregisterInteractiveComponent), l = n.header && n.header.hasTitle ? this.state.viewLabelId : void 0;
    return p(
      ae.Provider,
      { value: a },
      p(Je, { unit: "day" }, (d) => {
        let c = this.buildToolbarProps(e.viewSpec, e.dateProfile, e.dateProfileGenerator, e.currentDate, d, e.viewTitle);
        return p(
          k,
          null,
          n.header && p(qr, Object.assign({ ref: this.headerRef, extraClassName: "fc-header-toolbar", model: n.header, titleId: l }, c)),
          p(
            wh,
            { liquid: r, height: s, aspectRatio: o, labeledById: l },
            this.renderView(e),
            this.buildAppendContent()
          ),
          n.footer && p(qr, Object.assign({ ref: this.footerRef, extraClassName: "fc-footer-toolbar", model: n.footer, titleId: "" }, c))
        );
      })
    );
  }
  componentDidMount() {
    let { props: e } = this;
    this.calendarInteractions = e.pluginHooks.calendarInteractions.map((i) => new i(e)), window.addEventListener("resize", this.handleWindowResize);
    let { propSetHandlers: n } = e.pluginHooks;
    for (let i in n)
      n[i](e[i], e);
  }
  componentDidUpdate(e) {
    let { props: n } = this, { propSetHandlers: i } = n.pluginHooks;
    for (let r in i)
      n[r] !== e[r] && i[r](n[r], n);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize), this.resizeRunner.clear();
    for (let e of this.calendarInteractions)
      e.destroy();
    this.props.emitter.trigger("_unmount");
  }
  buildAppendContent() {
    let { props: e } = this, n = e.pluginHooks.viewContainerAppends.map((i) => i(e));
    return p(k, {}, ...n);
  }
  renderView(e) {
    let { pluginHooks: n } = e, { viewSpec: i } = e, r = {
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
      Object.assign(r, a.transform(r, e));
    let o = i.component;
    return p(o, Object.assign({}, r));
  }
}
function Ch(t, e, n, i, r, s) {
  let o = n.build(r, void 0, !1), a = n.buildPrev(e, i, !1), l = n.buildNext(e, i, !1);
  return {
    title: s,
    activeButton: t.type,
    navUnit: t.singleUnit,
    isTodayEnabled: o.isValid && !se(e.currentRange, r),
    isPrevEnabled: a.isValid,
    isNextEnabled: l.isValid
  };
}
function xh(t) {
  return t.map((e) => new e());
}
class _h extends uu {
  constructor(e, n = {}) {
    super(), this.isRendering = !1, this.isRendered = !1, this.currentClassNames = [], this.customContentRenderId = 0, this.handleAction = (i) => {
      switch (i.type) {
        case "SET_EVENT_DRAG":
        case "SET_EVENT_RESIZE":
          this.renderRunner.tryDrain();
      }
    }, this.handleData = (i) => {
      this.currentData = i, this.renderRunner.request(i.calendarOptions.rerenderDelay);
    }, this.handleRenderRequest = () => {
      if (this.isRendering) {
        this.isRendered = !0;
        let { currentData: i } = this;
        Wt(() => {
          ht(p(lu, { options: i.calendarOptions, theme: i.theme, emitter: i.emitter }, (r, s, o, a) => (this.setClassNames(r), this.setHeight(s), p(
            ro.Provider,
            { value: this.customContentRenderId },
            p(Dh, Object.assign({ isHeightAuto: o, forPrint: a }, i))
          ))), this.el);
        });
      } else this.isRendered && (this.isRendered = !1, ht(null, this.el), this.setClassNames([]), this.setHeight(""));
    }, ql(e), this.el = e, this.renderRunner = new ci(this.handleRenderRequest), new uh({
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
    Wt(() => {
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
    if (!me(e, this.currentClassNames)) {
      let { classList: n } = this.el;
      for (let i of this.currentClassNames)
        n.remove(i);
      for (let i of e)
        n.add(i);
      this.currentClassNames = e;
    }
  }
  setHeight(e) {
    qs(this.el, "height", e);
  }
}
function Mn(t) {
  return t === "Tag" || t === "Monat" ? "r" : t === "Jahr" ? "s" : "";
}
var Rh = {
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
      return `Vorherige${Mn(t)} ${t}`;
    },
    next(t) {
      return `Nächste${Mn(t)} ${t}`;
    },
    today(t) {
      return t === "Tag" ? "Heute" : `Diese${Mn(t)} ${t}`;
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
class Th extends ne {
  constructor() {
    super(...arguments), this.headerElRef = L();
  }
  renderSimpleLayout(e, n) {
    let { props: i, context: r } = this, s = [], o = Zt(r.options);
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
      Vt,
      { elClasses: ["fc-daygrid"], viewSpec: r.viewSpec },
      p(Ni, { liquid: !i.isHeightAuto && !i.forPrint, collapsibleWidth: i.forPrint, cols: [], sections: s })
    );
  }
  renderHScrollLayout(e, n, i, r) {
    let s = this.context.pluginHooks.scrollGridImpl;
    if (!s)
      throw new Error("No ScrollGrid implementation");
    let { props: o, context: a } = this, l = !o.forPrint && Zt(a.options), d = !o.forPrint && jo(a.options), c = [];
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
        content: qn
      }]
    }), p(
      Vt,
      { elClasses: ["fc-daygrid"], viewSpec: a.viewSpec },
      p(s, { liquid: !o.isHeightAuto && !o.forPrint, forPrint: o.forPrint, collapsibleWidth: o.forPrint, colGroups: [{ cols: [{ span: i, minWidth: r }] }], sections: c })
    );
  }
}
function Nt(t, e) {
  let n = [];
  for (let i = 0; i < e; i += 1)
    n[i] = [];
  for (let i of t)
    n[i.row].push(i);
  return n;
}
function Dt(t, e) {
  let n = [];
  for (let i = 0; i < e; i += 1)
    n[i] = [];
  for (let i of t)
    n[i.firstCol].push(i);
  return n;
}
function Yr(t, e) {
  let n = [];
  if (t) {
    for (let i = 0; i < e; i += 1)
      n[i] = {
        affectedInstances: t.affectedInstances,
        isEvent: t.isEvent,
        segs: []
      };
    for (let i of t.segs)
      n[i.row].segs.push(i);
  } else
    for (let i = 0; i < e; i += 1)
      n[i] = null;
  return n;
}
const ra = O({
  hour: "numeric",
  minute: "2-digit",
  omitZeroMinute: !0,
  meridiem: "narrow"
});
function sa(t) {
  let { display: e } = t.eventRange.ui;
  return e === "list-item" || e === "auto" && !t.eventRange.def.allDay && t.firstCol === t.lastCol && // can't be multi-day
  t.isStart && // "
  t.isEnd;
}
class oa extends R {
  render() {
    let { props: e } = this;
    return p($i, Object.assign({}, e, { elClasses: ["fc-daygrid-event", "fc-daygrid-block-event", "fc-h-event"], defaultTimeFormat: ra, defaultDisplayEventEnd: e.defaultDisplayEventEnd, disableResizing: !e.seg.eventRange.def.allDay }));
  }
}
class aa extends R {
  render() {
    let { props: e, context: n } = this, { options: i } = n, { seg: r } = e, s = i.eventTimeFormat || ra, o = So(r, s, n, !0, e.defaultDisplayEventEnd);
    return p(Oi, Object.assign({}, e, { elTag: "a", elClasses: ["fc-daygrid-event", "fc-daygrid-dot-event"], elAttrs: Do(e.seg, n), defaultGenerator: kh, timeText: o, isResizing: !1, isDateSelecting: !1 }));
  }
}
function kh(t) {
  return p(
    k,
    null,
    p("div", { className: "fc-daygrid-event-dot", style: { borderColor: t.borderColor || t.backgroundColor } }),
    t.timeText && p("div", { className: "fc-event-time" }, t.timeText),
    p("div", { className: "fc-event-title" }, t.event.title || p(k, null, " "))
  );
}
class Mh extends R {
  constructor() {
    super(...arguments), this.compileSegs = A(Ih);
  }
  render() {
    let { props: e } = this, { allSegs: n, invisibleSegs: i } = this.compileSegs(e.singlePlacements);
    return p(qo, { elClasses: ["fc-daygrid-more-link"], dateProfile: e.dateProfile, todayRange: e.todayRange, allDayDate: e.allDayDate, moreCnt: e.moreCnt, allSegs: n, hiddenSegs: i, alignmentElRef: e.alignmentElRef, alignGridTop: e.alignGridTop, extraDateSpan: e.extraDateSpan, popoverContent: () => {
      let r = (e.eventDrag ? e.eventDrag.affectedInstances : null) || (e.eventResize ? e.eventResize.affectedInstances : null) || {};
      return p(k, null, n.map((s) => {
        let o = s.eventRange.instance.instanceId;
        return p("div", { className: "fc-daygrid-event-harness", key: o, style: {
          visibility: r[o] ? "hidden" : ""
        } }, sa(s) ? p(aa, Object.assign({ seg: s, isDragging: !1, isSelected: o === e.eventSelection, defaultDisplayEventEnd: !1 }, ge(s, e.todayRange))) : p(oa, Object.assign({ seg: s, isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: o === e.eventSelection, defaultDisplayEventEnd: !1 }, ge(s, e.todayRange))));
      }));
    } });
  }
}
function Ih(t) {
  let e = [], n = [];
  for (let i of t)
    e.push(i.seg), i.isVisible || n.push(i.seg);
  return { allSegs: e, invisibleSegs: n };
}
const Nh = O({ week: "narrow" });
class Oh extends ne {
  constructor() {
    super(...arguments), this.rootElRef = L(), this.state = {
      dayNumberId: an()
    }, this.handleRootEl = (e) => {
      ee(this.rootElRef, e), ee(this.props.elRef, e);
    };
  }
  render() {
    let { context: e, props: n, state: i, rootElRef: r } = this, { options: s, dateEnv: o } = e, { date: a, dateProfile: l } = n;
    const d = n.showDayNumber && Ph(a, l.currentRange, o);
    return p(Hi, { elTag: "td", elRef: this.handleRootEl, elClasses: [
      "fc-daygrid-day",
      ...n.extraClassNames || []
    ], elAttrs: Object.assign(Object.assign(Object.assign({}, n.extraDataAttrs), n.showDayNumber ? { "aria-labelledby": i.dayNumberId } : {}), { role: "gridcell" }), defaultGenerator: $h, date: a, dateProfile: l, todayRange: n.todayRange, showDayNumber: n.showDayNumber, isMonthStart: d, extraRenderProps: n.extraRenderProps }, (c, h) => p(
      "div",
      { ref: n.innerElRef, className: "fc-daygrid-day-frame fc-scrollgrid-sync-inner", style: { minHeight: n.minHeight } },
      n.showWeekNumber && p(Go, { elTag: "a", elClasses: ["fc-daygrid-week-number"], elAttrs: Qt(e, a, "week"), date: a, defaultFormat: Nh }),
      !h.isDisabled && (n.showDayNumber || zi(s) || n.forceDayTop) ? p(
        "div",
        { className: "fc-daygrid-day-top" },
        p(c, { elTag: "a", elClasses: [
          "fc-daygrid-day-number",
          d && "fc-daygrid-month-start"
        ], elAttrs: Object.assign(Object.assign({}, Qt(e, a)), { id: i.dayNumberId }) })
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
          p(Mh, { allDayDate: a, singlePlacements: n.singlePlacements, moreCnt: n.moreCnt, alignmentElRef: r, alignGridTop: !n.showDayNumber, extraDateSpan: n.extraDateSpan, dateProfile: n.dateProfile, eventSelection: n.eventSelection, eventDrag: n.eventDrag, eventResize: n.eventResize, todayRange: n.todayRange })
        )
      ),
      p("div", { className: "fc-daygrid-day-bg" }, n.bgContent)
    ));
  }
}
function $h(t) {
  return t.dayNumberText || p(k, null, " ");
}
function Ph(t, e, n) {
  const { start: i, end: r } = e, s = ve(r, -1), o = n.getYear(i), a = n.getMonth(i), l = n.getYear(s), d = n.getMonth(s);
  return !(o === l && a === d) && // first date in current view?
  (t.valueOf() === i.valueOf() || // a month-start that's within the current range?
  n.getDay(t) === 1 && t.valueOf() < r.valueOf());
}
function la(t) {
  return t.eventRange.instance.instanceId + ":" + t.firstCol;
}
function ca(t) {
  return la(t) + ":" + t.lastCol;
}
function Hh(t, e, n, i, r, s, o) {
  let a = new Lh((y) => {
    let w = t[y.index].eventRange.instance.instanceId + ":" + y.span.start + ":" + (y.span.end - 1);
    return r[w] || 1;
  });
  a.allowReslicing = !0, a.strictOrder = i, e === !0 || n === !0 ? (a.maxCoord = s, a.hiddenConsumes = !0) : typeof e == "number" ? a.maxStackCnt = e : typeof n == "number" && (a.maxStackCnt = n, a.hiddenConsumes = !0);
  let l = [], d = [];
  for (let y = 0; y < t.length; y += 1) {
    let w = t[y], D = ca(w);
    r[D] != null ? l.push({
      index: y,
      span: {
        start: w.firstCol,
        end: w.lastCol + 1
      }
    }) : d.push(w);
  }
  let c = a.addSegs(l), h = a.toRects(), { singleColPlacements: f, multiColPlacements: u, leftoverMargins: g } = zh(h, t, o), m = [], b = [];
  for (let y of d) {
    u[y.firstCol].push({
      seg: y,
      isVisible: !1,
      isAbsolute: !0,
      absoluteTop: 0,
      marginTop: 0
    });
    for (let w = y.firstCol; w <= y.lastCol; w += 1)
      f[w].push({
        seg: Fe(y, w, w + 1, o),
        isVisible: !1,
        isAbsolute: !1,
        absoluteTop: 0,
        marginTop: 0
      });
  }
  for (let y = 0; y < o.length; y += 1)
    m.push(0);
  for (let y of c) {
    let w = t[y.index], D = y.span;
    u[D.start].push({
      seg: Fe(w, D.start, D.end, o),
      isVisible: !1,
      isAbsolute: !0,
      absoluteTop: 0,
      marginTop: 0
    });
    for (let C = D.start; C < D.end; C += 1)
      m[C] += 1, f[C].push({
        seg: Fe(w, C, C + 1, o),
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
function zh(t, e, n) {
  let i = Bh(t, n.length), r = [], s = [], o = [];
  for (let a = 0; a < n.length; a += 1) {
    let l = i[a], d = [], c = 0, h = 0;
    for (let u of l) {
      let g = e[u.index];
      d.push({
        seg: Fe(g, a, a + 1, n),
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
        seg: Fe(g, u.span.start, u.span.end, n),
        isVisible: !0,
        isAbsolute: !0,
        absoluteTop: u.levelCoord,
        marginTop: 0
      })) : b && (f.push({
        seg: Fe(g, u.span.start, u.span.end, n),
        isVisible: !0,
        isAbsolute: !1,
        absoluteTop: u.levelCoord,
        marginTop: h
        // claim the margin
      }), h = 0);
    }
    r.push(d), s.push(f), o.push(h);
  }
  return { singleColPlacements: r, multiColPlacements: s, leftoverMargins: o };
}
function Bh(t, e) {
  let n = [];
  for (let i = 0; i < e; i += 1)
    n.push([]);
  for (let i of t)
    for (let r = i.span.start; r < i.span.end; r += 1)
      n[r].push(i);
  return n;
}
function Fe(t, e, n, i) {
  if (t.firstCol === e && t.lastCol === n - 1)
    return t;
  let r = t.eventRange, s = r.range, o = Me(s, {
    start: i[e].date,
    end: z(i[n - 1].date, 1)
  });
  return Object.assign(Object.assign({}, t), { firstCol: e, lastCol: n - 1, eventRange: {
    def: r.def,
    ui: Object.assign(Object.assign({}, r.ui), { durationEditable: !1 }),
    instance: r.instance,
    range: o
  }, isStart: t.isStart && o.start.valueOf() === s.start.valueOf(), isEnd: t.isEnd && o.end.valueOf() === s.end.valueOf() });
}
class Lh extends Io {
  constructor() {
    super(...arguments), this.hiddenConsumes = !1, this.forceHidden = {};
  }
  addSegs(e) {
    const n = super.addSegs(e), { entriesByLevel: i } = this, r = (s) => !this.forceHidden[Re(s)];
    for (let s = 0; s < i.length; s += 1)
      i[s] = i[s].filter(r);
    return n;
  }
  handleInvalidInsertion(e, n, i) {
    const { entriesByLevel: r, forceHidden: s } = this, { touchingEntry: o, touchingLevel: a, touchingLateral: l } = e;
    if (this.hiddenConsumes && o) {
      const d = Re(o);
      if (!s[d])
        if (this.allowReslicing) {
          const c = Object.assign(Object.assign({}, o), { span: Mi(o.span, n.span) }), h = Re(c);
          s[h] = !0, r[a][l] = c, i.push(c), this.splitEntry(o, n, i);
        } else
          s[d] = !0, i.push(o);
    }
    super.handleInvalidInsertion(e, n, i);
  }
}
class da extends ne {
  constructor() {
    super(...arguments), this.cellElRefs = new re(), this.frameElRefs = new re(), this.fgElRefs = new re(), this.segHarnessRefs = new re(), this.rootElRef = L(), this.state = {
      framePositions: null,
      maxContentHeight: null,
      segHeights: {}
    }, this.handleResize = (e) => {
      e && this.updateSizing(!0);
    };
  }
  render() {
    let { props: e, state: n, context: i } = this, { options: r } = i, s = e.cells.length, o = Dt(e.businessHourSegs, s), a = Dt(e.bgEventSegs, s), l = Dt(this.getHighlightSegs(), s), d = Dt(this.getMirrorSegs(), s), { singleColPlacements: c, multiColPlacements: h, moreCnts: f, moreMarginTops: u } = Hh(wo(e.fgEventSegs, r.eventOrder), e.dayMaxEvents, e.dayMaxEventRows, r.eventOrderStrict, n.segHeights, n.maxContentHeight, e.cells), g = (
      // TODO: messy way to compute this
      e.eventDrag && e.eventDrag.affectedInstances || e.eventResize && e.eventResize.affectedInstances || {}
    );
    return p(
      "tr",
      { ref: this.rootElRef, role: "row" },
      e.renderIntro && e.renderIntro(),
      e.cells.map((m, b) => {
        let y = this.renderFgSegs(b, e.forPrint ? c[b] : h[b], e.todayRange, g), w = this.renderFgSegs(b, Uh(d[b], h), e.todayRange, {}, !!e.eventDrag, !!e.eventResize, !1);
        return p(Oh, { key: m.key, elRef: this.cellElRefs.createRef(m.key), innerElRef: this.frameElRefs.createRef(m.key), dateProfile: e.dateProfile, date: m.date, showDayNumber: e.showDayNumbers, showWeekNumber: e.showWeekNumbers && b === 0, forceDayTop: e.showWeekNumbers, todayRange: e.todayRange, eventSelection: e.eventSelection, eventDrag: e.eventDrag, eventResize: e.eventResize, extraRenderProps: m.extraRenderProps, extraDataAttrs: m.extraDataAttrs, extraClassNames: m.extraClassNames, extraDateSpan: m.extraDateSpan, moreCnt: f[b], moreMarginTop: u[b], singlePlacements: c[b], fgContentElRef: this.fgElRefs.createRef(m.key), fgContent: (
          // Fragment scopes the keys
          p(
            k,
            null,
            p(k, null, y),
            p(k, null, w)
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
    let i = this.props;
    this.updateSizing(!Z(e, i));
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
  renderFgSegs(e, n, i, r, s, o, a) {
    let { context: l } = this, { eventSelection: d } = this.props, { framePositions: c } = this.state, h = this.props.cells.length === 1, f = s || o || a, u = [];
    if (c)
      for (let g of n) {
        let { seg: m } = g, { instanceId: b } = m.eventRange.instance, y = g.isVisible && !r[b], w = g.isAbsolute, D = "", C = "";
        w && (l.isRtl ? (C = 0, D = c.lefts[m.lastCol] - c.lefts[m.firstCol]) : (D = 0, C = c.rights[m.firstCol] - c.rights[m.lastCol])), u.push(p("div", { className: "fc-daygrid-event-harness" + (w ? " fc-daygrid-event-harness-abs" : ""), key: la(m), ref: f ? null : this.segHarnessRefs.createRef(ca(m)), style: {
          visibility: y ? "" : "hidden",
          marginTop: w ? "" : g.marginTop,
          top: w ? g.absoluteTop : "",
          left: D,
          right: C
        } }, sa(m) ? p(aa, Object.assign({ seg: m, isDragging: s, isSelected: b === d, defaultDisplayEventEnd: h }, ge(m, i))) : p(oa, Object.assign({ seg: m, isDragging: s, isResizing: o, isDateSelecting: a, isSelected: b === d, defaultDisplayEventEnd: h }, ge(m, i)))));
      }
    return u;
  }
  renderFillSegs(e, n) {
    let { isRtl: i } = this.context, { todayRange: r } = this.props, { framePositions: s } = this.state, o = [];
    if (s)
      for (let a of e) {
        let l = i ? {
          right: 0,
          left: s.lefts[a.lastCol] - s.lefts[a.firstCol]
        } : {
          left: 0,
          right: s.rights[a.firstCol] - s.rights[a.lastCol]
        };
        o.push(p("div", { key: Ao(a.eventRange), className: "fc-daygrid-bg-harness", style: l }, n === "bg-event" ? p(Wo, Object.assign({ seg: a }, ge(a, r))) : Vo(n)));
      }
    return p(k, {}, ...o);
  }
  updateSizing(e) {
    let { props: n, state: i, frameElRefs: r } = this;
    if (!n.forPrint && n.clientWidth !== null) {
      if (e) {
        let l = n.cells.map((d) => r.currentMap[d.key]);
        if (l.length) {
          let d = this.rootElRef.current, c = new Ze(
            d,
            l,
            !0,
            // isHorizontal
            !1
          );
          (!i.framePositions || !i.framePositions.similarTo(c)) && this.setState({
            framePositions: new Ze(
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
    for (let i in e) {
      let r = Math.round(e[i].getBoundingClientRect().height);
      n[i] = Math.max(n[i] || 0, r);
    }
    return n;
  }
  computeMaxContentHeight() {
    let e = this.props.cells[0].key, n = this.cellElRefs.currentMap[e], i = this.fgElRefs.currentMap[e];
    return n.getBoundingClientRect().bottom - i.getBoundingClientRect().top;
  }
  getCellEls() {
    let e = this.cellElRefs.currentMap;
    return this.props.cells.map((n) => e[n.key]);
  }
}
da.addStateEquality({
  segHeights: Z
});
function Uh(t, e) {
  if (!t.length)
    return [];
  let n = Fh(e);
  return t.map((i) => ({
    seg: i,
    isVisible: !0,
    isAbsolute: !0,
    absoluteTop: n[i.eventRange.instance.instanceId],
    marginTop: 0
  }));
}
function Fh(t) {
  let e = {};
  for (let n of t)
    for (let i of n)
      e[i.seg.eventRange.instance.instanceId] = i.absoluteTop;
  return e;
}
class jh extends ne {
  constructor() {
    super(...arguments), this.splitBusinessHourSegs = A(Nt), this.splitBgEventSegs = A(Wh), this.splitFgEventSegs = A(Nt), this.splitDateSelectionSegs = A(Nt), this.splitEventDrag = A(Yr), this.splitEventResize = A(Yr), this.rowRefs = new re();
  }
  render() {
    let { props: e, context: n } = this, i = e.cells.length, r = this.splitBusinessHourSegs(e.businessHourSegs, i), s = this.splitBgEventSegs(e.bgEventSegs, i), o = this.splitFgEventSegs(e.fgEventSegs, i), a = this.splitDateSelectionSegs(e.dateSelectionSegs, i), l = this.splitEventDrag(e.eventDrag, i), d = this.splitEventResize(e.eventResize, i), c = i >= 7 && e.clientWidth ? e.clientWidth / n.options.aspectRatio / 6 : null;
    return p(Je, { unit: "day" }, (h, f) => p(k, null, e.cells.map((u, g) => p(da, {
      ref: this.rowRefs.createRef(g),
      key: u.length ? u[0].date.toISOString() : g,
      showDayNumbers: i > 1,
      showWeekNumbers: e.showWeekNumbers,
      todayRange: f,
      dateProfile: e.dateProfile,
      cells: u,
      renderIntro: e.renderRowIntro,
      businessHourSegs: r[g],
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
    this.rowPositions = new Ze(
      this.rootEl,
      this.rowRefs.collect().map((e) => e.getCellEls()[0]),
      // first cell el in each row. TODO: not optimal
      !1,
      !0
    ), this.colPositions = new Ze(
      this.rootEl,
      this.rowRefs.currentMap[0].getCellEls(),
      // cell els in first row
      !0,
      // horizontal
      !1
    );
  }
  queryHit(e, n) {
    let { colPositions: i, rowPositions: r } = this, s = i.leftToIndex(e), o = r.topToIndex(n);
    if (o != null && s != null) {
      let a = this.props.cells[o][s];
      return {
        dateProfile: this.props.dateProfile,
        dateSpan: Object.assign({ range: this.getCellRange(o, s), allDay: !0 }, a.extraDateSpan),
        dayEl: this.getCellEl(o, s),
        rect: {
          left: i.lefts[s],
          right: i.rights[s],
          top: r.tops[o],
          bottom: r.bottoms[o]
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
    let i = this.props.cells[e][n].date, r = z(i, 1);
    return { start: i, end: r };
  }
}
function Wh(t, e) {
  return Nt(t.filter(Vh), e);
}
function Vh(t) {
  return t.eventRange.def.allDay;
}
class Gh extends ne {
  constructor() {
    super(...arguments), this.elRef = L(), this.needsScrollReset = !1;
  }
  render() {
    let { props: e } = this, { dayMaxEventRows: n, dayMaxEvents: i, expandRows: r } = e, s = i === !0 || n === !0;
    s && !r && (s = !1, n = null, i = null);
    let o = [
      "fc-daygrid-body",
      s ? "fc-daygrid-body-balanced" : "fc-daygrid-body-unbalanced",
      r ? "" : "fc-daygrid-body-natural"
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
          height: r ? e.clientHeight : ""
        } },
        e.colGroupNode,
        p(
          "tbody",
          { role: "presentation" },
          p(jh, { dateProfile: e.dateProfile, cells: e.cells, renderRowIntro: e.renderRowIntro, showWeekNumbers: e.showWeekNumbers, clientWidth: e.clientWidth, clientHeight: e.clientHeight, businessHourSegs: e.businessHourSegs, bgEventSegs: e.bgEventSegs, fgEventSegs: e.fgEventSegs, dateSelectionSegs: e.dateSelectionSegs, eventSelection: e.eventSelection, eventDrag: e.eventDrag, eventResize: e.eventResize, dayMaxEvents: i, dayMaxEventRows: n, forPrint: e.forPrint, isHitComboAllowed: e.isHitComboAllowed })
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
      const e = qh(this.elRef.current, this.props.dateProfile);
      if (e) {
        const n = e.closest(".fc-daygrid-body"), i = n.closest(".fc-scroller"), r = e.getBoundingClientRect().top - n.getBoundingClientRect().top;
        i.scrollTop = r ? r + 1 : 0;
      }
      this.needsScrollReset = !1;
    }
  }
}
function qh(t, e) {
  let n;
  return e.currentRangeUnit.match(/year|month/) && (n = t.querySelector(`[data-date="${Nc(e.currentDate)}-01"]`)), n || (n = t.querySelector(`[data-date="${pi(e.currentDate)}"]`)), n;
}
class Yh extends zo {
  constructor() {
    super(...arguments), this.forceDayIfListItem = !0;
  }
  sliceRange(e, n) {
    return n.sliceRange(e);
  }
}
class ua extends ne {
  constructor() {
    super(...arguments), this.slicer = new Yh(), this.tableRef = L();
  }
  render() {
    let { props: e, context: n } = this;
    return p(Gh, Object.assign({ ref: this.tableRef }, this.slicer.sliceProps(e, e.dateProfile, e.nextDayThreshold, n, e.dayTableModel), { dateProfile: e.dateProfile, cells: e.dayTableModel.cells, colGroupNode: e.colGroupNode, tableMinWidth: e.tableMinWidth, renderRowIntro: e.renderRowIntro, dayMaxEvents: e.dayMaxEvents, dayMaxEventRows: e.dayMaxEventRows, showWeekNumbers: e.showWeekNumbers, expandRows: e.expandRows, headerAlignElRef: e.headerAlignElRef, clientWidth: e.clientWidth, clientHeight: e.clientHeight, forPrint: e.forPrint }));
  }
}
class Qh extends Th {
  constructor() {
    super(...arguments), this.buildDayTableModel = A(Zh), this.headerRef = L(), this.tableRef = L();
  }
  render() {
    let { options: e, dateProfileGenerator: n } = this.context, { props: i } = this, r = this.buildDayTableModel(i.dateProfile, n), s = e.dayHeaders && p($o, { ref: this.headerRef, dateProfile: i.dateProfile, dates: r.headerDates, datesRepDistinctDays: r.rowCnt === 1 }), o = (a) => p(ua, { ref: this.tableRef, dateProfile: i.dateProfile, dayTableModel: r, businessHours: i.businessHours, dateSelection: i.dateSelection, eventStore: i.eventStore, eventUiBases: i.eventUiBases, eventSelection: i.eventSelection, eventDrag: i.eventDrag, eventResize: i.eventResize, nextDayThreshold: e.nextDayThreshold, colGroupNode: a.tableColGroupNode, tableMinWidth: a.tableMinWidth, dayMaxEvents: e.dayMaxEvents, dayMaxEventRows: e.dayMaxEventRows, showWeekNumbers: e.weekNumbers, expandRows: !i.isHeightAuto, headerAlignElRef: this.headerElRef, clientWidth: a.clientWidth, clientHeight: a.clientHeight, forPrint: i.forPrint });
    return e.dayMinWidth ? this.renderHScrollLayout(s, o, r.colCnt, e.dayMinWidth) : this.renderSimpleLayout(s, o);
  }
}
function Zh(t, e) {
  let n = new Po(t.renderRange, e);
  return new Ho(n, /year|month|week/.test(t.currentRangeUnit));
}
class Kh extends lo {
  // Computes the date range that will be rendered
  buildRenderRange(e, n, i) {
    let r = super.buildRenderRange(e, n, i), { props: s } = this;
    return Xh({
      currentRange: r,
      snapToWeek: /^(year|month)$/.test(n),
      fixedWeekCount: s.fixedWeekCount,
      dateEnv: s.dateEnv
    });
  }
}
function Xh(t) {
  let { dateEnv: e, currentRange: n } = t, { start: i, end: r } = n, s;
  if (t.snapToWeek && (i = e.startOfWeek(i), s = e.startOfWeek(r), s.valueOf() !== r.valueOf() && (r = Ar(s, 1))), t.fixedWeekCount) {
    let o = e.startOfWeek(e.startOfMonth(z(n.end, -1))), a = Math.ceil(
      // could be partial weeks due to hiddenDays
      Sc(o, r)
    );
    r = Ar(r, 6 - a);
  }
  return { start: i, end: r };
}
var Jh = ':root{--fc-daygrid-event-dot-width:8px}.fc-daygrid-day-events:after,.fc-daygrid-day-events:before,.fc-daygrid-day-frame:after,.fc-daygrid-day-frame:before,.fc-daygrid-event-harness:after,.fc-daygrid-event-harness:before{clear:both;content:"";display:table}.fc .fc-daygrid-body{position:relative;z-index:1}.fc .fc-daygrid-day.fc-day-today{background-color:var(--fc-today-bg-color)}.fc .fc-daygrid-day-frame{min-height:100%;position:relative}.fc .fc-daygrid-day-top{display:flex;flex-direction:row-reverse}.fc .fc-day-other .fc-daygrid-day-top{opacity:.3}.fc .fc-daygrid-day-number{padding:4px;position:relative;z-index:4}.fc .fc-daygrid-month-start{font-size:1.1em;font-weight:700}.fc .fc-daygrid-day-events{margin-top:1px}.fc .fc-daygrid-body-balanced .fc-daygrid-day-events{left:0;position:absolute;right:0}.fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events{min-height:2em;position:relative}.fc .fc-daygrid-body-natural .fc-daygrid-day-events{margin-bottom:1em}.fc .fc-daygrid-event-harness{position:relative}.fc .fc-daygrid-event-harness-abs{left:0;position:absolute;right:0;top:0}.fc .fc-daygrid-bg-harness{bottom:0;position:absolute;top:0}.fc .fc-daygrid-day-bg .fc-non-business{z-index:1}.fc .fc-daygrid-day-bg .fc-bg-event{z-index:2}.fc .fc-daygrid-day-bg .fc-highlight{z-index:3}.fc .fc-daygrid-event{margin-top:1px;z-index:6}.fc .fc-daygrid-event.fc-event-mirror{z-index:7}.fc .fc-daygrid-day-bottom{font-size:.85em;margin:0 2px}.fc .fc-daygrid-day-bottom:after,.fc .fc-daygrid-day-bottom:before{clear:both;content:"";display:table}.fc .fc-daygrid-more-link{border-radius:3px;cursor:pointer;line-height:1;margin-top:1px;max-width:100%;overflow:hidden;padding:2px;position:relative;white-space:nowrap;z-index:4}.fc .fc-daygrid-more-link:hover{background-color:rgba(0,0,0,.1)}.fc .fc-daygrid-week-number{background-color:var(--fc-neutral-bg-color);color:var(--fc-neutral-text-color);min-width:1.5em;padding:2px;position:absolute;text-align:center;top:0;z-index:5}.fc .fc-more-popover .fc-popover-body{min-width:220px;padding:10px}.fc-direction-ltr .fc-daygrid-event.fc-event-start,.fc-direction-rtl .fc-daygrid-event.fc-event-end{margin-left:2px}.fc-direction-ltr .fc-daygrid-event.fc-event-end,.fc-direction-rtl .fc-daygrid-event.fc-event-start{margin-right:2px}.fc-direction-ltr .fc-daygrid-more-link{float:left}.fc-direction-ltr .fc-daygrid-week-number{border-radius:0 0 3px 0;left:0}.fc-direction-rtl .fc-daygrid-more-link{float:right}.fc-direction-rtl .fc-daygrid-week-number{border-radius:0 0 0 3px;right:0}.fc-liquid-hack .fc-daygrid-day-frame{position:static}.fc-daygrid-event{border-radius:3px;font-size:var(--fc-small-font-size);position:relative;white-space:nowrap}.fc-daygrid-block-event .fc-event-time{font-weight:700}.fc-daygrid-block-event .fc-event-time,.fc-daygrid-block-event .fc-event-title{padding:1px}.fc-daygrid-dot-event{align-items:center;display:flex;padding:2px 0}.fc-daygrid-dot-event .fc-event-title{flex-grow:1;flex-shrink:1;font-weight:700;min-width:0;overflow:hidden}.fc-daygrid-dot-event.fc-event-mirror,.fc-daygrid-dot-event:hover{background:rgba(0,0,0,.1)}.fc-daygrid-dot-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-daygrid-event-dot{border:calc(var(--fc-daygrid-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-daygrid-event-dot-width)/2);box-sizing:content-box;height:0;margin:0 4px;width:0}.fc-direction-ltr .fc-daygrid-event .fc-event-time{margin-right:3px}.fc-direction-rtl .fc-daygrid-event .fc-event-time{margin-left:3px}';
li(Jh);
var ep = le({
  name: "@fullcalendar/daygrid",
  initialView: "dayGridMonth",
  views: {
    dayGrid: {
      component: Qh,
      dateProfileGeneratorClass: Kh
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
Ii.touchMouseIgnoreWait = 500;
let Qn = 0, Kt = 0, Zn = !1;
class fa {
  constructor(e) {
    this.subjectEl = null, this.selector = "", this.handleSelector = "", this.shouldIgnoreMove = !1, this.shouldWatchScroll = !0, this.isDragging = !1, this.isTouchDragging = !1, this.wasTouchScroll = !1, this.handleMouseDown = (n) => {
      if (!this.shouldIgnoreMouse() && tp(n) && this.tryStart(n)) {
        let i = this.createEventFromMouse(n, !0);
        this.emitter.trigger("pointerdown", i), this.initScrollWatch(i), this.shouldIgnoreMove || document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("mouseup", this.handleMouseUp);
      }
    }, this.handleMouseMove = (n) => {
      let i = this.createEventFromMouse(n);
      this.recordCoords(i), this.emitter.trigger("pointermove", i);
    }, this.handleMouseUp = (n) => {
      document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp), this.emitter.trigger("pointerup", this.createEventFromMouse(n)), this.cleanup();
    }, this.handleTouchStart = (n) => {
      if (this.tryStart(n)) {
        this.isTouchDragging = !0;
        let i = this.createEventFromTouch(n, !0);
        this.emitter.trigger("pointerdown", i), this.initScrollWatch(i);
        let r = n.target;
        this.shouldIgnoreMove || r.addEventListener("touchmove", this.handleTouchMove), r.addEventListener("touchend", this.handleTouchEnd), r.addEventListener("touchcancel", this.handleTouchEnd), window.addEventListener("scroll", this.handleTouchScroll, !0);
      }
    }, this.handleTouchMove = (n) => {
      let i = this.createEventFromTouch(n);
      this.recordCoords(i), this.emitter.trigger("pointermove", i);
    }, this.handleTouchEnd = (n) => {
      if (this.isDragging) {
        let i = n.target;
        i.removeEventListener("touchmove", this.handleTouchMove), i.removeEventListener("touchend", this.handleTouchEnd), i.removeEventListener("touchcancel", this.handleTouchEnd), window.removeEventListener("scroll", this.handleTouchScroll, !0), this.emitter.trigger("pointerup", this.createEventFromTouch(n)), this.cleanup(), this.isTouchDragging = !1, np();
      }
    }, this.handleTouchScroll = () => {
      this.wasTouchScroll = !0;
    }, this.handleScroll = (n) => {
      if (!this.shouldIgnoreMove) {
        let i = window.scrollX - this.prevScrollX + this.prevPageX, r = window.scrollY - this.prevScrollY + this.prevPageY;
        this.emitter.trigger("pointermove", {
          origEvent: n,
          isTouch: this.isTouchDragging,
          subjectEl: this.subjectEl,
          pageX: i,
          pageY: r,
          deltaX: i - this.origPageX,
          deltaY: r - this.origPageY
        });
      }
    }, this.containerEl = e, this.emitter = new un(), e.addEventListener("mousedown", this.handleMouseDown), e.addEventListener("touchstart", this.handleTouchStart, { passive: !0 }), ip();
  }
  destroy() {
    this.containerEl.removeEventListener("mousedown", this.handleMouseDown), this.containerEl.removeEventListener("touchstart", this.handleTouchStart, { passive: !0 }), rp();
  }
  tryStart(e) {
    let n = this.querySubjectEl(e), i = e.target;
    return n && (!this.handleSelector || B(i, this.handleSelector)) ? (this.subjectEl = n, this.isDragging = !0, this.wasTouchScroll = !1, !0) : !1;
  }
  cleanup() {
    Zn = !1, this.isDragging = !1, this.subjectEl = null, this.destroyScrollWatch();
  }
  querySubjectEl(e) {
    return this.selector ? B(e.target, this.selector) : this.containerEl;
  }
  shouldIgnoreMouse() {
    return Qn || this.isTouchDragging;
  }
  // can be called by user of this class, to cancel touch-based scrolling for the current drag
  cancelTouchScroll() {
    this.isDragging && (Zn = !0);
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
    let i = 0, r = 0;
    return n ? (this.origPageX = e.pageX, this.origPageY = e.pageY) : (i = e.pageX - this.origPageX, r = e.pageY - this.origPageY), {
      origEvent: e,
      isTouch: !1,
      subjectEl: this.subjectEl,
      pageX: e.pageX,
      pageY: e.pageY,
      deltaX: i,
      deltaY: r
    };
  }
  createEventFromTouch(e, n) {
    let i = e.touches, r, s, o = 0, a = 0;
    return i && i.length ? (r = i[0].pageX, s = i[0].pageY) : (r = e.pageX, s = e.pageY), n ? (this.origPageX = r, this.origPageY = s) : (o = r - this.origPageX, a = s - this.origPageY), {
      origEvent: e,
      isTouch: !0,
      subjectEl: this.subjectEl,
      pageX: r,
      pageY: s,
      deltaX: o,
      deltaY: a
    };
  }
}
function tp(t) {
  return t.button === 0 && !t.ctrlKey;
}
function np() {
  Qn += 1, setTimeout(() => {
    Qn -= 1;
  }, Ii.touchMouseIgnoreWait);
}
function ip() {
  Kt += 1, Kt === 1 && window.addEventListener("touchmove", ha, { passive: !1 });
}
function rp() {
  Kt -= 1, Kt || window.removeEventListener("touchmove", ha, { passive: !1 });
}
function ha(t) {
  Zn && t.preventDefault();
}
class sp {
  constructor() {
    this.isVisible = !1, this.sourceEl = null, this.mirrorEl = null, this.sourceElRect = null, this.parentNode = document.body, this.zIndex = 9999, this.revertDuration = 0;
  }
  start(e, n, i) {
    this.sourceEl = e, this.sourceElRect = this.sourceEl.getBoundingClientRect(), this.origScreenX = n - window.scrollX, this.origScreenY = i - window.scrollY, this.deltaX = 0, this.deltaY = 0, this.updateElPosition();
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
    let i = () => {
      this.cleanup(), n();
    };
    e && this.mirrorEl && this.isVisible && this.revertDuration && // if 0, transition won't work
    (this.deltaX || this.deltaY) ? this.doRevertAnimation(i, this.revertDuration) : setTimeout(i, 0);
  }
  doRevertAnimation(e, n) {
    let i = this.mirrorEl, r = this.sourceEl.getBoundingClientRect();
    i.style.transition = "top " + n + "ms,left " + n + "ms", ot(i, {
      left: r.left,
      top: r.top
    }), ic(i, () => {
      i.style.transition = "", e();
    });
  }
  cleanup() {
    this.mirrorEl && (di(this.mirrorEl), this.mirrorEl = null), this.sourceEl = null;
  }
  updateElPosition() {
    this.sourceEl && this.isVisible && ot(this.getMirrorEl(), {
      left: this.sourceElRect.left + this.deltaX,
      top: this.sourceElRect.top + this.deltaY
    });
  }
  getMirrorEl() {
    let e = this.sourceElRect, n = this.mirrorEl;
    return n || (n = this.mirrorEl = this.sourceEl.cloneNode(!0), n.style.userSelect = "none", n.style.webkitUserSelect = "none", n.style.pointerEvents = "none", n.classList.add("fc-event-dragging"), ot(n, {
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
class pa extends ki {
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
class ga extends pa {
  constructor(e, n) {
    super(new _u(e), n);
  }
  getEventTarget() {
    return this.scrollController.el;
  }
  computeClientRect() {
    return Cu(this.scrollController.el);
  }
}
class op extends pa {
  constructor(e) {
    super(new Ru(), e);
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
const Qr = typeof performance == "function" ? performance.now : Date.now;
class ap {
  constructor() {
    this.isEnabled = !0, this.scrollQuery = [window, ".fc-scroller"], this.edgeThreshold = 50, this.maxVelocity = 300, this.pointerScreenX = null, this.pointerScreenY = null, this.isAnimating = !1, this.scrollCaches = null, this.everMovedUp = !1, this.everMovedDown = !1, this.everMovedLeft = !1, this.everMovedRight = !1, this.animate = () => {
      if (this.isAnimating) {
        let e = this.computeBestEdge(this.pointerScreenX + window.scrollX, this.pointerScreenY + window.scrollY);
        if (e) {
          let n = Qr();
          this.handleSide(e, (n - this.msSinceRequest) / 1e3), this.requestAnimation(n);
        } else
          this.isAnimating = !1;
      }
    };
  }
  start(e, n, i) {
    this.isEnabled && (this.scrollCaches = this.buildCaches(i), this.pointerScreenX = null, this.pointerScreenY = null, this.everMovedUp = !1, this.everMovedDown = !1, this.everMovedLeft = !1, this.everMovedRight = !1, this.handleMove(e, n));
  }
  handleMove(e, n) {
    if (this.isEnabled) {
      let i = e - window.scrollX, r = n - window.scrollY, s = this.pointerScreenY === null ? 0 : r - this.pointerScreenY, o = this.pointerScreenX === null ? 0 : i - this.pointerScreenX;
      s < 0 ? this.everMovedUp = !0 : s > 0 && (this.everMovedDown = !0), o < 0 ? this.everMovedLeft = !0 : o > 0 && (this.everMovedRight = !0), this.pointerScreenX = i, this.pointerScreenY = r, this.isAnimating || (this.isAnimating = !0, this.requestAnimation(Qr()));
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
    let { scrollCache: i } = e, { edgeThreshold: r } = this, s = r - e.distance, o = (
      // the closer to the edge, the faster we scroll
      s * s / (r * r) * // quadratic
      this.maxVelocity * n
    ), a = 1;
    switch (e.name) {
      case "left":
        a = -1;
      // falls through
      case "right":
        i.setScrollLeft(i.getScrollLeft() + o * a);
        break;
      case "top":
        a = -1;
      // falls through
      case "bottom":
        i.setScrollTop(i.getScrollTop() + o * a);
        break;
    }
  }
  // left/top are relative to document topleft
  computeBestEdge(e, n) {
    let { edgeThreshold: i } = this, r = null, s = this.scrollCaches || [];
    for (let o of s) {
      let a = o.clientRect, l = e - a.left, d = a.right - e, c = n - a.top, h = a.bottom - n;
      l >= 0 && d >= 0 && c >= 0 && h >= 0 && (c <= i && this.everMovedUp && o.canScrollUp() && (!r || r.distance > c) && (r = { scrollCache: o, name: "top", distance: c }), h <= i && this.everMovedDown && o.canScrollDown() && (!r || r.distance > h) && (r = { scrollCache: o, name: "bottom", distance: h }), l <= i && this.everMovedLeft && o.canScrollLeft() && (!r || r.distance > l) && (r = { scrollCache: o, name: "left", distance: l }), d <= i && this.everMovedRight && o.canScrollRight() && (!r || r.distance > d) && (r = { scrollCache: o, name: "right", distance: d }));
    }
    return r;
  }
  buildCaches(e) {
    return this.queryScrollEls(e).map((n) => n === window ? new op(!1) : new ga(n, !1));
  }
  queryScrollEls(e) {
    let n = [];
    for (let i of this.scrollQuery)
      typeof i == "object" ? n.push(i) : n.push(...Array.prototype.slice.call(e.getRootNode().querySelectorAll(i)));
    return n;
  }
}
class mt extends Mu {
  constructor(e, n) {
    super(e), this.containerEl = e, this.delay = null, this.minDistance = 0, this.touchScrollAllowed = !0, this.mirrorNeedsRevert = !1, this.isInteracting = !1, this.isDragging = !1, this.isDelayEnded = !1, this.isDistanceSurpassed = !1, this.delayTimeoutId = null, this.onPointerDown = (r) => {
      this.isDragging || (this.isInteracting = !0, this.isDelayEnded = !1, this.isDistanceSurpassed = !1, rc(document.body), oc(document.body), r.isTouch || r.origEvent.preventDefault(), this.emitter.trigger("pointerdown", r), this.isInteracting && // not destroyed via pointerdown handler
      !this.pointer.shouldIgnoreMove && (this.mirror.setIsVisible(!1), this.mirror.start(r.subjectEl, r.pageX, r.pageY), this.startDelay(r), this.minDistance || this.handleDistanceSurpassed(r)));
    }, this.onPointerMove = (r) => {
      if (this.isInteracting) {
        if (this.emitter.trigger("pointermove", r), !this.isDistanceSurpassed) {
          let s = this.minDistance, o, { deltaX: a, deltaY: l } = r;
          o = a * a + l * l, o >= s * s && this.handleDistanceSurpassed(r);
        }
        this.isDragging && (r.origEvent.type !== "scroll" && (this.mirror.handleMove(r.pageX, r.pageY), this.autoScroller.handleMove(r.pageX, r.pageY)), this.emitter.trigger("dragmove", r));
      }
    }, this.onPointerUp = (r) => {
      this.isInteracting && (this.isInteracting = !1, sc(document.body), ac(document.body), this.emitter.trigger("pointerup", r), this.isDragging && (this.autoScroller.stop(), this.tryStopDrag(r)), this.delayTimeoutId && (clearTimeout(this.delayTimeoutId), this.delayTimeoutId = null));
    };
    let i = this.pointer = new fa(e);
    i.emitter.on("pointerdown", this.onPointerDown), i.emitter.on("pointermove", this.onPointerMove), i.emitter.on("pointerup", this.onPointerUp), n && (i.selector = n), this.mirror = new sp(), this.autoScroller = new ap();
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
class lp {
  constructor(e) {
    this.el = e, this.origRect = Ti(e), this.scrollCaches = Mo(e).map((n) => new ga(n, !0));
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
    let i = { left: e, top: n };
    for (let r of this.scrollCaches)
      if (!cp(r.getEventTarget()) && !fu(i, r.clientRect))
        return !1;
    return !0;
  }
}
function cp(t) {
  let e = t.tagName;
  return e === "HTML" || e === "BODY";
}
class fn {
  constructor(e, n) {
    this.useSubjectCenter = !1, this.requireInitial = !0, this.disablePointCheck = !1, this.initialHit = null, this.movingHit = null, this.finalHit = null, this.handlePointerDown = (i) => {
      let { dragging: r } = this;
      this.initialHit = null, this.movingHit = null, this.finalHit = null, this.prepareHits(), this.processFirstCoord(i), this.initialHit || !this.requireInitial ? (r.setIgnoreMove(!1), this.emitter.trigger("pointerdown", i)) : r.setIgnoreMove(!0);
    }, this.handleDragStart = (i) => {
      this.emitter.trigger("dragstart", i), this.handleMove(i, !0);
    }, this.handleDragMove = (i) => {
      this.emitter.trigger("dragmove", i), this.handleMove(i);
    }, this.handlePointerUp = (i) => {
      this.releaseHits(), this.emitter.trigger("pointerup", i);
    }, this.handleDragEnd = (i) => {
      this.movingHit && this.emitter.trigger("hitupdate", null, !0, i), this.finalHit = this.movingHit, this.movingHit = null, this.emitter.trigger("dragend", i);
    }, this.droppableStore = n, e.emitter.on("pointerdown", this.handlePointerDown), e.emitter.on("dragstart", this.handleDragStart), e.emitter.on("dragmove", this.handleDragMove), e.emitter.on("pointerup", this.handlePointerUp), e.emitter.on("dragend", this.handleDragEnd), this.dragging = e, this.emitter = new un();
  }
  // sets initialHit
  // sets coordAdjust
  processFirstCoord(e) {
    let n = { left: e.pageX, top: e.pageY }, i = n, r = e.subjectEl, s;
    r instanceof HTMLElement && (s = Ti(r), i = hu(i, s));
    let o = this.initialHit = this.queryHitForOffset(i.left, i.top);
    if (o) {
      if (this.useSubjectCenter && s) {
        let a = Ro(s, o.rect);
        a && (i = pu(a));
      }
      this.coordAdjust = gu(i, n);
    } else
      this.coordAdjust = { left: 0, top: 0 };
  }
  handleMove(e, n) {
    let i = this.queryHitForOffset(e.pageX + this.coordAdjust.left, e.pageY + this.coordAdjust.top);
    (n || !hn(this.movingHit, i)) && (this.movingHit = i, this.emitter.trigger("hitupdate", i, !1, e));
  }
  prepareHits() {
    this.offsetTrackers = oe(this.droppableStore, (e) => (e.component.prepareHits(), new lp(e.el)));
  }
  releaseHits() {
    let { offsetTrackers: e } = this;
    for (let n in e)
      e[n].destroy();
    this.offsetTrackers = {};
  }
  queryHitForOffset(e, n) {
    let { droppableStore: i, offsetTrackers: r } = this, s = null;
    for (let o in i) {
      let a = i[o].component, l = r[o];
      if (l && // wasn't destroyed mid-drag
      l.isWithinClipping(e, n)) {
        let d = l.computeLeft(), c = l.computeTop(), h = e - d, f = n - c, { origRect: u } = l, g = u.right - u.left, m = u.bottom - u.top;
        if (
          // must be within the element's bounds
          h >= 0 && h < g && f >= 0 && f < m
        ) {
          let b = a.queryHit(h, f, g, m);
          b && // make sure the hit is within activeRange, meaning it's not a dead cell
          cn(b.dateProfile.activeRange, b.dateSpan.range) && // Ensure the component we are querying for the hit is accessibly my the pointer
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
function hn(t, e) {
  return !t && !e ? !0 : !!t != !!e ? !1 : tu(t.dateSpan, e.dateSpan);
}
function ma(t, e) {
  let n = {};
  for (let i of e.pluginHooks.datePointTransforms)
    Object.assign(n, i(t, e));
  return Object.assign(n, dp(t, e.dateEnv)), n;
}
function dp(t, e) {
  return {
    date: e.toDate(t.range.start),
    dateStr: e.formatIso(t.range.start, { omitTime: t.allDay }),
    allDay: t.allDay
  };
}
class up extends Xe {
  constructor(e) {
    super(e), this.handlePointerDown = (i) => {
      let { dragging: r } = this, s = i.origEvent.target;
      r.setIgnoreMove(!this.component.isValidDateDownEl(s));
    }, this.handleDragEnd = (i) => {
      let { component: r } = this, { pointer: s } = this.dragging;
      if (!s.wasTouchScroll) {
        let { initialHit: o, finalHit: a } = this.hitDragging;
        if (o && a && hn(o, a)) {
          let { context: l } = r, d = Object.assign(Object.assign({}, ma(o.dateSpan, l)), { dayEl: o.dayEl, jsEvent: i.origEvent, view: l.viewApi || l.calendarApi.view });
          l.emitter.trigger("dateClick", d);
        }
      }
    }, this.dragging = new mt(e.el), this.dragging.autoScroller.isEnabled = !1;
    let n = this.hitDragging = new fn(this.dragging, _i(e));
    n.emitter.on("pointerdown", this.handlePointerDown), n.emitter.on("dragend", this.handleDragEnd);
  }
  destroy() {
    this.dragging.destroy();
  }
}
class fp extends Xe {
  constructor(e) {
    super(e), this.dragSelection = null, this.handlePointerDown = (o) => {
      let { component: a, dragging: l } = this, { options: d } = a.context, c = d.selectable && a.isValidDateDownEl(o.origEvent.target);
      l.setIgnoreMove(!c), l.delay = o.isTouch ? hp(a) : null;
    }, this.handleDragStart = (o) => {
      this.component.context.calendarApi.unselect(o);
    }, this.handleHitUpdate = (o, a) => {
      let { context: l } = this.component, d = null, c = !1;
      if (o) {
        let h = this.hitDragging.initialHit;
        o.componentId === h.componentId && this.isHitComboAllowed && !this.isHitComboAllowed(h, o) || (d = pp(h, o, l.pluginHooks.dateSelectionTransformers)), (!d || !Hu(d, o.dateProfile, l)) && (c = !0, d = null);
      }
      d ? l.dispatch({ type: "SELECT_DATES", selection: d }) : a || l.dispatch({ type: "UNSELECT_DATES" }), c ? ui() : fi(), a || (this.dragSelection = d);
    }, this.handlePointerUp = (o) => {
      this.dragSelection && (bo(this.dragSelection, o, this.component.context), this.dragSelection = null);
    };
    let { component: n } = e, { options: i } = n.context, r = this.dragging = new mt(e.el);
    r.touchScrollAllowed = !1, r.minDistance = i.selectMinDistance || 0, r.autoScroller.isEnabled = i.dragScroll;
    let s = this.hitDragging = new fn(this.dragging, _i(e));
    s.emitter.on("pointerdown", this.handlePointerDown), s.emitter.on("dragstart", this.handleDragStart), s.emitter.on("hitupdate", this.handleHitUpdate), s.emitter.on("pointerup", this.handlePointerUp);
  }
  destroy() {
    this.dragging.destroy();
  }
}
function hp(t) {
  let { options: e } = t.context, n = e.selectLongPressDelay;
  return n == null && (n = e.longPressDelay), n;
}
function pp(t, e, n) {
  let i = t.dateSpan, r = e.dateSpan, s = [
    i.range.start,
    i.range.end,
    r.range.start,
    r.range.end
  ];
  s.sort(fc);
  let o = {};
  for (let a of n) {
    let l = a(t, e);
    if (l === !1)
      return null;
    l && Object.assign(o, l);
  }
  return o.range = { start: s[0], end: s[3] }, o.allDay = i.allDay, o;
}
class vt extends Xe {
  constructor(e) {
    super(e), this.subjectEl = null, this.subjectSeg = null, this.isDragging = !1, this.eventRange = null, this.relevantEvents = null, this.receivingContext = null, this.validMutation = null, this.mutatedRelevantEvents = null, this.handlePointerDown = (o) => {
      let a = o.origEvent.target, { component: l, dragging: d } = this, { mirror: c } = d, { options: h } = l.context, f = l.context;
      this.subjectEl = o.subjectEl;
      let u = this.subjectSeg = Qe(o.subjectEl), m = (this.eventRange = u.eventRange).instance.instanceId;
      this.relevantEvents = Ai(f.getCurrentData().eventStore, m), d.minDistance = o.isTouch ? 0 : h.eventDragMinDistance, d.delay = // only do a touch delay if touch and this event hasn't been selected yet
      o.isTouch && m !== l.props.eventSelection ? mp(l) : null, h.fixedMirrorParent ? c.parentNode = h.fixedMirrorParent : c.parentNode = B(a, ".fc"), c.revertDuration = h.dragRevertDuration;
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
        mutatedEvents: V(),
        isEvent: !0
      };
      if (o) {
        h = o.context;
        let b = h.options;
        c === h || b.editable && b.droppable ? (f = gp(d, o, this.eventRange.instance.range.start, h.getCurrentData().pluginHooks.eventDragMutationMassagers), f && (u = xi(l, h.getCurrentData().eventUiBases, f, h), m.mutatedEvents = u, Bo(m, o.dateProfile, h) || (g = !0, f = null, u = null, m.mutatedEvents = V()))) : h = null;
      }
      this.displayDrag(h, m), g ? ui() : fi(), a || (c === h && // TODO: write test for this
      hn(d, o) && (f = null), this.dragging.setMirrorNeedsRevert(!f), this.dragging.setMirrorIsVisible(!o || !this.subjectEl.getRootNode().querySelector(".fc-event-mirror")), this.receivingContext = h, this.validMutation = f, this.mutatedRelevantEvents = u);
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
            let w = {
              oldEvent: u,
              event: y,
              relatedEvents: _e(m, a, f),
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
            a.emitter.trigger("eventDrop", Object.assign(Object.assign(Object.assign({}, w), D), { el: o.subjectEl, delta: c.datesDelta, jsEvent: o.origEvent, view: l })), a.emitter.trigger("eventChange", w);
          } else if (d) {
            let y = {
              event: u,
              relatedEvents: _e(g, a, f),
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
            let w = m.defs[h.defId], D = m.instances[f.instanceId], C = new N(d, w, D);
            d.dispatch({
              type: "MERGE_EVENTS",
              eventStore: m
            });
            let P = {
              event: C,
              relatedEvents: _e(m, d, D),
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
            }), d.emitter.trigger("drop", Object.assign(Object.assign({}, ma(b.dateSpan, d)), { draggedEl: o.subjectEl, jsEvent: o.origEvent, view: b.context.viewApi })), d.emitter.trigger("eventReceive", Object.assign(Object.assign({}, P), { draggedEl: o.subjectEl, view: b.context.viewApi }));
          }
        } else
          a.emitter.trigger("_noEventDrop");
      }
      this.cleanup();
    };
    let { component: n } = this, { options: i } = n.context, r = this.dragging = new mt(e.el);
    r.pointer.selector = vt.SELECTOR, r.touchScrollAllowed = !1, r.autoScroller.isEnabled = i.dragScroll;
    let s = this.hitDragging = new fn(this.dragging, Wn);
    s.useSubjectCenter = e.useEventCenter, s.emitter.on("pointerdown", this.handlePointerDown), s.emitter.on("dragstart", this.handleDragStart), s.emitter.on("hitupdate", this.handleHitUpdate), s.emitter.on("pointerup", this.handlePointerUp), s.emitter.on("dragend", this.handleDragEnd);
  }
  destroy() {
    this.dragging.destroy();
  }
  // render a drag state on the next receivingCalendar
  displayDrag(e, n) {
    let i = this.component.context, r = this.receivingContext;
    r && r !== e && (r === i ? r.dispatch({
      type: "SET_EVENT_DRAG",
      state: {
        affectedEvents: n.affectedEvents,
        mutatedEvents: V(),
        isEvent: !0
      }
    }) : r.dispatch({ type: "UNSET_EVENT_DRAG" })), e && e.dispatch({ type: "SET_EVENT_DRAG", state: n });
  }
  clearDrag() {
    let e = this.component.context, { receivingContext: n } = this;
    n && n.dispatch({ type: "UNSET_EVENT_DRAG" }), e !== n && e.dispatch({ type: "UNSET_EVENT_DRAG" });
  }
  cleanup() {
    this.subjectSeg = null, this.isDragging = !1, this.eventRange = null, this.relevantEvents = null, this.receivingContext = null, this.validMutation = null, this.mutatedRelevantEvents = null;
  }
}
vt.SELECTOR = ".fc-event-draggable, .fc-event-resizable";
function gp(t, e, n, i) {
  let r = t.dateSpan, s = e.dateSpan, o = r.range.start, a = s.range.start, l = {};
  r.allDay !== s.allDay && (l.allDay = s.allDay, l.hasEnd = e.context.options.allDayMaintainDuration, s.allDay ? o = M(n) : o = n);
  let d = ze(o, a, t.context.dateEnv, t.componentId === e.componentId ? t.largeUnit : null);
  d.milliseconds && (l.allDay = !1);
  let c = {
    datesDelta: d,
    standardProps: l
  };
  for (let h of i)
    h(c, t, e);
  return c;
}
function mp(t) {
  let { options: e } = t.context, n = e.eventLongPressDelay;
  return n == null && (n = e.longPressDelay), n;
}
class vp extends Xe {
  constructor(e) {
    super(e), this.draggingSegEl = null, this.draggingSeg = null, this.eventRange = null, this.relevantEvents = null, this.validMutation = null, this.mutatedRelevantEvents = null, this.handlePointerDown = (s) => {
      let { component: o } = this, a = this.querySegEl(s), l = Qe(a), d = this.eventRange = l.eventRange;
      this.dragging.minDistance = o.context.options.eventDragMinDistance, this.dragging.setIgnoreMove(!this.component.isValidSegDownEl(s.origEvent.target) || s.isTouch && this.component.props.eventSelection !== d.instance.instanceId);
    }, this.handleDragStart = (s) => {
      let { context: o } = this.component, a = this.eventRange;
      this.relevantEvents = Ai(o.getCurrentData().eventStore, this.eventRange.instance.instanceId);
      let l = this.querySegEl(s);
      this.draggingSegEl = l, this.draggingSeg = Qe(l), o.calendarApi.unselect(), o.emitter.trigger("eventResizeStart", {
        el: l,
        event: new N(o, a.def, a.instance),
        jsEvent: s.origEvent,
        view: o.viewApi
      });
    }, this.handleHitUpdate = (s, o, a) => {
      let { context: l } = this.component, d = this.relevantEvents, c = this.hitDragging.initialHit, h = this.eventRange.instance, f = null, u = null, g = !1, m = {
        affectedEvents: d,
        mutatedEvents: V(),
        isEvent: !0
      };
      s && (s.componentId === c.componentId && this.isHitComboAllowed && !this.isHitComboAllowed(c, s) || (f = bp(c, s, a.subjectEl.classList.contains("fc-event-resizer-start"), h.range))), f && (u = xi(d, l.getCurrentData().eventUiBases, f, l), m.mutatedEvents = u, Bo(m, s.dateProfile, l) || (g = !0, f = null, u = null, m.mutatedEvents = null)), u ? l.dispatch({
        type: "SET_EVENT_RESIZE",
        state: m
      }) : l.dispatch({ type: "UNSET_EVENT_RESIZE" }), g ? ui() : fi(), o || (f && hn(c, s) && (f = null), this.validMutation = f, this.mutatedRelevantEvents = u);
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
          relatedEvents: _e(h, o, l),
          revert() {
            o.dispatch({
              type: "MERGE_EVENTS",
              eventStore: c
              // the pre-change events
            });
          }
        };
        o.emitter.trigger("eventResize", Object.assign(Object.assign({}, u), { el: this.draggingSegEl, startDelta: this.validMutation.startDelta || x(0), endDelta: this.validMutation.endDelta || x(0), jsEvent: s.origEvent, view: o.viewApi })), o.emitter.trigger("eventChange", u);
      } else
        o.emitter.trigger("_noEventResize");
      this.draggingSeg = null, this.relevantEvents = null, this.validMutation = null;
    };
    let { component: n } = e, i = this.dragging = new mt(e.el);
    i.pointer.selector = ".fc-event-resizer", i.touchScrollAllowed = !1, i.autoScroller.isEnabled = n.context.options.dragScroll;
    let r = this.hitDragging = new fn(this.dragging, _i(e));
    r.emitter.on("pointerdown", this.handlePointerDown), r.emitter.on("dragstart", this.handleDragStart), r.emitter.on("hitupdate", this.handleHitUpdate), r.emitter.on("dragend", this.handleDragEnd);
  }
  destroy() {
    this.dragging.destroy();
  }
  querySegEl(e) {
    return B(e.subjectEl, ".fc-event");
  }
}
function bp(t, e, n, i) {
  let r = t.context.dateEnv, s = t.dateSpan.range.start, o = e.dateSpan.range.start, a = ze(s, o, r, t.largeUnit);
  if (n) {
    if (r.add(i.start, a) < i.end)
      return { startDelta: a };
  } else if (r.add(i.end, a) > i.start)
    return { endDelta: a };
  return null;
}
class yp {
  constructor(e) {
    this.context = e, this.isRecentPointerDateSelect = !1, this.matchesCancel = !1, this.matchesEvent = !1, this.onSelect = (i) => {
      i.jsEvent && (this.isRecentPointerDateSelect = !0);
    }, this.onDocumentPointerDown = (i) => {
      let r = this.context.options.unselectCancel, s = Ys(i.origEvent);
      this.matchesCancel = !!B(s, r), this.matchesEvent = !!B(s, vt.SELECTOR);
    }, this.onDocumentPointerUp = (i) => {
      let { context: r } = this, { documentPointer: s } = this, o = r.getCurrentData();
      if (!s.wasTouchScroll) {
        if (o.dateSelection && // an existing date selection?
        !this.isRecentPointerDateSelect) {
          let a = r.options.unselectAuto;
          a && (!a || !this.matchesCancel) && r.calendarApi.unselect(i);
        }
        o.eventSelection && // an existing event selected?
        !this.matchesEvent && r.dispatch({ type: "UNSELECT_EVENT" });
      }
      this.isRecentPointerDateSelect = !1;
    };
    let n = this.documentPointer = new fa(document);
    n.shouldIgnoreMove = !0, n.shouldWatchScroll = !1, n.emitter.on("pointerdown", this.onDocumentPointerDown), n.emitter.on("pointerup", this.onDocumentPointerUp), e.emitter.on("select", this.onSelect);
  }
  destroy() {
    this.context.emitter.off("select", this.onSelect), this.documentPointer.destroy();
  }
}
const Ep = {
  fixedMirrorParent: v
}, wp = {
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
Ii.dataAttrPrefix = "";
var Sp = le({
  name: "@fullcalendar/interaction",
  componentInteractions: [up, fp, vt, vp],
  calendarInteractions: [yp],
  elementDraggingImpl: mt,
  optionRefiners: Ep,
  listenerRefiners: wp
});
class Ap extends mu {
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
    return e.allDay ? Gd(e) ? ["timed", "allDay"] : ["allDay"] : ["timed"];
  }
}
const Dp = O({
  hour: "numeric",
  minute: "2-digit",
  omitZeroMinute: !0,
  meridiem: "short"
});
function va(t) {
  let e = [
    "fc-timegrid-slot",
    "fc-timegrid-slot-label",
    t.isLabeled ? "fc-scrollgrid-shrink" : "fc-timegrid-slot-minor"
  ];
  return p(ae.Consumer, null, (n) => {
    if (!t.isLabeled)
      return p("td", { className: e.join(" "), "data-time": t.isoTimeStr });
    let { dateEnv: i, options: r, viewApi: s } = n, o = (
      // TODO: fully pre-parse
      r.slotLabelFormat == null ? Dp : Array.isArray(r.slotLabelFormat) ? O(r.slotLabelFormat[0]) : O(r.slotLabelFormat)
    ), a = {
      level: 0,
      time: t.time,
      date: i.toDate(t.date),
      view: s,
      text: i.format(t.date, o)
    };
    return p(G, { elTag: "td", elClasses: e, elAttrs: {
      "data-time": t.isoTimeStr
    }, renderProps: a, generatorName: "slotLabelContent", customGenerator: r.slotLabelContent, defaultGenerator: Cp, classNameGenerator: r.slotLabelClassNames, didMount: r.slotLabelDidMount, willUnmount: r.slotLabelWillUnmount }, (l) => p(
      "div",
      { className: "fc-timegrid-slot-label-frame fc-scrollgrid-shrink-frame" },
      p(l, { elTag: "div", elClasses: [
        "fc-timegrid-slot-label-cushion",
        "fc-scrollgrid-shrink-cushion"
      ] })
    ));
  });
}
function Cp(t) {
  return t.text;
}
class xp extends R {
  render() {
    return this.props.slatMetas.map((e) => p(
      "tr",
      { key: e.key },
      p(va, Object.assign({}, e))
    ));
  }
}
const _p = O({ week: "short" }), Rp = 5;
class Tp extends ne {
  constructor() {
    super(...arguments), this.allDaySplitter = new Ap(), this.headerElRef = L(), this.rootElRef = L(), this.scrollerElRef = L(), this.state = {
      slatCoords: null
    }, this.handleScrollTopRequest = (e) => {
      let n = this.scrollerElRef.current;
      n && (n.scrollTop = e);
    }, this.renderHeadAxis = (e, n = "") => {
      let { options: i } = this.context, { dateProfile: r } = this.props, s = r.renderRange, a = Oe(s.start, s.end) === 1 ? Qt(this.context, s.start, "week") : {};
      return i.weekNumbers && e === "day" ? p(Go, { elTag: "th", elClasses: [
        "fc-timegrid-axis",
        "fc-scrollgrid-shrink"
      ], elAttrs: {
        "aria-hidden": !0
      }, date: s.start, defaultFormat: _p }, (l) => p(
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
      let { options: n, viewApi: i } = this.context, r = {
        text: n.allDayText,
        view: i
      };
      return (
        // TODO: make reusable hook. used in list view too
        p(G, { elTag: "td", elClasses: [
          "fc-timegrid-axis",
          "fc-scrollgrid-shrink"
        ], elAttrs: {
          "aria-hidden": !0
        }, renderProps: r, generatorName: "allDayContent", customGenerator: n.allDayContent, defaultGenerator: kp, classNameGenerator: n.allDayClassNames, didMount: n.allDayDidMount, willUnmount: n.allDayWillUnmount }, (s) => p(
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
  renderSimpleLayout(e, n, i) {
    let { context: r, props: s } = this, o = [], a = Zt(r.options);
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
          p("td", { className: "fc-timegrid-divider " + r.theme.getClass("tableCellShaded") })
        )
      )
    })), o.push({
      type: "body",
      key: "body",
      liquid: !0,
      expandRows: !!r.options.expandRows,
      chunk: {
        scrollerElRef: this.scrollerElRef,
        content: i
      }
    }), p(
      Vt,
      { elRef: this.rootElRef, elClasses: ["fc-timegrid"], viewSpec: r.viewSpec },
      p(Ni, { liquid: !s.isHeightAuto && !s.forPrint, collapsibleWidth: s.forPrint, cols: [{ width: "shrink" }], sections: o })
    );
  }
  renderHScrollLayout(e, n, i, r, s, o, a) {
    let l = this.context.pluginHooks.scrollGridImpl;
    if (!l)
      throw new Error("No ScrollGrid implementation");
    let { context: d, props: c } = this, h = !c.forPrint && Zt(d.options), f = !c.forPrint && jo(d.options), u = [];
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
                  p(xp, { slatMetas: o })
                )
              ),
              p(
                "div",
                { className: "fc-timegrid-now-indicator-container" },
                p(Je, {
                  unit: g ? "minute" : "day"
                  /* hacky */
                }, (b) => {
                  let y = g && a && a.safeComputeTop(b);
                  return typeof y == "number" ? p(Pi, { elClasses: ["fc-timegrid-now-indicator-arrow"], elStyle: { top: y }, isAxis: !0, date: b }) : null;
                })
              )
            )
          )
        },
        {
          key: "cols",
          scrollerElRef: this.scrollerElRef,
          content: i
        }
      ]
    }), f && u.push({
      key: "footer",
      type: "footer",
      isSticky: !0,
      chunks: [
        {
          key: "axis",
          content: qn
        },
        {
          key: "cols",
          content: qn
        }
      ]
    }), p(
      Vt,
      { elRef: this.rootElRef, elClasses: ["fc-timegrid"], viewSpec: d.viewSpec },
      p(l, { liquid: !c.isHeightAuto && !c.forPrint, forPrint: c.forPrint, collapsibleWidth: !1, colGroups: [
        { width: "shrink", cols: [{ width: "shrink" }] },
        { cols: [{ span: r, minWidth: s }] }
      ], sections: u })
    );
  }
  /* Dimensions
  ------------------------------------------------------------------------------------------------------------------*/
  getAllDayMaxEventProps() {
    let { dayMaxEvents: e, dayMaxEventRows: n } = this.context.options;
    return (e === !0 || n === !0) && (e = void 0, n = Rp), { dayMaxEvents: e, dayMaxEventRows: n };
  }
}
function kp(t) {
  return t.text;
}
class Mp {
  constructor(e, n, i) {
    this.positions = e, this.dateProfile = n, this.slotDuration = i;
  }
  safeComputeTop(e) {
    let { dateProfile: n } = this;
    if (se(n.currentRange, e)) {
      let i = M(e), r = e.valueOf() - i.valueOf();
      if (r >= Q(n.slotMinTime) && r < Q(n.slotMaxTime))
        return this.computeTimeTop(x(r));
    }
    return null;
  }
  // Computes the top coordinate, relative to the bounds of the grid, of the given date.
  // A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
  computeDateTop(e, n) {
    return n || (n = M(e)), this.computeTimeTop(x(e.valueOf() - n.valueOf()));
  }
  // Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
  // This is a makeshify way to compute the time-top. Assumes all slatMetas dates are uniform.
  // Eventually allow computation with arbirary slat dates.
  computeTimeTop(e) {
    let { positions: n, dateProfile: i } = this, r = n.els.length, s = (e.milliseconds - Q(i.slotMinTime)) / Q(this.slotDuration), o, a;
    return s = Math.max(0, s), s = Math.min(r, s), o = Math.floor(s), o = Math.min(o, r - 1), a = s - o, n.tops[o] + n.getHeight(o) * a;
  }
}
class Ip extends R {
  render() {
    let { props: e, context: n } = this, { options: i } = n, { slatElRefs: r } = e;
    return p("tbody", null, e.slatMetas.map((s, o) => {
      let a = {
        time: s.time,
        date: n.dateEnv.toDate(s.date),
        view: n.viewApi
      };
      return p(
        "tr",
        { key: s.key, ref: r.createRef(s.key) },
        e.axis && p(va, Object.assign({}, s)),
        p(G, { elTag: "td", elClasses: [
          "fc-timegrid-slot",
          "fc-timegrid-slot-lane",
          !s.isLabeled && "fc-timegrid-slot-minor"
        ], elAttrs: {
          "data-time": s.isoTimeStr
        }, renderProps: a, generatorName: "slotLaneContent", customGenerator: i.slotLaneContent, classNameGenerator: i.slotLaneClassNames, didMount: i.slotLaneDidMount, willUnmount: i.slotLaneWillUnmount })
      );
    }));
  }
}
class Np extends R {
  constructor() {
    super(...arguments), this.rootElRef = L(), this.slatElRefs = new re();
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
        p(Ip, { slatElRefs: this.slatElRefs, axis: e.axis, slatMetas: e.slatMetas })
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
    n.onCoords && n.clientWidth !== null && this.rootElRef.current.offsetHeight && n.onCoords(new Mp(new Ze(this.rootElRef.current, Op(this.slatElRefs.currentMap, n.slatMetas), !1, !0), this.props.dateProfile, e.options.slotDuration));
  }
}
function Op(t, e) {
  return e.map((n) => t[n.key]);
}
function rt(t, e) {
  let n = [], i;
  for (i = 0; i < e; i += 1)
    n.push([]);
  if (t)
    for (i = 0; i < t.length; i += 1)
      n[t[i].col].push(t[i]);
  return n;
}
function Zr(t, e) {
  let n = [];
  if (t) {
    for (let i = 0; i < e; i += 1)
      n[i] = {
        affectedInstances: t.affectedInstances,
        isEvent: t.isEvent,
        segs: []
      };
    for (let i of t.segs)
      n[i.col].segs.push(i);
  } else
    for (let i = 0; i < e; i += 1)
      n[i] = null;
  return n;
}
class $p extends R {
  render() {
    let { props: e } = this;
    return p(qo, { elClasses: ["fc-timegrid-more-link"], elStyle: {
      top: e.top,
      bottom: e.bottom
    }, allDayDate: null, moreCnt: e.hiddenSegs.length, allSegs: e.hiddenSegs, hiddenSegs: e.hiddenSegs, extraDateSpan: e.extraDateSpan, dateProfile: e.dateProfile, todayRange: e.todayRange, popoverContent: () => ya(e.hiddenSegs, e), defaultGenerator: Pp, forceTimed: !0 }, (n) => p(n, { elTag: "div", elClasses: ["fc-timegrid-more-link-inner", "fc-sticky"] }));
  }
}
function Pp(t) {
  return t.shortText;
}
function Hp(t, e, n) {
  let i = new Io();
  e != null && (i.strictOrder = e), n != null && (i.maxStackCnt = n);
  let r = i.addSegs(t), s = Tu(r), o = zp(i);
  return o = Fp(o, 1), { segRects: jp(o), hiddenGroups: s };
}
function zp(t) {
  const { entriesByLevel: e } = t, n = Li((i, r) => i + ":" + r, (i, r) => {
    let s = Up(t, i, r), o = Kr(s, n), a = e[i][r];
    return [
      Object.assign(Object.assign({}, a), { nextLevelNodes: o[0] }),
      a.thickness + o[1]
      // the pressure builds
    ];
  });
  return Kr(e.length ? { level: 0, lateralStart: 0, lateralEnd: e[0].length } : null, n)[0];
}
function Kr(t, e) {
  if (!t)
    return [[], 0];
  let { level: n, lateralStart: i, lateralEnd: r } = t, s = i, o = [];
  for (; s < r; )
    o.push(e(n, s)), s += 1;
  return o.sort(Bp), [
    o.map(Lp),
    o[0][1]
    // first item's pressure
  ];
}
function Bp(t, e) {
  return e[1] - t[1];
}
function Lp(t) {
  return t[0];
}
function Up(t, e, n) {
  let { levelCoords: i, entriesByLevel: r } = t, s = r[e][n], o = i[e] + s.thickness, a = i.length, l = e;
  for (; l < a && i[l] < o; l += 1)
    ;
  for (; l < a; l += 1) {
    let d = r[l], c, h = Gn(d, s.span.start, Vn), f = h[0] + h[1], u = f;
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
function Fp(t, e) {
  const n = Li((i, r, s) => Re(i), (i, r, s) => {
    let { nextLevelNodes: o, thickness: a } = i, l = a + s, d = a / l, c, h = [];
    if (!o.length)
      c = e;
    else
      for (let u of o)
        if (c === void 0) {
          let g = n(u, r, l);
          c = g[0], h.push(g[1]);
        } else {
          let g = n(u, c, 0);
          h.push(g[1]);
        }
    let f = (c - r) * d;
    return [c - f, Object.assign(Object.assign({}, i), { thickness: f, nextLevelNodes: h })];
  });
  return t.map((i) => n(i, 0, 0)[1]);
}
function jp(t) {
  let e = [];
  const n = Li((r, s, o) => Re(r), (r, s, o) => {
    let a = Object.assign(Object.assign({}, r), {
      levelCoord: s,
      stackDepth: o,
      stackForward: 0
    });
    return e.push(a), a.stackForward = i(r.nextLevelNodes, s + r.thickness, o + 1) + 1;
  });
  function i(r, s, o) {
    let a = 0;
    for (let l of r)
      a = Math.max(n(l, s, o), a);
    return a;
  }
  return i(t, 0, 0), e;
}
function Li(t, e) {
  const n = {};
  return (...i) => {
    let r = t(...i);
    return r in n ? n[r] : n[r] = e(...i);
  };
}
function Xr(t, e, n = null, i = 0) {
  let r = [];
  if (n)
    for (let s = 0; s < t.length; s += 1) {
      let o = t[s], a = n.computeDateTop(o.start, e), l = Math.max(
        a + (i || 0),
        // :(
        n.computeDateTop(o.end, e)
      );
      r.push({
        start: Math.round(a),
        end: Math.round(l)
        //
      });
    }
  return r;
}
function Wp(t, e, n, i) {
  let r = [], s = [];
  for (let d = 0; d < t.length; d += 1) {
    let c = e[d];
    c ? r.push({
      index: d,
      thickness: 1,
      span: c
    }) : s.push(t[d]);
  }
  let { segRects: o, hiddenGroups: a } = Hp(r, n, i), l = [];
  for (let d of o)
    l.push({
      seg: t[d.index],
      rect: d
    });
  for (let d of s)
    l.push({ seg: d, rect: null });
  return { segPlacements: l, hiddenGroups: a };
}
const Vp = O({
  hour: "numeric",
  minute: "2-digit",
  meridiem: !1
});
class ba extends R {
  render() {
    return p($i, Object.assign({}, this.props, { elClasses: [
      "fc-timegrid-event",
      "fc-v-event",
      this.props.isShort && "fc-timegrid-event-short"
    ], defaultTimeFormat: Vp }));
  }
}
class Gp extends R {
  constructor() {
    super(...arguments), this.sortEventSegs = A(wo);
  }
  // TODO: memoize event-placement?
  render() {
    let { props: e, context: n } = this, { options: i } = n, r = i.selectMirror, s = (
      // yuck
      e.eventDrag && e.eventDrag.segs || e.eventResize && e.eventResize.segs || r && e.dateSelectionSegs || []
    ), o = (
      // TODO: messy way to compute this
      e.eventDrag && e.eventDrag.affectedInstances || e.eventResize && e.eventResize.affectedInstances || {}
    ), a = this.sortEventSegs(e.fgEventSegs, i.eventOrder);
    return p(Hi, { elTag: "td", elRef: e.elRef, elClasses: [
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
      p("div", { className: "fc-timegrid-col-events" }, this.renderFgSegs(s, {}, !!e.eventDrag, !!e.eventResize, !!r, "mirror")),
      p("div", { className: "fc-timegrid-now-indicator-container" }, this.renderNowIndicator(e.nowIndicatorSegs)),
      zi(i) && p(l, { elTag: "div", elClasses: ["fc-timegrid-col-misc"] })
    ));
  }
  renderFgSegs(e, n, i, r, s, o) {
    let { props: a } = this;
    return a.forPrint ? ya(e, a) : this.renderPositionedFgSegs(e, n, i, r, s, o);
  }
  renderPositionedFgSegs(e, n, i, r, s, o) {
    let { eventMaxStack: a, eventShortHeight: l, eventOrderStrict: d, eventMinHeight: c } = this.context.options, { date: h, slatCoords: f, eventSelection: u, todayRange: g, nowDate: m } = this.props, b = i || r || s, y = Xr(e, h, f, c), { segPlacements: w, hiddenGroups: D } = Wp(e, y, d, a);
    return p(
      k,
      null,
      this.renderHiddenGroups(D, e),
      w.map((C) => {
        let { seg: P, rect: T } = C, I = P.eventRange.instance.instanceId, _ = b || !!(!n[I] && T), de = In(T && T.span), nt = !b && T ? this.computeSegHStyle(T) : { left: 0, right: 0 }, $a = !!T && T.stackForward > 0, Pa = !!T && T.span.end - T.span.start < l;
        return p(
          "div",
          { className: "fc-timegrid-event-harness" + ($a ? " fc-timegrid-event-harness-inset" : ""), key: o || I, style: Object.assign(Object.assign({ visibility: _ ? "" : "hidden" }, de), nt) },
          p(ba, Object.assign({ seg: P, isDragging: i, isResizing: r, isDateSelecting: s, isSelected: I === u, isShort: Pa }, ge(P, g, m)))
        );
      })
    );
  }
  // will already have eventMinHeight applied because segInputs already had it
  renderHiddenGroups(e, n) {
    let { extraDateSpan: i, dateProfile: r, todayRange: s, nowDate: o, eventSelection: a, eventDrag: l, eventResize: d } = this.props;
    return p(k, null, e.map((c) => {
      let h = In(c.span), f = qp(c.entries, n);
      return p($p, { key: Js(Yo(f)), hiddenSegs: f, top: h.top, bottom: h.bottom, extraDateSpan: i, dateProfile: r, todayRange: s, nowDate: o, eventSelection: a, eventDrag: l, eventResize: d });
    }));
  }
  renderFillSegs(e, n) {
    let { props: i, context: r } = this, o = Xr(e, i.date, i.slatCoords, r.options.eventMinHeight).map((a, l) => {
      let d = e[l];
      return p("div", { key: Ao(d.eventRange), className: "fc-timegrid-bg-harness", style: In(a) }, n === "bg-event" ? p(Wo, Object.assign({ seg: d }, ge(d, i.todayRange, i.nowDate))) : Vo(n));
    });
    return p(k, null, o);
  }
  renderNowIndicator(e) {
    let { slatCoords: n, date: i } = this.props;
    return n ? e.map((r, s) => p(
      Pi,
      {
        // key doesn't matter. will only ever be one
        key: s,
        elClasses: ["fc-timegrid-now-indicator-line"],
        elStyle: {
          top: n.computeDateTop(r.start, i)
        },
        isAxis: !1,
        date: i
      }
    )) : null;
  }
  computeSegHStyle(e) {
    let { isRtl: n, options: i } = this.context, r = i.slotEventOverlap, s = e.levelCoord, o = e.levelCoord + e.thickness, a, l;
    r && (o = Math.min(1, s + (o - s) * 2)), n ? (a = 1 - o, l = s) : (a = s, l = 1 - o);
    let d = {
      zIndex: e.stackDepth + 1,
      left: a * 100 + "%",
      right: l * 100 + "%"
    };
    return r && !e.stackForward && (d[n ? "marginLeft" : "marginRight"] = 20), d;
  }
}
function ya(t, { todayRange: e, nowDate: n, eventSelection: i, eventDrag: r, eventResize: s }) {
  let o = (r ? r.affectedInstances : null) || (s ? s.affectedInstances : null) || {};
  return p(k, null, t.map((a) => {
    let l = a.eventRange.instance.instanceId;
    return p(
      "div",
      { key: l, style: { visibility: o[l] ? "hidden" : "" } },
      p(ba, Object.assign({ seg: a, isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: l === i, isShort: !1 }, ge(a, e, n)))
    );
  }));
}
function In(t) {
  return t ? {
    top: t.start,
    bottom: -t.end
  } : { top: "", bottom: "" };
}
function qp(t, e) {
  return t.map((n) => e[n.index]);
}
class Yp extends R {
  constructor() {
    super(...arguments), this.splitFgEventSegs = A(rt), this.splitBgEventSegs = A(rt), this.splitBusinessHourSegs = A(rt), this.splitNowIndicatorSegs = A(rt), this.splitDateSelectionSegs = A(rt), this.splitEventDrag = A(Zr), this.splitEventResize = A(Zr), this.rootElRef = L(), this.cellElRefs = new re();
  }
  render() {
    let { props: e, context: n } = this, i = n.options.nowIndicator && e.slatCoords && e.slatCoords.safeComputeTop(e.nowDate), r = e.cells.length, s = this.splitFgEventSegs(e.fgEventSegs, r), o = this.splitBgEventSegs(e.bgEventSegs, r), a = this.splitBusinessHourSegs(e.businessHourSegs, r), l = this.splitNowIndicatorSegs(e.nowIndicatorSegs, r), d = this.splitDateSelectionSegs(e.dateSelectionSegs, r), c = this.splitEventDrag(e.eventDrag, r), h = this.splitEventResize(e.eventResize, r);
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
                p("div", { className: "fc-timegrid-now-indicator-container" }, typeof i == "number" && p(Pi, { elClasses: ["fc-timegrid-now-indicator-arrow"], elStyle: { top: i }, isAxis: !0, date: e.nowDate }))
              )
            ),
            e.cells.map((f, u) => p(Gp, { key: f.key, elRef: this.cellElRefs.createRef(f.key), dateProfile: e.dateProfile, date: f.date, nowDate: e.nowDate, todayRange: e.todayRange, extraRenderProps: f.extraRenderProps, extraDataAttrs: f.extraDataAttrs, extraClassNames: f.extraClassNames, extraDateSpan: f.extraDateSpan, fgEventSegs: s[u], bgEventSegs: o[u], businessHourSegs: a[u], nowIndicatorSegs: l[u], dateSelectionSegs: d[u], eventDrag: c[u], eventResize: h[u], slatCoords: e.slatCoords, eventSelection: e.eventSelection, forPrint: e.forPrint }))
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
    e.onColCoords && e.clientWidth !== null && e.onColCoords(new Ze(
      this.rootElRef.current,
      Qp(this.cellElRefs.currentMap, e.cells),
      !0,
      // horizontal
      !1
    ));
  }
}
function Qp(t, e) {
  return e.map((n) => t[n.key]);
}
class Zp extends ne {
  constructor() {
    super(...arguments), this.processSlotOptions = A(Kp), this.state = {
      slatCoords: null
    }, this.handleRootEl = (e) => {
      e ? this.context.registerInteractiveComponent(this, {
        el: e,
        isHitComboAllowed: this.props.isHitComboAllowed
      }) : this.context.unregisterInteractiveComponent(this);
    }, this.handleScrollRequest = (e) => {
      let { onScrollTopRequest: n } = this.props, { slatCoords: i } = this.state;
      if (n && i) {
        if (e.time) {
          let r = i.computeTimeTop(e.time);
          r = Math.ceil(r), r && (r += 1), n(r);
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
      p(Np, { axis: e.axis, dateProfile: e.dateProfile, slatMetas: e.slatMetas, clientWidth: e.clientWidth, minHeight: e.expandRows ? e.clientHeight : "", tableMinWidth: e.tableMinWidth, tableColGroupNode: e.axis ? e.tableColGroupNode : null, onCoords: this.handleSlatCoords }),
      p(Yp, { cells: e.cells, axis: e.axis, dateProfile: e.dateProfile, businessHourSegs: e.businessHourSegs, bgEventSegs: e.bgEventSegs, fgEventSegs: e.fgEventSegs, dateSelectionSegs: e.dateSelectionSegs, eventSelection: e.eventSelection, eventDrag: e.eventDrag, eventResize: e.eventResize, todayRange: e.todayRange, nowDate: e.nowDate, nowIndicatorSegs: e.nowIndicatorSegs, clientWidth: e.clientWidth, tableMinWidth: e.tableMinWidth, tableColGroupNode: e.tableColGroupNode, slatCoords: n.slatCoords, onColCoords: this.handleColCoords, forPrint: e.forPrint })
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
    let { dateEnv: i, options: r } = this.context, { colCoords: s } = this, { dateProfile: o } = this.props, { slatCoords: a } = this.state, { snapDuration: l, snapsPerSlot: d } = this.processSlotOptions(this.props.slotDuration, r.snapDuration), c = s.leftToIndex(e), h = a.positions.topToIndex(n);
    if (c != null && h != null) {
      let f = this.props.cells[c], u = a.positions.tops[h], g = a.positions.getHeight(h), m = (n - u) / g, b = Math.floor(m * d), y = h * d + b, w = this.props.cells[c].date, D = Bn(o.slotMinTime, bc(l, y)), C = i.add(w, D), P = i.add(C, l);
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
function Kp(t, e) {
  let n = e || t, i = hi(t, n);
  return i === null && (n = t, i = 1), { snapDuration: n, snapsPerSlot: i };
}
class Xp extends zo {
  sliceRange(e, n) {
    let i = [];
    for (let r = 0; r < n.length; r += 1) {
      let s = Me(e, n[r]);
      s && i.push({
        start: s.start,
        end: s.end,
        isStart: s.start.valueOf() === e.start.valueOf(),
        isEnd: s.end.valueOf() === e.end.valueOf(),
        col: r
      });
    }
    return i;
  }
}
class Jp extends ne {
  constructor() {
    super(...arguments), this.buildDayRanges = A(eg), this.slicer = new Xp(), this.timeColsRef = L();
  }
  render() {
    let { props: e, context: n } = this, { dateProfile: i, dayTableModel: r } = e, { nowIndicator: s, nextDayThreshold: o } = n.options, a = this.buildDayRanges(r, i, n.dateEnv);
    return p(Je, { unit: s ? "minute" : "day" }, (l, d) => p(Zp, Object.assign({ ref: this.timeColsRef }, this.slicer.sliceProps(e, i, null, n, a), { forPrint: e.forPrint, axis: e.axis, dateProfile: i, slatMetas: e.slatMetas, slotDuration: e.slotDuration, cells: r.cells[0], tableColGroupNode: e.tableColGroupNode, tableMinWidth: e.tableMinWidth, clientWidth: e.clientWidth, clientHeight: e.clientHeight, expandRows: e.expandRows, nowDate: l, nowIndicatorSegs: s && this.slicer.sliceNowDate(l, i, o, n, a), todayRange: d, onScrollTopRequest: e.onScrollTopRequest, onSlatCoords: e.onSlatCoords })));
  }
}
function eg(t, e, n) {
  let i = [];
  for (let r of t.headerDates)
    i.push({
      start: n.add(r, e.slotMinTime),
      end: n.add(r, e.slotMaxTime)
    });
  return i;
}
const Jr = [
  { hours: 1 },
  { minutes: 30 },
  { minutes: 15 },
  { seconds: 30 },
  { seconds: 15 }
];
function tg(t, e, n, i, r) {
  let s = /* @__PURE__ */ new Date(0), o = t, a = x(0), l = n || ng(i), d = [];
  for (; Q(o) < Q(e); ) {
    let c = r.add(s, o), h = hi(a, l) !== null;
    d.push({
      date: c,
      time: o,
      key: c.toISOString(),
      isoTimeStr: Oc(c),
      isLabeled: h
    }), o = Bn(o, i), a = Bn(a, i);
  }
  return d;
}
function ng(t) {
  let e, n, i;
  for (e = Jr.length - 1; e >= 0; e -= 1)
    if (n = x(Jr[e]), i = hi(n, t), i !== null && i > 1)
      return n;
  return t;
}
class ig extends Tp {
  constructor() {
    super(...arguments), this.buildTimeColsModel = A(rg), this.buildSlatMetas = A(tg);
  }
  render() {
    let { options: e, dateEnv: n, dateProfileGenerator: i } = this.context, { props: r } = this, { dateProfile: s } = r, o = this.buildTimeColsModel(s, i), a = this.allDaySplitter.splitProps(r), l = this.buildSlatMetas(s.slotMinTime, s.slotMaxTime, e.slotLabelInterval, e.slotDuration, n), { dayMinWidth: d } = e, c = !d, h = d, f = e.dayHeaders && p($o, { dates: o.headerDates, dateProfile: s, datesRepDistinctDays: !0, renderIntro: c ? this.renderHeadAxis : null }), u = e.allDaySlot !== !1 && ((m) => p(ua, Object.assign({}, a.allDay, { dateProfile: s, dayTableModel: o, nextDayThreshold: e.nextDayThreshold, tableMinWidth: m.tableMinWidth, colGroupNode: m.tableColGroupNode, renderRowIntro: c ? this.renderTableRowAxis : null, showWeekNumbers: !1, expandRows: !1, headerAlignElRef: this.headerElRef, clientWidth: m.clientWidth, clientHeight: m.clientHeight, forPrint: r.forPrint }, this.getAllDayMaxEventProps()))), g = (m) => p(Jp, Object.assign({}, a.timed, { dayTableModel: o, dateProfile: s, axis: c, slotDuration: e.slotDuration, slatMetas: l, forPrint: r.forPrint, tableColGroupNode: m.tableColGroupNode, tableMinWidth: m.tableMinWidth, clientWidth: m.clientWidth, clientHeight: m.clientHeight, onSlatCoords: this.handleSlatCoords, expandRows: m.expandRows, onScrollTopRequest: this.handleScrollTopRequest }));
    return h ? this.renderHScrollLayout(f, u, g, o.colCnt, d, l, this.state.slatCoords) : this.renderSimpleLayout(f, u, g);
  }
}
function rg(t, e) {
  let n = new Po(t.renderRange, e);
  return new Ho(n, !1);
}
var sg = '.fc-v-event{background-color:var(--fc-event-bg-color);border:1px solid var(--fc-event-border-color);display:block}.fc-v-event .fc-event-main{color:var(--fc-event-text-color);height:100%}.fc-v-event .fc-event-main-frame{display:flex;flex-direction:column;height:100%}.fc-v-event .fc-event-time{flex-grow:0;flex-shrink:0;max-height:100%;overflow:hidden}.fc-v-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-height:0}.fc-v-event .fc-event-title{bottom:0;max-height:100%;overflow:hidden;top:0}.fc-v-event:not(.fc-event-start){border-top-left-radius:0;border-top-right-radius:0;border-top-width:0}.fc-v-event:not(.fc-event-end){border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-width:0}.fc-v-event.fc-event-selected:before{left:-10px;right:-10px}.fc-v-event .fc-event-resizer-start{cursor:n-resize}.fc-v-event .fc-event-resizer-end{cursor:s-resize}.fc-v-event:not(.fc-event-selected) .fc-event-resizer{height:var(--fc-event-resizer-thickness);left:0;right:0}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-start{top:calc(var(--fc-event-resizer-thickness)/-2)}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-end{bottom:calc(var(--fc-event-resizer-thickness)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer{left:50%;margin-left:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer-start{top:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer-end{bottom:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc .fc-timegrid .fc-daygrid-body{z-index:2}.fc .fc-timegrid-divider{padding:0 0 2px}.fc .fc-timegrid-body{min-height:100%;position:relative;z-index:1}.fc .fc-timegrid-axis-chunk{position:relative}.fc .fc-timegrid-axis-chunk>table,.fc .fc-timegrid-slots{position:relative;z-index:1}.fc .fc-timegrid-slot{border-bottom:0;height:1.5em}.fc .fc-timegrid-slot:empty:before{content:"\\00a0"}.fc .fc-timegrid-slot-minor{border-top-style:dotted}.fc .fc-timegrid-slot-label-cushion{display:inline-block;white-space:nowrap}.fc .fc-timegrid-slot-label{vertical-align:middle}.fc .fc-timegrid-axis-cushion,.fc .fc-timegrid-slot-label-cushion{padding:0 4px}.fc .fc-timegrid-axis-frame-liquid{height:100%}.fc .fc-timegrid-axis-frame{align-items:center;display:flex;justify-content:flex-end;overflow:hidden}.fc .fc-timegrid-axis-cushion{flex-shrink:0;max-width:60px}.fc-direction-ltr .fc-timegrid-slot-label-frame{text-align:right}.fc-direction-rtl .fc-timegrid-slot-label-frame{text-align:left}.fc-liquid-hack .fc-timegrid-axis-frame-liquid{bottom:0;height:auto;left:0;position:absolute;right:0;top:0}.fc .fc-timegrid-col.fc-day-today{background-color:var(--fc-today-bg-color)}.fc .fc-timegrid-col-frame{min-height:100%;position:relative}.fc-media-screen.fc-liquid-hack .fc-timegrid-col-frame{bottom:0;height:auto;left:0;position:absolute;right:0;top:0}.fc-media-screen .fc-timegrid-cols{bottom:0;left:0;position:absolute;right:0;top:0}.fc-media-screen .fc-timegrid-cols>table{height:100%}.fc-media-screen .fc-timegrid-col-bg,.fc-media-screen .fc-timegrid-col-events,.fc-media-screen .fc-timegrid-now-indicator-container{left:0;position:absolute;right:0;top:0}.fc .fc-timegrid-col-bg{z-index:2}.fc .fc-timegrid-col-bg .fc-non-business{z-index:1}.fc .fc-timegrid-col-bg .fc-bg-event{z-index:2}.fc .fc-timegrid-col-bg .fc-highlight{z-index:3}.fc .fc-timegrid-bg-harness{left:0;position:absolute;right:0}.fc .fc-timegrid-col-events{z-index:3}.fc .fc-timegrid-now-indicator-container{bottom:0;overflow:hidden}.fc-direction-ltr .fc-timegrid-col-events{margin:0 2.5% 0 2px}.fc-direction-rtl .fc-timegrid-col-events{margin:0 2px 0 2.5%}.fc-timegrid-event-harness{position:absolute}.fc-timegrid-event-harness>.fc-timegrid-event{bottom:0;left:0;position:absolute;right:0;top:0}.fc-timegrid-event-harness-inset .fc-timegrid-event,.fc-timegrid-event.fc-event-mirror,.fc-timegrid-more-link{box-shadow:0 0 0 1px var(--fc-page-bg-color)}.fc-timegrid-event,.fc-timegrid-more-link{border-radius:3px;font-size:var(--fc-small-font-size)}.fc-timegrid-event{margin-bottom:1px}.fc-timegrid-event .fc-event-main{padding:1px 1px 0}.fc-timegrid-event .fc-event-time{font-size:var(--fc-small-font-size);margin-bottom:1px;white-space:nowrap}.fc-timegrid-event-short .fc-event-main-frame{flex-direction:row;overflow:hidden}.fc-timegrid-event-short .fc-event-time:after{content:"\\00a0-\\00a0"}.fc-timegrid-event-short .fc-event-title{font-size:var(--fc-small-font-size)}.fc-timegrid-more-link{background:var(--fc-more-link-bg-color);color:var(--fc-more-link-text-color);cursor:pointer;margin-bottom:1px;position:absolute;z-index:9999}.fc-timegrid-more-link-inner{padding:3px 2px;top:0}.fc-direction-ltr .fc-timegrid-more-link{right:0}.fc-direction-rtl .fc-timegrid-more-link{left:0}.fc .fc-timegrid-now-indicator-arrow,.fc .fc-timegrid-now-indicator-line{pointer-events:none}.fc .fc-timegrid-now-indicator-line{border-color:var(--fc-now-indicator-color);border-style:solid;border-width:1px 0 0;left:0;position:absolute;right:0;z-index:4}.fc .fc-timegrid-now-indicator-arrow{border-color:var(--fc-now-indicator-color);border-style:solid;margin-top:-5px;position:absolute;z-index:4}.fc-direction-ltr .fc-timegrid-now-indicator-arrow{border-bottom-color:transparent;border-top-color:transparent;border-width:5px 0 5px 6px;left:0}.fc-direction-rtl .fc-timegrid-now-indicator-arrow{border-bottom-color:transparent;border-top-color:transparent;border-width:5px 6px 5px 0;right:0}';
li(sg);
const og = {
  allDaySlot: Boolean
};
var ag = le({
  name: "@fullcalendar/timegrid",
  initialView: "timeGridWeek",
  optionRefiners: og,
  views: {
    timeGrid: {
      component: ig,
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
function Ea(t) {
  const e = t.getTimezoneOffset() * 6e4;
  return new Date(t.getTime() - e).toISOString();
}
function Xt(t, e) {
  if (!t) return "";
  const n = Ea(t);
  return e ? n.slice(0, 10) : n.slice(0, 16);
}
function es(t, e) {
  if (!t) return "";
  const n = Ea(t);
  return e ? n.slice(0, 10) : n.slice(0, 19);
}
function ts(t, e) {
  return t ? e ? t.slice(0, 10) : `${t.slice(0, 10)}T09:00` : "";
}
function ns(t) {
  const e = String(Math.floor(t / 60)).padStart(2, "0"), n = String(t % 60).padStart(2, "0");
  return `${e}:${n}:00`;
}
const wa = "06:00:00", Sa = "22:00:00", is = 60, Nn = 1440;
function lg(t, e) {
  return t.getFullYear() !== e.getFullYear() || t.getMonth() !== e.getMonth() || t.getDate() !== e.getDate();
}
function cg(t, e, n) {
  const i = t.filter((o) => {
    if (o.allDay) return !1;
    const a = new Date(o.start);
    return new Date(o.end) > e && a < n;
  });
  if (i.length === 0)
    return { min: wa, max: Sa };
  let r = Nn, s = 0;
  for (const o of i) {
    const a = new Date(o.start), l = new Date(o.end);
    if (lg(a, l)) {
      r = 0, s = Nn;
      continue;
    }
    r = Math.min(r, a.getHours() * 60 + a.getMinutes()), s = Math.max(s, l.getHours() * 60 + l.getMinutes());
  }
  return {
    min: ns(Math.max(0, r - is)),
    max: ns(Math.min(Nn, s + is))
  };
}
function dg(t, e) {
  const n = new _h(t, {
    plugins: [ag, ep, Sp],
    initialView: "timeGridWeek",
    locale: Rh,
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
    slotMinTime: wa,
    slotMaxTime: Sa,
    slotLabelFormat: { hour: "2-digit", minute: "2-digit", hour12: !1 },
    eventTimeFormat: { hour: "2-digit", minute: "2-digit", meridiem: !1 },
    events: []
  });
  return n.render(), n;
}
const ug = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"];
function fg(t) {
  const e = /FREQ=([A-Z]+)/.exec(t)?.[1] ?? "", n = /UNTIL=(\d{4})(\d{2})(\d{2})/.exec(t);
  return {
    frequency: ug.includes(e) ? e : "",
    until: n ? `${n[1]}-${n[2]}-${n[3]}` : ""
  };
}
function hg(t, e) {
  if (!t) return;
  if (!e) return `FREQ=${t}`;
  const i = (/* @__PURE__ */ new Date(`${e}T23:59:59`)).toISOString().replace(/[-:]/g, "").slice(0, 15);
  return `FREQ=${t};UNTIL=${i}Z`;
}
function Be() {
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
function rs(t, e, n, i) {
  return {
    ...Be(),
    showModal: !0,
    isAllDay: n,
    newEventCalendar: i,
    newEventStart: Xt(t, n),
    newEventEnd: Xt(e, n)
  };
}
function ss(t) {
  const e = t.extendedProps, n = fg(e.rrule);
  return {
    ...Be(),
    showModal: !0,
    editMode: !0,
    isAllDay: t.allDay,
    currentEventId: e.uid || (t.id ?? ""),
    currentRecurrenceId: e.recurrenceId,
    currentRrule: e.rrule,
    newEventTitle: t.title,
    newEventCalendar: e.entityId,
    newEventStart: Xt(t.start, t.allDay),
    newEventEnd: Xt(t.end ?? t.start, t.allDay),
    newEventRecurrence: n.frequency,
    newEventUntil: n.until
  };
}
function pg(t, e) {
  return e === t.isAllDay ? {} : {
    isAllDay: e,
    newEventStart: ts(t.newEventStart, e),
    newEventEnd: ts(t.newEventEnd, e)
  };
}
function gg(t) {
  const e = t;
  return e ? { newEventRecurrence: e } : { newEventRecurrence: "", newEventUntil: "" };
}
function mg(t) {
  return t.newEventTitle.trim() ? t.newEventCalendar ? !t.newEventStart || !t.newEventEnd ? "Bitte Start und Ende angeben." : null : "Bitte einen Kalender auswählen." : "Bitte einen Titel eingeben.";
}
function os(t) {
  const e = {
    summary: t.newEventTitle.trim(),
    dtstart: t.newEventStart,
    dtend: t.newEventEnd
  }, n = hg(t.newEventRecurrence, t.newEventUntil);
  return n && (e.rrule = n), e;
}
function Aa(t) {
  return t.currentRecurrenceId ? {
    recurrence_id: t.currentRecurrenceId,
    recurrence_range: "THISANDFUTURE"
  } : {};
}
async function vg(t, e) {
  try {
    return e.editMode && e.currentEventId ? await Cs(
      t.hass,
      e.newEventCalendar,
      e.currentEventId,
      os(e),
      Aa(e)
    ) : await pl(t.hass, e.newEventCalendar, os(e)), !0;
  } catch (n) {
    return console.error("Family Calendar: Speichern fehlgeschlagen", n), t.notify(`Termin konnte nicht gespeichert werden: ${t.errorText(n)}`), !1;
  }
}
async function bg(t, e) {
  try {
    return await gl(
      t.hass,
      e.newEventCalendar,
      e.currentEventId,
      Aa(e)
    ), !0;
  } catch (n) {
    return console.error("Family Calendar: Löschen fehlgeschlagen", n), t.notify(`Termin konnte nicht gelöscht werden: ${t.errorText(n)}`), !1;
  }
}
async function yg(t, e) {
  const n = e.event, i = n.extendedProps;
  if (!i.uid)
    return e.revert(), t.notify("Dieser Termin hat keine Kennung und lässt sich nicht verschieben."), !1;
  const r = {
    summary: n.title,
    dtstart: es(n.start, n.allDay),
    dtend: es(n.end ?? n.start, n.allDay)
  };
  try {
    const s = i.recurrenceId ? { recurrence_id: i.recurrenceId } : {};
    return await Cs(t.hass, i.entityId, i.uid, r, s), !0;
  } catch (s) {
    return e.revert(), console.error("Family Calendar: Verschieben fehlgeschlagen", s), t.notify(`Termin konnte nicht verschoben werden: ${t.errorText(s)}`), !1;
  }
}
function Eg(t, e, n) {
  const i = [...t].sort((a, l) => e(a) - e(l) || n(a) - n(l)), r = [];
  let s = [], o = [];
  for (const a of i) {
    const l = e(a);
    s.every((h) => h <= l) && (as(o, s.length), o = [], s = []);
    let d = s.findIndex((h) => h <= l);
    d === -1 && (d = s.length), s[d] = Math.max(n(a), l + 1);
    const c = { item: a, lane: d, lanes: 1 };
    o.push(c), r.push(c);
  }
  return as(o, s.length), r;
}
function as(t, e) {
  for (const n of t)
    n.lanes = Math.max(1, e);
}
const Jt = 1440, wg = {
  padMinutes: 30,
  minGapMinutes: 75,
  minGapPx: 26,
  maxGapPx: 76,
  maxPxPerMinute: 1.6
}, Sg = 180, Ag = 0.45;
function Dg(t, e, n = {}) {
  const i = { ...wg, ...n }, r = ls(t.map(Rg).filter((m) => m.to > m.from));
  if (r.length === 0 || e <= 0) return null;
  const s = ls(
    r.map((m) => ({
      from: Math.max(0, m.from - i.padMinutes),
      to: Math.min(Jt, m.to + i.padMinutes)
    }))
  ), o = Tg(s, i.minGapMinutes), a = o.slice(1).map((m, b) => ({
    from: o[b].to,
    to: m.from
  })), l = a.map((m) => xg(m.to - m.from, i)), d = _g(l, e), c = o.reduce((m, b) => m + (b.to - b.from), 0), h = Math.max(0, e - Da(d)), f = Math.min(i.maxPxPerMinute, h / c), u = [];
  let g = 0;
  return o.forEach((m, b) => {
    if (b > 0) {
      const w = a[b - 1];
      u.push({ kind: "gap", ...w, top: g, height: d[b - 1] }), g += d[b - 1];
    }
    const y = (m.to - m.from) * f;
    u.push({ kind: "busy", ...m, top: g, height: y }), g += y;
  }), { segments: u, height: g, pxPerMinute: f, yOf: (m) => Cg(u, g, m) };
}
function Cg(t, e, n) {
  const i = t[0], r = t[t.length - 1];
  if (n <= i.from) return 0;
  if (n >= r.to) return e;
  for (const s of t)
    if (n >= s.from && n <= s.to) {
      const o = (n - s.from) / (s.to - s.from);
      return s.top + o * s.height;
    }
  return e;
}
function xg(t, e) {
  const n = 1 - Math.pow(2, -t / Sg);
  return e.minGapPx + (e.maxGapPx - e.minGapPx) * n;
}
function _g(t, e) {
  const n = e * Ag, i = Da(t);
  if (i <= n) return t;
  const r = n / i;
  return t.map((s) => s * r);
}
function Da(t) {
  return t.reduce((e, n) => e + n, 0);
}
function Rg(t) {
  return {
    from: Math.max(0, Math.min(Jt, t.from)),
    to: Math.max(0, Math.min(Jt, t.to))
  };
}
function ls(t) {
  const e = [...t].sort((i, r) => i.from - r.from), n = [];
  for (const i of e) {
    const r = n[n.length - 1];
    r && i.from <= r.to ? r.to = Math.max(r.to, i.to) : n.push({ ...i });
  }
  return n;
}
function Tg(t, e) {
  const n = [];
  for (const i of t) {
    const r = n[n.length - 1];
    r && i.from - r.to < e ? r.to = i.to : n.push({ ...i });
  }
  return n;
}
const kg = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"], Mg = 15, Ig = 34, On = [30, 60, 120, 180, 360];
function Ng(t, e, n, i, r = /* @__PURE__ */ new Date()) {
  const s = t.map(Bg).filter((f) => f !== null), o = zg(e, n), a = _a(r).getTime(), l = [], d = o.map((f) => {
    const u = f, g = Xn(f), m = s.filter((b) => !b.allDay && b.start < g && b.end > u);
    for (const b of m) l.push(Ca(b, u, g));
    return { datum: f, mitUhrzeit: m };
  }), c = Dg(l, i), h = d.map(({ datum: f, mitUhrzeit: u }) => ({
    date: f,
    weekday: kg[f.getDay()],
    dayNumber: f.getDate(),
    isToday: f.getTime() === a,
    allDay: s.filter((g) => g.allDay && g.start < Xn(f) && g.end > f).map((g) => ({ event: g, color: g.color })),
    blocks: c ? Og(u, f, c.yOf) : []
  }));
  return c ? {
    days: h,
    ticks: $g(c.segments, c.pxPerMinute, c.yOf),
    gaps: c.segments.filter((f) => f.kind === "gap").map((f) => ({ top: f.top, height: f.height, label: Hg(f.to - f.from) })),
    height: c.height,
    empty: !1
  } : { days: h, ticks: [], gaps: [], height: 0, empty: !0 };
}
function Og(t, e, n) {
  const i = Xn(e), r = new Map(
    t.map((s) => [s, Ca(s, e, i)])
  );
  return Eg(
    t,
    (s) => r.get(s).from,
    (s) => r.get(s).to
  ).map(({ item: s, lane: o, lanes: a }) => {
    const l = r.get(s), d = n(l.from);
    return {
      event: s,
      color: s.color,
      top: d,
      height: Math.max(Mg, n(l.to) - d),
      lane: o,
      lanes: a,
      time: Pg(s, e, i)
    };
  });
}
function $g(t, e, n) {
  const i = On.find((s) => s * e >= Ig) ?? On[On.length - 1], r = [];
  for (const s of t) {
    if (s.kind !== "busy") continue;
    const o = Math.ceil(s.from / i) * i;
    for (let a = o; a <= s.to; a += i)
      r.push({ y: n(a), label: xa(a) });
  }
  return r;
}
function Ca(t, e, n) {
  const i = t.start <= e ? 0 : Kn(t.start), r = t.end >= n ? Jt : Kn(t.end);
  return { from: i, to: Math.max(r, i + 1) };
}
function Pg(t, e, n) {
  const i = t.start >= e, r = t.end <= n;
  return i && r ? `${Ct(t.start)} – ${Ct(t.end)}` : i ? `ab ${Ct(t.start)}` : r ? `bis ${Ct(t.end)}` : "durchgehend";
}
function Hg(t) {
  const e = Math.round(t), n = Math.floor(e / 60), i = e % 60;
  return n === 0 ? `${i} Min` : i === 0 ? `${n} Std` : `${n}:${String(i).padStart(2, "0")} Std`;
}
function Kn(t) {
  return t.getHours() * 60 + t.getMinutes();
}
function Ct(t) {
  return xa(Kn(t));
}
function xa(t) {
  const e = Math.floor(t / 60), n = Math.round(t % 60);
  return `${String(e).padStart(2, "0")}:${String(n).padStart(2, "0")}`;
}
function zg(t, e) {
  const n = _a(t);
  return Array.from({ length: e }, (i, r) => {
    const s = new Date(n);
    return s.setDate(s.getDate() + r), s;
  });
}
function _a(t) {
  const e = new Date(t);
  return e.setHours(0, 0, 0, 0), e;
}
function Xn(t) {
  const e = new Date(t);
  return e.setDate(e.getDate() + 1), e;
}
function Bg(t) {
  const e = cs(t.start);
  if (!e) return null;
  const n = cs(t.end) ?? e;
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
function cs(t) {
  if (t instanceof Date) return Number.isNaN(t.getTime()) ? null : t;
  if (typeof t != "string") return null;
  const e = /^\d{4}-\d{2}-\d{2}$/.test(t) ? `${t}T00:00:00` : t, n = new Date(e);
  return Number.isNaN(n.getTime()) ? null : n;
}
const Lg = 7, Ug = 36, ds = 240;
class Fg {
  /** onChange stoesst das Neuzeichnen an. */
  constructor(e) {
    this.onChange = e, this.budgetPx = ds, this.onResize = () => this.measure();
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
    return Ng(e, n, Lg, this.budgetPx);
  }
  dispose() {
    window.removeEventListener("resize", this.onResize), this.frame = void 0;
  }
  measure() {
    if (!this.frame) return;
    const e = this.frame.getBoundingClientRect().top, n = Math.max(ds, Math.floor(window.innerHeight - e - Ug));
    Math.abs(n - this.budgetPx) <= 1 || (this.budgetPx = n, this.onChange());
  }
}
const us = 7, jg = 100;
class Wg {
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
    const i = n.map((r) => e.states[r]?.last_updated ?? "missing").join("|");
    return i === this.lastSignature ? !1 : (this.lastSignature = i, !0);
  }
  scheduleFetch(e) {
    this.clear("refreshTimer"), this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = void 0, this.load();
    }, e);
  }
  scheduleResize() {
    this.clear("resizeTimer"), this.resizeTimer = window.setTimeout(() => {
      this.resizeTimer = void 0, this.ctx.calendar()?.updateSize();
    }, jg);
  }
  /** Wendet die Filter an und passt die Zeitachse an. */
  applyFilters() {
    const e = this.ctx.calendar();
    if (!e) return;
    this.visible = vl(this.all, this.ctx.activeCalendars()), e.removeAllEventSources(), e.addEventSource(this.visible);
    const n = e.view;
    this.adjustTimeRange(n.activeStart, n.activeEnd), e.updateSize(), this.ctx.onVisibleChanged?.();
  }
  /** Die aktuell eingeschalteten Termine - Grundlage der Kompaktansicht. */
  visibleEvents() {
    return this.visible;
  }
  adjustTimeRange(e, n) {
    const i = this.ctx.calendar();
    if (!i || i.view.type !== "timeGridWeek") return;
    const r = cg(this.visible, e, n);
    i.setOption("slotMinTime", r.min), i.setOption("slotMaxTime", r.max);
  }
  dispose() {
    this.clear("refreshTimer"), this.clear("resizeTimer");
  }
  async load() {
    const e = this.ctx.hass(), n = this.ctx.config();
    if (!e || !n || !this.ctx.calendar()) return;
    const { start: i, end: r } = this.window(), s = [];
    for (const o of n.entities)
      try {
        const a = await Ds(e, o, i, r), l = n.colors?.[o] ?? rn;
        s.push(...a.map((d) => ml(d, o, l)));
      } catch (a) {
        console.error("Family Calendar: Laden fehlgeschlagen für", o, a), this.ctx.onError("Kalender konnte nicht geladen werden.", o);
      }
    this.all = s, this.applyFilters();
  }
  window() {
    const e = this.ctx.calendar()?.view, n = e ? new Date(e.activeStart) : /* @__PURE__ */ new Date(), i = e ? new Date(e.activeEnd) : /* @__PURE__ */ new Date();
    return e || i.setDate(i.getDate() + 14), n.setDate(n.getDate() - us), i.setDate(i.getDate() + us), { start: n.toISOString(), end: i.toISOString() };
  }
  clear(e) {
    const n = this[e];
    n !== void 0 && (clearTimeout(n), this[e] = void 0);
  }
}
const Vg = q`
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
`, Gg = q`
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
`, qg = q`
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
`, Yg = q`
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
`, Ra = q`
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
`, Qg = q`
  ${Ra}
  ${Yg}
  ${Vg}
  ${Gg}
  ${qg}
`;
function Zg(t) {
  const { week: e } = t;
  return E`
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
    (n) => E`
            <div class="compact-head ${n.isToday ? "today" : ""}">
              <span class="compact-weekday">${n.weekday}</span>
              <span class="compact-daynum">${n.dayNumber}</span>
            </div>
          `
  )}

        ${e.days.some((n) => n.allDay.length > 0) ? E`
              <div class="compact-axis-label">Ganztägig</div>
              ${e.days.map(
    (n) => E`
                  <div class="compact-allday">
                    ${n.allDay.map(
      ({ event: i, color: r }) => E`
                        <button
                          class="compact-chip"
                          style="--block-color: ${r}"
                          title=${i.title}
                          @click=${() => t.onEvent(i)}
                        >
                          ${i.title}
                        </button>
                      `
    )}
                  </div>
                `
  )}
            ` : H}
      </div>

      <div class="compact-body">
        ${e.empty ? E`<p class="compact-empty">Diese Woche steht nichts mit Uhrzeit an.</p>` : E`
              <div class="compact-grid compact-scale" style="height: ${e.height}px">
                <div class="compact-axis">
                  ${e.gaps.map((n) => Jg(n))}
                  ${e.ticks.map(
    (n) => E`
                      <span class="compact-tick" style="top: ${n.y}px">${n.label}</span>
                    `
  )}
                </div>
                ${e.days.map((n) => Kg(n, e.gaps, t.onEvent))}
              </div>
            `}
      </div>
    </div>
  `;
}
function Kg(t, e, n) {
  return E`
    <div class="compact-day ${t.isToday ? "today" : ""}">
      ${e.map(
    (i) => E`
          <div class="compact-break" style="top: ${i.top}px; height: ${i.height}px"></div>
        `
  )}
      ${t.blocks.map((i) => Xg(i, n))}
    </div>
  `;
}
function Xg(t, e) {
  const n = 100 / t.lanes, i = [
    `top: ${t.top}px`,
    `height: ${t.height}px`,
    `left: ${t.lane * n}%`,
    `width: ${n}%`,
    `--block-color: ${t.color}`
  ].join("; ");
  return E`
    <button
      class="compact-block ${t.height < 30 ? "flach" : ""}"
      style=${i}
      title="${t.event.title} · ${t.time}"
      @click=${() => e(t.event)}
    >
      <span class="compact-block-title">${t.event.title}</span>
      <span class="compact-block-time">${t.time}</span>
    </button>
  `;
}
function Jg(t) {
  return E`
    <span
      class="compact-break-label"
      style="top: ${t.top}px; height: ${t.height}px"
      >${t.label}</span
    >
  `;
}
const je = (t) => t.target.value;
function em(t) {
  const e = t.isAllDay ? "date" : "datetime-local";
  return E`
    <div class="modal-overlay" @click=${() => t.onCancel()}>
      <div class="modal-content" @click=${(n) => n.stopPropagation()}>
        <h3>${t.editMode ? "Termin bearbeiten" : "Neuer Termin"}</h3>

        <div class="form-group">
          <label>Titel</label>
          <input
            type="text"
            .value=${t.title}
            @input=${(n) => t.onTitle(je(n))}
            placeholder="Termin Titel"
            autofocus
          />
        </div>

        ${tm(t)}

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
          <input type=${e} .value=${t.start} @input=${(n) => t.onStart(je(n))} />
        </div>

        <div class="form-group">
          <label>Bis</label>
          <input type=${e} .value=${t.end} @input=${(n) => t.onEnd(je(n))} />
        </div>

        ${nm(t)}

        <div class="modal-actions">
          ${t.editMode ? rm(t) : ""}
          <button class="btn-cancel" @click=${() => t.onCancel()}>Abbrechen</button>
          <button class="btn-save" @click=${() => t.onSave()}>
            ${t.editMode ? "Aktualisieren" : "Speichern"}
          </button>
        </div>
      </div>
    </div>
  `;
}
function tm(t) {
  return E`
    <div class="form-group">
      <label>Kalender</label>
      ${t.editMode ? E`<p class="readonly-value">${t.nameOf(t.calendar)}</p>` : E`
            <select .value=${t.calendar} @change=${(e) => t.onCalendar(je(e))}>
              ${t.entities.map(
    (e) => E`<option value=${e}>${t.nameOf(e)}</option>`
  )}
            </select>
          `}
    </div>
  `;
}
function nm(t) {
  return t.editMode && !t.isSeries ? E`
      <div class="form-group">
        <label>Wiederholung</label>
        <p class="readonly-value">Keine</p>
      </div>
    ` : E`
    <div class="form-group">
      <label>Wiederholung</label>
      <select .value=${t.frequency} @change=${(e) => t.onFrequency(je(e))}>
        ${t.isSeries ? "" : E`<option value="">Keine</option>`}
        <option value="DAILY">Täglich</option>
        <option value="WEEKLY">Wöchentlich</option>
        <option value="MONTHLY">Monatlich</option>
        <option value="YEARLY">Jährlich</option>
      </select>
    </div>
    ${t.frequency ? im(t) : ""}
  `;
}
function im(t) {
  return E`
    <div class="form-group">
      <label>Serie endet am</label>
      <input type="date" .value=${t.until} @input=${(e) => t.onUntil(je(e))} />
      <p class="field-hint">
        ${t.until ? "" : "Leer lassen für eine Serie ohne Ende. "}
        ${t.isSeries ? "Änderungen gelten ab diesem Termin, frühere bleiben stehen." : ""}
      </p>
    </div>
  `;
}
function rm(t) {
  return t.confirmDelete ? E`
    <button class="btn-delete btn-delete--confirm" @click=${() => t.onDelete()}>
      Wirklich löschen?
    </button>
  ` : E`<button class="btn-delete" @click=${() => t.onConfirmDelete()}>Löschen</button>`;
}
function sm(t) {
  return E`
    <div class="header">
      <div class="filters">
        ${t.links.map((e) => om(e, t.onNavigate))}
        ${t.entities.map((e) => am(e, t))}
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
function om(t, e) {
  const n = t.name ?? t.path;
  return E`
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
function am(t, e) {
  const n = e.activeCalendars.includes(t);
  return E`
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
var lm = Object.defineProperty, cm = Object.getOwnPropertyDescriptor, we = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? cm(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (i ? o(e, n, r) : o(r)) || r);
  return i && r && lm(e, n, r), r;
};
const dm = 500, um = [0, 250, 1e3, 2500];
let te = class extends J {
  constructor() {
    super(...arguments), this.activeCalendars = [], this.isCompact = !1, this.form = Be(), this.calendar = null, this.loader = new Wg({
      hass: () => this.hass,
      config: () => this.config,
      calendar: () => this.calendar,
      activeCalendars: () => this.activeCalendars,
      onError: (t, e) => this.notify(`${this.friendlyName(e)}: ${t}`),
      onVisibleChanged: () => this.requestUpdate()
    }), this.compact = new Fg(() => this.requestUpdate());
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
    return E`
      <ha-card>
        ${sm({
      links: this.config?.links ?? [],
      entities: this.config?.entities ?? [],
      activeCalendars: this.activeCalendars,
      isCompact: this.isCompact,
      colorOf: (t) => this.config.colors?.[t] ?? rn,
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
    return Zg({
      week: this.compact.week(this.loader.visibleEvents(), t?.activeStart ?? /* @__PURE__ */ new Date()),
      title: t?.title ?? "",
      onEvent: (e) => {
        this.form = ss(e);
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
    return em({
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
      onAllDay: (n) => e(pg(t, n)),
      onStart: (n) => e({ newEventStart: n }),
      onEnd: (n) => e({ newEventEnd: n }),
      onFrequency: (n) => e(gg(n)),
      onUntil: (n) => e({ newEventUntil: n }),
      onConfirmDelete: () => e({ confirmDelete: !0 }),
      onDelete: () => {
        this.deleteEvent();
      },
      onCancel: () => this.form = Be(),
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
      this.calendar = dg(this.calendarEl, {
        onSelect: (t) => this.handleDateSelect(t),
        onEventClick: (t) => this.handleEventClick(t),
        onEventMoved: (t) => {
          this.handleEventMoved(t);
        },
        onDatesSet: (t) => {
          this.loader.adjustTimeRange(t.start, t.end), this.refresh();
        }
      }), this.resizeObserver = new ResizeObserver(() => this.loader.scheduleResize()), this.resizeObserver.observe(this.calendarEl);
      for (const t of um)
        window.setTimeout(() => this.calendar?.updateSize(), t);
    }
  }
  updated(t) {
    t.has("hass") && this.loader.hasRelevantChange() && this.refresh(), this.compact.watch(this.isCompact ? this.compactBodyEl : void 0);
  }
  /** Nachladen anstossen, entprellt. */
  refresh() {
    this.loader.scheduleFetch(this.config?.refreshDebounceMs ?? dm);
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
    this.form = rs(t, e, !1, this.config.entities[0] ?? "");
  }
  handleDateSelect(t) {
    t.view.calendar.unselect(), this.form = rs(t.start, t.end, t.allDay, this.config.entities[0] ?? "");
  }
  handleEventClick(t) {
    this.form = ss(t.event);
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
    const t = mg(this.form);
    if (t) return this.notify(t);
    await vg(this.actions(), this.form) && (this.form = Be(), this.refresh());
  }
  async deleteEvent() {
    await bg(this.actions(), this.form) ? (this.form = Be(), this.refresh()) : this.form = { ...this.form, confirmDelete: !1 };
  }
  async handleEventMoved(t) {
    await yg(this.actions(), t) && this.refresh();
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
te.styles = Qg;
we([
  j({ attribute: !1 })
], te.prototype, "hass", 2);
we([
  j({ attribute: !1 })
], te.prototype, "config", 2);
we([
  $()
], te.prototype, "activeCalendars", 2);
we([
  $()
], te.prototype, "isCompact", 2);
we([
  $()
], te.prototype, "form", 2);
we([
  oi("#calendar")
], te.prototype, "calendarEl", 2);
we([
  oi(".compact-body")
], te.prototype, "compactBodyEl", 2);
te = we([
  Ke("family-calendar")
], te);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-calendar",
  name: "Family Calendar",
  description: "Wochen- und Monatsansicht über mehrere Kalender, mit Anlegen und Bearbeiten.",
  preview: !1
});
async function fm(t, e) {
  return ((await t.callWS({
    type: "media_source/browse_media",
    media_content_id: e
  })).children ?? []).filter((i) => i.media_class === "image").map((i) => ({ id: i.media_content_id, title: i.title })).sort((i, r) => i.title.localeCompare(r.title, "de"));
}
async function hm(t, e) {
  return ((await t.callWS({
    type: "media_source/browse_media",
    media_content_id: e
  })).children ?? []).filter((i) => i.media_class === "image").map((i) => i.media_content_id).sort((i, r) => i.localeCompare(r, "de"));
}
async function Ta(t, e) {
  return (await t.callWS({
    type: "media_source/resolve_media",
    media_content_id: e
  })).url;
}
const ka = "calendar_service_ext", pm = {
  photos: {
    folder: "media-source://media_source/local/fotos",
    interval: 30,
    showClock: !0,
    rescanMinutes: 60
  }
};
async function gm(t, e) {
  return t.callWS({ type: `${ka}/settings/set`, patch: e });
}
async function Ma(t, e) {
  return t.connection.subscribeMessage(e, { type: `${ka}/settings/subscribe` });
}
async function mm(t, e, n) {
  const i = new FormData();
  i.append("media_content_id", e), i.append("file", n);
  const r = await t.fetchWithAuth(
    "/api/media_source/local_source/upload",
    { method: "POST", body: i }
  );
  if (!r.ok)
    throw new Error(`${r.status} ${await r.text()}`);
}
async function vm(t, e) {
  await t.callWS({
    type: "media_source/local_source/remove",
    media_content_id: e
  });
}
const bm = q`
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
function ym(t) {
  return t.hasImages ? E`
    <ha-card>
      <div
        class="layer ${t.frontVisible ? "layer--visible" : ""}"
        style=${t.frontUrl ? `background-image: url("${t.frontUrl}")` : ""}
      ></div>
      <div
        class="layer ${t.frontVisible ? "" : "layer--visible"}"
        style=${t.backUrl ? `background-image: url("${t.backUrl}")` : ""}
      ></div>
      ${t.showClock ? Em(t.now) : ""}
    </ha-card>
  ` : E`
      <ha-card>
        <div class="hint">
          Keine Bilder in <code>${t.folder}</code>.<br />
          Lege Fotos in den Medienordner, sie erscheinen dann von selbst.
        </div>
      </ha-card>
    `;
}
function Em(t) {
  return E`
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
var wm = Object.defineProperty, Sm = Object.getOwnPropertyDescriptor, ce = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? Sm(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (i ? o(e, n, r) : o(r)) || r);
  return i && r && wm(e, n, r), r;
};
const Am = "media-source://media_source/local/fotos", Dm = 30, Cm = 60, xm = 2e4;
let K = class extends J {
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
    super.disconnectedCallback(), this.stopTimers(), this.unsubscribe?.(), this.unsubscribe = void 0, this.started = !1;
  }
  render() {
    return ym({
      frontUrl: this.frontUrl,
      backUrl: this.backUrl,
      frontVisible: this.frontVisible,
      showClock: this.settings?.showClock ?? this.config?.showClock ?? !0,
      now: this.now,
      hasImages: this.hasImages,
      folder: this.folder
    });
  }
  get folder() {
    return this.settings?.folder ?? this.config?.folder ?? Am;
  }
  get intervalSeconds() {
    return this.settings?.interval ?? this.config?.interval ?? Dm;
  }
  get rescanMinutes() {
    return this.settings?.rescanMinutes ?? this.config?.rescanMinutes ?? Cm;
  }
  async start() {
    try {
      this.unsubscribe = await Ma(
        this.hass,
        (t) => this.applySettings(t.photos)
      );
    } catch (t) {
      console.warn("Family Photos: Einstellungen nicht erreichbar", t);
    }
    await this.rescan(), await this.advance(), this.startTimers();
  }
  /** Neue Einstellungen uebernehmen, ohne den Rahmen anzuhalten. */
  applySettings(t) {
    const e = this.folder;
    this.settings = t, this.folder !== e && (this.index = -1, this.rescan().then(() => this.advance())), this.startTimers();
  }
  startTimers() {
    this.stopTimers(), this.timers.push(
      window.setInterval(() => {
        this.advance();
      }, this.intervalSeconds * 1e3),
      window.setInterval(() => {
        this.rescan();
      }, this.rescanMinutes * 6e4),
      window.setInterval(() => this.now = /* @__PURE__ */ new Date(), xm)
    );
  }
  stopTimers() {
    for (const t of this.timers) clearInterval(t);
    this.timers = [];
  }
  /** Ordner neu einlesen, damit neue Bilder auftauchen. */
  async rescan() {
    try {
      this.images = await hm(this.hass, this.folder), this.hasImages = this.images.length > 0;
    } catch (t) {
      console.error("Family Photos: Ordner nicht lesbar", this.folder, t), this.hasImages = !1;
    }
  }
  /** Naechstes Bild einblenden. */
  async advance() {
    if (this.images.length !== 0) {
      this.index = (this.index + 1) % this.images.length;
      try {
        const t = await Ta(this.hass, this.images[this.index]);
        this.frontVisible ? this.backUrl = t : this.frontUrl = t, this.frontVisible = !this.frontVisible, this.now = /* @__PURE__ */ new Date();
      } catch (t) {
        console.error("Family Photos: Bild nicht abrufbar", t);
      }
    }
  }
};
K.styles = bm;
ce([
  j({ attribute: !1 })
], K.prototype, "hass", 2);
ce([
  j({ attribute: !1 })
], K.prototype, "config", 2);
ce([
  $()
], K.prototype, "frontUrl", 2);
ce([
  $()
], K.prototype, "backUrl", 2);
ce([
  $()
], K.prototype, "frontVisible", 2);
ce([
  $()
], K.prototype, "hasImages", 2);
ce([
  $()
], K.prototype, "now", 2);
ce([
  $()
], K.prototype, "settings", 2);
K = ce([
  Ke("family-photos")
], K);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-photos",
  name: "Family Photos",
  description: "Bilderrahmen mit Uhrzeit, gespeist aus einem Ordner der Medienablage.",
  preview: !1
});
const _m = q`
  ${Ra}

  ha-card {
    padding: 20px 22px 24px;
    gap: 0;
    /* Wie die anderen Bereiche: Sonst endet die Karte dort, wo ihr Inhalt
       aufhoert, und die Seitenleiste daneben bricht auf halber Hoehe ab. */
    min-height: 85vh;
    box-sizing: border-box;
  }

  .set-titel {
    margin: 0 0 14px;
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--text-primary);
  }

  .set {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* --- Abschnittswahl --------------------------------------------------- */

  .set-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .set-tab {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    min-height: 40px;
    padding: 0 15px;
    border: 1px solid rgba(60, 60, 67, 0.1);
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.55);
    color: var(--text-primary);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
  }

  .set-tab ha-icon {
    --mdc-icon-size: 19px;
    color: var(--text-secondary);
  }

  .set-tab:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.85);
  }

  .set-tab.active {
    background: var(--accent-color);
    border-color: transparent;
    color: #fff;
  }

  .set-tab.active ha-icon {
    color: #fff;
  }

  .set-tab:disabled {
    opacity: 0.45;
    cursor: default;
  }

  .set-soon {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
  }

  .set-hinweis {
    padding: 10px 14px;
    border-radius: 12px;
    background: rgba(255, 59, 48, 0.1);
    border: 1px solid rgba(255, 59, 48, 0.25);
    color: #b3261e;
    font-size: 0.86rem;
  }

  /* --- Gruppen und Zeilen ----------------------------------------------- */

  .set-inhalt {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .set-gruppe h3 {
    margin: 0 0 8px;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-secondary);
  }

  .set-gruppe {
    padding: 14px 16px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  .set-zeile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 11px 0;
    border-top: 1px solid rgba(60, 60, 67, 0.08);
  }

  .set-zeile:first-of-type {
    border-top: none;
  }

  .set-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .set-label {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-primary);
  }

  .set-hint {
    font-size: 0.78rem;
    line-height: 1.35;
    color: var(--text-secondary);
  }

  .set-steuer {
    flex: 0 0 auto;
  }

  .set-nebeneinander {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .set-anzeige {
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-variant-numeric: tabular-nums;
  }

  .set-schmal {
    display: inline-block;
    max-width: 320px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
  }

  /* --- Bedienelemente --------------------------------------------------- */

  .set-schalter {
    width: 52px;
    height: 31px;
    padding: 2px;
    border: none;
    border-radius: 16px;
    background: rgba(60, 60, 67, 0.22);
    cursor: pointer;
    transition: background 0.18s ease;
  }

  .set-schalter.an {
    background: #34c759;
  }

  .set-knopf {
    display: block;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    transition: transform 0.18s ease;
  }

  .set-schalter.an .set-knopf {
    transform: translateX(21px);
  }

  .set-zahl {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(60, 60, 67, 0.1);
    overflow: hidden;
  }

  .set-zahl button {
    width: 40px;
    height: 38px;
    border: none;
    background: transparent;
    color: var(--accent-color);
    font-size: 1.2rem;
    cursor: pointer;
  }

  .set-zahl button:hover:not(:disabled) {
    background: rgba(0, 122, 255, 0.1);
  }

  .set-zahl button:disabled {
    opacity: 0.3;
    cursor: default;
  }

  .set-wert {
    min-width: 62px;
    text-align: center;
    font-size: 0.98rem;
    font-weight: 600;
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
  }

  .set-wert small {
    margin-left: 2px;
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--text-secondary);
  }

  .set-eingabe {
    width: 340px;
    max-width: 42vw;
    height: 38px;
    padding: 0 12px;
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid rgba(60, 60, 67, 0.14);
    background: #fff;
    color: var(--text-primary);
    font: inherit;
    font-size: 0.88rem;
  }

  .set-primaer,
  .set-sekundaer,
  .set-weg,
  .set-zurueck {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    min-height: 40px;
    padding: 0 16px;
    border-radius: 20px;
    border: none;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }

  .set-primaer {
    background: var(--accent-color);
    color: #fff;
  }

  .set-sekundaer,
  .set-zurueck {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(60, 60, 67, 0.12);
    color: var(--text-primary);
  }

  .set-weg {
    background: #ff3b30;
    color: #fff;
  }

  .set-primaer:hover,
  .set-weg:hover {
    filter: brightness(1.08);
  }

  /* --- Bilder ----------------------------------------------------------- */

  .set-upload {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 14px;
  }

  .set-anzahl {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .set-fortschritt {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .set-balken {
    height: 6px;
    border-radius: 3px;
    background: rgba(60, 60, 67, 0.12);
    overflow: hidden;
  }

  .set-balken-fuell {
    height: 100%;
    background: var(--accent-color);
    transition: width 0.2s ease;
  }

  .set-galerie {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }

  .set-kachel {
    position: relative;
    margin: 0;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(60, 60, 67, 0.08);
  }

  .set-kachel img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .set-kachel figcaption {
    padding: 5px 8px;
    font-size: 0.72rem;
    color: var(--text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .set-loeschen {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    cursor: pointer;
  }

  .set-loeschen ha-icon {
    --mdc-icon-size: 18px;
  }

  .set-loeschen:hover {
    background: #ff3b30;
  }

  /* Nachfrage vor dem Loeschen: Eine Datei ist danach weg, das laesst sich
     nicht zuruecknehmen. */
  .set-nachfrage {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 8px;
    background: rgba(20, 20, 22, 0.82);
    color: #fff;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .set-nachfrage div {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }

  .set-nachfrage button {
    min-height: 32px;
    padding: 0 10px;
    font-size: 0.78rem;
    justify-content: center;
  }

  .set-leer {
    display: flex;
    align-items: center;
    gap: 9px;
    margin: 0;
    padding: 18px 4px;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;
function Rm(t) {
  return E`
    <div class="set">
      <div class="set-tabs">
        ${t.sections.map(
    (e) => E`
            <button
              class="set-tab ${e.id === t.active ? "active" : ""}"
              ?disabled=${!e.ready}
              @click=${() => t.onSection(e.id)}
            >
              <ha-icon icon=${e.icon}></ha-icon>
              <span>${e.name}</span>
              ${e.ready ? "" : E`<span class="set-soon">folgt</span>`}
            </button>
          `
  )}
      </div>

      ${t.message ? E`<div class="set-hinweis">${t.message}</div>` : ""}

      <div class="set-inhalt">${t.content}</div>
    </div>
  `;
}
function Tm(t) {
  return E`
    <p class="set-leer">
      <ha-icon icon="mdi:hammer-wrench"></ha-icon>
      ${t} ist noch nicht gebaut.
    </p>
  `;
}
function ct(t, e) {
  return E`
    <section class="set-gruppe">
      <h3>${t}</h3>
      ${e}
    </section>
  `;
}
function ie(t, e, n) {
  return E`
    <div class="set-zeile">
      <div class="set-text">
        <span class="set-label">${t}</span>
        ${e ? E`<span class="set-hint">${e}</span>` : ""}
      </div>
      <div class="set-steuer">${n}</div>
    </div>
  `;
}
function km(t, e) {
  return E`
    <button
      class="set-schalter ${t ? "an" : ""}"
      role="switch"
      aria-checked=${t ? "true" : "false"}
      @click=${() => e(!t)}
    >
      <span class="set-knopf"></span>
    </button>
  `;
}
function fs(t, e, n, i, r) {
  const s = (o) => {
    r(Math.min(i.max, Math.max(i.min, o)));
  };
  return E`
    <div class="set-zahl">
      <button ?disabled=${t <= i.min} @click=${() => s(t - n)}>−</button>
      <span class="set-wert">${t}<small>${e}</small></span>
      <button ?disabled=${t >= i.max} @click=${() => s(t + n)}>+</button>
    </div>
  `;
}
function Mm(t, e, n) {
  return E`
    <input
      class="set-eingabe"
      type="text"
      .value=${t}
      placeholder=${e}
      @change=${(i) => n(i.target.value.trim())}
    />
  `;
}
function Im(t) {
  return E`
    ${ct(
    "Zeit",
    E`
        ${ie(
      "Zeitzone",
      "Kommt von Home Assistant. Der Kalender rechnet damit - eine zweite Zeitzone hier würde nur zu zwei Wahrheiten führen.",
      E`
            <div class="set-nebeneinander">
              <span class="set-anzeige">${t.timeZone || "unbekannt"}</span>
              <button class="set-sekundaer" @click=${t.onOpenTimeZone}>Ändern</button>
            </div>
          `
    )}
      `
  )}
    ${ct(
    "Termine aus Office 365",
    E`
        ${ie(
      "Einladungsweg",
      "Läuft über ein Postfach und braucht ein App-Passwort. Das gebe ich nicht ein - es gehört in den Dialog der Integration.",
      E`<button class="set-sekundaer" @click=${t.onOpenIntegration}>Einrichten</button>`
    )}
      `
  )}
    ${ct(
    "Stand",
    E`
        ${ie("App", "", E`<span class="set-anzeige">${t.appVersion || "–"}</span>`)}
        ${ie("Home Assistant", "", E`<span class="set-anzeige">${t.haVersion}</span>`)}
        ${ie(
      "Bilderordner",
      "",
      E`<span class="set-anzeige set-schmal">${t.folder}</span>`
    )}
      `
  )}
  `;
}
function Nm(t) {
  return E`
    ${ct("Bilder", Om(t))}
    ${ct(
    "Bilderrahmen",
    E`
        ${ie(
      "Sekunden je Bild",
      "Wie lange ein Bild stehen bleibt.",
      fs(
        t.settings.interval,
        "s",
        5,
        { min: 5, max: 300 },
        (e) => t.onChange({ interval: e })
      )
    )}
        ${ie(
      "Uhr einblenden",
      "Zeigt Uhrzeit und Datum über dem Bild.",
      km(t.settings.showClock, (e) => t.onChange({ showClock: e }))
    )}
        ${ie(
      "Ordner neu lesen",
      "Wie oft nach neuen Bildern gesehen wird.",
      fs(
        t.settings.rescanMinutes,
        "min",
        15,
        { min: 5, max: 720 },
        (e) => t.onChange({ rescanMinutes: e })
      )
    )}
        ${ie(
      "Ordner",
      "Ort in der Medienablage. Nur ändern, wenn die Bilder woanders liegen.",
      Mm(t.settings.folder, "media-source://…", (e) => t.onChange({ folder: e }))
    )}
      `
  )}
  `;
}
function Om(t) {
  return E`
    <div class="set-upload">
      ${t.uploading ? E`
            <div class="set-fortschritt">
              <span>Lädt … ${t.uploading.fertig} von ${t.uploading.gesamt}</span>
              <div class="set-balken">
                <div
                  class="set-balken-fuell"
                  style="width: ${Math.round(
    t.uploading.fertig / Math.max(1, t.uploading.gesamt) * 100
  )}%"
                ></div>
              </div>
            </div>
          ` : E`
            <button class="set-primaer" @click=${t.onPick}>
              <ha-icon icon="mdi:image-plus"></ha-icon>
              Bilder auswählen
            </button>
            <span class="set-anzahl">
              ${t.loading ? "wird gelesen …" : t.tiles.length === 1 ? "1 Bild im Ordner" : `${t.tiles.length} Bilder im Ordner`}
            </span>
          `}
      <input
        id="dateiwahl"
        type="file"
        accept="image/*"
        multiple
        hidden
        @change=${(e) => {
    const n = e.target;
    n.files?.length && t.onFiles(n.files), n.value = "";
  }}
      />
    </div>

    ${t.tiles.length === 0 && !t.loading ? E`<p class="set-leer">
          <ha-icon icon="mdi:image-off-outline"></ha-icon>
          Noch keine Bilder. Der Bilderrahmen bleibt leer, bis welche da sind.
        </p>` : E`<div class="set-galerie">${t.tiles.map((e) => $m(e, t))}</div>`}
  `;
}
function $m(t, e) {
  const n = e.confirmDelete === t.id;
  return E`
    <figure class="set-kachel ${n ? "fragt" : ""}">
      <!-- Ohne loading="lazy": Die Kacheln entstehen, waehrend der Bereich
           in der Huelle noch verborgen ist. Der Browser haelt sie dann fuer
           ausserhalb des Sichtfelds und laedt sie auch beim Aufklappen nicht
           zuverlaessig nach - die Galerie bliebe grau. -->
      <img src=${t.url} alt=${t.title} />
      ${n ? E`
            <div class="set-nachfrage">
              <span>Löschen?</span>
              <div>
                <button class="set-weg" @click=${() => e.onDelete(t.id)}>Ja, löschen</button>
                <button class="set-zurueck" @click=${e.onCancelDelete}>Abbrechen</button>
              </div>
            </div>
          ` : E`
            <button
              class="set-loeschen"
              title="${t.title} löschen"
              @click=${() => e.onAskDelete(t.id)}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          `}
      <figcaption>${t.title}</figcaption>
    </figure>
  `;
}
var Pm = Object.defineProperty, Hm = Object.getOwnPropertyDescriptor, Y = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? Hm(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (i ? o(e, n, r) : o(r)) || r);
  return i && r && Pm(e, n, r), r;
};
const hs = [
  { id: "fotos", icon: "mdi:image-multiple", name: "Fotos", ready: !0 },
  { id: "kalender", icon: "mdi:calendar-month", name: "Kalender", ready: !1 },
  { id: "aufgaben", icon: "mdi:checkbox-marked-outline", name: "Aufgaben", ready: !1 },
  { id: "panel", icon: "mdi:tablet-dashboard", name: "Panel", ready: !1 },
  { id: "info", icon: "mdi:information-outline", name: "Über", ready: !0 }
], zm = 6e3;
let F = class extends J {
  constructor() {
    super(...arguments), this.settings = pm, this.section = "fotos", this.tiles = [], this.loading = !0, this.uploading = null, this.confirmDelete = "", this.message = "", this.appVersion = "", this.started = !1;
  }
  setConfig(t) {
    this.config = t;
  }
  getCardSize() {
    return 12;
  }
  updated() {
    this.hass && !this.started && (this.started = !0, this.start());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.unsubscribe?.(), this.unsubscribe = void 0, this.hinweisTimer && clearTimeout(this.hinweisTimer), this.started = !1;
  }
  render() {
    return E`
      <ha-card>
        <h2 class="set-titel">Einstellungen</h2>
        ${Rm({
      sections: hs,
      active: this.section,
      message: this.message,
      onSection: (t) => {
        this.section = t, this.confirmDelete = "";
      },
      content: this.inhalt()
    })}
      </ha-card>
    `;
  }
  inhalt() {
    return this.section === "info" ? Im({
      timeZone: this.hass?.config?.time_zone ?? "",
      haVersion: this.hass?.config?.version ?? "",
      appVersion: this.appVersion,
      folder: this.settings.photos.folder,
      onOpenIntegration: () => this.navigate("/config/integrations/integration/calendar_service_ext"),
      onOpenTimeZone: () => this.navigate("/config/general")
    }) : this.section !== "fotos" ? Tm(hs.find((t) => t.id === this.section)?.name ?? "Der Bereich") : Nm({
      settings: this.settings.photos,
      tiles: this.tiles,
      uploading: this.uploading,
      confirmDelete: this.confirmDelete,
      loading: this.loading,
      onPick: () => this.fileInput?.click(),
      onFiles: (t) => {
        this.upload(t);
      },
      onAskDelete: (t) => this.confirmDelete = t,
      onCancelDelete: () => this.confirmDelete = "",
      onDelete: (t) => {
        this.bildLoeschen(t);
      },
      onChange: (t) => {
        this.savePhotos(t);
      }
    });
  }
  // ---------------------------------------------------------------- Daten
  async start() {
    try {
      this.unsubscribe = await Ma(this.hass, (t) => {
        const e = t.photos.folder !== this.settings.photos.folder;
        this.settings = t, e && this.loadTiles();
      });
    } catch (t) {
      console.error("Family Settings: Einstellungen nicht erreichbar", t), this.notify("Einstellungen konnten nicht geladen werden.");
    }
    this.loadVersion(), await this.loadTiles();
  }
  async loadVersion() {
    try {
      const t = await this.hass.callWS({
        type: "manifest/get",
        integration: "calendar_service_ext"
      });
      this.appVersion = t.version ?? "";
    } catch {
      this.appVersion = "";
    }
  }
  async loadTiles() {
    this.loading = !0;
    try {
      const t = await fm(this.hass, this.settings.photos.folder);
      this.tiles = await Promise.all(t.map((e) => this.toTile(e)));
    } catch (t) {
      console.error("Family Settings: Ordner nicht lesbar", t), this.tiles = [], this.notify("Der Bilderordner ist nicht lesbar.");
    } finally {
      this.loading = !1;
    }
  }
  async toTile(t) {
    return { ...t, url: await Ta(this.hass, t.id) };
  }
  // -------------------------------------------------------------- Bilder
  async upload(t) {
    const e = [...t];
    this.uploading = { fertig: 0, gesamt: e.length };
    let n = 0;
    for (const i of e) {
      try {
        await mm(this.hass, this.settings.photos.folder, i);
      } catch (r) {
        n++, console.error("Family Settings: Upload fehlgeschlagen", i.name, r);
      }
      this.uploading = { fertig: this.uploading.fertig + 1, gesamt: e.length };
    }
    this.uploading = null, n > 0 && this.notify(
      n === e.length ? "Kein Bild konnte hochgeladen werden." : `${n} von ${e.length} Bildern konnten nicht hochgeladen werden.`
    ), await this.loadTiles();
  }
  async bildLoeschen(t) {
    this.confirmDelete = "";
    try {
      await vm(this.hass, t), this.tiles = this.tiles.filter((e) => e.id !== t);
    } catch (e) {
      console.error("Family Settings: Löschen fehlgeschlagen", e), this.notify("Das Bild konnte nicht gelöscht werden.");
    }
  }
  async savePhotos(t) {
    this.settings = { ...this.settings, photos: { ...this.settings.photos, ...t } };
    try {
      await gm(this.hass, { photos: t }), t.folder !== void 0 && await this.loadTiles();
    } catch (e) {
      console.error("Family Settings: Speichern fehlgeschlagen", e), this.notify("Die Einstellung konnte nicht gespeichert werden.");
    }
  }
  // -------------------------------------------------------------- Helfer
  navigate(t) {
    history.pushState(null, "", t), window.dispatchEvent(new Event("location-changed"));
  }
  notify(t) {
    this.message = t, this.hinweisTimer && clearTimeout(this.hinweisTimer), this.hinweisTimer = window.setTimeout(() => this.message = "", zm);
  }
};
F.styles = _m;
Y([
  j({ attribute: !1 })
], F.prototype, "hass", 2);
Y([
  j({ attribute: !1 })
], F.prototype, "config", 2);
Y([
  $()
], F.prototype, "settings", 2);
Y([
  $()
], F.prototype, "section", 2);
Y([
  $()
], F.prototype, "tiles", 2);
Y([
  $()
], F.prototype, "loading", 2);
Y([
  $()
], F.prototype, "uploading", 2);
Y([
  $()
], F.prototype, "confirmDelete", 2);
Y([
  $()
], F.prototype, "message", 2);
Y([
  $()
], F.prototype, "appVersion", 2);
Y([
  oi("#dateiwahl")
], F.prototype, "fileInput", 2);
F = Y([
  Ke("family-settings")
], F);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-settings",
  name: "Family Settings",
  description: "Einstellungen der Family-Calendar-App: Bilder, Bilderrahmen und Stand.",
  preview: !1
});
const Bm = q`
  :host {
    display: block;
    height: 100%;
    color-scheme: light;
  }

  ha-card {
    height: 100%;
    display: flex;
    flex-direction: column;
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

  /* Zurueckhaltend: Er wird selten gebraucht und soll die Bereiche nicht
     ueberstrahlen. Erst beim Beruehren tritt er hervor. */
  .reload {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    margin: auto 0 10px;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 12px;
    background: transparent;
    color: #9aa0a6;
    opacity: 0.55;
    cursor: pointer;
    transition: opacity 0.15s, background 0.15s, color 0.15s;
  }

  .reload ha-icon {
    --mdc-icon-size: 20px;
  }

  .reload:hover,
  .reload:focus-visible {
    opacity: 1;
    background: rgba(0, 0, 0, 0.05);
    color: #1d1d1f;
  }

  .reload:active ha-icon {
    /* Kurze Drehung als Rueckmeldung - bis das Neuladen greift, vergeht
       auf dem Panel ein Moment. */
    animation: reload-dreht 0.6s linear infinite;
  }

  @keyframes reload-dreht {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .reload:active ha-icon {
      animation: none;
    }
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
`, Lm = q`
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
function Um(t) {
  return E`
    <ha-card>
      <nav>${t.items.map((e) => Fm(e, t))}</nav>
      <!-- Im Kiosk-Modus gibt es keine Browserleiste und damit keinen Weg,
           die Seite neu zu laden. Der Knopf sitzt am Fuss und weit weg von
           den Bereichen: erreichbar, wenn man ihn sucht, und schwer
           versehentlich zu treffen. -->
      <button
        class="reload"
        title="Seite neu laden"
        aria-label="Seite neu laden"
        @click=${() => t.onReload()}
      >
        <ha-icon icon="mdi:refresh"></ha-icon>
      </button>
    </ha-card>
  `;
}
function Fm(t, e) {
  const n = e.isActive(t), i = [
    "item",
    n ? "item--active" : "",
    t.disabled ? "item--disabled" : ""
  ].filter(Boolean).join(" ");
  return E`
    <button
      class=${i}
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
var jm = Object.defineProperty, Wm = Object.getOwnPropertyDescriptor, et = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? Wm(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (i ? o(e, n, r) : o(r)) || r);
  return i && r && jm(e, n, r), r;
};
let be = class extends J {
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
    return E`
      <div class="shell">
        ${Um({
      items: this.config.areas,
      isActive: (t) => t.id === this.activeId && !this.pathOf(t.id),
      onSelect: (t) => this.select(t.id),
      onReload: () => location.reload()
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
    if (t.path) return E``;
    const e = this.cards.get(t.id), n = t.id !== this.activeId;
    return e ? E`<div class="area" ?hidden=${n}>${e}</div>` : n ? E`` : E`<div class="placeholder">Dieser Bereich ist noch nicht eingerichtet.</div>`;
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
be.styles = [Lm, Bm];
et([
  j({ attribute: !1 })
], be.prototype, "hass", 2);
et([
  j({ attribute: !1 })
], be.prototype, "config", 2);
et([
  j({ type: Boolean, reflect: !0 })
], be.prototype, "compact", 2);
et([
  $()
], be.prototype, "activeId", 2);
et([
  $()
], be.prototype, "ready", 2);
be = et([
  Ke("family-shell")
], be);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-shell",
  name: "Family Shell",
  description: "Seitenleiste mit Bereichen, die beim Wechseln geladen bleiben.",
  preview: !1
});
async function Vm(t, e, n) {
  return t.connection.subscribeMessage((r) => n(r.items ?? []), {
    type: "todo/item/subscribe",
    entity_id: e
  });
}
async function Gm(t, e, n, i = {}) {
  await t.callService("todo", "add_item", {
    entity_id: e,
    item: n,
    ...i.dueDate ? { due_date: i.dueDate } : {},
    ...i.description ? { description: i.description } : {}
  });
}
async function qm(t, e, n, i) {
  await t.callService("todo", "update_item", {
    entity_id: e,
    item: n.uid,
    status: i
  });
}
async function Ym(t, e, n, i) {
  await t.callService("todo", "update_item", {
    entity_id: e,
    item: n.uid,
    ...i.rename !== void 0 ? { rename: i.rename } : {},
    ...i.dueDate !== void 0 ? { due_date: i.dueDate } : {},
    ...i.description !== void 0 ? { description: i.description } : {}
  });
}
async function Qm(t, e, n) {
  await t.callService("todo", "remove_item", { entity_id: e, item: n.uid });
}
async function Zm(t, e) {
  await t.callService("todo", "remove_completed_items", { entity_id: e });
}
const Km = q`
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
`, Ia = /^\[wdh:\s*([^\]]+)\]\s*$/m, Xm = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"];
function Na(t) {
  if (!t) return null;
  const e = Ia.exec(t);
  if (!e) return null;
  const n = e[1], i = ps(n, "FREQ");
  if (!i || !Xm.includes(i)) return null;
  const r = Number.parseInt(ps(n, "INTERVAL") ?? "1", 10);
  return {
    frequency: i,
    interval: Number.isFinite(r) && r > 0 ? r : 1
  };
}
function ps(t, e) {
  for (const n of t.split(";")) {
    const [i, r] = n.split("=");
    if (i?.trim().toUpperCase() === e) return r?.trim().toUpperCase();
  }
}
function Oa(t) {
  return t ? t.replace(Ia, "").trim() : "";
}
function gs(t, e, n = 1) {
  const i = Oa(t);
  if (!e) return i;
  const r = n > 1 ? `FREQ=${e};INTERVAL=${n}` : `FREQ=${e}`;
  return i ? `${i}

[wdh: ${r}]` : `[wdh: ${r}]`;
}
const Jm = {
  DAILY: "Täglich",
  WEEKLY: "Wöchentlich",
  MONTHLY: "Monatlich",
  YEARLY: "Jährlich"
}, ev = {
  DAILY: "Tage",
  WEEKLY: "Wochen",
  MONTHLY: "Monate",
  YEARLY: "Jahre"
};
function ms(t) {
  return t.interval <= 1 ? Jm[t.frequency] ?? "Wiederholt" : `Alle ${t.interval} ${ev[t.frequency] ?? "Male"}`;
}
const xt = (t) => t.target.value;
function tv(t) {
  return E`
    <div class="dialog-overlay" @click=${() => t.onCancel()}>
      <div class="dialog" @click=${(e) => e.stopPropagation()}>
        <h3>Aufgabe</h3>
        <p class="dialog-list">${t.listName}</p>

        <label class="field">
          Titel
          <input type="text" .value=${t.title} @input=${(e) => t.onTitle(xt(e))} />
        </label>

        <label class="field">
          Fällig am
          <input type="date" .value=${t.due} @input=${(e) => t.onDue(xt(e))} />
        </label>

        <label class="field">
          Wiederholung
          <select
            .value=${t.frequency}
            @change=${(e) => t.onFrequency(xt(e))}
          >
            <option value="">Keine</option>
            <option value="DAILY">Täglich</option>
            <option value="WEEKLY">Wöchentlich</option>
            <option value="MONTHLY">Monatlich</option>
            <option value="YEARLY">Jährlich</option>
          </select>
        </label>

        ${t.frequency ? E`
              <label class="field">
                Alle … Male
                <input
                  type="number"
                  min="1"
                  max="30"
                  .value=${String(t.interval)}
                  @input=${(e) => t.onInterval(Math.max(1, Number.parseInt(xt(e), 10) || 1))}
                />
              </label>
              <p class="dialog-hint">
                Nach dem Abhaken erscheint die Aufgabe automatisch wieder.
              </p>
            ` : E`
              <p class="dialog-hint">
                Ohne Wiederholung bleibt die Aufgabe nach dem Abhaken erledigt.
              </p>
            `}

        <div class="dialog-actions">
          ${t.confirmDelete ? E`
                <button class="btn-delete btn-delete--confirm" @click=${() => t.onDelete()}>
                  Wirklich löschen?
                </button>
              ` : E`
                <button class="btn-delete" @click=${() => t.onConfirmDelete()}>Löschen</button>
              `}
          <button class="btn-cancel" @click=${() => t.onCancel()}>Abbrechen</button>
          <button class="btn-save" @click=${() => t.onSave()}>Speichern</button>
        </div>
      </div>
    </div>
  `;
}
function en(t) {
  if (!t.due) return null;
  const e = new Date(t.due.length === 10 ? `${t.due}T00:00:00` : t.due);
  return Number.isNaN(e.getTime()) ? null : e;
}
function nv(t, e = /* @__PURE__ */ new Date()) {
  if (t.status === "completed") return !1;
  const n = en(t);
  if (!n) return !1;
  const i = new Date(e);
  return i.setHours(0, 0, 0, 0), n < i;
}
function iv(t, e = /* @__PURE__ */ new Date()) {
  const n = en(t);
  if (!n) return null;
  const i = Math.round(
    (new Date(n).setHours(0, 0, 0, 0) - new Date(e).setHours(0, 0, 0, 0)) / 864e5
  );
  return i < 0 ? i === -1 ? "Gestern" : `${Math.abs(i)} Tage überfällig` : i === 0 ? "Heute" : i === 1 ? "Morgen" : i < 7 ? n.toLocaleDateString("de-DE", { weekday: "long" }) : n.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
}
function rv(t) {
  return [...t].sort((e, n) => {
    if (e.status !== n.status) return e.status === "completed" ? 1 : -1;
    const i = en(e), r = en(n);
    return i && r ? i.getTime() - r.getTime() : i ? -1 : r ? 1 : e.summary.localeCompare(n.summary, "de");
  });
}
function sv(t) {
  return t.filter((e) => e.status !== "completed").length;
}
const ov = {
  text: "",
  due: "",
  frequency: "",
  interval: 1,
  expanded: !1
};
function av(t) {
  return E`
    <ha-card>
      ${t.title ? E`<h2 class="card-title">${t.title}</h2>` : ""}
      <div class="columns">${t.lists.map((e) => lv(e, t))}</div>
    </ha-card>
  `;
}
function lv(t, e) {
  const n = e.items.get(t.entity) ?? [], i = e.showCompleted ? n : n.filter((o) => o.status !== "completed"), r = sv(n), s = n.length - r;
  return E`
    <section class="column" style="--list-color: ${t.color ?? "#0078d4"}">
      <header class="column-head">
        <span class="column-name">${t.name ?? e.nameOf(t.entity)}</span>
        <span class="column-count" title="offen">${r}</span>
      </header>

      <div class="items">
        ${i.length === 0 ? E`<p class="empty">${e.showDue ? "Nichts offen" : "Liste ist leer"}</p>` : rv(i).map((o) => cv(t, o, e))}
      </div>

      ${dv(t, e)}

      ${e.showCompleted && s > 0 ? E`
            <button class="clear" @click=${() => e.onClearCompleted(t.entity)}>
              ${s} erledigte entfernen
            </button>
          ` : ""}
    </section>
  `;
}
function cv(t, e, n) {
  const i = e.status === "completed", r = n.showDue ? iv(e) : null, s = Na(e.description);
  return E`
    <div class="item ${i ? "item--done" : ""} ${nv(e) ? "item--overdue" : ""}">
      <button
        class="check"
        aria-label=${i ? "Wieder öffnen" : "Abhaken"}
        @click=${() => n.onToggle(t.entity, e)}
      >
        ${i ? E`<ha-icon icon="mdi:check"></ha-icon>` : ""}
      </button>
      <button class="item-body" title="Ändern" @click=${() => n.onOpen(t.entity, e)}>
        <span class="item-title">${e.summary}</span>
        ${r || s ? E`
              <span class="item-meta">
                ${r ? E`<span class="item-due">${r}</span>` : ""}
                ${s ? E`
                      <span class="item-repeat" title=${ms(s)}>
                        <ha-icon icon="mdi:repeat"></ha-icon>
                        ${ms(s)}
                      </span>
                    ` : ""}
              </span>
            ` : ""}
      </button>
    </div>
  `;
}
function dv(t, e) {
  const n = e.drafts.get(t.entity) ?? ov, i = (r) => r.target.value;
  return E`
    <div class="add">
      <input
        type="text"
        placeholder=${e.showDue ? "Neue Aufgabe…" : "Neuer Eintrag…"}
        .value=${n.text}
        @input=${(r) => e.onDraft(t.entity, { text: i(r) })}
        @keydown=${(r) => r.key === "Enter" && e.onAdd(t.entity)}
      />
      ${e.showDue ? E`
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

    ${e.showDue && n.expanded ? uv(t, n, e) : ""}
  `;
}
function uv(t, e, n) {
  const i = (r) => r.target.value;
  return E`
    <div class="add-details">
      <label>
        Fällig am
        <input
          type="date"
          .value=${e.due}
          @input=${(r) => n.onDraft(t.entity, { due: i(r) })}
        />
      </label>
      <label>
        Wiederholung
        <select
          .value=${e.frequency}
          @change=${(r) => n.onDraft(t.entity, { frequency: i(r) })}
        >
          <option value="">Keine</option>
          <option value="DAILY">Täglich</option>
          <option value="WEEKLY">Wöchentlich</option>
          <option value="MONTHLY">Monatlich</option>
          <option value="YEARLY">Jährlich</option>
        </select>
      </label>
      ${e.frequency ? E`
            <label>
              Alle … Male
              <input
                type="number"
                min="1"
                max="30"
                .value=${String(e.interval)}
                @input=${(r) => n.onDraft(t.entity, {
    interval: Math.max(1, Number.parseInt(i(r), 10) || 1)
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
var fv = Object.defineProperty, hv = Object.getOwnPropertyDescriptor, tt = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? hv(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (i ? o(e, n, r) : o(r)) || r);
  return i && r && fv(e, n, r), r;
};
let ye = class extends J {
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
    return E`${this.renderCard()}${this.renderDialog()}`;
  }
  renderDialog() {
    const t = this.open;
    if (!t) return H;
    const e = this.config.lists.find((i) => i.entity === t.entityId), n = (i) => {
      this.open && (this.open = { ...this.open, ...i });
    };
    return tv({
      title: t.title,
      due: t.due,
      frequency: t.frequency,
      interval: t.interval,
      listName: e?.name ?? this.nameOf(t.entityId),
      confirmDelete: t.confirmDelete,
      onTitle: (i) => n({ title: i }),
      onDue: (i) => n({ due: i }),
      onFrequency: (i) => n({ frequency: i }),
      onInterval: (i) => n({ interval: i }),
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
    return av({
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
        Zm(this.hass, t);
      }
    });
  }
  async subscribeAll() {
    for (const t of this.config.lists)
      try {
        const e = await Vm(this.hass, t.entity, (n) => {
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
      await qm(this.hass, t, e, n);
    } catch (i) {
      console.error("Family Tasks: Status liess sich nicht aendern", i), this.notify("Die Aufgabe ließ sich nicht ändern.");
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
        await Gm(this.hass, t, n, {
          dueDate: e.due || void 0,
          // Die Wiederholung reist in der Beschreibung mit - die Integration
          // liest sie beim Abhaken und legt die naechste Aufgabe an.
          description: e.frequency ? gs("", e.frequency, e.interval) : void 0
        });
      } catch (i) {
        console.error("Family Tasks: Anlegen fehlgeschlagen", i), this.patchDraft(t, e), this.notify("Die Aufgabe ließ sich nicht anlegen.");
      }
    }
  }
  /** Detailansicht mit den aktuellen Werten fuellen. */
  openItem(t, e) {
    const n = Na(e.description);
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
    const n = Oa(t.item.description), i = gs(n, t.frequency, t.interval);
    this.open = null;
    try {
      await Ym(this.hass, t.entityId, t.item, {
        rename: e,
        dueDate: t.due || void 0,
        description: i
      });
    } catch (r) {
      console.error("Family Tasks: Aendern fehlgeschlagen", r), this.notify("Die Aufgabe ließ sich nicht ändern.");
    }
  }
  async deleteOpen() {
    const t = this.open;
    if (t) {
      this.open = null;
      try {
        await Qm(this.hass, t.entityId, t.item);
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
ye.styles = Km;
tt([
  j({ attribute: !1 })
], ye.prototype, "hass", 2);
tt([
  j({ attribute: !1 })
], ye.prototype, "config", 2);
tt([
  $()
], ye.prototype, "items", 2);
tt([
  $()
], ye.prototype, "drafts", 2);
tt([
  $()
], ye.prototype, "open", 2);
ye = tt([
  Ke("family-tasks")
], ye);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-tasks",
  name: "Family Tasks",
  description: "Aufgaben- und Einkaufslisten nebeneinander, mit Abhaken und Anlegen.",
  preview: !1
});
