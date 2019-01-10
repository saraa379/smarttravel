/*
		The component is a placeholder page for the links that doesn't have a page.
		This page comes when user types wrong url.
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';

class Notexist extends Component {
	componentDidMount(){
		this.props.actionClickTab("notexist");
	}
	render() {

		return (
			<div className="innerWrap">
				 	<p>Requested page does not exist</p>
			</div>
		)
	}
}

const mapStateToProps = state => ({

});
export default connect(mapStateToProps,{actionClickTab})(Notexist);
