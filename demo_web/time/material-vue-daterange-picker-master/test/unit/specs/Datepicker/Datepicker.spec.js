import DateRangePicker from '@/components/Picker.vue';
import { mount } from '@vue/test-utils';
import moment from 'moment';

describe('DateRangePicker', () => {
  it('should mount', () => {
    const wrapper = mount(DateRangePicker);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('sets the correct default data', () => {
    const defaultData = DateRangePicker.data();
    expect(typeof DateRangePicker.data).toEqual('function');
    expect(defaultData.inRange).toEqual(false);
    expect(defaultData.pickerVisible).toEqual(false);
  });
});

describe('DateRangePicker mounted', () => {
  let startDate;
  let wrapper;
  beforeEach(() => {
    startDate = '2018-12-31';
    wrapper = mount(DateRangePicker, {
      propsData: {
        startDate,
      },
    });
  });

  it('correctly sets the value when created', () => {
    const data = wrapper.vm.$data;
    expect(data.start_).toEqual(moment(startDate));
  });
});
