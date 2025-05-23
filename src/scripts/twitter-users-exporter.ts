import { isNotNullable } from '../helpers';

interface User {
	id: string;
	name: string;
	screenName: string;
	profileImageUrl: string;
}

interface FollowingPayload {
	data?: {
		user: {
			result?: {
				timeline: {
					timeline: {
						instructions: Instruction[];
					};
				};
			};
		};
	};
}

interface ListMembersPayload {
	data?: {
		list: {
			members_timeline: {
				timeline: {
					instructions: Instruction[];
				};
			};
		};
	};
}

type Instruction =
	| TimelineAddEntriesInstruction
	| TimelineTerminateTimelineInstruction;

interface TimelineAddEntriesInstruction {
	type: 'TimelineAddEntries';
	entries: TimelineAddEntry[];
}

type Entry = TimelineTimelineItem | TimelineTimelineCursor;

interface TimelineAddEntry {
	content: Entry;
}

interface TimelineTimelineItem {
	entryType: 'TimelineTimelineItem';
	itemContent: {
		user_results: {
			result:
				| {
						__typename: 'User';
						legacy: {
							name: string;
							profile_image_url_https: string;
							screen_name: string;
						};
						rest_id: string;
				  }
				| {
						__typename: 'UserUnavailable';
						message: 'User is suspended';
						reason: 'Suspended';
				  };
		};
	};
}

interface TimelineTimelineCursor {
	entryType: 'TimelineTimelineCursor';
}

interface TimelineTerminateTimelineInstruction {
	direction: 'Top' | 'Bottom';
	type: 'TimelineTerminateTimeline';
}

const isTimelineAddEntriesInstruction = (
	instruction: Instruction
): instruction is TimelineAddEntriesInstruction => {
	return instruction.type === 'TimelineAddEntries';
};

const isTimelineTimelineItem = (
	entry: Entry
): entry is TimelineTimelineItem => {
	return entry.entryType === 'TimelineTimelineItem';
};

const userTable: Record<string, User[]> = {};

const handlePayload = (
	id: string,
	{ data }: FollowingPayload | ListMembersPayload
): void => {
	if (!data) {
		return;
	}

	const getInstructions = (): Instruction[] => {
		if ('user' in data) {
			return data.user.result?.timeline.timeline.instructions ?? [];
		}

		if ('list' in data) {
			return data.list.members_timeline.timeline.instructions ?? [];
		}

		return [];
	};
	const instructions = getInstructions();

	const users = instructions
		.filter(isTimelineAddEntriesInstruction)
		.flatMap((instruction) =>
			instruction.entries
				.map((entry) => entry.content)
				.filter(isTimelineTimelineItem)
				.map((entry) => entry.itemContent.user_results.result)
				.map((result) => {
					if (result.__typename === 'UserUnavailable') {
						return null;
					}
					return {
						id: result.rest_id,
						name: result.legacy.name,
						screenName: result.legacy.screen_name,
						profileImageUrl: result.legacy.profile_image_url_https,
					};
				})
				.filter(isNotNullable)
		);

	if (!userTable[id]) {
		userTable[id] = [];
	}
	userTable[id]!.push(...users);

	if (
		instructions.find(
			(instruction) =>
				instruction.type === 'TimelineTerminateTimeline' &&
				instruction.direction === 'Bottom'
		)
	) {
		exportUsers(id);
	}
};

const exportUsers = (id: string) => {
	const users = userTable[id];
	if (!users) {
		return;
	}

	users.sort((a, b) => {
		if (a.id.length === b.id.length) {
			return a.id.localeCompare(b.id);
		}
		return a.id.length > b.id.length ? 1 : -1;
	});

	const data = {
		id,
		length: users.length,
		users,
	};
	const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
		JSON.stringify(data, null, 2)
	)}\n`;

	const el = document.createElement('a');
	el.href = dataStr;
	el.download = `${id}.json`;
	el.click();
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
			const tokens = ['/Following', '/ListMembers'];
			if (tokens.every((token) => !xhr.responseURL.includes(token))) {
				return;
			}

			const getId = (): string | undefined => {
				if (xhr.responseURL.includes('/Following')) {
					return 'following';
				}

				const url = new URL(xhr.responseURL);
				const search = new URLSearchParams(url.search);
				const variables = search.get('variables');
				if (!variables) {
					return;
				}
				return JSON.parse(variables).listId;
			};
			const id = getId();

			if (!id) {
				console.log(`cannot find id: ${xhr.responseURL}`);
				return;
			}

			const response = JSON.parse(xhr.response);
			handlePayload(id, response);
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
