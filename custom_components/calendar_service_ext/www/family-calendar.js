const Mt = globalThis, ci = Mt.ShadowRoot && (Mt.ShadyCSS === void 0 || Mt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, di = /* @__PURE__ */ Symbol(), tr = /* @__PURE__ */ new WeakMap();
let Us = class {
  constructor(e, n, i) {
    if (this._$cssResult$ = !0, i !== di) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (ci && e === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (e = tr.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && tr.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ml = (t) => new Us(typeof t == "string" ? t : t + "", void 0, di), G = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((i, r, s) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[s + 1], t[0]);
  return new Us(n, t, di);
}, vl = (t, e) => {
  if (ci) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const i = document.createElement("style"), r = Mt.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = n.cssText, t.appendChild(i);
  }
}, nr = ci ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const i of e.cssRules) n += i.cssText;
  return ml(n);
})(t) : t;
const { is: bl, defineProperty: yl, getOwnPropertyDescriptor: wl, getOwnPropertyNames: El, getOwnPropertySymbols: Sl, getPrototypeOf: Al } = Object, ln = globalThis, ir = ln.trustedTypes, Dl = ir ? ir.emptyScript : "", Cl = ln.reactiveElementPolyfillSupport, ot = (t, e) => t, Bt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Dl : null;
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
} }, ui = (t, e) => !bl(t, e), rr = { attribute: !0, type: String, converter: Bt, reflect: !1, useDefault: !1, hasChanged: ui };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ln.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Be = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = rr) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, i, n);
      r !== void 0 && yl(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, n, i) {
    const { get: r, set: s } = wl(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? rr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ot("elementProperties"))) return;
    const e = Al(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ot("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ot("properties"))) {
      const n = this.properties, i = [...El(n), ...Sl(n)];
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
      for (const r of i) n.unshift(nr(r));
    } else e !== void 0 && n.push(nr(e));
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
    return vl(e, this.constructor.elementStyles), e;
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
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : Bt).toAttribute(n, i.type);
      this._$Em = e, s == null ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
    }
  }
  _$AK(e, n) {
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const s = i.getPropertyOptions(r), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Bt;
      this._$Em = r;
      const a = o.fromAttribute(n, s.type);
      this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, n, i, r = !1, s) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (s = this[e]), i ??= o.getPropertyOptions(e), !((i.hasChanged ?? ui)(s, n) || i.useDefault && i.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, i)))) return;
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
Be.elementStyles = [], Be.shadowRootOptions = { mode: "open" }, Be[ot("elementProperties")] = /* @__PURE__ */ new Map(), Be[ot("finalized")] = /* @__PURE__ */ new Map(), Cl?.({ ReactiveElement: Be }), (ln.reactiveElementVersions ??= []).push("2.1.2");
const hi = globalThis, sr = (t) => t, Lt = hi.trustedTypes, or = Lt ? Lt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Fs = "$lit$", pe = `lit$${Math.random().toFixed(9).slice(2)}$`, js = "?" + pe, xl = `<${js}>`, ke = document, ut = () => ke.createComment(""), ht = (t) => t === null || typeof t != "object" && typeof t != "function", fi = Array.isArray, _l = (t) => fi(t) || typeof t?.[Symbol.iterator] == "function", En = `[ 	
\f\r]`, rt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ar = /-->/g, lr = />/g, Ae = RegExp(`>|${En}(?:([^\\s"'>=/]+)(${En}*=${En}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), cr = /'/g, dr = /"/g, Ws = /^(?:script|style|textarea|title)$/i, Rl = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), y = Rl(1), qe = /* @__PURE__ */ Symbol.for("lit-noChange"), H = /* @__PURE__ */ Symbol.for("lit-nothing"), ur = /* @__PURE__ */ new WeakMap(), _e = ke.createTreeWalker(ke, 129);
function Vs(t, e) {
  if (!fi(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return or !== void 0 ? or.createHTML(e) : e;
}
const Tl = (t, e) => {
  const n = t.length - 1, i = [];
  let r, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = rt;
  for (let a = 0; a < n; a++) {
    const l = t[a];
    let d, c, f = -1, h = 0;
    for (; h < l.length && (o.lastIndex = h, c = o.exec(l), c !== null); ) h = o.lastIndex, o === rt ? c[1] === "!--" ? o = ar : c[1] !== void 0 ? o = lr : c[2] !== void 0 ? (Ws.test(c[2]) && (r = RegExp("</" + c[2], "g")), o = Ae) : c[3] !== void 0 && (o = Ae) : o === Ae ? c[0] === ">" ? (o = r ?? rt, f = -1) : c[1] === void 0 ? f = -2 : (f = o.lastIndex - c[2].length, d = c[1], o = c[3] === void 0 ? Ae : c[3] === '"' ? dr : cr) : o === dr || o === cr ? o = Ae : o === ar || o === lr ? o = rt : (o = Ae, r = void 0);
    const u = o === Ae && t[a + 1].startsWith("/>") ? " " : "";
    s += o === rt ? l + xl : f >= 0 ? (i.push(d), l.slice(0, f) + Fs + l.slice(f) + pe + u) : l + pe + (f === -2 ? a : u);
  }
  return [Vs(t, s + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
let Wn = class Gs {
  constructor({ strings: e, _$litType$: n }, i) {
    let r;
    this.parts = [];
    let s = 0, o = 0;
    const a = e.length - 1, l = this.parts, [d, c] = Tl(e, n);
    if (this.el = Gs.createElement(d, i), _e.currentNode = this.el.content, n === 2 || n === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (r = _e.nextNode()) !== null && l.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const f of r.getAttributeNames()) if (f.endsWith(Fs)) {
          const h = c[o++], u = r.getAttribute(f).split(pe), g = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: s, name: g[2], strings: u, ctor: g[1] === "." ? Ml : g[1] === "?" ? Il : g[1] === "@" ? Ol : cn }), r.removeAttribute(f);
        } else f.startsWith(pe) && (l.push({ type: 6, index: s }), r.removeAttribute(f));
        if (Ws.test(r.tagName)) {
          const f = r.textContent.split(pe), h = f.length - 1;
          if (h > 0) {
            r.textContent = Lt ? Lt.emptyScript : "";
            for (let u = 0; u < h; u++) r.append(f[u], ut()), _e.nextNode(), l.push({ type: 2, index: ++s });
            r.append(f[h], ut());
          }
        }
      } else if (r.nodeType === 8) if (r.data === js) l.push({ type: 2, index: s });
      else {
        let f = -1;
        for (; (f = r.data.indexOf(pe, f + 1)) !== -1; ) l.push({ type: 7, index: s }), f += pe.length - 1;
      }
      s++;
    }
  }
  static createElement(e, n) {
    const i = ke.createElement("template");
    return i.innerHTML = e, i;
  }
};
function Ye(t, e, n = t, i) {
  if (e === qe) return e;
  let r = i !== void 0 ? n._$Co?.[i] : n._$Cl;
  const s = ht(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== s && (r?._$AO?.(!1), s === void 0 ? r = void 0 : (r = new s(t), r._$AT(t, n, i)), i !== void 0 ? (n._$Co ??= [])[i] = r : n._$Cl = r), r !== void 0 && (e = Ye(t, r._$AS(t, e.values), r, i)), e;
}
class kl {
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
    const { el: { content: n }, parts: i } = this._$AD, r = (e?.creationScope ?? ke).importNode(n, !0);
    _e.currentNode = r;
    let s = _e.nextNode(), o = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let d;
        l.type === 2 ? d = new pi(s, s.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (d = new Nl(s, this, e)), this._$AV.push(d), l = i[++a];
      }
      o !== l?.index && (s = _e.nextNode(), o++);
    }
    return _e.currentNode = ke, r;
  }
  p(e) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, n), n += i.strings.length - 2) : i._$AI(e[n])), n++;
  }
}
let pi = class qs {
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
    e = Ye(this, e, n), ht(e) ? e === H || e == null || e === "" ? (this._$AH !== H && this._$AR(), this._$AH = H) : e !== this._$AH && e !== qe && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : _l(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== H && ht(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ke.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: n, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Wn.createElement(Vs(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(n);
    else {
      const s = new kl(r, this), o = s.u(this.options);
      s.p(n), this.T(o), this._$AH = s;
    }
  }
  _$AC(e) {
    let n = ur.get(e.strings);
    return n === void 0 && ur.set(e.strings, n = new Wn(e)), n;
  }
  k(e) {
    fi(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, r = 0;
    for (const s of e) r === n.length ? n.push(i = new qs(this.O(ut()), this.O(ut()), this, this.options)) : i = n[r], i._$AI(s), r++;
    r < n.length && (this._$AR(i && i._$AB.nextSibling, r), n.length = r);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); e !== this._$AB; ) {
      const i = sr(e).nextSibling;
      sr(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}, cn = class {
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
    if (s === void 0) e = Ye(this, e, n, 0), o = !ht(e) || e !== this._$AH && e !== qe, o && (this._$AH = e);
    else {
      const a = e;
      let l, d;
      for (e = s[0], l = 0; l < s.length - 1; l++) d = Ye(this, a[i + l], n, l), d === qe && (d = this._$AH[l]), o ||= !ht(d) || d !== this._$AH[l], d === H ? e = H : e !== H && (e += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === H ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}, Ml = class extends cn {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === H ? void 0 : e;
  }
}, Il = class extends cn {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== H);
  }
}, Ol = class extends cn {
  constructor(e, n, i, r, s) {
    super(e, n, i, r, s), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = Ye(this, e, n, 0) ?? H) === qe) return;
    const i = this._$AH, r = e === H && i !== H || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== H && (i === H || r);
    r && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}, Nl = class {
  constructor(e, n, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ye(this, e);
  }
};
const $l = hi.litHtmlPolyfillSupport;
$l?.(Wn, pi), (hi.litHtmlVersions ??= []).push("3.3.2");
const Pl = (t, e, n) => {
  const i = n?.renderBefore ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const s = n?.renderBefore ?? null;
    i._$litPart$ = r = new pi(e.insertBefore(ut(), s), s, void 0, n ?? {});
  }
  return r._$AI(t), r;
};
const gi = globalThis;
let ie = class extends Be {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Pl(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return qe;
  }
};
ie._$litElement$ = !0, ie.finalized = !0, gi.litElementHydrateSupport?.({ LitElement: ie });
const Hl = gi.litElementPolyfillSupport;
Hl?.({ LitElement: ie });
(gi.litElementVersions ??= []).push("4.2.2");
const Je = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const zl = { attribute: !0, type: String, converter: Bt, reflect: !1, hasChanged: ui }, Bl = (t = zl, e, n) => {
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
function q(t) {
  return (e, n) => typeof n == "object" ? Bl(t, e, n) : ((i, r, s) => {
    const o = r.hasOwnProperty(s);
    return r.constructor.createProperty(s, i), o ? Object.getOwnPropertyDescriptor(r, s) : void 0;
  })(t, e, n);
}
function R(t) {
  return q({ ...t, state: !0, attribute: !1 });
}
const Ll = (t, e, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, n), n);
function mi(t, e) {
  return (n, i, r) => {
    const s = (o) => o.renderRoot?.querySelector(t) ?? null;
    return Ll(n, i, { get() {
      return s(this);
    } });
  };
}
const Ul = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
function Qe(t) {
  const e = new Date(t);
  return e.setHours(0, 0, 0, 0), e;
}
function Fl(t, e) {
  const n = Math.round(
    (Qe(t).getTime() - Qe(e).getTime()) / 864e5
  );
  return n === 0 ? "Heute" : n === 1 ? "Morgen" : Ul[t.getDay()];
}
function jl(t, e, n) {
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
function Wl(t, e, n = /* @__PURE__ */ new Date()) {
  const i = [];
  for (let r = 0; r < e; r++) {
    const s = Qe(n);
    s.setDate(s.getDate() + r);
    const o = new Date(s);
    o.setDate(o.getDate() + 1);
    const a = t.filter((l) => l.start < o && l.end > s).sort(Vl);
    i.push({ date: s, label: Fl(s, n), entries: a });
  }
  return i;
}
function Vl(t, e) {
  return t.allDay !== e.allDay ? t.allDay ? -1 : 1 : t.start.getTime() - e.start.getTime();
}
function Gl(t, e) {
  if (t.allDay) return "Ganztägig";
  const n = (s) => s.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }), i = Qe(t.start).getTime() === e.getTime(), r = Qe(t.end).getTime() === e.getTime();
  return i && r ? `${n(t.start)} – ${n(t.end)}` : i ? `ab ${n(t.start)}` : r ? `bis ${n(t.end)}` : "Ganztägig";
}
async function Ys(t, e, n, i) {
  const r = encodeURIComponent(n), s = encodeURIComponent(i);
  return t.callApi("GET", `calendars/${e}?start=${r}&end=${s}`);
}
async function ql(t, e, n) {
  await t.callWS({ type: "calendar/event/create", entity_id: e, event: n });
}
async function Qs(t, e, n, i, r = {}) {
  await t.callWS({
    type: "calendar/event/update",
    entity_id: e,
    uid: n,
    ...r,
    event: i
  });
}
async function Yl(t, e, n, i = {}) {
  await t.callWS({
    type: "calendar/event/delete",
    entity_id: e,
    uid: n,
    ...i
  });
}
const Ql = "#0078d4";
function dn(t, e) {
  const n = !!e?.order?.length;
  return (n ? e.order : t?.entities ?? []).map((r) => {
    const s = n ? e?.items?.[r] : void 0;
    return {
      entityId: r,
      name: s?.name ?? "",
      color: s?.color || t?.colors?.[r] || Ql,
      active: s?.active ?? !0
    };
  });
}
function Zs(t) {
  return Object.fromEntries(t.map((e) => [e.entityId, e.color]));
}
function vi(t, e) {
  return e?.order?.length ? e.order.map((n) => {
    const i = e.items?.[n];
    return {
      entity: n,
      ...i?.name ? { name: i.name } : {},
      ...i?.color ? { color: i.color } : {}
    };
  }) : t?.lists ?? [];
}
function Zl(t, e) {
  const n = t?.areas ?? [], i = n.find((r) => !r.disabled && !r.path)?.id ?? "";
  return {
    initial: bi(e?.initialArea, n) || t?.initial || i,
    idle: Kl(t, e, n),
    fullscreen: Xl(t, e, n)
  };
}
function Kl(t, e, n) {
  const i = bi(e?.idleArea, n);
  return !e?.idleAfter || !i ? t?.idle : {
    after: e.idleAfter,
    area: i,
    ...t?.idle?.returnTo ? { returnTo: t.idle.returnTo } : {}
  };
}
function Xl(t, e, n) {
  const i = bi(e?.fullscreenArea, n);
  return !e?.fullscreenAfter || !i ? t?.fullscreen : { after: e.fullscreenAfter, area: i };
}
function bi(t, e) {
  return t && e.some((n) => n.id === t && !n.disabled && !n.path) ? t : "";
}
const un = "#0078d4";
function Jl(t, e, n = un) {
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
function ec(t, e) {
  return t.filter(
    (n) => e.includes(n.extendedProps.entityId)
  );
}
const Ks = "calendar_service_ext", at = {
  photos: {
    folder: "media-source://media_source/local/fotos",
    interval: 30,
    showClock: !0,
    rescanMinutes: 60
  },
  panel: {
    syncedBrowsers: [],
    initialArea: "",
    idleAfter: 0,
    idleArea: "",
    fullscreenArea: "",
    fullscreenAfter: 0
  },
  calendars: { order: [], items: {}, startCompact: !0 },
  tasks: {}
}, tc = {
  order: [],
  items: {},
  title: "",
  showCompleted: !1,
  showDue: !0
};
function Xs(t) {
  return {
    photos: { ...at.photos, ...t?.photos ?? {} },
    panel: { ...at.panel, ...t?.panel ?? {} },
    calendars: { ...at.calendars, ...t?.calendars ?? {} },
    tasks: { ...t?.tasks ?? {} }
  };
}
async function nc(t, e) {
  return Xs(
    await t.callWS({ type: `${Ks}/settings/set`, patch: e })
  );
}
async function hn(t, e) {
  return t.connection.subscribeMessage((i) => e(Xs(i)), {
    type: `${Ks}/settings/subscribe`
  });
}
async function ic(t, e, n) {
  const i = new FormData();
  i.append("media_content_id", e), i.append("file", n);
  const r = await t.fetchWithAuth(
    "/api/media_source/local_source/upload",
    { method: "POST", body: i }
  );
  if (!r.ok)
    throw new Error(`${r.status} ${await r.text()}`);
}
async function rc(t, e) {
  await t.callWS({
    type: "media_source/local_source/remove",
    media_content_id: e
  });
}
class yi {
  constructor(e, n) {
    this.karte = e, this.onChange = n, this.settings = at;
  }
  async start(e) {
    if (!this.unsubscribe)
      try {
        this.unsubscribe = await hn(e, (n) => {
          this.settings = n, this.onChange(n);
        });
      } catch (n) {
        console.warn(`${this.karte}: Einstellungen nicht erreichbar`, n);
      }
  }
  stop() {
    this.unsubscribe?.(), this.unsubscribe = void 0;
  }
}
const sc = G`
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
function oc(t) {
  const e = t[0]?.date.getMonth();
  return t.some((n) => n.date.getMonth() !== e);
}
function ac(t) {
  const e = t.hideEmptyDays ? t.days.filter((n) => n.entries.length > 0) : t.days;
  return y`
    <ha-card>
      <div class="agenda">
        ${e.length === 0 ? y`<p class="empty-all">In den nächsten Tagen steht nichts an.</p>` : e.map((n) => lc(n, oc(e)))}
      </div>
    </ha-card>
  `;
}
function lc(t, e) {
  const n = t.label === "Heute";
  return y`
    <section class="day ${n ? "day--today" : ""}">
      <header class="day-head">
        <span class="day-number">${t.date.getDate()}</span>
        <span class="day-label">${t.label}</span>
        ${e ? y`<span class="day-month">
              ${t.date.toLocaleDateString("de-DE", { month: "short" })}
            </span>` : ""}
      </header>
      ${t.entries.length === 0 ? y`<p class="empty">Keine Termine</p>` : t.entries.map((i) => cc(i, t.date))}
    </section>
  `;
}
function cc(t, e) {
  return y`
    <article class="entry" style="--entry-color: ${t.color}" title=${t.calendarName}>
      <span class="stripe"></span>
      <div class="entry-body">
        <span class="entry-title">${t.summary}</span>
        <span class="entry-meta">
          ${Gl(t, e)}${t.location ? y` · ${t.location}` : ""}
        </span>
      </div>
    </article>
  `;
}
var dc = Object.defineProperty, uc = Object.getOwnPropertyDescriptor, bt = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? uc(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (i ? o(e, n, r) : o(r)) || r);
  return i && r && dc(e, n, r), r;
};
const hc = 7, fc = 500;
let Me = class extends ie {
  constructor() {
    super(...arguments), this.days = [], this.settingsRevision = 0, this.einstellungen = new yi("Family Agenda", () => {
      this.settingsRevision++, this.scheduleLoad();
    }), this.lastSignature = "";
  }
  setConfig(t) {
    if (!t.entities?.length)
      throw new Error("Bitte mindestens eine Kalender-Entität angeben!");
    this.config = t;
  }
  getCardSize() {
    return 8;
  }
  /** Kalender und Farben kommen aus dem Einstellungsbereich, ersatzweise
   *  aus dem Dashboard - dieselbe Auswahl wie in der Kalenderkarte. */
  get kalender() {
    return dn(this.config, this.einstellungen.settings.calendars);
  }
  get kalenderIds() {
    return this.kalender.map((t) => t.entityId);
  }
  get farben() {
    return Zs(this.kalender);
  }
  firstUpdated() {
    this.einstellungen.start(this.hass);
  }
  updated(t) {
    if (!t.has("hass")) return;
    const e = this.kalenderIds.map((n) => this.hass.states[n]?.last_updated ?? "missing").join("|");
    e !== this.lastSignature && (this.lastSignature = e, this.scheduleLoad());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.refreshTimer !== void 0 && (clearTimeout(this.refreshTimer), this.refreshTimer = void 0), this.einstellungen.stop();
  }
  render() {
    return ac({
      days: this.days,
      hideEmptyDays: this.config?.hideEmptyDays ?? !1
    });
  }
  scheduleLoad() {
    this.refreshTimer !== void 0 && clearTimeout(this.refreshTimer), this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = void 0, this.load();
    }, this.config?.refreshDebounceMs ?? fc);
  }
  async load() {
    if (!this.hass || !this.config) return;
    const t = this.config.days ?? hc, e = Qe(/* @__PURE__ */ new Date()), n = new Date(e);
    n.setDate(n.getDate() + t);
    const i = [];
    for (const r of this.kalenderIds)
      try {
        const s = await Ys(
          this.hass,
          r,
          e.toISOString(),
          n.toISOString()
        ), o = this.farben[r] ?? un, a = this.kalender.find((l) => l.entityId === r)?.name || this.hass.states[r]?.attributes?.friendly_name || r;
        i.push(...s.map((l) => jl(l, o, a)));
      } catch (s) {
        console.error("Family Agenda: Laden fehlgeschlagen für", r, s);
      }
    this.days = Wl(i, t);
  }
};
Me.styles = sc;
bt([
  q({ attribute: !1 })
], Me.prototype, "hass", 2);
bt([
  q({ attribute: !1 })
], Me.prototype, "config", 2);
bt([
  R()
], Me.prototype, "days", 2);
bt([
  R()
], Me.prototype, "settingsRevision", 2);
Me = bt([
  Je("family-agenda")
], Me);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-agenda",
  name: "Family Agenda",
  description: "Übersicht der nächsten Tage als Liste, über mehrere Kalender.",
  preview: !1
});
var fn, S, Js, eo, Ze, xe, hr, to, no, Ut = {}, io = [], pc = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function ge(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function ro(t) {
  var e = t.parentNode;
  e && e.removeChild(t);
}
function p(t, e, n) {
  var i, r, s, o = {};
  for (s in e) s == "key" ? i = e[s] : s == "ref" ? r = e[s] : o[s] = e[s];
  if (arguments.length > 2 && (o.children = arguments.length > 3 ? fn.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null) for (s in t.defaultProps) o[s] === void 0 && (o[s] = t.defaultProps[s]);
  return It(t, o, i, r, null);
}
function It(t, e, n, i, r) {
  var s = { type: t, props: e, key: n, ref: i, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: r ?? ++Js };
  return r == null && S.vnode != null && S.vnode(s), s;
}
function F() {
  return { current: null };
}
function M(t) {
  return t.children;
}
function gc(t, e, n, i, r) {
  var s;
  for (s in n) s === "children" || s === "key" || s in e || Ft(t, s, null, n[s], i);
  for (s in e) r && typeof e[s] != "function" || s === "children" || s === "key" || s === "value" || s === "checked" || n[s] === e[s] || Ft(t, s, e[s], n[s], i);
}
function fr(t, e, n) {
  e[0] === "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || pc.test(e) ? n : n + "px";
}
function Ft(t, e, n, i, r) {
  var s;
  e: if (e === "style") if (typeof n == "string") t.style.cssText = n;
  else {
    if (typeof i == "string" && (t.style.cssText = i = ""), i) for (e in i) n && e in n || fr(t.style, e, "");
    if (n) for (e in n) i && n[e] === i[e] || fr(t.style, e, n[e]);
  }
  else if (e[0] === "o" && e[1] === "n") s = e !== (e = e.replace(/Capture$/, "")), e = e.toLowerCase() in t ? e.toLowerCase().slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + s] = n, n ? i || t.addEventListener(e, s ? gr : pr, s) : t.removeEventListener(e, s ? gr : pr, s);
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
function pr(t) {
  Ze = !0;
  try {
    return this.l[t.type + !1](S.event ? S.event(t) : t);
  } finally {
    Ze = !1;
  }
}
function gr(t) {
  Ze = !0;
  try {
    return this.l[t.type + !0](S.event ? S.event(t) : t);
  } finally {
    Ze = !1;
  }
}
function Y(t, e) {
  this.props = t, this.context = e;
}
function ft(t, e) {
  if (e == null) return t.__ ? ft(t.__, t.__.__k.indexOf(t) + 1) : null;
  for (var n; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) return n.__e;
  return typeof t.type == "function" ? ft(t) : null;
}
function so(t) {
  var e, n;
  if ((t = t.__) != null && t.__c != null) {
    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) {
      t.__e = t.__c.base = n.__e;
      break;
    }
    return so(t);
  }
}
function mc(t) {
  Ze ? setTimeout(t) : to(t);
}
function Vn(t) {
  (!t.__d && (t.__d = !0) && xe.push(t) && !jt.__r++ || hr !== S.debounceRendering) && ((hr = S.debounceRendering) || mc)(jt);
}
function jt() {
  var t, e, n, i, r, s, o, a;
  for (xe.sort(function(l, d) {
    return l.__v.__b - d.__v.__b;
  }); t = xe.shift(); ) t.__d && (e = xe.length, i = void 0, r = void 0, o = (s = (n = t).__v).__e, (a = n.__P) && (i = [], (r = ge({}, s)).__v = s.__v + 1, wi(a, s, r, n.__n, a.ownerSVGElement !== void 0, s.__h != null ? [o] : null, i, o ?? ft(s), s.__h), uo(i, s), s.__e != o && so(s)), xe.length > e && xe.sort(function(l, d) {
    return l.__v.__b - d.__v.__b;
  }));
  jt.__r = 0;
}
function oo(t, e, n, i, r, s, o, a, l, d) {
  var c, f, h, u, g, m, b, w = i && i.__k || io, E = w.length;
  for (n.__k = [], c = 0; c < e.length; c++) if ((u = n.__k[c] = (u = e[c]) == null || typeof u == "boolean" ? null : typeof u == "string" || typeof u == "number" || typeof u == "bigint" ? It(null, u, null, null, u) : Array.isArray(u) ? It(M, { children: u }, null, null, null) : u.__b > 0 ? It(u.type, u.props, u.key, u.ref ? u.ref : null, u.__v) : u) != null) {
    if (u.__ = n, u.__b = n.__b + 1, (h = w[c]) === null || h && u.key == h.key && u.type === h.type) w[c] = void 0;
    else for (f = 0; f < E; f++) {
      if ((h = w[f]) && u.key == h.key && u.type === h.type) {
        w[f] = void 0;
        break;
      }
      h = null;
    }
    wi(t, u, h = h || Ut, r, s, o, a, l, d), g = u.__e, (f = u.ref) && h.ref != f && (b || (b = []), h.ref && b.push(h.ref, null, u), b.push(f, u.__c || g, u)), g != null ? (m == null && (m = g), typeof u.type == "function" && u.__k === h.__k ? u.__d = l = ao(u, l, t) : l = lo(t, u, h, w, g, l), typeof n.type == "function" && (n.__d = l)) : l && h.__e == l && l.parentNode != t && (l = ft(h));
  }
  for (n.__e = m, c = E; c--; ) w[c] != null && (typeof n.type == "function" && w[c].__e != null && w[c].__e == n.__d && (n.__d = co(i).nextSibling), fo(w[c], w[c]));
  if (b) for (c = 0; c < b.length; c++) ho(b[c], b[++c], b[++c]);
}
function ao(t, e, n) {
  for (var i, r = t.__k, s = 0; r && s < r.length; s++) (i = r[s]) && (i.__ = t, e = typeof i.type == "function" ? ao(i, e, n) : lo(n, i, i, r, i.__e, e));
  return e;
}
function Wt(t, e) {
  return e = e || [], t == null || typeof t == "boolean" || (Array.isArray(t) ? t.some(function(n) {
    Wt(n, e);
  }) : e.push(t)), e;
}
function lo(t, e, n, i, r, s) {
  var o, a, l;
  if (e.__d !== void 0) o = e.__d, e.__d = void 0;
  else if (n == null || r != s || r.parentNode == null) e: if (s == null || s.parentNode !== t) t.appendChild(r), o = null;
  else {
    for (a = s, l = 0; (a = a.nextSibling) && l < i.length; l += 1) if (a == r) break e;
    t.insertBefore(r, s), o = s;
  }
  return o !== void 0 ? o : r.nextSibling;
}
function co(t) {
  var e, n, i;
  if (t.type == null || typeof t.type == "string") return t.__e;
  if (t.__k) {
    for (e = t.__k.length - 1; e >= 0; e--) if ((n = t.__k[e]) && (i = co(n))) return i;
  }
  return null;
}
function wi(t, e, n, i, r, s, o, a, l) {
  var d, c, f, h, u, g, m, b, w, E, D, C, P, k, O, _ = e.type;
  if (e.constructor !== void 0) return null;
  n.__h != null && (l = n.__h, a = e.__e = n.__e, e.__h = null, s = [a]), (d = S.__b) && d(e);
  try {
    e: if (typeof _ == "function") {
      if (b = e.props, w = (d = _.contextType) && i[d.__c], E = d ? w ? w.props.value : d.__ : i, n.__c ? m = (c = e.__c = n.__c).__ = c.__E : ("prototype" in _ && _.prototype.render ? e.__c = c = new _(b, E) : (e.__c = c = new Y(b, E), c.constructor = _, c.render = bc), w && w.sub(c), c.props = b, c.state || (c.state = {}), c.context = E, c.__n = i, f = c.__d = !0, c.__h = [], c._sb = []), c.__s == null && (c.__s = c.state), _.getDerivedStateFromProps != null && (c.__s == c.state && (c.__s = ge({}, c.__s)), ge(c.__s, _.getDerivedStateFromProps(b, c.__s))), h = c.props, u = c.state, c.__v = e, f) _.getDerivedStateFromProps == null && c.componentWillMount != null && c.componentWillMount(), c.componentDidMount != null && c.__h.push(c.componentDidMount);
      else {
        if (_.getDerivedStateFromProps == null && b !== h && c.componentWillReceiveProps != null && c.componentWillReceiveProps(b, E), !c.__e && c.shouldComponentUpdate != null && c.shouldComponentUpdate(b, c.__s, E) === !1 || e.__v === n.__v) {
          for (e.__v !== n.__v && (c.props = b, c.state = c.__s, c.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.forEach(function(fe) {
            fe && (fe.__ = e);
          }), D = 0; D < c._sb.length; D++) c.__h.push(c._sb[D]);
          c._sb = [], c.__h.length && o.push(c);
          break e;
        }
        c.componentWillUpdate != null && c.componentWillUpdate(b, c.__s, E), c.componentDidUpdate != null && c.__h.push(function() {
          c.componentDidUpdate(h, u, g);
        });
      }
      if (c.context = E, c.props = b, c.__P = t, C = S.__r, P = 0, "prototype" in _ && _.prototype.render) {
        for (c.state = c.__s, c.__d = !1, C && C(e), d = c.render(c.props, c.state, c.context), k = 0; k < c._sb.length; k++) c.__h.push(c._sb[k]);
        c._sb = [];
      } else do
        c.__d = !1, C && C(e), d = c.render(c.props, c.state, c.context), c.state = c.__s;
      while (c.__d && ++P < 25);
      c.state = c.__s, c.getChildContext != null && (i = ge(ge({}, i), c.getChildContext())), f || c.getSnapshotBeforeUpdate == null || (g = c.getSnapshotBeforeUpdate(h, u)), O = d != null && d.type === M && d.key == null ? d.props.children : d, oo(t, Array.isArray(O) ? O : [O], e, n, i, r, s, o, a, l), c.base = e.__e, e.__h = null, c.__h.length && o.push(c), m && (c.__E = c.__ = null), c.__e = !1;
    } else s == null && e.__v === n.__v ? (e.__k = n.__k, e.__e = n.__e) : e.__e = vc(n.__e, e, n, i, r, s, o, l);
    (d = S.diffed) && d(e);
  } catch (fe) {
    e.__v = null, (l || s != null) && (e.__e = a, e.__h = !!l, s[s.indexOf(a)] = null), S.__e(fe, e, n);
  }
}
function uo(t, e) {
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
function vc(t, e, n, i, r, s, o, a) {
  var l, d, c, f = n.props, h = e.props, u = e.type, g = 0;
  if (u === "svg" && (r = !0), s != null) {
    for (; g < s.length; g++) if ((l = s[g]) && "setAttribute" in l == !!u && (u ? l.localName === u : l.nodeType === 3)) {
      t = l, s[g] = null;
      break;
    }
  }
  if (t == null) {
    if (u === null) return document.createTextNode(h);
    t = r ? document.createElementNS("http://www.w3.org/2000/svg", u) : document.createElement(u, h.is && h), s = null, a = !1;
  }
  if (u === null) f === h || a && t.data === h || (t.data = h);
  else {
    if (s = s && fn.call(t.childNodes), d = (f = n.props || Ut).dangerouslySetInnerHTML, c = h.dangerouslySetInnerHTML, !a) {
      if (s != null) for (f = {}, g = 0; g < t.attributes.length; g++) f[t.attributes[g].name] = t.attributes[g].value;
      (c || d) && (c && (d && c.__html == d.__html || c.__html === t.innerHTML) || (t.innerHTML = c && c.__html || ""));
    }
    if (gc(t, h, f, r, a), c) e.__k = [];
    else if (g = e.props.children, oo(t, Array.isArray(g) ? g : [g], e, n, i, r && u !== "foreignObject", s, o, s ? s[0] : n.__k && ft(n, 0), a), s != null) for (g = s.length; g--; ) s[g] != null && ro(s[g]);
    a || ("value" in h && (g = h.value) !== void 0 && (g !== t.value || u === "progress" && !g || u === "option" && g !== f.value) && Ft(t, "value", g, f.value, !1), "checked" in h && (g = h.checked) !== void 0 && g !== t.checked && Ft(t, "checked", g, f.checked, !1));
  }
  return t;
}
function ho(t, e, n) {
  try {
    typeof t == "function" ? t(e) : t.current = e;
  } catch (i) {
    S.__e(i, n);
  }
}
function fo(t, e, n) {
  var i, r;
  if (S.unmount && S.unmount(t), (i = t.ref) && (i.current && i.current !== t.__e || ho(i, null, e)), (i = t.__c) != null) {
    if (i.componentWillUnmount) try {
      i.componentWillUnmount();
    } catch (s) {
      S.__e(s, e);
    }
    i.base = i.__P = null, t.__c = void 0;
  }
  if (i = t.__k) for (r = 0; r < i.length; r++) i[r] && fo(i[r], e, n || typeof t.type != "function");
  n || t.__e == null || ro(t.__e), t.__ = t.__e = t.__d = void 0;
}
function bc(t, e, n) {
  return this.constructor(t, n);
}
function pt(t, e, n) {
  var i, r, s;
  S.__ && S.__(t, e), r = (i = !1) ? null : e.__k, s = [], wi(e, t = e.__k = p(M, null, [t]), r || Ut, Ut, e.ownerSVGElement !== void 0, r ? null : e.firstChild ? fn.call(e.childNodes) : null, s, r ? r.__e : e.firstChild, i), uo(s, t);
}
function yc(t, e) {
  var n = { __c: e = "__cC" + no++, __: t, Consumer: function(i, r) {
    return i.children(r);
  }, Provider: function(i) {
    var r, s;
    return this.getChildContext || (r = [], (s = {})[e] = this, this.getChildContext = function() {
      return s;
    }, this.shouldComponentUpdate = function(o) {
      this.props.value !== o.value && r.some(function(a) {
        a.__e = !0, Vn(a);
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
fn = io.slice, S = { __e: function(t, e, n, i) {
  for (var r, s, o; e = e.__; ) if ((r = e.__c) && !r.__) try {
    if ((s = r.constructor) && s.getDerivedStateFromError != null && (r.setState(s.getDerivedStateFromError(t)), o = r.__d), r.componentDidCatch != null && (r.componentDidCatch(t, i || {}), o = r.__d), o) return r.__E = r;
  } catch (a) {
    t = a;
  }
  throw t;
} }, Js = 0, eo = function(t) {
  return t != null && t.constructor === void 0;
}, Ze = !1, Y.prototype.setState = function(t, e) {
  var n;
  n = this.__s != null && this.__s !== this.state ? this.__s : this.__s = ge({}, this.state), typeof t == "function" && (t = t(ge({}, n), this.props)), t && ge(n, t), t != null && this.__v && (e && this._sb.push(e), Vn(this));
}, Y.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), Vn(this));
}, Y.prototype.render = M, xe = [], to = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, jt.__r = 0, no = 0;
var ne, Sn, mr, po = [], An = [], vr = S.__b, br = S.__r, yr = S.diffed, wr = S.__c, Er = S.unmount;
function wc() {
  for (var t; t = po.shift(); ) if (t.__P && t.__H) try {
    t.__H.__h.forEach(Ot), t.__H.__h.forEach(Gn), t.__H.__h = [];
  } catch (e) {
    t.__H.__h = [], S.__e(e, t.__v);
  }
}
S.__b = function(t) {
  ne = null, vr && vr(t);
}, S.__r = function(t) {
  br && br(t);
  var e = (ne = t.__c).__H;
  e && (Sn === ne ? (e.__h = [], ne.__h = [], e.__.forEach(function(n) {
    n.__N && (n.__ = n.__N), n.__V = An, n.__N = n.i = void 0;
  })) : (e.__h.forEach(Ot), e.__h.forEach(Gn), e.__h = [])), Sn = ne;
}, S.diffed = function(t) {
  yr && yr(t);
  var e = t.__c;
  e && e.__H && (e.__H.__h.length && (po.push(e) !== 1 && mr === S.requestAnimationFrame || ((mr = S.requestAnimationFrame) || Ec)(wc)), e.__H.__.forEach(function(n) {
    n.i && (n.__H = n.i), n.__V !== An && (n.__ = n.__V), n.i = void 0, n.__V = An;
  })), Sn = ne = null;
}, S.__c = function(t, e) {
  e.some(function(n) {
    try {
      n.__h.forEach(Ot), n.__h = n.__h.filter(function(i) {
        return !i.__ || Gn(i);
      });
    } catch (i) {
      e.some(function(r) {
        r.__h && (r.__h = []);
      }), e = [], S.__e(i, n.__v);
    }
  }), wr && wr(t, e);
}, S.unmount = function(t) {
  Er && Er(t);
  var e, n = t.__c;
  n && n.__H && (n.__H.__.forEach(function(i) {
    try {
      Ot(i);
    } catch (r) {
      e = r;
    }
  }), n.__H = void 0, e && S.__e(e, n.__v));
};
var Sr = typeof requestAnimationFrame == "function";
function Ec(t) {
  var e, n = function() {
    clearTimeout(i), Sr && cancelAnimationFrame(e), setTimeout(t);
  }, i = setTimeout(n, 100);
  Sr && (e = requestAnimationFrame(n));
}
function Ot(t) {
  var e = ne, n = t.__c;
  typeof n == "function" && (t.__c = void 0, n()), ne = e;
}
function Gn(t) {
  var e = ne;
  t.__c = t.__(), ne = e;
}
function Sc(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function Ar(t, e) {
  for (var n in t) if (n !== "__source" && !(n in e)) return !0;
  for (var i in e) if (i !== "__source" && t[i] !== e[i]) return !0;
  return !1;
}
function Dr(t) {
  this.props = t;
}
(Dr.prototype = new Y()).isPureReactComponent = !0, Dr.prototype.shouldComponentUpdate = function(t, e) {
  return Ar(this.props, t) || Ar(this.state, e);
};
var Cr = S.__b;
S.__b = function(t) {
  t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), Cr && Cr(t);
};
var Ac = S.__e;
S.__e = function(t, e, n, i) {
  if (t.then) {
    for (var r, s = e; s = s.__; ) if ((r = s.__c) && r.__c) return e.__e == null && (e.__e = n.__e, e.__k = n.__k), r.__c(t, e);
  }
  Ac(t, e, n, i);
};
var xr = S.unmount;
function go(t, e, n) {
  return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(i) {
    typeof i.__c == "function" && i.__c();
  }), t.__c.__H = null), (t = Sc({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c = null), t.__k = t.__k && t.__k.map(function(i) {
    return go(i, e, n);
  })), t;
}
function mo(t, e, n) {
  return t && (t.__v = null, t.__k = t.__k && t.__k.map(function(i) {
    return mo(i, e, n);
  }), t.__c && t.__c.__P === e && (t.__e && n.insertBefore(t.__e, t.__d), t.__c.__e = !0, t.__c.__P = n)), t;
}
function Dn() {
  this.__u = 0, this.t = null, this.__b = null;
}
function vo(t) {
  var e = t.__.__c;
  return e && e.__a && e.__a(t);
}
function St() {
  this.u = null, this.o = null;
}
S.unmount = function(t) {
  var e = t.__c;
  e && e.__R && e.__R(), e && t.__h === !0 && (t.type = null), xr && xr(t);
}, (Dn.prototype = new Y()).__c = function(t, e) {
  var n = e.__c, i = this;
  i.t == null && (i.t = []), i.t.push(n);
  var r = vo(i.__v), s = !1, o = function() {
    s || (s = !0, n.__R = null, r ? r(a) : a());
  };
  n.__R = o;
  var a = function() {
    if (!--i.__u) {
      if (i.state.__a) {
        var d = i.state.__a;
        i.__v.__k[0] = mo(d, d.__c.__P, d.__c.__O);
      }
      var c;
      for (i.setState({ __a: i.__b = null }); c = i.t.pop(); ) c.forceUpdate();
    }
  }, l = e.__h === !0;
  i.__u++ || l || i.setState({ __a: i.__b = i.__v.__k[0] }), t.then(o, o);
}, Dn.prototype.componentWillUnmount = function() {
  this.t = [];
}, Dn.prototype.render = function(t, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), i = this.__v.__k[0].__c;
      this.__v.__k[0] = go(this.__b, n, i.__O = i.__P);
    }
    this.__b = null;
  }
  var r = e.__a && p(M, null, t.fallback);
  return r && (r.__h = null), [p(M, null, e.__a ? null : t.children), r];
};
var _r = function(t, e, n) {
  if (++n[1] === n[0] && t.o.delete(e), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.o.size)) for (n = t.u; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    t.u = n = n[2];
  }
};
function Dc(t) {
  return this.getChildContext = function() {
    return t.context;
  }, t.children;
}
function Cc(t) {
  var e = this, n = t.i;
  e.componentWillUnmount = function() {
    pt(null, e.l), e.l = null, e.i = null;
  }, e.i && e.i !== n && e.componentWillUnmount(), t.__v ? (e.l || (e.i = n, e.l = { nodeType: 1, parentNode: n, childNodes: [], appendChild: function(i) {
    this.childNodes.push(i), e.i.appendChild(i);
  }, insertBefore: function(i, r) {
    this.childNodes.push(i), e.i.appendChild(i);
  }, removeChild: function(i) {
    this.childNodes.splice(this.childNodes.indexOf(i) >>> 1, 1), e.i.removeChild(i);
  } }), pt(p(Dc, { context: e.context }, t.__v), e.l)) : e.l && e.componentWillUnmount();
}
function xc(t, e) {
  var n = p(Cc, { __v: t, i: e });
  return n.containerInfo = e, n;
}
(St.prototype = new Y()).__a = function(t) {
  var e = this, n = vo(e.__v), i = e.o.get(t);
  return i[0]++, function(r) {
    var s = function() {
      e.props.revealOrder ? (i.push(r), _r(e, t, i)) : r();
    };
    n ? n(s) : s();
  };
}, St.prototype.render = function(t) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var e = Wt(t.children);
  t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
  for (var n = e.length; n--; ) this.o.set(e[n], this.u = [1, 0, this.u]);
  return t.children;
}, St.prototype.componentDidUpdate = St.prototype.componentDidMount = function() {
  var t = this;
  this.o.forEach(function(e, n) {
    _r(t, n, e);
  });
};
var _c = typeof Symbol < "u" && Symbol.for && /* @__PURE__ */ Symbol.for("react.element") || 60103, Rc = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Tc = typeof document < "u", kc = function(t) {
  return (typeof Symbol < "u" && typeof /* @__PURE__ */ Symbol() == "symbol" ? /fil|che|rad/i : /fil|che|ra/i).test(t);
};
Y.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
  Object.defineProperty(Y.prototype, t, { configurable: !0, get: function() {
    return this["UNSAFE_" + t];
  }, set: function(e) {
    Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
  } });
});
var Rr = S.event;
function Mc() {
}
function Ic() {
  return this.cancelBubble;
}
function Oc() {
  return this.defaultPrevented;
}
S.event = function(t) {
  return Rr && (t = Rr(t)), t.persist = Mc, t.isPropagationStopped = Ic, t.isDefaultPrevented = Oc, t.nativeEvent = t;
};
var Tr = { configurable: !0, get: function() {
  return this.class;
} }, kr = S.vnode;
S.vnode = function(t) {
  var e = t.type, n = t.props, i = n;
  if (typeof e == "string") {
    var r = e.indexOf("-") === -1;
    for (var s in i = {}, n) {
      var o = n[s];
      Tc && s === "children" && e === "noscript" || s === "value" && "defaultValue" in n && o == null || (s === "defaultValue" && "value" in n && n.value == null ? s = "value" : s === "download" && o === !0 ? o = "" : /ondoubleclick/i.test(s) ? s = "ondblclick" : /^onchange(textarea|input)/i.test(s + e) && !kc(n.type) ? s = "oninput" : /^onfocus$/i.test(s) ? s = "onfocusin" : /^onblur$/i.test(s) ? s = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(s) ? s = s.toLowerCase() : r && Rc.test(s) ? s = s.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : o === null && (o = void 0), /^oninput$/i.test(s) && (s = s.toLowerCase(), i[s] && (s = "oninputCapture")), i[s] = o);
    }
    e == "select" && i.multiple && Array.isArray(i.value) && (i.value = Wt(n.children).forEach(function(a) {
      a.props.selected = i.value.indexOf(a.props.value) != -1;
    })), e == "select" && i.defaultValue != null && (i.value = Wt(n.children).forEach(function(a) {
      a.props.selected = i.multiple ? i.defaultValue.indexOf(a.props.value) != -1 : i.defaultValue == a.props.value;
    })), t.props = i, n.class != n.className && (Tr.enumerable = "className" in n, n.className != null && (i.class = n.className), Object.defineProperty(i, "className", Tr));
  }
  t.$$typeof = _c, kr && kr(t);
};
var Mr = S.__r;
S.__r = function(t) {
  Mr && Mr(t), t.__c;
};
const bo = [], qn = /* @__PURE__ */ new Map();
function Ei(t) {
  bo.push(t), qn.forEach((e) => {
    wo(e, t);
  });
}
function Nc(t) {
  t.isConnected && // sometimes true if SSR system simulates DOM
  t.getRootNode && yo(t.getRootNode());
}
function yo(t) {
  let e = qn.get(t);
  if (!e || !e.isConnected) {
    if (e = t.querySelector("style[data-fullcalendar]"), !e) {
      e = document.createElement("style"), e.setAttribute("data-fullcalendar", "");
      const n = Pc();
      n && (e.nonce = n);
      const i = t === document ? document.head : t, r = t === document ? i.querySelector("script,link[rel=stylesheet],link[as=style],style") : i.firstChild;
      i.insertBefore(e, r);
    }
    qn.set(t, e), $c(e);
  }
}
function $c(t) {
  for (const e of bo)
    wo(t, e);
}
function wo(t, e) {
  const { sheet: n } = t, i = n.cssRules.length;
  e.split("}").forEach((r, s) => {
    r = r.trim(), r && n.insertRule(r + "}", i + s);
  });
}
let Cn;
function Pc() {
  return Cn === void 0 && (Cn = Hc()), Cn;
}
function Hc() {
  const t = document.querySelector('meta[name="csp-nonce"]');
  if (t && t.hasAttribute("content"))
    return t.getAttribute("content");
  const e = document.querySelector("script[nonce]");
  return e && e.nonce || "";
}
typeof document < "u" && yo(document);
var zc = ':root{--fc-small-font-size:.85em;--fc-page-bg-color:#fff;--fc-neutral-bg-color:hsla(0,0%,82%,.3);--fc-neutral-text-color:grey;--fc-border-color:#ddd;--fc-button-text-color:#fff;--fc-button-bg-color:#2c3e50;--fc-button-border-color:#2c3e50;--fc-button-hover-bg-color:#1e2b37;--fc-button-hover-border-color:#1a252f;--fc-button-active-bg-color:#1a252f;--fc-button-active-border-color:#151e27;--fc-event-bg-color:#3788d8;--fc-event-border-color:#3788d8;--fc-event-text-color:#fff;--fc-event-selected-overlay-color:rgba(0,0,0,.25);--fc-more-link-bg-color:#d0d0d0;--fc-more-link-text-color:inherit;--fc-event-resizer-thickness:8px;--fc-event-resizer-dot-total-width:8px;--fc-event-resizer-dot-border-width:1px;--fc-non-business-color:hsla(0,0%,84%,.3);--fc-bg-event-color:#8fdf82;--fc-bg-event-opacity:0.3;--fc-highlight-color:rgba(188,232,241,.3);--fc-today-bg-color:rgba(255,220,40,.15);--fc-now-indicator-color:red}.fc-not-allowed,.fc-not-allowed .fc-event{cursor:not-allowed}.fc{display:flex;flex-direction:column;font-size:1em}.fc,.fc *,.fc :after,.fc :before{box-sizing:border-box}.fc table{border-collapse:collapse;border-spacing:0;font-size:1em}.fc th{text-align:center}.fc td,.fc th{padding:0;vertical-align:top}.fc a[data-navlink]{cursor:pointer}.fc a[data-navlink]:hover{text-decoration:underline}.fc-direction-ltr{direction:ltr;text-align:left}.fc-direction-rtl{direction:rtl;text-align:right}.fc-theme-standard td,.fc-theme-standard th{border:1px solid var(--fc-border-color)}.fc-liquid-hack td,.fc-liquid-hack th{position:relative}@font-face{font-family:fcicons;font-style:normal;font-weight:400;src:url("data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBfAAAAC8AAAAYGNtYXAXVtKNAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZgYydxIAAAF4AAAFNGhlYWQUJ7cIAAAGrAAAADZoaGVhB20DzAAABuQAAAAkaG10eCIABhQAAAcIAAAALGxvY2ED4AU6AAAHNAAAABhtYXhwAA8AjAAAB0wAAAAgbmFtZXsr690AAAdsAAABhnBvc3QAAwAAAAAI9AAAACAAAwPAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpBgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6Qb//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAWIAjQKeAskAEwAAJSc3NjQnJiIHAQYUFwEWMjc2NCcCnuLiDQ0MJAz/AA0NAQAMJAwNDcni4gwjDQwM/wANIwz/AA0NDCMNAAAAAQFiAI0CngLJABMAACUBNjQnASYiBwYUHwEHBhQXFjI3AZ4BAA0N/wAMJAwNDeLiDQ0MJAyNAQAMIw0BAAwMDSMM4uINIwwNDQAAAAIA4gC3Ax4CngATACcAACUnNzY0JyYiDwEGFB8BFjI3NjQnISc3NjQnJiIPAQYUHwEWMjc2NCcB87e3DQ0MIw3VDQ3VDSMMDQ0BK7e3DQ0MJAzVDQ3VDCQMDQ3zuLcMJAwNDdUNIwzWDAwNIwy4twwkDA0N1Q0jDNYMDA0jDAAAAgDiALcDHgKeABMAJwAAJTc2NC8BJiIHBhQfAQcGFBcWMjchNzY0LwEmIgcGFB8BBwYUFxYyNwJJ1Q0N1Q0jDA0Nt7cNDQwjDf7V1Q0N1QwkDA0Nt7cNDQwkDLfWDCMN1Q0NDCQMt7gMIw0MDNYMIw3VDQ0MJAy3uAwjDQwMAAADAFUAAAOrA1UAMwBoAHcAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMhMjY1NCYjISIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAAVYRGRkR/qoRGRkRA1UFBAUOCQkVDAsZDf2rDRkLDBUJCA4FBQUFBQUOCQgVDAsZDQJVDRkLDBUJCQ4FBAVVAgECBQMCBwQECAX9qwQJAwQHAwMFAQICAgIBBQMDBwQDCQQCVQUIBAQHAgMFAgEC/oAZEhEZGRESGQAAAAADAFUAAAOrA1UAMwBoAIkAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMzFRQWMzI2PQEzMjY1NCYrATU0JiMiBh0BIyIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAgBkSEhmAERkZEYAZEhIZgBEZGREDVQUEBQ4JCRUMCxkN/asNGQsMFQkIDgUFBQUFBQ4JCBUMCxkNAlUNGQsMFQkJDgUEBVUCAQIFAwIHBAQIBf2rBAkDBAcDAwUBAgICAgEFAwMHBAMJBAJVBQgEBAcCAwUCAQL+gIASGRkSgBkSERmAEhkZEoAZERIZAAABAOIAjQMeAskAIAAAExcHBhQXFjI/ARcWMjc2NC8BNzY0JyYiDwEnJiIHBhQX4uLiDQ0MJAzi4gwkDA0N4uINDQwkDOLiDCQMDQ0CjeLiDSMMDQ3h4Q0NDCMN4uIMIw0MDOLiDAwNIwwAAAABAAAAAQAAa5n0y18PPPUACwQAAAAAANivOVsAAAAA2K85WwAAAAADqwNVAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAOrAAEAAAAAAAAAAAAAAAAAAAALBAAAAAAAAAAAAAAAAgAAAAQAAWIEAAFiBAAA4gQAAOIEAABVBAAAVQQAAOIAAAAAAAoAFAAeAEQAagCqAOoBngJkApoAAQAAAAsAigADAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGZjaWNvbnMAZgBjAGkAYwBvAG4Ac1ZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGZjaWNvbnMAZgBjAGkAYwBvAG4Ac2ZjaWNvbnMAZgBjAGkAYwBvAG4Ac1JlZ3VsYXIAUgBlAGcAdQBsAGEAcmZjaWNvbnMAZgBjAGkAYwBvAG4Ac0ZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=") format("truetype")}.fc-icon{speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:inline-block;font-family:fcicons!important;font-style:normal;font-variant:normal;font-weight:400;height:1em;line-height:1;text-align:center;text-transform:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:1em}.fc-icon-chevron-left:before{content:"\\e900"}.fc-icon-chevron-right:before{content:"\\e901"}.fc-icon-chevrons-left:before{content:"\\e902"}.fc-icon-chevrons-right:before{content:"\\e903"}.fc-icon-minus-square:before{content:"\\e904"}.fc-icon-plus-square:before{content:"\\e905"}.fc-icon-x:before{content:"\\e906"}.fc .fc-button{border-radius:0;font-family:inherit;font-size:inherit;line-height:inherit;margin:0;overflow:visible;text-transform:none}.fc .fc-button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}.fc .fc-button{-webkit-appearance:button}.fc .fc-button:not(:disabled){cursor:pointer}.fc .fc-button{background-color:transparent;border:1px solid transparent;border-radius:.25em;display:inline-block;font-size:1em;font-weight:400;line-height:1.5;padding:.4em .65em;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle}.fc .fc-button:hover{text-decoration:none}.fc .fc-button:focus{box-shadow:0 0 0 .2rem rgba(44,62,80,.25);outline:0}.fc .fc-button:disabled{opacity:.65}.fc .fc-button-primary{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:hover{background-color:var(--fc-button-hover-bg-color);border-color:var(--fc-button-hover-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:disabled{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button-primary:not(:disabled).fc-button-active,.fc .fc-button-primary:not(:disabled):active{background-color:var(--fc-button-active-bg-color);border-color:var(--fc-button-active-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:not(:disabled).fc-button-active:focus,.fc .fc-button-primary:not(:disabled):active:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button .fc-icon{font-size:1.5em;vertical-align:middle}.fc .fc-button-group{display:inline-flex;position:relative;vertical-align:middle}.fc .fc-button-group>.fc-button{flex:1 1 auto;position:relative}.fc .fc-button-group>.fc-button.fc-button-active,.fc .fc-button-group>.fc-button:active,.fc .fc-button-group>.fc-button:focus,.fc .fc-button-group>.fc-button:hover{z-index:1}.fc-direction-ltr .fc-button-group>.fc-button:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0;margin-left:-1px}.fc-direction-ltr .fc-button-group>.fc-button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.fc-direction-rtl .fc-button-group>.fc-button:not(:first-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.fc-direction-rtl .fc-button-group>.fc-button:not(:last-child){border-bottom-left-radius:0;border-top-left-radius:0}.fc .fc-toolbar{align-items:center;display:flex;justify-content:space-between}.fc .fc-toolbar.fc-header-toolbar{margin-bottom:1.5em}.fc .fc-toolbar.fc-footer-toolbar{margin-top:1.5em}.fc .fc-toolbar-title{font-size:1.75em;margin:0}.fc-direction-ltr .fc-toolbar>*>:not(:first-child){margin-left:.75em}.fc-direction-rtl .fc-toolbar>*>:not(:first-child){margin-right:.75em}.fc-direction-rtl .fc-toolbar-ltr{flex-direction:row-reverse}.fc .fc-scroller{-webkit-overflow-scrolling:touch;position:relative}.fc .fc-scroller-liquid{height:100%}.fc .fc-scroller-liquid-absolute{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-scroller-harness{direction:ltr;overflow:hidden;position:relative}.fc .fc-scroller-harness-liquid{height:100%}.fc-direction-rtl .fc-scroller-harness>.fc-scroller{direction:rtl}.fc-theme-standard .fc-scrollgrid{border:1px solid var(--fc-border-color)}.fc .fc-scrollgrid,.fc .fc-scrollgrid table{table-layout:fixed;width:100%}.fc .fc-scrollgrid table{border-left-style:hidden;border-right-style:hidden;border-top-style:hidden}.fc .fc-scrollgrid{border-bottom-width:0;border-collapse:separate;border-right-width:0}.fc .fc-scrollgrid-liquid{height:100%}.fc .fc-scrollgrid-section,.fc .fc-scrollgrid-section table,.fc .fc-scrollgrid-section>td{height:1px}.fc .fc-scrollgrid-section-liquid>td{height:100%}.fc .fc-scrollgrid-section>*{border-left-width:0;border-top-width:0}.fc .fc-scrollgrid-section-footer>*,.fc .fc-scrollgrid-section-header>*{border-bottom-width:0}.fc .fc-scrollgrid-section-body table,.fc .fc-scrollgrid-section-footer table{border-bottom-style:hidden}.fc .fc-scrollgrid-section-sticky>*{background:var(--fc-page-bg-color);position:sticky;z-index:3}.fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky>*{top:0}.fc .fc-scrollgrid-section-footer.fc-scrollgrid-section-sticky>*{bottom:0}.fc .fc-scrollgrid-sticky-shim{height:1px;margin-bottom:-1px}.fc-sticky{position:sticky}.fc .fc-view-harness{flex-grow:1;position:relative}.fc .fc-view-harness-active>.fc-view{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-col-header-cell-cushion{display:inline-block;padding:2px 4px}.fc .fc-bg-event,.fc .fc-highlight,.fc .fc-non-business{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-non-business{background:var(--fc-non-business-color)}.fc .fc-bg-event{background:var(--fc-bg-event-color);opacity:var(--fc-bg-event-opacity)}.fc .fc-bg-event .fc-event-title{font-size:var(--fc-small-font-size);font-style:italic;margin:.5em}.fc .fc-highlight{background:var(--fc-highlight-color)}.fc .fc-cell-shaded,.fc .fc-day-disabled{background:var(--fc-neutral-bg-color)}a.fc-event,a.fc-event:hover{text-decoration:none}.fc-event.fc-event-draggable,.fc-event[href]{cursor:pointer}.fc-event .fc-event-main{position:relative;z-index:2}.fc-event-dragging:not(.fc-event-selected){opacity:.75}.fc-event-dragging.fc-event-selected{box-shadow:0 2px 7px rgba(0,0,0,.3)}.fc-event .fc-event-resizer{display:none;position:absolute;z-index:4}.fc-event-selected .fc-event-resizer,.fc-event:hover .fc-event-resizer{display:block}.fc-event-selected .fc-event-resizer{background:var(--fc-page-bg-color);border-color:inherit;border-radius:calc(var(--fc-event-resizer-dot-total-width)/2);border-style:solid;border-width:var(--fc-event-resizer-dot-border-width);height:var(--fc-event-resizer-dot-total-width);width:var(--fc-event-resizer-dot-total-width)}.fc-event-selected .fc-event-resizer:before{bottom:-20px;content:"";left:-20px;position:absolute;right:-20px;top:-20px}.fc-event-selected,.fc-event:focus{box-shadow:0 2px 5px rgba(0,0,0,.2)}.fc-event-selected:before,.fc-event:focus:before{bottom:0;content:"";left:0;position:absolute;right:0;top:0;z-index:3}.fc-event-selected:after,.fc-event:focus:after{background:var(--fc-event-selected-overlay-color);bottom:-1px;content:"";left:-1px;position:absolute;right:-1px;top:-1px;z-index:1}.fc-h-event{background-color:var(--fc-event-bg-color);border:1px solid var(--fc-event-border-color);display:block}.fc-h-event .fc-event-main{color:var(--fc-event-text-color)}.fc-h-event .fc-event-main-frame{display:flex}.fc-h-event .fc-event-time{max-width:100%;overflow:hidden}.fc-h-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-width:0}.fc-h-event .fc-event-title{display:inline-block;left:0;max-width:100%;overflow:hidden;right:0;vertical-align:top}.fc-h-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-start),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-end){border-bottom-left-radius:0;border-left-width:0;border-top-left-radius:0}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-end),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-start){border-bottom-right-radius:0;border-right-width:0;border-top-right-radius:0}.fc-h-event:not(.fc-event-selected) .fc-event-resizer{bottom:0;top:0;width:var(--fc-event-resizer-thickness)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end{cursor:w-resize;left:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start{cursor:e-resize;right:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-h-event.fc-event-selected .fc-event-resizer{margin-top:calc(var(--fc-event-resizer-dot-total-width)*-.5);top:50%}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-start,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-end{left:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-end,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-start{right:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc .fc-popover{box-shadow:0 2px 6px rgba(0,0,0,.15);position:absolute;z-index:9999}.fc .fc-popover-header{align-items:center;display:flex;flex-direction:row;justify-content:space-between;padding:3px 4px}.fc .fc-popover-title{margin:0 2px}.fc .fc-popover-close{cursor:pointer;font-size:1.1em;opacity:.65}.fc-theme-standard .fc-popover{background:var(--fc-page-bg-color);border:1px solid var(--fc-border-color)}.fc-theme-standard .fc-popover-header{background:var(--fc-neutral-bg-color)}';
Ei(zc);
class Si {
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
function Ai(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function U(t, e) {
  if (t.closest)
    return t.closest(e);
  if (!document.documentElement.contains(t))
    return null;
  do {
    if (Bc(t, e))
      return t;
    t = t.parentElement || t.parentNode;
  } while (t !== null && t.nodeType === 1);
  return null;
}
function Bc(t, e) {
  return (t.matches || t.matchesSelector || t.msMatchesSelector).call(t, e);
}
function Lc(t, e) {
  let n = t instanceof HTMLElement ? [t] : t, i = [];
  for (let r = 0; r < n.length; r += 1) {
    let s = n[r].querySelectorAll(e);
    for (let o = 0; o < s.length; o += 1)
      i.push(s[o]);
  }
  return i;
}
const Uc = /(top|left|right|bottom|width|height)$/i;
function lt(t, e) {
  for (let n in e)
    Eo(t, n, e[n]);
}
function Eo(t, e, n) {
  n == null ? t.style[e] = "" : typeof n == "number" && Uc.test(e) ? t.style[e] = `${n}px` : t.style[e] = n;
}
function So(t) {
  var e, n;
  return (n = (e = t.composedPath) === null || e === void 0 ? void 0 : e.call(t)[0]) !== null && n !== void 0 ? n : t.target;
}
let Ir = 0;
function pn() {
  return Ir += 1, "fc-dom-" + Ir;
}
function gn(t) {
  t.preventDefault();
}
function Fc(t, e) {
  return (n) => {
    let i = U(n.target, t);
    i && e.call(i, n, i);
  };
}
function Ao(t, e, n, i) {
  let r = Fc(n, i);
  return t.addEventListener(e, r), () => {
    t.removeEventListener(e, r);
  };
}
function jc(t, e, n, i) {
  let r;
  return Ao(t, "mouseover", e, (s, o) => {
    if (o !== r) {
      r = o, n(s, o);
      let a = (l) => {
        r = null, i(l, o), o.removeEventListener("mouseleave", a);
      };
      o.addEventListener("mouseleave", a);
    }
  });
}
const Or = [
  "webkitTransitionEnd",
  "otransitionend",
  "oTransitionEnd",
  "msTransitionEnd",
  "transitionend"
];
function Wc(t, e) {
  let n = (i) => {
    e(i), Or.forEach((r) => {
      t.removeEventListener(r, n);
    });
  };
  Or.forEach((i) => {
    t.addEventListener(i, n);
  });
}
function Do(t) {
  return Object.assign({ onClick: t }, Co(t));
}
function Co(t) {
  return {
    tabIndex: 0,
    onKeyDown(e) {
      (e.key === "Enter" || e.key === " ") && (t(e), e.preventDefault());
    }
  };
}
let Nr = 0;
function $e() {
  return Nr += 1, String(Nr);
}
function Di() {
  document.body.classList.add("fc-not-allowed");
}
function Ci() {
  document.body.classList.remove("fc-not-allowed");
}
function Vc(t) {
  t.style.userSelect = "none", t.style.webkitUserSelect = "none", t.addEventListener("selectstart", gn);
}
function Gc(t) {
  t.style.userSelect = "", t.style.webkitUserSelect = "", t.removeEventListener("selectstart", gn);
}
function qc(t) {
  t.addEventListener("contextmenu", gn);
}
function Yc(t) {
  t.removeEventListener("contextmenu", gn);
}
function Qc(t) {
  let e = [], n = [], i, r;
  for (typeof t == "string" ? n = t.split(/\s*,\s*/) : typeof t == "function" ? n = [t] : Array.isArray(t) && (n = t), i = 0; i < n.length; i += 1)
    r = n[i], typeof r == "string" ? e.push(r.charAt(0) === "-" ? { field: r.substring(1), order: -1 } : { field: r, order: 1 }) : typeof r == "function" && e.push({ func: r });
  return e;
}
function Zc(t, e, n) {
  let i, r;
  for (i = 0; i < n.length; i += 1)
    if (r = Kc(t, e, n[i]), r)
      return r;
  return 0;
}
function Kc(t, e, n) {
  return n.func ? n.func(t, e) : Xc(t[n.field], e[n.field]) * (n.order || 1);
}
function Xc(t, e) {
  return !t && !e ? 0 : e == null ? -1 : t == null ? 1 : typeof t == "string" || typeof e == "string" ? String(t).localeCompare(String(e)) : t - e;
}
function je(t, e) {
  let n = String(t);
  return "000".substr(0, e - n.length) + n;
}
function ct(t, e, n) {
  return typeof t == "function" ? t(...e) : typeof t == "string" ? e.reduce((i, r, s) => i.replace("$" + s, r || ""), t) : n;
}
function Jc(t, e) {
  return t - e;
}
function Nt(t) {
  return t % 1 === 0;
}
function ed(t) {
  let e = t.querySelector(".fc-scrollgrid-shrink-frame"), n = t.querySelector(".fc-scrollgrid-shrink-cushion");
  if (!e)
    throw new Error("needs fc-scrollgrid-shrink-frame className");
  if (!n)
    throw new Error("needs fc-scrollgrid-shrink-cushion className");
  return t.getBoundingClientRect().width - e.getBoundingClientRect().width + // the cell padding+border
  n.getBoundingClientRect().width;
}
const $r = ["years", "months", "days", "milliseconds"], td = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
function x(t, e) {
  return typeof t == "string" ? nd(t) : typeof t == "object" && t ? Pr(t) : typeof t == "number" ? Pr({ [e || "milliseconds"]: t }) : null;
}
function nd(t) {
  let e = td.exec(t);
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
function Pr(t) {
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
function id(t, e) {
  return t.years === e.years && t.months === e.months && t.days === e.days && t.milliseconds === e.milliseconds;
}
function Yn(t, e) {
  return {
    years: t.years + e.years,
    months: t.months + e.months,
    days: t.days + e.days,
    milliseconds: t.milliseconds + e.milliseconds
  };
}
function rd(t, e) {
  return {
    years: t.years - e.years,
    months: t.months - e.months,
    days: t.days - e.days,
    milliseconds: t.milliseconds - e.milliseconds
  };
}
function sd(t, e) {
  return {
    years: t.years * e,
    months: t.months * e,
    days: t.days * e,
    milliseconds: t.milliseconds * e
  };
}
function od(t) {
  return We(t) / 365;
}
function ad(t) {
  return We(t) / 30;
}
function We(t) {
  return J(t) / 864e5;
}
function J(t) {
  return t.years * (365 * 864e5) + t.months * (30 * 864e5) + t.days * 864e5 + t.milliseconds;
}
function xi(t, e) {
  let n = null;
  for (let i = 0; i < $r.length; i += 1) {
    let r = $r[i];
    if (e[r]) {
      let s = t[r] / e[r];
      if (!Nt(s) || n !== null && n !== s)
        return null;
      n = s;
    } else if (t[r])
      return null;
  }
  return n;
}
function Qn(t) {
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
function ye(t, e, n) {
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
const ld = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
function Hr(t, e) {
  let n = me(t);
  return n[2] += e * 7, W(n);
}
function B(t, e) {
  let n = me(t);
  return n[2] += e, W(n);
}
function we(t, e) {
  let n = me(t);
  return n[6] += e, W(n);
}
function cd(t, e) {
  return Pe(t, e) / 7;
}
function Pe(t, e) {
  return (e.valueOf() - t.valueOf()) / (1e3 * 60 * 60 * 24);
}
function dd(t, e) {
  return (e.valueOf() - t.valueOf()) / (1e3 * 60 * 60);
}
function ud(t, e) {
  return (e.valueOf() - t.valueOf()) / (1e3 * 60);
}
function hd(t, e) {
  return (e.valueOf() - t.valueOf()) / 1e3;
}
function fd(t, e) {
  let n = I(t), i = I(e);
  return {
    years: 0,
    months: 0,
    days: Math.round(Pe(n, i)),
    milliseconds: e.valueOf() - i.valueOf() - (t.valueOf() - n.valueOf())
  };
}
function pd(t, e) {
  let n = Vt(t, e);
  return n !== null && n % 7 === 0 ? n / 7 : null;
}
function Vt(t, e) {
  return ve(t) === ve(e) ? Math.round(Pe(t, e)) : null;
}
function I(t) {
  return W([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate()
  ]);
}
function gd(t) {
  return W([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours()
  ]);
}
function md(t) {
  return W([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours(),
    t.getUTCMinutes()
  ]);
}
function vd(t) {
  return W([
    t.getUTCFullYear(),
    t.getUTCMonth(),
    t.getUTCDate(),
    t.getUTCHours(),
    t.getUTCMinutes(),
    t.getUTCSeconds()
  ]);
}
function bd(t, e, n) {
  let i = t.getUTCFullYear(), r = xn(t, i, e, n);
  if (r < 1)
    return xn(t, i - 1, e, n);
  let s = xn(t, i + 1, e, n);
  return s >= 1 ? Math.min(r, s) : r;
}
function xn(t, e, n, i) {
  let r = W([e, 0, 1 + yd(e, n, i)]), s = I(t), o = Math.round(Pe(r, s));
  return Math.floor(o / 7) + 1;
}
function yd(t, e, n) {
  let i = 7 + e - n;
  return -((7 + W([t, 0, i]).getUTCDay() - e) % 7) + i - 1;
}
function zr(t) {
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
function Br(t) {
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
function me(t) {
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
function W(t) {
  return t.length === 1 && (t = t.concat([0])), new Date(Date.UTC(...t));
}
function xo(t) {
  return !isNaN(t.valueOf());
}
function ve(t) {
  return t.getUTCHours() * 1e3 * 60 * 60 + t.getUTCMinutes() * 1e3 * 60 + t.getUTCSeconds() * 1e3 + t.getUTCMilliseconds();
}
function _o(t, e, n = !1) {
  let i = t.toISOString();
  return i = i.replace(".000", ""), n && (i = i.replace("T00:00:00Z", "")), i.length > 10 && (e == null ? i = i.replace("Z", "") : e !== 0 && (i = i.replace("Z", Ri(e, !0)))), i;
}
function _i(t) {
  return t.toISOString().replace(/T.*$/, "");
}
function wd(t) {
  return t.toISOString().match(/^\d{4}-\d{2}/)[0];
}
function Ed(t) {
  return je(t.getUTCHours(), 2) + ":" + je(t.getUTCMinutes(), 2) + ":" + je(t.getUTCSeconds(), 2);
}
function Ri(t, e = !1) {
  let n = t < 0 ? "-" : "+", i = Math.abs(t), r = Math.floor(i / 60), s = Math.round(i % 60);
  return e ? `${n + je(r, 2)}:${je(s, 2)}` : `GMT${n}${r}${s ? `:${je(s, 2)}` : ""}`;
}
function A(t, e, n) {
  let i, r;
  return function(...s) {
    if (!i)
      r = t.apply(this, s);
    else if (!ye(i, s)) {
      let o = t.apply(this, s);
      (!e || !e(o, r)) && (r = o);
    }
    return i = s, r;
  };
}
function $t(t, e, n) {
  let i, r;
  return (s) => (i ? ee(i, s) || (r = t.call(this, s)) : r = t.call(this, s), i = s, r);
}
const _n = {
  week: 3,
  separator: 9,
  omitZeroMinute: 9,
  meridiem: 9,
  omitCommas: 9
}, Gt = {
  timeZoneName: 7,
  era: 6,
  year: 5,
  month: 4,
  day: 2,
  weekday: 2,
  hour: 1,
  minute: 1,
  second: 1
}, At = /\s*([ap])\.?m\.?/i, Sd = /,/g, Ad = /\s+/g, Dd = /\u200e/g, Cd = /UTC|GMT/;
class xd {
  constructor(e) {
    let n = {}, i = {}, r = 9;
    for (let s in e)
      s in _n ? (i[s] = e[s], _n[s] < 9 && (r = Math.min(_n[s], r))) : (n[s] = e[s], s in Gt && (r = Math.min(Gt[s], r)));
    this.standardDateProps = n, this.extendedSettings = i, this.smallestUnitNum = r, this.buildFormattingFunc = A(Lr);
  }
  format(e, n) {
    return this.buildFormattingFunc(this.standardDateProps, this.extendedSettings, n)(e);
  }
  formatRange(e, n, i, r) {
    let { standardDateProps: s, extendedSettings: o } = this, a = Id(e.marker, n.marker, i.calendarSystem);
    if (!a)
      return this.format(e, i);
    let l = a;
    l > 1 && // the two dates are different in a way that's larger scale than time
    (s.year === "numeric" || s.year === "2-digit") && (s.month === "numeric" || s.month === "2-digit") && (s.day === "numeric" || s.day === "2-digit") && (l = 1);
    let d = this.format(e, i), c = this.format(n, i);
    if (d === c)
      return d;
    let f = Od(s, l), h = Lr(f, o, i), u = h(e), g = h(n), m = Nd(d, u, c, g), b = o.separator || r || i.defaultSeparator || "";
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
function Lr(t, e, n) {
  let i = Object.keys(t).length;
  return i === 1 && t.timeZoneName === "short" ? (r) => Ri(r.timeZoneOffset) : i === 0 && e.week ? (r) => Md(n.computeWeekNumber(r.marker), n.weekText, n.weekTextLong, n.locale, e.week) : _d(t, e, n);
}
function _d(t, e, n) {
  t = Object.assign({}, t), e = Object.assign({}, e), Rd(t, e), t.timeZone = "UTC";
  let i = new Intl.DateTimeFormat(n.locale.codes, t), r;
  if (e.omitZeroMinute) {
    let s = Object.assign({}, t);
    delete s.minute, r = new Intl.DateTimeFormat(n.locale.codes, s);
  }
  return (s) => {
    let { marker: o } = s, a;
    r && !o.getUTCMinutes() ? a = r : a = i;
    let l = a.format(o);
    return Td(l, s, t, e, n);
  };
}
function Rd(t, e) {
  t.timeZoneName && (t.hour || (t.hour = "2-digit"), t.minute || (t.minute = "2-digit")), t.timeZoneName === "long" && (t.timeZoneName = "short"), e.omitZeroMinute && (t.second || t.millisecond) && delete e.omitZeroMinute;
}
function Td(t, e, n, i, r) {
  return t = t.replace(Dd, ""), n.timeZoneName === "short" && (t = kd(t, r.timeZone === "UTC" || e.timeZoneOffset == null ? "UTC" : (
    // important to normalize for IE, which does "GMT"
    Ri(e.timeZoneOffset)
  ))), i.omitCommas && (t = t.replace(Sd, "").trim()), i.omitZeroMinute && (t = t.replace(":00", "")), i.meridiem === !1 ? t = t.replace(At, "").trim() : i.meridiem === "narrow" ? t = t.replace(At, (s, o) => o.toLocaleLowerCase()) : i.meridiem === "short" ? t = t.replace(At, (s, o) => `${o.toLocaleLowerCase()}m`) : i.meridiem === "lowercase" && (t = t.replace(At, (s) => s.toLocaleLowerCase())), t = t.replace(Ad, " "), t = t.trim(), t;
}
function kd(t, e) {
  let n = !1;
  return t = t.replace(Cd, () => (n = !0, e)), n || (t += ` ${e}`), t;
}
function Md(t, e, n, i, r) {
  let s = [];
  return r === "long" ? s.push(n) : (r === "short" || r === "narrow") && s.push(e), (r === "long" || r === "short") && s.push(" "), s.push(i.simpleNumberFormat.format(t)), i.options.direction === "rtl" && s.reverse(), s.join("");
}
function Id(t, e, n) {
  return n.getMarkerYear(t) !== n.getMarkerYear(e) ? 5 : n.getMarkerMonth(t) !== n.getMarkerMonth(e) ? 4 : n.getMarkerDay(t) !== n.getMarkerDay(e) ? 2 : ve(t) !== ve(e) ? 1 : 0;
}
function Od(t, e) {
  let n = {};
  for (let i in t)
    (!(i in Gt) || // not a date part prop (like timeZone)
    Gt[i] <= e) && (n[i] = t[i]);
  return n;
}
function Nd(t, e, n, i) {
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
      let f = n.substr(l);
      if (o === c && a === f)
        return {
          before: o,
          after: a
        };
    }
  }
  return null;
}
function Ur(t, e) {
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
function qt(t, e, n, i) {
  let r = Ur(t, n.calendarSystem), s = e ? Ur(e, n.calendarSystem) : null;
  return {
    date: r,
    start: r,
    end: s,
    timeZone: n.timeZone,
    localeCodes: n.locale.codes,
    defaultSeparator: i || n.defaultSeparator
  };
}
class $d {
  constructor(e) {
    this.cmdStr = e;
  }
  format(e, n, i) {
    return n.cmdFormatter(this.cmdStr, qt(e, null, n, i));
  }
  formatRange(e, n, i, r) {
    return i.cmdFormatter(this.cmdStr, qt(e, n, i, r));
  }
}
class Pd {
  constructor(e) {
    this.func = e;
  }
  format(e, n, i) {
    return this.func(qt(e, null, n, i));
  }
  formatRange(e, n, i, r) {
    return this.func(qt(e, n, i, r));
  }
}
function $(t) {
  return typeof t == "object" && t ? new xd(t) : typeof t == "string" ? new $d(t) : typeof t == "function" ? new Pd(t) : null;
}
const Fr = {
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
  dayPopoverFormat: $,
  slotDuration: x,
  snapDuration: x,
  headerToolbar: v,
  footerToolbar: v,
  defaultRangeSeparator: String,
  titleRangeSeparator: String,
  forceEventDuration: Boolean,
  dayHeaders: Boolean,
  dayHeaderFormat: $,
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
  eventOrder: Qc,
  eventOrderStrict: Boolean,
  handleWindowResize: Boolean,
  windowResizeDelay: Number,
  longPressDelay: Number,
  eventDragMinDistance: Number,
  expandRows: Boolean,
  height: v,
  contentHeight: v,
  direction: String,
  weekNumberFormat: $,
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
  eventTimeFormat: $,
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
  monthStartFormat: $,
  // for connectors
  // (can't be part of plugin system b/c must be provided at runtime)
  handleCustomRendering: v,
  customRenderingMetaMap: v,
  customRenderingReplaces: Boolean
}, dt = {
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
}, jr = {
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
}, Wr = {
  buttonText: v,
  buttonHints: v,
  views: v,
  plugins: v,
  initialEvents: v,
  events: v,
  eventSources: v
}, De = {
  headerToolbar: Ce,
  footerToolbar: Ce,
  buttonText: Ce,
  buttonHints: Ce,
  buttonIcons: Ce,
  dateIncrement: Ce,
  plugins: Dt,
  events: Dt,
  eventSources: Dt,
  resources: Dt
};
function Ce(t, e) {
  return typeof t == "object" && typeof e == "object" && t && e ? ee(t, e) : t === e;
}
function Dt(t, e) {
  return Array.isArray(t) && Array.isArray(e) ? ye(t, e) : t === e;
}
const Hd = {
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
function Rn(t) {
  return ki(t, De);
}
function Ti(t, e) {
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
const { hasOwnProperty: Yt } = Object.prototype;
function ki(t, e) {
  let n = {};
  if (e) {
    for (let i in e)
      if (e[i] === Ce) {
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
        r.length && (n[i] = ki(r));
      }
  }
  for (let i = t.length - 1; i >= 0; i -= 1) {
    let r = t[i];
    for (let s in r)
      s in n || (n[s] = r[s]);
  }
  return n;
}
function Ie(t, e) {
  let n = {};
  for (let i in t)
    e(t[i], i) && (n[i] = t[i]);
  return n;
}
function le(t, e) {
  let n = {};
  for (let i in t)
    n[i] = e(t[i], i);
  return n;
}
function Ro(t) {
  let e = {};
  for (let n of t)
    e[n] = !0;
  return e;
}
function Mi(t) {
  let e = [];
  for (let n in t)
    e.push(t[n]);
  return e;
}
function ee(t, e) {
  if (t === e)
    return !0;
  for (let n in t)
    if (Yt.call(t, n) && !(n in e))
      return !1;
  for (let n in e)
    if (Yt.call(e, n) && t[n] !== e[n])
      return !1;
  return !0;
}
const zd = /^on[A-Z]/;
function Bd(t, e) {
  const n = Ld(t, e);
  for (let i of n)
    if (!zd.test(i))
      return !1;
  return !0;
}
function Ld(t, e) {
  let n = [];
  for (let i in t)
    Yt.call(t, i) && (i in e || n.push(i));
  for (let i in e)
    Yt.call(e, i) && t[i] !== e[i] && n.push(i);
  return n;
}
function Tn(t, e, n = {}) {
  if (t === e)
    return !0;
  for (let i in e)
    if (!(i in t && Ud(t[i], e[i], n[i]))) return !1;
  for (let i in t)
    if (!(i in e))
      return !1;
  return !0;
}
function Ud(t, e, n) {
  return t === e || n === !0 ? !0 : n ? n(t, e) : !1;
}
function Fd(t, e = 0, n, i = 1) {
  let r = [];
  n == null && (n = Object.keys(t).length);
  for (let s = e; s < n; s += i) {
    let o = t[s];
    o !== void 0 && r.push(o);
  }
  return r;
}
let To = {};
function jd(t, e) {
  To[t] = e;
}
function Wd(t) {
  return new To[t]();
}
class Vd {
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
    return W(e);
  }
  markerToArray(e) {
    return me(e);
  }
}
jd("gregory", Vd);
const Gd = /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;
function qd(t) {
  let e = Gd.exec(t);
  if (e) {
    let n = new Date(Date.UTC(Number(e[1]), e[3] ? Number(e[3]) - 1 : 0, Number(e[5] || 1), Number(e[7] || 0), Number(e[8] || 0), Number(e[10] || 0), e[12] ? +`0.${e[12]}` * 1e3 : 0));
    if (xo(n)) {
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
class Yd {
  constructor(e) {
    let n = this.timeZone = e.timeZone, i = n !== "local" && n !== "UTC";
    e.namedTimeZoneImpl && i && (this.namedTimeZoneImpl = new e.namedTimeZoneImpl(n)), this.canComputeOffset = !!(!i || this.namedTimeZoneImpl), this.calendarSystem = Wd(e.calendarSystem), this.locale = e.locale, this.weekDow = e.locale.week.dow, this.weekDoy = e.locale.week.doy, e.weekNumberCalculation === "ISO" && (this.weekDow = 1, this.weekDoy = 4), typeof e.firstDay == "number" && (this.weekDow = e.firstDay), typeof e.weekNumberCalculation == "function" && (this.weekNumberFunc = e.weekNumberCalculation), this.weekText = e.weekText != null ? e.weekText : e.locale.options.weekText, this.weekTextLong = (e.weekTextLong != null ? e.weekTextLong : e.locale.options.weekTextLong) || this.weekText, this.cmdFormatter = e.cmdFormatter, this.defaultSeparator = e.defaultSeparator;
  }
  // Creating / Parsing
  createMarker(e) {
    let n = this.createMarkerMeta(e);
    return n === null ? null : n.marker;
  }
  createNowMarker() {
    return this.canComputeOffset ? this.timestampToMarker((/* @__PURE__ */ new Date()).valueOf()) : W(zr(/* @__PURE__ */ new Date()));
  }
  createMarkerMeta(e) {
    if (typeof e == "string")
      return this.parse(e);
    let n = null;
    return typeof e == "number" ? n = this.timestampToMarker(e) : e instanceof Date ? (e = e.valueOf(), isNaN(e) || (n = this.timestampToMarker(e))) : Array.isArray(e) && (n = W(e)), n === null || !xo(n) ? null : { marker: n, isTimeUnspecified: !1, forcedTzo: null };
  }
  parse(e) {
    let n = qd(e);
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
    return ve(e) === ve(n) && i.getMarkerDay(e) === i.getMarkerDay(n) && i.getMarkerMonth(e) === i.getMarkerMonth(n) ? i.getMarkerYear(n) - i.getMarkerYear(e) : null;
  }
  diffWholeMonths(e, n) {
    let { calendarSystem: i } = this;
    return ve(e) === ve(n) && i.getMarkerDay(e) === i.getMarkerDay(n) ? i.getMarkerMonth(n) - i.getMarkerMonth(e) + (i.getMarkerYear(n) - i.getMarkerYear(e)) * 12 : null;
  }
  // Range / Duration
  greatestWholeUnit(e, n) {
    let i = this.diffWholeYears(e, n);
    return i !== null ? { unit: "year", value: i } : (i = this.diffWholeMonths(e, n), i !== null ? { unit: "month", value: i } : (i = pd(e, n), i !== null ? { unit: "week", value: i } : (i = Vt(e, n), i !== null ? { unit: "day", value: i } : (i = dd(e, n), Nt(i) ? { unit: "hour", value: i } : (i = ud(e, n), Nt(i) ? { unit: "minute", value: i } : (i = hd(e, n), Nt(i) ? { unit: "second", value: i } : { unit: "millisecond", value: n.valueOf() - e.valueOf() }))))));
  }
  countDurationsBetween(e, n, i) {
    let r;
    return i.years && (r = this.diffWholeYears(e, n), r !== null) ? r / od(i) : i.months && (r = this.diffWholeMonths(e, n), r !== null) ? r / ad(i) : i.days && (r = Vt(e, n), r !== null) ? r / We(i) : (n.valueOf() - e.valueOf()) / J(i);
  }
  // Start-Of
  // these DON'T return zoned-dates. only UTC start-of dates
  startOf(e, n) {
    return n === "year" ? this.startOfYear(e) : n === "month" ? this.startOfMonth(e) : n === "week" ? this.startOfWeek(e) : n === "day" ? I(e) : n === "hour" ? gd(e) : n === "minute" ? md(e) : n === "second" ? vd(e) : null;
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
    return this.weekNumberFunc ? this.weekNumberFunc(this.toDate(e)) : bd(e, this.weekDow, this.weekDoy);
  }
  // TODO: choke on timeZoneName: long
  format(e, n, i = {}) {
    return n.format({
      marker: e,
      timeZoneOffset: i.forcedTzo != null ? i.forcedTzo : this.offsetForMarker(e)
    }, this);
  }
  formatRange(e, n, i, r = {}) {
    return r.isEndExclusive && (n = we(n, -1)), i.formatRange({
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
    return n.omitTimeZoneOffset || (n.forcedTzo != null ? i = n.forcedTzo : i = this.offsetForMarker(e)), _o(e, i, n.omitTime);
  }
  // TimeZone
  timestampToMarker(e) {
    return this.timeZone === "local" ? W(zr(new Date(e))) : this.timeZone === "UTC" || !this.namedTimeZoneImpl ? new Date(e) : W(this.namedTimeZoneImpl.timestampToArray(e));
  }
  offsetForMarker(e) {
    return this.timeZone === "local" ? -Br(me(e)).getTimezoneOffset() : this.timeZone === "UTC" ? 0 : this.namedTimeZoneImpl ? this.namedTimeZoneImpl.offsetForArray(me(e)) : null;
  }
  // Conversion
  toDate(e, n) {
    return this.timeZone === "local" ? Br(me(e)) : this.timeZone === "UTC" ? new Date(e.valueOf()) : this.namedTimeZoneImpl ? new Date(e.valueOf() - this.namedTimeZoneImpl.offsetForArray(me(e)) * 1e3 * 60) : new Date(e.valueOf() - (n || 0));
  }
}
class yt {
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
yt.prototype.classes = {};
yt.prototype.iconClasses = {};
yt.prototype.baseIconClass = "";
yt.prototype.iconOverridePrefix = "";
function Qt(t) {
  t();
  let e = S.debounceRendering, n = [];
  function i(r) {
    n.push(r);
  }
  for (S.debounceRendering = i, pt(p(Qd, {}), document.createElement("div")); n.length; )
    n.shift()();
  S.debounceRendering = e;
}
class Qd extends Y {
  render() {
    return p("div", {});
  }
  componentDidMount() {
    this.setState({});
  }
}
function ko(t) {
  let e = yc(t), n = e.Provider;
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
class Zd {
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
const de = ko({});
function Kd(t, e, n, i, r, s, o, a, l, d, c, f, h, u) {
  return {
    dateEnv: r,
    nowManager: s,
    options: n,
    pluginHooks: a,
    emitter: c,
    dispatch: l,
    getCurrentData: d,
    calendarApi: f,
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
      return new Zd(g, c, x(n.scrollTime), n.scrollTimeReset);
    },
    registerInteractiveComponent: h,
    unregisterInteractiveComponent: u
  };
}
class He extends Y {
  // debug: boolean
  shouldComponentUpdate(e, n) {
    return !Tn(
      this.props,
      e,
      this.propEquality
      /*, this.debug */
    ) || !Tn(
      this.state,
      n,
      this.stateEquality
      /*, this.debug */
    );
  }
  // HACK for freakin' React StrictMode
  safeSetState(e) {
    Tn(this.state, Object.assign(Object.assign({}, this.state), e), this.stateEquality) || this.setState(e);
  }
}
He.addPropsEquality = Xd;
He.addStateEquality = Jd;
He.contextType = de;
He.prototype.propEquality = {};
He.prototype.stateEquality = {};
class T extends He {
}
T.contextType = de;
function Xd(t) {
  let e = Object.create(this.prototype.propEquality);
  Object.assign(e, t), this.prototype.propEquality = e;
}
function Jd(t) {
  let e = Object.create(this.prototype.stateEquality);
  Object.assign(e, t), this.prototype.stateEquality = e;
}
function re(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
class Ii extends T {
  constructor() {
    super(...arguments), this.id = $e(), this.queuedDomNodes = [], this.currentDomNodes = [], this.handleEl = (e) => {
      const { options: n } = this.context, { generatorName: i } = this.props;
      (!n.customRenderingReplaces || !Zn(i, n)) && this.updateElRef(e);
    }, this.updateElRef = (e) => {
      this.props.elRef && re(this.props.elRef, e);
    };
  }
  render() {
    const { props: e, context: n } = this, { options: i } = n, { customGenerator: r, defaultGenerator: s, renderProps: o } = e, a = Mo(e, [], this.handleEl);
    let l = !1, d, c = [], f;
    if (r != null) {
      const h = typeof r == "function" ? r(o, p) : r;
      if (h === !0)
        l = !0;
      else {
        const u = h && typeof h == "object";
        u && "html" in h ? a.dangerouslySetInnerHTML = { __html: h.html } : u && "domNodes" in h ? c = Array.prototype.slice.call(h.domNodes) : (u ? eo(h) : typeof h != "function") ? d = h : f = h;
      }
    } else
      l = !Zn(e.generatorName, i);
    return l && s && (d = s(o)), this.queuedDomNodes = c, this.currentGeneratorMeta = f, p(e.elTag, a, d);
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
      }, i), { elClasses: (i.elClasses || []).filter(eu) }));
    }
  }
  applyQueueudDomNodes() {
    const { queuedDomNodes: e, currentDomNodes: n } = this, i = this.base;
    if (!ye(e, n)) {
      n.forEach(Ai);
      for (let r of e)
        i.appendChild(r);
      this.currentDomNodes = e;
    }
  }
}
Ii.addPropsEquality({
  elClasses: ye,
  elStyle: ee,
  elAttrs: Bd,
  renderProps: ee
});
function Zn(t, e) {
  var n;
  return !!(e.handleCustomRendering && t && (!((n = e.customRenderingMetaMap) === null || n === void 0) && n[t]));
}
function Mo(t, e, n) {
  const i = Object.assign(Object.assign({}, t.elAttrs), { ref: n });
  return (t.elClasses || e) && (i.className = (t.elClasses || []).concat(e || []).concat(i.className || []).filter(Boolean).join(" ")), t.elStyle && (i.style = t.elStyle), i;
}
function eu(t) {
  return !!t;
}
const Io = ko(0);
class K extends Y {
  constructor() {
    super(...arguments), this.InnerContent = tu.bind(void 0, this), this.handleEl = (e) => {
      this.el = e, this.props.elRef && (re(this.props.elRef, e), e && this.didMountMisfire && this.componentDidMount());
    };
  }
  render() {
    const { props: e } = this, n = nu(e.classNameGenerator, e.renderProps);
    if (e.children) {
      const i = Mo(e, n, this.handleEl), r = e.children(this.InnerContent, e.renderProps, i);
      return e.elTag ? p(e.elTag, i, r) : r;
    } else
      return p(Ii, Object.assign(Object.assign({}, e), { elRef: this.handleEl, elTag: e.elTag || "div", elClasses: (e.elClasses || []).concat(n), renderId: this.context }));
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
K.contextType = Io;
function tu(t, e) {
  const n = t.props;
  return p(Ii, Object.assign({ renderProps: n.renderProps, generatorName: n.generatorName, customGenerator: n.customGenerator, defaultGenerator: n.defaultGenerator, renderId: t.context }, e));
}
function nu(t, e) {
  const n = typeof t == "function" ? t(e) : t || [];
  return typeof n == "string" ? [n] : n;
}
class Zt extends T {
  render() {
    let { props: e, context: n } = this, { options: i } = n, r = { view: n.viewApi };
    return p(K, { elRef: e.elRef, elTag: e.elTag || "div", elAttrs: e.elAttrs, elClasses: [
      ...Oo(e.viewSpec),
      ...e.elClasses || []
    ], elStyle: e.elStyle, renderProps: r, classNameGenerator: i.viewClassNames, generatorName: void 0, didMount: i.viewDidMount, willUnmount: i.viewWillUnmount }, () => e.children);
  }
}
function Oo(t) {
  return [
    `fc-${t.type}-view`,
    "fc-view"
  ];
}
function iu(t, e) {
  let n = null, i = null;
  return t.start && (n = e.createMarker(t.start)), t.end && (i = e.createMarker(t.end)), !n && !i || n && i && i < n ? null : { start: n, end: i };
}
function Vr(t, e) {
  let n = [], { start: i } = e, r, s;
  for (t.sort(ru), r = 0; r < t.length; r += 1)
    s = t[r], s.start > i && n.push({ start: i, end: s.start }), s.end > i && (i = s.end);
  return i < e.end && n.push({ start: i, end: e.end }), n;
}
function ru(t, e) {
  return t.start.valueOf() - e.start.valueOf();
}
function Oe(t, e) {
  let { start: n, end: i } = t, r = null;
  return e.start !== null && (n === null ? n = e.start : n = new Date(Math.max(n.valueOf(), e.start.valueOf()))), e.end != null && (i === null ? i = e.end : i = new Date(Math.min(i.valueOf(), e.end.valueOf()))), (n === null || i === null || n < i) && (r = { start: n, end: i }), r;
}
function su(t, e) {
  return (t.start === null ? null : t.start.valueOf()) === (e.start === null ? null : e.start.valueOf()) && (t.end === null ? null : t.end.valueOf()) === (e.end === null ? null : e.end.valueOf());
}
function Oi(t, e) {
  return (t.end === null || e.start === null || t.end > e.start) && (t.start === null || e.end === null || t.start < e.end);
}
function mn(t, e) {
  return (t.start === null || e.start !== null && e.start >= t.start) && (t.end === null || e.end !== null && e.end <= t.end);
}
function ae(t, e) {
  return (t.start === null || e >= t.start) && (t.end === null || e < t.end);
}
function ou(t, e) {
  return e.start != null && t < e.start ? e.start : e.end != null && t >= e.end ? new Date(e.end.valueOf() - 1) : t;
}
function No(t) {
  let e = Math.floor(Pe(t.start, t.end)) || 1, n = I(t.start), i = B(n, e);
  return { start: n, end: i };
}
function $o(t, e = x(0)) {
  let n = null, i = null;
  if (t.end) {
    i = I(t.end);
    let r = t.end.valueOf() - i.valueOf();
    r && r >= J(e) && (i = B(i, 1));
  }
  return t.start && (n = I(t.start), i && i <= n && (i = B(n, 1))), { start: n, end: i };
}
function Ue(t, e, n, i) {
  return i === "year" ? x(n.diffWholeYears(t, e), "year") : i === "month" ? x(n.diffWholeMonths(t, e), "month") : fd(t, e);
}
class Po {
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
    return s = this.buildValidRange(), s = this.trimHiddenDays(s), i && (e = ou(e, s)), o = this.buildCurrentRangeInfo(e, n), a = /^(year|month|week|day)$/.test(o.unit), l = this.buildRenderRange(this.trimHiddenDays(o.range), o.unit, a), l = this.trimHiddenDays(l), d = l, r.showNonCurrentDates || (d = Oe(d, o.range)), d = this.adjustActiveRange(d), d = Oe(d, s), c = Oi(o.range, s), ae(l, e) || (e = l.start), {
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
    return i.duration ? (r = i.duration, s = i.durationUnit, o = this.buildRangeFromDuration(e, n, r, s)) : (a = this.props.dayCount) ? (s = "day", o = this.buildRangeFromDayCount(e, n, a)) : (o = this.buildCustomVisibleRange(e)) ? s = i.dateEnv.greatestWholeUnit(o.start, o.end).unit : (r = this.getFallbackDuration(), s = Qn(r).unit, o = this.buildRangeFromDuration(e, n, r, s)), { duration: r, unit: s, range: o };
  }
  getFallbackDuration() {
    return x({ day: 1 });
  }
  // Returns a new activeRange to have time values (un-ambiguate)
  // slotMinTime or slotMaxTime causes the range to expand.
  adjustActiveRange(e) {
    let { dateEnv: n, usesMinMaxTime: i, slotMinTime: r, slotMaxTime: s } = this.props, { start: o, end: a } = e;
    return i && (We(r) < 0 && (o = I(o), o = n.add(o, r)), We(s) > 1 && (a = I(a), a = B(a, -1), a = n.add(a, s))), { start: o, end: a };
  }
  // Builds the "current" range when it is specified as an explicit duration.
  // `unit` is the already-computed greatestDurationDenominator unit of duration.
  buildRangeFromDuration(e, n, i, r) {
    let { dateEnv: s, dateAlignment: o } = this.props, a, l, d;
    if (!o) {
      let { dateIncrement: f } = this.props;
      f && J(f) < J(i) ? o = Qn(f).unit : o = r;
    }
    We(i) <= 1 && this.isHiddenDay(a) && (a = this.skipHiddenDays(a, n), a = I(a));
    function c() {
      a = s.startOf(e, o), l = s.add(a, i), d = { start: a, end: l };
    }
    return c(), this.trimHiddenDays(d) || (e = this.skipHiddenDays(e, n), c()), d;
  }
  // Builds the "current" range when a dayCount is specified.
  buildRangeFromDayCount(e, n, i) {
    let { dateEnv: r, dateAlignment: s } = this.props, o = 0, a = e, l;
    s && (a = r.startOf(a, s)), a = I(a), a = this.skipHiddenDays(a, n), l = a;
    do
      l = B(l, 1), this.isHiddenDay(l) || (o += 1);
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
      let n = iu(e, this.props.dateEnv);
      return n && (n = $o(n)), n;
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
      e = B(e, n);
    return e;
  }
}
function Ni(t, e, n, i) {
  return {
    instanceId: $e(),
    defId: t,
    range: e,
    forcedStartTzo: n ?? null,
    forcedEndTzo: i ?? null
  };
}
function au(t, e, n, i) {
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
function Ne(t, e, n) {
  let { dateEnv: i, pluginHooks: r, options: s } = n, { defs: o, instances: a } = t;
  a = Ie(a, (l) => !o[l.defId].recurringDef);
  for (let l in o) {
    let d = o[l];
    if (d.recurringDef) {
      let { duration: c } = d.recurringDef;
      c || (c = d.allDay ? s.defaultAllDayEventDuration : s.defaultTimedEventDuration);
      let f = lu(d, c, e, i, r.recurringTypes);
      for (let h of f) {
        let u = Ni(l, {
          start: h,
          end: i.add(h, c)
        });
        a[u.instanceId] = u;
      }
    }
  }
  return { defs: o, instances: a };
}
function lu(t, e, n, i, r) {
  let o = r[t.recurringDef.typeId].expand(t.recurringDef.typeData, {
    start: i.subtract(n.start, e),
    end: n.end
  }, i);
  return t.allDay && (o = o.map(I)), o;
}
const Pt = {
  id: String,
  groupId: String,
  title: String,
  url: String,
  interactive: Boolean
}, Ho = {
  start: v,
  end: v,
  date: v,
  allDay: Boolean
}, cu = Object.assign(Object.assign(Object.assign({}, Pt), Ho), { extendedProps: v });
function zo(t, e, n, i, r = $i(n), s, o) {
  let { refined: a, extra: l } = Bo(t, n, r), d = uu(e, n), c = au(a, d, n.dateEnv, n.pluginHooks.recurringTypes);
  if (c) {
    let h = Kn(a, l, e ? e.sourceId : "", c.allDay, !!c.duration, n, s);
    return h.recurringDef = {
      typeId: c.typeId,
      typeData: c.typeData,
      duration: c.duration
    }, { def: h, instance: null };
  }
  let f = du(a, d, n, i);
  if (f) {
    let h = Kn(a, l, e ? e.sourceId : "", f.allDay, f.hasEnd, n, s), u = Ni(h.defId, f.range, f.forcedStartTzo, f.forcedEndTzo);
    return o && h.publicId && o[h.publicId] && (u.instanceId = o[h.publicId]), { def: h, instance: u };
  }
  return null;
}
function Bo(t, e, n = $i(e)) {
  return Ti(t, n);
}
function $i(t) {
  return Object.assign(Object.assign(Object.assign({}, Kt), cu), t.pluginHooks.eventRefiners);
}
function Kn(t, e, n, i, r, s, o) {
  let a = {
    title: t.title || "",
    groupId: t.groupId || "",
    publicId: t.id || "",
    url: t.url || "",
    recurringDef: null,
    defId: (o && t.id ? o[t.id] : "") || $e(),
    sourceId: n,
    allDay: i,
    hasEnd: r,
    interactive: t.interactive,
    ui: Xt(t, s),
    extendedProps: Object.assign(Object.assign({}, t.extendedProps || {}), e)
  };
  for (let l of s.pluginHooks.eventDefMemberAdders)
    Object.assign(a, l(t));
  return Object.freeze(a.ui.classNames), Object.freeze(a.extendedProps), a;
}
function du(t, e, n, i) {
  let { allDay: r } = t, s, o = null, a = !1, l, d = null, c = t.start != null ? t.start : t.date;
  if (s = n.dateEnv.createMarkerMeta(c), s)
    o = s.marker;
  else if (!i)
    return null;
  return t.end != null && (l = n.dateEnv.createMarkerMeta(t.end)), r == null && (e != null ? r = e : r = (!s || s.isTimeUnspecified) && (!l || l.isTimeUnspecified)), r && o && (o = I(o)), l && (d = l.marker, r && (d = I(d)), o && d <= o && (d = null)), d ? a = !0 : i || (a = n.options.forceEventDuration || !1, d = n.dateEnv.add(o, r ? n.options.defaultAllDayEventDuration : n.options.defaultTimedEventDuration)), {
    allDay: r,
    hasEnd: a,
    range: { start: o, end: d },
    forcedStartTzo: s ? s.forcedTzo : null,
    forcedEndTzo: l ? l.forcedTzo : null
  };
}
function uu(t, e) {
  let n = null;
  return t && (n = t.defaultAllDay), n == null && (n = e.options.defaultAllDay), n;
}
function gt(t, e, n, i, r, s) {
  let o = Q(), a = $i(n);
  for (let l of t) {
    let d = zo(l, e, n, i, a, r, s);
    d && Xn(d, o);
  }
  return o;
}
function Xn(t, e = Q()) {
  return e.defs[t.def.defId] = t.def, t.instance && (e.instances[t.instance.instanceId] = t.instance), e;
}
function Pi(t, e) {
  let n = t.instances[e];
  if (n) {
    let i = t.defs[n.defId], r = vn(t, (s) => hu(i, s));
    return r.defs[i.defId] = i, r.instances[n.instanceId] = n, r;
  }
  return Q();
}
function hu(t, e) {
  return !!(t.groupId && t.groupId === e.groupId);
}
function Q() {
  return { defs: {}, instances: {} };
}
function Hi(t, e) {
  return {
    defs: Object.assign(Object.assign({}, t.defs), e.defs),
    instances: Object.assign(Object.assign({}, t.instances), e.instances)
  };
}
function vn(t, e) {
  let n = Ie(t.defs, e), i = Ie(t.instances, (r) => n[r.defId]);
  return { defs: n, instances: i };
}
function fu(t, e) {
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
function pu(t, e) {
  return Array.isArray(t) ? gt(t, null, e, !0) : typeof t == "object" && t ? gt([t], null, e, !0) : t != null ? String(t) : null;
}
function Gr(t) {
  return Array.isArray(t) ? t : typeof t == "string" ? t.split(/\s+/) : [];
}
const Kt = {
  display: String,
  editable: Boolean,
  startEditable: Boolean,
  durationEditable: Boolean,
  constraint: v,
  overlap: v,
  allow: v,
  className: Gr,
  classNames: Gr,
  color: String,
  backgroundColor: String,
  borderColor: String,
  textColor: String
}, gu = {
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
function Xt(t, e) {
  let n = pu(t.constraint, e);
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
function Lo(t) {
  return t.reduce(mu, gu);
}
function mu(t, e) {
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
const vu = {
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
function Uo(t, e, n = Fo(e)) {
  let i;
  if (typeof t == "string" ? i = { url: t } : typeof t == "function" || Array.isArray(t) ? i = { events: t } : typeof t == "object" && t && (i = t), i) {
    let { refined: r, extra: s } = Ti(i, n), o = bu(r, e);
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
        sourceId: $e(),
        sourceDefId: o.sourceDefId,
        meta: o.meta,
        ui: Xt(r, e),
        extendedProps: s
      };
  }
  return null;
}
function Fo(t) {
  return Object.assign(Object.assign(Object.assign({}, Kt), vu), t.pluginHooks.eventSourceRefiners);
}
function bu(t, e) {
  let n = e.pluginHooks.eventSourceDefs;
  for (let i = n.length - 1; i >= 0; i -= 1) {
    let s = n[i].parseMeta(t);
    if (s)
      return { sourceDefId: i, meta: s };
  }
  return null;
}
function yu(t, e, n, i, r) {
  switch (e.type) {
    case "RECEIVE_EVENTS":
      return wu(t, n[e.sourceId], e.fetchId, e.fetchRange, e.rawEvents, r);
    case "RESET_RAW_EVENTS":
      return Eu(t, n[e.sourceId], e.rawEvents, i.activeRange, r);
    case "ADD_EVENTS":
      return Su(
        t,
        e.eventStore,
        // new ones
        i ? i.activeRange : null,
        r
      );
    case "RESET_EVENTS":
      return e.eventStore;
    case "MERGE_EVENTS":
      return Hi(t, e.eventStore);
    case "PREV":
    // TODO: how do we track all actions that affect dateProfile :(
    case "NEXT":
    case "CHANGE_DATE":
    case "CHANGE_VIEW_TYPE":
      return i ? Ne(t, i.activeRange, r) : t;
    case "REMOVE_EVENTS":
      return fu(t, e.eventStore);
    case "REMOVE_EVENT_SOURCE":
      return Wo(t, e.sourceId);
    case "REMOVE_ALL_EVENT_SOURCES":
      return vn(t, (s) => !s.sourceId);
    case "REMOVE_ALL_EVENTS":
      return Q();
    default:
      return t;
  }
}
function wu(t, e, n, i, r, s) {
  if (e && // not already removed
  n === e.latestFetchId) {
    let o = gt(jo(r, e, s), e, s);
    return i && (o = Ne(o, i, s)), Hi(Wo(t, e.sourceId), o);
  }
  return t;
}
function Eu(t, e, n, i, r) {
  const { defIdMap: s, instanceIdMap: o } = Du(t);
  let a = gt(jo(n, e, r), e, r, !1, s, o);
  return Ne(a, i, r);
}
function jo(t, e, n) {
  let i = n.options.eventDataTransform, r = e ? e.eventDataTransform : null;
  return r && (t = qr(t, r)), i && (t = qr(t, i)), t;
}
function qr(t, e) {
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
function Su(t, e, n, i) {
  return n && (e = Ne(e, n, i)), Hi(t, e);
}
function Yr(t, e, n) {
  let { defs: i } = t, r = le(t.instances, (s) => i[s.defId].allDay ? s : Object.assign(Object.assign({}, s), { range: {
    start: n.createMarker(e.toDate(s.range.start, s.forcedStartTzo)),
    end: n.createMarker(e.toDate(s.range.end, s.forcedEndTzo))
  }, forcedStartTzo: n.canComputeOffset ? null : s.forcedStartTzo, forcedEndTzo: n.canComputeOffset ? null : s.forcedEndTzo }));
  return { defs: i, instances: r };
}
function Wo(t, e) {
  return vn(t, (n) => n.sourceId !== e);
}
function Au(t, e) {
  return {
    defs: t.defs,
    instances: Ie(t.instances, (n) => !e[n.instanceId])
  };
}
function Du(t) {
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
class bn {
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
    Cu(this.handlers, e, n);
  }
  off(e, n) {
    xu(this.handlers, e, n);
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
function Cu(t, e, n) {
  (t[e] || (t[e] = [])).push(n);
}
function xu(t, e, n) {
  n ? t[e] && (t[e] = t[e].filter((i) => i !== n)) : delete t[e];
}
const _u = {
  startTime: "09:00",
  endTime: "17:00",
  daysOfWeek: [1, 2, 3, 4, 5],
  display: "inverse-background",
  classNames: "fc-non-business",
  groupId: "_businessHours"
  // so multiple defs get grouped
};
function Ru(t, e) {
  return gt(Tu(t), null, e);
}
function Tu(t) {
  let e;
  return t === !0 ? e = [{}] : Array.isArray(t) ? e = t.filter((n) => n.daysOfWeek) : typeof t == "object" && t ? e = [t] : e = [], e = e.map((n) => Object.assign(Object.assign({}, _u), n)), e;
}
function Vo(t, e, n) {
  n.emitter.trigger("select", Object.assign(Object.assign({}, zi(t, n)), { jsEvent: e ? e.origEvent : null, view: n.viewApi || n.calendarApi.view }));
}
function ku(t, e) {
  e.emitter.trigger("unselect", {
    jsEvent: t ? t.origEvent : null,
    view: e.viewApi || e.calendarApi.view
  });
}
function zi(t, e) {
  let n = {};
  for (let i of e.pluginHooks.dateSpanTransforms)
    Object.assign(n, i(t, e));
  return Object.assign(n, Wu(t, e.dateEnv)), n;
}
function Qr(t, e, n) {
  let { dateEnv: i, options: r } = n, s = e;
  return t ? (s = I(s), s = i.add(s, r.defaultAllDayEventDuration)) : s = i.add(s, r.defaultTimedEventDuration), s;
}
function Bi(t, e, n, i) {
  let r = Jt(t.defs, e), s = Q();
  for (let o in t.defs) {
    let a = t.defs[o];
    s.defs[o] = Mu(a, r[o], n, i);
  }
  for (let o in t.instances) {
    let a = t.instances[o], l = s.defs[a.defId];
    s.instances[o] = Iu(a, l, r[a.defId], n, i);
  }
  return s;
}
function Mu(t, e, n, i) {
  let r = n.standardProps || {};
  r.hasEnd == null && e.durationEditable && (n.startDelta || n.endDelta) && (r.hasEnd = !0);
  let s = Object.assign(Object.assign(Object.assign({}, t), r), { ui: Object.assign(Object.assign({}, t.ui), r.ui) });
  n.extendedProps && (s.extendedProps = Object.assign(Object.assign({}, s.extendedProps), n.extendedProps));
  for (let o of i.pluginHooks.eventDefMutationAppliers)
    o(s, n, i);
  return !s.hasEnd && i.options.forceEventDuration && (s.hasEnd = !0), s;
}
function Iu(t, e, n, i, r) {
  let { dateEnv: s } = r, o = i.standardProps && i.standardProps.allDay === !0, a = i.standardProps && i.standardProps.hasEnd === !1, l = Object.assign({}, t);
  return o && (l.range = No(l.range)), i.datesDelta && n.startEditable && (l.range = {
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
    end: Qr(e.allDay, l.range.start, r)
  }), e.allDay && (l.range = {
    start: I(l.range.start),
    end: I(l.range.end)
  }), l.range.end < l.range.start && (l.range.end = Qr(e.allDay, l.range.start, r)), l;
}
class Le {
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
    if (e in Ho)
      console.warn("Could not set date-related prop 'name'. Use one of the date-related methods instead.");
    else if (e === "id")
      n = Pt[e](n), this.mutate({
        standardProps: { publicId: n }
        // hardcoded internal name
      });
    else if (e in Pt)
      n = Pt[e](n), this.mutate({
        standardProps: { [e]: n }
      });
    else if (e in Kt) {
      let i = Kt[e](n);
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
      let s = this._instance.range, o = Ue(s.start, r, i, n.granularity);
      n.maintainDuration ? this.mutate({ datesDelta: o }) : this.mutate({ startDelta: o });
    }
  }
  setEnd(e, n = {}) {
    let { dateEnv: i } = this._context, r;
    if (!(e != null && (r = i.createMarker(e), !r)) && this._instance)
      if (r) {
        let s = Ue(this._instance.range.end, r, i, n.granularity);
        this.mutate({ endDelta: s });
      } else
        this.mutate({ standardProps: { hasEnd: !1 } });
  }
  setDates(e, n, i = {}) {
    let { dateEnv: r } = this._context, s = { allDay: i.allDay }, o = r.createMarker(e), a;
    if (o && !(n != null && (a = r.createMarker(n), !a)) && this._instance) {
      let l = this._instance.range;
      i.allDay === !0 && (l = No(l));
      let d = Ue(l.start, o, r, i.granularity);
      if (a) {
        let c = Ue(l.end, a, r, i.granularity);
        id(d, c) ? this.mutate({ datesDelta: d, standardProps: s }) : this.mutate({ startDelta: d, endDelta: c, standardProps: s });
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
    let { dateEnv: n } = this._context, i = this._instance, r = $(e);
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
      let i = this._def, r = this._context, { eventStore: s } = r.getCurrentData(), o = Pi(s, n.instanceId);
      o = Bi(o, {
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
        relatedEvents: Re(o, r, n),
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
    let e = this._context, n = Go(this);
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
    return e ? new Le(this._context, this._context.getCurrentData().eventSources[e]) : null;
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
function Go(t) {
  let e = t._def, n = t._instance;
  return {
    defs: { [e.defId]: e },
    instances: n ? { [n.instanceId]: n } : {}
  };
}
function Re(t, e, n) {
  let { defs: i, instances: r } = t, s = [], o = n ? n.instanceId : "";
  for (let a in r) {
    let l = r[a], d = i[l.defId];
    l.instanceId !== o && s.push(new N(e, d, l));
  }
  return s;
}
function Zr(t, e, n, i) {
  let r = {}, s = {}, o = {}, a = [], l = [], d = Jt(t.defs, e);
  for (let c in t.defs) {
    let f = t.defs[c];
    d[f.defId].display === "inverse-background" && (f.groupId ? (r[f.groupId] = [], o[f.groupId] || (o[f.groupId] = f)) : s[c] = []);
  }
  for (let c in t.instances) {
    let f = t.instances[c], h = t.defs[f.defId], u = d[h.defId], g = f.range, m = !h.allDay && i ? $o(g, i) : g, b = Oe(m, n);
    b && (u.display === "inverse-background" ? h.groupId ? r[h.groupId].push(b) : s[f.defId].push(b) : u.display !== "none" && (u.display === "background" ? a : l).push({
      def: h,
      ui: u,
      instance: f,
      range: b,
      isStart: m.start && m.start.valueOf() === b.start.valueOf(),
      isEnd: m.end && m.end.valueOf() === b.end.valueOf()
    }));
  }
  for (let c in r) {
    let f = r[c], h = Vr(f, n);
    for (let u of h) {
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
    let f = s[c], h = Vr(f, n);
    for (let u of h)
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
function Ou(t) {
  return t.ui.display === "background" || t.ui.display === "inverse-background";
}
function Kr(t, e) {
  t.fcSeg = e;
}
function Ke(t) {
  return t.fcSeg || t.parentNode.fcSeg || // for the harness
  null;
}
function Jt(t, e) {
  return le(t, (n) => qo(n, e));
}
function qo(t, e) {
  let n = [];
  return e[""] && n.push(e[""]), e[t.defId] && n.push(e[t.defId]), n.push(t.ui), Lo(n);
}
function Yo(t, e) {
  let n = t.map(Nu);
  return n.sort((i, r) => Zc(i, r, e)), n.map((i) => i._seg);
}
function Nu(t) {
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
function $u(t, e) {
  let { pluginHooks: n } = e, i = n.isDraggableTransformers, { def: r, ui: s } = t.eventRange, o = s.startEditable;
  for (let a of i)
    o = a(o, r, s, e);
  return o;
}
function Pu(t, e) {
  return t.isStart && t.eventRange.ui.durationEditable && e.options.eventResizableFromStart;
}
function Hu(t, e) {
  return t.isEnd && t.eventRange.ui.durationEditable;
}
function Qo(t, e, n, i, r, s, o) {
  let { dateEnv: a, options: l } = n, { displayEventTime: d, displayEventEnd: c } = l, f = t.eventRange.def, h = t.eventRange.instance;
  d == null && (d = i !== !1), c == null && (c = r !== !1);
  let u = h.range.start, g = h.range.end, m = t.start || t.eventRange.range.start, b = t.end || t.eventRange.range.end, w = I(u).valueOf() === I(m).valueOf(), E = I(we(g, -1)).valueOf() === I(we(b, -1)).valueOf();
  return d && !f.allDay && (w || E) ? (m = w ? u : m, b = E ? g : b, c && f.hasEnd ? a.formatRange(m, b, e, {
    forcedStartTzo: h.forcedStartTzo,
    forcedEndTzo: h.forcedEndTzo
  }) : a.format(m, e, {
    forcedTzo: h.forcedStartTzo
    // nooooo, same
  })) : "";
}
function be(t, e, n) {
  let i = t.eventRange.range;
  return {
    isPast: i.end <= (n || e.start),
    isFuture: i.start >= (n || e.end),
    isToday: e && ae(e, i.start)
  };
}
function zu(t) {
  let e = ["fc-event"];
  return t.isMirror && e.push("fc-event-mirror"), t.isDraggable && e.push("fc-event-draggable"), (t.isStartResizable || t.isEndResizable) && e.push("fc-event-resizable"), t.isDragging && e.push("fc-event-dragging"), t.isResizing && e.push("fc-event-resizing"), t.isSelected && e.push("fc-event-selected"), t.isStart && e.push("fc-event-start"), t.isEnd && e.push("fc-event-end"), t.isPast && e.push("fc-event-past"), t.isToday && e.push("fc-event-today"), t.isFuture && e.push("fc-event-future"), e;
}
function Zo(t) {
  return t.instance ? t.instance.instanceId : `${t.def.defId}:${t.range.start.toISOString()}`;
}
function Ko(t, e) {
  let { def: n, instance: i } = t.eventRange, { url: r } = n;
  if (r)
    return { href: r };
  let { emitter: s, options: o } = e, { eventInteractive: a } = o;
  return a == null && (a = n.interactive, a == null && (a = !!s.hasHandlers("eventClick"))), a ? Co((l) => {
    s.trigger("eventClick", {
      el: l.target,
      event: new N(e, n, i),
      jsEvent: l,
      view: e.viewApi
    });
  }) : {};
}
const Bu = {
  start: v,
  end: v,
  allDay: Boolean
};
function Lu(t, e, n) {
  let i = Uu(t, e), { range: r } = i;
  if (!r.start)
    return null;
  if (!r.end) {
    if (n == null)
      return null;
    r.end = e.add(r.start, n);
  }
  return i;
}
function Uu(t, e) {
  let { refined: n, extra: i } = Ti(t, Bu), r = n.start ? e.createMarkerMeta(n.start) : null, s = n.end ? e.createMarkerMeta(n.end) : null, { allDay: o } = n;
  return o == null && (o = r && r.isTimeUnspecified && (!s || s.isTimeUnspecified)), Object.assign({ range: {
    start: r ? r.marker : null,
    end: s ? s.marker : null
  }, allDay: o }, i);
}
function Fu(t, e) {
  return su(t.range, e.range) && t.allDay === e.allDay && ju(t, e);
}
function ju(t, e) {
  for (let n in e)
    if (n !== "range" && n !== "allDay" && t[n] !== e[n])
      return !1;
  for (let n in t)
    if (!(n in e))
      return !1;
  return !0;
}
function Wu(t, e) {
  return Object.assign(Object.assign({}, Jo(t.range, e, t.allDay)), { allDay: t.allDay });
}
function Xo(t, e, n) {
  return Object.assign(Object.assign({}, Jo(t, e, n)), { timeZone: e.timeZone });
}
function Jo(t, e, n) {
  return {
    start: e.toDate(t.start),
    end: e.toDate(t.end),
    startStr: e.formatIso(t.start, { omitTime: n }),
    endStr: e.formatIso(t.end, { omitTime: n })
  };
}
function Vu(t, e, n) {
  let i = Bo({ editable: !1 }, n), r = Kn(
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
    ui: qo(r, e),
    instance: Ni(r.defId, t.range),
    range: t.range,
    isStart: !0,
    isEnd: !0
  };
}
function Gu(t, e, n) {
  let i = !1, r = function(a) {
    i || (i = !0, e(a));
  }, s = function(a) {
    i || (i = !0, n(a));
  }, o = t(r, s);
  o && typeof o.then == "function" && o.then(r, s);
}
class Xr extends Error {
  constructor(e, n) {
    super(e), this.response = n;
  }
}
function qu(t, e, n) {
  t = t.toUpperCase();
  const i = {
    method: t
  };
  return t === "GET" ? e += (e.indexOf("?") === -1 ? "?" : "&") + new URLSearchParams(n) : (i.body = new URLSearchParams(n), i.headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  }), fetch(e, i).then((r) => {
    if (r.ok)
      return r.json().then((s) => [s, r], () => {
        throw new Xr("Failure parsing JSON", r);
      });
    throw new Xr("Request failed", r);
  });
}
let kn;
function ea() {
  return kn == null && (kn = Yu()), kn;
}
function Yu() {
  if (typeof document > "u")
    return !0;
  let t = document.createElement("div");
  t.style.position = "absolute", t.style.top = "0px", t.style.left = "0px", t.innerHTML = "<table><tr><td><div></div></td></tr></table>", t.querySelector("table").style.height = "100px", t.querySelector("div").style.height = "100%", document.body.appendChild(t);
  let n = t.querySelector("div").offsetHeight > 0;
  return document.body.removeChild(t), n;
}
class Qu extends T {
  constructor() {
    super(...arguments), this.state = {
      forPrint: !1
    }, this.handleBeforePrint = () => {
      Qt(() => {
        this.setState({ forPrint: !0 });
      });
    }, this.handleAfterPrint = () => {
      Qt(() => {
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
    return ea() || o.push("fc-liquid-hack"), e.children(o, s, r, i);
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
class et {
  constructor(e) {
    this.component = e.component, this.isHitComboAllowed = e.isHitComboAllowed || null;
  }
  destroy() {
  }
}
function Zu(t, e) {
  return {
    component: t,
    el: e.el,
    useEventCenter: e.useEventCenter != null ? e.useEventCenter : !0,
    isHitComboAllowed: e.isHitComboAllowed || null
  };
}
function Li(t) {
  return {
    [t.component.uid]: t
  };
}
const Jn = {};
class tt extends Y {
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
      state: { nowDate: s, todayRange: Ku(s) },
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
tt.contextType = de;
function Ku(t) {
  let e = I(t), n = B(e, 1);
  return { start: e, end: n };
}
class Xu {
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
    return i.format(i.createMarker(e), $(n));
  }
  // `settings` is for formatter AND isEndExclusive
  formatRange(e, n, i) {
    let { dateEnv: r } = this.getCurrentData();
    return r.formatRange(r.createMarker(e), r.createMarker(n), $(i), i);
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
    let r = this.getCurrentData(), s = Lu(i, r.dateEnv, x({ days: 1 }));
    s && (this.dispatch({ type: "SELECT_DATES", selection: s }), Vo(s, null, r));
  }
  unselect(e) {
    let n = this.getCurrentData();
    n.dateSelection && (this.dispatch({ type: "UNSELECT_DATES" }), ku(e, n));
  }
  // Public Events API
  // -----------------------------------------------------------------------------------------------------------------
  addEvent(e, n) {
    if (e instanceof N) {
      let o = e._def, a = e._instance;
      return this.getCurrentData().eventStore.defs[o.defId] || (this.dispatch({
        type: "ADD_EVENTS",
        eventStore: Xn({ def: o, instance: a })
        // TODO: better util for two args?
      }), this.triggerEventAdd(e)), e;
    }
    let i = this.getCurrentData(), r;
    if (n instanceof Le)
      r = n.internalEventSource;
    else if (typeof n == "boolean")
      n && ([r] = Mi(i.eventSources));
    else if (n != null) {
      let o = this.getEventSourceById(n);
      if (!o)
        return console.warn(`Could not find an event source with ID "${n}"`), null;
      r = o.internalEventSource;
    }
    let s = zo(e, r, i, !1);
    if (s) {
      let o = new N(i, s.def, s.def.recurringDef ? null : s.instance);
      return this.dispatch({
        type: "ADD_EVENTS",
        eventStore: Xn(s)
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
          eventStore: Go(e)
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
    return Re(e.eventStore, e);
  }
  removeAllEvents() {
    this.dispatch({ type: "REMOVE_ALL_EVENTS" });
  }
  // Public Event Sources API
  // -----------------------------------------------------------------------------------------------------------------
  getEventSources() {
    let e = this.getCurrentData(), n = e.eventSources, i = [];
    for (let r in n)
      i.push(new Le(e, n[r]));
    return i;
  }
  getEventSourceById(e) {
    let n = this.getCurrentData(), i = n.eventSources;
    e = String(e);
    for (let r in i)
      if (i[r].publicId === e)
        return new Le(n, i[r]);
    return null;
  }
  addEventSource(e) {
    let n = this.getCurrentData();
    if (e instanceof Le)
      return n.eventSources[e.internalEventSource.sourceId] || this.dispatch({
        type: "ADD_EVENT_SOURCES",
        sources: [e.internalEventSource]
      }), e;
    let i = Uo(e, n);
    return i ? (this.dispatch({ type: "ADD_EVENT_SOURCES", sources: [i] }), new Le(n, i)) : null;
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
function Ju(t, e) {
  return t.left >= e.left && t.left < e.right && t.top >= e.top && t.top < e.bottom;
}
function ta(t, e) {
  let n = {
    left: Math.max(t.left, e.left),
    right: Math.min(t.right, e.right),
    top: Math.max(t.top, e.top),
    bottom: Math.min(t.bottom, e.bottom)
  };
  return n.left < n.right && n.top < n.bottom ? n : !1;
}
function eh(t, e) {
  return {
    left: Math.min(Math.max(t.left, e.left), e.right),
    top: Math.min(Math.max(t.top, e.top), e.bottom)
  };
}
function th(t) {
  return {
    left: (t.left + t.right) / 2,
    top: (t.top + t.bottom) / 2
  };
}
function nh(t, e) {
  return {
    left: t.left - e.left,
    top: t.top - e.top
  };
}
const Mn = Q();
class ih {
  constructor() {
    this.getKeysForEventDefs = A(this._getKeysForEventDefs), this.splitDateSelection = A(this._splitDateSpan), this.splitEventStore = A(this._splitEventStore), this.splitIndividualUi = A(this._splitIndividualUi), this.splitEventDrag = A(this._splitInteraction), this.splitEventResize = A(this._splitInteraction), this.eventUiBuilders = {};
  }
  splitProps(e) {
    let n = this.getKeyInfo(e), i = this.getKeysForEventDefs(e.eventStore), r = this.splitDateSelection(e.dateSelection), s = this.splitIndividualUi(e.eventUiBases, i), o = this.splitEventStore(e.eventStore, i), a = this.splitEventDrag(e.eventDrag), l = this.splitEventResize(e.eventResize), d = {};
    this.eventUiBuilders = le(n, (c, f) => this.eventUiBuilders[f] || A(rh));
    for (let c in n) {
      let f = n[c], h = o[c] || Mn, u = this.eventUiBuilders[c];
      d[c] = {
        businessHours: f.businessHours || e.businessHours,
        dateSelection: r[c] || null,
        eventStore: h,
        eventUiBases: u(e.eventUiBases[""], f.ui, s[c]),
        eventSelection: h.instances[e.eventSelection] ? e.eventSelection : "",
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
    return le(e.defs, (n) => this.getKeysForEventDef(n));
  }
  _splitEventStore(e, n) {
    let { defs: i, instances: r } = e, s = {};
    for (let o in i)
      for (let a of n[o])
        s[a] || (s[a] = Q()), s[a].defs[o] = i[o];
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
          affectedEvents: i[a] || Mn,
          mutatedEvents: s[a] || Mn,
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
function rh(t, e, n) {
  let i = [];
  t && i.push(t), e && i.push(e);
  let r = {
    "": Lo(i)
  };
  return n && Object.assign(r, n), r;
}
function na(t, e, n, i) {
  return {
    dow: t.getUTCDay(),
    isDisabled: !!(i && (!i.activeRange || !ae(i.activeRange, t))),
    isOther: !!(i && !ae(i.currentRange, t)),
    isToday: !!(e && ae(e, t)),
    isPast: !!(e && t < e.start),
    isFuture: !!(e && t >= e.end)
  };
}
function Ui(t, e) {
  let n = [
    "fc-day",
    `fc-day-${ld[t.dow]}`
  ];
  return t.isDisabled ? n.push("fc-day-disabled") : (t.isToday && (n.push("fc-day-today"), n.push(e.getClass("today"))), t.isPast && n.push("fc-day-past"), t.isFuture && n.push("fc-day-future"), t.isOther && n.push("fc-day-other")), n;
}
const sh = $({ year: "numeric", month: "long", day: "numeric" }), oh = $({ week: "long" });
function en(t, e, n = "day", i = !0) {
  const { dateEnv: r, options: s, calendarApi: o } = t;
  let a = r.format(e, n === "week" ? oh : sh);
  if (s.navLinks) {
    let l = r.toDate(e);
    const d = (c) => {
      let f = n === "day" ? s.navLinkDayClick : n === "week" ? s.navLinkWeekClick : null;
      typeof f == "function" ? f.call(o, r.toDate(e), c) : (typeof f == "string" && (n = f), o.zoomTo(e, n));
    };
    return Object.assign({ title: ct(s.navLinkHint, [a, l], a), "data-navlink": "" }, i ? Do(d) : { onClick: d });
  }
  return { "aria-label": a };
}
let In = null;
function ah() {
  return In === null && (In = lh()), In;
}
function lh() {
  let t = document.createElement("div");
  lt(t, {
    position: "absolute",
    top: -1e3,
    left: 0,
    border: 0,
    padding: 0,
    overflow: "scroll",
    direction: "rtl"
  }), t.innerHTML = "<div></div>", document.body.appendChild(t);
  let n = t.firstChild.getBoundingClientRect().left > t.getBoundingClientRect().left;
  return Ai(t), n;
}
let On;
function ch() {
  return On || (On = dh()), On;
}
function dh() {
  let t = document.createElement("div");
  t.style.overflow = "scroll", t.style.position = "absolute", t.style.top = "-9999px", t.style.left = "-9999px", document.body.appendChild(t);
  let e = ia(t);
  return document.body.removeChild(t), e;
}
function ia(t) {
  return {
    x: t.offsetHeight - t.clientHeight,
    y: t.offsetWidth - t.clientWidth
  };
}
function uh(t, e = !1) {
  let n = window.getComputedStyle(t), i = parseInt(n.borderLeftWidth, 10) || 0, r = parseInt(n.borderRightWidth, 10) || 0, s = parseInt(n.borderTopWidth, 10) || 0, o = parseInt(n.borderBottomWidth, 10) || 0, a = ia(t), l = a.y - i - r, d = a.x - s - o, c = {
    borderLeft: i,
    borderRight: r,
    borderTop: s,
    borderBottom: o,
    scrollbarBottom: d,
    scrollbarLeft: 0,
    scrollbarRight: 0
  };
  return ah() && n.direction === "rtl" ? c.scrollbarLeft = l : c.scrollbarRight = l, e && (c.paddingLeft = parseInt(n.paddingLeft, 10) || 0, c.paddingRight = parseInt(n.paddingRight, 10) || 0, c.paddingTop = parseInt(n.paddingTop, 10) || 0, c.paddingBottom = parseInt(n.paddingBottom, 10) || 0), c;
}
function hh(t, e = !1, n) {
  let i = Fi(t), r = uh(t, e), s = {
    left: i.left + r.borderLeft + r.scrollbarLeft,
    right: i.right - r.borderRight - r.scrollbarRight,
    top: i.top + r.borderTop,
    bottom: i.bottom - r.borderBottom - r.scrollbarBottom
  };
  return e && (s.left += r.paddingLeft, s.right -= r.paddingRight, s.top += r.paddingTop, s.bottom -= r.paddingBottom), s;
}
function Fi(t) {
  let e = t.getBoundingClientRect();
  return {
    left: e.left + window.scrollX,
    top: e.top + window.scrollY,
    right: e.right + window.scrollX,
    bottom: e.bottom + window.scrollY
  };
}
function fh(t) {
  let e = ra(t), n = t.getBoundingClientRect();
  for (let i of e) {
    let r = ta(n, i.getBoundingClientRect());
    if (r)
      n = r;
    else
      return null;
  }
  return n;
}
function ra(t) {
  let e = [];
  for (; t instanceof HTMLElement; ) {
    let n = window.getComputedStyle(t);
    if (n.position === "fixed")
      break;
    /(auto|scroll)/.test(n.overflow + n.overflowY + n.overflowX) && e.push(t), t = t.parentNode;
  }
  return e;
}
class Xe {
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
    return Ct(this.tops || [], e.tops || []) && Ct(this.bottoms || [], e.bottoms || []) && Ct(this.lefts || [], e.lefts || []) && Ct(this.rights || [], e.rights || []);
  }
}
function Ct(t, e) {
  const n = t.length;
  if (n !== e.length)
    return !1;
  for (let i = 0; i < n; i++)
    if (Math.round(t[i]) !== Math.round(e[i]))
      return !1;
  return !0;
}
class ji {
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
class ph extends ji {
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
class gh extends ji {
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
class se extends T {
  constructor() {
    super(...arguments), this.uid = $e();
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
    !U(e, ".fc-event-mirror");
  }
  isValidDateDownEl(e) {
    return !U(e, ".fc-event:not(.fc-bg-event)") && !U(e, ".fc-more-link") && // a "more.." link
    !U(e, "a[data-navlink]") && // a clickable nav link
    !U(e, ".fc-popover");
  }
}
class sa {
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
      const r = Object.assign(Object.assign({}, n), { span: Wi(n.span, e.touchingEntry.span) });
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
    n.lateral === -1 ? (Nn(r, n.level, n.levelCoord), Nn(i, n.level, [e])) : Nn(i[n.level], n.lateral, e), this.stackCnts[Te(e)] = n.stackCnt;
  }
  /*
  does not care about limits
  */
  findInsertion(e) {
    let { levelCoords: n, entriesByLevel: i, strictOrder: r, stackCnts: s } = this, o = n.length, a = 0, l = -1, d = -1, c = null, f = 0;
    for (let g = 0; g < o; g += 1) {
      const m = n[g];
      if (!r && m >= a + this.getEntryThickness(e))
        break;
      let b = i[g], w, E = ti(b, e.span.start, ei), D = E[0] + E[1];
      for (
        ;
        // loop through entries that horizontally intersect
        (w = b[D]) && // but not past the whole entry list
        w.span.start < e.span.end;
      ) {
        let C = m + this.getEntryThickness(w);
        C > a && (a = C, c = w, l = g, d = D), C === a && (f = Math.max(f, s[Te(w)] + 1)), D += 1;
      }
    }
    let h = 0;
    if (c)
      for (h = l + 1; h < o && n[h] < a; )
        h += 1;
    let u = -1;
    return h < o && n[h] === a && (u = ti(i[h], e.span.end, ei)[0]), {
      touchingLevel: l,
      touchingLateral: d,
      touchingEntry: c,
      stackCnt: f,
      levelCoord: a,
      level: h,
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
function ei(t) {
  return t.span.end;
}
function Te(t) {
  return t.index + ":" + t.span.start;
}
function mh(t) {
  let e = [];
  for (let n of t) {
    let i = [], r = {
      span: n.span,
      entries: [n]
    };
    for (let s of e)
      Wi(s.span, r.span) ? r = {
        entries: s.entries.concat(r.entries),
        span: vh(s.span, r.span)
      } : i.push(s);
    i.push(r), e = i;
  }
  return e;
}
function vh(t, e) {
  return {
    start: Math.min(t.start, e.start),
    end: Math.max(t.end, e.end)
  };
}
function Wi(t, e) {
  let n = Math.max(t.start, e.start), i = Math.min(t.end, e.end);
  return n < i ? { start: n, end: i } : null;
}
function Nn(t, e, n) {
  t.splice(e, 0, n);
}
function ti(t, e, n) {
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
class bh {
  constructor(e, n) {
    this.emitter = new bn();
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
const Vi = {};
function yh(t, e) {
  return !t || e > 10 ? $({ weekday: "short" }) : e > 1 ? $({ weekday: "short", month: "numeric", day: "numeric", omitCommas: !0 }) : $({ weekday: "long" });
}
const oa = "fc-col-header-cell";
function aa(t) {
  return t.text;
}
class wh extends T {
  render() {
    let { dateEnv: e, options: n, theme: i, viewApi: r } = this.context, { props: s } = this, { date: o, dateProfile: a } = s, l = na(o, s.todayRange, null, a), d = [oa].concat(Ui(l, i)), c = e.format(o, s.dayHeaderFormat), f = !l.isDisabled && s.colCnt > 1 ? en(this.context, o) : {}, h = e.toDate(o);
    e.namedTimeZoneImpl && (h = we(h, 36e5));
    let u = Object.assign(Object.assign(Object.assign({ date: h, view: r }, s.extraRenderProps), { text: c }), l);
    return p(K, { elTag: "th", elClasses: d, elAttrs: Object.assign({ role: "columnheader", colSpan: s.colSpan, "data-date": l.isDisabled ? void 0 : _i(o) }, s.extraDataAttrs), renderProps: u, generatorName: "dayHeaderContent", customGenerator: n.dayHeaderContent, defaultGenerator: aa, classNameGenerator: n.dayHeaderClassNames, didMount: n.dayHeaderDidMount, willUnmount: n.dayHeaderWillUnmount }, (g) => p("div", { className: "fc-scrollgrid-sync-inner" }, !l.isDisabled && p(g, { elTag: "a", elAttrs: f, elClasses: [
      "fc-col-header-cell-cushion",
      s.isSticky && "fc-sticky"
    ] })));
  }
}
const Eh = $({ weekday: "long" });
class Sh extends T {
  render() {
    let { props: e } = this, { dateEnv: n, theme: i, viewApi: r, options: s } = this.context, o = B(/* @__PURE__ */ new Date(2592e5), e.dow), a = {
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
    return p(K, { elTag: "th", elClasses: [
      oa,
      ...Ui(a, i),
      ...e.extraClassNames || []
    ], elAttrs: Object.assign({ role: "columnheader", colSpan: e.colSpan }, e.extraDataAttrs), renderProps: d, generatorName: "dayHeaderContent", customGenerator: s.dayHeaderContent, defaultGenerator: aa, classNameGenerator: s.dayHeaderClassNames, didMount: s.dayHeaderDidMount, willUnmount: s.dayHeaderWillUnmount }, (c) => p(
      "div",
      { className: "fc-scrollgrid-sync-inner" },
      p(c, { elTag: "a", elClasses: [
        "fc-col-header-cell-cushion",
        e.isSticky && "fc-sticky"
      ], elAttrs: {
        "aria-label": n.format(o, Eh)
      } })
    ));
  }
}
class la extends T {
  constructor() {
    super(...arguments), this.createDayHeaderFormatter = A(Ah);
  }
  render() {
    let { context: e } = this, { dates: n, dateProfile: i, datesRepDistinctDays: r, renderIntro: s } = this.props, o = this.createDayHeaderFormatter(e.options.dayHeaderFormat, r, n.length);
    return p(tt, { unit: "day" }, (a, l) => p(
      "tr",
      { role: "row" },
      s && s("day"),
      n.map((d) => r ? p(wh, { key: d.toISOString(), date: d, dateProfile: i, todayRange: l, colCnt: n.length, dayHeaderFormat: o }) : p(Sh, { key: d.getUTCDay(), dow: d.getUTCDay(), dayHeaderFormat: o }))
    ));
  }
}
function Ah(t, e, n) {
  return t || yh(e, n);
}
class ca {
  constructor(e, n) {
    let i = e.start, { end: r } = e, s = [], o = [], a = -1;
    for (; i < r; )
      n.isHiddenDay(i) ? s.push(a + 0.5) : (a += 1, s.push(a), o.push(i)), i = B(i, 1);
    this.dates = o, this.indices = s, this.cnt = o.length;
  }
  sliceRange(e) {
    let n = this.getDateDayIndex(e.start), i = this.getDateDayIndex(B(e.end, -1)), r = Math.max(0, n), s = Math.min(this.cnt - 1, i);
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
    let { indices: n } = this, i = Math.floor(Pe(this.dates[0], e));
    return i < 0 ? n[0] - 1 : i >= n.length ? n[n.length - 1] + 1 : n[i];
  }
}
class da {
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
class ua {
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
      { range: { start: e, end: we(e, 1) }, allDay: !1 },
      // add 1 ms, protect against null range
      n,
      i,
      {},
      r,
      ...s
    );
  }
  _sliceBusinessHours(e, n, i, r, ...s) {
    return e ? this._sliceEventStore(Ne(e, xt(n, !!i), r), {}, n, i, ...s).bg : [];
  }
  _sliceEventStore(e, n, i, r, ...s) {
    if (e) {
      let o = Zr(e, n, xt(i, !!r), r);
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
    let o = Zr(e.mutatedEvents, n, xt(i, !!r), r);
    return {
      segs: this.sliceEventRanges(o.fg, s),
      affectedInstances: e.affectedEvents.instances,
      isEvent: e.isEvent
    };
  }
  _sliceDateSpan(e, n, i, r, s, ...o) {
    if (!e)
      return [];
    let a = xt(n, !!i), l = Oe(e.range, a);
    if (l) {
      e = Object.assign(Object.assign({}, e), { range: l });
      let d = Vu(e, r, s), c = this.sliceRange(e.range, ...o);
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
      end: B(i.start, 1)
    });
    let r = this.sliceRange(i, ...n);
    for (let s of r)
      s.eventRange = e, s.isStart = e.isStart && s.isStart, s.isEnd = e.isEnd && s.isEnd;
    return r;
  }
}
function xt(t, e) {
  let n = t.activeRange;
  return e ? n : {
    start: we(n.start, t.slotMinTime.milliseconds),
    end: we(n.end, t.slotMaxTime.milliseconds - 864e5)
    // 864e5 = ms in a day
  };
}
function ha(t, e, n) {
  let { instances: i } = t.mutatedEvents;
  for (let r in i)
    if (!mn(e.validRange, i[r].range))
      return !1;
  return fa({ eventDrag: t }, n);
}
function Dh(t, e, n) {
  return mn(e.validRange, t.range) ? fa({ dateSelection: t }, n) : !1;
}
function fa(t, e) {
  let n = e.getCurrentData(), i = Object.assign({ businessHours: n.businessHours, dateSelection: "", eventStore: n.eventStore, eventUiBases: n.eventUiBases, eventSelection: "", eventDrag: null, eventResize: null }, t);
  return (e.pluginHooks.isPropsValid || Ch)(i, e);
}
function Ch(t, e, n = {}, i) {
  return !(t.eventDrag && !xh(t, e, n, i) || t.dateSelection && !_h(t, e, n, i));
}
function xh(t, e, n, i) {
  let r = e.getCurrentData(), s = t.eventDrag, o = s.mutatedEvents, a = o.defs, l = o.instances, d = Jt(a, s.isEvent ? t.eventUiBases : { "": r.selectionConfig });
  i && (d = le(d, i));
  let c = Au(t.eventStore, s.affectedEvents.instances), f = c.defs, h = c.instances, u = Jt(f, t.eventUiBases);
  for (let g in l) {
    let m = l[g], b = m.range, w = d[m.defId], E = a[m.defId];
    if (!pa(w.constraints, b, c, t.businessHours, e))
      return !1;
    let { eventOverlap: D } = e.options, C = typeof D == "function" ? D : null;
    for (let k in h) {
      let O = h[k];
      if (Oi(b, O.range) && (u[O.defId].overlap === !1 && s.isEvent || w.overlap === !1 || C && !C(
        new N(e, f[O.defId], O),
        // still event
        new N(e, E, m)
      )))
        return !1;
    }
    let P = r.eventStore;
    for (let k of w.allows) {
      let O = Object.assign(Object.assign({}, n), { range: m.range, allDay: E.allDay }), _ = P.defs[E.defId], fe = P.instances[g], it;
      if (_ ? it = new N(e, _, fe) : it = new N(e, E), !k(zi(O, e), it))
        return !1;
    }
  }
  return !0;
}
function _h(t, e, n, i) {
  let r = t.eventStore, s = r.defs, o = r.instances, a = t.dateSelection, l = a.range, { selectionConfig: d } = e.getCurrentData();
  if (i && (d = i(d)), !pa(d.constraints, l, r, t.businessHours, e))
    return !1;
  let { selectOverlap: c } = e.options, f = typeof c == "function" ? c : null;
  for (let h in o) {
    let u = o[h];
    if (Oi(l, u.range) && (d.overlap === !1 || f && !f(new N(e, s[u.defId], u), null)))
      return !1;
  }
  for (let h of d.allows) {
    let u = Object.assign(Object.assign({}, n), a);
    if (!h(zi(u, e), null))
      return !1;
  }
  return !0;
}
function pa(t, e, n, i, r) {
  for (let s of t)
    if (!Th(Rh(s, e, n, i, r), e))
      return !1;
  return !0;
}
function Rh(t, e, n, i, r) {
  return t === "businessHours" ? $n(Ne(i, e, r)) : typeof t == "string" ? $n(vn(n, (s) => s.groupId === t)) : typeof t == "object" && t ? $n(Ne(t, e, r)) : [];
}
function $n(t) {
  let { instances: e } = t, n = [];
  for (let i in e)
    n.push(e[i].range);
  return n;
}
function Th(t, e) {
  for (let n of t)
    if (mn(n, e))
      return !0;
  return !1;
}
const _t = /^(visible|hidden)$/;
class kh extends T {
  constructor() {
    super(...arguments), this.handleEl = (e) => {
      this.el = e, re(this.props.elRef, e);
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
    if (_t.test(this.props.overflowX))
      return !1;
    let { el: e } = this, n = this.el.getBoundingClientRect().width - this.getYScrollbarWidth(), { children: i } = e;
    for (let r = 0; r < i.length; r += 1)
      if (i[r].getBoundingClientRect().width > n)
        return !0;
    return !1;
  }
  needsYScrolling() {
    if (_t.test(this.props.overflowY))
      return !1;
    let { el: e } = this, n = this.el.getBoundingClientRect().height - this.getXScrollbarWidth(), { children: i } = e;
    for (let r = 0; r < i.length; r += 1)
      if (i[r].getBoundingClientRect().height > n)
        return !0;
    return !1;
  }
  getXScrollbarWidth() {
    return _t.test(this.props.overflowX) ? 0 : this.el.offsetHeight - this.el.clientHeight;
  }
  getYScrollbarWidth() {
    return _t.test(this.props.overflowY) ? 0 : this.el.offsetWidth - this.el.clientWidth;
  }
}
class oe {
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
    return Fd(this.currentMap, e, n, i);
  }
  getAll() {
    return Mi(this.currentMap);
  }
}
function Mh(t) {
  let e = Lc(t, ".fc-scrollgrid-shrink"), n = 0;
  for (let i of e)
    n = Math.max(n, ed(i));
  return Math.ceil(n);
}
function ga(t, e) {
  return t.liquid && e.liquid;
}
function Ih(t, e) {
  return e.maxHeight != null || // if its possible for the height to max out, we might need scrollbars
  ga(t, e);
}
function Oh(t, e, n, i) {
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
function Nh(t, e) {
  return ye(t, e, ee);
}
function $h(t, e) {
  let n = [];
  for (let i of t) {
    let r = i.span || 1;
    for (let s = 0; s < r; s += 1)
      n.push(p("col", { style: {
        width: i.width === "shrink" ? Ph(e) : i.width || "",
        minWidth: i.minWidth || ""
      } }));
  }
  return p("colgroup", {}, ...n);
}
function Ph(t) {
  return t ?? 4;
}
function Hh(t) {
  for (let e of t)
    if (e.width === "shrink")
      return !0;
  return !1;
}
function zh(t, e) {
  let n = [
    "fc-scrollgrid",
    e.theme.getClass("table")
  ];
  return t && n.push("fc-scrollgrid-liquid"), n;
}
function Bh(t, e) {
  let n = [
    "fc-scrollgrid-section",
    `fc-scrollgrid-section-${t.type}`,
    t.className
    // used?
  ];
  return e && t.liquid && t.maxHeight == null && n.push("fc-scrollgrid-section-liquid"), t.isSticky && n.push("fc-scrollgrid-section-sticky"), n;
}
function ni(t) {
  return p("div", { className: "fc-scrollgrid-sticky-shim", style: {
    width: t.clientWidth,
    minWidth: t.tableMinWidth
  } });
}
function tn(t) {
  let { stickyHeaderDates: e } = t;
  return (e == null || e === "auto") && (e = t.height === "auto" || t.viewHeight === "auto"), e;
}
function ma(t) {
  let { stickyFooterScrollbar: e } = t;
  return (e == null || e === "auto") && (e = t.height === "auto" || t.viewHeight === "auto"), e;
}
class Gi extends T {
  constructor() {
    super(...arguments), this.processCols = A((e) => e, Nh), this.renderMicroColGroup = A($h), this.scrollerRefs = new oe(), this.scrollerElRefs = new oe(this._handleScrollerEl.bind(this)), this.state = {
      shrinkWidth: null,
      forceYScrollbars: !1,
      scrollerClientWidths: {},
      scrollerClientHeights: {}
    }, this.handleSizing = () => {
      this.safeSetState(Object.assign({ shrinkWidth: this.computeShrinkWidth() }, this.computeScrollerDims()));
    };
  }
  render() {
    let { props: e, state: n, context: i } = this, r = e.sections || [], s = this.processCols(e.cols), o = this.renderMicroColGroup(s, n.shrinkWidth), a = zh(e.liquid, i);
    e.collapsibleWidth && a.push("fc-scrollgrid-collapsible");
    let l = r.length, d = 0, c, f = [], h = [], u = [];
    for (; d < l && (c = r[d]).type === "header"; )
      f.push(this.renderSection(c, o, !0)), d += 1;
    for (; d < l && (c = r[d]).type === "body"; )
      h.push(this.renderSection(c, o, !1)), d += 1;
    for (; d < l && (c = r[d]).type === "footer"; )
      u.push(this.renderSection(c, o, !0)), d += 1;
    let g = !ea();
    const m = { role: "rowgroup" };
    return p("table", {
      role: "grid",
      className: a.join(" "),
      style: { height: e.height }
    }, !!(!g && f.length) && p("thead", m, ...f), !!(!g && h.length) && p("tbody", m, ...h), !!(!g && u.length) && p("tfoot", m, ...u), g && p("tbody", m, ...f, ...h, ...u));
  }
  renderSection(e, n, i) {
    return "outerContent" in e ? p(M, { key: e.key }, e.outerContent) : p("tr", { key: e.key, role: "presentation", className: Bh(e, this.props.liquid).join(" ") }, this.renderChunkTd(e, n, e.chunk, i));
  }
  renderChunkTd(e, n, i, r) {
    if ("outerContent" in i)
      return i.outerContent;
    let { props: s } = this, { forceYScrollbars: o, scrollerClientWidths: a, scrollerClientHeights: l } = this.state, d = Ih(s, e), c = ga(s, e), f = s.liquid ? o ? "scroll" : d ? "auto" : "hidden" : "visible", h = e.key, u = Oh(e, i, {
      tableColGroupNode: n,
      tableMinWidth: "",
      clientWidth: !s.collapsibleWidth && a[h] !== void 0 ? a[h] : null,
      clientHeight: l[h] !== void 0 ? l[h] : null,
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
      p(kh, { ref: this.scrollerRefs.createRef(h), elRef: this.scrollerElRefs.createRef(h), overflowY: f, overflowX: s.liquid ? "hidden" : "visible", maxHeight: e.maxHeight, liquid: c, liquidIsAbsolute: !0 }, u)
    ));
  }
  _handleScrollerEl(e, n) {
    let i = Lh(this.props.sections, n);
    i && re(i.chunk.scrollerElRef, e);
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
    return Hh(this.props.cols) ? Mh(this.scrollerElRefs.getAll()) : 0;
  }
  computeScrollerDims() {
    let e = ch(), { scrollerRefs: n, scrollerElRefs: i } = this, r = !1, s = {}, o = {};
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
Gi.addStateEquality({
  scrollerClientWidths: ee,
  scrollerClientHeights: ee
});
function Lh(t, e) {
  for (let n of t)
    if (n.key === e)
      return n;
  return null;
}
class qi extends T {
  constructor() {
    super(...arguments), this.buildPublicEvent = A((e, n, i) => new N(e, n, i)), this.handleEl = (e) => {
      this.el = e, re(this.props.elRef, e), e && Kr(e, this.props.seg);
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
      isDraggable: !e.disableDragging && $u(r, n),
      isStartResizable: !e.disableResizing && Pu(r, n),
      isEndResizable: !e.disableResizing && Hu(r),
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
    return p(K, { elRef: this.handleEl, elTag: e.elTag, elAttrs: e.elAttrs, elClasses: [
      ...zu(a),
      ...r.eventRange.ui.classNames,
      ...e.elClasses || []
    ], elStyle: e.elStyle, renderProps: a, generatorName: "eventContent", customGenerator: i.eventContent, defaultGenerator: e.defaultGenerator, classNameGenerator: i.eventClassNames, didMount: i.eventDidMount, willUnmount: i.eventWillUnmount }, e.children);
  }
  componentDidUpdate(e) {
    this.el && this.props.seg !== e.seg && Kr(this.el, this.props.seg);
  }
}
class Yi extends T {
  render() {
    let { props: e, context: n } = this, { options: i } = n, { seg: r } = e, { ui: s } = r.eventRange, o = i.eventTimeFormat || e.defaultTimeFormat, a = Qo(r, o, n, e.defaultDisplayEventTime, e.defaultDisplayEventEnd);
    return p(qi, Object.assign({}, e, { elTag: "a", elStyle: {
      borderColor: s.borderColor,
      backgroundColor: s.backgroundColor
    }, elAttrs: Ko(r, n), defaultGenerator: Uh, timeText: a }), (l, d) => p(
      M,
      null,
      p(l, { elTag: "div", elClasses: ["fc-event-main"], elStyle: { color: d.textColor } }),
      !!d.isStartResizable && p("div", { className: "fc-event-resizer fc-event-resizer-start" }),
      !!d.isEndResizable && p("div", { className: "fc-event-resizer fc-event-resizer-end" })
    ));
  }
}
Yi.addPropsEquality({
  seg: ee
});
function Uh(t) {
  return p(
    "div",
    { className: "fc-event-main-frame" },
    t.timeText && p("div", { className: "fc-event-time" }, t.timeText),
    p(
      "div",
      { className: "fc-event-title-container" },
      p("div", { className: "fc-event-title fc-sticky" }, t.event.title || p(M, null, " "))
    )
  );
}
const Qi = (t) => p(de.Consumer, null, (e) => {
  let { options: n } = e, i = {
    isAxis: t.isAxis,
    date: e.dateEnv.toDate(t.date),
    view: e.viewApi
  };
  return p(K, { elRef: t.elRef, elTag: t.elTag || "div", elAttrs: t.elAttrs, elClasses: t.elClasses, elStyle: t.elStyle, renderProps: i, generatorName: "nowIndicatorContent", customGenerator: n.nowIndicatorContent, classNameGenerator: n.nowIndicatorClassNames, didMount: n.nowIndicatorDidMount, willUnmount: n.nowIndicatorWillUnmount }, t.children);
}), Fh = $({ day: "numeric" });
class Zi extends T {
  constructor() {
    super(...arguments), this.refineRenderProps = $t(jh);
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
    return p(K, { elRef: e.elRef, elTag: e.elTag, elAttrs: Object.assign(Object.assign({}, e.elAttrs), r.isDisabled ? {} : { "data-date": _i(e.date) }), elClasses: [
      ...Ui(r, n.theme),
      ...e.elClasses || []
    ], elStyle: e.elStyle, renderProps: r, generatorName: "dayCellContent", customGenerator: i.dayCellContent, defaultGenerator: e.defaultGenerator, classNameGenerator: (
      // don't use custom classNames if disabled
      r.isDisabled ? void 0 : i.dayCellClassNames
    ), didMount: i.dayCellDidMount, willUnmount: i.dayCellWillUnmount }, e.children);
  }
}
function Ki(t) {
  return !!(t.dayCellContent || Zn("dayCellContent", t));
}
function jh(t) {
  let { date: e, dateEnv: n, dateProfile: i, isMonthStart: r } = t, s = na(e, t.todayRange, null, i), o = t.showDayNumber ? n.format(e, r ? t.monthStartFormat : Fh) : "";
  return Object.assign(Object.assign(Object.assign({ date: n.toDate(e), view: t.viewApi }, s), {
    isMonthStart: r,
    dayNumberText: o
  }), t.extraRenderProps);
}
class va extends T {
  render() {
    let { props: e } = this, { seg: n } = e;
    return p(qi, { elTag: "div", elClasses: ["fc-bg-event"], elStyle: { backgroundColor: n.eventRange.ui.backgroundColor }, defaultGenerator: Wh, seg: n, timeText: "", isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: !1, isPast: e.isPast, isFuture: e.isFuture, isToday: e.isToday, disableDragging: !0, disableResizing: !0 });
  }
}
function Wh(t) {
  let { title: e } = t.event;
  return e && p("div", { className: "fc-event-title" }, t.event.title);
}
function ba(t) {
  return p("div", { className: `fc-${t}` });
}
const ya = (t) => p(de.Consumer, null, (e) => {
  let { dateEnv: n, options: i } = e, { date: r } = t, s = i.weekNumberFormat || t.defaultFormat, o = n.computeWeekNumber(r), a = n.format(r, s), l = { num: o, text: a, date: r };
  return p(
    K,
    { elRef: t.elRef, elTag: t.elTag, elAttrs: t.elAttrs, elClasses: t.elClasses, elStyle: t.elStyle, renderProps: l, generatorName: "weekNumberContent", customGenerator: i.weekNumberContent, defaultGenerator: Vh, classNameGenerator: i.weekNumberClassNames, didMount: i.weekNumberDidMount, willUnmount: i.weekNumberWillUnmount },
    t.children
  );
});
function Vh(t) {
  return t.text;
}
const Pn = 10;
class Gh extends T {
  constructor() {
    super(...arguments), this.state = {
      titleId: pn()
    }, this.handleRootEl = (e) => {
      this.rootEl = e, this.props.elRef && re(this.props.elRef, e);
    }, this.handleDocumentMouseDown = (e) => {
      const n = So(e);
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
    return xc(p(
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
    let { isRtl: e } = this.context, { alignmentEl: n, alignGridTop: i } = this.props, { rootEl: r } = this, s = fh(n);
    if (s) {
      let o = r.getBoundingClientRect(), a = i ? U(n, ".fc-scrollgrid").getBoundingClientRect().top : s.top, l = e ? s.right - o.width : s.left;
      a = Math.max(a, Pn), l = Math.min(l, document.documentElement.clientWidth - Pn - o.width), l = Math.max(l, Pn);
      let d = r.offsetParent.getBoundingClientRect();
      lt(r, {
        top: a - d.top,
        left: l - d.left
      });
    }
  }
}
class qh extends se {
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
    return p(Zi, { elRef: this.handleRootEl, date: r, dateProfile: o, todayRange: s }, (l, d, c) => p(
      Gh,
      { elRef: c.ref, id: i.id, title: a, extraClassNames: ["fc-more-popover"].concat(c.className || []), extraAttrs: c, parentEl: i.parentEl, alignmentEl: i.alignmentEl, alignGridTop: i.alignGridTop, onClose: i.onClose },
      Ki(e) && p(l, { elTag: "div", elClasses: ["fc-more-popover-misc"] }),
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
class wa extends T {
  constructor() {
    super(...arguments), this.state = {
      isPopoverOpen: !1,
      popoverId: pn()
    }, this.handleLinkEl = (e) => {
      this.linkEl = e, this.props.elRef && re(this.props.elRef, e);
    }, this.handleClick = (e) => {
      let { props: n, context: i } = this, { moreLinkClick: r } = i.options, s = Jr(n).start;
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
    return p(de.Consumer, null, (i) => {
      let { viewApi: r, options: s, calendarApi: o } = i, { moreLinkText: a } = s, { moreCnt: l } = e, d = Jr(e), c = typeof a == "function" ? a.call(o, l) : `+${l} ${a}`, f = ct(s.moreLinkHint, [l], c), h = {
        num: l,
        shortText: `+${l}`,
        text: c,
        view: r
      };
      return p(
        M,
        null,
        !!e.moreCnt && p(K, { elTag: e.elTag || "a", elRef: this.handleLinkEl, elClasses: [
          ...e.elClasses || [],
          "fc-more-link"
        ], elStyle: e.elStyle, elAttrs: Object.assign(Object.assign(Object.assign({}, e.elAttrs), Do(this.handleClick)), { title: f, "aria-expanded": n.isPopoverOpen, "aria-controls": n.isPopoverOpen ? n.popoverId : "" }), renderProps: h, generatorName: "moreLinkContent", customGenerator: s.moreLinkContent, defaultGenerator: e.defaultGenerator || Yh, classNameGenerator: s.moreLinkClassNames, didMount: s.moreLinkDidMount, willUnmount: s.moreLinkWillUnmount }, e.children),
        n.isPopoverOpen && p(qh, { id: n.popoverId, startDate: d.start, endDate: d.end, dateProfile: e.dateProfile, todayRange: e.todayRange, extraDateSpan: e.extraDateSpan, parentEl: this.parentEl, alignmentEl: e.alignmentElRef ? e.alignmentElRef.current : this.linkEl, alignGridTop: e.alignGridTop, forceTimed: e.forceTimed, onClose: this.handlePopoverClose }, e.popoverContent())
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
    this.linkEl && (this.parentEl = U(this.linkEl, ".fc-view-harness"));
  }
}
function Yh(t) {
  return t.text;
}
function Jr(t) {
  if (t.allDayDate)
    return {
      start: t.allDayDate,
      end: B(t.allDayDate, 1)
    };
  let { hiddenSegs: e } = t;
  return {
    start: Ea(e),
    end: Zh(e)
  };
}
function Ea(t) {
  return t.reduce(Qh).eventRange.range.start;
}
function Qh(t, e) {
  return t.eventRange.range.start < e.eventRange.range.start ? t : e;
}
function Zh(t) {
  return t.reduce(Kh).eventRange.range.end;
}
function Kh(t, e) {
  return t.eventRange.range.end > e.eventRange.range.end ? t : e;
}
const Xh = [], Sa = {
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
}, Aa = Object.assign(Object.assign({}, Sa), {
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
function Jh(t) {
  let e = t.length > 0 ? t[0].code : "en", n = Xh.concat(t), i = {
    en: Aa
  };
  for (let r of n)
    i[r.code] = r;
  return {
    map: i,
    defaultCode: e
  };
}
function Da(t, e) {
  return typeof t == "object" && !Array.isArray(t) ? Ca(t.code, [t.code], t) : ef(t, e);
}
function ef(t, e) {
  let n = [].concat(t || []), i = tf(n, e) || Aa;
  return Ca(t, n, i);
}
function tf(t, e) {
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
function Ca(t, e, n) {
  let i = ki([Sa, n], ["buttonText"]);
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
function ue(t) {
  return {
    id: $e(),
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
function nf(t, e) {
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
      l === void 0 ? (n[a] = o.id, r(o.deps), i = sf(i, o)) : l !== o.id && console.warn(`Duplicate plugin '${a}'`);
    }
  }
  return t && r(t), r(e), i;
}
function rf() {
  let t = [], e = [], n;
  return (i, r) => ((!n || !ye(i, t) || !ye(r, e)) && (n = nf(i, r)), t = i, e = r, n);
}
function sf(t, e) {
  return {
    premiumReleaseDate: of(t.premiumReleaseDate, e.premiumReleaseDate),
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
function of(t, e) {
  return t === void 0 ? e : e === void 0 ? t : new Date(Math.max(t.valueOf(), e.valueOf()));
}
class Se extends yt {
}
Se.prototype.classes = {
  root: "fc-theme-standard",
  tableCellShaded: "fc-cell-shaded",
  buttonGroup: "fc-button-group",
  button: "fc-button fc-button-primary",
  buttonActive: "fc-button-active"
};
Se.prototype.baseIconClass = "fc-icon";
Se.prototype.iconClasses = {
  close: "fc-icon-x",
  prev: "fc-icon-chevron-left",
  next: "fc-icon-chevron-right",
  prevYear: "fc-icon-chevrons-left",
  nextYear: "fc-icon-chevrons-right"
};
Se.prototype.rtlIconClasses = {
  prev: "fc-icon-chevron-right",
  next: "fc-icon-chevron-left",
  prevYear: "fc-icon-chevrons-right",
  nextYear: "fc-icon-chevrons-left"
};
Se.prototype.iconOverrideOption = "buttonIcons";
Se.prototype.iconOverrideCustomButtonOption = "icon";
Se.prototype.iconOverridePrefix = "fc-icon-";
function af(t, e) {
  let n = {}, i;
  for (i in t)
    ii(i, n, t, e);
  for (i in e)
    ii(i, n, t, e);
  return n;
}
function ii(t, e, n, i) {
  if (e[t])
    return e[t];
  let r = lf(t, e, n, i);
  return r && (e[t] = r), r;
}
function lf(t, e, n, i) {
  let r = n[t], s = i[t], o = (c) => r && r[c] !== null ? r[c] : s && s[c] !== null ? s[c] : null, a = o("component"), l = o("superType"), d = null;
  if (l) {
    if (l === t)
      throw new Error("Can't have a custom view type that references itself");
    d = ii(l, e, n, i);
  }
  return !a && d && (a = d.component), a ? {
    type: t,
    component: a,
    defaults: Object.assign(Object.assign({}, d ? d.defaults : {}), r ? r.rawOptions : {}),
    overrides: Object.assign(Object.assign({}, d ? d.overrides : {}), s ? s.rawOptions : {})
  } : null;
}
function es(t) {
  return le(t, cf);
}
function cf(t) {
  let e = typeof t == "function" ? { component: t } : t, { component: n } = e;
  return e.content ? n = ts(e) : n && !(n.prototype instanceof T) && (n = ts(Object.assign(Object.assign({}, e), { content: n }))), {
    superType: e.type,
    component: n,
    rawOptions: e
    // includes type and component too :(
  };
}
function ts(t) {
  return (e) => p(de.Consumer, null, (n) => p(K, { elTag: "div", elClasses: Oo(n.viewSpec), renderProps: Object.assign(Object.assign({}, e), { nextDayThreshold: n.options.nextDayThreshold }), generatorName: void 0, customGenerator: t.content, classNameGenerator: t.classNames, didMount: t.didMount, willUnmount: t.willUnmount }));
}
function df(t, e, n, i) {
  let r = es(t), s = es(e.views), o = af(r, s);
  return le(o, (a) => uf(a, s, e, n, i));
}
function uf(t, e, n, i, r) {
  let s = t.overrides.duration || t.defaults.duration || i.duration || n.duration, o = null, a = "", l = "", d = {};
  if (s && (o = hf(s), o)) {
    let h = Qn(o);
    a = h.unit, h.value === 1 && (l = a, d = e[a] ? e[a].rawOptions : {});
  }
  let c = (h) => {
    let u = h.buttonText || {}, g = t.defaults.buttonTextKey;
    return g != null && u[g] != null ? u[g] : u[t.type] != null ? u[t.type] : u[l] != null ? u[l] : null;
  }, f = (h) => {
    let u = h.buttonHints || {}, g = t.defaults.buttonTextKey;
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
    buttonTextDefault: c(r) || t.defaults.buttonText || c(dt) || t.type,
    // not DRY
    buttonTitleOverride: f(i) || f(n) || t.overrides.buttonHint,
    buttonTitleDefault: f(r) || t.defaults.buttonHint || f(dt)
    // will eventually fall back to buttonText
  };
}
let ns = {};
function hf(t) {
  let e = JSON.stringify(t), n = ns[e];
  return n === void 0 && (n = x(t), ns[e] = n), n;
}
function ff(t, e) {
  return e.type === "CHANGE_VIEW_TYPE" && (t = e.viewType), t;
}
function pf(t, e) {
  return e.type === "CHANGE_DATE" ? e.dateMarker : t;
}
function gf(t, e, n) {
  let i = t.initialDate;
  return i != null ? e.createMarker(i) : n.getDateMarker();
}
function mf(t, e) {
  return e.type === "SET_OPTION" ? Object.assign(Object.assign({}, t), { [e.optionName]: e.rawOptionValue }) : t;
}
function vf(t, e, n, i) {
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
function bf(t, e, n) {
  let i = e ? e.activeRange : null;
  return _a({}, Cf(t, n), i, n);
}
function yf(t, e, n, i) {
  let r = n ? n.activeRange : null;
  switch (e.type) {
    case "ADD_EVENT_SOURCES":
      return _a(t, e.sources, r, i);
    case "REMOVE_EVENT_SOURCE":
      return Ef(t, e.sourceId);
    case "PREV":
    // TODO: how do we track all actions that affect dateProfile :(
    case "NEXT":
    case "CHANGE_DATE":
    case "CHANGE_VIEW_TYPE":
      return n ? Ra(t, r, i) : t;
    case "FETCH_EVENT_SOURCES":
      return Xi(t, e.sourceIds ? (
        // why no type?
        Ro(e.sourceIds)
      ) : Ta(t, i), r, e.isRefetch || !1, i);
    case "RECEIVE_EVENTS":
    case "RECEIVE_EVENT_ERROR":
      return Df(t, e.sourceId, e.fetchId, e.fetchRange);
    case "REMOVE_ALL_EVENT_SOURCES":
      return {};
    default:
      return t;
  }
}
function wf(t, e, n) {
  let i = e ? e.activeRange : null;
  return Xi(t, Ta(t, n), i, !0, n);
}
function xa(t) {
  for (let e in t)
    if (t[e].isFetching)
      return !0;
  return !1;
}
function _a(t, e, n, i) {
  let r = {};
  for (let s of e)
    r[s.sourceId] = s;
  return n && (r = Ra(r, n, i)), Object.assign(Object.assign({}, t), r);
}
function Ef(t, e) {
  return Ie(t, (n) => n.sourceId !== e);
}
function Ra(t, e, n) {
  return Xi(t, Ie(t, (i) => Sf(i, e, n)), e, !1, n);
}
function Sf(t, e, n) {
  return ka(t, n) ? !n.options.lazyFetching || !t.fetchRange || t.isFetching || // always cancel outdated in-progress fetches
  e.start < t.fetchRange.start || e.end > t.fetchRange.end : !t.latestFetchId;
}
function Xi(t, e, n, i, r) {
  let s = {};
  for (let o in t) {
    let a = t[o];
    e[o] ? s[o] = Af(a, n, i, r) : s[o] = a;
  }
  return s;
}
function Af(t, e, n, i) {
  let { options: r, calendarApi: s } = i, o = i.pluginHooks.eventSourceDefs[t.sourceDefId], a = $e();
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
function Df(t, e, n, i) {
  let r = t[e];
  return r && // not already removed
  n === r.latestFetchId ? Object.assign(Object.assign({}, t), { [e]: Object.assign(Object.assign({}, r), { isFetching: !1, fetchRange: i }) }) : t;
}
function Ta(t, e) {
  return Ie(t, (n) => ka(n, e));
}
function Cf(t, e) {
  let n = Fo(e), i = [].concat(t.eventSources || []), r = [];
  t.initialEvents && i.unshift(t.initialEvents), t.events && i.unshift(t.events);
  for (let s of i) {
    let o = Uo(s, e, n);
    o && r.push(o);
  }
  return r;
}
function ka(t, e) {
  return !e.pluginHooks.eventSourceDefs[t.sourceDefId].ignoreRange;
}
function xf(t, e) {
  switch (e.type) {
    case "UNSELECT_DATES":
      return null;
    case "SELECT_DATES":
      return e.selection;
    default:
      return t;
  }
}
function _f(t, e) {
  switch (e.type) {
    case "UNSELECT_EVENT":
      return "";
    case "SELECT_EVENT":
      return e.eventInstanceId;
    default:
      return t;
  }
}
function Rf(t, e) {
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
function Tf(t, e) {
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
function kf(t, e, n, i, r) {
  let s = t.headerToolbar ? is(t.headerToolbar, t, e, n, i, r) : null, o = t.footerToolbar ? is(t.footerToolbar, t, e, n, i, r) : null;
  return { header: s, footer: o };
}
function is(t, e, n, i, r, s) {
  let o = {}, a = [], l = !1;
  for (let d in t) {
    let c = t[d], f = Mf(c, e, n, i, r, s);
    o[d] = f.widgets, a.push(...f.viewsWithButtons), l = l || f.hasTitle;
  }
  return { sectionWidgets: o, viewsWithButtons: a, hasTitle: l };
}
function Mf(t, e, n, i, r, s) {
  let o = e.direction === "rtl", a = e.customButtons || {}, l = n.buttonText || {}, d = e.buttonText || {}, c = n.buttonHints || {}, f = e.buttonHints || {}, h = t ? t.split(" ") : [], u = [], g = !1;
  return { widgets: h.map((b) => b.split(",").map((w) => {
    if (w === "title")
      return g = !0, { buttonName: w };
    let E, D, C, P, k, O;
    if (E = a[w])
      C = (_) => {
        E.click && E.click.call(_.target, _, _.target);
      }, (P = i.getCustomButtonIconClass(E)) || (P = i.getIconClass(w, o)) || (k = E.text), O = E.hint || E.text;
    else if (D = r[w]) {
      u.push(w), C = () => {
        s.changeView(w);
      }, (k = D.buttonTextOverride) || (P = i.getIconClass(w, o)) || (k = D.buttonTextDefault);
      let _ = D.buttonTextOverride || D.buttonTextDefault;
      O = ct(
        D.buttonTitleOverride || D.buttonTitleDefault || e.viewHint,
        [_, w],
        // view-name = buttonName
        _
      );
    } else if (s[w])
      if (C = () => {
        s[w]();
      }, (k = l[w]) || (P = i.getIconClass(w, o)) || (k = d[w]), w === "prevYear" || w === "nextYear") {
        let _ = w === "prevYear" ? "prev" : "next";
        O = ct(c[_] || f[_], [
          d.year || "year",
          "year"
        ], d[w]);
      } else
        O = (_) => ct(c[w] || f[w], [
          d[_] || _,
          _
        ], d[w]);
    return { buttonName: w, buttonClick: C, buttonIcon: P, buttonText: k, buttonHint: O };
  })), viewsWithButtons: u, hasTitle: g };
}
class If {
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
let Of = {
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
const Nf = ue({
  name: "array-event-source",
  eventSourceDefs: [Of]
});
let $f = {
  parseMeta(t) {
    return typeof t.events == "function" ? t.events : null;
  },
  fetch(t, e, n) {
    const { dateEnv: i } = t.context, r = t.eventSource.meta;
    Gu(r.bind(null, Xo(t.range, i)), (s) => e({ rawEvents: s }), n);
  }
};
const Pf = ue({
  name: "func-event-source",
  eventSourceDefs: [$f]
}), Hf = {
  method: String,
  extraParams: v,
  startParam: String,
  endParam: String,
  timeZoneParam: String
};
let zf = {
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
    const { meta: i } = t.eventSource, r = Lf(i, t.range, t.context);
    qu(i.method, i.url, r).then(([s, o]) => {
      e({ rawEvents: s, response: o });
    }, n);
  }
};
const Bf = ue({
  name: "json-event-source",
  eventSourceRefiners: Hf,
  eventSourceDefs: [zf]
});
function Lf(t, e, n) {
  let { dateEnv: i, options: r } = n, s, o, a, l, d = {};
  return s = t.startParam, s == null && (s = r.startParam), o = t.endParam, o == null && (o = r.endParam), a = t.timeZoneParam, a == null && (a = r.timeZoneParam), typeof t.extraParams == "function" ? l = t.extraParams() : l = t.extraParams || {}, Object.assign(d, l), d[s] = i.formatIso(e.start), d[o] = i.formatIso(e.end), i.timeZone !== "local" && (d[a] = i.timeZone), d;
}
const Uf = {
  daysOfWeek: v,
  startTime: x,
  endTime: x,
  duration: x,
  startRecur: v,
  endRecur: v
};
let Ff = {
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
      return t.duration && (i = t.duration), !i && t.startTime && t.endTime && (i = rd(t.endTime, t.startTime)), {
        allDayGuess: !t.startTime && !t.endTime,
        duration: i,
        typeData: n
        // doesn't need endTime anymore but oh well
      };
    }
    return null;
  },
  expand(t, e, n) {
    let i = Oe(e, { start: t.startRecur, end: t.endRecur });
    return i ? Wf(t.daysOfWeek, t.startTime, t.dateEnv, n, i) : [];
  }
};
const jf = ue({
  name: "simple-recurring-event",
  recurringTypes: [Ff],
  eventRefiners: Uf
});
function Wf(t, e, n, i, r) {
  let s = t ? Ro(t) : null, o = I(r.start), a = r.end, l = [];
  for (e && (e.milliseconds < 0 ? a = B(a, 1) : e.milliseconds >= 1e3 * 60 * 60 * 24 && (o = B(o, -1))); o < a; ) {
    let d;
    (!s || s[o.getUTCDay()]) && (e ? d = i.add(o, e) : d = o, l.push(i.createMarker(n.toDate(d)))), o = B(o, 1);
  }
  return l;
}
const Vf = ue({
  name: "change-handler",
  optionChangeHandlers: {
    events(t, e) {
      rs([t], e);
    },
    eventSources: rs
  }
});
function rs(t, e) {
  let n = Mi(e.getCurrentData().eventSources);
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
function Gf(t, e) {
  e.emitter.trigger("datesSet", Object.assign(Object.assign({}, Xo(t.activeRange, e.dateEnv)), { view: e.viewApi }));
}
function qf(t, e) {
  let { emitter: n } = e;
  n.hasHandlers("eventsSet") && n.trigger("eventsSet", Re(t, e));
}
const Yf = [
  Nf,
  Pf,
  Bf,
  jf,
  Vf,
  ue({
    name: "misc",
    isLoadingFuncs: [
      (t) => xa(t.eventSources)
    ],
    propSetHandlers: {
      dateProfile: Gf,
      eventStore: qf
    }
  })
];
class Qf {
  constructor(e, n) {
    this.runTaskOption = e, this.drainedOption = n, this.queue = [], this.delayedRunner = new Si(this.drain.bind(this));
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
function Zf(t, e, n) {
  let i;
  return /^(year|month)$/.test(t.currentRangeUnit) ? i = t.currentRange : i = t.activeRange, n.formatRange(i.start, i.end, $(e.titleFormat || Kf(t)), {
    isEndExclusive: t.isRangeAllDay,
    defaultSeparator: e.titleRangeSeparator
  });
}
function Kf(t) {
  let { currentRangeUnit: e } = t;
  if (e === "year")
    return { year: "numeric" };
  if (e === "month")
    return { year: "numeric", month: "long" };
  let n = Vt(t.currentRange.start, t.currentRange.end);
  return n !== null && n > 1 ? { year: "numeric", month: "short", day: "numeric" } : { year: "numeric", month: "long", day: "numeric" };
}
class ss {
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
class Xf {
  constructor(e) {
    this.computeCurrentViewData = A(this._computeCurrentViewData), this.organizeRawLocales = A(Jh), this.buildLocale = A(Da), this.buildPluginHooks = rf(), this.buildDateEnv = A(Jf), this.buildTheme = A(ep), this.parseToolbars = A(kf), this.buildViewSpecs = A(df), this.buildDateProfileGenerator = $t(tp), this.buildViewApi = A(np), this.buildViewUiProps = $t(sp), this.buildEventUiBySource = A(ip, ee), this.buildEventUiBases = A(rp), this.parseContextBusinessHours = $t(op), this.buildTitle = A(Zf), this.nowManager = new ss(), this.emitter = new bn(), this.actionRunner = new Qf(this._handleAction.bind(this), this.updateData.bind(this)), this.currentCalendarOptionsInput = {}, this.currentCalendarOptionsRefined = {}, this.currentViewOptionsInput = {}, this.currentViewOptionsRefined = {}, this.currentCalendarOptionsRefiners = {}, this.optionsForRefining = [], this.optionsForHandling = [], this.getCurrentData = () => this.data, this.dispatch = (h) => {
      this.actionRunner.request(h);
    }, this.props = e, this.actionRunner.pause(), this.nowManager = new ss();
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
    }, a = gf(i.calendarOptions, i.dateEnv, this.nowManager), l = s.dateProfileGenerator.build(a);
    ae(l.activeRange, a) || (a = l.currentRange.start);
    for (let h of i.pluginHooks.contextInit)
      h(o);
    let d = bf(i.calendarOptions, l, o), c = {
      dynamicOptionOverrides: n,
      currentViewType: r,
      currentDate: a,
      dateProfile: l,
      businessHours: this.parseContextBusinessHours(o),
      eventSources: d,
      eventUiBases: {},
      eventStore: Q(),
      renderableEventStore: Q(),
      dateSelection: null,
      eventSelection: "",
      eventDrag: null,
      eventResize: null,
      selectionConfig: this.buildViewUiProps(o).selectionConfig
    }, f = Object.assign(Object.assign({}, o), c);
    for (let h of i.pluginHooks.reducers)
      Object.assign(c, h(null, null, f));
    Hn(c, o) && this.emitter.trigger("loading", !0), this.state = c, this.updateData(), this.actionRunner.resume();
  }
  resetOptions(e, n) {
    let { props: i } = this;
    n === void 0 ? i.optionOverrides = e : (i.optionOverrides = Object.assign(Object.assign({}, i.optionOverrides || {}), e), this.optionsForRefining.push(...n)), (n === void 0 || n.length) && this.actionRunner.request({
      type: "NOTHING"
    });
  }
  _handleAction(e) {
    let { props: n, state: i, emitter: r } = this, s = mf(i.dynamicOptionOverrides, e), o = this.computeOptionsData(n.optionOverrides, s, n.calendarApi), a = ff(i.currentViewType, e), l = this.computeCurrentViewData(a, o, n.optionOverrides, s);
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
    }, { currentDate: c, dateProfile: f } = i;
    this.data && this.data.dateProfileGenerator !== l.dateProfileGenerator && (f = l.dateProfileGenerator.build(c)), c = pf(c, e), f = vf(f, e, c, l.dateProfileGenerator), (e.type === "PREV" || // TODO: move this logic into DateProfileGenerator
    e.type === "NEXT" || // "
    !ae(f.currentRange, c)) && (c = f.currentRange.start);
    let h = yf(i.eventSources, e, f, d), u = yu(i.eventStore, e, h, f, d), m = xa(h) && !l.options.progressiveEventRendering && i.renderableEventStore || u, { eventUiSingleBase: b, selectionConfig: w } = this.buildViewUiProps(d), E = this.buildEventUiBySource(h), D = this.buildEventUiBases(m.defs, b, E), C = {
      dynamicOptionOverrides: s,
      currentViewType: a,
      currentDate: c,
      dateProfile: f,
      eventSources: h,
      eventStore: u,
      renderableEventStore: m,
      selectionConfig: w,
      eventUiBases: D,
      businessHours: this.parseContextBusinessHours(d),
      dateSelection: xf(i.dateSelection, e),
      eventSelection: _f(i.eventSelection, e),
      eventDrag: Rf(i.eventDrag, e),
      eventResize: Tf(i.eventResize, e)
    }, P = Object.assign(Object.assign({}, d), C);
    for (let _ of o.pluginHooks.reducers)
      Object.assign(C, _(i, e, P));
    let k = Hn(i, d), O = Hn(C, d);
    !k && O ? r.trigger("loading", !0) : k && !O && r.trigger("loading", !1), this.state = C, n.onAction && n.onAction(e);
  }
  updateData() {
    let { props: e, state: n } = this, i = this.data, r = this.computeOptionsData(e.optionOverrides, n.dynamicOptionOverrides, e.calendarApi), s = this.computeCurrentViewData(n.currentViewType, r, e.optionOverrides, n.dynamicOptionOverrides), o = this.data = Object.assign(Object.assign(Object.assign({ nowManager: this.nowManager, viewTitle: this.buildTitle(n.dateProfile, s.options, r.dateEnv), calendarApi: e.calendarApi, dispatch: this.dispatch, emitter: this.emitter, getCurrentData: this.getCurrentData }, r), s), n), a = r.pluginHooks.optionChangeHandlers, l = i && i.calendarOptions, d = r.calendarOptions;
    if (l && l !== d) {
      l.timeZone !== d.timeZone && (n.eventSources = o.eventSources = wf(o.eventSources, n.dateProfile, o), n.eventStore = o.eventStore = Yr(o.eventStore, i.dateEnv, o.dateEnv), n.renderableEventStore = o.renderableEventStore = Yr(o.renderableEventStore, i.dateEnv, o.dateEnv));
      for (let c in a)
        (this.optionsForHandling.indexOf(c) !== -1 || l[c] !== d[c]) && a[c](d[c], o);
    }
    this.optionsForHandling = [], e.onData && e.onData(o);
  }
  computeOptionsData(e, n, i) {
    if (!this.optionsForRefining.length && e === this.stableOptionOverrides && n === this.stableDynamicOptionOverrides)
      return this.stableCalendarOptionsData;
    let { refinedOptions: r, pluginHooks: s, localeDefaults: o, availableLocaleData: a, extra: l } = this.processRawCalendarOptions(e, n);
    os(l);
    let d = this.buildDateEnv(r.timeZone, r.locale, r.weekNumberCalculation, r.firstDay, r.weekText, s, a, r.defaultRangeSeparator), c = this.buildViewSpecs(s.views, this.stableOptionOverrides, this.stableDynamicOptionOverrides, o), f = this.buildTheme(r, s), h = this.parseToolbars(r, this.stableOptionOverrides, f, c, i);
    return this.stableCalendarOptionsData = {
      calendarOptions: r,
      pluginHooks: s,
      dateEnv: d,
      viewSpecs: c,
      theme: f,
      toolbarConfig: h,
      localeDefaults: o,
      availableRawLocales: a.map
    };
  }
  // always called from behind a memoizer
  processRawCalendarOptions(e, n) {
    let { locales: i, locale: r } = Rn([
      dt,
      e,
      n
    ]), s = this.organizeRawLocales(i), o = s.map, a = this.buildLocale(r || s.defaultCode, o).options, l = this.buildPluginHooks(e.plugins || [], Yf), d = this.currentCalendarOptionsRefiners = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Fr), jr), Wr), l.listenerRefiners), l.optionRefiners), c = {}, f = Rn([
      dt,
      a,
      e,
      n
    ]), h = {}, u = this.currentCalendarOptionsInput, g = this.currentCalendarOptionsRefined, m = !1;
    for (let b in f)
      this.optionsForRefining.indexOf(b) === -1 && (f[b] === u[b] || De[b] && b in u && De[b](u[b], f[b])) ? h[b] = g[b] : d[b] ? (h[b] = d[b](f[b]), m = !0) : c[b] = u[b];
    return m && (this.currentCalendarOptionsInput = f, this.currentCalendarOptionsRefined = h, this.stableOptionOverrides = e, this.stableDynamicOptionOverrides = n), this.optionsForHandling.push(...this.optionsForRefining), this.optionsForRefining = [], {
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
    os(a), this.nowManager.handleInput(n.dateEnv, o.now);
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
    let o = Rn([
      dt,
      e.optionDefaults,
      i,
      r,
      e.optionOverrides,
      s
    ]), a = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, Fr), jr), Wr), Hd), n.listenerRefiners), n.optionRefiners), l = {}, d = this.currentViewOptionsInput, c = this.currentViewOptionsRefined, f = !1, h = {};
    for (let u in o)
      o[u] === d[u] || De[u] && De[u](o[u], d[u]) ? l[u] = c[u] : (o[u] === this.currentCalendarOptionsInput[u] || De[u] && De[u](o[u], this.currentCalendarOptionsInput[u]) ? u in this.currentCalendarOptionsRefined && (l[u] = this.currentCalendarOptionsRefined[u]) : a[u] ? l[u] = a[u](o[u]) : h[u] = o[u], f = !0);
    return f && (this.currentViewOptionsInput = o, this.currentViewOptionsRefined = l), {
      rawOptions: this.currentViewOptionsInput,
      refinedOptions: this.currentViewOptionsRefined,
      extra: h
    };
  }
}
function Jf(t, e, n, i, r, s, o, a) {
  let l = Da(e || o.defaultCode, o.map);
  return new Yd({
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
function ep(t, e) {
  let n = e.themeClasses[t.themeSystem] || Se;
  return new n(t);
}
function tp(t) {
  let e = t.dateProfileGeneratorClass || Po;
  return new e(t);
}
function np(t, e, n) {
  return new If(t, e, n);
}
function ip(t) {
  return le(t, (e) => e.ui);
}
function rp(t, e, n) {
  let i = { "": e };
  for (let r in t) {
    let s = t[r];
    s.sourceId && n[s.sourceId] && (i[r] = n[s.sourceId]);
  }
  return i;
}
function sp(t) {
  let { options: e } = t;
  return {
    eventUiSingleBase: Xt({
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
    selectionConfig: Xt({
      constraint: e.selectConstraint,
      overlap: typeof e.selectOverlap == "boolean" ? e.selectOverlap : void 0,
      allow: e.selectAllow
    }, t)
  };
}
function Hn(t, e) {
  for (let n of e.pluginHooks.isLoadingFuncs)
    if (n(t))
      return !0;
  return !1;
}
function op(t) {
  return Ru(t.options.businessHours, t);
}
function os(t, e) {
  for (let n in t)
    console.warn(`Unknown option '${n}'`);
}
class ap extends T {
  render() {
    let e = this.props.widgetGroups.map((n) => this.renderWidgetGroup(n));
    return p("div", { className: "fc-toolbar-chunk" }, ...e);
  }
  renderWidgetGroup(e) {
    let { props: n } = this, { theme: i } = this.context, r = [], s = !0;
    for (let o of e) {
      let { buttonName: a, buttonClick: l, buttonText: d, buttonIcon: c, buttonHint: f } = o;
      if (a === "title")
        s = !1, r.push(p("h2", { className: "fc-toolbar-title", id: n.titleId }, n.title));
      else {
        let h = a === n.activeButton, u = !n.isTodayEnabled && a === "today" || !n.isPrevEnabled && a === "prev" || !n.isNextEnabled && a === "next", g = [`fc-${a}-button`, i.getClass("button")];
        h && g.push(i.getClass("buttonActive")), r.push(p("button", { type: "button", title: typeof f == "function" ? f(n.navUnit) : f, disabled: u, "aria-pressed": h, className: g.join(" "), onClick: l }, d || (c ? p("span", { className: c, role: "img" }) : "")));
      }
    }
    if (r.length > 1) {
      let o = s && i.getClass("buttonGroup") || "";
      return p("div", { className: o }, ...r);
    }
    return r[0];
  }
}
class as extends T {
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
    return p(ap, { key: e, widgetGroups: n, title: i.title, navUnit: i.navUnit, activeButton: i.activeButton, isTodayEnabled: i.isTodayEnabled, isPrevEnabled: i.isPrevEnabled, isNextEnabled: i.isNextEnabled, titleId: i.titleId });
  }
}
class lp extends T {
  constructor() {
    super(...arguments), this.state = {
      availableWidth: null
    }, this.handleEl = (e) => {
      this.el = e, re(this.props.elRef, e), this.updateAvailableWidth();
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
class cp extends et {
  constructor(e) {
    super(e), this.handleSegClick = (n, i) => {
      let { component: r } = this, { context: s } = r, o = Ke(i);
      if (o && // might be the <div> surrounding the more link
      r.isValidSegDownEl(n.target)) {
        let a = U(n.target, ".fc-event-forced-url"), l = a ? a.querySelector("a[href]").href : "";
        s.emitter.trigger("eventClick", {
          el: i,
          event: new N(r.context, o.eventRange.def, o.eventRange.instance),
          jsEvent: n,
          view: s.viewApi
        }), l && !n.defaultPrevented && (window.location.href = l);
      }
    }, this.destroy = Ao(
      e.el,
      "click",
      ".fc-event",
      // on both fg and bg events
      this.handleSegClick
    );
  }
}
class dp extends et {
  constructor(e) {
    super(e), this.handleEventElRemove = (n) => {
      n === this.currentSegEl && this.handleSegLeave(null, this.currentSegEl);
    }, this.handleSegEnter = (n, i) => {
      Ke(i) && (this.currentSegEl = i, this.triggerEvent("eventMouseEnter", n, i));
    }, this.handleSegLeave = (n, i) => {
      this.currentSegEl && (this.currentSegEl = null, this.triggerEvent("eventMouseLeave", n, i));
    }, this.removeHoverListeners = jc(
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
    let { component: r } = this, { context: s } = r, o = Ke(i);
    (!n || r.isValidSegDownEl(n.target)) && s.emitter.trigger(e, {
      el: i,
      event: new N(s, o.eventRange.def, o.eventRange.instance),
      jsEvent: n,
      view: s.viewApi
    });
  }
}
class up extends He {
  constructor() {
    super(...arguments), this.buildViewContext = A(Kd), this.buildViewPropTransformers = A(fp), this.buildToolbarProps = A(hp), this.headerRef = F(), this.footerRef = F(), this.interactionsStore = {}, this.state = {
      viewLabelId: pn()
    }, this.registerInteractiveComponent = (e, n) => {
      let i = Zu(e, n), o = [
        cp,
        dp
      ].concat(this.props.pluginHooks.componentInteractions).map((a) => new a(i));
      this.interactionsStore[e.uid] = o, Jn[e.uid] = i;
    }, this.unregisterInteractiveComponent = (e) => {
      let n = this.interactionsStore[e.uid];
      if (n) {
        for (let i of n)
          i.destroy();
        delete this.interactionsStore[e.uid];
      }
      delete Jn[e.uid];
    }, this.resizeRunner = new Si(() => {
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
      de.Provider,
      { value: a },
      p(tt, { unit: "day" }, (d) => {
        let c = this.buildToolbarProps(e.viewSpec, e.dateProfile, e.dateProfileGenerator, e.currentDate, d, e.viewTitle);
        return p(
          M,
          null,
          n.header && p(as, Object.assign({ ref: this.headerRef, extraClassName: "fc-header-toolbar", model: n.header, titleId: l }, c)),
          p(
            lp,
            { liquid: r, height: s, aspectRatio: o, labeledById: l },
            this.renderView(e),
            this.buildAppendContent()
          ),
          n.footer && p(as, Object.assign({ ref: this.footerRef, extraClassName: "fc-footer-toolbar", model: n.footer, titleId: "" }, c))
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
    return p(M, {}, ...n);
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
function hp(t, e, n, i, r, s) {
  let o = n.build(r, void 0, !1), a = n.buildPrev(e, i, !1), l = n.buildNext(e, i, !1);
  return {
    title: s,
    activeButton: t.type,
    navUnit: t.singleUnit,
    isTodayEnabled: o.isValid && !ae(e.currentRange, r),
    isPrevEnabled: a.isValid,
    isNextEnabled: l.isValid
  };
}
function fp(t) {
  return t.map((e) => new e());
}
class pp extends Xu {
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
        Qt(() => {
          pt(p(Qu, { options: i.calendarOptions, theme: i.theme, emitter: i.emitter }, (r, s, o, a) => (this.setClassNames(r), this.setHeight(s), p(
            Io.Provider,
            { value: this.customContentRenderId },
            p(up, Object.assign({ isHeightAuto: o, forPrint: a }, i))
          ))), this.el);
        });
      } else this.isRendered && (this.isRendered = !1, pt(null, this.el), this.setClassNames([]), this.setHeight(""));
    }, Nc(e), this.el = e, this.renderRunner = new Si(this.handleRenderRequest), new Xf({
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
    Qt(() => {
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
    if (!ye(e, this.currentClassNames)) {
      let { classList: n } = this.el;
      for (let i of this.currentClassNames)
        n.remove(i);
      for (let i of e)
        n.add(i);
      this.currentClassNames = e;
    }
  }
  setHeight(e) {
    Eo(this.el, "height", e);
  }
}
function zn(t) {
  return t === "Tag" || t === "Monat" ? "r" : t === "Jahr" ? "s" : "";
}
var gp = {
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
      return `Vorherige${zn(t)} ${t}`;
    },
    next(t) {
      return `Nächste${zn(t)} ${t}`;
    },
    today(t) {
      return t === "Tag" ? "Heute" : `Diese${zn(t)} ${t}`;
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
class mp extends se {
  constructor() {
    super(...arguments), this.headerElRef = F();
  }
  renderSimpleLayout(e, n) {
    let { props: i, context: r } = this, s = [], o = tn(r.options);
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
      Zt,
      { elClasses: ["fc-daygrid"], viewSpec: r.viewSpec },
      p(Gi, { liquid: !i.isHeightAuto && !i.forPrint, collapsibleWidth: i.forPrint, cols: [], sections: s })
    );
  }
  renderHScrollLayout(e, n, i, r) {
    let s = this.context.pluginHooks.scrollGridImpl;
    if (!s)
      throw new Error("No ScrollGrid implementation");
    let { props: o, context: a } = this, l = !o.forPrint && tn(a.options), d = !o.forPrint && ma(a.options), c = [];
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
        content: ni
      }]
    }), p(
      Zt,
      { elClasses: ["fc-daygrid"], viewSpec: a.viewSpec },
      p(s, { liquid: !o.isHeightAuto && !o.forPrint, forPrint: o.forPrint, collapsibleWidth: o.forPrint, colGroups: [{ cols: [{ span: i, minWidth: r }] }], sections: c })
    );
  }
}
function Ht(t, e) {
  let n = [];
  for (let i = 0; i < e; i += 1)
    n[i] = [];
  for (let i of t)
    n[i.row].push(i);
  return n;
}
function Rt(t, e) {
  let n = [];
  for (let i = 0; i < e; i += 1)
    n[i] = [];
  for (let i of t)
    n[i.firstCol].push(i);
  return n;
}
function ls(t, e) {
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
const Ma = $({
  hour: "numeric",
  minute: "2-digit",
  omitZeroMinute: !0,
  meridiem: "narrow"
});
function Ia(t) {
  let { display: e } = t.eventRange.ui;
  return e === "list-item" || e === "auto" && !t.eventRange.def.allDay && t.firstCol === t.lastCol && // can't be multi-day
  t.isStart && // "
  t.isEnd;
}
class Oa extends T {
  render() {
    let { props: e } = this;
    return p(Yi, Object.assign({}, e, { elClasses: ["fc-daygrid-event", "fc-daygrid-block-event", "fc-h-event"], defaultTimeFormat: Ma, defaultDisplayEventEnd: e.defaultDisplayEventEnd, disableResizing: !e.seg.eventRange.def.allDay }));
  }
}
class Na extends T {
  render() {
    let { props: e, context: n } = this, { options: i } = n, { seg: r } = e, s = i.eventTimeFormat || Ma, o = Qo(r, s, n, !0, e.defaultDisplayEventEnd);
    return p(qi, Object.assign({}, e, { elTag: "a", elClasses: ["fc-daygrid-event", "fc-daygrid-dot-event"], elAttrs: Ko(e.seg, n), defaultGenerator: vp, timeText: o, isResizing: !1, isDateSelecting: !1 }));
  }
}
function vp(t) {
  return p(
    M,
    null,
    p("div", { className: "fc-daygrid-event-dot", style: { borderColor: t.borderColor || t.backgroundColor } }),
    t.timeText && p("div", { className: "fc-event-time" }, t.timeText),
    p("div", { className: "fc-event-title" }, t.event.title || p(M, null, " "))
  );
}
class bp extends T {
  constructor() {
    super(...arguments), this.compileSegs = A(yp);
  }
  render() {
    let { props: e } = this, { allSegs: n, invisibleSegs: i } = this.compileSegs(e.singlePlacements);
    return p(wa, { elClasses: ["fc-daygrid-more-link"], dateProfile: e.dateProfile, todayRange: e.todayRange, allDayDate: e.allDayDate, moreCnt: e.moreCnt, allSegs: n, hiddenSegs: i, alignmentElRef: e.alignmentElRef, alignGridTop: e.alignGridTop, extraDateSpan: e.extraDateSpan, popoverContent: () => {
      let r = (e.eventDrag ? e.eventDrag.affectedInstances : null) || (e.eventResize ? e.eventResize.affectedInstances : null) || {};
      return p(M, null, n.map((s) => {
        let o = s.eventRange.instance.instanceId;
        return p("div", { className: "fc-daygrid-event-harness", key: o, style: {
          visibility: r[o] ? "hidden" : ""
        } }, Ia(s) ? p(Na, Object.assign({ seg: s, isDragging: !1, isSelected: o === e.eventSelection, defaultDisplayEventEnd: !1 }, be(s, e.todayRange))) : p(Oa, Object.assign({ seg: s, isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: o === e.eventSelection, defaultDisplayEventEnd: !1 }, be(s, e.todayRange))));
      }));
    } });
  }
}
function yp(t) {
  let e = [], n = [];
  for (let i of t)
    e.push(i.seg), i.isVisible || n.push(i.seg);
  return { allSegs: e, invisibleSegs: n };
}
const wp = $({ week: "narrow" });
class Ep extends se {
  constructor() {
    super(...arguments), this.rootElRef = F(), this.state = {
      dayNumberId: pn()
    }, this.handleRootEl = (e) => {
      re(this.rootElRef, e), re(this.props.elRef, e);
    };
  }
  render() {
    let { context: e, props: n, state: i, rootElRef: r } = this, { options: s, dateEnv: o } = e, { date: a, dateProfile: l } = n;
    const d = n.showDayNumber && Ap(a, l.currentRange, o);
    return p(Zi, { elTag: "td", elRef: this.handleRootEl, elClasses: [
      "fc-daygrid-day",
      ...n.extraClassNames || []
    ], elAttrs: Object.assign(Object.assign(Object.assign({}, n.extraDataAttrs), n.showDayNumber ? { "aria-labelledby": i.dayNumberId } : {}), { role: "gridcell" }), defaultGenerator: Sp, date: a, dateProfile: l, todayRange: n.todayRange, showDayNumber: n.showDayNumber, isMonthStart: d, extraRenderProps: n.extraRenderProps }, (c, f) => p(
      "div",
      { ref: n.innerElRef, className: "fc-daygrid-day-frame fc-scrollgrid-sync-inner", style: { minHeight: n.minHeight } },
      n.showWeekNumber && p(ya, { elTag: "a", elClasses: ["fc-daygrid-week-number"], elAttrs: en(e, a, "week"), date: a, defaultFormat: wp }),
      !f.isDisabled && (n.showDayNumber || Ki(s) || n.forceDayTop) ? p(
        "div",
        { className: "fc-daygrid-day-top" },
        p(c, { elTag: "a", elClasses: [
          "fc-daygrid-day-number",
          d && "fc-daygrid-month-start"
        ], elAttrs: Object.assign(Object.assign({}, en(e, a)), { id: i.dayNumberId }) })
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
          p(bp, { allDayDate: a, singlePlacements: n.singlePlacements, moreCnt: n.moreCnt, alignmentElRef: r, alignGridTop: !n.showDayNumber, extraDateSpan: n.extraDateSpan, dateProfile: n.dateProfile, eventSelection: n.eventSelection, eventDrag: n.eventDrag, eventResize: n.eventResize, todayRange: n.todayRange })
        )
      ),
      p("div", { className: "fc-daygrid-day-bg" }, n.bgContent)
    ));
  }
}
function Sp(t) {
  return t.dayNumberText || p(M, null, " ");
}
function Ap(t, e, n) {
  const { start: i, end: r } = e, s = we(r, -1), o = n.getYear(i), a = n.getMonth(i), l = n.getYear(s), d = n.getMonth(s);
  return !(o === l && a === d) && // first date in current view?
  (t.valueOf() === i.valueOf() || // a month-start that's within the current range?
  n.getDay(t) === 1 && t.valueOf() < r.valueOf());
}
function $a(t) {
  return t.eventRange.instance.instanceId + ":" + t.firstCol;
}
function Pa(t) {
  return $a(t) + ":" + t.lastCol;
}
function Dp(t, e, n, i, r, s, o) {
  let a = new _p((w) => {
    let E = t[w.index].eventRange.instance.instanceId + ":" + w.span.start + ":" + (w.span.end - 1);
    return r[E] || 1;
  });
  a.allowReslicing = !0, a.strictOrder = i, e === !0 || n === !0 ? (a.maxCoord = s, a.hiddenConsumes = !0) : typeof e == "number" ? a.maxStackCnt = e : typeof n == "number" && (a.maxStackCnt = n, a.hiddenConsumes = !0);
  let l = [], d = [];
  for (let w = 0; w < t.length; w += 1) {
    let E = t[w], D = Pa(E);
    r[D] != null ? l.push({
      index: w,
      span: {
        start: E.firstCol,
        end: E.lastCol + 1
      }
    }) : d.push(E);
  }
  let c = a.addSegs(l), f = a.toRects(), { singleColPlacements: h, multiColPlacements: u, leftoverMargins: g } = Cp(f, t, o), m = [], b = [];
  for (let w of d) {
    u[w.firstCol].push({
      seg: w,
      isVisible: !1,
      isAbsolute: !0,
      absoluteTop: 0,
      marginTop: 0
    });
    for (let E = w.firstCol; E <= w.lastCol; E += 1)
      h[E].push({
        seg: Ve(w, E, E + 1, o),
        isVisible: !1,
        isAbsolute: !1,
        absoluteTop: 0,
        marginTop: 0
      });
  }
  for (let w = 0; w < o.length; w += 1)
    m.push(0);
  for (let w of c) {
    let E = t[w.index], D = w.span;
    u[D.start].push({
      seg: Ve(E, D.start, D.end, o),
      isVisible: !1,
      isAbsolute: !0,
      absoluteTop: 0,
      marginTop: 0
    });
    for (let C = D.start; C < D.end; C += 1)
      m[C] += 1, h[C].push({
        seg: Ve(E, C, C + 1, o),
        isVisible: !1,
        isAbsolute: !1,
        absoluteTop: 0,
        marginTop: 0
      });
  }
  for (let w = 0; w < o.length; w += 1)
    b.push(g[w]);
  return { singleColPlacements: h, multiColPlacements: u, moreCnts: m, moreMarginTops: b };
}
function Cp(t, e, n) {
  let i = xp(t, n.length), r = [], s = [], o = [];
  for (let a = 0; a < n.length; a += 1) {
    let l = i[a], d = [], c = 0, f = 0;
    for (let u of l) {
      let g = e[u.index];
      d.push({
        seg: Ve(g, a, a + 1, n),
        isVisible: !0,
        isAbsolute: !1,
        absoluteTop: u.levelCoord,
        marginTop: u.levelCoord - c
      }), c = u.levelCoord + u.thickness;
    }
    let h = [];
    c = 0, f = 0;
    for (let u of l) {
      let g = e[u.index], m = u.span.end - u.span.start > 1, b = u.span.start === a;
      f += u.levelCoord - c, c = u.levelCoord + u.thickness, m ? (f += u.thickness, b && h.push({
        seg: Ve(g, u.span.start, u.span.end, n),
        isVisible: !0,
        isAbsolute: !0,
        absoluteTop: u.levelCoord,
        marginTop: 0
      })) : b && (h.push({
        seg: Ve(g, u.span.start, u.span.end, n),
        isVisible: !0,
        isAbsolute: !1,
        absoluteTop: u.levelCoord,
        marginTop: f
        // claim the margin
      }), f = 0);
    }
    r.push(d), s.push(h), o.push(f);
  }
  return { singleColPlacements: r, multiColPlacements: s, leftoverMargins: o };
}
function xp(t, e) {
  let n = [];
  for (let i = 0; i < e; i += 1)
    n.push([]);
  for (let i of t)
    for (let r = i.span.start; r < i.span.end; r += 1)
      n[r].push(i);
  return n;
}
function Ve(t, e, n, i) {
  if (t.firstCol === e && t.lastCol === n - 1)
    return t;
  let r = t.eventRange, s = r.range, o = Oe(s, {
    start: i[e].date,
    end: B(i[n - 1].date, 1)
  });
  return Object.assign(Object.assign({}, t), { firstCol: e, lastCol: n - 1, eventRange: {
    def: r.def,
    ui: Object.assign(Object.assign({}, r.ui), { durationEditable: !1 }),
    instance: r.instance,
    range: o
  }, isStart: t.isStart && o.start.valueOf() === s.start.valueOf(), isEnd: t.isEnd && o.end.valueOf() === s.end.valueOf() });
}
class _p extends sa {
  constructor() {
    super(...arguments), this.hiddenConsumes = !1, this.forceHidden = {};
  }
  addSegs(e) {
    const n = super.addSegs(e), { entriesByLevel: i } = this, r = (s) => !this.forceHidden[Te(s)];
    for (let s = 0; s < i.length; s += 1)
      i[s] = i[s].filter(r);
    return n;
  }
  handleInvalidInsertion(e, n, i) {
    const { entriesByLevel: r, forceHidden: s } = this, { touchingEntry: o, touchingLevel: a, touchingLateral: l } = e;
    if (this.hiddenConsumes && o) {
      const d = Te(o);
      if (!s[d])
        if (this.allowReslicing) {
          const c = Object.assign(Object.assign({}, o), { span: Wi(o.span, n.span) }), f = Te(c);
          s[f] = !0, r[a][l] = c, i.push(c), this.splitEntry(o, n, i);
        } else
          s[d] = !0, i.push(o);
    }
    super.handleInvalidInsertion(e, n, i);
  }
}
class Ha extends se {
  constructor() {
    super(...arguments), this.cellElRefs = new oe(), this.frameElRefs = new oe(), this.fgElRefs = new oe(), this.segHarnessRefs = new oe(), this.rootElRef = F(), this.state = {
      framePositions: null,
      maxContentHeight: null,
      segHeights: {}
    }, this.handleResize = (e) => {
      e && this.updateSizing(!0);
    };
  }
  render() {
    let { props: e, state: n, context: i } = this, { options: r } = i, s = e.cells.length, o = Rt(e.businessHourSegs, s), a = Rt(e.bgEventSegs, s), l = Rt(this.getHighlightSegs(), s), d = Rt(this.getMirrorSegs(), s), { singleColPlacements: c, multiColPlacements: f, moreCnts: h, moreMarginTops: u } = Dp(Yo(e.fgEventSegs, r.eventOrder), e.dayMaxEvents, e.dayMaxEventRows, r.eventOrderStrict, n.segHeights, n.maxContentHeight, e.cells), g = (
      // TODO: messy way to compute this
      e.eventDrag && e.eventDrag.affectedInstances || e.eventResize && e.eventResize.affectedInstances || {}
    );
    return p(
      "tr",
      { ref: this.rootElRef, role: "row" },
      e.renderIntro && e.renderIntro(),
      e.cells.map((m, b) => {
        let w = this.renderFgSegs(b, e.forPrint ? c[b] : f[b], e.todayRange, g), E = this.renderFgSegs(b, Rp(d[b], f), e.todayRange, {}, !!e.eventDrag, !!e.eventResize, !1);
        return p(Ep, { key: m.key, elRef: this.cellElRefs.createRef(m.key), innerElRef: this.frameElRefs.createRef(m.key), dateProfile: e.dateProfile, date: m.date, showDayNumber: e.showDayNumbers, showWeekNumber: e.showWeekNumbers && b === 0, forceDayTop: e.showWeekNumbers, todayRange: e.todayRange, eventSelection: e.eventSelection, eventDrag: e.eventDrag, eventResize: e.eventResize, extraRenderProps: m.extraRenderProps, extraDataAttrs: m.extraDataAttrs, extraClassNames: m.extraClassNames, extraDateSpan: m.extraDateSpan, moreCnt: h[b], moreMarginTop: u[b], singlePlacements: c[b], fgContentElRef: this.fgElRefs.createRef(m.key), fgContent: (
          // Fragment scopes the keys
          p(
            M,
            null,
            p(M, null, w),
            p(M, null, E)
          )
        ), bgContent: (
          // Fragment scopes the keys
          p(
            M,
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
    this.updateSizing(!ee(e, i));
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
    let { context: l } = this, { eventSelection: d } = this.props, { framePositions: c } = this.state, f = this.props.cells.length === 1, h = s || o || a, u = [];
    if (c)
      for (let g of n) {
        let { seg: m } = g, { instanceId: b } = m.eventRange.instance, w = g.isVisible && !r[b], E = g.isAbsolute, D = "", C = "";
        E && (l.isRtl ? (C = 0, D = c.lefts[m.lastCol] - c.lefts[m.firstCol]) : (D = 0, C = c.rights[m.firstCol] - c.rights[m.lastCol])), u.push(p("div", { className: "fc-daygrid-event-harness" + (E ? " fc-daygrid-event-harness-abs" : ""), key: $a(m), ref: h ? null : this.segHarnessRefs.createRef(Pa(m)), style: {
          visibility: w ? "" : "hidden",
          marginTop: E ? "" : g.marginTop,
          top: E ? g.absoluteTop : "",
          left: D,
          right: C
        } }, Ia(m) ? p(Na, Object.assign({ seg: m, isDragging: s, isSelected: b === d, defaultDisplayEventEnd: f }, be(m, i))) : p(Oa, Object.assign({ seg: m, isDragging: s, isResizing: o, isDateSelecting: a, isSelected: b === d, defaultDisplayEventEnd: f }, be(m, i)))));
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
        o.push(p("div", { key: Zo(a.eventRange), className: "fc-daygrid-bg-harness", style: l }, n === "bg-event" ? p(va, Object.assign({ seg: a }, be(a, r))) : ba(n)));
      }
    return p(M, {}, ...o);
  }
  updateSizing(e) {
    let { props: n, state: i, frameElRefs: r } = this;
    if (!n.forPrint && n.clientWidth !== null) {
      if (e) {
        let l = n.cells.map((d) => r.currentMap[d.key]);
        if (l.length) {
          let d = this.rootElRef.current, c = new Xe(
            d,
            l,
            !0,
            // isHorizontal
            !1
          );
          (!i.framePositions || !i.framePositions.similarTo(c)) && this.setState({
            framePositions: new Xe(
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
Ha.addStateEquality({
  segHeights: ee
});
function Rp(t, e) {
  if (!t.length)
    return [];
  let n = Tp(e);
  return t.map((i) => ({
    seg: i,
    isVisible: !0,
    isAbsolute: !0,
    absoluteTop: n[i.eventRange.instance.instanceId],
    marginTop: 0
  }));
}
function Tp(t) {
  let e = {};
  for (let n of t)
    for (let i of n)
      e[i.seg.eventRange.instance.instanceId] = i.absoluteTop;
  return e;
}
class kp extends se {
  constructor() {
    super(...arguments), this.splitBusinessHourSegs = A(Ht), this.splitBgEventSegs = A(Mp), this.splitFgEventSegs = A(Ht), this.splitDateSelectionSegs = A(Ht), this.splitEventDrag = A(ls), this.splitEventResize = A(ls), this.rowRefs = new oe();
  }
  render() {
    let { props: e, context: n } = this, i = e.cells.length, r = this.splitBusinessHourSegs(e.businessHourSegs, i), s = this.splitBgEventSegs(e.bgEventSegs, i), o = this.splitFgEventSegs(e.fgEventSegs, i), a = this.splitDateSelectionSegs(e.dateSelectionSegs, i), l = this.splitEventDrag(e.eventDrag, i), d = this.splitEventResize(e.eventResize, i), c = i >= 7 && e.clientWidth ? e.clientWidth / n.options.aspectRatio / 6 : null;
    return p(tt, { unit: "day" }, (f, h) => p(M, null, e.cells.map((u, g) => p(Ha, {
      ref: this.rowRefs.createRef(g),
      key: u.length ? u[0].date.toISOString() : g,
      showDayNumbers: i > 1,
      showWeekNumbers: e.showWeekNumbers,
      todayRange: h,
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
    this.rowPositions = new Xe(
      this.rootEl,
      this.rowRefs.collect().map((e) => e.getCellEls()[0]),
      // first cell el in each row. TODO: not optimal
      !1,
      !0
    ), this.colPositions = new Xe(
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
    let i = this.props.cells[e][n].date, r = B(i, 1);
    return { start: i, end: r };
  }
}
function Mp(t, e) {
  return Ht(t.filter(Ip), e);
}
function Ip(t) {
  return t.eventRange.def.allDay;
}
class Op extends se {
  constructor() {
    super(...arguments), this.elRef = F(), this.needsScrollReset = !1;
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
          p(kp, { dateProfile: e.dateProfile, cells: e.cells, renderRowIntro: e.renderRowIntro, showWeekNumbers: e.showWeekNumbers, clientWidth: e.clientWidth, clientHeight: e.clientHeight, businessHourSegs: e.businessHourSegs, bgEventSegs: e.bgEventSegs, fgEventSegs: e.fgEventSegs, dateSelectionSegs: e.dateSelectionSegs, eventSelection: e.eventSelection, eventDrag: e.eventDrag, eventResize: e.eventResize, dayMaxEvents: i, dayMaxEventRows: n, forPrint: e.forPrint, isHitComboAllowed: e.isHitComboAllowed })
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
      const e = Np(this.elRef.current, this.props.dateProfile);
      if (e) {
        const n = e.closest(".fc-daygrid-body"), i = n.closest(".fc-scroller"), r = e.getBoundingClientRect().top - n.getBoundingClientRect().top;
        i.scrollTop = r ? r + 1 : 0;
      }
      this.needsScrollReset = !1;
    }
  }
}
function Np(t, e) {
  let n;
  return e.currentRangeUnit.match(/year|month/) && (n = t.querySelector(`[data-date="${wd(e.currentDate)}-01"]`)), n || (n = t.querySelector(`[data-date="${_i(e.currentDate)}"]`)), n;
}
class $p extends ua {
  constructor() {
    super(...arguments), this.forceDayIfListItem = !0;
  }
  sliceRange(e, n) {
    return n.sliceRange(e);
  }
}
class za extends se {
  constructor() {
    super(...arguments), this.slicer = new $p(), this.tableRef = F();
  }
  render() {
    let { props: e, context: n } = this;
    return p(Op, Object.assign({ ref: this.tableRef }, this.slicer.sliceProps(e, e.dateProfile, e.nextDayThreshold, n, e.dayTableModel), { dateProfile: e.dateProfile, cells: e.dayTableModel.cells, colGroupNode: e.colGroupNode, tableMinWidth: e.tableMinWidth, renderRowIntro: e.renderRowIntro, dayMaxEvents: e.dayMaxEvents, dayMaxEventRows: e.dayMaxEventRows, showWeekNumbers: e.showWeekNumbers, expandRows: e.expandRows, headerAlignElRef: e.headerAlignElRef, clientWidth: e.clientWidth, clientHeight: e.clientHeight, forPrint: e.forPrint }));
  }
}
class Pp extends mp {
  constructor() {
    super(...arguments), this.buildDayTableModel = A(Hp), this.headerRef = F(), this.tableRef = F();
  }
  render() {
    let { options: e, dateProfileGenerator: n } = this.context, { props: i } = this, r = this.buildDayTableModel(i.dateProfile, n), s = e.dayHeaders && p(la, { ref: this.headerRef, dateProfile: i.dateProfile, dates: r.headerDates, datesRepDistinctDays: r.rowCnt === 1 }), o = (a) => p(za, { ref: this.tableRef, dateProfile: i.dateProfile, dayTableModel: r, businessHours: i.businessHours, dateSelection: i.dateSelection, eventStore: i.eventStore, eventUiBases: i.eventUiBases, eventSelection: i.eventSelection, eventDrag: i.eventDrag, eventResize: i.eventResize, nextDayThreshold: e.nextDayThreshold, colGroupNode: a.tableColGroupNode, tableMinWidth: a.tableMinWidth, dayMaxEvents: e.dayMaxEvents, dayMaxEventRows: e.dayMaxEventRows, showWeekNumbers: e.weekNumbers, expandRows: !i.isHeightAuto, headerAlignElRef: this.headerElRef, clientWidth: a.clientWidth, clientHeight: a.clientHeight, forPrint: i.forPrint });
    return e.dayMinWidth ? this.renderHScrollLayout(s, o, r.colCnt, e.dayMinWidth) : this.renderSimpleLayout(s, o);
  }
}
function Hp(t, e) {
  let n = new ca(t.renderRange, e);
  return new da(n, /year|month|week/.test(t.currentRangeUnit));
}
class zp extends Po {
  // Computes the date range that will be rendered
  buildRenderRange(e, n, i) {
    let r = super.buildRenderRange(e, n, i), { props: s } = this;
    return Bp({
      currentRange: r,
      snapToWeek: /^(year|month)$/.test(n),
      fixedWeekCount: s.fixedWeekCount,
      dateEnv: s.dateEnv
    });
  }
}
function Bp(t) {
  let { dateEnv: e, currentRange: n } = t, { start: i, end: r } = n, s;
  if (t.snapToWeek && (i = e.startOfWeek(i), s = e.startOfWeek(r), s.valueOf() !== r.valueOf() && (r = Hr(s, 1))), t.fixedWeekCount) {
    let o = e.startOfWeek(e.startOfMonth(B(n.end, -1))), a = Math.ceil(
      // could be partial weeks due to hiddenDays
      cd(o, r)
    );
    r = Hr(r, 6 - a);
  }
  return { start: i, end: r };
}
var Lp = ':root{--fc-daygrid-event-dot-width:8px}.fc-daygrid-day-events:after,.fc-daygrid-day-events:before,.fc-daygrid-day-frame:after,.fc-daygrid-day-frame:before,.fc-daygrid-event-harness:after,.fc-daygrid-event-harness:before{clear:both;content:"";display:table}.fc .fc-daygrid-body{position:relative;z-index:1}.fc .fc-daygrid-day.fc-day-today{background-color:var(--fc-today-bg-color)}.fc .fc-daygrid-day-frame{min-height:100%;position:relative}.fc .fc-daygrid-day-top{display:flex;flex-direction:row-reverse}.fc .fc-day-other .fc-daygrid-day-top{opacity:.3}.fc .fc-daygrid-day-number{padding:4px;position:relative;z-index:4}.fc .fc-daygrid-month-start{font-size:1.1em;font-weight:700}.fc .fc-daygrid-day-events{margin-top:1px}.fc .fc-daygrid-body-balanced .fc-daygrid-day-events{left:0;position:absolute;right:0}.fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events{min-height:2em;position:relative}.fc .fc-daygrid-body-natural .fc-daygrid-day-events{margin-bottom:1em}.fc .fc-daygrid-event-harness{position:relative}.fc .fc-daygrid-event-harness-abs{left:0;position:absolute;right:0;top:0}.fc .fc-daygrid-bg-harness{bottom:0;position:absolute;top:0}.fc .fc-daygrid-day-bg .fc-non-business{z-index:1}.fc .fc-daygrid-day-bg .fc-bg-event{z-index:2}.fc .fc-daygrid-day-bg .fc-highlight{z-index:3}.fc .fc-daygrid-event{margin-top:1px;z-index:6}.fc .fc-daygrid-event.fc-event-mirror{z-index:7}.fc .fc-daygrid-day-bottom{font-size:.85em;margin:0 2px}.fc .fc-daygrid-day-bottom:after,.fc .fc-daygrid-day-bottom:before{clear:both;content:"";display:table}.fc .fc-daygrid-more-link{border-radius:3px;cursor:pointer;line-height:1;margin-top:1px;max-width:100%;overflow:hidden;padding:2px;position:relative;white-space:nowrap;z-index:4}.fc .fc-daygrid-more-link:hover{background-color:rgba(0,0,0,.1)}.fc .fc-daygrid-week-number{background-color:var(--fc-neutral-bg-color);color:var(--fc-neutral-text-color);min-width:1.5em;padding:2px;position:absolute;text-align:center;top:0;z-index:5}.fc .fc-more-popover .fc-popover-body{min-width:220px;padding:10px}.fc-direction-ltr .fc-daygrid-event.fc-event-start,.fc-direction-rtl .fc-daygrid-event.fc-event-end{margin-left:2px}.fc-direction-ltr .fc-daygrid-event.fc-event-end,.fc-direction-rtl .fc-daygrid-event.fc-event-start{margin-right:2px}.fc-direction-ltr .fc-daygrid-more-link{float:left}.fc-direction-ltr .fc-daygrid-week-number{border-radius:0 0 3px 0;left:0}.fc-direction-rtl .fc-daygrid-more-link{float:right}.fc-direction-rtl .fc-daygrid-week-number{border-radius:0 0 0 3px;right:0}.fc-liquid-hack .fc-daygrid-day-frame{position:static}.fc-daygrid-event{border-radius:3px;font-size:var(--fc-small-font-size);position:relative;white-space:nowrap}.fc-daygrid-block-event .fc-event-time{font-weight:700}.fc-daygrid-block-event .fc-event-time,.fc-daygrid-block-event .fc-event-title{padding:1px}.fc-daygrid-dot-event{align-items:center;display:flex;padding:2px 0}.fc-daygrid-dot-event .fc-event-title{flex-grow:1;flex-shrink:1;font-weight:700;min-width:0;overflow:hidden}.fc-daygrid-dot-event.fc-event-mirror,.fc-daygrid-dot-event:hover{background:rgba(0,0,0,.1)}.fc-daygrid-dot-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-daygrid-event-dot{border:calc(var(--fc-daygrid-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-daygrid-event-dot-width)/2);box-sizing:content-box;height:0;margin:0 4px;width:0}.fc-direction-ltr .fc-daygrid-event .fc-event-time{margin-right:3px}.fc-direction-rtl .fc-daygrid-event .fc-event-time{margin-left:3px}';
Ei(Lp);
var Up = ue({
  name: "@fullcalendar/daygrid",
  initialView: "dayGridMonth",
  views: {
    dayGrid: {
      component: Pp,
      dateProfileGeneratorClass: zp
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
Vi.touchMouseIgnoreWait = 500;
let ri = 0, nn = 0, si = !1;
class Ba {
  constructor(e) {
    this.subjectEl = null, this.selector = "", this.handleSelector = "", this.shouldIgnoreMove = !1, this.shouldWatchScroll = !0, this.isDragging = !1, this.isTouchDragging = !1, this.wasTouchScroll = !1, this.handleMouseDown = (n) => {
      if (!this.shouldIgnoreMouse() && Fp(n) && this.tryStart(n)) {
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
        i.removeEventListener("touchmove", this.handleTouchMove), i.removeEventListener("touchend", this.handleTouchEnd), i.removeEventListener("touchcancel", this.handleTouchEnd), window.removeEventListener("scroll", this.handleTouchScroll, !0), this.emitter.trigger("pointerup", this.createEventFromTouch(n)), this.cleanup(), this.isTouchDragging = !1, jp();
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
    }, this.containerEl = e, this.emitter = new bn(), e.addEventListener("mousedown", this.handleMouseDown), e.addEventListener("touchstart", this.handleTouchStart, { passive: !0 }), Wp();
  }
  destroy() {
    this.containerEl.removeEventListener("mousedown", this.handleMouseDown), this.containerEl.removeEventListener("touchstart", this.handleTouchStart, { passive: !0 }), Vp();
  }
  tryStart(e) {
    let n = this.querySubjectEl(e), i = e.target;
    return n && (!this.handleSelector || U(i, this.handleSelector)) ? (this.subjectEl = n, this.isDragging = !0, this.wasTouchScroll = !1, !0) : !1;
  }
  cleanup() {
    si = !1, this.isDragging = !1, this.subjectEl = null, this.destroyScrollWatch();
  }
  querySubjectEl(e) {
    return this.selector ? U(e.target, this.selector) : this.containerEl;
  }
  shouldIgnoreMouse() {
    return ri || this.isTouchDragging;
  }
  // can be called by user of this class, to cancel touch-based scrolling for the current drag
  cancelTouchScroll() {
    this.isDragging && (si = !0);
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
function Fp(t) {
  return t.button === 0 && !t.ctrlKey;
}
function jp() {
  ri += 1, setTimeout(() => {
    ri -= 1;
  }, Vi.touchMouseIgnoreWait);
}
function Wp() {
  nn += 1, nn === 1 && window.addEventListener("touchmove", La, { passive: !1 });
}
function Vp() {
  nn -= 1, nn || window.removeEventListener("touchmove", La, { passive: !1 });
}
function La(t) {
  si && t.preventDefault();
}
class Gp {
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
    i.style.transition = "top " + n + "ms,left " + n + "ms", lt(i, {
      left: r.left,
      top: r.top
    }), Wc(i, () => {
      i.style.transition = "", e();
    });
  }
  cleanup() {
    this.mirrorEl && (Ai(this.mirrorEl), this.mirrorEl = null), this.sourceEl = null;
  }
  updateElPosition() {
    this.sourceEl && this.isVisible && lt(this.getMirrorEl(), {
      left: this.sourceElRect.left + this.deltaX,
      top: this.sourceElRect.top + this.deltaY
    });
  }
  getMirrorEl() {
    let e = this.sourceElRect, n = this.mirrorEl;
    return n || (n = this.mirrorEl = this.sourceEl.cloneNode(!0), n.style.userSelect = "none", n.style.webkitUserSelect = "none", n.style.pointerEvents = "none", n.classList.add("fc-event-dragging"), lt(n, {
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
class Ua extends ji {
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
class Fa extends Ua {
  constructor(e, n) {
    super(new ph(e), n);
  }
  getEventTarget() {
    return this.scrollController.el;
  }
  computeClientRect() {
    return hh(this.scrollController.el);
  }
}
class qp extends Ua {
  constructor(e) {
    super(new gh(), e);
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
const cs = typeof performance == "function" ? performance.now : Date.now;
class Yp {
  constructor() {
    this.isEnabled = !0, this.scrollQuery = [window, ".fc-scroller"], this.edgeThreshold = 50, this.maxVelocity = 300, this.pointerScreenX = null, this.pointerScreenY = null, this.isAnimating = !1, this.scrollCaches = null, this.everMovedUp = !1, this.everMovedDown = !1, this.everMovedLeft = !1, this.everMovedRight = !1, this.animate = () => {
      if (this.isAnimating) {
        let e = this.computeBestEdge(this.pointerScreenX + window.scrollX, this.pointerScreenY + window.scrollY);
        if (e) {
          let n = cs();
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
      s < 0 ? this.everMovedUp = !0 : s > 0 && (this.everMovedDown = !0), o < 0 ? this.everMovedLeft = !0 : o > 0 && (this.everMovedRight = !0), this.pointerScreenX = i, this.pointerScreenY = r, this.isAnimating || (this.isAnimating = !0, this.requestAnimation(cs()));
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
      let a = o.clientRect, l = e - a.left, d = a.right - e, c = n - a.top, f = a.bottom - n;
      l >= 0 && d >= 0 && c >= 0 && f >= 0 && (c <= i && this.everMovedUp && o.canScrollUp() && (!r || r.distance > c) && (r = { scrollCache: o, name: "top", distance: c }), f <= i && this.everMovedDown && o.canScrollDown() && (!r || r.distance > f) && (r = { scrollCache: o, name: "bottom", distance: f }), l <= i && this.everMovedLeft && o.canScrollLeft() && (!r || r.distance > l) && (r = { scrollCache: o, name: "left", distance: l }), d <= i && this.everMovedRight && o.canScrollRight() && (!r || r.distance > d) && (r = { scrollCache: o, name: "right", distance: d }));
    }
    return r;
  }
  buildCaches(e) {
    return this.queryScrollEls(e).map((n) => n === window ? new qp(!1) : new Fa(n, !1));
  }
  queryScrollEls(e) {
    let n = [];
    for (let i of this.scrollQuery)
      typeof i == "object" ? n.push(i) : n.push(...Array.prototype.slice.call(e.getRootNode().querySelectorAll(i)));
    return n;
  }
}
class wt extends bh {
  constructor(e, n) {
    super(e), this.containerEl = e, this.delay = null, this.minDistance = 0, this.touchScrollAllowed = !0, this.mirrorNeedsRevert = !1, this.isInteracting = !1, this.isDragging = !1, this.isDelayEnded = !1, this.isDistanceSurpassed = !1, this.delayTimeoutId = null, this.onPointerDown = (r) => {
      this.isDragging || (this.isInteracting = !0, this.isDelayEnded = !1, this.isDistanceSurpassed = !1, Vc(document.body), qc(document.body), r.isTouch || r.origEvent.preventDefault(), this.emitter.trigger("pointerdown", r), this.isInteracting && // not destroyed via pointerdown handler
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
      this.isInteracting && (this.isInteracting = !1, Gc(document.body), Yc(document.body), this.emitter.trigger("pointerup", r), this.isDragging && (this.autoScroller.stop(), this.tryStopDrag(r)), this.delayTimeoutId && (clearTimeout(this.delayTimeoutId), this.delayTimeoutId = null));
    };
    let i = this.pointer = new Ba(e);
    i.emitter.on("pointerdown", this.onPointerDown), i.emitter.on("pointermove", this.onPointerMove), i.emitter.on("pointerup", this.onPointerUp), n && (i.selector = n), this.mirror = new Gp(), this.autoScroller = new Yp();
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
class Qp {
  constructor(e) {
    this.el = e, this.origRect = Fi(e), this.scrollCaches = ra(e).map((n) => new Fa(n, !0));
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
      if (!Zp(r.getEventTarget()) && !Ju(i, r.clientRect))
        return !1;
    return !0;
  }
}
function Zp(t) {
  let e = t.tagName;
  return e === "HTML" || e === "BODY";
}
class yn {
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
    }, this.droppableStore = n, e.emitter.on("pointerdown", this.handlePointerDown), e.emitter.on("dragstart", this.handleDragStart), e.emitter.on("dragmove", this.handleDragMove), e.emitter.on("pointerup", this.handlePointerUp), e.emitter.on("dragend", this.handleDragEnd), this.dragging = e, this.emitter = new bn();
  }
  // sets initialHit
  // sets coordAdjust
  processFirstCoord(e) {
    let n = { left: e.pageX, top: e.pageY }, i = n, r = e.subjectEl, s;
    r instanceof HTMLElement && (s = Fi(r), i = eh(i, s));
    let o = this.initialHit = this.queryHitForOffset(i.left, i.top);
    if (o) {
      if (this.useSubjectCenter && s) {
        let a = ta(s, o.rect);
        a && (i = th(a));
      }
      this.coordAdjust = nh(i, n);
    } else
      this.coordAdjust = { left: 0, top: 0 };
  }
  handleMove(e, n) {
    let i = this.queryHitForOffset(e.pageX + this.coordAdjust.left, e.pageY + this.coordAdjust.top);
    (n || !wn(this.movingHit, i)) && (this.movingHit = i, this.emitter.trigger("hitupdate", i, !1, e));
  }
  prepareHits() {
    this.offsetTrackers = le(this.droppableStore, (e) => (e.component.prepareHits(), new Qp(e.el)));
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
        let d = l.computeLeft(), c = l.computeTop(), f = e - d, h = n - c, { origRect: u } = l, g = u.right - u.left, m = u.bottom - u.top;
        if (
          // must be within the element's bounds
          f >= 0 && f < g && h >= 0 && h < m
        ) {
          let b = a.queryHit(f, h, g, m);
          b && // make sure the hit is within activeRange, meaning it's not a dead cell
          mn(b.dateProfile.activeRange, b.dateSpan.range) && // Ensure the component we are querying for the hit is accessibly my the pointer
          // Prevents obscured calendars (ex: under a modal dialog) from accepting hit
          // https://github.com/fullcalendar/fullcalendar/issues/5026
          (this.disablePointCheck || l.el.contains(l.el.getRootNode().elementFromPoint(
            // add-back origins to get coordinate relative to top-left of window viewport
            f + d - window.scrollX,
            h + c - window.scrollY
          ))) && (!s || b.layer > s.layer) && (b.componentId = o, b.context = a.context, b.rect.left += d, b.rect.right += d, b.rect.top += c, b.rect.bottom += c, s = b);
        }
      }
    }
    return s;
  }
}
function wn(t, e) {
  return !t && !e ? !0 : !!t != !!e ? !1 : Fu(t.dateSpan, e.dateSpan);
}
function ja(t, e) {
  let n = {};
  for (let i of e.pluginHooks.datePointTransforms)
    Object.assign(n, i(t, e));
  return Object.assign(n, Kp(t, e.dateEnv)), n;
}
function Kp(t, e) {
  return {
    date: e.toDate(t.range.start),
    dateStr: e.formatIso(t.range.start, { omitTime: t.allDay }),
    allDay: t.allDay
  };
}
class Xp extends et {
  constructor(e) {
    super(e), this.handlePointerDown = (i) => {
      let { dragging: r } = this, s = i.origEvent.target;
      r.setIgnoreMove(!this.component.isValidDateDownEl(s));
    }, this.handleDragEnd = (i) => {
      let { component: r } = this, { pointer: s } = this.dragging;
      if (!s.wasTouchScroll) {
        let { initialHit: o, finalHit: a } = this.hitDragging;
        if (o && a && wn(o, a)) {
          let { context: l } = r, d = Object.assign(Object.assign({}, ja(o.dateSpan, l)), { dayEl: o.dayEl, jsEvent: i.origEvent, view: l.viewApi || l.calendarApi.view });
          l.emitter.trigger("dateClick", d);
        }
      }
    }, this.dragging = new wt(e.el), this.dragging.autoScroller.isEnabled = !1;
    let n = this.hitDragging = new yn(this.dragging, Li(e));
    n.emitter.on("pointerdown", this.handlePointerDown), n.emitter.on("dragend", this.handleDragEnd);
  }
  destroy() {
    this.dragging.destroy();
  }
}
class Jp extends et {
  constructor(e) {
    super(e), this.dragSelection = null, this.handlePointerDown = (o) => {
      let { component: a, dragging: l } = this, { options: d } = a.context, c = d.selectable && a.isValidDateDownEl(o.origEvent.target);
      l.setIgnoreMove(!c), l.delay = o.isTouch ? eg(a) : null;
    }, this.handleDragStart = (o) => {
      this.component.context.calendarApi.unselect(o);
    }, this.handleHitUpdate = (o, a) => {
      let { context: l } = this.component, d = null, c = !1;
      if (o) {
        let f = this.hitDragging.initialHit;
        o.componentId === f.componentId && this.isHitComboAllowed && !this.isHitComboAllowed(f, o) || (d = tg(f, o, l.pluginHooks.dateSelectionTransformers)), (!d || !Dh(d, o.dateProfile, l)) && (c = !0, d = null);
      }
      d ? l.dispatch({ type: "SELECT_DATES", selection: d }) : a || l.dispatch({ type: "UNSELECT_DATES" }), c ? Di() : Ci(), a || (this.dragSelection = d);
    }, this.handlePointerUp = (o) => {
      this.dragSelection && (Vo(this.dragSelection, o, this.component.context), this.dragSelection = null);
    };
    let { component: n } = e, { options: i } = n.context, r = this.dragging = new wt(e.el);
    r.touchScrollAllowed = !1, r.minDistance = i.selectMinDistance || 0, r.autoScroller.isEnabled = i.dragScroll;
    let s = this.hitDragging = new yn(this.dragging, Li(e));
    s.emitter.on("pointerdown", this.handlePointerDown), s.emitter.on("dragstart", this.handleDragStart), s.emitter.on("hitupdate", this.handleHitUpdate), s.emitter.on("pointerup", this.handlePointerUp);
  }
  destroy() {
    this.dragging.destroy();
  }
}
function eg(t) {
  let { options: e } = t.context, n = e.selectLongPressDelay;
  return n == null && (n = e.longPressDelay), n;
}
function tg(t, e, n) {
  let i = t.dateSpan, r = e.dateSpan, s = [
    i.range.start,
    i.range.end,
    r.range.start,
    r.range.end
  ];
  s.sort(Jc);
  let o = {};
  for (let a of n) {
    let l = a(t, e);
    if (l === !1)
      return null;
    l && Object.assign(o, l);
  }
  return o.range = { start: s[0], end: s[3] }, o.allDay = i.allDay, o;
}
class Et extends et {
  constructor(e) {
    super(e), this.subjectEl = null, this.subjectSeg = null, this.isDragging = !1, this.eventRange = null, this.relevantEvents = null, this.receivingContext = null, this.validMutation = null, this.mutatedRelevantEvents = null, this.handlePointerDown = (o) => {
      let a = o.origEvent.target, { component: l, dragging: d } = this, { mirror: c } = d, { options: f } = l.context, h = l.context;
      this.subjectEl = o.subjectEl;
      let u = this.subjectSeg = Ke(o.subjectEl), m = (this.eventRange = u.eventRange).instance.instanceId;
      this.relevantEvents = Pi(h.getCurrentData().eventStore, m), d.minDistance = o.isTouch ? 0 : f.eventDragMinDistance, d.delay = // only do a touch delay if touch and this event hasn't been selected yet
      o.isTouch && m !== l.props.eventSelection ? ig(l) : null, f.fixedMirrorParent ? c.parentNode = f.fixedMirrorParent : c.parentNode = U(a, ".fc"), c.revertDuration = f.dragRevertDuration;
      let b = l.isValidSegDownEl(a) && !U(a, ".fc-event-resizer");
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
      let l = this.relevantEvents, d = this.hitDragging.initialHit, c = this.component.context, f = null, h = null, u = null, g = !1, m = {
        affectedEvents: l,
        mutatedEvents: Q(),
        isEvent: !0
      };
      if (o) {
        f = o.context;
        let b = f.options;
        c === f || b.editable && b.droppable ? (h = ng(d, o, this.eventRange.instance.range.start, f.getCurrentData().pluginHooks.eventDragMutationMassagers), h && (u = Bi(l, f.getCurrentData().eventUiBases, h, f), m.mutatedEvents = u, ha(m, o.dateProfile, f) || (g = !0, h = null, u = null, m.mutatedEvents = Q()))) : f = null;
      }
      this.displayDrag(f, m), g ? Di() : Ci(), a || (c === f && // TODO: write test for this
      wn(d, o) && (h = null), this.dragging.setMirrorNeedsRevert(!h), this.dragging.setMirrorIsVisible(!o || !this.subjectEl.getRootNode().querySelector(".fc-event-mirror")), this.receivingContext = f, this.validMutation = h, this.mutatedRelevantEvents = u);
    }, this.handlePointerUp = () => {
      this.isDragging || this.cleanup();
    }, this.handleDragEnd = (o) => {
      if (this.isDragging) {
        let a = this.component.context, l = a.viewApi, { receivingContext: d, validMutation: c } = this, f = this.eventRange.def, h = this.eventRange.instance, u = new N(a, f, h), g = this.relevantEvents, m = this.mutatedRelevantEvents, { finalHit: b } = this.hitDragging;
        if (this.clearDrag(), a.emitter.trigger("eventDragStop", {
          el: this.subjectEl,
          event: u,
          jsEvent: o.origEvent,
          view: l
        }), c) {
          if (d === a) {
            let w = new N(a, m.defs[f.defId], h ? m.instances[h.instanceId] : null);
            a.dispatch({
              type: "MERGE_EVENTS",
              eventStore: m
            });
            let E = {
              oldEvent: u,
              event: w,
              relatedEvents: Re(m, a, h),
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
            let w = {
              event: u,
              relatedEvents: Re(g, a, h),
              revert() {
                a.dispatch({
                  type: "MERGE_EVENTS",
                  eventStore: g
                });
              }
            };
            a.emitter.trigger("eventLeave", Object.assign(Object.assign({}, w), { draggedEl: o.subjectEl, view: l })), a.dispatch({
              type: "REMOVE_EVENTS",
              eventStore: g
            }), a.emitter.trigger("eventRemove", w);
            let E = m.defs[f.defId], D = m.instances[h.instanceId], C = new N(d, E, D);
            d.dispatch({
              type: "MERGE_EVENTS",
              eventStore: m
            });
            let P = {
              event: C,
              relatedEvents: Re(m, d, D),
              revert() {
                d.dispatch({
                  type: "REMOVE_EVENTS",
                  eventStore: m
                });
              }
            };
            d.emitter.trigger("eventAdd", P), o.isTouch && d.dispatch({
              type: "SELECT_EVENT",
              eventInstanceId: h.instanceId
            }), d.emitter.trigger("drop", Object.assign(Object.assign({}, ja(b.dateSpan, d)), { draggedEl: o.subjectEl, jsEvent: o.origEvent, view: b.context.viewApi })), d.emitter.trigger("eventReceive", Object.assign(Object.assign({}, P), { draggedEl: o.subjectEl, view: b.context.viewApi }));
          }
        } else
          a.emitter.trigger("_noEventDrop");
      }
      this.cleanup();
    };
    let { component: n } = this, { options: i } = n.context, r = this.dragging = new wt(e.el);
    r.pointer.selector = Et.SELECTOR, r.touchScrollAllowed = !1, r.autoScroller.isEnabled = i.dragScroll;
    let s = this.hitDragging = new yn(this.dragging, Jn);
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
        mutatedEvents: Q(),
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
Et.SELECTOR = ".fc-event-draggable, .fc-event-resizable";
function ng(t, e, n, i) {
  let r = t.dateSpan, s = e.dateSpan, o = r.range.start, a = s.range.start, l = {};
  r.allDay !== s.allDay && (l.allDay = s.allDay, l.hasEnd = e.context.options.allDayMaintainDuration, s.allDay ? o = I(n) : o = n);
  let d = Ue(o, a, t.context.dateEnv, t.componentId === e.componentId ? t.largeUnit : null);
  d.milliseconds && (l.allDay = !1);
  let c = {
    datesDelta: d,
    standardProps: l
  };
  for (let f of i)
    f(c, t, e);
  return c;
}
function ig(t) {
  let { options: e } = t.context, n = e.eventLongPressDelay;
  return n == null && (n = e.longPressDelay), n;
}
class rg extends et {
  constructor(e) {
    super(e), this.draggingSegEl = null, this.draggingSeg = null, this.eventRange = null, this.relevantEvents = null, this.validMutation = null, this.mutatedRelevantEvents = null, this.handlePointerDown = (s) => {
      let { component: o } = this, a = this.querySegEl(s), l = Ke(a), d = this.eventRange = l.eventRange;
      this.dragging.minDistance = o.context.options.eventDragMinDistance, this.dragging.setIgnoreMove(!this.component.isValidSegDownEl(s.origEvent.target) || s.isTouch && this.component.props.eventSelection !== d.instance.instanceId);
    }, this.handleDragStart = (s) => {
      let { context: o } = this.component, a = this.eventRange;
      this.relevantEvents = Pi(o.getCurrentData().eventStore, this.eventRange.instance.instanceId);
      let l = this.querySegEl(s);
      this.draggingSegEl = l, this.draggingSeg = Ke(l), o.calendarApi.unselect(), o.emitter.trigger("eventResizeStart", {
        el: l,
        event: new N(o, a.def, a.instance),
        jsEvent: s.origEvent,
        view: o.viewApi
      });
    }, this.handleHitUpdate = (s, o, a) => {
      let { context: l } = this.component, d = this.relevantEvents, c = this.hitDragging.initialHit, f = this.eventRange.instance, h = null, u = null, g = !1, m = {
        affectedEvents: d,
        mutatedEvents: Q(),
        isEvent: !0
      };
      s && (s.componentId === c.componentId && this.isHitComboAllowed && !this.isHitComboAllowed(c, s) || (h = sg(c, s, a.subjectEl.classList.contains("fc-event-resizer-start"), f.range))), h && (u = Bi(d, l.getCurrentData().eventUiBases, h, l), m.mutatedEvents = u, ha(m, s.dateProfile, l) || (g = !0, h = null, u = null, m.mutatedEvents = null)), u ? l.dispatch({
        type: "SET_EVENT_RESIZE",
        state: m
      }) : l.dispatch({ type: "UNSET_EVENT_RESIZE" }), g ? Di() : Ci(), o || (h && wn(c, s) && (h = null), this.validMutation = h, this.mutatedRelevantEvents = u);
    }, this.handleDragEnd = (s) => {
      let { context: o } = this.component, a = this.eventRange.def, l = this.eventRange.instance, d = new N(o, a, l), c = this.relevantEvents, f = this.mutatedRelevantEvents;
      if (o.emitter.trigger("eventResizeStop", {
        el: this.draggingSegEl,
        event: d,
        jsEvent: s.origEvent,
        view: o.viewApi
      }), this.validMutation) {
        let h = new N(o, f.defs[a.defId], l ? f.instances[l.instanceId] : null);
        o.dispatch({
          type: "MERGE_EVENTS",
          eventStore: f
        });
        let u = {
          oldEvent: d,
          event: h,
          relatedEvents: Re(f, o, l),
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
    let { component: n } = e, i = this.dragging = new wt(e.el);
    i.pointer.selector = ".fc-event-resizer", i.touchScrollAllowed = !1, i.autoScroller.isEnabled = n.context.options.dragScroll;
    let r = this.hitDragging = new yn(this.dragging, Li(e));
    r.emitter.on("pointerdown", this.handlePointerDown), r.emitter.on("dragstart", this.handleDragStart), r.emitter.on("hitupdate", this.handleHitUpdate), r.emitter.on("dragend", this.handleDragEnd);
  }
  destroy() {
    this.dragging.destroy();
  }
  querySegEl(e) {
    return U(e.subjectEl, ".fc-event");
  }
}
function sg(t, e, n, i) {
  let r = t.context.dateEnv, s = t.dateSpan.range.start, o = e.dateSpan.range.start, a = Ue(s, o, r, t.largeUnit);
  if (n) {
    if (r.add(i.start, a) < i.end)
      return { startDelta: a };
  } else if (r.add(i.end, a) > i.start)
    return { endDelta: a };
  return null;
}
class og {
  constructor(e) {
    this.context = e, this.isRecentPointerDateSelect = !1, this.matchesCancel = !1, this.matchesEvent = !1, this.onSelect = (i) => {
      i.jsEvent && (this.isRecentPointerDateSelect = !0);
    }, this.onDocumentPointerDown = (i) => {
      let r = this.context.options.unselectCancel, s = So(i.origEvent);
      this.matchesCancel = !!U(s, r), this.matchesEvent = !!U(s, Et.SELECTOR);
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
    let n = this.documentPointer = new Ba(document);
    n.shouldIgnoreMove = !0, n.shouldWatchScroll = !1, n.emitter.on("pointerdown", this.onDocumentPointerDown), n.emitter.on("pointerup", this.onDocumentPointerUp), e.emitter.on("select", this.onSelect);
  }
  destroy() {
    this.context.emitter.off("select", this.onSelect), this.documentPointer.destroy();
  }
}
const ag = {
  fixedMirrorParent: v
}, lg = {
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
Vi.dataAttrPrefix = "";
var cg = ue({
  name: "@fullcalendar/interaction",
  componentInteractions: [Xp, Jp, Et, rg],
  calendarInteractions: [og],
  elementDraggingImpl: wt,
  optionRefiners: ag,
  listenerRefiners: lg
});
class dg extends ih {
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
    return e.allDay ? Ou(e) ? ["timed", "allDay"] : ["allDay"] : ["timed"];
  }
}
const ug = $({
  hour: "numeric",
  minute: "2-digit",
  omitZeroMinute: !0,
  meridiem: "short"
});
function Wa(t) {
  let e = [
    "fc-timegrid-slot",
    "fc-timegrid-slot-label",
    t.isLabeled ? "fc-scrollgrid-shrink" : "fc-timegrid-slot-minor"
  ];
  return p(de.Consumer, null, (n) => {
    if (!t.isLabeled)
      return p("td", { className: e.join(" "), "data-time": t.isoTimeStr });
    let { dateEnv: i, options: r, viewApi: s } = n, o = (
      // TODO: fully pre-parse
      r.slotLabelFormat == null ? ug : Array.isArray(r.slotLabelFormat) ? $(r.slotLabelFormat[0]) : $(r.slotLabelFormat)
    ), a = {
      level: 0,
      time: t.time,
      date: i.toDate(t.date),
      view: s,
      text: i.format(t.date, o)
    };
    return p(K, { elTag: "td", elClasses: e, elAttrs: {
      "data-time": t.isoTimeStr
    }, renderProps: a, generatorName: "slotLabelContent", customGenerator: r.slotLabelContent, defaultGenerator: hg, classNameGenerator: r.slotLabelClassNames, didMount: r.slotLabelDidMount, willUnmount: r.slotLabelWillUnmount }, (l) => p(
      "div",
      { className: "fc-timegrid-slot-label-frame fc-scrollgrid-shrink-frame" },
      p(l, { elTag: "div", elClasses: [
        "fc-timegrid-slot-label-cushion",
        "fc-scrollgrid-shrink-cushion"
      ] })
    ));
  });
}
function hg(t) {
  return t.text;
}
class fg extends T {
  render() {
    return this.props.slatMetas.map((e) => p(
      "tr",
      { key: e.key },
      p(Wa, Object.assign({}, e))
    ));
  }
}
const pg = $({ week: "short" }), gg = 5;
class mg extends se {
  constructor() {
    super(...arguments), this.allDaySplitter = new dg(), this.headerElRef = F(), this.rootElRef = F(), this.scrollerElRef = F(), this.state = {
      slatCoords: null
    }, this.handleScrollTopRequest = (e) => {
      let n = this.scrollerElRef.current;
      n && (n.scrollTop = e);
    }, this.renderHeadAxis = (e, n = "") => {
      let { options: i } = this.context, { dateProfile: r } = this.props, s = r.renderRange, a = Pe(s.start, s.end) === 1 ? en(this.context, s.start, "week") : {};
      return i.weekNumbers && e === "day" ? p(ya, { elTag: "th", elClasses: [
        "fc-timegrid-axis",
        "fc-scrollgrid-shrink"
      ], elAttrs: {
        "aria-hidden": !0
      }, date: s.start, defaultFormat: pg }, (l) => p(
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
        p(K, { elTag: "td", elClasses: [
          "fc-timegrid-axis",
          "fc-scrollgrid-shrink"
        ], elAttrs: {
          "aria-hidden": !0
        }, renderProps: r, generatorName: "allDayContent", customGenerator: n.allDayContent, defaultGenerator: vg, classNameGenerator: n.allDayClassNames, didMount: n.allDayDidMount, willUnmount: n.allDayWillUnmount }, (s) => p(
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
    let { context: r, props: s } = this, o = [], a = tn(r.options);
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
      Zt,
      { elRef: this.rootElRef, elClasses: ["fc-timegrid"], viewSpec: r.viewSpec },
      p(Gi, { liquid: !s.isHeightAuto && !s.forPrint, collapsibleWidth: s.forPrint, cols: [{ width: "shrink" }], sections: o })
    );
  }
  renderHScrollLayout(e, n, i, r, s, o, a) {
    let l = this.context.pluginHooks.scrollGridImpl;
    if (!l)
      throw new Error("No ScrollGrid implementation");
    let { context: d, props: c } = this, f = !c.forPrint && tn(d.options), h = !c.forPrint && ma(d.options), u = [];
    e && u.push({
      type: "header",
      key: "header",
      isSticky: f,
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
                  p(fg, { slatMetas: o })
                )
              ),
              p(
                "div",
                { className: "fc-timegrid-now-indicator-container" },
                p(tt, {
                  unit: g ? "minute" : "day"
                  /* hacky */
                }, (b) => {
                  let w = g && a && a.safeComputeTop(b);
                  return typeof w == "number" ? p(Qi, { elClasses: ["fc-timegrid-now-indicator-arrow"], elStyle: { top: w }, isAxis: !0, date: b }) : null;
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
    }), h && u.push({
      key: "footer",
      type: "footer",
      isSticky: !0,
      chunks: [
        {
          key: "axis",
          content: ni
        },
        {
          key: "cols",
          content: ni
        }
      ]
    }), p(
      Zt,
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
    return (e === !0 || n === !0) && (e = void 0, n = gg), { dayMaxEvents: e, dayMaxEventRows: n };
  }
}
function vg(t) {
  return t.text;
}
class bg {
  constructor(e, n, i) {
    this.positions = e, this.dateProfile = n, this.slotDuration = i;
  }
  safeComputeTop(e) {
    let { dateProfile: n } = this;
    if (ae(n.currentRange, e)) {
      let i = I(e), r = e.valueOf() - i.valueOf();
      if (r >= J(n.slotMinTime) && r < J(n.slotMaxTime))
        return this.computeTimeTop(x(r));
    }
    return null;
  }
  // Computes the top coordinate, relative to the bounds of the grid, of the given date.
  // A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
  computeDateTop(e, n) {
    return n || (n = I(e)), this.computeTimeTop(x(e.valueOf() - n.valueOf()));
  }
  // Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
  // This is a makeshify way to compute the time-top. Assumes all slatMetas dates are uniform.
  // Eventually allow computation with arbirary slat dates.
  computeTimeTop(e) {
    let { positions: n, dateProfile: i } = this, r = n.els.length, s = (e.milliseconds - J(i.slotMinTime)) / J(this.slotDuration), o, a;
    return s = Math.max(0, s), s = Math.min(r, s), o = Math.floor(s), o = Math.min(o, r - 1), a = s - o, n.tops[o] + n.getHeight(o) * a;
  }
}
class yg extends T {
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
        e.axis && p(Wa, Object.assign({}, s)),
        p(K, { elTag: "td", elClasses: [
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
class wg extends T {
  constructor() {
    super(...arguments), this.rootElRef = F(), this.slatElRefs = new oe();
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
        p(yg, { slatElRefs: this.slatElRefs, axis: e.axis, slatMetas: e.slatMetas })
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
    n.onCoords && n.clientWidth !== null && this.rootElRef.current.offsetHeight && n.onCoords(new bg(new Xe(this.rootElRef.current, Eg(this.slatElRefs.currentMap, n.slatMetas), !1, !0), this.props.dateProfile, e.options.slotDuration));
  }
}
function Eg(t, e) {
  return e.map((n) => t[n.key]);
}
function st(t, e) {
  let n = [], i;
  for (i = 0; i < e; i += 1)
    n.push([]);
  if (t)
    for (i = 0; i < t.length; i += 1)
      n[t[i].col].push(t[i]);
  return n;
}
function ds(t, e) {
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
class Sg extends T {
  render() {
    let { props: e } = this;
    return p(wa, { elClasses: ["fc-timegrid-more-link"], elStyle: {
      top: e.top,
      bottom: e.bottom
    }, allDayDate: null, moreCnt: e.hiddenSegs.length, allSegs: e.hiddenSegs, hiddenSegs: e.hiddenSegs, extraDateSpan: e.extraDateSpan, dateProfile: e.dateProfile, todayRange: e.todayRange, popoverContent: () => Ga(e.hiddenSegs, e), defaultGenerator: Ag, forceTimed: !0 }, (n) => p(n, { elTag: "div", elClasses: ["fc-timegrid-more-link-inner", "fc-sticky"] }));
  }
}
function Ag(t) {
  return t.shortText;
}
function Dg(t, e, n) {
  let i = new sa();
  e != null && (i.strictOrder = e), n != null && (i.maxStackCnt = n);
  let r = i.addSegs(t), s = mh(r), o = Cg(i);
  return o = Tg(o, 1), { segRects: kg(o), hiddenGroups: s };
}
function Cg(t) {
  const { entriesByLevel: e } = t, n = Ji((i, r) => i + ":" + r, (i, r) => {
    let s = Rg(t, i, r), o = us(s, n), a = e[i][r];
    return [
      Object.assign(Object.assign({}, a), { nextLevelNodes: o[0] }),
      a.thickness + o[1]
      // the pressure builds
    ];
  });
  return us(e.length ? { level: 0, lateralStart: 0, lateralEnd: e[0].length } : null, n)[0];
}
function us(t, e) {
  if (!t)
    return [[], 0];
  let { level: n, lateralStart: i, lateralEnd: r } = t, s = i, o = [];
  for (; s < r; )
    o.push(e(n, s)), s += 1;
  return o.sort(xg), [
    o.map(_g),
    o[0][1]
    // first item's pressure
  ];
}
function xg(t, e) {
  return e[1] - t[1];
}
function _g(t) {
  return t[0];
}
function Rg(t, e, n) {
  let { levelCoords: i, entriesByLevel: r } = t, s = r[e][n], o = i[e] + s.thickness, a = i.length, l = e;
  for (; l < a && i[l] < o; l += 1)
    ;
  for (; l < a; l += 1) {
    let d = r[l], c, f = ti(d, s.span.start, ei), h = f[0] + f[1], u = h;
    for (
      ;
      // loop through entries that horizontally intersect
      (c = d[u]) && // but not past the whole seg list
      c.span.start < s.span.end;
    )
      u += 1;
    if (h < u)
      return { level: l, lateralStart: h, lateralEnd: u };
  }
  return null;
}
function Tg(t, e) {
  const n = Ji((i, r, s) => Te(i), (i, r, s) => {
    let { nextLevelNodes: o, thickness: a } = i, l = a + s, d = a / l, c, f = [];
    if (!o.length)
      c = e;
    else
      for (let u of o)
        if (c === void 0) {
          let g = n(u, r, l);
          c = g[0], f.push(g[1]);
        } else {
          let g = n(u, c, 0);
          f.push(g[1]);
        }
    let h = (c - r) * d;
    return [c - h, Object.assign(Object.assign({}, i), { thickness: h, nextLevelNodes: f })];
  });
  return t.map((i) => n(i, 0, 0)[1]);
}
function kg(t) {
  let e = [];
  const n = Ji((r, s, o) => Te(r), (r, s, o) => {
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
function Ji(t, e) {
  const n = {};
  return (...i) => {
    let r = t(...i);
    return r in n ? n[r] : n[r] = e(...i);
  };
}
function hs(t, e, n = null, i = 0) {
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
function Mg(t, e, n, i) {
  let r = [], s = [];
  for (let d = 0; d < t.length; d += 1) {
    let c = e[d];
    c ? r.push({
      index: d,
      thickness: 1,
      span: c
    }) : s.push(t[d]);
  }
  let { segRects: o, hiddenGroups: a } = Dg(r, n, i), l = [];
  for (let d of o)
    l.push({
      seg: t[d.index],
      rect: d
    });
  for (let d of s)
    l.push({ seg: d, rect: null });
  return { segPlacements: l, hiddenGroups: a };
}
const Ig = $({
  hour: "numeric",
  minute: "2-digit",
  meridiem: !1
});
class Va extends T {
  render() {
    return p(Yi, Object.assign({}, this.props, { elClasses: [
      "fc-timegrid-event",
      "fc-v-event",
      this.props.isShort && "fc-timegrid-event-short"
    ], defaultTimeFormat: Ig }));
  }
}
class Og extends T {
  constructor() {
    super(...arguments), this.sortEventSegs = A(Yo);
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
    return p(Zi, { elTag: "td", elRef: e.elRef, elClasses: [
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
      Ki(i) && p(l, { elTag: "div", elClasses: ["fc-timegrid-col-misc"] })
    ));
  }
  renderFgSegs(e, n, i, r, s, o) {
    let { props: a } = this;
    return a.forPrint ? Ga(e, a) : this.renderPositionedFgSegs(e, n, i, r, s, o);
  }
  renderPositionedFgSegs(e, n, i, r, s, o) {
    let { eventMaxStack: a, eventShortHeight: l, eventOrderStrict: d, eventMinHeight: c } = this.context.options, { date: f, slatCoords: h, eventSelection: u, todayRange: g, nowDate: m } = this.props, b = i || r || s, w = hs(e, f, h, c), { segPlacements: E, hiddenGroups: D } = Mg(e, w, d, a);
    return p(
      M,
      null,
      this.renderHiddenGroups(D, e),
      E.map((C) => {
        let { seg: P, rect: k } = C, O = P.eventRange.instance.instanceId, _ = b || !!(!n[O] && k), fe = Bn(k && k.span), it = !b && k ? this.computeSegHStyle(k) : { left: 0, right: 0 }, pl = !!k && k.stackForward > 0, gl = !!k && k.span.end - k.span.start < l;
        return p(
          "div",
          { className: "fc-timegrid-event-harness" + (pl ? " fc-timegrid-event-harness-inset" : ""), key: o || O, style: Object.assign(Object.assign({ visibility: _ ? "" : "hidden" }, fe), it) },
          p(Va, Object.assign({ seg: P, isDragging: i, isResizing: r, isDateSelecting: s, isSelected: O === u, isShort: gl }, be(P, g, m)))
        );
      })
    );
  }
  // will already have eventMinHeight applied because segInputs already had it
  renderHiddenGroups(e, n) {
    let { extraDateSpan: i, dateProfile: r, todayRange: s, nowDate: o, eventSelection: a, eventDrag: l, eventResize: d } = this.props;
    return p(M, null, e.map((c) => {
      let f = Bn(c.span), h = Ng(c.entries, n);
      return p(Sg, { key: _o(Ea(h)), hiddenSegs: h, top: f.top, bottom: f.bottom, extraDateSpan: i, dateProfile: r, todayRange: s, nowDate: o, eventSelection: a, eventDrag: l, eventResize: d });
    }));
  }
  renderFillSegs(e, n) {
    let { props: i, context: r } = this, o = hs(e, i.date, i.slatCoords, r.options.eventMinHeight).map((a, l) => {
      let d = e[l];
      return p("div", { key: Zo(d.eventRange), className: "fc-timegrid-bg-harness", style: Bn(a) }, n === "bg-event" ? p(va, Object.assign({ seg: d }, be(d, i.todayRange, i.nowDate))) : ba(n));
    });
    return p(M, null, o);
  }
  renderNowIndicator(e) {
    let { slatCoords: n, date: i } = this.props;
    return n ? e.map((r, s) => p(
      Qi,
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
function Ga(t, { todayRange: e, nowDate: n, eventSelection: i, eventDrag: r, eventResize: s }) {
  let o = (r ? r.affectedInstances : null) || (s ? s.affectedInstances : null) || {};
  return p(M, null, t.map((a) => {
    let l = a.eventRange.instance.instanceId;
    return p(
      "div",
      { key: l, style: { visibility: o[l] ? "hidden" : "" } },
      p(Va, Object.assign({ seg: a, isDragging: !1, isResizing: !1, isDateSelecting: !1, isSelected: l === i, isShort: !1 }, be(a, e, n)))
    );
  }));
}
function Bn(t) {
  return t ? {
    top: t.start,
    bottom: -t.end
  } : { top: "", bottom: "" };
}
function Ng(t, e) {
  return t.map((n) => e[n.index]);
}
class $g extends T {
  constructor() {
    super(...arguments), this.splitFgEventSegs = A(st), this.splitBgEventSegs = A(st), this.splitBusinessHourSegs = A(st), this.splitNowIndicatorSegs = A(st), this.splitDateSelectionSegs = A(st), this.splitEventDrag = A(ds), this.splitEventResize = A(ds), this.rootElRef = F(), this.cellElRefs = new oe();
  }
  render() {
    let { props: e, context: n } = this, i = n.options.nowIndicator && e.slatCoords && e.slatCoords.safeComputeTop(e.nowDate), r = e.cells.length, s = this.splitFgEventSegs(e.fgEventSegs, r), o = this.splitBgEventSegs(e.bgEventSegs, r), a = this.splitBusinessHourSegs(e.businessHourSegs, r), l = this.splitNowIndicatorSegs(e.nowIndicatorSegs, r), d = this.splitDateSelectionSegs(e.dateSelectionSegs, r), c = this.splitEventDrag(e.eventDrag, r), f = this.splitEventResize(e.eventResize, r);
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
                p("div", { className: "fc-timegrid-now-indicator-container" }, typeof i == "number" && p(Qi, { elClasses: ["fc-timegrid-now-indicator-arrow"], elStyle: { top: i }, isAxis: !0, date: e.nowDate }))
              )
            ),
            e.cells.map((h, u) => p(Og, { key: h.key, elRef: this.cellElRefs.createRef(h.key), dateProfile: e.dateProfile, date: h.date, nowDate: e.nowDate, todayRange: e.todayRange, extraRenderProps: h.extraRenderProps, extraDataAttrs: h.extraDataAttrs, extraClassNames: h.extraClassNames, extraDateSpan: h.extraDateSpan, fgEventSegs: s[u], bgEventSegs: o[u], businessHourSegs: a[u], nowIndicatorSegs: l[u], dateSelectionSegs: d[u], eventDrag: c[u], eventResize: f[u], slatCoords: e.slatCoords, eventSelection: e.eventSelection, forPrint: e.forPrint }))
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
    e.onColCoords && e.clientWidth !== null && e.onColCoords(new Xe(
      this.rootElRef.current,
      Pg(this.cellElRefs.currentMap, e.cells),
      !0,
      // horizontal
      !1
    ));
  }
}
function Pg(t, e) {
  return e.map((n) => t[n.key]);
}
class Hg extends se {
  constructor() {
    super(...arguments), this.processSlotOptions = A(zg), this.state = {
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
      p(wg, { axis: e.axis, dateProfile: e.dateProfile, slatMetas: e.slatMetas, clientWidth: e.clientWidth, minHeight: e.expandRows ? e.clientHeight : "", tableMinWidth: e.tableMinWidth, tableColGroupNode: e.axis ? e.tableColGroupNode : null, onCoords: this.handleSlatCoords }),
      p($g, { cells: e.cells, axis: e.axis, dateProfile: e.dateProfile, businessHourSegs: e.businessHourSegs, bgEventSegs: e.bgEventSegs, fgEventSegs: e.fgEventSegs, dateSelectionSegs: e.dateSelectionSegs, eventSelection: e.eventSelection, eventDrag: e.eventDrag, eventResize: e.eventResize, todayRange: e.todayRange, nowDate: e.nowDate, nowIndicatorSegs: e.nowIndicatorSegs, clientWidth: e.clientWidth, tableMinWidth: e.tableMinWidth, tableColGroupNode: e.tableColGroupNode, slatCoords: n.slatCoords, onColCoords: this.handleColCoords, forPrint: e.forPrint })
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
    let { dateEnv: i, options: r } = this.context, { colCoords: s } = this, { dateProfile: o } = this.props, { slatCoords: a } = this.state, { snapDuration: l, snapsPerSlot: d } = this.processSlotOptions(this.props.slotDuration, r.snapDuration), c = s.leftToIndex(e), f = a.positions.topToIndex(n);
    if (c != null && f != null) {
      let h = this.props.cells[c], u = a.positions.tops[f], g = a.positions.getHeight(f), m = (n - u) / g, b = Math.floor(m * d), w = f * d + b, E = this.props.cells[c].date, D = Yn(o.slotMinTime, sd(l, w)), C = i.add(E, D), P = i.add(C, l);
      return {
        dateProfile: o,
        dateSpan: Object.assign({ range: { start: C, end: P }, allDay: !1 }, h.extraDateSpan),
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
function zg(t, e) {
  let n = e || t, i = xi(t, n);
  return i === null && (n = t, i = 1), { snapDuration: n, snapsPerSlot: i };
}
class Bg extends ua {
  sliceRange(e, n) {
    let i = [];
    for (let r = 0; r < n.length; r += 1) {
      let s = Oe(e, n[r]);
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
class Lg extends se {
  constructor() {
    super(...arguments), this.buildDayRanges = A(Ug), this.slicer = new Bg(), this.timeColsRef = F();
  }
  render() {
    let { props: e, context: n } = this, { dateProfile: i, dayTableModel: r } = e, { nowIndicator: s, nextDayThreshold: o } = n.options, a = this.buildDayRanges(r, i, n.dateEnv);
    return p(tt, { unit: s ? "minute" : "day" }, (l, d) => p(Hg, Object.assign({ ref: this.timeColsRef }, this.slicer.sliceProps(e, i, null, n, a), { forPrint: e.forPrint, axis: e.axis, dateProfile: i, slatMetas: e.slatMetas, slotDuration: e.slotDuration, cells: r.cells[0], tableColGroupNode: e.tableColGroupNode, tableMinWidth: e.tableMinWidth, clientWidth: e.clientWidth, clientHeight: e.clientHeight, expandRows: e.expandRows, nowDate: l, nowIndicatorSegs: s && this.slicer.sliceNowDate(l, i, o, n, a), todayRange: d, onScrollTopRequest: e.onScrollTopRequest, onSlatCoords: e.onSlatCoords })));
  }
}
function Ug(t, e, n) {
  let i = [];
  for (let r of t.headerDates)
    i.push({
      start: n.add(r, e.slotMinTime),
      end: n.add(r, e.slotMaxTime)
    });
  return i;
}
const fs = [
  { hours: 1 },
  { minutes: 30 },
  { minutes: 15 },
  { seconds: 30 },
  { seconds: 15 }
];
function Fg(t, e, n, i, r) {
  let s = /* @__PURE__ */ new Date(0), o = t, a = x(0), l = n || jg(i), d = [];
  for (; J(o) < J(e); ) {
    let c = r.add(s, o), f = xi(a, l) !== null;
    d.push({
      date: c,
      time: o,
      key: c.toISOString(),
      isoTimeStr: Ed(c),
      isLabeled: f
    }), o = Yn(o, i), a = Yn(a, i);
  }
  return d;
}
function jg(t) {
  let e, n, i;
  for (e = fs.length - 1; e >= 0; e -= 1)
    if (n = x(fs[e]), i = xi(n, t), i !== null && i > 1)
      return n;
  return t;
}
class Wg extends mg {
  constructor() {
    super(...arguments), this.buildTimeColsModel = A(Vg), this.buildSlatMetas = A(Fg);
  }
  render() {
    let { options: e, dateEnv: n, dateProfileGenerator: i } = this.context, { props: r } = this, { dateProfile: s } = r, o = this.buildTimeColsModel(s, i), a = this.allDaySplitter.splitProps(r), l = this.buildSlatMetas(s.slotMinTime, s.slotMaxTime, e.slotLabelInterval, e.slotDuration, n), { dayMinWidth: d } = e, c = !d, f = d, h = e.dayHeaders && p(la, { dates: o.headerDates, dateProfile: s, datesRepDistinctDays: !0, renderIntro: c ? this.renderHeadAxis : null }), u = e.allDaySlot !== !1 && ((m) => p(za, Object.assign({}, a.allDay, { dateProfile: s, dayTableModel: o, nextDayThreshold: e.nextDayThreshold, tableMinWidth: m.tableMinWidth, colGroupNode: m.tableColGroupNode, renderRowIntro: c ? this.renderTableRowAxis : null, showWeekNumbers: !1, expandRows: !1, headerAlignElRef: this.headerElRef, clientWidth: m.clientWidth, clientHeight: m.clientHeight, forPrint: r.forPrint }, this.getAllDayMaxEventProps()))), g = (m) => p(Lg, Object.assign({}, a.timed, { dayTableModel: o, dateProfile: s, axis: c, slotDuration: e.slotDuration, slatMetas: l, forPrint: r.forPrint, tableColGroupNode: m.tableColGroupNode, tableMinWidth: m.tableMinWidth, clientWidth: m.clientWidth, clientHeight: m.clientHeight, onSlatCoords: this.handleSlatCoords, expandRows: m.expandRows, onScrollTopRequest: this.handleScrollTopRequest }));
    return f ? this.renderHScrollLayout(h, u, g, o.colCnt, d, l, this.state.slatCoords) : this.renderSimpleLayout(h, u, g);
  }
}
function Vg(t, e) {
  let n = new ca(t.renderRange, e);
  return new da(n, !1);
}
var Gg = '.fc-v-event{background-color:var(--fc-event-bg-color);border:1px solid var(--fc-event-border-color);display:block}.fc-v-event .fc-event-main{color:var(--fc-event-text-color);height:100%}.fc-v-event .fc-event-main-frame{display:flex;flex-direction:column;height:100%}.fc-v-event .fc-event-time{flex-grow:0;flex-shrink:0;max-height:100%;overflow:hidden}.fc-v-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-height:0}.fc-v-event .fc-event-title{bottom:0;max-height:100%;overflow:hidden;top:0}.fc-v-event:not(.fc-event-start){border-top-left-radius:0;border-top-right-radius:0;border-top-width:0}.fc-v-event:not(.fc-event-end){border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-width:0}.fc-v-event.fc-event-selected:before{left:-10px;right:-10px}.fc-v-event .fc-event-resizer-start{cursor:n-resize}.fc-v-event .fc-event-resizer-end{cursor:s-resize}.fc-v-event:not(.fc-event-selected) .fc-event-resizer{height:var(--fc-event-resizer-thickness);left:0;right:0}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-start{top:calc(var(--fc-event-resizer-thickness)/-2)}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-end{bottom:calc(var(--fc-event-resizer-thickness)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer{left:50%;margin-left:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer-start{top:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer-end{bottom:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc .fc-timegrid .fc-daygrid-body{z-index:2}.fc .fc-timegrid-divider{padding:0 0 2px}.fc .fc-timegrid-body{min-height:100%;position:relative;z-index:1}.fc .fc-timegrid-axis-chunk{position:relative}.fc .fc-timegrid-axis-chunk>table,.fc .fc-timegrid-slots{position:relative;z-index:1}.fc .fc-timegrid-slot{border-bottom:0;height:1.5em}.fc .fc-timegrid-slot:empty:before{content:"\\00a0"}.fc .fc-timegrid-slot-minor{border-top-style:dotted}.fc .fc-timegrid-slot-label-cushion{display:inline-block;white-space:nowrap}.fc .fc-timegrid-slot-label{vertical-align:middle}.fc .fc-timegrid-axis-cushion,.fc .fc-timegrid-slot-label-cushion{padding:0 4px}.fc .fc-timegrid-axis-frame-liquid{height:100%}.fc .fc-timegrid-axis-frame{align-items:center;display:flex;justify-content:flex-end;overflow:hidden}.fc .fc-timegrid-axis-cushion{flex-shrink:0;max-width:60px}.fc-direction-ltr .fc-timegrid-slot-label-frame{text-align:right}.fc-direction-rtl .fc-timegrid-slot-label-frame{text-align:left}.fc-liquid-hack .fc-timegrid-axis-frame-liquid{bottom:0;height:auto;left:0;position:absolute;right:0;top:0}.fc .fc-timegrid-col.fc-day-today{background-color:var(--fc-today-bg-color)}.fc .fc-timegrid-col-frame{min-height:100%;position:relative}.fc-media-screen.fc-liquid-hack .fc-timegrid-col-frame{bottom:0;height:auto;left:0;position:absolute;right:0;top:0}.fc-media-screen .fc-timegrid-cols{bottom:0;left:0;position:absolute;right:0;top:0}.fc-media-screen .fc-timegrid-cols>table{height:100%}.fc-media-screen .fc-timegrid-col-bg,.fc-media-screen .fc-timegrid-col-events,.fc-media-screen .fc-timegrid-now-indicator-container{left:0;position:absolute;right:0;top:0}.fc .fc-timegrid-col-bg{z-index:2}.fc .fc-timegrid-col-bg .fc-non-business{z-index:1}.fc .fc-timegrid-col-bg .fc-bg-event{z-index:2}.fc .fc-timegrid-col-bg .fc-highlight{z-index:3}.fc .fc-timegrid-bg-harness{left:0;position:absolute;right:0}.fc .fc-timegrid-col-events{z-index:3}.fc .fc-timegrid-now-indicator-container{bottom:0;overflow:hidden}.fc-direction-ltr .fc-timegrid-col-events{margin:0 2.5% 0 2px}.fc-direction-rtl .fc-timegrid-col-events{margin:0 2px 0 2.5%}.fc-timegrid-event-harness{position:absolute}.fc-timegrid-event-harness>.fc-timegrid-event{bottom:0;left:0;position:absolute;right:0;top:0}.fc-timegrid-event-harness-inset .fc-timegrid-event,.fc-timegrid-event.fc-event-mirror,.fc-timegrid-more-link{box-shadow:0 0 0 1px var(--fc-page-bg-color)}.fc-timegrid-event,.fc-timegrid-more-link{border-radius:3px;font-size:var(--fc-small-font-size)}.fc-timegrid-event{margin-bottom:1px}.fc-timegrid-event .fc-event-main{padding:1px 1px 0}.fc-timegrid-event .fc-event-time{font-size:var(--fc-small-font-size);margin-bottom:1px;white-space:nowrap}.fc-timegrid-event-short .fc-event-main-frame{flex-direction:row;overflow:hidden}.fc-timegrid-event-short .fc-event-time:after{content:"\\00a0-\\00a0"}.fc-timegrid-event-short .fc-event-title{font-size:var(--fc-small-font-size)}.fc-timegrid-more-link{background:var(--fc-more-link-bg-color);color:var(--fc-more-link-text-color);cursor:pointer;margin-bottom:1px;position:absolute;z-index:9999}.fc-timegrid-more-link-inner{padding:3px 2px;top:0}.fc-direction-ltr .fc-timegrid-more-link{right:0}.fc-direction-rtl .fc-timegrid-more-link{left:0}.fc .fc-timegrid-now-indicator-arrow,.fc .fc-timegrid-now-indicator-line{pointer-events:none}.fc .fc-timegrid-now-indicator-line{border-color:var(--fc-now-indicator-color);border-style:solid;border-width:1px 0 0;left:0;position:absolute;right:0;z-index:4}.fc .fc-timegrid-now-indicator-arrow{border-color:var(--fc-now-indicator-color);border-style:solid;margin-top:-5px;position:absolute;z-index:4}.fc-direction-ltr .fc-timegrid-now-indicator-arrow{border-bottom-color:transparent;border-top-color:transparent;border-width:5px 0 5px 6px;left:0}.fc-direction-rtl .fc-timegrid-now-indicator-arrow{border-bottom-color:transparent;border-top-color:transparent;border-width:5px 6px 5px 0;right:0}';
Ei(Gg);
const qg = {
  allDaySlot: Boolean
};
var Yg = ue({
  name: "@fullcalendar/timegrid",
  initialView: "timeGridWeek",
  optionRefiners: qg,
  views: {
    timeGrid: {
      component: Wg,
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
function qa(t) {
  const e = t.getTimezoneOffset() * 6e4;
  return new Date(t.getTime() - e).toISOString();
}
function rn(t, e) {
  if (!t) return "";
  const n = qa(t);
  return e ? n.slice(0, 10) : n.slice(0, 16);
}
function ps(t, e) {
  if (!t) return "";
  const n = qa(t);
  return e ? n.slice(0, 10) : n.slice(0, 19);
}
function gs(t, e) {
  return t ? e ? t.slice(0, 10) : `${t.slice(0, 10)}T09:00` : "";
}
function ms(t) {
  const e = String(Math.floor(t / 60)).padStart(2, "0"), n = String(t % 60).padStart(2, "0");
  return `${e}:${n}:00`;
}
const Ya = "06:00:00", Qa = "22:00:00", vs = 60, Ln = 1440;
function Qg(t, e) {
  return t.getFullYear() !== e.getFullYear() || t.getMonth() !== e.getMonth() || t.getDate() !== e.getDate();
}
function Zg(t, e, n) {
  const i = t.filter((o) => {
    if (o.allDay) return !1;
    const a = new Date(o.start);
    return new Date(o.end) > e && a < n;
  });
  if (i.length === 0)
    return { min: Ya, max: Qa };
  let r = Ln, s = 0;
  for (const o of i) {
    const a = new Date(o.start), l = new Date(o.end);
    if (Qg(a, l)) {
      r = 0, s = Ln;
      continue;
    }
    r = Math.min(r, a.getHours() * 60 + a.getMinutes()), s = Math.max(s, l.getHours() * 60 + l.getMinutes());
  }
  return {
    min: ms(Math.max(0, r - vs)),
    max: ms(Math.min(Ln, s + vs))
  };
}
function Kg(t, e) {
  const n = new pp(t, {
    plugins: [Yg, Up, cg],
    initialView: "timeGridWeek",
    locale: gp,
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
    slotMinTime: Ya,
    slotMaxTime: Qa,
    slotLabelFormat: { hour: "2-digit", minute: "2-digit", hour12: !1 },
    eventTimeFormat: { hour: "2-digit", minute: "2-digit", meridiem: !1 },
    events: []
  });
  return n.render(), n;
}
const Xg = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"];
function Jg(t) {
  const e = /FREQ=([A-Z]+)/.exec(t)?.[1] ?? "", n = /UNTIL=(\d{4})(\d{2})(\d{2})/.exec(t);
  return {
    frequency: Xg.includes(e) ? e : "",
    until: n ? `${n[1]}-${n[2]}-${n[3]}` : ""
  };
}
function em(t, e) {
  if (!t) return;
  if (!e) return `FREQ=${t}`;
  const i = (/* @__PURE__ */ new Date(`${e}T23:59:59`)).toISOString().replace(/[-:]/g, "").slice(0, 15);
  return `FREQ=${t};UNTIL=${i}Z`;
}
function Fe() {
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
function bs(t, e, n, i) {
  return {
    ...Fe(),
    showModal: !0,
    isAllDay: n,
    newEventCalendar: i,
    newEventStart: rn(t, n),
    newEventEnd: rn(e, n)
  };
}
function ys(t) {
  const e = t.extendedProps, n = Jg(e.rrule);
  return {
    ...Fe(),
    showModal: !0,
    editMode: !0,
    isAllDay: t.allDay,
    currentEventId: e.uid || (t.id ?? ""),
    currentRecurrenceId: e.recurrenceId,
    currentRrule: e.rrule,
    newEventTitle: t.title,
    newEventCalendar: e.entityId,
    newEventStart: rn(t.start, t.allDay),
    newEventEnd: rn(t.end ?? t.start, t.allDay),
    newEventRecurrence: n.frequency,
    newEventUntil: n.until
  };
}
function tm(t, e) {
  return e === t.isAllDay ? {} : {
    isAllDay: e,
    newEventStart: gs(t.newEventStart, e),
    newEventEnd: gs(t.newEventEnd, e)
  };
}
function nm(t) {
  const e = t;
  return e ? { newEventRecurrence: e } : { newEventRecurrence: "", newEventUntil: "" };
}
function im(t) {
  return t.newEventTitle.trim() ? t.newEventCalendar ? !t.newEventStart || !t.newEventEnd ? "Bitte Start und Ende angeben." : null : "Bitte einen Kalender auswählen." : "Bitte einen Titel eingeben.";
}
function ws(t) {
  const e = {
    summary: t.newEventTitle.trim(),
    dtstart: t.newEventStart,
    dtend: t.newEventEnd
  }, n = em(t.newEventRecurrence, t.newEventUntil);
  return n && (e.rrule = n), e;
}
function Za(t) {
  return t.currentRecurrenceId ? {
    recurrence_id: t.currentRecurrenceId,
    recurrence_range: "THISANDFUTURE"
  } : {};
}
async function rm(t, e) {
  try {
    return e.editMode && e.currentEventId ? await Qs(
      t.hass,
      e.newEventCalendar,
      e.currentEventId,
      ws(e),
      Za(e)
    ) : await ql(t.hass, e.newEventCalendar, ws(e)), !0;
  } catch (n) {
    return console.error("Family Calendar: Speichern fehlgeschlagen", n), t.notify(`Termin konnte nicht gespeichert werden: ${t.errorText(n)}`), !1;
  }
}
async function sm(t, e) {
  try {
    return await Yl(
      t.hass,
      e.newEventCalendar,
      e.currentEventId,
      Za(e)
    ), !0;
  } catch (n) {
    return console.error("Family Calendar: Löschen fehlgeschlagen", n), t.notify(`Termin konnte nicht gelöscht werden: ${t.errorText(n)}`), !1;
  }
}
async function om(t, e) {
  const n = e.event, i = n.extendedProps;
  if (!i.uid)
    return e.revert(), t.notify("Dieser Termin hat keine Kennung und lässt sich nicht verschieben."), !1;
  const r = {
    summary: n.title,
    dtstart: ps(n.start, n.allDay),
    dtend: ps(n.end ?? n.start, n.allDay)
  };
  try {
    const s = i.recurrenceId ? { recurrence_id: i.recurrenceId } : {};
    return await Qs(t.hass, i.entityId, i.uid, r, s), !0;
  } catch (s) {
    return e.revert(), console.error("Family Calendar: Verschieben fehlgeschlagen", s), t.notify(`Termin konnte nicht verschoben werden: ${t.errorText(s)}`), !1;
  }
}
function am(t, e, n) {
  const i = [...t].sort((a, l) => e(a) - e(l) || n(a) - n(l)), r = [];
  let s = [], o = [];
  for (const a of i) {
    const l = e(a);
    s.every((f) => f <= l) && (Es(o, s.length), o = [], s = []);
    let d = s.findIndex((f) => f <= l);
    d === -1 && (d = s.length), s[d] = Math.max(n(a), l + 1);
    const c = { item: a, lane: d, lanes: 1 };
    o.push(c), r.push(c);
  }
  return Es(o, s.length), r;
}
function Es(t, e) {
  for (const n of t)
    n.lanes = Math.max(1, e);
}
const sn = 1440, lm = {
  padMinutes: 30,
  minGapMinutes: 75,
  minGapPx: 26,
  maxGapPx: 76,
  maxPxPerMinute: 1.6
}, cm = 180, dm = 0.45;
function um(t, e, n = {}) {
  const i = { ...lm, ...n }, r = Ss(t.map(gm).filter((m) => m.to > m.from));
  if (r.length === 0 || e <= 0) return null;
  const s = Ss(
    r.map((m) => ({
      from: Math.max(0, m.from - i.padMinutes),
      to: Math.min(sn, m.to + i.padMinutes)
    }))
  ), o = mm(s, i.minGapMinutes), a = o.slice(1).map((m, b) => ({
    from: o[b].to,
    to: m.from
  })), l = a.map((m) => fm(m.to - m.from, i)), d = pm(l, e), c = o.reduce((m, b) => m + (b.to - b.from), 0), f = Math.max(0, e - Ka(d)), h = Math.min(i.maxPxPerMinute, f / c), u = [];
  let g = 0;
  return o.forEach((m, b) => {
    if (b > 0) {
      const E = a[b - 1];
      u.push({ kind: "gap", ...E, top: g, height: d[b - 1] }), g += d[b - 1];
    }
    const w = (m.to - m.from) * h;
    u.push({ kind: "busy", ...m, top: g, height: w }), g += w;
  }), { segments: u, height: g, pxPerMinute: h, yOf: (m) => hm(u, g, m) };
}
function hm(t, e, n) {
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
function fm(t, e) {
  const n = 1 - Math.pow(2, -t / cm);
  return e.minGapPx + (e.maxGapPx - e.minGapPx) * n;
}
function pm(t, e) {
  const n = e * dm, i = Ka(t);
  if (i <= n) return t;
  const r = n / i;
  return t.map((s) => s * r);
}
function Ka(t) {
  return t.reduce((e, n) => e + n, 0);
}
function gm(t) {
  return {
    from: Math.max(0, Math.min(sn, t.from)),
    to: Math.max(0, Math.min(sn, t.to))
  };
}
function Ss(t) {
  const e = [...t].sort((i, r) => i.from - r.from), n = [];
  for (const i of e) {
    const r = n[n.length - 1];
    r && i.from <= r.to ? r.to = Math.max(r.to, i.to) : n.push({ ...i });
  }
  return n;
}
function mm(t, e) {
  const n = [];
  for (const i of t) {
    const r = n[n.length - 1];
    r && i.from - r.to < e ? r.to = i.to : n.push({ ...i });
  }
  return n;
}
const vm = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"], bm = 15, ym = 34, Un = [30, 60, 120, 180, 360];
function wm(t, e, n, i, r = /* @__PURE__ */ new Date()) {
  const s = t.map(xm).filter((h) => h !== null), o = Cm(e, n), a = el(r).getTime(), l = [], d = o.map((h) => {
    const u = h, g = ai(h), m = s.filter((b) => !b.allDay && b.start < g && b.end > u);
    for (const b of m) l.push(Xa(b, u, g));
    return { datum: h, mitUhrzeit: m };
  }), c = um(l, i), f = d.map(({ datum: h, mitUhrzeit: u }) => ({
    date: h,
    weekday: vm[h.getDay()],
    dayNumber: h.getDate(),
    isToday: h.getTime() === a,
    allDay: s.filter((g) => g.allDay && g.start < ai(h) && g.end > h).map((g) => ({ event: g, color: g.color })),
    blocks: c ? Em(u, h, c.yOf) : []
  }));
  return c ? {
    days: f,
    ticks: Sm(c.segments, c.pxPerMinute, c.yOf),
    gaps: c.segments.filter((h) => h.kind === "gap").map((h) => ({ top: h.top, height: h.height, label: Dm(h.to - h.from) })),
    height: c.height,
    empty: !1
  } : { days: f, ticks: [], gaps: [], height: 0, empty: !0 };
}
function Em(t, e, n) {
  const i = ai(e), r = new Map(
    t.map((s) => [s, Xa(s, e, i)])
  );
  return am(
    t,
    (s) => r.get(s).from,
    (s) => r.get(s).to
  ).map(({ item: s, lane: o, lanes: a }) => {
    const l = r.get(s), d = n(l.from);
    return {
      event: s,
      color: s.color,
      top: d,
      height: Math.max(bm, n(l.to) - d),
      lane: o,
      lanes: a,
      time: Am(s, e, i)
    };
  });
}
function Sm(t, e, n) {
  const i = Un.find((s) => s * e >= ym) ?? Un[Un.length - 1], r = [];
  for (const s of t) {
    if (s.kind !== "busy") continue;
    const o = Math.ceil(s.from / i) * i;
    for (let a = o; a <= s.to; a += i)
      r.push({ y: n(a), label: Ja(a) });
  }
  return r;
}
function Xa(t, e, n) {
  const i = t.start <= e ? 0 : oi(t.start), r = t.end >= n ? sn : oi(t.end);
  return { from: i, to: Math.max(r, i + 1) };
}
function Am(t, e, n) {
  const i = t.start >= e, r = t.end <= n;
  return i && r ? `${Tt(t.start)} – ${Tt(t.end)}` : i ? `ab ${Tt(t.start)}` : r ? `bis ${Tt(t.end)}` : "durchgehend";
}
function Dm(t) {
  const e = Math.round(t), n = Math.floor(e / 60), i = e % 60;
  return n === 0 ? `${i} Min` : i === 0 ? `${n} Std` : `${n}:${String(i).padStart(2, "0")} Std`;
}
function oi(t) {
  return t.getHours() * 60 + t.getMinutes();
}
function Tt(t) {
  return Ja(oi(t));
}
function Ja(t) {
  const e = Math.floor(t / 60), n = Math.round(t % 60);
  return `${String(e).padStart(2, "0")}:${String(n).padStart(2, "0")}`;
}
function Cm(t, e) {
  const n = el(t);
  return Array.from({ length: e }, (i, r) => {
    const s = new Date(n);
    return s.setDate(s.getDate() + r), s;
  });
}
function el(t) {
  const e = new Date(t);
  return e.setHours(0, 0, 0, 0), e;
}
function ai(t) {
  const e = new Date(t);
  return e.setDate(e.getDate() + 1), e;
}
function xm(t) {
  const e = As(t.start);
  if (!e) return null;
  const n = As(t.end) ?? e;
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
function As(t) {
  if (t instanceof Date) return Number.isNaN(t.getTime()) ? null : t;
  if (typeof t != "string") return null;
  const e = /^\d{4}-\d{2}-\d{2}$/.test(t) ? `${t}T00:00:00` : t, n = new Date(e);
  return Number.isNaN(n.getTime()) ? null : n;
}
const _m = 7, Rm = 36, Ds = 240;
class Tm {
  /** onChange stoesst das Neuzeichnen an. */
  constructor(e) {
    this.onChange = e, this.budgetPx = Ds, this.onResize = () => this.measure();
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
    return wm(e, n, _m, this.budgetPx);
  }
  dispose() {
    window.removeEventListener("resize", this.onResize), this.frame = void 0;
  }
  measure() {
    if (!this.frame) return;
    const e = this.frame.getBoundingClientRect().top, n = Math.max(Ds, Math.floor(window.innerHeight - e - Rm));
    Math.abs(n - this.budgetPx) <= 1 || (this.budgetPx = n, this.onChange());
  }
}
const Cs = 7, km = 100;
class Mm {
  constructor(e) {
    this.ctx = e, this.all = [], this.visible = [], this.lastSignature = "", this.geladen = !1;
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
    }, km);
  }
  /** Wendet die Filter an und passt die Zeitachse an. */
  applyFilters() {
    const e = this.ctx.calendar();
    if (!e) return;
    this.visible = ec(this.all, this.ctx.activeCalendars()), e.removeAllEventSources(), e.addEventSource(this.visible);
    const n = e.view;
    this.adjustTimeRange(n.activeStart, n.activeEnd), e.updateSize(), this.ctx.onVisibleChanged?.();
  }
  /** Die aktuell eingeschalteten Termine - Grundlage der Kompaktansicht. */
  visibleEvents() {
    return this.visible;
  }
  /** Wurde schon einmal vollstaendig geladen?
   *
   * Vorher ist "keine Termine" keine Aussage, sondern Unwissen - und die
   * Kompaktansicht wuerde bei jedem Start kurz das Gegenteil behaupten.
   */
  get hasLoaded() {
    return this.geladen;
  }
  adjustTimeRange(e, n) {
    const i = this.ctx.calendar();
    if (!i || i.view.type !== "timeGridWeek") return;
    const r = Zg(this.visible, e, n);
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
        const a = await Ys(e, o, i, r), l = n.colors?.[o] ?? un;
        s.push(...a.map((d) => Jl(d, o, l)));
      } catch (a) {
        console.error("Family Calendar: Laden fehlgeschlagen für", o, a), this.ctx.onError("Kalender konnte nicht geladen werden.", o);
      }
    this.all = s, this.geladen = !0, this.applyFilters();
  }
  window() {
    const e = this.ctx.calendar()?.view, n = e ? new Date(e.activeStart) : /* @__PURE__ */ new Date(), i = e ? new Date(e.activeEnd) : /* @__PURE__ */ new Date();
    return e || i.setDate(i.getDate() + 14), n.setDate(n.getDate() - Cs), i.setDate(i.getDate() + Cs), { start: n.toISOString(), end: i.toISOString() };
  }
  clear(e) {
    const n = this[e];
    n !== void 0 && (clearTimeout(n), this[e] = void 0);
  }
}
const Im = G`
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
`, Om = G`
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
`, Nm = G`
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
`, $m = G`
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
`, tl = G`
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
`, Pm = G`
  ${tl}
  ${$m}
  ${Im}
  ${Om}
  ${Nm}
`;
function Hm(t) {
  const { week: e } = t;
  return y`
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
    (n) => y`
            <div class="compact-head ${n.isToday ? "today" : ""}">
              <span class="compact-weekday">${n.weekday}</span>
              <span class="compact-daynum">${n.dayNumber}</span>
            </div>
          `
  )}

        ${e.days.some((n) => n.allDay.length > 0) ? y`
              <div class="compact-axis-label">Ganztägig</div>
              ${e.days.map(
    (n) => y`
                  <div class="compact-allday">
                    ${n.allDay.map(
      ({ event: i, color: r }) => y`
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
        ${e.empty ? y`<p class="compact-empty">
              ${t.loading ? "" : "Diese Woche steht nichts mit Uhrzeit an."}
            </p>` : y`
              <div class="compact-grid compact-scale" style="height: ${e.height}px">
                <div class="compact-axis">
                  ${e.gaps.map((n) => Lm(n))}
                  ${e.ticks.map(
    (n) => y`
                      <span class="compact-tick" style="top: ${n.y}px">${n.label}</span>
                    `
  )}
                </div>
                ${e.days.map((n) => zm(n, e.gaps, t.onEvent))}
              </div>
            `}
      </div>
    </div>
  `;
}
function zm(t, e, n) {
  return y`
    <div class="compact-day ${t.isToday ? "today" : ""}">
      ${e.map(
    (i) => y`
          <div class="compact-break" style="top: ${i.top}px; height: ${i.height}px"></div>
        `
  )}
      ${t.blocks.map((i) => Bm(i, n))}
    </div>
  `;
}
function Bm(t, e) {
  const n = 100 / t.lanes, i = [
    `top: ${t.top}px`,
    `height: ${t.height}px`,
    `left: ${t.lane * n}%`,
    `width: ${n}%`,
    `--block-color: ${t.color}`
  ].join("; ");
  return y`
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
function Lm(t) {
  return y`
    <span
      class="compact-break-label"
      style="top: ${t.top}px; height: ${t.height}px"
      >${t.label}</span
    >
  `;
}
const Ge = (t) => t.target.value;
function Um(t) {
  const e = t.isAllDay ? "date" : "datetime-local";
  return y`
    <div class="modal-overlay" @click=${() => t.onCancel()}>
      <div class="modal-content" @click=${(n) => n.stopPropagation()}>
        <h3>${t.editMode ? "Termin bearbeiten" : "Neuer Termin"}</h3>

        <div class="form-group">
          <label>Titel</label>
          <input
            type="text"
            .value=${t.title}
            @input=${(n) => t.onTitle(Ge(n))}
            placeholder="Termin Titel"
            autofocus
          />
        </div>

        ${Fm(t)}

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
          <input type=${e} .value=${t.start} @input=${(n) => t.onStart(Ge(n))} />
        </div>

        <div class="form-group">
          <label>Bis</label>
          <input type=${e} .value=${t.end} @input=${(n) => t.onEnd(Ge(n))} />
        </div>

        ${jm(t)}

        <div class="modal-actions">
          ${t.editMode ? Vm(t) : ""}
          <button class="btn-cancel" @click=${() => t.onCancel()}>Abbrechen</button>
          <button class="btn-save" @click=${() => t.onSave()}>
            ${t.editMode ? "Aktualisieren" : "Speichern"}
          </button>
        </div>
      </div>
    </div>
  `;
}
function Fm(t) {
  return y`
    <div class="form-group">
      <label>Kalender</label>
      ${t.editMode ? y`<p class="readonly-value">${t.nameOf(t.calendar)}</p>` : y`
            <select .value=${t.calendar} @change=${(e) => t.onCalendar(Ge(e))}>
              ${t.entities.map(
    (e) => y`<option value=${e}>${t.nameOf(e)}</option>`
  )}
            </select>
          `}
    </div>
  `;
}
function jm(t) {
  return t.editMode && !t.isSeries ? y`
      <div class="form-group">
        <label>Wiederholung</label>
        <p class="readonly-value">Keine</p>
      </div>
    ` : y`
    <div class="form-group">
      <label>Wiederholung</label>
      <select .value=${t.frequency} @change=${(e) => t.onFrequency(Ge(e))}>
        ${t.isSeries ? "" : y`<option value="">Keine</option>`}
        <option value="DAILY">Täglich</option>
        <option value="WEEKLY">Wöchentlich</option>
        <option value="MONTHLY">Monatlich</option>
        <option value="YEARLY">Jährlich</option>
      </select>
    </div>
    ${t.frequency ? Wm(t) : ""}
  `;
}
function Wm(t) {
  return y`
    <div class="form-group">
      <label>Serie endet am</label>
      <input type="date" .value=${t.until} @input=${(e) => t.onUntil(Ge(e))} />
      <p class="field-hint">
        ${t.until ? "" : "Leer lassen für eine Serie ohne Ende. "}
        ${t.isSeries ? "Änderungen gelten ab diesem Termin, frühere bleiben stehen." : ""}
      </p>
    </div>
  `;
}
function Vm(t) {
  return t.confirmDelete ? y`
    <button class="btn-delete btn-delete--confirm" @click=${() => t.onDelete()}>
      Wirklich löschen?
    </button>
  ` : y`<button class="btn-delete" @click=${() => t.onConfirmDelete()}>Löschen</button>`;
}
function Gm(t) {
  return y`
    <div class="header">
      <div class="filters">
        ${t.links.map((e) => qm(e, t.onNavigate))}
        ${t.entities.map((e) => Ym(e, t))}
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
function qm(t, e) {
  const n = t.name ?? t.path;
  return y`
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
function Ym(t, e) {
  const n = e.activeCalendars.includes(t);
  return y`
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
var Qm = Object.defineProperty, Zm = Object.getOwnPropertyDescriptor, he = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? Zm(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (i ? o(e, n, r) : o(r)) || r);
  return i && r && Qm(e, n, r), r;
};
const Km = 500, Xm = [0, 250, 1e3, 2500];
let te = class extends ie {
  constructor() {
    super(...arguments), this.activeCalendars = [], this.isCompact = !1, this.settingsRevision = 0, this.einstellungen = new yi(
      "Family Calendar",
      (t) => this.applySettings(t)
    ), this.letzteKalender = "", this.form = Fe(), this.calendar = null, this.loader = new Mm({
      hass: () => this.hass,
      config: () => this.effectiveConfig,
      calendar: () => this.calendar,
      activeCalendars: () => this.activeCalendars,
      onError: (t, e) => this.notify(`${this.friendlyName(e)}: ${t}`),
      onVisibleChanged: () => this.requestUpdate()
    }), this.compact = new Tm(() => this.requestUpdate());
  }
  setConfig(t) {
    if (!t.entities?.length)
      throw new Error("Bitte mindestens eine Kalender-Entität angeben!");
    this.config = t, this.activeCalendars = [...t.entities];
  }
  /** Die Kalender, wie der Einstellungsbereich sie vorgibt - ersatzweise
   *  wie sie im Dashboard stehen. */
  get kalender() {
    return dn(this.config, this.einstellungen.settings.calendars);
  }
  get effectiveConfig() {
    const t = this.kalender;
    return { ...this.config, entities: t.map((e) => e.entityId), colors: Zs(t) };
  }
  /** Uebernimmt geaenderte Kalender, ohne die Auswahl im Betrieb zu stoeren. */
  applySettings(t) {
    this.settingsRevision++;
    const e = JSON.stringify(this.kalender.map((n) => [n.entityId, n.active]));
    if (e !== this.letzteKalender) {
      const n = this.letzteKalender === "";
      this.letzteKalender = e, this.activeCalendars = this.kalender.filter((i) => i.active).map((i) => i.entityId), n && (this.isCompact = t.calendars.startCompact), this.loader.applyFilters();
    }
  }
  getCardSize() {
    return 10;
  }
  // ---------------------------------------------------------------- Anzeige
  render() {
    return y`
      <ha-card>
        ${Gm({
      links: this.config?.links ?? [],
      entities: this.kalender.map((t) => t.entityId),
      activeCalendars: this.activeCalendars,
      isCompact: this.isCompact,
      colorOf: (t) => this.kalender.find((e) => e.entityId === t)?.color ?? un,
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
    return Hm({
      week: this.compact.week(this.loader.visibleEvents(), t?.activeStart ?? /* @__PURE__ */ new Date()),
      title: t?.title ?? "",
      loading: !this.loader.hasLoaded,
      onEvent: (e) => {
        this.form = ys(e);
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
    return Um({
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
      entities: this.kalender.map((n) => n.entityId),
      nameOf: (n) => this.friendlyName(n),
      onTitle: (n) => e({ newEventTitle: n }),
      onCalendar: (n) => e({ newEventCalendar: n }),
      onAllDay: (n) => e(tm(t, n)),
      onStart: (n) => e({ newEventStart: n }),
      onEnd: (n) => e({ newEventEnd: n }),
      onFrequency: (n) => e(nm(n)),
      onUntil: (n) => e({ newEventUntil: n }),
      onConfirmDelete: () => e({ confirmDelete: !0 }),
      onDelete: () => {
        this.deleteEvent();
      },
      onCancel: () => this.form = Fe(),
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
    if (this.einstellungen.start(this.hass), !!this.calendarEl) {
      this.calendar = Kg(this.calendarEl, {
        onSelect: (t) => this.handleDateSelect(t),
        onEventClick: (t) => this.handleEventClick(t),
        onEventMoved: (t) => {
          this.handleEventMoved(t);
        },
        onDatesSet: (t) => {
          this.loader.adjustTimeRange(t.start, t.end), this.refresh();
        }
      }), this.resizeObserver = new ResizeObserver(() => this.loader.scheduleResize()), this.resizeObserver.observe(this.calendarEl);
      for (const t of Xm)
        window.setTimeout(() => this.calendar?.updateSize(), t);
    }
  }
  updated(t) {
    t.has("hass") && this.loader.hasRelevantChange() && this.refresh(), this.compact.watch(this.isCompact ? this.compactBodyEl : void 0);
  }
  /** Nachladen anstossen, entprellt. */
  refresh() {
    this.loader.scheduleFetch(this.config?.refreshDebounceMs ?? Km);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.loader.dispose(), this.einstellungen.stop(), this.resizeObserver?.disconnect(), this.resizeObserver = void 0, this.compact.dispose(), this.calendar?.destroy(), this.calendar = null;
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
    this.form = bs(t, e, !1, this.kalender[0]?.entityId ?? "");
  }
  handleDateSelect(t) {
    t.view.calendar.unselect(), this.form = bs(
      t.start,
      t.end,
      t.allDay,
      this.kalender[0]?.entityId ?? ""
    );
  }
  handleEventClick(t) {
    this.form = ys(t.event);
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
    const t = im(this.form);
    if (t) return this.notify(t);
    await rm(this.actions(), this.form) && (this.form = Fe(), this.refresh());
  }
  async deleteEvent() {
    await sm(this.actions(), this.form) ? (this.form = Fe(), this.refresh()) : this.form = { ...this.form, confirmDelete: !1 };
  }
  async handleEventMoved(t) {
    await om(this.actions(), t) && this.refresh();
  }
  // ------------------------------------------------------------------ Helfer
  friendlyName(t) {
    const e = this.kalender.find((n) => n.entityId === t)?.name;
    return e || (this.hass?.states[t]?.attributes?.friendly_name ?? t);
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
te.styles = Pm;
he([
  q({ attribute: !1 })
], te.prototype, "hass", 2);
he([
  q({ attribute: !1 })
], te.prototype, "config", 2);
he([
  R()
], te.prototype, "activeCalendars", 2);
he([
  R()
], te.prototype, "isCompact", 2);
he([
  R()
], te.prototype, "settingsRevision", 2);
he([
  R()
], te.prototype, "form", 2);
he([
  mi("#calendar")
], te.prototype, "calendarEl", 2);
he([
  mi(".compact-body")
], te.prototype, "compactBodyEl", 2);
te = he([
  Je("family-calendar")
], te);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-calendar",
  name: "Family Calendar",
  description: "Wochen- und Monatsansicht über mehrere Kalender, mit Anlegen und Bearbeiten.",
  preview: !1
});
async function Jm(t, e) {
  return ((await t.callWS({
    type: "media_source/browse_media",
    media_content_id: e
  })).children ?? []).filter((i) => i.media_class === "image").map((i) => ({ id: i.media_content_id, title: i.title })).sort((i, r) => i.title.localeCompare(r.title, "de"));
}
async function ev(t, e) {
  return ((await t.callWS({
    type: "media_source/browse_media",
    media_content_id: e
  })).children ?? []).filter((i) => i.media_class === "image").map((i) => i.media_content_id).sort((i, r) => i.localeCompare(r, "de"));
}
async function nl(t, e) {
  return (await t.callWS({
    type: "media_source/resolve_media",
    media_content_id: e
  })).url;
}
async function tv(t, e) {
  return (await t.callWS({
    type: "calendar_service_ext/photos/faces",
    media_content_id: e
  })).faces ?? [];
}
const nv = 0.38;
function xs(t, e, n = []) {
  return rv(il(t, e, n), t, e);
}
function il(t, e, n = []) {
  const i = iv(n);
  if (i) return i;
  const r = Rs(t), s = Rs(e);
  return !r || !s || r >= s ? { x: 0.5, y: 0.5 } : { x: 0.5, y: nv };
}
function iv(t) {
  const e = t.filter(
    (o) => o.x >= 0 && o.x <= 1 && o.y >= 0 && o.y <= 1 && o.w > 0 && o.h > 0
  );
  if (e.length === 0) return null;
  const n = Math.min(...e.map((o) => o.x - o.w / 2)), i = Math.max(...e.map((o) => o.x + o.w / 2)), r = Math.min(...e.map((o) => o.y - o.h / 2)), s = Math.max(...e.map((o) => o.y + o.h / 2));
  return { x: mt((n + i) / 2), y: mt((r + s) / 2) };
}
function rv(t, e, n) {
  const i = rl(e, n), r = _s(t.x, i.x), s = _s(t.y, i.y);
  return `${Ts(r)}% ${Ts(s)}%`;
}
function rl(t, e) {
  if (!t.width || !t.height || !e.width || !e.height)
    return { x: 1, y: 1 };
  if (t.width < 0 || t.height < 0) return { x: 1, y: 1 };
  const n = Math.max(e.width / t.width, e.height / t.height);
  return {
    x: t.width * n / e.width,
    y: t.height * n / e.height
  };
}
function _s(t, e) {
  return e <= 1.0001 ? 50 : mt((t * e - 0.5) / (e - 1)) * 100;
}
function Rs(t) {
  return !t?.width || !t.height || t.width < 0 || t.height < 0 ? 0 : t.width / t.height;
}
function mt(t, e = 0, n = 1) {
  return Math.min(n, Math.max(e, t));
}
function Ts(t) {
  return Math.round(t * 10) / 10;
}
function sv(t, e, n) {
  const i = rl(e, n);
  return {
    x: ks(t.x, i.x),
    y: ks(t.y, i.y)
  };
}
function ks(t, e) {
  if (e <= 1.0001) return t;
  const n = mt((t * e - 0.5) / (e - 1));
  return mt(t * e - n * (e - 1));
}
function ov(t) {
  return new Promise((e) => {
    const n = new Image();
    n.onload = () => e({ width: n.naturalWidth, height: n.naturalHeight }), n.onerror = () => e(null), n.src = t;
  });
}
const av = G`
  :host {
    display: block;
    color-scheme: dark;
  }

  ha-card {
    position: relative;
    /* Von der Huelle steuerbar, damit der Rahmen auf den ganzen Bildschirm
       wachsen kann. Eigenschaften reichen durch den Schattenbaum. */
    height: var(--photos-height, 85vh);
    border-radius: var(--photos-radius, 24px);
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
    /* Die Bewegung laeuft ueber die ganze Standzeit des Bildes und ist
       bewusst klein: Sie soll auffallen, wenn man hinsieht, und nicht,
       wenn man daran vorbeigeht. */
    transform: scale(1);
    transition:
      opacity 1.2s ease-in-out,
      transform var(--zoom-dauer, 30s) linear;
    will-change: transform;
  }

  .layer--visible {
    opacity: 1;
  }

  .layer--zoom {
    transform: scale(1.06);
  }

  @media (prefers-reduced-motion: reduce) {
    .layer {
      transition: opacity 1.2s ease-in-out;
    }

    .layer--zoom {
      transform: none;
    }
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
function lv(t) {
  return t.hasImages ? y`
    <ha-card>
      <div
        class="layer ${t.frontVisible ? "layer--visible" : ""} ${t.frontZoom ? "layer--zoom" : ""}"
        style=${Ms(t.frontUrl, t.frontPosition, t.frontOrigin, t.zoomSeconds)}
      ></div>
      <div
        class="layer ${t.frontVisible ? "" : "layer--visible"} ${t.backZoom ? "layer--zoom" : ""}"
        style=${Ms(t.backUrl, t.backPosition, t.backOrigin, t.zoomSeconds)}
      ></div>
      ${t.showClock ? cv(t.now) : ""}
    </ha-card>
  ` : y`
      <ha-card>
        <div class="hint">
          Keine Bilder in <code>${t.folder}</code>.<br />
          Lege Fotos in den Medienordner, sie erscheinen dann von selbst.
        </div>
      </ha-card>
    `;
}
function Ms(t, e, n, i) {
  return t ? [
    `background-image: url("${t}")`,
    `background-position: ${e}`,
    `transform-origin: ${n}`,
    `--zoom-dauer: ${i}s`
  ].join("; ") : "";
}
function cv(t) {
  return y`
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
var dv = Object.defineProperty, uv = Object.getOwnPropertyDescriptor, j = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? uv(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (i ? o(e, n, r) : o(r)) || r);
  return i && r && dv(e, n, r), r;
};
const hv = "media-source://media_source/local/fotos", fv = 30, pv = 60, gv = 2e4, Fn = { width: 0, height: 0 };
let L = class extends ie {
  constructor() {
    super(...arguments), this.frontUrl = "", this.backUrl = "", this.frontSize = null, this.backSize = null, this.frontFaces = [], this.backFaces = [], this.frontZoom = !1, this.backZoom = !1, this.frontVisible = !0, this.hasImages = !1, this.now = /* @__PURE__ */ new Date(), this.masse = /* @__PURE__ */ new Map(), this.gesichter = /* @__PURE__ */ new Map(), this.rahmen = { width: 0, height: 0 }, this.images = [], this.index = -1, this.timers = [], this.started = !1;
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
    super.disconnectedCallback(), this.stopTimers(), this.resizeObserver?.disconnect(), this.resizeObserver = void 0, this.unsubscribe?.(), this.unsubscribe = void 0, this.started = !1;
  }
  render() {
    return lv({
      frontUrl: this.frontUrl,
      frontPosition: xs(this.frontSize ?? Fn, this.rahmen, this.frontFaces),
      frontOrigin: this.originVon(this.frontSize, this.frontFaces),
      frontZoom: this.frontZoom,
      backUrl: this.backUrl,
      backPosition: xs(this.backSize ?? Fn, this.rahmen, this.backFaces),
      backOrigin: this.originVon(this.backSize, this.backFaces),
      backZoom: this.backZoom,
      zoomSeconds: this.intervalSeconds,
      frontVisible: this.frontVisible,
      showClock: this.settings?.showClock ?? this.config?.showClock ?? !0,
      now: this.now,
      hasImages: this.hasImages,
      folder: this.folder
    });
  }
  get folder() {
    return this.settings?.folder ?? this.config?.folder ?? hv;
  }
  get intervalSeconds() {
    return this.settings?.interval ?? this.config?.interval ?? fv;
  }
  get rescanMinutes() {
    return this.settings?.rescanMinutes ?? this.config?.rescanMinutes ?? pv;
  }
  async start() {
    this.beobachteRahmen();
    try {
      this.unsubscribe = await hn(
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
      window.setInterval(() => this.now = /* @__PURE__ */ new Date(), gv)
    );
  }
  /** Der Ausschnitt haengt am Seitenverhaeltnis des Rahmens - und das
   *  aendert sich, wenn der Bereich auf den ganzen Bildschirm waechst. */
  beobachteRahmen() {
    const t = this.renderRoot.querySelector("ha-card");
    !t || this.resizeObserver || (this.resizeObserver = new ResizeObserver(([e]) => {
      this.setzeRahmen(e.contentRect);
    }), this.resizeObserver.observe(t), this.messeRahmen());
  }
  /** Misst selbst nach.
   *
   * Der Beobachter meldet nichts, solange die Seite im Hintergrund liegt.
   * Ohne diesen Nachschlag bliebe der Rahmen dann bei null, und der
   * Ausschnitt faende die Gesichter nicht.
   */
  messeRahmen() {
    const t = this.renderRoot.querySelector("ha-card");
    t && this.setzeRahmen(t.getBoundingClientRect());
  }
  setzeRahmen(t) {
    const { width: e, height: n } = t;
    !e || !n || Math.abs(e - this.rahmen.width) < 1 && Math.abs(n - this.rahmen.height) < 1 || (this.rahmen = { width: e, height: n }, this.requestUpdate());
  }
  stopTimers() {
    for (const t of this.timers) clearInterval(t);
    this.timers = [];
  }
  /** Ursprung der Bewegung: dort, wo die Koepfe im Rahmen landen. */
  originVon(t, e) {
    const n = t ?? Fn, i = sv(il(n, this.rahmen, e), n, this.rahmen);
    return `${Math.round(i.x * 1e3) / 10}% ${Math.round(i.y * 1e3) / 10}%`;
  }
  /** Setzt die Bewegung in Gang - erst, nachdem die Ebene ohne sie stand.
   *
   * Ohne diesen Umweg fasst der Browser Zuruecksetzen und Setzen zu einem
   * Schritt zusammen, und es bewegt sich nichts.
   *
   * Bewusst ueber einen Zeitgeber und nicht ueber requestAnimationFrame:
   * Der feuert nicht, solange die Seite im Hintergrund liegt - etwa
   * nachts, wenn der Bildschirm aus ist. Die Bewegung bliebe dann fuer
   * immer aus, auch nachdem er wieder angeht.
   */
  starteBewegung() {
    this.updateComplete.then(() => {
      window.setTimeout(() => {
        this.frontVisible ? this.frontZoom = !0 : this.backZoom = !0;
      }, 60);
    });
  }
  /** Gesichter eines Bildes, gefragt oder aus dem Gedaechtnis. */
  async gesichterVon(t) {
    const e = this.gesichter.get(t);
    if (e) return e;
    try {
      const n = await tv(this.hass, t);
      return this.gesichter.set(t, n), n;
    } catch (n) {
      return console.warn("Family Photos: Gesichter nicht abrufbar", n), [];
    }
  }
  /** Masse eines Bildes, gemessen oder aus dem Gedaechtnis.
   *
   * Beim Messen laedt der Browser das Bild in seinen Zwischenspeicher; das
   * Anzeigen gleich darauf kostet dann nichts mehr.
   */
  async groesseVon(t, e) {
    const n = this.masse.get(t);
    if (n) return n;
    const i = await ov(e);
    return i && this.masse.set(t, i), i;
  }
  /** Ordner neu einlesen, damit neue Bilder auftauchen. */
  async rescan() {
    try {
      this.images = await ev(this.hass, this.folder), this.hasImages = this.images.length > 0;
    } catch (t) {
      console.error("Family Photos: Ordner nicht lesbar", this.folder, t), this.hasImages = !1;
    }
  }
  /** Naechstes Bild einblenden. */
  async advance() {
    if (this.images.length !== 0) {
      this.messeRahmen(), this.index = (this.index + 1) % this.images.length;
      try {
        const t = this.images[this.index], e = await nl(this.hass, t), n = await this.groesseVon(t, e), i = await this.gesichterVon(t);
        this.frontVisible ? (this.backUrl = e, this.backSize = n, this.backFaces = i, this.backZoom = !1) : (this.frontUrl = e, this.frontSize = n, this.frontFaces = i, this.frontZoom = !1), this.frontVisible = !this.frontVisible, this.now = /* @__PURE__ */ new Date(), this.starteBewegung();
      } catch (t) {
        console.error("Family Photos: Bild nicht abrufbar", t);
      }
    }
  }
};
L.styles = av;
j([
  q({ attribute: !1 })
], L.prototype, "hass", 2);
j([
  q({ attribute: !1 })
], L.prototype, "config", 2);
j([
  R()
], L.prototype, "frontUrl", 2);
j([
  R()
], L.prototype, "backUrl", 2);
j([
  R()
], L.prototype, "frontSize", 2);
j([
  R()
], L.prototype, "backSize", 2);
j([
  R()
], L.prototype, "frontFaces", 2);
j([
  R()
], L.prototype, "backFaces", 2);
j([
  R()
], L.prototype, "frontZoom", 2);
j([
  R()
], L.prototype, "backZoom", 2);
j([
  R()
], L.prototype, "frontVisible", 2);
j([
  R()
], L.prototype, "hasImages", 2);
j([
  R()
], L.prototype, "now", 2);
j([
  R()
], L.prototype, "settings", 2);
L = j([
  Je("family-photos")
], L);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-photos",
  name: "Family Photos",
  description: "Bilderrahmen mit Uhrzeit, gespeist aus einem Ordner der Medienablage.",
  preview: !1
});
const mv = "browser_mod-browser-id";
function zt() {
  const t = window.browser_mod;
  if (t?.browserID) return t.browserID;
  try {
    return window.localStorage.getItem(mv) ?? "";
  } catch {
    return "";
  }
}
function sl(t, e, n) {
  const i = t.indexOf(e);
  if (i === -1) return [...t];
  const r = i + n;
  if (r < 0 || r >= t.length) return [...t];
  const s = [...t];
  return [s[i], s[r]] = [s[r], s[i]], s;
}
function ol(t, e) {
  return !e || t.includes(e) ? [...t] : [...t, e];
}
function al(t, e) {
  return t.filter((n) => n !== e);
}
function ll(t, e) {
  const n = new Set(e);
  return t.filter((i) => !n.has(i.entityId));
}
function vv(t, e) {
  const n = dn(t, void 0);
  return {
    order: n.map((i) => i.entityId),
    items: Object.fromEntries(
      n.map((i) => [i.entityId, { name: i.name, color: i.color, active: i.active }])
    ),
    startCompact: e
  };
}
function bv(t) {
  const e = vi(t, void 0);
  return {
    order: e.map((n) => n.entity),
    items: Object.fromEntries(
      e.map((n) => [n.entity, { name: n.name ?? "", color: n.color ?? "" }])
    ),
    title: t.title,
    showCompleted: t.showCompleted,
    showDue: t.showDue
  };
}
function yv(t, e, n) {
  const i = t.calendars.order.length ? t.calendars : vv(e, t.calendars.startCompact), r = (o) => {
    n.patch({ calendars: { ...i, ...o } });
  }, s = (o, a) => {
    const l = i.items[o] ?? { name: "", color: "", active: !0 };
    r({ items: { ...i.items, [o]: { ...l, ...a } } });
  };
  return {
    rows: dn(e, i).map((o) => ({
      entityId: o.entityId,
      fallbackName: n.nameOf(o.entityId),
      name: o.name,
      color: o.color,
      active: o.active
    })),
    available: ll(n.choices, i.order),
    activeLabel: "sichtbar",
    addLabel: "Kalender hinzufügen …",
    emptyText: "Noch kein Kalender ausgewählt.",
    startCompact: i.startCompact,
    onStartCompact: (o) => r({ startCompact: o }),
    onName: (o, a) => s(o, { name: a }),
    onColor: (o, a) => s(o, { color: a }),
    onActive: (o, a) => s(o, { active: a }),
    onMove: (o, a) => r({ order: sl(i.order, o, a) }),
    onRemove: (o) => r({ order: al(i.order, o) }),
    onAdd: (o) => r({ order: ol(i.order, o) })
  };
}
function wv(t, e, n) {
  return e.map((i) => {
    const r = t.tasks[i.key], s = r?.order?.length ? { ...tc, ...r } : bv(i), o = (l) => {
      n.patch({ tasks: { [i.key]: { ...s, ...l } } });
    }, a = (l, d) => {
      const c = s.items[l] ?? { name: "", color: "" };
      o({ items: { ...s.items, [l]: { ...c, ...d } } });
    };
    return {
      key: i.key,
      bereich: i.bereich,
      rows: vi(i, s).map((l) => ({
        entityId: l.entity,
        fallbackName: n.nameOf(l.entity),
        name: l.name ?? "",
        color: l.color ?? ""
      })),
      available: ll(n.choices, s.order),
      addLabel: "Liste hinzufügen …",
      emptyText: "Noch keine Liste ausgewählt.",
      title: s.title,
      showCompleted: s.showCompleted,
      showDue: s.showDue,
      onTitle: (l) => o({ title: l }),
      onShowCompleted: (l) => o({ showCompleted: l }),
      onShowDue: (l) => o({ showDue: l }),
      onName: (l, d) => a(l, { name: d }),
      onColor: (l, d) => a(l, { color: d }),
      onActive: () => {
      },
      onMove: (l, d) => o({ order: sl(s.order, l, d) }),
      onRemove: (l) => o({ order: al(s.order, l) }),
      onAdd: (l) => o({ order: ol(s.order, l) })
    };
  });
}
const er = "custom:family-shell", Ev = "custom:family-tasks", Sv = "custom:family-calendar";
function Av(t) {
  const e = t, n = [];
  for (const i of e?.views ?? [])
    for (const r of i.cards ?? [])
      if (r.type === er)
        for (const s of r.areas ?? [])
          s.card?.type !== Ev || !s.id || n.push({
            key: s.id,
            bereich: s.name || s.id,
            lists: s.card.lists ?? [],
            title: s.card.title ?? "",
            showCompleted: s.card.showCompleted ?? !1,
            showDue: s.card.showDue ?? !0
          });
  return n;
}
function Dv(t) {
  return t.split("/").filter(Boolean)[0] ?? "lovelace";
}
function Cv(t) {
  const e = t, n = [];
  for (const i of e?.views ?? [])
    for (const r of i.cards ?? [])
      if (r.type === er)
        for (const s of r.areas ?? [])
          !s.id || !s.card || s.disabled || s.path || n.push({ id: s.id, name: s.name || s.id });
  return n;
}
function xv(t) {
  const e = t;
  for (const n of e?.views ?? [])
    for (const i of n.cards ?? [])
      if (i.type === er) {
        for (const r of i.areas ?? [])
          if (r.card?.type === Sv)
            return { entities: r.card.entities ?? [], colors: r.card.colors ?? {} };
      }
  return { entities: [], colors: {} };
}
class _v {
  constructor(e, n) {
    this.onChange = e, this.onError = n, this.tiles = [], this.loading = !0, this.uploading = null;
  }
  async reload(e, n) {
    this.loading = !0, this.onChange();
    try {
      const i = await Jm(e, n);
      this.tiles = await Promise.all(i.map((r) => this.toTile(e, r)));
    } catch (i) {
      console.error("Family Settings: Ordner nicht lesbar", i), this.tiles = [], this.onError("Der Bilderordner ist nicht lesbar.");
    } finally {
      this.loading = !1, this.onChange();
    }
  }
  /** Bilder nacheinander hochladen und den Fortschritt melden.
   *
   * Nacheinander und nicht alle auf einmal: Ein Panel mit einer Handvoll
   * Urlaubsbildern wuerde sonst seine eigene Verbindung verstopfen.
   */
  async upload(e, n, i) {
    const r = [...i];
    this.uploading = { fertig: 0, gesamt: r.length }, this.onChange();
    let s = 0;
    for (const o of r) {
      try {
        await ic(e, n, o);
      } catch (a) {
        s++, console.error("Family Settings: Upload fehlgeschlagen", o.name, a);
      }
      this.uploading = { fertig: this.uploading.fertig + 1, gesamt: r.length }, this.onChange();
    }
    this.uploading = null, s > 0 && this.onError(Rv(s, r.length)), await this.reload(e, n);
  }
  async remove(e, n) {
    try {
      await rc(e, n), this.tiles = this.tiles.filter((i) => i.id !== n), this.onChange();
    } catch (i) {
      console.error("Family Settings: Löschen fehlgeschlagen", i), this.onError("Das Bild konnte nicht gelöscht werden.");
    }
  }
  async toTile(e, n) {
    return { ...n, url: await nl(e, n.id) };
  }
}
function Rv(t, e) {
  return t === e ? e === 1 ? "Das Bild konnte nicht hochgeladen werden." : "Kein Bild konnte hochgeladen werden." : `${t} von ${e} Bildern konnten nicht hochgeladen werden.`;
}
const Tv = G`
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

`, kv = G`
  /* --- Liste von Entitaeten -------------------------------------------- */

  .set-liste {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
  }

  .set-eintrag {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding: 9px 11px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.68);
    border: 1px solid rgba(60, 60, 67, 0.08);
  }

  .set-pfeile {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .set-pfeile button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 21px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
  }

  .set-pfeile button:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.06);
    color: var(--text-primary);
  }

  .set-pfeile button:disabled {
    opacity: 0.25;
    cursor: default;
  }

  .set-pfeile ha-icon {
    --mdc-icon-size: 18px;
  }

  .set-eintrag-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1 1 190px;
    min-width: 0;
  }

  .set-eingabe--name {
    width: 100%;
    max-width: none;
    height: 34px;
  }

  .set-entity {
    font-size: 0.68rem;
    color: var(--text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .set-palette {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    flex: 0 0 auto;
  }

  .set-farbe {
    width: 22px;
    height: 22px;
    padding: 0;
    border-radius: 50%;
    border: 2px solid transparent;
    background: var(--farbe);
    cursor: pointer;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
  }

  .set-farbe.gewaehlt {
    border-color: var(--text-primary);
    transform: scale(1.15);
  }

  .set-mini {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 0.76rem;
    color: var(--text-secondary);
  }

  .set-schalter--klein {
    width: 42px;
    height: 25px;
  }

  .set-schalter--klein .set-knopf {
    width: 21px;
    height: 21px;
  }

  .set-schalter--klein.an .set-knopf {
    transform: translateX(17px);
  }

  .set-entfernen {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
  }

  .set-entfernen:hover {
    background: rgba(255, 59, 48, 0.12);
    color: #d70015;
  }

  .set-hinzu {
    display: flex;
    gap: 10px;
  }

  .set-auswahl {
    height: 38px;
    padding: 0 12px;
    border-radius: 12px;
    border: 1px solid rgba(60, 60, 67, 0.14);
    background: #fff;
    color: var(--text-primary);
    font: inherit;
    font-size: 0.88rem;
    cursor: pointer;
  }

`, Mv = G`


  ${tl}

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


  .set-fussnote {
    margin: 2px 0 0;
    padding-bottom: 4px;
    font-size: 0.78rem;
    line-height: 1.4;
    color: var(--text-secondary);
  }

  .set-fussnote code {
    font-size: 0.74rem;
    padding: 1px 5px;
    border-radius: 5px;
    background: rgba(60, 60, 67, 0.08);
  }

  .set-gut {
    color: #1d7a35;
    font-weight: 600;
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

  ${kv}
  ${Tv}
`;
function Iv(t) {
  return y`
    <div class="set">
      <div class="set-tabs">
        ${t.sections.map(
    (e) => y`
            <button
              class="set-tab ${e.id === t.active ? "active" : ""}"
              ?disabled=${!e.ready}
              @click=${() => t.onSection(e.id)}
            >
              <ha-icon icon=${e.icon}></ha-icon>
              <span>${e.name}</span>
              ${e.ready ? "" : y`<span class="set-soon">folgt</span>`}
            </button>
          `
  )}
      </div>

      ${t.message ? y`<div class="set-hinweis">${t.message}</div>` : ""}

      <div class="set-inhalt">${t.content}</div>
    </div>
  `;
}
function Ov(t) {
  return y`
    <p class="set-leer">
      <ha-icon icon="mdi:hammer-wrench"></ha-icon>
      ${t} ist noch nicht gebaut.
    </p>
  `;
}
function Z(t, e) {
  return y`
    <section class="set-gruppe">
      <h3>${t}</h3>
      ${e}
    </section>
  `;
}
function z(t, e, n) {
  return y`
    <div class="set-zeile">
      <div class="set-text">
        <span class="set-label">${t}</span>
        ${e ? y`<span class="set-hint">${e}</span>` : ""}
      </div>
      <div class="set-steuer">${n}</div>
    </div>
  `;
}
function vt(t, e) {
  return y`
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
function on(t, e, n, i, r) {
  const s = (o) => {
    r(Math.min(i.max, Math.max(i.min, o)));
  };
  return y`
    <div class="set-zahl">
      <button ?disabled=${t <= i.min} @click=${() => s(t - n)}>−</button>
      <span class="set-wert">${t}<small>${e}</small></span>
      <button ?disabled=${t >= i.max} @click=${() => s(t + n)}>+</button>
    </div>
  `;
}
function cl(t, e, n) {
  return y`
    <input
      class="set-eingabe"
      type="text"
      .value=${t}
      placeholder=${e}
      @change=${(i) => n(i.target.value.trim())}
    />
  `;
}
function Nv(t) {
  return y`
    ${Z(
    "Zeit",
    y`
        ${z(
      "Zeitzone",
      "Kommt von Home Assistant. Der Kalender rechnet damit - eine zweite Zeitzone hier würde nur zu zwei Wahrheiten führen.",
      y`
            <div class="set-nebeneinander">
              <span class="set-anzeige">${t.timeZone || "unbekannt"}</span>
              <button class="set-sekundaer" @click=${t.onOpenTimeZone}>Ändern</button>
            </div>
          `
    )}
      `
  )}
    ${Z(
    "Termine aus Office 365",
    y`
        ${z(
      "Einladungsweg",
      "Läuft über ein Postfach und braucht ein App-Passwort. Das gebe ich nicht ein - es gehört in den Dialog der Integration.",
      y`<button class="set-sekundaer" @click=${t.onOpenIntegration}>Einrichten</button>`
    )}
      `
  )}
    ${Z(
    "Stand",
    y`
        ${z("App", "", y`<span class="set-anzeige">${t.appVersion || "–"}</span>`)}
        ${z("Home Assistant", "", y`<span class="set-anzeige">${t.haVersion}</span>`)}
        ${z(
      "Bilderordner",
      "",
      y`<span class="set-anzeige set-schmal">${t.folder}</span>`
    )}
      `
  )}
  `;
}
const $v = [
  "#0078d4",
  "#2980b9",
  "#16a085",
  "#27ae60",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#c0399b",
  "#9b59b6",
  "#8e6e53",
  "#5d6d7e",
  "#111827"
];
function dl(t) {
  return y`
    ${t.rows.length === 0 ? y`<p class="set-leer"><ha-icon icon="mdi:playlist-plus"></ha-icon>${t.emptyText}</p>` : y`<div class="set-liste">
          ${t.rows.map((e, n) => Pv(e, n, t))}
        </div>`}
    ${Hv(t)}
  `;
}
function Pv(t, e, n) {
  const i = e === n.rows.length - 1;
  return y`
    <div class="set-eintrag">
      <div class="set-pfeile">
        <button
          ?disabled=${e === 0}
          aria-label="nach oben"
          @click=${() => n.onMove(t.entityId, -1)}
        >
          <ha-icon icon="mdi:chevron-up"></ha-icon>
        </button>
        <button
          ?disabled=${i}
          aria-label="nach unten"
          @click=${() => n.onMove(t.entityId, 1)}
        >
          <ha-icon icon="mdi:chevron-down"></ha-icon>
        </button>
      </div>

      <div class="set-eintrag-text">
        <input
          class="set-eingabe set-eingabe--name"
          type="text"
          .value=${t.name}
          placeholder=${t.fallbackName}
          @change=${(r) => n.onName(t.entityId, r.target.value.trim())}
        />
        <span class="set-entity">${t.entityId}</span>
      </div>

      <div class="set-palette">
        ${$v.map(
    (r) => y`
            <button
              class="set-farbe ${r.toLowerCase() === t.color.toLowerCase() ? "gewaehlt" : ""}"
              style="--farbe: ${r}"
              title=${r}
              aria-label="Farbe ${r}"
              @click=${() => n.onColor(t.entityId, r)}
            ></button>
          `
  )}
      </div>

      ${n.activeLabel && t.active !== void 0 ? y`
            <label class="set-mini">
              <span>${n.activeLabel}</span>
              <button
                class="set-schalter set-schalter--klein ${t.active ? "an" : ""}"
                role="switch"
                aria-checked=${t.active ? "true" : "false"}
                @click=${() => n.onActive(t.entityId, !t.active)}
              >
                <span class="set-knopf"></span>
              </button>
            </label>
          ` : H}

      <button
        class="set-entfernen"
        aria-label="entfernen"
        title="Aus der App entfernen"
        @click=${() => n.onRemove(t.entityId)}
      >
        <ha-icon icon="mdi:close"></ha-icon>
      </button>
    </div>
  `;
}
function Hv(t) {
  return t.available.length === 0 ? y`<p class="set-fussnote">Es gibt nichts mehr hinzuzufügen.</p>` : y`
    <div class="set-hinzu">
      <select
        class="set-auswahl"
        @change=${(e) => {
    const n = e.target;
    n.value && t.onAdd(n.value), n.value = "";
  }}
      >
        <option value="">${t.addLabel}</option>
        ${t.available.map(
    (e) => y`<option value=${e.entityId}>${e.name}</option>`
  )}
      </select>
    </div>
  `;
}
function zv(t) {
  return y`
    ${Z("Kalender", dl(t))}
    ${Z(
    "Ansicht",
    z(
      "Kompakt beginnen",
      "Startet mit der gestauchten Zeitachse statt mit dem Stundenraster.",
      vt(t.startCompact, t.onStartCompact)
    )
  )}
  `;
}
function Bv(t) {
  return y`
    ${Z(
    "Start und Ruhe",
    y`
        ${z(
      "Bereich beim Laden",
      "Womit das Panel beginnt, wenn die Seite neu geladen wird.",
      jn(
        t,
        t.settings.initialArea,
        (e) => t.onChange({ initialArea: e })
      )
    )}
        ${z(
      "Ruhe nach",
      "Sekunden ohne Berührung, bis in den Ruhebereich gewechselt wird. Null: wie im Dashboard eingetragen.",
      on(
        t.settings.idleAfter,
        "s",
        60,
        { min: 0, max: 3600 },
        (e) => t.onChange({ idleAfter: e })
      )
    )}
        ${z(
      "Ruhebereich",
      "Wohin das Panel dann wechselt.",
      jn(t, t.settings.idleArea, (e) => t.onChange({ idleArea: e }))
    )}
      `
  )}
    ${Z(
    "Vollbild",
    y`
        ${z(
      "Vollbild nach",
      "Sekunden ohne Berührung, bis der Bereich über die Seitenleiste hinweg wächst. Null: wie im Dashboard eingetragen.",
      on(
        t.settings.fullscreenAfter,
        "s",
        5,
        { min: 0, max: 600 },
        (e) => t.onChange({ fullscreenAfter: e })
      )
    )}
        ${z(
      "Welcher Bereich",
      "Sinnvoll beim Bilderrahmen; bei einer Karte mit Bedienelementen eher nicht.",
      jn(
        t,
        t.settings.fullscreenArea,
        (e) => t.onChange({ fullscreenArea: e })
      )
    )}
      `
  )}
    ${Z(
    "Bereichswahl",
    y`
        ${z(
      "Mit anderen koppeln",
      "Normalerweise ist jeder Bildschirm für sich. Gekoppelte Bildschirme zeigen denselben Bereich und ziehen einander mit.",
      Lv(t)
    )}
        ${Uv(t)}
      `
  )}
  `;
}
function jn(t, e, n) {
  return y`
    <select
      class="set-auswahl"
      .value=${e}
      @change=${(i) => n(i.target.value)}
    >
      <option value="" ?selected=${!e}>wie im Dashboard</option>
      ${t.areas.map(
    (i) => y`
          <option value=${i.id} ?selected=${i.id === e}>${i.name}</option>
        `
  )}
    </select>
  `;
}
function Lv(t) {
  return t.eigeneId ? vt(t.gekoppelt, t.onKopplung) : y`<span class="set-anzeige">nicht möglich</span>`;
}
function Uv(t) {
  return t.eigeneId ? t.gekoppelt ? t.anzahlGekoppelt <= 1 ? y`
      <p class="set-fussnote">
        Gekoppelt, aber allein: Automationen erreichen diesen Bildschirm, sonst zieht ihn
        niemand mit.
      </p>
    ` : y`
    <p class="set-fussnote">
      ${t.anzahlGekoppelt} Bildschirme sind gekoppelt und zeigen denselben Bereich.
    </p>
  ` : y`
      <p class="set-fussnote">
        Dieser Bildschirm ist für sich. Automationen, die das Panel umschalten, erreichen
        ihn nicht — beim Wandpanel ist die Kopplung deshalb sinnvoll.
      </p>
    ` : y`
      <p class="set-fussnote">
        Dazu wird browser_mod gebraucht: Es gibt jedem Bildschirm eine Kennung, an der
        sich dieses Gerät von den anderen unterscheiden lässt. Ohne diese Kennung bleibt
        jeder Bildschirm für sich.
      </p>
    `;
}
function Fv(t) {
  return t.fehler ? Z("Aufgaben", y`<p class="set-fussnote">${t.fehler}</p>`) : t.sets.length === 0 ? Z(
    "Aufgaben",
    y`<p class="set-leer">
        <ha-icon icon="mdi:playlist-remove"></ha-icon>
        In diesem Panel gibt es keine Aufgabenkarte.
      </p>`
  ) : y`${t.sets.map((e) => jv(e))}`;
}
function jv(t) {
  return Z(
    t.bereich,
    y`
      ${dl(t)}
      ${z(
      "Überschrift",
      "Steht über allen Spalten. Leer lassen, wenn keine gebraucht wird.",
      cl(t.title, "ohne Überschrift", t.onTitle)
    )}
      ${z(
      "Erledigte mitzeigen",
      "Abgehakte Einträge bleiben sichtbar, ans Ende sortiert.",
      vt(t.showCompleted, t.onShowCompleted)
    )}
      ${z(
      "Fälligkeiten zeigen",
      'Zeigt "Heute", "Morgen" oder das Datum an jedem Eintrag.',
      vt(t.showDue, t.onShowDue)
    )}
    `
  );
}
function Wv(t) {
  return y`
    ${Z("Bilder", Vv(t))}
    ${Z(
    "Bilderrahmen",
    y`
        ${z(
      "Sekunden je Bild",
      "Wie lange ein Bild stehen bleibt.",
      on(
        t.settings.interval,
        "s",
        5,
        { min: 5, max: 300 },
        (e) => t.onChange({ interval: e })
      )
    )}
        ${z(
      "Uhr einblenden",
      "Zeigt Uhrzeit und Datum über dem Bild.",
      vt(t.settings.showClock, (e) => t.onChange({ showClock: e }))
    )}
        ${z(
      "Ordner neu lesen",
      "Wie oft nach neuen Bildern gesehen wird.",
      on(
        t.settings.rescanMinutes,
        "min",
        15,
        { min: 5, max: 720 },
        (e) => t.onChange({ rescanMinutes: e })
      )
    )}
        ${z(
      "Ordner",
      "Ort in der Medienablage. Nur ändern, wenn die Bilder woanders liegen.",
      cl(t.settings.folder, "media-source://…", (e) => t.onChange({ folder: e }))
    )}
      `
  )}
  `;
}
function Vv(t) {
  return y`
    <div class="set-upload">
      ${t.uploading ? y`
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
          ` : y`
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

    ${t.tiles.length === 0 && !t.loading ? y`<p class="set-leer">
          <ha-icon icon="mdi:image-off-outline"></ha-icon>
          Noch keine Bilder. Der Bilderrahmen bleibt leer, bis welche da sind.
        </p>` : y`<div class="set-galerie">${t.tiles.map((e) => Gv(e, t))}</div>`}
  `;
}
function Gv(t, e) {
  const n = e.confirmDelete === t.id;
  return y`
    <figure class="set-kachel ${n ? "fragt" : ""}">
      <!-- Ohne loading="lazy": Die Kacheln entstehen, waehrend der Bereich
           in der Huelle noch verborgen ist. Der Browser haelt sie dann fuer
           ausserhalb des Sichtfelds und laedt sie auch beim Aufklappen nicht
           zuverlaessig nach - die Galerie bliebe grau. -->
      <img src=${t.url} alt=${t.title} />
      ${n ? y`
            <div class="set-nachfrage">
              <span>Löschen?</span>
              <div>
                <button class="set-weg" @click=${() => e.onDelete(t.id)}>Ja, löschen</button>
                <button class="set-zurueck" @click=${e.onCancelDelete}>Abbrechen</button>
              </div>
            </div>
          ` : y`
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
var qv = Object.defineProperty, Yv = Object.getOwnPropertyDescriptor, X = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? Yv(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (i ? o(e, n, r) : o(r)) || r);
  return i && r && qv(e, n, r), r;
};
const Is = [
  { id: "fotos", icon: "mdi:image-multiple", name: "Fotos", ready: !0 },
  { id: "kalender", icon: "mdi:calendar-month", name: "Kalender", ready: !0 },
  { id: "aufgaben", icon: "mdi:checkbox-marked-outline", name: "Aufgaben", ready: !0 },
  { id: "panel", icon: "mdi:tablet-dashboard", name: "Panel", ready: !0 },
  { id: "info", icon: "mdi:information-outline", name: "Über", ready: !0 }
], Qv = 6e3;
let V = class extends ie {
  constructor() {
    super(...arguments), this.settings = at, this.section = "fotos", this.confirmDelete = "", this.message = "", this.appVersion = "", this.taskCards = [], this.areas = [], this.dashboardFehler = "", this.kalenderImDashboard = {
      entities: [],
      colors: {}
    }, this.bilder = new _v(
      () => this.requestUpdate(),
      (t) => this.notify(t)
    ), this.started = !1;
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
    return y`
      <ha-card>
        <h2 class="set-titel">Einstellungen</h2>
        ${Iv({
      sections: Is,
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
    return this.section === "info" ? Nv({
      timeZone: this.hass?.config?.time_zone ?? "",
      haVersion: this.hass?.config?.version ?? "",
      appVersion: this.appVersion,
      folder: this.settings.photos.folder,
      onOpenIntegration: () => this.navigate("/config/integrations/integration/calendar_service_ext"),
      onOpenTimeZone: () => this.navigate("/config/general")
    }) : this.section === "panel" ? Bv({
      settings: this.settings.panel,
      eigeneId: zt(),
      areas: this.areas,
      gekoppelt: this.settings.panel.syncedBrowsers.includes(zt()),
      anzahlGekoppelt: this.settings.panel.syncedBrowsers.length,
      onKopplung: (t) => {
        this.savePanel({ syncedBrowsers: this.kopplung(t) });
      },
      onChange: (t) => {
        this.savePanel(t);
      }
    }) : this.section === "kalender" ? zv(
      yv(this.settings, this.kalenderImDashboard, this.deps("calendar"))
    ) : this.section === "aufgaben" ? Fv({
      sets: wv(this.settings, this.taskCards, this.deps("todo")),
      fehler: this.dashboardFehler
    }) : this.section !== "fotos" ? Ov(Is.find((t) => t.id === this.section)?.name ?? "Der Bereich") : Wv({
      settings: this.settings.photos,
      tiles: this.bilder.tiles,
      uploading: this.bilder.uploading,
      confirmDelete: this.confirmDelete,
      loading: this.bilder.loading,
      onPick: () => this.fileInput?.click(),
      onFiles: (t) => {
        this.bilder.upload(this.hass, this.folder, t);
      },
      onAskDelete: (t) => this.confirmDelete = t,
      onCancelDelete: () => this.confirmDelete = "",
      onDelete: (t) => {
        this.confirmDelete = "", this.bilder.remove(this.hass, t);
      },
      onChange: (t) => {
        this.savePhotos(t);
      }
    });
  }
  // ---------------------------------------------------------------- Daten
  async start() {
    try {
      this.unsubscribe = await hn(this.hass, (t) => {
        const e = t.photos.folder !== this.settings.photos.folder;
        this.settings = t, e && this.bilder.reload(this.hass, this.folder);
      });
    } catch (t) {
      console.error("Family Settings: Einstellungen nicht erreichbar", t), this.notify("Einstellungen konnten nicht geladen werden.");
    }
    this.loadVersion(), this.loadDashboard(), await this.bilder.reload(this.hass, this.folder);
  }
  /** Was die Abschnitte zum Bauen ihrer Kontexte brauchen. */
  deps(t) {
    return {
      nameOf: (e) => this.hass?.states[e]?.attributes.friendly_name ?? e,
      choices: this.entityChoices(t),
      patch: (e) => {
        this.save(e);
      }
    };
  }
  /** Alle Entitäten einer Domäne, alphabetisch. */
  entityChoices(t) {
    return Object.keys(this.hass?.states ?? {}).filter((e) => e.startsWith(`${t}.`)).map((e) => ({
      entityId: e,
      name: this.hass.states[e].attributes.friendly_name ?? e
    })).sort((e, n) => e.name.localeCompare(n.name, "de"));
  }
  /** Liest, welche Karten dieses Panel hat.
   *
   * Nur lesend: Die Einstellungen selbst liegen in der Integration, nicht
   * in der Dashboard-Konfiguration.
   */
  async loadDashboard() {
    try {
      const t = await this.hass.callWS({
        type: "lovelace/config",
        url_path: Dv(location.pathname)
      });
      this.taskCards = Av(t), this.areas = Cv(t), this.kalenderImDashboard = xv(t), this.dashboardFehler = "";
    } catch (t) {
      console.error("Family Settings: Dashboard nicht lesbar", t), this.dashboardFehler = "Die Aufteilung des Panels ließ sich nicht lesen. Ohne sie ist nicht bekannt, welche Karten es gibt.";
    }
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
  /** Diesen Bildschirm in die Kopplung aufnehmen oder herausnehmen. */
  kopplung(t) {
    const e = zt(), n = this.settings.panel.syncedBrowsers.filter((i) => i !== e);
    return t && e ? [...n, e] : n;
  }
  async savePanel(t) {
    this.settings = { ...this.settings, panel: { ...this.settings.panel, ...t } }, await this.save({ panel: t });
  }
  /** Einen Ausschnitt schreiben; das Abonnement liefert den neuen Stand. */
  async save(t) {
    try {
      await nc(this.hass, t);
    } catch (e) {
      console.error("Family Settings: Speichern fehlgeschlagen", e), this.notify("Die Einstellung konnte nicht gespeichert werden.");
    }
  }
  async savePhotos(t) {
    this.settings = { ...this.settings, photos: { ...this.settings.photos, ...t } }, await this.save({ photos: t }), t.folder !== void 0 && await this.bilder.reload(this.hass, this.folder);
  }
  get folder() {
    return this.settings.photos.folder;
  }
  // -------------------------------------------------------------- Helfer
  navigate(t) {
    history.pushState(null, "", t), window.dispatchEvent(new Event("location-changed"));
  }
  notify(t) {
    this.message = t, this.hinweisTimer && clearTimeout(this.hinweisTimer), this.hinweisTimer = window.setTimeout(() => this.message = "", Qv);
  }
};
V.styles = Mv;
X([
  q({ attribute: !1 })
], V.prototype, "hass", 2);
X([
  q({ attribute: !1 })
], V.prototype, "config", 2);
X([
  R()
], V.prototype, "settings", 2);
X([
  R()
], V.prototype, "section", 2);
X([
  R()
], V.prototype, "confirmDelete", 2);
X([
  R()
], V.prototype, "message", 2);
X([
  R()
], V.prototype, "appVersion", 2);
X([
  R()
], V.prototype, "taskCards", 2);
X([
  R()
], V.prototype, "areas", 2);
X([
  R()
], V.prototype, "dashboardFehler", 2);
X([
  mi("#dateiwahl")
], V.prototype, "fileInput", 2);
V = X([
  Je("family-settings")
], V);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-settings",
  name: "Family Settings",
  description: "Einstellungen der Family-Calendar-App: Bilder, Bilderrahmen und Stand.",
  preview: !1
});
function Os(t, e) {
  const n = Ns(t.width, e.width), i = Ns(t.height, e.height), r = li(t.left - e.left), s = li(t.top - e.top);
  return `translate(${r}px, ${s}px) scale(${n}, ${i})`;
}
function Ns(t, e) {
  return e <= 0 ? 1 : li(t / e, 4);
}
function li(t, e = 2) {
  const n = 10 ** e;
  return Math.round(t * n) / n;
}
function $s() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
}
const Ps = 560, Zv = "cubic-bezier(0.16, 1, 0.3, 1)", Hs = 200, Kv = "cubic-bezier(0.4, 0, 1, 1)";
class Xv {
  constructor(e, n, i) {
    this.config = e, this.activeId = n, this.element = i, this.gewachsen = !1;
  }
  get expanded() {
    return this.gewachsen;
  }
  /** Zeitgeber neu stellen - nach jeder Beruehrung und jedem Wechsel. */
  restart() {
    this.timer !== void 0 && clearTimeout(this.timer);
    const e = this.config();
    !e?.after || !e.area || (this.timer = window.setTimeout(() => {
      this.activeId() === e.area && this.expand();
    }, e.after * 1e3));
  }
  dispose() {
    this.timer !== void 0 && clearTimeout(this.timer), this.timer = void 0;
  }
  expand() {
    const e = this.element(this.config()?.area ?? "");
    if (!e || this.gewachsen) return;
    this.gewachsen = !0;
    const n = e.getBoundingClientRect();
    if (e.classList.add("area--fullscreen"), $s()) return;
    const i = e.getBoundingClientRect();
    e.style.transition = "none", e.style.transform = Os(n, i), e.offsetWidth, e.style.transition = `transform ${Ps}ms ${Zv}`, e.style.transform = "", this.nachDerBewegung(e, Ps, () => {
      e.style.transition = "";
    });
  }
  collapse() {
    const e = this.element(this.config()?.area ?? "");
    if (!e || !this.gewachsen) return;
    this.gewachsen = !1;
    const n = () => {
      e.classList.remove("area--fullscreen"), e.style.transition = "", e.style.transform = "";
    };
    if ($s()) {
      n();
      return;
    }
    const i = e.getBoundingClientRect();
    e.classList.remove("area--fullscreen");
    const r = e.getBoundingClientRect();
    e.classList.add("area--fullscreen"), e.style.transition = "none", e.style.transform = "", e.offsetWidth, e.style.transition = `transform ${Hs}ms ${Kv}`, e.style.transform = Os(r, i), this.nachDerBewegung(e, Hs, n);
  }
  /** Ruft auf, wenn die Bewegung fertig ist - notfalls per Zeitgeber.
   *
   * transitionend bleibt aus, wenn der Bildschirm zwischendurch in den
   * Hintergrund geraet. Ohne Netz haenge der Bereich dann fuer immer im
   * Vollbild fest.
   */
  nachDerBewegung(e, n, i) {
    let r = !1;
    const s = () => {
      r || (r = !0, i());
    };
    e.addEventListener("transitionend", s, { once: !0 }), window.setTimeout(s, n + 150);
  }
}
const Jv = G`
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
`, eb = G`
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

  /* Gewachsener Bereich: liegt ueber allem, auch ueber der Seitenleiste.
     Die Groesse des Inhalts kommt ueber Eigenschaften herein - die reichen
     durch den Schattenbaum der Karte, deren Stile von hier aus sonst nicht
     erreichbar waeren. */
  .area--fullscreen {
    position: fixed;
    inset: 0;
    z-index: 30;
    transform-origin: top left;
    will-change: transform;
    --photos-height: 100vh;
    --photos-radius: 0px;
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
function tb(t) {
  return y`
    <ha-card>
      <nav>${t.items.map((e) => nb(e, t))}</nav>
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
function nb(t, e) {
  const n = e.isActive(t), i = [
    "item",
    n ? "item--active" : "",
    t.disabled ? "item--disabled" : ""
  ].filter(Boolean).join(" ");
  return y`
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
var ib = Object.defineProperty, rb = Object.getOwnPropertyDescriptor, nt = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? rb(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (i ? o(e, n, r) : o(r)) || r);
  return i && r && ib(e, n, r), r;
};
let Ee = class extends ie {
  constructor() {
    super(...arguments), this.compact = !1, this.activeId = "", this.ready = !1, this.cards = /* @__PURE__ */ new Map(), this.gekoppelt = !1, this.panel = { initial: "" }, this.selbstGewaehlt = !1, this.letzterHelferStand = "", this.previousId = "", this.onActivity = () => this.noteActivity(), this.vollbild = new Xv(
      () => this.panel.fullscreen ?? this.config?.fullscreen,
      () => this.activeId,
      (t) => t ? this.renderRoot.querySelector(`.area[data-area="${t}"]`) : null
    );
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
    this.restartIdleTimer(), this.vollbild.restart();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    for (const t of ["pointerdown", "keydown", "wheel"])
      window.removeEventListener(t, this.onActivity);
    this.idleTimer !== void 0 && clearTimeout(this.idleTimer), this.vollbild.dispose(), this.unsubscribeSettings?.(), this.unsubscribeSettings = void 0;
  }
  firstUpdated() {
    this.buildAreas(), this.watchLead();
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
      n.settingsKey = e.id, n.hass = this.hass, this.cards.set(e.id, n);
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
  /** Folgt dem Auswahlhelfer, damit Automationen umschalten koennen.
   *
   * Nur gekoppelte Bildschirme folgen ueberhaupt - und auch die nur auf
   * *Aenderungen* des Helfers, nicht auf seinen Stand. Wuerde dem Stand
   * gefolgt, zoege es einen Bildschirm nach jedem eigenen Klick sofort
   * wieder zurueck, und er liesse sich nicht mehr bedienen.
   */
  followSyncEntity() {
    const t = this.config.syncEntity;
    if (!t || !this.gekoppelt) return;
    const e = this.hass?.states[t]?.state;
    !e || e === this.letzterHelferStand || (this.letzterHelferStand = e, e !== this.activeId && this.config.areas.some((n) => n.id === e && !n.path) && this.switchTo(e));
  }
  render() {
    return y`
      <div class="shell">
        ${tb({
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
  /** Beobachtet, welches Geraet die Bereichswahl fuehren soll. */
  async watchLead() {
    try {
      this.unsubscribeSettings = await hn(
        this.hass,
        (t) => this.applySettings(t)
      );
    } catch (t) {
      console.warn("Family Shell: Einstellungen nicht erreichbar", t);
    }
  }
  /** Uebernimmt die Einstellungen des Panels. */
  applySettings(t) {
    this.gekoppelt = t.panel.syncedBrowsers.includes(zt()), this.panel = Zl(this.config, t.panel), !this.selbstGewaehlt && this.panel.initial && this.panel.initial !== this.activeId && this.switchTo(this.panel.initial), this.restartIdleTimer(), this.vollbild.restart();
  }
  pathOf(t) {
    return this.config.areas.find((e) => e.id === t)?.path;
  }
  renderArea(t) {
    if (t.path) return y``;
    const e = this.cards.get(t.id), n = t.id !== this.activeId;
    return e ? y`<div class="area" data-area=${t.id} ?hidden=${n}>${e}</div>` : n ? y`` : y`<div class="placeholder">Dieser Bereich ist noch nicht eingerichtet.</div>`;
  }
  select(t) {
    const e = this.config.areas.find((n) => n.id === t);
    if (e) {
      if (e.path) {
        history.pushState(null, "", e.path), window.dispatchEvent(new CustomEvent("location-changed", { bubbles: !0, composed: !0 }));
        return;
      }
      t !== this.activeId && (this.selbstGewaehlt = !0, this.switchTo(t), this.reportToSyncEntity(t));
    }
  }
  switchTo(t) {
    t !== this.activeId && (this.vollbild.expanded && this.vollbild.collapse(), this.previousId = this.activeId, this.activeId = t, this.vollbild.restart(), window.setTimeout(() => window.dispatchEvent(new Event("resize")), 50));
  }
  /** Schreibt den Bereich in den Auswahlhelfer zurueck.
   *
   * Nur, wenn dieser Bildschirm gekoppelt ist. Der Helfer ist eine einzige
   * globale Entitaet: Ohne diese Einschraenkung zieht ein Klick auf
   * irgendeinem Geraet alle anderen mit. Gekoppelt wird im
   * Einstellungsbereich, an dem Geraet, das mitmachen soll.
   */
  reportToSyncEntity(t) {
    const e = this.config.syncEntity;
    !e || !this.gekoppelt || this.hass?.states[e]?.state === t || this.hass?.callService("input_select", "select_option", {
      entity_id: e,
      option: t
    });
  }
  /** Eine Bedienung holt aus dem Ruhezustand zurueck. */
  noteActivity() {
    if (this.vollbild.expanded) {
      this.vollbild.collapse(), this.restartIdleTimer(), this.vollbild.restart();
      return;
    }
    const t = this.panel.idle ?? this.config.idle;
    if (t && this.activeId === t.area) {
      const e = t.returnTo ?? this.previousId;
      e && e !== t.area && (this.switchTo(e), this.reportToSyncEntity(e));
    }
    this.restartIdleTimer(), this.vollbild.restart();
  }
  restartIdleTimer() {
    this.idleTimer !== void 0 && clearTimeout(this.idleTimer);
    const t = this.panel.idle ?? this.config?.idle;
    !t?.after || !t.area || (this.idleTimer = window.setTimeout(() => {
      this.activeId !== t.area && (this.switchTo(t.area), this.reportToSyncEntity(t.area));
    }, t.after * 1e3));
  }
};
Ee.styles = [eb, Jv];
nt([
  q({ attribute: !1 })
], Ee.prototype, "hass", 2);
nt([
  q({ attribute: !1 })
], Ee.prototype, "config", 2);
nt([
  q({ type: Boolean, reflect: !0 })
], Ee.prototype, "compact", 2);
nt([
  R()
], Ee.prototype, "activeId", 2);
nt([
  R()
], Ee.prototype, "ready", 2);
Ee = nt([
  Je("family-shell")
], Ee);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-shell",
  name: "Family Shell",
  description: "Seitenleiste mit Bereichen, die beim Wechseln geladen bleiben.",
  preview: !1
});
async function sb(t, e, n) {
  return t.connection.subscribeMessage((r) => n(r.items ?? []), {
    type: "todo/item/subscribe",
    entity_id: e
  });
}
async function ob(t, e, n, i = {}) {
  await t.callService("todo", "add_item", {
    entity_id: e,
    item: n,
    ...i.dueDate ? { due_date: i.dueDate } : {},
    ...i.description ? { description: i.description } : {}
  });
}
async function ab(t, e, n, i) {
  await t.callService("todo", "update_item", {
    entity_id: e,
    item: n.uid,
    status: i
  });
}
async function lb(t, e, n, i) {
  await t.callService("todo", "update_item", {
    entity_id: e,
    item: n.uid,
    ...i.rename !== void 0 ? { rename: i.rename } : {},
    ...i.dueDate !== void 0 ? { due_date: i.dueDate } : {},
    ...i.description !== void 0 ? { description: i.description } : {}
  });
}
async function cb(t, e, n) {
  await t.callService("todo", "remove_item", { entity_id: e, item: n.uid });
}
async function db(t, e) {
  await t.callService("todo", "remove_completed_items", { entity_id: e });
}
const ub = G`
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
`, ul = /^\[wdh:\s*([^\]]+)\]\s*$/m, hb = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"];
function hl(t) {
  if (!t) return null;
  const e = ul.exec(t);
  if (!e) return null;
  const n = e[1], i = zs(n, "FREQ");
  if (!i || !hb.includes(i)) return null;
  const r = Number.parseInt(zs(n, "INTERVAL") ?? "1", 10);
  return {
    frequency: i,
    interval: Number.isFinite(r) && r > 0 ? r : 1
  };
}
function zs(t, e) {
  for (const n of t.split(";")) {
    const [i, r] = n.split("=");
    if (i?.trim().toUpperCase() === e) return r?.trim().toUpperCase();
  }
}
function fl(t) {
  return t ? t.replace(ul, "").trim() : "";
}
function Bs(t, e, n = 1) {
  const i = fl(t);
  if (!e) return i;
  const r = n > 1 ? `FREQ=${e};INTERVAL=${n}` : `FREQ=${e}`;
  return i ? `${i}

[wdh: ${r}]` : `[wdh: ${r}]`;
}
const fb = {
  DAILY: "Täglich",
  WEEKLY: "Wöchentlich",
  MONTHLY: "Monatlich",
  YEARLY: "Jährlich"
}, pb = {
  DAILY: "Tage",
  WEEKLY: "Wochen",
  MONTHLY: "Monate",
  YEARLY: "Jahre"
};
function Ls(t) {
  return t.interval <= 1 ? fb[t.frequency] ?? "Wiederholt" : `Alle ${t.interval} ${pb[t.frequency] ?? "Male"}`;
}
const kt = (t) => t.target.value;
function gb(t) {
  return y`
    <div class="dialog-overlay" @click=${() => t.onCancel()}>
      <div class="dialog" @click=${(e) => e.stopPropagation()}>
        <h3>Aufgabe</h3>
        <p class="dialog-list">${t.listName}</p>

        <label class="field">
          Titel
          <input type="text" .value=${t.title} @input=${(e) => t.onTitle(kt(e))} />
        </label>

        <label class="field">
          Fällig am
          <input type="date" .value=${t.due} @input=${(e) => t.onDue(kt(e))} />
        </label>

        <label class="field">
          Wiederholung
          <select
            .value=${t.frequency}
            @change=${(e) => t.onFrequency(kt(e))}
          >
            <option value="">Keine</option>
            <option value="DAILY">Täglich</option>
            <option value="WEEKLY">Wöchentlich</option>
            <option value="MONTHLY">Monatlich</option>
            <option value="YEARLY">Jährlich</option>
          </select>
        </label>

        ${t.frequency ? y`
              <label class="field">
                Alle … Male
                <input
                  type="number"
                  min="1"
                  max="30"
                  .value=${String(t.interval)}
                  @input=${(e) => t.onInterval(Math.max(1, Number.parseInt(kt(e), 10) || 1))}
                />
              </label>
              <p class="dialog-hint">
                Nach dem Abhaken erscheint die Aufgabe automatisch wieder.
              </p>
            ` : y`
              <p class="dialog-hint">
                Ohne Wiederholung bleibt die Aufgabe nach dem Abhaken erledigt.
              </p>
            `}

        <div class="dialog-actions">
          ${t.confirmDelete ? y`
                <button class="btn-delete btn-delete--confirm" @click=${() => t.onDelete()}>
                  Wirklich löschen?
                </button>
              ` : y`
                <button class="btn-delete" @click=${() => t.onConfirmDelete()}>Löschen</button>
              `}
          <button class="btn-cancel" @click=${() => t.onCancel()}>Abbrechen</button>
          <button class="btn-save" @click=${() => t.onSave()}>Speichern</button>
        </div>
      </div>
    </div>
  `;
}
function an(t) {
  if (!t.due) return null;
  const e = new Date(t.due.length === 10 ? `${t.due}T00:00:00` : t.due);
  return Number.isNaN(e.getTime()) ? null : e;
}
function mb(t, e = /* @__PURE__ */ new Date()) {
  if (t.status === "completed") return !1;
  const n = an(t);
  if (!n) return !1;
  const i = new Date(e);
  return i.setHours(0, 0, 0, 0), n < i;
}
function vb(t, e = /* @__PURE__ */ new Date()) {
  const n = an(t);
  if (!n) return null;
  const i = Math.round(
    (new Date(n).setHours(0, 0, 0, 0) - new Date(e).setHours(0, 0, 0, 0)) / 864e5
  );
  return i < 0 ? i === -1 ? "Gestern" : `${Math.abs(i)} Tage überfällig` : i === 0 ? "Heute" : i === 1 ? "Morgen" : i < 7 ? n.toLocaleDateString("de-DE", { weekday: "long" }) : n.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
}
function bb(t) {
  return [...t].sort((e, n) => {
    if (e.status !== n.status) return e.status === "completed" ? 1 : -1;
    const i = an(e), r = an(n);
    return i && r ? i.getTime() - r.getTime() : i ? -1 : r ? 1 : e.summary.localeCompare(n.summary, "de");
  });
}
function yb(t) {
  return t.filter((e) => e.status !== "completed").length;
}
const wb = {
  text: "",
  due: "",
  frequency: "",
  interval: 1,
  expanded: !1
};
function Eb(t) {
  return y`
    <ha-card>
      ${t.title ? y`<h2 class="card-title">${t.title}</h2>` : ""}
      <div class="columns">${t.lists.map((e) => Sb(e, t))}</div>
    </ha-card>
  `;
}
function Sb(t, e) {
  const n = e.items.get(t.entity) ?? [], i = e.showCompleted ? n : n.filter((o) => o.status !== "completed"), r = yb(n), s = n.length - r;
  return y`
    <section class="column" style="--list-color: ${t.color ?? "#0078d4"}">
      <header class="column-head">
        <span class="column-name">${t.name ?? e.nameOf(t.entity)}</span>
        <span class="column-count" title="offen">${r}</span>
      </header>

      <div class="items">
        ${i.length === 0 ? y`<p class="empty">${e.showDue ? "Nichts offen" : "Liste ist leer"}</p>` : bb(i).map((o) => Ab(t, o, e))}
      </div>

      ${Db(t, e)}

      ${e.showCompleted && s > 0 ? y`
            <button class="clear" @click=${() => e.onClearCompleted(t.entity)}>
              ${s} erledigte entfernen
            </button>
          ` : ""}
    </section>
  `;
}
function Ab(t, e, n) {
  const i = e.status === "completed", r = n.showDue ? vb(e) : null, s = hl(e.description);
  return y`
    <div class="item ${i ? "item--done" : ""} ${mb(e) ? "item--overdue" : ""}">
      <button
        class="check"
        aria-label=${i ? "Wieder öffnen" : "Abhaken"}
        @click=${() => n.onToggle(t.entity, e)}
      >
        ${i ? y`<ha-icon icon="mdi:check"></ha-icon>` : ""}
      </button>
      <button class="item-body" title="Ändern" @click=${() => n.onOpen(t.entity, e)}>
        <span class="item-title">${e.summary}</span>
        ${r || s ? y`
              <span class="item-meta">
                ${r ? y`<span class="item-due">${r}</span>` : ""}
                ${s ? y`
                      <span class="item-repeat" title=${Ls(s)}>
                        <ha-icon icon="mdi:repeat"></ha-icon>
                        ${Ls(s)}
                      </span>
                    ` : ""}
              </span>
            ` : ""}
      </button>
    </div>
  `;
}
function Db(t, e) {
  const n = e.drafts.get(t.entity) ?? wb, i = (r) => r.target.value;
  return y`
    <div class="add">
      <input
        type="text"
        placeholder=${e.showDue ? "Neue Aufgabe…" : "Neuer Eintrag…"}
        .value=${n.text}
        @input=${(r) => e.onDraft(t.entity, { text: i(r) })}
        @keydown=${(r) => r.key === "Enter" && e.onAdd(t.entity)}
      />
      ${e.showDue ? y`
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

    ${e.showDue && n.expanded ? Cb(t, n, e) : ""}
  `;
}
function Cb(t, e, n) {
  const i = (r) => r.target.value;
  return y`
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
      ${e.frequency ? y`
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
var xb = Object.defineProperty, _b = Object.getOwnPropertyDescriptor, ze = (t, e, n, i) => {
  for (var r = i > 1 ? void 0 : i ? _b(e, n) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (r = (i ? o(e, n, r) : o(r)) || r);
  return i && r && xb(e, n, r), r;
};
let ce = class extends ie {
  constructor() {
    super(...arguments), this.items = /* @__PURE__ */ new Map(), this.drafts = /* @__PURE__ */ new Map(), this.open = null, this.settingsRevision = 0, this.settingsKey = "", this.einstellungen = new yi("Family Tasks", () => {
      this.settingsRevision++;
      const t = this.listen.map((e) => e.entity).join("|");
      t !== this.letzteListen && (this.letzteListen = t, this.subscribeAll());
    }), this.unsubscribes = [], this.subscribed = !1, this.letzteListen = "";
  }
  setConfig(t) {
    if (!t.lists?.length)
      throw new Error("Bitte mindestens eine Liste angeben!");
    this.config = t;
  }
  getCardSize() {
    return 8;
  }
  /** Die Spalten, wie der Einstellungsbereich sie vorgibt - ersatzweise wie
   *  sie im Dashboard stehen. */
  get listen() {
    return vi(this.config, this.satz);
  }
  get satz() {
    return this.einstellungen.settings.tasks[this.settingsKey];
  }
  updated(t) {
    t.has("hass") && this.hass && !this.subscribed && (this.subscribed = !0, this.subscribeAll(), this.einstellungen.start(this.hass));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    for (const t of this.unsubscribes) t();
    this.unsubscribes = [], this.einstellungen.stop(), this.subscribed = !1;
  }
  render() {
    return y`${this.renderCard()}${this.renderDialog()}`;
  }
  renderDialog() {
    const t = this.open;
    if (!t) return H;
    const e = this.listen.find((i) => i.entity === t.entityId), n = (i) => {
      this.open && (this.open = { ...this.open, ...i });
    };
    return gb({
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
    return this.listen.find((n) => n.entity === t)?.name || this.hass?.states[t]?.attributes?.friendly_name || t;
  }
  renderCard() {
    return Eb({
      lists: this.listen,
      items: this.items,
      drafts: this.drafts,
      showCompleted: this.satz?.showCompleted ?? this.config.showCompleted ?? !1,
      showDue: this.satz?.showDue ?? this.config.showDue ?? !0,
      title: this.satz?.title ?? this.config.title,
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
        db(this.hass, t);
      }
    });
  }
  async subscribeAll() {
    for (const t of this.unsubscribes) t();
    this.unsubscribes = [];
    for (const t of this.listen)
      try {
        const e = await sb(this.hass, t.entity, (n) => {
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
      await ab(this.hass, t, e, n);
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
        await ob(this.hass, t, n, {
          dueDate: e.due || void 0,
          // Die Wiederholung reist in der Beschreibung mit - die Integration
          // liest sie beim Abhaken und legt die naechste Aufgabe an.
          description: e.frequency ? Bs("", e.frequency, e.interval) : void 0
        });
      } catch (i) {
        console.error("Family Tasks: Anlegen fehlgeschlagen", i), this.patchDraft(t, e), this.notify("Die Aufgabe ließ sich nicht anlegen.");
      }
    }
  }
  /** Detailansicht mit den aktuellen Werten fuellen. */
  openItem(t, e) {
    const n = hl(e.description);
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
    const n = fl(t.item.description), i = Bs(n, t.frequency, t.interval);
    this.open = null;
    try {
      await lb(this.hass, t.entityId, t.item, {
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
        await cb(this.hass, t.entityId, t.item);
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
ce.styles = ub;
ze([
  q({ attribute: !1 })
], ce.prototype, "hass", 2);
ze([
  q({ attribute: !1 })
], ce.prototype, "config", 2);
ze([
  R()
], ce.prototype, "items", 2);
ze([
  R()
], ce.prototype, "drafts", 2);
ze([
  R()
], ce.prototype, "open", 2);
ze([
  R()
], ce.prototype, "settingsRevision", 2);
ce = ze([
  Je("family-tasks")
], ce);
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "family-tasks",
  name: "Family Tasks",
  description: "Aufgaben- und Einkaufslisten nebeneinander, mit Abhaken und Anlegen.",
  preview: !1
});
