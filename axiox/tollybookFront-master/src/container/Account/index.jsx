import { useNavigate } from 'react-router-dom';
import { Input } from 'zarm';
import { Form, Button, Toast } from 'antd-mobile';
import Header from '@/components/Header';
import { post } from '@/utils';

import s from './style.module.less';

const Account = () => {
    const navigate = useNavigate()

    const submit = async (values) => {
        const { newpass,newpass2 } = values
        if(newpass != newpass2) {
            Toast.show({
                content: '确认密码输入不一致'
            })
            return
        }
        await post('/user/modifypass', values)
        Toast.show({
            content: '修改成功！'
        })
        localStorage.clear()
        navigate('/login')
    }

    return (
        <>
            <Header title="重置密码"></Header>
            <div className={s.account}>
                <div className={s.form}>
                <Form
                    layout='horizontal'
                    onFinish={submit}
                    footer={
                        <Button block type='submit' color='primary' size='large'>
                            提交
                        </Button>
                    }
                >
                    <Form.Item
                        name='oldpass'
                        label='原密码'
                        rules={[{ required: true, message: '原密码不能为空' }]}
                    >
                        <Input clearable type='text' placeholder='请输入原密码' />
                    </Form.Item>
                    <Form.Item
                        name='newpass'
                        label='新密码'
                        rules={[{ required: true, message: '新密码不能为空' }]}
                    >
                        <Input clearable type='text' placeholder='请输入新密码' />
                    </Form.Item>
                    <Form.Item
                        name='newpass2'
                        label='确认密码'
                        rules={[{ required: true, message: '请输入新密码确认' }]}
                    >
                        <Input clearable type='text' placeholder='请输入新密码确认' />
                    </Form.Item>
                </Form>
                </div>
            </div>
        </>
    )
}

export default Account;