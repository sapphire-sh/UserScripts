// ==UserScript==
// @name         twitter media content warning remover
// @description  remove content warning from tweets
// @grant        none
// @run-at       document-end
// @license      MIT
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-media-warning-remover.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-media-warning-remover.user.js
// @version      1787019339980
// ==/UserScript==
(()=>{"use strict";try{new MutationObserver((()=>{const r=Array.from(document.querySelectorAll('article [role="button"].r-173mn98'));for(const e of r)e.click()})).observe(document.body,{childList:!0,subtree:!0})}catch(r){console.error(r)}})();