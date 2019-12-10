import React, { useEffect, useState } from 'react'
// import { login } from '../../api/index.js'
import {Headers, Toast} from '../../../components'
import './index.scss'
function PgPhoneInput(props: any) {
    let [phone, setphone] = useState('')
    useEffect(() => {
        console.log(1111, '=======')
    }, [])
    function toPassword() {
        if (phone.length < 11) {
            Toast('请输入11位数字的手机号', 2000)
            return
        }
        props.history.push(`/loginpassword?phone=${phone}`)
    }
    return (
        <>
            <Headers props={props}/>
            <div className="phone-wrap">
                <p className="phone-tips">
                    未注册的手机号登陆后自动创建账户
                </p>
                <div className="phone-input">
                    <div className="phone-border">
                        <div className="phone-prefix">
                            +86
                        </div>
                        <div className="phone-text-wrap">
                            <input type="text" className="phone-text" value= { phone } onChange={(e) => {
                                setphone(e.target.value)
                            }}/>
                        </div>
                        <div className="phone-close">
                            x
                        </div>
                    </div>
                </div>
                <div className="phone-buttom" onClick={() => {
                    toPassword()
                    
                }}>
                    下一步
                </div>
            </div>
            
        </>
    )
}

export default PgPhoneInput