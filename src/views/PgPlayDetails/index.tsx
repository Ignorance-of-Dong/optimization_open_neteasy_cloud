import React, {useEffect, useState, useCallback, useRef} from 'react'
import './index.scss'
import { Icons, Headers } from 'components/index'
import query from 'utils/useQuery'
import { apiplaylistDetail } from 'api'
import {inject, observer} from 'mobx-react'
function PgPlayDetails(props: any) {
    let [songListDetails, setsongListDetails] = useState([])
    let [songListObj, setsongListObj] = useState(null)
    let [titlePostion, setTitlePostion] = useState(false)
    let headerRef = useRef(null)
    let titleRef = useRef(null)

    const getapiplaylistDetail = useCallback( async (): Promise<any> => {
        let { id } = query()
        let params = {
            id: id
        }
        await apiplaylistDetail(params).then(res => {
            setsongListObj(res.playlist)
            setsongListDetails(res.playlist.tracks)
        }).catch(err => {
        })
    }, [songListDetails, songListObj])

    useEffect(() => {
        console.log(headerRef.current.headerRef.current.offsetHeight)
        getapiplaylistDetail()
    }, [])

    const scrollFun = useCallback((e) => {
        if (e.target.scrollTop > (titleRef.current.offsetHeight - headerRef.current.headerRef.current.offsetHeight)) {
            setTitlePostion(true)
        } else {
            setTitlePostion(false)
        }
    }, [])

    return (
        <>
            
            <div className="play-details-wrap" onScroll={(e) => scrollFun(e)}>
                <div className="play-details-title" ref={titleRef}>
                    <div className="play-details-title-mask" style={{
                        background: `url(${songListObj ? songListObj.coverImgUrl : 'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: '10%'
                    }}></div>
                   
                    <Headers ref={headerRef} style={
                    {
                        backgroundColor: titlePostion ? '#fff' : ''
                    }
                    } 
                    otherEl={<div className="header-mask" style={
                        titlePostion 
                        ? 
                        {
                            backgroundImage: `url(${songListObj ? songListObj.coverImgUrl : 'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'})`,
                        } 
                        : 
                        {
                            background: `url(${songListObj ? songListObj.coverImgUrl : 'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'})`,
                        }
                    }></div>} 
                    className='postion-header' 
                    svgCol='#fff'
                    props={props}>
                    
                        {songListObj ? songListObj.name : '加载中。。。'}
                    </Headers>
                    <div className="play-details-title-mask-content">
                        
                        <div className="play-details-left-pic">
                            <img src={songListObj ? songListObj.coverImgUrl : ''} alt="" />
                        </div>
                        <div className="play-details-right-detail">
                            <div className='play-details-right-detail-title'>{songListObj ? songListObj.name : ''}</div>
                            <div className="play-details-right-detail-author">
                                <div className="play-details-right-detail-author-header">
                                    <img src={songListObj ? songListObj.coverImgUrl : ''} alt="" />
                                </div>
                                <div className="play-details-right-detail-author-name">
                                    {songListObj ? songListObj.nickname : ''}
                            </div>
                            </div>
                            <div className="play-details-right-detail-introduce">
                                {songListObj ? songListObj.description : ''}
                        </div>
                        </div>
                    </div>
                </div>
                <div className="play-details-content">
                    <div className="play-details-content-title" style={{
                        position: titlePostion ? 'fixed' : 'relative',
                        top: titlePostion ? headerRef.current.headerRef.current.offsetHeight : 0,
                        zIndex: 5
                    }}>
                        <div className="play-details-content-title-playok" onClick={() => {
                            props.Store.getSongListDetails(songListDetails)
                            sessionStorage.setItem('songListDetails', JSON.stringify(songListDetails))
                            props.history.push(`/musicplayer?id=${songListDetails[0].id}`)
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
                                        props.Store.getSongListDetails(songListDetails)
                                        sessionStorage.setItem('songListDetails', JSON.stringify(songListDetails))
                                        props.history.push(`/musicplayer?id=${res.id}`)
                                    }}>
                                        <div className="serial-number">
                                            {(index + 1)}.
                                        </div>
                                        <div className="serial-content-wrap">
                                            <div className='serial-content-song-name'><span className='name'>{res.name}</span> <span className='alias'>{JSON.stringify(res.alia) === '{}' || '[]' ? '' : `(${res.alia[0]})`}</span> </div>
                                            <div className='serial-content-song-author'>{res.ar[0].name}</div>
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
    )
}

export default inject('Store')(observer(PgPlayDetails))