import React, { useCallback, useEffect, useState, useRef } from 'react'
import { PullToRefresh } from 'antd-mobile';
import './index.scss'
import { apivideogroup, apigrouplist } from 'api'

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
function PgVidio() {

    let [tagId, setTagId] = useState(0)
    let [videoList, setVideoList] = useState([])

    let listRef = useRef(null)

    const getVideoList = useCallback( async (id) => {
        let params = {
            id: id
        }
        await apigrouplist(params).then(res => {
            setVideoList(res.datas)
        })
    }, [])

    useEffect(() => {
        getVideoList(tarList[0].id)
        apivideogroup()
    }, [])

    const changeTagId = useCallback((index) => {
        setTagId(index)
        getVideoList(tarList[index].id)
    }, [])
    return (
        <>
            <div className="vidio-wraps">
                <div className="vidio-top-tag">
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
                        ref={listRef}                        
                        indicator={{ deactivate: '上拉可以刷新' }}
                        direction={'up'}
                        refreshing={true}
                        distanceToRefresh={25}
                        getScrollContainer={() => undefined}
                        onRefresh={() => {
                            console.log('到达底部')
                        }}
                    >
                        {
                            videoList.map((item, index) => {
                                return (
                                    <div className="vidio-list-tip" key={index}>
                                        <div className="video-container">
                                            <img src={item.data.imgurl16v9 || item.data.coverUrl} alt="" />
                                        </div>
                                        <div className="video-name">
                                            {item.data.name || item.data.title}
                                        </div>
                                        <div className="video-info">
                                            <div className="info-header">
                                                <img src={item.data.artists[0].img1v1Url} alt=""/>
                                            </div>
                                            <div className="info-name">
                                                {item.data.artists[0].name}
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
export default PgVidio