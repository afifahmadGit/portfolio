"use strict";
(self.webpackChunkportfolio_afif = self.webpackChunkportfolio_afif || []).push([
  [179],
  {
    531: () => {
      function se(n) {
        return "function" == typeof n;
      }
      function Ts(n) {
        const e = n((i) => {
          Error.call(i), (i.stack = new Error().stack);
        });
        return (
          (e.prototype = Object.create(Error.prototype)),
          (e.prototype.constructor = e),
          e
        );
      }
      const oa = Ts(
        (n) =>
          function (e) {
            n(this),
              (this.message = e
                ? `${e.length} errors occurred during unsubscription:\n${e
                    .map((i, r) => `${r + 1}) ${i.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = e);
          }
      );
      function mr(n, t) {
        if (n) {
          const e = n.indexOf(t);
          0 <= e && n.splice(e, 1);
        }
      }
      class Ve {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._teardowns = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: e } = this;
            if (e)
              if (((this._parentage = null), Array.isArray(e)))
                for (const s of e) s.remove(this);
              else e.remove(this);
            const { initialTeardown: i } = this;
            if (se(i))
              try {
                i();
              } catch (s) {
                t = s instanceof oa ? s.errors : [s];
              }
            const { _teardowns: r } = this;
            if (r) {
              this._teardowns = null;
              for (const s of r)
                try {
                  Vp(s);
                } catch (o) {
                  (t = null != t ? t : []),
                    o instanceof oa ? (t = [...t, ...o.errors]) : t.push(o);
                }
            }
            if (t) throw new oa(t);
          }
        }
        add(t) {
          var e;
          if (t && t !== this)
            if (this.closed) Vp(t);
            else {
              if (t instanceof Ve) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._teardowns =
                null !== (e = this._teardowns) && void 0 !== e ? e : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: e } = this;
          return e === t || (Array.isArray(e) && e.includes(t));
        }
        _addParent(t) {
          const { _parentage: e } = this;
          this._parentage = Array.isArray(e) ? (e.push(t), e) : e ? [e, t] : t;
        }
        _removeParent(t) {
          const { _parentage: e } = this;
          e === t ? (this._parentage = null) : Array.isArray(e) && mr(e, t);
        }
        remove(t) {
          const { _teardowns: e } = this;
          e && mr(e, t), t instanceof Ve && t._removeParent(this);
        }
      }
      Ve.EMPTY = (() => {
        const n = new Ve();
        return (n.closed = !0), n;
      })();
      const Np = Ve.EMPTY;
      function Lp(n) {
        return (
          n instanceof Ve ||
          (n && "closed" in n && se(n.remove) && se(n.add) && se(n.unsubscribe))
        );
      }
      function Vp(n) {
        se(n) ? n() : n.unsubscribe();
      }
      const Pi = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        aa = {
          setTimeout(...n) {
            const { delegate: t } = aa;
            return ((null == t ? void 0 : t.setTimeout) || setTimeout)(...n);
          },
          clearTimeout(n) {
            const { delegate: t } = aa;
            return ((null == t ? void 0 : t.clearTimeout) || clearTimeout)(n);
          },
          delegate: void 0,
        };
      function Bp(n) {
        aa.setTimeout(() => {
          const { onUnhandledError: t } = Pi;
          if (!t) throw n;
          t(n);
        });
      }
      function Is() {}
      const dM = jc("C", void 0, void 0);
      function jc(n, t, e) {
        return { kind: n, value: t, error: e };
      }
      let Ni = null;
      function la(n) {
        if (Pi.useDeprecatedSynchronousErrorHandling) {
          const t = !Ni;
          if ((t && (Ni = { errorThrown: !1, error: null }), n(), t)) {
            const { errorThrown: e, error: i } = Ni;
            if (((Ni = null), e)) throw i;
          }
        } else n();
      }
      class Hc extends Ve {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Lp(t) && t.add(this))
              : (this.destination = mM);
        }
        static create(t, e, i) {
          return new Uc(t, e, i);
        }
        next(t) {
          this.isStopped
            ? zc(
                (function fM(n) {
                  return jc("N", n, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? zc(
                (function hM(n) {
                  return jc("E", void 0, n);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? zc(dM, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      class Uc extends Hc {
        constructor(t, e, i) {
          let r;
          if ((super(), se(t))) r = t;
          else if (t) {
            let s;
            ({ next: r, error: e, complete: i } = t),
              this && Pi.useDeprecatedNextContext
                ? ((s = Object.create(t)),
                  (s.unsubscribe = () => this.unsubscribe()))
                : (s = t),
              (r = null == r ? void 0 : r.bind(s)),
              (e = null == e ? void 0 : e.bind(s)),
              (i = null == i ? void 0 : i.bind(s));
          }
          this.destination = {
            next: r ? $c(r) : Is,
            error: $c(null != e ? e : jp),
            complete: i ? $c(i) : Is,
          };
        }
      }
      function $c(n, t) {
        return (...e) => {
          try {
            n(...e);
          } catch (i) {
            Pi.useDeprecatedSynchronousErrorHandling
              ? (function pM(n) {
                  Pi.useDeprecatedSynchronousErrorHandling &&
                    Ni &&
                    ((Ni.errorThrown = !0), (Ni.error = n));
                })(i)
              : Bp(i);
          }
        };
      }
      function jp(n) {
        throw n;
      }
      function zc(n, t) {
        const { onStoppedNotification: e } = Pi;
        e && aa.setTimeout(() => e(n, t));
      }
      const mM = { closed: !0, next: Is, error: jp, complete: Is },
        Gc =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function ci(n) {
        return n;
      }
      let he = (() => {
        class n {
          constructor(e) {
            e && (this._subscribe = e);
          }
          lift(e) {
            const i = new n();
            return (i.source = this), (i.operator = e), i;
          }
          subscribe(e, i, r) {
            const s = (function _M(n) {
              return (
                (n && n instanceof Hc) ||
                ((function gM(n) {
                  return n && se(n.next) && se(n.error) && se(n.complete);
                })(n) &&
                  Lp(n))
              );
            })(e)
              ? e
              : new Uc(e, i, r);
            return (
              la(() => {
                const { operator: o, source: a } = this;
                s.add(
                  o
                    ? o.call(s, a)
                    : a
                    ? this._subscribe(s)
                    : this._trySubscribe(s)
                );
              }),
              s
            );
          }
          _trySubscribe(e) {
            try {
              return this._subscribe(e);
            } catch (i) {
              e.error(i);
            }
          }
          forEach(e, i) {
            return new (i = Up(i))((r, s) => {
              let o;
              o = this.subscribe(
                (a) => {
                  try {
                    e(a);
                  } catch (l) {
                    s(l), null == o || o.unsubscribe();
                  }
                },
                s,
                r
              );
            });
          }
          _subscribe(e) {
            var i;
            return null === (i = this.source) || void 0 === i
              ? void 0
              : i.subscribe(e);
          }
          [Gc]() {
            return this;
          }
          pipe(...e) {
            return (function Hp(n) {
              return 0 === n.length
                ? ci
                : 1 === n.length
                ? n[0]
                : function (e) {
                    return n.reduce((i, r) => r(i), e);
                  };
            })(e)(this);
          }
          toPromise(e) {
            return new (e = Up(e))((i, r) => {
              let s;
              this.subscribe(
                (o) => (s = o),
                (o) => r(o),
                () => i(s)
              );
            });
          }
        }
        return (n.create = (t) => new n(t)), n;
      })();
      function Up(n) {
        var t;
        return null !== (t = null != n ? n : Pi.Promise) && void 0 !== t
          ? t
          : Promise;
      }
      const yM = Ts(
        (n) =>
          function () {
            n(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let K = (() => {
        class n extends he {
          constructor() {
            super(),
              (this.closed = !1),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(e) {
            const i = new $p(this, this);
            return (i.operator = e), i;
          }
          _throwIfClosed() {
            if (this.closed) throw new yM();
          }
          next(e) {
            la(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                const i = this.observers.slice();
                for (const r of i) r.next(e);
              }
            });
          }
          error(e) {
            la(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = e);
                const { observers: i } = this;
                for (; i.length; ) i.shift().error(e);
              }
            });
          }
          complete() {
            la(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: e } = this;
                for (; e.length; ) e.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0), (this.observers = null);
          }
          get observed() {
            var e;
            return (
              (null === (e = this.observers) || void 0 === e
                ? void 0
                : e.length) > 0
            );
          }
          _trySubscribe(e) {
            return this._throwIfClosed(), super._trySubscribe(e);
          }
          _subscribe(e) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(e),
              this._innerSubscribe(e)
            );
          }
          _innerSubscribe(e) {
            const { hasError: i, isStopped: r, observers: s } = this;
            return i || r ? Np : (s.push(e), new Ve(() => mr(s, e)));
          }
          _checkFinalizedStatuses(e) {
            const { hasError: i, thrownError: r, isStopped: s } = this;
            i ? e.error(r) : s && e.complete();
          }
          asObservable() {
            const e = new he();
            return (e.source = this), e;
          }
        }
        return (n.create = (t, e) => new $p(t, e)), n;
      })();
      class $p extends K {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          var e, i;
          null ===
            (i =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.next) ||
            void 0 === i ||
            i.call(e, t);
        }
        error(t) {
          var e, i;
          null ===
            (i =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.error) ||
            void 0 === i ||
            i.call(e, t);
        }
        complete() {
          var t, e;
          null ===
            (e =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === e ||
            e.call(t);
        }
        _subscribe(t) {
          var e, i;
          return null !==
            (i =
              null === (e = this.source) || void 0 === e
                ? void 0
                : e.subscribe(t)) && void 0 !== i
            ? i
            : Np;
        }
      }
      function zp(n) {
        return se(null == n ? void 0 : n.lift);
      }
      function Pe(n) {
        return (t) => {
          if (zp(t))
            return t.lift(function (e) {
              try {
                return n(e, this);
              } catch (i) {
                this.error(i);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      class Se extends Hc {
        constructor(t, e, i, r, s) {
          super(t),
            (this.onFinalize = s),
            (this._next = e
              ? function (o) {
                  try {
                    e(o);
                  } catch (a) {
                    t.error(a);
                  }
                }
              : super._next),
            (this._error = r
              ? function (o) {
                  try {
                    r(o);
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = i
              ? function () {
                  try {
                    i();
                  } catch (o) {
                    t.error(o);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          const { closed: e } = this;
          super.unsubscribe(),
            !e &&
              (null === (t = this.onFinalize) || void 0 === t || t.call(this));
        }
      }
      function Q(n, t) {
        return Pe((e, i) => {
          let r = 0;
          e.subscribe(
            new Se(i, (s) => {
              i.next(n.call(t, s, r++));
            })
          );
        });
      }
      function Li(n) {
        return this instanceof Li ? ((this.v = n), this) : new Li(n);
      }
      function CM(n, t, e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var r,
          i = e.apply(n, t || []),
          s = [];
        return (
          (r = {}),
          o("next"),
          o("throw"),
          o("return"),
          (r[Symbol.asyncIterator] = function () {
            return this;
          }),
          r
        );
        function o(h) {
          i[h] &&
            (r[h] = function (f) {
              return new Promise(function (p, m) {
                s.push([h, f, p, m]) > 1 || a(h, f);
              });
            });
        }
        function a(h, f) {
          try {
            !(function l(h) {
              h.value instanceof Li
                ? Promise.resolve(h.value.v).then(c, u)
                : d(s[0][2], h);
            })(i[h](f));
          } catch (p) {
            d(s[0][3], p);
          }
        }
        function c(h) {
          a("next", h);
        }
        function u(h) {
          a("throw", h);
        }
        function d(h, f) {
          h(f), s.shift(), s.length && a(s[0][0], s[0][1]);
        }
      }
      function wM(n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var e,
          t = n[Symbol.asyncIterator];
        return t
          ? t.call(n)
          : ((n = (function qp(n) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                e = t && n[t],
                i = 0;
              if (e) return e.call(n);
              if (n && "number" == typeof n.length)
                return {
                  next: function () {
                    return (
                      n && i >= n.length && (n = void 0),
                      { value: n && n[i++], done: !n }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(n)),
            (e = {}),
            i("next"),
            i("throw"),
            i("return"),
            (e[Symbol.asyncIterator] = function () {
              return this;
            }),
            e);
        function i(s) {
          e[s] =
            n[s] &&
            function (o) {
              return new Promise(function (a, l) {
                !(function r(s, o, a, l) {
                  Promise.resolve(l).then(function (c) {
                    s({ value: c, done: a });
                  }, o);
                })(a, l, (o = n[s](o)).done, o.value);
              });
            };
        }
      }
      const qc = (n) =>
        n && "number" == typeof n.length && "function" != typeof n;
      function Kp(n) {
        return se(null == n ? void 0 : n.then);
      }
      function Qp(n) {
        return se(n[Gc]);
      }
      function Yp(n) {
        return (
          Symbol.asyncIterator &&
          se(null == n ? void 0 : n[Symbol.asyncIterator])
        );
      }
      function Zp(n) {
        return new TypeError(
          `You provided ${
            null !== n && "object" == typeof n ? "an invalid object" : `'${n}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Xp = (function EM() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Jp(n) {
        return se(null == n ? void 0 : n[Xp]);
      }
      function em(n) {
        return CM(this, arguments, function* () {
          const e = n.getReader();
          try {
            for (;;) {
              const { value: i, done: r } = yield Li(e.read());
              if (r) return yield Li(void 0);
              yield yield Li(i);
            }
          } finally {
            e.releaseLock();
          }
        });
      }
      function tm(n) {
        return se(null == n ? void 0 : n.getReader);
      }
      function xt(n) {
        if (n instanceof he) return n;
        if (null != n) {
          if (Qp(n))
            return (function MM(n) {
              return new he((t) => {
                const e = n[Gc]();
                if (se(e.subscribe)) return e.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(n);
          if (qc(n))
            return (function SM(n) {
              return new he((t) => {
                for (let e = 0; e < n.length && !t.closed; e++) t.next(n[e]);
                t.complete();
              });
            })(n);
          if (Kp(n))
            return (function xM(n) {
              return new he((t) => {
                n.then(
                  (e) => {
                    t.closed || (t.next(e), t.complete());
                  },
                  (e) => t.error(e)
                ).then(null, Bp);
              });
            })(n);
          if (Yp(n)) return nm(n);
          if (Jp(n))
            return (function AM(n) {
              return new he((t) => {
                for (const e of n) if ((t.next(e), t.closed)) return;
                t.complete();
              });
            })(n);
          if (tm(n))
            return (function TM(n) {
              return nm(em(n));
            })(n);
        }
        throw Zp(n);
      }
      function nm(n) {
        return new he((t) => {
          (function IM(n, t) {
            var e, i, r, s;
            return (function vM(n, t, e, i) {
              return new (e || (e = Promise))(function (s, o) {
                function a(u) {
                  try {
                    c(i.next(u));
                  } catch (d) {
                    o(d);
                  }
                }
                function l(u) {
                  try {
                    c(i.throw(u));
                  } catch (d) {
                    o(d);
                  }
                }
                function c(u) {
                  u.done
                    ? s(u.value)
                    : (function r(s) {
                        return s instanceof e
                          ? s
                          : new e(function (o) {
                              o(s);
                            });
                      })(u.value).then(a, l);
                }
                c((i = i.apply(n, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (e = wM(n); !(i = yield e.next()).done; )
                  if ((t.next(i.value), t.closed)) return;
              } catch (o) {
                r = { error: o };
              } finally {
                try {
                  i && !i.done && (s = e.return) && (yield s.call(e));
                } finally {
                  if (r) throw r.error;
                }
              }
              t.complete();
            });
          })(n, t).catch((e) => t.error(e));
        });
      }
      function zn(n, t, e, i = 0, r = !1) {
        const s = t.schedule(function () {
          e(), r ? n.add(this.schedule(null, i)) : this.unsubscribe();
        }, i);
        if ((n.add(s), !r)) return s;
      }
      function $e(n, t, e = 1 / 0) {
        return se(t)
          ? $e((i, r) => Q((s, o) => t(i, s, r, o))(xt(n(i, r))), e)
          : ("number" == typeof t && (e = t),
            Pe((i, r) =>
              (function RM(n, t, e, i, r, s, o, a) {
                const l = [];
                let c = 0,
                  u = 0,
                  d = !1;
                const h = () => {
                    d && !l.length && !c && t.complete();
                  },
                  f = (m) => (c < i ? p(m) : l.push(m)),
                  p = (m) => {
                    s && t.next(m), c++;
                    let b = !1;
                    xt(e(m, u++)).subscribe(
                      new Se(
                        t,
                        (w) => {
                          null == r || r(w), s ? f(w) : t.next(w);
                        },
                        () => {
                          b = !0;
                        },
                        void 0,
                        () => {
                          if (b)
                            try {
                              for (c--; l.length && c < i; ) {
                                const w = l.shift();
                                o ? zn(t, o, () => p(w)) : p(w);
                              }
                              h();
                            } catch (w) {
                              t.error(w);
                            }
                        }
                      )
                    );
                  };
                return (
                  n.subscribe(
                    new Se(t, f, () => {
                      (d = !0), h();
                    })
                  ),
                  () => {
                    null == a || a();
                  }
                );
              })(i, r, n, e)
            ));
      }
      function Rs(n = 1 / 0) {
        return $e(ci, n);
      }
      const Sn = new he((n) => n.complete());
      function im(n) {
        return n && se(n.schedule);
      }
      function Kc(n) {
        return n[n.length - 1];
      }
      function rm(n) {
        return se(Kc(n)) ? n.pop() : void 0;
      }
      function ks(n) {
        return im(Kc(n)) ? n.pop() : void 0;
      }
      function sm(n, t = 0) {
        return Pe((e, i) => {
          e.subscribe(
            new Se(
              i,
              (r) => zn(i, n, () => i.next(r), t),
              () => zn(i, n, () => i.complete(), t),
              (r) => zn(i, n, () => i.error(r), t)
            )
          );
        });
      }
      function om(n, t = 0) {
        return Pe((e, i) => {
          i.add(n.schedule(() => e.subscribe(i), t));
        });
      }
      function am(n, t) {
        if (!n) throw new Error("Iterable cannot be null");
        return new he((e) => {
          zn(e, t, () => {
            const i = n[Symbol.asyncIterator]();
            zn(
              e,
              t,
              () => {
                i.next().then((r) => {
                  r.done ? e.complete() : e.next(r.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Ye(n, t) {
        return t
          ? (function BM(n, t) {
              if (null != n) {
                if (Qp(n))
                  return (function FM(n, t) {
                    return xt(n).pipe(om(t), sm(t));
                  })(n, t);
                if (qc(n))
                  return (function NM(n, t) {
                    return new he((e) => {
                      let i = 0;
                      return t.schedule(function () {
                        i === n.length
                          ? e.complete()
                          : (e.next(n[i++]), e.closed || this.schedule());
                      });
                    });
                  })(n, t);
                if (Kp(n))
                  return (function PM(n, t) {
                    return xt(n).pipe(om(t), sm(t));
                  })(n, t);
                if (Yp(n)) return am(n, t);
                if (Jp(n))
                  return (function LM(n, t) {
                    return new he((e) => {
                      let i;
                      return (
                        zn(e, t, () => {
                          (i = n[Xp]()),
                            zn(
                              e,
                              t,
                              () => {
                                let r, s;
                                try {
                                  ({ value: r, done: s } = i.next());
                                } catch (o) {
                                  return void e.error(o);
                                }
                                s ? e.complete() : e.next(r);
                              },
                              0,
                              !0
                            );
                        }),
                        () => se(null == i ? void 0 : i.return) && i.return()
                      );
                    });
                  })(n, t);
                if (tm(n))
                  return (function VM(n, t) {
                    return am(em(n), t);
                  })(n, t);
              }
              throw Zp(n);
            })(n, t)
          : xt(n);
      }
      function ca(...n) {
        const t = ks(n),
          e = (function OM(n, t) {
            return "number" == typeof Kc(n) ? n.pop() : t;
          })(n, 1 / 0),
          i = n;
        return i.length ? (1 === i.length ? xt(i[0]) : Rs(e)(Ye(i, t))) : Sn;
      }
      function ze(n) {
        return n <= 0
          ? () => Sn
          : Pe((t, e) => {
              let i = 0;
              t.subscribe(
                new Se(e, (r) => {
                  ++i <= n && (e.next(r), n <= i && e.complete());
                })
              );
            });
      }
      function lm(n = {}) {
        const {
          connector: t = () => new K(),
          resetOnError: e = !0,
          resetOnComplete: i = !0,
          resetOnRefCountZero: r = !0,
        } = n;
        return (s) => {
          let o = null,
            a = null,
            l = null,
            c = 0,
            u = !1,
            d = !1;
          const h = () => {
              null == a || a.unsubscribe(), (a = null);
            },
            f = () => {
              h(), (o = l = null), (u = d = !1);
            },
            p = () => {
              const m = o;
              f(), null == m || m.unsubscribe();
            };
          return Pe((m, b) => {
            c++, !d && !u && h();
            const w = (l = null != l ? l : t());
            b.add(() => {
              c--, 0 === c && !d && !u && (a = Qc(p, r));
            }),
              w.subscribe(b),
              o ||
                ((o = new Uc({
                  next: (v) => w.next(v),
                  error: (v) => {
                    (d = !0), h(), (a = Qc(f, e, v)), w.error(v);
                  },
                  complete: () => {
                    (u = !0), h(), (a = Qc(f, i)), w.complete();
                  },
                })),
                Ye(m).subscribe(o));
          })(s);
        };
      }
      function Qc(n, t, ...e) {
        return !0 === t
          ? (n(), null)
          : !1 === t
          ? null
          : t(...e)
              .pipe(ze(1))
              .subscribe(() => n());
      }
      function me(n) {
        for (let t in n) if (n[t] === me) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Yc(n, t) {
        for (const e in t)
          t.hasOwnProperty(e) && !n.hasOwnProperty(e) && (n[e] = t[e]);
      }
      function ue(n) {
        if ("string" == typeof n) return n;
        if (Array.isArray(n)) return "[" + n.map(ue).join(", ") + "]";
        if (null == n) return "" + n;
        if (n.overriddenName) return `${n.overriddenName}`;
        if (n.name) return `${n.name}`;
        const t = n.toString();
        if (null == t) return "" + t;
        const e = t.indexOf("\n");
        return -1 === e ? t : t.substring(0, e);
      }
      function Zc(n, t) {
        return null == n || "" === n
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? n
          : n + " " + t;
      }
      const jM = me({ __forward_ref__: me });
      function fe(n) {
        return (
          (n.__forward_ref__ = fe),
          (n.toString = function () {
            return ue(this());
          }),
          n
        );
      }
      function z(n) {
        return cm(n) ? n() : n;
      }
      function cm(n) {
        return (
          "function" == typeof n &&
          n.hasOwnProperty(jM) &&
          n.__forward_ref__ === fe
        );
      }
      class ne extends Error {
        constructor(t, e) {
          super(
            (function Xc(n, t) {
              return `NG0${Math.abs(n)}${t ? ": " + t : ""}`;
            })(t, e)
          ),
            (this.code = t);
        }
      }
      function H(n) {
        return "string" == typeof n ? n : null == n ? "" : String(n);
      }
      function mt(n) {
        return "function" == typeof n
          ? n.name || n.toString()
          : "object" == typeof n && null != n && "function" == typeof n.type
          ? n.type.name || n.type.toString()
          : H(n);
      }
      function ua(n, t) {
        const e = t ? ` in ${t}` : "";
        throw new ne(-201, `No provider for ${mt(n)} found${e}`);
      }
      function Tt(n, t) {
        null == n &&
          (function we(n, t, e, i) {
            throw new Error(
              `ASSERTION ERROR: ${n}` +
                (null == i ? "" : ` [Expected=> ${e} ${i} ${t} <=Actual]`)
            );
          })(t, n, null, "!=");
      }
      function R(n) {
        return {
          token: n.token,
          providedIn: n.providedIn || null,
          factory: n.factory,
          value: void 0,
        };
      }
      function le(n) {
        return { providers: n.providers || [], imports: n.imports || [] };
      }
      function Jc(n) {
        return um(n, da) || um(n, hm);
      }
      function um(n, t) {
        return n.hasOwnProperty(t) ? n[t] : null;
      }
      function dm(n) {
        return n && (n.hasOwnProperty(eu) || n.hasOwnProperty(qM))
          ? n[eu]
          : null;
      }
      const da = me({ ɵprov: me }),
        eu = me({ ɵinj: me }),
        hm = me({ ngInjectableDef: me }),
        qM = me({ ngInjectorDef: me });
      var j = (() => (
        ((j = j || {})[(j.Default = 0)] = "Default"),
        (j[(j.Host = 1)] = "Host"),
        (j[(j.Self = 2)] = "Self"),
        (j[(j.SkipSelf = 4)] = "SkipSelf"),
        (j[(j.Optional = 8)] = "Optional"),
        j
      ))();
      let tu;
      function ui(n) {
        const t = tu;
        return (tu = n), t;
      }
      function fm(n, t, e) {
        const i = Jc(n);
        return i && "root" == i.providedIn
          ? void 0 === i.value
            ? (i.value = i.factory())
            : i.value
          : e & j.Optional
          ? null
          : void 0 !== t
          ? t
          : void ua(ue(n), "Injector");
      }
      function di(n) {
        return { toString: n }.toString();
      }
      var cn = (() => (
          ((cn = cn || {})[(cn.OnPush = 0)] = "OnPush"),
          (cn[(cn.Default = 1)] = "Default"),
          cn
        ))(),
        un = (() => {
          return (
            ((n = un || (un = {}))[(n.Emulated = 0)] = "Emulated"),
            (n[(n.None = 2)] = "None"),
            (n[(n.ShadowDom = 3)] = "ShadowDom"),
            un
          );
          var n;
        })();
      const QM = "undefined" != typeof globalThis && globalThis,
        YM = "undefined" != typeof window && window,
        ZM =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        pe = QM || ("undefined" != typeof global && global) || YM || ZM,
        gr = {},
        ge = [],
        ha = me({ ɵcmp: me }),
        nu = me({ ɵdir: me }),
        iu = me({ ɵpipe: me }),
        pm = me({ ɵmod: me }),
        Wn = me({ ɵfac: me }),
        Os = me({ __NG_ELEMENT_ID__: me });
      let XM = 0;
      function ye(n) {
        return di(() => {
          const e = {},
            i = {
              type: n.type,
              providersResolver: null,
              decls: n.decls,
              vars: n.vars,
              factory: null,
              template: n.template || null,
              consts: n.consts || null,
              ngContentSelectors: n.ngContentSelectors,
              hostBindings: n.hostBindings || null,
              hostVars: n.hostVars || 0,
              hostAttrs: n.hostAttrs || null,
              contentQueries: n.contentQueries || null,
              declaredInputs: e,
              inputs: null,
              outputs: null,
              exportAs: n.exportAs || null,
              onPush: n.changeDetection === cn.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: n.selectors || ge,
              viewQuery: n.viewQuery || null,
              features: n.features || null,
              data: n.data || {},
              encapsulation: n.encapsulation || un.Emulated,
              id: "c",
              styles: n.styles || ge,
              _: null,
              setInput: null,
              schemas: n.schemas || null,
              tView: null,
            },
            r = n.directives,
            s = n.features,
            o = n.pipes;
          return (
            (i.id += XM++),
            (i.inputs = ym(n.inputs, e)),
            (i.outputs = ym(n.outputs)),
            s && s.forEach((a) => a(i)),
            (i.directiveDefs = r
              ? () => ("function" == typeof r ? r() : r).map(mm)
              : null),
            (i.pipeDefs = o
              ? () => ("function" == typeof o ? o() : o).map(gm)
              : null),
            i
          );
        });
      }
      function mm(n) {
        return (
          ct(n) ||
          (function hi(n) {
            return n[nu] || null;
          })(n)
        );
      }
      function gm(n) {
        return (function Vi(n) {
          return n[iu] || null;
        })(n);
      }
      const _m = {};
      function de(n) {
        return di(() => {
          const t = {
            type: n.type,
            bootstrap: n.bootstrap || ge,
            declarations: n.declarations || ge,
            imports: n.imports || ge,
            exports: n.exports || ge,
            transitiveCompileScopes: null,
            schemas: n.schemas || null,
            id: n.id || null,
          };
          return null != n.id && (_m[n.id] = n.type), t;
        });
      }
      function ym(n, t) {
        if (null == n) return gr;
        const e = {};
        for (const i in n)
          if (n.hasOwnProperty(i)) {
            let r = n[i],
              s = r;
            Array.isArray(r) && ((s = r[1]), (r = r[0])),
              (e[r] = i),
              t && (t[r] = s);
          }
        return e;
      }
      const k = ye;
      function ct(n) {
        return n[ha] || null;
      }
      function Kt(n, t) {
        const e = n[pm] || null;
        if (!e && !0 === t)
          throw new Error(`Type ${ue(n)} does not have '\u0275mod' property.`);
        return e;
      }
      const G = 11;
      function xn(n) {
        return Array.isArray(n) && "object" == typeof n[1];
      }
      function hn(n) {
        return Array.isArray(n) && !0 === n[1];
      }
      function ou(n) {
        return 0 != (8 & n.flags);
      }
      function ga(n) {
        return 2 == (2 & n.flags);
      }
      function _a(n) {
        return 1 == (1 & n.flags);
      }
      function fn(n) {
        return null !== n.template;
      }
      function rS(n) {
        return 0 != (512 & n[2]);
      }
      function Ui(n, t) {
        return n.hasOwnProperty(Wn) ? n[Wn] : null;
      }
      class aS {
        constructor(t, e, i) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = i);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function it() {
        return bm;
      }
      function bm(n) {
        return n.type.prototype.ngOnChanges && (n.setInput = cS), lS;
      }
      function lS() {
        const n = wm(this),
          t = null == n ? void 0 : n.current;
        if (t) {
          const e = n.previous;
          if (e === gr) n.previous = t;
          else for (let i in t) e[i] = t[i];
          (n.current = null), this.ngOnChanges(t);
        }
      }
      function cS(n, t, e, i) {
        const r =
            wm(n) ||
            (function uS(n, t) {
              return (n[Cm] = t);
            })(n, { previous: gr, current: null }),
          s = r.current || (r.current = {}),
          o = r.previous,
          a = this.declaredInputs[e],
          l = o[a];
        (s[a] = new aS(l && l.currentValue, t, o === gr)), (n[i] = t);
      }
      it.ngInherit = !0;
      const Cm = "__ngSimpleChanges__";
      function wm(n) {
        return n[Cm] || null;
      }
      let cu;
      function Ie(n) {
        return !!n.listen;
      }
      const Mm = {
        createRenderer: (n, t) =>
          (function uu() {
            return void 0 !== cu
              ? cu
              : "undefined" != typeof document
              ? document
              : void 0;
          })(),
      };
      function Be(n) {
        for (; Array.isArray(n); ) n = n[0];
        return n;
      }
      function Zt(n, t) {
        return Be(t[n.index]);
      }
      function du(n, t) {
        return n.data[t];
      }
      function Rt(n, t) {
        const e = t[n];
        return xn(e) ? e : e[0];
      }
      function Sm(n) {
        return 4 == (4 & n[2]);
      }
      function hu(n) {
        return 128 == (128 & n[2]);
      }
      function fi(n, t) {
        return null == t ? null : n[t];
      }
      function xm(n) {
        n[18] = 0;
      }
      function fu(n, t) {
        n[5] += t;
        let e = n,
          i = n[3];
        for (
          ;
          null !== i && ((1 === t && 1 === e[5]) || (-1 === t && 0 === e[5]));

        )
          (i[5] += t), (e = i), (i = i[3]);
      }
      const B = {
        lFrame: Pm(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function Am() {
        return B.bindingsEnabled;
      }
      function D() {
        return B.lFrame.lView;
      }
      function ie() {
        return B.lFrame.tView;
      }
      function va(n) {
        return (B.lFrame.contextLView = n), n[8];
      }
      function Ge() {
        let n = Tm();
        for (; null !== n && 64 === n.type; ) n = n.parent;
        return n;
      }
      function Tm() {
        return B.lFrame.currentTNode;
      }
      function An(n, t) {
        const e = B.lFrame;
        (e.currentTNode = n), (e.isParent = t);
      }
      function pu() {
        return B.lFrame.isParent;
      }
      function mu() {
        B.lFrame.isParent = !1;
      }
      function ba() {
        return B.isInCheckNoChangesMode;
      }
      function Ca(n) {
        B.isInCheckNoChangesMode = n;
      }
      function wr() {
        return B.lFrame.bindingIndex++;
      }
      function ES(n, t) {
        const e = B.lFrame;
        (e.bindingIndex = e.bindingRootIndex = n), gu(t);
      }
      function gu(n) {
        B.lFrame.currentDirectiveIndex = n;
      }
      function _u(n) {
        const t = B.lFrame.currentDirectiveIndex;
        return -1 === t ? null : n[t];
      }
      function km() {
        return B.lFrame.currentQueryIndex;
      }
      function yu(n) {
        B.lFrame.currentQueryIndex = n;
      }
      function SS(n) {
        const t = n[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? n[6] : null;
      }
      function Om(n, t, e) {
        if (e & j.SkipSelf) {
          let r = t,
            s = n;
          for (
            ;
            !((r = r.parent),
            null !== r ||
              e & j.Host ||
              ((r = SS(s)), null === r || ((s = s[15]), 10 & r.type)));

          );
          if (null === r) return !1;
          (t = r), (n = s);
        }
        const i = (B.lFrame = Fm());
        return (i.currentTNode = t), (i.lView = n), !0;
      }
      function wa(n) {
        const t = Fm(),
          e = n[1];
        (B.lFrame = t),
          (t.currentTNode = e.firstChild),
          (t.lView = n),
          (t.tView = e),
          (t.contextLView = n),
          (t.bindingIndex = e.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Fm() {
        const n = B.lFrame,
          t = null === n ? null : n.child;
        return null === t ? Pm(n) : t;
      }
      function Pm(n) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: n,
          child: null,
          inI18n: !1,
        };
        return null !== n && (n.child = t), t;
      }
      function Nm() {
        const n = B.lFrame;
        return (
          (B.lFrame = n.parent), (n.currentTNode = null), (n.lView = null), n
        );
      }
      const Lm = Nm;
      function Da() {
        const n = Nm();
        (n.isParent = !0),
          (n.tView = null),
          (n.selectedIndex = -1),
          (n.contextLView = null),
          (n.elementDepthCount = 0),
          (n.currentDirectiveIndex = -1),
          (n.currentNamespace = null),
          (n.bindingRootIndex = -1),
          (n.bindingIndex = -1),
          (n.currentQueryIndex = 0);
      }
      function _t() {
        return B.lFrame.selectedIndex;
      }
      function pi(n) {
        B.lFrame.selectedIndex = n;
      }
      function Re() {
        const n = B.lFrame;
        return du(n.tView, n.selectedIndex);
      }
      function Ea(n, t) {
        for (let e = t.directiveStart, i = t.directiveEnd; e < i; e++) {
          const s = n.data[e].type.prototype,
            {
              ngAfterContentInit: o,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: u,
            } = s;
          o && (n.contentHooks || (n.contentHooks = [])).push(-e, o),
            a &&
              ((n.contentHooks || (n.contentHooks = [])).push(e, a),
              (n.contentCheckHooks || (n.contentCheckHooks = [])).push(e, a)),
            l && (n.viewHooks || (n.viewHooks = [])).push(-e, l),
            c &&
              ((n.viewHooks || (n.viewHooks = [])).push(e, c),
              (n.viewCheckHooks || (n.viewCheckHooks = [])).push(e, c)),
            null != u && (n.destroyHooks || (n.destroyHooks = [])).push(e, u);
        }
      }
      function Ma(n, t, e) {
        Vm(n, t, 3, e);
      }
      function Sa(n, t, e, i) {
        (3 & n[2]) === e && Vm(n, t, e, i);
      }
      function vu(n, t) {
        let e = n[2];
        (3 & e) === t && ((e &= 2047), (e += 1), (n[2] = e));
      }
      function Vm(n, t, e, i) {
        const s = null != i ? i : -1,
          o = t.length - 1;
        let a = 0;
        for (let l = void 0 !== i ? 65535 & n[18] : 0; l < o; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != i && a >= i)) break;
          } else
            t[l] < 0 && (n[18] += 65536),
              (a < s || -1 == s) &&
                (PS(n, e, t, l), (n[18] = (4294901760 & n[18]) + l + 2)),
              l++;
      }
      function PS(n, t, e, i) {
        const r = e[i] < 0,
          s = e[i + 1],
          a = n[r ? -e[i] : e[i]];
        if (r) {
          if (n[2] >> 11 < n[18] >> 16 && (3 & n[2]) === t) {
            n[2] += 2048;
            try {
              s.call(a);
            } finally {
            }
          }
        } else
          try {
            s.call(a);
          } finally {
          }
      }
      class Vs {
        constructor(t, e, i) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = i);
        }
      }
      function xa(n, t, e) {
        const i = Ie(n);
        let r = 0;
        for (; r < e.length; ) {
          const s = e[r];
          if ("number" == typeof s) {
            if (0 !== s) break;
            r++;
            const o = e[r++],
              a = e[r++],
              l = e[r++];
            i ? n.setAttribute(t, a, l, o) : t.setAttributeNS(o, a, l);
          } else {
            const o = s,
              a = e[++r];
            Cu(o)
              ? i && n.setProperty(t, o, a)
              : i
              ? n.setAttribute(t, o, a)
              : t.setAttribute(o, a),
              r++;
          }
        }
        return r;
      }
      function Bm(n) {
        return 3 === n || 4 === n || 6 === n;
      }
      function Cu(n) {
        return 64 === n.charCodeAt(0);
      }
      function Aa(n, t) {
        if (null !== t && 0 !== t.length)
          if (null === n || 0 === n.length) n = t.slice();
          else {
            let e = -1;
            for (let i = 0; i < t.length; i++) {
              const r = t[i];
              "number" == typeof r
                ? (e = r)
                : 0 === e ||
                  jm(n, e, r, null, -1 === e || 2 === e ? t[++i] : null);
            }
          }
        return n;
      }
      function jm(n, t, e, i, r) {
        let s = 0,
          o = n.length;
        if (-1 === t) o = -1;
        else
          for (; s < n.length; ) {
            const a = n[s++];
            if ("number" == typeof a) {
              if (a === t) {
                o = -1;
                break;
              }
              if (a > t) {
                o = s - 1;
                break;
              }
            }
          }
        for (; s < n.length; ) {
          const a = n[s];
          if ("number" == typeof a) break;
          if (a === e) {
            if (null === i) return void (null !== r && (n[s + 1] = r));
            if (i === n[s + 1]) return void (n[s + 2] = r);
          }
          s++, null !== i && s++, null !== r && s++;
        }
        -1 !== o && (n.splice(o, 0, t), (s = o + 1)),
          n.splice(s++, 0, e),
          null !== i && n.splice(s++, 0, i),
          null !== r && n.splice(s++, 0, r);
      }
      function Hm(n) {
        return -1 !== n;
      }
      function Dr(n) {
        return 32767 & n;
      }
      function Er(n, t) {
        let e = (function jS(n) {
            return n >> 16;
          })(n),
          i = t;
        for (; e > 0; ) (i = i[15]), e--;
        return i;
      }
      let wu = !0;
      function Ta(n) {
        const t = wu;
        return (wu = n), t;
      }
      let HS = 0;
      function js(n, t) {
        const e = Eu(n, t);
        if (-1 !== e) return e;
        const i = t[1];
        i.firstCreatePass &&
          ((n.injectorIndex = t.length),
          Du(i.data, n),
          Du(t, null),
          Du(i.blueprint, null));
        const r = Ia(n, t),
          s = n.injectorIndex;
        if (Hm(r)) {
          const o = Dr(r),
            a = Er(r, t),
            l = a[1].data;
          for (let c = 0; c < 8; c++) t[s + c] = a[o + c] | l[o + c];
        }
        return (t[s + 8] = r), s;
      }
      function Du(n, t) {
        n.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Eu(n, t) {
        return -1 === n.injectorIndex ||
          (n.parent && n.parent.injectorIndex === n.injectorIndex) ||
          null === t[n.injectorIndex + 8]
          ? -1
          : n.injectorIndex;
      }
      function Ia(n, t) {
        if (n.parent && -1 !== n.parent.injectorIndex)
          return n.parent.injectorIndex;
        let e = 0,
          i = null,
          r = t;
        for (; null !== r; ) {
          const s = r[1],
            o = s.type;
          if (((i = 2 === o ? s.declTNode : 1 === o ? r[6] : null), null === i))
            return -1;
          if ((e++, (r = r[15]), -1 !== i.injectorIndex))
            return i.injectorIndex | (e << 16);
        }
        return -1;
      }
      function Ra(n, t, e) {
        !(function US(n, t, e) {
          let i;
          "string" == typeof e
            ? (i = e.charCodeAt(0) || 0)
            : e.hasOwnProperty(Os) && (i = e[Os]),
            null == i && (i = e[Os] = HS++);
          const r = 255 & i;
          t.data[n + (r >> 5)] |= 1 << r;
        })(n, t, e);
      }
      function zm(n, t, e) {
        if (e & j.Optional) return n;
        ua(t, "NodeInjector");
      }
      function Gm(n, t, e, i) {
        if (
          (e & j.Optional && void 0 === i && (i = null),
          0 == (e & (j.Self | j.Host)))
        ) {
          const r = n[9],
            s = ui(void 0);
          try {
            return r ? r.get(t, i, e & j.Optional) : fm(t, i, e & j.Optional);
          } finally {
            ui(s);
          }
        }
        return zm(i, t, e);
      }
      function Wm(n, t, e, i = j.Default, r) {
        if (null !== n) {
          const s = (function WS(n) {
            if ("string" == typeof n) return n.charCodeAt(0) || 0;
            const t = n.hasOwnProperty(Os) ? n[Os] : void 0;
            return "number" == typeof t ? (t >= 0 ? 255 & t : zS) : t;
          })(e);
          if ("function" == typeof s) {
            if (!Om(t, n, i)) return i & j.Host ? zm(r, e, i) : Gm(t, e, i, r);
            try {
              const o = s(i);
              if (null != o || i & j.Optional) return o;
              ua(e);
            } finally {
              Lm();
            }
          } else if ("number" == typeof s) {
            let o = null,
              a = Eu(n, t),
              l = -1,
              c = i & j.Host ? t[16][6] : null;
            for (
              (-1 === a || i & j.SkipSelf) &&
              ((l = -1 === a ? Ia(n, t) : t[a + 8]),
              -1 !== l && Qm(i, !1)
                ? ((o = t[1]), (a = Dr(l)), (t = Er(l, t)))
                : (a = -1));
              -1 !== a;

            ) {
              const u = t[1];
              if (Km(s, a, u.data)) {
                const d = GS(a, t, e, o, i, c);
                if (d !== qm) return d;
              }
              (l = t[a + 8]),
                -1 !== l && Qm(i, t[1].data[a + 8] === c) && Km(s, a, t)
                  ? ((o = u), (a = Dr(l)), (t = Er(l, t)))
                  : (a = -1);
            }
          }
        }
        return Gm(t, e, i, r);
      }
      const qm = {};
      function zS() {
        return new Mr(Ge(), D());
      }
      function GS(n, t, e, i, r, s) {
        const o = t[1],
          a = o.data[n + 8],
          u = ka(
            a,
            o,
            e,
            null == i ? ga(a) && wu : i != o && 0 != (3 & a.type),
            r & j.Host && s === a
          );
        return null !== u ? Hs(t, o, u, a) : qm;
      }
      function ka(n, t, e, i, r) {
        const s = n.providerIndexes,
          o = t.data,
          a = 1048575 & s,
          l = n.directiveStart,
          u = s >> 20,
          h = r ? a + u : n.directiveEnd;
        for (let f = i ? a : a + u; f < h; f++) {
          const p = o[f];
          if ((f < l && e === p) || (f >= l && p.type === e)) return f;
        }
        if (r) {
          const f = o[l];
          if (f && fn(f) && f.type === e) return l;
        }
        return null;
      }
      function Hs(n, t, e, i) {
        let r = n[e];
        const s = t.data;
        if (
          (function NS(n) {
            return n instanceof Vs;
          })(r)
        ) {
          const o = r;
          o.resolving &&
            (function HM(n, t) {
              const e = t ? `. Dependency path: ${t.join(" > ")} > ${n}` : "";
              throw new ne(
                -200,
                `Circular dependency in DI detected for ${n}${e}`
              );
            })(mt(s[e]));
          const a = Ta(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? ui(o.injectImpl) : null;
          Om(n, i, j.Default);
          try {
            (r = n[e] = o.factory(void 0, s, n, i)),
              t.firstCreatePass &&
                e >= i.directiveStart &&
                (function FS(n, t, e) {
                  const {
                    ngOnChanges: i,
                    ngOnInit: r,
                    ngDoCheck: s,
                  } = t.type.prototype;
                  if (i) {
                    const o = bm(t);
                    (e.preOrderHooks || (e.preOrderHooks = [])).push(n, o),
                      (
                        e.preOrderCheckHooks || (e.preOrderCheckHooks = [])
                      ).push(n, o);
                  }
                  r &&
                    (e.preOrderHooks || (e.preOrderHooks = [])).push(0 - n, r),
                    s &&
                      ((e.preOrderHooks || (e.preOrderHooks = [])).push(n, s),
                      (
                        e.preOrderCheckHooks || (e.preOrderCheckHooks = [])
                      ).push(n, s));
                })(e, s[e], t);
          } finally {
            null !== l && ui(l), Ta(a), (o.resolving = !1), Lm();
          }
        }
        return r;
      }
      function Km(n, t, e) {
        return !!(e[t + (n >> 5)] & (1 << n));
      }
      function Qm(n, t) {
        return !(n & j.Self || (n & j.Host && t));
      }
      class Mr {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e, i) {
          return Wm(this._tNode, this._lView, t, i, e);
        }
      }
      function rt(n) {
        return di(() => {
          const t = n.prototype.constructor,
            e = t[Wn] || Mu(t),
            i = Object.prototype;
          let r = Object.getPrototypeOf(n.prototype).constructor;
          for (; r && r !== i; ) {
            const s = r[Wn] || Mu(r);
            if (s && s !== e) return s;
            r = Object.getPrototypeOf(r);
          }
          return (s) => new s();
        });
      }
      function Mu(n) {
        return cm(n)
          ? () => {
              const t = Mu(z(n));
              return t && t();
            }
          : Ui(n);
      }
      function gi(n) {
        return (function $S(n, t) {
          if ("class" === t) return n.classes;
          if ("style" === t) return n.styles;
          const e = n.attrs;
          if (e) {
            const i = e.length;
            let r = 0;
            for (; r < i; ) {
              const s = e[r];
              if (Bm(s)) break;
              if (0 === s) r += 2;
              else if ("number" == typeof s)
                for (r++; r < i && "string" == typeof e[r]; ) r++;
              else {
                if (s === t) return e[r + 1];
                r += 2;
              }
            }
          }
          return null;
        })(Ge(), n);
      }
      const xr = "__parameters__";
      function Tr(n, t, e) {
        return di(() => {
          const i = (function Su(n) {
            return function (...e) {
              if (n) {
                const i = n(...e);
                for (const r in i) this[r] = i[r];
              }
            };
          })(t);
          function r(...s) {
            if (this instanceof r) return i.apply(this, s), this;
            const o = new r(...s);
            return (a.annotation = o), a;
            function a(l, c, u) {
              const d = l.hasOwnProperty(xr)
                ? l[xr]
                : Object.defineProperty(l, xr, { value: [] })[xr];
              for (; d.length <= u; ) d.push(null);
              return (d[u] = d[u] || []).push(o), l;
            }
          }
          return (
            e && (r.prototype = Object.create(e.prototype)),
            (r.prototype.ngMetadataName = n),
            (r.annotationCls = r),
            r
          );
        });
      }
      class A {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = R({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const KS = new A("AnalyzeForEntryComponents");
      function Xt(n, t) {
        void 0 === t && (t = n);
        for (let e = 0; e < n.length; e++) {
          let i = n[e];
          Array.isArray(i)
            ? (t === n && (t = n.slice(0, e)), Xt(i, t))
            : t !== n && t.push(i);
        }
        return t;
      }
      function Tn(n, t) {
        n.forEach((e) => (Array.isArray(e) ? Tn(e, t) : t(e)));
      }
      function Zm(n, t, e) {
        t >= n.length ? n.push(e) : n.splice(t, 0, e);
      }
      function Oa(n, t) {
        return t >= n.length - 1 ? n.pop() : n.splice(t, 1)[0];
      }
      function zs(n, t) {
        const e = [];
        for (let i = 0; i < n; i++) e.push(t);
        return e;
      }
      function kt(n, t, e) {
        let i = Ir(n, t);
        return (
          i >= 0
            ? (n[1 | i] = e)
            : ((i = ~i),
              (function ZS(n, t, e, i) {
                let r = n.length;
                if (r == t) n.push(e, i);
                else if (1 === r) n.push(i, n[0]), (n[0] = e);
                else {
                  for (r--, n.push(n[r - 1], n[r]); r > t; )
                    (n[r] = n[r - 2]), r--;
                  (n[t] = e), (n[t + 1] = i);
                }
              })(n, i, t, e)),
          i
        );
      }
      function Au(n, t) {
        const e = Ir(n, t);
        if (e >= 0) return n[1 | e];
      }
      function Ir(n, t) {
        return (function eg(n, t, e) {
          let i = 0,
            r = n.length >> e;
          for (; r !== i; ) {
            const s = i + ((r - i) >> 1),
              o = n[s << e];
            if (t === o) return s << e;
            o > t ? (r = s) : (i = s + 1);
          }
          return ~(r << e);
        })(n, t, 1);
      }
      const Gs = {},
        Iu = "__NG_DI_FLAG__",
        Pa = "ngTempTokenPath",
        rx = /\n/gm,
        ng = "__source",
        ox = me({ provide: String, useValue: me });
      let Ws;
      function ig(n) {
        const t = Ws;
        return (Ws = n), t;
      }
      function ax(n, t = j.Default) {
        if (void 0 === Ws) throw new ne(203, "");
        return null === Ws
          ? fm(n, void 0, t)
          : Ws.get(n, t & j.Optional ? null : void 0, t);
      }
      function C(n, t = j.Default) {
        return (
          (function KM() {
            return tu;
          })() || ax
        )(z(n), t);
      }
      const Ru = C;
      function ku(n) {
        const t = [];
        for (let e = 0; e < n.length; e++) {
          const i = z(n[e]);
          if (Array.isArray(i)) {
            if (0 === i.length) throw new ne(900, "");
            let r,
              s = j.Default;
            for (let o = 0; o < i.length; o++) {
              const a = i[o],
                l = lx(a);
              "number" == typeof l
                ? -1 === l
                  ? (r = a.token)
                  : (s |= l)
                : (r = a);
            }
            t.push(C(r, s));
          } else t.push(C(i));
        }
        return t;
      }
      function qs(n, t) {
        return (n[Iu] = t), (n.prototype[Iu] = t), n;
      }
      function lx(n) {
        return n[Iu];
      }
      const Ks = qs(
          Tr("Inject", (n) => ({ token: n })),
          -1
        ),
        Ot = qs(Tr("Optional"), 8),
        $i = qs(Tr("SkipSelf"), 4);
      let La;
      function kr(n) {
        var t;
        return (
          (null ===
            (t = (function Fu() {
              if (void 0 === La && ((La = null), pe.trustedTypes))
                try {
                  La = pe.trustedTypes.createPolicy("angular", {
                    createHTML: (n) => n,
                    createScript: (n) => n,
                    createScriptURL: (n) => n,
                  });
                } catch (n) {}
              return La;
            })()) || void 0 === t
            ? void 0
            : t.createHTML(n)) || n
        );
      }
      class zi {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      class Cx extends zi {
        getTypeName() {
          return "HTML";
        }
      }
      class wx extends zi {
        getTypeName() {
          return "Style";
        }
      }
      class Dx extends zi {
        getTypeName() {
          return "Script";
        }
      }
      class Ex extends zi {
        getTypeName() {
          return "URL";
        }
      }
      class Mx extends zi {
        getTypeName() {
          return "ResourceURL";
        }
      }
      function Ft(n) {
        return n instanceof zi ? n.changingThisBreaksApplicationSecurity : n;
      }
      function In(n, t) {
        const e = hg(n);
        if (null != e && e !== t) {
          if ("ResourceURL" === e && "URL" === t) return !0;
          throw new Error(
            `Required a safe ${t}, got a ${e} (see https://g.co/ng/security#xss)`
          );
        }
        return e === t;
      }
      function hg(n) {
        return (n instanceof zi && n.getTypeName()) || null;
      }
      class Rx {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = "<body><remove></remove>" + t;
          try {
            const e = new window.DOMParser().parseFromString(
              kr(t),
              "text/html"
            ).body;
            return null === e
              ? this.inertDocumentHelper.getInertBodyElement(t)
              : (e.removeChild(e.firstChild), e);
          } catch (e) {
            return null;
          }
        }
      }
      class kx {
        constructor(t) {
          if (
            ((this.defaultDoc = t),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                "sanitization-inert"
              )),
            null == this.inertDocument.body)
          ) {
            const e = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(e);
            const i = this.inertDocument.createElement("body");
            e.appendChild(i);
          }
        }
        getInertBodyElement(t) {
          const e = this.inertDocument.createElement("template");
          if ("content" in e) return (e.innerHTML = kr(t)), e;
          const i = this.inertDocument.createElement("body");
          return (
            (i.innerHTML = kr(t)),
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(i),
            i
          );
        }
        stripCustomNsAttrs(t) {
          const e = t.attributes;
          for (let r = e.length - 1; 0 < r; r--) {
            const o = e.item(r).name;
            ("xmlns:ns1" === o || 0 === o.indexOf("ns1:")) &&
              t.removeAttribute(o);
          }
          let i = t.firstChild;
          for (; i; )
            i.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(i),
              (i = i.nextSibling);
        }
      }
      const Fx =
          /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        Px =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function Ys(n) {
        return (n = String(n)).match(Fx) || n.match(Px) ? n : "unsafe:" + n;
      }
      function Rn(n) {
        const t = {};
        for (const e of n.split(",")) t[e] = !0;
        return t;
      }
      function Zs(...n) {
        const t = {};
        for (const e of n)
          for (const i in e) e.hasOwnProperty(i) && (t[i] = !0);
        return t;
      }
      const mg = Rn("area,br,col,hr,img,wbr"),
        gg = Rn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        _g = Rn("rp,rt"),
        Nu = Zs(
          mg,
          Zs(
            gg,
            Rn(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          Zs(
            _g,
            Rn(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          Zs(_g, gg)
        ),
        Lu = Rn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        Vu = Rn("srcset"),
        yg = Zs(
          Lu,
          Vu,
          Rn(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          Rn(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        Nx = Rn("script,style,template");
      class Lx {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let e = t.firstChild,
            i = !0;
          for (; e; )
            if (
              (e.nodeType === Node.ELEMENT_NODE
                ? (i = this.startElement(e))
                : e.nodeType === Node.TEXT_NODE
                ? this.chars(e.nodeValue)
                : (this.sanitizedSomething = !0),
              i && e.firstChild)
            )
              e = e.firstChild;
            else
              for (; e; ) {
                e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                let r = this.checkClobberedElement(e, e.nextSibling);
                if (r) {
                  e = r;
                  break;
                }
                e = this.checkClobberedElement(e, e.parentNode);
              }
          return this.buf.join("");
        }
        startElement(t) {
          const e = t.nodeName.toLowerCase();
          if (!Nu.hasOwnProperty(e))
            return (this.sanitizedSomething = !0), !Nx.hasOwnProperty(e);
          this.buf.push("<"), this.buf.push(e);
          const i = t.attributes;
          for (let r = 0; r < i.length; r++) {
            const s = i.item(r),
              o = s.name,
              a = o.toLowerCase();
            if (!yg.hasOwnProperty(a)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let l = s.value;
            Lu[a] && (l = Ys(l)),
              Vu[a] &&
                ((n = l),
                (l = (n = String(n))
                  .split(",")
                  .map((t) => Ys(t.trim()))
                  .join(", "))),
              this.buf.push(" ", o, '="', vg(l), '"');
          }
          var n;
          return this.buf.push(">"), !0;
        }
        endElement(t) {
          const e = t.nodeName.toLowerCase();
          Nu.hasOwnProperty(e) &&
            !mg.hasOwnProperty(e) &&
            (this.buf.push("</"), this.buf.push(e), this.buf.push(">"));
        }
        chars(t) {
          this.buf.push(vg(t));
        }
        checkClobberedElement(t, e) {
          if (
            e &&
            (t.compareDocumentPosition(e) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            );
          return e;
        }
      }
      const Vx = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        Bx = /([^\#-~ |!])/g;
      function vg(n) {
        return n
          .replace(/&/g, "&amp;")
          .replace(Vx, function (t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(Bx, function (t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let Ba;
      function bg(n, t) {
        let e = null;
        try {
          Ba =
            Ba ||
            (function fg(n) {
              const t = new kx(n);
              return (function Ox() {
                try {
                  return !!new window.DOMParser().parseFromString(
                    kr(""),
                    "text/html"
                  );
                } catch (n) {
                  return !1;
                }
              })()
                ? new Rx(t)
                : t;
            })(n);
          let i = t ? String(t) : "";
          e = Ba.getInertBodyElement(i);
          let r = 5,
            s = i;
          do {
            if (0 === r)
              throw new Error(
                "Failed to sanitize html because the input is unstable"
              );
            r--, (i = s), (s = e.innerHTML), (e = Ba.getInertBodyElement(i));
          } while (i !== s);
          return kr(new Lx().sanitizeChildren(Bu(e) || e));
        } finally {
          if (e) {
            const i = Bu(e) || e;
            for (; i.firstChild; ) i.removeChild(i.firstChild);
          }
        }
      }
      function Bu(n) {
        return "content" in n &&
          (function jx(n) {
            return (
              n.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === n.nodeName
            );
          })(n)
          ? n.content
          : null;
      }
      var ae = (() => (
        ((ae = ae || {})[(ae.NONE = 0)] = "NONE"),
        (ae[(ae.HTML = 1)] = "HTML"),
        (ae[(ae.STYLE = 2)] = "STYLE"),
        (ae[(ae.SCRIPT = 3)] = "SCRIPT"),
        (ae[(ae.URL = 4)] = "URL"),
        (ae[(ae.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        ae
      ))();
      function ju(n) {
        const t = (function Xs() {
          const n = D();
          return n && n[12];
        })();
        return t
          ? t.sanitize(ae.URL, n) || ""
          : In(n, "URL")
          ? Ft(n)
          : Ys(H(n));
      }
      const Dg = "__ngContext__";
      function dt(n, t) {
        n[Dg] = t;
      }
      function Uu(n) {
        const t = (function Js(n) {
          return n[Dg] || null;
        })(n);
        return t ? (Array.isArray(t) ? t : t.lView) : null;
      }
      function zu(n) {
        return n.ngOriginalError;
      }
      function iA(n, ...t) {
        n.error(...t);
      }
      class Qn {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            i = (function nA(n) {
              return (n && n.ngErrorLogger) || iA;
            })(t);
          i(this._console, "ERROR", t),
            e && i(this._console, "ORIGINAL ERROR", e);
        }
        _findOriginalError(t) {
          let e = t && zu(t);
          for (; e && zu(e); ) e = zu(e);
          return e || null;
        }
      }
      const Ag = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(pe))();
      function kn(n) {
        return n instanceof Function ? n() : n;
      }
      var Pt = (() => (
        ((Pt = Pt || {})[(Pt.Important = 1)] = "Important"),
        (Pt[(Pt.DashCase = 2)] = "DashCase"),
        Pt
      ))();
      function Wu(n, t) {
        return undefined(n, t);
      }
      function eo(n) {
        const t = n[3];
        return hn(t) ? t[3] : t;
      }
      function qu(n) {
        return Og(n[13]);
      }
      function Ku(n) {
        return Og(n[4]);
      }
      function Og(n) {
        for (; null !== n && !hn(n); ) n = n[4];
        return n;
      }
      function Fr(n, t, e, i, r) {
        if (null != i) {
          let s,
            o = !1;
          hn(i) ? (s = i) : xn(i) && ((o = !0), (i = i[0]));
          const a = Be(i);
          0 === n && null !== e
            ? null == r
              ? Bg(t, e, a)
              : Gi(t, e, a, r || null, !0)
            : 1 === n && null !== e
            ? Gi(t, e, a, r || null, !0)
            : 2 === n
            ? (function Wg(n, t, e) {
                const i = ja(n, t);
                i &&
                  (function SA(n, t, e, i) {
                    Ie(n) ? n.removeChild(t, e, i) : t.removeChild(e);
                  })(n, i, t, e);
              })(t, a, o)
            : 3 === n && t.destroyNode(a),
            null != s &&
              (function TA(n, t, e, i, r) {
                const s = e[7];
                s !== Be(e) && Fr(t, n, i, s, r);
                for (let a = 10; a < e.length; a++) {
                  const l = e[a];
                  to(l[1], l, n, t, i, s);
                }
              })(t, n, s, e, r);
        }
      }
      function Yu(n, t, e) {
        return Ie(n)
          ? n.createElement(t, e)
          : null === e
          ? n.createElement(t)
          : n.createElementNS(e, t);
      }
      function Pg(n, t) {
        const e = n[9],
          i = e.indexOf(t),
          r = t[3];
        1024 & t[2] && ((t[2] &= -1025), fu(r, -1)), e.splice(i, 1);
      }
      function Zu(n, t) {
        if (n.length <= 10) return;
        const e = 10 + t,
          i = n[e];
        if (i) {
          const r = i[17];
          null !== r && r !== n && Pg(r, i), t > 0 && (n[e - 1][4] = i[4]);
          const s = Oa(n, 10 + t);
          !(function yA(n, t) {
            to(n, t, t[G], 2, null, null), (t[0] = null), (t[6] = null);
          })(i[1], i);
          const o = s[19];
          null !== o && o.detachView(s[1]),
            (i[3] = null),
            (i[4] = null),
            (i[2] &= -129);
        }
        return i;
      }
      function Ng(n, t) {
        if (!(256 & t[2])) {
          const e = t[G];
          Ie(e) && e.destroyNode && to(n, t, e, 3, null, null),
            (function CA(n) {
              let t = n[13];
              if (!t) return Xu(n[1], n);
              for (; t; ) {
                let e = null;
                if (xn(t)) e = t[13];
                else {
                  const i = t[10];
                  i && (e = i);
                }
                if (!e) {
                  for (; t && !t[4] && t !== n; )
                    xn(t) && Xu(t[1], t), (t = t[3]);
                  null === t && (t = n), xn(t) && Xu(t[1], t), (e = t && t[4]);
                }
                t = e;
              }
            })(t);
        }
      }
      function Xu(n, t) {
        if (!(256 & t[2])) {
          (t[2] &= -129),
            (t[2] |= 256),
            (function MA(n, t) {
              let e;
              if (null != n && null != (e = n.destroyHooks))
                for (let i = 0; i < e.length; i += 2) {
                  const r = t[e[i]];
                  if (!(r instanceof Vs)) {
                    const s = e[i + 1];
                    if (Array.isArray(s))
                      for (let o = 0; o < s.length; o += 2) {
                        const a = r[s[o]],
                          l = s[o + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        s.call(r);
                      } finally {
                      }
                  }
                }
            })(n, t),
            (function EA(n, t) {
              const e = n.cleanup,
                i = t[7];
              let r = -1;
              if (null !== e)
                for (let s = 0; s < e.length - 1; s += 2)
                  if ("string" == typeof e[s]) {
                    const o = e[s + 1],
                      a = "function" == typeof o ? o(t) : Be(t[o]),
                      l = i[(r = e[s + 2])],
                      c = e[s + 3];
                    "boolean" == typeof c
                      ? a.removeEventListener(e[s], l, c)
                      : c >= 0
                      ? i[(r = c)]()
                      : i[(r = -c)].unsubscribe(),
                      (s += 2);
                  } else {
                    const o = i[(r = e[s + 1])];
                    e[s].call(o);
                  }
              if (null !== i) {
                for (let s = r + 1; s < i.length; s++) i[s]();
                t[7] = null;
              }
            })(n, t),
            1 === t[1].type && Ie(t[G]) && t[G].destroy();
          const e = t[17];
          if (null !== e && hn(t[3])) {
            e !== t[3] && Pg(e, t);
            const i = t[19];
            null !== i && i.detachView(n);
          }
        }
      }
      function Lg(n, t, e) {
        return (function Vg(n, t, e) {
          let i = t;
          for (; null !== i && 40 & i.type; ) i = (t = i).parent;
          if (null === i) return e[0];
          if (2 & i.flags) {
            const r = n.data[i.directiveStart].encapsulation;
            if (r === un.None || r === un.Emulated) return null;
          }
          return Zt(i, e);
        })(n, t.parent, e);
      }
      function Gi(n, t, e, i, r) {
        Ie(n) ? n.insertBefore(t, e, i, r) : t.insertBefore(e, i, r);
      }
      function Bg(n, t, e) {
        Ie(n) ? n.appendChild(t, e) : t.appendChild(e);
      }
      function jg(n, t, e, i, r) {
        null !== i ? Gi(n, t, e, i, r) : Bg(n, t, e);
      }
      function ja(n, t) {
        return Ie(n) ? n.parentNode(t) : t.parentNode;
      }
      function Hg(n, t, e) {
        return $g(n, t, e);
      }
      let $g = function Ug(n, t, e) {
        return 40 & n.type ? Zt(n, e) : null;
      };
      function Ha(n, t, e, i) {
        const r = Lg(n, i, t),
          s = t[G],
          a = Hg(i.parent || t[6], i, t);
        if (null != r)
          if (Array.isArray(e))
            for (let l = 0; l < e.length; l++) jg(s, r, e[l], a, !1);
          else jg(s, r, e, a, !1);
      }
      function Ua(n, t) {
        if (null !== t) {
          const e = t.type;
          if (3 & e) return Zt(t, n);
          if (4 & e) return ed(-1, n[t.index]);
          if (8 & e) {
            const i = t.child;
            if (null !== i) return Ua(n, i);
            {
              const r = n[t.index];
              return hn(r) ? ed(-1, r) : Be(r);
            }
          }
          if (32 & e) return Wu(t, n)() || Be(n[t.index]);
          {
            const i = Gg(n, t);
            return null !== i
              ? Array.isArray(i)
                ? i[0]
                : Ua(eo(n[16]), i)
              : Ua(n, t.next);
          }
        }
        return null;
      }
      function Gg(n, t) {
        return null !== t ? n[16][6].projection[t.projection] : null;
      }
      function ed(n, t) {
        const e = 10 + n + 1;
        if (e < t.length) {
          const i = t[e],
            r = i[1].firstChild;
          if (null !== r) return Ua(i, r);
        }
        return t[7];
      }
      function td(n, t, e, i, r, s, o) {
        for (; null != e; ) {
          const a = i[e.index],
            l = e.type;
          if (
            (o && 0 === t && (a && dt(Be(a), i), (e.flags |= 4)),
            64 != (64 & e.flags))
          )
            if (8 & l) td(n, t, e.child, i, r, s, !1), Fr(t, n, r, a, s);
            else if (32 & l) {
              const c = Wu(e, i);
              let u;
              for (; (u = c()); ) Fr(t, n, r, u, s);
              Fr(t, n, r, a, s);
            } else 16 & l ? qg(n, t, i, e, r, s) : Fr(t, n, r, a, s);
          e = o ? e.projectionNext : e.next;
        }
      }
      function to(n, t, e, i, r, s) {
        td(e, i, n.firstChild, t, r, s, !1);
      }
      function qg(n, t, e, i, r, s) {
        const o = e[16],
          l = o[6].projection[i.projection];
        if (Array.isArray(l))
          for (let c = 0; c < l.length; c++) Fr(t, n, r, l[c], s);
        else td(n, t, l, o[3], r, s, !0);
      }
      function Kg(n, t, e) {
        Ie(n) ? n.setAttribute(t, "style", e) : (t.style.cssText = e);
      }
      function nd(n, t, e) {
        Ie(n)
          ? "" === e
            ? n.removeAttribute(t, "class")
            : n.setAttribute(t, "class", e)
          : (t.className = e);
      }
      function Qg(n, t, e) {
        let i = n.length;
        for (;;) {
          const r = n.indexOf(t, e);
          if (-1 === r) return r;
          if (0 === r || n.charCodeAt(r - 1) <= 32) {
            const s = t.length;
            if (r + s === i || n.charCodeAt(r + s) <= 32) return r;
          }
          e = r + 1;
        }
      }
      const Yg = "ng-template";
      function RA(n, t, e) {
        let i = 0;
        for (; i < n.length; ) {
          let r = n[i++];
          if (e && "class" === r) {
            if (((r = n[i]), -1 !== Qg(r.toLowerCase(), t, 0))) return !0;
          } else if (1 === r) {
            for (; i < n.length && "string" == typeof (r = n[i++]); )
              if (r.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Zg(n) {
        return 4 === n.type && n.value !== Yg;
      }
      function kA(n, t, e) {
        return t === (4 !== n.type || e ? n.value : Yg);
      }
      function OA(n, t, e) {
        let i = 4;
        const r = n.attrs || [],
          s = (function NA(n) {
            for (let t = 0; t < n.length; t++) if (Bm(n[t])) return t;
            return n.length;
          })(r);
        let o = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & i) {
                if (
                  ((i = 2 | (1 & i)),
                  ("" !== l && !kA(n, l, e)) || ("" === l && 1 === t.length))
                ) {
                  if (pn(i)) return !1;
                  o = !0;
                }
              } else {
                const c = 8 & i ? l : t[++a];
                if (8 & i && null !== n.attrs) {
                  if (!RA(n.attrs, c, e)) {
                    if (pn(i)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const d = FA(8 & i ? "class" : l, r, Zg(n), e);
                if (-1 === d) {
                  if (pn(i)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== c) {
                  let h;
                  h = d > s ? "" : r[d + 1].toLowerCase();
                  const f = 8 & i ? h : null;
                  if ((f && -1 !== Qg(f, c, 0)) || (2 & i && c !== h)) {
                    if (pn(i)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !pn(i) && !pn(l)) return !1;
            if (o && pn(l)) continue;
            (o = !1), (i = l | (1 & i));
          }
        }
        return pn(i) || o;
      }
      function pn(n) {
        return 0 == (1 & n);
      }
      function FA(n, t, e, i) {
        if (null === t) return -1;
        let r = 0;
        if (i || !e) {
          let s = !1;
          for (; r < t.length; ) {
            const o = t[r];
            if (o === n) return r;
            if (3 === o || 6 === o) s = !0;
            else {
              if (1 === o || 2 === o) {
                let a = t[++r];
                for (; "string" == typeof a; ) a = t[++r];
                continue;
              }
              if (4 === o) break;
              if (0 === o) {
                r += 4;
                continue;
              }
            }
            r += s ? 1 : 2;
          }
          return -1;
        }
        return (function LA(n, t) {
          let e = n.indexOf(4);
          if (e > -1)
            for (e++; e < n.length; ) {
              const i = n[e];
              if ("number" == typeof i) return -1;
              if (i === t) return e;
              e++;
            }
          return -1;
        })(t, n);
      }
      function Xg(n, t, e = !1) {
        for (let i = 0; i < t.length; i++) if (OA(n, t[i], e)) return !0;
        return !1;
      }
      function VA(n, t) {
        e: for (let e = 0; e < t.length; e++) {
          const i = t[e];
          if (n.length === i.length) {
            for (let r = 0; r < n.length; r++) if (n[r] !== i[r]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function Jg(n, t) {
        return n ? ":not(" + t.trim() + ")" : t;
      }
      function BA(n) {
        let t = n[0],
          e = 1,
          i = 2,
          r = "",
          s = !1;
        for (; e < n.length; ) {
          let o = n[e];
          if ("string" == typeof o)
            if (2 & i) {
              const a = n[++e];
              r += "[" + o + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & i ? (r += "." + o) : 4 & i && (r += " " + o);
          else
            "" !== r && !pn(o) && ((t += Jg(s, r)), (r = "")),
              (i = o),
              (s = s || !pn(i));
          e++;
        }
        return "" !== r && (t += Jg(s, r)), t;
      }
      const U = {};
      function Nt(n) {
        e_(ie(), D(), _t() + n, ba());
      }
      function e_(n, t, e, i) {
        if (!i)
          if (3 == (3 & t[2])) {
            const s = n.preOrderCheckHooks;
            null !== s && Ma(t, s, e);
          } else {
            const s = n.preOrderHooks;
            null !== s && Sa(t, s, 0, e);
          }
        pi(e);
      }
      function $a(n, t) {
        return (n << 17) | (t << 2);
      }
      function mn(n) {
        return (n >> 17) & 32767;
      }
      function id(n) {
        return 2 | n;
      }
      function Yn(n) {
        return (131068 & n) >> 2;
      }
      function rd(n, t) {
        return (-131069 & n) | (t << 2);
      }
      function sd(n) {
        return 1 | n;
      }
      function d_(n, t) {
        const e = n.contentQueries;
        if (null !== e)
          for (let i = 0; i < e.length; i += 2) {
            const r = e[i],
              s = e[i + 1];
            if (-1 !== s) {
              const o = n.data[s];
              yu(r), o.contentQueries(2, t[s], s);
            }
          }
      }
      function no(n, t, e, i, r, s, o, a, l, c) {
        const u = t.blueprint.slice();
        return (
          (u[0] = r),
          (u[2] = 140 | i),
          xm(u),
          (u[3] = u[15] = n),
          (u[8] = e),
          (u[10] = o || (n && n[10])),
          (u[G] = a || (n && n[G])),
          (u[12] = l || (n && n[12]) || null),
          (u[9] = c || (n && n[9]) || null),
          (u[6] = s),
          (u[16] = 2 == t.type ? n[16] : u),
          u
        );
      }
      function Pr(n, t, e, i, r) {
        let s = n.data[t];
        if (null === s)
          (s = (function pd(n, t, e, i, r) {
            const s = Tm(),
              o = pu(),
              l = (n.data[t] = (function iT(n, t, e, i, r, s) {
                return {
                  type: e,
                  index: i,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: r,
                  attrs: s,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, o ? s : s && s.parent, e, t, i, r));
            return (
              null === n.firstChild && (n.firstChild = l),
              null !== s &&
                (o
                  ? null == s.child && null !== l.parent && (s.child = l)
                  : null === s.next && (s.next = l)),
              l
            );
          })(n, t, e, i, r)),
            (function DS() {
              return B.lFrame.inI18n;
            })() && (s.flags |= 64);
        else if (64 & s.type) {
          (s.type = e), (s.value = i), (s.attrs = r);
          const o = (function Ls() {
            const n = B.lFrame,
              t = n.currentTNode;
            return n.isParent ? t : t.parent;
          })();
          s.injectorIndex = null === o ? -1 : o.injectorIndex;
        }
        return An(s, !0), s;
      }
      function Nr(n, t, e, i) {
        if (0 === e) return -1;
        const r = t.length;
        for (let s = 0; s < e; s++)
          t.push(i), n.blueprint.push(i), n.data.push(null);
        return r;
      }
      function io(n, t, e) {
        wa(t);
        try {
          const i = n.viewQuery;
          null !== i && Dd(1, i, e);
          const r = n.template;
          null !== r && h_(n, t, r, 1, e),
            n.firstCreatePass && (n.firstCreatePass = !1),
            n.staticContentQueries && d_(n, t),
            n.staticViewQueries && Dd(2, n.viewQuery, e);
          const s = n.components;
          null !== s &&
            (function eT(n, t) {
              for (let e = 0; e < t.length; e++) CT(n, t[e]);
            })(t, s);
        } catch (i) {
          throw (
            (n.firstCreatePass &&
              ((n.incompleteFirstPass = !0), (n.firstCreatePass = !1)),
            i)
          );
        } finally {
          (t[2] &= -5), Da();
        }
      }
      function Lr(n, t, e, i) {
        const r = t[2];
        if (256 == (256 & r)) return;
        wa(t);
        const s = ba();
        try {
          xm(t),
            (function Im(n) {
              return (B.lFrame.bindingIndex = n);
            })(n.bindingStartIndex),
            null !== e && h_(n, t, e, 2, i);
          const o = 3 == (3 & r);
          if (!s)
            if (o) {
              const c = n.preOrderCheckHooks;
              null !== c && Ma(t, c, null);
            } else {
              const c = n.preOrderHooks;
              null !== c && Sa(t, c, 0, null), vu(t, 0);
            }
          if (
            ((function vT(n) {
              for (let t = qu(n); null !== t; t = Ku(t)) {
                if (!t[2]) continue;
                const e = t[9];
                for (let i = 0; i < e.length; i++) {
                  const r = e[i],
                    s = r[3];
                  0 == (1024 & r[2]) && fu(s, 1), (r[2] |= 1024);
                }
              }
            })(t),
            (function yT(n) {
              for (let t = qu(n); null !== t; t = Ku(t))
                for (let e = 10; e < t.length; e++) {
                  const i = t[e],
                    r = i[1];
                  hu(i) && Lr(r, i, r.template, i[8]);
                }
            })(t),
            null !== n.contentQueries && d_(n, t),
            !s)
          )
            if (o) {
              const c = n.contentCheckHooks;
              null !== c && Ma(t, c);
            } else {
              const c = n.contentHooks;
              null !== c && Sa(t, c, 1), vu(t, 1);
            }
          !(function XA(n, t) {
            const e = n.hostBindingOpCodes;
            if (null !== e)
              try {
                for (let i = 0; i < e.length; i++) {
                  const r = e[i];
                  if (r < 0) pi(~r);
                  else {
                    const s = r,
                      o = e[++i],
                      a = e[++i];
                    ES(o, s), a(2, t[s]);
                  }
                }
              } finally {
                pi(-1);
              }
          })(n, t);
          const a = n.components;
          null !== a &&
            (function JA(n, t) {
              for (let e = 0; e < t.length; e++) bT(n, t[e]);
            })(t, a);
          const l = n.viewQuery;
          if ((null !== l && Dd(2, l, i), !s))
            if (o) {
              const c = n.viewCheckHooks;
              null !== c && Ma(t, c);
            } else {
              const c = n.viewHooks;
              null !== c && Sa(t, c, 2), vu(t, 2);
            }
          !0 === n.firstUpdatePass && (n.firstUpdatePass = !1),
            s || (t[2] &= -73),
            1024 & t[2] && ((t[2] &= -1025), fu(t[3], -1));
        } finally {
          Da();
        }
      }
      function tT(n, t, e, i) {
        const r = t[10],
          s = !ba(),
          o = Sm(t);
        try {
          s && !o && r.begin && r.begin(), o && io(n, t, i), Lr(n, t, e, i);
        } finally {
          s && !o && r.end && r.end();
        }
      }
      function h_(n, t, e, i, r) {
        const s = _t(),
          o = 2 & i;
        try {
          pi(-1), o && t.length > 20 && e_(n, t, 20, ba()), e(i, r);
        } finally {
          pi(s);
        }
      }
      function f_(n, t, e) {
        if (ou(t)) {
          const r = t.directiveEnd;
          for (let s = t.directiveStart; s < r; s++) {
            const o = n.data[s];
            o.contentQueries && o.contentQueries(1, e[s], s);
          }
        }
      }
      function md(n, t, e) {
        !Am() ||
          ((function uT(n, t, e, i) {
            const r = e.directiveStart,
              s = e.directiveEnd;
            n.firstCreatePass || js(e, t), dt(i, t);
            const o = e.initialInputs;
            for (let a = r; a < s; a++) {
              const l = n.data[a],
                c = fn(l);
              c && mT(t, e, l);
              const u = Hs(t, n, a, e);
              dt(u, t),
                null !== o && gT(0, a - r, u, l, 0, o),
                c && (Rt(e.index, t)[8] = u);
            }
          })(n, t, e, Zt(e, t)),
          128 == (128 & e.flags) &&
            (function dT(n, t, e) {
              const i = e.directiveStart,
                r = e.directiveEnd,
                o = e.index,
                a = (function MS() {
                  return B.lFrame.currentDirectiveIndex;
                })();
              try {
                pi(o);
                for (let l = i; l < r; l++) {
                  const c = n.data[l],
                    u = t[l];
                  gu(l),
                    (null !== c.hostBindings ||
                      0 !== c.hostVars ||
                      null !== c.hostAttrs) &&
                      C_(c, u);
                }
              } finally {
                pi(-1), gu(a);
              }
            })(n, t, e));
      }
      function gd(n, t, e = Zt) {
        const i = t.localNames;
        if (null !== i) {
          let r = t.index + 1;
          for (let s = 0; s < i.length; s += 2) {
            const o = i[s + 1],
              a = -1 === o ? e(t, n) : n[o];
            n[r++] = a;
          }
        }
      }
      function p_(n) {
        const t = n.tView;
        return null === t || t.incompleteFirstPass
          ? (n.tView = Wa(
              1,
              null,
              n.template,
              n.decls,
              n.vars,
              n.directiveDefs,
              n.pipeDefs,
              n.viewQuery,
              n.schemas,
              n.consts
            ))
          : t;
      }
      function Wa(n, t, e, i, r, s, o, a, l, c) {
        const u = 20 + i,
          d = u + r,
          h = (function nT(n, t) {
            const e = [];
            for (let i = 0; i < t; i++) e.push(i < n ? null : U);
            return e;
          })(u, d),
          f = "function" == typeof c ? c() : c;
        return (h[1] = {
          type: n,
          blueprint: h,
          template: e,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof s ? s() : s,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: f,
          incompleteFirstPass: !1,
        });
      }
      function __(n, t, e, i) {
        const r = x_(t);
        null === e
          ? r.push(i)
          : (r.push(e), n.firstCreatePass && A_(n).push(i, r.length - 1));
      }
      function y_(n, t, e) {
        for (let i in n)
          if (n.hasOwnProperty(i)) {
            const r = n[i];
            (e = null === e ? {} : e).hasOwnProperty(i)
              ? e[i].push(t, r)
              : (e[i] = [t, r]);
          }
        return e;
      }
      function Lt(n, t, e, i, r, s, o, a) {
        const l = Zt(t, e);
        let u,
          c = t.inputs;
        !a && null != c && (u = c[i])
          ? (R_(n, e, u, i, r),
            ga(t) &&
              (function oT(n, t) {
                const e = Rt(t, n);
                16 & e[2] || (e[2] |= 64);
              })(e, t.index))
          : 3 & t.type &&
            ((i = (function sT(n) {
              return "class" === n
                ? "className"
                : "for" === n
                ? "htmlFor"
                : "formaction" === n
                ? "formAction"
                : "innerHtml" === n
                ? "innerHTML"
                : "readonly" === n
                ? "readOnly"
                : "tabindex" === n
                ? "tabIndex"
                : n;
            })(i)),
            (r = null != o ? o(r, t.value || "", i) : r),
            Ie(s)
              ? s.setProperty(l, i, r)
              : Cu(i) || (l.setProperty ? l.setProperty(i, r) : (l[i] = r)));
      }
      function _d(n, t, e, i) {
        let r = !1;
        if (Am()) {
          const s = (function hT(n, t, e) {
              const i = n.directiveRegistry;
              let r = null;
              if (i)
                for (let s = 0; s < i.length; s++) {
                  const o = i[s];
                  Xg(e, o.selectors, !1) &&
                    (r || (r = []),
                    Ra(js(e, t), n, o.type),
                    fn(o) ? (w_(n, e), r.unshift(o)) : r.push(o));
                }
              return r;
            })(n, t, e),
            o = null === i ? null : { "": -1 };
          if (null !== s) {
            (r = !0), D_(e, n.data.length, s.length);
            for (let u = 0; u < s.length; u++) {
              const d = s[u];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              c = Nr(n, t, s.length, null);
            for (let u = 0; u < s.length; u++) {
              const d = s[u];
              (e.mergedAttrs = Aa(e.mergedAttrs, d.hostAttrs)),
                E_(n, e, t, c, d),
                pT(c, d, o),
                null !== d.contentQueries && (e.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (e.flags |= 128);
              const h = d.type.prototype;
              !a &&
                (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) &&
                ((n.preOrderHooks || (n.preOrderHooks = [])).push(e.index),
                (a = !0)),
                !l &&
                  (h.ngOnChanges || h.ngDoCheck) &&
                  ((n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(
                    e.index
                  ),
                  (l = !0)),
                c++;
            }
            !(function rT(n, t) {
              const i = t.directiveEnd,
                r = n.data,
                s = t.attrs,
                o = [];
              let a = null,
                l = null;
              for (let c = t.directiveStart; c < i; c++) {
                const u = r[c],
                  d = u.inputs,
                  h = null === s || Zg(t) ? null : _T(d, s);
                o.push(h), (a = y_(d, c, a)), (l = y_(u.outputs, c, l));
              }
              null !== a &&
                (a.hasOwnProperty("class") && (t.flags |= 16),
                a.hasOwnProperty("style") && (t.flags |= 32)),
                (t.initialInputs = o),
                (t.inputs = a),
                (t.outputs = l);
            })(n, e);
          }
          o &&
            (function fT(n, t, e) {
              if (t) {
                const i = (n.localNames = []);
                for (let r = 0; r < t.length; r += 2) {
                  const s = e[t[r + 1]];
                  if (null == s)
                    throw new ne(
                      -301,
                      `Export of name '${t[r + 1]}' not found!`
                    );
                  i.push(t[r], s);
                }
              }
            })(e, i, o);
        }
        return (e.mergedAttrs = Aa(e.mergedAttrs, e.attrs)), r;
      }
      function b_(n, t, e, i, r, s) {
        const o = s.hostBindings;
        if (o) {
          let a = n.hostBindingOpCodes;
          null === a && (a = n.hostBindingOpCodes = []);
          const l = ~t.index;
          (function cT(n) {
            let t = n.length;
            for (; t > 0; ) {
              const e = n[--t];
              if ("number" == typeof e && e < 0) return e;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(i, r, o);
        }
      }
      function C_(n, t) {
        null !== n.hostBindings && n.hostBindings(1, t);
      }
      function w_(n, t) {
        (t.flags |= 2), (n.components || (n.components = [])).push(t.index);
      }
      function pT(n, t, e) {
        if (e) {
          if (t.exportAs)
            for (let i = 0; i < t.exportAs.length; i++) e[t.exportAs[i]] = n;
          fn(t) && (e[""] = n);
        }
      }
      function D_(n, t, e) {
        (n.flags |= 1),
          (n.directiveStart = t),
          (n.directiveEnd = t + e),
          (n.providerIndexes = t);
      }
      function E_(n, t, e, i, r) {
        n.data[i] = r;
        const s = r.factory || (r.factory = Ui(r.type)),
          o = new Vs(s, fn(r), null);
        (n.blueprint[i] = o),
          (e[i] = o),
          b_(n, t, 0, i, Nr(n, e, r.hostVars, U), r);
      }
      function mT(n, t, e) {
        const i = Zt(t, n),
          r = p_(e),
          s = n[10],
          o = qa(
            n,
            no(
              n,
              r,
              null,
              e.onPush ? 64 : 16,
              i,
              t,
              s,
              s.createRenderer(i, e),
              null,
              null
            )
          );
        n[t.index] = o;
      }
      function On(n, t, e, i, r, s) {
        const o = Zt(n, t);
        !(function yd(n, t, e, i, r, s, o) {
          if (null == s)
            Ie(n) ? n.removeAttribute(t, r, e) : t.removeAttribute(r);
          else {
            const a = null == o ? H(s) : o(s, i || "", r);
            Ie(n)
              ? n.setAttribute(t, r, a, e)
              : e
              ? t.setAttributeNS(e, r, a)
              : t.setAttribute(r, a);
          }
        })(t[G], o, s, n.value, e, i, r);
      }
      function gT(n, t, e, i, r, s) {
        const o = s[t];
        if (null !== o) {
          const a = i.setInput;
          for (let l = 0; l < o.length; ) {
            const c = o[l++],
              u = o[l++],
              d = o[l++];
            null !== a ? i.setInput(e, d, c, u) : (e[u] = d);
          }
        }
      }
      function _T(n, t) {
        let e = null,
          i = 0;
        for (; i < t.length; ) {
          const r = t[i];
          if (0 !== r)
            if (5 !== r) {
              if ("number" == typeof r) break;
              n.hasOwnProperty(r) &&
                (null === e && (e = []), e.push(r, n[r], t[i + 1])),
                (i += 2);
            } else i += 2;
          else i += 4;
        }
        return e;
      }
      function M_(n, t, e, i) {
        return new Array(n, !0, !1, t, null, 0, i, e, null, null);
      }
      function bT(n, t) {
        const e = Rt(t, n);
        if (hu(e)) {
          const i = e[1];
          80 & e[2] ? Lr(i, e, i.template, e[8]) : e[5] > 0 && vd(e);
        }
      }
      function vd(n) {
        for (let i = qu(n); null !== i; i = Ku(i))
          for (let r = 10; r < i.length; r++) {
            const s = i[r];
            if (1024 & s[2]) {
              const o = s[1];
              Lr(o, s, o.template, s[8]);
            } else s[5] > 0 && vd(s);
          }
        const e = n[1].components;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const r = Rt(e[i], n);
            hu(r) && r[5] > 0 && vd(r);
          }
      }
      function CT(n, t) {
        const e = Rt(t, n),
          i = e[1];
        (function wT(n, t) {
          for (let e = t.length; e < n.blueprint.length; e++)
            t.push(n.blueprint[e]);
        })(i, e),
          io(i, e, e[8]);
      }
      function qa(n, t) {
        return n[13] ? (n[14][4] = t) : (n[13] = t), (n[14] = t), t;
      }
      function bd(n) {
        for (; n; ) {
          n[2] |= 64;
          const t = eo(n);
          if (rS(n) && !t) return n;
          n = t;
        }
        return null;
      }
      function wd(n, t, e) {
        const i = t[10];
        i.begin && i.begin();
        try {
          Lr(n, t, n.template, e);
        } catch (r) {
          throw (I_(t, r), r);
        } finally {
          i.end && i.end();
        }
      }
      function S_(n) {
        !(function Cd(n) {
          for (let t = 0; t < n.components.length; t++) {
            const e = n.components[t],
              i = Uu(e),
              r = i[1];
            tT(r, i, r.template, e);
          }
        })(n[8]);
      }
      function Dd(n, t, e) {
        yu(0), t(n, e);
      }
      const ST = (() => Promise.resolve(null))();
      function x_(n) {
        return n[7] || (n[7] = []);
      }
      function A_(n) {
        return n.cleanup || (n.cleanup = []);
      }
      function T_(n, t, e) {
        return (
          (null === n || fn(n)) &&
            (e = (function pS(n) {
              for (; Array.isArray(n); ) {
                if ("object" == typeof n[1]) return n;
                n = n[0];
              }
              return null;
            })(e[t.index])),
          e[G]
        );
      }
      function I_(n, t) {
        const e = n[9],
          i = e ? e.get(Qn, null) : null;
        i && i.handleError(t);
      }
      function R_(n, t, e, i, r) {
        for (let s = 0; s < e.length; ) {
          const o = e[s++],
            a = e[s++],
            l = t[o],
            c = n.data[o];
          null !== c.setInput ? c.setInput(l, r, i, a) : (l[a] = r);
        }
      }
      function Ka(n, t, e) {
        let i = e ? n.styles : null,
          r = e ? n.classes : null,
          s = 0;
        if (null !== t)
          for (let o = 0; o < t.length; o++) {
            const a = t[o];
            "number" == typeof a
              ? (s = a)
              : 1 == s
              ? (r = Zc(r, a))
              : 2 == s && (i = Zc(i, a + ": " + t[++o] + ";"));
          }
        e ? (n.styles = i) : (n.stylesWithoutHost = i),
          e ? (n.classes = r) : (n.classesWithoutHost = r);
      }
      const Ed = new A("INJECTOR", -1);
      class k_ {
        get(t, e = Gs) {
          if (e === Gs) {
            const i = new Error(`NullInjectorError: No provider for ${ue(t)}!`);
            throw ((i.name = "NullInjectorError"), i);
          }
          return e;
        }
      }
      const Md = new A("Set Injector scope."),
        ro = {},
        TT = {};
      let Sd;
      function O_() {
        return void 0 === Sd && (Sd = new k_()), Sd;
      }
      function F_(n, t = null, e = null, i) {
        const r = P_(n, t, e, i);
        return r._resolveInjectorDefTypes(), r;
      }
      function P_(n, t = null, e = null, i) {
        return new IT(n, e, t || O_(), i);
      }
      class IT {
        constructor(t, e, i, r = null) {
          (this.parent = i),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          e && Tn(e, (a) => this.processProvider(a, t, e)),
            Tn([t], (a) => this.processInjectorType(a, [], s)),
            this.records.set(Ed, Vr(void 0, this));
          const o = this.records.get(Md);
          (this.scope = null != o ? o.value : null),
            (this.source = r || ("object" == typeof t ? null : ue(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, e = Gs, i = j.Default) {
          this.assertNotDestroyed();
          const r = ig(this),
            s = ui(void 0);
          try {
            if (!(i & j.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function VT(n) {
                    return (
                      "function" == typeof n ||
                      ("object" == typeof n && n instanceof A)
                    );
                  })(t) && Jc(t);
                (a = l && this.injectableDefInScope(l) ? Vr(xd(t), ro) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (i & j.Self ? O_() : this.parent).get(
              t,
              (e = i & j.Optional && e === Gs ? null : e)
            );
          } catch (o) {
            if ("NullInjectorError" === o.name) {
              if (((o[Pa] = o[Pa] || []).unshift(ue(t)), r)) throw o;
              return (function cx(n, t, e, i) {
                const r = n[Pa];
                throw (
                  (t[ng] && r.unshift(t[ng]),
                  (n.message = (function ux(n, t, e, i = null) {
                    n =
                      n && "\n" === n.charAt(0) && "\u0275" == n.charAt(1)
                        ? n.substr(2)
                        : n;
                    let r = ue(t);
                    if (Array.isArray(t)) r = t.map(ue).join(" -> ");
                    else if ("object" == typeof t) {
                      let s = [];
                      for (let o in t)
                        if (t.hasOwnProperty(o)) {
                          let a = t[o];
                          s.push(
                            o +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : ue(a))
                          );
                        }
                      r = `{${s.join(", ")}}`;
                    }
                    return `${e}${i ? "(" + i + ")" : ""}[${r}]: ${n.replace(
                      rx,
                      "\n  "
                    )}`;
                  })("\n" + n.message, r, e, i)),
                  (n.ngTokenPath = r),
                  (n[Pa] = null),
                  n)
                );
              })(o, t, "R3InjectorError", this.source);
            }
            throw o;
          } finally {
            ui(s), ig(r);
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((i, r) => t.push(ue(r))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new ne(205, "");
        }
        processInjectorType(t, e, i) {
          if (!(t = z(t))) return !1;
          let r = dm(t);
          const s = (null == r && t.ngModule) || void 0,
            o = void 0 === s ? t : s,
            a = -1 !== i.indexOf(o);
          if ((void 0 !== s && (r = dm(s)), null == r)) return !1;
          if (null != r.imports && !a) {
            let u;
            i.push(o);
            try {
              Tn(r.imports, (d) => {
                this.processInjectorType(d, e, i) &&
                  (void 0 === u && (u = []), u.push(d));
              });
            } finally {
            }
            if (void 0 !== u)
              for (let d = 0; d < u.length; d++) {
                const { ngModule: h, providers: f } = u[d];
                Tn(f, (p) => this.processProvider(p, h, f || ge));
              }
          }
          this.injectorDefTypes.add(o);
          const l = Ui(o) || (() => new o());
          this.records.set(o, Vr(l, ro));
          const c = r.providers;
          if (null != c && !a) {
            const u = t;
            Tn(c, (d) => this.processProvider(d, u, c));
          }
          return void 0 !== s && void 0 !== t.providers;
        }
        processProvider(t, e, i) {
          let r = Br((t = z(t))) ? t : z(t && t.provide);
          const s = (function kT(n, t, e) {
            return L_(n) ? Vr(void 0, n.useValue) : Vr(N_(n), ro);
          })(t);
          if (Br(t) || !0 !== t.multi) this.records.get(r);
          else {
            let o = this.records.get(r);
            o ||
              ((o = Vr(void 0, ro, !0)),
              (o.factory = () => ku(o.multi)),
              this.records.set(r, o)),
              (r = t),
              o.multi.push(t);
          }
          this.records.set(r, s);
        }
        hydrate(t, e) {
          return (
            e.value === ro && ((e.value = TT), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              (function LT(n) {
                return (
                  null !== n &&
                  "object" == typeof n &&
                  "function" == typeof n.ngOnDestroy
                );
              })(e.value) &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const e = z(t.providedIn);
          return "string" == typeof e
            ? "any" === e || e === this.scope
            : this.injectorDefTypes.has(e);
        }
      }
      function xd(n) {
        const t = Jc(n),
          e = null !== t ? t.factory : Ui(n);
        if (null !== e) return e;
        if (n instanceof A) throw new ne(204, "");
        if (n instanceof Function)
          return (function RT(n) {
            const t = n.length;
            if (t > 0) throw (zs(t, "?"), new ne(204, ""));
            const e = (function GM(n) {
              const t = n && (n[da] || n[hm]);
              if (t) {
                const e = (function WM(n) {
                  if (n.hasOwnProperty("name")) return n.name;
                  const t = ("" + n).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(n);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${e}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${e}" class.`
                  ),
                  t
                );
              }
              return null;
            })(n);
            return null !== e ? () => e.factory(n) : () => new n();
          })(n);
        throw new ne(204, "");
      }
      function N_(n, t, e) {
        let i;
        if (Br(n)) {
          const r = z(n);
          return Ui(r) || xd(r);
        }
        if (L_(n)) i = () => z(n.useValue);
        else if (
          (function FT(n) {
            return !(!n || !n.useFactory);
          })(n)
        )
          i = () => n.useFactory(...ku(n.deps || []));
        else if (
          (function OT(n) {
            return !(!n || !n.useExisting);
          })(n)
        )
          i = () => C(z(n.useExisting));
        else {
          const r = z(n && (n.useClass || n.provide));
          if (
            !(function NT(n) {
              return !!n.deps;
            })(n)
          )
            return Ui(r) || xd(r);
          i = () => new r(...ku(n.deps));
        }
        return i;
      }
      function Vr(n, t, e = !1) {
        return { factory: n, value: t, multi: e ? [] : void 0 };
      }
      function L_(n) {
        return null !== n && "object" == typeof n && ox in n;
      }
      function Br(n) {
        return "function" == typeof n;
      }
      let De = (() => {
        class n {
          static create(e, i) {
            var r;
            if (Array.isArray(e)) return F_({ name: "" }, i, e, "");
            {
              const s = null !== (r = e.name) && void 0 !== r ? r : "";
              return F_({ name: s }, e.parent, e.providers, s);
            }
          }
        }
        return (
          (n.THROW_IF_NOT_FOUND = Gs),
          (n.NULL = new k_()),
          (n.ɵprov = R({ token: n, providedIn: "any", factory: () => C(Ed) })),
          (n.__NG_ELEMENT_ID__ = -1),
          n
        );
      })();
      function WT(n, t) {
        Ea(Uu(n)[1], Ge());
      }
      function q(n) {
        let t = (function Q_(n) {
            return Object.getPrototypeOf(n.prototype).constructor;
          })(n.type),
          e = !0;
        const i = [n];
        for (; t; ) {
          let r;
          if (fn(n)) r = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new ne(903, "");
            r = t.ɵdir;
          }
          if (r) {
            if (e) {
              i.push(r);
              const o = n;
              (o.inputs = Id(n.inputs)),
                (o.declaredInputs = Id(n.declaredInputs)),
                (o.outputs = Id(n.outputs));
              const a = r.hostBindings;
              a && YT(n, a);
              const l = r.viewQuery,
                c = r.contentQueries;
              if (
                (l && KT(n, l),
                c && QT(n, c),
                Yc(n.inputs, r.inputs),
                Yc(n.declaredInputs, r.declaredInputs),
                Yc(n.outputs, r.outputs),
                fn(r) && r.data.animation)
              ) {
                const u = n.data;
                u.animation = (u.animation || []).concat(r.data.animation);
              }
            }
            const s = r.features;
            if (s)
              for (let o = 0; o < s.length; o++) {
                const a = s[o];
                a && a.ngInherit && a(n), a === q && (e = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function qT(n) {
          let t = 0,
            e = null;
          for (let i = n.length - 1; i >= 0; i--) {
            const r = n[i];
            (r.hostVars = t += r.hostVars),
              (r.hostAttrs = Aa(r.hostAttrs, (e = Aa(e, r.hostAttrs))));
          }
        })(i);
      }
      function Id(n) {
        return n === gr ? {} : n === ge ? [] : n;
      }
      function KT(n, t) {
        const e = n.viewQuery;
        n.viewQuery = e
          ? (i, r) => {
              t(i, r), e(i, r);
            }
          : t;
      }
      function QT(n, t) {
        const e = n.contentQueries;
        n.contentQueries = e
          ? (i, r, s) => {
              t(i, r, s), e(i, r, s);
            }
          : t;
      }
      function YT(n, t) {
        const e = n.hostBindings;
        n.hostBindings = e
          ? (i, r) => {
              t(i, r), e(i, r);
            }
          : t;
      }
      let Qa = null;
      function jr() {
        if (!Qa) {
          const n = pe.Symbol;
          if (n && n.iterator) Qa = n.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const i = t[e];
              "entries" !== i &&
                "size" !== i &&
                Map.prototype[i] === Map.prototype.entries &&
                (Qa = i);
            }
          }
        }
        return Qa;
      }
      function so(n) {
        return (
          !!Rd(n) && (Array.isArray(n) || (!(n instanceof Map) && jr() in n))
        );
      }
      function Rd(n) {
        return null !== n && ("function" == typeof n || "object" == typeof n);
      }
      function ht(n, t, e) {
        return !Object.is(n[t], e) && ((n[t] = e), !0);
      }
      function qe(n, t, e, i) {
        const r = D();
        return ht(r, wr(), t) && (ie(), On(Re(), r, n, t, e, i)), qe;
      }
      function Pn(n, t, e, i, r, s, o, a) {
        const l = D(),
          c = ie(),
          u = n + 20,
          d = c.firstCreatePass
            ? (function iI(n, t, e, i, r, s, o, a, l) {
                const c = t.consts,
                  u = Pr(t, n, 4, o || null, fi(c, a));
                _d(t, e, u, fi(c, l)), Ea(t, u);
                const d = (u.tViews = Wa(
                  2,
                  u,
                  i,
                  r,
                  s,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  c
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, u),
                    (d.queries = t.queries.embeddedTView(u))),
                  u
                );
              })(u, c, l, t, e, i, r, s, o)
            : c.data[u];
        An(d, !1);
        const h = l[G].createComment("");
        Ha(c, l, h, d),
          dt(h, l),
          qa(l, (l[u] = M_(h, l, h, d))),
          _a(d) && md(c, l, d),
          null != o && gd(l, d, a);
      }
      function y(n, t = j.Default) {
        const e = D();
        return null === e ? C(n, t) : Wm(Ge(), e, z(n), t);
      }
      function Xa() {
        throw new Error("invalid");
      }
      function ft(n, t, e) {
        const i = D();
        return ht(i, wr(), t) && Lt(ie(), Re(), i, n, t, i[G], e, !1), ft;
      }
      function Nd(n, t, e, i, r) {
        const o = r ? "class" : "style";
        R_(n, e, t.inputs[o], o, i);
      }
      function g(n, t, e, i) {
        const r = D(),
          s = ie(),
          o = 20 + n,
          a = r[G],
          l = (r[o] = Yu(
            a,
            t,
            (function OS() {
              return B.lFrame.currentNamespace;
            })()
          )),
          c = s.firstCreatePass
            ? (function MI(n, t, e, i, r, s, o) {
                const a = t.consts,
                  c = Pr(t, n, 2, r, fi(a, s));
                return (
                  _d(t, e, c, fi(a, o)),
                  null !== c.attrs && Ka(c, c.attrs, !1),
                  null !== c.mergedAttrs && Ka(c, c.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, c),
                  c
                );
              })(o, s, r, 0, t, e, i)
            : s.data[o];
        An(c, !0);
        const u = c.mergedAttrs;
        null !== u && xa(a, l, u);
        const d = c.classes;
        null !== d && nd(a, l, d);
        const h = c.styles;
        null !== h && Kg(a, l, h),
          64 != (64 & c.flags) && Ha(s, r, l, c),
          0 ===
            (function _S() {
              return B.lFrame.elementDepthCount;
            })() && dt(l, r),
          (function yS() {
            B.lFrame.elementDepthCount++;
          })(),
          _a(c) && (md(s, r, c), f_(s, c, r)),
          null !== i && gd(r, c);
      }
      function _() {
        let n = Ge();
        pu() ? mu() : ((n = n.parent), An(n, !1));
        const t = n;
        !(function vS() {
          B.lFrame.elementDepthCount--;
        })();
        const e = ie();
        e.firstCreatePass && (Ea(e, n), ou(n) && e.queries.elementEnd(n)),
          null != t.classesWithoutHost &&
            (function VS(n) {
              return 0 != (16 & n.flags);
            })(t) &&
            Nd(e, t, D(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function BS(n) {
              return 0 != (32 & n.flags);
            })(t) &&
            Nd(e, t, D(), t.stylesWithoutHost, !1);
      }
      function L(n, t, e, i) {
        g(n, t, e, i), _();
      }
      function Ja() {
        return D();
      }
      function ao(n) {
        return !!n && "function" == typeof n.then;
      }
      const Bd = function my(n) {
        return !!n && "function" == typeof n.subscribe;
      };
      function be(n, t, e, i) {
        const r = D(),
          s = ie(),
          o = Ge();
        return gy(s, r, r[G], o, n, t, !!e, i), be;
      }
      function el(n, t) {
        const e = Ge(),
          i = D(),
          r = ie();
        return gy(r, i, T_(_u(r.data), e, i), e, n, t, !1), el;
      }
      function gy(n, t, e, i, r, s, o, a) {
        const l = _a(i),
          u = n.firstCreatePass && A_(n),
          d = t[8],
          h = x_(t);
        let f = !0;
        if (3 & i.type || a) {
          const b = Zt(i, t),
            w = a ? a(b) : b,
            v = h.length,
            M = a ? (T) => a(Be(T[i.index])) : i.index;
          if (Ie(e)) {
            let T = null;
            if (
              (!a &&
                l &&
                (T = (function AI(n, t, e, i) {
                  const r = n.cleanup;
                  if (null != r)
                    for (let s = 0; s < r.length - 1; s += 2) {
                      const o = r[s];
                      if (o === e && r[s + 1] === i) {
                        const a = t[7],
                          l = r[s + 2];
                        return a.length > l ? a[l] : null;
                      }
                      "string" == typeof o && (s += 2);
                    }
                  return null;
                })(n, t, r, i.index)),
              null !== T)
            )
              ((T.__ngLastListenerFn__ || T).__ngNextListenerFn__ = s),
                (T.__ngLastListenerFn__ = s),
                (f = !1);
            else {
              s = jd(i, t, d, s, !1);
              const $ = e.listen(w, r, s);
              h.push(s, $), u && u.push(r, M, v, v + 1);
            }
          } else
            (s = jd(i, t, d, s, !0)),
              w.addEventListener(r, s, o),
              h.push(s),
              u && u.push(r, M, v, o);
        } else s = jd(i, t, d, s, !1);
        const p = i.outputs;
        let m;
        if (f && null !== p && (m = p[r])) {
          const b = m.length;
          if (b)
            for (let w = 0; w < b; w += 2) {
              const Me = t[m[w]][m[w + 1]].subscribe(s),
                Ae = h.length;
              h.push(s, Me), u && u.push(r, i.index, Ae, -(Ae + 1));
            }
        }
      }
      function _y(n, t, e, i) {
        try {
          return !1 !== e(i);
        } catch (r) {
          return I_(n, r), !1;
        }
      }
      function jd(n, t, e, i, r) {
        return function s(o) {
          if (o === Function) return i;
          const a = 2 & n.flags ? Rt(n.index, t) : t;
          0 == (32 & t[2]) && bd(a);
          let l = _y(t, 0, i, o),
            c = s.__ngNextListenerFn__;
          for (; c; ) (l = _y(t, 0, c, o) && l), (c = c.__ngNextListenerFn__);
          return r && !1 === l && (o.preventDefault(), (o.returnValue = !1)), l;
        };
      }
      function vi(n = 1) {
        return (function xS(n) {
          return (B.lFrame.contextLView = (function AS(n, t) {
            for (; n > 0; ) (t = t[15]), n--;
            return t;
          })(n, B.lFrame.contextLView))[8];
        })(n);
      }
      function TI(n, t) {
        let e = null;
        const i = (function PA(n) {
          const t = n.attrs;
          if (null != t) {
            const e = t.indexOf(5);
            if (0 == (1 & e)) return t[e + 1];
          }
          return null;
        })(n);
        for (let r = 0; r < t.length; r++) {
          const s = t[r];
          if ("*" !== s) {
            if (null === i ? Xg(n, s, !0) : VA(i, s)) return r;
          } else e = r;
        }
        return e;
      }
      function _n(n) {
        const t = D()[16][6];
        if (!t.projection) {
          const i = (t.projection = zs(n ? n.length : 1, null)),
            r = i.slice();
          let s = t.child;
          for (; null !== s; ) {
            const o = n ? TI(s, n) : 0;
            null !== o &&
              (r[o] ? (r[o].projectionNext = s) : (i[o] = s), (r[o] = s)),
              (s = s.next);
          }
        }
      }
      function Xe(n, t = 0, e) {
        const i = D(),
          r = ie(),
          s = Pr(r, 20 + n, 16, null, e || null);
        null === s.projection && (s.projection = t),
          mu(),
          64 != (64 & s.flags) &&
            (function AA(n, t, e) {
              qg(t[G], 0, t, e, Lg(n, e, t), Hg(e.parent || t[6], e, t));
            })(r, i, s);
      }
      function xy(n, t, e, i, r) {
        const s = n[e + 1],
          o = null === t;
        let a = i ? mn(s) : Yn(s),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const u = n[a + 1];
          kI(n[a], t) && ((l = !0), (n[a + 1] = i ? sd(u) : id(u))),
            (a = i ? mn(u) : Yn(u));
        }
        l && (n[e + 1] = i ? id(s) : sd(s));
      }
      function kI(n, t) {
        return (
          null === n ||
          null == t ||
          (Array.isArray(n) ? n[1] : n) === t ||
          (!(!Array.isArray(n) || "string" != typeof t) && Ir(n, t) >= 0)
        );
      }
      function Ud(n, t, e) {
        return yn(n, t, e, !1), Ud;
      }
      function Je(n, t) {
        return yn(n, t, null, !0), Je;
      }
      function yn(n, t, e, i) {
        const r = D(),
          s = ie(),
          o = (function Kn(n) {
            const t = B.lFrame,
              e = t.bindingIndex;
            return (t.bindingIndex = t.bindingIndex + n), e;
          })(2);
        s.firstUpdatePass &&
          (function Py(n, t, e, i) {
            const r = n.data;
            if (null === r[e + 1]) {
              const s = r[_t()],
                o = (function Fy(n, t) {
                  return t >= n.expandoStartIndex;
                })(n, e);
              (function By(n, t) {
                return 0 != (n.flags & (t ? 16 : 32));
              })(s, i) &&
                null === t &&
                !o &&
                (t = !1),
                (t = (function HI(n, t, e, i) {
                  const r = _u(n);
                  let s = i ? t.residualClasses : t.residualStyles;
                  if (null === r)
                    0 === (i ? t.classBindings : t.styleBindings) &&
                      ((e = lo((e = $d(null, n, t, e, i)), t.attrs, i)),
                      (s = null));
                  else {
                    const o = t.directiveStylingLast;
                    if (-1 === o || n[o] !== r)
                      if (((e = $d(r, n, t, e, i)), null === s)) {
                        let l = (function UI(n, t, e) {
                          const i = e ? t.classBindings : t.styleBindings;
                          if (0 !== Yn(i)) return n[mn(i)];
                        })(n, t, i);
                        void 0 !== l &&
                          Array.isArray(l) &&
                          ((l = $d(null, n, t, l[1], i)),
                          (l = lo(l, t.attrs, i)),
                          (function $I(n, t, e, i) {
                            n[mn(e ? t.classBindings : t.styleBindings)] = i;
                          })(n, t, i, l));
                      } else
                        s = (function zI(n, t, e) {
                          let i;
                          const r = t.directiveEnd;
                          for (let s = 1 + t.directiveStylingLast; s < r; s++)
                            i = lo(i, n[s].hostAttrs, e);
                          return lo(i, t.attrs, e);
                        })(n, t, i);
                  }
                  return (
                    void 0 !== s &&
                      (i ? (t.residualClasses = s) : (t.residualStyles = s)),
                    e
                  );
                })(r, s, t, i)),
                (function II(n, t, e, i, r, s) {
                  let o = s ? t.classBindings : t.styleBindings,
                    a = mn(o),
                    l = Yn(o);
                  n[i] = e;
                  let u,
                    c = !1;
                  if (Array.isArray(e)) {
                    const d = e;
                    (u = d[1]), (null === u || Ir(d, u) > 0) && (c = !0);
                  } else u = e;
                  if (r)
                    if (0 !== l) {
                      const h = mn(n[a + 1]);
                      (n[i + 1] = $a(h, a)),
                        0 !== h && (n[h + 1] = rd(n[h + 1], i)),
                        (n[a + 1] = (function UA(n, t) {
                          return (131071 & n) | (t << 17);
                        })(n[a + 1], i));
                    } else
                      (n[i + 1] = $a(a, 0)),
                        0 !== a && (n[a + 1] = rd(n[a + 1], i)),
                        (a = i);
                  else
                    (n[i + 1] = $a(l, 0)),
                      0 === a ? (a = i) : (n[l + 1] = rd(n[l + 1], i)),
                      (l = i);
                  c && (n[i + 1] = id(n[i + 1])),
                    xy(n, u, i, !0),
                    xy(n, u, i, !1),
                    (function RI(n, t, e, i, r) {
                      const s = r ? n.residualClasses : n.residualStyles;
                      null != s &&
                        "string" == typeof t &&
                        Ir(s, t) >= 0 &&
                        (e[i + 1] = sd(e[i + 1]));
                    })(t, u, n, i, s),
                    (o = $a(a, l)),
                    s ? (t.classBindings = o) : (t.styleBindings = o);
                })(r, s, t, e, o, i);
            }
          })(s, n, o, i),
          t !== U &&
            ht(r, o, t) &&
            (function Ly(n, t, e, i, r, s, o, a) {
              if (!(3 & t.type)) return;
              const l = n.data,
                c = l[a + 1];
              tl(
                (function i_(n) {
                  return 1 == (1 & n);
                })(c)
                  ? Vy(l, t, e, r, Yn(c), o)
                  : void 0
              ) ||
                (tl(s) ||
                  ((function n_(n) {
                    return 2 == (2 & n);
                  })(c) &&
                    (s = Vy(l, null, e, r, a, o))),
                (function IA(n, t, e, i, r) {
                  const s = Ie(n);
                  if (t)
                    r
                      ? s
                        ? n.addClass(e, i)
                        : e.classList.add(i)
                      : s
                      ? n.removeClass(e, i)
                      : e.classList.remove(i);
                  else {
                    let o = -1 === i.indexOf("-") ? void 0 : Pt.DashCase;
                    if (null == r)
                      s ? n.removeStyle(e, i, o) : e.style.removeProperty(i);
                    else {
                      const a =
                        "string" == typeof r && r.endsWith("!important");
                      a && ((r = r.slice(0, -10)), (o |= Pt.Important)),
                        s
                          ? n.setStyle(e, i, r, o)
                          : e.style.setProperty(i, r, a ? "important" : "");
                    }
                  }
                })(
                  i,
                  o,
                  (function ya(n, t) {
                    return Be(t[n]);
                  })(_t(), e),
                  r,
                  s
                ));
            })(
              s,
              s.data[_t()],
              r,
              r[G],
              n,
              (r[o + 1] = (function qI(n, t) {
                return (
                  null == n ||
                    ("string" == typeof t
                      ? (n += t)
                      : "object" == typeof n && (n = ue(Ft(n)))),
                  n
                );
              })(t, e)),
              i,
              o
            );
      }
      function $d(n, t, e, i, r) {
        let s = null;
        const o = e.directiveEnd;
        let a = e.directiveStylingLast;
        for (
          -1 === a ? (a = e.directiveStart) : a++;
          a < o && ((s = t[a]), (i = lo(i, s.hostAttrs, r)), s !== n);

        )
          a++;
        return null !== n && (e.directiveStylingLast = a), i;
      }
      function lo(n, t, e) {
        const i = e ? 1 : 2;
        let r = -1;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const o = t[s];
            "number" == typeof o
              ? (r = o)
              : r === i &&
                (Array.isArray(n) || (n = void 0 === n ? [] : ["", n]),
                kt(n, o, !!e || t[++s]));
          }
        return void 0 === n ? null : n;
      }
      function Vy(n, t, e, i, r, s) {
        const o = null === t;
        let a;
        for (; r > 0; ) {
          const l = n[r],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            d = null === u;
          let h = e[r + 1];
          h === U && (h = d ? ge : void 0);
          let f = d ? Au(h, i) : u === i ? h : void 0;
          if ((c && !tl(f) && (f = Au(l, i)), tl(f) && ((a = f), o))) return a;
          const p = n[r + 1];
          r = o ? mn(p) : Yn(p);
        }
        if (null !== t) {
          let l = s ? t.residualClasses : t.residualStyles;
          null != l && (a = Au(l, i));
        }
        return a;
      }
      function tl(n) {
        return void 0 !== n;
      }
      function E(n, t = "") {
        const e = D(),
          i = ie(),
          r = n + 20,
          s = i.firstCreatePass ? Pr(i, r, 1, t, null) : i.data[r],
          o = (e[r] = (function Qu(n, t) {
            return Ie(n) ? n.createText(t) : n.createTextNode(t);
          })(e[G], t));
        Ha(i, e, o, s), An(s, !1);
      }
      function Gd(n, t, e) {
        const i = D();
        return ht(i, wr(), t) && Lt(ie(), Re(), i, n, t, i[G], e, !0), Gd;
      }
      function nl(n, t, e) {
        const i = D();
        if (ht(i, wr(), t)) {
          const s = ie(),
            o = Re();
          Lt(s, o, i, n, t, T_(_u(s.data), o, i), e, !0);
        }
        return nl;
      }
      const qi = void 0;
      var fR = [
        "en",
        [["a", "p"], ["AM", "PM"], qi],
        [["AM", "PM"], qi, qi],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        qi,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        qi,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", qi, "{1} 'at' {0}", qi],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function hR(n) {
          const e = Math.floor(Math.abs(n)),
            i = n.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === i ? 1 : 5;
        },
      ];
      let Xr = {};
      function sv(n) {
        return (
          n in Xr ||
            (Xr[n] =
              pe.ng &&
              pe.ng.common &&
              pe.ng.common.locales &&
              pe.ng.common.locales[n]),
          Xr[n]
        );
      }
      var x = (() => (
        ((x = x || {})[(x.LocaleId = 0)] = "LocaleId"),
        (x[(x.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
        (x[(x.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
        (x[(x.DaysFormat = 3)] = "DaysFormat"),
        (x[(x.DaysStandalone = 4)] = "DaysStandalone"),
        (x[(x.MonthsFormat = 5)] = "MonthsFormat"),
        (x[(x.MonthsStandalone = 6)] = "MonthsStandalone"),
        (x[(x.Eras = 7)] = "Eras"),
        (x[(x.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
        (x[(x.WeekendRange = 9)] = "WeekendRange"),
        (x[(x.DateFormat = 10)] = "DateFormat"),
        (x[(x.TimeFormat = 11)] = "TimeFormat"),
        (x[(x.DateTimeFormat = 12)] = "DateTimeFormat"),
        (x[(x.NumberSymbols = 13)] = "NumberSymbols"),
        (x[(x.NumberFormats = 14)] = "NumberFormats"),
        (x[(x.CurrencyCode = 15)] = "CurrencyCode"),
        (x[(x.CurrencySymbol = 16)] = "CurrencySymbol"),
        (x[(x.CurrencyName = 17)] = "CurrencyName"),
        (x[(x.Currencies = 18)] = "Currencies"),
        (x[(x.Directionality = 19)] = "Directionality"),
        (x[(x.PluralCase = 20)] = "PluralCase"),
        (x[(x.ExtraData = 21)] = "ExtraData"),
        x
      ))();
      const il = "en-US";
      let ov = il;
      function Kd(n, t, e, i, r) {
        if (((n = z(n)), Array.isArray(n)))
          for (let s = 0; s < n.length; s++) Kd(n[s], t, e, i, r);
        else {
          const s = ie(),
            o = D();
          let a = Br(n) ? n : z(n.provide),
            l = N_(n);
          const c = Ge(),
            u = 1048575 & c.providerIndexes,
            d = c.directiveStart,
            h = c.providerIndexes >> 20;
          if (Br(n) || !n.multi) {
            const f = new Vs(l, r, y),
              p = Yd(a, t, r ? u : u + h, d);
            -1 === p
              ? (Ra(js(c, o), s, a),
                Qd(s, n, t.length),
                t.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                e.push(f),
                o.push(f))
              : ((e[p] = f), (o[p] = f));
          } else {
            const f = Yd(a, t, u + h, d),
              p = Yd(a, t, u, u + h),
              m = f >= 0 && e[f],
              b = p >= 0 && e[p];
            if ((r && !b) || (!r && !m)) {
              Ra(js(c, o), s, a);
              const w = (function hk(n, t, e, i, r) {
                const s = new Vs(n, e, y);
                return (
                  (s.multi = []),
                  (s.index = t),
                  (s.componentProviders = 0),
                  Iv(s, r, i && !e),
                  s
                );
              })(r ? dk : uk, e.length, r, i, l);
              !r && b && (e[p].providerFactory = w),
                Qd(s, n, t.length, 0),
                t.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                e.push(w),
                o.push(w);
            } else Qd(s, n, f > -1 ? f : p, Iv(e[r ? p : f], l, !r && i));
            !r && i && b && e[p].componentProviders++;
          }
        }
      }
      function Qd(n, t, e, i) {
        const r = Br(t),
          s = (function PT(n) {
            return !!n.useClass;
          })(t);
        if (r || s) {
          const l = (s ? z(t.useClass) : t).prototype.ngOnDestroy;
          if (l) {
            const c = n.destroyHooks || (n.destroyHooks = []);
            if (!r && t.multi) {
              const u = c.indexOf(e);
              -1 === u ? c.push(e, [i, l]) : c[u + 1].push(i, l);
            } else c.push(e, l);
          }
        }
      }
      function Iv(n, t, e) {
        return e && n.componentProviders++, n.multi.push(t) - 1;
      }
      function Yd(n, t, e, i) {
        for (let r = e; r < i; r++) if (t[r] === n) return r;
        return -1;
      }
      function uk(n, t, e, i) {
        return Zd(this.multi, []);
      }
      function dk(n, t, e, i) {
        const r = this.multi;
        let s;
        if (this.providerFactory) {
          const o = this.providerFactory.componentProviders,
            a = Hs(e, e[1], this.providerFactory.index, i);
          (s = a.slice(0, o)), Zd(r, s);
          for (let l = o; l < a.length; l++) s.push(a[l]);
        } else (s = []), Zd(r, s);
        return s;
      }
      function Zd(n, t) {
        for (let e = 0; e < n.length; e++) t.push((0, n[e])());
        return t;
      }
      function ce(n, t = []) {
        return (e) => {
          e.providersResolver = (i, r) =>
            (function ck(n, t, e) {
              const i = ie();
              if (i.firstCreatePass) {
                const r = fn(n);
                Kd(e, i.data, i.blueprint, r, !0),
                  Kd(t, i.data, i.blueprint, r, !1);
              }
            })(i, r ? r(n) : n, t);
        };
      }
      class Rv {}
      class mk {
        resolveComponentFactory(t) {
          throw (function pk(n) {
            const t = Error(
              `No component factory found for ${ue(
                n
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = n), t;
          })(t);
        }
      }
      let bi = (() => {
        class n {}
        return (n.NULL = new mk()), n;
      })();
      function gk() {
        return es(Ge(), D());
      }
      function es(n, t) {
        return new _e(Zt(n, t));
      }
      let _e = (() => {
        class n {
          constructor(e) {
            this.nativeElement = e;
          }
        }
        return (n.__NG_ELEMENT_ID__ = gk), n;
      })();
      function _k(n) {
        return n instanceof _e ? n.nativeElement : n;
      }
      class po {}
      let bk = (() => {
        class n {}
        return (
          (n.ɵprov = R({ token: n, providedIn: "root", factory: () => null })),
          n
        );
      })();
      class Ki {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const Ck = new Ki("13.1.3"),
        Xd = {};
      function ll(n, t, e, i, r = !1) {
        for (; null !== e; ) {
          const s = t[e.index];
          if ((null !== s && i.push(Be(s)), hn(s)))
            for (let a = 10; a < s.length; a++) {
              const l = s[a],
                c = l[1].firstChild;
              null !== c && ll(l[1], l, c, i);
            }
          const o = e.type;
          if (8 & o) ll(n, t, e.child, i);
          else if (32 & o) {
            const a = Wu(e, t);
            let l;
            for (; (l = a()); ) i.push(l);
          } else if (16 & o) {
            const a = Gg(t, e);
            if (Array.isArray(a)) i.push(...a);
            else {
              const l = eo(t[16]);
              ll(l[1], l, a, i, !0);
            }
          }
          e = r ? e.projectionNext : e.next;
        }
        return i;
      }
      class mo {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            e = t[1];
          return ll(e, t, e.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (hn(t)) {
              const e = t[8],
                i = e ? e.indexOf(this) : -1;
              i > -1 && (Zu(t, i), Oa(e, i));
            }
            this._attachedToViewContainer = !1;
          }
          Ng(this._lView[1], this._lView);
        }
        onDestroy(t) {
          __(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          bd(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          wd(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function ET(n, t, e) {
            Ca(!0);
            try {
              wd(n, t, e);
            } finally {
              Ca(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef) throw new ne(902, "");
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function bA(n, t) {
              to(n, t, t[G], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new ne(902, "");
          this._appRef = t;
        }
      }
      class wk extends mo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          S_(this._view);
        }
        checkNoChanges() {
          !(function MT(n) {
            Ca(!0);
            try {
              S_(n);
            } finally {
              Ca(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      class Ov extends bi {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = ct(t);
          return new Jd(e, this.ngModule);
        }
      }
      function Fv(n) {
        const t = [];
        for (let e in n)
          n.hasOwnProperty(e) && t.push({ propName: n[e], templateName: e });
        return t;
      }
      const Ek = new A("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Ag,
      });
      class Jd extends Rv {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = (function jA(n) {
              return n.map(BA).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return Fv(this.componentDef.inputs);
        }
        get outputs() {
          return Fv(this.componentDef.outputs);
        }
        create(t, e, i, r) {
          const s = (r = r || this.ngModule)
              ? (function Mk(n, t) {
                  return {
                    get: (e, i, r) => {
                      const s = n.get(e, Xd, r);
                      return s !== Xd || i === Xd ? s : t.get(e, i, r);
                    },
                  };
                })(t, r.injector)
              : t,
            o = s.get(po, Mm),
            a = s.get(bk, null),
            l = o.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            u = i
              ? (function g_(n, t, e) {
                  if (Ie(n)) return n.selectRootElement(t, e === un.ShadowDom);
                  let i = "string" == typeof t ? n.querySelector(t) : t;
                  return (i.textContent = ""), i;
                })(l, i, this.componentDef.encapsulation)
              : Yu(
                  o.createRenderer(null, this.componentDef),
                  c,
                  (function Dk(n) {
                    const t = n.toLowerCase();
                    return "svg" === t
                      ? "http://www.w3.org/2000/svg"
                      : "math" === t
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(c)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            h = (function K_(n, t) {
              return {
                components: [],
                scheduler: n || Ag,
                clean: ST,
                playerHandler: t || null,
                flags: 0,
              };
            })(),
            f = Wa(0, null, null, 1, 0, null, null, null, null, null),
            p = no(null, f, h, d, null, null, o, l, a, s);
          let m, b;
          wa(p);
          try {
            const w = (function W_(n, t, e, i, r, s) {
              const o = e[1];
              e[20] = n;
              const l = Pr(o, 20, 2, "#host", null),
                c = (l.mergedAttrs = t.hostAttrs);
              null !== c &&
                (Ka(l, c, !0),
                null !== n &&
                  (xa(r, n, c),
                  null !== l.classes && nd(r, n, l.classes),
                  null !== l.styles && Kg(r, n, l.styles)));
              const u = i.createRenderer(n, t),
                d = no(
                  e,
                  p_(t),
                  null,
                  t.onPush ? 64 : 16,
                  e[20],
                  l,
                  i,
                  u,
                  s || null,
                  null
                );
              return (
                o.firstCreatePass &&
                  (Ra(js(l, e), o, t.type), w_(o, l), D_(l, e.length, 1)),
                qa(e, d),
                (e[20] = d)
              );
            })(u, this.componentDef, p, o, l);
            if (u)
              if (i) xa(l, u, ["ng-version", Ck.full]);
              else {
                const { attrs: v, classes: M } = (function HA(n) {
                  const t = [],
                    e = [];
                  let i = 1,
                    r = 2;
                  for (; i < n.length; ) {
                    let s = n[i];
                    if ("string" == typeof s)
                      2 === r
                        ? "" !== s && t.push(s, n[++i])
                        : 8 === r && e.push(s);
                    else {
                      if (!pn(r)) break;
                      r = s;
                    }
                    i++;
                  }
                  return { attrs: t, classes: e };
                })(this.componentDef.selectors[0]);
                v && xa(l, u, v), M && M.length > 0 && nd(l, u, M.join(" "));
              }
            if (((b = du(f, 20)), void 0 !== e)) {
              const v = (b.projection = []);
              for (let M = 0; M < this.ngContentSelectors.length; M++) {
                const T = e[M];
                v.push(null != T ? Array.from(T) : null);
              }
            }
            (m = (function q_(n, t, e, i, r) {
              const s = e[1],
                o = (function lT(n, t, e) {
                  const i = Ge();
                  n.firstCreatePass &&
                    (e.providersResolver && e.providersResolver(e),
                    E_(n, i, t, Nr(n, t, 1, null), e));
                  const r = Hs(t, n, i.directiveStart, i);
                  dt(r, t);
                  const s = Zt(i, t);
                  return s && dt(s, t), r;
                })(s, e, t);
              if (
                (i.components.push(o),
                (n[8] = o),
                r && r.forEach((l) => l(o, t)),
                t.contentQueries)
              ) {
                const l = Ge();
                t.contentQueries(1, o, l.directiveStart);
              }
              const a = Ge();
              return (
                !s.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (pi(a.index),
                  b_(e[1], a, 0, a.directiveStart, a.directiveEnd, t),
                  C_(t, o)),
                o
              );
            })(w, this.componentDef, p, h, [WT])),
              io(f, p, null);
          } finally {
            Da();
          }
          return new xk(this.componentType, m, es(b, p), p, b);
        }
      }
      class xk extends class fk {} {
        constructor(t, e, i, r, s) {
          super(),
            (this.location = i),
            (this._rootLView = r),
            (this._tNode = s),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new wk(r)),
            (this.componentType = t);
        }
        get injector() {
          return new Mr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      class Jn {}
      class Pv {}
      const ts = new Map();
      class Vv extends Jn {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Ov(this));
          const i = Kt(t);
          (this._bootstrapComponents = kn(i.bootstrap)),
            (this._r3Injector = P_(
              t,
              e,
              [
                { provide: Jn, useValue: this },
                { provide: bi, useValue: this.componentFactoryResolver },
              ],
              ue(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = De.THROW_IF_NOT_FOUND, i = j.Default) {
          return t === De || t === Jn || t === Ed
            ? this
            : this._r3Injector.get(t, e, i);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((e) => e()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class eh extends Pv {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== Kt(t) &&
              (function Tk(n) {
                const t = new Set();
                !(function e(i) {
                  const r = Kt(i, !0),
                    s = r.id;
                  null !== s &&
                    ((function Nv(n, t, e) {
                      if (t && t !== e)
                        throw new Error(
                          `Duplicate module registered for ${n} - ${ue(
                            t
                          )} vs ${ue(t.name)}`
                        );
                    })(s, ts.get(s), i),
                    ts.set(s, i));
                  const o = kn(r.imports);
                  for (const a of o) t.has(a) || (t.add(a), e(a));
                })(n);
              })(t);
        }
        create(t) {
          return new Vv(this.moduleType, t);
        }
      }
      function th(n) {
        return (t) => {
          setTimeout(n, void 0, t);
        };
      }
      const ee = class qk extends K {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, i) {
          var r, s, o;
          let a = t,
            l = e || (() => null),
            c = i;
          if (t && "object" == typeof t) {
            const d = t;
            (a = null === (r = d.next) || void 0 === r ? void 0 : r.bind(d)),
              (l = null === (s = d.error) || void 0 === s ? void 0 : s.bind(d)),
              (c =
                null === (o = d.complete) || void 0 === o ? void 0 : o.bind(d));
          }
          this.__isAsync && ((l = th(l)), a && (a = th(a)), c && (c = th(c)));
          const u = super.subscribe({ next: a, error: l, complete: c });
          return t instanceof Ve && t.add(u), u;
        }
      };
      function Kk() {
        return this._results[jr()]();
      }
      class ns {
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const e = jr(),
            i = ns.prototype;
          i[e] || (i[e] = Kk);
        }
        get changes() {
          return this._changes || (this._changes = new ee());
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, e) {
          const i = this;
          i.dirty = !1;
          const r = Xt(t);
          (this._changesDetected = !(function QS(n, t, e) {
            if (n.length !== t.length) return !1;
            for (let i = 0; i < n.length; i++) {
              let r = n[i],
                s = t[i];
              if ((e && ((r = e(r)), (s = e(s))), s !== r)) return !1;
            }
            return !0;
          })(i._results, r, e)) &&
            ((i._results = r),
            (i.length = r.length),
            (i.last = r[this.length - 1]),
            (i.first = r[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      Symbol;
      let en = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = Zk), n;
      })();
      const Qk = en,
        Yk = class extends Qk {
          constructor(t, e, i) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = e),
              (this.elementRef = i);
          }
          createEmbeddedView(t) {
            const e = this._declarationTContainer.tViews,
              i = no(
                this._declarationLView,
                e,
                t,
                16,
                null,
                e.declTNode,
                null,
                null,
                null,
                null
              );
            i[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (i[19] = s.createEmbeddedView(e)),
              io(e, i, t),
              new mo(i)
            );
          }
        };
      function Zk() {
        return cl(Ge(), D());
      }
      function cl(n, t) {
        return 4 & n.type ? new Yk(t, n, es(n, t)) : null;
      }
      let Vt = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = Xk), n;
      })();
      function Xk() {
        return Wv(Ge(), D());
      }
      const Jk = Vt,
        zv = class extends Jk {
          constructor(t, e, i) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = e),
              (this._hostLView = i);
          }
          get element() {
            return es(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Mr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Ia(this._hostTNode, this._hostLView);
            if (Hm(t)) {
              const e = Er(t, this._hostLView),
                i = Dr(t);
              return new Mr(e[1].data[i + 8], e);
            }
            return new Mr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const e = Gv(this._lContainer);
            return (null !== e && e[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, e, i) {
            const r = t.createEmbeddedView(e || {});
            return this.insert(r, i), r;
          }
          createComponent(t, e, i, r, s) {
            const o =
              t &&
              !(function $s(n) {
                return "function" == typeof n;
              })(t);
            let a;
            if (o) a = e;
            else {
              const d = e || {};
              (a = d.index),
                (i = d.injector),
                (r = d.projectableNodes),
                (s = d.ngModuleRef);
            }
            const l = o ? t : new Jd(ct(t)),
              c = i || this.parentInjector;
            if (!s && null == l.ngModule && c) {
              const d = c.get(Jn, null);
              d && (s = d);
            }
            const u = l.create(c, r, void 0, s);
            return this.insert(u.hostView, a), u;
          }
          insert(t, e) {
            const i = t._lView,
              r = i[1];
            if (
              (function gS(n) {
                return hn(n[3]);
              })(i)
            ) {
              const u = this.indexOf(t);
              if (-1 !== u) this.detach(u);
              else {
                const d = i[3],
                  h = new zv(d, d[6], d[3]);
                h.detach(h.indexOf(t));
              }
            }
            const s = this._adjustIndex(e),
              o = this._lContainer;
            !(function wA(n, t, e, i) {
              const r = 10 + i,
                s = e.length;
              i > 0 && (e[r - 1][4] = t),
                i < s - 10
                  ? ((t[4] = e[r]), Zm(e, 10 + i, t))
                  : (e.push(t), (t[4] = null)),
                (t[3] = e);
              const o = t[17];
              null !== o &&
                e !== o &&
                (function DA(n, t) {
                  const e = n[9];
                  t[16] !== t[3][3][16] && (n[2] = !0),
                    null === e ? (n[9] = [t]) : e.push(t);
                })(o, t);
              const a = t[19];
              null !== a && a.insertView(n), (t[2] |= 128);
            })(r, i, o, s);
            const a = ed(s, o),
              l = i[G],
              c = ja(l, o[7]);
            return (
              null !== c &&
                (function vA(n, t, e, i, r, s) {
                  (i[0] = r), (i[6] = t), to(n, i, e, 1, r, s);
                })(r, o[6], l, i, c, a),
              t.attachToViewContainerRef(),
              Zm(nh(o), s, t),
              t
            );
          }
          move(t, e) {
            return this.insert(t, e);
          }
          indexOf(t) {
            const e = Gv(this._lContainer);
            return null !== e ? e.indexOf(t) : -1;
          }
          remove(t) {
            const e = this._adjustIndex(t, -1),
              i = Zu(this._lContainer, e);
            i && (Oa(nh(this._lContainer), e), Ng(i[1], i));
          }
          detach(t) {
            const e = this._adjustIndex(t, -1),
              i = Zu(this._lContainer, e);
            return i && null != Oa(nh(this._lContainer), e) ? new mo(i) : null;
          }
          _adjustIndex(t, e = 0) {
            return null == t ? this.length + e : t;
          }
        };
      function Gv(n) {
        return n[8];
      }
      function nh(n) {
        return n[8] || (n[8] = []);
      }
      function Wv(n, t) {
        let e;
        const i = t[n.index];
        if (hn(i)) e = i;
        else {
          let r;
          if (8 & n.type) r = Be(i);
          else {
            const s = t[G];
            r = s.createComment("");
            const o = Zt(n, t);
            Gi(
              s,
              ja(s, o),
              r,
              (function xA(n, t) {
                return Ie(n) ? n.nextSibling(t) : t.nextSibling;
              })(s, o),
              !1
            );
          }
          (t[n.index] = e = M_(i, t, r, n)), qa(t, e);
        }
        return new zv(e, n, t);
      }
      class ih {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new ih(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class rh {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const i =
                null !== t.contentQueries ? t.contentQueries[0] : e.length,
              r = [];
            for (let s = 0; s < i; s++) {
              const o = e.getByIndex(s);
              r.push(this.queries[o.indexInDeclarationView].clone());
            }
            return new rh(r);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++)
            null !== Zv(t, e).matches && this.queries[e].setDirty();
        }
      }
      class qv {
        constructor(t, e, i = null) {
          (this.predicate = t), (this.flags = e), (this.read = i);
        }
      }
      class sh {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, e) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].elementStart(t, e);
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++)
            this.queries[e].elementEnd(t);
        }
        embeddedTView(t) {
          let e = null;
          for (let i = 0; i < this.length; i++) {
            const r = null !== e ? e.length : 0,
              s = this.getByIndex(i).embeddedTView(t, r);
            s &&
              ((s.indexInDeclarationView = i),
              null !== e ? e.push(s) : (e = [s]));
          }
          return null !== e ? new sh(e) : null;
        }
        template(t, e) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].template(t, e);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class oh {
        constructor(t, e = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, e) {
          this.elementStart(t, e);
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, e),
              new oh(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const e = this._declarationNodeIndex;
            let i = t.parent;
            for (; null !== i && 8 & i.type && i.index !== e; ) i = i.parent;
            return e === (null !== i ? i.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, e) {
          const i = this.metadata.predicate;
          if (Array.isArray(i))
            for (let r = 0; r < i.length; r++) {
              const s = i[r];
              this.matchTNodeWithReadOption(t, e, nO(e, s)),
                this.matchTNodeWithReadOption(t, e, ka(e, t, s, !1, !1));
            }
          else
            i === en
              ? 4 & e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, ka(e, t, i, !1, !1));
        }
        matchTNodeWithReadOption(t, e, i) {
          if (null !== i) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === _e || r === Vt || (r === en && 4 & e.type))
                this.addMatch(e.index, -2);
              else {
                const s = ka(e, t, r, !1, !1);
                null !== s && this.addMatch(e.index, s);
              }
            else this.addMatch(e.index, i);
          }
        }
        addMatch(t, e) {
          null === this.matches
            ? (this.matches = [t, e])
            : this.matches.push(t, e);
        }
      }
      function nO(n, t) {
        const e = n.localNames;
        if (null !== e)
          for (let i = 0; i < e.length; i += 2) if (e[i] === t) return e[i + 1];
        return null;
      }
      function rO(n, t, e, i) {
        return -1 === e
          ? (function iO(n, t) {
              return 11 & n.type ? es(n, t) : 4 & n.type ? cl(n, t) : null;
            })(t, n)
          : -2 === e
          ? (function sO(n, t, e) {
              return e === _e
                ? es(t, n)
                : e === en
                ? cl(t, n)
                : e === Vt
                ? Wv(t, n)
                : void 0;
            })(n, t, i)
          : Hs(n, n[1], e, t);
      }
      function Kv(n, t, e, i) {
        const r = t[19].queries[i];
        if (null === r.matches) {
          const s = n.data,
            o = e.matches,
            a = [];
          for (let l = 0; l < o.length; l += 2) {
            const c = o[l];
            a.push(c < 0 ? null : rO(t, s[c], o[l + 1], e.metadata.read));
          }
          r.matches = a;
        }
        return r.matches;
      }
      function ah(n, t, e, i) {
        const r = n.queries.getByIndex(e),
          s = r.matches;
        if (null !== s) {
          const o = Kv(n, t, r, e);
          for (let a = 0; a < s.length; a += 2) {
            const l = s[a];
            if (l > 0) i.push(o[a / 2]);
            else {
              const c = s[a + 1],
                u = t[-l];
              for (let d = 10; d < u.length; d++) {
                const h = u[d];
                h[17] === h[3] && ah(h[1], h, c, i);
              }
              if (null !== u[9]) {
                const d = u[9];
                for (let h = 0; h < d.length; h++) {
                  const f = d[h];
                  ah(f[1], f, c, i);
                }
              }
            }
          }
        }
        return i;
      }
      function et(n) {
        const t = D(),
          e = ie(),
          i = km();
        yu(i + 1);
        const r = Zv(e, i);
        if (n.dirty && Sm(t) === (2 == (2 & r.metadata.flags))) {
          if (null === r.matches) n.reset([]);
          else {
            const s = r.crossesNgTemplate ? ah(e, t, i, []) : Kv(e, t, r, i);
            n.reset(s, _k), n.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function is(n, t, e) {
        const i = ie();
        i.firstCreatePass &&
          (Yv(i, new qv(n, t, e), -1),
          2 == (2 & t) && (i.staticViewQueries = !0)),
          Qv(i, D(), t);
      }
      function Bt(n, t, e, i) {
        const r = ie();
        if (r.firstCreatePass) {
          const s = Ge();
          Yv(r, new qv(t, e, i), s.index),
            (function aO(n, t) {
              const e = n.contentQueries || (n.contentQueries = []);
              t !== (e.length ? e[e.length - 1] : -1) &&
                e.push(n.queries.length - 1, t);
            })(r, n),
            2 == (2 & e) && (r.staticContentQueries = !0);
        }
        Qv(r, D(), e);
      }
      function tt() {
        return (function oO(n, t) {
          return n[19].queries[t].queryList;
        })(D(), km());
      }
      function Qv(n, t, e) {
        const i = new ns(4 == (4 & e));
        __(n, t, i, i.destroy),
          null === t[19] && (t[19] = new rh()),
          t[19].queries.push(new ih(i));
      }
      function Yv(n, t, e) {
        null === n.queries && (n.queries = new sh()),
          n.queries.track(new oh(t, e));
      }
      function Zv(n, t) {
        return n.queries.getByIndex(t);
      }
      function hl(...n) {}
      const fl = new A("Application Initializer");
      let ss = (() => {
        class n {
          constructor(e) {
            (this.appInits = e),
              (this.resolve = hl),
              (this.reject = hl),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((i, r) => {
                (this.resolve = i), (this.reject = r);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const e = [],
              i = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let r = 0; r < this.appInits.length; r++) {
                const s = this.appInits[r]();
                if (ao(s)) e.push(s);
                else if (Bd(s)) {
                  const o = new Promise((a, l) => {
                    s.subscribe({ complete: a, error: l });
                  });
                  e.push(o);
                }
              }
            Promise.all(e)
              .then(() => {
                i();
              })
              .catch((r) => {
                this.reject(r);
              }),
              0 === e.length && i(),
              (this.initialized = !0);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(fl, 8));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const vo = new A("AppId"),
        SO = {
          provide: vo,
          useFactory: function MO() {
            return `${fh()}${fh()}${fh()}`;
          },
          deps: [],
        };
      function fh() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const pb = new A("Platform Initializer"),
        pl = new A("Platform ID"),
        mb = new A("appBootstrapListener");
      let gb = (() => {
        class n {
          log(e) {
            console.log(e);
          }
          warn(e) {
            console.warn(e);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const ei = new A("LocaleId"),
        _b = new A("DefaultCurrencyCode");
      class xO {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      let ml = (() => {
        class n {
          compileModuleSync(e) {
            return new eh(e);
          }
          compileModuleAsync(e) {
            return Promise.resolve(this.compileModuleSync(e));
          }
          compileModuleAndAllComponentsSync(e) {
            const i = this.compileModuleSync(e),
              s = kn(Kt(e).declarations).reduce((o, a) => {
                const l = ct(a);
                return l && o.push(new Jd(l)), o;
              }, []);
            return new xO(i, s);
          }
          compileModuleAndAllComponentsAsync(e) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(e));
          }
          clearCache() {}
          clearCacheFor(e) {}
          getModuleId(e) {}
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const TO = (() => Promise.resolve(0))();
      function ph(n) {
        "undefined" == typeof Zone
          ? TO.then(() => {
              n && n.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", n);
      }
      class re {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
          shouldCoalesceRunChangeDetection: i = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ee(!1)),
            (this.onMicrotaskEmpty = new ee(!1)),
            (this.onStable = new ee(!1)),
            (this.onError = new ee(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const r = this;
          (r._nesting = 0),
            (r._outer = r._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !i && e),
            (r.shouldCoalesceRunChangeDetection = i),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function IO() {
              let n = pe.requestAnimationFrame,
                t = pe.cancelAnimationFrame;
              if ("undefined" != typeof Zone && n && t) {
                const e = n[Zone.__symbol__("OriginalDelegate")];
                e && (n = e);
                const i = t[Zone.__symbol__("OriginalDelegate")];
                i && (t = i);
              }
              return {
                nativeRequestAnimationFrame: n,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function OO(n) {
              const t = () => {
                !(function kO(n) {
                  n.isCheckStableRunning ||
                    -1 !== n.lastRequestAnimationFrameId ||
                    ((n.lastRequestAnimationFrameId =
                      n.nativeRequestAnimationFrame.call(pe, () => {
                        n.fakeTopEventTask ||
                          (n.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (n.lastRequestAnimationFrameId = -1),
                                gh(n),
                                (n.isCheckStableRunning = !0),
                                mh(n),
                                (n.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          n.fakeTopEventTask.invoke();
                      })),
                    gh(n));
                })(n);
              };
              n._inner = n._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (e, i, r, s, o, a) => {
                  try {
                    return yb(n), e.invokeTask(r, s, o, a);
                  } finally {
                    ((n.shouldCoalesceEventChangeDetection &&
                      "eventTask" === s.type) ||
                      n.shouldCoalesceRunChangeDetection) &&
                      t(),
                      vb(n);
                  }
                },
                onInvoke: (e, i, r, s, o, a, l) => {
                  try {
                    return yb(n), e.invoke(r, s, o, a, l);
                  } finally {
                    n.shouldCoalesceRunChangeDetection && t(), vb(n);
                  }
                },
                onHasTask: (e, i, r, s) => {
                  e.hasTask(r, s),
                    i === r &&
                      ("microTask" == s.change
                        ? ((n._hasPendingMicrotasks = s.microTask),
                          gh(n),
                          mh(n))
                        : "macroTask" == s.change &&
                          (n.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (e, i, r, s) => (
                  e.handleError(r, s),
                  n.runOutsideAngular(() => n.onError.emit(s)),
                  !1
                ),
              });
            })(r);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!re.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (re.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, e, i) {
          return this._inner.run(t, e, i);
        }
        runTask(t, e, i, r) {
          const s = this._inner,
            o = s.scheduleEventTask("NgZoneEvent: " + r, t, RO, hl, hl);
          try {
            return s.runTask(o, e, i);
          } finally {
            s.cancelTask(o);
          }
        }
        runGuarded(t, e, i) {
          return this._inner.runGuarded(t, e, i);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const RO = {};
      function mh(n) {
        if (0 == n._nesting && !n.hasPendingMicrotasks && !n.isStable)
          try {
            n._nesting++, n.onMicrotaskEmpty.emit(null);
          } finally {
            if ((n._nesting--, !n.hasPendingMicrotasks))
              try {
                n.runOutsideAngular(() => n.onStable.emit(null));
              } finally {
                n.isStable = !0;
              }
          }
      }
      function gh(n) {
        n.hasPendingMicrotasks = !!(
          n._hasPendingMicrotasks ||
          ((n.shouldCoalesceEventChangeDetection ||
            n.shouldCoalesceRunChangeDetection) &&
            -1 !== n.lastRequestAnimationFrameId)
        );
      }
      function yb(n) {
        n._nesting++,
          n.isStable && ((n.isStable = !1), n.onUnstable.emit(null));
      }
      function vb(n) {
        n._nesting--, mh(n);
      }
      class FO {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ee()),
            (this.onMicrotaskEmpty = new ee()),
            (this.onStable = new ee()),
            (this.onError = new ee());
        }
        run(t, e, i) {
          return t.apply(e, i);
        }
        runGuarded(t, e, i) {
          return t.apply(e, i);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, i, r) {
          return t.apply(e, i);
        }
      }
      let _h = (() => {
          class n {
            constructor(e) {
              (this._ngZone = e),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                e.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      re.assertNotInAngularZone(),
                        ph(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                ph(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let e = this._callbacks.pop();
                    clearTimeout(e.timeoutId), e.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let e = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (i) =>
                    !i.updateCb ||
                    !i.updateCb(e) ||
                    (clearTimeout(i.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((e) => ({
                    source: e.source,
                    creationLocation: e.creationLocation,
                    data: e.data,
                  }))
                : [];
            }
            addCallback(e, i, r) {
              let s = -1;
              i &&
                i > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (o) => o.timeoutId !== s
                  )),
                    e(this._didWork, this.getPendingTasks());
                }, i)),
                this._callbacks.push({ doneCb: e, timeoutId: s, updateCb: r });
            }
            whenStable(e, i, r) {
              if (r && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(e, i, r), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(e, i, r) {
              return [];
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(re));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        bb = (() => {
          class n {
            constructor() {
              (this._applications = new Map()), yh.addToWindow(this);
            }
            registerApplication(e, i) {
              this._applications.set(e, i);
            }
            unregisterApplication(e) {
              this._applications.delete(e);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(e) {
              return this._applications.get(e) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(e, i = !0) {
              return yh.findTestabilityInTree(this, e, i);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      class PO {
        addToWindow(t) {}
        findTestabilityInTree(t, e, i) {
          return null;
        }
      }
      let bn,
        yh = new PO();
      const Cb = new A("AllowMultipleToken");
      class wb {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function Db(n, t, e = []) {
        const i = `Platform: ${t}`,
          r = new A(i);
        return (s = []) => {
          let o = Eb();
          if (!o || o.injector.get(Cb, !1))
            if (n) n(e.concat(s).concat({ provide: r, useValue: !0 }));
            else {
              const a = e
                .concat(s)
                .concat(
                  { provide: r, useValue: !0 },
                  { provide: Md, useValue: "platform" }
                );
              !(function BO(n) {
                if (bn && !bn.destroyed && !bn.injector.get(Cb, !1))
                  throw new ne(400, "");
                bn = n.get(Mb);
                const t = n.get(pb, null);
                t && t.forEach((e) => e());
              })(De.create({ providers: a, name: i }));
            }
          return (function jO(n) {
            const t = Eb();
            if (!t) throw new ne(401, "");
            return t;
          })();
        };
      }
      function Eb() {
        return bn && !bn.destroyed ? bn : null;
      }
      let Mb = (() => {
        class n {
          constructor(e) {
            (this._injector = e),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(e, i) {
            const a = (function HO(n, t) {
                let e;
                return (
                  (e =
                    "noop" === n
                      ? new FO()
                      : ("zone.js" === n ? void 0 : n) ||
                        new re({
                          enableLongStackTrace: !1,
                          shouldCoalesceEventChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneRunCoalescing),
                        })),
                  e
                );
              })(i ? i.ngZone : void 0, {
                ngZoneEventCoalescing: (i && i.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (i && i.ngZoneRunCoalescing) || !1,
              }),
              l = [{ provide: re, useValue: a }];
            return a.run(() => {
              const c = De.create({
                  providers: l,
                  parent: this.injector,
                  name: e.moduleType.name,
                }),
                u = e.create(c),
                d = u.injector.get(Qn, null);
              if (!d) throw new ne(402, "");
              return (
                a.runOutsideAngular(() => {
                  const h = a.onError.subscribe({
                    next: (f) => {
                      d.handleError(f);
                    },
                  });
                  u.onDestroy(() => {
                    vh(this._modules, u), h.unsubscribe();
                  });
                }),
                (function UO(n, t, e) {
                  try {
                    const i = e();
                    return ao(i)
                      ? i.catch((r) => {
                          throw (
                            (t.runOutsideAngular(() => n.handleError(r)), r)
                          );
                        })
                      : i;
                  } catch (i) {
                    throw (t.runOutsideAngular(() => n.handleError(i)), i);
                  }
                })(d, a, () => {
                  const h = u.injector.get(ss);
                  return (
                    h.runInitializers(),
                    h.donePromise.then(
                      () => (
                        (function yR(n) {
                          Tt(n, "Expected localeId to be defined"),
                            "string" == typeof n &&
                              (ov = n.toLowerCase().replace(/_/g, "-"));
                        })(u.injector.get(ei, il) || il),
                        this._moduleDoBootstrap(u),
                        u
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(e, i = []) {
            const r = Sb({}, i);
            return (function LO(n, t, e) {
              const i = new eh(e);
              return Promise.resolve(i);
            })(0, 0, e).then((s) => this.bootstrapModuleFactory(s, r));
          }
          _moduleDoBootstrap(e) {
            const i = e.injector.get(os);
            if (e._bootstrapComponents.length > 0)
              e._bootstrapComponents.forEach((r) => i.bootstrap(r));
            else {
              if (!e.instance.ngDoBootstrap) throw new ne(403, "");
              e.instance.ngDoBootstrap(i);
            }
            this._modules.push(e);
          }
          onDestroy(e) {
            this._destroyListeners.push(e);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new ne(404, "");
            this._modules.slice().forEach((e) => e.destroy()),
              this._destroyListeners.forEach((e) => e()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(De));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function Sb(n, t) {
        return Array.isArray(t)
          ? t.reduce(Sb, n)
          : Object.assign(Object.assign({}, n), t);
      }
      let os = (() => {
        class n {
          constructor(e, i, r, s, o) {
            (this._zone = e),
              (this._injector = i),
              (this._exceptionHandler = r),
              (this._componentFactoryResolver = s),
              (this._initStatus = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const a = new he((c) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    c.next(this._stable), c.complete();
                  });
              }),
              l = new he((c) => {
                let u;
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    re.assertNotInAngularZone(),
                      ph(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), c.next(!0));
                      });
                  });
                });
                const d = this._zone.onUnstable.subscribe(() => {
                  re.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        c.next(!1);
                      }));
                });
                return () => {
                  u.unsubscribe(), d.unsubscribe();
                };
              });
            this.isStable = ca(a, l.pipe(lm()));
          }
          bootstrap(e, i) {
            if (!this._initStatus.done) throw new ne(405, "");
            let r;
            (r =
              e instanceof Rv
                ? e
                : this._componentFactoryResolver.resolveComponentFactory(e)),
              this.componentTypes.push(r.componentType);
            const s = (function VO(n) {
                return n.isBoundToModule;
              })(r)
                ? void 0
                : this._injector.get(Jn),
              a = r.create(De.NULL, [], i || r.selector, s),
              l = a.location.nativeElement,
              c = a.injector.get(_h, null),
              u = c && a.injector.get(bb);
            return (
              c && u && u.registerApplication(l, c),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  vh(this.components, a),
                  u && u.unregisterApplication(l);
              }),
              this._loadComponent(a),
              a
            );
          }
          tick() {
            if (this._runningTick) throw new ne(101, "");
            try {
              this._runningTick = !0;
              for (let e of this._views) e.detectChanges();
            } catch (e) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(e)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(e) {
            const i = e;
            this._views.push(i), i.attachToAppRef(this);
          }
          detachView(e) {
            const i = e;
            vh(this._views, i), i.detachFromAppRef();
          }
          _loadComponent(e) {
            this.attachView(e.hostView),
              this.tick(),
              this.components.push(e),
              this._injector
                .get(mb, [])
                .concat(this._bootstrapListeners)
                .forEach((r) => r(e));
          }
          ngOnDestroy() {
            this._views.slice().forEach((e) => e.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(re), C(De), C(Qn), C(bi), C(ss));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function vh(n, t) {
        const e = n.indexOf(t);
        e > -1 && n.splice(e, 1);
      }
      let Ab = !0,
        tn = (() => {
          class n {}
          return (n.__NG_ELEMENT_ID__ = GO), n;
        })();
      function GO(n) {
        return (function WO(n, t, e) {
          if (ga(n) && !e) {
            const i = Rt(n.index, t);
            return new mo(i, i);
          }
          return 47 & n.type ? new mo(t[16], t) : null;
        })(Ge(), D(), 16 == (16 & n));
      }
      class Pb {
        constructor() {}
        supports(t) {
          return so(t);
        }
        create(t) {
          return new XO(t);
        }
      }
      const ZO = (n, t) => t;
      class XO {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || ZO);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            i = this._removalsHead,
            r = 0,
            s = null;
          for (; e || i; ) {
            const o = !i || (e && e.currentIndex < Lb(i, r, s)) ? e : i,
              a = Lb(o, r, s),
              l = o.currentIndex;
            if (o === i) r--, (i = i._nextRemoved);
            else if (((e = e._next), null == o.previousIndex)) r++;
            else {
              s || (s = []);
              const c = a - r,
                u = l - r;
              if (c != u) {
                for (let h = 0; h < c; h++) {
                  const f = h < s.length ? s[h] : (s[h] = 0),
                    p = f + h;
                  u <= p && p < c && (s[h] = f + 1);
                }
                s[o.previousIndex] = u - c;
              }
            }
            a !== l && t(o, a, l);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !so(t))) throw new ne(900, "");
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let r,
            s,
            o,
            e = this._itHead,
            i = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (s = t[a]),
                (o = this._trackByFn(a, s)),
                null !== e && Object.is(e.trackById, o)
                  ? (i && (e = this._verifyReinsertion(e, s, o, a)),
                    Object.is(e.item, s) || this._addIdentityChange(e, s))
                  : ((e = this._mismatch(e, s, o, a)), (i = !0)),
                (e = e._next);
          } else
            (r = 0),
              (function nI(n, t) {
                if (Array.isArray(n))
                  for (let e = 0; e < n.length; e++) t(n[e]);
                else {
                  const e = n[jr()]();
                  let i;
                  for (; !(i = e.next()).done; ) t(i.value);
                }
              })(t, (a) => {
                (o = this._trackByFn(r, a)),
                  null !== e && Object.is(e.trackById, o)
                    ? (i && (e = this._verifyReinsertion(e, a, o, r)),
                      Object.is(e.item, a) || this._addIdentityChange(e, a))
                    : ((e = this._mismatch(e, a, o, r)), (i = !0)),
                  (e = e._next),
                  r++;
              }),
              (this.length = r);
          return this._truncate(e), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, i, r) {
          let s;
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(i, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, s, r))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(i, r))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, s, r))
              : (t = this._addAfter(new JO(e, i), s, r)),
            t
          );
        }
        _verifyReinsertion(t, e, i, r) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(i, null);
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, r))
              : t.currentIndex != r &&
                ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, i) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            s = t._nextRemoved;
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(t, e, i),
            this._addToMoves(t, i),
            t
          );
        }
        _moveAfter(t, e, i) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, i),
            this._addToMoves(t, i),
            t
          );
        }
        _addAfter(t, e, i) {
          return (
            this._insertAfter(t, e, i),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, i) {
          const r = null === e ? this._itHead : e._next;
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Nb()),
            this._linkedRecords.put(t),
            (t.currentIndex = i),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            i = t._next;
          return (
            null === e ? (this._itHead = i) : (e._next = i),
            null === i ? (this._itTail = e) : (i._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Nb()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class JO {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class eF {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let i;
          for (i = this._head; null !== i; i = i._nextDup)
            if (
              (null === e || e <= i.currentIndex) &&
              Object.is(i.trackById, t)
            )
              return i;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            i = t._nextDup;
          return (
            null === e ? (this._head = i) : (e._nextDup = i),
            null === i ? (this._tail = e) : (i._prevDup = e),
            null === this._head
          );
        }
      }
      class Nb {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let i = this.map.get(e);
          i || ((i = new eF()), this.map.set(e, i)), i.add(t);
        }
        get(t, e) {
          const r = this.map.get(t);
          return r ? r.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Lb(n, t, e) {
        const i = n.previousIndex;
        if (null === i) return i;
        let r = 0;
        return e && i < e.length && (r = e[i]), i + t + r;
      }
      class Vb {
        constructor() {}
        supports(t) {
          return t instanceof Map || Rd(t);
        }
        create() {
          return new tF();
        }
      }
      class tF {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Rd(t))) throw new ne(900, "");
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (i, r) => {
              if (e && e.key === r)
                this._maybeAddToChanges(e, i),
                  (this._appendAfter = e),
                  (e = e._next);
              else {
                const s = this._getOrCreateRecordForKey(r, i);
                e = this._insertBeforeOrAppend(e, s);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let i = e; null !== i; i = i._nextRemoved)
              i === this._mapHead && (this._mapHead = null),
                this._records.delete(i.key),
                (i._nextRemoved = i._next),
                (i.previousValue = i.currentValue),
                (i.currentValue = null),
                (i._prev = null),
                (i._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const i = t._prev;
            return (
              (e._next = t),
              (e._prev = i),
              (t._prev = e),
              i && (i._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const r = this._records.get(t);
            this._maybeAddToChanges(r, e);
            const s = r._prev,
              o = r._next;
            return (
              s && (s._next = o),
              o && (o._prev = s),
              (r._next = null),
              (r._prev = null),
              r
            );
          }
          const i = new nF(t);
          return (
            this._records.set(t, i),
            (i.currentValue = e),
            this._addToAdditions(i),
            i
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach((i) => e(t[i], i));
        }
      }
      class nF {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function Bb() {
        return new bo([new Pb()]);
      }
      let bo = (() => {
        class n {
          constructor(e) {
            this.factories = e;
          }
          static create(e, i) {
            if (null != i) {
              const r = i.factories.slice();
              e = e.concat(r);
            }
            return new n(e);
          }
          static extend(e) {
            return {
              provide: n,
              useFactory: (i) => n.create(e, i || Bb()),
              deps: [[n, new $i(), new Ot()]],
            };
          }
          find(e) {
            const i = this.factories.find((r) => r.supports(e));
            if (null != i) return i;
            throw new ne(901, "");
          }
        }
        return (n.ɵprov = R({ token: n, providedIn: "root", factory: Bb })), n;
      })();
      function jb() {
        return new as([new Vb()]);
      }
      let as = (() => {
        class n {
          constructor(e) {
            this.factories = e;
          }
          static create(e, i) {
            if (i) {
              const r = i.factories.slice();
              e = e.concat(r);
            }
            return new n(e);
          }
          static extend(e) {
            return {
              provide: n,
              useFactory: (i) => n.create(e, i || jb()),
              deps: [[n, new $i(), new Ot()]],
            };
          }
          find(e) {
            const i = this.factories.find((s) => s.supports(e));
            if (i) return i;
            throw new ne(901, "");
          }
        }
        return (n.ɵprov = R({ token: n, providedIn: "root", factory: jb })), n;
      })();
      const iF = [new Vb()],
        sF = new bo([new Pb()]),
        oF = new as(iF),
        aF = Db(null, "core", [
          { provide: pl, useValue: "unknown" },
          { provide: Mb, deps: [De] },
          { provide: bb, deps: [] },
          { provide: gb, deps: [] },
        ]),
        hF = [
          { provide: os, useClass: os, deps: [re, De, Qn, bi, ss] },
          {
            provide: Ek,
            deps: [re],
            useFactory: function fF(n) {
              let t = [];
              return (
                n.onStable.subscribe(() => {
                  for (; t.length; ) t.pop()();
                }),
                function (e) {
                  t.push(e);
                }
              );
            },
          },
          { provide: ss, useClass: ss, deps: [[new Ot(), fl]] },
          { provide: ml, useClass: ml, deps: [] },
          SO,
          {
            provide: bo,
            useFactory: function lF() {
              return sF;
            },
            deps: [],
          },
          {
            provide: as,
            useFactory: function cF() {
              return oF;
            },
            deps: [],
          },
          {
            provide: ei,
            useFactory: function uF(n) {
              return (
                n ||
                (function dF() {
                  return (
                    ("undefined" != typeof $localize && $localize.locale) || il
                  );
                })()
              );
            },
            deps: [[new Ks(ei), new Ot(), new $i()]],
          },
          { provide: _b, useValue: "USD" },
        ];
      let pF = (() => {
          class n {
            constructor(e) {}
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(os));
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({ providers: hF })),
            n
          );
        })(),
        _l = null;
      function Vn() {
        return _l;
      }
      const Z = new A("DocumentToken");
      let Yi = (() => {
        class n {
          historyGo(e) {
            throw new Error("Not implemented");
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = R({
            token: n,
            factory: function () {
              return (function yF() {
                return C(Hb);
              })();
            },
            providedIn: "platform",
          })),
          n
        );
      })();
      const vF = new A("Location Initialized");
      let Hb = (() => {
        class n extends Yi {
          constructor(e) {
            super(), (this._doc = e), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Vn().getBaseHref(this._doc);
          }
          onPopState(e) {
            const i = Vn().getGlobalEventTarget(this._doc, "window");
            return (
              i.addEventListener("popstate", e, !1),
              () => i.removeEventListener("popstate", e)
            );
          }
          onHashChange(e) {
            const i = Vn().getGlobalEventTarget(this._doc, "window");
            return (
              i.addEventListener("hashchange", e, !1),
              () => i.removeEventListener("hashchange", e)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(e) {
            this.location.pathname = e;
          }
          pushState(e, i, r) {
            Ub() ? this._history.pushState(e, i, r) : (this.location.hash = r);
          }
          replaceState(e, i, r) {
            Ub()
              ? this._history.replaceState(e, i, r)
              : (this.location.hash = r);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(e = 0) {
            this._history.go(e);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(Z));
          }),
          (n.ɵprov = R({
            token: n,
            factory: function () {
              return (function bF() {
                return new Hb(C(Z));
              })();
            },
            providedIn: "platform",
          })),
          n
        );
      })();
      function Ub() {
        return !!window.history.pushState;
      }
      function Eh(n, t) {
        if (0 == n.length) return t;
        if (0 == t.length) return n;
        let e = 0;
        return (
          n.endsWith("/") && e++,
          t.startsWith("/") && e++,
          2 == e ? n + t.substring(1) : 1 == e ? n + t : n + "/" + t
        );
      }
      function $b(n) {
        const t = n.match(/#|\?|$/),
          e = (t && t.index) || n.length;
        return n.slice(0, e - ("/" === n[e - 1] ? 1 : 0)) + n.slice(e);
      }
      function ti(n) {
        return n && "?" !== n[0] ? "?" + n : n;
      }
      let ls = (() => {
        class n {
          historyGo(e) {
            throw new Error("Not implemented");
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = R({
            token: n,
            factory: function () {
              return (function CF(n) {
                const t = C(Z).location;
                return new zb(C(Yi), (t && t.origin) || "");
              })();
            },
            providedIn: "root",
          })),
          n
        );
      })();
      const Mh = new A("appBaseHref");
      let zb = (() => {
          class n extends ls {
            constructor(e, i) {
              if (
                (super(),
                (this._platformLocation = e),
                (this._removeListenerFns = []),
                null == i && (i = this._platformLocation.getBaseHrefFromDOM()),
                null == i)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = i;
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(e) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(e),
                this._platformLocation.onHashChange(e)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(e) {
              return Eh(this._baseHref, e);
            }
            path(e = !1) {
              const i =
                  this._platformLocation.pathname +
                  ti(this._platformLocation.search),
                r = this._platformLocation.hash;
              return r && e ? `${i}${r}` : i;
            }
            pushState(e, i, r, s) {
              const o = this.prepareExternalUrl(r + ti(s));
              this._platformLocation.pushState(e, i, o);
            }
            replaceState(e, i, r, s) {
              const o = this.prepareExternalUrl(r + ti(s));
              this._platformLocation.replaceState(e, i, o);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(e = 0) {
              var i, r;
              null === (r = (i = this._platformLocation).historyGo) ||
                void 0 === r ||
                r.call(i, e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(Yi), C(Mh, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        wF = (() => {
          class n extends ls {
            constructor(e, i) {
              super(),
                (this._platformLocation = e),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != i && (this._baseHref = i);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(e) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(e),
                this._platformLocation.onHashChange(e)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(e = !1) {
              let i = this._platformLocation.hash;
              return null == i && (i = "#"), i.length > 0 ? i.substring(1) : i;
            }
            prepareExternalUrl(e) {
              const i = Eh(this._baseHref, e);
              return i.length > 0 ? "#" + i : i;
            }
            pushState(e, i, r, s) {
              let o = this.prepareExternalUrl(r + ti(s));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.pushState(e, i, o);
            }
            replaceState(e, i, r, s) {
              let o = this.prepareExternalUrl(r + ti(s));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.replaceState(e, i, o);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(e = 0) {
              var i, r;
              null === (r = (i = this._platformLocation).historyGo) ||
                void 0 === r ||
                r.call(i, e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(Yi), C(Mh, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Co = (() => {
          class n {
            constructor(e, i) {
              (this._subject = new ee()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = e);
              const r = this._platformStrategy.getBaseHref();
              (this._platformLocation = i),
                (this._baseHref = $b(Gb(r))),
                this._platformStrategy.onPopState((s) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: s.state,
                    type: s.type,
                  });
                });
            }
            path(e = !1) {
              return this.normalize(this._platformStrategy.path(e));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(e, i = "") {
              return this.path() == this.normalize(e + ti(i));
            }
            normalize(e) {
              return n.stripTrailingSlash(
                (function EF(n, t) {
                  return n && t.startsWith(n) ? t.substring(n.length) : t;
                })(this._baseHref, Gb(e))
              );
            }
            prepareExternalUrl(e) {
              return (
                e && "/" !== e[0] && (e = "/" + e),
                this._platformStrategy.prepareExternalUrl(e)
              );
            }
            go(e, i = "", r = null) {
              this._platformStrategy.pushState(r, "", e, i),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(e + ti(i)),
                  r
                );
            }
            replaceState(e, i = "", r = null) {
              this._platformStrategy.replaceState(r, "", e, i),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(e + ti(i)),
                  r
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            historyGo(e = 0) {
              var i, r;
              null === (r = (i = this._platformStrategy).historyGo) ||
                void 0 === r ||
                r.call(i, e);
            }
            onUrlChange(e) {
              this._urlChangeListeners.push(e),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((i) => {
                    this._notifyUrlChangeListeners(i.url, i.state);
                  }));
            }
            _notifyUrlChangeListeners(e = "", i) {
              this._urlChangeListeners.forEach((r) => r(e, i));
            }
            subscribe(e, i, r) {
              return this._subject.subscribe({
                next: e,
                error: i,
                complete: r,
              });
            }
          }
          return (
            (n.normalizeQueryParams = ti),
            (n.joinWithSlash = Eh),
            (n.stripTrailingSlash = $b),
            (n.ɵfac = function (e) {
              return new (e || n)(C(ls), C(Yi));
            }),
            (n.ɵprov = R({
              token: n,
              factory: function () {
                return (function DF() {
                  return new Co(C(ls), C(Yi));
                })();
              },
              providedIn: "root",
            })),
            n
          );
        })();
      function Gb(n) {
        return n.replace(/\/index.html$/, "");
      }
      var je = (() => (
        ((je = je || {})[(je.Zero = 0)] = "Zero"),
        (je[(je.One = 1)] = "One"),
        (je[(je.Two = 2)] = "Two"),
        (je[(je.Few = 3)] = "Few"),
        (je[(je.Many = 4)] = "Many"),
        (je[(je.Other = 5)] = "Other"),
        je
      ))();
      const RF = function rv(n) {
        return (function vt(n) {
          const t = (function pR(n) {
            return n.toLowerCase().replace(/_/g, "-");
          })(n);
          let e = sv(t);
          if (e) return e;
          const i = t.split("-")[0];
          if (((e = sv(i)), e)) return e;
          if ("en" === i) return fR;
          throw new Error(`Missing locale data for the locale "${n}".`);
        })(n)[x.PluralCase];
      };
      class xl {}
      let oP = (() => {
        class n extends xl {
          constructor(e) {
            super(), (this.locale = e);
          }
          getPluralCategory(e, i) {
            switch (RF(i || this.locale)(e)) {
              case je.Zero:
                return "zero";
              case je.One:
                return "one";
              case je.Two:
                return "two";
              case je.Few:
                return "few";
              case je.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(ei));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class uP {
        constructor(t, e, i, r) {
          (this.$implicit = t),
            (this.ngForOf = e),
            (this.index = i),
            (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let eC = (() => {
        class n {
          constructor(e, i, r) {
            (this._viewContainer = e),
              (this._template = i),
              (this._differs = r),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(e) {
            (this._ngForOf = e), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(e) {
            this._trackByFn = e;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(e) {
            e && (this._template = e);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const e = this._ngForOf;
              !this._differ &&
                e &&
                (this._differ = this._differs
                  .find(e)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const e = this._differ.diff(this._ngForOf);
              e && this._applyChanges(e);
            }
          }
          _applyChanges(e) {
            const i = this._viewContainer;
            e.forEachOperation((r, s, o) => {
              if (null == r.previousIndex)
                i.createEmbeddedView(
                  this._template,
                  new uP(r.item, this._ngForOf, -1, -1),
                  null === o ? void 0 : o
                );
              else if (null == o) i.remove(null === s ? void 0 : s);
              else if (null !== s) {
                const a = i.get(s);
                i.move(a, o), tC(a, r);
              }
            });
            for (let r = 0, s = i.length; r < s; r++) {
              const a = i.get(r).context;
              (a.index = r), (a.count = s), (a.ngForOf = this._ngForOf);
            }
            e.forEachIdentityChange((r) => {
              tC(i.get(r.currentIndex), r);
            });
          }
          static ngTemplateContextGuard(e, i) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(y(Vt), y(en), y(bo));
          }),
          (n.ɵdir = k({
            type: n,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          n
        );
      })();
      function tC(n, t) {
        n.context.$implicit = t.item;
      }
      let Al = (() => {
        class n {
          constructor(e, i) {
            (this._viewContainer = e),
              (this._context = new dP()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = i);
          }
          set ngIf(e) {
            (this._context.$implicit = this._context.ngIf = e),
              this._updateView();
          }
          set ngIfThen(e) {
            nC("ngIfThen", e),
              (this._thenTemplateRef = e),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(e) {
            nC("ngIfElse", e),
              (this._elseTemplateRef = e),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(e, i) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(y(Vt), y(en));
          }),
          (n.ɵdir = k({
            type: n,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          n
        );
      })();
      class dP {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function nC(n, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${n} must be a TemplateRef, but received '${ue(t)}'.`
          );
      }
      let Eo = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵmod = de({ type: n })),
          (n.ɵinj = le({ providers: [{ provide: xl, useClass: oP }] })),
          n
        );
      })();
      const sC = "browser";
      let UP = (() => {
        class n {}
        return (
          (n.ɵprov = R({
            token: n,
            providedIn: "root",
            factory: () => new $P(C(Z), window),
          })),
          n
        );
      })();
      class $P {
        constructor(t, e) {
          (this.document = t), (this.window = e), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const e = (function zP(n, t) {
            const e = n.getElementById(t) || n.getElementsByName(t)[0];
            if (e) return e;
            if (
              "function" == typeof n.createTreeWalker &&
              n.body &&
              (n.body.createShadowRoot || n.body.attachShadow)
            ) {
              const i = n.createTreeWalker(n.body, NodeFilter.SHOW_ELEMENT);
              let r = i.currentNode;
              for (; r; ) {
                const s = r.shadowRoot;
                if (s) {
                  const o =
                    s.getElementById(t) || s.querySelector(`[name="${t}"]`);
                  if (o) return o;
                }
                r = i.nextNode();
              }
            }
            return null;
          })(this.document, t);
          e && (this.scrollToElement(e), this.attemptFocus(e));
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            i = e.left + this.window.pageXOffset,
            r = e.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(i - s[0], r - s[1]);
        }
        attemptFocus(t) {
          return t.focus(), this.document.activeElement === t;
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              oC(this.window.history) ||
              oC(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch (t) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch (t) {
            return !1;
          }
        }
      }
      function oC(n) {
        return Object.getOwnPropertyDescriptor(n, "scrollRestoration");
      }
      class Vh extends class WP extends class _F {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function gF(n) {
            _l || (_l = n);
          })(new Vh());
        }
        onAndCancel(t, e, i) {
          return (
            t.addEventListener(e, i, !1),
            () => {
              t.removeEventListener(e, i, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const e = (function qP() {
            return (
              (Mo = Mo || document.querySelector("base")),
              Mo ? Mo.getAttribute("href") : null
            );
          })();
          return null == e
            ? null
            : (function KP(n) {
                (Tl = Tl || document.createElement("a")),
                  Tl.setAttribute("href", n);
                const t = Tl.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(e);
        }
        resetBaseElement() {
          Mo = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function aP(n, t) {
            t = encodeURIComponent(t);
            for (const e of n.split(";")) {
              const i = e.indexOf("="),
                [r, s] = -1 == i ? [e, ""] : [e.slice(0, i), e.slice(i + 1)];
              if (r.trim() === t) return decodeURIComponent(s);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Tl,
        Mo = null;
      const aC = new A("TRANSITION_ID"),
        YP = [
          {
            provide: fl,
            useFactory: function QP(n, t, e) {
              return () => {
                e.get(ss).donePromise.then(() => {
                  const i = Vn(),
                    r = t.querySelectorAll(`style[ng-transition="${n}"]`);
                  for (let s = 0; s < r.length; s++) i.remove(r[s]);
                });
              };
            },
            deps: [aC, Z, De],
            multi: !0,
          },
        ];
      class Bh {
        static init() {
          !(function NO(n) {
            yh = n;
          })(new Bh());
        }
        addToWindow(t) {
          (pe.getAngularTestability = (i, r = !0) => {
            const s = t.findTestabilityInTree(i, r);
            if (null == s)
              throw new Error("Could not find testability for element.");
            return s;
          }),
            (pe.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (pe.getAllAngularRootElements = () => t.getAllRootElements()),
            pe.frameworkStabilizers || (pe.frameworkStabilizers = []),
            pe.frameworkStabilizers.push((i) => {
              const r = pe.getAllAngularTestabilities();
              let s = r.length,
                o = !1;
              const a = function (l) {
                (o = o || l), s--, 0 == s && i(o);
              };
              r.forEach(function (l) {
                l.whenStable(a);
              });
            });
        }
        findTestabilityInTree(t, e, i) {
          if (null == e) return null;
          const r = t.getTestability(e);
          return null != r
            ? r
            : i
            ? Vn().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      let ZP = (() => {
        class n {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const Il = new A("EventManagerPlugins");
      let Rl = (() => {
        class n {
          constructor(e, i) {
            (this._zone = i),
              (this._eventNameToPlugin = new Map()),
              e.forEach((r) => (r.manager = this)),
              (this._plugins = e.slice().reverse());
          }
          addEventListener(e, i, r) {
            return this._findPluginFor(i).addEventListener(e, i, r);
          }
          addGlobalEventListener(e, i, r) {
            return this._findPluginFor(i).addGlobalEventListener(e, i, r);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(e) {
            const i = this._eventNameToPlugin.get(e);
            if (i) return i;
            const r = this._plugins;
            for (let s = 0; s < r.length; s++) {
              const o = r[s];
              if (o.supports(e)) return this._eventNameToPlugin.set(e, o), o;
            }
            throw new Error(`No event manager plugin found for event ${e}`);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(Il), C(re));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class lC {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, i) {
          const r = Vn().getGlobalEventTarget(this._doc, t);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, i);
        }
      }
      let cC = (() => {
          class n {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(e) {
              const i = new Set();
              e.forEach((r) => {
                this._stylesSet.has(r) || (this._stylesSet.add(r), i.add(r));
              }),
                this.onStylesAdded(i);
            }
            onStylesAdded(e) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        So = (() => {
          class n extends cC {
            constructor(e) {
              super(),
                (this._doc = e),
                (this._hostNodes = new Map()),
                this._hostNodes.set(e.head, []);
            }
            _addStylesToHost(e, i, r) {
              e.forEach((s) => {
                const o = this._doc.createElement("style");
                (o.textContent = s), r.push(i.appendChild(o));
              });
            }
            addHost(e) {
              const i = [];
              this._addStylesToHost(this._stylesSet, e, i),
                this._hostNodes.set(e, i);
            }
            removeHost(e) {
              const i = this._hostNodes.get(e);
              i && i.forEach(uC), this._hostNodes.delete(e);
            }
            onStylesAdded(e) {
              this._hostNodes.forEach((i, r) => {
                this._addStylesToHost(e, r, i);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((e) => e.forEach(uC));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(Z));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      function uC(n) {
        Vn().remove(n);
      }
      const jh = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        Hh = /%COMP%/g;
      function kl(n, t, e) {
        for (let i = 0; i < t.length; i++) {
          let r = t[i];
          Array.isArray(r) ? kl(n, r, e) : ((r = r.replace(Hh, n)), e.push(r));
        }
        return e;
      }
      function fC(n) {
        return (t) => {
          if ("__ngUnwrap__" === t) return n;
          !1 === n(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Ol = (() => {
        class n {
          constructor(e, i, r) {
            (this.eventManager = e),
              (this.sharedStylesHost = i),
              (this.appId = r),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Uh(e));
          }
          createRenderer(e, i) {
            if (!e || !i) return this.defaultRenderer;
            switch (i.encapsulation) {
              case un.Emulated: {
                let r = this.rendererByCompId.get(i.id);
                return (
                  r ||
                    ((r = new r1(
                      this.eventManager,
                      this.sharedStylesHost,
                      i,
                      this.appId
                    )),
                    this.rendererByCompId.set(i.id, r)),
                  r.applyToHost(e),
                  r
                );
              }
              case 1:
              case un.ShadowDom:
                return new s1(this.eventManager, this.sharedStylesHost, e, i);
              default:
                if (!this.rendererByCompId.has(i.id)) {
                  const r = kl(i.id, i.styles, []);
                  this.sharedStylesHost.addStyles(r),
                    this.rendererByCompId.set(i.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(Rl), C(So), C(vo));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class Uh {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(jh[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, i) {
          t && t.insertBefore(e, i);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let i = "string" == typeof t ? document.querySelector(t) : t;
          if (!i)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (i.textContent = ""), i;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, i, r) {
          if (r) {
            e = r + ":" + e;
            const s = jh[r];
            s ? t.setAttributeNS(s, e, i) : t.setAttribute(e, i);
          } else t.setAttribute(e, i);
        }
        removeAttribute(t, e, i) {
          if (i) {
            const r = jh[i];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${i}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, i, r) {
          r & (Pt.DashCase | Pt.Important)
            ? t.style.setProperty(e, i, r & Pt.Important ? "important" : "")
            : (t.style[e] = i);
        }
        removeStyle(t, e, i) {
          i & Pt.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, i) {
          t[e] = i;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, i) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, fC(i))
            : this.eventManager.addEventListener(t, e, fC(i));
        }
      }
      class r1 extends Uh {
        constructor(t, e, i, r) {
          super(t), (this.component = i);
          const s = kl(r + "-" + i.id, i.styles, []);
          e.addStyles(s),
            (this.contentAttr = (function e1(n) {
              return "_ngcontent-%COMP%".replace(Hh, n);
            })(r + "-" + i.id)),
            (this.hostAttr = (function t1(n) {
              return "_nghost-%COMP%".replace(Hh, n);
            })(r + "-" + i.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const i = super.createElement(t, e);
          return super.setAttribute(i, this.contentAttr, ""), i;
        }
      }
      class s1 extends Uh {
        constructor(t, e, i, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = i),
            (this.shadowRoot = i.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = kl(r.id, r.styles, []);
          for (let o = 0; o < s.length; o++) {
            const a = document.createElement("style");
            (a.textContent = s[o]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, i) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, i);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let o1 = (() => {
        class n extends lC {
          constructor(e) {
            super(e);
          }
          supports(e) {
            return !0;
          }
          addEventListener(e, i, r) {
            return (
              e.addEventListener(i, r, !1),
              () => this.removeEventListener(e, i, r)
            );
          }
          removeEventListener(e, i, r) {
            return e.removeEventListener(i, r);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(Z));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const mC = ["alt", "control", "meta", "shift"],
        l1 = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        gC = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        c1 = {
          alt: (n) => n.altKey,
          control: (n) => n.ctrlKey,
          meta: (n) => n.metaKey,
          shift: (n) => n.shiftKey,
        };
      let u1 = (() => {
        class n extends lC {
          constructor(e) {
            super(e);
          }
          supports(e) {
            return null != n.parseEventName(e);
          }
          addEventListener(e, i, r) {
            const s = n.parseEventName(i),
              o = n.eventCallback(s.fullKey, r, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Vn().onAndCancel(e, s.domEventName, o));
          }
          static parseEventName(e) {
            const i = e.toLowerCase().split("."),
              r = i.shift();
            if (0 === i.length || ("keydown" !== r && "keyup" !== r))
              return null;
            const s = n._normalizeKey(i.pop());
            let o = "";
            if (
              (mC.forEach((l) => {
                const c = i.indexOf(l);
                c > -1 && (i.splice(c, 1), (o += l + "."));
              }),
              (o += s),
              0 != i.length || 0 === s.length)
            )
              return null;
            const a = {};
            return (a.domEventName = r), (a.fullKey = o), a;
          }
          static getEventFullKey(e) {
            let i = "",
              r = (function d1(n) {
                let t = n.key;
                if (null == t) {
                  if (((t = n.keyIdentifier), null == t)) return "Unidentified";
                  t.startsWith("U+") &&
                    ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                    3 === n.location && gC.hasOwnProperty(t) && (t = gC[t]));
                }
                return l1[t] || t;
              })(e);
            return (
              (r = r.toLowerCase()),
              " " === r ? (r = "space") : "." === r && (r = "dot"),
              mC.forEach((s) => {
                s != r && c1[s](e) && (i += s + ".");
              }),
              (i += r),
              i
            );
          }
          static eventCallback(e, i, r) {
            return (s) => {
              n.getEventFullKey(s) === e && r.runGuarded(() => i(s));
            };
          }
          static _normalizeKey(e) {
            return "esc" === e ? "escape" : e;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(Z));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const m1 = Db(aF, "browser", [
          { provide: pl, useValue: sC },
          {
            provide: pb,
            useValue: function h1() {
              Vh.makeCurrent(), Bh.init();
            },
            multi: !0,
          },
          {
            provide: Z,
            useFactory: function p1() {
              return (
                (function hS(n) {
                  cu = n;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        g1 = [
          { provide: Md, useValue: "root" },
          {
            provide: Qn,
            useFactory: function f1() {
              return new Qn();
            },
            deps: [],
          },
          { provide: Il, useClass: o1, multi: !0, deps: [Z, re, pl] },
          { provide: Il, useClass: u1, multi: !0, deps: [Z] },
          { provide: Ol, useClass: Ol, deps: [Rl, So, vo] },
          { provide: po, useExisting: Ol },
          { provide: cC, useExisting: So },
          { provide: So, useClass: So, deps: [Z] },
          { provide: _h, useClass: _h, deps: [re] },
          { provide: Rl, useClass: Rl, deps: [Il, re] },
          { provide: class GP {}, useClass: ZP, deps: [] },
        ];
      let _C = (() => {
        class n {
          constructor(e) {
            if (e)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: n,
              providers: [
                { provide: vo, useValue: e.appId },
                { provide: aC, useExisting: vo },
                YP,
              ],
            };
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(n, 12));
          }),
          (n.ɵmod = de({ type: n })),
          (n.ɵinj = le({ providers: g1, imports: [Eo, pF] })),
          n
        );
      })();
      "undefined" != typeof window && window;
      let zh = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = R({
              token: n,
              factory: function (e) {
                let i = null;
                return (i = e ? new (e || n)() : C(bC)), i;
              },
              providedIn: "root",
            })),
            n
          );
        })(),
        bC = (() => {
          class n extends zh {
            constructor(e) {
              super(), (this._doc = e);
            }
            sanitize(e, i) {
              if (null == i) return null;
              switch (e) {
                case ae.NONE:
                  return i;
                case ae.HTML:
                  return In(i, "HTML")
                    ? Ft(i)
                    : bg(this._doc, String(i)).toString();
                case ae.STYLE:
                  return In(i, "Style") ? Ft(i) : i;
                case ae.SCRIPT:
                  if (In(i, "Script")) return Ft(i);
                  throw new Error("unsafe value used in a script context");
                case ae.URL:
                  return hg(i), In(i, "URL") ? Ft(i) : Ys(String(i));
                case ae.RESOURCE_URL:
                  if (In(i, "ResourceURL")) return Ft(i);
                  throw new Error(
                    "unsafe value used in a resource URL context (see https://g.co/ng/security#xss)"
                  );
                default:
                  throw new Error(
                    `Unexpected SecurityContext ${e} (see https://g.co/ng/security#xss)`
                  );
              }
            }
            bypassSecurityTrustHtml(e) {
              return (function Sx(n) {
                return new Cx(n);
              })(e);
            }
            bypassSecurityTrustStyle(e) {
              return (function xx(n) {
                return new wx(n);
              })(e);
            }
            bypassSecurityTrustScript(e) {
              return (function Ax(n) {
                return new Dx(n);
              })(e);
            }
            bypassSecurityTrustUrl(e) {
              return (function Tx(n) {
                return new Ex(n);
              })(e);
            }
            bypassSecurityTrustResourceUrl(e) {
              return (function Ix(n) {
                return new Mx(n);
              })(e);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(Z));
            }),
            (n.ɵprov = R({
              token: n,
              factory: function (e) {
                let i = null;
                return (
                  (i = e
                    ? new e()
                    : (function S1(n) {
                        return new bC(n.get(Z));
                      })(C(De))),
                  i
                );
              },
              providedIn: "root",
            })),
            n
          );
        })();
      function P(...n) {
        return Ye(n, ks(n));
      }
      class sn extends K {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return !e.closed && t.next(this._value), e;
        }
        getValue() {
          const { hasError: t, thrownError: e, _value: i } = this;
          if (t) throw e;
          return this._throwIfClosed(), i;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const { isArray: x1 } = Array,
        { getPrototypeOf: A1, prototype: T1, keys: I1 } = Object;
      function CC(n) {
        if (1 === n.length) {
          const t = n[0];
          if (x1(t)) return { args: t, keys: null };
          if (
            (function R1(n) {
              return n && "object" == typeof n && A1(n) === T1;
            })(t)
          ) {
            const e = I1(t);
            return { args: e.map((i) => t[i]), keys: e };
          }
        }
        return { args: n, keys: null };
      }
      const { isArray: k1 } = Array;
      function Gh(n) {
        return Q((t) =>
          (function O1(n, t) {
            return k1(t) ? n(...t) : n(t);
          })(n, t)
        );
      }
      function wC(n, t) {
        return n.reduce((e, i, r) => ((e[i] = t[r]), e), {});
      }
      function DC(...n) {
        const t = ks(n),
          e = rm(n),
          { args: i, keys: r } = CC(n);
        if (0 === i.length) return Ye([], t);
        const s = new he(
          (function F1(n, t, e = ci) {
            return (i) => {
              EC(
                t,
                () => {
                  const { length: r } = n,
                    s = new Array(r);
                  let o = r,
                    a = r;
                  for (let l = 0; l < r; l++)
                    EC(
                      t,
                      () => {
                        const c = Ye(n[l], t);
                        let u = !1;
                        c.subscribe(
                          new Se(
                            i,
                            (d) => {
                              (s[l] = d),
                                u || ((u = !0), a--),
                                a || i.next(e(s.slice()));
                            },
                            () => {
                              --o || i.complete();
                            }
                          )
                        );
                      },
                      i
                    );
                },
                i
              );
            };
          })(i, t, r ? (o) => wC(r, o) : ci)
        );
        return e ? s.pipe(Gh(e)) : s;
      }
      function EC(n, t, e) {
        n ? zn(e, n, t) : t();
      }
      const Fl = Ts(
        (n) =>
          function () {
            n(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function Pl(...n) {
        return (function P1() {
          return Rs(1);
        })()(Ye(n, ks(n)));
      }
      function Wh(n) {
        return new he((t) => {
          xt(n()).subscribe(t);
        });
      }
      function MC() {
        return Pe((n, t) => {
          let e = null;
          n._refCount++;
          const i = new Se(t, void 0, void 0, void 0, () => {
            if (!n || n._refCount <= 0 || 0 < --n._refCount)
              return void (e = null);
            const r = n._connection,
              s = e;
            (e = null),
              r && (!s || r === s) && r.unsubscribe(),
              t.unsubscribe();
          });
          n.subscribe(i), i.closed || (e = n.connect());
        });
      }
      class N1 extends he {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            zp(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null),
            null == t || t.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new Ve();
            const e = this.getSubject();
            t.add(
              this.source.subscribe(
                new Se(
                  e,
                  void 0,
                  () => {
                    this._teardown(), e.complete();
                  },
                  (i) => {
                    this._teardown(), e.error(i);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = Ve.EMPTY));
          }
          return t;
        }
        refCount() {
          return MC()(this);
        }
      }
      function Zi(n, t) {
        return Pe((e, i) => {
          let r = null,
            s = 0,
            o = !1;
          const a = () => o && !r && i.complete();
          e.subscribe(
            new Se(
              i,
              (l) => {
                null == r || r.unsubscribe();
                let c = 0;
                const u = s++;
                xt(n(l, u)).subscribe(
                  (r = new Se(
                    i,
                    (d) => i.next(t ? t(l, d, u, c++) : d),
                    () => {
                      (r = null), a();
                    }
                  ))
                );
              },
              () => {
                (o = !0), a();
              }
            )
          );
        });
      }
      function Xi(...n) {
        const t = ks(n);
        return Pe((e, i) => {
          (t ? Pl(n, e, t) : Pl(n, e)).subscribe(i);
        });
      }
      function L1(n, t, e, i, r) {
        return (s, o) => {
          let a = e,
            l = t,
            c = 0;
          s.subscribe(
            new Se(
              o,
              (u) => {
                const d = c++;
                (l = a ? n(l, u, d) : ((a = !0), u)), i && o.next(l);
              },
              r &&
                (() => {
                  a && o.next(l), o.complete();
                })
            )
          );
        };
      }
      function SC(n, t) {
        return Pe(L1(n, t, arguments.length >= 2, !0));
      }
      function Oe(n, t) {
        return Pe((e, i) => {
          let r = 0;
          e.subscribe(new Se(i, (s) => n.call(t, s, r++) && i.next(s)));
        });
      }
      function ii(n) {
        return Pe((t, e) => {
          let s,
            i = null,
            r = !1;
          (i = t.subscribe(
            new Se(e, void 0, void 0, (o) => {
              (s = xt(n(o, ii(n)(t)))),
                i ? (i.unsubscribe(), (i = null), s.subscribe(e)) : (r = !0);
            })
          )),
            r && (i.unsubscribe(), (i = null), s.subscribe(e));
        });
      }
      function cs(n, t) {
        return se(t) ? $e(n, t, 1) : $e(n, 1);
      }
      function qh(n) {
        return n <= 0
          ? () => Sn
          : Pe((t, e) => {
              let i = [];
              t.subscribe(
                new Se(
                  e,
                  (r) => {
                    i.push(r), n < i.length && i.shift();
                  },
                  () => {
                    for (const r of i) e.next(r);
                    e.complete();
                  },
                  void 0,
                  () => {
                    i = null;
                  }
                )
              );
            });
      }
      function xC(n = V1) {
        return Pe((t, e) => {
          let i = !1;
          t.subscribe(
            new Se(
              e,
              (r) => {
                (i = !0), e.next(r);
              },
              () => (i ? e.complete() : e.error(n()))
            )
          );
        });
      }
      function V1() {
        return new Fl();
      }
      function AC(n) {
        return Pe((t, e) => {
          let i = !1;
          t.subscribe(
            new Se(
              e,
              (r) => {
                (i = !0), e.next(r);
              },
              () => {
                i || e.next(n), e.complete();
              }
            )
          );
        });
      }
      function us(n, t) {
        const e = arguments.length >= 2;
        return (i) =>
          i.pipe(
            n ? Oe((r, s) => n(r, s, i)) : ci,
            ze(1),
            e ? AC(t) : xC(() => new Fl())
          );
      }
      function st(n, t, e) {
        const i = se(n) || t || e ? { next: n, error: t, complete: e } : n;
        return i
          ? Pe((r, s) => {
              var o;
              null === (o = i.subscribe) || void 0 === o || o.call(i);
              let a = !0;
              r.subscribe(
                new Se(
                  s,
                  (l) => {
                    var c;
                    null === (c = i.next) || void 0 === c || c.call(i, l),
                      s.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = i.complete) || void 0 === l || l.call(i),
                      s.complete();
                  },
                  (l) => {
                    var c;
                    (a = !1),
                      null === (c = i.error) || void 0 === c || c.call(i, l),
                      s.error(l);
                  },
                  () => {
                    var l, c;
                    a &&
                      (null === (l = i.unsubscribe) ||
                        void 0 === l ||
                        l.call(i)),
                      null === (c = i.finalize) || void 0 === c || c.call(i);
                  }
                )
              );
            })
          : ci;
      }
      function TC(n) {
        return Pe((t, e) => {
          try {
            t.subscribe(e);
          } finally {
            e.add(n);
          }
        });
      }
      class ri {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class Kh extends ri {
        constructor(t, e, i = "imperative", r = null) {
          super(t, e), (this.navigationTrigger = i), (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class xo extends ri {
        constructor(t, e, i) {
          super(t, e), (this.urlAfterRedirects = i);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class IC extends ri {
        constructor(t, e, i) {
          super(t, e), (this.reason = i);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class j1 extends ri {
        constructor(t, e, i) {
          super(t, e), (this.error = i);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class H1 extends ri {
        constructor(t, e, i, r) {
          super(t, e), (this.urlAfterRedirects = i), (this.state = r);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class U1 extends ri {
        constructor(t, e, i, r) {
          super(t, e), (this.urlAfterRedirects = i), (this.state = r);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class $1 extends ri {
        constructor(t, e, i, r, s) {
          super(t, e),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class z1 extends ri {
        constructor(t, e, i, r) {
          super(t, e), (this.urlAfterRedirects = i), (this.state = r);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class G1 extends ri {
        constructor(t, e, i, r) {
          super(t, e), (this.urlAfterRedirects = i), (this.state = r);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class RC {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class kC {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class W1 {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class q1 {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class K1 {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Q1 {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class OC {
        constructor(t, e, i) {
          (this.routerEvent = t), (this.position = e), (this.anchor = i);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const X = "primary";
      class Y1 {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function ds(n) {
        return new Y1(n);
      }
      const FC = "ngNavigationCancelingError";
      function Qh(n) {
        const t = Error("NavigationCancelingError: " + n);
        return (t[FC] = !0), t;
      }
      function X1(n, t, e) {
        const i = e.path.split("/");
        if (
          i.length > n.length ||
          ("full" === e.pathMatch && (t.hasChildren() || i.length < n.length))
        )
          return null;
        const r = {};
        for (let s = 0; s < i.length; s++) {
          const o = i[s],
            a = n[s];
          if (o.startsWith(":")) r[o.substring(1)] = a;
          else if (o !== a.path) return null;
        }
        return { consumed: n.slice(0, i.length), posParams: r };
      }
      function Bn(n, t) {
        const e = n ? Object.keys(n) : void 0,
          i = t ? Object.keys(t) : void 0;
        if (!e || !i || e.length != i.length) return !1;
        let r;
        for (let s = 0; s < e.length; s++)
          if (((r = e[s]), !PC(n[r], t[r]))) return !1;
        return !0;
      }
      function PC(n, t) {
        if (Array.isArray(n) && Array.isArray(t)) {
          if (n.length !== t.length) return !1;
          const e = [...n].sort(),
            i = [...t].sort();
          return e.every((r, s) => i[s] === r);
        }
        return n === t;
      }
      function NC(n) {
        return Array.prototype.concat.apply([], n);
      }
      function LC(n) {
        return n.length > 0 ? n[n.length - 1] : null;
      }
      function ot(n, t) {
        for (const e in n) n.hasOwnProperty(e) && t(n[e], e);
      }
      function jn(n) {
        return Bd(n) ? n : ao(n) ? Ye(Promise.resolve(n)) : P(n);
      }
      const tN = {
          exact: function jC(n, t, e) {
            if (
              !er(n.segments, t.segments) ||
              !Nl(n.segments, t.segments, e) ||
              n.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const i in t.children)
              if (!n.children[i] || !jC(n.children[i], t.children[i], e))
                return !1;
            return !0;
          },
          subset: HC,
        },
        VC = {
          exact: function nN(n, t) {
            return Bn(n, t);
          },
          subset: function iN(n, t) {
            return (
              Object.keys(t).length <= Object.keys(n).length &&
              Object.keys(t).every((e) => PC(n[e], t[e]))
            );
          },
          ignored: () => !0,
        };
      function BC(n, t, e) {
        return (
          tN[e.paths](n.root, t.root, e.matrixParams) &&
          VC[e.queryParams](n.queryParams, t.queryParams) &&
          !("exact" === e.fragment && n.fragment !== t.fragment)
        );
      }
      function HC(n, t, e) {
        return UC(n, t, t.segments, e);
      }
      function UC(n, t, e, i) {
        if (n.segments.length > e.length) {
          const r = n.segments.slice(0, e.length);
          return !(!er(r, e) || t.hasChildren() || !Nl(r, e, i));
        }
        if (n.segments.length === e.length) {
          if (!er(n.segments, e) || !Nl(n.segments, e, i)) return !1;
          for (const r in t.children)
            if (!n.children[r] || !HC(n.children[r], t.children[r], i))
              return !1;
          return !0;
        }
        {
          const r = e.slice(0, n.segments.length),
            s = e.slice(n.segments.length);
          return (
            !!(er(n.segments, r) && Nl(n.segments, r, i) && n.children[X]) &&
            UC(n.children[X], t, s, i)
          );
        }
      }
      function Nl(n, t, e) {
        return t.every((i, r) => VC[e](n[r].parameters, i.parameters));
      }
      class Ji {
        constructor(t, e, i) {
          (this.root = t), (this.queryParams = e), (this.fragment = i);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = ds(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return oN.serialize(this);
        }
      }
      class te {
        constructor(t, e) {
          (this.segments = t),
            (this.children = e),
            (this.parent = null),
            ot(e, (i, r) => (i.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Ll(this);
        }
      }
      class Ao {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = ds(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return qC(this);
        }
      }
      function er(n, t) {
        return n.length === t.length && n.every((e, i) => e.path === t[i].path);
      }
      class $C {}
      class zC {
        parse(t) {
          const e = new mN(t);
          return new Ji(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment()
          );
        }
        serialize(t) {
          const e = `/${To(t.root, !0)}`,
            i = (function cN(n) {
              const t = Object.keys(n)
                .map((e) => {
                  const i = n[e];
                  return Array.isArray(i)
                    ? i.map((r) => `${Vl(e)}=${Vl(r)}`).join("&")
                    : `${Vl(e)}=${Vl(i)}`;
                })
                .filter((e) => !!e);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${e}${i}${
            "string" == typeof t.fragment
              ? `#${(function aN(n) {
                  return encodeURI(n);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const oN = new zC();
      function Ll(n) {
        return n.segments.map((t) => qC(t)).join("/");
      }
      function To(n, t) {
        if (!n.hasChildren()) return Ll(n);
        if (t) {
          const e = n.children[X] ? To(n.children[X], !1) : "",
            i = [];
          return (
            ot(n.children, (r, s) => {
              s !== X && i.push(`${s}:${To(r, !1)}`);
            }),
            i.length > 0 ? `${e}(${i.join("//")})` : e
          );
        }
        {
          const e = (function sN(n, t) {
            let e = [];
            return (
              ot(n.children, (i, r) => {
                r === X && (e = e.concat(t(i, r)));
              }),
              ot(n.children, (i, r) => {
                r !== X && (e = e.concat(t(i, r)));
              }),
              e
            );
          })(n, (i, r) =>
            r === X ? [To(n.children[X], !1)] : [`${r}:${To(i, !1)}`]
          );
          return 1 === Object.keys(n.children).length && null != n.children[X]
            ? `${Ll(n)}/${e[0]}`
            : `${Ll(n)}/(${e.join("//")})`;
        }
      }
      function GC(n) {
        return encodeURIComponent(n)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Vl(n) {
        return GC(n).replace(/%3B/gi, ";");
      }
      function Yh(n) {
        return GC(n)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Bl(n) {
        return decodeURIComponent(n);
      }
      function WC(n) {
        return Bl(n.replace(/\+/g, "%20"));
      }
      function qC(n) {
        return `${Yh(n.path)}${(function lN(n) {
          return Object.keys(n)
            .map((t) => `;${Yh(t)}=${Yh(n[t])}`)
            .join("");
        })(n.parameters)}`;
      }
      const uN = /^[^\/()?;=#]+/;
      function jl(n) {
        const t = n.match(uN);
        return t ? t[0] : "";
      }
      const dN = /^[^=?&#]+/,
        fN = /^[^&#]+/;
      class mN {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new te([], {})
              : new te([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (e = this.parseParens(!0)));
          let i = {};
          return (
            this.peekStartsWith("(") && (i = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) &&
              (i[X] = new te(t, e)),
            i
          );
        }
        parseSegment() {
          const t = jl(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new Ao(Bl(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = jl(this.remaining);
          if (!e) return;
          this.capture(e);
          let i = "";
          if (this.consumeOptional("=")) {
            const r = jl(this.remaining);
            r && ((i = r), this.capture(i));
          }
          t[Bl(e)] = Bl(i);
        }
        parseQueryParam(t) {
          const e = (function hN(n) {
            const t = n.match(dN);
            return t ? t[0] : "";
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let i = "";
          if (this.consumeOptional("=")) {
            const o = (function pN(n) {
              const t = n.match(fN);
              return t ? t[0] : "";
            })(this.remaining);
            o && ((i = o), this.capture(i));
          }
          const r = WC(e),
            s = WC(i);
          if (t.hasOwnProperty(r)) {
            let o = t[r];
            Array.isArray(o) || ((o = [o]), (t[r] = o)), o.push(s);
          } else t[r] = s;
        }
        parseParens(t) {
          const e = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const i = jl(this.remaining),
              r = this.remaining[i.length];
            if ("/" !== r && ")" !== r && ";" !== r)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s;
            i.indexOf(":") > -1
              ? ((s = i.substr(0, i.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : t && (s = X);
            const o = this.parseChildren();
            (e[s] = 1 === Object.keys(o).length ? o[X] : new te([], o)),
              this.consumeOptional("//");
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class KC {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = Zh(t, this._root);
          return e ? e.children.map((i) => i.value) : [];
        }
        firstChild(t) {
          const e = Zh(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = Xh(t, this._root);
          return e.length < 2
            ? []
            : e[e.length - 2].children
                .map((r) => r.value)
                .filter((r) => r !== t);
        }
        pathFromRoot(t) {
          return Xh(t, this._root).map((e) => e.value);
        }
      }
      function Zh(n, t) {
        if (n === t.value) return t;
        for (const e of t.children) {
          const i = Zh(n, e);
          if (i) return i;
        }
        return null;
      }
      function Xh(n, t) {
        if (n === t.value) return [t];
        for (const e of t.children) {
          const i = Xh(n, e);
          if (i.length) return i.unshift(t), i;
        }
        return [];
      }
      class si {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function hs(n) {
        const t = {};
        return n && n.children.forEach((e) => (t[e.value.outlet] = e)), t;
      }
      class QC extends KC {
        constructor(t, e) {
          super(t), (this.snapshot = e), Jh(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function YC(n, t) {
        const e = (function gN(n, t) {
            const o = new Hl([], {}, {}, "", {}, X, t, null, n.root, -1, {});
            return new XC("", new si(o, []));
          })(n, t),
          i = new sn([new Ao("", {})]),
          r = new sn({}),
          s = new sn({}),
          o = new sn({}),
          a = new sn(""),
          l = new fs(i, r, o, a, s, X, t, e.root);
        return (l.snapshot = e.root), new QC(new si(l, []), e);
      }
      class fs {
        constructor(t, e, i, r, s, o, a, l) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = i),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = o),
            (this.component = a),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(Q((t) => ds(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(Q((t) => ds(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function ZC(n, t = "emptyOnly") {
        const e = n.pathFromRoot;
        let i = 0;
        if ("always" !== t)
          for (i = e.length - 1; i >= 1; ) {
            const r = e[i],
              s = e[i - 1];
            if (r.routeConfig && "" === r.routeConfig.path) i--;
            else {
              if (s.component) break;
              i--;
            }
          }
        return (function _N(n) {
          return n.reduce(
            (t, e) => ({
              params: Object.assign(Object.assign({}, t.params), e.params),
              data: Object.assign(Object.assign({}, t.data), e.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                e._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(e.slice(i));
      }
      class Hl {
        constructor(t, e, i, r, s, o, a, l, c, u, d) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = i),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = o),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = c),
            (this._lastPathIndex = u),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = ds(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = ds(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((i) => i.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class XC extends KC {
        constructor(t, e) {
          super(e), (this.url = t), Jh(this, e);
        }
        toString() {
          return JC(this._root);
        }
      }
      function Jh(n, t) {
        (t.value._routerState = n), t.children.forEach((e) => Jh(n, e));
      }
      function JC(n) {
        const t =
          n.children.length > 0 ? ` { ${n.children.map(JC).join(", ")} } ` : "";
        return `${n.value}${t}`;
      }
      function ef(n) {
        if (n.snapshot) {
          const t = n.snapshot,
            e = n._futureSnapshot;
          (n.snapshot = e),
            Bn(t.queryParams, e.queryParams) ||
              n.queryParams.next(e.queryParams),
            t.fragment !== e.fragment && n.fragment.next(e.fragment),
            Bn(t.params, e.params) || n.params.next(e.params),
            (function J1(n, t) {
              if (n.length !== t.length) return !1;
              for (let e = 0; e < n.length; ++e) if (!Bn(n[e], t[e])) return !1;
              return !0;
            })(t.url, e.url) || n.url.next(e.url),
            Bn(t.data, e.data) || n.data.next(e.data);
        } else
          (n.snapshot = n._futureSnapshot), n.data.next(n._futureSnapshot.data);
      }
      function tf(n, t) {
        const e =
          Bn(n.params, t.params) &&
          (function rN(n, t) {
            return (
              er(n, t) && n.every((e, i) => Bn(e.parameters, t[i].parameters))
            );
          })(n.url, t.url);
        return (
          e &&
          !(!n.parent != !t.parent) &&
          (!n.parent || tf(n.parent, t.parent))
        );
      }
      function Io(n, t, e) {
        if (e && n.shouldReuseRoute(t.value, e.value.snapshot)) {
          const i = e.value;
          i._futureSnapshot = t.value;
          const r = (function vN(n, t, e) {
            return t.children.map((i) => {
              for (const r of e.children)
                if (n.shouldReuseRoute(i.value, r.value.snapshot))
                  return Io(n, i, r);
              return Io(n, i);
            });
          })(n, t, e);
          return new si(i, r);
        }
        {
          if (n.shouldAttach(t.value)) {
            const s = n.retrieve(t.value);
            if (null !== s) {
              const o = s.route;
              return (
                (o.value._futureSnapshot = t.value),
                (o.children = t.children.map((a) => Io(n, a))),
                o
              );
            }
          }
          const i = (function bN(n) {
              return new fs(
                new sn(n.url),
                new sn(n.params),
                new sn(n.queryParams),
                new sn(n.fragment),
                new sn(n.data),
                n.outlet,
                n.component,
                n
              );
            })(t.value),
            r = t.children.map((s) => Io(n, s));
          return new si(i, r);
        }
      }
      function Ul(n) {
        return (
          "object" == typeof n && null != n && !n.outlets && !n.segmentPath
        );
      }
      function Ro(n) {
        return "object" == typeof n && null != n && n.outlets;
      }
      function nf(n, t, e, i, r) {
        let s = {};
        return (
          i &&
            ot(i, (o, a) => {
              s[a] = Array.isArray(o) ? o.map((l) => `${l}`) : `${o}`;
            }),
          new Ji(e.root === n ? t : ew(e.root, n, t), s, r)
        );
      }
      function ew(n, t, e) {
        const i = {};
        return (
          ot(n.children, (r, s) => {
            i[s] = r === t ? e : ew(r, t, e);
          }),
          new te(n.segments, i)
        );
      }
      class tw {
        constructor(t, e, i) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = i),
            t && i.length > 0 && Ul(i[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const r = i.find(Ro);
          if (r && r !== LC(i))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class rf {
        constructor(t, e, i) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = i);
        }
      }
      function nw(n, t, e) {
        if (
          (n || (n = new te([], {})),
          0 === n.segments.length && n.hasChildren())
        )
          return $l(n, t, e);
        const i = (function SN(n, t, e) {
            let i = 0,
              r = t;
            const s = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; r < n.segments.length; ) {
              if (i >= e.length) return s;
              const o = n.segments[r],
                a = e[i];
              if (Ro(a)) break;
              const l = `${a}`,
                c = i < e.length - 1 ? e[i + 1] : null;
              if (r > 0 && void 0 === l) break;
              if (l && c && "object" == typeof c && void 0 === c.outlets) {
                if (!rw(l, c, o)) return s;
                i += 2;
              } else {
                if (!rw(l, {}, o)) return s;
                i++;
              }
              r++;
            }
            return { match: !0, pathIndex: r, commandIndex: i };
          })(n, t, e),
          r = e.slice(i.commandIndex);
        if (i.match && i.pathIndex < n.segments.length) {
          const s = new te(n.segments.slice(0, i.pathIndex), {});
          return (
            (s.children[X] = new te(n.segments.slice(i.pathIndex), n.children)),
            $l(s, 0, r)
          );
        }
        return i.match && 0 === r.length
          ? new te(n.segments, {})
          : i.match && !n.hasChildren()
          ? sf(n, t, e)
          : i.match
          ? $l(n, 0, r)
          : sf(n, t, e);
      }
      function $l(n, t, e) {
        if (0 === e.length) return new te(n.segments, {});
        {
          const i = (function MN(n) {
              return Ro(n[0]) ? n[0].outlets : { [X]: n };
            })(e),
            r = {};
          return (
            ot(i, (s, o) => {
              "string" == typeof s && (s = [s]),
                null !== s && (r[o] = nw(n.children[o], t, s));
            }),
            ot(n.children, (s, o) => {
              void 0 === i[o] && (r[o] = s);
            }),
            new te(n.segments, r)
          );
        }
      }
      function sf(n, t, e) {
        const i = n.segments.slice(0, t);
        let r = 0;
        for (; r < e.length; ) {
          const s = e[r];
          if (Ro(s)) {
            const l = xN(s.outlets);
            return new te(i, l);
          }
          if (0 === r && Ul(e[0])) {
            i.push(new Ao(n.segments[t].path, iw(e[0]))), r++;
            continue;
          }
          const o = Ro(s) ? s.outlets[X] : `${s}`,
            a = r < e.length - 1 ? e[r + 1] : null;
          o && a && Ul(a)
            ? (i.push(new Ao(o, iw(a))), (r += 2))
            : (i.push(new Ao(o, {})), r++);
        }
        return new te(i, {});
      }
      function xN(n) {
        const t = {};
        return (
          ot(n, (e, i) => {
            "string" == typeof e && (e = [e]),
              null !== e && (t[i] = sf(new te([], {}), 0, e));
          }),
          t
        );
      }
      function iw(n) {
        const t = {};
        return ot(n, (e, i) => (t[i] = `${e}`)), t;
      }
      function rw(n, t, e) {
        return n == e.path && Bn(t, e.parameters);
      }
      class TN {
        constructor(t, e, i, r) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = i),
            (this.forwardEvent = r);
        }
        activate(t) {
          const e = this.futureState._root,
            i = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, i, t),
            ef(this.futureState.root),
            this.activateChildRoutes(e, i, t);
        }
        deactivateChildRoutes(t, e, i) {
          const r = hs(e);
          t.children.forEach((s) => {
            const o = s.value.outlet;
            this.deactivateRoutes(s, r[o], i), delete r[o];
          }),
            ot(r, (s, o) => {
              this.deactivateRouteAndItsChildren(s, i);
            });
        }
        deactivateRoutes(t, e, i) {
          const r = t.value,
            s = e ? e.value : null;
          if (r === s)
            if (r.component) {
              const o = i.getContext(r.outlet);
              o && this.deactivateChildRoutes(t, e, o.children);
            } else this.deactivateChildRoutes(t, e, i);
          else s && this.deactivateRouteAndItsChildren(e, i);
        }
        deactivateRouteAndItsChildren(t, e) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const i = e.getContext(t.value.outlet),
            r = i && t.value.component ? i.children : e,
            s = hs(t);
          for (const o of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[o], r);
          if (i && i.outlet) {
            const o = i.outlet.detach(),
              a = i.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: o,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const i = e.getContext(t.value.outlet),
            r = i && t.value.component ? i.children : e,
            s = hs(t);
          for (const o of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[o], r);
          i &&
            i.outlet &&
            (i.outlet.deactivate(),
            i.children.onOutletDeactivated(),
            (i.attachRef = null),
            (i.resolver = null),
            (i.route = null));
        }
        activateChildRoutes(t, e, i) {
          const r = hs(e);
          t.children.forEach((s) => {
            this.activateRoutes(s, r[s.value.outlet], i),
              this.forwardEvent(new Q1(s.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new q1(t.value.snapshot));
        }
        activateRoutes(t, e, i) {
          const r = t.value,
            s = e ? e.value : null;
          if ((ef(r), r === s))
            if (r.component) {
              const o = i.getOrCreateContext(r.outlet);
              this.activateChildRoutes(t, e, o.children);
            } else this.activateChildRoutes(t, e, i);
          else if (r.component) {
            const o = i.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                o.children.onOutletReAttached(a.contexts),
                (o.attachRef = a.componentRef),
                (o.route = a.route.value),
                o.outlet && o.outlet.attach(a.componentRef, a.route.value),
                ef(a.route.value),
                this.activateChildRoutes(t, null, o.children);
            } else {
              const a = (function IN(n) {
                  for (let t = n.parent; t; t = t.parent) {
                    const e = t.routeConfig;
                    if (e && e._loadedConfig) return e._loadedConfig;
                    if (e && e.component) return null;
                  }
                  return null;
                })(r.snapshot),
                l = a ? a.module.componentFactoryResolver : null;
              (o.attachRef = null),
                (o.route = r),
                (o.resolver = l),
                o.outlet && o.outlet.activateWith(r, l),
                this.activateChildRoutes(t, null, o.children);
            }
          } else this.activateChildRoutes(t, null, i);
        }
      }
      class af {
        constructor(t, e) {
          (this.routes = t), (this.module = e);
        }
      }
      function wi(n) {
        return "function" == typeof n;
      }
      function tr(n) {
        return n instanceof Ji;
      }
      const ko = Symbol("INITIAL_VALUE");
      function Oo() {
        return Zi((n) =>
          DC(n.map((t) => t.pipe(ze(1), Xi(ko)))).pipe(
            SC((t, e) => {
              let i = !1;
              return e.reduce(
                (r, s, o) =>
                  r !== ko
                    ? r
                    : (s === ko && (i = !0),
                      i || (!1 !== s && o !== e.length - 1 && !tr(s)) ? r : s),
                t
              );
            }, ko),
            Oe((t) => t !== ko),
            Q((t) => (tr(t) ? t : !0 === t)),
            ze(1)
          )
        );
      }
      class NN {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new Fo()),
            (this.attachRef = null);
        }
      }
      class Fo {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, e) {
          const i = this.getOrCreateContext(t);
          (i.outlet = e), this.contexts.set(t, i);
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t);
          e && ((e.outlet = null), (e.attachRef = null));
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let e = this.getContext(t);
          return e || ((e = new NN()), this.contexts.set(t, e)), e;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      let lf = (() => {
        class n {
          constructor(e, i, r, s, o) {
            (this.parentContexts = e),
              (this.location = i),
              (this.resolver = r),
              (this.changeDetector = o),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new ee()),
              (this.deactivateEvents = new ee()),
              (this.attachEvents = new ee()),
              (this.detachEvents = new ee()),
              (this.name = s || X),
              e.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const e = this.parentContexts.getContext(this.name);
              e &&
                e.route &&
                (e.attachRef
                  ? this.attach(e.attachRef, e.route)
                  : this.activateWith(e.route, e.resolver || null));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const e = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(e.instance),
              e
            );
          }
          attach(e, i) {
            (this.activated = e),
              (this._activatedRoute = i),
              this.location.insert(e.hostView),
              this.attachEvents.emit(e.instance);
          }
          deactivate() {
            if (this.activated) {
              const e = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(e);
            }
          }
          activateWith(e, i) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = e;
            const o = (i = i || this.resolver).resolveComponentFactory(
                e._futureSnapshot.routeConfig.component
              ),
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new LN(e, a, this.location.injector);
            (this.activated = this.location.createComponent(
              o,
              this.location.length,
              l
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(y(Fo), y(Vt), y(bi), gi("name"), y(tn));
          }),
          (n.ɵdir = k({
            type: n,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
          })),
          n
        );
      })();
      class LN {
        constructor(t, e, i) {
          (this.route = t), (this.childContexts = e), (this.parent = i);
        }
        get(t, e) {
          return t === fs
            ? this.route
            : t === Fo
            ? this.childContexts
            : this.parent.get(t, e);
        }
      }
      let sw = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵcmp = ye({
            type: n,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (e, i) {
              1 & e && L(0, "router-outlet");
            },
            directives: [lf],
            encapsulation: 2,
          })),
          n
        );
      })();
      function ow(n, t = "") {
        for (let e = 0; e < n.length; e++) {
          const i = n[e];
          VN(i, BN(t, i));
        }
      }
      function VN(n, t) {
        n.children && ow(n.children, t);
      }
      function BN(n, t) {
        return t
          ? n || t.path
            ? n && !t.path
              ? `${n}/`
              : !n && t.path
              ? t.path
              : `${n}/${t.path}`
            : ""
          : n;
      }
      function cf(n) {
        const t = n.children && n.children.map(cf),
          e = t
            ? Object.assign(Object.assign({}, n), { children: t })
            : Object.assign({}, n);
        return (
          !e.component &&
            (t || e.loadChildren) &&
            e.outlet &&
            e.outlet !== X &&
            (e.component = sw),
          e
        );
      }
      function on(n) {
        return n.outlet || X;
      }
      function aw(n, t) {
        const e = n.filter((i) => on(i) === t);
        return e.push(...n.filter((i) => on(i) !== t)), e;
      }
      const lw = {
        matched: !1,
        consumedSegments: [],
        lastChild: 0,
        parameters: {},
        positionalParamSegments: {},
      };
      function zl(n, t, e) {
        var i;
        if ("" === t.path)
          return "full" === t.pathMatch && (n.hasChildren() || e.length > 0)
            ? Object.assign({}, lw)
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {},
              };
        const s = (t.matcher || X1)(e, n, t);
        if (!s) return Object.assign({}, lw);
        const o = {};
        ot(s.posParams, (l, c) => {
          o[c] = l.path;
        });
        const a =
          s.consumed.length > 0
            ? Object.assign(
                Object.assign({}, o),
                s.consumed[s.consumed.length - 1].parameters
              )
            : o;
        return {
          matched: !0,
          consumedSegments: s.consumed,
          lastChild: s.consumed.length,
          parameters: a,
          positionalParamSegments:
            null !== (i = s.posParams) && void 0 !== i ? i : {},
        };
      }
      function Gl(n, t, e, i, r = "corrected") {
        if (
          e.length > 0 &&
          (function UN(n, t, e) {
            return e.some((i) => Wl(n, t, i) && on(i) !== X);
          })(n, e, i)
        ) {
          const o = new te(
            t,
            (function HN(n, t, e, i) {
              const r = {};
              (r[X] = i),
                (i._sourceSegment = n),
                (i._segmentIndexShift = t.length);
              for (const s of e)
                if ("" === s.path && on(s) !== X) {
                  const o = new te([], {});
                  (o._sourceSegment = n),
                    (o._segmentIndexShift = t.length),
                    (r[on(s)] = o);
                }
              return r;
            })(n, t, i, new te(e, n.children))
          );
          return (
            (o._sourceSegment = n),
            (o._segmentIndexShift = t.length),
            { segmentGroup: o, slicedSegments: [] }
          );
        }
        if (
          0 === e.length &&
          (function $N(n, t, e) {
            return e.some((i) => Wl(n, t, i));
          })(n, e, i)
        ) {
          const o = new te(
            n.segments,
            (function jN(n, t, e, i, r, s) {
              const o = {};
              for (const a of i)
                if (Wl(n, e, a) && !r[on(a)]) {
                  const l = new te([], {});
                  (l._sourceSegment = n),
                    (l._segmentIndexShift =
                      "legacy" === s ? n.segments.length : t.length),
                    (o[on(a)] = l);
                }
              return Object.assign(Object.assign({}, r), o);
            })(n, t, e, i, n.children, r)
          );
          return (
            (o._sourceSegment = n),
            (o._segmentIndexShift = t.length),
            { segmentGroup: o, slicedSegments: e }
          );
        }
        const s = new te(n.segments, n.children);
        return (
          (s._sourceSegment = n),
          (s._segmentIndexShift = t.length),
          { segmentGroup: s, slicedSegments: e }
        );
      }
      function Wl(n, t, e) {
        return (
          (!(n.hasChildren() || t.length > 0) || "full" !== e.pathMatch) &&
          "" === e.path
        );
      }
      function cw(n, t, e, i) {
        return (
          !!(on(n) === i || (i !== X && Wl(t, e, n))) &&
          ("**" === n.path || zl(t, n, e).matched)
        );
      }
      function uw(n, t, e) {
        return 0 === t.length && !n.children[e];
      }
      class Po {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class dw {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function ql(n) {
        return new he((t) => t.error(new Po(n)));
      }
      function hw(n) {
        return new he((t) => t.error(new dw(n)));
      }
      function zN(n) {
        return new he((t) =>
          t.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${n}'`
            )
          )
        );
      }
      class qN {
        constructor(t, e, i, r, s) {
          (this.configLoader = e),
            (this.urlSerializer = i),
            (this.urlTree = r),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(Jn));
        }
        apply() {
          const t = Gl(this.urlTree.root, [], [], this.config).segmentGroup,
            e = new te(t.segments, t.children);
          return this.expandSegmentGroup(this.ngModule, this.config, e, X)
            .pipe(
              Q((s) =>
                this.createUrlTree(
                  uf(s),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              ii((s) => {
                if (s instanceof dw)
                  return (this.allowRedirects = !1), this.match(s.urlTree);
                throw s instanceof Po ? this.noMatchError(s) : s;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, X)
            .pipe(
              Q((r) => this.createUrlTree(uf(r), t.queryParams, t.fragment))
            )
            .pipe(
              ii((r) => {
                throw r instanceof Po ? this.noMatchError(r) : r;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, e, i) {
          const r = t.segments.length > 0 ? new te([], { [X]: t }) : t;
          return new Ji(r, e, i);
        }
        expandSegmentGroup(t, e, i, r) {
          return 0 === i.segments.length && i.hasChildren()
            ? this.expandChildren(t, e, i).pipe(Q((s) => new te([], s)))
            : this.expandSegment(t, i, e, i.segments, r, !0);
        }
        expandChildren(t, e, i) {
          const r = [];
          for (const s of Object.keys(i.children))
            "primary" === s ? r.unshift(s) : r.push(s);
          return Ye(r).pipe(
            cs((s) => {
              const o = i.children[s],
                a = aw(e, s);
              return this.expandSegmentGroup(t, a, o, s).pipe(
                Q((l) => ({ segment: l, outlet: s }))
              );
            }),
            SC((s, o) => ((s[o.outlet] = o.segment), s), {}),
            (function B1(n, t) {
              const e = arguments.length >= 2;
              return (i) =>
                i.pipe(
                  n ? Oe((r, s) => n(r, s, i)) : ci,
                  qh(1),
                  e ? AC(t) : xC(() => new Fl())
                );
            })()
          );
        }
        expandSegment(t, e, i, r, s, o) {
          return Ye(i).pipe(
            cs((a) =>
              this.expandSegmentAgainstRoute(t, e, i, a, r, s, o).pipe(
                ii((c) => {
                  if (c instanceof Po) return P(null);
                  throw c;
                })
              )
            ),
            us((a) => !!a),
            ii((a, l) => {
              if (a instanceof Fl || "EmptyError" === a.name) {
                if (uw(e, r, s)) return P(new te([], {}));
                throw new Po(e);
              }
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, e, i, r, s, o, a) {
          return cw(r, e, s, o)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, e, r, s, o)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, e, i, r, s, o)
              : ql(e)
            : ql(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, i, r, s, o) {
          return "**" === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, i, r, o)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                i,
                r,
                s,
                o
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, i, r) {
          const s = this.applyRedirectCommands([], i.redirectTo, {});
          return i.redirectTo.startsWith("/")
            ? hw(s)
            : this.lineralizeSegments(i, s).pipe(
                $e((o) => {
                  const a = new te(o, {});
                  return this.expandSegment(t, a, e, o, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, i, r, s, o) {
          const {
            matched: a,
            consumedSegments: l,
            lastChild: c,
            positionalParamSegments: u,
          } = zl(e, r, s);
          if (!a) return ql(e);
          const d = this.applyRedirectCommands(l, r.redirectTo, u);
          return r.redirectTo.startsWith("/")
            ? hw(d)
            : this.lineralizeSegments(r, d).pipe(
                $e((h) =>
                  this.expandSegment(t, e, i, h.concat(s.slice(c)), o, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, e, i, r, s) {
          if ("**" === i.path)
            return i.loadChildren
              ? (i._loadedConfig
                  ? P(i._loadedConfig)
                  : this.configLoader.load(t.injector, i)
                ).pipe(Q((h) => ((i._loadedConfig = h), new te(r, {}))))
              : P(new te(r, {}));
          const { matched: o, consumedSegments: a, lastChild: l } = zl(e, i, r);
          if (!o) return ql(e);
          const c = r.slice(l);
          return this.getChildConfig(t, i, r).pipe(
            $e((d) => {
              const h = d.module,
                f = d.routes,
                { segmentGroup: p, slicedSegments: m } = Gl(e, a, c, f),
                b = new te(p.segments, p.children);
              if (0 === m.length && b.hasChildren())
                return this.expandChildren(h, f, b).pipe(
                  Q((T) => new te(a, T))
                );
              if (0 === f.length && 0 === m.length) return P(new te(a, {}));
              const w = on(i) === s;
              return this.expandSegment(h, b, f, m, w ? X : s, !0).pipe(
                Q((M) => new te(a.concat(M.segments), M.children))
              );
            })
          );
        }
        getChildConfig(t, e, i) {
          return e.children
            ? P(new af(e.children, t))
            : e.loadChildren
            ? void 0 !== e._loadedConfig
              ? P(e._loadedConfig)
              : this.runCanLoadGuards(t.injector, e, i).pipe(
                  $e((r) =>
                    r
                      ? this.configLoader
                          .load(t.injector, e)
                          .pipe(Q((s) => ((e._loadedConfig = s), s)))
                      : (function GN(n) {
                          return new he((t) =>
                            t.error(
                              Qh(
                                `Cannot load children because the guard of the route "path: '${n.path}'" returned false`
                              )
                            )
                          );
                        })(e)
                  )
                )
            : P(new af([], t));
        }
        runCanLoadGuards(t, e, i) {
          const r = e.canLoad;
          return r && 0 !== r.length
            ? P(
                r.map((o) => {
                  const a = t.get(o);
                  let l;
                  if (
                    (function kN(n) {
                      return n && wi(n.canLoad);
                    })(a)
                  )
                    l = a.canLoad(e, i);
                  else {
                    if (!wi(a)) throw new Error("Invalid CanLoad guard");
                    l = a(e, i);
                  }
                  return jn(l);
                })
              ).pipe(
                Oo(),
                st((o) => {
                  if (!tr(o)) return;
                  const a = Qh(
                    `Redirecting to "${this.urlSerializer.serialize(o)}"`
                  );
                  throw ((a.url = o), a);
                }),
                Q((o) => !0 === o)
              )
            : P(!0);
        }
        lineralizeSegments(t, e) {
          let i = [],
            r = e.root;
          for (;;) {
            if (((i = i.concat(r.segments)), 0 === r.numberOfChildren))
              return P(i);
            if (r.numberOfChildren > 1 || !r.children[X])
              return zN(t.redirectTo);
            r = r.children[X];
          }
        }
        applyRedirectCommands(t, e, i) {
          return this.applyRedirectCreatreUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            i
          );
        }
        applyRedirectCreatreUrlTree(t, e, i, r) {
          const s = this.createSegmentGroup(t, e.root, i, r);
          return new Ji(
            s,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment
          );
        }
        createQueryParams(t, e) {
          const i = {};
          return (
            ot(t, (r, s) => {
              if ("string" == typeof r && r.startsWith(":")) {
                const a = r.substring(1);
                i[s] = e[a];
              } else i[s] = r;
            }),
            i
          );
        }
        createSegmentGroup(t, e, i, r) {
          const s = this.createSegments(t, e.segments, i, r);
          let o = {};
          return (
            ot(e.children, (a, l) => {
              o[l] = this.createSegmentGroup(t, a, i, r);
            }),
            new te(s, o)
          );
        }
        createSegments(t, e, i, r) {
          return e.map((s) =>
            s.path.startsWith(":")
              ? this.findPosParam(t, s, r)
              : this.findOrReturn(s, i)
          );
        }
        findPosParam(t, e, i) {
          const r = i[e.path.substring(1)];
          if (!r)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${e.path}'.`
            );
          return r;
        }
        findOrReturn(t, e) {
          let i = 0;
          for (const r of e) {
            if (r.path === t.path) return e.splice(i), r;
            i++;
          }
          return t;
        }
      }
      function uf(n) {
        const t = {};
        for (const i of Object.keys(n.children)) {
          const s = uf(n.children[i]);
          (s.segments.length > 0 || s.hasChildren()) && (t[i] = s);
        }
        return (function KN(n) {
          if (1 === n.numberOfChildren && n.children[X]) {
            const t = n.children[X];
            return new te(n.segments.concat(t.segments), t.children);
          }
          return n;
        })(new te(n.segments, t));
      }
      class fw {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Kl {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function YN(n, t, e) {
        const i = n._root;
        return No(i, t ? t._root : null, e, [i.value]);
      }
      function Ql(n, t, e) {
        const i = (function XN(n) {
          if (!n) return null;
          for (let t = n.parent; t; t = t.parent) {
            const e = t.routeConfig;
            if (e && e._loadedConfig) return e._loadedConfig;
          }
          return null;
        })(t);
        return (i ? i.module.injector : e).get(n);
      }
      function No(
        n,
        t,
        e,
        i,
        r = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const s = hs(t);
        return (
          n.children.forEach((o) => {
            (function JN(
              n,
              t,
              e,
              i,
              r = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const s = n.value,
                o = t ? t.value : null,
                a = e ? e.getContext(n.value.outlet) : null;
              if (o && s.routeConfig === o.routeConfig) {
                const l = (function eL(n, t, e) {
                  if ("function" == typeof e) return e(n, t);
                  switch (e) {
                    case "pathParamsChange":
                      return !er(n.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !er(n.url, t.url) || !Bn(n.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !tf(n, t) || !Bn(n.queryParams, t.queryParams);
                    default:
                      return !tf(n, t);
                  }
                })(o, s, s.routeConfig.runGuardsAndResolvers);
                l
                  ? r.canActivateChecks.push(new fw(i))
                  : ((s.data = o.data), (s._resolvedData = o._resolvedData)),
                  No(n, t, s.component ? (a ? a.children : null) : e, i, r),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    r.canDeactivateChecks.push(new Kl(a.outlet.component, o));
              } else
                o && Lo(t, a, r),
                  r.canActivateChecks.push(new fw(i)),
                  No(n, null, s.component ? (a ? a.children : null) : e, i, r);
            })(o, s[o.value.outlet], e, i.concat([o.value]), r),
              delete s[o.value.outlet];
          }),
          ot(s, (o, a) => Lo(o, e.getContext(a), r)),
          r
        );
      }
      function Lo(n, t, e) {
        const i = hs(n),
          r = n.value;
        ot(i, (s, o) => {
          Lo(s, r.component ? (t ? t.children.getContext(o) : null) : t, e);
        }),
          e.canDeactivateChecks.push(
            new Kl(
              r.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              r
            )
          );
      }
      class cL {}
      function pw(n) {
        return new he((t) => t.error(n));
      }
      class dL {
        constructor(t, e, i, r, s, o) {
          (this.rootComponentType = t),
            (this.config = e),
            (this.urlTree = i),
            (this.url = r),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = o);
        }
        recognize() {
          const t = Gl(
              this.urlTree.root,
              [],
              [],
              this.config.filter((o) => void 0 === o.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            e = this.processSegmentGroup(this.config, t, X);
          if (null === e) return null;
          const i = new Hl(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              X,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            r = new si(i, e),
            s = new XC(this.url, r);
          return this.inheritParamsAndData(s._root), s;
        }
        inheritParamsAndData(t) {
          const e = t.value,
            i = ZC(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(i.params)),
            (e.data = Object.freeze(i.data)),
            t.children.forEach((r) => this.inheritParamsAndData(r));
        }
        processSegmentGroup(t, e, i) {
          return 0 === e.segments.length && e.hasChildren()
            ? this.processChildren(t, e)
            : this.processSegment(t, e, e.segments, i);
        }
        processChildren(t, e) {
          const i = [];
          for (const s of Object.keys(e.children)) {
            const o = e.children[s],
              a = aw(t, s),
              l = this.processSegmentGroup(a, o, s);
            if (null === l) return null;
            i.push(...l);
          }
          const r = mw(i);
          return (
            (function hL(n) {
              n.sort((t, e) =>
                t.value.outlet === X
                  ? -1
                  : e.value.outlet === X
                  ? 1
                  : t.value.outlet.localeCompare(e.value.outlet)
              );
            })(r),
            r
          );
        }
        processSegment(t, e, i, r) {
          for (const s of t) {
            const o = this.processSegmentAgainstRoute(s, e, i, r);
            if (null !== o) return o;
          }
          return uw(e, i, r) ? [] : null;
        }
        processSegmentAgainstRoute(t, e, i, r) {
          if (t.redirectTo || !cw(t, e, i, r)) return null;
          let s,
            o = [],
            a = [];
          if ("**" === t.path) {
            const f = i.length > 0 ? LC(i).parameters : {};
            s = new Hl(
              i,
              f,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              yw(t),
              on(t),
              t.component,
              t,
              gw(e),
              _w(e) + i.length,
              vw(t)
            );
          } else {
            const f = zl(e, t, i);
            if (!f.matched) return null;
            (o = f.consumedSegments),
              (a = i.slice(f.lastChild)),
              (s = new Hl(
                o,
                f.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                yw(t),
                on(t),
                t.component,
                t,
                gw(e),
                _w(e) + o.length,
                vw(t)
              ));
          }
          const l = (function fL(n) {
              return n.children
                ? n.children
                : n.loadChildren
                ? n._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: c, slicedSegments: u } = Gl(
              e,
              o,
              a,
              l.filter((f) => void 0 === f.redirectTo),
              this.relativeLinkResolution
            );
          if (0 === u.length && c.hasChildren()) {
            const f = this.processChildren(l, c);
            return null === f ? null : [new si(s, f)];
          }
          if (0 === l.length && 0 === u.length) return [new si(s, [])];
          const d = on(t) === r,
            h = this.processSegment(l, c, u, d ? X : r);
          return null === h ? null : [new si(s, h)];
        }
      }
      function pL(n) {
        const t = n.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function mw(n) {
        const t = [],
          e = new Set();
        for (const i of n) {
          if (!pL(i)) {
            t.push(i);
            continue;
          }
          const r = t.find((s) => i.value.routeConfig === s.value.routeConfig);
          void 0 !== r ? (r.children.push(...i.children), e.add(r)) : t.push(i);
        }
        for (const i of e) {
          const r = mw(i.children);
          t.push(new si(i.value, r));
        }
        return t.filter((i) => !e.has(i));
      }
      function gw(n) {
        let t = n;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function _w(n) {
        let t = n,
          e = t._segmentIndexShift ? t._segmentIndexShift : 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment),
            (e += t._segmentIndexShift ? t._segmentIndexShift : 0);
        return e - 1;
      }
      function yw(n) {
        return n.data || {};
      }
      function vw(n) {
        return n.resolve || {};
      }
      function df(n) {
        return Zi((t) => {
          const e = n(t);
          return e ? Ye(e).pipe(Q(() => t)) : P(t);
        });
      }
      class wL extends class CL {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      } {}
      const hf = new A("ROUTES");
      class bw {
        constructor(t, e, i, r) {
          (this.injector = t),
            (this.compiler = e),
            (this.onLoadStartListener = i),
            (this.onLoadEndListener = r);
        }
        load(t, e) {
          if (e._loader$) return e._loader$;
          this.onLoadStartListener && this.onLoadStartListener(e);
          const r = this.loadModuleFactory(e.loadChildren).pipe(
            Q((s) => {
              this.onLoadEndListener && this.onLoadEndListener(e);
              const o = s.create(t);
              return new af(
                NC(o.injector.get(hf, void 0, j.Self | j.Optional)).map(cf),
                o
              );
            }),
            ii((s) => {
              throw ((e._loader$ = void 0), s);
            })
          );
          return (e._loader$ = new N1(r, () => new K()).pipe(MC())), e._loader$;
        }
        loadModuleFactory(t) {
          return jn(t()).pipe(
            $e((e) =>
              e instanceof Pv ? P(e) : Ye(this.compiler.compileModuleAsync(e))
            )
          );
        }
      }
      class EL {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, e) {
          return t;
        }
      }
      function ML(n) {
        throw n;
      }
      function SL(n, t, e) {
        return t.parse("/");
      }
      function Cw(n, t) {
        return P(null);
      }
      const xL = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        AL = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let jt = (() => {
        class n {
          constructor(e, i, r, s, o, a, l) {
            (this.rootComponentType = e),
              (this.urlSerializer = i),
              (this.rootContexts = r),
              (this.location = s),
              (this.config = l),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new K()),
              (this.errorHandler = ML),
              (this.malformedUriErrorHandler = SL),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: Cw,
                afterPreactivation: Cw,
              }),
              (this.urlHandlingStrategy = new EL()),
              (this.routeReuseStrategy = new wL()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.ngModule = o.get(Jn)),
              (this.console = o.get(gb));
            const d = o.get(re);
            (this.isNgZoneEnabled = d instanceof re && re.isInAngularZone()),
              this.resetConfig(l),
              (this.currentUrlTree = (function eN() {
                return new Ji(new te([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new bw(
                o,
                a,
                (h) => this.triggerEvent(new RC(h)),
                (h) => this.triggerEvent(new kC(h))
              )),
              (this.routerState = YC(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new sn({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            var e;
            return null === (e = this.location.getState()) || void 0 === e
              ? void 0
              : e.ɵrouterPageId;
          }
          setupNavigations(e) {
            const i = this.events;
            return e.pipe(
              Oe((r) => 0 !== r.id),
              Q((r) =>
                Object.assign(Object.assign({}, r), {
                  extractedUrl: this.urlHandlingStrategy.extract(r.rawUrl),
                })
              ),
              Zi((r) => {
                let s = !1,
                  o = !1;
                return P(r).pipe(
                  st((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.currentRawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? Object.assign(
                            Object.assign({}, this.lastSuccessfulNavigation),
                            { previousNavigation: null }
                          )
                        : null,
                    };
                  }),
                  Zi((a) => {
                    const l = this.browserUrlTree.toString(),
                      c =
                        !this.navigated ||
                        a.extractedUrl.toString() !== l ||
                        l !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || c) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        Yl(a.source) && (this.browserUrlTree = a.extractedUrl),
                        P(a).pipe(
                          Zi((d) => {
                            const h = this.transitions.getValue();
                            return (
                              i.next(
                                new Kh(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              h !== this.transitions.getValue()
                                ? Sn
                                : Promise.resolve(d)
                            );
                          }),
                          (function QN(n, t, e, i) {
                            return Zi((r) =>
                              (function WN(n, t, e, i, r) {
                                return new qN(n, t, e, i, r).apply();
                              })(n, t, e, r.extractedUrl, i).pipe(
                                Q((s) =>
                                  Object.assign(Object.assign({}, r), {
                                    urlAfterRedirects: s,
                                  })
                                )
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          st((d) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: d.urlAfterRedirects }
                            );
                          }),
                          (function mL(n, t, e, i, r) {
                            return $e((s) =>
                              (function uL(
                                n,
                                t,
                                e,
                                i,
                                r = "emptyOnly",
                                s = "legacy"
                              ) {
                                try {
                                  const o = new dL(
                                    n,
                                    t,
                                    e,
                                    i,
                                    r,
                                    s
                                  ).recognize();
                                  return null === o ? pw(new cL()) : P(o);
                                } catch (o) {
                                  return pw(o);
                                }
                              })(
                                n,
                                t,
                                s.urlAfterRedirects,
                                e(s.urlAfterRedirects),
                                i,
                                r
                              ).pipe(
                                Q((o) =>
                                  Object.assign(Object.assign({}, s), {
                                    targetSnapshot: o,
                                  })
                                )
                              )
                            );
                          })(
                            this.rootComponentType,
                            this.config,
                            (d) => this.serializeUrl(d),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          st((d) => {
                            if ("eager" === this.urlUpdateStrategy) {
                              if (!d.extras.skipLocationChange) {
                                const f = this.urlHandlingStrategy.merge(
                                  d.urlAfterRedirects,
                                  d.rawUrl
                                );
                                this.setBrowserUrl(f, d);
                              }
                              this.browserUrlTree = d.urlAfterRedirects;
                            }
                            const h = new H1(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            i.next(h);
                          })
                        )
                      );
                    if (
                      c &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: h,
                          extractedUrl: f,
                          source: p,
                          restoredState: m,
                          extras: b,
                        } = a,
                        w = new Kh(h, this.serializeUrl(f), p, m);
                      i.next(w);
                      const v = YC(f, this.rootComponentType).snapshot;
                      return P(
                        Object.assign(Object.assign({}, a), {
                          targetSnapshot: v,
                          urlAfterRedirects: f,
                          extras: Object.assign(Object.assign({}, b), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })
                      );
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), Sn;
                  }),
                  df((a) => {
                    const {
                      targetSnapshot: l,
                      id: c,
                      extractedUrl: u,
                      rawUrl: d,
                      extras: { skipLocationChange: h, replaceUrl: f },
                    } = a;
                    return this.hooks.beforePreactivation(l, {
                      navigationId: c,
                      appliedUrlTree: u,
                      rawUrlTree: d,
                      skipLocationChange: !!h,
                      replaceUrl: !!f,
                    });
                  }),
                  st((a) => {
                    const l = new U1(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(l);
                  }),
                  Q((a) =>
                    Object.assign(Object.assign({}, a), {
                      guards: YN(
                        a.targetSnapshot,
                        a.currentSnapshot,
                        this.rootContexts
                      ),
                    })
                  ),
                  (function tL(n, t) {
                    return $e((e) => {
                      const {
                        targetSnapshot: i,
                        currentSnapshot: r,
                        guards: {
                          canActivateChecks: s,
                          canDeactivateChecks: o,
                        },
                      } = e;
                      return 0 === o.length && 0 === s.length
                        ? P(
                            Object.assign(Object.assign({}, e), {
                              guardsResult: !0,
                            })
                          )
                        : (function nL(n, t, e, i) {
                            return Ye(n).pipe(
                              $e((r) =>
                                (function lL(n, t, e, i, r) {
                                  const s =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null;
                                  return s && 0 !== s.length
                                    ? P(
                                        s.map((a) => {
                                          const l = Ql(a, t, r);
                                          let c;
                                          if (
                                            (function PN(n) {
                                              return n && wi(n.canDeactivate);
                                            })(l)
                                          )
                                            c = jn(l.canDeactivate(n, t, e, i));
                                          else {
                                            if (!wi(l))
                                              throw new Error(
                                                "Invalid CanDeactivate guard"
                                              );
                                            c = jn(l(n, t, e, i));
                                          }
                                          return c.pipe(us());
                                        })
                                      ).pipe(Oo())
                                    : P(!0);
                                })(r.component, r.route, e, t, i)
                              ),
                              us((r) => !0 !== r, !0)
                            );
                          })(o, i, r, n).pipe(
                            $e((a) =>
                              a &&
                              (function RN(n) {
                                return "boolean" == typeof n;
                              })(a)
                                ? (function iL(n, t, e, i) {
                                    return Ye(t).pipe(
                                      cs((r) =>
                                        Pl(
                                          (function sL(n, t) {
                                            return (
                                              null !== n && t && t(new W1(n)),
                                              P(!0)
                                            );
                                          })(r.route.parent, i),
                                          (function rL(n, t) {
                                            return (
                                              null !== n && t && t(new K1(n)),
                                              P(!0)
                                            );
                                          })(r.route, i),
                                          (function aL(n, t, e) {
                                            const i = t[t.length - 1],
                                              s = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((o) =>
                                                  (function ZN(n) {
                                                    const t = n.routeConfig
                                                      ? n.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return t && 0 !== t.length
                                                      ? { node: n, guards: t }
                                                      : null;
                                                  })(o)
                                                )
                                                .filter((o) => null !== o)
                                                .map((o) =>
                                                  Wh(() =>
                                                    P(
                                                      o.guards.map((l) => {
                                                        const c = Ql(
                                                          l,
                                                          o.node,
                                                          e
                                                        );
                                                        let u;
                                                        if (
                                                          (function FN(n) {
                                                            return (
                                                              n &&
                                                              wi(
                                                                n.canActivateChild
                                                              )
                                                            );
                                                          })(c)
                                                        )
                                                          u = jn(
                                                            c.canActivateChild(
                                                              i,
                                                              n
                                                            )
                                                          );
                                                        else {
                                                          if (!wi(c))
                                                            throw new Error(
                                                              "Invalid CanActivateChild guard"
                                                            );
                                                          u = jn(c(i, n));
                                                        }
                                                        return u.pipe(us());
                                                      })
                                                    ).pipe(Oo())
                                                  )
                                                );
                                            return P(s).pipe(Oo());
                                          })(n, r.path, e),
                                          (function oL(n, t, e) {
                                            const i = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null;
                                            if (!i || 0 === i.length)
                                              return P(!0);
                                            const r = i.map((s) =>
                                              Wh(() => {
                                                const o = Ql(s, t, e);
                                                let a;
                                                if (
                                                  (function ON(n) {
                                                    return (
                                                      n && wi(n.canActivate)
                                                    );
                                                  })(o)
                                                )
                                                  a = jn(o.canActivate(t, n));
                                                else {
                                                  if (!wi(o))
                                                    throw new Error(
                                                      "Invalid CanActivate guard"
                                                    );
                                                  a = jn(o(t, n));
                                                }
                                                return a.pipe(us());
                                              })
                                            );
                                            return P(r).pipe(Oo());
                                          })(n, r.route, e)
                                        )
                                      ),
                                      us((r) => !0 !== r, !0)
                                    );
                                  })(i, s, n, t)
                                : P(a)
                            ),
                            Q((a) =>
                              Object.assign(Object.assign({}, e), {
                                guardsResult: a,
                              })
                            )
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  st((a) => {
                    if (tr(a.guardsResult)) {
                      const c = Qh(
                        `Redirecting to "${this.serializeUrl(a.guardsResult)}"`
                      );
                      throw ((c.url = a.guardsResult), c);
                    }
                    const l = new $1(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(l);
                  }),
                  Oe(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, ""),
                      !1)
                  ),
                  df((a) => {
                    if (a.guards.canActivateChecks.length)
                      return P(a).pipe(
                        st((l) => {
                          const c = new z1(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(c);
                        }),
                        Zi((l) => {
                          let c = !1;
                          return P(l).pipe(
                            (function gL(n, t) {
                              return $e((e) => {
                                const {
                                  targetSnapshot: i,
                                  guards: { canActivateChecks: r },
                                } = e;
                                if (!r.length) return P(e);
                                let s = 0;
                                return Ye(r).pipe(
                                  cs((o) =>
                                    (function _L(n, t, e, i) {
                                      return (function yL(n, t, e, i) {
                                        const r = Object.keys(n);
                                        if (0 === r.length) return P({});
                                        const s = {};
                                        return Ye(r).pipe(
                                          $e((o) =>
                                            (function vL(n, t, e, i) {
                                              const r = Ql(n, t, i);
                                              return jn(
                                                r.resolve
                                                  ? r.resolve(t, e)
                                                  : r(t, e)
                                              );
                                            })(n[o], t, e, i).pipe(
                                              st((a) => {
                                                s[o] = a;
                                              })
                                            )
                                          ),
                                          qh(1),
                                          $e(() =>
                                            Object.keys(s).length === r.length
                                              ? P(s)
                                              : Sn
                                          )
                                        );
                                      })(n._resolve, n, t, i).pipe(
                                        Q(
                                          (s) => (
                                            (n._resolvedData = s),
                                            (n.data = Object.assign(
                                              Object.assign({}, n.data),
                                              ZC(n, e).resolve
                                            )),
                                            null
                                          )
                                        )
                                      );
                                    })(o.route, i, n, t)
                                  ),
                                  st(() => s++),
                                  qh(1),
                                  $e((o) => (s === r.length ? P(e) : Sn))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            st({
                              next: () => (c = !0),
                              complete: () => {
                                c ||
                                  (this.restoreHistory(l),
                                  this.cancelNavigationTransition(
                                    l,
                                    "At least one route resolver didn't emit any value."
                                  ));
                              },
                            })
                          );
                        }),
                        st((l) => {
                          const c = new G1(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(c);
                        })
                      );
                  }),
                  df((a) => {
                    const {
                      targetSnapshot: l,
                      id: c,
                      extractedUrl: u,
                      rawUrl: d,
                      extras: { skipLocationChange: h, replaceUrl: f },
                    } = a;
                    return this.hooks.afterPreactivation(l, {
                      navigationId: c,
                      appliedUrlTree: u,
                      rawUrlTree: d,
                      skipLocationChange: !!h,
                      replaceUrl: !!f,
                    });
                  }),
                  Q((a) => {
                    const l = (function yN(n, t, e) {
                      const i = Io(n, t._root, e ? e._root : void 0);
                      return new QC(i, t);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return Object.assign(Object.assign({}, a), {
                      targetRouterState: l,
                    });
                  }),
                  st((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((n, t, e) =>
                    Q(
                      (i) => (
                        new TN(
                          t,
                          i.targetRouterState,
                          i.currentRouterState,
                          e
                        ).activate(n),
                        i
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  st({
                    next() {
                      s = !0;
                    },
                    complete() {
                      s = !0;
                    },
                  }),
                  TC(() => {
                    var a;
                    s ||
                      o ||
                      this.cancelNavigationTransition(
                        r,
                        `Navigation ID ${r.id} is not equal to the current navigation id ${this.navigationId}`
                      ),
                      (null === (a = this.currentNavigation) || void 0 === a
                        ? void 0
                        : a.id) === r.id && (this.currentNavigation = null);
                  }),
                  ii((a) => {
                    if (
                      ((o = !0),
                      (function Z1(n) {
                        return n && n[FC];
                      })(a))
                    ) {
                      const l = tr(a.url);
                      l || ((this.navigated = !0), this.restoreHistory(r, !0));
                      const c = new IC(
                        r.id,
                        this.serializeUrl(r.extractedUrl),
                        a.message
                      );
                      i.next(c),
                        l
                          ? setTimeout(() => {
                              const u = this.urlHandlingStrategy.merge(
                                  a.url,
                                  this.rawUrlTree
                                ),
                                d = {
                                  skipLocationChange:
                                    r.extras.skipLocationChange,
                                  replaceUrl:
                                    "eager" === this.urlUpdateStrategy ||
                                    Yl(r.source),
                                };
                              this.scheduleNavigation(
                                u,
                                "imperative",
                                null,
                                d,
                                {
                                  resolve: r.resolve,
                                  reject: r.reject,
                                  promise: r.promise,
                                }
                              );
                            }, 0)
                          : r.resolve(!1);
                    } else {
                      this.restoreHistory(r, !0);
                      const l = new j1(
                        r.id,
                        this.serializeUrl(r.extractedUrl),
                        a
                      );
                      i.next(l);
                      try {
                        r.resolve(this.errorHandler(a));
                      } catch (c) {
                        r.reject(c);
                      }
                    }
                    return Sn;
                  })
                );
              })
            );
          }
          resetRootComponentType(e) {
            (this.rootComponentType = e),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(e) {
            this.transitions.next(
              Object.assign(Object.assign({}, this.transitions.value), e)
            );
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((e) => {
                const i = "popstate" === e.type ? "popstate" : "hashchange";
                "popstate" === i &&
                  setTimeout(() => {
                    var r;
                    const s = { replaceUrl: !0 },
                      o = (
                        null === (r = e.state) || void 0 === r
                          ? void 0
                          : r.navigationId
                      )
                        ? e.state
                        : null;
                    if (o) {
                      const l = Object.assign({}, o);
                      delete l.navigationId,
                        delete l.ɵrouterPageId,
                        0 !== Object.keys(l).length && (s.state = l);
                    }
                    const a = this.parseUrl(e.url);
                    this.scheduleNavigation(a, i, o, s);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(e) {
            this.events.next(e);
          }
          resetConfig(e) {
            ow(e),
              (this.config = e.map(cf)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(e, i = {}) {
            const {
                relativeTo: r,
                queryParams: s,
                fragment: o,
                queryParamsHandling: a,
                preserveFragment: l,
              } = i,
              c = r || this.routerState.root,
              u = l ? this.currentUrlTree.fragment : o;
            let d = null;
            switch (a) {
              case "merge":
                d = Object.assign(
                  Object.assign({}, this.currentUrlTree.queryParams),
                  s
                );
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = s || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              (function CN(n, t, e, i, r) {
                if (0 === e.length) return nf(t.root, t.root, t, i, r);
                const s = (function wN(n) {
                  if ("string" == typeof n[0] && 1 === n.length && "/" === n[0])
                    return new tw(!0, 0, n);
                  let t = 0,
                    e = !1;
                  const i = n.reduce((r, s, o) => {
                    if ("object" == typeof s && null != s) {
                      if (s.outlets) {
                        const a = {};
                        return (
                          ot(s.outlets, (l, c) => {
                            a[c] = "string" == typeof l ? l.split("/") : l;
                          }),
                          [...r, { outlets: a }]
                        );
                      }
                      if (s.segmentPath) return [...r, s.segmentPath];
                    }
                    return "string" != typeof s
                      ? [...r, s]
                      : 0 === o
                      ? (s.split("/").forEach((a, l) => {
                          (0 == l && "." === a) ||
                            (0 == l && "" === a
                              ? (e = !0)
                              : ".." === a
                              ? t++
                              : "" != a && r.push(a));
                        }),
                        r)
                      : [...r, s];
                  }, []);
                  return new tw(e, t, i);
                })(e);
                if (s.toRoot()) return nf(t.root, new te([], {}), t, i, r);
                const o = (function DN(n, t, e) {
                    if (n.isAbsolute) return new rf(t.root, !0, 0);
                    if (-1 === e.snapshot._lastPathIndex) {
                      const s = e.snapshot._urlSegment;
                      return new rf(s, s === t.root, 0);
                    }
                    const i = Ul(n.commands[0]) ? 0 : 1;
                    return (function EN(n, t, e) {
                      let i = n,
                        r = t,
                        s = e;
                      for (; s > r; ) {
                        if (((s -= r), (i = i.parent), !i))
                          throw new Error("Invalid number of '../'");
                        r = i.segments.length;
                      }
                      return new rf(i, !1, r - s);
                    })(
                      e.snapshot._urlSegment,
                      e.snapshot._lastPathIndex + i,
                      n.numberOfDoubleDots
                    );
                  })(s, t, n),
                  a = o.processChildren
                    ? $l(o.segmentGroup, o.index, s.commands)
                    : nw(o.segmentGroup, o.index, s.commands);
                return nf(o.segmentGroup, a, t, i, r);
              })(c, this.currentUrlTree, e, d, null != u ? u : null)
            );
          }
          navigateByUrl(e, i = { skipLocationChange: !1 }) {
            const r = tr(e) ? e : this.parseUrl(e),
              s = this.urlHandlingStrategy.merge(r, this.rawUrlTree);
            return this.scheduleNavigation(s, "imperative", null, i);
          }
          navigate(e, i = { skipLocationChange: !1 }) {
            return (
              (function TL(n) {
                for (let t = 0; t < n.length; t++) {
                  const e = n[t];
                  if (null == e)
                    throw new Error(
                      `The requested path contains ${e} segment at index ${t}`
                    );
                }
              })(e),
              this.navigateByUrl(this.createUrlTree(e, i), i)
            );
          }
          serializeUrl(e) {
            return this.urlSerializer.serialize(e);
          }
          parseUrl(e) {
            let i;
            try {
              i = this.urlSerializer.parse(e);
            } catch (r) {
              i = this.malformedUriErrorHandler(r, this.urlSerializer, e);
            }
            return i;
          }
          isActive(e, i) {
            let r;
            if (
              ((r =
                !0 === i
                  ? Object.assign({}, xL)
                  : !1 === i
                  ? Object.assign({}, AL)
                  : i),
              tr(e))
            )
              return BC(this.currentUrlTree, e, r);
            const s = this.parseUrl(e);
            return BC(this.currentUrlTree, s, r);
          }
          removeEmptyProps(e) {
            return Object.keys(e).reduce((i, r) => {
              const s = e[r];
              return null != s && (i[r] = s), i;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (e) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = e.id),
                  (this.currentPageId = e.targetPageId),
                  this.events.next(
                    new xo(
                      e.id,
                      this.serializeUrl(e.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  e.resolve(!0);
              },
              (e) => {
                this.console.warn(`Unhandled Navigation Error: ${e}`);
              }
            );
          }
          scheduleNavigation(e, i, r, s, o) {
            var a, l, c;
            if (this.disposed) return Promise.resolve(!1);
            const u = this.transitions.value,
              d = Yl(i) && u && !Yl(u.source),
              h = u.rawUrl.toString() === e.toString(),
              f =
                u.id ===
                (null === (a = this.currentNavigation) || void 0 === a
                  ? void 0
                  : a.id);
            if (d && h && f) return Promise.resolve(!0);
            let m, b, w;
            o
              ? ((m = o.resolve), (b = o.reject), (w = o.promise))
              : (w = new Promise((T, $) => {
                  (m = T), (b = $);
                }));
            const v = ++this.navigationId;
            let M;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (r = this.location.getState()),
                  (M =
                    r && r.ɵrouterPageId
                      ? r.ɵrouterPageId
                      : s.replaceUrl || s.skipLocationChange
                      ? null !== (l = this.browserPageId) && void 0 !== l
                        ? l
                        : 0
                      : (null !== (c = this.browserPageId) && void 0 !== c
                          ? c
                          : 0) + 1))
                : (M = 0),
              this.setTransition({
                id: v,
                targetPageId: M,
                source: i,
                restoredState: r,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: e,
                extras: s,
                resolve: m,
                reject: b,
                promise: w,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              w.catch((T) => Promise.reject(T))
            );
          }
          setBrowserUrl(e, i) {
            const r = this.urlSerializer.serialize(e),
              s = Object.assign(
                Object.assign({}, i.extras.state),
                this.generateNgRouterState(i.id, i.targetPageId)
              );
            this.location.isCurrentPathEqualTo(r) || i.extras.replaceUrl
              ? this.location.replaceState(r, "", s)
              : this.location.go(r, "", s);
          }
          restoreHistory(e, i = !1) {
            var r, s;
            if ("computed" === this.canceledNavigationResolution) {
              const o = this.currentPageId - e.targetPageId;
              ("popstate" !== e.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  (null === (r = this.currentNavigation) || void 0 === r
                    ? void 0
                    : r.finalUrl)) ||
              0 === o
                ? this.currentUrlTree ===
                    (null === (s = this.currentNavigation) || void 0 === s
                      ? void 0
                      : s.finalUrl) &&
                  0 === o &&
                  (this.resetState(e),
                  (this.browserUrlTree = e.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(o);
            } else
              "replace" === this.canceledNavigationResolution &&
                (i && this.resetState(e), this.resetUrlToCurrentUrlTree());
          }
          resetState(e) {
            (this.routerState = e.currentRouterState),
              (this.currentUrlTree = e.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                e.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(e, i) {
            const r = new IC(e.id, this.serializeUrl(e.extractedUrl), i);
            this.triggerEvent(r), e.resolve(!1);
          }
          generateNgRouterState(e, i) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: e, ɵrouterPageId: i }
              : { navigationId: e };
          }
        }
        return (
          (n.ɵfac = function (e) {
            Xa();
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function Yl(n) {
        return "imperative" !== n;
      }
      let Zl = (() => {
        class n {
          constructor(e, i, r) {
            (this.router = e),
              (this.route = i),
              (this.locationStrategy = r),
              (this.commands = null),
              (this.href = null),
              (this.onChanges = new K()),
              (this.subscription = e.events.subscribe((s) => {
                s instanceof xo && this.updateTargetUrlAndHref();
              }));
          }
          set routerLink(e) {
            this.commands = null != e ? (Array.isArray(e) ? e : [e]) : null;
          }
          ngOnChanges(e) {
            this.updateTargetUrlAndHref(), this.onChanges.next(this);
          }
          ngOnDestroy() {
            this.subscription.unsubscribe();
          }
          onClick(e, i, r, s, o) {
            if (
              0 !== e ||
              i ||
              r ||
              s ||
              o ||
              ("string" == typeof this.target && "_self" != this.target) ||
              null === this.urlTree
            )
              return !0;
            const a = {
              skipLocationChange: ps(this.skipLocationChange),
              replaceUrl: ps(this.replaceUrl),
              state: this.state,
            };
            return this.router.navigateByUrl(this.urlTree, a), !1;
          }
          updateTargetUrlAndHref() {
            this.href =
              null !== this.urlTree
                ? this.locationStrategy.prepareExternalUrl(
                    this.router.serializeUrl(this.urlTree)
                  )
                : null;
          }
          get urlTree() {
            return null === this.commands
              ? null
              : this.router.createUrlTree(this.commands, {
                  relativeTo:
                    void 0 !== this.relativeTo ? this.relativeTo : this.route,
                  queryParams: this.queryParams,
                  fragment: this.fragment,
                  queryParamsHandling: this.queryParamsHandling,
                  preserveFragment: ps(this.preserveFragment),
                });
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(y(jt), y(fs), y(ls));
          }),
          (n.ɵdir = k({
            type: n,
            selectors: [
              ["a", "routerLink", ""],
              ["area", "routerLink", ""],
            ],
            hostVars: 2,
            hostBindings: function (e, i) {
              1 & e &&
                be("click", function (s) {
                  return i.onClick(
                    s.button,
                    s.ctrlKey,
                    s.shiftKey,
                    s.altKey,
                    s.metaKey
                  );
                }),
                2 & e && qe("target", i.target)("href", i.href, ju);
            },
            inputs: {
              target: "target",
              queryParams: "queryParams",
              fragment: "fragment",
              queryParamsHandling: "queryParamsHandling",
              preserveFragment: "preserveFragment",
              skipLocationChange: "skipLocationChange",
              replaceUrl: "replaceUrl",
              state: "state",
              relativeTo: "relativeTo",
              routerLink: "routerLink",
            },
            features: [it],
          })),
          n
        );
      })();
      function ps(n) {
        return "" === n || !!n;
      }
      class ww {}
      class Dw {
        preload(t, e) {
          return P(null);
        }
      }
      let Ew = (() => {
          class n {
            constructor(e, i, r, s) {
              (this.router = e),
                (this.injector = r),
                (this.preloadingStrategy = s),
                (this.loader = new bw(
                  r,
                  i,
                  (l) => e.triggerEvent(new RC(l)),
                  (l) => e.triggerEvent(new kC(l))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Oe((e) => e instanceof xo),
                  cs(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const e = this.injector.get(Jn);
              return this.processRoutes(e, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(e, i) {
              const r = [];
              for (const s of i)
                if (s.loadChildren && !s.canLoad && s._loadedConfig) {
                  const o = s._loadedConfig;
                  r.push(this.processRoutes(o.module, o.routes));
                } else
                  s.loadChildren && !s.canLoad
                    ? r.push(this.preloadConfig(e, s))
                    : s.children && r.push(this.processRoutes(e, s.children));
              return Ye(r).pipe(
                Rs(),
                Q((s) => {})
              );
            }
            preloadConfig(e, i) {
              return this.preloadingStrategy.preload(i, () =>
                (i._loadedConfig
                  ? P(i._loadedConfig)
                  : this.loader.load(e.injector, i)
                ).pipe(
                  $e(
                    (s) => (
                      (i._loadedConfig = s),
                      this.processRoutes(s.module, s.routes)
                    )
                  )
                )
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(jt), C(ml), C(De), C(ww));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        pf = (() => {
          class n {
            constructor(e, i, r = {}) {
              (this.router = e),
                (this.viewportScroller = i),
                (this.options = r),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (r.scrollPositionRestoration =
                  r.scrollPositionRestoration || "disabled"),
                (r.anchorScrolling = r.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((e) => {
                e instanceof Kh
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = e.navigationTrigger),
                    (this.restoredId = e.restoredState
                      ? e.restoredState.navigationId
                      : 0))
                  : e instanceof xo &&
                    ((this.lastId = e.id),
                    this.scheduleScrollEvent(
                      e,
                      this.router.parseUrl(e.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((e) => {
                e instanceof OC &&
                  (e.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(e.position)
                    : e.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(e.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(e, i) {
              this.router.triggerEvent(
                new OC(
                  e,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  i
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (n.ɵfac = function (e) {
              Xa();
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      const nr = new A("ROUTER_CONFIGURATION"),
        Mw = new A("ROUTER_FORROOT_GUARD"),
        OL = [
          Co,
          { provide: $C, useClass: zC },
          {
            provide: jt,
            useFactory: function VL(n, t, e, i, r, s, o = {}, a, l) {
              const c = new jt(null, n, t, e, i, r, NC(s));
              return (
                a && (c.urlHandlingStrategy = a),
                l && (c.routeReuseStrategy = l),
                (function BL(n, t) {
                  n.errorHandler && (t.errorHandler = n.errorHandler),
                    n.malformedUriErrorHandler &&
                      (t.malformedUriErrorHandler = n.malformedUriErrorHandler),
                    n.onSameUrlNavigation &&
                      (t.onSameUrlNavigation = n.onSameUrlNavigation),
                    n.paramsInheritanceStrategy &&
                      (t.paramsInheritanceStrategy =
                        n.paramsInheritanceStrategy),
                    n.relativeLinkResolution &&
                      (t.relativeLinkResolution = n.relativeLinkResolution),
                    n.urlUpdateStrategy &&
                      (t.urlUpdateStrategy = n.urlUpdateStrategy),
                    n.canceledNavigationResolution &&
                      (t.canceledNavigationResolution =
                        n.canceledNavigationResolution);
                })(o, c),
                o.enableTracing &&
                  c.events.subscribe((u) => {
                    var d, h;
                    null === (d = console.group) ||
                      void 0 === d ||
                      d.call(console, `Router Event: ${u.constructor.name}`),
                      console.log(u.toString()),
                      console.log(u),
                      null === (h = console.groupEnd) ||
                        void 0 === h ||
                        h.call(console);
                  }),
                c
              );
            },
            deps: [
              $C,
              Fo,
              Co,
              De,
              ml,
              hf,
              nr,
              [class DL {}, new Ot()],
              [class bL {}, new Ot()],
            ],
          },
          Fo,
          {
            provide: fs,
            useFactory: function jL(n) {
              return n.routerState.root;
            },
            deps: [jt],
          },
          Ew,
          Dw,
          class kL {
            preload(t, e) {
              return e().pipe(ii(() => P(null)));
            }
          },
          { provide: nr, useValue: { enableTracing: !1 } },
        ];
      function FL() {
        return new wb("Router", jt);
      }
      let Sw = (() => {
        class n {
          constructor(e, i) {}
          static forRoot(e, i) {
            return {
              ngModule: n,
              providers: [
                OL,
                xw(e),
                {
                  provide: Mw,
                  useFactory: LL,
                  deps: [[jt, new Ot(), new $i()]],
                },
                { provide: nr, useValue: i || {} },
                {
                  provide: ls,
                  useFactory: NL,
                  deps: [Yi, [new Ks(Mh), new Ot()], nr],
                },
                { provide: pf, useFactory: PL, deps: [jt, UP, nr] },
                {
                  provide: ww,
                  useExisting:
                    i && i.preloadingStrategy ? i.preloadingStrategy : Dw,
                },
                { provide: wb, multi: !0, useFactory: FL },
                [
                  mf,
                  { provide: fl, multi: !0, useFactory: HL, deps: [mf] },
                  { provide: Aw, useFactory: UL, deps: [mf] },
                  { provide: mb, multi: !0, useExisting: Aw },
                ],
              ],
            };
          }
          static forChild(e) {
            return { ngModule: n, providers: [xw(e)] };
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(Mw, 8), C(jt, 8));
          }),
          (n.ɵmod = de({ type: n })),
          (n.ɵinj = le({})),
          n
        );
      })();
      function PL(n, t, e) {
        return e.scrollOffset && t.setOffset(e.scrollOffset), new pf(n, t, e);
      }
      function NL(n, t, e = {}) {
        return e.useHash ? new wF(n, t) : new zb(n, t);
      }
      function LL(n) {
        return "guarded";
      }
      function xw(n) {
        return [
          { provide: KS, multi: !0, useValue: n },
          { provide: hf, multi: !0, useValue: n },
        ];
      }
      let mf = (() => {
        class n {
          constructor(e) {
            (this.injector = e),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new K());
          }
          appInitializer() {
            return this.injector.get(vF, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0);
              let i = null;
              const r = new Promise((a) => (i = a)),
                s = this.injector.get(jt),
                o = this.injector.get(nr);
              return (
                "disabled" === o.initialNavigation
                  ? (s.setUpLocationChangeListener(), i(!0))
                  : "enabled" === o.initialNavigation ||
                    "enabledBlocking" === o.initialNavigation
                  ? ((s.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? P(null)
                        : ((this.initNavigation = !0),
                          i(!0),
                          this.resultOfPreactivationDone)),
                    s.initialNavigation())
                  : i(!0),
                r
              );
            });
          }
          bootstrapListener(e) {
            const i = this.injector.get(nr),
              r = this.injector.get(Ew),
              s = this.injector.get(pf),
              o = this.injector.get(jt),
              a = this.injector.get(os);
            e === a.components[0] &&
              (("enabledNonBlocking" === i.initialNavigation ||
                void 0 === i.initialNavigation) &&
                o.initialNavigation(),
              r.setUpPreloading(),
              s.init(),
              o.resetRootComponentType(a.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          ngOnDestroy() {
            this.destroyed = !0;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(De));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function HL(n) {
        return n.appInitializer.bind(n);
      }
      function UL(n) {
        return n.bootstrapListener.bind(n);
      }
      const Aw = new A("Router Initializer");
      let zL = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵcmp = ye({
              type: n,
              selectors: [["app-cloudage"]],
              decls: 3,
              vars: 0,
              consts: [[2, "width", "300px"]],
              template: function (e, i) {
                1 & e &&
                  (g(0, "div", 0),
                  g(1, "h5"),
                  E(
                    2,
                    " Glad to say that Experienced with CloudAge. The Best Big Data Managing Company in pune "
                  ),
                  _(),
                  _());
              },
              styles: [""],
            })),
            n
          );
        })(),
        GL = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵcmp = ye({
              type: n,
              selectors: [["app-codevian"]],
              decls: 2,
              vars: 0,
              template: function (e, i) {
                1 & e && (g(0, "p"), E(1, "codevian works!"), _());
              },
              styles: [""],
            })),
            n
          );
        })(),
        WL = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵcmp = ye({
              type: n,
              selectors: [["app-gpp"]],
              decls: 3,
              vars: 0,
              consts: [[2, "width", "300px"]],
              template: function (e, i) {
                1 & e &&
                  (g(0, "div", 0),
                  g(1, "h5"),
                  E(
                    2,
                    " I Have Completed Computer Science With First Class From Maharastras Best Colllge in Shivajinagar Pune "
                  ),
                  _(),
                  _());
              },
              styles: [""],
            })),
            n
          );
        })(),
        qL = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵcmp = ye({
              type: n,
              selectors: [["app-igt"]],
              decls: 3,
              vars: 0,
              consts: [[2, "width", "300px", "z-index", "999"]],
              template: function (e, i) {
                1 & e &&
                  (g(0, "div", 0),
                  g(1, "h5"),
                  E(
                    2,
                    " I Have Completed Full Stack Web Development using MEAN With Distinction Class From Infinite Grafix Technology While Working With Cloudage "
                  ),
                  _(),
                  _());
              },
              styles: [""],
            })),
            n
          );
        })();
      function at(n) {
        return null != n && "false" != `${n}`;
      }
      function Vo(n) {
        return Array.isArray(n) ? n : [n];
      }
      function Ue(n) {
        return null == n ? "" : "string" == typeof n ? n : `${n}px`;
      }
      function ms(n) {
        return n instanceof _e ? n.nativeElement : n;
      }
      const YL = ["addListener", "removeListener"],
        ZL = ["addEventListener", "removeEventListener"],
        XL = ["on", "off"];
      function ir(n, t, e, i) {
        if ((se(e) && ((i = e), (e = void 0)), i))
          return ir(n, t, e).pipe(Gh(i));
        const [r, s] = (function tV(n) {
          return se(n.addEventListener) && se(n.removeEventListener);
        })(n)
          ? ZL.map((o) => (a) => n[o](t, a, e))
          : (function JL(n) {
              return se(n.addListener) && se(n.removeListener);
            })(n)
          ? YL.map(Tw(n, t))
          : (function eV(n) {
              return se(n.on) && se(n.off);
            })(n)
          ? XL.map(Tw(n, t))
          : [];
        if (!r && qc(n)) return $e((o) => ir(o, t, e))(xt(n));
        if (!r) throw new TypeError("Invalid event target");
        return new he((o) => {
          const a = (...l) => o.next(1 < l.length ? l : l[0]);
          return r(a), () => s(a);
        });
      }
      function Tw(n, t) {
        return (e) => (i) => n[e](t, i);
      }
      class nV extends Ve {
        constructor(t, e) {
          super();
        }
        schedule(t, e = 0) {
          return this;
        }
      }
      const Xl = {
        setInterval(...n) {
          const { delegate: t } = Xl;
          return ((null == t ? void 0 : t.setInterval) || setInterval)(...n);
        },
        clearInterval(n) {
          const { delegate: t } = Xl;
          return ((null == t ? void 0 : t.clearInterval) || clearInterval)(n);
        },
        delegate: void 0,
      };
      class gf extends nV {
        constructor(t, e) {
          super(t, e),
            (this.scheduler = t),
            (this.work = e),
            (this.pending = !1);
        }
        schedule(t, e = 0) {
          if (this.closed) return this;
          this.state = t;
          const i = this.id,
            r = this.scheduler;
          return (
            null != i && (this.id = this.recycleAsyncId(r, i, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id = this.id || this.requestAsyncId(r, this.id, e)),
            this
          );
        }
        requestAsyncId(t, e, i = 0) {
          return Xl.setInterval(t.flush.bind(t, this), i);
        }
        recycleAsyncId(t, e, i = 0) {
          if (null != i && this.delay === i && !1 === this.pending) return e;
          Xl.clearInterval(e);
        }
        execute(t, e) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const i = this._execute(t, e);
          if (i) return i;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(t, e) {
          let r,
            i = !1;
          try {
            this.work(t);
          } catch (s) {
            (i = !0),
              (r = s || new Error("Scheduled action threw falsy error"));
          }
          if (i) return this.unsubscribe(), r;
        }
        unsubscribe() {
          if (!this.closed) {
            const { id: t, scheduler: e } = this,
              { actions: i } = e;
            (this.work = this.state = this.scheduler = null),
              (this.pending = !1),
              mr(i, this),
              null != t && (this.id = this.recycleAsyncId(e, t, null)),
              (this.delay = null),
              super.unsubscribe();
          }
        }
      }
      const Bo = {
          schedule(n) {
            let t = requestAnimationFrame,
              e = cancelAnimationFrame;
            const { delegate: i } = Bo;
            i && ((t = i.requestAnimationFrame), (e = i.cancelAnimationFrame));
            const r = t((s) => {
              (e = void 0), n(s);
            });
            return new Ve(() => (null == e ? void 0 : e(r)));
          },
          requestAnimationFrame(...n) {
            const { delegate: t } = Bo;
            return (
              (null == t ? void 0 : t.requestAnimationFrame) ||
              requestAnimationFrame
            )(...n);
          },
          cancelAnimationFrame(...n) {
            const { delegate: t } = Bo;
            return (
              (null == t ? void 0 : t.cancelAnimationFrame) ||
              cancelAnimationFrame
            )(...n);
          },
          delegate: void 0,
        },
        Iw = { now: () => (Iw.delegate || Date).now(), delegate: void 0 };
      class jo {
        constructor(t, e = jo.now) {
          (this.schedulerActionCtor = t), (this.now = e);
        }
        schedule(t, e = 0, i) {
          return new this.schedulerActionCtor(this, t).schedule(i, e);
        }
      }
      jo.now = Iw.now;
      class _f extends jo {
        constructor(t, e = jo.now) {
          super(t, e),
            (this.actions = []),
            (this._active = !1),
            (this._scheduled = void 0);
        }
        flush(t) {
          const { actions: e } = this;
          if (this._active) return void e.push(t);
          let i;
          this._active = !0;
          do {
            if ((i = t.execute(t.state, t.delay))) break;
          } while ((t = e.shift()));
          if (((this._active = !1), i)) {
            for (; (t = e.shift()); ) t.unsubscribe();
            throw i;
          }
        }
      }
      new (class rV extends _f {
        flush(t) {
          (this._active = !0), (this._scheduled = void 0);
          const { actions: e } = this;
          let i,
            r = -1;
          t = t || e.shift();
          const s = e.length;
          do {
            if ((i = t.execute(t.state, t.delay))) break;
          } while (++r < s && (t = e.shift()));
          if (((this._active = !1), i)) {
            for (; ++r < s && (t = e.shift()); ) t.unsubscribe();
            throw i;
          }
        }
      })(
        class iV extends gf {
          constructor(t, e) {
            super(t, e), (this.scheduler = t), (this.work = e);
          }
          requestAsyncId(t, e, i = 0) {
            return null !== i && i > 0
              ? super.requestAsyncId(t, e, i)
              : (t.actions.push(this),
                t._scheduled ||
                  (t._scheduled = Bo.requestAnimationFrame(() =>
                    t.flush(void 0)
                  )));
          }
          recycleAsyncId(t, e, i = 0) {
            if ((null != i && i > 0) || (null == i && this.delay > 0))
              return super.recycleAsyncId(t, e, i);
            0 === t.actions.length &&
              (Bo.cancelAnimationFrame(e), (t._scheduled = void 0));
          }
        }
      );
      let yf,
        oV = 1;
      const Jl = {};
      function Rw(n) {
        return n in Jl && (delete Jl[n], !0);
      }
      const aV = {
          setImmediate(n) {
            const t = oV++;
            return (
              (Jl[t] = !0),
              yf || (yf = Promise.resolve()),
              yf.then(() => Rw(t) && n()),
              t
            );
          },
          clearImmediate(n) {
            Rw(n);
          },
        },
        { setImmediate: lV, clearImmediate: cV } = aV,
        ec = {
          setImmediate(...n) {
            const { delegate: t } = ec;
            return ((null == t ? void 0 : t.setImmediate) || lV)(...n);
          },
          clearImmediate(n) {
            const { delegate: t } = ec;
            return ((null == t ? void 0 : t.clearImmediate) || cV)(n);
          },
          delegate: void 0,
        },
        kw =
          (new (class dV extends _f {
            flush(t) {
              (this._active = !0), (this._scheduled = void 0);
              const { actions: e } = this;
              let i,
                r = -1;
              t = t || e.shift();
              const s = e.length;
              do {
                if ((i = t.execute(t.state, t.delay))) break;
              } while (++r < s && (t = e.shift()));
              if (((this._active = !1), i)) {
                for (; ++r < s && (t = e.shift()); ) t.unsubscribe();
                throw i;
              }
            }
          })(
            class uV extends gf {
              constructor(t, e) {
                super(t, e), (this.scheduler = t), (this.work = e);
              }
              requestAsyncId(t, e, i = 0) {
                return null !== i && i > 0
                  ? super.requestAsyncId(t, e, i)
                  : (t.actions.push(this),
                    t._scheduled ||
                      (t._scheduled = ec.setImmediate(
                        t.flush.bind(t, void 0)
                      )));
              }
              recycleAsyncId(t, e, i = 0) {
                if ((null != i && i > 0) || (null == i && this.delay > 0))
                  return super.recycleAsyncId(t, e, i);
                0 === t.actions.length &&
                  (ec.clearImmediate(e), (t._scheduled = void 0));
              }
            }
          ),
          new _f(gf)),
        Ow = kw;
      function Fw(n, t = Ow) {
        return (function fV(n) {
          return Pe((t, e) => {
            let i = !1,
              r = null,
              s = null,
              o = !1;
            const a = () => {
                if ((null == s || s.unsubscribe(), (s = null), i)) {
                  i = !1;
                  const c = r;
                  (r = null), e.next(c);
                }
                o && e.complete();
              },
              l = () => {
                (s = null), o && e.complete();
              };
            t.subscribe(
              new Se(
                e,
                (c) => {
                  (i = !0),
                    (r = c),
                    s || xt(n(c)).subscribe((s = new Se(e, a, l)));
                },
                () => {
                  (o = !0), (!i || !s || s.closed) && e.complete();
                }
              )
            );
          });
        })(() =>
          (function mV(n = 0, t, e = Ow) {
            let i = -1;
            return (
              null != t && (im(t) ? (e = t) : (i = t)),
              new he((r) => {
                let s = (function pV(n) {
                  return n instanceof Date && !isNaN(n);
                })(n)
                  ? +n - e.now()
                  : n;
                s < 0 && (s = 0);
                let o = 0;
                return e.schedule(function () {
                  r.closed ||
                    (r.next(o++),
                    0 <= i ? this.schedule(void 0, i) : r.complete());
                }, s);
              })
            );
          })(n, t)
        );
      }
      let vf;
      try {
        vf = "undefined" != typeof Intl && Intl.v8BreakIterator;
      } catch (n) {
        vf = !1;
      }
      let Ho,
        rr,
        Cf,
        Dn = (() => {
          class n {
            constructor(e) {
              (this._platformId = e),
                (this.isBrowser = this._platformId
                  ? (function HP(n) {
                      return n === sC;
                    })(this._platformId)
                  : "object" == typeof document && !!document),
                (this.EDGE =
                  this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                  this.isBrowser &&
                  /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !vf) &&
                  "undefined" != typeof CSS &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !("MSStream" in window)),
                (this.FIREFOX =
                  this.isBrowser &&
                  /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser &&
                  /android/i.test(navigator.userAgent) &&
                  !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser &&
                  /safari/i.test(navigator.userAgent) &&
                  this.WEBKIT);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(pl));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      function bf(n) {
        return (function gV() {
          if (null == Ho && "undefined" != typeof window)
            try {
              window.addEventListener(
                "test",
                null,
                Object.defineProperty({}, "passive", { get: () => (Ho = !0) })
              );
            } finally {
              Ho = Ho || !1;
            }
          return Ho;
        })()
          ? n
          : !!n.capture;
      }
      function _V() {
        if (null == rr) {
          if (
            "object" != typeof document ||
            !document ||
            "function" != typeof Element ||
            !Element
          )
            return (rr = !1), rr;
          if ("scrollBehavior" in document.documentElement.style) rr = !0;
          else {
            const n = Element.prototype.scrollTo;
            rr = !!n && !/\{\s*\[native code\]\s*\}/.test(n.toString());
          }
        }
        return rr;
      }
      function _s() {
        let n =
          "undefined" != typeof document && document
            ? document.activeElement
            : null;
        for (; n && n.shadowRoot; ) {
          const t = n.shadowRoot.activeElement;
          if (t === n) break;
          n = t;
        }
        return n;
      }
      function sr(n) {
        return n.composedPath ? n.composedPath()[0] : n.target;
      }
      function wf() {
        return (
          ("undefined" != typeof __karma__ && !!__karma__) ||
          ("undefined" != typeof jasmine && !!jasmine) ||
          ("undefined" != typeof jest && !!jest) ||
          ("undefined" != typeof Mocha && !!Mocha)
        );
      }
      const bV = new A("cdk-dir-doc", {
          providedIn: "root",
          factory: function CV() {
            return Ru(Z);
          },
        }),
        wV =
          /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
      let Uo = (() => {
          class n {
            constructor(e) {
              if (((this.value = "ltr"), (this.change = new ee()), e)) {
                const r = e.documentElement ? e.documentElement.dir : null;
                this.value = (function DV(n) {
                  const t = (null == n ? void 0 : n.toLowerCase()) || "";
                  return "auto" === t &&
                    "undefined" != typeof navigator &&
                    (null == navigator ? void 0 : navigator.language)
                    ? wV.test(navigator.language)
                      ? "rtl"
                      : "ltr"
                    : "rtl" === t
                    ? "rtl"
                    : "ltr";
                })((e.body ? e.body.dir : null) || r || "ltr");
              }
            }
            ngOnDestroy() {
              this.change.complete();
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(bV, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        $o = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({})),
            n
          );
        })(),
        MV = (() => {
          class n {
            constructor(e, i, r) {
              (this._ngZone = e),
                (this._platform = i),
                (this._scrolled = new K()),
                (this._globalSubscription = null),
                (this._scrolledCount = 0),
                (this.scrollContainers = new Map()),
                (this._document = r);
            }
            register(e) {
              this.scrollContainers.has(e) ||
                this.scrollContainers.set(
                  e,
                  e.elementScrolled().subscribe(() => this._scrolled.next(e))
                );
            }
            deregister(e) {
              const i = this.scrollContainers.get(e);
              i && (i.unsubscribe(), this.scrollContainers.delete(e));
            }
            scrolled(e = 20) {
              return this._platform.isBrowser
                ? new he((i) => {
                    this._globalSubscription || this._addGlobalListener();
                    const r =
                      e > 0
                        ? this._scrolled.pipe(Fw(e)).subscribe(i)
                        : this._scrolled.subscribe(i);
                    return (
                      this._scrolledCount++,
                      () => {
                        r.unsubscribe(),
                          this._scrolledCount--,
                          this._scrolledCount || this._removeGlobalListener();
                      }
                    );
                  })
                : P();
            }
            ngOnDestroy() {
              this._removeGlobalListener(),
                this.scrollContainers.forEach((e, i) => this.deregister(i)),
                this._scrolled.complete();
            }
            ancestorScrolled(e, i) {
              const r = this.getAncestorScrollContainers(e);
              return this.scrolled(i).pipe(Oe((s) => !s || r.indexOf(s) > -1));
            }
            getAncestorScrollContainers(e) {
              const i = [];
              return (
                this.scrollContainers.forEach((r, s) => {
                  this._scrollableContainsElement(s, e) && i.push(s);
                }),
                i
              );
            }
            _getWindow() {
              return this._document.defaultView || window;
            }
            _scrollableContainsElement(e, i) {
              let r = ms(i),
                s = e.getElementRef().nativeElement;
              do {
                if (r == s) return !0;
              } while ((r = r.parentElement));
              return !1;
            }
            _addGlobalListener() {
              this._globalSubscription = this._ngZone.runOutsideAngular(() =>
                ir(this._getWindow().document, "scroll").subscribe(() =>
                  this._scrolled.next()
                )
              );
            }
            _removeGlobalListener() {
              this._globalSubscription &&
                (this._globalSubscription.unsubscribe(),
                (this._globalSubscription = null));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(re), C(Dn), C(Z, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        Nw = (() => {
          class n {
            constructor(e, i, r) {
              (this._platform = e),
                (this._change = new K()),
                (this._changeListener = (s) => {
                  this._change.next(s);
                }),
                (this._document = r),
                i.runOutsideAngular(() => {
                  if (e.isBrowser) {
                    const s = this._getWindow();
                    s.addEventListener("resize", this._changeListener),
                      s.addEventListener(
                        "orientationchange",
                        this._changeListener
                      );
                  }
                  this.change().subscribe(() => (this._viewportSize = null));
                });
            }
            ngOnDestroy() {
              if (this._platform.isBrowser) {
                const e = this._getWindow();
                e.removeEventListener("resize", this._changeListener),
                  e.removeEventListener(
                    "orientationchange",
                    this._changeListener
                  );
              }
              this._change.complete();
            }
            getViewportSize() {
              this._viewportSize || this._updateViewportSize();
              const e = {
                width: this._viewportSize.width,
                height: this._viewportSize.height,
              };
              return this._platform.isBrowser || (this._viewportSize = null), e;
            }
            getViewportRect() {
              const e = this.getViewportScrollPosition(),
                { width: i, height: r } = this.getViewportSize();
              return {
                top: e.top,
                left: e.left,
                bottom: e.top + r,
                right: e.left + i,
                height: r,
                width: i,
              };
            }
            getViewportScrollPosition() {
              if (!this._platform.isBrowser) return { top: 0, left: 0 };
              const e = this._document,
                i = this._getWindow(),
                r = e.documentElement,
                s = r.getBoundingClientRect();
              return {
                top:
                  -s.top || e.body.scrollTop || i.scrollY || r.scrollTop || 0,
                left:
                  -s.left ||
                  e.body.scrollLeft ||
                  i.scrollX ||
                  r.scrollLeft ||
                  0,
              };
            }
            change(e = 20) {
              return e > 0 ? this._change.pipe(Fw(e)) : this._change;
            }
            _getWindow() {
              return this._document.defaultView || window;
            }
            _updateViewportSize() {
              const e = this._getWindow();
              this._viewportSize = this._platform.isBrowser
                ? { width: e.innerWidth, height: e.innerHeight }
                : { width: 0, height: 0 };
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(Dn), C(re), C(Z, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        nc = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({})),
            n
          );
        })(),
        Lw = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({ imports: [[$o, nc], $o, nc] })),
            n
          );
        })();
      class Df {
        attach(t) {
          return (this._attachedHost = t), t.attach(this);
        }
        detach() {
          let t = this._attachedHost;
          null != t && ((this._attachedHost = null), t.detach());
        }
        get isAttached() {
          return null != this._attachedHost;
        }
        setAttachedHost(t) {
          this._attachedHost = t;
        }
      }
      class zo extends Df {
        constructor(t, e, i, r) {
          super(),
            (this.component = t),
            (this.viewContainerRef = e),
            (this.injector = i),
            (this.componentFactoryResolver = r);
        }
      }
      class ic extends Df {
        constructor(t, e, i) {
          super(),
            (this.templateRef = t),
            (this.viewContainerRef = e),
            (this.context = i);
        }
        get origin() {
          return this.templateRef.elementRef;
        }
        attach(t, e = this.context) {
          return (this.context = e), super.attach(t);
        }
        detach() {
          return (this.context = void 0), super.detach();
        }
      }
      class xV extends Df {
        constructor(t) {
          super(), (this.element = t instanceof _e ? t.nativeElement : t);
        }
      }
      class rc {
        constructor() {
          (this._isDisposed = !1), (this.attachDomPortal = null);
        }
        hasAttached() {
          return !!this._attachedPortal;
        }
        attach(t) {
          return t instanceof zo
            ? ((this._attachedPortal = t), this.attachComponentPortal(t))
            : t instanceof ic
            ? ((this._attachedPortal = t), this.attachTemplatePortal(t))
            : this.attachDomPortal && t instanceof xV
            ? ((this._attachedPortal = t), this.attachDomPortal(t))
            : void 0;
        }
        detach() {
          this._attachedPortal &&
            (this._attachedPortal.setAttachedHost(null),
            (this._attachedPortal = null)),
            this._invokeDisposeFn();
        }
        dispose() {
          this.hasAttached() && this.detach(),
            this._invokeDisposeFn(),
            (this._isDisposed = !0);
        }
        setDisposeFn(t) {
          this._disposeFn = t;
        }
        _invokeDisposeFn() {
          this._disposeFn && (this._disposeFn(), (this._disposeFn = null));
        }
      }
      class AV extends rc {
        constructor(t, e, i, r, s) {
          super(),
            (this.outletElement = t),
            (this._componentFactoryResolver = e),
            (this._appRef = i),
            (this._defaultInjector = r),
            (this.attachDomPortal = (o) => {
              const a = o.element,
                l = this._document.createComment("dom-portal");
              a.parentNode.insertBefore(l, a),
                this.outletElement.appendChild(a),
                (this._attachedPortal = o),
                super.setDisposeFn(() => {
                  l.parentNode && l.parentNode.replaceChild(a, l);
                });
            }),
            (this._document = s);
        }
        attachComponentPortal(t) {
          const i = (
            t.componentFactoryResolver || this._componentFactoryResolver
          ).resolveComponentFactory(t.component);
          let r;
          return (
            t.viewContainerRef
              ? ((r = t.viewContainerRef.createComponent(
                  i,
                  t.viewContainerRef.length,
                  t.injector || t.viewContainerRef.injector
                )),
                this.setDisposeFn(() => r.destroy()))
              : ((r = i.create(t.injector || this._defaultInjector || De.NULL)),
                this._appRef.attachView(r.hostView),
                this.setDisposeFn(() => {
                  this._appRef.viewCount > 0 &&
                    this._appRef.detachView(r.hostView),
                    r.destroy();
                })),
            this.outletElement.appendChild(this._getComponentRootNode(r)),
            (this._attachedPortal = t),
            r
          );
        }
        attachTemplatePortal(t) {
          let e = t.viewContainerRef,
            i = e.createEmbeddedView(t.templateRef, t.context);
          return (
            i.rootNodes.forEach((r) => this.outletElement.appendChild(r)),
            i.detectChanges(),
            this.setDisposeFn(() => {
              let r = e.indexOf(i);
              -1 !== r && e.remove(r);
            }),
            (this._attachedPortal = t),
            i
          );
        }
        dispose() {
          super.dispose(), this.outletElement.remove();
        }
        _getComponentRootNode(t) {
          return t.hostView.rootNodes[0];
        }
      }
      let Go = (() => {
          class n extends rc {
            constructor(e, i, r) {
              super(),
                (this._componentFactoryResolver = e),
                (this._viewContainerRef = i),
                (this._isInitialized = !1),
                (this.attached = new ee()),
                (this.attachDomPortal = (s) => {
                  const o = s.element,
                    a = this._document.createComment("dom-portal");
                  s.setAttachedHost(this),
                    o.parentNode.insertBefore(a, o),
                    this._getRootNode().appendChild(o),
                    (this._attachedPortal = s),
                    super.setDisposeFn(() => {
                      a.parentNode && a.parentNode.replaceChild(o, a);
                    });
                }),
                (this._document = r);
            }
            get portal() {
              return this._attachedPortal;
            }
            set portal(e) {
              (this.hasAttached() && !e && !this._isInitialized) ||
                (this.hasAttached() && super.detach(),
                e && super.attach(e),
                (this._attachedPortal = e || null));
            }
            get attachedRef() {
              return this._attachedRef;
            }
            ngOnInit() {
              this._isInitialized = !0;
            }
            ngOnDestroy() {
              super.dispose(),
                (this._attachedPortal = null),
                (this._attachedRef = null);
            }
            attachComponentPortal(e) {
              e.setAttachedHost(this);
              const i =
                  null != e.viewContainerRef
                    ? e.viewContainerRef
                    : this._viewContainerRef,
                s = (
                  e.componentFactoryResolver || this._componentFactoryResolver
                ).resolveComponentFactory(e.component),
                o = i.createComponent(s, i.length, e.injector || i.injector);
              return (
                i !== this._viewContainerRef &&
                  this._getRootNode().appendChild(o.hostView.rootNodes[0]),
                super.setDisposeFn(() => o.destroy()),
                (this._attachedPortal = e),
                (this._attachedRef = o),
                this.attached.emit(o),
                o
              );
            }
            attachTemplatePortal(e) {
              e.setAttachedHost(this);
              const i = this._viewContainerRef.createEmbeddedView(
                e.templateRef,
                e.context
              );
              return (
                super.setDisposeFn(() => this._viewContainerRef.clear()),
                (this._attachedPortal = e),
                (this._attachedRef = i),
                this.attached.emit(i),
                i
              );
            }
            _getRootNode() {
              const e = this._viewContainerRef.element.nativeElement;
              return e.nodeType === e.ELEMENT_NODE ? e : e.parentNode;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(y(bi), y(Vt), y(Z));
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [["", "cdkPortalOutlet", ""]],
              inputs: { portal: ["cdkPortalOutlet", "portal"] },
              outputs: { attached: "attached" },
              exportAs: ["cdkPortalOutlet"],
              features: [q],
            })),
            n
          );
        })(),
        sc = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({})),
            n
          );
        })();
      function oi(n) {
        return Pe((t, e) => {
          xt(n).subscribe(new Se(e, () => e.complete(), Is)),
            !e.closed && t.subscribe(e);
        });
      }
      const Vw = _V();
      class TV {
        constructor(t, e) {
          (this._viewportRuler = t),
            (this._previousHTMLStyles = { top: "", left: "" }),
            (this._isEnabled = !1),
            (this._document = e);
        }
        attach() {}
        enable() {
          if (this._canBeEnabled()) {
            const t = this._document.documentElement;
            (this._previousScrollPosition =
              this._viewportRuler.getViewportScrollPosition()),
              (this._previousHTMLStyles.left = t.style.left || ""),
              (this._previousHTMLStyles.top = t.style.top || ""),
              (t.style.left = Ue(-this._previousScrollPosition.left)),
              (t.style.top = Ue(-this._previousScrollPosition.top)),
              t.classList.add("cdk-global-scrollblock"),
              (this._isEnabled = !0);
          }
        }
        disable() {
          if (this._isEnabled) {
            const t = this._document.documentElement,
              i = t.style,
              r = this._document.body.style,
              s = i.scrollBehavior || "",
              o = r.scrollBehavior || "";
            (this._isEnabled = !1),
              (i.left = this._previousHTMLStyles.left),
              (i.top = this._previousHTMLStyles.top),
              t.classList.remove("cdk-global-scrollblock"),
              Vw && (i.scrollBehavior = r.scrollBehavior = "auto"),
              window.scroll(
                this._previousScrollPosition.left,
                this._previousScrollPosition.top
              ),
              Vw && ((i.scrollBehavior = s), (r.scrollBehavior = o));
          }
        }
        _canBeEnabled() {
          if (
            this._document.documentElement.classList.contains(
              "cdk-global-scrollblock"
            ) ||
            this._isEnabled
          )
            return !1;
          const e = this._document.body,
            i = this._viewportRuler.getViewportSize();
          return e.scrollHeight > i.height || e.scrollWidth > i.width;
        }
      }
      class IV {
        constructor(t, e, i, r) {
          (this._scrollDispatcher = t),
            (this._ngZone = e),
            (this._viewportRuler = i),
            (this._config = r),
            (this._scrollSubscription = null),
            (this._detach = () => {
              this.disable(),
                this._overlayRef.hasAttached() &&
                  this._ngZone.run(() => this._overlayRef.detach());
            });
        }
        attach(t) {
          this._overlayRef = t;
        }
        enable() {
          if (this._scrollSubscription) return;
          const t = this._scrollDispatcher.scrolled(0);
          this._config && this._config.threshold && this._config.threshold > 1
            ? ((this._initialScrollPosition =
                this._viewportRuler.getViewportScrollPosition().top),
              (this._scrollSubscription = t.subscribe(() => {
                const e = this._viewportRuler.getViewportScrollPosition().top;
                Math.abs(e - this._initialScrollPosition) >
                this._config.threshold
                  ? this._detach()
                  : this._overlayRef.updatePosition();
              })))
            : (this._scrollSubscription = t.subscribe(this._detach));
        }
        disable() {
          this._scrollSubscription &&
            (this._scrollSubscription.unsubscribe(),
            (this._scrollSubscription = null));
        }
        detach() {
          this.disable(), (this._overlayRef = null);
        }
      }
      class Bw {
        enable() {}
        disable() {}
        attach() {}
      }
      function Ef(n, t) {
        return t.some(
          (e) =>
            n.bottom < e.top ||
            n.top > e.bottom ||
            n.right < e.left ||
            n.left > e.right
        );
      }
      function jw(n, t) {
        return t.some(
          (e) =>
            n.top < e.top ||
            n.bottom > e.bottom ||
            n.left < e.left ||
            n.right > e.right
        );
      }
      class RV {
        constructor(t, e, i, r) {
          (this._scrollDispatcher = t),
            (this._viewportRuler = e),
            (this._ngZone = i),
            (this._config = r),
            (this._scrollSubscription = null);
        }
        attach(t) {
          this._overlayRef = t;
        }
        enable() {
          this._scrollSubscription ||
            (this._scrollSubscription = this._scrollDispatcher
              .scrolled(this._config ? this._config.scrollThrottle : 0)
              .subscribe(() => {
                if (
                  (this._overlayRef.updatePosition(),
                  this._config && this._config.autoClose)
                ) {
                  const e =
                      this._overlayRef.overlayElement.getBoundingClientRect(),
                    { width: i, height: r } =
                      this._viewportRuler.getViewportSize();
                  Ef(e, [
                    {
                      width: i,
                      height: r,
                      bottom: r,
                      right: i,
                      top: 0,
                      left: 0,
                    },
                  ]) &&
                    (this.disable(),
                    this._ngZone.run(() => this._overlayRef.detach()));
                }
              }));
        }
        disable() {
          this._scrollSubscription &&
            (this._scrollSubscription.unsubscribe(),
            (this._scrollSubscription = null));
        }
        detach() {
          this.disable(), (this._overlayRef = null);
        }
      }
      let kV = (() => {
        class n {
          constructor(e, i, r, s) {
            (this._scrollDispatcher = e),
              (this._viewportRuler = i),
              (this._ngZone = r),
              (this.noop = () => new Bw()),
              (this.close = (o) =>
                new IV(
                  this._scrollDispatcher,
                  this._ngZone,
                  this._viewportRuler,
                  o
                )),
              (this.block = () => new TV(this._viewportRuler, this._document)),
              (this.reposition = (o) =>
                new RV(
                  this._scrollDispatcher,
                  this._viewportRuler,
                  this._ngZone,
                  o
                )),
              (this._document = s);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(MV), C(Nw), C(re), C(Z));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      class Mf {
        constructor(t) {
          if (
            ((this.scrollStrategy = new Bw()),
            (this.panelClass = ""),
            (this.hasBackdrop = !1),
            (this.backdropClass = "cdk-overlay-dark-backdrop"),
            (this.disposeOnNavigation = !1),
            t)
          ) {
            const e = Object.keys(t);
            for (const i of e) void 0 !== t[i] && (this[i] = t[i]);
          }
        }
      }
      class OV {
        constructor(t, e) {
          (this.connectionPair = t), (this.scrollableViewProperties = e);
        }
      }
      class FV {
        constructor(t, e, i, r, s, o, a, l, c) {
          (this._portalOutlet = t),
            (this._host = e),
            (this._pane = i),
            (this._config = r),
            (this._ngZone = s),
            (this._keyboardDispatcher = o),
            (this._document = a),
            (this._location = l),
            (this._outsideClickDispatcher = c),
            (this._backdropElement = null),
            (this._backdropClick = new K()),
            (this._attachments = new K()),
            (this._detachments = new K()),
            (this._locationChanges = Ve.EMPTY),
            (this._backdropClickHandler = (u) => this._backdropClick.next(u)),
            (this._backdropTransitionendHandler = (u) => {
              this._disposeBackdrop(u.target);
            }),
            (this._keydownEvents = new K()),
            (this._outsidePointerEvents = new K()),
            r.scrollStrategy &&
              ((this._scrollStrategy = r.scrollStrategy),
              this._scrollStrategy.attach(this)),
            (this._positionStrategy = r.positionStrategy);
        }
        get overlayElement() {
          return this._pane;
        }
        get backdropElement() {
          return this._backdropElement;
        }
        get hostElement() {
          return this._host;
        }
        attach(t) {
          !this._host.parentElement &&
            this._previousHostParent &&
            this._previousHostParent.appendChild(this._host);
          const e = this._portalOutlet.attach(t);
          return (
            this._positionStrategy && this._positionStrategy.attach(this),
            this._updateStackingOrder(),
            this._updateElementSize(),
            this._updateElementDirection(),
            this._scrollStrategy && this._scrollStrategy.enable(),
            this._ngZone.onStable.pipe(ze(1)).subscribe(() => {
              this.hasAttached() && this.updatePosition();
            }),
            this._togglePointerEvents(!0),
            this._config.hasBackdrop && this._attachBackdrop(),
            this._config.panelClass &&
              this._toggleClasses(this._pane, this._config.panelClass, !0),
            this._attachments.next(),
            this._keyboardDispatcher.add(this),
            this._config.disposeOnNavigation &&
              (this._locationChanges = this._location.subscribe(() =>
                this.dispose()
              )),
            this._outsideClickDispatcher.add(this),
            e
          );
        }
        detach() {
          if (!this.hasAttached()) return;
          this.detachBackdrop(),
            this._togglePointerEvents(!1),
            this._positionStrategy &&
              this._positionStrategy.detach &&
              this._positionStrategy.detach(),
            this._scrollStrategy && this._scrollStrategy.disable();
          const t = this._portalOutlet.detach();
          return (
            this._detachments.next(),
            this._keyboardDispatcher.remove(this),
            this._detachContentWhenStable(),
            this._locationChanges.unsubscribe(),
            this._outsideClickDispatcher.remove(this),
            t
          );
        }
        dispose() {
          var t;
          const e = this.hasAttached();
          this._positionStrategy && this._positionStrategy.dispose(),
            this._disposeScrollStrategy(),
            this._disposeBackdrop(this._backdropElement),
            this._locationChanges.unsubscribe(),
            this._keyboardDispatcher.remove(this),
            this._portalOutlet.dispose(),
            this._attachments.complete(),
            this._backdropClick.complete(),
            this._keydownEvents.complete(),
            this._outsidePointerEvents.complete(),
            this._outsideClickDispatcher.remove(this),
            null === (t = this._host) || void 0 === t || t.remove(),
            (this._previousHostParent = this._pane = this._host = null),
            e && this._detachments.next(),
            this._detachments.complete();
        }
        hasAttached() {
          return this._portalOutlet.hasAttached();
        }
        backdropClick() {
          return this._backdropClick;
        }
        attachments() {
          return this._attachments;
        }
        detachments() {
          return this._detachments;
        }
        keydownEvents() {
          return this._keydownEvents;
        }
        outsidePointerEvents() {
          return this._outsidePointerEvents;
        }
        getConfig() {
          return this._config;
        }
        updatePosition() {
          this._positionStrategy && this._positionStrategy.apply();
        }
        updatePositionStrategy(t) {
          t !== this._positionStrategy &&
            (this._positionStrategy && this._positionStrategy.dispose(),
            (this._positionStrategy = t),
            this.hasAttached() && (t.attach(this), this.updatePosition()));
        }
        updateSize(t) {
          (this._config = Object.assign(Object.assign({}, this._config), t)),
            this._updateElementSize();
        }
        setDirection(t) {
          (this._config = Object.assign(Object.assign({}, this._config), {
            direction: t,
          })),
            this._updateElementDirection();
        }
        addPanelClass(t) {
          this._pane && this._toggleClasses(this._pane, t, !0);
        }
        removePanelClass(t) {
          this._pane && this._toggleClasses(this._pane, t, !1);
        }
        getDirection() {
          const t = this._config.direction;
          return t ? ("string" == typeof t ? t : t.value) : "ltr";
        }
        updateScrollStrategy(t) {
          t !== this._scrollStrategy &&
            (this._disposeScrollStrategy(),
            (this._scrollStrategy = t),
            this.hasAttached() && (t.attach(this), t.enable()));
        }
        _updateElementDirection() {
          this._host.setAttribute("dir", this.getDirection());
        }
        _updateElementSize() {
          if (!this._pane) return;
          const t = this._pane.style;
          (t.width = Ue(this._config.width)),
            (t.height = Ue(this._config.height)),
            (t.minWidth = Ue(this._config.minWidth)),
            (t.minHeight = Ue(this._config.minHeight)),
            (t.maxWidth = Ue(this._config.maxWidth)),
            (t.maxHeight = Ue(this._config.maxHeight));
        }
        _togglePointerEvents(t) {
          this._pane.style.pointerEvents = t ? "" : "none";
        }
        _attachBackdrop() {
          const t = "cdk-overlay-backdrop-showing";
          (this._backdropElement = this._document.createElement("div")),
            this._backdropElement.classList.add("cdk-overlay-backdrop"),
            this._config.backdropClass &&
              this._toggleClasses(
                this._backdropElement,
                this._config.backdropClass,
                !0
              ),
            this._host.parentElement.insertBefore(
              this._backdropElement,
              this._host
            ),
            this._backdropElement.addEventListener(
              "click",
              this._backdropClickHandler
            ),
            "undefined" != typeof requestAnimationFrame
              ? this._ngZone.runOutsideAngular(() => {
                  requestAnimationFrame(() => {
                    this._backdropElement &&
                      this._backdropElement.classList.add(t);
                  });
                })
              : this._backdropElement.classList.add(t);
        }
        _updateStackingOrder() {
          this._host.nextSibling &&
            this._host.parentNode.appendChild(this._host);
        }
        detachBackdrop() {
          const t = this._backdropElement;
          !t ||
            (t.classList.remove("cdk-overlay-backdrop-showing"),
            this._ngZone.runOutsideAngular(() => {
              t.addEventListener(
                "transitionend",
                this._backdropTransitionendHandler
              );
            }),
            (t.style.pointerEvents = "none"),
            (this._backdropTimeout = this._ngZone.runOutsideAngular(() =>
              setTimeout(() => {
                this._disposeBackdrop(t);
              }, 500)
            )));
        }
        _toggleClasses(t, e, i) {
          const r = Vo(e || []).filter((s) => !!s);
          r.length && (i ? t.classList.add(...r) : t.classList.remove(...r));
        }
        _detachContentWhenStable() {
          this._ngZone.runOutsideAngular(() => {
            const t = this._ngZone.onStable
              .pipe(oi(ca(this._attachments, this._detachments)))
              .subscribe(() => {
                (!this._pane ||
                  !this._host ||
                  0 === this._pane.children.length) &&
                  (this._pane &&
                    this._config.panelClass &&
                    this._toggleClasses(
                      this._pane,
                      this._config.panelClass,
                      !1
                    ),
                  this._host &&
                    this._host.parentElement &&
                    ((this._previousHostParent = this._host.parentElement),
                    this._host.remove()),
                  t.unsubscribe());
              });
          });
        }
        _disposeScrollStrategy() {
          const t = this._scrollStrategy;
          t && (t.disable(), t.detach && t.detach());
        }
        _disposeBackdrop(t) {
          t &&
            (t.removeEventListener("click", this._backdropClickHandler),
            t.removeEventListener(
              "transitionend",
              this._backdropTransitionendHandler
            ),
            t.remove(),
            this._backdropElement === t && (this._backdropElement = null)),
            this._backdropTimeout &&
              (clearTimeout(this._backdropTimeout),
              (this._backdropTimeout = void 0));
        }
      }
      let Sf = (() => {
        class n {
          constructor(e, i) {
            (this._platform = i), (this._document = e);
          }
          ngOnDestroy() {
            var e;
            null === (e = this._containerElement) || void 0 === e || e.remove();
          }
          getContainerElement() {
            return (
              this._containerElement || this._createContainer(),
              this._containerElement
            );
          }
          _createContainer() {
            const e = "cdk-overlay-container";
            if (this._platform.isBrowser || wf()) {
              const r = this._document.querySelectorAll(
                `.${e}[platform="server"], .${e}[platform="test"]`
              );
              for (let s = 0; s < r.length; s++) r[s].remove();
            }
            const i = this._document.createElement("div");
            i.classList.add(e),
              wf()
                ? i.setAttribute("platform", "test")
                : this._platform.isBrowser ||
                  i.setAttribute("platform", "server"),
              this._document.body.appendChild(i),
              (this._containerElement = i);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(Z), C(Dn));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const Hw = "cdk-overlay-connected-position-bounding-box",
        PV = /([A-Za-z%]+)$/;
      class NV {
        constructor(t, e, i, r, s) {
          (this._viewportRuler = e),
            (this._document = i),
            (this._platform = r),
            (this._overlayContainer = s),
            (this._lastBoundingBoxSize = { width: 0, height: 0 }),
            (this._isPushed = !1),
            (this._canPush = !0),
            (this._growAfterOpen = !1),
            (this._hasFlexibleDimensions = !0),
            (this._positionLocked = !1),
            (this._viewportMargin = 0),
            (this._scrollables = []),
            (this._preferredPositions = []),
            (this._positionChanges = new K()),
            (this._resizeSubscription = Ve.EMPTY),
            (this._offsetX = 0),
            (this._offsetY = 0),
            (this._appliedPanelClasses = []),
            (this.positionChanges = this._positionChanges),
            this.setOrigin(t);
        }
        get positions() {
          return this._preferredPositions;
        }
        attach(t) {
          this._validatePositions(),
            t.hostElement.classList.add(Hw),
            (this._overlayRef = t),
            (this._boundingBox = t.hostElement),
            (this._pane = t.overlayElement),
            (this._isDisposed = !1),
            (this._isInitialRender = !0),
            (this._lastPosition = null),
            this._resizeSubscription.unsubscribe(),
            (this._resizeSubscription = this._viewportRuler
              .change()
              .subscribe(() => {
                (this._isInitialRender = !0), this.apply();
              }));
        }
        apply() {
          if (this._isDisposed || !this._platform.isBrowser) return;
          if (
            !this._isInitialRender &&
            this._positionLocked &&
            this._lastPosition
          )
            return void this.reapplyLastPosition();
          this._clearPanelClasses(),
            this._resetOverlayElementStyles(),
            this._resetBoundingBoxStyles(),
            (this._viewportRect = this._getNarrowedViewportRect()),
            (this._originRect = this._getOriginRect()),
            (this._overlayRect = this._pane.getBoundingClientRect()),
            (this._containerRect = this._overlayContainer
              .getContainerElement()
              .getBoundingClientRect());
          const t = this._originRect,
            e = this._overlayRect,
            i = this._viewportRect,
            r = this._containerRect,
            s = [];
          let o;
          for (let a of this._preferredPositions) {
            let l = this._getOriginPoint(t, r, a),
              c = this._getOverlayPoint(l, e, a),
              u = this._getOverlayFit(c, e, i, a);
            if (u.isCompletelyWithinViewport)
              return (this._isPushed = !1), void this._applyPosition(a, l);
            this._canFitWithFlexibleDimensions(u, c, i)
              ? s.push({
                  position: a,
                  origin: l,
                  overlayRect: e,
                  boundingBoxRect: this._calculateBoundingBoxRect(l, a),
                })
              : (!o || o.overlayFit.visibleArea < u.visibleArea) &&
                (o = {
                  overlayFit: u,
                  overlayPoint: c,
                  originPoint: l,
                  position: a,
                  overlayRect: e,
                });
          }
          if (s.length) {
            let a = null,
              l = -1;
            for (const c of s) {
              const u =
                c.boundingBoxRect.width *
                c.boundingBoxRect.height *
                (c.position.weight || 1);
              u > l && ((l = u), (a = c));
            }
            return (
              (this._isPushed = !1),
              void this._applyPosition(a.position, a.origin)
            );
          }
          if (this._canPush)
            return (
              (this._isPushed = !0),
              void this._applyPosition(o.position, o.originPoint)
            );
          this._applyPosition(o.position, o.originPoint);
        }
        detach() {
          this._clearPanelClasses(),
            (this._lastPosition = null),
            (this._previousPushAmount = null),
            this._resizeSubscription.unsubscribe();
        }
        dispose() {
          this._isDisposed ||
            (this._boundingBox &&
              or(this._boundingBox.style, {
                top: "",
                left: "",
                right: "",
                bottom: "",
                height: "",
                width: "",
                alignItems: "",
                justifyContent: "",
              }),
            this._pane && this._resetOverlayElementStyles(),
            this._overlayRef &&
              this._overlayRef.hostElement.classList.remove(Hw),
            this.detach(),
            this._positionChanges.complete(),
            (this._overlayRef = this._boundingBox = null),
            (this._isDisposed = !0));
        }
        reapplyLastPosition() {
          if (this._isDisposed || !this._platform.isBrowser) return;
          const t = this._lastPosition;
          if (t) {
            (this._originRect = this._getOriginRect()),
              (this._overlayRect = this._pane.getBoundingClientRect()),
              (this._viewportRect = this._getNarrowedViewportRect()),
              (this._containerRect = this._overlayContainer
                .getContainerElement()
                .getBoundingClientRect());
            const e = this._getOriginPoint(
              this._originRect,
              this._containerRect,
              t
            );
            this._applyPosition(t, e);
          } else this.apply();
        }
        withScrollableContainers(t) {
          return (this._scrollables = t), this;
        }
        withPositions(t) {
          return (
            (this._preferredPositions = t),
            -1 === t.indexOf(this._lastPosition) && (this._lastPosition = null),
            this._validatePositions(),
            this
          );
        }
        withViewportMargin(t) {
          return (this._viewportMargin = t), this;
        }
        withFlexibleDimensions(t = !0) {
          return (this._hasFlexibleDimensions = t), this;
        }
        withGrowAfterOpen(t = !0) {
          return (this._growAfterOpen = t), this;
        }
        withPush(t = !0) {
          return (this._canPush = t), this;
        }
        withLockedPosition(t = !0) {
          return (this._positionLocked = t), this;
        }
        setOrigin(t) {
          return (this._origin = t), this;
        }
        withDefaultOffsetX(t) {
          return (this._offsetX = t), this;
        }
        withDefaultOffsetY(t) {
          return (this._offsetY = t), this;
        }
        withTransformOriginOn(t) {
          return (this._transformOriginSelector = t), this;
        }
        _getOriginPoint(t, e, i) {
          let r, s;
          if ("center" == i.originX) r = t.left + t.width / 2;
          else {
            const o = this._isRtl() ? t.right : t.left,
              a = this._isRtl() ? t.left : t.right;
            r = "start" == i.originX ? o : a;
          }
          return (
            e.left < 0 && (r -= e.left),
            (s =
              "center" == i.originY
                ? t.top + t.height / 2
                : "top" == i.originY
                ? t.top
                : t.bottom),
            e.top < 0 && (s -= e.top),
            { x: r, y: s }
          );
        }
        _getOverlayPoint(t, e, i) {
          let r, s;
          return (
            (r =
              "center" == i.overlayX
                ? -e.width / 2
                : "start" === i.overlayX
                ? this._isRtl()
                  ? -e.width
                  : 0
                : this._isRtl()
                ? 0
                : -e.width),
            (s =
              "center" == i.overlayY
                ? -e.height / 2
                : "top" == i.overlayY
                ? 0
                : -e.height),
            { x: t.x + r, y: t.y + s }
          );
        }
        _getOverlayFit(t, e, i, r) {
          const s = $w(e);
          let { x: o, y: a } = t,
            l = this._getOffset(r, "x"),
            c = this._getOffset(r, "y");
          l && (o += l), c && (a += c);
          let h = 0 - a,
            f = a + s.height - i.height,
            p = this._subtractOverflows(s.width, 0 - o, o + s.width - i.width),
            m = this._subtractOverflows(s.height, h, f),
            b = p * m;
          return {
            visibleArea: b,
            isCompletelyWithinViewport: s.width * s.height === b,
            fitsInViewportVertically: m === s.height,
            fitsInViewportHorizontally: p == s.width,
          };
        }
        _canFitWithFlexibleDimensions(t, e, i) {
          if (this._hasFlexibleDimensions) {
            const r = i.bottom - e.y,
              s = i.right - e.x,
              o = Uw(this._overlayRef.getConfig().minHeight),
              a = Uw(this._overlayRef.getConfig().minWidth),
              c = t.fitsInViewportHorizontally || (null != a && a <= s);
            return (t.fitsInViewportVertically || (null != o && o <= r)) && c;
          }
          return !1;
        }
        _pushOverlayOnScreen(t, e, i) {
          if (this._previousPushAmount && this._positionLocked)
            return {
              x: t.x + this._previousPushAmount.x,
              y: t.y + this._previousPushAmount.y,
            };
          const r = $w(e),
            s = this._viewportRect,
            o = Math.max(t.x + r.width - s.width, 0),
            a = Math.max(t.y + r.height - s.height, 0),
            l = Math.max(s.top - i.top - t.y, 0),
            c = Math.max(s.left - i.left - t.x, 0);
          let u = 0,
            d = 0;
          return (
            (u =
              r.width <= s.width
                ? c || -o
                : t.x < this._viewportMargin
                ? s.left - i.left - t.x
                : 0),
            (d =
              r.height <= s.height
                ? l || -a
                : t.y < this._viewportMargin
                ? s.top - i.top - t.y
                : 0),
            (this._previousPushAmount = { x: u, y: d }),
            { x: t.x + u, y: t.y + d }
          );
        }
        _applyPosition(t, e) {
          if (
            (this._setTransformOrigin(t),
            this._setOverlayElementStyles(e, t),
            this._setBoundingBoxStyles(e, t),
            t.panelClass && this._addPanelClasses(t.panelClass),
            (this._lastPosition = t),
            this._positionChanges.observers.length)
          ) {
            const i = this._getScrollVisibility(),
              r = new OV(t, i);
            this._positionChanges.next(r);
          }
          this._isInitialRender = !1;
        }
        _setTransformOrigin(t) {
          if (!this._transformOriginSelector) return;
          const e = this._boundingBox.querySelectorAll(
            this._transformOriginSelector
          );
          let i,
            r = t.overlayY;
          i =
            "center" === t.overlayX
              ? "center"
              : this._isRtl()
              ? "start" === t.overlayX
                ? "right"
                : "left"
              : "start" === t.overlayX
              ? "left"
              : "right";
          for (let s = 0; s < e.length; s++)
            e[s].style.transformOrigin = `${i} ${r}`;
        }
        _calculateBoundingBoxRect(t, e) {
          const i = this._viewportRect,
            r = this._isRtl();
          let s, o, a, u, d, h;
          if ("top" === e.overlayY)
            (o = t.y), (s = i.height - o + this._viewportMargin);
          else if ("bottom" === e.overlayY)
            (a = i.height - t.y + 2 * this._viewportMargin),
              (s = i.height - a + this._viewportMargin);
          else {
            const f = Math.min(i.bottom - t.y + i.top, t.y),
              p = this._lastBoundingBoxSize.height;
            (s = 2 * f),
              (o = t.y - f),
              s > p &&
                !this._isInitialRender &&
                !this._growAfterOpen &&
                (o = t.y - p / 2);
          }
          if (("end" === e.overlayX && !r) || ("start" === e.overlayX && r))
            (h = i.width - t.x + this._viewportMargin),
              (u = t.x - this._viewportMargin);
          else if (
            ("start" === e.overlayX && !r) ||
            ("end" === e.overlayX && r)
          )
            (d = t.x), (u = i.right - t.x);
          else {
            const f = Math.min(i.right - t.x + i.left, t.x),
              p = this._lastBoundingBoxSize.width;
            (u = 2 * f),
              (d = t.x - f),
              u > p &&
                !this._isInitialRender &&
                !this._growAfterOpen &&
                (d = t.x - p / 2);
          }
          return { top: o, left: d, bottom: a, right: h, width: u, height: s };
        }
        _setBoundingBoxStyles(t, e) {
          const i = this._calculateBoundingBoxRect(t, e);
          !this._isInitialRender &&
            !this._growAfterOpen &&
            ((i.height = Math.min(i.height, this._lastBoundingBoxSize.height)),
            (i.width = Math.min(i.width, this._lastBoundingBoxSize.width)));
          const r = {};
          if (this._hasExactPosition())
            (r.top = r.left = "0"),
              (r.bottom = r.right = r.maxHeight = r.maxWidth = ""),
              (r.width = r.height = "100%");
          else {
            const s = this._overlayRef.getConfig().maxHeight,
              o = this._overlayRef.getConfig().maxWidth;
            (r.height = Ue(i.height)),
              (r.top = Ue(i.top)),
              (r.bottom = Ue(i.bottom)),
              (r.width = Ue(i.width)),
              (r.left = Ue(i.left)),
              (r.right = Ue(i.right)),
              (r.alignItems =
                "center" === e.overlayX
                  ? "center"
                  : "end" === e.overlayX
                  ? "flex-end"
                  : "flex-start"),
              (r.justifyContent =
                "center" === e.overlayY
                  ? "center"
                  : "bottom" === e.overlayY
                  ? "flex-end"
                  : "flex-start"),
              s && (r.maxHeight = Ue(s)),
              o && (r.maxWidth = Ue(o));
          }
          (this._lastBoundingBoxSize = i), or(this._boundingBox.style, r);
        }
        _resetBoundingBoxStyles() {
          or(this._boundingBox.style, {
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            height: "",
            width: "",
            alignItems: "",
            justifyContent: "",
          });
        }
        _resetOverlayElementStyles() {
          or(this._pane.style, {
            top: "",
            left: "",
            bottom: "",
            right: "",
            position: "",
            transform: "",
          });
        }
        _setOverlayElementStyles(t, e) {
          const i = {},
            r = this._hasExactPosition(),
            s = this._hasFlexibleDimensions,
            o = this._overlayRef.getConfig();
          if (r) {
            const u = this._viewportRuler.getViewportScrollPosition();
            or(i, this._getExactOverlayY(e, t, u)),
              or(i, this._getExactOverlayX(e, t, u));
          } else i.position = "static";
          let a = "",
            l = this._getOffset(e, "x"),
            c = this._getOffset(e, "y");
          l && (a += `translateX(${l}px) `),
            c && (a += `translateY(${c}px)`),
            (i.transform = a.trim()),
            o.maxHeight &&
              (r ? (i.maxHeight = Ue(o.maxHeight)) : s && (i.maxHeight = "")),
            o.maxWidth &&
              (r ? (i.maxWidth = Ue(o.maxWidth)) : s && (i.maxWidth = "")),
            or(this._pane.style, i);
        }
        _getExactOverlayY(t, e, i) {
          let r = { top: "", bottom: "" },
            s = this._getOverlayPoint(e, this._overlayRect, t);
          return (
            this._isPushed &&
              (s = this._pushOverlayOnScreen(s, this._overlayRect, i)),
            "bottom" === t.overlayY
              ? (r.bottom =
                  this._document.documentElement.clientHeight -
                  (s.y + this._overlayRect.height) +
                  "px")
              : (r.top = Ue(s.y)),
            r
          );
        }
        _getExactOverlayX(t, e, i) {
          let o,
            r = { left: "", right: "" },
            s = this._getOverlayPoint(e, this._overlayRect, t);
          return (
            this._isPushed &&
              (s = this._pushOverlayOnScreen(s, this._overlayRect, i)),
            (o = this._isRtl()
              ? "end" === t.overlayX
                ? "left"
                : "right"
              : "end" === t.overlayX
              ? "right"
              : "left"),
            "right" === o
              ? (r.right =
                  this._document.documentElement.clientWidth -
                  (s.x + this._overlayRect.width) +
                  "px")
              : (r.left = Ue(s.x)),
            r
          );
        }
        _getScrollVisibility() {
          const t = this._getOriginRect(),
            e = this._pane.getBoundingClientRect(),
            i = this._scrollables.map((r) =>
              r.getElementRef().nativeElement.getBoundingClientRect()
            );
          return {
            isOriginClipped: jw(t, i),
            isOriginOutsideView: Ef(t, i),
            isOverlayClipped: jw(e, i),
            isOverlayOutsideView: Ef(e, i),
          };
        }
        _subtractOverflows(t, ...e) {
          return e.reduce((i, r) => i - Math.max(r, 0), t);
        }
        _getNarrowedViewportRect() {
          const t = this._document.documentElement.clientWidth,
            e = this._document.documentElement.clientHeight,
            i = this._viewportRuler.getViewportScrollPosition();
          return {
            top: i.top + this._viewportMargin,
            left: i.left + this._viewportMargin,
            right: i.left + t - this._viewportMargin,
            bottom: i.top + e - this._viewportMargin,
            width: t - 2 * this._viewportMargin,
            height: e - 2 * this._viewportMargin,
          };
        }
        _isRtl() {
          return "rtl" === this._overlayRef.getDirection();
        }
        _hasExactPosition() {
          return !this._hasFlexibleDimensions || this._isPushed;
        }
        _getOffset(t, e) {
          return "x" === e
            ? null == t.offsetX
              ? this._offsetX
              : t.offsetX
            : null == t.offsetY
            ? this._offsetY
            : t.offsetY;
        }
        _validatePositions() {}
        _addPanelClasses(t) {
          this._pane &&
            Vo(t).forEach((e) => {
              "" !== e &&
                -1 === this._appliedPanelClasses.indexOf(e) &&
                (this._appliedPanelClasses.push(e),
                this._pane.classList.add(e));
            });
        }
        _clearPanelClasses() {
          this._pane &&
            (this._appliedPanelClasses.forEach((t) => {
              this._pane.classList.remove(t);
            }),
            (this._appliedPanelClasses = []));
        }
        _getOriginRect() {
          const t = this._origin;
          if (t instanceof _e) return t.nativeElement.getBoundingClientRect();
          if (t instanceof Element) return t.getBoundingClientRect();
          const e = t.width || 0,
            i = t.height || 0;
          return {
            top: t.y,
            bottom: t.y + i,
            left: t.x,
            right: t.x + e,
            height: i,
            width: e,
          };
        }
      }
      function or(n, t) {
        for (let e in t) t.hasOwnProperty(e) && (n[e] = t[e]);
        return n;
      }
      function Uw(n) {
        if ("number" != typeof n && null != n) {
          const [t, e] = n.split(PV);
          return e && "px" !== e ? null : parseFloat(t);
        }
        return n || null;
      }
      function $w(n) {
        return {
          top: Math.floor(n.top),
          right: Math.floor(n.right),
          bottom: Math.floor(n.bottom),
          left: Math.floor(n.left),
          width: Math.floor(n.width),
          height: Math.floor(n.height),
        };
      }
      const zw = "cdk-global-overlay-wrapper";
      class LV {
        constructor() {
          (this._cssPosition = "static"),
            (this._topOffset = ""),
            (this._bottomOffset = ""),
            (this._leftOffset = ""),
            (this._rightOffset = ""),
            (this._alignItems = ""),
            (this._justifyContent = ""),
            (this._width = ""),
            (this._height = "");
        }
        attach(t) {
          const e = t.getConfig();
          (this._overlayRef = t),
            this._width && !e.width && t.updateSize({ width: this._width }),
            this._height && !e.height && t.updateSize({ height: this._height }),
            t.hostElement.classList.add(zw),
            (this._isDisposed = !1);
        }
        top(t = "") {
          return (
            (this._bottomOffset = ""),
            (this._topOffset = t),
            (this._alignItems = "flex-start"),
            this
          );
        }
        left(t = "") {
          return (
            (this._rightOffset = ""),
            (this._leftOffset = t),
            (this._justifyContent = "flex-start"),
            this
          );
        }
        bottom(t = "") {
          return (
            (this._topOffset = ""),
            (this._bottomOffset = t),
            (this._alignItems = "flex-end"),
            this
          );
        }
        right(t = "") {
          return (
            (this._leftOffset = ""),
            (this._rightOffset = t),
            (this._justifyContent = "flex-end"),
            this
          );
        }
        width(t = "") {
          return (
            this._overlayRef
              ? this._overlayRef.updateSize({ width: t })
              : (this._width = t),
            this
          );
        }
        height(t = "") {
          return (
            this._overlayRef
              ? this._overlayRef.updateSize({ height: t })
              : (this._height = t),
            this
          );
        }
        centerHorizontally(t = "") {
          return this.left(t), (this._justifyContent = "center"), this;
        }
        centerVertically(t = "") {
          return this.top(t), (this._alignItems = "center"), this;
        }
        apply() {
          if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
          const t = this._overlayRef.overlayElement.style,
            e = this._overlayRef.hostElement.style,
            i = this._overlayRef.getConfig(),
            { width: r, height: s, maxWidth: o, maxHeight: a } = i,
            l = !(
              ("100%" !== r && "100vw" !== r) ||
              (o && "100%" !== o && "100vw" !== o)
            ),
            c = !(
              ("100%" !== s && "100vh" !== s) ||
              (a && "100%" !== a && "100vh" !== a)
            );
          (t.position = this._cssPosition),
            (t.marginLeft = l ? "0" : this._leftOffset),
            (t.marginTop = c ? "0" : this._topOffset),
            (t.marginBottom = this._bottomOffset),
            (t.marginRight = this._rightOffset),
            l
              ? (e.justifyContent = "flex-start")
              : "center" === this._justifyContent
              ? (e.justifyContent = "center")
              : "rtl" === this._overlayRef.getConfig().direction
              ? "flex-start" === this._justifyContent
                ? (e.justifyContent = "flex-end")
                : "flex-end" === this._justifyContent &&
                  (e.justifyContent = "flex-start")
              : (e.justifyContent = this._justifyContent),
            (e.alignItems = c ? "flex-start" : this._alignItems);
        }
        dispose() {
          if (this._isDisposed || !this._overlayRef) return;
          const t = this._overlayRef.overlayElement.style,
            e = this._overlayRef.hostElement,
            i = e.style;
          e.classList.remove(zw),
            (i.justifyContent =
              i.alignItems =
              t.marginTop =
              t.marginBottom =
              t.marginLeft =
              t.marginRight =
              t.position =
                ""),
            (this._overlayRef = null),
            (this._isDisposed = !0);
        }
      }
      let VV = (() => {
          class n {
            constructor(e, i, r, s) {
              (this._viewportRuler = e),
                (this._document = i),
                (this._platform = r),
                (this._overlayContainer = s);
            }
            global() {
              return new LV();
            }
            flexibleConnectedTo(e) {
              return new NV(
                e,
                this._viewportRuler,
                this._document,
                this._platform,
                this._overlayContainer
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(Nw), C(Z), C(Dn), C(Sf));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        Gw = (() => {
          class n {
            constructor(e) {
              (this._attachedOverlays = []), (this._document = e);
            }
            ngOnDestroy() {
              this.detach();
            }
            add(e) {
              this.remove(e), this._attachedOverlays.push(e);
            }
            remove(e) {
              const i = this._attachedOverlays.indexOf(e);
              i > -1 && this._attachedOverlays.splice(i, 1),
                0 === this._attachedOverlays.length && this.detach();
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(Z));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        BV = (() => {
          class n extends Gw {
            constructor(e, i) {
              super(e),
                (this._ngZone = i),
                (this._keydownListener = (r) => {
                  const s = this._attachedOverlays;
                  for (let o = s.length - 1; o > -1; o--)
                    if (s[o]._keydownEvents.observers.length > 0) {
                      const a = s[o]._keydownEvents;
                      this._ngZone
                        ? this._ngZone.run(() => a.next(r))
                        : a.next(r);
                      break;
                    }
                });
            }
            add(e) {
              super.add(e),
                this._isAttached ||
                  (this._ngZone
                    ? this._ngZone.runOutsideAngular(() =>
                        this._document.body.addEventListener(
                          "keydown",
                          this._keydownListener
                        )
                      )
                    : this._document.body.addEventListener(
                        "keydown",
                        this._keydownListener
                      ),
                  (this._isAttached = !0));
            }
            detach() {
              this._isAttached &&
                (this._document.body.removeEventListener(
                  "keydown",
                  this._keydownListener
                ),
                (this._isAttached = !1));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(Z), C(re, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        jV = (() => {
          class n extends Gw {
            constructor(e, i, r) {
              super(e),
                (this._platform = i),
                (this._ngZone = r),
                (this._cursorStyleIsSet = !1),
                (this._pointerDownListener = (s) => {
                  this._pointerDownEventTarget = sr(s);
                }),
                (this._clickListener = (s) => {
                  const o = sr(s),
                    a =
                      "click" === s.type && this._pointerDownEventTarget
                        ? this._pointerDownEventTarget
                        : o;
                  this._pointerDownEventTarget = null;
                  const l = this._attachedOverlays.slice();
                  for (let c = l.length - 1; c > -1; c--) {
                    const u = l[c];
                    if (
                      u._outsidePointerEvents.observers.length < 1 ||
                      !u.hasAttached()
                    )
                      continue;
                    if (
                      u.overlayElement.contains(o) ||
                      u.overlayElement.contains(a)
                    )
                      break;
                    const d = u._outsidePointerEvents;
                    this._ngZone
                      ? this._ngZone.run(() => d.next(s))
                      : d.next(s);
                  }
                });
            }
            add(e) {
              if ((super.add(e), !this._isAttached)) {
                const i = this._document.body;
                this._ngZone
                  ? this._ngZone.runOutsideAngular(() =>
                      this._addEventListeners(i)
                    )
                  : this._addEventListeners(i),
                  this._platform.IOS &&
                    !this._cursorStyleIsSet &&
                    ((this._cursorOriginalValue = i.style.cursor),
                    (i.style.cursor = "pointer"),
                    (this._cursorStyleIsSet = !0)),
                  (this._isAttached = !0);
              }
            }
            detach() {
              if (this._isAttached) {
                const e = this._document.body;
                e.removeEventListener(
                  "pointerdown",
                  this._pointerDownListener,
                  !0
                ),
                  e.removeEventListener("click", this._clickListener, !0),
                  e.removeEventListener("auxclick", this._clickListener, !0),
                  e.removeEventListener("contextmenu", this._clickListener, !0),
                  this._platform.IOS &&
                    this._cursorStyleIsSet &&
                    ((e.style.cursor = this._cursorOriginalValue),
                    (this._cursorStyleIsSet = !1)),
                  (this._isAttached = !1);
              }
            }
            _addEventListeners(e) {
              e.addEventListener("pointerdown", this._pointerDownListener, !0),
                e.addEventListener("click", this._clickListener, !0),
                e.addEventListener("auxclick", this._clickListener, !0),
                e.addEventListener("contextmenu", this._clickListener, !0);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(Z), C(Dn), C(re, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        HV = 0,
        Wo = (() => {
          class n {
            constructor(e, i, r, s, o, a, l, c, u, d, h) {
              (this.scrollStrategies = e),
                (this._overlayContainer = i),
                (this._componentFactoryResolver = r),
                (this._positionBuilder = s),
                (this._keyboardDispatcher = o),
                (this._injector = a),
                (this._ngZone = l),
                (this._document = c),
                (this._directionality = u),
                (this._location = d),
                (this._outsideClickDispatcher = h);
            }
            create(e) {
              const i = this._createHostElement(),
                r = this._createPaneElement(i),
                s = this._createPortalOutlet(r),
                o = new Mf(e);
              return (
                (o.direction = o.direction || this._directionality.value),
                new FV(
                  s,
                  i,
                  r,
                  o,
                  this._ngZone,
                  this._keyboardDispatcher,
                  this._document,
                  this._location,
                  this._outsideClickDispatcher
                )
              );
            }
            position() {
              return this._positionBuilder;
            }
            _createPaneElement(e) {
              const i = this._document.createElement("div");
              return (
                (i.id = "cdk-overlay-" + HV++),
                i.classList.add("cdk-overlay-pane"),
                e.appendChild(i),
                i
              );
            }
            _createHostElement() {
              const e = this._document.createElement("div");
              return (
                this._overlayContainer.getContainerElement().appendChild(e), e
              );
            }
            _createPortalOutlet(e) {
              return (
                this._appRef || (this._appRef = this._injector.get(os)),
                new AV(
                  e,
                  this._componentFactoryResolver,
                  this._appRef,
                  this._injector,
                  this._document
                )
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                C(kV),
                C(Sf),
                C(bi),
                C(VV),
                C(BV),
                C(De),
                C(re),
                C(Z),
                C(Uo),
                C(Co),
                C(jV)
              );
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      const zV = {
        provide: new A("cdk-connected-overlay-scroll-strategy"),
        deps: [Wo],
        useFactory: function $V(n) {
          return () => n.scrollStrategies.reposition();
        },
      };
      let Ww = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵmod = de({ type: n })),
          (n.ɵinj = le({ providers: [Wo, zV], imports: [[$o, sc, Lw], Lw] })),
          n
        );
      })();
      function ys(n, ...t) {
        return t.length
          ? t.some((e) => n[e])
          : n.altKey || n.shiftKey || n.ctrlKey || n.metaKey;
      }
      function eD(n, t = kw) {
        return Pe((e, i) => {
          let r = null,
            s = null,
            o = null;
          const a = () => {
            if (r) {
              r.unsubscribe(), (r = null);
              const c = s;
              (s = null), i.next(c);
            }
          };
          function l() {
            const c = o + n,
              u = t.now();
            if (u < c) return (r = this.schedule(void 0, c - u)), void i.add(r);
            a();
          }
          e.subscribe(
            new Se(
              i,
              (c) => {
                (s = c), (o = t.now()), r || ((r = t.schedule(l, n)), i.add(r));
              },
              () => {
                a(), i.complete();
              },
              void 0,
              () => {
                s = r = null;
              }
            )
          );
        });
      }
      function tD(n) {
        return Oe((t, e) => n <= e);
      }
      function nD(n, t = ci) {
        return (
          (n = null != n ? n : rB),
          Pe((e, i) => {
            let r,
              s = !0;
            e.subscribe(
              new Se(i, (o) => {
                const a = t(o);
                (s || !n(r, a)) && ((s = !1), (r = a), i.next(o));
              })
            );
          })
        );
      }
      function rB(n, t) {
        return n === t;
      }
      class sD extends class aB {
        constructor(t) {
          (this._items = t),
            (this._activeItemIndex = -1),
            (this._activeItem = null),
            (this._wrap = !1),
            (this._letterKeyStream = new K()),
            (this._typeaheadSubscription = Ve.EMPTY),
            (this._vertical = !0),
            (this._allowedModifierKeys = []),
            (this._homeAndEnd = !1),
            (this._skipPredicateFn = (e) => e.disabled),
            (this._pressedLetters = []),
            (this.tabOut = new K()),
            (this.change = new K()),
            t instanceof ns &&
              t.changes.subscribe((e) => {
                if (this._activeItem) {
                  const r = e.toArray().indexOf(this._activeItem);
                  r > -1 &&
                    r !== this._activeItemIndex &&
                    (this._activeItemIndex = r);
                }
              });
        }
        skipPredicate(t) {
          return (this._skipPredicateFn = t), this;
        }
        withWrap(t = !0) {
          return (this._wrap = t), this;
        }
        withVerticalOrientation(t = !0) {
          return (this._vertical = t), this;
        }
        withHorizontalOrientation(t) {
          return (this._horizontal = t), this;
        }
        withAllowedModifierKeys(t) {
          return (this._allowedModifierKeys = t), this;
        }
        withTypeAhead(t = 200) {
          return (
            this._typeaheadSubscription.unsubscribe(),
            (this._typeaheadSubscription = this._letterKeyStream
              .pipe(
                st((e) => this._pressedLetters.push(e)),
                eD(t),
                Oe(() => this._pressedLetters.length > 0),
                Q(() => this._pressedLetters.join(""))
              )
              .subscribe((e) => {
                const i = this._getItemsArray();
                for (let r = 1; r < i.length + 1; r++) {
                  const s = (this._activeItemIndex + r) % i.length,
                    o = i[s];
                  if (
                    !this._skipPredicateFn(o) &&
                    0 === o.getLabel().toUpperCase().trim().indexOf(e)
                  ) {
                    this.setActiveItem(s);
                    break;
                  }
                }
                this._pressedLetters = [];
              })),
            this
          );
        }
        withHomeAndEnd(t = !0) {
          return (this._homeAndEnd = t), this;
        }
        setActiveItem(t) {
          const e = this._activeItem;
          this.updateActiveItem(t),
            this._activeItem !== e && this.change.next(this._activeItemIndex);
        }
        onKeydown(t) {
          const e = t.keyCode,
            r = ["altKey", "ctrlKey", "metaKey", "shiftKey"].every(
              (s) => !t[s] || this._allowedModifierKeys.indexOf(s) > -1
            );
          switch (e) {
            case 9:
              return void this.tabOut.next();
            case 40:
              if (this._vertical && r) {
                this.setNextItemActive();
                break;
              }
              return;
            case 38:
              if (this._vertical && r) {
                this.setPreviousItemActive();
                break;
              }
              return;
            case 39:
              if (this._horizontal && r) {
                "rtl" === this._horizontal
                  ? this.setPreviousItemActive()
                  : this.setNextItemActive();
                break;
              }
              return;
            case 37:
              if (this._horizontal && r) {
                "rtl" === this._horizontal
                  ? this.setNextItemActive()
                  : this.setPreviousItemActive();
                break;
              }
              return;
            case 36:
              if (this._homeAndEnd && r) {
                this.setFirstItemActive();
                break;
              }
              return;
            case 35:
              if (this._homeAndEnd && r) {
                this.setLastItemActive();
                break;
              }
              return;
            default:
              return void (
                (r || ys(t, "shiftKey")) &&
                (t.key && 1 === t.key.length
                  ? this._letterKeyStream.next(t.key.toLocaleUpperCase())
                  : ((e >= 65 && e <= 90) || (e >= 48 && e <= 57)) &&
                    this._letterKeyStream.next(String.fromCharCode(e)))
              );
          }
          (this._pressedLetters = []), t.preventDefault();
        }
        get activeItemIndex() {
          return this._activeItemIndex;
        }
        get activeItem() {
          return this._activeItem;
        }
        isTyping() {
          return this._pressedLetters.length > 0;
        }
        setFirstItemActive() {
          this._setActiveItemByIndex(0, 1);
        }
        setLastItemActive() {
          this._setActiveItemByIndex(this._items.length - 1, -1);
        }
        setNextItemActive() {
          this._activeItemIndex < 0
            ? this.setFirstItemActive()
            : this._setActiveItemByDelta(1);
        }
        setPreviousItemActive() {
          this._activeItemIndex < 0 && this._wrap
            ? this.setLastItemActive()
            : this._setActiveItemByDelta(-1);
        }
        updateActiveItem(t) {
          const e = this._getItemsArray(),
            i = "number" == typeof t ? t : e.indexOf(t),
            r = e[i];
          (this._activeItem = null == r ? null : r),
            (this._activeItemIndex = i);
        }
        _setActiveItemByDelta(t) {
          this._wrap
            ? this._setActiveInWrapMode(t)
            : this._setActiveInDefaultMode(t);
        }
        _setActiveInWrapMode(t) {
          const e = this._getItemsArray();
          for (let i = 1; i <= e.length; i++) {
            const r = (this._activeItemIndex + t * i + e.length) % e.length;
            if (!this._skipPredicateFn(e[r])) return void this.setActiveItem(r);
          }
        }
        _setActiveInDefaultMode(t) {
          this._setActiveItemByIndex(this._activeItemIndex + t, t);
        }
        _setActiveItemByIndex(t, e) {
          const i = this._getItemsArray();
          if (i[t]) {
            for (; this._skipPredicateFn(i[t]); ) if (!i[(t += e)]) return;
            this.setActiveItem(t);
          }
        }
        _getItemsArray() {
          return this._items instanceof ns
            ? this._items.toArray()
            : this._items;
        }
      } {
        constructor() {
          super(...arguments), (this._origin = "program");
        }
        setFocusOrigin(t) {
          return (this._origin = t), this;
        }
        setActiveItem(t) {
          super.setActiveItem(t),
            this.activeItem && this.activeItem.focus(this._origin);
        }
      }
      let xf = (() => {
        class n {
          constructor(e) {
            this._platform = e;
          }
          isDisabled(e) {
            return e.hasAttribute("disabled");
          }
          isVisible(e) {
            return (
              (function cB(n) {
                return !!(
                  n.offsetWidth ||
                  n.offsetHeight ||
                  ("function" == typeof n.getClientRects &&
                    n.getClientRects().length)
                );
              })(e) && "visible" === getComputedStyle(e).visibility
            );
          }
          isTabbable(e) {
            if (!this._platform.isBrowser) return !1;
            const i = (function lB(n) {
              try {
                return n.frameElement;
              } catch (t) {
                return null;
              }
            })(
              (function _B(n) {
                return (
                  (n.ownerDocument && n.ownerDocument.defaultView) || window
                );
              })(e)
            );
            if (i && (-1 === aD(i) || !this.isVisible(i))) return !1;
            let r = e.nodeName.toLowerCase(),
              s = aD(e);
            return e.hasAttribute("contenteditable")
              ? -1 !== s
              : !(
                  "iframe" === r ||
                  "object" === r ||
                  (this._platform.WEBKIT &&
                    this._platform.IOS &&
                    !(function mB(n) {
                      let t = n.nodeName.toLowerCase(),
                        e = "input" === t && n.type;
                      return (
                        "text" === e ||
                        "password" === e ||
                        "select" === t ||
                        "textarea" === t
                      );
                    })(e))
                ) &&
                  ("audio" === r
                    ? !!e.hasAttribute("controls") && -1 !== s
                    : "video" === r
                    ? -1 !== s &&
                      (null !== s ||
                        this._platform.FIREFOX ||
                        e.hasAttribute("controls"))
                    : e.tabIndex >= 0);
          }
          isFocusable(e, i) {
            return (
              (function gB(n) {
                return (
                  !(function dB(n) {
                    return (
                      (function fB(n) {
                        return "input" == n.nodeName.toLowerCase();
                      })(n) && "hidden" == n.type
                    );
                  })(n) &&
                  ((function uB(n) {
                    let t = n.nodeName.toLowerCase();
                    return (
                      "input" === t ||
                      "select" === t ||
                      "button" === t ||
                      "textarea" === t
                    );
                  })(n) ||
                    (function hB(n) {
                      return (
                        (function pB(n) {
                          return "a" == n.nodeName.toLowerCase();
                        })(n) && n.hasAttribute("href")
                      );
                    })(n) ||
                    n.hasAttribute("contenteditable") ||
                    oD(n))
                );
              })(e) &&
              !this.isDisabled(e) &&
              ((null == i ? void 0 : i.ignoreVisibility) || this.isVisible(e))
            );
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(Dn));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function oD(n) {
        if (!n.hasAttribute("tabindex") || void 0 === n.tabIndex) return !1;
        let t = n.getAttribute("tabindex");
        return !(!t || isNaN(parseInt(t, 10)));
      }
      function aD(n) {
        if (!oD(n)) return null;
        const t = parseInt(n.getAttribute("tabindex") || "", 10);
        return isNaN(t) ? -1 : t;
      }
      class yB {
        constructor(t, e, i, r, s = !1) {
          (this._element = t),
            (this._checker = e),
            (this._ngZone = i),
            (this._document = r),
            (this._hasAttached = !1),
            (this.startAnchorListener = () => this.focusLastTabbableElement()),
            (this.endAnchorListener = () => this.focusFirstTabbableElement()),
            (this._enabled = !0),
            s || this.attachAnchors();
        }
        get enabled() {
          return this._enabled;
        }
        set enabled(t) {
          (this._enabled = t),
            this._startAnchor &&
              this._endAnchor &&
              (this._toggleAnchorTabIndex(t, this._startAnchor),
              this._toggleAnchorTabIndex(t, this._endAnchor));
        }
        destroy() {
          const t = this._startAnchor,
            e = this._endAnchor;
          t &&
            (t.removeEventListener("focus", this.startAnchorListener),
            t.remove()),
            e &&
              (e.removeEventListener("focus", this.endAnchorListener),
              e.remove()),
            (this._startAnchor = this._endAnchor = null),
            (this._hasAttached = !1);
        }
        attachAnchors() {
          return (
            !!this._hasAttached ||
            (this._ngZone.runOutsideAngular(() => {
              this._startAnchor ||
                ((this._startAnchor = this._createAnchor()),
                this._startAnchor.addEventListener(
                  "focus",
                  this.startAnchorListener
                )),
                this._endAnchor ||
                  ((this._endAnchor = this._createAnchor()),
                  this._endAnchor.addEventListener(
                    "focus",
                    this.endAnchorListener
                  ));
            }),
            this._element.parentNode &&
              (this._element.parentNode.insertBefore(
                this._startAnchor,
                this._element
              ),
              this._element.parentNode.insertBefore(
                this._endAnchor,
                this._element.nextSibling
              ),
              (this._hasAttached = !0)),
            this._hasAttached)
          );
        }
        focusInitialElementWhenReady(t) {
          return new Promise((e) => {
            this._executeOnStable(() => e(this.focusInitialElement(t)));
          });
        }
        focusFirstTabbableElementWhenReady(t) {
          return new Promise((e) => {
            this._executeOnStable(() => e(this.focusFirstTabbableElement(t)));
          });
        }
        focusLastTabbableElementWhenReady(t) {
          return new Promise((e) => {
            this._executeOnStable(() => e(this.focusLastTabbableElement(t)));
          });
        }
        _getRegionBoundary(t) {
          const e = this._element.querySelectorAll(
            `[cdk-focus-region-${t}], [cdkFocusRegion${t}], [cdk-focus-${t}]`
          );
          return "start" == t
            ? e.length
              ? e[0]
              : this._getFirstTabbableElement(this._element)
            : e.length
            ? e[e.length - 1]
            : this._getLastTabbableElement(this._element);
        }
        focusInitialElement(t) {
          const e = this._element.querySelector(
            "[cdk-focus-initial], [cdkFocusInitial]"
          );
          if (e) {
            if (!this._checker.isFocusable(e)) {
              const i = this._getFirstTabbableElement(e);
              return null == i || i.focus(t), !!i;
            }
            return e.focus(t), !0;
          }
          return this.focusFirstTabbableElement(t);
        }
        focusFirstTabbableElement(t) {
          const e = this._getRegionBoundary("start");
          return e && e.focus(t), !!e;
        }
        focusLastTabbableElement(t) {
          const e = this._getRegionBoundary("end");
          return e && e.focus(t), !!e;
        }
        hasAttached() {
          return this._hasAttached;
        }
        _getFirstTabbableElement(t) {
          if (this._checker.isFocusable(t) && this._checker.isTabbable(t))
            return t;
          const e = t.children;
          for (let i = 0; i < e.length; i++) {
            const r =
              e[i].nodeType === this._document.ELEMENT_NODE
                ? this._getFirstTabbableElement(e[i])
                : null;
            if (r) return r;
          }
          return null;
        }
        _getLastTabbableElement(t) {
          if (this._checker.isFocusable(t) && this._checker.isTabbable(t))
            return t;
          const e = t.children;
          for (let i = e.length - 1; i >= 0; i--) {
            const r =
              e[i].nodeType === this._document.ELEMENT_NODE
                ? this._getLastTabbableElement(e[i])
                : null;
            if (r) return r;
          }
          return null;
        }
        _createAnchor() {
          const t = this._document.createElement("div");
          return (
            this._toggleAnchorTabIndex(this._enabled, t),
            t.classList.add("cdk-visually-hidden"),
            t.classList.add("cdk-focus-trap-anchor"),
            t.setAttribute("aria-hidden", "true"),
            t
          );
        }
        _toggleAnchorTabIndex(t, e) {
          t ? e.setAttribute("tabindex", "0") : e.removeAttribute("tabindex");
        }
        toggleAnchors(t) {
          this._startAnchor &&
            this._endAnchor &&
            (this._toggleAnchorTabIndex(t, this._startAnchor),
            this._toggleAnchorTabIndex(t, this._endAnchor));
        }
        _executeOnStable(t) {
          this._ngZone.isStable
            ? t()
            : this._ngZone.onStable.pipe(ze(1)).subscribe(t);
        }
      }
      let lD = (() => {
        class n {
          constructor(e, i, r) {
            (this._checker = e), (this._ngZone = i), (this._document = r);
          }
          create(e, i = !1) {
            return new yB(e, this._checker, this._ngZone, this._document, i);
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(xf), C(re), C(Z));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function cD(n) {
        return 0 === n.buttons || (0 === n.offsetX && 0 === n.offsetY);
      }
      function uD(n) {
        const t =
          (n.touches && n.touches[0]) ||
          (n.changedTouches && n.changedTouches[0]);
        return !(
          !t ||
          -1 !== t.identifier ||
          (null != t.radiusX && 1 !== t.radiusX) ||
          (null != t.radiusY && 1 !== t.radiusY)
        );
      }
      const vB = new A("cdk-input-modality-detector-options"),
        bB = { ignoreKeys: [18, 17, 224, 91, 16] },
        vs = bf({ passive: !0, capture: !0 });
      let CB = (() => {
        class n {
          constructor(e, i, r, s) {
            (this._platform = e),
              (this._mostRecentTarget = null),
              (this._modality = new sn(null)),
              (this._lastTouchMs = 0),
              (this._onKeydown = (o) => {
                var a, l;
                (null ===
                  (l =
                    null === (a = this._options) || void 0 === a
                      ? void 0
                      : a.ignoreKeys) || void 0 === l
                  ? void 0
                  : l.some((c) => c === o.keyCode)) ||
                  (this._modality.next("keyboard"),
                  (this._mostRecentTarget = sr(o)));
              }),
              (this._onMousedown = (o) => {
                Date.now() - this._lastTouchMs < 650 ||
                  (this._modality.next(cD(o) ? "keyboard" : "mouse"),
                  (this._mostRecentTarget = sr(o)));
              }),
              (this._onTouchstart = (o) => {
                uD(o)
                  ? this._modality.next("keyboard")
                  : ((this._lastTouchMs = Date.now()),
                    this._modality.next("touch"),
                    (this._mostRecentTarget = sr(o)));
              }),
              (this._options = Object.assign(Object.assign({}, bB), s)),
              (this.modalityDetected = this._modality.pipe(tD(1))),
              (this.modalityChanged = this.modalityDetected.pipe(nD())),
              e.isBrowser &&
                i.runOutsideAngular(() => {
                  r.addEventListener("keydown", this._onKeydown, vs),
                    r.addEventListener("mousedown", this._onMousedown, vs),
                    r.addEventListener("touchstart", this._onTouchstart, vs);
                });
          }
          get mostRecentModality() {
            return this._modality.value;
          }
          ngOnDestroy() {
            this._modality.complete(),
              this._platform.isBrowser &&
                (document.removeEventListener("keydown", this._onKeydown, vs),
                document.removeEventListener(
                  "mousedown",
                  this._onMousedown,
                  vs
                ),
                document.removeEventListener(
                  "touchstart",
                  this._onTouchstart,
                  vs
                ));
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(Dn), C(re), C(Z), C(vB, 8));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const DB = new A("cdk-focus-monitor-default-options"),
        oc = bf({ passive: !0, capture: !0 });
      let ac = (() => {
        class n {
          constructor(e, i, r, s, o) {
            (this._ngZone = e),
              (this._platform = i),
              (this._inputModalityDetector = r),
              (this._origin = null),
              (this._windowFocused = !1),
              (this._originFromTouchInteraction = !1),
              (this._elementInfo = new Map()),
              (this._monitoredElementCount = 0),
              (this._rootNodeFocusListenerCount = new Map()),
              (this._windowFocusListener = () => {
                (this._windowFocused = !0),
                  (this._windowFocusTimeoutId = window.setTimeout(
                    () => (this._windowFocused = !1)
                  ));
              }),
              (this._stopInputModalityDetector = new K()),
              (this._rootNodeFocusAndBlurListener = (a) => {
                const l = sr(a),
                  c = "focus" === a.type ? this._onFocus : this._onBlur;
                for (let u = l; u; u = u.parentElement) c.call(this, a, u);
              }),
              (this._document = s),
              (this._detectionMode =
                (null == o ? void 0 : o.detectionMode) || 0);
          }
          monitor(e, i = !1) {
            const r = ms(e);
            if (!this._platform.isBrowser || 1 !== r.nodeType) return P(null);
            const s =
                (function vV(n) {
                  if (
                    (function yV() {
                      if (null == Cf) {
                        const n =
                          "undefined" != typeof document ? document.head : null;
                        Cf = !(!n || (!n.createShadowRoot && !n.attachShadow));
                      }
                      return Cf;
                    })()
                  ) {
                    const t = n.getRootNode ? n.getRootNode() : null;
                    if (
                      "undefined" != typeof ShadowRoot &&
                      ShadowRoot &&
                      t instanceof ShadowRoot
                    )
                      return t;
                  }
                  return null;
                })(r) || this._getDocument(),
              o = this._elementInfo.get(r);
            if (o) return i && (o.checkChildren = !0), o.subject;
            const a = { checkChildren: i, subject: new K(), rootNode: s };
            return (
              this._elementInfo.set(r, a),
              this._registerGlobalListeners(a),
              a.subject
            );
          }
          stopMonitoring(e) {
            const i = ms(e),
              r = this._elementInfo.get(i);
            r &&
              (r.subject.complete(),
              this._setClasses(i),
              this._elementInfo.delete(i),
              this._removeGlobalListeners(r));
          }
          focusVia(e, i, r) {
            const s = ms(e);
            s === this._getDocument().activeElement
              ? this._getClosestElementsInfo(s).forEach(([a, l]) =>
                  this._originChanged(a, i, l)
                )
              : (this._setOrigin(i),
                "function" == typeof s.focus && s.focus(r));
          }
          ngOnDestroy() {
            this._elementInfo.forEach((e, i) => this.stopMonitoring(i));
          }
          _getDocument() {
            return this._document || document;
          }
          _getWindow() {
            return this._getDocument().defaultView || window;
          }
          _getFocusOrigin(e) {
            return this._origin
              ? this._originFromTouchInteraction
                ? this._shouldBeAttributedToTouch(e)
                  ? "touch"
                  : "program"
                : this._origin
              : this._windowFocused && this._lastFocusOrigin
              ? this._lastFocusOrigin
              : "program";
          }
          _shouldBeAttributedToTouch(e) {
            return (
              1 === this._detectionMode ||
              !!(null == e
                ? void 0
                : e.contains(this._inputModalityDetector._mostRecentTarget))
            );
          }
          _setClasses(e, i) {
            e.classList.toggle("cdk-focused", !!i),
              e.classList.toggle("cdk-touch-focused", "touch" === i),
              e.classList.toggle("cdk-keyboard-focused", "keyboard" === i),
              e.classList.toggle("cdk-mouse-focused", "mouse" === i),
              e.classList.toggle("cdk-program-focused", "program" === i);
          }
          _setOrigin(e, i = !1) {
            this._ngZone.runOutsideAngular(() => {
              (this._origin = e),
                (this._originFromTouchInteraction = "touch" === e && i),
                0 === this._detectionMode &&
                  (clearTimeout(this._originTimeoutId),
                  (this._originTimeoutId = setTimeout(
                    () => (this._origin = null),
                    this._originFromTouchInteraction ? 650 : 1
                  )));
            });
          }
          _onFocus(e, i) {
            const r = this._elementInfo.get(i),
              s = sr(e);
            !r ||
              (!r.checkChildren && i !== s) ||
              this._originChanged(i, this._getFocusOrigin(s), r);
          }
          _onBlur(e, i) {
            const r = this._elementInfo.get(i);
            !r ||
              (r.checkChildren &&
                e.relatedTarget instanceof Node &&
                i.contains(e.relatedTarget)) ||
              (this._setClasses(i), this._emitOrigin(r.subject, null));
          }
          _emitOrigin(e, i) {
            this._ngZone.run(() => e.next(i));
          }
          _registerGlobalListeners(e) {
            if (!this._platform.isBrowser) return;
            const i = e.rootNode,
              r = this._rootNodeFocusListenerCount.get(i) || 0;
            r ||
              this._ngZone.runOutsideAngular(() => {
                i.addEventListener(
                  "focus",
                  this._rootNodeFocusAndBlurListener,
                  oc
                ),
                  i.addEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    oc
                  );
              }),
              this._rootNodeFocusListenerCount.set(i, r + 1),
              1 == ++this._monitoredElementCount &&
                (this._ngZone.runOutsideAngular(() => {
                  this._getWindow().addEventListener(
                    "focus",
                    this._windowFocusListener
                  );
                }),
                this._inputModalityDetector.modalityDetected
                  .pipe(oi(this._stopInputModalityDetector))
                  .subscribe((s) => {
                    this._setOrigin(s, !0);
                  }));
          }
          _removeGlobalListeners(e) {
            const i = e.rootNode;
            if (this._rootNodeFocusListenerCount.has(i)) {
              const r = this._rootNodeFocusListenerCount.get(i);
              r > 1
                ? this._rootNodeFocusListenerCount.set(i, r - 1)
                : (i.removeEventListener(
                    "focus",
                    this._rootNodeFocusAndBlurListener,
                    oc
                  ),
                  i.removeEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    oc
                  ),
                  this._rootNodeFocusListenerCount.delete(i));
            }
            --this._monitoredElementCount ||
              (this._getWindow().removeEventListener(
                "focus",
                this._windowFocusListener
              ),
              this._stopInputModalityDetector.next(),
              clearTimeout(this._windowFocusTimeoutId),
              clearTimeout(this._originTimeoutId));
          }
          _originChanged(e, i, r) {
            this._setClasses(e, i),
              this._emitOrigin(r.subject, i),
              (this._lastFocusOrigin = i);
          }
          _getClosestElementsInfo(e) {
            const i = [];
            return (
              this._elementInfo.forEach((r, s) => {
                (s === e || (r.checkChildren && s.contains(e))) &&
                  i.push([s, r]);
              }),
              i
            );
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(re), C(Dn), C(CB), C(Z, 8), C(DB, 8));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const hD = "cdk-high-contrast-black-on-white",
        fD = "cdk-high-contrast-white-on-black",
        Af = "cdk-high-contrast-active";
      let EB = (() => {
        class n {
          constructor(e, i) {
            (this._platform = e), (this._document = i);
          }
          getHighContrastMode() {
            if (!this._platform.isBrowser) return 0;
            const e = this._document.createElement("div");
            (e.style.backgroundColor = "rgb(1,2,3)"),
              (e.style.position = "absolute"),
              this._document.body.appendChild(e);
            const i = this._document.defaultView || window,
              r = i && i.getComputedStyle ? i.getComputedStyle(e) : null,
              s = ((r && r.backgroundColor) || "").replace(/ /g, "");
            switch ((e.remove(), s)) {
              case "rgb(0,0,0)":
                return 2;
              case "rgb(255,255,255)":
                return 1;
            }
            return 0;
          }
          _applyBodyHighContrastModeCssClasses() {
            if (
              !this._hasCheckedHighContrastMode &&
              this._platform.isBrowser &&
              this._document.body
            ) {
              const e = this._document.body.classList;
              e.remove(Af),
                e.remove(hD),
                e.remove(fD),
                (this._hasCheckedHighContrastMode = !0);
              const i = this.getHighContrastMode();
              1 === i
                ? (e.add(Af), e.add(hD))
                : 2 === i && (e.add(Af), e.add(fD));
            }
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(Dn), C(Z));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      class pD {}
      const ai = "*";
      function qo(n, t) {
        return { type: 7, name: n, definitions: t, options: {} };
      }
      function Di(n, t = null) {
        return { type: 4, styles: t, timings: n };
      }
      function lc(n, t = null) {
        return { type: 3, steps: n, options: t };
      }
      function mD(n, t = null) {
        return { type: 2, steps: n, options: t };
      }
      function St(n) {
        return { type: 6, styles: n, offset: null };
      }
      function Hn(n, t, e) {
        return { type: 0, name: n, styles: t, options: e };
      }
      function Ei(n, t, e = null) {
        return { type: 1, expr: n, animation: t, options: e };
      }
      function cc(n = null) {
        return { type: 9, options: n };
      }
      function uc(n, t, e = null) {
        return { type: 11, selector: n, animation: t, options: e };
      }
      function gD(n) {
        Promise.resolve(null).then(n);
      }
      class bs {
        constructor(t = 0, e = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = t + e);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          gD(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this._started = !1;
        }
        setPosition(t) {
          this._position = this.totalTime ? t * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((i) => i()), (e.length = 0);
        }
      }
      class _D {
        constructor(t) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = t);
          let e = 0,
            i = 0,
            r = 0;
          const s = this.players.length;
          0 == s
            ? gD(() => this._onFinish())
            : this.players.forEach((o) => {
                o.onDone(() => {
                  ++e == s && this._onFinish();
                }),
                  o.onDestroy(() => {
                    ++i == s && this._onDestroy();
                  }),
                  o.onStart(() => {
                    ++r == s && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (o, a) => Math.max(o, a.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((t) => t.init());
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((t) => t()),
            (this._onStartFns = []));
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((t) => t.play());
        }
        pause() {
          this.players.forEach((t) => t.pause());
        }
        restart() {
          this.players.forEach((t) => t.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((t) => t.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((t) => t.destroy()),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((t) => t.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(t) {
          const e = t * this.totalTime;
          this.players.forEach((i) => {
            const r = i.totalTime ? Math.min(1, e / i.totalTime) : 1;
            i.setPosition(r);
          });
        }
        getPosition() {
          const t = this.players.reduce(
            (e, i) => (null === e || i.totalTime > e.totalTime ? i : e),
            null
          );
          return null != t ? t.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((t) => {
            t.beforeDestroy && t.beforeDestroy();
          });
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((i) => i()), (e.length = 0);
        }
      }
      function yD() {
        return "undefined" != typeof window && void 0 !== window.document;
      }
      function If() {
        return (
          "undefined" != typeof process &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function Mi(n) {
        switch (n.length) {
          case 0:
            return new bs();
          case 1:
            return n[0];
          default:
            return new _D(n);
        }
      }
      function vD(n, t, e, i, r = {}, s = {}) {
        const o = [],
          a = [];
        let l = -1,
          c = null;
        if (
          (i.forEach((u) => {
            const d = u.offset,
              h = d == l,
              f = (h && c) || {};
            Object.keys(u).forEach((p) => {
              let m = p,
                b = u[p];
              if ("offset" !== p)
                switch (((m = t.normalizePropertyName(m, o)), b)) {
                  case "!":
                    b = r[p];
                    break;
                  case ai:
                    b = s[p];
                    break;
                  default:
                    b = t.normalizeStyleValue(p, m, b, o);
                }
              f[m] = b;
            }),
              h || a.push(f),
              (c = f),
              (l = d);
          }),
          o.length)
        ) {
          const u = "\n - ";
          throw new Error(
            `Unable to animate due to the following errors:${u}${o.join(u)}`
          );
        }
        return a;
      }
      function Rf(n, t, e, i) {
        switch (t) {
          case "start":
            n.onStart(() => i(e && kf(e, "start", n)));
            break;
          case "done":
            n.onDone(() => i(e && kf(e, "done", n)));
            break;
          case "destroy":
            n.onDestroy(() => i(e && kf(e, "destroy", n)));
        }
      }
      function kf(n, t, e) {
        const i = e.totalTime,
          s = Of(
            n.element,
            n.triggerName,
            n.fromState,
            n.toState,
            t || n.phaseName,
            null == i ? n.totalTime : i,
            !!e.disabled
          ),
          o = n._data;
        return null != o && (s._data = o), s;
      }
      function Of(n, t, e, i, r = "", s = 0, o) {
        return {
          element: n,
          triggerName: t,
          fromState: e,
          toState: i,
          phaseName: r,
          totalTime: s,
          disabled: !!o,
        };
      }
      function Ht(n, t, e) {
        let i;
        return (
          n instanceof Map
            ? ((i = n.get(t)), i || n.set(t, (i = e)))
            : ((i = n[t]), i || (i = n[t] = e)),
          i
        );
      }
      function bD(n) {
        const t = n.indexOf(":");
        return [n.substring(1, t), n.substr(t + 1)];
      }
      let Ff = (n, t) => !1,
        CD = (n, t, e) => [];
      (If() || "undefined" != typeof Element) &&
        ((Ff = yD()
          ? (n, t) => {
              for (; t && t !== document.documentElement; ) {
                if (t === n) return !0;
                t = t.parentNode || t.host;
              }
              return !1;
            }
          : (n, t) => n.contains(t)),
        (CD = (n, t, e) => {
          if (e) return Array.from(n.querySelectorAll(t));
          const i = n.querySelector(t);
          return i ? [i] : [];
        }));
      let ar = null,
        wD = !1;
      function Pf(n) {
        ar ||
          ((ar =
            (function xB() {
              return "undefined" != typeof document ? document.body : null;
            })() || {}),
          (wD = !!ar.style && "WebkitAppearance" in ar.style));
        let t = !0;
        return (
          ar.style &&
            !(function SB(n) {
              return "ebkit" == n.substring(1, 6);
            })(n) &&
            ((t = n in ar.style),
            !t &&
              wD &&
              (t =
                "Webkit" + n.charAt(0).toUpperCase() + n.substr(1) in
                ar.style)),
          t
        );
      }
      const Nf = Ff,
        Lf = CD;
      function DD(n) {
        const t = {};
        return (
          Object.keys(n).forEach((e) => {
            const i = e.replace(/([a-z])([A-Z])/g, "$1-$2");
            t[i] = n[e];
          }),
          t
        );
      }
      let ED = (() => {
          class n {
            validateStyleProperty(e) {
              return Pf(e);
            }
            matchesElement(e, i) {
              return !1;
            }
            containsElement(e, i) {
              return Nf(e, i);
            }
            query(e, i, r) {
              return Lf(e, i, r);
            }
            computeStyle(e, i, r) {
              return r || "";
            }
            animate(e, i, r, s, o, a = [], l) {
              return new bs(r, s);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Vf = (() => {
          class n {}
          return (n.NOOP = new ED()), n;
        })();
      const Bf = "ng-enter",
        dc = "ng-leave",
        hc = "ng-trigger",
        fc = ".ng-trigger",
        SD = "ng-animating",
        jf = ".ng-animating";
      function lr(n) {
        if ("number" == typeof n) return n;
        const t = n.match(/^(-?[\.\d]+)(m?s)/);
        return !t || t.length < 2 ? 0 : Hf(parseFloat(t[1]), t[2]);
      }
      function Hf(n, t) {
        return "s" === t ? 1e3 * n : n;
      }
      function pc(n, t, e) {
        return n.hasOwnProperty("duration")
          ? n
          : (function IB(n, t, e) {
              let r,
                s = 0,
                o = "";
              if ("string" == typeof n) {
                const a = n.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return (
                    t.push(`The provided timing value "${n}" is invalid.`),
                    { duration: 0, delay: 0, easing: "" }
                  );
                r = Hf(parseFloat(a[1]), a[2]);
                const l = a[3];
                null != l && (s = Hf(parseFloat(l), a[4]));
                const c = a[5];
                c && (o = c);
              } else r = n;
              if (!e) {
                let a = !1,
                  l = t.length;
                r < 0 &&
                  (t.push(
                    "Duration values below 0 are not allowed for this animation step."
                  ),
                  (a = !0)),
                  s < 0 &&
                    (t.push(
                      "Delay values below 0 are not allowed for this animation step."
                    ),
                    (a = !0)),
                  a &&
                    t.splice(
                      l,
                      0,
                      `The provided timing value "${n}" is invalid.`
                    );
              }
              return { duration: r, delay: s, easing: o };
            })(n, t, e);
      }
      function Cs(n, t = {}) {
        return (
          Object.keys(n).forEach((e) => {
            t[e] = n[e];
          }),
          t
        );
      }
      function Si(n, t, e = {}) {
        if (t) for (let i in n) e[i] = n[i];
        else Cs(n, e);
        return e;
      }
      function AD(n, t, e) {
        return e ? t + ":" + e + ";" : "";
      }
      function TD(n) {
        let t = "";
        for (let e = 0; e < n.style.length; e++) {
          const i = n.style.item(e);
          t += AD(0, i, n.style.getPropertyValue(i));
        }
        for (const e in n.style)
          n.style.hasOwnProperty(e) &&
            !e.startsWith("_") &&
            (t += AD(0, OB(e), n.style[e]));
        n.setAttribute("style", t);
      }
      function Un(n, t, e) {
        n.style &&
          (Object.keys(t).forEach((i) => {
            const r = $f(i);
            e && !e.hasOwnProperty(i) && (e[i] = n.style[r]),
              (n.style[r] = t[i]);
          }),
          If() && TD(n));
      }
      function cr(n, t) {
        n.style &&
          (Object.keys(t).forEach((e) => {
            const i = $f(e);
            n.style[i] = "";
          }),
          If() && TD(n));
      }
      function Ko(n) {
        return Array.isArray(n) ? (1 == n.length ? n[0] : mD(n)) : n;
      }
      const Uf = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function ID(n) {
        let t = [];
        if ("string" == typeof n) {
          let e;
          for (; (e = Uf.exec(n)); ) t.push(e[1]);
          Uf.lastIndex = 0;
        }
        return t;
      }
      function mc(n, t, e) {
        const i = n.toString(),
          r = i.replace(Uf, (s, o) => {
            let a = t[o];
            return (
              t.hasOwnProperty(o) ||
                (e.push(`Please provide a value for the animation param ${o}`),
                (a = "")),
              a.toString()
            );
          });
        return r == i ? n : r;
      }
      function gc(n) {
        const t = [];
        let e = n.next();
        for (; !e.done; ) t.push(e.value), (e = n.next());
        return t;
      }
      const kB = /-+([a-z0-9])/g;
      function $f(n) {
        return n.replace(kB, (...t) => t[1].toUpperCase());
      }
      function OB(n) {
        return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function RD(n, t) {
        return 0 === n || 0 === t;
      }
      function kD(n, t, e) {
        const i = Object.keys(e);
        if (i.length && t.length) {
          let s = t[0],
            o = [];
          if (
            (i.forEach((a) => {
              s.hasOwnProperty(a) || o.push(a), (s[a] = e[a]);
            }),
            o.length)
          )
            for (var r = 1; r < t.length; r++) {
              let a = t[r];
              o.forEach(function (l) {
                a[l] = zf(n, l);
              });
            }
        }
        return t;
      }
      function Ut(n, t, e) {
        switch (t.type) {
          case 7:
            return n.visitTrigger(t, e);
          case 0:
            return n.visitState(t, e);
          case 1:
            return n.visitTransition(t, e);
          case 2:
            return n.visitSequence(t, e);
          case 3:
            return n.visitGroup(t, e);
          case 4:
            return n.visitAnimate(t, e);
          case 5:
            return n.visitKeyframes(t, e);
          case 6:
            return n.visitStyle(t, e);
          case 8:
            return n.visitReference(t, e);
          case 9:
            return n.visitAnimateChild(t, e);
          case 10:
            return n.visitAnimateRef(t, e);
          case 11:
            return n.visitQuery(t, e);
          case 12:
            return n.visitStagger(t, e);
          default:
            throw new Error(
              `Unable to resolve animation metadata node #${t.type}`
            );
        }
      }
      function zf(n, t) {
        return window.getComputedStyle(n)[t];
      }
      function FB(n, t) {
        const e = [];
        return (
          "string" == typeof n
            ? n.split(/\s*,\s*/).forEach((i) =>
                (function PB(n, t, e) {
                  if (":" == n[0]) {
                    const l = (function NB(n, t) {
                      switch (n) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (e, i) => parseFloat(i) > parseFloat(e);
                        case ":decrement":
                          return (e, i) => parseFloat(i) < parseFloat(e);
                        default:
                          return (
                            t.push(
                              `The transition alias value "${n}" is not supported`
                            ),
                            "* => *"
                          );
                      }
                    })(n, e);
                    if ("function" == typeof l) return void t.push(l);
                    n = l;
                  }
                  const i = n.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == i || i.length < 4)
                    return (
                      e.push(
                        `The provided transition expression "${n}" is not supported`
                      ),
                      t
                    );
                  const r = i[1],
                    s = i[2],
                    o = i[3];
                  t.push(OD(r, o));
                  "<" == s[0] && !("*" == r && "*" == o) && t.push(OD(o, r));
                })(i, e, t)
              )
            : e.push(n),
          e
        );
      }
      const yc = new Set(["true", "1"]),
        vc = new Set(["false", "0"]);
      function OD(n, t) {
        const e = yc.has(n) || vc.has(n),
          i = yc.has(t) || vc.has(t);
        return (r, s) => {
          let o = "*" == n || n == r,
            a = "*" == t || t == s;
          return (
            !o && e && "boolean" == typeof r && (o = r ? yc.has(n) : vc.has(n)),
            !a && i && "boolean" == typeof s && (a = s ? yc.has(t) : vc.has(t)),
            o && a
          );
        };
      }
      const LB = new RegExp("s*:selfs*,?", "g");
      function Gf(n, t, e) {
        return new VB(n).build(t, e);
      }
      class VB {
        constructor(t) {
          this._driver = t;
        }
        build(t, e) {
          const i = new HB(e);
          return this._resetContextStyleTimingState(i), Ut(this, Ko(t), i);
        }
        _resetContextStyleTimingState(t) {
          (t.currentQuerySelector = ""),
            (t.collectedStyles = {}),
            (t.collectedStyles[""] = {}),
            (t.currentTime = 0);
        }
        visitTrigger(t, e) {
          let i = (e.queryCount = 0),
            r = (e.depCount = 0);
          const s = [],
            o = [];
          return (
            "@" == t.name.charAt(0) &&
              e.errors.push(
                "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
              ),
            t.definitions.forEach((a) => {
              if ((this._resetContextStyleTimingState(e), 0 == a.type)) {
                const l = a,
                  c = l.name;
                c
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((u) => {
                    (l.name = u), s.push(this.visitState(l, e));
                  }),
                  (l.name = c);
              } else if (1 == a.type) {
                const l = this.visitTransition(a, e);
                (i += l.queryCount), (r += l.depCount), o.push(l);
              } else
                e.errors.push(
                  "only state() and transition() definitions can sit inside of a trigger()"
                );
            }),
            {
              type: 7,
              name: t.name,
              states: s,
              transitions: o,
              queryCount: i,
              depCount: r,
              options: null,
            }
          );
        }
        visitState(t, e) {
          const i = this.visitStyle(t.styles, e),
            r = (t.options && t.options.params) || null;
          if (i.containsDynamicStyles) {
            const s = new Set(),
              o = r || {};
            if (
              (i.styles.forEach((a) => {
                if (bc(a)) {
                  const l = a;
                  Object.keys(l).forEach((c) => {
                    ID(l[c]).forEach((u) => {
                      o.hasOwnProperty(u) || s.add(u);
                    });
                  });
                }
              }),
              s.size)
            ) {
              const a = gc(s.values());
              e.errors.push(
                `state("${
                  t.name
                }", ...) must define default values for all the following style substitutions: ${a.join(
                  ", "
                )}`
              );
            }
          }
          return {
            type: 0,
            name: t.name,
            style: i,
            options: r ? { params: r } : null,
          };
        }
        visitTransition(t, e) {
          (e.queryCount = 0), (e.depCount = 0);
          const i = Ut(this, Ko(t.animation), e);
          return {
            type: 1,
            matchers: FB(t.expr, e.errors),
            animation: i,
            queryCount: e.queryCount,
            depCount: e.depCount,
            options: ur(t.options),
          };
        }
        visitSequence(t, e) {
          return {
            type: 2,
            steps: t.steps.map((i) => Ut(this, i, e)),
            options: ur(t.options),
          };
        }
        visitGroup(t, e) {
          const i = e.currentTime;
          let r = 0;
          const s = t.steps.map((o) => {
            e.currentTime = i;
            const a = Ut(this, o, e);
            return (r = Math.max(r, e.currentTime)), a;
          });
          return (
            (e.currentTime = r), { type: 3, steps: s, options: ur(t.options) }
          );
        }
        visitAnimate(t, e) {
          const i = (function $B(n, t) {
            let e = null;
            if (n.hasOwnProperty("duration")) e = n;
            else if ("number" == typeof n) return Wf(pc(n, t).duration, 0, "");
            const i = n;
            if (
              i
                .split(/\s+/)
                .some((s) => "{" == s.charAt(0) && "{" == s.charAt(1))
            ) {
              const s = Wf(0, 0, "");
              return (s.dynamic = !0), (s.strValue = i), s;
            }
            return (e = e || pc(i, t)), Wf(e.duration, e.delay, e.easing);
          })(t.timings, e.errors);
          e.currentAnimateTimings = i;
          let r,
            s = t.styles ? t.styles : St({});
          if (5 == s.type) r = this.visitKeyframes(s, e);
          else {
            let o = t.styles,
              a = !1;
            if (!o) {
              a = !0;
              const c = {};
              i.easing && (c.easing = i.easing), (o = St(c));
            }
            e.currentTime += i.duration + i.delay;
            const l = this.visitStyle(o, e);
            (l.isEmptyStep = a), (r = l);
          }
          return (
            (e.currentAnimateTimings = null),
            { type: 4, timings: i, style: r, options: null }
          );
        }
        visitStyle(t, e) {
          const i = this._makeStyleAst(t, e);
          return this._validateStyleAst(i, e), i;
        }
        _makeStyleAst(t, e) {
          const i = [];
          Array.isArray(t.styles)
            ? t.styles.forEach((o) => {
                "string" == typeof o
                  ? o == ai
                    ? i.push(o)
                    : e.errors.push(
                        `The provided style string value ${o} is not allowed.`
                      )
                  : i.push(o);
              })
            : i.push(t.styles);
          let r = !1,
            s = null;
          return (
            i.forEach((o) => {
              if (bc(o)) {
                const a = o,
                  l = a.easing;
                if ((l && ((s = l), delete a.easing), !r))
                  for (let c in a)
                    if (a[c].toString().indexOf("{{") >= 0) {
                      r = !0;
                      break;
                    }
              }
            }),
            {
              type: 6,
              styles: i,
              easing: s,
              offset: t.offset,
              containsDynamicStyles: r,
              options: null,
            }
          );
        }
        _validateStyleAst(t, e) {
          const i = e.currentAnimateTimings;
          let r = e.currentTime,
            s = e.currentTime;
          i && s > 0 && (s -= i.duration + i.delay),
            t.styles.forEach((o) => {
              "string" != typeof o &&
                Object.keys(o).forEach((a) => {
                  if (!this._driver.validateStyleProperty(a))
                    return void e.errors.push(
                      `The provided animation property "${a}" is not a supported CSS property for animations`
                    );
                  const l = e.collectedStyles[e.currentQuerySelector],
                    c = l[a];
                  let u = !0;
                  c &&
                    (s != r &&
                      s >= c.startTime &&
                      r <= c.endTime &&
                      (e.errors.push(
                        `The CSS property "${a}" that exists between the times of "${c.startTime}ms" and "${c.endTime}ms" is also being animated in a parallel animation between the times of "${s}ms" and "${r}ms"`
                      ),
                      (u = !1)),
                    (s = c.startTime)),
                    u && (l[a] = { startTime: s, endTime: r }),
                    e.options &&
                      (function RB(n, t, e) {
                        const i = t.params || {},
                          r = ID(n);
                        r.length &&
                          r.forEach((s) => {
                            i.hasOwnProperty(s) ||
                              e.push(
                                `Unable to resolve the local animation param ${s} in the given list of values`
                              );
                          });
                      })(o[a], e.options, e.errors);
                });
            });
        }
        visitKeyframes(t, e) {
          const i = { type: 5, styles: [], options: null };
          if (!e.currentAnimateTimings)
            return (
              e.errors.push(
                "keyframes() must be placed inside of a call to animate()"
              ),
              i
            );
          let s = 0;
          const o = [];
          let a = !1,
            l = !1,
            c = 0;
          const u = t.steps.map((w) => {
            const v = this._makeStyleAst(w, e);
            let M =
                null != v.offset
                  ? v.offset
                  : (function UB(n) {
                      if ("string" == typeof n) return null;
                      let t = null;
                      if (Array.isArray(n))
                        n.forEach((e) => {
                          if (bc(e) && e.hasOwnProperty("offset")) {
                            const i = e;
                            (t = parseFloat(i.offset)), delete i.offset;
                          }
                        });
                      else if (bc(n) && n.hasOwnProperty("offset")) {
                        const e = n;
                        (t = parseFloat(e.offset)), delete e.offset;
                      }
                      return t;
                    })(v.styles),
              T = 0;
            return (
              null != M && (s++, (T = v.offset = M)),
              (l = l || T < 0 || T > 1),
              (a = a || T < c),
              (c = T),
              o.push(T),
              v
            );
          });
          l &&
            e.errors.push(
              "Please ensure that all keyframe offsets are between 0 and 1"
            ),
            a &&
              e.errors.push(
                "Please ensure that all keyframe offsets are in order"
              );
          const d = t.steps.length;
          let h = 0;
          s > 0 && s < d
            ? e.errors.push(
                "Not all style() steps within the declared keyframes() contain offsets"
              )
            : 0 == s && (h = 1 / (d - 1));
          const f = d - 1,
            p = e.currentTime,
            m = e.currentAnimateTimings,
            b = m.duration;
          return (
            u.forEach((w, v) => {
              const M = h > 0 ? (v == f ? 1 : h * v) : o[v],
                T = M * b;
              (e.currentTime = p + m.delay + T),
                (m.duration = T),
                this._validateStyleAst(w, e),
                (w.offset = M),
                i.styles.push(w);
            }),
            i
          );
        }
        visitReference(t, e) {
          return {
            type: 8,
            animation: Ut(this, Ko(t.animation), e),
            options: ur(t.options),
          };
        }
        visitAnimateChild(t, e) {
          return e.depCount++, { type: 9, options: ur(t.options) };
        }
        visitAnimateRef(t, e) {
          return {
            type: 10,
            animation: this.visitReference(t.animation, e),
            options: ur(t.options),
          };
        }
        visitQuery(t, e) {
          const i = e.currentQuerySelector,
            r = t.options || {};
          e.queryCount++, (e.currentQuery = t);
          const [s, o] = (function BB(n) {
            const t = !!n.split(/\s*,\s*/).find((e) => ":self" == e);
            return (
              t && (n = n.replace(LB, "")),
              (n = n
                .replace(/@\*/g, fc)
                .replace(/@\w+/g, (e) => fc + "-" + e.substr(1))
                .replace(/:animating/g, jf)),
              [n, t]
            );
          })(t.selector);
          (e.currentQuerySelector = i.length ? i + " " + s : s),
            Ht(e.collectedStyles, e.currentQuerySelector, {});
          const a = Ut(this, Ko(t.animation), e);
          return (
            (e.currentQuery = null),
            (e.currentQuerySelector = i),
            {
              type: 11,
              selector: s,
              limit: r.limit || 0,
              optional: !!r.optional,
              includeSelf: o,
              animation: a,
              originalSelector: t.selector,
              options: ur(t.options),
            }
          );
        }
        visitStagger(t, e) {
          e.currentQuery ||
            e.errors.push("stagger() can only be used inside of query()");
          const i =
            "full" === t.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : pc(t.timings, e.errors, !0);
          return {
            type: 12,
            animation: Ut(this, Ko(t.animation), e),
            timings: i,
            options: null,
          };
        }
      }
      class HB {
        constructor(t) {
          (this.errors = t),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = {}),
            (this.options = null);
        }
      }
      function bc(n) {
        return !Array.isArray(n) && "object" == typeof n;
      }
      function ur(n) {
        return (
          n
            ? (n = Cs(n)).params &&
              (n.params = (function jB(n) {
                return n ? Cs(n) : null;
              })(n.params))
            : (n = {}),
          n
        );
      }
      function Wf(n, t, e) {
        return { duration: n, delay: t, easing: e };
      }
      function qf(n, t, e, i, r, s, o = null, a = !1) {
        return {
          type: 1,
          element: n,
          keyframes: t,
          preStyleProps: e,
          postStyleProps: i,
          duration: r,
          delay: s,
          totalTime: r + s,
          easing: o,
          subTimeline: a,
        };
      }
      class Cc {
        constructor() {
          this._map = new Map();
        }
        get(t) {
          return this._map.get(t) || [];
        }
        append(t, e) {
          let i = this._map.get(t);
          i || this._map.set(t, (i = [])), i.push(...e);
        }
        has(t) {
          return this._map.has(t);
        }
        clear() {
          this._map.clear();
        }
      }
      const WB = new RegExp(":enter", "g"),
        KB = new RegExp(":leave", "g");
      function Kf(n, t, e, i, r, s = {}, o = {}, a, l, c = []) {
        return new QB().buildKeyframes(n, t, e, i, r, s, o, a, l, c);
      }
      class QB {
        buildKeyframes(t, e, i, r, s, o, a, l, c, u = []) {
          c = c || new Cc();
          const d = new Qf(t, e, c, r, s, u, []);
          (d.options = l),
            d.currentTimeline.setStyles([o], null, d.errors, l),
            Ut(this, i, d);
          const h = d.timelines.filter((f) => f.containsAnimation());
          if (Object.keys(a).length) {
            let f;
            for (let p = h.length - 1; p >= 0; p--) {
              const m = h[p];
              if (m.element === e) {
                f = m;
                break;
              }
            }
            f &&
              !f.allowOnlyTimelineStyles() &&
              f.setStyles([a], null, d.errors, l);
          }
          return h.length
            ? h.map((f) => f.buildKeyframes())
            : [qf(e, [], [], [], 0, 0, "", !1)];
        }
        visitTrigger(t, e) {}
        visitState(t, e) {}
        visitTransition(t, e) {}
        visitAnimateChild(t, e) {
          const i = e.subInstructions.get(e.element);
          if (i) {
            const r = e.createSubContext(t.options),
              s = e.currentTimeline.currentTime,
              o = this._visitSubInstructions(i, r, r.options);
            s != o && e.transformIntoNewTimeline(o);
          }
          e.previousNode = t;
        }
        visitAnimateRef(t, e) {
          const i = e.createSubContext(t.options);
          i.transformIntoNewTimeline(),
            this.visitReference(t.animation, i),
            e.transformIntoNewTimeline(i.currentTimeline.currentTime),
            (e.previousNode = t);
        }
        _visitSubInstructions(t, e, i) {
          let s = e.currentTimeline.currentTime;
          const o = null != i.duration ? lr(i.duration) : null,
            a = null != i.delay ? lr(i.delay) : null;
          return (
            0 !== o &&
              t.forEach((l) => {
                const c = e.appendInstructionToTimeline(l, o, a);
                s = Math.max(s, c.duration + c.delay);
              }),
            s
          );
        }
        visitReference(t, e) {
          e.updateOptions(t.options, !0),
            Ut(this, t.animation, e),
            (e.previousNode = t);
        }
        visitSequence(t, e) {
          const i = e.subContextCount;
          let r = e;
          const s = t.options;
          if (
            s &&
            (s.params || s.delay) &&
            ((r = e.createSubContext(s)),
            r.transformIntoNewTimeline(),
            null != s.delay)
          ) {
            6 == r.previousNode.type &&
              (r.currentTimeline.snapshotCurrentStyles(),
              (r.previousNode = wc));
            const o = lr(s.delay);
            r.delayNextStep(o);
          }
          t.steps.length &&
            (t.steps.forEach((o) => Ut(this, o, r)),
            r.currentTimeline.applyStylesToKeyframe(),
            r.subContextCount > i && r.transformIntoNewTimeline()),
            (e.previousNode = t);
        }
        visitGroup(t, e) {
          const i = [];
          let r = e.currentTimeline.currentTime;
          const s = t.options && t.options.delay ? lr(t.options.delay) : 0;
          t.steps.forEach((o) => {
            const a = e.createSubContext(t.options);
            s && a.delayNextStep(s),
              Ut(this, o, a),
              (r = Math.max(r, a.currentTimeline.currentTime)),
              i.push(a.currentTimeline);
          }),
            i.forEach((o) => e.currentTimeline.mergeTimelineCollectedStyles(o)),
            e.transformIntoNewTimeline(r),
            (e.previousNode = t);
        }
        _visitTiming(t, e) {
          if (t.dynamic) {
            const i = t.strValue;
            return pc(e.params ? mc(i, e.params, e.errors) : i, e.errors);
          }
          return { duration: t.duration, delay: t.delay, easing: t.easing };
        }
        visitAnimate(t, e) {
          const i = (e.currentAnimateTimings = this._visitTiming(t.timings, e)),
            r = e.currentTimeline;
          i.delay && (e.incrementTime(i.delay), r.snapshotCurrentStyles());
          const s = t.style;
          5 == s.type
            ? this.visitKeyframes(s, e)
            : (e.incrementTime(i.duration),
              this.visitStyle(s, e),
              r.applyStylesToKeyframe()),
            (e.currentAnimateTimings = null),
            (e.previousNode = t);
        }
        visitStyle(t, e) {
          const i = e.currentTimeline,
            r = e.currentAnimateTimings;
          !r && i.getCurrentStyleProperties().length && i.forwardFrame();
          const s = (r && r.easing) || t.easing;
          t.isEmptyStep
            ? i.applyEmptyStep(s)
            : i.setStyles(t.styles, s, e.errors, e.options),
            (e.previousNode = t);
        }
        visitKeyframes(t, e) {
          const i = e.currentAnimateTimings,
            r = e.currentTimeline.duration,
            s = i.duration,
            a = e.createSubContext().currentTimeline;
          (a.easing = i.easing),
            t.styles.forEach((l) => {
              a.forwardTime((l.offset || 0) * s),
                a.setStyles(l.styles, l.easing, e.errors, e.options),
                a.applyStylesToKeyframe();
            }),
            e.currentTimeline.mergeTimelineCollectedStyles(a),
            e.transformIntoNewTimeline(r + s),
            (e.previousNode = t);
        }
        visitQuery(t, e) {
          const i = e.currentTimeline.currentTime,
            r = t.options || {},
            s = r.delay ? lr(r.delay) : 0;
          s &&
            (6 === e.previousNode.type ||
              (0 == i &&
                e.currentTimeline.getCurrentStyleProperties().length)) &&
            (e.currentTimeline.snapshotCurrentStyles(), (e.previousNode = wc));
          let o = i;
          const a = e.invokeQuery(
            t.selector,
            t.originalSelector,
            t.limit,
            t.includeSelf,
            !!r.optional,
            e.errors
          );
          e.currentQueryTotal = a.length;
          let l = null;
          a.forEach((c, u) => {
            e.currentQueryIndex = u;
            const d = e.createSubContext(t.options, c);
            s && d.delayNextStep(s),
              c === e.element && (l = d.currentTimeline),
              Ut(this, t.animation, d),
              d.currentTimeline.applyStylesToKeyframe(),
              (o = Math.max(o, d.currentTimeline.currentTime));
          }),
            (e.currentQueryIndex = 0),
            (e.currentQueryTotal = 0),
            e.transformIntoNewTimeline(o),
            l &&
              (e.currentTimeline.mergeTimelineCollectedStyles(l),
              e.currentTimeline.snapshotCurrentStyles()),
            (e.previousNode = t);
        }
        visitStagger(t, e) {
          const i = e.parentContext,
            r = e.currentTimeline,
            s = t.timings,
            o = Math.abs(s.duration),
            a = o * (e.currentQueryTotal - 1);
          let l = o * e.currentQueryIndex;
          switch (s.duration < 0 ? "reverse" : s.easing) {
            case "reverse":
              l = a - l;
              break;
            case "full":
              l = i.currentStaggerTime;
          }
          const u = e.currentTimeline;
          l && u.delayNextStep(l);
          const d = u.currentTime;
          Ut(this, t.animation, e),
            (e.previousNode = t),
            (i.currentStaggerTime =
              r.currentTime - d + (r.startTime - i.currentTimeline.startTime));
        }
      }
      const wc = {};
      class Qf {
        constructor(t, e, i, r, s, o, a, l) {
          (this._driver = t),
            (this.element = e),
            (this.subInstructions = i),
            (this._enterClassName = r),
            (this._leaveClassName = s),
            (this.errors = o),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = wc),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new Dc(this._driver, e, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(t, e) {
          if (!t) return;
          const i = t;
          let r = this.options;
          null != i.duration && (r.duration = lr(i.duration)),
            null != i.delay && (r.delay = lr(i.delay));
          const s = i.params;
          if (s) {
            let o = r.params;
            o || (o = this.options.params = {}),
              Object.keys(s).forEach((a) => {
                (!e || !o.hasOwnProperty(a)) &&
                  (o[a] = mc(s[a], o, this.errors));
              });
          }
        }
        _copyOptions() {
          const t = {};
          if (this.options) {
            const e = this.options.params;
            if (e) {
              const i = (t.params = {});
              Object.keys(e).forEach((r) => {
                i[r] = e[r];
              });
            }
          }
          return t;
        }
        createSubContext(t = null, e, i) {
          const r = e || this.element,
            s = new Qf(
              this._driver,
              r,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(r, i || 0)
            );
          return (
            (s.previousNode = this.previousNode),
            (s.currentAnimateTimings = this.currentAnimateTimings),
            (s.options = this._copyOptions()),
            s.updateOptions(t),
            (s.currentQueryIndex = this.currentQueryIndex),
            (s.currentQueryTotal = this.currentQueryTotal),
            (s.parentContext = this),
            this.subContextCount++,
            s
          );
        }
        transformIntoNewTimeline(t) {
          return (
            (this.previousNode = wc),
            (this.currentTimeline = this.currentTimeline.fork(this.element, t)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(t, e, i) {
          const r = {
              duration: null != e ? e : t.duration,
              delay:
                this.currentTimeline.currentTime +
                (null != i ? i : 0) +
                t.delay,
              easing: "",
            },
            s = new YB(
              this._driver,
              t.element,
              t.keyframes,
              t.preStyleProps,
              t.postStyleProps,
              r,
              t.stretchStartingKeyframe
            );
          return this.timelines.push(s), r;
        }
        incrementTime(t) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + t);
        }
        delayNextStep(t) {
          t > 0 && this.currentTimeline.delayNextStep(t);
        }
        invokeQuery(t, e, i, r, s, o) {
          let a = [];
          if ((r && a.push(this.element), t.length > 0)) {
            t = (t = t.replace(WB, "." + this._enterClassName)).replace(
              KB,
              "." + this._leaveClassName
            );
            let c = this._driver.query(this.element, t, 1 != i);
            0 !== i &&
              (c = i < 0 ? c.slice(c.length + i, c.length) : c.slice(0, i)),
              a.push(...c);
          }
          return (
            !s &&
              0 == a.length &&
              o.push(
                `\`query("${e}")\` returned zero elements. (Use \`query("${e}", { optional: true })\` if you wish to allow this.)`
              ),
            a
          );
        }
      }
      class Dc {
        constructor(t, e, i, r) {
          (this._driver = t),
            (this.element = e),
            (this.startTime = i),
            (this._elementTimelineStylesLookup = r),
            (this.duration = 0),
            (this._previousKeyframe = {}),
            (this._currentKeyframe = {}),
            (this._keyframes = new Map()),
            (this._styleSummary = {}),
            (this._pendingStyles = {}),
            (this._backFill = {}),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._localTimelineStyles = Object.create(this._backFill, {})),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(e)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                e,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0;
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe);
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(t) {
          const e =
            1 == this._keyframes.size &&
            Object.keys(this._pendingStyles).length;
          this.duration || e
            ? (this.forwardTime(this.currentTime + t),
              e && this.snapshotCurrentStyles())
            : (this.startTime += t);
        }
        fork(t, e) {
          return (
            this.applyStylesToKeyframe(),
            new Dc(
              this._driver,
              t,
              e || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = Object.create(this._backFill, {})),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(t) {
          this.applyStylesToKeyframe(),
            (this.duration = t),
            this._loadKeyframe();
        }
        _updateStyle(t, e) {
          (this._localTimelineStyles[t] = e),
            (this._globalTimelineStyles[t] = e),
            (this._styleSummary[t] = { time: this.currentTime, value: e });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(t) {
          t && (this._previousKeyframe.easing = t),
            Object.keys(this._globalTimelineStyles).forEach((e) => {
              (this._backFill[e] = this._globalTimelineStyles[e] || ai),
                (this._currentKeyframe[e] = ai);
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe);
        }
        setStyles(t, e, i, r) {
          e && (this._previousKeyframe.easing = e);
          const s = (r && r.params) || {},
            o = (function ZB(n, t) {
              const e = {};
              let i;
              return (
                n.forEach((r) => {
                  "*" === r
                    ? ((i = i || Object.keys(t)),
                      i.forEach((s) => {
                        e[s] = ai;
                      }))
                    : Si(r, !1, e);
                }),
                e
              );
            })(t, this._globalTimelineStyles);
          Object.keys(o).forEach((a) => {
            const l = mc(o[a], s, i);
            (this._pendingStyles[a] = l),
              this._localTimelineStyles.hasOwnProperty(a) ||
                (this._backFill[a] = this._globalTimelineStyles.hasOwnProperty(
                  a
                )
                  ? this._globalTimelineStyles[a]
                  : ai),
              this._updateStyle(a, l);
          });
        }
        applyStylesToKeyframe() {
          const t = this._pendingStyles,
            e = Object.keys(t);
          0 != e.length &&
            ((this._pendingStyles = {}),
            e.forEach((i) => {
              this._currentKeyframe[i] = t[i];
            }),
            Object.keys(this._localTimelineStyles).forEach((i) => {
              this._currentKeyframe.hasOwnProperty(i) ||
                (this._currentKeyframe[i] = this._localTimelineStyles[i]);
            }));
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach((t) => {
            const e = this._localTimelineStyles[t];
            (this._pendingStyles[t] = e), this._updateStyle(t, e);
          });
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const t = [];
          for (let e in this._currentKeyframe) t.push(e);
          return t;
        }
        mergeTimelineCollectedStyles(t) {
          Object.keys(t._styleSummary).forEach((e) => {
            const i = this._styleSummary[e],
              r = t._styleSummary[e];
            (!i || r.time > i.time) && this._updateStyle(e, r.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const t = new Set(),
            e = new Set(),
            i = 1 === this._keyframes.size && 0 === this.duration;
          let r = [];
          this._keyframes.forEach((a, l) => {
            const c = Si(a, !0);
            Object.keys(c).forEach((u) => {
              const d = c[u];
              "!" == d ? t.add(u) : d == ai && e.add(u);
            }),
              i || (c.offset = l / this.duration),
              r.push(c);
          });
          const s = t.size ? gc(t.values()) : [],
            o = e.size ? gc(e.values()) : [];
          if (i) {
            const a = r[0],
              l = Cs(a);
            (a.offset = 0), (l.offset = 1), (r = [a, l]);
          }
          return qf(
            this.element,
            r,
            s,
            o,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class YB extends Dc {
        constructor(t, e, i, r, s, o, a = !1) {
          super(t, e, o.delay),
            (this.keyframes = i),
            (this.preStyleProps = r),
            (this.postStyleProps = s),
            (this._stretchStartingKeyframe = a),
            (this.timings = {
              duration: o.duration,
              delay: o.delay,
              easing: o.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let t = this.keyframes,
            { delay: e, duration: i, easing: r } = this.timings;
          if (this._stretchStartingKeyframe && e) {
            const s = [],
              o = i + e,
              a = e / o,
              l = Si(t[0], !1);
            (l.offset = 0), s.push(l);
            const c = Si(t[0], !1);
            (c.offset = ND(a)), s.push(c);
            const u = t.length - 1;
            for (let d = 1; d <= u; d++) {
              let h = Si(t[d], !1);
              (h.offset = ND((e + h.offset * i) / o)), s.push(h);
            }
            (i = o), (e = 0), (r = ""), (t = s);
          }
          return qf(
            this.element,
            t,
            this.preStyleProps,
            this.postStyleProps,
            i,
            e,
            r,
            !0
          );
        }
      }
      function ND(n, t = 3) {
        const e = Math.pow(10, t - 1);
        return Math.round(n * e) / e;
      }
      class Yf {}
      class XB extends Yf {
        normalizePropertyName(t, e) {
          return $f(t);
        }
        normalizeStyleValue(t, e, i, r) {
          let s = "";
          const o = i.toString().trim();
          if (JB[e] && 0 !== i && "0" !== i)
            if ("number" == typeof i) s = "px";
            else {
              const a = i.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                r.push(`Please provide a CSS unit value for ${t}:${i}`);
            }
          return o + s;
        }
      }
      const JB = (() =>
        (function ej(n) {
          const t = {};
          return n.forEach((e) => (t[e] = !0)), t;
        })(
          "width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(
            ","
          )
        ))();
      function LD(n, t, e, i, r, s, o, a, l, c, u, d, h) {
        return {
          type: 0,
          element: n,
          triggerName: t,
          isRemovalTransition: r,
          fromState: e,
          fromStyles: s,
          toState: i,
          toStyles: o,
          timelines: a,
          queriedElements: l,
          preStyleProps: c,
          postStyleProps: u,
          totalTime: d,
          errors: h,
        };
      }
      const Zf = {};
      class VD {
        constructor(t, e, i) {
          (this._triggerName = t), (this.ast = e), (this._stateStyles = i);
        }
        match(t, e, i, r) {
          return (function tj(n, t, e, i, r) {
            return n.some((s) => s(t, e, i, r));
          })(this.ast.matchers, t, e, i, r);
        }
        buildStyles(t, e, i) {
          const r = this._stateStyles["*"],
            s = this._stateStyles[t],
            o = r ? r.buildStyles(e, i) : {};
          return s ? s.buildStyles(e, i) : o;
        }
        build(t, e, i, r, s, o, a, l, c, u) {
          const d = [],
            h = (this.ast.options && this.ast.options.params) || Zf,
            p = this.buildStyles(i, (a && a.params) || Zf, d),
            m = (l && l.params) || Zf,
            b = this.buildStyles(r, m, d),
            w = new Set(),
            v = new Map(),
            M = new Map(),
            T = "void" === r,
            $ = { params: Object.assign(Object.assign({}, h), m) },
            Me = u ? [] : Kf(t, e, this.ast.animation, s, o, p, b, $, c, d);
          let Ae = 0;
          if (
            (Me.forEach((Gt) => {
              Ae = Math.max(Gt.duration + Gt.delay, Ae);
            }),
            d.length)
          )
            return LD(e, this._triggerName, i, r, T, p, b, [], [], v, M, Ae, d);
          Me.forEach((Gt) => {
            const Wt = Gt.element,
              Ss = Ht(v, Wt, {});
            Gt.preStyleProps.forEach((Mn) => (Ss[Mn] = !0));
            const li = Ht(M, Wt, {});
            Gt.postStyleProps.forEach((Mn) => (li[Mn] = !0)),
              Wt !== e && w.add(Wt);
          });
          const zt = gc(w.values());
          return LD(e, this._triggerName, i, r, T, p, b, Me, zt, v, M, Ae);
        }
      }
      class nj {
        constructor(t, e, i) {
          (this.styles = t), (this.defaultParams = e), (this.normalizer = i);
        }
        buildStyles(t, e) {
          const i = {},
            r = Cs(this.defaultParams);
          return (
            Object.keys(t).forEach((s) => {
              const o = t[s];
              null != o && (r[s] = o);
            }),
            this.styles.styles.forEach((s) => {
              if ("string" != typeof s) {
                const o = s;
                Object.keys(o).forEach((a) => {
                  let l = o[a];
                  l.length > 1 && (l = mc(l, r, e));
                  const c = this.normalizer.normalizePropertyName(a, e);
                  (l = this.normalizer.normalizeStyleValue(a, c, l, e)),
                    (i[c] = l);
                });
              }
            }),
            i
          );
        }
      }
      class rj {
        constructor(t, e, i) {
          (this.name = t),
            (this.ast = e),
            (this._normalizer = i),
            (this.transitionFactories = []),
            (this.states = {}),
            e.states.forEach((r) => {
              this.states[r.name] = new nj(
                r.style,
                (r.options && r.options.params) || {},
                i
              );
            }),
            BD(this.states, "true", "1"),
            BD(this.states, "false", "0"),
            e.transitions.forEach((r) => {
              this.transitionFactories.push(new VD(t, r, this.states));
            }),
            (this.fallbackTransition = (function sj(n, t, e) {
              return new VD(
                n,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(o, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                t
              );
            })(t, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(t, e, i, r) {
          return (
            this.transitionFactories.find((o) => o.match(t, e, i, r)) || null
          );
        }
        matchStyles(t, e, i) {
          return this.fallbackTransition.buildStyles(t, e, i);
        }
      }
      function BD(n, t, e) {
        n.hasOwnProperty(t)
          ? n.hasOwnProperty(e) || (n[e] = n[t])
          : n.hasOwnProperty(e) && (n[t] = n[e]);
      }
      const oj = new Cc();
      class aj {
        constructor(t, e, i) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = i),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = []);
        }
        register(t, e) {
          const i = [],
            r = Gf(this._driver, e, i);
          if (i.length)
            throw new Error(
              `Unable to build the animation due to the following errors: ${i.join(
                "\n"
              )}`
            );
          this._animations[t] = r;
        }
        _buildPlayer(t, e, i) {
          const r = t.element,
            s = vD(0, this._normalizer, 0, t.keyframes, e, i);
          return this._driver.animate(
            r,
            s,
            t.duration,
            t.delay,
            t.easing,
            [],
            !0
          );
        }
        create(t, e, i = {}) {
          const r = [],
            s = this._animations[t];
          let o;
          const a = new Map();
          if (
            (s
              ? ((o = Kf(this._driver, e, s, Bf, dc, {}, {}, i, oj, r)),
                o.forEach((u) => {
                  const d = Ht(a, u.element, {});
                  u.postStyleProps.forEach((h) => (d[h] = null));
                }))
              : (r.push(
                  "The requested animation doesn't exist or has already been destroyed"
                ),
                (o = [])),
            r.length)
          )
            throw new Error(
              `Unable to create the animation due to the following errors: ${r.join(
                "\n"
              )}`
            );
          a.forEach((u, d) => {
            Object.keys(u).forEach((h) => {
              u[h] = this._driver.computeStyle(d, h, ai);
            });
          });
          const c = Mi(
            o.map((u) => {
              const d = a.get(u.element);
              return this._buildPlayer(u, {}, d);
            })
          );
          return (
            (this._playersById[t] = c),
            c.onDestroy(() => this.destroy(t)),
            this.players.push(c),
            c
          );
        }
        destroy(t) {
          const e = this._getPlayer(t);
          e.destroy(), delete this._playersById[t];
          const i = this.players.indexOf(e);
          i >= 0 && this.players.splice(i, 1);
        }
        _getPlayer(t) {
          const e = this._playersById[t];
          if (!e)
            throw new Error(
              `Unable to find the timeline player referenced by ${t}`
            );
          return e;
        }
        listen(t, e, i, r) {
          const s = Of(e, "", "", "");
          return Rf(this._getPlayer(t), i, s, r), () => {};
        }
        command(t, e, i, r) {
          if ("register" == i) return void this.register(t, r[0]);
          if ("create" == i) return void this.create(t, e, r[0] || {});
          const s = this._getPlayer(t);
          switch (i) {
            case "play":
              s.play();
              break;
            case "pause":
              s.pause();
              break;
            case "reset":
              s.reset();
              break;
            case "restart":
              s.restart();
              break;
            case "finish":
              s.finish();
              break;
            case "init":
              s.init();
              break;
            case "setPosition":
              s.setPosition(parseFloat(r[0]));
              break;
            case "destroy":
              this.destroy(t);
          }
        }
      }
      const jD = "ng-animate-queued",
        Xf = "ng-animate-disabled",
        hj = [],
        HD = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        fj = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        an = "__ng_removed";
      class Jf {
        constructor(t, e = "") {
          this.namespaceId = e;
          const i = t && t.hasOwnProperty("value");
          if (
            ((this.value = (function _j(n) {
              return null != n ? n : null;
            })(i ? t.value : t)),
            i)
          ) {
            const s = Cs(t);
            delete s.value, (this.options = s);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(t) {
          const e = t.params;
          if (e) {
            const i = this.options.params;
            Object.keys(e).forEach((r) => {
              null == i[r] && (i[r] = e[r]);
            });
          }
        }
      }
      const Qo = "void",
        ep = new Jf(Qo);
      class pj {
        constructor(t, e, i) {
          (this.id = t),
            (this.hostElement = e),
            (this._engine = i),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + t),
            ln(e, this._hostClassName);
        }
        listen(t, e, i, r) {
          if (!this._triggers.hasOwnProperty(e))
            throw new Error(
              `Unable to listen on the animation trigger event "${i}" because the animation trigger "${e}" doesn't exist!`
            );
          if (null == i || 0 == i.length)
            throw new Error(
              `Unable to listen on the animation trigger "${e}" because the provided event is undefined!`
            );
          if (
            !(function yj(n) {
              return "start" == n || "done" == n;
            })(i)
          )
            throw new Error(
              `The provided animation trigger event "${i}" for the animation trigger "${e}" is not supported!`
            );
          const s = Ht(this._elementListeners, t, []),
            o = { name: e, phase: i, callback: r };
          s.push(o);
          const a = Ht(this._engine.statesByElement, t, {});
          return (
            a.hasOwnProperty(e) ||
              (ln(t, hc), ln(t, hc + "-" + e), (a[e] = ep)),
            () => {
              this._engine.afterFlush(() => {
                const l = s.indexOf(o);
                l >= 0 && s.splice(l, 1), this._triggers[e] || delete a[e];
              });
            }
          );
        }
        register(t, e) {
          return !this._triggers[t] && ((this._triggers[t] = e), !0);
        }
        _getTrigger(t) {
          const e = this._triggers[t];
          if (!e)
            throw new Error(
              `The provided animation trigger "${t}" has not been registered!`
            );
          return e;
        }
        trigger(t, e, i, r = !0) {
          const s = this._getTrigger(e),
            o = new tp(this.id, e, t);
          let a = this._engine.statesByElement.get(t);
          a ||
            (ln(t, hc),
            ln(t, hc + "-" + e),
            this._engine.statesByElement.set(t, (a = {})));
          let l = a[e];
          const c = new Jf(i, this.id);
          if (
            (!(i && i.hasOwnProperty("value")) &&
              l &&
              c.absorbOptions(l.options),
            (a[e] = c),
            l || (l = ep),
            c.value !== Qo && l.value === c.value)
          ) {
            if (
              !(function Cj(n, t) {
                const e = Object.keys(n),
                  i = Object.keys(t);
                if (e.length != i.length) return !1;
                for (let r = 0; r < e.length; r++) {
                  const s = e[r];
                  if (!t.hasOwnProperty(s) || n[s] !== t[s]) return !1;
                }
                return !0;
              })(l.params, c.params)
            ) {
              const m = [],
                b = s.matchStyles(l.value, l.params, m),
                w = s.matchStyles(c.value, c.params, m);
              m.length
                ? this._engine.reportError(m)
                : this._engine.afterFlush(() => {
                    cr(t, b), Un(t, w);
                  });
            }
            return;
          }
          const h = Ht(this._engine.playersByElement, t, []);
          h.forEach((m) => {
            m.namespaceId == this.id &&
              m.triggerName == e &&
              m.queued &&
              m.destroy();
          });
          let f = s.matchTransition(l.value, c.value, t, c.params),
            p = !1;
          if (!f) {
            if (!r) return;
            (f = s.fallbackTransition), (p = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: t,
              triggerName: e,
              transition: f,
              fromState: l,
              toState: c,
              player: o,
              isFallbackTransition: p,
            }),
            p ||
              (ln(t, jD),
              o.onStart(() => {
                ws(t, jD);
              })),
            o.onDone(() => {
              let m = this.players.indexOf(o);
              m >= 0 && this.players.splice(m, 1);
              const b = this._engine.playersByElement.get(t);
              if (b) {
                let w = b.indexOf(o);
                w >= 0 && b.splice(w, 1);
              }
            }),
            this.players.push(o),
            h.push(o),
            o
          );
        }
        deregister(t) {
          delete this._triggers[t],
            this._engine.statesByElement.forEach((e, i) => {
              delete e[t];
            }),
            this._elementListeners.forEach((e, i) => {
              this._elementListeners.set(
                i,
                e.filter((r) => r.name != t)
              );
            });
        }
        clearElementCache(t) {
          this._engine.statesByElement.delete(t),
            this._elementListeners.delete(t);
          const e = this._engine.playersByElement.get(t);
          e &&
            (e.forEach((i) => i.destroy()),
            this._engine.playersByElement.delete(t));
        }
        _signalRemovalForInnerTriggers(t, e) {
          const i = this._engine.driver.query(t, fc, !0);
          i.forEach((r) => {
            if (r[an]) return;
            const s = this._engine.fetchNamespacesByElement(r);
            s.size
              ? s.forEach((o) => o.triggerLeaveAnimation(r, e, !1, !0))
              : this.clearElementCache(r);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              i.forEach((r) => this.clearElementCache(r))
            );
        }
        triggerLeaveAnimation(t, e, i, r) {
          const s = this._engine.statesByElement.get(t),
            o = new Map();
          if (s) {
            const a = [];
            if (
              (Object.keys(s).forEach((l) => {
                if ((o.set(l, s[l].value), this._triggers[l])) {
                  const c = this.trigger(t, l, Qo, r);
                  c && a.push(c);
                }
              }),
              a.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, t, !0, e, o),
                i && Mi(a).onDone(() => this._engine.processLeaveNode(t)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(t) {
          const e = this._elementListeners.get(t),
            i = this._engine.statesByElement.get(t);
          if (e && i) {
            const r = new Set();
            e.forEach((s) => {
              const o = s.name;
              if (r.has(o)) return;
              r.add(o);
              const l = this._triggers[o].fallbackTransition,
                c = i[o] || ep,
                u = new Jf(Qo),
                d = new tp(this.id, o, t);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: t,
                  triggerName: o,
                  transition: l,
                  fromState: c,
                  toState: u,
                  player: d,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(t, e) {
          const i = this._engine;
          if (
            (t.childElementCount && this._signalRemovalForInnerTriggers(t, e),
            this.triggerLeaveAnimation(t, e, !0))
          )
            return;
          let r = !1;
          if (i.totalAnimations) {
            const s = i.players.length ? i.playersByQueriedElement.get(t) : [];
            if (s && s.length) r = !0;
            else {
              let o = t;
              for (; (o = o.parentNode); )
                if (i.statesByElement.get(o)) {
                  r = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(t), r))
            i.markElementAsRemoved(this.id, t, !1, e);
          else {
            const s = t[an];
            (!s || s === HD) &&
              (i.afterFlush(() => this.clearElementCache(t)),
              i.destroyInnerAnimations(t),
              i._onRemovalComplete(t, e));
          }
        }
        insertNode(t, e) {
          ln(t, this._hostClassName);
        }
        drainQueuedTransitions(t) {
          const e = [];
          return (
            this._queue.forEach((i) => {
              const r = i.player;
              if (r.destroyed) return;
              const s = i.element,
                o = this._elementListeners.get(s);
              o &&
                o.forEach((a) => {
                  if (a.name == i.triggerName) {
                    const l = Of(
                      s,
                      i.triggerName,
                      i.fromState.value,
                      i.toState.value
                    );
                    (l._data = t), Rf(i.player, a.phase, l, a.callback);
                  }
                }),
                r.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      r.destroy();
                    })
                  : e.push(i);
            }),
            (this._queue = []),
            e.sort((i, r) => {
              const s = i.transition.ast.depCount,
                o = r.transition.ast.depCount;
              return 0 == s || 0 == o
                ? s - o
                : this._engine.driver.containsElement(i.element, r.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(t) {
          this.players.forEach((e) => e.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, t);
        }
        elementContainsData(t) {
          let e = !1;
          return (
            this._elementListeners.has(t) && (e = !0),
            (e = !!this._queue.find((i) => i.element === t) || e),
            e
          );
        }
      }
      class mj {
        constructor(t, e, i) {
          (this.bodyNode = t),
            (this.driver = e),
            (this._normalizer = i),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (r, s) => {});
        }
        _onRemovalComplete(t, e) {
          this.onRemovalComplete(t, e);
        }
        get queuedPlayers() {
          const t = [];
          return (
            this._namespaceList.forEach((e) => {
              e.players.forEach((i) => {
                i.queued && t.push(i);
              });
            }),
            t
          );
        }
        createNamespace(t, e) {
          const i = new pj(t, e, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, e)
              ? this._balanceNamespaceList(i, e)
              : (this.newHostElements.set(e, i), this.collectEnterElement(e)),
            (this._namespaceLookup[t] = i)
          );
        }
        _balanceNamespaceList(t, e) {
          const i = this._namespaceList.length - 1;
          if (i >= 0) {
            let r = !1;
            for (let s = i; s >= 0; s--)
              if (
                this.driver.containsElement(
                  this._namespaceList[s].hostElement,
                  e
                )
              ) {
                this._namespaceList.splice(s + 1, 0, t), (r = !0);
                break;
              }
            r || this._namespaceList.splice(0, 0, t);
          } else this._namespaceList.push(t);
          return this.namespacesByHostElement.set(e, t), t;
        }
        register(t, e) {
          let i = this._namespaceLookup[t];
          return i || (i = this.createNamespace(t, e)), i;
        }
        registerTrigger(t, e, i) {
          let r = this._namespaceLookup[t];
          r && r.register(e, i) && this.totalAnimations++;
        }
        destroy(t, e) {
          if (!t) return;
          const i = this._fetchNamespace(t);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(i.hostElement),
              delete this._namespaceLookup[t];
            const r = this._namespaceList.indexOf(i);
            r >= 0 && this._namespaceList.splice(r, 1);
          }),
            this.afterFlushAnimationsDone(() => i.destroy(e));
        }
        _fetchNamespace(t) {
          return this._namespaceLookup[t];
        }
        fetchNamespacesByElement(t) {
          const e = new Set(),
            i = this.statesByElement.get(t);
          if (i) {
            const r = Object.keys(i);
            for (let s = 0; s < r.length; s++) {
              const o = i[r[s]].namespaceId;
              if (o) {
                const a = this._fetchNamespace(o);
                a && e.add(a);
              }
            }
          }
          return e;
        }
        trigger(t, e, i, r) {
          if (Ec(e)) {
            const s = this._fetchNamespace(t);
            if (s) return s.trigger(e, i, r), !0;
          }
          return !1;
        }
        insertNode(t, e, i, r) {
          if (!Ec(e)) return;
          const s = e[an];
          if (s && s.setForRemoval) {
            (s.setForRemoval = !1), (s.setForMove = !0);
            const o = this.collectedLeaveElements.indexOf(e);
            o >= 0 && this.collectedLeaveElements.splice(o, 1);
          }
          if (t) {
            const o = this._fetchNamespace(t);
            o && o.insertNode(e, i);
          }
          r && this.collectEnterElement(e);
        }
        collectEnterElement(t) {
          this.collectedEnterElements.push(t);
        }
        markElementAsDisabled(t, e) {
          e
            ? this.disabledNodes.has(t) ||
              (this.disabledNodes.add(t), ln(t, Xf))
            : this.disabledNodes.has(t) &&
              (this.disabledNodes.delete(t), ws(t, Xf));
        }
        removeNode(t, e, i, r) {
          if (Ec(e)) {
            const s = t ? this._fetchNamespace(t) : null;
            if (
              (s ? s.removeNode(e, r) : this.markElementAsRemoved(t, e, !1, r),
              i)
            ) {
              const o = this.namespacesByHostElement.get(e);
              o && o.id !== t && o.removeNode(e, r);
            }
          } else this._onRemovalComplete(e, r);
        }
        markElementAsRemoved(t, e, i, r, s) {
          this.collectedLeaveElements.push(e),
            (e[an] = {
              namespaceId: t,
              setForRemoval: r,
              hasAnimation: i,
              removedBeforeQueried: !1,
              previousTriggersValues: s,
            });
        }
        listen(t, e, i, r, s) {
          return Ec(e) ? this._fetchNamespace(t).listen(e, i, r, s) : () => {};
        }
        _buildInstruction(t, e, i, r, s) {
          return t.transition.build(
            this.driver,
            t.element,
            t.fromState.value,
            t.toState.value,
            i,
            r,
            t.fromState.options,
            t.toState.options,
            e,
            s
          );
        }
        destroyInnerAnimations(t) {
          let e = this.driver.query(t, fc, !0);
          e.forEach((i) => this.destroyActiveAnimationsForElement(i)),
            0 != this.playersByQueriedElement.size &&
              ((e = this.driver.query(t, jf, !0)),
              e.forEach((i) => this.finishActiveQueriedAnimationOnElement(i)));
        }
        destroyActiveAnimationsForElement(t) {
          const e = this.playersByElement.get(t);
          e &&
            e.forEach((i) => {
              i.queued ? (i.markedForDestroy = !0) : i.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(t) {
          const e = this.playersByQueriedElement.get(t);
          e && e.forEach((i) => i.finish());
        }
        whenRenderingDone() {
          return new Promise((t) => {
            if (this.players.length) return Mi(this.players).onDone(() => t());
            t();
          });
        }
        processLeaveNode(t) {
          var e;
          const i = t[an];
          if (i && i.setForRemoval) {
            if (((t[an] = HD), i.namespaceId)) {
              this.destroyInnerAnimations(t);
              const r = this._fetchNamespace(i.namespaceId);
              r && r.clearElementCache(t);
            }
            this._onRemovalComplete(t, i.setForRemoval);
          }
          (null === (e = t.classList) || void 0 === e
            ? void 0
            : e.contains(Xf)) && this.markElementAsDisabled(t, !1),
            this.driver.query(t, ".ng-animate-disabled", !0).forEach((r) => {
              this.markElementAsDisabled(r, !1);
            });
        }
        flush(t = -1) {
          let e = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((i, r) =>
                this._balanceNamespaceList(i, r)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let i = 0; i < this.collectedEnterElements.length; i++)
              ln(this.collectedEnterElements[i], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const i = [];
            try {
              e = this._flushAnimations(i, t);
            } finally {
              for (let r = 0; r < i.length; r++) i[r]();
            }
          } else
            for (let i = 0; i < this.collectedLeaveElements.length; i++)
              this.processLeaveNode(this.collectedLeaveElements[i]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((i) => i()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const i = this._whenQuietFns;
            (this._whenQuietFns = []),
              e.length
                ? Mi(e).onDone(() => {
                    i.forEach((r) => r());
                  })
                : i.forEach((r) => r());
          }
        }
        reportError(t) {
          throw new Error(
            `Unable to process animations due to the following failed trigger transitions\n ${t.join(
              "\n"
            )}`
          );
        }
        _flushAnimations(t, e) {
          const i = new Cc(),
            r = [],
            s = new Map(),
            o = [],
            a = new Map(),
            l = new Map(),
            c = new Map(),
            u = new Set();
          this.disabledNodes.forEach((I) => {
            u.add(I);
            const O = this.driver.query(I, ".ng-animate-queued", !0);
            for (let N = 0; N < O.length; N++) u.add(O[N]);
          });
          const d = this.bodyNode,
            h = Array.from(this.statesByElement.keys()),
            f = zD(h, this.collectedEnterElements),
            p = new Map();
          let m = 0;
          f.forEach((I, O) => {
            const N = Bf + m++;
            p.set(O, N), I.forEach((oe) => ln(oe, N));
          });
          const b = [],
            w = new Set(),
            v = new Set();
          for (let I = 0; I < this.collectedLeaveElements.length; I++) {
            const O = this.collectedLeaveElements[I],
              N = O[an];
            N &&
              N.setForRemoval &&
              (b.push(O),
              w.add(O),
              N.hasAnimation
                ? this.driver
                    .query(O, ".ng-star-inserted", !0)
                    .forEach((oe) => w.add(oe))
                : v.add(O));
          }
          const M = new Map(),
            T = zD(h, Array.from(w));
          T.forEach((I, O) => {
            const N = dc + m++;
            M.set(O, N), I.forEach((oe) => ln(oe, N));
          }),
            t.push(() => {
              f.forEach((I, O) => {
                const N = p.get(O);
                I.forEach((oe) => ws(oe, N));
              }),
                T.forEach((I, O) => {
                  const N = M.get(O);
                  I.forEach((oe) => ws(oe, N));
                }),
                b.forEach((I) => {
                  this.processLeaveNode(I);
                });
            });
          const $ = [],
            Me = [];
          for (let I = this._namespaceList.length - 1; I >= 0; I--)
            this._namespaceList[I].drainQueuedTransitions(e).forEach((N) => {
              const oe = N.player,
                nt = N.element;
              if (($.push(oe), this.collectedEnterElements.length)) {
                const wt = nt[an];
                if (wt && wt.setForMove) {
                  if (
                    wt.previousTriggersValues &&
                    wt.previousTriggersValues.has(N.triggerName)
                  ) {
                    const fr = wt.previousTriggersValues.get(N.triggerName),
                      Fi = this.statesByElement.get(N.element);
                    Fi && Fi[N.triggerName] && (Fi[N.triggerName].value = fr);
                  }
                  return void oe.destroy();
                }
              }
              const $n = !d || !this.driver.containsElement(d, nt),
                qt = M.get(nt),
                Oi = p.get(nt),
                Te = this._buildInstruction(N, i, Oi, qt, $n);
              if (Te.errors && Te.errors.length) return void Me.push(Te);
              if ($n)
                return (
                  oe.onStart(() => cr(nt, Te.fromStyles)),
                  oe.onDestroy(() => Un(nt, Te.toStyles)),
                  void r.push(oe)
                );
              if (N.isFallbackTransition)
                return (
                  oe.onStart(() => cr(nt, Te.fromStyles)),
                  oe.onDestroy(() => Un(nt, Te.toStyles)),
                  void r.push(oe)
                );
              const uM = [];
              Te.timelines.forEach((wt) => {
                (wt.stretchStartingKeyframe = !0),
                  this.disabledNodes.has(wt.element) || uM.push(wt);
              }),
                (Te.timelines = uM),
                i.append(nt, Te.timelines),
                o.push({ instruction: Te, player: oe, element: nt }),
                Te.queriedElements.forEach((wt) => Ht(a, wt, []).push(oe)),
                Te.preStyleProps.forEach((wt, fr) => {
                  const Fi = Object.keys(wt);
                  if (Fi.length) {
                    let pr = l.get(fr);
                    pr || l.set(fr, (pr = new Set())),
                      Fi.forEach((Pp) => pr.add(Pp));
                  }
                }),
                Te.postStyleProps.forEach((wt, fr) => {
                  const Fi = Object.keys(wt);
                  let pr = c.get(fr);
                  pr || c.set(fr, (pr = new Set())),
                    Fi.forEach((Pp) => pr.add(Pp));
                });
            });
          if (Me.length) {
            const I = [];
            Me.forEach((O) => {
              I.push(`@${O.triggerName} has failed due to:\n`),
                O.errors.forEach((N) => I.push(`- ${N}\n`));
            }),
              $.forEach((O) => O.destroy()),
              this.reportError(I);
          }
          const Ae = new Map(),
            zt = new Map();
          o.forEach((I) => {
            const O = I.element;
            i.has(O) &&
              (zt.set(O, O),
              this._beforeAnimationBuild(
                I.player.namespaceId,
                I.instruction,
                Ae
              ));
          }),
            r.forEach((I) => {
              const O = I.element;
              this._getPreviousPlayers(
                O,
                !1,
                I.namespaceId,
                I.triggerName,
                null
              ).forEach((oe) => {
                Ht(Ae, O, []).push(oe), oe.destroy();
              });
            });
          const Gt = b.filter((I) => WD(I, l, c)),
            Wt = new Map();
          $D(Wt, this.driver, v, c, ai).forEach((I) => {
            WD(I, l, c) && Gt.push(I);
          });
          const li = new Map();
          f.forEach((I, O) => {
            $D(li, this.driver, new Set(I), l, "!");
          }),
            Gt.forEach((I) => {
              const O = Wt.get(I),
                N = li.get(I);
              Wt.set(I, Object.assign(Object.assign({}, O), N));
            });
          const Mn = [],
            xs = [],
            As = {};
          o.forEach((I) => {
            const { element: O, player: N, instruction: oe } = I;
            if (i.has(O)) {
              if (u.has(O))
                return (
                  N.onDestroy(() => Un(O, oe.toStyles)),
                  (N.disabled = !0),
                  N.overrideTotalTime(oe.totalTime),
                  void r.push(N)
                );
              let nt = As;
              if (zt.size > 1) {
                let qt = O;
                const Oi = [];
                for (; (qt = qt.parentNode); ) {
                  const Te = zt.get(qt);
                  if (Te) {
                    nt = Te;
                    break;
                  }
                  Oi.push(qt);
                }
                Oi.forEach((Te) => zt.set(Te, nt));
              }
              const $n = this._buildAnimation(N.namespaceId, oe, Ae, s, li, Wt);
              if ((N.setRealPlayer($n), nt === As)) Mn.push(N);
              else {
                const qt = this.playersByElement.get(nt);
                qt && qt.length && (N.parentPlayer = Mi(qt)), r.push(N);
              }
            } else
              cr(O, oe.fromStyles),
                N.onDestroy(() => Un(O, oe.toStyles)),
                xs.push(N),
                u.has(O) && r.push(N);
          }),
            xs.forEach((I) => {
              const O = s.get(I.element);
              if (O && O.length) {
                const N = Mi(O);
                I.setRealPlayer(N);
              }
            }),
            r.forEach((I) => {
              I.parentPlayer ? I.syncPlayerEvents(I.parentPlayer) : I.destroy();
            });
          for (let I = 0; I < b.length; I++) {
            const O = b[I],
              N = O[an];
            if ((ws(O, dc), N && N.hasAnimation)) continue;
            let oe = [];
            if (a.size) {
              let $n = a.get(O);
              $n && $n.length && oe.push(...$n);
              let qt = this.driver.query(O, jf, !0);
              for (let Oi = 0; Oi < qt.length; Oi++) {
                let Te = a.get(qt[Oi]);
                Te && Te.length && oe.push(...Te);
              }
            }
            const nt = oe.filter(($n) => !$n.destroyed);
            nt.length ? vj(this, O, nt) : this.processLeaveNode(O);
          }
          return (
            (b.length = 0),
            Mn.forEach((I) => {
              this.players.push(I),
                I.onDone(() => {
                  I.destroy();
                  const O = this.players.indexOf(I);
                  this.players.splice(O, 1);
                }),
                I.play();
            }),
            Mn
          );
        }
        elementContainsData(t, e) {
          let i = !1;
          const r = e[an];
          return (
            r && r.setForRemoval && (i = !0),
            this.playersByElement.has(e) && (i = !0),
            this.playersByQueriedElement.has(e) && (i = !0),
            this.statesByElement.has(e) && (i = !0),
            this._fetchNamespace(t).elementContainsData(e) || i
          );
        }
        afterFlush(t) {
          this._flushFns.push(t);
        }
        afterFlushAnimationsDone(t) {
          this._whenQuietFns.push(t);
        }
        _getPreviousPlayers(t, e, i, r, s) {
          let o = [];
          if (e) {
            const a = this.playersByQueriedElement.get(t);
            a && (o = a);
          } else {
            const a = this.playersByElement.get(t);
            if (a) {
              const l = !s || s == Qo;
              a.forEach((c) => {
                c.queued || (!l && c.triggerName != r) || o.push(c);
              });
            }
          }
          return (
            (i || r) &&
              (o = o.filter(
                (a) => !((i && i != a.namespaceId) || (r && r != a.triggerName))
              )),
            o
          );
        }
        _beforeAnimationBuild(t, e, i) {
          const s = e.element,
            o = e.isRemovalTransition ? void 0 : t,
            a = e.isRemovalTransition ? void 0 : e.triggerName;
          for (const l of e.timelines) {
            const c = l.element,
              u = c !== s,
              d = Ht(i, c, []);
            this._getPreviousPlayers(c, u, o, a, e.toState).forEach((f) => {
              const p = f.getRealPlayer();
              p.beforeDestroy && p.beforeDestroy(), f.destroy(), d.push(f);
            });
          }
          cr(s, e.fromStyles);
        }
        _buildAnimation(t, e, i, r, s, o) {
          const a = e.triggerName,
            l = e.element,
            c = [],
            u = new Set(),
            d = new Set(),
            h = e.timelines.map((p) => {
              const m = p.element;
              u.add(m);
              const b = m[an];
              if (b && b.removedBeforeQueried)
                return new bs(p.duration, p.delay);
              const w = m !== l,
                v = (function bj(n) {
                  const t = [];
                  return GD(n, t), t;
                })((i.get(m) || hj).map((Ae) => Ae.getRealPlayer())).filter(
                  (Ae) => !!Ae.element && Ae.element === m
                ),
                M = s.get(m),
                T = o.get(m),
                $ = vD(0, this._normalizer, 0, p.keyframes, M, T),
                Me = this._buildPlayer(p, $, v);
              if ((p.subTimeline && r && d.add(m), w)) {
                const Ae = new tp(t, a, m);
                Ae.setRealPlayer(Me), c.push(Ae);
              }
              return Me;
            });
          c.forEach((p) => {
            Ht(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function gj(n, t, e) {
                  let i;
                  if (n instanceof Map) {
                    if (((i = n.get(t)), i)) {
                      if (i.length) {
                        const r = i.indexOf(e);
                        i.splice(r, 1);
                      }
                      0 == i.length && n.delete(t);
                    }
                  } else if (((i = n[t]), i)) {
                    if (i.length) {
                      const r = i.indexOf(e);
                      i.splice(r, 1);
                    }
                    0 == i.length && delete n[t];
                  }
                  return i;
                })(this.playersByQueriedElement, p.element, p)
              );
          }),
            u.forEach((p) => ln(p, SD));
          const f = Mi(h);
          return (
            f.onDestroy(() => {
              u.forEach((p) => ws(p, SD)), Un(l, e.toStyles);
            }),
            d.forEach((p) => {
              Ht(r, p, []).push(f);
            }),
            f
          );
        }
        _buildPlayer(t, e, i) {
          return e.length > 0
            ? this.driver.animate(
                t.element,
                e,
                t.duration,
                t.delay,
                t.easing,
                i
              )
            : new bs(t.duration, t.delay);
        }
      }
      class tp {
        constructor(t, e, i) {
          (this.namespaceId = t),
            (this.triggerName = e),
            (this.element = i),
            (this._player = new bs()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = {}),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(t) {
          this._containsRealPlayer ||
            ((this._player = t),
            Object.keys(this._queuedCallbacks).forEach((e) => {
              this._queuedCallbacks[e].forEach((i) => Rf(t, e, void 0, i));
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(t.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(t) {
          this.totalTime = t;
        }
        syncPlayerEvents(t) {
          const e = this._player;
          e.triggerCallback && t.onStart(() => e.triggerCallback("start")),
            t.onDone(() => this.finish()),
            t.onDestroy(() => this.destroy());
        }
        _queueEvent(t, e) {
          Ht(this._queuedCallbacks, t, []).push(e);
        }
        onDone(t) {
          this.queued && this._queueEvent("done", t), this._player.onDone(t);
        }
        onStart(t) {
          this.queued && this._queueEvent("start", t), this._player.onStart(t);
        }
        onDestroy(t) {
          this.queued && this._queueEvent("destroy", t),
            this._player.onDestroy(t);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(t) {
          this.queued || this._player.setPosition(t);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(t) {
          const e = this._player;
          e.triggerCallback && e.triggerCallback(t);
        }
      }
      function Ec(n) {
        return n && 1 === n.nodeType;
      }
      function UD(n, t) {
        const e = n.style.display;
        return (n.style.display = null != t ? t : "none"), e;
      }
      function $D(n, t, e, i, r) {
        const s = [];
        e.forEach((l) => s.push(UD(l)));
        const o = [];
        i.forEach((l, c) => {
          const u = {};
          l.forEach((d) => {
            const h = (u[d] = t.computeStyle(c, d, r));
            (!h || 0 == h.length) && ((c[an] = fj), o.push(c));
          }),
            n.set(c, u);
        });
        let a = 0;
        return e.forEach((l) => UD(l, s[a++])), o;
      }
      function zD(n, t) {
        const e = new Map();
        if ((n.forEach((a) => e.set(a, [])), 0 == t.length)) return e;
        const r = new Set(t),
          s = new Map();
        function o(a) {
          if (!a) return 1;
          let l = s.get(a);
          if (l) return l;
          const c = a.parentNode;
          return (l = e.has(c) ? c : r.has(c) ? 1 : o(c)), s.set(a, l), l;
        }
        return (
          t.forEach((a) => {
            const l = o(a);
            1 !== l && e.get(l).push(a);
          }),
          e
        );
      }
      function ln(n, t) {
        var e;
        null === (e = n.classList) || void 0 === e || e.add(t);
      }
      function ws(n, t) {
        var e;
        null === (e = n.classList) || void 0 === e || e.remove(t);
      }
      function vj(n, t, e) {
        Mi(e).onDone(() => n.processLeaveNode(t));
      }
      function GD(n, t) {
        for (let e = 0; e < n.length; e++) {
          const i = n[e];
          i instanceof _D ? GD(i.players, t) : t.push(i);
        }
      }
      function WD(n, t, e) {
        const i = e.get(n);
        if (!i) return !1;
        let r = t.get(n);
        return r ? i.forEach((s) => r.add(s)) : t.set(n, i), e.delete(n), !0;
      }
      class Mc {
        constructor(t, e, i) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = i),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (r, s) => {}),
            (this._transitionEngine = new mj(t, e, i)),
            (this._timelineEngine = new aj(t, e, i)),
            (this._transitionEngine.onRemovalComplete = (r, s) =>
              this.onRemovalComplete(r, s));
        }
        registerTrigger(t, e, i, r, s) {
          const o = t + "-" + r;
          let a = this._triggerCache[o];
          if (!a) {
            const l = [],
              c = Gf(this._driver, s, l);
            if (l.length)
              throw new Error(
                `The animation trigger "${r}" has failed to build due to the following errors:\n - ${l.join(
                  "\n - "
                )}`
              );
            (a = (function ij(n, t, e) {
              return new rj(n, t, e);
            })(r, c, this._normalizer)),
              (this._triggerCache[o] = a);
          }
          this._transitionEngine.registerTrigger(e, r, a);
        }
        register(t, e) {
          this._transitionEngine.register(t, e);
        }
        destroy(t, e) {
          this._transitionEngine.destroy(t, e);
        }
        onInsert(t, e, i, r) {
          this._transitionEngine.insertNode(t, e, i, r);
        }
        onRemove(t, e, i, r) {
          this._transitionEngine.removeNode(t, e, r || !1, i);
        }
        disableAnimations(t, e) {
          this._transitionEngine.markElementAsDisabled(t, e);
        }
        process(t, e, i, r) {
          if ("@" == i.charAt(0)) {
            const [s, o] = bD(i);
            this._timelineEngine.command(s, e, o, r);
          } else this._transitionEngine.trigger(t, e, i, r);
        }
        listen(t, e, i, r, s) {
          if ("@" == i.charAt(0)) {
            const [o, a] = bD(i);
            return this._timelineEngine.listen(o, e, a, s);
          }
          return this._transitionEngine.listen(t, e, i, r, s);
        }
        flush(t = -1) {
          this._transitionEngine.flush(t);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      function qD(n, t) {
        let e = null,
          i = null;
        return (
          Array.isArray(t) && t.length
            ? ((e = np(t[0])), t.length > 1 && (i = np(t[t.length - 1])))
            : t && (e = np(t)),
          e || i ? new wj(n, e, i) : null
        );
      }
      let wj = (() => {
        class n {
          constructor(e, i, r) {
            (this._element = e),
              (this._startStyles = i),
              (this._endStyles = r),
              (this._state = 0);
            let s = n.initialStylesByElement.get(e);
            s || n.initialStylesByElement.set(e, (s = {})),
              (this._initialStyles = s);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Un(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Un(this._element, this._initialStyles),
                this._endStyles &&
                  (Un(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (n.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (cr(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (cr(this._element, this._endStyles),
                  (this._endStyles = null)),
                Un(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (n.initialStylesByElement = new WeakMap()), n;
      })();
      function np(n) {
        let t = null;
        const e = Object.keys(n);
        for (let i = 0; i < e.length; i++) {
          const r = e[i];
          Dj(r) && ((t = t || {}), (t[r] = n[r]));
        }
        return t;
      }
      function Dj(n) {
        return "display" === n || "position" === n;
      }
      const KD = "animation",
        QD = "animationend";
      class Sj {
        constructor(t, e, i, r, s, o, a) {
          (this._element = t),
            (this._name = e),
            (this._duration = i),
            (this._delay = r),
            (this._easing = s),
            (this._fillMode = o),
            (this._onDoneFn = a),
            (this._finished = !1),
            (this._destroyed = !1),
            (this._startTime = 0),
            (this._position = 0),
            (this._eventFn = (l) => this._handleCallback(l));
        }
        apply() {
          (function xj(n, t) {
            const e = rp(n, "").trim();
            let i = 0;
            e.length &&
              ((i =
                (function Tj(n, t) {
                  let e = 0;
                  for (let i = 0; i < n.length; i++) n.charAt(i) === t && e++;
                  return e;
                })(e, ",") + 1),
              (t = `${e}, ${t}`)),
              Sc(n, "", t);
          })(
            this._element,
            `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`
          ),
            XD(this._element, this._eventFn, !1),
            (this._startTime = Date.now());
        }
        pause() {
          YD(this._element, this._name, "paused");
        }
        resume() {
          YD(this._element, this._name, "running");
        }
        setPosition(t) {
          const e = ZD(this._element, this._name);
          (this._position = t * this._duration),
            Sc(this._element, "Delay", `-${this._position}ms`, e);
        }
        getPosition() {
          return this._position;
        }
        _handleCallback(t) {
          const e = t._ngTestManualTimestamp || Date.now(),
            i = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
          t.animationName == this._name &&
            Math.max(e - this._startTime, 0) >= this._delay &&
            i >= this._duration &&
            this.finish();
        }
        finish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFn(),
            XD(this._element, this._eventFn, !0));
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.finish(),
            (function Aj(n, t) {
              const i = rp(n, "").split(","),
                r = ip(i, t);
              r >= 0 && (i.splice(r, 1), Sc(n, "", i.join(",")));
            })(this._element, this._name));
        }
      }
      function YD(n, t, e) {
        Sc(n, "PlayState", e, ZD(n, t));
      }
      function ZD(n, t) {
        const e = rp(n, "");
        return e.indexOf(",") > 0 ? ip(e.split(","), t) : ip([e], t);
      }
      function ip(n, t) {
        for (let e = 0; e < n.length; e++) if (n[e].indexOf(t) >= 0) return e;
        return -1;
      }
      function XD(n, t, e) {
        e ? n.removeEventListener(QD, t) : n.addEventListener(QD, t);
      }
      function Sc(n, t, e, i) {
        const r = KD + t;
        if (null != i) {
          const s = n.style[r];
          if (s.length) {
            const o = s.split(",");
            (o[i] = e), (e = o.join(","));
          }
        }
        n.style[r] = e;
      }
      function rp(n, t) {
        return n.style[KD + t] || "";
      }
      class JD {
        constructor(t, e, i, r, s, o, a, l) {
          (this.element = t),
            (this.keyframes = e),
            (this.animationName = i),
            (this._duration = r),
            (this._delay = s),
            (this._finalStyles = a),
            (this._specialStyles = l),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this.currentSnapshot = {}),
            (this._state = 0),
            (this.easing = o || "linear"),
            (this.totalTime = r + s),
            this._buildStyler();
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        destroy() {
          this.init(),
            !(this._state >= 4) &&
              ((this._state = 4),
              this._styler.destroy(),
              this._flushStartFns(),
              this._flushDoneFns(),
              this._specialStyles && this._specialStyles.destroy(),
              this._onDestroyFns.forEach((t) => t()),
              (this._onDestroyFns = []));
        }
        _flushDoneFns() {
          this._onDoneFns.forEach((t) => t()), (this._onDoneFns = []);
        }
        _flushStartFns() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        finish() {
          this.init(),
            !(this._state >= 3) &&
              ((this._state = 3),
              this._styler.finish(),
              this._flushStartFns(),
              this._specialStyles && this._specialStyles.finish(),
              this._flushDoneFns());
        }
        setPosition(t) {
          this._styler.setPosition(t);
        }
        getPosition() {
          return this._styler.getPosition();
        }
        hasStarted() {
          return this._state >= 2;
        }
        init() {
          this._state >= 1 ||
            ((this._state = 1),
            this._styler.apply(),
            this._delay && this._styler.pause());
        }
        play() {
          this.init(),
            this.hasStarted() ||
              (this._flushStartFns(),
              (this._state = 2),
              this._specialStyles && this._specialStyles.start()),
            this._styler.resume();
        }
        pause() {
          this.init(), this._styler.pause();
        }
        restart() {
          this.reset(), this.play();
        }
        reset() {
          (this._state = 0),
            this._styler.destroy(),
            this._buildStyler(),
            this._styler.apply();
        }
        _buildStyler() {
          this._styler = new Sj(
            this.element,
            this.animationName,
            this._duration,
            this._delay,
            this.easing,
            "forwards",
            () => this.finish()
          );
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((i) => i()), (e.length = 0);
        }
        beforeDestroy() {
          this.init();
          const t = {};
          if (this.hasStarted()) {
            const e = this._state >= 3;
            Object.keys(this._finalStyles).forEach((i) => {
              "offset" != i &&
                (t[i] = e ? this._finalStyles[i] : zf(this.element, i));
            });
          }
          this.currentSnapshot = t;
        }
      }
      class kj extends bs {
        constructor(t, e) {
          super(),
            (this.element = t),
            (this._startingStyles = {}),
            (this.__initialized = !1),
            (this._styles = DD(e));
        }
        init() {
          this.__initialized ||
            !this._startingStyles ||
            ((this.__initialized = !0),
            Object.keys(this._styles).forEach((t) => {
              this._startingStyles[t] = this.element.style[t];
            }),
            super.init());
        }
        play() {
          !this._startingStyles ||
            (this.init(),
            Object.keys(this._styles).forEach((t) =>
              this.element.style.setProperty(t, this._styles[t])
            ),
            super.play());
        }
        destroy() {
          !this._startingStyles ||
            (Object.keys(this._startingStyles).forEach((t) => {
              const e = this._startingStyles[t];
              e
                ? this.element.style.setProperty(t, e)
                : this.element.style.removeProperty(t);
            }),
            (this._startingStyles = null),
            super.destroy());
        }
      }
      class tE {
        constructor() {
          this._count = 0;
        }
        validateStyleProperty(t) {
          return Pf(t);
        }
        matchesElement(t, e) {
          return !1;
        }
        containsElement(t, e) {
          return Nf(t, e);
        }
        query(t, e, i) {
          return Lf(t, e, i);
        }
        computeStyle(t, e, i) {
          return window.getComputedStyle(t)[e];
        }
        buildKeyframeElement(t, e, i) {
          i = i.map((a) => DD(a));
          let r = `@keyframes ${e} {\n`,
            s = "";
          i.forEach((a) => {
            s = " ";
            const l = parseFloat(a.offset);
            (r += `${s}${100 * l}% {\n`),
              (s += " "),
              Object.keys(a).forEach((c) => {
                const u = a[c];
                switch (c) {
                  case "offset":
                    return;
                  case "easing":
                    return void (
                      u && (r += `${s}animation-timing-function: ${u};\n`)
                    );
                  default:
                    return void (r += `${s}${c}: ${u};\n`);
                }
              }),
              (r += `${s}}\n`);
          }),
            (r += "}\n");
          const o = document.createElement("style");
          return (o.textContent = r), o;
        }
        animate(t, e, i, r, s, o = [], a) {
          const l = o.filter((b) => b instanceof JD),
            c = {};
          RD(i, r) &&
            l.forEach((b) => {
              let w = b.currentSnapshot;
              Object.keys(w).forEach((v) => (c[v] = w[v]));
            });
          const u = (function Pj(n) {
            let t = {};
            return (
              n &&
                (Array.isArray(n) ? n : [n]).forEach((i) => {
                  Object.keys(i).forEach((r) => {
                    "offset" == r || "easing" == r || (t[r] = i[r]);
                  });
                }),
              t
            );
          })((e = kD(t, e, c)));
          if (0 == i) return new kj(t, u);
          const d = "gen_css_kf_" + this._count++,
            h = this.buildKeyframeElement(t, d, e);
          (function Fj(n) {
            var t;
            const e =
              null === (t = n.getRootNode) || void 0 === t ? void 0 : t.call(n);
            return "undefined" != typeof ShadowRoot && e instanceof ShadowRoot
              ? e
              : document.head;
          })(t).appendChild(h);
          const p = qD(t, e),
            m = new JD(t, e, d, i, r, s, u, p);
          return (
            m.onDestroy(() =>
              (function Nj(n) {
                n.parentNode.removeChild(n);
              })(h)
            ),
            m
          );
        }
      }
      class iE {
        constructor(t, e, i, r) {
          (this.element = t),
            (this.keyframes = e),
            (this.options = i),
            (this._specialStyles = r),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = {}),
            (this._duration = i.duration),
            (this._delay = i.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const t = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            t,
            this.options
          )),
            (this._finalKeyframe = t.length ? t[t.length - 1] : {}),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _triggerWebAnimation(t, e, i) {
          return t.animate(e, i);
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((t) => t()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        setPosition(t) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = t * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const t = {};
          if (this.hasStarted()) {
            const e = this._finalKeyframe;
            Object.keys(e).forEach((i) => {
              "offset" != i &&
                (t[i] = this._finished ? e[i] : zf(this.element, i));
            });
          }
          this.currentSnapshot = t;
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach((i) => i()), (e.length = 0);
        }
      }
      class Lj {
        constructor() {
          (this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
            rE().toString()
          )),
            (this._cssKeyframesDriver = new tE());
        }
        validateStyleProperty(t) {
          return Pf(t);
        }
        matchesElement(t, e) {
          return !1;
        }
        containsElement(t, e) {
          return Nf(t, e);
        }
        query(t, e, i) {
          return Lf(t, e, i);
        }
        computeStyle(t, e, i) {
          return window.getComputedStyle(t)[e];
        }
        overrideWebAnimationsSupport(t) {
          this._isNativeImpl = t;
        }
        animate(t, e, i, r, s, o = [], a) {
          if (!a && !this._isNativeImpl)
            return this._cssKeyframesDriver.animate(t, e, i, r, s, o);
          const u = {
            duration: i,
            delay: r,
            fill: 0 == r ? "both" : "forwards",
          };
          s && (u.easing = s);
          const d = {},
            h = o.filter((p) => p instanceof iE);
          RD(i, r) &&
            h.forEach((p) => {
              let m = p.currentSnapshot;
              Object.keys(m).forEach((b) => (d[b] = m[b]));
            });
          const f = qD(t, (e = kD(t, (e = e.map((p) => Si(p, !1))), d)));
          return new iE(t, e, u, f);
        }
      }
      function rE() {
        return (yD() && Element.prototype.animate) || {};
      }
      let Bj = (() => {
        class n extends pD {
          constructor(e, i) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = e.createRenderer(i.body, {
                id: "0",
                encapsulation: un.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(e) {
            const i = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const r = Array.isArray(e) ? mD(e) : e;
            return (
              sE(this._renderer, null, i, "register", [r]),
              new jj(i, this._renderer)
            );
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(po), C(Z));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class jj extends class MB {} {
        constructor(t, e) {
          super(), (this._id = t), (this._renderer = e);
        }
        create(t, e) {
          return new Hj(this._id, t, e || {}, this._renderer);
        }
      }
      class Hj {
        constructor(t, e, i, r) {
          (this.id = t),
            (this.element = e),
            (this._renderer = r),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", i);
        }
        _listen(t, e) {
          return this._renderer.listen(this.element, `@@${this.id}:${t}`, e);
        }
        _command(t, ...e) {
          return sE(this._renderer, this.element, this.id, t, e);
        }
        onDone(t) {
          this._listen("done", t);
        }
        onStart(t) {
          this._listen("start", t);
        }
        onDestroy(t) {
          this._listen("destroy", t);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset"), (this._started = !1);
        }
        setPosition(t) {
          this._command("setPosition", t);
        }
        getPosition() {
          var t, e;
          return null !==
            (e =
              null === (t = this._renderer.engine.players[+this.id]) ||
              void 0 === t
                ? void 0
                : t.getPosition()) && void 0 !== e
            ? e
            : 0;
        }
      }
      function sE(n, t, e, i, r) {
        return n.setProperty(t, `@@${e}:${i}`, r);
      }
      const oE = "@.disabled";
      let Uj = (() => {
        class n {
          constructor(e, i, r) {
            (this.delegate = e),
              (this.engine = i),
              (this._zone = r),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (i.onRemovalComplete = (s, o) => {
                const a = null == o ? void 0 : o.parentNode(s);
                a && o.removeChild(a, s);
              });
          }
          createRenderer(e, i) {
            const s = this.delegate.createRenderer(e, i);
            if (!(e && i && i.data && i.data.animation)) {
              let u = this._rendererCache.get(s);
              return (
                u ||
                  ((u = new aE("", s, this.engine)),
                  this._rendererCache.set(s, u)),
                u
              );
            }
            const o = i.id,
              a = i.id + "-" + this._currentId;
            this._currentId++, this.engine.register(a, e);
            const l = (u) => {
              Array.isArray(u)
                ? u.forEach(l)
                : this.engine.registerTrigger(o, a, e, u.name, u);
            };
            return i.data.animation.forEach(l), new $j(this, a, s, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(e, i, r) {
            e >= 0 && e < this._microtaskId
              ? this._zone.run(() => i(r))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((s) => {
                        const [o, a] = s;
                        o(a);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([i, r]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(po), C(Mc), C(re));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class aE {
        constructor(t, e, i) {
          (this.namespaceId = t),
            (this.delegate = e),
            (this.engine = i),
            (this.destroyNode = this.delegate.destroyNode
              ? (r) => e.destroyNode(r)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(t, e) {
          return this.delegate.createElement(t, e);
        }
        createComment(t) {
          return this.delegate.createComment(t);
        }
        createText(t) {
          return this.delegate.createText(t);
        }
        appendChild(t, e) {
          this.delegate.appendChild(t, e),
            this.engine.onInsert(this.namespaceId, e, t, !1);
        }
        insertBefore(t, e, i, r = !0) {
          this.delegate.insertBefore(t, e, i),
            this.engine.onInsert(this.namespaceId, e, t, r);
        }
        removeChild(t, e, i) {
          this.engine.onRemove(this.namespaceId, e, this.delegate, i);
        }
        selectRootElement(t, e) {
          return this.delegate.selectRootElement(t, e);
        }
        parentNode(t) {
          return this.delegate.parentNode(t);
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t);
        }
        setAttribute(t, e, i, r) {
          this.delegate.setAttribute(t, e, i, r);
        }
        removeAttribute(t, e, i) {
          this.delegate.removeAttribute(t, e, i);
        }
        addClass(t, e) {
          this.delegate.addClass(t, e);
        }
        removeClass(t, e) {
          this.delegate.removeClass(t, e);
        }
        setStyle(t, e, i, r) {
          this.delegate.setStyle(t, e, i, r);
        }
        removeStyle(t, e, i) {
          this.delegate.removeStyle(t, e, i);
        }
        setProperty(t, e, i) {
          "@" == e.charAt(0) && e == oE
            ? this.disableAnimations(t, !!i)
            : this.delegate.setProperty(t, e, i);
        }
        setValue(t, e) {
          this.delegate.setValue(t, e);
        }
        listen(t, e, i) {
          return this.delegate.listen(t, e, i);
        }
        disableAnimations(t, e) {
          this.engine.disableAnimations(t, e);
        }
      }
      class $j extends aE {
        constructor(t, e, i, r) {
          super(e, i, r), (this.factory = t), (this.namespaceId = e);
        }
        setProperty(t, e, i) {
          "@" == e.charAt(0)
            ? "." == e.charAt(1) && e == oE
              ? this.disableAnimations(t, (i = void 0 === i || !!i))
              : this.engine.process(this.namespaceId, t, e.substr(1), i)
            : this.delegate.setProperty(t, e, i);
        }
        listen(t, e, i) {
          if ("@" == e.charAt(0)) {
            const r = (function zj(n) {
              switch (n) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return n;
              }
            })(t);
            let s = e.substr(1),
              o = "";
            return (
              "@" != s.charAt(0) &&
                ([s, o] = (function Gj(n) {
                  const t = n.indexOf(".");
                  return [n.substring(0, t), n.substr(t + 1)];
                })(s)),
              this.engine.listen(this.namespaceId, r, s, o, (a) => {
                this.factory.scheduleListenerCallback(a._data || -1, i, a);
              })
            );
          }
          return this.delegate.listen(t, e, i);
        }
      }
      let Wj = (() => {
        class n extends Mc {
          constructor(e, i, r) {
            super(e.body, i, r);
          }
          ngOnDestroy() {
            this.flush();
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(Z), C(Vf), C(Yf));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const xi = new A("AnimationModuleType"),
        lE = [
          { provide: pD, useClass: Bj },
          {
            provide: Yf,
            useFactory: function Kj() {
              return new XB();
            },
          },
          { provide: Mc, useClass: Wj },
          {
            provide: po,
            useFactory: function Qj(n, t, e) {
              return new Uj(n, t, e);
            },
            deps: [Ol, Mc, re],
          },
        ],
        cE = [
          {
            provide: Vf,
            useFactory: function qj() {
              return (function Vj() {
                return "function" == typeof rE();
              })()
                ? new Lj()
                : new tE();
            },
          },
          { provide: xi, useValue: "BrowserAnimations" },
          ...lE,
        ],
        Yj = [
          { provide: Vf, useClass: ED },
          { provide: xi, useValue: "NoopAnimations" },
          ...lE,
        ];
      let Zj = (() => {
          class n {
            static withConfig(e) {
              return { ngModule: n, providers: e.disableAnimations ? Yj : cE };
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({ providers: cE, imports: [_C] })),
            n
          );
        })(),
        dE = (() => {
          class n {}
          return (
            (n.STANDARD_CURVE = "cubic-bezier(0.4,0.0,0.2,1)"),
            (n.DECELERATION_CURVE = "cubic-bezier(0.0,0.0,0.2,1)"),
            (n.ACCELERATION_CURVE = "cubic-bezier(0.4,0.0,1,1)"),
            (n.SHARP_CURVE = "cubic-bezier(0.4,0.0,0.6,1)"),
            n
          );
        })(),
        hE = (() => {
          class n {}
          return (
            (n.COMPLEX = "375ms"),
            (n.ENTERING = "225ms"),
            (n.EXITING = "195ms"),
            n
          );
        })();
      const Jj = new A("mat-sanity-checks", {
        providedIn: "root",
        factory: function Xj() {
          return !0;
        },
      });
      let Fe = (() => {
        class n {
          constructor(e, i, r) {
            (this._sanityChecks = i),
              (this._document = r),
              (this._hasDoneGlobalChecks = !1),
              e._applyBodyHighContrastModeCssClasses(),
              this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0);
          }
          _checkIsEnabled(e) {
            return (
              !wf() &&
              ("boolean" == typeof this._sanityChecks
                ? this._sanityChecks
                : !!this._sanityChecks[e])
            );
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(EB), C(Jj, 8), C(Z));
          }),
          (n.ɵmod = de({ type: n })),
          (n.ɵinj = le({ imports: [[$o], $o] })),
          n
        );
      })();
      function fE(n) {
        return class extends n {
          constructor(...t) {
            super(...t), (this._disabled = !1);
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(t) {
            this._disabled = at(t);
          }
        };
      }
      function pE(n, t) {
        return class extends n {
          constructor(...e) {
            super(...e), (this.defaultColor = t), (this.color = t);
          }
          get color() {
            return this._color;
          }
          set color(e) {
            const i = e || this.defaultColor;
            i !== this._color &&
              (this._color &&
                this._elementRef.nativeElement.classList.remove(
                  `mat-${this._color}`
                ),
              i && this._elementRef.nativeElement.classList.add(`mat-${i}`),
              (this._color = i));
          }
        };
      }
      function Yo(n) {
        return class extends n {
          constructor(...t) {
            super(...t), (this._disableRipple = !1);
          }
          get disableRipple() {
            return this._disableRipple;
          }
          set disableRipple(t) {
            this._disableRipple = at(t);
          }
        };
      }
      function e2(n, t = 0) {
        return class extends n {
          constructor(...e) {
            super(...e), (this._tabIndex = t), (this.defaultTabIndex = t);
          }
          get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
          }
          set tabIndex(e) {
            this._tabIndex =
              null != e
                ? (function KL(n, t = 0) {
                    return (function QL(n) {
                      return !isNaN(parseFloat(n)) && !isNaN(Number(n));
                    })(n)
                      ? Number(n)
                      : t;
                  })(e)
                : this.defaultTabIndex;
          }
        };
      }
      let mE = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵdir = k({
            type: n,
            selectors: [
              ["", "mat-line", ""],
              ["", "matLine", ""],
            ],
            hostAttrs: [1, "mat-line"],
          })),
          n
        );
      })();
      function Zo(n, t, e) {
        n.nativeElement.classList.toggle(t, e);
      }
      let _E = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵmod = de({ type: n })),
          (n.ɵinj = le({ imports: [[Fe], Fe] })),
          n
        );
      })();
      class n2 {
        constructor(t, e, i) {
          (this._renderer = t),
            (this.element = e),
            (this.config = i),
            (this.state = 3);
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this);
        }
      }
      const yE = { enterDuration: 225, exitDuration: 150 },
        sp = bf({ passive: !0 }),
        vE = ["mousedown", "touchstart"],
        bE = ["mouseup", "mouseleave", "touchend", "touchcancel"];
      class s2 {
        constructor(t, e, i, r) {
          (this._target = t),
            (this._ngZone = e),
            (this._isPointerDown = !1),
            (this._activeRipples = new Set()),
            (this._pointerUpEventsRegistered = !1),
            r.isBrowser && (this._containerElement = ms(i));
        }
        fadeInRipple(t, e, i = {}) {
          const r = (this._containerRect =
              this._containerRect ||
              this._containerElement.getBoundingClientRect()),
            s = Object.assign(Object.assign({}, yE), i.animation);
          i.centered &&
            ((t = r.left + r.width / 2), (e = r.top + r.height / 2));
          const o =
              i.radius ||
              (function a2(n, t, e) {
                const i = Math.max(Math.abs(n - e.left), Math.abs(n - e.right)),
                  r = Math.max(Math.abs(t - e.top), Math.abs(t - e.bottom));
                return Math.sqrt(i * i + r * r);
              })(t, e, r),
            a = t - r.left,
            l = e - r.top,
            c = s.enterDuration,
            u = document.createElement("div");
          u.classList.add("mat-ripple-element"),
            (u.style.left = a - o + "px"),
            (u.style.top = l - o + "px"),
            (u.style.height = 2 * o + "px"),
            (u.style.width = 2 * o + "px"),
            null != i.color && (u.style.backgroundColor = i.color),
            (u.style.transitionDuration = `${c}ms`),
            this._containerElement.appendChild(u),
            (function o2(n) {
              window.getComputedStyle(n).getPropertyValue("opacity");
            })(u),
            (u.style.transform = "scale(1)");
          const d = new n2(this, u, i);
          return (
            (d.state = 0),
            this._activeRipples.add(d),
            i.persistent || (this._mostRecentTransientRipple = d),
            this._runTimeoutOutsideZone(() => {
              const h = d === this._mostRecentTransientRipple;
              (d.state = 1),
                !i.persistent && (!h || !this._isPointerDown) && d.fadeOut();
            }, c),
            d
          );
        }
        fadeOutRipple(t) {
          const e = this._activeRipples.delete(t);
          if (
            (t === this._mostRecentTransientRipple &&
              (this._mostRecentTransientRipple = null),
            this._activeRipples.size || (this._containerRect = null),
            !e)
          )
            return;
          const i = t.element,
            r = Object.assign(Object.assign({}, yE), t.config.animation);
          (i.style.transitionDuration = `${r.exitDuration}ms`),
            (i.style.opacity = "0"),
            (t.state = 2),
            this._runTimeoutOutsideZone(() => {
              (t.state = 3), i.remove();
            }, r.exitDuration);
        }
        fadeOutAll() {
          this._activeRipples.forEach((t) => t.fadeOut());
        }
        fadeOutAllNonPersistent() {
          this._activeRipples.forEach((t) => {
            t.config.persistent || t.fadeOut();
          });
        }
        setupTriggerEvents(t) {
          const e = ms(t);
          !e ||
            e === this._triggerElement ||
            (this._removeTriggerEvents(),
            (this._triggerElement = e),
            this._registerEvents(vE));
        }
        handleEvent(t) {
          "mousedown" === t.type
            ? this._onMousedown(t)
            : "touchstart" === t.type
            ? this._onTouchStart(t)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._registerEvents(bE),
              (this._pointerUpEventsRegistered = !0));
        }
        _onMousedown(t) {
          const e = cD(t),
            i =
              this._lastTouchStartEvent &&
              Date.now() < this._lastTouchStartEvent + 800;
          !this._target.rippleDisabled &&
            !e &&
            !i &&
            ((this._isPointerDown = !0),
            this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
        }
        _onTouchStart(t) {
          if (!this._target.rippleDisabled && !uD(t)) {
            (this._lastTouchStartEvent = Date.now()),
              (this._isPointerDown = !0);
            const e = t.changedTouches;
            for (let i = 0; i < e.length; i++)
              this.fadeInRipple(
                e[i].clientX,
                e[i].clientY,
                this._target.rippleConfig
              );
          }
        }
        _onPointerUp() {
          !this._isPointerDown ||
            ((this._isPointerDown = !1),
            this._activeRipples.forEach((t) => {
              !t.config.persistent &&
                (1 === t.state ||
                  (t.config.terminateOnPointerUp && 0 === t.state)) &&
                t.fadeOut();
            }));
        }
        _runTimeoutOutsideZone(t, e = 0) {
          this._ngZone.runOutsideAngular(() => setTimeout(t, e));
        }
        _registerEvents(t) {
          this._ngZone.runOutsideAngular(() => {
            t.forEach((e) => {
              this._triggerElement.addEventListener(e, this, sp);
            });
          });
        }
        _removeTriggerEvents() {
          this._triggerElement &&
            (vE.forEach((t) => {
              this._triggerElement.removeEventListener(t, this, sp);
            }),
            this._pointerUpEventsRegistered &&
              bE.forEach((t) => {
                this._triggerElement.removeEventListener(t, this, sp);
              }));
        }
      }
      const l2 = new A("mat-ripple-global-options");
      let Ac = (() => {
          class n {
            constructor(e, i, r, s, o) {
              (this._elementRef = e),
                (this._animationMode = o),
                (this.radius = 0),
                (this._disabled = !1),
                (this._isInitialized = !1),
                (this._globalOptions = s || {}),
                (this._rippleRenderer = new s2(this, i, e, r));
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(e) {
              e && this.fadeOutAllNonPersistent(),
                (this._disabled = e),
                this._setupTriggerEventsIfEnabled();
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement;
            }
            set trigger(e) {
              (this._trigger = e), this._setupTriggerEventsIfEnabled();
            }
            ngOnInit() {
              (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
            }
            ngOnDestroy() {
              this._rippleRenderer._removeTriggerEvents();
            }
            fadeOutAll() {
              this._rippleRenderer.fadeOutAll();
            }
            fadeOutAllNonPersistent() {
              this._rippleRenderer.fadeOutAllNonPersistent();
            }
            get rippleConfig() {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: Object.assign(
                  Object.assign(
                    Object.assign({}, this._globalOptions.animation),
                    "NoopAnimations" === this._animationMode
                      ? { enterDuration: 0, exitDuration: 0 }
                      : {}
                  ),
                  this.animation
                ),
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
              };
            }
            get rippleDisabled() {
              return this.disabled || !!this._globalOptions.disabled;
            }
            _setupTriggerEventsIfEnabled() {
              !this.disabled &&
                this._isInitialized &&
                this._rippleRenderer.setupTriggerEvents(this.trigger);
            }
            launch(e, i = 0, r) {
              return "number" == typeof e
                ? this._rippleRenderer.fadeInRipple(
                    e,
                    i,
                    Object.assign(Object.assign({}, this.rippleConfig), r)
                  )
                : this._rippleRenderer.fadeInRipple(
                    0,
                    0,
                    Object.assign(Object.assign({}, this.rippleConfig), e)
                  );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(y(_e), y(re), y(Dn), y(l2, 8), y(xi, 8));
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [
                ["", "mat-ripple", ""],
                ["", "matRipple", ""],
              ],
              hostAttrs: [1, "mat-ripple"],
              hostVars: 2,
              hostBindings: function (e, i) {
                2 & e && Je("mat-ripple-unbounded", i.unbounded);
              },
              inputs: {
                color: ["matRippleColor", "color"],
                unbounded: ["matRippleUnbounded", "unbounded"],
                centered: ["matRippleCentered", "centered"],
                radius: ["matRippleRadius", "radius"],
                animation: ["matRippleAnimation", "animation"],
                disabled: ["matRippleDisabled", "disabled"],
                trigger: ["matRippleTrigger", "trigger"],
              },
              exportAs: ["matRipple"],
            })),
            n
          );
        })(),
        CE = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({ imports: [[Fe], Fe] })),
            n
          );
        })(),
        wE = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({ imports: [[Fe]] })),
            n
          );
        })();
      const DE = new Set();
      let Ds,
        u2 = (() => {
          class n {
            constructor(e) {
              (this._platform = e),
                (this._matchMedia =
                  this._platform.isBrowser && window.matchMedia
                    ? window.matchMedia.bind(window)
                    : h2);
            }
            matchMedia(e) {
              return (
                (this._platform.WEBKIT || this._platform.BLINK) &&
                  (function d2(n) {
                    if (!DE.has(n))
                      try {
                        Ds ||
                          ((Ds = document.createElement("style")),
                          Ds.setAttribute("type", "text/css"),
                          document.head.appendChild(Ds)),
                          Ds.sheet &&
                            (Ds.sheet.insertRule(`@media ${n} {body{ }}`, 0),
                            DE.add(n));
                      } catch (t) {
                        console.error(t);
                      }
                  })(e),
                this._matchMedia(e)
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(C(Dn));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      function h2(n) {
        return {
          matches: "all" === n || "" === n,
          media: n,
          addListener: () => {},
          removeListener: () => {},
        };
      }
      let f2 = (() => {
        class n {
          constructor(e, i) {
            (this._mediaMatcher = e),
              (this._zone = i),
              (this._queries = new Map()),
              (this._destroySubject = new K());
          }
          ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete();
          }
          isMatched(e) {
            return EE(Vo(e)).some((r) => this._registerQuery(r).mql.matches);
          }
          observe(e) {
            let s = DC(EE(Vo(e)).map((o) => this._registerQuery(o).observable));
            return (
              (s = Pl(s.pipe(ze(1)), s.pipe(tD(1), eD(0)))),
              s.pipe(
                Q((o) => {
                  const a = { matches: !1, breakpoints: {} };
                  return (
                    o.forEach(({ matches: l, query: c }) => {
                      (a.matches = a.matches || l), (a.breakpoints[c] = l);
                    }),
                    a
                  );
                })
              )
            );
          }
          _registerQuery(e) {
            if (this._queries.has(e)) return this._queries.get(e);
            const i = this._mediaMatcher.matchMedia(e),
              s = {
                observable: new he((o) => {
                  const a = (l) => this._zone.run(() => o.next(l));
                  return (
                    i.addListener(a),
                    () => {
                      i.removeListener(a);
                    }
                  );
                }).pipe(
                  Xi(i),
                  Q(({ matches: o }) => ({ query: e, matches: o })),
                  oi(this._destroySubject)
                ),
                mql: i,
              };
            return this._queries.set(e, s), s;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(u2), C(re));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function EE(n) {
        return n
          .map((t) => t.split(","))
          .reduce((t, e) => t.concat(e))
          .map((t) => t.trim());
      }
      const Es_Medium = "(min-width: 960px) and (max-width: 1279.98px)",
        Es_Large = "(min-width: 1280px) and (max-width: 1919.98px)";
      function p2(n, t) {}
      const m2 = {
          bottomSheetState: qo("state", [
            Hn("void, hidden", St({ transform: "translateY(100%)" })),
            Hn("visible", St({ transform: "translateY(0%)" })),
            Ei(
              "visible => void, visible => hidden",
              lc([
                Di(`${hE.COMPLEX} ${dE.ACCELERATION_CURVE}`),
                uc("@*", cc(), { optional: !0 }),
              ])
            ),
            Ei(
              "void => visible",
              lc([
                Di(`${hE.EXITING} ${dE.DECELERATION_CURVE}`),
                uc("@*", cc(), { optional: !0 }),
              ])
            ),
          ]),
        },
        g2 = new A("MatBottomSheetData");
      class op {
        constructor() {
          (this.data = null),
            (this.hasBackdrop = !0),
            (this.disableClose = !1),
            (this.ariaLabel = null),
            (this.closeOnNavigation = !0),
            (this.autoFocus = "dialog"),
            (this.restoreFocus = !0);
        }
      }
      let _2 = (() => {
          class n extends rc {
            constructor(e, i, r, s, o, a, l, c) {
              super(),
                (this._elementRef = e),
                (this._changeDetectorRef = i),
                (this._focusTrapFactory = r),
                (this._interactivityChecker = s),
                (this._ngZone = o),
                (this.bottomSheetConfig = c),
                (this._animationState = "void"),
                (this._animationStateChanged = new ee()),
                (this._elementFocusedBeforeOpened = null),
                (this.attachDomPortal = (u) => (
                  this._validatePortalAttached(),
                  this._setPanelClass(),
                  this._savePreviouslyFocusedElement(),
                  this._portalOutlet.attachDomPortal(u)
                )),
                (this._document = l),
                (this._breakpointSubscription = a
                  .observe([Es_Medium, Es_Large, "(min-width: 1920px)"])
                  .subscribe(() => {
                    this._toggleClass(
                      "mat-bottom-sheet-container-medium",
                      a.isMatched(Es_Medium)
                    ),
                      this._toggleClass(
                        "mat-bottom-sheet-container-large",
                        a.isMatched(Es_Large)
                      ),
                      this._toggleClass(
                        "mat-bottom-sheet-container-xlarge",
                        a.isMatched("(min-width: 1920px)")
                      );
                  }));
            }
            attachComponentPortal(e) {
              return (
                this._validatePortalAttached(),
                this._setPanelClass(),
                this._savePreviouslyFocusedElement(),
                this._portalOutlet.attachComponentPortal(e)
              );
            }
            attachTemplatePortal(e) {
              return (
                this._validatePortalAttached(),
                this._setPanelClass(),
                this._savePreviouslyFocusedElement(),
                this._portalOutlet.attachTemplatePortal(e)
              );
            }
            enter() {
              this._destroyed ||
                ((this._animationState = "visible"),
                this._changeDetectorRef.detectChanges());
            }
            exit() {
              this._destroyed ||
                ((this._animationState = "hidden"),
                this._changeDetectorRef.markForCheck());
            }
            ngOnDestroy() {
              this._breakpointSubscription.unsubscribe(),
                (this._destroyed = !0);
            }
            _onAnimationDone(e) {
              "hidden" === e.toState
                ? this._restoreFocus()
                : "visible" === e.toState && this._trapFocus(),
                this._animationStateChanged.emit(e);
            }
            _onAnimationStart(e) {
              this._animationStateChanged.emit(e);
            }
            _toggleClass(e, i) {
              this._elementRef.nativeElement.classList.toggle(e, i);
            }
            _validatePortalAttached() {
              this._portalOutlet.hasAttached();
            }
            _setPanelClass() {
              this._elementRef.nativeElement.classList.add(
                ...Vo(this.bottomSheetConfig.panelClass || [])
              );
            }
            _forceFocus(e, i) {
              this._interactivityChecker.isFocusable(e) ||
                ((e.tabIndex = -1),
                this._ngZone.runOutsideAngular(() => {
                  const r = () => {
                    e.removeEventListener("blur", r),
                      e.removeEventListener("mousedown", r),
                      e.removeAttribute("tabindex");
                  };
                  e.addEventListener("blur", r),
                    e.addEventListener("mousedown", r);
                })),
                e.focus(i);
            }
            _focusByCssSelector(e, i) {
              let r = this._elementRef.nativeElement.querySelector(e);
              r && this._forceFocus(r, i);
            }
            _trapFocus() {
              const e = this._elementRef.nativeElement;
              switch (
                (this._focusTrap ||
                  (this._focusTrap = this._focusTrapFactory.create(e)),
                this.bottomSheetConfig.autoFocus)
              ) {
                case !1:
                case "dialog":
                  const i = _s();
                  i !== e && !e.contains(i) && e.focus();
                  break;
                case !0:
                case "first-tabbable":
                  this._focusTrap.focusInitialElementWhenReady();
                  break;
                case "first-heading":
                  this._focusByCssSelector(
                    'h1, h2, h3, h4, h5, h6, [role="heading"]'
                  );
                  break;
                default:
                  this._focusByCssSelector(this.bottomSheetConfig.autoFocus);
              }
            }
            _restoreFocus() {
              const e = this._elementFocusedBeforeOpened;
              if (
                this.bottomSheetConfig.restoreFocus &&
                e &&
                "function" == typeof e.focus
              ) {
                const i = _s(),
                  r = this._elementRef.nativeElement;
                (!i || i === this._document.body || i === r || r.contains(i)) &&
                  e.focus();
              }
              this._focusTrap && this._focusTrap.destroy();
            }
            _savePreviouslyFocusedElement() {
              (this._elementFocusedBeforeOpened = _s()),
                this._elementRef.nativeElement.focus &&
                  this._ngZone.runOutsideAngular(() => {
                    Promise.resolve().then(() =>
                      this._elementRef.nativeElement.focus()
                    );
                  });
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                y(_e),
                y(tn),
                y(lD),
                y(xf),
                y(re),
                y(f2),
                y(Z, 8),
                y(op)
              );
            }),
            (n.ɵcmp = ye({
              type: n,
              selectors: [["mat-bottom-sheet-container"]],
              viewQuery: function (e, i) {
                if ((1 & e && is(Go, 7), 2 & e)) {
                  let r;
                  et((r = tt())) && (i._portalOutlet = r.first);
                }
              },
              hostAttrs: [
                "tabindex",
                "-1",
                "role",
                "dialog",
                "aria-modal",
                "true",
                1,
                "mat-bottom-sheet-container",
              ],
              hostVars: 2,
              hostBindings: function (e, i) {
                1 & e &&
                  el("@state.start", function (s) {
                    return i._onAnimationStart(s);
                  })("@state.done", function (s) {
                    return i._onAnimationDone(s);
                  }),
                  2 & e &&
                    (qe(
                      "aria-label",
                      null == i.bottomSheetConfig
                        ? null
                        : i.bottomSheetConfig.ariaLabel
                    ),
                    nl("@state", i._animationState));
              },
              features: [q],
              decls: 1,
              vars: 0,
              consts: [["cdkPortalOutlet", ""]],
              template: function (e, i) {
                1 & e && Pn(0, p2, 0, 0, "ng-template", 0);
              },
              directives: [Go],
              styles: [
                ".mat-bottom-sheet-container{padding:8px 16px;min-width:100vw;box-sizing:border-box;display:block;outline:0;max-height:80vh;overflow:auto}.cdk-high-contrast-active .mat-bottom-sheet-container{outline:1px solid}.mat-bottom-sheet-container-xlarge,.mat-bottom-sheet-container-large,.mat-bottom-sheet-container-medium{border-top-left-radius:4px;border-top-right-radius:4px}.mat-bottom-sheet-container-medium{min-width:384px;max-width:calc(100vw - 128px)}.mat-bottom-sheet-container-large{min-width:512px;max-width:calc(100vw - 256px)}.mat-bottom-sheet-container-xlarge{min-width:576px;max-width:calc(100vw - 384px)}\n",
              ],
              encapsulation: 2,
              data: { animation: [m2.bottomSheetState] },
            })),
            n
          );
        })(),
        ME = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({ imports: [[Ww, Fe, sc], Fe] })),
            n
          );
        })();
      class SE {
        constructor(t, e) {
          (this._overlayRef = e),
            (this._afterDismissed = new K()),
            (this._afterOpened = new K()),
            (this.containerInstance = t),
            (this.disableClose = t.bottomSheetConfig.disableClose),
            t._animationStateChanged
              .pipe(
                Oe((i) => "done" === i.phaseName && "visible" === i.toState),
                ze(1)
              )
              .subscribe(() => {
                this._afterOpened.next(), this._afterOpened.complete();
              }),
            t._animationStateChanged
              .pipe(
                Oe((i) => "done" === i.phaseName && "hidden" === i.toState),
                ze(1)
              )
              .subscribe(() => {
                clearTimeout(this._closeFallbackTimeout), e.dispose();
              }),
            e
              .detachments()
              .pipe(ze(1))
              .subscribe(() => {
                this._afterDismissed.next(this._result),
                  this._afterDismissed.complete();
              }),
            ca(
              e.backdropClick(),
              e.keydownEvents().pipe(Oe((i) => 27 === i.keyCode))
            ).subscribe((i) => {
              !this.disableClose &&
                ("keydown" !== i.type || !ys(i)) &&
                (i.preventDefault(), this.dismiss());
            });
        }
        dismiss(t) {
          this._afterDismissed.closed ||
            (this.containerInstance._animationStateChanged
              .pipe(
                Oe((e) => "start" === e.phaseName),
                ze(1)
              )
              .subscribe((e) => {
                (this._closeFallbackTimeout = setTimeout(() => {
                  this._overlayRef.dispose();
                }, e.totalTime + 100)),
                  this._overlayRef.detachBackdrop();
              }),
            (this._result = t),
            this.containerInstance.exit());
        }
        afterDismissed() {
          return this._afterDismissed;
        }
        afterOpened() {
          return this._afterOpened;
        }
        backdropClick() {
          return this._overlayRef.backdropClick();
        }
        keydownEvents() {
          return this._overlayRef.keydownEvents();
        }
      }
      const y2 = new A("mat-bottom-sheet-default-options");
      let v2 = (() => {
        class n {
          constructor(e, i, r, s) {
            (this._overlay = e),
              (this._injector = i),
              (this._parentBottomSheet = r),
              (this._defaultOptions = s),
              (this._bottomSheetRefAtThisLevel = null);
          }
          get _openedBottomSheetRef() {
            const e = this._parentBottomSheet;
            return e
              ? e._openedBottomSheetRef
              : this._bottomSheetRefAtThisLevel;
          }
          set _openedBottomSheetRef(e) {
            this._parentBottomSheet
              ? (this._parentBottomSheet._openedBottomSheetRef = e)
              : (this._bottomSheetRefAtThisLevel = e);
          }
          open(e, i) {
            const r = (function b2(n, t) {
                return Object.assign(Object.assign({}, n), t);
              })(this._defaultOptions || new op(), i),
              s = this._createOverlay(r),
              o = this._attachContainer(s, r),
              a = new SE(o, s);
            if (e instanceof en)
              o.attachTemplatePortal(
                new ic(e, null, { $implicit: r.data, bottomSheetRef: a })
              );
            else {
              const l = new zo(e, void 0, this._createInjector(r, a)),
                c = o.attachComponentPortal(l);
              a.instance = c.instance;
            }
            return (
              a.afterDismissed().subscribe(() => {
                this._openedBottomSheetRef == a &&
                  (this._openedBottomSheetRef = null);
              }),
              this._openedBottomSheetRef
                ? (this._openedBottomSheetRef
                    .afterDismissed()
                    .subscribe(() => a.containerInstance.enter()),
                  this._openedBottomSheetRef.dismiss())
                : a.containerInstance.enter(),
              (this._openedBottomSheetRef = a),
              a
            );
          }
          dismiss(e) {
            this._openedBottomSheetRef && this._openedBottomSheetRef.dismiss(e);
          }
          ngOnDestroy() {
            this._bottomSheetRefAtThisLevel &&
              this._bottomSheetRefAtThisLevel.dismiss();
          }
          _attachContainer(e, i) {
            const s = De.create({
                parent:
                  (i && i.viewContainerRef && i.viewContainerRef.injector) ||
                  this._injector,
                providers: [{ provide: op, useValue: i }],
              }),
              o = new zo(_2, i.viewContainerRef, s);
            return e.attach(o).instance;
          }
          _createOverlay(e) {
            const i = new Mf({
              direction: e.direction,
              hasBackdrop: e.hasBackdrop,
              disposeOnNavigation: e.closeOnNavigation,
              maxWidth: "100%",
              scrollStrategy:
                e.scrollStrategy || this._overlay.scrollStrategies.block(),
              positionStrategy: this._overlay
                .position()
                .global()
                .centerHorizontally()
                .bottom("0"),
            });
            return (
              e.backdropClass && (i.backdropClass = e.backdropClass),
              this._overlay.create(i)
            );
          }
          _createInjector(e, i) {
            const r = e && e.viewContainerRef && e.viewContainerRef.injector,
              s = [
                { provide: SE, useValue: i },
                { provide: g2, useValue: e.data },
              ];
            return (
              e.direction &&
                (!r || !r.get(Uo, null, j.Optional)) &&
                s.push({
                  provide: Uo,
                  useValue: { value: e.direction, change: P() },
                }),
              De.create({ parent: r || this._injector, providers: s })
            );
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(Wo), C(De), C(n, 12), C(y2, 8));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: ME })),
          n
        );
      })();
      const C2 = ["mat-button", ""],
        w2 = ["*"],
        E2 = [
          "mat-button",
          "mat-flat-button",
          "mat-icon-button",
          "mat-raised-button",
          "mat-stroked-button",
          "mat-mini-fab",
          "mat-fab",
        ],
        M2 = pE(
          fE(
            Yo(
              class {
                constructor(n) {
                  this._elementRef = n;
                }
              }
            )
          )
        );
      let S2 = (() => {
          class n extends M2 {
            constructor(e, i, r) {
              super(e),
                (this._focusMonitor = i),
                (this._animationMode = r),
                (this.isRoundButton = this._hasHostAttributes(
                  "mat-fab",
                  "mat-mini-fab"
                )),
                (this.isIconButton =
                  this._hasHostAttributes("mat-icon-button"));
              for (const s of E2)
                this._hasHostAttributes(s) &&
                  this._getHostElement().classList.add(s);
              e.nativeElement.classList.add("mat-button-base"),
                this.isRoundButton && (this.color = "accent");
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._elementRef, !0);
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            focus(e, i) {
              e
                ? this._focusMonitor.focusVia(this._getHostElement(), e, i)
                : this._getHostElement().focus(i);
            }
            _getHostElement() {
              return this._elementRef.nativeElement;
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled;
            }
            _hasHostAttributes(...e) {
              return e.some((i) => this._getHostElement().hasAttribute(i));
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(y(_e), y(ac), y(xi, 8));
            }),
            (n.ɵcmp = ye({
              type: n,
              selectors: [
                ["button", "mat-button", ""],
                ["button", "mat-raised-button", ""],
                ["button", "mat-icon-button", ""],
                ["button", "mat-fab", ""],
                ["button", "mat-mini-fab", ""],
                ["button", "mat-stroked-button", ""],
                ["button", "mat-flat-button", ""],
              ],
              viewQuery: function (e, i) {
                if ((1 & e && is(Ac, 5), 2 & e)) {
                  let r;
                  et((r = tt())) && (i.ripple = r.first);
                }
              },
              hostAttrs: [1, "mat-focus-indicator"],
              hostVars: 5,
              hostBindings: function (e, i) {
                2 & e &&
                  (qe("disabled", i.disabled || null),
                  Je(
                    "_mat-animation-noopable",
                    "NoopAnimations" === i._animationMode
                  )("mat-button-disabled", i.disabled));
              },
              inputs: {
                disabled: "disabled",
                disableRipple: "disableRipple",
                color: "color",
              },
              exportAs: ["matButton"],
              features: [q],
              attrs: C2,
              ngContentSelectors: w2,
              decls: 4,
              vars: 5,
              consts: [
                [1, "mat-button-wrapper"],
                [
                  "matRipple",
                  "",
                  1,
                  "mat-button-ripple",
                  3,
                  "matRippleDisabled",
                  "matRippleCentered",
                  "matRippleTrigger",
                ],
                [1, "mat-button-focus-overlay"],
              ],
              template: function (e, i) {
                1 & e &&
                  (_n(),
                  g(0, "span", 0),
                  Xe(1),
                  _(),
                  L(2, "span", 1),
                  L(3, "span", 2)),
                  2 & e &&
                    (Nt(2),
                    Je(
                      "mat-button-ripple-round",
                      i.isRoundButton || i.isIconButton
                    ),
                    ft("matRippleDisabled", i._isRippleDisabled())(
                      "matRippleCentered",
                      i.isIconButton
                    )("matRippleTrigger", i._getHostElement()));
              },
              directives: [Ac],
              styles: [
                ".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        x2 = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({ imports: [[CE, Fe], Fe] })),
            n
          );
        })(),
        A2 = (() => {
          class n {
            constructor(e) {
              (this._bottomSheet = e),
                (this.gpp = !1),
                (this.cloudage = !1),
                (this.igt = !1);
            }
            ngOnInit() {}
            openBottomSheet(e) {
              this._bottomSheet.open(
                1 == e ? zL : 2 == e ? WL : 3 == e ? qL : GL
              );
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(y(v2));
            }),
            (n.ɵcmp = ye({
              type: n,
              selectors: [["app-about"]],
              decls: 59,
              vars: 0,
              consts: [
                [2, "text-align", "left"],
                [2, "display", "flex", "justify-content", "space-between"],
                ["mat-raised-button", "", 3, "click"],
                [2, "text-align", "center"],
                [
                  "width",
                  "100%",
                  "height",
                  "300px",
                  "src",
                  "https://www.cloudage.co.in/about-us/",
                ],
                [
                  "width",
                  "100%",
                  "height",
                  "300px",
                  "src",
                  "https://codevian.com",
                ],
                [
                  "width",
                  "100%",
                  "height",
                  "300px",
                  "src",
                  "https://www.careers360.com/colleges/government-polytechnic-pune",
                ],
                [
                  "width",
                  "100%",
                  "height",
                  "300px",
                  "src",
                  "https://infinitegraphixads.com/",
                ],
                [
                  2,
                  "display",
                  "flex",
                  "flex-direction",
                  "column",
                  "justify-content",
                  "space-between",
                  "align-items",
                  "center",
                ],
              ],
              template: function (e, i) {
                1 & e &&
                  (g(0, "header"),
                  g(1, "h3", 0),
                  E(2, "Experienced From"),
                  _(),
                  g(3, "div"),
                  g(4, "div", 1),
                  g(5, "div"),
                  g(6, "h3"),
                  E(7, "Cloud Age Pune"),
                  _(),
                  _(),
                  g(8, "div"),
                  g(9, "button", 2),
                  be("click", function () {
                    return i.openBottomSheet(1);
                  }),
                  E(10, "Info"),
                  _(),
                  _(),
                  _(),
                  g(11, "div", 3),
                  L(12, "iframe", 4),
                  _(),
                  _(),
                  g(13, "div"),
                  g(14, "div", 1),
                  g(15, "div"),
                  g(16, "h3"),
                  E(17, "Codevian Technologies PVT.LTD"),
                  _(),
                  _(),
                  g(18, "div"),
                  g(19, "button", 2),
                  be("click", function () {
                    return i.openBottomSheet(1);
                  }),
                  E(20, "Info"),
                  _(),
                  _(),
                  _(),
                  g(21, "div", 3),
                  L(22, "iframe", 5),
                  _(),
                  _(),
                  L(23, "br"),
                  L(24, "br"),
                  g(25, "div"),
                  g(26, "h3", 0),
                  E(27, "Studied From"),
                  _(),
                  g(28, "div"),
                  g(29, "div", 1),
                  g(30, "div"),
                  g(31, "h3"),
                  E(32, "Goverment Polytechnic pune"),
                  _(),
                  _(),
                  g(33, "div"),
                  g(34, "button", 2),
                  be("click", function () {
                    return i.openBottomSheet(2);
                  }),
                  E(35, "Info"),
                  _(),
                  _(),
                  _(),
                  g(36, "div", 3),
                  L(37, "iframe", 6),
                  _(),
                  _(),
                  g(38, "div"),
                  g(39, "div", 1),
                  g(40, "div"),
                  g(41, "h3"),
                  E(42, "Infinite grafix Technology"),
                  _(),
                  _(),
                  g(43, "div"),
                  g(44, "button", 2),
                  be("click", function () {
                    return i.openBottomSheet(3);
                  }),
                  E(45, "Info"),
                  _(),
                  _(),
                  _(),
                  g(46, "div", 3),
                  L(47, "iframe", 7),
                  _(),
                  _(),
                  _(),
                  _(),
                  g(48, "h3"),
                  E(49, "About Me"),
                  _(),
                  g(50, "footer", 8),
                  g(51, "b"),
                  E(
                    52,
                    " I Have Mathematical Achivements Regarding logical Thincking And problem solving exams And because of Some Experienced Faculties I developed my Great Knowledge of problem solving skills"
                  ),
                  _(),
                  (function Ld(n, t, e) {
                    const i = D(),
                      r = ie(),
                      s = n + 20,
                      o = r.firstCreatePass
                        ? (function SI(n, t, e, i, r) {
                            const s = t.consts,
                              o = fi(s, i),
                              a = Pr(t, n, 8, "ng-container", o);
                            return (
                              null !== o && Ka(a, o, !0),
                              _d(t, e, a, fi(s, r)),
                              null !== t.queries &&
                                t.queries.elementStart(t, a),
                              a
                            );
                          })(s, r, i, t, e)
                        : r.data[s];
                    An(o, !0);
                    const a = (i[s] = i[G].createComment(""));
                    Ha(r, i, a, o),
                      dt(a, i),
                      _a(o) && (md(r, i, o), f_(r, o, i)),
                      null != e && gd(i, o);
                  })(53),
                  L(54, "br"),
                  g(55, "b"),
                  g(56, "h4"),
                  E(57, "Career objective"),
                  _(),
                  E(
                    58,
                    " To obtain a position that will allow me to utilize my technical skills and willingness to learn and in making an organization successful. "
                  ),
                  _(),
                  (function Vd() {
                    let n = Ge();
                    const t = ie();
                    pu() ? mu() : ((n = n.parent), An(n, !1)),
                      t.firstCreatePass &&
                        (Ea(t, n), ou(n) && t.queries.elementEnd(n));
                  })(),
                  _());
              },
              directives: [S2],
              styles: [""],
            })),
            n
          );
        })(),
        xE = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵcmp = ye({
              type: n,
              selectors: [["app-main"]],
              decls: 19,
              vars: 0,
              consts: [
                [
                  2,
                  "margin",
                  "40px 20px",
                  "/* background-color",
                  "white",
                  "*/\n    display",
                  "flex",
                  "align-items",
                  "center",
                  "justify-content",
                  "center",
                ],
                [2, "margin", "10px"],
                [2, "display", "flex"],
                [2, "color", "rgb(255, 98, 0)"],
                [
                  "src",
                  "./assets/2289_SkVNQSBGQU1PIDEwMjgtMTIy.jpg",
                  "alt",
                  "",
                ],
              ],
              template: function (e, i) {
                1 & e &&
                  (g(0, "div", 0),
                  g(1, "div", 1),
                  g(2, "div", 2),
                  g(3, "div"),
                  g(4, "h1"),
                  E(5, "Hi"),
                  _(),
                  g(6, "h2"),
                  E(7, "My Name is"),
                  _(),
                  g(8, "h1", 3),
                  E(9, "Afifahmad"),
                  _(),
                  g(10, "h3", 3),
                  E(11, "From India"),
                  _(),
                  _(),
                  g(12, "div"),
                  L(13, "img", 4),
                  _(),
                  _(),
                  g(14, "h4"),
                  E(15, " Having "),
                  g(16, "span", 3),
                  E(17, "2.5 + years "),
                  _(),
                  E(
                    18,
                    " of experience as AWS Administrator | AWS Data Analytics | Cloudera Hadoop Associate | MEAN Stack Web Development "
                  ),
                  _(),
                  _(),
                  _());
              },
              styles: [
                "",
                "img[_ngcontent-%COMP%] {\n    width: 200px;\n    height: 200px;\n  }",
              ],
            })),
            n
          );
        })();
      const AE = ["*"];
      function T2(n, t) {
        if (1 & n) {
          const e = Ja();
          g(0, "button", 7),
            be("click", function () {
              const s = va(e).index;
              return vi(2).to(s);
            }),
            _();
        }
        if (2 & n) {
          const e = t.index,
            i = vi(2);
          Je("active", e === i.activeSlide),
            qe("aria-current", e === i.activeSlide);
        }
      }
      function I2(n, t) {
        if (
          (1 & n && (g(0, "div", 5), Pn(1, T2, 1, 3, "button", 6), _()), 2 & n)
        ) {
          const e = vi();
          Nt(1), ft("ngForOf", e.items);
        }
      }
      function R2(n, t) {
        if (1 & n) {
          const e = Ja();
          g(0, "button", 8),
            be("click", function () {
              return va(e), vi().prev();
            }),
            L(1, "span", 9),
            g(2, "span", 10),
            E(3, "Previous"),
            _(),
            _();
        }
      }
      function k2(n, t) {
        if (1 & n) {
          const e = Ja();
          g(0, "button", 11),
            be("click", function () {
              return va(e), vi().next();
            }),
            L(1, "span", 12),
            g(2, "span", 10),
            E(3, "Next"),
            _(),
            _();
        }
      }
      let TE = (() => {
        class n {
          constructor(e) {
            (this._elementRef = e),
              (this.interval = null),
              (this.carouselItem = !0),
              (this.active = !1),
              (this.next = !1),
              (this.prev = !1),
              (this.start = !1),
              (this.end = !1);
          }
          get host() {
            return this._elementRef.nativeElement;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(y(_e));
          }),
          (n.ɵcmp = ye({
            type: n,
            selectors: [["mdb-carousel-item"]],
            hostVars: 12,
            hostBindings: function (e, i) {
              2 & e &&
                Je("carousel-item", i.carouselItem)("active", i.active)(
                  "carousel-item-next",
                  i.next
                )("carousel-item-prev", i.prev)("carousel-item-start", i.start)(
                  "carousel-item-end",
                  i.end
                );
            },
            inputs: { interval: "interval" },
            ngContentSelectors: AE,
            decls: 1,
            vars: 0,
            template: function (e, i) {
              1 & e && (_n(), Xe(0));
            },
            encapsulation: 2,
          })),
          n
        );
      })();
      var $t = (() => {
        return (
          ((n = $t || ($t = {}))[(n.UNKNOWN = 0)] = "UNKNOWN"),
          (n[(n.NEXT = 1)] = "NEXT"),
          (n[(n.PREV = 2)] = "PREV"),
          $t
        );
        var n;
      })();
      let O2 = (() => {
          class n {
            constructor(e, i) {
              (this._elementRef = e),
                (this._cdRef = i),
                (this.animation = "slide"),
                (this._controls = !1),
                (this._dark = !1),
                (this._indicators = !1),
                (this._ride = !0),
                (this._interval = 5e3),
                (this.keyboard = !0),
                (this.pause = !0),
                (this.wrap = !0),
                (this.slide = new ee()),
                (this.slideChange = new ee()),
                (this._activeSlide = 0),
                (this._isPlaying = !1),
                (this._isSliding = !1),
                (this._destroy$ = new K());
            }
            get items() {
              return this._items && this._items.toArray();
            }
            get controls() {
              return this._controls;
            }
            set controls(e) {
              this._controls = at(e);
            }
            get dark() {
              return this._dark;
            }
            set dark(e) {
              this._dark = at(e);
            }
            get indicators() {
              return this._indicators;
            }
            set indicators(e) {
              this._indicators = at(e);
            }
            get ride() {
              return this._ride;
            }
            set ride(e) {
              this._ride = at(e);
            }
            get interval() {
              return this._interval;
            }
            set interval(e) {
              (this._interval = e), this.items && this._restartInterval();
            }
            get activeSlide() {
              return this._activeSlide;
            }
            set activeSlide(e) {
              this.items.length &&
                this._activeSlide !== e &&
                ((this._activeSlide = e), this._restartInterval());
            }
            onMouseEnter() {
              this.pause && this._isPlaying && this.stop();
            }
            onMouseLeave() {
              this.pause && !this._isPlaying && this.play();
            }
            ngAfterViewInit() {
              Promise.resolve().then(() => {
                this._setActiveSlide(this._activeSlide),
                  this.interval > 0 && this.ride && this.play(),
                  this._cdRef.markForCheck();
              }),
                this.keyboard &&
                  ir(this._elementRef.nativeElement, "keydown")
                    .pipe(oi(this._destroy$))
                    .subscribe((e) => {
                      "ArrowRight" === e.key
                        ? this.next()
                        : "ArrowLeft" === e.key && this.prev();
                    });
            }
            ngOnDestroy() {
              this._destroy$.next(), this._destroy$.complete();
            }
            _setActiveSlide(e) {
              (this.items[this._activeSlide].active = !1),
                (this.items[e].active = !0),
                (this._activeSlide = e);
            }
            _restartInterval() {
              this._resetInterval();
              const e = this.items[this.activeSlide],
                i = e.interval ? e.interval : this.interval;
              !isNaN(i) &&
                i > 0 &&
                (this._lastInterval = setInterval(() => {
                  const r = +i;
                  this._isPlaying && !isNaN(r) && r > 0
                    ? this.next()
                    : this.stop();
                }, i));
            }
            _resetInterval() {
              this._lastInterval &&
                (clearInterval(this._lastInterval),
                (this._lastInterval = null));
            }
            play() {
              this._isPlaying ||
                ((this._isPlaying = !0), this._restartInterval());
            }
            stop() {
              this._isPlaying &&
                ((this._isPlaying = !1), this._resetInterval());
            }
            to(e) {
              if (!(e > this.items.length - 1 || e < 0))
                return this.activeSlide === e
                  ? (this.stop(), void this.play())
                  : (this._animateSlides(
                      e > this.activeSlide ? $t.NEXT : $t.PREV,
                      this.activeSlide,
                      e
                    ),
                    void (this.activeSlide = e));
            }
            next() {
              this._isSliding || this._slide($t.NEXT);
            }
            prev() {
              this._isSliding || this._slide($t.PREV);
            }
            _slide(e) {
              if (
                !this.wrap &&
                ((e === $t.NEXT &&
                  this._activeSlide === this.items.length - 1) ||
                  (e === $t.PREV && 0 === this._activeSlide))
              )
                return;
              const s = this._getNewSlideIndex(e);
              this._animateSlides(e, this.activeSlide, s),
                (this.activeSlide = s),
                this.slide.emit();
            }
            _animateSlides(e, i, r) {
              const s = this.items[i],
                o = this.items[r],
                a = s.host,
                l = o.host;
              if (
                ((this._isSliding = !0),
                this._isPlaying && this.stop(),
                e === $t.NEXT)
              ) {
                (o.next = !0),
                  setTimeout(() => {
                    this._reflow(l),
                      (s.start = !0),
                      (o.start = !0),
                      this._cdRef.markForCheck();
                  }, 0);
                const c = 600;
                ir(a, "transitionend")
                  .pipe(ze(1))
                  .subscribe(() => {
                    (o.next = !1),
                      (o.start = !1),
                      (o.active = !0),
                      (s.active = !1),
                      (s.start = !1),
                      (s.next = !1),
                      this.slideChange.emit(),
                      (this._isSliding = !1);
                  }),
                  this._emulateTransitionEnd(a, c);
              } else if (e === $t.PREV) {
                (o.prev = !0),
                  setTimeout(() => {
                    this._reflow(l),
                      (s.end = !0),
                      (o.end = !0),
                      this._cdRef.markForCheck();
                  }, 0);
                const c = 600;
                ir(a, "transitionend")
                  .pipe(ze(1))
                  .subscribe(() => {
                    (o.prev = !1),
                      (o.end = !1),
                      (o.active = !0),
                      (s.active = !1),
                      (s.end = !1),
                      (s.prev = !1),
                      this.slideChange.emit(),
                      (this._isSliding = !1);
                  }),
                  this._emulateTransitionEnd(a, c);
              }
              !this._isPlaying && this.interval > 0 && this.play();
            }
            _reflow(e) {
              return e.offsetHeight;
            }
            _emulateTransitionEnd(e, i) {
              let r = !1;
              const o = i + 5;
              ir(e, "transitionend")
                .pipe(ze(1))
                .subscribe(() => {
                  r = !0;
                }),
                setTimeout(() => {
                  r || e.dispatchEvent(new Event("transitionend"));
                }, o);
            }
            _getNewSlideIndex(e) {
              let i;
              return (
                e === $t.NEXT && (i = this._getNextSlideIndex()),
                e === $t.PREV && (i = this._getPrevSlideIndex()),
                i
              );
            }
            _getNextSlideIndex() {
              const e = this._activeSlide === this.items.length - 1;
              return e
                ? this.wrap && e
                  ? 0
                  : this._activeSlide
                : this._activeSlide + 1;
            }
            _getPrevSlideIndex() {
              const e = 0 === this._activeSlide;
              return e
                ? this.wrap && e
                  ? this.items.length - 1
                  : this._activeSlide
                : this._activeSlide - 1;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(y(_e), y(tn));
            }),
            (n.ɵcmp = ye({
              type: n,
              selectors: [["mdb-carousel"]],
              contentQueries: function (e, i, r) {
                if ((1 & e && Bt(r, TE, 4), 2 & e)) {
                  let s;
                  et((s = tt())) && (i._items = s);
                }
              },
              hostBindings: function (e, i) {
                1 & e &&
                  be("mouseenter", function () {
                    return i.onMouseEnter();
                  })("mouseleave", function () {
                    return i.onMouseLeave();
                  });
              },
              inputs: {
                animation: "animation",
                controls: "controls",
                dark: "dark",
                indicators: "indicators",
                ride: "ride",
                interval: "interval",
                keyboard: "keyboard",
                pause: "pause",
                wrap: "wrap",
              },
              outputs: { slide: "slide", slideChange: "slideChange" },
              ngContentSelectors: AE,
              decls: 6,
              vars: 7,
              consts: [
                [1, "carousel", "slide"],
                ["class", "carousel-indicators", 4, "ngIf"],
                [1, "carousel-inner"],
                [
                  "class",
                  "carousel-control-prev",
                  "type",
                  "button",
                  3,
                  "click",
                  4,
                  "ngIf",
                ],
                [
                  "class",
                  "carousel-control-next",
                  "type",
                  "button",
                  3,
                  "click",
                  4,
                  "ngIf",
                ],
                [1, "carousel-indicators"],
                ["type", "button", 3, "active", "click", 4, "ngFor", "ngForOf"],
                ["type", "button", 3, "click"],
                ["type", "button", 1, "carousel-control-prev", 3, "click"],
                ["aria-hidden", "true", 1, "carousel-control-prev-icon"],
                [1, "visually-hidden"],
                ["type", "button", 1, "carousel-control-next", 3, "click"],
                ["aria-hidden", "true", 1, "carousel-control-next-icon"],
              ],
              template: function (e, i) {
                1 & e &&
                  (_n(),
                  g(0, "div", 0),
                  Pn(1, I2, 2, 1, "div", 1),
                  g(2, "div", 2),
                  Xe(3),
                  _(),
                  Pn(4, R2, 4, 0, "button", 3),
                  Pn(5, k2, 4, 0, "button", 4),
                  _()),
                  2 & e &&
                    (Je("carousel-fade", "fade" === i.animation)(
                      "carousel-dark",
                      i.dark
                    ),
                    Nt(1),
                    ft("ngIf", i.indicators),
                    Nt(3),
                    ft("ngIf", i.controls),
                    Nt(1),
                    ft("ngIf", i.controls));
              },
              directives: [Al, eC],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        F2 = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({ imports: [[Eo]] })),
            n
          );
        })();
      const P2 = [
        { path: "", component: xE },
        { path: "home", component: xE },
        { path: "about", component: A2 },
        {
          path: "project",
          component: (() => {
            class n {
              constructor() {}
              ngOnInit() {}
            }
            return (
              (n.ɵfac = function (e) {
                return new (e || n)();
              }),
              (n.ɵcmp = ye({
                type: n,
                selectors: [["app-project"]],
                decls: 35,
                vars: 3,
                consts: [
                  [1, "card", "w-250"],
                  [
                    "src",
                    "./assets/Picture1.jpg",
                    "alt",
                    "Card image cap",
                    1,
                    "card-img-top",
                  ],
                  [1, "card-body"],
                  [1, "card-title"],
                  [1, "card-text"],
                  [
                    "src",
                    "https://afifahmadgit.github.io/mattress-site/",
                    "frameborder",
                    "0",
                    "height",
                    "300px",
                  ],
                  [3, "controls", "indicators", "animation"],
                  [
                    "src",
                    "./assets/Images/1.jpg",
                    "alt",
                    "...",
                    1,
                    "d-block",
                    "w-100",
                  ],
                  [
                    "src",
                    "./assets/Images/7.jpg",
                    "alt",
                    "...",
                    1,
                    "d-block",
                    "w-100",
                  ],
                  [
                    "src",
                    "./assets/Images/9.jpg",
                    "alt",
                    "...",
                    1,
                    "d-block",
                    "w-100",
                  ],
                  [1, "carousel-caption", "d-none", "d-md-block"],
                ],
                template: function (e, i) {
                  1 & e &&
                    (g(0, "div"),
                    g(1, "div", 0),
                    L(2, "img", 1),
                    g(3, "div", 2),
                    g(4, "h5", 3),
                    E(5, "Parking Solution"),
                    _(),
                    g(6, "p", 4),
                    E(
                      7,
                      " To Analise this Huge Amount of Data in Real Time and Getting Insight From Data To creating Strategies For BI Team "
                    ),
                    _(),
                    _(),
                    _(),
                    L(8, "br"),
                    L(9, "hr"),
                    L(10, "br"),
                    g(11, "div", 0),
                    L(12, "iframe", 5),
                    g(13, "div", 2),
                    g(14, "h5", 3),
                    E(15, "Sample Mattress"),
                    _(),
                    g(16, "p", 4),
                    E(
                      17,
                      " Sample Mattress Website using Pure CSS and HTML Only "
                    ),
                    _(),
                    _(),
                    _(),
                    L(18, "br"),
                    L(19, "hr"),
                    L(20, "br"),
                    g(21, "div", 0),
                    g(22, "mdb-carousel", 6),
                    g(23, "mdb-carousel-item"),
                    L(24, "img", 7),
                    _(),
                    g(25, "mdb-carousel-item"),
                    L(26, "img", 8),
                    _(),
                    g(27, "mdb-carousel-item"),
                    L(28, "img", 9),
                    L(29, "div", 10),
                    _(),
                    _(),
                    g(30, "div", 2),
                    g(31, "h5", 3),
                    E(32, "Mini Weather Station"),
                    _(),
                    g(33, "p", 4),
                    E(
                      34,
                      " Mini Weather Station Using Arduino to Getting Temprature,Humidity,Intensity and Sending it to Client Using ThingSpeak "
                    ),
                    _(),
                    _(),
                    _(),
                    _()),
                    2 & e &&
                      (Nt(22),
                      ft("controls", !0)("indicators", !0)(
                        "animation",
                        "fade"
                      ));
                },
                directives: [O2, TE],
                styles: [""],
              })),
              n
            );
          })(),
        },
      ];
      let N2 = (() => {
        class n {}
        return (
          (n.ɵfac = function (e) {
            return new (e || n)();
          }),
          (n.ɵmod = de({ type: n })),
          (n.ɵinj = le({ imports: [[Sw.forRoot(P2)], Sw] })),
          n
        );
      })();
      function L2(n, t) {}
      class ap {
        constructor() {
          (this.role = "dialog"),
            (this.panelClass = ""),
            (this.hasBackdrop = !0),
            (this.backdropClass = ""),
            (this.disableClose = !1),
            (this.width = ""),
            (this.height = ""),
            (this.maxWidth = "80vw"),
            (this.data = null),
            (this.ariaDescribedBy = null),
            (this.ariaLabelledBy = null),
            (this.ariaLabel = null),
            (this.autoFocus = "first-tabbable"),
            (this.restoreFocus = !0),
            (this.delayFocusTrap = !0),
            (this.closeOnNavigation = !0);
        }
      }
      const V2 = {
        dialogContainer: qo("dialogContainer", [
          Hn("void, exit", St({ opacity: 0, transform: "scale(0.7)" })),
          Hn("enter", St({ transform: "none" })),
          Ei(
            "* => enter",
            lc([
              Di(
                "150ms cubic-bezier(0, 0, 0.2, 1)",
                St({ transform: "none", opacity: 1 })
              ),
              uc("@*", cc(), { optional: !0 }),
            ])
          ),
          Ei(
            "* => void, * => exit",
            lc([
              Di("75ms cubic-bezier(0.4, 0.0, 0.2, 1)", St({ opacity: 0 })),
              uc("@*", cc(), { optional: !0 }),
            ])
          ),
        ]),
      };
      let B2 = (() => {
          class n extends rc {
            constructor(e, i, r, s, o, a, l, c) {
              super(),
                (this._elementRef = e),
                (this._focusTrapFactory = i),
                (this._changeDetectorRef = r),
                (this._config = o),
                (this._interactivityChecker = a),
                (this._ngZone = l),
                (this._focusMonitor = c),
                (this._animationStateChanged = new ee()),
                (this._elementFocusedBeforeDialogWasOpened = null),
                (this._closeInteractionType = null),
                (this.attachDomPortal = (u) => (
                  this._portalOutlet.hasAttached(),
                  this._portalOutlet.attachDomPortal(u)
                )),
                (this._ariaLabelledBy = o.ariaLabelledBy || null),
                (this._document = s);
            }
            _initializeWithAttachedContent() {
              (this._focusTrap = this._focusTrapFactory.create(
                this._elementRef.nativeElement
              )),
                this._document &&
                  (this._elementFocusedBeforeDialogWasOpened = _s());
            }
            attachComponentPortal(e) {
              return (
                this._portalOutlet.hasAttached(),
                this._portalOutlet.attachComponentPortal(e)
              );
            }
            attachTemplatePortal(e) {
              return (
                this._portalOutlet.hasAttached(),
                this._portalOutlet.attachTemplatePortal(e)
              );
            }
            _recaptureFocus() {
              this._containsFocus() || this._trapFocus();
            }
            _forceFocus(e, i) {
              this._interactivityChecker.isFocusable(e) ||
                ((e.tabIndex = -1),
                this._ngZone.runOutsideAngular(() => {
                  const r = () => {
                    e.removeEventListener("blur", r),
                      e.removeEventListener("mousedown", r),
                      e.removeAttribute("tabindex");
                  };
                  e.addEventListener("blur", r),
                    e.addEventListener("mousedown", r);
                })),
                e.focus(i);
            }
            _focusByCssSelector(e, i) {
              let r = this._elementRef.nativeElement.querySelector(e);
              r && this._forceFocus(r, i);
            }
            _trapFocus() {
              const e = this._elementRef.nativeElement;
              switch (this._config.autoFocus) {
                case !1:
                case "dialog":
                  this._containsFocus() || e.focus();
                  break;
                case !0:
                case "first-tabbable":
                  this._focusTrap.focusInitialElementWhenReady().then((i) => {
                    i || this._focusDialogContainer();
                  });
                  break;
                case "first-heading":
                  this._focusByCssSelector(
                    'h1, h2, h3, h4, h5, h6, [role="heading"]'
                  );
                  break;
                default:
                  this._focusByCssSelector(this._config.autoFocus);
              }
            }
            _restoreFocus() {
              const e = this._elementFocusedBeforeDialogWasOpened;
              if (
                this._config.restoreFocus &&
                e &&
                "function" == typeof e.focus
              ) {
                const i = _s(),
                  r = this._elementRef.nativeElement;
                (!i || i === this._document.body || i === r || r.contains(i)) &&
                  (this._focusMonitor
                    ? (this._focusMonitor.focusVia(
                        e,
                        this._closeInteractionType
                      ),
                      (this._closeInteractionType = null))
                    : e.focus());
              }
              this._focusTrap && this._focusTrap.destroy();
            }
            _focusDialogContainer() {
              this._elementRef.nativeElement.focus &&
                this._elementRef.nativeElement.focus();
            }
            _containsFocus() {
              const e = this._elementRef.nativeElement,
                i = _s();
              return e === i || e.contains(i);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                y(_e),
                y(lD),
                y(tn),
                y(Z, 8),
                y(ap),
                y(xf),
                y(re),
                y(ac)
              );
            }),
            (n.ɵdir = k({
              type: n,
              viewQuery: function (e, i) {
                if ((1 & e && is(Go, 7), 2 & e)) {
                  let r;
                  et((r = tt())) && (i._portalOutlet = r.first);
                }
              },
              features: [q],
            })),
            n
          );
        })(),
        j2 = (() => {
          class n extends B2 {
            constructor() {
              super(...arguments), (this._state = "enter");
            }
            _onAnimationDone({ toState: e, totalTime: i }) {
              "enter" === e
                ? (this._config.delayFocusTrap && this._trapFocus(),
                  this._animationStateChanged.next({
                    state: "opened",
                    totalTime: i,
                  }))
                : "exit" === e &&
                  (this._restoreFocus(),
                  this._animationStateChanged.next({
                    state: "closed",
                    totalTime: i,
                  }));
            }
            _onAnimationStart({ toState: e, totalTime: i }) {
              "enter" === e
                ? this._animationStateChanged.next({
                    state: "opening",
                    totalTime: i,
                  })
                : ("exit" === e || "void" === e) &&
                  this._animationStateChanged.next({
                    state: "closing",
                    totalTime: i,
                  });
            }
            _startExitAnimation() {
              (this._state = "exit"), this._changeDetectorRef.markForCheck();
            }
            _initializeWithAttachedContent() {
              super._initializeWithAttachedContent(),
                this._config.delayFocusTrap || this._trapFocus();
            }
          }
          return (
            (n.ɵfac = (function () {
              let t;
              return function (i) {
                return (t || (t = rt(n)))(i || n);
              };
            })()),
            (n.ɵcmp = ye({
              type: n,
              selectors: [["mat-dialog-container"]],
              hostAttrs: [
                "tabindex",
                "-1",
                "aria-modal",
                "true",
                1,
                "mat-dialog-container",
              ],
              hostVars: 6,
              hostBindings: function (e, i) {
                1 & e &&
                  el("@dialogContainer.start", function (s) {
                    return i._onAnimationStart(s);
                  })("@dialogContainer.done", function (s) {
                    return i._onAnimationDone(s);
                  }),
                  2 & e &&
                    (Gd("id", i._id),
                    qe("role", i._config.role)(
                      "aria-labelledby",
                      i._config.ariaLabel ? null : i._ariaLabelledBy
                    )("aria-label", i._config.ariaLabel)(
                      "aria-describedby",
                      i._config.ariaDescribedBy || null
                    ),
                    nl("@dialogContainer", i._state));
              },
              features: [q],
              decls: 1,
              vars: 0,
              consts: [["cdkPortalOutlet", ""]],
              template: function (e, i) {
                1 & e && Pn(0, L2, 0, 0, "ng-template", 0);
              },
              directives: [Go],
              styles: [
                ".mat-dialog-container{display:block;padding:24px;border-radius:4px;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%;min-height:inherit;max-height:inherit}.cdk-high-contrast-active .mat-dialog-container{outline:solid 1px}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}.mat-dialog-title{margin:0 0 20px;display:block}.mat-dialog-actions{padding:8px 0;display:flex;flex-wrap:wrap;min-height:52px;align-items:center;box-sizing:content-box;margin-bottom:-24px}.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions[align=center]{justify-content:center}.mat-dialog-actions .mat-button-base+.mat-button-base,.mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}\n",
              ],
              encapsulation: 2,
              data: { animation: [V2.dialogContainer] },
            })),
            n
          );
        })(),
        H2 = 0;
      class U2 {
        constructor(t, e, i = "mat-dialog-" + H2++) {
          (this._overlayRef = t),
            (this._containerInstance = e),
            (this.id = i),
            (this.disableClose = this._containerInstance._config.disableClose),
            (this._afterOpened = new K()),
            (this._afterClosed = new K()),
            (this._beforeClosed = new K()),
            (this._state = 0),
            (e._id = i),
            e._animationStateChanged
              .pipe(
                Oe((r) => "opened" === r.state),
                ze(1)
              )
              .subscribe(() => {
                this._afterOpened.next(), this._afterOpened.complete();
              }),
            e._animationStateChanged
              .pipe(
                Oe((r) => "closed" === r.state),
                ze(1)
              )
              .subscribe(() => {
                clearTimeout(this._closeFallbackTimeout),
                  this._finishDialogClose();
              }),
            t.detachments().subscribe(() => {
              this._beforeClosed.next(this._result),
                this._beforeClosed.complete(),
                this._afterClosed.next(this._result),
                this._afterClosed.complete(),
                (this.componentInstance = null),
                this._overlayRef.dispose();
            }),
            t
              .keydownEvents()
              .pipe(Oe((r) => 27 === r.keyCode && !this.disableClose && !ys(r)))
              .subscribe((r) => {
                r.preventDefault(), IE(this, "keyboard");
              }),
            t.backdropClick().subscribe(() => {
              this.disableClose
                ? this._containerInstance._recaptureFocus()
                : IE(this, "mouse");
            });
        }
        close(t) {
          (this._result = t),
            this._containerInstance._animationStateChanged
              .pipe(
                Oe((e) => "closing" === e.state),
                ze(1)
              )
              .subscribe((e) => {
                this._beforeClosed.next(t),
                  this._beforeClosed.complete(),
                  this._overlayRef.detachBackdrop(),
                  (this._closeFallbackTimeout = setTimeout(
                    () => this._finishDialogClose(),
                    e.totalTime + 100
                  ));
              }),
            (this._state = 1),
            this._containerInstance._startExitAnimation();
        }
        afterOpened() {
          return this._afterOpened;
        }
        afterClosed() {
          return this._afterClosed;
        }
        beforeClosed() {
          return this._beforeClosed;
        }
        backdropClick() {
          return this._overlayRef.backdropClick();
        }
        keydownEvents() {
          return this._overlayRef.keydownEvents();
        }
        updatePosition(t) {
          let e = this._getPositionStrategy();
          return (
            t && (t.left || t.right)
              ? t.left
                ? e.left(t.left)
                : e.right(t.right)
              : e.centerHorizontally(),
            t && (t.top || t.bottom)
              ? t.top
                ? e.top(t.top)
                : e.bottom(t.bottom)
              : e.centerVertically(),
            this._overlayRef.updatePosition(),
            this
          );
        }
        updateSize(t = "", e = "") {
          return (
            this._overlayRef.updateSize({ width: t, height: e }),
            this._overlayRef.updatePosition(),
            this
          );
        }
        addPanelClass(t) {
          return this._overlayRef.addPanelClass(t), this;
        }
        removePanelClass(t) {
          return this._overlayRef.removePanelClass(t), this;
        }
        getState() {
          return this._state;
        }
        _finishDialogClose() {
          (this._state = 2), this._overlayRef.dispose();
        }
        _getPositionStrategy() {
          return this._overlayRef.getConfig().positionStrategy;
        }
      }
      function IE(n, t, e) {
        return (
          void 0 !== n._containerInstance &&
            (n._containerInstance._closeInteractionType = t),
          n.close(e)
        );
      }
      const $2 = new A("MatDialogData"),
        z2 = new A("mat-dialog-default-options"),
        RE = new A("mat-dialog-scroll-strategy"),
        W2 = {
          provide: RE,
          deps: [Wo],
          useFactory: function G2(n) {
            return () => n.scrollStrategies.block();
          },
        };
      let q2 = (() => {
          class n {
            constructor(e, i, r, s, o, a, l, c, u, d) {
              (this._overlay = e),
                (this._injector = i),
                (this._defaultOptions = r),
                (this._parentDialog = s),
                (this._overlayContainer = o),
                (this._dialogRefConstructor = l),
                (this._dialogContainerType = c),
                (this._dialogDataToken = u),
                (this._openDialogsAtThisLevel = []),
                (this._afterAllClosedAtThisLevel = new K()),
                (this._afterOpenedAtThisLevel = new K()),
                (this._ariaHiddenElements = new Map()),
                (this.afterAllClosed = Wh(() =>
                  this.openDialogs.length
                    ? this._getAfterAllClosed()
                    : this._getAfterAllClosed().pipe(Xi(void 0))
                )),
                (this._scrollStrategy = a);
            }
            get openDialogs() {
              return this._parentDialog
                ? this._parentDialog.openDialogs
                : this._openDialogsAtThisLevel;
            }
            get afterOpened() {
              return this._parentDialog
                ? this._parentDialog.afterOpened
                : this._afterOpenedAtThisLevel;
            }
            _getAfterAllClosed() {
              const e = this._parentDialog;
              return e
                ? e._getAfterAllClosed()
                : this._afterAllClosedAtThisLevel;
            }
            open(e, i) {
              (i = (function K2(n, t) {
                return Object.assign(Object.assign({}, t), n);
              })(i, this._defaultOptions || new ap())),
                i.id && this.getDialogById(i.id);
              const r = this._createOverlay(i),
                s = this._attachDialogContainer(r, i),
                o = this._attachDialogContent(e, s, r, i);
              return (
                this.openDialogs.length ||
                  this._hideNonDialogContentFromAssistiveTechnology(),
                this.openDialogs.push(o),
                o.afterClosed().subscribe(() => this._removeOpenDialog(o)),
                this.afterOpened.next(o),
                s._initializeWithAttachedContent(),
                o
              );
            }
            closeAll() {
              this._closeDialogs(this.openDialogs);
            }
            getDialogById(e) {
              return this.openDialogs.find((i) => i.id === e);
            }
            ngOnDestroy() {
              this._closeDialogs(this._openDialogsAtThisLevel),
                this._afterAllClosedAtThisLevel.complete(),
                this._afterOpenedAtThisLevel.complete();
            }
            _createOverlay(e) {
              const i = this._getOverlayConfig(e);
              return this._overlay.create(i);
            }
            _getOverlayConfig(e) {
              const i = new Mf({
                positionStrategy: this._overlay.position().global(),
                scrollStrategy: e.scrollStrategy || this._scrollStrategy(),
                panelClass: e.panelClass,
                hasBackdrop: e.hasBackdrop,
                direction: e.direction,
                minWidth: e.minWidth,
                minHeight: e.minHeight,
                maxWidth: e.maxWidth,
                maxHeight: e.maxHeight,
                disposeOnNavigation: e.closeOnNavigation,
              });
              return e.backdropClass && (i.backdropClass = e.backdropClass), i;
            }
            _attachDialogContainer(e, i) {
              const s = De.create({
                  parent:
                    (i && i.viewContainerRef && i.viewContainerRef.injector) ||
                    this._injector,
                  providers: [{ provide: ap, useValue: i }],
                }),
                o = new zo(
                  this._dialogContainerType,
                  i.viewContainerRef,
                  s,
                  i.componentFactoryResolver
                );
              return e.attach(o).instance;
            }
            _attachDialogContent(e, i, r, s) {
              const o = new this._dialogRefConstructor(r, i, s.id);
              if (e instanceof en)
                i.attachTemplatePortal(
                  new ic(e, null, { $implicit: s.data, dialogRef: o })
                );
              else {
                const a = this._createInjector(s, o, i),
                  l = i.attachComponentPortal(
                    new zo(e, s.viewContainerRef, a, s.componentFactoryResolver)
                  );
                o.componentInstance = l.instance;
              }
              return (
                o.updateSize(s.width, s.height).updatePosition(s.position), o
              );
            }
            _createInjector(e, i, r) {
              const s = e && e.viewContainerRef && e.viewContainerRef.injector,
                o = [
                  { provide: this._dialogContainerType, useValue: r },
                  { provide: this._dialogDataToken, useValue: e.data },
                  { provide: this._dialogRefConstructor, useValue: i },
                ];
              return (
                e.direction &&
                  (!s || !s.get(Uo, null, j.Optional)) &&
                  o.push({
                    provide: Uo,
                    useValue: { value: e.direction, change: P() },
                  }),
                De.create({ parent: s || this._injector, providers: o })
              );
            }
            _removeOpenDialog(e) {
              const i = this.openDialogs.indexOf(e);
              i > -1 &&
                (this.openDialogs.splice(i, 1),
                this.openDialogs.length ||
                  (this._ariaHiddenElements.forEach((r, s) => {
                    r
                      ? s.setAttribute("aria-hidden", r)
                      : s.removeAttribute("aria-hidden");
                  }),
                  this._ariaHiddenElements.clear(),
                  this._getAfterAllClosed().next()));
            }
            _hideNonDialogContentFromAssistiveTechnology() {
              const e = this._overlayContainer.getContainerElement();
              if (e.parentElement) {
                const i = e.parentElement.children;
                for (let r = i.length - 1; r > -1; r--) {
                  let s = i[r];
                  s !== e &&
                    "SCRIPT" !== s.nodeName &&
                    "STYLE" !== s.nodeName &&
                    !s.hasAttribute("aria-live") &&
                    (this._ariaHiddenElements.set(
                      s,
                      s.getAttribute("aria-hidden")
                    ),
                    s.setAttribute("aria-hidden", "true"));
                }
              }
            }
            _closeDialogs(e) {
              let i = e.length;
              for (; i--; ) e[i].close();
            }
          }
          return (
            (n.ɵfac = function (e) {
              Xa();
            }),
            (n.ɵdir = k({ type: n })),
            n
          );
        })(),
        kE = (() => {
          class n extends q2 {
            constructor(e, i, r, s, o, a, l, c) {
              super(e, i, s, a, l, o, U2, j2, $2, c);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                C(Wo),
                C(De),
                C(Co, 8),
                C(z2, 8),
                C(RE),
                C(n, 12),
                C(Sf),
                C(xi, 8)
              );
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Q2 = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [
                ["", "mat-dialog-content", ""],
                ["mat-dialog-content"],
                ["", "matDialogContent", ""],
              ],
              hostAttrs: [1, "mat-dialog-content"],
            })),
            n
          );
        })(),
        Y2 = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({ providers: [kE, W2], imports: [[Ww, sc, Fe], Fe] })),
            n
          );
        })();
      class X2 {}
      class Ai {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((e) => {
                            const i = e.indexOf(":");
                            if (i > 0) {
                              const r = e.slice(0, i),
                                s = r.toLowerCase(),
                                o = e.slice(i + 1).trim();
                              this.maybeSetNormalizedName(r, s),
                                this.headers.has(s)
                                  ? this.headers.get(s).push(o)
                                  : this.headers.set(s, [o]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((e) => {
                            let i = t[e];
                            const r = e.toLowerCase();
                            "string" == typeof i && (i = [i]),
                              i.length > 0 &&
                                (this.headers.set(r, i),
                                this.maybeSetNormalizedName(e, r));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const e = this.headers.get(t.toLowerCase());
          return e && e.length > 0 ? e[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: "d" });
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Ai
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((e) => {
              this.headers.set(e, t.headers.get(e)),
                this.normalizedNames.set(e, t.normalizedNames.get(e));
            });
        }
        clone(t) {
          const e = new Ai();
          return (
            (e.lazyInit =
              this.lazyInit && this.lazyInit instanceof Ai
                ? this.lazyInit
                : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          );
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let i = t.value;
              if (("string" == typeof i && (i = [i]), 0 === i.length)) return;
              this.maybeSetNormalizedName(t.name, e);
              const r = ("a" === t.op ? this.headers.get(e) : void 0) || [];
              r.push(...i), this.headers.set(e, r);
              break;
            case "d":
              const s = t.value;
              if (s) {
                let o = this.headers.get(e);
                if (!o) return;
                (o = o.filter((a) => -1 === s.indexOf(a))),
                  0 === o.length
                    ? (this.headers.delete(e), this.normalizedNames.delete(e))
                    : this.headers.set(e, o);
              } else this.headers.delete(e), this.normalizedNames.delete(e);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((e) =>
              t(this.normalizedNames.get(e), this.headers.get(e))
            );
        }
      }
      class J2 {
        encodeKey(t) {
          return FE(t);
        }
        encodeValue(t) {
          return FE(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const tH = /%(\d[a-f0-9])/gi,
        nH = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "2B": "+",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function FE(n) {
        return encodeURIComponent(n).replace(tH, (t, e) => {
          var i;
          return null !== (i = nH[e]) && void 0 !== i ? i : t;
        });
      }
      function PE(n) {
        return `${n}`;
      }
      class Ti {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new J2()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function eH(n, t) {
              const e = new Map();
              return (
                n.length > 0 &&
                  n
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((r) => {
                      const s = r.indexOf("="),
                        [o, a] =
                          -1 == s
                            ? [t.decodeKey(r), ""]
                            : [
                                t.decodeKey(r.slice(0, s)),
                                t.decodeValue(r.slice(s + 1)),
                              ],
                        l = e.get(o) || [];
                      l.push(a), e.set(o, l);
                    }),
                e
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((e) => {
                  const i = t.fromObject[e];
                  this.map.set(e, Array.isArray(i) ? i : [i]);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const e = this.map.get(t);
          return e ? e[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: "a" });
        }
        appendAll(t) {
          const e = [];
          return (
            Object.keys(t).forEach((i) => {
              const r = t[i];
              Array.isArray(r)
                ? r.forEach((s) => {
                    e.push({ param: i, value: s, op: "a" });
                  })
                : e.push({ param: i, value: r, op: "a" });
            }),
            this.clone(e)
          );
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const e = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((i) => e + "=" + this.encoder.encodeValue(i))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const e = new Ti({ encoder: this.encoder });
          return (
            (e.cloneFrom = this.cloneFrom || this),
            (e.updates = (this.updates || []).concat(t)),
            e
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const e =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    e.push(PE(t.value)), this.map.set(t.param, e);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let i = this.map.get(t.param) || [];
                      const r = i.indexOf(PE(t.value));
                      -1 !== r && i.splice(r, 1),
                        i.length > 0
                          ? this.map.set(t.param, i)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class iH {
        constructor() {
          this.map = new Map();
        }
        set(t, e) {
          return this.map.set(t, e), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function NE(n) {
        return "undefined" != typeof ArrayBuffer && n instanceof ArrayBuffer;
      }
      function LE(n) {
        return "undefined" != typeof Blob && n instanceof Blob;
      }
      function VE(n) {
        return "undefined" != typeof FormData && n instanceof FormData;
      }
      class Xo {
        constructor(t, e, i, r) {
          let s;
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function rH(n) {
              switch (n) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || r
              ? ((this.body = void 0 !== i ? i : null), (s = r))
              : (s = i),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.context && (this.context = s.context),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new Ai()),
            this.context || (this.context = new iH()),
            this.params)
          ) {
            const o = this.params.toString();
            if (0 === o.length) this.urlWithParams = e;
            else {
              const a = e.indexOf("?");
              this.urlWithParams =
                e + (-1 === a ? "?" : a < e.length - 1 ? "&" : "") + o;
            }
          } else (this.params = new Ti()), (this.urlWithParams = e);
        }
        serializeBody() {
          return null === this.body
            ? null
            : NE(this.body) ||
              LE(this.body) ||
              VE(this.body) ||
              (function sH(n) {
                return (
                  "undefined" != typeof URLSearchParams &&
                  n instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Ti
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || VE(this.body)
            ? null
            : LE(this.body)
            ? this.body.type || null
            : NE(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Ti
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          var e;
          const i = t.method || this.method,
            r = t.url || this.url,
            s = t.responseType || this.responseType,
            o = void 0 !== t.body ? t.body : this.body,
            a =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            l =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let c = t.headers || this.headers,
            u = t.params || this.params;
          const d = null !== (e = t.context) && void 0 !== e ? e : this.context;
          return (
            void 0 !== t.setHeaders &&
              (c = Object.keys(t.setHeaders).reduce(
                (h, f) => h.set(f, t.setHeaders[f]),
                c
              )),
            t.setParams &&
              (u = Object.keys(t.setParams).reduce(
                (h, f) => h.set(f, t.setParams[f]),
                u
              )),
            new Xo(i, r, o, {
              params: u,
              headers: c,
              context: d,
              reportProgress: l,
              responseType: s,
              withCredentials: a,
            })
          );
        }
      }
      var lt = (() => (
        ((lt = lt || {})[(lt.Sent = 0)] = "Sent"),
        (lt[(lt.UploadProgress = 1)] = "UploadProgress"),
        (lt[(lt.ResponseHeader = 2)] = "ResponseHeader"),
        (lt[(lt.DownloadProgress = 3)] = "DownloadProgress"),
        (lt[(lt.Response = 4)] = "Response"),
        (lt[(lt.User = 5)] = "User"),
        lt
      ))();
      class lp extends class oH {
        constructor(t, e = 200, i = "OK") {
          (this.headers = t.headers || new Ai()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || i),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      } {
        constructor(t = {}) {
          super(t),
            (this.type = lt.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new lp({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      function cp(n, t) {
        return {
          body: t,
          headers: n.headers,
          context: n.context,
          observe: n.observe,
          params: n.params,
          reportProgress: n.reportProgress,
          responseType: n.responseType,
          withCredentials: n.withCredentials,
        };
      }
      let jE = (() => {
        class n {
          constructor(e) {
            this.handler = e;
          }
          request(e, i, r = {}) {
            let s;
            if (e instanceof Xo) s = e;
            else {
              let l, c;
              (l = r.headers instanceof Ai ? r.headers : new Ai(r.headers)),
                r.params &&
                  (c =
                    r.params instanceof Ti
                      ? r.params
                      : new Ti({ fromObject: r.params })),
                (s = new Xo(e, i, void 0 !== r.body ? r.body : null, {
                  headers: l,
                  context: r.context,
                  params: c,
                  reportProgress: r.reportProgress,
                  responseType: r.responseType || "json",
                  withCredentials: r.withCredentials,
                }));
            }
            const o = P(s).pipe(cs((l) => this.handler.handle(l)));
            if (e instanceof Xo || "events" === r.observe) return o;
            const a = o.pipe(Oe((l) => l instanceof lp));
            switch (r.observe || "body") {
              case "body":
                switch (s.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      Q((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      Q((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      Q((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(Q((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${r.observe}}`
                );
            }
          }
          delete(e, i = {}) {
            return this.request("DELETE", e, i);
          }
          get(e, i = {}) {
            return this.request("GET", e, i);
          }
          head(e, i = {}) {
            return this.request("HEAD", e, i);
          }
          jsonp(e, i) {
            return this.request("JSONP", e, {
              params: new Ti().append(i, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(e, i = {}) {
            return this.request("OPTIONS", e, i);
          }
          patch(e, i, r = {}) {
            return this.request("PATCH", e, cp(r, i));
          }
          post(e, i, r = {}) {
            return this.request("POST", e, cp(r, i));
          }
          put(e, i, r = {}) {
            return this.request("PUT", e, cp(r, i));
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(X2));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const lH = ["*"];
      let Tc;
      function Jo(n) {
        var t;
        return (
          (null ===
            (t = (function cH() {
              if (
                void 0 === Tc &&
                ((Tc = null), "undefined" != typeof window)
              ) {
                const n = window;
                void 0 !== n.trustedTypes &&
                  (Tc = n.trustedTypes.createPolicy("angular#components", {
                    createHTML: (t) => t,
                  }));
              }
              return Tc;
            })()) || void 0 === t
            ? void 0
            : t.createHTML(n)) || n
        );
      }
      function HE(n) {
        return Error(`Unable to find icon with the name "${n}"`);
      }
      function UE(n) {
        return Error(
          `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${n}".`
        );
      }
      function $E(n) {
        return Error(
          `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${n}".`
        );
      }
      class dr {
        constructor(t, e, i) {
          (this.url = t), (this.svgText = e), (this.options = i);
        }
      }
      let Ic = (() => {
        class n {
          constructor(e, i, r, s) {
            (this._httpClient = e),
              (this._sanitizer = i),
              (this._errorHandler = s),
              (this._svgIconConfigs = new Map()),
              (this._iconSetConfigs = new Map()),
              (this._cachedIconsByUrl = new Map()),
              (this._inProgressUrlFetches = new Map()),
              (this._fontCssClassesByAlias = new Map()),
              (this._resolvers = []),
              (this._defaultFontSetClass = "material-icons"),
              (this._document = r);
          }
          addSvgIcon(e, i, r) {
            return this.addSvgIconInNamespace("", e, i, r);
          }
          addSvgIconLiteral(e, i, r) {
            return this.addSvgIconLiteralInNamespace("", e, i, r);
          }
          addSvgIconInNamespace(e, i, r, s) {
            return this._addSvgIconConfig(e, i, new dr(r, null, s));
          }
          addSvgIconResolver(e) {
            return this._resolvers.push(e), this;
          }
          addSvgIconLiteralInNamespace(e, i, r, s) {
            const o = this._sanitizer.sanitize(ae.HTML, r);
            if (!o) throw $E(r);
            const a = Jo(o);
            return this._addSvgIconConfig(e, i, new dr("", a, s));
          }
          addSvgIconSet(e, i) {
            return this.addSvgIconSetInNamespace("", e, i);
          }
          addSvgIconSetLiteral(e, i) {
            return this.addSvgIconSetLiteralInNamespace("", e, i);
          }
          addSvgIconSetInNamespace(e, i, r) {
            return this._addSvgIconSetConfig(e, new dr(i, null, r));
          }
          addSvgIconSetLiteralInNamespace(e, i, r) {
            const s = this._sanitizer.sanitize(ae.HTML, i);
            if (!s) throw $E(i);
            const o = Jo(s);
            return this._addSvgIconSetConfig(e, new dr("", o, r));
          }
          registerFontClassAlias(e, i = e) {
            return this._fontCssClassesByAlias.set(e, i), this;
          }
          classNameForFontAlias(e) {
            return this._fontCssClassesByAlias.get(e) || e;
          }
          setDefaultFontSetClass(e) {
            return (this._defaultFontSetClass = e), this;
          }
          getDefaultFontSetClass() {
            return this._defaultFontSetClass;
          }
          getSvgIconFromUrl(e) {
            const i = this._sanitizer.sanitize(ae.RESOURCE_URL, e);
            if (!i) throw UE(e);
            const r = this._cachedIconsByUrl.get(i);
            return r
              ? P(Rc(r))
              : this._loadSvgIconFromConfig(new dr(e, null)).pipe(
                  st((s) => this._cachedIconsByUrl.set(i, s)),
                  Q((s) => Rc(s))
                );
          }
          getNamedSvgIcon(e, i = "") {
            const r = zE(i, e);
            let s = this._svgIconConfigs.get(r);
            if (s) return this._getSvgFromConfig(s);
            if (((s = this._getIconConfigFromResolvers(i, e)), s))
              return this._svgIconConfigs.set(r, s), this._getSvgFromConfig(s);
            const o = this._iconSetConfigs.get(i);
            return o
              ? this._getSvgFromIconSetConfigs(e, o)
              : (function Z2(n, t) {
                  const e = se(n) ? n : () => n,
                    i = (r) => r.error(e());
                  return new he(t ? (r) => t.schedule(i, 0, r) : i);
                })(HE(r));
          }
          ngOnDestroy() {
            (this._resolvers = []),
              this._svgIconConfigs.clear(),
              this._iconSetConfigs.clear(),
              this._cachedIconsByUrl.clear();
          }
          _getSvgFromConfig(e) {
            return e.svgText
              ? P(Rc(this._svgElementFromConfig(e)))
              : this._loadSvgIconFromConfig(e).pipe(Q((i) => Rc(i)));
          }
          _getSvgFromIconSetConfigs(e, i) {
            const r = this._extractIconWithNameFromAnySet(e, i);
            return r
              ? P(r)
              : (function OE(...n) {
                  const t = rm(n),
                    { args: e, keys: i } = CC(n),
                    r = new he((s) => {
                      const { length: o } = e;
                      if (!o) return void s.complete();
                      const a = new Array(o);
                      let l = o,
                        c = o;
                      for (let u = 0; u < o; u++) {
                        let d = !1;
                        xt(e[u]).subscribe(
                          new Se(
                            s,
                            (h) => {
                              d || ((d = !0), c--), (a[u] = h);
                            },
                            () => l--,
                            void 0,
                            () => {
                              (!l || !d) &&
                                (c || s.next(i ? wC(i, a) : a), s.complete());
                            }
                          )
                        );
                      }
                    });
                  return t ? r.pipe(Gh(t)) : r;
                })(
                  i
                    .filter((o) => !o.svgText)
                    .map((o) =>
                      this._loadSvgIconSetFromConfig(o).pipe(
                        ii((a) => {
                          const c = `Loading icon set URL: ${this._sanitizer.sanitize(
                            ae.RESOURCE_URL,
                            o.url
                          )} failed: ${a.message}`;
                          return (
                            this._errorHandler.handleError(new Error(c)),
                            P(null)
                          );
                        })
                      )
                    )
                ).pipe(
                  Q(() => {
                    const o = this._extractIconWithNameFromAnySet(e, i);
                    if (!o) throw HE(e);
                    return o;
                  })
                );
          }
          _extractIconWithNameFromAnySet(e, i) {
            for (let r = i.length - 1; r >= 0; r--) {
              const s = i[r];
              if (s.svgText && s.svgText.toString().indexOf(e) > -1) {
                const o = this._svgElementFromConfig(s),
                  a = this._extractSvgIconFromSet(o, e, s.options);
                if (a) return a;
              }
            }
            return null;
          }
          _loadSvgIconFromConfig(e) {
            return this._fetchIcon(e).pipe(
              st((i) => (e.svgText = i)),
              Q(() => this._svgElementFromConfig(e))
            );
          }
          _loadSvgIconSetFromConfig(e) {
            return e.svgText
              ? P(null)
              : this._fetchIcon(e).pipe(st((i) => (e.svgText = i)));
          }
          _extractSvgIconFromSet(e, i, r) {
            const s = e.querySelector(`[id="${i}"]`);
            if (!s) return null;
            const o = s.cloneNode(!0);
            if ((o.removeAttribute("id"), "svg" === o.nodeName.toLowerCase()))
              return this._setSvgAttributes(o, r);
            if ("symbol" === o.nodeName.toLowerCase())
              return this._setSvgAttributes(this._toSvgElement(o), r);
            const a = this._svgElementFromString(Jo("<svg></svg>"));
            return a.appendChild(o), this._setSvgAttributes(a, r);
          }
          _svgElementFromString(e) {
            const i = this._document.createElement("DIV");
            i.innerHTML = e;
            const r = i.querySelector("svg");
            if (!r) throw Error("<svg> tag not found");
            return r;
          }
          _toSvgElement(e) {
            const i = this._svgElementFromString(Jo("<svg></svg>")),
              r = e.attributes;
            for (let s = 0; s < r.length; s++) {
              const { name: o, value: a } = r[s];
              "id" !== o && i.setAttribute(o, a);
            }
            for (let s = 0; s < e.childNodes.length; s++)
              e.childNodes[s].nodeType === this._document.ELEMENT_NODE &&
                i.appendChild(e.childNodes[s].cloneNode(!0));
            return i;
          }
          _setSvgAttributes(e, i) {
            return (
              e.setAttribute("fit", ""),
              e.setAttribute("height", "100%"),
              e.setAttribute("width", "100%"),
              e.setAttribute("preserveAspectRatio", "xMidYMid meet"),
              e.setAttribute("focusable", "false"),
              i && i.viewBox && e.setAttribute("viewBox", i.viewBox),
              e
            );
          }
          _fetchIcon(e) {
            var i;
            const { url: r, options: s } = e,
              o =
                null !== (i = null == s ? void 0 : s.withCredentials) &&
                void 0 !== i &&
                i;
            if (!this._httpClient)
              throw (function uH() {
                return Error(
                  "Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports."
                );
              })();
            if (null == r) throw Error(`Cannot fetch icon from URL "${r}".`);
            const a = this._sanitizer.sanitize(ae.RESOURCE_URL, r);
            if (!a) throw UE(r);
            const l = this._inProgressUrlFetches.get(a);
            if (l) return l;
            const c = this._httpClient
              .get(a, { responseType: "text", withCredentials: o })
              .pipe(
                Q((u) => Jo(u)),
                TC(() => this._inProgressUrlFetches.delete(a)),
                lm()
              );
            return this._inProgressUrlFetches.set(a, c), c;
          }
          _addSvgIconConfig(e, i, r) {
            return this._svgIconConfigs.set(zE(e, i), r), this;
          }
          _addSvgIconSetConfig(e, i) {
            const r = this._iconSetConfigs.get(e);
            return r ? r.push(i) : this._iconSetConfigs.set(e, [i]), this;
          }
          _svgElementFromConfig(e) {
            if (!e.svgElement) {
              const i = this._svgElementFromString(e.svgText);
              this._setSvgAttributes(i, e.options), (e.svgElement = i);
            }
            return e.svgElement;
          }
          _getIconConfigFromResolvers(e, i) {
            for (let r = 0; r < this._resolvers.length; r++) {
              const s = this._resolvers[r](i, e);
              if (s)
                return hH(s) ? new dr(s.url, null, s.options) : new dr(s, null);
            }
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(C(jE, 8), C(zh), C(Z, 8), C(Qn));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function Rc(n) {
        return n.cloneNode(!0);
      }
      function zE(n, t) {
        return n + ":" + t;
      }
      function hH(n) {
        return !(!n.url || !n.options);
      }
      const fH = pE(
          class {
            constructor(n) {
              this._elementRef = n;
            }
          }
        ),
        pH = new A("mat-icon-location", {
          providedIn: "root",
          factory: function mH() {
            const n = Ru(Z),
              t = n ? n.location : null;
            return { getPathname: () => (t ? t.pathname + t.search : "") };
          },
        }),
        GE = [
          "clip-path",
          "color-profile",
          "src",
          "cursor",
          "fill",
          "filter",
          "marker",
          "marker-start",
          "marker-mid",
          "marker-end",
          "mask",
          "stroke",
        ],
        gH = GE.map((n) => `[${n}]`).join(", "),
        _H = /^url\(['"]?#(.*?)['"]?\)$/;
      let WE = (() => {
          class n extends fH {
            constructor(e, i, r, s, o) {
              super(e),
                (this._iconRegistry = i),
                (this._location = s),
                (this._errorHandler = o),
                (this._inline = !1),
                (this._currentIconFetch = Ve.EMPTY),
                r || e.nativeElement.setAttribute("aria-hidden", "true");
            }
            get inline() {
              return this._inline;
            }
            set inline(e) {
              this._inline = at(e);
            }
            get svgIcon() {
              return this._svgIcon;
            }
            set svgIcon(e) {
              e !== this._svgIcon &&
                (e
                  ? this._updateSvgIcon(e)
                  : this._svgIcon && this._clearSvgElement(),
                (this._svgIcon = e));
            }
            get fontSet() {
              return this._fontSet;
            }
            set fontSet(e) {
              const i = this._cleanupFontValue(e);
              i !== this._fontSet &&
                ((this._fontSet = i), this._updateFontIconClasses());
            }
            get fontIcon() {
              return this._fontIcon;
            }
            set fontIcon(e) {
              const i = this._cleanupFontValue(e);
              i !== this._fontIcon &&
                ((this._fontIcon = i), this._updateFontIconClasses());
            }
            _splitIconName(e) {
              if (!e) return ["", ""];
              const i = e.split(":");
              switch (i.length) {
                case 1:
                  return ["", i[0]];
                case 2:
                  return i;
                default:
                  throw Error(`Invalid icon name: "${e}"`);
              }
            }
            ngOnInit() {
              this._updateFontIconClasses();
            }
            ngAfterViewChecked() {
              const e = this._elementsWithExternalReferences;
              if (e && e.size) {
                const i = this._location.getPathname();
                i !== this._previousPath &&
                  ((this._previousPath = i), this._prependPathToReferences(i));
              }
            }
            ngOnDestroy() {
              this._currentIconFetch.unsubscribe(),
                this._elementsWithExternalReferences &&
                  this._elementsWithExternalReferences.clear();
            }
            _usingFontIcon() {
              return !this.svgIcon;
            }
            _setSvgElement(e) {
              this._clearSvgElement();
              const i = this._location.getPathname();
              (this._previousPath = i),
                this._cacheChildrenWithExternalReferences(e),
                this._prependPathToReferences(i),
                this._elementRef.nativeElement.appendChild(e);
            }
            _clearSvgElement() {
              const e = this._elementRef.nativeElement;
              let i = e.childNodes.length;
              for (
                this._elementsWithExternalReferences &&
                this._elementsWithExternalReferences.clear();
                i--;

              ) {
                const r = e.childNodes[i];
                (1 !== r.nodeType || "svg" === r.nodeName.toLowerCase()) &&
                  r.remove();
              }
            }
            _updateFontIconClasses() {
              if (!this._usingFontIcon()) return;
              const e = this._elementRef.nativeElement,
                i = this.fontSet
                  ? this._iconRegistry.classNameForFontAlias(this.fontSet)
                  : this._iconRegistry.getDefaultFontSetClass();
              i != this._previousFontSetClass &&
                (this._previousFontSetClass &&
                  e.classList.remove(this._previousFontSetClass),
                i && e.classList.add(i),
                (this._previousFontSetClass = i)),
                this.fontIcon != this._previousFontIconClass &&
                  (this._previousFontIconClass &&
                    e.classList.remove(this._previousFontIconClass),
                  this.fontIcon && e.classList.add(this.fontIcon),
                  (this._previousFontIconClass = this.fontIcon));
            }
            _cleanupFontValue(e) {
              return "string" == typeof e ? e.trim().split(" ")[0] : e;
            }
            _prependPathToReferences(e) {
              const i = this._elementsWithExternalReferences;
              i &&
                i.forEach((r, s) => {
                  r.forEach((o) => {
                    s.setAttribute(o.name, `url('${e}#${o.value}')`);
                  });
                });
            }
            _cacheChildrenWithExternalReferences(e) {
              const i = e.querySelectorAll(gH),
                r = (this._elementsWithExternalReferences =
                  this._elementsWithExternalReferences || new Map());
              for (let s = 0; s < i.length; s++)
                GE.forEach((o) => {
                  const a = i[s],
                    l = a.getAttribute(o),
                    c = l ? l.match(_H) : null;
                  if (c) {
                    let u = r.get(a);
                    u || ((u = []), r.set(a, u)),
                      u.push({ name: o, value: c[1] });
                  }
                });
            }
            _updateSvgIcon(e) {
              if (
                ((this._svgNamespace = null),
                (this._svgName = null),
                this._currentIconFetch.unsubscribe(),
                e)
              ) {
                const [i, r] = this._splitIconName(e);
                i && (this._svgNamespace = i),
                  r && (this._svgName = r),
                  (this._currentIconFetch = this._iconRegistry
                    .getNamedSvgIcon(r, i)
                    .pipe(ze(1))
                    .subscribe(
                      (s) => this._setSvgElement(s),
                      (s) => {
                        this._errorHandler.handleError(
                          new Error(
                            `Error retrieving icon ${i}:${r}! ${s.message}`
                          )
                        );
                      }
                    ));
              }
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                y(_e),
                y(Ic),
                gi("aria-hidden"),
                y(pH),
                y(Qn)
              );
            }),
            (n.ɵcmp = ye({
              type: n,
              selectors: [["mat-icon"]],
              hostAttrs: ["role", "img", 1, "mat-icon", "notranslate"],
              hostVars: 7,
              hostBindings: function (e, i) {
                2 & e &&
                  (qe(
                    "data-mat-icon-type",
                    i._usingFontIcon() ? "font" : "svg"
                  )("data-mat-icon-name", i._svgName || i.fontIcon)(
                    "data-mat-icon-namespace",
                    i._svgNamespace || i.fontSet
                  ),
                  Je("mat-icon-inline", i.inline)(
                    "mat-icon-no-color",
                    "primary" !== i.color &&
                      "accent" !== i.color &&
                      "warn" !== i.color
                  ));
              },
              inputs: {
                color: "color",
                inline: "inline",
                svgIcon: "svgIcon",
                fontSet: "fontSet",
                fontIcon: "fontIcon",
              },
              exportAs: ["matIcon"],
              features: [q],
              ngContentSelectors: lH,
              decls: 1,
              vars: 0,
              template: function (e, i) {
                1 & e && (_n(), Xe(0));
              },
              styles: [
                ".mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        yH = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({ imports: [[Fe], Fe] })),
            n
          );
        })(),
        vH = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵcmp = ye({
              type: n,
              selectors: [["app-number"]],
              decls: 19,
              vars: 0,
              consts: [
                [
                  2,
                  "display",
                  "flex",
                  "align-items",
                  "center",
                  "justify-content",
                  "space-around",
                  "width",
                  "300px",
                ],
                [1, "btn"],
                ["href", "tel:917249328035"],
                [
                  "href",
                  "https://wa.me/7249328035",
                  2,
                  "text-decoration",
                  "none",
                ],
                [1, "fa", "fa-whatsapp"],
              ],
              template: function (e, i) {
                1 & e &&
                  (g(0, "mat-dialog-content"),
                  g(1, "div", 0),
                  g(2, "div"),
                  g(3, "button", 1),
                  g(4, "a", 2),
                  g(5, "mat-icon"),
                  E(6, " phone"),
                  _(),
                  _(),
                  _(),
                  _(),
                  g(7, "div"),
                  g(8, "h3"),
                  E(9, "+91-7249328035"),
                  _(),
                  _(),
                  _(),
                  g(10, "div", 0),
                  g(11, "div"),
                  g(12, "button", 1),
                  g(13, "mat-icon"),
                  g(14, "a", 3),
                  L(15, "i", 4),
                  _(),
                  _(),
                  _(),
                  _(),
                  g(16, "div"),
                  g(17, "h3"),
                  E(18, "+91-7249328035"),
                  _(),
                  _(),
                  _(),
                  _());
              },
              directives: [Q2, WE],
              styles: [""],
            })),
            n
          );
        })(),
        KE = (() => {
          class n {
            constructor() {
              this._listeners = [];
            }
            notify(e, i) {
              for (let r of this._listeners) r(e, i);
            }
            listen(e) {
              return (
                this._listeners.push(e),
                () => {
                  this._listeners = this._listeners.filter((i) => e !== i);
                }
              );
            }
            ngOnDestroy() {
              this._listeners = [];
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        yU = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({ imports: [[Fe], Fe] })),
            n
          );
        })();
      const eM = ["*"],
        bU = [
          [
            ["", "mat-list-avatar", ""],
            ["", "mat-list-icon", ""],
            ["", "matListAvatar", ""],
            ["", "matListIcon", ""],
          ],
          [
            ["", "mat-line", ""],
            ["", "matLine", ""],
          ],
          "*",
        ],
        CU = [
          "[mat-list-avatar], [mat-list-icon], [matListAvatar], [matListIcon]",
          "[mat-line], [matLine]",
          "*",
        ],
        SU = fE(Yo(class {})),
        xU = Yo(class {}),
        AU = new A("MatList"),
        tM = new A("MatNavList");
      let TU = (() => {
          class n extends SU {
            constructor() {
              super(...arguments), (this._stateChanges = new K());
            }
            ngOnChanges() {
              this._stateChanges.next();
            }
            ngOnDestroy() {
              this._stateChanges.complete();
            }
          }
          return (
            (n.ɵfac = (function () {
              let t;
              return function (i) {
                return (t || (t = rt(n)))(i || n);
              };
            })()),
            (n.ɵcmp = ye({
              type: n,
              selectors: [["mat-nav-list"]],
              hostAttrs: [
                "role",
                "navigation",
                1,
                "mat-nav-list",
                "mat-list-base",
              ],
              inputs: { disableRipple: "disableRipple", disabled: "disabled" },
              exportAs: ["matNavList"],
              features: [ce([{ provide: tM, useExisting: n }]), q, it],
              ngContentSelectors: eM,
              decls: 1,
              vars: 0,
              template: function (e, i) {
                1 & e && (_n(), Xe(0));
              },
              styles: [
                '.mat-subheader{display:flex;box-sizing:border-box;padding:16px;align-items:center}.mat-list-base .mat-subheader{margin:0}button.mat-list-item,button.mat-list-option{padding:0;width:100%;background:none;color:inherit;border:none;outline:inherit;-webkit-tap-highlight-color:transparent;text-align:left}[dir=rtl] button.mat-list-item,[dir=rtl] button.mat-list-option{text-align:right}button.mat-list-item::-moz-focus-inner,button.mat-list-option::-moz-focus-inner{border:0}.mat-list-base{padding-top:8px;display:block;-webkit-tap-highlight-color:transparent}.mat-list-base .mat-subheader{height:48px;line-height:16px}.mat-list-base .mat-subheader:first-child{margin-top:-8px}.mat-list-base .mat-list-item,.mat-list-base .mat-list-option{display:block;height:48px;-webkit-tap-highlight-color:transparent;width:100%;padding:0}.mat-list-base .mat-list-item .mat-list-item-content,.mat-list-base .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list-base .mat-list-item .mat-list-item-content-reverse,.mat-list-base .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list-base .mat-list-item .mat-list-item-ripple,.mat-list-base .mat-list-option .mat-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list-base .mat-list-item.mat-list-item-with-avatar,.mat-list-base .mat-list-option.mat-list-item-with-avatar{height:56px}.mat-list-base .mat-list-item.mat-2-line,.mat-list-base .mat-list-option.mat-2-line{height:72px}.mat-list-base .mat-list-item.mat-3-line,.mat-list-base .mat-list-option.mat-3-line{height:88px}.mat-list-base .mat-list-item.mat-multi-line,.mat-list-base .mat-list-option.mat-multi-line{height:auto}.mat-list-base .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list-base .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list-base .mat-list-item .mat-list-text,.mat-list-base .mat-list-option .mat-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.mat-list-base .mat-list-item .mat-list-text>*,.mat-list-base .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-list-base .mat-list-item .mat-list-text:empty,.mat-list-base .mat-list-option .mat-list-text:empty{display:none}.mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:0;padding-left:16px}[dir=rtl] .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:0}.mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-left:0;padding-right:16px}[dir=rtl] .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:0;padding-left:16px}.mat-list-base .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:16px}.mat-list-base .mat-list-item .mat-list-avatar,.mat-list-base .mat-list-option .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%;object-fit:cover}.mat-list-base .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-list-base .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:72px;width:calc(100% - 72px)}[dir=rtl] .mat-list-base .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-list-base .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:auto;margin-right:72px}.mat-list-base .mat-list-item .mat-list-icon,.mat-list-base .mat-list-option .mat-list-icon{flex-shrink:0;width:24px;height:24px;font-size:24px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-list-base .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-list-base .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:64px;width:calc(100% - 64px)}[dir=rtl] .mat-list-base .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-list-base .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:auto;margin-right:64px}.mat-list-base .mat-list-item .mat-divider,.mat-list-base .mat-list-option .mat-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mat-list-base .mat-list-item .mat-divider,[dir=rtl] .mat-list-base .mat-list-option .mat-divider{margin-left:auto;margin-right:0}.mat-list-base .mat-list-item .mat-divider.mat-divider-inset,.mat-list-base .mat-list-option .mat-divider.mat-divider-inset{position:absolute}.mat-list-base[dense]{padding-top:4px;display:block}.mat-list-base[dense] .mat-subheader{height:40px;line-height:8px}.mat-list-base[dense] .mat-subheader:first-child{margin-top:-4px}.mat-list-base[dense] .mat-list-item,.mat-list-base[dense] .mat-list-option{display:block;height:40px;-webkit-tap-highlight-color:transparent;width:100%;padding:0}.mat-list-base[dense] .mat-list-item .mat-list-item-content,.mat-list-base[dense] .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list-base[dense] .mat-list-item .mat-list-item-content-reverse,.mat-list-base[dense] .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list-base[dense] .mat-list-item .mat-list-item-ripple,.mat-list-base[dense] .mat-list-option .mat-list-item-ripple{display:block;top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar{height:48px}.mat-list-base[dense] .mat-list-item.mat-2-line,.mat-list-base[dense] .mat-list-option.mat-2-line{height:60px}.mat-list-base[dense] .mat-list-item.mat-3-line,.mat-list-base[dense] .mat-list-option.mat-3-line{height:76px}.mat-list-base[dense] .mat-list-item.mat-multi-line,.mat-list-base[dense] .mat-list-option.mat-multi-line{height:auto}.mat-list-base[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list-base[dense] .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list-base[dense] .mat-list-item .mat-list-text,.mat-list-base[dense] .mat-list-option .mat-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden;padding:0}.mat-list-base[dense] .mat-list-item .mat-list-text>*,.mat-list-base[dense] .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-list-base[dense] .mat-list-item .mat-list-text:empty,.mat-list-base[dense] .mat-list-option .mat-list-text:empty{display:none}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:0;padding-left:16px}[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:0}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-left:0;padding-right:16px}[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:0;padding-left:16px}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:16px}.mat-list-base[dense] .mat-list-item .mat-list-avatar,.mat-list-base[dense] .mat-list-option .mat-list-avatar{flex-shrink:0;width:36px;height:36px;border-radius:50%;object-fit:cover}.mat-list-base[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-list-base[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:68px;width:calc(100% - 68px)}[dir=rtl] .mat-list-base[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-list-base[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:auto;margin-right:68px}.mat-list-base[dense] .mat-list-item .mat-list-icon,.mat-list-base[dense] .mat-list-option .mat-list-icon{flex-shrink:0;width:20px;height:20px;font-size:20px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-list-base[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-list-base[dense] .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:60px;width:calc(100% - 60px)}[dir=rtl] .mat-list-base[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-list-base[dense] .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:auto;margin-right:60px}.mat-list-base[dense] .mat-list-item .mat-divider,.mat-list-base[dense] .mat-list-option .mat-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mat-list-base[dense] .mat-list-item .mat-divider,[dir=rtl] .mat-list-base[dense] .mat-list-option .mat-divider{margin-left:auto;margin-right:0}.mat-list-base[dense] .mat-list-item .mat-divider.mat-divider-inset,.mat-list-base[dense] .mat-list-option .mat-divider.mat-divider-inset{position:absolute}.mat-nav-list a{text-decoration:none;color:inherit}.mat-nav-list .mat-list-item{cursor:pointer;outline:none}mat-action-list .mat-list-item{cursor:pointer;outline:inherit}.mat-list-option:not(.mat-list-item-disabled){cursor:pointer;outline:none}.mat-list-item-disabled{pointer-events:none}.cdk-high-contrast-active .mat-list-item-disabled{opacity:.5}.cdk-high-contrast-active :host .mat-list-item-disabled{opacity:.5}.cdk-high-contrast-active .mat-selection-list:focus{outline-style:dotted}.cdk-high-contrast-active .mat-list-option:hover,.cdk-high-contrast-active .mat-list-option:focus,.cdk-high-contrast-active .mat-nav-list .mat-list-item:hover,.cdk-high-contrast-active .mat-nav-list .mat-list-item:focus,.cdk-high-contrast-active mat-action-list .mat-list-item:hover,.cdk-high-contrast-active mat-action-list .mat-list-item:focus{outline:dotted 1px;z-index:1}.cdk-high-contrast-active .mat-list-single-selected-option::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}.cdk-high-contrast-active [dir=rtl] .mat-list-single-selected-option::after{right:auto;left:16px}@media(hover: none){.mat-list-option:not(.mat-list-single-selected-option):not(.mat-list-item-disabled):hover,.mat-nav-list .mat-list-item:not(.mat-list-item-disabled):hover,.mat-action-list .mat-list-item:not(.mat-list-item-disabled):hover{background:none}}\n',
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        nM = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [
                ["", "mat-list-avatar", ""],
                ["", "matListAvatar", ""],
              ],
              hostAttrs: [1, "mat-list-avatar"],
            })),
            n
          );
        })(),
        iM = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [
                ["", "mat-list-icon", ""],
                ["", "matListIcon", ""],
              ],
              hostAttrs: [1, "mat-list-icon"],
            })),
            n
          );
        })(),
        IU = (() => {
          class n extends xU {
            constructor(e, i, r, s) {
              super(),
                (this._element = e),
                (this._isInteractiveList = !1),
                (this._destroyed = new K()),
                (this._disabled = !1),
                (this._isInteractiveList = !!(
                  r ||
                  (s && "action-list" === s._getListType())
                )),
                (this._list = r || s);
              const o = this._getHostElement();
              "button" === o.nodeName.toLowerCase() &&
                !o.hasAttribute("type") &&
                o.setAttribute("type", "button"),
                this._list &&
                  this._list._stateChanges
                    .pipe(oi(this._destroyed))
                    .subscribe(() => {
                      i.markForCheck();
                    });
            }
            get disabled() {
              return this._disabled || !(!this._list || !this._list.disabled);
            }
            set disabled(e) {
              this._disabled = at(e);
            }
            ngAfterContentInit() {
              !(function gE(n, t, e = "mat") {
                n.changes.pipe(Xi(n)).subscribe(({ length: i }) => {
                  Zo(t, `${e}-2-line`, !1),
                    Zo(t, `${e}-3-line`, !1),
                    Zo(t, `${e}-multi-line`, !1),
                    2 === i || 3 === i
                      ? Zo(t, `${e}-${i}-line`, !0)
                      : i > 3 && Zo(t, `${e}-multi-line`, !0);
                });
              })(this._lines, this._element);
            }
            ngOnDestroy() {
              this._destroyed.next(), this._destroyed.complete();
            }
            _isRippleDisabled() {
              return (
                !this._isInteractiveList ||
                this.disableRipple ||
                !(!this._list || !this._list.disableRipple)
              );
            }
            _getHostElement() {
              return this._element.nativeElement;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(y(_e), y(tn), y(tM, 8), y(AU, 8));
            }),
            (n.ɵcmp = ye({
              type: n,
              selectors: [
                ["mat-list-item"],
                ["a", "mat-list-item", ""],
                ["button", "mat-list-item", ""],
              ],
              contentQueries: function (e, i, r) {
                if (
                  (1 & e && (Bt(r, nM, 5), Bt(r, iM, 5), Bt(r, mE, 5)), 2 & e)
                ) {
                  let s;
                  et((s = tt())) && (i._avatar = s.first),
                    et((s = tt())) && (i._icon = s.first),
                    et((s = tt())) && (i._lines = s);
                }
              },
              hostAttrs: [1, "mat-list-item", "mat-focus-indicator"],
              hostVars: 6,
              hostBindings: function (e, i) {
                2 & e &&
                  Je("mat-list-item-disabled", i.disabled)(
                    "mat-list-item-avatar",
                    i._avatar || i._icon
                  )("mat-list-item-with-avatar", i._avatar || i._icon);
              },
              inputs: { disableRipple: "disableRipple", disabled: "disabled" },
              exportAs: ["matListItem"],
              features: [q],
              ngContentSelectors: CU,
              decls: 6,
              vars: 2,
              consts: [
                [1, "mat-list-item-content"],
                [
                  "mat-ripple",
                  "",
                  1,
                  "mat-list-item-ripple",
                  3,
                  "matRippleTrigger",
                  "matRippleDisabled",
                ],
                [1, "mat-list-text"],
              ],
              template: function (e, i) {
                1 & e &&
                  (_n(bU),
                  g(0, "span", 0),
                  L(1, "span", 1),
                  Xe(2),
                  g(3, "span", 2),
                  Xe(4, 1),
                  _(),
                  Xe(5, 2),
                  _()),
                  2 & e &&
                    (Nt(1),
                    ft("matRippleTrigger", i._getHostElement())(
                      "matRippleDisabled",
                      i._isRippleDisabled()
                    ));
              },
              directives: [Ac],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        NU = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({ imports: [[_E, CE, Fe, wE, Eo], _E, Fe, wE, yU] })),
            n
          );
        })(),
        LU = (() => {
          class n {
            constructor(e) {
              this.di = e;
            }
            ngOnInit() {}
            openDialog() {
              this.di.open(vH);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(y(kE));
            }),
            (n.ɵcmp = ye({
              type: n,
              selectors: [["app-sidebar"]],
              decls: 20,
              vars: 0,
              consts: [
                [2, "min-width", "250px"],
                [1, "icons"],
                ["mat-list-item", "", "routerLink", "home"],
                [
                  "mat-list-item",
                  "",
                  "href",
                  "https://www.linkedin.com/in/afifahmad-nadaf-387095243",
                  "target",
                  "_blank",
                ],
                ["mat-list-item", "", "routerLink", "table", 3, "click"],
                ["mat-list-item", "", "routerLink", "project"],
                ["mat-list-item", "", "routerLink", "about"],
              ],
              template: function (e, i) {
                1 & e &&
                  (g(0, "mat-nav-list", 0),
                  g(1, "div", 1),
                  g(2, "a", 2),
                  g(3, "mat-icon"),
                  E(4, "home"),
                  _(),
                  E(5, "\xa0 Home"),
                  _(),
                  g(6, "a", 3),
                  g(7, "mat-icon"),
                  E(8, "linkedin"),
                  _(),
                  E(9, "\xa0LinkedIn "),
                  _(),
                  g(10, "a", 4),
                  be("click", function () {
                    return i.openDialog();
                  }),
                  g(11, "mat-icon"),
                  E(12, "phone"),
                  _(),
                  E(13, "\xa0 Contact"),
                  _(),
                  g(14, "a", 5),
                  E(15, " \u2192\xa0 Projects"),
                  _(),
                  g(16, "a", 6),
                  g(17, "mat-icon"),
                  E(18, "face"),
                  _(),
                  E(19, "\xa0 About Me"),
                  _(),
                  _(),
                  _());
              },
              directives: [TU, IU, Zl, WE],
              styles: [
                ".mat-list-item[_ngcontent-%COMP%]{color:#000;width:300px}.icon[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}img[_ngcontent-%COMP%]{max-width:100px;animation-name:img;transition:.5s}img[_ngcontent-%COMP%]:hover{max-width:121.8px}.right[_ngcontent-%COMP%]{animation-name:pop;animation-duration:3s;align-self:flex-start}.left[_ngcontent-%COMP%]{position:relative;top:-20px;align-self:flex-end}@keyframes pop{0%{opacity:0}to{opacity:90}}",
              ],
            })),
            n
          );
        })(),
        VU = 0;
      const Op = new A("CdkAccordion");
      let BU = (() => {
          class n {
            constructor() {
              (this._stateChanges = new K()),
                (this._openCloseAllActions = new K()),
                (this.id = "cdk-accordion-" + VU++),
                (this._multi = !1);
            }
            get multi() {
              return this._multi;
            }
            set multi(e) {
              this._multi = at(e);
            }
            openAll() {
              this._multi && this._openCloseAllActions.next(!0);
            }
            closeAll() {
              this._openCloseAllActions.next(!1);
            }
            ngOnChanges(e) {
              this._stateChanges.next(e);
            }
            ngOnDestroy() {
              this._stateChanges.complete(),
                this._openCloseAllActions.complete();
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [["cdk-accordion"], ["", "cdkAccordion", ""]],
              inputs: { multi: "multi" },
              exportAs: ["cdkAccordion"],
              features: [ce([{ provide: Op, useExisting: n }]), it],
            })),
            n
          );
        })(),
        jU = 0,
        HU = (() => {
          class n {
            constructor(e, i, r) {
              (this.accordion = e),
                (this._changeDetectorRef = i),
                (this._expansionDispatcher = r),
                (this._openCloseAllSubscription = Ve.EMPTY),
                (this.closed = new ee()),
                (this.opened = new ee()),
                (this.destroyed = new ee()),
                (this.expandedChange = new ee()),
                (this.id = "cdk-accordion-child-" + jU++),
                (this._expanded = !1),
                (this._disabled = !1),
                (this._removeUniqueSelectionListener = () => {}),
                (this._removeUniqueSelectionListener = r.listen((s, o) => {
                  this.accordion &&
                    !this.accordion.multi &&
                    this.accordion.id === o &&
                    this.id !== s &&
                    (this.expanded = !1);
                })),
                this.accordion &&
                  (this._openCloseAllSubscription =
                    this._subscribeToOpenCloseAllActions());
            }
            get expanded() {
              return this._expanded;
            }
            set expanded(e) {
              (e = at(e)),
                this._expanded !== e &&
                  ((this._expanded = e),
                  this.expandedChange.emit(e),
                  e
                    ? (this.opened.emit(),
                      this._expansionDispatcher.notify(
                        this.id,
                        this.accordion ? this.accordion.id : this.id
                      ))
                    : this.closed.emit(),
                  this._changeDetectorRef.markForCheck());
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(e) {
              this._disabled = at(e);
            }
            ngOnDestroy() {
              this.opened.complete(),
                this.closed.complete(),
                this.destroyed.emit(),
                this.destroyed.complete(),
                this._removeUniqueSelectionListener(),
                this._openCloseAllSubscription.unsubscribe();
            }
            toggle() {
              this.disabled || (this.expanded = !this.expanded);
            }
            close() {
              this.disabled || (this.expanded = !1);
            }
            open() {
              this.disabled || (this.expanded = !0);
            }
            _subscribeToOpenCloseAllActions() {
              return this.accordion._openCloseAllActions.subscribe((e) => {
                this.disabled || (this.expanded = e);
              });
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(y(Op, 12), y(tn), y(KE));
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [["cdk-accordion-item"], ["", "cdkAccordionItem", ""]],
              inputs: { expanded: "expanded", disabled: "disabled" },
              outputs: {
                closed: "closed",
                opened: "opened",
                destroyed: "destroyed",
                expandedChange: "expandedChange",
              },
              exportAs: ["cdkAccordionItem"],
              features: [ce([{ provide: Op, useValue: void 0 }])],
            })),
            n
          );
        })(),
        UU = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({})),
            n
          );
        })();
      const $U = ["body"];
      function zU(n, t) {}
      const GU = [[["mat-expansion-panel-header"]], "*", [["mat-action-row"]]],
        WU = ["mat-expansion-panel-header", "*", "mat-action-row"];
      function qU(n, t) {
        1 & n && L(0, "span", 2),
          2 & n && ft("@indicatorRotate", vi()._getExpandedState());
      }
      const KU = [[["mat-panel-title"]], [["mat-panel-description"]], "*"],
        QU = ["mat-panel-title", "mat-panel-description", "*"],
        Fp = new A("MAT_ACCORDION"),
        sM = "225ms cubic-bezier(0.4,0.0,0.2,1)",
        oM = {
          indicatorRotate: qo("indicatorRotate", [
            Hn("collapsed, void", St({ transform: "rotate(0deg)" })),
            Hn("expanded", St({ transform: "rotate(180deg)" })),
            Ei("expanded <=> collapsed, void => collapsed", Di(sM)),
          ]),
          bodyExpansion: qo("bodyExpansion", [
            Hn("collapsed, void", St({ height: "0px", visibility: "hidden" })),
            Hn("expanded", St({ height: "*", visibility: "visible" })),
            Ei("expanded <=> collapsed, void => collapsed", Di(sM)),
          ]),
        };
      let YU = (() => {
          class n {
            constructor(e) {
              this._template = e;
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(y(en));
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [["ng-template", "matExpansionPanelContent", ""]],
            })),
            n
          );
        })(),
        ZU = 0;
      const aM = new A("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS");
      let lM = (() => {
        class n extends HU {
          constructor(e, i, r, s, o, a, l) {
            super(e, i, r),
              (this._viewContainerRef = s),
              (this._animationMode = a),
              (this._hideToggle = !1),
              (this.afterExpand = new ee()),
              (this.afterCollapse = new ee()),
              (this._inputChanges = new K()),
              (this._headerId = "mat-expansion-panel-header-" + ZU++),
              (this._bodyAnimationDone = new K()),
              (this.accordion = e),
              (this._document = o),
              this._bodyAnimationDone
                .pipe(
                  nD(
                    (c, u) =>
                      c.fromState === u.fromState && c.toState === u.toState
                  )
                )
                .subscribe((c) => {
                  "void" !== c.fromState &&
                    ("expanded" === c.toState
                      ? this.afterExpand.emit()
                      : "collapsed" === c.toState && this.afterCollapse.emit());
                }),
              l && (this.hideToggle = l.hideToggle);
          }
          get hideToggle() {
            return (
              this._hideToggle || (this.accordion && this.accordion.hideToggle)
            );
          }
          set hideToggle(e) {
            this._hideToggle = at(e);
          }
          get togglePosition() {
            return (
              this._togglePosition ||
              (this.accordion && this.accordion.togglePosition)
            );
          }
          set togglePosition(e) {
            this._togglePosition = e;
          }
          _hasSpacing() {
            return (
              !!this.accordion &&
              this.expanded &&
              "default" === this.accordion.displayMode
            );
          }
          _getExpandedState() {
            return this.expanded ? "expanded" : "collapsed";
          }
          toggle() {
            this.expanded = !this.expanded;
          }
          close() {
            this.expanded = !1;
          }
          open() {
            this.expanded = !0;
          }
          ngAfterContentInit() {
            this._lazyContent &&
              this.opened
                .pipe(
                  Xi(null),
                  Oe(() => this.expanded && !this._portal),
                  ze(1)
                )
                .subscribe(() => {
                  this._portal = new ic(
                    this._lazyContent._template,
                    this._viewContainerRef
                  );
                });
          }
          ngOnChanges(e) {
            this._inputChanges.next(e);
          }
          ngOnDestroy() {
            super.ngOnDestroy(),
              this._bodyAnimationDone.complete(),
              this._inputChanges.complete();
          }
          _containsFocus() {
            if (this._body) {
              const e = this._document.activeElement,
                i = this._body.nativeElement;
              return e === i || i.contains(e);
            }
            return !1;
          }
        }
        return (
          (n.ɵfac = function (e) {
            return new (e || n)(
              y(Fp, 12),
              y(tn),
              y(KE),
              y(Vt),
              y(Z),
              y(xi, 8),
              y(aM, 8)
            );
          }),
          (n.ɵcmp = ye({
            type: n,
            selectors: [["mat-expansion-panel"]],
            contentQueries: function (e, i, r) {
              if ((1 & e && Bt(r, YU, 5), 2 & e)) {
                let s;
                et((s = tt())) && (i._lazyContent = s.first);
              }
            },
            viewQuery: function (e, i) {
              if ((1 & e && is($U, 5), 2 & e)) {
                let r;
                et((r = tt())) && (i._body = r.first);
              }
            },
            hostAttrs: [1, "mat-expansion-panel"],
            hostVars: 6,
            hostBindings: function (e, i) {
              2 & e &&
                Je("mat-expanded", i.expanded)(
                  "_mat-animation-noopable",
                  "NoopAnimations" === i._animationMode
                )("mat-expansion-panel-spacing", i._hasSpacing());
            },
            inputs: {
              disabled: "disabled",
              expanded: "expanded",
              hideToggle: "hideToggle",
              togglePosition: "togglePosition",
            },
            outputs: {
              opened: "opened",
              closed: "closed",
              expandedChange: "expandedChange",
              afterExpand: "afterExpand",
              afterCollapse: "afterCollapse",
            },
            exportAs: ["matExpansionPanel"],
            features: [ce([{ provide: Fp, useValue: void 0 }]), q, it],
            ngContentSelectors: WU,
            decls: 7,
            vars: 4,
            consts: [
              ["role", "region", 1, "mat-expansion-panel-content", 3, "id"],
              ["body", ""],
              [1, "mat-expansion-panel-body"],
              [3, "cdkPortalOutlet"],
            ],
            template: function (e, i) {
              1 & e &&
                (_n(GU),
                Xe(0),
                g(1, "div", 0, 1),
                be("@bodyExpansion.done", function (s) {
                  return i._bodyAnimationDone.next(s);
                }),
                g(3, "div", 2),
                Xe(4, 1),
                Pn(5, zU, 0, 0, "ng-template", 3),
                _(),
                Xe(6, 2),
                _()),
                2 & e &&
                  (Nt(1),
                  ft("@bodyExpansion", i._getExpandedState())("id", i.id),
                  qe("aria-labelledby", i._headerId),
                  Nt(4),
                  ft("cdkPortalOutlet", i._portal));
            },
            directives: [Go],
            styles: [
              '.mat-expansion-panel{box-sizing:content-box;display:block;margin:0;border-radius:4px;overflow:hidden;transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);position:relative}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:4px;border-top-left-radius:4px}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.cdk-high-contrast-active .mat-expansion-panel{outline:solid 1px}.mat-expansion-panel.ng-animate-disabled,.ng-animate-disabled .mat-expansion-panel,.mat-expansion-panel._mat-animation-noopable{transition:none}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible}.mat-expansion-panel-content[style*="visibility: hidden"] *{visibility:hidden !important}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.mat-action-row .mat-button-base,.mat-action-row .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row .mat-button-base,[dir=rtl] .mat-action-row .mat-mdc-button-base{margin-left:0;margin-right:8px}\n',
            ],
            encapsulation: 2,
            data: { animation: [oM.bodyExpansion] },
            changeDetection: 0,
          })),
          n
        );
      })();
      class XU {}
      const JU = e2(XU);
      let cM = (() => {
          class n extends JU {
            constructor(e, i, r, s, o, a, l) {
              super(),
                (this.panel = e),
                (this._element = i),
                (this._focusMonitor = r),
                (this._changeDetectorRef = s),
                (this._animationMode = a),
                (this._parentChangeSubscription = Ve.EMPTY);
              const c = e.accordion
                ? e.accordion._stateChanges.pipe(
                    Oe((u) => !(!u.hideToggle && !u.togglePosition))
                  )
                : Sn;
              (this.tabIndex = parseInt(l || "") || 0),
                (this._parentChangeSubscription = ca(
                  e.opened,
                  e.closed,
                  c,
                  e._inputChanges.pipe(
                    Oe(
                      (u) => !!(u.hideToggle || u.disabled || u.togglePosition)
                    )
                  )
                ).subscribe(() => this._changeDetectorRef.markForCheck())),
                e.closed
                  .pipe(Oe(() => e._containsFocus()))
                  .subscribe(() => r.focusVia(i, "program")),
                o &&
                  ((this.expandedHeight = o.expandedHeight),
                  (this.collapsedHeight = o.collapsedHeight));
            }
            get disabled() {
              return this.panel.disabled;
            }
            _toggle() {
              this.disabled || this.panel.toggle();
            }
            _isExpanded() {
              return this.panel.expanded;
            }
            _getExpandedState() {
              return this.panel._getExpandedState();
            }
            _getPanelId() {
              return this.panel.id;
            }
            _getTogglePosition() {
              return this.panel.togglePosition;
            }
            _showToggle() {
              return !this.panel.hideToggle && !this.panel.disabled;
            }
            _getHeaderHeight() {
              const e = this._isExpanded();
              return e && this.expandedHeight
                ? this.expandedHeight
                : !e && this.collapsedHeight
                ? this.collapsedHeight
                : null;
            }
            _keydown(e) {
              switch (e.keyCode) {
                case 32:
                case 13:
                  ys(e) || (e.preventDefault(), this._toggle());
                  break;
                default:
                  return void (
                    this.panel.accordion &&
                    this.panel.accordion._handleHeaderKeydown(e)
                  );
              }
            }
            focus(e, i) {
              e
                ? this._focusMonitor.focusVia(this._element, e, i)
                : this._element.nativeElement.focus(i);
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._element).subscribe((e) => {
                e &&
                  this.panel.accordion &&
                  this.panel.accordion._handleHeaderFocus(this);
              });
            }
            ngOnDestroy() {
              this._parentChangeSubscription.unsubscribe(),
                this._focusMonitor.stopMonitoring(this._element);
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)(
                y(lM, 1),
                y(_e),
                y(ac),
                y(tn),
                y(aM, 8),
                y(xi, 8),
                gi("tabindex")
              );
            }),
            (n.ɵcmp = ye({
              type: n,
              selectors: [["mat-expansion-panel-header"]],
              hostAttrs: [
                "role",
                "button",
                1,
                "mat-expansion-panel-header",
                "mat-focus-indicator",
              ],
              hostVars: 15,
              hostBindings: function (e, i) {
                1 & e &&
                  be("click", function () {
                    return i._toggle();
                  })("keydown", function (s) {
                    return i._keydown(s);
                  }),
                  2 & e &&
                    (qe("id", i.panel._headerId)("tabindex", i.tabIndex)(
                      "aria-controls",
                      i._getPanelId()
                    )("aria-expanded", i._isExpanded())(
                      "aria-disabled",
                      i.panel.disabled
                    ),
                    Ud("height", i._getHeaderHeight()),
                    Je("mat-expanded", i._isExpanded())(
                      "mat-expansion-toggle-indicator-after",
                      "after" === i._getTogglePosition()
                    )(
                      "mat-expansion-toggle-indicator-before",
                      "before" === i._getTogglePosition()
                    )(
                      "_mat-animation-noopable",
                      "NoopAnimations" === i._animationMode
                    ));
              },
              inputs: {
                tabIndex: "tabIndex",
                expandedHeight: "expandedHeight",
                collapsedHeight: "collapsedHeight",
              },
              features: [q],
              ngContentSelectors: QU,
              decls: 5,
              vars: 1,
              consts: [
                [1, "mat-content"],
                ["class", "mat-expansion-indicator", 4, "ngIf"],
                [1, "mat-expansion-indicator"],
              ],
              template: function (e, i) {
                1 & e &&
                  (_n(KU),
                  g(0, "span", 0),
                  Xe(1),
                  Xe(2, 1),
                  Xe(3, 2),
                  _(),
                  Pn(4, qU, 1, 1, "span", 1)),
                  2 & e && (Nt(4), ft("ngIf", i._showToggle()));
              },
              directives: [Al],
              styles: [
                '.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;margin-right:16px;align-items:center}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header-description{flex-grow:2}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle}.cdk-high-contrast-active .mat-expansion-panel .mat-expansion-panel-header.cdk-keyboard-focused:not([aria-disabled=true])::before,.cdk-high-contrast-active .mat-expansion-panel .mat-expansion-panel-header.cdk-program-focused:not([aria-disabled=true])::before,.cdk-high-contrast-active .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:hover:not([aria-disabled=true])::before{top:0;left:0;right:0;bottom:0;position:absolute;box-sizing:border-box;pointer-events:none;border:3px solid;border-radius:4px;content:""}.cdk-high-contrast-active .mat-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}\n',
              ],
              encapsulation: 2,
              data: { animation: [oM.indicatorRotate] },
              changeDetection: 0,
            })),
            n
          );
        })(),
        e$ = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [["mat-panel-description"]],
              hostAttrs: [1, "mat-expansion-panel-header-description"],
            })),
            n
          );
        })(),
        t$ = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [["mat-panel-title"]],
              hostAttrs: [1, "mat-expansion-panel-header-title"],
            })),
            n
          );
        })(),
        n$ = (() => {
          class n extends BU {
            constructor() {
              super(...arguments),
                (this._ownHeaders = new ns()),
                (this._hideToggle = !1),
                (this.displayMode = "default"),
                (this.togglePosition = "after");
            }
            get hideToggle() {
              return this._hideToggle;
            }
            set hideToggle(e) {
              this._hideToggle = at(e);
            }
            ngAfterContentInit() {
              this._headers.changes.pipe(Xi(this._headers)).subscribe((e) => {
                this._ownHeaders.reset(
                  e.filter((i) => i.panel.accordion === this)
                ),
                  this._ownHeaders.notifyOnChanges();
              }),
                (this._keyManager = new sD(this._ownHeaders)
                  .withWrap()
                  .withHomeAndEnd());
            }
            _handleHeaderKeydown(e) {
              this._keyManager.onKeydown(e);
            }
            _handleHeaderFocus(e) {
              this._keyManager.updateActiveItem(e);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this._ownHeaders.destroy();
            }
          }
          return (
            (n.ɵfac = (function () {
              let t;
              return function (i) {
                return (t || (t = rt(n)))(i || n);
              };
            })()),
            (n.ɵdir = k({
              type: n,
              selectors: [["mat-accordion"]],
              contentQueries: function (e, i, r) {
                if ((1 & e && Bt(r, cM, 5), 2 & e)) {
                  let s;
                  et((s = tt())) && (i._headers = s);
                }
              },
              hostAttrs: [1, "mat-accordion"],
              hostVars: 2,
              hostBindings: function (e, i) {
                2 & e && Je("mat-accordion-multi", i.multi);
              },
              inputs: {
                multi: "multi",
                hideToggle: "hideToggle",
                displayMode: "displayMode",
                togglePosition: "togglePosition",
              },
              exportAs: ["matAccordion"],
              features: [ce([{ provide: Fp, useExisting: n }]), q],
            })),
            n
          );
        })(),
        i$ = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({ imports: [[Eo, Fe, UU, sc]] })),
            n
          );
        })(),
        r$ = (() => {
          class n {
            constructor() {
              (this.title = "portfolio_afif"),
                (this.showFiller = !1),
                (this.panelOpenState = !1);
            }
            giveVal() {
              console.log("hello every one");
            }
          }
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵcmp = ye({
              type: n,
              selectors: [["app-root"]],
              decls: 110,
              vars: 0,
              consts: [
                ["id", "phone"],
                [2, "text-align", "center"],
                [1, "test"],
                ["id", "desktop"],
                [
                  2,
                  "position",
                  "sticky",
                  "top",
                  "0",
                  "right",
                  "0",
                  "z-index",
                  "999",
                  "/* box-shadow",
                  "0px 3px 17px 2px rgba(131, 128, 128, 0.759)",
                ],
                [
                  1,
                  "navbar",
                  "navbar-expand-lg",
                  "navbar-light",
                  "bg-light",
                  2,
                  "padding",
                  "10px 65px",
                  "display",
                  "flex",
                  "justify-content",
                  "space-between",
                ],
                ["id", "span"],
                [1, "btn"],
                ["href", "./assets/afifahmad resume (3).pdf", "download", ""],
                [1, "fa", "fa-download"],
                [2, "display", "flex", "justify-content", "space-between"],
                [
                  2,
                  "flex",
                  "0.3",
                  "padding",
                  "50px",
                  "background-color",
                  "#f7f7f7",
                ],
                [2, "margin-bottom", "20px"],
                ["hideToggle", ""],
                ["id", "effect", 2, "flex", "0.7", "padding", "100px"],
                [
                  1,
                  "fixed",
                  2,
                  "bottom",
                  "0",
                  "position",
                  "fixed",
                  "width",
                  "100%",
                ],
                [
                  2,
                  "display",
                  "flex",
                  "justify-content",
                  "space-between",
                  "align-items",
                  "center",
                  "height",
                  "70px",
                  "padding",
                  "0 30px",
                  "background-color",
                  "#dadada",
                ],
                ["src", "./assets/angular.png", "width", "50px"],
              ],
              template: function (e, i) {
                1 & e &&
                  (g(0, "div", 0),
                  g(1, "h3"),
                  E(2, "Welcome"),
                  _(),
                  g(3, "div"),
                  g(4, "b", 1),
                  E(5, " Please Enter To desktop Mode to View Portfolio"),
                  _(),
                  L(6, "br"),
                  L(7, "br"),
                  g(8, "ul"),
                  g(9, "li"),
                  E(10, "Launch the Chrome browser on Android."),
                  _(),
                  g(11, "li"),
                  E(
                    12,
                    "Open any website that you want to view in desktop mode."
                  ),
                  _(),
                  g(13, "li"),
                  E(14, " Tap onvertical \xa0 "),
                  L(15, "span", 2),
                  E(16, " 3 dots icon the menu options. "),
                  _(),
                  g(17, "li"),
                  E(18, "Select the checkbox against the Desktop site."),
                  _(),
                  _(),
                  _(),
                  _(),
                  g(19, "div", 3),
                  g(20, "div", 4),
                  g(21, "nav", 5),
                  g(22, "div"),
                  g(23, "h3"),
                  E(24, "Welcome"),
                  _(),
                  _(),
                  g(25, "div"),
                  g(26, "b"),
                  E(27, "HIRE ME FOR "),
                  _(),
                  E(28, " \xa0"),
                  L(29, "span", 6),
                  _(),
                  g(30, "div"),
                  g(31, "b"),
                  E(32, "Resume"),
                  _(),
                  g(33, "button", 7),
                  g(34, "a", 8),
                  L(35, "i", 9),
                  _(),
                  _(),
                  _(),
                  _(),
                  _(),
                  g(36, "div"),
                  g(37, "div", 10),
                  g(38, "div", 11),
                  g(39, "div", 12),
                  L(40, "app-sidebar"),
                  _(),
                  g(41, "mat-accordion"),
                  g(42, "mat-expansion-panel", 13),
                  g(43, "mat-expansion-panel-header"),
                  g(44, "mat-panel-title"),
                  E(45, "Competency"),
                  _(),
                  L(46, "mat-panel-description"),
                  _(),
                  _(),
                  g(47, "mat-expansion-panel"),
                  g(48, "mat-expansion-panel-header"),
                  g(49, "mat-panel-title"),
                  E(50, " AWS"),
                  _(),
                  L(51, "mat-panel-description"),
                  _(),
                  g(52, "b"),
                  E(53, " AWS Compute | Networking"),
                  _(),
                  E(54, " (EC2, VPC .... ) "),
                  g(55, "b"),
                  E(56, "COLLECTION"),
                  _(),
                  E(57, " Kinesis | SQS | Amazon MSK "),
                  g(58, "b"),
                  E(59, "STORAGE"),
                  _(),
                  E(60, " S3 | DynamoDB "),
                  L(61, "br"),
                  g(62, "b"),
                  E(63, " PROCESSING "),
                  _(),
                  E(64, " EMR | Glue | Lambda "),
                  L(65, "br"),
                  g(66, "b"),
                  E(67, " ANALYSIS "),
                  _(),
                  E(68, " Athena | Redshift | OpenSearch "),
                  L(69, "br"),
                  g(70, "b"),
                  E(71, "VISUALIZATION "),
                  _(),
                  E(72, " Quicksight "),
                  L(73, "br"),
                  g(74, "b"),
                  E(75, " SECUIRITY "),
                  _(),
                  E(76, " KMS | VPC Endpoints | Encryption .. "),
                  _(),
                  g(77, "mat-expansion-panel"),
                  g(78, "mat-expansion-panel-header"),
                  g(79, "mat-panel-title"),
                  E(80, " Big Data "),
                  _(),
                  L(81, "mat-panel-description"),
                  _(),
                  g(82, "b"),
                  E(83, "Hadoop And Cloudera"),
                  _(),
                  E(
                    84,
                    " hadoop | Kafka | Yarn | Hive | spark | CM | Tablue | Sentry | Kerberos ... "
                  ),
                  _(),
                  g(85, "mat-expansion-panel"),
                  g(86, "mat-expansion-panel-header"),
                  g(87, "mat-panel-title"),
                  E(88, "Web Development"),
                  _(),
                  L(89, "mat-panel-description"),
                  _(),
                  g(90, "b"),
                  E(91, "Front End"),
                  _(),
                  E(92, " Angular | HTML | CSS | Javascript | Bootstrap "),
                  L(93, "br"),
                  g(94, "b"),
                  E(95, "Backend"),
                  _(),
                  E(96, " Node.js | Express "),
                  L(97, "br"),
                  g(98, "b"),
                  E(99, "Database"),
                  _(),
                  E(100, " MongoDB | Firebase "),
                  _(),
                  _(),
                  _(),
                  g(101, "div", 14),
                  L(102, "router-outlet"),
                  _(),
                  _(),
                  _(),
                  g(103, "div", 15),
                  g(104, "div", 16),
                  g(105, "h5"),
                  E(106, "Made By Afifahmad "),
                  _(),
                  g(107, "h5", 1),
                  L(108, "img", 17),
                  E(109, " Used Angular 13"),
                  _(),
                  _(),
                  _(),
                  _());
              },
              directives: [LU, n$, lM, cM, t$, e$, lf],
              styles: [
                '@media screen and (max-width: 800px){#desktop[_ngcontent-%COMP%]{display:none}#phone[_ngcontent-%COMP%]{display:block;display:flex;flex-direction:column;justify-content:center;align-items:center}}.mat-form-field[_ngcontent-%COMP%] + .mat-form-field[_ngcontent-%COMP%]{margin-left:8px}@media screen and (min-width: 800px){#phone[_ngcontent-%COMP%]{display:none}}.test[_ngcontent-%COMP%]:after{content:"\\2807";font-size:20px;font-weight:700}',
                '#span[_ngcontent-%COMP%] {\n    color: red;\n    font-size: large;\n    font-family: cursive;\n  }\n  #span[_ngcontent-%COMP%]::before {\n    content: "";\n    animation: anime infinite 4s;\n  }\n  @keyframes anime {\n    33% {\n      content: "AWS Admin";\n    }\n    66% {\n      content: "Web Development";\n    }\n    100% {\n      content: "Big Data";\n    }\n  }',
              ],
            })),
            n
          );
        })(),
        s$ = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({ imports: [[Fe], Fe] })),
            n
          );
        })(),
        a$ = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n })),
            (n.ɵinj = le({ imports: [[Eo, Fe, nc], nc, Fe] })),
            n
          );
        })(),
        l$ = (() => {
          class n {}
          return (
            (n.ɵfac = function (e) {
              return new (e || n)();
            }),
            (n.ɵmod = de({ type: n, bootstrap: [r$] })),
            (n.ɵinj = le({
              providers: [],
              imports: [[ME, F2, _C, Y2, i$, N2, s$, yH, x2, a$, Zj, NU]],
            })),
            n
          );
        })();
      (function zO() {
        Ab = !1;
      })(),
        m1()
          .bootstrapModule(l$)
          .catch((n) => console.error(n));
    },
  },
  (se) => {
    se((se.s = 531));
  },
]);
