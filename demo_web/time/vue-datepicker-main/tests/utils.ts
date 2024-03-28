import { flushPromises, mount, VueWrapper } from '@vue/test-utils';

import VueDatePicker from '@/VueDatePicker.vue';

import type { AllPropsType } from '@/props';
import { resetDateTime } from '@/utils/date-utils';

export const openMenu = async (props: Partial<AllPropsType>) => {
    const dp = mount(VueDatePicker, { props });

    dp.vm.openMenu();
    await flushPromises();

    await dp.vm.$nextTick();
    return dp;
};

export const reOpenMenu = async (dp: VueWrapper<any>, newProps?: Partial<AllPropsType>) => {
    dp.vm.closeMenu();
    if (newProps) {
        await dp.setProps(newProps);
    }
    await dp.vm.$nextTick();
    dp.vm.openMenu();
    await dp.vm.$nextTick();
};

export const getMonthName = (date: Date) => {
    const month = new Intl.DateTimeFormat('en-Us', { month: 'short', timeZone: 'UTC' }).format(date);
    return month.charAt(0).toUpperCase() + month.substring(1);
};

export const clickCalendarDate = async (dp: VueWrapper<any>, date: Date) => {
    await dp.find(`[data-test="${resetDateTime(date)}"]`).trigger('click');
};

export const clickSelectBtn = async (dp: VueWrapper<any>) => {
    await dp.find(`[data-test="select-button"]`).trigger('click');
};
