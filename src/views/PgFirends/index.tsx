/*
 * @Author: zhangzheng
 * @Date: 2020-08-05 16:07:26
 * @LastEditors: zhangzheng
 * @LastEditTime: 2021-07-30 17:18:31
 * @Descripttion: 
 */
import React, { useEffect } from 'react'
import { Icons, Bubbleflow, Toasts } from 'components/index'
import './index.scss'
function PgFirends(props: any): JSX.Element {

    useEffect((): void => {
        console.log('进入云村入口页面')
    }, [])

    return (
        <>
            <div className="yuncun-wraps">
                <div className="yuncun-conation">
                    <div className="yuncun-tip" onClick={() => {
                        // props.history.push('/yuncun')
                        Toasts("含泪关闭入口😭😭😭😭", 2000)
                    }}>
                        <div className="left">
                            <div className="left-title">
                                云村热评墙 <Icons className='lower-icon' un='&#xe621;'/>
                            </div>
                            <div className="left-contant">
                                村友，这些评论戳中你的心了吗？
                            </div>
                        </div>
                        <div className="right">
                            <div className="right-mouth">
                                {new Date().toDateString().split(" ")[1]}.
                            </div>
                            <div className="right-day">
                                {new Date().getDate()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="load-bearing">
                    <Bubbleflow />
                </div>
                
            </div>
        </>
    )
}

export default PgFirends