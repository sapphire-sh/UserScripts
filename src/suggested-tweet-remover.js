// ==UserScript==
// @name         Suggested Tweet Remover
// @namespace    https://www.sapphire.sh/
// @version      1.0
// @description  Removes suggested tweets
// @author       sapphire
// @match        https://twitter.com/*
// @downloadURL  https://raw.githubusercontent.com/sapphiredev/UserScripts/master/src/suggested-tweet-remover.js
// @grant        document-start
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle('#stream-items-id > li[data-suggestion-json^=\'{"suggestion_details":{"suggestion_type":\'] { display: none; }');
    GM_addStyle('#stream-items-id > li[data-item-type="recap_entry"] { display: none; }');
})();
