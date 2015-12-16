import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Intro extends Component {
  render() {
    return (
      <div>
        <h1>Intro Page</h1>
        <Link to="/question/123456">see question list</Link>
        <br />
        <Link to="/user/100080">see my profile</Link>
        <br />
        <Link to="/user/update/100080">update my profile</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Intro);