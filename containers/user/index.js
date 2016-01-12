import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import utils from 'lodash';
import { loadUser } from 'actions/user';

class User extends Component {
	static fetchData({ params, store }) {
		return store.dispatch(loadUser(params));
	}
	componentDidMount() {
		this.props.loadUser(this.props.paramMap);
	}
	render() {
		return (
			<div>
				<div className="user">
					<h2>{this.props.user.nickName}的個人資料</h2>
					<div className="table">
						<dl className="tr">
							<dt className="td">姓名</dt>
							<dd className="td">{this.props.user.nickName}</dd>
						</dl>
						<dl className="tr">	
							<dt className="td">經歷</dt>
							<dd className="td">{this.props.user.company} {this.props.user.jobTitle}</dd>
						</dl>
						<dl className="tr">
							<dt className="td">學歷</dt>
							<dd className="td">{this.props.user.school} {this.props.user.department}</dd>
						</dl>
						<dl className="tr">
							<dt className="td">個人網址</dt>
							<dd className="td">plus.104.com.tw/{this.props.user.nickName}{this.props.user.nameSuffix}</dd>
						</dl>
						<dl className="tr">
							<dt className="td">個人格言</dt>
							<dd className="td"><pre>{this.props.user.personalCharacteristics}</pre></dd>
						</dl>
					</div>
				</div>
				<Link to="/">Back to Home</Link>
			</div>
		);
	}
}

function mapStateToProps (state, props) {
	console.log("User");
	let paramMap = Object.assign({}, props.params, props.location.query);
	return { user: state.user, paramMap: paramMap};
}

export { User };
export default connect(mapStateToProps, { loadUser })(User);