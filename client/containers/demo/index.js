import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadDemo } from 'client/actions/demo';

class Demo extends Component {
	componentDidMount() {
		this.props.loadDemo(this.props.paramMap);
	}
	render() {
		let str = JSON.stringify(this.props.demo);
		
		return (
			<div>
				<h1>Demo Page</h1>
				<p>{str}</p>
				<Link to="/questions/page/1">see question list</Link>
				<br />
				<Link to="/100080">see profile</Link>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	let paramMap = Object.assign({}, props.params, props.location.query);
	return { demo: state.demo, paramMap: paramMap};
}

export default connect(mapStateToProps, { loadDemo })(Demo);