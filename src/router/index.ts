/*
 * @Author: Mr.zheng
 * @Date: 2019-08-09 14:32:22
 * @LastEditors: zhangzheng
 * @LastEditTime: 2021-08-17 11:58:26
 * @Description: 
 */
import React from 'react'
export default {
    config: [
        {
            path: "/home",
            component: React.lazy(() => import('../views/PgHome')),
            exact: true,
            meta: {
                isGloblePlayer: false
            }
        },
        {
            path: "/loginphone",
            component: React.lazy(() => import('../views/PgLogin/PgPhoneInput')),
            exact: true,
            meta: {
                isGloblePlayer: false
            }
        },
        {
            path: "/loginpassword",
            component: React.lazy(() => import('../views/PgLogin/PgPasswordInput')),
            exact: true,
            meta: {
                isGloblePlayer: false
            }
        },
        {
            path: "/wrong",
            component: React.lazy(() => import('../views/PgWrong')),
            exact: true,
            meta: {
                isGloblePlayer: false
            }
        },
        {
            path: "/mvdetails",
            component: React.lazy(() => import('../views/PgMvDetails')),
            exact: false,
            meta: {
                isGloblePlayer: false
            }
        },
        {
            path: "/playdetails",
            component: React.lazy(() => import('../views/PgPlayDetails')),
            exact: false,
            meta: {
                isGloblePlayer: true
            }
        },
        {
            path: "/musicplayer",
            component: React.lazy(() => import('../views/PgMusicPlayer')),
            exact: false,
            meta: {
                isGloblePlayer: false
            }
        },
        {
            path: "/about",
            component: React.lazy(() => import('../views/PgAbout')),
            exact: false,
            meta: {
                isGloblePlayer: true
            }
        },
        {
            path: "/search",
            component: React.lazy(() => import('../views/PgSearch')),
            exact: false,
            meta: {
                isGloblePlayer: true
            }
        },
        {
            path: "/yuncun",
            component: React.lazy(() => import('../views/PgYunCun')),
            exact: false,
            meta: {
                isGloblePlayer: false
            }
        },
        {
            path: "/recommendeddaily",
            component: React.lazy(() => import('../views/PgRecommendedDaily')),
            exact: false,
            meta: {
                isGloblePlayer: true
            }
        },
        {
            path: "/songsquare",
            component: React.lazy(() => import('../views/PgSongSquare')),
            exact: false,
            meta: {
                isGloblePlayer: true
            }
        },
        {
            path: "/rankinglist",
            component: React.lazy(() => import('../views/PgRankingList')),
            exact: false,
            meta: {
                isGloblePlayer: true
            }
        },
        {
            path: "/radiostation",
            component: React.lazy(() => import('../views/PgRadioStation')),
            exact: false,
            meta: {
                isGloblePlayer: true
            }
        },
        {
            path: "/radiodetails",
            component: React.lazy(() => import('../views/PgRadioDetails')),
            exact: false,
            meta: {
                isGloblePlayer: true
            }
        },
        {
            path: "/radiolist",
            component: React.lazy(() => import('../views/PgRadioList')),
            exact: false,
            meta: {
                isGloblePlayer: true
            }
        },
        {
            path: "/index",
            component: React.lazy(() => import('../views/PgIndex')),
            exact: false,
            meta: {
                isGloblePlayer: true
            },
            children: [
                {
                    path: "/index/fined",
                    component: React.lazy(() => import('../views/PgFind')),
                    exact: true,
                    meta: {
                        isGloblePlayer: true
                    }
                },
                {
                    path: "/index/my",
                    component: React.lazy(() => import('../views/PgMy')),
                    exact: true,
                    meta: {
                        isGloblePlayer: true
                    }
                },
                {
                    path: "/index/firends",
                    component: React.lazy(() => import('../views/PgFirends')),
                    exact: true,
                    meta: {
                        isGloblePlayer: true
                    }
                },
                {
                    path: "/index/vidio",
                    component: React.lazy(() => import('../views/PgVidio')),
                    exact: true,
                    meta: {
                        isGloblePlayer: false
                    }
                }
            ]
        },
    ]
}