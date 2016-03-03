import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'client/components/header';
import Navigation from 'client/components/navigation';
import Footer from 'client/components/footer';

class App extends Component {
	render() {
		return (
			<div className="wrap">
				<Header />
				<Navigation />
				<div className="container">{this.props.children}</div>
				<Footer />
			</div>
		);
	}
}

export default connect()(App);