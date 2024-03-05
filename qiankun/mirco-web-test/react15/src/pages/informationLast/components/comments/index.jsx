import React from 'react'
import './index.scss'

class InformationLastComments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textareaText: ''
    }
  }
  textareaChange(e) {
    this.setState({
      textareaText: e.target.value
    })
  }

  render() {
    const { textareaText } = this.state
    return (
      <div className="last-comments-container">
        <div className="last-comments-title">我要评论</div>

        <div className="last-comments-textarea-wrapper">
          <textarea
            placeholder="说说你的观点和想法吧"
            className="last-comments-textarea"
            onChange={ (e) => this.textareaChange(e) }
          ></textarea>
          <span>{textareaText.length}/300</span>
        </div>

        <div className="last-comments-button-wrapper">
          <div className={textareaText.length ? "last-comments-button" : "last-comments-button-disabled"}>发表</div>
        </div>
      </div>
    )
  }
}

export default InformationLastComments
