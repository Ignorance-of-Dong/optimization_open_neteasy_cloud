/*
 * @Author: zhangzheng
 * @Date: 2021-08-03 16:12:39
 * @LastEditors: zhangzheng
 * @LastEditTime: 2021-08-16 16:56:24
 * @Descripttion: 播放器 【独立 / 全局 共享】
 */
import { observable, action, runInAction } from 'mobx'
import { apisongurl, apisongdetail, apilyric } from "api";


enum typeCheck {
    add,
    last
}
class PlayerStore {
    @observable playerState: boolean = false
    @observable currentSongUrl: string = ""
    @observable songDetail: any = null
    @observable audiosRef: React.MutableRefObject<any> = null
    @observable songId: string = sessionStorage.getItem("songId") || ""
    @observable songListIndex: number = 0

    @observable songType = sessionStorage.getItem("songType") || ""

    @observable songCurrentTime = "00:00"
    @observable songTotalTime = "00:00"

    // 修改播放器状态
    @action.bound
    handlePlayerState(state: boolean): void {
        this.playerState = state
    }

    // 获取歌曲详情
    async handleGetSongDetail(): Promise<any> {
        try {
            let res = await apisongdetail({ id: this.songId })
            runInAction(() => {
                this.songDetail = res.songs[0]
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    // 获取歌曲播放链接
    @action.bound
    async handleGetSongUrl(): Promise<any> {
        try {
            let res: any = await apisongurl({ id: this.songId })
            this.currentSongUrl = res.data[0].url
            this.handlePlayerState(true)
        } catch (error) {
            console.log(error)
        }
    }

    // 获取播放器dom元素属性
    @action.bound
    handleGetAudioRef(ref: React.MutableRefObject<any>) {
        this.audiosRef = ref;
    }

    // 获取当前播放歌曲id
    @action.bound
    handleGetSongId(id: string) {
        console.log(id)
        this.songId = id
        sessionStorage.setItem("songId", id)
    }

    // 重置歌曲 ｜ 初始化歌曲
    @action.bound
    async handleInitSong() {
        this.audiosRef.current.pause();
        this.handlePlayerState(false);
        try {
            
            await this.handleGetSongUrl()
            await this.handleGetSongDetail()
        } catch (error) {
            console.error(error)
        }
    }

    // 修改当前songIndex
    @action.bound
    handleSongIndex(index: number) {
        this.songListIndex = index
    }

    // 切换歌曲 ===== 【上一首 ｜ 下一首】
    @action.bound
    async handleSwitchSongs(type) {
        let list = JSON.parse(sessionStorage.getItem("songListDetails"));
        let okid = this.songType == "radio" ? "mainTrackId" : "id";
        if (type === typeCheck[1]) {
            this.songListIndex = this.songListIndex - 1;
        } else {
            this.songListIndex = this.songListIndex + 1;
        }
        if (this.songListIndex < 0) {
            this.songListIndex = 0;
            return;
        }
        if (this.songListIndex > list.length) {
            this.songListIndex = list.length;
            return;
        }
        this.audiosRef.current.pause();
        this.handlePlayerState(false);
        this.handleGetSongId(list[this.songListIndex][okid])
        await this.handleInitSong()
        setTimeout(() => {
            this.handlePlayerState(true);
        }, 1000);
    }

    // 实时获取歌曲播放进度
    @action.bound
    handleSongCurrentTime() {
        this.songCurrentTime = this.audiosRef.current.currentTime;
    }

    @action.bound
    handleSongTotalTime(time: string) {
        this.songTotalTime = time
    }

    // 自动播放，操作自动切换下一首歌曲
    @action.bound
    async handlePlayOrPause() {
        this.handlePlayerState(false);
        this.songCurrentTime = "00:00";
        await this.handleSwitchSongs(typeCheck[0]);
        setTimeout(() => {
            this.handlePlayerState(true);
        }, 1000);
    }

    // 操作当前歌曲列表类型
    @action.bound
    handleSongListType(type: string) {
        this.songType = type
        sessionStorage.setItem("songType", type)
    }

    // 中转代理
    @action.bound
    handleGetProxy(type) {
        let id = this.songId
        let list = JSON.parse(sessionStorage.getItem("songListDetails"));
        for (let i = 0; i < list.length - 1; i++) {
            if (list[i].mainTrackId * 1 === Number(id)) {
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
    }
    // 获取某些特殊下歌曲名字/图片无法直接获取
    @action.bound
    handleGetName(songDetail) {
        if (songDetail) {
            if (songDetail.name) {
                return songDetail.name;
            } else {
                let result = this.handleGetProxy("name");
                return result;
            }
        } else {
            return "加载中...";
        }
    }
    @action.bound
    handleGetPic(songDetail) {
        if (songDetail) {
            if (songDetail.al.picUrl) {
                return songDetail.al.picUrl;
            } else {
                let result = this.handleGetProxy("pic");
                return result;
            }
        } else {
            return "http://p2.music.126.net/SHElx36maw8L6CIXfiNbFw==/109951164144982394.jpg";
        }
    }

}

export default new PlayerStore()