type State = {
  text: string;
};
class App extends React.Component<Props, State> {
  state = {
    text: '',
  };

  // typing on RIGHT hand side of =
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ text: e.currentTarget.value });
  };
  render() {
    return (
      <div>
        <input type="text" value={this.state.text} onChange={this.onChange} />
      </div>
    );
  }
}

//这样也可以
// onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
//     this.setState({text: e.currentTarget.value})
//   }
//第一种是推断 第二种是强制
