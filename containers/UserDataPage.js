import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadUserData } from 'actions/userData';

class UserDataPage extends Component {
	/*static fetchData({ store }) {
		return store.dispatch(loadUserData());
	}*/
	componentDidMount() {
		this.props.loadUserData(this.props.params);
	}
	render() {
		return (
			<div className="user-info-table-wrap">
				<h2>{this.props.userData.nickName}的個人資料</h2>
				<div className="info-wrap">
					<dl>
						<dt>姓名</dt>
						<dd>{this.props.userData.nickName}</dd>
					</dl>
					<dl>	
						<dt>經歷</dt>
						<dd>{this.props.userData.companyName} {this.props.userData.jobTitle}</dd>
					</dl>
					<dl>
						<dt>學歷</dt>
						<dd>{this.props.userData.schName} {this.props.userData.major}</dd>
					</dl>
					<dl>
						<dt>個人網址</dt>
						<dd>plus.104.com.tw/{this.props.userData.nickName}{this.props.userData.nameSuffix}</dd>
					</dl>
					<dl>
						<dt>個人格言</dt>
						<dd><pre>{this.props.userData.personalCharacteristics}</pre></dd>
					</dl>
				</div>
				<div className="action-wrap">
					<button type="button" onClick={this.showEditor}>修改</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return { userData: state.userData };
}

export default connect(mapStateToProps, {loadUserData})(UserDataPage);