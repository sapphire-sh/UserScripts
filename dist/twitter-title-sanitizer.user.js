// ==UserScript==
// @name         twitter title sanitizer
// @description  remove the unread notification count prefix from the page title
// @grant        none
// @match        https://twitter.com/*
// @match        https://mobile.twitter.com/*
// @match        https://x.com/*
// @match        https://mobile.x.com/*
// @namespace    https://www.sapphire.sh/
// @author       sapphire
// @downloadURL  https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-title-sanitizer.user.js
// @updateURL    https://github.com/sapphire-sh/UserScripts/raw/release/dist/twitter-title-sanitizer.user.js
// @version      1787029191810
// ==/UserScript==
(()=>{"use strict";const e=/^\(\d+\+?\)\s*/,t=()=>{const t=document.title.replace(e,"");t!==document.title&&(document.title=t)};"undefined"!=typeof document&&(new MutationObserver((()=>{t()})).observe(document.head,{childList:!0,subtree:!0,characterData:!0}),t())})();