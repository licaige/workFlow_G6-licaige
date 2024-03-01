import { defineStore, acceptHMRUpdate } from 'pinia';
import router from '@/router';
import StorageCookies from '@/utils/storagecookies';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		authed: !StorageCookies.getCookie('userKey') ? false : true,
	}),
	actions: {
		check() {
			this.authed = !!StorageCookies.getCookie('userKey');
			if (!this.authed) router.push('/login');
			else router.go(0);
		},
		login(authinfo: any) {
			if (StorageCookies.getCookie('userKey')) {
				StorageCookies.clearCookie('userKey');
			}
			StorageCookies.setCookie('userKey', authinfo.key, authinfo.expire);

			this.authed = true;
			const toRedirect: any =
				router.currentRoute.value.query.redirect || router.currentRoute.value.redirectedFrom;
			if (toRedirect) {
				router.push(toRedirect);
			} else {
				router.push('/home');
			}
		},
		update() {
			if (!StorageCookies.getCookie('userKey')) {
				this.authed = false;
				router.push('/login');
			} else {
				this.authed = true;
				router.go(0);
			}
		},
		logout() {
			StorageCookies.clearCookie('userKey');
			this.authed = false;
			router.push('/login');
		},
	},
});

// make sure to pass the right store definition
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
