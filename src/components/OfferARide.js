/*
		Offer a ride page
		Here user applies to offer a ride
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import './OfferARide.css';

class OfferARide extends Component {
	componentDidMount(){
		this.props.actionClickTab("offeraride");
	}
	render() {
		const {loginStatus} = this.props.loginStatus;
		//console.log("Login status inside OfferARide: " + loginStatus);


		return (
			<div className="innerWrap">
						<div className={(loginStatus === false) ? "loginMessage" : "notVisible"}>
									 Offer a Ride Login message
						</div>
						<div className={(loginStatus === true) ? "OfferARideForm" : "notVisible"}>
									 Offer a Ride form
						</div>
			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
		loginStatus: state.loginStatus
});
export default connect(mapStateToProps,{actionClickTab})(OfferARide);


//
