import { interceptXHR } from '@sapphire-sh/utils';

const POST_API_PATTERN = /\/api\/v1\/posts\/\d+$/;

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
	interceptXHR(/\/api\/v1\/posts\//, (xhr) => {
		const response = JSON.parse(xhr.response).post;
		const { id } = response;
		const { title } = response;
		void attach(id, title);
	});

	window.fetch = new Proxy(window.fetch, {
		apply: async (target, that, args: Parameters<typeof fetch>) => {
			const promise = target.apply(that, args);
			void (async () => {
				const res = await promise;
				if (!POST_API_PATTERN.test(res.url)) {
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

try {
	main();
} catch (error) {
	console.error(error);
}
