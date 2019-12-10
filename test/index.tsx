/*
 * @Author: Mr.zheng
 * @Date: 2019-07-16 09:54:09
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-07-29 15:29:19
 * @Description: 测试高级语法
 */
import './style/index.css'
import './style/index.scss'
import * as ReactDOM from 'react-dom';
import * as React from 'react'
import IntegerStep from './IntegerStep'
import { Provider } from "mobx-react";
import Pubcli from './store/public'



let foo = () => 1;

let obj = {
  a: 2,
  b: 3
}
let {
  a
} = obj
let objs = {
  ...obj,
  f: 4
}
console.log(foo())

class Name {
  state: {
    a: 1
  }
  suert() {
    return 1123599999
  }
}
console.log(new Name().suert())
console.log(React)
// const element = <h1>Hello, world!</h1>;


function fn() {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log('加载promise')
    }, 1000)
  })
}
fn()


let arr = [1,2,3,5,4,5,8,9,8,100]

new Set(arr)

console.log(arr)


function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();


hw.next()
@testable
class MyClass {
  static isTestable: any;
};

function testable(target: any) {
    target.isTestable = true;
}
console.log(MyClass.isTestable, 'ss')

ReactDOM.render(
  <Provider Pubcli={Pubcli}>
<IntegerStep/>
  </Provider>
, document.getElementById("root"));
