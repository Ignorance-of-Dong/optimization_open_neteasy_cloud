import React, {
    useState,
    useRef,
    useEffect,
    memo,
    useCallback,
    ForwardRefExoticComponent
} from "react";
import "./index.scss";
import { Headers, Icons, Toasts } from "components/index";
import { Slider, Modal } from "antd-mobile";
import formatSeconds from "utils/formatSeconds";
import query from "utils/useQuery";
import { apisongurl, apisongdetail, apilyric } from "api";
import Lyric from "lyric-parser";
import { inject, observer } from "mobx-react";
import PlayerModule from "components/PlayerModule"
import { promises } from "fs";

var lyazy = "......";
interface currentProps {
    currenttime: number | string;
}

function CurrentTime(props: currentProps): JSX.Element {
    return (
        <>
            {formatSeconds(props.currenttime)
                ? formatSeconds(props.currenttime)
                : "00:00"}
        </>
    );
}

interface speedProps {
    dropSpeed: Function;
    currenttime: any;
    musicTime: any;
}
function Speed(props: speedProps): JSX.Element {
    useEffect(() => {
        console.log("Speed函数");
    }, []);

    const logs = useCallback(() => {
        return value => {
            props.dropSpeed(value);
        };
    }, []);

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
                value={props.currenttime !== "00:00" ? props.currenttime : 0}
                min={0}
                max={props.musicTime !== "00:00" ? props.musicTime : 0}
                onChange={logs()}
            />
        </>
    );
}


const SpeedPro: ForwardRefExoticComponent<any> = memo(Speed);




const EjectModulePro: ForwardRefExoticComponent<any> = memo(PlayerModule);

