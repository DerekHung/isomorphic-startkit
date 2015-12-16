import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadUserData } from 'actions/userData';
import SelectUtil from 'containers/SelectUtil';

class UserDataPage extends Component {
	/*static fetchData({ store }) {
		return store.dispatch(loadUserData());
	}*/
	componentDidMount() {
		this.props.loadUserData(this.props.params);
	}
	render() {
		let expSetting = {
			title : '經歷',
			field : 'exp',
			className : 'exp-select',
			itemList : this.props.expList,
			value : {
				'companyName': this.props.userData.companyName,
				'jobTitle': this.props.userData.jobTitle
			},
			callback : this.change
		};
		let eduSetting = {
			title : '學歷',
			field : 'edu',
			className : 'edu-select',
			itemList : this.props.eduList,
			value : {
				'schName': this.props.userData.schName,
				'major': this.props.userData.major
			},
			callback : this.change
		};
		
		return (
			<div className="user-info-table-wrap edit-mode">
				<form>
					<h2>修改個人資料</h2>
					<div className="info-wrap">
						<dl>
							<dt>姓名</dt>
							<dd><input name="nickName" type="text" value={this.props.userData.nickName} onChange={this.change} /></dd>
						</dl>
						<dl>	
							<dt>經歷</dt>
							<dd>
								<SelectUtil setting={expSetting}></SelectUtil>
							</dd>
						</dl>
						<dl>
							<dt>學歷</dt>
							<dd>
								<SelectUtil setting={eduSetting}></SelectUtil>
							</dd>
						</dl>
						<dl>
							<dt>個人網址</dt>
							<dd>plus.104.com.tw/{this.props.userData.nickName}<input name="nameSuffix" type="text" value={this.props.userData.nameSuffix} onChange={this.change} /></dd>
						</dl>
						<dl>
							<dt>個人格言</dt>
							<dd><textarea name="personalCharacteristics" onChange={this.change} value={this.props.userData.personalCharacteristics}></textarea></dd>
						</dl>
					</div>
					<div className="action-wrap">
						<button type="button" className="main-btn" onClick={this.submitEditor}>儲存</button>
						<button type="button" onClick={this.closeEditor}>取消</button>
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return { userData: state.userData, expList:state.expList, eduList:state.eduList };
}

export default connect(mapStateToProps, {loadUserData})(UserDataPage);