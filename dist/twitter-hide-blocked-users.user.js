// ==UserScript==
// @name         twitter hide blocked users
// @description  twitter hide blocked users
// @grant        none
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-hide-blocked-users.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-hide-blocked-users.user.js
// @version      1787016436144
// ==/UserScript==
(()=>{"use strict";const e=XMLHttpRequest.prototype.send,t=(t,o)=>{XMLHttpRequest.prototype.send=function(r){return this.addEventListener("load",(()=>{200===this.status&&("string"==typeof t?this.responseURL.includes(t):t.test(this.responseURL))&&o(this)})),e.call(this,r)}},o=new Set,r=e=>null==e||"object"!=typeof e||Array.isArray(e)?null:e,s=e=>{const t=Array.from(e.querySelectorAll('a[role="link"]'));for(const r of t){const t=r.getAttribute("href")?.replace(/^\//,"").toLowerCase();if(void 0!==t&&""!==t&&o.has(t))return void e.style.setProperty("filter","grayscale(100%) opacity(0.3)","important")}};let n=!1,c=[];const i=()=>{const e=c;c=[],n=!1;for(const t of e)for(const e of Array.from(t.addedNodes))if(e instanceof HTMLElement)if("cellInnerDiv"===e.dataset.testid)s(e);else{const t=Array.from(e.querySelectorAll('[data-testid="cellInnerDiv"]'));for(const e of t)s(e)}},l=e=>{c.push(...e),n||(n=!0,requestAnimationFrame(i))};try{(()=>{t("SearchTimeline",(e=>{try{(e=>{const t=[e];for(;t.length>0;){const e=t.pop();if(Array.isArray(e)){for(const o of e)t.push(o);continue}const s=r(e);if(null===s)continue;const n=r(s.relationship_perspectives),c=r(s.core);if(!0===n?.blocking&&null!==c){const{screen_name:e}=c;"string"==typeof e&&""!==e&&(o.add(e.toLowerCase()),console.log(`blocked user: @${e}`))}for(const e in s)Object.hasOwn(s,e)&&t.push(s[e])}})(JSON.parse(e.responseText));const t=document.querySelectorAll('[data-testid="cellInnerDiv"]');for(const e of Array.from(t))s(e)}catch(e){console.error(e)}}));const e=document.querySelector('[data-testid="primaryColumn"]')??document.documentElement;new MutationObserver(l).observe(e,{childList:!0,subtree:!0})})()}catch(e){console.error(e)}})();