export interface Timer {
	hour: string;
	minute: string;
	second: string;
}

export const limits: Record<string, number> = {
	hour: 23,
	minute: 59,
	second: 59
};


