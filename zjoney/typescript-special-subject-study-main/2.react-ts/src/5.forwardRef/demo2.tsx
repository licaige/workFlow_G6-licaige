//保证没有人重新去赋值这个ref
type Props = { children: React.ReactNode; type: 'submit' | 'button' };
export type Ref = HTMLButtonElement;
export const FancyButton = React.forwardRef((
  props: Props,
  ref: React.Ref<Ref> // <-- here!
) => (
  <button ref={ref} className="MyClassName" type={props.type}>
    {props.children}
  </button>
));
