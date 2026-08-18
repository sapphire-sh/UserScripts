// ==UserScript==
// @name         url sanitizer
// @description  url sanitizer
// @grant        none
// @match        http://www.toranoana.jp/*
// @match        https://www.toranoana.jp/*
// @match        https://www.melonbooks.co.jp/*
// @match        https://www.pixiv.net/*
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @match        https://*.fanbox.cc/*
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/url-sanitizer.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/url-sanitizer.user.js
// @version      1787019339980
// ==/UserScript==
(()=>{"use strict";var t;!function(t){t.TWITTER="twitter",t.PIXIV="pixiv",t.PIXIV_FANBOX="pixiv_fanbox",t.MELONBOOKS="melonbooks",t.TORANOANA="toranoana"}(t||(t={}));const o=t=>{const o=t.split("&").map((t=>t.split("=")));return Object.fromEntries(o)},r=(r,n)=>{if(r===t.TWITTER){const[,t,o]=n;return`https://twitter.com/${t}/status/${o}`}const[,e]=n;return`${e}${((r,n)=>{switch(r){case t.PIXIV:if(void 0===n||""===n)throw new Error("text not found");return`?${e=o(n),Object.keys(e).map((t=>`${t}=${e[t]}`)).join("&")}`;case t.PIXIV_FANBOX:case t.TORANOANA:return"";case t.MELONBOOKS:if(void 0===n||""===n)throw new Error("text not found");return`?product_id=${o(n).product_id}`}var e})(r,n[2])}`},n={[t.TWITTER]:/^https:\/\/(?:.+\.)?twitter.com\/(.+)\/status\/(\d+)/,[t.PIXIV]:/^(https:\/\/www.pixiv.net\/member_illust.php)\?(.+)#?/,[t.PIXIV_FANBOX]:/^(https:\/\/.+.fanbox.cc\/posts\/\d+)\?(.+)/,[t.TORANOANA]:/^(https?:\/\/www.toranoana.jp\/mailorder\/article\/.+)\?(.+)#?/,[t.MELONBOOKS]:/^(https:\/\/www.melonbooks.co.jp\/detail\/detail.php)\?(.+)#?/};(async()=>{try{(()=>{const o=Object.values(t);for(const t of o){const o=n[t],e=window.location.href.match(o);if(null===e)continue;const s=r(t,e);window.history.pushState(window.location.href,"",s)}})()}catch(t){console.error(t)}})()})();