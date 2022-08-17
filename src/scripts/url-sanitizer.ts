enum WebsiteKeys {
	TWITTER = 'twitter',
	PIXIV = 'pixiv',
	PIXIV_FANBOX = 'pixiv_fanbox',
	MELONBOOKS = 'melonbooks',
	TORANOANA = 'toranoana',
}

type RegularExpressions = {
	[T in WebsiteKeys]: RegExp;
};

interface Query {
	[key: string]: string;
}

function parseQuery(text: string): Query {
	const entries = text.split('&').map((e) => e.split('='));
	return Object.fromEntries(entries);
}

function stringifyQuery(query: Query): string {
	return Object.keys(query)
		.map((e) => `${e}=${query[e]}`)
		.join('&');
}

function processQuery(key: WebsiteKeys, text?: string) {
	switch (key) {
		case WebsiteKeys.PIXIV: {
			if (!text) {
				throw new Error('text not found');
			}
			const query = parseQuery(text);
			return `?${stringifyQuery(query)}`;
		}
		case WebsiteKeys.PIXIV_FANBOX: {
			return '';
		}
		case WebsiteKeys.MELONBOOKS: {
			if (!text) {
				throw new Error('text not found');
			}
			const query = parseQuery(text);
			return `?product_id=${query.product_id}`;
		}
	}
}

function getSanitizedURL(key: WebsiteKeys, match: RegExpMatchArray) {
	if (key === WebsiteKeys.TWITTER) {
		const screenName = match[1];
		const tweetID = match[2];
		return `https://twitter.com/${screenName}/status/${tweetID}`;
	}
	const baseURL = match[1];
	const query = processQuery(key, match[2]);
	return `${baseURL}${query}`;
}

const regularExpressions: RegularExpressions = {
	[WebsiteKeys.TWITTER]: /^https:\/\/(?:.+\.)?twitter.com\/(.+)\/status\/(\d+)/,
	[WebsiteKeys.PIXIV]: /^(https:\/\/www.pixiv.net\/member_illust.php)\?(.+)#?/,
	[WebsiteKeys.PIXIV_FANBOX]: /^(https:\/\/\w+.fanbox.cc\/posts\/\d+)\?(.+)/,
	[WebsiteKeys.TORANOANA]: /^(https?:\/\/www.toranoana.jp\/mailorder\/article\/.+)\?(.+)#?/,
	[WebsiteKeys.MELONBOOKS]: /^(https:\/\/www.melonbooks.co.jp\/detail\/detail.php)\?(.+)#?/,
};

(() => {
	Object.values(WebsiteKeys).forEach((key: WebsiteKeys) => {
		const regularExpression = regularExpressions[key];
		const match = window.location.href.match(regularExpression);
		if (match === null) {
			return;
		}
		const url = getSanitizedURL(key, match);
		if (url === null) {
			return;
		}
		window.history.pushState(window.location.href, '', url);
	});
})();

export {};
