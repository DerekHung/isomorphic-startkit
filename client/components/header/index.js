import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import css from './style.css';

class Header extends Component {
	render() {
		return (
			<header styleName="header">
				<h1>
					<a href="/">BIG-C</a>
				</h1>
				<ul styleName="rightNav">
					<li>
						<a href="/">首頁</a>
					</li>
					<li styleName="head">
						<Link to="/user/100080">
							<img src="//static.e104.com.tw/aidma/material/104/432/11_58.gif" />
						</Link>
					</li>
				</ul>
			</header>
		);
	}
}

export default connect()(CSSModules(Header,css));