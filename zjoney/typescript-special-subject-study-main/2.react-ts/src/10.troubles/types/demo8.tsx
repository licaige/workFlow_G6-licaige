import { Button } from 'library'; //给了组件没给这个组件的 ButtonProps!
type ButtonProps = React.ComponentProps<typeof Button>; // 通过它把这个参数拉回来
type AlertButtonProps = Omit<ButtonProps, 'onClick'>; // 只要onclick
const AlertButton: React.FC<AlertButtonProps> = (props) => (
  <Button onClick={() => alert('hello')} {...props} />
);
