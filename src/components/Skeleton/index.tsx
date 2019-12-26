import React from 'react';
import './index.scss'
interface props{
    type: number
}
function Skeleton(props: props) {

    const BannerSkeleton = () => {
        return <>
            <span
                className='skeleton-banner'
                key={0}
                style={{ display: 'inline-block', width: '100%', height: '100%' }}
            >
                <img
                    src={`http://p1.music.126.net/TPHBa3D5EVIztGfudfj7iQ==/109951164579581902.jpg`}
                    alt=""
                    style={{ width: '100%', height: '100%' }}
                />
            </span>
        </>
    }

    const SongSheetSkeleton = () => {
        return <>
            {
                [1, 2, 3].map(item => {
                    return (
                        <div className="recommended-song-tip" key={item}>
                            <div className="recommended-song-price"></div>
                            <div className='recommended-song-text'></div>
                        </div>
                    )
                })
            }
        </>
    }

    const VideoSkeleton = () => {
        return <>
            <div className="video-skeleton">
                <div className="vs-tip"></div>
                <div className="vs-tip-long"></div>
                <div className="vs-tip-long"></div>
                <div className="vs-tip-long"></div>
            </div>
        </>
    }

    const TemplateList: Array<JSX.Element> = [<BannerSkeleton />, <SongSheetSkeleton />, <VideoSkeleton />]
    return <>
        {TemplateList[props.type]}
    </>
}

export default Skeleton