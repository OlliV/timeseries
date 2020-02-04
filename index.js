const splitArray = require('split-array');

/**
 * @param {Array.<Array.<number>>} arr - Array of samples `[[ts1, s1_1, s2_1, s3_1, ...], [ts2, s1_2, s2_2, s3_2, ...]]`
 * @param {number} bucketSize - How many samples are combined
 * @returns {Array.<Array.<number>>}
 */
exports.downsample = function downsample(arr, bucketSize) {
	const buckets = splitArray(arr, bucketSize);

	// Calculate geometric mean of the timestamps
	const timestamps = buckets.map((samples) => {
		const t0 = samples[0][0];
		const prod = samples.reduce((acc, values) => acc * (values[0] - t0), 1);
		return Math.round(t0 + Math.pow(prod, 1 / samples.length));
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
