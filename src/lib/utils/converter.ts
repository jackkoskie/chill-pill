export const intToTime = (time: number) => {
	let hours = Array(24).fill(false);

	for (let i = 23; i >= 0; i--) {
		if (time >= Math.pow(2, i)) {
			hours[i] = true;
			time -= Math.pow(2, i);
		}
	}

	return hours;
};

export const intToDay = (days: number) => {
	// m t w t f  s  s
	// 1 2 4 8 16 32 64

	let data = Array(7).fill(false);

	for (let i = 6; i >= 0; i--) {
		if (days >= Math.pow(2, i)) {
			data[i] = true;
			days -= Math.pow(2, i);
		}
	}

	return data;
};
