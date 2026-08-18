// ==UserScript==
// @name         misskey restore native navigation
// @description  restore browser default navigation behaviours (modifier click, history swipe) on misskey
// @grant        GM_addStyle
// @match        https://misskey.io/*
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/misskey-restore-native-navigation.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/misskey-restore-native-navigation.user.js
// @version      1787019339979
// ==/UserScript==
(()=>{"use strict";const e=e=>{if(0!==e.button)return;if(!(e=>e.shiftKey||e.metaKey||e.ctrlKey)(e))return;const t=(n=e.target)instanceof Element?n.closest("a[href]"):null;var n;if(!t)return;const{href:r}=t;r&&(e.stopImmediatePropagation(),e.preventDefault(),window.open(r,"_blank"))};(()=>{try{window.addEventListener("click",e,!0)}catch(e){console.error(e)}})(),GM_addStyle("\nhtml, body, #misskey_app, ._pageContainer, ._pageScrollable, ._pageScrollableReversed {\n\toverscroll-behavior-x: auto !important;\n}\n")})();