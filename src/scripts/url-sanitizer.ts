type WebsiteKeys = (
	| 'pixiv'
	| 'twitter'
	| 'melonbooks'
	| 'toranoana'
);

function isWebsiteKey(key: string): key is WebsiteKeys {
	if(key === 'pixiv') {
		return true;
	}
	if(key === 'twitter') {
		return true;
	}
	if(key === 'melonbooks') {
		return true;
	}
	if(key === 'toranoana') {
		return true;
	}
	return false;
}

type RegularExpressions = {
	[T in WebsiteKeys]: RegExp;
};

function getSanitizedURL(key: WebsiteKeys, match: RegExpMatchArray) {
	if(key === 'twitter') {
		const screenName = match[1];
		const tweetID = match[2];
		return `https://twitter.com/${screenName}/status/${tweetID}`;
	}
	const baseURL = match[1];
	const originalQuery = match[2].split('&').map((e) => {
		const x = e.split('=');
		return {
			[x[0]]: x[1],
		};
	}).reduce((a, b) => {
		return Object.assign(a, b);
	});

	let query = '';
	switch(key) {
	case 'pixiv':
		query = `?${Object.keys(originalQuery).map((e) => {
			return `${e}=${originalQuery[e]}`;
		}).join('&')}`;
		break;
	case 'melonbooks':
		query = `?product_id=${originalQuery.product_id}`;
		break;
	}

	return `${baseURL}${query}`;
}

const regularExpressions: RegularExpressions = {
	'pixiv': /^(https:\/\/www.pixiv.net\/member_illust.php)\?(.+)#?/,
	'toranoana': /^(https?:\/\/www.toranoana.jp\/mailorder\/article\/.+)\?(.+)#?/,
	'melonbooks': /^(https:\/\/www.melonbooks.co.jp\/detail\/detail.php)\?(.+)#?/,
	'twitter': /^https:\/\/twitter.com\/(.+)\/status\/(.+)\/(.+)\/1$/,
};

(() => {
	for(const key in regularExpressions) {
		if(isWebsiteKey(key)) {
			const regularExpression = regularExpressions[key];
			const match = window.location.href.match(regularExpression);
			if(match === null) {
				continue;
			}
			const url = getSanitizedURL(key, match);
			if(url === null) {
				continue;
			}
			window.history.pushState(window.location.href, '', url);
		}
	}
})();
