import React from 'react'
import './index.scss'
import logo from 'assets/images/logo.png'
function Home(props: any): JSX.Element {
    return (
        <>
            <div className='home-wrap'>
                <div className="home-logo">
                    <img className='home-logo-wh' src={logo} alt="" />
                </div>
                <div className='home-button'>
                    <div className='iphone-login' onClick={() => {
                        props.history.push('/loginphone')
                    }}>手机号登陆</div>
                    <div className='temporary-login'>
                        <div className="count-but" onClick={() => {
                            props.history.push('/index/fined')
                        }}>
                            立即体验
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home