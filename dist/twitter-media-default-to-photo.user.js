// ==UserScript==
// @name         twitter media default to photo
// @description  open the profile media tab with the photo filter applied
// @grant        none
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-media-default-to-photo.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-media-default-to-photo.user.js
// @version      1787008153368
// ==/UserScript==
(()=>{"use strict";const t=/^\/\w{1,15}\/media\/?$/,e="filter",n="locationchange",o=n=>{const o=new URL(n,window.location.origin);return t.test(o.pathname)?o.searchParams.has(e)?null:(o.searchParams.set(e,"photo"),`${o.pathname}${o.search}`):null},r=()=>{const t=Array.from(document.querySelectorAll('a[href*="/media"]'));for(const e of t){const t=e.getAttribute("href");if(null===t)continue;const n=o(t);null!==n&&e.setAttribute("href",n)}},s=()=>{(()=>{const t=o(window.location.href);null!==t&&window.location.replace(t)})(),r()};try{(()=>{const t=()=>window.dispatchEvent(new Event(n)),e=history.pushState.bind(history),o=history.replaceState.bind(history);history.pushState=(...n)=>{e(...n),t()},history.replaceState=(...e)=>{o(...e),t()},window.addEventListener("popstate",t)})(),new MutationObserver((()=>{r()})).observe(document.documentElement,{childList:!0,subtree:!0}),window.addEventListener(n,(()=>{s()})),s()}catch(t){console.error(t)}})();