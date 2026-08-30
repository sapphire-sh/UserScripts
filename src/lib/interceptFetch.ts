const originalFetch = window.fetch;

// fetch has no equivalent of XMLHttpRequest.prototype.send to wrap, so window.fetch itself is
// replaced with a Proxy; the response is cloned before handler sees it so its own body remains
// readable by whichever code originally called fetch
export const interceptFetch = (
	pattern: string | RegExp,
	handler: (response: Response) => void | Promise<void>,
): void => {
	window.fetch = new Proxy(originalFetch, {
		apply: async (target, thisArg, args: Parameters<typeof fetch>) => {
			const promise = Reflect.apply(target, thisArg, args);
			void (async () => {
				const response = await promise;
				const matches = typeof pattern === 'string' ? response.url.includes(pattern) : pattern.test(response.url);
				if (!matches) {
					return;
				}
				await handler(response.clone());
			})();
			return promise;
		},
	});
};
