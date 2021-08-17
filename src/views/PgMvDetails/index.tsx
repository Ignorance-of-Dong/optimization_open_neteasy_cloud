import React, {useEffect, useState} from 'react'
import "../../../node_modules/video-react/dist/video-react.css";
import './index.scss'
import { Icons, Headers } from 'components/index'
import { apimvdetails, apisimiMv, apicommentMv, apiMvUrl } from 'api'
import { Player, BigPlayButton, ControlBar, ReplayControl} from 'video-react';
import query from 'utils/useQuery';


function PgMvDeatils(props: any): JSX.Element {
    let [mvDetails, setmvDetails] = useState<any>(null)
    let [relevantVideo, setrelevantVideo] = useState<Array<any>>([])
    let [brilliantComments, setbrilliantComments] = useState<Array<any>>([])
    let [url, setUrl] = useState("")

    useEffect((): void => {
        let {id} = query()
        getaData(id)
    }, [])

    const getaData = async (id): Promise<any> => {
        let params = {
            id: id
        }
        await apisimiMv(params).then(res => {
            setrelevantVideo(res.mvs)
        })
        await apicommentMv(params).then(res => {
            setbrilliantComments(res.comments)
        })
        let res = await apimvdetails(params)
        setmvDetails(res.data)

        let url = await apiMvUrl({id: res.data.id})
        setUrl(url.data.url)
    }
    
    function switchingVideo(id): void {
        getaData(id)
        props.history.replace(`/mvdetails?id=${id}`)
    }
    
    return(
        <>
            <div className="mv-details-wraps">
                <Headers className='postion-header' props={props}>{mvDetails ? mvDetails.name : '加载中。。。'}</Headers>
                <div className="mv-vidio-wrap">
                    <Player
                        controls={false}
                        // className='mv-vidio-wrap-constur'
                        playsInline
                        poster={mvDetails ? mvDetails.cover : ''}
                        src={url}
                    >
                        <BigPlayButton position="center" />
                        <ControlBar autoHide={false}>
                            <ReplayControl seconds={5} order={2.1} />
                        </ControlBar>
                    </Player>
                </div>
                <div className="mv-vidio-title">
                    {mvDetails ? mvDetails.name : ''}
                </div>
                <div className="mv-vidio-contains">
                    <div className="mv-vidio-label">
                        <span className='playback-volume'>{mvDetails ? mvDetails.likeCount : ''}次观看</span>
                        {
                            mvDetails ? mvDetails.artists.map(res => {
                                return(
                                    <span className='labels-playback' key={res.id}>{res.name}</span>
                                )
                            }) : null
                        }
                    </div>
                    <div className="user-follow">
                        <div className="vidio-name">
                            <div className="header-portrail">
                                <img src="http://p2.music.126.net/1ps8p2zDZ-eBWZoJOYe86Q==/109951164305864441.webp?imageView&thumbnail=246x0&quality=75&tostatic=0&type=webp" alt="" />
                            </div>
                            <div className="header-name">
                                JSADJS
                        </div>
                        </div>
                        <div className="please-follow">
                            +&nbsp;关&nbsp;注
                    </div>
                    </div>
                    <div className="lines"></div>
                    <div className="relevant-video-wrap">
                        <div className="relevant-video-title">
                            相关视频
                        </div>
                        {
                            relevantVideo.map((res: any) => {
                                return(
                                    <div className="relevant-video-list" key={res.id} onClick={() => {
                                        switchingVideo(res.id)
                                    }}>
                                        <div className="relevant-video-list-left">
                                            <img src={res.cover} alt="" />
                                        </div>
                                        <div className="relevant-video-list-right">
                                            <div>
                                                <p className='relevant-video-list-title'>{res.name}</p>
                                                <p className='relevant-video-list-name'>{res.artists[0].name}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="mv-comment">
                        <div className="mv-comment-title">
                            精彩评论
                        </div>
                        {
                            brilliantComments.map(res => {
                                return(
                                    <div className="mv-comment-list" key={res.commentId}>
                                        <div className="mv-comment-list-title">
                                            <div className="mv-comment-list-title-left">
                                                <div className="m-c-l-t-l-header-pic">
                                                    <img src={res.user.avatarUrl} alt="" />
                                                </div>
                                                <div className="m-c-l-t-l-header-name">
                                                    <p className='m-c-l-t-l-name'>{res.user.nickname}</p>
                                                    <p className='m-c-l-t-l-time'>1月13日</p>
                                                </div>
                                            </div>
                                            <div className="mv-comment-list-title-right">
                                                <span className='mv-comment-likedCount'>{res.likedCount}</span>
                                                <Icons className='thumbs-icon' un='&#xe60e;' />
                                            </div>
                                        </div>
                                        <div className="mv-comment-list-content">
                                            {res.content}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default PgMvDeatils