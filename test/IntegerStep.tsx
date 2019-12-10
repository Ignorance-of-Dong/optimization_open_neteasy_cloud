import * as React from 'react'
import {observer, inject} from 'mobx-react'
import Stores from "./store";
// @inject('Pubcli')
// @observer
// class IntegerStep extends React.Component<any, any> {
// 	Stores = Stores
// 	render() {
// 		console.log(this.props, 'Stores')
// 		let { changValue, total } = this.props.Pubcli
// 		return <>
// 			<div>{total}</div>

// 			<button onClick={() => {
// 				changValue()
// 			}}>change</button>

// 		</>
// 	}
// }

const IntegerStep = inject('Pubcli')(observer((props) => {
	let { changValue, total } = props.Pubcli
	console.log(props)
	return <>
		<div>{total}</div>

		<button onClick={() => {
			changValue()
		}}>change</button>

	</>
}))
export default IntegerStep