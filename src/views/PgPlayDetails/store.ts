import {observable, action} from 'mobx'
class Track{
    @observable trackId = ""

    @action.bound
    async localTrackId(id) {
        this.trackId = id;
    }
}

export default new Track()