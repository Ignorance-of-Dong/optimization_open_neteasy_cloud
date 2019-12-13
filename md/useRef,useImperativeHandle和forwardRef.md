---
title: 💪🏼Hooks进阶-04💪🏼
date: '12/13/2019 14:15:58 PM '
tag: ['react', 'hooks']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: useRef
---

# 💪🏼useRef,useImperativeHandle和forwardRef的结合使用💪🏼

> **转载： https://blog.csdn.net/weixin_43902189/article/details/99694359**

## 👆🏻useRef👆🏻

> 返回一个可变的ref对象，其.current属性被初始化为传入的参数【initialValue】，返回的ref对象在整个组件的生命周期内保持不变*

## 🤞forwardRef🤞

> 引用父组件的热风实例，成为i子组件的一个参数，可以引用父组件的ref绑定到子组件自身的节点上

## 🤘useImperativeHandle🤘

> 第一个参数，接收一个通过forwardRef引用父组件的ref实例，第二个参数一个回调函数，返回一个对象，对象里面存储需要暴露给父组件的属性和方法

**useImperativeHandle和forwardRef的组合代码**

    //Test.tsx文件
    import React, { FC, Fragment, useRef, MutableRefObject, forwardRef, ForwardRefExoticComponent, Ref, useImperativeHandle, ChangeEvent, SyntheticEvent, memo } from "react";
    const Test: FC = (): JSX.Element => {
        const testRef: MutableRefObject<any> = useRef('test');
        const handleClick = (e:SyntheticEvent<HTMLButtonElement>):void =>{
            console.log('自身button的内容：',e.currentTarget.innerText);
            console.log('子组件input的对象:',testRef.current);
            console.log('子组件input的value值：',testRef.current.value);
            console.log('子组件input的类型：',testRef.current.type());
        }
        return (
            <Fragment>
                <TestChildForward ref={testRef} />
                <button onClick={handleClick}>获取子组件的input的value和type</button>
            </Fragment>
        );
    }
    export default Test;
    function TestChild(props:{},ref: Ref<any>): JSX.Element {
        const testRef: MutableRefObject<any> = useRef();//创建一个自身的ref，绑定到标签节点上
        //暴露出一个想要让父组件知道的对象,里面可以是属性也可以是函数
        useImperativeHandle(ref,()=>{//第一个参数，要暴露给哪个(ref)？第二个参数要暴露出什么？
            return {
                //(testRef.current as HTMLInputElement) 类型断言，自己肯定就是这样的类型
                value:(testRef.current as HTMLInputElement).value,//暴露出input的value
                type:()=>(testRef.current as HTMLInputElement).type//暴露出input的type类型
            }
        });
        return (
            <>
                <input type="text" value={'input的内容'} ref={testRef} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                    console.log(e.currentTarget.value);
                    console.log(e.currentTarget.type);
                }}/>
            </>
        );
    }
    const TestChildForward:ForwardRefExoticComponent<any> = memo(forwardRef(TestChild));

> 执行·

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/hooks7.png)

> 从上面的结果可以看到，当我们不想向父组件暴露太多的东西的时候，可以使用useImperativeHandle来按需暴露给父组件一些东西

# 🖐useLayoutEffect和useDebugValue的简单使用🖐

## 👌useLayouusetEffect👌

> 该钩子与useEffect差不多相似，官方介绍，其签名函数与useEffect相同，但会在所有的Dom变更之后同步调用effect。可以使用他来读取dom布局并同步触发渲染，在浏览器执行绘制之前，useLayouusetEffect内部的更新计划将会同步刷新，尽可能的使用标准的useEffect以避免视觉阻塞

**通俗来说：就是当你的所有dom变更后，同时执行所有的useEffect的时候来使用，可以用来读取dom，之后同步触发render ===========  emmmm…  ================ 反正很少用到。。。。。**

## 👍useDebugValue👍

> 目的是能在react的浏览器调试工具上显示你自定义的hooks，或者给hooks标记一些东西，当使用一个参数的时候，就是把第一个参数标记在react的调试工具上


    import React, { useDebugValue, useState } from 'react';

    const useTest = () => {
        const [str, setStr] = useState<string>('');
        useDebugValue('debug');
        return {
            str, setStr
        }
    }
    export default (): JSX.Element => {
        const { str, setStr } = useTest();
        return (
            <>
                <h2>{str}</h2>
                <button onClick={() => {
                    setStr('重新渲染');
                }}>这是？？？</button>
            </>
        );
    }

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/hooks8.png)

**会在自定义的hooks标记到react的调试工具上面,主要用于调试工具调试使用**

> 当传入第二个参数的情况下，第二个参数是一个回调函数，会把第一个参数当成自己的形参传入，进行一系列的操作，return回去，然后才会在react调试工具的hooks中打印出来，不然不会显示

    import React, { useDebugValue, useState } from 'react';

    const useTest = () => {
        const [str, setStr] = useState<string>('');
        useDebugValue(str, (value:string) => {
            console.log(value);
            return '这是改造后的' + value;
        });
        return {
            str, setStr
        }
    }
    export default (): JSX.Element => {
        const { str, setStr } = useTest();
        return (
            <>
                <h2>{str}</h2>
                <button onClick={() => {
                    setStr('重新渲染');
                }}>这是？？？</button>
            </>
        );
    }

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/hooks9.png)


**同时在控制台上打印了一个空字符**

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/hooks10.png)

> 由于str的初始值是空的，所以打印就是空的了，这只是调试使用

