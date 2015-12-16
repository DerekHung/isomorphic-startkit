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
						<Link to="/user/show/100080">
							<img src="//172.19.7.75/DocumentManagementTomcatAccess/imgs/104plus/91a/708/c04/c0397be2773049198154e13e3f56f44511_headM.png?3b46dffc06d9c7c01028557ee438493f&v=i25v6icffq6viuci54" />
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