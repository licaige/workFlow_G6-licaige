import React, { useState } from "react";
import PropTypes from 'prop-types';
import { TabBar } from "zarm";
import { useNavigate } from 'react-router-dom';
import s from './style.module.less';
import CustomIcon from "../CustomIcon";

const NavBar = ({ showNav, pathname }) => {
    const [activeKey, setActiveKey] = useState(pathname)
    const navigate = useNavigate()

    const changeTab = (path) => {
        setActiveKey(path)
        navigate(path)
    }

    return (
        <TabBar className={s.tab} visible={showNav} activeKey={activeKey} onChange={changeTab}>
            <TabBar.Item itemKey="/" title="账单" icon={<CustomIcon type="icon-order-fill"/>} />
            <TabBar.Item itemKey="/data" title="统计" icon={<CustomIcon type="icon-data"/>}/>
            <TabBar.Item itemKey="/user" title="我的" icon={<CustomIcon type="icon-bussiness-man"/>}/>
        </TabBar>
    )
}

NavBar.propTypes = {
    showNav: PropTypes.bool
}    

export default NavBar;