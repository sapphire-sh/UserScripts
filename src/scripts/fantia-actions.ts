interface Params {
	id: number;
	title: string;
}

const generateButtons = (params: Params): HTMLDivElement => {
	const div = document.createElement('div');
	div.setAttribute('style', 'position:fixed;left:100px;top:100px;');

	const { id, title } = params;

	const button = document.createElement('button');
	button.textContent = 'copy';
	button.onclick = () => {
		void window.navigator.clipboard.writeText(`${id}_${title}`);
	};
	div.appendChild(button);

	return div;
};

const attach = async (id: number, title: string) => {
	const buttons = generateButtons({ id, title });
	document.documentElement.appendChild(buttons);
};

const main = () => {
	const XHR = window.XMLHttpRequest;
	// @ts-expect-error XMLHttpRequest constructor override
	window.XMLHttpRequest = () => {
		const xhr = new XHR();
		const handleReadyStateChange = () => {
			if (xhr.readyState !== 4) {
				return;
			}

			if (xhr.status !== 200) {
				return;
			}
			if (xhr.responseURL.match(/\/api\/v1\/posts\//) === null) {
				return;
			}
			const response = JSON.parse(xhr.response).post;
			const {id} = response;
			const {title} = response;
			void attach(id, title);
		};
		xhr.addEventListener('readystatechange', handleReadyStateChange, false);
		return xhr;
	};

	window.fetch = new Proxy(window.fetch, {
		apply: async (target, that, args: Parameters<typeof fetch>) => {
			const promise = target.apply(that, args);
			void (async () => {
				const res = await promise;
				if (res.url.match(/\/api\/v1\/posts\/\d+$/) === null) {
					return;
				}
				const {
					post: { id, title },
				} = await res.clone().json();
				void attach(id, title);
			})();
			return promise;
		},
	});
};

void (async () => {
	try {
		main();
	} catch (error) {
		console.error(error);
	}
})();

export {};
