import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Footer extends Component {
	render() {
		return (
			<footer className="footer">
				Created by: <a href='http://github.com/rexhome7326'>REX</a>
			</footer>
		);
	}
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Footer);