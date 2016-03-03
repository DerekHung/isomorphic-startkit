import { connect } from 'react-redux';
import { Link } from 'react-router';
import utils from 'lodash';
import React, {Component} from 'react';
import { loadUser, updateUser, deleteUser } from 'client/actions/user';

class UserDetail extends Component {
	
	static fetchData({ params, store }) {
		return store.dispatch(loadUser(params));
	}
	
	constructor(props, context){
		super(props, context);
	}
	
	componentDidMount() {
		this.props.loadUser(this.props.paramMap);
	}
	
	updateUser() {
		console.log('update user');
		//this.props.updateUser();
	}
	
	deleteUser() {
		if(window.confirm('Are you sure?')){
			console.log('delete user');
			console.log('OK');
		};
			
		//this.props.deleteUser();
	}
	
	render() {
		return (
			<div>
				<h2>{this.props.template.profileTitle}</h2>
				<div className="user">
					<div className="table">
						<dl className="tr">
							<dt className="td">{this.props.template.userName}</dt>
							<dd className="td">
								<Link to={"/user/"+this.props.user.id}>{this.props.user.name}</Link>
								<button type="button" className="right" onClick={this.updateUser}>update</button>
								<button type="button" className="right" onClick={this.deleteUser}>delete</button>
							</dd>
						</dl>
						<dl className="tr">	
							<dt className="td">{this.props.template.userSex}</dt>
							<dd className="td">{this.props.user.sex}</dd>
						</dl>
						<dl className="tr">
							<dt className="td">{this.props.template.userEmail}</dt>
							<dd className="td">{this.props.user.email}</dd>
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
	let isMe = true;
	
	return { 
		user: state.userDetail.data, 
		template: state.userDetail.template, 
		paramMap: paramMap,
		isMe: isMe
	};
}

export { UserDetail };
export default connect(mapStateToProps, { loadUser })(UserDetail);