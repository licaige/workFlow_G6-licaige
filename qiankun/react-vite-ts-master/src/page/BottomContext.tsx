
import { ThemeContext } from '../utils/context'

function BottomContext() {
  console.log('3333333')
  return (
    <div className="card">
      <ThemeContext.Consumer>
        {
          (props:any) => (
            <button onClick={props.toggleTheme}>
              改变context的值{props.theme}
            </button>
          )
        }
      </ThemeContext.Consumer>
    </div>
  )
}

export default BottomContext