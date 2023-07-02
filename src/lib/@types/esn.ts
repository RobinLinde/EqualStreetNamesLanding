export interface CitiesFile {
	[country: string]: {
		[city: string]: City;
	};
}

interface City {
	name: string;
	url: string;
}
