import React from './react';
import ReactDOM from './react-dom';
const ThemeContext = React.createContext();//{Provider,Consumer}
console.log(ThemeContext);
const baseStyle = { margin: '5px', padding: '5px' };
function Title() {
  return (
    <ThemeContext.Consumer>
      {
        (value) => (
          <div style={{ ...baseStyle, border: `5px solid ${value.color}` }}>
            Title
          </div>
        )
      }
    </ThemeContext.Consumer>
  )
}
class Header extends React.Component {
  static contextType = ThemeContext
  render() {
    return (
      <div style={{ ...baseStyle, border: `5px solid ${this.context.color}` }}>
        Header
        <Title />
      </div>
    )
  }
}
function Content() {
  return (
    <ThemeContext.Consumer>
      {
        (value) => (
          <div style={{ ...baseStyle, border: `5px solid ${value.color}` }}>
            Content
            <button onClick={() => value.changeColor('red')}>变红</button>
            <button onClick={() => value.changeColor('green')}>变绿</button>
          </div>
        )
      }
    </ThemeContext.Consumer>
  )
}
class Main extends React.Component {
  static contextType = ThemeContext
  render() {
    return (
      <div style={{ ...baseStyle, border: `5px solid ${this.context.color}` }}>
        Main
        <Content />
      </div>
    )
  }
}
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: 'black' };
  }
  changeColor = (color) => {
    this.setState({ color });
  }
  render() {
    const value = { color: this.state.color, changeColor: this.changeColor };
    //React.creteElement(ThemeContext.Provider);=>{type:ThemeContext.Provider}=vdom
    return (
      <ThemeContext.Provider value={value}>
        <div style={{ ...baseStyle, width: '250px', border: `5px solid ${this.state.color}` }}>
          <Header />
          <Main />
        </div>
      </ThemeContext.Provider>
    )
  }
}
ReactDOM.render(<Page />, document.getElementById('root'));