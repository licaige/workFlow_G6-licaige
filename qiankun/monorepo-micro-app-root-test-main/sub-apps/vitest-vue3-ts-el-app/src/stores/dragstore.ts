import { defineStore, acceptHMRUpdate } from 'pinia';

interface dragItem {
	code: string;
	name: string;
	icon: string;
	link: string;
}

export const useDragStore = defineStore('dragStore', {
	state: () => ({
		draglis: [] as dragItem[],
	}),
	getters: {
		newdraglis: state => state.draglis.map(({ code }) => ({ code })),
	},
	actions: {
		updateList(list: any | dragItem[]) {
			this.draglis = [...list];
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useDragStore, import.meta.hot));
}
