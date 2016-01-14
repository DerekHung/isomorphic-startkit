import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Question extends Component {
	render() {
		return (
			<div data-key={this.props.id}> { this.props.content }</div>
		);
	}
}

function mapStateToProps (state, props) {
	return {};
}

export default connect(mapStateToProps)(Question);