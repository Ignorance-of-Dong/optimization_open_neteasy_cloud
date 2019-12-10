import React, { useEffect, useState } from 'react'
import './index.scss'
import { Icons } from '../../components'
import { apiuserplayer } from '../../api'
function PgMy(props: any) {
    let [myCreateOrder, setmyCreateOrder] = useState([])
    let [collectionOrder, setcollectionOrder] = useState([])
    let [_condition, _setcondition] = useState(false)
    useEffect(() => {
        let useMsg = sessionStorage.getItem('useMsg')
        let uid = JSON.parse(useMsg).userId
        let parmas = {
            uid: uid
        }
        apiuserplayer(parmas).then(res => {
            // console.log(res)
            let myCreateOrder = []
            let collectionOrder = []
            for (let i = 0; i <= res.playlist.length - 1; i++){
                // console.log(res.playlist[i].ordered)
                if (res.playlist[i].ordered) {
                    collectionOrder.push(res.playlist[i])
                } else {
                    myCreateOrder.push(res.playlist[i])
                }
            }
            setmyCreateOrder(myCreateOrder)
            setcollectionOrder(collectionOrder)
            // console.log(myCreateOrder)
        }).catch(err => {
            _setcondition(false)
        })
    }, [_condition])
    function toPlayDetails(id) {
        props.history.push(`/playdetails?id=${id}`)
    }
    return (
        <>
            <div className="my-music-wraps">
                <div className="my-music-top-wrap">
                    <div className="my-music-top-content">
                        <div className="my-music-top-content-wrap">
                            <div className="my-music-top-tip">
                                <Icons className='fm-icon' un='&#xe616;' />
                            </div>
                            <p className='my-music-top-tip-title'>私人FM</p>
                        </div>
                        <div className="my-music-top-content-wrap">
                            <div className="my-music-top-tip">
                                <Icons className='love-icon' un='&#xe633;' />
                            </div>
                            <p className='my-music-top-tip-title'>心动模式</p>
                        </div>
                        <div className="my-music-top-content-wrap">
                            <div className="my-music-top-tip">
                                <Icons className='radio-icon' un='&#xe61b;' />
                            </div>
                            <p className='my-music-top-tip-title'>私人电台</p>
                        </div>
                        <div className="my-music-top-content-wrap">
                            <div className="my-music-top-tip">
                                <Icons className='run-icon' un='&#xe617;' />
                            </div>
                            <p className='my-music-top-tip-title'>跑步FM</p>
                        </div>
                        <div className="my-music-top-content-wrap">
                            <div className="my-music-top-tip">
                                <Icons className='drive-icon' un='&#xe6e4;' />
                            </div>
                            <p className='my-music-top-tip-title'>驾驶模式</p>
                        </div>
                    </div>
                </div>
                <div className="my-music-list-config-wrap">
                    <div className="my-music-list-config-tip">
                        <Icons className='local-icon' un='&#xe680;' />
                        <div className="my-music-list-config-title">
                            本地音乐
                        </div>
                    </div>
                    <div className="my-music-list-config-tip">
                        <Icons className='local-icon' un='&#xe61f;' />
                        <div className="my-music-list-config-title">
                            最近播放
                        </div>
                    </div>
                    <div className="my-music-list-config-tip">
                        <Icons className='local-icon' un='&#xe667;' />
                        <div className="my-music-list-config-title">
                            下载管理
                        </div>
                    </div>
                    <div className="my-music-list-config-tip">
                        <Icons className='local-icon' un='&#xe61b;' />
                        <div className="my-music-list-config-title">
                            我的电台
                        </div>
                    </div>
                    <div className="my-music-list-config-tip">
                        <Icons className='local-icon' un='&#xe61c;' />
                        <div className="my-music-list-config-title">
                            我的收藏
                        </div>
                    </div>
                </div>
                <div className="my-music-line"></div>
                <div className="my-music-list-create">
                    <div className="my-music-list-create-title">
                        创建的歌单
                    </div>
                    {
                        myCreateOrder.map((res, index) => {
                            return(
                                <div className="my-music-list-create-tip" key={res.id} onClick={() => {
                                    toPlayDetails(res.id)
                                }}>
                                    <div className="my-music-list-create-tip-pic">
                                        <img src={res.coverImgUrl} alt="" />
                                    </div>
                                    <div className="my-music-list-create-tip-content">
                                        <div className="my-music-list-create-tip-name">
                                            {res.name}
                                        </div>
                                        <div className="my-music-list-create-tip-count">
                                            {res.trackCount}首
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="my-music-list-create">
                    <div className="my-music-list-create-title">
                        收藏的歌单
                    </div>
                    {
                        collectionOrder.map((res, index) => {
                            return (
                                <div className="my-music-list-create-tip" key={res.id} onClick={() => {
                                    toPlayDetails(res.id)
                                }}>
                                    <div className="my-music-list-create-tip-pic">
                                        <img src={res.coverImgUrl} alt="" />
                                    </div>
                                    <div className="my-music-list-create-tip-content">
                                        <div className="my-music-list-create-tip-name">
                                            {res.name}
                                        </div>
                                        <div className="my-music-list-create-tip-count">
                                            {res.trackCount}首 by {res.creator.nickname}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default PgMy