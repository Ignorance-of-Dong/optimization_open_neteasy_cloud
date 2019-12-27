import React, { useEffect, useState, useCallback } from 'react'
import './index.scss'
import { Icon, Tabs } from 'antd-mobile';
import { apisearchhotdetai, apisearchsuggest } from 'api'


const SingleSearchResults = (props) => {
    let { searchSong } = props
    return (
        <>
            {
                <div className="search-content-list">
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
                                                    return (
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
                </div>
            }

        </>
    )
}

function PgSearch(props: any): JSX.Element {
    let [hotSong, sethootSong] = useState<Array<any>>([])
    let [searchSong, setsearchSong] = useState<Array<any>>([])
    let [searchWord, setsearchWord] = useState<string>('')

    const tabs = [
        { title: '单曲' },
        { title: '专辑' },
        { title: '歌单' },
        { title: 'MV' },
        { title: '电台' },
        { title: '视频' }
    ];


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
            // setsearchWord('')
            setsearchSong(res.result.songs)
        })
    }, [])

    function quickSearchSong(keywords): void {
        setsearchWord(keywords)
        goSearchSong(keywords)
    }

    const renderContent = (tab) =>{
        console.log(tab)
        switch (tab.title){
            case '单曲':
                return <SingleSearchResults searchSong={searchSong} history={props.history} quickSearchSong={quickSearchSong}/>
            break;
            case '专辑':
                return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    <p>专辑</p>
                </div>
            break;
            case '歌单':
                return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    <p>歌单</p>
                </div>
            break;
            case 'MV':
                return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    <p>MV</p>
                </div>
            break;
            case '电台':
                return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    <p>电台</p>
                </div>
            break;
            case '视频':
                return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    <p>视频</p>
                </div>
            break;
            case '综合':
                return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    <p>综合</p>
                </div>
            break;
        }
    }
    

    const tagChange = useCallback((modules) => {
        console.log()
    }, [])
    return(
        <>
            <div className="search-wrap">
                <div className="search-title">
                    <svg className="header-icon" width={15} height={22} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" onClick={() => { props.history.go(-1) }}>
                        <path fill='#000' d="M317.288601 514.022357L774.12597 54.614875a32.126397 32.126397 0 0 0-45.619484-44.976956L249.180639 488.963767a32.126397 32.126397 0 0 0 0 45.619484l479.968375 479.968376a32.126397 32.126397 0 0 0 45.619484-45.619485z" />
                    </svg>
                    <input type="text" value={searchWord} className='search-input' onChange={(e) => {
                        setsearchWord(e.target.value)
                    }}/>
                    <Icon key="0" type="search" style={{ marginRight: '10' }} onClick={() => {
                        goSearchSong(searchWord)
                    }} />
                </div>
                <div className="search-content">
                    {
                        !searchSong.length ? <div className="search-header-title">
                            {'热搜榜'}
                        </div>: null
                    }
                    {
                        searchSong.length ? 
                            <Tabs 
                            tabBarActiveTextColor='red'
                            onChange={(modules) => { tagChange(modules) }}
                                tabBarUnderlineStyle={{
                                    border: '1px red solid', }}
                            tabs={tabs} 
                            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={6} />}>
                                {renderContent}
                            </Tabs>
                        :
                            <div className="search-content-list">
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