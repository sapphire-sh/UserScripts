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

const parseQuery = (text: string): Query => {
	const entries = text.split('&').map((e) => e.split('='));
	return Object.fromEntries(entries);
};

const stringifyQuery = (query: Query): string => {
	return Object.keys(query)
		.map((e) => `${e}=${query[e]}`)
		.join('&');
};

const processQuery = (key: Exclude<WebsiteKeys, WebsiteKeys.TWITTER>, text?: string): string => {
	switch (key) {
		case WebsiteKeys.PIXIV: {
			if (!text) {
				throw new Error('text not found');
			}
			const query = parseQuery(text);
			return `?${stringifyQuery(query)}`;
		}
		case WebsiteKeys.PIXIV_FANBOX:
		case WebsiteKeys.TORANOANA: {
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
};

const getSanitizedURL = (key: WebsiteKeys, match: RegExpMatchArray): string => {
	if (key === WebsiteKeys.TWITTER) {
		const screenName = match[1];
		const tweetID = match[2];
		return `https://twitter.com/${screenName}/status/${tweetID}`;
	}
	const baseURL = match[1];
	const query = processQuery(key, match[2]);
	return `${baseURL}${query}`;
};

const regularExpressions: RegularExpressions = {
	[WebsiteKeys.TWITTER]: /^https:\/\/(?:.+\.)?twitter.com\/(.+)\/status\/(\d+)/,
	[WebsiteKeys.PIXIV]: /^(https:\/\/www.pixiv.net\/member_illust.php)\?(.+)#?/,
	[WebsiteKeys.PIXIV_FANBOX]: /^(https:\/\/\w+.fanbox.cc\/posts\/\d+)\?(.+)/,
	[WebsiteKeys.TORANOANA]: /^(https?:\/\/www.toranoana.jp\/mailorder\/article\/.+)\?(.+)#?/,
	[WebsiteKeys.MELONBOOKS]: /^(https:\/\/www.melonbooks.co.jp\/detail\/detail.php)\?(.+)#?/,
};

const main = () => {
	const keys = Object.values(WebsiteKeys);
	for (const key of keys) {
		const regularExpression = regularExpressions[key];
		const match = window.location.href.match(regularExpression);
		if (match === null) {
			continue;
		}
		const url = getSanitizedURL(key, match);
		if (url === null) {
			continue;
		}
		window.history.pushState(window.location.href, '', url);
	}
};

(async () => {
	try {
		main();
	} catch (error) {
		console.error(error);
	}
})();

export {};
