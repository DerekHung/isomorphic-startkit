import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import utils from 'lodash';
import { loadQuestions } from 'client/actions/questions';
import Question from 'client/containers/question';

class QuestionList extends Component {
	static fetchData({ params, store }) {
		return store.dispatch(loadQuestions(params));
	}
	componentDidMount() {
		this.props.loadQuestions(this.props.paramMap);
	}
	render() {
		let questionList = utils.map(this.props.questions, (question)=> {
			return (<Question {...question} key={question.id}/>);
		});
		
		return (
			<div>
				<h2>Question</h2>
				{questionList}
				<Link to="/">Back to Home</Link>
			</div>
		);
	}
}

function mapStateToProps (state, props) {
	let paramMap = Object.assign({}, props.params, props.location.query);
	return { questions: state.questions, paramMap: paramMap};
}

export { QuestionList };
export default connect(mapStateToProps, { loadQuestions })(QuestionList);