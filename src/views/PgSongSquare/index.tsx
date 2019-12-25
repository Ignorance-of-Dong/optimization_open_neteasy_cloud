import React, { useEffect, useRef, useState, useCallback } from 'react';
import './index.scss'
import Swiper from 'swiper';
import { Headers } from 'components/index'
import { Tabs, PullToRefresh } from 'antd-mobile';
import { apiplaylistcatlist, apiresource, apipersonalizedSongList, apihighqualitylist } from 'api'
import 'swiper/css/swiper.min.css'
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
    let [topSongOrder, setTopSongOrder] = useState([])
    let [pageupdateTime, setupdateTime] = useState('')
    let [currenTag, setCurrenTag] = useState('')
    let [isPage, setIsPage] = useState(true)
    let [supplement, setSupplement] = useState([])
    



    const getapiplaylistcatlist = useCallback(() => {
        apiplaylistcatlist().then(res => {
            setNavList(res.tags)
        })
    }, [])

    const getapihighqualitylist = useCallback((Aug) => {
        let { ISPAGE = false, title = currenTag} = Aug
        let params = {
            cat: title,
            limit: 21,
            before: pageupdateTime
        }
        apihighqualitylist(params).then(async res => {
            if (ISPAGE) {
                let arr = []
                const Ug = (recommendSongOrder.length + res.playlists.length) % 3;
                for (let i = 1; i < Ug; i++) {
                    arr.push(1)
                }
                setSupplement(arr)
                await setRecommendSongOrder([
                    ...recommendSongOrder,
                    ...res.playlists,
                ])
            } else {
                let arr = []
                const Ug = (res.playlists.length) % 3;
                for (let i = 1; i < Ug; i++) {
                    arr.push(1)
                }
                setSupplement(arr)
                await setRecommendSongOrder(res.playlists)
            }
            
            setupdateTime(res.lasttime)
            setIsPage(res.more)
        })
    }, [recommendSongOrder, currenTag, pageupdateTime])


    const addM = useCallback(() => {
        let Sup = recommendSongOrder.length % 3;
        let arr = []
        
        
    }, [recommendSongOrder])

    const getapiresource = useCallback(() => {
        let topList = []
        let remList = []
        let params = {
            limit: 33
        }
        apipersonalizedSongList(params).then(res => {
            res.result.forEach((item, index) => {
                if (index == 1 || index == 2 || index == 0) {
                    topList.push(item)
                } else {
                    remList.push(item)
                }
            })
            setTopSongOrder(topList)
            setRecommendSongOrder(remList)
        })
    }, [])

    const init = async () => {
        await getapiplaylistcatlist()
        await getapiresource()
        setTimeout( async () => {
            await activationSwiper()
        }, 500)
    }

    useEffect(() => {
        init()
        const hei = document.documentElement.clientHeight - (headerRef.current.headerRef.current.offsetHeight * 2); // 获取到当前可适高度
        setListHeight(hei)
    }, [])

    const renderContent = tab =>{
        return (<div className='tab-contant'>
            {
                tab.title == '推荐' ? 
                <>
                        <PullToRefresh
                            damping={60}
                            style={{
                                height: listHeight,
                                overflow: 'auto',
                            }}
                            ref={listRef}
                            indicator={{ deactivate: '...' }}
                            direction={'up'}
                            refreshing={false}
                            distanceToRefresh={25}
                            getScrollContainer={() => undefined}
                            onRefresh={async () => {
                            }}
                        >
                        <div className="song-square-swiper-wrap scroll">
                            <div className="swiper-container">
                                <div className="swiper-wrapper">
                                    {
                                        topSongOrder.map(item => {
                                            return (
                                                <div className="swiper-slide" key={item.id}>
                                                    <div className="cursol-pic" onClick={() => {
                                                        props.history.push(`/playdetails?id=${item.id}`)
                                                    }}>
                                                        <img src={item.picUrl} alt="" />
                                                    </div>
                                                    <div className="cursol-name">
                                                        {item.name}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="song-order-list">
                            <div className="recommended-song-list">
                                {
                                    recommendSongOrder.map(item => {
                                        return (
                                            <div className="recommended-song-tip" key={item.id} onClick={() => {
                                                props.history.push(`/playdetails?id=${item.id}`)
                                            }}>
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
                    </PullToRefresh>
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
                            direction={'up'}
                            refreshing={false}
                            distanceToRefresh={25}
                            getScrollContainer={() => undefined}
                            onRefresh={async () => {
                                isPage ? getapihighqualitylist({ISPAGE:true}) : null
                            }}
                        >
                            <div className="recommended-song-list">
                                {
                                    recommendSongOrder.map(item => {
                                        return (
                                            <div className="recommended-song-tip" key={item.id} onClick={() => {
                                                props.history.push(`/playdetails?id=${item.id}`)
                                            }}>
                                                <div className="recommended-song-price">
                                                    <img src={item.coverImgUrl} alt="" />
                                                </div>
                                                <div className="recommended-song-text">
                                                    {item.name}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    supplement.map(item => {
                                        return (
                                            <div className="recommended-song-tip" key={item} style={{opacity: 0}}>
                                                <div className="recommended-song-price">
                                                    {/* <img src={item.coverImgUrl} alt="" /> */}
                                                </div>
                                                <div className="recommended-song-text">
                                                    {/* {item.name} */}
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

    const tagChange = useCallback( async (modules) => {
        let { id, title } = modules
        await setRecommendSongOrder([])
        await setupdateTime('')
        if (id) {
            await setCurrenTag(title)
            await getapihighqualitylist({ title })
        } else {
            await getapiresource()
        }
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