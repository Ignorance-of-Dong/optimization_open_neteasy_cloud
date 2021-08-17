import React, { useState, useRef, useCallback, useEffect} from 'react'
import { Icons, Headers } from 'components/index'
import './index.scss'
import { apirecommendsongs } from 'api'
import { inject, observer } from 'mobx-react'
function PgRecommendedDaily(props: any) {

    let [songListDetails, setsongListDetails] = useState<Array<any>>([])
    let [titlePostion, setTitlePostion] = useState<boolean>(false)
    let headerRef = useRef(null)
    let titleRef = useRef(null)


    const getRecommendSongs = useCallback( async (): Promise<any> => {
        await apirecommendsongs().then(res => {
            let songs = res.data.dailySongs
            setsongListDetails(songs)
        })
    }, [])

    useEffect((): void => {
        getRecommendSongs()
    }, [])

    const scrollFun = useCallback((e): void => {
        if (e.target.scrollTop > (titleRef.current.offsetHeight - headerRef.current.headerRef.current.offsetHeight)) {
            setTitlePostion(true)
        } else {
            setTitlePostion(false)
        }
    }, [])
    
    return <>
        <div className="play-details-wrap" onScroll={(e) => scrollFun(e)}>
            <div className="play-details-title" ref={titleRef}>
                <div className="play-details-title-mask" style={{
                    background: `url(${'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: '10%',
                    filter: 'blur(0px)'
                }}></div>

                <Headers ref={headerRef} style={
                    {
                        backgroundColor: titlePostion ? '#fff' : '',
                        color: titlePostion ? '#000' : '',
                        boxShadow: titlePostion ? '-4px -7px 5px #fff': ''
                    }
                }
                    otherEl={<div className="header-mask" style={
                        titlePostion
                            ?
                            {
                                backgroundImage: `url(${'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'})`,
                                backgroundSize: '100% 100%'
                            }
                            :
                            {
                                background: `url(${'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'})`,
                            }
                    }></div>}
                    className='postion-header'
                    svgCol={!titlePostion ? '#fff' : ''}
                    props={props}>

                    {'每日推荐'}
                </Headers>
                <div className="play-details-title-mask-content">

                    <div className="play-details-left-pic" style={{ background: 'transparent'}}>
                        {/* <img src={bacUrl ? bacUrl : ''} alt="" /> */}
                    </div>
                    <div className="play-details-right-detail">
                        {/* <div className='play-details-right-detail-title'>{songListObj ? songListObj.name : ''}</div> */}
                        <div className="play-details-right-detail-author">
                            {/* <div className="play-details-right-detail-author-header">
                                <img src={bacUrl ? bacUrl : ''} alt="" />
                            </div> */}
                            <div className="play-details-right-detail-author-name">
                                {/* {songListObj ? songListObj.nickname : ''} */}
                            </div>
                        </div>
                        <div className="play-details-right-detail-introduce">
                            {/* {songListObj ? songListObj.description : ''} */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="play-details-content">
                <div className="play-details-content-title start-play-all-boxshaw" style={{
                    position: titlePostion ? 'fixed' : 'relative',
                    top: titlePostion ? headerRef.current.headerRef.current.offsetHeight : 0,
                    zIndex: 5
                }}>
                    <div className="play-details-content-title-playok" onClick={() => {
                        props.commonStore.getSongListDetails(songListDetails)
                        sessionStorage.setItem('songListDetails', JSON.stringify(songListDetails))
                        props.playerStore.handleSongListType("default")
                        props.playerStore.handleGetSongId(songListDetails[0].id)
                        props.history.push(`/musicplayer`)
                    }}>
                        <Icons className='playok-icon' un='&#xe615;' />
                        <p className='start-play-all'>播放全部<span className='song-number'>(共{songListDetails.length}首)</span></p>
                    </div>
                </div>
                <div className="play-details-content-song-listview">
                    {
                        songListDetails.map((res, index) => {
                            return (
                                <div className="play-details-content-song-tip" key={index} onClick={() => {
                                    props.commonStore.getSongListDetails(songListDetails)
                                    sessionStorage.setItem('songListDetails', JSON.stringify(songListDetails))
                                    props.playerStore.handleSongListType("default")
                                    props.playerStore.handleGetSongId(res.id)
                                    props.history.push(`/musicplayer`)
                                }}>
                                    <div className="serial-number serial-numbers">
                                        {/* {(index + 1)}. */}
                                        <span>
                                            <img src={res.al.picUrl} alt=""/>
                                        </span>
                                    </div>
                                    <div className="serial-content-wrap">
                                        <div className='serial-content-song-name'><span className='name serial-content-song-names'>{res.name}</span> <span className='alias'>{JSON.stringify(res.alia) === '{}' || '[]' ? '' : `(${res.alia[0]})`}</span> </div>
                                        <div className='serial-content-song-author serial-content-song-names'>{res.ar[0].name} - {res.name}</div>
                                    </div>
                                    <div className="serial-all">
                                        <Icons className='playok-icon' un='&#xe615;' />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </>
}

export default inject('commonStore', 'playerStore')(observer(PgRecommendedDaily))