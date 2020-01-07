import React from 'react';
import './index.scss'
const hotguide: Array<string> = [
    '好好生活 慢慢相遇',
    '抱抱',
    '『我希望正在看评论的人永远开心』⠀',
    '你不是一个人',
    '下山一定要记得买菜，生快',
    '千年修行，只为再见',
    '仅一夜之间，我的心判若两人',
    ' 陌生人，加油！',
    '我愿陪你寻得黑暗尽头的光',
    '快乐这东西，能偷一点是一点',
    '我委婉的想你了',
    '我爱你可不止三千遍',
    'I just wanna be your Mr. Right in your real life',
    '今年冬天要更努力了'
]
function Bubbleflow(): JSX.Element {
    const bacCol: Array<string> = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d']

    return <>
        <div className="bubble-wrap">
            {
                hotguide.map((item, index) => {
                    return (
                        <div className="bubble-tip" key={index} style={{
                            background: bacCol[Math.round(Math.random() * bacCol.length)],
                            marginLeft: Math.round(Math.random() * 40),
                            animation: `Shake ${Math.random() * 2}s infinite`
                        }}>
                            {item}
                        </div>
                    )
                })
            }
        </div>
    </>
}

export default Bubbleflow