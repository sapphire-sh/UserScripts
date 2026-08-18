// ==UserScript==
// @name         fantia actions
// @description  add action buttons to fantia pages
// @grant        none
// @run-at       document-end
// @match        https://fantia.jp/*
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/fantia-actions.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/fantia-actions.user.js
// @version      1787016436144
// ==/UserScript==
(()=>{"use strict";const t=XMLHttpRequest.prototype.send,e=(e,n)=>{XMLHttpRequest.prototype.send=function(s){return this.addEventListener("load",(()=>{200===this.status&&("string"==typeof e?this.responseURL.includes(e):e.test(this.responseURL))&&n(this)})),t.call(this,s)}},n=/\/api\/v1\/posts\/\d+$/,s=async(t,e)=>{const n=(t=>{const e=document.createElement("div");e.setAttribute("style","position:fixed;left:100px;top:100px;");const{id:n,title:s}=t,o=document.createElement("button");return o.textContent="copy",o.onclick=()=>{window.navigator.clipboard.writeText(`${n}_${s}`)},e.appendChild(o),e})({id:t,title:e});document.documentElement.appendChild(n)};try{e(/\/api\/v1\/posts\//,(t=>{const e=JSON.parse(t.response).post,{id:n}=e,{title:o}=e;s(n,o)})),window.fetch=new Proxy(window.fetch,{apply:async(t,e,o)=>{const i=t.apply(e,o);return(async()=>{const t=await i;if(!n.test(t.url))return;const{post:{id:e,title:o}}=await t.clone().json();s(e,o)})(),i}})}catch(t){console.error(t)}})();