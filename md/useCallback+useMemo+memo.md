---
title: 🤑Hooks进阶-03🤑
date: '12/13/2019 14:07:58 PM '
tag: ['react', 'hooks']
meta:
  -
    name: description
    content: null
  -
    name: keywords
    content: useCallback
---
# 😲useCallback+useMemo+memo性能优化场景使用😲

> **转载： https://blog.csdn.net/weixin_43902189/article/details/99689963**

**当父组件引入子组件的情况下，往往会照成一些不必要的性能浪费，下面我们通过例子了解一下啊**

> 创建一个test.tsx文件

    import React, { useState } from 'react';
    function Test() {
        const [count, setCount] = useState<number>(100);
        return (
            <>
                <h2>{count}</h2>
                <button onClick={() => setCount(count + 1)}>++</button>
                <TestChild/>
            </>
        )
    }
    export default Test;
    //创建一个子组件
    function TestChild(): JSX.Element {
        console.log('TestChild运行了?');
        return(
            <h3>我是子组件</h3>
        );
    }

> **这时我们开启服务运行一下这个小案例,会发现，我们的子组件并没有对应的需要更新的操作但是还是触发了，这时候我们需要使用React的memo来优化一下代码**

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/hooks0.png)

## 🤓使用memo优化react性能🤓

    import React, { useState,memo } from 'react';
    //在TestChild子组件使用之前，使用memo包裹一下
    const MemoTestChild = memo(TestChild);//对子组件进行处理
    function Test() {
        const [count, setCount] = useState<number>(100);
        return (
            <>
                <h2>{count}</h2>
                <button onClick={() => setCount(count + 1)}>++</button>
                {/* 引入子组件 */}
                {/* <TestChild/> */}
                <MemoTestChild/>
            </>
        )
    }
    export default Test;
    //创建一个子组件
    function TestChild(): JSX.Element {
        console.log('TestChild运行了?');
        return(
            <h3>我是子组件</h3>
        );
    }

> 我们在看一下，会不会产生上述的问题

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/hooks1.png)

**从上面可以看出，除了初始化的执行之外，这时候父组件发生状态的改变，子组件不会发生对应的重新执行，优化了代码的性能，个人建议多使用这些性能优化的函数,以提高性能**

> **通俗的说： 场景 : 在子组件不需要父组件的值和函数的情况下，来使用**


------------------------------

**我们再看一个父组件传值传函数的例子(相同的例子改造)**

    import React, { useState, memo } from 'react';
    //memo性能优化后的子组件
    const MemoTestChild = memo(TestChild);
    function Test(): JSX.Element {
        const [count, setCount] = useState<number>(100);
        const [name, setName] = useState<string>('TestChild组件');
        return (
            <>
                <h2>{count}</h2>
                <button onClick={() => setCount(count + 1)}>++</button>
                {/* 引入子组件 */}
                {/* <TestChild/>       把父组件的状态和设置状态的函数传递给子组件     */}   
                <MemoTestChild name={name} onClick={(newName: string) => setName(newName)} />
            </>
        )
    }
    export default Test;

    //子组件部分
    interface TestChildPropsType {
        name: string;
        onClick: Function;
    }
    function TestChild({ name,onClick }: TestChildPropsType): JSX.Element {
        console.log('TestChild运行了?');
        return (
            <>
                <h3>我是子组件,这是父组件传递过来的数据:{name}</h3>
                <button onClick={onClick.bind(null,'新的子组件name')}>改变name</button>
            </>
        );
    }

> 这是传递给子组件一个新的状态，然后我们看看点击父组件后的情况

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/hooks2.png)

**我们从图中可以看出，子组件有执行了多次，这时我们就要使用useCallback / useMemo来解决这个问题**

## 🤧useCallback🤧

> useCallback有两个参数，【 参数是一个回调，参数二是一个依赖数组 】，使用：把内联的回调函数以及依赖项数组作为u参数传递到useCallback，他将返回函数的memeized版本，该回调仅在某个依赖项改变时才会更新，当你把回调函数传递给经过优化的，避免非必要渲染的子组件时，他将非常有用


**这时我们在对上述代码进行优化【 加入useCallback 】

    import React, { useState, memo, useCallback } from 'react';
    //memo性能优化后的子组件
    const MemoTestChild = memo(TestChild);
    function Test(): JSX.Element {
        const [count, setCount] = useState<number>(100);
        const [name, setName] = useState<string>('TestChild组件');
        return (
            <>
                <h2>{count}</h2>
                <button onClick={() => setCount(count + 1)}>++</button>
                {/* 引入子组件 */}
                {/* <TestChild/>       把父组件的状态和设置状态的函数传递给子组件     */}
                <MemoTestChild name={name} onClick={useCallback((newName: string) => setName(newName),[])} />
                {/* useCallback((newName: string) => setName(newName),[]) */}
                {/* 这里使用了useCallback优化了传递给子组件的函数，只初始化一次这个函数，下次不产生新的函数 */}
            </>
        )
    }
    export default Test;

    //子组件部分
    interface TestChildPropsType {
        name: string;
        onClick: Function;
    }
    function TestChild({ name, onClick }: TestChildPropsType): JSX.Element {
        console.log('TestChild运行了?');
        return (
            <>
                <h3>我是子组件,这是父组件传递过来的数据:{name}</h3>
                <button onClick={onClick.bind(null, '新的子组件name')}>改变name</button>
            </>
        );
    }

