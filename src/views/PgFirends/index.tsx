import React, { useEffect, useRef } from 'react'
import { apievent } from '../../api'
function PgFirends() {
    useEffect(() => {
        apievent().then(res => {
            console.log(res)
        })
    }, [])
    let musicRef = useRef(null)
    return (
        <>
            PgFirends
            {/* <a href="">xiazia</a> */}
            <audio src='' controls preload="auto" ref={musicRef}/>
            <a href="http://m7.music.126.net/20190904144737/76cd03cd80bd6b40b95b9d02b63d4086/ymusic/45da/7b2b/b570/1147927e0cac8352f8898df3e4a2b6f4.mp3" download="aaa.mp3">sssss</a>
            {/* <p onClick={() => {
                musicRef.ondownload = function() {

                }
            }}>
                2222222222
            </p> */}
        </>
    )
}

export default PgFirends