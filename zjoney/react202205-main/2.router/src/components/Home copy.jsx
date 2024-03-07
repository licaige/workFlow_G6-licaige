import React from 'react'
import { useNavigate } from '../react-router-dom';
export default function Home() {
  const navigate = useNavigate();
  function gotoProfile() {
    navigate('/profile');
  }
  return (
    <div onClick={gotoProfile}>Home</div>
  )
}
