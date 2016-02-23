import { connect } from 'react-redux';
import { Link } from 'react-router';
import React, {Component} from 'react';
import CheckboxWithLabel from 'client/components/checkboxWithLabel';
import { loadUserList, addUser, updateUser, deleteUser, deleteMultiUser } from 'client/actions/user';

class UserList extends Component {
	
	static fetchData({ params, store }) {
		return store.dispatch(loadUserList(params));
	}
	
	constructor(props, context){
		super(props, context);
	}
	
	componentDidMount(){
		this.props.loadUserList(this.props.paramMap);
	}
	
	addUser() {
		//this.props.addUser();
	}
	
	deleteMultiUser() {
		if(window.confirm('Are you sure?')){
			console.log('delete multi user');
			console.log(this.props.userList);
		};
		
		//this.props.deleteMultiUser();
	}
	
	updateUser(user) {console.log(user);return;
		//this.props.updateUser();
	}
	
	deleteUser(user) {console.log(user);return;
		if(window.confirm('Are you sure?')){
			console.log('delete user');
			console.log(this.props.userList);
		};
		
		//this.props.deleteUser();
	}
	
	render() {
		let userList = this.props.userList.map((user, index) => {
			return (
				<div className="user-list-item" key={index}>
					<div className="item-options left">
						<CheckboxWithLabel target={user} />
					</div>
					<div className="user">
						<div className="table">
							<dl className="tr">
								<dt className="td">{this.props.template.userName}</dt>
								<dd className="td">
									<Link to={"/user/"+user.id}>{user.name}</Link>
									<button type="button" className="right" onClick={this.updateUser.bind(this, user)}>update</button>
									<button type="button" className="right" onClick={this.deleteUser.bind(this, user)}>delete</button>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			);
		});
		
		return (
			<div className="user-list">
				<div className="title clearfix">
					<h1 className="left">UserList Page</h1>
					<button type="button" className="right" onClick={this.addUser}>add</button>
					
				</div>
				<div className="user-list-item">
					<div className="item-options left">
						<button type="button" className="right" onClick={this.deleteMultiUser}>delete</button>
					</div>
					<div className="item-title"></div>
				</div>
				{userList}
			</div>
		);
	}
}

function mapStateToProps(state, props){
	let paramMap = Object.assign({}, props.params, props.location.query);
	return {
		userList: state.userList.data, 
		template: state.userList.template, 
		paramMap: paramMap
	};
}

export { UserList };
export default connect(mapStateToProps, {loadUserList})(UserList);