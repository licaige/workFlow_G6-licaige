import { StorageClass, CookieClass, Expires, DataJson } from './types';
import { ExpireDictions } from './enums';

// 时间戳转换方法
export function stampTime(str: string | number): number {
	// if (str === 'permanent') return 'permanent';
	let timestamp: number;
	if (typeof str === 'string') {
		let str_n = +str.substring(0, str.length - 1);
		let str_t = str.substring(str.length - 1, str.length);
		switch (str_t) {
			case 's':
				timestamp = str_n * 1000;
				break;
			case 'h':
				timestamp = str_n * 60 * 60 * 1000;
				break;
			case 'd':
				timestamp = str_n * 24 * 60 * 60 * 1000;
				break;
			case 'm':
				timestamp = str_n * 30 * 24 * 60 * 60 * 1000;
				break;
			case 'y':
				timestamp = str_n * 365 * 24 * 60 * 60 * 1000;
				break;
			default:
				timestamp = str_n * 60 * 60 * 1000;
		}
	} else {
		timestamp = str * 1000;
	}
	return timestamp;
}

// Cookie方法集合
class CookiesFn implements CookieClass {
	// 获取cookie
	get<T>(name: string) {
		let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
		let arr = document.cookie.match(reg);
		try {
			if (arr && arr.length >= 3) return JSON.parse(decodeURIComponent(arr[2] as string));
			throw new Error(`无效的cookie,${name}的值不存在!`);
		} catch (error: any) {
			console.error(error);
			return null;
		}
	}
	// 获取含token的cookie
	getToken<T>(uname: string, reqhead?: any): T | unknown {
		let name = uname + '=';
		let decodedCookie;
		if (typeof window === 'undefined') {
			decodedCookie = decodeURIComponent(reqhead.cookie);
		} else {
			decodedCookie = decodeURIComponent(document.cookie);
		}

		let deCookies = decodedCookie.split(';');
		for (let i = 0; i < deCookies.length; i++) {
			let c = deCookies[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return null;
	}

	// 设置cookie
	set<T>(name: string, value: T, time: string | number = '1h'): void {
		let now = new Date();
		let endTime = stampTime(time);
		if (typeof time === 'string') {
			now.setTime(now.getTime() + endTime * 1);
		} else {
			now.setTime(endTime);
		}
		// console.log("now:", now, time);
		document.cookie = name + '=' + encodeURIComponent(JSON.stringify(value as T)) + ';expires=' + now.toUTCString();
	}

	// 删除cookie
	remove(name: string): void {
		// let now = new Date();
		// now.setTime(now.getTime() - 1000000);
		// var cook_name = this.get(name);
		// if (cook_name) {
		// 	document.cookie = name + '=;expires=' + now.toUTCString();
		// }
		let cookieName = this.get(name);
		if (cookieName) {
			// this.set(name, '', -1000000); 这种方式也行
			document.cookie = name + '=;expires=' + new Date(0).toUTCString();
		}
	}
	// 清除所有cookie
	clear(): void {
		let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		if (keys) {
			for (let i = keys.length; i--; ) {
				// document.cookie = keys[i] + '=;path=/;'; 这种方式也行
				this.remove(keys[i]);
			}
		}
	}
	// 核查cookie
	check(name: string): boolean {
		let cookieName = this.get(name);
		if (cookieName) {
			return true;
		}
		return false;
	}
}

// localStorage方法集合
class StorageLocalFn implements StorageClass {
	get<T>(name: string): T | unknown {
		const value = localStorage.getItem(name);
		try {
			if (value) {
				const dataEffect: DataJson<T> = JSON.parse(decodeURIComponent(value) as string);
				let nowTime = new Date().getTime();
				if (typeof dataEffect[ExpireDictions.expires] === 'number' && dataEffect[ExpireDictions.expires] < nowTime) {
					// throw new Error(`${name}的值已过期！`);
					this.remove(name);
					console.error(`${name}的值已过期！`);
					return null;
				} else {
					return dataEffect.value as T;
				}
			} else {
				throw new Error(`无效的localStorage,${name}的值不存在!`);
				// return {
				// 	msg: '无效值,不存在!',
				// 	value: null,
				// };
			}
		} catch (error: any) {
			console.error(error);
			return value; // undefined
			// throw new Error(error);
		}
	}

	set<T>(name: string, value: T, time: Expires = ExpireDictions.permanent) {
		let future: any = 'permanent';
		if (time !== 'permanent') {
			let now = new Date();
			let endTime: number = stampTime(time);
			if (typeof time === 'string') {
				now.setTime(now.getTime() + endTime * 1);
			} else {
				now.setTime(endTime);
			}
			// 有效期时间戳
			future = now.getTime();
		}

		const dataEffect = {
			value,
			[ExpireDictions.expires]: future,
		};
		localStorage.setItem(name, encodeURIComponent(JSON.stringify(dataEffect)));
	}

	// 移除localStorage
	remove(name: string): void {
		localStorage.removeItem(name);
	}
	// 清除所有localStorage
	clear(): void {
		localStorage.clear();
	}
}

// sessionStorage方法集合
class StorageSessionFn implements StorageClass {
	// 获取sessionStorage
	get<T>(name: string): T | unknown {
		const value = sessionStorage.getItem(name);
		try {
			if (value) {
				const dataEffect: DataJson<T> = JSON.parse(decodeURIComponent(value) as string);
				let nowTime = new Date().getTime();
				if (typeof dataEffect[ExpireDictions.expires] === 'number' && dataEffect[ExpireDictions.expires] < nowTime) {
					// throw new Error(`${name}的值已过期！`);
					this.remove(name);
					console.error(`${name}的值已过期！`);
					return null;
				} else {
					return dataEffect.value as T;
				}
			} else {
				throw new Error(`无效的sessionStorage,${name}的值不存在!`);
				// return {
				// 	msg: '无效值,不存在!',
				// 	value: null,
				// };
			}
		} catch (error: any) {
			console.error(error);
			return value; // undefined
		}
	}
	// 存储sessionStorage
	set<T>(name: string, value: T, time: Expires = ExpireDictions.permanent) {
		let future: any = 'permanent';
		if (time !== 'permanent') {
			let now = new Date();
			let endTime: number = stampTime(time);
			if (typeof time === 'string') {
				now.setTime(now.getTime() + endTime * 1);
			} else {
				now.setTime(endTime);
			}
			// 有效期时间戳
			future = now.getTime();
		}

		const dataEffect: DataJson<T> = {
			value,
			[ExpireDictions.expires]: future,
		};
		sessionStorage.setItem(name, encodeURIComponent(JSON.stringify(dataEffect)));
	}

	// 移除sessionStorage
	remove(name: string): void {
		let value = sessionStorage.getItem(name);
		if (value !== null && value !== undefined) sessionStorage.removeItem(name);
	}
	// 清除所有sessionStorage
	clear(): void {
		sessionStorage.clear();
	}
}

export const cookiesFn = new CookiesFn();
export const storageLocalFn = new StorageLocalFn();
export const storageSessionFn = new StorageSessionFn();
