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
				<div className="user-info-table-wrap">
					<h2>{this.props.user.nickName}的個人資料</h2>
					<div className="info-wrap">
						<dl>
							<dt>姓名</dt>
							<dd>{this.props.user.nickName}</dd>
						</dl>
						<dl>	
							<dt>經歷</dt>
							<dd>{this.props.user.company} {this.props.user.jobTitle}</dd>
						</dl>
						<dl>
							<dt>學歷</dt>
							<dd>{this.props.user.school} {this.props.user.department}</dd>
						</dl>
						<dl>
							<dt>個人網址</dt>
							<dd>plus.104.com.tw/{this.props.user.nickName}{this.props.user.nameSuffix}</dd>
						</dl>
						<dl>
							<dt>個人格言</dt>
							<dd><pre>{this.props.user.personalCharacteristics}</pre></dd>
						</dl>
					</div>
				</div>
				<Link to="/">Back to Home</Link>
			</div>
		);
	}
}

function mapStateToProps (state, props) {
	let paramMap = Object.assign({}, props.params, props.location.query);
	return { user: state.user, paramMap: paramMap};
}

export { User };
export default connect(mapStateToProps, { loadUser })(User);