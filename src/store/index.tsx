import { observable, action } from 'mobx'

class Index {
    @observable heightlight = 1
    @observable open = false

    @action.bound
    changSHstate(flag) {
        console.log(flag)
        this.open = flag
    }
}

export default new Index()