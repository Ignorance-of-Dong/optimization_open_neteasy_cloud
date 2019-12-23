/*
 * @Author: Mr.zheng
 * @Date: 2019-08-09 14:32:22
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-08-09 14:45:33
 * @Description: 
 */
import React from 'react'
export default {
    config: [
        {
            path: "/home",
            component: React.lazy(() => import('../views/PgHome')),
            exact: true
        },
        {
            path: "/loginphone",
            component: React.lazy(() => import('../views/PgLogin/PgPhoneInput')),
            exact: true
        },
        {
            path: "/loginpassword",
            component: React.lazy(() => import('../views/PgLogin/PgPasswordInput')),
            exact: true
        },
        {
            path: "/wrong",
            component: React.lazy(() => import('../views/PgWrong')),
            exact: true
        },
        {
            path: "/mvdetails",
            component: React.lazy(() => import('../views/PgMvDetails')),
            exact: false
        },
        {
            path: "/playdetails",
            component: React.lazy(() => import('../views/PgPlayDetails')),
            exact: false
        },
        {
            path: "/musicplayer",
            component: React.lazy(() => import('../views/PgMusicPlayer')),
            exact: false
        },
        {
            path: "/about",
            component: React.lazy(() => import('../views/PgAbout')),
            exact: false
        },
        {
            path: "/search",
            component: React.lazy(() => import('../views/PgSearch')),
            exact: false
        },
        {
            path: "/yuncun",
            component: React.lazy(() => import('../views/PgYunCun')),
            exact: false
        },
        {
            path: "/recommendeddaily",
            component: React.lazy(() => import('../views/PgRecommendedDaily')),
            exact: false
        },
        {
            path: "/index",
            component: React.lazy(() => import('../views/PgIndex')),
            exact: false,
            children: [
                {
                    path: "/index/fined",
                    component: React.lazy(() => import('../views/PgFind')),
                    exact: true,
                },
                {
                    path: "/index/my",
                    component: React.lazy(() => import('../views/PgMy')),
                    exact: true,
                },
                {
                    path: "/index/firends",
                    component: React.lazy(() => import('../views/PgFirends')),
                    exact: true,
                },
                {
                    path: "/index/vidio",
                    component: React.lazy(() => import('../views/PgVidio')),
                    exact: true,
                }
            ]
        },
    ]
}