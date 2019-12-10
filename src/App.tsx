import routerConfig from './router'
import React from 'react'
import RouterView from './router/routerView'
import './App.css'

function App(props: any) {
    return <RouterView routerList = {routerConfig.config}/>
}

export default App