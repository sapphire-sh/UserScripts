// ==UserScript==
// @name         pixiv direct linker
// @description  convert pixiv links to direct links
// @grant        none
// @match        https://www.pixiv.net/*
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/pixiv-direct-linker.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/pixiv-direct-linker.user.js
// @version      1787008153368
// ==/UserScript==
(()=>{"use strict";const o=/jump.php\?(url=)?(.+)$/i,e=e=>{const r=e.href.match(o);void 0!==r?.[2]&&""!==r[2]&&(e.href=decodeURIComponent(r[2]))};(async()=>{try{new MutationObserver((o=>{for(const r of Array.from(o))for(const o of Array.from(r.addedNodes))if(o instanceof HTMLElement)if(o instanceof HTMLAnchorElement)e(o);else for(const r of Array.from(o.querySelectorAll("a")))e(r)})).observe(document.body,{childList:!0,subtree:!0})}catch(o){console.error(o)}})()})();