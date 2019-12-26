import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Carousel } from 'antd-mobile';
import { Icons } from 'components/index'
import { apievent, apisongurl, apihotcomment } from 'api'
import gifMusic from 'assets/images/music.gif'
import './index.scss'
function YunCun(props: any): JSX.Element {
    let [cloudVillageReviews, setCloudVillageReviews] = useState<Array<any>>([])
    let [currentSlidingId, setCurrentSlidingId] = useState<number>(1)
    let [currentBackground, setCurrentBackground] = useState<string>('')
    let [songUrl, setsongUrl] = useState<string>('')
    let [hotComments, sethotComments] = useState<Array<any>>([])
    let [autoplay, setautoplay] = useState<boolean>(false)
    let audiosRef = useRef(null)

    const getCloudVillageReviews = useCallback(async (): Promise<any> => {
        await apievent().then(res => {
            setCloudVillageReviews(res.data)
            setCurrentBackground(res.data[0].simpleResourceInfo.songCoverUrl)
            getSongUrl(res.data[0].simpleResourceInfo.songId)
        }).catch(err => {
        })
    }, [cloudVillageReviews])

    const getSongUrl = useCallback( async (id): Promise<any> => {
        if (id){
            let params = {
                id: id
            }
            await apisongurl(params).then(res => {
                setsongUrl(res.data[0].url)
            })
            await apihotcomment(params).then(res => {
                sethotComments(res.hotComments)
                setautoplay(true)
            })
            audiosRef.current.play()
        }
    }, [])


    useEffect((): void => {
        getCloudVillageReviews()
    }, [])

    const changeCarousel = useCallback((index): void => {
        setCurrentSlidingId(index + 1)
        audiosRef.current.pause()
    }, [])

    useEffect((): void => {
        let backgroundResult = cloudVillageReviews.length ? cloudVillageReviews[currentSlidingId - 1].simpleResourceInfo.songCoverUrl : ''
        let songUrlId = cloudVillageReviews.length ? cloudVillageReviews[currentSlidingId - 1].simpleResourceInfo.songId : ''
        setCurrentBackground(backgroundResult)
        getSongUrl(songUrlId)
    }, [currentSlidingId])
    
    return <>
        <div className="audios">
            <audio src={songUrl} controls preload="auto" ref={audiosRef} />
        </div>
        <div className="yuncun-wall-wrap-mask" style={{
            backgroundColor: '#000',
            backgroundImage: `url(${currentBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '10%'
        }}>
        </div>
        <div className="yuncun-wall-wrap">
            <div className="yuncun-wall-header">
                <div className="back-header">
                    <svg className="header-icon" width={15} height={22} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" onClick={() => { props.history.go(-1) }}>
                        <path fill='#fff' d="M317.288601 514.022357L774.12597 54.614875a32.126397 32.126397 0 0 0-45.619484-44.976956L249.180639 488.963767a32.126397 32.126397 0 0 0 0 45.619484l479.968375 479.968376a32.126397 32.126397 0 0 0 45.619484-45.619485z" />
                    </svg>
                </div>
                <div className="text-header">
                    热评墙
                </div>
                <div className="speed">
                    {currentSlidingId} / {cloudVillageReviews.length}
                </div>
            </div>
            <div className="yuncun-wall-contant">
                    <Carousel
                        className="yuncun-wall-space-carousel"
                        autoplay={false}
                        dots={false}
                        beforeChange={(from, to) => {}}
                        afterChange={index => {
                            changeCarousel(index)
                        }}
                    >
                        {
                            cloudVillageReviews.length ? cloudVillageReviews.map((item, index) => {
                                return(
                                    <div className="yuncun-wall-contant-tip" key={index}>
                                        <div className="yuncun-wall-contant-tip-contant">
                                            <div className="yuncun-wall-information">
                                                <div className="yuncun-wall-portrait">
                                                    <div className="left-header-image">
                                                        <img src={item.simpleUserInfo.avatar} alt=""/>
                                                    </div>
                                                    <div className="left-header-name">
                                                        {item.simpleUserInfo.nickname}
                                                    </div>
                                                </div>
                                                <div className="yuncun-wall-punctuation">
                                                    <Icons className='yuncun-wall-lower-icon' un='&#xe622;' />
                                                </div>
                                                <div className="yuncun-wall-aspirations">
                                                    <div className="text-alise">
                                                        <span>{item.content}</span>
                                                        <div className="yuncun-wall-aspirations-music">
                                                            <div className="yuncun-wall-aspirations-content">
                                                                {item.simpleResourceInfo.name} - {item.simpleResourceInfo.artists[0].name}
                                                                <div className="git-music">
                                                                    <img src={gifMusic} alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : null
                        }
                        
                    </Carousel>
                    <div className="floating-comment">
                        <Carousel className="my-carousel"
                            vertical
                            dots={false}
                            autoplay={autoplay}
                            infinite
                            autoplayInterval={3000}
                        >
                            {
                                hotComments.map(item => (
                                    <div className="yuncun-wall-commit" key={item.commentId}>{item.content}</div>
                                ))
                            }
                        </Carousel>
                    </div>
            </div>
        </div>
    </>
}

export default YunCun