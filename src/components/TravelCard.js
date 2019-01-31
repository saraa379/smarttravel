/*
		Placeholder component for How It Works page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import './TravelCard.css';

class TravelCard extends Component {
	componentDidMount(){
		//this.props.actionClickTab("profile");
	}
	render() {

		return (
			<div className="innerWrap">
				 	<p>Travel card page</p>
			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
});
export default connect(mapStateToProps,{actionClickTab})(TravelCard);


//
