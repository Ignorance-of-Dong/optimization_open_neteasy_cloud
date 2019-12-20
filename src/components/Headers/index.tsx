import React, { forwardRef, useImperativeHandle, useRef, Ref } from 'react'
import './index.scss'

interface props{
    ref?: any,
    otherEl?: JSX.Element,
    className?: String,
    props: any,
    children?: any,
    style?: any,
    svgCol?: string
}
function Headers(props: props, ref: Ref<any>) {
    const headerRef = useRef()
    useImperativeHandle(ref, () => {
        return {
            headerRef: (headerRef as Ref<any>)
        }
    })
    let { svgCol = '#000'} = props
    return (
        <>
            <div className={`header-bar ${props.className}`} ref={headerRef} style={props.style}>
                {props.otherEl}
                <div className="back-header">
                    <svg className="header-icon" width={15} height={22} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" onClick={() => { props.props.history.go(-1)}}>
                        <path fill={svgCol} d="M317.288601 514.022357L774.12597 54.614875a32.126397 32.126397 0 0 0-45.619484-44.976956L249.180639 488.963767a32.126397 32.126397 0 0 0 0 45.619484l479.968375 479.968376a32.126397 32.126397 0 0 0 45.619484-45.619485z" />
                    </svg>
                </div>
                <div className="text-header">
                    {props.children || '手机号登陆'}
                </div>
            </div>
        </>
    )
}

export default forwardRef(Headers)