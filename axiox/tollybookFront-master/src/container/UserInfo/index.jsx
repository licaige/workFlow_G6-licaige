import { useState, useEffect } from 'react';
import { FilePicker, Button, Input, Toast } from 'zarm';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import axios from 'axios';
import { get, post } from '@/utils';

import s from './style.module.less';

const baseUrl = 'http://127.0.0.1:7001/api/'

const UserInfo = () => {
    const navigate = useNavigate()
    const [user,setUser] = useState({})
    const [avatar,setAvatar] = useState('')
    const [signature,setSignature] = useState('')
    const token = localStorage.getItem('token')

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        const { data } = await get('/user/getUserInfo')
        setUser(data)
        setAvatar(data.avatar)
        setSignature(data.signature)
    }

    const handleSelect = (file) => {
        if(file && file.file.size  > 200 * 1024) {
            Toast.show('上传头像不能超过200kb')
            return
        }
        let formData = new FormData()
        formData.append('file',file.file)
        axios({
            method: 'post',
            url: `${baseUrl}upload`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': token
            }
        }).then(res => {
            setAvatar(res.data)
        })
    }

    const save = async () => {
        const { data } = await post('/user/editUserInfo', {
            signature,
            avatar
        })

        Toast.show('修改成功')
        navigate(-1)
    }

    return (
        <>
            <Header title="用户信息"></Header>
            <div className={s.userinfo}>
                <h1>个人资料</h1>
                <div className={s.item}>
                    <div className={s.title}>头像</div>
                    <div className={s.avatar}>
                        <img className={s.avatarUrl} src={'http://127.0.0.1:7001' + avatar} alt="" />
                        <div className={s.desc}>
                            <span>支持jpg, png, jpeg 格式大小 200kb 以内的图片</span>
                            <FilePicker className={s.filePicker} onChange={handleSelect} accept="image/*">
                                <Button className={s.upload} theme='primary' size='xs'>点击上传</Button>
                            </FilePicker>
                        </div>
                    </div>
                </div>
                <div className={s.item}>
                    <div className={s.title}>个性签名</div>
                    <div className={s.signature}>
                        <Input
                            clearable type='text' value={signature} placeholder="请输入个性签名" onChange={(value) => setSignature(value)}
                        ></Input>
                    </div>
                </div>
                <Button onClick={save} block theme='primary' style={{ marginTop: 50 }}>保存</Button>
            </div>
        </>
    )
}

export default UserInfo;