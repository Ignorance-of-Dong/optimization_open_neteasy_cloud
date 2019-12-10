import React  from 'react'
import ReactDOM from 'react-dom';
import './index.scss'
function Toast(props: any) {
    return (
        <>
            <div className="over-toast">{props.value}</div>
        </>
    )
}
function CToast(value: string, time: number) {
    let div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(<Toast value={value} />, div)
    setTimeout(() => {
        document.body.removeChild(div);
    }, time)
}

export default CToast