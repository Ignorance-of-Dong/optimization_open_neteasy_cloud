import React, { useState, useRef ,useEffect, memo, useCallback} from 'react'
import './index.scss'
import { Headers, Icons, Toast } from '../../components'
import { Slider, Modal } from 'antd-mobile';
import formatSeconds from '../../utils/formatSeconds'
import query from '../../utils/useQuery'
import { apisongurl, apisongdetail, apilyric } from '../../api'
import Lyric from 'lyric-parser'
import { inject, observer } from 'mobx-react'

var lyazy = '11111'
interface currentProps{
    currenttime: number | string
}

function CurrentTime(props: currentProps) {
    return(
        <>
            {formatSeconds(props.currenttime) ? formatSeconds(props.currenttime) : '00:00'}
        </>
    )
}
interface speedProps{
    dropSpeed: Function,
    currenttime: any,
    musicTime: any
}
function Speed(props: speedProps) {
    useEffect(() => {
        console.log('Speed函数')
    }, [])
    const logs = useCallback(() => {
        return (value) => {
            props.dropSpeed(value)
        }
    }, [])
    return (
        <>
            <Slider
                handleStyle={{
                    width: 6,
                    height: 6,
                    marginLeft: -3,
                    marginTop: -2,
                    border: 0
                }}
                // dots={true}
                defaultValue={0}
                value={props.currenttime !== '00:00' ? props.currenttime : 0}
                min={0}
                max={props.musicTime !== '00:00' ? props.musicTime : 0}
                onChange={logs()}
            />
        </>
    )
}
const SpeedPro = memo(Speed)
interface ejectModuleProps{
    showModule: boolean,
    setshowModule: Function,
    getsongurl: Function,
    setChildModuleScroll: Function,
    [propName: string]: any;
}
function EjectModule(props: ejectModuleProps) {
    let [_state, _setstate] = useState(0)
    let [songListDetail, setsongListDetail] = useState([])
    let [id, setid] = useState('')
    let listRef = useRef(null)
    // let { id } = query()

    /**
     * 实时获取歌曲在列表的位子【并在切换上一首 | 下一首实时更新】
     */
    useEffect(() => {
        let { id } = query()
        let list = JSON.parse(sessionStorage.getItem('songListDetails'))
        setsongListDetail(list)
        list.forEach((item, index) => {
            if (item.id * 1 === id * 1) {
                _setstate(index)
                setTimeout(() => {
                    sessionStorage.setItem('currScrollTop', (50 * (index - 1)).toString())
                    listRef.current.scrollTop = 50 * (index - 1)
                }, 50)
            }
        })
    }, [id])

    /**
     * 弹层打开时设置歌曲列表scroll高度
     * @param scrollCurrent scroll高度
     */
    const setScroll = useCallback((scrollCurrent) => {
        if (listRef.current) {
            setTimeout(() => {
                listRef.current.scrollTop = scrollCurrent
                let { id } = query()
                setid(id)
            }, 50)
        }
    }, [])

    /**
     * 设置歌曲列表scroll高度
     */
    const setScrollTop = useCallback(() => {
        let list = props.Store.songListDetails.length ? props.Store.songListDetails.length : JSON.parse(sessionStorage.getItem('songListDetails'))
        let { id } = query()
        list.forEach((item, index) => {
            if (item.id * 1 === id * 1) {
                sessionStorage.setItem('currScrollTop', (50 * (index - 1)).toString())
                listRef.current.scrollTop = 50 * (index - 1)
            }
        })
    }, [])

    /**
     * 实时更新歌曲列表scroll高度
     */
    props.setChildModuleScroll(setScroll)

    /**
     * 初始化获取歌曲列表scroll高度
     */
    useEffect(() => {
        console.log('EjectModule函数')
        setScrollTop()
    }, [])

    /**
     * 切换音乐，并更新列表scroll高度
     * @param index 歌曲列表的下标
     * @param id 歌曲id
     */
    const selectMusic = useCallback((index, id) => {
        sessionStorage.setItem('currScrollTop', (50 * (index - 1)).toString())
        _setstate(index)
        props.history.replace(`/musicplayer?id=${id}`)
        props.getsongurl(id)
        listRef.current.scrollTop = 50 * (index - 1)
    }, [])
    return(
        <>
            <Modal
                popup
                visible={props.showModule}
                onClose={() => { props.setshowModule(false) }}
                animationType="slide-up"
            >
                <div className='eject-module-wrap'>
                    <div className="eject-module-wrap-title">
                        <div className="eject-module-wrap-title-left">
                            <Icons className='player-list-icon' un='&#xe7fe;' />
                            <span className='list-t'>播放列表</span>
                            <span className='list-len'>({songListDetail.length})</span>
                        </div>
                    </div>
                    <div className="eject-module-wrap-content-list" ref={listRef}>
                        {
                            songListDetail.map((res, index) => {
                                return(
                                    <div className="eject-module-wrap-content-tip" key={index}>
                                        <div className="eject-module-wrap-content-name" style={{ color: _state === index ? 'red' : ''}} onClick={() => {
                                            selectMusic(index, res.id)
                                        }}>
                                            {_state === index ? <Icons className='eject-module-icon' un='&#xe659;' /> : null}
                                            <div className="eject-module-wrap-music-name">
                                                {res.name}
                                            </div>
                                            <span style={{ color: _state === index ? 'red' : '' }}>&nbsp;-&nbsp;</span>
                                            <div className="eject-module-wrap-music-author" style={{ color: _state === index ? 'red' : '' }}>
                                                {/* {console.log(res)} */}
                                                {/* {res.ar[0].name} */}
                                                {res.ar ? res.ar[0].name : res.artists[0].name}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Modal>
        </>
    )
}

const EjectModulePro = memo(EjectModule)
function PgMusicPlayer(props: any) {
    let [statePlay, setstatePlay] = useState(false)
    let [musicTime, setmusicTime] = useState('00:00')
    let [currenttime, setcurrenttime] = useState('00:00')
    let [showModule, setshowModule] = useState(true)
    let [songUrl, setsongUrl] = useState('')
    let [songDetails, setsongDetails] = useState(null)
    let [lyric, setlyric] = useState([])
    let [showlyric, setshowlyric] = useState('Start')
    let audiosRef = useRef(null)

    // 事件监听开始 / 停止
    const PlayOrPause = useCallback( async () => {
        setstatePlay(false)
        setcurrenttime('00:00')
        await goLastSong(typeCheck[0])
        setTimeout(() => {setstatePlay(true)}, 1000)
    }, [])

    // 事件监听 歌曲播放进度
    const CurrentPlaybackProgress = useCallback(() => {
        setcurrenttime(audiosRef.current.currentTime)
    }, [])

    /**
     * 执行播放 | 暂停
     */
    useEffect(() => {
        if (statePlay) {
            audiosRef.current.play().then((res) => {
                setmusicTime(audiosRef.current.duration)
                audiosRef.current.addEventListener("timeupdate", CurrentPlaybackProgress, false)
                audiosRef.current.addEventListener("ended", PlayOrPause, false)
            }).catch(err => {
                audiosRef.current.pause()
                setstatePlay(false)
                Toast('加载歌曲失败,请重试！', 2000)
            })
        } else {
            audiosRef.current.pause()
        }
    }, [statePlay])

    /**
     * 获取歌曲的链接地址【歌曲详情，歌曲歌词】
     * @param id 歌曲id
     */
    const getsongurl = useCallback((id) => {
        audiosRef.current.pause()
        setstatePlay(false)
        let params = {
            id: id
        }
        try{
            apisongdetail(params).then(res => {
                console.log(res)
                setsongDetails(res.songs[0])
            })
            apisongurl(params).then(res => {
                setsongUrl(res.data[0].url)
            })
            apilyric(params).then(res => {
                let l = new Lyric(res.lrc.lyric, () => { })
                setlyric(l.lines)
            })
        }catch(err) {
            Toast('网络请求异常，请两分钟后再试', 2000)
        }
        
    }, [])

    /**
     * 获取歌曲播放链接地址【初始化获取】
     */
    useEffect(() => {
        let { id } = query()
        getsongurl(id)
    }, [])
    
    /**
     * 实时更新进度条【播放时间i】
     */
    const dropSpeed = useCallback((currenttime) => {
        setcurrenttime(currenttime ? currenttime : 0)
        audiosRef.current.currentTime = currenttime
    }, [])

    /**
     * 打开播放列表弹层
     */
    const openModule = useCallback(() => {
        setshowModule(true)
    }, [])

    /**
     * 设置播放列表的scroll定位i高度
     * @param callback 回调函数
     */
    const setChildModuleScroll = useCallback((callback) => {
        let currScrollTop = sessionStorage.getItem('currScrollTop')
        callback(currScrollTop)
    }, [])


    enum typeCheck { add, last }

    /**
     * 获取上一首 | 下一首
     * @param type 上一首或者下一首类型
     */
    const goLastSong = useCallback((type) => {
        let { id } = query()
        let list = JSON.parse(sessionStorage.getItem('songListDetails'))
        let _index = 0
        for(let i = 0; i < list.length - 1; i++) {
            if (list[i].id * 1 === id * 1) {
                if (type === typeCheck[1]) {
                    _index = i - 1
                } else {
                    _index = i + 1
                }
                if (_index < 0) {
                    _index = 0
                    return
                }
                if (_index > list.length) {
                    _index = list.length
                    return
                }
                audiosRef.current.pause()
                setstatePlay(false)
                type === 'last' ? getsongurl(list[_index].id) : getsongurl(list[_index].id)
                type === 'last' ? props.history.replace(`/musicplayer?id=${list[_index].id}`) : props.history.replace(`/musicplayer?id=${list[_index].id}`)
            }
        }
    }, [])

    /**
     * 实时更新歌词
     */
    useEffect(() => {
        let _index = 0
        for (let i = 0; i < lyric.length - 1; i++) {
            if (parseInt((lyric[i].time / 1000).toString()) === parseInt(currenttime)) {
                if (i === 0) {
                    _index = 0
                } else {
                    _index = i + 1
                }
                lyazy = lyric[_index].txt
            }
            setshowlyric(lyazy)
        }
    }, [currenttime, lyric])
    return (
        <>
            <div className="audios">
                <audio src={songUrl} controls preload="auto" ref={audiosRef} />
            </div>
            
            <div className="music-player-wraps-mask" style={{
                background: `url(${songDetails ? songDetails.al.picUrl : 'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: '10%'
            }}>
            </div>
            <div className="music-player-wraps">
                <Headers props={props}>{songDetails ? songDetails.name : '加载中...'}</Headers>
                <div className="music-player-content-logo">
                    <div className="rotate-music-logo-wraps" style={{ animationPlayState: statePlay ? 'running' : 'paused'}}>
                        <div className="rotate-music-logo">
                            <img src={songDetails ? songDetails.al.picUrl : 'http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg'} alt="" />
                        </div>
                        
                    </div>
                    <div className="lyric-content">
                        {showlyric}
                    </div>
                </div>
                <div className="music-player-conster-ok">
                    <div className="music-player-conster-top">
                        <span>
                            <Icons className='like-icon' un='&#xe610;' />
                        </span>
                        <span>
                            <Icons className='download-icon' un='&#xe667;' />
                        </span>
                        <span>
                            <Icons className='sound-icon' un='&#xe639;' />
                        </span>
                        <span>
                            <Icons className='comm-icon' un='&#xe79a;' />
                        </span>
                        <span>
                            <Icons className='more-icon' un='&#xe612;' />
                        </span>
                    </div>
                    <div className="music-player-conster-center">
                        <div className="m-p-c-c-l">
                            <CurrentTime currenttime={currenttime}/>
                        </div>
                        <div className="m-p-c-c-c">
                            <SpeedPro currenttime={currenttime} musicTime={musicTime} dropSpeed={dropSpeed}/>
                        </div>
                        <div className="m-p-c-c-r">
                            {musicTime ? formatSeconds(musicTime) : "00:00"}
                        </div>

                    </div>
                    <div className="music-player-conster-bottom">
                        <span>
                            <Icons className='loop-icon' un='&#xe620;' />
                        </span>
                        <span>
                            <Icons className='upper-icon' un='&#xe61e;' onClick={() => {
                                goLastSong(typeCheck[1])
                            }}/>
                        </span>
                        <span onClick={() => {setstatePlay(!statePlay)}}>
                            {statePlay ? <Icons className='player-icon' un='&#xe60f;' /> : <Icons className='player-icon' un='&#xe628;' />}
                        </span>
                        <span>
                            <Icons className='lower-icon' un='&#xe7a9;' onClick={() => {
                                goLastSong(typeCheck[0])
                            }}/>
                        </span>
                        <span>
                            <Icons className='list-icon' un='&#xe61a;' onClick={() => {
                                openModule()
                            }}/>
                            <EjectModulePro 
                                showModule={showModule} 
                                setshowModule={setshowModule} 
                                getsongurl={getsongurl} 
                                setChildModuleScroll={setChildModuleScroll}
                                {...props}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default inject('Store')(observer(PgMusicPlayer))