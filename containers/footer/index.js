import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import css from './style.css';

class Footer extends Component {
	render() {
		return (
			<footer className={css.footer}>
				Created by: <a href='http://github.com/rexhome7326'>REX</a>
			</footer>
		);
	}
}

function mapStateToProps(state) {
	console.log("Footer");
	return {};
}

export default connect(mapStateToProps)(Footer);