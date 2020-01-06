import React, { useCallback, useEffect, useState } from 'react';
import './index.scss'
import {Headers, Icons} from 'components/index'
import { apidjhotlist } from 'api'
function PgRadioList(props: any): JSX.Element {

    let [radiolist, setradiolist] = useState([])
    let [currentSelect, setcurrentSelect] = useState(0)
    const getapidjhotlist = useCallback((type) => {
        let params = {
            type: type
        }
        apidjhotlist(params).then(res => {
            setradiolist(res.toplist)
        })
    }, [])

    useEffect(() => {
        getapidjhotlist('new')
    }, [])

    const checkTab = useCallback((type) => {
        if (type == currentSelect) {
            return;
        }
        setcurrentSelect(type)
        type ? getapidjhotlist('hot') : getapidjhotlist('new')

    }, [currentSelect])

    return <>
        <div className="radiolist-wrap">
            <Headers props={props}> 电台排行榜</Headers>
            <div className="radiolist-tab">
                <div className="radiolist-tab-new" style={{ color: currentSelect == 0 ? 'red' : ''}} onClick={() => {
                    checkTab(0)
                }}>
                    新晋电台榜
                    <div className="line" style={{ display: currentSelect == 0 ? 'block' : 'none'}}></div>
                </div>
                <div className="radiolist-tab-hot" style={{ color: currentSelect == 1 ? 'red' : '' }} onClick={() => {
                    checkTab(1)
                }}>
                    热门电台榜
                    <div className="line" style={{ display: currentSelect == 1 ? 'block' : 'none'}}></div>
                </div>
            </div>
            <div className="radiolist-content">
                {
                    radiolist.map((item, index) => {
                        if (index == 0 || index ==1 || index == 2) {
                            return (
                                <div className="radiolist-tip" key={item.id} onClick={() => {
                                    props.history.push(`/radiodetails?id=${item.id}`)
                                }}>
                                    <div className="r-t-serial" style={{color: 'red'}}>
                                        {index + 1}
                                    </div>
                                    <div className="r-t-pic">
                                        <img src={item.picUrl} alt="" />
                                    </div>
                                    <div className="r-t-content">
                                        <div className="radiolist-name">
                                            {item.name}
                                        </div>
                                        <div className="radiolist-author">
                                            {item.creatorName}
                                        </div>
                                        <div className="radiolist-hot">
                                            <Icons className='radiolist-icon' un='&#xe660;' />{item.subCount}
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className="radiolist-tip" key={item.id} onClick={() => {
                                    props.history.push(`/radiodetails?id=${item.id}`)
                                }}>
                                    <div className="r-t-serial">
                                        {index + 1}
                                    </div>
                                    <div className="r-t-pic">
                                        <img src={item.picUrl} alt="" />
                                    </div>
                                    <div className="r-t-content">
                                        <div className="radiolist-name">
                                            {item.name}
                                        </div>
                                        <div className="radiolist-author">
                                            {item.creatorName}
                                        </div>
                                        <div className="radiolist-hot">
                                            <Icons className='radiolist-icon' un='&#xe660;' />{item.subCount}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        
                    })
                }
                
            </div>
        </div>
    </>
}

export default PgRadioList