import routerConfig from './router'
import React, { memo } from 'react'
import RouterView from './router/routerView'
import './App.css'

const RouterViewPro = memo(RouterView)
function App(props: any) {
    return <>
        <RouterViewPro routerList={routerConfig.config} />
    </>
}

export default App