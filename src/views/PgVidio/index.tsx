import React, { useCallback, useEffect, useState, useRef } from 'react'
import { PullToRefresh } from 'antd-mobile';
import { Skeleton, Icons } from 'components/index'
import './index.scss'
import { apivideogroup, apigrouplist, apivideourl } from 'api'
import { observer, inject } from 'mobx-react'
import { Player, BigPlayButton, ControlBar, ReplayControl } from 'video-react';

const tarList: Array<any> = [
    {
        tag: '翻跳',
        id: 60105  
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

    let [tagId, setTagId] = useState<number>(0)
    let [videoList, setVideoList] = useState<Array<any>>([])
    let [listHeight, setListHeight] = useState<number>(0)
    let [refreshing, setrefreshing] = useState<boolean>(true)
    let [currentIndex, setCurrentIndex] = useState<any>(null)

    let listRef = useRef(null)
    let tagRef = useRef(null)
    let videoRef = useRef(null)

    const startPlayVideo = useCallback( async (index): Promise<any> => {
        setCurrentIndex(index)
        setTimeout(() => {
            videoRef.current.play()
        })
    }, [])

    const getVideoList = useCallback(async(id): Promise<any> => {
        let params = {
            id: id
        }

        let { datas } = await apigrouplist(params);
        let promiseVideos = datas.map(item => {
            return apivideourl({id: item.data.vid})
        })
        let result: any[] = await Promise.all(promiseVideos);
        
        console.log(result)
        let videoList = datas.map((item, index) => {
            return item = {
                ...item,
                url: result[index].urls[0].url
            }
        })
        console.log(videoList)
        setVideoList(videoList)

    }, [])

    useEffect((): void => {
        getVideoList(tarList[0]['id'])
        apivideogroup()
        const hei = document.documentElement.clientHeight - tagRef.current.offsetHeight - props.commonStore.tabBarHeight; // 获取到当前可适高度
        setListHeight(hei)
    }, [])

    const changeTagId = useCallback(<T extends number>(index: T): void => {
        setCurrentIndex(null)
        setTagId(index)
        getVideoList(tarList[index]['id'])
    }, [])

    return (
        <>
            <div className="vidio-wraps">
                <div className="vidio-top-tag" ref={tagRef}>
                    {
                        tarList.map((item, index) => {
                            return(
                                <div className="vidio-top-tag-tip" style={{ color: tagId == index ? 'red' : '' }} key={index} onClick={() => {
                                    changeTagId<number>(index)
                                }}>
                                    {item['tag']}
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
                            await getVideoList(tarList[tagId]['id'])
                            setrefreshing(false)
                        }}
                    >
                        {
                            videoList.length ? videoList.map((item, index) => {
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
                                                            src={item.url}
                                                        >
                                                            <ControlBar autoHide={true}>
                                                                <ReplayControl seconds={5} order={2.1} />
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
                            }) : 

                            <Skeleton type={2}/>
                        }
                    </PullToRefresh>
                </div>
            </div>
        </>
    )
}
export default inject('commonStore')(observer(PgVidio))