function PgMusicPlayer(props: any): JSX.Element {

    let { handlePlayerState, handleGetSongDetail, handleGetSongUrl, handleSongCurrentTime } = props.playerStore;
    

    // let [currenttime, setcurrenttime] = useState<string>("00:00");
    let [showModule, setshowModule] = useState<boolean>(true);
    let [lyric, setlyric] = useState<Array<any>>([]);
    let [showlyric, setshowlyric] = useState<string>("");

    useEffect((): void => {
        console.log("执行播放器主界面");
    }, []);

    /**
     * 获取歌曲的链接地址【歌曲详情，歌曲歌词】
     * @param id 歌曲id
     */
    // const getsongurl = useCallback(async (id: string) => {
    //     props.playerStore.audiosRef.current.pause();
    //     handlePlayerState(false);
    //     try {
    //         await handleGetSongDetail({ id: id })
    //         await handleGetSongUrl({ id: id })
    //         // let { isRadio } = query();
    //         // if (!isRadio) {
    //         //   apilyric({id: id}).then(res => {
    //         //     let l = new Lyric(res.lrc.lyric, () => { });
    //         //     setlyric(l.lines);
    //         //   });
    //         // }
    //     } catch (err) { }
    // },
    //     []
    // );

    /**
     * 获取歌曲播放链接地址【初始化获取】
     */
    useEffect((): void => {
        props.playerStore.handleInitSong();
        console.log(props.playerStore, "props");
    }, []);

    /**
     * 实时更新进度条【播放时间i】
     */
    const dropSpeed = useCallback((currenttime): void => {
        handleSongCurrentTime(currenttime ? currenttime : 0);
        props.playerStore.audiosRef.current.currentTime = currenttime;
    }, []);

    /**
     * 打开播放列表弹层
     */
    const openModule = useCallback((): void => {
        setshowModule(true);
    }, []);

    /**
     * 设置播放列表的scroll定位i高度
     * @param callback 回调函数
     */
    const setChildModuleScroll = useCallback((callback): void => {
        let currScrollTop = sessionStorage.getItem("currScrollTop");
        callback(currScrollTop);
    }, []);

    enum typeCheck {
        add,
        last
    }
    /**
     * 实时更新歌词
     */
    // useEffect((): void => {
    //     let _index = 0;
    //     for (let i = 0; i < lyric.length - 1; i++) {
    //         if (
    //             parseInt((lyric[i].time / 1000).toString()) === parseInt(currenttime)
    //         ) {
    //             if (i === 0) {
    //                 _index = 0;
    //             } else {
    //                 _index = i + 1;
    //             }
    //             lyazy = lyric[_index].txt;
    //         }
    //         setshowlyric(lyazy);
    //     }
    // }, [currenttime, lyric]);


    let {songTotalTime, songCurrentTime} = props.playerStore;
    return (
        <>
            {/* <div className="audios">
        <audio src={props.playerStore.currentSongUrl} controls preload="auto" ref={audiosRef} />
      </div> */}

            {/* <div className="run" style={{background: `${props.commonStore.color}`}} onClick={() => {
                props.commonStore.setShow()
            }}></div> */}

            <div
                className="music-player-wraps-mask"
                style={{
                    background: `url(${props.playerStore.handleGetPic(props.playerStore.songDetail)})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "10%"
                }}
            ></div>
            <div className="music-player-wraps">
                <Headers props={props}>{props.playerStore.handleGetName(props.playerStore.songDetail)}</Headers>
                <div className="music-player-content-logo">
                    <div
                        className="rotate-music-logo-wraps"
                        style={{ animationPlayState: props.playerStore.playerState ? "running" : "paused" }}
                    >
                        <div className="rotate-music-logo">
                            <img src={props.playerStore.handleGetPic(props.playerStore.songDetail)} alt="" />
                        </div>
                    </div>
                    <div className="lyric-content">{showlyric}</div>
                </div>
                <div className="music-player-conster-ok">
                    <div className="music-player-conster-top">
                        <span>
                            <Icons className="like-icon" un="&#xe610;" />
                        </span>
                        <span>
                            <Icons className="download-icon" un="&#xe667;" />
                        </span>
                        <span>
                            <Icons className="sound-icon" un="&#xe639;" />
                        </span>
                        <span>
                            <Icons className="comm-icon" un="&#xe79a;" />
                        </span>
                        <span>
                            <Icons className="more-icon" un="&#xe612;" />
                        </span>
                    </div>
                    <div className="music-player-conster-center">
                        <div className="m-p-c-c-l">
                            <CurrentTime currenttime={songCurrentTime} />
                        </div>
                        <div className="m-p-c-c-c">
                            <SpeedPro
                                currenttime={songCurrentTime}
                                musicTime={songTotalTime}
                                dropSpeed={dropSpeed}
                            />
                        </div>
                        <div className="m-p-c-c-r">
                            {songTotalTime ? formatSeconds(songTotalTime) : "00:00"}
                        </div>
                    </div>
                    <div className="music-player-conster-bottom">
                        <span>
                            <Icons className="loop-icon" un="&#xe620;" />
                        </span>
                        <span>
                            <Icons
                                className="upper-icon"
                                un="&#xe61e;"
                                onClick={() => {
                                    props.playerStore.handleSwitchSongs(typeCheck[1]);
                                }}
                            />
                        </span>
                        <span
                            onClick={() => {
                                handlePlayerState(!props.playerStore.playerState);
                            }}
                        >
                            {props.playerStore.playerState ? (
                                <Icons className="player-icon" un="&#xe60f;" />
                            ) : (
                                <Icons className="player-icon" un="&#xe628;" />
                            )}
                        </span>
                        <span>
                            <Icons
                                className="lower-icon"
                                un="&#xe7a9;"
                                onClick={() => {
                                    props.playerStore.handleSwitchSongs(typeCheck[0]);
                                }}
                            />
                        </span>
                        <span>
                            <Icons
                                className="list-icon"
                                un="&#xe61a;"
                                onClick={() => {
                                    openModule();
                                }}
                            />
                            <EjectModulePro
                                showModule={showModule}
                                setshowModule={setshowModule}
                                getsongurl={props.playerStore.handleInitSong}
                                setChildModuleScroll={setChildModuleScroll}
                                {...props}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default inject("playerStore")(observer(PgMusicPlayer));
