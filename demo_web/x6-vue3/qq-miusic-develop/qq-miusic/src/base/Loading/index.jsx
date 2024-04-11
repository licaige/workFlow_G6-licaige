import React from 'react';
import photo from './loading.gif'
import './index.css'
export default (props) => {
  return (
    <div className="loading">
      <img style={{width:50,height:50}} src={photo} alt=''/>
      <p className="desc">{props.title}</p>
    </div>
  )
}