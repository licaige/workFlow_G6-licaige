import { Size } from '../../utils/constant';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from './constants';

export type RadioBaseProps = {
  size?: Size;
  label: number | string | boolean;
  disabled?: boolean;
};

export type RadioProps = RadioBaseProps & {
  modelValue?: number | string | boolean;
  name?: string;
  border?: boolean;
};

export const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val: RadioProps['modelValue']) => val,
  [CHANGE_EVENT]: (val: RadioProps['modelValue']) => val,
};

export type RadioEmits = typeof radioEmits;
