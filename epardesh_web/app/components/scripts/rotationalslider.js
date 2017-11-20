(function(h, g, c, j, d, l, k) {/*! Jssor */
                new (function() {
                });
                var e = {sd: function(a) {
                        return-c.cos(a * c.PI) / 2 + .5
                    }, Ac: function(a) {
                        return a
                    }, kd: function(a) {
                        return-a * (a - 2)
                    }}, f = {Md: e.Ac};
                var b = new function() {
                    var f = this, F = 1, yb = 2, fb = 3, eb = 4, jb = 5, G, r = 0, i = 0, s = 0, X = 0, z = 0, I = navigator, ob = I.appName, o = I.userAgent, p = parseFloat;
                    function Ib() {
                        if (!G) {
                            G = {de: "ontouchstart"in h || "createTouch"in g};
                            var a;
                            if (I.pointerEnabled || (a = I.msPointerEnabled))
                                G.Qc = a ? "msTouchAction" : "touchAction"
                        }
                        return G
                    }
                    function v(j) {
                        if (!r) {
                            r = -1;
                            if (ob == "Microsoft Internet Explorer" && !!h.attachEvent && !!h.ActiveXObject) {
                                var e = o.indexOf("MSIE");
                                r = F;
                                s = p(o.substring(e + 5, o.indexOf(";", e)));/*@cc_on X=@_jscript_version@*/
                                ;
                                i = g.documentMode || s
                            } else if (ob == "Netscape" && !!h.addEventListener) {
                                var d = o.indexOf("Firefox"), b = o.indexOf("Safari"), f = o.indexOf("Chrome"), c = o.indexOf("AppleWebKit");
                                if (d >= 0) {
                                    r = yb;
                                    i = p(o.substring(d + 8))
                                } else if (b >= 0) {
                                    var k = o.substring(0, b).lastIndexOf("/");
                                    r = f >= 0 ? eb : fb;
                                    i = p(o.substring(k + 1, b))
                                } else {
                                    var a = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/i.exec(o);
                                    if (a) {
                                        r = F;
                                        i = s = p(a[1])
                                    }
                                }
                                if (c >= 0)
                                    z = p(o.substring(c + 12))
                            } else {
                                var a = /(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(o);
                                if (a) {
                                    r = jb;
                                    i = p(a[2])
                                }
                            }
                        }
                        return j == r
                    }
                    function q() {
                        return v(F)
                    }
                    function Q() {
                        return q() && (i < 6 || g.compatMode == "BackCompat")
                    }
                    function db() {
                        return v(fb)
                    }
                    function ib() {
                        return v(jb)
                    }
                    function vb() {
                        return db() && z > 534 && z < 535
                    }
                    function J() {
                        v();
                        return z > 537 || i > 42 || r == F && i >= 11
                    }
                    function O() {
                        return q() && i < 9
                    }
                    function wb(a) {
                        var b, c;
                        return function(f) {
                            if (!b) {
                                b = d;
                                var e = a.substr(0, 1).toUpperCase() + a.substr(1);
                                n([a].concat(["WebKit", "ms", "Moz", "O", "webkit"]), function(g, d) {
                                    var b = a;
                                    if (d)
                                        b = g + e;
                                    if (f.style[b] != k)
                                        return c = b
                                })
                            }
                            return c
                        }
                    }
                    function ub(b) {
                        var a;
                        return function(c) {
                            a = a || wb(b)(c) || b;
                            return a
                        }
                    }
                    var K = ub("transform");
                    function nb(a) {
                        return{}.toString.call(a)
                    }
                    var kb = {};
                    n(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object"], function(a) {
                        kb["[object " + a + "]"] = a.toLowerCase()
                    });
                    function n(b, d) {
                        var a, c;
                        if (nb(b) == "[object Array]") {
                            for (a = 0; a < b.length; a++)
                                if (c = d(b[a], a, b))
                                    return c
                        } else
                            for (a in b)
                                if (c = d(b[a], a, b))
                                    return c
                    }
                    function C(a) {
                        return a == j ? String(a) : kb[nb(a)] || "object"
                    }
                    function A(a) {
                        try {
                            return C(a) == "object" && !a.nodeType && a != a.window && (!a.constructor || {}.hasOwnProperty.call(a.constructor.prototype, "isPrototypeOf"))
                        } catch (b) {
                        }
                    }
                    function u(a, b) {
                        return{x: a, y: b}
                    }
                    function rb(b, a) {
                        setTimeout(b, a || 0)
                    }
                    function H(b, d, c) {
                        var a = !b || b == "inherit" ? "" : b;
                        n(d, function(c) {
                            var b = c.exec(a);
                            if (b) {
                                var d = a.substr(0, b.index), e = a.substr(b.index + b[0].length + 1, a.length - 1);
                                a = d + e
                            }
                        });
                        a = c + (!a.indexOf(" ") ? "" : " ") + a;
                        return a
                    }
                    function tb(b, a) {
                        if (i < 9)
                            b.style.filter = a
                    }
                    f.ee = Ib;
                    f.hc = q;
                    f.ge = db;
                    f.je = J;
                    f.fc = O;
                    wb("transform");
                    f.lc = function() {
                        return i
                    };
                    f.mc = rb;
                    function Y(a) {
                        a.constructor === Y.caller && a.nc && a.nc.apply(a, Y.caller.arguments)
                    }
                    f.nc = Y;
                    f.Mb = function(a) {
                        if (f.ke(a))
                            a = g.getElementById(a);
                        return a
                    };
                    function t(a) {
                        return a || h.event
                    }
                    f.pc = t;
                    f.cc = function(b) {
                        b = t(b);
                        var a = b.target || b.srcElement || g;
                        if (a.nodeType == 3)
                            a = f.qc(a);
                        return a
                    };
                    f.tc = function(a) {
                        a = t(a);
                        return{x: a.pageX || a.clientX || 0, y: a.pageY || a.clientY || 0}
                    };
                    function D(c, d, a) {
                        if (a !== k)
                            c.style[d] = a == k ? "" : a;
                        else {
                            var b = c.currentStyle || c.style;
                            a = b[d];
                            if (a == "" && h.getComputedStyle) {
                                b = c.ownerDocument.defaultView.getComputedStyle(c, j);
                                b && (a = b.getPropertyValue(d) || b[d])
                            }
                            return a
                        }
                    }
                    function ab(b, c, a, d) {
                        if (a !== k) {
                            if (a == j)
                                a = "";
                            else
                                d && (a += "px");
                            D(b, c, a)
                        } else
                            return p(D(b, c))
                    }
                    function m(c, a) {
                        var d = a ? ab : D, b;
                        if (a & 4)
                            b = ub(c);
                        return function(e, f) {
                            return d(e, b ? b(e) : c, f, a & 2)
                        }
                    }
                    function Db(b) {
                        if (q() && s < 9) {
                            var a = /opacity=([^)]*)/.exec(b.style.filter || "");
                            return a ? p(a[1]) / 100 : 1
                        } else
                            return p(b.style.opacity || "1")
                    }
                    function Fb(b, a, f) {
                        if (q() && s < 9) {
                            var h = b.style.filter || "", i = new RegExp(/[\s]*alpha\([^\)]*\)/g), e = c.round(100 * a), d = "";
                            if (e < 100 || f)
                                d = "alpha(opacity=" + e + ") ";
                            var g = H(h, [i], d);
                            tb(b, g)
                        } else
                            b.style.opacity = a == 1 ? "" : c.round(a * 100) / 100
                    }
                    var L = {M: ["rotate"], H: ["rotateX"], J: ["rotateY"], pb: ["skewX"], yb: ["skewY"]};
                    if (!J())
                        L = B(L, {k: ["scaleX", 2], l: ["scaleY", 2], K: ["translateZ", 1]});
                    function M(d, a) {
                        var c = "";
                        if (a) {
                            if (q() && i && i < 10) {
                                delete a.H;
                                delete a.J;
                                delete a.K
                            }
                            b.e(a, function(d, b) {
                                var a = L[b];
                                if (a) {
                                    var e = a[1] || 0;
                                    if (N[b] != d)
                                        c += " " + a[0] + "(" + d + (["deg", "px", ""])[e] + ")"
                                }
                            });
                            if (J()) {
                                if (a.P || a.Q || a.K)
                                    c += " translate3d(" + (a.P || 0) + "px," + (a.Q || 0) + "px," + (a.K || 0) + "px)";
                                if (a.k == k)
                                    a.k = 1;
                                if (a.l == k)
                                    a.l = 1;
                                if (a.k != 1 || a.l != 1)
                                    c += " scale3d(" + a.k + ", " + a.l + ", 1)"
                            }
                        }
                        d.style[K(d)] = c
                    }
                    f.yc = m("transformOrigin", 4);
                    f.Yd = m("backfaceVisibility", 4);
                    f.Wd = m("transformStyle", 4);
                    f.Vd = m("perspective", 6);
                    f.Td = m("perspectiveOrigin", 4);
                    f.Rd = function(a, b) {
                        if (q() && s < 9 || s < 10 && Q())
                            a.style.zoom = b == 1 ? "" : b;
                        else {
                            var c = K(a), f = "scale(" + b + ")", e = a.style[c], g = new RegExp(/[\s]*scale\(.*?\)/g), d = H(e, [g], f);
                            a.style[c] = d
                        }
                    };
                    f.uc = function(b, a) {
                        return function(c) {
                            c = t(c);
                            var e = c.type, d = c.relatedTarget || (e == "mouseout" ? c.toElement : c.fromElement);
                            (!d || d !== a && !f.Qd(a, d)) && b(c)
                        }
                    };
                    f.c = function(a, d, b, c) {
                        a = f.Mb(a);
                        if (a.addEventListener) {
                            d == "mousewheel" && a.addEventListener("DOMMouseScroll", b, c);
                            a.addEventListener(d, b, c)
                        } else if (a.attachEvent) {
                            a.attachEvent("on" + d, b);
                            c && a.setCapture && a.setCapture()
                        }
                    };
                    f.W = function(a, c, d, b) {
                        a = f.Mb(a);
                        if (a.removeEventListener) {
                            c == "mousewheel" && a.removeEventListener("DOMMouseScroll", d, b);
                            a.removeEventListener(c, d, b)
                        } else if (a.detachEvent) {
                            a.detachEvent("on" + c, d);
                            b && a.releaseCapture && a.releaseCapture()
                        }
                    };
                    f.ac = function(a) {
                        a = t(a);
                        a.preventDefault && a.preventDefault();
                        a.cancel = d;
                        a.returnValue = l
                    };
                    f.Nd = function(a) {
                        a = t(a);
                        a.stopPropagation && a.stopPropagation();
                        a.cancelBubble = d
                    };
                    f.wb = function(d, c) {
                        var a = [].slice.call(arguments, 2), b = function() {
                            var b = a.concat([].slice.call(arguments, 0));
                            return c.apply(d, b)
                        };
                        return b
                    };
                    f.Ld = function(a, b) {
                        if (b == k)
                            return a.textContent || a.innerText;
                        var c = g.createTextNode(b);
                        f.Vb(a);
                        a.appendChild(c)
                    };
                    f.qb = function(d, c) {
                        for (var b = [], a = d.firstChild; a; a = a.nextSibling)
                            (c || a.nodeType == 1) && b.push(a);
                        return b
                    };
                    function mb(a, c, e, b) {
                        b = b || "u";
                        for (a = a?a.firstChild:j; a; a = a.nextSibling)
                            if (a.nodeType == 1) {
                                if (U(a, b) == c)
                                    return a;
                                if (!e) {
                                    var d = mb(a, c, e, b);
                                    if (d)
                                        return d
                                }
                            }
                    }
                    f.q = mb;
                    function S(a, d, f, b) {
                        b = b || "u";
                        var c = [];
                        for (a = a?a.firstChild:j; a; a = a.nextSibling)
                            if (a.nodeType == 1) {
                                U(a, b) == d && c.push(a);
                                if (!f) {
                                    var e = S(a, d, f, b);
                                    if (e.length)
                                        c = c.concat(e)
                                }
                            }
                        return c
                    }
                    f.pe = S;
                    function gb(a, c, d) {
                        for (a = a?a.firstChild:j; a; a = a.nextSibling)
                            if (a.nodeType == 1) {
                                if (a.tagName == c)
                                    return a;
                                if (!d) {
                                    var b = gb(a, c, d);
                                    if (b)
                                        return b
                                }
                            }
                    }
                    f.ie = gb;
                    function B() {
                        var e = arguments, d, c, b, a, g = 1 & e[0], f = 1 + g;
                        d = e[f - 1] || {};
                        for (; f < e.length; f++)
                            if (c = e[f])
                                for (b in c) {
                                    a = c[b];
                                    if (a !== k) {
                                        a = c[b];
                                        var h = d[b];
                                        d[b] = g && (A(h) || A(a)) ? B(g, {}, h, a) : a
                                    }
                                }
                        return d
                    }
                    f.rb = B;
                    f.ic = function(a) {
                        return C(a) == "function"
                    };
                    f.ke = function(a) {
                        return C(a) == "string"
                    };
                    f.Jd = function(a) {
                        return!isNaN(p(a)) && isFinite(a)
                    };
                    f.e = n;
                    function R(a) {
                        return g.createElement(a)
                    }
                    f.cb = function() {
                        return R("DIV")
                    };
                    f.Rc = function() {
                    };
                    function V(b, c, a) {
                        if (a == k)
                            return b.getAttribute(c);
                        b.setAttribute(c, a)
                    }
                    function U(a, b) {
                        return V(a, b) || V(a, "data-" + b)
                    }
                    f.xb = V;
                    f.f = U;
                    function x(b, a) {
                        if (a == k)
                            return b.className;
                        b.className = a
                    }
                    f.Vc = x;
                    f.qc = function(a) {
                        return a.parentNode
                    };
                    f.G = function(a) {
                        f.F(a, "none")
                    };
                    f.tb = function(a, b) {
                        f.F(a, b ? "none" : "")
                    };
                    f.gd = function(b, a) {
                        b.removeAttribute(a)
                    };
                    f.id = function() {
                        return q() && i < 10
                    };
                    f.jd = function(d, a) {
                        if (a)
                            d.style.clip = "rect(" + c.round(a.j || a.o || 0) + "px " + c.round(a.s) + "px " + c.round(a.r) + "px " + c.round(a.i || a.p || 0) + "px)";
                        else if (a !== k) {
                            var g = d.style.cssText, f = [new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i), new RegExp(/[\s]*cliptop: .*?[;]?/i), new RegExp(/[\s]*clipright: .*?[;]?/i), new RegExp(/[\s]*clipbottom: .*?[;]?/i), new RegExp(/[\s]*clipleft: .*?[;]?/i)], e = H(g, f, "");
                            b.zb(d, e)
                        }
                    };
                    f.I = function() {
                        return+new Date
                    };
                    f.z = function(b, a) {
                        b.appendChild(a)
                    };
                    f.Wb = function(b, a, c) {
                        (c || a.parentNode).insertBefore(b, a)
                    };
                    f.xc = function(b, a) {
                        a = a || b.parentNode;
                        a && a.removeChild(b)
                    };
                    f.dd = function(a, b) {
                        n(a, function(a) {
                            f.xc(a, b)
                        })
                    };
                    f.Vb = function(a) {
                        f.dd(f.qb(a, d), a)
                    };
                    f.Id = function(a, b) {
                        var c = f.qc(a);
                        b & 1 && f.A(a, (f.m(c) - f.m(a)) / 2);
                        b & 2 && f.C(a, (f.n(c) - f.n(a)) / 2)
                    };
                    f.Hd = function(b, a) {
                        return parseInt(b, a || 10)
                    };
                    f.Fd = p;
                    f.Qd = function(b, a) {
                        var c = g.body;
                        while (a && b !== a && c !== a)
                            try {
                                a = a.parentNode
                            } catch (d) {
                                return l
                            }
                        return b === a
                    };
                    function W(d, c, b) {
                        var a = d.cloneNode(!c);
                        !b && f.gd(a, "id");
                        return a
                    }
                    f.gb = W;
                    f.fb = function(e, g) {
                        var a = new Image;
                        function b(e, d) {
                            f.W(a, "load", b);
                            f.W(a, "abort", c);
                            f.W(a, "error", c);
                            g && g(a, d)
                        }
                        function c(a) {
                            b(a, d)
                        }
                        if (ib() && i < 11.6 || !e)
                            b(!e);
                        else {
                            f.c(a, "load", b);
                            f.c(a, "abort", c);
                            f.c(a, "error", c);
                            a.src = e
                        }
                    };
                    f.Ed = function(d, a, e) {
                        var c = d.length + 1;
                        function b(b) {
                            c--;
                            if (a && b && b.src == a.src)
                                a = b;
                            !c && e && e(a)
                        }
                        n(d, function(a) {
                            f.fb(a.src, b)
                        });
                        b()
                    };
                    f.S = D;
                    f.Ab = m("overflow");
                    f.C = m("top", 2);
                    f.A = m("left", 2);
                    f.m = m("width", 2);
                    f.n = m("height", 2);
                    f.Ad = m("marginLeft", 2);
                    f.zd = m("marginTop", 2);
                    f.v = m("position");
                    f.F = m("display");
                    f.u = m("zIndex", 1);
                    f.Gb = function(b, a, c) {
                        if (a != k)
                            Fb(b, a, c);
                        else
                            return Db(b)
                    };
                    f.zb = function(a, b) {
                        if (b != k)
                            a.style.cssText = b;
                        else
                            return a.style.cssText
                    };
                    var T = {hb: f.Gb, j: f.C, i: f.A, ub: f.m, vb: f.n, db: f.v, Pe: f.F, ab: f.u};
                    function w(g, l) {
                        var e = O(), b = J(), d = vb(), h = K(g);
                        function i(b, d, a) {
                            var e = b.V(u(-d / 2, -a / 2)), f = b.V(u(d / 2, -a / 2)), g = b.V(u(d / 2, a / 2)), h = b.V(u(-d / 2, a / 2));
                            b.V(u(300, 300));
                            return u(c.min(e.x, f.x, g.x, h.x) + d / 2, c.min(e.y, f.y, g.y, h.y) + a / 2)
                        }
                        function a(d, a) {
                            a = a || {};
                            var g = a.K || 0, l = (a.H || 0) % 360, m = (a.J || 0) % 360, o = (a.M || 0) % 360, p = a.Oe;
                            if (e) {
                                g = 0;
                                l = 0;
                                m = 0;
                                p = 0
                            }
                            var c = new Cb(a.P, a.Q, g);
                            c.H(l);
                            c.J(m);
                            c.wd(o);
                            c.vd(a.pb, a.yb);
                            c.ud(a.k, a.l, p);
                            if (b) {
                                c.Z(a.p, a.o);
                                d.style[h] = c.td()
                            } else if (!X || X < 9) {
                                var j = "";
                                if (o || a.k != k && a.k != 1 || a.l != k && a.l != 1) {
                                    var n = i(c, a.U, a.T);
                                    f.zd(d, n.y);
                                    f.Ad(d, n.x);
                                    j = c.rd()
                                }
                                var r = d.style.filter, s = new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g), q = H(r, [s], j);
                                tb(d, q)
                            }
                        }
                        w = function(e, c) {
                            c = c || {};
                            var h = c.p, i = c.o, g;
                            n(T, function(a, b) {
                                g = c[b];
                                g !== k && a(e, g)
                            });
                            f.jd(e, c.a);
                            if (!b) {
                                h != k && f.A(e, c.Cc + h);
                                i != k && f.C(e, c.Uc + i)
                            }
                            if (c.qd)
                                if (d)
                                    rb(f.wb(j, M, e, c));
                                else
                                    a(e, c)
                        };
                        f.sb = M;
                        if (d)
                            f.sb = w;
                        if (e)
                            f.sb = a;
                        else if (!b)
                            a = M;
                        f.L = w;
                        w(g, l)
                    }
                    f.sb = w;
                    f.L = w;
                    function Cb(i, l, p) {
                        var d = this, b = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, i || 0, l || 0, p || 0, 1], h = c.sin, g = c.cos, m = c.tan;
                        function f(a) {
                            return a * c.PI / 180
                        }
                        function o(a, b) {
                            return{x: a, y: b}
                        }
                        function n(c, e, l, m, o, r, t, u, w, z, A, C, E, b, f, k, a, g, i, n, p, q, s, v, x, y, B, D, F, d, h, j) {
                            return[c * a + e * p + l * x + m * F, c * g + e * q + l * y + m * d, c * i + e * s + l * B + m * h, c * n + e * v + l * D + m * j, o * a + r * p + t * x + u * F, o * g + r * q + t * y + u * d, o * i + r * s + t * B + u * h, o * n + r * v + t * D + u * j, w * a + z * p + A * x + C * F, w * g + z * q + A * y + C * d, w * i + z * s + A * B + C * h, w * n + z * v + A * D + C * j, E * a + b * p + f * x + k * F, E * g + b * q + f * y + k * d, E * i + b * s + f * B + k * h, E * n + b * v + f * D + k * j]
                        }
                        function e(c, a) {
                            return n.apply(j, (a || b).concat(c))
                        }
                        d.ud = function(a, c, d) {
                            if (a == k)
                                a = 1;
                            if (c == k)
                                c = 1;
                            if (d == k)
                                d = 1;
                            if (a != 1 || c != 1 || d != 1)
                                b = e([a, 0, 0, 0, 0, c, 0, 0, 0, 0, d, 0, 0, 0, 0, 1])
                        };
                        d.Z = function(a, c, d) {
                            b[12] += a || 0;
                            b[13] += c || 0;
                            b[14] += d || 0
                        };
                        d.H = function(c) {
                            if (c) {
                                a = f(c);
                                var d = g(a), i = h(a);
                                b = e([1, 0, 0, 0, 0, d, i, 0, 0, -i, d, 0, 0, 0, 0, 1])
                            }
                        };
                        d.J = function(c) {
                            if (c) {
                                a = f(c);
                                var d = g(a), i = h(a);
                                b = e([d, 0, -i, 0, 0, 1, 0, 0, i, 0, d, 0, 0, 0, 0, 1])
                            }
                        };
                        d.wd = function(c) {
                            if (c) {
                                a = f(c);
                                var d = g(a), i = h(a);
                                b = e([d, i, 0, 0, -i, d, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
                            }
                        };
                        d.vd = function(a, c) {
                            if (a || c) {
                                i = f(a);
                                l = f(c);
                                b = e([1, m(l), 0, 0, m(i), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
                            }
                        };
                        d.V = function(c) {
                            var a = e(b, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, c.x, c.y, 0, 1]);
                            return o(a[12], a[13])
                        };
                        d.td = function() {
                            return"matrix3d(" + b.join(",") + ")"
                        };
                        d.rd = function() {
                            return"progid:DXImageTransform.Microsoft.Matrix(M11=" + b[0] + ", M12=" + b[4] + ", M21=" + b[1] + ", M22=" + b[5] + ", SizingMethod='auto expand')"
                        }
                    }
                    new function() {
                        var a = this;
                        function b(d, g) {
                            for (var j = d[0].length, i = d.length, h = g[0].length, f = [], c = 0; c < i; c++)
                                for (var k = f[c] = [], b = 0; b < h; b++) {
                                    for (var e = 0, a = 0; a < j; a++)
                                        e += d[c][a] * g[a][b];
                                    k[b] = e
                                }
                            return f
                        }
                        a.k = function(b, c) {
                            return a.Zc(b, c, 0)
                        };
                        a.l = function(b, c) {
                            return a.Zc(b, 0, c)
                        };
                        a.Zc = function(a, c, d) {
                            return b(a, [[c, 0], [0, d]])
                        };
                        a.V = function(d, c) {
                            var a = b(d, [[c.x], [c.y]]);
                            return u(a[0][0], a[1][0])
                        }
                    };
                    var N = {Cc: 0, Uc: 0, p: 0, o: 0, R: 1, k: 1, l: 1, M: 0, H: 0, J: 0, P: 0, Q: 0, K: 0, pb: 0, yb: 0};
                    f.pd = function(a) {
                        var c = a || {};
                        if (a)
                            if (b.ic(a))
                                c = {Fb: c};
                            else if (b.ic(a.a))
                                c.a = {Fb: a.a};
                        return c
                    };
                    f.nd = function(l, m, x, q, z, A, n) {
                        var a = m;
                        if (l) {
                            a = {};
                            for (var g in m) {
                                var B = A[g] || 1, w = z[g] || [0, 1], f = (x - w[0]) / w[1];
                                f = c.min(c.max(f, 0), 1);
                                f = f * B;
                                var u = c.floor(f);
                                if (f != u)
                                    f -= u;
                                var h = q.Fb || e.sd, i, C = l[g], o = m[g];
                                if (b.Jd(o)) {
                                    h = q[g] || h;
                                    var y = h(f);
                                    i = C + o * y
                                } else {
                                    i = b.rb({ob: {}}, l[g]);
                                    var v = q[g] || {};
                                    b.e(o.ob || o, function(d, a) {
                                        h = v[a] || v.Fb || h;
                                        var c = h(f), b = d * c;
                                        i.ob[a] = b;
                                        i[a] += b
                                    })
                                }
                                a[g] = i
                            }
                            var t = b.e(m, function(b, a) {
                                return N[a] != k
                            });
                            t && b.e(N, function(c, b) {
                                if (a[b] == k && l[b] !== k)
                                    a[b] = l[b]
                            });
                            if (t) {
                                if (a.R)
                                    a.k = a.l = a.R;
                                a.U = n.U;
                                a.T = n.T;
                                a.qd = d
                            }
                        }
                        if (m.a && n.Z) {
                            var p = a.a.ob, s = (p.j || 0) + (p.r || 0), r = (p.i || 0) + (p.s || 0);
                            a.i = (a.i || 0) + r;
                            a.j = (a.j || 0) + s;
                            a.a.i -= r;
                            a.a.s -= r;
                            a.a.j -= s;
                            a.a.r -= s
                        }
                        if (a.a && b.id() && !a.a.j && !a.a.i && !a.a.o && !a.a.p && a.a.s == n.U && a.a.r == n.T)
                            a.a = j;
                        return a
                    }
                };
                function n() {
                    var a = this, d = [];
                    function i(a, b) {
                        d.push({Ib: a, Kb: b})
                    }
                    function g(a, c) {
                        b.e(d, function(b, e) {
                            b.Ib == a && b.Kb === c && d.splice(e, 1)
                        })
                    }
                    a.Y = a.addEventListener = i;
                    a.removeEventListener = g;
                    a.g = function(a) {
                        var c = [].slice.call(arguments, 1);
                        b.e(d, function(b) {
                            b.Ib == a && b.Kb.apply(h, c)
                        })
                    }
                }
                var m = function(z, C, i, J, M, L) {
                    z = z || 0;
                    var a = this, q, n, o, u, A = 0, G, H, F, B, y = 0, g = 0, m = 0, D, k, f, e, p, w = [], x;
                    function O(a) {
                        f += a;
                        e += a;
                        k += a;
                        g += a;
                        m += a;
                        y += a
                    }
                    function t(o) {
                        var h = o;
                        if (p && (h >= e || h <= f))
                            h = ((h - f) % p + p) % p + f;
                        if (!D || u || g != h) {
                            var j = c.min(h, e);
                            j = c.max(j, f);
                            if (!D || u || j != m) {
                                if (L) {
                                    var l = (j - k) / (C || 1);
                                    if (i.md)
                                        l = 1 - l;
                                    var n = b.nd(M, L, l, G, F, H, i);
                                    if (x)
                                        b.e(n, function(b, a) {
                                            x[a] && x[a](J, b)
                                        });
                                    else
                                        b.L(J, n)
                                }
                                a.Rb(m - k, j - k);
                                m = j;
                                b.e(w, function(b, c) {
                                    var a = o < g ? w[w.length - c - 1] : b;
                                    a.D(m - y)
                                });
                                var r = g, q = m;
                                g = h;
                                D = d;
                                a.nb(r, q)
                            }
                        }
                    }
                    function E(a, b, d) {
                        b && a.Yb(e);
                        if (!d) {
                            f = c.min(f, a.Pc() + y);
                            e = c.max(e, a.bc() + y)
                        }
                        w.push(a)
                    }
                    var r = h.requestAnimationFrame || h.webkitRequestAnimationFrame || h.mozRequestAnimationFrame || h.msRequestAnimationFrame;
                    if (b.ge() && b.lc() < 7)
                        r = j;
                    r = r || function(a) {
                        b.mc(a, i.Mc)
                    };
                    function I() {
                        if (q) {
                            var d = b.I(), e = c.min(d - A, i.Lc), a = g + e * o;
                            A = d;
                            if (a * o >= n * o)
                                a = n;
                            t(a);
                            if (!u && a * o >= n * o)
                                K(B);
                            else
                                r(I)
                        }
                    }
                    function s(h, i, j) {
                        if (!q) {
                            q = d;
                            u = j;
                            B = i;
                            h = c.max(h, f);
                            h = c.min(h, e);
                            n = h;
                            o = n < g ? -1 : 1;
                            a.Kc();
                            A = b.I();
                            r(I)
                        }
                    }
                    function K(b) {
                        if (q) {
                            u = q = B = l;
                            a.Hc();
                            b && b()
                        }
                    }
                    a.Fc = function(a, b, c) {
                        s(a ? g + a : e, b, c)
                    };
                    a.Ec = s;
                    a.O = K;
                    a.Kd = function(a) {
                        s(a)
                    };
                    a.B = function() {
                        return g
                    };
                    a.Dc = function() {
                        return n
                    };
                    a.X = function() {
                        return m
                    };
                    a.D = t;
                    a.Z = function(a) {
                        t(g + a)
                    };
                    a.bd = function() {
                        return q
                    };
                    a.od = function(a) {
                        p = a
                    };
                    a.Yb = O;
                    a.ad = function(a, b) {
                        E(a, 0, b)
                    };
                    a.Sb = function(a) {
                        E(a, 1)
                    };
                    a.Pc = function() {
                        return f
                    };
                    a.bc = function() {
                        return e
                    };
                    a.nb = a.Kc = a.Hc = a.Rb = b.Rc;
                    a.Db = b.I();
                    i = b.rb({Mc: 16, Lc: 50}, i);
                    p = i.vc;
                    x = i.Bd;
                    f = k = z;
                    e = z + C;
                    H = i.Cd || {};
                    F = i.Dd || {};
                    G = b.pd(i.kb)
                };
                new (function() {
                });
                var i = function(p, fc) {
                    var f = this;
                    function Bc() {
                        var a = this;
                        m.call(a, -1e8, 2e8);
                        a.ce = function() {
                            var b = a.X(), d = c.floor(b), f = t(d), e = b - c.floor(b);
                            return{N: f, be: d, db: e}
                        };
                        a.nb = function(b, a) {
                            var e = c.floor(a);
                            if (e != a && a > b)
                                e++;
                            Ub(e, d);
                            f.g(i.ae, t(a), t(b), a, b)
                        }
                    }
                    function Ac() {
                        var a = this;
                        m.call(a, 0, 0, {vc: r});
                        b.e(C, function(b) {
                            D & 1 && b.od(r);
                            a.Sb(b);
                            b.Yb(ib / bc)
                        })
                    }
                    function zc() {
                        var a = this, b = Tb.E;
                        m.call(a, -1, 2, {kb: e.Ac, Bd: {db: Zb}, vc: r}, b, {db: 1}, {db: -2});
                        a.Zb = b
                    }
                    function nc(o, n) {
                        var b = this, e, g, h, k, c;
                        m.call(b, -1e8, 2e8, {Lc: 100});
                        b.Kc = function() {
                            M = d;
                            R = j;
                            f.g(i.Zd, t(w.B()), w.B())
                        };
                        b.Hc = function() {
                            M = l;
                            k = l;
                            var a = w.ce();
                            f.g(i.le, t(w.B()), w.B());
                            !a.db && Dc(a.be, s)
                        };
                        b.nb = function(i, f) {
                            var b;
                            if (k)
                                b = c;
                            else {
                                b = g;
                                if (h) {
                                    var d = f / h;
                                    b = a.cd(d) * (g - e) + e
                                }
                            }
                            w.D(b)
                        };
                        b.lb = function(a, d, c, f) {
                            e = a;
                            g = d;
                            h = c;
                            w.D(a);
                            b.D(0);
                            b.Ec(c, f)
                        };
                        b.Ud = function(a) {
                            k = d;
                            c = a;
                            b.Fc(a, j, d)
                        };
                        b.Sd = function(a) {
                            c = a
                        };
                        w = new Bc;
                        w.ad(o);
                        w.ad(n)
                    }
                    function pc() {
                        var c = this, a = Xb();
                        b.u(a, 0);
                        b.S(a, "pointerEvents", "none");
                        c.E = a;
                        c.mb = function() {
                            b.G(a);
                            b.Vb(a)
                        }
                    }
                    function xc(o, g) {
                        var e = this, q, L, v, k, y = [], x, B, W, G, Q, F, h, w, p;
                        m.call(e, -u, u + 1, {});
                        function E(a) {
                            q && q.Yc();
                            T(o, a, 0);
                            F = d;
                            q = new I.bb(o, I, b.Fd(b.f(o, "idle")) || lc);
                            q.D(0)
                        }
                        function Z() {
                            q.Db < I.Db && E()
                        }
                        function M(p, r, o) {
                            if (!G) {
                                G = d;
                                if (k && o) {
                                    var h = o.width, c = o.height, n = h, m = c;
                                    if (h && c && a.eb) {
                                        if (a.eb & 3 && (!(a.eb & 4) || h > K || c > J)) {
                                            var j = l, q = K / J * c / h;
                                            if (a.eb & 1)
                                                j = q > 1;
                                            else if (a.eb & 2)
                                                j = q < 1;
                                            n = j ? h * J / c : K;
                                            m = j ? J : c * K / h
                                        }
                                        b.m(k, n);
                                        b.n(k, m);
                                        b.C(k, (J - m) / 2);
                                        b.A(k, (K - n) / 2)
                                    }
                                    b.v(k, "absolute");
                                    f.g(i.Pd, g)
                                }
                            }
                            b.G(r);
                            p && p(e)
                        }
                        function Y(b, c, d, f) {
                            if (f == R && s == g && N)
                                if (!Cc) {
                                    var a = t(b);
                                    A.Ae(a, g, c, e, d);
                                    c.ne();
                                    U.Yb(a - U.Pc() - 1);
                                    U.D(a);
                                    z.lb(b, b, 0)
                                }
                        }
                        function cb(b) {
                            if (b == R && s == g) {
                                if (!h) {
                                    var a = j;
                                    if (A)
                                        if (A.N == g)
                                            a = A.fe();
                                        else
                                            A.mb();
                                    Z();
                                    h = new vc(o, g, a, q);
                                    h.Wc(p)
                                }
                                !h.bd() && h.Eb()
                            }
                        }
                        function S(d, f, l) {
                            if (d == g) {
                                if (d != f)
                                    C[f] && C[f].Xd();
                                else
                                    !l && h && h.me();
                                p && p.wc();
                                var m = R = b.I();
                                e.fb(b.wb(j, cb, m))
                            } else {
                                var k = c.min(g, d), i = c.max(g, d), o = c.min(i - k, k + r - i), n = u + a.xe - 1;
                                (!Q || o <= n) && e.fb()
                            }
                        }
                        function db() {
                            if (s == g && h) {
                                h.O();
                                p && p.oe();
                                p && p.Be();
                                h.Tc()
                            }
                        }
                        function eb() {
                            s == g && h && h.O()
                        }
                        function ab(a) {
                            !P && f.g(i.Ce, g, a)
                        }
                        function O() {
                            p = w.pInstance;
                            h && h.Wc(p)
                        }
                        e.fb = function(c, a) {
                            a = a || v;
                            if (y.length && !G) {
                                b.tb(a);
                                if (!W) {
                                    W = d;
                                    f.g(i.Ee, g);
                                    b.e(y, function(a) {
                                        if (!b.xb(a, "src")) {
                                            a.src = b.f(a, "src2");
                                            b.F(a, a["display-origin"])
                                        }
                                    })
                                }
                                b.Ed(y, k, b.wb(j, M, c, a))
                            } else
                                M(c, a)
                        };
                        e.De = function() {
                            var h = g;
                            if (a.Nb < 0)
                                h -= r;
                            var d = h + a.Nb * tc;
                            if (D & 2)
                                d = t(d);
                            if (!(D & 1))
                                d = c.max(0, c.min(d, r - u));
                            if (d != g) {
                                if (A) {
                                    var e = A.Od(r);
                                    if (e) {
                                        var i = R = b.I(), f = C[t(d)];
                                        return f.fb(b.wb(j, Y, d, f, e, i), v)
                                    }
                                }
                                bb(d)
                            }
                        };
                        e.Ob = function() {
                            S(g, g, d)
                        };
                        e.Xd = function() {
                            p && p.oe();
                            p && p.Be();
                            e.Sc();
                            h && h.ze();
                            h = j;
                            E()
                        };
                        e.ne = function() {
                            b.G(o)
                        };
                        e.Sc = function() {
                            b.tb(o)
                        };
                        e.ye = function() {
                            p && p.wc()
                        };
                        function T(a, c, e) {
                            if (b.xb(a, "jssor-slider"))
                                return;
                            if (!F) {
                                if (a.tagName == "IMG") {
                                    y.push(a);
                                    if (!b.xb(a, "src")) {
                                        Q = d;
                                        a["display-origin"] = b.F(a);
                                        b.G(a)
                                    }
                                }
                                b.fc() && b.u(a, (b.u(a) || 0) + 1)
                            }
                            var f = b.qb(a);
                            b.e(f, function(f) {
                                var h = f.tagName, i = b.f(f, "u");
                                if (i == "player" && !w) {
                                    w = f;
                                    if (w.pInstance)
                                        O();
                                    else
                                        b.c(w, "dataavailable", O)
                                }
                                if (i == "caption") {
                                    if (c) {
                                        b.yc(f, b.f(f, "to"));
                                        b.Yd(f, b.f(f, "bf"));
                                        b.f(f, "3d") && b.Wd(f, "preserve-3d")
                                    } else if (!b.hc()) {
                                        var g = b.gb(f, l, d);
                                        b.Wb(g, f, a);
                                        b.xc(f, a);
                                        f = g;
                                        c = d
                                    }
                                } else if (!F && !e && !k) {
                                    if (h == "A") {
                                        if (b.f(f, "u") == "image")
                                            k = b.ie(f, "IMG");
                                        else
                                            k = b.q(f, "image", d);
                                        if (k) {
                                            x = f;
                                            b.F(x, "block");
                                            b.L(x, V);
                                            B = b.gb(x, d);
                                            b.v(x, "relative");
                                            b.Gb(B, 0);
                                            b.S(B, "backgroundColor", "#000")
                                        }
                                    } else if (h == "IMG" && b.f(f, "u") == "image")
                                        k = f;
                                    if (k) {
                                        k.border = 0;
                                        b.L(k, V)
                                    }
                                }
                                T(f, c, e + 1)
                            })
                        }
                        e.Rb = function(c, b) {
                            var a = u - b;
                            Zb(L, a)
                        };
                        e.N = g;
                        n.call(e);
                        b.Vd(o, b.f(o, "p"));
                        b.Td(o, b.f(o, "po"));
                        var H = b.q(o, "thumb", d);
                        if (H) {
                            b.gb(H);
                            b.G(H)
                        }
                        b.tb(o);
                        v = b.gb(fb);
                        b.u(v, 1e3);
                        b.c(o, "click", ab);
                        E(d);
                        e.he = k;
                        e.Oc = B;
                        e.Zb = L = o;
                        b.z(L, v);
                        f.Y(203, S);
                        f.Y(28, eb);
                        f.Y(24, db)
                    }
                    function vc(y, g, p, q) {
                        var a = this, n = 0, u = 0, h, j, e, c, k, t, r, o = C[g];
                        m.call(a, 0, 0);
                        function v() {
                            b.Vb(L);
                            cc && k && o.Oc && b.z(L, o.Oc);
                            b.tb(L, !k && o.he)
                        }
                        function w() {
                            a.Eb()
                        }
                        function x(b) {
                            r = b;
                            a.O();
                            a.Eb()
                        }
                        a.Eb = function() {
                            var b = a.X();
                            if (!B && !M && !r && s == g) {
                                if (!b) {
                                    if (h && !k) {
                                        k = d;
                                        a.Tc(d);
                                        f.g(i.we, g, n, u, h, c)
                                    }
                                    v()
                                }
                                var l, p = i.Nc;
                                if (b != c)
                                    if (b == e)
                                        l = c;
                                    else if (b == j)
                                        l = e;
                                    else if (!b)
                                        l = j;
                                    else
                                        l = a.Dc();
                                f.g(p, g, b, n, j, e, c);
                                var m = N && (!E || F);
                                if (b == c)
                                    (e != c && !(E & 12) || m) && o.De();
                                else
                                    (m || b != e) && a.Ec(l, w)
                            }
                        };
                        a.me = function() {
                            e == c && e == a.X() && a.D(j)
                        };
                        a.ze = function() {
                            A && A.N == g && A.mb();
                            var b = a.X();
                            b < c && f.g(i.Nc, g, -b - 1, n, j, e, c)
                        };
                        a.Tc = function(a) {
                            p && b.Ab(jb, a && p.rc.Ge ? "" : "hidden")
                        };
                        a.Rb = function(b, a) {
                            if (k && a >= h) {
                                k = l;
                                v();
                                o.Sc();
                                A.mb();
                                f.g(i.ve, g, n, u, h, c)
                            }
                            f.g(i.ue, g, a, n, j, e, c)
                        };
                        a.Wc = function(a) {
                            if (a && !t) {
                                t = a;
                                a.Y($JssorPlayer$.ed, x)
                            }
                        };
                        p && a.Sb(p);
                        h = a.bc();
                        a.Sb(q);
                        j = h + q.Jc;
                        e = h + q.Ic;
                        c = a.bc()
                    }
                    function Kb(a, c, d) {
                        b.A(a, c);
                        b.C(a, d)
                    }
                    function Zb(c, b) {
                        var a = x > 0 ? x : eb, d = zb * b * (a & 1), e = Ab * b * (a >> 1 & 1);
                        Kb(c, d, e)
                    }
                    function Pb() {
                        pb = M;
                        Ib = z.Dc();
                        G = w.B()
                    }
                    function gc() {
                        Pb();
                        if (B || !F && E & 12) {
                            z.O();
                            f.g(i.te)
                        }
                    }
                    function ec(f) {
                        if (!B && (F || !(E & 12)) && !z.bd()) {
                            var d = w.B(), b = c.ceil(G);
                            if (f && c.abs(H) >= a.Gc) {
                                b = c.ceil(d);
                                b += hb
                            }
                            if (!(D & 1))
                                b = c.min(r - u, c.max(b, 0));
                            var e = c.abs(b - d);
                            e = 1 - c.pow(1 - e, 5);
                            if (!P && pb)
                                z.Kd(Ib);
                            else if (d == b) {
                                sb.ye();
                                sb.Ob()
                            } else
                                z.lb(d, b, e * Vb)
                        }
                    }
                    function Hb(a) {
                        !b.f(b.cc(a), "nodrag") && b.ac(a)
                    }
                    function rc(a) {
                        Yb(a, 1)
                    }
                    function Yb(a, c) {
                        a = b.pc(a);
                        var k = b.cc(a);
                        if (!O && !b.f(k, "nodrag") && sc() && (!c || a.touches.length == 1)) {
                            B = d;
                            yb = l;
                            R = j;
                            b.c(g, c ? "touchmove" : "mousemove", Bb);
                            b.I();
                            P = 0;
                            gc();
                            if (!pb)
                                x = 0;
                            if (c) {
                                var h = a.touches[0];
                                ub = h.clientX;
                                vb = h.clientY
                            } else {
                                var e = b.tc(a);
                                ub = e.x;
                                vb = e.y
                            }
                            H = 0;
                            gb = 0;
                            hb = 0;
                            f.g(i.se, t(G), G, a)
                        }
                    }
                    function Bb(e) {
                        if (B) {
                            e = b.pc(e);
                            var f;
                            if (e.type != "mousemove") {
                                var l = e.touches[0];
                                f = {x: l.clientX, y: l.clientY}
                            } else
                                f = b.tc(e);
                            if (f) {
                                var j = f.x - ub, k = f.y - vb;
                                if (c.floor(G) != G)
                                    x = x || eb & O;
                                if ((j || k) && !x) {
                                    if (O == 3)
                                        if (c.abs(k) > c.abs(j))
                                            x = 2;
                                        else
                                            x = 1;
                                    else
                                        x = O;
                                    if (mb && x == 1 && c.abs(k) - c.abs(j) > 3)
                                        yb = d
                                }
                                if (x) {
                                    var a = k, i = Ab;
                                    if (x == 1) {
                                        a = j;
                                        i = zb
                                    }
                                    if (!(D & 1)) {
                                        if (a > 0) {
                                            var g = i * s, h = a - g;
                                            if (h > 0)
                                                a = g + c.sqrt(h) * 5
                                        }
                                        if (a < 0) {
                                            var g = i * (r - u - s), h = -a - g;
                                            if (h > 0)
                                                a = -g - c.sqrt(h) * 5
                                        }
                                    }
                                    if (H - gb < -2)
                                        hb = 0;
                                    else if (H - gb > 2)
                                        hb = -1;
                                    gb = H;
                                    H = a;
                                    rb = G - H / i / (Y || 1);
                                    if (H && x && !yb) {
                                        b.ac(e);
                                        if (!M)
                                            z.Ud(rb);
                                        else
                                            z.Sd(rb)
                                    }
                                }
                            }
                        }
                    }
                    function ab() {
                        qc();
                        if (B) {
                            B = l;
                            b.I();
                            b.W(g, "mousemove", Bb);
                            b.W(g, "touchmove", Bb);
                            P = H;
                            z.O();
                            var a = w.B();
                            f.g(i.re, t(a), a, t(G), G);
                            E & 12 && Pb();
                            ec(d)
                        }
                    }
                    function jc(c) {
                        if (P) {
                            b.Nd(c);
                            var a = b.cc(c);
                            while (a && v !== a) {
                                a.tagName == "A" && b.ac(c);
                                try {
                                    a = a.parentNode
                                } catch (d) {
                                    break
                                }
                            }
                        }
                    }
                    function Jb(a) {
                        C[s];
                        s = t(a);
                        sb = C[s];
                        Ub(a);
                        return s
                    }
                    function Dc(a, b) {
                        x = 0;
                        Jb(a);
                        f.g(i.qe, t(a), b)
                    }
                    function Ub(a, c) {
                        wb = a;
                        b.e(S, function(b) {
                            b.Tb(t(a), a, c)
                        })
                    }
                    function sc() {
                        var b = i.kc || 0, a = X;
                        if (mb)
                            a & 1 && (a &= 1);
                        i.kc |= a;
                        return O = a & ~b
                    }
                    function qc() {
                        if (O) {
                            i.kc &= ~X;
                            O = 0
                        }
                    }
                    function Xb() {
                        var a = b.cb();
                        b.L(a, V);
                        b.v(a, "absolute");
                        return a
                    }
                    function t(a) {
                        return(a % r + r) % r
                    }
                    function kc(b, d) {
                        if (d)
                            if (!D) {
                                b = c.min(c.max(b + wb, 0), r - u);
                                d = l
                            } else if (D & 2) {
                                b = t(b + wb);
                                d = l
                            }
                        bb(b, a.Cb, d)
                    }
                    function xb() {
                        b.e(S, function(a) {
                            a.Qb(a.Bb.He <= F)
                        })
                    }
                    function hc() {
                        if (!F) {
                            F = 1;
                            xb();
                            if (!B) {
                                E & 12 && ec();
                                E & 3 && C[s].Ob()
                            }
                        }
                    }
                    function Ec() {
                        if (F) {
                            F = 0;
                            xb();
                            B || !(E & 12) || gc()
                        }
                    }
                    function ic() {
                        V = {ub: K, vb: J, j: 0, i: 0};
                        b.e(T, function(a) {
                            b.L(a, V);
                            b.v(a, "absolute");
                            b.Ab(a, "hidden");
                            b.G(a)
                        });
                        b.L(fb, V)
                    }
                    function ob(b, a) {
                        bb(b, a, d)
                    }
                    function bb(g, f, j) {
                        if (Rb && (!B && (F || !(E & 12)) || a.gc)) {
                            M = d;
                            B = l;
                            z.O();
                            if (f == k)
                                f = Vb;
                            var e = Cb.X(), b = g;
                            if (j) {
                                b = e + g;
                                if (g > 0)
                                    b = c.ceil(b);
                                else
                                    b = c.floor(b)
                            }
                            if (D & 2)
                                b = t(b);
                            if (!(D & 1))
                                b = c.max(0, c.min(b, r - u));
                            var i = (b - e) % r;
                            b = e + i;
                            var h = e == b ? 0 : f * c.abs(i);
                            h = c.min(h, f * u * 1.5);
                            z.lb(e, b, h || 1)
                        }
                    }
                    f.Fc = function() {
                        if (!N) {
                            N = d;
                            C[s] && C[s].Ob()
                        }
                    };
                    function W() {
                        return b.m(y || p)
                    }
                    function lb() {
                        return b.n(y || p)
                    }
                    f.U = W;
                    f.T = lb;
                    function Eb(c, d) {
                        if (c == k)
                            return b.m(p);
                        if (!y) {
                            var a = b.cb(g);
                            b.Vc(a, b.Vc(p));
                            b.zb(a, b.zb(p));
                            b.F(a, "block");
                            b.v(a, "relative");
                            b.C(a, 0);
                            b.A(a, 0);
                            b.Ab(a, "visible");
                            y = b.cb(g);
                            b.v(y, "absolute");
                            b.C(y, 0);
                            b.A(y, 0);
                            b.m(y, b.m(p));
                            b.n(y, b.n(p));
                            b.yc(y, "0 0");
                            b.z(y, a);
                            var h = b.qb(p);
                            b.z(p, y);
                            b.S(p, "backgroundImage", "");
                            b.e(h, function(c) {
                                b.z(b.f(c, "noscale") ? p : a, c);
                                b.f(c, "autocenter") && Mb.push(c)
                            })
                        }
                        Y = c / (d ? b.n : b.m)(y);
                        b.Rd(y, Y);
                        var f = d ? Y * W() : c, e = d ? c : Y * lb();
                        b.m(p, f);
                        b.n(p, e);
                        b.e(Mb, function(a) {
                            var c = b.Hd(b.f(a, "autocenter"));
                            b.Id(a, c)
                        })
                    }
                    f.hd = Eb;
                    n.call(f);
                    f.E = p = b.Mb(p);
                    var a = b.rb({eb: 0, xe: 1, dc: 1, Ub: 0, Jb: l, jc: 1, jb: d, gc: d, Nb: 1, ec: 3e3, Pb: 1, Cb: 500, cd: e.kd, Gc: 20, zc: 0, ib: 1, sc: 0, fd: 1, Xb: 1, Bc: 1}, fc);
                    a.jb = a.jb && b.je();
                    if (a.Xc != k)
                        a.ec = a.Xc;
                    if (a.ld != k)
                        a.sc = a.ld;
                    var eb = a.Xb & 3, tc = (a.Xb & 4) / -4 || 1, kb = a.Ne, I = b.rb({bb: q, jb: a.jb}, a.Me);
                    I.Hb = I.Hb || I.Le;
                    var Fb = a.Ke, Z = a.Je, db = a.Ie, Q = !a.fd, y, v = b.q(p, "slides", Q), fb = b.q(p, "loading", Q) || b.cb(g), Nb = b.q(p, "navigator", Q), dc = b.q(p, "arrowleft", Q), ac = b.q(p, "arrowright", Q), Lb = b.q(p, "thumbnavigator", Q), oc = b.m(v), mc = b.n(v), V, T = [], uc = b.qb(v);
                    b.e(uc, function(a) {
                        if (a.tagName == "DIV" && !b.f(a, "u"))
                            T.push(a);
                        else
                            b.fc() && b.u(a, (b.u(a) || 0) + 1)
                    });
                    var s = -1, wb, sb, r = T.length, K = a.oc || oc, J = a.yd || mc, Wb = a.zc, zb = K + Wb, Ab = J + Wb, bc = eb & 1 ? zb : Ab, u = c.min(a.ib, r), jb, x, O, yb, S = [], Qb, Sb, Ob, cc, Cc, N, E = a.Pb, lc = a.ec, Vb = a.Cb, qb, tb, ib, Rb = u < r, D = Rb ? a.jc : 0, X, P, F = 1, M, B, R, ub = 0, vb = 0, H, gb, hb, Cb, w, U, z, Tb = new pc, Y, Mb = [];
                    if (r) {
                        if (a.jb)
                            Kb = function(a, c, d) {
                                b.sb(a, {P: c, Q: d})
                            };
                        N = a.Jb;
                        f.Bb = fc;
                        ic();
                        b.xb(p, "jssor-slider", d);
                        b.u(v, b.u(v) || 0);
                        b.v(v, "absolute");
                        jb = b.gb(v, d);
                        b.Wb(jb, v);
                        if (kb) {
                            cc = kb.Fe;
                            qb = kb.bb;
                            tb = u == 1 && r > 1 && qb && (!b.hc() || b.lc() >= 8)
                        }
                        ib = tb || u >= r || !(D & 1) ? 0 : a.sc;
                        X = (u > 1 || ib ? eb : -1) & a.Bc;
                        var Gb = v, C = [], A, L, Db = b.ee(), mb = Db.de, G, pb, Ib, rb;
                        Db.Qc && b.S(Gb, Db.Qc, ([j, "pan-y", "pan-x", "none"])[X] || "");
                        U = new zc;
                        if (tb)
                            A = new qb(Tb, K, J, kb, mb);
                        b.z(jb, U.Zb);
                        b.Ab(v, "hidden");
                        L = Xb();
                        b.S(L, "backgroundColor", "#000");
                        b.Gb(L, 0);
                        b.Wb(L, Gb.firstChild, Gb);
                        for (var cb = 0; cb < T.length; cb++) {
                            var wc = T[cb], yc = new xc(wc, cb);
                            C.push(yc)
                        }
                        b.G(fb);
                        Cb = new Ac;
                        z = new nc(Cb, U);
                        if (X) {
                            b.c(v, "mousedown", Yb);
                            b.c(v, "touchstart", rc);
                            b.c(v, "dragstart", Hb);
                            b.c(v, "selectstart", Hb);
                            b.c(g, "mouseup", ab);
                            b.c(g, "touchend", ab);
                            b.c(g, "touchcancel", ab);
                            b.c(h, "blur", ab)
                        }
                        E &= mb ? 10 : 5;
                        if (Nb && Fb) {
                            Qb = new Fb.bb(Nb, Fb, W(), lb());
                            S.push(Qb)
                        }
                        if (Z && dc && ac) {
                            Z.jc = D;
                            Z.ib = u;
                            Sb = new Z.bb(dc, ac, Z, W(), lb());
                            S.push(Sb)
                        }
                        if (Lb && db) {
                            db.Ub = a.Ub;
                            Ob = new db.bb(Lb, db);
                            S.push(Ob)
                        }
                        b.e(S, function(a) {
                            a.Lb(r, C, fb);
                            a.Y(o.xd, kc)
                        });
                        b.S(p, "visibility", "visible");
                        Eb(W());
                        b.c(v, "click", jc, d);
                        b.c(p, "mouseout", b.uc(hc, p));
                        b.c(p, "mouseover", b.uc(Ec, p));
                        xb();
                        a.dc && b.c(g, "keydown", function(b) {
                            if (b.keyCode == 37)
                                ob(-a.dc);
                            else
                                b.keyCode == 39 && ob(a.dc)
                        });
                        var nb = a.Ub;
                        if (!(D & 1))
                            nb = c.max(0, c.min(nb, r - u));
                        z.lb(nb, nb, 0)
                    }
                };
                i.Ce = 21;
                i.se = 22;
                i.re = 23;
                i.Zd = 24;
                i.le = 25;
                i.Ee = 26;
                i.Pd = 27;
                i.te = 28;
                i.ae = 202;
                i.qe = 203;
                i.we = 206;
                i.ve = 207;
                i.ue = 208;
                i.Nc = 209;
                var o = {xd: 1};
                function q(e, d, c) {
                    var a = this;
                    m.call(a, 0, c);
                    a.Yc = b.Rc;
                    a.Jc = 0;
                    a.Ic = c
                }
                jssor_1_slider_init = function() {
                    var g = {Jb: d, Xc: 0, Nb: 4, Cb: 1600, cd: f.Md, Pb: 4, oc: 220, ib: 7}, e = new i("jssor_1", g);
                    function j() {
                        var d = b.pe(e.E, "slides");
                        if (d) {
                            var c = d[1];
                            if (c) {
                                var a = b.q(c, "ad");
                                if (!a) {
                                    a = b.cb();
                                    b.zb(a,
                                            "position:absolute;top:0px;right:0px;width:0px;height:0px;background-color:rgba(255,255,140,0.5);font-size: 12px;line-height: 20px;text-align:center;");
                                    b.Ld(a, "");
                                    b.z(c, a)
                                }
                            }
                        }
                    }
                    j();
                    function a() {
                        var b = e.E.parentNode.clientWidth;
                        if (b) {
                            b = c.min(b, 1200);
                            e.hd(b)
                        } else
                            h.setTimeout(a, 30)
                    }
                    a();
                    b.c(h, "load", a);
                    b.c(h, "resize", a);
                    b.c(h, "orientationchange", a)
                }
            })(window, document, Math, null, true, false)
