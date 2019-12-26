import React, { useEffect, useState, useCallback } from 'react'
import './index.scss'
import { Icon } from 'antd-mobile';
import { apisearchhotdetai, apisearchsuggest } from 'api'


function PgSearch(props: any): JSX.Element {
    let [hotSong, sethootSong] = useState<Array<any>>([])
    let [searchSong, setsearchSong] = useState<Array<any>>([])
    let [searchWord, setsearchWord] = useState<string>('')

    const getApisearchhotdetai = useCallback((): void => {
        apisearchhotdetai().then(res => {
            sethootSong(res.data)
        })
    }, [])
    
    useEffect((): void => {
        getApisearchhotdetai()
    }, [])

    const goSearchSong = useCallback((keywords): void => {
        let params = {
            keywords
        }
        apisearchsuggest(params).then(res => {
            setsearchWord('')
            setsearchSong(res.result.songs)
        })
    }, [])

    function quickSearchSong(keywords): void {
        setsearchWord(keywords)
        goSearchSong(keywords)
    }
    return(
        <>
            <div className="search-wrap">
                <div className="search-title">
                    <svg className="header-icon" width={15} height={22} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" onClick={() => { props.history.go(-1) }}>
                        <path fill='#000' d="M317.288601 514.022357L774.12597 54.614875a32.126397 32.126397 0 0 0-45.619484-44.976956L249.180639 488.963767a32.126397 32.126397 0 0 0 0 45.619484l479.968375 479.968376a32.126397 32.126397 0 0 0 45.619484-45.619485z" />
                    </svg>
                    <input type="text" value={searchWord} className='search-input' onChange={(e) => {
                        // console.log(e.target.value)
                        setsearchWord(e.target.value)
                    }}/>    
                    <Icon key="0" type="search" style={{ marginRight: '10' }} onClick={() => {
                        goSearchSong(searchWord)
                    }} />
                </div>
                <div className="search-content">
                    <div className="search-header-title">
                        
                        {searchSong.length ? '搜索结果' : '热搜榜'}
                    </div>
                    {
                        searchSong.length ? <div className="search-content-list">
                            {
                                searchSong.map((res, index) => {
                                    return (
                                        <div className="search-content-tip" key={index} onClick={() => {
                                            sessionStorage.setItem('songListDetails', JSON.stringify(searchSong))
                                            props.history.push(`/musicplayer?id=${res.id}`)
                                        }}>
                                            <div className="search-content-tip-number">
                                                {index + 1}.
                                        </div>
                                            <div className="search-content-tip-content">
                                                <div className="search-content-song-name">
                                                    {res.name}{res.alias.length ? <span className='introduce'>（{res.alias[0]}）</span> : null}
                                                </div>
                                                <div className="search-content-song-introduce">
                                                    {
                                                        res.artists.map((data, index) => {
                                                            return(
                                                                <span className='search-content-song-author' key={index}>
                                                                    {data.name}
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div> : <div className="search-content-list">
                                {
                                    hotSong.map((res, index) => {
                                        return (
                                            <div className="search-content-tip" key={index} onClick={() => {
                                                quickSearchSong(res.searchWord)
                                            }}>
                                                <div className="search-content-tip-number">
                                                    {index + 1}.
                                                </div>
                                                <div className="search-content-tip-content">
                                                    <div className="search-content-song-name">
                                                        {res.searchWord}
                                                    </div>
                                                    <div className="search-content-song-introduce">
                                                        {res.content}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default PgSearch