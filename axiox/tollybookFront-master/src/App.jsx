import React, {useEffect, useState} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import routes from "./rooter";
import { ConfigProvider } from "zarm";
import NavBar from "./components/NavBar";


function App() {
  const location = useLocation()
  const {pathname} = location;
  const needNav = ['/', '/data', '/user']
  const [showNav,setShowNav] = useState(false)
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname])

    return (
      <>
        <ConfigProvider primaryColor={'#007fff'}>
            <Routes>
              {
                routes.map(route => <Route key={route.path} path={route.path} element={<route.component />}>
                </Route>)
              }
            </Routes>
        </ConfigProvider>

        <NavBar showNav={showNav} pathname={pathname}></NavBar>
      </>
    )
}

export default App;