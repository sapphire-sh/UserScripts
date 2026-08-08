declare const PROCESSED_ATTR = "data-view-quotes";
declare const STATUS_PATTERN: RegExp;
declare const getPageStatusPath: () => string | null;
declare const getArticleStatusPath: (article: HTMLElement) => string | null;
declare const createLinkWrapper: (statusPath: string) => HTMLElement;
declare const processArticle: (article: HTMLElement) => void;
declare const scan: () => void;
declare const observer: MutationObserver;
//# sourceMappingURL=twitter-quote-linker.d.ts.map