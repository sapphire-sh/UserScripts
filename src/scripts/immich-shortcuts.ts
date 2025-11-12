const handleKeyUp = (event: KeyboardEvent) => {
	console.log('event', event);
};

const main = () => {
	document.addEventListener('keyup', handleKeyUp, false);
};

(async () => {
	try {
		main();
	} catch (error) {
		console.error(error);
	}
})();

export {};
