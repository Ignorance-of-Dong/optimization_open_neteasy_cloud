import React, {useEffect, useState, useCallback, useRef} from 'react'
import './index.scss'
import { Icons, Headers } from 'components/index'
import query from 'utils/useQuery'
import { apiplaylistDetail, apitoplist, apialbumlist, apisongdetail, apiTopListDetail } from 'api'
import {inject, observer} from 'mobx-react'
const controller = new AbortController();
const { signal } = controller;
function PgPlayDetails(props: any): JSX.Element {
    let [songListDetails, setsongListDetails] = useState<Array<any>>([])
    let [songListObj, setsongListObj] = useState<any>(null)
    let [titlePostion, setTitlePostion] = useState<boolean>(false)

    let headerRef = useRef(null)
    let titleRef = useRef(null)

    // 获取当前 歌单详情
    const getapiplaylistDetail = useCallback( async (): Promise<any> => {
        let { id } = query()
        // 判断当前歌单id是否和Store内部存储的id相同 => 如果相同则取缓存数据
        if (id != props.commonStore.trackId) {

            // 存储歌单id
            props.commonStore.localTrackId(id)
            let res = await apiplaylistDetail({id: id})
            props.commonStore.setTrackDetail(res.playlist)
            let list: Array<any> = res.playlist.trackIds || []
            let newTrackListPromise: Array<any> = [];
            // 当获取数据超过100条时，只取前100条进行渲染
            for (let index = 0; index < list.length; index++) {
                if (index < 100) {
                    newTrackListPromise.push(apisongdetail({id: list[index].id}, { signal }))
                }
            }
            console.log(newTrackListPromise)
            // 批量请求歌单内每一部歌曲的详情
            let trackList = await Promise.all(newTrackListPromise)
            console.log(trackList, "trackList")
            let formatTrackList = trackList.map((item: any) => {
                return item = item.songs[0]
            })
            props.commonStore.setTrackList(formatTrackList)
        }
        setsongListObj(props.commonStore.trackDetail)
        setsongListDetails(props.commonStore.trackList)
    }, [songListDetails, songListObj])

    const getapitoplist = useCallback( async (): Promise<any> => {
        let { id } = query()
        let res = await apitoplist({id: id})
        setsongListObj(res.playlist)
        setsongListDetails(res.playlist.tracks)
    }, [])

    const getalbumlist = useCallback(async (): Promise<any> => {
        let { id } = query()
        let res = await apialbumlist({id: id})
        setsongListObj(res.album)
        setsongListDetails(res.songs)
    }, [])

    const getTopDetail = useCallback(() => {
        let res = apiTopListDetail();
        console.log(res)
    }, [])



    useEffect(() => {
        let { isList, isAlumb } = query()

        console.log(props, "ppp")
        if (isAlumb) {
            getalbumlist()
            return;
        }
        getapiplaylistDetail()
        
    }, [])

    useEffect(() => {
        return function cleanup() {
            console.log("我被执行了")
            // controller.abort();
        }
    }, [])

    // 处理头部高斯背景 => 通过滑动距离计算头部歌单logo的显示方式
    const scrollFun = useCallback((e): void => {
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
                        background: `url(${songListObj ? songListObj.coverImgUrl || songListObj.blurPicUrl : 'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'})`,
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
                            backgroundImage: `url(${songListObj ? songListObj.coverImgUrl || songListObj.blurPicUrl : 'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'})`,
                        } 
                        : 
                        {
                            background: `url(${songListObj ? songListObj.coverImgUrl || songListObj.blurPicUrl : 'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'})`,
                        }
                    }></div>} 
                    className='postion-header' 
                    svgCol='#fff'
                    props={props}>
                    
                        {songListObj ? songListObj.name : '加载中。。。'}
                    </Headers>
                    <div className="play-details-title-mask-content">
                        
                        <div className="play-details-left-pic">
                            <img src={songListObj ? songListObj.coverImgUrl || songListObj.blurPicUrl : ''} alt="" />
                        </div>
                        <div className="play-details-right-detail">
                            <div className='play-details-right-detail-title'>{songListObj ? songListObj.name : ''}</div>
                            <div className="play-details-right-detail-author">
                                <div className="play-details-right-detail-author-header">
                                    <img src={songListObj ? songListObj.coverImgUrl || songListObj.blurPicUrl : ''} alt="" />
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
                            props.commonStore.getSongListDetails(songListDetails)
                            sessionStorage.setItem('songListDetails', JSON.stringify(songListDetails))
                            props.playerStore.handleGetSongId(songListDetails[0].id)
                            props.playerStore.handleSongListType("default")
                            props.history.push(`/musicplayer`)
                        }}>
                            <Icons className='playok-icon' un='&#xe615;' />
                            <p className='start-play-all'>播放全部<span className='song-number'>(共{songListDetails.length}首)</span></p>
                        </div>
                    </div>
                    <div className="play-details-content-song-listview">
                        {
                            songListDetails.length && songListDetails.map((res, index) => {
                                return (
                                    <div className="play-details-content-song-tip" key={index} onClick={() => {
                                        props.commonStore.getSongListDetails(songListDetails)
                                        sessionStorage.setItem('songListDetails', JSON.stringify(songListDetails))
                                        props.playerStore.handleGetSongId(res.id)
                                        props.playerStore.handleSongListType("default")
                                        props.history.push(`/musicplayer`)
                                    }}>
                                        <div className="serial-number">
                                            {(index + 1)}.
                                        </div>
                                        <div className="serial-content-wrap">
                                            <div className='serial-content-song-name'><span className='name serial-content-song-names'>{res.name}</span> <span className='alias'>{JSON.stringify(res.alia) === '{}' || '[]' ? '' : `(${res.alia[0]})`}</span> </div>
                                            <div className='serial-content-song-author serial-content-song-names'>{res.ar[0].name}</div>
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

export default inject("commonStore", "playerStore")(observer(PgPlayDetails))