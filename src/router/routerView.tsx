/*
 * @Author: zhangzheng
 * @Date: 2020-08-05 16:07:26
 * @LastEditors: zhangzheng
 * @LastEditTime: 2021-08-16 17:38:27
 * @Descripttion: 
 */
import React, { Suspense } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
// import Wrong from '../views/PgWrong'//404页面
function RouterView(props: any) {
    let routers = props.routers ? props.routers : props.routerList
    // const { route } = this.props;
    const defaultRouter = <Route path="/" component={() => {
        return <Redirect to="/home" key={22}/>
    }} key={22} exact/>
    return (
        <HashRouter>
            <Suspense fallback={<div></div>}>
                <Switch>
                    {
                        routers.map((item, index) => {
                            const Comp = item.component
                            return <Route path={item.path} exact={item.exact} component={(routers) => {
                                console.log(item.meta)
                                sessionStorage.setItem("meta", JSON.stringify(item.meta))
                                return <Comp route={item.children} {...routers}></Comp>
                            }} key={index}/>
                        }).concat(defaultRouter)
                    }

                </Switch>
            </Suspense>
        </HashRouter>
    )
}



export default RouterView