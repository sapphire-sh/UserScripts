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
		window.navigator.clipboard.writeText(`${id}_${title}`);
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
	// @ts-ignore
	window.XMLHttpRequest = function () {
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
			const id = response.id;
			const title = response.title;
			attach(id, title);
		};
		xhr.addEventListener('readystatechange', handleReadyStateChange, false);
		return xhr;
	};
};

(async () => {
	try {
		main();
	} catch (error) {
		console.error(error);
	}
})();

export {};
