import { observable, action, flow } from 'mobx'
import { apilogincellphone } from 'api'
import query from 'utils/useQuery'
class PgPassword{


    @observable password = ""

    // 输入密码【修改值】
    @action.bound
    changePass(val) {
        this.password = val
    }

    // 登陆
    @action.bound
    passwordFn = flow(function * () {
        let { phone } = query()

        let params = {
            phone: phone,
            password: this.password
        }
        yield apilogincellphone(params).then(res => {
            sessionStorage.setItem('useMsg', JSON.stringify(res.profile))
            sessionStorage.setItem('tabId', '1')
        })
    })
}

export default new PgPassword()