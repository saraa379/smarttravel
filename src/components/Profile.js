/*
		Placeholder component for How It Works page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import './Profile.css';

class Profile extends Component {
	componentDidMount(){
		this.props.actionClickTab("profile");
	}
	render() {
		const {loginStatus} = this.props.loginStatus;
		const {currentUser} = this.props.currentUser;
		//user image
		var userImg = "";
		if (currentUser.photourl === "") {
				userImg = require('../img/profile.png');
		} else {
				userImg = currentUser.photourl;
		}
		//user name
		var username = 'Welcome, ' + currentUser.firstname + ' ' + currentUser.lastname + '!';

		return (
			<div className="innerWrap">
					<div className={(loginStatus === true) ? "ProfileExtend" : "notVisible"}>

								<div className="ProfileHero">
										<img src={userImg} alt="User" />
										<h2>{username}</h2>
								</div>

								<div className="ProfileBottom">
										<div className="ProfileMenu">
										</div>
										<div className="ProfileMenuContent">
										</div>
								</div>
								
					</div>

					<div className={(loginStatus === false) ? "ProfileMini" : "notVisible"}>
								<div className="ProfileHero">
								</div>
								<div className="ContentMini">
										<h2>Please login to see you profile!</h2>
								</div>
					</div>

			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
		loginStatus: state.loginStatus,
		currentUser: state.currentUser
});
export default connect(mapStateToProps,{actionClickTab})(Profile);


//
