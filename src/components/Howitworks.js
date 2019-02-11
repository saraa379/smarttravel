/*
		Placeholder component for How It Works page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import './Howitworks.css';

class Howitworks extends Component {
	componentDidMount(){
		this.props.actionClickTab("howitworks");
	}
	render() {

		return (
			<div className="innerWrap">

					<div className="HowHero">
									<h2>Ride Sharing Through Smart Travel</h2>
									<p>works as easy as ever!</p>
					</div>

					<div className="HowContent">

							<div className="HowLeft">
										<h3>Passengers</h3>
										<div className="HowSectionWrap">
												<h4>Find a travel</h4>
												<div className="HowSectionContent">
														You can find all available upcoming ride posts on the "Search a
														Ride" page.
												</div>
										</div>
										<p className="stars">*****</p>
										<div className="HowSectionWrap">
												<h4>Contact the post owner</h4>
												<div className="HowSectionContent">
														Contact information of the post owner shall be in the post decription.
														That is it! You don't need to register or give your personal information
														to use ride-sharing service.
												</div>
										</div>
										<p className="stars">*****</p>
										<div className="HowSectionWrap Last">
												<h4>Our recommendation</h4>
												<div className="HowSectionContent">
														Don't pay anyone beforehand.
												</div>
										</div>
							</div>

							<div className="HowRight">
										<h3>Drivers</h3>
										<div className="HowSectionWrap">
												<h4>Register</h4>
												<div className="HowSectionContent">
														In order to post an add for ride sharing,
														you need fill our one step simplified registration.
														You can find it at the bottom of the Login page.
												</div>
										</div>
										<p className="stars">*****</p>
										<div className="HowSectionWrap">
												<h4>Post a offer</h4>
												<div className="HowSectionContent">
														You can post your offer on the "Offer a Ride" page.
														Please put your contact information for passengers in the
														description section. Because we won't publish your email or
														phone number with your add.
												</div>
										</div>
										<p className="stars">*****</p>
										<div className="HowSectionWrap Last">
												<h4>Edit you add</h4>
												<div className="HowSectionContent">
														If you need to edit your add, do it on the "Profile" page.
												</div>
										</div>

							</div>

					</div>
			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
});
export default connect(mapStateToProps,{actionClickTab})(Howitworks);


//
