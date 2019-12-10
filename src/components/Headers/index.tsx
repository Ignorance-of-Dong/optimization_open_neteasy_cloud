import React from 'react'
import './index.scss'
function Headers(props: any) {
    // console.log(props, 'props')
    return (
        <>
            <div className={`header-bar ${props.className}`}>
                <div className="back-header">
                    <svg className="header-icon" width={15} height={22} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" onClick={() => { props.props.history.go(-1)}}>
                        <path fill='#000' d="M317.288601 514.022357L774.12597 54.614875a32.126397 32.126397 0 0 0-45.619484-44.976956L249.180639 488.963767a32.126397 32.126397 0 0 0 0 45.619484l479.968375 479.968376a32.126397 32.126397 0 0 0 45.619484-45.619485z" />
                    </svg>
                </div>
                <div className="text-header">
                    {props.children || '手机号登陆'}
                </div>
            </div>
        </>
    )
}

export default Headers