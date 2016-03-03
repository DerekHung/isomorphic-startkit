import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Navigation extends Component {
	render() {
		return (
			<nav className="navigation">
				<Link className="navigation-link" to="/user/list">User list</Link>
				<Link className="navigation-link" to="/user/100080">My page</Link>
			</nav>
		);
	}
}

export default connect()(Navigation);