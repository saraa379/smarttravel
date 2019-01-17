/*
		Placeholder component for How It Works page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';

class Profile extends Component {
	componentDidMount(){
		this.props.actionClickTab("profile");
	}
	render() {

		return (
			<div className="innerWrap">
				 	<p>Profile page</p>
			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
});
export default connect(mapStateToProps,{actionClickTab})(Profile);


//
