import React from 'react'
import { useNavigate } from '../react-router-dom';
import { UserAPI } from '../utils';
export default function UserAdd() {
  const navigate = useNavigate();
  const nameRef = React.useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    let name = nameRef.current.value;
    UserAPI.add({ id: Date.now() + "", name });
    navigate('/user/list');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={nameRef} />
      <button type="submit">添加</button>
    </form>
  )
}
