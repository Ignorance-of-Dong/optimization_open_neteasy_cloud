/*
 * @Author: Mr.zheng
 * @Date: 2019-08-09 15:00:51
 * @LastEditors: zhangzheng
 * @LastEditTime: 2021-08-16 17:05:45
 * @Description: 
 */
// import axios from 'axios'
import fetch from 'utils/fetch'



/**
 * 查询mv的地址
 */
function mvsetusl() {
  return fetch.post('/mv/url?id=5436712')
}

/**
 * 查询视频标签列表
 */
function videoGroup() {
  return fetch.post('/video/group?id=9104')
}






/**
 * 推荐歌单
 */
function apipersonalizedSongList(params) {
  return fetch.post(`/personalized?limit=${params.limit}`, {})
}

/**
 * 推荐新碟
 */
function apialbum(params) {
  return fetch.post(`/album/new?limit=${params.limit}`, {})
}


/**
 * 推荐mv
 * @param params 
 */
function apipersonalizedMv(params) {
  return fetch.post(`/personalized/mv?limit=${params.limit}`, {})
}


/**
 * 查询歌单详情
 */

function apiplaylistDetail(params) {
  return fetch.post(`/playlist/detail?id=${params.id}`, {})
}

/**
 * 查询歌曲地址
 */

function apisongurl(params) {
  return fetch.post(`/song/url?id=${params.id}`, {})
}

/**
 * 查询mv的详情
 */
function apimvdetails(params) {
  return fetch.post(`/mv/detail?mvid=${params.id}`, {})
}


/**
 * 查询相关视频
 */
function apirelatedAllvideo(params) {
  return fetch.post(`/related/allvideo?id=${params.id}`)
}
/**
 * 查询相关视频
 */
export function apiMvUrl(params) {
  return fetch.post(`/mv/url?id=${params.id}`)
}

/**
 * mv评论
 */
function apicommentMv(params) {
  return fetch.post(`/comment/mv?id=${params.id}`)
}

/**
 * 相似mv
 */
function apisimiMv(params) {
  return fetch.post(`/simi/mv?mvid=${params.id}`)
}

/**
 * 最新mv
 */
function apifirstMv(params?) {
  return fetch.post(`/mv/all?order=最热&area=韩国`)
}

/**
 * 获取用户的歌单哪
 */
function apiuserplayer(params?) {
  return fetch.post(`/user/playlist?uid=${params.uid}`, {})
}

/**
 * 
 * @param data 
 */
function apilogincellphone(params: any) {
  return fetch.post(`/login/cellphone?phone=${params.phone}&password=${params.password}`, {})
}

/**
 * 获取用户的歌单哪
 */
function apisearchhotdetai(params?) {
  return fetch.post(`/search/hot/detail`, {})
}


/**
 * 收索歌曲
 */
function apisearchsuggest(params?) {
  let { keywords, type} = params
  return fetch.post(`/search?keywords=${keywords}&type=${type}`, {})
}

/**
 * 获取歌曲详情
 */
function apisongdetail(params?, signal?) {
  return fetch.post(`/song/detail?ids=${params.id}`, {}, signal)
}

/**
 * 获取轮播图数据
 */
function apibanner(params?) {
  return fetch.post(`/banner?type=2`, {})
}

/**
 * 获取云村热评
 */
function apievent(params?) {
  // return fetch.post(`/event?pagesize=30`, {})
  return fetch.post('/comment/hotwall/list', {})
}

/**
 * 获取歌词
 */
function apilyric(params?) {
  return fetch.post(`/lyric?id=${params.id}`, {})
}

// 获取视频标签
function apivideogroup(params?) {
  return fetch.post(`/video/group/list`, {})
}

//获取视频标签下的视频

function apigrouplist(params?) {
  return fetch.post(`/video/group?id=${params.id}`, {})
}

// 获取视频播放地址
function apivideourl(params?) {
  return fetch.post(`/video/url?id=${params.id}`, {})
}

// 获取热门评论
function apihotcomment(params?) {
  return fetch.post(`/comment/hot?id=${params.id}&type=0`, {})
}

// 获取每日推荐歌曲
function apirecommendsongs(params?) {
  return fetch.post(`/recommend/songs`, {})
}

// 获取歌单分类
function apiplaylistcatlist(params?) {
  return fetch.post(`/playlist/hot`, {})
}

// 获取每日推荐歌单歌单
function apiresource(params?) {
  return fetch.post(`/recommend/resource`, {})
}

// 获取分类歌单列表
function apihighqualitylist(params?) {
  let { cat, limit, before} = params
  return fetch.post(`/top/playlist/highquality?cat=${cat}&limit=${limit}&before=${before}`, {})
}

function apitoplist(params) {
  return fetch.post(`/top/list?idx=${params.id}`, {})
}

export function apiTopListDetail() {
  return fetch.post(`/toplist/detail`, {})
}

// 获取专辑详情
function apialbumlist(params) {
  return fetch.post(`/album?id=${params.id}`, {})
}

// 获取电台banner
function apidjbanner(params?) {
  return fetch.post(`/dj/banner`, {})
}

// 获取电台分类
function apidjcatelist(params?) {
  return fetch.post(`/dj/category/recommend`, {})
}

// 获取电台推荐
function apipersonalizeddjprogram(params?) {
  return fetch.post(`/dj/today/perfered`, {})
}

// 获取电台节目列表
function apiprogram(params) {
  let { offset } = params
  return fetch.post(`/dj/program?rid=${params.id}&limit=40&offset=${offset}`, {})
}

// 查询电台详情
function apidjdetail(params?) {
  return fetch.post(`/dj/detail?rid=${params.id}`, {})
}


// 查询电台榜单
function apidjhotlist(params) {
  let { type } = params
  return fetch.post(`/dj/toplist?type=${type}`, {})
}


export {
  apipersonalizeddjprogram,
  apiplaylistcatlist,
  apihighqualitylist,
  apilogincellphone,
  apirecommendsongs,
  apipersonalizedMv,
  apiresource,
  apidjhotlist,
  apiprogram,
  apidjbanner,
  apidjdetail,
  apitoplist,
  mvsetusl,
  videoGroup,
  apidjcatelist,
  apirelatedAllvideo,
  apicommentMv,
  apiplaylistDetail,
  apipersonalizedSongList,
  apialbum,
  apialbumlist,
  apisongurl,
  apimvdetails,
  apisimiMv,
  apifirstMv,
  apiuserplayer,
  apisearchhotdetai,
  apisearchsuggest,
  apisongdetail,
  apibanner,
  apievent,
  apilyric,
  apivideogroup,
  apigrouplist,
  apivideourl,
  apihotcomment
}