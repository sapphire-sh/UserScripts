interface Window {
	GoNext: (value: number) => void;
}

(() => {
	if(document.title === '【とらのあなWebSite】年齢認証') {
		window.GoNext(0);
	}
})();
