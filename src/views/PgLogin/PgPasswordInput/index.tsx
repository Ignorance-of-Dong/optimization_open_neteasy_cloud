import React from 'react'
// import { login } from '../../api/index.js'
import { observer } from 'mobx-react'
import Store from './store'

import Headers from '../../../components/Headers'
import './index.scss'

function PgPasswordInput(props: any) {
    let { passwordFn, changePass, password } = Store
    async function toLogin() {
        await passwordFn()
        props.history.push('/index/fined')
    }
    return (
        <>
            <Headers props={props} />
            <div className="password-wrap">
                <div className="password-input">
                    <div className="password-border">
                        <div className="password-text-wrap">
                            <input type="password" placeholder='请输入密码' className="password-text" value={password} onChange={(e) => {
                                changePass(e.target.value)
                            }} />
                        </div>
                        <div className="password-forget">
                            忘记密码？
                        </div>
                    </div>
                </div>
                <div className="password-buttom" onClick={() => {
                    toLogin()
                }}>
                    登陆
                </div>
            </div>
        </>
    )
}

export default observer(PgPasswordInput)