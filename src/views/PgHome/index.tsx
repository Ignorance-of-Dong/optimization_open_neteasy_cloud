import React from 'react'
import './index.scss'

function Home(props:any) {
    return (
        <>
        {console.log(props)}
            <div className='home-wrap'>
                <div className="home-logo">
                    <img className='home-logo-wh' src={require('../../assets/images/logo.png')} alt=""/>
                </div>
                <div className='home-button'>
                    <div className='iphone-login' onClick={() => {
                        props.history.push('/loginphone')
                    }}>手机号登陆</div>
                    <div className='temporary-login'>
                        <div className="count-but">
                            立即体验
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home