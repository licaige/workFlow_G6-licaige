export interface Props {
  label: string;
}
export const PrimaryButton = (
  props: Props & React.HTMLProps<HTMLButtonElement>
) => <Button {...props} />;

//更复杂点的交叉类型
type BaseProps = {
  className?: string;
  style?: React.CSSProperties;
  name: string; // used in both
};
type DogProps = {
  tailsCount: number;
};
type HumanProps = {
  handsCount: number;
};
export const Human: React.FC<BaseProps & HumanProps> = {};
export const Dog: React.FC<BaseProps & DogProps> = {};
