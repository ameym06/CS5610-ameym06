﻿(function () { var T = window, i = document, D, O = null, U = true, m = false, G = "undefined"; function ad() { if (r) { return r } D = i.body; if (D && D.lastChild) { r = U; return r } else { return setTimeout(ad, 0) } } ad(); if (!T.cooliris) { T.cooliris = {} } var J = T.cooliris, n, l, w = 0, t = {}, B = O, W = O, j, x, q, k, S, v, N, p, b = "#000000", R = "100%", aa = m, ac = [], r = m, Y, d, F = "http://apps.cooliris.com/embed/", y = "http://i.cooliris.com/embed/", s = "http://e.cooliris.com/embed/v/900/cooliris.swf", P; if (i.location.protocol == "https:") { y = y.replace("http:", "https:"); s = s.replace("http:", "https:") } function e(f) { return f != O && typeof (f) != G } function z() { if (!W) { var ag = O, f = "application/x-cooliris"; if (typeof (PicLensContext) != G) { ag = new PicLensContext() } else { if (T.ActiveXObject) { try { ag = new ActiveXObject("PicLens.Context") } catch (af) { ag = O } } else { if (navigator.mimeTypes[f]) { ag = i.createElement("object"); ag.style.width = 0; ag.style.height = 0; ag.type = f; i.documentElement.appendChild(ag) } } } W = ag } return e(W) } J.hasClient = z; J.launchClient = function (af, f) { if (z()) { if (typeof (af) == G && typeof (cooliris.embed != G)) { af = cooliris.embed.getFeedURLForClient() } setTimeout(function () { if (e(f)) { W.launch(af, "uid", f) } else { W.launch(af, "", "") } }, 5); return U } return m }; function c(f) { return i.getElementById(f) } function E(f) { if (!e(f)) { return O } else { if (typeof (f) == "string") { return f } else { var af = "f_" + w++; t[af] = f; return af } } } function I(f) { var ah = i.getElementsByTagName(f); var af = ah.length; try { while (af--) { if (ah[af].GID && ah[af].GID() == "CISWF") { ac.push(ah[af]) } } } catch (ag) { } } function H() { if (!aa) { I("object"); I("embed"); aa = U } if (P && P.IA && P.IA()) { return P } var af, f; for (f = 0; f < ac.length; f++) { af = ac[f]; if (af.IA && af.IA()) { P = af; break } } return P } function Z() { if (B !== O) { return } if (H()) { n = H().offsetLeft; l = H().offsetTop } if (H()) { B = H().parentNode } if (B && B.tagName == "OBJECT") { B = B.parentNode } } function K(af, f) { var ag = i.createElement("div"); if (af) { if (f) { af.innerHTML = "" } af.appendChild(ag) } return ag } function C(f, af) { for (var ag in f) { if (f.hasOwnProperty(ag)) { af[ag] = f[ag] + "px" } } } function h(ag, af) { var f = ag.style; f.position = "fixed"; f.backgroundColor = b; f.zIndex = 10000; f.opacity = "0.33"; f.filter = "alpha(opacity=33)"; C(af, f) } function V(f) { h(j, { top: 0, left: 0, right: 0, height: f }); h(x, { bottom: 0, left: 0, right: 0, height: f }); h(q, { top: f, left: 0, bottom: f, width: f }); h(k, { top: f, bottom: f, right: 0, width: f }) } function ae() { D.removeChild(j); D.removeChild(x); D.removeChild(q); D.removeChild(k); D.removeChild(N); D.removeChild(S); j = x = q = k = N = S = O } function g() { j.style.display = x.style.display = q.style.display = k.style.display = p.display = v.display = "none"; setTimeout(ae, 100) } function o() { var af = 40; N = K(D); p = N.style; p.backgroundColor = b; p.position = "fixed"; p.border = "8px solid #FBFBFC"; p.zIndex = 10001; p.left = p.right = p.top = p.bottom = af + "px"; j = K(D); x = K(D); q = K(D); k = K(D); V(af); S = K(D); v = S.style; var ag = K(N), f = ag.style; v.background = "url(" + F + "images/close.png)"; v.position = "fixed"; v.width = v.height = "30px"; v.zIndex = 10002; v.right = v.top = (af - 15) + "px"; j.onclick = x.onclick = q.onclick = k.onclick = S.onclick = g; ag.id = "ci_swf_" + Math.floor(Math.random() * 10000); f.backgroundColor = b; f.width = R; f.height = R; return ag.id } function X(f) { if (!H()) { return U } var ag = 0; if (!f) { f = T.event } if (f.wheelDelta) { ag = f.wheelDelta / 120 } else { if (f.detail) { var af = f.detail; if (Math.abs(af) < 3) { ag = -af } else { ag = -af / 3 } } } if (ag) { if (H() && H().HMW(ag)) { if (f.preventDefault) { f.preventDefault() } f.returnValue = m; return m } } return U } function A(ak, ag, f, af) { var aj = { allowscriptaccess: "always", allowfullscreen: "true", wmode: "opaque" }; var ah = O; for (var ai in af) { if (ai.toLowerCase() == "backgroundcolor") { ah = af[ai]; if (ah.indexOf("0x") != -1) { ah = ah.replace("0x", "#") } aj.bgColor = ah } } if (ah === O) { aj.bgColor = "#121212" } swfobject.embedSWF(s, ak, ag, f, "9.0.0", F + "modules/swfobject/expressInstall.swf", af, aj, O, u) } function u(f) { if (f.success && f.ref.style) { f.ref.style.outline = "none" } } function a(f) { return (new Function("return " + f + ";"))() } function L(ag) { var af = 0, f = 0; if (ag.offsetParent) { do { af += ag.offsetLeft; f += ag.offsetTop } while (ag = ag.offsetParent) } return [af, f] } function M() { return H().GS() } J.embed = J.embed || {}; var Q = J.embed; Q.APIVersion = "1.0"; Q.addCustomButton = function (af, f) { if (H()) { H().ACB(af, f) } }; Q.callFunction = function (f, ag, af) { if (t[f] != O) { t[f](ag, af) } }; Q.createWall = function (ah) { var ag, am, af = "", ak, ai; if (ah.type == "iframe") { ak = c(ah.id); ag = ah.width || "700"; am = ah.height || "430"; for (var al in ah) { if (ah.hasOwnProperty(al)) { af += al + "=" + encodeURIComponent(ah[al]) + "&" } } ai = i.createElement("iframe"); ai.src = y + "?" + af + "pageURL=" + encodeURIComponent(T.top.location.href); ai.frameBorder = 0; ai.style.border = "none"; ai.style.width = ag + "px"; ai.style.height = am + "px"; ak.appendChild(ai) } else { if (!ah.hasOwnProperty("id")) { ah.id = o(); ah.lightbox = U; ag = R; am = R } else { ag = ah.width || "700"; am = ah.height || "430"; var aj = c(ah.id); if (aj.style.width == "") { if (ag.indexOf("%") == -1) { ag += "px" } aj.style.width = ag } if (aj.style.height == "") { if (am.indexOf("%") == -1) { am += "px" } aj.style.height = am } var f = K(aj, U); f.id = ah.id + "_swf"; ah.id = f.id } A(ah.id, ag, am, ah) } }; Q.deselectItem = function () { if (H()) { H().DI() } }; Q.getBounds = function () { var ag = H(), ah = L(ag), af = M(); return [ah[0], ah[1], af[0], af[1]] }; Q.getEmbedCode = function () { if (H()) { return H().GEC() } return "" }; Q.getFeedURL = function () { if (H()) { return H().GFU() } return "" }; Q.getFeedURLForClient = function () { if (H()) { return H().GFUFC() } return "" }; Q.getFlashVars = function () { if (H()) { return H().GFV() } return "" }; Q.getItems = function (aj, ah, al) { if (al) { if (H()) { H().GI(aj, ah, E(al)) } } else { var ai; if (H()) { ai = H().GI(aj, ah, "") } if (ai === O) { return ai } if (typeof (ah) == G || ah.toLowerCase() == "json") { var ak; if (typeof (ai) == "string") { return a(ai) } else { if (typeof (ai.length) == G) { ak = {}; for (var af in ai) { if (ai.hasOwnProperty(af)) { ak[af] = a(ai[af]) } } return ak } else { var f = ai.length; ak = []; for (var ag = 0; ag < f; ag++) { ak.push(a(ai[ag])) } return ak } } } else { return ai } } }; Q.getPartnerLogo = function () { if (H()) { return H().GPL() } return "" }; Q.getSelectedItem = function () { if (H()) { return a(H().GSI()) } return "" }; Q.getSize = M; Q.getSWF = function () { return H() }; Q.initMouseHandlers = function () { if (T.addEventListener) { T.addEventListener("DOMMouseScroll", X, m) } else { if (i.attachEvent) { i.attachEvent("onmousewheel", X) } } i.onmousewheel = X }; Q.mouseEvent = function (f) { if (H()) { H().M(f) } }; Q.init = function () { aa = m; ac = []; if (B != O) { Q.overlay.hide(); B = O } }; Q.selectItemNearby = function (f) { if (H()) { H().SIN(f) } }; Q.selectItemByIndex = function (f) { if (H()) { H().SIBI(f) } }; Q.selectItemByGUID = function (f) { if (H()) { H().SIBG(f) } }; Q.setCallbacks = function (f) { if (H()) { H().SC(E(f.firstmousedown), E(f.mousedown), E(f.select), E(f.deselect), E(f.debug), E(f.linkout), E(f.stats), E(f.feedload), E(f.feederror)) } }; Q.setFeedContents = function (f) { if (H()) { H().SFC(f) } }; Q.setFeedURL = function (f) { if (H()) { H().SFU(f) } }; Q.setTitle = function (af, f) { if (H()) { H().ST(af, f) } }; Q.setMessage = function (ag, f, ah, af) { if (!e(ag)) { ag = "" } if (!e(f)) { f = 18 } if (!e(ah)) { ah = 50 } if (!e(af)) { af = 50 } if (H()) { H().SM(ag, f, ah, af) } }; Q.showSharing = function (f) { if (H()) { H().SSH(f) } }; Q.showSpinner = function (f) { if (H()) { H().SS(f) } }; Q.useCustomCursor = function (f) { if (H()) { H().UCC(f) } }; Q.facebook = function () { return { callMethod: function (ah, f, ag, af) { if (H()) { H().fbCM(ah, f, E(ag), af) } }, fqlQuery: function (f, ag, af) { if (H()) { H().fbFQ(f, E(ag), af) } }, getFriendIDs: function (af, f) { if (H()) { H().fbGFI(E(af), f) } }, getFriendsByName: function (af, ah, f, ag) { if (H()) { H().fbGFBN(af, E(ah), f, ag) } } } }(); Q.overlay = function () { return { init: function (ag, af, ah, f) { Z(); Y = i.createElement(ag); d = Y.style; d.position = "absolute"; d.textAlign = "center"; d.display = "none"; if (ah !== "") { d.background = ah } if (ag == "iframe") { Y.frameBorder = 0; Y.scrolling = f; Y.src = af } else { d.overflow = "hidden"; Y.innerHTML = af } }, show: function (f, al, af, ai, aj, ak, ag) { var ah = 1; if (H()) { ah = parseInt(H().width, 10) / ak } if (isNaN(ah)) { ah = 1 } d.border = aj + "px solid #7C7C7C"; d.left = (n + f) * ah + "px"; d.top = (l + al) * ah + "px"; d.width = (af * ah) + "px"; d.height = (ai * ah) + "px"; d.display = ""; if (Y.parentNode != B) { B.appendChild(Y) } }, hide: function () { d.display = "none"; var f = Y.parentNode; if (e(f)) { f.removeChild(Y) } } } }(); var ab = cooliris.embed.onJSLoaded; if (ab) { ab("wall") } })();