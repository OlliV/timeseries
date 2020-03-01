// The MIT License (MIT)
//
// Copyright (c) 2019 Olli Vanhoja <olli.vanhoja@gmail.com>
// Copyright (c) Arthur Verschaeve <contact@arthurverschaeve.be> (arthurverschaeve.be)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * Split array into arrays of n items.
 * @param {Array<any>} arr - is the input array.
 * @param {number} maxLength - is the maximum length of a subarray.
 */
export function splitNItems(arr, maxLength) {
	if (!Array.isArray(arr)) {
		throw new TypeError('Expected an array to split');
	}

	if (typeof maxLength !== 'number') {
		throw new TypeError('Expected a number of groups to split the array in');
	}

	const result = [];
	let part = [];

	for (var i = 0; i < arr.length; i++) {
		part.push(arr[i]);

		// check if we reached the maximum amount of items in a partial
		// or just if we reached the last item
		if (part.length === maxLength || i === arr.length - 1) {
			result.push(part);
			part = [];
		}
	}

	return result;
}

/**
 * Split array into a fixed number of buckets.
 * @param {Array<any>} arr - is the input array.
 * @param {number} n - is the number of buckets.
 * @returns {Array<Array<any>>}
 */
export function splitNBuckets(arr, n) {
	if (!Array.isArray(arr)) {
		throw new TypeError('Expected an array to split');
	}

	if (typeof n !== 'number') {
		throw new TypeError('Expected a number of groups to split the array in');
	}

	if (n <= 0) {
		return undefined;
	}

	const buckets = Array.from(Array(n)).map(() => []);

	arr.forEach((x, i) => buckets[i % n].push(x));

	return buckets;
}

/**
 * Decimate an array.
 * @param {Array<any>} arr - is n array.
 * @param {number} decimateFactor - is the decimate factor.
 * @returns {Array<Array<any>>}
 */
export function decimate(arr, decimateFactor) {
	if (!Array.isArray(arr)) {
		throw new TypeError('Expected an array');
	}

	return arr.filter((_v, i) => !(i % decimateFactor));
}

/**
 * Downsample an array of numbers.
 * @param {Array.<Array.<number>>} arr - is an array of numeric samples `[[ts1, s1_1, s2_1, s3_1, ...], [ts2, s1_2, s2_2, s3_2, ...]]`
 * @param {number} bucketSize - is the number of samples to be combined.
 * @returns {Array.<Array.<number>>}
 */
export function downsample(arr, bucketSize) {
	const buckets = splitNItems(arr, bucketSize);

	// Calculate geometric mean of the timestamps
	const timestamps = buckets.map((samples) => {
		const t0 = samples[0][0];
		const prod = samples.reduce((acc, values) => acc * (values[0] - t0 + 1), 1);
		return Math.round(t0 + Math.pow(prod, 1 / samples.length) - 1);
	});

	const res = buckets.map((samples) => samples.reduce((avgs, values, _, { length }) => {
		return avgs.map((avg, i) => avg + values[i] / length);
	}, Array(arr[0].length).fill(0)));

	// Replace the timestamps with proper geometric means
	for (let i = 0; i < res.length; i++) {
		res[i][0] = timestamps[i];
	}

	return res;
}
