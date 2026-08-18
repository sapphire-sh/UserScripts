// ==UserScript==
// @name         twitter username sanitizer
// @description  sanitize username when copying from tweet detail pages
// @grant        none
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-username-sanitizer.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-username-sanitizer.user.js
// @version      1787016436144
// ==/UserScript==
(()=>{"use strict";const e=/\/[^/]+\/status\/\d+/;"undefined"!=typeof document&&document.addEventListener("copy",(t=>{if(!e.test(window.location.pathname))return;const n=window.getSelection();if(null===n)return;const r=(e=>{if(0===e.rangeCount)return null;const t=e.getRangeAt(0),n=Array.from(document.querySelectorAll('div[data-testid="User-Name"]'));for(const e of n){const n=e.querySelector('a[role="link"] span span');if(null===n)continue;const r=document.createRange();if(r.selectNodeContents(n),t.compareBoundaryPoints(Range.END_TO_START,r)>=0||t.compareBoundaryPoints(Range.START_TO_END,r)<=0)continue;const a=document.createRange();return t.compareBoundaryPoints(Range.START_TO_START,r)>=0?a.setStart(t.startContainer,t.startOffset):a.setStart(r.startContainer,r.startOffset),t.compareBoundaryPoints(Range.END_TO_END,r)<=0?a.setEnd(t.endContainer,t.endOffset):a.setEnd(r.endContainer,r.endOffset),a.toString()}return null})(n);if(null===r)return;const a=(e=>(e=>e.replace(/[@＠/|(（・].*$/,"").trim())((e=>e.replace(/[\u{10000}-\u{10FFFF}]/gu,"").trim())((e=>e.normalize("NFKC"))((e=>e.replace(/\p{Extended_Pictographic}/gu,"").replace(/\u200D/g,"").replace(/\uFE0F/g,"").replace(/\uFE0E/g,"").trim().replace(/\s+/g," "))(e)))))(r);0!==a.length&&(t.preventDefault(),t.clipboardData?.setData("text/plain",a))}))})();