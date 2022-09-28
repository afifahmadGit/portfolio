"use strict";
(self.webpackChunkportfolio_afif = self.webpackChunkportfolio_afif || []).push([
  [179],
  {
    531: () => {
      function se(n) {
        return "function" == typeof n;
      }
      function Ts(n) {
        const t = n((i) => {
          Error.call(i), (i.stack = new Error().stack);
        });
        return (
          (t.prototype = Object.create(Error.prototype)),
          (t.prototype.constructor = t),
          t
        );
      }
      const sa = Ts(
        (n) =>
          function (t) {
            n(this),
              (this.message = t
                ? `${t.length} errors occurred during unsubscription:\n${t
                    .map((i, r) => `${r + 1}) ${i.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = t);
          }
      );
      function mr(n, e) {
        if (n) {
          const t = n.indexOf(e);
          0 <= t && n.splice(t, 1);
        }
      }
      class Ve {
        constructor(e) {
          (this.initialTeardown = e),
            (this.closed = !1),
            (this._parentage = null),
            (this._teardowns = null);
        }
        unsubscribe() {
          let e;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: t } = this;
            if (t)
              if (((this._parentage = null), Array.isArray(t)))
                for (const s of t) s.remove(this);
              else t.remove(this);
            const { initialTeardown: i } = this;
            if (se(i))
              try {
                i();
              } catch (s) {
                e = s instanceof sa ? s.errors : [s];
              }
            const { _teardowns: r } = this;
            if (r) {
              this._teardowns = null;
              for (const s of r)
                try {
                  Vp(s);
                } catch (o) {
                  (e = null != e ? e : []),
                    o instanceof sa ? (e = [...e, ...o.errors]) : e.push(o);
                }
            }
            if (e) throw new sa(e);
          }
        }
        add(e) {
          var t;
          if (e && e !== this)
            if (this.closed) Vp(e);
            else {
              if (e instanceof Ve) {
                if (e.closed || e._hasParent(this)) return;
                e._addParent(this);
              }
              (this._teardowns =
                null !== (t = this._teardowns) && void 0 !== t ? t : []).push(
                e
              );
            }
        }
        _hasParent(e) {
          const { _parentage: t } = this;
          return t === e || (Array.isArray(t) && t.includes(e));
        }
        _addParent(e) {
          const { _parentage: t } = this;
          this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
        }
        _removeParent(e) {
          const { _parentage: t } = this;
          t === e ? (this._parentage = null) : Array.isArray(t) && mr(t, e);
        }
        remove(e) {
          const { _teardowns: t } = this;
          t && mr(t, e), e instanceof Ve && e._removeParent(this);
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
        oa = {
          setTimeout(...n) {
            const { delegate: e } = oa;
            return ((null == e ? void 0 : e.setTimeout) || setTimeout)(...n);
          },
          clearTimeout(n) {
            const { delegate: e } = oa;
            return ((null == e ? void 0 : e.clearTimeout) || clearTimeout)(n);
          },
          delegate: void 0,
        };
      function Bp(n) {
        oa.setTimeout(() => {
          const { onUnhandledError: e } = Pi;
          if (!e) throw n;
          e(n);
        });
      }
      function Is() {}
      const rM = Vc("C", void 0, void 0);
      function Vc(n, e, t) {
        return { kind: n, value: e, error: t };
      }
      let Ni = null;
      function aa(n) {
        if (Pi.useDeprecatedSynchronousErrorHandling) {
          const e = !Ni;
          if ((e && (Ni = { errorThrown: !1, error: null }), n(), e)) {
            const { errorThrown: t, error: i } = Ni;
            if (((Ni = null), t)) throw i;
          }
        } else n();
      }
      class Bc extends Ve {
        constructor(e) {
          super(),
            (this.isStopped = !1),
            e
              ? ((this.destination = e), Lp(e) && e.add(this))
              : (this.destination = lM);
        }
        static create(e, t, i) {
          return new jc(e, t, i);
        }
        next(e) {
          this.isStopped
            ? Uc(
                (function oM(n) {
                  return Vc("N", n, void 0);
                })(e),
                this
              )
            : this._next(e);
        }
        error(e) {
          this.isStopped
            ? Uc(
                (function sM(n) {
                  return Vc("E", void 0, n);
                })(e),
                this
              )
            : ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped
            ? Uc(rM, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          try {
            this.destination.error(e);
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
      class jc extends Bc {
        constructor(e, t, i) {
          let r;
          if ((super(), se(e))) r = e;
          else if (e) {
            let s;
            ({ next: r, error: t, complete: i } = e),
              this && Pi.useDeprecatedNextContext
                ? ((s = Object.create(e)),
                  (s.unsubscribe = () => this.unsubscribe()))
                : (s = e),
              (r = null == r ? void 0 : r.bind(s)),
              (t = null == t ? void 0 : t.bind(s)),
              (i = null == i ? void 0 : i.bind(s));
          }
          this.destination = {
            next: r ? Hc(r) : Is,
            error: Hc(null != t ? t : jp),
            complete: i ? Hc(i) : Is,
          };
        }
      }
      function Hc(n, e) {
        return (...t) => {
          try {
            n(...t);
          } catch (i) {
            Pi.useDeprecatedSynchronousErrorHandling
              ? (function aM(n) {
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
      function Uc(n, e) {
        const { onStoppedNotification: t } = Pi;
        t && oa.setTimeout(() => t(n, e));
      }
      const lM = { closed: !0, next: Is, error: jp, complete: Is },
        $c =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function li(n) {
        return n;
      }
      let he = (() => {
        class n {
          constructor(t) {
            t && (this._subscribe = t);
          }
          lift(t) {
            const i = new n();
            return (i.source = this), (i.operator = t), i;
          }
          subscribe(t, i, r) {
            const s = (function uM(n) {
              return (
                (n && n instanceof Bc) ||
                ((function cM(n) {
                  return n && se(n.next) && se(n.error) && se(n.complete);
                })(n) &&
                  Lp(n))
              );
            })(t)
              ? t
              : new jc(t, i, r);
            return (
              aa(() => {
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
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (i) {
              t.error(i);
            }
          }
          forEach(t, i) {
            return new (i = Up(i))((r, s) => {
              let o;
              o = this.subscribe(
                (a) => {
                  try {
                    t(a);
                  } catch (l) {
                    s(l), null == o || o.unsubscribe();
                  }
                },
                s,
                r
              );
            });
          }
          _subscribe(t) {
            var i;
            return null === (i = this.source) || void 0 === i
              ? void 0
              : i.subscribe(t);
          }
          [$c]() {
            return this;
          }
          pipe(...t) {
            return (function Hp(n) {
              return 0 === n.length
                ? li
                : 1 === n.length
                ? n[0]
                : function (t) {
                    return n.reduce((i, r) => r(i), t);
                  };
            })(t)(this);
          }
          toPromise(t) {
            return new (t = Up(t))((i, r) => {
              let s;
              this.subscribe(
                (o) => (s = o),
                (o) => r(o),
                () => i(s)
              );
            });
          }
        }
        return (n.create = (e) => new n(e)), n;
      })();
      function Up(n) {
        var e;
        return null !== (e = null != n ? n : Pi.Promise) && void 0 !== e
          ? e
          : Promise;
      }
      const dM = Ts(
        (n) =>
          function () {
            n(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let X = (() => {
        class n extends he {
          constructor() {
            super(),
              (this.closed = !1),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(t) {
            const i = new $p(this, this);
            return (i.operator = t), i;
          }
          _throwIfClosed() {
            if (this.closed) throw new dM();
          }
          next(t) {
            aa(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                const i = this.observers.slice();
                for (const r of i) r.next(t);
              }
            });
          }
          error(t) {
            aa(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = t);
                const { observers: i } = this;
                for (; i.length; ) i.shift().error(t);
              }
            });
          }
          complete() {
            aa(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: t } = this;
                for (; t.length; ) t.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0), (this.observers = null);
          }
          get observed() {
            var t;
            return (
              (null === (t = this.observers) || void 0 === t
                ? void 0
                : t.length) > 0
            );
          }
          _trySubscribe(t) {
            return this._throwIfClosed(), super._trySubscribe(t);
          }
          _subscribe(t) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(t),
              this._innerSubscribe(t)
            );
          }
          _innerSubscribe(t) {
            const { hasError: i, isStopped: r, observers: s } = this;
            return i || r ? Np : (s.push(t), new Ve(() => mr(s, t)));
          }
          _checkFinalizedStatuses(t) {
            const { hasError: i, thrownError: r, isStopped: s } = this;
            i ? t.error(r) : s && t.complete();
          }
          asObservable() {
            const t = new he();
            return (t.source = this), t;
          }
        }
        return (n.create = (e, t) => new $p(e, t)), n;
      })();
      class $p extends X {
        constructor(e, t) {
          super(), (this.destination = e), (this.source = t);
        }
        next(e) {
          var t, i;
          null ===
            (i =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.next) ||
            void 0 === i ||
            i.call(t, e);
        }
        error(e) {
          var t, i;
          null ===
            (i =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.error) ||
            void 0 === i ||
            i.call(t, e);
        }
        complete() {
          var e, t;
          null ===
            (t =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.complete) ||
            void 0 === t ||
            t.call(e);
        }
        _subscribe(e) {
          var t, i;
          return null !==
            (i =
              null === (t = this.source) || void 0 === t
                ? void 0
                : t.subscribe(e)) && void 0 !== i
            ? i
            : Np;
        }
      }
      function zp(n) {
        return se(null == n ? void 0 : n.lift);
      }
      function Pe(n) {
        return (e) => {
          if (zp(e))
            return e.lift(function (t) {
              try {
                return n(t, this);
              } catch (i) {
                this.error(i);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      class Se extends Bc {
        constructor(e, t, i, r, s) {
          super(e),
            (this.onFinalize = s),
            (this._next = t
              ? function (o) {
                  try {
                    t(o);
                  } catch (a) {
                    e.error(a);
                  }
                }
              : super._next),
            (this._error = r
              ? function (o) {
                  try {
                    r(o);
                  } catch (a) {
                    e.error(a);
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
                    e.error(o);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var e;
          const { closed: t } = this;
          super.unsubscribe(),
            !t &&
              (null === (e = this.onFinalize) || void 0 === e || e.call(this));
        }
      }
      function q(n, e) {
        return Pe((t, i) => {
          let r = 0;
          t.subscribe(
            new Se(i, (s) => {
              i.next(n.call(e, s, r++));
            })
          );
        });
      }
      function Li(n) {
        return this instanceof Li ? ((this.v = n), this) : new Li(n);
      }
      function pM(n, e, t) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var r,
          i = t.apply(n, e || []),
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
              return new Promise(function (p, _) {
                s.push([h, f, p, _]) > 1 || a(h, f);
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
      function mM(n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          e = n[Symbol.asyncIterator];
        return e
          ? e.call(n)
          : ((n = (function qp(n) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                t = e && n[e],
                i = 0;
              if (t) return t.call(n);
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
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(n)),
            (t = {}),
            i("next"),
            i("throw"),
            i("return"),
            (t[Symbol.asyncIterator] = function () {
              return this;
            }),
            t);
        function i(s) {
          t[s] =
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
      const Gc = (n) =>
        n && "number" == typeof n.length && "function" != typeof n;
      function Kp(n) {
        return se(null == n ? void 0 : n.then);
      }
      function Qp(n) {
        return se(n[$c]);
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
      const Xp = (function _M() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Jp(n) {
        return se(null == n ? void 0 : n[Xp]);
      }
      function em(n) {
        return pM(this, arguments, function* () {
          const t = n.getReader();
          try {
            for (;;) {
              const { value: i, done: r } = yield Li(t.read());
              if (r) return yield Li(void 0);
              yield yield Li(i);
            }
          } finally {
            t.releaseLock();
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
            return (function yM(n) {
              return new he((e) => {
                const t = n[$c]();
                if (se(t.subscribe)) return t.subscribe(e);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(n);
          if (Gc(n))
            return (function vM(n) {
              return new he((e) => {
                for (let t = 0; t < n.length && !e.closed; t++) e.next(n[t]);
                e.complete();
              });
            })(n);
          if (Kp(n))
            return (function bM(n) {
              return new he((e) => {
                n.then(
                  (t) => {
                    e.closed || (e.next(t), e.complete());
                  },
                  (t) => e.error(t)
                ).then(null, Bp);
              });
            })(n);
          if (Yp(n)) return nm(n);
          if (Jp(n))
            return (function CM(n) {
              return new he((e) => {
                for (const t of n) if ((e.next(t), e.closed)) return;
                e.complete();
              });
            })(n);
          if (tm(n))
            return (function wM(n) {
              return nm(em(n));
            })(n);
        }
        throw Zp(n);
      }
      function nm(n) {
        return new he((e) => {
          (function DM(n, e) {
            var t, i, r, s;
            return (function hM(n, e, t, i) {
              return new (t || (t = Promise))(function (s, o) {
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
                        return s instanceof t
                          ? s
                          : new t(function (o) {
                              o(s);
                            });
                      })(u.value).then(a, l);
                }
                c((i = i.apply(n, e || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (t = mM(n); !(i = yield t.next()).done; )
                  if ((e.next(i.value), e.closed)) return;
              } catch (o) {
                r = { error: o };
              } finally {
                try {
                  i && !i.done && (s = t.return) && (yield s.call(t));
                } finally {
                  if (r) throw r.error;
                }
              }
              e.complete();
            });
          })(n, e).catch((t) => e.error(t));
        });
      }
      function $n(n, e, t, i = 0, r = !1) {
        const s = e.schedule(function () {
          t(), r ? n.add(this.schedule(null, i)) : this.unsubscribe();
        }, i);
        if ((n.add(s), !r)) return s;
      }
      function $e(n, e, t = 1 / 0) {
        return se(e)
          ? $e((i, r) => q((s, o) => e(i, s, r, o))(xt(n(i, r))), t)
          : ("number" == typeof e && (t = e),
            Pe((i, r) =>
              (function EM(n, e, t, i, r, s, o, a) {
                const l = [];
                let c = 0,
                  u = 0,
                  d = !1;
                const h = () => {
                    d && !l.length && !c && e.complete();
                  },
                  f = (_) => (c < i ? p(_) : l.push(_)),
                  p = (_) => {
                    s && e.next(_), c++;
                    let b = !1;
                    xt(t(_, u++)).subscribe(
                      new Se(
                        e,
                        (w) => {
                          null == r || r(w), s ? f(w) : e.next(w);
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
                                o ? $n(e, o, () => p(w)) : p(w);
                              }
                              h();
                            } catch (w) {
                              e.error(w);
                            }
                        }
                      )
                    );
                  };
                return (
                  n.subscribe(
                    new Se(e, f, () => {
                      (d = !0), h();
                    })
                  ),
                  () => {
                    null == a || a();
                  }
                );
              })(i, r, n, t)
            ));
      }
      function Rs(n = 1 / 0) {
        return $e(li, n);
      }
      const En = new he((n) => n.complete());
      function im(n) {
        return n && se(n.schedule);
      }
      function Wc(n) {
        return n[n.length - 1];
      }
      function rm(n) {
        return se(Wc(n)) ? n.pop() : void 0;
      }
      function ks(n) {
        return im(Wc(n)) ? n.pop() : void 0;
      }
      function sm(n, e = 0) {
        return Pe((t, i) => {
          t.subscribe(
            new Se(
              i,
              (r) => $n(i, n, () => i.next(r), e),
              () => $n(i, n, () => i.complete(), e),
              (r) => $n(i, n, () => i.error(r), e)
            )
          );
        });
      }
      function om(n, e = 0) {
        return Pe((t, i) => {
          i.add(n.schedule(() => t.subscribe(i), e));
        });
      }
      function am(n, e) {
        if (!n) throw new Error("Iterable cannot be null");
        return new he((t) => {
          $n(t, e, () => {
            const i = n[Symbol.asyncIterator]();
            $n(
              t,
              e,
              () => {
                i.next().then((r) => {
                  r.done ? t.complete() : t.next(r.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Ye(n, e) {
        return e
          ? (function kM(n, e) {
              if (null != n) {
                if (Qp(n))
                  return (function xM(n, e) {
                    return xt(n).pipe(om(e), sm(e));
                  })(n, e);
                if (Gc(n))
                  return (function TM(n, e) {
                    return new he((t) => {
                      let i = 0;
                      return e.schedule(function () {
                        i === n.length
                          ? t.complete()
                          : (t.next(n[i++]), t.closed || this.schedule());
                      });
                    });
                  })(n, e);
                if (Kp(n))
                  return (function AM(n, e) {
                    return xt(n).pipe(om(e), sm(e));
                  })(n, e);
                if (Yp(n)) return am(n, e);
                if (Jp(n))
                  return (function IM(n, e) {
                    return new he((t) => {
                      let i;
                      return (
                        $n(t, e, () => {
                          (i = n[Xp]()),
                            $n(
                              t,
                              e,
                              () => {
                                let r, s;
                                try {
                                  ({ value: r, done: s } = i.next());
                                } catch (o) {
                                  return void t.error(o);
                                }
                                s ? t.complete() : t.next(r);
                              },
                              0,
                              !0
                            );
                        }),
                        () => se(null == i ? void 0 : i.return) && i.return()
                      );
                    });
                  })(n, e);
                if (tm(n))
                  return (function RM(n, e) {
                    return am(em(n), e);
                  })(n, e);
              }
              throw Zp(n);
            })(n, e)
          : xt(n);
      }
      function la(...n) {
        const e = ks(n),
          t = (function SM(n, e) {
            return "number" == typeof Wc(n) ? n.pop() : e;
          })(n, 1 / 0),
          i = n;
        return i.length ? (1 === i.length ? xt(i[0]) : Rs(t)(Ye(i, e))) : En;
      }
      function ze(n) {
        return n <= 0
          ? () => En
          : Pe((e, t) => {
              let i = 0;
              e.subscribe(
                new Se(t, (r) => {
                  ++i <= n && (t.next(r), n <= i && t.complete());
                })
              );
            });
      }
      function lm(n = {}) {
        const {
          connector: e = () => new X(),
          resetOnError: t = !0,
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
              const _ = o;
              f(), null == _ || _.unsubscribe();
            };
          return Pe((_, b) => {
            c++, !d && !u && h();
            const w = (l = null != l ? l : e());
            b.add(() => {
              c--, 0 === c && !d && !u && (a = qc(p, r));
            }),
              w.subscribe(b),
              o ||
                ((o = new jc({
                  next: (v) => w.next(v),
                  error: (v) => {
                    (d = !0), h(), (a = qc(f, t, v)), w.error(v);
                  },
                  complete: () => {
                    (u = !0), h(), (a = qc(f, i)), w.complete();
                  },
                })),
                Ye(_).subscribe(o));
          })(s);
        };
      }
      function qc(n, e, ...t) {
        return !0 === e
          ? (n(), null)
          : !1 === e
          ? null
          : e(...t)
              .pipe(ze(1))
              .subscribe(() => n());
      }
      function me(n) {
        for (let e in n) if (n[e] === me) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function Kc(n, e) {
        for (const t in e)
          e.hasOwnProperty(t) && !n.hasOwnProperty(t) && (n[t] = e[t]);
      }
      function ce(n) {
        if ("string" == typeof n) return n;
        if (Array.isArray(n)) return "[" + n.map(ce).join(", ") + "]";
        if (null == n) return "" + n;
        if (n.overriddenName) return `${n.overriddenName}`;
        if (n.name) return `${n.name}`;
        const e = n.toString();
        if (null == e) return "" + e;
        const t = e.indexOf("\n");
        return -1 === t ? e : e.substring(0, t);
      }
      function Qc(n, e) {
        return null == n || "" === n
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? n
          : n + " " + e;
      }
      const OM = me({ __forward_ref__: me });
      function fe(n) {
        return (
          (n.__forward_ref__ = fe),
          (n.toString = function () {
            return ce(this());
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
          n.hasOwnProperty(OM) &&
          n.__forward_ref__ === fe
        );
      }
      class ne extends Error {
        constructor(e, t) {
          super(
            (function Yc(n, e) {
              return `NG0${Math.abs(n)}${e ? ": " + e : ""}`;
            })(e, t)
          ),
            (this.code = e);
        }
      }
      function H(n) {
        return "string" == typeof n ? n : null == n ? "" : String(n);
      }
      function dt(n) {
        return "function" == typeof n
          ? n.name || n.toString()
          : "object" == typeof n && null != n && "function" == typeof n.type
          ? n.type.name || n.type.toString()
          : H(n);
      }
      function ca(n, e) {
        const t = e ? ` in ${e}` : "";
        throw new ne(-201, `No provider for ${dt(n)} found${t}`);
      }
      function Tt(n, e) {
        null == n &&
          (function Ce(n, e, t, i) {
            throw new Error(
              `ASSERTION ERROR: ${n}` +
                (null == i ? "" : ` [Expected=> ${t} ${i} ${e} <=Actual]`)
            );
          })(e, n, null, "!=");
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
      function Zc(n) {
        return um(n, ua) || um(n, hm);
      }
      function um(n, e) {
        return n.hasOwnProperty(e) ? n[e] : null;
      }
      function dm(n) {
        return n && (n.hasOwnProperty(Xc) || n.hasOwnProperty(jM))
          ? n[Xc]
          : null;
      }
      const ua = me({ ɵprov: me }),
        Xc = me({ ɵinj: me }),
        hm = me({ ngInjectableDef: me }),
        jM = me({ ngInjectorDef: me });
      var j = (() => (
        ((j = j || {})[(j.Default = 0)] = "Default"),
        (j[(j.Host = 1)] = "Host"),
        (j[(j.Self = 2)] = "Self"),
        (j[(j.SkipSelf = 4)] = "SkipSelf"),
        (j[(j.Optional = 8)] = "Optional"),
        j
      ))();
      let Jc;
      function ci(n) {
        const e = Jc;
        return (Jc = n), e;
      }
      function fm(n, e, t) {
        const i = Zc(n);
        return i && "root" == i.providedIn
          ? void 0 === i.value
            ? (i.value = i.factory())
            : i.value
          : t & j.Optional
          ? null
          : void 0 !== e
          ? e
          : void ca(ce(n), "Injector");
      }
      function ui(n) {
        return { toString: n }.toString();
      }
      var an = (() => (
          ((an = an || {})[(an.OnPush = 0)] = "OnPush"),
          (an[(an.Default = 1)] = "Default"),
          an
        ))(),
        ln = (() => {
          return (
            ((n = ln || (ln = {}))[(n.Emulated = 0)] = "Emulated"),
            (n[(n.None = 2)] = "None"),
            (n[(n.ShadowDom = 3)] = "ShadowDom"),
            ln
          );
          var n;
        })();
      const UM = "undefined" != typeof globalThis && globalThis,
        $M = "undefined" != typeof window && window,
        zM =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        pe = UM || ("undefined" != typeof global && global) || $M || zM,
        gr = {},
        ge = [],
        da = me({ ɵcmp: me }),
        eu = me({ ɵdir: me }),
        tu = me({ ɵpipe: me }),
        pm = me({ ɵmod: me }),
        Gn = me({ ɵfac: me }),
        Os = me({ __NG_ELEMENT_ID__: me });
      let GM = 0;
      function De(n) {
        return ui(() => {
          const t = {},
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
              declaredInputs: t,
              inputs: null,
              outputs: null,
              exportAs: n.exportAs || null,
              onPush: n.changeDetection === an.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: n.selectors || ge,
              viewQuery: n.viewQuery || null,
              features: n.features || null,
              data: n.data || {},
              encapsulation: n.encapsulation || ln.Emulated,
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
            (i.id += GM++),
            (i.inputs = ym(n.inputs, t)),
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
          it(n) ||
          (function di(n) {
            return n[eu] || null;
          })(n)
        );
      }
      function gm(n) {
        return (function Vi(n) {
          return n[tu] || null;
        })(n);
      }
      const _m = {};
      function ue(n) {
        return ui(() => {
          const e = {
            type: n.type,
            bootstrap: n.bootstrap || ge,
            declarations: n.declarations || ge,
            imports: n.imports || ge,
            exports: n.exports || ge,
            transitiveCompileScopes: null,
            schemas: n.schemas || null,
            id: n.id || null,
          };
          return null != n.id && (_m[n.id] = n.type), e;
        });
      }
      function ym(n, e) {
        if (null == n) return gr;
        const t = {};
        for (const i in n)
          if (n.hasOwnProperty(i)) {
            let r = n[i],
              s = r;
            Array.isArray(r) && ((s = r[1]), (r = r[0])),
              (t[r] = i),
              e && (e[r] = s);
          }
        return t;
      }
      const k = De;
      function it(n) {
        return n[da] || null;
      }
      function Wt(n, e) {
        const t = n[pm] || null;
        if (!t && !0 === e)
          throw new Error(`Type ${ce(n)} does not have '\u0275mod' property.`);
        return t;
      }
      const G = 11;
      function Mn(n) {
        return Array.isArray(n) && "object" == typeof n[1];
      }
      function un(n) {
        return Array.isArray(n) && !0 === n[1];
      }
      function ru(n) {
        return 0 != (8 & n.flags);
      }
      function ma(n) {
        return 2 == (2 & n.flags);
      }
      function ga(n) {
        return 1 == (1 & n.flags);
      }
      function dn(n) {
        return null !== n.template;
      }
      function ZM(n) {
        return 0 != (512 & n[2]);
      }
      function Ui(n, e) {
        return n.hasOwnProperty(Gn) ? n[Gn] : null;
      }
      class eS {
        constructor(e, t, i) {
          (this.previousValue = e),
            (this.currentValue = t),
            (this.firstChange = i);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function st() {
        return bm;
      }
      function bm(n) {
        return n.type.prototype.ngOnChanges && (n.setInput = nS), tS;
      }
      function tS() {
        const n = wm(this),
          e = null == n ? void 0 : n.current;
        if (e) {
          const t = n.previous;
          if (t === gr) n.previous = e;
          else for (let i in e) t[i] = e[i];
          (n.current = null), this.ngOnChanges(e);
        }
      }
      function nS(n, e, t, i) {
        const r =
            wm(n) ||
            (function iS(n, e) {
              return (n[Cm] = e);
            })(n, { previous: gr, current: null }),
          s = r.current || (r.current = {}),
          o = r.previous,
          a = this.declaredInputs[t],
          l = o[a];
        (s[a] = new eS(l && l.currentValue, e, o === gr)), (n[i] = e);
      }
      st.ngInherit = !0;
      const Cm = "__ngSimpleChanges__";
      function wm(n) {
        return n[Cm] || null;
      }
      let au;
      function Ie(n) {
        return !!n.listen;
      }
      const Mm = {
        createRenderer: (n, e) =>
          (function lu() {
            return void 0 !== au
              ? au
              : "undefined" != typeof document
              ? document
              : void 0;
          })(),
      };
      function Be(n) {
        for (; Array.isArray(n); ) n = n[0];
        return n;
      }
      function Qt(n, e) {
        return Be(e[n.index]);
      }
      function cu(n, e) {
        return n.data[e];
      }
      function Rt(n, e) {
        const t = e[n];
        return Mn(t) ? t : t[0];
      }
      function Sm(n) {
        return 4 == (4 & n[2]);
      }
      function uu(n) {
        return 128 == (128 & n[2]);
      }
      function hi(n, e) {
        return null == e ? null : n[e];
      }
      function xm(n) {
        n[18] = 0;
      }
      function du(n, e) {
        n[5] += e;
        let t = n,
          i = n[3];
        for (
          ;
          null !== i && ((1 === e && 1 === t[5]) || (-1 === e && 0 === t[5]));

        )
          (i[5] += e), (t = i), (i = i[3]);
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
      function ya(n) {
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
      function Sn(n, e) {
        const t = B.lFrame;
        (t.currentTNode = n), (t.isParent = e);
      }
      function hu() {
        return B.lFrame.isParent;
      }
      function fu() {
        B.lFrame.isParent = !1;
      }
      function va() {
        return B.isInCheckNoChangesMode;
      }
      function ba(n) {
        B.isInCheckNoChangesMode = n;
      }
      function wr() {
        return B.lFrame.bindingIndex++;
      }
      function _S(n, e) {
        const t = B.lFrame;
        (t.bindingIndex = t.bindingRootIndex = n), pu(e);
      }
      function pu(n) {
        B.lFrame.currentDirectiveIndex = n;
      }
      function mu(n) {
        const e = B.lFrame.currentDirectiveIndex;
        return -1 === e ? null : n[e];
      }
      function km() {
        return B.lFrame.currentQueryIndex;
      }
      function gu(n) {
        B.lFrame.currentQueryIndex = n;
      }
      function vS(n) {
        const e = n[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? n[6] : null;
      }
      function Om(n, e, t) {
        if (t & j.SkipSelf) {
          let r = e,
            s = n;
          for (
            ;
            !((r = r.parent),
            null !== r ||
              t & j.Host ||
              ((r = vS(s)), null === r || ((s = s[15]), 10 & r.type)));

          );
          if (null === r) return !1;
          (e = r), (n = s);
        }
        const i = (B.lFrame = Fm());
        return (i.currentTNode = e), (i.lView = n), !0;
      }
      function Ca(n) {
        const e = Fm(),
          t = n[1];
        (B.lFrame = e),
          (e.currentTNode = t.firstChild),
          (e.lView = n),
          (e.tView = t),
          (e.contextLView = n),
          (e.bindingIndex = t.bindingStartIndex),
          (e.inI18n = !1);
      }
      function Fm() {
        const n = B.lFrame,
          e = null === n ? null : n.child;
        return null === e ? Pm(n) : e;
      }
      function Pm(n) {
        const e = {
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
        return null !== n && (n.child = e), e;
      }
      function Nm() {
        const n = B.lFrame;
        return (
          (B.lFrame = n.parent), (n.currentTNode = null), (n.lView = null), n
        );
      }
      const Lm = Nm;
      function wa() {
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
      function ft() {
        return B.lFrame.selectedIndex;
      }
      function fi(n) {
        B.lFrame.selectedIndex = n;
      }
      function Re() {
        const n = B.lFrame;
        return cu(n.tView, n.selectedIndex);
      }
      function Da(n, e) {
        for (let t = e.directiveStart, i = e.directiveEnd; t < i; t++) {
          const s = n.data[t].type.prototype,
            {
              ngAfterContentInit: o,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: u,
            } = s;
          o && (n.contentHooks || (n.contentHooks = [])).push(-t, o),
            a &&
              ((n.contentHooks || (n.contentHooks = [])).push(t, a),
              (n.contentCheckHooks || (n.contentCheckHooks = [])).push(t, a)),
            l && (n.viewHooks || (n.viewHooks = [])).push(-t, l),
            c &&
              ((n.viewHooks || (n.viewHooks = [])).push(t, c),
              (n.viewCheckHooks || (n.viewCheckHooks = [])).push(t, c)),
            null != u && (n.destroyHooks || (n.destroyHooks = [])).push(t, u);
        }
      }
      function Ea(n, e, t) {
        Vm(n, e, 3, t);
      }
      function Ma(n, e, t, i) {
        (3 & n[2]) === t && Vm(n, e, t, i);
      }
      function _u(n, e) {
        let t = n[2];
        (3 & t) === e && ((t &= 2047), (t += 1), (n[2] = t));
      }
      function Vm(n, e, t, i) {
        const s = null != i ? i : -1,
          o = e.length - 1;
        let a = 0;
        for (let l = void 0 !== i ? 65535 & n[18] : 0; l < o; l++)
          if ("number" == typeof e[l + 1]) {
            if (((a = e[l]), null != i && a >= i)) break;
          } else
            e[l] < 0 && (n[18] += 65536),
              (a < s || -1 == s) &&
                (AS(n, t, e, l), (n[18] = (4294901760 & n[18]) + l + 2)),
              l++;
      }
      function AS(n, e, t, i) {
        const r = t[i] < 0,
          s = t[i + 1],
          a = n[r ? -t[i] : t[i]];
        if (r) {
          if (n[2] >> 11 < n[18] >> 16 && (3 & n[2]) === e) {
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
        constructor(e, t, i) {
          (this.factory = e),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = i);
        }
      }
      function Sa(n, e, t) {
        const i = Ie(n);
        let r = 0;
        for (; r < t.length; ) {
          const s = t[r];
          if ("number" == typeof s) {
            if (0 !== s) break;
            r++;
            const o = t[r++],
              a = t[r++],
              l = t[r++];
            i ? n.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
          } else {
            const o = s,
              a = t[++r];
            vu(o)
              ? i && n.setProperty(e, o, a)
              : i
              ? n.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              r++;
          }
        }
        return r;
      }
      function Bm(n) {
        return 3 === n || 4 === n || 6 === n;
      }
      function vu(n) {
        return 64 === n.charCodeAt(0);
      }
      function xa(n, e) {
        if (null !== e && 0 !== e.length)
          if (null === n || 0 === n.length) n = e.slice();
          else {
            let t = -1;
            for (let i = 0; i < e.length; i++) {
              const r = e[i];
              "number" == typeof r
                ? (t = r)
                : 0 === t ||
                  jm(n, t, r, null, -1 === t || 2 === t ? e[++i] : null);
            }
          }
        return n;
      }
      function jm(n, e, t, i, r) {
        let s = 0,
          o = n.length;
        if (-1 === e) o = -1;
        else
          for (; s < n.length; ) {
            const a = n[s++];
            if ("number" == typeof a) {
              if (a === e) {
                o = -1;
                break;
              }
              if (a > e) {
                o = s - 1;
                break;
              }
            }
          }
        for (; s < n.length; ) {
          const a = n[s];
          if ("number" == typeof a) break;
          if (a === t) {
            if (null === i) return void (null !== r && (n[s + 1] = r));
            if (i === n[s + 1]) return void (n[s + 2] = r);
          }
          s++, null !== i && s++, null !== r && s++;
        }
        -1 !== o && (n.splice(o, 0, e), (s = o + 1)),
          n.splice(s++, 0, t),
          null !== i && n.splice(s++, 0, i),
          null !== r && n.splice(s++, 0, r);
      }
      function Hm(n) {
        return -1 !== n;
      }
      function Dr(n) {
        return 32767 & n;
      }
      function Er(n, e) {
        let t = (function OS(n) {
            return n >> 16;
          })(n),
          i = e;
        for (; t > 0; ) (i = i[15]), t--;
        return i;
      }
      let bu = !0;
      function Aa(n) {
        const e = bu;
        return (bu = n), e;
      }
      let FS = 0;
      function js(n, e) {
        const t = wu(n, e);
        if (-1 !== t) return t;
        const i = e[1];
        i.firstCreatePass &&
          ((n.injectorIndex = e.length),
          Cu(i.data, n),
          Cu(e, null),
          Cu(i.blueprint, null));
        const r = Ta(n, e),
          s = n.injectorIndex;
        if (Hm(r)) {
          const o = Dr(r),
            a = Er(r, e),
            l = a[1].data;
          for (let c = 0; c < 8; c++) e[s + c] = a[o + c] | l[o + c];
        }
        return (e[s + 8] = r), s;
      }
      function Cu(n, e) {
        n.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function wu(n, e) {
        return -1 === n.injectorIndex ||
          (n.parent && n.parent.injectorIndex === n.injectorIndex) ||
          null === e[n.injectorIndex + 8]
          ? -1
          : n.injectorIndex;
      }
      function Ta(n, e) {
        if (n.parent && -1 !== n.parent.injectorIndex)
          return n.parent.injectorIndex;
        let t = 0,
          i = null,
          r = e;
        for (; null !== r; ) {
          const s = r[1],
            o = s.type;
          if (((i = 2 === o ? s.declTNode : 1 === o ? r[6] : null), null === i))
            return -1;
          if ((t++, (r = r[15]), -1 !== i.injectorIndex))
            return i.injectorIndex | (t << 16);
        }
        return -1;
      }
      function Ia(n, e, t) {
        !(function PS(n, e, t) {
          let i;
          "string" == typeof t
            ? (i = t.charCodeAt(0) || 0)
            : t.hasOwnProperty(Os) && (i = t[Os]),
            null == i && (i = t[Os] = FS++);
          const r = 255 & i;
          e.data[n + (r >> 5)] |= 1 << r;
        })(n, e, t);
      }
      function zm(n, e, t) {
        if (t & j.Optional) return n;
        ca(e, "NodeInjector");
      }
      function Gm(n, e, t, i) {
        if (
          (t & j.Optional && void 0 === i && (i = null),
          0 == (t & (j.Self | j.Host)))
        ) {
          const r = n[9],
            s = ci(void 0);
          try {
            return r ? r.get(e, i, t & j.Optional) : fm(e, i, t & j.Optional);
          } finally {
            ci(s);
          }
        }
        return zm(i, e, t);
      }
      function Wm(n, e, t, i = j.Default, r) {
        if (null !== n) {
          const s = (function BS(n) {
            if ("string" == typeof n) return n.charCodeAt(0) || 0;
            const e = n.hasOwnProperty(Os) ? n[Os] : void 0;
            return "number" == typeof e ? (e >= 0 ? 255 & e : LS) : e;
          })(t);
          if ("function" == typeof s) {
            if (!Om(e, n, i)) return i & j.Host ? zm(r, t, i) : Gm(e, t, i, r);
            try {
              const o = s(i);
              if (null != o || i & j.Optional) return o;
              ca(t);
            } finally {
              Lm();
            }
          } else if ("number" == typeof s) {
            let o = null,
              a = wu(n, e),
              l = -1,
              c = i & j.Host ? e[16][6] : null;
            for (
              (-1 === a || i & j.SkipSelf) &&
              ((l = -1 === a ? Ta(n, e) : e[a + 8]),
              -1 !== l && Qm(i, !1)
                ? ((o = e[1]), (a = Dr(l)), (e = Er(l, e)))
                : (a = -1));
              -1 !== a;

            ) {
              const u = e[1];
              if (Km(s, a, u.data)) {
                const d = VS(a, e, t, o, i, c);
                if (d !== qm) return d;
              }
              (l = e[a + 8]),
                -1 !== l && Qm(i, e[1].data[a + 8] === c) && Km(s, a, e)
                  ? ((o = u), (a = Dr(l)), (e = Er(l, e)))
                  : (a = -1);
            }
          }
        }
        return Gm(e, t, i, r);
      }
      const qm = {};
      function LS() {
        return new Mr(Ge(), D());
      }
      function VS(n, e, t, i, r, s) {
        const o = e[1],
          a = o.data[n + 8],
          u = Ra(
            a,
            o,
            t,
            null == i ? ma(a) && bu : i != o && 0 != (3 & a.type),
            r & j.Host && s === a
          );
        return null !== u ? Hs(e, o, u, a) : qm;
      }
      function Ra(n, e, t, i, r) {
        const s = n.providerIndexes,
          o = e.data,
          a = 1048575 & s,
          l = n.directiveStart,
          u = s >> 20,
          h = r ? a + u : n.directiveEnd;
        for (let f = i ? a : a + u; f < h; f++) {
          const p = o[f];
          if ((f < l && t === p) || (f >= l && p.type === t)) return f;
        }
        if (r) {
          const f = o[l];
          if (f && dn(f) && f.type === t) return l;
        }
        return null;
      }
      function Hs(n, e, t, i) {
        let r = n[t];
        const s = e.data;
        if (
          (function TS(n) {
            return n instanceof Vs;
          })(r)
        ) {
          const o = r;
          o.resolving &&
            (function FM(n, e) {
              const t = e ? `. Dependency path: ${e.join(" > ")} > ${n}` : "";
              throw new ne(
                -200,
                `Circular dependency in DI detected for ${n}${t}`
              );
            })(dt(s[t]));
          const a = Aa(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? ci(o.injectImpl) : null;
          Om(n, i, j.Default);
          try {
            (r = n[t] = o.factory(void 0, s, n, i)),
              e.firstCreatePass &&
                t >= i.directiveStart &&
                (function xS(n, e, t) {
                  const {
                    ngOnChanges: i,
                    ngOnInit: r,
                    ngDoCheck: s,
                  } = e.type.prototype;
                  if (i) {
                    const o = bm(e);
                    (t.preOrderHooks || (t.preOrderHooks = [])).push(n, o),
                      (
                        t.preOrderCheckHooks || (t.preOrderCheckHooks = [])
                      ).push(n, o);
                  }
                  r &&
                    (t.preOrderHooks || (t.preOrderHooks = [])).push(0 - n, r),
                    s &&
                      ((t.preOrderHooks || (t.preOrderHooks = [])).push(n, s),
                      (
                        t.preOrderCheckHooks || (t.preOrderCheckHooks = [])
                      ).push(n, s));
                })(t, s[t], e);
          } finally {
            null !== l && ci(l), Aa(a), (o.resolving = !1), Lm();
          }
        }
        return r;
      }
      function Km(n, e, t) {
        return !!(t[e + (n >> 5)] & (1 << n));
      }
      function Qm(n, e) {
        return !(n & j.Self || (n & j.Host && e));
      }
      class Mr {
        constructor(e, t) {
          (this._tNode = e), (this._lView = t);
        }
        get(e, t, i) {
          return Wm(this._tNode, this._lView, e, i, t);
        }
      }
      function ot(n) {
        return ui(() => {
          const e = n.prototype.constructor,
            t = e[Gn] || Du(e),
            i = Object.prototype;
          let r = Object.getPrototypeOf(n.prototype).constructor;
          for (; r && r !== i; ) {
            const s = r[Gn] || Du(r);
            if (s && s !== t) return s;
            r = Object.getPrototypeOf(r);
          }
          return (s) => new s();
        });
      }
      function Du(n) {
        return cm(n)
          ? () => {
              const e = Du(z(n));
              return e && e();
            }
          : Ui(n);
      }
      function mi(n) {
        return (function NS(n, e) {
          if ("class" === e) return n.classes;
          if ("style" === e) return n.styles;
          const t = n.attrs;
          if (t) {
            const i = t.length;
            let r = 0;
            for (; r < i; ) {
              const s = t[r];
              if (Bm(s)) break;
              if (0 === s) r += 2;
              else if ("number" == typeof s)
                for (r++; r < i && "string" == typeof t[r]; ) r++;
              else {
                if (s === e) return t[r + 1];
                r += 2;
              }
            }
          }
          return null;
        })(Ge(), n);
      }
      const xr = "__parameters__";
      function Tr(n, e, t) {
        return ui(() => {
          const i = (function Eu(n) {
            return function (...t) {
              if (n) {
                const i = n(...t);
                for (const r in i) this[r] = i[r];
              }
            };
          })(e);
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
            t && (r.prototype = Object.create(t.prototype)),
            (r.prototype.ngMetadataName = n),
            (r.annotationCls = r),
            r
          );
        });
      }
      class A {
        constructor(e, t) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = R({
                  token: this,
                  providedIn: t.providedIn || "root",
                  factory: t.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const HS = new A("AnalyzeForEntryComponents");
      function Yt(n, e) {
        void 0 === e && (e = n);
        for (let t = 0; t < n.length; t++) {
          let i = n[t];
          Array.isArray(i)
            ? (e === n && (e = n.slice(0, t)), Yt(i, e))
            : e !== n && e.push(i);
        }
        return e;
      }
      function xn(n, e) {
        n.forEach((t) => (Array.isArray(t) ? xn(t, e) : e(t)));
      }
      function Zm(n, e, t) {
        e >= n.length ? n.push(t) : n.splice(e, 0, t);
      }
      function ka(n, e) {
        return e >= n.length - 1 ? n.pop() : n.splice(e, 1)[0];
      }
      function zs(n, e) {
        const t = [];
        for (let i = 0; i < n; i++) t.push(e);
        return t;
      }
      function kt(n, e, t) {
        let i = Ir(n, e);
        return (
          i >= 0
            ? (n[1 | i] = t)
            : ((i = ~i),
              (function zS(n, e, t, i) {
                let r = n.length;
                if (r == e) n.push(t, i);
                else if (1 === r) n.push(i, n[0]), (n[0] = t);
                else {
                  for (r--, n.push(n[r - 1], n[r]); r > e; )
                    (n[r] = n[r - 2]), r--;
                  (n[e] = t), (n[e + 1] = i);
                }
              })(n, i, e, t)),
          i
        );
      }
      function Su(n, e) {
        const t = Ir(n, e);
        if (t >= 0) return n[1 | t];
      }
      function Ir(n, e) {
        return (function eg(n, e, t) {
          let i = 0,
            r = n.length >> t;
          for (; r !== i; ) {
            const s = i + ((r - i) >> 1),
              o = n[s << t];
            if (e === o) return s << t;
            o > e ? (r = s) : (i = s + 1);
          }
          return ~(r << t);
        })(n, e, 1);
      }
      const Gs = {},
        Au = "__NG_DI_FLAG__",
        Fa = "ngTempTokenPath",
        ZS = /\n/gm,
        ng = "__source",
        JS = me({ provide: String, useValue: me });
      let Ws;
      function ig(n) {
        const e = Ws;
        return (Ws = n), e;
      }
      function ex(n, e = j.Default) {
        if (void 0 === Ws) throw new ne(203, "");
        return null === Ws
          ? fm(n, void 0, e)
          : Ws.get(n, e & j.Optional ? null : void 0, e);
      }
      function C(n, e = j.Default) {
        return (
          (function HM() {
            return Jc;
          })() || ex
        )(z(n), e);
      }
      const Tu = C;
      function Iu(n) {
        const e = [];
        for (let t = 0; t < n.length; t++) {
          const i = z(n[t]);
          if (Array.isArray(i)) {
            if (0 === i.length) throw new ne(900, "");
            let r,
              s = j.Default;
            for (let o = 0; o < i.length; o++) {
              const a = i[o],
                l = tx(a);
              "number" == typeof l
                ? -1 === l
                  ? (r = a.token)
                  : (s |= l)
                : (r = a);
            }
            e.push(C(r, s));
          } else e.push(C(i));
        }
        return e;
      }
      function qs(n, e) {
        return (n[Au] = e), (n.prototype[Au] = e), n;
      }
      function tx(n) {
        return n[Au];
      }
      const Ks = qs(
          Tr("Inject", (n) => ({ token: n })),
          -1
        ),
        Ot = qs(Tr("Optional"), 8),
        $i = qs(Tr("SkipSelf"), 4);
      let Na;
      function kr(n) {
        var e;
        return (
          (null ===
            (e = (function ku() {
              if (void 0 === Na && ((Na = null), pe.trustedTypes))
                try {
                  Na = pe.trustedTypes.createPolicy("angular", {
                    createHTML: (n) => n,
                    createScript: (n) => n,
                    createScriptURL: (n) => n,
                  });
                } catch (n) {}
              return Na;
            })()) || void 0 === e
            ? void 0
            : e.createHTML(n)) || n
        );
      }
      class zi {
        constructor(e) {
          this.changingThisBreaksApplicationSecurity = e;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      class px extends zi {
        getTypeName() {
          return "HTML";
        }
      }
      class mx extends zi {
        getTypeName() {
          return "Style";
        }
      }
      class gx extends zi {
        getTypeName() {
          return "Script";
        }
      }
      class _x extends zi {
        getTypeName() {
          return "URL";
        }
      }
      class yx extends zi {
        getTypeName() {
          return "ResourceURL";
        }
      }
      function Ft(n) {
        return n instanceof zi ? n.changingThisBreaksApplicationSecurity : n;
      }
      function An(n, e) {
        const t = hg(n);
        if (null != t && t !== e) {
          if ("ResourceURL" === t && "URL" === e) return !0;
          throw new Error(
            `Required a safe ${e}, got a ${t} (see https://g.co/ng/security#xss)`
          );
        }
        return t === e;
      }
      function hg(n) {
        return (n instanceof zi && n.getTypeName()) || null;
      }
      class Ex {
        constructor(e) {
          this.inertDocumentHelper = e;
        }
        getInertBodyElement(e) {
          e = "<body><remove></remove>" + e;
          try {
            const t = new window.DOMParser().parseFromString(
              kr(e),
              "text/html"
            ).body;
            return null === t
              ? this.inertDocumentHelper.getInertBodyElement(e)
              : (t.removeChild(t.firstChild), t);
          } catch (t) {
            return null;
          }
        }
      }
      class Mx {
        constructor(e) {
          if (
            ((this.defaultDoc = e),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                "sanitization-inert"
              )),
            null == this.inertDocument.body)
          ) {
            const t = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(t);
            const i = this.inertDocument.createElement("body");
            t.appendChild(i);
          }
        }
        getInertBodyElement(e) {
          const t = this.inertDocument.createElement("template");
          if ("content" in t) return (t.innerHTML = kr(e)), t;
          const i = this.inertDocument.createElement("body");
          return (
            (i.innerHTML = kr(e)),
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(i),
            i
          );
        }
        stripCustomNsAttrs(e) {
          const t = e.attributes;
          for (let r = t.length - 1; 0 < r; r--) {
            const o = t.item(r).name;
            ("xmlns:ns1" === o || 0 === o.indexOf("ns1:")) &&
              e.removeAttribute(o);
          }
          let i = e.firstChild;
          for (; i; )
            i.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(i),
              (i = i.nextSibling);
        }
      }
      const xx =
          /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        Ax =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function Ys(n) {
        return (n = String(n)).match(xx) || n.match(Ax) ? n : "unsafe:" + n;
      }
      function Tn(n) {
        const e = {};
        for (const t of n.split(",")) e[t] = !0;
        return e;
      }
      function Zs(...n) {
        const e = {};
        for (const t of n)
          for (const i in t) t.hasOwnProperty(i) && (e[i] = !0);
        return e;
      }
      const mg = Tn("area,br,col,hr,img,wbr"),
        gg = Tn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        _g = Tn("rp,rt"),
        Fu = Zs(
          mg,
          Zs(
            gg,
            Tn(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          Zs(
            _g,
            Tn(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          Zs(_g, gg)
        ),
        Pu = Tn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        Nu = Tn("srcset"),
        yg = Zs(
          Pu,
          Nu,
          Tn(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          Tn(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        Tx = Tn("script,style,template");
      class Ix {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(e) {
          let t = e.firstChild,
            i = !0;
          for (; t; )
            if (
              (t.nodeType === Node.ELEMENT_NODE
                ? (i = this.startElement(t))
                : t.nodeType === Node.TEXT_NODE
                ? this.chars(t.nodeValue)
                : (this.sanitizedSomething = !0),
              i && t.firstChild)
            )
              t = t.firstChild;
            else
              for (; t; ) {
                t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
                let r = this.checkClobberedElement(t, t.nextSibling);
                if (r) {
                  t = r;
                  break;
                }
                t = this.checkClobberedElement(t, t.parentNode);
              }
          return this.buf.join("");
        }
        startElement(e) {
          const t = e.nodeName.toLowerCase();
          if (!Fu.hasOwnProperty(t))
            return (this.sanitizedSomething = !0), !Tx.hasOwnProperty(t);
          this.buf.push("<"), this.buf.push(t);
          const i = e.attributes;
          for (let r = 0; r < i.length; r++) {
            const s = i.item(r),
              o = s.name,
              a = o.toLowerCase();
            if (!yg.hasOwnProperty(a)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let l = s.value;
            Pu[a] && (l = Ys(l)),
              Nu[a] &&
                ((n = l),
                (l = (n = String(n))
                  .split(",")
                  .map((e) => Ys(e.trim()))
                  .join(", "))),
              this.buf.push(" ", o, '="', vg(l), '"');
          }
          var n;
          return this.buf.push(">"), !0;
        }
        endElement(e) {
          const t = e.nodeName.toLowerCase();
          Fu.hasOwnProperty(t) &&
            !mg.hasOwnProperty(t) &&
            (this.buf.push("</"), this.buf.push(t), this.buf.push(">"));
        }
        chars(e) {
          this.buf.push(vg(e));
        }
        checkClobberedElement(e, t) {
          if (
            t &&
            (e.compareDocumentPosition(t) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${e.outerHTML}`
            );
          return t;
        }
      }
      const Rx = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        kx = /([^\#-~ |!])/g;
      function vg(n) {
        return n
          .replace(/&/g, "&amp;")
          .replace(Rx, function (e) {
            return (
              "&#" +
              (1024 * (e.charCodeAt(0) - 55296) +
                (e.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(kx, function (e) {
            return "&#" + e.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let Va;
      function bg(n, e) {
        let t = null;
        try {
          Va =
            Va ||
            (function fg(n) {
              const e = new Mx(n);
              return (function Sx() {
                try {
                  return !!new window.DOMParser().parseFromString(
                    kr(""),
                    "text/html"
                  );
                } catch (n) {
                  return !1;
                }
              })()
                ? new Ex(e)
                : e;
            })(n);
          let i = e ? String(e) : "";
          t = Va.getInertBodyElement(i);
          let r = 5,
            s = i;
          do {
            if (0 === r)
              throw new Error(
                "Failed to sanitize html because the input is unstable"
              );
            r--, (i = s), (s = t.innerHTML), (t = Va.getInertBodyElement(i));
          } while (i !== s);
          return kr(new Ix().sanitizeChildren(Lu(t) || t));
        } finally {
          if (t) {
            const i = Lu(t) || t;
            for (; i.firstChild; ) i.removeChild(i.firstChild);
          }
        }
      }
      function Lu(n) {
        return "content" in n &&
          (function Ox(n) {
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
      function Vu(n) {
        const e = (function Xs() {
          const n = D();
          return n && n[12];
        })();
        return e
          ? e.sanitize(ae.URL, n) || ""
          : An(n, "URL")
          ? Ft(n)
          : Ys(H(n));
      }
      const Dg = "__ngContext__";
      function at(n, e) {
        n[Dg] = e;
      }
      function ju(n) {
        const e = (function Js(n) {
          return n[Dg] || null;
        })(n);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function Uu(n) {
        return n.ngOriginalError;
      }
      function Yx(n, ...e) {
        n.error(...e);
      }
      class Kn {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const t = this._findOriginalError(e),
            i = (function Qx(n) {
              return (n && n.ngErrorLogger) || Yx;
            })(e);
          i(this._console, "ERROR", e),
            t && i(this._console, "ORIGINAL ERROR", t);
        }
        _findOriginalError(e) {
          let t = e && Uu(e);
          for (; t && Uu(t); ) t = Uu(t);
          return t || null;
        }
      }
      const Ag = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(pe))();
      function In(n) {
        return n instanceof Function ? n() : n;
      }
      var Pt = (() => (
        ((Pt = Pt || {})[(Pt.Important = 1)] = "Important"),
        (Pt[(Pt.DashCase = 2)] = "DashCase"),
        Pt
      ))();
      function zu(n, e) {
        return undefined(n, e);
      }
      function eo(n) {
        const e = n[3];
        return un(e) ? e[3] : e;
      }
      function Gu(n) {
        return Og(n[13]);
      }
      function Wu(n) {
        return Og(n[4]);
      }
      function Og(n) {
        for (; null !== n && !un(n); ) n = n[4];
        return n;
      }
      function Fr(n, e, t, i, r) {
        if (null != i) {
          let s,
            o = !1;
          un(i) ? (s = i) : Mn(i) && ((o = !0), (i = i[0]));
          const a = Be(i);
          0 === n && null !== t
            ? null == r
              ? Bg(e, t, a)
              : Gi(e, t, a, r || null, !0)
            : 1 === n && null !== t
            ? Gi(e, t, a, r || null, !0)
            : 2 === n
            ? (function Wg(n, e, t) {
                const i = Ba(n, e);
                i &&
                  (function vA(n, e, t, i) {
                    Ie(n) ? n.removeChild(e, t, i) : e.removeChild(t);
                  })(n, i, e, t);
              })(e, a, o)
            : 3 === n && e.destroyNode(a),
            null != s &&
              (function wA(n, e, t, i, r) {
                const s = t[7];
                s !== Be(t) && Fr(e, n, i, s, r);
                for (let a = 10; a < t.length; a++) {
                  const l = t[a];
                  to(l[1], l, n, e, i, s);
                }
              })(e, n, s, t, r);
        }
      }
      function Ku(n, e, t) {
        return Ie(n)
          ? n.createElement(e, t)
          : null === t
          ? n.createElement(e)
          : n.createElementNS(t, e);
      }
      function Pg(n, e) {
        const t = n[9],
          i = t.indexOf(e),
          r = e[3];
        1024 & e[2] && ((e[2] &= -1025), du(r, -1)), t.splice(i, 1);
      }
      function Qu(n, e) {
        if (n.length <= 10) return;
        const t = 10 + e,
          i = n[t];
        if (i) {
          const r = i[17];
          null !== r && r !== n && Pg(r, i), e > 0 && (n[t - 1][4] = i[4]);
          const s = ka(n, 10 + e);
          !(function dA(n, e) {
            to(n, e, e[G], 2, null, null), (e[0] = null), (e[6] = null);
          })(i[1], i);
          const o = s[19];
          null !== o && o.detachView(s[1]),
            (i[3] = null),
            (i[4] = null),
            (i[2] &= -129);
        }
        return i;
      }
      function Ng(n, e) {
        if (!(256 & e[2])) {
          const t = e[G];
          Ie(t) && t.destroyNode && to(n, e, t, 3, null, null),
            (function pA(n) {
              let e = n[13];
              if (!e) return Yu(n[1], n);
              for (; e; ) {
                let t = null;
                if (Mn(e)) t = e[13];
                else {
                  const i = e[10];
                  i && (t = i);
                }
                if (!t) {
                  for (; e && !e[4] && e !== n; )
                    Mn(e) && Yu(e[1], e), (e = e[3]);
                  null === e && (e = n), Mn(e) && Yu(e[1], e), (t = e && e[4]);
                }
                e = t;
              }
            })(e);
        }
      }
      function Yu(n, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function yA(n, e) {
              let t;
              if (null != n && null != (t = n.destroyHooks))
                for (let i = 0; i < t.length; i += 2) {
                  const r = e[t[i]];
                  if (!(r instanceof Vs)) {
                    const s = t[i + 1];
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
            })(n, e),
            (function _A(n, e) {
              const t = n.cleanup,
                i = e[7];
              let r = -1;
              if (null !== t)
                for (let s = 0; s < t.length - 1; s += 2)
                  if ("string" == typeof t[s]) {
                    const o = t[s + 1],
                      a = "function" == typeof o ? o(e) : Be(e[o]),
                      l = i[(r = t[s + 2])],
                      c = t[s + 3];
                    "boolean" == typeof c
                      ? a.removeEventListener(t[s], l, c)
                      : c >= 0
                      ? i[(r = c)]()
                      : i[(r = -c)].unsubscribe(),
                      (s += 2);
                  } else {
                    const o = i[(r = t[s + 1])];
                    t[s].call(o);
                  }
              if (null !== i) {
                for (let s = r + 1; s < i.length; s++) i[s]();
                e[7] = null;
              }
            })(n, e),
            1 === e[1].type && Ie(e[G]) && e[G].destroy();
          const t = e[17];
          if (null !== t && un(e[3])) {
            t !== e[3] && Pg(t, e);
            const i = e[19];
            null !== i && i.detachView(n);
          }
        }
      }
      function Lg(n, e, t) {
        return (function Vg(n, e, t) {
          let i = e;
          for (; null !== i && 40 & i.type; ) i = (e = i).parent;
          if (null === i) return t[0];
          if (2 & i.flags) {
            const r = n.data[i.directiveStart].encapsulation;
            if (r === ln.None || r === ln.Emulated) return null;
          }
          return Qt(i, t);
        })(n, e.parent, t);
      }
      function Gi(n, e, t, i, r) {
        Ie(n) ? n.insertBefore(e, t, i, r) : e.insertBefore(t, i, r);
      }
      function Bg(n, e, t) {
        Ie(n) ? n.appendChild(e, t) : e.appendChild(t);
      }
      function jg(n, e, t, i, r) {
        null !== i ? Gi(n, e, t, i, r) : Bg(n, e, t);
      }
      function Ba(n, e) {
        return Ie(n) ? n.parentNode(e) : e.parentNode;
      }
      function Hg(n, e, t) {
        return $g(n, e, t);
      }
      let $g = function Ug(n, e, t) {
        return 40 & n.type ? Qt(n, t) : null;
      };
      function ja(n, e, t, i) {
        const r = Lg(n, i, e),
          s = e[G],
          a = Hg(i.parent || e[6], i, e);
        if (null != r)
          if (Array.isArray(t))
            for (let l = 0; l < t.length; l++) jg(s, r, t[l], a, !1);
          else jg(s, r, t, a, !1);
      }
      function Ha(n, e) {
        if (null !== e) {
          const t = e.type;
          if (3 & t) return Qt(e, n);
          if (4 & t) return Xu(-1, n[e.index]);
          if (8 & t) {
            const i = e.child;
            if (null !== i) return Ha(n, i);
            {
              const r = n[e.index];
              return un(r) ? Xu(-1, r) : Be(r);
            }
          }
          if (32 & t) return zu(e, n)() || Be(n[e.index]);
          {
            const i = Gg(n, e);
            return null !== i
              ? Array.isArray(i)
                ? i[0]
                : Ha(eo(n[16]), i)
              : Ha(n, e.next);
          }
        }
        return null;
      }
      function Gg(n, e) {
        return null !== e ? n[16][6].projection[e.projection] : null;
      }
      function Xu(n, e) {
        const t = 10 + n + 1;
        if (t < e.length) {
          const i = e[t],
            r = i[1].firstChild;
          if (null !== r) return Ha(i, r);
        }
        return e[7];
      }
      function Ju(n, e, t, i, r, s, o) {
        for (; null != t; ) {
          const a = i[t.index],
            l = t.type;
          if (
            (o && 0 === e && (a && at(Be(a), i), (t.flags |= 4)),
            64 != (64 & t.flags))
          )
            if (8 & l) Ju(n, e, t.child, i, r, s, !1), Fr(e, n, r, a, s);
            else if (32 & l) {
              const c = zu(t, i);
              let u;
              for (; (u = c()); ) Fr(e, n, r, u, s);
              Fr(e, n, r, a, s);
            } else 16 & l ? qg(n, e, i, t, r, s) : Fr(e, n, r, a, s);
          t = o ? t.projectionNext : t.next;
        }
      }
      function to(n, e, t, i, r, s) {
        Ju(t, i, n.firstChild, e, r, s, !1);
      }
      function qg(n, e, t, i, r, s) {
        const o = t[16],
          l = o[6].projection[i.projection];
        if (Array.isArray(l))
          for (let c = 0; c < l.length; c++) Fr(e, n, r, l[c], s);
        else Ju(n, e, l, o[3], r, s, !0);
      }
      function Kg(n, e, t) {
        Ie(n) ? n.setAttribute(e, "style", t) : (e.style.cssText = t);
      }
      function ed(n, e, t) {
        Ie(n)
          ? "" === t
            ? n.removeAttribute(e, "class")
            : n.setAttribute(e, "class", t)
          : (e.className = t);
      }
      function Qg(n, e, t) {
        let i = n.length;
        for (;;) {
          const r = n.indexOf(e, t);
          if (-1 === r) return r;
          if (0 === r || n.charCodeAt(r - 1) <= 32) {
            const s = e.length;
            if (r + s === i || n.charCodeAt(r + s) <= 32) return r;
          }
          t = r + 1;
        }
      }
      const Yg = "ng-template";
      function EA(n, e, t) {
        let i = 0;
        for (; i < n.length; ) {
          let r = n[i++];
          if (t && "class" === r) {
            if (((r = n[i]), -1 !== Qg(r.toLowerCase(), e, 0))) return !0;
          } else if (1 === r) {
            for (; i < n.length && "string" == typeof (r = n[i++]); )
              if (r.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Zg(n) {
        return 4 === n.type && n.value !== Yg;
      }
      function MA(n, e, t) {
        return e === (4 !== n.type || t ? n.value : Yg);
      }
      function SA(n, e, t) {
        let i = 4;
        const r = n.attrs || [],
          s = (function TA(n) {
            for (let e = 0; e < n.length; e++) if (Bm(n[e])) return e;
            return n.length;
          })(r);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & i) {
                if (
                  ((i = 2 | (1 & i)),
                  ("" !== l && !MA(n, l, t)) || ("" === l && 1 === e.length))
                ) {
                  if (hn(i)) return !1;
                  o = !0;
                }
              } else {
                const c = 8 & i ? l : e[++a];
                if (8 & i && null !== n.attrs) {
                  if (!EA(n.attrs, c, t)) {
                    if (hn(i)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const d = xA(8 & i ? "class" : l, r, Zg(n), t);
                if (-1 === d) {
                  if (hn(i)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== c) {
                  let h;
                  h = d > s ? "" : r[d + 1].toLowerCase();
                  const f = 8 & i ? h : null;
                  if ((f && -1 !== Qg(f, c, 0)) || (2 & i && c !== h)) {
                    if (hn(i)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !hn(i) && !hn(l)) return !1;
            if (o && hn(l)) continue;
            (o = !1), (i = l | (1 & i));
          }
        }
        return hn(i) || o;
      }
      function hn(n) {
        return 0 == (1 & n);
      }
      function xA(n, e, t, i) {
        if (null === e) return -1;
        let r = 0;
        if (i || !t) {
          let s = !1;
          for (; r < e.length; ) {
            const o = e[r];
            if (o === n) return r;
            if (3 === o || 6 === o) s = !0;
            else {
              if (1 === o || 2 === o) {
                let a = e[++r];
                for (; "string" == typeof a; ) a = e[++r];
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
        return (function IA(n, e) {
          let t = n.indexOf(4);
          if (t > -1)
            for (t++; t < n.length; ) {
              const i = n[t];
              if ("number" == typeof i) return -1;
              if (i === e) return t;
              t++;
            }
          return -1;
        })(e, n);
      }
      function Xg(n, e, t = !1) {
        for (let i = 0; i < e.length; i++) if (SA(n, e[i], t)) return !0;
        return !1;
      }
      function RA(n, e) {
        e: for (let t = 0; t < e.length; t++) {
          const i = e[t];
          if (n.length === i.length) {
            for (let r = 0; r < n.length; r++) if (n[r] !== i[r]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function Jg(n, e) {
        return n ? ":not(" + e.trim() + ")" : e;
      }
      function kA(n) {
        let e = n[0],
          t = 1,
          i = 2,
          r = "",
          s = !1;
        for (; t < n.length; ) {
          let o = n[t];
          if ("string" == typeof o)
            if (2 & i) {
              const a = n[++t];
              r += "[" + o + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & i ? (r += "." + o) : 4 & i && (r += " " + o);
          else
            "" !== r && !hn(o) && ((e += Jg(s, r)), (r = "")),
              (i = o),
              (s = s || !hn(i));
          t++;
        }
        return "" !== r && (e += Jg(s, r)), e;
      }
      const U = {};
      function Zt(n) {
        e_(ie(), D(), ft() + n, va());
      }
      function e_(n, e, t, i) {
        if (!i)
          if (3 == (3 & e[2])) {
            const s = n.preOrderCheckHooks;
            null !== s && Ea(e, s, t);
          } else {
            const s = n.preOrderHooks;
            null !== s && Ma(e, s, 0, t);
          }
        fi(t);
      }
      function Ua(n, e) {
        return (n << 17) | (e << 2);
      }
      function fn(n) {
        return (n >> 17) & 32767;
      }
      function td(n) {
        return 2 | n;
      }
      function Qn(n) {
        return (131068 & n) >> 2;
      }
      function nd(n, e) {
        return (-131069 & n) | (e << 2);
      }
      function id(n) {
        return 1 | n;
      }
      function d_(n, e) {
        const t = n.contentQueries;
        if (null !== t)
          for (let i = 0; i < t.length; i += 2) {
            const r = t[i],
              s = t[i + 1];
            if (-1 !== s) {
              const o = n.data[s];
              gu(r), o.contentQueries(2, e[s], s);
            }
          }
      }
      function no(n, e, t, i, r, s, o, a, l, c) {
        const u = e.blueprint.slice();
        return (
          (u[0] = r),
          (u[2] = 140 | i),
          xm(u),
          (u[3] = u[15] = n),
          (u[8] = t),
          (u[10] = o || (n && n[10])),
          (u[G] = a || (n && n[G])),
          (u[12] = l || (n && n[12]) || null),
          (u[9] = c || (n && n[9]) || null),
          (u[6] = s),
          (u[16] = 2 == e.type ? n[16] : u),
          u
        );
      }
      function Pr(n, e, t, i, r) {
        let s = n.data[e];
        if (null === s)
          (s = (function hd(n, e, t, i, r) {
            const s = Tm(),
              o = hu(),
              l = (n.data[e] = (function YA(n, e, t, i, r, s) {
                return {
                  type: t,
                  index: i,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
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
                  parent: e,
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
              })(0, o ? s : s && s.parent, t, e, i, r));
            return (
              null === n.firstChild && (n.firstChild = l),
              null !== s &&
                (o
                  ? null == s.child && null !== l.parent && (s.child = l)
                  : null === s.next && (s.next = l)),
              l
            );
          })(n, e, t, i, r)),
            (function gS() {
              return B.lFrame.inI18n;
            })() && (s.flags |= 64);
        else if (64 & s.type) {
          (s.type = t), (s.value = i), (s.attrs = r);
          const o = (function Ls() {
            const n = B.lFrame,
              e = n.currentTNode;
            return n.isParent ? e : e.parent;
          })();
          s.injectorIndex = null === o ? -1 : o.injectorIndex;
        }
        return Sn(s, !0), s;
      }
      function Nr(n, e, t, i) {
        if (0 === t) return -1;
        const r = e.length;
        for (let s = 0; s < t; s++)
          e.push(i), n.blueprint.push(i), n.data.push(null);
        return r;
      }
      function io(n, e, t) {
        Ca(e);
        try {
          const i = n.viewQuery;
          null !== i && Cd(1, i, t);
          const r = n.template;
          null !== r && h_(n, e, r, 1, t),
            n.firstCreatePass && (n.firstCreatePass = !1),
            n.staticContentQueries && d_(n, e),
            n.staticViewQueries && Cd(2, n.viewQuery, t);
          const s = n.components;
          null !== s &&
            (function qA(n, e) {
              for (let t = 0; t < e.length; t++) pT(n, e[t]);
            })(e, s);
        } catch (i) {
          throw (
            (n.firstCreatePass &&
              ((n.incompleteFirstPass = !0), (n.firstCreatePass = !1)),
            i)
          );
        } finally {
          (e[2] &= -5), wa();
        }
      }
      function Lr(n, e, t, i) {
        const r = e[2];
        if (256 == (256 & r)) return;
        Ca(e);
        const s = va();
        try {
          xm(e),
            (function Im(n) {
              return (B.lFrame.bindingIndex = n);
            })(n.bindingStartIndex),
            null !== t && h_(n, e, t, 2, i);
          const o = 3 == (3 & r);
          if (!s)
            if (o) {
              const c = n.preOrderCheckHooks;
              null !== c && Ea(e, c, null);
            } else {
              const c = n.preOrderHooks;
              null !== c && Ma(e, c, 0, null), _u(e, 0);
            }
          if (
            ((function hT(n) {
              for (let e = Gu(n); null !== e; e = Wu(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let i = 0; i < t.length; i++) {
                  const r = t[i],
                    s = r[3];
                  0 == (1024 & r[2]) && du(s, 1), (r[2] |= 1024);
                }
              }
            })(e),
            (function dT(n) {
              for (let e = Gu(n); null !== e; e = Wu(e))
                for (let t = 10; t < e.length; t++) {
                  const i = e[t],
                    r = i[1];
                  uu(i) && Lr(r, i, r.template, i[8]);
                }
            })(e),
            null !== n.contentQueries && d_(n, e),
            !s)
          )
            if (o) {
              const c = n.contentCheckHooks;
              null !== c && Ea(e, c);
            } else {
              const c = n.contentHooks;
              null !== c && Ma(e, c, 1), _u(e, 1);
            }
          !(function GA(n, e) {
            const t = n.hostBindingOpCodes;
            if (null !== t)
              try {
                for (let i = 0; i < t.length; i++) {
                  const r = t[i];
                  if (r < 0) fi(~r);
                  else {
                    const s = r,
                      o = t[++i],
                      a = t[++i];
                    _S(o, s), a(2, e[s]);
                  }
                }
              } finally {
                fi(-1);
              }
          })(n, e);
          const a = n.components;
          null !== a &&
            (function WA(n, e) {
              for (let t = 0; t < e.length; t++) fT(n, e[t]);
            })(e, a);
          const l = n.viewQuery;
          if ((null !== l && Cd(2, l, i), !s))
            if (o) {
              const c = n.viewCheckHooks;
              null !== c && Ea(e, c);
            } else {
              const c = n.viewHooks;
              null !== c && Ma(e, c, 2), _u(e, 2);
            }
          !0 === n.firstUpdatePass && (n.firstUpdatePass = !1),
            s || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), du(e[3], -1));
        } finally {
          wa();
        }
      }
      function KA(n, e, t, i) {
        const r = e[10],
          s = !va(),
          o = Sm(e);
        try {
          s && !o && r.begin && r.begin(), o && io(n, e, i), Lr(n, e, t, i);
        } finally {
          s && !o && r.end && r.end();
        }
      }
      function h_(n, e, t, i, r) {
        const s = ft(),
          o = 2 & i;
        try {
          fi(-1), o && e.length > 20 && e_(n, e, 20, va()), t(i, r);
        } finally {
          fi(s);
        }
      }
      function f_(n, e, t) {
        if (ru(e)) {
          const r = e.directiveEnd;
          for (let s = e.directiveStart; s < r; s++) {
            const o = n.data[s];
            o.contentQueries && o.contentQueries(1, t[s], s);
          }
        }
      }
      function fd(n, e, t) {
        !Am() ||
          ((function iT(n, e, t, i) {
            const r = t.directiveStart,
              s = t.directiveEnd;
            n.firstCreatePass || js(t, e), at(i, e);
            const o = t.initialInputs;
            for (let a = r; a < s; a++) {
              const l = n.data[a],
                c = dn(l);
              c && lT(e, t, l);
              const u = Hs(e, n, a, t);
              at(u, e),
                null !== o && cT(0, a - r, u, l, 0, o),
                c && (Rt(t.index, e)[8] = u);
            }
          })(n, e, t, Qt(t, e)),
          128 == (128 & t.flags) &&
            (function rT(n, e, t) {
              const i = t.directiveStart,
                r = t.directiveEnd,
                o = t.index,
                a = (function yS() {
                  return B.lFrame.currentDirectiveIndex;
                })();
              try {
                fi(o);
                for (let l = i; l < r; l++) {
                  const c = n.data[l],
                    u = e[l];
                  pu(l),
                    (null !== c.hostBindings ||
                      0 !== c.hostVars ||
                      null !== c.hostAttrs) &&
                      C_(c, u);
                }
              } finally {
                fi(-1), pu(a);
              }
            })(n, e, t));
      }
      function pd(n, e, t = Qt) {
        const i = e.localNames;
        if (null !== i) {
          let r = e.index + 1;
          for (let s = 0; s < i.length; s += 2) {
            const o = i[s + 1],
              a = -1 === o ? t(e, n) : n[o];
            n[r++] = a;
          }
        }
      }
      function p_(n) {
        const e = n.tView;
        return null === e || e.incompleteFirstPass
          ? (n.tView = Ga(
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
          : e;
      }
      function Ga(n, e, t, i, r, s, o, a, l, c) {
        const u = 20 + i,
          d = u + r,
          h = (function QA(n, e) {
            const t = [];
            for (let i = 0; i < e; i++) t.push(i < n ? null : U);
            return t;
          })(u, d),
          f = "function" == typeof c ? c() : c;
        return (h[1] = {
          type: n,
          blueprint: h,
          template: t,
          queries: null,
          viewQuery: a,
          declTNode: e,
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
      function __(n, e, t, i) {
        const r = x_(e);
        null === t
          ? r.push(i)
          : (r.push(t), n.firstCreatePass && A_(n).push(i, r.length - 1));
      }
      function y_(n, e, t) {
        for (let i in n)
          if (n.hasOwnProperty(i)) {
            const r = n[i];
            (t = null === t ? {} : t).hasOwnProperty(i)
              ? t[i].push(e, r)
              : (t[i] = [e, r]);
          }
        return t;
      }
      function Nt(n, e, t, i, r, s, o, a) {
        const l = Qt(e, t);
        let u,
          c = e.inputs;
        !a && null != c && (u = c[i])
          ? (R_(n, t, u, i, r),
            ma(e) &&
              (function JA(n, e) {
                const t = Rt(e, n);
                16 & t[2] || (t[2] |= 64);
              })(t, e.index))
          : 3 & e.type &&
            ((i = (function XA(n) {
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
            (r = null != o ? o(r, e.value || "", i) : r),
            Ie(s)
              ? s.setProperty(l, i, r)
              : vu(i) || (l.setProperty ? l.setProperty(i, r) : (l[i] = r)));
      }
      function md(n, e, t, i) {
        let r = !1;
        if (Am()) {
          const s = (function sT(n, e, t) {
              const i = n.directiveRegistry;
              let r = null;
              if (i)
                for (let s = 0; s < i.length; s++) {
                  const o = i[s];
                  Xg(t, o.selectors, !1) &&
                    (r || (r = []),
                    Ia(js(t, e), n, o.type),
                    dn(o) ? (w_(n, t), r.unshift(o)) : r.push(o));
                }
              return r;
            })(n, e, t),
            o = null === i ? null : { "": -1 };
          if (null !== s) {
            (r = !0), D_(t, n.data.length, s.length);
            for (let u = 0; u < s.length; u++) {
              const d = s[u];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              c = Nr(n, e, s.length, null);
            for (let u = 0; u < s.length; u++) {
              const d = s[u];
              (t.mergedAttrs = xa(t.mergedAttrs, d.hostAttrs)),
                E_(n, t, e, c, d),
                aT(c, d, o),
                null !== d.contentQueries && (t.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (t.flags |= 128);
              const h = d.type.prototype;
              !a &&
                (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) &&
                ((n.preOrderHooks || (n.preOrderHooks = [])).push(t.index),
                (a = !0)),
                !l &&
                  (h.ngOnChanges || h.ngDoCheck) &&
                  ((n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(
                    t.index
                  ),
                  (l = !0)),
                c++;
            }
            !(function ZA(n, e) {
              const i = e.directiveEnd,
                r = n.data,
                s = e.attrs,
                o = [];
              let a = null,
                l = null;
              for (let c = e.directiveStart; c < i; c++) {
                const u = r[c],
                  d = u.inputs,
                  h = null === s || Zg(e) ? null : uT(d, s);
                o.push(h), (a = y_(d, c, a)), (l = y_(u.outputs, c, l));
              }
              null !== a &&
                (a.hasOwnProperty("class") && (e.flags |= 16),
                a.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = o),
                (e.inputs = a),
                (e.outputs = l);
            })(n, t);
          }
          o &&
            (function oT(n, e, t) {
              if (e) {
                const i = (n.localNames = []);
                for (let r = 0; r < e.length; r += 2) {
                  const s = t[e[r + 1]];
                  if (null == s)
                    throw new ne(
                      -301,
                      `Export of name '${e[r + 1]}' not found!`
                    );
                  i.push(e[r], s);
                }
              }
            })(t, i, o);
        }
        return (t.mergedAttrs = xa(t.mergedAttrs, t.attrs)), r;
      }
      function b_(n, e, t, i, r, s) {
        const o = s.hostBindings;
        if (o) {
          let a = n.hostBindingOpCodes;
          null === a && (a = n.hostBindingOpCodes = []);
          const l = ~e.index;
          (function nT(n) {
            let e = n.length;
            for (; e > 0; ) {
              const t = n[--e];
              if ("number" == typeof t && t < 0) return t;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(i, r, o);
        }
      }
      function C_(n, e) {
        null !== n.hostBindings && n.hostBindings(1, e);
      }
      function w_(n, e) {
        (e.flags |= 2), (n.components || (n.components = [])).push(e.index);
      }
      function aT(n, e, t) {
        if (t) {
          if (e.exportAs)
            for (let i = 0; i < e.exportAs.length; i++) t[e.exportAs[i]] = n;
          dn(e) && (t[""] = n);
        }
      }
      function D_(n, e, t) {
        (n.flags |= 1),
          (n.directiveStart = e),
          (n.directiveEnd = e + t),
          (n.providerIndexes = e);
      }
      function E_(n, e, t, i, r) {
        n.data[i] = r;
        const s = r.factory || (r.factory = Ui(r.type)),
          o = new Vs(s, dn(r), null);
        (n.blueprint[i] = o),
          (t[i] = o),
          b_(n, e, 0, i, Nr(n, t, r.hostVars, U), r);
      }
      function lT(n, e, t) {
        const i = Qt(e, n),
          r = p_(t),
          s = n[10],
          o = Wa(
            n,
            no(
              n,
              r,
              null,
              t.onPush ? 64 : 16,
              i,
              e,
              s,
              s.createRenderer(i, t),
              null,
              null
            )
          );
        n[e.index] = o;
      }
      function Rn(n, e, t, i, r, s) {
        const o = Qt(n, e);
        !(function gd(n, e, t, i, r, s, o) {
          if (null == s)
            Ie(n) ? n.removeAttribute(e, r, t) : e.removeAttribute(r);
          else {
            const a = null == o ? H(s) : o(s, i || "", r);
            Ie(n)
              ? n.setAttribute(e, r, a, t)
              : t
              ? e.setAttributeNS(t, r, a)
              : e.setAttribute(r, a);
          }
        })(e[G], o, s, n.value, t, i, r);
      }
      function cT(n, e, t, i, r, s) {
        const o = s[e];
        if (null !== o) {
          const a = i.setInput;
          for (let l = 0; l < o.length; ) {
            const c = o[l++],
              u = o[l++],
              d = o[l++];
            null !== a ? i.setInput(t, d, c, u) : (t[u] = d);
          }
        }
      }
      function uT(n, e) {
        let t = null,
          i = 0;
        for (; i < e.length; ) {
          const r = e[i];
          if (0 !== r)
            if (5 !== r) {
              if ("number" == typeof r) break;
              n.hasOwnProperty(r) &&
                (null === t && (t = []), t.push(r, n[r], e[i + 1])),
                (i += 2);
            } else i += 2;
          else i += 4;
        }
        return t;
      }
      function M_(n, e, t, i) {
        return new Array(n, !0, !1, e, null, 0, i, t, null, null);
      }
      function fT(n, e) {
        const t = Rt(e, n);
        if (uu(t)) {
          const i = t[1];
          80 & t[2] ? Lr(i, t, i.template, t[8]) : t[5] > 0 && _d(t);
        }
      }
      function _d(n) {
        for (let i = Gu(n); null !== i; i = Wu(i))
          for (let r = 10; r < i.length; r++) {
            const s = i[r];
            if (1024 & s[2]) {
              const o = s[1];
              Lr(o, s, o.template, s[8]);
            } else s[5] > 0 && _d(s);
          }
        const t = n[1].components;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const r = Rt(t[i], n);
            uu(r) && r[5] > 0 && _d(r);
          }
      }
      function pT(n, e) {
        const t = Rt(e, n),
          i = t[1];
        (function mT(n, e) {
          for (let t = e.length; t < n.blueprint.length; t++)
            e.push(n.blueprint[t]);
        })(i, t),
          io(i, t, t[8]);
      }
      function Wa(n, e) {
        return n[13] ? (n[14][4] = e) : (n[13] = e), (n[14] = e), e;
      }
      function yd(n) {
        for (; n; ) {
          n[2] |= 64;
          const e = eo(n);
          if (ZM(n) && !e) return n;
          n = e;
        }
        return null;
      }
      function bd(n, e, t) {
        const i = e[10];
        i.begin && i.begin();
        try {
          Lr(n, e, n.template, t);
        } catch (r) {
          throw (I_(e, r), r);
        } finally {
          i.end && i.end();
        }
      }
      function S_(n) {
        !(function vd(n) {
          for (let e = 0; e < n.components.length; e++) {
            const t = n.components[e],
              i = ju(t),
              r = i[1];
            KA(r, i, r.template, t);
          }
        })(n[8]);
      }
      function Cd(n, e, t) {
        gu(0), e(n, t);
      }
      const vT = (() => Promise.resolve(null))();
      function x_(n) {
        return n[7] || (n[7] = []);
      }
      function A_(n) {
        return n.cleanup || (n.cleanup = []);
      }
      function T_(n, e, t) {
        return (
          (null === n || dn(n)) &&
            (t = (function aS(n) {
              for (; Array.isArray(n); ) {
                if ("object" == typeof n[1]) return n;
                n = n[0];
              }
              return null;
            })(t[e.index])),
          t[G]
        );
      }
      function I_(n, e) {
        const t = n[9],
          i = t ? t.get(Kn, null) : null;
        i && i.handleError(e);
      }
      function R_(n, e, t, i, r) {
        for (let s = 0; s < t.length; ) {
          const o = t[s++],
            a = t[s++],
            l = e[o],
            c = n.data[o];
          null !== c.setInput ? c.setInput(l, r, i, a) : (l[a] = r);
        }
      }
      function qa(n, e, t) {
        let i = t ? n.styles : null,
          r = t ? n.classes : null,
          s = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const a = e[o];
            "number" == typeof a
              ? (s = a)
              : 1 == s
              ? (r = Qc(r, a))
              : 2 == s && (i = Qc(i, a + ": " + e[++o] + ";"));
          }
        t ? (n.styles = i) : (n.stylesWithoutHost = i),
          t ? (n.classes = r) : (n.classesWithoutHost = r);
      }
      const wd = new A("INJECTOR", -1);
      class k_ {
        get(e, t = Gs) {
          if (t === Gs) {
            const i = new Error(`NullInjectorError: No provider for ${ce(e)}!`);
            throw ((i.name = "NullInjectorError"), i);
          }
          return t;
        }
      }
      const Dd = new A("Set Injector scope."),
        ro = {},
        wT = {};
      let Ed;
      function O_() {
        return void 0 === Ed && (Ed = new k_()), Ed;
      }
      function F_(n, e = null, t = null, i) {
        const r = P_(n, e, t, i);
        return r._resolveInjectorDefTypes(), r;
      }
      function P_(n, e = null, t = null, i) {
        return new DT(n, t, e || O_(), i);
      }
      class DT {
        constructor(e, t, i, r = null) {
          (this.parent = i),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          t && xn(t, (a) => this.processProvider(a, e, t)),
            xn([e], (a) => this.processInjectorType(a, [], s)),
            this.records.set(wd, Vr(void 0, this));
          const o = this.records.get(Dd);
          (this.scope = null != o ? o.value : null),
            (this.source = r || ("object" == typeof e ? null : ce(e)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((e) => e.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(e, t = Gs, i = j.Default) {
          this.assertNotDestroyed();
          const r = ig(this),
            s = ci(void 0);
          try {
            if (!(i & j.SkipSelf)) {
              let a = this.records.get(e);
              if (void 0 === a) {
                const l =
                  (function RT(n) {
                    return (
                      "function" == typeof n ||
                      ("object" == typeof n && n instanceof A)
                    );
                  })(e) && Zc(e);
                (a = l && this.injectableDefInScope(l) ? Vr(Md(e), ro) : null),
                  this.records.set(e, a);
              }
              if (null != a) return this.hydrate(e, a);
            }
            return (i & j.Self ? O_() : this.parent).get(
              e,
              (t = i & j.Optional && t === Gs ? null : t)
            );
          } catch (o) {
            if ("NullInjectorError" === o.name) {
              if (((o[Fa] = o[Fa] || []).unshift(ce(e)), r)) throw o;
              return (function nx(n, e, t, i) {
                const r = n[Fa];
                throw (
                  (e[ng] && r.unshift(e[ng]),
                  (n.message = (function ix(n, e, t, i = null) {
                    n =
                      n && "\n" === n.charAt(0) && "\u0275" == n.charAt(1)
                        ? n.substr(2)
                        : n;
                    let r = ce(e);
                    if (Array.isArray(e)) r = e.map(ce).join(" -> ");
                    else if ("object" == typeof e) {
                      let s = [];
                      for (let o in e)
                        if (e.hasOwnProperty(o)) {
                          let a = e[o];
                          s.push(
                            o +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : ce(a))
                          );
                        }
                      r = `{${s.join(", ")}}`;
                    }
                    return `${t}${i ? "(" + i + ")" : ""}[${r}]: ${n.replace(
                      ZS,
                      "\n  "
                    )}`;
                  })("\n" + n.message, r, t, i)),
                  (n.ngTokenPath = r),
                  (n[Fa] = null),
                  n)
                );
              })(o, e, "R3InjectorError", this.source);
            }
            throw o;
          } finally {
            ci(s), ig(r);
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((e) => this.get(e));
        }
        toString() {
          const e = [];
          return (
            this.records.forEach((i, r) => e.push(ce(r))),
            `R3Injector[${e.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new ne(205, "");
        }
        processInjectorType(e, t, i) {
          if (!(e = z(e))) return !1;
          let r = dm(e);
          const s = (null == r && e.ngModule) || void 0,
            o = void 0 === s ? e : s,
            a = -1 !== i.indexOf(o);
          if ((void 0 !== s && (r = dm(s)), null == r)) return !1;
          if (null != r.imports && !a) {
            let u;
            i.push(o);
            try {
              xn(r.imports, (d) => {
                this.processInjectorType(d, t, i) &&
                  (void 0 === u && (u = []), u.push(d));
              });
            } finally {
            }
            if (void 0 !== u)
              for (let d = 0; d < u.length; d++) {
                const { ngModule: h, providers: f } = u[d];
                xn(f, (p) => this.processProvider(p, h, f || ge));
              }
          }
          this.injectorDefTypes.add(o);
          const l = Ui(o) || (() => new o());
          this.records.set(o, Vr(l, ro));
          const c = r.providers;
          if (null != c && !a) {
            const u = e;
            xn(c, (d) => this.processProvider(d, u, c));
          }
          return void 0 !== s && void 0 !== e.providers;
        }
        processProvider(e, t, i) {
          let r = Br((e = z(e))) ? e : z(e && e.provide);
          const s = (function MT(n, e, t) {
            return L_(n) ? Vr(void 0, n.useValue) : Vr(N_(n), ro);
          })(e);
          if (Br(e) || !0 !== e.multi) this.records.get(r);
          else {
            let o = this.records.get(r);
            o ||
              ((o = Vr(void 0, ro, !0)),
              (o.factory = () => Iu(o.multi)),
              this.records.set(r, o)),
              (r = e),
              o.multi.push(e);
          }
          this.records.set(r, s);
        }
        hydrate(e, t) {
          return (
            t.value === ro && ((t.value = wT), (t.value = t.factory())),
            "object" == typeof t.value &&
              t.value &&
              (function IT(n) {
                return (
                  null !== n &&
                  "object" == typeof n &&
                  "function" == typeof n.ngOnDestroy
                );
              })(t.value) &&
              this.onDestroy.add(t.value),
            t.value
          );
        }
        injectableDefInScope(e) {
          if (!e.providedIn) return !1;
          const t = z(e.providedIn);
          return "string" == typeof t
            ? "any" === t || t === this.scope
            : this.injectorDefTypes.has(t);
        }
      }
      function Md(n) {
        const e = Zc(n),
          t = null !== e ? e.factory : Ui(n);
        if (null !== t) return t;
        if (n instanceof A) throw new ne(204, "");
        if (n instanceof Function)
          return (function ET(n) {
            const e = n.length;
            if (e > 0) throw (zs(e, "?"), new ne(204, ""));
            const t = (function VM(n) {
              const e = n && (n[ua] || n[hm]);
              if (e) {
                const t = (function BM(n) {
                  if (n.hasOwnProperty("name")) return n.name;
                  const e = ("" + n).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(n);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${t}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${t}" class.`
                  ),
                  e
                );
              }
              return null;
            })(n);
            return null !== t ? () => t.factory(n) : () => new n();
          })(n);
        throw new ne(204, "");
      }
      function N_(n, e, t) {
        let i;
        if (Br(n)) {
          const r = z(n);
          return Ui(r) || Md(r);
        }
        if (L_(n)) i = () => z(n.useValue);
        else if (
          (function xT(n) {
            return !(!n || !n.useFactory);
          })(n)
        )
          i = () => n.useFactory(...Iu(n.deps || []));
        else if (
          (function ST(n) {
            return !(!n || !n.useExisting);
          })(n)
        )
          i = () => C(z(n.useExisting));
        else {
          const r = z(n && (n.useClass || n.provide));
          if (
            !(function TT(n) {
              return !!n.deps;
            })(n)
          )
            return Ui(r) || Md(r);
          i = () => new r(...Iu(n.deps));
        }
        return i;
      }
      function Vr(n, e, t = !1) {
        return { factory: n, value: e, multi: t ? [] : void 0 };
      }
      function L_(n) {
        return null !== n && "object" == typeof n && JS in n;
      }
      function Br(n) {
        return "function" == typeof n;
      }
      let we = (() => {
        class n {
          static create(t, i) {
            var r;
            if (Array.isArray(t)) return F_({ name: "" }, i, t, "");
            {
              const s = null !== (r = t.name) && void 0 !== r ? r : "";
              return F_({ name: s }, t.parent, t.providers, s);
            }
          }
        }
        return (
          (n.THROW_IF_NOT_FOUND = Gs),
          (n.NULL = new k_()),
          (n.ɵprov = R({ token: n, providedIn: "any", factory: () => C(wd) })),
          (n.__NG_ELEMENT_ID__ = -1),
          n
        );
      })();
      function BT(n, e) {
        Da(ju(n)[1], Ge());
      }
      function Q(n) {
        let e = (function Q_(n) {
            return Object.getPrototypeOf(n.prototype).constructor;
          })(n.type),
          t = !0;
        const i = [n];
        for (; e; ) {
          let r;
          if (dn(n)) r = e.ɵcmp || e.ɵdir;
          else {
            if (e.ɵcmp) throw new ne(903, "");
            r = e.ɵdir;
          }
          if (r) {
            if (t) {
              i.push(r);
              const o = n;
              (o.inputs = Ad(n.inputs)),
                (o.declaredInputs = Ad(n.declaredInputs)),
                (o.outputs = Ad(n.outputs));
              const a = r.hostBindings;
              a && $T(n, a);
              const l = r.viewQuery,
                c = r.contentQueries;
              if (
                (l && HT(n, l),
                c && UT(n, c),
                Kc(n.inputs, r.inputs),
                Kc(n.declaredInputs, r.declaredInputs),
                Kc(n.outputs, r.outputs),
                dn(r) && r.data.animation)
              ) {
                const u = n.data;
                u.animation = (u.animation || []).concat(r.data.animation);
              }
            }
            const s = r.features;
            if (s)
              for (let o = 0; o < s.length; o++) {
                const a = s[o];
                a && a.ngInherit && a(n), a === Q && (t = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function jT(n) {
          let e = 0,
            t = null;
          for (let i = n.length - 1; i >= 0; i--) {
            const r = n[i];
            (r.hostVars = e += r.hostVars),
              (r.hostAttrs = xa(r.hostAttrs, (t = xa(t, r.hostAttrs))));
          }
        })(i);
      }
      function Ad(n) {
        return n === gr ? {} : n === ge ? [] : n;
      }
      function HT(n, e) {
        const t = n.viewQuery;
        n.viewQuery = t
          ? (i, r) => {
              e(i, r), t(i, r);
            }
          : e;
      }
      function UT(n, e) {
        const t = n.contentQueries;
        n.contentQueries = t
          ? (i, r, s) => {
              e(i, r, s), t(i, r, s);
            }
          : e;
      }
      function $T(n, e) {
        const t = n.hostBindings;
        n.hostBindings = t
          ? (i, r) => {
              e(i, r), t(i, r);
            }
          : e;
      }
      let Ka = null;
      function jr() {
        if (!Ka) {
          const n = pe.Symbol;
          if (n && n.iterator) Ka = n.iterator;
          else {
            const e = Object.getOwnPropertyNames(Map.prototype);
            for (let t = 0; t < e.length; ++t) {
              const i = e[t];
              "entries" !== i &&
                "size" !== i &&
                Map.prototype[i] === Map.prototype.entries &&
                (Ka = i);
            }
          }
        }
        return Ka;
      }
      function so(n) {
        return (
          !!Td(n) && (Array.isArray(n) || (!(n instanceof Map) && jr() in n))
        );
      }
      function Td(n) {
        return null !== n && ("function" == typeof n || "object" == typeof n);
      }
      function lt(n, e, t) {
        return !Object.is(n[e], t) && ((n[e] = t), !0);
      }
      function qe(n, e, t, i) {
        const r = D();
        return lt(r, wr(), e) && (ie(), Rn(Re(), r, n, e, t, i)), qe;
      }
      function On(n, e, t, i, r, s, o, a) {
        const l = D(),
          c = ie(),
          u = n + 20,
          d = c.firstCreatePass
            ? (function YT(n, e, t, i, r, s, o, a, l) {
                const c = e.consts,
                  u = Pr(e, n, 4, o || null, hi(c, a));
                md(e, t, u, hi(c, l)), Da(e, u);
                const d = (u.tViews = Ga(
                  2,
                  u,
                  i,
                  r,
                  s,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  c
                ));
                return (
                  null !== e.queries &&
                    (e.queries.template(e, u),
                    (d.queries = e.queries.embeddedTView(u))),
                  u
                );
              })(u, c, l, e, t, i, r, s, o)
            : c.data[u];
        Sn(d, !1);
        const h = l[G].createComment("");
        ja(c, l, h, d),
          at(h, l),
          Wa(l, (l[u] = M_(h, l, h, d))),
          ga(d) && fd(c, l, d),
          null != o && pd(l, d, a);
      }
      function y(n, e = j.Default) {
        const t = D();
        return null === t ? C(n, e) : Wm(Ge(), t, z(n), e);
      }
      function Za() {
        throw new Error("invalid");
      }
      function mt(n, e, t) {
        const i = D();
        return lt(i, wr(), e) && Nt(ie(), Re(), i, n, e, i[G], t, !1), mt;
      }
      function Fd(n, e, t, i, r) {
        const o = r ? "class" : "style";
        R_(n, t, e.inputs[o], o, i);
      }
      function m(n, e, t, i) {
        const r = D(),
          s = ie(),
          o = 20 + n,
          a = r[G],
          l = (r[o] = Ku(
            a,
            e,
            (function SS() {
              return B.lFrame.currentNamespace;
            })()
          )),
          c = s.firstCreatePass
            ? (function yI(n, e, t, i, r, s, o) {
                const a = e.consts,
                  c = Pr(e, n, 2, r, hi(a, s));
                return (
                  md(e, t, c, hi(a, o)),
                  null !== c.attrs && qa(c, c.attrs, !1),
                  null !== c.mergedAttrs && qa(c, c.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, c),
                  c
                );
              })(o, s, r, 0, e, t, i)
            : s.data[o];
        Sn(c, !0);
        const u = c.mergedAttrs;
        null !== u && Sa(a, l, u);
        const d = c.classes;
        null !== d && ed(a, l, d);
        const h = c.styles;
        null !== h && Kg(a, l, h),
          64 != (64 & c.flags) && ja(s, r, l, c),
          0 ===
            (function uS() {
              return B.lFrame.elementDepthCount;
            })() && at(l, r),
          (function dS() {
            B.lFrame.elementDepthCount++;
          })(),
          ga(c) && (fd(s, r, c), f_(s, c, r)),
          null !== i && pd(r, c);
      }
      function g() {
        let n = Ge();
        hu() ? fu() : ((n = n.parent), Sn(n, !1));
        const e = n;
        !(function hS() {
          B.lFrame.elementDepthCount--;
        })();
        const t = ie();
        t.firstCreatePass && (Da(t, n), ru(n) && t.queries.elementEnd(n)),
          null != e.classesWithoutHost &&
            (function RS(n) {
              return 0 != (16 & n.flags);
            })(e) &&
            Fd(t, e, D(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function kS(n) {
              return 0 != (32 & n.flags);
            })(e) &&
            Fd(t, e, D(), e.stylesWithoutHost, !1);
      }
      function L(n, e, t, i) {
        m(n, e, t, i), g();
      }
      function Xa() {
        return D();
      }
      function ao(n) {
        return !!n && "function" == typeof n.then;
      }
      const Ld = function my(n) {
        return !!n && "function" == typeof n.subscribe;
      };
      function ye(n, e, t, i) {
        const r = D(),
          s = ie(),
          o = Ge();
        return gy(s, r, r[G], o, n, e, !!t, i), ye;
      }
      function Ja(n, e) {
        const t = Ge(),
          i = D(),
          r = ie();
        return gy(r, i, T_(mu(r.data), t, i), t, n, e, !1), Ja;
      }
      function gy(n, e, t, i, r, s, o, a) {
        const l = ga(i),
          u = n.firstCreatePass && A_(n),
          d = e[8],
          h = x_(e);
        let f = !0;
        if (3 & i.type || a) {
          const b = Qt(i, e),
            w = a ? a(b) : b,
            v = h.length,
            M = a ? (T) => a(Be(T[i.index])) : i.index;
          if (Ie(t)) {
            let T = null;
            if (
              (!a &&
                l &&
                (T = (function CI(n, e, t, i) {
                  const r = n.cleanup;
                  if (null != r)
                    for (let s = 0; s < r.length - 1; s += 2) {
                      const o = r[s];
                      if (o === t && r[s + 1] === i) {
                        const a = e[7],
                          l = r[s + 2];
                        return a.length > l ? a[l] : null;
                      }
                      "string" == typeof o && (s += 2);
                    }
                  return null;
                })(n, e, r, i.index)),
              null !== T)
            )
              ((T.__ngLastListenerFn__ || T).__ngNextListenerFn__ = s),
                (T.__ngLastListenerFn__ = s),
                (f = !1);
            else {
              s = Vd(i, e, d, s, !1);
              const $ = t.listen(w, r, s);
              h.push(s, $), u && u.push(r, M, v, v + 1);
            }
          } else
            (s = Vd(i, e, d, s, !0)),
              w.addEventListener(r, s, o),
              h.push(s),
              u && u.push(r, M, v, o);
        } else s = Vd(i, e, d, s, !1);
        const p = i.outputs;
        let _;
        if (f && null !== p && (_ = p[r])) {
          const b = _.length;
          if (b)
            for (let w = 0; w < b; w += 2) {
              const Me = e[_[w]][_[w + 1]].subscribe(s),
                Ae = h.length;
              h.push(s, Me), u && u.push(r, i.index, Ae, -(Ae + 1));
            }
        }
      }
      function _y(n, e, t, i) {
        try {
          return !1 !== t(i);
        } catch (r) {
          return I_(n, r), !1;
        }
      }
      function Vd(n, e, t, i, r) {
        return function s(o) {
          if (o === Function) return i;
          const a = 2 & n.flags ? Rt(n.index, e) : e;
          0 == (32 & e[2]) && yd(a);
          let l = _y(e, 0, i, o),
            c = s.__ngNextListenerFn__;
          for (; c; ) (l = _y(e, 0, c, o) && l), (c = c.__ngNextListenerFn__);
          return r && !1 === l && (o.preventDefault(), (o.returnValue = !1)), l;
        };
      }
      function yi(n = 1) {
        return (function bS(n) {
          return (B.lFrame.contextLView = (function CS(n, e) {
            for (; n > 0; ) (e = e[15]), n--;
            return e;
          })(n, B.lFrame.contextLView))[8];
        })(n);
      }
      function wI(n, e) {
        let t = null;
        const i = (function AA(n) {
          const e = n.attrs;
          if (null != e) {
            const t = e.indexOf(5);
            if (0 == (1 & t)) return e[t + 1];
          }
          return null;
        })(n);
        for (let r = 0; r < e.length; r++) {
          const s = e[r];
          if ("*" !== s) {
            if (null === i ? Xg(n, s, !0) : RA(i, s)) return r;
          } else t = r;
        }
        return t;
      }
      function Zn(n) {
        const e = D()[16][6];
        if (!e.projection) {
          const i = (e.projection = zs(n ? n.length : 1, null)),
            r = i.slice();
          let s = e.child;
          for (; null !== s; ) {
            const o = n ? wI(s, n) : 0;
            null !== o &&
              (r[o] ? (r[o].projectionNext = s) : (i[o] = s), (r[o] = s)),
              (s = s.next);
          }
        }
      }
      function Et(n, e = 0, t) {
        const i = D(),
          r = ie(),
          s = Pr(r, 20 + n, 16, null, t || null);
        null === s.projection && (s.projection = e),
          fu(),
          64 != (64 & s.flags) &&
            (function CA(n, e, t) {
              qg(e[G], 0, e, t, Lg(n, t, e), Hg(t.parent || e[6], t, e));
            })(r, i, s);
      }
      function xy(n, e, t, i, r) {
        const s = n[t + 1],
          o = null === e;
        let a = i ? fn(s) : Qn(s),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const u = n[a + 1];
          MI(n[a], e) && ((l = !0), (n[a + 1] = i ? id(u) : td(u))),
            (a = i ? fn(u) : Qn(u));
        }
        l && (n[t + 1] = i ? td(s) : id(s));
      }
      function MI(n, e) {
        return (
          null === n ||
          null == e ||
          (Array.isArray(n) ? n[1] : n) === e ||
          (!(!Array.isArray(n) || "string" != typeof e) && Ir(n, e) >= 0)
        );
      }
      function jd(n, e, t) {
        return mn(n, e, t, !1), jd;
      }
      function Je(n, e) {
        return mn(n, e, null, !0), Je;
      }
      function mn(n, e, t, i) {
        const r = D(),
          s = ie(),
          o = (function qn(n) {
            const e = B.lFrame,
              t = e.bindingIndex;
            return (e.bindingIndex = e.bindingIndex + n), t;
          })(2);
        s.firstUpdatePass &&
          (function Py(n, e, t, i) {
            const r = n.data;
            if (null === r[t + 1]) {
              const s = r[ft()],
                o = (function Fy(n, e) {
                  return e >= n.expandoStartIndex;
                })(n, t);
              (function By(n, e) {
                return 0 != (n.flags & (e ? 16 : 32));
              })(s, i) &&
                null === e &&
                !o &&
                (e = !1),
                (e = (function FI(n, e, t, i) {
                  const r = mu(n);
                  let s = i ? e.residualClasses : e.residualStyles;
                  if (null === r)
                    0 === (i ? e.classBindings : e.styleBindings) &&
                      ((t = lo((t = Hd(null, n, e, t, i)), e.attrs, i)),
                      (s = null));
                  else {
                    const o = e.directiveStylingLast;
                    if (-1 === o || n[o] !== r)
                      if (((t = Hd(r, n, e, t, i)), null === s)) {
                        let l = (function PI(n, e, t) {
                          const i = t ? e.classBindings : e.styleBindings;
                          if (0 !== Qn(i)) return n[fn(i)];
                        })(n, e, i);
                        void 0 !== l &&
                          Array.isArray(l) &&
                          ((l = Hd(null, n, e, l[1], i)),
                          (l = lo(l, e.attrs, i)),
                          (function NI(n, e, t, i) {
                            n[fn(t ? e.classBindings : e.styleBindings)] = i;
                          })(n, e, i, l));
                      } else
                        s = (function LI(n, e, t) {
                          let i;
                          const r = e.directiveEnd;
                          for (let s = 1 + e.directiveStylingLast; s < r; s++)
                            i = lo(i, n[s].hostAttrs, t);
                          return lo(i, e.attrs, t);
                        })(n, e, i);
                  }
                  return (
                    void 0 !== s &&
                      (i ? (e.residualClasses = s) : (e.residualStyles = s)),
                    t
                  );
                })(r, s, e, i)),
                (function DI(n, e, t, i, r, s) {
                  let o = s ? e.classBindings : e.styleBindings,
                    a = fn(o),
                    l = Qn(o);
                  n[i] = t;
                  let u,
                    c = !1;
                  if (Array.isArray(t)) {
                    const d = t;
                    (u = d[1]), (null === u || Ir(d, u) > 0) && (c = !0);
                  } else u = t;
                  if (r)
                    if (0 !== l) {
                      const h = fn(n[a + 1]);
                      (n[i + 1] = Ua(h, a)),
                        0 !== h && (n[h + 1] = nd(n[h + 1], i)),
                        (n[a + 1] = (function PA(n, e) {
                          return (131071 & n) | (e << 17);
                        })(n[a + 1], i));
                    } else
                      (n[i + 1] = Ua(a, 0)),
                        0 !== a && (n[a + 1] = nd(n[a + 1], i)),
                        (a = i);
                  else
                    (n[i + 1] = Ua(l, 0)),
                      0 === a ? (a = i) : (n[l + 1] = nd(n[l + 1], i)),
                      (l = i);
                  c && (n[i + 1] = td(n[i + 1])),
                    xy(n, u, i, !0),
                    xy(n, u, i, !1),
                    (function EI(n, e, t, i, r) {
                      const s = r ? n.residualClasses : n.residualStyles;
                      null != s &&
                        "string" == typeof e &&
                        Ir(s, e) >= 0 &&
                        (t[i + 1] = id(t[i + 1]));
                    })(e, u, n, i, s),
                    (o = Ua(a, l)),
                    s ? (e.classBindings = o) : (e.styleBindings = o);
                })(r, s, e, t, o, i);
            }
          })(s, n, o, i),
          e !== U &&
            lt(r, o, e) &&
            (function Ly(n, e, t, i, r, s, o, a) {
              if (!(3 & e.type)) return;
              const l = n.data,
                c = l[a + 1];
              el(
                (function i_(n) {
                  return 1 == (1 & n);
                })(c)
                  ? Vy(l, e, t, r, Qn(c), o)
                  : void 0
              ) ||
                (el(s) ||
                  ((function n_(n) {
                    return 2 == (2 & n);
                  })(c) &&
                    (s = Vy(l, null, t, r, a, o))),
                (function DA(n, e, t, i, r) {
                  const s = Ie(n);
                  if (e)
                    r
                      ? s
                        ? n.addClass(t, i)
                        : t.classList.add(i)
                      : s
                      ? n.removeClass(t, i)
                      : t.classList.remove(i);
                  else {
                    let o = -1 === i.indexOf("-") ? void 0 : Pt.DashCase;
                    if (null == r)
                      s ? n.removeStyle(t, i, o) : t.style.removeProperty(i);
                    else {
                      const a =
                        "string" == typeof r && r.endsWith("!important");
                      a && ((r = r.slice(0, -10)), (o |= Pt.Important)),
                        s
                          ? n.setStyle(t, i, r, o)
                          : t.style.setProperty(i, r, a ? "important" : "");
                    }
                  }
                })(
                  i,
                  o,
                  (function _a(n, e) {
                    return Be(e[n]);
                  })(ft(), t),
                  r,
                  s
                ));
            })(
              s,
              s.data[ft()],
              r,
              r[G],
              n,
              (r[o + 1] = (function jI(n, e) {
                return (
                  null == n ||
                    ("string" == typeof e
                      ? (n += e)
                      : "object" == typeof n && (n = ce(Ft(n)))),
                  n
                );
              })(e, t)),
              i,
              o
            );
      }
      function Hd(n, e, t, i, r) {
        let s = null;
        const o = t.directiveEnd;
        let a = t.directiveStylingLast;
        for (
          -1 === a ? (a = t.directiveStart) : a++;
          a < o && ((s = e[a]), (i = lo(i, s.hostAttrs, r)), s !== n);

        )
          a++;
        return null !== n && (t.directiveStylingLast = a), i;
      }
      function lo(n, e, t) {
        const i = t ? 1 : 2;
        let r = -1;
        if (null !== e)
          for (let s = 0; s < e.length; s++) {
            const o = e[s];
            "number" == typeof o
              ? (r = o)
              : r === i &&
                (Array.isArray(n) || (n = void 0 === n ? [] : ["", n]),
                kt(n, o, !!t || e[++s]));
          }
        return void 0 === n ? null : n;
      }
      function Vy(n, e, t, i, r, s) {
        const o = null === e;
        let a;
        for (; r > 0; ) {
          const l = n[r],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            d = null === u;
          let h = t[r + 1];
          h === U && (h = d ? ge : void 0);
          let f = d ? Su(h, i) : u === i ? h : void 0;
          if ((c && !el(f) && (f = Su(l, i)), el(f) && ((a = f), o))) return a;
          const p = n[r + 1];
          r = o ? fn(p) : Qn(p);
        }
        if (null !== e) {
          let l = s ? e.residualClasses : e.residualStyles;
          null != l && (a = Su(l, i));
        }
        return a;
      }
      function el(n) {
        return void 0 !== n;
      }
      function E(n, e = "") {
        const t = D(),
          i = ie(),
          r = n + 20,
          s = i.firstCreatePass ? Pr(i, r, 1, e, null) : i.data[r],
          o = (t[r] = (function qu(n, e) {
            return Ie(n) ? n.createText(e) : n.createTextNode(e);
          })(t[G], e));
        ja(i, t, o, s), Sn(s, !1);
      }
      function $d(n, e, t) {
        const i = D();
        return lt(i, wr(), e) && Nt(ie(), Re(), i, n, e, i[G], t, !0), $d;
      }
      function tl(n, e, t) {
        const i = D();
        if (lt(i, wr(), e)) {
          const s = ie(),
            o = Re();
          Nt(s, o, i, n, e, T_(mu(s.data), o, i), t, !0);
        }
        return tl;
      }
      const qi = void 0;
      var oR = [
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
        function sR(n) {
          const t = Math.floor(Math.abs(n)),
            i = n.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === t && 0 === i ? 1 : 5;
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
      const nl = "en-US";
      let ov = nl;
      function Wd(n, e, t, i, r) {
        if (((n = z(n)), Array.isArray(n)))
          for (let s = 0; s < n.length; s++) Wd(n[s], e, t, i, r);
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
              p = Kd(a, e, r ? u : u + h, d);
            -1 === p
              ? (Ia(js(c, o), s, a),
                qd(s, n, e.length),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                t.push(f),
                o.push(f))
              : ((t[p] = f), (o[p] = f));
          } else {
            const f = Kd(a, e, u + h, d),
              p = Kd(a, e, u, u + h),
              _ = f >= 0 && t[f],
              b = p >= 0 && t[p];
            if ((r && !b) || (!r && !_)) {
              Ia(js(c, o), s, a);
              const w = (function sk(n, e, t, i, r) {
                const s = new Vs(n, t, y);
                return (
                  (s.multi = []),
                  (s.index = e),
                  (s.componentProviders = 0),
                  Iv(s, r, i && !t),
                  s
                );
              })(r ? rk : ik, t.length, r, i, l);
              !r && b && (t[p].providerFactory = w),
                qd(s, n, e.length, 0),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                t.push(w),
                o.push(w);
            } else qd(s, n, f > -1 ? f : p, Iv(t[r ? p : f], l, !r && i));
            !r && i && b && t[p].componentProviders++;
          }
        }
      }
      function qd(n, e, t, i) {
        const r = Br(e),
          s = (function AT(n) {
            return !!n.useClass;
          })(e);
        if (r || s) {
          const l = (s ? z(e.useClass) : e).prototype.ngOnDestroy;
          if (l) {
            const c = n.destroyHooks || (n.destroyHooks = []);
            if (!r && e.multi) {
              const u = c.indexOf(t);
              -1 === u ? c.push(t, [i, l]) : c[u + 1].push(i, l);
            } else c.push(t, l);
          }
        }
      }
      function Iv(n, e, t) {
        return t && n.componentProviders++, n.multi.push(e) - 1;
      }
      function Kd(n, e, t, i) {
        for (let r = t; r < i; r++) if (e[r] === n) return r;
        return -1;
      }
      function ik(n, e, t, i) {
        return Qd(this.multi, []);
      }
      function rk(n, e, t, i) {
        const r = this.multi;
        let s;
        if (this.providerFactory) {
          const o = this.providerFactory.componentProviders,
            a = Hs(t, t[1], this.providerFactory.index, i);
          (s = a.slice(0, o)), Qd(r, s);
          for (let l = o; l < a.length; l++) s.push(a[l]);
        } else (s = []), Qd(r, s);
        return s;
      }
      function Qd(n, e) {
        for (let t = 0; t < n.length; t++) e.push((0, n[t])());
        return e;
      }
      function de(n, e = []) {
        return (t) => {
          t.providersResolver = (i, r) =>
            (function nk(n, e, t) {
              const i = ie();
              if (i.firstCreatePass) {
                const r = dn(n);
                Wd(t, i.data, i.blueprint, r, !0),
                  Wd(e, i.data, i.blueprint, r, !1);
              }
            })(i, r ? r(n) : n, e);
        };
      }
      class Rv {}
      class lk {
        resolveComponentFactory(e) {
          throw (function ak(n) {
            const e = Error(
              `No component factory found for ${ce(
                n
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = n), e;
          })(e);
        }
      }
      let vi = (() => {
        class n {}
        return (n.NULL = new lk()), n;
      })();
      function ck() {
        return es(Ge(), D());
      }
      function es(n, e) {
        return new ve(Qt(n, e));
      }
      let ve = (() => {
        class n {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (n.__NG_ELEMENT_ID__ = ck), n;
      })();
      function uk(n) {
        return n instanceof ve ? n.nativeElement : n;
      }
      class po {}
      let fk = (() => {
        class n {}
        return (
          (n.ɵprov = R({ token: n, providedIn: "root", factory: () => null })),
          n
        );
      })();
      class Ki {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e.split(".").slice(2).join("."));
        }
      }
      const pk = new Ki("13.1.3"),
        Yd = {};
      function al(n, e, t, i, r = !1) {
        for (; null !== t; ) {
          const s = e[t.index];
          if ((null !== s && i.push(Be(s)), un(s)))
            for (let a = 10; a < s.length; a++) {
              const l = s[a],
                c = l[1].firstChild;
              null !== c && al(l[1], l, c, i);
            }
          const o = t.type;
          if (8 & o) al(n, e, t.child, i);
          else if (32 & o) {
            const a = zu(t, e);
            let l;
            for (; (l = a()); ) i.push(l);
          } else if (16 & o) {
            const a = Gg(e, t);
            if (Array.isArray(a)) i.push(...a);
            else {
              const l = eo(e[16]);
              al(l[1], l, a, i, !0);
            }
          }
          t = r ? t.projectionNext : t.next;
        }
        return i;
      }
      class mo {
        constructor(e, t) {
          (this._lView = e),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const e = this._lView,
            t = e[1];
          return al(t, e, t.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(e) {
          this._lView[8] = e;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const e = this._lView[3];
            if (un(e)) {
              const t = e[8],
                i = t ? t.indexOf(this) : -1;
              i > -1 && (Qu(e, i), ka(t, i));
            }
            this._attachedToViewContainer = !1;
          }
          Ng(this._lView[1], this._lView);
        }
        onDestroy(e) {
          __(this._lView[1], this._lView, null, e);
        }
        markForCheck() {
          yd(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          bd(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function _T(n, e, t) {
            ba(!0);
            try {
              bd(n, e, t);
            } finally {
              ba(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef) throw new ne(902, "");
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function fA(n, e) {
              to(n, e, e[G], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(e) {
          if (this._attachedToViewContainer) throw new ne(902, "");
          this._appRef = e;
        }
      }
      class mk extends mo {
        constructor(e) {
          super(e), (this._view = e);
        }
        detectChanges() {
          S_(this._view);
        }
        checkNoChanges() {
          !(function yT(n) {
            ba(!0);
            try {
              S_(n);
            } finally {
              ba(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      class Ov extends vi {
        constructor(e) {
          super(), (this.ngModule = e);
        }
        resolveComponentFactory(e) {
          const t = it(e);
          return new Zd(t, this.ngModule);
        }
      }
      function Fv(n) {
        const e = [];
        for (let t in n)
          n.hasOwnProperty(t) && e.push({ propName: n[t], templateName: t });
        return e;
      }
      const _k = new A("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Ag,
      });
      class Zd extends Rv {
        constructor(e, t) {
          super(),
            (this.componentDef = e),
            (this.ngModule = t),
            (this.componentType = e.type),
            (this.selector = (function OA(n) {
              return n.map(kA).join(",");
            })(e.selectors)),
            (this.ngContentSelectors = e.ngContentSelectors
              ? e.ngContentSelectors
              : []),
            (this.isBoundToModule = !!t);
        }
        get inputs() {
          return Fv(this.componentDef.inputs);
        }
        get outputs() {
          return Fv(this.componentDef.outputs);
        }
        create(e, t, i, r) {
          const s = (r = r || this.ngModule)
              ? (function yk(n, e) {
                  return {
                    get: (t, i, r) => {
                      const s = n.get(t, Yd, r);
                      return s !== Yd || i === Yd ? s : e.get(t, i, r);
                    },
                  };
                })(e, r.injector)
              : e,
            o = s.get(po, Mm),
            a = s.get(fk, null),
            l = o.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            u = i
              ? (function g_(n, e, t) {
                  if (Ie(n)) return n.selectRootElement(e, t === ln.ShadowDom);
                  let i = "string" == typeof e ? n.querySelector(e) : e;
                  return (i.textContent = ""), i;
                })(l, i, this.componentDef.encapsulation)
              : Ku(
                  o.createRenderer(null, this.componentDef),
                  c,
                  (function gk(n) {
                    const e = n.toLowerCase();
                    return "svg" === e
                      ? "http://www.w3.org/2000/svg"
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(c)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            h = (function K_(n, e) {
              return {
                components: [],
                scheduler: n || Ag,
                clean: vT,
                playerHandler: e || null,
                flags: 0,
              };
            })(),
            f = Ga(0, null, null, 1, 0, null, null, null, null, null),
            p = no(null, f, h, d, null, null, o, l, a, s);
          let _, b;
          Ca(p);
          try {
            const w = (function W_(n, e, t, i, r, s) {
              const o = t[1];
              t[20] = n;
              const l = Pr(o, 20, 2, "#host", null),
                c = (l.mergedAttrs = e.hostAttrs);
              null !== c &&
                (qa(l, c, !0),
                null !== n &&
                  (Sa(r, n, c),
                  null !== l.classes && ed(r, n, l.classes),
                  null !== l.styles && Kg(r, n, l.styles)));
              const u = i.createRenderer(n, e),
                d = no(
                  t,
                  p_(e),
                  null,
                  e.onPush ? 64 : 16,
                  t[20],
                  l,
                  i,
                  u,
                  s || null,
                  null
                );
              return (
                o.firstCreatePass &&
                  (Ia(js(l, t), o, e.type), w_(o, l), D_(l, t.length, 1)),
                Wa(t, d),
                (t[20] = d)
              );
            })(u, this.componentDef, p, o, l);
            if (u)
              if (i) Sa(l, u, ["ng-version", pk.full]);
              else {
                const { attrs: v, classes: M } = (function FA(n) {
                  const e = [],
                    t = [];
                  let i = 1,
                    r = 2;
                  for (; i < n.length; ) {
                    let s = n[i];
                    if ("string" == typeof s)
                      2 === r
                        ? "" !== s && e.push(s, n[++i])
                        : 8 === r && t.push(s);
                    else {
                      if (!hn(r)) break;
                      r = s;
                    }
                    i++;
                  }
                  return { attrs: e, classes: t };
                })(this.componentDef.selectors[0]);
                v && Sa(l, u, v), M && M.length > 0 && ed(l, u, M.join(" "));
              }
            if (((b = cu(f, 20)), void 0 !== t)) {
              const v = (b.projection = []);
              for (let M = 0; M < this.ngContentSelectors.length; M++) {
                const T = t[M];
                v.push(null != T ? Array.from(T) : null);
              }
            }
            (_ = (function q_(n, e, t, i, r) {
              const s = t[1],
                o = (function tT(n, e, t) {
                  const i = Ge();
                  n.firstCreatePass &&
                    (t.providersResolver && t.providersResolver(t),
                    E_(n, i, e, Nr(n, e, 1, null), t));
                  const r = Hs(e, n, i.directiveStart, i);
                  at(r, e);
                  const s = Qt(i, e);
                  return s && at(s, e), r;
                })(s, t, e);
              if (
                (i.components.push(o),
                (n[8] = o),
                r && r.forEach((l) => l(o, e)),
                e.contentQueries)
              ) {
                const l = Ge();
                e.contentQueries(1, o, l.directiveStart);
              }
              const a = Ge();
              return (
                !s.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (fi(a.index),
                  b_(t[1], a, 0, a.directiveStart, a.directiveEnd, e),
                  C_(e, o)),
                o
              );
            })(w, this.componentDef, p, h, [BT])),
              io(f, p, null);
          } finally {
            wa();
          }
          return new bk(this.componentType, _, es(b, p), p, b);
        }
      }
      class bk extends class ok {} {
        constructor(e, t, i, r, s) {
          super(),
            (this.location = i),
            (this._rootLView = r),
            (this._tNode = s),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new mk(r)),
            (this.componentType = e);
        }
        get injector() {
          return new Mr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(e) {
          this.hostView.onDestroy(e);
        }
      }
      class Jn {}
      class Pv {}
      const ts = new Map();
      class Vv extends Jn {
        constructor(e, t) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Ov(this));
          const i = Wt(e);
          (this._bootstrapComponents = In(i.bootstrap)),
            (this._r3Injector = P_(
              e,
              t,
              [
                { provide: Jn, useValue: this },
                { provide: vi, useValue: this.componentFactoryResolver },
              ],
              ce(e)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(e));
        }
        get(e, t = we.THROW_IF_NOT_FOUND, i = j.Default) {
          return e === we || e === Jn || e === wd
            ? this
            : this._r3Injector.get(e, t, i);
        }
        destroy() {
          const e = this._r3Injector;
          !e.destroyed && e.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(e) {
          this.destroyCbs.push(e);
        }
      }
      class Xd extends Pv {
        constructor(e) {
          super(),
            (this.moduleType = e),
            null !== Wt(e) &&
              (function wk(n) {
                const e = new Set();
                !(function t(i) {
                  const r = Wt(i, !0),
                    s = r.id;
                  null !== s &&
                    ((function Nv(n, e, t) {
                      if (e && e !== t)
                        throw new Error(
                          `Duplicate module registered for ${n} - ${ce(
                            e
                          )} vs ${ce(e.name)}`
                        );
                    })(s, ts.get(s), i),
                    ts.set(s, i));
                  const o = In(r.imports);
                  for (const a of o) e.has(a) || (e.add(a), t(a));
                })(n);
              })(e);
        }
        create(e) {
          return new Vv(this.moduleType, e);
        }
      }
      function Jd(n) {
        return (e) => {
          setTimeout(n, void 0, e);
        };
      }
      const ee = class jk extends X {
        constructor(e = !1) {
          super(), (this.__isAsync = e);
        }
        emit(e) {
          super.next(e);
        }
        subscribe(e, t, i) {
          var r, s, o;
          let a = e,
            l = t || (() => null),
            c = i;
          if (e && "object" == typeof e) {
            const d = e;
            (a = null === (r = d.next) || void 0 === r ? void 0 : r.bind(d)),
              (l = null === (s = d.error) || void 0 === s ? void 0 : s.bind(d)),
              (c =
                null === (o = d.complete) || void 0 === o ? void 0 : o.bind(d));
          }
          this.__isAsync && ((l = Jd(l)), a && (a = Jd(a)), c && (c = Jd(c)));
          const u = super.subscribe({ next: a, error: l, complete: c });
          return e instanceof Ve && e.add(u), u;
        }
      };
      function Hk() {
        return this._results[jr()]();
      }
      class ns {
        constructor(e = !1) {
          (this._emitDistinctChangesOnly = e),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const t = jr(),
            i = ns.prototype;
          i[t] || (i[t] = Hk);
        }
        get changes() {
          return this._changes || (this._changes = new ee());
        }
        get(e) {
          return this._results[e];
        }
        map(e) {
          return this._results.map(e);
        }
        filter(e) {
          return this._results.filter(e);
        }
        find(e) {
          return this._results.find(e);
        }
        reduce(e, t) {
          return this._results.reduce(e, t);
        }
        forEach(e) {
          this._results.forEach(e);
        }
        some(e) {
          return this._results.some(e);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(e, t) {
          const i = this;
          i.dirty = !1;
          const r = Yt(e);
          (this._changesDetected = !(function US(n, e, t) {
            if (n.length !== e.length) return !1;
            for (let i = 0; i < n.length; i++) {
              let r = n[i],
                s = e[i];
              if ((t && ((r = t(r)), (s = t(s))), s !== r)) return !1;
            }
            return !0;
          })(i._results, r, t)) &&
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
      let Jt = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = zk), n;
      })();
      const Uk = Jt,
        $k = class extends Uk {
          constructor(e, t, i) {
            super(),
              (this._declarationLView = e),
              (this._declarationTContainer = t),
              (this.elementRef = i);
          }
          createEmbeddedView(e) {
            const t = this._declarationTContainer.tViews,
              i = no(
                this._declarationLView,
                t,
                e,
                16,
                null,
                t.declTNode,
                null,
                null,
                null,
                null
              );
            i[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (i[19] = s.createEmbeddedView(t)),
              io(t, i, e),
              new mo(i)
            );
          }
        };
      function zk() {
        return ll(Ge(), D());
      }
      function ll(n, e) {
        return 4 & n.type ? new $k(e, n, es(n, e)) : null;
      }
      let Lt = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = Gk), n;
      })();
      function Gk() {
        return Wv(Ge(), D());
      }
      const Wk = Lt,
        zv = class extends Wk {
          constructor(e, t, i) {
            super(),
              (this._lContainer = e),
              (this._hostTNode = t),
              (this._hostLView = i);
          }
          get element() {
            return es(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Mr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const e = Ta(this._hostTNode, this._hostLView);
            if (Hm(e)) {
              const t = Er(e, this._hostLView),
                i = Dr(e);
              return new Mr(t[1].data[i + 8], t);
            }
            return new Mr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(e) {
            const t = Gv(this._lContainer);
            return (null !== t && t[e]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(e, t, i) {
            const r = e.createEmbeddedView(t || {});
            return this.insert(r, i), r;
          }
          createComponent(e, t, i, r, s) {
            const o =
              e &&
              !(function $s(n) {
                return "function" == typeof n;
              })(e);
            let a;
            if (o) a = t;
            else {
              const d = t || {};
              (a = d.index),
                (i = d.injector),
                (r = d.projectableNodes),
                (s = d.ngModuleRef);
            }
            const l = o ? e : new Zd(it(e)),
              c = i || this.parentInjector;
            if (!s && null == l.ngModule && c) {
              const d = c.get(Jn, null);
              d && (s = d);
            }
            const u = l.create(c, r, void 0, s);
            return this.insert(u.hostView, a), u;
          }
          insert(e, t) {
            const i = e._lView,
              r = i[1];
            if (
              (function cS(n) {
                return un(n[3]);
              })(i)
            ) {
              const u = this.indexOf(e);
              if (-1 !== u) this.detach(u);
              else {
                const d = i[3],
                  h = new zv(d, d[6], d[3]);
                h.detach(h.indexOf(e));
              }
            }
            const s = this._adjustIndex(t),
              o = this._lContainer;
            !(function mA(n, e, t, i) {
              const r = 10 + i,
                s = t.length;
              i > 0 && (t[r - 1][4] = e),
                i < s - 10
                  ? ((e[4] = t[r]), Zm(t, 10 + i, e))
                  : (t.push(e), (e[4] = null)),
                (e[3] = t);
              const o = e[17];
              null !== o &&
                t !== o &&
                (function gA(n, e) {
                  const t = n[9];
                  e[16] !== e[3][3][16] && (n[2] = !0),
                    null === t ? (n[9] = [e]) : t.push(e);
                })(o, e);
              const a = e[19];
              null !== a && a.insertView(n), (e[2] |= 128);
            })(r, i, o, s);
            const a = Xu(s, o),
              l = i[G],
              c = Ba(l, o[7]);
            return (
              null !== c &&
                (function hA(n, e, t, i, r, s) {
                  (i[0] = r), (i[6] = e), to(n, i, t, 1, r, s);
                })(r, o[6], l, i, c, a),
              e.attachToViewContainerRef(),
              Zm(eh(o), s, e),
              e
            );
          }
          move(e, t) {
            return this.insert(e, t);
          }
          indexOf(e) {
            const t = Gv(this._lContainer);
            return null !== t ? t.indexOf(e) : -1;
          }
          remove(e) {
            const t = this._adjustIndex(e, -1),
              i = Qu(this._lContainer, t);
            i && (ka(eh(this._lContainer), t), Ng(i[1], i));
          }
          detach(e) {
            const t = this._adjustIndex(e, -1),
              i = Qu(this._lContainer, t);
            return i && null != ka(eh(this._lContainer), t) ? new mo(i) : null;
          }
          _adjustIndex(e, t = 0) {
            return null == e ? this.length + t : e;
          }
        };
      function Gv(n) {
        return n[8];
      }
      function eh(n) {
        return n[8] || (n[8] = []);
      }
      function Wv(n, e) {
        let t;
        const i = e[n.index];
        if (un(i)) t = i;
        else {
          let r;
          if (8 & n.type) r = Be(i);
          else {
            const s = e[G];
            r = s.createComment("");
            const o = Qt(n, e);
            Gi(
              s,
              Ba(s, o),
              r,
              (function bA(n, e) {
                return Ie(n) ? n.nextSibling(e) : e.nextSibling;
              })(s, o),
              !1
            );
          }
          (e[n.index] = t = M_(i, e, r, n)), Wa(e, t);
        }
        return new zv(t, n, e);
      }
      class th {
        constructor(e) {
          (this.queryList = e), (this.matches = null);
        }
        clone() {
          return new th(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class nh {
        constructor(e = []) {
          this.queries = e;
        }
        createEmbeddedView(e) {
          const t = e.queries;
          if (null !== t) {
            const i =
                null !== e.contentQueries ? e.contentQueries[0] : t.length,
              r = [];
            for (let s = 0; s < i; s++) {
              const o = t.getByIndex(s);
              r.push(this.queries[o.indexInDeclarationView].clone());
            }
            return new nh(r);
          }
          return null;
        }
        insertView(e) {
          this.dirtyQueriesWithMatches(e);
        }
        detachView(e) {
          this.dirtyQueriesWithMatches(e);
        }
        dirtyQueriesWithMatches(e) {
          for (let t = 0; t < this.queries.length; t++)
            null !== Zv(e, t).matches && this.queries[t].setDirty();
        }
      }
      class qv {
        constructor(e, t, i = null) {
          (this.predicate = e), (this.flags = t), (this.read = i);
        }
      }
      class ih {
        constructor(e = []) {
          this.queries = e;
        }
        elementStart(e, t) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].elementStart(e, t);
        }
        elementEnd(e) {
          for (let t = 0; t < this.queries.length; t++)
            this.queries[t].elementEnd(e);
        }
        embeddedTView(e) {
          let t = null;
          for (let i = 0; i < this.length; i++) {
            const r = null !== t ? t.length : 0,
              s = this.getByIndex(i).embeddedTView(e, r);
            s &&
              ((s.indexInDeclarationView = i),
              null !== t ? t.push(s) : (t = [s]));
          }
          return null !== t ? new ih(t) : null;
        }
        template(e, t) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].template(e, t);
        }
        getByIndex(e) {
          return this.queries[e];
        }
        get length() {
          return this.queries.length;
        }
        track(e) {
          this.queries.push(e);
        }
      }
      class rh {
        constructor(e, t = -1) {
          (this.metadata = e),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = t);
        }
        elementStart(e, t) {
          this.isApplyingToNode(t) && this.matchTNode(e, t);
        }
        elementEnd(e) {
          this._declarationNodeIndex === e.index &&
            (this._appliesToNextNode = !1);
        }
        template(e, t) {
          this.elementStart(e, t);
        }
        embeddedTView(e, t) {
          return this.isApplyingToNode(e)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-e.index, t),
              new rh(this.metadata))
            : null;
        }
        isApplyingToNode(e) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const t = this._declarationNodeIndex;
            let i = e.parent;
            for (; null !== i && 8 & i.type && i.index !== t; ) i = i.parent;
            return t === (null !== i ? i.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(e, t) {
          const i = this.metadata.predicate;
          if (Array.isArray(i))
            for (let r = 0; r < i.length; r++) {
              const s = i[r];
              this.matchTNodeWithReadOption(e, t, Qk(t, s)),
                this.matchTNodeWithReadOption(e, t, Ra(t, e, s, !1, !1));
            }
          else
            i === Jt
              ? 4 & t.type && this.matchTNodeWithReadOption(e, t, -1)
              : this.matchTNodeWithReadOption(e, t, Ra(t, e, i, !1, !1));
        }
        matchTNodeWithReadOption(e, t, i) {
          if (null !== i) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === ve || r === Lt || (r === Jt && 4 & t.type))
                this.addMatch(t.index, -2);
              else {
                const s = Ra(t, e, r, !1, !1);
                null !== s && this.addMatch(t.index, s);
              }
            else this.addMatch(t.index, i);
          }
        }
        addMatch(e, t) {
          null === this.matches
            ? (this.matches = [e, t])
            : this.matches.push(e, t);
        }
      }
      function Qk(n, e) {
        const t = n.localNames;
        if (null !== t)
          for (let i = 0; i < t.length; i += 2) if (t[i] === e) return t[i + 1];
        return null;
      }
      function Zk(n, e, t, i) {
        return -1 === t
          ? (function Yk(n, e) {
              return 11 & n.type ? es(n, e) : 4 & n.type ? ll(n, e) : null;
            })(e, n)
          : -2 === t
          ? (function Xk(n, e, t) {
              return t === ve
                ? es(e, n)
                : t === Jt
                ? ll(e, n)
                : t === Lt
                ? Wv(e, n)
                : void 0;
            })(n, e, i)
          : Hs(n, n[1], t, e);
      }
      function Kv(n, e, t, i) {
        const r = e[19].queries[i];
        if (null === r.matches) {
          const s = n.data,
            o = t.matches,
            a = [];
          for (let l = 0; l < o.length; l += 2) {
            const c = o[l];
            a.push(c < 0 ? null : Zk(e, s[c], o[l + 1], t.metadata.read));
          }
          r.matches = a;
        }
        return r.matches;
      }
      function sh(n, e, t, i) {
        const r = n.queries.getByIndex(t),
          s = r.matches;
        if (null !== s) {
          const o = Kv(n, e, r, t);
          for (let a = 0; a < s.length; a += 2) {
            const l = s[a];
            if (l > 0) i.push(o[a / 2]);
            else {
              const c = s[a + 1],
                u = e[-l];
              for (let d = 10; d < u.length; d++) {
                const h = u[d];
                h[17] === h[3] && sh(h[1], h, c, i);
              }
              if (null !== u[9]) {
                const d = u[9];
                for (let h = 0; h < d.length; h++) {
                  const f = d[h];
                  sh(f[1], f, c, i);
                }
              }
            }
          }
        }
        return i;
      }
      function _t(n) {
        const e = D(),
          t = ie(),
          i = km();
        gu(i + 1);
        const r = Zv(t, i);
        if (n.dirty && Sm(e) === (2 == (2 & r.metadata.flags))) {
          if (null === r.matches) n.reset([]);
          else {
            const s = r.crossesNgTemplate ? sh(t, e, i, []) : Kv(t, e, r, i);
            n.reset(s, uk), n.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function is(n, e, t) {
        const i = ie();
        i.firstCreatePass &&
          (Yv(i, new qv(n, e, t), -1),
          2 == (2 & e) && (i.staticViewQueries = !0)),
          Qv(i, D(), e);
      }
      function Nn(n, e, t, i) {
        const r = ie();
        if (r.firstCreatePass) {
          const s = Ge();
          Yv(r, new qv(e, t, i), s.index),
            (function eO(n, e) {
              const t = n.contentQueries || (n.contentQueries = []);
              e !== (t.length ? t[t.length - 1] : -1) &&
                t.push(n.queries.length - 1, e);
            })(r, n),
            2 == (2 & t) && (r.staticContentQueries = !0);
        }
        Qv(r, D(), t);
      }
      function yt() {
        return (function Jk(n, e) {
          return n[19].queries[e].queryList;
        })(D(), km());
      }
      function Qv(n, e, t) {
        const i = new ns(4 == (4 & t));
        __(n, e, i, i.destroy),
          null === e[19] && (e[19] = new nh()),
          e[19].queries.push(new th(i));
      }
      function Yv(n, e, t) {
        null === n.queries && (n.queries = new ih()),
          n.queries.track(new rh(e, t));
      }
      function Zv(n, e) {
        return n.queries.getByIndex(e);
      }
      function dl(...n) {}
      const hl = new A("Application Initializer");
      let ss = (() => {
        class n {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = dl),
              (this.reject = dl),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((i, r) => {
                (this.resolve = i), (this.reject = r);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              i = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let r = 0; r < this.appInits.length; r++) {
                const s = this.appInits[r]();
                if (ao(s)) t.push(s);
                else if (Ld(s)) {
                  const o = new Promise((a, l) => {
                    s.subscribe({ complete: a, error: l });
                  });
                  t.push(o);
                }
              }
            Promise.all(t)
              .then(() => {
                i();
              })
              .catch((r) => {
                this.reject(r);
              }),
              0 === t.length && i(),
              (this.initialized = !0);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(hl, 8));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const vo = new A("AppId"),
        vO = {
          provide: vo,
          useFactory: function yO() {
            return `${dh()}${dh()}${dh()}`;
          },
          deps: [],
        };
      function dh() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const pb = new A("Platform Initializer"),
        fl = new A("Platform ID"),
        mb = new A("appBootstrapListener");
      let gb = (() => {
        class n {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const ei = new A("LocaleId"),
        _b = new A("DefaultCurrencyCode");
      class bO {
        constructor(e, t) {
          (this.ngModuleFactory = e), (this.componentFactories = t);
        }
      }
      let pl = (() => {
        class n {
          compileModuleSync(t) {
            return new Xd(t);
          }
          compileModuleAsync(t) {
            return Promise.resolve(this.compileModuleSync(t));
          }
          compileModuleAndAllComponentsSync(t) {
            const i = this.compileModuleSync(t),
              s = In(Wt(t).declarations).reduce((o, a) => {
                const l = it(a);
                return l && o.push(new Zd(l)), o;
              }, []);
            return new bO(i, s);
          }
          compileModuleAndAllComponentsAsync(t) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(t));
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const wO = (() => Promise.resolve(0))();
      function hh(n) {
        "undefined" == typeof Zone
          ? wO.then(() => {
              n && n.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", n);
      }
      class re {
        constructor({
          enableLongStackTrace: e = !1,
          shouldCoalesceEventChangeDetection: t = !1,
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
            e &&
              Zone.longStackTraceZoneSpec &&
              (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !i && t),
            (r.shouldCoalesceRunChangeDetection = i),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function DO() {
              let n = pe.requestAnimationFrame,
                e = pe.cancelAnimationFrame;
              if ("undefined" != typeof Zone && n && e) {
                const t = n[Zone.__symbol__("OriginalDelegate")];
                t && (n = t);
                const i = e[Zone.__symbol__("OriginalDelegate")];
                i && (e = i);
              }
              return {
                nativeRequestAnimationFrame: n,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function SO(n) {
              const e = () => {
                !(function MO(n) {
                  n.isCheckStableRunning ||
                    -1 !== n.lastRequestAnimationFrameId ||
                    ((n.lastRequestAnimationFrameId =
                      n.nativeRequestAnimationFrame.call(pe, () => {
                        n.fakeTopEventTask ||
                          (n.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (n.lastRequestAnimationFrameId = -1),
                                ph(n),
                                (n.isCheckStableRunning = !0),
                                fh(n),
                                (n.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          n.fakeTopEventTask.invoke();
                      })),
                    ph(n));
                })(n);
              };
              n._inner = n._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (t, i, r, s, o, a) => {
                  try {
                    return yb(n), t.invokeTask(r, s, o, a);
                  } finally {
                    ((n.shouldCoalesceEventChangeDetection &&
                      "eventTask" === s.type) ||
                      n.shouldCoalesceRunChangeDetection) &&
                      e(),
                      vb(n);
                  }
                },
                onInvoke: (t, i, r, s, o, a, l) => {
                  try {
                    return yb(n), t.invoke(r, s, o, a, l);
                  } finally {
                    n.shouldCoalesceRunChangeDetection && e(), vb(n);
                  }
                },
                onHasTask: (t, i, r, s) => {
                  t.hasTask(r, s),
                    i === r &&
                      ("microTask" == s.change
                        ? ((n._hasPendingMicrotasks = s.microTask),
                          ph(n),
                          fh(n))
                        : "macroTask" == s.change &&
                          (n.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (t, i, r, s) => (
                  t.handleError(r, s),
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
        run(e, t, i) {
          return this._inner.run(e, t, i);
        }
        runTask(e, t, i, r) {
          const s = this._inner,
            o = s.scheduleEventTask("NgZoneEvent: " + r, e, EO, dl, dl);
          try {
            return s.runTask(o, t, i);
          } finally {
            s.cancelTask(o);
          }
        }
        runGuarded(e, t, i) {
          return this._inner.runGuarded(e, t, i);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      const EO = {};
      function fh(n) {
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
      function ph(n) {
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
        n._nesting--, fh(n);
      }
      class xO {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ee()),
            (this.onMicrotaskEmpty = new ee()),
            (this.onStable = new ee()),
            (this.onError = new ee());
        }
        run(e, t, i) {
          return e.apply(t, i);
        }
        runGuarded(e, t, i) {
          return e.apply(t, i);
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e, t, i, r) {
          return e.apply(t, i);
        }
      }
      let mh = (() => {
          class n {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
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
                        hh(() => {
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
                hh(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (i) =>
                    !i.updateCb ||
                    !i.updateCb(t) ||
                    (clearTimeout(i.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, i, r) {
              let s = -1;
              i &&
                i > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (o) => o.timeoutId !== s
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, i)),
                this._callbacks.push({ doneCb: t, timeoutId: s, updateCb: r });
            }
            whenStable(t, i, r) {
              if (r && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(t, i, r), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, i, r) {
              return [];
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(re));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        bb = (() => {
          class n {
            constructor() {
              (this._applications = new Map()), gh.addToWindow(this);
            }
            registerApplication(t, i) {
              this._applications.set(t, i);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, i = !0) {
              return gh.findTestabilityInTree(this, t, i);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      class AO {
        addToWindow(e) {}
        findTestabilityInTree(e, t, i) {
          return null;
        }
      }
      let _n,
        gh = new AO();
      const Cb = new A("AllowMultipleToken");
      class wb {
        constructor(e, t) {
          (this.name = e), (this.token = t);
        }
      }
      function Db(n, e, t = []) {
        const i = `Platform: ${e}`,
          r = new A(i);
        return (s = []) => {
          let o = Eb();
          if (!o || o.injector.get(Cb, !1))
            if (n) n(t.concat(s).concat({ provide: r, useValue: !0 }));
            else {
              const a = t
                .concat(s)
                .concat(
                  { provide: r, useValue: !0 },
                  { provide: Dd, useValue: "platform" }
                );
              !(function kO(n) {
                if (_n && !_n.destroyed && !_n.injector.get(Cb, !1))
                  throw new ne(400, "");
                _n = n.get(Mb);
                const e = n.get(pb, null);
                e && e.forEach((t) => t());
              })(we.create({ providers: a, name: i }));
            }
          return (function OO(n) {
            const e = Eb();
            if (!e) throw new ne(401, "");
            return e;
          })();
        };
      }
      function Eb() {
        return _n && !_n.destroyed ? _n : null;
      }
      let Mb = (() => {
        class n {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, i) {
            const a = (function FO(n, e) {
                let t;
                return (
                  (t =
                    "noop" === n
                      ? new xO()
                      : ("zone.js" === n ? void 0 : n) ||
                        new re({
                          enableLongStackTrace: !1,
                          shouldCoalesceEventChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneRunCoalescing),
                        })),
                  t
                );
              })(i ? i.ngZone : void 0, {
                ngZoneEventCoalescing: (i && i.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (i && i.ngZoneRunCoalescing) || !1,
              }),
              l = [{ provide: re, useValue: a }];
            return a.run(() => {
              const c = we.create({
                  providers: l,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                u = t.create(c),
                d = u.injector.get(Kn, null);
              if (!d) throw new ne(402, "");
              return (
                a.runOutsideAngular(() => {
                  const h = a.onError.subscribe({
                    next: (f) => {
                      d.handleError(f);
                    },
                  });
                  u.onDestroy(() => {
                    _h(this._modules, u), h.unsubscribe();
                  });
                }),
                (function PO(n, e, t) {
                  try {
                    const i = t();
                    return ao(i)
                      ? i.catch((r) => {
                          throw (
                            (e.runOutsideAngular(() => n.handleError(r)), r)
                          );
                        })
                      : i;
                  } catch (i) {
                    throw (e.runOutsideAngular(() => n.handleError(i)), i);
                  }
                })(d, a, () => {
                  const h = u.injector.get(ss);
                  return (
                    h.runInitializers(),
                    h.donePromise.then(
                      () => (
                        (function dR(n) {
                          Tt(n, "Expected localeId to be defined"),
                            "string" == typeof n &&
                              (ov = n.toLowerCase().replace(/_/g, "-"));
                        })(u.injector.get(ei, nl) || nl),
                        this._moduleDoBootstrap(u),
                        u
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, i = []) {
            const r = Sb({}, i);
            return (function IO(n, e, t) {
              const i = new Xd(t);
              return Promise.resolve(i);
            })(0, 0, t).then((s) => this.bootstrapModuleFactory(s, r));
          }
          _moduleDoBootstrap(t) {
            const i = t.injector.get(os);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((r) => i.bootstrap(r));
            else {
              if (!t.instance.ngDoBootstrap) throw new ne(403, "");
              t.instance.ngDoBootstrap(i);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new ne(404, "");
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(we));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function Sb(n, e) {
        return Array.isArray(e)
          ? e.reduce(Sb, n)
          : Object.assign(Object.assign({}, n), e);
      }
      let os = (() => {
        class n {
          constructor(t, i, r, s, o) {
            (this._zone = t),
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
                      hh(() => {
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
            this.isStable = la(a, l.pipe(lm()));
          }
          bootstrap(t, i) {
            if (!this._initStatus.done) throw new ne(405, "");
            let r;
            (r =
              t instanceof Rv
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(r.componentType);
            const s = (function RO(n) {
                return n.isBoundToModule;
              })(r)
                ? void 0
                : this._injector.get(Jn),
              a = r.create(we.NULL, [], i || r.selector, s),
              l = a.location.nativeElement,
              c = a.injector.get(mh, null),
              u = c && a.injector.get(bb);
            return (
              c && u && u.registerApplication(l, c),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  _h(this.components, a),
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
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const i = t;
            this._views.push(i), i.attachToAppRef(this);
          }
          detachView(t) {
            const i = t;
            _h(this._views, i), i.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(mb, [])
                .concat(this._bootstrapListeners)
                .forEach((r) => r(t));
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(re), C(we), C(Kn), C(vi), C(ss));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function _h(n, e) {
        const t = n.indexOf(e);
        t > -1 && n.splice(t, 1);
      }
      let Ab = !0,
        yn = (() => {
          class n {}
          return (n.__NG_ELEMENT_ID__ = VO), n;
        })();
      function VO(n) {
        return (function BO(n, e, t) {
          if (ma(n) && !t) {
            const i = Rt(n.index, e);
            return new mo(i, i);
          }
          return 47 & n.type ? new mo(e[16], e) : null;
        })(Ge(), D(), 16 == (16 & n));
      }
      class Pb {
        constructor() {}
        supports(e) {
          return so(e);
        }
        create(e) {
          return new GO(e);
        }
      }
      const zO = (n, e) => e;
      class GO {
        constructor(e) {
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
            (this._trackByFn = e || zO);
        }
        forEachItem(e) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) e(t);
        }
        forEachOperation(e) {
          let t = this._itHead,
            i = this._removalsHead,
            r = 0,
            s = null;
          for (; t || i; ) {
            const o = !i || (t && t.currentIndex < Lb(i, r, s)) ? t : i,
              a = Lb(o, r, s),
              l = o.currentIndex;
            if (o === i) r--, (i = i._nextRemoved);
            else if (((t = t._next), null == o.previousIndex)) r++;
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
            a !== l && e(o, a, l);
          }
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachMovedItem(e) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        forEachIdentityChange(e) {
          let t;
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            e(t);
        }
        diff(e) {
          if ((null == e && (e = []), !so(e))) throw new ne(900, "");
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let r,
            s,
            o,
            t = this._itHead,
            i = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let a = 0; a < this.length; a++)
              (s = e[a]),
                (o = this._trackByFn(a, s)),
                null !== t && Object.is(t.trackById, o)
                  ? (i && (t = this._verifyReinsertion(t, s, o, a)),
                    Object.is(t.item, s) || this._addIdentityChange(t, s))
                  : ((t = this._mismatch(t, s, o, a)), (i = !0)),
                (t = t._next);
          } else
            (r = 0),
              (function QT(n, e) {
                if (Array.isArray(n))
                  for (let t = 0; t < n.length; t++) e(n[t]);
                else {
                  const t = n[jr()]();
                  let i;
                  for (; !(i = t.next()).done; ) e(i.value);
                }
              })(e, (a) => {
                (o = this._trackByFn(r, a)),
                  null !== t && Object.is(t.trackById, o)
                    ? (i && (t = this._verifyReinsertion(t, a, o, r)),
                      Object.is(t.item, a) || this._addIdentityChange(t, a))
                    : ((t = this._mismatch(t, a, o, r)), (i = !0)),
                  (t = t._next),
                  r++;
              }),
              (this.length = r);
          return this._truncate(t), (this.collection = e), this.isDirty;
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
            let e;
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = e._nextMoved
            )
              e.previousIndex = e.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(e, t, i, r) {
          let s;
          return (
            null === e ? (s = this._itTail) : ((s = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(i, null))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._reinsertAfter(e, s, r))
              : null !==
                (e =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(i, r))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._moveAfter(e, s, r))
              : (e = this._addAfter(new WO(t, i), s, r)),
            e
          );
        }
        _verifyReinsertion(e, t, i, r) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(i, null);
          return (
            null !== s
              ? (e = this._reinsertAfter(s, e._prev, r))
              : e.currentIndex != r &&
                ((e.currentIndex = r), this._addToMoves(e, r)),
            e
          );
        }
        _truncate(e) {
          for (; null !== e; ) {
            const t = e._next;
            this._addToRemovals(this._unlink(e)), (e = t);
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
        _reinsertAfter(e, t, i) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const r = e._prevRemoved,
            s = e._nextRemoved;
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(e, t, i),
            this._addToMoves(e, i),
            e
          );
        }
        _moveAfter(e, t, i) {
          return (
            this._unlink(e),
            this._insertAfter(e, t, i),
            this._addToMoves(e, i),
            e
          );
        }
        _addAfter(e, t, i) {
          return (
            this._insertAfter(e, t, i),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          );
        }
        _insertAfter(e, t, i) {
          const r = null === t ? this._itHead : t._next;
          return (
            (e._next = r),
            (e._prev = t),
            null === r ? (this._itTail = e) : (r._prev = e),
            null === t ? (this._itHead = e) : (t._next = e),
            null === this._linkedRecords && (this._linkedRecords = new Nb()),
            this._linkedRecords.put(e),
            (e.currentIndex = i),
            e
          );
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const t = e._prev,
            i = e._next;
          return (
            null === t ? (this._itHead = i) : (t._next = i),
            null === i ? (this._itTail = t) : (i._prev = t),
            e
          );
        }
        _addToMoves(e, t) {
          return (
            e.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
            e
          );
        }
        _addToRemovals(e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Nb()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          );
        }
        _addIdentityChange(e, t) {
          return (
            (e.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          );
        }
      }
      class WO {
        constructor(e, t) {
          (this.item = e),
            (this.trackById = t),
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
      class qO {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e));
        }
        get(e, t) {
          let i;
          for (i = this._head; null !== i; i = i._nextDup)
            if (
              (null === t || t <= i.currentIndex) &&
              Object.is(i.trackById, e)
            )
              return i;
          return null;
        }
        remove(e) {
          const t = e._prevDup,
            i = e._nextDup;
          return (
            null === t ? (this._head = i) : (t._nextDup = i),
            null === i ? (this._tail = t) : (i._prevDup = t),
            null === this._head
          );
        }
      }
      class Nb {
        constructor() {
          this.map = new Map();
        }
        put(e) {
          const t = e.trackById;
          let i = this.map.get(t);
          i || ((i = new qO()), this.map.set(t, i)), i.add(e);
        }
        get(e, t) {
          const r = this.map.get(e);
          return r ? r.get(e, t) : null;
        }
        remove(e) {
          const t = e.trackById;
          return this.map.get(t).remove(e) && this.map.delete(t), e;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Lb(n, e, t) {
        const i = n.previousIndex;
        if (null === i) return i;
        let r = 0;
        return t && i < t.length && (r = t[i]), i + e + r;
      }
      class Vb {
        constructor() {}
        supports(e) {
          return e instanceof Map || Td(e);
        }
        create() {
          return new KO();
        }
      }
      class KO {
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
        forEachItem(e) {
          let t;
          for (t = this._mapHead; null !== t; t = t._next) e(t);
        }
        forEachPreviousItem(e) {
          let t;
          for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t);
        }
        forEachChangedItem(e) {
          let t;
          for (t = this._changesHead; null !== t; t = t._nextChanged) e(t);
        }
        forEachAddedItem(e) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t);
        }
        forEachRemovedItem(e) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t);
        }
        diff(e) {
          if (e) {
            if (!(e instanceof Map || Td(e))) throw new ne(900, "");
          } else e = new Map();
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let t = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(e, (i, r) => {
              if (t && t.key === r)
                this._maybeAddToChanges(t, i),
                  (this._appendAfter = t),
                  (t = t._next);
              else {
                const s = this._getOrCreateRecordForKey(r, i);
                t = this._insertBeforeOrAppend(t, s);
              }
            }),
            t)
          ) {
            t._prev && (t._prev._next = null), (this._removalsHead = t);
            for (let i = t; null !== i; i = i._nextRemoved)
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
        _insertBeforeOrAppend(e, t) {
          if (e) {
            const i = e._prev;
            return (
              (t._next = e),
              (t._prev = i),
              (e._prev = t),
              i && (i._next = t),
              e === this._mapHead && (this._mapHead = t),
              (this._appendAfter = e),
              e
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = t), (t._prev = this._appendAfter))
              : (this._mapHead = t),
            (this._appendAfter = t),
            null
          );
        }
        _getOrCreateRecordForKey(e, t) {
          if (this._records.has(e)) {
            const r = this._records.get(e);
            this._maybeAddToChanges(r, t);
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
          const i = new QO(e);
          return (
            this._records.set(e, i),
            (i.currentValue = t),
            this._addToAdditions(i),
            i
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              this._previousMapHead = this._mapHead, e = this._previousMapHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._changesHead; null !== e; e = e._nextChanged)
              e.previousValue = e.currentValue;
            for (e = this._additionsHead; null != e; e = e._nextAdded)
              e.previousValue = e.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(e, t) {
          Object.is(t, e.currentValue) ||
            ((e.previousValue = e.currentValue),
            (e.currentValue = t),
            this._addToChanges(e));
        }
        _addToAdditions(e) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = e)
            : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
        }
        _addToChanges(e) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = e)
            : ((this._changesTail._nextChanged = e), (this._changesTail = e));
        }
        _forEach(e, t) {
          e instanceof Map
            ? e.forEach(t)
            : Object.keys(e).forEach((i) => t(e[i], i));
        }
      }
      class QO {
        constructor(e) {
          (this.key = e),
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
          constructor(t) {
            this.factories = t;
          }
          static create(t, i) {
            if (null != i) {
              const r = i.factories.slice();
              t = t.concat(r);
            }
            return new n(t);
          }
          static extend(t) {
            return {
              provide: n,
              useFactory: (i) => n.create(t, i || Bb()),
              deps: [[n, new $i(), new Ot()]],
            };
          }
          find(t) {
            const i = this.factories.find((r) => r.supports(t));
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
          constructor(t) {
            this.factories = t;
          }
          static create(t, i) {
            if (i) {
              const r = i.factories.slice();
              t = t.concat(r);
            }
            return new n(t);
          }
          static extend(t) {
            return {
              provide: n,
              useFactory: (i) => n.create(t, i || jb()),
              deps: [[n, new $i(), new Ot()]],
            };
          }
          find(t) {
            const i = this.factories.find((s) => s.supports(t));
            if (i) return i;
            throw new ne(901, "");
          }
        }
        return (n.ɵprov = R({ token: n, providedIn: "root", factory: jb })), n;
      })();
      const YO = [new Vb()],
        XO = new bo([new Pb()]),
        JO = new as(YO),
        eF = Db(null, "core", [
          { provide: fl, useValue: "unknown" },
          { provide: Mb, deps: [we] },
          { provide: bb, deps: [] },
          { provide: gb, deps: [] },
        ]),
        sF = [
          { provide: os, useClass: os, deps: [re, we, Kn, vi, ss] },
          {
            provide: _k,
            deps: [re],
            useFactory: function oF(n) {
              let e = [];
              return (
                n.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: ss, useClass: ss, deps: [[new Ot(), hl]] },
          { provide: pl, useClass: pl, deps: [] },
          vO,
          {
            provide: bo,
            useFactory: function tF() {
              return XO;
            },
            deps: [],
          },
          {
            provide: as,
            useFactory: function nF() {
              return JO;
            },
            deps: [],
          },
          {
            provide: ei,
            useFactory: function iF(n) {
              return (
                n ||
                (function rF() {
                  return (
                    ("undefined" != typeof $localize && $localize.locale) || nl
                  );
                })()
              );
            },
            deps: [[new Ks(ei), new Ot(), new $i()]],
          },
          { provide: _b, useValue: "USD" },
        ];
      let aF = (() => {
          class n {
            constructor(t) {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(os));
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({ providers: sF })),
            n
          );
        })(),
        gl = null;
      function Ln() {
        return gl;
      }
      const Y = new A("DocumentToken");
      let Yi = (() => {
        class n {
          historyGo(t) {
            throw new Error("Not implemented");
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = R({
            token: n,
            factory: function () {
              return (function dF() {
                return C(Hb);
              })();
            },
            providedIn: "platform",
          })),
          n
        );
      })();
      const hF = new A("Location Initialized");
      let Hb = (() => {
        class n extends Yi {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Ln().getBaseHref(this._doc);
          }
          onPopState(t) {
            const i = Ln().getGlobalEventTarget(this._doc, "window");
            return (
              i.addEventListener("popstate", t, !1),
              () => i.removeEventListener("popstate", t)
            );
          }
          onHashChange(t) {
            const i = Ln().getGlobalEventTarget(this._doc, "window");
            return (
              i.addEventListener("hashchange", t, !1),
              () => i.removeEventListener("hashchange", t)
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
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, i, r) {
            Ub() ? this._history.pushState(t, i, r) : (this.location.hash = r);
          }
          replaceState(t, i, r) {
            Ub()
              ? this._history.replaceState(t, i, r)
              : (this.location.hash = r);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(t = 0) {
            this._history.go(t);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Y));
          }),
          (n.ɵprov = R({
            token: n,
            factory: function () {
              return (function fF() {
                return new Hb(C(Y));
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
      function wh(n, e) {
        if (0 == n.length) return e;
        if (0 == e.length) return n;
        let t = 0;
        return (
          n.endsWith("/") && t++,
          e.startsWith("/") && t++,
          2 == t ? n + e.substring(1) : 1 == t ? n + e : n + "/" + e
        );
      }
      function $b(n) {
        const e = n.match(/#|\?|$/),
          t = (e && e.index) || n.length;
        return n.slice(0, t - ("/" === n[t - 1] ? 1 : 0)) + n.slice(t);
      }
      function ti(n) {
        return n && "?" !== n[0] ? "?" + n : n;
      }
      let ls = (() => {
        class n {
          historyGo(t) {
            throw new Error("Not implemented");
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = R({
            token: n,
            factory: function () {
              return (function pF(n) {
                const e = C(Y).location;
                return new zb(C(Yi), (e && e.origin) || "");
              })();
            },
            providedIn: "root",
          })),
          n
        );
      })();
      const Dh = new A("appBaseHref");
      let zb = (() => {
          class n extends ls {
            constructor(t, i) {
              if (
                (super(),
                (this._platformLocation = t),
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
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return wh(this._baseHref, t);
            }
            path(t = !1) {
              const i =
                  this._platformLocation.pathname +
                  ti(this._platformLocation.search),
                r = this._platformLocation.hash;
              return r && t ? `${i}${r}` : i;
            }
            pushState(t, i, r, s) {
              const o = this.prepareExternalUrl(r + ti(s));
              this._platformLocation.pushState(t, i, o);
            }
            replaceState(t, i, r, s) {
              const o = this.prepareExternalUrl(r + ti(s));
              this._platformLocation.replaceState(t, i, o);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(t = 0) {
              var i, r;
              null === (r = (i = this._platformLocation).historyGo) ||
                void 0 === r ||
                r.call(i, t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(Yi), C(Dh, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        mF = (() => {
          class n extends ls {
            constructor(t, i) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != i && (this._baseHref = i);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let i = this._platformLocation.hash;
              return null == i && (i = "#"), i.length > 0 ? i.substring(1) : i;
            }
            prepareExternalUrl(t) {
              const i = wh(this._baseHref, t);
              return i.length > 0 ? "#" + i : i;
            }
            pushState(t, i, r, s) {
              let o = this.prepareExternalUrl(r + ti(s));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.pushState(t, i, o);
            }
            replaceState(t, i, r, s) {
              let o = this.prepareExternalUrl(r + ti(s));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, i, o);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(t = 0) {
              var i, r;
              null === (r = (i = this._platformLocation).historyGo) ||
                void 0 === r ||
                r.call(i, t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(Yi), C(Dh, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Co = (() => {
          class n {
            constructor(t, i) {
              (this._subject = new ee()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t);
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
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, i = "") {
              return this.path() == this.normalize(t + ti(i));
            }
            normalize(t) {
              return n.stripTrailingSlash(
                (function _F(n, e) {
                  return n && e.startsWith(n) ? e.substring(n.length) : e;
                })(this._baseHref, Gb(t))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }
            go(t, i = "", r = null) {
              this._platformStrategy.pushState(r, "", t, i),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + ti(i)),
                  r
                );
            }
            replaceState(t, i = "", r = null) {
              this._platformStrategy.replaceState(r, "", t, i),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + ti(i)),
                  r
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            historyGo(t = 0) {
              var i, r;
              null === (r = (i = this._platformStrategy).historyGo) ||
                void 0 === r ||
                r.call(i, t);
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((i) => {
                    this._notifyUrlChangeListeners(i.url, i.state);
                  }));
            }
            _notifyUrlChangeListeners(t = "", i) {
              this._urlChangeListeners.forEach((r) => r(t, i));
            }
            subscribe(t, i, r) {
              return this._subject.subscribe({
                next: t,
                error: i,
                complete: r,
              });
            }
          }
          return (
            (n.normalizeQueryParams = ti),
            (n.joinWithSlash = wh),
            (n.stripTrailingSlash = $b),
            (n.ɵfac = function (t) {
              return new (t || n)(C(ls), C(Yi));
            }),
            (n.ɵprov = R({
              token: n,
              factory: function () {
                return (function gF() {
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
      const EF = function rv(n) {
        return (function gt(n) {
          const e = (function aR(n) {
            return n.toLowerCase().replace(/_/g, "-");
          })(n);
          let t = sv(e);
          if (t) return t;
          const i = e.split("-")[0];
          if (((t = sv(i)), t)) return t;
          if ("en" === i) return oR;
          throw new Error(`Missing locale data for the locale "${n}".`);
        })(n)[x.PluralCase];
      };
      class Sl {}
      let JF = (() => {
        class n extends Sl {
          constructor(t) {
            super(), (this.locale = t);
          }
          getPluralCategory(t, i) {
            switch (EF(i || this.locale)(t)) {
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
          (n.ɵfac = function (t) {
            return new (t || n)(C(ei));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class iP {
        constructor(e, t, i, r) {
          (this.$implicit = e),
            (this.ngForOf = t),
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
          constructor(t, i, r) {
            (this._viewContainer = t),
              (this._template = i),
              (this._differs = r),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const t = this._ngForOf;
              !this._differ &&
                t &&
                (this._differ = this._differs
                  .find(t)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const i = this._viewContainer;
            t.forEachOperation((r, s, o) => {
              if (null == r.previousIndex)
                i.createEmbeddedView(
                  this._template,
                  new iP(r.item, this._ngForOf, -1, -1),
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
            t.forEachIdentityChange((r) => {
              tC(i.get(r.currentIndex), r);
            });
          }
          static ngTemplateContextGuard(t, i) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(y(Lt), y(Jt), y(bo));
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
      function tC(n, e) {
        n.context.$implicit = e.item;
      }
      let xl = (() => {
        class n {
          constructor(t, i) {
            (this._viewContainer = t),
              (this._context = new rP()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = i);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            nC("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            nC("ngIfElse", t),
              (this._elseTemplateRef = t),
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
          static ngTemplateContextGuard(t, i) {
            return !0;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(y(Lt), y(Jt));
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
      class rP {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function nC(n, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${n} must be a TemplateRef, but received '${ce(e)}'.`
          );
      }
      let Eo = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = ue({ type: n })),
          (n.ɵinj = le({ providers: [{ provide: Sl, useClass: JF }] })),
          n
        );
      })();
      const sC = "browser";
      let PP = (() => {
        class n {}
        return (
          (n.ɵprov = R({
            token: n,
            providedIn: "root",
            factory: () => new NP(C(Y), window),
          })),
          n
        );
      })();
      class NP {
        constructor(e, t) {
          (this.document = e), (this.window = t), (this.offset = () => [0, 0]);
        }
        setOffset(e) {
          this.offset = Array.isArray(e) ? () => e : e;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(e) {
          this.supportsScrolling() && this.window.scrollTo(e[0], e[1]);
        }
        scrollToAnchor(e) {
          if (!this.supportsScrolling()) return;
          const t = (function LP(n, e) {
            const t = n.getElementById(e) || n.getElementsByName(e)[0];
            if (t) return t;
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
                    s.getElementById(e) || s.querySelector(`[name="${e}"]`);
                  if (o) return o;
                }
                r = i.nextNode();
              }
            }
            return null;
          })(this.document, e);
          t && (this.scrollToElement(t), this.attemptFocus(t));
        }
        setHistoryScrollRestoration(e) {
          if (this.supportScrollRestoration()) {
            const t = this.window.history;
            t && t.scrollRestoration && (t.scrollRestoration = e);
          }
        }
        scrollToElement(e) {
          const t = e.getBoundingClientRect(),
            i = t.left + this.window.pageXOffset,
            r = t.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(i - s[0], r - s[1]);
        }
        attemptFocus(e) {
          return e.focus(), this.document.activeElement === e;
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const e =
              oC(this.window.history) ||
              oC(Object.getPrototypeOf(this.window.history));
            return !(!e || (!e.writable && !e.set));
          } catch (e) {
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
          } catch (e) {
            return !1;
          }
        }
      }
      function oC(n) {
        return Object.getOwnPropertyDescriptor(n, "scrollRestoration");
      }
      class Nh extends class BP extends class uF {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function cF(n) {
            gl || (gl = n);
          })(new Nh());
        }
        onAndCancel(e, t, i) {
          return (
            e.addEventListener(t, i, !1),
            () => {
              e.removeEventListener(t, i, !1);
            }
          );
        }
        dispatchEvent(e, t) {
          e.dispatchEvent(t);
        }
        remove(e) {
          e.parentNode && e.parentNode.removeChild(e);
        }
        createElement(e, t) {
          return (t = t || this.getDefaultDocument()).createElement(e);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        getGlobalEventTarget(e, t) {
          return "window" === t
            ? window
            : "document" === t
            ? e
            : "body" === t
            ? e.body
            : null;
        }
        getBaseHref(e) {
          const t = (function jP() {
            return (
              (Mo = Mo || document.querySelector("base")),
              Mo ? Mo.getAttribute("href") : null
            );
          })();
          return null == t
            ? null
            : (function HP(n) {
                (Al = Al || document.createElement("a")),
                  Al.setAttribute("href", n);
                const e = Al.pathname;
                return "/" === e.charAt(0) ? e : `/${e}`;
              })(t);
        }
        resetBaseElement() {
          Mo = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(e) {
          return (function eP(n, e) {
            e = encodeURIComponent(e);
            for (const t of n.split(";")) {
              const i = t.indexOf("="),
                [r, s] = -1 == i ? [t, ""] : [t.slice(0, i), t.slice(i + 1)];
              if (r.trim() === e) return decodeURIComponent(s);
            }
            return null;
          })(document.cookie, e);
        }
      }
      let Al,
        Mo = null;
      const aC = new A("TRANSITION_ID"),
        $P = [
          {
            provide: hl,
            useFactory: function UP(n, e, t) {
              return () => {
                t.get(ss).donePromise.then(() => {
                  const i = Ln(),
                    r = e.querySelectorAll(`style[ng-transition="${n}"]`);
                  for (let s = 0; s < r.length; s++) i.remove(r[s]);
                });
              };
            },
            deps: [aC, Y, we],
            multi: !0,
          },
        ];
      class Lh {
        static init() {
          !(function TO(n) {
            gh = n;
          })(new Lh());
        }
        addToWindow(e) {
          (pe.getAngularTestability = (i, r = !0) => {
            const s = e.findTestabilityInTree(i, r);
            if (null == s)
              throw new Error("Could not find testability for element.");
            return s;
          }),
            (pe.getAllAngularTestabilities = () => e.getAllTestabilities()),
            (pe.getAllAngularRootElements = () => e.getAllRootElements()),
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
        findTestabilityInTree(e, t, i) {
          if (null == t) return null;
          const r = e.getTestability(t);
          return null != r
            ? r
            : i
            ? Ln().isShadowRoot(t)
              ? this.findTestabilityInTree(e, t.host, !0)
              : this.findTestabilityInTree(e, t.parentElement, !0)
            : null;
        }
      }
      let zP = (() => {
        class n {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const Tl = new A("EventManagerPlugins");
      let Il = (() => {
        class n {
          constructor(t, i) {
            (this._zone = i),
              (this._eventNameToPlugin = new Map()),
              t.forEach((r) => (r.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, i, r) {
            return this._findPluginFor(i).addEventListener(t, i, r);
          }
          addGlobalEventListener(t, i, r) {
            return this._findPluginFor(i).addGlobalEventListener(t, i, r);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const i = this._eventNameToPlugin.get(t);
            if (i) return i;
            const r = this._plugins;
            for (let s = 0; s < r.length; s++) {
              const o = r[s];
              if (o.supports(t)) return this._eventNameToPlugin.set(t, o), o;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Tl), C(re));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class lC {
        constructor(e) {
          this._doc = e;
        }
        addGlobalEventListener(e, t, i) {
          const r = Ln().getGlobalEventTarget(this._doc, e);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${t}`);
          return this.addEventListener(r, t, i);
        }
      }
      let cC = (() => {
          class n {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const i = new Set();
              t.forEach((r) => {
                this._stylesSet.has(r) || (this._stylesSet.add(r), i.add(r));
              }),
                this.onStylesAdded(i);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        So = (() => {
          class n extends cC {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Map()),
                this._hostNodes.set(t.head, []);
            }
            _addStylesToHost(t, i, r) {
              t.forEach((s) => {
                const o = this._doc.createElement("style");
                (o.textContent = s), r.push(i.appendChild(o));
              });
            }
            addHost(t) {
              const i = [];
              this._addStylesToHost(this._stylesSet, t, i),
                this._hostNodes.set(t, i);
            }
            removeHost(t) {
              const i = this._hostNodes.get(t);
              i && i.forEach(uC), this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((i, r) => {
                this._addStylesToHost(t, r, i);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((t) => t.forEach(uC));
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(Y));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      function uC(n) {
        Ln().remove(n);
      }
      const Vh = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        Bh = /%COMP%/g;
      function Rl(n, e, t) {
        for (let i = 0; i < e.length; i++) {
          let r = e[i];
          Array.isArray(r) ? Rl(n, r, t) : ((r = r.replace(Bh, n)), t.push(r));
        }
        return t;
      }
      function fC(n) {
        return (e) => {
          if ("__ngUnwrap__" === e) return n;
          !1 === n(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let kl = (() => {
        class n {
          constructor(t, i, r) {
            (this.eventManager = t),
              (this.sharedStylesHost = i),
              (this.appId = r),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new jh(t));
          }
          createRenderer(t, i) {
            if (!t || !i) return this.defaultRenderer;
            switch (i.encapsulation) {
              case ln.Emulated: {
                let r = this.rendererByCompId.get(i.id);
                return (
                  r ||
                    ((r = new YP(
                      this.eventManager,
                      this.sharedStylesHost,
                      i,
                      this.appId
                    )),
                    this.rendererByCompId.set(i.id, r)),
                  r.applyToHost(t),
                  r
                );
              }
              case 1:
              case ln.ShadowDom:
                return new ZP(this.eventManager, this.sharedStylesHost, t, i);
              default:
                if (!this.rendererByCompId.has(i.id)) {
                  const r = Rl(i.id, i.styles, []);
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
          (n.ɵfac = function (t) {
            return new (t || n)(C(Il), C(So), C(vo));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class jh {
        constructor(e) {
          (this.eventManager = e),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(e, t) {
          return t
            ? document.createElementNS(Vh[t] || t, e)
            : document.createElement(e);
        }
        createComment(e) {
          return document.createComment(e);
        }
        createText(e) {
          return document.createTextNode(e);
        }
        appendChild(e, t) {
          e.appendChild(t);
        }
        insertBefore(e, t, i) {
          e && e.insertBefore(t, i);
        }
        removeChild(e, t) {
          e && e.removeChild(t);
        }
        selectRootElement(e, t) {
          let i = "string" == typeof e ? document.querySelector(e) : e;
          if (!i)
            throw new Error(`The selector "${e}" did not match any elements`);
          return t || (i.textContent = ""), i;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, t, i, r) {
          if (r) {
            t = r + ":" + t;
            const s = Vh[r];
            s ? e.setAttributeNS(s, t, i) : e.setAttribute(t, i);
          } else e.setAttribute(t, i);
        }
        removeAttribute(e, t, i) {
          if (i) {
            const r = Vh[i];
            r ? e.removeAttributeNS(r, t) : e.removeAttribute(`${i}:${t}`);
          } else e.removeAttribute(t);
        }
        addClass(e, t) {
          e.classList.add(t);
        }
        removeClass(e, t) {
          e.classList.remove(t);
        }
        setStyle(e, t, i, r) {
          r & (Pt.DashCase | Pt.Important)
            ? e.style.setProperty(t, i, r & Pt.Important ? "important" : "")
            : (e.style[t] = i);
        }
        removeStyle(e, t, i) {
          i & Pt.DashCase ? e.style.removeProperty(t) : (e.style[t] = "");
        }
        setProperty(e, t, i) {
          e[t] = i;
        }
        setValue(e, t) {
          e.nodeValue = t;
        }
        listen(e, t, i) {
          return "string" == typeof e
            ? this.eventManager.addGlobalEventListener(e, t, fC(i))
            : this.eventManager.addEventListener(e, t, fC(i));
        }
      }
      class YP extends jh {
        constructor(e, t, i, r) {
          super(e), (this.component = i);
          const s = Rl(r + "-" + i.id, i.styles, []);
          t.addStyles(s),
            (this.contentAttr = (function qP(n) {
              return "_ngcontent-%COMP%".replace(Bh, n);
            })(r + "-" + i.id)),
            (this.hostAttr = (function KP(n) {
              return "_nghost-%COMP%".replace(Bh, n);
            })(r + "-" + i.id));
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, t) {
          const i = super.createElement(e, t);
          return super.setAttribute(i, this.contentAttr, ""), i;
        }
      }
      class ZP extends jh {
        constructor(e, t, i, r) {
          super(e),
            (this.sharedStylesHost = t),
            (this.hostEl = i),
            (this.shadowRoot = i.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = Rl(r.id, r.styles, []);
          for (let o = 0; o < s.length; o++) {
            const a = document.createElement("style");
            (a.textContent = s[o]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(e, t) {
          return super.appendChild(this.nodeOrShadowRoot(e), t);
        }
        insertBefore(e, t, i) {
          return super.insertBefore(this.nodeOrShadowRoot(e), t, i);
        }
        removeChild(e, t) {
          return super.removeChild(this.nodeOrShadowRoot(e), t);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          );
        }
      }
      let XP = (() => {
        class n extends lC {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, i, r) {
            return (
              t.addEventListener(i, r, !1),
              () => this.removeEventListener(t, i, r)
            );
          }
          removeEventListener(t, i, r) {
            return t.removeEventListener(i, r);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Y));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const mC = ["alt", "control", "meta", "shift"],
        e1 = {
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
        t1 = {
          alt: (n) => n.altKey,
          control: (n) => n.ctrlKey,
          meta: (n) => n.metaKey,
          shift: (n) => n.shiftKey,
        };
      let n1 = (() => {
        class n extends lC {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return null != n.parseEventName(t);
          }
          addEventListener(t, i, r) {
            const s = n.parseEventName(i),
              o = n.eventCallback(s.fullKey, r, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Ln().onAndCancel(t, s.domEventName, o));
          }
          static parseEventName(t) {
            const i = t.toLowerCase().split("."),
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
          static getEventFullKey(t) {
            let i = "",
              r = (function r1(n) {
                let e = n.key;
                if (null == e) {
                  if (((e = n.keyIdentifier), null == e)) return "Unidentified";
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === n.location && gC.hasOwnProperty(e) && (e = gC[e]));
                }
                return e1[e] || e;
              })(t);
            return (
              (r = r.toLowerCase()),
              " " === r ? (r = "space") : "." === r && (r = "dot"),
              mC.forEach((s) => {
                s != r && t1[s](t) && (i += s + ".");
              }),
              (i += r),
              i
            );
          }
          static eventCallback(t, i, r) {
            return (s) => {
              n.getEventFullKey(s) === t && r.runGuarded(() => i(s));
            };
          }
          static _normalizeKey(t) {
            return "esc" === t ? "escape" : t;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Y));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const l1 = Db(eF, "browser", [
          { provide: fl, useValue: sC },
          {
            provide: pb,
            useValue: function s1() {
              Nh.makeCurrent(), Lh.init();
            },
            multi: !0,
          },
          {
            provide: Y,
            useFactory: function a1() {
              return (
                (function sS(n) {
                  au = n;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        c1 = [
          { provide: Dd, useValue: "root" },
          {
            provide: Kn,
            useFactory: function o1() {
              return new Kn();
            },
            deps: [],
          },
          { provide: Tl, useClass: XP, multi: !0, deps: [Y, re, fl] },
          { provide: Tl, useClass: n1, multi: !0, deps: [Y] },
          { provide: kl, useClass: kl, deps: [Il, So, vo] },
          { provide: po, useExisting: kl },
          { provide: cC, useExisting: So },
          { provide: So, useClass: So, deps: [Y] },
          { provide: mh, useClass: mh, deps: [re] },
          { provide: Il, useClass: Il, deps: [Tl, re] },
          { provide: class VP {}, useClass: zP, deps: [] },
        ];
      let _C = (() => {
        class n {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(t) {
            return {
              ngModule: n,
              providers: [
                { provide: vo, useValue: t.appId },
                { provide: aC, useExisting: vo },
                $P,
              ],
            };
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(n, 12));
          }),
          (n.ɵmod = ue({ type: n })),
          (n.ɵinj = le({ providers: c1, imports: [Eo, aF] })),
          n
        );
      })();
      "undefined" != typeof window && window;
      let Uh = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = R({
              token: n,
              factory: function (t) {
                let i = null;
                return (i = t ? new (t || n)() : C(bC)), i;
              },
              providedIn: "root",
            })),
            n
          );
        })(),
        bC = (() => {
          class n extends Uh {
            constructor(t) {
              super(), (this._doc = t);
            }
            sanitize(t, i) {
              if (null == i) return null;
              switch (t) {
                case ae.NONE:
                  return i;
                case ae.HTML:
                  return An(i, "HTML")
                    ? Ft(i)
                    : bg(this._doc, String(i)).toString();
                case ae.STYLE:
                  return An(i, "Style") ? Ft(i) : i;
                case ae.SCRIPT:
                  if (An(i, "Script")) return Ft(i);
                  throw new Error("unsafe value used in a script context");
                case ae.URL:
                  return hg(i), An(i, "URL") ? Ft(i) : Ys(String(i));
                case ae.RESOURCE_URL:
                  if (An(i, "ResourceURL")) return Ft(i);
                  throw new Error(
                    "unsafe value used in a resource URL context (see https://g.co/ng/security#xss)"
                  );
                default:
                  throw new Error(
                    `Unexpected SecurityContext ${t} (see https://g.co/ng/security#xss)`
                  );
              }
            }
            bypassSecurityTrustHtml(t) {
              return (function vx(n) {
                return new px(n);
              })(t);
            }
            bypassSecurityTrustStyle(t) {
              return (function bx(n) {
                return new mx(n);
              })(t);
            }
            bypassSecurityTrustScript(t) {
              return (function Cx(n) {
                return new gx(n);
              })(t);
            }
            bypassSecurityTrustUrl(t) {
              return (function wx(n) {
                return new _x(n);
              })(t);
            }
            bypassSecurityTrustResourceUrl(t) {
              return (function Dx(n) {
                return new yx(n);
              })(t);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(Y));
            }),
            (n.ɵprov = R({
              token: n,
              factory: function (t) {
                let i = null;
                return (
                  (i = t
                    ? new t()
                    : (function v1(n) {
                        return new bC(n.get(Y));
                      })(C(we))),
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
      class nn extends X {
        constructor(e) {
          super(), (this._value = e);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(e) {
          const t = super._subscribe(e);
          return !t.closed && e.next(this._value), t;
        }
        getValue() {
          const { hasError: e, thrownError: t, _value: i } = this;
          if (e) throw t;
          return this._throwIfClosed(), i;
        }
        next(e) {
          super.next((this._value = e));
        }
      }
      const { isArray: b1 } = Array,
        { getPrototypeOf: C1, prototype: w1, keys: D1 } = Object;
      function CC(n) {
        if (1 === n.length) {
          const e = n[0];
          if (b1(e)) return { args: e, keys: null };
          if (
            (function E1(n) {
              return n && "object" == typeof n && C1(n) === w1;
            })(e)
          ) {
            const t = D1(e);
            return { args: t.map((i) => e[i]), keys: t };
          }
        }
        return { args: n, keys: null };
      }
      const { isArray: M1 } = Array;
      function $h(n) {
        return q((e) =>
          (function S1(n, e) {
            return M1(e) ? n(...e) : n(e);
          })(n, e)
        );
      }
      function wC(n, e) {
        return n.reduce((t, i, r) => ((t[i] = e[r]), t), {});
      }
      function DC(...n) {
        const e = ks(n),
          t = rm(n),
          { args: i, keys: r } = CC(n);
        if (0 === i.length) return Ye([], e);
        const s = new he(
          (function x1(n, e, t = li) {
            return (i) => {
              EC(
                e,
                () => {
                  const { length: r } = n,
                    s = new Array(r);
                  let o = r,
                    a = r;
                  for (let l = 0; l < r; l++)
                    EC(
                      e,
                      () => {
                        const c = Ye(n[l], e);
                        let u = !1;
                        c.subscribe(
                          new Se(
                            i,
                            (d) => {
                              (s[l] = d),
                                u || ((u = !0), a--),
                                a || i.next(t(s.slice()));
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
          })(i, e, r ? (o) => wC(r, o) : li)
        );
        return t ? s.pipe($h(t)) : s;
      }
      function EC(n, e, t) {
        n ? $n(t, n, e) : e();
      }
      const Ol = Ts(
        (n) =>
          function () {
            n(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function Fl(...n) {
        return (function A1() {
          return Rs(1);
        })()(Ye(n, ks(n)));
      }
      function zh(n) {
        return new he((e) => {
          xt(n()).subscribe(e);
        });
      }
      function MC() {
        return Pe((n, e) => {
          let t = null;
          n._refCount++;
          const i = new Se(e, void 0, void 0, void 0, () => {
            if (!n || n._refCount <= 0 || 0 < --n._refCount)
              return void (t = null);
            const r = n._connection,
              s = t;
            (t = null),
              r && (!s || r === s) && r.unsubscribe(),
              e.unsubscribe();
          });
          n.subscribe(i), i.closed || (t = n.connect());
        });
      }
      class T1 extends he {
        constructor(e, t) {
          super(),
            (this.source = e),
            (this.subjectFactory = t),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            zp(e) && (this.lift = e.lift);
        }
        _subscribe(e) {
          return this.getSubject().subscribe(e);
        }
        getSubject() {
          const e = this._subject;
          return (
            (!e || e.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: e } = this;
          (this._subject = this._connection = null),
            null == e || e.unsubscribe();
        }
        connect() {
          let e = this._connection;
          if (!e) {
            e = this._connection = new Ve();
            const t = this.getSubject();
            e.add(
              this.source.subscribe(
                new Se(
                  t,
                  void 0,
                  () => {
                    this._teardown(), t.complete();
                  },
                  (i) => {
                    this._teardown(), t.error(i);
                  },
                  () => this._teardown()
                )
              )
            ),
              e.closed && ((this._connection = null), (e = Ve.EMPTY));
          }
          return e;
        }
        refCount() {
          return MC()(this);
        }
      }
      function Zi(n, e) {
        return Pe((t, i) => {
          let r = null,
            s = 0,
            o = !1;
          const a = () => o && !r && i.complete();
          t.subscribe(
            new Se(
              i,
              (l) => {
                null == r || r.unsubscribe();
                let c = 0;
                const u = s++;
                xt(n(l, u)).subscribe(
                  (r = new Se(
                    i,
                    (d) => i.next(e ? e(l, d, u, c++) : d),
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
        const e = ks(n);
        return Pe((t, i) => {
          (e ? Fl(n, t, e) : Fl(n, t)).subscribe(i);
        });
      }
      function I1(n, e, t, i, r) {
        return (s, o) => {
          let a = t,
            l = e,
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
      function SC(n, e) {
        return Pe(I1(n, e, arguments.length >= 2, !0));
      }
      function Oe(n, e) {
        return Pe((t, i) => {
          let r = 0;
          t.subscribe(new Se(i, (s) => n.call(e, s, r++) && i.next(s)));
        });
      }
      function ii(n) {
        return Pe((e, t) => {
          let s,
            i = null,
            r = !1;
          (i = e.subscribe(
            new Se(t, void 0, void 0, (o) => {
              (s = xt(n(o, ii(n)(e)))),
                i ? (i.unsubscribe(), (i = null), s.subscribe(t)) : (r = !0);
            })
          )),
            r && (i.unsubscribe(), (i = null), s.subscribe(t));
        });
      }
      function cs(n, e) {
        return se(e) ? $e(n, e, 1) : $e(n, 1);
      }
      function Gh(n) {
        return n <= 0
          ? () => En
          : Pe((e, t) => {
              let i = [];
              e.subscribe(
                new Se(
                  t,
                  (r) => {
                    i.push(r), n < i.length && i.shift();
                  },
                  () => {
                    for (const r of i) t.next(r);
                    t.complete();
                  },
                  void 0,
                  () => {
                    i = null;
                  }
                )
              );
            });
      }
      function xC(n = R1) {
        return Pe((e, t) => {
          let i = !1;
          e.subscribe(
            new Se(
              t,
              (r) => {
                (i = !0), t.next(r);
              },
              () => (i ? t.complete() : t.error(n()))
            )
          );
        });
      }
      function R1() {
        return new Ol();
      }
      function AC(n) {
        return Pe((e, t) => {
          let i = !1;
          e.subscribe(
            new Se(
              t,
              (r) => {
                (i = !0), t.next(r);
              },
              () => {
                i || t.next(n), t.complete();
              }
            )
          );
        });
      }
      function us(n, e) {
        const t = arguments.length >= 2;
        return (i) =>
          i.pipe(
            n ? Oe((r, s) => n(r, s, i)) : li,
            ze(1),
            t ? AC(e) : xC(() => new Ol())
          );
      }
      function et(n, e, t) {
        const i = se(n) || e || t ? { next: n, error: e, complete: t } : n;
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
          : li;
      }
      function TC(n) {
        return Pe((e, t) => {
          try {
            e.subscribe(t);
          } finally {
            t.add(n);
          }
        });
      }
      class ri {
        constructor(e, t) {
          (this.id = e), (this.url = t);
        }
      }
      class Wh extends ri {
        constructor(e, t, i = "imperative", r = null) {
          super(e, t), (this.navigationTrigger = i), (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class xo extends ri {
        constructor(e, t, i) {
          super(e, t), (this.urlAfterRedirects = i);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class IC extends ri {
        constructor(e, t, i) {
          super(e, t), (this.reason = i);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class O1 extends ri {
        constructor(e, t, i) {
          super(e, t), (this.error = i);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class F1 extends ri {
        constructor(e, t, i, r) {
          super(e, t), (this.urlAfterRedirects = i), (this.state = r);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class P1 extends ri {
        constructor(e, t, i, r) {
          super(e, t), (this.urlAfterRedirects = i), (this.state = r);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class N1 extends ri {
        constructor(e, t, i, r, s) {
          super(e, t),
            (this.urlAfterRedirects = i),
            (this.state = r),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class L1 extends ri {
        constructor(e, t, i, r) {
          super(e, t), (this.urlAfterRedirects = i), (this.state = r);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class V1 extends ri {
        constructor(e, t, i, r) {
          super(e, t), (this.urlAfterRedirects = i), (this.state = r);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class RC {
        constructor(e) {
          this.route = e;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class kC {
        constructor(e) {
          this.route = e;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class B1 {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class j1 {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class H1 {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class U1 {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class OC {
        constructor(e, t, i) {
          (this.routerEvent = e), (this.position = t), (this.anchor = i);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const Z = "primary";
      class $1 {
        constructor(e) {
          this.params = e || {};
        }
        has(e) {
          return Object.prototype.hasOwnProperty.call(this.params, e);
        }
        get(e) {
          if (this.has(e)) {
            const t = this.params[e];
            return Array.isArray(t) ? t[0] : t;
          }
          return null;
        }
        getAll(e) {
          if (this.has(e)) {
            const t = this.params[e];
            return Array.isArray(t) ? t : [t];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function ds(n) {
        return new $1(n);
      }
      const FC = "ngNavigationCancelingError";
      function qh(n) {
        const e = Error("NavigationCancelingError: " + n);
        return (e[FC] = !0), e;
      }
      function G1(n, e, t) {
        const i = t.path.split("/");
        if (
          i.length > n.length ||
          ("full" === t.pathMatch && (e.hasChildren() || i.length < n.length))
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
      function Vn(n, e) {
        const t = n ? Object.keys(n) : void 0,
          i = e ? Object.keys(e) : void 0;
        if (!t || !i || t.length != i.length) return !1;
        let r;
        for (let s = 0; s < t.length; s++)
          if (((r = t[s]), !PC(n[r], e[r]))) return !1;
        return !0;
      }
      function PC(n, e) {
        if (Array.isArray(n) && Array.isArray(e)) {
          if (n.length !== e.length) return !1;
          const t = [...n].sort(),
            i = [...e].sort();
          return t.every((r, s) => i[s] === r);
        }
        return n === e;
      }
      function NC(n) {
        return Array.prototype.concat.apply([], n);
      }
      function LC(n) {
        return n.length > 0 ? n[n.length - 1] : null;
      }
      function tt(n, e) {
        for (const t in n) n.hasOwnProperty(t) && e(n[t], t);
      }
      function Bn(n) {
        return Ld(n) ? n : ao(n) ? Ye(Promise.resolve(n)) : P(n);
      }
      const K1 = {
          exact: function jC(n, e, t) {
            if (
              !er(n.segments, e.segments) ||
              !Pl(n.segments, e.segments, t) ||
              n.numberOfChildren !== e.numberOfChildren
            )
              return !1;
            for (const i in e.children)
              if (!n.children[i] || !jC(n.children[i], e.children[i], t))
                return !1;
            return !0;
          },
          subset: HC,
        },
        VC = {
          exact: function Q1(n, e) {
            return Vn(n, e);
          },
          subset: function Y1(n, e) {
            return (
              Object.keys(e).length <= Object.keys(n).length &&
              Object.keys(e).every((t) => PC(n[t], e[t]))
            );
          },
          ignored: () => !0,
        };
      function BC(n, e, t) {
        return (
          K1[t.paths](n.root, e.root, t.matrixParams) &&
          VC[t.queryParams](n.queryParams, e.queryParams) &&
          !("exact" === t.fragment && n.fragment !== e.fragment)
        );
      }
      function HC(n, e, t) {
        return UC(n, e, e.segments, t);
      }
      function UC(n, e, t, i) {
        if (n.segments.length > t.length) {
          const r = n.segments.slice(0, t.length);
          return !(!er(r, t) || e.hasChildren() || !Pl(r, t, i));
        }
        if (n.segments.length === t.length) {
          if (!er(n.segments, t) || !Pl(n.segments, t, i)) return !1;
          for (const r in e.children)
            if (!n.children[r] || !HC(n.children[r], e.children[r], i))
              return !1;
          return !0;
        }
        {
          const r = t.slice(0, n.segments.length),
            s = t.slice(n.segments.length);
          return (
            !!(er(n.segments, r) && Pl(n.segments, r, i) && n.children[Z]) &&
            UC(n.children[Z], e, s, i)
          );
        }
      }
      function Pl(n, e, t) {
        return e.every((i, r) => VC[t](n[r].parameters, i.parameters));
      }
      class Ji {
        constructor(e, t, i) {
          (this.root = e), (this.queryParams = t), (this.fragment = i);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = ds(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return J1.serialize(this);
        }
      }
      class te {
        constructor(e, t) {
          (this.segments = e),
            (this.children = t),
            (this.parent = null),
            tt(t, (i, r) => (i.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Nl(this);
        }
      }
      class Ao {
        constructor(e, t) {
          (this.path = e), (this.parameters = t);
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
      function er(n, e) {
        return n.length === e.length && n.every((t, i) => t.path === e[i].path);
      }
      class $C {}
      class zC {
        parse(e) {
          const t = new lN(e);
          return new Ji(
            t.parseRootSegment(),
            t.parseQueryParams(),
            t.parseFragment()
          );
        }
        serialize(e) {
          const t = `/${To(e.root, !0)}`,
            i = (function nN(n) {
              const e = Object.keys(n)
                .map((t) => {
                  const i = n[t];
                  return Array.isArray(i)
                    ? i.map((r) => `${Ll(t)}=${Ll(r)}`).join("&")
                    : `${Ll(t)}=${Ll(i)}`;
                })
                .filter((t) => !!t);
              return e.length ? `?${e.join("&")}` : "";
            })(e.queryParams);
          return `${t}${i}${
            "string" == typeof e.fragment
              ? `#${(function eN(n) {
                  return encodeURI(n);
                })(e.fragment)}`
              : ""
          }`;
        }
      }
      const J1 = new zC();
      function Nl(n) {
        return n.segments.map((e) => qC(e)).join("/");
      }
      function To(n, e) {
        if (!n.hasChildren()) return Nl(n);
        if (e) {
          const t = n.children[Z] ? To(n.children[Z], !1) : "",
            i = [];
          return (
            tt(n.children, (r, s) => {
              s !== Z && i.push(`${s}:${To(r, !1)}`);
            }),
            i.length > 0 ? `${t}(${i.join("//")})` : t
          );
        }
        {
          const t = (function X1(n, e) {
            let t = [];
            return (
              tt(n.children, (i, r) => {
                r === Z && (t = t.concat(e(i, r)));
              }),
              tt(n.children, (i, r) => {
                r !== Z && (t = t.concat(e(i, r)));
              }),
              t
            );
          })(n, (i, r) =>
            r === Z ? [To(n.children[Z], !1)] : [`${r}:${To(i, !1)}`]
          );
          return 1 === Object.keys(n.children).length && null != n.children[Z]
            ? `${Nl(n)}/${t[0]}`
            : `${Nl(n)}/(${t.join("//")})`;
        }
      }
      function GC(n) {
        return encodeURIComponent(n)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Ll(n) {
        return GC(n).replace(/%3B/gi, ";");
      }
      function Kh(n) {
        return GC(n)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Vl(n) {
        return decodeURIComponent(n);
      }
      function WC(n) {
        return Vl(n.replace(/\+/g, "%20"));
      }
      function qC(n) {
        return `${Kh(n.path)}${(function tN(n) {
          return Object.keys(n)
            .map((e) => `;${Kh(e)}=${Kh(n[e])}`)
            .join("");
        })(n.parameters)}`;
      }
      const iN = /^[^\/()?;=#]+/;
      function Bl(n) {
        const e = n.match(iN);
        return e ? e[0] : "";
      }
      const rN = /^[^=?&#]+/,
        oN = /^[^&#]+/;
      class lN {
        constructor(e) {
          (this.url = e), (this.remaining = e);
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
          const e = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(e);
            } while (this.consumeOptional("&"));
          return e;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const e = [];
          for (
            this.peekStartsWith("(") || e.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), e.push(this.parseSegment());
          let t = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (t = this.parseParens(!0)));
          let i = {};
          return (
            this.peekStartsWith("(") && (i = this.parseParens(!1)),
            (e.length > 0 || Object.keys(t).length > 0) &&
              (i[Z] = new te(e, t)),
            i
          );
        }
        parseSegment() {
          const e = Bl(this.remaining);
          if ("" === e && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(e), new Ao(Vl(e), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const e = {};
          for (; this.consumeOptional(";"); ) this.parseParam(e);
          return e;
        }
        parseParam(e) {
          const t = Bl(this.remaining);
          if (!t) return;
          this.capture(t);
          let i = "";
          if (this.consumeOptional("=")) {
            const r = Bl(this.remaining);
            r && ((i = r), this.capture(i));
          }
          e[Vl(t)] = Vl(i);
        }
        parseQueryParam(e) {
          const t = (function sN(n) {
            const e = n.match(rN);
            return e ? e[0] : "";
          })(this.remaining);
          if (!t) return;
          this.capture(t);
          let i = "";
          if (this.consumeOptional("=")) {
            const o = (function aN(n) {
              const e = n.match(oN);
              return e ? e[0] : "";
            })(this.remaining);
            o && ((i = o), this.capture(i));
          }
          const r = WC(t),
            s = WC(i);
          if (e.hasOwnProperty(r)) {
            let o = e[r];
            Array.isArray(o) || ((o = [o]), (e[r] = o)), o.push(s);
          } else e[r] = s;
        }
        parseParens(e) {
          const t = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const i = Bl(this.remaining),
              r = this.remaining[i.length];
            if ("/" !== r && ")" !== r && ";" !== r)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s;
            i.indexOf(":") > -1
              ? ((s = i.substr(0, i.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : e && (s = Z);
            const o = this.parseChildren();
            (t[s] = 1 === Object.keys(o).length ? o[Z] : new te([], o)),
              this.consumeOptional("//");
          }
          return t;
        }
        peekStartsWith(e) {
          return this.remaining.startsWith(e);
        }
        consumeOptional(e) {
          return (
            !!this.peekStartsWith(e) &&
            ((this.remaining = this.remaining.substring(e.length)), !0)
          );
        }
        capture(e) {
          if (!this.consumeOptional(e)) throw new Error(`Expected "${e}".`);
        }
      }
      class KC {
        constructor(e) {
          this._root = e;
        }
        get root() {
          return this._root.value;
        }
        parent(e) {
          const t = this.pathFromRoot(e);
          return t.length > 1 ? t[t.length - 2] : null;
        }
        children(e) {
          const t = Qh(e, this._root);
          return t ? t.children.map((i) => i.value) : [];
        }
        firstChild(e) {
          const t = Qh(e, this._root);
          return t && t.children.length > 0 ? t.children[0].value : null;
        }
        siblings(e) {
          const t = Yh(e, this._root);
          return t.length < 2
            ? []
            : t[t.length - 2].children
                .map((r) => r.value)
                .filter((r) => r !== e);
        }
        pathFromRoot(e) {
          return Yh(e, this._root).map((t) => t.value);
        }
      }
      function Qh(n, e) {
        if (n === e.value) return e;
        for (const t of e.children) {
          const i = Qh(n, t);
          if (i) return i;
        }
        return null;
      }
      function Yh(n, e) {
        if (n === e.value) return [e];
        for (const t of e.children) {
          const i = Yh(n, t);
          if (i.length) return i.unshift(e), i;
        }
        return [];
      }
      class si {
        constructor(e, t) {
          (this.value = e), (this.children = t);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function hs(n) {
        const e = {};
        return n && n.children.forEach((t) => (e[t.value.outlet] = t)), e;
      }
      class QC extends KC {
        constructor(e, t) {
          super(e), (this.snapshot = t), Zh(this, e);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function YC(n, e) {
        const t = (function cN(n, e) {
            const o = new jl([], {}, {}, "", {}, Z, e, null, n.root, -1, {});
            return new XC("", new si(o, []));
          })(n, e),
          i = new nn([new Ao("", {})]),
          r = new nn({}),
          s = new nn({}),
          o = new nn({}),
          a = new nn(""),
          l = new fs(i, r, o, a, s, Z, e, t.root);
        return (l.snapshot = t.root), new QC(new si(l, []), t);
      }
      class fs {
        constructor(e, t, i, r, s, o, a, l) {
          (this.url = e),
            (this.params = t),
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
              (this._paramMap = this.params.pipe(q((e) => ds(e)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(q((e) => ds(e)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function ZC(n, e = "emptyOnly") {
        const t = n.pathFromRoot;
        let i = 0;
        if ("always" !== e)
          for (i = t.length - 1; i >= 1; ) {
            const r = t[i],
              s = t[i - 1];
            if (r.routeConfig && "" === r.routeConfig.path) i--;
            else {
              if (s.component) break;
              i--;
            }
          }
        return (function uN(n) {
          return n.reduce(
            (e, t) => ({
              params: Object.assign(Object.assign({}, e.params), t.params),
              data: Object.assign(Object.assign({}, e.data), t.data),
              resolve: Object.assign(
                Object.assign({}, e.resolve),
                t._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(t.slice(i));
      }
      class jl {
        constructor(e, t, i, r, s, o, a, l, c, u, d) {
          (this.url = e),
            (this.params = t),
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
        constructor(e, t) {
          super(t), (this.url = e), Zh(this, t);
        }
        toString() {
          return JC(this._root);
        }
      }
      function Zh(n, e) {
        (e.value._routerState = n), e.children.forEach((t) => Zh(n, t));
      }
      function JC(n) {
        const e =
          n.children.length > 0 ? ` { ${n.children.map(JC).join(", ")} } ` : "";
        return `${n.value}${e}`;
      }
      function Xh(n) {
        if (n.snapshot) {
          const e = n.snapshot,
            t = n._futureSnapshot;
          (n.snapshot = t),
            Vn(e.queryParams, t.queryParams) ||
              n.queryParams.next(t.queryParams),
            e.fragment !== t.fragment && n.fragment.next(t.fragment),
            Vn(e.params, t.params) || n.params.next(t.params),
            (function W1(n, e) {
              if (n.length !== e.length) return !1;
              for (let t = 0; t < n.length; ++t) if (!Vn(n[t], e[t])) return !1;
              return !0;
            })(e.url, t.url) || n.url.next(t.url),
            Vn(e.data, t.data) || n.data.next(t.data);
        } else
          (n.snapshot = n._futureSnapshot), n.data.next(n._futureSnapshot.data);
      }
      function Jh(n, e) {
        const t =
          Vn(n.params, e.params) &&
          (function Z1(n, e) {
            return (
              er(n, e) && n.every((t, i) => Vn(t.parameters, e[i].parameters))
            );
          })(n.url, e.url);
        return (
          t &&
          !(!n.parent != !e.parent) &&
          (!n.parent || Jh(n.parent, e.parent))
        );
      }
      function Io(n, e, t) {
        if (t && n.shouldReuseRoute(e.value, t.value.snapshot)) {
          const i = t.value;
          i._futureSnapshot = e.value;
          const r = (function hN(n, e, t) {
            return e.children.map((i) => {
              for (const r of t.children)
                if (n.shouldReuseRoute(i.value, r.value.snapshot))
                  return Io(n, i, r);
              return Io(n, i);
            });
          })(n, e, t);
          return new si(i, r);
        }
        {
          if (n.shouldAttach(e.value)) {
            const s = n.retrieve(e.value);
            if (null !== s) {
              const o = s.route;
              return (
                (o.value._futureSnapshot = e.value),
                (o.children = e.children.map((a) => Io(n, a))),
                o
              );
            }
          }
          const i = (function fN(n) {
              return new fs(
                new nn(n.url),
                new nn(n.params),
                new nn(n.queryParams),
                new nn(n.fragment),
                new nn(n.data),
                n.outlet,
                n.component,
                n
              );
            })(e.value),
            r = e.children.map((s) => Io(n, s));
          return new si(i, r);
        }
      }
      function Hl(n) {
        return (
          "object" == typeof n && null != n && !n.outlets && !n.segmentPath
        );
      }
      function Ro(n) {
        return "object" == typeof n && null != n && n.outlets;
      }
      function ef(n, e, t, i, r) {
        let s = {};
        return (
          i &&
            tt(i, (o, a) => {
              s[a] = Array.isArray(o) ? o.map((l) => `${l}`) : `${o}`;
            }),
          new Ji(t.root === n ? e : ew(t.root, n, e), s, r)
        );
      }
      function ew(n, e, t) {
        const i = {};
        return (
          tt(n.children, (r, s) => {
            i[s] = r === e ? t : ew(r, e, t);
          }),
          new te(n.segments, i)
        );
      }
      class tw {
        constructor(e, t, i) {
          if (
            ((this.isAbsolute = e),
            (this.numberOfDoubleDots = t),
            (this.commands = i),
            e && i.length > 0 && Hl(i[0]))
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
      class tf {
        constructor(e, t, i) {
          (this.segmentGroup = e), (this.processChildren = t), (this.index = i);
        }
      }
      function nw(n, e, t) {
        if (
          (n || (n = new te([], {})),
          0 === n.segments.length && n.hasChildren())
        )
          return Ul(n, e, t);
        const i = (function vN(n, e, t) {
            let i = 0,
              r = e;
            const s = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; r < n.segments.length; ) {
              if (i >= t.length) return s;
              const o = n.segments[r],
                a = t[i];
              if (Ro(a)) break;
              const l = `${a}`,
                c = i < t.length - 1 ? t[i + 1] : null;
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
          })(n, e, t),
          r = t.slice(i.commandIndex);
        if (i.match && i.pathIndex < n.segments.length) {
          const s = new te(n.segments.slice(0, i.pathIndex), {});
          return (
            (s.children[Z] = new te(n.segments.slice(i.pathIndex), n.children)),
            Ul(s, 0, r)
          );
        }
        return i.match && 0 === r.length
          ? new te(n.segments, {})
          : i.match && !n.hasChildren()
          ? nf(n, e, t)
          : i.match
          ? Ul(n, 0, r)
          : nf(n, e, t);
      }
      function Ul(n, e, t) {
        if (0 === t.length) return new te(n.segments, {});
        {
          const i = (function yN(n) {
              return Ro(n[0]) ? n[0].outlets : { [Z]: n };
            })(t),
            r = {};
          return (
            tt(i, (s, o) => {
              "string" == typeof s && (s = [s]),
                null !== s && (r[o] = nw(n.children[o], e, s));
            }),
            tt(n.children, (s, o) => {
              void 0 === i[o] && (r[o] = s);
            }),
            new te(n.segments, r)
          );
        }
      }
      function nf(n, e, t) {
        const i = n.segments.slice(0, e);
        let r = 0;
        for (; r < t.length; ) {
          const s = t[r];
          if (Ro(s)) {
            const l = bN(s.outlets);
            return new te(i, l);
          }
          if (0 === r && Hl(t[0])) {
            i.push(new Ao(n.segments[e].path, iw(t[0]))), r++;
            continue;
          }
          const o = Ro(s) ? s.outlets[Z] : `${s}`,
            a = r < t.length - 1 ? t[r + 1] : null;
          o && a && Hl(a)
            ? (i.push(new Ao(o, iw(a))), (r += 2))
            : (i.push(new Ao(o, {})), r++);
        }
        return new te(i, {});
      }
      function bN(n) {
        const e = {};
        return (
          tt(n, (t, i) => {
            "string" == typeof t && (t = [t]),
              null !== t && (e[i] = nf(new te([], {}), 0, t));
          }),
          e
        );
      }
      function iw(n) {
        const e = {};
        return tt(n, (t, i) => (e[i] = `${t}`)), e;
      }
      function rw(n, e, t) {
        return n == t.path && Vn(e, t.parameters);
      }
      class wN {
        constructor(e, t, i, r) {
          (this.routeReuseStrategy = e),
            (this.futureState = t),
            (this.currState = i),
            (this.forwardEvent = r);
        }
        activate(e) {
          const t = this.futureState._root,
            i = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(t, i, e),
            Xh(this.futureState.root),
            this.activateChildRoutes(t, i, e);
        }
        deactivateChildRoutes(e, t, i) {
          const r = hs(t);
          e.children.forEach((s) => {
            const o = s.value.outlet;
            this.deactivateRoutes(s, r[o], i), delete r[o];
          }),
            tt(r, (s, o) => {
              this.deactivateRouteAndItsChildren(s, i);
            });
        }
        deactivateRoutes(e, t, i) {
          const r = e.value,
            s = t ? t.value : null;
          if (r === s)
            if (r.component) {
              const o = i.getContext(r.outlet);
              o && this.deactivateChildRoutes(e, t, o.children);
            } else this.deactivateChildRoutes(e, t, i);
          else s && this.deactivateRouteAndItsChildren(t, i);
        }
        deactivateRouteAndItsChildren(e, t) {
          e.value.component &&
          this.routeReuseStrategy.shouldDetach(e.value.snapshot)
            ? this.detachAndStoreRouteSubtree(e, t)
            : this.deactivateRouteAndOutlet(e, t);
        }
        detachAndStoreRouteSubtree(e, t) {
          const i = t.getContext(e.value.outlet),
            r = i && e.value.component ? i.children : t,
            s = hs(e);
          for (const o of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[o], r);
          if (i && i.outlet) {
            const o = i.outlet.detach(),
              a = i.children.onOutletDeactivated();
            this.routeReuseStrategy.store(e.value.snapshot, {
              componentRef: o,
              route: e,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(e, t) {
          const i = t.getContext(e.value.outlet),
            r = i && e.value.component ? i.children : t,
            s = hs(e);
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
        activateChildRoutes(e, t, i) {
          const r = hs(t);
          e.children.forEach((s) => {
            this.activateRoutes(s, r[s.value.outlet], i),
              this.forwardEvent(new U1(s.value.snapshot));
          }),
            e.children.length && this.forwardEvent(new j1(e.value.snapshot));
        }
        activateRoutes(e, t, i) {
          const r = e.value,
            s = t ? t.value : null;
          if ((Xh(r), r === s))
            if (r.component) {
              const o = i.getOrCreateContext(r.outlet);
              this.activateChildRoutes(e, t, o.children);
            } else this.activateChildRoutes(e, t, i);
          else if (r.component) {
            const o = i.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                o.children.onOutletReAttached(a.contexts),
                (o.attachRef = a.componentRef),
                (o.route = a.route.value),
                o.outlet && o.outlet.attach(a.componentRef, a.route.value),
                Xh(a.route.value),
                this.activateChildRoutes(e, null, o.children);
            } else {
              const a = (function DN(n) {
                  for (let e = n.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig;
                    if (t && t.component) return null;
                  }
                  return null;
                })(r.snapshot),
                l = a ? a.module.componentFactoryResolver : null;
              (o.attachRef = null),
                (o.route = r),
                (o.resolver = l),
                o.outlet && o.outlet.activateWith(r, l),
                this.activateChildRoutes(e, null, o.children);
            }
          } else this.activateChildRoutes(e, null, i);
        }
      }
      class rf {
        constructor(e, t) {
          (this.routes = e), (this.module = t);
        }
      }
      function Ci(n) {
        return "function" == typeof n;
      }
      function tr(n) {
        return n instanceof Ji;
      }
      const ko = Symbol("INITIAL_VALUE");
      function Oo() {
        return Zi((n) =>
          DC(n.map((e) => e.pipe(ze(1), Xi(ko)))).pipe(
            SC((e, t) => {
              let i = !1;
              return t.reduce(
                (r, s, o) =>
                  r !== ko
                    ? r
                    : (s === ko && (i = !0),
                      i || (!1 !== s && o !== t.length - 1 && !tr(s)) ? r : s),
                e
              );
            }, ko),
            Oe((e) => e !== ko),
            q((e) => (tr(e) ? e : !0 === e)),
            ze(1)
          )
        );
      }
      class TN {
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
        onChildOutletCreated(e, t) {
          const i = this.getOrCreateContext(e);
          (i.outlet = t), this.contexts.set(e, i);
        }
        onChildOutletDestroyed(e) {
          const t = this.getContext(e);
          t && ((t.outlet = null), (t.attachRef = null));
        }
        onOutletDeactivated() {
          const e = this.contexts;
          return (this.contexts = new Map()), e;
        }
        onOutletReAttached(e) {
          this.contexts = e;
        }
        getOrCreateContext(e) {
          let t = this.getContext(e);
          return t || ((t = new TN()), this.contexts.set(e, t)), t;
        }
        getContext(e) {
          return this.contexts.get(e) || null;
        }
      }
      let sf = (() => {
        class n {
          constructor(t, i, r, s, o) {
            (this.parentContexts = t),
              (this.location = i),
              (this.resolver = r),
              (this.changeDetector = o),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new ee()),
              (this.deactivateEvents = new ee()),
              (this.attachEvents = new ee()),
              (this.detachEvents = new ee()),
              (this.name = s || Z),
              t.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const t = this.parentContexts.getContext(this.name);
              t &&
                t.route &&
                (t.attachRef
                  ? this.attach(t.attachRef, t.route)
                  : this.activateWith(t.route, t.resolver || null));
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
            const t = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(t.instance),
              t
            );
          }
          attach(t, i) {
            (this.activated = t),
              (this._activatedRoute = i),
              this.location.insert(t.hostView),
              this.attachEvents.emit(t.instance);
          }
          deactivate() {
            if (this.activated) {
              const t = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t);
            }
          }
          activateWith(t, i) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = t;
            const o = (i = i || this.resolver).resolveComponentFactory(
                t._futureSnapshot.routeConfig.component
              ),
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new IN(t, a, this.location.injector);
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
          (n.ɵfac = function (t) {
            return new (t || n)(y(Fo), y(Lt), y(vi), mi("name"), y(yn));
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
      class IN {
        constructor(e, t, i) {
          (this.route = e), (this.childContexts = t), (this.parent = i);
        }
        get(e, t) {
          return e === fs
            ? this.route
            : e === Fo
            ? this.childContexts
            : this.parent.get(e, t);
        }
      }
      let sw = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵcmp = De({
            type: n,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (t, i) {
              1 & t && L(0, "router-outlet");
            },
            directives: [sf],
            encapsulation: 2,
          })),
          n
        );
      })();
      function ow(n, e = "") {
        for (let t = 0; t < n.length; t++) {
          const i = n[t];
          RN(i, kN(e, i));
        }
      }
      function RN(n, e) {
        n.children && ow(n.children, e);
      }
      function kN(n, e) {
        return e
          ? n || e.path
            ? n && !e.path
              ? `${n}/`
              : !n && e.path
              ? e.path
              : `${n}/${e.path}`
            : ""
          : n;
      }
      function af(n) {
        const e = n.children && n.children.map(af),
          t = e
            ? Object.assign(Object.assign({}, n), { children: e })
            : Object.assign({}, n);
        return (
          !t.component &&
            (e || t.loadChildren) &&
            t.outlet &&
            t.outlet !== Z &&
            (t.component = sw),
          t
        );
      }
      function rn(n) {
        return n.outlet || Z;
      }
      function aw(n, e) {
        const t = n.filter((i) => rn(i) === e);
        return t.push(...n.filter((i) => rn(i) !== e)), t;
      }
      const lw = {
        matched: !1,
        consumedSegments: [],
        lastChild: 0,
        parameters: {},
        positionalParamSegments: {},
      };
      function $l(n, e, t) {
        var i;
        if ("" === e.path)
          return "full" === e.pathMatch && (n.hasChildren() || t.length > 0)
            ? Object.assign({}, lw)
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {},
              };
        const s = (e.matcher || G1)(t, n, e);
        if (!s) return Object.assign({}, lw);
        const o = {};
        tt(s.posParams, (l, c) => {
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
      function zl(n, e, t, i, r = "corrected") {
        if (
          t.length > 0 &&
          (function PN(n, e, t) {
            return t.some((i) => Gl(n, e, i) && rn(i) !== Z);
          })(n, t, i)
        ) {
          const o = new te(
            e,
            (function FN(n, e, t, i) {
              const r = {};
              (r[Z] = i),
                (i._sourceSegment = n),
                (i._segmentIndexShift = e.length);
              for (const s of t)
                if ("" === s.path && rn(s) !== Z) {
                  const o = new te([], {});
                  (o._sourceSegment = n),
                    (o._segmentIndexShift = e.length),
                    (r[rn(s)] = o);
                }
              return r;
            })(n, e, i, new te(t, n.children))
          );
          return (
            (o._sourceSegment = n),
            (o._segmentIndexShift = e.length),
            { segmentGroup: o, slicedSegments: [] }
          );
        }
        if (
          0 === t.length &&
          (function NN(n, e, t) {
            return t.some((i) => Gl(n, e, i));
          })(n, t, i)
        ) {
          const o = new te(
            n.segments,
            (function ON(n, e, t, i, r, s) {
              const o = {};
              for (const a of i)
                if (Gl(n, t, a) && !r[rn(a)]) {
                  const l = new te([], {});
                  (l._sourceSegment = n),
                    (l._segmentIndexShift =
                      "legacy" === s ? n.segments.length : e.length),
                    (o[rn(a)] = l);
                }
              return Object.assign(Object.assign({}, r), o);
            })(n, e, t, i, n.children, r)
          );
          return (
            (o._sourceSegment = n),
            (o._segmentIndexShift = e.length),
            { segmentGroup: o, slicedSegments: t }
          );
        }
        const s = new te(n.segments, n.children);
        return (
          (s._sourceSegment = n),
          (s._segmentIndexShift = e.length),
          { segmentGroup: s, slicedSegments: t }
        );
      }
      function Gl(n, e, t) {
        return (
          (!(n.hasChildren() || e.length > 0) || "full" !== t.pathMatch) &&
          "" === t.path
        );
      }
      function cw(n, e, t, i) {
        return (
          !!(rn(n) === i || (i !== Z && Gl(e, t, n))) &&
          ("**" === n.path || $l(e, n, t).matched)
        );
      }
      function uw(n, e, t) {
        return 0 === e.length && !n.children[t];
      }
      class Po {
        constructor(e) {
          this.segmentGroup = e || null;
        }
      }
      class dw {
        constructor(e) {
          this.urlTree = e;
        }
      }
      function Wl(n) {
        return new he((e) => e.error(new Po(n)));
      }
      function hw(n) {
        return new he((e) => e.error(new dw(n)));
      }
      function LN(n) {
        return new he((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${n}'`
            )
          )
        );
      }
      class jN {
        constructor(e, t, i, r, s) {
          (this.configLoader = t),
            (this.urlSerializer = i),
            (this.urlTree = r),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = e.get(Jn));
        }
        apply() {
          const e = zl(this.urlTree.root, [], [], this.config).segmentGroup,
            t = new te(e.segments, e.children);
          return this.expandSegmentGroup(this.ngModule, this.config, t, Z)
            .pipe(
              q((s) =>
                this.createUrlTree(
                  lf(s),
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
        match(e) {
          return this.expandSegmentGroup(this.ngModule, this.config, e.root, Z)
            .pipe(
              q((r) => this.createUrlTree(lf(r), e.queryParams, e.fragment))
            )
            .pipe(
              ii((r) => {
                throw r instanceof Po ? this.noMatchError(r) : r;
              })
            );
        }
        noMatchError(e) {
          return new Error(
            `Cannot match any routes. URL Segment: '${e.segmentGroup}'`
          );
        }
        createUrlTree(e, t, i) {
          const r = e.segments.length > 0 ? new te([], { [Z]: e }) : e;
          return new Ji(r, t, i);
        }
        expandSegmentGroup(e, t, i, r) {
          return 0 === i.segments.length && i.hasChildren()
            ? this.expandChildren(e, t, i).pipe(q((s) => new te([], s)))
            : this.expandSegment(e, i, t, i.segments, r, !0);
        }
        expandChildren(e, t, i) {
          const r = [];
          for (const s of Object.keys(i.children))
            "primary" === s ? r.unshift(s) : r.push(s);
          return Ye(r).pipe(
            cs((s) => {
              const o = i.children[s],
                a = aw(t, s);
              return this.expandSegmentGroup(e, a, o, s).pipe(
                q((l) => ({ segment: l, outlet: s }))
              );
            }),
            SC((s, o) => ((s[o.outlet] = o.segment), s), {}),
            (function k1(n, e) {
              const t = arguments.length >= 2;
              return (i) =>
                i.pipe(
                  n ? Oe((r, s) => n(r, s, i)) : li,
                  Gh(1),
                  t ? AC(e) : xC(() => new Ol())
                );
            })()
          );
        }
        expandSegment(e, t, i, r, s, o) {
          return Ye(i).pipe(
            cs((a) =>
              this.expandSegmentAgainstRoute(e, t, i, a, r, s, o).pipe(
                ii((c) => {
                  if (c instanceof Po) return P(null);
                  throw c;
                })
              )
            ),
            us((a) => !!a),
            ii((a, l) => {
              if (a instanceof Ol || "EmptyError" === a.name) {
                if (uw(t, r, s)) return P(new te([], {}));
                throw new Po(t);
              }
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(e, t, i, r, s, o, a) {
          return cw(r, t, s, o)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(e, t, r, s, o)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(e, t, i, r, s, o)
              : Wl(t)
            : Wl(t);
        }
        expandSegmentAgainstRouteUsingRedirect(e, t, i, r, s, o) {
          return "**" === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(e, i, r, o)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                e,
                t,
                i,
                r,
                s,
                o
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(e, t, i, r) {
          const s = this.applyRedirectCommands([], i.redirectTo, {});
          return i.redirectTo.startsWith("/")
            ? hw(s)
            : this.lineralizeSegments(i, s).pipe(
                $e((o) => {
                  const a = new te(o, {});
                  return this.expandSegment(e, a, t, o, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(e, t, i, r, s, o) {
          const {
            matched: a,
            consumedSegments: l,
            lastChild: c,
            positionalParamSegments: u,
          } = $l(t, r, s);
          if (!a) return Wl(t);
          const d = this.applyRedirectCommands(l, r.redirectTo, u);
          return r.redirectTo.startsWith("/")
            ? hw(d)
            : this.lineralizeSegments(r, d).pipe(
                $e((h) =>
                  this.expandSegment(e, t, i, h.concat(s.slice(c)), o, !1)
                )
              );
        }
        matchSegmentAgainstRoute(e, t, i, r, s) {
          if ("**" === i.path)
            return i.loadChildren
              ? (i._loadedConfig
                  ? P(i._loadedConfig)
                  : this.configLoader.load(e.injector, i)
                ).pipe(q((h) => ((i._loadedConfig = h), new te(r, {}))))
              : P(new te(r, {}));
          const { matched: o, consumedSegments: a, lastChild: l } = $l(t, i, r);
          if (!o) return Wl(t);
          const c = r.slice(l);
          return this.getChildConfig(e, i, r).pipe(
            $e((d) => {
              const h = d.module,
                f = d.routes,
                { segmentGroup: p, slicedSegments: _ } = zl(t, a, c, f),
                b = new te(p.segments, p.children);
              if (0 === _.length && b.hasChildren())
                return this.expandChildren(h, f, b).pipe(
                  q((T) => new te(a, T))
                );
              if (0 === f.length && 0 === _.length) return P(new te(a, {}));
              const w = rn(i) === s;
              return this.expandSegment(h, b, f, _, w ? Z : s, !0).pipe(
                q((M) => new te(a.concat(M.segments), M.children))
              );
            })
          );
        }
        getChildConfig(e, t, i) {
          return t.children
            ? P(new rf(t.children, e))
            : t.loadChildren
            ? void 0 !== t._loadedConfig
              ? P(t._loadedConfig)
              : this.runCanLoadGuards(e.injector, t, i).pipe(
                  $e((r) =>
                    r
                      ? this.configLoader
                          .load(e.injector, t)
                          .pipe(q((s) => ((t._loadedConfig = s), s)))
                      : (function VN(n) {
                          return new he((e) =>
                            e.error(
                              qh(
                                `Cannot load children because the guard of the route "path: '${n.path}'" returned false`
                              )
                            )
                          );
                        })(t)
                  )
                )
            : P(new rf([], e));
        }
        runCanLoadGuards(e, t, i) {
          const r = t.canLoad;
          return r && 0 !== r.length
            ? P(
                r.map((o) => {
                  const a = e.get(o);
                  let l;
                  if (
                    (function MN(n) {
                      return n && Ci(n.canLoad);
                    })(a)
                  )
                    l = a.canLoad(t, i);
                  else {
                    if (!Ci(a)) throw new Error("Invalid CanLoad guard");
                    l = a(t, i);
                  }
                  return Bn(l);
                })
              ).pipe(
                Oo(),
                et((o) => {
                  if (!tr(o)) return;
                  const a = qh(
                    `Redirecting to "${this.urlSerializer.serialize(o)}"`
                  );
                  throw ((a.url = o), a);
                }),
                q((o) => !0 === o)
              )
            : P(!0);
        }
        lineralizeSegments(e, t) {
          let i = [],
            r = t.root;
          for (;;) {
            if (((i = i.concat(r.segments)), 0 === r.numberOfChildren))
              return P(i);
            if (r.numberOfChildren > 1 || !r.children[Z])
              return LN(e.redirectTo);
            r = r.children[Z];
          }
        }
        applyRedirectCommands(e, t, i) {
          return this.applyRedirectCreatreUrlTree(
            t,
            this.urlSerializer.parse(t),
            e,
            i
          );
        }
        applyRedirectCreatreUrlTree(e, t, i, r) {
          const s = this.createSegmentGroup(e, t.root, i, r);
          return new Ji(
            s,
            this.createQueryParams(t.queryParams, this.urlTree.queryParams),
            t.fragment
          );
        }
        createQueryParams(e, t) {
          const i = {};
          return (
            tt(e, (r, s) => {
              if ("string" == typeof r && r.startsWith(":")) {
                const a = r.substring(1);
                i[s] = t[a];
              } else i[s] = r;
            }),
            i
          );
        }
        createSegmentGroup(e, t, i, r) {
          const s = this.createSegments(e, t.segments, i, r);
          let o = {};
          return (
            tt(t.children, (a, l) => {
              o[l] = this.createSegmentGroup(e, a, i, r);
            }),
            new te(s, o)
          );
        }
        createSegments(e, t, i, r) {
          return t.map((s) =>
            s.path.startsWith(":")
              ? this.findPosParam(e, s, r)
              : this.findOrReturn(s, i)
          );
        }
        findPosParam(e, t, i) {
          const r = i[t.path.substring(1)];
          if (!r)
            throw new Error(
              `Cannot redirect to '${e}'. Cannot find '${t.path}'.`
            );
          return r;
        }
        findOrReturn(e, t) {
          let i = 0;
          for (const r of t) {
            if (r.path === e.path) return t.splice(i), r;
            i++;
          }
          return e;
        }
      }
      function lf(n) {
        const e = {};
        for (const i of Object.keys(n.children)) {
          const s = lf(n.children[i]);
          (s.segments.length > 0 || s.hasChildren()) && (e[i] = s);
        }
        return (function HN(n) {
          if (1 === n.numberOfChildren && n.children[Z]) {
            const e = n.children[Z];
            return new te(n.segments.concat(e.segments), e.children);
          }
          return n;
        })(new te(n.segments, e));
      }
      class fw {
        constructor(e) {
          (this.path = e), (this.route = this.path[this.path.length - 1]);
        }
      }
      class ql {
        constructor(e, t) {
          (this.component = e), (this.route = t);
        }
      }
      function $N(n, e, t) {
        const i = n._root;
        return No(i, e ? e._root : null, t, [i.value]);
      }
      function Kl(n, e, t) {
        const i = (function GN(n) {
          if (!n) return null;
          for (let e = n.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig;
          }
          return null;
        })(e);
        return (i ? i.module.injector : t).get(n);
      }
      function No(
        n,
        e,
        t,
        i,
        r = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const s = hs(e);
        return (
          n.children.forEach((o) => {
            (function WN(
              n,
              e,
              t,
              i,
              r = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const s = n.value,
                o = e ? e.value : null,
                a = t ? t.getContext(n.value.outlet) : null;
              if (o && s.routeConfig === o.routeConfig) {
                const l = (function qN(n, e, t) {
                  if ("function" == typeof t) return t(n, e);
                  switch (t) {
                    case "pathParamsChange":
                      return !er(n.url, e.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !er(n.url, e.url) || !Vn(n.queryParams, e.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Jh(n, e) || !Vn(n.queryParams, e.queryParams);
                    default:
                      return !Jh(n, e);
                  }
                })(o, s, s.routeConfig.runGuardsAndResolvers);
                l
                  ? r.canActivateChecks.push(new fw(i))
                  : ((s.data = o.data), (s._resolvedData = o._resolvedData)),
                  No(n, e, s.component ? (a ? a.children : null) : t, i, r),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    r.canDeactivateChecks.push(new ql(a.outlet.component, o));
              } else
                o && Lo(e, a, r),
                  r.canActivateChecks.push(new fw(i)),
                  No(n, null, s.component ? (a ? a.children : null) : t, i, r);
            })(o, s[o.value.outlet], t, i.concat([o.value]), r),
              delete s[o.value.outlet];
          }),
          tt(s, (o, a) => Lo(o, t.getContext(a), r)),
          r
        );
      }
      function Lo(n, e, t) {
        const i = hs(n),
          r = n.value;
        tt(i, (s, o) => {
          Lo(s, r.component ? (e ? e.children.getContext(o) : null) : e, t);
        }),
          t.canDeactivateChecks.push(
            new ql(
              r.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              r
            )
          );
      }
      class nL {}
      function pw(n) {
        return new he((e) => e.error(n));
      }
      class rL {
        constructor(e, t, i, r, s, o) {
          (this.rootComponentType = e),
            (this.config = t),
            (this.urlTree = i),
            (this.url = r),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = o);
        }
        recognize() {
          const e = zl(
              this.urlTree.root,
              [],
              [],
              this.config.filter((o) => void 0 === o.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            t = this.processSegmentGroup(this.config, e, Z);
          if (null === t) return null;
          const i = new jl(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              Z,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            r = new si(i, t),
            s = new XC(this.url, r);
          return this.inheritParamsAndData(s._root), s;
        }
        inheritParamsAndData(e) {
          const t = e.value,
            i = ZC(t, this.paramsInheritanceStrategy);
          (t.params = Object.freeze(i.params)),
            (t.data = Object.freeze(i.data)),
            e.children.forEach((r) => this.inheritParamsAndData(r));
        }
        processSegmentGroup(e, t, i) {
          return 0 === t.segments.length && t.hasChildren()
            ? this.processChildren(e, t)
            : this.processSegment(e, t, t.segments, i);
        }
        processChildren(e, t) {
          const i = [];
          for (const s of Object.keys(t.children)) {
            const o = t.children[s],
              a = aw(e, s),
              l = this.processSegmentGroup(a, o, s);
            if (null === l) return null;
            i.push(...l);
          }
          const r = mw(i);
          return (
            (function sL(n) {
              n.sort((e, t) =>
                e.value.outlet === Z
                  ? -1
                  : t.value.outlet === Z
                  ? 1
                  : e.value.outlet.localeCompare(t.value.outlet)
              );
            })(r),
            r
          );
        }
        processSegment(e, t, i, r) {
          for (const s of e) {
            const o = this.processSegmentAgainstRoute(s, t, i, r);
            if (null !== o) return o;
          }
          return uw(t, i, r) ? [] : null;
        }
        processSegmentAgainstRoute(e, t, i, r) {
          if (e.redirectTo || !cw(e, t, i, r)) return null;
          let s,
            o = [],
            a = [];
          if ("**" === e.path) {
            const f = i.length > 0 ? LC(i).parameters : {};
            s = new jl(
              i,
              f,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              yw(e),
              rn(e),
              e.component,
              e,
              gw(t),
              _w(t) + i.length,
              vw(e)
            );
          } else {
            const f = $l(t, e, i);
            if (!f.matched) return null;
            (o = f.consumedSegments),
              (a = i.slice(f.lastChild)),
              (s = new jl(
                o,
                f.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                yw(e),
                rn(e),
                e.component,
                e,
                gw(t),
                _w(t) + o.length,
                vw(e)
              ));
          }
          const l = (function oL(n) {
              return n.children
                ? n.children
                : n.loadChildren
                ? n._loadedConfig.routes
                : [];
            })(e),
            { segmentGroup: c, slicedSegments: u } = zl(
              t,
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
          const d = rn(e) === r,
            h = this.processSegment(l, c, u, d ? Z : r);
          return null === h ? null : [new si(s, h)];
        }
      }
      function aL(n) {
        const e = n.value.routeConfig;
        return e && "" === e.path && void 0 === e.redirectTo;
      }
      function mw(n) {
        const e = [],
          t = new Set();
        for (const i of n) {
          if (!aL(i)) {
            e.push(i);
            continue;
          }
          const r = e.find((s) => i.value.routeConfig === s.value.routeConfig);
          void 0 !== r ? (r.children.push(...i.children), t.add(r)) : e.push(i);
        }
        for (const i of t) {
          const r = mw(i.children);
          e.push(new si(i.value, r));
        }
        return e.filter((i) => !t.has(i));
      }
      function gw(n) {
        let e = n;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function _w(n) {
        let e = n,
          t = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (t += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return t - 1;
      }
      function yw(n) {
        return n.data || {};
      }
      function vw(n) {
        return n.resolve || {};
      }
      function cf(n) {
        return Zi((e) => {
          const t = n(e);
          return t ? Ye(t).pipe(q(() => e)) : P(e);
        });
      }
      class mL extends class pL {
        shouldDetach(e) {
          return !1;
        }
        store(e, t) {}
        shouldAttach(e) {
          return !1;
        }
        retrieve(e) {
          return null;
        }
        shouldReuseRoute(e, t) {
          return e.routeConfig === t.routeConfig;
        }
      } {}
      const uf = new A("ROUTES");
      class bw {
        constructor(e, t, i, r) {
          (this.injector = e),
            (this.compiler = t),
            (this.onLoadStartListener = i),
            (this.onLoadEndListener = r);
        }
        load(e, t) {
          if (t._loader$) return t._loader$;
          this.onLoadStartListener && this.onLoadStartListener(t);
          const r = this.loadModuleFactory(t.loadChildren).pipe(
            q((s) => {
              this.onLoadEndListener && this.onLoadEndListener(t);
              const o = s.create(e);
              return new rf(
                NC(o.injector.get(uf, void 0, j.Self | j.Optional)).map(af),
                o
              );
            }),
            ii((s) => {
              throw ((t._loader$ = void 0), s);
            })
          );
          return (t._loader$ = new T1(r, () => new X()).pipe(MC())), t._loader$;
        }
        loadModuleFactory(e) {
          return Bn(e()).pipe(
            $e((t) =>
              t instanceof Pv ? P(t) : Ye(this.compiler.compileModuleAsync(t))
            )
          );
        }
      }
      class _L {
        shouldProcessUrl(e) {
          return !0;
        }
        extract(e) {
          return e;
        }
        merge(e, t) {
          return e;
        }
      }
      function yL(n) {
        throw n;
      }
      function vL(n, e, t) {
        return e.parse("/");
      }
      function Cw(n, e) {
        return P(null);
      }
      const bL = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        CL = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let Vt = (() => {
        class n {
          constructor(t, i, r, s, o, a, l) {
            (this.rootComponentType = t),
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
              (this.events = new X()),
              (this.errorHandler = yL),
              (this.malformedUriErrorHandler = vL),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: Cw,
                afterPreactivation: Cw,
              }),
              (this.urlHandlingStrategy = new _L()),
              (this.routeReuseStrategy = new mL()),
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
              (this.currentUrlTree = (function q1() {
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
              (this.transitions = new nn({
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
            var t;
            return null === (t = this.location.getState()) || void 0 === t
              ? void 0
              : t.ɵrouterPageId;
          }
          setupNavigations(t) {
            const i = this.events;
            return t.pipe(
              Oe((r) => 0 !== r.id),
              q((r) =>
                Object.assign(Object.assign({}, r), {
                  extractedUrl: this.urlHandlingStrategy.extract(r.rawUrl),
                })
              ),
              Zi((r) => {
                let s = !1,
                  o = !1;
                return P(r).pipe(
                  et((a) => {
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
                        Ql(a.source) && (this.browserUrlTree = a.extractedUrl),
                        P(a).pipe(
                          Zi((d) => {
                            const h = this.transitions.getValue();
                            return (
                              i.next(
                                new Wh(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              h !== this.transitions.getValue()
                                ? En
                                : Promise.resolve(d)
                            );
                          }),
                          (function UN(n, e, t, i) {
                            return Zi((r) =>
                              (function BN(n, e, t, i, r) {
                                return new jN(n, e, t, i, r).apply();
                              })(n, e, t, r.extractedUrl, i).pipe(
                                q((s) =>
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
                          et((d) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: d.urlAfterRedirects }
                            );
                          }),
                          (function lL(n, e, t, i, r) {
                            return $e((s) =>
                              (function iL(
                                n,
                                e,
                                t,
                                i,
                                r = "emptyOnly",
                                s = "legacy"
                              ) {
                                try {
                                  const o = new rL(
                                    n,
                                    e,
                                    t,
                                    i,
                                    r,
                                    s
                                  ).recognize();
                                  return null === o ? pw(new nL()) : P(o);
                                } catch (o) {
                                  return pw(o);
                                }
                              })(
                                n,
                                e,
                                s.urlAfterRedirects,
                                t(s.urlAfterRedirects),
                                i,
                                r
                              ).pipe(
                                q((o) =>
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
                          et((d) => {
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
                            const h = new F1(
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
                          restoredState: _,
                          extras: b,
                        } = a,
                        w = new Wh(h, this.serializeUrl(f), p, _);
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
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), En;
                  }),
                  cf((a) => {
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
                  et((a) => {
                    const l = new P1(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(l);
                  }),
                  q((a) =>
                    Object.assign(Object.assign({}, a), {
                      guards: $N(
                        a.targetSnapshot,
                        a.currentSnapshot,
                        this.rootContexts
                      ),
                    })
                  ),
                  (function KN(n, e) {
                    return $e((t) => {
                      const {
                        targetSnapshot: i,
                        currentSnapshot: r,
                        guards: {
                          canActivateChecks: s,
                          canDeactivateChecks: o,
                        },
                      } = t;
                      return 0 === o.length && 0 === s.length
                        ? P(
                            Object.assign(Object.assign({}, t), {
                              guardsResult: !0,
                            })
                          )
                        : (function QN(n, e, t, i) {
                            return Ye(n).pipe(
                              $e((r) =>
                                (function tL(n, e, t, i, r) {
                                  const s =
                                    e && e.routeConfig
                                      ? e.routeConfig.canDeactivate
                                      : null;
                                  return s && 0 !== s.length
                                    ? P(
                                        s.map((a) => {
                                          const l = Kl(a, e, r);
                                          let c;
                                          if (
                                            (function AN(n) {
                                              return n && Ci(n.canDeactivate);
                                            })(l)
                                          )
                                            c = Bn(l.canDeactivate(n, e, t, i));
                                          else {
                                            if (!Ci(l))
                                              throw new Error(
                                                "Invalid CanDeactivate guard"
                                              );
                                            c = Bn(l(n, e, t, i));
                                          }
                                          return c.pipe(us());
                                        })
                                      ).pipe(Oo())
                                    : P(!0);
                                })(r.component, r.route, t, e, i)
                              ),
                              us((r) => !0 !== r, !0)
                            );
                          })(o, i, r, n).pipe(
                            $e((a) =>
                              a &&
                              (function EN(n) {
                                return "boolean" == typeof n;
                              })(a)
                                ? (function YN(n, e, t, i) {
                                    return Ye(e).pipe(
                                      cs((r) =>
                                        Fl(
                                          (function XN(n, e) {
                                            return (
                                              null !== n && e && e(new B1(n)),
                                              P(!0)
                                            );
                                          })(r.route.parent, i),
                                          (function ZN(n, e) {
                                            return (
                                              null !== n && e && e(new H1(n)),
                                              P(!0)
                                            );
                                          })(r.route, i),
                                          (function eL(n, e, t) {
                                            const i = e[e.length - 1],
                                              s = e
                                                .slice(0, e.length - 1)
                                                .reverse()
                                                .map((o) =>
                                                  (function zN(n) {
                                                    const e = n.routeConfig
                                                      ? n.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return e && 0 !== e.length
                                                      ? { node: n, guards: e }
                                                      : null;
                                                  })(o)
                                                )
                                                .filter((o) => null !== o)
                                                .map((o) =>
                                                  zh(() =>
                                                    P(
                                                      o.guards.map((l) => {
                                                        const c = Kl(
                                                          l,
                                                          o.node,
                                                          t
                                                        );
                                                        let u;
                                                        if (
                                                          (function xN(n) {
                                                            return (
                                                              n &&
                                                              Ci(
                                                                n.canActivateChild
                                                              )
                                                            );
                                                          })(c)
                                                        )
                                                          u = Bn(
                                                            c.canActivateChild(
                                                              i,
                                                              n
                                                            )
                                                          );
                                                        else {
                                                          if (!Ci(c))
                                                            throw new Error(
                                                              "Invalid CanActivateChild guard"
                                                            );
                                                          u = Bn(c(i, n));
                                                        }
                                                        return u.pipe(us());
                                                      })
                                                    ).pipe(Oo())
                                                  )
                                                );
                                            return P(s).pipe(Oo());
                                          })(n, r.path, t),
                                          (function JN(n, e, t) {
                                            const i = e.routeConfig
                                              ? e.routeConfig.canActivate
                                              : null;
                                            if (!i || 0 === i.length)
                                              return P(!0);
                                            const r = i.map((s) =>
                                              zh(() => {
                                                const o = Kl(s, e, t);
                                                let a;
                                                if (
                                                  (function SN(n) {
                                                    return (
                                                      n && Ci(n.canActivate)
                                                    );
                                                  })(o)
                                                )
                                                  a = Bn(o.canActivate(e, n));
                                                else {
                                                  if (!Ci(o))
                                                    throw new Error(
                                                      "Invalid CanActivate guard"
                                                    );
                                                  a = Bn(o(e, n));
                                                }
                                                return a.pipe(us());
                                              })
                                            );
                                            return P(r).pipe(Oo());
                                          })(n, r.route, t)
                                        )
                                      ),
                                      us((r) => !0 !== r, !0)
                                    );
                                  })(i, s, n, e)
                                : P(a)
                            ),
                            q((a) =>
                              Object.assign(Object.assign({}, t), {
                                guardsResult: a,
                              })
                            )
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  et((a) => {
                    if (tr(a.guardsResult)) {
                      const c = qh(
                        `Redirecting to "${this.serializeUrl(a.guardsResult)}"`
                      );
                      throw ((c.url = a.guardsResult), c);
                    }
                    const l = new N1(
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
                  cf((a) => {
                    if (a.guards.canActivateChecks.length)
                      return P(a).pipe(
                        et((l) => {
                          const c = new L1(
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
                            (function cL(n, e) {
                              return $e((t) => {
                                const {
                                  targetSnapshot: i,
                                  guards: { canActivateChecks: r },
                                } = t;
                                if (!r.length) return P(t);
                                let s = 0;
                                return Ye(r).pipe(
                                  cs((o) =>
                                    (function uL(n, e, t, i) {
                                      return (function dL(n, e, t, i) {
                                        const r = Object.keys(n);
                                        if (0 === r.length) return P({});
                                        const s = {};
                                        return Ye(r).pipe(
                                          $e((o) =>
                                            (function hL(n, e, t, i) {
                                              const r = Kl(n, e, i);
                                              return Bn(
                                                r.resolve
                                                  ? r.resolve(e, t)
                                                  : r(e, t)
                                              );
                                            })(n[o], e, t, i).pipe(
                                              et((a) => {
                                                s[o] = a;
                                              })
                                            )
                                          ),
                                          Gh(1),
                                          $e(() =>
                                            Object.keys(s).length === r.length
                                              ? P(s)
                                              : En
                                          )
                                        );
                                      })(n._resolve, n, e, i).pipe(
                                        q(
                                          (s) => (
                                            (n._resolvedData = s),
                                            (n.data = Object.assign(
                                              Object.assign({}, n.data),
                                              ZC(n, t).resolve
                                            )),
                                            null
                                          )
                                        )
                                      );
                                    })(o.route, i, n, e)
                                  ),
                                  et(() => s++),
                                  Gh(1),
                                  $e((o) => (s === r.length ? P(t) : En))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            et({
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
                        et((l) => {
                          const c = new V1(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(c);
                        })
                      );
                  }),
                  cf((a) => {
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
                  q((a) => {
                    const l = (function dN(n, e, t) {
                      const i = Io(n, e._root, t ? t._root : void 0);
                      return new QC(i, e);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return Object.assign(Object.assign({}, a), {
                      targetRouterState: l,
                    });
                  }),
                  et((a) => {
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
                  ((n, e, t) =>
                    q(
                      (i) => (
                        new wN(
                          e,
                          i.targetRouterState,
                          i.currentRouterState,
                          t
                        ).activate(n),
                        i
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  et({
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
                      (function z1(n) {
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
                                    Ql(r.source),
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
                      const l = new O1(
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
                    return En;
                  })
                );
              })
            );
          }
          resetRootComponentType(t) {
            (this.rootComponentType = t),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(t) {
            this.transitions.next(
              Object.assign(Object.assign({}, this.transitions.value), t)
            );
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((t) => {
                const i = "popstate" === t.type ? "popstate" : "hashchange";
                "popstate" === i &&
                  setTimeout(() => {
                    var r;
                    const s = { replaceUrl: !0 },
                      o = (
                        null === (r = t.state) || void 0 === r
                          ? void 0
                          : r.navigationId
                      )
                        ? t.state
                        : null;
                    if (o) {
                      const l = Object.assign({}, o);
                      delete l.navigationId,
                        delete l.ɵrouterPageId,
                        0 !== Object.keys(l).length && (s.state = l);
                    }
                    const a = this.parseUrl(t.url);
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
          triggerEvent(t) {
            this.events.next(t);
          }
          resetConfig(t) {
            ow(t),
              (this.config = t.map(af)),
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
          createUrlTree(t, i = {}) {
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
              (function pN(n, e, t, i, r) {
                if (0 === t.length) return ef(e.root, e.root, e, i, r);
                const s = (function mN(n) {
                  if ("string" == typeof n[0] && 1 === n.length && "/" === n[0])
                    return new tw(!0, 0, n);
                  let e = 0,
                    t = !1;
                  const i = n.reduce((r, s, o) => {
                    if ("object" == typeof s && null != s) {
                      if (s.outlets) {
                        const a = {};
                        return (
                          tt(s.outlets, (l, c) => {
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
                              ? (t = !0)
                              : ".." === a
                              ? e++
                              : "" != a && r.push(a));
                        }),
                        r)
                      : [...r, s];
                  }, []);
                  return new tw(t, e, i);
                })(t);
                if (s.toRoot()) return ef(e.root, new te([], {}), e, i, r);
                const o = (function gN(n, e, t) {
                    if (n.isAbsolute) return new tf(e.root, !0, 0);
                    if (-1 === t.snapshot._lastPathIndex) {
                      const s = t.snapshot._urlSegment;
                      return new tf(s, s === e.root, 0);
                    }
                    const i = Hl(n.commands[0]) ? 0 : 1;
                    return (function _N(n, e, t) {
                      let i = n,
                        r = e,
                        s = t;
                      for (; s > r; ) {
                        if (((s -= r), (i = i.parent), !i))
                          throw new Error("Invalid number of '../'");
                        r = i.segments.length;
                      }
                      return new tf(i, !1, r - s);
                    })(
                      t.snapshot._urlSegment,
                      t.snapshot._lastPathIndex + i,
                      n.numberOfDoubleDots
                    );
                  })(s, e, n),
                  a = o.processChildren
                    ? Ul(o.segmentGroup, o.index, s.commands)
                    : nw(o.segmentGroup, o.index, s.commands);
                return ef(o.segmentGroup, a, e, i, r);
              })(c, this.currentUrlTree, t, d, null != u ? u : null)
            );
          }
          navigateByUrl(t, i = { skipLocationChange: !1 }) {
            const r = tr(t) ? t : this.parseUrl(t),
              s = this.urlHandlingStrategy.merge(r, this.rawUrlTree);
            return this.scheduleNavigation(s, "imperative", null, i);
          }
          navigate(t, i = { skipLocationChange: !1 }) {
            return (
              (function wL(n) {
                for (let e = 0; e < n.length; e++) {
                  const t = n[e];
                  if (null == t)
                    throw new Error(
                      `The requested path contains ${t} segment at index ${e}`
                    );
                }
              })(t),
              this.navigateByUrl(this.createUrlTree(t, i), i)
            );
          }
          serializeUrl(t) {
            return this.urlSerializer.serialize(t);
          }
          parseUrl(t) {
            let i;
            try {
              i = this.urlSerializer.parse(t);
            } catch (r) {
              i = this.malformedUriErrorHandler(r, this.urlSerializer, t);
            }
            return i;
          }
          isActive(t, i) {
            let r;
            if (
              ((r =
                !0 === i
                  ? Object.assign({}, bL)
                  : !1 === i
                  ? Object.assign({}, CL)
                  : i),
              tr(t))
            )
              return BC(this.currentUrlTree, t, r);
            const s = this.parseUrl(t);
            return BC(this.currentUrlTree, s, r);
          }
          removeEmptyProps(t) {
            return Object.keys(t).reduce((i, r) => {
              const s = t[r];
              return null != s && (i[r] = s), i;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (t) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = t.id),
                  (this.currentPageId = t.targetPageId),
                  this.events.next(
                    new xo(
                      t.id,
                      this.serializeUrl(t.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  t.resolve(!0);
              },
              (t) => {
                this.console.warn(`Unhandled Navigation Error: ${t}`);
              }
            );
          }
          scheduleNavigation(t, i, r, s, o) {
            var a, l, c;
            if (this.disposed) return Promise.resolve(!1);
            const u = this.transitions.value,
              d = Ql(i) && u && !Ql(u.source),
              h = u.rawUrl.toString() === t.toString(),
              f =
                u.id ===
                (null === (a = this.currentNavigation) || void 0 === a
                  ? void 0
                  : a.id);
            if (d && h && f) return Promise.resolve(!0);
            let _, b, w;
            o
              ? ((_ = o.resolve), (b = o.reject), (w = o.promise))
              : (w = new Promise((T, $) => {
                  (_ = T), (b = $);
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
                rawUrl: t,
                extras: s,
                resolve: _,
                reject: b,
                promise: w,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              w.catch((T) => Promise.reject(T))
            );
          }
          setBrowserUrl(t, i) {
            const r = this.urlSerializer.serialize(t),
              s = Object.assign(
                Object.assign({}, i.extras.state),
                this.generateNgRouterState(i.id, i.targetPageId)
              );
            this.location.isCurrentPathEqualTo(r) || i.extras.replaceUrl
              ? this.location.replaceState(r, "", s)
              : this.location.go(r, "", s);
          }
          restoreHistory(t, i = !1) {
            var r, s;
            if ("computed" === this.canceledNavigationResolution) {
              const o = this.currentPageId - t.targetPageId;
              ("popstate" !== t.source &&
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
                  (this.resetState(t),
                  (this.browserUrlTree = t.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(o);
            } else
              "replace" === this.canceledNavigationResolution &&
                (i && this.resetState(t), this.resetUrlToCurrentUrlTree());
          }
          resetState(t) {
            (this.routerState = t.currentRouterState),
              (this.currentUrlTree = t.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                t.rawUrl
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
          cancelNavigationTransition(t, i) {
            const r = new IC(t.id, this.serializeUrl(t.extractedUrl), i);
            this.triggerEvent(r), t.resolve(!1);
          }
          generateNgRouterState(t, i) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: t, ɵrouterPageId: i }
              : { navigationId: t };
          }
        }
        return (
          (n.ɵfac = function (t) {
            Za();
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function Ql(n) {
        return "imperative" !== n;
      }
      let Yl = (() => {
        class n {
          constructor(t, i, r) {
            (this.router = t),
              (this.route = i),
              (this.locationStrategy = r),
              (this.commands = null),
              (this.href = null),
              (this.onChanges = new X()),
              (this.subscription = t.events.subscribe((s) => {
                s instanceof xo && this.updateTargetUrlAndHref();
              }));
          }
          set routerLink(t) {
            this.commands = null != t ? (Array.isArray(t) ? t : [t]) : null;
          }
          ngOnChanges(t) {
            this.updateTargetUrlAndHref(), this.onChanges.next(this);
          }
          ngOnDestroy() {
            this.subscription.unsubscribe();
          }
          onClick(t, i, r, s, o) {
            if (
              0 !== t ||
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
          (n.ɵfac = function (t) {
            return new (t || n)(y(Vt), y(fs), y(ls));
          }),
          (n.ɵdir = k({
            type: n,
            selectors: [
              ["a", "routerLink", ""],
              ["area", "routerLink", ""],
            ],
            hostVars: 2,
            hostBindings: function (t, i) {
              1 & t &&
                ye("click", function (s) {
                  return i.onClick(
                    s.button,
                    s.ctrlKey,
                    s.shiftKey,
                    s.altKey,
                    s.metaKey
                  );
                }),
                2 & t && qe("target", i.target)("href", i.href, Vu);
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
            features: [st],
          })),
          n
        );
      })();
      function ps(n) {
        return "" === n || !!n;
      }
      class ww {}
      class Dw {
        preload(e, t) {
          return P(null);
        }
      }
      let Ew = (() => {
          class n {
            constructor(t, i, r, s) {
              (this.router = t),
                (this.injector = r),
                (this.preloadingStrategy = s),
                (this.loader = new bw(
                  r,
                  i,
                  (l) => t.triggerEvent(new RC(l)),
                  (l) => t.triggerEvent(new kC(l))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Oe((t) => t instanceof xo),
                  cs(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const t = this.injector.get(Jn);
              return this.processRoutes(t, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(t, i) {
              const r = [];
              for (const s of i)
                if (s.loadChildren && !s.canLoad && s._loadedConfig) {
                  const o = s._loadedConfig;
                  r.push(this.processRoutes(o.module, o.routes));
                } else
                  s.loadChildren && !s.canLoad
                    ? r.push(this.preloadConfig(t, s))
                    : s.children && r.push(this.processRoutes(t, s.children));
              return Ye(r).pipe(
                Rs(),
                q((s) => {})
              );
            }
            preloadConfig(t, i) {
              return this.preloadingStrategy.preload(i, () =>
                (i._loadedConfig
                  ? P(i._loadedConfig)
                  : this.loader.load(t.injector, i)
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
            (n.ɵfac = function (t) {
              return new (t || n)(C(Vt), C(pl), C(we), C(ww));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        hf = (() => {
          class n {
            constructor(t, i, r = {}) {
              (this.router = t),
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
              return this.router.events.subscribe((t) => {
                t instanceof Wh
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState
                      ? t.restoredState.navigationId
                      : 0))
                  : t instanceof xo &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(
                      t,
                      this.router.parseUrl(t.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof OC &&
                  (t.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(t, i) {
              this.router.triggerEvent(
                new OC(
                  t,
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
            (n.ɵfac = function (t) {
              Za();
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      const nr = new A("ROUTER_CONFIGURATION"),
        Mw = new A("ROUTER_FORROOT_GUARD"),
        SL = [
          Co,
          { provide: $C, useClass: zC },
          {
            provide: Vt,
            useFactory: function RL(n, e, t, i, r, s, o = {}, a, l) {
              const c = new Vt(null, n, e, t, i, r, NC(s));
              return (
                a && (c.urlHandlingStrategy = a),
                l && (c.routeReuseStrategy = l),
                (function kL(n, e) {
                  n.errorHandler && (e.errorHandler = n.errorHandler),
                    n.malformedUriErrorHandler &&
                      (e.malformedUriErrorHandler = n.malformedUriErrorHandler),
                    n.onSameUrlNavigation &&
                      (e.onSameUrlNavigation = n.onSameUrlNavigation),
                    n.paramsInheritanceStrategy &&
                      (e.paramsInheritanceStrategy =
                        n.paramsInheritanceStrategy),
                    n.relativeLinkResolution &&
                      (e.relativeLinkResolution = n.relativeLinkResolution),
                    n.urlUpdateStrategy &&
                      (e.urlUpdateStrategy = n.urlUpdateStrategy),
                    n.canceledNavigationResolution &&
                      (e.canceledNavigationResolution =
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
              we,
              pl,
              uf,
              nr,
              [class gL {}, new Ot()],
              [class fL {}, new Ot()],
            ],
          },
          Fo,
          {
            provide: fs,
            useFactory: function OL(n) {
              return n.routerState.root;
            },
            deps: [Vt],
          },
          Ew,
          Dw,
          class ML {
            preload(e, t) {
              return t().pipe(ii(() => P(null)));
            }
          },
          { provide: nr, useValue: { enableTracing: !1 } },
        ];
      function xL() {
        return new wb("Router", Vt);
      }
      let Sw = (() => {
        class n {
          constructor(t, i) {}
          static forRoot(t, i) {
            return {
              ngModule: n,
              providers: [
                SL,
                xw(t),
                {
                  provide: Mw,
                  useFactory: IL,
                  deps: [[Vt, new Ot(), new $i()]],
                },
                { provide: nr, useValue: i || {} },
                {
                  provide: ls,
                  useFactory: TL,
                  deps: [Yi, [new Ks(Dh), new Ot()], nr],
                },
                { provide: hf, useFactory: AL, deps: [Vt, PP, nr] },
                {
                  provide: ww,
                  useExisting:
                    i && i.preloadingStrategy ? i.preloadingStrategy : Dw,
                },
                { provide: wb, multi: !0, useFactory: xL },
                [
                  ff,
                  { provide: hl, multi: !0, useFactory: FL, deps: [ff] },
                  { provide: Aw, useFactory: PL, deps: [ff] },
                  { provide: mb, multi: !0, useExisting: Aw },
                ],
              ],
            };
          }
          static forChild(t) {
            return { ngModule: n, providers: [xw(t)] };
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Mw, 8), C(Vt, 8));
          }),
          (n.ɵmod = ue({ type: n })),
          (n.ɵinj = le({})),
          n
        );
      })();
      function AL(n, e, t) {
        return t.scrollOffset && e.setOffset(t.scrollOffset), new hf(n, e, t);
      }
      function TL(n, e, t = {}) {
        return t.useHash ? new mF(n, e) : new zb(n, e);
      }
      function IL(n) {
        return "guarded";
      }
      function xw(n) {
        return [
          { provide: HS, multi: !0, useValue: n },
          { provide: uf, multi: !0, useValue: n },
        ];
      }
      let ff = (() => {
        class n {
          constructor(t) {
            (this.injector = t),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new X());
          }
          appInitializer() {
            return this.injector.get(hF, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0);
              let i = null;
              const r = new Promise((a) => (i = a)),
                s = this.injector.get(Vt),
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
          bootstrapListener(t) {
            const i = this.injector.get(nr),
              r = this.injector.get(Ew),
              s = this.injector.get(hf),
              o = this.injector.get(Vt),
              a = this.injector.get(os);
            t === a.components[0] &&
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
          (n.ɵfac = function (t) {
            return new (t || n)(C(we));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      function FL(n) {
        return n.appInitializer.bind(n);
      }
      function PL(n) {
        return n.bootstrapListener.bind(n);
      }
      const Aw = new A("Router Initializer");
      let LL = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = De({
              type: n,
              selectors: [["app-cloudage"]],
              decls: 3,
              vars: 0,
              consts: [[2, "width", "300px"]],
              template: function (t, i) {
                1 & t &&
                  (m(0, "div", 0),
                  m(1, "h5"),
                  E(
                    2,
                    " Glad to say that Experienced with CloudAge. The Best Big Data Managing Company in pune "
                  ),
                  g(),
                  g());
              },
              styles: [""],
            })),
            n
          );
        })(),
        VL = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = De({
              type: n,
              selectors: [["app-codevian"]],
              decls: 2,
              vars: 0,
              template: function (t, i) {
                1 & t && (m(0, "p"), E(1, "codevian works!"), g());
              },
              styles: [""],
            })),
            n
          );
        })(),
        BL = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = De({
              type: n,
              selectors: [["app-gpp"]],
              decls: 3,
              vars: 0,
              consts: [[2, "width", "300px"]],
              template: function (t, i) {
                1 & t &&
                  (m(0, "div", 0),
                  m(1, "h5"),
                  E(
                    2,
                    " I Have Completed Computer Science With First Class From Maharastras Best Colllge in Shivajinagar Pune "
                  ),
                  g(),
                  g());
              },
              styles: [""],
            })),
            n
          );
        })(),
        jL = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = De({
              type: n,
              selectors: [["app-igt"]],
              decls: 3,
              vars: 0,
              consts: [[2, "width", "300px", "z-index", "999"]],
              template: function (t, i) {
                1 & t &&
                  (m(0, "div", 0),
                  m(1, "h5"),
                  E(
                    2,
                    " I Have Completed Full Stack Web Development using MEAN With Distinction Class From Infinite Grafix Technology While Working With Cloudage "
                  ),
                  g(),
                  g());
              },
              styles: [""],
            })),
            n
          );
        })();
      function ct(n) {
        return null != n && "false" != `${n}`;
      }
      function Vo(n) {
        return Array.isArray(n) ? n : [n];
      }
      function Ue(n) {
        return null == n ? "" : "string" == typeof n ? n : `${n}px`;
      }
      function ms(n) {
        return n instanceof ve ? n.nativeElement : n;
      }
      const $L = ["addListener", "removeListener"],
        zL = ["addEventListener", "removeEventListener"],
        GL = ["on", "off"];
      function ir(n, e, t, i) {
        if ((se(t) && ((i = t), (t = void 0)), i))
          return ir(n, e, t).pipe($h(i));
        const [r, s] = (function KL(n) {
          return se(n.addEventListener) && se(n.removeEventListener);
        })(n)
          ? zL.map((o) => (a) => n[o](e, a, t))
          : (function WL(n) {
              return se(n.addListener) && se(n.removeListener);
            })(n)
          ? $L.map(Tw(n, e))
          : (function qL(n) {
              return se(n.on) && se(n.off);
            })(n)
          ? GL.map(Tw(n, e))
          : [];
        if (!r && Gc(n)) return $e((o) => ir(o, e, t))(xt(n));
        if (!r) throw new TypeError("Invalid event target");
        return new he((o) => {
          const a = (...l) => o.next(1 < l.length ? l : l[0]);
          return r(a), () => s(a);
        });
      }
      function Tw(n, e) {
        return (t) => (i) => n[t](e, i);
      }
      class QL extends Ve {
        constructor(e, t) {
          super();
        }
        schedule(e, t = 0) {
          return this;
        }
      }
      const Zl = {
        setInterval(...n) {
          const { delegate: e } = Zl;
          return ((null == e ? void 0 : e.setInterval) || setInterval)(...n);
        },
        clearInterval(n) {
          const { delegate: e } = Zl;
          return ((null == e ? void 0 : e.clearInterval) || clearInterval)(n);
        },
        delegate: void 0,
      };
      class pf extends QL {
        constructor(e, t) {
          super(e, t),
            (this.scheduler = e),
            (this.work = t),
            (this.pending = !1);
        }
        schedule(e, t = 0) {
          if (this.closed) return this;
          this.state = e;
          const i = this.id,
            r = this.scheduler;
          return (
            null != i && (this.id = this.recycleAsyncId(r, i, t)),
            (this.pending = !0),
            (this.delay = t),
            (this.id = this.id || this.requestAsyncId(r, this.id, t)),
            this
          );
        }
        requestAsyncId(e, t, i = 0) {
          return Zl.setInterval(e.flush.bind(e, this), i);
        }
        recycleAsyncId(e, t, i = 0) {
          if (null != i && this.delay === i && !1 === this.pending) return t;
          Zl.clearInterval(t);
        }
        execute(e, t) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const i = this._execute(e, t);
          if (i) return i;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(e, t) {
          let r,
            i = !1;
          try {
            this.work(e);
          } catch (s) {
            (i = !0),
              (r = s || new Error("Scheduled action threw falsy error"));
          }
          if (i) return this.unsubscribe(), r;
        }
        unsubscribe() {
          if (!this.closed) {
            const { id: e, scheduler: t } = this,
              { actions: i } = t;
            (this.work = this.state = this.scheduler = null),
              (this.pending = !1),
              mr(i, this),
              null != e && (this.id = this.recycleAsyncId(t, e, null)),
              (this.delay = null),
              super.unsubscribe();
          }
        }
      }
      const Bo = {
          schedule(n) {
            let e = requestAnimationFrame,
              t = cancelAnimationFrame;
            const { delegate: i } = Bo;
            i && ((e = i.requestAnimationFrame), (t = i.cancelAnimationFrame));
            const r = e((s) => {
              (t = void 0), n(s);
            });
            return new Ve(() => (null == t ? void 0 : t(r)));
          },
          requestAnimationFrame(...n) {
            const { delegate: e } = Bo;
            return (
              (null == e ? void 0 : e.requestAnimationFrame) ||
              requestAnimationFrame
            )(...n);
          },
          cancelAnimationFrame(...n) {
            const { delegate: e } = Bo;
            return (
              (null == e ? void 0 : e.cancelAnimationFrame) ||
              cancelAnimationFrame
            )(...n);
          },
          delegate: void 0,
        },
        Iw = { now: () => (Iw.delegate || Date).now(), delegate: void 0 };
      class jo {
        constructor(e, t = jo.now) {
          (this.schedulerActionCtor = e), (this.now = t);
        }
        schedule(e, t = 0, i) {
          return new this.schedulerActionCtor(this, e).schedule(i, t);
        }
      }
      jo.now = Iw.now;
      class mf extends jo {
        constructor(e, t = jo.now) {
          super(e, t),
            (this.actions = []),
            (this._active = !1),
            (this._scheduled = void 0);
        }
        flush(e) {
          const { actions: t } = this;
          if (this._active) return void t.push(e);
          let i;
          this._active = !0;
          do {
            if ((i = e.execute(e.state, e.delay))) break;
          } while ((e = t.shift()));
          if (((this._active = !1), i)) {
            for (; (e = t.shift()); ) e.unsubscribe();
            throw i;
          }
        }
      }
      new (class ZL extends mf {
        flush(e) {
          (this._active = !0), (this._scheduled = void 0);
          const { actions: t } = this;
          let i,
            r = -1;
          e = e || t.shift();
          const s = t.length;
          do {
            if ((i = e.execute(e.state, e.delay))) break;
          } while (++r < s && (e = t.shift()));
          if (((this._active = !1), i)) {
            for (; ++r < s && (e = t.shift()); ) e.unsubscribe();
            throw i;
          }
        }
      })(
        class YL extends pf {
          constructor(e, t) {
            super(e, t), (this.scheduler = e), (this.work = t);
          }
          requestAsyncId(e, t, i = 0) {
            return null !== i && i > 0
              ? super.requestAsyncId(e, t, i)
              : (e.actions.push(this),
                e._scheduled ||
                  (e._scheduled = Bo.requestAnimationFrame(() =>
                    e.flush(void 0)
                  )));
          }
          recycleAsyncId(e, t, i = 0) {
            if ((null != i && i > 0) || (null == i && this.delay > 0))
              return super.recycleAsyncId(e, t, i);
            0 === e.actions.length &&
              (Bo.cancelAnimationFrame(t), (e._scheduled = void 0));
          }
        }
      );
      let gf,
        JL = 1;
      const Xl = {};
      function Rw(n) {
        return n in Xl && (delete Xl[n], !0);
      }
      const eV = {
          setImmediate(n) {
            const e = JL++;
            return (
              (Xl[e] = !0),
              gf || (gf = Promise.resolve()),
              gf.then(() => Rw(e) && n()),
              e
            );
          },
          clearImmediate(n) {
            Rw(n);
          },
        },
        { setImmediate: tV, clearImmediate: nV } = eV,
        Jl = {
          setImmediate(...n) {
            const { delegate: e } = Jl;
            return ((null == e ? void 0 : e.setImmediate) || tV)(...n);
          },
          clearImmediate(n) {
            const { delegate: e } = Jl;
            return ((null == e ? void 0 : e.clearImmediate) || nV)(n);
          },
          delegate: void 0,
        },
        kw =
          (new (class rV extends mf {
            flush(e) {
              (this._active = !0), (this._scheduled = void 0);
              const { actions: t } = this;
              let i,
                r = -1;
              e = e || t.shift();
              const s = t.length;
              do {
                if ((i = e.execute(e.state, e.delay))) break;
              } while (++r < s && (e = t.shift()));
              if (((this._active = !1), i)) {
                for (; ++r < s && (e = t.shift()); ) e.unsubscribe();
                throw i;
              }
            }
          })(
            class iV extends pf {
              constructor(e, t) {
                super(e, t), (this.scheduler = e), (this.work = t);
              }
              requestAsyncId(e, t, i = 0) {
                return null !== i && i > 0
                  ? super.requestAsyncId(e, t, i)
                  : (e.actions.push(this),
                    e._scheduled ||
                      (e._scheduled = Jl.setImmediate(
                        e.flush.bind(e, void 0)
                      )));
              }
              recycleAsyncId(e, t, i = 0) {
                if ((null != i && i > 0) || (null == i && this.delay > 0))
                  return super.recycleAsyncId(e, t, i);
                0 === e.actions.length &&
                  (Jl.clearImmediate(t), (e._scheduled = void 0));
              }
            }
          ),
          new mf(pf)),
        Ow = kw;
      function Fw(n, e = Ow) {
        return (function oV(n) {
          return Pe((e, t) => {
            let i = !1,
              r = null,
              s = null,
              o = !1;
            const a = () => {
                if ((null == s || s.unsubscribe(), (s = null), i)) {
                  i = !1;
                  const c = r;
                  (r = null), t.next(c);
                }
                o && t.complete();
              },
              l = () => {
                (s = null), o && t.complete();
              };
            e.subscribe(
              new Se(
                t,
                (c) => {
                  (i = !0),
                    (r = c),
                    s || xt(n(c)).subscribe((s = new Se(t, a, l)));
                },
                () => {
                  (o = !0), (!i || !s || s.closed) && t.complete();
                }
              )
            );
          });
        })(() =>
          (function lV(n = 0, e, t = Ow) {
            let i = -1;
            return (
              null != e && (im(e) ? (t = e) : (i = e)),
              new he((r) => {
                let s = (function aV(n) {
                  return n instanceof Date && !isNaN(n);
                })(n)
                  ? +n - t.now()
                  : n;
                s < 0 && (s = 0);
                let o = 0;
                return t.schedule(function () {
                  r.closed ||
                    (r.next(o++),
                    0 <= i ? this.schedule(void 0, i) : r.complete());
                }, s);
              })
            );
          })(n, e)
        );
      }
      let _f;
      try {
        _f = "undefined" != typeof Intl && Intl.v8BreakIterator;
      } catch (n) {
        _f = !1;
      }
      let Ho,
        rr,
        vf,
        Cn = (() => {
          class n {
            constructor(t) {
              (this._platformId = t),
                (this.isBrowser = this._platformId
                  ? (function FP(n) {
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
                  !(!window.chrome && !_f) &&
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
            (n.ɵfac = function (t) {
              return new (t || n)(C(fl));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      function yf(n) {
        return (function cV() {
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
      function uV() {
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
          const e = n.shadowRoot.activeElement;
          if (e === n) break;
          n = e;
        }
        return n;
      }
      function sr(n) {
        return n.composedPath ? n.composedPath()[0] : n.target;
      }
      function bf() {
        return (
          ("undefined" != typeof __karma__ && !!__karma__) ||
          ("undefined" != typeof jasmine && !!jasmine) ||
          ("undefined" != typeof jest && !!jest) ||
          ("undefined" != typeof Mocha && !!Mocha)
        );
      }
      const fV = new A("cdk-dir-doc", {
          providedIn: "root",
          factory: function pV() {
            return Tu(Y);
          },
        }),
        mV =
          /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
      let Uo = (() => {
          class n {
            constructor(t) {
              if (((this.value = "ltr"), (this.change = new ee()), t)) {
                const r = t.documentElement ? t.documentElement.dir : null;
                this.value = (function gV(n) {
                  const e = (null == n ? void 0 : n.toLowerCase()) || "";
                  return "auto" === e &&
                    "undefined" != typeof navigator &&
                    (null == navigator ? void 0 : navigator.language)
                    ? mV.test(navigator.language)
                      ? "rtl"
                      : "ltr"
                    : "rtl" === e
                    ? "rtl"
                    : "ltr";
                })((t.body ? t.body.dir : null) || r || "ltr");
              }
            }
            ngOnDestroy() {
              this.change.complete();
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(fV, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        $o = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({})),
            n
          );
        })(),
        yV = (() => {
          class n {
            constructor(t, i, r) {
              (this._ngZone = t),
                (this._platform = i),
                (this._scrolled = new X()),
                (this._globalSubscription = null),
                (this._scrolledCount = 0),
                (this.scrollContainers = new Map()),
                (this._document = r);
            }
            register(t) {
              this.scrollContainers.has(t) ||
                this.scrollContainers.set(
                  t,
                  t.elementScrolled().subscribe(() => this._scrolled.next(t))
                );
            }
            deregister(t) {
              const i = this.scrollContainers.get(t);
              i && (i.unsubscribe(), this.scrollContainers.delete(t));
            }
            scrolled(t = 20) {
              return this._platform.isBrowser
                ? new he((i) => {
                    this._globalSubscription || this._addGlobalListener();
                    const r =
                      t > 0
                        ? this._scrolled.pipe(Fw(t)).subscribe(i)
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
                this.scrollContainers.forEach((t, i) => this.deregister(i)),
                this._scrolled.complete();
            }
            ancestorScrolled(t, i) {
              const r = this.getAncestorScrollContainers(t);
              return this.scrolled(i).pipe(Oe((s) => !s || r.indexOf(s) > -1));
            }
            getAncestorScrollContainers(t) {
              const i = [];
              return (
                this.scrollContainers.forEach((r, s) => {
                  this._scrollableContainsElement(s, t) && i.push(s);
                }),
                i
              );
            }
            _getWindow() {
              return this._document.defaultView || window;
            }
            _scrollableContainsElement(t, i) {
              let r = ms(i),
                s = t.getElementRef().nativeElement;
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
            (n.ɵfac = function (t) {
              return new (t || n)(C(re), C(Cn), C(Y, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        Nw = (() => {
          class n {
            constructor(t, i, r) {
              (this._platform = t),
                (this._change = new X()),
                (this._changeListener = (s) => {
                  this._change.next(s);
                }),
                (this._document = r),
                i.runOutsideAngular(() => {
                  if (t.isBrowser) {
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
                const t = this._getWindow();
                t.removeEventListener("resize", this._changeListener),
                  t.removeEventListener(
                    "orientationchange",
                    this._changeListener
                  );
              }
              this._change.complete();
            }
            getViewportSize() {
              this._viewportSize || this._updateViewportSize();
              const t = {
                width: this._viewportSize.width,
                height: this._viewportSize.height,
              };
              return this._platform.isBrowser || (this._viewportSize = null), t;
            }
            getViewportRect() {
              const t = this.getViewportScrollPosition(),
                { width: i, height: r } = this.getViewportSize();
              return {
                top: t.top,
                left: t.left,
                bottom: t.top + r,
                right: t.left + i,
                height: r,
                width: i,
              };
            }
            getViewportScrollPosition() {
              if (!this._platform.isBrowser) return { top: 0, left: 0 };
              const t = this._document,
                i = this._getWindow(),
                r = t.documentElement,
                s = r.getBoundingClientRect();
              return {
                top:
                  -s.top || t.body.scrollTop || i.scrollY || r.scrollTop || 0,
                left:
                  -s.left ||
                  t.body.scrollLeft ||
                  i.scrollX ||
                  r.scrollLeft ||
                  0,
              };
            }
            change(t = 20) {
              return t > 0 ? this._change.pipe(Fw(t)) : this._change;
            }
            _getWindow() {
              return this._document.defaultView || window;
            }
            _updateViewportSize() {
              const t = this._getWindow();
              this._viewportSize = this._platform.isBrowser
                ? { width: t.innerWidth, height: t.innerHeight }
                : { width: 0, height: 0 };
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(Cn), C(re), C(Y, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        tc = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({})),
            n
          );
        })(),
        Lw = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({ imports: [[$o, tc], $o, tc] })),
            n
          );
        })();
      class Cf {
        attach(e) {
          return (this._attachedHost = e), e.attach(this);
        }
        detach() {
          let e = this._attachedHost;
          null != e && ((this._attachedHost = null), e.detach());
        }
        get isAttached() {
          return null != this._attachedHost;
        }
        setAttachedHost(e) {
          this._attachedHost = e;
        }
      }
      class zo extends Cf {
        constructor(e, t, i, r) {
          super(),
            (this.component = e),
            (this.viewContainerRef = t),
            (this.injector = i),
            (this.componentFactoryResolver = r);
        }
      }
      class nc extends Cf {
        constructor(e, t, i) {
          super(),
            (this.templateRef = e),
            (this.viewContainerRef = t),
            (this.context = i);
        }
        get origin() {
          return this.templateRef.elementRef;
        }
        attach(e, t = this.context) {
          return (this.context = t), super.attach(e);
        }
        detach() {
          return (this.context = void 0), super.detach();
        }
      }
      class bV extends Cf {
        constructor(e) {
          super(), (this.element = e instanceof ve ? e.nativeElement : e);
        }
      }
      class ic {
        constructor() {
          (this._isDisposed = !1), (this.attachDomPortal = null);
        }
        hasAttached() {
          return !!this._attachedPortal;
        }
        attach(e) {
          return e instanceof zo
            ? ((this._attachedPortal = e), this.attachComponentPortal(e))
            : e instanceof nc
            ? ((this._attachedPortal = e), this.attachTemplatePortal(e))
            : this.attachDomPortal && e instanceof bV
            ? ((this._attachedPortal = e), this.attachDomPortal(e))
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
        setDisposeFn(e) {
          this._disposeFn = e;
        }
        _invokeDisposeFn() {
          this._disposeFn && (this._disposeFn(), (this._disposeFn = null));
        }
      }
      class CV extends ic {
        constructor(e, t, i, r, s) {
          super(),
            (this.outletElement = e),
            (this._componentFactoryResolver = t),
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
        attachComponentPortal(e) {
          const i = (
            e.componentFactoryResolver || this._componentFactoryResolver
          ).resolveComponentFactory(e.component);
          let r;
          return (
            e.viewContainerRef
              ? ((r = e.viewContainerRef.createComponent(
                  i,
                  e.viewContainerRef.length,
                  e.injector || e.viewContainerRef.injector
                )),
                this.setDisposeFn(() => r.destroy()))
              : ((r = i.create(e.injector || this._defaultInjector || we.NULL)),
                this._appRef.attachView(r.hostView),
                this.setDisposeFn(() => {
                  this._appRef.viewCount > 0 &&
                    this._appRef.detachView(r.hostView),
                    r.destroy();
                })),
            this.outletElement.appendChild(this._getComponentRootNode(r)),
            (this._attachedPortal = e),
            r
          );
        }
        attachTemplatePortal(e) {
          let t = e.viewContainerRef,
            i = t.createEmbeddedView(e.templateRef, e.context);
          return (
            i.rootNodes.forEach((r) => this.outletElement.appendChild(r)),
            i.detectChanges(),
            this.setDisposeFn(() => {
              let r = t.indexOf(i);
              -1 !== r && t.remove(r);
            }),
            (this._attachedPortal = e),
            i
          );
        }
        dispose() {
          super.dispose(), this.outletElement.remove();
        }
        _getComponentRootNode(e) {
          return e.hostView.rootNodes[0];
        }
      }
      let Go = (() => {
          class n extends ic {
            constructor(t, i, r) {
              super(),
                (this._componentFactoryResolver = t),
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
            set portal(t) {
              (this.hasAttached() && !t && !this._isInitialized) ||
                (this.hasAttached() && super.detach(),
                t && super.attach(t),
                (this._attachedPortal = t || null));
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
            attachComponentPortal(t) {
              t.setAttachedHost(this);
              const i =
                  null != t.viewContainerRef
                    ? t.viewContainerRef
                    : this._viewContainerRef,
                s = (
                  t.componentFactoryResolver || this._componentFactoryResolver
                ).resolveComponentFactory(t.component),
                o = i.createComponent(s, i.length, t.injector || i.injector);
              return (
                i !== this._viewContainerRef &&
                  this._getRootNode().appendChild(o.hostView.rootNodes[0]),
                super.setDisposeFn(() => o.destroy()),
                (this._attachedPortal = t),
                (this._attachedRef = o),
                this.attached.emit(o),
                o
              );
            }
            attachTemplatePortal(t) {
              t.setAttachedHost(this);
              const i = this._viewContainerRef.createEmbeddedView(
                t.templateRef,
                t.context
              );
              return (
                super.setDisposeFn(() => this._viewContainerRef.clear()),
                (this._attachedPortal = t),
                (this._attachedRef = i),
                this.attached.emit(i),
                i
              );
            }
            _getRootNode() {
              const t = this._viewContainerRef.element.nativeElement;
              return t.nodeType === t.ELEMENT_NODE ? t : t.parentNode;
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(vi), y(Lt), y(Y));
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [["", "cdkPortalOutlet", ""]],
              inputs: { portal: ["cdkPortalOutlet", "portal"] },
              outputs: { attached: "attached" },
              exportAs: ["cdkPortalOutlet"],
              features: [Q],
            })),
            n
          );
        })(),
        rc = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({})),
            n
          );
        })();
      function wi(n) {
        return Pe((e, t) => {
          xt(n).subscribe(new Se(t, () => t.complete(), Is)),
            !t.closed && e.subscribe(t);
        });
      }
      const Vw = uV();
      class wV {
        constructor(e, t) {
          (this._viewportRuler = e),
            (this._previousHTMLStyles = { top: "", left: "" }),
            (this._isEnabled = !1),
            (this._document = t);
        }
        attach() {}
        enable() {
          if (this._canBeEnabled()) {
            const e = this._document.documentElement;
            (this._previousScrollPosition =
              this._viewportRuler.getViewportScrollPosition()),
              (this._previousHTMLStyles.left = e.style.left || ""),
              (this._previousHTMLStyles.top = e.style.top || ""),
              (e.style.left = Ue(-this._previousScrollPosition.left)),
              (e.style.top = Ue(-this._previousScrollPosition.top)),
              e.classList.add("cdk-global-scrollblock"),
              (this._isEnabled = !0);
          }
        }
        disable() {
          if (this._isEnabled) {
            const e = this._document.documentElement,
              i = e.style,
              r = this._document.body.style,
              s = i.scrollBehavior || "",
              o = r.scrollBehavior || "";
            (this._isEnabled = !1),
              (i.left = this._previousHTMLStyles.left),
              (i.top = this._previousHTMLStyles.top),
              e.classList.remove("cdk-global-scrollblock"),
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
          const t = this._document.body,
            i = this._viewportRuler.getViewportSize();
          return t.scrollHeight > i.height || t.scrollWidth > i.width;
        }
      }
      class DV {
        constructor(e, t, i, r) {
          (this._scrollDispatcher = e),
            (this._ngZone = t),
            (this._viewportRuler = i),
            (this._config = r),
            (this._scrollSubscription = null),
            (this._detach = () => {
              this.disable(),
                this._overlayRef.hasAttached() &&
                  this._ngZone.run(() => this._overlayRef.detach());
            });
        }
        attach(e) {
          this._overlayRef = e;
        }
        enable() {
          if (this._scrollSubscription) return;
          const e = this._scrollDispatcher.scrolled(0);
          this._config && this._config.threshold && this._config.threshold > 1
            ? ((this._initialScrollPosition =
                this._viewportRuler.getViewportScrollPosition().top),
              (this._scrollSubscription = e.subscribe(() => {
                const t = this._viewportRuler.getViewportScrollPosition().top;
                Math.abs(t - this._initialScrollPosition) >
                this._config.threshold
                  ? this._detach()
                  : this._overlayRef.updatePosition();
              })))
            : (this._scrollSubscription = e.subscribe(this._detach));
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
      function wf(n, e) {
        return e.some(
          (t) =>
            n.bottom < t.top ||
            n.top > t.bottom ||
            n.right < t.left ||
            n.left > t.right
        );
      }
      function jw(n, e) {
        return e.some(
          (t) =>
            n.top < t.top ||
            n.bottom > t.bottom ||
            n.left < t.left ||
            n.right > t.right
        );
      }
      class EV {
        constructor(e, t, i, r) {
          (this._scrollDispatcher = e),
            (this._viewportRuler = t),
            (this._ngZone = i),
            (this._config = r),
            (this._scrollSubscription = null);
        }
        attach(e) {
          this._overlayRef = e;
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
                  const t =
                      this._overlayRef.overlayElement.getBoundingClientRect(),
                    { width: i, height: r } =
                      this._viewportRuler.getViewportSize();
                  wf(t, [
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
      let MV = (() => {
        class n {
          constructor(t, i, r, s) {
            (this._scrollDispatcher = t),
              (this._viewportRuler = i),
              (this._ngZone = r),
              (this.noop = () => new Bw()),
              (this.close = (o) =>
                new DV(
                  this._scrollDispatcher,
                  this._ngZone,
                  this._viewportRuler,
                  o
                )),
              (this.block = () => new wV(this._viewportRuler, this._document)),
              (this.reposition = (o) =>
                new EV(
                  this._scrollDispatcher,
                  this._viewportRuler,
                  this._ngZone,
                  o
                )),
              (this._document = s);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(yV), C(Nw), C(re), C(Y));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      class Df {
        constructor(e) {
          if (
            ((this.scrollStrategy = new Bw()),
            (this.panelClass = ""),
            (this.hasBackdrop = !1),
            (this.backdropClass = "cdk-overlay-dark-backdrop"),
            (this.disposeOnNavigation = !1),
            e)
          ) {
            const t = Object.keys(e);
            for (const i of t) void 0 !== e[i] && (this[i] = e[i]);
          }
        }
      }
      class SV {
        constructor(e, t) {
          (this.connectionPair = e), (this.scrollableViewProperties = t);
        }
      }
      class xV {
        constructor(e, t, i, r, s, o, a, l, c) {
          (this._portalOutlet = e),
            (this._host = t),
            (this._pane = i),
            (this._config = r),
            (this._ngZone = s),
            (this._keyboardDispatcher = o),
            (this._document = a),
            (this._location = l),
            (this._outsideClickDispatcher = c),
            (this._backdropElement = null),
            (this._backdropClick = new X()),
            (this._attachments = new X()),
            (this._detachments = new X()),
            (this._locationChanges = Ve.EMPTY),
            (this._backdropClickHandler = (u) => this._backdropClick.next(u)),
            (this._backdropTransitionendHandler = (u) => {
              this._disposeBackdrop(u.target);
            }),
            (this._keydownEvents = new X()),
            (this._outsidePointerEvents = new X()),
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
        attach(e) {
          !this._host.parentElement &&
            this._previousHostParent &&
            this._previousHostParent.appendChild(this._host);
          const t = this._portalOutlet.attach(e);
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
            t
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
          const e = this._portalOutlet.detach();
          return (
            this._detachments.next(),
            this._keyboardDispatcher.remove(this),
            this._detachContentWhenStable(),
            this._locationChanges.unsubscribe(),
            this._outsideClickDispatcher.remove(this),
            e
          );
        }
        dispose() {
          var e;
          const t = this.hasAttached();
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
            null === (e = this._host) || void 0 === e || e.remove(),
            (this._previousHostParent = this._pane = this._host = null),
            t && this._detachments.next(),
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
        updatePositionStrategy(e) {
          e !== this._positionStrategy &&
            (this._positionStrategy && this._positionStrategy.dispose(),
            (this._positionStrategy = e),
            this.hasAttached() && (e.attach(this), this.updatePosition()));
        }
        updateSize(e) {
          (this._config = Object.assign(Object.assign({}, this._config), e)),
            this._updateElementSize();
        }
        setDirection(e) {
          (this._config = Object.assign(Object.assign({}, this._config), {
            direction: e,
          })),
            this._updateElementDirection();
        }
        addPanelClass(e) {
          this._pane && this._toggleClasses(this._pane, e, !0);
        }
        removePanelClass(e) {
          this._pane && this._toggleClasses(this._pane, e, !1);
        }
        getDirection() {
          const e = this._config.direction;
          return e ? ("string" == typeof e ? e : e.value) : "ltr";
        }
        updateScrollStrategy(e) {
          e !== this._scrollStrategy &&
            (this._disposeScrollStrategy(),
            (this._scrollStrategy = e),
            this.hasAttached() && (e.attach(this), e.enable()));
        }
        _updateElementDirection() {
          this._host.setAttribute("dir", this.getDirection());
        }
        _updateElementSize() {
          if (!this._pane) return;
          const e = this._pane.style;
          (e.width = Ue(this._config.width)),
            (e.height = Ue(this._config.height)),
            (e.minWidth = Ue(this._config.minWidth)),
            (e.minHeight = Ue(this._config.minHeight)),
            (e.maxWidth = Ue(this._config.maxWidth)),
            (e.maxHeight = Ue(this._config.maxHeight));
        }
        _togglePointerEvents(e) {
          this._pane.style.pointerEvents = e ? "" : "none";
        }
        _attachBackdrop() {
          const e = "cdk-overlay-backdrop-showing";
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
                      this._backdropElement.classList.add(e);
                  });
                })
              : this._backdropElement.classList.add(e);
        }
        _updateStackingOrder() {
          this._host.nextSibling &&
            this._host.parentNode.appendChild(this._host);
        }
        detachBackdrop() {
          const e = this._backdropElement;
          !e ||
            (e.classList.remove("cdk-overlay-backdrop-showing"),
            this._ngZone.runOutsideAngular(() => {
              e.addEventListener(
                "transitionend",
                this._backdropTransitionendHandler
              );
            }),
            (e.style.pointerEvents = "none"),
            (this._backdropTimeout = this._ngZone.runOutsideAngular(() =>
              setTimeout(() => {
                this._disposeBackdrop(e);
              }, 500)
            )));
        }
        _toggleClasses(e, t, i) {
          const r = Vo(t || []).filter((s) => !!s);
          r.length && (i ? e.classList.add(...r) : e.classList.remove(...r));
        }
        _detachContentWhenStable() {
          this._ngZone.runOutsideAngular(() => {
            const e = this._ngZone.onStable
              .pipe(wi(la(this._attachments, this._detachments)))
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
                  e.unsubscribe());
              });
          });
        }
        _disposeScrollStrategy() {
          const e = this._scrollStrategy;
          e && (e.disable(), e.detach && e.detach());
        }
        _disposeBackdrop(e) {
          e &&
            (e.removeEventListener("click", this._backdropClickHandler),
            e.removeEventListener(
              "transitionend",
              this._backdropTransitionendHandler
            ),
            e.remove(),
            this._backdropElement === e && (this._backdropElement = null)),
            this._backdropTimeout &&
              (clearTimeout(this._backdropTimeout),
              (this._backdropTimeout = void 0));
        }
      }
      let Ef = (() => {
        class n {
          constructor(t, i) {
            (this._platform = i), (this._document = t);
          }
          ngOnDestroy() {
            var t;
            null === (t = this._containerElement) || void 0 === t || t.remove();
          }
          getContainerElement() {
            return (
              this._containerElement || this._createContainer(),
              this._containerElement
            );
          }
          _createContainer() {
            const t = "cdk-overlay-container";
            if (this._platform.isBrowser || bf()) {
              const r = this._document.querySelectorAll(
                `.${t}[platform="server"], .${t}[platform="test"]`
              );
              for (let s = 0; s < r.length; s++) r[s].remove();
            }
            const i = this._document.createElement("div");
            i.classList.add(t),
              bf()
                ? i.setAttribute("platform", "test")
                : this._platform.isBrowser ||
                  i.setAttribute("platform", "server"),
              this._document.body.appendChild(i),
              (this._containerElement = i);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Y), C(Cn));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const Hw = "cdk-overlay-connected-position-bounding-box",
        AV = /([A-Za-z%]+)$/;
      class TV {
        constructor(e, t, i, r, s) {
          (this._viewportRuler = t),
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
            (this._positionChanges = new X()),
            (this._resizeSubscription = Ve.EMPTY),
            (this._offsetX = 0),
            (this._offsetY = 0),
            (this._appliedPanelClasses = []),
            (this.positionChanges = this._positionChanges),
            this.setOrigin(e);
        }
        get positions() {
          return this._preferredPositions;
        }
        attach(e) {
          this._validatePositions(),
            e.hostElement.classList.add(Hw),
            (this._overlayRef = e),
            (this._boundingBox = e.hostElement),
            (this._pane = e.overlayElement),
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
          const e = this._originRect,
            t = this._overlayRect,
            i = this._viewportRect,
            r = this._containerRect,
            s = [];
          let o;
          for (let a of this._preferredPositions) {
            let l = this._getOriginPoint(e, r, a),
              c = this._getOverlayPoint(l, t, a),
              u = this._getOverlayFit(c, t, i, a);
            if (u.isCompletelyWithinViewport)
              return (this._isPushed = !1), void this._applyPosition(a, l);
            this._canFitWithFlexibleDimensions(u, c, i)
              ? s.push({
                  position: a,
                  origin: l,
                  overlayRect: t,
                  boundingBoxRect: this._calculateBoundingBoxRect(l, a),
                })
              : (!o || o.overlayFit.visibleArea < u.visibleArea) &&
                (o = {
                  overlayFit: u,
                  overlayPoint: c,
                  originPoint: l,
                  position: a,
                  overlayRect: t,
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
          const e = this._lastPosition;
          if (e) {
            (this._originRect = this._getOriginRect()),
              (this._overlayRect = this._pane.getBoundingClientRect()),
              (this._viewportRect = this._getNarrowedViewportRect()),
              (this._containerRect = this._overlayContainer
                .getContainerElement()
                .getBoundingClientRect());
            const t = this._getOriginPoint(
              this._originRect,
              this._containerRect,
              e
            );
            this._applyPosition(e, t);
          } else this.apply();
        }
        withScrollableContainers(e) {
          return (this._scrollables = e), this;
        }
        withPositions(e) {
          return (
            (this._preferredPositions = e),
            -1 === e.indexOf(this._lastPosition) && (this._lastPosition = null),
            this._validatePositions(),
            this
          );
        }
        withViewportMargin(e) {
          return (this._viewportMargin = e), this;
        }
        withFlexibleDimensions(e = !0) {
          return (this._hasFlexibleDimensions = e), this;
        }
        withGrowAfterOpen(e = !0) {
          return (this._growAfterOpen = e), this;
        }
        withPush(e = !0) {
          return (this._canPush = e), this;
        }
        withLockedPosition(e = !0) {
          return (this._positionLocked = e), this;
        }
        setOrigin(e) {
          return (this._origin = e), this;
        }
        withDefaultOffsetX(e) {
          return (this._offsetX = e), this;
        }
        withDefaultOffsetY(e) {
          return (this._offsetY = e), this;
        }
        withTransformOriginOn(e) {
          return (this._transformOriginSelector = e), this;
        }
        _getOriginPoint(e, t, i) {
          let r, s;
          if ("center" == i.originX) r = e.left + e.width / 2;
          else {
            const o = this._isRtl() ? e.right : e.left,
              a = this._isRtl() ? e.left : e.right;
            r = "start" == i.originX ? o : a;
          }
          return (
            t.left < 0 && (r -= t.left),
            (s =
              "center" == i.originY
                ? e.top + e.height / 2
                : "top" == i.originY
                ? e.top
                : e.bottom),
            t.top < 0 && (s -= t.top),
            { x: r, y: s }
          );
        }
        _getOverlayPoint(e, t, i) {
          let r, s;
          return (
            (r =
              "center" == i.overlayX
                ? -t.width / 2
                : "start" === i.overlayX
                ? this._isRtl()
                  ? -t.width
                  : 0
                : this._isRtl()
                ? 0
                : -t.width),
            (s =
              "center" == i.overlayY
                ? -t.height / 2
                : "top" == i.overlayY
                ? 0
                : -t.height),
            { x: e.x + r, y: e.y + s }
          );
        }
        _getOverlayFit(e, t, i, r) {
          const s = $w(t);
          let { x: o, y: a } = e,
            l = this._getOffset(r, "x"),
            c = this._getOffset(r, "y");
          l && (o += l), c && (a += c);
          let h = 0 - a,
            f = a + s.height - i.height,
            p = this._subtractOverflows(s.width, 0 - o, o + s.width - i.width),
            _ = this._subtractOverflows(s.height, h, f),
            b = p * _;
          return {
            visibleArea: b,
            isCompletelyWithinViewport: s.width * s.height === b,
            fitsInViewportVertically: _ === s.height,
            fitsInViewportHorizontally: p == s.width,
          };
        }
        _canFitWithFlexibleDimensions(e, t, i) {
          if (this._hasFlexibleDimensions) {
            const r = i.bottom - t.y,
              s = i.right - t.x,
              o = Uw(this._overlayRef.getConfig().minHeight),
              a = Uw(this._overlayRef.getConfig().minWidth),
              c = e.fitsInViewportHorizontally || (null != a && a <= s);
            return (e.fitsInViewportVertically || (null != o && o <= r)) && c;
          }
          return !1;
        }
        _pushOverlayOnScreen(e, t, i) {
          if (this._previousPushAmount && this._positionLocked)
            return {
              x: e.x + this._previousPushAmount.x,
              y: e.y + this._previousPushAmount.y,
            };
          const r = $w(t),
            s = this._viewportRect,
            o = Math.max(e.x + r.width - s.width, 0),
            a = Math.max(e.y + r.height - s.height, 0),
            l = Math.max(s.top - i.top - e.y, 0),
            c = Math.max(s.left - i.left - e.x, 0);
          let u = 0,
            d = 0;
          return (
            (u =
              r.width <= s.width
                ? c || -o
                : e.x < this._viewportMargin
                ? s.left - i.left - e.x
                : 0),
            (d =
              r.height <= s.height
                ? l || -a
                : e.y < this._viewportMargin
                ? s.top - i.top - e.y
                : 0),
            (this._previousPushAmount = { x: u, y: d }),
            { x: e.x + u, y: e.y + d }
          );
        }
        _applyPosition(e, t) {
          if (
            (this._setTransformOrigin(e),
            this._setOverlayElementStyles(t, e),
            this._setBoundingBoxStyles(t, e),
            e.panelClass && this._addPanelClasses(e.panelClass),
            (this._lastPosition = e),
            this._positionChanges.observers.length)
          ) {
            const i = this._getScrollVisibility(),
              r = new SV(e, i);
            this._positionChanges.next(r);
          }
          this._isInitialRender = !1;
        }
        _setTransformOrigin(e) {
          if (!this._transformOriginSelector) return;
          const t = this._boundingBox.querySelectorAll(
            this._transformOriginSelector
          );
          let i,
            r = e.overlayY;
          i =
            "center" === e.overlayX
              ? "center"
              : this._isRtl()
              ? "start" === e.overlayX
                ? "right"
                : "left"
              : "start" === e.overlayX
              ? "left"
              : "right";
          for (let s = 0; s < t.length; s++)
            t[s].style.transformOrigin = `${i} ${r}`;
        }
        _calculateBoundingBoxRect(e, t) {
          const i = this._viewportRect,
            r = this._isRtl();
          let s, o, a, u, d, h;
          if ("top" === t.overlayY)
            (o = e.y), (s = i.height - o + this._viewportMargin);
          else if ("bottom" === t.overlayY)
            (a = i.height - e.y + 2 * this._viewportMargin),
              (s = i.height - a + this._viewportMargin);
          else {
            const f = Math.min(i.bottom - e.y + i.top, e.y),
              p = this._lastBoundingBoxSize.height;
            (s = 2 * f),
              (o = e.y - f),
              s > p &&
                !this._isInitialRender &&
                !this._growAfterOpen &&
                (o = e.y - p / 2);
          }
          if (("end" === t.overlayX && !r) || ("start" === t.overlayX && r))
            (h = i.width - e.x + this._viewportMargin),
              (u = e.x - this._viewportMargin);
          else if (
            ("start" === t.overlayX && !r) ||
            ("end" === t.overlayX && r)
          )
            (d = e.x), (u = i.right - e.x);
          else {
            const f = Math.min(i.right - e.x + i.left, e.x),
              p = this._lastBoundingBoxSize.width;
            (u = 2 * f),
              (d = e.x - f),
              u > p &&
                !this._isInitialRender &&
                !this._growAfterOpen &&
                (d = e.x - p / 2);
          }
          return { top: o, left: d, bottom: a, right: h, width: u, height: s };
        }
        _setBoundingBoxStyles(e, t) {
          const i = this._calculateBoundingBoxRect(e, t);
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
                "center" === t.overlayX
                  ? "center"
                  : "end" === t.overlayX
                  ? "flex-end"
                  : "flex-start"),
              (r.justifyContent =
                "center" === t.overlayY
                  ? "center"
                  : "bottom" === t.overlayY
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
        _setOverlayElementStyles(e, t) {
          const i = {},
            r = this._hasExactPosition(),
            s = this._hasFlexibleDimensions,
            o = this._overlayRef.getConfig();
          if (r) {
            const u = this._viewportRuler.getViewportScrollPosition();
            or(i, this._getExactOverlayY(t, e, u)),
              or(i, this._getExactOverlayX(t, e, u));
          } else i.position = "static";
          let a = "",
            l = this._getOffset(t, "x"),
            c = this._getOffset(t, "y");
          l && (a += `translateX(${l}px) `),
            c && (a += `translateY(${c}px)`),
            (i.transform = a.trim()),
            o.maxHeight &&
              (r ? (i.maxHeight = Ue(o.maxHeight)) : s && (i.maxHeight = "")),
            o.maxWidth &&
              (r ? (i.maxWidth = Ue(o.maxWidth)) : s && (i.maxWidth = "")),
            or(this._pane.style, i);
        }
        _getExactOverlayY(e, t, i) {
          let r = { top: "", bottom: "" },
            s = this._getOverlayPoint(t, this._overlayRect, e);
          return (
            this._isPushed &&
              (s = this._pushOverlayOnScreen(s, this._overlayRect, i)),
            "bottom" === e.overlayY
              ? (r.bottom =
                  this._document.documentElement.clientHeight -
                  (s.y + this._overlayRect.height) +
                  "px")
              : (r.top = Ue(s.y)),
            r
          );
        }
        _getExactOverlayX(e, t, i) {
          let o,
            r = { left: "", right: "" },
            s = this._getOverlayPoint(t, this._overlayRect, e);
          return (
            this._isPushed &&
              (s = this._pushOverlayOnScreen(s, this._overlayRect, i)),
            (o = this._isRtl()
              ? "end" === e.overlayX
                ? "left"
                : "right"
              : "end" === e.overlayX
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
          const e = this._getOriginRect(),
            t = this._pane.getBoundingClientRect(),
            i = this._scrollables.map((r) =>
              r.getElementRef().nativeElement.getBoundingClientRect()
            );
          return {
            isOriginClipped: jw(e, i),
            isOriginOutsideView: wf(e, i),
            isOverlayClipped: jw(t, i),
            isOverlayOutsideView: wf(t, i),
          };
        }
        _subtractOverflows(e, ...t) {
          return t.reduce((i, r) => i - Math.max(r, 0), e);
        }
        _getNarrowedViewportRect() {
          const e = this._document.documentElement.clientWidth,
            t = this._document.documentElement.clientHeight,
            i = this._viewportRuler.getViewportScrollPosition();
          return {
            top: i.top + this._viewportMargin,
            left: i.left + this._viewportMargin,
            right: i.left + e - this._viewportMargin,
            bottom: i.top + t - this._viewportMargin,
            width: e - 2 * this._viewportMargin,
            height: t - 2 * this._viewportMargin,
          };
        }
        _isRtl() {
          return "rtl" === this._overlayRef.getDirection();
        }
        _hasExactPosition() {
          return !this._hasFlexibleDimensions || this._isPushed;
        }
        _getOffset(e, t) {
          return "x" === t
            ? null == e.offsetX
              ? this._offsetX
              : e.offsetX
            : null == e.offsetY
            ? this._offsetY
            : e.offsetY;
        }
        _validatePositions() {}
        _addPanelClasses(e) {
          this._pane &&
            Vo(e).forEach((t) => {
              "" !== t &&
                -1 === this._appliedPanelClasses.indexOf(t) &&
                (this._appliedPanelClasses.push(t),
                this._pane.classList.add(t));
            });
        }
        _clearPanelClasses() {
          this._pane &&
            (this._appliedPanelClasses.forEach((e) => {
              this._pane.classList.remove(e);
            }),
            (this._appliedPanelClasses = []));
        }
        _getOriginRect() {
          const e = this._origin;
          if (e instanceof ve) return e.nativeElement.getBoundingClientRect();
          if (e instanceof Element) return e.getBoundingClientRect();
          const t = e.width || 0,
            i = e.height || 0;
          return {
            top: e.y,
            bottom: e.y + i,
            left: e.x,
            right: e.x + t,
            height: i,
            width: t,
          };
        }
      }
      function or(n, e) {
        for (let t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
        return n;
      }
      function Uw(n) {
        if ("number" != typeof n && null != n) {
          const [e, t] = n.split(AV);
          return t && "px" !== t ? null : parseFloat(e);
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
      class IV {
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
        attach(e) {
          const t = e.getConfig();
          (this._overlayRef = e),
            this._width && !t.width && e.updateSize({ width: this._width }),
            this._height && !t.height && e.updateSize({ height: this._height }),
            e.hostElement.classList.add(zw),
            (this._isDisposed = !1);
        }
        top(e = "") {
          return (
            (this._bottomOffset = ""),
            (this._topOffset = e),
            (this._alignItems = "flex-start"),
            this
          );
        }
        left(e = "") {
          return (
            (this._rightOffset = ""),
            (this._leftOffset = e),
            (this._justifyContent = "flex-start"),
            this
          );
        }
        bottom(e = "") {
          return (
            (this._topOffset = ""),
            (this._bottomOffset = e),
            (this._alignItems = "flex-end"),
            this
          );
        }
        right(e = "") {
          return (
            (this._leftOffset = ""),
            (this._rightOffset = e),
            (this._justifyContent = "flex-end"),
            this
          );
        }
        width(e = "") {
          return (
            this._overlayRef
              ? this._overlayRef.updateSize({ width: e })
              : (this._width = e),
            this
          );
        }
        height(e = "") {
          return (
            this._overlayRef
              ? this._overlayRef.updateSize({ height: e })
              : (this._height = e),
            this
          );
        }
        centerHorizontally(e = "") {
          return this.left(e), (this._justifyContent = "center"), this;
        }
        centerVertically(e = "") {
          return this.top(e), (this._alignItems = "center"), this;
        }
        apply() {
          if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
          const e = this._overlayRef.overlayElement.style,
            t = this._overlayRef.hostElement.style,
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
          (e.position = this._cssPosition),
            (e.marginLeft = l ? "0" : this._leftOffset),
            (e.marginTop = c ? "0" : this._topOffset),
            (e.marginBottom = this._bottomOffset),
            (e.marginRight = this._rightOffset),
            l
              ? (t.justifyContent = "flex-start")
              : "center" === this._justifyContent
              ? (t.justifyContent = "center")
              : "rtl" === this._overlayRef.getConfig().direction
              ? "flex-start" === this._justifyContent
                ? (t.justifyContent = "flex-end")
                : "flex-end" === this._justifyContent &&
                  (t.justifyContent = "flex-start")
              : (t.justifyContent = this._justifyContent),
            (t.alignItems = c ? "flex-start" : this._alignItems);
        }
        dispose() {
          if (this._isDisposed || !this._overlayRef) return;
          const e = this._overlayRef.overlayElement.style,
            t = this._overlayRef.hostElement,
            i = t.style;
          t.classList.remove(zw),
            (i.justifyContent =
              i.alignItems =
              e.marginTop =
              e.marginBottom =
              e.marginLeft =
              e.marginRight =
              e.position =
                ""),
            (this._overlayRef = null),
            (this._isDisposed = !0);
        }
      }
      let RV = (() => {
          class n {
            constructor(t, i, r, s) {
              (this._viewportRuler = t),
                (this._document = i),
                (this._platform = r),
                (this._overlayContainer = s);
            }
            global() {
              return new IV();
            }
            flexibleConnectedTo(t) {
              return new TV(
                t,
                this._viewportRuler,
                this._document,
                this._platform,
                this._overlayContainer
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(Nw), C(Y), C(Cn), C(Ef));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        Gw = (() => {
          class n {
            constructor(t) {
              (this._attachedOverlays = []), (this._document = t);
            }
            ngOnDestroy() {
              this.detach();
            }
            add(t) {
              this.remove(t), this._attachedOverlays.push(t);
            }
            remove(t) {
              const i = this._attachedOverlays.indexOf(t);
              i > -1 && this._attachedOverlays.splice(i, 1),
                0 === this._attachedOverlays.length && this.detach();
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(Y));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        kV = (() => {
          class n extends Gw {
            constructor(t, i) {
              super(t),
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
            add(t) {
              super.add(t),
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
            (n.ɵfac = function (t) {
              return new (t || n)(C(Y), C(re, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        OV = (() => {
          class n extends Gw {
            constructor(t, i, r) {
              super(t),
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
            add(t) {
              if ((super.add(t), !this._isAttached)) {
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
                const t = this._document.body;
                t.removeEventListener(
                  "pointerdown",
                  this._pointerDownListener,
                  !0
                ),
                  t.removeEventListener("click", this._clickListener, !0),
                  t.removeEventListener("auxclick", this._clickListener, !0),
                  t.removeEventListener("contextmenu", this._clickListener, !0),
                  this._platform.IOS &&
                    this._cursorStyleIsSet &&
                    ((t.style.cursor = this._cursorOriginalValue),
                    (this._cursorStyleIsSet = !1)),
                  (this._isAttached = !1);
              }
            }
            _addEventListeners(t) {
              t.addEventListener("pointerdown", this._pointerDownListener, !0),
                t.addEventListener("click", this._clickListener, !0),
                t.addEventListener("auxclick", this._clickListener, !0),
                t.addEventListener("contextmenu", this._clickListener, !0);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(Y), C(Cn), C(re, 8));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        FV = 0,
        Wo = (() => {
          class n {
            constructor(t, i, r, s, o, a, l, c, u, d, h) {
              (this.scrollStrategies = t),
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
            create(t) {
              const i = this._createHostElement(),
                r = this._createPaneElement(i),
                s = this._createPortalOutlet(r),
                o = new Df(t);
              return (
                (o.direction = o.direction || this._directionality.value),
                new xV(
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
            _createPaneElement(t) {
              const i = this._document.createElement("div");
              return (
                (i.id = "cdk-overlay-" + FV++),
                i.classList.add("cdk-overlay-pane"),
                t.appendChild(i),
                i
              );
            }
            _createHostElement() {
              const t = this._document.createElement("div");
              return (
                this._overlayContainer.getContainerElement().appendChild(t), t
              );
            }
            _createPortalOutlet(t) {
              return (
                this._appRef || (this._appRef = this._injector.get(os)),
                new CV(
                  t,
                  this._componentFactoryResolver,
                  this._appRef,
                  this._injector,
                  this._document
                )
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(
                C(MV),
                C(Ef),
                C(vi),
                C(RV),
                C(kV),
                C(we),
                C(re),
                C(Y),
                C(Uo),
                C(Co),
                C(OV)
              );
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })();
      const LV = {
        provide: new A("cdk-connected-overlay-scroll-strategy"),
        deps: [Wo],
        useFactory: function NV(n) {
          return () => n.scrollStrategies.reposition();
        },
      };
      let Ww = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = ue({ type: n })),
          (n.ɵinj = le({ providers: [Wo, LV], imports: [[$o, rc, Lw], Lw] })),
          n
        );
      })();
      function ys(n, ...e) {
        return e.length
          ? e.some((t) => n[t])
          : n.altKey || n.shiftKey || n.ctrlKey || n.metaKey;
      }
      function eD(n, e = kw) {
        return Pe((t, i) => {
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
              u = e.now();
            if (u < c) return (r = this.schedule(void 0, c - u)), void i.add(r);
            a();
          }
          t.subscribe(
            new Se(
              i,
              (c) => {
                (s = c), (o = e.now()), r || ((r = e.schedule(l, n)), i.add(r));
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
        return Oe((e, t) => n <= t);
      }
      function nD(n, e = li) {
        return (
          (n = null != n ? n : ZV),
          Pe((t, i) => {
            let r,
              s = !0;
            t.subscribe(
              new Se(i, (o) => {
                const a = e(o);
                (s || !n(r, a)) && ((s = !1), (r = a), i.next(o));
              })
            );
          })
        );
      }
      function ZV(n, e) {
        return n === e;
      }
      class sD extends class eB {
        constructor(e) {
          (this._items = e),
            (this._activeItemIndex = -1),
            (this._activeItem = null),
            (this._wrap = !1),
            (this._letterKeyStream = new X()),
            (this._typeaheadSubscription = Ve.EMPTY),
            (this._vertical = !0),
            (this._allowedModifierKeys = []),
            (this._homeAndEnd = !1),
            (this._skipPredicateFn = (t) => t.disabled),
            (this._pressedLetters = []),
            (this.tabOut = new X()),
            (this.change = new X()),
            e instanceof ns &&
              e.changes.subscribe((t) => {
                if (this._activeItem) {
                  const r = t.toArray().indexOf(this._activeItem);
                  r > -1 &&
                    r !== this._activeItemIndex &&
                    (this._activeItemIndex = r);
                }
              });
        }
        skipPredicate(e) {
          return (this._skipPredicateFn = e), this;
        }
        withWrap(e = !0) {
          return (this._wrap = e), this;
        }
        withVerticalOrientation(e = !0) {
          return (this._vertical = e), this;
        }
        withHorizontalOrientation(e) {
          return (this._horizontal = e), this;
        }
        withAllowedModifierKeys(e) {
          return (this._allowedModifierKeys = e), this;
        }
        withTypeAhead(e = 200) {
          return (
            this._typeaheadSubscription.unsubscribe(),
            (this._typeaheadSubscription = this._letterKeyStream
              .pipe(
                et((t) => this._pressedLetters.push(t)),
                eD(e),
                Oe(() => this._pressedLetters.length > 0),
                q(() => this._pressedLetters.join(""))
              )
              .subscribe((t) => {
                const i = this._getItemsArray();
                for (let r = 1; r < i.length + 1; r++) {
                  const s = (this._activeItemIndex + r) % i.length,
                    o = i[s];
                  if (
                    !this._skipPredicateFn(o) &&
                    0 === o.getLabel().toUpperCase().trim().indexOf(t)
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
        withHomeAndEnd(e = !0) {
          return (this._homeAndEnd = e), this;
        }
        setActiveItem(e) {
          const t = this._activeItem;
          this.updateActiveItem(e),
            this._activeItem !== t && this.change.next(this._activeItemIndex);
        }
        onKeydown(e) {
          const t = e.keyCode,
            r = ["altKey", "ctrlKey", "metaKey", "shiftKey"].every(
              (s) => !e[s] || this._allowedModifierKeys.indexOf(s) > -1
            );
          switch (t) {
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
                (r || ys(e, "shiftKey")) &&
                (e.key && 1 === e.key.length
                  ? this._letterKeyStream.next(e.key.toLocaleUpperCase())
                  : ((t >= 65 && t <= 90) || (t >= 48 && t <= 57)) &&
                    this._letterKeyStream.next(String.fromCharCode(t)))
              );
          }
          (this._pressedLetters = []), e.preventDefault();
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
        updateActiveItem(e) {
          const t = this._getItemsArray(),
            i = "number" == typeof e ? e : t.indexOf(e),
            r = t[i];
          (this._activeItem = null == r ? null : r),
            (this._activeItemIndex = i);
        }
        _setActiveItemByDelta(e) {
          this._wrap
            ? this._setActiveInWrapMode(e)
            : this._setActiveInDefaultMode(e);
        }
        _setActiveInWrapMode(e) {
          const t = this._getItemsArray();
          for (let i = 1; i <= t.length; i++) {
            const r = (this._activeItemIndex + e * i + t.length) % t.length;
            if (!this._skipPredicateFn(t[r])) return void this.setActiveItem(r);
          }
        }
        _setActiveInDefaultMode(e) {
          this._setActiveItemByIndex(this._activeItemIndex + e, e);
        }
        _setActiveItemByIndex(e, t) {
          const i = this._getItemsArray();
          if (i[e]) {
            for (; this._skipPredicateFn(i[e]); ) if (!i[(e += t)]) return;
            this.setActiveItem(e);
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
        setFocusOrigin(e) {
          return (this._origin = e), this;
        }
        setActiveItem(e) {
          super.setActiveItem(e),
            this.activeItem && this.activeItem.focus(this._origin);
        }
      }
      let Mf = (() => {
        class n {
          constructor(t) {
            this._platform = t;
          }
          isDisabled(t) {
            return t.hasAttribute("disabled");
          }
          isVisible(t) {
            return (
              (function nB(n) {
                return !!(
                  n.offsetWidth ||
                  n.offsetHeight ||
                  ("function" == typeof n.getClientRects &&
                    n.getClientRects().length)
                );
              })(t) && "visible" === getComputedStyle(t).visibility
            );
          }
          isTabbable(t) {
            if (!this._platform.isBrowser) return !1;
            const i = (function tB(n) {
              try {
                return n.frameElement;
              } catch (e) {
                return null;
              }
            })(
              (function uB(n) {
                return (
                  (n.ownerDocument && n.ownerDocument.defaultView) || window
                );
              })(t)
            );
            if (i && (-1 === aD(i) || !this.isVisible(i))) return !1;
            let r = t.nodeName.toLowerCase(),
              s = aD(t);
            return t.hasAttribute("contenteditable")
              ? -1 !== s
              : !(
                  "iframe" === r ||
                  "object" === r ||
                  (this._platform.WEBKIT &&
                    this._platform.IOS &&
                    !(function lB(n) {
                      let e = n.nodeName.toLowerCase(),
                        t = "input" === e && n.type;
                      return (
                        "text" === t ||
                        "password" === t ||
                        "select" === e ||
                        "textarea" === e
                      );
                    })(t))
                ) &&
                  ("audio" === r
                    ? !!t.hasAttribute("controls") && -1 !== s
                    : "video" === r
                    ? -1 !== s &&
                      (null !== s ||
                        this._platform.FIREFOX ||
                        t.hasAttribute("controls"))
                    : t.tabIndex >= 0);
          }
          isFocusable(t, i) {
            return (
              (function cB(n) {
                return (
                  !(function rB(n) {
                    return (
                      (function oB(n) {
                        return "input" == n.nodeName.toLowerCase();
                      })(n) && "hidden" == n.type
                    );
                  })(n) &&
                  ((function iB(n) {
                    let e = n.nodeName.toLowerCase();
                    return (
                      "input" === e ||
                      "select" === e ||
                      "button" === e ||
                      "textarea" === e
                    );
                  })(n) ||
                    (function sB(n) {
                      return (
                        (function aB(n) {
                          return "a" == n.nodeName.toLowerCase();
                        })(n) && n.hasAttribute("href")
                      );
                    })(n) ||
                    n.hasAttribute("contenteditable") ||
                    oD(n))
                );
              })(t) &&
              !this.isDisabled(t) &&
              ((null == i ? void 0 : i.ignoreVisibility) || this.isVisible(t))
            );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Cn));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function oD(n) {
        if (!n.hasAttribute("tabindex") || void 0 === n.tabIndex) return !1;
        let e = n.getAttribute("tabindex");
        return !(!e || isNaN(parseInt(e, 10)));
      }
      function aD(n) {
        if (!oD(n)) return null;
        const e = parseInt(n.getAttribute("tabindex") || "", 10);
        return isNaN(e) ? -1 : e;
      }
      class dB {
        constructor(e, t, i, r, s = !1) {
          (this._element = e),
            (this._checker = t),
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
        set enabled(e) {
          (this._enabled = e),
            this._startAnchor &&
              this._endAnchor &&
              (this._toggleAnchorTabIndex(e, this._startAnchor),
              this._toggleAnchorTabIndex(e, this._endAnchor));
        }
        destroy() {
          const e = this._startAnchor,
            t = this._endAnchor;
          e &&
            (e.removeEventListener("focus", this.startAnchorListener),
            e.remove()),
            t &&
              (t.removeEventListener("focus", this.endAnchorListener),
              t.remove()),
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
        focusInitialElementWhenReady(e) {
          return new Promise((t) => {
            this._executeOnStable(() => t(this.focusInitialElement(e)));
          });
        }
        focusFirstTabbableElementWhenReady(e) {
          return new Promise((t) => {
            this._executeOnStable(() => t(this.focusFirstTabbableElement(e)));
          });
        }
        focusLastTabbableElementWhenReady(e) {
          return new Promise((t) => {
            this._executeOnStable(() => t(this.focusLastTabbableElement(e)));
          });
        }
        _getRegionBoundary(e) {
          const t = this._element.querySelectorAll(
            `[cdk-focus-region-${e}], [cdkFocusRegion${e}], [cdk-focus-${e}]`
          );
          return "start" == e
            ? t.length
              ? t[0]
              : this._getFirstTabbableElement(this._element)
            : t.length
            ? t[t.length - 1]
            : this._getLastTabbableElement(this._element);
        }
        focusInitialElement(e) {
          const t = this._element.querySelector(
            "[cdk-focus-initial], [cdkFocusInitial]"
          );
          if (t) {
            if (!this._checker.isFocusable(t)) {
              const i = this._getFirstTabbableElement(t);
              return null == i || i.focus(e), !!i;
            }
            return t.focus(e), !0;
          }
          return this.focusFirstTabbableElement(e);
        }
        focusFirstTabbableElement(e) {
          const t = this._getRegionBoundary("start");
          return t && t.focus(e), !!t;
        }
        focusLastTabbableElement(e) {
          const t = this._getRegionBoundary("end");
          return t && t.focus(e), !!t;
        }
        hasAttached() {
          return this._hasAttached;
        }
        _getFirstTabbableElement(e) {
          if (this._checker.isFocusable(e) && this._checker.isTabbable(e))
            return e;
          const t = e.children;
          for (let i = 0; i < t.length; i++) {
            const r =
              t[i].nodeType === this._document.ELEMENT_NODE
                ? this._getFirstTabbableElement(t[i])
                : null;
            if (r) return r;
          }
          return null;
        }
        _getLastTabbableElement(e) {
          if (this._checker.isFocusable(e) && this._checker.isTabbable(e))
            return e;
          const t = e.children;
          for (let i = t.length - 1; i >= 0; i--) {
            const r =
              t[i].nodeType === this._document.ELEMENT_NODE
                ? this._getLastTabbableElement(t[i])
                : null;
            if (r) return r;
          }
          return null;
        }
        _createAnchor() {
          const e = this._document.createElement("div");
          return (
            this._toggleAnchorTabIndex(this._enabled, e),
            e.classList.add("cdk-visually-hidden"),
            e.classList.add("cdk-focus-trap-anchor"),
            e.setAttribute("aria-hidden", "true"),
            e
          );
        }
        _toggleAnchorTabIndex(e, t) {
          e ? t.setAttribute("tabindex", "0") : t.removeAttribute("tabindex");
        }
        toggleAnchors(e) {
          this._startAnchor &&
            this._endAnchor &&
            (this._toggleAnchorTabIndex(e, this._startAnchor),
            this._toggleAnchorTabIndex(e, this._endAnchor));
        }
        _executeOnStable(e) {
          this._ngZone.isStable
            ? e()
            : this._ngZone.onStable.pipe(ze(1)).subscribe(e);
        }
      }
      let lD = (() => {
        class n {
          constructor(t, i, r) {
            (this._checker = t), (this._ngZone = i), (this._document = r);
          }
          create(t, i = !1) {
            return new dB(t, this._checker, this._ngZone, this._document, i);
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Mf), C(re), C(Y));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function cD(n) {
        return 0 === n.buttons || (0 === n.offsetX && 0 === n.offsetY);
      }
      function uD(n) {
        const e =
          (n.touches && n.touches[0]) ||
          (n.changedTouches && n.changedTouches[0]);
        return !(
          !e ||
          -1 !== e.identifier ||
          (null != e.radiusX && 1 !== e.radiusX) ||
          (null != e.radiusY && 1 !== e.radiusY)
        );
      }
      const hB = new A("cdk-input-modality-detector-options"),
        fB = { ignoreKeys: [18, 17, 224, 91, 16] },
        vs = yf({ passive: !0, capture: !0 });
      let pB = (() => {
        class n {
          constructor(t, i, r, s) {
            (this._platform = t),
              (this._mostRecentTarget = null),
              (this._modality = new nn(null)),
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
              (this._options = Object.assign(Object.assign({}, fB), s)),
              (this.modalityDetected = this._modality.pipe(tD(1))),
              (this.modalityChanged = this.modalityDetected.pipe(nD())),
              t.isBrowser &&
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
          (n.ɵfac = function (t) {
            return new (t || n)(C(Cn), C(re), C(Y), C(hB, 8));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const gB = new A("cdk-focus-monitor-default-options"),
        sc = yf({ passive: !0, capture: !0 });
      let oc = (() => {
        class n {
          constructor(t, i, r, s, o) {
            (this._ngZone = t),
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
              (this._stopInputModalityDetector = new X()),
              (this._rootNodeFocusAndBlurListener = (a) => {
                const l = sr(a),
                  c = "focus" === a.type ? this._onFocus : this._onBlur;
                for (let u = l; u; u = u.parentElement) c.call(this, a, u);
              }),
              (this._document = s),
              (this._detectionMode =
                (null == o ? void 0 : o.detectionMode) || 0);
          }
          monitor(t, i = !1) {
            const r = ms(t);
            if (!this._platform.isBrowser || 1 !== r.nodeType) return P(null);
            const s =
                (function hV(n) {
                  if (
                    (function dV() {
                      if (null == vf) {
                        const n =
                          "undefined" != typeof document ? document.head : null;
                        vf = !(!n || (!n.createShadowRoot && !n.attachShadow));
                      }
                      return vf;
                    })()
                  ) {
                    const e = n.getRootNode ? n.getRootNode() : null;
                    if (
                      "undefined" != typeof ShadowRoot &&
                      ShadowRoot &&
                      e instanceof ShadowRoot
                    )
                      return e;
                  }
                  return null;
                })(r) || this._getDocument(),
              o = this._elementInfo.get(r);
            if (o) return i && (o.checkChildren = !0), o.subject;
            const a = { checkChildren: i, subject: new X(), rootNode: s };
            return (
              this._elementInfo.set(r, a),
              this._registerGlobalListeners(a),
              a.subject
            );
          }
          stopMonitoring(t) {
            const i = ms(t),
              r = this._elementInfo.get(i);
            r &&
              (r.subject.complete(),
              this._setClasses(i),
              this._elementInfo.delete(i),
              this._removeGlobalListeners(r));
          }
          focusVia(t, i, r) {
            const s = ms(t);
            s === this._getDocument().activeElement
              ? this._getClosestElementsInfo(s).forEach(([a, l]) =>
                  this._originChanged(a, i, l)
                )
              : (this._setOrigin(i),
                "function" == typeof s.focus && s.focus(r));
          }
          ngOnDestroy() {
            this._elementInfo.forEach((t, i) => this.stopMonitoring(i));
          }
          _getDocument() {
            return this._document || document;
          }
          _getWindow() {
            return this._getDocument().defaultView || window;
          }
          _getFocusOrigin(t) {
            return this._origin
              ? this._originFromTouchInteraction
                ? this._shouldBeAttributedToTouch(t)
                  ? "touch"
                  : "program"
                : this._origin
              : this._windowFocused && this._lastFocusOrigin
              ? this._lastFocusOrigin
              : "program";
          }
          _shouldBeAttributedToTouch(t) {
            return (
              1 === this._detectionMode ||
              !!(null == t
                ? void 0
                : t.contains(this._inputModalityDetector._mostRecentTarget))
            );
          }
          _setClasses(t, i) {
            t.classList.toggle("cdk-focused", !!i),
              t.classList.toggle("cdk-touch-focused", "touch" === i),
              t.classList.toggle("cdk-keyboard-focused", "keyboard" === i),
              t.classList.toggle("cdk-mouse-focused", "mouse" === i),
              t.classList.toggle("cdk-program-focused", "program" === i);
          }
          _setOrigin(t, i = !1) {
            this._ngZone.runOutsideAngular(() => {
              (this._origin = t),
                (this._originFromTouchInteraction = "touch" === t && i),
                0 === this._detectionMode &&
                  (clearTimeout(this._originTimeoutId),
                  (this._originTimeoutId = setTimeout(
                    () => (this._origin = null),
                    this._originFromTouchInteraction ? 650 : 1
                  )));
            });
          }
          _onFocus(t, i) {
            const r = this._elementInfo.get(i),
              s = sr(t);
            !r ||
              (!r.checkChildren && i !== s) ||
              this._originChanged(i, this._getFocusOrigin(s), r);
          }
          _onBlur(t, i) {
            const r = this._elementInfo.get(i);
            !r ||
              (r.checkChildren &&
                t.relatedTarget instanceof Node &&
                i.contains(t.relatedTarget)) ||
              (this._setClasses(i), this._emitOrigin(r.subject, null));
          }
          _emitOrigin(t, i) {
            this._ngZone.run(() => t.next(i));
          }
          _registerGlobalListeners(t) {
            if (!this._platform.isBrowser) return;
            const i = t.rootNode,
              r = this._rootNodeFocusListenerCount.get(i) || 0;
            r ||
              this._ngZone.runOutsideAngular(() => {
                i.addEventListener(
                  "focus",
                  this._rootNodeFocusAndBlurListener,
                  sc
                ),
                  i.addEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    sc
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
                  .pipe(wi(this._stopInputModalityDetector))
                  .subscribe((s) => {
                    this._setOrigin(s, !0);
                  }));
          }
          _removeGlobalListeners(t) {
            const i = t.rootNode;
            if (this._rootNodeFocusListenerCount.has(i)) {
              const r = this._rootNodeFocusListenerCount.get(i);
              r > 1
                ? this._rootNodeFocusListenerCount.set(i, r - 1)
                : (i.removeEventListener(
                    "focus",
                    this._rootNodeFocusAndBlurListener,
                    sc
                  ),
                  i.removeEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    sc
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
          _originChanged(t, i, r) {
            this._setClasses(t, i),
              this._emitOrigin(r.subject, i),
              (this._lastFocusOrigin = i);
          }
          _getClosestElementsInfo(t) {
            const i = [];
            return (
              this._elementInfo.forEach((r, s) => {
                (s === t || (r.checkChildren && s.contains(t))) &&
                  i.push([s, r]);
              }),
              i
            );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(re), C(Cn), C(pB), C(Y, 8), C(gB, 8));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      const hD = "cdk-high-contrast-black-on-white",
        fD = "cdk-high-contrast-white-on-black",
        Sf = "cdk-high-contrast-active";
      let _B = (() => {
        class n {
          constructor(t, i) {
            (this._platform = t), (this._document = i);
          }
          getHighContrastMode() {
            if (!this._platform.isBrowser) return 0;
            const t = this._document.createElement("div");
            (t.style.backgroundColor = "rgb(1,2,3)"),
              (t.style.position = "absolute"),
              this._document.body.appendChild(t);
            const i = this._document.defaultView || window,
              r = i && i.getComputedStyle ? i.getComputedStyle(t) : null,
              s = ((r && r.backgroundColor) || "").replace(/ /g, "");
            switch ((t.remove(), s)) {
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
              const t = this._document.body.classList;
              t.remove(Sf),
                t.remove(hD),
                t.remove(fD),
                (this._hasCheckedHighContrastMode = !0);
              const i = this.getHighContrastMode();
              1 === i
                ? (t.add(Sf), t.add(hD))
                : 2 === i && (t.add(Sf), t.add(fD));
            }
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Cn), C(Y));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      class pD {}
      const oi = "*";
      function qo(n, e) {
        return { type: 7, name: n, definitions: e, options: {} };
      }
      function Di(n, e = null) {
        return { type: 4, styles: e, timings: n };
      }
      function ac(n, e = null) {
        return { type: 3, steps: n, options: e };
      }
      function mD(n, e = null) {
        return { type: 2, steps: n, options: e };
      }
      function St(n) {
        return { type: 6, styles: n, offset: null };
      }
      function jn(n, e, t) {
        return { type: 0, name: n, styles: e, options: t };
      }
      function Ei(n, e, t = null) {
        return { type: 1, expr: n, animation: e, options: t };
      }
      function lc(n = null) {
        return { type: 9, options: n };
      }
      function cc(n, e, t = null) {
        return { type: 11, selector: n, animation: e, options: t };
      }
      function gD(n) {
        Promise.resolve(null).then(n);
      }
      class bs {
        constructor(e = 0, t = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = e + t);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
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
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
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
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this._started = !1;
        }
        setPosition(e) {
          this._position = this.totalTime ? e * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((i) => i()), (t.length = 0);
        }
      }
      class _D {
        constructor(e) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = e);
          let t = 0,
            i = 0,
            r = 0;
          const s = this.players.length;
          0 == s
            ? gD(() => this._onFinish())
            : this.players.forEach((o) => {
                o.onDone(() => {
                  ++t == s && this._onFinish();
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
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((e) => e.init());
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((e) => e()),
            (this._onStartFns = []));
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((e) => e.play());
        }
        pause() {
          this.players.forEach((e) => e.pause());
        }
        restart() {
          this.players.forEach((e) => e.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((e) => e.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((e) => e.destroy()),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((e) => e.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(e) {
          const t = e * this.totalTime;
          this.players.forEach((i) => {
            const r = i.totalTime ? Math.min(1, t / i.totalTime) : 1;
            i.setPosition(r);
          });
        }
        getPosition() {
          const e = this.players.reduce(
            (t, i) => (null === t || i.totalTime > t.totalTime ? i : t),
            null
          );
          return null != e ? e.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((e) => {
            e.beforeDestroy && e.beforeDestroy();
          });
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((i) => i()), (t.length = 0);
        }
      }
      function yD() {
        return "undefined" != typeof window && void 0 !== window.document;
      }
      function Af() {
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
      function vD(n, e, t, i, r = {}, s = {}) {
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
              let _ = p,
                b = u[p];
              if ("offset" !== p)
                switch (((_ = e.normalizePropertyName(_, o)), b)) {
                  case "!":
                    b = r[p];
                    break;
                  case oi:
                    b = s[p];
                    break;
                  default:
                    b = e.normalizeStyleValue(p, _, b, o);
                }
              f[_] = b;
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
      function Tf(n, e, t, i) {
        switch (e) {
          case "start":
            n.onStart(() => i(t && If(t, "start", n)));
            break;
          case "done":
            n.onDone(() => i(t && If(t, "done", n)));
            break;
          case "destroy":
            n.onDestroy(() => i(t && If(t, "destroy", n)));
        }
      }
      function If(n, e, t) {
        const i = t.totalTime,
          s = Rf(
            n.element,
            n.triggerName,
            n.fromState,
            n.toState,
            e || n.phaseName,
            null == i ? n.totalTime : i,
            !!t.disabled
          ),
          o = n._data;
        return null != o && (s._data = o), s;
      }
      function Rf(n, e, t, i, r = "", s = 0, o) {
        return {
          element: n,
          triggerName: e,
          fromState: t,
          toState: i,
          phaseName: r,
          totalTime: s,
          disabled: !!o,
        };
      }
      function Bt(n, e, t) {
        let i;
        return (
          n instanceof Map
            ? ((i = n.get(e)), i || n.set(e, (i = t)))
            : ((i = n[e]), i || (i = n[e] = t)),
          i
        );
      }
      function bD(n) {
        const e = n.indexOf(":");
        return [n.substring(1, e), n.substr(e + 1)];
      }
      let kf = (n, e) => !1,
        CD = (n, e, t) => [];
      (Af() || "undefined" != typeof Element) &&
        ((kf = yD()
          ? (n, e) => {
              for (; e && e !== document.documentElement; ) {
                if (e === n) return !0;
                e = e.parentNode || e.host;
              }
              return !1;
            }
          : (n, e) => n.contains(e)),
        (CD = (n, e, t) => {
          if (t) return Array.from(n.querySelectorAll(e));
          const i = n.querySelector(e);
          return i ? [i] : [];
        }));
      let ar = null,
        wD = !1;
      function Of(n) {
        ar ||
          ((ar =
            (function bB() {
              return "undefined" != typeof document ? document.body : null;
            })() || {}),
          (wD = !!ar.style && "WebkitAppearance" in ar.style));
        let e = !0;
        return (
          ar.style &&
            !(function vB(n) {
              return "ebkit" == n.substring(1, 6);
            })(n) &&
            ((e = n in ar.style),
            !e &&
              wD &&
              (e =
                "Webkit" + n.charAt(0).toUpperCase() + n.substr(1) in
                ar.style)),
          e
        );
      }
      const Ff = kf,
        Pf = CD;
      function DD(n) {
        const e = {};
        return (
          Object.keys(n).forEach((t) => {
            const i = t.replace(/([a-z])([A-Z])/g, "$1-$2");
            e[i] = n[t];
          }),
          e
        );
      }
      let ED = (() => {
          class n {
            validateStyleProperty(t) {
              return Of(t);
            }
            matchesElement(t, i) {
              return !1;
            }
            containsElement(t, i) {
              return Ff(t, i);
            }
            query(t, i, r) {
              return Pf(t, i, r);
            }
            computeStyle(t, i, r) {
              return r || "";
            }
            animate(t, i, r, s, o, a = [], l) {
              return new bs(r, s);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        Nf = (() => {
          class n {}
          return (n.NOOP = new ED()), n;
        })();
      const Lf = "ng-enter",
        uc = "ng-leave",
        dc = "ng-trigger",
        hc = ".ng-trigger",
        SD = "ng-animating",
        Vf = ".ng-animating";
      function lr(n) {
        if ("number" == typeof n) return n;
        const e = n.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : Bf(parseFloat(e[1]), e[2]);
      }
      function Bf(n, e) {
        return "s" === e ? 1e3 * n : n;
      }
      function fc(n, e, t) {
        return n.hasOwnProperty("duration")
          ? n
          : (function DB(n, e, t) {
              let r,
                s = 0,
                o = "";
              if ("string" == typeof n) {
                const a = n.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return (
                    e.push(`The provided timing value "${n}" is invalid.`),
                    { duration: 0, delay: 0, easing: "" }
                  );
                r = Bf(parseFloat(a[1]), a[2]);
                const l = a[3];
                null != l && (s = Bf(parseFloat(l), a[4]));
                const c = a[5];
                c && (o = c);
              } else r = n;
              if (!t) {
                let a = !1,
                  l = e.length;
                r < 0 &&
                  (e.push(
                    "Duration values below 0 are not allowed for this animation step."
                  ),
                  (a = !0)),
                  s < 0 &&
                    (e.push(
                      "Delay values below 0 are not allowed for this animation step."
                    ),
                    (a = !0)),
                  a &&
                    e.splice(
                      l,
                      0,
                      `The provided timing value "${n}" is invalid.`
                    );
              }
              return { duration: r, delay: s, easing: o };
            })(n, e, t);
      }
      function Cs(n, e = {}) {
        return (
          Object.keys(n).forEach((t) => {
            e[t] = n[t];
          }),
          e
        );
      }
      function Si(n, e, t = {}) {
        if (e) for (let i in n) t[i] = n[i];
        else Cs(n, t);
        return t;
      }
      function AD(n, e, t) {
        return t ? e + ":" + t + ";" : "";
      }
      function TD(n) {
        let e = "";
        for (let t = 0; t < n.style.length; t++) {
          const i = n.style.item(t);
          e += AD(0, i, n.style.getPropertyValue(i));
        }
        for (const t in n.style)
          n.style.hasOwnProperty(t) &&
            !t.startsWith("_") &&
            (e += AD(0, SB(t), n.style[t]));
        n.setAttribute("style", e);
      }
      function Hn(n, e, t) {
        n.style &&
          (Object.keys(e).forEach((i) => {
            const r = Hf(i);
            t && !t.hasOwnProperty(i) && (t[i] = n.style[r]),
              (n.style[r] = e[i]);
          }),
          Af() && TD(n));
      }
      function cr(n, e) {
        n.style &&
          (Object.keys(e).forEach((t) => {
            const i = Hf(t);
            n.style[i] = "";
          }),
          Af() && TD(n));
      }
      function Ko(n) {
        return Array.isArray(n) ? (1 == n.length ? n[0] : mD(n)) : n;
      }
      const jf = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function ID(n) {
        let e = [];
        if ("string" == typeof n) {
          let t;
          for (; (t = jf.exec(n)); ) e.push(t[1]);
          jf.lastIndex = 0;
        }
        return e;
      }
      function pc(n, e, t) {
        const i = n.toString(),
          r = i.replace(jf, (s, o) => {
            let a = e[o];
            return (
              e.hasOwnProperty(o) ||
                (t.push(`Please provide a value for the animation param ${o}`),
                (a = "")),
              a.toString()
            );
          });
        return r == i ? n : r;
      }
      function mc(n) {
        const e = [];
        let t = n.next();
        for (; !t.done; ) e.push(t.value), (t = n.next());
        return e;
      }
      const MB = /-+([a-z0-9])/g;
      function Hf(n) {
        return n.replace(MB, (...e) => e[1].toUpperCase());
      }
      function SB(n) {
        return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function RD(n, e) {
        return 0 === n || 0 === e;
      }
      function kD(n, e, t) {
        const i = Object.keys(t);
        if (i.length && e.length) {
          let s = e[0],
            o = [];
          if (
            (i.forEach((a) => {
              s.hasOwnProperty(a) || o.push(a), (s[a] = t[a]);
            }),
            o.length)
          )
            for (var r = 1; r < e.length; r++) {
              let a = e[r];
              o.forEach(function (l) {
                a[l] = Uf(n, l);
              });
            }
        }
        return e;
      }
      function jt(n, e, t) {
        switch (e.type) {
          case 7:
            return n.visitTrigger(e, t);
          case 0:
            return n.visitState(e, t);
          case 1:
            return n.visitTransition(e, t);
          case 2:
            return n.visitSequence(e, t);
          case 3:
            return n.visitGroup(e, t);
          case 4:
            return n.visitAnimate(e, t);
          case 5:
            return n.visitKeyframes(e, t);
          case 6:
            return n.visitStyle(e, t);
          case 8:
            return n.visitReference(e, t);
          case 9:
            return n.visitAnimateChild(e, t);
          case 10:
            return n.visitAnimateRef(e, t);
          case 11:
            return n.visitQuery(e, t);
          case 12:
            return n.visitStagger(e, t);
          default:
            throw new Error(
              `Unable to resolve animation metadata node #${e.type}`
            );
        }
      }
      function Uf(n, e) {
        return window.getComputedStyle(n)[e];
      }
      function xB(n, e) {
        const t = [];
        return (
          "string" == typeof n
            ? n.split(/\s*,\s*/).forEach((i) =>
                (function AB(n, e, t) {
                  if (":" == n[0]) {
                    const l = (function TB(n, e) {
                      switch (n) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (t, i) => parseFloat(i) > parseFloat(t);
                        case ":decrement":
                          return (t, i) => parseFloat(i) < parseFloat(t);
                        default:
                          return (
                            e.push(
                              `The transition alias value "${n}" is not supported`
                            ),
                            "* => *"
                          );
                      }
                    })(n, t);
                    if ("function" == typeof l) return void e.push(l);
                    n = l;
                  }
                  const i = n.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == i || i.length < 4)
                    return (
                      t.push(
                        `The provided transition expression "${n}" is not supported`
                      ),
                      e
                    );
                  const r = i[1],
                    s = i[2],
                    o = i[3];
                  e.push(OD(r, o));
                  "<" == s[0] && !("*" == r && "*" == o) && e.push(OD(o, r));
                })(i, t, e)
              )
            : t.push(n),
          t
        );
      }
      const _c = new Set(["true", "1"]),
        yc = new Set(["false", "0"]);
      function OD(n, e) {
        const t = _c.has(n) || yc.has(n),
          i = _c.has(e) || yc.has(e);
        return (r, s) => {
          let o = "*" == n || n == r,
            a = "*" == e || e == s;
          return (
            !o && t && "boolean" == typeof r && (o = r ? _c.has(n) : yc.has(n)),
            !a && i && "boolean" == typeof s && (a = s ? _c.has(e) : yc.has(e)),
            o && a
          );
        };
      }
      const IB = new RegExp("s*:selfs*,?", "g");
      function $f(n, e, t) {
        return new RB(n).build(e, t);
      }
      class RB {
        constructor(e) {
          this._driver = e;
        }
        build(e, t) {
          const i = new FB(t);
          return this._resetContextStyleTimingState(i), jt(this, Ko(e), i);
        }
        _resetContextStyleTimingState(e) {
          (e.currentQuerySelector = ""),
            (e.collectedStyles = {}),
            (e.collectedStyles[""] = {}),
            (e.currentTime = 0);
        }
        visitTrigger(e, t) {
          let i = (t.queryCount = 0),
            r = (t.depCount = 0);
          const s = [],
            o = [];
          return (
            "@" == e.name.charAt(0) &&
              t.errors.push(
                "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
              ),
            e.definitions.forEach((a) => {
              if ((this._resetContextStyleTimingState(t), 0 == a.type)) {
                const l = a,
                  c = l.name;
                c
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((u) => {
                    (l.name = u), s.push(this.visitState(l, t));
                  }),
                  (l.name = c);
              } else if (1 == a.type) {
                const l = this.visitTransition(a, t);
                (i += l.queryCount), (r += l.depCount), o.push(l);
              } else
                t.errors.push(
                  "only state() and transition() definitions can sit inside of a trigger()"
                );
            }),
            {
              type: 7,
              name: e.name,
              states: s,
              transitions: o,
              queryCount: i,
              depCount: r,
              options: null,
            }
          );
        }
        visitState(e, t) {
          const i = this.visitStyle(e.styles, t),
            r = (e.options && e.options.params) || null;
          if (i.containsDynamicStyles) {
            const s = new Set(),
              o = r || {};
            if (
              (i.styles.forEach((a) => {
                if (vc(a)) {
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
              const a = mc(s.values());
              t.errors.push(
                `state("${
                  e.name
                }", ...) must define default values for all the following style substitutions: ${a.join(
                  ", "
                )}`
              );
            }
          }
          return {
            type: 0,
            name: e.name,
            style: i,
            options: r ? { params: r } : null,
          };
        }
        visitTransition(e, t) {
          (t.queryCount = 0), (t.depCount = 0);
          const i = jt(this, Ko(e.animation), t);
          return {
            type: 1,
            matchers: xB(e.expr, t.errors),
            animation: i,
            queryCount: t.queryCount,
            depCount: t.depCount,
            options: ur(e.options),
          };
        }
        visitSequence(e, t) {
          return {
            type: 2,
            steps: e.steps.map((i) => jt(this, i, t)),
            options: ur(e.options),
          };
        }
        visitGroup(e, t) {
          const i = t.currentTime;
          let r = 0;
          const s = e.steps.map((o) => {
            t.currentTime = i;
            const a = jt(this, o, t);
            return (r = Math.max(r, t.currentTime)), a;
          });
          return (
            (t.currentTime = r), { type: 3, steps: s, options: ur(e.options) }
          );
        }
        visitAnimate(e, t) {
          const i = (function NB(n, e) {
            let t = null;
            if (n.hasOwnProperty("duration")) t = n;
            else if ("number" == typeof n) return zf(fc(n, e).duration, 0, "");
            const i = n;
            if (
              i
                .split(/\s+/)
                .some((s) => "{" == s.charAt(0) && "{" == s.charAt(1))
            ) {
              const s = zf(0, 0, "");
              return (s.dynamic = !0), (s.strValue = i), s;
            }
            return (t = t || fc(i, e)), zf(t.duration, t.delay, t.easing);
          })(e.timings, t.errors);
          t.currentAnimateTimings = i;
          let r,
            s = e.styles ? e.styles : St({});
          if (5 == s.type) r = this.visitKeyframes(s, t);
          else {
            let o = e.styles,
              a = !1;
            if (!o) {
              a = !0;
              const c = {};
              i.easing && (c.easing = i.easing), (o = St(c));
            }
            t.currentTime += i.duration + i.delay;
            const l = this.visitStyle(o, t);
            (l.isEmptyStep = a), (r = l);
          }
          return (
            (t.currentAnimateTimings = null),
            { type: 4, timings: i, style: r, options: null }
          );
        }
        visitStyle(e, t) {
          const i = this._makeStyleAst(e, t);
          return this._validateStyleAst(i, t), i;
        }
        _makeStyleAst(e, t) {
          const i = [];
          Array.isArray(e.styles)
            ? e.styles.forEach((o) => {
                "string" == typeof o
                  ? o == oi
                    ? i.push(o)
                    : t.errors.push(
                        `The provided style string value ${o} is not allowed.`
                      )
                  : i.push(o);
              })
            : i.push(e.styles);
          let r = !1,
            s = null;
          return (
            i.forEach((o) => {
              if (vc(o)) {
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
              offset: e.offset,
              containsDynamicStyles: r,
              options: null,
            }
          );
        }
        _validateStyleAst(e, t) {
          const i = t.currentAnimateTimings;
          let r = t.currentTime,
            s = t.currentTime;
          i && s > 0 && (s -= i.duration + i.delay),
            e.styles.forEach((o) => {
              "string" != typeof o &&
                Object.keys(o).forEach((a) => {
                  if (!this._driver.validateStyleProperty(a))
                    return void t.errors.push(
                      `The provided animation property "${a}" is not a supported CSS property for animations`
                    );
                  const l = t.collectedStyles[t.currentQuerySelector],
                    c = l[a];
                  let u = !0;
                  c &&
                    (s != r &&
                      s >= c.startTime &&
                      r <= c.endTime &&
                      (t.errors.push(
                        `The CSS property "${a}" that exists between the times of "${c.startTime}ms" and "${c.endTime}ms" is also being animated in a parallel animation between the times of "${s}ms" and "${r}ms"`
                      ),
                      (u = !1)),
                    (s = c.startTime)),
                    u && (l[a] = { startTime: s, endTime: r }),
                    t.options &&
                      (function EB(n, e, t) {
                        const i = e.params || {},
                          r = ID(n);
                        r.length &&
                          r.forEach((s) => {
                            i.hasOwnProperty(s) ||
                              t.push(
                                `Unable to resolve the local animation param ${s} in the given list of values`
                              );
                          });
                      })(o[a], t.options, t.errors);
                });
            });
        }
        visitKeyframes(e, t) {
          const i = { type: 5, styles: [], options: null };
          if (!t.currentAnimateTimings)
            return (
              t.errors.push(
                "keyframes() must be placed inside of a call to animate()"
              ),
              i
            );
          let s = 0;
          const o = [];
          let a = !1,
            l = !1,
            c = 0;
          const u = e.steps.map((w) => {
            const v = this._makeStyleAst(w, t);
            let M =
                null != v.offset
                  ? v.offset
                  : (function PB(n) {
                      if ("string" == typeof n) return null;
                      let e = null;
                      if (Array.isArray(n))
                        n.forEach((t) => {
                          if (vc(t) && t.hasOwnProperty("offset")) {
                            const i = t;
                            (e = parseFloat(i.offset)), delete i.offset;
                          }
                        });
                      else if (vc(n) && n.hasOwnProperty("offset")) {
                        const t = n;
                        (e = parseFloat(t.offset)), delete t.offset;
                      }
                      return e;
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
            t.errors.push(
              "Please ensure that all keyframe offsets are between 0 and 1"
            ),
            a &&
              t.errors.push(
                "Please ensure that all keyframe offsets are in order"
              );
          const d = e.steps.length;
          let h = 0;
          s > 0 && s < d
            ? t.errors.push(
                "Not all style() steps within the declared keyframes() contain offsets"
              )
            : 0 == s && (h = 1 / (d - 1));
          const f = d - 1,
            p = t.currentTime,
            _ = t.currentAnimateTimings,
            b = _.duration;
          return (
            u.forEach((w, v) => {
              const M = h > 0 ? (v == f ? 1 : h * v) : o[v],
                T = M * b;
              (t.currentTime = p + _.delay + T),
                (_.duration = T),
                this._validateStyleAst(w, t),
                (w.offset = M),
                i.styles.push(w);
            }),
            i
          );
        }
        visitReference(e, t) {
          return {
            type: 8,
            animation: jt(this, Ko(e.animation), t),
            options: ur(e.options),
          };
        }
        visitAnimateChild(e, t) {
          return t.depCount++, { type: 9, options: ur(e.options) };
        }
        visitAnimateRef(e, t) {
          return {
            type: 10,
            animation: this.visitReference(e.animation, t),
            options: ur(e.options),
          };
        }
        visitQuery(e, t) {
          const i = t.currentQuerySelector,
            r = e.options || {};
          t.queryCount++, (t.currentQuery = e);
          const [s, o] = (function kB(n) {
            const e = !!n.split(/\s*,\s*/).find((t) => ":self" == t);
            return (
              e && (n = n.replace(IB, "")),
              (n = n
                .replace(/@\*/g, hc)
                .replace(/@\w+/g, (t) => hc + "-" + t.substr(1))
                .replace(/:animating/g, Vf)),
              [n, e]
            );
          })(e.selector);
          (t.currentQuerySelector = i.length ? i + " " + s : s),
            Bt(t.collectedStyles, t.currentQuerySelector, {});
          const a = jt(this, Ko(e.animation), t);
          return (
            (t.currentQuery = null),
            (t.currentQuerySelector = i),
            {
              type: 11,
              selector: s,
              limit: r.limit || 0,
              optional: !!r.optional,
              includeSelf: o,
              animation: a,
              originalSelector: e.selector,
              options: ur(e.options),
            }
          );
        }
        visitStagger(e, t) {
          t.currentQuery ||
            t.errors.push("stagger() can only be used inside of query()");
          const i =
            "full" === e.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : fc(e.timings, t.errors, !0);
          return {
            type: 12,
            animation: jt(this, Ko(e.animation), t),
            timings: i,
            options: null,
          };
        }
      }
      class FB {
        constructor(e) {
          (this.errors = e),
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
      function vc(n) {
        return !Array.isArray(n) && "object" == typeof n;
      }
      function ur(n) {
        return (
          n
            ? (n = Cs(n)).params &&
              (n.params = (function OB(n) {
                return n ? Cs(n) : null;
              })(n.params))
            : (n = {}),
          n
        );
      }
      function zf(n, e, t) {
        return { duration: n, delay: e, easing: t };
      }
      function Gf(n, e, t, i, r, s, o = null, a = !1) {
        return {
          type: 1,
          element: n,
          keyframes: e,
          preStyleProps: t,
          postStyleProps: i,
          duration: r,
          delay: s,
          totalTime: r + s,
          easing: o,
          subTimeline: a,
        };
      }
      class bc {
        constructor() {
          this._map = new Map();
        }
        get(e) {
          return this._map.get(e) || [];
        }
        append(e, t) {
          let i = this._map.get(e);
          i || this._map.set(e, (i = [])), i.push(...t);
        }
        has(e) {
          return this._map.has(e);
        }
        clear() {
          this._map.clear();
        }
      }
      const BB = new RegExp(":enter", "g"),
        HB = new RegExp(":leave", "g");
      function Wf(n, e, t, i, r, s = {}, o = {}, a, l, c = []) {
        return new UB().buildKeyframes(n, e, t, i, r, s, o, a, l, c);
      }
      class UB {
        buildKeyframes(e, t, i, r, s, o, a, l, c, u = []) {
          c = c || new bc();
          const d = new qf(e, t, c, r, s, u, []);
          (d.options = l),
            d.currentTimeline.setStyles([o], null, d.errors, l),
            jt(this, i, d);
          const h = d.timelines.filter((f) => f.containsAnimation());
          if (Object.keys(a).length) {
            let f;
            for (let p = h.length - 1; p >= 0; p--) {
              const _ = h[p];
              if (_.element === t) {
                f = _;
                break;
              }
            }
            f &&
              !f.allowOnlyTimelineStyles() &&
              f.setStyles([a], null, d.errors, l);
          }
          return h.length
            ? h.map((f) => f.buildKeyframes())
            : [Gf(t, [], [], [], 0, 0, "", !1)];
        }
        visitTrigger(e, t) {}
        visitState(e, t) {}
        visitTransition(e, t) {}
        visitAnimateChild(e, t) {
          const i = t.subInstructions.get(t.element);
          if (i) {
            const r = t.createSubContext(e.options),
              s = t.currentTimeline.currentTime,
              o = this._visitSubInstructions(i, r, r.options);
            s != o && t.transformIntoNewTimeline(o);
          }
          t.previousNode = e;
        }
        visitAnimateRef(e, t) {
          const i = t.createSubContext(e.options);
          i.transformIntoNewTimeline(),
            this.visitReference(e.animation, i),
            t.transformIntoNewTimeline(i.currentTimeline.currentTime),
            (t.previousNode = e);
        }
        _visitSubInstructions(e, t, i) {
          let s = t.currentTimeline.currentTime;
          const o = null != i.duration ? lr(i.duration) : null,
            a = null != i.delay ? lr(i.delay) : null;
          return (
            0 !== o &&
              e.forEach((l) => {
                const c = t.appendInstructionToTimeline(l, o, a);
                s = Math.max(s, c.duration + c.delay);
              }),
            s
          );
        }
        visitReference(e, t) {
          t.updateOptions(e.options, !0),
            jt(this, e.animation, t),
            (t.previousNode = e);
        }
        visitSequence(e, t) {
          const i = t.subContextCount;
          let r = t;
          const s = e.options;
          if (
            s &&
            (s.params || s.delay) &&
            ((r = t.createSubContext(s)),
            r.transformIntoNewTimeline(),
            null != s.delay)
          ) {
            6 == r.previousNode.type &&
              (r.currentTimeline.snapshotCurrentStyles(),
              (r.previousNode = Cc));
            const o = lr(s.delay);
            r.delayNextStep(o);
          }
          e.steps.length &&
            (e.steps.forEach((o) => jt(this, o, r)),
            r.currentTimeline.applyStylesToKeyframe(),
            r.subContextCount > i && r.transformIntoNewTimeline()),
            (t.previousNode = e);
        }
        visitGroup(e, t) {
          const i = [];
          let r = t.currentTimeline.currentTime;
          const s = e.options && e.options.delay ? lr(e.options.delay) : 0;
          e.steps.forEach((o) => {
            const a = t.createSubContext(e.options);
            s && a.delayNextStep(s),
              jt(this, o, a),
              (r = Math.max(r, a.currentTimeline.currentTime)),
              i.push(a.currentTimeline);
          }),
            i.forEach((o) => t.currentTimeline.mergeTimelineCollectedStyles(o)),
            t.transformIntoNewTimeline(r),
            (t.previousNode = e);
        }
        _visitTiming(e, t) {
          if (e.dynamic) {
            const i = e.strValue;
            return fc(t.params ? pc(i, t.params, t.errors) : i, t.errors);
          }
          return { duration: e.duration, delay: e.delay, easing: e.easing };
        }
        visitAnimate(e, t) {
          const i = (t.currentAnimateTimings = this._visitTiming(e.timings, t)),
            r = t.currentTimeline;
          i.delay && (t.incrementTime(i.delay), r.snapshotCurrentStyles());
          const s = e.style;
          5 == s.type
            ? this.visitKeyframes(s, t)
            : (t.incrementTime(i.duration),
              this.visitStyle(s, t),
              r.applyStylesToKeyframe()),
            (t.currentAnimateTimings = null),
            (t.previousNode = e);
        }
        visitStyle(e, t) {
          const i = t.currentTimeline,
            r = t.currentAnimateTimings;
          !r && i.getCurrentStyleProperties().length && i.forwardFrame();
          const s = (r && r.easing) || e.easing;
          e.isEmptyStep
            ? i.applyEmptyStep(s)
            : i.setStyles(e.styles, s, t.errors, t.options),
            (t.previousNode = e);
        }
        visitKeyframes(e, t) {
          const i = t.currentAnimateTimings,
            r = t.currentTimeline.duration,
            s = i.duration,
            a = t.createSubContext().currentTimeline;
          (a.easing = i.easing),
            e.styles.forEach((l) => {
              a.forwardTime((l.offset || 0) * s),
                a.setStyles(l.styles, l.easing, t.errors, t.options),
                a.applyStylesToKeyframe();
            }),
            t.currentTimeline.mergeTimelineCollectedStyles(a),
            t.transformIntoNewTimeline(r + s),
            (t.previousNode = e);
        }
        visitQuery(e, t) {
          const i = t.currentTimeline.currentTime,
            r = e.options || {},
            s = r.delay ? lr(r.delay) : 0;
          s &&
            (6 === t.previousNode.type ||
              (0 == i &&
                t.currentTimeline.getCurrentStyleProperties().length)) &&
            (t.currentTimeline.snapshotCurrentStyles(), (t.previousNode = Cc));
          let o = i;
          const a = t.invokeQuery(
            e.selector,
            e.originalSelector,
            e.limit,
            e.includeSelf,
            !!r.optional,
            t.errors
          );
          t.currentQueryTotal = a.length;
          let l = null;
          a.forEach((c, u) => {
            t.currentQueryIndex = u;
            const d = t.createSubContext(e.options, c);
            s && d.delayNextStep(s),
              c === t.element && (l = d.currentTimeline),
              jt(this, e.animation, d),
              d.currentTimeline.applyStylesToKeyframe(),
              (o = Math.max(o, d.currentTimeline.currentTime));
          }),
            (t.currentQueryIndex = 0),
            (t.currentQueryTotal = 0),
            t.transformIntoNewTimeline(o),
            l &&
              (t.currentTimeline.mergeTimelineCollectedStyles(l),
              t.currentTimeline.snapshotCurrentStyles()),
            (t.previousNode = e);
        }
        visitStagger(e, t) {
          const i = t.parentContext,
            r = t.currentTimeline,
            s = e.timings,
            o = Math.abs(s.duration),
            a = o * (t.currentQueryTotal - 1);
          let l = o * t.currentQueryIndex;
          switch (s.duration < 0 ? "reverse" : s.easing) {
            case "reverse":
              l = a - l;
              break;
            case "full":
              l = i.currentStaggerTime;
          }
          const u = t.currentTimeline;
          l && u.delayNextStep(l);
          const d = u.currentTime;
          jt(this, e.animation, t),
            (t.previousNode = e),
            (i.currentStaggerTime =
              r.currentTime - d + (r.startTime - i.currentTimeline.startTime));
        }
      }
      const Cc = {};
      class qf {
        constructor(e, t, i, r, s, o, a, l) {
          (this._driver = e),
            (this.element = t),
            (this.subInstructions = i),
            (this._enterClassName = r),
            (this._leaveClassName = s),
            (this.errors = o),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = Cc),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new wc(this._driver, t, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(e, t) {
          if (!e) return;
          const i = e;
          let r = this.options;
          null != i.duration && (r.duration = lr(i.duration)),
            null != i.delay && (r.delay = lr(i.delay));
          const s = i.params;
          if (s) {
            let o = r.params;
            o || (o = this.options.params = {}),
              Object.keys(s).forEach((a) => {
                (!t || !o.hasOwnProperty(a)) &&
                  (o[a] = pc(s[a], o, this.errors));
              });
          }
        }
        _copyOptions() {
          const e = {};
          if (this.options) {
            const t = this.options.params;
            if (t) {
              const i = (e.params = {});
              Object.keys(t).forEach((r) => {
                i[r] = t[r];
              });
            }
          }
          return e;
        }
        createSubContext(e = null, t, i) {
          const r = t || this.element,
            s = new qf(
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
            s.updateOptions(e),
            (s.currentQueryIndex = this.currentQueryIndex),
            (s.currentQueryTotal = this.currentQueryTotal),
            (s.parentContext = this),
            this.subContextCount++,
            s
          );
        }
        transformIntoNewTimeline(e) {
          return (
            (this.previousNode = Cc),
            (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(e, t, i) {
          const r = {
              duration: null != t ? t : e.duration,
              delay:
                this.currentTimeline.currentTime +
                (null != i ? i : 0) +
                e.delay,
              easing: "",
            },
            s = new $B(
              this._driver,
              e.element,
              e.keyframes,
              e.preStyleProps,
              e.postStyleProps,
              r,
              e.stretchStartingKeyframe
            );
          return this.timelines.push(s), r;
        }
        incrementTime(e) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
        }
        delayNextStep(e) {
          e > 0 && this.currentTimeline.delayNextStep(e);
        }
        invokeQuery(e, t, i, r, s, o) {
          let a = [];
          if ((r && a.push(this.element), e.length > 0)) {
            e = (e = e.replace(BB, "." + this._enterClassName)).replace(
              HB,
              "." + this._leaveClassName
            );
            let c = this._driver.query(this.element, e, 1 != i);
            0 !== i &&
              (c = i < 0 ? c.slice(c.length + i, c.length) : c.slice(0, i)),
              a.push(...c);
          }
          return (
            !s &&
              0 == a.length &&
              o.push(
                `\`query("${t}")\` returned zero elements. (Use \`query("${t}", { optional: true })\` if you wish to allow this.)`
              ),
            a
          );
        }
      }
      class wc {
        constructor(e, t, i, r) {
          (this._driver = e),
            (this.element = t),
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
              this._elementTimelineStylesLookup.get(t)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                t,
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
        delayNextStep(e) {
          const t =
            1 == this._keyframes.size &&
            Object.keys(this._pendingStyles).length;
          this.duration || t
            ? (this.forwardTime(this.currentTime + e),
              t && this.snapshotCurrentStyles())
            : (this.startTime += e);
        }
        fork(e, t) {
          return (
            this.applyStylesToKeyframe(),
            new wc(
              this._driver,
              e,
              t || this.currentTime,
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
        forwardTime(e) {
          this.applyStylesToKeyframe(),
            (this.duration = e),
            this._loadKeyframe();
        }
        _updateStyle(e, t) {
          (this._localTimelineStyles[e] = t),
            (this._globalTimelineStyles[e] = t),
            (this._styleSummary[e] = { time: this.currentTime, value: t });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(e) {
          e && (this._previousKeyframe.easing = e),
            Object.keys(this._globalTimelineStyles).forEach((t) => {
              (this._backFill[t] = this._globalTimelineStyles[t] || oi),
                (this._currentKeyframe[t] = oi);
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe);
        }
        setStyles(e, t, i, r) {
          t && (this._previousKeyframe.easing = t);
          const s = (r && r.params) || {},
            o = (function zB(n, e) {
              const t = {};
              let i;
              return (
                n.forEach((r) => {
                  "*" === r
                    ? ((i = i || Object.keys(e)),
                      i.forEach((s) => {
                        t[s] = oi;
                      }))
                    : Si(r, !1, t);
                }),
                t
              );
            })(e, this._globalTimelineStyles);
          Object.keys(o).forEach((a) => {
            const l = pc(o[a], s, i);
            (this._pendingStyles[a] = l),
              this._localTimelineStyles.hasOwnProperty(a) ||
                (this._backFill[a] = this._globalTimelineStyles.hasOwnProperty(
                  a
                )
                  ? this._globalTimelineStyles[a]
                  : oi),
              this._updateStyle(a, l);
          });
        }
        applyStylesToKeyframe() {
          const e = this._pendingStyles,
            t = Object.keys(e);
          0 != t.length &&
            ((this._pendingStyles = {}),
            t.forEach((i) => {
              this._currentKeyframe[i] = e[i];
            }),
            Object.keys(this._localTimelineStyles).forEach((i) => {
              this._currentKeyframe.hasOwnProperty(i) ||
                (this._currentKeyframe[i] = this._localTimelineStyles[i]);
            }));
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach((e) => {
            const t = this._localTimelineStyles[e];
            (this._pendingStyles[e] = t), this._updateStyle(e, t);
          });
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const e = [];
          for (let t in this._currentKeyframe) e.push(t);
          return e;
        }
        mergeTimelineCollectedStyles(e) {
          Object.keys(e._styleSummary).forEach((t) => {
            const i = this._styleSummary[t],
              r = e._styleSummary[t];
            (!i || r.time > i.time) && this._updateStyle(t, r.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const e = new Set(),
            t = new Set(),
            i = 1 === this._keyframes.size && 0 === this.duration;
          let r = [];
          this._keyframes.forEach((a, l) => {
            const c = Si(a, !0);
            Object.keys(c).forEach((u) => {
              const d = c[u];
              "!" == d ? e.add(u) : d == oi && t.add(u);
            }),
              i || (c.offset = l / this.duration),
              r.push(c);
          });
          const s = e.size ? mc(e.values()) : [],
            o = t.size ? mc(t.values()) : [];
          if (i) {
            const a = r[0],
              l = Cs(a);
            (a.offset = 0), (l.offset = 1), (r = [a, l]);
          }
          return Gf(
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
      class $B extends wc {
        constructor(e, t, i, r, s, o, a = !1) {
          super(e, t, o.delay),
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
          let e = this.keyframes,
            { delay: t, duration: i, easing: r } = this.timings;
          if (this._stretchStartingKeyframe && t) {
            const s = [],
              o = i + t,
              a = t / o,
              l = Si(e[0], !1);
            (l.offset = 0), s.push(l);
            const c = Si(e[0], !1);
            (c.offset = ND(a)), s.push(c);
            const u = e.length - 1;
            for (let d = 1; d <= u; d++) {
              let h = Si(e[d], !1);
              (h.offset = ND((t + h.offset * i) / o)), s.push(h);
            }
            (i = o), (t = 0), (r = ""), (e = s);
          }
          return Gf(
            this.element,
            e,
            this.preStyleProps,
            this.postStyleProps,
            i,
            t,
            r,
            !0
          );
        }
      }
      function ND(n, e = 3) {
        const t = Math.pow(10, e - 1);
        return Math.round(n * t) / t;
      }
      class Kf {}
      class GB extends Kf {
        normalizePropertyName(e, t) {
          return Hf(e);
        }
        normalizeStyleValue(e, t, i, r) {
          let s = "";
          const o = i.toString().trim();
          if (WB[t] && 0 !== i && "0" !== i)
            if ("number" == typeof i) s = "px";
            else {
              const a = i.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                r.push(`Please provide a CSS unit value for ${e}:${i}`);
            }
          return o + s;
        }
      }
      const WB = (() =>
        (function qB(n) {
          const e = {};
          return n.forEach((t) => (e[t] = !0)), e;
        })(
          "width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(
            ","
          )
        ))();
      function LD(n, e, t, i, r, s, o, a, l, c, u, d, h) {
        return {
          type: 0,
          element: n,
          triggerName: e,
          isRemovalTransition: r,
          fromState: t,
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
      const Qf = {};
      class VD {
        constructor(e, t, i) {
          (this._triggerName = e), (this.ast = t), (this._stateStyles = i);
        }
        match(e, t, i, r) {
          return (function KB(n, e, t, i, r) {
            return n.some((s) => s(e, t, i, r));
          })(this.ast.matchers, e, t, i, r);
        }
        buildStyles(e, t, i) {
          const r = this._stateStyles["*"],
            s = this._stateStyles[e],
            o = r ? r.buildStyles(t, i) : {};
          return s ? s.buildStyles(t, i) : o;
        }
        build(e, t, i, r, s, o, a, l, c, u) {
          const d = [],
            h = (this.ast.options && this.ast.options.params) || Qf,
            p = this.buildStyles(i, (a && a.params) || Qf, d),
            _ = (l && l.params) || Qf,
            b = this.buildStyles(r, _, d),
            w = new Set(),
            v = new Map(),
            M = new Map(),
            T = "void" === r,
            $ = { params: Object.assign(Object.assign({}, h), _) },
            Me = u ? [] : Wf(e, t, this.ast.animation, s, o, p, b, $, c, d);
          let Ae = 0;
          if (
            (Me.forEach(($t) => {
              Ae = Math.max($t.duration + $t.delay, Ae);
            }),
            d.length)
          )
            return LD(t, this._triggerName, i, r, T, p, b, [], [], v, M, Ae, d);
          Me.forEach(($t) => {
            const zt = $t.element,
              Ss = Bt(v, zt, {});
            $t.preStyleProps.forEach((Dn) => (Ss[Dn] = !0));
            const ai = Bt(M, zt, {});
            $t.postStyleProps.forEach((Dn) => (ai[Dn] = !0)),
              zt !== t && w.add(zt);
          });
          const Ut = mc(w.values());
          return LD(t, this._triggerName, i, r, T, p, b, Me, Ut, v, M, Ae);
        }
      }
      class QB {
        constructor(e, t, i) {
          (this.styles = e), (this.defaultParams = t), (this.normalizer = i);
        }
        buildStyles(e, t) {
          const i = {},
            r = Cs(this.defaultParams);
          return (
            Object.keys(e).forEach((s) => {
              const o = e[s];
              null != o && (r[s] = o);
            }),
            this.styles.styles.forEach((s) => {
              if ("string" != typeof s) {
                const o = s;
                Object.keys(o).forEach((a) => {
                  let l = o[a];
                  l.length > 1 && (l = pc(l, r, t));
                  const c = this.normalizer.normalizePropertyName(a, t);
                  (l = this.normalizer.normalizeStyleValue(a, c, l, t)),
                    (i[c] = l);
                });
              }
            }),
            i
          );
        }
      }
      class ZB {
        constructor(e, t, i) {
          (this.name = e),
            (this.ast = t),
            (this._normalizer = i),
            (this.transitionFactories = []),
            (this.states = {}),
            t.states.forEach((r) => {
              this.states[r.name] = new QB(
                r.style,
                (r.options && r.options.params) || {},
                i
              );
            }),
            BD(this.states, "true", "1"),
            BD(this.states, "false", "0"),
            t.transitions.forEach((r) => {
              this.transitionFactories.push(new VD(e, r, this.states));
            }),
            (this.fallbackTransition = (function XB(n, e, t) {
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
                e
              );
            })(e, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(e, t, i, r) {
          return (
            this.transitionFactories.find((o) => o.match(e, t, i, r)) || null
          );
        }
        matchStyles(e, t, i) {
          return this.fallbackTransition.buildStyles(e, t, i);
        }
      }
      function BD(n, e, t) {
        n.hasOwnProperty(e)
          ? n.hasOwnProperty(t) || (n[t] = n[e])
          : n.hasOwnProperty(t) && (n[e] = n[t]);
      }
      const JB = new bc();
      class ej {
        constructor(e, t, i) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._normalizer = i),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = []);
        }
        register(e, t) {
          const i = [],
            r = $f(this._driver, t, i);
          if (i.length)
            throw new Error(
              `Unable to build the animation due to the following errors: ${i.join(
                "\n"
              )}`
            );
          this._animations[e] = r;
        }
        _buildPlayer(e, t, i) {
          const r = e.element,
            s = vD(0, this._normalizer, 0, e.keyframes, t, i);
          return this._driver.animate(
            r,
            s,
            e.duration,
            e.delay,
            e.easing,
            [],
            !0
          );
        }
        create(e, t, i = {}) {
          const r = [],
            s = this._animations[e];
          let o;
          const a = new Map();
          if (
            (s
              ? ((o = Wf(this._driver, t, s, Lf, uc, {}, {}, i, JB, r)),
                o.forEach((u) => {
                  const d = Bt(a, u.element, {});
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
              u[h] = this._driver.computeStyle(d, h, oi);
            });
          });
          const c = Mi(
            o.map((u) => {
              const d = a.get(u.element);
              return this._buildPlayer(u, {}, d);
            })
          );
          return (
            (this._playersById[e] = c),
            c.onDestroy(() => this.destroy(e)),
            this.players.push(c),
            c
          );
        }
        destroy(e) {
          const t = this._getPlayer(e);
          t.destroy(), delete this._playersById[e];
          const i = this.players.indexOf(t);
          i >= 0 && this.players.splice(i, 1);
        }
        _getPlayer(e) {
          const t = this._playersById[e];
          if (!t)
            throw new Error(
              `Unable to find the timeline player referenced by ${e}`
            );
          return t;
        }
        listen(e, t, i, r) {
          const s = Rf(t, "", "", "");
          return Tf(this._getPlayer(e), i, s, r), () => {};
        }
        command(e, t, i, r) {
          if ("register" == i) return void this.register(e, r[0]);
          if ("create" == i) return void this.create(e, t, r[0] || {});
          const s = this._getPlayer(e);
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
              this.destroy(e);
          }
        }
      }
      const jD = "ng-animate-queued",
        Yf = "ng-animate-disabled",
        sj = [],
        HD = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        oj = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        sn = "__ng_removed";
      class Zf {
        constructor(e, t = "") {
          this.namespaceId = t;
          const i = e && e.hasOwnProperty("value");
          if (
            ((this.value = (function uj(n) {
              return null != n ? n : null;
            })(i ? e.value : e)),
            i)
          ) {
            const s = Cs(e);
            delete s.value, (this.options = s);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(e) {
          const t = e.params;
          if (t) {
            const i = this.options.params;
            Object.keys(t).forEach((r) => {
              null == i[r] && (i[r] = t[r]);
            });
          }
        }
      }
      const Qo = "void",
        Xf = new Zf(Qo);
      class aj {
        constructor(e, t, i) {
          (this.id = e),
            (this.hostElement = t),
            (this._engine = i),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + e),
            on(t, this._hostClassName);
        }
        listen(e, t, i, r) {
          if (!this._triggers.hasOwnProperty(t))
            throw new Error(
              `Unable to listen on the animation trigger event "${i}" because the animation trigger "${t}" doesn't exist!`
            );
          if (null == i || 0 == i.length)
            throw new Error(
              `Unable to listen on the animation trigger "${t}" because the provided event is undefined!`
            );
          if (
            !(function dj(n) {
              return "start" == n || "done" == n;
            })(i)
          )
            throw new Error(
              `The provided animation trigger event "${i}" for the animation trigger "${t}" is not supported!`
            );
          const s = Bt(this._elementListeners, e, []),
            o = { name: t, phase: i, callback: r };
          s.push(o);
          const a = Bt(this._engine.statesByElement, e, {});
          return (
            a.hasOwnProperty(t) ||
              (on(e, dc), on(e, dc + "-" + t), (a[t] = Xf)),
            () => {
              this._engine.afterFlush(() => {
                const l = s.indexOf(o);
                l >= 0 && s.splice(l, 1), this._triggers[t] || delete a[t];
              });
            }
          );
        }
        register(e, t) {
          return !this._triggers[e] && ((this._triggers[e] = t), !0);
        }
        _getTrigger(e) {
          const t = this._triggers[e];
          if (!t)
            throw new Error(
              `The provided animation trigger "${e}" has not been registered!`
            );
          return t;
        }
        trigger(e, t, i, r = !0) {
          const s = this._getTrigger(t),
            o = new Jf(this.id, t, e);
          let a = this._engine.statesByElement.get(e);
          a ||
            (on(e, dc),
            on(e, dc + "-" + t),
            this._engine.statesByElement.set(e, (a = {})));
          let l = a[t];
          const c = new Zf(i, this.id);
          if (
            (!(i && i.hasOwnProperty("value")) &&
              l &&
              c.absorbOptions(l.options),
            (a[t] = c),
            l || (l = Xf),
            c.value !== Qo && l.value === c.value)
          ) {
            if (
              !(function pj(n, e) {
                const t = Object.keys(n),
                  i = Object.keys(e);
                if (t.length != i.length) return !1;
                for (let r = 0; r < t.length; r++) {
                  const s = t[r];
                  if (!e.hasOwnProperty(s) || n[s] !== e[s]) return !1;
                }
                return !0;
              })(l.params, c.params)
            ) {
              const _ = [],
                b = s.matchStyles(l.value, l.params, _),
                w = s.matchStyles(c.value, c.params, _);
              _.length
                ? this._engine.reportError(_)
                : this._engine.afterFlush(() => {
                    cr(e, b), Hn(e, w);
                  });
            }
            return;
          }
          const h = Bt(this._engine.playersByElement, e, []);
          h.forEach((_) => {
            _.namespaceId == this.id &&
              _.triggerName == t &&
              _.queued &&
              _.destroy();
          });
          let f = s.matchTransition(l.value, c.value, e, c.params),
            p = !1;
          if (!f) {
            if (!r) return;
            (f = s.fallbackTransition), (p = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: t,
              transition: f,
              fromState: l,
              toState: c,
              player: o,
              isFallbackTransition: p,
            }),
            p ||
              (on(e, jD),
              o.onStart(() => {
                ws(e, jD);
              })),
            o.onDone(() => {
              let _ = this.players.indexOf(o);
              _ >= 0 && this.players.splice(_, 1);
              const b = this._engine.playersByElement.get(e);
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
        deregister(e) {
          delete this._triggers[e],
            this._engine.statesByElement.forEach((t, i) => {
              delete t[e];
            }),
            this._elementListeners.forEach((t, i) => {
              this._elementListeners.set(
                i,
                t.filter((r) => r.name != e)
              );
            });
        }
        clearElementCache(e) {
          this._engine.statesByElement.delete(e),
            this._elementListeners.delete(e);
          const t = this._engine.playersByElement.get(e);
          t &&
            (t.forEach((i) => i.destroy()),
            this._engine.playersByElement.delete(e));
        }
        _signalRemovalForInnerTriggers(e, t) {
          const i = this._engine.driver.query(e, hc, !0);
          i.forEach((r) => {
            if (r[sn]) return;
            const s = this._engine.fetchNamespacesByElement(r);
            s.size
              ? s.forEach((o) => o.triggerLeaveAnimation(r, t, !1, !0))
              : this.clearElementCache(r);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              i.forEach((r) => this.clearElementCache(r))
            );
        }
        triggerLeaveAnimation(e, t, i, r) {
          const s = this._engine.statesByElement.get(e),
            o = new Map();
          if (s) {
            const a = [];
            if (
              (Object.keys(s).forEach((l) => {
                if ((o.set(l, s[l].value), this._triggers[l])) {
                  const c = this.trigger(e, l, Qo, r);
                  c && a.push(c);
                }
              }),
              a.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, e, !0, t, o),
                i && Mi(a).onDone(() => this._engine.processLeaveNode(e)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(e) {
          const t = this._elementListeners.get(e),
            i = this._engine.statesByElement.get(e);
          if (t && i) {
            const r = new Set();
            t.forEach((s) => {
              const o = s.name;
              if (r.has(o)) return;
              r.add(o);
              const l = this._triggers[o].fallbackTransition,
                c = i[o] || Xf,
                u = new Zf(Qo),
                d = new Jf(this.id, o, e);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: e,
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
        removeNode(e, t) {
          const i = this._engine;
          if (
            (e.childElementCount && this._signalRemovalForInnerTriggers(e, t),
            this.triggerLeaveAnimation(e, t, !0))
          )
            return;
          let r = !1;
          if (i.totalAnimations) {
            const s = i.players.length ? i.playersByQueriedElement.get(e) : [];
            if (s && s.length) r = !0;
            else {
              let o = e;
              for (; (o = o.parentNode); )
                if (i.statesByElement.get(o)) {
                  r = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(e), r))
            i.markElementAsRemoved(this.id, e, !1, t);
          else {
            const s = e[sn];
            (!s || s === HD) &&
              (i.afterFlush(() => this.clearElementCache(e)),
              i.destroyInnerAnimations(e),
              i._onRemovalComplete(e, t));
          }
        }
        insertNode(e, t) {
          on(e, this._hostClassName);
        }
        drainQueuedTransitions(e) {
          const t = [];
          return (
            this._queue.forEach((i) => {
              const r = i.player;
              if (r.destroyed) return;
              const s = i.element,
                o = this._elementListeners.get(s);
              o &&
                o.forEach((a) => {
                  if (a.name == i.triggerName) {
                    const l = Rf(
                      s,
                      i.triggerName,
                      i.fromState.value,
                      i.toState.value
                    );
                    (l._data = e), Tf(i.player, a.phase, l, a.callback);
                  }
                }),
                r.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      r.destroy();
                    })
                  : t.push(i);
            }),
            (this._queue = []),
            t.sort((i, r) => {
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
        destroy(e) {
          this.players.forEach((t) => t.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, e);
        }
        elementContainsData(e) {
          let t = !1;
          return (
            this._elementListeners.has(e) && (t = !0),
            (t = !!this._queue.find((i) => i.element === e) || t),
            t
          );
        }
      }
      class lj {
        constructor(e, t, i) {
          (this.bodyNode = e),
            (this.driver = t),
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
        _onRemovalComplete(e, t) {
          this.onRemovalComplete(e, t);
        }
        get queuedPlayers() {
          const e = [];
          return (
            this._namespaceList.forEach((t) => {
              t.players.forEach((i) => {
                i.queued && e.push(i);
              });
            }),
            e
          );
        }
        createNamespace(e, t) {
          const i = new aj(e, t, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, t)
              ? this._balanceNamespaceList(i, t)
              : (this.newHostElements.set(t, i), this.collectEnterElement(t)),
            (this._namespaceLookup[e] = i)
          );
        }
        _balanceNamespaceList(e, t) {
          const i = this._namespaceList.length - 1;
          if (i >= 0) {
            let r = !1;
            for (let s = i; s >= 0; s--)
              if (
                this.driver.containsElement(
                  this._namespaceList[s].hostElement,
                  t
                )
              ) {
                this._namespaceList.splice(s + 1, 0, e), (r = !0);
                break;
              }
            r || this._namespaceList.splice(0, 0, e);
          } else this._namespaceList.push(e);
          return this.namespacesByHostElement.set(t, e), e;
        }
        register(e, t) {
          let i = this._namespaceLookup[e];
          return i || (i = this.createNamespace(e, t)), i;
        }
        registerTrigger(e, t, i) {
          let r = this._namespaceLookup[e];
          r && r.register(t, i) && this.totalAnimations++;
        }
        destroy(e, t) {
          if (!e) return;
          const i = this._fetchNamespace(e);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(i.hostElement),
              delete this._namespaceLookup[e];
            const r = this._namespaceList.indexOf(i);
            r >= 0 && this._namespaceList.splice(r, 1);
          }),
            this.afterFlushAnimationsDone(() => i.destroy(t));
        }
        _fetchNamespace(e) {
          return this._namespaceLookup[e];
        }
        fetchNamespacesByElement(e) {
          const t = new Set(),
            i = this.statesByElement.get(e);
          if (i) {
            const r = Object.keys(i);
            for (let s = 0; s < r.length; s++) {
              const o = i[r[s]].namespaceId;
              if (o) {
                const a = this._fetchNamespace(o);
                a && t.add(a);
              }
            }
          }
          return t;
        }
        trigger(e, t, i, r) {
          if (Dc(t)) {
            const s = this._fetchNamespace(e);
            if (s) return s.trigger(t, i, r), !0;
          }
          return !1;
        }
        insertNode(e, t, i, r) {
          if (!Dc(t)) return;
          const s = t[sn];
          if (s && s.setForRemoval) {
            (s.setForRemoval = !1), (s.setForMove = !0);
            const o = this.collectedLeaveElements.indexOf(t);
            o >= 0 && this.collectedLeaveElements.splice(o, 1);
          }
          if (e) {
            const o = this._fetchNamespace(e);
            o && o.insertNode(t, i);
          }
          r && this.collectEnterElement(t);
        }
        collectEnterElement(e) {
          this.collectedEnterElements.push(e);
        }
        markElementAsDisabled(e, t) {
          t
            ? this.disabledNodes.has(e) ||
              (this.disabledNodes.add(e), on(e, Yf))
            : this.disabledNodes.has(e) &&
              (this.disabledNodes.delete(e), ws(e, Yf));
        }
        removeNode(e, t, i, r) {
          if (Dc(t)) {
            const s = e ? this._fetchNamespace(e) : null;
            if (
              (s ? s.removeNode(t, r) : this.markElementAsRemoved(e, t, !1, r),
              i)
            ) {
              const o = this.namespacesByHostElement.get(t);
              o && o.id !== e && o.removeNode(t, r);
            }
          } else this._onRemovalComplete(t, r);
        }
        markElementAsRemoved(e, t, i, r, s) {
          this.collectedLeaveElements.push(t),
            (t[sn] = {
              namespaceId: e,
              setForRemoval: r,
              hasAnimation: i,
              removedBeforeQueried: !1,
              previousTriggersValues: s,
            });
        }
        listen(e, t, i, r, s) {
          return Dc(t) ? this._fetchNamespace(e).listen(t, i, r, s) : () => {};
        }
        _buildInstruction(e, t, i, r, s) {
          return e.transition.build(
            this.driver,
            e.element,
            e.fromState.value,
            e.toState.value,
            i,
            r,
            e.fromState.options,
            e.toState.options,
            t,
            s
          );
        }
        destroyInnerAnimations(e) {
          let t = this.driver.query(e, hc, !0);
          t.forEach((i) => this.destroyActiveAnimationsForElement(i)),
            0 != this.playersByQueriedElement.size &&
              ((t = this.driver.query(e, Vf, !0)),
              t.forEach((i) => this.finishActiveQueriedAnimationOnElement(i)));
        }
        destroyActiveAnimationsForElement(e) {
          const t = this.playersByElement.get(e);
          t &&
            t.forEach((i) => {
              i.queued ? (i.markedForDestroy = !0) : i.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(e) {
          const t = this.playersByQueriedElement.get(e);
          t && t.forEach((i) => i.finish());
        }
        whenRenderingDone() {
          return new Promise((e) => {
            if (this.players.length) return Mi(this.players).onDone(() => e());
            e();
          });
        }
        processLeaveNode(e) {
          var t;
          const i = e[sn];
          if (i && i.setForRemoval) {
            if (((e[sn] = HD), i.namespaceId)) {
              this.destroyInnerAnimations(e);
              const r = this._fetchNamespace(i.namespaceId);
              r && r.clearElementCache(e);
            }
            this._onRemovalComplete(e, i.setForRemoval);
          }
          (null === (t = e.classList) || void 0 === t
            ? void 0
            : t.contains(Yf)) && this.markElementAsDisabled(e, !1),
            this.driver.query(e, ".ng-animate-disabled", !0).forEach((r) => {
              this.markElementAsDisabled(r, !1);
            });
        }
        flush(e = -1) {
          let t = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((i, r) =>
                this._balanceNamespaceList(i, r)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let i = 0; i < this.collectedEnterElements.length; i++)
              on(this.collectedEnterElements[i], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const i = [];
            try {
              t = this._flushAnimations(i, e);
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
              t.length
                ? Mi(t).onDone(() => {
                    i.forEach((r) => r());
                  })
                : i.forEach((r) => r());
          }
        }
        reportError(e) {
          throw new Error(
            `Unable to process animations due to the following failed trigger transitions\n ${e.join(
              "\n"
            )}`
          );
        }
        _flushAnimations(e, t) {
          const i = new bc(),
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
          let _ = 0;
          f.forEach((I, O) => {
            const N = Lf + _++;
            p.set(O, N), I.forEach((oe) => on(oe, N));
          });
          const b = [],
            w = new Set(),
            v = new Set();
          for (let I = 0; I < this.collectedLeaveElements.length; I++) {
            const O = this.collectedLeaveElements[I],
              N = O[sn];
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
            const N = uc + _++;
            M.set(O, N), I.forEach((oe) => on(oe, N));
          }),
            e.push(() => {
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
            this._namespaceList[I].drainQueuedTransitions(t).forEach((N) => {
              const oe = N.player,
                Xe = N.element;
              if (($.push(oe), this.collectedEnterElements.length)) {
                const Ct = Xe[sn];
                if (Ct && Ct.setForMove) {
                  if (
                    Ct.previousTriggersValues &&
                    Ct.previousTriggersValues.has(N.triggerName)
                  ) {
                    const fr = Ct.previousTriggersValues.get(N.triggerName),
                      Fi = this.statesByElement.get(N.element);
                    Fi && Fi[N.triggerName] && (Fi[N.triggerName].value = fr);
                  }
                  return void oe.destroy();
                }
              }
              const Un = !d || !this.driver.containsElement(d, Xe),
                Gt = M.get(Xe),
                Oi = p.get(Xe),
                Te = this._buildInstruction(N, i, Oi, Gt, Un);
              if (Te.errors && Te.errors.length) return void Me.push(Te);
              if (Un)
                return (
                  oe.onStart(() => cr(Xe, Te.fromStyles)),
                  oe.onDestroy(() => Hn(Xe, Te.toStyles)),
                  void r.push(oe)
                );
              if (N.isFallbackTransition)
                return (
                  oe.onStart(() => cr(Xe, Te.fromStyles)),
                  oe.onDestroy(() => Hn(Xe, Te.toStyles)),
                  void r.push(oe)
                );
              const iM = [];
              Te.timelines.forEach((Ct) => {
                (Ct.stretchStartingKeyframe = !0),
                  this.disabledNodes.has(Ct.element) || iM.push(Ct);
              }),
                (Te.timelines = iM),
                i.append(Xe, Te.timelines),
                o.push({ instruction: Te, player: oe, element: Xe }),
                Te.queriedElements.forEach((Ct) => Bt(a, Ct, []).push(oe)),
                Te.preStyleProps.forEach((Ct, fr) => {
                  const Fi = Object.keys(Ct);
                  if (Fi.length) {
                    let pr = l.get(fr);
                    pr || l.set(fr, (pr = new Set())),
                      Fi.forEach((Pp) => pr.add(Pp));
                  }
                }),
                Te.postStyleProps.forEach((Ct, fr) => {
                  const Fi = Object.keys(Ct);
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
            Ut = new Map();
          o.forEach((I) => {
            const O = I.element;
            i.has(O) &&
              (Ut.set(O, O),
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
                Bt(Ae, O, []).push(oe), oe.destroy();
              });
            });
          const $t = b.filter((I) => WD(I, l, c)),
            zt = new Map();
          $D(zt, this.driver, v, c, oi).forEach((I) => {
            WD(I, l, c) && $t.push(I);
          });
          const ai = new Map();
          f.forEach((I, O) => {
            $D(ai, this.driver, new Set(I), l, "!");
          }),
            $t.forEach((I) => {
              const O = zt.get(I),
                N = ai.get(I);
              zt.set(I, Object.assign(Object.assign({}, O), N));
            });
          const Dn = [],
            xs = [],
            As = {};
          o.forEach((I) => {
            const { element: O, player: N, instruction: oe } = I;
            if (i.has(O)) {
              if (u.has(O))
                return (
                  N.onDestroy(() => Hn(O, oe.toStyles)),
                  (N.disabled = !0),
                  N.overrideTotalTime(oe.totalTime),
                  void r.push(N)
                );
              let Xe = As;
              if (Ut.size > 1) {
                let Gt = O;
                const Oi = [];
                for (; (Gt = Gt.parentNode); ) {
                  const Te = Ut.get(Gt);
                  if (Te) {
                    Xe = Te;
                    break;
                  }
                  Oi.push(Gt);
                }
                Oi.forEach((Te) => Ut.set(Te, Xe));
              }
              const Un = this._buildAnimation(N.namespaceId, oe, Ae, s, ai, zt);
              if ((N.setRealPlayer(Un), Xe === As)) Dn.push(N);
              else {
                const Gt = this.playersByElement.get(Xe);
                Gt && Gt.length && (N.parentPlayer = Mi(Gt)), r.push(N);
              }
            } else
              cr(O, oe.fromStyles),
                N.onDestroy(() => Hn(O, oe.toStyles)),
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
              N = O[sn];
            if ((ws(O, uc), N && N.hasAnimation)) continue;
            let oe = [];
            if (a.size) {
              let Un = a.get(O);
              Un && Un.length && oe.push(...Un);
              let Gt = this.driver.query(O, Vf, !0);
              for (let Oi = 0; Oi < Gt.length; Oi++) {
                let Te = a.get(Gt[Oi]);
                Te && Te.length && oe.push(...Te);
              }
            }
            const Xe = oe.filter((Un) => !Un.destroyed);
            Xe.length ? hj(this, O, Xe) : this.processLeaveNode(O);
          }
          return (
            (b.length = 0),
            Dn.forEach((I) => {
              this.players.push(I),
                I.onDone(() => {
                  I.destroy();
                  const O = this.players.indexOf(I);
                  this.players.splice(O, 1);
                }),
                I.play();
            }),
            Dn
          );
        }
        elementContainsData(e, t) {
          let i = !1;
          const r = t[sn];
          return (
            r && r.setForRemoval && (i = !0),
            this.playersByElement.has(t) && (i = !0),
            this.playersByQueriedElement.has(t) && (i = !0),
            this.statesByElement.has(t) && (i = !0),
            this._fetchNamespace(e).elementContainsData(t) || i
          );
        }
        afterFlush(e) {
          this._flushFns.push(e);
        }
        afterFlushAnimationsDone(e) {
          this._whenQuietFns.push(e);
        }
        _getPreviousPlayers(e, t, i, r, s) {
          let o = [];
          if (t) {
            const a = this.playersByQueriedElement.get(e);
            a && (o = a);
          } else {
            const a = this.playersByElement.get(e);
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
        _beforeAnimationBuild(e, t, i) {
          const s = t.element,
            o = t.isRemovalTransition ? void 0 : e,
            a = t.isRemovalTransition ? void 0 : t.triggerName;
          for (const l of t.timelines) {
            const c = l.element,
              u = c !== s,
              d = Bt(i, c, []);
            this._getPreviousPlayers(c, u, o, a, t.toState).forEach((f) => {
              const p = f.getRealPlayer();
              p.beforeDestroy && p.beforeDestroy(), f.destroy(), d.push(f);
            });
          }
          cr(s, t.fromStyles);
        }
        _buildAnimation(e, t, i, r, s, o) {
          const a = t.triggerName,
            l = t.element,
            c = [],
            u = new Set(),
            d = new Set(),
            h = t.timelines.map((p) => {
              const _ = p.element;
              u.add(_);
              const b = _[sn];
              if (b && b.removedBeforeQueried)
                return new bs(p.duration, p.delay);
              const w = _ !== l,
                v = (function fj(n) {
                  const e = [];
                  return GD(n, e), e;
                })((i.get(_) || sj).map((Ae) => Ae.getRealPlayer())).filter(
                  (Ae) => !!Ae.element && Ae.element === _
                ),
                M = s.get(_),
                T = o.get(_),
                $ = vD(0, this._normalizer, 0, p.keyframes, M, T),
                Me = this._buildPlayer(p, $, v);
              if ((p.subTimeline && r && d.add(_), w)) {
                const Ae = new Jf(e, a, _);
                Ae.setRealPlayer(Me), c.push(Ae);
              }
              return Me;
            });
          c.forEach((p) => {
            Bt(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function cj(n, e, t) {
                  let i;
                  if (n instanceof Map) {
                    if (((i = n.get(e)), i)) {
                      if (i.length) {
                        const r = i.indexOf(t);
                        i.splice(r, 1);
                      }
                      0 == i.length && n.delete(e);
                    }
                  } else if (((i = n[e]), i)) {
                    if (i.length) {
                      const r = i.indexOf(t);
                      i.splice(r, 1);
                    }
                    0 == i.length && delete n[e];
                  }
                  return i;
                })(this.playersByQueriedElement, p.element, p)
              );
          }),
            u.forEach((p) => on(p, SD));
          const f = Mi(h);
          return (
            f.onDestroy(() => {
              u.forEach((p) => ws(p, SD)), Hn(l, t.toStyles);
            }),
            d.forEach((p) => {
              Bt(r, p, []).push(f);
            }),
            f
          );
        }
        _buildPlayer(e, t, i) {
          return t.length > 0
            ? this.driver.animate(
                e.element,
                t,
                e.duration,
                e.delay,
                e.easing,
                i
              )
            : new bs(e.duration, e.delay);
        }
      }
      class Jf {
        constructor(e, t, i) {
          (this.namespaceId = e),
            (this.triggerName = t),
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
        setRealPlayer(e) {
          this._containsRealPlayer ||
            ((this._player = e),
            Object.keys(this._queuedCallbacks).forEach((t) => {
              this._queuedCallbacks[t].forEach((i) => Tf(e, t, void 0, i));
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(e.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(e) {
          this.totalTime = e;
        }
        syncPlayerEvents(e) {
          const t = this._player;
          t.triggerCallback && e.onStart(() => t.triggerCallback("start")),
            e.onDone(() => this.finish()),
            e.onDestroy(() => this.destroy());
        }
        _queueEvent(e, t) {
          Bt(this._queuedCallbacks, e, []).push(t);
        }
        onDone(e) {
          this.queued && this._queueEvent("done", e), this._player.onDone(e);
        }
        onStart(e) {
          this.queued && this._queueEvent("start", e), this._player.onStart(e);
        }
        onDestroy(e) {
          this.queued && this._queueEvent("destroy", e),
            this._player.onDestroy(e);
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
        setPosition(e) {
          this.queued || this._player.setPosition(e);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(e) {
          const t = this._player;
          t.triggerCallback && t.triggerCallback(e);
        }
      }
      function Dc(n) {
        return n && 1 === n.nodeType;
      }
      function UD(n, e) {
        const t = n.style.display;
        return (n.style.display = null != e ? e : "none"), t;
      }
      function $D(n, e, t, i, r) {
        const s = [];
        t.forEach((l) => s.push(UD(l)));
        const o = [];
        i.forEach((l, c) => {
          const u = {};
          l.forEach((d) => {
            const h = (u[d] = e.computeStyle(c, d, r));
            (!h || 0 == h.length) && ((c[sn] = oj), o.push(c));
          }),
            n.set(c, u);
        });
        let a = 0;
        return t.forEach((l) => UD(l, s[a++])), o;
      }
      function zD(n, e) {
        const t = new Map();
        if ((n.forEach((a) => t.set(a, [])), 0 == e.length)) return t;
        const r = new Set(e),
          s = new Map();
        function o(a) {
          if (!a) return 1;
          let l = s.get(a);
          if (l) return l;
          const c = a.parentNode;
          return (l = t.has(c) ? c : r.has(c) ? 1 : o(c)), s.set(a, l), l;
        }
        return (
          e.forEach((a) => {
            const l = o(a);
            1 !== l && t.get(l).push(a);
          }),
          t
        );
      }
      function on(n, e) {
        var t;
        null === (t = n.classList) || void 0 === t || t.add(e);
      }
      function ws(n, e) {
        var t;
        null === (t = n.classList) || void 0 === t || t.remove(e);
      }
      function hj(n, e, t) {
        Mi(t).onDone(() => n.processLeaveNode(e));
      }
      function GD(n, e) {
        for (let t = 0; t < n.length; t++) {
          const i = n[t];
          i instanceof _D ? GD(i.players, e) : e.push(i);
        }
      }
      function WD(n, e, t) {
        const i = t.get(n);
        if (!i) return !1;
        let r = e.get(n);
        return r ? i.forEach((s) => r.add(s)) : e.set(n, i), t.delete(n), !0;
      }
      class Ec {
        constructor(e, t, i) {
          (this.bodyNode = e),
            (this._driver = t),
            (this._normalizer = i),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (r, s) => {}),
            (this._transitionEngine = new lj(e, t, i)),
            (this._timelineEngine = new ej(e, t, i)),
            (this._transitionEngine.onRemovalComplete = (r, s) =>
              this.onRemovalComplete(r, s));
        }
        registerTrigger(e, t, i, r, s) {
          const o = e + "-" + r;
          let a = this._triggerCache[o];
          if (!a) {
            const l = [],
              c = $f(this._driver, s, l);
            if (l.length)
              throw new Error(
                `The animation trigger "${r}" has failed to build due to the following errors:\n - ${l.join(
                  "\n - "
                )}`
              );
            (a = (function YB(n, e, t) {
              return new ZB(n, e, t);
            })(r, c, this._normalizer)),
              (this._triggerCache[o] = a);
          }
          this._transitionEngine.registerTrigger(t, r, a);
        }
        register(e, t) {
          this._transitionEngine.register(e, t);
        }
        destroy(e, t) {
          this._transitionEngine.destroy(e, t);
        }
        onInsert(e, t, i, r) {
          this._transitionEngine.insertNode(e, t, i, r);
        }
        onRemove(e, t, i, r) {
          this._transitionEngine.removeNode(e, t, r || !1, i);
        }
        disableAnimations(e, t) {
          this._transitionEngine.markElementAsDisabled(e, t);
        }
        process(e, t, i, r) {
          if ("@" == i.charAt(0)) {
            const [s, o] = bD(i);
            this._timelineEngine.command(s, t, o, r);
          } else this._transitionEngine.trigger(e, t, i, r);
        }
        listen(e, t, i, r, s) {
          if ("@" == i.charAt(0)) {
            const [o, a] = bD(i);
            return this._timelineEngine.listen(o, t, a, s);
          }
          return this._transitionEngine.listen(e, t, i, r, s);
        }
        flush(e = -1) {
          this._transitionEngine.flush(e);
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
      function qD(n, e) {
        let t = null,
          i = null;
        return (
          Array.isArray(e) && e.length
            ? ((t = ep(e[0])), e.length > 1 && (i = ep(e[e.length - 1])))
            : e && (t = ep(e)),
          t || i ? new mj(n, t, i) : null
        );
      }
      let mj = (() => {
        class n {
          constructor(t, i, r) {
            (this._element = t),
              (this._startStyles = i),
              (this._endStyles = r),
              (this._state = 0);
            let s = n.initialStylesByElement.get(t);
            s || n.initialStylesByElement.set(t, (s = {})),
              (this._initialStyles = s);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Hn(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Hn(this._element, this._initialStyles),
                this._endStyles &&
                  (Hn(this._element, this._endStyles),
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
                Hn(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (n.initialStylesByElement = new WeakMap()), n;
      })();
      function ep(n) {
        let e = null;
        const t = Object.keys(n);
        for (let i = 0; i < t.length; i++) {
          const r = t[i];
          gj(r) && ((e = e || {}), (e[r] = n[r]));
        }
        return e;
      }
      function gj(n) {
        return "display" === n || "position" === n;
      }
      const KD = "animation",
        QD = "animationend";
      class vj {
        constructor(e, t, i, r, s, o, a) {
          (this._element = e),
            (this._name = t),
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
          (function bj(n, e) {
            const t = np(n, "").trim();
            let i = 0;
            t.length &&
              ((i =
                (function wj(n, e) {
                  let t = 0;
                  for (let i = 0; i < n.length; i++) n.charAt(i) === e && t++;
                  return t;
                })(t, ",") + 1),
              (e = `${t}, ${e}`)),
              Mc(n, "", e);
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
        setPosition(e) {
          const t = ZD(this._element, this._name);
          (this._position = e * this._duration),
            Mc(this._element, "Delay", `-${this._position}ms`, t);
        }
        getPosition() {
          return this._position;
        }
        _handleCallback(e) {
          const t = e._ngTestManualTimestamp || Date.now(),
            i = 1e3 * parseFloat(e.elapsedTime.toFixed(3));
          e.animationName == this._name &&
            Math.max(t - this._startTime, 0) >= this._delay &&
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
            (function Cj(n, e) {
              const i = np(n, "").split(","),
                r = tp(i, e);
              r >= 0 && (i.splice(r, 1), Mc(n, "", i.join(",")));
            })(this._element, this._name));
        }
      }
      function YD(n, e, t) {
        Mc(n, "PlayState", t, ZD(n, e));
      }
      function ZD(n, e) {
        const t = np(n, "");
        return t.indexOf(",") > 0 ? tp(t.split(","), e) : tp([t], e);
      }
      function tp(n, e) {
        for (let t = 0; t < n.length; t++) if (n[t].indexOf(e) >= 0) return t;
        return -1;
      }
      function XD(n, e, t) {
        t ? n.removeEventListener(QD, e) : n.addEventListener(QD, e);
      }
      function Mc(n, e, t, i) {
        const r = KD + e;
        if (null != i) {
          const s = n.style[r];
          if (s.length) {
            const o = s.split(",");
            (o[i] = t), (t = o.join(","));
          }
        }
        n.style[r] = t;
      }
      function np(n, e) {
        return n.style[KD + e] || "";
      }
      class JD {
        constructor(e, t, i, r, s, o, a, l) {
          (this.element = e),
            (this.keyframes = t),
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
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        destroy() {
          this.init(),
            !(this._state >= 4) &&
              ((this._state = 4),
              this._styler.destroy(),
              this._flushStartFns(),
              this._flushDoneFns(),
              this._specialStyles && this._specialStyles.destroy(),
              this._onDestroyFns.forEach((e) => e()),
              (this._onDestroyFns = []));
        }
        _flushDoneFns() {
          this._onDoneFns.forEach((e) => e()), (this._onDoneFns = []);
        }
        _flushStartFns() {
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
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
        setPosition(e) {
          this._styler.setPosition(e);
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
          this._styler = new vj(
            this.element,
            this.animationName,
            this._duration,
            this._delay,
            this.easing,
            "forwards",
            () => this.finish()
          );
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((i) => i()), (t.length = 0);
        }
        beforeDestroy() {
          this.init();
          const e = {};
          if (this.hasStarted()) {
            const t = this._state >= 3;
            Object.keys(this._finalStyles).forEach((i) => {
              "offset" != i &&
                (e[i] = t ? this._finalStyles[i] : Uf(this.element, i));
            });
          }
          this.currentSnapshot = e;
        }
      }
      class Mj extends bs {
        constructor(e, t) {
          super(),
            (this.element = e),
            (this._startingStyles = {}),
            (this.__initialized = !1),
            (this._styles = DD(t));
        }
        init() {
          this.__initialized ||
            !this._startingStyles ||
            ((this.__initialized = !0),
            Object.keys(this._styles).forEach((e) => {
              this._startingStyles[e] = this.element.style[e];
            }),
            super.init());
        }
        play() {
          !this._startingStyles ||
            (this.init(),
            Object.keys(this._styles).forEach((e) =>
              this.element.style.setProperty(e, this._styles[e])
            ),
            super.play());
        }
        destroy() {
          !this._startingStyles ||
            (Object.keys(this._startingStyles).forEach((e) => {
              const t = this._startingStyles[e];
              t
                ? this.element.style.setProperty(e, t)
                : this.element.style.removeProperty(e);
            }),
            (this._startingStyles = null),
            super.destroy());
        }
      }
      class tE {
        constructor() {
          this._count = 0;
        }
        validateStyleProperty(e) {
          return Of(e);
        }
        matchesElement(e, t) {
          return !1;
        }
        containsElement(e, t) {
          return Ff(e, t);
        }
        query(e, t, i) {
          return Pf(e, t, i);
        }
        computeStyle(e, t, i) {
          return window.getComputedStyle(e)[t];
        }
        buildKeyframeElement(e, t, i) {
          i = i.map((a) => DD(a));
          let r = `@keyframes ${t} {\n`,
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
        animate(e, t, i, r, s, o = [], a) {
          const l = o.filter((b) => b instanceof JD),
            c = {};
          RD(i, r) &&
            l.forEach((b) => {
              let w = b.currentSnapshot;
              Object.keys(w).forEach((v) => (c[v] = w[v]));
            });
          const u = (function Aj(n) {
            let e = {};
            return (
              n &&
                (Array.isArray(n) ? n : [n]).forEach((i) => {
                  Object.keys(i).forEach((r) => {
                    "offset" == r || "easing" == r || (e[r] = i[r]);
                  });
                }),
              e
            );
          })((t = kD(e, t, c)));
          if (0 == i) return new Mj(e, u);
          const d = "gen_css_kf_" + this._count++,
            h = this.buildKeyframeElement(e, d, t);
          (function xj(n) {
            var e;
            const t =
              null === (e = n.getRootNode) || void 0 === e ? void 0 : e.call(n);
            return "undefined" != typeof ShadowRoot && t instanceof ShadowRoot
              ? t
              : document.head;
          })(e).appendChild(h);
          const p = qD(e, t),
            _ = new JD(e, t, d, i, r, s, u, p);
          return (
            _.onDestroy(() =>
              (function Tj(n) {
                n.parentNode.removeChild(n);
              })(h)
            ),
            _
          );
        }
      }
      class iE {
        constructor(e, t, i, r) {
          (this.element = e),
            (this.keyframes = t),
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
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const e = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            e,
            this.options
          )),
            (this._finalKeyframe = e.length ? e[e.length - 1] : {}),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _triggerWebAnimation(e, t, i) {
          return e.animate(t, i);
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((e) => e()),
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
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        setPosition(e) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = e * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const e = {};
          if (this.hasStarted()) {
            const t = this._finalKeyframe;
            Object.keys(t).forEach((i) => {
              "offset" != i &&
                (e[i] = this._finished ? t[i] : Uf(this.element, i));
            });
          }
          this.currentSnapshot = e;
        }
        triggerCallback(e) {
          const t = "start" == e ? this._onStartFns : this._onDoneFns;
          t.forEach((i) => i()), (t.length = 0);
        }
      }
      class Ij {
        constructor() {
          (this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
            rE().toString()
          )),
            (this._cssKeyframesDriver = new tE());
        }
        validateStyleProperty(e) {
          return Of(e);
        }
        matchesElement(e, t) {
          return !1;
        }
        containsElement(e, t) {
          return Ff(e, t);
        }
        query(e, t, i) {
          return Pf(e, t, i);
        }
        computeStyle(e, t, i) {
          return window.getComputedStyle(e)[t];
        }
        overrideWebAnimationsSupport(e) {
          this._isNativeImpl = e;
        }
        animate(e, t, i, r, s, o = [], a) {
          if (!a && !this._isNativeImpl)
            return this._cssKeyframesDriver.animate(e, t, i, r, s, o);
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
              let _ = p.currentSnapshot;
              Object.keys(_).forEach((b) => (d[b] = _[b]));
            });
          const f = qD(e, (t = kD(e, (t = t.map((p) => Si(p, !1))), d)));
          return new iE(e, t, u, f);
        }
      }
      function rE() {
        return (yD() && Element.prototype.animate) || {};
      }
      let kj = (() => {
        class n extends pD {
          constructor(t, i) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = t.createRenderer(i.body, {
                id: "0",
                encapsulation: ln.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(t) {
            const i = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const r = Array.isArray(t) ? mD(t) : t;
            return (
              sE(this._renderer, null, i, "register", [r]),
              new Oj(i, this._renderer)
            );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(po), C(Y));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class Oj extends class yB {} {
        constructor(e, t) {
          super(), (this._id = e), (this._renderer = t);
        }
        create(e, t) {
          return new Fj(this._id, e, t || {}, this._renderer);
        }
      }
      class Fj {
        constructor(e, t, i, r) {
          (this.id = e),
            (this.element = t),
            (this._renderer = r),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", i);
        }
        _listen(e, t) {
          return this._renderer.listen(this.element, `@@${this.id}:${e}`, t);
        }
        _command(e, ...t) {
          return sE(this._renderer, this.element, this.id, e, t);
        }
        onDone(e) {
          this._listen("done", e);
        }
        onStart(e) {
          this._listen("start", e);
        }
        onDestroy(e) {
          this._listen("destroy", e);
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
        setPosition(e) {
          this._command("setPosition", e);
        }
        getPosition() {
          var e, t;
          return null !==
            (t =
              null === (e = this._renderer.engine.players[+this.id]) ||
              void 0 === e
                ? void 0
                : e.getPosition()) && void 0 !== t
            ? t
            : 0;
        }
      }
      function sE(n, e, t, i, r) {
        return n.setProperty(e, `@@${t}:${i}`, r);
      }
      const oE = "@.disabled";
      let Pj = (() => {
        class n {
          constructor(t, i, r) {
            (this.delegate = t),
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
          createRenderer(t, i) {
            const s = this.delegate.createRenderer(t, i);
            if (!(t && i && i.data && i.data.animation)) {
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
            this._currentId++, this.engine.register(a, t);
            const l = (u) => {
              Array.isArray(u)
                ? u.forEach(l)
                : this.engine.registerTrigger(o, a, t, u.name, u);
            };
            return i.data.animation.forEach(l), new Nj(this, a, s, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(t, i, r) {
            t >= 0 && t < this._microtaskId
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
          (n.ɵfac = function (t) {
            return new (t || n)(C(po), C(Ec), C(re));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      class aE {
        constructor(e, t, i) {
          (this.namespaceId = e),
            (this.delegate = t),
            (this.engine = i),
            (this.destroyNode = this.delegate.destroyNode
              ? (r) => t.destroyNode(r)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(e, t) {
          return this.delegate.createElement(e, t);
        }
        createComment(e) {
          return this.delegate.createComment(e);
        }
        createText(e) {
          return this.delegate.createText(e);
        }
        appendChild(e, t) {
          this.delegate.appendChild(e, t),
            this.engine.onInsert(this.namespaceId, t, e, !1);
        }
        insertBefore(e, t, i, r = !0) {
          this.delegate.insertBefore(e, t, i),
            this.engine.onInsert(this.namespaceId, t, e, r);
        }
        removeChild(e, t, i) {
          this.engine.onRemove(this.namespaceId, t, this.delegate, i);
        }
        selectRootElement(e, t) {
          return this.delegate.selectRootElement(e, t);
        }
        parentNode(e) {
          return this.delegate.parentNode(e);
        }
        nextSibling(e) {
          return this.delegate.nextSibling(e);
        }
        setAttribute(e, t, i, r) {
          this.delegate.setAttribute(e, t, i, r);
        }
        removeAttribute(e, t, i) {
          this.delegate.removeAttribute(e, t, i);
        }
        addClass(e, t) {
          this.delegate.addClass(e, t);
        }
        removeClass(e, t) {
          this.delegate.removeClass(e, t);
        }
        setStyle(e, t, i, r) {
          this.delegate.setStyle(e, t, i, r);
        }
        removeStyle(e, t, i) {
          this.delegate.removeStyle(e, t, i);
        }
        setProperty(e, t, i) {
          "@" == t.charAt(0) && t == oE
            ? this.disableAnimations(e, !!i)
            : this.delegate.setProperty(e, t, i);
        }
        setValue(e, t) {
          this.delegate.setValue(e, t);
        }
        listen(e, t, i) {
          return this.delegate.listen(e, t, i);
        }
        disableAnimations(e, t) {
          this.engine.disableAnimations(e, t);
        }
      }
      class Nj extends aE {
        constructor(e, t, i, r) {
          super(t, i, r), (this.factory = e), (this.namespaceId = t);
        }
        setProperty(e, t, i) {
          "@" == t.charAt(0)
            ? "." == t.charAt(1) && t == oE
              ? this.disableAnimations(e, (i = void 0 === i || !!i))
              : this.engine.process(this.namespaceId, e, t.substr(1), i)
            : this.delegate.setProperty(e, t, i);
        }
        listen(e, t, i) {
          if ("@" == t.charAt(0)) {
            const r = (function Lj(n) {
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
            })(e);
            let s = t.substr(1),
              o = "";
            return (
              "@" != s.charAt(0) &&
                ([s, o] = (function Vj(n) {
                  const e = n.indexOf(".");
                  return [n.substring(0, e), n.substr(e + 1)];
                })(s)),
              this.engine.listen(this.namespaceId, r, s, o, (a) => {
                this.factory.scheduleListenerCallback(a._data || -1, i, a);
              })
            );
          }
          return this.delegate.listen(e, t, i);
        }
      }
      let Bj = (() => {
        class n extends Ec {
          constructor(t, i, r) {
            super(t.body, i, r);
          }
          ngOnDestroy() {
            this.flush();
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Y), C(Nf), C(Kf));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const xi = new A("AnimationModuleType"),
        lE = [
          { provide: pD, useClass: kj },
          {
            provide: Kf,
            useFactory: function Hj() {
              return new GB();
            },
          },
          { provide: Ec, useClass: Bj },
          {
            provide: po,
            useFactory: function Uj(n, e, t) {
              return new Pj(n, e, t);
            },
            deps: [kl, Ec, re],
          },
        ],
        cE = [
          {
            provide: Nf,
            useFactory: function jj() {
              return (function Rj() {
                return "function" == typeof rE();
              })()
                ? new Ij()
                : new tE();
            },
          },
          { provide: xi, useValue: "BrowserAnimations" },
          ...lE,
        ],
        $j = [
          { provide: Nf, useClass: ED },
          { provide: xi, useValue: "NoopAnimations" },
          ...lE,
        ];
      let zj = (() => {
          class n {
            static withConfig(t) {
              return { ngModule: n, providers: t.disableAnimations ? $j : cE };
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
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
      const Wj = new A("mat-sanity-checks", {
        providedIn: "root",
        factory: function Gj() {
          return !0;
        },
      });
      let Fe = (() => {
        class n {
          constructor(t, i, r) {
            (this._sanityChecks = i),
              (this._document = r),
              (this._hasDoneGlobalChecks = !1),
              t._applyBodyHighContrastModeCssClasses(),
              this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0);
          }
          _checkIsEnabled(t) {
            return (
              !bf() &&
              ("boolean" == typeof this._sanityChecks
                ? this._sanityChecks
                : !!this._sanityChecks[t])
            );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(_B), C(Wj, 8), C(Y));
          }),
          (n.ɵmod = ue({ type: n })),
          (n.ɵinj = le({ imports: [[$o], $o] })),
          n
        );
      })();
      function qj(n) {
        return class extends n {
          constructor(...e) {
            super(...e), (this._disabled = !1);
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(e) {
            this._disabled = ct(e);
          }
        };
      }
      function fE(n, e) {
        return class extends n {
          constructor(...t) {
            super(...t), (this.defaultColor = e), (this.color = e);
          }
          get color() {
            return this._color;
          }
          set color(t) {
            const i = t || this.defaultColor;
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
      function ip(n) {
        return class extends n {
          constructor(...e) {
            super(...e), (this._disableRipple = !1);
          }
          get disableRipple() {
            return this._disableRipple;
          }
          set disableRipple(e) {
            this._disableRipple = ct(e);
          }
        };
      }
      function Kj(n, e = 0) {
        return class extends n {
          constructor(...t) {
            super(...t), (this._tabIndex = e), (this.defaultTabIndex = e);
          }
          get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
          }
          set tabIndex(t) {
            this._tabIndex =
              null != t
                ? (function HL(n, e = 0) {
                    return (function UL(n) {
                      return !isNaN(parseFloat(n)) && !isNaN(Number(n));
                    })(n)
                      ? Number(n)
                      : e;
                  })(t)
                : this.defaultTabIndex;
          }
        };
      }
      let pE = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = ue({ type: n })),
          (n.ɵinj = le({ imports: [[Fe], Fe] })),
          n
        );
      })();
      class Xj {
        constructor(e, t, i) {
          (this._renderer = e),
            (this.element = t),
            (this.config = i),
            (this.state = 3);
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this);
        }
      }
      const mE = { enterDuration: 225, exitDuration: 150 },
        rp = yf({ passive: !0 }),
        gE = ["mousedown", "touchstart"],
        _E = ["mouseup", "mouseleave", "touchend", "touchcancel"];
      class e2 {
        constructor(e, t, i, r) {
          (this._target = e),
            (this._ngZone = t),
            (this._isPointerDown = !1),
            (this._activeRipples = new Set()),
            (this._pointerUpEventsRegistered = !1),
            r.isBrowser && (this._containerElement = ms(i));
        }
        fadeInRipple(e, t, i = {}) {
          const r = (this._containerRect =
              this._containerRect ||
              this._containerElement.getBoundingClientRect()),
            s = Object.assign(Object.assign({}, mE), i.animation);
          i.centered &&
            ((e = r.left + r.width / 2), (t = r.top + r.height / 2));
          const o =
              i.radius ||
              (function n2(n, e, t) {
                const i = Math.max(Math.abs(n - t.left), Math.abs(n - t.right)),
                  r = Math.max(Math.abs(e - t.top), Math.abs(e - t.bottom));
                return Math.sqrt(i * i + r * r);
              })(e, t, r),
            a = e - r.left,
            l = t - r.top,
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
            (function t2(n) {
              window.getComputedStyle(n).getPropertyValue("opacity");
            })(u),
            (u.style.transform = "scale(1)");
          const d = new Xj(this, u, i);
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
        fadeOutRipple(e) {
          const t = this._activeRipples.delete(e);
          if (
            (e === this._mostRecentTransientRipple &&
              (this._mostRecentTransientRipple = null),
            this._activeRipples.size || (this._containerRect = null),
            !t)
          )
            return;
          const i = e.element,
            r = Object.assign(Object.assign({}, mE), e.config.animation);
          (i.style.transitionDuration = `${r.exitDuration}ms`),
            (i.style.opacity = "0"),
            (e.state = 2),
            this._runTimeoutOutsideZone(() => {
              (e.state = 3), i.remove();
            }, r.exitDuration);
        }
        fadeOutAll() {
          this._activeRipples.forEach((e) => e.fadeOut());
        }
        fadeOutAllNonPersistent() {
          this._activeRipples.forEach((e) => {
            e.config.persistent || e.fadeOut();
          });
        }
        setupTriggerEvents(e) {
          const t = ms(e);
          !t ||
            t === this._triggerElement ||
            (this._removeTriggerEvents(),
            (this._triggerElement = t),
            this._registerEvents(gE));
        }
        handleEvent(e) {
          "mousedown" === e.type
            ? this._onMousedown(e)
            : "touchstart" === e.type
            ? this._onTouchStart(e)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._registerEvents(_E),
              (this._pointerUpEventsRegistered = !0));
        }
        _onMousedown(e) {
          const t = cD(e),
            i =
              this._lastTouchStartEvent &&
              Date.now() < this._lastTouchStartEvent + 800;
          !this._target.rippleDisabled &&
            !t &&
            !i &&
            ((this._isPointerDown = !0),
            this.fadeInRipple(e.clientX, e.clientY, this._target.rippleConfig));
        }
        _onTouchStart(e) {
          if (!this._target.rippleDisabled && !uD(e)) {
            (this._lastTouchStartEvent = Date.now()),
              (this._isPointerDown = !0);
            const t = e.changedTouches;
            for (let i = 0; i < t.length; i++)
              this.fadeInRipple(
                t[i].clientX,
                t[i].clientY,
                this._target.rippleConfig
              );
          }
        }
        _onPointerUp() {
          !this._isPointerDown ||
            ((this._isPointerDown = !1),
            this._activeRipples.forEach((e) => {
              !e.config.persistent &&
                (1 === e.state ||
                  (e.config.terminateOnPointerUp && 0 === e.state)) &&
                e.fadeOut();
            }));
        }
        _runTimeoutOutsideZone(e, t = 0) {
          this._ngZone.runOutsideAngular(() => setTimeout(e, t));
        }
        _registerEvents(e) {
          this._ngZone.runOutsideAngular(() => {
            e.forEach((t) => {
              this._triggerElement.addEventListener(t, this, rp);
            });
          });
        }
        _removeTriggerEvents() {
          this._triggerElement &&
            (gE.forEach((e) => {
              this._triggerElement.removeEventListener(e, this, rp);
            }),
            this._pointerUpEventsRegistered &&
              _E.forEach((e) => {
                this._triggerElement.removeEventListener(e, this, rp);
              }));
        }
      }
      const r2 = new A("mat-ripple-global-options");
      let sp = (() => {
          class n {
            constructor(t, i, r, s, o) {
              (this._elementRef = t),
                (this._animationMode = o),
                (this.radius = 0),
                (this._disabled = !1),
                (this._isInitialized = !1),
                (this._globalOptions = s || {}),
                (this._rippleRenderer = new e2(this, i, t, r));
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              t && this.fadeOutAllNonPersistent(),
                (this._disabled = t),
                this._setupTriggerEventsIfEnabled();
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement;
            }
            set trigger(t) {
              (this._trigger = t), this._setupTriggerEventsIfEnabled();
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
            launch(t, i = 0, r) {
              return "number" == typeof t
                ? this._rippleRenderer.fadeInRipple(
                    t,
                    i,
                    Object.assign(Object.assign({}, this.rippleConfig), r)
                  )
                : this._rippleRenderer.fadeInRipple(
                    0,
                    0,
                    Object.assign(Object.assign({}, this.rippleConfig), t)
                  );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(ve), y(re), y(Cn), y(r2, 8), y(xi, 8));
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [
                ["", "mat-ripple", ""],
                ["", "matRipple", ""],
              ],
              hostAttrs: [1, "mat-ripple"],
              hostVars: 2,
              hostBindings: function (t, i) {
                2 & t && Je("mat-ripple-unbounded", i.unbounded);
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
        yE = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({ imports: [[Fe], Fe] })),
            n
          );
        })(),
        vE = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({ imports: [[Fe]] })),
            n
          );
        })();
      const bE = new Set();
      let Ds,
        o2 = (() => {
          class n {
            constructor(t) {
              (this._platform = t),
                (this._matchMedia =
                  this._platform.isBrowser && window.matchMedia
                    ? window.matchMedia.bind(window)
                    : l2);
            }
            matchMedia(t) {
              return (
                (this._platform.WEBKIT || this._platform.BLINK) &&
                  (function a2(n) {
                    if (!bE.has(n))
                      try {
                        Ds ||
                          ((Ds = document.createElement("style")),
                          Ds.setAttribute("type", "text/css"),
                          document.head.appendChild(Ds)),
                          Ds.sheet &&
                            (Ds.sheet.insertRule(`@media ${n} {body{ }}`, 0),
                            bE.add(n));
                      } catch (e) {
                        console.error(e);
                      }
                  })(t),
                this._matchMedia(t)
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(Cn));
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })();
      function l2(n) {
        return {
          matches: "all" === n || "" === n,
          media: n,
          addListener: () => {},
          removeListener: () => {},
        };
      }
      let c2 = (() => {
        class n {
          constructor(t, i) {
            (this._mediaMatcher = t),
              (this._zone = i),
              (this._queries = new Map()),
              (this._destroySubject = new X());
          }
          ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete();
          }
          isMatched(t) {
            return CE(Vo(t)).some((r) => this._registerQuery(r).mql.matches);
          }
          observe(t) {
            let s = DC(CE(Vo(t)).map((o) => this._registerQuery(o).observable));
            return (
              (s = Fl(s.pipe(ze(1)), s.pipe(tD(1), eD(0)))),
              s.pipe(
                q((o) => {
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
          _registerQuery(t) {
            if (this._queries.has(t)) return this._queries.get(t);
            const i = this._mediaMatcher.matchMedia(t),
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
                  q(({ matches: o }) => ({ query: t, matches: o })),
                  wi(this._destroySubject)
                ),
                mql: i,
              };
            return this._queries.set(t, s), s;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(o2), C(re));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function CE(n) {
        return n
          .map((e) => e.split(","))
          .reduce((e, t) => e.concat(t))
          .map((e) => e.trim());
      }
      const Es_Medium = "(min-width: 960px) and (max-width: 1279.98px)",
        Es_Large = "(min-width: 1280px) and (max-width: 1919.98px)";
      function u2(n, e) {}
      const d2 = {
          bottomSheetState: qo("state", [
            jn("void, hidden", St({ transform: "translateY(100%)" })),
            jn("visible", St({ transform: "translateY(0%)" })),
            Ei(
              "visible => void, visible => hidden",
              ac([
                Di(`${hE.COMPLEX} ${dE.ACCELERATION_CURVE}`),
                cc("@*", lc(), { optional: !0 }),
              ])
            ),
            Ei(
              "void => visible",
              ac([
                Di(`${hE.EXITING} ${dE.DECELERATION_CURVE}`),
                cc("@*", lc(), { optional: !0 }),
              ])
            ),
          ]),
        },
        h2 = new A("MatBottomSheetData");
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
      let f2 = (() => {
          class n extends ic {
            constructor(t, i, r, s, o, a, l, c) {
              super(),
                (this._elementRef = t),
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
            attachComponentPortal(t) {
              return (
                this._validatePortalAttached(),
                this._setPanelClass(),
                this._savePreviouslyFocusedElement(),
                this._portalOutlet.attachComponentPortal(t)
              );
            }
            attachTemplatePortal(t) {
              return (
                this._validatePortalAttached(),
                this._setPanelClass(),
                this._savePreviouslyFocusedElement(),
                this._portalOutlet.attachTemplatePortal(t)
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
            _onAnimationDone(t) {
              "hidden" === t.toState
                ? this._restoreFocus()
                : "visible" === t.toState && this._trapFocus(),
                this._animationStateChanged.emit(t);
            }
            _onAnimationStart(t) {
              this._animationStateChanged.emit(t);
            }
            _toggleClass(t, i) {
              this._elementRef.nativeElement.classList.toggle(t, i);
            }
            _validatePortalAttached() {
              this._portalOutlet.hasAttached();
            }
            _setPanelClass() {
              this._elementRef.nativeElement.classList.add(
                ...Vo(this.bottomSheetConfig.panelClass || [])
              );
            }
            _forceFocus(t, i) {
              this._interactivityChecker.isFocusable(t) ||
                ((t.tabIndex = -1),
                this._ngZone.runOutsideAngular(() => {
                  const r = () => {
                    t.removeEventListener("blur", r),
                      t.removeEventListener("mousedown", r),
                      t.removeAttribute("tabindex");
                  };
                  t.addEventListener("blur", r),
                    t.addEventListener("mousedown", r);
                })),
                t.focus(i);
            }
            _focusByCssSelector(t, i) {
              let r = this._elementRef.nativeElement.querySelector(t);
              r && this._forceFocus(r, i);
            }
            _trapFocus() {
              const t = this._elementRef.nativeElement;
              switch (
                (this._focusTrap ||
                  (this._focusTrap = this._focusTrapFactory.create(t)),
                this.bottomSheetConfig.autoFocus)
              ) {
                case !1:
                case "dialog":
                  const i = _s();
                  i !== t && !t.contains(i) && t.focus();
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
              const t = this._elementFocusedBeforeOpened;
              if (
                this.bottomSheetConfig.restoreFocus &&
                t &&
                "function" == typeof t.focus
              ) {
                const i = _s(),
                  r = this._elementRef.nativeElement;
                (!i || i === this._document.body || i === r || r.contains(i)) &&
                  t.focus();
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
            (n.ɵfac = function (t) {
              return new (t || n)(
                y(ve),
                y(yn),
                y(lD),
                y(Mf),
                y(re),
                y(c2),
                y(Y, 8),
                y(op)
              );
            }),
            (n.ɵcmp = De({
              type: n,
              selectors: [["mat-bottom-sheet-container"]],
              viewQuery: function (t, i) {
                if ((1 & t && is(Go, 7), 2 & t)) {
                  let r;
                  _t((r = yt())) && (i._portalOutlet = r.first);
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
              hostBindings: function (t, i) {
                1 & t &&
                  Ja("@state.start", function (s) {
                    return i._onAnimationStart(s);
                  })("@state.done", function (s) {
                    return i._onAnimationDone(s);
                  }),
                  2 & t &&
                    (qe(
                      "aria-label",
                      null == i.bottomSheetConfig
                        ? null
                        : i.bottomSheetConfig.ariaLabel
                    ),
                    tl("@state", i._animationState));
              },
              features: [Q],
              decls: 1,
              vars: 0,
              consts: [["cdkPortalOutlet", ""]],
              template: function (t, i) {
                1 & t && On(0, u2, 0, 0, "ng-template", 0);
              },
              directives: [Go],
              styles: [
                ".mat-bottom-sheet-container{padding:8px 16px;min-width:100vw;box-sizing:border-box;display:block;outline:0;max-height:80vh;overflow:auto}.cdk-high-contrast-active .mat-bottom-sheet-container{outline:1px solid}.mat-bottom-sheet-container-xlarge,.mat-bottom-sheet-container-large,.mat-bottom-sheet-container-medium{border-top-left-radius:4px;border-top-right-radius:4px}.mat-bottom-sheet-container-medium{min-width:384px;max-width:calc(100vw - 128px)}.mat-bottom-sheet-container-large{min-width:512px;max-width:calc(100vw - 256px)}.mat-bottom-sheet-container-xlarge{min-width:576px;max-width:calc(100vw - 384px)}\n",
              ],
              encapsulation: 2,
              data: { animation: [d2.bottomSheetState] },
            })),
            n
          );
        })(),
        wE = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({ imports: [[Ww, Fe, rc], Fe] })),
            n
          );
        })();
      class DE {
        constructor(e, t) {
          (this._overlayRef = t),
            (this._afterDismissed = new X()),
            (this._afterOpened = new X()),
            (this.containerInstance = e),
            (this.disableClose = e.bottomSheetConfig.disableClose),
            e._animationStateChanged
              .pipe(
                Oe((i) => "done" === i.phaseName && "visible" === i.toState),
                ze(1)
              )
              .subscribe(() => {
                this._afterOpened.next(), this._afterOpened.complete();
              }),
            e._animationStateChanged
              .pipe(
                Oe((i) => "done" === i.phaseName && "hidden" === i.toState),
                ze(1)
              )
              .subscribe(() => {
                clearTimeout(this._closeFallbackTimeout), t.dispose();
              }),
            t
              .detachments()
              .pipe(ze(1))
              .subscribe(() => {
                this._afterDismissed.next(this._result),
                  this._afterDismissed.complete();
              }),
            la(
              t.backdropClick(),
              t.keydownEvents().pipe(Oe((i) => 27 === i.keyCode))
            ).subscribe((i) => {
              !this.disableClose &&
                ("keydown" !== i.type || !ys(i)) &&
                (i.preventDefault(), this.dismiss());
            });
        }
        dismiss(e) {
          this._afterDismissed.closed ||
            (this.containerInstance._animationStateChanged
              .pipe(
                Oe((t) => "start" === t.phaseName),
                ze(1)
              )
              .subscribe((t) => {
                (this._closeFallbackTimeout = setTimeout(() => {
                  this._overlayRef.dispose();
                }, t.totalTime + 100)),
                  this._overlayRef.detachBackdrop();
              }),
            (this._result = e),
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
      const p2 = new A("mat-bottom-sheet-default-options");
      let m2 = (() => {
        class n {
          constructor(t, i, r, s) {
            (this._overlay = t),
              (this._injector = i),
              (this._parentBottomSheet = r),
              (this._defaultOptions = s),
              (this._bottomSheetRefAtThisLevel = null);
          }
          get _openedBottomSheetRef() {
            const t = this._parentBottomSheet;
            return t
              ? t._openedBottomSheetRef
              : this._bottomSheetRefAtThisLevel;
          }
          set _openedBottomSheetRef(t) {
            this._parentBottomSheet
              ? (this._parentBottomSheet._openedBottomSheetRef = t)
              : (this._bottomSheetRefAtThisLevel = t);
          }
          open(t, i) {
            const r = (function g2(n, e) {
                return Object.assign(Object.assign({}, n), e);
              })(this._defaultOptions || new op(), i),
              s = this._createOverlay(r),
              o = this._attachContainer(s, r),
              a = new DE(o, s);
            if (t instanceof Jt)
              o.attachTemplatePortal(
                new nc(t, null, { $implicit: r.data, bottomSheetRef: a })
              );
            else {
              const l = new zo(t, void 0, this._createInjector(r, a)),
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
          dismiss(t) {
            this._openedBottomSheetRef && this._openedBottomSheetRef.dismiss(t);
          }
          ngOnDestroy() {
            this._bottomSheetRefAtThisLevel &&
              this._bottomSheetRefAtThisLevel.dismiss();
          }
          _attachContainer(t, i) {
            const s = we.create({
                parent:
                  (i && i.viewContainerRef && i.viewContainerRef.injector) ||
                  this._injector,
                providers: [{ provide: op, useValue: i }],
              }),
              o = new zo(f2, i.viewContainerRef, s);
            return t.attach(o).instance;
          }
          _createOverlay(t) {
            const i = new Df({
              direction: t.direction,
              hasBackdrop: t.hasBackdrop,
              disposeOnNavigation: t.closeOnNavigation,
              maxWidth: "100%",
              scrollStrategy:
                t.scrollStrategy || this._overlay.scrollStrategies.block(),
              positionStrategy: this._overlay
                .position()
                .global()
                .centerHorizontally()
                .bottom("0"),
            });
            return (
              t.backdropClass && (i.backdropClass = t.backdropClass),
              this._overlay.create(i)
            );
          }
          _createInjector(t, i) {
            const r = t && t.viewContainerRef && t.viewContainerRef.injector,
              s = [
                { provide: DE, useValue: i },
                { provide: h2, useValue: t.data },
              ];
            return (
              t.direction &&
                (!r || !r.get(Uo, null, j.Optional)) &&
                s.push({
                  provide: Uo,
                  useValue: { value: t.direction, change: P() },
                }),
              we.create({ parent: r || this._injector, providers: s })
            );
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Wo), C(we), C(n, 12), C(p2, 8));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: wE })),
          n
        );
      })();
      const _2 = ["mat-button", ""],
        y2 = ["*"],
        b2 = [
          "mat-button",
          "mat-flat-button",
          "mat-icon-button",
          "mat-raised-button",
          "mat-stroked-button",
          "mat-mini-fab",
          "mat-fab",
        ],
        C2 = fE(
          qj(
            ip(
              class {
                constructor(n) {
                  this._elementRef = n;
                }
              }
            )
          )
        );
      let w2 = (() => {
          class n extends C2 {
            constructor(t, i, r) {
              super(t),
                (this._focusMonitor = i),
                (this._animationMode = r),
                (this.isRoundButton = this._hasHostAttributes(
                  "mat-fab",
                  "mat-mini-fab"
                )),
                (this.isIconButton =
                  this._hasHostAttributes("mat-icon-button"));
              for (const s of b2)
                this._hasHostAttributes(s) &&
                  this._getHostElement().classList.add(s);
              t.nativeElement.classList.add("mat-button-base"),
                this.isRoundButton && (this.color = "accent");
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._elementRef, !0);
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            focus(t, i) {
              t
                ? this._focusMonitor.focusVia(this._getHostElement(), t, i)
                : this._getHostElement().focus(i);
            }
            _getHostElement() {
              return this._elementRef.nativeElement;
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled;
            }
            _hasHostAttributes(...t) {
              return t.some((i) => this._getHostElement().hasAttribute(i));
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(ve), y(oc), y(xi, 8));
            }),
            (n.ɵcmp = De({
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
              viewQuery: function (t, i) {
                if ((1 & t && is(sp, 5), 2 & t)) {
                  let r;
                  _t((r = yt())) && (i.ripple = r.first);
                }
              },
              hostAttrs: [1, "mat-focus-indicator"],
              hostVars: 5,
              hostBindings: function (t, i) {
                2 & t &&
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
              features: [Q],
              attrs: _2,
              ngContentSelectors: y2,
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
              template: function (t, i) {
                1 & t &&
                  (Zn(),
                  m(0, "span", 0),
                  Et(1),
                  g(),
                  L(2, "span", 1),
                  L(3, "span", 2)),
                  2 & t &&
                    (Zt(2),
                    Je(
                      "mat-button-ripple-round",
                      i.isRoundButton || i.isIconButton
                    ),
                    mt("matRippleDisabled", i._isRippleDisabled())(
                      "matRippleCentered",
                      i.isIconButton
                    )("matRippleTrigger", i._getHostElement()));
              },
              directives: [sp],
              styles: [
                ".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        D2 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({ imports: [[yE, Fe], Fe] })),
            n
          );
        })(),
        E2 = (() => {
          class n {
            constructor(t) {
              (this._bottomSheet = t),
                (this.gpp = !1),
                (this.cloudage = !1),
                (this.igt = !1);
            }
            ngOnInit() {}
            openBottomSheet(t) {
              this._bottomSheet.open(
                1 == t ? LL : 2 == t ? BL : 3 == t ? jL : VL
              );
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(m2));
            }),
            (n.ɵcmp = De({
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
                  1,
                  "round",
                ],
                [
                  "width",
                  "100%",
                  "height",
                  "300px",
                  "src",
                  "https://codevian.com",
                  1,
                  "round",
                ],
                [
                  "width",
                  "100%",
                  "height",
                  "300px",
                  "src",
                  "https://www.careers360.com/colleges/government-polytechnic-pune",
                  1,
                  "round",
                ],
                [
                  "width",
                  "100%",
                  "height",
                  "300px",
                  "src",
                  "https://infinitegraphixads.com/",
                  1,
                  "round",
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
              template: function (t, i) {
                1 & t &&
                  (m(0, "header"),
                  m(1, "h3", 0),
                  E(2, "Experienced From"),
                  g(),
                  m(3, "div"),
                  m(4, "div", 1),
                  m(5, "div"),
                  m(6, "h3"),
                  E(7, "Cloud Age Pune"),
                  g(),
                  g(),
                  m(8, "div"),
                  m(9, "button", 2),
                  ye("click", function () {
                    return i.openBottomSheet(1);
                  }),
                  E(10, "Info"),
                  g(),
                  g(),
                  g(),
                  m(11, "div", 3),
                  L(12, "iframe", 4),
                  g(),
                  g(),
                  m(13, "div"),
                  m(14, "div", 1),
                  m(15, "div"),
                  m(16, "h3"),
                  E(17, "Codevian Technologies PVT.LTD"),
                  g(),
                  g(),
                  m(18, "div"),
                  m(19, "button", 2),
                  ye("click", function () {
                    return i.openBottomSheet(1);
                  }),
                  E(20, "Info"),
                  g(),
                  g(),
                  g(),
                  m(21, "div", 3),
                  L(22, "iframe", 5),
                  g(),
                  g(),
                  L(23, "br"),
                  L(24, "br"),
                  m(25, "div"),
                  m(26, "h3", 0),
                  E(27, "Studied From"),
                  g(),
                  m(28, "div"),
                  m(29, "div", 1),
                  m(30, "div"),
                  m(31, "h3"),
                  E(32, "Goverment Polytechnic pune"),
                  g(),
                  g(),
                  m(33, "div"),
                  m(34, "button", 2),
                  ye("click", function () {
                    return i.openBottomSheet(2);
                  }),
                  E(35, "Info"),
                  g(),
                  g(),
                  g(),
                  m(36, "div", 3),
                  L(37, "iframe", 6),
                  g(),
                  g(),
                  m(38, "div"),
                  m(39, "div", 1),
                  m(40, "div"),
                  m(41, "h3"),
                  E(42, "Infinite grafix Technology"),
                  g(),
                  g(),
                  m(43, "div"),
                  m(44, "button", 2),
                  ye("click", function () {
                    return i.openBottomSheet(3);
                  }),
                  E(45, "Info"),
                  g(),
                  g(),
                  g(),
                  m(46, "div", 3),
                  L(47, "iframe", 7),
                  g(),
                  g(),
                  g(),
                  g(),
                  m(48, "h3"),
                  E(49, "About Me"),
                  g(),
                  m(50, "footer", 8),
                  m(51, "b"),
                  E(
                    52,
                    " I Have Mathematical Achivements Regarding logical Thincking And problem solving exams And because of Some Experienced Faculties I developed my Great Knowledge of problem solving skills"
                  ),
                  g(),
                  (function Pd(n, e, t) {
                    const i = D(),
                      r = ie(),
                      s = n + 20,
                      o = r.firstCreatePass
                        ? (function vI(n, e, t, i, r) {
                            const s = e.consts,
                              o = hi(s, i),
                              a = Pr(e, n, 8, "ng-container", o);
                            return (
                              null !== o && qa(a, o, !0),
                              md(e, t, a, hi(s, r)),
                              null !== e.queries &&
                                e.queries.elementStart(e, a),
                              a
                            );
                          })(s, r, i, e, t)
                        : r.data[s];
                    Sn(o, !0);
                    const a = (i[s] = i[G].createComment(""));
                    ja(r, i, a, o),
                      at(a, i),
                      ga(o) && (fd(r, i, o), f_(r, o, i)),
                      null != t && pd(i, o);
                  })(53),
                  L(54, "br"),
                  m(55, "b"),
                  m(56, "h4"),
                  E(57, "Career objective"),
                  g(),
                  E(
                    58,
                    " To obtain a position that will allow me to utilize my technical skills and willingness to learn and in making an organization successful. "
                  ),
                  g(),
                  (function Nd() {
                    let n = Ge();
                    const e = ie();
                    hu() ? fu() : ((n = n.parent), Sn(n, !1)),
                      e.firstCreatePass &&
                        (Da(e, n), ru(n) && e.queries.elementEnd(n));
                  })(),
                  g());
              },
              directives: [w2],
              styles: [
                "",
                "[_ngcontent-%COMP%]::-webkit-scrollbar {\n    width: 10px;\n  }\n\n  \n  [_ngcontent-%COMP%]::-webkit-scrollbar-track {\n    background: #f1f1f1;\n  }\n\n  \n  [_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n    background: #888;\n  }\n\n  \n  [_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n    background: rgba(214, 229, 245, 0.52);\n\n  }\n  .round[_ngcontent-%COMP%]{\n    border-radius: 20px;\n  }",
              ],
            })),
            n
          );
        })(),
        EE = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = De({
              type: n,
              selectors: [["app-main"]],
              decls: 21,
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
                [2, "z-index", "90"],
                [2, "display", "flex"],
                [2, "color", "rgb(255, 98, 0)"],
                [
                  "src",
                  "./assets/2289_SkVNQSBGQU1PIDEwMjgtMTIy.png",
                  "alt",
                  "",
                  1,
                  "img",
                ],
                [
                  "src",
                  "./assets/Grunge-frame-design-on-transparent-background-PNG.png",
                  "alt",
                  "",
                  2,
                  "width",
                  "100%",
                  "height",
                  "100%",
                  "position",
                  "absolute",
                  "top",
                  "0",
                  "left",
                  "0",
                  "opacity",
                  "0.2",
                ],
              ],
              template: function (t, i) {
                1 & t &&
                  (m(0, "div", 0),
                  m(1, "div", 1),
                  m(2, "div", 2),
                  m(3, "div", 3),
                  m(4, "div"),
                  m(5, "h1"),
                  E(6, "Hi"),
                  g(),
                  m(7, "h2"),
                  E(8, "My Name is"),
                  g(),
                  m(9, "h1", 4),
                  E(10, "Afifahmad"),
                  g(),
                  m(11, "h3", 4),
                  E(12, "From India"),
                  g(),
                  g(),
                  m(13, "div"),
                  L(14, "img", 5),
                  g(),
                  g(),
                  m(15, "h4"),
                  E(16, " Having "),
                  m(17, "span", 4),
                  E(18, "2.5 + years "),
                  g(),
                  E(
                    19,
                    " of experience as AWS Administrator | AWS Data Analytics | Cloudera Hadoop Associate | MEAN Stack Web Development "
                  ),
                  g(),
                  g(),
                  L(20, "img", 6),
                  g(),
                  g());
              },
              styles: [
                "",
                "div[_ngcontent-%COMP%]    > .img[_ngcontent-%COMP%] {\n    width: 200px;\n    height: 200px;\n  }",
              ],
            })),
            n
          );
        })();
      const ME = ["*"];
      function M2(n, e) {
        if (1 & n) {
          const t = Xa();
          m(0, "button", 7),
            ye("click", function () {
              const s = ya(t).index;
              return yi(2).to(s);
            }),
            g();
        }
        if (2 & n) {
          const t = e.index,
            i = yi(2);
          Je("active", t === i.activeSlide),
            qe("aria-current", t === i.activeSlide);
        }
      }
      function S2(n, e) {
        if (
          (1 & n && (m(0, "div", 5), On(1, M2, 1, 3, "button", 6), g()), 2 & n)
        ) {
          const t = yi();
          Zt(1), mt("ngForOf", t.items);
        }
      }
      function x2(n, e) {
        if (1 & n) {
          const t = Xa();
          m(0, "button", 8),
            ye("click", function () {
              return ya(t), yi().prev();
            }),
            L(1, "span", 9),
            m(2, "span", 10),
            E(3, "Previous"),
            g(),
            g();
        }
      }
      function A2(n, e) {
        if (1 & n) {
          const t = Xa();
          m(0, "button", 11),
            ye("click", function () {
              return ya(t), yi().next();
            }),
            L(1, "span", 12),
            m(2, "span", 10),
            E(3, "Next"),
            g(),
            g();
        }
      }
      let SE = (() => {
        class n {
          constructor(t) {
            (this._elementRef = t),
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
          (n.ɵfac = function (t) {
            return new (t || n)(y(ve));
          }),
          (n.ɵcmp = De({
            type: n,
            selectors: [["mdb-carousel-item"]],
            hostVars: 12,
            hostBindings: function (t, i) {
              2 & t &&
                Je("carousel-item", i.carouselItem)("active", i.active)(
                  "carousel-item-next",
                  i.next
                )("carousel-item-prev", i.prev)("carousel-item-start", i.start)(
                  "carousel-item-end",
                  i.end
                );
            },
            inputs: { interval: "interval" },
            ngContentSelectors: ME,
            decls: 1,
            vars: 0,
            template: function (t, i) {
              1 & t && (Zn(), Et(0));
            },
            encapsulation: 2,
          })),
          n
        );
      })();
      var Ht = (() => {
        return (
          ((n = Ht || (Ht = {}))[(n.UNKNOWN = 0)] = "UNKNOWN"),
          (n[(n.NEXT = 1)] = "NEXT"),
          (n[(n.PREV = 2)] = "PREV"),
          Ht
        );
        var n;
      })();
      let T2 = (() => {
          class n {
            constructor(t, i) {
              (this._elementRef = t),
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
                (this._destroy$ = new X());
            }
            get items() {
              return this._items && this._items.toArray();
            }
            get controls() {
              return this._controls;
            }
            set controls(t) {
              this._controls = ct(t);
            }
            get dark() {
              return this._dark;
            }
            set dark(t) {
              this._dark = ct(t);
            }
            get indicators() {
              return this._indicators;
            }
            set indicators(t) {
              this._indicators = ct(t);
            }
            get ride() {
              return this._ride;
            }
            set ride(t) {
              this._ride = ct(t);
            }
            get interval() {
              return this._interval;
            }
            set interval(t) {
              (this._interval = t), this.items && this._restartInterval();
            }
            get activeSlide() {
              return this._activeSlide;
            }
            set activeSlide(t) {
              this.items.length &&
                this._activeSlide !== t &&
                ((this._activeSlide = t), this._restartInterval());
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
                    .pipe(wi(this._destroy$))
                    .subscribe((t) => {
                      "ArrowRight" === t.key
                        ? this.next()
                        : "ArrowLeft" === t.key && this.prev();
                    });
            }
            ngOnDestroy() {
              this._destroy$.next(), this._destroy$.complete();
            }
            _setActiveSlide(t) {
              (this.items[this._activeSlide].active = !1),
                (this.items[t].active = !0),
                (this._activeSlide = t);
            }
            _restartInterval() {
              this._resetInterval();
              const t = this.items[this.activeSlide],
                i = t.interval ? t.interval : this.interval;
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
            to(t) {
              if (!(t > this.items.length - 1 || t < 0))
                return this.activeSlide === t
                  ? (this.stop(), void this.play())
                  : (this._animateSlides(
                      t > this.activeSlide ? Ht.NEXT : Ht.PREV,
                      this.activeSlide,
                      t
                    ),
                    void (this.activeSlide = t));
            }
            next() {
              this._isSliding || this._slide(Ht.NEXT);
            }
            prev() {
              this._isSliding || this._slide(Ht.PREV);
            }
            _slide(t) {
              if (
                !this.wrap &&
                ((t === Ht.NEXT &&
                  this._activeSlide === this.items.length - 1) ||
                  (t === Ht.PREV && 0 === this._activeSlide))
              )
                return;
              const s = this._getNewSlideIndex(t);
              this._animateSlides(t, this.activeSlide, s),
                (this.activeSlide = s),
                this.slide.emit();
            }
            _animateSlides(t, i, r) {
              const s = this.items[i],
                o = this.items[r],
                a = s.host,
                l = o.host;
              if (
                ((this._isSliding = !0),
                this._isPlaying && this.stop(),
                t === Ht.NEXT)
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
              } else if (t === Ht.PREV) {
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
            _reflow(t) {
              return t.offsetHeight;
            }
            _emulateTransitionEnd(t, i) {
              let r = !1;
              const o = i + 5;
              ir(t, "transitionend")
                .pipe(ze(1))
                .subscribe(() => {
                  r = !0;
                }),
                setTimeout(() => {
                  r || t.dispatchEvent(new Event("transitionend"));
                }, o);
            }
            _getNewSlideIndex(t) {
              let i;
              return (
                t === Ht.NEXT && (i = this._getNextSlideIndex()),
                t === Ht.PREV && (i = this._getPrevSlideIndex()),
                i
              );
            }
            _getNextSlideIndex() {
              const t = this._activeSlide === this.items.length - 1;
              return t
                ? this.wrap && t
                  ? 0
                  : this._activeSlide
                : this._activeSlide + 1;
            }
            _getPrevSlideIndex() {
              const t = 0 === this._activeSlide;
              return t
                ? this.wrap && t
                  ? this.items.length - 1
                  : this._activeSlide
                : this._activeSlide - 1;
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(ve), y(yn));
            }),
            (n.ɵcmp = De({
              type: n,
              selectors: [["mdb-carousel"]],
              contentQueries: function (t, i, r) {
                if ((1 & t && Nn(r, SE, 4), 2 & t)) {
                  let s;
                  _t((s = yt())) && (i._items = s);
                }
              },
              hostBindings: function (t, i) {
                1 & t &&
                  ye("mouseenter", function () {
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
              ngContentSelectors: ME,
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
              template: function (t, i) {
                1 & t &&
                  (Zn(),
                  m(0, "div", 0),
                  On(1, S2, 2, 1, "div", 1),
                  m(2, "div", 2),
                  Et(3),
                  g(),
                  On(4, x2, 4, 0, "button", 3),
                  On(5, A2, 4, 0, "button", 4),
                  g()),
                  2 & t &&
                    (Je("carousel-fade", "fade" === i.animation)(
                      "carousel-dark",
                      i.dark
                    ),
                    Zt(1),
                    mt("ngIf", i.indicators),
                    Zt(3),
                    mt("ngIf", i.controls),
                    Zt(1),
                    mt("ngIf", i.controls));
              },
              directives: [xl, eC],
              encapsulation: 2,
              changeDetection: 0,
            })),
            n
          );
        })(),
        I2 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({ imports: [[Eo]] })),
            n
          );
        })();
      const R2 = [
        { path: "", component: EE },
        { path: "home", component: EE },
        { path: "about", component: E2 },
        {
          path: "project",
          component: (() => {
            class n {
              constructor() {}
              ngOnInit() {}
            }
            return (
              (n.ɵfac = function (t) {
                return new (t || n)();
              }),
              (n.ɵcmp = De({
                type: n,
                selectors: [["app-project"]],
                decls: 35,
                vars: 3,
                consts: [
                  [1, "card", "w-250"],
                  [
                    "width",
                    "300px",
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
                template: function (t, i) {
                  1 & t &&
                    (m(0, "div"),
                    m(1, "div", 0),
                    L(2, "img", 1),
                    m(3, "div", 2),
                    m(4, "h5", 3),
                    E(5, "Parking Solution"),
                    g(),
                    m(6, "p", 4),
                    E(
                      7,
                      " To Analise this Huge Amount of Data in Real Time and Getting Insight From Data To creating Strategies For BI Team "
                    ),
                    g(),
                    g(),
                    g(),
                    L(8, "br"),
                    L(9, "hr"),
                    L(10, "br"),
                    m(11, "div", 0),
                    L(12, "iframe", 5),
                    m(13, "div", 2),
                    m(14, "h5", 3),
                    E(15, "Sample Mattress"),
                    g(),
                    m(16, "p", 4),
                    E(
                      17,
                      " Sample Mattress Website using Pure CSS and HTML Only "
                    ),
                    g(),
                    g(),
                    g(),
                    L(18, "br"),
                    L(19, "hr"),
                    L(20, "br"),
                    m(21, "div", 0),
                    m(22, "mdb-carousel", 6),
                    m(23, "mdb-carousel-item"),
                    L(24, "img", 7),
                    g(),
                    m(25, "mdb-carousel-item"),
                    L(26, "img", 8),
                    g(),
                    m(27, "mdb-carousel-item"),
                    L(28, "img", 9),
                    L(29, "div", 10),
                    g(),
                    g(),
                    m(30, "div", 2),
                    m(31, "h5", 3),
                    E(32, "Mini Weather Station"),
                    g(),
                    m(33, "p", 4),
                    E(
                      34,
                      " Mini Weather Station Using Arduino to Getting Temprature,Humidity,Intensity and Sending it to Client Using ThingSpeak "
                    ),
                    g(),
                    g(),
                    g(),
                    g()),
                    2 & t &&
                      (Zt(22),
                      mt("controls", !0)("indicators", !0)(
                        "animation",
                        "fade"
                      ));
                },
                directives: [T2, SE],
                styles: ["", "div[_ngcontent-%COMP%]{\n    color: black;\n  }"],
              })),
              n
            );
          })(),
        },
      ];
      let k2 = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)();
          }),
          (n.ɵmod = ue({ type: n })),
          (n.ɵinj = le({ imports: [[Sw.forRoot(R2)], Sw] })),
          n
        );
      })();
      function O2(n, e) {}
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
      const F2 = {
        dialogContainer: qo("dialogContainer", [
          jn("void, exit", St({ opacity: 0, transform: "scale(0.7)" })),
          jn("enter", St({ transform: "none" })),
          Ei(
            "* => enter",
            ac([
              Di(
                "150ms cubic-bezier(0, 0, 0.2, 1)",
                St({ transform: "none", opacity: 1 })
              ),
              cc("@*", lc(), { optional: !0 }),
            ])
          ),
          Ei(
            "* => void, * => exit",
            ac([
              Di("75ms cubic-bezier(0.4, 0.0, 0.2, 1)", St({ opacity: 0 })),
              cc("@*", lc(), { optional: !0 }),
            ])
          ),
        ]),
      };
      let P2 = (() => {
          class n extends ic {
            constructor(t, i, r, s, o, a, l, c) {
              super(),
                (this._elementRef = t),
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
            attachComponentPortal(t) {
              return (
                this._portalOutlet.hasAttached(),
                this._portalOutlet.attachComponentPortal(t)
              );
            }
            attachTemplatePortal(t) {
              return (
                this._portalOutlet.hasAttached(),
                this._portalOutlet.attachTemplatePortal(t)
              );
            }
            _recaptureFocus() {
              this._containsFocus() || this._trapFocus();
            }
            _forceFocus(t, i) {
              this._interactivityChecker.isFocusable(t) ||
                ((t.tabIndex = -1),
                this._ngZone.runOutsideAngular(() => {
                  const r = () => {
                    t.removeEventListener("blur", r),
                      t.removeEventListener("mousedown", r),
                      t.removeAttribute("tabindex");
                  };
                  t.addEventListener("blur", r),
                    t.addEventListener("mousedown", r);
                })),
                t.focus(i);
            }
            _focusByCssSelector(t, i) {
              let r = this._elementRef.nativeElement.querySelector(t);
              r && this._forceFocus(r, i);
            }
            _trapFocus() {
              const t = this._elementRef.nativeElement;
              switch (this._config.autoFocus) {
                case !1:
                case "dialog":
                  this._containsFocus() || t.focus();
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
              const t = this._elementFocusedBeforeDialogWasOpened;
              if (
                this._config.restoreFocus &&
                t &&
                "function" == typeof t.focus
              ) {
                const i = _s(),
                  r = this._elementRef.nativeElement;
                (!i || i === this._document.body || i === r || r.contains(i)) &&
                  (this._focusMonitor
                    ? (this._focusMonitor.focusVia(
                        t,
                        this._closeInteractionType
                      ),
                      (this._closeInteractionType = null))
                    : t.focus());
              }
              this._focusTrap && this._focusTrap.destroy();
            }
            _focusDialogContainer() {
              this._elementRef.nativeElement.focus &&
                this._elementRef.nativeElement.focus();
            }
            _containsFocus() {
              const t = this._elementRef.nativeElement,
                i = _s();
              return t === i || t.contains(i);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(
                y(ve),
                y(lD),
                y(yn),
                y(Y, 8),
                y(ap),
                y(Mf),
                y(re),
                y(oc)
              );
            }),
            (n.ɵdir = k({
              type: n,
              viewQuery: function (t, i) {
                if ((1 & t && is(Go, 7), 2 & t)) {
                  let r;
                  _t((r = yt())) && (i._portalOutlet = r.first);
                }
              },
              features: [Q],
            })),
            n
          );
        })(),
        N2 = (() => {
          class n extends P2 {
            constructor() {
              super(...arguments), (this._state = "enter");
            }
            _onAnimationDone({ toState: t, totalTime: i }) {
              "enter" === t
                ? (this._config.delayFocusTrap && this._trapFocus(),
                  this._animationStateChanged.next({
                    state: "opened",
                    totalTime: i,
                  }))
                : "exit" === t &&
                  (this._restoreFocus(),
                  this._animationStateChanged.next({
                    state: "closed",
                    totalTime: i,
                  }));
            }
            _onAnimationStart({ toState: t, totalTime: i }) {
              "enter" === t
                ? this._animationStateChanged.next({
                    state: "opening",
                    totalTime: i,
                  })
                : ("exit" === t || "void" === t) &&
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
              let e;
              return function (i) {
                return (e || (e = ot(n)))(i || n);
              };
            })()),
            (n.ɵcmp = De({
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
              hostBindings: function (t, i) {
                1 & t &&
                  Ja("@dialogContainer.start", function (s) {
                    return i._onAnimationStart(s);
                  })("@dialogContainer.done", function (s) {
                    return i._onAnimationDone(s);
                  }),
                  2 & t &&
                    ($d("id", i._id),
                    qe("role", i._config.role)(
                      "aria-labelledby",
                      i._config.ariaLabel ? null : i._ariaLabelledBy
                    )("aria-label", i._config.ariaLabel)(
                      "aria-describedby",
                      i._config.ariaDescribedBy || null
                    ),
                    tl("@dialogContainer", i._state));
              },
              features: [Q],
              decls: 1,
              vars: 0,
              consts: [["cdkPortalOutlet", ""]],
              template: function (t, i) {
                1 & t && On(0, O2, 0, 0, "ng-template", 0);
              },
              directives: [Go],
              styles: [
                ".mat-dialog-container{display:block;padding:24px;border-radius:4px;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%;min-height:inherit;max-height:inherit}.cdk-high-contrast-active .mat-dialog-container{outline:solid 1px}.mat-dialog-content{display:block;margin:0 -24px;padding:0 24px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}.mat-dialog-title{margin:0 0 20px;display:block}.mat-dialog-actions{padding:8px 0;display:flex;flex-wrap:wrap;min-height:52px;align-items:center;box-sizing:content-box;margin-bottom:-24px}.mat-dialog-actions[align=end]{justify-content:flex-end}.mat-dialog-actions[align=center]{justify-content:center}.mat-dialog-actions .mat-button-base+.mat-button-base,.mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-dialog-actions .mat-button-base+.mat-button-base,[dir=rtl] .mat-dialog-actions .mat-mdc-button-base+.mat-mdc-button-base{margin-left:0;margin-right:8px}\n",
              ],
              encapsulation: 2,
              data: { animation: [F2.dialogContainer] },
            })),
            n
          );
        })(),
        L2 = 0;
      class V2 {
        constructor(e, t, i = "mat-dialog-" + L2++) {
          (this._overlayRef = e),
            (this._containerInstance = t),
            (this.id = i),
            (this.disableClose = this._containerInstance._config.disableClose),
            (this._afterOpened = new X()),
            (this._afterClosed = new X()),
            (this._beforeClosed = new X()),
            (this._state = 0),
            (t._id = i),
            t._animationStateChanged
              .pipe(
                Oe((r) => "opened" === r.state),
                ze(1)
              )
              .subscribe(() => {
                this._afterOpened.next(), this._afterOpened.complete();
              }),
            t._animationStateChanged
              .pipe(
                Oe((r) => "closed" === r.state),
                ze(1)
              )
              .subscribe(() => {
                clearTimeout(this._closeFallbackTimeout),
                  this._finishDialogClose();
              }),
            e.detachments().subscribe(() => {
              this._beforeClosed.next(this._result),
                this._beforeClosed.complete(),
                this._afterClosed.next(this._result),
                this._afterClosed.complete(),
                (this.componentInstance = null),
                this._overlayRef.dispose();
            }),
            e
              .keydownEvents()
              .pipe(Oe((r) => 27 === r.keyCode && !this.disableClose && !ys(r)))
              .subscribe((r) => {
                r.preventDefault(), xE(this, "keyboard");
              }),
            e.backdropClick().subscribe(() => {
              this.disableClose
                ? this._containerInstance._recaptureFocus()
                : xE(this, "mouse");
            });
        }
        close(e) {
          (this._result = e),
            this._containerInstance._animationStateChanged
              .pipe(
                Oe((t) => "closing" === t.state),
                ze(1)
              )
              .subscribe((t) => {
                this._beforeClosed.next(e),
                  this._beforeClosed.complete(),
                  this._overlayRef.detachBackdrop(),
                  (this._closeFallbackTimeout = setTimeout(
                    () => this._finishDialogClose(),
                    t.totalTime + 100
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
        updatePosition(e) {
          let t = this._getPositionStrategy();
          return (
            e && (e.left || e.right)
              ? e.left
                ? t.left(e.left)
                : t.right(e.right)
              : t.centerHorizontally(),
            e && (e.top || e.bottom)
              ? e.top
                ? t.top(e.top)
                : t.bottom(e.bottom)
              : t.centerVertically(),
            this._overlayRef.updatePosition(),
            this
          );
        }
        updateSize(e = "", t = "") {
          return (
            this._overlayRef.updateSize({ width: e, height: t }),
            this._overlayRef.updatePosition(),
            this
          );
        }
        addPanelClass(e) {
          return this._overlayRef.addPanelClass(e), this;
        }
        removePanelClass(e) {
          return this._overlayRef.removePanelClass(e), this;
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
      function xE(n, e, t) {
        return (
          void 0 !== n._containerInstance &&
            (n._containerInstance._closeInteractionType = e),
          n.close(t)
        );
      }
      const B2 = new A("MatDialogData"),
        j2 = new A("mat-dialog-default-options"),
        AE = new A("mat-dialog-scroll-strategy"),
        U2 = {
          provide: AE,
          deps: [Wo],
          useFactory: function H2(n) {
            return () => n.scrollStrategies.block();
          },
        };
      let $2 = (() => {
          class n {
            constructor(t, i, r, s, o, a, l, c, u, d) {
              (this._overlay = t),
                (this._injector = i),
                (this._defaultOptions = r),
                (this._parentDialog = s),
                (this._overlayContainer = o),
                (this._dialogRefConstructor = l),
                (this._dialogContainerType = c),
                (this._dialogDataToken = u),
                (this._openDialogsAtThisLevel = []),
                (this._afterAllClosedAtThisLevel = new X()),
                (this._afterOpenedAtThisLevel = new X()),
                (this._ariaHiddenElements = new Map()),
                (this.afterAllClosed = zh(() =>
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
              const t = this._parentDialog;
              return t
                ? t._getAfterAllClosed()
                : this._afterAllClosedAtThisLevel;
            }
            open(t, i) {
              (i = (function z2(n, e) {
                return Object.assign(Object.assign({}, e), n);
              })(i, this._defaultOptions || new ap())),
                i.id && this.getDialogById(i.id);
              const r = this._createOverlay(i),
                s = this._attachDialogContainer(r, i),
                o = this._attachDialogContent(t, s, r, i);
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
            getDialogById(t) {
              return this.openDialogs.find((i) => i.id === t);
            }
            ngOnDestroy() {
              this._closeDialogs(this._openDialogsAtThisLevel),
                this._afterAllClosedAtThisLevel.complete(),
                this._afterOpenedAtThisLevel.complete();
            }
            _createOverlay(t) {
              const i = this._getOverlayConfig(t);
              return this._overlay.create(i);
            }
            _getOverlayConfig(t) {
              const i = new Df({
                positionStrategy: this._overlay.position().global(),
                scrollStrategy: t.scrollStrategy || this._scrollStrategy(),
                panelClass: t.panelClass,
                hasBackdrop: t.hasBackdrop,
                direction: t.direction,
                minWidth: t.minWidth,
                minHeight: t.minHeight,
                maxWidth: t.maxWidth,
                maxHeight: t.maxHeight,
                disposeOnNavigation: t.closeOnNavigation,
              });
              return t.backdropClass && (i.backdropClass = t.backdropClass), i;
            }
            _attachDialogContainer(t, i) {
              const s = we.create({
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
              return t.attach(o).instance;
            }
            _attachDialogContent(t, i, r, s) {
              const o = new this._dialogRefConstructor(r, i, s.id);
              if (t instanceof Jt)
                i.attachTemplatePortal(
                  new nc(t, null, { $implicit: s.data, dialogRef: o })
                );
              else {
                const a = this._createInjector(s, o, i),
                  l = i.attachComponentPortal(
                    new zo(t, s.viewContainerRef, a, s.componentFactoryResolver)
                  );
                o.componentInstance = l.instance;
              }
              return (
                o.updateSize(s.width, s.height).updatePosition(s.position), o
              );
            }
            _createInjector(t, i, r) {
              const s = t && t.viewContainerRef && t.viewContainerRef.injector,
                o = [
                  { provide: this._dialogContainerType, useValue: r },
                  { provide: this._dialogDataToken, useValue: t.data },
                  { provide: this._dialogRefConstructor, useValue: i },
                ];
              return (
                t.direction &&
                  (!s || !s.get(Uo, null, j.Optional)) &&
                  o.push({
                    provide: Uo,
                    useValue: { value: t.direction, change: P() },
                  }),
                we.create({ parent: s || this._injector, providers: o })
              );
            }
            _removeOpenDialog(t) {
              const i = this.openDialogs.indexOf(t);
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
              const t = this._overlayContainer.getContainerElement();
              if (t.parentElement) {
                const i = t.parentElement.children;
                for (let r = i.length - 1; r > -1; r--) {
                  let s = i[r];
                  s !== t &&
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
            _closeDialogs(t) {
              let i = t.length;
              for (; i--; ) t[i].close();
            }
          }
          return (
            (n.ɵfac = function (t) {
              Za();
            }),
            (n.ɵdir = k({ type: n })),
            n
          );
        })(),
        TE = (() => {
          class n extends $2 {
            constructor(t, i, r, s, o, a, l, c) {
              super(t, i, s, a, l, o, V2, N2, B2, c);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(
                C(Wo),
                C(we),
                C(Co, 8),
                C(j2, 8),
                C(AE),
                C(n, 12),
                C(Ef),
                C(xi, 8)
              );
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          );
        })(),
        G2 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
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
        W2 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({ providers: [TE, U2], imports: [[Ww, rc, Fe], Fe] })),
            n
          );
        })();
      class K2 {}
      class Ai {
        constructor(e) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            e
              ? (this.lazyInit =
                  "string" == typeof e
                    ? () => {
                        (this.headers = new Map()),
                          e.split("\n").forEach((t) => {
                            const i = t.indexOf(":");
                            if (i > 0) {
                              const r = t.slice(0, i),
                                s = r.toLowerCase(),
                                o = t.slice(i + 1).trim();
                              this.maybeSetNormalizedName(r, s),
                                this.headers.has(s)
                                  ? this.headers.get(s).push(o)
                                  : this.headers.set(s, [o]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(e).forEach((t) => {
                            let i = e[t];
                            const r = t.toLowerCase();
                            "string" == typeof i && (i = [i]),
                              i.length > 0 &&
                                (this.headers.set(r, i),
                                this.maybeSetNormalizedName(t, r));
                          });
                      })
              : (this.headers = new Map());
        }
        has(e) {
          return this.init(), this.headers.has(e.toLowerCase());
        }
        get(e) {
          this.init();
          const t = this.headers.get(e.toLowerCase());
          return t && t.length > 0 ? t[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(e) {
          return this.init(), this.headers.get(e.toLowerCase()) || null;
        }
        append(e, t) {
          return this.clone({ name: e, value: t, op: "a" });
        }
        set(e, t) {
          return this.clone({ name: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ name: e, value: t, op: "d" });
        }
        maybeSetNormalizedName(e, t) {
          this.normalizedNames.has(t) || this.normalizedNames.set(t, e);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Ai
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((e) => this.applyUpdate(e)),
              (this.lazyUpdate = null)));
        }
        copyFrom(e) {
          e.init(),
            Array.from(e.headers.keys()).forEach((t) => {
              this.headers.set(t, e.headers.get(t)),
                this.normalizedNames.set(t, e.normalizedNames.get(t));
            });
        }
        clone(e) {
          const t = new Ai();
          return (
            (t.lazyInit =
              this.lazyInit && this.lazyInit instanceof Ai
                ? this.lazyInit
                : this),
            (t.lazyUpdate = (this.lazyUpdate || []).concat([e])),
            t
          );
        }
        applyUpdate(e) {
          const t = e.name.toLowerCase();
          switch (e.op) {
            case "a":
            case "s":
              let i = e.value;
              if (("string" == typeof i && (i = [i]), 0 === i.length)) return;
              this.maybeSetNormalizedName(e.name, t);
              const r = ("a" === e.op ? this.headers.get(t) : void 0) || [];
              r.push(...i), this.headers.set(t, r);
              break;
            case "d":
              const s = e.value;
              if (s) {
                let o = this.headers.get(t);
                if (!o) return;
                (o = o.filter((a) => -1 === s.indexOf(a))),
                  0 === o.length
                    ? (this.headers.delete(t), this.normalizedNames.delete(t))
                    : this.headers.set(t, o);
              } else this.headers.delete(t), this.normalizedNames.delete(t);
          }
        }
        forEach(e) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((t) =>
              e(this.normalizedNames.get(t), this.headers.get(t))
            );
        }
      }
      class Q2 {
        encodeKey(e) {
          return RE(e);
        }
        encodeValue(e) {
          return RE(e);
        }
        decodeKey(e) {
          return decodeURIComponent(e);
        }
        decodeValue(e) {
          return decodeURIComponent(e);
        }
      }
      const Z2 = /%(\d[a-f0-9])/gi,
        X2 = {
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
      function RE(n) {
        return encodeURIComponent(n).replace(Z2, (e, t) => {
          var i;
          return null !== (i = X2[t]) && void 0 !== i ? i : e;
        });
      }
      function kE(n) {
        return `${n}`;
      }
      class Ti {
        constructor(e = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = e.encoder || new Q2()),
            e.fromString)
          ) {
            if (e.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function Y2(n, e) {
              const t = new Map();
              return (
                n.length > 0 &&
                  n
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((r) => {
                      const s = r.indexOf("="),
                        [o, a] =
                          -1 == s
                            ? [e.decodeKey(r), ""]
                            : [
                                e.decodeKey(r.slice(0, s)),
                                e.decodeValue(r.slice(s + 1)),
                              ],
                        l = t.get(o) || [];
                      l.push(a), t.set(o, l);
                    }),
                t
              );
            })(e.fromString, this.encoder);
          } else
            e.fromObject
              ? ((this.map = new Map()),
                Object.keys(e.fromObject).forEach((t) => {
                  const i = e.fromObject[t];
                  this.map.set(t, Array.isArray(i) ? i : [i]);
                }))
              : (this.map = null);
        }
        has(e) {
          return this.init(), this.map.has(e);
        }
        get(e) {
          this.init();
          const t = this.map.get(e);
          return t ? t[0] : null;
        }
        getAll(e) {
          return this.init(), this.map.get(e) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(e, t) {
          return this.clone({ param: e, value: t, op: "a" });
        }
        appendAll(e) {
          const t = [];
          return (
            Object.keys(e).forEach((i) => {
              const r = e[i];
              Array.isArray(r)
                ? r.forEach((s) => {
                    t.push({ param: i, value: s, op: "a" });
                  })
                : t.push({ param: i, value: r, op: "a" });
            }),
            this.clone(t)
          );
        }
        set(e, t) {
          return this.clone({ param: e, value: t, op: "s" });
        }
        delete(e, t) {
          return this.clone({ param: e, value: t, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((e) => {
                const t = this.encoder.encodeKey(e);
                return this.map
                  .get(e)
                  .map((i) => t + "=" + this.encoder.encodeValue(i))
                  .join("&");
              })
              .filter((e) => "" !== e)
              .join("&")
          );
        }
        clone(e) {
          const t = new Ti({ encoder: this.encoder });
          return (
            (t.cloneFrom = this.cloneFrom || this),
            (t.updates = (this.updates || []).concat(e)),
            t
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((e) => this.map.set(e, this.cloneFrom.map.get(e))),
              this.updates.forEach((e) => {
                switch (e.op) {
                  case "a":
                  case "s":
                    const t =
                      ("a" === e.op ? this.map.get(e.param) : void 0) || [];
                    t.push(kE(e.value)), this.map.set(e.param, t);
                    break;
                  case "d":
                    if (void 0 === e.value) {
                      this.map.delete(e.param);
                      break;
                    }
                    {
                      let i = this.map.get(e.param) || [];
                      const r = i.indexOf(kE(e.value));
                      -1 !== r && i.splice(r, 1),
                        i.length > 0
                          ? this.map.set(e.param, i)
                          : this.map.delete(e.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class J2 {
        constructor() {
          this.map = new Map();
        }
        set(e, t) {
          return this.map.set(e, t), this;
        }
        get(e) {
          return (
            this.map.has(e) || this.map.set(e, e.defaultValue()),
            this.map.get(e)
          );
        }
        delete(e) {
          return this.map.delete(e), this;
        }
        has(e) {
          return this.map.has(e);
        }
        keys() {
          return this.map.keys();
        }
      }
      function OE(n) {
        return "undefined" != typeof ArrayBuffer && n instanceof ArrayBuffer;
      }
      function FE(n) {
        return "undefined" != typeof Blob && n instanceof Blob;
      }
      function PE(n) {
        return "undefined" != typeof FormData && n instanceof FormData;
      }
      class Zo {
        constructor(e, t, i, r) {
          let s;
          if (
            ((this.url = t),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = e.toUpperCase()),
            (function eH(n) {
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
            this.context || (this.context = new J2()),
            this.params)
          ) {
            const o = this.params.toString();
            if (0 === o.length) this.urlWithParams = t;
            else {
              const a = t.indexOf("?");
              this.urlWithParams =
                t + (-1 === a ? "?" : a < t.length - 1 ? "&" : "") + o;
            }
          } else (this.params = new Ti()), (this.urlWithParams = t);
        }
        serializeBody() {
          return null === this.body
            ? null
            : OE(this.body) ||
              FE(this.body) ||
              PE(this.body) ||
              (function tH(n) {
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
          return null === this.body || PE(this.body)
            ? null
            : FE(this.body)
            ? this.body.type || null
            : OE(this.body)
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
        clone(e = {}) {
          var t;
          const i = e.method || this.method,
            r = e.url || this.url,
            s = e.responseType || this.responseType,
            o = void 0 !== e.body ? e.body : this.body,
            a =
              void 0 !== e.withCredentials
                ? e.withCredentials
                : this.withCredentials,
            l =
              void 0 !== e.reportProgress
                ? e.reportProgress
                : this.reportProgress;
          let c = e.headers || this.headers,
            u = e.params || this.params;
          const d = null !== (t = e.context) && void 0 !== t ? t : this.context;
          return (
            void 0 !== e.setHeaders &&
              (c = Object.keys(e.setHeaders).reduce(
                (h, f) => h.set(f, e.setHeaders[f]),
                c
              )),
            e.setParams &&
              (u = Object.keys(e.setParams).reduce(
                (h, f) => h.set(f, e.setParams[f]),
                u
              )),
            new Zo(i, r, o, {
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
      var nt = (() => (
        ((nt = nt || {})[(nt.Sent = 0)] = "Sent"),
        (nt[(nt.UploadProgress = 1)] = "UploadProgress"),
        (nt[(nt.ResponseHeader = 2)] = "ResponseHeader"),
        (nt[(nt.DownloadProgress = 3)] = "DownloadProgress"),
        (nt[(nt.Response = 4)] = "Response"),
        (nt[(nt.User = 5)] = "User"),
        nt
      ))();
      class lp extends class nH {
        constructor(e, t = 200, i = "OK") {
          (this.headers = e.headers || new Ai()),
            (this.status = void 0 !== e.status ? e.status : t),
            (this.statusText = e.statusText || i),
            (this.url = e.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      } {
        constructor(e = {}) {
          super(e),
            (this.type = nt.Response),
            (this.body = void 0 !== e.body ? e.body : null);
        }
        clone(e = {}) {
          return new lp({
            body: void 0 !== e.body ? e.body : this.body,
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
          });
        }
      }
      function cp(n, e) {
        return {
          body: e,
          headers: n.headers,
          context: n.context,
          observe: n.observe,
          params: n.params,
          reportProgress: n.reportProgress,
          responseType: n.responseType,
          withCredentials: n.withCredentials,
        };
      }
      let LE = (() => {
        class n {
          constructor(t) {
            this.handler = t;
          }
          request(t, i, r = {}) {
            let s;
            if (t instanceof Zo) s = t;
            else {
              let l, c;
              (l = r.headers instanceof Ai ? r.headers : new Ai(r.headers)),
                r.params &&
                  (c =
                    r.params instanceof Ti
                      ? r.params
                      : new Ti({ fromObject: r.params })),
                (s = new Zo(t, i, void 0 !== r.body ? r.body : null, {
                  headers: l,
                  context: r.context,
                  params: c,
                  reportProgress: r.reportProgress,
                  responseType: r.responseType || "json",
                  withCredentials: r.withCredentials,
                }));
            }
            const o = P(s).pipe(cs((l) => this.handler.handle(l)));
            if (t instanceof Zo || "events" === r.observe) return o;
            const a = o.pipe(Oe((l) => l instanceof lp));
            switch (r.observe || "body") {
              case "body":
                switch (s.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      q((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      q((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      q((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(q((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${r.observe}}`
                );
            }
          }
          delete(t, i = {}) {
            return this.request("DELETE", t, i);
          }
          get(t, i = {}) {
            return this.request("GET", t, i);
          }
          head(t, i = {}) {
            return this.request("HEAD", t, i);
          }
          jsonp(t, i) {
            return this.request("JSONP", t, {
              params: new Ti().append(i, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(t, i = {}) {
            return this.request("OPTIONS", t, i);
          }
          patch(t, i, r = {}) {
            return this.request("PATCH", t, cp(r, i));
          }
          post(t, i, r = {}) {
            return this.request("POST", t, cp(r, i));
          }
          put(t, i, r = {}) {
            return this.request("PUT", t, cp(r, i));
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(K2));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        );
      })();
      const rH = ["*"];
      let xc;
      function Xo(n) {
        var e;
        return (
          (null ===
            (e = (function sH() {
              if (
                void 0 === xc &&
                ((xc = null), "undefined" != typeof window)
              ) {
                const n = window;
                void 0 !== n.trustedTypes &&
                  (xc = n.trustedTypes.createPolicy("angular#components", {
                    createHTML: (e) => e,
                  }));
              }
              return xc;
            })()) || void 0 === e
            ? void 0
            : e.createHTML(n)) || n
        );
      }
      function VE(n) {
        return Error(`Unable to find icon with the name "${n}"`);
      }
      function BE(n) {
        return Error(
          `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${n}".`
        );
      }
      function jE(n) {
        return Error(
          `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${n}".`
        );
      }
      class dr {
        constructor(e, t, i) {
          (this.url = e), (this.svgText = t), (this.options = i);
        }
      }
      let Ac = (() => {
        class n {
          constructor(t, i, r, s) {
            (this._httpClient = t),
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
          addSvgIcon(t, i, r) {
            return this.addSvgIconInNamespace("", t, i, r);
          }
          addSvgIconLiteral(t, i, r) {
            return this.addSvgIconLiteralInNamespace("", t, i, r);
          }
          addSvgIconInNamespace(t, i, r, s) {
            return this._addSvgIconConfig(t, i, new dr(r, null, s));
          }
          addSvgIconResolver(t) {
            return this._resolvers.push(t), this;
          }
          addSvgIconLiteralInNamespace(t, i, r, s) {
            const o = this._sanitizer.sanitize(ae.HTML, r);
            if (!o) throw jE(r);
            const a = Xo(o);
            return this._addSvgIconConfig(t, i, new dr("", a, s));
          }
          addSvgIconSet(t, i) {
            return this.addSvgIconSetInNamespace("", t, i);
          }
          addSvgIconSetLiteral(t, i) {
            return this.addSvgIconSetLiteralInNamespace("", t, i);
          }
          addSvgIconSetInNamespace(t, i, r) {
            return this._addSvgIconSetConfig(t, new dr(i, null, r));
          }
          addSvgIconSetLiteralInNamespace(t, i, r) {
            const s = this._sanitizer.sanitize(ae.HTML, i);
            if (!s) throw jE(i);
            const o = Xo(s);
            return this._addSvgIconSetConfig(t, new dr("", o, r));
          }
          registerFontClassAlias(t, i = t) {
            return this._fontCssClassesByAlias.set(t, i), this;
          }
          classNameForFontAlias(t) {
            return this._fontCssClassesByAlias.get(t) || t;
          }
          setDefaultFontSetClass(t) {
            return (this._defaultFontSetClass = t), this;
          }
          getDefaultFontSetClass() {
            return this._defaultFontSetClass;
          }
          getSvgIconFromUrl(t) {
            const i = this._sanitizer.sanitize(ae.RESOURCE_URL, t);
            if (!i) throw BE(t);
            const r = this._cachedIconsByUrl.get(i);
            return r
              ? P(Tc(r))
              : this._loadSvgIconFromConfig(new dr(t, null)).pipe(
                  et((s) => this._cachedIconsByUrl.set(i, s)),
                  q((s) => Tc(s))
                );
          }
          getNamedSvgIcon(t, i = "") {
            const r = HE(i, t);
            let s = this._svgIconConfigs.get(r);
            if (s) return this._getSvgFromConfig(s);
            if (((s = this._getIconConfigFromResolvers(i, t)), s))
              return this._svgIconConfigs.set(r, s), this._getSvgFromConfig(s);
            const o = this._iconSetConfigs.get(i);
            return o
              ? this._getSvgFromIconSetConfigs(t, o)
              : (function q2(n, e) {
                  const t = se(n) ? n : () => n,
                    i = (r) => r.error(t());
                  return new he(e ? (r) => e.schedule(i, 0, r) : i);
                })(VE(r));
          }
          ngOnDestroy() {
            (this._resolvers = []),
              this._svgIconConfigs.clear(),
              this._iconSetConfigs.clear(),
              this._cachedIconsByUrl.clear();
          }
          _getSvgFromConfig(t) {
            return t.svgText
              ? P(Tc(this._svgElementFromConfig(t)))
              : this._loadSvgIconFromConfig(t).pipe(q((i) => Tc(i)));
          }
          _getSvgFromIconSetConfigs(t, i) {
            const r = this._extractIconWithNameFromAnySet(t, i);
            return r
              ? P(r)
              : (function IE(...n) {
                  const e = rm(n),
                    { args: t, keys: i } = CC(n),
                    r = new he((s) => {
                      const { length: o } = t;
                      if (!o) return void s.complete();
                      const a = new Array(o);
                      let l = o,
                        c = o;
                      for (let u = 0; u < o; u++) {
                        let d = !1;
                        xt(t[u]).subscribe(
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
                  return e ? r.pipe($h(e)) : r;
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
                  q(() => {
                    const o = this._extractIconWithNameFromAnySet(t, i);
                    if (!o) throw VE(t);
                    return o;
                  })
                );
          }
          _extractIconWithNameFromAnySet(t, i) {
            for (let r = i.length - 1; r >= 0; r--) {
              const s = i[r];
              if (s.svgText && s.svgText.toString().indexOf(t) > -1) {
                const o = this._svgElementFromConfig(s),
                  a = this._extractSvgIconFromSet(o, t, s.options);
                if (a) return a;
              }
            }
            return null;
          }
          _loadSvgIconFromConfig(t) {
            return this._fetchIcon(t).pipe(
              et((i) => (t.svgText = i)),
              q(() => this._svgElementFromConfig(t))
            );
          }
          _loadSvgIconSetFromConfig(t) {
            return t.svgText
              ? P(null)
              : this._fetchIcon(t).pipe(et((i) => (t.svgText = i)));
          }
          _extractSvgIconFromSet(t, i, r) {
            const s = t.querySelector(`[id="${i}"]`);
            if (!s) return null;
            const o = s.cloneNode(!0);
            if ((o.removeAttribute("id"), "svg" === o.nodeName.toLowerCase()))
              return this._setSvgAttributes(o, r);
            if ("symbol" === o.nodeName.toLowerCase())
              return this._setSvgAttributes(this._toSvgElement(o), r);
            const a = this._svgElementFromString(Xo("<svg></svg>"));
            return a.appendChild(o), this._setSvgAttributes(a, r);
          }
          _svgElementFromString(t) {
            const i = this._document.createElement("DIV");
            i.innerHTML = t;
            const r = i.querySelector("svg");
            if (!r) throw Error("<svg> tag not found");
            return r;
          }
          _toSvgElement(t) {
            const i = this._svgElementFromString(Xo("<svg></svg>")),
              r = t.attributes;
            for (let s = 0; s < r.length; s++) {
              const { name: o, value: a } = r[s];
              "id" !== o && i.setAttribute(o, a);
            }
            for (let s = 0; s < t.childNodes.length; s++)
              t.childNodes[s].nodeType === this._document.ELEMENT_NODE &&
                i.appendChild(t.childNodes[s].cloneNode(!0));
            return i;
          }
          _setSvgAttributes(t, i) {
            return (
              t.setAttribute("fit", ""),
              t.setAttribute("height", "100%"),
              t.setAttribute("width", "100%"),
              t.setAttribute("preserveAspectRatio", "xMidYMid meet"),
              t.setAttribute("focusable", "false"),
              i && i.viewBox && t.setAttribute("viewBox", i.viewBox),
              t
            );
          }
          _fetchIcon(t) {
            var i;
            const { url: r, options: s } = t,
              o =
                null !== (i = null == s ? void 0 : s.withCredentials) &&
                void 0 !== i &&
                i;
            if (!this._httpClient)
              throw (function oH() {
                return Error(
                  "Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports."
                );
              })();
            if (null == r) throw Error(`Cannot fetch icon from URL "${r}".`);
            const a = this._sanitizer.sanitize(ae.RESOURCE_URL, r);
            if (!a) throw BE(r);
            const l = this._inProgressUrlFetches.get(a);
            if (l) return l;
            const c = this._httpClient
              .get(a, { responseType: "text", withCredentials: o })
              .pipe(
                q((u) => Xo(u)),
                TC(() => this._inProgressUrlFetches.delete(a)),
                lm()
              );
            return this._inProgressUrlFetches.set(a, c), c;
          }
          _addSvgIconConfig(t, i, r) {
            return this._svgIconConfigs.set(HE(t, i), r), this;
          }
          _addSvgIconSetConfig(t, i) {
            const r = this._iconSetConfigs.get(t);
            return r ? r.push(i) : this._iconSetConfigs.set(t, [i]), this;
          }
          _svgElementFromConfig(t) {
            if (!t.svgElement) {
              const i = this._svgElementFromString(t.svgText);
              this._setSvgAttributes(i, t.options), (t.svgElement = i);
            }
            return t.svgElement;
          }
          _getIconConfigFromResolvers(t, i) {
            for (let r = 0; r < this._resolvers.length; r++) {
              const s = this._resolvers[r](i, t);
              if (s)
                return lH(s) ? new dr(s.url, null, s.options) : new dr(s, null);
            }
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(LE, 8), C(Uh), C(Y, 8), C(Kn));
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
          n
        );
      })();
      function Tc(n) {
        return n.cloneNode(!0);
      }
      function HE(n, e) {
        return n + ":" + e;
      }
      function lH(n) {
        return !(!n.url || !n.options);
      }
      const cH = fE(
          class {
            constructor(n) {
              this._elementRef = n;
            }
          }
        ),
        uH = new A("mat-icon-location", {
          providedIn: "root",
          factory: function dH() {
            const n = Tu(Y),
              e = n ? n.location : null;
            return { getPathname: () => (e ? e.pathname + e.search : "") };
          },
        }),
        UE = [
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
        hH = UE.map((n) => `[${n}]`).join(", "),
        fH = /^url\(['"]?#(.*?)['"]?\)$/;
      let $E = (() => {
          class n extends cH {
            constructor(t, i, r, s, o) {
              super(t),
                (this._iconRegistry = i),
                (this._location = s),
                (this._errorHandler = o),
                (this._inline = !1),
                (this._currentIconFetch = Ve.EMPTY),
                r || t.nativeElement.setAttribute("aria-hidden", "true");
            }
            get inline() {
              return this._inline;
            }
            set inline(t) {
              this._inline = ct(t);
            }
            get svgIcon() {
              return this._svgIcon;
            }
            set svgIcon(t) {
              t !== this._svgIcon &&
                (t
                  ? this._updateSvgIcon(t)
                  : this._svgIcon && this._clearSvgElement(),
                (this._svgIcon = t));
            }
            get fontSet() {
              return this._fontSet;
            }
            set fontSet(t) {
              const i = this._cleanupFontValue(t);
              i !== this._fontSet &&
                ((this._fontSet = i), this._updateFontIconClasses());
            }
            get fontIcon() {
              return this._fontIcon;
            }
            set fontIcon(t) {
              const i = this._cleanupFontValue(t);
              i !== this._fontIcon &&
                ((this._fontIcon = i), this._updateFontIconClasses());
            }
            _splitIconName(t) {
              if (!t) return ["", ""];
              const i = t.split(":");
              switch (i.length) {
                case 1:
                  return ["", i[0]];
                case 2:
                  return i;
                default:
                  throw Error(`Invalid icon name: "${t}"`);
              }
            }
            ngOnInit() {
              this._updateFontIconClasses();
            }
            ngAfterViewChecked() {
              const t = this._elementsWithExternalReferences;
              if (t && t.size) {
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
            _setSvgElement(t) {
              this._clearSvgElement();
              const i = this._location.getPathname();
              (this._previousPath = i),
                this._cacheChildrenWithExternalReferences(t),
                this._prependPathToReferences(i),
                this._elementRef.nativeElement.appendChild(t);
            }
            _clearSvgElement() {
              const t = this._elementRef.nativeElement;
              let i = t.childNodes.length;
              for (
                this._elementsWithExternalReferences &&
                this._elementsWithExternalReferences.clear();
                i--;

              ) {
                const r = t.childNodes[i];
                (1 !== r.nodeType || "svg" === r.nodeName.toLowerCase()) &&
                  r.remove();
              }
            }
            _updateFontIconClasses() {
              if (!this._usingFontIcon()) return;
              const t = this._elementRef.nativeElement,
                i = this.fontSet
                  ? this._iconRegistry.classNameForFontAlias(this.fontSet)
                  : this._iconRegistry.getDefaultFontSetClass();
              i != this._previousFontSetClass &&
                (this._previousFontSetClass &&
                  t.classList.remove(this._previousFontSetClass),
                i && t.classList.add(i),
                (this._previousFontSetClass = i)),
                this.fontIcon != this._previousFontIconClass &&
                  (this._previousFontIconClass &&
                    t.classList.remove(this._previousFontIconClass),
                  this.fontIcon && t.classList.add(this.fontIcon),
                  (this._previousFontIconClass = this.fontIcon));
            }
            _cleanupFontValue(t) {
              return "string" == typeof t ? t.trim().split(" ")[0] : t;
            }
            _prependPathToReferences(t) {
              const i = this._elementsWithExternalReferences;
              i &&
                i.forEach((r, s) => {
                  r.forEach((o) => {
                    s.setAttribute(o.name, `url('${t}#${o.value}')`);
                  });
                });
            }
            _cacheChildrenWithExternalReferences(t) {
              const i = t.querySelectorAll(hH),
                r = (this._elementsWithExternalReferences =
                  this._elementsWithExternalReferences || new Map());
              for (let s = 0; s < i.length; s++)
                UE.forEach((o) => {
                  const a = i[s],
                    l = a.getAttribute(o),
                    c = l ? l.match(fH) : null;
                  if (c) {
                    let u = r.get(a);
                    u || ((u = []), r.set(a, u)),
                      u.push({ name: o, value: c[1] });
                  }
                });
            }
            _updateSvgIcon(t) {
              if (
                ((this._svgNamespace = null),
                (this._svgName = null),
                this._currentIconFetch.unsubscribe(),
                t)
              ) {
                const [i, r] = this._splitIconName(t);
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
            (n.ɵfac = function (t) {
              return new (t || n)(
                y(ve),
                y(Ac),
                mi("aria-hidden"),
                y(uH),
                y(Kn)
              );
            }),
            (n.ɵcmp = De({
              type: n,
              selectors: [["mat-icon"]],
              hostAttrs: ["role", "img", 1, "mat-icon", "notranslate"],
              hostVars: 7,
              hostBindings: function (t, i) {
                2 & t &&
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
              features: [Q],
              ngContentSelectors: rH,
              decls: 1,
              vars: 0,
              template: function (t, i) {
                1 & t && (Zn(), Et(0));
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
        pH = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({ imports: [[Fe], Fe] })),
            n
          );
        })(),
        mH = (() => {
          class n {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = De({
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
              template: function (t, i) {
                1 & t &&
                  (m(0, "mat-dialog-content"),
                  m(1, "div", 0),
                  m(2, "div"),
                  m(3, "button", 1),
                  m(4, "a", 2),
                  m(5, "mat-icon"),
                  E(6, " phone"),
                  g(),
                  g(),
                  g(),
                  g(),
                  m(7, "div"),
                  m(8, "h3"),
                  E(9, "+91-7249328035"),
                  g(),
                  g(),
                  g(),
                  m(10, "div", 0),
                  m(11, "div"),
                  m(12, "button", 1),
                  m(13, "mat-icon"),
                  m(14, "a", 3),
                  L(15, "i", 4),
                  g(),
                  g(),
                  g(),
                  g(),
                  m(16, "div"),
                  m(17, "h3"),
                  E(18, "+91-7249328035"),
                  g(),
                  g(),
                  g(),
                  g());
              },
              directives: [G2, $E],
              styles: [""],
            })),
            n
          );
        })(),
        gH = (() => {
          class n {
            constructor(t) {
              this.di = t;
            }
            ngOnInit() {}
            openDialog() {
              this.di.open(mH);
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(TE));
            }),
            (n.ɵcmp = De({
              type: n,
              selectors: [["app-sidebar"]],
              decls: 37,
              vars: 0,
              consts: [
                [2, "color", "white"],
                [1, "main", 2, "display", "flex"],
                [1, "sub1"],
                [1, "sub2"],
                ["routerLink", "home"],
                [
                  "href",
                  "https://www.linkedin.com/in/afifahmad-nadaf-387095243",
                  "target",
                  "_blank",
                ],
                ["routerLink", "table", 3, "click"],
                ["routerLink", "project"],
                ["routerLink", "about"],
              ],
              template: function (t, i) {
                1 & t &&
                  (m(0, "div", 0),
                  m(1, "div"),
                  m(2, "div", 1),
                  m(3, "div", 2),
                  m(4, "mat-icon"),
                  E(5, "home"),
                  g(),
                  g(),
                  m(6, "div", 3),
                  m(7, "a", 4),
                  E(8, "\xa0 Home"),
                  g(),
                  g(),
                  g(),
                  m(9, "div", 1),
                  m(10, "div", 2),
                  m(11, "mat-icon"),
                  E(12, "linkedin"),
                  g(),
                  g(),
                  m(13, "div", 3),
                  m(14, "a", 5),
                  E(15, "\xa0 LinkedIn"),
                  g(),
                  g(),
                  g(),
                  m(16, "div", 1),
                  m(17, "div", 2),
                  m(18, "mat-icon"),
                  E(19, "phone"),
                  g(),
                  g(),
                  m(20, "div", 3),
                  m(21, "a", 6),
                  ye("click", function () {
                    return i.openDialog();
                  }),
                  E(22, "\xa0 Contact"),
                  g(),
                  g(),
                  g(),
                  m(23, "div", 1),
                  m(24, "div", 2),
                  m(25, "mat-icon"),
                  E(26, "home"),
                  g(),
                  g(),
                  m(27, "div", 3),
                  m(28, "a", 7),
                  E(29, " \xa0 Project"),
                  g(),
                  g(),
                  g(),
                  m(30, "div", 1),
                  m(31, "div", 2),
                  m(32, "mat-icon"),
                  E(33, "face"),
                  g(),
                  g(),
                  m(34, "div", 3),
                  m(35, "a", 8),
                  E(36, " \xa0 About Me"),
                  g(),
                  g(),
                  g(),
                  g(),
                  g());
              },
              directives: [$E, Yl],
              styles: [
                ".mat-list-item[_ngcontent-%COMP%]{color:#000;width:300px}.icon[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}img[_ngcontent-%COMP%]{max-width:100px;animation-name:img;transition:.5s}img[_ngcontent-%COMP%]:hover{max-width:121.8px}.right[_ngcontent-%COMP%]{animation-name:pop;animation-duration:3s;align-self:flex-start}.left[_ngcontent-%COMP%]{position:relative;top:-20px;align-self:flex-end}@keyframes pop{0%{opacity:0}to{opacity:90}}",
                "ul[_ngcontent-%COMP%] {\n    list-style: none;\n  }\n  li[_ngcontent-%COMP%] {\n    padding: 20px;\n    justify-content: center;\n  }\n  .main[_ngcontent-%COMP%]{\n    align-items: center;\n    justify-content: start;\n    padding: 10px;\n  }\n  a[_ngcontent-%COMP%] {\n    text-decoration: none;\n  }\n  .main[_ngcontent-%COMP%]:hover {\n    background-color: white;\n    border-radius: 4px;\n    color: black;\n  }",
              ],
            })),
            n
          );
        })(),
        GE = (() => {
          class n {
            constructor() {
              this._listeners = [];
            }
            notify(t, i) {
              for (let r of this._listeners) r(t, i);
            }
            listen(t) {
              return (
                this._listeners.push(t),
                () => {
                  this._listeners = this._listeners.filter((i) => t !== i);
                }
              );
            }
            ngOnDestroy() {
              this._listeners = [];
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: "root" })),
            n
          );
        })(),
        _H = 0;
      const up = new A("CdkAccordion");
      let yH = (() => {
          class n {
            constructor() {
              (this._stateChanges = new X()),
                (this._openCloseAllActions = new X()),
                (this.id = "cdk-accordion-" + _H++),
                (this._multi = !1);
            }
            get multi() {
              return this._multi;
            }
            set multi(t) {
              this._multi = ct(t);
            }
            openAll() {
              this._multi && this._openCloseAllActions.next(!0);
            }
            closeAll() {
              this._openCloseAllActions.next(!1);
            }
            ngOnChanges(t) {
              this._stateChanges.next(t);
            }
            ngOnDestroy() {
              this._stateChanges.complete(),
                this._openCloseAllActions.complete();
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [["cdk-accordion"], ["", "cdkAccordion", ""]],
              inputs: { multi: "multi" },
              exportAs: ["cdkAccordion"],
              features: [de([{ provide: up, useExisting: n }]), st],
            })),
            n
          );
        })(),
        vH = 0,
        bH = (() => {
          class n {
            constructor(t, i, r) {
              (this.accordion = t),
                (this._changeDetectorRef = i),
                (this._expansionDispatcher = r),
                (this._openCloseAllSubscription = Ve.EMPTY),
                (this.closed = new ee()),
                (this.opened = new ee()),
                (this.destroyed = new ee()),
                (this.expandedChange = new ee()),
                (this.id = "cdk-accordion-child-" + vH++),
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
            set expanded(t) {
              (t = ct(t)),
                this._expanded !== t &&
                  ((this._expanded = t),
                  this.expandedChange.emit(t),
                  t
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
            set disabled(t) {
              this._disabled = ct(t);
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
              return this.accordion._openCloseAllActions.subscribe((t) => {
                this.disabled || (this.expanded = t);
              });
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(up, 12), y(yn), y(GE));
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
              features: [de([{ provide: up, useValue: void 0 }])],
            })),
            n
          );
        })(),
        CH = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({})),
            n
          );
        })();
      const wH = ["body"];
      function DH(n, e) {}
      const EH = [[["mat-expansion-panel-header"]], "*", [["mat-action-row"]]],
        MH = ["mat-expansion-panel-header", "*", "mat-action-row"];
      function SH(n, e) {
        1 & n && L(0, "span", 2),
          2 & n && mt("@indicatorRotate", yi()._getExpandedState());
      }
      const xH = [[["mat-panel-title"]], [["mat-panel-description"]], "*"],
        AH = ["mat-panel-title", "mat-panel-description", "*"],
        dp = new A("MAT_ACCORDION"),
        WE = "225ms cubic-bezier(0.4,0.0,0.2,1)",
        qE = {
          indicatorRotate: qo("indicatorRotate", [
            jn("collapsed, void", St({ transform: "rotate(0deg)" })),
            jn("expanded", St({ transform: "rotate(180deg)" })),
            Ei("expanded <=> collapsed, void => collapsed", Di(WE)),
          ]),
          bodyExpansion: qo("bodyExpansion", [
            jn("collapsed, void", St({ height: "0px", visibility: "hidden" })),
            jn("expanded", St({ height: "*", visibility: "visible" })),
            Ei("expanded <=> collapsed, void => collapsed", Di(WE)),
          ]),
        };
      let TH = (() => {
          class n {
            constructor(t) {
              this._template = t;
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(Jt));
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [["ng-template", "matExpansionPanelContent", ""]],
            })),
            n
          );
        })(),
        IH = 0;
      const KE = new A("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS");
      let QE = (() => {
        class n extends bH {
          constructor(t, i, r, s, o, a, l) {
            super(t, i, r),
              (this._viewContainerRef = s),
              (this._animationMode = a),
              (this._hideToggle = !1),
              (this.afterExpand = new ee()),
              (this.afterCollapse = new ee()),
              (this._inputChanges = new X()),
              (this._headerId = "mat-expansion-panel-header-" + IH++),
              (this._bodyAnimationDone = new X()),
              (this.accordion = t),
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
          set hideToggle(t) {
            this._hideToggle = ct(t);
          }
          get togglePosition() {
            return (
              this._togglePosition ||
              (this.accordion && this.accordion.togglePosition)
            );
          }
          set togglePosition(t) {
            this._togglePosition = t;
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
                  this._portal = new nc(
                    this._lazyContent._template,
                    this._viewContainerRef
                  );
                });
          }
          ngOnChanges(t) {
            this._inputChanges.next(t);
          }
          ngOnDestroy() {
            super.ngOnDestroy(),
              this._bodyAnimationDone.complete(),
              this._inputChanges.complete();
          }
          _containsFocus() {
            if (this._body) {
              const t = this._document.activeElement,
                i = this._body.nativeElement;
              return t === i || i.contains(t);
            }
            return !1;
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(
              y(dp, 12),
              y(yn),
              y(GE),
              y(Lt),
              y(Y),
              y(xi, 8),
              y(KE, 8)
            );
          }),
          (n.ɵcmp = De({
            type: n,
            selectors: [["mat-expansion-panel"]],
            contentQueries: function (t, i, r) {
              if ((1 & t && Nn(r, TH, 5), 2 & t)) {
                let s;
                _t((s = yt())) && (i._lazyContent = s.first);
              }
            },
            viewQuery: function (t, i) {
              if ((1 & t && is(wH, 5), 2 & t)) {
                let r;
                _t((r = yt())) && (i._body = r.first);
              }
            },
            hostAttrs: [1, "mat-expansion-panel"],
            hostVars: 6,
            hostBindings: function (t, i) {
              2 & t &&
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
            features: [de([{ provide: dp, useValue: void 0 }]), Q, st],
            ngContentSelectors: MH,
            decls: 7,
            vars: 4,
            consts: [
              ["role", "region", 1, "mat-expansion-panel-content", 3, "id"],
              ["body", ""],
              [1, "mat-expansion-panel-body"],
              [3, "cdkPortalOutlet"],
            ],
            template: function (t, i) {
              1 & t &&
                (Zn(EH),
                Et(0),
                m(1, "div", 0, 1),
                ye("@bodyExpansion.done", function (s) {
                  return i._bodyAnimationDone.next(s);
                }),
                m(3, "div", 2),
                Et(4, 1),
                On(5, DH, 0, 0, "ng-template", 3),
                g(),
                Et(6, 2),
                g()),
                2 & t &&
                  (Zt(1),
                  mt("@bodyExpansion", i._getExpandedState())("id", i.id),
                  qe("aria-labelledby", i._headerId),
                  Zt(4),
                  mt("cdkPortalOutlet", i._portal));
            },
            directives: [Go],
            styles: [
              '.mat-expansion-panel{box-sizing:content-box;display:block;margin:0;border-radius:4px;overflow:hidden;transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);position:relative}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:4px;border-top-left-radius:4px}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.cdk-high-contrast-active .mat-expansion-panel{outline:solid 1px}.mat-expansion-panel.ng-animate-disabled,.ng-animate-disabled .mat-expansion-panel,.mat-expansion-panel._mat-animation-noopable{transition:none}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible}.mat-expansion-panel-content[style*="visibility: hidden"] *{visibility:hidden !important}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.mat-action-row .mat-button-base,.mat-action-row .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row .mat-button-base,[dir=rtl] .mat-action-row .mat-mdc-button-base{margin-left:0;margin-right:8px}\n',
            ],
            encapsulation: 2,
            data: { animation: [qE.bodyExpansion] },
            changeDetection: 0,
          })),
          n
        );
      })();
      class RH {}
      const kH = Kj(RH);
      let YE = (() => {
          class n extends kH {
            constructor(t, i, r, s, o, a, l) {
              super(),
                (this.panel = t),
                (this._element = i),
                (this._focusMonitor = r),
                (this._changeDetectorRef = s),
                (this._animationMode = a),
                (this._parentChangeSubscription = Ve.EMPTY);
              const c = t.accordion
                ? t.accordion._stateChanges.pipe(
                    Oe((u) => !(!u.hideToggle && !u.togglePosition))
                  )
                : En;
              (this.tabIndex = parseInt(l || "") || 0),
                (this._parentChangeSubscription = la(
                  t.opened,
                  t.closed,
                  c,
                  t._inputChanges.pipe(
                    Oe(
                      (u) => !!(u.hideToggle || u.disabled || u.togglePosition)
                    )
                  )
                ).subscribe(() => this._changeDetectorRef.markForCheck())),
                t.closed
                  .pipe(Oe(() => t._containsFocus()))
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
              const t = this._isExpanded();
              return t && this.expandedHeight
                ? this.expandedHeight
                : !t && this.collapsedHeight
                ? this.collapsedHeight
                : null;
            }
            _keydown(t) {
              switch (t.keyCode) {
                case 32:
                case 13:
                  ys(t) || (t.preventDefault(), this._toggle());
                  break;
                default:
                  return void (
                    this.panel.accordion &&
                    this.panel.accordion._handleHeaderKeydown(t)
                  );
              }
            }
            focus(t, i) {
              t
                ? this._focusMonitor.focusVia(this._element, t, i)
                : this._element.nativeElement.focus(i);
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._element).subscribe((t) => {
                t &&
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
            (n.ɵfac = function (t) {
              return new (t || n)(
                y(QE, 1),
                y(ve),
                y(oc),
                y(yn),
                y(KE, 8),
                y(xi, 8),
                mi("tabindex")
              );
            }),
            (n.ɵcmp = De({
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
              hostBindings: function (t, i) {
                1 & t &&
                  ye("click", function () {
                    return i._toggle();
                  })("keydown", function (s) {
                    return i._keydown(s);
                  }),
                  2 & t &&
                    (qe("id", i.panel._headerId)("tabindex", i.tabIndex)(
                      "aria-controls",
                      i._getPanelId()
                    )("aria-expanded", i._isExpanded())(
                      "aria-disabled",
                      i.panel.disabled
                    ),
                    jd("height", i._getHeaderHeight()),
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
              features: [Q],
              ngContentSelectors: AH,
              decls: 5,
              vars: 1,
              consts: [
                [1, "mat-content"],
                ["class", "mat-expansion-indicator", 4, "ngIf"],
                [1, "mat-expansion-indicator"],
              ],
              template: function (t, i) {
                1 & t &&
                  (Zn(xH),
                  m(0, "span", 0),
                  Et(1),
                  Et(2, 1),
                  Et(3, 2),
                  g(),
                  On(4, SH, 1, 1, "span", 1)),
                  2 & t && (Zt(4), mt("ngIf", i._showToggle()));
              },
              directives: [xl],
              styles: [
                '.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;margin-right:16px;align-items:center}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header-description{flex-grow:2}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle}.cdk-high-contrast-active .mat-expansion-panel .mat-expansion-panel-header.cdk-keyboard-focused:not([aria-disabled=true])::before,.cdk-high-contrast-active .mat-expansion-panel .mat-expansion-panel-header.cdk-program-focused:not([aria-disabled=true])::before,.cdk-high-contrast-active .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:hover:not([aria-disabled=true])::before{top:0;left:0;right:0;bottom:0;position:absolute;box-sizing:border-box;pointer-events:none;border:3px solid;border-radius:4px;content:""}.cdk-high-contrast-active .mat-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}\n',
              ],
              encapsulation: 2,
              data: { animation: [qE.indicatorRotate] },
              changeDetection: 0,
            })),
            n
          );
        })(),
        OH = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [["mat-panel-description"]],
              hostAttrs: [1, "mat-expansion-panel-header-description"],
            })),
            n
          );
        })(),
        FH = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵdir = k({
              type: n,
              selectors: [["mat-panel-title"]],
              hostAttrs: [1, "mat-expansion-panel-header-title"],
            })),
            n
          );
        })(),
        PH = (() => {
          class n extends yH {
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
            set hideToggle(t) {
              this._hideToggle = ct(t);
            }
            ngAfterContentInit() {
              this._headers.changes.pipe(Xi(this._headers)).subscribe((t) => {
                this._ownHeaders.reset(
                  t.filter((i) => i.panel.accordion === this)
                ),
                  this._ownHeaders.notifyOnChanges();
              }),
                (this._keyManager = new sD(this._ownHeaders)
                  .withWrap()
                  .withHomeAndEnd());
            }
            _handleHeaderKeydown(t) {
              this._keyManager.onKeydown(t);
            }
            _handleHeaderFocus(t) {
              this._keyManager.updateActiveItem(t);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this._ownHeaders.destroy();
            }
          }
          return (
            (n.ɵfac = (function () {
              let e;
              return function (i) {
                return (e || (e = ot(n)))(i || n);
              };
            })()),
            (n.ɵdir = k({
              type: n,
              selectors: [["mat-accordion"]],
              contentQueries: function (t, i, r) {
                if ((1 & t && Nn(r, YE, 5), 2 & t)) {
                  let s;
                  _t((s = yt())) && (i._headers = s);
                }
              },
              hostAttrs: [1, "mat-accordion"],
              hostVars: 2,
              hostBindings: function (t, i) {
                2 & t && Je("mat-accordion-multi", i.multi);
              },
              inputs: {
                multi: "multi",
                hideToggle: "hideToggle",
                displayMode: "displayMode",
                togglePosition: "togglePosition",
              },
              exportAs: ["matAccordion"],
              features: [de([{ provide: dp, useExisting: n }]), Q],
            })),
            n
          );
        })(),
        NH = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({ imports: [[Eo, Fe, CH, rc]] })),
            n
          );
        })(),
        LH = (() => {
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
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵcmp = De({
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
                  "navbar-dark",
                  "bg-dark",
                  2,
                  "padding",
                  "10px 65px",
                  "display",
                  "flex",
                  "justify-content",
                  "space-between",
                  "margin-bottom",
                  "10px",
                ],
                ["id", "span"],
                [1, "btn"],
                ["href", "../assets/afifahmad resume (3).pdf", "download", ""],
                [1, "fa", "fa-download"],
                [
                  2,
                  "display",
                  "flex",
                  "margin-bottom",
                  "50px",
                  "justify-content",
                  "space-between",
                ],
                [
                  1,
                  "bg-dark",
                  2,
                  "flex",
                  "0.3",
                  "padding",
                  "50px",
                  "border-radius",
                  "20px",
                  "margin-left",
                  "10px",
                ],
                [2, "margin-bottom", "20px"],
                ["hideToggle", ""],
                [
                  "id",
                  "effect",
                  2,
                  "background",
                  "linear-gradient(\n            to bottom right,\n            hsl(0, 0%, 31%) 3%,\n            hsl(0, 0%, 20%) 97%\n          )",
                  "position",
                  "relative",
                  "border-radius",
                  "20px",
                  "margin-right",
                  "10px",
                  "flex",
                  "0.7",
                  "padding",
                  "100px",
                ],
                [
                  1,
                  "fixed",
                  "bg-dark",
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
              template: function (t, i) {
                1 & t &&
                  (m(0, "div", 0),
                  m(1, "h3"),
                  E(2, "Welcome"),
                  g(),
                  m(3, "div"),
                  m(4, "b", 1),
                  E(5, " Please Enter To desktop Mode to View Portfolio"),
                  g(),
                  L(6, "br"),
                  L(7, "br"),
                  m(8, "ul"),
                  m(9, "li"),
                  E(10, "Launch the Chrome browser on Android."),
                  g(),
                  m(11, "li"),
                  E(
                    12,
                    "Open any website that you want to view in desktop mode."
                  ),
                  g(),
                  m(13, "li"),
                  E(14, " Tap onvertical \xa0 "),
                  L(15, "span", 2),
                  E(16, " 3 dots icon the menu options. "),
                  g(),
                  m(17, "li"),
                  E(18, "Select the checkbox against the Desktop site."),
                  g(),
                  g(),
                  g(),
                  g(),
                  m(19, "div", 3),
                  m(20, "div", 4),
                  m(21, "nav", 5),
                  m(22, "div"),
                  m(23, "h3"),
                  E(24, "Welcome"),
                  g(),
                  g(),
                  m(25, "div"),
                  m(26, "b"),
                  E(27, "HIRE ME FOR "),
                  g(),
                  E(28, " \xa0"),
                  L(29, "span", 6),
                  g(),
                  m(30, "div"),
                  m(31, "b"),
                  E(32, "Resume"),
                  g(),
                  m(33, "button", 7),
                  m(34, "a", 8),
                  L(35, "i", 9),
                  g(),
                  g(),
                  g(),
                  g(),
                  g(),
                  m(36, "div"),
                  m(37, "div", 10),
                  m(38, "div", 11),
                  m(39, "div", 12),
                  L(40, "app-sidebar"),
                  g(),
                  m(41, "mat-accordion"),
                  m(42, "mat-expansion-panel", 13),
                  m(43, "mat-expansion-panel-header"),
                  m(44, "mat-panel-title"),
                  E(45, "Competency"),
                  g(),
                  L(46, "mat-panel-description"),
                  g(),
                  g(),
                  m(47, "mat-expansion-panel"),
                  m(48, "mat-expansion-panel-header"),
                  m(49, "mat-panel-title"),
                  E(50, " AWS"),
                  g(),
                  L(51, "mat-panel-description"),
                  g(),
                  m(52, "b"),
                  E(53, " AWS Compute | Networking"),
                  g(),
                  E(54, " (EC2, VPC .... ) "),
                  m(55, "b"),
                  E(56, "COLLECTION"),
                  g(),
                  E(57, " Kinesis | SQS | Amazon MSK "),
                  m(58, "b"),
                  E(59, "STORAGE"),
                  g(),
                  E(60, " S3 | DynamoDB "),
                  L(61, "br"),
                  m(62, "b"),
                  E(63, " PROCESSING "),
                  g(),
                  E(64, " EMR | Glue | Lambda "),
                  L(65, "br"),
                  m(66, "b"),
                  E(67, " ANALYSIS "),
                  g(),
                  E(68, " Athena | Redshift | OpenSearch "),
                  L(69, "br"),
                  m(70, "b"),
                  E(71, "VISUALIZATION "),
                  g(),
                  E(72, " Quicksight "),
                  L(73, "br"),
                  m(74, "b"),
                  E(75, " SECUIRITY "),
                  g(),
                  E(76, " KMS | VPC Endpoints | Encryption .. "),
                  g(),
                  m(77, "mat-expansion-panel"),
                  m(78, "mat-expansion-panel-header"),
                  m(79, "mat-panel-title"),
                  E(80, " Big Data "),
                  g(),
                  L(81, "mat-panel-description"),
                  g(),
                  m(82, "b"),
                  E(83, "Hadoop And Cloudera"),
                  g(),
                  E(
                    84,
                    " hadoop | Kafka | Yarn | Hive | spark | CM | Tablue | Sentry | Kerberos ... "
                  ),
                  g(),
                  m(85, "mat-expansion-panel"),
                  m(86, "mat-expansion-panel-header"),
                  m(87, "mat-panel-title"),
                  E(88, "Web Development"),
                  g(),
                  L(89, "mat-panel-description"),
                  g(),
                  m(90, "b"),
                  E(91, "Front End"),
                  g(),
                  E(92, " Angular | HTML | CSS | Javascript | Bootstrap "),
                  L(93, "br"),
                  m(94, "b"),
                  E(95, "Backend"),
                  g(),
                  E(96, " Node.js | Express "),
                  L(97, "br"),
                  m(98, "b"),
                  E(99, "Database"),
                  g(),
                  E(100, " MongoDB | Firebase "),
                  g(),
                  g(),
                  g(),
                  m(101, "div", 14),
                  L(102, "router-outlet"),
                  g(),
                  g(),
                  g(),
                  m(103, "div", 15),
                  m(104, "div", 16),
                  m(105, "h5"),
                  E(106, "Made By Afifahmad"),
                  g(),
                  m(107, "h5", 1),
                  L(108, "img", 17),
                  E(109, " Used Angular 13 "),
                  g(),
                  g(),
                  g(),
                  g());
              },
              directives: [gH, PH, QE, YE, FH, OH, sf],
              styles: [
                '@media screen and (max-width: 800px){#desktop[_ngcontent-%COMP%]{display:none}#phone[_ngcontent-%COMP%]{display:block;display:flex;flex-direction:column;justify-content:center;align-items:center}}.mat-form-field[_ngcontent-%COMP%] + .mat-form-field[_ngcontent-%COMP%]{margin-left:8px}@media screen and (min-width: 800px){#phone[_ngcontent-%COMP%]{display:none}}.test[_ngcontent-%COMP%]:after{content:"\\2807";font-size:20px;font-weight:700}',
                'div[_ngcontent-%COMP%]{\n    color: white;\n  }\n  #span[_ngcontent-%COMP%] {\n    color: red;\n    font-size: large;\n    font-family: cursive;\n  }\n  #span[_ngcontent-%COMP%]::before {\n    content: "";\n    animation: anime infinite 4s;\n  }\n  @keyframes anime {\n    33% {\n      content: "AWS Admin";\n    }\n    66% {\n      content: "Web Development";\n    }\n    100% {\n      content: "Big Data";\n    }\n  }',
              ],
            })),
            n
          );
        })(),
        NU = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({ imports: [[Fe], Fe] })),
            n
          );
        })(),
        YU = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({ imports: [[pE, yE, Fe, vE, Eo], pE, Fe, vE, NU] })),
            n
          );
        })(),
        ZU = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({ imports: [[Fe], Fe] })),
            n
          );
        })(),
        JU = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n })),
            (n.ɵinj = le({ imports: [[Eo, Fe, tc], tc, Fe] })),
            n
          );
        })(),
        e$ = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)();
            }),
            (n.ɵmod = ue({ type: n, bootstrap: [LH] })),
            (n.ɵinj = le({
              providers: [],
              imports: [[wE, I2, _C, W2, NH, k2, ZU, pH, D2, JU, zj, YU]],
            })),
            n
          );
        })();
      (function LO() {
        Ab = !1;
      })(),
        l1()
          .bootstrapModule(e$)
          .catch((n) => console.error(n));
    },
  },
  (se) => {
    se((se.s = 531));
  },
]);
