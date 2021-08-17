/*
 * @Author: zhangzheng
 * @Date: 2020-08-05 16:07:26
 * @LastEditors: zhangzheng
 * @LastEditTime: 2021-08-03 15:09:36
 * @Descripttion: 
 */
import { observable, action } from 'mobx'

class Index {
    @observable songListDetails: Array<any> = []
    @observable tabBarHeight: number = 0
    @observable color: string = '#ccc'
    @observable trackId: string = ""

    @observable trackDetail = null;
    @observable trackList = []

    @action.bound
    getSongListDetails(data): void {
        this.songListDetails = data
    }

    @action.bound
    setTabBarHeight(hei): void {
        this.tabBarHeight = hei
    }

    @action.bound
    setShow():void {
        this.color = 'red'
    }

    @action.bound
    async localTrackId(id) {
        this.trackId = id;
    }

    @action.bound
    setTrackDetail(detail) {
        this.trackDetail = detail;
    }

    @action.bound
    setTrackList(detail) {
        this.trackList = detail;
    }
    
}

export default new Index()