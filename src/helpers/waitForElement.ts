import { sleep } from '@sapphire-sh/utils';
import { isNotNullable } from './isNotNullable';

export const waitForElement = async (selector: string) => {
	while (true) {
		const e = document.querySelectorAll(selector);
		if (e.length > 0) {
			return e;
		}
		await sleep(100);
	}
};

export const waitForElements = async <T extends HTMLElement>(
	selector: string | string[],
	options?: {
		parent?: HTMLElement;
		timeout?: number;
	}
): Promise<T[] | null> => {
	const { parent, timeout = 10000 } = options ?? {};

	const root = parent ?? document;

	let elapsedTime = 0;
	let intervalTime = 100;

	while (true) {
		if (elapsedTime >= timeout) {
			return null;
		}

		const selectors = Array.isArray(selector) ? selector : [selector];
		for (const selector of selectors) {
			const elements = root.querySelectorAll(selector);
			if (elements.length > 0) {
				return Array.from(elements)
					.map((element) => {
						return element instanceof HTMLElement ? element : null;
					})
					.filter(isNotNullable) as T[];
			}
			await sleep(intervalTime);
			elapsedTime += intervalTime;
		}
	}
};
