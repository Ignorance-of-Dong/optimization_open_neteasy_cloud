import React from 'react'
import { List, Badge } from 'antd-mobile'
import { Icons } from '../../components'
import './index.scss'
function PgLeftSlider() {
    let useMsg = sessionStorage.getItem('useMsg')
    let useMsgs = JSON.parse(useMsg)
    return <List className='left-slider-wraps'>
        <div className="left-slider-topwrap">
            <div className="left-slider-anuter">
                <img src={useMsgs.avatarUrl} alt="" />
            </div>
            <span className='left-silder-signature'>
                {useMsgs.signature}
            </span>
            <p className='left-silder-name'>
                <span className='l-s-n-name'> {useMsgs.nickname} </span>
                <span className='l-s-n-sign small'>签到</span>
            </p>
            <div className="left-slider-vip-wrap">
                <div className="l-v-left">
                    <p className='v-i-p small'>开通黑胶VIP</p>
                    <p className='small' style={{ color: '#ccc' }}> 已过期</p>
                    <i></i>
                </div>
                <div className="l-v-Advertisement small">
                    披萨免费吃一年
                </div>
            </div>
            <div className="left-slider-tab-bar">
                <div className="l-s-t-b-coule">
                    <Badge dot>
                        <Icons className='c-icon' un='&#xe60a;' />
                    </Badge>
                    <p className='l-s-t-b-name small'>我的消息</p>
                </div>
                <div className="l-s-t-b-coule">
                    <Badge dot>
                        <Icons className='c-icon' un='&#xe604;' />
                    </Badge>
                    <p className='l-s-t-b-name small'>我的好友</p>
                </div>

                <div className="l-s-t-b-coule">
                    <Badge dot>
                        <Icons className='c-icon' un='&#xe686;' />
                    </Badge>
                    <p className='l-s-t-b-name small'>个性换肤</p>
                </div>
                <div className="l-s-t-b-coule">
                    <Badge dot>
                        <Icons className='c-icon' un='&#xe600;' />
                    </Badge>
                    <p className='l-s-t-b-name small'>听歌识曲</p>
                </div>
            </div>
            <div className="left-slider-demand-like">
                <div className="l-s-d-list  mT">
                    <div className="l-s-d-l-left">
                        <Icons className='l-icon' un='&#xe75e;' />
                        <p className='small'>演出</p>
                    </div>
                    <div className="l-s-d-l-right bigsmall">
                        萧金腾
                    </div>
                </div>
                <div className="l-s-d-list">
                    <div className="l-s-d-l-left">
                        <Icons className='l-icon' un='&#xe619;' />
                        <p className='small'>商城</p>
                    </div>
                    <div className="l-s-d-l-right bigsmall">
                        皮卡丘伞39元
                    </div>
                </div>
                <div className="l-s-d-list">
                    <div className="l-s-d-l-left">
                        <Icons className='l-icon' un='&#xe61d;' />
                        <p className='small'>附近的人</p>
                    </div>
                    <div className="l-s-d-l-right bigsmall">
                        听说你也在想我
                    </div>
                </div>
                <div className="l-s-d-list">
                    <div className="l-s-d-l-left">
                        <Icons className='l-icon' un='&#xe717;' />
                        <p className='small'>口袋铃声</p>
                    </div>
                    <div className="l-s-d-l-right bigsmall">

                    </div>
                </div>
                <div className="l-s-d-list">
                    <div className="l-s-d-l-left">
                        <Icons className='l-icon' un='&#xe60b;' />
                        <p className='small'>我的订单</p>
                    </div>
                    <div className="l-s-d-l-right bigsmall">

                    </div>
                </div>
            </div>
            <div className="left-slider-demand-like">
                <div className="l-s-d-list  mT">
                    <div className="l-s-d-l-left">
                        <Icons className='l-icon' un='&#xe75e;' />
                        <p className='small'>演出</p>
                    </div>
                    <div className="l-s-d-l-right bigsmall">
                        萧金腾
                        </div>
                </div>
                <div className="l-s-d-list">
                    <div className="l-s-d-l-left">
                        <Icons className='l-icon' un='&#xe619;' />
                        <p className='small'>商城</p>
                    </div>
                    <div className="l-s-d-l-right bigsmall">
                        皮卡丘伞39元
                        </div>
                </div>
                <div className="l-s-d-list">
                    <div className="l-s-d-l-left">
                        <Icons className='l-icon' un='&#xe61d;' />
                        <p className='small'>附近的人</p>
                    </div>
                    <div className="l-s-d-l-right bigsmall">
                        听说你也在想我
                    </div>
                </div>
                <div className="l-s-d-list">
                    <div className="l-s-d-l-left">
                        <Icons className='l-icon' un='&#xe717;' />
                        <p className='small'>口袋铃声</p>
                    </div>
                    <div className="l-s-d-l-right bigsmall">

                    </div>
                </div>
                <div className="l-s-d-list">
                    <div className="l-s-d-l-left">
                        <Icons className='l-icon' un='&#xe60b;' />
                        <p className='small'>我的订单</p>
                    </div>
                    <div className="l-s-d-l-right bigsmall">

                    </div>
                </div>
                <div className="l-s-d-list  mT">
                    <div className="l-s-d-l-left">
                        <Icons className='l-icon' un='&#xe75e;' />
                        <p className='small'>演出</p>
                    </div>
                    <div className="l-s-d-l-right bigsmall">
                        萧金腾
                        </div>
                </div>
                <div className="l-s-d-list">
                    <div className="l-s-d-l-left">
                        <Icons className='l-icon' un='&#xe619;' />
                        <p className='small'>商城</p>
                    </div>
                    <div className="l-s-d-l-right bigsmall">
                        皮卡丘伞39元
                        </div>
                </div>
                <div className="l-s-d-list">
                    <div className="l-s-d-l-left">
                        <Icons className='l-icon' un='&#xe61d;' />
                        <p className='small'>附近的人</p>
                    </div>
                    <div className="l-s-d-l-right bigsmall">
                        听说你也在想我
                    </div>
                </div>
                <div className="l-s-d-list">
                    <div className="l-s-d-l-left">
                        <Icons className='l-icon' un='&#xe717;' />
                        <p className='small'>口袋铃声</p>
                    </div>
                    <div className="l-s-d-l-right bigsmall">

                    </div>
                </div>
                <div className="l-s-d-list">
                    <div className="l-s-d-l-left">
                        <Icons className='l-icon' un='&#xe60b;' />
                        <p className='small'>我的订单</p>
                    </div>
                    <div className="l-s-d-l-right bigsmall">

                    </div>
                </div>
            </div>


        </div>

    </List>
}

export default PgLeftSlider