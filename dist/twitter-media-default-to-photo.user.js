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
// @version      1787016436144
// ==/UserScript==
(()=>{"use strict";XMLHttpRequest.prototype.send;const t=async(t,e=0)=>{const n=t+Math.random()*e;return new Promise((t=>globalThis.setTimeout(t,n)))},e=async(e,n)=>{const r=n?.parent??document;return(async(e,n)=>{const{timeout:r=1e4,jitter:o=0}=n??{};let i=0;for(;;){const n=e();if(null!==n)return n;if(i>=r)return null;await t(100,o),i+=100}})((()=>r.querySelector(e)),n)},n=/^\/\w{1,15}\/media\/?$/,r="filter",o="locationchange";let i=!1;const a=t=>{if(0!==t.button)return;if((t=>t.shiftKey||t.metaKey||t.ctrlKey||t.altKey)(t))return;const{target:e}=t;e instanceof Element&&null!==e.closest('a[role="tab"][href$="/media"]')&&(i=!0)};try{(()=>{const t=()=>window.dispatchEvent(new Event(o)),e=history.pushState.bind(history),n=history.replaceState.bind(history);history.pushState=(...n)=>{e(...n),t()},history.replaceState=(...e)=>{n(...e),t()},window.addEventListener("popstate",t)})(),window.addEventListener("click",a,!0),window.addEventListener(o,(()=>{i&&(i=!1,(()=>{const t=new URL(window.location.href);return!!n.test(t.pathname)&&!t.searchParams.has(r)})()&&(async()=>{const t=await e('a[role="tab"][aria-haspopup="menu"]',{timeout:2048});if(null===t)return;t.click();const n=await e('[role="menu"]',{timeout:2048});if(null===n)return;const o=(t=>{const e=Array.from(t.querySelectorAll('[role="menuitem"], a'));for(const t of e){if(!0===t.getAttribute("href")?.includes(`${r}=photo`))return t;if("Photos"===t.textContent.trim())return t}return null})(n);null!==o&&o.click()})())}))}catch(t){console.error(t)}})();