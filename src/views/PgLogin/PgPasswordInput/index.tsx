import React, { useEffect, useState} from 'react'
// import { login } from '../../api/index.js'
import query from '../../../utils/useQuery'
import Headers from '../../../components/Headers'
import { apilogincellphone } from '../../../api'
import './index.scss'
function PgPasswordInput(props: any) {
    let [password, setpassword] = useState('')
    useEffect(() => {
        // console.log(useQuery())
    })
    
    function toLogin() {
        let { phone } = query()
        
        let params = {
            phone: phone,
            password: password
        }
        if (phone) {
            // console.log(phone, '去登陆')
            apilogincellphone(params).then(res => {
                sessionStorage.setItem('useMsg', JSON.stringify(res.profile))
                sessionStorage.setItem('tabId', '1')
                props.history.push('/index/fined')
            })
        }
        
    }
    return (
        <>
            <Headers props={props}/>
            <div className="password-wrap">
                <div className="password-input">
                    <div className="password-border">
                        <div className="password-text-wrap">
                            <input type="password"  placeholder='请输入密码' className="password-text" value={password} onChange={(e) => {
                                setpassword(e.target.value)
                            }}/>
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

export default PgPasswordInput