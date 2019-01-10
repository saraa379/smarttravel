/*
		Placeholder component for How It Works page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';

class OfferARide extends Component {
	componentDidMount(){
		this.props.actionClickTab("offeraride");
	}
	render() {

		return (
			<div className="innerWrap">
				 	<p>Offer a ride page</p>
			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
});
export default connect(mapStateToProps,{actionClickTab})(OfferARide);


//
