(() => {
	GM_addStyle('#stream-items-id > li[data-suggestion-json^=\'{"suggestion_details":{"suggestion_type":\'] { display: none; }');
	GM_addStyle('#stream-items-id > li[data-item-type="recap_entry"] { display: none; }');
})();
