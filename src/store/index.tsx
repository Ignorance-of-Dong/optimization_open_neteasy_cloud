import { observable, action } from 'mobx'

class Index {
    @observable songListDetails: Array<any> = []
    @observable tabBarHeight: number = 0
    @observable color: string = '#ccc'

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
}

export default new Index()