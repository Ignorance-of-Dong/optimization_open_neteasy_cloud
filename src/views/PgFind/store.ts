import {observable, action} from 'mobx'
import { Icons, Toast } from 'components/index'
import { apipersonalizedSongList, apialbum, apifirstMv, apibanner } from 'api'
class Find{
    @observable recommendedSongList = []
    @observable newDish = []
    @observable personalizedMv = []
    @observable _condition = []
    @observable _banner = []

    @action.bound
    async getapipersonalizedSongList() {
        let params = {
            limit: 6
        }
        try {
            await apipersonalizedSongList(params).then((res: any) => {
                // setrecommendedSongList(res.result)
                this.recommendedSongList = res.result
            })
            await apibanner().then(res => {
                // _setbanner(res.banners)
                this._banner = res.banners
            })
        } catch (err) {
            Toast('网络请求异常，请两分钟后再试', 2000)
        }
    }
}

export default new Find()