---
title: 😁Hooks进阶-01😁
date: '12/13/2019 14:06:58 PM '
tag: ['react', 'hooks']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: useState
---
# 😁hooks的useState、useEffect的实际使用😁

> **转载：https://blog.csdn.net/weixin_43902189/article/details/99689186**

**！注意：hooks只能在函数怕【无状态组件】中使用**

## 🤣useState🤣

> 官方文档表明出，这个钩子就是在函数中能使用像class中使用state一样的状态管理，使用方式也比较简单

    import React, { useState } from 'react';
    export default (): JSX.Element => {
        // 在typescript中，useState是一个泛型函数，可以传入对应的类型
        const [count, setCount] = useState<number>(100);
        return (
            <>
                <h2>{count}</h2>
                <button onClick={()=>setCount(count + 1)}>++</button>
                {/*   还可以传入回调函数 */}
                <button onClick={()=>setCount((count:number)=>(count - 1))}>--</button>
            </>
        )
    }

**由于useState返回一个数组，第一个count参数就与有状态组件(类)中的state很相似，是无法改变的值，而第二个参数setCount就与有状态组件的setState差不多，较为简单**


## 😄useEffect😄

> useEffect 一个相当于，状态组件中componentDidMount + componentDidUpdate + componentWillUnmount三个钩子函数的结合体 ，如果不清楚的可以看 React有状态组件生命周期的官方中文介绍

**通过useEffect+useState配合发送请求，获取数据**

    import React, { useEffect, useState } from 'react';
    const useDate = (initialDate: String)=> {//初始化时间
        // 创建一个字符串state,存储当前系统时间
        const [date, setDate] = useState<string>();
        useEffect(() => {// 使用useEffect，当date数据改变时，触发useEffect
            const times: NodeJS.Timeout = setInterval(() => setDate(Date.now().toLocaleString()), 1000);
            return ()=> {
                // 这里的return返回的应该函数和componentWillUnmount差不多一致，在组件销毁前执行,防止定时器没有销毁
                clearInterval(times);// 退出的时候清除定时器
            }
        }, [date]);// 第二个参数中的数组，就是依赖项，会相当于有状态组件的componentWillReceiveProps,每次执行useEffect前会对date进行一次浅比较
        return { date };// 由于外部只需要使用date，可以只暴露出这个数据
    }

    export default (): JSX.Element => {
        const { date } = useDate(Date.now().toLocaleString());//使用自定义钩子，获取返回的对象
        return(
            <>
                <h2>当前时间</h2>
                <p>{date}</p>
            </>
        );
    }
