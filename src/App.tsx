/*
 * @Author: zhangzheng
 * @Date: 2020-08-05 16:07:26
 * @LastEditors: zhangzheng
 * @LastEditTime: 2021-08-17 15:05:16
 * @Descripttion: 
 */
import routerConfig from './router'
import React, { memo, useEffect, useRef, useState } from 'react'
import RouterView from './router/routerView'
import './App.css'
import GloblePlayer from "components/GloblePlayer"
import { inject, observer } from "mobx-react";


const RouterViewPro = memo(RouterView)
function App(props: any) {
    console.log(props)
    let { handleGetAudioRef } = props.playerStore;
    let audiosRef = useRef(null);
    let bool:any={};
    console.log(sessionStorage.getItem("meta"))
    if (sessionStorage.getItem("meta") == "undefined" || !sessionStorage.getItem("meta")) {
        bool =  {isGloblePlayer: false}
    } else {
        bool = JSON.parse(sessionStorage.getItem("meta"));
    }
    // console.log(sessionStorage.getItem("meta") ? "{}" : 1)
    // let status = JSON.parse(sessionStorage.getItem("meta") || "{}");
    let result = false
    if (bool.isGloblePlayer && sessionStorage.getItem("songListDetails")) {
        result = bool.isGloblePlayer
    } else {
        result = false
    }
    console.log(bool)
    let [globelStatus, setGlobelStatus] = useState(result)
    useEffect(() => {
        handleGetAudioRef(audiosRef)
        console.log(props.playerStore.audiosRef)

        window.addEventListener('hashchange', (router) => {
            console.log(router, "router")
            let bool:any = {};
            if (sessionStorage.getItem("meta") == "undefined" || !sessionStorage.getItem("meta")) {
                bool =  {isGloblePlayer: false}
            } else {
                bool = JSON.parse(sessionStorage.getItem("meta"));
            }
            console.log(bool)
            console.log(bool && sessionStorage.getItem("songListDetails"))
            if (bool && sessionStorage.getItem("songListDetails")) {
                setGlobelStatus(bool.isGloblePlayer)
            } else {
                setGlobelStatus(false)
            }
            
        })
    }, [audiosRef])
    console.log(globelStatus, "11")
    return <>
        <RouterViewPro routerList={routerConfig.config} />

        <div className={!globelStatus ? 'none' : ''}>
            <GloblePlayer />
        </div>
        
        
        <div className="audios">
            <audio src={props.playerStore.currentSongUrl} controls preload="auto" ref={audiosRef} />
        </div>
    </>
}

export default inject("playerStore")(observer(App));
