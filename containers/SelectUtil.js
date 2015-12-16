import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class SelectUtil extends Component {
	change(event) {
		let optionKey = event.target.value/1;
		let optionValue = this.props.setting.itemList[optionKey].value;
		
		this.setState({'modelObj':optionKey});
		this.props.setting.callback.call(this, optionValue);
	}
	render() {
		let options = this.props.setting.itemList.map(function(item, index) {
			return (<option value={index} key={index}>{item.title}</option>);
		});
		
		return (
			<select name={this.props.setting.field} className={this.props.setting.className} value={this.state.modelObj} onChange={this.change}>
				<option value="">-- 選擇顯示{this.props.setting.title} --</option>
				{options}
			</select>
		);
	}
}

function mapStateToProps(state, ownProps) {
	let choice = 0;	
	let strValue = JSON.stringify(ownProps.setting.value);
	
	ownProps.setting.itemList.map(function(item, index) {
		var strItem = JSON.stringify(item.value);

		if(strItem == strValue){
			choice = index;
		}
	});
	
	return { modelObj: choice };
}

export default connect(mapStateToProps)(SelectUtil);