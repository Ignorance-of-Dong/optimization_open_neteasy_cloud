/*
 * @Author: zhangzheng
 * @Date: 2021-08-03 14:53:15
 * @LastEditors: zhangzheng
 * @LastEditTime: 2021-08-16 16:48:28
 * @Descripttion: 
 */

import React, { useCallback, useEffect } from "react"
import "./index.scss"
import { inject, observer } from 'mobx-react'
import { Headers, Icons, Toasts } from "components/index";

function GloblePlayer(props) {
    let { handlePlayerState, handleSongTotalTime, handlePlayOrPause, handleSongCurrentTime, handleGetPic, handleGetName } = props.playerStore;
    useEffect((): void => {
        console.log(props.playerStore.audiosRef)
        if (props.playerStore.playerState) {
            props.playerStore.audiosRef.current
                .play()
                .then(res => {
                    handleSongTotalTime(props.playerStore.audiosRef.current.duration);
                    props.playerStore.audiosRef.current.addEventListener(
                        "timeupdate",
                        handleSongCurrentTime,
                        false
                    );
                    props.playerStore.audiosRef.current.addEventListener("ended", handlePlayOrPause, false);
                })
                .catch(err => {
                    props.playerStore.audiosRef.current.pause();
                    handlePlayerState(false);
                    Toasts("加载歌曲失败,请重试！", 2000);
                });
        } else {
            props.playerStore.audiosRef && props.playerStore.audiosRef.current.pause();
        }
    }, [props.playerStore.playerState, props.playerStore.audiosRef]);
    return <>
        <div className="playerGloble" >
            <div className="cover" onClick={() => {window.location.href = '/#/musicplayer'}}>
                <img src={handleGetPic(props.playerStore.songDetail)} alt="" />
            </div>
            <div className="musicName">{ handleGetName(props.playerStore.songDetail)}</div>
            <span
                className="control"
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
            {/* <div className="playerList"></div> */}
        </div>
    </>
}

export default inject('playerStore')(observer(GloblePlayer))