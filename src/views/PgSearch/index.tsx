import React, { useEffect, useState, useCallback, memo } from 'react'
import './index.scss'
import { Icon, Tabs } from 'antd-mobile';
import { apisearchhotdetai, apisearchsuggest } from 'api'


const SingleSearchResults = (props) => {
    useEffect(() => {
        console.log('进入单曲tab')
    },[])
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
                                    props.playerStore.handleSongListType("default")
                                    props.playerStore.handleGetSongId(res.id)
                                    props.history.push(`/musicplayer`)
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


const AlbumSearchResults = (props) => {
    let [searchAlubm, setsearchAlubm] = useState<Array<any>>([])
    useEffect((): void => {
        goSearchSong(props.keywords)
    }, [])

    const goSearchSong = useCallback((keywords, type = 1): void => {
        let params = {
            keywords,
            type: 10
        }
        apisearchsuggest(params).then(res => {
            // if(type == 1) {
            setsearchAlubm(res.result.albums)
            // }
            // console.log(res)
        })
    }, [])
    useEffect(() => {
        console.log('进入专辑tab')
    }, [])
    console.log()
    return <>
        <div className="album-search-warp">
            {
                searchAlubm.map(item => {
                    return (
                        <div className="album-search-tip" key={item.id} onClick={() => {
                            props.history.push(`/playdetails?id=${item.id}&isAlumb=${true}`)
                        }}>
                            <div className="album-search-pic">
                                <img src={item.blurPicUrl} alt=""/>
                            </div>
                            <div className="album-search-context">
                                <div className="album-search-context-name">
                                    {item.name}
                                </div>
                                <div className="album-search-context-author">
                                    {item.artist.name}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </>
}

const SongSheetSearchResults = (props) => {
    let [searchSheet, setsearchSheet] = useState<Array<any>>([])
    useEffect((): void => {
        goSearchSong(props.keywords)
    }, [])

    const goSearchSong = useCallback((keywords): void => {
        let params = {
            keywords,
            type: 1000
        }
        apisearchsuggest(params).then(res => {
            setsearchSheet(res.result.playlists)
        })
    }, [])
    return <>
        <div className="songsheet-wrap">
            {
                searchSheet.map(item => {
                    return (
                        <div className="songsheet-search-tip" key={item.id} onClick={() => {
                            props.history.push(`/playdetails?id=${item.id}`)
                        }}>
                            <div className="songsheet-search-pic">
                                <img src={item.coverImgUrl} alt="" />
                            </div>
                            <div className="songsheet-search-context">
                                <div className="songsheet-search-context-name">
                                    {item.name}
                                </div>
                                <div className="songsheet-search-context-author">
                                    {item.trackCount}首 by {item.creator.nickname}， 播放{item.playCount}次
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    </>
}

const VideoSearchResults = (props) => {

    let [videoSheet, setvideoSheet] = useState<Array<any>>([])

    useEffect((): void => {
        goSearchSong(props.keywords)
    }, [])

    const goSearchSong = useCallback((keywords): void => {
        let params = {
            keywords,
            type: 1004
        }
        apisearchsuggest(params).then(res => {
            setvideoSheet(res.result.mvs)
        })
    }, [])
    return <>
        <div className="videos-wrap">
            {
                videoSheet.map(item => {
                    return (
                        <div className="videos-search-tip" key={item.id} onClick={() => {
                            props.history.push(`/mvdetails?id=${item.id}`)
                        }}>
                            <div className="videos-search-pic">
                                <img src={item.cover} alt="" />
                            </div>
                            <div className="videos-search-context">
                                <div className="videos-search-context-name">
                                    {item.name} {item.briefDesc ? (item.briefDesc) : ''}
                                </div>
                                <div className="videos-search-context-author">
                                    {item.artists[0].name}， 播放{item.playCount}次
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </>
}

const RadioStationSearchResults = (props) => {
    let [searchSheet, setsearchSheet] = useState<Array<any>>([])
    useEffect((): void => {
        goSearchSong(props.keywords)
    }, [])

    const goSearchSong = useCallback((keywords): void => {
        let params = {
            keywords,
            type: 1009
        }
        apisearchsuggest(params).then(res => {
            setsearchSheet(res.result.djRadios)
        })
    }, [])
    return <>
        <div className="songsheet-wrap">
            {
                searchSheet.map(item => {
                    return (
                        <div className="songsheet-search-tip" key={item.id} onClick={() => {
                            props.history.push(`/radiodetails?id=${item.id}`)
                        }}>
                            <div className="songsheet-search-pic">
                                <img src={item.picUrl} alt="" />
                            </div>
                            <div className="songsheet-search-context">
                                <div className="songsheet-search-context-name">
                                    {item.name}
                                </div>
                                <div className="songsheet-search-context-author">
                                    {item.dj.nickname}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    </>
}


const AlbumSearchResultsPro = memo(AlbumSearchResults)

function PgSearch(props: any): JSX.Element {
    let [hotSong, sethootSong] = useState<Array<any>>([])
    let [searchSong, setsearchSong] = useState<Array<any>>([])
    let [searchWord, setsearchWord] = useState<string>('')

    const tabs = [
        { title: '单曲', id: '1'},
        { title: '专辑', id: '10' },
        { title: '歌单', id: '1000' },
        { title: '电台', id: '1009' },
        { title: 'MV', id: '1004' }
    ];


    const getApisearchhotdetai = useCallback((): void => {
        apisearchhotdetai().then(res => {
            sethootSong(res.data)
        })
    }, [])
    
    useEffect((): void => {
        getApisearchhotdetai()
    }, [])

    const goSearchSong = useCallback((keywords, type = 1): void => {
        let params = {
            keywords,
            type
        }
        apisearchsuggest(params).then(res => {
            setsearchSong(res.result.songs)
        })
    }, [])

    function quickSearchSong(keywords): void {
        setsearchWord(keywords)
        goSearchSong(keywords)
    }

    const renderContent = useCallback((tab): JSX.Element =>{
        switch (tab.title) {
            case '单曲':
                return <SingleSearchResults searchSong={searchSong} history={props.history} quickSearchSong={quickSearchSong} />
                break;
            case '专辑':
                return <AlbumSearchResults keywords={searchWord} history={props.history} />
                break;
            case '歌单':
                return <SongSheetSearchResults keywords={searchWord} history={props.history}/>
                break;
            case '电台':
                return <RadioStationSearchResults keywords={searchWord} history={props.history}/>
                break;
            case 'MV':
                return <VideoSearchResults keywords={searchWord} history={props.history} />
                break;
        }
    }, [searchSong])
    

    const tagChange = useCallback((modules) => {
        // console.log(modules)
        // goSearchSong(searchWord, modules.id)
    }, [searchWord])

    const queryChange = useCallback((e) => {
        if (e.target.value == '') {
            setsearchSong([])
        }
        setsearchWord(e.target.value)
    }, [])
    return(
        <>
            <div className="search-wrap">
                <div className="search-title">
                    <svg className="header-icon" width={15} height={22} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" onClick={() => { props.history.go(-1) }}>
                        <path fill='#000' d="M317.288601 514.022357L774.12597 54.614875a32.126397 32.126397 0 0 0-45.619484-44.976956L249.180639 488.963767a32.126397 32.126397 0 0 0 0 45.619484l479.968375 479.968376a32.126397 32.126397 0 0 0 45.619484-45.619485z" />
                    </svg>
                    <input type="text" value={searchWord} className='search-input' onChange={(e) => {
                        queryChange(e)
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
                            prerenderingSiblingsNumber={0}
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