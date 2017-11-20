(function e(b,g,d){function c(k,i){if(!g[k]){if(!b[k]){var h=typeof require=="function"&&require;
if(!i&&h){return h(k,!0)}if(a){return a(k,!0)}throw new Error("Cannot find module '"+k+"'")
}var j=g[k]={exports:{}};b[k][0].call(j.exports,function(l){var m=b[k][1][l];return c(m?m:l)
},j,j.exports,e,b,g,d)}return g[k].exports}var a=typeof require=="function"&&require;
for(var f=0;f<d.length;f++){c(d[f])}return c})({1:[function(b,c,a){c.exports=function d(i,g,h,f){if(i.addEventListener){i.addEventListener(g,h,!!f)
}else{i.attachEvent("on"+g,h)}return i}},{}],2:[function(b,c,a){c.exports={EventEmitterMicro:b("./ac-event-emitter-micro/EventEmitterMicro")}
},{"./ac-event-emitter-micro/EventEmitterMicro":3}],3:[function(b,c,a){function f(){this._events={}
}var d=f.prototype;d.on=function(g,h){this._events[g]=this._events[g]||[];this._events[g].unshift(h)
};d.once=function(g,j){var i=this;function h(k){i.off(g,h);if(k!==undefined){j(k)
}else{j()}}this.on(g,h)};d.off=function(g,i){if(!this.has(g)){return}var h=this._events[g].indexOf(i);
if(h===-1){return}this._events[g].splice(h,1)};d.trigger=function(g,j){if(!this.has(g)){return
}for(var h=this._events[g].length-1;h>=0;h--){if(j!==undefined){this._events[g][h](j)
}else{this._events[g][h]()}}};d.has=function(g){if(g in this._events===false||this._events[g].length===0){return false
}return true};d.destroy=function(){for(var g in this._events){this._events[g]=null
}this._events=null};c.exports=f},{}],4:[function(b,c,a){c.exports={getWindow:function(){return window
},getDocument:function(){return document},getNavigator:function(){return navigator
}}},{}],5:[function(c,d,b){c("@marcom/ac-polyfills/matchMedia");var g=c("./helpers/globals");
var f=c("@marcom/ac-function/once");function a(){var i=g.getWindow();var h=i.matchMedia("only all");
return !!(h&&h.matches)}d.exports=f(a);d.exports.original=a},{"./helpers/globals":4,"@marcom/ac-function/once":6,"@marcom/ac-polyfills/matchMedia":10}],6:[function(b,c,a){c.exports=function d(g){var f;
return function(){if(typeof f==="undefined"){f=g.apply(this,arguments)}return f
}}},{}],7:[function(b,c,a){if(!Function.prototype.bind){Function.prototype.bind=function(d){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
}var i=Array.prototype.slice.call(arguments,1);var h=this;var f=function(){};var g=function(){return h.apply((this instanceof f&&d)?this:d,i.concat(Array.prototype.slice.call(arguments)))
};f.prototype=this.prototype;g.prototype=new f();return g}}},{}],8:[function(b,c,a){if(!Object.create){var d=function(){};
Object.create=function(f){if(arguments.length>1){throw new Error("Second argument not supported")
}if(f===null||typeof f!=="object"){throw new TypeError("Object prototype may only be an Object.")
}d.prototype=f;return new d()}}},{}],9:[function(b,c,a){if(!Object.keys){Object.keys=function d(g){var f=[];
var h;if((!g)||(typeof g.hasOwnProperty!=="function")){throw"Object.keys called on non-object."
}for(h in g){if(g.hasOwnProperty(h)){f.push(h)}}return f}}},{}],10:[function(b,c,a){window.matchMedia=window.matchMedia||(function(i,j){var g,d=i.documentElement,f=d.firstElementChild||d.firstChild,h=i.createElement("body"),k=i.createElement("div");
k.id="mq-test-1";k.style.cssText="position:absolute;top:-100em";h.style.background="none";
h.appendChild(k);return function(l){k.innerHTML='&shy;<style media="'+l+'"> #mq-test-1 { width:42px; }</style>';
d.insertBefore(h,f);g=k.offsetWidth===42;d.removeChild(h);return{matches:g,media:l}
}}(document))},{}],11:[function(b,a,f){b("@marcom/ac-polyfills/Function/prototype.bind");
b("@marcom/ac-polyfills/Object/keys");b("@marcom/ac-polyfills/Object/create");var l=b("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var i=b("@marcom/ac-dom-events/utils/addEventListener");var h=b("@marcom/ac-feature/mediaQueriesAvailable");
var c="viewport-emitter";var j="::before";var d="only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)";
function k(m){l.call(this);this._initializeElement(m);if(h()){this._updateViewport=this._updateViewport.bind(this);
i(window,"resize",this._updateViewport);i(window,"orientationchange",this._updateViewport);
this._retinaQuery=window.matchMedia(d);this._updateRetina();if(this._retinaQuery.addListener){this._updateRetina=this._updateRetina.bind(this);
this._retinaQuery.addListener(this._updateRetina)}}this._updateViewport()}var g=k.prototype=Object.create(l.prototype);
g.viewport=false;g.retina=false;g._initializeElement=function(n){var m;n=n||c;m=document.getElementById(n);
if(!m){m=document.createElement("div");m.id=n;m=document.body.appendChild(m)}this._el=m
};g._getElementContent=function(){var m;if("currentStyle" in this._el){m=this._el.currentStyle["x-content"]
}else{this._invalidateStyles();m=window.getComputedStyle(this._el,j).content}m=m.replace(/["']/g,"");
if(m){return m}return false};g._updateViewport=function(){var m=this.viewport;var n;
var o;this.viewport=this._getElementContent();if(this.viewport){this.viewport=this.viewport.split(":").pop()
}if(m&&this.viewport!==m){o={from:m,to:this.viewport};this.trigger("change",o);
this.trigger("from:"+m,o);this.trigger("to:"+this.viewport,o)}};g._updateRetina=function(m){var n=this.retina;
this.retina=this._retinaQuery.matches;if(n!==this.retina){this.trigger("retinachange",{from:n,to:this.retina})
}};g._invalidateStyles=function(){document.documentElement.clientWidth;this._el.innerHTML=(this._el.innerHTML===" ")?" ":" ";
document.documentElement.clientWidth};a.exports=k},{"@marcom/ac-dom-events/utils/addEventListener":1,"@marcom/ac-event-emitter-micro":2,"@marcom/ac-feature/mediaQueriesAvailable":5,"@marcom/ac-polyfills/Function/prototype.bind":7,"@marcom/ac-polyfills/Object/create":8,"@marcom/ac-polyfills/Object/keys":9}],12:[function(c,d,b){var a=c("./ViewportEmitter");
d.exports=new a()},{"./ViewportEmitter":11}],13:[function(b,f,a){var d=b("./ac-ajax/Ajax");
var c=b("./ac-ajax/Request");f.exports=new d();f.exports.Ajax=d;f.exports.Request=c
},{"./ac-ajax/Ajax":14,"./ac-ajax/Request":15}],14:[function(c,g,b){var f=c("./Request");
var h=c("./XDomain-request");var a=c("./URLParser");var d=function(){};d._Request=f;
d.prototype={_defaults:{method:"get",timeout:5000},_extend:function(){for(var k=1;
k<arguments.length;k++){for(var j in arguments[k]){if(arguments[k].hasOwnProperty(j)){arguments[0][j]=arguments[k][j]
}}}return arguments[0]},_getOptions:function(i,j){return this._extend({},this._defaults,j,i)
},_isCrossDomainRequest:function(l){var k=new a();var j=k.parse(window.location.href).origin;
var i=k.parse(l).origin;k.destroy();return(i!==j)},create:function(i){return new f(i)
},cors:function(j){var i=(window.XDomainRequest&&document.documentMode<10)?h:f;
return new i(j)},get:function(j){var i;j=this._getOptions({method:"get"},j);if(this._isCrossDomainRequest(j.url)){i=this.cors(j)
}else{i=this.create(j)}return i.send()},getJSON:function(i){return this.get(i).then(function(j){return JSON.parse(j.responseText)
})},head:function(i){i=this._getOptions({method:"head"},i);return this.create(i).send()
},isCrossDomainRequest:function(i){return this._isCrossDomainRequest(i)},post:function(i){i=this._getOptions({method:"post"},i);
return this.create(i).send()}};g.exports=d},{"./Request":15,"./URLParser":16,"./XDomain-request":17}],15:[function(b,d,a){var c=function(f){this._initialize(f)
};c.create=function(){var f=function(){};f.prototype=c.prototype;return new f()
};c.prototype={_addReadyStateChangeHandler:function(){this.xhr.onreadystatechange=function(f){if(this.xhr.readyState===4){clearTimeout(this._timeout);
if(this.xhr.status>=200&&this.xhr.status<300){this.resolve(this.xhr)}else{this.reject(this.xhr)
}}}.bind(this)},_getPromise:function(){this.promise=new Promise(function(g,f){this.resolve=g;
this.reject=f}.bind(this))},_getTransport:function(){return new XMLHttpRequest()
},_initialize:function(h){var g=this._validateConfiguration(h);if(g){throw g}this._configuration=h;
var f=this._configuration.method.toUpperCase();this.xhr=this._getTransport();this._getPromise();
this.xhr.open(f,this._configuration.url);this._setRequestHeaders(h.headers);this._addReadyStateChangeHandler()
},_sendXHR:function(){if(this.xhr){if(this._configuration&&this._configuration.data){this.xhr.send(this._configuration.data)
}else{this.xhr.send()}}},_setRequestHeaders:function(f){if(f){f.forEach(function(g){this.xhr.setRequestHeader(g.name,g.value)
},this)}},_setTimeout:function(f){if(!f){if(this._configuration&&this._configuration.timeout){f=this._configuration.timeout
}else{clearTimeout(this._timeout);this._timeout=null}}if(this._timeout!==null){clearTimeout(this._timeout)
}if(f>0){this._timeout=setTimeout(function(){this.xhr.abort();this.reject()}.bind(this),f)
}},_timeout:null,_validateConfiguration:function(h){if(!h){return"Must provide a configuration object"
}var g=[];var f=h.headers;if(!h.url){g.push("Must provide a url")}if(!h.method){g.push("Must provide a method")
}if(f){if(!Array.isArray(f)){return"Must provide an array of headers"}this._validateHeaders(f,g)
}return g.join(", ")},_validateHeaders:function(h,j){for(var g=0,f=h.length;g<f;
g++){if(!h[g].hasOwnProperty("name")||!h[g].hasOwnProperty("value")){j.push("Must provide a name and value key for all headers");
break}}},promise:null,reject:null,resolve:null,send:function(){this._setTimeout();
this._sendXHR();return this.promise},xhr:null};d.exports=c},{}],16:[function(c,d,b){var a=function(){this.parser=null
};var f=a.prototype;f.parse=function(k){var i;var l;var h;var g;var j;if(typeof k!=="string"){throw new TypeError(k+" must be a string")
}if(!this.parser){this.parser=document.createElement("a")}this._qualifyPath(k);
h=this.parser.hostname;l=this.parser.protocol;g=this._normalizePort(this.parser);
i=this.parser.origin||this._constructOriginString(this.parser,g);j=this.parser.search;
return{originalPath:k,qualifiedPath:this.parser.href,protocol:l,hostname:h,origin:i,port:g,search:j}
};f.destroy=function(){this.parser=null};f._constructOriginString=function(i,g){var h=g?":"+g:"";
return i.protocol+"//"+i.hostname+h};f._normalizePort=function(g){return(g.port==="80"||g.port==="443"||g.port==="0")?"":g.port
};f._qualifyPath=function(g){this.parser.href=g;this.parser.href=this.parser.href
};d.exports=a},{}],17:[function(b,d,a){var c=b("./Request");var f=function(g){c.apply(this,arguments)
};f.prototype=c.create();f.prototype._getTransport=function(){return new XDomainRequest()
};f.prototype._addReadyStateChangeHandler=function(){this.xhr.ontimeout=function(){this.reject(this.xhr)
}.bind(this);this.xhr.onerror=function(){this.reject(this.xhr)}.bind(this);this.xhr.onload=function(){this.resolve(this.xhr)
}.bind(this)};f.prototype._setTimeout=function(g){if(!g){if(this._configuration&&this._configuration.timeout){g=this._configuration.timeout
}}if(g>0){this.xhr.timeout=g}};f.prototype._sendXHR=function(){setTimeout(function(){c.prototype._sendXHR.call(this)
}.bind(this),0)};d.exports=f},{"./Request":15}],18:[function(c,g,b){var f=c("./Request");
var h=c("./XDomain-request");var a=c("./URLParser");var d=function(){};d._Request=f;
d.prototype={_defaults:{method:"get",timeout:5000},_extend:function(){for(var k=1;
k<arguments.length;k++){for(var j in arguments[k]){if(arguments[k].hasOwnProperty(j)){arguments[0][j]=arguments[k][j]
}}}return arguments[0]},_getOptions:function(i,j){return this._extend({},this._defaults,j,i)
},create:function(i){return new f(i)},cors:function(j){var i=(window.XDomainRequest&&document.documentMode<10)?h:f;
return new i(j)},_isCrossDomainRequest:function(l){var k=new a();var j=k.parse(window.location.href).origin;
var i=k.parse(l).origin;k.destroy();return(i!==j)},get:function(j){var i;j=this._getOptions({method:"get"},j);
if(this._isCrossDomainRequest(j.url)){i=this.cors(j)}else{i=this.create(j)}return i.send()
},getJSON:function(i){return this.get(i).then(function(j){return JSON.parse(j.responseText)
})},head:function(i){i=this._getOptions({method:"head"},i);return this.create(i).send()
},post:function(i){i=this._getOptions({method:"post"},i);return this.create(i).send()
}};g.exports=d},{"./Request":19,"./URLParser":20,"./XDomain-request":21}],19:[function(b,c,a){c.exports=b(15)
},{}],20:[function(b,c,a){c.exports=b(16)},{}],21:[function(b,d,a){var c=b("./Request");
var f=function(g){c.apply(this,arguments)};f.prototype=c.create();f.prototype._getTransport=function(){return new XDomainRequest()
};f.prototype._addReadyStateChangeHandler=function(){this.xhr.ontimeout=function(){this.reject(this.xhr)
}.bind(this);this.xhr.onerror=function(){this.reject(this.xhr)}.bind(this);this.xhr.onload=function(){this.resolve(this.xhr)
}.bind(this)};f.prototype._setTimeout=function(g){if(!g){if(this._configuration&&this._configuration.timeout){g=this._configuration.timeout
}}if(g>0){this.xhr.timeout=g}};d.exports=f},{"./Request":19}],22:[function(b,c,a){arguments[4][13][0].apply(a,arguments)
},{"./ac-ajax/Ajax":18,"./ac-ajax/Request":19}],23:[function(c,f,b){var d={cssPropertyAvailable:c("./ac-feature/cssPropertyAvailable"),localStorageAvailable:c("./ac-feature/localStorageAvailable")};
var a=Object.prototype.hasOwnProperty;d.threeDTransformsAvailable=function(){if(typeof this._threeDTransformsAvailable!=="undefined"){return this._threeDTransformsAvailable
}var i,g;try{this._threeDTransformsAvailable=false;if(a.call(window,"styleMedia")){this._threeDTransformsAvailable=window.styleMedia.matchMedium("(-webkit-transform-3d)")
}else{if(a.call(window,"media")){this._threeDTransformsAvailable=window.media.matchMedium("(-webkit-transform-3d)")
}}if(!this._threeDTransformsAvailable){if(!(g=document.getElementById("supportsThreeDStyle"))){g=document.createElement("style");
g.id="supportsThreeDStyle";g.textContent="@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }";
document.querySelector("head").appendChild(g)}if(!(i=document.querySelector("#supportsThreeD"))){i=document.createElement("div");
i.id="supportsThreeD";document.body.appendChild(i)}this._threeDTransformsAvailable=(i.offsetHeight===3)||g.style.MozTransform!==undefined||g.style.WebkitTransform!==undefined
}return this._threeDTransformsAvailable}catch(h){return false}};d.canvasAvailable=function(){if(typeof this._canvasAvailable!=="undefined"){return this._canvasAvailable
}var g=document.createElement("canvas");this._canvasAvailable=!!(typeof g.getContext==="function"&&g.getContext("2d"));
return this._canvasAvailable};d.sessionStorageAvailable=function(){if(typeof this._sessionStorageAvailable!=="undefined"){return this._sessionStorageAvailable
}try{if(typeof window.sessionStorage!=="undefined"&&typeof window.sessionStorage.setItem==="function"){window.sessionStorage.setItem("ac_browser_detect","test");
this._sessionStorageAvailable=true;window.sessionStorage.removeItem("ac_browser_detect","test")
}else{this._sessionStorageAvailable=false}}catch(g){this._sessionStorageAvailable=false
}return this._sessionStorageAvailable};d.cookiesAvailable=function(){if(typeof this._cookiesAvailable!=="undefined"){return this._cookiesAvailable
}this._cookiesAvailable=(a.call(document,"cookie")&&!!navigator.cookieEnabled)?true:false;
return this._cookiesAvailable};d.__normalizedScreenWidth=function(){if(typeof window.orientation==="undefined"){return window.screen.width
}return window.screen.width<window.screen.height?window.screen.width:window.screen.height
};d.touchAvailable=function(){return !!(("ontouchstart" in window)||window.DocumentTouch&&document instanceof window.DocumentTouch)
};d.isDesktop=function(){if(!this.touchAvailable()&&!window.orientation){return true
}return false};d.isHandheld=function(){return !this.isDesktop()&&!this.isTablet()
};d.isTablet=function(){return !this.isDesktop()&&this.__normalizedScreenWidth()>480
};d.isRetina=function(){var g=["min-device-pixel-ratio:1.5","-webkit-min-device-pixel-ratio:1.5","min-resolution:1.5dppx","min-resolution:144dpi","min--moz-device-pixel-ratio:1.5"];
var h;if(window.devicePixelRatio!==undefined){if(window.devicePixelRatio>=1.5){return true
}}else{for(h=0;h<g.length;h+=1){if(window.matchMedia("("+g[h]+")").matches===true){return true
}}}return false};d.svgAvailable=function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
};f.exports=d},{"./ac-feature/cssPropertyAvailable":24,"./ac-feature/localStorageAvailable":25}],24:[function(c,f,b){var g=null;
var h=null;var a=null;var d=null;f.exports=function(s){if(g===null){g=document.createElement("browserdetect").style
}if(h===null){h=["-webkit-","-moz-","-o-","-ms-","-khtml-",""]}if(a===null){a=["Webkit","Moz","O","ms","Khtml",""]
}if(d===null){d={}}s=s.replace(/([A-Z]+)([A-Z][a-z])/g,"$1\\-$2").replace(/([a-z\d])([A-Z])/g,"$1\\-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/,"").toLowerCase();
switch(s){case"gradient":if(d.gradient!==undefined){return d.gradient}s="background-image:";
var q="gradient(linear,left top,right bottom,from(#9f9),to(white));";var p="linear-gradient(left top,#9f9, white);";
g.cssText=(s+h.join(q+s)+h.join(p+s)).slice(0,-s.length);d.gradient=(g.backgroundImage.indexOf("gradient")!==-1);
return d.gradient;case"inset-box-shadow":if(d["inset-box-shadow"]!==undefined){return d["inset-box-shadow"]
}s="box-shadow:";var r="#fff 0 1px 1px inset;";g.cssText=h.join(s+r);d["inset-box-shadow"]=(g.cssText.indexOf("inset")!==-1);
return d["inset-box-shadow"];default:var o=s.split("-");var k=o.length;var n;var m;
var l;if(o.length>0){s=o[0];for(m=1;m<k;m+=1){s+=o[m].substr(0,1).toUpperCase()+o[m].substr(1)
}}n=s.substr(0,1).toUpperCase()+s.substr(1);if(d[s]!==undefined){return d[s]}for(l=a.length-1;
l>=0;l-=1){if(g[a[l]+s]!==undefined||g[a[l]+n]!==undefined){d[s]=true;return true
}}return false}}},{}],25:[function(d,f,b){var a=null;f.exports=function c(){if(a===null){a=!!(window.localStorage&&window.localStorage.non_existent!==null)
}return a}},{}],26:[function(i,c,x){var s=Object.prototype.toString;var l=Object.prototype.hasOwnProperty;
var b=typeof Array.prototype.indexOf==="function"?function(z,A){return z.indexOf(A)
}:function(z,B){for(var A=0;A<z.length;A++){if(z[A]===B){return A}}return -1};var k=Array.isArray||function(z){return s.call(z)=="[object Array]"
};var v=Object.keys||function(B){var z=[];for(var A in B){if(B.hasOwnProperty(A)){z.push(A)
}}return z};var u=typeof Array.prototype.forEach==="function"?function(z,A){return z.forEach(A)
}:function(z,B){for(var A=0;A<z.length;A++){B(z[A])}};var m=function(z,D,A){if(typeof z.reduce==="function"){return z.reduce(D,A)
}var C=A;for(var B=0;B<z.length;B++){C=D(C,z[B])}return C};var y=/^[0-9]+$/;function d(C,B){if(C[B].length==0){return C[B]={}
}var A={};for(var z in C[B]){if(l.call(C[B],z)){A[z]=C[B][z]}}C[B]=A;return A}function q(D,B,A,E){var z=D.shift();
if(l.call(Object.prototype,A)){return}if(!z){if(k(B[A])){B[A].push(E)}else{if("object"==typeof B[A]){B[A]=E
}else{if("undefined"==typeof B[A]){B[A]=E}else{B[A]=[B[A],E]}}}}else{var C=B[A]=B[A]||[];
if("]"==z){if(k(C)){if(""!=E){C.push(E)}}else{if("object"==typeof C){C[v(C).length]=E
}else{C=B[A]=[B[A],E]}}}else{if(~b(z,"]")){z=z.substr(0,z.length-1);if(!y.test(z)&&k(C)){C=d(B,A)
}q(D,C,z,E)}else{if(!y.test(z)&&k(C)){C=d(B,A)}q(D,C,z,E)}}}}function f(D,C,G){if(~b(C,"]")){var F=C.split("["),z=F.length,E=z-1;
q(F,D,"base",G)}else{if(!y.test(C)&&k(D.base)){var B={};for(var A in D.base){B[A]=D.base[A]
}D.base=B}n(D.base,C,G)}return D}function o(C){if("object"!=typeof C){return C}if(k(C)){var z=[];
for(var B in C){if(l.call(C,B)){z.push(C[B])}}return z}for(var A in C){C[A]=o(C[A])
}return C}function g(A){var z={base:{}};u(v(A),function(B){f(z,B,A[B])});return o(z.base)
}function h(A){var z=m(String(A).split("&"),function(B,F){var G=b(F,"="),E=t(F),C=F.substr(0,E||G),D=F.substr(E||G,F.length),D=D.substr(b(D,"=")+1,D.length);
if(""==C){C=F,D=""}if(""==C){return B}return f(B,p(C),p(D))},{base:{}}).base;return o(z)
}x.parse=function(z){if(null==z||""==z){return{}}return"object"==typeof z?g(z):h(z)
};var r=x.stringify=function(A,z){if(k(A)){return j(A,z)}else{if("[object Object]"==s.call(A)){return w(A,z)
}else{if("string"==typeof A){return a(A,z)}else{return z+"="+encodeURIComponent(String(A))
}}}};function a(A,z){if(!z){throw new TypeError("stringify expects an object")}return z+"="+encodeURIComponent(A)
}function j(z,C){var A=[];if(!C){throw new TypeError("stringify expects an object")
}for(var B=0;B<z.length;B++){A.push(r(z[B],C+"["+B+"]"))}return A.join("&")}function w(F,E){var A=[],D=v(F),C;
for(var B=0,z=D.length;B<z;++B){C=D[B];if(""==C){continue}if(null==F[C]){A.push(encodeURIComponent(C)+"=")
}else{A.push(r(F[C],E?E+"["+encodeURIComponent(C)+"]":encodeURIComponent(C)))}}return A.join("&")
}function n(B,A,C){var z=B[A];if(l.call(Object.prototype,A)){return}if(undefined===z){B[A]=C
}else{if(k(z)){z.push(C)}else{B[A]=[z,C]}}}function t(C){var z=C.length,B,D;for(var A=0;
A<z;++A){D=C[A];if("]"==D){B=false}if("["==D){B=true}if("="==D&&!B){return A}}}function p(A){try{return decodeURIComponent(A.replace(/\+/g," "))
}catch(z){return A}}},{}],27:[function(b,c,a){c.exports={clone:b("./ac-object/clone"),create:b("./ac-object/create"),defaults:b("./ac-object/defaults"),extend:b("./ac-object/extend"),getPrototypeOf:b("./ac-object/getPrototypeOf"),isDate:b("./ac-object/isDate"),isEmpty:b("./ac-object/isEmpty"),isRegExp:b("./ac-object/isRegExp"),toQueryParameters:b("./ac-object/toQueryParameters")}
},{"./ac-object/clone":28,"./ac-object/create":29,"./ac-object/defaults":30,"./ac-object/extend":31,"./ac-object/getPrototypeOf":32,"./ac-object/isDate":33,"./ac-object/isEmpty":34,"./ac-object/isRegExp":35,"./ac-object/toQueryParameters":36}],28:[function(b,c,a){var f=b("./extend");
c.exports=function d(g){return f({},g)}},{"./extend":31}],29:[function(b,d,a){var f=function(){};
d.exports=function c(g){if(arguments.length>1){throw new Error("Second argument not supported")
}if(g===null||typeof g!=="object"){throw new TypeError("Object prototype may only be an Object.")
}if(typeof Object.create==="function"){return Object.create(g)}else{f.prototype=g;
return new f()}}},{}],30:[function(b,c,a){var f=b("./extend");c.exports=function d(h,g){if(typeof h!=="object"){throw new TypeError("defaults: must provide a defaults object")
}g=g||{};if(typeof g!=="object"){throw new TypeError("defaults: options must be a typeof object")
}return f({},h,g)}},{"./extend":31}],31:[function(c,d,b){var a=Object.prototype.hasOwnProperty;
d.exports=function f(){var h;var g;if(arguments.length<2){h=[{},arguments[0]]}else{h=[].slice.call(arguments)
}g=h.shift();h.forEach(function(j){if(j!=null){for(var i in j){if(a.call(j,i)){g[i]=j[i]
}}}});return g}},{}],32:[function(c,d,b){var a=Object.prototype.hasOwnProperty;
d.exports=function f(i){if(Object.getPrototypeOf){return Object.getPrototypeOf(i)
}else{if(typeof i!=="object"){throw new Error("Requested prototype of a value that is not an object.")
}else{if(typeof this.__proto__==="object"){return i.__proto__}else{var g=i.constructor;
var h;if(a.call(i,"constructor")){h=g;if(!(delete i.constructor)){return null}g=i.constructor;
i.constructor=h}return g?g.prototype:null}}}}},{}],33:[function(b,d,a){d.exports=function c(f){return Object.prototype.toString.call(f)==="[object Date]"
}},{}],34:[function(c,d,b){var a=Object.prototype.hasOwnProperty;d.exports=function f(g){var h;
if(typeof g!=="object"){throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object")
}for(h in g){if(a.call(g,h)){return false}}return true}},{}],35:[function(c,d,b){d.exports=function a(f){return window.RegExp?f instanceof RegExp:false
}},{}],36:[function(c,f,b){var a=c("qs");f.exports=function d(g){if(typeof g!=="object"){throw new TypeError("toQueryParameters error: argument is not an object")
}return a.stringify(g)}},{qs:26}],37:[function(b,c,a){b("ac-polyfills");c.exports.Asset=b("./ac-asset-loader/AssetLoader/Asset");
c.exports.Asset.Ajax=b("./ac-asset-loader/AssetLoader/Asset/Ajax");c.exports.Asset.Ajax.JSON=b("./ac-asset-loader/AssetLoader/Asset/Ajax/JSON");
c.exports.Asset.Img=b("./ac-asset-loader/AssetLoader/Asset/Img");c.exports.Asset.Video=b("./ac-asset-loader/AssetLoader/Asset/Video");
c.exports.Asset.Video.Element=b("./ac-asset-loader/AssetLoader/Asset/Video/Element");
c.exports.Asset.Binary=b("./ac-asset-loader/AssetLoader/Asset/Binary");c.exports.Asset.Binary.Chunk=b("./ac-asset-loader/AssetLoader/Asset/Binary/Chunk");
c.exports.AssetLoader=b("./ac-asset-loader/AssetLoader");c.exports.AssetLoader.Queue=b("./ac-asset-loader/AssetLoader/Queue")
},{"./ac-asset-loader/AssetLoader":38,"./ac-asset-loader/AssetLoader/Asset":39,"./ac-asset-loader/AssetLoader/Asset/Ajax":40,"./ac-asset-loader/AssetLoader/Asset/Ajax/JSON":41,"./ac-asset-loader/AssetLoader/Asset/Binary":42,"./ac-asset-loader/AssetLoader/Asset/Binary/Chunk":43,"./ac-asset-loader/AssetLoader/Asset/Img":44,"./ac-asset-loader/AssetLoader/Asset/Video":47,"./ac-asset-loader/AssetLoader/Asset/Video/Element":48,"./ac-asset-loader/AssetLoader/Queue":49,"ac-polyfills":false}],38:[function(b,a,h){var j;
var g=b("ac-object");var o=b("ac-event-emitter").EventEmitter;var n=b("./AssetLoader/Asset/Ajax");
var f=b("./AssetLoader/Asset/Ajax/JSON");var i=b("./AssetLoader/Asset/Img");var m=b("./AssetLoader/Asset/Video");
var l=b("../utils/destroy");var c=b("./AssetLoader/Queue");var d={};function k(r,p){this.options=g.defaults(d,p||{});
var q=this._generateAssets(r);this._queue=new c(q,this.options);this._timeoutDuration=this.options.timeout;
this._timeout=null;this._proxyListeners()}j=k.prototype=new o();j.load=function(){if(this._timeoutDuration){this._timeout=window.setTimeout(this._onTimeout.bind(this),this._timeoutDuration)
}return this._queue.start()};j._clearTimeout=function(){window.clearTimeout(this._timeout);
this._timeout=null};j.pause=function(){this._clearTimeout();return this._queue.pause()
};j.destroy=function(){l(this,true)};j._onTimeout=function(){this._queue.abort();
this._queue.destroy();this.trigger("timeout")};j._generateAssets=function(q){if(this._boundGenerateAsset===undefined){this._boundGenerateAsset=this._generateAsset.bind(this)
}q=[].concat(q);var p=q.map(this._boundGenerateAsset);return p};j._generateAsset=function(q,p){if(k.isValidAsset(q)){q.index=p;
return q}if(typeof q!=="string"||q===""){return null}if(!!q.match(/\.json$/)){return new f(q,p)
}if(!!q.match(/\.(xml|txt)$/)){return new n(q,p)}return new i(q,p)};j._proxyListeners=function(){this._boundOnResolved=this._onResolved.bind(this);
this._boundOnRejected=this._onRejected.bind(this);this._boundOnProgress=this._onProgress.bind(this);
this._queue.on("resolved",this._boundOnResolved);this._queue.on("rejected",this._boundOnRejected);
this._queue.on("progress",this._boundOnProgress)};j._onResolved=function(p){this._clearTimeout();
this.trigger("loaded",p)};j._onRejected=function(p){this.trigger("error",p)};j._onProgress=function(p){this.trigger("progress",p)
};k.isValidAsset=function(p){return !!(p&&(typeof p.load==="function")&&(typeof p.destroy==="function"))
};k.isValidAssetLoader=function(p){return !!(p&&(typeof p.load==="function")&&(typeof p.pause==="function")&&(typeof p.destroy==="function"))
};a.exports=k},{"../utils/destroy":50,"./AssetLoader/Asset/Ajax":40,"./AssetLoader/Asset/Ajax/JSON":41,"./AssetLoader/Asset/Img":44,"./AssetLoader/Asset/Video":47,"./AssetLoader/Queue":49,"ac-event-emitter":false,"ac-object":27}],39:[function(d,g,b){var i;
var c=d("ac-deferred").Deferred;var h=d("ac-event-emitter").EventEmitter;var f=d("../../utils/destroy");
function a(k,j){this.src=k;this.index=j;this.data=null;this._boundOnLoad=this._onLoad.bind(this);
this._boundOnError=this._onError.bind(this)}i=a.prototype=new h();i.load=function(){this._load()
};i.destroy=function(){f(this)};i._load=function(){this.data={src:this.src};window.setTimeout(this._onLoad.bind(this),20)
};i._onLoad=function(){this.trigger("loaded",this)};i._onError=function(){this.trigger("error",this.data)
};g.exports=a},{"../../utils/destroy":50,"ac-event-emitter":false}],40:[function(d,g,b){var i;
var c=d("ac-ajax");var a=d("ac-object");var h=d("../Asset");function f(k,j){h.apply(this,arguments)
}i=f.prototype=a.create(h.prototype);i._load=function(){c.get({url:this.src}).then(this._boundOnLoad,this._boundOnError)
};i._onLoad=function(j){this.data=j.response;h.prototype._onLoad.call(this)};g.exports=f
},{"../Asset":39,"ac-ajax":22,"ac-object":27}],41:[function(c,d,b){var g;var a=c("ac-object");
var f=c("../Ajax");function h(i){f.apply(this,arguments)}g=h.prototype=a.create(f.prototype);
g._onLoad=function(j){try{f.prototype._onLoad.call(this,{response:JSON.parse(j.response)})
}catch(i){this._onError(i)}};d.exports=h},{"../Ajax":40,"ac-object":27}],42:[function(b,a,f){var k=b("ac-ajax");
var d=b("ac-object");var j=b("./Binary/Chunk");var i=b("./../Asset");var c={chunkSize:1024*1024};
function g(m,l){i.apply(this,arguments);this.options=d.defaults(c,l||{});this._totalSize=null;
this._rangeObjects={};this._contentType=null;this._request=null;this._numLoaded=0;
this._numRanges=0}var h=g.prototype=d.create(i.prototype);h.pause=function(){var l;
if(this._request!==null){this._request.xhr.abort()}for(l in this._rangeObjects){if(this._rangeObjects[l].isLoaded()===false){this._rangeObjects[l].pause()
}}};h._load=function(){if(this._boundQueueRangeRequests===undefined){this._boundQueueRangeRequests=this._queueRangeRequests.bind(this)
}if(this._totalSize===null){this._getMetaData().then(this._boundQueueRangeRequests)
}else{this._queueRangeRequests()}};h._getOrCreateRangeObject=function(n){var m=this._rangeObjects[n.toString()];
var l;var o;if(m===undefined){l=(this.options.chunkSize-1);o=n+l;if(o>this._totalSize){l=null
}m=this._rangeObjects[n.toString()]=new j(this.src,{start:n,length:l});this._numRanges+=1
}return m};h._onRangeLoad=function(){this._numLoaded+=1;if(this._numLoaded===this._numRanges){this._afterAllChunksLoaded()
}};h._queueRangeRequests=function(){var p;var o=[];var q;var l;var m;for(var n=0;
n<this._totalSize;n+=this.options.chunkSize){m=this._getOrCreateRangeObject(n);
m.on("loaded",this._onRangeLoad,this);m.load()}};h._afterAllChunksLoaded=function(){var l;
var n=[];for(var m in this._rangeObjects){n.push(this._rangeObjects[m].data)}l=new Blob(n,{type:this._contentType});
this.trigger("loaded",l)};h._afterHeadRequest=function(l){this._totalSize=parseInt(l.getResponseHeader(["Content-Length"]));
this._contentType=l.getResponseHeader(["Content-Type"]);this._request=null};h._getMetaData=function(){if(!this._boundAfterHeadRequest){this._boundAfterHeadRequest=this._afterHeadRequest.bind(this)
}this._request=k.create({method:"HEAD",url:this.src,timeout:2*1000});return this._request.send().then(this._boundAfterHeadRequest,this._boundOnError)
};a.exports=g},{"./../Asset":39,"./Binary/Chunk":43,"ac-ajax":22,"ac-object":27}],43:[function(b,a,f){var g;
var j=b("ac-ajax");var d=b("ac-object");var h=b("../../Asset");var c={start:0,length:null};
function i(l,k){h.apply(this,arguments);this.options=d.defaults(c,k||{});this._request=null;
this.data=null}g=i.prototype=d.create(h.prototype);g.pause=function(){if(this._request!==null){this._request.xhr.abort();
this._request=null}};g.isLoaded=function(){return(this.data!==null)};g._load=function(){this._request=j.create({url:this.src+"?"+this._buildQueryString(),method:"get",timeout:30*1000,headers:[{name:"Range",value:this._buildRangeString()}]});
this._request.xhr.responseType="arraybuffer";this._request.send().then(this._boundOnLoad)
};g._onLoad=function(k){this.data=k.response;this._request=null;h.prototype._onLoad.call(this,this.data)
};g._buildRangeString=function(){var k="bytes="+this.options.start+"-";if(this.options.length!==null){k+=(this.options.start+this.options.length)
}return k};g._buildQueryString=function(){var k=this.options.start.toString();if(this.options.length!==undefined){k+=(this.options.start+this.options.length)
}return k};a.exports=i},{"../../Asset":39,"ac-ajax":22,"ac-object":27}],44:[function(c,d,b){var g;
var a=c("ac-object");var f=c("../Asset");function h(j,i){f.apply(this,arguments)
}g=h.prototype=a.create(f.prototype);g._load=function(){var i=new Image();this.data=i;
this._boundOnLoad=this._onLoad.bind(this);i.onload=this._boundOnLoad;i.onerror=this._boundOnError;
i.src=this.src};d.exports=h},{"../Asset":39,"ac-object":27}],45:[function(d,a,h){var k=d("ac-ajax").Ajax,g=d("ac-object"),j=d("./SplitFile/Chunk"),b=d("../Asset");
var i;var f={splitManifestTimeout:5000,splitChunkTimeout:null};var c=function(m,l){b.apply(this,arguments);
if(m.lastIndexOf("/")!==m.length-1){m=m+"/"}this.options=g.extend(f,l||{});this._manifestPath=m+"manifest.json";
this._ajax=new k();this._request=null;this._chunksLoaded=0;this._chunksLen=null;
this._chunks=[];this._boundOnManifestLoaded=this._onManifestLoaded.bind(this)};
i=c.prototype=g.create(b.prototype);i._load=function(){var l={method:"get",url:this._manifestPath,timeout:this.options.manifestTimeout};
this._request=this._ajax.create(l);this._request.send().then(this._boundOnManifestLoaded)
};i._onManifestLoaded=function(p){this._manifest=JSON.parse(p.responseText);this._chunksLen=this._manifest.files.length;
var n,o=this._manifest.files,m,l=this._chunksLen;for(n=0;n<l;n++){m=this._getOrCreateChunkObject(o[n],n);
m.once("loaded",this._onChunkLoaded,this);m.load()}this._request=null;this._ajax=null
};i._getOrCreateChunkObject=function(n,l){var o=this.options.splitChunkTimeout?{timeout:this.options.splitChunkTimeout}:null;
if(!this._chunks[l]){var q=n.path;if(!q.match(/(^http(s?))/)){q=this.src+"/"+q}else{if(!!this.src.match(/(^http(s?))/)){var p=q.indexOf("/",10);
var m=this.src.indexOf("/",10);q=this.src.substring(0,m)+q.substring(p)}}this._chunks[l]=new j(q,o)
}return this._chunks[l]};i._onChunkLoaded=function(){this._chunksLoaded++;if(this._chunksLoaded===this._chunksLen){var n,l=this._chunks.length,m=[];
for(n=0;n<l;n++){m.push(this._chunks[n].data);this._chunks[n].off()}this.data=new Blob(m,{type:this._manifest.mimeType});
m=this._chunks=null;this.trigger("loaded",this.data)}};i.pause=function(){if(this._request!==null){if(this._request.xhr!==null){this._request.xhr.abort()
}this._request=null}this.data=null;this._chunks=null};a.exports=c},{"../Asset":39,"./SplitFile/Chunk":46,"ac-ajax":22,"ac-object":27}],46:[function(c,a,g){var h;
var j=c("ac-ajax");var f=c("ac-object");var b=c("../../Asset");var d={timeout:30*1000};
function i(l,k){b.apply(this,arguments);this.options=f.extend(d,k||{});this._request=null;
this.data=null}h=i.prototype=f.create(b.prototype);h.pause=function(){if(this._request!==null){this._request.xhr.abort();
this._request=null}};h.isLoaded=function(){return(this.data!==null)};h._load=function(){this._request=j.create({url:this.src,method:"get",timeout:this.options.timeout});
this._request.xhr.responseType="arraybuffer";this._request.send().then(this._boundOnLoad)
};h._onLoad=function(k){this.data=k.response;this._request=null;b.prototype._onLoad.call(this,this.data)
};a.exports=i},{"../../Asset":39,"ac-ajax":22,"ac-object":27}],47:[function(c,a,h){var k;
var g=c("ac-feature");var f=c("ac-object");var i=c("./Binary");var l=c("../Asset");
var j=c("./Video/Element");var b=c("./SplitFile");var d={chunkSize:1024*1024,forceElementLoading:false,split:false};
function m(o,n){l.apply(this,arguments);this.options=f.defaults(d,n||{});this._binary=this.options.binary||this._createAssetType()
}k=m.prototype=f.create(l.prototype);k._canUseBlob=function(){return(window.Blob!==undefined&&window.URL!==undefined&&typeof window.URL.createObjectURL==="function"&&g.isDesktop()===true)
};k._createAssetType=function(){if(this._canUseBlob()&&this.options.forceElementLoading!==true){if(this.options.split){return new b(this.src,this.options)
}return new i(this.src,this.options)}return new j(this.src,this.options)};k._load=function(){this._binary.on("loaded",this._boundOnLoad);
this._binary.on("error",this._boundOnError);this._binary.load()};k._onLoad=function(o){var n=o;
if(o instanceof window.Blob){n=this.options.element;if(!n){n=document.createElement("video")
}if(n.getAttribute("type")!==o.type){n.setAttribute("type",o.type)}n.src=window.URL.createObjectURL(o)
}l.prototype._onLoad.call(this,n)};k.pause=function(){this._binary.pause()};k.destroy=function(){this._binary.destroy();
l.prototype.destroy.call(this)};a.exports=m},{"../Asset":39,"./Binary":42,"./SplitFile":45,"./Video/Element":48,"ac-feature":23,"ac-object":27}],48:[function(b,a,g){var f=b("ac-feature");
var d=b("ac-object");var k=b("./../../../../utils/round");var j=b("./../../Asset");
var c={};function i(m,l){j.apply(this,arguments);this.options=d.defaults(c,l||{});
this._boundOnVideoProgress=null;this._boundOnTimeUpdate=null;this._boundOnCanPlayThrough=null;
this._videoDuration=null}var h=i.prototype=d.create(j.prototype);h._onVideoProgress=function(l){if(this.data&&this.data.buffered.length>0&&this._videoDuration&&k(this.data.buffered.end(0),4)===k(this._videoDuration,4)){this._unbindEvent("canplaythrough",this._boundOnCanPlayThrough);
this._unbindEvent("timeupdate",this._boundOnTimeUpdate);this._unbindEvent("progress",this._boundOnVideoProgress);
this._unbindEvent("loadedmetadata",this._boundMetaDataLoaded);this._boundOnVideoProgress=null;
this.data.muted=false;this._onLoad()}};h._onTimeUpdate=function(l){this.data.pause();
this.data.currentTime=0;this.data.removeEventListener("timeupdate",this._boundOnTimeUpdate);
this._boundOnTimeUpdate=null};h._onCanPlayThrough=function(l){if(this._boundOnTimeUpdate===null){this._boundOnTimeUpdate=this._onTimeUpdate.bind(this)
}if(f.isDesktop()){this.data.addEventListener("timeupdate",this._boundOnTimeUpdate);
this.data.play()}this._unbindEvent("canplaythrough",this._boundOnCanPlayThrough);
this._boundOnCanPlayThrough=null};h._onMetaDataLoaded=function(l){this._videoDuration=this.data.duration;
this._onVideoProgress(l)};h._load=function(){this.data=this.options.element;if(!this.data){this.data=document.createElement("video")
}this.data.muted=true;if(this.options.type){this.data.setAttribute("type",this.options.type)
}if(this._boundOnVideoProgress===null){this._boundOnVideoProgress=this._onVideoProgress.bind(this);
this._boundOnCanPlayThrough=this._onCanPlayThrough.bind(this);this._boundMetaDataLoaded=this._onMetaDataLoaded.bind(this);
this.data.addEventListener("progress",this._boundOnVideoProgress);this.data.addEventListener("canplaythrough",this._boundOnCanPlayThrough);
this.data.addEventListener("loadedmetadata",this._boundMetaDataLoaded)}this.data.setAttribute("preload","auto");
this.data.src=this.src;this.data.load()};h._unbindEvent=function(l,m){if(typeof m==="function"){this.data.removeEventListener(l,m)
}};h.pause=function(){this._unbindEvent("canplaythrough",this._boundOnCanPlayThrough);
this._unbindEvent("timeupdate",this._boundOnTimeUpdate);this._unbindEvent("progress",this._boundOnVideoProgress);
this._unbindEvent("loadedmetadata",this._boundMetaDataLoaded);this._boundOnVideoProgress=null;
this._boundOnCanPlayThrough=null;this._boundOnTimeUpdate=null;this._boundMetaDataLoaded=null;
this.data.removeAttribute("src");this.data=undefined;this.trigger("pause")};a.exports=i
},{"./../../../../utils/round":51,"./../../Asset":39,"ac-feature":23,"ac-object":27}],49:[function(b,a,g){var h;
var f=b("ac-object");var i=b("ac-deferred").Deferred;var k=b("ac-event-emitter").EventEmitter;
var j=b("../../utils/destroy");var d={threads:4};function c(m,l){this.options=f.defaults(d,l||{});
this._queue=m;this._active=[];this._allowedThreads=this.options.threads;this._availableThreads=this._allowedThreads;
this._deferred=new i();this._data=[];this.paused=true;this.loaded=false;this.promise=this._deferred.promise()
}h=c.prototype=new k();h.start=function(){var m=this._availableThreads;var l;this.paused=false;
if(m>this._queue.length){m=this._queue.length}for(l=1;l<=m;l++){this._startNewThread()
}return this.promise};h.pause=function(){this.paused=true;var l=[];this._active.forEach(function(n,m){if(typeof n.pause==="function"){this._queue.unshift(n);
this._releaseThread();n.off("loaded");n.off("error");n.pause();l.push(m)}},this);
l.forEach(function(m){this._active.splice(m,1)},this)};h.destroy=function(){this.pause();
j(this)};h._startNewThread=function(){var m=this._queue.shift();this._occupyThread();
if(m&&typeof m.load==="function"){var l=function(o){this._onProgress(o);this._active.splice(this._active.indexOf(m),1);
m.off("error",n)};var n=function(o){this._onError();m.off("loaded",l)};m.once("loaded",l,this);
m.once("error",n,this);m.load()}else{this._onError()}this._active.push(m)};h._onResolved=function(){if(this._errored){return false
}this._deferred.resolve(this._data);this.trigger("resolved",this._data)};h._onError=function(l){if(this._errored){return false
}this._errored=true;this._deferred.reject(l);this.trigger("rejected",l)};h.abort=function(){this._deferred.reject()
};h._onProgress=function(l){if(this._errored){return false}this._releaseThread();
this._data[l.index]=l.data;this.trigger("progress",l.data);if(this._queue.length<=0){if(this._availableThreads>=this._allowedThreads){this._onResolved()
}}else{if(!this.paused&&!this._errored){this._startNewThread()}}};h._occupyThread=function(){this._availableThreads--;
if(this._availableThreads<0){throw"AssetLoader.Queue: Available thread count cannot be negative."
}};h._releaseThread=function(){this._availableThreads++;if(this._availableThreads>this._allowedThreads){throw"AssetLoader.Queue: Available thread count cannot be more than allowed thread amount."
}};a.exports=c},{"../../utils/destroy":50,"ac-event-emitter":false,"ac-object":27}],50:[function(b,d,a){d.exports=function c(f,g){if(typeof f.off==="function"){f.off()
}function h(j){var i=true;for(var k in j){if(j.hasOwnProperty(k)){if(j[k]!==null){i=false;
break}}}return i}window.setTimeout(function(){var i;for(i in f){if(f.hasOwnProperty(i)){if(g&&f[i]&&typeof f[i].destroy==="function"&&!h(f[i])){f[i].destroy()
}f[i]=null}}})}},{}],51:[function(b,c,a){c.exports=function(d,f){return Math.round(d*Math.pow(10,f))/Math.pow(10,f)
}},{}],52:[function(b,c,a){if(!Array.prototype.filter){Array.prototype.filter=function d(l,k){var j=Object(this);
var f=j.length>>>0;var h;var g=[];if(typeof l!=="function"){throw new TypeError(l+" is not a function")
}for(h=0;h<f;h+=1){if(h in j&&l.call(k,j[h],h,j)){g.push(j[h])}}return g}}},{}],53:[function(b,c,a){if(!Array.prototype.some){Array.prototype.some=function d(k,j){var g=Object(this);
var f=g.length>>>0;var h;if(typeof k!=="function"){throw new TypeError(k+" is not a function")
}for(h=0;h<f;h+=1){if(h in g&&k.call(j,g[h],h,g)===true){return true}}return false
}}},{}],54:[function(d,f,b){var g=d("./ac-browser/BrowserData");var a=/applewebkit/i;
var h=d("./ac-browser/IE");var c=g.create();c.isWebKit=function(i){var j=i||window.navigator.userAgent;
return j?!!a.test(j):false};c.lowerCaseUserAgent=navigator.userAgent.toLowerCase();
if(c.name==="IE"){c.IE={documentMode:h.getDocumentMode()}}f.exports=c},{"./ac-browser/BrowserData":55,"./ac-browser/IE":56}],55:[function(b,c,a){b("ac-polyfills/Array/prototype.filter");
b("ac-polyfills/Array/prototype.some");var d=b("./data");function f(){}f.prototype={__getBrowserVersion:function(h,i){var g;
if(!h||!i){return}var j=d.browser.filter(function(k){return k.identity===i});j.some(function(m){var k=m.versionSearch||i;
var l=h.indexOf(k);if(l>-1){g=parseFloat(h.substring(l+k.length+1));return true
}});return g},__getName:function(g){return this.__getIdentityStringFromArray(g)
},__getIdentity:function(g){if(g.string){return this.__matchSubString(g)}else{if(g.prop){return g.identity
}}},__getIdentityStringFromArray:function(g){for(var k=0,h=g.length,j;k<h;k++){j=this.__getIdentity(g[k]);
if(j){return j}}},__getOS:function(g){return this.__getIdentityStringFromArray(g)
},__getOSVersion:function(i,l){if(!i||!l){return}var k=d.os.filter(function(m){return m.identity===l
})[0];var g=k.versionSearch||l;var j=new RegExp(g+" ([\\d_\\.]+)","i");var h=i.match(j);
if(h!==null){return h[1].replace(/_/g,".")}},__matchSubString:function(h){var g=h.subString;
if(g){var i=g.test?!!g.test(h.string):h.string.indexOf(g)>-1;if(i){return h.identity
}}}};f.create=function(){var g=new f();var h={};h.name=g.__getName(d.browser);h.version=g.__getBrowserVersion(d.versionString,h.name);
h.os=g.__getOS(d.os);h.osVersion=g.__getOSVersion(d.versionString,h.os);return h
};c.exports=f},{"./data":57,"ac-polyfills/Array/prototype.filter":52,"ac-polyfills/Array/prototype.some":53}],56:[function(b,c,a){c.exports={getDocumentMode:function(){var d;
if(document.documentMode){d=parseInt(document.documentMode,10)}else{d=5;if(document.compatMode){if(document.compatMode==="CSS1Compat"){d=7
}}}return d}}},{}],57:[function(b,c,a){c.exports={browser:[{string:window.navigator.userAgent,subString:"Edge",identity:"Edge"},{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],58:[function(b,c,a){b("ac-polyfills/Array/prototype.slice");b("ac-polyfills/Element/prototype.classList");
var d=b("./className/add");c.exports=function f(){var j=Array.prototype.slice.call(arguments);
var h=j.shift(j);var g;if(h.classList&&h.classList.add){h.classList.add.apply(h.classList,j);
return}for(g=0;g<j.length;g++){d(h,j[g])}}},{"./className/add":60,"ac-polyfills/Array/prototype.slice":66,"ac-polyfills/Element/prototype.classList":67}],59:[function(b,c,a){c.exports={add:b("./className/add"),contains:b("./className/contains"),remove:b("./className/remove")}
},{"./className/add":60,"./className/contains":61,"./className/remove":63}],60:[function(b,c,a){var d=b("./contains");
c.exports=function f(h,g){if(!d(h,g)){h.className+=" "+g}}},{"./contains":61}],61:[function(b,c,a){var f=b("./getTokenRegExp");
c.exports=function d(h,g){return f(g).test(h.className)}},{"./getTokenRegExp":62}],62:[function(b,c,a){c.exports=function d(f){return new RegExp("(\\s|^)"+f+"(\\s|$)")
}},{}],63:[function(c,d,b){var f=c("./contains");var g=c("./getTokenRegExp");d.exports=function a(i,h){if(f(i,h)){i.className=i.className.replace(g(h),"$1").trim()
}}},{"./contains":61,"./getTokenRegExp":62}],64:[function(b,d,a){b("ac-polyfills/Element/prototype.classList");
var f=b("./className/contains");d.exports=function c(h,g){if(h.classList&&h.classList.contains){return h.classList.contains(g)
}return f(h,g)}},{"./className/contains":61,"ac-polyfills/Element/prototype.classList":67}],65:[function(b,c,a){c.exports={add:b("./add"),contains:b("./contains"),remove:b("./remove"),toggle:b("./toggle")}
},{"./add":58,"./contains":64,"./remove":68,"./toggle":69}],66:[function(b,c,a){(function(){var d=Array.prototype.slice;
try{d.call(document.documentElement)}catch(f){Array.prototype.slice=function(n,j){j=(typeof j!=="undefined")?j:this.length;
if(Object.prototype.toString.call(this)==="[object Array]"){return d.call(this,n,j)
}var l,h=[],k,g=this.length;var o=n||0;o=(o>=0)?o:g+o;var m=(j)?j:g;if(j<0){m=g+j
}k=m-o;if(k>0){h=new Array(k);if(this.charAt){for(l=0;l<k;l++){h[l]=this.charAt(o+l)
}}else{for(l=0;l<k;l++){h[l]=this[o+l]}}}return h}}}())},{}],67:[function(b,c,a){
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
;
if("document" in self){if(!("classList" in document.createElement("_"))){(function(n){if(!("Element" in n)){return
}var d="classList",j="prototype",q=n.Element[j],f=Object,o=String[j].trim||function(){return this.replace(/^\s+|\s+$/g,"")
},g=Array[j].indexOf||function(u){var t=0,s=this.length;for(;t<s;t++){if(t in this&&this[t]===u){return t
}}return -1},r=function(s,t){this.name=s;this.code=DOMException[s];this.message=t
},k=function(t,s){if(s===""){throw new r("SYNTAX_ERR","An invalid or illegal string was specified")
}if(/\s/.test(s)){throw new r("INVALID_CHARACTER_ERR","String contains an invalid character")
}return g.call(t,s)},h=function(w){var v=o.call(w.getAttribute("class")||""),u=v?v.split(/\s+/):[],t=0,s=u.length;
for(;t<s;t++){this.push(u[t])}this._updateClassName=function(){w.setAttribute("class",this.toString())
}},i=h[j]=[],m=function(){return new h(this)};r[j]=Error[j];i.item=function(s){return this[s]||null
};i.contains=function(s){s+="";return k(this,s)!==-1};i.add=function(){var w=arguments,v=0,t=w.length,u,s=false;
do{u=w[v]+"";if(k(this,u)===-1){this.push(u);s=true}}while(++v<t);if(s){this._updateClassName()
}};i.remove=function(){var x=arguments,w=0,t=x.length,v,s=false,u;do{v=x[w]+"";
u=k(this,v);while(u!==-1){this.splice(u,1);s=true;u=k(this,v)}}while(++w<t);if(s){this._updateClassName()
}};i.toggle=function(t,u){t+="";var s=this.contains(t),v=s?u!==true&&"remove":u!==false&&"add";
if(v){this[v](t)}if(u===true||u===false){return u}else{return !s}};i.toString=function(){return this.join(" ")
};if(f.defineProperty){var p={get:m,enumerable:true,configurable:true};try{f.defineProperty(q,d,p)
}catch(l){if(l.number===-2146823252){p.enumerable=false;f.defineProperty(q,d,p)
}}}else{if(f[j].__defineGetter__){q.__defineGetter__(d,m)}}}(self))}else{(function(){var f=document.createElement("_");
f.classList.add("c1","c2");if(!f.classList.contains("c2")){var g=function(i){var h=DOMTokenList.prototype[i];
DOMTokenList.prototype[i]=function(l){var k,j=arguments.length;for(k=0;k<j;k++){l=arguments[k];
h.call(this,l)}}};g("add");g("remove")}f.classList.toggle("c3",false);if(f.classList.contains("c3")){var d=DOMTokenList.prototype.toggle;
DOMTokenList.prototype.toggle=function(h,i){if(1 in arguments&&!this.contains(h)===!i){return i
}else{return d.call(this,h)}}}f=null}())}}},{}],68:[function(d,f,c){d("ac-polyfills/Array/prototype.slice");
d("ac-polyfills/Element/prototype.classList");var b=d("./className/remove");f.exports=function a(){var j=Array.prototype.slice.call(arguments);
var h=j.shift(j);var g;if(h.classList&&h.classList.remove){h.classList.remove.apply(h.classList,j);
return}for(g=0;g<j.length;g++){b(h,j[g])}}},{"./className/remove":63,"ac-polyfills/Array/prototype.slice":66,"ac-polyfills/Element/prototype.classList":67}],69:[function(c,d,b){c("ac-polyfills/Element/prototype.classList");
var f=c("./className");d.exports=function a(j,i,k){var h=(typeof k!=="undefined");
var g;if(j.classList&&j.classList.toggle){if(h){return j.classList.toggle(i,k)}return j.classList.toggle(i)
}if(h){g=!!k}else{g=!f.contains(j,i)}if(g){f.add(j,i)}else{f.remove(j,i)}return g
}},{"./className":59,"ac-polyfills/Element/prototype.classList":67}],70:[function(b,c,a){c.exports={Clip:b("./ac-clip/Clip")}
},{"./ac-clip/Clip":71}],71:[function(d,c,f){var m=d("ac-object").clone;var i=d("ac-object").create;
var p=d("ac-easing").createPredefined;var a=d("ac-clock");var n=d("ac-easing").Ease;
var o=d("ac-event-emitter").EventEmitter;var l="ease";var j="complete";var h="pause";
var b="play";function k(s,r,u,q){q=q||{};this._options=q;this._target=s;this._duration=r*1000;
this._delay=(q.delay||0)*1000;this._remainingDelay=this._delay;this._progress=0;
this._clock=q.clock||a;this._playing=false;this._getTime=Date.now||function(){return new Date().getTime()
};this._isYoyo=q.yoyo;this._direction=1;this._loop=q.loop||0;this._loopCount=0;
this._propsTo=u;this._propsFrom=q.propsFrom||{};this._storeTarget=m(this._target,true);
this._storePropsTo=this._propsTo;this._storePropsFrom=this._propsFrom;this._onStart=q.onStart||null;
this._onUpdate=q.onUpdate||null;this._onDraw=q.onDraw||null;this._onComplete=q.onComplete||null;
var t=q.ease||l;this._ease=(typeof t==="function")?new n(t):p(t);this._start=this._start.bind(this);
this._update=this._update.bind(this);this._draw=this._draw.bind(this)}var g=k.prototype=i(o.prototype);
g.play=function(){if(!this._playing){this._playing=true;if(this._delay===0||this._remainingDelay===0){this._start()
}else{this._startTimeout=setTimeout(this._start,this._remainingDelay);this._delayStart=this._getTime()
}}return this};g.pause=function(){if(this._playing){if(this._startTimeout){this._remainingDelay=this._getTime()-this._delayStart;
clearTimeout(this._startTimeout)}this._stop();this.trigger(h,this._getDetails())
}return this};g.reset=function(){this._stop();var q;for(q in this._storeTarget){this._target[q]=this._storeTarget[q]
}this._direction=1;this._loop=this._options.loop||0;this._loopCount=0;this.setProgress(0);
return this};g.isPlaying=function(){return this._playing};g.getTarget=function(){return this._target
};g.setCurrentTime=function(q){this.setProgress(q*1000/this._duration);return this.getCurrentTime()
};g.getCurrentTime=function(){return(this.getProgress()*this._duration)/1000};g.setProgress=function(q){this._progress=Math.min(1,Math.max(0,q));
this._setStartTime();if(!this._playing){this._setDiff()}if(this._playing&&q===1){this._completeProps();
if(this._onUpdate){this._onUpdate.call(this,this._getDetails())}if(this._onDraw){this._onDraw.call(this,this._getDetails())
}this._complete()}else{this._updateProps();if(this._onUpdate){this._onUpdate.call(this,this._getDetails())
}if(this._onDraw){this._onDraw.call(this,this._getDetails())}}return this.getProgress()
};g.getProgress=function(){return this._progress};g._setStartTime=function(){this._startTime=this._getTime()-(this.getProgress()*this._duration)
};g._setDiff=function(){this._propsDiff={};var q=function(v,u,s,r){var t;for(t in v){if(typeof v[t]==="object"){u[t]=u[t]||{};
r[t]=r[t]||{};q(v[t],u[t],s[t],r[t])}else{if(typeof s[t]==="number"){if(u[t]!==undefined){s[t]=u[t]
}else{u[t]=s[t]}r[t]=v[t]-s[t]}else{delete v[t]}}}};q(this._propsTo,this._propsFrom,this._target,this._propsDiff)
};g._getDetails=function(){return{target:this._target,progress:this.getProgress(),clip:this}
};g._start=function(){this._startTimeout=null;this._remainingDelay=0;this._setStartTime();
this._clock.on("update",this._update);this._clock.on("draw",this._draw);if(!this._clock.isRunning()){this._clock.start()
}this._setDiff();this._playing=true;this._running=true;if(this._onStart){this._onStart.call(this,this._getDetails())
}this.trigger(b,this._getDetails())};g._stop=function(){this._playing=false;this._running=false;
this._clock.off("update",this._update);this._clock.off("draw",this._draw)};g._updateProps=function(){var q=this._ease.getValue(this._progress);
var r=function(w,v,t,s){var u;for(u in w){if(typeof w[u]!=="number"){r(w[u],v[u],t[u],s[u])
}else{t[u]=v[u]+(s[u]*q)}}};r(this._propsTo,this._propsFrom,this._target,this._propsDiff)
};g._completeProps=function(){var q=function(t,r){var s;for(s in t){if(typeof t[s]!=="number"){q(t[s],r[s])
}else{r[s]=t[s]}}};q(this._propsTo,this._target)};g._complete=function(){if(this._isYoyo&&((this._loop>0&&this._loopCount<=this._loop)||(this._loop===0&&this._loopCount===0))){this._propsFrom=(this._direction===1)?this._storePropsTo:this._storePropsFrom;
this._propsTo=(this._direction===1)?this._storePropsFrom:this._storePropsTo;this.setProgress(0);
this._direction*=-1;if(this._direction===-1){++this._loopCount}this._start()}else{if(this._loopCount<this._loop){++this._loopCount;
this.target=this._storeTarget;this.setProgress(0);this._start()}else{if(this._onComplete){this._onComplete.call(this,this._getDetails())
}this.trigger(j,this._getDetails())}}};g._update=function(q){if(this._running){this._progress=(q.timeNow-this._startTime)/this._duration;
if(this._progress>=1){this._progress=1;this._running=false;this._completeProps()
}else{this._updateProps()}if(this._onUpdate){this._onUpdate.call(this,this._getDetails())
}}};g._draw=function(q){if(this._onDraw){this._onDraw.call(this,this._getDetails())
}if(!this._running){this._stop();if(this._progress===1){this._complete()}}};c.exports=k
},{"ac-clock":72,"ac-easing":203,"ac-event-emitter":false,"ac-object":1033}],72:[function(c,d,b){var g=c("./ac-clock/Clock"),f=c("./ac-clock/ThrottledClock"),a=c("./ac-clock/sharedClockInstance");
a.Clock=g;a.ThrottledClock=f;d.exports=a},{"./ac-clock/Clock":73,"./ac-clock/ThrottledClock":74,"./ac-clock/sharedClockInstance":75}],73:[function(c,d,b){var g;
var f=c("ac-event-emitter").EventEmitter;var a=new Date().getTime();function h(){f.call(this);
this.lastFrameTime=null;this._animationFrame=null;this._active=false;this._startTime=null;
this._boundOnAnimationFrame=this._onAnimationFrame.bind(this);this._getTime=Date.now||function(){return new Date().getTime()
}}g=h.prototype=new f(null);g.start=function(){if(this._active){return}this._tick()
};g.stop=function(){if(this._active){window.cancelAnimationFrame(this._animationFrame)
}this._animationFrame=null;this.lastFrameTime=null;this._active=false};g.destroy=function(){this.stop();
this.off();var j;for(j in this){if(this.hasOwnProperty(j)){this[j]=null}}};g.isRunning=function(){return this._active
};g._tick=function(){if(!this._active){this._active=true}this._animationFrame=window.requestAnimationFrame(this._boundOnAnimationFrame)
};g._onAnimationFrame=function(l){var m=0;var i=this._getTime();if(this.lastFrameTime===null){this.lastFrameTime=i-a
}else{m=l-this.lastFrameTime}var k=0,j;if(m!==0){k=1000/m}j={time:l,delta:m,fps:k,naturalFps:k,timeNow:i};
this.trigger("update",j);this.trigger("draw",j);this._animationFrame=null;this.lastFrameTime=l;
if(this._active!==false){this._tick()}else{this.lastFrameTime=null}};d.exports=h
},{"ac-event-emitter":false}],74:[function(c,d,b){var g;var a=c("./sharedClockInstance"),f=c("ac-event-emitter").EventEmitter;
function h(j,i){if(j===null){return}f.call(this);i=i||{};this._fps=j||null;this._clock=i.clock||a;
this._lastThrottledTime=null;this._clockEvent=null;this._clock.on("update",this._onClockUpdate,this)
}g=h.prototype=new f(null);g.setFps=function(i){this._fps=i;return this};g.getFps=function(){return this._fps
};g.start=function(){this._clock.start();return this};g.stop=function(){this._clock.stop();
return this};g.isRunning=function(){return this._clock.isRunning()};g.destroy=function(){this._clock.off("update",this._onClockUpdate,this);
this._clock.destroy.call(this)};g._onClockUpdate=function(i){if(this._lastThrottledTime===null){this._lastThrottledTime=this._clock.lastFrameTime
}var j=i.time-this._lastThrottledTime;if(!this._fps){throw new TypeError("FPS is not defined.")
}if(j<(1000/this._fps)){return}this._clockEvent=i;this._clockEvent.delta=j;this._clockEvent.fps=1000/j;
this._lastThrottledTime=this._clockEvent.time;this._clock.once("draw",this._onClockDraw,this);
this.trigger("update",this._clockEvent)};g._onClockDraw=function(){this.trigger("draw",this._clockEvent)
};d.exports=h},{"./sharedClockInstance":75,"ac-event-emitter":false}],75:[function(b,c,a){var d=b("./Clock");
c.exports=new d()},{"./Clock":73}],76:[function(b,c,a){var d=b("./ac-prefixer/Prefixer");
c.exports=new d();c.exports.Prefixer=d},{"./ac-prefixer/Prefixer":77}],77:[function(d,b,g){var k=d("./Prefixer/camelCasedEvents");
var n=/(\([^\)]+\))/gi;var h=/([^ ,;\(]+(\([^\)]+\))?)/gi;var j=/(-webkit-|-moz-|-ms-)|^(webkit|moz|ms)/gi;
var a=/^(webkit|moz|ms)/gi;var f=["-webkit-","-moz-","-ms-"];var l=["Webkit","Moz","ms"];
var m=["webkit","moz","ms"];function c(){this._supportsAvailable=("CSS" in window&&"supports" in window.CSS);
this._cssPrefixes=f;this._domPrefixes=l;this._evtPrefixes=m;this._styleProperties={};
this._styleValues={};this._eventTypes={}}var i=c.prototype;i.getEventType=function(p){var q;
var o;p=p.toLowerCase();if(p in this._eventTypes){return this._eventTypes[p]}if(this._checkEventType("on"+p)){return this._eventTypes[p]=p
}if(k[p]){for(q in k[p]){if(this._checkEventType(q)){return this._eventTypes[p]=k[p][q]
}}}for(o=0;o<this._evtPrefixes.length;o++){if(this._checkEventType("on"+this._evtPrefixes[o]+p)){this._eventTypes[p]=this._evtPrefixes[o]+p;
this._reduceAvailablePrefixes(o);return this._eventTypes[p]}}return this._eventTypes[p]=p
};i._checkEventType=function(o){return(o in window||o in document)};i.getStyleProperty=function(r){var q;
var o;var p;r+="";if(r in this._styleProperties){return this._styleProperties[r].dom
}r=this._toDOM(r);this._prepareTestElement();o=r.charAt(0).toUpperCase()+r.substr(1);
if(r==="filter"){q=["WebkitFilter","filter"]}else{q=(r+" "+this._domPrefixes.join(o+" ")+o).split(" ")
}for(p=0;p<q.length;p++){if(this._el.style[q[p]]!==undefined){if(p!==0){this._reduceAvailablePrefixes(p-1)
}this._memoizeStyleProperty(r,q[p]);return q[p]}}this._memoizeStyleProperty(r,false);
return false};i._memoizeStyleProperty=function(r,o){var p=this._toCSS(r);var q=(o===false)?false:this._toCSS(o);
this._styleProperties[r]=this._styleProperties[o]=this._styleProperties[p]=this._styleProperties[q]={dom:o,css:q}
};i.getStyleCSS=function(q,p){var o;q=this.getStyleProperty(q);if(!q){return false
}o=this._styleProperties[q].css;if(typeof p!=="undefined"){p=this.getStyleValue(q,p);
if(p===false){return false}o+=":"+p+";"}return o};i.getStyleValue=function(q,p){var o;
p+="";q=this.getStyleProperty(q);if(!q){return false}if(this._testStyleValue(q,p)){return p
}o=this._styleProperties[q].css;p=p.replace(h,function(s){var r;var v;var u;var t;
if(s[0]==="#"||!isNaN(s[0])){return s}v=s.replace(n,"");u=o+":"+v;if(u in this._styleValues){if(this._styleValues[u]===false){return""
}return s.replace(v,this._styleValues[u])}r=this._cssPrefixes.map(function(w){return w+s
});r=[s].concat(r);for(t=0;t<r.length;t++){if(this._testStyleValue(q,r[t])){if(t!==0){this._reduceAvailablePrefixes(t-1)
}this._styleValues[u]=r[t].replace(n,"");return r[t]}}this._styleValues[u]=false;
return""}.bind(this));p=p.trim();return(p==="")?false:p};i._testStyleValue=function(q,p){var o;
if(this._supportsAvailable){q=this._styleProperties[q].css;return CSS.supports(q,p)
}this._prepareTestElement();o=this._el.style[q];try{this._el.style[q]=p}catch(r){return false
}return(this._el.style[q]&&this._el.style[q]!==o)};i.stripPrefixes=function(o){o=String.prototype.replace.call(o,j,"");
return o.charAt(0).toLowerCase()+o.slice(1)};i._reduceAvailablePrefixes=function(o){if(this._cssPrefixes.length!==1){this._cssPrefixes=[this._cssPrefixes[o]];
this._domPrefixes=[this._domPrefixes[o]];this._evtPrefixes=[this._evtPrefixes[o]]
}};i._toDOM=function(p){var o;if(p.toLowerCase()==="float"){return"cssFloat"}p=p.replace(/-([a-z])/g,function(r,q){return q.toUpperCase()
});if(p.substr(0,2)==="Ms"){p="ms"+p.substr(2)}return p};i._toCSS=function(p){var o;
if(p.toLowerCase()==="cssfloat"){return"float"}if(a.test(p)){p="-"+p}return p.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()
};i._prepareTestElement=function(){if(!this._el){this._el=document.createElement("_")
}else{this._el.style.cssText="";this._el.removeAttribute("style")}};b.exports=c
},{"./Prefixer/camelCasedEvents":78}],78:[function(b,c,a){c.exports={transitionend:{onwebkittransitionend:"webkitTransitionEnd",onmstransitionend:"MSTransitionEnd"},animationstart:{onwebkitanimationstart:"webkitAnimationStart",onmsanimationstart:"MSAnimationStart"},animationend:{onwebkitanimationend:"webkitAnimationEnd",onmsanimationend:"MSAnimationEnd"},animationiteration:{onwebkitanimationiteration:"webkitAnimationIteration",onmsanimationiteration:"MSAnimationIteration"},fullscreenchange:{onmsfullscreenchange:"MSFullscreenChange"},fullscreenerror:{onmsfullscreenerror:"MSFullscreenError"}}
},{}],79:[function(b,c,a){c.exports={addEventListener:b("./ac-dom-events/addEventListener"),dispatchEvent:b("./ac-dom-events/dispatchEvent"),preventDefault:b("./ac-dom-events/preventDefault"),removeEventListener:b("./ac-dom-events/removeEventListener"),stop:b("./ac-dom-events/stop"),stopPropagation:b("./ac-dom-events/stopPropagation"),target:b("./ac-dom-events/target")}
},{"./ac-dom-events/addEventListener":80,"./ac-dom-events/dispatchEvent":81,"./ac-dom-events/preventDefault":82,"./ac-dom-events/removeEventListener":83,"./ac-dom-events/stop":84,"./ac-dom-events/stopPropagation":85,"./ac-dom-events/target":86}],80:[function(b,c,a){var f=b("ac-prefixer");
c.exports=function d(j,h,i,g){h=f.getEventType(h);if(j.addEventListener){j.addEventListener(h,i,g)
}else{h="on"+h.toLowerCase();j.attachEvent(h,i)}return j}},{"ac-prefixer":76}],81:[function(b,c,a){c.exports=function d(i,h,g){var f;
h=h.toLowerCase();if(window.CustomEvent){if(g){f=new CustomEvent(h,g)}else{f=new CustomEvent(h)
}i.dispatchEvent(f)}else{f=document.createEventObject();if(g&&"detail" in g){f.detail=g.detail
}i.fireEvent("on"+h,f)}return i}},{}],82:[function(c,d,a){d.exports=function b(f){f=f||window.event;
if(f.preventDefault){f.preventDefault()}else{f.returnValue=false}}},{}],83:[function(b,c,a){var f=b("ac-prefixer");
c.exports=function d(j,h,i,g){h=f.getEventType(h);if(j.removeEventListener){j.removeEventListener(h,i,g)
}else{h="on"+h.toLowerCase();j.detachEvent(h,i)}return j}},{"ac-prefixer":76}],84:[function(d,g,b){var a=d("./stopPropagation");
var c=d("./preventDefault");g.exports=function f(h){h=h||window.event;a(h);c(h);
h.stopped=true;h.returnValue=false}},{"./preventDefault":82,"./stopPropagation":85}],85:[function(c,d,b){d.exports=function a(f){f=f||window.event;
if(f.stopPropagation){f.stopPropagation()}else{f.cancelBubble=true}}},{}],86:[function(b,c,a){c.exports=function d(f){f=f||window.event;
return(typeof f.target!=="undefined")?f.target:f.srcElement}},{}],87:[function(b,c,a){var d={querySelector:b("./ac-dom-traversal/querySelector"),querySelectorAll:b("./ac-dom-traversal/querySelectorAll"),ancestor:b("./ac-dom-traversal/ancestor"),ancestors:b("./ac-dom-traversal/ancestors"),children:b("./ac-dom-traversal/children"),firstChild:b("./ac-dom-traversal/firstChild"),lastChild:b("./ac-dom-traversal/lastChild"),siblings:b("./ac-dom-traversal/siblings"),nextSibling:b("./ac-dom-traversal/nextSibling"),nextSiblings:b("./ac-dom-traversal/nextSiblings"),previousSibling:b("./ac-dom-traversal/previousSibling"),previousSiblings:b("./ac-dom-traversal/previousSiblings"),filterBySelector:b("./ac-dom-traversal/filterBySelector"),matchesSelector:b("./ac-dom-traversal/matchesSelector")};
b("./ac-dom-traversal/shims/ie")(d);c.exports=d},{"./ac-dom-traversal/ancestor":88,"./ac-dom-traversal/ancestors":89,"./ac-dom-traversal/children":90,"./ac-dom-traversal/filterBySelector":91,"./ac-dom-traversal/firstChild":92,"./ac-dom-traversal/lastChild":95,"./ac-dom-traversal/matchesSelector":96,"./ac-dom-traversal/nextSibling":97,"./ac-dom-traversal/nextSiblings":98,"./ac-dom-traversal/previousSibling":99,"./ac-dom-traversal/previousSiblings":100,"./ac-dom-traversal/querySelector":101,"./ac-dom-traversal/querySelectorAll":102,"./ac-dom-traversal/shims/ie":103,"./ac-dom-traversal/siblings":104}],88:[function(d,g,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");g.exports=function f(j,i){h.childNode(j,true,"ancestors");
h.selector(i,false,"ancestors");if(j!==document.body){while((j=j.parentNode)&&a.isElement(j)){if(!i||b(j,i)){return j
}if(j===document.body){break}}}return null}},{"./helpers/validate":94,"./matchesSelector":96,"ac-dom-nodes":148}],89:[function(d,f,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");f.exports=function g(k,i){var j=[];
h.childNode(k,true,"ancestors");h.selector(i,false,"ancestors");if(k!==document.body){while((k=k.parentNode)&&a.isElement(k)){if(!i||b(k,i)){j.push(k)
}if(k===document.body){break}}}return j}},{"./helpers/validate":94,"./matchesSelector":96,"ac-dom-nodes":148}],90:[function(d,g,c){var a=d("ac-dom-nodes");
var b=d("./filterBySelector");var h=d("./helpers/validate");g.exports=function f(k,i){var j;
h.parentNode(k,true,"children");h.selector(i,false,"children");j=k.children||k.childNodes;
j=a.filterByNodeType(j);if(i){j=b(j,i)}return j}},{"./filterBySelector":91,"./helpers/validate":94,"ac-dom-nodes":148}],91:[function(d,f,c){var b=d("./matchesSelector");
var g=d("./helpers/validate");f.exports=function a(i,h){g.selector(h,true,"filterBySelector");
i=Array.prototype.slice.call(i);return i.filter(function(j){return b(j,h)})}},{"./helpers/validate":94,"./matchesSelector":96}],92:[function(b,d,a){var c=b("./children");
var g=b("./helpers/validate");d.exports=function f(j,h){var i;g.parentNode(j,true,"firstChild");
g.selector(h,false,"firstChild");if(j.firstElementChild&&!h){return j.firstElementChild
}i=c(j,h);if(i.length){return i[0]}return null}},{"./children":90,"./helpers/validate":94}],93:[function(b,c,a){c.exports=window.Element?(function(d){return d.matches||d.matchesSelector||d.webkitMatchesSelector||d.mozMatchesSelector||d.msMatchesSelector||d.oMatchesSelector
}(Element.prototype)):null},{}],94:[function(d,b,f){var j=d("ac-dom-nodes");var a=function(m,l){if(!j.isNode(m)){return false
}if(typeof l==="number"){return(m.nodeType===l)}return(l.indexOf(m.nodeType)!==-1)
};var h=[j.ELEMENT_NODE,j.DOCUMENT_NODE,j.DOCUMENT_FRAGMENT_NODE];var i=" must be an Element, Document, or Document Fragment";
var k=[j.ELEMENT_NODE,j.TEXT_NODE,j.COMMENT_NODE];var g=" must be an Element, TextNode, or Comment";
var c=" must be a string";b.exports={parentNode:function(l,o,n,m){m=m||"node";if((l||o)&&!a(l,h)){throw new TypeError(n+": "+m+i)
}},childNode:function(l,o,n,m){m=m||"node";if(!l&&!o){return}if(!a(l,k)){throw new TypeError(n+": "+m+g)
}},selector:function(l,o,n,m){m=m||"selector";if((l||o)&&typeof l!=="string"){throw new TypeError(n+": "+m+c)
}}}},{"ac-dom-nodes":148}],95:[function(b,d,a){var c=b("./children");var g=b("./helpers/validate");
d.exports=function f(j,h){var i;g.parentNode(j,true,"lastChild");g.selector(h,false,"lastChild");
if(j.lastElementChild&&!h){return j.lastElementChild}i=c(j,h);if(i.length){return i[i.length-1]
}return null}},{"./children":90,"./helpers/validate":94}],96:[function(f,g,d){var b=f("ac-dom-nodes");
var a=f("./helpers/nativeMatches");var h=f("./helpers/validate");g.exports=function c(j,i){h.selector(i,true,"matchesSelector");
return b.isElement(j)?a.call(j,i):false}},{"./helpers/nativeMatches":93,"./helpers/validate":94,"ac-dom-nodes":148}],97:[function(d,f,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");f.exports=function g(j,i){h.childNode(j,true,"nextSibling");
h.selector(i,false,"nextSibling");if(j.nextElementSibling&&!i){return j.nextElementSibling
}while(j=j.nextSibling){if(a.isElement(j)){if(!i||b(j,i)){return j}}}return null
}},{"./helpers/validate":94,"./matchesSelector":96,"ac-dom-nodes":148}],98:[function(f,g,c){var a=f("ac-dom-nodes");
var b=f("./matchesSelector");var h=f("./helpers/validate");g.exports=function d(k,i){var j=[];
h.childNode(k,true,"nextSiblings");h.selector(i,false,"nextSiblings");while(k=k.nextSibling){if(a.isElement(k)){if(!i||b(k,i)){j.push(k)
}}}return j}},{"./helpers/validate":94,"./matchesSelector":96,"ac-dom-nodes":148}],99:[function(d,f,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");f.exports=function g(j,i){h.childNode(j,true,"previousSibling");
h.selector(i,false,"previousSibling");if(j.previousElementSibling&&!i){return j.previousElementSibling
}while(j=j.previousSibling){if(a.isElement(j)){if(!i||b(j,i)){return j}}}return null
}},{"./helpers/validate":94,"./matchesSelector":96,"ac-dom-nodes":148}],100:[function(d,f,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");f.exports=function g(k,i){var j=[];
h.childNode(k,true,"previousSiblings");h.selector(i,false,"previousSiblings");while(k=k.previousSibling){if(a.isElement(k)){if(!i||b(k,i)){j.push(k)
}}}return j.reverse()}},{"./helpers/validate":94,"./matchesSelector":96,"ac-dom-nodes":148}],101:[function(b,c,a){var f=b("./helpers/validate");
c.exports=function d(g,h){h=h||document;f.parentNode(h,true,"querySelector","context");
f.selector(g,true,"querySelector");return h.querySelector(g)}},{"./helpers/validate":94}],102:[function(b,c,a){var f=b("./helpers/validate");
c.exports=function d(g,h){h=h||document;f.parentNode(h,true,"querySelectorAll","context");
f.selector(g,true,"querySelectorAll");return Array.prototype.slice.call(h.querySelectorAll(g))
}},{"./helpers/validate":94}],103:[function(d,f,c){var g=d("../vendor/sizzle/sizzle");
var b=d("ac-dom-nodes");var a=d("../helpers/nativeMatches");var h=d("../helpers/validate");
f.exports=function(j,i){if(i||!("querySelectorAll" in document)){j.querySelectorAll=function(k,m){var l;
var n;m=m||document;h.parentNode(m,true,"querySelectorAll","context");h.selector(k,true,"querySelectorAll");
if(b.isDocumentFragment(m)){l=j.children(m);n=[];l.forEach(function(p){var o;if(g.matchesSelector(p,k)){n.push(p)
}o=g(k,p);if(o.length){n=n.concat(o)}});return n}return g(k,m)};j.querySelector=function(l,m){var k;
m=m||document;h.parentNode(m,true,"querySelector","context");h.selector(l,true,"querySelector");
k=j.querySelectorAll(l,m);return k.length?k[0]:null}}if(i||!a){j.matchesSelector=function(l,k){return g.matchesSelector(l,k)
}}}},{"../helpers/nativeMatches":93,"../helpers/validate":94,"../vendor/sizzle/sizzle":105,"ac-dom-nodes":148}],104:[function(b,d,a){var c=b("./children");
var g=b("./helpers/validate");d.exports=function f(j,h){var i=[];g.childNode(j,true,"siblings");
g.selector(h,false,"siblings");if(j.parentNode){i=c(j.parentNode,h);i=i.filter(function(k){return(k!==j)
})}return i}},{"./children":90,"./helpers/validate":94}],105:[function(b,c,a){
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(ad,v){var ai,D,u,h,n,l=ad.document,o=l.documentElement,L="undefined",p=false,m=true,t=0,y=[].slice,ah=[].push,al=("sizcache"+Math.random()).replace(".",""),O="[\\x20\\t\\r\\n\\f]",x="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])",w="(?:[\\w#_-]|[^\\x00-\\xa0]|\\\\.)",aq="([*^$|!~]?=)",aa="\\["+O+"*("+x+"+)"+O+"*(?:"+aq+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+w+"+)|)|)"+O+"*\\]",ar=":("+x+"+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|(.*))\\)|)",Q=":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",s=O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*",r="(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|"+aa+"|"+ar.replace(2,7)+"|[^\\\\(),])+",aj=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),U=new RegExp("^"+s),I=new RegExp(r+"?(?="+O+"*,|$)","g"),Y=new RegExp("^(?:(?!,)(?:(?:^|,)"+O+"*"+r+")*?|"+O+"*(.*?))(\\)|$)"),ao=new RegExp(r.slice(19,-6)+"\\x20\\t\\r\\n\\f>+~])+|"+s,"g"),Z=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,ae=/[\x20\t\r\n\f]*[+~]/,am=/:not\($/,E=/h\d/i,ab=/input|select|textarea|button/i,H=/\\(?!\\)/g,T={ID:new RegExp("^#("+x+"+)"),CLASS:new RegExp("^\\.("+x+"+)"),NAME:new RegExp("^\\[name=['\"]?("+x+"+)['\"]?\\]"),TAG:new RegExp("^("+x.replace("[-","[-\\*")+"+)"),ATTR:new RegExp("^"+aa),PSEUDO:new RegExp("^"+ar),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),POS:new RegExp(Q,"ig"),needsContext:new RegExp("^"+O+"*[>+~]|"+Q,"i")},ag={},F=[],A={},J=[],an=function(at){at.sizzleFilter=true;
return at},i=function(at){return function(au){return au.nodeName.toLowerCase()==="input"&&au.type===at
}},G=function(at){return function(av){var au=av.nodeName.toLowerCase();return(au==="input"||au==="button")&&av.type===at
}},W=function(at){var au=false,aw=l.createElement("div");try{au=at(aw)}catch(av){}aw=null;
return au},C=W(function(au){au.innerHTML="<select></select>";var at=typeof au.lastChild.getAttribute("multiple");
return at!=="boolean"&&at!=="string"}),f=W(function(au){au.id=al+0;au.innerHTML="<a name='"+al+"'></a><div name='"+al+"'></div>";
o.insertBefore(au,o.firstChild);var at=l.getElementsByName&&l.getElementsByName(al).length===2+l.getElementsByName(al+0).length;
n=!l.getElementById(al);o.removeChild(au);return at}),k=W(function(at){at.appendChild(l.createComment(""));
return at.getElementsByTagName("*").length===0}),S=W(function(at){at.innerHTML="<a href='#'></a>";
return at.firstChild&&typeof at.firstChild.getAttribute!==L&&at.firstChild.getAttribute("href")==="#"
}),R=W(function(at){at.innerHTML="<div class='hidden e'></div><div class='hidden'></div>";
if(!at.getElementsByClassName||at.getElementsByClassName("e").length===0){return false
}at.lastChild.className="e";return at.getElementsByClassName("e").length!==1});
var ac=function(aw,at,ay,aB){ay=ay||[];at=at||l;var az,au,aA,av,ax=at.nodeType;
if(ax!==1&&ax!==9){return[]}if(!aw||typeof aw!=="string"){return ay}aA=z(at);if(!aA&&!aB){if((az=Z.exec(aw))){if((av=az[1])){if(ax===9){au=at.getElementById(av);
if(au&&au.parentNode){if(au.id===av){ay.push(au);return ay}}else{return ay}}else{if(at.ownerDocument&&(au=at.ownerDocument.getElementById(av))&&P(at,au)&&au.id===av){ay.push(au);
return ay}}}else{if(az[2]){ah.apply(ay,y.call(at.getElementsByTagName(aw),0));return ay
}else{if((av=az[3])&&R&&at.getElementsByClassName){ah.apply(ay,y.call(at.getElementsByClassName(av),0));
return ay}}}}}return ak(aw,at,ay,aB,aA)};var V=ac.selectors={cacheLength:50,match:T,order:["ID","TAG"],attrHandle:{},createPseudo:an,find:{ID:n?function(aw,av,au){if(typeof av.getElementById!==L&&!au){var at=av.getElementById(aw);
return at&&at.parentNode?[at]:[]}}:function(aw,av,au){if(typeof av.getElementById!==L&&!au){var at=av.getElementById(aw);
return at?at.id===aw||typeof at.getAttributeNode!==L&&at.getAttributeNode("id").value===aw?[at]:v:[]
}},TAG:k?function(at,au){if(typeof au.getElementsByTagName!==L){return au.getElementsByTagName(at)
}}:function(at,ax){var aw=ax.getElementsByTagName(at);if(at==="*"){var ay,av=[],au=0;
for(;(ay=aw[au]);au++){if(ay.nodeType===1){av.push(ay)}}return av}return aw}},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(at){at[1]=at[1].replace(H,"");
at[3]=(at[4]||at[5]||"").replace(H,"");if(at[2]==="~="){at[3]=" "+at[3]+" "}return at.slice(0,4)
},CHILD:function(at){at[1]=at[1].toLowerCase();if(at[1]==="nth"){if(!at[2]){ac.error(at[0])
}at[3]=+(at[3]?at[4]+(at[5]||1):2*(at[2]==="even"||at[2]==="odd"));at[4]=+((at[6]+at[7])||at[2]==="odd")
}else{if(at[2]){ac.error(at[0])}}return at},PSEUDO:function(at){var au,av=at[4];
if(T.CHILD.test(at[0])){return null}if(av&&(au=Y.exec(av))&&au.pop()){at[0]=at[0].slice(0,au[0].length-av.length-1);
av=au[0].slice(0,-1)}at.splice(2,3,av||at[3]);return at}},filter:{ID:n?function(at){at=at.replace(H,"");
return function(au){return au.getAttribute("id")===at}}:function(at){at=at.replace(H,"");
return function(av){var au=typeof av.getAttributeNode!==L&&av.getAttributeNode("id");
return au&&au.value===at}},TAG:function(at){if(at==="*"){return function(){return true
}}at=at.replace(H,"").toLowerCase();return function(au){return au.nodeName&&au.nodeName.toLowerCase()===at
}},CLASS:function(at){var au=ag[at];if(!au){au=ag[at]=new RegExp("(^|"+O+")"+at+"("+O+"|$)");
F.push(at);if(F.length>V.cacheLength){delete ag[F.shift()]}}return function(av){return au.test(av.className||(typeof av.getAttribute!==L&&av.getAttribute("class"))||"")
}},ATTR:function(av,au,at){if(!au){return function(aw){return ac.attr(aw,av)!=null
}}return function(ax){var aw=ac.attr(ax,av),ay=aw+"";if(aw==null){return au==="!="
}switch(au){case"=":return ay===at;case"!=":return ay!==at;case"^=":return at&&ay.indexOf(at)===0;
case"*=":return at&&ay.indexOf(at)>-1;case"$=":return at&&ay.substr(ay.length-at.length)===at;
case"~=":return(" "+ay+" ").indexOf(at)>-1;case"|=":return ay===at||ay.substr(0,at.length+1)===at+"-"
}}},CHILD:function(au,aw,ax,av){if(au==="nth"){var at=t++;return function(aB){var ay,aC,aA=0,az=aB;
if(ax===1&&av===0){return true}ay=aB.parentNode;if(ay&&(ay[al]!==at||!aB.sizset)){for(az=ay.firstChild;
az;az=az.nextSibling){if(az.nodeType===1){az.sizset=++aA;if(az===aB){break}}}ay[al]=at
}aC=aB.sizset-av;if(ax===0){return aC===0}else{return(aC%ax===0&&aC/ax>=0)}}}return function(az){var ay=az;
switch(au){case"only":case"first":while((ay=ay.previousSibling)){if(ay.nodeType===1){return false
}}if(au==="first"){return true}ay=az;case"last":while((ay=ay.nextSibling)){if(ay.nodeType===1){return false
}}return true}}},PSEUDO:function(ax,aw,au,at){var av=V.pseudos[ax]||V.pseudos[ax.toLowerCase()];
if(!av){ac.error("unsupported pseudo: "+ax)}if(!av.sizzleFilter){return av}return av(aw,au,at)
}},pseudos:{not:an(function(at,av,au){var aw=q(at.replace(aj,"$1"),av,au);return function(ax){return !aw(ax)
}}),enabled:function(at){return at.disabled===false},disabled:function(at){return at.disabled===true
},checked:function(at){var au=at.nodeName.toLowerCase();return(au==="input"&&!!at.checked)||(au==="option"&&!!at.selected)
},selected:function(at){if(at.parentNode){at.parentNode.selectedIndex}return at.selected===true
},parent:function(at){return !!at.firstChild},empty:function(at){return !at.firstChild
},contains:an(function(at){return function(au){return(au.textContent||au.innerText||d(au)).indexOf(at)>-1
}}),has:an(function(at){return function(au){return ac(at,au).length>0}}),header:function(at){return E.test(at.nodeName)
},text:function(av){var au,at;return av.nodeName.toLowerCase()==="input"&&(au=av.type)==="text"&&((at=av.getAttribute("type"))==null||at.toLowerCase()===au)
},radio:i("radio"),checkbox:i("checkbox"),file:i("file"),password:i("password"),image:i("image"),submit:G("submit"),reset:G("reset"),button:function(au){var at=au.nodeName.toLowerCase();
return at==="input"&&au.type==="button"||at==="button"},input:function(at){return ab.test(at.nodeName)
},focus:function(at){var au=at.ownerDocument;return at===au.activeElement&&(!au.hasFocus||au.hasFocus())&&!!(at.type||at.href)
},active:function(at){return at===at.ownerDocument.activeElement}},setFilters:{first:function(av,au,at){return at?av.slice(1):[av[0]]
},last:function(aw,av,au){var at=aw.pop();return au?aw:[at]},even:function(ay,ax,aw){var av=[],au=aw?1:0,at=ay.length;
for(;au<at;au=au+2){av.push(ay[au])}return av},odd:function(ay,ax,aw){var av=[],au=aw?0:1,at=ay.length;
for(;au<at;au=au+2){av.push(ay[au])}return av},lt:function(av,au,at){return at?av.slice(+au):av.slice(0,+au)
},gt:function(av,au,at){return at?av.slice(0,+au+1):av.slice(+au+1)},eq:function(aw,av,au){var at=aw.splice(+av,1);
return au?aw:at}}};V.setFilters.nth=V.setFilters.eq;V.filters=V.pseudos;if(!S){V.attrHandle={href:function(at){return at.getAttribute("href",2)
},type:function(at){return at.getAttribute("type")}}}if(f){V.order.push("NAME");
V.find.NAME=function(at,au){if(typeof au.getElementsByName!==L){return au.getElementsByName(at)
}}}if(R){V.order.splice(1,0,"CLASS");V.find.CLASS=function(av,au,at){if(typeof au.getElementsByClassName!==L&&!at){return au.getElementsByClassName(av)
}}}try{y.call(o.childNodes,0)[0].nodeType}catch(ap){y=function(au){var av,at=[];
for(;(av=this[au]);au++){at.push(av)}return at}}var z=ac.isXML=function(at){var au=at&&(at.ownerDocument||at).documentElement;
return au?au.nodeName!=="HTML":false};var P=ac.contains=o.compareDocumentPosition?function(au,at){return !!(au.compareDocumentPosition(at)&16)
}:o.contains?function(au,at){var aw=au.nodeType===9?au.documentElement:au,av=at.parentNode;
return au===av||!!(av&&av.nodeType===1&&aw.contains&&aw.contains(av))}:function(au,at){while((at=at.parentNode)){if(at===au){return true
}}return false};var d=ac.getText=function(ax){var aw,au="",av=0,at=ax.nodeType;
if(at){if(at===1||at===9||at===11){if(typeof ax.textContent==="string"){return ax.textContent
}else{for(ax=ax.firstChild;ax;ax=ax.nextSibling){au+=d(ax)}}}else{if(at===3||at===4){return ax.nodeValue
}}}else{for(;(aw=ax[av]);av++){au+=d(aw)}}return au};ac.attr=function(aw,av){var at,au=z(aw);
if(!au){av=av.toLowerCase()}if(V.attrHandle[av]){return V.attrHandle[av](aw)}if(C||au){return aw.getAttribute(av)
}at=aw.getAttributeNode(av);return at?typeof aw[av]==="boolean"?aw[av]?av:null:at.specified?at.value:null:null
};ac.error=function(at){throw new Error("Syntax error, unrecognized expression: "+at)
};[0,0].sort(function(){return(m=0)});if(o.compareDocumentPosition){u=function(au,at){if(au===at){p=true;
return 0}return(!au.compareDocumentPosition||!at.compareDocumentPosition?au.compareDocumentPosition:au.compareDocumentPosition(at)&4)?-1:1
}}else{u=function(aB,aA){if(aB===aA){p=true;return 0}else{if(aB.sourceIndex&&aA.sourceIndex){return aB.sourceIndex-aA.sourceIndex
}}var ay,au,av=[],at=[],ax=aB.parentNode,az=aA.parentNode,aC=ax;if(ax===az){return h(aB,aA)
}else{if(!ax){return -1}else{if(!az){return 1}}}while(aC){av.unshift(aC);aC=aC.parentNode
}aC=az;while(aC){at.unshift(aC);aC=aC.parentNode}ay=av.length;au=at.length;for(var aw=0;
aw<ay&&aw<au;aw++){if(av[aw]!==at[aw]){return h(av[aw],at[aw])}}return aw===ay?h(aB,at[aw],-1):h(av[aw],aA,1)
};h=function(au,at,av){if(au===at){return av}var aw=au.nextSibling;while(aw){if(aw===at){return -1
}aw=aw.nextSibling}return 1}}ac.uniqueSort=function(au){var av,at=1;if(u){p=m;au.sort(u);
if(p){for(;(av=au[at]);at++){if(av===au[at-1]){au.splice(at--,1)}}}}return au};
function B(au,ay,ax,av){var aw=0,at=ay.length;for(;aw<at;aw++){ac(au,ay[aw],ax,av)
}}function X(at,av,az,aA,au,ay){var aw,ax=V.setFilters[av.toLowerCase()];if(!ax){ac.error(av)
}if(at||!(aw=au)){B(at||"*",aA,(aw=[]),au)}return aw.length>0?ax(aw,az,ay):[]}function af(aD,at,aB,av,aH){var ay,au,ax,aJ,aA,aI,aC,aG,aE=0,aF=aH.length,aw=T.POS,az=new RegExp("^"+aw.source+"(?!"+O+")","i"),aK=function(){var aM=1,aL=arguments.length-2;
for(;aM<aL;aM++){if(arguments[aM]===v){ay[aM]=v}}};for(;aE<aF;aE++){aw.exec("");
aD=aH[aE];aJ=[];ax=0;aA=av;while((ay=aw.exec(aD))){aG=aw.lastIndex=ay.index+ay[0].length;
if(aG>ax){aC=aD.slice(ax,ay.index);ax=aG;aI=[at];if(U.test(aC)){if(aA){aI=aA}aA=av
}if((au=am.test(aC))){aC=aC.slice(0,-5).replace(U,"$&*")}if(ay.length>1){ay[0].replace(az,aK)
}aA=X(aC,ay[1],ay[2],aI,aA,au)}}if(aA){aJ=aJ.concat(aA);if((aC=aD.slice(ax))&&aC!==")"){B(aC,aJ,aB,av)
}else{ah.apply(aB,aJ)}}else{ac(aD,at,aB,av)}}return aF===1?aB:ac.uniqueSort(aB)
}function g(az,av,aC){var aE,aD,aF,ax=[],aA=0,aB=Y.exec(az),au=!aB.pop()&&!aB.pop(),aG=au&&az.match(I)||[""],at=V.preFilter,aw=V.filter,ay=!aC&&av!==l;
for(;(aD=aG[aA])!=null&&au;aA++){ax.push(aE=[]);if(ay){aD=" "+aD}while(aD){au=false;
if((aB=U.exec(aD))){aD=aD.slice(aB[0].length);au=aE.push({part:aB.pop().replace(aj," "),captures:aB})
}for(aF in aw){if((aB=T[aF].exec(aD))&&(!at[aF]||(aB=at[aF](aB,av,aC)))){aD=aD.slice(aB.shift().length);
au=aE.push({part:aF,captures:aB})}}if(!au){break}}}if(!au){ac.error(az)}return ax
}function M(ax,aw,av){var at=aw.dir,au=t++;if(!ax){ax=function(ay){return ay===av
}}return aw.first?function(az,ay){while((az=az[at])){if(az.nodeType===1){return ax(az,ay)&&az
}}}:function(aA,az){var ay,aB=au+"."+D,aC=aB+"."+ai;while((aA=aA[at])){if(aA.nodeType===1){if((ay=aA[al])===aC){return false
}else{if(typeof ay==="string"&&ay.indexOf(aB)===0){if(aA.sizset){return aA}}else{aA[al]=aC;
if(ax(aA,az)){aA.sizset=true;return aA}aA.sizset=false}}}}}}function K(at,au){return at?function(ax,aw){var av=au(ax,aw);
return av&&at(av===true?ax:av,aw)}:au}function N(ay,aw,at){var av,ax,au=0;for(;
(av=ay[au]);au++){if(V.relative[av.part]){ax=M(ax,V.relative[av.part],aw)}else{av.captures.push(aw,at);
ax=K(ax,V.filter[av.part].apply(null,av.captures))}}return ax}function j(at){return function(aw,av){var ax,au=0;
for(;(ax=at[au]);au++){if(ax(aw,av)){return true}}return false}}var q=ac.compile=function(at,aw,au){var az,ay,av,ax=A[at];
if(ax&&ax.context===aw){ax.dirruns++;return ax}ay=g(at,aw,au);for(av=0;(az=ay[av]);
av++){ay[av]=N(az,aw,au)}ax=A[at]=j(ay);ax.context=aw;ax.runs=ax.dirruns=0;J.push(at);
if(J.length>V.cacheLength){delete A[J.shift()]}return ax};ac.matches=function(au,at){return ac(au,null,null,at)
};ac.matchesSelector=function(at,au){return ac(au,null,null,[at]).length>0};var ak=function(ax,au,az,aD,aC){ax=ax.replace(aj,"$1");
var at,aE,aA,aF,av,aw,aH,aI,ay,aB=ax.match(I),aG=ax.match(ao),aJ=au.nodeType;if(T.POS.test(ax)){return af(ax,au,az,aD,aB)
}if(aD){at=y.call(aD,0)}else{if(aB&&aB.length===1){if(aG.length>1&&aJ===9&&!aC&&(aB=T.ID.exec(aG[0]))){au=V.find.ID(aB[1],au,aC)[0];
if(!au){return az}ax=ax.slice(aG.shift().length)}aI=((aB=ae.exec(aG[0]))&&!aB.index&&au.parentNode)||au;
ay=aG.pop();aw=ay.split(":not")[0];for(aA=0,aF=V.order.length;aA<aF;aA++){aH=V.order[aA];
if((aB=T[aH].exec(aw))){at=V.find[aH]((aB[1]||"").replace(H,""),aI,aC);if(at==null){continue
}if(aw===ay){ax=ax.slice(0,ax.length-ay.length)+aw.replace(T[aH],"");if(!ax){ah.apply(az,y.call(at,0))
}}break}}}}if(ax){aE=q(ax,au,aC);D=aE.dirruns;if(at==null){at=V.find.TAG("*",(ae.test(ax)&&au.parentNode)||au)
}for(aA=0;(av=at[aA]);aA++){ai=aE.runs++;if(aE(av,au)){az.push(av)}}}return az};
if(l.querySelectorAll){(function(){var ay,az=ak,ax=/'|\\/g,av=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,au=[],at=[":active"],aw=o.matchesSelector||o.mozMatchesSelector||o.webkitMatchesSelector||o.oMatchesSelector||o.msMatchesSelector;
W(function(aA){aA.innerHTML="<select><option selected></option></select>";if(!aA.querySelectorAll("[selected]").length){au.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
}if(!aA.querySelectorAll(":checked").length){au.push(":checked")}});W(function(aA){aA.innerHTML="<p test=''></p>";
if(aA.querySelectorAll("[test^='']").length){au.push("[*^$]="+O+"*(?:\"\"|'')")
}aA.innerHTML="<input type='hidden'>";if(!aA.querySelectorAll(":enabled").length){au.push(":enabled",":disabled")
}});au=au.length&&new RegExp(au.join("|"));ak=function(aF,aB,aG,aI,aH){if(!aI&&!aH&&(!au||!au.test(aF))){if(aB.nodeType===9){try{ah.apply(aG,y.call(aB.querySelectorAll(aF),0));
return aG}catch(aE){}}else{if(aB.nodeType===1&&aB.nodeName.toLowerCase()!=="object"){var aD=aB.getAttribute("id"),aA=aD||al,aC=ae.test(aF)&&aB.parentNode||aB;
if(aD){aA=aA.replace(ax,"\\$&")}else{aB.setAttribute("id",aA)}try{ah.apply(aG,y.call(aC.querySelectorAll(aF.replace(I,"[id='"+aA+"'] $&")),0));
return aG}catch(aE){}finally{if(!aD){aB.removeAttribute("id")}}}}}return az(aF,aB,aG,aI,aH)
};if(aw){W(function(aB){ay=aw.call(aB,"div");try{aw.call(aB,"[test!='']:sizzle");
at.push(V.match.PSEUDO)}catch(aA){}});at=new RegExp(at.join("|"));ac.matchesSelector=function(aB,aD){aD=aD.replace(av,"='$1']");
if(!z(aB)&&!at.test(aD)&&(!au||!au.test(aD))){try{var aA=aw.call(aB,aD);if(aA||ay||aB.document&&aB.document.nodeType!==11){return aA
}}catch(aC){}}return ac(aD,null,null,[aB]).length>0}}})()}if(typeof c==="object"&&c.exports){c.exports=ac
}else{ad.Sizzle=ac}})(window)},{}],106:[function(b,c,a){c.exports={DOMEmitter:b("./ac-dom-emitter/DOMEmitter")}
},{"./ac-dom-emitter/DOMEmitter":107}],107:[function(c,b,d){var f;var k=c("ac-event-emitter").EventEmitter,j=c("./DOMEmitterEvent"),g=c("ac-dom-events"),a=c("ac-dom-traversal");
var i="dom-emitter";function h(l){if(l===null){return}this.el=l;this._bindings={};
this._delegateFuncs={};this._eventEmitter=new k()}f=h.prototype;f.on=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._on);
return this};f.once=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._once);
return this};f.off=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._off);
return this};f.has=function(l,q,p,n){var o,r;if(typeof q==="string"){o=q;r=p}else{r=q;
n=p}if(o){var m=this._getDelegateFuncBindingIdx(l,o,r,n,true);if(m>-1){return true
}return false}if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};f.trigger=function(n,m,o,s){n=this._parseEventNames(n);n=this._cleanStringData(n);
var q,r,p,l=n.length;if(typeof m==="string"){q=this._cleanStringData(m);r=o}else{r=m;
s=o}for(p=0;p<l;p++){this._triggerDOMEvents(n[p],r,q)}return this};f.emitterTrigger=function(m,o,p){if(!this._eventEmitter){return this
}m=this._parseEventNames(m);m=this._cleanStringData(m);o=new j(o,this);var n,l=m.length;
for(n=0;n<l;n++){this._eventEmitter.trigger(m[n],o,p)}return this};f.propagateTo=function(l,m){this._eventEmitter.propagateTo(l,m);
return this};f.stopPropagatingTo=function(l){this._eventEmitter.stopPropagatingTo(l);
return this};f.stopImmediatePropagation=function(){this._eventEmitter.stopImmediatePropagation();
return this};f.destroy=function(){this._triggerInternalEvent("willdestroy");this.off();
var l;for(l in this){if(this.hasOwnProperty(l)){this[l]=null}}};f._parseEventNames=function(l){if(!l){return[l]
}return l.split(" ")};f._onListenerEvent=function(n,m){var l=new j(m,this);this._eventEmitter.trigger(n,l,false)
};f._setListener=function(l){this._bindings[l]=this._onListenerEvent.bind(this,l);
g.addEventListener(this.el,l,this._bindings[l])};f._removeListener=function(l){g.removeEventListener(this.el,l,this._bindings[l]);
this._bindings[l]=null};f._triggerInternalEvent=function(l,m){this.emitterTrigger(i+":"+l,m)
};f._normalizeArgumentsAndCall=function(l,n){var r={};if(l.length===0){n.call(this,r);
return}if(typeof l[0]==="string"||l[0]===null){l=this._cleanStringData(l);r.events=l[0];
if(typeof l[1]==="string"){r.delegateQuery=l[1];r.callback=l[2];r.context=l[3]}else{r.callback=l[1];
r.context=l[2]}n.call(this,r);return}var m,p,q=":",o=l[0];for(m in o){if(o.hasOwnProperty(m)){r={};
p=this._cleanStringData(m.split(q));r.events=p[0];r.delegateQuery=p[1];r.callback=o[m];
r.context=l[1];n.call(this,r)}}};f._registerDelegateFunc=function(n,p,q,l,o){var m=this._delegateFunc.bind(this,n,p,q,o);
this._delegateFuncs[p]=this._delegateFuncs[p]||{};this._delegateFuncs[p][n]=this._delegateFuncs[p][n]||[];
this._delegateFuncs[p][n].push({func:l,context:o,delegateFunc:m});return m};f._cleanStringData=function(o){var n=false;
if(typeof o==="string"){o=[o];n=true}var m=[],q,s,r,p,l=o.length;for(q=0;q<l;q++){s=o[q];
if(typeof s==="string"){if(s===""||s===" "){continue}r=s.length;while(s[0]===" "){s=s.slice(1,r);
r--}while(s[r-1]===" "){s=s.slice(0,r-1);r--}}m.push(s)}if(n){return m[0]}return m
};f._unregisterDelegateFunc=function(n,q,l,p){if(!this._delegateFuncs[q]||!this._delegateFuncs[q][n]){return
}var o=this._getDelegateFuncBindingIdx(n,q,l,p),m;if(o>-1){m=this._delegateFuncs[q][n][o].delegateFunc;
this._delegateFuncs[q][n].splice(o,1);if(this._delegateFuncs[q][n].length===0){this._delegateFuncs[q][n]=null
}}return m};f._unregisterDelegateFuncs=function(l,n){if(!this._delegateFuncs[n]){return
}if(l!==null&&!this._delegateFuncs[n][l]){return}if(l===null){var m;for(m in this._delegateFuncs[n]){if(this._delegateFuncs[n].hasOwnProperty(m)){this._unbindDelegateFunc(m,n)
}}return}this._unbindDelegateFunc(l,n)};f._unbindDelegateFunc=function(l,n){var o,p,m=0;
while(this._delegateFuncs[n][l]&&this._delegateFuncs[n][l][m]){o=this._delegateFuncs[n][l][m];
p=this._delegateFuncs[n][l][m].length;this._off({events:l,delegateQuery:n,callback:o.func,context:o.context});
if(this._delegateFuncs[n][l]&&p===this._delegateFuncs[n][l].length){m++}}o=p=null
};f._unregisterDelegateFuncsByEvent=function(l){var m;for(m in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(m)){this._unregisterDelegateFuncs(l,m)
}}};f._delegateFunc=function(l,p,r,n,q){if(this._targetHasDelegateAncestor(q.target,p)){var m=Array.prototype.slice.call(arguments,0),o=m.slice(4,m.length);
n=n||window;if(typeof q.detail==="object"){o[0]=q.detail}r.apply(n,o)}};f._targetHasDelegateAncestor=function(n,m){var l=n;
while(l&&l!==this.el&&l!==document.documentElement){if(a.matchesSelector(l,m)){return true
}l=l.parentNode}return false};f._on=function(p){var m=p.events,q=p.callback,o=p.delegateQuery,n=p.context,l=p.unboundCallback||q;
m=this._parseEventNames(m);m.forEach(function(v,r,t,u,s){if(!this.has(s)){this._setListener(s)
}if(typeof u==="string"){v=this._registerDelegateFunc(s,u,v,r,t)}this._triggerInternalEvent("willon",{evt:s,callback:v,context:t,delegateQuery:u});
this._eventEmitter.on(s,v,t);this._triggerInternalEvent("didon",{evt:s,callback:v,context:t,delegateQuery:u})
}.bind(this,q,l,n,o));m=q=l=o=n=null};f._off=function(q){var m=q.events,r=q.callback,p=q.delegateQuery,o=q.context,l=q.unboundCallback||r;
if(typeof m==="undefined"){this._eventEmitter.off();var n;for(n in this._bindings){if(this._bindings.hasOwnProperty(n)){this._removeListener(n)
}}for(n in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(n)){this._delegateFuncs[n]=null
}}return}m=this._parseEventNames(m);m.forEach(function(w,s,u,v,t){if(typeof v==="string"&&typeof s==="function"){w=this._unregisterDelegateFunc(t,v,s,u);
if(!w){return}}if(typeof v==="string"&&typeof w==="undefined"){this._unregisterDelegateFuncs(t,v);
return}if(typeof t==="string"&&typeof w==="undefined"){this._unregisterDelegateFuncsByEvent(t);
if(typeof v==="string"){return}}this._triggerInternalEvent("willoff",{evt:t,callback:w,context:u,delegateQuery:v});
this._eventEmitter.off(t,w,u);this._triggerInternalEvent("didoff",{evt:t,callback:w,context:u,delegateQuery:v});
if(!this.has(t)){this._removeListener(t)}}.bind(this,r,l,o,p));m=r=l=p=o=null};
f._once=function(o){var l=o.events,p=o.callback,n=o.delegateQuery,m=o.context;l=this._parseEventNames(l);
l.forEach(function(t,r,s,q){if(typeof s==="string"){return this._handleDelegateOnce(q,t,r,s)
}if(!this.has(q)){this._setListener(q)}this._triggerInternalEvent("willonce",{evt:q,callback:t,context:r,delegateQuery:s});
this._eventEmitter.once.call(this,q,t,r);this._triggerInternalEvent("didonce",{evt:q,callback:t,context:r,delegateQuery:s})
}.bind(this,p,m,n));l=p=n=m=null};f._handleDelegateOnce=function(l,o,m,n){this._triggerInternalEvent("willonce",{evt:l,callback:o,context:m,delegateQuery:n});
this._on({events:l,context:m,delegateQuery:n,callback:this._getDelegateOnceCallback.bind(this,l,o,m,n),unboundCallback:o});
this._triggerInternalEvent("didonce",{evt:l,callback:o,context:m,delegateQuery:n});
return this};f._getDelegateOnceCallback=function(l,q,n,p){var m=Array.prototype.slice.call(arguments,0),o=m.slice(4,m.length);
q.apply(n,o);this._off({events:l,delegateQuery:p,callback:q,context:n})};f._getDelegateFuncBindingIdx=function(s,p,n,l,t){var r=-1;
if(this._delegateFuncs[p]&&this._delegateFuncs[p][s]){var o,m,q=this._delegateFuncs[p][s].length;
for(o=0;o<q;o++){m=this._delegateFuncs[p][s][o];if(t&&typeof n==="undefined"){n=m.func
}if(m.func===n&&m.context===l){r=o;break}}}return r};f._triggerDOMEvents=function(n,q,p){var m=[this.el];
if(p){m=a.querySelectorAll(p,this.el)}var o,r,l=m.length;for(o=0;o<l;o++){g.dispatchEvent(m[o],n,{bubbles:true,cancelable:true,detail:q})
}};b.exports=h},{"./DOMEmitterEvent":108,"ac-dom-events":79,"ac-dom-traversal":87,"ac-event-emitter":false}],108:[function(b,c,a){var f=b("ac-dom-events");
var d;var g=function(i,h){this._domEmitter=h;this.originalEvent=i||{};this._originalTarget=f.target(this.originalEvent);
this.target=this._originalTarget||this._domEmitter.el;this.currentTarget=this._domEmitter.el;
this.timeStamp=this.originalEvent.timeStamp||Date.now();if(this._isDOMEvent(this.originalEvent)){if(typeof this.originalEvent.detail==="object"){this.data=this.originalEvent.detail
}}else{if(i){this.data=this.originalEvent;this.originalEvent={}}}};d=g.prototype;
d.preventDefault=function(){f.preventDefault(this.originalEvent)};d.stopPropagation=function(){f.stopPropagation(this.originalEvent)
};d.stopImmediatePropagation=function(){if(this.originalEvent.stopImmediatePropagation){this.originalEvent.stopImmediatePropagation()
}this._domEmitter.stopImmediatePropagation()};d._isDOMEvent=function(h){if(this._originalTarget||(document.createEvent!=="undefined"&&typeof CustomEvent!=="undefined"&&h instanceof CustomEvent)){return true
}return false};c.exports=g},{"ac-dom-events":79}],109:[function(c,d,b){var g=c("./utils/addEventListener");
var a=c("./shared/getEventType");d.exports=function f(k,i,j,h){i=a(k,i);return g(k,i,j,h)
}},{"./shared/getEventType":120,"./utils/addEventListener":124}],110:[function(d,f,c){var a=d("./utils/dispatchEvent");
var b=d("./shared/getEventType");f.exports=function g(j,i,h){i=b(j,i);return a(j,i,h)
}},{"./shared/getEventType":120,"./utils/dispatchEvent":125}],111:[function(b,c,a){c.exports={addEventListener:b("./addEventListener"),dispatchEvent:b("./dispatchEvent"),preventDefault:b("./preventDefault"),removeEventListener:b("./removeEventListener"),stop:b("./stop"),stopPropagation:b("./stopPropagation"),target:b("./target")}
},{"./addEventListener":109,"./dispatchEvent":110,"./preventDefault":118,"./removeEventListener":119,"./stop":121,"./stopPropagation":122,"./target":123}],112:[function(b,c,a){if(document.createEvent){try{new window.CustomEvent("click")
}catch(d){window.CustomEvent=(function(){function f(h,i){i=i||{bubbles:false,cancelable:false,detail:undefined};
var g=document.createEvent("CustomEvent");g.initCustomEvent(h,i.bubbles,i.cancelable,i.detail);
return g}f.prototype=window.Event.prototype;return f}())}}},{}],113:[function(d,b,f){var g=d("./utils/eventTypeAvailable");
var j=d("./shared/camelCasedEventTypes");var c=d("./shared/windowFallbackEventTypes");
var h=d("./shared/prefixHelper");var a={};b.exports=function i(m,l){var n;var o;
var k;l=l||"div";m=m.toLowerCase();if(!(l in a)){a[l]={}}o=a[l];if(m in o){return o[m]
}if(g(m,l)){return o[m]=m}if(m in j){for(k=0;k<j[m].length;k++){n=j[m][k];if(g(n.toLowerCase(),l)){return o[m]=n
}}}for(k=0;k<h.evt.length;k++){n=h.evt[k]+m;if(g(n,l)){h.reduce(k);return o[m]=n
}}if(l!=="window"&&c.indexOf(m)){return o[m]=i(m,"window")}return o[m]=false}},{"./shared/camelCasedEventTypes":114,"./shared/prefixHelper":115,"./shared/windowFallbackEventTypes":116,"./utils/eventTypeAvailable":117}],114:[function(b,c,a){c.exports={transitionend:["webkitTransitionEnd","MSTransitionEnd"],animationstart:["webkitAnimationStart","MSAnimationStart"],animationend:["webkitAnimationEnd","MSAnimationEnd"],animationiteration:["webkitAnimationIteration","MSAnimationIteration"],fullscreenchange:["MSFullscreenChange"],fullscreenerror:["MSFullscreenError"]}
},{}],115:[function(b,d,a){var i=["-webkit-","-moz-","-ms-"];var f=["Webkit","Moz","ms"];
var h=["webkit","moz","ms"];var c=function(){this.initialize()};var g=c.prototype;
g.initialize=function(){this.reduced=false;this.css=i;this.dom=f;this.evt=h};g.reduce=function(j){if(!this.reduced){this.reduced=true;
this.css=[this.css[j]];this.dom=[this.dom[j]];this.evt=[this.evt[j]]}};d.exports=new c()
},{}],116:[function(b,c,a){c.exports=["transitionend","animationstart","animationend","animationiteration"]
},{}],117:[function(c,f,b){var a={window:window,document:document};f.exports=function d(i,g){var h;
i="on"+i;if(!(g in a)){a[g]=document.createElement(g)}h=a[g];if(i in h){return true
}if("setAttribute" in h){h.setAttribute(i,"return;");return(typeof h[i]==="function")
}return false}},{}],118:[function(b,c,a){c.exports=b(82)},{}],119:[function(d,f,c){var b=d("./utils/removeEventListener");
var a=d("./shared/getEventType");f.exports=function g(k,i,j,h){i=a(k,i);return b(k,i,j,h)
}},{"./shared/getEventType":120,"./utils/removeEventListener":126}],120:[function(c,f,b){var d=c("ac-prefixer/getEventType");
f.exports=function a(j,i){var h;var g;if("tagName" in j){h=j.tagName}else{if(j===window){h="window"
}else{h="document"}}g=d(i,h);if(g){return g}return i}},{"ac-prefixer/getEventType":113}],121:[function(b,c,a){c.exports=b(84)
},{"./preventDefault":118,"./stopPropagation":122}],122:[function(b,c,a){c.exports=b(85)
},{}],123:[function(b,c,a){c.exports=function d(f){f=f||window.event;return(typeof f.target!=="undefined")?f.target:f.srcElement
}},{}],124:[function(b,c,a){c.exports=function d(i,g,h,f){if(i.addEventListener){i.addEventListener(g,h,!!f)
}else{i.attachEvent("on"+g,h)}return i}},{}],125:[function(b,c,a){b("ac-polyfills/CustomEvent");
c.exports=function d(i,h,g){var f;if(i.dispatchEvent){if(g){f=new CustomEvent(h,g)
}else{f=new CustomEvent(h)}i.dispatchEvent(f)}else{f=document.createEventObject();
if(g&&"detail" in g){f.detail=g.detail}i.fireEvent("on"+h,f)}return i}},{"ac-polyfills/CustomEvent":112}],126:[function(b,c,a){c.exports=function d(i,g,h,f){if(i.removeEventListener){i.removeEventListener(g,h,!!f)
}else{i.detachEvent("on"+g,h)}return i}},{}],127:[function(d,f,c){var b=d("./utils/getBoundingClientRect");
f.exports=function a(g,i){var h=1;if(i){h=b(g).width/g.offsetWidth}return{width:g.scrollWidth*h,height:g.scrollHeight*h}
}},{"./utils/getBoundingClientRect":138}],128:[function(d,f,c){var b=d("./utils/getBoundingClientRect");
f.exports=function a(g,i){var h;if(i){h=b(g);return{width:h.width,height:h.height}
}return{width:g.offsetWidth,height:g.offsetHeight}}},{"./utils/getBoundingClientRect":138}],129:[function(g,h,f){var c=g("./getDimensions");
var d=g("./utils/getBoundingClientRect");var b=g("./getScrollX");var a=g("./getScrollY");
h.exports=function i(j,p){var l;var o;var m;var k;var n;if(p){l=d(j);o=b();m=a();
return{top:l.top+m,right:l.right+o,bottom:l.bottom+m,left:l.left+o}}k=c(j,p);l={top:j.offsetTop,left:j.offsetLeft,width:k.width,height:k.height};
while(j=j.offsetParent){l.top+=j.offsetTop;l.left+=j.offsetLeft}return{top:l.top,right:l.left+l.width,bottom:l.top+l.height,left:l.left}
}},{"./getDimensions":128,"./getScrollX":133,"./getScrollY":134,"./utils/getBoundingClientRect":138}],130:[function(c,f,b){var a=c("./getDimensions");
var g=c("./getPixelsInViewport");f.exports=function d(j,k){var i=g(j,k);var h=a(j,k).height;
return(i/h)}},{"./getDimensions":128,"./getPixelsInViewport":131}],131:[function(c,d,b){var a=c("./getViewportPosition");
d.exports=function f(h,k){var j=document.documentElement.clientHeight;var g=a(h,k);
var i;if(g.top>=j||g.bottom<=0){return 0}i=(g.bottom-g.top);if(g.top<0){i+=g.top
}if(g.bottom>j){i-=g.bottom-j}return i}},{"./getViewportPosition":135}],132:[function(d,f,c){var a=d("./getDimensions");
var b=d("./utils/getBoundingClientRect");f.exports=function g(i,l){var k;var h;
var j;if(l){k=b(i);if(i.offsetParent){h=b(i.offsetParent);k.top-=h.top;k.left-=h.left
}}else{j=a(i,l);k={top:i.offsetTop,left:i.offsetLeft,width:j.width,height:j.height}
}return{top:k.top,right:k.left+k.width,bottom:k.top+k.height,left:k.left}}},{"./getDimensions":128,"./utils/getBoundingClientRect":138}],133:[function(c,d,b){d.exports=function a(f){var g;
f=f||window;if(f===window){g=window.pageXOffset;if(!g){f=document.documentElement||document.body.parentNode||document.body
}else{return g}}return f.scrollLeft}},{}],134:[function(c,d,b){d.exports=function a(f){var g;
f=f||window;if(f===window){g=window.pageYOffset;if(!g){f=document.documentElement||document.body.parentNode||document.body
}else{return g}}return f.scrollTop}},{}],135:[function(g,h,f){var i=g("./getPagePosition");
var d=g("./utils/getBoundingClientRect");var c=g("./getScrollX");var b=g("./getScrollY");
h.exports=function a(k,n){var j;var m;var l;if(n){j=d(k);return{top:j.top,right:j.right,bottom:j.bottom,left:j.left}
}j=i(k);m=c();l=b();return{top:j.top-l,right:j.right-m,bottom:j.bottom-l,left:j.left-m}
}},{"./getPagePosition":129,"./getScrollX":133,"./getScrollY":134,"./utils/getBoundingClientRect":138}],136:[function(b,c,a){c.exports={getContentDimensions:b("./getContentDimensions"),getDimensions:b("./getDimensions"),getPagePosition:b("./getPagePosition"),getPercentInViewport:b("./getPercentInViewport"),getPixelsInViewport:b("./getPixelsInViewport"),getPosition:b("./getPosition"),getScrollX:b("./getScrollX"),getScrollY:b("./getScrollY"),getViewportPosition:b("./getViewportPosition"),isInViewport:b("./isInViewport")}
},{"./getContentDimensions":127,"./getDimensions":128,"./getPagePosition":129,"./getPercentInViewport":130,"./getPixelsInViewport":131,"./getPosition":132,"./getScrollX":133,"./getScrollY":134,"./getViewportPosition":135,"./isInViewport":137}],137:[function(b,d,a){var g=b("./getPixelsInViewport");
var c=b("./getPercentInViewport");d.exports=function f(j,k,h){var i;h=h||0;if(typeof h==="string"&&h.slice(-2)==="px"){h=parseInt(h,10);
i=g(j,k)}else{i=c(j,k)}return(i>0&&i>=h)}},{"./getPercentInViewport":130,"./getPixelsInViewport":131}],138:[function(c,d,b){d.exports=function a(f){var g=f.getBoundingClientRect();
return{top:g.top,right:g.right,bottom:g.bottom,left:g.left,width:g.width||g.right-g.left,height:g.height||g.bottom-g.top}
}},{}],139:[function(b,c,a){c.exports=8},{}],140:[function(b,c,a){c.exports=11},{}],141:[function(b,c,a){c.exports=9
},{}],142:[function(b,c,a){c.exports=10},{}],143:[function(b,c,a){c.exports=1},{}],144:[function(b,c,a){c.exports=3
},{}],145:[function(c,d,b){d.exports=function a(g){var f=document.createDocumentFragment();
var h;if(g){h=document.createElement("div");h.innerHTML=g;while(h.firstChild){f.appendChild(h.firstChild)
}}return f}},{}],146:[function(d,f,c){d("ac-polyfills/Array/prototype.slice");d("ac-polyfills/Array/prototype.filter");
var g=d("./internal/isNodeType");var a=d("./ELEMENT_NODE");f.exports=function b(i,h){h=h||a;
i=Array.prototype.slice.call(i);return i.filter(function(j){return g(j,h)})}},{"./ELEMENT_NODE":143,"./internal/isNodeType":154,"ac-polyfills/Array/prototype.filter":164,"ac-polyfills/Array/prototype.slice":166}],147:[function(c,d,a){d.exports=function b(g,f){if("hasAttribute" in g){return g.hasAttribute(f)
}return(g.attributes.getNamedItem(f)!==null)}},{}],148:[function(b,c,a){c.exports={createDocumentFragment:b("./createDocumentFragment"),filterByNodeType:b("./filterByNodeType"),hasAttribute:b("./hasAttribute"),indexOf:b("./indexOf"),insertAfter:b("./insertAfter"),insertBefore:b("./insertBefore"),insertFirstChild:b("./insertFirstChild"),insertLastChild:b("./insertLastChild"),isComment:b("./isComment"),isDocument:b("./isDocument"),isDocumentFragment:b("./isDocumentFragment"),isDocumentType:b("./isDocumentType"),isElement:b("./isElement"),isNode:b("./isNode"),isNodeList:b("./isNodeList"),isTextNode:b("./isTextNode"),remove:b("./remove"),replace:b("./replace"),COMMENT_NODE:b("./COMMENT_NODE"),DOCUMENT_FRAGMENT_NODE:b("./DOCUMENT_FRAGMENT_NODE"),DOCUMENT_NODE:b("./DOCUMENT_NODE"),DOCUMENT_TYPE_NODE:b("./DOCUMENT_TYPE_NODE"),ELEMENT_NODE:b("./ELEMENT_NODE"),TEXT_NODE:b("./TEXT_NODE")}
},{"./COMMENT_NODE":139,"./DOCUMENT_FRAGMENT_NODE":140,"./DOCUMENT_NODE":141,"./DOCUMENT_TYPE_NODE":142,"./ELEMENT_NODE":143,"./TEXT_NODE":144,"./createDocumentFragment":145,"./filterByNodeType":146,"./hasAttribute":147,"./indexOf":149,"./insertAfter":150,"./insertBefore":151,"./insertFirstChild":152,"./insertLastChild":153,"./isComment":156,"./isDocument":157,"./isDocumentFragment":158,"./isDocumentType":159,"./isElement":160,"./isNode":161,"./isNodeList":162,"./isTextNode":163,"./remove":167,"./replace":168}],149:[function(c,d,b){c("ac-polyfills/Array/prototype.indexOf");
c("ac-polyfills/Array/prototype.slice");var g=c("./internal/validate");var a=c("./filterByNodeType");
d.exports=function f(k,i){var h=k.parentNode;var j;if(!h){return 0}j=h.childNodes;
if(i!==false){j=a(j,i)}else{j=Array.prototype.slice.call(j)}return j.indexOf(k)
}},{"./filterByNodeType":146,"./internal/validate":155,"ac-polyfills/Array/prototype.indexOf":165,"ac-polyfills/Array/prototype.slice":166}],150:[function(b,c,a){var f=b("./internal/validate");
c.exports=function d(g,h){f.insertNode(g,true,"insertAfter");f.childNode(h,true,"insertAfter");
f.hasParentNode(h,"insertAfter");if(!h.nextSibling){return h.parentNode.appendChild(g)
}return h.parentNode.insertBefore(g,h.nextSibling)}},{"./internal/validate":155}],151:[function(c,d,a){var f=c("./internal/validate");
d.exports=function b(g,h){f.insertNode(g,true,"insertBefore");f.childNode(h,true,"insertBefore");
f.hasParentNode(h,"insertBefore");return h.parentNode.insertBefore(g,h)}},{"./internal/validate":155}],152:[function(c,d,b){var f=c("./internal/validate");
d.exports=function a(g,h){f.insertNode(g,true,"insertFirstChild");f.parentNode(h,true,"insertFirstChild");
if(!h.firstChild){return h.appendChild(g)}return h.insertBefore(g,h.firstChild)
}},{"./internal/validate":155}],153:[function(b,c,a){var d=b("./internal/validate");
c.exports=function f(g,h){d.insertNode(g,true,"insertLastChild");d.parentNode(h,true,"insertLastChild");
return h.appendChild(g)}},{"./internal/validate":155}],154:[function(b,c,a){var d=b("../isNode");
c.exports=function f(h,g){if(!d(h)){return false}if(typeof g==="number"){return(h.nodeType===g)
}return(g.indexOf(h.nodeType)!==-1)}},{"../isNode":161}],155:[function(g,d,j){var b=g("./isNodeType");
var c=g("../COMMENT_NODE");var k=g("../DOCUMENT_FRAGMENT_NODE");var i=g("../ELEMENT_NODE");
var h=g("../TEXT_NODE");var m=[i,h,c,k];var f=" must be an Element, TextNode, Comment, or Document Fragment";
var p=[i,h,c];var l=" must be an Element, TextNode, or Comment";var n=[i,k];var o=" must be an Element, or Document Fragment";
var a=" must have a parentNode";d.exports={parentNode:function(q,t,s,r){r=r||"target";
if((q||t)&&!b(q,n)){throw new TypeError(s+": "+r+o)}},childNode:function(q,t,s,r){r=r||"target";
if(!q&&!t){return}if(!b(q,p)){throw new TypeError(s+": "+r+l)}},insertNode:function(q,t,s,r){r=r||"node";
if(!q&&!t){return}if(!b(q,m)){throw new TypeError(s+": "+r+f)}},hasParentNode:function(q,s,r){r=r||"target";
if(!q.parentNode){throw new TypeError(s+": "+r+a)}}}},{"../COMMENT_NODE":139,"../DOCUMENT_FRAGMENT_NODE":140,"../ELEMENT_NODE":143,"../TEXT_NODE":144,"./isNodeType":154}],156:[function(c,d,a){var g=c("./internal/isNodeType");
var f=c("./COMMENT_NODE");d.exports=function b(h){return g(h,f)}},{"./COMMENT_NODE":139,"./internal/isNodeType":154}],157:[function(c,d,b){var g=c("./internal/isNodeType");
var a=c("./DOCUMENT_NODE");d.exports=function f(h){return g(h,a)}},{"./DOCUMENT_NODE":141,"./internal/isNodeType":154}],158:[function(c,d,b){var g=c("./internal/isNodeType");
var a=c("./DOCUMENT_FRAGMENT_NODE");d.exports=function f(h){return g(h,a)}},{"./DOCUMENT_FRAGMENT_NODE":140,"./internal/isNodeType":154}],159:[function(b,c,a){var g=b("./internal/isNodeType");
var f=b("./DOCUMENT_TYPE_NODE");c.exports=function d(h){return g(h,f)}},{"./DOCUMENT_TYPE_NODE":142,"./internal/isNodeType":154}],160:[function(c,d,b){var g=c("./internal/isNodeType");
var a=c("./ELEMENT_NODE");d.exports=function f(h){return g(h,a)}},{"./ELEMENT_NODE":143,"./internal/isNodeType":154}],161:[function(b,c,a){c.exports=function d(f){return !!(f&&f.nodeType)
}},{}],162:[function(c,d,b){var f=/^\[object (HTMLCollection|NodeList|Object)\]$/;
d.exports=function a(g){if(!g){return false}if(typeof g.length!=="number"){return false
}if(typeof g[0]==="object"&&(!g[0]||!g[0].nodeType)){return false}return f.test(Object.prototype.toString.call(g))
}},{}],163:[function(c,d,a){var g=c("./internal/isNodeType");var b=c("./TEXT_NODE");
d.exports=function f(h){return g(h,b)}},{"./TEXT_NODE":144,"./internal/isNodeType":154}],164:[function(b,c,a){c.exports=b(52)
},{}],165:[function(b,c,a){if(!Array.prototype.indexOf){Array.prototype.indexOf=function d(g,h){var i=h||0;
var f=0;if(i<0){i=this.length+h-1;if(i<0){throw"Wrapped past beginning of array while looking up a negative start index."
}}for(f=0;f<this.length;f++){if(this[f]===g){return f}}return(-1)}}},{}],166:[function(b,c,a){c.exports=b(66)
},{}],167:[function(c,d,b){var f=c("./internal/validate");d.exports=function a(g){f.childNode(g,true,"remove");
if(!g.parentNode){return g}return g.parentNode.removeChild(g)}},{"./internal/validate":155}],168:[function(b,d,a){var f=b("./internal/validate");
d.exports=function c(g,h){f.insertNode(g,true,"insertFirstChild","newNode");f.childNode(h,true,"insertFirstChild","oldNode");
f.hasParentNode(h,"insertFirstChild","oldNode");return h.parentNode.replaceChild(g,h)
}},{"./internal/validate":155}],169:[function(b,c,a){arguments[4][76][0].apply(a,arguments)
},{"./ac-prefixer/Prefixer":170}],170:[function(b,c,a){c.exports=b(77)},{"./Prefixer/camelCasedEvents":171}],171:[function(b,c,a){c.exports=b(78)
},{}],172:[function(b,c,a){c.exports={getStyle:b("./ac-dom-styles/getStyle"),setStyle:b("./ac-dom-styles/setStyle")}
},{"./ac-dom-styles/getStyle":173,"./ac-dom-styles/setStyle":176}],173:[function(d,f,c){var g=d("ac-prefixer");
var b=d("./shim/getComputedStyle");f.exports=function a(){var k=Array.prototype.slice.call(arguments);
var p=k.shift(k);var m=b(p);var l={};var o;var h;var n;var j;if(typeof k[0]!=="string"){k=k[0]
}for(j=0;j<k.length;j++){o=k[j];h=g.getStyleProperty(o);if(h){o=g.stripPrefixes(h);
n=m[h];if(!n||n==="auto"){n=null}if(n){n=g.stripPrefixes(n)}}else{n=null}l[o]=n
}return l}},{"./shim/getComputedStyle":177,"ac-prefixer":169}],174:[function(d,f,c){var b={transform:["matrix","translate","translateX","translateY","scale","scaleX","scaleY","rotate","skewX","skewY","matrix3d","translate3d","translateZ","scale3d","scaleZ","rotate3d","rotateX","rotateY","rotateZ","perspective"],filter:["blur","brightness","contrast","drop-shadow","grayscale","hue-rotate","invert","saturate","sepia"]};
f.exports=function a(j){var l;var k;var h;var g;for(l in b){k=j[l]?j[l]:"";for(g=0;
g<b[l].length;g++){h=b[l][g];if(h in j){k+=" "+h+"("+j[h]+")";delete j[h]}}k=k.trim();
if(k){j[l]=k}}return j}},{}],175:[function(c,d,b){d.exports=function a(h){var k;
var l;var j;var f;var g;if(typeof h==="string"){k={};l=h.split(";");f=l.length;
for(g=0;g<f;g+=1){j=l[g].indexOf(":");if(j>0){k[l[g].substr(0,j).trim()]=l[g].substr(j+1).trim()
}}}else{k=h}return k}},{}],176:[function(d,f,c){var h=d("ac-prefixer");var b=d("./helpers/cssToObject");
var a=d("./helpers/combinePartialProperties");f.exports=function g(o,l){var k;var j;
var n;var i;var m;if((typeof l!=="string"&&typeof l!=="object")||Array.isArray(l)){throw new TypeError("setStyle: styles must be an Object or String")
}l=b(l);l=a(l);k="";for(n in l){m=l[n];if(!m&&m!==0){i=h.getStyleProperty(n);if("removeAttribute" in o.style){o.style.removeAttribute(i)
}else{o.style[i]=""}}else{j=h.getStyleCSS(n,m);if(j!==false){k+=" "+j}}}if(k.length){o.style.cssText+=k
}return o}},{"./helpers/combinePartialProperties":174,"./helpers/cssToObject":175,"ac-prefixer":169}],177:[function(b,c,a){c.exports=(function(){if("getComputedStyle" in window){return window.getComputedStyle
}return function(g){var d;var h;var f;d=g.currentStyle;for(h in d){if(h==="styleFloat"){f["float"]=f.cssFloat=d[h]
}else{f[h]=d[h]}}return f}}())},{}],178:[function(c,f,b){var g=c("ac-dom-nodes/isElement");
var a=c("./matchesSelector");var h=c("./internal/validate");f.exports=function d(k,j,i){h.childNode(k,true,"ancestors");
h.selector(j,false,"ancestors");if(i&&g(k)&&(!j||a(k,j))){return k}if(k!==document.body){while((k=k.parentNode)&&g(k)){if(!j||a(k,j)){return k
}if(k===document.body){break}}}return null}},{"./internal/validate":185,"./matchesSelector":187,"ac-dom-nodes/isElement":160}],179:[function(c,d,b){var g=c("ac-dom-nodes/isElement");
var a=c("./matchesSelector");var h=c("./internal/validate");d.exports=function f(l,j,i){var k=[];
h.childNode(l,true,"ancestors");h.selector(j,false,"ancestors");if(i&&g(l)&&(!j||a(l,j))){k.push(l)
}if(l!==document.body){while((l=l.parentNode)&&g(l)){if(!j||a(l,j)){k.push(l)}if(l===document.body){break
}}}return k}},{"./internal/validate":185,"./matchesSelector":187,"ac-dom-nodes/isElement":160}],180:[function(d,g,c){var b=d("ac-dom-nodes/filterByNodeType");
var a=d("./filterBySelector");var h=d("./internal/validate");g.exports=function f(k,i){var j;
h.parentNode(k,true,"children");h.selector(i,false,"children");j=k.children||k.childNodes;
j=b(j);if(i){j=a(j,i)}return j}},{"./filterBySelector":181,"./internal/validate":185,"ac-dom-nodes/filterByNodeType":146}],181:[function(d,f,c){d("ac-polyfills/Array/prototype.slice");
d("ac-polyfills/Array/prototype.filter");var b=d("./matchesSelector");var g=d("./internal/validate");
f.exports=function a(i,h){g.selector(h,true,"filterBySelector");i=Array.prototype.slice.call(i);
return i.filter(function(j){return b(j,h)})}},{"./internal/validate":185,"./matchesSelector":187,"ac-polyfills/Array/prototype.filter":190,"ac-polyfills/Array/prototype.slice":193}],182:[function(b,d,a){var c=b("./children");
var g=b("./internal/validate");d.exports=function f(j,h){var i;g.parentNode(j,true,"firstChild");
g.selector(h,false,"firstChild");if(j.firstElementChild&&!h){return j.firstElementChild
}i=c(j,h);if(i.length){return i[0]}return null}},{"./children":180,"./internal/validate":185}],183:[function(b,c,a){c.exports={ancestor:b("./ancestor"),ancestors:b("./ancestors"),children:b("./children"),filterBySelector:b("./filterBySelector"),firstChild:b("./firstChild"),lastChild:b("./lastChild"),matchesSelector:b("./matchesSelector"),nextSibling:b("./nextSibling"),nextSiblings:b("./nextSiblings"),previousSibling:b("./previousSibling"),previousSiblings:b("./previousSiblings"),querySelector:b("./querySelector"),querySelectorAll:b("./querySelectorAll"),siblings:b("./siblings")}
},{"./ancestor":178,"./ancestors":179,"./children":180,"./filterBySelector":181,"./firstChild":182,"./lastChild":186,"./matchesSelector":187,"./nextSibling":188,"./nextSiblings":189,"./previousSibling":194,"./previousSiblings":195,"./querySelector":196,"./querySelectorAll":197,"./siblings":200}],184:[function(b,c,a){c.exports=window.Element?(function(d){return d.matches||d.matchesSelector||d.webkitMatchesSelector||d.mozMatchesSelector||d.msMatchesSelector||d.oMatchesSelector
}(Element.prototype)):null},{}],185:[function(g,c,i){g("ac-polyfills/Array/prototype.indexOf");
var o=g("ac-dom-nodes/isNode");var b=g("ac-dom-nodes/COMMENT_NODE");var k=g("ac-dom-nodes/DOCUMENT_FRAGMENT_NODE");
var j=g("ac-dom-nodes/DOCUMENT_NODE");var h=g("ac-dom-nodes/ELEMENT_NODE");var f=g("ac-dom-nodes/TEXT_NODE");
var a=function(r,q){if(!o(r)){return false}if(typeof q==="number"){return(r.nodeType===q)
}return(q.indexOf(r.nodeType)!==-1)};var m=[h,j,k];var n=" must be an Element, Document, or Document Fragment";
var p=[h,f,b];var l=" must be an Element, TextNode, or Comment";var d=" must be a string";
c.exports={parentNode:function(q,t,s,r){r=r||"node";if((q||t)&&!a(q,m)){throw new TypeError(s+": "+r+n)
}},childNode:function(q,t,s,r){r=r||"node";if(!q&&!t){return}if(!a(q,p)){throw new TypeError(s+": "+r+l)
}},selector:function(q,t,s,r){r=r||"selector";if((q||t)&&typeof q!=="string"){throw new TypeError(s+": "+r+d)
}}}},{"ac-dom-nodes/COMMENT_NODE":139,"ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":140,"ac-dom-nodes/DOCUMENT_NODE":141,"ac-dom-nodes/ELEMENT_NODE":143,"ac-dom-nodes/TEXT_NODE":144,"ac-dom-nodes/isNode":161,"ac-polyfills/Array/prototype.indexOf":192}],186:[function(b,d,a){var c=b("./children");
var g=b("./internal/validate");d.exports=function f(j,h){var i;g.parentNode(j,true,"lastChild");
g.selector(h,false,"lastChild");if(j.lastElementChild&&!h){return j.lastElementChild
}i=c(j,h);if(i.length){return i[i.length-1]}return null}},{"./children":180,"./internal/validate":185}],187:[function(d,f,c){var g=d("ac-dom-nodes/isElement");
var a=d("./internal/nativeMatches");var i=d("./internal/validate");var h=d("./vendor/sizzle/sizzle");
f.exports=function b(k,j){i.selector(j,true,"matchesSelector");if(!g(k)){return false
}if(!a){return h.matchesSelector(k,j)}return a.call(k,j)}},{"./internal/nativeMatches":184,"./internal/validate":185,"./vendor/sizzle/sizzle":201,"ac-dom-nodes/isElement":160}],188:[function(c,d,b){var f=c("ac-dom-nodes/isElement");
var a=c("./matchesSelector");var h=c("./internal/validate");d.exports=function g(j,i){h.childNode(j,true,"nextSibling");
h.selector(i,false,"nextSibling");if(j.nextElementSibling&&!i){return j.nextElementSibling
}while(j=j.nextSibling){if(f(j)){if(!i||a(j,i)){return j}}}return null}},{"./internal/validate":185,"./matchesSelector":187,"ac-dom-nodes/isElement":160}],189:[function(d,f,b){var g=d("ac-dom-nodes/isElement");
var a=d("./matchesSelector");var h=d("./internal/validate");f.exports=function c(k,i){var j=[];
h.childNode(k,true,"nextSiblings");h.selector(i,false,"nextSiblings");while(k=k.nextSibling){if(g(k)){if(!i||a(k,i)){j.push(k)
}}}return j}},{"./internal/validate":185,"./matchesSelector":187,"ac-dom-nodes/isElement":160}],190:[function(b,c,a){c.exports=b(52)
},{}],191:[function(b,c,a){if(!Array.prototype.forEach){Array.prototype.forEach=function d(k,j){var h=Object(this);
var f;var g;if(typeof k!=="function"){throw new TypeError("No function object passed to forEach.")
}for(f=0;f<this.length;f+=1){g=h[f];k.call(j,g,f,h)}}}},{}],192:[function(b,c,a){c.exports=b(165)
},{}],193:[function(b,c,a){c.exports=b(66)},{}],194:[function(c,d,b){var g=c("ac-dom-nodes/isElement");
var a=c("./matchesSelector");var h=c("./internal/validate");d.exports=function f(j,i){h.childNode(j,true,"previousSibling");
h.selector(i,false,"previousSibling");if(j.previousElementSibling&&!i){return j.previousElementSibling
}while(j=j.previousSibling){if(g(j)){if(!i||a(j,i)){return j}}}return null}},{"./internal/validate":185,"./matchesSelector":187,"ac-dom-nodes/isElement":160}],195:[function(c,d,b){var f=c("ac-dom-nodes/isElement");
var a=c("./matchesSelector");var h=c("./internal/validate");d.exports=function g(k,i){var j=[];
h.childNode(k,true,"previousSiblings");h.selector(i,false,"previousSiblings");while(k=k.previousSibling){if(f(k)){if(!i||a(k,i)){j.push(k)
}}}return j.reverse()}},{"./internal/validate":185,"./matchesSelector":187,"ac-dom-nodes/isElement":160}],196:[function(c,d,a){var g=c("./internal/validate");
var b=c("./shims/querySelector");d.exports=function f(h,i){i=i||document;g.parentNode(i,true,"querySelector","context");
g.selector(h,true,"querySelector");if(!i.querySelector){return b(h,i)}return i.querySelector(h)
}},{"./internal/validate":185,"./shims/querySelector":198}],197:[function(b,c,a){b("ac-polyfills/Array/prototype.slice");
var g=b("./internal/validate");var f=b("./shims/querySelectorAll");c.exports=function d(h,i){i=i||document;
g.parentNode(i,true,"querySelectorAll","context");g.selector(h,true,"querySelectorAll");
if(!i.querySelectorAll){return f(h,i)}return Array.prototype.slice.call(i.querySelectorAll(h))
}},{"./internal/validate":185,"./shims/querySelectorAll":199,"ac-polyfills/Array/prototype.slice":193}],198:[function(b,c,a){var d=b("./querySelectorAll");
c.exports=function f(h,i){var g=d(h,i);return g.length?g[0]:null}},{"./querySelectorAll":199}],199:[function(b,c,a){b("ac-polyfills/Array/prototype.forEach");
var g=b("../vendor/sizzle/sizzle");var h=b("../children");var f=b("ac-dom-nodes/isDocumentFragment");
c.exports=function d(i,k){var j;var l;if(f(k)){j=h(k);l=[];j.forEach(function(n){var m;
if(g.matchesSelector(n,i)){l.push(n)}m=g(i,n);if(m.length){l=l.concat(m)}});return l
}return g(i,k)}},{"../children":180,"../vendor/sizzle/sizzle":201,"ac-dom-nodes/isDocumentFragment":158,"ac-polyfills/Array/prototype.forEach":191}],200:[function(b,d,a){var c=b("./children");
var g=b("./internal/validate");d.exports=function f(j,h){var i=[];g.childNode(j,true,"siblings");
g.selector(h,false,"siblings");if(j.parentNode){i=c(j.parentNode,h);i=i.filter(function(k){return(k!==j)
})}return i}},{"./children":180,"./internal/validate":185}],201:[function(b,c,a){c.exports=b(105)
},{}],202:[function(b,c,a){if(!Array.prototype.every){Array.prototype.every=function d(k,j){var h=Object(this);
var f=h.length>>>0;var g;if(typeof k!=="function"){throw new TypeError(k+" is not a function")
}for(g=0;g<f;g+=1){if(g in h&&!k.call(j,h[g],g,h)){return false}}return true}}},{}],203:[function(b,c,a){c.exports={createBezier:b("./ac-easing/createBezier"),createPredefined:b("./ac-easing/createPredefined"),createStep:b("./ac-easing/createStep"),Ease:b("./ac-easing/Ease")}
},{"./ac-easing/Ease":204,"./ac-easing/createBezier":205,"./ac-easing/createPredefined":206,"./ac-easing/createStep":207}],204:[function(b,c,a){var g="Ease expects an easing function.";
function f(i,h){if(typeof i!=="function"){throw new TypeError(g)}this.easingFunction=i;
this.cssString=h||null}var d=f.prototype;d.getValue=function(h){return this.easingFunction(h,0,1,1)
};c.exports=f},{}],205:[function(b,c,a){b("ac-polyfills/Array/prototype.every");
var f=b("./Ease");var h=b("./helpers/KeySpline");var d="Bezier curve expects exactly four (4) numbers. Given: ";
c.exports=function g(j,p,i,o){var q=Array.prototype.slice.call(arguments);var m=q.every(function(r){return(typeof r==="number")
});if(q.length!==4||!m){throw new TypeError(d+q)}var n=new h(j,p,i,o);var k=function(t,r,u,s){return n.get(t/s)*u+r
};var l="cubic-bezier("+q.join(", ")+")";return new f(k,l)}},{"./Ease":204,"./helpers/KeySpline":208,"ac-polyfills/Array/prototype.every":202}],206:[function(c,a,d){var i=c("./createStep");
var f=c("./helpers/cssAliases");var b=c("./helpers/easingFunctions");var h=c("./Ease");
var g='Easing function "%TYPE%" not recognized among the following: '+Object.keys(b).join(", ");
a.exports=function j(k){var l;if(k==="step-start"){return i(1,"start")}else{if(k==="step-end"){return i(1,"end")
}else{l=b[k]}}if(!l){throw new Error(g.replace("%TYPE%",k))}return new h(l,f[k])
}},{"./Ease":204,"./createStep":207,"./helpers/cssAliases":209,"./helpers/easingFunctions":210}],207:[function(d,f,c){var g=d("./Ease");
var b="Step function expects a numeric value greater than zero. Given: ";var a='Step function direction must be either "start" or "end" (default). Given: ';
f.exports=function h(i,l){l=l||"end";if(typeof i!=="number"||i<1){throw new TypeError(b+i)
}if(l!=="start"&&l!=="end"){throw new TypeError(a+l)}var k=function(q,m,r,p){var o=r/i;
var n=Math[(l==="start")?"floor":"ceil"](q/p*i);return m+o*n};var j="steps("+i+", "+l+")";
return new g(k,j)}},{"./Ease":204}],208:[function(b,c,a){
/*! MIT License
 *
 * KeySpline - use bezier curve for transition easing function
 * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
;
function d(o,l,n,j){this.get=function(p){if(o===l&&n===j){return p}return g(k(p),l,j)
};function i(p,q){return 1-3*q+3*p}function h(p,q){return 3*q-6*p}function f(p){return 3*p
}function g(r,p,q){return((i(p,q)*r+h(p,q))*r+f(p))*r}function m(r,p,q){return 3*i(p,q)*r*r+2*h(p,q)*r+f(p)
}function k(s){var q=s;for(var r=0;r<4;++r){var t=m(q,o,n);if(t===0){return q}var p=g(q,o,n)-s;
q-=p/t}return q}}c.exports=d},{}],209:[function(c,d,b){var a={linear:"cubic-bezier(0, 0, 1, 1)",ease:"cubic-bezier(0.25, 0.1, 0.25, 1)","ease-in":"cubic-bezier(0.42, 0, 1, 1)","ease-out":"cubic-bezier(0, 0, 0.58, 1)","ease-in-out":"cubic-bezier(0.42, 0, 0.58, 1)","ease-in-cubic":"cubic-bezier(0.55, 0.055, 0.675, 0.19)","ease-out-cubic":"cubic-bezier(0.215, 0.61, 0.355, 1)","ease-in-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1)","ease-in-quad":"cubic-bezier(0.55, 0.085, 0.68, 0.53)","ease-out-quad":"cubic-bezier(0.25, 0.46, 0.45, 0.94)","ease-in-out-quad":"cubic-bezier(0.455, 0.03, 0.515, 0.955)","ease-in-quart":"cubic-bezier(0.895, 0.03, 0.685, 0.22)","ease-out-quart":"cubic-bezier(0.165, 0.84, 0.44, 1)","ease-in-out-quart":"cubic-bezier(0.77, 0, 0.175, 1)","ease-in-quint":"cubic-bezier(0.755, 0.05, 0.855, 0.06)","ease-out-quint":"cubic-bezier(0.23, 1, 0.32, 1)","ease-in-out-quint":"cubic-bezier(0.86, 0, 0.07, 1)","ease-in-sine":"cubic-bezier(0.47, 0, 0.745, 0.715)","ease-out-sine":"cubic-bezier(0.39, 0.575, 0.565, 1)","ease-in-out-sine":"cubic-bezier(0.445, 0.05, 0.55, 0.95)","ease-in-expo":"cubic-bezier(0.95, 0.05, 0.795, 0.035)","ease-out-expo":"cubic-bezier(0.19, 1, 0.22, 1)","ease-in-out-expo":"cubic-bezier(1, 0, 0, 1)","ease-in-circ":"cubic-bezier(0.6, 0.04, 0.98, 0.335)","ease-out-circ":"cubic-bezier(0.075, 0.82, 0.165, 1)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.15, 0.86)","ease-in-back":"cubic-bezier(0.6, -0.28, 0.735, 0.045)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.32, 1.275)","ease-in-out-back":"cubic-bezier(0.68, -0.55, 0.265, 1.55)"};
a.easeIn=a["ease-in"];a.easeOut=a["ease-out"];a.easeInOut=a["ease-in-out"];a.easeInCubic=a["ease-in-cubic"];
a.easeOutCubic=a["ease-out-cubic"];a.easeInOutCubic=a["ease-in-out-cubic"];a.easeInQuad=a["ease-in-quad"];
a.easeOutQuad=a["ease-out-quad"];a.easeInOutQuad=a["ease-in-out-quad"];a.easeInQuart=a["ease-in-quart"];
a.easeOutQuart=a["ease-out-quart"];a.easeInOutQuart=a["ease-in-out-quart"];a.easeInQuint=a["ease-in-quint"];
a.easeOutQuint=a["ease-out-quint"];a.easeInOutQuint=a["ease-in-out-quint"];a.easeInSine=a["ease-in-sine"];
a.easeOutSine=a["ease-out-sine"];a.easeInOutSine=a["ease-in-out-sine"];a.easeInExpo=a["ease-in-expo"];
a.easeOutExpo=a["ease-out-expo"];a.easeInOutExpo=a["ease-in-out-expo"];a.easeInCirc=a["ease-in-circ"];
a.easeOutCirc=a["ease-out-circ"];a.easeInOutCirc=a["ease-in-out-circ"];a.easeInBack=a["ease-in-back"];
a.easeOutBack=a["ease-out-back"];a.easeInOutBack=a["ease-in-out-back"];d.exports=a
},{}],210:[function(d,b,F){var J=d("../createBezier");var w=J(0.25,0.1,0.25,1).easingFunction;
var g=J(0.42,0,1,1).easingFunction;var C=J(0,0,0.58,1).easingFunction;var x=J(0.42,0,0.58,1).easingFunction;
var u=function(Q,O,R,P){return R*Q/P+O};var h=function(Q,O,R,P){return R*(Q/=P)*Q+O
};var N=function(Q,O,R,P){return -R*(Q/=P)*(Q-2)+O};var D=function(Q,O,R,P){if((Q/=P/2)<1){return R/2*Q*Q+O
}return -R/2*((--Q)*(Q-2)-1)+O};var i=function(Q,O,R,P){return R*(Q/=P)*Q*Q+O};
var a=function(Q,O,R,P){return R*((Q=Q/P-1)*Q*Q+1)+O};var j=function(Q,O,R,P){if((Q/=P/2)<1){return R/2*Q*Q*Q+O
}return R/2*((Q-=2)*Q*Q+2)+O};var o=function(Q,O,R,P){return R*(Q/=P)*Q*Q*Q+O};
var m=function(Q,O,R,P){return -R*((Q=Q/P-1)*Q*Q*Q-1)+O};var p=function(Q,O,R,P){if((Q/=P/2)<1){return R/2*Q*Q*Q*Q+O
}return -R/2*((Q-=2)*Q*Q*Q-2)+O};var y=function(Q,O,R,P){return R*(Q/=P)*Q*Q*Q*Q+O
};var v=function(Q,O,R,P){return R*((Q=Q/P-1)*Q*Q*Q*Q+1)+O};var z=function(Q,O,R,P){if((Q/=P/2)<1){return R/2*Q*Q*Q*Q*Q+O
}return R/2*((Q-=2)*Q*Q*Q*Q+2)+O};var c=function(Q,O,R,P){return -R*Math.cos(Q/P*(Math.PI/2))+R+O
};var L=function(Q,O,R,P){return R*Math.sin(Q/P*(Math.PI/2))+O};var B=function(Q,O,R,P){return -R/2*(Math.cos(Math.PI*Q/P)-1)+O
};var G=function(Q,O,R,P){return(Q===0)?O:R*Math.pow(2,10*(Q/P-1))+O};var A=function(Q,O,R,P){return(Q===P)?O+R:R*(-Math.pow(2,-10*Q/P)+1)+O
};var r=function(Q,O,R,P){if(Q===0){return O}else{if(Q===P){return O+R}else{if((Q/=P/2)<1){return R/2*Math.pow(2,10*(Q-1))+O
}}}return R/2*(-Math.pow(2,-10*--Q)+2)+O};var l=function(Q,O,R,P){return -R*(Math.sqrt(1-(Q/=P)*Q)-1)+O
};var f=function(Q,O,R,P){return R*Math.sqrt(1-(Q=Q/P-1)*Q)+O};var I=function(Q,O,R,P){if((Q/=P/2)<1){return -R/2*(Math.sqrt(1-Q*Q)-1)+O
}return R/2*(Math.sqrt(1-(Q-=2)*Q)+1)+O};var E=function(S,Q,U,R){var O=1.70158;
var T=0;var P=U;if(S===0){return Q}else{if((S/=R)===1){return Q+U}}if(!T){T=R*0.3
}if(P<Math.abs(U)){P=U;O=T/4}else{O=T/(2*Math.PI)*Math.asin(U/P)}return -(P*Math.pow(2,10*(S-=1))*Math.sin((S*R-O)*(2*Math.PI)/T))+Q
};var H=function(S,Q,U,R){var O=1.70158;var T=0;var P=U;if(S===0){return Q}else{if((S/=R)===1){return Q+U
}}if(!T){T=R*0.3}if(P<Math.abs(U)){P=U;O=T/4}else{O=T/(2*Math.PI)*Math.asin(U/P)
}return P*Math.pow(2,-10*S)*Math.sin((S*R-O)*(2*Math.PI)/T)+U+Q};var t=function(S,Q,U,R){var O=1.70158;
var T=0;var P=U;if(S===0){return Q}else{if((S/=R/2)===2){return Q+U}}if(!T){T=R*(0.3*1.5)
}if(P<Math.abs(U)){P=U;O=T/4}else{O=T/(2*Math.PI)*Math.asin(U/P)}if(S<1){return -0.5*(P*Math.pow(2,10*(S-=1))*Math.sin((S*R-O)*(2*Math.PI)/T))+Q
}return P*Math.pow(2,-10*(S-=1))*Math.sin((S*R-O)*(2*Math.PI)/T)*0.5+U+Q};var s=function(R,P,S,Q,O){if(O===undefined){O=1.70158
}return S*(R/=Q)*R*((O+1)*R-O)+P};var q=function(R,P,S,Q,O){if(O===undefined){O=1.70158
}return S*((R=R/Q-1)*R*((O+1)*R+O)+1)+P};var k=function(R,P,S,Q,O){if(O===undefined){O=1.70158
}if((R/=Q/2)<1){return S/2*(R*R*(((O*=(1.525))+1)*R-O))+P}return S/2*((R-=2)*R*(((O*=(1.525))+1)*R+O)+2)+P
};var K=function(Q,O,R,P){if((Q/=P)<(1/2.75)){return R*(7.5625*Q*Q)+O}else{if(Q<(2/2.75)){return R*(7.5625*(Q-=(1.5/2.75))*Q+0.75)+O
}else{if(Q<(2.5/2.75)){return R*(7.5625*(Q-=(2.25/2.75))*Q+0.9375)+O}}}return R*(7.5625*(Q-=(2.625/2.75))*Q+0.984375)+O
};var n=function(Q,O,R,P){return R-K(P-Q,0,R,P)+O};var M=function(Q,O,R,P){if(Q<P/2){return n(Q*2,0,R,P)*0.5+O
}return K(Q*2-P,0,R,P)*0.5+R*0.5+O};b.exports={linear:u,ease:w,easeIn:g,"ease-in":g,easeOut:C,"ease-out":C,easeInOut:x,"ease-in-out":x,easeInCubic:i,"ease-in-cubic":i,easeOutCubic:a,"ease-out-cubic":a,easeInOutCubic:j,"ease-in-out-cubic":j,easeInQuad:h,"ease-in-quad":h,easeOutQuad:N,"ease-out-quad":N,easeInOutQuad:D,"ease-in-out-quad":D,easeInQuart:o,"ease-in-quart":o,easeOutQuart:m,"ease-out-quart":m,easeInOutQuart:p,"ease-in-out-quart":p,easeInQuint:y,"ease-in-quint":y,easeOutQuint:v,"ease-out-quint":v,easeInOutQuint:z,"ease-in-out-quint":z,easeInSine:c,"ease-in-sine":c,easeOutSine:L,"ease-out-sine":L,easeInOutSine:B,"ease-in-out-sine":B,easeInExpo:G,"ease-in-expo":G,easeOutExpo:A,"ease-out-expo":A,easeInOutExpo:r,"ease-in-out-expo":r,easeInCirc:l,"ease-in-circ":l,easeOutCirc:f,"ease-out-circ":f,easeInOutCirc:I,"ease-in-out-circ":I,easeInBack:s,"ease-in-back":s,easeOutBack:q,"ease-out-back":q,easeInOutBack:k,"ease-in-out-back":k,easeInElastic:E,"ease-in-elastic":E,easeOutElastic:H,"ease-out-elastic":H,easeInOutElastic:t,"ease-in-out-elastic":t,easeInBounce:n,"ease-in-bounce":n,easeOutBounce:K,"ease-out-bounce":K,easeInOutBounce:M,"ease-in-out-bounce":M}
},{"../createBezier":205}],211:[function(b,c,a){c.exports=b(26)},{}],212:[function(b,c,a){arguments[4][27][0].apply(a,arguments)
},{"./ac-object/clone":213,"./ac-object/create":214,"./ac-object/defaults":215,"./ac-object/extend":216,"./ac-object/getPrototypeOf":217,"./ac-object/isDate":218,"./ac-object/isEmpty":219,"./ac-object/isRegExp":220,"./ac-object/toQueryParameters":221}],213:[function(b,c,a){c.exports=b(28)
},{"./extend":216}],214:[function(b,c,a){c.exports=b(29)},{}],215:[function(b,c,a){c.exports=b(30)
},{"./extend":216}],216:[function(b,c,a){c.exports=b(31)},{}],217:[function(b,c,a){c.exports=b(32)
},{}],218:[function(b,c,a){c.exports=b(33)},{}],219:[function(b,c,a){c.exports=b(34)
},{}],220:[function(b,c,a){c.exports=b(35)},{}],221:[function(b,c,a){c.exports=b(36)
},{qs:211}],222:[function(b,d,a){var c=b("./ac-element-engagement/ElementEngagement");
d.exports=new c();d.exports.ElementEngagement=c},{"./ac-element-engagement/ElementEngagement":223}],223:[function(c,b,f){var g;
var d=c("ac-object");var h=c("ac-element-tracker").ElementTracker;var j={timeToEngage:500,inViewThreshold:0.75,stopOnEngaged:true};
var i={thresholdEnterTime:0,thresholdExitTime:0,inThreshold:false,engaged:false,tracking:true};
var a=function(){h.call(this)};g=a.prototype=d.create(h.prototype);g._decorateTrackedElement=function(l,k){var m;
m=d.defaults(j,k||{});d.extend(l,m);d.extend(l,i)};g._attachElementListeners=function(k){k.on("thresholdenter",this._thresholdEnter,this);
k.on("thresholdexit",this._thresholdExit,this);k.on("enterview",this._enterView,this);
k.on("exitview",this._exitView,this)};g._removeElementListeners=function(k){k.off("thresholdenter",this._thresholdEnter);
k.off("thresholdexit",this._thresholdExit);k.off("enterview",this._enterView);k.off("exitview",this._exitView)
};g._attachAllElementListeners=function(){this.elements.forEach(function(k){if(!k.stopOnEngaged){this._attachElementListeners(k)
}else{if(!k.engaged){this._attachElementListeners(k)}}},this)};g._removeAllElementListeners=function(){this.elements.forEach(function(k){this._removeElementListeners(k)
},this)};g._elementInViewPastThreshold=function(m){var k=this.windowDelegate.innerHeight();
var l=false;if(m.pixelsInView===k){l=true}else{l=(m.percentInView>m.inViewThreshold)
}return l};g._ifInView=function(k,m){var l=k.inThreshold;h.prototype._ifInView.apply(this,arguments);
if(!l&&this._elementInViewPastThreshold(k)){k.inThreshold=true;k.trigger("thresholdenter",k);
if(typeof k.timeToEngage==="number"&&k.timeToEngage>=0){k.engagedTimeout=window.setTimeout(this._engaged.bind(this,k),k.timeToEngage)
}}};g._ifAlreadyInView=function(k){var l=k.inThreshold;h.prototype._ifAlreadyInView.apply(this,arguments);
if(l&&!this._elementInViewPastThreshold(k)){k.inThreshold=false;k.trigger("thresholdexit",k);
if(k.engagedTimeout){window.clearTimeout(k.engagedTimeout);k.engagedTimeout=null
}}};g._engaged=function(k){k.engagedTimeout=null;this._elementEngaged(k);k.trigger("engaged",k);
this.trigger("engaged",k)};g._thresholdEnter=function(k){k.thresholdEnterTime=Date.now();
k.thresholdExitTime=0;this.trigger("thresholdenter",k)};g._thresholdExit=function(k){k.thresholdExitTime=Date.now();
this.trigger("thresholdexit",k)};g._enterView=function(k){this.trigger("enterview",k)
};g._exitView=function(k){this.trigger("exitview",k)};g._elementEngaged=function(k){k.engaged=true;
if(k.stopOnEngaged){this.stop(k)}};g.stop=function(k){if(this.tracking&&!k){this._removeAllElementListeners();
h.prototype.stop.call(this)}if(k&&k.tracking){k.tracking=false;this._removeElementListeners(k)
}};g.start=function(k){if(!k){this._attachAllElementListeners()}if(k&&!k.tracking){if(!k.stopOnEngaged){k.tracking=true;
this._attachElementListeners(k)}else{if(!k.engaged){k.tracking=true;this._attachElementListeners(k)
}}}if(!this.tracking){h.prototype.start.call(this)}else{this.refreshAllElementStates()
}};g.addElement=function(m,k){var l=h.prototype.addElement.call(this,m);this._decorateTrackedElement(l,k);
return l};g.addElements=function(l,k){[].forEach.call(l,function(m){this.addElement(m,k)
},this)};b.exports=a},{"ac-element-tracker":291,"ac-object":212}],224:[function(b,c,a){c.exports={flatten:b("./ac-array/flatten"),intersection:b("./ac-array/intersection"),toArray:b("./ac-array/toArray"),union:b("./ac-array/union"),unique:b("./ac-array/unique"),without:b("./ac-array/without")}
},{"./ac-array/flatten":225,"./ac-array/intersection":226,"./ac-array/toArray":227,"./ac-array/union":228,"./ac-array/unique":229,"./ac-array/without":230}],225:[function(b,c,a){c.exports=function d(h){var f=[];
var g=function(i){if(Array.isArray(i)){i.forEach(g)}else{f.push(i)}};h.forEach(g);
return f}},{}],226:[function(b,c,a){c.exports=function d(n){if(!n){return[]}var m=arguments.length;
var k=0;var g=n.length;var f=[];var l;for(k;k<g;k++){l=n[k];if(f.indexOf(l)>-1){continue
}for(var h=1;h<m;h++){if(arguments[h].indexOf(l)<0){break}}if(h===m){f.push(l)}}return f
}},{}],227:[function(b,d,a){d.exports=function c(f){return Array.prototype.slice.call(f)
}},{}],228:[function(b,c,a){var g=b("./flatten");var f=b("./unique");c.exports=function d(h){return f(g(Array.prototype.slice.call(arguments)))
}},{"./flatten":225,"./unique":229}],229:[function(b,c,a){c.exports=function d(g){var f=function(h,i){if(h.indexOf(i)<0){h.push(i)
}return h};return g.reduce(f,[])}},{}],230:[function(b,d,a){d.exports=function c(f,n,m){var k;
var h=f.indexOf(n);var l=f.length;if(h>=0){if(m){k=f.slice(0,l);var j,g=0;for(j=h;
j<l;j++){if(f[j]===n){k.splice(j-g,1);g++}}}else{if(h===(l-1)){k=f.slice(0,(l-1))
}else{if(h===0){k=f.slice(1)}else{k=f.slice(0,h);k=k.concat(f.slice(h+1))}}}}else{return f
}return k}},{}],231:[function(b,c,a){c.exports.DOMEmitter=b("./ac-dom-emitter/DOMEmitter")
},{"./ac-dom-emitter/DOMEmitter":232}],232:[function(b,c,a){var g;var f=b("ac-event-emitter").EventEmitter;
var d="dom-emitter";function h(i){if(i===null){return}this.el=i;this._bindings={};
this._eventEmitter=new f()}g=h.prototype;g._parseEventNames=function(i){if(!i){return[i]
}return i.split(" ")};g._onListenerEvent=function(j,i){this.trigger(j,i,false)};
g._setListener=function(i){this._bindings[i]=this._onListenerEvent.bind(this,i);
this._addEventListener(i,this._bindings[i])};g._removeListener=function(i){this._removeEventListener(i,this._bindings[i]);
delete this._bindings[i]};g._addEventListener=function(j,k,i){if(this.el.addEventListener){this.el.addEventListener(j,k,i)
}else{if(this.el.attachEvent){this.el.attachEvent("on"+j,k)}else{target["on"+j]=k
}}return this};g._removeEventListener=function(j,k,i){if(this.el.removeEventListener){this.el.removeEventListener(j,k,i)
}else{this.el.detachEvent("on"+j,k)}return this};g._triggerInternalEvent=function(i,j){this.trigger(d+":"+i,j)
};g.on=function(i,k,j){i=this._parseEventNames(i);i.forEach(function(n,m,l){if(!this.has(l)){this._setListener(l)
}this._triggerInternalEvent("willon",{evt:l,callback:n,context:m});this._eventEmitter.on(l,n,m);
this._triggerInternalEvent("didon",{evt:l,callback:n,context:m})}.bind(this,k,j));
return this};g.off=function(i,l,k){var j=Array.prototype.slice.call(arguments,0);
i=this._parseEventNames(i);i.forEach(function(q,p,n,m){if(n.length===0){this._eventEmitter.off();
var o;for(o in this._bindings){if(this._bindings.hasOwnProperty(o)){this._removeListener(o)
}}return}this._triggerInternalEvent("willoff",{evt:m,callback:q,context:p});this._eventEmitter.off(m,q,p);
this._triggerInternalEvent("didoff",{evt:m,callback:q,context:p});if(!this.has(m)){this._removeListener(m)
}}.bind(this,l,k,j));return this};g.once=function(i,k,j){i=this._parseEventNames(i);
i.forEach(function(n,m,l){if(!this.has(l)){this._setListener(l)}this._triggerInternalEvent("willonce",{evt:l,callback:n,context:m});
this._eventEmitter.once.call(this,l,n,m);this._triggerInternalEvent("didonce",{evt:l,callback:n,context:m})
}.bind(this,k,j));return this};g.has=function(i,k,j){if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};g.trigger=function(i,j,k){i=this._parseEventNames(i);i.forEach(function(m,n,l){this._eventEmitter.trigger(l,m,n)
}.bind(this,j,k));return this};g.destroy=function(){this._triggerInternalEvent("willdestroy");
this.off();this.el=this._eventEmitter=this._bindings=null};c.exports=h},{"ac-event-emitter":false}],233:[function(c,d,b){var a=c("./ac-dom-styles/vendorTransformHelper");
var f={};f.setStyle=function(h,i){var g;var j;var k;if((typeof i!=="string"&&typeof i!=="object")||Array.isArray(i)){throw new TypeError("styles argument must be either an object or a string")
}g=f.setStyle.__explodeStyleStringToObject(i);for(k in g){if(g.hasOwnProperty(k)){j=k.replace(/-(\w)/g,f.setStyle.__camelCaseReplace);
f.setStyle.__setStyle(h,j,g,g[k])}}return h};f.setStyle.__explodeStyleStringToObject=function(l){var j=(typeof l==="object")?l:{};
var m;var k;var g;var h;if(typeof l==="string"){m=l.split(";");g=m.length;for(h=0;
h<g;h+=1){k=m[h].indexOf(":");if(k>0){j[m[h].substr(0,k).trim()]=m[h].substr(k+1).trim()
}}}return j};f.setStyle.__setStyle=function(i,j,h,g){if(typeof i.style[j]!=="undefined"){i.style[j]=g
}};f.setStyle.__camelCaseReplace=function(h,i,j,g){return(j===0)&&(g.substr(1,3)!=="moz")?i:i.toUpperCase()
};f.getStyle=function(h,j,g){var i;j=j.replace(/-(\w)/g,f.setStyle.__camelCaseReplace);
j=(j==="float")?"cssFloat":j;g=g||window.getComputedStyle(h,null);i=g?g[j]:null;
if(j==="opacity"){return i?parseFloat(i):1}return i==="auto"?null:i};f.setVendorPrefixStyle=function(g,j,i){if(typeof j!=="string"){throw new TypeError("ac-dom-styles.setVendorPrefixStyle: property must be a string")
}if(typeof i!=="string"&&typeof i!=="number"){throw new TypeError("ac-dom-styles.setVendorPrefixStyle: value must be a string or a number")
}var h=["","webkit","Moz","ms","O"];var l;var k;i+="";j=j.replace(/-(webkit|moz|ms|o)-/i,"");
j=j.replace(/^(webkit|Moz|ms|O)/,"");j=j.charAt(0).toLowerCase()+j.slice(1);j=j.replace(/-(\w)/,function(m,n){return n.toUpperCase()
});i=i.replace(/-(webkit|moz|ms|o)-/,"-vendor-");h.forEach(function(m){l=(m==="")?j:m+j.charAt(0).toUpperCase()+j.slice(1);
k=(m==="")?i.replace("-vendor-",""):i.replace("-vendor-","-"+m.charAt(0).toLowerCase()+m.slice(1)+"-");
if(l in g.style){f.setStyle(g,l+":"+k)}})};f.getVendorPrefixStyle=function(h,j){if(typeof j!=="string"){throw new TypeError("ac-dom-styles.getVendorPrefixStyle: property must be a string")
}var i=["","webkit","Moz","ms","O"];var g;j=j.replace(/-(webkit|moz|ms|o)-/i,"");
j=j.replace(/^(webkit|Moz|ms|O)/,"").charAt(0).toLowerCase()+j.slice(1);j=j.replace(/-(\w)/,function(k,l){return l.toUpperCase()
});i.some(function(l,k){var m=(l==="")?j:l+j.charAt(0).toUpperCase()+j.slice(1);
if(m in h.style){g=f.getStyle(h,m);return true}});return g};f.setVendorPrefixTransform=function(g,h){if((typeof h!=="string"&&typeof h!=="object")||Array.isArray(h)||h===null){throw new TypeError("ac-dom-styles.setVendorPrefixTransform: transformFunctions argument must be either an object or a string")
}f.setVendorPrefixStyle(g,"transform",a.convert2dFunctions(h))};c("./ac-dom-styles/ie")(f);
d.exports=f},{"./ac-dom-styles/ie":234,"./ac-dom-styles/vendorTransformHelper":235}],234:[function(b,c,a){c.exports=function(d){if(typeof window.getComputedStyle!=="function"){d.getStyle=function(i,h,g){var f;
var j;g=g||i.currentStyle;if(g){h=h.replace(/-(\w)/g,d.setStyle.__camelCaseReplace);
h=h==="float"?"styleFloat":h;j=g[h]||null;return j==="auto"?null:j}}}}},{}],235:[function(c,d,b){var a={__objectifiedFunctions:{},__paramMaps:{translate:"p1, p2, 0",translateX:"p1, 0, 0",translateY:"0, p1, 0",scale:"p1, p2, 1",scaleX:"p1, 1, 1",scaleY:"1, p1, 1",rotate:"0, 0, 1, p1",matrix:"p1, p2, 0, 0, p3, p4, 0, 0, 0, 0, 1, 0, p5, p6, 0, 1"},convert2dFunctions:function(g){var f;
this.__init(g);for(var h in this.__objectifiedFunctions){if(this.__objectifiedFunctions.hasOwnProperty(h)){f=this.__objectifiedFunctions[h].replace(" ","").split(",");
if(h in this.__paramMaps){for(var i in this.__paramMaps){if(h===i){this.valuesToSet.push(this.__stripFunctionAxis(h)+"3d("+this.__map2DTransformParams(f,this.__paramMaps[h])+")")
}}}else{this.valuesToSet.push(h+"("+this.__objectifiedFunctions[h]+")")}}}return this.valuesToSet.join(" ")
},__init:function(f){this.valuesToSet=[];this.__objectifiedFunctions=(typeof f==="object")?f:{};
if(typeof f==="string"){this.__objectifiedFunctions=this.__objectifyFunctionString(f)
}},__map2DTransformParams:function(f,g){f.forEach(function(j,h){g=g.replace("p"+(h+1),j)
});return g},__splitFunctionStringToArray:function(f){return f.match(/[\w]+\(.+?\)/g)
},__splitFunctionNameAndParams:function(f){return f.match(/(.*)\((.*)\)/)},__stripFunctionAxis:function(f){return f.match(/([a-z]+)(|X|Y)$/)[1]
},__objectifyFunctionString:function(f){var g=this;var h;this.__splitFunctionStringToArray(f).forEach(function(i){h=g.__splitFunctionNameAndParams(i);
g.__objectifiedFunctions[h[1]]=h[2]});return this.__objectifiedFunctions}};d.exports=a
},{}],236:[function(b,c,a){var g=b("ac-dom-styles");var h={};var f=function(){return{x:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,y:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop}
};var d=function(){return{height:window.innerHeight||document.documentElement.clientHeight,width:window.innerWidth||document.documentElement.clientWidth}
};h.cumulativeOffset=function(j){var k=h.getBoundingBox(j);var i=f();var l=[k.top+i.y,k.left+i.x];
l.top=l[0];l.left=l[1];return l};h.getBoundingBox=function(k){var l=k.getBoundingClientRect();
var j=l.width||l.right-l.left;var i=l.height||l.bottom-l.top;return{top:l.top,right:l.right,bottom:l.bottom,left:l.left,width:j,height:i}
};h.getInnerDimensions=function(n){var o=h.getBoundingBox(n);var m=o.width;var i=o.height;
var l;var j;var k=window.getComputedStyle?window.getComputedStyle(n,null):null;
["padding","border"].forEach(function(p){["Top","Right","Bottom","Left"].forEach(function(q){l=p==="border"?p+q+"Width":p+q;
j=parseFloat(g.getStyle(n,l,k));j=isNaN(j)?0:j;if(q==="Right"||q==="Left"){m-=j
}if(q==="Top"||q==="Bottom"){i-=j}})});return{width:m,height:i}};h.getOuterDimensions=function(l){var n=h.getBoundingBox(l);
var k=n.width;var i=n.height;var m;var j=window.getComputedStyle?window.getComputedStyle(l,null):null;
["margin"].forEach(function(o){["Top","Right","Bottom","Left"].forEach(function(p){m=parseFloat(g.getStyle(l,o+p,j));
m=isNaN(m)?0:m;if(p==="Right"||p==="Left"){k+=m}if(p==="Top"||p==="Bottom"){i+=m
}})});return{width:k,height:i}};h.pixelsInViewport=function(k,j){var l;var m=d();
j=j||h.getBoundingBox(k);var i=j.top;if(i>=0){l=m.height-i;if(l>j.height){l=j.height
}}else{l=j.height+i}if(l<0){l=0}if(l>m.height){l=m.height}return l};h.percentInViewport=function(j){var i=h.getBoundingBox(j);
var k=h.pixelsInViewport(j,i);return k/i.height};h.isInViewport=function(k,j){var i=h.percentInViewport(k);
if(typeof j!=="number"||1<j||j<0){j=0}return(i>j||i===1)};b("./ac-dom-metrics/ie")(h);
c.exports=h},{"./ac-dom-metrics/ie":237,"ac-dom-styles":233}],237:[function(b,c,a){c.exports=function(d){if(!("getBoundingClientRect" in document.createElement("_"))){d.getBoundingBox=function(h){var j=h.offsetLeft;
var i=h.offsetTop;var g=h.offsetWidth;var f=h.offsetHeight;return{top:i,right:j+g,bottom:i+f,left:j,width:g,height:f}
}}}},{}],238:[function(b,c,a){c.exports=b(26)},{}],239:[function(b,c,a){arguments[4][27][0].apply(a,arguments)
},{"./ac-object/clone":240,"./ac-object/create":241,"./ac-object/defaults":242,"./ac-object/extend":243,"./ac-object/getPrototypeOf":244,"./ac-object/isDate":245,"./ac-object/isEmpty":246,"./ac-object/isRegExp":247,"./ac-object/toQueryParameters":248}],240:[function(b,c,a){c.exports=b(28)
},{"./extend":243}],241:[function(b,c,a){c.exports=b(29)},{}],242:[function(b,c,a){c.exports=b(30)
},{"./extend":243}],243:[function(b,c,a){c.exports=b(31)},{}],244:[function(b,c,a){c.exports=b(32)
},{}],245:[function(b,c,a){c.exports=b(33)},{}],246:[function(b,c,a){c.exports=b(34)
},{}],247:[function(b,c,a){c.exports=b(35)},{}],248:[function(b,c,a){c.exports=b(36)
},{qs:238}],249:[function(b,d,a){var c={};c.addEventListener=function(j,h,i,g){if(j.addEventListener){j.addEventListener(h,i,g)
}else{if(j.attachEvent){j.attachEvent("on"+h,i)}else{j["on"+h]=i}}return j};c.dispatchEvent=function(h,g){if(document.createEvent){h.dispatchEvent(new CustomEvent(g))
}else{h.fireEvent("on"+g,document.createEventObject())}return h};c.removeEventListener=function(j,h,i,g){if(j.removeEventListener){j.removeEventListener(h,i,g)
}else{j.detachEvent("on"+h,i)}return j};var f=/^(webkit|moz|ms|o)/i;c.addVendorPrefixEventListener=function(j,h,i,g){if(f.test(h)){h=h.replace(f,"")
}else{h=h.charAt(0).toUpperCase()+h.slice(1)}if(/WebKit/i.test(window.navigator.userAgent)){return c.addEventListener(j,"webkit"+h,i,g)
}else{if(/Opera/i.test(window.navigator.userAgent)){return c.addEventListener(j,"O"+h,i,g)
}else{if(/Gecko/i.test(window.navigator.userAgent)){return c.addEventListener(j,h.toLowerCase(),i,g)
}else{h=h.charAt(0).toLowerCase()+h.slice(1);return c.addEventListener(j,h,i,g)
}}}};c.removeVendorPrefixEventListener=function(j,h,i,g){if(f.test(h)){h=h.replace(f,"")
}else{h=h.charAt(0).toUpperCase()+h.slice(1)}c.removeEventListener(j,"webkit"+h,i,g);
c.removeEventListener(j,"O"+h,i,g);c.removeEventListener(j,h.toLowerCase(),i,g);
h=h.charAt(0).toLowerCase()+h.slice(1);return c.removeEventListener(j,h,i,g)};c.stop=function(g){if(!g){g=window.event
}if(g.stopPropagation){g.stopPropagation()}else{g.cancelBubble=true}if(g.preventDefault){g.preventDefault()
}g.stopped=true;g.returnValue=false};c.target=function(g){return(typeof g.target!=="undefined")?g.target:g.srcElement
};d.exports=c},{}],250:[function(b,c,a){arguments[4][87][0].apply(a,arguments)},{"./ac-dom-traversal/ancestor":251,"./ac-dom-traversal/ancestors":252,"./ac-dom-traversal/children":253,"./ac-dom-traversal/filterBySelector":254,"./ac-dom-traversal/firstChild":255,"./ac-dom-traversal/lastChild":258,"./ac-dom-traversal/matchesSelector":259,"./ac-dom-traversal/nextSibling":260,"./ac-dom-traversal/nextSiblings":261,"./ac-dom-traversal/previousSibling":262,"./ac-dom-traversal/previousSiblings":263,"./ac-dom-traversal/querySelector":264,"./ac-dom-traversal/querySelectorAll":265,"./ac-dom-traversal/shims/ie":266,"./ac-dom-traversal/siblings":267}],251:[function(b,c,a){arguments[4][88][0].apply(a,arguments)
},{"./helpers/validate":257,"./matchesSelector":259,"ac-dom-nodes":148}],252:[function(b,c,a){arguments[4][89][0].apply(a,arguments)
},{"./helpers/validate":257,"./matchesSelector":259,"ac-dom-nodes":148}],253:[function(b,c,a){arguments[4][90][0].apply(a,arguments)
},{"./filterBySelector":254,"./helpers/validate":257,"ac-dom-nodes":148}],254:[function(b,c,a){arguments[4][91][0].apply(a,arguments)
},{"./helpers/validate":257,"./matchesSelector":259}],255:[function(b,c,a){arguments[4][92][0].apply(a,arguments)
},{"./children":253,"./helpers/validate":257}],256:[function(b,c,a){c.exports=b(93)
},{}],257:[function(b,c,a){c.exports=b(94)},{"ac-dom-nodes":148}],258:[function(b,c,a){arguments[4][95][0].apply(a,arguments)
},{"./children":253,"./helpers/validate":257}],259:[function(b,c,a){c.exports=b(96)
},{"./helpers/nativeMatches":256,"./helpers/validate":257,"ac-dom-nodes":148}],260:[function(b,c,a){arguments[4][97][0].apply(a,arguments)
},{"./helpers/validate":257,"./matchesSelector":259,"ac-dom-nodes":148}],261:[function(b,c,a){arguments[4][98][0].apply(a,arguments)
},{"./helpers/validate":257,"./matchesSelector":259,"ac-dom-nodes":148}],262:[function(b,c,a){arguments[4][99][0].apply(a,arguments)
},{"./helpers/validate":257,"./matchesSelector":259,"ac-dom-nodes":148}],263:[function(b,c,a){arguments[4][100][0].apply(a,arguments)
},{"./helpers/validate":257,"./matchesSelector":259,"ac-dom-nodes":148}],264:[function(b,c,a){c.exports=b(101)
},{"./helpers/validate":257}],265:[function(b,c,a){c.exports=b(102)},{"./helpers/validate":257}],266:[function(b,c,a){c.exports=b(103)
},{"../helpers/nativeMatches":256,"../helpers/validate":257,"../vendor/sizzle/sizzle":268,"ac-dom-nodes":148}],267:[function(b,c,a){arguments[4][104][0].apply(a,arguments)
},{"./children":253,"./helpers/validate":257}],268:[function(b,c,a){c.exports=b(105)
},{}],269:[function(b,c,a){c.exports={DOMEmitter:b("./ac-dom-emitter/DOMEmitter")}
},{"./ac-dom-emitter/DOMEmitter":270}],270:[function(c,b,d){var f;var j=c("ac-event-emitter").EventEmitter,g=c("ac-dom-events"),a=c("ac-dom-traversal");
var i="dom-emitter";function h(k){if(k===null){return}this.el=k;this._bindings={};
this._delegateFuncs={};this._eventEmitter=new j()}f=h.prototype;f._parseEventNames=function(k){if(!k){return[k]
}return k.split(" ")};f._onListenerEvent=function(l,k){this.trigger(l,k,false)};
f._setListener=function(k){this._bindings[k]=this._onListenerEvent.bind(this,k);
g.addEventListener(this.el,k,this._bindings[k])};f._removeListener=function(k){g.removeEventListener(this.el,k,this._bindings[k]);
this._bindings[k]=null};f._triggerInternalEvent=function(k,l){this.trigger(i+":"+k,l)
};f._normalizeArgumentsAndCall=function(k,m){var q={};if(k.length===0){m.call(this,q);
return}if(typeof k[0]==="string"||k[0]===null){k=this._cleanStringData(k);q.events=k[0];
if(typeof k[1]==="string"){q.delegateQuery=k[1];q.callback=k[2];q.context=k[3]}else{q.callback=k[1];
q.context=k[2]}m.call(this,q);return}var l,o,p=":",n=k[0];for(l in n){if(n.hasOwnProperty(l)){q={};
o=this._cleanStringData(l.split(p));q.events=o[0];q.delegateQuery=o[1];q.callback=n[l];
q.context=k[1];m.call(this,q)}}};f._registerDelegateFunc=function(m,o,p,k,n){var l=this._delegateFunc.bind(this,m,o,p,n);
this._delegateFuncs[o]=this._delegateFuncs[o]||{};this._delegateFuncs[o][m]=this._delegateFuncs[o][m]||[];
this._delegateFuncs[o][m].push({func:k,context:n,delegateFunc:l});return l};f._cleanStringData=function(n){var m=false;
if(typeof n==="string"){n=[n];m=true}var l=[],p,r,q,o,k=n.length;for(p=0;p<k;p++){r=n[p];
if(typeof r==="string"){if(r===""||r===" "){continue}q=r.length;while(r[0]===" "){r=r.slice(1,q);
q--}while(r[q-1]===" "){r=r.slice(0,q-1);q--}}l.push(r)}if(m){return l[0]}return l
};f._unregisterDelegateFunc=function(m,p,k,o){if(!this._delegateFuncs[p]||!this._delegateFuncs[p][m]){return
}var n=this._getDelegateFuncBindingIdx(m,p,k,o),l;if(n>-1){l=this._delegateFuncs[p][m][n].delegateFunc;
this._delegateFuncs[p][m].splice(n,1);if(this._delegateFuncs[p][m].length===0){this._delegateFuncs[p][m]=null
}}return l};f._unregisterDelegateFuncs=function(k,m){if(!this._delegateFuncs[m]){return
}if(k!==null&&!this._delegateFuncs[m][k]){return}if(k===null){var l;for(l in this._delegateFuncs[m]){if(this._delegateFuncs[m].hasOwnProperty(l)){this._unbindDelegateFunc(l,m)
}}return}this._unbindDelegateFunc(k,m)};f._unbindDelegateFunc=function(k,m){var n,o,l=0;
while(this._delegateFuncs[m][k]&&this._delegateFuncs[m][k][l]){n=this._delegateFuncs[m][k][l];
o=this._delegateFuncs[m][k][l].length;this._off({events:k,delegateQuery:m,callback:n.func,context:n.context});
if(this._delegateFuncs[m][k]&&o===this._delegateFuncs[m][k].length){l++}}n=o=null
};f._unregisterDelegateFuncsByEvent=function(k){var l;for(l in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(l)){this._unregisterDelegateFuncs(k,l)
}}};f._delegateFunc=function(k,o,q,m,p){if(a.matchesSelector(g.target(p),o)){var l=Array.prototype.slice.call(arguments,0),n=l.slice(4,l.length);
m=m||window;if(typeof p.detail==="object"){n[0]=p.detail}q.call(m,n)}};f.on=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._on);
return this};f.once=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._once);
return this};f.off=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._off);
return this};f._on=function(o){var l=o.events,p=o.callback,n=o.delegateQuery,m=o.context,k=o.unboundCallback||p;
l=this._parseEventNames(l);l.forEach(function(u,q,s,t,r){if(!this.has(r)){this._setListener(r)
}if(typeof t==="string"){u=this._registerDelegateFunc(r,t,u,q,s)}this._triggerInternalEvent("willon",{evt:r,callback:u,context:s,delegateQuery:t});
this._eventEmitter.on(r,u,s);this._triggerInternalEvent("didon",{evt:r,callback:u,context:s,delegateQuery:t})
}.bind(this,p,k,m,n));l=p=k=n=m=null};f._off=function(p){var l=p.events,q=p.callback,o=p.delegateQuery,n=p.context,k=p.unboundCallback||q;
if(typeof l==="undefined"){this._eventEmitter.off();var m;for(m in this._bindings){if(this._bindings.hasOwnProperty(m)){this._removeListener(m)
}}for(m in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(m)){this._delegateFuncs[m]=null
}}return}l=this._parseEventNames(l);l.forEach(function(v,r,t,u,s){if(typeof u==="string"&&typeof r==="function"){v=this._unregisterDelegateFunc(s,u,r,t);
if(!v){return}}if(typeof u==="string"&&typeof v==="undefined"){this._unregisterDelegateFuncs(s,u);
return}if(typeof s==="string"&&typeof v==="undefined"){this._unregisterDelegateFuncsByEvent(s);
if(typeof u==="string"){return}}this._triggerInternalEvent("willoff",{evt:s,callback:v,context:t,delegateQuery:u});
this._eventEmitter.off(s,v,t);this._triggerInternalEvent("didoff",{evt:s,callback:v,context:t,delegateQuery:u});
if(!this.has(s)){this._removeListener(s)}}.bind(this,q,k,n,o));l=q=k=o=n=null};
f._once=function(n){var k=n.events,o=n.callback,m=n.delegateQuery,l=n.context;k=this._parseEventNames(k);
k.forEach(function(s,q,r,p){if(typeof r==="string"){return this._handleDelegateOnce(p,s,q,r)
}if(!this.has(p)){this._setListener(p)}this._triggerInternalEvent("willonce",{evt:p,callback:s,context:q,delegateQuery:r});
this._eventEmitter.once.call(this,p,s,q);this._triggerInternalEvent("didonce",{evt:p,callback:s,context:q,delegateQuery:r})
}.bind(this,o,l,m));k=o=m=l=null};f._handleDelegateOnce=function(k,n,l,m){this._triggerInternalEvent("willonce",{evt:k,callback:n,context:l,delegateQuery:m});
this._on({events:k,context:l,delegateQuery:m,callback:this._getDelegateOnceCallback.bind(this,k,n,l,m),unboundCallback:n});
this._triggerInternalEvent("didonce",{evt:k,callback:n,context:l,delegateQuery:m});
return this};f._getDelegateOnceCallback=function(k,p,m,o){var l=Array.prototype.slice.call(arguments,0),n=l.slice(4,l.length);
p.apply(m,n);this._off({events:k,delegateQuery:o,callback:p,context:m})};f._getDelegateFuncBindingIdx=function(r,o,m,k,s){var q=-1;
if(this._delegateFuncs[o]&&this._delegateFuncs[o][r]){var n,l,p=this._delegateFuncs[o][r].length;
for(n=0;n<p;n++){l=this._delegateFuncs[o][r][n];if(s&&typeof m==="undefined"){m=l.func
}if(l.func===m&&l.context===k){q=n;break}}}return q};f._triggerDelegateEvents=function(n,p,q){var m=a.querySelectorAll(p,this.el);
var o,r,k=m.length;for(o=0;o<k;o++){r=m[o];if(document.createEvent){r.dispatchEvent(new CustomEvent(n,{bubbles:true,cancelable:false,detail:q}))
}else{var l=document.createEventObject();l.detail=q;r.fireEvent("on"+n,l)}return r
}};f.has=function(k,p,o,m){var n,q;if(typeof p==="string"){n=p;q=o}else{q=p;m=o
}if(n){var l=this._getDelegateFuncBindingIdx(k,n,q,m,true);if(l>-1){return true
}return false}if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};f.trigger=function(l,k,m,p){l=this._parseEventNames(l);var n,o;if(typeof k==="string"){n=this._cleanStringData(k);
o=m}else{o=k;p=m}l=this._cleanStringData(l);l.forEach(function(r,s,t,q){if(r){this._triggerDelegateEvents(q,r,s);
return}this._eventEmitter.trigger(q,s,t)}.bind(this,n,o,p));return this};f.propagateTo=function(k,l){this._eventEmitter.propagateTo(k,l);
return this};f.stopPropagatingTo=function(k){this._eventEmitter.stopPropagatingTo(k);
return this};f.destroy=function(){this._triggerInternalEvent("willdestroy");this.off();
this.el=this._eventEmitter=this._bindings=this._delegateFuncs=null};b.exports=h
},{"ac-dom-events":249,"ac-dom-traversal":250,"ac-event-emitter":false}],271:[function(b,c,a){c.exports={SharedInstance:b("./ac-shared-instance/SharedInstance")}
},{"./ac-shared-instance/SharedInstance":272}],272:[function(d,h,c){var i=window,g="AC",a="SharedInstance",f=i[g];
var b=(function(){var j={};return{get:function(l,k){var m=null;if(j[l]&&j[l][k]){m=j[l][k]
}return m},set:function(m,k,l){if(!j[m]){j[m]={}}if(typeof l==="function"){j[m][k]=new l()
}else{j[m][k]=l}return j[m][k]},share:function(m,k,l){var n=this.get(m,k);if(!n){n=this.set(m,k,l)
}return n},remove:function(l,k){var m=typeof k;if(m==="string"||m==="number"){if(!j[l]||!j[l][k]){return
}j[l][k]=null;return}if(j[l]){j[l]=null}}}}());if(!f){f=i[g]={}}if(!f[a]){f[a]=b
}h.exports=f[a]},{}],273:[function(b,c,a){c.exports={WindowDelegate:b("./ac-window-delegate/WindowDelegate"),WindowDelegateOptimizer:b("./ac-window-delegate/WindowDelegateOptimizer"),WindowDelegateCustomEvent:b("./ac-window-delegate/WindowDelegateCustomEvent")}
},{"./ac-window-delegate/WindowDelegate":276,"./ac-window-delegate/WindowDelegateCustomEvent":277,"./ac-window-delegate/WindowDelegateOptimizer":278}],274:[function(b,c,a){var f=b("ac-event-emitter").EventEmitter;
var g=function(){this._emitter=new f();this._customEvents={}};var d=g.prototype;
d.on=function(h,j,i){this._activateCustomEvents(h);this._emitterOn.apply(this,arguments);
return this};d.once=function(h,j,i){this._emitterOnce.apply(this,arguments);return this
};d.off=function(h,j,i){this._emitterOff.apply(this,arguments);this._deactivateCustomEvents(h);
return this};d.has=function(h,j,i){return this._emitter.has.apply(this._emitter,arguments)
};d.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};d.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};d.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};d.add=function(h){this._customEvents[h.name]=h};d.canHandleCustomEvent=function(h){return this._customEvents.hasOwnProperty(h)
};d.isHandlingCustomEvent=function(h){if(this._customEvents[h]&&this._customEvents[h].active){return true
}return false};d._activateCustomEvents=function(l){var j=l.split(" "),k,m,h=j.length;
for(m=0;m<h;m++){k=j[m];if(this._customEvents[k]&&!this._customEvents[k].active){this._customEvents[k].initialize();
this._customEvents[k].active=true}}};d._deactivateCustomEvents=function(k){var l;
if(!k||k.length===0){for(l in this._customEvents){if(this._customEvents.hasOwnProperty(l)){this._deactivateCustomEvent(l)
}}return}var j=k.split(" "),h=j.length;for(l=0;l<h;l++){this._deactivateCustomEvent(j[l])
}};d._deactivateCustomEvent=function(h){if(!this.has(h)&&this._customEvents[h]&&this._customEvents[h].active){this._customEvents[h].deinitialize();
this._customEvents[h].active=false}};d._emitterOn=function(){this._emitter.on.apply(this._emitter,arguments)
};d._emitterOnce=function(){this._emitter.once.apply(this._emitter,arguments)};
d._emitterOff=function(){this._emitter.off.apply(this._emitter,arguments)};c.exports=g
},{"ac-event-emitter":false}],275:[function(b,c,a){var g=b("ac-event-emitter").EventEmitter;
var f;var d=function(h){g.call(this);this.optimizers=h;this._events={};this._properties={};
this._initialize()};f=d.prototype=new g(null);f.canOptimizeEvent=function(h){return this._events.hasOwnProperty(h)
};f.canOptimizeProperty=function(h){return this._properties.hasOwnProperty(h)};
f.isOptimizingEvent=function(h){if(this._events[h]&&this._events[h].active){return true
}return false};f.isOptimizingProperty=function(h){if(this._properties[h]&&this._properties[h].active){return true
}return false};f.add=function(h){this._setOptimizerEvents(h);this._setOptimizerProperties(h);
h.on("update",this._onUpdate,this);h.on("activate",this._onActivate,this);h.on("deactivate",this._onDeactivate,this)
};f.get=function(h){if(this.isOptimizingProperty(h)){return this._properties[h].value
}return null};f.set=function(i,h){if(!this._properties[i]){return false}this._properties[i].value=h;
return this};f.getOptimizerByEvent=function(h){if(this._events[h]){return this._events[h]
}return null};f._initialize=function(){var j,h;for(j in this.optimizers){if(this.optimizers.hasOwnProperty(j)){this.add(this.optimizers[j])
}}};f._onUpdate=function(h){this.set(h.prop,h.val)};f._onActivate=function(j){var k=j.propertyNames,l,h=k.length;
for(l=0;l<h;l++){this._properties[k[l]].active=true}};f._onDeactivate=function(j){var k=j.propertyNames,l,h=k.length;
for(l=0;l<h;l++){this._properties[k[l]].active=false}};f._setOptimizerEvents=function(j){var l,k=j.eventNames,h=k.length;
for(l=0;l<h;l++){this._setOptimizerEvent(k[l],j)}};f._setOptimizerEvent=function(i,h){if(this._events[i]){return
}this._events[i]=h};f._setOptimizerProperties=function(k){var l,j=k.propertyNames,h=j.length;
for(l=0;l<h;l++){this._setOptimizerProperty(j[l])}};f._setOptimizerProperty=function(h){if(this._properties.hasOwnProperty(h)){return
}this._properties[h]={};this._properties[h].active=false;this._properties[h].value=null
};c.exports=d},{"ac-event-emitter":false}],276:[function(d,b,g){var i;var c=d("ac-shared-instance").SharedInstance,l=d("ac-dom-emitter").DOMEmitter,j=d("./OptimizerController"),f=d("./CustomEventController"),h=d("./queries/queries"),m=d("./optimizers/optimizers");
var k="ac-window-delegate:WindowDelegate",a="2.0.1";function n(){this._emitter=new l(window);
this._controllers={optimizer:new j(m),customEvent:new f()};var o;for(o in h){if(h.hasOwnProperty(o)){this[o]=this._getProperty.bind(this,o);
h[o]=h[o].bind(this)}}this._bindEvents()}i=n.prototype;i.on=function(o,r,p){var q=this._seperateCustomEvents(o);
this._optimizeEvents(q.standardEvents);this._customEventOn(q.customEvents,r,p);
this._emitterOn.apply(this,arguments);return this};i.once=function(o,r,p){var q=this._seperateCustomEvents(o);
this._optimizeEvents(q.standardEvents);this._customEventOnce(q.customEvents,r,p);
this._emitterOnce.apply(this,arguments);return this};i.off=function(p,u,q){var t=this._seperateCustomEvents(p),r=false;
if(!p){r=true}this._customEventOff(t.customEvents,u,q,r);this._emitterOff.apply(this,arguments);
if(r){try{var o;for(o in this._controllers.optimizer._events){if(this._controllers.optimizer._events.hasOwnProperty(o)&&this._shouldDeoptimizeEvent(o,true)){this._deoptimizeEvent(o)
}}this._bindEvents()}catch(s){}}return this};i.has=function(o,q,p){return this._emitter.has.apply(this._emitter,arguments)
};i.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};i.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};i.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};i.addOptimizer=function(o){this._controllers.optimizer.add(o);return this
};i.addCustomEvent=function(o){this._controllers.customEvent.add(o);return this
};i._emitterOn=function(){this._emitter.on.apply(this._emitter,arguments)};i._emitterOnce=function(){this._emitter.once.apply(this._emitter,arguments)
};i._emitterOff=function(){this._emitter.off.apply(this._emitter,arguments)};i._onEventUnbound=function(p){var o=p.evt;
if(this._shouldDeoptimizeEvent(o)){this._deoptimizeEvent(o)}};i._customEventOn=function(o,q,p){if(o.length===0){return
}this._controllers.customEvent.on(o.join(" "),q,p)};i._customEventOnce=function(o,q,p){if(o.length===0){return
}this._controllers.customEvent.once(o.join(" "),q,p)};i._customEventOff=function(o,r,p,q){if(!q&&o.length===0){return
}if(q&&o.length===0){this._controllers.customEvent.off();return}this._controllers.customEvent.off(o.join(" "),r,p)
};i._getProperty=function(q,o){var p=null;if(!o){p=this._getOptimizedValue(q)}if(p===null){p=h[q].call(this,o)
}return p};i._optimizeEvents=function(q){var p,r,o=q.length;for(r=0;r<o;r++){p=q[r];
if(this._shouldOptimizeEvent(p)){this._optimizeEvent(p)}}};i._shouldOptimizeEvent=function(o){if(this._controllers.optimizer.canOptimizeEvent(o)&&!this._controllers.optimizer.isOptimizingEvent(o)){return true
}return false};i._shouldDeoptimizeEvent=function(o,p){if(this._controllers.optimizer.isOptimizingEvent(o)&&(p||this._emitter._eventEmitter._events[o].length<=1)){return true
}return false};i._optimizeEvent=function(p){var o=this._controllers.optimizer.getOptimizerByEvent(p);
o.activate();this._emitterOn(p,o.callback,o)};i._deoptimizeEvent=function(p){var o=this._controllers.optimizer.getOptimizerByEvent(p);
o.deactivate();this._emitterOff(p,o.callback,o)};i._getOptimizedValue=function(o){return this._controllers.optimizer.get(o)
};i._seperateCustomEvents=function(s){var p={customEvents:[],standardEvents:[]};
if(typeof s==="string"){var t=s.split(" "),q,r,o=t.length;for(r=0;r<o;r++){q=t[r];
if(this._controllers.customEvent.canHandleCustomEvent(q)){p.customEvents.push(q)
}else{p.standardEvents.push(q)}}}return p};i._bindEvents=function(){this._emitter.on("dom-emitter:didoff",this._onEventUnbound,this)
};b.exports=c.share(k,a,n)},{"./CustomEventController":274,"./OptimizerController":275,"./optimizers/optimizers":281,"./queries/queries":290,"ac-dom-emitter":269,"ac-shared-instance":271}],277:[function(c,d,a){var g=c("ac-event-emitter").EventEmitter;
function b(h,j,i){g.call(this);this.name=h;this.active=false;this._initializeFunc=j;
this._deinitializeFunc=i}var f=b.prototype=new g(null);f.initialize=function(){if(this._initializeFunc){this._initializeFunc()
}return this};f.deinitialize=function(){if(this._deinitializeFunc){this._deinitializeFunc()
}return this};d.exports=b},{"ac-event-emitter":false}],278:[function(c,d,b){var g=c("ac-event-emitter").EventEmitter;
function a(h,i){g.call(this);this.active=false;this.eventNames=h.eventNames;this.propertyNames=h.propertyNames;
this.options=h.options||{};this.callback=i}var f=a.prototype=new g(null);f.update=function(i,h){this.trigger("update",{prop:i,val:h})
};f.activate=function(){this.active=true;this.trigger("activate",this)};f.deactivate=function(){this.active=false;
this.trigger("deactivate",this)};d.exports=a},{"ac-event-emitter":false}],279:[function(f,g,b){var a=f("../../WindowDelegateOptimizer"),d=f("../../queries/queries");
var c={eventNames:["resize"],propertyNames:["clientWidth","clientHeight","innerWidth","innerHeight"]};
var h=new a(c,function(m){var l,k=c.propertyNames,j=k.length;for(l=0;l<j;l++){this.update(k[l],d[k[l]](true))
}});g.exports=h},{"../../WindowDelegateOptimizer":278,"../../queries/queries":290}],280:[function(g,h,b){var a=g("../../WindowDelegateOptimizer"),f=g("../../queries/queries");
var d={eventNames:["scroll"],propertyNames:["scrollX","scrollY","maxScrollX","maxScrollY"]};
var c=new a(d,function(m){var l,k=d.propertyNames,j=k.length;for(l=0;l<j;l++){this.update(k[l],f[k[l]](true))
}});h.exports=c},{"../../WindowDelegateOptimizer":278,"../../queries/queries":290}],281:[function(d,f,b){var c=d("./events/resize"),a=d("./events/scroll");
f.exports=[c,a]},{"./events/resize":279,"./events/scroll":280}],282:[function(b,c,a){var d=function(f){return document.documentElement.clientHeight
};c.exports=d},{}],283:[function(b,c,a){var d=function(f){return document.documentElement.clientWidth
};c.exports=d},{}],284:[function(b,d,a){var c=function(f){return window.innerHeight||this.clientHeight(f)
};d.exports=c},{}],285:[function(b,c,a){var d=function(f){return window.innerWidth||this.clientWidth(f)
};c.exports=d},{}],286:[function(c,d,a){var b=function(f){return document.body.scrollWidth-this.innerWidth()
};d.exports=b},{}],287:[function(c,d,b){var a=function(f){return document.body.scrollHeight-this.innerHeight()
};d.exports=a},{}],288:[function(b,c,a){var d=function(f){var h=window.pageXOffset;
if(!h){var g=document.documentElement||document.body.parentNode||document.body;
h=g.scrollLeft}return h};c.exports=d},{}],289:[function(b,c,a){var d=function(f){var h=window.pageYOffset;
if(!h){var g=document.documentElement||document.body.parentNode||document.body;
h=g.scrollTop}return h};c.exports=d},{}],290:[function(i,g,k){var b=i("./methods/innerWidth"),j=i("./methods/innerHeight"),d=i("./methods/clientWidth"),l=i("./methods/clientHeight"),c=i("./methods/scrollX"),a=i("./methods/scrollY"),h=i("./methods/maxScrollX"),f=i("./methods/maxScrollY");
g.exports={innerWidth:b,innerHeight:j,clientWidth:d,clientHeight:l,scrollX:c,scrollY:a,maxScrollX:h,maxScrollY:f}
},{"./methods/clientHeight":282,"./methods/clientWidth":283,"./methods/innerHeight":284,"./methods/innerWidth":285,"./methods/maxScrollX":286,"./methods/maxScrollY":287,"./methods/scrollX":288,"./methods/scrollY":289}],291:[function(b,c,a){var d=b("./ac-element-tracker/ElementTracker");
c.exports=new d();c.exports.ElementTracker=d},{"./ac-element-tracker/ElementTracker":292}],292:[function(d,c,h){var i;
var g=d("ac-object");var k=d("ac-dom-nodes");var a=d("ac-dom-metrics");var l=d("ac-array");
var n=d("ac-window-delegate").WindowDelegate;var j=d("./TrackedElement");var o=d("ac-event-emitter").EventEmitter;
var f={autoStart:false};function b(q,p){this.options=g.clone(f);this.options=typeof p==="object"?g.extend(this.options,p):this.options;
this.windowDelegate=n;this.tracking=false;this.elements=[];if(q&&(Array.isArray(q)||k.isNodeList(q)||k.isElement(q))){this.addElements(q)
}if(this.options.autoStart){this.start()}}i=b.prototype=g.create(o.prototype);var m=/^\[object (HTMLCollection|NodeList|Object)\]$/;
i._registerElements=function(p){p=[].concat(p);p.forEach(function(r){if(this._elementInDOM(r)){var q=new j(r);
q.offsetTop=q.element.offsetTop;this.elements.push(q)}},this)};i._registerTrackedElements=function(p){var q=[].concat(p);
q.forEach(function(r){if(this._elementInDOM(r.element)){r.offsetTop=r.element.offsetTop;
this.elements.push(r)}},this)};i._elementInDOM=function(r){var q=false;var p=document.getElementsByTagName("body")[0];
if(k.isElement(r)&&p.contains(r)){q=true}return q};i._onVPChange=function(){this.elements.forEach(function(p){this.refreshElementState(p)
},this)};i._elementPercentInView=function(p){return p.pixelsInView/p.height};i._elementPixelsInView=function(q){var t=0;
var s=q.top;var r=q.bottom;var p=this.windowDelegate.innerHeight();if(s<=0&&r>=p){t=p
}else{if(s>=0&&s<p&&r>p){t=p-s}else{if(s<0&&(r<p&&r>=0)){t=q.bottom}else{if(s>=0&&r<=p){t=q.height
}}}}return t};i._ifInView=function(p,q){if(!q){p.trigger("enterview",p)}};i._ifAlreadyInView=function(p){if(!p.inView){p.trigger("exitview",p)
}};i.addElements=function(p){p=k.isNodeList(p)?l.toArray(p):[].concat(p);p.forEach(function(q){this.addElement(q)
},this)};i.addElement=function(q){var p;if(k.isElement(q)){p=new j(q);this._registerTrackedElements(p)
}return p};i.removeElement=function(r){var q=[];var p;this.elements.forEach(function(s,t){if(s===r||s.element===r){q.push(t)
}});p=this.elements.filter(function(t,s){return q.indexOf(s)<0?true:false});this.elements=p
};i.stop=function(){if(this.tracking===true){this.tracking=false;this.windowDelegate.off("scroll resize orientationchange",this._onVPChange,this)
}};i.start=function(){if(this.tracking===false){this.tracking=true;this.windowDelegate.on("scroll resize orientationchange",this._onVPChange,this);
this.refreshAllElementStates()}};i.refreshAllElementStates=function(){this.elements.forEach(function(p){this.refreshElementState(p)
},this)};i.refreshElementState=function(p){var q=a.getBoundingBox(p.element);var r=p.inView;
p=g.extend(p,q);p.pixelsInView=this._elementPixelsInView(p);p.percentInView=this._elementPercentInView(p);
p.inView=p.pixelsInView>0;if(p.inView){this._ifInView(p,r)}if(r){this._ifAlreadyInView(p)
}return p};c.exports=b},{"./TrackedElement":293,"ac-array":224,"ac-dom-metrics":236,"ac-dom-nodes":148,"ac-event-emitter":false,"ac-object":239,"ac-window-delegate":273}],293:[function(d,f,c){var g;
var i=d("ac-dom-emitter").DOMEmitter;var a=d("ac-dom-nodes");var b=d("ac-object");
function h(j){if(a.isElement(j)){this.element=j}else{throw new TypeError("TrackedElement: "+j+" is not a valid DOM element")
}this.inView=false;this.percentInView=0;this.pixelsInView=0;this.offsetTop=0;this.top=0;
this.right=0;this.bottom=0;this.left=0;this.width=0;this.height=0;i.call(this,j)
}g=h.prototype=b.create(i.prototype);f.exports=h},{"ac-dom-emitter":231,"ac-dom-nodes":148,"ac-object":239}],294:[function(b,c,a){arguments[4][54][0].apply(a,arguments)
},{"./ac-browser/BrowserData":295,"./ac-browser/IE":296}],295:[function(b,c,a){var d=b("./data");
function f(){}f.prototype={__getBrowserVersion:function(h,i){var g;if(!h||!i){return
}var j=d.browser.filter(function(k){return k.identity===i});j.some(function(m){var k=m.versionSearch||i;
var l=h.indexOf(k);if(l>-1){g=parseFloat(h.substring(l+k.length+1));return true
}});return g},__getName:function(g){return this.__getIdentityStringFromArray(g)
},__getIdentity:function(g){if(g.string){return this.__matchSubString(g)}else{if(g.prop){return g.identity
}}},__getIdentityStringFromArray:function(g){for(var k=0,h=g.length,j;k<h;k++){j=this.__getIdentity(g[k]);
if(j){return j}}},__getOS:function(g){return this.__getIdentityStringFromArray(g)
},__getOSVersion:function(i,l){if(!i||!l){return}var k=d.os.filter(function(m){return m.identity===l
})[0];var g=k.versionSearch||l;var j=new RegExp(g+" ([\\d_\\.]+)","i");var h=i.match(j);
if(h!==null){return h[1].replace(/_/g,".")}},__matchSubString:function(h){var g=h.subString;
if(g){var i=g.test?!!g.test(h.string):h.string.indexOf(g)>-1;if(i){return h.identity
}}}};f.create=function(){var g=new f();var h={};h.name=g.__getName(d.browser);h.version=g.__getBrowserVersion(d.versionString,h.name);
h.os=g.__getOS(d.os);h.osVersion=g.__getOSVersion(d.versionString,h.os);return h
};c.exports=f},{"./data":297}],296:[function(b,c,a){c.exports=b(56)},{}],297:[function(b,c,a){c.exports={browser:[{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],298:[function(b,c,a){arguments[4][76][0].apply(a,arguments)},{"./ac-prefixer/Prefixer":299}],299:[function(b,c,a){c.exports=b(77)
},{"./Prefixer/camelCasedEvents":300}],300:[function(b,c,a){c.exports=b(78)},{}],301:[function(c,d,b){var h=c("./ac-feature/helpers/memoize");
var f=["cssPropertyAvailable","isRetina"];var g;var a={canvasAvailable:c("./ac-feature/canvasAvailable"),continuousScrollEventsAvailable:c("./ac-feature/continuousScrollEventsAvailable"),cookiesAvailable:c("./ac-feature/cookiesAvailable"),cssLinearGradientAvailable:c("./ac-feature/cssLinearGradientAvailable"),cssPropertyAvailable:c("./ac-feature/cssPropertyAvailable"),isDesktop:c("./ac-feature/isDesktop"),isHandheld:c("./ac-feature/isHandheld"),isRetina:c("./ac-feature/isRetina"),isTablet:c("./ac-feature/isTablet"),localStorageAvailable:c("./ac-feature/localStorageAvailable"),mediaElementsAvailable:c("./ac-feature/mediaElementsAvailable"),sessionStorageAvailable:c("./ac-feature/sessionStorageAvailable"),svgAvailable:c("./ac-feature/svgAvailable"),threeDTransformsAvailable:c("./ac-feature/threeDTransformsAvailable"),touchAvailable:c("./ac-feature/touchAvailable"),webGLAvailable:c("./ac-feature/webGLAvailable")};
for(g in a){if(f.indexOf(g)===-1){a[g]=h(a[g])}}d.exports=a},{"./ac-feature/canvasAvailable":302,"./ac-feature/continuousScrollEventsAvailable":303,"./ac-feature/cookiesAvailable":304,"./ac-feature/cssLinearGradientAvailable":305,"./ac-feature/cssPropertyAvailable":306,"./ac-feature/helpers/memoize":308,"./ac-feature/isDesktop":309,"./ac-feature/isHandheld":310,"./ac-feature/isRetina":311,"./ac-feature/isTablet":312,"./ac-feature/localStorageAvailable":313,"./ac-feature/mediaElementsAvailable":314,"./ac-feature/sessionStorageAvailable":315,"./ac-feature/svgAvailable":316,"./ac-feature/threeDTransformsAvailable":317,"./ac-feature/touchAvailable":318,"./ac-feature/webGLAvailable":319}],302:[function(b,c,a){var f=b("./helpers/globals");
c.exports=function d(){var g=f.getDocument();var h=g.createElement("canvas");return !!(typeof h.getContext==="function"&&h.getContext("2d"))
}},{"./helpers/globals":307}],303:[function(c,d,b){var g=c("ac-browser");var a=c("./touchAvailable");
d.exports=function f(){return(!a()||(g.os==="iOS"&&g.version>=8)||g.name==="Chrome")
}},{"./touchAvailable":318,"ac-browser":294}],304:[function(c,d,b){var f=c("./helpers/globals");
d.exports=function a(){var j=false;var g=f.getDocument();var i=f.getNavigator();
try{if("cookie" in g&&!!i.cookieEnabled){g.cookie="ac_feature_cookie=1";j=(g.cookie.indexOf("ac_feature_cookie")!==-1);
g.cookie="ac_feature_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"}}catch(h){}return j
}},{"./helpers/globals":307}],305:[function(d,f,c){var a=d("./cssPropertyAvailable");
f.exports=function b(){var g=["linear-gradient(to bottom right, #9f9, white)","linear-gradient(top left, #9f9, white)","gradient(linear, left top, right bottom, from(#9f9), to(white))"];
return g.some(function(h){return a("background-image",h)})}},{"./cssPropertyAvailable":306}],306:[function(c,d,b){var f=c("ac-prefixer");
d.exports=function a(h,g){if(typeof g!=="undefined"){return !!f.getStyleValue(h,g)
}else{return !!f.getStyleProperty(h)}}},{"ac-prefixer":298}],307:[function(b,c,a){c.exports={getWindow:function(){return window
},getDocument:function(){return document},getNavigator:function(){return navigator
}}},{}],308:[function(b,c,a){c.exports=function d(g){var f;return function(){if(typeof f!=="undefined"){return f
}else{return f=g()}}}},{}],309:[function(d,f,b){var a=d("./touchAvailable");var g=d("./helpers/globals");
f.exports=function c(){var h=g.getWindow();return(!a()&&!h.orientation)}},{"./helpers/globals":307,"./touchAvailable":318}],310:[function(f,g,c){var d=f("./isDesktop");
var a=f("./isTablet");g.exports=function b(){return(!d()&&!a())}},{"./isDesktop":309,"./isTablet":312}],311:[function(b,c,a){var d=b("./helpers/globals");
c.exports=function f(){var g=d.getWindow();return("devicePixelRatio" in g&&g.devicePixelRatio>=1.5)
}},{"./helpers/globals":307}],312:[function(d,f,b){var c=d("./isDesktop");var g=d("./helpers/globals");
f.exports=function a(){var i=g.getWindow();var h=i.screen.width;if(i.orientation&&i.screen.height<h){h=i.screen.height
}return(!c()&&h>=600)}},{"./helpers/globals":307,"./isDesktop":309}],313:[function(c,d,a){var f=c("./helpers/globals");
d.exports=function b(){var i=f.getWindow();var h=false;try{h=!!(i.localStorage&&i.localStorage.non_existent!==null)
}catch(g){}return h}},{"./helpers/globals":307}],314:[function(b,c,a){var f=b("./helpers/globals");
c.exports=function d(){var g=f.getWindow();return("HTMLMediaElement" in g)}},{"./helpers/globals":307}],315:[function(c,d,b){var f=c("./helpers/globals");
d.exports=function a(){var i=f.getWindow();var g=false;try{if("sessionStorage" in i&&typeof i.sessionStorage.setItem==="function"){i.sessionStorage.setItem("ac_feature","test");
g=true;i.sessionStorage.removeItem("ac_feature","test")}}catch(h){}return g}},{"./helpers/globals":307}],316:[function(c,d,b){var f=c("./helpers/globals");
d.exports=function a(){var g=f.getDocument();return g.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
}},{"./helpers/globals":307}],317:[function(c,d,b){var a=c("./cssPropertyAvailable");
d.exports=function f(){return(a("perspective","1px")&&a("transform","translateZ(0)"))
}},{"./cssPropertyAvailable":306}],318:[function(c,d,b){var f=c("./helpers/globals");
d.exports=function a(){var h=f.getWindow();var g=f.getDocument();return !!(("ontouchstart" in h)||h.DocumentTouch&&g instanceof h.DocumentTouch)
}},{"./helpers/globals":307}],319:[function(c,d,b){var f=c("./helpers/globals");
d.exports=function a(){var g=f.getDocument();var h=g.createElement("canvas");return !!(typeof h.getContext==="function"&&h.getContext("webgl"))
}},{"./helpers/globals":307}],320:[function(b,c,a){c.exports=b("./ac-fullscreen/fullscreen")
},{"./ac-fullscreen/fullscreen":326}],321:[function(b,c,a){c.exports={STANDARD:"standard",IOS:"ios"}
},{}],322:[function(f,c,i){var h=f("ac-dom-events/addEventListener");var m=f("ac-event-emitter").EventEmitter;
var a=f("./../events/types");var b=f("./../consts/modes");var d=new m();function k(n){d.trigger(a.ENTERFULLSCREEN,n)
}function l(n){d.trigger(a.EXITFULLSCREEN,n)}function g(n){if(d.fullscreenElement()){k(n)
}else{l(n)}}function j(){h(document,"fullscreenchange",g)}j();d.fullscreenEnabled=function(n){var o=document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled||("webkitCancelFullScreen" in document);
return !!(o)};d.fullscreenElement=function(){return document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement||document.webkitCurrentFullScreenElement
};d.exitFullscreen=function(n){var o;if(typeof document.exitFullscreen==="function"){o="exitFullscreen"
}else{if(typeof document.webkitExitFullscreen==="function"){o="webkitExitFullscreen"
}else{if(typeof document.webkitCancelFullScreen==="function"){o="webkitCancelFullScreen"
}else{if(typeof document.mozCancelFullScreen==="function"){o="mozCancelFullScreen"
}else{if(typeof document.msExitFullscreen==="function"){o="msExitFullscreen"}}}}}if(typeof document[o]==="function"){document[o].call(document)
}};d.requestFullscreen=function(n){var o;if(typeof n.requestFullscreen==="function"){o="requestFullscreen"
}else{if(typeof n.webkitRequestFullscreen==="function"){o="webkitRequestFullscreen"
}else{if(typeof n.webkitRequestFullScreen==="function"){o="webkitRequestFullScreen"
}else{if(typeof n.mozRequestFullScreen==="function"){o="mozRequestFullScreen"}else{if(typeof n.msRequestFullscreen==="function"){o="msRequestFullscreen"
}}}}}if(typeof n[o]==="function"){n[o].call(n)}};d.mode=b.STANDARD;c.exports=d},{"./../consts/modes":321,"./../events/types":325,"ac-dom-events/addEventListener":109,"ac-event-emitter":false}],323:[function(c,d,a){var b=c("./ios");
var f=c("./desktop");d.exports={create:function(){var g=f;if("webkitEnterFullscreen" in document.createElement("video")&&!("webkitRequestFullScreen" in document.createElement("div"))){g=b
}return g}}},{"./desktop":322,"./ios":324}],324:[function(f,d,h){var g=f("ac-dom-events/addEventListener");
var m=f("ac-event-emitter").EventEmitter;var a=f("./../events/types");var c=f("./../consts/modes");
var l;b();function b(){g(document,"webkitbeginfullscreen",k,true);g(document,"webkitendfullscreen",j,true)
}function k(n){i.trigger(a.ENTERFULLSCREEN,n)}function j(n){l=undefined;i.trigger(a.EXITFULLSCREEN,n)
}var i=new m();i.fullscreenEnabled=function(n){return !!(n.webkitSupportsFullscreen)
};i.fullscreenElement=function(){return l};i.exitFullscreen=function(n){if(n&&typeof n.webkitExitFullscreen==="function"){n.webkitExitFullscreen()
}};i.requestFullscreen=function(n){if(typeof n.webkitEnterFullscreen==="function"){n.webkitEnterFullscreen()
}};i.mode=c.IOS;d.exports=i},{"./../consts/modes":321,"./../events/types":325,"ac-dom-events/addEventListener":109,"ac-event-emitter":false}],325:[function(b,c,a){c.exports={ENTERFULLSCREEN:"enterfullscreen",EXITFULLSCREEN:"exitfullscreen"}
},{}],326:[function(c,b,d){var j=c("ac-event-emitter").EventEmitter;var h=c("./delegate/factory");
var a="Error: Element missing. ac-fullscreen requires an element to be specified";
var g=new j();var f=h.create();f.propagateTo(g);function i(){throw new Error(a)
}g.requestFullscreen=function(k){if(!k){i()}return f.requestFullscreen(k)};g.fullscreenEnabled=function(k){if(!k){i()
}return f.fullscreenEnabled(k)};g.fullscreenElement=function(){return f.fullscreenElement()
};g.exitFullscreen=function(k){if(!k){i()}return f.exitFullscreen(k)};g.getMode=function(){return f.mode
};b.exports=g},{"./delegate/factory":323,"ac-event-emitter":false}],327:[function(b,c,a){c.exports={TouchClick:b("./ac-gesture-touchclick/TouchClick")}
},{"./ac-gesture-touchclick/TouchClick":328}],328:[function(c,b,d){var g=c("ac-dom-events");
var j=c("ac-event-emitter").EventEmitter;var a=c("ac-object");var h=c("ac-feature");
function i(k){k=k||{};this.el=k.el;this._onTouchStart=this._onTouchStart.bind(this);
this._onTouchMove=this._onTouchMove.bind(this);this._onTouchEnd=this._onTouchEnd.bind(this);
this._onClick=this._onClick.bind(this);this._touchStart=false;this.activate()}var f=i.prototype=a.create(j.prototype);
f._broadcastClick=function(k){this.trigger("click",{originalEvent:k})};f._onClick=function(k){g.stop(k);
if(!this._touchAvailable()){this._broadcastClick(k)}};f._onTouchStart=function(){this._touchStart=true
};f._onTouchEnd=function(k){if(this._touchStart===true){g.stop(k);this._broadcastClick(k)
}this._touchStart=false};f._onTouchMove=function(){this._touchStart=false};f._touchAvailable=function(){return h.touchAvailable()
};f.activate=function(){if(this._touchAvailable()){g.addEventListener(this.el,"touchstart",this._onTouchStart);
g.addEventListener(this.el,"touchmove",this._onTouchMove);g.addEventListener(this.el,"touchend",this._onTouchEnd)
}g.addEventListener(this.el,"click",this._onClick)};f.deactivate=function(){g.removeEventListener(this.el,"touchstart",this._onTouchStart);
g.removeEventListener(this.el,"touchmove",this._onTouchMove);g.removeEventListener(this.el,"touchend",this._onTouchEnd);
g.removeEventListener(this.el,"click",this._onClick)};i.create=function(l,k){k=k||{};
return new i({el:l})};b.exports=i},{"ac-dom-events":111,"ac-event-emitter":false,"ac-feature":301,"ac-object":1033}],329:[function(b,c,a){arguments[4][76][0].apply(a,arguments)
},{"./ac-prefixer/Prefixer":330}],330:[function(b,c,a){c.exports=b(77)},{"./Prefixer/camelCasedEvents":331}],331:[function(b,c,a){c.exports=b(78)
},{}],332:[function(b,c,a){c.exports={addEventListener:b("./ac-dom-events/addEventListener"),dispatchEvent:b("./ac-dom-events/dispatchEvent"),removeEventListener:b("./ac-dom-events/removeEventListener"),stop:b("./ac-dom-events/stop"),target:b("./ac-dom-events/target")}
},{"./ac-dom-events/addEventListener":333,"./ac-dom-events/dispatchEvent":334,"./ac-dom-events/removeEventListener":335,"./ac-dom-events/stop":336,"./ac-dom-events/target":337}],333:[function(b,c,a){arguments[4][80][0].apply(a,arguments)
},{"ac-prefixer":329}],334:[function(b,c,a){c.exports=b(81)},{}],335:[function(b,c,a){arguments[4][83][0].apply(a,arguments)
},{"ac-prefixer":329}],336:[function(b,d,a){d.exports=function c(f){if(!f){f=window.event
}if(f.stopPropagation){f.stopPropagation()}else{f.cancelBubble=true}if(f.preventDefault){f.preventDefault()
}f.stopped=true;f.returnValue=false}},{}],337:[function(b,c,a){c.exports=function d(f){return(typeof f.target!=="undefined")?f.target:f.srcElement
}},{}],338:[function(c,d,b){var a=c("./ac-keyboard/Keyboard");d.exports=new a();
d.exports.Keyboard=a;d.exports.keys=c("./ac-keyboard/keymap")},{"./ac-keyboard/Keyboard":340,"./ac-keyboard/keymap":341}],339:[function(c,d,b){var a=["keyLocation"];
function f(g){this.originalEvent=g;var h;for(h in g){if(a.indexOf(h)===-1&&typeof g[h]!=="function"){this[h]=g[h]
}}this.location=(this.originalEvent.location!==undefined)?this.originalEvent.location:this.originalEvent.keyLocation
}f.prototype={preventDefault:function(){if(typeof this.originalEvent.preventDefault!=="function"){this.originalEvent.returnValue=false;
return}return this.originalEvent.preventDefault()},stopPropagation:function(){return this.originalEvent.stopPropagation()
}};d.exports=f},{}],340:[function(f,c,h){var k=f("ac-dom-events");var n=f("ac-event-emitter").EventEmitter;
var g=f("./KeyEvent");var j=f("./keymap");var l=0;var d=1;var a=2;var m=3;var i;
function b(){this._keysDown={};this._keyDownEmitter=new n();this._keyUpEmitter=new n();
k.addEventListener(document,"keydown",this._DOMKeyDown.bind(this),true);k.addEventListener(document,"keyup",this._DOMKeyUp.bind(this),true);
this._listening=[]}i=b.prototype;i._castEventNameNumberToString=function(o){if(typeof o==="number"){return o.toString()
}return o};i._DOMKeyDown=function(p){var o=this._normalizeKeyboardEvent(p);var q=o.keyCode.toString();
this._trackKeyDown(q);this._keyDownEmitter.trigger(q,o)};i._DOMKeyUp=function(p){var o=this._normalizeKeyboardEvent(p);
var q=o.keyCode.toString();this._trackKeyUp(q);this._keyUpEmitter.trigger(q,o)};
i.addKeyDown=function(){var o=Array.prototype.slice.call(arguments);var p=o.shift();
if(p===undefined){throw new TypeError('Could not listen for keyup event on "'+p+'"')
}p=this._castEventNameNumberToString(p);return this._keyDownEmitter.on.apply(this._keyDownEmitter,[p].concat(o))
};i.addKeyUp=function(){var o=Array.prototype.slice.call(arguments);var p=o.shift();
if(p===undefined){throw new TypeError('Could not listen for keyup event on "'+p+'"')
}p=this._castEventNameNumberToString(p);return this._keyUpEmitter.on.apply(this._keyUpEmitter,[p].concat(o))
};i.removeKeyDown=function(){var o=Array.prototype.slice.call(arguments);var p=o.shift();
p=this._castEventNameNumberToString(p);return this._keyDownEmitter.off.apply(this._keyDownEmitter,[p].concat(o))
};i.removeKeyUp=function(){var o=Array.prototype.slice.call(arguments);var p=o.shift();
p=this._castEventNameNumberToString(p);return this._keyUpEmitter.off.apply(this._keyUpEmitter,[p].concat(o))
};i.isDown=function(o){return this._keysDown[o]||false};i.isUp=function(o){return !this.isDown(o)
};i._trackKeyUp=function(o){if(this._keysDown[o]){this._keysDown[o]=false}};i._trackKeyDown=function(o){if(!this._keysDown[o]){this._keysDown[o]=true
}};i._normalizeKeyboardEvent=function(o){return new g(o)};c.exports=b},{"./KeyEvent":339,"./keymap":341,"ac-dom-events":332,"ac-event-emitter":false}],341:[function(b,c,a){c.exports={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CONTROL:17,ALT:18,COMMAND:91,CAPSLOCK:20,ESCAPE:27,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,NUMPAD_ZERO:96,NUMPAD_ONE:97,NUMPAD_TWO:98,NUMPAD_THREE:99,NUMPAD_FOUR:100,NUMPAD_FIVE:101,NUMPAD_SIX:102,NUMPAD_SEVEN:103,NUMPAD_EIGHT:104,NUMPAD_NINE:105,NUMPAD_ASTERISK:106,NUMPAD_PLUS:107,NUMPAD_DASH:109,NUMPAD_DOT:110,NUMPAD_SLASH:111,NUMPAD_EQUALS:187,TICK:192,LEFT_BRACKET:219,RIGHT_BRACKET:221,BACKSLASH:220,SEMICOLON:186,APOSTRAPHE:222,SPACEBAR:32,CLEAR:12,COMMA:188,DOT:190,SLASH:191}
},{}],342:[function(b,c,a){arguments[4][54][0].apply(a,arguments)},{"./ac-browser/BrowserData":343,"./ac-browser/IE":344}],343:[function(b,c,a){c.exports=b(295)
},{"./data":345}],344:[function(b,c,a){c.exports=b(56)},{}],345:[function(b,c,a){c.exports=b(297)
},{}],346:[function(b,c,a){c.exports={add:b("./ac-classlist/add"),contains:b("./ac-classlist/contains"),remove:b("./ac-classlist/remove"),toggle:b("./ac-classlist/toggle")}
},{"./ac-classlist/add":347,"./ac-classlist/contains":348,"./ac-classlist/remove":350,"./ac-classlist/toggle":351}],347:[function(b,c,a){var d=b("./helpers/className");
c.exports=function f(){var h=Array.prototype.slice.call(arguments);var g=h.shift(h);
if(g.classList&&g.classList.add){g.classList.add.apply(g.classList,h)}else{h.forEach(d.add.bind(this,g))
}}},{"./helpers/className":349}],348:[function(b,d,a){var f=b("./helpers/className");
d.exports=function c(h,g){if(h.classList&&h.classList.contains){return h.classList.contains(g)
}return f.contains(h,g)}},{"./helpers/className":349}],349:[function(c,d,a){var h=function(i){return new RegExp("(\\s|^)"+i+"(\\s|$)")
};var g=function(j,i){return h(i).test(j.className)};var f=function(j,i){if(!g(j,i)){j.className+=" "+i
}};var b=function(j,i){if(g(j,i)){j.className=j.className.replace(h(i),"$1").trim()
}};d.exports={contains:g,add:f,remove:b}},{}],350:[function(c,d,b){var f=c("./helpers/className");
d.exports=function a(){var h=Array.prototype.slice.call(arguments);var g=h.shift(h);
if(g.classList&&g.classList.remove){g.classList.remove.apply(g.classList,h)}else{h.forEach(f.remove.bind(this,g))
}}},{"./helpers/className":349}],351:[function(c,d,b){var f=c("./helpers/className");
d.exports=function a(j,i,k){var h=(typeof k!=="undefined");var g;if(j.classList&&j.classList.toggle){if(h){return j.classList.toggle(i,k)
}return j.classList.toggle(i)}if(h){g=!!k}else{g=!f.contains(j,i)}if(g){f.add(j,i)
}else{f.remove(j,i)}return g}},{"./helpers/className":349}],352:[function(b,c,a){arguments[4][76][0].apply(a,arguments)
},{"./ac-prefixer/Prefixer":353}],353:[function(b,c,a){c.exports=b(77)},{"./Prefixer/camelCasedEvents":354}],354:[function(b,c,a){c.exports=b(78)
},{}],355:[function(b,c,a){arguments[4][79][0].apply(a,arguments)},{"./ac-dom-events/addEventListener":356,"./ac-dom-events/dispatchEvent":357,"./ac-dom-events/preventDefault":358,"./ac-dom-events/removeEventListener":359,"./ac-dom-events/stop":360,"./ac-dom-events/stopPropagation":361,"./ac-dom-events/target":362}],356:[function(b,c,a){arguments[4][80][0].apply(a,arguments)
},{"ac-prefixer":352}],357:[function(b,c,a){c.exports=b(81)},{}],358:[function(b,c,a){c.exports=b(82)
},{}],359:[function(b,c,a){arguments[4][83][0].apply(a,arguments)},{"ac-prefixer":352}],360:[function(b,c,a){c.exports=b(84)
},{"./preventDefault":358,"./stopPropagation":361}],361:[function(b,c,a){c.exports=b(85)
},{}],362:[function(b,c,a){c.exports=b(86)},{}],363:[function(b,c,a){c.exports=b(139)
},{}],364:[function(b,c,a){c.exports=b(140)},{}],365:[function(b,c,a){c.exports=b(141)
},{}],366:[function(b,c,a){c.exports=b(142)},{}],367:[function(b,c,a){c.exports=b(143)
},{}],368:[function(b,c,a){c.exports=b(144)},{}],369:[function(b,c,a){c.exports=b(145)
},{}],370:[function(b,c,a){arguments[4][146][0].apply(a,arguments)},{"./ELEMENT_NODE":367,"./internal/isNodeType":378,"ac-polyfills/Array/prototype.filter":388,"ac-polyfills/Array/prototype.slice":390}],371:[function(b,c,a){c.exports=b(147)
},{}],372:[function(b,c,a){arguments[4][148][0].apply(a,arguments)},{"./COMMENT_NODE":363,"./DOCUMENT_FRAGMENT_NODE":364,"./DOCUMENT_NODE":365,"./DOCUMENT_TYPE_NODE":366,"./ELEMENT_NODE":367,"./TEXT_NODE":368,"./createDocumentFragment":369,"./filterByNodeType":370,"./hasAttribute":371,"./indexOf":373,"./insertAfter":374,"./insertBefore":375,"./insertFirstChild":376,"./insertLastChild":377,"./isComment":380,"./isDocument":381,"./isDocumentFragment":382,"./isDocumentType":383,"./isElement":384,"./isNode":385,"./isNodeList":386,"./isTextNode":387,"./remove":391,"./replace":392}],373:[function(b,c,a){arguments[4][149][0].apply(a,arguments)
},{"./filterByNodeType":370,"./internal/validate":379,"ac-polyfills/Array/prototype.indexOf":389,"ac-polyfills/Array/prototype.slice":390}],374:[function(b,c,a){arguments[4][150][0].apply(a,arguments)
},{"./internal/validate":379}],375:[function(b,c,a){arguments[4][151][0].apply(a,arguments)
},{"./internal/validate":379}],376:[function(b,c,a){arguments[4][152][0].apply(a,arguments)
},{"./internal/validate":379}],377:[function(b,c,a){arguments[4][153][0].apply(a,arguments)
},{"./internal/validate":379}],378:[function(b,c,a){c.exports=b(154)},{"../isNode":385}],379:[function(b,c,a){arguments[4][155][0].apply(a,arguments)
},{"../COMMENT_NODE":363,"../DOCUMENT_FRAGMENT_NODE":364,"../ELEMENT_NODE":367,"../TEXT_NODE":368,"./isNodeType":378}],380:[function(b,c,a){arguments[4][156][0].apply(a,arguments)
},{"./COMMENT_NODE":363,"./internal/isNodeType":378}],381:[function(b,c,a){arguments[4][157][0].apply(a,arguments)
},{"./DOCUMENT_NODE":365,"./internal/isNodeType":378}],382:[function(b,c,a){arguments[4][158][0].apply(a,arguments)
},{"./DOCUMENT_FRAGMENT_NODE":364,"./internal/isNodeType":378}],383:[function(b,c,a){arguments[4][159][0].apply(a,arguments)
},{"./DOCUMENT_TYPE_NODE":366,"./internal/isNodeType":378}],384:[function(b,c,a){arguments[4][160][0].apply(a,arguments)
},{"./ELEMENT_NODE":367,"./internal/isNodeType":378}],385:[function(b,c,a){c.exports=b(161)
},{}],386:[function(b,c,a){c.exports=b(162)},{}],387:[function(b,c,a){arguments[4][163][0].apply(a,arguments)
},{"./TEXT_NODE":368,"./internal/isNodeType":378}],388:[function(b,c,a){c.exports=b(52)
},{}],389:[function(b,c,a){c.exports=b(165)},{}],390:[function(b,c,a){c.exports=b(66)
},{}],391:[function(b,c,a){arguments[4][167][0].apply(a,arguments)},{"./internal/validate":379}],392:[function(b,c,a){arguments[4][168][0].apply(a,arguments)
},{"./internal/validate":379}],393:[function(b,c,a){arguments[4][87][0].apply(a,arguments)
},{"./ac-dom-traversal/ancestor":394,"./ac-dom-traversal/ancestors":395,"./ac-dom-traversal/children":396,"./ac-dom-traversal/filterBySelector":397,"./ac-dom-traversal/firstChild":398,"./ac-dom-traversal/lastChild":401,"./ac-dom-traversal/matchesSelector":402,"./ac-dom-traversal/nextSibling":403,"./ac-dom-traversal/nextSiblings":404,"./ac-dom-traversal/previousSibling":405,"./ac-dom-traversal/previousSiblings":406,"./ac-dom-traversal/querySelector":407,"./ac-dom-traversal/querySelectorAll":408,"./ac-dom-traversal/shims/ie":409,"./ac-dom-traversal/siblings":410}],394:[function(b,c,a){arguments[4][88][0].apply(a,arguments)
},{"./helpers/validate":400,"./matchesSelector":402,"ac-dom-nodes":372}],395:[function(b,c,a){arguments[4][89][0].apply(a,arguments)
},{"./helpers/validate":400,"./matchesSelector":402,"ac-dom-nodes":372}],396:[function(b,c,a){arguments[4][90][0].apply(a,arguments)
},{"./filterBySelector":397,"./helpers/validate":400,"ac-dom-nodes":372}],397:[function(b,c,a){arguments[4][91][0].apply(a,arguments)
},{"./helpers/validate":400,"./matchesSelector":402}],398:[function(b,c,a){arguments[4][92][0].apply(a,arguments)
},{"./children":396,"./helpers/validate":400}],399:[function(b,c,a){c.exports=b(93)
},{}],400:[function(b,c,a){arguments[4][94][0].apply(a,arguments)},{"ac-dom-nodes":372}],401:[function(b,c,a){arguments[4][95][0].apply(a,arguments)
},{"./children":396,"./helpers/validate":400}],402:[function(b,c,a){arguments[4][96][0].apply(a,arguments)
},{"./helpers/nativeMatches":399,"./helpers/validate":400,"ac-dom-nodes":372}],403:[function(b,c,a){arguments[4][97][0].apply(a,arguments)
},{"./helpers/validate":400,"./matchesSelector":402,"ac-dom-nodes":372}],404:[function(b,c,a){arguments[4][98][0].apply(a,arguments)
},{"./helpers/validate":400,"./matchesSelector":402,"ac-dom-nodes":372}],405:[function(b,c,a){arguments[4][99][0].apply(a,arguments)
},{"./helpers/validate":400,"./matchesSelector":402,"ac-dom-nodes":372}],406:[function(b,c,a){arguments[4][100][0].apply(a,arguments)
},{"./helpers/validate":400,"./matchesSelector":402,"ac-dom-nodes":372}],407:[function(b,c,a){arguments[4][101][0].apply(a,arguments)
},{"./helpers/validate":400}],408:[function(b,c,a){arguments[4][102][0].apply(a,arguments)
},{"./helpers/validate":400}],409:[function(b,c,a){arguments[4][103][0].apply(a,arguments)
},{"../helpers/nativeMatches":399,"../helpers/validate":400,"../vendor/sizzle/sizzle":411,"ac-dom-nodes":372}],410:[function(b,c,a){arguments[4][104][0].apply(a,arguments)
},{"./children":396,"./helpers/validate":400}],411:[function(b,c,a){c.exports=b(105)
},{}],412:[function(b,c,a){arguments[4][106][0].apply(a,arguments)},{"./ac-dom-emitter/DOMEmitter":413}],413:[function(c,b,d){var f;
var k=c("ac-event-emitter").EventEmitter,j=c("./DOMEmitterEvent"),g=c("ac-dom-events"),a=c("ac-dom-traversal");
var i="dom-emitter";function h(l){if(l===null){return}this.el=l;this._bindings={};
this._delegateFuncs={};this._eventEmitter=new k()}f=h.prototype;f.on=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._on);
return this};f.once=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._once);
return this};f.off=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._off);
return this};f.has=function(l,q,p,n){var o,r;if(typeof q==="string"){o=q;r=p}else{r=q;
n=p}if(o){var m=this._getDelegateFuncBindingIdx(l,o,r,n,true);if(m>-1){return true
}return false}if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};f.trigger=function(n,m,o,s){n=this._parseEventNames(n);n=this._cleanStringData(n);
var q,r,p,l=n.length;if(typeof m==="string"){q=this._cleanStringData(m);r=o}else{r=m;
s=o}for(p=0;p<l;p++){this._triggerDOMEvents(n[p],r,q)}return this};f.emitterTrigger=function(m,o,p){m=this._parseEventNames(m);
m=this._cleanStringData(m);o=new j(o,this);var n,l=m.length;for(n=0;n<l;n++){this._eventEmitter.trigger(m[n],o,p)
}return this};f.propagateTo=function(l,m){this._eventEmitter.propagateTo(l,m);return this
};f.stopPropagatingTo=function(l){this._eventEmitter.stopPropagatingTo(l);return this
};f.stopImmediatePropagation=function(){this._eventEmitter.stopImmediatePropagation();
return this};f.destroy=function(){this._triggerInternalEvent("willdestroy");this.off();
this.el=this._eventEmitter=this._bindings=this._delegateFuncs=null};f._parseEventNames=function(l){if(!l){return[l]
}return l.split(" ")};f._onListenerEvent=function(m,l){this.emitterTrigger(m,l,false)
};f._setListener=function(l){this._bindings[l]=this._onListenerEvent.bind(this,l);
g.addEventListener(this.el,l,this._bindings[l])};f._removeListener=function(l){g.removeEventListener(this.el,l,this._bindings[l]);
this._bindings[l]=null};f._triggerInternalEvent=function(l,m){this.emitterTrigger(i+":"+l,m)
};f._normalizeArgumentsAndCall=function(l,n){var r={};if(l.length===0){n.call(this,r);
return}if(typeof l[0]==="string"||l[0]===null){l=this._cleanStringData(l);r.events=l[0];
if(typeof l[1]==="string"){r.delegateQuery=l[1];r.callback=l[2];r.context=l[3]}else{r.callback=l[1];
r.context=l[2]}n.call(this,r);return}var m,p,q=":",o=l[0];for(m in o){if(o.hasOwnProperty(m)){r={};
p=this._cleanStringData(m.split(q));r.events=p[0];r.delegateQuery=p[1];r.callback=o[m];
r.context=l[1];n.call(this,r)}}};f._registerDelegateFunc=function(n,p,q,l,o){var m=this._delegateFunc.bind(this,n,p,q,o);
this._delegateFuncs[p]=this._delegateFuncs[p]||{};this._delegateFuncs[p][n]=this._delegateFuncs[p][n]||[];
this._delegateFuncs[p][n].push({func:l,context:o,delegateFunc:m});return m};f._cleanStringData=function(o){var n=false;
if(typeof o==="string"){o=[o];n=true}var m=[],q,s,r,p,l=o.length;for(q=0;q<l;q++){s=o[q];
if(typeof s==="string"){if(s===""||s===" "){continue}r=s.length;while(s[0]===" "){s=s.slice(1,r);
r--}while(s[r-1]===" "){s=s.slice(0,r-1);r--}}m.push(s)}if(n){return m[0]}return m
};f._unregisterDelegateFunc=function(n,q,l,p){if(!this._delegateFuncs[q]||!this._delegateFuncs[q][n]){return
}var o=this._getDelegateFuncBindingIdx(n,q,l,p),m;if(o>-1){m=this._delegateFuncs[q][n][o].delegateFunc;
this._delegateFuncs[q][n].splice(o,1);if(this._delegateFuncs[q][n].length===0){this._delegateFuncs[q][n]=null
}}return m};f._unregisterDelegateFuncs=function(l,n){if(!this._delegateFuncs[n]){return
}if(l!==null&&!this._delegateFuncs[n][l]){return}if(l===null){var m;for(m in this._delegateFuncs[n]){if(this._delegateFuncs[n].hasOwnProperty(m)){this._unbindDelegateFunc(m,n)
}}return}this._unbindDelegateFunc(l,n)};f._unbindDelegateFunc=function(l,n){var o,p,m=0;
while(this._delegateFuncs[n][l]&&this._delegateFuncs[n][l][m]){o=this._delegateFuncs[n][l][m];
p=this._delegateFuncs[n][l][m].length;this._off({events:l,delegateQuery:n,callback:o.func,context:o.context});
if(this._delegateFuncs[n][l]&&p===this._delegateFuncs[n][l].length){m++}}o=p=null
};f._unregisterDelegateFuncsByEvent=function(l){var m;for(m in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(m)){this._unregisterDelegateFuncs(l,m)
}}};f._delegateFunc=function(l,p,r,n,q){if(this._targetHasDelegateAncestor(q.target,p)){var m=Array.prototype.slice.call(arguments,0),o=m.slice(4,m.length);
n=n||window;if(typeof q.detail==="object"){o[0]=q.detail}r.apply(n,o)}};f._targetHasDelegateAncestor=function(n,m){var l=n;
while(l&&l!==this.el&&l!==document.documentElement){if(a.matchesSelector(l,m)){return true
}l=l.parentNode}return false};f._on=function(p){var m=p.events,q=p.callback,o=p.delegateQuery,n=p.context,l=p.unboundCallback||q;
m=this._parseEventNames(m);m.forEach(function(v,r,t,u,s){if(!this.has(s)){this._setListener(s)
}if(typeof u==="string"){v=this._registerDelegateFunc(s,u,v,r,t)}this._triggerInternalEvent("willon",{evt:s,callback:v,context:t,delegateQuery:u});
this._eventEmitter.on(s,v,t);this._triggerInternalEvent("didon",{evt:s,callback:v,context:t,delegateQuery:u})
}.bind(this,q,l,n,o));m=q=l=o=n=null};f._off=function(q){var m=q.events,r=q.callback,p=q.delegateQuery,o=q.context,l=q.unboundCallback||r;
if(typeof m==="undefined"){this._eventEmitter.off();var n;for(n in this._bindings){if(this._bindings.hasOwnProperty(n)){this._removeListener(n)
}}for(n in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(n)){this._delegateFuncs[n]=null
}}return}m=this._parseEventNames(m);m.forEach(function(w,s,u,v,t){if(typeof v==="string"&&typeof s==="function"){w=this._unregisterDelegateFunc(t,v,s,u);
if(!w){return}}if(typeof v==="string"&&typeof w==="undefined"){this._unregisterDelegateFuncs(t,v);
return}if(typeof t==="string"&&typeof w==="undefined"){this._unregisterDelegateFuncsByEvent(t);
if(typeof v==="string"){return}}this._triggerInternalEvent("willoff",{evt:t,callback:w,context:u,delegateQuery:v});
this._eventEmitter.off(t,w,u);this._triggerInternalEvent("didoff",{evt:t,callback:w,context:u,delegateQuery:v});
if(!this.has(t)){this._removeListener(t)}}.bind(this,r,l,o,p));m=r=l=p=o=null};
f._once=function(o){var l=o.events,p=o.callback,n=o.delegateQuery,m=o.context;l=this._parseEventNames(l);
l.forEach(function(t,r,s,q){if(typeof s==="string"){return this._handleDelegateOnce(q,t,r,s)
}if(!this.has(q)){this._setListener(q)}this._triggerInternalEvent("willonce",{evt:q,callback:t,context:r,delegateQuery:s});
this._eventEmitter.once.call(this,q,t,r);this._triggerInternalEvent("didonce",{evt:q,callback:t,context:r,delegateQuery:s})
}.bind(this,p,m,n));l=p=n=m=null};f._handleDelegateOnce=function(l,o,m,n){this._triggerInternalEvent("willonce",{evt:l,callback:o,context:m,delegateQuery:n});
this._on({events:l,context:m,delegateQuery:n,callback:this._getDelegateOnceCallback.bind(this,l,o,m,n),unboundCallback:o});
this._triggerInternalEvent("didonce",{evt:l,callback:o,context:m,delegateQuery:n});
return this};f._getDelegateOnceCallback=function(l,q,n,p){var m=Array.prototype.slice.call(arguments,0),o=m.slice(4,m.length);
q.apply(n,o);this._off({events:l,delegateQuery:p,callback:q,context:n})};f._getDelegateFuncBindingIdx=function(s,p,n,l,t){var r=-1;
if(this._delegateFuncs[p]&&this._delegateFuncs[p][s]){var o,m,q=this._delegateFuncs[p][s].length;
for(o=0;o<q;o++){m=this._delegateFuncs[p][s][o];if(t&&typeof n==="undefined"){n=m.func
}if(m.func===n&&m.context===l){r=o;break}}}return r};f._triggerDOMEvents=function(n,q,p){var m=[this.el];
if(p){m=a.querySelectorAll(p,this.el)}var o,r,l=m.length;for(o=0;o<l;o++){g.dispatchEvent(m[o],n,{bubbles:true,cancelable:true,detail:q})
}};b.exports=h},{"./DOMEmitterEvent":414,"ac-dom-events":355,"ac-dom-traversal":393,"ac-event-emitter":false}],414:[function(b,c,a){var f=b("ac-dom-events");
var d;var g=function(i,h){this._domEmitter=h;this._originalTarget=f.target(i);this.originalEvent=i||{};
this.target=this._originalTarget||this._domEmitter.el;this.currentTarget=this._domEmitter.el;
this.timeStamp=this.originalEvent.timeStamp||Date.now();if(this._isDOMEvent(this.originalEvent)){if(typeof this.originalEvent.detail==="object"){this.data=this.originalEvent.detail
}}else{if(i){this.data=this.originalEvent;this.originalEvent={}}}};d=g.prototype;
d.preventDefault=function(){f.preventDefault(this.originalEvent)};d.stopPropagation=function(){f.stopPropagation(this.originalEvent)
};d.stopImmediatePropagation=function(){if(this.originalEvent.stopImmediatePropagation){this.originalEvent.stopImmediatePropagation()
}this._domEmitter.stopImmediatePropagation()};d._isDOMEvent=function(h){if(this._originalTarget||(document.createEvent!=="undefined"&&typeof CustomEvent!=="undefined"&&h instanceof CustomEvent)){return true
}return false};c.exports=g},{"ac-dom-events":355}],415:[function(b,c,a){arguments[4][76][0].apply(a,arguments)
},{"./ac-prefixer/Prefixer":416}],416:[function(b,c,a){c.exports=b(77)},{"./Prefixer/camelCasedEvents":417}],417:[function(b,c,a){c.exports=b(78)
},{}],418:[function(b,c,a){c.exports={canvasAvailable:b("./ac-feature/canvasAvailable"),continuousScrollEventsAvailable:b("./ac-feature/continuousScrollEventsAvailable"),cookiesAvailable:b("./ac-feature/cookiesAvailable"),cssLinearGradientAvailable:b("./ac-feature/cssLinearGradientAvailable"),cssPropertyAvailable:b("./ac-feature/cssPropertyAvailable"),isDesktop:b("./ac-feature/isDesktop"),isHandheld:b("./ac-feature/isHandheld"),isRetina:b("./ac-feature/isRetina"),isTablet:b("./ac-feature/isTablet"),localStorageAvailable:b("./ac-feature/localStorageAvailable"),sessionStorageAvailable:b("./ac-feature/sessionStorageAvailable"),svgAvailable:b("./ac-feature/svgAvailable"),threeDTransformsAvailable:b("./ac-feature/threeDTransformsAvailable"),touchAvailable:b("./ac-feature/touchAvailable")}
},{"./ac-feature/canvasAvailable":419,"./ac-feature/continuousScrollEventsAvailable":420,"./ac-feature/cookiesAvailable":421,"./ac-feature/cssLinearGradientAvailable":422,"./ac-feature/cssPropertyAvailable":423,"./ac-feature/isDesktop":424,"./ac-feature/isHandheld":425,"./ac-feature/isRetina":426,"./ac-feature/isTablet":427,"./ac-feature/localStorageAvailable":428,"./ac-feature/sessionStorageAvailable":429,"./ac-feature/svgAvailable":430,"./ac-feature/threeDTransformsAvailable":431,"./ac-feature/touchAvailable":432}],419:[function(b,c,a){var f=null;
c.exports=function d(){var g;if(f===null){g=document.createElement("canvas");f=!!(typeof g.getContext==="function"&&g.getContext("2d"))
}return f}},{}],420:[function(c,d,b){var h=c("ac-browser");var a=c("./touchAvailable");
var f=null;d.exports=function g(){if(f===null){f=(!a()||(h.os==="iOS"&&h.version>=8)||h.name==="Chrome")
}return f}},{"./touchAvailable":432,"ac-browser":342}],421:[function(d,f,c){var a=Object.prototype.hasOwnProperty;
var g=null;f.exports=function b(){if(g===null){g=false;try{if("cookie" in document&&!!navigator.cookieEnabled){document.cookie="ac_feature_cookie=1";
g=(document.cookie.indexOf("ac_feature_cookie")!==-1);document.cookie="ac_feature_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}}catch(h){}}return g}},{}],422:[function(d,f,c){var a=d("./cssPropertyAvailable");
var g=null;f.exports=function b(){var h;if(g===null){h=["linear-gradient(to bottom right, #9f9, white)","linear-gradient(top left, #9f9, white)","gradient(linear, left top, right bottom, from(#9f9), to(white))"];
g=h.some(function(i){return a("background-image",i)})}return g}},{"./cssPropertyAvailable":423}],423:[function(c,d,b){var f=c("ac-prefixer");
d.exports=function a(h,g){if(g){return !!f.getStyleValue(h,g)}else{return !!f.getStyleProperty(h)
}}},{"ac-prefixer":415}],424:[function(f,g,c){var b=f("./touchAvailable");var a=null;
g.exports=function d(){if(a===null){a=(!b()&&!window.orientation)}return a}},{"./touchAvailable":432}],425:[function(g,h,d){var f=g("./isDesktop");
var b=g("./isTablet");var a=null;h.exports=function c(){if(a===null){a=(!f()&&!b())
}return a}},{"./isDesktop":424,"./isTablet":427}],426:[function(b,c,a){c.exports=function d(){var f=["min-device-pixel-ratio:1.5","-webkit-min-device-pixel-ratio:1.5","min-resolution:1.5dppx","min-resolution:144dpi","min--moz-device-pixel-ratio:1.5"];
var g;if(window.devicePixelRatio!==undefined){if(window.devicePixelRatio>=1.5){return true
}}else{for(g=0;g<f.length;g+=1){if(window.matchMedia("("+f[g]+")").matches===true){return true
}}}return false}},{}],427:[function(f,g,c){var d=f("./isDesktop");var b=null;var h=function(){if(typeof window.orientation==="undefined"){return window.screen.width
}return window.screen.width<window.screen.height?window.screen.width:window.screen.height
};g.exports=function a(){if(b===null){b=(!d()&&h()>=600)}return b}},{"./isDesktop":424}],428:[function(c,d,a){var f=null;
d.exports=function b(){if(f===null){f=false;try{f=!!(window.localStorage&&window.localStorage.non_existent!==null)
}catch(g){}}return f}},{}],429:[function(c,d,b){var f=null;d.exports=function a(){if(f===null){try{if(typeof window.sessionStorage!=="undefined"&&typeof window.sessionStorage.setItem==="function"){window.sessionStorage.setItem("ac_browser_detect","test");
f=true;window.sessionStorage.removeItem("ac_browser_detect","test")}else{f=false
}}catch(g){f=false}}return f}},{}],430:[function(c,d,b){var f=null;d.exports=function a(){if(f===null){f=document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
}return f}},{}],431:[function(c,d,b){var a=c("./cssPropertyAvailable");var g=null;
d.exports=function f(){if(g===null){g=(a("perspective","1px")&&a("transform","translateZ(0)"))
}return g}},{"./cssPropertyAvailable":423}],432:[function(c,d,b){var f=null;d.exports=function a(){if(f===null){f=!!(("ontouchstart" in window)||window.DocumentTouch&&document instanceof window.DocumentTouch)
}return f}},{}],433:[function(b,c,a){c.exports=b(26)},{}],434:[function(b,c,a){arguments[4][27][0].apply(a,arguments)
},{"./ac-object/clone":435,"./ac-object/create":436,"./ac-object/defaults":437,"./ac-object/extend":438,"./ac-object/getPrototypeOf":439,"./ac-object/isDate":440,"./ac-object/isEmpty":441,"./ac-object/isRegExp":442,"./ac-object/toQueryParameters":443}],435:[function(b,c,a){c.exports=b(28)
},{"./extend":438}],436:[function(b,c,a){c.exports=b(29)},{}],437:[function(b,c,a){c.exports=b(30)
},{"./extend":438}],438:[function(b,c,a){c.exports=b(31)},{}],439:[function(b,c,a){c.exports=b(32)
},{}],440:[function(b,c,a){c.exports=b(33)},{}],441:[function(b,c,a){c.exports=b(34)
},{}],442:[function(b,c,a){c.exports=b(35)},{}],443:[function(b,c,a){c.exports=b(36)
},{qs:433}],444:[function(b,c,a){var d=b("./ac-modal-video/ModalVideo");d.create=b("./ac-modal-video/factory/create");
c.exports={ModalVideo:d}},{"./ac-modal-video/ModalVideo":445,"./ac-modal-video/factory/create":448}],445:[function(f,c,i){var d=f("ac-modal");
var a=f("ac-object");var n=f("ac-classlist");var o=f("ac-event-emitter").EventEmitter;
var b=f("./featureDetect/featureDetect");var h=f("./delegate/Default");var m=f("./delegate/Mobile");
var k=h;var l;var g={deepLink:false,playOnOpen:false,closeOnEnded:false,autoAppend:true};
var j=function(q,p){this.options=a.defaults(g,p||{});this.modal=this.options.modal||new d.Modal();
this._delegate=this._createDelegate();this.setPlayer(q);if(this.options.autoAppend){this.appendPlayer(q)
}n.add(this.modal.modalEl,"ac-modal-video");this.modal.propagateTo(this);this.modal.on("willclose",this._willClose,this)
};l=j.prototype=a.create(o.prototype);l._createDelegate=function(){var q;var p=h;
if(b.shouldPlayInModal()===false){p=m}return new p(this.player,this.modal,this.options)
};l.appendPlayer=function(p){var q=document.createElement("div");p.appendTo(q);
this.modal.appendContent(q)};l.getPlayer=function(){return this._delegate.getPlayer()
};l.setPlayer=function(p){return this._delegate.setPlayer(p)};l.open=function(){this._delegate.open()
};l.close=function(){this._delegate.close()};l._willClose=function(){this._delegate.willClose()
};l._pause=function(){this._delegate.pause()};c.exports=j},{"./delegate/Default":446,"./delegate/Mobile":447,"./featureDetect/featureDetect":450,"ac-classlist":346,"ac-event-emitter":false,"ac-modal":466,"ac-object":434}],446:[function(c,d,a){function b(h,i,g){this.player=h;
this.modal=i;this.options=g}var f=b.prototype;f.pause=function(){if(this.player&&this.player.getReadyState()>0){this.player.pause()
}};f.play=function(){if(this.player&&this.player.getReadyState()>0){this.player.play()
}else{this.player.once("loadedmetadata",this.player.play,this.player)}};f._bindPlayerEvents=function(){this.player.on("ended",this._onEnded,this)
};f._unbindPlayerEvents=function(){this.player.off("ended",this._onEnded,this);
this.player.off("loadedmetadata",this.player.play,this.player);this.player.off("timeupdate",this.pause,this);
this.player.off("play",this.pause,this)};f.open=function(){if(this.player&&this.player.has("timeupdate",this._onTimeUpdateOnce)){this.player.off("timeupdate",this._onTimeUpdateOnce)
}this.modal.open();if(this.player&&this.player.getPaused()){this.player.off("play",this.pause);
if(this.options.playOnOpen){this.play()}}};f.getPlayer=function(){return this.player
};f.setPlayer=function(g){if(this.player){this._unbindPlayerEvents()}this.player=g;
this._bindPlayerEvents()};f.close=function(){this.modal.close()};f.willClose=function(){if(this.player&&this.player.isFullscreen()){this.player.exitFullscreen()
}if(this.player&&this.player.getReadyState()>0){if(this.player.getEnded()===false){this.pause()
}}else{if(this.player){this.player.on("play",this.pause,this)}}if(this.player&&this.player.getEnded()===false){this.player.on("timeupdate",this._onTimeUpdateOnce,this)
}};f._onEnded=function(){if(this.options.closeOnEnded){this.close()}};f._onTimeUpdateOnce=function(){this.pause();
this.player.off("timeupdate",this._onTimeUpdateOnce)};d.exports=b},{}],447:[function(c,f,a){var b=c("ac-object");
var h=c("./Default");function d(){h.apply(this,arguments)}var g=d.prototype=b.create(h.prototype);
g.open=function(){this.player.play()};f.exports=d},{"./Default":446,"ac-object":434}],448:[function(d,f,b){var h=d("./../ModalVideo");
var g=d("ac-dom-emitter").DOMEmitter;var a=d("./router");f.exports=function c(l,k){k=k||{};
var j=new h(l,k);var i;if(k.deepLink){i=a.createOrGet();i.createRoute(k.deepLink,j.open,j);
i.start()}if(k.triggerSelector){var m=new g(document);m.on("click",k.triggerSelector,function(n){n.preventDefault();
j.open()},j)}return j}},{"./../ModalVideo":445,"./router":449,"ac-dom-emitter":412}],449:[function(d,f,c){var b=d("ac-router");
var a=null;f.exports={create:function(){a=new b.Router({hashChange:true,pushState:false})
},get:function(){return a},destroy:function(){a=null},createOrGet:function(){if(a===null){this.create()
}return this.get()}}},{"ac-router":471}],450:[function(c,d,b){var f=c("ac-browser");
var a=c("ac-feature");d.exports={shouldPlayInModal:function(){return !(a.isHandheld()&&f.os.toLowerCase()==="ios")
}}},{"ac-browser":342,"ac-feature":418}],451:[function(b,c,a){arguments[4][346][0].apply(a,arguments)
},{"./ac-classlist/add":452,"./ac-classlist/contains":453,"./ac-classlist/remove":455,"./ac-classlist/toggle":456}],452:[function(b,c,a){c.exports=b(347)
},{"./helpers/className":454}],453:[function(b,c,a){c.exports=b(348)},{"./helpers/className":454}],454:[function(b,c,a){c.exports=b(349)
},{}],455:[function(b,c,a){c.exports=b(350)},{"./helpers/className":454}],456:[function(b,c,a){c.exports=b(351)
},{"./helpers/className":454}],457:[function(b,c,a){arguments[4][76][0].apply(a,arguments)
},{"./ac-prefixer/Prefixer":458}],458:[function(b,c,a){c.exports=b(77)},{"./Prefixer/camelCasedEvents":459}],459:[function(b,c,a){c.exports=b(78)
},{}],460:[function(b,c,a){arguments[4][332][0].apply(a,arguments)},{"./ac-dom-events/addEventListener":461,"./ac-dom-events/dispatchEvent":462,"./ac-dom-events/removeEventListener":463,"./ac-dom-events/stop":464,"./ac-dom-events/target":465}],461:[function(b,c,a){arguments[4][80][0].apply(a,arguments)
},{"ac-prefixer":457}],462:[function(b,c,a){c.exports=b(81)},{}],463:[function(b,c,a){arguments[4][83][0].apply(a,arguments)
},{"ac-prefixer":457}],464:[function(b,c,a){c.exports=b(336)},{}],465:[function(b,c,a){c.exports=b(337)
},{}],466:[function(b,c,a){c.exports={Modal:b("./ac-modal/Modal")}},{"./ac-modal/Modal":467}],467:[function(d,c,g){var b=d("ac-classlist");
var l=d("ac-dom-styles");var n=d("ac-dom-events");var m=d("ac-dom-nodes");var k=d("ac-dom-traversal");
var f=d("ac-object");var i=d("ac-keyboard");var o=i.keys;var p=d("ac-event-emitter").EventEmitter;
var a=document.documentElement;var h;function j(q){this.opened=false;this.closeButton=null;
this.modalEl=null;this.contentEl=null;this._keysToClose=[o.ESCAPE];this._keysToOpen=[];
this._boundClose=this.close.bind(this);this._generateElements();if(q){this.appendContent(q)
}}var h=j.prototype=f.create(p.prototype);h._getScrollX=function(){var r=window.pageXOffset;
if(!r){var q=document.documentElement||document.body.parentNode||document.body;
r=q.scrollLeft}return r};h._getScrollY=function(){var r=window.pageYOffset;if(!r){var q=document.documentElement||document.body.parentNode||document.body;
r=q.scrollTop}return r};h.open=function(){this._scrollX=this._getScrollX();this._scrollY=this._getScrollY();
if(!this.opened){this._attachEvents();this.trigger("willopen");b.add(a,"modal-open");
this.opened=true;this.trigger("open")}};h.close=function(){this.trigger("willclose");
this._removeEvents();b.remove(a,"modal-open");this._returnToScrollPosition();this.opened=false;
this.trigger("close")};h.appendContent=function(q){if(q&&m.isElement(q)){this.contentEl.appendChild(q)
}else{throw new TypeError(q+" is not an Element")}};h.removeContent=function(q){if(this.contentEl.contains(q)){m.remove(q)
}};h.emptyContent=function(){var q=k.children(this.contentEl);q.forEach(m.remove)
};h.destroy=function(){};h.addKeyToClose=function(q){this._keysToClose.push(q);
i.addKeyUp(q,this.close,this)};h.removeKeyToClose=function(r){var q=this._keysToClose.indexOf(r);
if(q!==-1){this._keysToClose.splice(q,1)}i.removeKeyUp(r,this.close,this)};h._removeEvents=function(){n.removeEventListener(this.closeButton,"click",this._boundClose);
this._keysToClose.forEach(this.removeKeyToClose,this)};h._attachEvents=function(){n.addEventListener(this.closeButton,"click",this._boundClose);
this._keysToClose.forEach(this.addKeyToClose,this)};h._generateCloseButton=function(){var q=document.createElement("button");
b.add(q,"modal-close","icon","icon-closealt");return q};h._generateModalEl=function(){var q=document.createElement("div");
b.add(q,"modal");return q};h._createContentElement=function(){var q=document.createElement("div");
b.add(q,"modal-content");return q};h._generateElements=function(){this.closeButton=this._closeButton||this._generateCloseButton();
this.contentEl=this._createContentElement();this.modalEl=this._modalEl||this._generateModalEl();
this.modalEl.appendChild(this.closeButton);this.modalEl.appendChild(this.contentEl);
document.body.appendChild(this.modalEl);b.add(a,"has-modal")};h._returnToScrollPosition=function(){window.scrollTo(this._scrollX||0,this._scrollY||0)
};c.exports=j},{"ac-classlist":451,"ac-dom-events":460,"ac-dom-nodes":148,"ac-dom-styles":172,"ac-dom-traversal":183,"ac-event-emitter":false,"ac-keyboard":338,"ac-object":1033}],468:[function(b,c,a){c.exports={Routes:b("./ac-routes/Routes"),Route:b("./ac-routes/Route")}
},{"./ac-routes/Route":469,"./ac-routes/Routes":470}],469:[function(b,c,a){function f(i,k,h,j,g){this.path=i;
this.callback=k;this.context=h;this.greedy=j||false;this.priority=g||0;if(typeof this.priority!=="number"){throw new Error("Priority must be a Number.")
}this.identifierPattern="([a-zA-Z0-9\\-\\_]+)";this.tokensRe=new RegExp(":"+this.identifierPattern,"g");
this.matcher=this._createRouteMatcher(i)}var d=f.prototype;d._createRouteMatcher=function(h){if(h&&h.exec){return{pattern:h}
}else{if(h==="/"){return{pattern:/^\/$/}}else{if(typeof h!=="string"){throw new Error("path must be either a string or regex")
}}}var g=this._extractRouteTokens(h);var j=h.replace(this.tokensRe,this.identifierPattern);
var i=new RegExp(j,"g");return{pattern:i,routeTokens:g}};d._extractRouteTokens=function(j){var g=j.replace(this.tokensRe,":"+this.identifierPattern);
var i=new RegExp(g,"g");var h=i.exec(j);if(h&&h.length>1){h=h.slice(1)}else{h=null
}return h};d.match=function(h){this.matcher.pattern.lastIndex=0;var g=this.matcher.pattern.exec(h);
if(g){var i=(g.length)?g.slice(1):[];var j=this.callback;if(j&&typeof j==="function"){j.apply(this.context||this,i);
return true}}return false};c.exports=f},{}],470:[function(c,d,b){var g=c("./Route");
function a(h){this._routes={};if(h){this.addRoutes(h)}}var f=a.prototype;f._getIndex=function(k,l,j){if(this._routes[k]!==undefined){var h=this._routes[k].length;
while(--h>-1){if(this._routes[k][h].callback===l&&this._routes[k][h].context===j){return h
}}}return -1};f.match=function(k){var j,h;for(j in this._routes){h=this._routes[j].length;
while(--h>-1){if(this._routes[j][h].match(k)&&this._routes[j][h].greedy){break}}}};
f.add=function(j){if(this._routes[j.path]===undefined){this._routes[j.path]=[j]
}else{if(!this.get(j.path,j.callback,j.context)){var k,h=this._routes[j.path].length;
if(h>0){for(k=0;k<h;++k){if(this._routes[j.path][k].priority>j.priority){this._routes[j.path].splice(k,0,j);
return j}}}this._routes[j.path].push(j)}}return j};f.remove=function(h){var j=this._getIndex(h.path,h.callback,h.context);
if(j>-1){this._routes[h.path].splice(j,1);return h}return false};f.get=function(k,l,j){var h=this._getIndex(k,l,j);
if(h>-1){return this._routes[k][h]}return false};f.createRoute=function(k,m,j,l,i){var h=new g(k,m,j,l,i);
this.add(h);return h};f.addRoutes=function(j){if(j instanceof Array){var l,k,h=j.length;
for(l=0;l<h;++l){k=j[l];if(k&&typeof k==="object"){this.add(k)}}}else{throw new Error("routes must be an Array.")
}};f.removeRoutes=function(j){if(j instanceof Array){var l,k,h=j.length;for(l=0;
l<h;++l){k=j[l];if(k&&typeof k==="object"){this.remove(k)}}}else{throw new Error("routes must be an Array.")
}};f.getRoutes=function(h){if(this._routes[h]===undefined){return[]}return this._routes[h]
};d.exports=a},{"./Route":469}],471:[function(b,c,a){c.exports={Router:b("./ac-router/Router"),History:b("./ac-router/History"),Routes:b("ac-routes").Routes,Route:b("ac-routes").Route}
},{"./ac-router/History":472,"./ac-router/Router":473,"ac-routes":468}],472:[function(c,f,b){var d=c("ac-object").create;
var a=c("ac-dom-events");var i=c("ac-event-emitter").EventEmitter;function h(k){k=k||{};
this.history=window.history;this.rootStripper=/^\/+|\/+$/g;this.root=k.root||"/";
this.root=("/"+this.root+"/").replace(this.rootStripper,"/");var j=typeof k.resolveInitialHash!=="boolean"?true:k.resolveInitialHash;
this._pushState=typeof k.pushState!=="boolean"?true:k.pushState;this._hashChange=k.hashChange||false;
this._setUpdateVars(j);if(k.autoStart){this.start()}}var g=h.prototype=d(i.prototype);
g._isRoot=function(j){return("/"+j+"/").replace(this.rootStripper,"/")===this.root
};g._isPushStateSupported=function(){return(this.history&&this.history.pushState)
};g._isHashChangeSupported=function(){return("onhashchange" in window)};g._setUpdateVars=function(k){if(this._pushState&&this._isPushStateSupported()){if(k&&this._hashChange&&window.location.href.indexOf("#")!==-1){this.history.pushState({},document.title,window.location.href.replace("#",""))
}this._hashChange=false}else{if(k&&this._pushState&&this._hashChange&&window.location.href.indexOf("#")<0){if(!window.location.origin){window.location.origin=window.location.protocol+"//"+window.location.hostname;
window.location.origin+=(window.location.port?":"+window.location.port:"")}var j=window.location.href.substr(window.location.origin.length+this.root.length);
if(j.length){window.location=window.location.origin+this.root+"#"+j;return}}if(this._hashChange&&!this._isHashChangeSupported()){this._interval=50;
this._iframe=document.createElement('<iframe src="javascript:0" tabindex="-1" style="display:none;">');
this._iframe=document.body.appendChild(this._iframe).contentWindow;this._iframe.document.open().close()
}this._pushState=false}};g._checkUrl=function(){var j=this._iframe.location.hash.substr(1);
if(j.length===0){j="/"}if(this.fragment()!==j){window.location.hash="#"+j;this._ignoreHashChange=false;
this._handleHashChange()}};g._handlePopState=function(j){this.trigger("popstate",{fragment:this.fragment()})
};g._handleHashChange=function(j){if(this._ignoreHashChange){this._ignoreHashChange=false;
return}this.trigger("popstate",{fragment:this.fragment()})};g.canUpdate=function(){return this._pushState||this._hashChange
};g.start=function(){if(!this.started&&(this._pushState||this._hashChange)){this.started=true;
if(this._pushState){this._handlePopState=this._handlePopState.bind(this);a.addEventListener(window,"popstate",this._handlePopState)
}else{if(this._hashChange){if(this._isHashChangeSupported()){this._handleHashChange=this._handleHashChange.bind(this);
a.addEventListener(window,"hashchange",this._handleHashChange)}else{this._iframe.location.hash=this.fragment();
this._checkUrl=this._checkUrl.bind(this);this._checkUrlInterval=setInterval(this._checkUrl,this._interval)
}}}}return this.started||false};g.stop=function(){if(this.started){this.started=false;
if(this._pushState){a.removeEventListener(window,"popstate",this._handlePopState)
}else{if(this._hashChange){if(this._isHashChangeSupported()){a.removeEventListener(window,"hashchange",this._handleHashChange)
}else{if(this._checkUrlInterval){clearInterval(this._checkUrlInterval);this._checkUrlInterval=null
}}}}}};g.navigate=function(l,k){if(!this.started||!this.canUpdate()){return false
}k=k||{};var j=((this._isRoot(l)?"":this.root)+l).replace(/([^:])(\/\/)/g,"$1/");
if(this._pushState){this.history.pushState(k,document.title,j)}else{if(this._hashChange){this._ignoreHashChange=true;
window.location.hash="#"+l;if(!this._isHashChangeSupported()){this._iframe.document.open().close();
this._iframe.location.hash="#"+l}}}return true};g.fragment=function(){var j="";
if(this._pushState){j=(window.location.pathname).substr(this.root.length)}else{if(this._hashChange){j=window.location.hash.substr(1)
}}return j===""?"/":j};f.exports=h},{"ac-dom-events":111,"ac-event-emitter":false,"ac-object":1033}],473:[function(d,c,g){var i=d("ac-object").create;
var k=d("ac-dom-emitter").DOMEmitter;var f=d("./History");var j=d("ac-routes").Route;
var a=d("ac-routes").Routes;function b(l){l=l||{};this._intercept=l.intercept||"[data-route]";
this._interceptAttribute=l.attribute||"href";this._handleTrigger=this._handleTrigger.bind(this);
this.intercept(this._intercept);this.history=l.history||new f({root:l.root,autoStart:l.autoStart,pushState:l.pushState,hashChange:l.hashChange,resolveInitialHash:l.resolveInitialHash});
a.call(this,l.routes);if(l.autoStart){if(!this.history.started){this.history.start()
}this.start()}}var h=b.prototype=i(a.prototype);h._handleTrigger=function(m){if(!this.started){return
}var l=m.target.getAttribute(this._interceptAttribute);if(l){if(/^(http|https):\/\/+/.exec(l)&&this._interceptAttribute==="href"){l=l.substr(l.indexOf(this.history.root)+this.history.root.length)||"/"
}if(this.navigate(l)){m.preventDefault()}}};h._handlePopstate=function(l){this.navigate(l.fragment,true)
};h.start=function(){if(!this.started){this.started=true;this.history.start();this._handlePopstate=this._handlePopstate.bind(this);
this.history.on("popstate",this._handlePopstate);this.navigate(this.history.fragment(),true)
}};h.stop=function(){if(this.started){this.started=false;this.history.stop();this.history.off("popstate",this._handlePopstate)
}};h.navigate=function(m,l){if(this.history.fragment()===m&&!l){return this.history.canUpdate()
}if(m&&!l){if(!this.history.navigate(m)){return false}}this.match(m);return true
};h.intercept=function(m,n){var l=new k(n||document.body);l.on("click",m,this._handleTrigger)
};c.exports=b},{"./History":472,"ac-dom-emitter":106,"ac-object":1033,"ac-routes":468}],474:[function(b,c,a){c.exports=b(26)
},{}],475:[function(b,c,a){c.exports={isString:b("./ac-string/isString"),toCamelCase:b("./ac-string/toCamelCase"),queryStringToObject:b("./ac-string/queryStringToObject"),toQueryPair:b("./ac-string/toQueryPair"),queryParameters:b("./ac-string/queryParameters"),supplant:b("./ac-string/supplant")}
},{"./ac-string/isString":476,"./ac-string/queryParameters":477,"./ac-string/queryStringToObject":478,"./ac-string/supplant":479,"./ac-string/toCamelCase":480,"./ac-string/toQueryPair":481}],476:[function(c,d,b){d.exports=function a(f){return(typeof f==="string")
}},{}],477:[function(d,f,c){var a=d("./queryStringToObject");f.exports=function b(){var g={};
var h=window.location.toString().split("?")[1];if(typeof h==="string"){g=a(h)}return g
}},{"./queryStringToObject":478}],478:[function(d,f,c){var a=d("qs");f.exports=function b(g){if(typeof g!=="string"){throw new TypeError("QueryStringToObject error: argument must be a string")
}return a.parse(g)}},{qs:474}],479:[function(b,c,a){c.exports=function d(h,g,f){if(!g){return h
}f=f||/{([^{}]*)}/g;return h.replace(f,function(j,i){var k=g[i];return typeof k==="string"||typeof k==="number"?k:j
})}},{}],480:[function(b,c,a){c.exports=function d(f){if(typeof f!=="string"){throw new TypeError("Argument must be of type String.")
}return f.replace(/-+(.)?/g,function(g,h){return h?h.toUpperCase():""})}},{}],481:[function(b,c,a){c.exports=function d(f,g){if(typeof f!=="string"||typeof g!=="string"){throw new TypeError("toQueryPair error: argument must be a string")
}return encodeURIComponent(f)+"="+encodeURIComponent(g)}},{}],482:[function(c,d,b){var a=c("./ac-vatman/vat-client");
var f=c("./ac-vatman/vat-resource");var g={createPlayer:c("./ac-vatman/factory/createPlayer"),vatClient:a,vatResource:f};
d.exports=g},{"./ac-vatman/factory/createPlayer":483,"./ac-vatman/vat-client":490,"./ac-vatman/vat-resource":491}],483:[function(c,a,g){var m=c("./../featureDetection/canPlayType");
var d=c("./../featureDetection/canPlayTypeNatively");var l=c("./../featureDetection/canPlayTypeQuicktime");
var k=c("./../featureDetection/featureDetect").shouldPlayQuicktime;var i=c("./../featureDetection/featureDetect").textTrackDisablingNotAvailable;
function h(o,n){n.type="quicktime";return o.create(n)}function j(o,n){return o.create(n)
}function f(n){var p=this.findTextTrackModelFromNativeTrack(n);var o=this.getEnabledTextTracks();
o.forEach(function(q){if(p.cid!==q.cid){q.disable()}});if(p.get("mode")==="disabled"){p.hide()
}}function b(q,p){p=p||{};var o="video/quicktime";var n="video/mp4";var r;if(d(o)||d(n)&&(!k())){r=j(q,p)
}else{if(l(o)){p.type="quicktime";r=h(q,p)}}if(r&&!i()){r.on("addtrack",f,r)}return r
}a.exports=b},{"./../featureDetection/canPlayType":484,"./../featureDetection/canPlayTypeNatively":485,"./../featureDetection/canPlayTypeQuicktime":486,"./../featureDetection/featureDetect":487}],484:[function(b,d,a){var f=b("./canPlayTypeNatively");
var c=b("./canPlayTypeQuicktime");function g(i){var h=f(i);if(!h){h=c(i)}return h
}d.exports=g},{"./canPlayTypeNatively":485,"./canPlayTypeQuicktime":486}],485:[function(c,d,b){var f;
function a(){return document.createElement("video")}d.exports=function g(i){var j="";
var h=a();if(typeof h.canPlayType==="function"){j=h.canPlayType(i)}return j}},{}],486:[function(c,f,b){var a=c("./quicktime");
f.exports=function d(g){var h="";if(g==="video/quicktime"&&a.getPluginVersion()!==undefined){h="maybe"
}return h}},{"./quicktime":488}],487:[function(b,c,a){var f=b("ac-browser");var d=f.name.toLowerCase();
c.exports={shouldPlayMOV:function(){return(d==="safari"||d==="safari mobile")},shouldPlayQuicktime:function(){return(d==="ie"&&f.version<9)
},textTrackDisablingNotAvailable:function(){return(d==="safari mobile"&&f.version===7)
}}},{"ac-browser":54}],488:[function(b,c,a){c.exports={getPlugins:function(){return navigator.plugins
},getPluginVersion:function(){var j;var k=/(\d+\.){2}(\d+){1}$/;var d=this.getPlugins();
if(d&&d[0]){for(var h=0;h<d.length;h++){var f=(/QuickTime/i.test(d[h].name)&&typeof j==="undefined");
if(f){if(d[h].version){j=d[h].version}else{if(k.test(d[h].name)){j=d[h].name.match(k);
j=j[0]||undefined}}}}}else{var g=["QuickTime.QuickTime","QuickTimeCheckObject.QuickTimeCheck.1"];
g.forEach(function(l){var m;var i;try{m=new ActiveXObject(l);i=(typeof m==="object"&&typeof m.QuickTimeVersion!=="undefined"&&typeof j==="undefined");
if(i){j=m.QuickTimeVersion}}catch(n){}})}return j}}},{}],489:[function(b,c,a){c.exports={bg:"български език",cs:"Czech",el:"Greek",de:"German",da:"Danish",en:"English",es:"Spanish",et:"Estonian",fi:"Finnish",fr:"Français",hr:"Croatian",hu:"Hungarian",it:"Italian",ja:"Japanese",ko:"Korean",lt:"Lithuanian",lv:"Latvian",nl:"Dutch",no:"Norsk",pl:"Polish",pt:"Portuguese",ro:"Romanian",ru:"Russian",sk:"Slovak",sv:"Swedish",tr:"Turkish",zh:"Chinese"}
},{}],490:[function(d,b,g){var j=d("ac-ajax");var h=d("ac-string");var k=/(-[a-z]{2}-([a-z]{2}-){0,})[0-9]{8}_r[0-9].+\.mov$/;
var a=/_r[0-9].+\.mov$/;var i=/((-([a-z]{2}))*)-[0-9]+/;var n=/((-([a-z]{2}))*)-/;
var c="m";var f="_{width}x{height}{suffix}."+c+"p4";var l=[{width:416,height:234,type:"baseline-high",suffix:"h"},{width:416,height:234,type:"small",suffix:"h"},{width:416,height:234,type:"baseline-low",suffix:"l"},{width:416,height:234,type:"baseline-medium",suffix:"m"},{width:640,height:360,type:"medium",suffix:"h"},{width:848,height:480,type:"large",suffix:""},{width:960,height:540,type:"large",suffix:""},{width:1280,height:720,type:"large",suffix:"h"},{width:1280,height:720,type:"large",suffix:"l"}];
var o={create:function(){var m=function(){};m.prototype=this;return new m()},getSource:function(m,q,p){var s=l;
if(!m){throw"Must provide a vatRefMovie"}if(!q){throw"Must provide a width"}if(p){s=s.filter(function(t){return t.type===p
})}var r=s.reduce(function(t,u){return Math.abs(u.width-q)<Math.abs(t.width-q)?u:t
});return m.replace(a,h.supplant(f,r))},getConfigPath:function(m){return m.replace(k,"-current.json")
},getConfig:function(m){return j.getJSON({url:this.getConfigPath(m)})},getVTTSource:function(m){return m.replace(a,"_cc.vtt")
}};b.exports=o},{"ac-ajax":13,"ac-string":475}],491:[function(c,d,b){var a=c("./vat-client");
var h=c("./localization/language");var g=c("./featureDetection/featureDetect").shouldPlayMOV;
var f={create:function(j){if(!j){throw"Must provide a vatRefMovie."}var k=function(){};
k.prototype=this;var i=new k();i.vatRefMovie=j;i.vatVTTSource=[];return i},getSource:function(j,i){return a.getSource(this.vatRefMovie,j,i)
},getConfig:function(){return a.getConfig(this.vatRefMovie)},getVTTSource:function(){return a.getVTTSource(this.vatRefMovie)
},_getCaptionsSrcLang:function(j){var i="";if(typeof j==="string"&&j.indexOf("-")!==-1){i=j.split("-")[0]
}return i},_isNewVTTSrc:function(i){return(this.vatVTTSource.indexOf(i)===-1)},_handleCaptions:function(k){var l;
var i="";var j={};this.getConfig().then(function(m){if(!m.metadata.captions){return
}l=this.getVTTSource();if(l&&(this._isNewVTTSrc(l)===true)){if(m.metadata.lang){i=this._getCaptionsSrcLang(m.metadata.lang)
}j.kind="caption";j.src=l;j.mode="hidden";if(i){j.srclang=i;j.label=h[i]||null}k.addTextTrackFromRemoteVTT(j);
this.vatVTTSource.push(l)}}.bind(this))},setPlayerSrc:function(i,l,j){var k=this.vatRefMovie;
if(!g()){k=this.getSource(l,j)}i.setSrc(k);this._handleCaptions(i)}};d.exports=f
},{"./featureDetection/featureDetect":487,"./localization/language":489,"./vat-client":490}],492:[function(b,c,a){c.exports=b(271)
},{"./ac-shared-instance/SharedInstance":493}],493:[function(b,c,a){c.exports=b(272)
},{}],494:[function(b,c,a){c.exports={CID:b("./ac-mvc-cid/CID")}},{"./ac-mvc-cid/CID":495}],495:[function(c,f,b){var a=c("ac-shared-instance").SharedInstance;
var g="ac-mvc-cid:CID",d="1.0.0";function i(){this._idCount=0}var h=i.prototype;
h._cidPrefix="cid";h.getNewCID=function(){var j=this._cidPrefix+"-"+this._idCount;
this._idCount++;return j};f.exports=a.share(g,d,i)},{"ac-shared-instance":492}],496:[function(b,c,a){c.exports=b(26)
},{}],497:[function(b,c,a){arguments[4][27][0].apply(a,arguments)},{"./ac-object/clone":498,"./ac-object/create":499,"./ac-object/defaults":500,"./ac-object/extend":501,"./ac-object/getPrototypeOf":502,"./ac-object/isDate":503,"./ac-object/isEmpty":504,"./ac-object/isRegExp":505,"./ac-object/toQueryParameters":506}],498:[function(b,c,a){c.exports=b(28)
},{"./extend":501}],499:[function(b,c,a){c.exports=b(29)},{}],500:[function(b,c,a){c.exports=b(30)
},{"./extend":501}],501:[function(b,c,a){c.exports=b(31)},{}],502:[function(b,c,a){c.exports=b(32)
},{}],503:[function(b,c,a){c.exports=b(33)},{}],504:[function(b,c,a){c.exports=b(34)
},{}],505:[function(b,c,a){c.exports=b(35)},{}],506:[function(b,c,a){c.exports=b(36)
},{qs:496}],507:[function(b,c,a){c.exports={Model:b("./ac-mvc-model/Model")}},{"./ac-mvc-model/Model":508}],508:[function(c,d,b){var g=c("ac-event-emitter").EventEmitter;
var a=c("ac-object");var h=c("ac-mvc-cid").CID;var i=function(j){this.attributes=a.defaults(this.defaultAttributes,j||{});
this.cid=h.getNewCID();if(this.attributes[this.idAttribute]){this.id=this.attributes[this.idAttribute]
}};var f=i.prototype=a.create(g.prototype);f.defaultAttributes={};f.idAttribute="id";
f._trigger=function(l,k,j){j=j||{};if(j.silent!==true){this.trigger(l,k)}};f._triggerChange=function(l,k,j){return this._trigger("change:"+l,k,j)
};f.get=function(j){if(!this.attributes){return}return this.attributes[j]};f.set=function(k,j){if(!this.attributes){return
}var o;var n;var m;var l={};var p=false;for(o in k){if(k.hasOwnProperty(o)){m=this.get(o);
if((typeof m==="object"&&typeof k[o]==="object"&&JSON.stringify(m)===JSON.stringify(k[o]))||(m===k[o])){continue
}p=true;this.attributes[o]=k[o];n={value:k[o],previous:m};l[o]=n;this._triggerChange(o,n,j)
}}if(p){this._trigger("change",l,j)}};f.has=function(j){if(!this.attributes){return false
}return(this.attributes[j]!==undefined)};f.eachAttribute=function(k,j){if(!this.attributes){return
}var l;for(l in this.attributes){if(this.attributes.hasOwnProperty(l)){k.call(j,{attribute:l,value:this.attributes[l]})
}}};f.destroy=function(){this.trigger("destroy");this.off();var j;for(j in this){if(this.hasOwnProperty(j)){this[j]=null
}}};d.exports=i},{"ac-event-emitter":false,"ac-mvc-cid":494,"ac-object":497}],509:[function(b,c,a){c.exports={localization:b("./ac-video-localization/localization")}
},{"./ac-video-localization/localization":510}],510:[function(b,c,a){var h=b("./translations");
var g="/global/ac_media_player/scripts/ac_media_languages/";var f=document.getElementsByTagName("html")[0];
var d=b("ac-mvc-model").Model;var i={create:function(k){k=k||this.getLang();var j=this.getRequestPath(k);
return this.sendRequest(j)},getRequestPath:function(j){return g+this.getTranslationFileName(j)
},getLang:function(){var j=f.getAttribute("lang");var k;if(!j){k="en-us"}else{switch(j.toLowerCase()){case"es-418":k="es-LA";
break;case"pt":k="pt-BR";break;default:k=j;break}}return k},getTranslationFileName:function(j){var l=j.toLowerCase().split("-")[0];
var k=h[j]||false;if(!k){k=h[l]||h.en}return k},sendRequest:function(j){return new Promise(function(m,l){var k=new XMLHttpRequest();
k.onreadystatechange=function(){if(k.readyState===4){if(k.status>=200&&k.status<300){try{var n=JSON.parse(k.responseText);
for(var p in n){n[p].replace(/<br\s{0,}\/>/g,"")}m(new d(n))}catch(o){l(o)}}else{l(k)
}}};k.open("GET",j);k.send()})}};c.exports=i},{"./translations":511,"ac-mvc-model":507}],511:[function(b,c,a){c.exports={"bg-BG":"bg-BG.json","cs-CZ":"cs-CZ.json","el-GR":"el-GR.json","de-AT":"de-AT.json","de-CH":"de-CH.json","de-DE":"de-DE.json","de-LI":"de-LI.json","da-DK":"da-DK.json",en:"en.json","en-US":"en-US.json","en-AP":"en-AP.json","en-CA":"en-CA.json","en-GB":"en-GB.json","en-HK":"en-HK.json","en-IE":"en-IE.json","en-IN":"en-IN.json","en-KR":"en-KR.json","en-AU":"en-AU.json","en-NZ":"en-NZ.json","en-SG":"en-SG.json","en-ZA":"en-ZA.json",es:"es.json","es-LA":"es-LA.json","es-MX":"es-MX.json","es-ES":"es-ES.json","et-EE":"et-EE.json","fi-FI":"fi-FI.json",fr:"fr.json","fr-BE":"fr-BE.json","fr-CA":"fr-CA.json","fr-CH":"fr-CH.json","fr-FR":"fr-FR.json","hr-HR":"hr-HR.json","hu-HU":"hu-HU.json","it-IT":"it-IT.json",ja:"ja.json","ja-JP":"ja-JP.json","ko-KR":"ko-KR.json","lt-LT":"lt-LT.json","lv-LV":"lv-LV.json","nl-BE":"nl-BE.json","nl-NL":"nl-NL.json","no-NO":"no-NO.json","pl-PL":"pl-PL.json",pt:"pt.json","pt-BR":"pt-BR.json","pt-PT":"pt-PT.json","ro-RO":"ro-RO.json","ru-RU":"ru-RU.json","sk-SK":"sk-SK.json","sv-SE":"sv-SE.json","tr-TR":"tr-TR.json",zh:"zh.json","zh-CN":"zh-CN.json","zh-HK":"zh-HK.json","zh-TW":"zh-TW.json"}
},{}],512:[function(b,c,a){arguments[4][346][0].apply(a,arguments)},{"./ac-classlist/add":513,"./ac-classlist/contains":514,"./ac-classlist/remove":516,"./ac-classlist/toggle":517}],513:[function(b,c,a){c.exports=b(347)
},{"./helpers/className":515}],514:[function(b,c,a){c.exports=b(348)},{"./helpers/className":515}],515:[function(b,c,a){c.exports=b(349)
},{}],516:[function(b,c,a){c.exports=b(350)},{"./helpers/className":515}],517:[function(b,c,a){c.exports=b(351)
},{"./helpers/className":515}],518:[function(f,a,r){var g={};var p=/^\[object (HTMLCollection|NodeList|Object)\]$/;
var t=function(v,u){if(!g.isNode(v)){return false}if(typeof u==="number"){return(v.nodeType===u)
}return(u.indexOf(v.nodeType)!==-1)};var h=g.ELEMENT_NODE=1;var s=g.TEXT_NODE=3;
var n=g.COMMENT_NODE=8;var i=g.DOCUMENT_NODE=9;var k=g.DOCUMENT_TYPE_NODE=10;var j=g.DOCUMENT_FRAGMENT_NODE=11;
var c=[h,s,n,j];var m="Node must be an Element, TextNode, Comment, or Document Fragment";
var l=[h,s,n];var d="Node must be an Element, TextNode, or Comment";var q=[h,j];
var b="Node must be an Element, or Document Fragment";var o="Node must have a parentNode";
g.filterByNodeType=function(v,u){u=u||h;v=Array.prototype.slice.call(v);return v.filter(function(w){return t(w,u)
})};g.isNode=function(u){return !!(u&&u.nodeType)};g.isElement=function(u){return t(u,h)
};g.isNodeList=function(u){if(!u){return false}if(typeof u.length!=="number"){return false
}if(typeof u[0]==="object"&&(!u[0]||!u[0].nodeType)){return false}return p.test(Object.prototype.toString.call(u))
};g.isTextNode=function(u){return t(u,s)};g.isComment=function(u){return t(u,n)
};g.isDocument=function(u){return t(u,i)};g.isDocumentType=function(u){return t(u,k)
};g.isDocumentFragment=function(u){return t(u,j)};g.createDocumentFragment=function(v){var u=document.createDocumentFragment();
var w;if(v){w=document.createElement("div");w.innerHTML=v;while(w.firstChild){u.appendChild(w.firstChild)
}}return u};g.insertBefore=function(u,v){if(!t(u,c)){throw new TypeError("ac-dom-nodes.insertBefore: inserted "+m)
}if(!t(v,l)){throw new TypeError("ac-dom-nodes.insertBefore: target "+d)}if(!v.parentNode){throw new TypeError("ac-dom-nodes.insertBefore: target "+o)
}return v.parentNode.insertBefore(u,v)};g.insertAfter=function(u,v){if(!t(u,c)){throw new TypeError("ac-dom-nodes.insertAfter: inserted "+m)
}if(!t(v,l)){throw new TypeError("ac-dom-nodes.insertAfter: target "+d)}if(!v.parentNode){throw new TypeError("ac-dom-nodes.insertBefore: target "+o)
}if(!v.nextSibling){return v.parentNode.appendChild(u)}return v.parentNode.insertBefore(u,v.nextSibling)
};g.insertFirstChild=function(u,v){if(!t(u,c)){throw new TypeError("ac-dom-nodes.insertFirstChild: inserted "+m)
}if(!t(v,q)){throw new TypeError("ac-dom-nodes.insertFirstChild: target "+b)}if(!v.firstChild){return v.appendChild(u)
}return v.insertBefore(u,v.firstChild)};g.insertLastChild=function(u,v){if(!t(u,c)){throw new TypeError("ac-dom-nodes.insertLastChild: inserted "+m)
}if(!t(v,q)){throw new TypeError("ac-dom-nodes.insertLastChild: target "+b)}return v.appendChild(u)
};g.remove=function(u){if(!t(u,l)){throw new TypeError("ac-dom-nodes.remove: "+d)
}if(!u.parentNode){return u}return u.parentNode.removeChild(u)};g.replace=function(u,v){if(!t(u,c)){throw new TypeError("ac-dom-nodes.replace: new "+m)
}if(!t(v,l)){throw new TypeError("ac-dom-nodes.replace: old "+d)}if(!v.parentNode){throw new TypeError("ac-dom-nodes.replace: old "+o)
}return v.parentNode.replaceChild(u,v)};a.exports=g},{}],519:[function(b,c,a){c.exports=b(271)
},{"./ac-shared-instance/SharedInstance":520}],520:[function(b,c,a){c.exports=b(272)
},{}],521:[function(b,c,a){arguments[4][494][0].apply(a,arguments)},{"./ac-mvc-cid/CID":522}],522:[function(b,c,a){arguments[4][495][0].apply(a,arguments)
},{"ac-shared-instance":519}],523:[function(b,c,a){c.exports=b(26)},{}],524:[function(b,c,a){arguments[4][27][0].apply(a,arguments)
},{"./ac-object/clone":525,"./ac-object/create":526,"./ac-object/defaults":527,"./ac-object/extend":528,"./ac-object/getPrototypeOf":529,"./ac-object/isDate":530,"./ac-object/isEmpty":531,"./ac-object/isRegExp":532,"./ac-object/toQueryParameters":533}],525:[function(b,c,a){c.exports=b(28)
},{"./extend":528}],526:[function(b,c,a){c.exports=b(29)},{}],527:[function(b,c,a){c.exports=b(30)
},{"./extend":528}],528:[function(b,c,a){c.exports=b(31)},{}],529:[function(b,c,a){c.exports=b(32)
},{}],530:[function(b,c,a){c.exports=b(33)},{}],531:[function(b,c,a){c.exports=b(34)
},{}],532:[function(b,c,a){c.exports=b(35)},{}],533:[function(b,c,a){c.exports=b(36)
},{qs:523}],534:[function(b,c,a){c.exports={View:b("./ac-mvc-view/View")}},{"./ac-mvc-view/View":535}],535:[function(d,b,g){var j=d("ac-dom-emitter").DOMEmitter;
var c=d("ac-mvc-cid").CID;var f=d("ac-object");var i=d("ac-dom-nodes");var k=d("ac-classlist");
function a(l){var n;var m;var o;this.options=f.defaults(this.defaultOptions,l||{});
this.cid=c.getNewCID();this.model=this.options.model;if(this.options.template){this.template=this.options.template
}n=this.options.tagName||this.tagName;m=this.options.element;o=this.options.className||this.className;
if(!m){m=document.createElement(n)}j.call(this,m);if(o){this.addClassName(o)}if(this.options.events){this.delegateEvents(this.options.events)
}}var h=a.prototype=f.create(j.prototype);h.tagName="div";h.defaultOptions={};h.getTagName=function(){return this.el.tagName.toLowerCase()
};h.appendTo=function(l){i.insertLastChild(this.el,l);return this};h.render=function(){};
h.addClassName=function(l){return this._manipulateClassName(l,"add")};h.removeClassName=function(l){return this._manipulateClassName(l,"remove")
};h._manipulateClassName=function(m,n){var l;if(typeof m==="string"){l=m.split(" ")
}else{if(typeof m==="object"&&Array.isArray(m)){l=m.slice()}else{return this}}l.unshift(this.el);
k[n].apply(this.el,l);return this};h.destroy=function(){this.emitterTrigger("destroy");
this.off();i.remove(this.el);var l;for(l in this){if(this.hasOwnProperty(l)){this[l]=null
}}};h.delegateEvents=function(m,n){n=n||this;var l,o;for(l in m){if(m.hasOwnProperty(l)){o=m[l];
if(typeof o==="string"){m[l]=this[m[l]]}}}this.on(m,n);return this};b.exports=a
},{"ac-classlist":512,"ac-dom-emitter":106,"ac-dom-nodes":518,"ac-mvc-cid":521,"ac-object":524}],536:[function(b,c,a){c.exports=b(26)
},{}],537:[function(b,c,a){arguments[4][475][0].apply(a,arguments)},{"./ac-string/isString":538,"./ac-string/queryParameters":539,"./ac-string/queryStringToObject":540,"./ac-string/supplant":541,"./ac-string/toCamelCase":542,"./ac-string/toQueryPair":543}],538:[function(b,c,a){c.exports=b(476)
},{}],539:[function(b,c,a){arguments[4][477][0].apply(a,arguments)},{"./queryStringToObject":540}],540:[function(b,c,a){c.exports=b(478)
},{qs:536}],541:[function(b,c,a){c.exports=b(479)},{}],542:[function(b,c,a){c.exports=b(480)
},{}],543:[function(b,c,a){c.exports=b(481)},{}],544:[function(b,c,a){c.exports={View:b("./ac-video-nosupportview/NoSupportView")}
},{"./ac-video-nosupportview/NoSupportView":545}],545:[function(d,f,a){var i=d("ac-mvc-view").View;
var c=d("ac-object");var b=d("ac-string");function h(){i.apply(this,arguments)}var g=h.prototype=c.create(i.prototype);
g.className=["ac-video-nosupport"];g.defaultOptions={template:'<a onclick="s_objectID=&quot;http://www.apple.com/quicktime/download/_1&quot;;return this.s_oc?this.s_oc(e):true" href="{downloadquicktimeurl}" class="ac-video-quicktime-download"><span class="ac-video-quicktime-download-title">{downloadquicktimetitle}</span><span class="ac-video-quicktime-download-text">{downloadquicktimetext}</span><span class="ac-video-quicktime-download-button">{downloadquicktimebutton}</span></a>'};
g.render=function(){this.el.innerHTML=b.supplant(this.options.template,this.model.attributes)
};f.exports=h},{"ac-mvc-view":534,"ac-object":1033,"ac-string":537}],546:[function(b,c,a){c.exports=b(26)
},{}],547:[function(b,c,a){c.exports=b(36)},{qs:546}],548:[function(b,f,a){var g=b("./request/factory");
var d={complete:function(j,i){},error:function(j,i){},method:"GET",headers:{},success:function(j,i,k){},timeout:5000};
var h=function(){for(var k=1;k<arguments.length;k++){for(var j in arguments[k]){if(arguments[k].hasOwnProperty(j)){arguments[0][j]=arguments[k][j]
}}}return arguments[0]};var c={ajax:function(i,j){j=h({},d,j);if(i.substr(0,2)==="//"){i=window.location.protocol+i
}var k=g(i);k.open(j.method,i);k.setTransportHeaders(j.headers);k.setReadyStateChangeHandlers(j.complete,j.error,j.success);
k.setTimeout(j.timeout,j.error,j.complete);k.send(j.data);return k},get:function(i,j){j.method="GET";
return c.ajax(i,j)},head:function(i,j){j.method="HEAD";return c.ajax(i,j)},post:function(i,j){j.method="POST";
return c.ajax(i,j)}};f.exports=c},{"./request/factory":549}],549:[function(c,b,f){var j=c("./xmlhttprequest");
var i=c("./xdomainrequest");var h=/.*(?=:\/\/)/;var a=/^.*:\/\/|\/.+$/g;var d=window.XDomainRequest&&document.documentMode<10;
var g=function(l){if(!l.match(h)){return false}var k=l.replace(a,"");return k!==window.location.hostname
};b.exports=function(k,l){var m=d&&g(k)?i:j;return new m()}},{"./xdomainrequest":551,"./xmlhttprequest":552}],550:[function(b,d,a){var c=function(){};
c.create=function(){var f=function(){};f.prototype=c.prototype;return new f()};
c.prototype.open=function(g,f){g=g.toUpperCase();this.xhr.open(g,f)};c.prototype.send=function(f){this.xhr.send(f)
};c.prototype.setTimeout=function(h,g,f){this.xhr.ontimeout=function(){g(this.xhr,this.status);
f(this.xhr,this.status)}.bind(this)};c.prototype.setTransportHeaders=function(f){for(var g in f){this.xhr.setRequestHeader(g,f[g])
}};d.exports=c},{}],551:[function(b,f,a){var d=b("./request");var c=b("ac-object/toQueryParameters");
var g=function(){this.xhr=new XDomainRequest()};g.prototype=d.create();g.prototype.setReadyStateChangeHandlers=function(h,i,j){this.xhr.onerror=function(){i(this.xhr,this.status);
h(this.xhr,this.status)}.bind(this);this.xhr.onload=function(){j(this.xhr.responseText,this.xhr.status,this.xhr);
h(this.xhr,this.status)}.bind(this)};g.prototype.send=function(h){if(h&&typeof h==="object"){h=c(h)
}this.xhr.send(h)};g.prototype.setTransportHeaders=function(h){};f.exports=g},{"./request":550,"ac-object/toQueryParameters":547}],552:[function(b,d,a){var c=b("./request");
var f=function(){this.xhr=new XMLHttpRequest()};f.prototype=c.create();f.prototype.setReadyStateChangeHandlers=function(g,h,i){this.xhr.onreadystatechange=function(j){if(this.xhr.readyState===4){clearTimeout(this.timeout);
if(this.xhr.status>=200&&this.xhr.status<300){i(this.xhr.responseText,this.xhr.status,this.xhr);
g(this.xhr,this.status)}else{h(this.xhr,this.status);g(this.xhr,this.status)}}}.bind(this)
};d.exports=f},{"./request":550}],553:[function(b,c,a){var d=b("./className/add");
b("ac-polyfills/Array/prototype.slice").polyfill();b("ac-polyfills/Element-HTMLElement/prototype.classList").polyfill();
c.exports=function f(){var j=Array.prototype.slice.call(arguments);var h=j.shift(j);
var g;if(h.classList&&h.classList.add){h.classList.add.apply(h.classList,j);return
}for(g=0;g<j.length;g++){d(h,j[g])}}},{"./className/add":554,"ac-polyfills/Array/prototype.slice":559,"ac-polyfills/Element-HTMLElement/prototype.classList":560}],554:[function(b,c,a){arguments[4][60][0].apply(a,arguments)
},{"./contains":555}],555:[function(b,c,a){c.exports=b(61)},{"./getTokenRegExp":556}],556:[function(b,c,a){c.exports=b(62)
},{}],557:[function(b,c,a){arguments[4][63][0].apply(a,arguments)},{"./contains":555,"./getTokenRegExp":556}],558:[function(b,d,a){var f=b("./className/contains");
b("ac-polyfills/Element-HTMLElement/prototype.classList").polyfill();d.exports=function c(h,g){if(h.classList&&h.classList.contains){return h.classList.contains(g)
}return f(h,g)}},{"./className/contains":555,"ac-polyfills/Element-HTMLElement/prototype.classList":560}],559:[function(b,c,a){c.exports={polyfill:function(){(function(){var d=Array.prototype.slice;
try{d.call(document.documentElement)}catch(f){Array.prototype.slice=function(n,j){j=(typeof j!=="undefined")?j:this.length;
if(Object.prototype.toString.call(this)==="[object Array]"){return d.call(this,n,j)
}var l,h=[],k,g=this.length;var o=n||0;o=(o>=0)?o:g+o;var m=(j)?j:g;if(j<0){m=g+j
}k=m-o;if(k>0){h=new Array(k);if(this.charAt){for(l=0;l<k;l++){h[l]=this.charAt(o+l)
}}else{for(l=0;l<k;l++){h[l]=this[o+l]}}}return h}}}())}}},{}],560:[function(b,c,a){c.exports={polyfill:function(){
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
;
if("document" in self){if(!("classList" in document.createElement("_"))){(function(n){if(!("Element" in n)){return
}var d="classList",j="prototype",q=n.Element[j],f=Object,o=String[j].trim||function(){return this.replace(/^\s+|\s+$/g,"")
},g=Array[j].indexOf||function(u){var t=0,s=this.length;for(;t<s;t++){if(t in this&&this[t]===u){return t
}}return -1},r=function(s,t){this.name=s;this.code=DOMException[s];this.message=t
},k=function(t,s){if(s===""){throw new r("SYNTAX_ERR","An invalid or illegal string was specified")
}if(/\s/.test(s)){throw new r("INVALID_CHARACTER_ERR","String contains an invalid character")
}return g.call(t,s)},h=function(w){var v=o.call(w.getAttribute("class")||""),u=v?v.split(/\s+/):[],t=0,s=u.length;
for(;t<s;t++){this.push(u[t])}this._updateClassName=function(){w.setAttribute("class",this.toString())
}},i=h[j]=[],m=function(){return new h(this)};r[j]=Error[j];i.item=function(s){return this[s]||null
};i.contains=function(s){s+="";return k(this,s)!==-1};i.add=function(){var w=arguments,v=0,t=w.length,u,s=false;
do{u=w[v]+"";if(k(this,u)===-1){this.push(u);s=true}}while(++v<t);if(s){this._updateClassName()
}};i.remove=function(){var x=arguments,w=0,t=x.length,v,s=false,u;do{v=x[w]+"";
u=k(this,v);while(u!==-1){this.splice(u,1);s=true;u=k(this,v)}}while(++w<t);if(s){this._updateClassName()
}};i.toggle=function(t,u){t+="";var s=this.contains(t),v=s?u!==true&&"remove":u!==false&&"add";
if(v){this[v](t)}if(u===true||u===false){return u}else{return !s}};i.toString=function(){return this.join(" ")
};if(f.defineProperty){var p={get:m,enumerable:true,configurable:true};try{f.defineProperty(q,d,p)
}catch(l){if(l.number===-2146823252){p.enumerable=false;f.defineProperty(q,d,p)
}}}else{if(f[j].__defineGetter__){q.__defineGetter__(d,m)}}}(self))}else{(function(){var f=document.createElement("_");
f.classList.add("c1","c2");if(!f.classList.contains("c2")){var g=function(i){var h=DOMTokenList.prototype[i];
DOMTokenList.prototype[i]=function(l){var k,j=arguments.length;for(k=0;k<j;k++){l=arguments[k];
h.call(this,l)}}};g("add");g("remove")}f.classList.toggle("c3",false);if(f.classList.contains("c3")){var d=DOMTokenList.prototype.toggle;
DOMTokenList.prototype.toggle=function(h,i){if(1 in arguments&&!this.contains(h)===!i){return i
}else{return d.call(this,h)}}}f=null}())}}}}},{}],561:[function(d,f,c){var b=d("./className/remove");
d("ac-polyfills/Array/prototype.slice").polyfill();d("ac-polyfills/Element-HTMLElement/prototype.classList").polyfill();
f.exports=function a(){var j=Array.prototype.slice.call(arguments);var h=j.shift(j);
var g;if(h.classList&&h.classList.remove){h.classList.remove.apply(h.classList,j);
return}for(g=0;g<j.length;g++){b(h,j[g])}}},{"./className/remove":557,"ac-polyfills/Array/prototype.slice":559,"ac-polyfills/Element-HTMLElement/prototype.classList":560}],562:[function(b,c,a){c.exports={log:b("./ac-console/log")}
},{"./ac-console/log":563}],563:[function(d,f,b){var a="f7c9180f-5c45-47b4-8de4-428015f096c0";
var c=!!(function(){try{return window.localStorage.getItem(a)}catch(h){}}());f.exports=function g(){if(window.console&&typeof console.log!=="undefined"&&c){console.log.apply(console,Array.prototype.slice.call(arguments,0))
}}},{}],564:[function(b,c,a){arguments[4][76][0].apply(a,arguments)},{"./ac-prefixer/Prefixer":565}],565:[function(b,c,a){c.exports=b(77)
},{"./Prefixer/camelCasedEvents":566}],566:[function(b,c,a){c.exports=b(78)},{}],567:[function(b,c,a){arguments[4][79][0].apply(a,arguments)
},{"./ac-dom-events/addEventListener":568,"./ac-dom-events/dispatchEvent":569,"./ac-dom-events/preventDefault":570,"./ac-dom-events/removeEventListener":571,"./ac-dom-events/stop":572,"./ac-dom-events/stopPropagation":573,"./ac-dom-events/target":574}],568:[function(b,c,a){arguments[4][80][0].apply(a,arguments)
},{"ac-prefixer":564}],569:[function(b,c,a){c.exports=b(81)},{}],570:[function(b,c,a){c.exports=b(82)
},{}],571:[function(b,c,a){arguments[4][83][0].apply(a,arguments)},{"ac-prefixer":564}],572:[function(b,c,a){c.exports=b(84)
},{"./preventDefault":570,"./stopPropagation":573}],573:[function(b,c,a){c.exports=b(85)
},{}],574:[function(b,c,a){c.exports=b(86)},{}],575:[function(b,c,a){arguments[4][87][0].apply(a,arguments)
},{"./ac-dom-traversal/ancestor":576,"./ac-dom-traversal/ancestors":577,"./ac-dom-traversal/children":578,"./ac-dom-traversal/filterBySelector":579,"./ac-dom-traversal/firstChild":580,"./ac-dom-traversal/lastChild":583,"./ac-dom-traversal/matchesSelector":584,"./ac-dom-traversal/nextSibling":585,"./ac-dom-traversal/nextSiblings":586,"./ac-dom-traversal/previousSibling":587,"./ac-dom-traversal/previousSiblings":588,"./ac-dom-traversal/querySelector":589,"./ac-dom-traversal/querySelectorAll":590,"./ac-dom-traversal/shims/ie":591,"./ac-dom-traversal/siblings":592}],576:[function(b,c,a){arguments[4][88][0].apply(a,arguments)
},{"./helpers/validate":582,"./matchesSelector":584,"ac-dom-nodes":148}],577:[function(b,c,a){arguments[4][89][0].apply(a,arguments)
},{"./helpers/validate":582,"./matchesSelector":584,"ac-dom-nodes":148}],578:[function(b,c,a){arguments[4][90][0].apply(a,arguments)
},{"./filterBySelector":579,"./helpers/validate":582,"ac-dom-nodes":148}],579:[function(b,c,a){arguments[4][91][0].apply(a,arguments)
},{"./helpers/validate":582,"./matchesSelector":584}],580:[function(b,c,a){arguments[4][92][0].apply(a,arguments)
},{"./children":578,"./helpers/validate":582}],581:[function(b,c,a){c.exports=b(93)
},{}],582:[function(b,c,a){c.exports=b(94)},{"ac-dom-nodes":148}],583:[function(b,c,a){arguments[4][95][0].apply(a,arguments)
},{"./children":578,"./helpers/validate":582}],584:[function(b,c,a){c.exports=b(96)
},{"./helpers/nativeMatches":581,"./helpers/validate":582,"ac-dom-nodes":148}],585:[function(b,c,a){arguments[4][97][0].apply(a,arguments)
},{"./helpers/validate":582,"./matchesSelector":584,"ac-dom-nodes":148}],586:[function(b,c,a){arguments[4][98][0].apply(a,arguments)
},{"./helpers/validate":582,"./matchesSelector":584,"ac-dom-nodes":148}],587:[function(b,c,a){arguments[4][99][0].apply(a,arguments)
},{"./helpers/validate":582,"./matchesSelector":584,"ac-dom-nodes":148}],588:[function(b,c,a){arguments[4][100][0].apply(a,arguments)
},{"./helpers/validate":582,"./matchesSelector":584,"ac-dom-nodes":148}],589:[function(b,c,a){c.exports=b(101)
},{"./helpers/validate":582}],590:[function(b,c,a){c.exports=b(102)},{"./helpers/validate":582}],591:[function(b,c,a){c.exports=b(103)
},{"../helpers/nativeMatches":581,"../helpers/validate":582,"../vendor/sizzle/sizzle":593,"ac-dom-nodes":148}],592:[function(b,c,a){arguments[4][104][0].apply(a,arguments)
},{"./children":578,"./helpers/validate":582}],593:[function(b,c,a){c.exports=b(105)
},{}],594:[function(b,c,a){arguments[4][106][0].apply(a,arguments)},{"./ac-dom-emitter/DOMEmitter":595}],595:[function(b,c,a){arguments[4][413][0].apply(a,arguments)
},{"./DOMEmitterEvent":596,"ac-dom-events":567,"ac-dom-traversal":575,"ac-event-emitter":false}],596:[function(b,c,a){arguments[4][414][0].apply(a,arguments)
},{"ac-dom-events":567}],597:[function(b,c,a){arguments[4][109][0].apply(a,arguments)
},{"./shared/getEventType":603,"./utils/addEventListener":604}],598:[function(b,c,a){c.exports=b(113)
},{"./shared/camelCasedEventTypes":599,"./shared/prefixHelper":600,"./shared/windowFallbackEventTypes":601,"./utils/eventTypeAvailable":602}],599:[function(b,c,a){c.exports=b(114)
},{}],600:[function(b,c,a){c.exports=b(115)},{}],601:[function(b,c,a){c.exports=b(116)
},{}],602:[function(b,c,a){c.exports=b(117)},{}],603:[function(b,c,a){arguments[4][120][0].apply(a,arguments)
},{"ac-prefixer/getEventType":598}],604:[function(b,c,a){c.exports=b(124)},{}],605:[function(b,c,a){c.exports=b(233)
},{"./ac-dom-styles/ie":606,"./ac-dom-styles/vendorTransformHelper":607}],606:[function(b,c,a){c.exports=b(234)
},{}],607:[function(b,c,a){c.exports=b(235)},{}],608:[function(b,c,a){c.exports=b(23)
},{"./ac-feature/cssPropertyAvailable":609,"./ac-feature/localStorageAvailable":610}],609:[function(b,c,a){c.exports=b(24)
},{}],610:[function(b,c,a){c.exports=b(25)},{}],611:[function(b,c,a){arguments[4][224][0].apply(a,arguments)
},{"./ac-array/flatten":612,"./ac-array/intersection":613,"./ac-array/toArray":614,"./ac-array/union":615,"./ac-array/unique":616,"./ac-array/without":617}],612:[function(b,c,a){c.exports=b(225)
},{}],613:[function(b,c,a){c.exports=b(226)},{}],614:[function(b,c,a){c.exports=b(227)
},{}],615:[function(b,c,a){c.exports=b(228)},{"./flatten":612,"./unique":616}],616:[function(b,c,a){c.exports=b(229)
},{}],617:[function(b,c,a){c.exports=b(230)},{}],618:[function(b,c,a){c.exports=b(271)
},{"./ac-shared-instance/SharedInstance":619}],619:[function(b,c,a){c.exports=b(272)
},{}],620:[function(b,c,a){arguments[4][494][0].apply(a,arguments)},{"./ac-mvc-cid/CID":621}],621:[function(b,c,a){arguments[4][495][0].apply(a,arguments)
},{"ac-shared-instance":618}],622:[function(b,c,a){c.exports={Collection:b("./ac-mvc-collection/Collection")}
},{"./ac-mvc-collection/Collection":623}],623:[function(d,b,j){var g=d("ac-object"),m=d("ac-array"),c=d("ac-mvc-cid").CID,n=d("ac-event-emitter").EventEmitter;
var i=["every","filter","forEach","map","reduce","reduceRight","some","slice","sort","reverse","indexOf","lastIndexOf"];
var l=["intersection","union","unique","without"];var a={add:"add",remove:"remove",set:"set",reset:"reset",empty:"empty",destroy:"destroy"};
function f(r,o,p,q){if(typeof r[o]!=="undefined"){return}r[o]=(function(s,t){return function(){var v=m.toArray(arguments),u=t.concat(v);
return s.apply(this,u)}}(p,q))}function h(o){n.call(this);this.options=g.defaults(this.defaultOptions,o||{});
this.models=[];this.cid=c.getNewCID();if(this.options.ModelType){this.ModelType=this.options.ModelType
}if(this.ModelType){this._modelsObject={}}this.on(a.add,this._addToModelsObject,this);
this.on(a.remove,this._removeFromModelsObject,this);if(this.options.models){this.add(this.options.models)
}}var k=h.prototype=g.create(n.prototype);k.defaultOptions={};k.count=function(){if(!this.models){return null
}return this.models.length};k.add=function(p,o){o=o||{};if(typeof p==="undefined"){p=[]
}p=this._returnAsArray(p);p=this._createModels(p);if(this.models.length===0){this.models=p
}else{this.models=this.models.concat(p)}this._trigger(a.add,{models:p},o);return this
};k.remove=function(t,r){r=r||{};if(!t){return[]}t=this._returnAsArray(t);var q=[],s,p,o=t.length;
for(s=0;s<o;s++){p=this.indexOf(t[s]);if(p>-1){q.push(t[s]);this.spliceWithOptions([p,1],{silent:true})
}}if(q.length>0){this._trigger(a.remove,{models:q},r)}return q};k.reset=function(p,o){o=o||{};
this.empty(o);this.add(p,o);this._trigger(a.reset,{models:this.models},o);return this
};k.empty=function(p){p=p||{};var o=this.slice(0);this.models=[];if(this._modelsObject){this._modelsObject={}
}if(o.length>0){this._trigger(a.remove,{models:o},p);this._trigger(a.empty,{models:o},p)
}return o};k.destroy=function(o){o=o||{};var q=this.empty(o);this._trigger(a.destroy,{models:q},o);
this.off();var p;for(p in this){if(this.hasOwnProperty(p)){this[p]=null}}};k.get=function(r){var p=this._getModelByID(r);
if(p){return p}var q,o=this.models.length;for(q=0;q<o;q++){if((typeof this.models[q].id!=="undefined"&&this.models[q].id===r)||(typeof this.models[q].cid!=="undefined"&&this.models[q].cid===r)){p=this.models[q];
break}}return p};k.set=function(s,A){A=A||{};if(typeof s==="undefined"){s=[]}s=this._returnAsArray(s);
var t,o="id",x=s.length,y=[],B=[],r={},z;if(this.ModelType&&this.ModelType.prototype.idAttribute){o=this.ModelType.prototype.idAttribute
}if(A.matchParameter){o=A.matchParameter}for(t=0;t<x;t++){z=null;if(typeof s[t]==="object"){z=this.get(s[t][o])
}if(z){if(this.ModelType){z.set(s[t]);r[z.cid]=true}else{z=s[t]}B.push(z);continue
}if(this.ModelType){s[t]=this._createModel(s[t])}if(this.ModelType||this.indexOf(s[t])===-1){y.push(s[t])
}B.push(s[t])}var q,v=B.length,w=[],p,u;x=this.models.length;for(t=0;t<x;t++){u=this.models[t];
if(this.ModelType){p=true;if(r[u.cid]){p=false}}else{p=true;for(q=0;q<v;q++){if(u===B[q]){p=false;
break}}}if(p){w.push(u)}}this.models=B;if(y.length>0){this._trigger(a.add,{models:y},A)
}if(w.length>0){this._trigger(a.remove,{models:w},A)}this._trigger(a.set,{models:B},A);
return w};k.at=function(o){if(!this.models){return}return this.models[o]};k.find=function(v,x){if(typeof v!=="object"){console.warn("Collection.protoype.find query needs to be an object");
return[]}x=x||{};var y=[],u=false,s=0,r,q,o=null,w=0,t=this.models.length,p=t;if(x.reverse){w=t-1;
p=-1;u=true}if(x.limit){o=x.limit}for(q=w;(u?q>p:q<p);(u?q--:q++)){r=this.models[q];
if(this._modelMatchesProperties(r,v)){if(u){y.unshift(r)}else{y.push(r)}s++;if(o&&s>=o){break
}}}return y};k.push=function(){return this.pushWithOptions(m.toArray(arguments))
};k.pop=function(){return this.popWithOptions(m.toArray(arguments))};k.shift=function(){return this.shiftWithOptions(m.toArray(arguments))
};k.unshift=function(){return this.unshiftWithOptions(m.toArray(arguments))};k.splice=function(){return this.spliceWithOptions(m.toArray(arguments))
};k.pushWithOptions=function(q,p){p=p||{};var r=this._createModels(q),o=Array.prototype.push.apply(this.models,r);
if(r.length>0){this._trigger(a.add,{models:r},p)}return o};k.popWithOptions=function(p,o){o=o||{};
var q=Array.prototype.pop.call(this.models);if(q){this._trigger(a.remove,{models:[q]},o)
}return q};k.shiftWithOptions=function(p,o){o=o||{};var q=Array.prototype.shift.call(this.models);
if(q){this._trigger(a.remove,{models:[q]},o)}return q};k.unshiftWithOptions=function(q,p){p=p||{};
var r=this._createModels(q),o=Array.prototype.unshift.apply(this.models,r);if(r.length>0){this._trigger(a.add,{models:r},p)
}return o};k.spliceWithOptions=function(q,p){p=p||{};var r=[q[0],q[1]],o,t,s;if(q.length>2){o=q.slice(2,q.length);
t=this._createModels(o);r=r.concat(t)}s=Array.prototype.splice.apply(this.models,r);
if(s.length>0){this._trigger(a.remove,{models:s},p)}if(t){this._trigger(a.add,{models:t},p)
}return s};k._trigger=function(o,q,p){p=p||{};if(!p.silent){this.trigger(o,q)}};
k._getModelByID=function(o){if(this.ModelType&&this._modelsObject&&this._modelsObject[o]){return this._modelsObject[o]
}return null};k._createModel=function(o){if(o instanceof this.ModelType||o instanceof h){return o
}return new this.ModelType(o)};k._createModels=function(q){if(!this.ModelType){return Array.prototype.slice.call(q,0)
}var p=[],r,s,o=q.length;for(s=0;s<o;s++){r=q[s];if(!(r instanceof this.ModelType)){r=this._createModel(r)
}p.push(r)}return p};k._modelMatchesProperties=function(o,q){var p;for(p in q){if(q.hasOwnProperty(p)){if(this._getPropFromModel(o,p)!==q[p]){return false
}}}return true};k._getPropFromModel=function(o,p){if(this.ModelType){return o.get(p)
}return o[p]};k._addToModelsObject=function(o){if(!this._modelsObject||!o.models){this._modelsObject={}
}o.models.forEach(function(p){this._modelsObject[p.id]=p;this._modelsObject[p.cid]=p
},this)};k._removeFromModelsObject=function(o){if(!this._modelsObject||!o.models){this._modelsObject={}
}o.models.forEach(function(p){this._modelsObject[p.id]=null;this._modelsObject[p.cid]=null
},this)};k._returnAsArray=function(o){if(!Array.isArray(o)){o=[o]}return o};k._acArrayProxy=function(p){var o=m.toArray(arguments);
o[0]=this.models;return m[p].apply(m,o)};k._arrayPrototypeProxy=function(p){var o=m.toArray(arguments);
o.shift();return Array.prototype[p].apply(this.models,o)};i.forEach(function(o){if(typeof Array.prototype[o]==="function"){f(this,o,this._arrayPrototypeProxy,[o])
}},k);l.forEach(function(o){if(typeof m[o]==="function"){f(this,o,this._acArrayProxy,[o])
}},k);b.exports=h},{"ac-array":611,"ac-event-emitter":false,"ac-mvc-cid":620,"ac-object":707}],624:[function(b,c,a){c.exports=b(271)
},{"./ac-shared-instance/SharedInstance":625}],625:[function(b,c,a){c.exports=b(272)
},{}],626:[function(b,c,a){arguments[4][494][0].apply(a,arguments)},{"./ac-mvc-cid/CID":627}],627:[function(b,c,a){arguments[4][495][0].apply(a,arguments)
},{"ac-shared-instance":624}],628:[function(b,c,a){arguments[4][507][0].apply(a,arguments)
},{"./ac-mvc-model/Model":629}],629:[function(b,c,a){arguments[4][508][0].apply(a,arguments)
},{"ac-event-emitter":false,"ac-mvc-cid":626,"ac-object":707}],630:[function(b,c,a){arguments[4][346][0].apply(a,arguments)
},{"./ac-classlist/add":631,"./ac-classlist/contains":632,"./ac-classlist/remove":634,"./ac-classlist/toggle":635}],631:[function(b,c,a){c.exports=b(347)
},{"./helpers/className":633}],632:[function(b,c,a){c.exports=b(348)},{"./helpers/className":633}],633:[function(b,c,a){c.exports=b(349)
},{}],634:[function(b,c,a){c.exports=b(350)},{"./helpers/className":633}],635:[function(b,c,a){c.exports=b(351)
},{"./helpers/className":633}],636:[function(b,c,a){arguments[4][76][0].apply(a,arguments)
},{"./ac-prefixer/Prefixer":637}],637:[function(b,c,a){c.exports=b(77)},{"./Prefixer/camelCasedEvents":638}],638:[function(b,c,a){c.exports=b(78)
},{}],639:[function(b,c,a){arguments[4][79][0].apply(a,arguments)},{"./ac-dom-events/addEventListener":640,"./ac-dom-events/dispatchEvent":641,"./ac-dom-events/preventDefault":642,"./ac-dom-events/removeEventListener":643,"./ac-dom-events/stop":644,"./ac-dom-events/stopPropagation":645,"./ac-dom-events/target":646}],640:[function(b,c,a){arguments[4][80][0].apply(a,arguments)
},{"ac-prefixer":636}],641:[function(b,c,a){c.exports=b(81)},{}],642:[function(b,c,a){c.exports=b(82)
},{}],643:[function(b,c,a){arguments[4][83][0].apply(a,arguments)},{"ac-prefixer":636}],644:[function(b,c,a){c.exports=b(84)
},{"./preventDefault":642,"./stopPropagation":645}],645:[function(b,c,a){c.exports=b(85)
},{}],646:[function(b,c,a){c.exports=b(86)},{}],647:[function(b,c,a){c.exports=b(139)
},{}],648:[function(b,c,a){c.exports=b(140)},{}],649:[function(b,c,a){c.exports=b(141)
},{}],650:[function(b,c,a){c.exports=b(142)},{}],651:[function(b,c,a){c.exports=b(143)
},{}],652:[function(b,c,a){c.exports=b(144)},{}],653:[function(b,c,a){c.exports=b(145)
},{}],654:[function(b,c,a){arguments[4][146][0].apply(a,arguments)},{"./ELEMENT_NODE":651,"./internal/isNodeType":662,"ac-polyfills/Array/prototype.filter":672,"ac-polyfills/Array/prototype.slice":674}],655:[function(b,c,a){c.exports=b(147)
},{}],656:[function(b,c,a){arguments[4][148][0].apply(a,arguments)},{"./COMMENT_NODE":647,"./DOCUMENT_FRAGMENT_NODE":648,"./DOCUMENT_NODE":649,"./DOCUMENT_TYPE_NODE":650,"./ELEMENT_NODE":651,"./TEXT_NODE":652,"./createDocumentFragment":653,"./filterByNodeType":654,"./hasAttribute":655,"./indexOf":657,"./insertAfter":658,"./insertBefore":659,"./insertFirstChild":660,"./insertLastChild":661,"./isComment":664,"./isDocument":665,"./isDocumentFragment":666,"./isDocumentType":667,"./isElement":668,"./isNode":669,"./isNodeList":670,"./isTextNode":671,"./remove":675,"./replace":676}],657:[function(b,c,a){arguments[4][149][0].apply(a,arguments)
},{"./filterByNodeType":654,"./internal/validate":663,"ac-polyfills/Array/prototype.indexOf":673,"ac-polyfills/Array/prototype.slice":674}],658:[function(b,c,a){arguments[4][150][0].apply(a,arguments)
},{"./internal/validate":663}],659:[function(b,c,a){arguments[4][151][0].apply(a,arguments)
},{"./internal/validate":663}],660:[function(b,c,a){arguments[4][152][0].apply(a,arguments)
},{"./internal/validate":663}],661:[function(b,c,a){arguments[4][153][0].apply(a,arguments)
},{"./internal/validate":663}],662:[function(b,c,a){c.exports=b(154)},{"../isNode":669}],663:[function(b,c,a){arguments[4][155][0].apply(a,arguments)
},{"../COMMENT_NODE":647,"../DOCUMENT_FRAGMENT_NODE":648,"../ELEMENT_NODE":651,"../TEXT_NODE":652,"./isNodeType":662}],664:[function(b,c,a){arguments[4][156][0].apply(a,arguments)
},{"./COMMENT_NODE":647,"./internal/isNodeType":662}],665:[function(b,c,a){arguments[4][157][0].apply(a,arguments)
},{"./DOCUMENT_NODE":649,"./internal/isNodeType":662}],666:[function(b,c,a){arguments[4][158][0].apply(a,arguments)
},{"./DOCUMENT_FRAGMENT_NODE":648,"./internal/isNodeType":662}],667:[function(b,c,a){arguments[4][159][0].apply(a,arguments)
},{"./DOCUMENT_TYPE_NODE":650,"./internal/isNodeType":662}],668:[function(b,c,a){arguments[4][160][0].apply(a,arguments)
},{"./ELEMENT_NODE":651,"./internal/isNodeType":662}],669:[function(b,c,a){c.exports=b(161)
},{}],670:[function(b,c,a){c.exports=b(162)},{}],671:[function(b,c,a){arguments[4][163][0].apply(a,arguments)
},{"./TEXT_NODE":652,"./internal/isNodeType":662}],672:[function(b,c,a){c.exports=b(52)
},{}],673:[function(b,c,a){c.exports=b(165)},{}],674:[function(b,c,a){c.exports=b(66)
},{}],675:[function(b,c,a){arguments[4][167][0].apply(a,arguments)},{"./internal/validate":663}],676:[function(b,c,a){arguments[4][168][0].apply(a,arguments)
},{"./internal/validate":663}],677:[function(b,c,a){arguments[4][87][0].apply(a,arguments)
},{"./ac-dom-traversal/ancestor":678,"./ac-dom-traversal/ancestors":679,"./ac-dom-traversal/children":680,"./ac-dom-traversal/filterBySelector":681,"./ac-dom-traversal/firstChild":682,"./ac-dom-traversal/lastChild":685,"./ac-dom-traversal/matchesSelector":686,"./ac-dom-traversal/nextSibling":687,"./ac-dom-traversal/nextSiblings":688,"./ac-dom-traversal/previousSibling":689,"./ac-dom-traversal/previousSiblings":690,"./ac-dom-traversal/querySelector":691,"./ac-dom-traversal/querySelectorAll":692,"./ac-dom-traversal/shims/ie":693,"./ac-dom-traversal/siblings":694}],678:[function(b,c,a){arguments[4][88][0].apply(a,arguments)
},{"./helpers/validate":684,"./matchesSelector":686,"ac-dom-nodes":656}],679:[function(b,c,a){arguments[4][89][0].apply(a,arguments)
},{"./helpers/validate":684,"./matchesSelector":686,"ac-dom-nodes":656}],680:[function(b,c,a){arguments[4][90][0].apply(a,arguments)
},{"./filterBySelector":681,"./helpers/validate":684,"ac-dom-nodes":656}],681:[function(b,c,a){arguments[4][91][0].apply(a,arguments)
},{"./helpers/validate":684,"./matchesSelector":686}],682:[function(b,c,a){arguments[4][92][0].apply(a,arguments)
},{"./children":680,"./helpers/validate":684}],683:[function(b,c,a){c.exports=b(93)
},{}],684:[function(b,c,a){arguments[4][94][0].apply(a,arguments)},{"ac-dom-nodes":656}],685:[function(b,c,a){arguments[4][95][0].apply(a,arguments)
},{"./children":680,"./helpers/validate":684}],686:[function(b,c,a){arguments[4][96][0].apply(a,arguments)
},{"./helpers/nativeMatches":683,"./helpers/validate":684,"ac-dom-nodes":656}],687:[function(b,c,a){arguments[4][97][0].apply(a,arguments)
},{"./helpers/validate":684,"./matchesSelector":686,"ac-dom-nodes":656}],688:[function(b,c,a){arguments[4][98][0].apply(a,arguments)
},{"./helpers/validate":684,"./matchesSelector":686,"ac-dom-nodes":656}],689:[function(b,c,a){arguments[4][99][0].apply(a,arguments)
},{"./helpers/validate":684,"./matchesSelector":686,"ac-dom-nodes":656}],690:[function(b,c,a){arguments[4][100][0].apply(a,arguments)
},{"./helpers/validate":684,"./matchesSelector":686,"ac-dom-nodes":656}],691:[function(b,c,a){arguments[4][101][0].apply(a,arguments)
},{"./helpers/validate":684}],692:[function(b,c,a){arguments[4][102][0].apply(a,arguments)
},{"./helpers/validate":684}],693:[function(b,c,a){arguments[4][103][0].apply(a,arguments)
},{"../helpers/nativeMatches":683,"../helpers/validate":684,"../vendor/sizzle/sizzle":695,"ac-dom-nodes":656}],694:[function(b,c,a){arguments[4][104][0].apply(a,arguments)
},{"./children":680,"./helpers/validate":684}],695:[function(b,c,a){c.exports=b(105)
},{}],696:[function(b,c,a){arguments[4][106][0].apply(a,arguments)},{"./ac-dom-emitter/DOMEmitter":697}],697:[function(b,c,a){arguments[4][107][0].apply(a,arguments)
},{"./DOMEmitterEvent":698,"ac-dom-events":639,"ac-dom-traversal":677,"ac-event-emitter":false}],698:[function(b,c,a){arguments[4][108][0].apply(a,arguments)
},{"ac-dom-events":639}],699:[function(b,c,a){c.exports=b(518)},{}],700:[function(b,c,a){c.exports=b(271)
},{"./ac-shared-instance/SharedInstance":701}],701:[function(b,c,a){c.exports=b(272)
},{}],702:[function(b,c,a){arguments[4][494][0].apply(a,arguments)},{"./ac-mvc-cid/CID":703}],703:[function(b,c,a){arguments[4][495][0].apply(a,arguments)
},{"ac-shared-instance":700}],704:[function(b,c,a){arguments[4][534][0].apply(a,arguments)
},{"./ac-mvc-view/View":705}],705:[function(b,c,a){arguments[4][535][0].apply(a,arguments)
},{"ac-classlist":630,"ac-dom-emitter":696,"ac-dom-nodes":699,"ac-mvc-cid":702,"ac-object":707}],706:[function(b,c,a){c.exports=b(26)
},{}],707:[function(b,c,a){arguments[4][27][0].apply(a,arguments)},{"./ac-object/clone":708,"./ac-object/create":709,"./ac-object/defaults":710,"./ac-object/extend":711,"./ac-object/getPrototypeOf":712,"./ac-object/isDate":713,"./ac-object/isEmpty":714,"./ac-object/isRegExp":715,"./ac-object/toQueryParameters":716}],708:[function(b,c,a){c.exports=b(28)
},{"./extend":711}],709:[function(b,c,a){c.exports=b(29)},{}],710:[function(b,c,a){c.exports=b(30)
},{"./extend":711}],711:[function(b,c,a){c.exports=b(31)},{}],712:[function(b,c,a){c.exports=b(32)
},{}],713:[function(b,c,a){c.exports=b(33)},{}],714:[function(b,c,a){c.exports=b(34)
},{}],715:[function(b,c,a){c.exports=b(35)},{}],716:[function(b,c,a){c.exports=b(36)
},{qs:706}],717:[function(b,c,a){arguments[4][58][0].apply(a,arguments)},{"./className/add":719,"ac-polyfills/Array/prototype.slice":725,"ac-polyfills/Element/prototype.classList":726}],718:[function(b,c,a){arguments[4][59][0].apply(a,arguments)
},{"./className/add":719,"./className/contains":720,"./className/remove":722}],719:[function(b,c,a){arguments[4][60][0].apply(a,arguments)
},{"./contains":720}],720:[function(b,c,a){c.exports=b(61)},{"./getTokenRegExp":721}],721:[function(b,c,a){c.exports=b(62)
},{}],722:[function(b,c,a){arguments[4][63][0].apply(a,arguments)},{"./contains":720,"./getTokenRegExp":721}],723:[function(b,c,a){arguments[4][64][0].apply(a,arguments)
},{"./className/contains":720,"ac-polyfills/Element/prototype.classList":726}],724:[function(b,c,a){arguments[4][65][0].apply(a,arguments)
},{"./add":717,"./contains":723,"./remove":727,"./toggle":728}],725:[function(b,c,a){c.exports=b(66)
},{}],726:[function(b,c,a){c.exports=b(67)},{}],727:[function(b,c,a){arguments[4][68][0].apply(a,arguments)
},{"./className/remove":722,"ac-polyfills/Array/prototype.slice":725,"ac-polyfills/Element/prototype.classList":726}],728:[function(b,c,a){arguments[4][69][0].apply(a,arguments)
},{"./className":718,"ac-polyfills/Element/prototype.classList":726}],729:[function(b,c,a){arguments[4][109][0].apply(a,arguments)
},{"./shared/getEventType":740,"./utils/addEventListener":744}],730:[function(b,c,a){arguments[4][110][0].apply(a,arguments)
},{"./shared/getEventType":740,"./utils/dispatchEvent":745}],731:[function(b,c,a){arguments[4][111][0].apply(a,arguments)
},{"./addEventListener":729,"./dispatchEvent":730,"./preventDefault":738,"./removeEventListener":739,"./stop":741,"./stopPropagation":742,"./target":743}],732:[function(b,c,a){c.exports=b(112)
},{}],733:[function(b,c,a){c.exports=b(113)},{"./shared/camelCasedEventTypes":734,"./shared/prefixHelper":735,"./shared/windowFallbackEventTypes":736,"./utils/eventTypeAvailable":737}],734:[function(b,c,a){c.exports=b(114)
},{}],735:[function(b,c,a){c.exports=b(115)},{}],736:[function(b,c,a){c.exports=b(116)
},{}],737:[function(b,c,a){c.exports=b(117)},{}],738:[function(b,c,a){c.exports=b(82)
},{}],739:[function(b,c,a){arguments[4][119][0].apply(a,arguments)},{"./shared/getEventType":740,"./utils/removeEventListener":746}],740:[function(b,c,a){arguments[4][120][0].apply(a,arguments)
},{"ac-prefixer/getEventType":733}],741:[function(b,c,a){c.exports=b(84)},{"./preventDefault":738,"./stopPropagation":742}],742:[function(b,c,a){c.exports=b(85)
},{}],743:[function(b,c,a){c.exports=b(123)},{}],744:[function(b,c,a){c.exports=b(124)
},{}],745:[function(b,c,a){c.exports=b(125)},{"ac-polyfills/CustomEvent":732}],746:[function(b,c,a){c.exports=b(126)
},{}],747:[function(b,c,a){arguments[4][54][0].apply(a,arguments)},{"./ac-browser/BrowserData":748,"./ac-browser/IE":749}],748:[function(b,c,a){c.exports=b(295)
},{"./data":750}],749:[function(b,c,a){c.exports=b(56)},{}],750:[function(b,c,a){c.exports=b(297)
},{}],751:[function(b,c,a){arguments[4][76][0].apply(a,arguments)},{"./ac-prefixer/Prefixer":752}],752:[function(b,c,a){c.exports=b(77)
},{"./Prefixer/camelCasedEvents":753}],753:[function(b,c,a){c.exports=b(78)},{}],754:[function(b,c,a){arguments[4][301][0].apply(a,arguments)
},{"./ac-feature/canvasAvailable":755,"./ac-feature/continuousScrollEventsAvailable":756,"./ac-feature/cookiesAvailable":757,"./ac-feature/cssLinearGradientAvailable":758,"./ac-feature/cssPropertyAvailable":759,"./ac-feature/helpers/memoize":761,"./ac-feature/isDesktop":762,"./ac-feature/isHandheld":763,"./ac-feature/isRetina":764,"./ac-feature/isTablet":765,"./ac-feature/localStorageAvailable":766,"./ac-feature/mediaElementsAvailable":767,"./ac-feature/sessionStorageAvailable":768,"./ac-feature/svgAvailable":769,"./ac-feature/threeDTransformsAvailable":770,"./ac-feature/touchAvailable":771,"./ac-feature/webGLAvailable":772}],755:[function(b,c,a){c.exports=b(302)
},{"./helpers/globals":760}],756:[function(b,c,a){arguments[4][303][0].apply(a,arguments)
},{"./touchAvailable":771,"ac-browser":747}],757:[function(b,c,a){c.exports=b(304)
},{"./helpers/globals":760}],758:[function(b,c,a){arguments[4][305][0].apply(a,arguments)
},{"./cssPropertyAvailable":759}],759:[function(b,c,a){arguments[4][306][0].apply(a,arguments)
},{"ac-prefixer":751}],760:[function(b,c,a){c.exports=b(307)},{}],761:[function(b,c,a){c.exports=b(308)
},{}],762:[function(b,c,a){arguments[4][309][0].apply(a,arguments)},{"./helpers/globals":760,"./touchAvailable":771}],763:[function(b,c,a){arguments[4][310][0].apply(a,arguments)
},{"./isDesktop":762,"./isTablet":765}],764:[function(b,c,a){c.exports=b(311)},{"./helpers/globals":760}],765:[function(b,c,a){arguments[4][312][0].apply(a,arguments)
},{"./helpers/globals":760,"./isDesktop":762}],766:[function(b,c,a){c.exports=b(313)
},{"./helpers/globals":760}],767:[function(b,c,a){c.exports=b(314)},{"./helpers/globals":760}],768:[function(b,c,a){c.exports=b(315)
},{"./helpers/globals":760}],769:[function(b,c,a){c.exports=b(316)},{"./helpers/globals":760}],770:[function(b,c,a){arguments[4][317][0].apply(a,arguments)
},{"./cssPropertyAvailable":759}],771:[function(b,c,a){c.exports=b(318)},{"./helpers/globals":760}],772:[function(b,c,a){c.exports=b(319)
},{"./helpers/globals":760}],773:[function(b,c,a){c.exports=b(26)},{}],774:[function(b,c,a){arguments[4][475][0].apply(a,arguments)
},{"./ac-string/isString":775,"./ac-string/queryParameters":776,"./ac-string/queryStringToObject":777,"./ac-string/supplant":778,"./ac-string/toCamelCase":779,"./ac-string/toQueryPair":780}],775:[function(b,c,a){c.exports=b(476)
},{}],776:[function(b,c,a){arguments[4][477][0].apply(a,arguments)},{"./queryStringToObject":777}],777:[function(b,c,a){c.exports=b(478)
},{qs:773}],778:[function(b,c,a){c.exports=b(479)},{}],779:[function(b,c,a){c.exports=b(480)
},{}],780:[function(b,c,a){c.exports=b(481)},{}],781:[function(c,f,b){var h=c("./view");
var g=c("./model");var d=c("./elements/element");var a={create:function(j,l){j=j||{};
l=l||{};j.elementClassPrefix=j.elementClassPrefix||"controls";l.elementClassPrefix=j.elementClassPrefix;
var k=this.Model(l);var i=this.View(Object.assign({},j,{model:k}));i.initialize();
return i},Model:g,View:h,element:d};f.exports=a},{"./elements/element":784,"./model":802,"./view":804}],782:[function(d,g,b){var c=d("ac-classlist");
var f=d("./element");var a=f.newType({className:"thirty-seconds-back-button",events:[{type:"click",callback:"thirySecondsBack"}],thirySecondsBack:function(){var i=this.player.getCurrentTime();
var h=i-30;this.player.setCurrentTime((h<0)?0:h)}});g.exports=a},{"./element":784,"ac-classlist":724}],783:[function(c,f,b){var d=c("./element");
var a=d.newType({className:"elapsed-time",_initialize:function(){this.options.model.on("change:elapsedTime",this._setElapsedTime,this)
},_setElapsedTime:function(g){this.el.innerHTML=g.value||g}});f.exports=a},{"./element":784}],784:[function(b,d,a){var c={className:"",create:function(h,g){var f=Object.create(this);
f.el=h;f.options=g;f.player=g.player;f._initialize();return f},events:[],newType:function(f){var g=Object.assign({},this,f);
return g},setElementAttributes:function(){this.elementAttributeString.forEach(function(f){var g;
if(typeof f==="string"){g=this._getLocalizationAttribute(f);this._setAttributeText(g)
}else{if(this[f.condition]()){g=this._getLocalizationAttribute(f.string);this._setAttributeText(g)
}}},this)},_getLocalizationAttribute:function(f){return this.options.model.get(f)
},_initialize:function(){this.elementAttributeString=this.elementAttributeString||[];
this.setElementAttributes()},_setAttributeText:function(f){["value","aria-label"].forEach(function(g){this.el.setAttribute(g,f)
},this)}};d.exports=c},{}],785:[function(b,a,d){var c=b("ac-classlist");var g=b("ac-fullscreen");
var i=b("ac-feature");var f=b("./element");var j=!i.isDesktop();var h=f.newType({className:"full-screen-button",events:[{type:"click",callback:"_toggleFullscreen"}],_exitFullscreen:function(k){g.exitFullscreen(k)
},_getFullScreenElement:function(){var k=false;if(this._isNotDesktop()){k=this.options.player.getMediaElement()
}return k||this.options.fullScreenElement||this.options.player.getMediaElement()
},_isFullScreen:function(k){return this._supportsFullscreen(k)},_initialize:function(){this.isFullScreen=false;
if(this._supportsFullscreen(this._getFullScreenElement())){this._removeFullscreenUnsupportedClass();
this._listenForFullscreenChange()}},_isNotDesktop:function(){return j},_listenForFullscreenChange:function(){g.on("enterfullscreen",this._onEnterFullScreen,this);
g.on("exitfullscreen",this._onExitFullScreen,this)},_onEnterFullScreen:function(){this.isFullScreen=true;
c.add(this.el,"is-fullscreen")},_onExitFullScreen:function(){this.isFullScreen=false;
c.remove(this.el,"is-fullscreen")},_requestFullscreen:function(k){g.requestFullscreen(k)
},_removeFullscreenUnsupportedClass:function(){c.remove(this.el,"fullscreen-unsupported")
},_supportsFullscreen:function(k){return g.fullscreenEnabled(k)},_toggleFullscreen:function(){var k=this._getFullScreenElement();
if(this.isFullScreen){this._exitFullscreen(k)}else{this._requestFullscreen(k)}}});
a.exports=h},{"./element":784,"ac-classlist":724,"ac-feature":754,"ac-fullscreen":320}],786:[function(b,d,a){var c=b("./element");
var f=c.newType({className:"max-volume-button",events:[{type:"click",callback:"maxVolume"}],maxVolume:function(){this.options.player.setMuted(false);
this.options.player.setVolume(1)}});d.exports=f},{"./element":784}],787:[function(c,f,b){var d=c("./element");
var a=d.newType({className:"min-volume-button",events:[{type:"click",callback:"minVolume"}],minVolume:function(){this.options.player.setMuted(false);
this.options.player.setVolume(0)}});f.exports=a},{"./element":784}],788:[function(c,f,b){var d=c("./element");
var a=d.newType({className:"mute-volume-button",events:[{type:"click",callback:"mute"}],mute:function(){this.options.player.setMuted(true)
}});f.exports=a},{"./element":784}],789:[function(b,d,a){var c=b("./element");var f=c.newType({className:"toggle-mute-volume-button",events:[{type:"click",callback:"toggleMutedVolume"}],toggleMutedVolume:function(){var g=this.options.player.getMuted()?false:true;
this.options.player.setMuted(g)}});d.exports=f},{"./element":784}],790:[function(b,d,a){var c=b("./element");
var f=c.newType({className:"pause-button",events:[{type:"click",callback:"pause"}],pause:function(){this.options.player.pause()
}});d.exports=f},{"./element":784}],791:[function(b,d,a){var c=b("./element");var f=c.newType({className:"play-button",events:[{type:"click",callback:"play"}],play:function(){this.options.player.play()
}});d.exports=f},{"./element":784}],792:[function(c,f,a){var b=c("ac-classlist");
var d=c("./element");var g=d.newType({className:"play-pause-button",events:[{type:"click",callback:"playPauseToggle"}],elementAttributeString:[{condition:"playerIsPlaying",string:"pause"},{condition:"playerIsPaused",string:"play"}],playerIsPlaying:function(){return !this.player.getPaused()
},playerIsPaused:function(){return this.player.getPaused()},playPauseToggle:function(){if(this.player.getPaused()){this.player.play()
}else{this.player.pause()}},_addEventListeners:function(){this.player.on("play pause",this._handleStateChange,this)
},_handleStateChange:function(){this._toggleIsPlayingClass();this.setElementAttributes()
},_initialize:function(){d._initialize.call(this);this._addEventListeners();this._handleStateChange()
},_toggleIsPlayingClass:function(){var h=this.player.getPaused()?"remove":"add";
b[h](this.el,"is-playing")}});f.exports=g},{"./element":784,"ac-classlist":724}],793:[function(f,d,i){var j=f("./element");
var h=f("ac-classlist");var a=f("ac-dom-traversal");var k=f("ac-dom-events");var l=f("ac-slider");
var b=f("../mixins/get-model-attribute");var c=f("../mixins/cursor-pointer");var g=j.newType(Object.assign({className:"progress-indicator",_bindSetupElement:function(){return this._setupElement.bind(this)
},_getCurrentTime:function(m){return(m&&m.value)?m.value:this.polyfilledEl.getValue()
},_getSliderInstance:function(){return new l.Slider(this.el,{template:'<div class="ac-slider-runnable-track">\n\t<div class="ac-slider-inner-track">\n\t\t<div class="ac-slider-thumb">\n\t\t\t<div class="ac-slider-thumb-background"></div>\n\t\t\t<div class="ac-slider-scrubbed"></div>\n\t\t</div>\n\t</div>\n</div>\n<input class="ac-slider-input-type-range" type="range" value="0" step="1" min="0" max="1"  />',min:0,max:+this.options.model.get("duration"),step:isNaN(+this.el.getAttribute("step"))?this.el.getAttribute("step"):+this.el.getAttribute("step"),value:+this.el.getAttribute("value")})
},_handleProgressIndicatorChange:function(m){this.options.model.set({timeupdate:this._getCurrentTime(m)})
},_initialize:function(){j._initialize.call(this);this._setupElement=this._bindSetupElement();
this.getModelAttribute("duration").then(this._setupElement)},_onGrab:function(){this.options.model.set({ignoreTimeupdate:true});
this.options.player.off("timeupdate",this._setIndicatorValue);this.polyfilledEl.on("change",this._setModelValue,this);
this.forceCursorPointer()},_onRelease:function(){this._setPlayerValue();this.options.model.set({ignoreTimeupdate:false});
this.options.player.on("timeupdate",this._setIndicatorValue,this);this.polyfilledEl.off("change",this._setModelValue);
this.disableForcedCursorPointer()},_onPlayerDurationChange:function(){if(!isNaN(this.options.player.getDuration())){this.polyfilledEl.setMax(this.options.player.getDuration())
}},_polyfillRangeInput:function(){this.polyfilledEl=this._getSliderInstance();this.thumbEl=a.querySelector(".ac-slider-thumb",this.el);
this.scrubbedEl=a.querySelector(".ac-slider-scrubbed",this.el)},_setIndicatorValue:function(){var m=this.options.player.getCurrentTime();
this.polyfilledEl.setValue(m)},_setPlayerValue:function(){var m=this.polyfilledEl.getValue();
this.options.player.setCurrentTime(m)},_setModelValue:function(){var m=this.polyfilledEl.getValue();
this.options.model.set({timeupdate:m})},_setupElement:function(m){this.el.setAttribute("max",m);
this._polyfillRangeInput();this.el.setAttribute("aria-valuemax",this.polyfilledEl.getMax());
this.polyfilledEl.on("change:model:max",function(){this.el.setAttribute("aria-valuemax",this.polyfilledEl.getMax())
},this);this.polyfilledEl.on("change:model:value",function(){this.el.setAttribute("aria-valuenow",this.polyfilledEl.getValue())
},this);this.el.setAttribute("aria-valuemin",this.polyfilledEl.getMin());this.polyfilledEl.on("change:model:min",function(){this.el.setAttribute("aria-valuemin",this.polyfilledEl.getMin())
},this);this.options.player.on("timeupdate",this._setIndicatorValue,this);this.polyfilledEl.on("grab",this._onGrab,this);
this.polyfilledEl.on("release",this._onRelease,this);this.options.player.on("durationchange",this._onPlayerDurationChange,this)
}},b,c));d.exports=g},{"../mixins/cursor-pointer":800,"../mixins/get-model-attribute":801,"./element":784,"ac-classlist":724,"ac-dom-events":731,"ac-dom-traversal":183,"ac-slider":1066}],794:[function(c,g,a){var f=c("./element");
var b=c("../mixins/get-model-attribute");var d=f.newType(Object.assign({},{className:"remaining-time",_bindUpdateRemainingTimeIndicator:function(){return this._updateRemainingTimeIndicator.bind(this)
},_initialize:function(){this._updateRemainingTimeIndicator=this._bindUpdateRemainingTimeIndicator();
this.options.model.on("change:remainingTime",this._updateRemainingTimeIndicator,this);
this.getModelAttribute("remainingTime").then(this._updateRemainingTimeIndicator)
},_updateRemainingTimeIndicator:function(h){this.el.innerHTML=h.value||h}},b));
g.exports=d},{"../mixins/get-model-attribute":801,"./element":784}],795:[function(c,d,b){var a=c("./text-tracks");
var f=a.newType({className:"text-tracks-off-button",events:[{type:"click",callback:"textTracksOff"}],elementAttributeString:["captionsturnedoff"]});
d.exports=f},{"./text-tracks":798}],796:[function(d,f,b){var a=d("./text-tracks");
var c=a.newType({className:"text-tracks-on-button",events:[{type:"click",callback:"textTracksOn"}],elementAttributeString:["captionsturnedon"]});
f.exports=c},{"./text-tracks":798}],797:[function(d,f,b){var c=d("ac-classlist");
var a=d("./text-tracks");var g=a.newType({className:"text-tracks-toggle-button",events:[{type:"click",callback:"textTracksToggle"}],textTracksToggle:function(){var h=this._getTextTrackModeAndIndex();
var i=h.get("mode");if(i==="showing"){this.textTracksOff()}else{this.textTracksOn()
}},elementAttributeString:[{condition:"textTracksAreShowing",string:"captionsturnedoff"},{condition:"textTracksAreDisabled",string:"captionsturnedon"}],textTracksAreShowing:function(){return this.player.getVisibleTextTracks().models.length>0
},textTracksAreDisabled:function(){return this.player.getVisibleTextTracks().models.length===0
},_addEventListeners:function(){a._addEventListeners.call(this);this.player.on("texttrackshow texttrackhide",this.setElementAttributes,this)
}});f.exports=g},{"./text-tracks":798,"ac-classlist":724}],798:[function(f,h,c){var d=f("ac-classlist");
var g=f("./element");var a={on:"showing",off:"disabled"};var i={visible:"text-tracks-visible",none:"no-text-tracks"};
var b=g.newType({onTextTracksVisible:function(){d.add(this.el,i.visible)},onTextTracksHidden:function(){d.remove(this.el,i.visible)
},textTracksOn:function(){var j=this._getTextTrackModeAndIndex();j.show()},textTracksOff:function(){var j=this._getTextTrackModeAndIndex();
j.hide()},_addEventListeners:function(){var j=this._getTextTrackModeAndIndex();
this.player.on("texttrackshow",this.onTextTracksVisible,this);this.player.on("texttrackhide",this.onTextTracksHidden,this);
this.options.model.on("change:localization",this.setElementAttributes,this)},_addTextTrackClass:function(){var j=this.player.getEnabledTextTracks().models;
if(j.length){this._removeNoTextTracksClass();if(this.player.getVisibleTextTracks().models.length){this.onTextTracksVisible()
}else{this.onTextTracksHidden()}}else{this._addNoTextTracksClass()}},_addNoTextTracksClass:function(){d.add(this.el,i.none)
},_getTextTrackModeAndIndex:function(){var j=this.player.getVisibleTextTracks().at(0);
if(!j){j=this.player.getEnabledTextTracks().at(0)}return j},_initialize:function(){g._initialize.call(this);
this._addTextTrackClass();this._addEventListeners()},_removeNoTextTracksClass:function(){d.remove(this.el,i.none)
},_toggleTextTracksVisibleClass:function(j){var k=j?"onTextTracksHidden":"onTextTracksVisible";
this[k]()},_toggleNoTextTracksClass:function(j){var k=j?"_removeNoTextTracksClass":"_addNoTextTracksClass";
this[k]()}});h.exports=b},{"./element":784,"ac-classlist":724}],799:[function(f,d,h){var i=f("./element");
var g=f("ac-classlist");var j=f("ac-dom-events");var k=f("ac-slider");var a=f("ac-dom-traversal");
var b=f("../mixins/get-model-attribute");var c=f("../mixins/cursor-pointer");var l=i.newType(Object.assign({className:"volume-level-indicator",events:[{type:"change",callback:"handleVolumeIndicatorChange"}],handleVolumeIndicatorChange:function(n){this._unmute();
var m=this._getVolume(n);this._setVolume(m)},ignoreVolumechange:function(m){this.options.model.set({ignoreVolumechange:true});
this._stopListeningForVolumechange();this.forceCursorPointer()},setVolumeOnMove:function(){this._setVolume(this._getVolume())
},_bindResumeVolumechange:function(){return this._resumeVolumechange.bind(this)
},_bindSetupElement:function(){return this._setupElement.bind(this)},_bindHandleVolumeIndicatorChange:function(){return this.handleVolumeIndicatorChange.bind(this)
},_getVolume:function(m){return(m&&m.value)?m.value:this.polyfilledEl.getValue()
},_getSliderInstance:function(){var m=this.options.player.getVolume();if(this.options.player.getMuted()===true){m=0
}return new k.Slider(this.el,{template:'<div class="ac-slider-runnable-track">\n\t<div class="ac-slider-thumb">\n\t\t<div class="ac-slider-thumb-background"></div>\n\t</div>\n\t<div class="ac-slider-inner-track">\n\t\t<div class="ac-slider-scrubbed"></div>\n\t</div>\n</div>\n<input class="ac-slider-input-type-range" type="range" value="0" step="1" min="0" max="1"  />',min:0,max:1,step:+this.el.getAttribute("step"),value:m})
},_initialize:function(){i._initialize.call(this);this.handleVolumeIndicatorChange=this._bindHandleVolumeIndicatorChange();
this._resumeVolumechange=this._bindResumeVolumechange();this._setupElement=this._bindSetupElement();
this.getModelAttribute("volume").then(this._setupElement)},_listenForVolumechange:function(m){this.options.model.on("change:volume",this._updateVolumeIndicator,this);
this.polyfilledEl.off("release",this._resumeVolumechange);this.polyfilledEl.off("change",this.handleVolumeIndicatorChange);
this.polyfilledEl.on("grab",this.ignoreVolumechange,this)},_polyfillRangeInput:function(){this.polyfilledEl=this._getSliderInstance();
this.scrubbed=a.querySelector(".ac-slider-scrubbed",this.el);this.thumb=a.querySelector(".ac-slider-thumb",this.el);
this.polyfilledEl.on("change",function(){this.scrubbed.style.marginLeft=parseInt(this.thumb.style.left,10)+(((this.thumb.offsetWidth/2)/this.el.offsetWidth)*100)+"%"
},this);this.polyfilledEl.trigger("change",this.polyfilledEl.getValue())},_resumeVolumechange:function(m){this.options.model.set({ignoreVolumechange:false});
this._listenForVolumechange();this._setVolume(this._getVolume());this.disableForcedCursorPointer()
},_setVolume:function(m){this._unmute();this.options.player.setVolume(m)},_setupElement:function(m){this.el.setAttribute("value",m);
this._polyfillRangeInput();this._listenForVolumechange()},_stopListeningForVolumechange:function(){this.options.model.off("change:volume",this._updateVolumeIndicator,this);
this.polyfilledEl.on("release",this._resumeVolumechange,this);this.polyfilledEl.on("change",this.handleVolumeIndicatorChange,this);
this.polyfilledEl.off("grab",this.ignoreVolumechange)},_toggleVolumeLevelIndicator:function(m){g.toggle(this.el,"is-visible")
},_updateVolumeIndicator:function(n){var m=(n&&n.value!==null)?n.value:this.options.player.getVolume();
this.polyfilledEl.setValue(m)},_unmute:function(){if(this.options.player.getMuted()){this.options.player.setMuted(false)
}}},b,c));d.exports=l},{"../mixins/cursor-pointer":800,"../mixins/get-model-attribute":801,"./element":784,"ac-classlist":724,"ac-dom-events":731,"ac-dom-traversal":183,"ac-slider":1066}],800:[function(c,d,a){var b=c("ac-classlist");
var f=c("ac-dom-events");var g="cursor-pointer";d.exports={disableForcedCursorPointer:function(){b.remove(document.body,g);
this.onSelectStartResumeDefault()},forceCursorPointer:function(){b.add(document.body,g);
this.onSelectStartPreventDefault()},onSelectStartResumeDefault:function(){f.removeEventListener(document,"selectstart",this.preventDefault)
},onSelectStartPreventDefault:function(){f.addEventListener(document,"selectstart",this.preventDefault)
},preventDefault:function(h){f.preventDefault(h)}}},{"ac-classlist":724,"ac-dom-events":731}],801:[function(b,c,a){c.exports={getModelAttribute:function(d){return new Promise(function(g,f){if(this.options.model.has(d)){g(this.options.model.get(d))
}else{this.options.model.once("change:"+d,function(h){g(h.value)},this)}}.bind(this))
}}},{}],802:[function(c,d,a){var b=c("ac-mvc-model").Model;var h=c("ac-video-localization").localization;
var g=function(i){if(!(this instanceof g)){return new g(i)}b.apply(this,arguments);
this.initialize()};g.prototype=Object.create(b.prototype);var f=g.prototype;Object.assign(f,{defaultAttributes:{backthirtyseconds:"Back 30 Seconds",playpause:"Play/Pause",play:"Play",pause:"Pause",togglemutevolume:"Toggle Mute Volume",mutevolume:"Mute Volume",minvolume:"Min Volume",adjustvolume:"Adjust Volume",fastreverse:"Fast Reverse",fastforward:"Fast Forward",fullvolume:"Full Volume",fullscreen:"Full Screen",captionscontrol:"Closed Captions",captionsturnedon:"Closed Captions On",captionsturnedoff:"Closed Captions Off",subtitlescontrol:"Subtitles",subtitlesturnedon:"Subtitles On",subtitlesturnedoff:"Subtitles Off",sizescontrol:"Video Size",downloadcontrol:"Download Video",small:"Small",medium:"Medium",large:"Large",hd:"HD",ipod:"iPod/iPhone",mb:"MB",gb:"GB",tb:"TB",downloadquicktimetitle:"Get QuickTime.",downloadquicktimetext:"Download QuickTime to view this video. QuickTime is free for Mac + PC.",downloadquicktimebutton:"Download",downloadquicktimeurl:"http://www.apple.com/quicktime/download/",elapsed:"elapsed",remaining:"remaining"},getLocalizationPromise:function(){return h.create()
},initialize:function(){this.localize=this._bindLocalize();this.getLocalizationPromise().then(this.localize)
},localize:function(i){this.set(i.attributes);this.trigger("change:localization")
},_bindLocalize:function(){return this.localize.bind(this)}});d.exports=g},{"ac-mvc-model":628,"ac-video-localization":509}],803:[function(c,d,a){var b=c("ac-string");
var f={addLeadingZero:function(h,g){g=g||2;if(h<10||g>2){h=String(h);while(h.length<g){h="0"+h
}}return h},formatTime:function(j,g){if(isNaN(j)){return"00:00"}j=this.splitTime(Math.floor(j),function(k){return this.addLeadingZero(k,g)
}.bind(this));var h="{PN}{minutes}:{seconds}";var i=b.supplant(h,{PN:j.negativeModifier,minutes:j.minutes,seconds:j.seconds});
return i},splitTime:function(j,g){g=g||function(k){return k};var i={negativeModifier:"",minutes:0,seconds:0};
if(isNaN(j)){return i}i.negativeModifier=(j<0)?"-":"";j=Math.abs(j);i.minutes=Math.floor(j/60);
i.seconds=(j%60);for(var h in i){if(typeof i[h]!=="number"){continue}i[h]=g(i[h])
}return i}};d.exports=f},{"ac-string":774}],804:[function(g,d,j){var b=g("ac-dom-traversal");
var h=g("ac-string");var i=g("ac-classlist");var l=g("ac-mvc-view").View;var f=g("./time");
var a={"back-30-seconds-button":g("./elements/back-30-seconds-button"),"elapsed-time-indicator":g("./elements/elapsed-time-indicator"),element:g("./elements/element"),"full-screen-button":g("./elements/full-screen-button"),"max-volume-button":g("./elements/max-volume-button"),"min-volume-button":g("./elements/min-volume-button"),"mute-button":g("./elements/mute-button"),"mute-toggle-button":g("./elements/mute-toggle-button"),"pause-button":g("./elements/pause-button"),"play-button":g("./elements/play-button"),"play-pause-button":g("./elements/play-pause-button"),"progress-indicator":g("./elements/progress-indicator"),"remaining-time-indicator":g("./elements/remaining-time-indicator"),"text-tracks-off-button":g("./elements/text-tracks-off-button"),"text-tracks-on-button":g("./elements/text-tracks-on-button"),"text-tracks-toggle-button":g("./elements/text-tracks-toggle-button"),"text-tracks":g("./elements/text-tracks"),"volume-level-indicator":g("./elements/volume-level-indicator")};
var c=function(m){if(!(this instanceof c)){return new c(m)}l.apply(this,arguments);
this.elements=[]};c.prototype=Object.create(l.prototype);var k=c.prototype;Object.assign(k,{className:"ac-video-controls",initialize:function(){this._addInactiveClasses();
if(this.options.player){this._onPlayerReady=this._bindOnPlayerReady();this.playerIsReady(this.options.player).then(this._onPlayerReady)
}this.options.model.once("change:localization",this.render,this);this.options.model.on("change:timeupdate",this._onModelTimeUpdate,this)
},playerIsReady:function(o){var m=o.getReadyState();var n=o.getPreload();return new Promise(function(q,p){if(m===4){q()
}else{if(n==="metadata"){if(m===3){q()}else{o.on("loadedmetadata",q)}}else{o.on("canplay",q)
}}})},render:function(){this.el.innerHTML=this._getParsedTemplate(this.model.attributes);
i.add(this.el,this.className);i.add(this.el,this._getSkin());if(this._getSkin()===this._defaultSkin){this.el.setAttribute("data-hires","false")
}this._onRender().resolve()},_addInactiveClasses:function(){i.add(this.el,"inactive")
},_bindSetupElements:function(){return this._setupElements.bind(this)},_bindOnPlayerReady:function(){return this._onPlayerReady.bind(this)
},_currentTimeIsWholeNumber:function(m){m=Math.floor(m);if(m===0){return true}if(m!==this._previousCurrentTime){this._previousCurrentTime=m;
return true}},_defaultTemplate:'<div class="left row-1">\n\t<input type="button" class="{elementClassPrefix}-min-volume-button {elementClassPrefix}-button" value="{minvolume}" aria-label="{minvolume}" role="button" tabindex="0">\n\t<div class="{elementClassPrefix}-volume-level-indicator" max="1" step="0.09090909090909091"></div>\n\t<input type="button" class="{elementClassPrefix}-max-volume-button {elementClassPrefix}-button" value="{fullvolume}" aria-label="{fullvolume}" role="button" tabindex="0">\n</div>\n\n<div class="center row-1">\n\t<input type="button" class="{elementClassPrefix}-play-pause-button {elementClassPrefix}-button" value="{playpause}" aria-label="{playpause}" role="button" tabindex="0">\n</div>\n\n<div class="right row-1">\n\t<input type="button" class="{elementClassPrefix}-text-tracks-toggle-button {elementClassPrefix}-button no-text-tracks" value="{textTrackscontrol}" aria-label="{textTrackscontrol}" role="button" tabindex="0">\n\t<input type="button" class="{elementClassPrefix}-full-screen-button {elementClassPrefix}-button fullscreen-unsupported" value="{fullscreen}" aria-label="{fullscreen}" role="button" tabindex="0">\n</div>\n\n<div class="left row-2">\n\t<div class="{elementClassPrefix}-elapsed-time-indicator">\n\t\t<span class="label">{elapsed}</span>\n\t\t<span class="{elementClassPrefix}-elapsed-time" aria-label="{elapsed}" tabindex="0" role="timer" aria-value="00:00">00:00</span>\n\t</div>\n</div>\n\n<div class="center row-2">\n\t<div class="{elementClassPrefix}-buffered-indicator"></div>\n\t<div class="{elementClassPrefix}-progress-indicator" aria-label="progress-indicator" role="progressbar" precision="float" min="0" max="{max}" step="auto" value="0" tabindex="0" aria-valuemax="{max}" aria-valuemin="{min}" aria-valuenow="{value}"></div>\n</div>\n\n<div class="right row-2">\n\t<div class="{elementClassPrefix}-remaining-time-indicator">\n\t<span class="label">{remaining}</span>\n\t<span class="{elementClassPrefix}-remaining-time" aria-label="{remaining}" tabindex="0" role="timer" aria-value="-00:00">-00:00</span>\n</div>\n</div>\n\n<div class="{elementClassPrefix}-inactive-container"></div>',_defaultSkin:"control-bar-skin-default",_getPromise:function(){var n;
var m;var o;o=new Promise(function(q,p){n=q;m=p});o.resolve=n;o.reject=m;return o
},_getSkin:function(){return this.options.skin||this._defaultSkin},_getCurrentTime:function(m){return(m&&m.value)?m.value:this.options.player.getCurrentTime()
},_getParsedTemplate:function(n){var m=this.options.template||this._defaultTemplate;
return h.supplant(m,n)},_listenToModelVolumechange:function(){this.options.player.off("volumechange",this._onVolumeChange);
this.options.model.on("change:volume",this._onVolumeChange,this)},_listenToPlayerForVolumechange:function(){this.options.player.on("volumechange",this._onVolumeChange,this);
this.options.model.off("change:volume",this._onVolumeChange);this.options.player.setVolume(this.options.model.get("volume"))
},_onRender:function(){if(!this._onRenderPromise){this._onRenderPromise=this._getPromise()
}return this._onRenderPromise},_onModelTimeUpdate:function(m){if(this._currentTimeIsWholeNumber(m.value)){this._setModelRemainingAndElapsedTime(m.value)
}},_onPlayerTimeUpdate:function(){if(!this.options.model.get("ignoreTimeupdate")){var m=this.options.player.getCurrentTime();
this.options.model.set({timeupdate:m})}},_onPlayerReady:function(){this._setupElements=this._bindSetupElements();
this._onRender().then(this._setupElements);this.options.player.on("durationchange",this._onPlayerDurationChange,this);
this._onVolumeChange();this._onTimeupdate();this._removeInactiveClasses();this._onPlayerDurationChange();
this.options.player.on("timeupdate",this._onPlayerTimeUpdate,this);this._onVolumeChangeEvents()
},_onVolumeChangeEvents:function(){this.options.model.on("change:ignoreVolumechange",this._onModelIgnoreVolumechange,this);
this.options.player.on("volumechange loadedmetadata",this._onVolumeChange,this)
},_onVolumeChange:function(n){n=n||{};var m=n.value||this.options.player.getVolume();
this.options.model.set({volume:m})},_onTimeupdate:function(n){var m=this._getCurrentTime(n);
if(this._currentTimeIsWholeNumber(m)){this._setModelRemainingAndElapsedTime(m)}},_onModelIgnoreVolumechange:function(m){if(m.value){this._listenToModelVolumechange()
}else{this._listenToPlayerForVolumechange()}},_onPlayerDurationChange:function(){this.options.model.set({duration:this.options.player.getDuration()});
this._onTimeupdate()},_removeInactiveClasses:function(){i.remove(this.el,"inactive")
},_setupElements:function(){var m;for(var o in a){try{if(o.match(/^element$|^time$|^text-tracks$/)){continue
}m=b.querySelector("."+this.options.elementClassPrefix+"-"+a[o].className,this.el);
if(m){m=a[o].create(m,this.options);this.elements.push(m);if(m.events){this._setupElementEvents(m)
}}}catch(n){console.log("ERROR: ",o,n)}}},_setModelRemainingAndElapsedTime:function(o){var p=this.options.player.getDuration();
var n=f.formatTime(o-Math.floor(p));var m=f.formatTime(o);this.options.model.set({remainingTime:n,elapsedTime:m})
},_setupElementEvents:function(p){for(var o=0,m=p.events.length,n,r,q;o<m;o++){n=p.events[o];
r=p[n.callback];q=n.delegate||"."+this.options.elementClassPrefix+"-"+p.className;
this.on(n.type,q,r,p)}}});d.exports=c},{"./elements/back-30-seconds-button":782,"./elements/elapsed-time-indicator":783,"./elements/element":784,"./elements/full-screen-button":785,"./elements/max-volume-button":786,"./elements/min-volume-button":787,"./elements/mute-button":788,"./elements/mute-toggle-button":789,"./elements/pause-button":790,"./elements/play-button":791,"./elements/play-pause-button":792,"./elements/progress-indicator":793,"./elements/remaining-time-indicator":794,"./elements/text-tracks":798,"./elements/text-tracks-off-button":795,"./elements/text-tracks-on-button":796,"./elements/text-tracks-toggle-button":797,"./elements/volume-level-indicator":799,"./time":803,"ac-classlist":724,"ac-dom-traversal":183,"ac-mvc-view":704,"ac-string":774}],805:[function(b,c,a){c.exports={path:b("./ac-path/path")}
},{"./ac-path/path":806}],806:[function(b,c,a){function d(f){return d.parse(f)}d.basename=function(g,f){d._assertStr(g);
var i;var h=g.match(/[^/]*$/)[0];if(f){i=h.match(new RegExp("(.*)"+f+"$"));if(i){h=i[1]
}}return h};d.dirname=function(g){d._assertStr(g);var f=g.match(/^(.*)\b\/|.*/);
return f[1]||g};d.extname=function(f){d._assertStr(f);var g=f.match(/\.[^.]*$/);
return g?g[0]:""};d.filename=function(f){d._assertStr(f);return d.basename(f,d.extname(f))
};d.format=function(g,h){d._assertObj(g);var f=(g.dirname)?g.dirname+"/":"";if(g.basename){f+=g.basename
}else{if(g.filename){f+=g.filename;if(g.extname){f+=g.extname}}}if(h){if(typeof h==="string"){f+="?"+h
}else{if(Object.prototype.toString.call(h)===Object.prototype.toString.call([])){f+="?"+h.join("&")
}}}return f};d.isAbsolute=function(f){d._assertStr(f);return(!!f.match(/(^http(s?))/))
};d.isRootRelative=function(f){d._assertStr(f);return !!f.match(/^\/(?!\/)/)};d.parse=function(f){d._assertStr(f);
return{dirname:d.dirname(f),basename:d.basename(f),filename:d.filename(f),extname:d.extname(f)}
};d._assertStr=function(f){d._assertType(f,"string")};d._assertObj=function(f){d._assertType(f,"object")
};d._assertType=function(h,f){var g=typeof h;if(g==="undefined"||g!==f){throw new TypeError("path param must be of type "+f)
}};c.exports=d},{}],807:[function(b,c,a){c.exports={cname:b("./ac-cname/cname")}
},{"./ac-cname/cname":808}],808:[function(c,d,a){var f=c("ac-path").path;function b(g){return b.addPrefix(g)
}b._prefix=(function(){var g="http://images.apple.com/global/elements/blank.gif";return g.replace(/global\/.*/,"")
}());b.addPrefix=function(g){if(f.isAbsolute(g)){return g}b._assertRootRelative(g);
g=b._prefix+g.replace(/^\//,"");g=g.replace(/(^.+)(\/105\/)/,"$1/");return g};b.formatUrl=function(j,g,l,k){var i=f.format({dirname:j,filename:g,extname:l},k);
if(f.isAbsolute(i)){return i}b._assertRootRelative(j);var h=b.addPrefix(i);return h
};b._assertRootRelative=function(g){if(!f.isRootRelative(g)){throw new URIError("Only root-relative paths are currently supported")
}};d.exports=b},{"ac-path":805}],809:[function(b,c,a){var g=b("./helpers/globals");
var f=b("ac-function/once");var d=function(){var h=g.getDocument();var i=h.createElement("canvas");
return !!(typeof i.getContext==="function"&&i.getContext("2d"))};c.exports=f(d);
c.exports.original=d},{"./helpers/globals":817,"ac-function/once":831}],810:[function(c,d,b){var h=c("ac-browser");
var a=c("./touchAvailable").original;var f=c("ac-function/once");function g(){return(!a()||(h.os==="iOS"&&h.version>=8)||h.name==="Chrome")
}d.exports=f(g);d.exports.original=g},{"./touchAvailable":848,"ac-browser":826,"ac-function/once":831}],811:[function(c,d,b){var g=c("./helpers/globals");
var f=c("ac-function/once");function a(){var k=false;var h=g.getDocument();var j=g.getNavigator();
try{if("cookie" in h&&!!j.cookieEnabled){h.cookie="ac_feature_cookie=1";k=(h.cookie.indexOf("ac_feature_cookie")!==-1);
h.cookie="ac_feature_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"}}catch(i){}return k
}d.exports=f(a);d.exports.original=a},{"./helpers/globals":817,"ac-function/once":831}],812:[function(c,d,b){var g=c("ac-prefixer/getStyleValue");
var f=c("ac-function/once");function a(){var h=["linear-gradient(to bottom right, #9f9, white)","linear-gradient(top left, #9f9, white)","gradient(linear, left top, right bottom, from(#9f9), to(white))"];
return h.some(function(i){return !!g("background-image",i)})}d.exports=f(a);d.exports.original=a
},{"ac-function/once":831,"ac-prefixer/getStyleValue":835}],813:[function(c,d,b){var g=c("ac-prefixer/getStyleValue");
var f=c("ac-prefixer/getStyleProperty");var h=c("ac-function/memoize");function a(j,i){if(typeof i!=="undefined"){return !!g(j,i)
}else{return !!f(j)}}d.exports=h(a);d.exports.original=a},{"ac-function/memoize":830,"ac-prefixer/getStyleProperty":834,"ac-prefixer/getStyleValue":835}],814:[function(b,c,a){var f=b("ac-prefixer/getStyleValue");
var d=b("ac-function/once");function g(){return !!f("margin","1vw 1vh")}c.exports=d(g);
c.exports.original=g},{"ac-function/once":831,"ac-prefixer/getStyleValue":835}],815:[function(b,d,a){var f=b("./helpers/globals");
var g=b("ac-function/memoize");function c(h,j){var i=f.getDocument();var k;j=j||"div";
k=i.createElement(j);return(h in k)}d.exports=g(c);d.exports.original=c},{"./helpers/globals":817,"ac-function/memoize":830}],816:[function(c,f,b){var a=c("ac-prefixer/getEventType");
var g=c("ac-function/memoize");function d(i,h){return !!a(i,h)}f.exports=g(d);f.exports.original=d
},{"ac-function/memoize":830,"ac-prefixer/getEventType":833}],817:[function(b,c,a){c.exports=b(307)
},{}],818:[function(b,c,a){c.exports={canvasAvailable:b("./canvasAvailable"),continuousScrollEventsAvailable:b("./continuousScrollEventsAvailable"),cookiesAvailable:b("./cookiesAvailable"),cssLinearGradientAvailable:b("./cssLinearGradientAvailable"),cssPropertyAvailable:b("./cssPropertyAvailable"),cssViewportUnitsAvailable:b("./cssViewportUnitsAvailable"),elementAttributeAvailable:b("./elementAttributeAvailable"),eventTypeAvailable:b("./eventTypeAvailable"),isDesktop:b("./isDesktop"),isHandheld:b("./isHandheld"),isRetina:b("./isRetina"),isTablet:b("./isTablet"),localStorageAvailable:b("./localStorageAvailable"),mediaElementsAvailable:b("./mediaElementsAvailable"),mediaQueriesAvailable:b("./mediaQueriesAvailable"),sessionStorageAvailable:b("./sessionStorageAvailable"),svgAvailable:b("./svgAvailable"),threeDTransformsAvailable:b("./threeDTransformsAvailable"),touchAvailable:b("./touchAvailable"),webGLAvailable:b("./webGLAvailable")}
},{"./canvasAvailable":809,"./continuousScrollEventsAvailable":810,"./cookiesAvailable":811,"./cssLinearGradientAvailable":812,"./cssPropertyAvailable":813,"./cssViewportUnitsAvailable":814,"./elementAttributeAvailable":815,"./eventTypeAvailable":816,"./isDesktop":819,"./isHandheld":820,"./isRetina":821,"./isTablet":822,"./localStorageAvailable":823,"./mediaElementsAvailable":824,"./mediaQueriesAvailable":825,"./sessionStorageAvailable":845,"./svgAvailable":846,"./threeDTransformsAvailable":847,"./touchAvailable":848,"./webGLAvailable":849}],819:[function(d,f,b){var a=d("./touchAvailable").original;
var h=d("./helpers/globals");var g=d("ac-function/once");function c(){var i=h.getWindow();
return(!a()&&!i.orientation)}f.exports=g(c);f.exports.original=c},{"./helpers/globals":817,"./touchAvailable":848,"ac-function/once":831}],820:[function(f,g,c){var d=f("./isDesktop").original;
var a=f("./isTablet").original;var h=f("ac-function/once");function b(){return(!d()&&!a())
}g.exports=h(b);g.exports.original=b},{"./isDesktop":819,"./isTablet":822,"ac-function/once":831}],821:[function(b,c,a){var d=b("./helpers/globals");
c.exports=function f(){var g=d.getWindow();return("devicePixelRatio" in g&&g.devicePixelRatio>=1.5)
}},{"./helpers/globals":817}],822:[function(f,g,c){var d=f("./isDesktop").original;
var i=f("./helpers/globals");var h=f("ac-function/once");var b=600;function a(){var k=i.getWindow();
var j=k.screen.width;if(k.orientation&&k.screen.height<j){j=k.screen.height}return(!d()&&j>=b)
}g.exports=h(a);g.exports.original=a},{"./helpers/globals":817,"./isDesktop":819,"ac-function/once":831}],823:[function(c,d,a){var g=c("./helpers/globals");
var f=c("ac-function/once");function b(){var j=g.getWindow();var i=false;try{i=!!(j.localStorage&&j.localStorage.non_existent!==null)
}catch(h){}return i}d.exports=f(b);d.exports.original=b},{"./helpers/globals":817,"ac-function/once":831}],824:[function(b,c,a){var g=b("./helpers/globals");
var d=b("ac-function/once");function f(){var h=g.getWindow();return("HTMLMediaElement" in h)
}c.exports=d(f);c.exports.original=f},{"./helpers/globals":817,"ac-function/once":831}],825:[function(c,d,b){c("ac-polyfills/matchMedia");
var g=c("./helpers/globals");var f=c("ac-function/once");function a(){var i=g.getWindow();
var h=i.matchMedia("only all");return !!(h&&h.matches)}d.exports=f(a);d.exports.original=a
},{"./helpers/globals":817,"ac-function/once":831,"ac-polyfills/matchMedia":832}],826:[function(b,c,a){arguments[4][54][0].apply(a,arguments)
},{"./ac-browser/BrowserData":827,"./ac-browser/IE":828}],827:[function(b,c,a){c.exports=b(295)
},{"./data":829}],828:[function(b,c,a){c.exports=b(56)},{}],829:[function(b,c,a){c.exports=b(297)
},{}],830:[function(c,d,b){var a=function(){var h="";var g;for(g=0;g<arguments.length;
g++){if(g>0){h+=","}h+=arguments[g]}return h};d.exports=function f(i,h){h=h||a;
var g=function(){var j=arguments;var k=h.apply(this,j);if(!(k in g.cache)){g.cache[k]=i.apply(this,j)
}return g.cache[k]};g.cache={};return g}},{}],831:[function(b,c,a){c.exports=function d(g){var f;
return function(){if(typeof f==="undefined"){f=g.apply(this,arguments)}return f
}}},{}],832:[function(b,c,a){window.matchMedia=window.matchMedia||(function(i,j){var g,d=i.documentElement,f=d.firstElementChild||d.firstChild,h=i.createElement("body"),k=i.createElement("div");
k.id="mq-test-1";k.style.cssText="position:absolute;top:-100em";h.style.background="none";
h.appendChild(k);return function(l){k.innerHTML='&shy;<style media="'+l+'"> #mq-test-1 { width:42px; }</style>';
d.insertBefore(h,f);g=k.offsetWidth===42;d.removeChild(h);return{matches:g,media:l}
}}(document))},{}],833:[function(b,c,a){c.exports=b(113)},{"./shared/camelCasedEventTypes":836,"./shared/prefixHelper":838,"./shared/windowFallbackEventTypes":841,"./utils/eventTypeAvailable":842}],834:[function(f,d,h){var a=f("./shared/stylePropertyCache");
var i=f("./shared/getStyleTestElement");var b=f("./utils/toCSS");var k=f("./utils/toDOM");
var j=f("./shared/prefixHelper");var c=function(o,l){var m=b(o);var n=(l===false)?false:b(l);
a[o]=a[l]=a[m]=a[n]={dom:l,css:n};return l};d.exports=function g(p){var n;var l;
var o;var m;p+="";if(p in a){return a[p].dom}o=i();p=k(p);l=p.charAt(0).toUpperCase()+p.substring(1);
if(p==="filter"){n=["WebkitFilter","filter"]}else{n=(p+" "+j.dom.join(l+" ")+l).split(" ")
}for(m=0;m<n.length;m++){if(typeof o.style[n[m]]!=="undefined"){if(m!==0){j.reduce(m-1)
}return c(p,n[m])}}return c(p,false)}},{"./shared/getStyleTestElement":837,"./shared/prefixHelper":838,"./shared/stylePropertyCache":839,"./utils/toCSS":843,"./utils/toDOM":844}],835:[function(d,b,h){var f=d("./getStyleProperty");
var k=d("./shared/styleValueAvailable");var j=d("./shared/prefixHelper");var a=d("./shared/stylePropertyCache");
var i={};var l=/(\([^\)]+\))/gi;var g=/([^ ,;\(]+(\([^\)]+\))?)/gi;b.exports=function c(o,n){var m;
n+="";o=f(o);if(!o){return false}if(k(o,n)){return n}m=a[o].css;n=n.replace(g,function(q){var p;
var t;var s;var r;if(q[0]==="#"||!isNaN(q[0])){return q}t=q.replace(l,"");s=m+":"+t;
if(s in i){if(i[s]===false){return""}return q.replace(t,i[s])}p=j.css.map(function(u){return u+q
});p=[q].concat(p);for(r=0;r<p.length;r++){if(k(o,p[r])){if(r!==0){j.reduce(r-1)
}i[s]=p[r].replace(l,"");return p[r]}}i[s]=false;return""});n=n.trim();return(n==="")?false:n
}},{"./getStyleProperty":834,"./shared/prefixHelper":838,"./shared/stylePropertyCache":839,"./shared/styleValueAvailable":840}],836:[function(b,c,a){c.exports=b(114)
},{}],837:[function(c,d,b){var f;d.exports=function a(){if(!f){f=document.createElement("_")
}else{f.style.cssText="";f.removeAttribute("style")}return f};d.exports.resetElement=function(){f=null
}},{}],838:[function(b,c,a){c.exports=b(115)},{}],839:[function(b,c,a){c.exports={}
},{}],840:[function(c,b,d){var a=c("./stylePropertyCache");var f=c("./getStyleTestElement");
var i=false;var k;var j;var g=function(){var l;if(!i){i=true;k=("CSS" in window&&"supports" in window.CSS);
j=false;l=f();try{l.style.width="invalid"}catch(m){j=true}}};b.exports=function h(o,n){var m;
var l;g();if(k){o=a[o].css;return CSS.supports(o,n)}l=f();m=l.style[o];if(j){try{l.style[o]=n
}catch(p){return false}}else{l.style[o]=n}return(l.style[o]&&l.style[o]!==m)};b.exports.resetFlags=function(){i=false
}},{"./getStyleTestElement":837,"./stylePropertyCache":839}],841:[function(b,c,a){c.exports=b(116)
},{}],842:[function(b,c,a){c.exports=b(117)},{}],843:[function(c,d,b){var f=/^(webkit|moz|ms)/gi;
d.exports=function a(h){var g;if(h.toLowerCase()==="cssfloat"){return"float"}if(f.test(h)){h="-"+h
}return h.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()
}},{}],844:[function(b,c,a){var f=/-([a-z])/g;c.exports=function d(h){var g;if(h.toLowerCase()==="float"){return"cssFloat"
}h=h.replace(f,function(j,i){return i.toUpperCase()});if(h.substr(0,2)==="Ms"){h="ms"+h.substring(2)
}return h}},{}],845:[function(c,d,b){var g=c("./helpers/globals");var f=c("ac-function/once");
function a(){var j=g.getWindow();var h=false;try{if("sessionStorage" in j&&typeof j.sessionStorage.setItem==="function"){j.sessionStorage.setItem("ac_feature","test");
h=true;j.sessionStorage.removeItem("ac_feature","test")}}catch(i){}return h}d.exports=f(a);
d.exports.original=a},{"./helpers/globals":817,"ac-function/once":831}],846:[function(c,d,b){var g=c("./helpers/globals");
var f=c("ac-function/once");function a(){var h=g.getDocument();return !!h.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
}d.exports=f(a);d.exports.original=a},{"./helpers/globals":817,"ac-function/once":831}],847:[function(b,c,a){var g=b("ac-prefixer/getStyleValue");
var d=b("ac-function/once");function f(){return !!(g("perspective","1px")&&g("transform","translateZ(0)"))
}c.exports=d(f);c.exports.original=f},{"ac-function/once":831,"ac-prefixer/getStyleValue":835}],848:[function(c,d,b){var g=c("./helpers/globals");
var f=c("ac-function/once");function a(){var j=g.getWindow();var h=g.getDocument();
var i=g.getNavigator();return !!(("ontouchstart" in j)||(j.DocumentTouch&&h instanceof j.DocumentTouch)||(i.maxTouchPoints>0)||(i.msMaxTouchPoints>0))
}d.exports=f(a);d.exports.original=a},{"./helpers/globals":817,"ac-function/once":831}],849:[function(c,d,b){var g=c("./helpers/globals");
var f=c("ac-function/once");function a(){var h=g.getDocument();var i=h.createElement("canvas");
if(typeof i.getContext==="function"){return !!(i.getContext("webgl")||i.getContext("experimental-webgl"))
}return false}d.exports=f(a);d.exports.original=a},{"./helpers/globals":817,"ac-function/once":831}],850:[function(c,d,b){c("ac-polyfills/Array/isArray");
var h=c("./extend");var a=Object.prototype.hasOwnProperty;var f=function(i,j){var k;
for(k in j){if(a.call(j,k)){if(j[k]===null){i[k]=null}else{if(typeof j[k]==="object"){i[k]=Array.isArray(j[k])?[]:{};
f(i[k],j[k])}else{i[k]=j[k]}}}}return i};d.exports=function g(j,i){if(i){return f({},j)
}return h({},j)}},{"./extend":853,"ac-polyfills/Array/isArray":859}],851:[function(b,c,a){c.exports=b(29)
},{}],852:[function(b,c,a){arguments[4][30][0].apply(a,arguments)},{"./extend":853}],853:[function(c,d,b){c("ac-polyfills/Array/prototype.forEach");
var a=Object.prototype.hasOwnProperty;d.exports=function f(){var h;var g;if(arguments.length<2){h=[{},arguments[0]]
}else{h=[].slice.call(arguments)}g=h.shift();h.forEach(function(j){if(j!=null){for(var i in j){if(a.call(j,i)){g[i]=j[i]
}}}});return g}},{"ac-polyfills/Array/prototype.forEach":860}],854:[function(b,c,a){c.exports=b(32)
},{}],855:[function(b,c,a){c.exports={clone:b("./clone"),create:b("./create"),defaults:b("./defaults"),extend:b("./extend"),getPrototypeOf:b("./getPrototypeOf"),isDate:b("./isDate"),isEmpty:b("./isEmpty"),isRegExp:b("./isRegExp"),toQueryParameters:b("./toQueryParameters")}
},{"./clone":850,"./create":851,"./defaults":852,"./extend":853,"./getPrototypeOf":854,"./isDate":856,"./isEmpty":857,"./isRegExp":858,"./toQueryParameters":862}],856:[function(b,c,a){c.exports=b(33)
},{}],857:[function(b,c,a){c.exports=b(34)},{}],858:[function(b,c,a){c.exports=b(35)
},{}],859:[function(b,c,a){if(!Array.isArray){Array.isArray=function(d){return Object.prototype.toString.call(d)==="[object Array]"
}}},{}],860:[function(b,c,a){c.exports=b(191)},{}],861:[function(b,c,a){c.exports=b(26)
},{}],862:[function(b,c,a){c.exports=b(36)},{qs:861}],863:[function(c,d,b){var a=c("./ac-video-posterframe/factory");
d.exports={create:a.create,AttributePoster:c("./ac-video-posterframe/PosterAttribute"),ImageTagPoster:c("./ac-video-posterframe/PosterImageTag"),defaultPosterPath:c("./ac-video-posterframe/defaultPosterPath")}
},{"./ac-video-posterframe/PosterAttribute":864,"./ac-video-posterframe/PosterImageTag":865,"./ac-video-posterframe/defaultPosterPath":866,"./ac-video-posterframe/factory":867}],864:[function(d,f,b){var h=d("ac-mvc-view").View;
var c=d("ac-object");var i="ac-video-poster-hide";function a(){h.apply(this,arguments)
}var g=a.prototype=c.create(h.prototype);g._renderPoster=function(){if(this.model.hasPoster()){this.el.setAttribute("poster",this.model.getPoster())
}else{this.el.removeAttribute("poster")}};g.render=function(){this._renderPoster();
this.model.on("posterchange",this._renderPoster,this)};f.exports=a},{"ac-mvc-view":704,"ac-object":855}],865:[function(c,f,a){var h=c("ac-mvc-view").View;
var b=c("ac-object");var i="ac-video-poster-hide";function d(){h.apply(this,arguments);
this._img=null}var g=d.prototype=b.create(h.prototype);g.tagName="div";g.className=["ac-video-poster"];
g._renderSrc=function(){if(this.model.hasPoster()){if(!this._img){this._img=document.createElement("img");
this.el.appendChild(this._img)}this._img.setAttribute("src",this.model.getPoster())
}else{if(this._img&&this._img.parentNode===this.el){this.el.removeChild(this._img);
this._img=null}}};g._hide=function(){this.addClassName(i)};g._show=function(){this.removeClassName(i)
};g._onPlay=function(){var j=this.model.getCurrentTime();if(j===0){this._show();
this.model.once("timeupdate",this._hide,this)}else{this._hide()}};g._onReadyStateChange=function(j){if(j.readyState===0){this._show()
}};g.render=function(){this._renderSrc();this.model.on("readystatechange",this._onReadyStateChange,this);
this.model.on("posterchange",this._renderSrc,this);this.model.on("play",this._onPlay,this);
this.model.on("ended",this._show,this)};f.exports=d},{"ac-mvc-view":704,"ac-object":855}],866:[function(f,g,c){var b=f("ac-feature");
var d=f("ac-cname").cname;function a(){return b.isRetina()}g.exports=function h(){if(a()){return d.formatUrl("/ac/ac-video-posterframe/1.0/images","ac-video-poster_848x480_2x",".jpg")
}return d.formatUrl("/ac/ac-video-posterframe/1.0/images","ac-video-poster_848x480",".jpg")
}},{"ac-cname":807,"ac-feature":818}],867:[function(g,i,d){var h=g("./PosterAttribute");
var c=g("./PosterImageTag");var b=g("ac-feature");function a(){return b.isHandheld()
}i.exports={create:function f(j){var k=null;if(a()){k=new h({model:j,element:j.getMediaElement()})
}else{k=new c({model:j})}return k}}},{"./PosterAttribute":864,"./PosterImageTag":865,"ac-feature":818}],868:[function(d,f,b){var c=d("./ac-video/player/Player");
c.create=d("./ac-video/player/factory/create");c.createFromElement=d("./ac-video/player/factory/createFromElement");
c.createFromAnchorTag=d("./ac-video/player/factory/createFromAnchorTag");var a=d("./ac-video/models/Video");
a.createFromVideoTag=d("./ac-video/models/video/factory/createFromVideoTag");f.exports={Player:c,Video:a}
},{"./ac-video/models/Video":891,"./ac-video/models/video/factory/createFromVideoTag":893,"./ac-video/player/Player":894,"./ac-video/player/factory/create":895,"./ac-video/player/factory/createFromAnchorTag":896,"./ac-video/player/factory/createFromElement":897}],869:[function(b,c,a){function f(g){this.el=g
}var d=f.prototype;d.setEl=function(g){this.el=g};d.play=function(){this.el.play()
};d.pause=function(){this.el.pause()};d.setCurrentTime=function(g){this.el.currentTime=g
};d.getCurrentTime=function(){return this.el.currentTime};d.setPreload=function(g){this.el.preload=g
};d.getWidth=function(){return this.el.videoWidth};d.getHeight=function(){return this.el.videoHeight
};d.setControls=function(g){this.el.controls=g};d.setSrc=function(g){this.el.src=g
};d.getSrc=function(){return this.el.src};d.getControls=function(){return this.el.controls
};d.setMuted=function(g){this.el.muted=g};d.setVolume=function(g){this.el.volume=g
};d.getVolume=function(){return this.el.volume};d.getDuration=function(){return this.el.duration
};d.setPlaybackRate=function(g){this.el.playbackRate=g};d.getPlaybackRate=function(){return this.el.playbackRate
};d.getDefaultPlaybackRate=function(){return this.el.defaultPlaybackRate};d.setLoop=function(g){this.el.loop=g
};d.getLoop=function(){return this.el.loop};d.getCurrentSrc=function(){return this.el.currentSrc
};d.getPlayed=function(){return this.el.played};d.addTextTrack=function(h,g,i){return this.el.addTextTrack(h,g,i)
};d.getTextTracks=function(){var g=this.el.textTracks||[];return Array.prototype.map.call(g,function(i,h){i.index=h;
return i})};d.getBuffered=function(){return this.el.buffered};c.exports=f},{}],870:[function(b,c,a){function f(g){this.el=g;
this._boundChangeSrc=this._changeSrc.bind(this);this._incomingSrc=null}var d=f.prototype;
d.setEl=function(g){this.el=g};d.play=function(){this.el.Play()};d.pause=function(){this.el.Stop()
};d.setCurrentTime=function(g){this.el.SetTime(g*this.el.GetTimeScale())};d.setPreload=function(g){};
d.getCurrentTime=function(){var h=0;if(this._incomingSrc){return h}try{h=this.el.GetTime()/this.el.GetTimeScale()
}catch(g){}return h};d.getWidth=function(){var i;try{var j=this.el.GetRectangle();
var h=this.el.GetMatrix();var g=parseFloat(h.split(",")[0]);i=+j.split(",")[2];
i=Math.round(i/g)}catch(k){}return i};d.getHeight=function(){var g;try{var j=this.el.GetRectangle();
var i=this.el.GetMatrix();var h=parseFloat(i.split(",")[3]);g=+j.split(",")[3];
g=Math.round(g/h)}catch(k){}return g};d.setMuted=function(g){this.el.SetMute(g)
};d.setVolume=function(g){this.el.SetVolume(g*256)};d.getVolume=function(){return this.el.GetVolume()/256
};d.getDuration=function(){var h=NaN;if(this._incomingSrc){return NaN}try{h=this.el.GetDuration()/this.el.GetTimeScale()
}catch(g){}return h};d.setLoop=function(g){this.el.SetIsLooping(g)};d.getLoop=function(){return this.el.GetIsLooping()
};d.setPlaybackRate=function(g){this.el.SetRate(g)};d.getPlaybackRate=function(){var g=1;
try{g=this.el.GetRate()}catch(h){}return g};d._changeSrc=function(){try{this.el.SetResetPropertiesOnReload(false);
this.el.SetURL(this._incomingSrc)}catch(g){}this._incomingSrc=null};d.setSrc=function(g){this._incomingSrc=g;
window.requestAnimationFrame(this._boundChangeSrc)};d.getSrc=function(){return this.el.GetURL()
};d.getCurrentSrc=function(){return this.el.GetURL()};d.getDefaultPlaybackRate=function(){return 1
};d.getPlayed=function(){};d.getBuffered=function(){return[[0,this.element.GetMaxTimeLoaded()/this.element.GetTimeScale()]]
};d.showTextTrack=function(g){this.el.SetTrackEnabled(g,true)};d.hideTextTrack=function(g){this.el.SetTrackEnabled(g,false)
};d.setControls=function(g){this.el.SetControllerVisible(g)};d.getControls=function(){return this.el.GetControllerVisible()
};d.getTextTracks=function(){var h=[];var g=this.el.GetTrackCount();for(var j=1;
j<=g;j++){var k=this.el.GetTrackType(j);if(k==="Subtitle"||k==="Closed Caption"){h.push({kind:k,label:this.el.GetTrackName(j),mode:(this.el.GetTrackEnabled(j))?"showing":"hidden",index:j})
}}return h};c.exports=f},{}],871:[function(f,g,d){var c=f("./HTML5VideoAPI");var b=f("./QuickTimeAPI");
var a={create:function(h,i){if(i==="video"){return new c(h)}else{return new b(h)
}}};g.exports=a},{"./HTML5VideoAPI":869,"./QuickTimeAPI":870}],872:[function(c,g,b){var h=c("ac-mvc-collection").Collection;
var f=c("./../models/MediaSource");var a=c("ac-object");var d=function(){h.apply(this,arguments)
};var i=d.prototype=a.create(h.prototype);i.ModelType=f;g.exports=d},{"./../models/MediaSource":888,"ac-mvc-collection":622,"ac-object":707}],873:[function(d,f,c){var i=d("./TextTrackCollection");
var h=d("./../models/PolyfillTextTrackModel");var b=d("ac-object");var a=function(){i.apply(this,arguments)
};var g=a.prototype=b.create(i.prototype);g.ModelType=h;g.createTextTrackFromNativeTrack=function(k,j,m){var l=new h();
l.setNativeTextTrack(m);l.setTextTrackEl(k);l.setTextTrackInnerEl(j);this.add(l);
return l};g.removeTextTrackFromNativeTrack=function(k){var j=this.findTextTrackModelFromNativeTrack(k);
this.remove(j)};g.findTextTrackModelFromNativeTrack=function(k){if(!k||k.length===0){return null
}var j=this.filter(function(l){if(l.getNativeTextTrack()===k[0].text){return l}return false
})[0];return j||null};g.getEnabledTextTracks=function(){var j=this.filter(function(k){if(k.get("mode")!=="disabled"){return k
}return false});return new a({models:j})};g.getVisibleTextTracks=function(){var j=this.find({mode:"showing"});
return new a({models:j})};f.exports=a},{"./../models/PolyfillTextTrackModel":889,"./TextTrackCollection":874,"ac-object":707}],874:[function(c,d,b){var f=c("ac-mvc-collection").Collection;
var i=c("./../models/TextTrackModel");var a=c("ac-object");var h=function(){f.apply(this,arguments)
};var g=h.prototype=a.create(f.prototype);g.ModelType=i;g.createTextTrackFromNativeTrack=function(k){var j=new i(k);
j.setNativeTextTrack(k);this.add(j);return j};g.removeTextTrackFromNativeTrack=function(k){var j=this.findTextTrackModelFromNativeTrack(k);
this.remove(j)};g.count=function(){return this.models.length};g.findTextTrackModelFromNativeTrack=function(k){var j=this.filter(function(l){if(l.getNativeTextTrack()===k){return l
}return false})[0];return j||null};g.getEnabledTextTracks=function(){var j=this.filter(function(k){if(k.get("mode")!=="disabled"){return k
}return false});return new h({models:j})};g._findTextTrack=function(k){var j;if(this.indexOf(k)>-1){j=k
}else{if(typeof k==="number"){j=this.at(k)}else{if(typeof k==="string"){j=this.get(k)
}else{j=this.find(k,{limit:1})[0]}}}return j};g.getVisibleTextTracks=function(){var j=this.find({mode:"showing"});
return new h({models:j})};g.findTextTrack=function(j){return this._findTextTrack(j)
};d.exports=h},{"./../models/TextTrackModel":890,"ac-mvc-collection":622,"ac-object":707}],875:[function(b,c,a){function f(){this._boundEventListeners=[];
this._collection=[]}var d=f.prototype;d.add=function(j){j=Array.prototype.slice.call(arguments,0);
var g=j.length;var k;var h;for(h=0;h<g;h++){if(this._collection.indexOf(j[h])<0){k=j[h];
this._setup(k);this._collection.push(k)}}};d.remove=function(j){j=Array.prototype.slice.call(arguments,0);
var g=j.length;var h;var k;for(h=0;h<g;h++){k=this._collection.indexOf(j[h]);if(k>-1){this._teardown(j[h]);
this._collection.splice(k,1)}}};d._setup=function(i){var g=this._pauseOtherVideos.bind(this,i);
var j=this.remove.bind(this,i);var h={video:i,eventListeners:{playListener:g,destroyListener:j}};
this._boundEventListeners.push(h);i.on("play",g);i.on("acv-destroy",j)};d._teardown=function(i){var h=this._boundEventListeners.filter(function(j){return j.video===i
},this);if(h.length){h=h.pop();i.off("play",h.eventListeners.playListener);i.off("acv-destroy",h.eventListeners.destroyListener);
var g=this._boundEventListeners.indexOf(h);this._boundEventListeners.splice(g,1)
}};d._getOtherVideos=function(g){return this._collection.filter(function(h){return h!==g
},this)};d._pauseOtherVideos=function(g){var h=this._getOtherVideos(g);h.forEach(function(i){i.pause()
})};c.exports=new f()},{}],876:[function(d,c,h){var f=d("ac-object");var j=d("ac-dom-traversal/querySelector");
var l=d("ac-browser");var m=d("ac-deferred").Deferred;var n="v";var b=function(o,p){var q=o.getAttribute(p);
if(q===null){return false}else{if(q===""){return false}}return true};var a=(function(){function o(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)
}return function(){return o()+o()+"-"+o()+"-"+o()+"-"+o()+"-"+o()+o()+o()}}());
function g(){return/^(iOS|Android)$/.test(l.os)}function i(){this._possibleTemplateKeys=["autoplay","buffered","endframe","controls","height","loop","muted","poster","preload","suffix","width","controlbar","controlbarwidth","controlbarskinning","disablecaptionscontrol"];
this._defaultTemplateValues={autoplay:false,muted:false,loop:false,controls:false,preload:"metadata",controlbarwidth:"450",controlbarskinning:"ac-video-controlbar",disablecaptionscontrol:false}
}var k=i.prototype;k.getSource=function(q){var r=/[^/]*.[^\.]*$/;var p=null;var s={};
if(b(q,"data-src")){p=q.getAttribute("data-src")}else{if(b(q,"href")){p=q.getAttribute("href")
}else{if(b(q,"src")){p=q.getAttribute("src")}else{var o=j("source",q);if(o&&b(o,"src")){p=o.getAttribute("src")
}}}}if(p){s.defaultSource=p;s.videoSource=p.match(r)[0];s.directory=p.replace(s.videoSource,"");
s.videoFileName=s.videoSource.split(".")[0]}return s};k.getConfig=function(r,q,t){var s=new m();
var p={};var o=this.getSource(r);this.isAppleMobileDevice=(l.os==="iOS");p=this._getValues(r,t);
this._videoRecommendation=q;p.videoTemplate=q.videoTemplate;s.resolve();return s.promise().then(function(){p.usesFullScreen=(p.usesFullScreen&&p.videoTemplate==="elementVideo");
p.source=o.defaultSource;return p})};k._buildFileSuffix=function(p){var r="";if(p.suffix){r="_"+p.suffix
}else{if(p.height&&p.width){var o=p.height.replace("px","").replace("em","").replace("rem","");
var q=p.width.replace("px","").replace("em","").replace("rem","");r="_"+q+"x"+o
}}return r};k._getRecommendedCaptionsPaths=function(p,o){var q=[];q.push(p+o+"-captions."+n+"tt");
return q};k._generateRecommendedVideoPaths=function(p,o){var r=this._buildFileSuffix(o);
var q=[];this._videoRecommendation.supportedProfiles.forEach(function(s){if(s.sizeRelevant){p=p+r
}q.push(p+"."+s.fileExtension)});return q};k._getValues=function(p,r){var q="ac-video-"+a();
var o=this._defaultTemplateValues;f.extend(o,this._getMarkupValues(p));if(r){f.extend(o,r)
}if(g()){o["native"]=true;o.controls="true"}o.targetId=p.id;o.domId=q;o.eventId=q+"-quicktime-event";
o.wrapperId=q+"-wrapper";return o};k._getMarkupValues=function(o){var p={};this._possibleTemplateKeys.forEach(function(q){if(b(o,q)){p[q]=o.getAttribute(q)
}else{if(b(o,"data-acv-"+q)){p[q]=o.getAttribute("data-acv-"+q)}}if((q==="autoplay"||q==="controls"||q==="muted"||q==="loop")&&p[q]&&p[q].length>0){p[q]=true
}if(typeof(p[q])==="string"&&/^(true|false)$/.test(p[q])){p[q]=(p[q]==="true")?true:false
}});return p};k.addPossibleTemplateKeys=function(o){o.forEach(function(p){if(!this._possibleTemplateKeys.indexOf(p)){this._possibleTemplateKeys.push(p)
}},this)};c.exports=i},{"ac-browser":54,"ac-dom-traversal/querySelector":196,"ac-object":707}],877:[function(b,c,a){c.exports={LOADEDMETADATA:1,LOADEDDATA:2,CANPLAY:3,CANPLAYTHROUGH:4}
},{}],878:[function(c,b,d){var h=c("./TextTracksController");var i=c("./../../views/textTracks/TextTracksCollectionView");
var g=c("./../../models/TextTrackModel");var a=c("ac-object");function j(){h.apply(this,arguments);
this.view=this.options.view||new i({element:this.mediaElement.el});this._addViewEvents()
}var f=j.prototype=a.create(h.prototype);f._holdingTextTrackModels={};f._addViewEvents=function(){this.view.on("addtrack",this._respondToAddTrackEvent,this);
this.view.on("change",this._respondToChangeTrackEvent,this);this.view.on("removetrack",this._respondToRemoveTrackEvent,this)
};f._removeViewEvents=function(){this.view.off("addtrack",this._respondToAddTrackEvent,this);
this.view.off("change",this._respondToChangeTrackEvent,this);this.view.off("removetrack",this._respondToRemoveTrackEvent,this)
};f._respondToAddTrackEvent=function(k){var l=k.data.track;var n=this.model.findTextTrackModelFromNativeTrack(l);
if(!n&&l&&l.id&&this._holdingTextTrackModels[l.id]){n=this._holdingTextTrackModels[l.id];
n.setNativeTextTrack(l);this.model.add(n);this._holdingTextTrackModels[l.id]=undefined;
var m=this.createTextTrackRenderView(l,n);m.renderMode()}if(n===null){this._createTextTrackFromNativeTrack(l)
}else{n.set({mode:l.mode})}if(n){n.on("change:mode",function(){if("webkitClosedCaptionsVisible" in this.mediaElement.el&&n.get("mode")==="showing"){if(this.mediaElement.el.webkitClosedCaptionsVisible===false){this.mediaElement.el.webkitClosedCaptionsVisible=true
}}},this)}this._resetModel();this.trigger("addtrack",k)};f._createTextTrackFromNativeTrack=function(l){var k=this.model.createTextTrackFromNativeTrack(l);
this.createTextTrackRenderView(l,k);return k};f._removeTextTrackFromNativeTrack=function(l){var k=this.model.findTextTrackModelFromNativeTrack(l);
this.removeTextTrackRenderView(k);this.model.removeTextTrackFromNativeTrack(l);
this._resetModel()};f._resetModel=function(){var k=this.mediaElement.el.textTracks;
var n=[];var l;if(k){for(var m=0;m<k.length;m+=1){l=this.model.findTextTrackModelFromNativeTrack(k[m]);
if(l){l.set({mode:k[m].mode});n.push(l)}}this.model.reset(n)}};f._respondToChangeTrackEvent=function(k){this.trigger("changetrack",k)
};f._respondToRemoveTrackEvent=function(k){var l=k.data.track;this._removeTextTrackFromNativeTrack(l);
this.trigger("removetrack",k)};f.addTextTrackFromRemoteVTT=function(l){var m={src:l.src};
var k=this.model.findTextTrack(m);if(k&&typeof k==="object"){return k.cid}k=new g(l);
this._holdingTextTrackModels[k.cid]=k;this.view.addTextTrackTag(k);return k.cid
};f.addTextTrack=function(m,k,n){var l=this.mediaElement.addTextTrack(m,k,n);return this._createTextTrackFromNativeTrack(l)
};f.removeTextTrack=function(k){if(!k){return}if(this._holdingTextTrackModels[k.cid]){this._holdingTextTrackModels[k.cid]=undefined
}this.view.removeTextTrackTag(k)};f.populateTextTracks=function(){var k=this.mediaElement.getTextTracks();
if(k){k.forEach(function(l){if(this.model.findTextTrackModelFromNativeTrack(l)===null){this._createTextTrackFromNativeTrack(l)
}},this)}};b.exports=j},{"./../../models/TextTrackModel":890,"./../../views/textTracks/TextTracksCollectionView":911,"./TextTracksController":880,"ac-object":707}],879:[function(g,f,h){var j=g("./TextTracksController");
var a=g("./../../views/textTracks/PolyfillTextTrackCollectionView");var k=g("./../../models/PolyfillTextTrackModel");
var d=g("./../../collection/PolyfillTextTrackCollection");var b=g("ac-object");
function c(l){var m={model:new d()};j.apply(this,[l,m]);this.view=this.options.view||new a({element:this.mediaElement.el});
this._addViewEvents()}var i=c.prototype=b.create(j.prototype);i._holdingTextTrackModels={};
i._addViewEvents=function(){this.view.on("addtrack",this._respondToAddTrackEvent,this);
this.view.on("change",this._respondToChangeTrackEvent,this);this.view.on("removetrack",this._respondToRemoveTrackEvent,this);
this.view.on("timeupdate",this._onTimeUpdate,this)};i._removeViewEvents=function(){this.view.off("addtrack",this._respondToAddTrackEvent,this);
this.view.off("change",this._respondToChangeTrackEvent,this);this.view.off("removetrack",this._respondToRemoveTrackEvent,this);
this.view.off("timeupdate",this._onTimeUpdate,this)};i._respondToAddTrackEvent=function(m){if(!(m&&m.data)){return
}var l=(m.data&&m.data.track)?m.data.track:[];var o=this.model.findTextTrackModelFromNativeTrack(l);
if(!o&&l&&m.data.textTrackEl&&m.data.textTrackEl.id&&this._holdingTextTrackModels[m.data.textTrackEl.id]){o=this._holdingTextTrackModels[m.data.textTrackEl.id];
o.setNativeTextTrack(l);o.setTextTrackEl(m.data.textTrackEl);o.setTextTrackInnerEl(m.data.textTrackInnerEl);
this.model.add(o);this._holdingTextTrackModels[m.data.textTrackEl.id]=undefined;
var n=this.createTextTrackRenderView(m.data.textTrackEl,o);n.renderMode()}if(o===null){this._createTextTrackFromTextTrackData(m.data.textTrackEl,m.data.textTrackInnerEl,l)
}this.trigger("addtrack",m)};i._createTextTrackFromTextTrackData=function(n,m,l){var o=this.model.createTextTrackFromNativeTrack(n,m,l);
this.createTextTrackRenderView(n,o);return o};i._removeTextTrackFromTextTrackData=function(l){var m=this.model.findTextTrackModelFromNativeTrack(l);
this.removeTextTrackRenderView(m);this.model.removeTextTrackFromNativeTrack(l)};
i._respondToChangeTrackEvent=function(l){this.trigger("changetrack",l)};i._respondToRemoveTrackEvent=function(l){var m=l.data.track;
this._removeTextTrackFromTextTrackData(m);this.trigger("removetrack",l)};i._onTimeUpdate=function(n){if(!this.view.textTracks||this.view.textTracks.length===0){return
}var m=this.view.textTracks.filter(this._filterCaptions.bind(this));var l=m.length;
var p=this.model.findTextTrackModelFromNativeTrack(this.view.textTracks);var o=p.get("mode");
if(o==="showing"&&l>0){p.addVTTCue(m[0].text);this.view.show()}else{this.view.hide()
}};i.addTextTrackFromRemoteVTT=function(m){var n={src:m.src};var l=this.model.findTextTrack(n);
if(l&&typeof l==="object"){this.view.textTracks=l.getCues();this.view.textTrackEl=l.gettextTrackEl();
this.view.textTrackInnerEl=l.gettextTrackInnerEl();return l.cid}l=new k(m);this._holdingTextTrackModels[l.cid]=l;
if(m.src){this.view.loadVTTFile(m.src,l)}return l.cid};i.removeTextTrack=function(l){if(!l){return
}if(this._holdingTextTrackModels[l.cid]){this._holdingTextTrackModels[l.cid]=undefined
}this.view.removeTextTrackDiv(l)};i.populateTextTracks=function(){};i._filterCaptions=function(o,l,p){var n=this.mediaElement.getCurrentTime();
var m=this._toMMSSS(n);return this._compareTime(m,o.startTime,"gt")&&this._compareTime(m,o.endTime,"lt")
};i._toMMSSS=function(n){var l=Math.floor(n/3600);var m=Math.floor((n-(l*3600))/60);
var o=Math.round((n-(l*3600)-(m*60)));if(l<10){l="0"+l}if(m<10){m="0"+m}if(o<10){o="0"+o
}return l+":"+m+":"+o};i._compareTime=function(n,m,l){n=new Date("January 1, 1975 "+n);
m=new Date("January 1, 1975 "+m);return l==="gt"?n>=m:n<=m};f.exports=c},{"./../../collection/PolyfillTextTrackCollection":873,"./../../models/PolyfillTextTrackModel":889,"./../../views/textTracks/PolyfillTextTrackCollectionView":907,"./TextTracksController":880,"ac-object":707}],880:[function(c,b,d){var j=c("ac-event-emitter").EventEmitter;
var h=c("./../../collection/TextTrackCollection");var i=c("./../../views/textTracks/TextTrackRender");
var a=c("ac-object");function g(k,l){this.options=l||{};this.mediaElement=k;this.model=this.options.model||new h();
this._textTrackRenderViews=[]}var f=g.prototype=a.create(j.prototype);f.findTextTrackModelFromNativeTrack=function(k){return this.model.findTextTrackModelFromNativeTrack(k)
};f.addTextTrackFromRemoteVTT=function(k){};f.addTextTrack=function(){};f.removeTextTrack=function(k){};
f.getEnabledTextTracks=function(){return this.model.getEnabledTextTracks.apply(this.model,arguments)
};f.getTextTracks=function(){return this.model};f.getTextTracksCount=function(){return this.model.count()
};f.getVisibleTextTracks=function(){return this.model.getVisibleTextTracks()};f.findTextTrack=function(k){return this.model.findTextTrack(k)
};f.addTextTrack=function(l,k,m){return this.mediaElement.addTextTrack(l,k,m)};
f.populateTextTracks=function(){};f.createTextTrackRenderView=function(m,k){var l=new i({element:m,model:k});
k.on("change:mode",this._onTextTrackModeChange,this);l.render();this._textTrackRenderViews.push(l);
return l};f.removeTextTrackRenderView=function(m){var l=this._textTrackRenderViews.length;
var n={};for(var k=0;k<l;k++){if(this._textTrackRenderViews[k].model.cid===m.cid){n.view=this._textTrackRenderViews[k];
n.idx=k;break}}if(n.view){this._destroyRenderView(n.view);this._textTrackRenderViews.splice(n.idx,1)
}};f._destroyRenderView=function(k){k.emitterTrigger("destroy");k.off();var l;for(l in k){if(k.hasOwnProperty(l)){k[l]=null
}}};f._onTextTrackModeChange=function(k){var l=k.value;if(l==="showing"){this.trigger("texttrackshow")
}else{this.trigger("texttrackhide")}};b.exports=g},{"./../../collection/TextTrackCollection":874,"./../../views/textTracks/TextTrackRender":909,"ac-event-emitter":false,"ac-object":707}],881:[function(c,b,d){var h=c("./TextTracksController");
var g=c("./../../models/TextTrackModel");var i=c("./../../views/textTracks/WebkitClosedCaptionsView");
var a=c("ac-object");var k=c("ac-browser");function j(){h.apply(this,arguments)
}var f=j.prototype=a.create(h.prototype);f._onTextTrackModeChange=function(l){if(l.value==="showing"){this.trigger("texttrackshow")
}else{this.trigger("texttrackhide")}};f.populateTextTracks=function(){var m=this.mediaElement.el;
var l;var n=m.webkitHasClosedCaptions;if(n===true){if(!this.view){this.view=new i({element:m})
}l=new g({mode:"hidden"});this.view.setModel(l);l.on("change:mode",this._onTextTrackModeChange,this);
this.model.reset([l]);this.trigger("addtrack",{textTrack:l});if(k.name==="Safari Mobile"&&k.version<7){l.once("change:mode",this.view.render,this.view)
}else{this.view.render()}}};b.exports=j},{"./../../models/TextTrackModel":890,"./../../views/textTracks/WebkitClosedCaptionsView":912,"./TextTracksController":880,"ac-browser":54,"ac-object":707}],882:[function(c,d,b){function a(f){this.options=f||{};
this.player=this.options.player;this.player.setControls(true)}a.create=function(f){return new a(f)
};d.exports=a},{}],883:[function(d,c,h){var m=d("./../models/Video");var n=d("ac-event-emitter").EventEmitter;
var b=d("./../views/mediaView/MediaView");var g=d("ac-object");var l=d("./../controller/textTracks/NativeTextTracksController");
var j=d("ac-fullscreen");var k=d("ac-feature");var a=d("./../const/readyState");
function f(p,o){this.playableObject=p;this.options=o||{};this.model=this._getOrCreateVideo();
this.view=this._getOrCreateView();this.textTracks=this._getOrCreateTextTracksController();
this._sourceReadyBinding=false;n.call(this);this._bindTextTrackEvents();this._bindModelEvents();
this._checkToRenderView()}var i=f.prototype=g.create(n.prototype);i._bindTextTrackEvents=function(){this.textTracks.on("addtrack",this._onAddTrack,this);
this.textTracks.on("change",this._onTrackChange,this);this.textTracks.on("removetrack",this._onRemoveTrack,this);
this.textTracks.on("texttrackshow",this._onTextTrackShow,this);this.textTracks.on("texttrackhide",this._onTextTrackHide,this)
};i._onTextTrackHide=function(){this.trigger("texttrackhide")};i._onTextTrackShow=function(){this.trigger("texttrackshow")
};i._onAddTrack=function(o){this.trigger("addtrack",o.data.track)};i._onTrackChange=function(o){this.trigger("change",o)
};i._onRemoveTrack=function(o){this.trigger("removetrack",o.data.track)};i._checkToRenderView=function(){if(this.model.getCurrentSrc()){this._onSourceReady()
}else{if(!this._sourceReadyBinding){this.model.once("change:currentSrc",this._onSourceReady,this);
this._sourceReadyBinding=true}}};i._onSourceReady=function(){if(this.model.getPreload()!=="none"){this.view.render();
this.playableObject.setEl(this.view.getMediaElement());this._bindViewEvents()}this._sourceReadyBinding=false
};i._getOrCreateView=function(){var o=this.options.view;if(!o){o=new b({model:this.model})
}o.on("mediaelementchange",this._onMediaElementChange,this);return o};i._onMediaElementChange=function(){this.playableObject.setEl(this.view.getMediaElement())
};i._getOrCreateTextTracksController=function(){var o=this.options.textTracks;if(o===undefined){o=new l(this.playableObject)
}return o};i._getOrCreateVideo=function(){var o=this.options.model;if(o===undefined){o=new m()
}else{if(!(o instanceof m)){o=new m(o)}}return o};i._bindModelEvents=function(){this.model.on("change:muted",this._onMutedChange,this);
this.model.on("change:seeking",this._onModelSeekingChange,this);this.model.on("change:paused",this._onPausedChange,this);
this.model.on("change:playbackRate",this._onPlaybackRateChange,this);this.model.on("change:duration",this._onDurationChange,this);
this.model.on("change:volume",this._onVolumeChange,this);this.model.on("change:readyState",this._onReadyStateChange,this);
this.model.on("change:poster",this._onPosterChange,this)};i._bindViewEvents=function(){this.view.on("play",this._respondToPlay,this);
this.view.on("pause",this._respondToPause,this);this.view.on("timeupdate",this._respondToTimeUpdate,this);
this.view.on("ended",this._respondToEnded,this);this.view.on("ratechange",this._respondToRateChange,this);
this.view.on("durationchange",this._respondToDurationChange,this);this.view.on("loadedmetadata",this._respondToLoadedMetaData,this);
this.view.on("loadeddata",this._respondToLoadedData,this);this.view.on("canplay",this._respondToCanPlay,this);
this.view.on("canplaythrough",this._respondToCanPlayThrough,this)};i._populateTextTracks=function(){this.textTracks.populateTextTracks()
};i._respondToLoadedMetaData=function(){this._populateTextTracks();this._setReadyState(1)
};i._onPosterChange=function(){this.trigger("posterchange")};i._respondToLoadedData=function(){this._setReadyState(2)
};i._respondToCanPlay=function(){this._setReadyState(3)};i._respondToCanPlayThrough=function(){this._setReadyState(4)
};i._respondToDurationChange=function(){this.model.set({duration:this.playableObject.getDuration()})
};i._respondToRateChange=function(){if(this.playableObject.getPlaybackRate){this.model.set({playbackRate:this.playableObject.getPlaybackRate()})
}};i._respondToEnded=function(){this.model.set({ended:true});this.trigger("ended")
};i._respondToPlay=function(){var o=this.getMediaElement();if(j.fullscreenElement()!==o&&j.getMode()==="ios"&&k.isHandheld()){try{j.requestFullscreen(this.getMediaElement())
}catch(p){}}this.model.set({paused:false,ended:false})};i._respondToPause=function(){this.model.set({paused:true})
};i._triggerTimeUpdate=function(){this.trigger("timeupdate",{currentTime:this.getCurrentTime()})
};i._respondToTimeUpdate=function(){if(this.model.getCurrentTime()!==this.playableObject.getCurrentTime()){this.model.setCurrentTime(this.playableObject.getCurrentTime());
this._triggerTimeUpdate()}if(this.model.getSeeking()===true){this.model.set({seeking:false})
}};i._onReadyStateChange=function(o){if(o.value===a.LOADEDMETADATA){this.trigger("loadedmetadata")
}else{if(o.value===a.LOADEDDATA){this.trigger("loadeddata")}else{if(o.value===a.CANPLAY){this.trigger("canplay")
}else{if(o.value===a.CANPLAYTHROUGH){this.trigger("canplaythrough")}}}}this.trigger("readystatechange",{readyState:o.value})
};i._setReadyState=function(o){this.model.set({readyState:o})};i._onMutedChange=function(){this.trigger("volumechange");
if(this.model.getMuted()===false){this._setElementVolume(this.model.getVolume())
}};i._onVolumeChange=function(){this.trigger("volumechange")};i._onDurationChange=function(o){if(isNaN(o.previous)&&isNaN(o.value)){return
}this.trigger("durationchange",o)};i._onPlaybackRateChange=function(){this.trigger("ratechange")
};i._onPausedChange=function(o){if(o.value===true){this.trigger("pause")}else{this.trigger("play")
}};i._onModelSeekingChange=function(o){if(o.value===true){this.trigger("seeking")
}else{this.trigger("seeked")}};i.findTextTrackModelFromNativeTrack=function(o){return this.textTracks.findTextTrackModelFromNativeTrack(o)
};i.findTextTrack=function(o){return this.textTracks.findTextTrack(o)};i.getTextTracks=function(){return this.textTracks.getTextTracks()
};i.getTextTracksCount=function(){return this.textTracks.getTextTracksCount()};
i.addTextTrackFromRemoteVTT=function(){return this.textTracks.addTextTrackFromRemoteVTT.apply(this.textTracks,arguments)
};i.addTextTrack=function(p,o,q){return this.textTracks.addTextTrack(p,o,q)};i.removeTextTrack=function(){return this.textTracks.removeTextTrack.apply(this.textTracks,arguments)
};i.getEnabledTextTracks=function(){return this.textTracks.getEnabledTextTracks.apply(this.textTracks,arguments)
};i.getVisibleTextTracks=function(){return this.textTracks.getVisibleTextTracks()
};i.play=function(){if(this.getPaused()===false){return}this.playableObject.play()
};i.pause=function(){if(this.getPaused()===true){return}this.playableObject.pause()
};i.getVideo=function(){return this.model};i.getPaused=function(){return this.model.getPaused()
};i.setMuted=function(o){this.model.setMuted(o);this.playableObject.setMuted(o)
};i.getMuted=function(){return this.model.getMuted()};i.getEnded=function(){return this.model.getEnded()
};i._setElementVolume=function(o){this.playableObject.setVolume(o)};i.setVolume=function(o){this.model.setVolume(o,{silent:true});
if(this.getMuted()===false){this._setElementVolume(o)}};i.getVolume=function(){return this.model.getVolume()
};i.setCurrentTime=function(p){var o=this.getCurrentTime();this.model.set({seeking:true});
this.playableObject.setCurrentTime(p);if(o===p){this.model.set({seeking:false})
}};i.getWidth=function(){return this.playableObject.getWidth()};i.getHeight=function(){return this.playableObject.getHeight()
};i.getCurrentTime=function(){return this.model.getCurrentTime()};i.setPlaybackRate=function(p){var o=this.model.getPlaybackRate();
if(o!==p){this.playableObject.setPlaybackRate(p)}};i.getPlaybackRate=function(){return this.model.getPlaybackRate()
};i.getDuration=function(){return this.model.getDuration()};i.setAutoplay=function(o){this.playableObject.SetAutoPlay(o)
};i.getAutoplay=function(){return this.playableObject.GetAutoPlay()};i.getCaptionsTracks=function(){return this.playableObject.getCaptionsTracks()
};i.setLoop=function(o){this.model.setLoop(o);this.playableObject.setLoop(o)};i.getLoop=function(){return this.model.getLoop()
};i.getError=function(){};i.getVideoWidth=function(){};i.getVideoHeight=function(){};
i.getPoster=function(){return this.model.getPoster()};i.setPoster=function(o){this.model.setPoster(o)
};i.hasPoster=function(){return !!(this.model.getPoster())};i._resetModelPlaybackAttributes=function(){this.model.set({duration:this.playableObject.getDuration(),currentTime:this.playableObject.getCurrentTime(),playbackRate:this.playableObject.getPlaybackRate(),readyState:0,paused:true,ended:false,seeking:false});
this._triggerTimeUpdate()};i.setSrc=function(p){var q=this.model.findSources(p)[0];
var o=this.model.getCurrentSrc();if(o){o=o.get("src")}if(q===undefined){q=this.model.addSource(p)
}if(o!==q.get("src")){this.model.setCurrentSrc(q);this.playableObject.setSrc(q.get("src"));
this._resetModelPlaybackAttributes()}return q};i.getPreload=function(){return this.model.getPreload()
};i.setPreload=function(o){this.model.setPreload(o);this.playableObject.setPreload(o);
this._checkToRenderView()};i.getCurrentSrc=function(){return this.model.getCurrentSrc()
};i.getSources=function(){return this.model.getSources()};i.getNetworkState=function(){return this.model.get("networkState")
};i.getReadyState=function(){return this.model.get("readyState")};i.getControls=function(){return this.model.get("controls")
};i.setControls=function(o){this.model.set({controls:o});this.playableObject.setControls(o)
};i.getDefaultPlaybackRate=function(){return this.model.getDefaultPlaybackRate()
};i.getSeekable=function(){return this.getBuffered()};i.getDefaultMuted=function(){return this.model.get("defaultMuted")
};i.getSeeking=function(){return this.model.get("seeking")};i.getPlayed=function(){return this.playableObject.getPlayed()
};i.getBuffered=function(){return this.playableObject.getBuffered()};i.getMediaElement=function(){return this.view.getMediaElement()
};i.appendTo=function(){return this.view.appendTo.apply(this.view,arguments)};i.getViewElement=function(){return this.view.el
};c.exports=f},{"./../const/readyState":877,"./../controller/textTracks/NativeTextTracksController":878,"./../models/Video":891,"./../views/mediaView/MediaView":901,"ac-event-emitter":false,"ac-feature":608,"ac-fullscreen":320,"ac-object":707}],884:[function(b,f,a){var g=b("./../../recommendation/vat");
var d=b("./createQuickTime");var h=b("./createHTML5Video");function c(l,i){i=i||{};
var j=i.type||g.get();var k;if(j==="quicktime"){k=d(l,i)}else{k=h(l,i)}return k
}f.exports=c},{"./../../recommendation/vat":898,"./createHTML5Video":886,"./createQuickTime":887}],885:[function(c,d,b){var h=c("./create");
var a=c("./../../models/video/factory/createFromVideoTag");var f=c("./../../recommendation/vat");
function g(m,k){k=k||{};k.element=m;var l=k.type=f.get();var o=a(m,k);var j=o.getSources();
var n;var i=j.find({src:m.currentSrc})[0];if(l==="quicktime"){i=j.find({type:"video/quicktime"})[0];
if(!i&&j.models.length===1){i=j.at(0)}}if(i){o.setSrc(i)}n=h(o,k);if(n.getViewElement()!==m){m.parentNode.replaceChild(n.getViewElement(),m)
}return n}d.exports=g},{"./../../models/video/factory/createFromVideoTag":893,"./../../recommendation/vat":898,"./create":884}],886:[function(h,c,j){var k=h("ac-browser");
var f=h("./../../views/mediaView/HTML5Video");var i=h("./../MediaController");var a=h("./../../adapter/element-adapter");
var d=h("./../../controller/textTracks/NativeTextTracksController");var b=h("./../../controller/textTracks/PolyfillTextTracksController");
var g=h("./../../controller/textTracks/WebkitClosedCaptions");var l=h("./../../models/Video");
var m=function(o,v){v=v||{};if(!(o instanceof l)){o=new l(o)}var n=v.view||new f({model:o,element:v.element,template:"elementVideo"});
var q=n.getMediaElement();var s=a.create(q,"video");var t=k.name.toLowerCase();
var p=(t==="ie"||t==="edge");var r;if(!("textTracks" in q)&&"webkitClosedCaptionsVisible" in q){r=new g(s)
}else{if(p){r=new b(s)}else{r=new d(s)}}if(v.textTracks){v.textTracks.forEach(function(w){var x=w;
if(typeof w==="string"){x={src:w}}r.addTextTrackFromRemoteVTT(x)})}var u=new i(s,{model:o,view:n,textTracks:r});
return u};c.exports=m},{"./../../adapter/element-adapter":871,"./../../controller/textTracks/NativeTextTracksController":878,"./../../controller/textTracks/PolyfillTextTracksController":879,"./../../controller/textTracks/WebkitClosedCaptions":881,"./../../models/Video":891,"./../../views/mediaView/HTML5Video":900,"./../MediaController":883,"ac-browser":54}],887:[function(d,c,g){var h=d("./../../views/mediaView/QuickTime");
var a=d("./../../adapter/element-adapter");var f=d("./../MediaController");var b=d("./../../controller/textTracks/PolyfillTextTracksController");
var j=d("./../../models/Video");var i=function(p,n){var q;var o;var l;var m;var k;
n=n||{};if(!(p instanceof j)){p=new j(p)}m=new h({model:p});l=m.getMediaElement();
q=a.create(l,"quicktime");k=new b(q);if(n.textTracks){n.textTracks.forEach(function(r){var s=r;
if(typeof r==="string"){s={src:r}}k.addTextTrackFromRemoteVTT(s)})}o=new f(q,{model:p,view:m,textTracks:k});
return o};c.exports=i},{"./../../adapter/element-adapter":871,"./../../controller/textTracks/PolyfillTextTracksController":879,"./../../models/Video":891,"./../../views/mediaView/QuickTime":902,"./../MediaController":883}],888:[function(c,f,b){var h=c("ac-mvc-model").Model;
var a=c("ac-object");function d(){h.apply(this,arguments)}var g=d.prototype=a.create(h.prototype);
g.defaultAttributes={};g.getFullyQualifiedURL=function(){var k=this.get("src");
var j;var i=window.location.origin||window.location.protocol+"//"+window.location.hostname;
if(/http(s)?/.test(k)){return k}else{if(k.slice(0,2)==="//"){return window.location.protocol+k
}else{if(k[0]!=="/"){j=window.location.pathname;j=j.substring(0,j.lastIndexOf("/")+1);
return i+j+k}}}return i+k};f.exports=d},{"ac-mvc-model":628,"ac-object":707}],889:[function(c,d,b){var h=c("ac-mvc-model").Model;
var a=c("ac-object");function g(i){h.apply(this,arguments)}var f=g.prototype=a.create(h.prototype);
f.defaultAttributes={mode:"disabled"};f.setNativeTextTrack=function(i){this._textTrackData=i||[]
};f.getNativeTextTrack=function(){if(!this._textTrackData||this._textTrackData.length===0){return false
}return this._textTrackData[0].text};f.setTextTrackEl=function(i){this._textTrackEl=i
};f.getTextTrackEl=function(){return this._textTrackEl};f.getTextTrackInnerEl=function(){return this._textTrackInnerEl
};f.setTextTrackInnerEl=function(i){this._textTrackInnerEl=i};f.getCues=function(){return this._textTrackData
};f.removeCue=function(i){if(typeof i!=="number"){return}if(!this._textTrackData[i]){return
}this._textTrackData.splice(i,1)};f.addCue=function(l,j,k){var i={startTime:l,endTime:j,text:k};
this._textTrackData.push(i)};f.addVTTCue=function(i){if(this._currentVTTCue!==i){this._currentVTTCue=i;
if(this._textTrackInnerEl){this._textTrackInnerEl.innerHTML=i}}};f.removeVTTCue=function(i){if(this._currentVTTCue===i){if(this._textTrackInnerEl){this._textTrackInnerEl.innerHTML=""
}}};f.show=function(){this.set({mode:"showing"})};f.hide=function(){this.set({mode:"hidden"})
};f.disable=function(){this.set({mode:"disabled"})};d.exports=g},{"ac-mvc-model":628,"ac-object":707}],890:[function(c,d,b){var h=c("ac-mvc-model").Model;
var a=c("ac-object");function g(i){h.apply(this,arguments)}var f=g.prototype=a.create(h.prototype);
f.defaultAttributes={mode:"disabled"};f.setNativeTextTrack=function(i){this._nativeTextTrack=i
};f.getNativeTextTrack=function(){return this._nativeTextTrack};f.getCues=function(){return this._nativeTextTrack.cues
};f.removeCue=function(i){this._nativeTextTrack.removeCue(i)};f.addCue=function(l,j,k){var i=new VTTCue(l,j,k);
this.addVTTCue(i)};f.addVTTCue=function(i){this._nativeTextTrack.addCue(i)};f.show=function(){this.set({mode:"showing"})
};f.hide=function(){this.set({mode:"hidden"})};f.disable=function(){this.set({mode:"disabled"})
};d.exports=g},{"ac-mvc-model":628,"ac-object":707}],891:[function(f,c,h){var d=f("ac-mvc-model").Model;
var g=f("ac-object");var l=f("./../collection/MediaSourceCollection");var j=f("./MediaSource");
var b=f("ac-video-posterframe");var a=b.defaultPosterPath();function k(){d.apply(this,arguments);
this._sources=new l();if(this.has("src")){this._addInitSources()}}var i=k.prototype=g.create(d.prototype);
i.defaultAttributes={duration:"NaN",readyState:0,currentTime:0,paused:true,playbackRate:1,ended:false,seeking:false,controls:false,muted:false,volume:1,looping:false,poster:a,defaultPlaybackRate:1,defaultMuted:false,currentSrc:null,preload:"auto"};
i._addInitSources=function(){var m=this.get("src");if(!Array.isArray(m)){m=[m]}m.forEach(this.addSource,this)
};i.findSourcesByFullyQualifiedURL=function(m){return this._sources.filter(function(n){return(n.getFullyQualifiedURL()===m)
})};i.getPoster=function(){return this.get("poster")};i.setAutoplay=function(m){this.set({autoplay:m})
};i.setPoster=function(m){this.set({poster:m})};i.setPreload=function(m){this.set({preload:m})
};i.addSource=function(n){var m=this.createSource(n);this._sources.add(m);this.trigger("source:add",{source:m});
if(this._sources.models.length===1){this.setCurrentSrc(m)}return m};i._coerceMediaSourceData=function(m){if(typeof m==="string"){return{src:m}
}return m};i.createSource=function(m){if((m instanceof j)){return m}return new j(this._coerceMediaSourceData(m))
};i.findSources=function(n,m){if(typeof n==="string"){n={src:n}}return this._sources.find(n,m)
};i.getSources=function(){return this._sources};i.getAutoplay=function(){return this.get("autoplay")
};i.setCurrentTime=function(m){this.set({currentTime:m})};i.getPreload=function(){return this.get("preload")
};i.setSrc=function(m){this.set({currentSrc:m.cid})};i.setCurrentSrc=function(m){this.set({currentSrc:m.cid})
};i.getCurrentSrc=function(){return this._sources.get(this.get("currentSrc"))};
i.setReadyState=function(m){this.set({readyState:m})};i.getDefaultMuted=function(){return this.get("defaultMuted")
};i.getDefaultPlaybackRate=function(){return this.get("defaultPlaybackRate")};i.setLoop=function(m){this.set({loop:m})
};i.getLoop=function(){return this.get("loop")};i.getSeeking=function(){return this.get("seeking")
};i.getReadyState=function(){return this.get("readyState")};i.getDuration=function(){return this.get("duration")
};i.getCurrentTime=function(){return this.get("currentTime")};i.setVolume=function(m){this.set({volume:m})
};i.getVolume=function(){return this.get("volume")};i.getPaused=function(){return this.get("paused")
};i.getPlaybackRate=function(){return this.get("playbackRate")};i.setEnded=function(m){this.set({ended:m})
};i.getEnded=function(){return this.get("ended")};i.getMuted=function(){return this.get("muted")
};i.setPlaybackRate=function(m){this.set({playbackRate:m})};i.setMuted=function(n,m){this.set({muted:n},m)
};c.exports=k},{"./../collection/MediaSourceCollection":872,"./MediaSource":888,"ac-mvc-model":628,"ac-object":707,"ac-video-posterframe":863}],892:[function(b,d,a){var c=b("./../../MediaSource");
function f(g){var i=g.getAttribute("src");var h={src:i};if(g.getAttribute("type")){h.type=g.getAttribute("type")
}return new c(h)}d.exports=f},{"./../../MediaSource":888}],893:[function(c,b,g){var j=c("./../../Video");
var a=c("ac-dom-traversal/querySelectorAll");var d=c("ac-object");var i=c("./../../mediaSource/factory/createFromSourceTag");
function h(k,l){if(l.getAttribute("preload")){k.preload=l.getAttribute("preload")
}}function f(l,m){var k;l.src=[];if(m.getAttribute("src")){l.src.push(i(m))}k=a("source",m);
if(k.length){k=k.map(function(n){return i(n)});l.src=l.src.concat(k)}}b.exports=function(m,o){o=o||{};
var n;var l;var k={paused:m.paused,currentTime:m.currentTime,duration:m.duration,muted:m.muted,volume:m.volume,playbackRate:m.playbackRate,ended:m.ended,readyState:m.readyState,seeking:m.seeking,poster:m.poster,defaultPlaybackRate:m.defaultPlaybackRate,defaultMuted:m.defaultMuted,currentSrc:m.currentSrc,autoplay:m.autoplay};
h(k,m);f(k,m);k=d.extend(k,o);n=new j(k);if(m.currentSrc){l=n.findSourcesByFullyQualifiedURL(m.currentSrc);
if(l&&l[0]){n.setCurrentSrc(l[0])}}return n}},{"./../../Video":891,"./../../mediaSource/factory/createFromSourceTag":892,"ac-dom-traversal/querySelectorAll":197,"ac-object":707}],894:[function(i,a,q){var o=i("ac-mvc-view").View;
var c=i("ac-video-controls");var p=i("./../controls/Native");var r=i("ac-object");
var d=i("ac-fullscreen");var k=i("ac-feature");var f=i("./../const/readyState");
var j=i("ac-video-posterframe");var h=i("ac-dom-events/addEventListener");var b=i("ac-classlist/add");
var g=i("ac-classlist/remove");var n=i("ac-classlist/contains");var s="user-hover";
function m(){o.apply(this,arguments);if(this.options.mediaController){this.setMediaController(this.options.mediaController)
}this.poster=null;this._initPoster();this._initControls();this._listenForFullscreenEvents();
if(k.isDesktop()){this._appendBlockade()}}m.LOADEDMETADATA=f.LOADEDMETADATA;m.LOADEDDATA=f.LOADEDDATA;
m.CANPLAY=f.CANPLAY;m.CANPLAYTHROUGH=f.CANPLAYTHROUGH;var l=m.prototype=r.create(o.prototype);
l.defaultOptions={controlsTimeoutDuration:5000};l.className="ac-video-player";l._appendBlockade=function(){var t=new o({className:"ac-video-blockade"});
t.appendTo(this.el);this._blockade=t};l._onEnterFullscreen=function(t){if(t.target===this.getFullscreenTargetElement()){this.trigger("enterfullscreen",t)
}};l._onExitFullscreen=function(t){if(t.target===this.getFullscreenTargetElement()){this.trigger("exitfullscreen",t)
}};l._listenForFullscreenEvents=function(){d.on("enterfullscreen",this._onEnterFullscreen,this);
d.on("exitfullscreen",this._onExitFullscreen,this)};l._unbindFullscreenEvents=function(){d.off("enterfullscreen",this._onEnterFullscreen,this);
d.off("exitfullscreen",this._onExitFullscreen,this)};l.destroy=function(){o.prototype.destroy.call(this);
this._unbindFullscreenEvents()};l._initPoster=function(){var t=null;if(this.mediaController.hasPoster()&&this.poster===null){t=j.create(this.mediaController);
t.render();if(t.el.parentNode!==this.el){t.appendTo(this.el)}this.poster=t}};l._destroyPoster=function(){if(this.poster&&this.poster.el.parentNode===this.el){this.el.removeChild(this.poster.el)
}this.poster=null};l.getFullscreenTargetElement=function(){return(d.getMode()==="ios"?this.getMediaElement():this.el)
};l.toggleFullscreen=function(){if(this.isFullscreen()){this.exitFullscreen()}else{this.requestFullscreen()
}};l.isFullscreen=function(){return(d.fullscreenElement()===this.getFullscreenTargetElement())
};l.requestFullscreen=function(){var t=this.getFullscreenTargetElement();if(d.fullscreenEnabled(t)){d.requestFullscreen(t)
}};l.exitFullscreen=function(){d.exitFullscreen(this.getFullscreenTargetElement())
};l._instantiateDefaultCustomUIControls=function(){var v=this._instantiateControls(c);
if(v.el.parentNode!==this.el&&typeof v.appendTo==="function"){v.appendTo(this.el)
}var x;var w={};var t=function(y){if(y.pageX!==undefined&&(w.x===y.pageX&&w.y===y.pageY)){return
}if(!n(this.el,s)){b(this.el,s)}window.clearTimeout(x);x=window.setTimeout(function(){g(this.el,s)
}.bind(this),this.options.controlsTimeoutDuration);w={x:y.pageX,y:y.pageY}}.bind(this);
h(this.el,"mouseenter",t);h(this.el,"mousemove",t);var u=function(){window.clearTimeout(x);
g(this.el,s);w={}};if("onmouseleave" in this.el){h(this.el,"mouseleave",u.bind(this))
}else{h(this.el,"mouseout",function(y){if(!v.el.contains(y.target)&&y.target!==v.el){u.call(this)
}}.bind(this),true)}return v};l._instantiateControls=function(t){if(typeof t.create!=="function"){return t
}return t.create({player:this.mediaController,fullScreenElement:this.getFullscreenTargetElement()})
};l._instantiateNonHandheldControls=function(){var u=this.options.controls;var t;
if(u===false||u===null){t=null}else{if(u!==undefined){t=this._instantiateControls(u)
}else{if(k.isDesktop()){t=this._instantiateDefaultCustomUIControls()}else{t=this._instantiateControls(p)
}}}return t};l._instantiateHandheldControls=function(){return this._instantiateControls(p)
};l._initControls=function(){var t;if(!k.isHandheld()){t=this._instantiateNonHandheldControls()
}else{t=this._instantiateHandheldControls()}this.controls=t};l.setMediaController=function(t){if(this.mediaController){this.mediaController.stopPropagatingTo(this)
}this.mediaController=t;this.mediaController.propagateTo(this._eventEmitter)};l.getVideo=function(){return this.mediaController.getVideo()
};l.play=function(){return this.mediaController.play()};l.pause=function(){return this.mediaController.pause()
};l.getPaused=function(){return this.mediaController.getPaused()};l.setMuted=function(t){return this.mediaController.setMuted(t)
};l.getMuted=function(){return this.mediaController.getMuted()};l.getEnded=function(){return this.mediaController.getEnded()
};l.setVolume=function(t){return this.mediaController.setVolume(t)};l.getVolume=function(){return this.mediaController.getVolume()
};l.setCurrentTime=function(t){return this.mediaController.setCurrentTime(t)};l.getCurrentTime=function(){return this.mediaController.getCurrentTime()
};l.getPreload=function(){return this.mediaController.getPreload()};l.setPreload=function(t){return this.mediaController.setPreload(t)
};l.setPlaybackRate=function(t){return this.mediaController.setPlaybackRate(t)};
l.getPlaybackRate=function(){return this.mediaController.getPlaybackRate()};l.getDuration=function(){return this.mediaController.getDuration()
};l.setLoop=function(t){return this.mediaController.setLoop(t)};l.getLoop=function(){return this.mediaController.getLoop()
};l.getError=function(){return this.mediaController.getError()};l.getPoster=function(){return this.mediaController.getPoster()
};l.getMediaWidth=function(){return this.mediaController.getWidth()};l.getMediaHeight=function(){return this.mediaController.getHeight()
};l.setPoster=function(){this.mediaController.setPoster.apply(this.mediaController,arguments);
if(this.mediaController.hasPoster()){this._initPoster()}else{this._destroyPoster()
}};l.setSrc=function(){return this.mediaController.setSrc.apply(this.mediaController,arguments)
};l.getCurrentSrc=function(){return this.mediaController.getCurrentSrc()};l.getSources=function(){return this.mediaController.getSources()
};l.getNetworkState=function(){return this.mediaController.getNetworkState()};l.getReadyState=function(){return this.mediaController.getReadyState()
};l.getDefaultPlaybackRate=function(){return this.mediaController.getDefaultPlaybackRate()
};l.getSeekable=function(){return this.mediaController.getSeekable()};l.getDefaultMuted=function(){return this.mediaController.getDefaultMuted()
};l.getSeeking=function(){return this.mediaController.getSeeking()};l.getStartDate=function(){return this.mediaController.getStartDate()
};l.getPlayed=function(){return this.mediaController.getPlayed()};l.getBuffered=function(){return this.mediaController.getBuffered()
};l.getTextTracks=function(){return this.mediaController.getTextTracks()};l.getTextTracksCount=function(){return this.mediaController.getTextTracksCount()
};l.addTextTrackFromRemoteVTT=function(){return this.mediaController.addTextTrackFromRemoteVTT.apply(this.mediaController,arguments)
};l.addTextTrack=function(){return this.mediaController.addTextTrack.apply(this.mediaController,arguments)
};l.removeTextTrack=function(){return this.mediaController.removeTextTrack.apply(this.mediaController,arguments)
};l.getEnabledTextTracks=function(){return this.mediaController.getEnabledTextTracks.apply(this.mediaController,arguments)
};l.getVisibleTextTracks=function(){return this.mediaController.getVisibleTextTracks.apply(this.mediaController,arguments)
};l.findTextTrack=function(t){return this.mediaController.findTextTrack(t)};l.findTextTrackModelFromNativeTrack=function(t){return this.mediaController.findTextTrackModelFromNativeTrack(t)
};l.getMediaElement=function(){return this.mediaController.getMediaElement()};a.exports=m
},{"./../const/readyState":877,"./../controls/Native":882,"ac-classlist/add":553,"ac-classlist/contains":558,"ac-classlist/remove":561,"ac-dom-events/addEventListener":597,"ac-feature":608,"ac-fullscreen":320,"ac-mvc-view":704,"ac-object":707,"ac-video-controls":781,"ac-video-posterframe":863}],895:[function(f,g,c){var d=f("./../Player");
var h=f("./../../mediaController/factory/create");var a=f("ac-dom-nodes");var b=f("./../../collection/playerCollection");
g.exports=function(k,i){i=i||{};var j;if(!i.mediaController){i.mediaController=h(k,i)
}j=new d(i);if(i.mediaController.getViewElement().parentNode!==j.el){a.insertFirstChild(i.mediaController.getViewElement(),j.el)
}if(!i.preventCollection){b.add(j)}return j}},{"./../../collection/playerCollection":875,"./../../mediaController/factory/create":884,"./../Player":894,"ac-dom-nodes":148}],896:[function(d,g,c){var h=d("./../../config/VideoConfig");
var a=d("./../../models/Video");var b=d("./create");var f=function(i){var j=new h();
var l;var m;j.getConfig(i,{},{}).then(function(n){n.id=i.id;l=n;m=n.source});var k=new a({src:m});
return b(k)};g.exports=f},{"./../../config/VideoConfig":876,"./../../models/Video":891,"./create":895}],897:[function(c,b,g){var d=c("./create");
var i=c("./../../mediaController/factory/createFromVideoTag");var a=c("ac-dom-traversal/querySelectorAll");
var h=c("ac-dom-traversal/querySelector");function f(m){var k=a("source",m);var l=0;
for(l;l<k.length;l+=1){k[l].parentNode.removeChild(k[l])}}var j=function(l,k){k=k||{};
var m=h("video",l);if(m===null){m=document.createElement("video");l.appendChild(m)
}if(typeof k.src!=="undefined"&&k.src!==null){f(m)}k.mediaController=i(m,k);k.element=l;
return d(null,k)};b.exports=j},{"./../../mediaController/factory/createFromVideoTag":885,"./create":895,"ac-dom-traversal/querySelector":196,"ac-dom-traversal/querySelectorAll":197}],898:[function(b,d,a){var c=b("ac-browser");
d.exports={get:function(){var f="html5";if(c.name==="IE"&&c.version<9){f="quicktime"
}return f}}},{"ac-browser":54}],899:[function(b,c,a){var f=b("ac-mvc-view").View;
function g(){f.apply(this,arguments)}var d=g.prototype=new f();d.tagName="source";
d.render=function(){this.el.setAttribute("src",this.model.get("src"));if(this.model.has("type")){this.el.setAttribute("type",this.model.get("type"))
}};c.exports=g},{"ac-mvc-view":704}],900:[function(c,b,f){var a=c("./MediaView");
var j=c("./../MediaSourceTag");var d=c("ac-object");var g=c("ac-dom-traversal/querySelector");
function i(){a.apply(this,arguments)}var h=i.prototype=d.create(a.prototype);h.tagName="video";
h._renderBooleanAttribute=function(k,m){var l=this.getMediaElement();if(m===true){l.setAttribute(k,"")
}else{l.removeAttribute(k)}};h._findExistingSourceOrTrackElement=function(m){var k;
var l;if(m.has("src")){l='[src="'+m.get("src")+'"]';k=g(l,this.el)}return k};h._appendSource=function(n){var l=this.getMediaElement();
var m=this._findExistingSourceOrTrackElement(n);var k=new j({model:n,element:m});
k.render();if(!m){k.appendTo(l)}};h._onSourceAdd=function(k){this._appendSource(k.source)
};h._renderPreload=function(){var k=this.getMediaElement();k.setAttribute("preload",this.model.getPreload())
};h._renderAutoplay=function(){this._renderBooleanAttribute("autoplay",this.model.getAutoplay())
};h._renderMuted=function(){this._renderBooleanAttribute("muted",this.model.getMuted())
};h._renderAirplay=function(){this._renderBooleanAttribute("x-webkit-airplay",true)
};h._renderCrossOrigin=function(){var k=this.getMediaElement();if(this.model.has("crossorigin")){k.setAttribute("crossorigin",this.model.get("crossorigin"))
}};h._renderCurrentSrc=function(){var k=this.model.getCurrentSrc();if(k){this.el.setAttribute("src",k.get("src"))
}};h._renderLoop=function(){var k=this.model.getLoop();this._renderBooleanAttribute("loop",k)
};h._respondToAddTrackEvent=function(k){this.emitterTrigger("addtrack",k.data)};
h.getSourceAttribute=function(){return this.getMediaElement().getAttribute("src")
};h.render=function(){var k=this.getMediaElement();this.model.on("source:add",this._onSourceAdd,this);
this.model.on("change:autoplay",this._renderAutoplay,this);this.model.on("change:muted",this._renderMuted,this);
this.model.on("change:preload",this._renderPreload,this);this.model.on("change:currentSrc",this._renderCurrentSrc,this);
this.model.on("change:crossorigin",this._renderCrossOrigin,this);this.model.getSources().forEach(this._appendSource,this);
this._renderAutoplay();this._renderPreload();this._renderMuted();this._renderAirplay();
this._renderCrossOrigin();this._renderCurrentSrc();this._renderLoop();if(this.model.id){k.setAttribute("id",this.model.id)
}};b.exports=i},{"./../MediaSourceTag":899,"./MediaView":901,"ac-dom-traversal/querySelector":196,"ac-object":707}],901:[function(c,b,f){var g=c("ac-dom-traversal/querySelector");
var i=c("ac-browser");var j=c("ac-mvc-view").View;var d=c("ac-object");function a(){this._mediaElement=null;
j.apply(this,arguments)}var h=a.prototype=d.create(j.prototype);h.className="ac-video-media-controller";
h._findMediaElementByTagName=function(k){if(this.getTagName()===k){return this.el
}return g(k,this.el)};h.renderTextTrack=function(){};h._findMediaElement=function(){if(this._findMediaElementByTagName("video")){return this._findMediaElementByTagName("video")
}else{if(i.name!=="IE"){return this._findMediaElementByTagName("embed")}}return this._findMediaElementByTagName("object")
};h.getMediaElement=function(){return this._findMediaElement()};b.exports=a},{"ac-browser":54,"ac-dom-traversal/querySelector":196,"ac-mvc-view":704,"ac-object":707}],902:[function(f,c,i){var b=f("./MediaView");
var d=f("./eventAdapters/QuickTime");var m=f("./eventAdapters/quicktimeEventsElement");
var h=f("ac-object");var l=f("ac-browser");var g=(l.os.toLowerCase()==="windows");
var a=f("ac-dom-traversal");function k(){b.apply(this,arguments);this._hasRendered=false;
this.model.on("change:currentSrc",this._renderString,this)}var j=k.prototype=h.create(b.prototype);
j._renderID=function(){this._objectStr+=' id="quicktime-movie-'+Date.now()+'"'};
j._renderClsidAttr=function(){this._objectStr+=' classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B"'
};j._renderCodebaseAttr=function(){this._objectStr+=' codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=7,2,1,0"'
};j._renderWModeAttr=function(){this._renderParamAttr("wmode","transparent");this._renderEmbedAttr("wmode","transparent")
};j._renderPostDomEventsAttr=function(){this._objectStr+=' postdomevents="true"'
};j._renderBehaviorAttr=function(){var n=m.getID();if(n){this._objectStyles.push("behavior:url('#"+n+"')")
}};j._renderAutoplay=function(){var n=(this.model.getAutoplay()===true)?"True":"False";
this._renderAttr("autoplay",n)};j._renderVolume=function(){var n=this.model.getMuted();
var o=this.model.getVolume()*256;if(n){o=0}this._renderAttr("volume",o)};j._renderLoop=function(){var n=(this.model.getLoop()===true)?"True":"False";
this._renderAttr("loop",n)};j._renderAttr=function(o,n){this._renderParamAttr(o,n);
this._renderEmbedAttr(o,n)};j._closeOpeningObjectTag=function(){this._objectStr+=">"
};j._renderParamAttr=function(o,n){this._objectStr+='<param name="'+o+'" value="'+n+'" />'
};j._renderEmbedAttr=function(o,n){this._embedStr+=" "+o+'="'+n+'"'};j._closeEmbedTag=function(){this._embedStr+=" />"
};j._closeObjectTag=function(){this._objectStr+="</object>"};j._renderSrc=function(){var n=this.model.getCurrentSrc();
if(n){this._renderAttr("src",n.get("src"))}};j._renderStyleAttr=function(){this._objectStr+=' style="'+this._objectStyles.join(";")+';"';
this._embedStr+=' style="'+this._embedStyles.join(";")+';"'};j.getSourceAttribute=function(){return this.getMediaElement().getAttribute("src")
};j._renderOffscreen=function(){var s=window.screen.width+10;var n=window.screen.height+10;
var q=Math.max(s,n);var p="width:"+q+"px";var r="height:"+q+"px";var t="position:fixed";
var o="left:"+s+"px";this._embedStyles.push(p);this._embedStyles.push(r);this._embedStyles.push(t);
this._embedStyles.push(o);this._objectStyles.push(p);this._objectStyles.push(r);
this._objectStyles.push(t);this._objectStyles.push(o);this._renderStyleAttr()};
j._doneRenderOffscreen=function(){var p=a.querySelector("embed",this.el);var n=a.querySelector("object",this.el);
var o=n.style.cssText.toLowerCase().match(/behavior\((.)+\)/);if(o){n.setAttribute("style",o)
}else{n.removeAttribute("style")}if(p){p.removeAttribute("style")}};j._renderString=function(){var n=(l.name.toLowerCase()==="ie"&&l.version<9);
this._objectStr="<object";this._embedStr="<embed";this._objectStyles=[];this._embedStyles=[];
this._renderClsidAttr();this._renderCodebaseAttr();this._renderID();this._renderPostDomEventsAttr();
this._renderBehaviorAttr();if(g){if(!n){this._renderOffscreen()}else{this._renderStyleAttr()
}}this._closeOpeningObjectTag();this._renderWModeAttr();this._renderAutoplay();
this._renderSrc();this._renderVolume();this._renderLoop();this._renderAttr("enablejavascript","true");
this._renderAttr("postdomevents","true");this._renderAttr("scale","tofit");this._renderAttr("controller","false");
this._renderEmbedAttr("pluginspage","www.apple.com/quicktime/download");this._renderParamAttr("kioskmode","true");
this._renderParamAttr("pluginspace","http://www.apple.com/qtactivex/qtplugin.cab");
this._closeEmbedTag();this._objectStr+=this._embedStr;this._closeObjectTag();this.el.innerHTML=this._objectStr;
this._quickTimeEvents=new d(this.getMediaElement(),this);this.emitterTrigger("mediaelementchange",{});
if(g&&!n){window.requestAnimationFrame(function(){this._doneRenderOffscreen()}.bind(this))
}};j.render=function(){if(this._hasRendered===true){return}this._hasRendered=true;
this._renderString()};c.exports=k},{"./MediaView":901,"./eventAdapters/QuickTime":903,"./eventAdapters/quicktimeEventsElement":906,"ac-browser":54,"ac-dom-traversal":183,"ac-object":707}],903:[function(b,a,f){var j=b("ac-dom-emitter").DOMEmitter;
var h=b("./QuickTimeTimeUpdate");var i=b("./QuickTimePluginReady");var c=b("ac-object");
function d(k,l){j.call(this,k);if(this._isObjectTag()===false){this._aliasEvents()
}else{this._plugin=new i(k);this._plugin.once("ready",function(){this._plugin=undefined;
this._aliasEvents()},this);this._plugin.poll()}this._propagationTarget=l}var g=d.prototype=c.create(j.prototype);
g._bubble=function(k){this._propagationTarget.emitterTrigger(k,{target:this.el})
};g._onTimeupdateObserverTimeUpdate=function(){this._bubble("timeupdate")};g._onQTPlay=function(){this._timeupdateObserver.listenForTimeUpdate();
this._bubble("play")};g._onQTPause=function(){this._timeupdateObserver.stopListenForTimeUpdate();
this._bubble("pause")};g._onQTEnded=function(){this._timeupdateObserver.stopListenForTimeUpdate();
this._bubble("ended")};g._onQTBegin=function(){this._bubble("loadstart")};g._onQTVolumeChange=function(){this._bubble("volumechange")
};g._onQTProgressChange=function(){this._bubble("progress")};g._onQTError=function(){this._bubble("error")
};g._onQTStalled=function(){this._bubble("stalled")};g._onQTCanPlay=function(){this._bubble("canplay")
};g._onQTCanPlayThrough=function(){this._bubble("canplaythrough")};g._onQTDurationChange=function(){this._bubble("durationchange")
};g._onQTLoadedMetaData=function(){this._bubble("loadedmetadata")};g._onQTloadedFirstFrame=function(){this._bubble("loadeddata")
};g._onQTWaiting=function(){this._bubble("waiting")};g._onQTTimeChanged=function(){this._bubbleTimeUpdate()
};g._bubbleTimeUpdate=function(){this._bubble("timeupdate")};g._isObjectTag=function(){return(this.el.tagName.toLowerCase()==="object")
};g._getEventName=function(k){if(this._isObjectTag()){return"on"+k}return k};g._bindEvents=function(n,m,l){var k=this._getEventName(n);
if(typeof this.el.attachEvent==="function"){this.el.attachEvent(k,function(o){m.call(l,o)
})}else{this.on(n,m,l)}};g._aliasEvents=function(){this._bindEvents("qt_play",this._onQTPlay,this);
this._bindEvents("qt_pause",this._onQTPause,this);this._bindEvents("qt_begin",this._onQTBegin,this);
this._bindEvents("qt_volumechange",this._onQTVolumeChange,this);this._bindEvents("qt_progress",this._onQTProgressChange,this);
this._bindEvents("qt_error",this._onQTError,this);this._bindEvents("qt_stalled",this._onQTStalled,this);
this._bindEvents("qt_canplay",this._onQTCanPlay,this);this._bindEvents("qt_canplaythrough",this._onQTCanPlayThrough,this);
this._bindEvents("qt_durationchange",this._onQTDurationChange,this);this._bindEvents("qt_ended",this._onQTEnded,this);
this._bindEvents("qt_loadedmetadata",this._onQTLoadedMetaData,this);this._bindEvents("qt_loadedfirstframe",this._onQTloadedFirstFrame,this);
this._bindEvents("qt_waiting",this._onQTWaiting,this);this._bindEvents("qt_timechanged",this._onQTTimeChanged,this);
this._timeupdateObserver=new h(this.el);this._timeupdateObserver.on("timeupdate",this._onTimeupdateObserverTimeUpdate,this)
};a.exports=d},{"./QuickTimePluginReady":904,"./QuickTimeTimeUpdate":905,"ac-dom-emitter":594,"ac-object":707}],904:[function(c,d,b){var g=c("ac-event-emitter").EventEmitter;
var a=c("ac-object");function h(i){g.call(this);this._movie=i;this._pollInterval=5;
this._boundPoll=this.poll.bind(this)}var f=h.prototype=a.create(g.prototype);f._resetMovieUrl=function(){var i=this._movie;
var j;i.SetResetPropertiesOnReload(false);j=i.GetURL();i.autoplay=true;j+=(j.indexOf("?")!==-1)?"&rnd="+Math.random():"?rnd="+Math.random();
i.SetURL(j)};f.getPluginStatus=function(){var i="";try{i=this._movie.GetPluginStatus()
}catch(j){}return i};f.isAPIAvailable=function(){var i;try{this._movie.GetVolume();
i=true}catch(j){i=false}return i};f.isReady=function(){return/(Complete)/i.test(this.getPluginStatus())
};f._triggerReady=function(){this.trigger("ready")};f.poll=function(){if(this.isReady()){this._resetMovieUrl();
this._triggerReady()}else{setTimeout(this._boundPoll,this._pollInterval)}};d.exports=h
},{"ac-event-emitter":false,"ac-object":707}],905:[function(c,f,b){var h=c("ac-event-emitter").EventEmitter;
var a=c("ac-object");var d=300;function i(j){this.mediaElement=j;this._isListeningForTimeUpdate=false;
this._boundTick=null;this._lastTimeCheck=0;this._timeout=null}var g=i.prototype=a.create(h.prototype);
g.listenForTimeUpdate=function(){this._isListeningForTimeUpdate=true;this._boundTick=this._tick.bind(this);
window.setTimeout(this._boundTick,d)};g.stopListenForTimeUpdate=function(){window.clearTimeout(this._timeout);
this._isListeningForTimeUpdate=false;this._boundTick=null;this._timeout=null};g.getCurrentTime=function(){return this.mediaElement.GetTime()/this.mediaElement.GetTimeScale()
};g._tick=function(){var j=this.getCurrentTime();if(j!==this._lastTimeCheck){this.trigger("timeupdate")
}this._lastTimeCheck=j;if(this._isListeningForTimeUpdate&&this._boundTick){this._timeout=window.setTimeout(this._boundTick,d)
}};f.exports=i},{"ac-event-emitter":false,"ac-object":707}],906:[function(b,d,a){var c=b("ac-browser");
var g=function(k,i){var j=(k.toUpperCase()==="IE"&&i<9);if(!j){return}this.id="quicktime-events-element-"+Date.now();
this.el=document.createElement("object");this._setAttributes({id:this.getID(),wmode:"transparent",classid:"clsid:CB927D12-4FF7-4a9e-A169-56E4B8A75598",codebase:"http://www.apple.com/qtactivex/qtplugin.cab#version=7,2,1,0"});
this.appendToBody()};var f=g.prototype;f.appendToBody=function(){document.write(this.el.outerHTML)
};f.getID=function(){return this.id};f._setAttributes=function(j){for(var i in j){this.el.setAttribute(i,j[i])
}};var h=new g(c.name,c.version);d.exports=h;d.exports.C=g},{"ac-browser":54}],907:[function(d,c,f){var l=d("ac-mvc-view").View;
var h=d("./TextTrackDiv");var b=d("ac-object");var i=d("ac-dom-styles");var j=d("ac-dom-traversal/firstChild");
var m=d("ac-ajax-xhr");var a=d("ac-console");function k(){l.apply(this,arguments);
this.textTracks=[];this.textTrackEl=null;this.textTrackInnerEl=null;this.isVisible=false;
this._textTrackDivs=[];this.loadExistingTextTracksSrc()}var g=k.prototype=b.create(l.prototype);
g.loadExistingTextTracksSrc=function(){var o=(this.el&&this.el.children)?this.el.children:[];
var n=o.length;var p;while(n--){if(o[n]&&o[n].nodeName==="TRACK"){p=o[n].getAttribute("src");
break}}if(p){this.loadVTTFile(p)}};g.loadVTTFile=function(p,o){var n=p;var q={complete:function(s,r){},data:{},error:function(s,r){a.log(JSON.stringify(s))
},headers:{},success:function(s,r,t){this._vttFileLoadSuccess(s,o)}.bind(this),timeout:5000};
m.get(n,q)};g._vttFileLoadSuccess=function(p,n){var o=this.addTextTrackTag(n);this.textTrackEl=o.el;
this.textTrackInnerEl=j(this.textTrackEl);this.textTracks=this._formatVTTToModel(p);
this._publishAddTrack(this.textTracks)};g._publishAddTrack=function(n){this.emitterTrigger("addtrack",{track:n,textTrackEl:this.textTrackEl,textTrackInnerEl:this.textTrackInnerEl})
};g._publishRemoveTrack=function(n){this.emitterTrigger("removetrack",{track:n})
};g.show=function(){if(!this.textTrackEl||this.isVisible){return}i.setStyle(this.textTrackEl,{display:"inline-block"});
if(this.textTrackInnerEl){i.setStyle(this.textTrackInnerEl,{display:"inline-block"})
}this.isVisible=true};g.hide=function(){if(!this.textTrackEl||!this.isVisible){return
}i.setStyle(this.textTrackEl,{display:"none"});if(this.textTrackInnerEl){i.setStyle(this.textTrackInnerEl,{display:"none"})
}this.isVisible=false};g._createTextTrackDiv=function(n){var o=new h({model:n});
o.render();this.on("canplay",function(){o.appendTo(this.el.parentNode);this._textTrackDivs.push(o)
}.bind(this));return o};g.addTextTrackTag=function(n){return this._createTextTrackDiv(n)
};g._findTextTrackTagFromModel=function(p){var o=this._textTrackDivs.length;var q={};
for(var n=0;n<o;n++){if(this._textTrackDivs[n].model.cid===p.cid){q.div=this._textTrackDivs[n];
q.idx=n;break}}return q};g.removeTextTrackDiv=function(n){var o=this._findTextTrackTagFromModel(n);
if(o.div){o.div.destroy();this._textTrackDivs.splice(o.idx,1)}this._publishRemoveTrack(n.getCues())
};g._formatVTTToModel=function(t){var r=t.split(/\n/);var s=/([\d]{2}:)?[\d]{2}:[\d]{2}.[\d]{3}( \-\-> ){1}([\d]{2}:)?[\d]{2}:[\d]{2}.[\d]{3}/;
var q=[];var o;var u;var p=0;var n=r.length;for(p;p<n;p++){u="";if(s.test(r[p])){o=r[p].split(" --> ");
o[0]=o[0].split(":").length<3?"00:"+o[0]:o[0];o[1]=o[1].split(":").length<3?"00:"+o[1]:o[1];
while(++p&&p<n&&!s.test(r[p])){if(r[p]!==""){u+=r[p]+"<br />"}}u=u.substr(0,u.length-6);
if(p<n){p--}q.push({startTime:o[0].split(".")[0],endTime:o[1].split(".")[0],text:u})
}}return q};c.exports=k},{"./TextTrackDiv":908,"ac-ajax-xhr":548,"ac-console":562,"ac-dom-styles":605,"ac-dom-traversal/firstChild":182,"ac-mvc-view":704,"ac-object":707}],908:[function(c,d,a){var i=c("ac-mvc-view").View;
var b=c("ac-object");var h=c("ac-dom-styles");function g(){i.apply(this,arguments)
}var f=g.prototype=b.create(i.prototype);f.tagName="div";f.render=function(){var j=document.createElement("div");
h.setStyle(this.el,{display:"none",position:"absolute","z-index":"9",bottom:"20%",left:"0",right:"0","text-align":"center"});
h.setStyle(j,{display:"none",padding:"2px 4px","font-family":"Arial","font-weight":"700","font-size":"24px",color:"white","text-align":"center","background-color":"black"});
this.el.setAttribute("id",this.model.cid);this.el.appendChild(j)};d.exports=g},{"ac-dom-styles":605,"ac-mvc-view":704,"ac-object":707}],909:[function(c,f,a){var h=c("ac-mvc-view").View;
var b=c("ac-object");function d(){h.apply(this,arguments)}var g=d.prototype=b.create(h.prototype);
g._onModeChange=function(i){this.renderMode()};g.renderMode=function(){var i=this.model.get("mode");
this.el.mode=i};g.render=function(){this.model.on("change:mode",this._onModeChange,this)
};f.exports=d},{"ac-mvc-view":704,"ac-object":707}],910:[function(d,f,b){var h=d("ac-mvc-view").View;
var c=d("ac-object");function a(){h.apply(this,arguments)}var g=a.prototype=c.create(h.prototype);
g.tagName="track";g.render=function(){["src","type","label","kind","srclang"].forEach(function(i){if(this.model.has(i)){this.el.setAttribute(i,this.model.get(i))
}},this);this.el.setAttribute("id",this.model.cid)};f.exports=a},{"ac-mvc-view":704,"ac-object":707}],911:[function(d,f,b){var h=d("ac-mvc-view").View;
var i=d("./TextTrackTag");var c=d("ac-object");function a(){h.apply(this,arguments);
this._textTracks=this.el.textTracks;this._textTrackTags=[];this.addTextTrackEvents()
}var g=a.prototype=c.create(h.prototype);g.addTextTrackEvents=function(){if(this._textTracks){this._boundRespondToAddTrackEvent=this._respondToAddTrackEvent.bind(this);
this._boundRespondToChangeEvent=this._respondToChangeEvent.bind(this);this._boundRespondToRemoveTrackEvent=this._respondToRemoveTrackEvent.bind(this);
this._textTracks.addEventListener("addtrack",this._boundRespondToAddTrackEvent);
this._textTracks.addEventListener("change",this._boundRespondToChangeEvent);this._textTracks.addEventListener("removetrack",this._boundRespondToRemoveTrackEvent)
}};g.removeTextTrackEvents=function(){this._boundRespondToAddTrackEvent=null;this._boundRespondToChangeEvent=null;
this._boundRespondToRemoveTrackEvent=null;this._textTracks.removeEventListener("addtrack",this._boundRespondToAddTrackEvent);
this._textTracks.removeEventListener("change",this._boundRespondToChangeEvent);
this._textTracks.removeEventListener("removetrack",this._boundRespondToRemoveTrackEvent)
};g._respondToAddTrackEvent=function(j){this._addIdToTextTrackEventData(j);this.emitterTrigger("addtrack",{track:j.track})
};g._respondToChangeEvent=function(j){this.emitterTrigger("change",j)};g._respondToRemoveTrackEvent=function(j){this._addIdToTextTrackEventData(j);
this.emitterTrigger("removetrack",{track:j.track})};g._addIdToTextTrackEventData=function(j){if(j&&j.track&&this._textTrackId&&!j.track.id){try{j.track.id=this._textTrackId
}catch(k){}this._textTrackId=null}return j};g._createTextTrackTag=function(j){var k=new i({model:j});
k.render();this._textTrackId=k.el.id;k.appendTo(this.el);this._textTrackTags.push(k)
};g.addTextTrackTag=function(j){this._createTextTrackTag(j)};g._findTextTrackTagFromModel=function(k){var m=this._textTrackTags.length;
var l={};for(var j=0;j<m;j++){if(this._textTrackTags[j].model.cid===k.cid){l.tag=this._textTrackTags[j];
l.idx=j;break}}return l};g.removeTextTrackTag=function(j){var k=this._findTextTrackTagFromModel(j);
if(k.tag){k.tag.destroy();this._textTrackTags.splice(k.idx,1)}};f.exports=a},{"./TextTrackTag":910,"ac-mvc-view":704,"ac-object":707}],912:[function(c,d,a){var h=c("ac-mvc-view").View;
var b=c("ac-object");function f(){h.apply(this,arguments)}var g=f.prototype=b.create(h.prototype);
g._onModeChange=function(i){this._renderMode()};g._renderMode=function(){var i=this.model.get("mode");
if(i==="showing"){this.el.webkitClosedCaptionsVisible=true}else{this.el.webkitClosedCaptionsVisible=false
}};g.setModel=function(i){if(this.model){this.model.off("change:mode",this._onModeChange,this)
}this.model=i;this.listen()};g.listen=function(){this.model.on("change:mode",this._onModeChange,this)
};g.render=function(){this._renderMode();this.listen()};d.exports=f},{"ac-mvc-view":704,"ac-object":707}],913:[function(b,c,a){c.exports=b("ac-video-player")
},{"ac-video-player":868}],914:[function(b,c,a){c.exports={create:b("./ac-films/factory/films")}
},{"./ac-films/factory/films":920}],915:[function(d,c,g){var i=d("ac-analytics");
var l=d("ac-event-emitter").EventEmitter;var a=d("ac-dom-traversal");var k=d("ac-browser");
var b=d("ac-object");var f={dataAttribute:"analytics-video-id"};function j(n,m){this.player=n;
this.sources={};this.currentStubPlayer=null;this.playerType="";this.videoType="";
this.options=b.defaults(f,m||{})}var h=j.prototype;h.activate=function(){this.player.on("play",this._onPlay,this);
this.player.on("ended",this._onEnded,this);this.player.on("timeupdate",this._onTimeupdate,this);
this.player.on("texttrackshow",this._onTexttrackshow,this);this.player.on("durationchange",this.setCurrentStubPlayer,this)
};h.deactivate=function(){this.player.off("play",this._onPlay,this);this.player.off("ended",this._onEnded,this);
this.player.off("timeupdate",this._onTimeupdate,this);this.player.off("texttrackshow",this._onTexttrackshow,this);
this.player.off("durationchange",this.setCurrentStubPlayer,this)};h.addSourceObject=function(m){var o;
var n;if(m&&m.id&&m.element){if(this.sources[m.id]){return}o=this._createStubPlayer(m.element);
n=m.element.getAttribute("data-"+this.options.dataAttribute);if(!n){o.videoId=m.id
}this.sources[m.id]={stubPlayer:o,observer:this._createObserver(o)}}};h.setCurrentStubPlayer=function(){var n;
var p=this.player.el;var o=p.getAttribute("data-"+this.options.dataAttribute);var m=this._getCurrentSourceObject(o);
if(m&&m.stubPlayer){this.currentStubPlayer=m.stubPlayer;this.playerType=(k.name.toLowerCase()==="ie"&&k.version<9)?"quicktime":"html5";
n=this.player.getCurrentSrc();if(n&&n.attributes&&n.attributes.src){this.videoType=n.attributes.src.split(".").pop()
}}};h.destroy=function(){this.deactivate();this.player=null;this.sources=null;this.currentStubPlayer=null;
this.options=null};h._onPlay=function(){this.setCurrentStubPlayer();this._proxyEvent("play")
};h._onEnded=function(){this._proxyEvent("ended")};h._onTimeupdate=function(){this._proxyEvent("timeupdate")
};h._onTexttrackshow=function(){this._proxyEvent("captions-enabled")};h._getSourceObjectBySrcObjId=function(m){return this.sources[m]||null
};h._getCurrentSourceObject=function(m){var n;if(m){n=this._getSourceObjectBySrcObjId(m)
}return n};h._createStubPlayer=function(m){var n=new l();n.el=m;return n};h._getEventData=function(){return{playerType:(this.playerType||null),videoType:(this.videoType||null)}
};h._createObserver=function(n){var m;if(i&&i.observer&&i.observer.Video){m=new i.observer.Video(n,{dataAttribute:this.options.dataAttribute})
}return m};h._proxyEvent=function(m){if(this.currentStubPlayer){this.currentStubPlayer.trigger(m,this._getEventData())
}};c.exports=j},{"ac-browser":54,"ac-dom-traversal":183,"ac-event-emitter":false,"ac-object":1033}],916:[function(i,b,k){var q=i("ac-video-localization").localization;
var d=i("ac-video-nosupportview").View;var j=i("ac-feature");var h=i("ac-classlist");
var r=i("ac-event-emitter").EventEmitter;var g=i("ac-object");var m=i("./VideoSourceCollection");
var c=i("./factory/player");var p=i("ac-fullscreen");var a=i("./featureDetect/featureDetect");
var n=i("ac-browser");var o=i("./AnalyticsTranslator");function f(s){r.call(this);
this._currentVideo=null;this.videoSrcCollection=new m();this.analyticsTranslator=null;
this.player=null;this.localization=null;this.noSupportView=null;this.options=g.defaults(f.defaults,s)
}var l=f.prototype=g.create(r.prototype);f.defaults={analytics:true,playerOptions:{crossorigin:"anonymous",preload:"none"},analyticsOptions:{dataAttribute:"analytics-id"}};
l.play=function(t){var s=null;var u=null;if(!this.player){this.createPlayer()}if(t){s=this.videoSrcCollection.getSource(t);
u=this.getCurrentVideo();if(s&&u&&s.id===u.id){this._setCurrSrcObjIdForAnalytics(s.id);
this.player.addClassName("player-fullscreen");this.player.play();return}}else{if(!this.player.getCurrentSrc()){s=this.videoSrcCollection.getSourceByIndex(0)
}else{s=this.getCurrentVideo()}}if(s){this._setCurrSrcObjIdForAnalytics(s.id);if(s.poster){this.setPoster(s.poster)
}if(this.localization===null){this.ensureLocalization().then(this.play.bind(this,t))
}else{this._playVideoBySrcObj(s)}}};l.bindPlayerEvents=function(){this.player.on("enterfullscreen",this._onEnterFullscreen,this);
this.player.on("exitfullscreen",this._onExitFullscreen,this);this.player.on("durationchange",this._onPlayerSrcChange,this)
};l.handleTextTracks=function(v){var t;var s;var u;if(!this.player||!v.value||isNaN(v.value)||!this._currentVideo.vatResource.vatVTTSource||this._currentVideo.vatResource.vatVTTSource.length===0){return
}u={src:this._currentVideo.vatResource.vatVTTSource.pop()};t=this.player.getTextTracks();
s=this.player.findTextTrack(u);if(t&&t.models&&t.models.length>0&&s){t.models.forEach(function(w){if(s.cid===w.cid){w.hide()
}else{if(a.shouldAllowSingleTextTrack()){this.player.removeTextTrack(w)}else{w.disable()
}}}.bind(this))}};l.pause=function(){this.player.pause()};l.setSrc=function(s){return this._setNewPlayerSrc(s)
};l.getCurrentSrc=function(){return this.player.getCurrentSrc().attributes.src};
l.getCurrentVideo=function(){return this._currentVideo};l.createVideoResource=function(u,t){var s=this.videoSrcCollection.addSource(u,t);
this._addSourceToAnalytics(s);return s};l.createPlayer=function(){this.on("novideosupport",this._onNoVideoSupport,this);
if(this.options.poster){this.options.playerOptions.poster=this.options.poster}this.player=c(this.options.playerOptions);
if(this.player){this.bindPlayerEvents();this.defaultPosterFrame=this.player.getPoster();
this._intializeAnalytics();this._applyDocumentClassnames()}return this.player};
l.loadLocalization=function(){return q.create().then(function(s){this.localization=s
}.bind(this))};l.ensureLocalization=function(){var s;if(this.localization===null){s=this.loadLocalization()
}else{s=Promise.resolve()}return s};l.createNoSupportView=function(){this.ensureLocalization().then(function(){var s=new d({model:this.localization});
s.render();this.noSupportView=s;this.trigger("novideosupport");this._onNoVideoSupport()
}.bind(this))};l.setPoster=function(s){if(s!==this.player.getPoster()){this.player.setPoster(s)
}};l._onPlayerSrcChange=function(s){this.handleTextTracks(s)};l._onEnterFullscreen=function(){h.add(this.player.el,"player-fullscreen")
};l._onExitFullscreen=function(){h.remove(this.player.el,"player-fullscreen")};
l._intializeAnalytics=function(){if(!this.analyticsTranslator&&this.options.analytics===true){this.analyticsTranslator=new o(this.player,(this.options.analyticsOptions));
this.analyticsTranslator.activate()}};l._addSourceToAnalytics=function(s){if(s&&this.analyticsTranslator&&this.options.analytics===true){this.analyticsTranslator.addSourceObject(s)
}};l._setCurrSrcObjIdForAnalytics=function(s){if(this.options.analytics===true&&s&&this.player.el){this.player.el.setAttribute("data-"+this.options.analyticsOptions.dataAttribute,s)
}};l._playVideoBySrcObj=function(t){var s=this.player.getCurrentSrc();if(!s||(s.attributes.src&&s.attributes.src!==t.src)){if(j.isDesktop()){this.player.once("canplaythrough",this.player.play,this.player);
this._setNewPlayerSrc(t)}else{this.player.addClassName("player-fullscreen");this._setNewPlayerSrc(t);
this.player.play()}}else{this.player.play()}};l._setNewPlayerSrc=function(t){var s=this._setPlayerSrcFromSourceObject(t);
if(s){this._currentVideo=t;if(t.poster){this.setPoster(t.poster)}}return s};l._setPlayerSrcFromSourceObject=function(s){var u=null;
var t;if(this.player&&s.vatResource&&typeof s.vatResource.setPlayerSrc==="function"){t=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
s.vatResource.setPlayerSrc(this.player,t);if(n.name.toLowerCase()==="safari mobile"){this.player.once("readystatechange",function(){var x=this.player.el;
var w=this.player.getMediaWidth();var v=this.player.getMediaHeight();if(w&&w!==848&&v&&v!==480){x.style.paddingBottom=(v/w*100)+"%"
}},this)}s.cid=this.player.getCurrentSrc().cid;u=this.player.getCurrentSrc().attributes.src
}return u};l._applyDocumentClassnames=function(){var s;if(a.shouldPlayNativePlayer()){s="ac-player-handheld"
}if(j.isTablet()){s="ac-player-tablet"}if(j.isDesktop()){s="ac-player-desktop"}h.add(document.documentElement,s)
};l._onNoVideoSupport=function(){};b.exports=f},{"./AnalyticsTranslator":915,"./VideoSourceCollection":918,"./factory/player":921,"./featureDetect/featureDetect":923,"ac-browser":54,"ac-classlist":65,"ac-event-emitter":false,"ac-feature":301,"ac-fullscreen":320,"ac-object":1033,"ac-video-localization":509,"ac-video-nosupportview":544}],917:[function(d,b,h){var m=d("ac-modal").Modal;
var i=d("ac-modal-video").ModalVideo;var f=d("ac-object");var k=d("./FilmsController");
var g=d("ac-feature");var n=d("ac-fullscreen");var l=d("ac-browser");var c=d("ac-classlist");
var o=d("ac-keyboard");var p=o.keys;function a(q){k.apply(this,arguments);this.options=f.extend(a.defaults,this.options);
this.modalVideo=null}var j=a.prototype=f.create(k.prototype);a.defaults=f.extend(k.defaults,{modalOptions:{playOnOpen:true,closeOnEnded:true}});
j.play=function(q){k.prototype.play.call(this,q);if(!this.modalVideo.modal.opened){this.openModal()
}};j.openModal=function(){this.modalVideo.open()};j.createPlayer=function(){k.prototype.createPlayer.call(this);
this._createModalVideo()};j._handleFullscreen=function(){var r=false;var s=this.modalVideo.modal;
s.removeKeyToClose(p.ESCAPE);var q=function(u){r=true};var t=function(u){if(r===true&&this.modalVideo.modal.opened===true){s.close()
}r=false};o.addKeyDown(p.ESCAPE,q);o.addKeyUp(p.ESCAPE,t)};j._createModalVideo=function(){var q={playOnOpen:false,closeOnEnded:false};
if(this.player){this.modalVideo=i.create(this.player,q);this._handleFullscreen();
this._bindModalEvents()}else{this.modalVideo=new m()}this.trigger("modalready",{modal:this.modalVideo})
};j._onEnded=function(){if(this.options.modalOptions.closeOnEnded===true){this.modalVideo.close()
}};j._guaranteeVolume=function(){if(this.player&&this.player.getReadyState()>0){this.player.setVolume(1)
}else{if(this.player){this.player.once("readystatechange",function(){this.player.setVolume(1)
},this)}}};j._bindModalEvents=function(){this.modalVideo.on("close",this._onModalClose,this);
this.modalVideo.on("open",this._onModalOpen,this)};j.bindPlayerEvents=function(){k.prototype.bindPlayerEvents.call(this);
if(this.player){this.player.on("ended",this._onEnded,this)}};j._onModalClose=function(){if(!this.player){return
}this.player.setCurrentTime(0);this.pause();if(g.isTablet()){n.exitFullscreen(this.player.getMediaElement())
}};j._onModalOpen=function(){this._guaranteeVolume();if(this.options.modalOptions.playOnOpen===true){if(g.isTablet()){this.player.play()
}}};j._onEnded=function(){if(this.options.modalOptions.closeOnEnded===true){this.modalVideo.close()
}};j._onNoVideoSupport=function(){if(this.noSupportView&&this.modalVideo){this.modalVideo.appendContent(this.noSupportView.el)
}};b.exports=a},{"./FilmsController":916,"ac-browser":54,"ac-classlist":65,"ac-feature":301,"ac-fullscreen":320,"ac-keyboard":338,"ac-modal":466,"ac-modal-video":444,"ac-object":1033}],918:[function(c,d,b){var a=c("./VideoSourceObject").create;
function g(){this.sources=[]}var f=g.prototype;f.addSource=function(j,i){var h=a(j,i);
if(h){this.sources.push(h);h.index=this.sources.length-1}return h};f.getSource=function(h){var i=null;
if(typeof h==="number"){i=this.getSourceByIndex(h)}else{if(typeof h==="string"){if(/^cid/.test(h)){i=this.getSourceByCid(h)
}else{i=this.getSourceById(h)}}}return i};f.getSourceByIndex=function(h){return this.sources[h]
};f.getSourceById=function(h){return this.getSourceByPropertyValue("id",h)};f.getSourceByCid=function(h){return this.getSourceByPropertyValue("cid",h)
};f.getSourceByPropertyValue=function(j,h){var i=null;this.sources.some(function(l){var k=false;
if(l[j]===h){i=l;k=true}return k});return i};d.exports=g},{"./VideoSourceObject":919}],919:[function(b,d,a){var g=b("ac-vatman");
var h=g.vatResource;var f="data-acv-poster";function c(l,i){if(typeof l!=="string"){throw new TypeError(l+" must be a string")
}var j=i.element||null;var n=null;var m=null;var k=i.posterAttribute||f;if(j){m=j.getAttribute(k);
n=j.id}return{vatResource:h.create(l),element:j,src:l,poster:m,id:n,cid:null}}d.exports={create:c}
},{"ac-vatman":482}],920:[function(d,c,i){var g=d("../FilmsController");var a=d("../ModalFilmsController");
var f=d("ac-object");var m=d("./sources");var l=d("../posters");var k=d("ac-dom-events");
var b=d("../featureDetect/featureDetect");var h={poster:null,modal:false,deepLink:true,playOnClick:true};
function j(p,n){n=f.defaults(h,n||{});var o;if(n.modal===true&&!b.shouldPlayNativePlayer()){o=new a(n)
}else{o=new g(n)}o.loadLocalization();o.createPlayer();if(o.player){m(p,o,n)}else{o.createNoSupportView();
p.forEach(function(q){k.addEventListener(q,"click",function(r){k.preventDefault(r);
o.modalVideo.open()})})}return o}c.exports=j},{"../FilmsController":916,"../ModalFilmsController":917,"../featureDetect/featureDetect":923,"../posters":924,"./sources":922,"ac-dom-events":111,"ac-object":1033}],921:[function(g,f,i){var k=g("ac-vatman");
var c=g("ac-video").Player;var l=g("ac-fullscreen");var h=g("ac-dom-events");var d=g("../featureDetect/featureDetect");
function b(m){m.on("ended",function(){l.exitFullscreen(m.getMediaElement())});m.on("exitfullscreen",function(){m.setCurrentTime(0)
})}function a(m){m.on("enterfullscreen",function(){var n=m.getMediaElement();var o;
if(n.tagName.toLowerCase()!=="video"){o=m.getMediaHeight()/m.getMediaWidth();n.style.height=n.offsetWidth*o+"px"
}});m.on("exitfullscreen",function(){var n=m.getMediaElement();if(n.tagName.toLowerCase()!=="video"){n.style.height=null
}})}function j(m){m=m||{};var n=k.createPlayer(c,m);if(n){if(d.shouldPlayNativePlayer()){b(n);
n.appendTo(document.body)}else{a(n)}}return n}f.exports=j},{"../featureDetect/featureDetect":923,"ac-dom-events":111,"ac-fullscreen":320,"ac-vatman":482,"ac-video":913}],922:[function(d,c,g){var n=d("ac-router");
var p=d("ac-gesture-touchclick").TouchClick;var k=d("../windowLoad");var m=d("../posters");
var f=d("ac-vatman");var h=d("ac-dom-traversal").querySelector;var o=d("ac-browser");
var j=d("ac-feature");var l=o.name.toLowerCase();var a=(l==="safari"||l==="safari mobile");
var b=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
function i(t,s,r){var u;var q;if(r.deepLink===true){q=new n.Router({hashChange:true,pushState:false})
}t.forEach(function(y){var v;var B=y.getAttribute("href");var A=y.getAttribute("data-film-id")||y.getAttribute("id");
var z={element:y};var x;var w=B;if(!a){w=f.vatClient.getSource(B,b)}if(w!==B){y.setAttribute("href",w)
}if(!s.player){s.createPlayer()}if(B){x=s.createVideoResource(B,z);if(!x.poster){x.poster=s.defaultPosterFrame
}if(x.poster){m.loadPoster(x.poster)}if(r.deepLink===true&&x.id){q.createRoute(x.id,function(){k(function(){if(j.isTablet()){var D=s.player;
var F=D.poster;var E=D.getPoster();var C=D.getMediaElement();if(F){C.setAttribute("poster",E);
F._hide()}}s.player.setPreload("auto");s.play(x.id)})})}if(r.playOnClick===true){v=p.create(y);
v.on("click",function(){if(s.player&&s.player.getPreload()==="none"){s.player.setPreload("auto")
}s.play(A)})}}});if(r.deepLink===true){if(j.isTablet()){k(function(){window.requestAnimationFrame(function(){q.start()
})})}else{q.start()}}}c.exports=i},{"../posters":924,"../windowLoad":925,"ac-browser":54,"ac-dom-traversal":183,"ac-feature":301,"ac-gesture-touchclick":327,"ac-router":471,"ac-vatman":482}],923:[function(c,f,b){var h=c("ac-browser");
var a=c("ac-feature");var g=h.name.toLowerCase();var d=h.os.toLowerCase();f.exports={shouldPlayNativePlayer:function(){return(a.isHandheld()&&d==="ios")
},shouldAllowSingleTextTrack:function(){return(g==="safari mobile")}}},{"ac-browser":54,"ac-feature":301}],924:[function(c,d,b){function a(f){new Image().src=f
}d.exports={loadPoster:a}},{}],925:[function(c,d,b){var a=false;var g=c("ac-dom-events");
g.addEventListener(window,"load",function(){a=true});function f(h){if(a){h()}else{g.addEventListener(window,"load",h)
}}d.exports=f},{"ac-dom-events":111}],926:[function(b,c,a){arguments[4][54][0].apply(a,arguments)
},{"./ac-browser/BrowserData":927,"./ac-browser/IE":928}],927:[function(b,c,a){c.exports=b(295)
},{"./data":929}],928:[function(b,c,a){c.exports=b(56)},{}],929:[function(b,c,a){c.exports=b(297)
},{}],930:[function(b,c,a){arguments[4][346][0].apply(a,arguments)},{"./ac-classlist/add":931,"./ac-classlist/contains":932,"./ac-classlist/remove":934,"./ac-classlist/toggle":935}],931:[function(b,c,a){c.exports=b(347)
},{"./helpers/className":933}],932:[function(b,c,a){c.exports=b(348)},{"./helpers/className":933}],933:[function(b,c,a){c.exports=b(349)
},{}],934:[function(b,c,a){c.exports=b(350)},{"./helpers/className":933}],935:[function(b,c,a){c.exports=b(351)
},{"./helpers/className":933}],936:[function(b,c,a){arguments[4][76][0].apply(a,arguments)
},{"./ac-prefixer/Prefixer":937}],937:[function(b,c,a){c.exports=b(77)},{"./Prefixer/camelCasedEvents":938}],938:[function(b,c,a){c.exports=b(78)
},{}],939:[function(b,c,a){arguments[4][418][0].apply(a,arguments)},{"./ac-feature/canvasAvailable":940,"./ac-feature/continuousScrollEventsAvailable":941,"./ac-feature/cookiesAvailable":942,"./ac-feature/cssLinearGradientAvailable":943,"./ac-feature/cssPropertyAvailable":944,"./ac-feature/isDesktop":945,"./ac-feature/isHandheld":946,"./ac-feature/isRetina":947,"./ac-feature/isTablet":948,"./ac-feature/localStorageAvailable":949,"./ac-feature/sessionStorageAvailable":950,"./ac-feature/svgAvailable":951,"./ac-feature/threeDTransformsAvailable":952,"./ac-feature/touchAvailable":953}],940:[function(b,c,a){c.exports=b(419)
},{}],941:[function(b,c,a){arguments[4][420][0].apply(a,arguments)},{"./touchAvailable":953,"ac-browser":926}],942:[function(b,c,a){c.exports=b(421)
},{}],943:[function(b,c,a){arguments[4][422][0].apply(a,arguments)},{"./cssPropertyAvailable":944}],944:[function(b,c,a){arguments[4][423][0].apply(a,arguments)
},{"ac-prefixer":936}],945:[function(b,c,a){c.exports=b(424)},{"./touchAvailable":953}],946:[function(b,c,a){arguments[4][425][0].apply(a,arguments)
},{"./isDesktop":945,"./isTablet":948}],947:[function(b,c,a){c.exports=b(426)},{}],948:[function(b,c,a){arguments[4][427][0].apply(a,arguments)
},{"./isDesktop":945}],949:[function(b,c,a){c.exports=b(428)},{}],950:[function(b,c,a){c.exports=b(429)
},{}],951:[function(b,c,a){c.exports=b(430)},{}],952:[function(b,c,a){arguments[4][431][0].apply(a,arguments)
},{"./cssPropertyAvailable":944}],953:[function(b,c,a){c.exports=b(432)},{}],954:[function(b,c,a){c.exports=b(26)
},{}],955:[function(b,c,a){arguments[4][27][0].apply(a,arguments)},{"./ac-object/clone":956,"./ac-object/create":957,"./ac-object/defaults":958,"./ac-object/extend":959,"./ac-object/getPrototypeOf":960,"./ac-object/isDate":961,"./ac-object/isEmpty":962,"./ac-object/isRegExp":963,"./ac-object/toQueryParameters":964}],956:[function(c,d,b){var h=c("./extend");
var a=Object.prototype.hasOwnProperty;var f=function(i,j){var k;for(k in j){if(a.call(j,k)){if(j[k]===null){i[k]=null
}else{if(typeof j[k]==="object"){i[k]=Array.isArray(j[k])?[]:{};f(i[k],j[k])}else{i[k]=j[k]
}}}}return i};d.exports=function g(j,i){if(i){return f({},j)}return h({},j)}},{"./extend":959}],957:[function(b,c,a){c.exports=b(29)
},{}],958:[function(b,c,a){c.exports=b(30)},{"./extend":959}],959:[function(b,c,a){c.exports=b(31)
},{}],960:[function(b,c,a){c.exports=b(32)},{}],961:[function(b,c,a){c.exports=b(33)
},{}],962:[function(b,c,a){c.exports=b(34)},{}],963:[function(b,c,a){c.exports=b(35)
},{}],964:[function(b,c,a){c.exports=b(36)},{qs:954}],965:[function(b,c,a){c.exports.Localnav=b("./ac-localnav/Localnav")
},{"./ac-localnav/Localnav":966}],966:[function(g,b,i){var o=g("ac-dom-metrics");
var k=g("ac-dom-traversal");var n=g("ac-dom-nodes");var a=g("ac-dom-styles");var m=g("ac-browser");
var f=g("ac-object");var d=g("ac-classlist");var h=g("ac-feature");var r=g("ac-event-emitter").EventEmitter;
var q=g("ac-window-delegate").WindowDelegate;var p;try{p=g("ac-analytics")}catch(l){}var c=function(t){var s={stickyClass:"localnav-sticky",localnavWrapperClassSelector:".localnav-wrapper",analyticsEnabled:false};
this._options=f.extend(s,t);this._supportsPositionSticky=h.cssPropertyAvailable("position","sticky");
this._isSticky=false;this._localnavWrapperElement=k.querySelector(this._options.localnavWrapperClassSelector);
s=null};var j=c.prototype=new r(null);j.createLocalnav=function(){if(!this._supportsPositionSticky){this._placeholder=document.createElement("div");
d.add(this._placeholder,"localnav-placeholder");n.insertAfter(this._placeholder,this._localnavWrapperElement)
}if(this._localnavWrapperElement&&!this._isOldIE()){this._localnavNonStickyRange=this._setLocalnavNonStickyRange();
q.on("scroll",this._toggleStickiness.bind(this));window.requestAnimationFrame(this._toggleStickiness.bind(this))
}};j._setLocalnavNonStickyRange=function(){var u=k.querySelector(".localnav-wrapper");
var t=u.parentElement;var v=document.createElement("div");v.className="non-sticky-range-placeholder";
t.insertBefore(v,u);var s=o.getPagePosition(v).top;t.removeChild(v);return s};j._isOldIE=function(){return(m.name==="IE"&&m.version<9)
};j._toggleStickiness=function(){var s=(document.documentElement.scrollTop||document.body.parentNode||document.body).scrollTop;
var t=(window.pageYOffset)?window.pageYOffset:s;if(t>=this._localnavNonStickyRange){this._addStickiness()
}else{this._removeStickiness()}t=null;s=null};j._addStickiness=function(){if(!this._isSticky){d.add(this._localnavWrapperElement,this._options.stickyClass);
if(!this._supportsPositionSticky&&!this._isSticky){var s=o.getDimensions(this._localnavWrapperElement).height;
a.setStyle(this._placeholder,{display:"block",height:s+"px"});s=null}this._setAnalyticsAttributesWhenTogglingStickiness("product nav locked");
this._isSticky=true}};j._removeStickiness=function(){if(this._isSticky){d.remove(this._localnavWrapperElement,this._options.stickyClass);
if(!this._supportsPositionSticky){a.setStyle(this._placeholder,{display:"none"})
}this._setAnalyticsAttributesWhenTogglingStickiness("product nav");this._isSticky=false
}};j._setAnalyticsAttributesWhenTogglingStickiness=function(s){if(this._options.analyticsEnabled&&p){this._localnavWrapperElement.setAttribute("data-analytics-region",s);
p.regions.refreshRegion(this._localnavWrapperElement)}};b.exports=c},{"ac-browser":926,"ac-classlist":930,"ac-dom-metrics":136,"ac-dom-nodes":148,"ac-dom-styles":172,"ac-dom-traversal":183,"ac-event-emitter":false,"ac-feature":939,"ac-object":955,"ac-window-delegate":1070}],967:[function(b,c,a){arguments[4][231][0].apply(a,arguments)
},{"./ac-dom-emitter/DOMEmitter":968}],968:[function(b,c,a){var f;var d=b("ac-event-emitter").EventEmitter;
function g(h){if(h===null){return}this.el=h;this._bindings={};this._eventEmitter=new d()
}f=g.prototype;f._parseEventNames=function(h){if(!h){return[h]}return h.split(" ")
};f._onListenerEvent=function(i,h){this.trigger(i,h,false)};f._setListener=function(h){this._bindings[h]=this._onListenerEvent.bind(this,h);
this._addEventListener(h,this._bindings[h])};f._removeListener=function(h){this._removeEventListener(h,this._bindings[h]);
delete this._bindings[h]};f._addEventListener=function(i,j,h){if(this.el.addEventListener){this.el.addEventListener(i,j,h)
}else{if(this.el.attachEvent){this.el.attachEvent("on"+i,j)}else{target["on"+i]=j
}}return this};f._removeEventListener=function(i,j,h){if(this.el.removeEventListener){this.el.removeEventListener(i,j,h)
}else{this.el.detachEvent("on"+i,j)}return this};f.on=function(h,j,i){h=this._parseEventNames(h);
h.forEach(function(m,l,k){if(!this.has(k)){this._setListener(k)}this._eventEmitter.on(k,m,l)
}.bind(this,j,i));return this};f.off=function(h,k,j){var i=Array.prototype.slice.call(arguments,0);
h=this._parseEventNames(h);h.forEach(function(p,o,m,l){if(m.length===0){this._eventEmitter.off();
var n;for(n in this._bindings){if(this._bindings.hasOwnProperty(n)){this._removeListener(n)
}}return}this._eventEmitter.off(l,p,o);if(!this.has(l)){this._removeListener(l)
}}.bind(this,k,j,i));return this};f.once=function(h,j,i){h=this._parseEventNames(h);
h.forEach(function(m,l,k){if(!this.has(k)){this._setListener(k)}this._eventEmitter.once.call(this,k,m,l)
}.bind(this,j,i));return this};f.has=function(h){if(this._eventEmitter&&this._eventEmitter.has(h)){return true
}return false};f.trigger=function(h,i,j){h=this._parseEventNames(h);h.forEach(function(l,m,k){this._eventEmitter.trigger(k,l,m)
}.bind(this,i,j));return this};f.destroy=function(){this.off();this.el=this._eventEmitter=this._bindings=null
};c.exports=g},{"ac-event-emitter":false}],969:[function(b,c,a){c.exports=b(231)
},{"./ac-dom-emitter/DOMEmitter":970}],970:[function(b,c,a){c.exports=b(232)},{"ac-event-emitter":false}],971:[function(b,c,a){c.exports.playerFactory=b("./ac-flow-x/flow/playerFactory");
c.exports.Flow=b("./ac-flow-x/flow/FlowController");c.exports.SyncPlayer=b("./ac-flow-x/flow/SyncPlayer");
c.exports.MaskedFlow=b("./ac-flow-x/flow/MaskedFlow")},{"./ac-flow-x/flow/FlowController":973,"./ac-flow-x/flow/MaskedFlow":975,"./ac-flow-x/flow/SyncPlayer":977,"./ac-flow-x/flow/playerFactory":1000}],972:[function(b,a,c){var f,j=false,i=b("ac-deferred").Deferred,l=b("ac-deferred").all,o=b("ac-event-emitter").EventEmitter,k=b("./compositor/decorator/Keyframe"),h=b("./compositor/decorator/Superframe"),g=b("./compositor/decorator/SuperKeyframe"),n=b("./compositor/decorator/Cache"),m=b("./compositor/decorator/Benchmark");
function d(p,q){o.call(this);this._compositor=p;this.options=q||{};this.gotoFrame
}f=d.prototype=new o(null);f._gotoImageFrame=function(p){if(this._rendering){return(new i()).resolve()
}else{if(this._currentFrame===p){return(new i()).resolve()}}this._rendering=true;
if(j){console.groupCollapsed("gotoFrame:"+p+" currentFrame:"+this._currentFrame)
}return this._compositor.compositeFrames(this._currentFrame,p).then(function(){this._rendering=false;
this._currentFrame=p;if(j){console.groupEnd()}}.bind(this))};f._gotoBinaryFrame=function(p){if(this._currentFrame===p){return(new i()).resolve()
}return this._compositor.compositeFrames(this._currentFrame,p).then(function(q){if(q){this._compositor.applyBinaryFrame(q)
}this._currentFrame=p;this.trigger("composite")}.bind(this))};f.init=function(q){var p;
if(q.nodeName==="CANVAS"){p=q}else{p=document.createElement("canvas");q.appendChild(p)
}if(this.options.renderType==="binary"){this.gotoFrame=this._gotoBinaryFrame}else{if(this.options.renderType==="default"){this.gotoFrame=this._gotoImageFrame
}}return this._compositor.init(p).then(function(r){return l([this._compositor.createDiffRender(r).then(this._decorateCompositor.bind(this))])
}.bind(this))};f._decorateCompositor=function(){var p=this._compositor,r=this._compositor._diffRender.flowData,q=this._compositor.canvas;
if(this.options.renderType==="binary"){}else{if(r.superframeFrequency){p=new h(p,r.superframeFrequency)
}if(r.version===3){p=new k(p)}if(r.version===3&&r.superframeFrequency){p=new g(p)
}if(this.options.keyframeCache){p=new n(p,this.options.keyframeCache)}if(this.options.benchmark){p=new m(p)
}}if(p===this._compositor){return(new i()).resolve()}else{this._compositor=p;return this._compositor.init(q)
}};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(f,{_currentFrame:{value:0,enumerable:false,writable:true},frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true}});a.exports=d},{"./compositor/decorator/Benchmark":980,"./compositor/decorator/Cache":981,"./compositor/decorator/Keyframe":982,"./compositor/decorator/SuperKeyframe":983,"./compositor/decorator/Superframe":984,"ac-event-emitter":false}],973:[function(f,b,g){var i,h=f("./Flow"),d=f("./Player"),m=f("./LoadController"),k=f("./compositor/BinaryCompositor"),j=f("./compositor/Sequence");
var c={fileFormat:"jpg",baseName:"flow",imageUrlPattern:"###",startframeFileFormat:null,endframeFileFormat:null,basePath:null,manifestPath:null,manifestFileFormat:"json",diffPath:null,framePath:null};
var a={superframes:false,reversable:false,keyframeCache:8,benchmark:false,preload:true,multithread:false,preventDraw:false,renderType:"default"};
var l=function(n,o){n=n||{};o=o||{};this._flow=null;this._compositor=null;this._oader=null;
this.options=this._setDefaults(n,a);this._dataOptions=this._setDefaults(o,c);if(!this.options.element){this.options.element=document.createElement("canvas")
}this._flow=this._createFlow(this._compositor,this.options,this._dataOptions);d.call(this,this.options.element,this._flow);
if(this.options.preload){this.load()}};i=l.prototype=new d(null);i.destroy=function(){this.pause();
this.off();this._flow.off();this._flow=this._nullProperties(this._flow);this._nullProperties(this)
};i._nullProperties=function(o){var n;for(n in o){if(o.hasOwnProperty(n)){o[n]=null
}}return o};i._createFlow=function(o,p,r){var n=this._assembleAssetPaths(r);var q=[n.startframe,n.endframe];
this.loader=new m(this,n.manifest,q,n.imageUrlPattern);if(p.renderType==="binary"){this._compositor=new k(q,n.imageUrlPattern,this.loader,p.multithread,p.preventDraw)
}else{this._compositor=new j(q,n.imageUrlPattern,this.loader)}return new h(this._compositor,p)
};i._assembleAssetPaths=function(t){var s=t.basePath?this._forceTrailingSlash(t.basePath):null;
var p=t.framePath?this._forceTrailingSlash(t.framePath):null;var o=t.diffPath?this._forceTrailingSlash(t.diffPath):null;
var r=t.manifestPath?this._forceTrailingSlash(t.manifestPath):null;var n=t.baseName+"_";
var q={};q.startframe=(p||s)+n+"startframe."+(t.startframeFileFormat||t.fileFormat);
q.endframe=(p||s)+n+"endframe."+(t.endframeFileFormat||t.fileFormat);q.imageUrlPattern=(o||s)+n+t.imageUrlPattern+"."+t.fileFormat;
q.manifest=(r||s)+n+"manifest."+t.manifestFileFormat;return q};i._forceTrailingSlash=function(n){if(n.lastIndexOf("/")!==n.length-1){n=n+"/"
}return n};i._setDefaults=function(o,p){var n;for(n in p){if(p.hasOwnProperty(n)){if(typeof o[n]==="undefined"){o[n]=p[n]
}}}return o};b.exports=l},{"./Flow":972,"./LoadController":974,"./Player":976,"./compositor/BinaryCompositor":978,"./compositor/Sequence":979}],974:[function(b,a,c){var d,h=b("ac-asset-loader").AssetLoader,l=b("ac-event-emitter").EventEmitter,f=b("./data/provider/Async"),g=b("ac-deferred").Deferred,i=b("ac-deferred").all;
var k={start:"start",pause:"pause",error:"error",complete:"loaded",destroy:"destroy"};
var j=function(o,m,n,p){this._flow=o;this._manifestUrl=m;this._keyframeUrls=n;this._imageUrlPattern=p;
this.state={manifestLoaded:false,keyframesLoaded:false,diffsLoaded:false,diffCountLoaded:0,totalDiffs:null};
this.assets={keyframes:null,manifest:null,diffs:null};this._promises={};this._loaders={};
this._activeLoaders=[];this._resumeQueue=[];this._paused=true;this._shouldPause=false;
this._boundOnManifestLoaded=this._onManifestLoaded.bind(this);this._boundOnKeyframesLoaded=this._onKeyframesLoaded.bind(this);
this._boundOnDiffsLoaded=this._onDiffsLoaded.bind(this);this._boundOnManifestAndKeyframesLoaded=this._onManifestAndKeyframesLoaded.bind(this);
this._boundOnComplete=this._onComplete.bind(this)};d=j.prototype=new l(null);d.setManifestUrl=function(m){this._manifestUrl=m;
return this};d.setKeyframeUrls=function(m){this._keyframeUrls=m;return this};d.setImageUrlPattern=function(m){this._imageUrlPattern=m;
return this};d.load=function(){if(this._paused&&(this._activeLoaders.length>0||this._resumeQueue.length>0)){this._resume();
return}this._flow.load().then(this._boundOnComplete);return};d.pause=function(){this._shouldPause=true;
var n,m=this._activeLoaders.length;for(n=0;n<m;n++){this._activeLoaders[n].pause()
}this._paused=true};d.destroy=function(){var n,m,o;this.trigger(k.destroy);this.off();
for(n in this._loaders){if(this._loaders.hasOwnProperty(n)){}}for(m in this._promises){if(this._promises.hasOwnProperty(m)){if(this._promises[m].promise().status()==="pending"){this._promises[m].reject()
}}}for(o in this){if(this.hasOwnProperty(o)){this[o]=null}}};d._resume=function(){this._shouldPause=false;
var p,m=this._activeLoaders.length;for(p=0;p<m;p++){this._activeLoaders[p].load()
}var o,n=this._resumeQueue.length;for(o=0;o<n;o++){this._resumeQueue[o].call(this)
}this._resumeQueue=[];this._paused=false};d.loadManifest=function(){this._promises.manifest=this._promises.manifest||new g();
var m=this._promises.manifest.promise();if(this._shouldPause){this._resumeQueue.push(this.loadManifest);
return m}if(this.assets.manifest){return this._promises.manifest.resolve(this.assets.manifest)
}this._paused=false;this._loaders.manifest=new f(this._getManifestAssetsData());
this._activeLoaders.push(this._loaders.manifest);this._loaders.manifest.load().then(this._boundOnManifestLoaded);
return m};d.loadKeyframes=function(){this._promises.keyframes=this._promises.keyframes||new g();
var m=this._promises.keyframes.promise();if(this._shouldPause){this._resumeQueue.push(this.loadKeyframes);
return m}if(this.assets.keyframes){return this._promises.keyframes.resolve(this.assets.keyframes)
}this._paused=false;this._loaders.keyframes=new h(this._getKeyframesAssetsData());
this._activeLoaders.push(this._loaders.keyframes);this._loaders.keyframes.load().then(this._boundOnKeyframesLoaded);
return m};d.loadDiffs=function(){this._promises.diffs=this._promises.diffs||new g();
var m=this._promises.diffs.promise();if(this._shouldPause){this._resumeQueue.push(this.loadDiffs);
return m}if(this.assets.diffs){return this._promises.diffs.resolve(this.assets.diffs)
}this._paused=false;this._loaders.diffs=new h(this._getDiffsAssetsData());this._activeLoaders.push(this._loaders.diffs);
this._loaders.diffs.load().then(this._boundOnDiffsLoaded);return m};d._getManifestAssetsData=function(){return this._manifestUrl
};d._getKeyframesAssetsData=function(){return this._keyframeUrls};d._getDiffsAssetsData=function(){var o=this.assets.manifest.imagesRequired,m=[],p,n,q=this._imageUrlPattern.match(/#/g).length;
for(p=1;p<=o;p++){n="0000"+p;n=n.substring(n.length-q);m.push(this._imageUrlPattern.replace(/#{2,}/g,n))
}return m};d._onManifestLoaded=function(m){if(this.assets){this.assets.manifest=m;
this.state.manifestLoaded=true;this._paused=true;this._removeFromActiveLoaders(this._loaders.manifest);
this._promises.manifest.resolve(this.assets.manifest)}};d._onKeyframesLoaded=function(m){if(this.assets){this.assets.keyframes=m;
this.state.keyframeLoaded=true;this._paused=true;this._removeFromActiveLoaders(this._loaders.keyframes);
this._promises.keyframes.resolve(this.assets.keyframes)}};d._onDiffsLoaded=function(m){if(this.assets){this.assets.diffs=m;
this.state.diffsLoaded=true;this._paused=true;this._removeFromActiveLoaders(this._loaders.diffs);
this._promises.diffs.resolve(this.assets.diffs)}};d._onManifestAndKeyframesLoaded=function(){if(!this.state.diffsLoaded){this.loadDiffs()
}return this._promises.diffs};d._removeFromActiveLoaders=function(o){var n,m=this._activeLoaders.length;
for(n=0;n<m;n++){if(this._activeLoaders[n]===o){this._activeLoaders.splice(n,1);
return}}};d._onComplete=function(){this.trigger(k.complete)};a.exports=j},{"./data/provider/Async":992,"ac-asset-loader":37,"ac-event-emitter":false}],975:[function(b,a,f){var h,g=b("./FlowController"),d=b("./SyncPlayer"),i=b("ac-deferred").Deferred,k=b("ac-deferred").all;
var c={preventDraw:true,renderType:"binary"};function j(p,q,m,o,l,n){m=this._setDefaultOptions(m);
o=this._setDefaultOptions(o);this.flow=new g(p,m,l);this.mask=new g(q,o,n);d.apply(this,[this.flow,this.mask]);
this._flowDefer=null;this._maskDefer=null;this._boundOnSyncRender=this._onSyncRender.bind(this);
this._boundOnFlowTimeUpdate=this._onFlowTimeUpdate.bind(this);this._boundOnMaskTimeUpdate=this._onMaskTimeUpdate.bind(this);
this.flow._flow.on("composite",this._boundOnFlowTimeUpdate);this.mask._flow.on("composite",this._boundOnMaskTimeUpdate);
this._bindSyncRender()}h=j.prototype=new d(null);h._setDefaultOptions=function(l){l=l||{};
var m;for(m in c){if(c.hasOwnProperty(m)){if(typeof l[m]==="undefined"){l[m]=c[m]
}}}return l};h._bindSyncRender=function(){this._flowDefer=new i();this._maskDefer=new i();
k([this._flowDefer,this._maskDefer]).then(this._boundOnSyncRender)};h._onFlowTimeUpdate=function(){if(this._flowDefer){this._flowDefer.resolve()
}};h._onMaskTimeUpdate=function(){if(this._maskDefer){this._maskDefer.resolve()
}};h._onSyncRender=function(){this._flowDefer=this._maskDefer=null;this._applyMask();
this._bindSyncRender()};h._applyMask=function(){if(!this.flow._compositor.imageData){return
}var n=this.flow._compositor.imageData.data,o=this.mask._compositor.imageData.data,m,l=n.length;
for(m=0;m<l;m+=4){n[m+3]=o[m]}this.flow._compositor.applyBinaryFrame({buf8:n},true)
};a.exports=j},{"./FlowController":973,"./SyncPlayer":977}],976:[function(d,f,b){var h,a=false,c=d("ac-deferred").Deferred,i=d("ac-dom-emitter").DOMEmitter;
function g(k,j){this._flow=j;this._domEmitter=new i(k);this._frameRate=30;this.element=k;
this.paused=true;this.loop=false;this._boundAdvanceTimeToGlobal=this._advanceToTimeGlobal.bind(this);
this._onBoundGlobalTimeUpdate=this._onGlobalTimeUpdate.bind(this);this._onBoundLocalTimeUpdate=this._onLocalTimeUpdate.bind(this)
}h=g.prototype;h._timeToFrame=function(j){var k;k=Math.round(j/this.duration*this._flow.frameCount);
k=k%(this._flow.frameCount+1);return(k<0)?this._flow.frameCount+k:k};h._advanceToTimeGlobal=function(j){this._prevTime=this._prevTime||j;
this._currentTime+=((j-this._prevTime)/1000)*this.playbackRate;this._prevTime=j;
this._pauseAfterRender=false;var k=this._timeToFrame(this._currentTime);if(!this.loop){if(this.playbackRate>0&&this._currentTime>this.duration){k=this._flow.frameCount;
this._currentTime=this.duration;this._pauseAfterRender=true}else{if(this.playbackRate<0&&this._currentTime<0){k=0;
this._currentTime=0;this._pauseAfterRender=true}}}else{this._currentTime=(this.duration+this._currentTime)%this.duration
}if(!this.paused&&!this.seeking){return this._flow.gotoFrame(k).then(this._onBoundGlobalTimeUpdate)
}else{return(new c()).reject()}};h._onGlobalTimeUpdate=function(){this.trigger("timeupdate");
if(this._pauseAfterRender){this.paused=true;this.trigger("ended")}else{this._requestAnimationFrame=window.requestAnimationFrame(this._boundAdvanceTimeToGlobal)
}};h._onLocalTimeUpdate=function(){this.seeking=false;this.trigger("timeupdate");
this.trigger("seeked");this._requestAnimationFrame=window.requestAnimationFrame(this._boundAdvanceTimeToGlobal)
};h._advanceToTimeLocal=function(j){if(!this.seeking){this.seeking=true;this.trigger("seeking");
this._currentTime=1*j;this._prevTime=null;window.cancelAnimationFrame(this._requestAnimationFrame);
this._flow.gotoFrame(this._timeToFrame(j)).then(this._onBoundLocalTimeUpdate)}if(a){console.log("advance to time "+j+" from "+this._currentTime)
}};h.load=function(){this.trigger("loadstart");return this._flow.init(this.element).then(this.trigger.bind(this,"canplaythrough"))
};h.play=function(){if(this.paused){this.paused=false;this.trigger("play");this._prevTime=null;
this._requestAnimationFrame=window.requestAnimationFrame(this._boundAdvanceTimeToGlobal)
}return this};h.pause=function(){if(!this.paused){this.paused=true;window.cancelAnimationFrame(this._requestAnimationFrame);
this.trigger("pause")}return this};h.on=function(){this._domEmitter.on.apply(this._domEmitter,arguments)
};h.once=function(){this._domEmitter.once.apply(this._domEmitter,arguments)};h.trigger=function(){this._domEmitter.trigger.apply(this._domEmitter,arguments)
};h.off=function(){this._domEmitter.off.apply(this._domEmitter,arguments)};h.setRenderOperation=function(j){if(this._flow&&this._flow._compositor&&this._flow._compositor._diffRender){this._flow._compositor._diffRender.renderOperation=j
}return this};h.setBeforeRenderOperation=function(j){if(this._flow&&this._flow._compositor&&this._flow._compositor._diffRender){this._flow._compositor._diffRender.beforeRenderOperation=j
}};h.setBeforeDrawOperation=function(j){if(this._flow&&this._flow._compositor){this._flow._compositor.beforeDrawOperation=j
}};h.setAfterDrawOperation=function(j){if(this._flow&&this._flow._compositor){this._flow._compositor.afterDrawOperation=j
}};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(h,{_currentTime:{value:0,enumerable:false,writable:true},_playbackRate:{value:1,enumerable:false,writable:true},currentTime:{get:function(){return this._currentTime*1
},set:h._advanceToTimeLocal,enumerable:true},frameRate:{get:function(){return this._frameRate
},set:function(j){if(isFinite(j)){this._frameRate=j;this.trigger("durationchange")
}},enumerable:true},playbackRate:{get:function(){return this._playbackRate*1},set:function(j){if(isFinite(j)){this._playbackRate=1*j;
this.trigger("ratechange")}},enumerable:true},duration:{get:function(){return this._flow.frameCount/this.frameRate
},enumerable:true}});f.exports=g},{"ac-dom-emitter":969}],977:[function(d,f,b){var h,c=d("ac-deferred").Deferred,a=d("ac-deferred").all;
function g(){this.flows=Array.prototype.slice.call(arguments,0)}h=g.prototype;h.on=function(){return this._each("on",arguments)
};h.off=function(){return this._each("off",arguments)};h.load=function(){var n=new c(),m=[],l,j=this.flows.length,k;
for(l=0;l<j;l++){k=this.flows[l];m.push(k.load())}a(m).then(n.resolve.bind(n));
return n.promise()};h.play=function(){return this._each("play",arguments)};h.pause=function(){return this._each("pause",arguments)
};h.destroy=function(){this._each("destroy",arguments);var j;for(j in this){if(this.hasOwnProperty(j)){if(this[j] instanceof c){this[j].reject()
}this[j]=null}}};h.setRenderOperation=function(){return this._each("setRenderOperation",arguments)
};h.setBeforeRenderOperation=function(){return this._each("setBeforeRenderOperation",arguments)
};h.setBeforeDrawOperation=function(){return this._each("setBeforeDrawOperation",arguments)
};h.setAfterDrawOperation=function(){return this._each("setAfterDrawOperation",arguments)
};h._dispatchEvent=function(i){return this._each("_dispatchEvent",arguments)};h._advanceToTimeGlobal=function(){return this._each("_advanceToTimeGlobal",arguments)
};h._advanceToTimeLocal=function(){return this._each("_advanceToTimeLocal",arguments)
};h._each=function(n,l){l=Array.prototype.slice.call(l,0);var m,j=this.flows.length,k;
for(m=0;m<j;m++){k=this.flows[m];k[n].apply(k,l)}return this};Object.defineProperties(h,{_currentTime:{value:0,enumerable:false,writable:true},_playbackRate:{value:1,enumerable:false,writable:true},_loop:{value:false,enumerable:false,writable:true},currentTime:{get:function(){return this._currentTime*1
},set:h._advanceToTimeLocal,enumerable:true},frameRate:{get:function(){return this._frameRate
},set:function(i){if(isFinite(i)){this._frameRate=i;this._dispatchEvent("durationchange")
}},enumerable:true},playbackRate:{get:function(){return this._playbackRate*1},set:function(i){if(isFinite(i)){this._playbackRate=1*i;
this.flows.forEach(function(k,j){j.playbackRate=k}.bind(this,this._playbackRate))
}},enumerable:true},duration:{get:function(){return this._flow[0].frameCount/this.frameRate
},enumerable:true},loop:{get:function(){return this._loop},set:function(i){if(typeof i==="boolean"){this._loop=i;
this.flows.forEach(function(j,k){k.loop=j}.bind(this,this._loop))}},enumerable:true}});
f.exports=g},{}],978:[function(c,b,d){var f,j=false,a=c("../diff/BinaryRender"),g=c("../diff/BinaryMultithreadRender"),i=c("ac-deferred").Deferred;
var h=function(o,m,n,l,k){this._keyframes=o;this._imageUrlPattern=m;this._loadController=n;
this._useMultithreading=l;this._preventDraw=k};f=h.prototype;f._getURLObject=function(){return window.URL||window.webkitURL||null
};f._supportsMultithread=function(){if(this._getURLObject()&&window.Worker&&window.Blob){return true
}return false};f._initDiffRender=function(k){this._images=k;this.canvas.height=k[0].height;
this.canvas.width=k[0].width;this.applyFrame(k[0])};f.init=function(k){this.canvas=k||document.createElement("canvas");
this.context=k.getContext("2d");return this._loadController.loadKeyframes().then(this._initDiffRender.bind(this)).then(this._loadController.loadManifest.bind(this._loadController))
};f.createDiffRender=function(k){if(this._useMultithreading&&this._supportsMultithread()){this._diffRender=new g(k,this._imageUrlPattern)
}else{this._diffRender=new a(k,this._imageUrlPattern,this._loadController)}return this._diffRender.init()
};f.applyFrame=function(m){var l=this.context,k;l.drawImage(m,0,0);if(this._diffRender){this._diffRender.forceBinaryComposite();
k=this._diffRender.forceKeyframeRender(this.canvas,this.context);if(!this.imageData){this.imageData=this.context.createImageData(k.width,k.height)
}this.imageData.data.set(k.buf8)}};f.applyBinaryFrame=function(k,l){if(!this.imageData){this.imageData=this.context.createImageData(k.width,k.height)
}if(this._beforeDrawOperation){k=this._beforeDrawOperation(k)}this.imageData.data.set(k.buf8);
if(!this._preventDraw||l){this.context.putImageData(this.imageData,0,0)}if(this._afterDrawOperation){k=this._afterDrawOperation(k)
}};f.calculateRenderCount=function(k,l){var m=0;if(Math.abs(l-k)>=l){k=1;m=1}else{if(Math.abs(l-k)>=(this.frameCount-l)&&this._images[1]){k=this.frameCount-2;
m=1}}if(l>0&&l<this.frameCount-1){return Math.abs(k-l)+m}else{return m}};f.compositeFrames=function(l,o){var n=new i(),m;
o=(this.frameCount<o)?this.frameCount-1:(o<0)?0:o;l=(this.frameCount-2<l)?this.frameCount-2:(l<0)?0:l;
var p,k,m;if(Math.abs(o-l)>=o){l=1;if(j){console.log("applying start keyframe")
}this.applyFrame(this._images[0]);return n.resolve()}else{if(Math.abs(o-l)>=(this.frameCount-o)&&this._images[1]){l=this.frameCount-2;
if(j){console.log("applying end keyframe")}this.applyFrame(this._images[1]);return n.resolve()
}}p=(l>o)?-1:(l<o)?1:0;if(o>0&&o<this.frameCount-1){while(l!==o){k=this._diffRender.renderDiff(this.canvas,l,this.context);
l+=p}}if(k){k.then(n.resolve.bind(n))}else{n.resolve()}return n.promise()};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(f,{frameCount:{get:function(){return this._diffRender.frames.length+2
},enumerable:true},canvas:{get:function(){return this._canvas},set:function(k){return this._canvas=k
},enumerable:true},mainCompositor:{get:function(){var k=this;while(k._compositor){k=k._compositor
}return k},enumerable:true},_beforeDrawOperation:{value:undefined,enumerable:false,writable:true},_afterDrawOperation:{value:undefined,enumerable:false,writable:true},beforeDrawOperation:{get:function(){return this._beforeDrawOperation
},set:function(k){if(typeof k==="function"){this._beforeDrawOperation=k;return}this._beforeDrawOperation=undefined
},enumerable:true},afterDrawOperation:{get:function(){return this._afterDrawOperation
},set:function(k){if(typeof k==="function"){this._afterDrawOperation=k;return}this._afterDrawOperation=undefined
},enumerable:true}});b.exports=h},{"../diff/BinaryMultithreadRender":994,"../diff/BinaryRender":995}],979:[function(d,c,f){var i=0,b;
function k(){if(!b){b=document.getElementById("counter")}i++;b.textContent=i}var g,l=false,h=d("../diff/Render"),j=d("ac-deferred").Deferred;
function a(p,m,o,n){this._keyframes=p;this._imageUrlPattern=m;this._loadController=o;
this._renderType=n||"default"}g=a.prototype;g._initDiffRender=function(m){this._images=m;
this.canvas.height=m[0].height;this.canvas.width=m[0].width;this.applyFrame(m[0]);
return new j().resolve()};g.init=function(m){this.canvas=m||document.createElement("canvas");
this.context=m.getContext("2d");return this._loadController.loadKeyframes().then(this._initDiffRender.bind(this)).then(this._loadController.loadManifest.bind(this._loadController))
};g.createDiffRender=function(m){this._diffRender=new h(m,this._imageUrlPattern,this._loadController);
return this._diffRender.init()};g.applyFrame=function(n){var m=this.context;m.drawImage(n,0,0)
};g.calculateRenderCount=function(m,n){var o=0;if(Math.abs(n-m)>=n){m=1;o=1}else{if(Math.abs(n-m)>=(this.frameCount-n)&&this._images[1]){m=this.frameCount-2;
o=1}}if(n>0&&n<this.frameCount-1){return Math.abs(m-n)+o}else{return o}};g.compositeFrames=function(m,o){var n=new j();
o=(this.frameCount<o)?this.frameCount-1:(o<0)?0:o;m=(this.frameCount-2<m)?this.frameCount-2:(m<0)?0:m;
var p;if(l){console.groupCollapsed("Rendering diff frames: "+m+"..."+o)}if(Math.abs(o-m)>=o){m=1;
if(l){console.log("applying start keyframe")}this.applyFrame(this._images[0])}else{if(Math.abs(o-m)>=(this.frameCount-o)&&this._images[1]){m=this.frameCount-2;
if(l){console.log("applying end keyframe")}this.applyFrame(this._images[1])}}p=(m>o)?-1:(m<o)?1:0;
if(o>0&&o<this.frameCount-1){while(m!==o){this._diffRender.renderDiff(this.canvas,m);
m+=p}}if(l){console.groupEnd()}n.resolve(m);return n.promise()};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(g,{frameCount:{get:function(){return this._diffRender.frames.length+2
},enumerable:true},canvas:{get:function(){return this._canvas},set:function(m){return this._canvas=m
},enumerable:true},mainCompositor:{get:function(){var m=this;while(m._compositor){m=m._compositor
}return m},enumerable:true}});c.exports=a},{"../diff/Render":997}],980:[function(b,c,a){var d,g=b("../../../stats/Benchmark");
function f(h){this._compositor=h}d=f.prototype;d.init=function(h){var i=new g("init");
i.start();return this._compositor.init.apply(this._compositor,arguments).then(i.end.bind(i))
};d.applyFrame=function(){var h=new g("applyFrame");h.start();this._compositor.applyFrame.apply(this._compositor,arguments);
h.end.bind(h)};d.calculateRenderCount=function(){return this._compositor.calculateRenderCount.apply(this._compositor,arguments)
};d.compositeFrames=function(){var h=new g("renderFrames");h.start();return this._compositor.compositeFrames.apply(this._compositor,arguments).then(h.end.bind(h))
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(d,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(h){return this._compositor.canvas=h
},enumerable:true}});f.prototype=d;c.exports=f},{"../../../stats/Benchmark":1001}],981:[function(d,f,c){var g,b=false;
function a(i,h){this._compositor=i;this._keyframeInterval=h||8;this._keyframes=[]
}g=a.prototype;g._getClosestKeyframe=function(h){var i=h%this._keyframeInterval,j=Math.floor(h/this._keyframeInterval)+((i>(this._keyframeInterval/2))?1:0);
return j};g._getFrameFromKeyframe=function(h){return h*this._keyframeInterval};
g._saveKeyframe=function(j){var h,i=Math.floor(j/this._keyframeInterval);if(j%this._keyframeInterval===0&&!this._keyframes[i]){if(b){console.log("saving keyframe "+j)
}h=document.createElement("canvas");h.width=this._compositor.canvas.width;h.height=this._compositor.canvas.height;
h.getContext("2d").drawImage(this._compositor.canvas,0,0);this._keyframes[i]=h}};
g.init=function(h){return this._compositor.init.apply(this._compositor,arguments)
};g.applyFrame=function(){this._compositor.applyFrame.apply(this._compositor,arguments)
};g.calculateRenderCount=function(h,i){h=this._getFrameFromKeyframe(this._getClosestKeyframe(i));
return this._compositor.calculateRenderCount(h,i)+1};g.compositeFrames=function(h,j){var k=this._getClosestKeyframe(j);
if(b){console.groupCollapsed("Rendering frames: "+h+"..."+j)}if(this._keyframes[k]&&(this._compositor.calculateRenderCount(h,j)>this.calculateRenderCount(h,j))){h=this._getFrameFromKeyframe(k);
if(b){console.log("applying prerendered keyframe: "+h)}this.applyFrame(this._keyframes[k]);
return this._compositor.compositeFrames(h,j).then(function i(){if(b){console.groupEnd()
}})}else{return this._compositor.compositeFrames(h,j).then(function i(){if(b){console.groupEnd()
}},null,this._saveKeyframe.bind(this))}};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(g,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(h){return this._compositor.canvas=h
},enumerable:true}});f.exports=a},{}],982:[function(f,g,b){var h,a=false,d=f("../../keyframe/Render"),c=f("ac-deferred").Deferred;
function i(j){this._compositor=j;this._flowDataProvider=this.mainCompositor._loadController._loaders.manifest
}h=i.prototype;h.init=function(j){this._keyframeDiffRender=new d(this._flowDataProvider._data,this.mainCompositor._imageUrlPattern);
return this._keyframeDiffRender.init()};h.applyFrame=function(j){return this._compositor.applyFrame.apply(this._compositor,arguments)
};h.applyKeyframe=function(j,k){this._keyframeDiffRender.renderKeyframe(this.canvas,j,k)
};h.compositeFrames=function(j,l){if(!this._isKeyframeDiff(l-1)){return this._compositor.compositeFrames.apply(this._compositor,arguments)
}var k=new c();if(a){console.groupCollapsed("Rendering keyframe diff image: "+(j-1))
}this.applyKeyframe(l-1);if(a){console.groupEnd()}k.resolve(j-1);return k.promise()
};h._isKeyframeDiff=function(j){return j in this._keyframeDiffRender._loader._keyframes
};h.calculateRenderCount=function(j,k){return this._compositor.calculateRenderCount.apply(this._compositor,arguments)
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(h,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(j){return this._compositor.canvas=j
},enumerable:true},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:true}});g.exports=i},{"../../keyframe/Render":999}],983:[function(d,f,b){var g,a=false,c=d("ac-deferred").Deferred;
function h(i){this._compositor=i;this._frames=this.mainCompositor._loadController._loaders.manifest._data.frames;
this._superframeInterval=this.mainCompositor._diffRender.flowData.superframeFrequency
}g=h.prototype;g.init=function(i){return this._compositor.init.apply(this._compositor,arguments)
};g.applyFrame=function(i){return this._compositor.applyFrame.apply(this._compositor,arguments)
};g.applyKeyframe=function(i,j){this._compositor.applyKeyframe.apply(this._compositor,arguments)
};g.compositeFrames=function(i,l){var m,k,j=new c();if(l<1||l>this.frameCount-2){return this._compositor.compositeFrames.apply(this._compositor,arguments)
}if(this._isKeyframeDiff(l-1)){m=Math.abs(i-l)===1?true:false;if(a){console.groupCollapsed("Drawing superKeyframe image: "+(l-1))
}this.applyKeyframe(l-1,m);if(a){console.groupEnd()}j.resolve(i-1);return j.promise()
}if(Math.abs(l-i)>this._superframeInterval){k=this._getShortestRender(i,l);if(this._isKeyframeDiff(k-1)||k<=0||k>=this.frameCount-2){return this._compositeFromSuperKeyframe(k,l)
}}if(a){console.log("SuperKeyframe compositor handing off to slave compositor: fromFrame:"+i+" toFrame:"+l)
}return this._compositor.compositeFrames.apply(this._compositor,[i,l])};g._getShortestRender=function(i,k){var m=this._compositor.calculateRenderCount,l=this._getClosestSuperKeyframe(k-1),j=m.apply(this._compositor,[l,k])+1,n=m.apply(this._compositor,[i,k]);
if(j<=n){return l}else{return i}};g._compositeFromSuperKeyframe=function(m,k){var i=this.canvas.getContext("2d"),j=(m<=0)?this.mainCompositor._images[0]:(m>=this.frameCount-2?this.mainCompositor._images[1]:this._frames[m-1].image),l;
if(a){console.log("Drawing superKeyframe for composite base: superKeyframe "+(m-1))
}i.drawImage(j,0,0);return this._compositor.compositeFrames.call(this._compositor,m,k)
};g._getClosestSuperFrame=function(i){return Math.round(i/this._superframeInterval)*this._superframeInterval
};g._getClosestSuperKeyframe=function(k){var n,o,m,l,j=this._frames.length;if(k<j+1&&k>0){l=k-1;
while(l>=0){if(this._frames[l].type==="keyframe"){n=l+1;break}l-=1}l=k+1;while(l<=j-1){if(this._frames[l].type==="keyframe"){o=l+1;
break}l+=1}}n=n?n:0;o=o?o:this.frameCount;m=(k-n)<(o-k)?n:o;return m};g._isKeyframeDiff=function(i){return this._compositor._isKeyframeDiff.apply(this._compositor,arguments)
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(g,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(i){return this._compositor.canvas=i
},enumerable:true},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:true}});f.exports=h},{}],984:[function(c,d,b){var f,a=false;function g(i,h){this._compositor=i;
this._superframeInterval=h||4}f=g.prototype;f._getClosestSuperframe=function(h){return Math.round(h/this._superframeInterval)*this._superframeInterval
};f.init=function(h){this._screenCanvas=h};f.applyFrame=function(){this._compositor.applyFrame.apply(this._compositor,arguments)
};f.calculateRenderCount=function(h,j){var i=this._getClosestSuperframe(h);if(Math.abs(i-j)>this._superframeInterval/2){h=i+((h>j)?-1:1)*this._superframeInterval;
return this.calculateRenderCount(h,j)+1}else{return Math.abs(i-j)+1}};f.compositeFrames=function(h,k){var l,i;
if(k<=0||k>=this.frameCount-2){this._compositor.compositeFrames(h,k)}if(h>this.frameCount-2){h=this.frameCount-2
}else{if(h<=0){h=1}}i=this._getClosestSuperframe(h);if(a){console.groupCollapsed("Rendering : "+h+"..."+k)
}if(this._compositor.calculateRenderCount(h,k)>this.calculateRenderCount(h,k)){if(a){console.groupCollapsed("Rendering (superframe) : "+i)
}l=this._compositor.compositeFrames(i,i).then(function j(){if(a){console.groupEnd()
}var m=i+((h>k)?-1:1)*this._superframeInterval;this._compositor.compositeFrames(i,m).then(function(){return this.compositeFrames(m,k)
}.bind(this))}.bind(this))}else{if(a){console.groupCollapsed("Rendering (final frames) : "+h+"..."+k)
}l=this._compositor.compositeFrames(h,k).then(function j(){if(a){console.groupEnd()
}}.bind(this))}l.then(function j(){if(a){console.groupEnd()}}.bind(this));return l
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(f,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(h){return this._compositor.canvas=h
},enumerable:true},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:true}});d.exports=g},{}],985:[function(d,f,c){var h,g=d("ac-event-emitter").EventEmitter,a=d("./MultithreadProcess"),i=d("./MultithreadProcessInterface");
var b=function(j){g.call(this);this._function=j};h=b.prototype=new g(null);h.exec=function(l,k){k=k||{};
if(!this._processURL){this._processURL=this._createThreadProcessURL(this._function)
}if(this._process){this.terminateProcess()}if(!this._process){this._process=new window.Worker(this._processURL);
this._process.onmessage=this._onMessage.bind(this)}var j;if(k.transfer){j=[l]}this._process.postMessage(l,j);
return this};h.run=function(n,m,k){k=k||{};var l={name:n,data:m||{}};var j;if(k.transfer){j=[l]
}this._process.postMessage(l,j);this.trigger(n,m)};h.destroy=function(){this.terminateProcess();
this._function=null;this._processURL=null;return this};h.terminateProcess=function(){if(this._process){this._process.terminate();
this._process=null}return this};h._createThreadProcessURL=function(l){var k=this._compileProcess(l),j=new window.Blob([k],{type:"text/javascript"});
return this._getURLObject().createObjectURL(j)};h._getURLObject=function(){return window.URL||window.webkitURL||null
};h._compileProcess=function(l){var o=a.toString();var j=/(['|"]){{INTERFACE}}\1/,k=/(['|"]){{PROCESS}}\1/;
o=o.replace(j,"("+i.toString()+")();");o=o.replace(k,l.toString());var m="(",n=")();";
return m+o+n};h._handleTrigger=function(j,k){this.trigger(j,k)};h._onMessage=function(l){if(!l.data){return
}var j=l.data.evt,k=l.data.data;if(j==="__trigger__"){this._handleTrigger(k.trigger,k.data)
}return this};f.exports=b},{"./MultithreadProcess":986,"./MultithreadProcessInterface":987,"ac-event-emitter":false}],986:[function(c,d,b){var a=function(){var g="{{PROCESS}}",f="{{INTERFACE}}";
this.processInstance;this.onmessage=function(j,h,i){i=i||{};if(!h.processInstance){h.processInstance=new j(this)
}else{h.processInstance._onMessage(i.data.name,i.data.data)}}.bind(f,g,this)};d.exports=a
},{}],987:[function(b,c,a){var d=function(){return{trigger:function(i,h,f){var g={trigger:i,data:h};
this._post("__trigger__",g,f)},_post:function(f,j,h){h=h||{};var g,i={evt:f,data:j};
if(h.transfer){g=[j]}postMessage(i,g)}}};c.exports=d},{}],988:[function(b,c,a){var d;
var f=function(g){this._interface=g;this.trigger=function(j,i,h){this._interface.trigger(j,i,h);
return this};this.renderFrameDiffs=function(m){var j=m.binaryFrame,o=m.compositingData,n=m.frameData,l=m.sourceImagesData,h=n.length,k;
for(k=0;k<h;k++){j=this._applyBlocksToBinaryFrame(j,n[k],l,o)}this.trigger("frameReady",j)
};this._applyBlocksToBinaryFrame=function(i,t,z,A){var l=t.block,G=Math.floor(l/A.blocksPerFullDiff),p=A.imageWidth,F=t.length,D=A.columnsInCanvas,C=A.canvasWidth,E=l%A.blocksPerFullDiff,h=p/A.blockSize;
var w=(E%h)*A.blockSize,v=Math.floor(E/(h||1))*A.blockSize,o=(t.location%D)*A.blockSize,n=Math.floor(t.location/D)*A.blockSize;
var r,q,u,k,j,B,s,m;while(F>0){s=Math.min((F*A.blockSize),C-o,p-w);m=s/A.blockSize;
k=z[G];for(q=0;q<A.blockSize;q++){for(r=0;r<s;r++){j=(v+q)*p+(w+r);B=(n+q)*C+(o+r);
i.buf32[B]=k[j]}}F-=m;if(F>0){if((w+=s)>=p){w=0;v+=A.blockSize}if((E+=m)>=A.blocksPerFullDiff){E=0;
w=0;v=0;G+=1;if(G===A.imagesRequired-1){p=A.imageWidth}}if((o+=s)>=C){o=0;n+=A.blockSize
}l+=m}}return i};this._onMessage=function(i,h){if(typeof this[i]==="function"){this[i](h)
}}};c.exports=f},{}],989:[function(b,c,a){function d(f,g){this.location=f;this.length=g
}c.exports=d},{}],990:[function(c,d,b){function a(){}d.exports=a},{}],991:[function(c,d,b){var h=c("./Manifest"),a=c("./Block"),g;
var f={parseData:function(i){g=0;var j=i.frames.map(this._parseFrame,this);return Object.create(h.prototype,{version:{value:i.version},framecount:{value:i.frameCount},blockSize:{value:i.blockSize},imagesRequired:{value:i.imagesRequired},reversible:{value:i.reversible},superframeFrequency:{value:i.superframeFrequency},frames:{value:j}})
},_valueForCharAt:function(k,i){var j=k.charCodeAt(i);if(j>64&&j<91){return j-65
}if(j>96&&j<123){return j-71}if(j>47&&j<58){return j+4}if(j===43){return 62}if(j===47){return 63
}throw"Invalid Bas64 character: "+k.charAt(i)},_createNumberFromBase64Range:function(m,i,l){var k=0,j;
while(l--){j=this._valueForCharAt(m,i++);k+=(j<<l*6)}return k},_parseFrame:function(k){var l,n=[],k=k.value||k,m,j;
for(l=0;l<k.length;l+=5){j=this._createNumberFromBase64Range(k,l,3);m=this._createNumberFromBase64Range(k,l+3,2);
n.push(Object.create(a.prototype,{location:{value:j,enumerable:true},length:{value:m,enumerable:true},block:{value:(g+=m)-m,enumerable:true}}))
}return n}};d.exports=f},{"./Block":989,"./Manifest":990}],992:[function(c,d,a){var g,b=c("ac-asset-loader").AssetLoader,h=c("../processor");
function f(i){this._assetLoader=new b([i])}g=f.prototype;g.load=function(){return this._assetLoader.load().then(function(j){var i;
if(j&&j.length){i=h.parseData(j[0]);this._data=i}return i}.bind(this))};d.exports=f
},{"../processor":991,"ac-asset-loader":37}],993:[function(c,d,a){var g,b=c("ac-deferred").Deferred;
var f=function(h){if(typeof h==="string"){h=[h]}this.srcArr=h};g=f.prototype;g._request=function(j){var h=new b();
var i=new XMLHttpRequest();i.addEventListener("load",function(){var k=i.response;
h.resolve(k)});i.responseType="arrayBuffer";i.open("get",j,true);i.send();return h.promise()
};g.load=function(){this._deferred=new b();var l=[];var k,j=this.srcArr,h=j.length;
for(k=0;k<h;k++){l.push(this._request(j[k]))}b.all(l).then(function(i){this._deferred.resolve(i)
}.bind(this));return this._deferred.promise()};d.exports=f},{}],994:[function(c,b,d){var i=false;
var g,k=c("./Loader"),h=c("ac-deferred").Deferred,a=c("../compositor/multithread/MultithreadController"),f=c("../compositor/multithread/MultithreadRenderer");
function j(m,l){this.flowData=m;this.flowData.imageUrlPattern=l;this.ArrayBufferCompositor=document.createElement("canvas");
this.ArrayBufferCompositorContext=this.ArrayBufferCompositor.getContext("2d");this.sourceImagesData={};
this._processor=new a(f);this._processor.exec();window.processor=this._processor
}g=j.prototype;g._storeImages=function(l){if(i){console.log("loaded images")}this.images=l;
this._blocksPerFullDiff=(l[0].width/this.flowData.blockSize)*(l[0].height/this.flowData.blockSize);
return(new h()).resolve()};g._getImageDataAsArrayBuffer=function(n,o,m){m=m||o;
this.ArrayBufferCompositor.width=o;this.ArrayBufferCompositor.height=m;this.ArrayBufferCompositorContext.drawImage(n,0,0);
var l=new Uint32Array(this.ArrayBufferCompositorContext.getImageData(0,0,o,m).data.buffer);
return l};g._processDataConstants=function(){this._compositingConstants={images:[]};
var m,l=this.images.length;for(m=0;m<l;m++){this._compositingConstants.images[m]={};
this._compositingConstants.images[m].width=this.images[m].width}return(new h()).resolve()
};g._setFrameRequirements=function(q){var p=q[0],n=q[q.length-1];var o=this._getImageIndexOfBlock(p.block),l=this._getImageIndexOfBlock(n.block+n.length);
var m,r={};for(m=o;m<l+1;m++){if(this.sourceImagesData[m]){r[m]=this.sourceImagesData[m]
}else{r[m]=this._getImageDataAsArrayBuffer(this.images[m],this.images[m].width)
}}this.sourceImagesData=r;return r};g._getImageIndexOfBlock=function(l){return Math.floor(l/this._blocksPerFullDiff)
};g._setCompositingData=function(l,m){this._compositingData={imageWidth:this._compositingConstants.images[0].width,canvasWidth:m.canvas.width,canvasHeight:m.canvas.height,blocksPerFullDiff:this._blocksPerFullDiff,blockSize:this.flowData.blockSize,imagesRequired:this.flowData.imagesRequired};
var n=m.getImageData(0,0,this._compositingData.canvasWidth,this._compositingData.canvasHeight).data;
this._compositingData.columnsInCanvas=this._compositingData.canvasWidth/this.flowData.blockSize,this._compositingData.imageData=new Uint8ClampedArray(n)
};g._createBinaryFrame=function(n,m,l){return{buf8:n,buf32:new Uint32Array(n.buffer),width:m,height:l}
};g._getBinaryImageArrayLength=function(l){return l.canvasWidth};g._compositeBinaryFrame=function(r,q){var o,l=r.length,n=new h();
var p=this._setFrameRequirements(r);var m;if(this._lastBinaryFrame){m=this._lastBinaryFrame
}else{m=this._createBinaryFrame(q.imageData,q.canvasWidth,q.canvasHeight)}this._processor.run("renderFrameDiffs",{binaryFrame:m,frameData:r,compositingData:q,sourceImagesData:p});
this._processor.once("frameReady",n.resolve.bind(n));return n.promise()};g._getSourceImageAs32Bit=function(l){return new Uint32Array(this.sourceImagesData[l].data.buffer)
};g._applyBlocksToBinaryFrame=function(m,z,D){var p=z.block,J=Math.floor(p/this._blocksPerFullDiff),t=this._compositingConstants.images[J].width,I=z.length,G=D.columnsInCanvas,F=D.canvasWidth,H=p%this._blocksPerFullDiff,l=t/this.flowData.blockSize;
var C=(H%l)*this.flowData.blockSize,B=Math.floor(H/(l||1))*this.flowData.blockSize,s=(z.location%G)*this.flowData.blockSize,r=Math.floor(z.location/G)*this.flowData.blockSize;
var v,u,A,o,n,E,w,q;while(I>0){w=Math.min((I*this.flowData.blockSize),F-s,t-C);
q=w/this.flowData.blockSize;o=this.sourceImagesData[J];for(u=0;u<this.flowData.blockSize;
u++){for(v=0;v<w;v++){n=(B+u)*t+(C+v);E=(r+u)*F+(s+v);m.buf32[E]=o[n]}}I-=q;if(I>0){if((C+=w)>=t){C=0;
B+=this.flowData.blockSize}if((H+=q)>=this._blocksPerFullDiff){H=0;C=0;B=0;J+=1;
if(J===this.flowData.imagesRequired-1){t=this._compositingConstants.images[J].width
}}if((s+=w)>=F){s=0;r+=this.flowData.blockSize}p+=q}}return m};g.init=function(){console.log("LOADED BINARY");
if(i){console.log("load images")}return new k(this.flowData.imageUrlPattern,this.flowData.imagesRequired).load({binary:true}).then(this._storeImages.bind(this)).then(this._processDataConstants.bind(this))
};g.renderDiff=function(n,p){var o=n.getContext("2d"),m=new h();if(!this._compositingData){this._setCompositingData(n,o)
}p-=1;if(i){this._frameToRender=p}var l=this._compositeBinaryFrame(this.frames[p],this._compositingData);
l.then(function(r,q){this._lastBinaryFrame=q;r.resolve(q)}.bind(this,m));return m.promise()
};g.getBinaryDataFromFlowDataBlock=function(l){};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(g,{frames:{get:function(){return this.flowData.frames},set:function(l){this.flowData.frames=l
},enumerable:true}});b.exports=j},{"../compositor/multithread/MultithreadController":985,"../compositor/multithread/MultithreadRenderer":988,"./Loader":996}],995:[function(f,g,c){var h,b=false,d=f("ac-deferred").Deferred;
function a(k,i,j){this.flowData=k;this.flowData.imageUrlPattern=i;this._loadController=j;
this.ArrayBufferCompositor=document.createElement("canvas");this.ArrayBufferCompositorContext=this.ArrayBufferCompositor.getContext("2d");
this.sourceImagesData={};this._forceBinaryComposite=true}h=a.prototype;h._storeImages=function(i){if(b){console.log("loaded images")
}this.images=i;this._blocksPerFullDiff=(i[0].width/this.flowData.blockSize)*(i[0].height/this.flowData.blockSize);
return(new d()).resolve()};h._getImageDataAsArrayBuffer=function(k,l,j){j=j||l;
if(this.ArrayBufferCompositor.width!==l){this.ArrayBufferCompositor.width=l}if(this.ArrayBufferCompositor.height!==j){this.ArrayBufferCompositor.height=j
}this.ArrayBufferCompositorContext.drawImage(k,0,0);var i={buf8:this.ArrayBufferCompositorContext.getImageData(0,0,l,j).data};
i.buf32=new Uint32Array(i.buf8.buffer);return i};h._processDataConstants=function(){this._compositingConstants={images:[]};
var k,j=this.images.length;for(k=0;k<j;k++){this._compositingConstants.images[k]={};
this._compositingConstants.images[k].width=this.images[k].width}return(new d()).resolve()
};h._setFrameRequirements=function(p){var o=p[0],l=p[p.length-1];var n=this._getImageIndexOfBlock(o.block),j=this._getImageIndexOfBlock(l.block+l.length),m=j+1;
var k,q={};for(k=n;k<m;k++){if(this.sourceImagesData[k]){q[k]=this.sourceImagesData[k]
}else{q[k]=this._getImageDataAsArrayBuffer(this.images[k],this.images[k].width)
}}this.sourceImagesData=q};h._getImageIndexOfBlock=function(i){return Math.floor(i/this._blocksPerFullDiff)
};h._setCompositingData=function(i,j){this._compositingData={imageWidth:this._compositingConstants.images[0].width,canvasWidth:j.canvas.width,canvasHeight:j.canvas.height};
var k=j.getImageData(0,0,this._compositingData.canvasWidth,this._compositingData.canvasHeight).data;
this._compositingData.columnsInCanvas=this._compositingData.canvasWidth/this.flowData.blockSize,this._compositingData.imageData=new Uint8ClampedArray(k)
};h._createBinaryFrame=function(k,j,i){return{buf8:k,buf32:new Uint32Array(k.buffer),width:j,height:i}
};h._getBinaryImageArrayLength=function(i){return i.canvasWidth};h._compositeBinaryFrame=function(n,m){var l,j=n.length;
this._setFrameRequirements(n);var k;if(this._lastBinaryFrame&&!this._forceBinaryComposite){k=this._lastBinaryFrame
}else{k=this._createBinaryFrame(m.imageData,m.canvasWidth,m.canvasHeight);if(this._renderOperation){this._cleanBinaryFrame=this._cloneBinaryFrame(k);
k=this.forceApplyFilter(k,m)}else{if(this._cleanBinaryFrame){this._cleanBinaryFrame=null
}}this._forceBinaryComposite=false}if(this._beforeRenderOperation){k=this._beforeRenderOperation(k)
}for(l=0;l<j;l++){k=this._applyBlocksToBinaryFrame(k,n[l],m)}return k};h._applyBlocksToBinaryFrame=function(j,A,F){var s=this.flowData.blockSize,C=this._blocksPerFullDiff,H=this.flowData.imagesRequired,n=A.block,M=Math.floor(n/C),r=this._compositingConstants.images[M].width,L=A.length,J=F.columnsInCanvas,I=F.canvasWidth,m=F.canvasHeight,K=n%C,i=r/s;
var E=(K%i)*s,D=Math.floor(K/(i||1))*s,q=(A.location%J)*s,p=Math.floor(A.location/J)*s;
var w,v,u,t,B,l,k,G,z,o;while(L>0){z=Math.min((L*s),I-q,r-E);o=z/s;l=this.sourceImagesData[M];
for(v=0;v<s;v++){for(w=0;w<z;w++){u=q+w;t=p+v;k=(D+v)*r+(E+w);G=t*I+u;if(this._renderOperation){this._cleanBinaryFrame.buf32[G]=l.buf32[k];
l=this._renderOperation(l,(k*4),u,t,I,m)}j.buf32[G]=l.buf32[k]}}L-=o;if(L>0){if((E+=z)>=r){E=0;
D+=s}if((K+=o)>=C){K=0;E=0;D=0;M+=1;if(M===H-1){r=this._compositingConstants.images[M].width
}}if((q+=z)>=I){q=0;p+=s}n+=o}}return j};h._cloneBinaryFrame=function(i){var j=i.buf8.buffer.slice(0);
return{buf8:new Uint8ClampedArray(j),buf32:new Uint32Array(j),width:i.width,height:i.height}
};h.init=function(){if(b){console.log("load images")}return this._loadController.loadDiffs().then(this._storeImages.bind(this)).then(this._processDataConstants.bind(this))
};h.renderDiff=function(j,l,k){var k=k||j.getContext("2d");if(!this._compositingData||this._forceBinaryComposite){this._setCompositingData(j,k)
}l-=1;if(b){this._frameToRender=l}var i=this._compositeBinaryFrame(this.frames[l],this._compositingData);
this._lastBinaryFrame=i;return new d().resolve(i)};h.forceBinaryComposite=function(){this._forceBinaryComposite=true;
return this};h.forceApplyFilter=function(q,j){if(this._renderOperation){var n,s,r,l,k,m=j.canvasWidth,o=j.canvasHeight,p=q.buf32.length;
for(n=0;n<p;n++){s=n%m;if(n>0){r=Math.floor(n/m)}else{r=0}q=this._renderOperation(q,(n*4),s,r,m,o)
}}return q};h.forceKeyframeRender=function(j,k){this._setCompositingData(j,k);var l=this._compositingData,i=this._createBinaryFrame(l.imageData,l.canvasWidth,l.canvasHeight);
if(this._renderOperation){this._cleanBinaryFrame=this._cloneBinaryFrame(i);i=this.forceApplyFilter(i,l)
}return i};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(h,{frames:{get:function(){return this.flowData.frames
},set:function(i){this.flowData.frames=i},enumerable:true},_beforeRenderOperation:{value:undefined,enumerable:false,writable:true},_renderOperation:{value:undefined,enumerable:false,writable:true},beforeRenderOperation:{get:function(){return this._beforeRenderOperation
},set:function(i){if(typeof i==="function"){this._beforeRenderOperation=i;return
}this._beforeRenderOperation=undefined},enumerable:true},renderOperation:{get:function(){return this._renderOperation
},set:function(i){if(typeof i==="function"){this.forceBinaryComposite();this._renderOperation=i;
return}this._renderOperation=undefined;this.forceBinaryComposite()},enumerable:true}});
g.exports=a},{}],996:[function(c,d,b){var g,a=c("ac-asset-loader").AssetLoader,f=c("./BinaryLoader");
function h(l,j){var k,n,m=l.match(/#/g).length;this.imagesUrls=[];if(!j){throw new Error("0 images provided")
}for(k=1;k<=j;k++){n="0000"+k;n=n.substring(n.length-m);this.imagesUrls.push(l.replace(/#{2,}/g,n))
}}g=h.prototype;g.load=function(i){i=i||{};return new a(this.imagesUrls).load()
};d.exports=h},{"./BinaryLoader":993,"ac-asset-loader":37}],997:[function(f,g,c){var h,b=false,d=f("ac-deferred").Deferred;
function a(k,i,j){this.flowData=k;this.flowData.imageUrlPattern=i;this._loadController=j
}h=a.prototype;h._storeImages=function(i){if(b){console.log("loaded images")}this.images=i;
this._blocksPerFullDiff=(i[0].width/this.flowData.blockSize)*(i[0].height/this.flowData.blockSize);
return(new d()).resolve()};h._applyDiffRange=function(k,r){var p=r.block,l=r.length,j=k.canvas.width/this.flowData.blockSize,n=Math.floor(p/this._blocksPerFullDiff),w=this.images[n].width,i=p%this._blocksPerFullDiff,v=w/this.flowData.blockSize,u=(i%v)*this.flowData.blockSize,t=Math.floor(i/(v||1))*this.flowData.blockSize,q=(r.location%j)*this.flowData.blockSize,o=Math.floor(r.location/j)*this.flowData.blockSize,m,s;
while(l){m=Math.min((l*this.flowData.blockSize),k.canvas.width-q,w-u);s=m/this.flowData.blockSize;
if(b){if(typeof this.renderDebugger!=="undefined"&&this._frameToRender>0){this.renderDebugger.registerComparison(this._frameToRender,{image:n,block:p,x:u,y:t})
}}k.drawImage(this.images[n],u,t,m,this.flowData.blockSize,q,o,m,this.flowData.blockSize);
l-=s;if(l){if((u+=m)>=w){u=0;t+=this.flowData.blockSize}if((i+=s)>=this._blocksPerFullDiff){i=0;
u=0;t=0;n+=1;if(n===this.flowData.imagesRequired-1){w=this.images[n].width}}if((q+=m)>=k.canvas.width){q=0;
o+=this.flowData.blockSize}p+=s}}};h.init=function(){if(b){console.log("load images")
}return this._loadController.loadDiffs().then(this._storeImages.bind(this))};h.renderDiff=function(i,l){var j=i.getContext("2d");
l-=1;if(b){this._frameToRender=l;console.log("applying diff frame : "+(l+1))}this.frames[l].forEach(function k(m){this._applyDiffRange(j,m)
}.bind(this))};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(h,{frames:{get:function(){return this.flowData.frames},set:function(i){this.flowData.frames=i
},enumerable:true}});g.exports=a},{}],998:[function(f,g,c){var h,a=f("ac-asset-loader").AssetLoader,d=f("ac-deferred").Deferred;
function b(i,l){var k,j=i.match(/#/g).length;this._keyframes={};i=i.replace(/([^#]+)(#+)(\..*)/,"$1key_$2$3");
this._imageUrls=[];if(l.frames){l.frames.forEach(function(n,m){if(n.type==="keyframe"){k="0000"+m;
k=k.substring(k.length-j);this._imageUrls.push(i.replace(/#+/g,k));this._keyframes[m]=n
}}.bind(this))}}h=b.prototype;h.load=function(){if(this._imageUrls.length>0){return new a(this._imageUrls).load()
}return(new d()).resolve()};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(h,{keyframes:{get:function(){return this._keyframes},enumerable:true}});
g.exports=b},{"ac-asset-loader":37}],999:[function(c,d,b){var f,a=false,h=c("./Loader");
function g(j,i){this.flowData=j;this.flowData.imageUrlPattern=i}f=g.prototype;f._storeImages=function(j){var l=0,m;
if(j&&j.length>0){if(a){console.log("loaded keyframe diff images")}for(var k in this._loader._keyframes){if(this._loader._keyframes.hasOwnProperty(k)){m=j[l];
this._loader._keyframes[k].image=m;l+=1}}}if(a){if(!j||j.length===0){console.log("no keyframe diff images to load")
}}};f.init=function(){if(a){console.log("loading keyframe diff images")}this._loader=new h(this.flowData.imageUrlPattern,this.flowData);
return this._loader.load().then(this._storeImages.bind(this))};f.renderKeyframe=function(k,j,r){var i=k.getContext("2d"),l=this._loader.keyframes[j],m=l.image,p=l.x,o=l.y,q=l.width,n=l.height;
if(a){console.log("applying keyframe diff image: "+j);console.log("x:"+p+" y:"+o+" w:"+q+" h:"+n)
}if(r===true){if(a){console.log("drawing superKeyframe sub-rectangle")}i.drawImage(m,p,o,q,n,p,o,q,n)
}else{if(this.flowData.reversible){if(a){console.log("drawing superKeyframe full image")
}i.drawImage(m,0,0)}else{if(a){console.log("drawing keyframe full image")}i.drawImage(m,p,o,q,n)
}}};d.exports=g},{"./Loader":998}],1000:[function(b,c,a){function d(i,j,m,k,n){var g,h,l,f;
n=n||{};n={keyframeCache:(typeof n.keyframeCache==="undefined")?8:n.keyframeCache,benchmark:(typeof n.benchmark==="undefined")?false:n.benchmark,preload:(typeof n.preload==="undefined")?true:n.preload,renderType:n.renderType||"default",multithread:n.multithread||false};
j=j||[i.getAttribute("data-start-frame")];if(i.getAttribute("data-end-frame")){j.push(i.getAttribute("data-end-frame"))
}m=m||i.getAttribute("data-image-url-pattern");l=(typeof k==="string")?new FlowDataProviderAsync(k):new FlowDataProviderSync(k);
if(n.renderType==="binary"){g=new AC_BinaryCompositor(j,m,l,n.multithread)}else{if(n.renderType==="default"){g=new AC_FlowCompositorSequence(j,m,l)
}}h=new AC_FlowPlayer(i,new AC_Flow(g,n));if(n.preload){h.load()}return h}c.exports=d
},{}],1001:[function(b,c,a){var f;function d(g){this.name=g}f=d.prototype;f.start=function(){if(DEBUG){console.log("▼▼▼ start "+this.name+" benchmark");
this.startTime=new Date().getTime();console.time(this.name)}};f.end=function(){if(DEBUG){this.endTime=new Date().getTime();
console.log("▲▲▲ end "+this.name+" benchmark "+(this.endTime-this.startTime)/1000+" sec");
console.time(this.timeEnd)}};c.exports=d},{}],1002:[function(b,c,a){c.exports=b(26)
},{}],1003:[function(b,c,a){arguments[4][27][0].apply(a,arguments)},{"./ac-object/clone":1004,"./ac-object/create":1005,"./ac-object/defaults":1006,"./ac-object/extend":1007,"./ac-object/getPrototypeOf":1008,"./ac-object/isDate":1009,"./ac-object/isEmpty":1010,"./ac-object/isRegExp":1011,"./ac-object/toQueryParameters":1012}],1004:[function(b,c,a){c.exports=b(28)
},{"./extend":1007}],1005:[function(b,c,a){c.exports=b(29)},{}],1006:[function(b,c,a){c.exports=b(30)
},{"./extend":1007}],1007:[function(b,c,a){c.exports=b(31)},{}],1008:[function(b,c,a){c.exports=b(32)
},{}],1009:[function(b,c,a){c.exports=b(33)},{}],1010:[function(b,c,a){c.exports=b(34)
},{}],1011:[function(b,c,a){c.exports=b(35)},{}],1012:[function(b,c,a){c.exports=b(36)
},{qs:1002}],1013:[function(c,f,a){var d=c("./ac-media-object/create");var b=c("./ac-media-object/cname");
f.exports={create:d,cname:b}},{"./ac-media-object/cname":1023,"./ac-media-object/create":1024}],1014:[function(c,b,f){var j=c("ac-event-emitter").EventEmitter;
var a=c("../eventNames");var i=c("../utils/propertiesAreNull");var h=2;function k(){this._items=[];
this._loadingItem=null;this._active=false}var g=k.prototype=new j();g.load=function(){this._active=true;
return this._loadNext()};g._loadNext=function(){if(this._items.length===0){return
}this._loadingItem=this._items.shift();this._loadItem(this._loadingItem)};g._loadItem=function(l){var m;
this._loadingItem=l;if(l&&l.asset&&!i(l.asset)){l.asset.on(a.loaded,this._itemLoaded.bind(this,l));
l.asset.load()}else{if(this._active){this._loadNext()}}return m};g._itemLoaded=function(m,l){this.trigger(a.progress,{asset:m.asset,binaries:l});
if(this._active===true){this._loadNext()}};g.pause=function(){if(this._loadingItem){this._loadingItem.asset.pause();
this._items.unshift(this._loadingItem);this._loadingItem=null}this._active=false
};g.getItems=function(){return this._items};g.remove=function(o){var n=this._active;
var m;var p;var l=null;if(this._loadingItem&&this._loadingItem.asset===o){p=this._loadingItem;
this.pause()}for(m=0;m<this._items.length;m+=1){if(this._items[m].asset===o){p=this._items[m];
l=m;break}}p.asset.destroy();if(l!==null){this._items.splice(l,1)}if(n&&this._active===false){this.load()
}};g.add=function(n,l){var m=this._active;var o=true;l=(typeof l==="number")?l:h;
if(this._loadingItem&&this._loadingItem.priority<=l){o=false}if(o===true){this.pause()
}this._items.push({asset:n,priority:l});this._sort();if(m&&this._active===false){this.load()
}};g._sort=function(){this._items.sort(function(m,l){if(m.priority<l.priority){return -1
}return 1})};var d=new k();d.load();d.LoadingQueue=k;b.exports=d},{"../eventNames":1025,"../utils/propertiesAreNull":1027,"ac-event-emitter":false}],1015:[function(h,d,k){var m=h("ac-base").Element;
var j=h("ac-object");var p=h("ac-ajax");var n=h("../utils/destroy");var q=h("ac-event-emitter").EventEmitter;
var c=h("../eventNames");var b=h("./MediaObject/Loader");var g=h("./MediaObject/Loader/QueuedLoader");
var a=h("./MediaObject/View");var l;var i={preload:false,autoplay:false,fadeToEndframe:false,transitionDuration:0.4,frameRate:24,queueLoading:false,loadPriority:null};
var f={posterframeSrc:".posterframe",endstateSrc:".endstate"};var o=function(r,t,s){this.container=m.getElementById(r);
if(!this.container){throw"MediaObject: requires valid DOM Node for ‘container’"
}this.options=j.defaults(i,s||{});this.mediaSrc=j.defaults(f,t||{});if(this.mediaSrc.basePath){this.mediaSrc.basePath=this._forceTrailingSlash(this.mediaSrc.basePath)
}this._media=null;this._mediaElement=null;this._mediaEmitter=null;this._loadObject=null;
this._totalFrames=null;this.duration=null;this.ended=false;this.loader=null;this.dataOptionsAttribute="mediaObject";
this.dataAssetOptionsAttribute="mediaObject-asset";this.ready=false;this._updateOptionsFromDataAttribute();
this._mediaExistsSrc=this._constructMediaExistsSrc();this.view=new a(this);if(this.options.preload===true||this.options.autoplay===true){this.load()
}};l=o.prototype=new q();l.enhance=function(){if(!this.view.enhanced){this._generate();
this.view.enhance().then(function(){this.trigger(c.enhance,this)}.bind(this))}};
l.degrade=function(){if(this._media){this.pause()}if(this.view){this.view.degrade();
this.trigger(c.degrade,this)}};l._generate=function(){if(this.loader===null){if(this.options.queueLoading){this.loader=new g(this._loadObject,this.options.loadPriority);
this.prioritize=this.loader.prioritize.bind(this.loader)}else{this.loader=new b(this._loadObject)
}this._addEventListeners()}};l._forceTrailingSlash=function(r){if(r&&r.lastIndexOf("/")!==r.length-1){r=r+"/"
}return r};l._updateOptionsFromDataAttribute=function(){var r=this._parseDataAttributeOptions(this.container,this.dataOptionsAttribute);
var s=this._parseDataAttributeOptions(this.container,this.dataAssetOptionsAttribute);
j.defaults(this.options,r||{});j.defaults(this.mediaSrc,s||{})};l._parseDataAttributeOptions=function(u,s){u=m.getElementById(u);
var v=u.getAttribute("data-"+s);var r;var t={};var w;if(v&&v.length>0){r=v.split(",");
if(r&&r.length>0){r.forEach(function(x){w=x.split(":");t[w[0]]=w[1]})}}return t
};l._constructMediaExistsSrc=function(){var r="";var s=this.mediaSrc.basePath?this._forceTrailingSlash(this.mediaSrc.basePath):"";
if(this.mediaSrc.splitFileLoading===true){r=s}else{r=s+this.mediaSrc.filename+"."+this.mediaSrc.fileFormat
}return r};l.load=function(){if(this.loader===null||this.loader.loaded!==true){this._generate();
this.trigger(c.loadstart,this);this._load();return this.loader.load()}};l._load=function(){this.once(c.loaded,this._onReady,this)
};l.play=function(r){if(!this.ready){this.load();this.options.autoplay=true;return
}if(!this._media.paused){return false}this._play(r);this.trigger(c.play,this)};
l._play=function(r){if(this.ready&&this._media!==null){if(typeof r==="number"){this.setPlaybackRate(r)
}this._media.play()}};l.pause=function(){if(this._media.paused){return false}this._pause();
this.trigger(c.pause,this)};l._pause=function(){this._media.pause()};l.reset=function(){this._reset()
};l._reset=function(){if(this.ready){this.setTime(0)}};l.stop=function(){this.options.autoplay=false;
this._stop();this.trigger(c.stop,this)};l._stop=function(){this._pause();this.reset()
};l.setTime=function(r){if(r<0){r=0}if(r>this.duration){r=this.duration}return this._media.currentTime=r
};l.goToFrame=function(s){var r=s/this.options.frameRate;return this.setTime(r)
};l.goToDurationPercent=function(r){var s=r*this.duration;return this.setTime(s)
};l.currentFrame=function(){return Math.floor(this.currentTime()*this.options.frameRate)
};l.currentTime=function(){return this._media.currentTime};l.getCurrentTime=function(){return this._media.currentTime
};l.getPlaybackRate=function(){return this._media.playbackRate};l.setPlaybackRate=function(r){return this._media.playbackRate=r
};l._addEventListeners=function(){this._mediaEmitter.on(c.ended,this._onEnded,this);
this.loader.once(c.loaded,this._onLoad,this);this.loader.once(c.errored,this._onError,this)
};l.destroy=function(){this.trigger(c.destroy,this);this._mediaEmitter.off();n(this,true)
};l._getTotalFrames=function(){return this.duration*this.options.frameRate};l.mediaExists=function(){this._request=p.create({method:"HEAD",url:this._mediaExistsSrc,timeout:2000});
return this._request.send()};l._onReady=function(){this.ready=true;this.duration=this._media.duration;
this._totalFrames=this._getTotalFrames();this._mediaEmitter.on("durationchange",function(){this.duration=this._media.duration;
this._totalFrames=this._getTotalFrames()},this);this.trigger(c.ready,this);if(this.options.autoplay===true){this.options.autoplay=false;
if(this.view.enhanced===false){this.enhance()}this.play()}};l._onEnded=function(){this.ended=true;
this.trigger(c.ended,this)};l._onLoad=function(){this.loaded=true;this.trigger(c.loaded,this)
};l._onError=function(){this.degrade()};d.exports=o},{"../eventNames":1025,"../utils/destroy":1026,"./MediaObject/Loader":1017,"./MediaObject/Loader/QueuedLoader":1018,"./MediaObject/View":1020,"ac-ajax":13,"ac-base":false,"ac-event-emitter":false,"ac-object":1003}],1016:[function(f,c,j){try{var b=f("ac-flow-x").Flow
}catch(h){}var i=f("ac-object");var a=f("../../eventNames");var m=f("../MediaObject");
var l;var g={};var d={};var k=function(n,p,o){p=i.defaults(d,p||{});o=i.defaults(g,o||{});
this.canvas=null;m.apply(this,arguments)};l=k.prototype=i.create(m.prototype);l._generate=function(){if(this._media!==null||b===undefined){return
}var o;var p=document.createElement("canvas");var n={element:p,preload:false,superFrames:this.options.superFrames||false,reversable:this.options.reversable||false,keyframeCache:this.options.keyframeCache||false,benchmark:this.options.benchmark||false,multithread:this.options.multithread||false,preventDraw:this.options.preventDraw||false,renderType:this.options.renderType||"default"};
var q={basePath:this.mediaSrc.basePath||null,baseName:this.mediaSrc.filename||"flow",imageUrlPattern:this.mediaSrc.imageUrlPattern||"###",fileFormat:this.mediaSrc.fileFormat||"jpg",startframeFileFormat:this.mediaSrc.startframeFileFormat||null,endframeFileFormat:this.mediaSrc.endframeFileFormat||null,manifestPath:this.mediaSrc.manifestPath||null,manifestFileFormat:this.mediaSrc.manifestFileFormat||"json",diffPath:this.mediaSrc.diffPath||null,framePath:this.mediaSrc.framePath||null};
o=new b(n,q);o.frameRate=this.options.frameRate;this._media=o;this._mediaElement=o.element;
this._mediaEmitter=o;this._loadObject=o.loader;m.prototype._generate.call(this);
return this.mediaObject};l._constructMediaExistsSrc=function(){var o="";var q=this.mediaSrc.basePath?this._forceTrailingSlash(this.mediaSrc.basePath):null;
var n=this.mediaSrc.filename?this.mediaSrc.filename+"_":"_";var p=this.mediaSrc.manifestPath?this._forceTrailingSlash(this.mediaSrc.manifestPath):null;
o=(p||q)+n+"manifest."+(this.mediaSrc.manifestFileFormat||"json");return o};l._load=function(){this._mediaEmitter.once("canplaythrough",this._onReady,this)
};c.exports=k},{"../../eventNames":1025,"../MediaObject":1015,"ac-flow-x":971,"ac-object":1003}],1017:[function(d,c,f){var i=d("../../utils/destroy");
var h=d("../../utils/propertiesAreNull");var j=d("ac-event-emitter").EventEmitter;
var b=d("../../eventNames");var g;var a=function(k){this.loadObject=k;this.loaded=false;
this.loadObject.once(b.loaded,this._onLoad,this);this.loadObject.once(b.errored,this._onError,this)
};g=a.prototype=new j();g.load=function(){if(!this.loaded){return this._load()}};
g.pause=function(){if(!this.loaded){this.loadObject.pause()}};g._load=function(){return this.loadObject.load()
};g._onLoad=function(){this.loaded=true;this.trigger(b.loaded)};g._onError=function(){this.trigger(b.errored)
};g.destroy=function(){if(!h(this.loadObject)){this.pause();if(typeof this.loadObject.destroy==="function"){this.loadObject.destroy()
}}i(this,false)};c.exports=a},{"../../eventNames":1025,"../../utils/destroy":1026,"../../utils/propertiesAreNull":1027,"ac-event-emitter":false}],1018:[function(d,b,h){var f=d("ac-object");
var a=d("../../../eventNames");var g=d("../../LoadingQueue");var j=d("../Loader");
var i;var c=function(l,k){this.priority=k;j.apply(this,[l])};i=c.prototype=f.create(j.prototype);
i.prioritize=function(k){this.priority=k;this.loadObject.pause();g.remove(this.loadObject);
this.load()};i._load=function(){if(this.promise){g.add(this.loadObject,this.priority)
}else{this.promise=new Promise(function(l,k){this.loadObject.once(a.loaded,l);this.loadObject.once(a.errored,k);
g.add(this.loadObject,this.priority)}.bind(this))}return this.promise};b.exports=c
},{"../../../eventNames":1025,"../../LoadingQueue":1014,"../Loader":1017,"ac-object":1003}],1019:[function(d,b,h){var o=d("ac-base").Environment;
var g=d("ac-object");var n=d("ac-asset-loader").AssetLoader;var l=d("ac-deferred").Deferred;
var j=d("ac-deferred").all;var m=d("ac-dom-emitter").DOMEmitter;var a=d("../../eventNames");
var k=d("../MediaObject");var q=d("ac-asset-loader").Asset.Video;var i;var f={loop:false};
var c={filename:"h264",fileFormat:"mp4",splitFileLoading:false};var p=function(r,t,s){t=g.defaults(c,t||{});
s=g.defaults(f,s||{});k.call(this,r,t,s)};i=p.prototype=g.create(k.prototype);i._generate=function(){if(this._media!==null){return
}var s=document.createElement("video");var r={element:s,forceElementLoading:this.options.forceElementLoading,split:this.mediaSrc.splitFileLoading};
var t=this._mediaExistsSrc;var v=new q(t,r);var u=new n(v);if(this.options.loop===true){s.setAttribute("loop","true")
}this._media=s;this._mediaElement=s;this._mediaEmitter=new m(s);this._loadObject=u;
k.prototype._generate.call(this)};i._triggerEndedWhilePlayingInReverse=function(){if(this._media.currentTime===0){this._media.pause();
this.trigger(a.ended,this);this._mediaEmitter.off("timeupdate",this._triggerEndedWhilePlayingInReverse)
}};i._hidePosterOnTimeupdate=function(){if(this._media.currentTime>0){this.view.hideCoverElement(this.view.posterframe);
this._mediaEmitter.off("timeupdate",this._hidePosterOnTimeupdate)}};i._load=function(){var s;
var t=new l();var r=new l();if(typeof this._boundOnReady!=="function"){this._boundOnReady=this._onReady.bind(this)
}this._mediaEmitter.once("loadedmetadata",function(){if(s){window.clearInterval(s)
}t.resolve()},this);this.once(a.loaded,function(){r.resolve();if(o.Browser.name==="Safari"&&!!this._media.src.match(/^blob/)&&t.promise().status()==="pending"){s=window.setInterval(function(){if(!this._media||!this._media.duration){return true
}return isNaN(this._media.duration)}.bind(this),20);window.setTimeout(function(){window.clearInterval(s)
},7000)}},this);return j([t.promise(),r.promise()]).then(this._boundOnReady)};i._play=function(r){this._mediaEmitter.on("timeupdate",this._hidePosterOnTimeupdate,this);
k.prototype._play.apply(this,arguments);if(this.getPlaybackRate()<0){this._mediaEmitter.on("timeupdate",this._triggerEndedWhilePlayingInReverse,this)
}};i._stop=function(){this._mediaEmitter.off("timeupdate",this._hidePosterOnTimeupdate);
this._mediaEmitter.off("timeupdate",this._triggerEndedWhilePlayingInReverse);k.prototype._stop.call(this)
};i._onReady=function(){k.prototype._onReady.call(this);this._boundOnReady=null
};b.exports=p},{"../../eventNames":1025,"../MediaObject":1015,"ac-asset-loader":37,"ac-base":false,"ac-dom-emitter":967,"ac-object":1003}],1020:[function(f,d,g){var i=f("ac-base").Element;
var c=f("../../eventNames");var m=f("ac-asset-loader").AssetLoader;var j=f("ac-deferred").Deferred;
var l=f("ac-deferred").all;var k=/\w+\.(?:jpg|png)$/;var a={posterframe:"mediaObject-posterframe",endstate:"mediaObject-endstate"};
function b(n){this.container=n.container;this.mediaObject=n;this.enhanced=false;
this.posterframe=null;this.endstate=null;this.mediaObject.on(c.play,this._onPlay,this);
this.mediaObject.on(c.pause,this._onPause,this);this.mediaObject.on(c.ended,this._onEnded,this)
}var h=b.prototype;h.enhance=function(){var r=new j();var q;var s;var p=function(t){this.posterframe=t||null
}.bind(this);var o=function(t){this.endstate=t||null}.bind(this);var n=function(){if(this.mediaObject&&this.mediaObject._mediaElement){i.addClassName(this.container,"mediaObject-enhanced");
i.addClassName(this.mediaObject._mediaElement,"mediaObject-element");this.enhanced=true;
window.requestAnimationFrame(function(){if(this.mediaObject&&this.mediaObject._mediaElement){this.hideCoverElement(this.endstate);
this._inject();i.setStyle(this.mediaObject._mediaElement,{visibility:"hidden"});
window.requestAnimationFrame(function(){if(this.mediaObject&&this.mediaObject._mediaElement){i.getBoundingBox(this.mediaObject._mediaElement);
i.setStyle(this.mediaObject._mediaElement,{visibility:"visible"});r.resolve()}}.bind(this))
}}.bind(this))}}.bind(this);if(!this.enhanced){s=this._createCoverElement(this.mediaObject.mediaSrc.posterframeSrc,a.posterframe);
q=this._createCoverElement(this.mediaObject.mediaSrc.endstateSrc,a.endstate);s.then(p);
q.then(o);l([s,q]).then(n)}else{r.reject()}return r};h.degrade=function(){this.showCoverElement(this.endstate,false);
window.requestAnimationFrame(function(){this._remove();this.posterframe=null;this.endstate=null;
this.enhanced=false;i.addClassName(this.container,"mediaObject-degraded");this.mediaObject.destroy()
}.bind(this))};h._createCoverElement=function(q,n){var o;var p;if(k.test(q)){p=this._loadImage(q,n)
}else{o=i.select(q,this.container);p=new j().resolve(o)}return p};h._loadImage=function(q,o){var n=new m([q]);
function p(s){var r=s[0];r.width=r.width;r.height=r.height;r.alt="";r.className=o;
return r}return n.load().then(p)};h._inject=function(){i.insert(this.mediaObject._mediaElement,this.container);
[this.posterframe,this.endstate].forEach(function(n){if(n&&!this.container.contains(n)){i.insert(n,this.container)
}},this)};h._remove=function(){var n=[this.mediaObject._mediaElement];if(!k.test(this.mediaObject.posterframeSrc)){n.push(this.posterframe)
}n.forEach(function(o){if(i.isElement(o)&&this.container.contains(o)){this.container.removeChild(o)
}},this)};h.hideCoverElements=function(){this.hideCoverElement(this.posterframe);
this.hideCoverElement(this.endstate)};h.hideCoverElement=function(o,n){if(o){if(n){this._addOpacityTransition(o)
}else{this._removeTransition(o)}window.requestAnimationFrame(function(){i.setStyle(o,{opacity:0,zIndex:1})
}.bind(this))}};h.showCoverElement=function(p,o){var n=function(){this._removeTransition.bind(this,p);
i.removeVendorPrefixEventListener(p,"transitionEnd",n)}.bind(this);if(p){if(o){this._addOpacityTransition(p);
i.addVendorPrefixEventListener(p,"transitionEnd",n)}else{this._removeTransition(p)
}window.requestAnimationFrame(function(){i.setStyle(p,{opacity:1,zIndex:1001})}.bind(this))
}};h._removeTransition=function(n){i.setVendorPrefixStyle(n,"transition","none")
};h._addOpacityTransition=function(n){i.setVendorPrefixStyle(n,"transition","opacity "+this.mediaObject.options.transitionDuration+"s ease-out")
};h._onPlay=function(){i.removeClassName(this.container,"mediaObject-ended");i.addClassName(this.container,"mediaObject-playing");
this.hideCoverElements()};h._onPause=function(){i.removeClassName(this.container,"mediaObject-playing")
};h._onEnded=function(){i.removeClassName(this.container,"mediaObject-playing");
i.addClassName(this.container,"mediaObject-ended");if(this.endstateElement){this.showCoverElement(this.endstate,false)
}};d.exports=b},{"../../eventNames":1025,"ac-asset-loader":37,"ac-base":false}],1021:[function(c,b,g){var i=c("./KeyframeOnPause/ImageOverlayController");
var h,d=c("ac-object"),a=c("ac-clock");var f={overlayLoadDelay:250,overlayClassName:"image-overlay",overlayDirPath:"./overlay",overlayPrefix:"image_",overlayPattern:"####",overlayFileType:"png",clock:a};
var j=function(){};h=j.prototype;h.decorate=function(m,k){var l=d.defaults(f,k);
m.keyframeOnPauseController=new i(m,l);m.container.appendChild(m.keyframeOnPauseController.el);
return m};b.exports=new j()},{"./KeyframeOnPause/ImageOverlayController":1022,"ac-clock":72,"ac-object":1003}],1022:[function(b,c,a){var g,f=b("ac-event-emitter").EventEmitter,h=b("ac-dom-emitter").DOMEmitter;
var d=function(j,i){this.mediaObject=j;this.options=i;this.active=false;this.el=this._createOverlay();
this._overlaySetTime=null;this._setEventTarget();this._bindEvents()};g=d.prototype;
g.applyOverlay=function(k){k=k||this.mediaObject.currentFrame();var i=this._getImagePath(k),j=this._getContainerDimensions(this.mediaObject.container);
this.el.style.backgroundImage="url("+i+")";this.el.style.backgroundSize=j.width+"px "+j.height+"px";
this.active=true;this.mediaObject.trigger("overlay-applied")};g.removeOverlay=function(){this.el.style.backgroundImage="inherit";
this.active=false;this.mediaObject.trigger("overlay-removed")};g._createOverlay=function(){var i=document.createElement("div");
i.className=this.options.overlayClassName;return i};g._onMetadataLoaded=function(){var j=this.mediaObject.width,i=this.mediaObject.height;
this.el.style.width=j;this.el.style.height=i};g._getContainerDimensions=function(j){j=j||this.mediaObject.container;
var i={width:j.offsetWidth,height:j.offsetHeight},k;if(!i.width||!i.height){k=j.getBoundingClientRect();
i.width=k.width;i.height=k.height}return i};g._getImagePath=function(m){var p=this.options.overlayDirPath,j=this.options.overlayFileType,l=this.options.overlayPrefix,k=this.options.overlayPattern,o=k.length,n=m+"",i=n.length;
while(i<o){n="0"+n;i++}return p+"/"+l+n+"."+j};g._bindEvents=function(){this._eventsTarget.on("timeupdate pause",this._onMediaObjectScrub,this);
this._eventsTarget.on("play",this._onMediaObjectPlay,this);this.options.clock.on("draw",this._clockApplyImageOverlay,this)
};g._setEventTarget=function(){this._eventsTarget=this.mediaObject._mediaEmitter
};g._onMediaObjectPlay=function(){this.removeOverlay()};g._onMediaObjectScrub=function(){this._debounceImageOverlay()
};g._debounceImageOverlay=function(){this._overlaySetTime=Date.now()+this.options.overlayLoadDelay
};g._clockApplyImageOverlay=function(){if(!this.mediaObject._media.paused||!this._overlaySetTime||this._overlaySetTime>Date.now()){return
}this._overlaySetTime=null;this.applyOverlay()};c.exports=d},{"ac-dom-emitter":967,"ac-event-emitter":false}],1023:[function(c,d,a){var f=(function(){var g="http://images.apple.com/global/elements/blank.gif";
return g.replace(/global\/.*/,"")}());d.exports=function b(g){if(!!g.match(/(^http(s?))/)){return g
}if(g.match(/^\/(?!\/)/)){g=f+g.replace(/^\//,"");g=g.replace(/(^.+)(\/105\/)/,"$1/")
}return g}},{}],1024:[function(c,f,b){var h=c("./MediaObject/Flow");var a=c("./MediaObject/Video");
var g=c("./MediaObject/decorators/KeyframeOnPause");f.exports=function d(i,l,k){k=k||{};
var j=null;if(k.type==="h264"){j=new a(i,l,k)}if(k.type==="flow"){j=new h(i,l,k)
}if(k.keyframeOverlay){j=g.decorate(j,k.keyframeOverlay)}return j}},{"./MediaObject/Flow":1016,"./MediaObject/Video":1019,"./MediaObject/decorators/KeyframeOnPause":1021}],1025:[function(b,c,a){c.exports={degrade:"degrade",destroy:"destroy",ended:"ended",enhance:"enhance",errored:"error",loaded:"loaded",loadstart:"loadstart",pause:"pause",play:"play",progress:"progress",ready:"ready",stop:"stop"}
},{}],1026:[function(b,d,a){var f=b("./propertiesAreNull");d.exports=function c(g,h){if(typeof g.off==="function"){g.off()
}window.setTimeout(function(){var i;for(i in g){if(g.hasOwnProperty(i)){if(h&&g[i]&&typeof g[i].destroy==="function"&&!f(g[i])){g[i].destroy()
}g[i]=null}}})}},{"./propertiesAreNull":1027}],1027:[function(b,c,a){c.exports=function d(g){var f=true;
for(var h in g){if(g.hasOwnProperty(h)){if(g[h]!==null){f=false;break}}}return f
}},{}],1028:[function(b,c,a){arguments[4][850][0].apply(a,arguments)},{"./extend":1031,"ac-polyfills/Array/isArray":1037}],1029:[function(b,c,a){c.exports=b(29)
},{}],1030:[function(b,c,a){arguments[4][30][0].apply(a,arguments)},{"./extend":1031}],1031:[function(b,c,a){c.exports=b(853)
},{"ac-polyfills/Array/prototype.forEach":1038}],1032:[function(b,c,a){c.exports=b(32)
},{}],1033:[function(b,c,a){arguments[4][855][0].apply(a,arguments)},{"./clone":1028,"./create":1029,"./defaults":1030,"./extend":1031,"./getPrototypeOf":1032,"./isDate":1034,"./isEmpty":1035,"./isRegExp":1036,"./toQueryParameters":1040}],1034:[function(b,c,a){c.exports=b(33)
},{}],1035:[function(b,c,a){c.exports=b(34)},{}],1036:[function(b,c,a){c.exports=b(35)
},{}],1037:[function(b,c,a){c.exports=b(859)},{}],1038:[function(b,c,a){c.exports=b(191)
},{}],1039:[function(b,c,a){c.exports=b(26)},{}],1040:[function(b,c,a){c.exports=b(36)
},{qs:1039}],1041:[function(b,c,a){c.exports={ElementScrollTracker:b("./ac-scroll-tracker/ElementScrollTracker"),PooledScrollTracker:b("./ac-scroll-tracker/PooledScrollTracker"),ScrollTracker:b("./ac-scroll-tracker/ScrollTracker"),SmoothScrollTracker:b("./ac-scroll-tracker/SmoothScrollTracker")}
},{"./ac-scroll-tracker/ElementScrollTracker":1042,"./ac-scroll-tracker/PooledScrollTracker":1043,"./ac-scroll-tracker/ScrollTracker":1044,"./ac-scroll-tracker/SmoothScrollTracker":1045}],1042:[function(f,d,g){var a=f("./ScrollTracker");
var i=f("./SmoothScrollTracker");var l=f("ac-event-emitter").EventEmitter;var j=f("ac-window-delegate").WindowDelegate;
var b=f("ac-object");var c=f("ac-dom-metrics");function k(n,m){l.call(this);this.el=n;
this._options=b.defaults(this.defaults,m||{});if(this._options.tracker){this.tracker=this._options.tracker
}else{if(this._options.smooth){this.tracker=new i()}else{this.tracker=new a()}}this.updateRange();
this.tracker.on("update",this._onUpdate,this);this.tracker.on("draw",this._onDraw,this);
j.on("resize orientationchange",this.updateRange,this)}var h=k.prototype=Object.create(l.prototype);
h.defaults={startThreshold:0,endThreshold:0,startOffset:0,endOffset:0,smooth:false};
h.updateRange=function(p){var n=c.getPagePosition(this.el);var m;var r;var q;var s;
var o;this._options=b.extend(this._options,p||{});this._startThreshold=this._options.startThreshold;
this._endThreshold=this._options.endThreshold;this._startOffset=this._options.startOffset;
this._endOffset=this._options.endOffset;if(this.tracker.getDirection()==="X"){m=j.clientWidth();
r=n.left;q=n.right}else{m=j.clientHeight();r=n.top;q=n.bottom}s=r-this._startThreshold*m+this._startOffset;
o=q-this._endThreshold*m+this._endOffset;if(o>s){this.tracker.setRange(s,o)}else{this.tracker.setRange(o,s)
}};h.getRangeStart=function(){return this.tracker.getRangeStart()};h.getRangeEnd=function(){return this.tracker.getRangeEnd()
};h.getDirection=function(){this.tracker.getDirection()};h.setDirection=function(m){this.tracker.setDirection(m)
};h.getProgress=function(){return this.tracker.getProgress()};h.getPosition=function(){return this.tracker.getPosition()
};h._onUpdate=function(m){this.trigger("update",m)};h._onDraw=function(m){this.trigger("draw",m)
};d.exports=k},{"./ScrollTracker":1044,"./SmoothScrollTracker":1045,"ac-dom-metrics":136,"ac-event-emitter":false,"ac-object":1033,"ac-window-delegate":1070}],1043:[function(c,d,a){var h=c("./ScrollTracker");
var b=c("ac-object");function f(i){h.call(this,i);this._poolSize=this._options.poolSize;
this._pool=[];this._targetPosition=null}var g=f.prototype=Object.create(h.prototype);
g.defaults.poolSize=20;g._updateScrollData=function(i){i=h.prototype._updateScrollData.call(this,i);
i.target={position:this._position,lastPosition:(this._targetPosition===null)?this._position:this._targetPosition,positionDelta:this._position-this._targetPosition};
this._targetPosition=this._position;this._pushPoolData(i);this._eventData=b.clone(i);
this._position=this._eventData.position=Math.round(this._eventData.position);return this._eventData
};g._pushPoolData=function(i){this._pool.push(i);if(this._poolSize&&this._pool.length>this._poolSize){this._pool.shift()
}};d.exports=f},{"./ScrollTracker":1044,"ac-object":1033}],1044:[function(f,c,g){var k=f("ac-event-emitter").EventEmitter;
var i=f("ac-dom-emitter").DOMEmitter;var j=f("ac-window-delegate").WindowDelegate;
var d=f("ac-clock");var b=f("ac-object");window.windowDelegate=j;function a(l){k.call(this);
this._options=b.defaults(this.defaults,l||{});this._clock=this._options.clock;this._target=this._options.target;
this.setRange(this._options.start,this._options.end);this.setDirection(this._options.direction);
if(this._target.nodeType){this._emitter=new i(this._target)}else{this._emitter=this._target
}this._scrollChanged=true;this._position=null;this._progress=0;this._emitter.on("scroll update",this._onScroll,this);
this._clock.on("update",this._onUpdate,this);this._clock.on("draw",this._onDraw,this);
this._clock.start()}var h=a.prototype=Object.create(k.prototype);h.defaults={start:0,end:0,direction:"Y",clock:d,target:j};
h.getRangeStart=function(){return this._rangeStart};h.setRangeStart=function(l){this._rangeStart=l;
this._updateProgress()};h.getRangeEnd=function(){return this._rangeEnd};h.setRangeEnd=function(l){this._rangeEnd=l;
this._updateProgress()};h.setRange=function(m,l){this._rangeStart=m;this._rangeEnd=l;
this._updateProgress()};h.getDirection=function(){return this._direction};h.setDirection=function(l){this._direction=l.toUpperCase();
this._direction=(this._direction==="X"?"X":"Y");this._scrollChanged=true};h.getPosition=function(){return this._position
};h.getProgress=function(){return this._progress};h._updateProgress=function(){if(this._rangeStart===this._rangeEnd){this._progress=0
}else{this._progress=(this._position-this._rangeStart)/(this._rangeEnd-this._rangeStart)
}};h._boundByRange=function(l){if(!this._rangeStart&&!this._rangeEnd){return l}return Math.min(Math.max(l,this._rangeStart),this._rangeEnd)
};h._targetScrollPosition=function(){var l;if(this._target.getPosition){l=this._target.getPosition()
}else{if(this._direction==="X"){l=this._target.scrollX||this._target.scrollTop}else{l=this._target.scrollY||this._target.scrollTop
}if(typeof l==="function"){l=l()}}return l};h._updateScrollData=function(m){var n=this._lastTime||0;
var l;m=b.clone(m);m.delta=m.time-n;m.position=this._boundByRange(this._targetScrollPosition());
l=(this._position===null?m.position:this._position);m.positionDelta=m.position-l;
m.lastPosition=l;this._position=m.position;this._lastTime=m.time;return this._eventData=m
};h._onScroll=function(l){this._scrollChanged=true};h._onUpdate=function(m){var l=(this._position===null);
if(!this._scrollChanged){return}this._updateScrollData(m);if(!l&&!this._eventData.positionDelta){this._scrollChanged=false;
return}this._updateProgress();this._eventData.progress=this._progress;this.trigger("update",this._eventData)
};h._onDraw=function(l){if(!this._scrollChanged){return}this._scrollChanged=false;
this.trigger("draw",this._eventData);this._eventData=null};c.exports=a},{"ac-clock":72,"ac-dom-emitter":106,"ac-event-emitter":false,"ac-object":1033,"ac-window-delegate":1070}],1045:[function(b,c,a){var d=b("./PooledScrollTracker");
var g=100;function h(i){d.call(this,i);this._sampleTime=this._options.sampleTime
}var f=h.prototype=Object.create(d.prototype);f.defaults.sampleTime=g;f.smoothing=false;
f._updateScrollData=function(i){i=d.prototype._updateScrollData.call(this,i);this.smoothing=(i.position!==i.target.position);
return this._position};f._pushPoolData=function(m){var n=this._sampleTime;var l=0;
var p=0;var o=0;var k;var j;d.prototype._pushPoolData.call(this,m);if(!m.positionDelta){return
}o=m.delta;for(j=this._pool.length-2;j>=0;j--){k=this._pool[j];if(o>n){o=n}l+=k.position*o;
n-=o;o=k.delta;if(n===0){break}}if(n>0){l+=k.position*n;n=0}l+=m.position*(this._sampleTime/3);
l/=(this._sampleTime*4/3);if(Math.abs(Math.round(l)-Math.round(m.lastPosition))<2){if(m.position>m.lastPosition){l=Math.min(m.position,l+1)
}else{l=Math.max(m.position,l-1)}}m.position=l;m.positionDelta=m.position-m.lastPosition;
this._position=m.position};f._onUpdate=function(i){if(this.smoothing){this._scrollChanged=true
}d.prototype._onUpdate.call(this,i)};c.exports=h},{"./PooledScrollTracker":1043}],1046:[function(b,c,a){c.exports=b(249)
},{}],1047:[function(b,c,a){arguments[4][87][0].apply(a,arguments)},{"./ac-dom-traversal/ancestor":1048,"./ac-dom-traversal/ancestors":1049,"./ac-dom-traversal/children":1050,"./ac-dom-traversal/filterBySelector":1051,"./ac-dom-traversal/firstChild":1052,"./ac-dom-traversal/lastChild":1055,"./ac-dom-traversal/matchesSelector":1056,"./ac-dom-traversal/nextSibling":1057,"./ac-dom-traversal/nextSiblings":1058,"./ac-dom-traversal/previousSibling":1059,"./ac-dom-traversal/previousSiblings":1060,"./ac-dom-traversal/querySelector":1061,"./ac-dom-traversal/querySelectorAll":1062,"./ac-dom-traversal/shims/ie":1063,"./ac-dom-traversal/siblings":1064}],1048:[function(d,g,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");g.exports=function f(k,j,i){h.childNode(k,true,"ancestors");
h.selector(j,false,"ancestors");if(i&&a.isElement(k)&&(!j||b(k,j))){return k}if(k!==document.body){while((k=k.parentNode)&&a.isElement(k)){if(!j||b(k,j)){return k
}if(k===document.body){break}}}return null}},{"./helpers/validate":1054,"./matchesSelector":1056,"ac-dom-nodes":148}],1049:[function(d,f,c){var a=d("ac-dom-nodes");
var b=d("./matchesSelector");var h=d("./helpers/validate");f.exports=function g(l,j,i){var k=[];
h.childNode(l,true,"ancestors");h.selector(j,false,"ancestors");if(i&&a.isElement(l)&&(!j||b(l,j))){k.push(l)
}if(l!==document.body){while((l=l.parentNode)&&a.isElement(l)){if(!j||b(l,j)){k.push(l)
}if(l===document.body){break}}}return k}},{"./helpers/validate":1054,"./matchesSelector":1056,"ac-dom-nodes":148}],1050:[function(b,c,a){arguments[4][90][0].apply(a,arguments)
},{"./filterBySelector":1051,"./helpers/validate":1054,"ac-dom-nodes":148}],1051:[function(b,c,a){arguments[4][91][0].apply(a,arguments)
},{"./helpers/validate":1054,"./matchesSelector":1056}],1052:[function(b,c,a){arguments[4][92][0].apply(a,arguments)
},{"./children":1050,"./helpers/validate":1054}],1053:[function(b,c,a){c.exports=b(93)
},{}],1054:[function(b,c,a){c.exports=b(94)},{"ac-dom-nodes":148}],1055:[function(b,c,a){arguments[4][95][0].apply(a,arguments)
},{"./children":1050,"./helpers/validate":1054}],1056:[function(f,g,d){var b=f("ac-dom-nodes");
var a=f("./helpers/nativeMatches");var i=f("./helpers/validate");var h=f("./vendor/sizzle/sizzle");
g.exports=function c(k,j){i.selector(j,true,"matchesSelector");if(!b.isElement(k)){return false
}if(!a){return h.matchesSelector(k,j)}return a.call(k,j)}},{"./helpers/nativeMatches":1053,"./helpers/validate":1054,"./vendor/sizzle/sizzle":1065,"ac-dom-nodes":148}],1057:[function(b,c,a){arguments[4][97][0].apply(a,arguments)
},{"./helpers/validate":1054,"./matchesSelector":1056,"ac-dom-nodes":148}],1058:[function(b,c,a){arguments[4][98][0].apply(a,arguments)
},{"./helpers/validate":1054,"./matchesSelector":1056,"ac-dom-nodes":148}],1059:[function(b,c,a){arguments[4][99][0].apply(a,arguments)
},{"./helpers/validate":1054,"./matchesSelector":1056,"ac-dom-nodes":148}],1060:[function(b,c,a){arguments[4][100][0].apply(a,arguments)
},{"./helpers/validate":1054,"./matchesSelector":1056,"ac-dom-nodes":148}],1061:[function(b,c,a){c.exports=b(101)
},{"./helpers/validate":1054}],1062:[function(b,c,a){c.exports=b(102)},{"./helpers/validate":1054}],1063:[function(c,d,b){var f=c("../vendor/sizzle/sizzle");
var a=c("ac-dom-nodes");var g=c("../helpers/validate");d.exports=function(i,h){if(h||!("querySelectorAll" in document)){i.querySelectorAll=function(j,l){var k;
var m;l=l||document;g.parentNode(l,true,"querySelectorAll","context");g.selector(j,true,"querySelectorAll");
if(a.isDocumentFragment(l)){k=i.children(l);m=[];k.forEach(function(o){var n;if(f.matchesSelector(o,j)){m.push(o)
}n=f(j,o);if(n.length){m=m.concat(n)}});return m}return f(j,l)};i.querySelector=function(k,l){var j;
l=l||document;g.parentNode(l,true,"querySelector","context");g.selector(k,true,"querySelector");
j=i.querySelectorAll(k,l);return j.length?j[0]:null}}}},{"../helpers/validate":1054,"../vendor/sizzle/sizzle":1065,"ac-dom-nodes":148}],1064:[function(b,c,a){arguments[4][104][0].apply(a,arguments)
},{"./children":1050,"./helpers/validate":1054}],1065:[function(b,c,a){c.exports=b(105)
},{}],1066:[function(b,c,a){c.exports.Slider=b("./ac-slider/Slider")},{"./ac-slider/Slider":1067}],1067:[function(f,d,h){var a=f("ac-dom-traversal");
var k=f("ac-dom-events");var j=f("ac-event-emitter");var b=f("ac-dom-metrics");
var c={min:0,max:1,step:1,value:0,orientation:"horizontal",template:'<div class="ac-slider-runnable-track">\n\t<div class="ac-slider-thumb"></div>\n</div>'};
var l=Object.keys(c);var g=function(n,m){this.options=Object.assign({},c,m);this.model=Object.create(this.options);
this.el=n;n.className+=" ac-slider-container";n.innerHTML=this.model.template;this.initialize()
};g.prototype=Object.create(j.EventEmitter.prototype);var i=g.prototype;i.addEventListeners=function(){this.addEventListener(this.el,"mousedown",this.onMouseDown);
this.addEventListener(this.el,"touchstart",this.onTouchStart);this.addEventListener(this.el,"mouseover",this.onMouseOver);
this.addEventListener(this.el,"mouseleave",this.onMouseLeave);this.addEventListener(this.el,"touchend",this.onTouchEnd);
this.addEventListener(document,"touchend",this.onMouseUp)};i.addEventListener=k.addEventListener;
i.bindMethods=function(){this.onMouseDown=this.bindMethod(this.onMouseDown,this);
this.onTouchStart=this.bindMethod(this.onTouchStart,this);this.onMouseOver=this.bindMethod(this.onMouseOver,this);
this.onMouseLeave=this.bindMethod(this.onMouseLeave,this);this.onTouchEnd=this.bindMethod(this.onTouchEnd,this);
this.onMouseUp=this.bindMethod(this.onMouseUp,this);this.onMouseMove=this.bindMethod(this.onMouseMove,this);
this.onTouchMove=this.bindMethod(this.onTouchMove,this)};i.bindMethod=function(n,m){return n.bind(m)
};i.correctValueMinMax=function(o,n,m){if(o>m){o=m}if(o<n){o=n}return o};i.calculateStepsToValue=function(n,m){return Math.abs(n-m)
};i.calculateMaxSteps=function(n,m){return Math.abs(m-n)};i.calculateStepsEqualToPercentage=function(n,m){return(n/100)*m
};i.calculateNextStepInRange=function(s,n,m,r){var p=this.calculateMaxSteps(n,m);
var q=this.calculateStepsToValue(s,n);var o=n+(Math.floor(p/r)*r);s=Math.min(o,n+Math.round(q/r)*r);
return s};i.dispatchEvent=k.dispatchEvent;i.disableUserControls=function(){this.removeEventListeners()
};i.enableUserControls=function(){this.addEventListeners()};i.getNextValue=function(p,n,m,o){p=this.correctValueMinMax(p,n,m);
if(o!=="auto"){p=this.calculateNextStepInRange(p,n,m,o)}return p};i.getOrientation=function(){return this.model.orientation
};i.getValue=function(){return this.model.value};i.getMin=function(){return this.model.min
};i.getMax=function(){return this.model.max};i.getStep=function(){return this.model.step
};i.getClientXValue=function(u){var n=this.getClientXFromEvent(u);var v=b.getDimensions(this.thumbElement,true);
var o=b.getViewportPosition(this.thumbElement);var w=b.getDimensions(this.runnableTrackElement,true);
var m=b.getViewportPosition(this.runnableTrackElement);var q=n-this.runnableTrackElement.getBoundingClientRect().left-(v.width/2);
var t=w.width-v.width;var p=q/(t)*100;var r=this.calculateMaxSteps(this.getMin(),this.getMax());
var s=this.calculateStepsEqualToPercentage(p,r);return this.getMin()+s};i.getClientYValue=function(t){var m=this.getClientYFromEvent(t);
var v=b.getDimensions(this.thumbElement,true);var o=b.getViewportPosition(this.thumbElement);
var w=b.getDimensions(this.runnableTrackElement,true);var n=b.getViewportPosition(this.runnableTrackElement);
var s=w.height-v.height;var u=s-(m-this.runnableTrackElement.getBoundingClientRect().top-(v.height/2));
var p=u/(w.height-v.height)*100;var q=this.calculateMaxSteps(this.model.min,this.model.max);
var r=this.calculateStepsEqualToPercentage(p,q);return this.model.min+r};i.getClientValue=function(n){n=n.originalEvent||n;
var m;if(this.model.orientation==="horizontal"){m=this.getClientXValue(n)}else{m=this.getClientYValue(n)
}return m};i.getClientXFromEvent=function(m){return m.touches?m.touches[0].clientX:m.clientX
};i.getClientYFromEvent=function(m){return m.touches?m.touches[0].clientY:m.clientY
};i.initialize=function(){this.setNodeReferences();this.setValue(this.model.value);
this.bindMethods();this.addEventListeners()};i.onMouseLeave=function(){this.preventDocumentMouseUpDispatch=false
};i.onMouseDown=function(n){var m=this.getClientValue(n);this.addEventListener(document,"mouseup",this.onMouseUp);
this.addEventListener(document,"mousemove",this.onMouseMove);this.trigger("grab",this.getValue());
this.setValue(m)};i.onMouseUp=function(){this.removeEventListener(document,"mouseup",this.onMouseUp);
this.removeEventListener(document,"mousemove",this.onMouseMove);this.trigger("release",this.getValue());
if(!this.preventDocumentMouseUpDispatch){this.dispatchEvent(this.el,"mouseup")}};
i.onMouseOver=function(){this.preventDocumentMouseUpDispatch=true};i.onTouchEnd=function(){this.removeEventListener(document,"touchend",this.onTouchEnd);
this.removeEventListener(document,"touchmove",this.onTouchMove);this.trigger("release",this.getValue());
if(!this.preventDocumentMouseUpDispatch){this.dispatchEvent(this.el,"touchend")
}};i.onTouchStart=function(n){var m=this.getClientValue(n);this.addEventListener(document,"touchend",this.onMouseUp);
this.addEventListener(document,"touchmove",this.onTouchMove);this.trigger("grab",this.getValue());
this.setValue(m)};i.onMouseMove=function(n){var m=this.getClientValue(n);this.setValue(m)
};i.onTouchMove=function(n){if(n.preventDefault){n.preventDefault()}var m=this.getClientValue(n);
this.setValue(m)};i.getElementOrientationOffsetValue=function(n,m){if(m==="horizontal"){return b.getDimensions(n).width
}return b.getDimensions(n).height};i.getAvailableRunnableTrack=function(o,m){var n=this.getElementOrientationOffsetValue(this.thumbElement,m);
return o-n};i.getPercentageByValue=function(n,m){n=this.calculateStepsToValue(n,this.getMin());
m=this.calculateMaxSteps(this.getMin(),this.getMax());return(n/m)*100};i.getPercentageOfRunnableTrack=function(q){var n=this.getOrientation();
var r=this.getElementOrientationOffsetValue(this.runnableTrackElement,n);var m=this.getAvailableRunnableTrack(r,n);
var p=this.getPercentageByValue(q,this.getMax());var o=(p/100)*m;return(o/r)*100
};i.onChange=function(n){var m=this.getPercentageOfRunnableTrack(n);if(this.getOrientation()==="horizontal"){if(!isNaN(m)){this.thumbElement.style.left=m+"%"
}}else{if(!isNaN(m)){this.thumbElement.style.bottom=m+"%"}}this.trigger("change",this.getValue())
};i.removeEventListeners=function(){this.removeEventListener(this.el,"mousedown",this.onMouseDown);
this.removeEventListener(this.el,"touchstart",this.onTouchStart);this.removeEventListener(this.el,"mouseover",this.onMouseOver);
this.removeEventListener(this.el,"mouseleave",this.onMouseLeave);this.removeEventListener(this.el,"touchend",this.onTouchEnd);
this.removeEventListener(document,"touchend",this.onMouseUp)};i.removeEventListener=k.removeEventListener;
i.setNodeReferences=function(){this.runnableTrackElement=a.querySelector(".ac-slider-runnable-track",this.el);
this.thumbElement=a.querySelector(".ac-slider-thumb",this.el)};i.setOrientation=function(m){this.set("orientation",m)
};i.setValue=function(m){m=this.getNextValue(m,this.getMin(),this.getMax(),this.getStep());
this.set("value",m);this.onChange(m)};i.setMin=function(m){this.set("min",m)};i.setMax=function(m){this.set("max",m)
};i.setStep=function(m){this.set("step",m)};i.set=function(m,o){if(l.indexOf(m)>-1&&this.model[m]!==o){var n=this.model[m];
this.model[m]=o;this.trigger("change:model:"+m,{previous:n,current:o})}};d.exports=g
},{"ac-dom-events":1046,"ac-dom-metrics":136,"ac-dom-traversal":1047,"ac-event-emitter":false}],1068:[function(b,c,a){c.exports=b(271)
},{"./ac-shared-instance/SharedInstance":1069}],1069:[function(b,c,a){c.exports=b(272)
},{}],1070:[function(b,c,a){arguments[4][273][0].apply(a,arguments)},{"./ac-window-delegate/WindowDelegate":1073,"./ac-window-delegate/WindowDelegateCustomEvent":1074,"./ac-window-delegate/WindowDelegateOptimizer":1075}],1071:[function(b,c,a){c.exports=b(274)
},{"ac-event-emitter":false}],1072:[function(b,c,a){c.exports=b(275)},{"ac-event-emitter":false}],1073:[function(d,b,g){var i;
var c=d("ac-shared-instance").SharedInstance,l=d("ac-dom-emitter").DOMEmitter,j=d("./OptimizerController"),f=d("./CustomEventController"),h=d("./queries/queries"),m=d("./optimizers/optimizers");
var k="ac-window-delegate:WindowDelegate",a="3.0.0-4";function n(){this._emitter=new l(window);
this._controllers={optimizer:new j(m),customEvent:new f()};var o;for(o in h){if(h.hasOwnProperty(o)){this[o]=this._getProperty.bind(this,o);
h[o]=h[o].bind(this)}}this._bindEvents()}i=n.prototype;i.on=function(o,r,p){var q=this._seperateCustomEvents(o);
this._optimizeEvents(q.standardEvents);this._customEventOn(q.customEvents,r,p);
this._emitterOn.apply(this,arguments);return this};i.once=function(o,r,p){var q=this._seperateCustomEvents(o);
this._optimizeEvents(q.standardEvents);this._customEventOnce(q.customEvents,r,p);
this._emitterOnce.apply(this,arguments);return this};i.off=function(p,u,q){var t=this._seperateCustomEvents(p),r=false;
if(!p){r=true}this._customEventOff(t.customEvents,u,q,r);this._emitterOff.apply(this,arguments);
if(r){try{var o;for(o in this._controllers.optimizer._events){if(this._controllers.optimizer._events.hasOwnProperty(o)&&this._shouldDeoptimizeEvent(o,true)){this._deoptimizeEvent(o)
}}this._bindEvents()}catch(s){}}return this};i.has=function(o,q,p){return this._emitter.has.apply(this._emitter,arguments)
};i.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};i.emitterTrigger=function(){this._emitter.emitterTrigger.apply(this._emitter,arguments);
return this};i.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};i.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};i.addOptimizer=function(o){this._controllers.optimizer.add(o);return this
};i.addCustomEvent=function(o){this._controllers.customEvent.add(o);return this
};i._emitterOn=function(){this._emitter.on.apply(this._emitter,arguments)};i._emitterOnce=function(){this._emitter.once.apply(this._emitter,arguments)
};i._emitterOff=function(){this._emitter.off.apply(this._emitter,arguments)};i._onEventUnbound=function(p){var o=p.data.evt;
if(this._shouldDeoptimizeEvent(o)){this._deoptimizeEvent(o)}};i._customEventOn=function(o,q,p){if(o.length===0){return
}this._controllers.customEvent.on(o.join(" "),q,p)};i._customEventOnce=function(o,q,p){if(o.length===0){return
}this._controllers.customEvent.once(o.join(" "),q,p)};i._customEventOff=function(o,r,p,q){if(!q&&o.length===0){return
}if(q&&o.length===0){this._controllers.customEvent.off();return}this._controllers.customEvent.off(o.join(" "),r,p)
};i._getProperty=function(q,o){var p=null;if(!o){p=this._getOptimizedValue(q)}if(p===null){p=h[q].call(this,o)
}return p};i._optimizeEvents=function(q){var p,r,o=q.length;for(r=0;r<o;r++){p=q[r];
if(this._shouldOptimizeEvent(p)){this._optimizeEvent(p)}}};i._shouldOptimizeEvent=function(o){if(this._controllers.optimizer.canOptimizeEvent(o)&&!this._controllers.optimizer.isOptimizingEvent(o)){return true
}return false};i._shouldDeoptimizeEvent=function(o,p){if(this._controllers.optimizer.isOptimizingEvent(o)&&(p||this._emitter._eventEmitter._events[o].length<=1)){return true
}return false};i._optimizeEvent=function(p){var o=this._controllers.optimizer.getOptimizerByEvent(p);
o.activate();this._emitterOn(p,o.callback,o)};i._deoptimizeEvent=function(p){var o=this._controllers.optimizer.getOptimizerByEvent(p);
o.deactivate();this._emitterOff(p,o.callback,o)};i._getOptimizedValue=function(o){return this._controllers.optimizer.get(o)
};i._seperateCustomEvents=function(s){var p={customEvents:[],standardEvents:[]};
if(typeof s==="string"){var t=s.split(" "),q,r,o=t.length;for(r=0;r<o;r++){q=t[r];
if(this._controllers.customEvent.canHandleCustomEvent(q)){p.customEvents.push(q)
}else{p.standardEvents.push(q)}}}return p};i._bindEvents=function(){this._emitter.on("dom-emitter:didoff",this._onEventUnbound,this)
};b.exports=c.share(k,a,n)},{"./CustomEventController":1071,"./OptimizerController":1072,"./optimizers/optimizers":1078,"./queries/queries":1087,"ac-dom-emitter":106,"ac-shared-instance":1068}],1074:[function(b,c,a){c.exports=b(277)
},{"ac-event-emitter":false}],1075:[function(b,c,a){c.exports=b(278)},{"ac-event-emitter":false}],1076:[function(b,c,a){arguments[4][279][0].apply(a,arguments)
},{"../../WindowDelegateOptimizer":1075,"../../queries/queries":1087}],1077:[function(b,c,a){arguments[4][280][0].apply(a,arguments)
},{"../../WindowDelegateOptimizer":1075,"../../queries/queries":1087}],1078:[function(b,c,a){arguments[4][281][0].apply(a,arguments)
},{"./events/resize":1076,"./events/scroll":1077}],1079:[function(b,c,a){c.exports=b(282)
},{}],1080:[function(b,c,a){c.exports=b(283)},{}],1081:[function(b,c,a){c.exports=b(284)
},{}],1082:[function(b,c,a){c.exports=b(285)},{}],1083:[function(b,c,a){c.exports=b(286)
},{}],1084:[function(b,c,a){c.exports=b(287)},{}],1085:[function(b,c,a){c.exports=b(288)
},{}],1086:[function(b,c,a){c.exports=b(289)},{}],1087:[function(b,c,a){c.exports=b(290)
},{"./methods/clientHeight":1079,"./methods/clientWidth":1080,"./methods/innerHeight":1081,"./methods/innerWidth":1082,"./methods/maxScrollX":1083,"./methods/maxScrollY":1084,"./methods/scrollX":1085,"./methods/scrollY":1086}],1088:[function(o,f,D){var j=o("ac-dom-traversal");
var v=o("ac-dom-styles");var z=o("ac-dom-metrics");var g=o("ac-classlist");var r=o("ac-feature");
var E=o("ac-window-delegate").WindowDelegate;var c=o("ac-scroll-tracker").SmoothScrollTracker;
var n=o("ac-dom-emitter").DOMEmitter;var q=o("../shared/ParallaxController");var m=o("./HeroIntro/getParallaxOptions");
var l=o("../shared/ClassTransition");var p=o("./HeroIntro/HeroIntroVideo");var s=o("./HeroIntro/HeroIntroTall");
var t=o("./HeroIntro/ScrollCTA");var B=3500;var d=10000;var b=500;var h="with-herointro-video";
var i="with-herointro-novideo";var k="with-herointro-staticfilmlist";var x=o("./HeroIntro/scrollDistance");
var y=o("ac-browser");var w=y.name.match(/ie/i)&&y.version<9;var a=y.name.match(/chrome/i);
var C=document.body;var A=function(){this.init()};var u=A.prototype;u.init=function(F){if(!r.cssPropertyAvailable("transition")){this._unblockImages();
return}this._container=j.querySelector(".herointro");this._startFrame=j.querySelector(".herointro-start");
this._offsetEl=j.querySelector(".herointro-lockup");this._copyEl=j.querySelector(".herointro-copy");
this._filmListEl=j.querySelector(".herointro-filmlist");this._filmListEnabled=true;
this._staticFilmListEnabled=false;this._scrollTracker=new c({end:x});this._video=new p(this._scrollTracker);
this._videoProgressThreshold=B/d;this._videoVisible=false;this._tall=typeof this._tall=="undefined"?false:this._tall;
g.add(C,"with-herointro");if(this._video.supported()){this._video.on("progress",this._onVideoProgress,this);
this._video.once("loaded",this._onVideoLoaded,this);this._video.load()}else{this._video=false
}if(F){this._didReveal()}else{this._prepareReveal();this._preloadImages()}this.reveal=this.reveal.bind(this);
E.on("resize",this._updateOffset,this);this.start()};u.toggle=function(F){var G=F?"init":"_onMaxDelay";
this[G](true)};u.start=function(){this._updateVideoState();if(this._video){this._revealTimeout=setTimeout(this._onMaxDelay.bind(this),B)
}else{this.reveal()}};u.reveal=function(){clearTimeout(this._revealTimeout);this._revealTimeout=null;
if(!this._video||this._video.progress>=0.5){g.add(C,"fadein-fast")}if(this._video){if(!this._tall){this._tall=new s(this._copyEl)
}this._cta.reveal()}this._updateOffset();this._reveal.enter()};u._preloadImages=function(){};
u._onVideoProgress=function(){if(this._video.progress>this._videoProgressThreshold){this._video.off("progress",this._onVideoProgress,this);
this.reveal()}};u._updateVideoState=function(F){if(this._video){g.add(C,h);g.remove(C,i);
this._finalRevealEl=this._startFrame}else{g.remove(C,h);g.add(C,i);this._unblockImages();
this._finalRevealEl=j.querySelector(".herointro-static")}this._updateOffset()};
u._onVideoLoaded=function(){this._unblockImages()};u._deleteVideoEl=function(){if(this._video){var G=this._video.el;
var F=j.querySelector(".mediaObject-element");if(F){G.removeChild(F)}}};u._onMaxDelay=function(){if(this._video){this._video.off("progress",this._onVideoProgress,this);
this._deleteVideoEl();this._video=false;this._updateVideoState();this.reveal()}if(!w){E.trigger("resize")
}};u._unblockImages=function(){g.remove(C,"blockimages")};u._prepareReveal=function(){this._revealEventCount=0;
this._reveal=new l(document.body,"fadein",{didTransitionEnd:this._isRevealComplete.bind(this)});
this._reveal.on("did-transition",this._didReveal,this);this._cta=new t(j.querySelector(".scrollcta"),x)
};u._isRevealComplete=function(F){if(F.target===this._finalRevealEl){this._revealEventCount++
}return(this._revealEventCount===2)};u._didReveal=function(){if(this._video.loaded){this._prepareParallax()
}else{}};u._prepareParallax=function(){var F=m(this._scrollTracker);this._parallaxController=new q(F);
this._scrollTracker.on("draw",this._onScrollDraw,this);this._onScrollDraw()};u._updateOffset=function(){var F=0;
var G;if(this._video){this._startFrameTop=z.getPagePosition(this._startFrame).top||this._startFrameTop||0;
G=E.clientHeight();if(this._tall&&this._tall.enabled){G-=z.getDimensions(this._copyEl).height
}F=Math.min(Math.max(G/2-this._startFrameTop,-100),200)}if(this._offset!==F){this._offset=F;
this._drawOffset()}};u._onScrollDraw=function(F){if(!this._video.el){return}var G=F?F.progress:this._scrollTracker.getProgress();
var H;if(!this._videoVisible&&G){v.setStyle(this._startFrame,{visibility:"hidden"});
v.setStyle(this._video.el,{opacity:1});this._videoVisible=true}if(G===1){this._cta.hide()
}else{this._cta.show()}if(G<100/x){this._enableFilmList()}else{this._disableFilmList()
}H=(G>=0.6);if(H!==this._staticFilmListEnabled){this._staticFilmListEnabled=H;g.toggle(C,k,H)
}this._drawOffset()};u._drawOffset=function(){var G;if(this._offset){G=this._offset*(1-this._scrollTracker.getProgress());
var F={translateY:G+"px"};if(!a){F.translateZ=0}v.setStyle(this._offsetEl,F)}else{v.setStyle(this._offsetEl,{transform:""})
}};u._enableFilmList=function(){if(!this._filmListEnabled){v.setStyle(this._filmListEl,{display:""});
this._filmListEnabled=true}};u._disableFilmList=function(){if(this._filmListEnabled){v.setStyle(this._filmListEl,{display:"none"});
this._filmListEnabled=false}};f.exports=A},{"../shared/ClassTransition":1096,"../shared/ParallaxController":1098,"./HeroIntro/HeroIntroTall":1089,"./HeroIntro/HeroIntroVideo":1090,"./HeroIntro/ScrollCTA":1091,"./HeroIntro/getParallaxOptions":1092,"./HeroIntro/scrollDistance":1093,"ac-browser":54,"ac-classlist":65,"ac-dom-emitter":106,"ac-dom-metrics":136,"ac-dom-styles":172,"ac-dom-traversal":183,"ac-feature":301,"ac-scroll-tracker":1041,"ac-window-delegate":1070}],1089:[function(h,c,k){var a=h("ac-dom-metrics");
var m=h("ac-dom-nodes");var j=h("ac-classlist");var o=h("ac-window-delegate").WindowDelegate;
var d=1200;var g=1069;var n="with-herointro-tall";var i="with-herointro-tall-complete";
var f=document.body;var b=function(p){this.elSource=p;this._prepareFixedElement();
o.on("resize",this._updateEnabled,this);this._updateOffset=this._updateOffset.bind(this);
this._updateEnabled()};var l=b.prototype;l.enabled=false;l.complete=false;l._disable=function(){o.off("scroll",this._updateComplete,this);
j.remove(f,n,i);this.enabled=false;this.complete=false};l._enable=function(){o.on("scroll",this._updateComplete,this);
j.add(f,n);this.enabled=true;this._updateOffset()};l._prepareFixedElement=function(){this.elFixed=this.elSource.cloneNode(true);
this.elFixed.setAttribute("aria-hidden","true");j.add(this.elFixed,"fixed");m.insertLastChild(this.elFixed,document.body)
};l._rafUpdateOffset=function(){window.requestAnimationFrame(this._updateOffset)
};l._updateOffset=function(){var p;if(!this.enabled){this._elSourceTop=0;this._elFixedTop=0
}else{this._elFixedTop=a.getPosition(this.elFixed).top||this._elFixedTop;this._elSourceTop=a.getPagePosition(this.elSource).top||this._elSourceTop;
this._updateComplete()}};l._updateEnabled=function(){var r=o.clientHeight();var p=o.clientWidth();
var q=(r>=d&&p>=g);if(q===this.enabled){this._updateOffset();return}if(q){this._enable()
}else{this._disable()}};l._updateComplete=function(){var q=o.scrollY();var p=(this._elFixedTop>=this._elSourceTop-q);
if(this.complete!==p){this.complete=p;j.toggle(f,i,this.complete)}};c.exports=b
},{"ac-classlist":65,"ac-dom-metrics":136,"ac-dom-nodes":148,"ac-window-delegate":1070}],1090:[function(d,c,f){var b=d("ac-dom-traversal");
var k=d("ac-feature");var p=d("ac-event-emitter").EventEmitter;var j=d("../../shared/mediaObjectHelper");
var i=d("../../shared/MediaObjectScrollPlayer");var a=d("ac-scroll-tracker").ScrollTracker;
var g=d("ac-clock").ThrottledClock;var o=d("../../shared/canPlayH264");var l=d("ac-browser");
var m=200;var n=function(q){p.call(this);this.el=b.querySelector(".herointro-video");
if(this._isBrowserThrottled()){this._scrollTracker=this._createThrottledScrollTracker(q)
}else{this._scrollTracker=q}this._boundUpdateProgress=this._updateProgress.bind(this)
};var h=n.prototype=Object.create(p.prototype);h.loaded=false;h.progress=0;h.load=function(){if(!this.supported()){return
}this._prepareVideo();this._updateProgress()};h.supported=function(){return(this._isBrowserSupported()&&o()&&!k.touchAvailable())
};h._isBrowserSupported=function(){return !!(l.name.match(/safari|chrome/i))};h._isBrowserThrottled=function(){return !!(l.name.match(/chrome/i))
};h._createThrottledScrollTracker=function(s){var r=new g(30);var q=new a({target:s,clock:r,start:s.getRangeStart(),end:s.getRangeEnd()});
r.start();return q};h._updateProgress=function(){var q=0;var t;var s;var r;if(this._mediaObject.loaded){q=1
}else{t=this._mediaObject.getChunks();s=t.length;if(s!==0){for(r=0;r<s;r++){if(t[r].isLoaded()){q++
}}q/=s}}if(this.progress!==q){this.progress=q;this.trigger("progress",this.progress);
if(this.progress===1){this.loaded=true;this.trigger("loaded")}}if(this.progress<1){this._progressTimeout=setTimeout(this._boundUpdateProgress,m)
}};h._prepareVideo=function(){this._mediaObject=j.createVideo(this.el,"hero",true);
this._player=new i(this._mediaObject,this._scrollTracker);this.trigger("loading")
};c.exports=n},{"../../shared/MediaObjectScrollPlayer":1097,"../../shared/canPlayH264":1101,"../../shared/mediaObjectHelper":1103,"ac-browser":54,"ac-clock":72,"ac-dom-traversal":183,"ac-event-emitter":false,"ac-feature":301,"ac-scroll-tracker":1041}],1091:[function(d,c,f){var a=d("ac-dom-traversal");
var i=d("ac-dom-styles");var j=d("ac-dom-emitter").DOMEmitter;var k=d("../../shared/ClassTransition");
var g=d("../../shared/scroller/smoothScrollTo");var b=function(l,m){this.el=l;this.scrollY=m;
this._emitter=new j(this.el);this._emitter.on("click",this._scrollToEnd,this);this._finalRevealEl=a.querySelector(".scrollcta-copy",this.el);
this._reveal=new k(this.el,"reveal",{didTransitionEnd:this._isRevealComplete.bind(this)})
};var h=b.prototype;h.visible=true;h.reveal=function(){this._reveal.enter()};h._isRevealComplete=function(l){return(l.target===this._finalRevealEl)
};h._scrollToEnd=function(l){g(0,this.scrollY+1,{duration:2.5})};h.hide=function(){if(this.visible){i.setStyle(this.el,{display:"none"});
this.visible=false}};h.show=function(){if(!this.visible){i.setStyle(this.el,{display:""});
this.visible=true}};c.exports=b},{"../../shared/ClassTransition":1096,"../../shared/scroller/smoothScrollTo":1106,"ac-dom-emitter":106,"ac-dom-styles":172,"ac-dom-traversal":183}],1092:[function(c,d,b){var h=c("ac-scroll-tracker").SmoothScrollTracker;
var f=c("ac-scroll-tracker").ScrollTracker;var a=c("./scrollDistance");d.exports=function g(i){var k=new f({end:100});
var j=new f({end:a-300});var l=new h({start:a-200,end:a});return[{selector:".herointro-video",from:0,to:240,off:0,z:false,scrollTracker:i},{selector:".herointro-filmlist",clipOptions:{propsFrom:{translateY:0,opacity:1},propsTo:{translateY:(80*a/100),opacity:(1-(a/100))},propsOff:{translateY:0,opacity:1},units:{translateY:"px"}},scrollTracker:i},{selector:".herointro-headline",clipOptions:{propsFrom:{translateY:0,opacity:1},propsTo:{translateY:80,opacity:0},propsOff:{translateY:0,opacity:1},units:{translateY:"px"}},scrollTracker:j},{selector:".herointro-shadow",clipOptions:{ease:"easeInCirc",propsFrom:{opacity:0},propsTo:{opacity:0.8},propsOff:{opacity:0}},scrollTracker:l},{selector:".herointro-shadow",clipOptions:{propsFrom:{scaleY:4,scaleX:1.5,translateX:-20,translateY:20},propsTo:{scaleY:1,scaleX:1,translateX:0,translateY:0},propsOff:{scaleY:4,scaleX:1.5,translateX:-20,translateY:20},units:{translateX:"px",translateY:"px"}},scrollTracker:l},{selector:".scrollcta",clipOptions:{propsFrom:{opacity:1,translateY:0},propsTo:{opacity:0,translateY:12},propsOff:{opacity:1,translateY:0},units:{translateY:"px"}},scrollTracker:k},{selector:".scrollcta-copy",from:0,to:-12,off:0,scrollTracker:k}]
}},{"./scrollDistance":1093,"ac-scroll-tracker":1041}],1093:[function(b,c,a){c.exports=580
},{}],1094:[function(c,d,a){var f=c("ac-dom-traversal");var b=c("ac-scroll-tracker").ElementScrollTracker;
d.exports=function(){var g=f.querySelector(".image-wireless");var h=new b(g,{smooth:true,startThreshold:1,startOffset:200,endThreshold:0.2});
return[{selector:".image-colors",from:-150,to:100,off:0},{selector:".image-trackpad",from:-100,to:0,off:0,clipOptions:{ease:"easeOutQuad"}},{selector:".image-wireless",from:-200,to:0,off:0,scrollTracker:h},{selector:".image-wireless-bottom-shadow",clipOptions:{ease:"easeInQuad",propsFrom:{opacity:0,scale:4},propsTo:{opacity:1,scale:1},propsOff:{opacity:0,scale:4}},scrollTracker:h},{selector:".image-osx",from:100,to:-150,off:0},{selector:".image-builtinapps",from:-150,to:0,off:0}]
}},{"ac-dom-traversal":183,"ac-scroll-tracker":1041}],1095:[function(i,c,u){var q=i("ac-ajax");
var g=i("ac-dom-traversal");var n=i("ac-element-engagement").ElementEngagement;
var d=i("ac-classlist");var p=i("../shared/create-localnav");var r=i("./HeroIntro");
var j=i("../shared/ParallaxController");var h=i("./getParallaxOptions");var t=i("../shared/resetScrollOnRefresh");
var k=i("../shared/RevealController");var b=i("ac-feature");var s=i("ac-films");
var w=i("ac-window-delegate").WindowDelegate;var o=i("ac-browser");var f=i("@marcom/ac-viewport-emitter");
var m=o.name.match(/ie/i)&&o.version<9;var a=o.name.match(/chrome/i);var v=w.clientWidth()<=735&&d.contains(g.querySelector("html"),"fluid-support");
var l=(function(){return{initialize:function(){if(!document.getElementById("ac-localnav")){p()
}this.heroIntro=new r();if(v||a){this.heroIntro.toggle(false)}this.reveal();this.parallax();
this.video();t.initialize();f.on("change",this.updateCreativeTech.bind(this));return this
},updateCreativeTech:function(y){var x=!a&&(y.to=="medium"||y.to=="large");this.parallax();
this.parallaxController.start();this.heroIntro.toggle(x)},video:function(){var y=g.querySelectorAll("[data-modal]");
var x=s.create(y,{modal:true})},parallax:function(){if(this.parallaxController){this.parallaxController=null
}this.parallaxController=new j(h())},reveal:function(){var z=g.querySelectorAll(".badge, .section-wireless .service, .section-usb-c");
var x=new k(z);var y=g.querySelector(".internals-layer-bottom");var A=0;x.addElement({selector:".section-internals .internals",didTransitionEnd:function(B,C){return B.target===y
}});x.addElement({selector:".section-battery .battery",didTransitionEnd:function(B,C){A++;
return(A===4)}})}}}());c.exports=l.initialize()},{"../shared/ParallaxController":1098,"../shared/RevealController":1100,"../shared/create-localnav":1102,"../shared/resetScrollOnRefresh":1104,"./HeroIntro":1088,"./getParallaxOptions":1094,"@marcom/ac-viewport-emitter":12,"ac-ajax":13,"ac-browser":54,"ac-classlist":65,"ac-dom-traversal":183,"ac-element-engagement":222,"ac-feature":301,"ac-films":914,"ac-window-delegate":1070}],1096:[function(k,b,s){var r=k("ac-object");
var m=k("ac-feature");var c=k("ac-classlist");var i=k("ac-dom-emitter").DOMEmitter;
var t=k("ac-clock");var o=k("ac-element-engagement").ElementEngagement;var h=k("ac-event-emitter").EventEmitter;
var p=m.cssPropertyAvailable("transition");var l={};var d="transition";var j="can-";
var a="will-";var q="did-";var f="replay-";var g=function(w,v,u){h.call(this);this.el=w;
this._className=v;u=r.defaults(l,u);this._didTransitionEnd=u.didTransitionEnd||null;
this._transitionEndEl=u.transitionEndElement||this.el;this._domEmitter=new i(this._transitionEndEl);
this.entered=this._hasTransitionEndListener=false;this._resolve=this._reject=this._promise=this._nextDraw=null;
this._setCallbacks=this._setCallbacks.bind(this);this._canTransition()};var n=g.prototype=Object.create(h.prototype);
n._setCallbacks=function(v,u){this._resolve=v;this._reject=u};n._cleanup=function(){this._resolve=this._reject=this._promise=this._nextDraw=null
};n._canTransition=function(){c.add(this.el,j+this._className);this.trigger(j+d,this)
};n._replayTransition=function(){c.add(this.el,f+this._className);this._nextDraw=this._willTransition;
t.once("draw",this._nextDraw,this);this.trigger(f+d,this)};n._willTransition=function(){c.add(this.el,a+this._className);
this._nextDraw=this._onTransition;t.once("draw",this._nextDraw,this);this.trigger(a+d,this)
};n._onTransition=function(){c.add(this.el,this._className);if(p){this._hasTransitionEndListener=true;
this._domEmitter.on("transitionend",this._onTransitionEnd,this)}else{this._nextDraw=this._didTransition;
t.once("draw",this._nextDraw,this)}this.trigger(d,this)};n._didTransition=function(){c.add(this.el,q+this._className);
c.remove(this.el,f+this._className);this.entered=true;this._resolve();this.trigger(q+d,this);
this._cleanup()};n._onTransitionEnd=function(u){var v;if(this._isTransitionEnd(u)){this._hasTransitionEndListener=false;
this._domEmitter.off("transitionend",this._onTransitionEnd,this);this._nextDraw=this._didTransition;
t.once("draw",this._nextDraw,this)}};n._isTransitionEnd=function(u){var v=(u.target===this._transitionEndEl);
if(this._didTransitionEnd){return this._didTransitionEnd(u,v)}return v};n.enter=function(u){if(this.entered){}if(this._promise){return this._promise
}this._promise=new Promise(this._setCallbacks);if(u===true){this._nextDraw=this._replayTransition
}else{this._nextDraw=this._willTransition}t.once("draw",this._nextDraw,this);return this._promise
};n.exit=function(){if(this._promise){this._reject();this._cleanup()}this.entered=false;
c.remove(this.el,q+this._className);c.remove(this.el,this._className);c.remove(this.el,a+this._className)
};n.replay=function(){this.exit();return this.enter(true)};b.exports=g},{"ac-classlist":65,"ac-clock":72,"ac-dom-emitter":106,"ac-element-engagement":222,"ac-event-emitter":false,"ac-feature":301,"ac-object":1033}],1097:[function(d,f,a){var c=d("ac-object");
var b=d("ac-scroll-tracker").ElementScrollTracker;function h(j,i){this.mediaObject=j;
this.scrollTracker=i||null;this.start()}var g=h.prototype;g.start=function(){if(!this.mediaObject.ready){if(!this.mediaObject.loader){this.mediaObject.load()
}this.mediaObject.once("ready",this.start,this);return}if(!this.mediaObject.view.enhanced){this.mediaObject.enhance();
this.mediaObject.once("enhance",this.start,this);return}if(!this.scrollTracker){this.scrollTracker=new b(this.mediaObject.container)
}else{if(this.scrollTracker.updateRange){this.scrollTracker.updateRange()}}this.scrollTracker.on("draw",this._draw,this);
this._draw()};g.stop=function(){this.scrollTracker.off("draw",this._draw)};g._draw=function(i){var j=i?i.progress:this.scrollTracker.getProgress();
this.mediaObject.goToDurationPercent(j)};f.exports=h},{"ac-object":1033,"ac-scroll-tracker":1041}],1098:[function(f,c,h){var b=f("ac-object");
var l=f("ac-feature");var a=f("ac-dom-traversal");var g=f("ac-classlist");var n=f("ac-window-delegate").WindowDelegate;
var k=f("./ParallaxElement");var d=0.65;var m=g.contains(a.querySelector("html"),"fluid-support");
var j=function(o){if(!l.threeDTransformsAvailable()||l.touchAvailable()){return
}this.els=[];this._multiplierEls=[];o.forEach(this._initializeElement.bind(this));
this._translateMultiplier=1;this._updateTranslateMultiplier();n.on("resize orientationchange",this._updateTranslateMultiplier,this)
};var i=j.prototype;i._updateTranslateMultiplier=function(){var p=(n.clientWidth()<=1068)?d:1;
var o;if(n.clientWidth()<=735&&m){this.reset();return}if(!this._translateMultiplier||this._translateMultiplier!==p){this._translateMultiplier=p;
for(o=this._multiplierEls.length-1;o>=0;o--){this._multiplierEls[o].setTranslateMultiplier(p)
}}};i._initializeElement=function(o){var p;var q;var r;var s;if(!o.selector){return
}p=a.querySelector(o.selector);if(!p){return}q=o.clipOptions||{};r=o.scrollOptions||o.clockOptions||{};
if(!q.propsTo&&"to" in o){q.propsTo={translateY:o.to};q.propsFrom={translateY:o.from||0};
q.propsOff={translateY:o.off||0};q.units={translateY:"px"};if(o.hasOwnProperty("z")){q.z=o.z
}}if(o.scrollTracker){q.scrollTracker=o.scrollTracker}s=new k(p,q.propsTo,q.propsOff,q,r);
this.els.push(s);if(o.useMediumMultiplier!==false){this._multiplierEls.push(s)}};
i.start=function(){var o;for(o=0;o<this.els.length;o++){this.els[o].start()}};i.stop=function(){var o;
for(o=0;o<this.els.length;o++){this.els[o].stop()}};i.reset=function(){var o;for(o=0;
o<this.els.length;o++){this.els[o].reset()}};c.exports=j},{"./ParallaxElement":1099,"ac-classlist":65,"ac-dom-traversal":183,"ac-feature":301,"ac-object":1033,"ac-window-delegate":1070}],1099:[function(c,b,d){var a=c("ac-object");
var j=c("ac-dom-styles");var i=c("ac-clip").Clip;var m=c("ac-scroll-tracker").ElementScrollTracker;
var k=c("ac-scroll-tracker").SmoothScrollTracker;var l=c("ac-browser");var h=l.name.match(/chrome/i);
var g=function(n,t,s,o,r){var q;var p;o=a.defaults(this.defaultClipOptions,o);r=a.defaults(this.defaultScrollOptions,r);
this.el=n;this._translateMultiplier=1;if(r.el){q=r.el;r.el=null}else{q=this.el}this._scrollTracker=o.scrollTracker||new m(q,r);
p=a.clone(o.propsFrom);o.clock=this._scrollTracker;o.onDraw=this._draw.bind(this);
this._units=o.units;this._target=p;this._propsTo=t;this._propsOff=s;this._clipOptions=o;
this._clip=new i(p,1,t,o);this.start()};var f=g.prototype;f.defaultClipOptions={ease:"linear",units:{}};
f.defaultScrollOptions={smooth:true,startThreshold:1};f.start=function(){this._clip=new i(this._target,1,this._propsTo,this._clipOptions);
this._scrollTracker.on("update",this._update,this);this._update()};f.stop=function(){this._scrollTracker.off("update",this._update,this)
};f.reset=function(){this.stop();this._clip=new i(this._target,1,this._propsOff,this._clipOptions);
this._clip.setProgress(1)};f._update=function(o){var n=o?o.progress:this._scrollTracker.getProgress();
this._clip.setCurrentTime(n)};f._draw=function(o){var n=a.clone(o.target);var p;
this._lastDrawData=o;if(n.translateY){n.translateY=n.translateY*this._translateMultiplier
}if(n.translateX){n.translateX=n.translateX*this._translateMultiplier}for(p in this._units){if(p in n){n[p]+=this._units[p]
}}n.translateZ=n.translateZ||0;if(h&&this._clipOptions.hasOwnProperty("z")&&this._clipOptions.z===false){n.translateZ=null
}j.setStyle(this.el,n)};f.setTranslateMultiplier=function(n){this._translateMultiplier=n||1;
if(this._lastDrawData){this._draw(this._lastDrawData)}};b.exports=g},{"ac-browser":54,"ac-clip":70,"ac-dom-styles":172,"ac-object":1033,"ac-scroll-tracker":1041}],1100:[function(d,c,g){var j=d("ac-feature");
var a=d("ac-dom-traversal");var i=d("ac-dom-events");var b=d("ac-element-engagement").ElementEngagement;
var k=d("./ClassTransition");var f=function(l){if(!j.continuousScrollEventsAvailable()||!j.cssPropertyAvailable("transition")){this._enabled=false;
return}this._enabled=true;this._elementEngagement=new b();this._elementEngagement.on("engaged",this._onEngaged,this);
this._active=false;if(l){this.addElements(l)}};var h=f.prototype;h.addElements=function(l){if(!this._enabled){return false
}l.forEach(this.addElement.bind(this))};h.addElement=function(n){var p;var l;var m;
var q;var o;if(!this._enabled){return false}p=this._getElement(n);if(!p){return
}if(p===n){n={}}o=n.className||"reveal";q=new k(p,o,{didTransitionEnd:n.didTransitionEnd||null,transitionEndElement:n.transitionEndElement||null});
l=n.engagementElement||p;this._elementEngagement.addElement(l,{inViewThreshold:n.threshold||0.75,classTransition:q});
if(n.replay){i.addEventListener(n.replay,"click",this._replay.bind(this,q))}if(!this._active){this._elementEngagement.start()
}};h.start=function(){this._elementEngagement.start();this._active=true};h.stop=function(){this._elementEngagement.stop();
this._active=false};h._replay=function(m,l){l.preventDefault();m.replay()};h._onEngaged=function(l){this._elementEngagement.removeElement(l);
l.classTransition.enter()};h._getElement=function(l){if(typeof l==="string"){return a.querySelector(l)
}if(l.nodeType){return l}if(l.el){return l.el}if(l.selector){return a.querySelector(l.selector)
}return false};c.exports=f},{"./ClassTransition":1096,"ac-dom-events":111,"ac-dom-traversal":183,"ac-element-engagement":222,"ac-feature":301}],1101:[function(c,d,b){var a=c("ac-feature");
var f=null;d.exports=function g(){var h;if(f===null){f=false;if(a.mediaElementsAvailable()){try{h=document.createElement("video");
if(h.canPlayType&&h.canPlayType("video/mp4").replace(/^no$/,"")){f=true}}catch(i){}}}return f
}},{"ac-feature":301}],1102:[function(c,d,a){var b=c("ac-localnav").Localnav;d.exports=function(){var f=new b();
f.createLocalnav()}},{"ac-localnav":965}],1103:[function(c,b,g){var i=c("ac-feature");
var a=c("ac-object");var j=c("ac-media-object");var h=c("ac-media-object").cname;
var f=window.mediaConfig;var d={base:"/105/media",locale:"us",site:"macbook/2015",hash:"98474cad-63d2-443a-9125-a1a80bc150dc"};
b.exports={createVideo:function(m,k,l){var n;var o={filename:this.getFilename(k),basePath:this.getBasePath()};
if(l){o.splitFileLoading=true;o.basePath+="/"+o.filename;o.filename=""}n=j.create(m,o,{type:"h264"});
if(l){n=this.exposeSplitFileChunks(n)}return n},exposeSplitFileChunks:function(k){k.getChunks=function(){var l=k.loader.loadObject._queue._active[0];
if(l&&l._binary&&l._binary._chunks){return l._binary._chunks}return[]};return k
},getBasePath:function(){var k=d;if(f&&f.path){k=a.defaults(k,f.path)}return h(k.base+"/"+k.locale+"/"+k.site+"/"+k.hash)
},getFilename:function(k){if(i.isRetina()){k+="_2x"}return k}}},{"ac-feature":301,"ac-media-object":1013,"ac-object":1033}],1104:[function(b,c,a){var d=b("ac-dom-events");
c.exports={initialize:function(){d.addEventListener(window,"unload",this.resetScroll)
},resetScroll:function(){window.scrollTo(0,0)}}},{"ac-dom-events":111}],1105:[function(f,g,b){var d=f("ac-object");
var c=f("ac-clip").Clip;var i=f("ac-window-delegate").WindowDelegate;var a=function(k,n,l){var j;
var m;l=d.defaults(this.defaults,l);l.onDraw=this._draw.bind(this);j={x:i.scrollX(),y:i.scrollY()};
m={x:k,y:n};this._clip=new c(j,l.duration,m,l)};var h=a.prototype;h.defaults={ease:"ease",duration:1};
h._draw=function(k){var j=k.target.x||0;var l=k.target.y||0;window.scrollTo(j,l);
if(k.progress===1){this._resolve();this._resolve=this._reject=null}};h._preparePromise=function(k,j){this._resolve=k;
this._reject=j};h.start=function(){this._clip.play();return new Promise(this._preparePromise.bind(this))
};h.destroy=function(){if(this._reject){this._reject()}this._resolve=this._reject=this._clip=null
};g.exports=a},{"ac-clip":70,"ac-object":1033,"ac-window-delegate":1070}],1106:[function(c,f,b){var a=c("./SmoothScroll");
f.exports=function d(h,k,i){var g=new a(h,k,i);var j=g.destroy.bind(g);g.start().then(j)
}},{"./SmoothScroll":1105}]},{},[1095]);