import { waitForElement } from '@sapphire-sh/utils/browser';
import { interceptFetch } from '../lib/interceptFetch';

const NOTIFICATION_COUNT_PATTERN = /^\(\d+\+?\)\s*/;

const MAX_NOTE_TEXT_LENGTH = 64;

interface Note {
	user: {
		name: string | null;
		username: string;
	};
	text: string | null;
}

export const stripNotificationCount = (title: string): string => title.replace(NOTIFICATION_COUNT_PATTERN, '');

export const formatNoteTitlePrefix = (note: Note): string => {
	const name = note.user.name ?? note.user.username;
	const text = (note.text ?? '').replace(/\r\n|\r|\n/g, ' ');

	const codePoints = Array.from(text);
	if (codePoints.length <= MAX_NOTE_TEXT_LENGTH) {
		return `${name}: "${text}"`;
	}

	return `${name}: "${codePoints.slice(0, MAX_NOTE_TEXT_LENGTH).join('')}…"`;
};

export const getInstanceName = (title: string): string | null => {
	const index = title.lastIndexOf(' | ');
	if (index === -1) {
		return null;
	}

	return title.slice(index + ' | '.length);
};

export const getNoteId = (pathname: string): string | null => {
	const match = /^\/notes\/([^/]+)/.exec(pathname);
	if (match === null) {
		return null;
	}

	const [, noteId] = match;
	return noteId;
};

const noteTitlePrefixes = new Map<string, string>();

const isNote = (value: unknown): value is Note => {
	if (typeof value !== 'object' || value === null || !('user' in value) || !('text' in value)) {
		return false;
	}

	const { user, text } = value;
	if (text !== null && typeof text !== 'string') {
		return false;
	}
	if (typeof user !== 'object' || user === null || !('name' in user) || !('username' in user)) {
		return false;
	}

	const { name, username } = user;
	return (name === null || typeof name === 'string') && typeof username === 'string';
};

const observeTitle = (handler: () => void): void => {
	const start = () => {
		const observer = new MutationObserver(() => {
			handler();
		});

		observer.observe(document.head, {
			childList: true,
			subtree: true,
			characterData: true,
		});

		handler();
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', start);
		return;
	}

	start();
};

const getTableEl = async () => {
	const el = await waitForElement('.item-detail.__light table');
	if (el === null) {
		console.error('waitForElement: table not found');
	}
	return el;
};

const getFieldByLabel = (tableEl: Element, label: string): string | null => {
	const tableRowEls = Array.from(tableEl.querySelectorAll('tr'));

	for (const tableRowEl of tableRowEls) {
		if (tableRowEl.querySelector('th')?.textContent !== label) {
			continue;
		}

		return tableRowEl.querySelector('a')?.textContent ?? null;
	}

	return null;
};

const rewritePixivTitle = async () => {
	const titleEl = await waitForElement('figcaption h1');
	if (titleEl === null) {
		console.error('waitForElement: figcaption h1 not found');
	}

	const authorEl = await waitForElement('a[href^="/users/"] + div > a');
	if (authorEl === null) {
		console.error('waitForElement: author link not found');
	}

	if (titleEl === null || authorEl === null) {
		return;
	}

	document.title = `${authorEl.innerText} - ${titleEl.innerText}`;
};

const rewriteMelonbooksTitle = async () => {
	const tableEl = await getTableEl();
	if (tableEl === null) {
		return;
	}

	const circleName = getFieldByLabel(tableEl, 'サークル名');
	const artistName = getFieldByLabel(tableEl, '作家名');

	const text = [artistName, circleName].filter((x) => x !== null && x !== '').join(' - ');

	document.title = `${text} - ${document.title}`;
};

const rewriteTwitterTitle = () => {
	const sanitized = stripNotificationCount(document.title);
	if (sanitized === document.title) {
		return;
	}

	document.title = sanitized;
};

const rewriteMisskeyTitle = () => {
	const noteId = getNoteId(location.pathname);
	if (noteId === null) {
		return;
	}

	const prefix = noteTitlePrefixes.get(noteId);
	if (prefix === undefined) {
		return;
	}

	const instanceName = getInstanceName(document.title);
	if (instanceName === null) {
		return;
	}

	const title = `${prefix} | ${instanceName}`;
	if (title === document.title) {
		return;
	}

	document.title = title;
};

const main = async () => {
	switch (location.hostname) {
		case 'misskey.io': {
			interceptFetch('/api/notes/show', async (response) => {
				const body: unknown = await response.json();
				if (!isNote(body) || !('id' in body) || typeof body.id !== 'string') {
					return;
				}

				noteTitlePrefixes.set(body.id, formatNoteTitlePrefix(body));
				rewriteMisskeyTitle();
			});
			observeTitle(rewriteMisskeyTitle);
			return;
		}
		case 'www.pixiv.net': {
			await rewritePixivTitle();
			return;
		}
		case 'www.melonbooks.co.jp': {
			await rewriteMelonbooksTitle();
			return;
		}
		case 'twitter.com':
		case 'mobile.twitter.com':
		case 'x.com':
		case 'mobile.x.com': {
			observeTitle(rewriteTwitterTitle);
			return;
		}
	}
};

if (typeof document !== 'undefined') {
	void (async () => {
		try {
			await main();
		} catch (error) {
			console.error(error);
		}
	})();
}
