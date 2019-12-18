import React, { useCallback, useEffect, useState, useRef } from 'react'
import { PullToRefresh } from 'antd-mobile';
import { Toast, Icons } from 'components/index'
import './index.scss'
import { apivideogroup, apigrouplist } from 'api'
import { observer, inject } from 'mobx-react'
import { Player, BigPlayButton, ControlBar, ReplayControl } from 'video-react';

const tarList: Array<any> = [
    {
        tag: 'MV',
        id: 1000
    },
    {
        tag: '中文翻唱',
        id: 57111
    },
    {
        tag: '听BGM',
        id: 58101
    },
    {
        tag: '动漫混剪',
        id: 59115
    }
]


function PgVidio(props :any): JSX.Element {

    let [tagId, setTagId] = useState(0)
    let [videoList, setVideoList] = useState([])
    let [listHeight, setListHeight] = useState(0)
    let [refreshing, setrefreshing] = useState(true)
    let [currentIndex, setCurrentIndex] = useState(null)

    let listRef = useRef(null)
    let tagRef = useRef(null)
    let videoRef = useRef(null)

    const startPlayVideo = useCallback( async (index) => {
        setCurrentIndex(index)
        setTimeout(() => {
            videoRef.current.play()
        })
    }, [])

    const getVideoList = useCallback( async (id) => {
        let params = {
            id: id
        }
        await apigrouplist(params).then(res => {
            setVideoList(res.datas)
        }).catch(err => {
            Toast('网络请求异常，请两分钟后再试', 2000)
        })
    }, [])

    useEffect(() => {
        getVideoList(tarList[0].id)
        apivideogroup()
        const hei = document.documentElement.clientHeight - tagRef.current.offsetHeight - props.Store.tabBarHeight; // 获取到当前可适高度
        setListHeight(hei)
    }, [])

    const changeTagId = useCallback((index) => {
        setCurrentIndex(null)
        setTagId(index)
        getVideoList(tarList[index].id)
    }, [])


    return (
        <>
            <div className="vidio-wraps">
                <div className="vidio-top-tag" ref={tagRef}>
                    {
                        tarList.map((item, index) => {
                            return(
                                <div className="vidio-top-tag-tip" style={{ color: tagId == index ? 'red' : '' }} key={index} onClick={() => {
                                    changeTagId(index)
                                }}>
                                    {item.tag}
                                    <div className="line" style={{ background: tagId == index ? 'red' : ''}}></div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="vidio-contant-list">
                    <PullToRefresh
                        damping={60}
                        style={{
                            height: listHeight,
                            overflow: 'auto',
                        }}
                        ref={listRef}                  
                        indicator={{ deactivate: '...' }}
                        direction={'down'}
                        refreshing={refreshing}
                        distanceToRefresh={25}
                        getScrollContainer={() => undefined}
                        onRefresh={ async () => {
                            setrefreshing(true)
                            await getVideoList(tarList[tagId].id)
                            setrefreshing(false)
                        }}
                    >
                        {
                            videoList.map((item, index) => {
                                return (
                                    <div className="vidio-list-tip" key={index}>

                                        <div className="video-container">
                                            <div className="start" onClick={() => {
                                                startPlayVideo(index)
                                            }}>
                                                {currentIndex == index ? null : <Icons className='video-icon' un='&#xe7d6;' />}

                                            </div>
                                            {
                                                currentIndex == index ? 
                                                
                                                    <div className="vidio-wrap">
                                                        <Player
                                                            ref={videoRef}
                                                            controls={true}
                                                            className='vidio-wrap-constur'
                                                            playsInline
                                                            poster={item.data.imgurl16v9 || item.data.coverUrl}
                                                            src={item.data.urlInfo.url}
                                                        >
                                                            <ControlBar autoHide={true}>
                                                                <ReplayControl seconds={5} order={2.1} />
                                                                <ReplayControl seconds={10} order={2.2} />
                                                                <ReplayControl seconds={30} order={2.3} />
                                                            </ControlBar>
                                                            <BigPlayButton position="center" />
                                                        </Player>
                                                    </div>

                                                :

                                                <img src={item.data.imgurl16v9 || item.data.coverUrl} alt="" />
                                            }
                                            
                                        </div>
                                        <div className="video-name">
                                            {item.data.name || item.data.title}
                                        </div>
                                        <div className="video-info">
                                            <div className="info-header">
                                                <img src={item.data.artists ? item.data.artists[0].img1v1Url : 'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'} alt="" />
                                            </div>
                                            <div className="info-name">
                                                {item.data.artists ? item.data.artists[0].name : '未知'}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </PullToRefresh>
                </div>
            </div>
        </>
    )
}
export default inject('Store')(observer(PgVidio))