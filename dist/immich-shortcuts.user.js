// ==UserScript==
// @name         immich shortcuts
// @description  keyboard shortcuts for immich
// @grant        GM_addStyle
// @match        http://kisaki:2283/*
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/immich-shortcuts.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/immich-shortcuts.user.js
// @version      1787016436144
// ==/UserScript==
(()=>{"use strict";const t=t=>{const e=document.querySelector(`button[aria-label="${t}"]`);e?.click()},e=e=>{switch(console.log("event",e),e.code){case"Digit1":case"Digit2":case"Digit3":case"Digit4":case"Digit5":return void(async t=>{const e=["/photos/","/search/photos/","/tags/photos/","/albums/"];for(const o of e){if(!window.location.pathname.startsWith(o))continue;const e=window.location.pathname.replace(o,"");await fetch(`/api/assets/${e}`,{method:"PUT",headers:{accept:"application/json","content-type":"application/json"},body:JSON.stringify({rating:t}),signal:AbortSignal.timeout(5e3)});const r=document.querySelector('[data-testid="star-container"]');if(!r)return;const s=r.querySelectorAll("label svg");for(const[e,o]of Array.from(s).entries()){const r=o.querySelector("path");r&&(e<t?(o.setAttribute("stroke","currentcolor"),r.setAttribute("fill","currentcolor")):(o.setAttribute("stroke","#c1cce8"),r.setAttribute("fill","transparent")))}return}})(Number.parseInt(e.code.replace("Digit",""),10))}switch(e.key){case"ㅁ":return void t("View previous asset");case"ㅇ":return void t("View next asset");case"ㄹ":return void t("Favorite")}};(async()=>{try{document.addEventListener("keyup",e,!1)}catch(t){console.error(t)}})()})();