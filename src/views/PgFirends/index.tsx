import React, { useEffect } from 'react'
import { Icons } from 'components/index'
import './index.scss'
function PgFirends(props: any): JSX.Element {

    useEffect(() => {
        console.log('进入云村入口页面')
    }, [])

    return (
        <>
            <div className="yuncun-wraps">
                <div className="yuncun-conation">
                    <div className="yuncun-tip" onClick={() => {
                        props.history.push('/yuncun')
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
                
            </div>
        </>
    )
}

export default PgFirends