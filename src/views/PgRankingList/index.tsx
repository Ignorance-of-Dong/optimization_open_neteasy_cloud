/*
 * @Author: zhangzheng
 * @Date: 2020-08-05 16:07:26
 * @LastEditors: zhangzheng
 * @LastEditTime: 2021-07-30 15:59:46
 * @Descripttion: 
 */
import React from 'react';
import './index.scss'
import { Headers } from 'components/index'
import Singlerowdata from './singleRowData'

function PgRankingList(props: any): JSX.Element {

    return <>
        <div className="ranking-list-wrap">
            <Headers props={props}> 排行榜 </Headers>
            <div className="rangking-list-contant">
                {
                    Singlerowdata.map((item, index) => {
                        return (
                            <div className="rangking-list-tip" key={index}>
                                <div className="rangking-list-tip-header">
                                    {item.title}
                                </div>
                                <div className="rangking-list-tip-list">
                                    {
                                        item.datalist.map(items => {
                                            return (
                                                <div className="rangking-list-tip-low" key={items.id * 100} onClick={() => {
                                                    props.history.push(`/playdetails?id=${items.id}&isList={true}`)
                                                }}>
                                                    <div className="rangking-list-tip-pic">
                                                        <img src={items.pic} alt="" />
                                                    </div>
                                                    <div className="rangking-list-tip-name">
                                                        {items.name}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    </>
}
export default PgRankingList