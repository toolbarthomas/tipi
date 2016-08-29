/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-applicationcache-audio-canvas-cookies-cssanimations-cssgradients-csstransforms-csstransforms3d-csstransitions-cssvhunit-cssvmaxunit-cssvminunit-cssvwunit-flash-fontface-hashchange-hiddenscroll-history-inlinesvg-localstorage-sessionstorage-svg-svgclippaths-svgfilters-svgforeignobject-touchevents-video-setclasses !*/
!function(e,t,n){function o(e,t){return typeof e===t}function i(){var e,t,n,i,r,a,s;for(var c in S)if(S.hasOwnProperty(c)){if(e=[],t=S[c],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(i=o(t.fn,"function")?t.fn():t.fn,r=0;r<e.length;r++)a=e[r],s=a.split("."),1===s.length?Modernizr[s[0]]=i:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=i),T.push((i?"":"no-")+s.join("-"))}}function r(e){var t=b.className,n=Modernizr._config.classPrefix||"";if(C&&(t=t.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(o,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),C?b.className.baseVal=t:b.className=t)}function a(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):C?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function s(){var e=t.body;return e||(e=a(C?"svg":"body"),e.fake=!0),e}function c(e,t){return e-1===t||e===t||e+1===t}function d(e,t){if("object"==typeof e)for(var n in e)N(e,n)&&d(n,e[n]);else{e=e.toLowerCase();var o=e.split("."),i=Modernizr[o[0]];if(2==o.length&&(i=i[o[1]]),"undefined"!=typeof i)return Modernizr;t="function"==typeof t?t():t,1==o.length?Modernizr[o[0]]=t:(!Modernizr[o[0]]||Modernizr[o[0]]instanceof Boolean||(Modernizr[o[0]]=new Boolean(Modernizr[o[0]])),Modernizr[o[0]][o[1]]=t),r([(t&&0!=t?"":"no-")+o.join("-")]),Modernizr._trigger(e,t)}return Modernizr}function l(e,n,o,i){var r,c,d,l,u="modernizr",f=a("div"),p=s();if(parseInt(o,10))for(;o--;)d=a("div"),d.id=i?i[o]:u+(o+1),f.appendChild(d);return r=a("style"),r.type="text/css",r.id="s"+u,(p.fake?p:f).appendChild(r),p.appendChild(f),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(t.createTextNode(e)),f.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",l=b.style.overflow,b.style.overflow="hidden",b.appendChild(p)),c=n(f,e),p.fake?(p.parentNode.removeChild(p),b.style.overflow=l,b.offsetHeight):f.parentNode.removeChild(f),!!c}function u(e,t){return!!~(""+e).indexOf(t)}function f(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function p(e,t){return function(){return e.apply(t,arguments)}}function h(e,t,n){var i;for(var r in e)if(e[r]in t)return n===!1?e[r]:(i=t[e[r]],o(i,"function")?p(i,n||t):i);return!1}function m(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function v(t,o){var i=t.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(m(t[i]),o))return!0;return!1}if("CSSSupportsRule"in e){for(var r=[];i--;)r.push("("+m(t[i])+":"+o+")");return r=r.join(" or "),l("@supports ("+r+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function g(e,t,i,r){function s(){d&&(delete M.style,delete M.modElem)}if(r=o(r,"undefined")?!1:r,!o(i,"undefined")){var c=v(e,i);if(!o(c,"undefined"))return c}for(var d,l,p,h,m,g=["modernizr","tspan","samp"];!M.style&&g.length;)d=!0,M.modElem=a(g.shift()),M.style=M.modElem.style;for(p=e.length,l=0;p>l;l++)if(h=e[l],m=M.style[h],u(h,"-")&&(h=f(h)),M.style[h]!==n){if(r||o(i,"undefined"))return s(),"pfx"==t?h:!0;try{M.style[h]=i}catch(y){}if(M.style[h]!=m)return s(),"pfx"==t?h:!0}return s(),!1}function y(e,t,n,i,r){var a=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+j.join(a+" ")+a).split(" ");return o(t,"string")||o(t,"undefined")?g(s,t,i,r):(s=(e+" "+R.join(a+" ")+a).split(" "),h(s,t,n))}function w(e,t,o){return y(e,n,n,t,o)}var T=[],S=[],x={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){S.push({name:e,fn:t,options:n})},addAsyncTest:function(e){S.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=x,Modernizr=new Modernizr,Modernizr.addTest("applicationcache","applicationCache"in e),Modernizr.addTest("cookies",function(){try{t.cookie="cookietest=1";var e=-1!=t.cookie.indexOf("cookietest=");return t.cookie="cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT",e}catch(n){return!1}}),Modernizr.addTest("history",function(){var t=navigator.userAgent;return-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone")?e.history&&"pushState"in e.history:!1}),Modernizr.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),Modernizr.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(t){return!1}}),Modernizr.addTest("sessionstorage",function(){var e="modernizr";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(t){return!1}}),Modernizr.addTest("svgfilters",function(){var t=!1;try{t="SVGFEColorMatrixElement"in e&&2==SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE}catch(n){}return t});var b=t.documentElement,C="svg"===b.nodeName.toLowerCase();Modernizr.addTest("audio",function(){var e=a("audio"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),t.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),t.opus=e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,""),t.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),t.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("canvas",function(){var e=a("canvas");return!(!e.getContext||!e.getContext("2d"))}),Modernizr.addTest("inlinesvg",function(){var e=a("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var P=function(){function e(e,t){var i;return e?(t&&"string"!=typeof t||(t=a(t||"div")),e="on"+e,i=e in t,!i&&o&&(t.setAttribute||(t=a("div")),t.setAttribute(e,""),i="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),i):!1}var o=!("onblur"in t.documentElement);return e}();x.hasEvent=P,Modernizr.addTest("hashchange",function(){return P("hashchange",e)===!1?!1:t.documentMode===n||t.documentMode>7}),Modernizr.addTest("video",function(){var e=a("video"),t=!1;try{(t=!!e.canPlayType)&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t});var _=x._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];x._prefixes=_,Modernizr.addTest("cssgradients",function(){for(var e,t="background-image:",n="gradient(linear,left top,right bottom,from(#9f9),to(white));",o="",i=0,r=_.length-1;r>i;i++)e=0===i?"to ":"",o+=t+_[i]+"linear-gradient("+e+"left top, #9f9, white);";Modernizr._config.usePrefixes&&(o+=t+"-webkit-"+n);var s=a("a"),c=s.style;return c.cssText=o,(""+c.backgroundImage).indexOf("gradient")>-1});var E="CSS"in e&&"supports"in e.CSS,k="supportsCSS"in e;Modernizr.addTest("supports",E||k);var z={}.toString;Modernizr.addTest("svgclippaths",function(){return!!t.createElementNS&&/SVGClipPath/.test(z.call(t.createElementNS("http://www.w3.org/2000/svg","clipPath")))}),Modernizr.addTest("svgforeignobject",function(){return!!t.createElementNS&&/SVGForeignObject/.test(z.call(t.createElementNS("http://www.w3.org/2000/svg","foreignObject")))});var N;!function(){var e={}.hasOwnProperty;N=o(e,"undefined")||o(e.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),x._l={},x.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},x._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,o;for(e=0;e<n.length;e++)(o=n[e])(t)},0),delete this._l[e]}},Modernizr._q.push(function(){x.addTest=d}),Modernizr.addAsyncTest(function(){var n,o,i=function(e){b.contains(e)||b.appendChild(e)},r=function(e){e.fake&&e.parentNode&&e.parentNode.removeChild(e)},c=function(e,t){var n=!!e;if(n&&(n=new Boolean(n),n.blocked="blocked"===e),d("flash",function(){return n}),t&&h.contains(t)){for(;t.parentNode!==h;)t=t.parentNode;h.removeChild(t)}};try{o="ActiveXObject"in e&&"Pan"in new e.ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(l){}if(n=!("plugins"in navigator&&"Shockwave Flash"in navigator.plugins||o),n||C)c(!1);else{var u,f,p=a("embed"),h=s();if(p.type="application/x-shockwave-flash",h.appendChild(p),!("Pan"in p||o))return i(h),c("blocked",p),void r(h);u=function(){return i(h),b.contains(h)?(b.contains(p)?(f=p.style.cssText,""!==f?c("blocked",p):c(!0,p)):c("blocked"),void r(h)):(h=t.body||h,p=a("embed"),p.type="application/x-shockwave-flash",h.appendChild(p),setTimeout(u,1e3))},setTimeout(u,10)}});var A=x.testStyles=l;Modernizr.addTest("hiddenscroll",function(){return A("#modernizr {width:100px;height:100px;overflow:scroll}",function(e){return e.offsetWidth===e.clientWidth})}),Modernizr.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var o=["@media (",_.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");A(o,function(e){n=9===e.offsetTop})}return n});var O=function(){var e=navigator.userAgent,t=e.match(/applewebkit\/([0-9]+)/gi)&&parseFloat(RegExp.$1),n=e.match(/w(eb)?osbrowser/gi),o=e.match(/windows phone/gi)&&e.match(/iemobile\/([0-9])+/gi)&&parseFloat(RegExp.$1)>=9,i=533>t&&e.match(/android/gi);return n||i||o}();O?Modernizr.addTest("fontface",!1):A('@font-face {font-family:"font";src:url("https://")}',function(e,n){var o=t.getElementById("smodernizr"),i=o.sheet||o.styleSheet,r=i?i.cssRules&&i.cssRules[0]?i.cssRules[0].cssText:i.cssText||"":"",a=/src/i.test(r)&&0===r.indexOf(n.split(" ")[0]);Modernizr.addTest("fontface",a)}),A("#modernizr { height: 50vh; }",function(t){var n=parseInt(e.innerHeight/2,10),o=parseInt((e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).height,10);Modernizr.addTest("cssvhunit",o==n)}),A("#modernizr1{width: 50vmax}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",function(t){var n=t.childNodes[2],o=t.childNodes[1],i=t.childNodes[0],r=parseInt((o.offsetWidth-o.clientWidth)/2,10),a=i.clientWidth/100,s=i.clientHeight/100,d=parseInt(50*Math.max(a,s),10),l=parseInt((e.getComputedStyle?getComputedStyle(n,null):n.currentStyle).width,10);Modernizr.addTest("cssvmaxunit",c(d,l)||c(d,l-r))},3),A("#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",function(t){var n=t.childNodes[2],o=t.childNodes[1],i=t.childNodes[0],r=parseInt((o.offsetWidth-o.clientWidth)/2,10),a=i.clientWidth/100,s=i.clientHeight/100,d=parseInt(50*Math.min(a,s),10),l=parseInt((e.getComputedStyle?getComputedStyle(n,null):n.currentStyle).width,10);Modernizr.addTest("cssvminunit",c(d,l)||c(d,l-r))},3),A("#modernizr { width: 50vw; }",function(t){var n=parseInt(e.innerWidth/2,10),o=parseInt((e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).width,10);Modernizr.addTest("cssvwunit",o==n)});var I="Moz O ms Webkit",j=x._config.usePrefixes?I.split(" "):[];x._cssomPrefixes=j;var R=x._config.usePrefixes?I.toLowerCase().split(" "):[];x._domPrefixes=R;var $={elem:a("modernizr")};Modernizr._q.push(function(){delete $.elem});var M={style:$.elem.style};Modernizr._q.unshift(function(){delete M.style}),x.testAllProps=y,x.testAllProps=w,Modernizr.addTest("cssanimations",w("animationName","a",!0)),Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&w("transform","scale(1)",!0)}),Modernizr.addTest("csstransforms3d",function(){var e=!!w("perspective","1px",!0),t=Modernizr._config.usePrefixes;if(e&&(!t||"webkitPerspective"in b.style)){var n,o="#modernizr{width:0;height:0}";Modernizr.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",t&&(n+=",(-webkit-transform-3d)")),n+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",A(o+n,function(t){e=7===t.offsetWidth&&18===t.offsetHeight})}return e}),Modernizr.addTest("csstransitions",w("transition","all",!0)),i(),r(T),delete x.addTest,delete x.addAsyncTest;for(var W=0;W<Modernizr._q.length;W++)Modernizr._q[W]();e.Modernizr=Modernizr}(window,document);