import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
	render() {
		return (
			<header className="header">
				<h1>
					<a href="/">BIG-C</a>
				</h1>
				<ul className="right-nav">
					<li>
						<a href="/">首頁</a>
					</li>
					<li className="head">
						<Link to="/100080">
							<div className="img"></div>
						</Link>
					</li>
				</ul>
			</header>
		);
	}
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Header);