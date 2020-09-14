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
interface ejectModuleProps {
  showModule: boolean;
  setshowModule: Function;
  getsongurl: Function;
  setChildModuleScroll: Function;
  [propName: string]: any;
}

function EjectModule(props: ejectModuleProps): JSX.Element {
  let [_state, _setstate] = useState<number>(0);
  let [songListDetail, setsongListDetail] = useState<Array<any>>([]);
  let [id, setid] = useState<string>("");
  let listRef = useRef(null);

  /**
   * 实时获取歌曲在列表的位子【并在切换上一首 | 下一首实时更新】
   */
  useEffect((): void => {
    let { id, isRadio } = query();
    let list = JSON.parse(sessionStorage.getItem("songListDetails"));
    setsongListDetail(list);
    let okid = isRadio ? "mainTrackId" : "id";
    list.forEach((item, index) => {
      if (item[okid] * 1 === id * 1) {
        _setstate(index);
        setTimeout(() => {
          sessionStorage.setItem(
            "currScrollTop",
            (50 * (index - 1)).toString()
          );
          listRef.current.scrollTop = 50 * (index - 1);
        }, 50);
      }
    });
  }, [id]);

  /**
   * 弹层打开时设置歌曲列表scroll高度
   * @param scrollCurrent scroll高度
   */
  const setScroll = useCallback((scrollCurrent): void => {
    if (listRef.current) {
      setTimeout(() => {
        listRef.current.scrollTop = scrollCurrent;
        let { id } = query();
        setid(id);
      }, 50);
    }
  }, []);

  /**
   * 设置歌曲列表scroll高度
   */
  const setScrollTop = useCallback((): void => {
    let list = JSON.parse(sessionStorage.getItem("songListDetails"));
    let { id, isRadio } = query();
    let okid = isRadio ? "mainTrackId" : "id";
    list.forEach((item, index) => {
      if (item[okid] * 1 === id * 1) {
        sessionStorage.setItem("currScrollTop", (50 * (index - 1)).toString());
        listRef.current.scrollTop = 50 * (index - 1);
      }
    });
  }, []);

  /**
   * 实时更新歌曲列表scroll高度
   */
  props.setChildModuleScroll(setScroll);

  /**
   * 初始化获取歌曲列表scroll高度
   */
  useEffect((): void => {
    console.log("EjectModule函数");
    setScrollTop();
  }, []);

  /**
   * 切换音乐，并更新列表scroll高度
   * @param index 歌曲列表的下标
   * @param id 歌曲id
   */
  const selectMusic = useCallback((index, id): void => {
    sessionStorage.setItem("currScrollTop", (50 * (index - 1)).toString());
    _setstate(index);
    let { isRadio } = query();
    if (isRadio) {
      props.history.replace(`/musicplayer?id=${id}&isRadio=${true}`);
    } else {
      props.history.replace(`/musicplayer?id=${id}`);
    }

    props.getsongurl(id);
    listRef.current.scrollTop = 50 * (index - 1);
  }, []);
  let { isRadio } = query();
  return (
    <>
      <div className="m-p-w-m">
        <Modal
          className="moduel-medit-wrap"
          popup
          visible={props.showModule}
          onClose={() => {
            props.setshowModule(false);
          }}
          animationType="slide-up"
        >
          <div className="eject-module-wrap">
            <div className="eject-module-wrap-title">
              <div className="eject-module-wrap-title-left">
                <Icons className="player-list-icon" un="&#xe7fe;" />
                <span className="list-t">播放列表</span>
                <span className="list-len">({songListDetail.length})</span>
              </div>
            </div>
            <div className="eject-module-wrap-content-list" ref={listRef}>
              {songListDetail.map((res, index) => {
                return (
                  <div className="eject-module-wrap-content-tip" key={index}>
                    <div
                      className="eject-module-wrap-content-name"
                      style={{ color: _state === index ? "red" : "" }}
                      onClick={() => {
                        let { isRadio } = query();
                        let okid = isRadio ? "mainTrackId" : "id";
                        selectMusic(index, res[okid]);
                      }}
                    >
                      {_state === index ? (
                        <Icons className="eject-module-icon" un="&#xe659;" />
                      ) : null}
                      <div className="eject-module-wrap-music-name">
                        {res.name}
                      </div>
                      <span style={{ color: _state === index ? "red" : "" }}>
                        &nbsp;-&nbsp;
                      </span>
                      <div
                        className="eject-module-wrap-music-author"
                        style={{ color: _state === index ? "red" : "" }}
                      >
                        {isRadio
                          ? res.radio.name
                          : res.ar
                          ? res.ar[0].name
                          : res.artists[0].name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

const EjectModulePro: ForwardRefExoticComponent<any> = memo(EjectModule);

function PgMusicPlayer(props: any): JSX.Element {
  let [statePlay, setstatePlay] = useState<boolean>(false);
  let [musicTime, setmusicTime] = useState<string>("00:00");
  let [currenttime, setcurrenttime] = useState<string>("00:00");
  let [showModule, setshowModule] = useState<boolean>(true);
  let [songUrl, setsongUrl] = useState<string>("");
  let [songDetails, setsongDetails] = useState<any>(null);
  let [lyric, setlyric] = useState<Array<any>>([]);
  let [showlyric, setshowlyric] = useState<string>("");
  let audiosRef = useRef(null);

  // 事件监听开始 / 停止
  const PlayOrPause = useCallback(async (): Promise<any> => {
    setstatePlay(false);
    setcurrenttime("00:00");
    await goLastSong(typeCheck[0]);
    setTimeout(() => {
      setstatePlay(true);
    }, 1000);
  }, []);

  // 事件监听 歌曲播放进度
  const CurrentPlaybackProgress = useCallback((): void => {
    setcurrenttime(audiosRef.current.currentTime);
  }, []);

  useEffect((): void => {
    console.log("执行播放器主界面");
  }, []);

  /**
   * 执行播放 | 暂停
   */
  useEffect((): void => {
    if (statePlay) {
      audiosRef.current
        .play()
        .then(res => {
          setmusicTime(audiosRef.current.duration);
          audiosRef.current.addEventListener(
            "timeupdate",
            CurrentPlaybackProgress,
            false
          );
          audiosRef.current.addEventListener("ended", PlayOrPause, false);
        })
        .catch(err => {
          audiosRef.current.pause();
          setstatePlay(false);
          Toasts("加载歌曲失败,请重试！", 2000);
        });
    } else {
      audiosRef.current.pause();
    }
  }, [statePlay]);

  /**
   * 获取歌曲的链接地址【歌曲详情，歌曲歌词】
   * @param id 歌曲id
   */
  const getsongurl = useCallback(
    (id): void => {
      audiosRef.current.pause();
      setstatePlay(false);
      let params = {
        id: id
      };
      try {
        apisongdetail(params).then(res => {
          setsongDetails(res.songs[0]);
        });
        apisongurl(params).then(res => {
          setsongUrl(res.data[0].url);
          setstatePlay(true);
        });
        let { isRadio } = query();
        if (!isRadio) {
          apilyric(params).then(res => {
            let l = new Lyric(res.lrc.lyric, () => {});
            setlyric(l.lines);
          });
        }
      } catch (err) {}
    },
    [songUrl]
  );

  /**
   * 获取歌曲播放链接地址【初始化获取】
   */
  useEffect((): void => {
    let { id } = query();
    getsongurl(id);
    console.log(props.Store, "props");
  }, []);

  /**
   * 实时更新进度条【播放时间i】
   */
  const dropSpeed = useCallback((currenttime): void => {
    setcurrenttime(currenttime ? currenttime : 0);
    audiosRef.current.currentTime = currenttime;
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
   * 获取上一首 | 下一首
   * @param type 上一首或者下一首类型
   */
  const goLastSong = useCallback(
    (type): void => {
      let { id, isRadio } = query();
      let list = JSON.parse(sessionStorage.getItem("songListDetails"));
      let _index = 0;
      let okid = isRadio ? "mainTrackId" : "id";
      for (let i = 0; i < list.length - 1; i++) {
        if (list[i][okid] * 1 === id * 1) {
          if (type === typeCheck[1]) {
            _index = i - 1;
          } else {
            _index = i + 1;
          }
          if (_index < 0) {
            _index = 0;
            return;
          }
          if (_index > list.length) {
            _index = list.length;
            return;
          }
          audiosRef.current.pause();
          setstatePlay(false);
          if (isRadio) {
            type === "last"
              ? getsongurl(list[_index].mainTrackId)
              : getsongurl(list[_index].mainTrackId);
            type === "last"
              ? props.history.replace(
                  `/musicplayer?id=${list[_index].mainTrackId}&isRadio=${true}`
                )
              : props.history.replace(
                  `/musicplayer?id=${list[_index].mainTrackId}&isRadio=${true}`
                );
          } else {
            type === "last"
              ? getsongurl(list[_index].id)
              : getsongurl(list[_index].id);
            type === "last"
              ? props.history.replace(`/musicplayer?id=${list[_index].id}`)
              : props.history.replace(`/musicplayer?id=${list[_index].id}`);
          }

          setTimeout(() => {
            setstatePlay(true);
          }, 1000);
        }
      }
    },
    [songUrl]
  );

  /**
   * 实时更新歌词
   */
  useEffect((): void => {
    let _index = 0;
    for (let i = 0; i < lyric.length - 1; i++) {
      if (
        parseInt((lyric[i].time / 1000).toString()) === parseInt(currenttime)
      ) {
        if (i === 0) {
          _index = 0;
        } else {
          _index = i + 1;
        }
        lyazy = lyric[_index].txt;
      }
      setshowlyric(lyazy);
    }
  }, [currenttime, lyric]);

  const getAudioState = useCallback((type): string => {
    let { id } = query();
    let list = JSON.parse(sessionStorage.getItem("songListDetails"));
    for (let i = 0; i < list.length - 1; i++) {
      if (list[i].mainTrackId * 1 === id * 1) {
        switch (type) {
          case "pic":
            return list[i].coverUrl;
            break;
          case "name":
            return list[i].name;
            break;
        }
      }
    }
  }, []);

  const getPicUrl = useCallback(
    (songDetails): string => {
      if (songDetails) {
        if (songDetails.al.picUrl) {
          return songDetails.al.picUrl;
        } else {
          return getAudioState("pic");
        }
      } else {
        return "http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg";
      }
    },
    [songDetails]
  );

  const getname = useCallback(() => {
    if (songDetails) {
      if (songDetails.name) {
        return songDetails.name;
      } else {
        return getAudioState("name");
      }
    } else {
      return "加载中...";
    }
  }, [songDetails]);

  return (
    <>
      <div className="audios">
        <audio src={songUrl} controls preload="auto" ref={audiosRef} />
      </div>

      {/* <div className="run" style={{background: `${props.Store.color}`}} onClick={() => {
                props.Store.setShow()
            }}></div> */}

      <div
        className="music-player-wraps-mask"
        style={{
          background: `url(${getPicUrl(songDetails)})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "10%"
        }}
      ></div>
      <div className="music-player-wraps">
        <Headers props={props}>{getname()}</Headers>
        <div className="music-player-content-logo">
          <div
            className="rotate-music-logo-wraps"
            style={{ animationPlayState: statePlay ? "running" : "paused" }}
          >
            <div className="rotate-music-logo">
              <img src={getPicUrl(songDetails)} alt="" />
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
              <CurrentTime currenttime={currenttime} />
            </div>
            <div className="m-p-c-c-c">
              <SpeedPro
                currenttime={currenttime}
                musicTime={musicTime}
                dropSpeed={dropSpeed}
              />
            </div>
            <div className="m-p-c-c-r">
              {musicTime ? formatSeconds(musicTime) : "00:00"}
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
                  goLastSong(typeCheck[1]);
                }}
              />
            </span>
            <span
              onClick={() => {
                setstatePlay(!statePlay);
              }}
            >
              {statePlay ? (
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
                  goLastSong(typeCheck[0]);
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
                getsongurl={getsongurl}
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

export default inject("Store")(observer(PgMusicPlayer));
