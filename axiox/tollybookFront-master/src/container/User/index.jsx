import {get} from '@/utils';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cell,Button } from 'zarm';
 
import s from './style.module.less';

const User = () => {
    const [user,setUser] = useState({})
    const [avatar,setAvatar] = useState('')
    const firstRenderRef = useRef(true)
    const navigate = useNavigate()

    const getUserInfo = async () => {
        if(firstRenderRef.current) {
            firstRenderRef.current = false
            const {data} = await get('/user/getUserInfo')
            setUser(data)
            setAvatar(data.avatar)
        }
    }

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    useEffect(() => {
        getUserInfo()
    },[])

    return (
        <div className={s.user}>
            <div className={s.head}>
                <div className={s.info}>
                    <span>昵称:{user.username || '--'}</span>
                    <span>
                        <img src="//s.yezgea02.com/1615973630132/geqian.png" style={{ width: 30,height: 30,verticalAlign: '-10px' }} alt="" />
                        <b>{user.signature || '暂无个签'}</b>
                    </span>
                </div>
                <img src={'http://127.0.0.1:7001' + avatar} className={s.avatar} style={{ width: 60, height: 60, borderRadius: 8 }} alt="" />
            </div>
            <div className={s.content}>
                <Cell
                    hasArrow
                    title="用户信息修改"
                    onClick={() => navigate('/userInfo')}
                    icon={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1615974766264/gxqm.png" alt="" />}
                ></Cell>
                <Cell
                    hasArrow
                    title="重置密码"
                    onClick={() => navigate('/account')}
                    icon={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1615974766264/zhaq.png" alt="" />}
                ></Cell>
                <Cell
                    hasArrow
                    title="关于我们"
                    onClick={() => navigate('/about')}
                    icon={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1615975178434/lianxi.png" alt="" />}
                />
            </div>
            <Button className={s.logout} block theme="danger" onClick={logout}>退出登录</Button>
        </div>
    )
}

export default User;