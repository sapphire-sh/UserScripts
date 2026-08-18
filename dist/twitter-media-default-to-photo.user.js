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
// @version      1787029191810
// ==/UserScript==
(()=>{"use strict";XMLHttpRequest.prototype.send;const t=async(t,e=0)=>{const n=t+Math.random()*e;return new Promise((t=>globalThis.setTimeout(t,n)))},e=/^\/\w{1,15}\/media\/?$/,n="filter",a="locationchange";let r=!1;const o=t=>{if(0!==t.button)return;if((t=>t.shiftKey||t.metaKey||t.ctrlKey||t.altKey)(t))return;const{target:e}=t;e instanceof Element&&null!==e.closest('a[role="tab"][href$="/media"]')&&(r=!0)},s=()=>{const t=new URL(window.location.href);return!!e.test(t.pathname)&&!t.searchParams.has(n)},i=async()=>{if(null===await(async(e,n)=>{const a=n?.parent??document;return(async(e,n)=>{const{timeout:a=1e4,jitter:r=0}=n??{};let o=0;for(;;){const n=e();if(null!==n)return n;if(o>=a)return null;await t(100,r),o+=100}})((()=>a.querySelector('a[role="tab"][aria-haspopup="menu"]')),n)})(0,{timeout:2048}))return;if(!s())return;const e=new URL(window.location.href);e.searchParams.set(n,"photo"),history.pushState(null,"",`${e.pathname}${e.search}`),window.dispatchEvent(new PopStateEvent("popstate",{state:null}))};try{(()=>{const t=()=>window.dispatchEvent(new Event(a)),e=history.pushState.bind(history),n=history.replaceState.bind(history);history.pushState=(...n)=>{e(...n),t()},history.replaceState=(...e)=>{n(...e),t()},window.addEventListener("popstate",t)})(),window.addEventListener("click",o,!0),window.addEventListener(a,(()=>{r&&(r=!1,s()&&i())}))}catch(t){console.error(t)}})();