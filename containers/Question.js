import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import utils from 'lodash';
import { loadQuestions } from 'actions/questions';

class Question extends Component {
	static fetchData({ store }) {
		return store.dispatch(loadQuestions());
	}
	componentDidMount() {
		this.props.loadQuestions(this.props.params);
	}
	render() {
		return (
			<div>
				<h2>Question</h2>
				{
					utils.map(this.props.questions, (q)=> {
						return (
							<p key={q.id}> { q.content }</p>
						);
					})
				}

				<Link to="/">Back to Home</Link>
			</div>
		);
	}
}

function mapStateToProps (state) {
	return { questions: state.questions };
}

export { Question };
export default connect(mapStateToProps, { loadQuestions })(Question);