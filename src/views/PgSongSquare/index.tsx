import React, { useEffect, useRef, useState, useCallback } from 'react';
import './index.scss'
import Swiper from 'swiper';
import { Headers } from 'components/index'
import { Tabs, PullToRefresh } from 'antd-mobile';
import { apiplaylistcatlist, apiresource } from 'api'
import 'swiper/css/swiper.min.css'
import Item from 'antd-mobile/lib/popover/Item';
function PgSongSquare(props: any) {

    const activationSwiper = () => {
        new Swiper('.swiper-container', {
            effect: 'coverflow', //3d滑动
            grabCursor: true,
            centeredSlides: true,
            loop: true,
            slidesPerView: 2,
            // autoplay: true,
            coverflow: {
                rotate: 0,  //设置为0
                stretch: 0,
                depth: 200,
                modifier: 2,
                slideShadows: true
            }
        });
    }


    const listRef = useRef(null)
    const headerRef = useRef(null)

    let [listHeight, setListHeight] = useState(0)
    let [navList, setNavList] = useState([])
    let [recommendSongOrder, setRecommendSongOrder] = useState([])
    



    const getapiplaylistcatlist = useCallback(() => {
        apiplaylistcatlist().then(res => {
            setNavList(res.tags)
        })
    }, [])

    const getapiresource = useCallback(() => {
        apiresource().then(res => {
            setRecommendSongOrder(res.recommend)
        })
    }, [])


    useEffect(() => {
        activationSwiper()
        const hei = document.documentElement.clientHeight - (headerRef.current.headerRef.current.offsetHeight * 2); // 获取到当前可适高度
        setListHeight(hei)
        getapiplaylistcatlist()
        getapiresource()
    
    }, [])

    const renderContent = tab =>{
        return (<div className='tab-contant'>
            {
                tab.title == '推荐' ? 
                <>
                        <div className="song-square-swiper-wrap scroll">
                            <div className="swiper-container">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <div className="cursol-pic">
                                            <img src="https://p1.music.126.net/p740yza0rMuSvEMzYpWMFA==/18607035278550374.jpg" alt=""/>
                                        </div>
                                        <div className="cursol-name">
                                            4撒回答后即可打开等哈就肯定会
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="cursol-pic">
                                            <img src="https://p1.music.126.net/p740yza0rMuSvEMzYpWMFA==/18607035278550374.jpg" alt="" />
                                        </div>
                                        <div className="cursol-name">
                                            4撒回答后即可打开等哈就肯定会
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="song-order-list">
                            <div className="recommended-song-list">
                                {
                                    recommendSongOrder.map(item => {
                                        return (
                                            <div className="recommended-song-tip" key={item.id}>
                                                <div className="recommended-song-price">
                                                    <img src={item.picUrl} alt="" />
                                                </div>
                                                <div className="recommended-song-text">
                                                    {item.name}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>

                </>
                :
                <div className="song-order-list">
                        <PullToRefresh
                            damping={60}
                            style={{
                                height: listHeight,
                                overflow: 'auto',
                            }}
                            ref={listRef}
                            indicator={{ deactivate: '...' }}
                            direction={'down'}
                            refreshing={false}
                            distanceToRefresh={25}
                            getScrollContainer={() => undefined}
                            onRefresh={async () => {
                                // setrefreshing(true)
                                // await getVideoList(tarList[tagId]['id'])
                                // setrefreshing(false)
                            }}
                        >
                            <div className="recommended-song-list">
                                {
                                    [1, 2, 12, 45, 43235, 48, 46, 3, 131, 43336, 333, 12331].map(res => {
                                        return (
                                            <div className="recommended-song-tip" key={res}>
                                                <div className="recommended-song-price">
                                                    <img src="https://p1.music.126.net/JvbAyOF7UaASaSIK8_tFsA==/109951164568098731.jpg" alt=""/>
                                                </div>
                                                <div className="recommended-song-text">
                                                    心中的圣诞｜只为等待那份爱的礼物
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </PullToRefresh>
                </div>
            }
        </div>);
    }

    const conversion = (taglist: Array<any>): Array<any> => {
        let newArr = [{id: 0,title: '推荐'}]
        taglist.forEach((item) => {
            newArr.push({
                id: item.id,
                title: item.name
            })
        })
        return newArr
    }

    const tagChange = useCallback( (modules) => {
        console.log(modules)
    }, [])
    return <>
        <div className="song-square-wrap">
            <Headers props={props} ref={headerRef}>歌单广场</Headers>
            <div className="song-square-nav">
                <Tabs 
                    tabs={conversion(navList)}
                    swipeable={false}
                    tabBarActiveTextColor='red'
                    onChange={(modules) => {tagChange(modules)}}
                    tabBarUnderlineStyle={{ border: '1px red solid'}}
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}>
                    {renderContent}
                </Tabs>
            </div>
        </div>
    </>
}

export default PgSongSquare