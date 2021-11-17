/*
 * @Author: zhangzheng
 * @Date: 2020-08-05 16:07:26
 * @LastEditors: zhangzheng
 * @LastEditTime: 2021-10-25 18:18:36
 * @Descripttion: 
 */
import {observable, action} from 'mobx'
import { Icons, Toasts } from 'components/index'
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
                this.recommendedSongList = res.result
            })
            await apibanner().then(res => {
                this._banner = res.banners
            })
        } catch (err) {
            console.log(err)
            Toasts('网络请求异常，请两分钟后再试', 2000)
        }
    }
}

export default new Find()