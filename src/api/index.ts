/*
 * @Author: Mr.zheng
 * @Date: 2019-08-09 15:00:51
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-08-09 16:56:18
 * @Description: 
 * 
 * 
 * 
 */
// import axios from 'axios'
import fetch from '../utils/fetch'



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
  return fetch.post(`/top/album?limit=${params.limit}`, {})
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
  return fetch.post(`/mv/first?limit=10`)
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
  return fetch.post(`/search?keywords=${params.keywords}`, {})
}

/**
 * 获取歌曲详情
 */
function apisongdetail(params?) {
  return fetch.post(`/song/detail?ids=${params.id}`, {})
}

/**
 * 获取轮播图数据
 */
function apibanner(params?) {
  return fetch.post(`/banner?type=2`, {})
}

/**
 * 获取朋友动态
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

export {
  apilogincellphone,
  apipersonalizedMv,
  mvsetusl,
  videoGroup,
  apirelatedAllvideo,
  apicommentMv,
  apiplaylistDetail,
  apipersonalizedSongList,
  apialbum,
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
  apilyric
}