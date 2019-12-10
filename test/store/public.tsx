import { observable, configure, runInAction, action, reaction, computed, autorun, when } from "mobx";


// configure({ enforceActions: 'always' }) // 强制进行action
let obj = {
    a: 111
}



class Pubcli {

    constructor () {
        // this.disposer()
        when(
            () => this.total > 20,
            () => this.init()
        )
    }

    @observable todos = [
        {
            title: "Make coffee",
            done: true,
        },
        {
            title: "Find biscuit",
            done: false
        }
    ]
    @observable youses = 'ture'

    reaction2 = reaction(
        () => this.todos.map(todo => todo.title),
        titles => console.log("reaction 2:", titles.join(", "))
    );

    @observable price = 1

    count = 1
    // @action.bound
    changValue = () => {
        // console.log(observable.map(obj).has('b'))
        // console.log()
        this.todos = [
            ...this.todos,
            {
                title: "Find biscuit",
                done: false
            }
        ]
        this.price = this.price + 1
        
    }
    disposer = autorun(() => {
        console.log(this.price, 'this.price')
    });
    @computed get total() {
        return this.price * 10
    }

    init() {
        console.log(this.count++, '否者')
    }
    
}

export default new Pubcli()