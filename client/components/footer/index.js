import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import css from './style.css';

class Footer extends Component {
	render() {
		return (
			<footer styleName="footer">
				Created by: <a href='http://github.com/rexhome7326'>rexhome7326</a>
			</footer>
		);
	}
}

export default connect()(CSSModules(Footer,css));