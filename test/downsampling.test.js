import { decimate, downsample } from '..';

describe('decimate()', () => {
	test('takes 1 of 10 items', () => {
		const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

		const res = decimate(arr, 10);
		expect(res).toHaveLength(1);
		expect(arr.includes(res[0])).toBeTruthy();
	});

	test('takes 2 of 20 items', () => {
		const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

		const res = decimate(arr, 10);
		expect(res).toHaveLength(2);
		expect(arr.includes(res[0])).toBeTruthy();
		expect(arr.includes(res[1])).toBeTruthy();
		expect(res[0]).not.toBe(res[1]);
	});

	test('takes everything when the factor is zero', () => {
		const arr = [1, 2, 3];

		const res = decimate(arr, 0);
		expect(res).toStrictEqual(arr);
	});

	test('takes everything when the factor is one', () => {
		const arr = [1, 2, 3];

		const res = decimate(arr, 1);
		expect(res).toStrictEqual(arr);
	});
});

describe('downsample()', () => {
	test('passes as is if bucketSize is 1', () => {
		const arr = [[1, 1], [2, 1], [3, 1]];

		const res = downsample(arr, 1);
		expect(res).toStrictEqual(arr);
	});

	test('halves the array size when bucketSize is 2', () => {
		const arr = [[1, 1], [2, 1], [3, 1], [4, 1]];

		const res = downsample(arr, 2);
		expect(res).toHaveLength(2);
	});
});
