import { observable, action } from 'mobx'

class Index {
    @observable songListDetails: Array<any> = []
    @observable tabBarHeight: number = 0

    @action.bound
    getSongListDetails(data): void {
        this.songListDetails = data
    }

    @action.bound
    setTabBarHeight(hei): void {
        this.tabBarHeight = hei
    }
}

export default new Index()