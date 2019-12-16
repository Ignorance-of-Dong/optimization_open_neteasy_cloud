import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Headers } from 'components/index'
// import QQMap from 'qqmap';
import ReactQMap from 'react-qmap';
import './index.scss'
let classMap, windowMap
let start, end
function About (props){
    const initialOptions = {
        zoomControl: false, 
        mapTypeControl: false
    }
    const [center, setCenter] = useState({})

    let audiosRef = useRef(null)
    useEffect(() => {
        // window.location.hash = "#reply";
        if ("geolocation" in navigator) {
            /* geolocation is available */
            navigator.geolocation.getCurrentPosition(_showPosition, _showError);
        } else {
            /* geolocation IS NOT available */
            alert('你的浏览器不支持geolocation')
        }
    }, [])
    const _showPosition = useCallback((position) => {
        // setCenter({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        start = position.coords.latitude
        end = position.coords.longitude
        setCenter({ latitude: 39.9773000000, longitude: 116.4813200000 })
        _setMarker(position.coords.latitude, position.coords.longitude);
    }, [])
    const _showError = useCallback((error) => {
        console.log(error);
        alert('获取定位异常');
    }, [])
    const _setMarker = useCallback((latitude, longitude) => {
        const marker = new windowMap.Marker({
            map: classMap,
            // position: new windowMap.LatLng(latitude, longitude),
            position: new windowMap.LatLng(39.9773000000, 116.4813200000),
            animation: windowMap.MarkerAnimation.DROP,
        });
    }, [])

    
    const _getMap = useCallback((map, wMap) => {
        classMap = map;
        windowMap = wMap;
        const drivingService = new wMap.DrivingService({
            map: map,
        })
        // drivingService.setComplete(function (result) {
        //     if (result.type == new windowMap.ServiceResultType.MULTI_DESTINATION) {
        //         var d = result.detail;
        //         drivingService.search(d.start[0], d.end[0]);
        //     }

        // });
        // drivingService.setPolicy(new windowMap.DrivingPolicy['LEAST_TIME']);
        // drivingService.setLocation("北京");
        // drivingService.search('天坛公园', '将台');

        // drivingService.setComplete(function (result) {
            // if (result.type == qq.maps.ServiceResultType.MULTI_DESTINATION) {
            //     alert("起终点不唯一");
            // }
            // alert(JSON.stringify(result))
        // });
    }, [])

    const goMap = () => {
        window.location.href = 'http://uri.amap.com/navigation?from=当前位置&to=39.9773000000,116.4813200000,北京诺金酒店二层&via=116.402796,39.936915,midwaypoint&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=1'
    }
    return <>
        <div className='about'>
            <Headers props={props} > 头部</Headers>
            <div className='map' onClick={() => {
                goMap()
            }}>
                <ReactQMap
                    ref={audiosRef}
                    center={{ latitude: 39.9773000000, longitude: 116.4813200000 }}
                    mySpot={{ latitude: 39.9773000000, longitude: 116.4813200000 }}
                    initialOptions={initialOptions}
                    apiKey="BXQBZ-K7MCJ-WT2FY-FUTDM-LW633-7DBTN"
                    getMap={(map, wMap) => _getMap(map, wMap)}
                />
            </div>
        </div>
    </>
}

export default About