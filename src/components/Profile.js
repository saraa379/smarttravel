/*
		Placeholder component for How It Works page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import './Profile.css';
import firebase from '../firebase/firebase.js';
import {actionUpdateCurrentUser} from '../actions/updateCurrentUserAction.js';

class Profile extends Component {
	constructor(props) {
			super(props);
			this.state = {
										chosenTab: "about",
										nameContentVisible: true,
										inputFirstname: "",
										inputLastname: "",
										ageContentVisible: true,
										inputAge: ""
			};
			this.menuClick = this.menuClick.bind(this);
			this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
			this.handleChangeLastname = this.handleChangeLastname.bind(this);
			this.handleChangeAge = this.handleChangeAge.bind(this);
			this.nameEditSave = this.nameEditSave.bind(this);
			this.nameEditCancel = this.nameEditCancel.bind(this);
			this.nameEdit = this.nameEdit.bind(this);
			this.ageEdit = this.ageEdit.bind(this);
	}//end of constructor

	componentDidMount(){
		this.props.actionClickTab("profile");
	}
	menuClick(menuItem){
		this.setState({ chosenTab: menuItem });
	}
	handleChangeFirstname(event){
		this.setState({inputFirstname: event.target.value});
	}
	handleChangeLastname(event){
		this.setState({inputLastname: event.target.value});
	}
	handleChangeAge(event){
		this.setState({inputAge: event.target.value});
	}
	nameEditSave(){
			const { inputFirstname, inputLastname } = this.state;
			const {currentUser} = this.props.currentUser;

			if (inputFirstname !== "") {
					firebase.database().ref('users/' + currentUser.key + '/firstname').set(inputFirstname);
					let tempUser = currentUser;
					tempUser.firstname = inputFirstname;
					this.props.actionUpdateCurrentUser(tempUser);
			}

			if (inputLastname !== "") {
					firebase.database().ref('users/' + currentUser.key + '/lastname').set(inputLastname);
					let tempUser = currentUser;
					tempUser.lastname = inputLastname;
					this.props.actionUpdateCurrentUser(tempUser);
			}

			this.setState({nameContentVisible: true});
	}
	ageEditSave(){
			const { inputAge } = this.state;
			const {currentUser} = this.props.currentUser;

			var integer = parseInt(inputAge, 10);

			if (inputAge !== "" && integer !== NaN) {

					firebase.database().ref('users/' + currentUser.key + '/age').set(integer);
					let tempUser = currentUser;
					tempUser.age = integer;
					this.props.actionUpdateCurrentUser(tempUser);
			}

			this.setState({ageContentVisible: true});
	}
	nameEdit(){
			this.setState({nameContentVisible: false});
	}
	ageEdit(){
			this.setState({ageContentVisible: false});
	}
	nameEditCancel(){
			this.setState({nameContentVisible: true});
			this.setState({inputFirstname: ""});
			this.setState({inputLastname: ""});
	}
	ageEditCancel(){
			this.setState({ageContentVisible: true});
			this.setState({inputAge: ""});
	}

	render() {
		const {loginStatus} = this.props.loginStatus;
		const {currentUser} = this.props.currentUser;
		const { chosenTab, nameContentVisible, ageContentVisible } = this.state;
		//user image
		var userImg = "";
		if (currentUser.photourl === "") {
				userImg = require('../img/profile.png');
		} else {
				userImg = currentUser.photourl;
		}
		//user name
		var username = 'Welcome, ' + currentUser.firstname + ' ' + currentUser.lastname + '!';
		var userNameContent = currentUser.firstname + ' ' + currentUser.lastname;
		var age = "Not available";
		if (currentUser.age > 0) {
				//console.log("Users age: " + currentUser.age);
				age = currentUser.age;
		}

		return (
			<div className="innerWrap">
					<div className={(loginStatus === true) ? "ProfileExtend" : "notVisible"}>

								<div className="ProfileHero">
										<img src={userImg} alt="User" />
										<h2>{username}</h2>
								</div>

								<div className="ProfileBottom">
										<div className="ProfileMenu">
													<div className={(chosenTab === "about") ? "Btn chosenBtn" : "Btn"}
													     onClick={() => this.menuClick("about")}>About</div>
													<div className={(chosenTab === "travels") ? "Btn chosenBtn" : "Btn"}
													     onClick={() => this.menuClick("travels")}>Offered Travels</div>
													<div className={(chosenTab === "messages") ? "Btn chosenBtn LastBtn" : "Btn LastBtn"}
													     onClick={() => this.menuClick("messages")}>Messages</div>
										</div>
										<div className="ProfileMenuContent">
													<div className={(chosenTab === "about") ? "AboutContent" : "notVisible"}>

															<h3>About Me</h3>
															<div className={(nameContentVisible === true) ? "Name" : "notVisible"}>
																	<div className="FlexWrap">
																			<label>Name</label>
																			<p>{userNameContent}</p>
																	</div>
																	<div className="Edit" onClick={this.nameEdit}>Edit</div>
															</div>

															<div className={(nameContentVisible === false) ? "NameEdit" : "notVisible"}>
																		<div className="FlexWrapColumn InnerWrapProfile">
																				<div className="InputWrapProfile">
																							<label>Firstname</label>
																							<input type = "text" placeholder={currentUser.firstname} onChange={this.handleChangeFirstname} value={this.state.inputFirstname}/>
																				</div>
																				<div className="InputWrapProfile">
																							<label>Lastname</label>
																							<input type = "text" placeholder={currentUser.lastname} onChange={this.handleChangeLastname} value={this.state.inputLastname}/>
																				</div>
																				<div className="InputWrapProfile ProfileBtns">
																							<div id="cancelBtn" className="ProfileBtn" onClick={this.nameEditCancel}>Cancel</div>
																							<div className="ProfileBtn" onClick={this.nameEditSave}>Save</div>
																				</div>
																		</div>
															</div>

															<div className={(ageContentVisible === true) ? "Age" : "notVisible"}>
																	<div className="FlexWrap">
																			<label>Age</label>
																			<p>{age}</p>
																	</div>
																	<div className="Edit" onClick={this.ageEdit}>Edit</div>
															</div>

															<div className={(ageContentVisible === false) ? "AgeEdit" : "notVisible"}>
															      <div className="FlexWrapColumn InnerWrapProfile">
															          <div className="InputWrapProfile">
															                <label>Age</label>
															                <input type = "text" placeholder={currentUser.age} onChange={this.handleChangeAge} value={this.state.inputAge}/>
															          </div>
															          <div className="InputWrapProfile ProfileBtns">
															                <div id="cancelBtnAge" className="ProfileBtn" onClick={this.ageEditCancel}>Cancel</div>
															                <div className="ProfileBtn" onClick={this.ageEditSave}>Save</div>
															          </div>
															      </div>
															</div>

													</div>



													<div className={(chosenTab === "travels") ? "TravelsContent" : "notVisible"}>
															Travel content
													</div>

													<div className={(chosenTab === "messages") ? "MessagesContent" : "notVisible"}>
															Messages content
													</div>
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
export default connect(mapStateToProps,{actionClickTab, actionUpdateCurrentUser})(Profile);


//
