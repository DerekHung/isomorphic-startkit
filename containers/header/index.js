import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

if(process.env.BROWSER){
	require('./style.css');
}

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
							<img src="//resource.holyshare.com.tw/uploads/article/600x0/1389087501_1.jpg" />
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