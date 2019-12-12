import { NavBar, Icon } from 'antd-mobile';
import React, { useState, useEffect, useCallback, memo } from 'react'
// import {Icons} from '../../components'
import RouterView from '../../router/routerView'
import PgLeftSlider from '../PgLeftSlider'
import {observer,inject} from 'mobx-react'
import Store from './store'
import './index.scss'


const LeftSilderAddTitle = inject('Store')(observer((props) => {
    let [heightlight, setheightlight] = useState(1)
    let [changSHstate, setchangSHstate] = useState(false)

    // let { open, changSHstate } = Store
    
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
        props.history.push(tabBars[heightlight].paths)
    }, [heightlight])


    // 切换tab模块
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
                left: changSHstate ? '0px' : '-500px',
                background: changSHstate ? 'rgba(47,44,44,0.7)' : '#fff'
            }} onTouchEnd={()=>{hide()}}>
                <div className="left-mask-wrap-content" onTouchEnd={(e) => {e.stopPropagation()}} >
                    <PgLeftSlider />
                </div>
            </div>
        </>
    )
}))


const LeftSilderAddTitlepro = memo(LeftSilderAddTitle) 
const RouterViewPro = memo(RouterView)
function Index(props: any) {
    console.log('..............')
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