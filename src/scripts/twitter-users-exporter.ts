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
		user_results:
			| {
					result:
						| {
								__typename: 'User';
								legacy?: {
									name: string;
									profile_image_url_https: string;
									screen_name: string;
								};
								rest_id: string;
								avatar?: {
									image_url: string;
								};
								core?: {
									created_at: string;
									name: string;
									screen_name: string;
								};
						  }
						| {
								__typename: 'UserUnavailable';
								message: 'User is suspended';
								reason: 'Suspended';
						  };
			  }
			| {};
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
				.map((entry) => {
					if (!('result' in entry.itemContent.user_results)) {
						return null;
					}
					return entry.itemContent.user_results.result;
				})
				.filter(isNotNullable)
				.map((result) => {
					if (result.__typename === 'UserUnavailable') {
						return null;
					}
					return {
						id: result.rest_id,
						name: result.legacy?.name ?? result.core?.name ?? '',
						screenName:
							result.legacy?.screen_name ?? result.core?.screen_name ?? '',
						profileImageUrl:
							result.legacy?.profile_image_url_https ??
							result.avatar?.image_url ??
							'',
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

const getFilename = (id: string): string => {
	const now = Date.now();

	const tokens = ['following_', 'followers_'];
	if (tokens.some((token) => id.startsWith(token))) {
		return `${id}_${now}.json`;
	}

	return `${id}.json`;
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
	el.download = getFilename(id);
	el.click();
};

enum ResponseType {
	FOLLOWERS = '/Followers',
	FOLLOWING = '/Following',
	LIST_MEMBERS = '/ListMembers',
}

const shouldExport = (responseUrl: string): boolean => {
	for (const responseType of Object.values(ResponseType)) {
		if (responseUrl.includes(responseType)) {
			return true;
		}
	}
	return false;
};

const getId = (responseUrl: string): string | null => {
	const url = new URL(responseUrl);
	const search = new URLSearchParams(url.search);
	const variables = search.get('variables');
	if (!variables) {
		return null;
	}

	const { listId, userId } = JSON.parse(variables);

	if (responseUrl.includes('/Following')) {
		return `following_${userId}`;
	}
	if (responseUrl.includes('/Followers')) {
		return `followers_${userId}`;
	}

	return listId;
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
			if (!shouldExport(xhr.responseURL)) {
				return;
			}

			const id = getId(xhr.responseURL);
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
