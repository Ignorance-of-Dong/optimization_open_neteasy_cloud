---
title: 🌍Hooks进阶-02🌍
date: '12/13/2019 14:10:58 PM '
tag: ['react', 'hooks']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: useContext
---
# 🌈useReducer+useContext+createContext的使用、模拟redux合并reducer🌈

> **转载： https://blog.csdn.net/weixin_43902189/article/details/99690873**

## ✨createContext✨

> 一个创建上下文函数，执行产生一个上下文对象，包含两个属性【 Provider组件和Consumer组件 】

### 🎍Provider🎍

> 用来包裹整合组件，传递一个value属性，把context上下文注到整个组件当中

### ❄Consumer❄

> 在里面使用函数调用Provider的value传递的值成形参，并取出使用

--------------------------

[useReducer和useContext官方直通车](https://zh-hans.reactjs.org/docs/hooks-reference.html)

--------------------------

## ⚡useReducer+useContext+createContext的简单使用,创建一个Test.tsx文件⚡

    import React, { useReducer, useContext, createContext, Context } from 'react';
    //初始化stroe的类型、初始化值、reducer
    const ADD_COUNTER = 'ADD_COUNTER';
    const initialReucer = {
        count: 100
    }
    function reducer(state: typeof initialReucer, action: { type: typeof ADD_COUNTER }) {
        switch (action.type) {
            case ADD_COUNTER:
                return { ...state, count: state.count + 1 }
            default:
                return state;
        }
    }
    const ProviderContext: Context<any> = createContext('provider');//创建上下文实例
    //高阶组件，给函数组件注入上下文
    const providerHoc = (reducer: Function, initialState: any) => (Com: React.FC<any>) => {
        return () => {
            const [state, dispatch] = useReducer<any>(reducer, initialState);
            return (
                <ProviderContext.Provider value={{ state, dispatch }}>
                    <Com />
                </ProviderContext.Provider >
            );
        }
    }
    function Test(): JSX.Element {
        const { state, dispatch } = useContext(ProviderContext);//通过ProviderContext这个上下文实例获取到value，解构出
        console.log(state);
        return (
            <>
                <h2>{state.count}</h2>
                {/*使用dispatch分发action，触发reducer返回新的state*/}
                <button onClick={() => dispatch({ type: ADD_COUNTER })}>++</button>
            </>
        );
    }
    export default providerHoc(reducer, initialReucer)(Test);
    // 注入reducer,initialReucer到Test组件中，通过高阶组件对Test组件进行包裹注入

> 效果：==

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/hooks5.png)

> **我们会发现，这样的使用和redux的同步action的情况是一致的，这时候我们可以模拟异步action发送请求获得数据**

**抽离reducer，, providerHoc, reducer, initialReucer，ADD_COUNTER到store.tsx文件**

    //stroe.tsx
    import React, { useReducer, createContext, Context } from 'react';
    const ADD_COUNTER = 'ADD_COUNTER';//action-type的类型

    export const addActions =()=> ({ type: ADD_COUNTER });//创建一个同步action

    export const initialReucer = {//初始化的state
        count: 100
    }					//	state的类型,action的类型
    export function reducer(state: typeof initialReucer, action: { type: typeof ADD_COUNTER }) {
        switch (action.type) {
            case ADD_COUNTER:
                return { ...state, count: state.count + 1 }
            default:
                return state;
        }
    }
    export const ProviderContext: Context<any> = createContext('provider');//创建上下文实例
    //高阶组件，给函数组件注入上下文
    export const providerHoc = (reducer: Function, initialState: any) => (Com: React.FC<any>) => {
        return () => {
            const [state, dispatch] = useReducer<any>(reducer, initialState);
            return (
                <ProviderContext.Provider value={{ state, dispatch }}>
                    <Com />
                </ProviderContext.Provider >
            );
        }
    }

> test.tsx文件

    import React, { useContext } from 'react';
    import { ProviderContext, addActions, providerHoc, reducer, initialReucer } from './store';
    function Test(): JSX.Element {
        const { state, dispatch } = useContext(ProviderContext);//通过ProviderContext这个上下文实例获取到value，解构出
        console.log(state);
        return (
            <>
                <h2>{state.count}</h2>
                <button onClick={() => dispatch(addActions())}>++</button>
            </>
        );
    }
    export default providerHoc(reducer, initialReucer)(Test);
    // 注入reducer,initialReucer到Test组件中，通过高阶组件对Test组件进行包裹注入

> 这时我们只是将组件抽离出来，执行结果还是和以前一样======我们要对代码进行改造~  ~  ~ ~  ~    ~

> store.ts

    import React, { useReducer, createContext, Context, Dispatch } from 'react';
    const ADD_COUNTER = 'ADD_COUNTER';

    const addActions = () => ({ type: ADD_COUNTER });//创建一个同步action
    // 创建一个异步action的函数，返回一个action对象
    const asyncAction = (dispatch: Dispatch<any>) => {
        return {
            asyncAddaction() {//这是一个异步的添加action,定时器模拟异步
                console.log('执行addActions之前,发送请求 : ' + Date.now());//打印一下时间
                setTimeout(() => {
                    console.log('执行addActions ,请求后: ' + Date.now());
                    dispatch(addActions());//执行同步action
                }, 1000);
            }
        }
    }
    export const initialReucer = {
        count: 100
    }
    export function reducer(state: typeof initialReucer, action: { type: typeof ADD_COUNTER }) {
        switch (action.type) {
            case ADD_COUNTER:
                return { ...state, count: state.count + 1 }
            default:
                return state;
        }
    }
    export const ProviderContext: Context<any> = createContext('provider');//创建上下文实例
    //高阶组件，给函数组件注入上下文
    export const providerHoc = (reducer: Function, initialState: any) => (Com: React.FC<any>) => {
        return () => {
            const [state, dispatch] = useReducer<any>(reducer, initialState);
            const asyncActions: any = asyncAction(dispatch);//对dispatch进行注入包裹,然后返回
            return (
                <ProviderContext.Provider value={{ state, asyncActions }}>
                    <Com />
                </ProviderContext.Provider >
            );
        }
    }

> test.tsx如下

    import React, { useContext } from 'react';
    import { ProviderContext, providerHoc, reducer, initialReucer } from './store';
    function Test(): JSX.Element {
        const { state, asyncActions } = useContext(ProviderContext);//通过ProviderContext这个上下文实例获取到value，解构出
        const { asyncAddaction } = asyncActions;//取出asyncAddaction
        console.log(state);
        return (
            <>
                <h2>{state.count}</h2>
                <button onClick={() => asyncAddaction()}>++</button>
            </>
        );
    }
    export default providerHoc(reducer, initialReucer)(Test);
    //注入reducer,initialReucer到Test组件中，通过高阶组件对Test组件进行包裹注入

> 执行结果：=>

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/hooks6.png)


---------------------------------
---------------------------------
---------------------------------

> 目前这种useReducer+useContext+createContext的组合使用看起来有些凌乱。

> 推荐使用mobx全局状态管理

> 🌍[Mobx全局状态管理参考](http://my.ignorantscholar.cn/2019/12/06/mobx/#more)🌍

---------------------------------
---------------------------------
---------------------------------




