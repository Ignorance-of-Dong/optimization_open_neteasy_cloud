import { observable, action } from 'mobx'

class Index {
    @observable songListDetails = []

    @action.bound
    getSongListDetails(data) {
        this.songListDetails = data
    }
}

export default new Index()