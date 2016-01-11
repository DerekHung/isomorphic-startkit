import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import css from './style.css';

class Header extends Component {
	render() {
		return (
			<header className={css.header}>
				<h1>
					<a href="/">BIG-C</a>
				</h1>
				<ul className={css.rightNav}>
					<li>
						<a href="/">首頁sssss</a>
					</li>
					<li className={css.head}>
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