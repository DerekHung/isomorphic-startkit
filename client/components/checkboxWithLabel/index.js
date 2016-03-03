import React, {Component} from 'react';

class CheckboxWithLabel extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {isChecked: this.props.target.isChecked};
	}

	onChange() {
		let newState = !this.state.isChecked;
		this.setState({isChecked: newState});
		this.props.target.isChecked = newState;
	}

	render() {
		return (
			<label>
				<input type="checkbox" checked={this.state.isChecked} onChange={this.onChange.bind(this)} />
				{this.state.isChecked ? this.props.labelOn : this.props.labelOff}
			</label>
		);
	}
}

export default CheckboxWithLabel;