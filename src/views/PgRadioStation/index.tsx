import React, { useCallback, useState, useEffect } from 'react';
import { Headers, Skeleton, Icons} from 'components/index'
import { Carousel } from 'antd-mobile';
import { apidjbanner, apidjcatelist, apipersonalizeddjprogram } from 'api'
import './index.scss'
function PgRadioStation(props: any): JSX.Element {

    let [bannerList, setbannerList] = useState<Array<any>>([])
    let [autoPlay, setautoPlay] = useState<boolean>(false)
    let [recommoedlist, setrecommoedList] = useState<Array<any>>([])
    let [cateList, setcateList] = useState<Array<any>>([])


    useEffect(() => {
        getapidjbanner()
        getapidjcatelist()
        getapipersonalizeddjprogram()
    }, [])

    const getapipersonalizeddjprogram = useCallback(() => {
        apipersonalizeddjprogram().then(res => {
            setrecommoedList(res.data)
        })
    }, [])

    const getapidjcatelist = useCallback(() => {
        apidjcatelist().then(res => {
            setcateList(res.data)
        })
    }, [])
    const getapidjbanner = useCallback(() => {
        apidjbanner().then(res => {
            setbannerList(res.data)
            setautoPlay(true)
        })
    }, [])
    return <>
        <div className="adiostation-wrap">
            <Headers props={props}> 电台</Headers>
            <div className="flex">
                <Carousel
                    className='adiostation-carousel'
                    autoplay={autoPlay}
                    infinite
                    beforeChange={() => { }}
                    afterChange={() => { }}
                >
                    {
                        bannerList.length ? bannerList.map(val => (
                            <span
                                key={val}
                                style={{ display: 'inline-block', width: '100%', height: '100%' }}
                            >
                                <img
                                    src={`${val.pic}`}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top', height: '100%' }}
                                    onClick={() => {
                                        val.url ? window.location.href = val.url : null
                                    }}
                                />
                            </span>
                        )) :
                            <Skeleton type={2} />
                    }
                </Carousel>
                <div className="adiostation-tab">
                    <div className="adiostation-tab-tip">
                        <div className="adiostation-tab-tip-icon">
                            <Icons className='adiostation-icon-one' un='&#xe6c6;' />
                        </div>
                        <div className="adiostation-tab-tip-name">
                            电台分类
                    </div>
                    </div>
                    <div className="adiostation-tab-tip" onClick={() => {
                        props.history.push('/radiolist')
                    }}>
                        <div className="adiostation-tab-tip-icon">
                            <Icons className='adiostation-icon-two' un='&#xe673;' />
                        </div>
                        <div className="adiostation-tab-tip-name">
                            电台排行
                    </div>
                    </div>
                    <div className="adiostation-tab-tip">
                        <div className="adiostation-tab-tip-icon">
                            <Icons className='adiostation-icon-three' un='&#xe623;' />
                        </div>
                        <div className="adiostation-tab-tip-name">
                            付费精品
                    </div>
                    </div>
                    <div className="adiostation-tab-tip">
                        <div className="adiostation-tab-tip-icon">
                            <Icons className='adiostation-icon-four' un='&#xe62b;' />
                        </div>
                        <div className="adiostation-tab-tip-name">
                            主播学院
                    </div>
                    </div>
                </div>

                <div className="adiostation-recommend">
                    <div className="adiostation-recommend-title">
                        <div className="adiostation-recommend-title-name">
                            电台推荐<Icons className='recommend-icon' un='&#xe621;' />
                        </div>
                        <div className="adiostation-recommend-title-all">

                        </div>
                    </div>
                    <div className="adiostation-recommend-content">
                        {
                            recommoedlist.map(item => {
                                return (
                                    <div className="adiostation-recommend-content-tip" key={item.id} onClick={() => {
                                        props.history.push(`/radiodetails?id=${item.id}`)
                                    }}>
                                        <div className="adiostation-recommend-content-tip-pic">
                                            <img src={item.picUrl} alt="" />
                                        </div>
                                        <div className="adiostation-recommend-content-tip-text">
                                            <div className="adioe-name">
                                                {item.lastProgramName}
                                            </div>
                                            <div className="adio-author">
                                                <div className="author-pic">
                                                    <img src={item.picUrl} alt="" />
                                                </div>
                                                <div className="author-name">
                                                    {item.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    cateList.map((item, index) => {
                        if (!(index % 2)) {
                            return (
                                <div className="adiostation-recommend mp" key={index}>
                                    <div className="adiostation-recommend-title">
                                        <div className="adiostation-recommend-title-name">
                                            {item.categoryName}<Icons className='recommend-icon' un='&#xe621;' />
                                        </div>
                                        <div className="adiostation-recommend-title-all">

                                        </div>
                                    </div>
                                    <div className="adiostation-content-row">
                                        {
                                            item.radios.map(item => {
                                                return (
                                                    <div className="adiostation-content-row-tip" key={item.id} onClick={() => {
                                                        props.history.push(`/radiodetails?id=${item.id}`)
                                                    }}>
                                                        <div className="adiostation-content-row-price">
                                                            <img src={item.picUrl} alt="" />
                                                        </div>
                                                        <div className="adiostation-content-row-text">
                                                            {item.name} {item.lastProgramName}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            )
                        } else {
                            return <div className="adiostation-recommend mp" key={index}>
                                <div className="adiostation-recommend-title">
                                    <div className="adiostation-recommend-title-name">
                                        {item.categoryName}<Icons className='recommend-icon' un='&#xe621;' />
                                    </div>
                                    <div className="adiostation-recommend-title-all">

                                    </div>
                                </div>
                                <div className="adiostation-recommend-content">
                                    {
                                        item.radios.map(item => {
                                            return (
                                                <div className="adiostation-recommend-content-tip" key={item.id} onClick={() => {
                                                    props.history.push(`/radiodetails?id=${item.id}`)
                                                }}>
                                                    <div className="adiostation-recommend-content-tip-pic">
                                                        <img src={item.picUrl} alt="" />
                                                    </div>
                                                    <div className="adiostation-recommend-content-tip-text">
                                                        <div className="adioe-name">
                                                            {item.name}
                                                        </div>
                                                        <div className="adio-author">
                                                            <div className="author-pic">
                                                                <img src={item.picUrl} alt="" />
                                                            </div>
                                                            <div className="author-name">
                                                                {item.lastProgramName}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        }

                    })
                }
            </div>
                
            
        </div>
    </>
}

export default PgRadioStation