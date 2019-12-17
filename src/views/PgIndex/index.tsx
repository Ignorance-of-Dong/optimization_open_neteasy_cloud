import { NavBar, Icon } from 'antd-mobile';
import React, { useState, useEffect, useCallback, memo } from 'react'
import RouterView from '../../router/routerView'
import PgLeftSlider from '../PgLeftSlider'
import {observer,inject} from 'mobx-react'
import './index.scss'


const LeftSilderAddTitle = inject('Store')(observer((props) => {
    let index: number = sessionStorage.getItem('tabIndex') ? Number(sessionStorage.getItem('tabIndex')) : 1
    let [heightlight, setheightlight] = useState(index)
    let [changSHstate, setchangSHstate] = useState(false)

    
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
            title: '云村',
            paths: '/index/firends'
        },
        {
            title: '视频',
            paths: '/index/vidio'
        }
    ]


    // 显示侧边栏
    const show = useCallback(() => {
        setchangSHstate(true)
    }, [changSHstate])

    // 关闭侧边栏
    const hide = useCallback(() =>{
        setchangSHstate(false)
    }, [changSHstate])


    // eslint 并不了解你的规则，应该在此处禁用eslint
    /* eslint-disable */
    useEffect(() => {
        let index = sessionStorage.getItem('tabIndex') || 1
        props.history.push(tabBars[index].paths)
    }, [])


    // 切换tab模块
    function toTabable(path, index) {
        sessionStorage.setItem('tabIndex', index)
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
                left: changSHstate ? '0px' : '-500px',
                background: changSHstate ? 'rgba(47,44,44,0.7)' : '#fff'
            }} onTouchEnd={()=>{hide()}}>
                <div className="left-mask-wrap-content" onTouchEnd={(e) => {e.stopPropagation()}} >
                    <PgLeftSlider {...props}/>
                </div>
            </div>
        </>
    )
}))


const LeftSilderAddTitlepro = memo(LeftSilderAddTitle) 
const RouterViewPro = memo(RouterView)
function Index(props: any) {
    return (
        <>
            <div className='index-wraps'>
                <LeftSilderAddTitlepro {...props}/>
                <div className="index-wraps-content">
                    <RouterViewPro routers={props.route} />
                </div>
            </div>
        </>
    );
}

export default Index