import React, {useEffect, useState, useCallback} from 'react'
import './index.scss'
import { Icons, Headers } from '../../components'
import query from '../../utils/useQuery'
import { apiplaylistDetail } from '../../api'
import {inject, observer} from 'mobx-react'
function PgPlayDetails(props: any) {
    let [songListDetails, setsongListDetails] = useState([])
    let [songListObj, setsongListObj] = useState(null)

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
        getapiplaylistDetail()
    }, [])

    return (
        <>
            
            <div className="play-details-wrap">
                <div className="play-details-title">
                    <div className="play-details-title-mask" style={{
                        background: `url(${songListObj ? songListObj.coverImgUrl : 'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: '10%'
                    }}></div>
                    <Headers className='postion-header' props={props}>{songListObj ? songListObj.name : '加载中。。。'}</Headers>
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
                    <div className="play-details-content-title">
                        <div className="play-details-content-title-playok">
                            <Icons className='playok-icon' un='&#xe615;' />
                            <p className='start-play-all'>播放全部<span className='song-number'>(共56首)</span></p>
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