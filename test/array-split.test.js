import { splitNItems, splitNBuckets } from "..";

describe('splitNItems()', () => {
	test('works with an empty array', () => {
		const arr = [];

		const res = splitNItems(arr, 5);
		expect(res).toStrictEqual([]);
	});

	test('split into arrays of 1 item', () => {
		const arr = [1, 2, 3];

		const res = splitNItems(arr, 1);
		expect(res).toStrictEqual([[1],[2],[3]]);
	});

	test('split into 0 item arrays should enclose the array into a single array', () => {
		const arr = [[], [], []];

		const res = splitNItems(arr, 0);
		expect(res).toStrictEqual([[[], [], []]]);
	});
});

describe('splitNBuckets()', () => {
	test('works with an empty array', () => {
		const arr = [];

		const res = splitNBuckets(arr, 3);
		expect(res).toStrictEqual([[],[],[]]);
	});

	test('split 1 item into 0 arrays', () => {
		const arr = [1];

		const res = splitNBuckets(arr, 0);
		expect(res).toBe(undefined);
	});

	test('split 1 item into 1 array', () => {
		const arr = [1];

		const res = splitNBuckets(arr, 1);
		expect(res).toStrictEqual([[1]]);
	});

	test('split 1 item into 3 arrays', () => {
		const arr = [1];

		const res = splitNBuckets(arr, 3);
		expect(res).toStrictEqual([[1], [], []]);
	});

	test('split 2 items into 3 arrays', () => {
		const arr = [1, 2];

		const res = splitNBuckets(arr, 3);
		expect(res).toStrictEqual([[1], [2], []]);
	});

	test('split 3 items into 3 arrays', () => {
		const arr = [1, 2, 3];

		const res = splitNBuckets(arr, 3);
		expect(res).toStrictEqual([[1], [2], [3]]);
	});

	test('split 6 items into 3 arrays', () => {
		const arr = [1, 2, 3, 4, 5, 6];

		const res = splitNBuckets(arr, 3);
		expect(res).toStrictEqual([[1, 4], [2, 5], [3, 6]]);
	});
});
