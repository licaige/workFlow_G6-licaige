import React, { useCallback, useRef, useState } from "react";
import s from './style.module.less';
import { Cell, Input, Button, Checkbox, Toast } from 'zarm';
import CustomIcon from '@/components/CustomIcon'
import Captcha from 'react18-verify-code';
import {post} from '@/utils';
import cx from 'classnames';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const captchaRef = useRef();

    const [username,setUsername] = useState('') // 用户名
    const [password,setPassword] = useState('') // 密码
    const [verify,setVerify] = useState('') // 输入的验证码
    const [captcha, setCaptcha] = useState('') // 图片验证码
    const [type,setType] = useState('login') // 登录注册类型
    const navigate = useNavigate()

      //  验证码变化，回调方法
    const handleChange = useCallback((captcha) => {
        setCaptcha(captcha)
    }, []);

    const onSubmit = async() => {
        if(!username) {
            Toast.show('请输入账号！')
            return 
        }
        if(!password) {
            Toast.show('请输入密码！')
            return 
        }

        if(type === 'login') {
            const {data} = await post('/user/login', {
                username,password
            })
            localStorage.setItem('token', data.token)
            window.location.href = '/'
        }else{
            if(!verify) {
                Toast.show('请输入验证码！')
                return 
            }
            if(verify != captcha) {
                Toast.show('验证码有误！')
                return 
            }
            try{
                const res = await post('/user/register', {
                    username,
                    password
                })
                if(res.code === 200) {
                    Toast.show('注册成功！')
                    setType('login')
                }
            }catch(err) {
                Toast.show(err.data.msg || '注册失败')
            }
        }
    }

    return (
        <div className={s.auth}>
            <div className={s.head}>
                <div className={s.tab}>
                    <span className={cx({ [s.active]: type == 'register' })} onClick={() => setType('register')}>注册</span>
                    <span className={cx({ [s.active]: type == 'login' })} onClick={() => setType('login')}>登录</span>
                </div>
                <div className={s.form}>
                    <Cell icon={<CustomIcon type="icon-account"></CustomIcon>}>
                        <Input clearable type="text" placeholder="请输入账号" onChange={(value) => setUsername(value)}></Input>
                    </Cell>
                    <Cell icon={<CustomIcon type="icon-unlock"></CustomIcon>}>
                        <Input clearable type="text" placeholder="请输入密码" onChange={(value) => setPassword(value)}></Input>
                    </Cell>
                    {
                        type === 'register' ? <Cell icon={<CustomIcon type="icon-feed-logo-fill"></CustomIcon>}>
                        <Input clearable type="text" placeholder="请输入验证码" onChange={(value) => setVerify(value)}></Input>
                        <Captcha ref={captchaRef} charNum={4} onChange={handleChange} />
                    </Cell> : null
                    }
                </div>
            </div>
            <div className={s.operation}>
                {
                    type === 'register' ? 
                    <div className={s.agree}>
                        <Checkbox></Checkbox>
                        <label className="text-light">阅读并同意<a>《tollybook条款》</a></label>
                    </div> : null
                }
                
                <Button block theme="primary" onClick={onSubmit}>{type === 'login' ? '登录' : '注册'}</Button>
            </div>
        </div>
    )
}

export default Login;