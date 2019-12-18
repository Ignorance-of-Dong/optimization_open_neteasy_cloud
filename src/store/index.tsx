import { observable, action } from 'mobx'

class Index {
    @observable songListDetails = []
    @observable tabBarHeight = 0

    @action.bound
    getSongListDetails(data) {
        this.songListDetails = data
    }

    @action.bound
    setTabBarHeight(hei) {
        this.tabBarHeight = hei
    }
}

export default new Index()