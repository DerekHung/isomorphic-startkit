import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'client/containers/header';
import Footer from 'client/containers/footer';

class App extends Component {
	render() {
		return (
			<div className="wrap">
				<Header />
				<div className="container">{this.props.children}</div>
				<Footer />
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {};
}

export default connect(mapStateToProps)(App);