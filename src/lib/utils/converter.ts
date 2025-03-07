export const intToTime = (time: number): boolean[] => {
	let hours = Array(24).fill(false);

	for (let i = 23; i >= 0; i--) {
		if (time >= Math.pow(2, i)) {
			hours[i] = true;
			time -= Math.pow(2, i);
		}
	}

	return hours;
};

export const intToDay = (days: number): boolean[] => {
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

export const dayToShortString = (days: boolean[]): string => {
	let str = '';

	if (days[0]) str += 'M';
	if (days[1]) str += 'T';
	if (days[2]) str += 'W';
	if (days[3]) str += 'T';
	if (days[4]) str += 'F';
	if (days[5]) str += 'S';
	if (days[6]) str += 'S';

	return str;
};

export const dayToString = (days: boolean[]): string => {
	let str = '';

	if (days[0] && days[1] && days[2] && days[3] && days[4] && days[5] && days[6]) return 'Everyday';
	if (days[0] && days[1] && days[2] && days[3] && days[4] && !days[5] && !days[6])
		return 'Weekdays';
	if (!days[0] && !days[1] && !days[2] && !days[3] && !days[4] && days[5] && days[6])
		return 'Weekends';

	if (days[0]) str += 'Monday, ';
	if (days[1]) str += 'Tuesday, ';
	if (days[2]) str += 'Wednesday, ';
	if (days[3]) str += 'Thursday, ';
	if (days[4]) str += 'Friday, ';
	if (days[5]) str += 'Saturday, ';
	if (days[6]) str += 'Sunday, ';

	return str.slice(0, -2);
};

export const dayToInt = (days: boolean[]): number => {
	let result = 0;

	for (let i = 0; i < 7; i++) {
		if (days[i]) {
			result += Math.pow(2, i);
		}
	}

	return result;
};

export const timeToString = (time: boolean[]): string => {
	let str = '';

	for (let i = 0; i < 24; i++) {
		if (time[i]) {
			str += `${i.toString().padStart(2, '0')}:00, `;
		}
	}

	return str == '' ? 'Never' : str.slice(0, -2);
};

export const timeToInt = (time: boolean[]): number => {
	let result = 0;

	for (let i = 0; i < 24; i++) {
		if (time[i]) {
			result += Math.pow(2, i);
		}
	}

	return result;
};
