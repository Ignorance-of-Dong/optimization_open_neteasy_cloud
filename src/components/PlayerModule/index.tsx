/*
 * @Author: zhangzheng
 * @Date: 2021-08-03 17:03:22
 * @LastEditors: zhangzheng
 * @LastEditTime: 2021-08-05 16:22:03
 * @Descripttion: 
 */
import React, { useState, useEffect, useRef, useCallback } from "react"
import { Headers, Icons, Toasts } from "components/index";
import { Slider, Modal } from "antd-mobile";
import { inject, observer } from "mobx-react";


interface ejectModuleProps {
    showModule: boolean;
    setshowModule: Function;
    getsongurl: Function;
    setChildModuleScroll: Function;
    [propName: string]: any;
}
function EjectModule(props: ejectModuleProps): JSX.Element {
    let [songListDetail, setsongListDetail] = useState<Array<any>>([]);
    let listRef = useRef(null);

    /**
     * 实时获取歌曲在列表的位子【并在切换上一首 | 下一首实时更新】
     */
    useEffect((): void => {
        let list = JSON.parse(sessionStorage.getItem("songListDetails"));
        setsongListDetail(list);
        sessionStorage.setItem(
            "currScrollTop",
            (50 * (props.playerStore.songListIndex - 1)).toString()
        );
        listRef.current.scrollTop = 50 * (props.playerStore.songListIndex - 1);
    }, [props.playerStore.songListIndex]);

    /**
     * 弹层打开时设置歌曲列表scroll高度
     * @param scrollCurrent scroll高度
     */
    const setScroll = useCallback((scrollCurrent): void => {
        if (listRef.current) {
            setTimeout(() => {
                listRef.current.scrollTop = scrollCurrent;
            }, 50);
        }
    }, []);

    /**
     * 设置歌曲列表scroll高度
     */
    const setScrollTop = useCallback((): void => {
        console.log(props.playerStore.songId, "使用痰喘进行对比的ID")
        let list = JSON.parse(sessionStorage.getItem("songListDetails"));
        let okId = props.playerStore.songType == "radio" ? "mainTrackId" : "id";
        for (let index = 0; index < list.length; index++) {
            if (list[index][okId] == props.playerStore.songId) {
                props.playerStore.handleSongIndex(index);
                sessionStorage.setItem("currScrollTop", (50 * (index - 1)).toString());
                listRef.current.scrollTop = 50 * (index - 1);
                return;
            }
        }


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
        props.playerStore.handleInitSong(id);
        props.playerStore.handleSongIndex(index);
        listRef.current.scrollTop = 50 * (index - 1);
    }, []);
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
                                            style={{ color: props.playerStore.songListIndex === index ? "red" : "" }}
                                            onClick={() => {
                                                let okid = props.playerStore.songType == "radio" ? "mainTrackId" : "id";
                                                selectMusic(index, res[okid]);
                                            }}
                                        >
                                            {props.playerStore.songListIndex === index ? (
                                                <Icons className="eject-module-icon" un="&#xe659;" />
                                            ) : null}
                                            <div className="eject-module-wrap-music-name">
                                                {res.name}
                                            </div>
                                            <span style={{ color: props.playerStore.songListIndex === index ? "red" : "" }}>
                                                &nbsp;-&nbsp;
                                            </span>
                                            <div
                                                className="eject-module-wrap-music-author"
                                                style={{ color: props.playerStore.songListIndex === index ? "red" : "" }}
                                            >
                                                {props.playerStore.songType == "radio"
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

export default inject("playerStore")(observer(EjectModule));
