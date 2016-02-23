import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Demo extends Component {
	render() {
		return (
			<div>
				<h1>Demo Page</h1>
			</div>
		);
	}
}

export default connect()(Demo);