import { ExpireDictions } from './enums';

export type Expires = ExpireDictions.permanent | number | string;
export interface DataJson<T> {
	value: T;
	[ExpireDictions.expires]?: Expires;
}
// export interface ResData<T> {
// 	value: T | null;
// 	msg?: string;
// }
export interface StorageClass {
	get: <T>(name: string) => T | unknown;
	set: <T>(name: string, value: T, time: Expires) => void;
	remove: (name: string) => void;
	clear: () => void;
}

export interface CookieClass extends StorageClass {
	getToken: <T>(uname: string, reqhead?: any) => T | unknown;
	check: (name: string) => boolean;
	// clear: (name?: string) => void;
}
