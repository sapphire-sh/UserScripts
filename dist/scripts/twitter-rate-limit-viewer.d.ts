declare const DISPLAY_ID = "rate-limit-viewer";
declare const DISPLAY_POSITION_KEY = "rate-limit-viewer-position";
interface RateLimitStatus {
    url: string;
    rateLimitLimit: number;
    rateLimitRemaining: number;
    rateLimitReset: number;
    updatedAt: number;
}
declare const statusTable: Record<string, RateLimitStatus>;
declare const handleStatus: (status: RateLimitStatus) => void;
declare const FONT_FAMILY = "\"TwitterChirp\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif";
declare let dragging: boolean;
declare let offsetX: number;
declare let offsetY: number;
declare const attachDisplay: () => Promise<HTMLElement>;
declare const TIME_UNITS: readonly [{
    readonly amount: 60;
    readonly name: "seconds";
}, {
    readonly amount: 60;
    readonly name: "minutes";
}, {
    readonly amount: 24;
    readonly name: "hours";
}, {
    readonly amount: 7;
    readonly name: "days";
}, {
    readonly amount: number;
    readonly name: "weeks";
}, {
    readonly amount: 12;
    readonly name: "months";
}, {
    readonly amount: number;
    readonly name: "years";
}];
declare const formatTime: (a: number, b: number) => string | undefined;
declare const getColor: (a: number, b: number) => "#1f7f3f" | "#ffbf00" | "#ff3f3f";
declare const updateDisplay: (el: HTMLElement) => void;
declare const sleep: (ms: number) => Promise<unknown>;
declare const REGEX_GRAPHQL_URL: RegExp;
declare const main: () => Promise<never>;
//# sourceMappingURL=twitter-rate-limit-viewer.d.ts.map