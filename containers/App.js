import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'containers/header';
import Footer from 'containers/footer';

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
	console.log("App");
	return {};
}

export default connect(mapStateToProps)(App);