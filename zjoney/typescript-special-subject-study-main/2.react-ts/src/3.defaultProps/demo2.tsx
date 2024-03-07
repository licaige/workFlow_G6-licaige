type GreetProps1 = { myname: string } & typeof defaultProps;
const defaultProps = {
  age: 21,
};

const Greet = ({ age, myname }: GreetProps1) => {
  // etc
};
Greet.defaultProps = defaultProps;
