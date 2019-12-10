import React, { useEffect, useState } from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import './index.scss'
import { Icons, Toast } from '../../components'
import { apipersonalizedSongList, apialbum, apifirstMv, apibanner } from '../../api/index'

function MvModule(props: any) {
    let res = props.res
    let [show, setshow] = useState(false)
    function toMvDetails() {
        props.history.push(`/mvdetails?id=${res.id}`)
    }
    return (
        <>
            <div className="song-mv-tips">
                <div className="song-mv-tip-wrap">
                    <div className="song-mv-tip-pri" onClick={() => {
                        toMvDetails()
                    }}>
                        <img src={res.cover} alt="" />
                    </div>
                    <div className="song-mv-tip-name">
                        {res.name}
                    </div>
                </div>
                <div className="song-mv-tip-comm">
                    <div className="song-mv-tip-comm-left">
                        <div className="thumbs-up">
                            <Icons className='thumbs-icon' un='&#xe60e;' />
                            <span>{res.duration}</span>
                        </div>
                        <div className="comment-up">
                            <Icons className='comment-icon' un='&#xe67b;' />
                            <span>{res.playCount}</span>
                        </div>
                    </div>
                    <div className="song-mv-tip-comm-right">
                        <Icons className='comment-icon' un='&#xe629;' onClick={() => {
                            setshow(!show)
                        }} />
                        {show ? <div className="no-interest" onClick={() => { setshow(false) }}>不感兴趣</div> : null}
                    </div>
                </div>
            </div>
        </>
    )
}




function PgFind(props: any) {
    let [recommendedSongList, setrecommendedSongList] = useState([])
    let [newDish, setnewDish] = useState([])
    let [personalizedMv, setpersonalizedMv] = useState([])
    let [_condition, _setcondition] = useState(false)
    let [_banner, _setbanner] = useState([])
    useEffect(() => {
        let getapipersonalizedSongList = async() => {
            let params = {
                limit: 6
            }
            try{
                await apipersonalizedSongList(params).then((res: any) => {
                    setrecommendedSongList(res.result)
                })
                await apibanner().then(res => {
                    _setbanner(res.banners)
                })
            }catch (err) {
                Toast('网络请求异常，请两分钟后再试', 2000)
            }
        }
        getapipersonalizedSongList()
        
    }, [_condition])
    useEffect(() => {
        let getapipersonalizedMv = async () => {
            let params = {
                limit: 6
            }
            await apifirstMv(params).then((res: any) => {
                setpersonalizedMv(res.data)
            }).catch(err => {
                Toast('网络请求异常，请两分钟后再试', 2000)
            })
        }
        getapipersonalizedMv()
    }, [_condition])
    useEffect(() => {
        let params = {
            limit: 3
        }
        apialbum(params).then(res => {
            setnewDish(res.albums)
        }).catch(err => {
            Toast('网络请求异常，请两分钟后再试', 2000)
            _setcondition(false)
        })
    }, [_condition])
    function toPlayDetails(id) {
        props.history.push(`/playdetails?id=${id}`)
    }
    return (
        <>
            <WingBlank>
                <Carousel
                    autoplay={true}
                    infinite
                    beforeChange={() => { }}
                    afterChange={() => { }}
                >
                    {_banner.map(val => (
                        <span
                            key={val}
                            // href="javascript:;"
                            style={{ display: 'inline-block', width: '100%', height: '100%' }}
                        >
                            <img
                                src={`${val.pic}`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top', height: '100%' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    // setimgHeight('auto')
                                }}
                            />
                        </span>
                    ))}
                </Carousel>
            </WingBlank>
            <div className="fined-tab-bars">
                <div className="fined-tab-list">
                    <div className="fined-icon-run">
                        <Icons className='fined-icon' un='&#xe677;' />
                    </div>
                    <p className='fined-icon-text small'>每日推荐</p>
                </div>
                <div className="fined-tab-list">
                    <div className="fined-icon-run">
                        <Icons className='font-sizes' un='&#xe60d;' />
                    </div>
                    <p className='fined-icon-text small'>歌单</p>
                </div>
                <div className="fined-tab-list">
                    <div className="fined-icon-run">
                        <Icons className='fined-icon' un='&#xe6ad;' />
                    </div>
                    <p className='fined-icon-text small'>排行榜</p>
                </div>
                <div className="fined-tab-list">
                    <div className="fined-icon-run">
                        <Icons className='fined-icon' un='&#xe65e;' />
                    </div>
                    <p className='fined-icon-text small'>电台</p>
                </div>
                <div className="fined-tab-list">
                    <div className="fined-icon-run">
                        <Icons className='fined-icon' un='&#xe60c;' />
                    </div>
                    <p className='fined-icon-text small'>直播</p>
                </div>
            </div>
            <div className="common-song-wrap">
                <div className="common-song-title">
                    <div className="common-song-left">
                        推荐歌单
                    </div>
                    <div className="common-song-right">
                        歌单广场
                    </div>
                </div>
                <div className="common-song-content">
                    <div className="recommended-song-list">
                        {
                            recommendedSongList.map(item => {
                                return (
                                    <div className="recommended-song-tip" key={item.id}>
                                        <div className="recommended-song-price" onClick={() => {
                                            toPlayDetails(item.id)
                                        }}>
                                            <img src={item.picUrl} alt="" />
                                        </div>
                                        <div className='recommended-song-text'>
                                            {item.name}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="common-song-wrap">
                <div className="common-song-title">
                    <div className="common-song-left">
                        新碟
                    </div>
                    <div className="common-song-right">
                        更多新碟
                    </div>
                </div>
                <div className="common-song-content">
                    <div className="recommended-song-list">
                        {
                            newDish.map(item => {
                                return (
                                    <div className="recommended-song-tip" key={item.id}>
                                        <div className="recommended-song-price">
                                            <img src={item.picUrl} alt="" />
                                        </div>
                                        <div className='recommended-song-text'>
                                            {item.name}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="common-song-wrap">
                <div className="common-song-title">
                    <div className="common-song-left">
                        最新MV
                    </div>
                    <div className="common-song-right">
                        查看更多
                    </div>
                </div>
                <div className="common-song-content">
                    <div className="song-mv-list">
                        {
                            personalizedMv.map(res => {
                                return (
                                    <MvModule res={res} key={res.id} {...props}/>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
export default PgFind