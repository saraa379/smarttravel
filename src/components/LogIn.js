/*
		Placeholder component Investor Relations page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';

class LogIn extends Component {
	componentDidMount(){
		this.props.actionClickTab("login");
	}
	render() {

		return (
			<div className="innerWrap">
				 	<p>Log in page</p>
			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
});

export default connect(mapStateToProps,{actionClickTab})(LogIn);
