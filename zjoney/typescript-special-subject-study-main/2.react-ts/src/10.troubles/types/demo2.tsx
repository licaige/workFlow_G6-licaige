enum ButtonSizes {
  default = 'default',
  small = 'small',
  large = 'large',
}
export const PrimaryButton = (
  props: Props & React.HTMLProps<HTMLButtonElement>
) => <Button size={ButtonSizes.default} {...props} />;

//更简单的枚举
export declare type Position = 'left' | 'right' | 'top' | 'bottom';
