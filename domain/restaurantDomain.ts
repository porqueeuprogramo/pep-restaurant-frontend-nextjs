export type Restaurant = {
	uid: string;
	name: string;
	hereId: string;
	location: Location;
	capacity: number;
	menu: Menu;
	schedule: Schedule;
};

export type Schedule = {
	[dayOfWeek: string]: ScheduleTime[];
};

export type ScheduleTime = {
	startTime: string;
	endTime: string;
};

export type Menu = {
	language: string;
};

export type Location = {
	address: Address;
	locationCoordinate: LocationCoordinate;
};

export type Address = {
	name: string;
	postalCode: string;
	city: string;
	country: string;
};

export type LocationCoordinate = {
	latitude: number;
	longitude: number;
};
