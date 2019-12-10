import { NavBar, Icon } from 'antd-mobile';
import React, { useState, useEffect } from 'react'
// import {Icons} from '../../components'
import RouterView from '../../router/routerView'
import PgLeftSlider from '../PgLeftSlider'
import './index.scss'


function LeftSilderAddTitle(props) {
    let [heightlight, setheightlight] = useState(1)
    let [open, setopen] = useState(false)

    
    let tabBars = [
        {
            title: '我的',
            paths: '/index/my'
        },
        {
            title: '发现',
            paths: '/index/fined'
        },
        {
            title: '朋友',
            paths: '/index/firends'
        },
        {
            title: '视频',
            paths: '/index/vidio'
        }
    ]

    function show(e) {
        setopen(true)
    }
    function hide() {
        setopen(false)
    }
    // eslint 并不了解你的规则，应该在此处禁用eslint
    /* eslint-disable */
    useEffect(() => {
        props.history.push(tabBars[heightlight].paths)
    }, [heightlight])

    function toTabable(path, index) {
        setheightlight(index)
        props.history.push(path)
    }
    return(
        <>
            <NavBar
                mode="light"
                icon={<Icon type="ellipsis" />}
                rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '10' }} onClick={() => {
                        props.history.push('/search')
                    }}/>,
                ]}
                onLeftClick={show}
            >
                {
                    tabBars.map((item, index) => {
                        return (
                            <div className={heightlight === index ? 'tab-index-bar-actived' : 'tab-index-bar'} onClick={() => {
                                toTabable(item.paths, index)
                            }} key={index}>{item.title}</div>
                        )
                    })
                }
            </NavBar>
            <div className="left-mask-wrap" style={{
                left: open ? '0px' : '-500px',
                background: open ? 'rgba(47,44,44,0.7)' : '#fff'
            }} onTouchEnd={()=>{hide()}}>
                <div className="left-mask-wrap-content" onTouchEnd={(e) => {e.stopPropagation()}} >
                    <PgLeftSlider />
                </div>
            </div>
        </>
    )
}



function Index(props: any) {
    return (
        <>
            <div className='index-wraps'>
                <LeftSilderAddTitle {...props}/>
                <div className="index-wraps-content">
                    <RouterView routers={props.route} />
                </div>
            </div>
        </>
    );
}

export default Index