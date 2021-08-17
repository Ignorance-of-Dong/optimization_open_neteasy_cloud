import React, {useEffect, useState, useCallback, useRef} from 'react'
import './index.scss'
import { Icons, Headers } from 'components/index'
import query from 'utils/useQuery'
import { apiprogram, apidjdetail, apialbumlist } from 'api'
import {inject, observer} from 'mobx-react'
let ismore = true
function PgPlayDetails(props: any): JSX.Element {
    let [songListDetails, setsongListDetails] = useState<Array<any>>([])
    let [songListObj, setsongListObj] = useState<any>(null)
    let [titlePostion, setTitlePostion] = useState<boolean>(false)
    let [currentSelect, setCurrentSelect] = useState<number>(1)

    let headerRef = useRef(null)
    let titleRef = useRef(null)
    let listRef = useRef(null)

    const getapiplaylistDetail = useCallback( async (): Promise<any> => {
        let { id } = query()
        let params = {
            id: id,
            offset: songListDetails.length
        }
        await apiprogram(params).then(res => {
            ismore = res.more
            setsongListDetails([
                ...res.programs,
                ...songListDetails
            ])
            
        })
    }, [songListDetails])

    const getapitoplist = useCallback( async (): Promise<any> => {
        let { id } = query()
        let params = {
            id: id
        }
        await apidjdetail(params).then(res => {
            setsongListObj(res.data)
            // setsongListDetails(res.playlist.tracks)
        })
    }, [])

    const getalbumlist = useCallback(async (): Promise<any> => {
        let { id } = query()
        let params = {
            id: id
        }
        await apialbumlist(params).then(res => {
            // setsongListObj(res.album)
            // setsongListDetails(res.songs)
        })
    }, [])



    useEffect((): void => {
        getapitoplist()
        getapiplaylistDetail()
    }, [])


    const scrollFun = useCallback((e): void => {
        if (e.target.scrollTop > (titleRef.current.offsetHeight - headerRef.current.headerRef.current.offsetHeight)) {
            setTitlePostion(true)
        } else {
            setTitlePostion(false)
        }
        let currentH = (listRef.current.offsetHeight + titleRef.current.offsetHeight - document.documentElement.clientHeight) - 10
        let sctopH = e.target.scrollTop
        if (sctopH - currentH == 10) {
            console.log(ismore)
            if (!ismore) {
                console.log('没有东西了')
            } else {
                getapiplaylistDetail()
            }
        }
    }, [songListDetails])

    return (
        <>
            
            <div className="radio-details-wrap" onScroll={(e) => scrollFun(e)}>
                <div className="radio-details-title" ref={titleRef}>
                    <div className="radio-details-title-mask" style={{
                        backgroundImage: `url(${songListObj ? songListObj.picUrl || songListObj.blurPicUrl : 'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        // backgroundPosition: '10%'
                    }}></div>
                   
                    <Headers ref={headerRef} style={
                    {
                        backgroundColor: titlePostion ? '#fff' : '',
                        color: titlePostion ? '#000' : '',
                        boxShadow: titlePostion ? '-4px -7px 5px #fff' : ''
                    }
                    } 
                    otherEl={<div className="header-mask" style={
                        titlePostion 
                        ? 
                        {
                                backgroundImage: `url(${songListObj ? songListObj.picUrl || songListObj.blurPicUrl : 'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'})`,
                        } 
                        : 
                        {
                                background: `url(${songListObj ? songListObj.picUrl || songListObj.blurPicUrl : 'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'})`,
                        }
                    }></div>} 
                    className='postion-header' 
                    svgCol={!titlePostion ? '#fff' : ''}
                    props={props}>
                    
                        {songListObj ? songListObj.name : '加载中。。。'}
                    </Headers>
                    <div className="radio-details-title-mask-content">
                        <div className="radio-details-introduction">
                            <div className="radio-details-introduction-name">
                                {songListObj ? songListObj.name : ''}
                                <div className="count">
                                    52.9万人订阅
                                </div>
                            </div>
                            <div className="radio-details-introduction-subscribe">
                                <Icons className='radio-subscribe-icon' un='&#xe6cc;' />订阅
                            </div>
                        </div>
                    </div>
                </div>
                <div className="radio-details-content">
                    <div className="radio-details-content-title" style={{
                        position: titlePostion ? 'fixed' : 'relative',
                        top: titlePostion ? headerRef.current.headerRef.current.offsetHeight : 0,
                        zIndex: 5
                    }}>
                        <div className="radio-details-content-title-playok" onClick={() => {
                            // props.commonStore.getSongListDetails(songListDetails)
                            // sessionStorage.setItem('songListDetails', JSON.stringify(songListDetails))
                            // props.history.push(`/musicplayer?id=${songListDetails[0].id}`)
                        }}>
                            <div className="radio-details-content-title-left" style={{
                                color: currentSelect == 0 ? 'red' : ''
                            }} onClick={() => {
                                setCurrentSelect(0)
                            }}>
                                详情
                                <div className="line-postion" style={{ display: currentSelect == 0 ? 'block' : 'none'}}></div>
                            </div>
                            <div className="radio-details-content-title-right" style={{
                                color: currentSelect == 1 ? 'red' : ''
                            }} onClick={() => {
                                setCurrentSelect(1)
                            }}>
                                节目
                                <div className="line-postion" style={{ display: currentSelect == 1 ? 'block' : 'none' }}></div>
                            </div>
                        </div>
                    </div>
                    {
                        currentSelect ? 
                            <div className="radio-details-content-song-listview" ref={listRef}>
                                {
                                    songListDetails.map((res, index) => {
                                        
                                        return (
                                            <div className="play-details-content-song-tip" key={index} onClick={() => {
                                                props.commonStore.getSongListDetails(songListDetails)
                                                sessionStorage.setItem('songListDetails', JSON.stringify(songListDetails))
                                                props.playerStore.handleGetSongId(res.mainTrackId)
                                                console.log(res.mainTrackId, "点击的当前的ID")
                                                props.playerStore.handleSongListType("radio")
                                                props.history.push(`/musicplayer`)
                                            }}>
                                                <div className="serial-number">
                                                    {(index + 1)}.
                                                </div>
                                                <div className="serial-content-wrap">
                                                    <div className='serial-content-song-name'><span className='name serial-content-song-names'>
                                                        {res.name}
                                                    </span> 
                                                        {/* <span className='alias'>{JSON.stringify(res.alia) === '{}' || '[]' ? '' : `(${res.alia[0]})`}</span> */}</div> 
                                                    <div className='serial-content-song-author serial-content-song-names'>{res.radio.name}</div>
                                                </div>
                                                <div className="serial-all">
                                                    <Icons className='playok-icon' un='&#xe615;' />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        :
                        <>
                            <div className="radio-details-content-song-details">
                                <div className="radio-details-content-song-header">
                                    主播
                                </div>
                                <div className="radio-details-content-song-author">
                                    <div className="radio-details-content-song-author-pic">
                                            <img src={songListObj ? songListObj.dj.avatarUrl : ''} alt=""/>
                                    </div>
                                    <div className="radio-details-content-song-author-content">
                                        <div className="name">
                                                {songListObj ? songListObj.name : ''}
                                        </div>
                                        <div className="decise">
                                                {songListObj ? songListObj.desc : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className="radio-details-content-song-header">
                                    电台内容简介
                                        
                                </div>
                                <div className="radio-details-content-song-dection">
                                    <div className="radio-type">
                                            分类： {songListObj ? songListObj.category : ''}
                                    </div>
                                    <div className="radio-dectional">
                                            {songListObj ? songListObj.dj.signature : ''}
                                    </div>
                                </div>
                                <div className="radio-details-content-song-header">
                                    精彩评论
                                </div>
                                {
                                        songListObj ? songListObj.commentDatas.map(item => {
                                            return (
                                                <div className="radio-details-content-song-commont">
                                                    <div className="header-pic">
                                                        <img src={item.userProfile.avatarUrl} alt=""/>
                                                    </div>
                                                    <div className="commont-content">
                                                        <div className="c-name">
                                                            {item.userProfile.nickname}
                                                        </div>
                                                        <div className="c-content">
                                                            {item.content}
                                                        </div>
                                                        <div className="c-song">
                                                            - {item.programName}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) : ''
                                }
                                
                            </div>
                        </>
                    }
                    
                </div>
            </div>
        </>
    )
}

export default inject('commonStore', 'playerStore')(observer(PgPlayDetails))