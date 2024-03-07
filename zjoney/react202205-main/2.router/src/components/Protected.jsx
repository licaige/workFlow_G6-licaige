import React, { useEffect, useState } from 'react';
import { Navigate } from '../react-router-dom';
function Protected(props) {
  let { component: RouteComponent, path } = props;
  let [render, setRender] = useState(null);
  useEffect(() => {
    (async function () {
      let result = await auth();
      setRender(result ? <RouteComponent /> : <Navigate to={{
        pathname: '/login', state: { from: path }
      }} />);
    })();
  }, []);
  return render;
  /*  return localStorage.getItem('login') ? <RouteComponent /> : <Navigate to={{
     pathname: '/login', state: { from: path }
   }} /> */
}

function auth() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(localStorage.getItem('login'));
    }, 3000)
  })
}
export default Protected;