> 这时候我们看见子组件不会在父组件与子组件无关状态改变的时候执行，不会一直产生重新产生新函数,useCallback第二个参数，是依赖项，可以确定在什么状态改变的情况下产生一个新的回调函数

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/hooks3.png)

> **通俗的说： 场景： 在使用值和函数的情况下，需要考虑有没有函数传递给子组件**

**我们上面提到的useMemo，好奇他在什么场景下使用**

> 我们继续改造一下这个案例，把name改成一个对象

    import React, { useState, memo, useCallback } from 'react';
    //memo性能优化后的子组件
    const MemoTestChild = memo(TestChild);
    function Test(): JSX.Element {
        const [count, setCount] = useState<number>(100);
        const [name, setName] = useState<string>('TestChild组件');
        return (
            <>
                <h2>{count}</h2>
                <button onClick={() => setCount(count + 1)}>++</button>
                {/* 引入子组件 */}
                {/* <TestChild/>       把父组件的状态和设置状态的函数传递给子组件     */}
                <MemoTestChild
                    name={{ name, color: name.indexOf('name') !== -1 ? 'red' : 'green' }}
                    onClick={useCallback((newName: string) => setName(newName), [])}
                />
                {/* useCallback((newName: string) => setName(newName),[]) */}
                {/* 这里使用了useCallback优化了传递给子组件的函数，只初始化一次这个函数，下次不产生新的函数 */}
            </>
        )
    }
    export default Test;

    //子组件部分
    interface TestChildPropsType {
        name: { name: string; color: string };
        onClick: Function;
    }
    function TestChild({ name, onClick }: TestChildPropsType): JSX.Element {
        console.log('TestChild运行了?');
        return (
            <>
                <h3 style={{ color: name.color }}>我是子组件,这是父组件传递过来的数据:{name.name}</h3>
                <button onClick={onClick.bind(null, '新的子组件name')}>改变name</button>
            </>
        );
    }

**这时候我们会发现，子组件还是一样的执行了，在父组件更新其它状态的情况下，子组件的name对象属性会一直发生重新渲染改变，从而导致一直执行,这也是不必要的性能浪费**

![](https://raw.githubusercontent.com/Ignorance-of-Dong/GraphBed/master/images/hooks4.png)

> 这个时候我们就要使用useMemo来优化传递的子属性了


    import React, { useState, memo, useCallback, useMemo } from 'react';
    //memo性能优化后的子组件
    const MemoTestChild = memo(TestChild);
    function Test(): JSX.Element {
        const [count, setCount] = useState<number>(100);
        const [name, setName] = useState<string>('TestChild组件');
        return (
            <>
                <h2>{count}</h2>
                <button onClick={() => setCount(count + 1)}>++</button>
                {/* 引入子组件 */}
                {/* <TestChild/>       把父组件的状态和设置状态的函数传递给子组件     */}
                <MemoTestChild
                    // 使用useMemo，返回一个和原本一样的对象，第二个参数是依赖性，当name发生改变的时候，才产生一个新的对象
                    name={useMemo(() => ({ name, color: name.indexOf('name') !== -1 ? 'red' : 'green' }),[name])}
                    onClick={useCallback((newName: string) => setName(newName), [])}
                />
                {/* useCallback((newName: string) => setName(newName),[]) */}
                {/* 这里使用了useCallback优化了传递给子组件的函数，只初始化一次这个函数，下次不产生新的函数 */}
            </>
        )
    }
    export default Test;

    //子组件部分
    interface TestChildPropsType {
        name: { name: string; color: string };
        onClick: Function;
    }
    function TestChild({ name, onClick }: TestChildPropsType): JSX.Element {
        console.log('TestChild运行了?');
        return (
            <>
                <h3 style={{ color: name.color }}>我是子组件,这是父组件传递过来的数据:{name.name}</h3>
                <button onClick={onClick.bind(null, '新的子组件name')}>改变name</button>
            </>
        );
    }

> **通俗的说： 场景：子组件调用父组件传递的函数，来改变父组件传递给子组件的属性**

**！因此我们因该在不同的场景下来使用这些hooks，而不是盲目的去使用





