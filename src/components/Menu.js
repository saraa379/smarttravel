/*
		Header component. This component shows on the top of every page.
		The component contains menu.
*/
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Menu.css';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import {actionChangeLoginStatus} from '../actions/loginStatusChangeAction.js';
import {actionUpdateCurrentUser} from '../actions/updateCurrentUserAction.js';
import {actionFetchUsers} from '../actions/fetchUsersAction.js';
import {actionFetchTravels} from '../actions/fetchTravelsAction.js';
import Modal from 'react-responsive-modal';
import firebase from '../firebase/firebase.js';

class Menu extends Component {

	constructor(props) {
			super(props);
			this.state = {menuChecked: false,
										modalOpen: false,
										currentModal: "login",
										firstname: '',
										lastname: '',
										phone: '',
										email: '',
   									password: '',
   									error: null
									 };
		  this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
			this.handleChangeLastname = this.handleChangeLastname.bind(this);
			this.handleChangeEmail = this.handleChangeEmail.bind(this);
			this.handleChangePhone = this.handleChangePhone.bind(this);
			this.handleChangePassword = this.handleChangePassword.bind(this);
			this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
			this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
			this.callLater = this.callLater.bind(this);
			this.callLaterLogin = this.callLaterLogin.bind(this);
			this.logOut = this.logOut.bind(this);
			this.checkTravelDate = this.checkTravelDate.bind(this);
			this.fbCallback = this.fbCallback.bind(this);
	}//end of constructor

	componentDidMount() {
			this.props.actionFetchUsers();
			this.props.actionFetchTravels();
			this.checkTravelDate();
	}
//Checks if travel dates are passed. If it is passed, remove and add them to new list
	checkTravelDate(){
			firebase.database().ref('travels/').once('value', this.fbCallback);
	}
	fbCallback = function(snapshot) {
		//var that = this;
		var passedTravels = [];
		snapshot.forEach( child => {

			var travelTemp = child.val();
			//checks if travel date is passed
			var month;
			//Convert month string to number string
			switch (travelTemp.dateArray[1]) {
				  case "January":
				    month = "01";
				    break;
				  case "February":
				    month = "02";
				    break;
				  case "March":
				     month = "03";
				    break;
				  case "April":
				    month = "04";
				    break;
				  case "May":
				    month = "05";
				    break;
				  case "June":
				    month = "06";
				    break;
				  case "July":
				    month = "07";
						break;
					case "August":
					  month = "08";
						break;
				  case "September":
						month = "09";
						break;
					case "October":
						month = "10";
						break;
				  case "November":
						month = "11";
						break;
					case "December":
						month = "12";
						break;
						default:
			        console.log("No month matched");
			}
			var dateStr = travelTemp.dateArray[0] + "-" + month + "-" + travelTemp.dateArray[2];
			var date = new Date(); //gets current date
			var travelDate = new Date(dateStr);
			if(date > travelDate){
			    console.log(" The travel date is passed: " + travelTemp.key);
					passedTravels.push(travelTemp);
			}
			//console.log("Pushing travel object into array: " + travelTemp.key);
		})//end of foreach
		//Removes passed travels from travels list in the db
		for (var i = 0; i < passedTravels.length; i++) {
			//adds passed travels into the passedtravels branch
			firebase.database().ref('passedtravels/' + passedTravels[i].key).set(passedTravels[i]);
			//removes passed travels from travels branch
			firebase.database().ref('travels/' + passedTravels[i].key).remove();
			console.log("Passed travel keys: " + passedTravels[i].key);
		}
		//Adds past travels into passedtravels list
	}
//User logs out
	logOut(event) {
		console.log("User is logged out");
		this.setState({firstname: ""});
		this.setState({lastname: ""});
		this.setState({phone: ""});
		this.setState({email: ""});
		this.setState({password: ""});
		this.props.actionChangeLoginStatus(false);
		this.props.actionUpdateCurrentUser({});

		//Signing out current user
		firebase.auth().signOut().then(function() {
			  //console.log("Sign out successful");
			}).catch(function(error) {
			  //console.log("Sign out unsuccessful: " + error.message);
			});
	}

	handleChangeFirstname(event) {
    this.setState({firstname: event.target.value});
  }
	handleChangeLastname(event) {
    this.setState({lastname: event.target.value});
  }
	handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }
	handleChangePhone(event) {
    this.setState({phone: event.target.value});
  }
	handleChangePassword(event) {
    this.setState({password: event.target.value});
  }
	handleSubmitCreate(event) {
    event.preventDefault();
		const { email, password, error, firstname, lastname, phone} = this.state;

		firebase
     .auth()
     .createUserWithEmailAndPassword(email, password)
     .then((user) => {
       //console.log("User account is created:" + user);
				 if(error !== null){
	 				 this.setState({ error: null });
	 			}

				this.props.actionChangeLoginStatus(true); //login status is now logged in
				this.callLater(email, password, firstname, lastname, phone);
     })
     .catch((error) => {
       this.setState({ error: error.message });
			 //console.log("Can't create account:" + (typeof error));
     });
  }
	callLater(email, password, firstname, lastname, phone){
		/*
			console.log("firstname: " + firstname);
			console.log("lastname: " + lastname);
			console.log("phone: " + phone);
			console.log("email: " + email);
			console.log("password: " + password);
*/
			const newUser = {
						firstname: firstname,
						lastname: lastname,
						phone: phone,
						email: email,
						password: password,
						offeredtravels:["empty"],
						appliedtravels:["empty"],
						passedtravels: ["empty"],
						inbox:["empty"],
						outbox:["empty"],
						rates:["empty"],
						age: 0,
						gender: "",
						key: "",
						photourl: ""
					}//end of obj

			var userKey = firebase.database().ref('users/').push(newUser).key;
			firebase.database().ref('users/' + userKey + '/key').set(userKey);
			//var userId = firebase.auth().currentUser.uid
      newUser.key = userKey;

			//updating current user in the redux
			this.props.actionUpdateCurrentUser(newUser);
			//closing the login modal
			this.onCloseModal();
	};

	handleSubmitLogin(event) {
    event.preventDefault();
		const { email, password} = this.state;
		//console.log("Login button is clicked");
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  //var errorCode = error.code;
		  //var errorMessage = error.message;
			//console.log("Login attemp uncessful: " + errorMessage);
		});

		var user = firebase.auth().currentUser;
		 if (user) {
			 //console.log("User is signed in");
			 this.props.actionChangeLoginStatus(true); //login status is now logged in
			 this.callLaterLogin(email);
		 } else {
			 console.log("User is not signed in");
		 }
  }
	callLaterLogin(email){
			//accessing users from db
			const {users} = this.props.users;
			for(let child in users){
						let r = users[child];
							//console.log("user email: " + r.email);
						if(r.email === email){
							//updating current user in the redux
							this.props.actionUpdateCurrentUser(r);
						} //end of if else
			}//end of for

			//closing the login modal
			this.onCloseModal();
	};
	onOpenModal = () => {
	    this.setState({ modalOpen: true });
	};

	onCloseModal = () => {
	    this.setState({ modalOpen: false });
			this.setState({ error: null });
			if(this.state.currentModal === "create"){
				 this.setState({ currentModal: "login" });
			}
	};

	changeModalContentCreate = () => {
	    this.setState({ currentModal: "create" });
			if(this.state.error !== null){
				 this.setState({ error: null });
			}
	};
	changeModalContentLogin = () => {
	    this.setState({ currentModal: "login" });
			if(this.state.error !== null){
				 this.setState({ error: null });
			}
	};

	render() {
		const {currentTab} = this.props.currentTab;
		const { modalOpen, error } = this.state;
		const {loginStatus} = this.props.loginStatus;


		//console.log("Login status is: " + loginStatus);
		//current user obj from redux store
		//console.log("firstname in render: " + currentUser.firstname);
		//console.log("lastname in render: " + currentUser.lastname);
		//console.log("phone in render: " + currentUser.phone);
		//console.log("email in render: " + currentUser.email);
		//console.log("passwordin render: " + currentUser.password);
		//console.log("key in render: " + currentUser.key);
		/*
		for (var key in currentUser) {
			    if (currentUser.hasOwnProperty(key)) {
							console.log("Current user values are: " + currentUser[key]);
			    }
		}
*/
			return (
				<header>
								<div className="headerFirst">
											<div className="logo">
													<Link to="/">
															<img src={require('../img/earth11-logo.png')} alt="Home" />
													</Link>
											</div>
											<nav>
													<Link className={(currentTab === "home") ? "chosen" : "notChosen"} to="/">Search a ride</Link>
													<Link className={(currentTab === "offeraride") ? "chosen" : "notChosen"} to="/offeraride">Offer a ride</Link>
													<Link className={(currentTab === "sendbyatruck") ? "chosen" : "notChosen"} to="/sendbyatruck">Send by a truck</Link>
													<Link className={(currentTab === "howitworks") ? "chosen" : "notChosen"} to="/howitworks">How it works</Link>
											</nav>
								</div>

								<div className="headerSecond">
									 <div className={(loginStatus === false) ? "loginBtn" : "notVisible"}>
									 				<button onClick={this.onOpenModal}>Log in</button>
									 </div>
									 <div className={(loginStatus === true) ? "logoutBtn" : "notVisible"}>
									 				<Link to="/profile"><img src={require('../img/profile.png')} alt="Profile" /></Link>
									 				<button onClick={this.logOut}>Log out</button>
									 </div>
								</div>

								<Modal open={modalOpen} onClose={this.onCloseModal} center>
										<div className={(this.state.currentModal === "login") ? "loginModalContent" : "notVisible"}>

												<h2>Log in</h2>
												<div className="form_content">
													<form className="form" onSubmit={this.handleSubmitLogin}>
														<input type = "text" placeholder="Epost" onChange={this.handleChangeEmail}/>
														<input type = "password" placeholder="Password" onChange={this.handleChangePassword}/>
														<input className="formButton" type="submit" value="Login"/>
													</form>
							 					</div>

												<div className="loginBottom">
														<p>Not registered yet?</p>
														<button onClick={this.changeModalContentCreate}>Create a account</button>

												</div>

										</div>
										<div className={(this.state.currentModal === "create") ? "createAccountModalContent" : "notVisible"}>
												<h2>Create an account</h2>
												<div className="form_content">
													<form className="form" onSubmit={this.handleSubmitCreate}>
														<input type = "text" placeholder="First name" onChange={this.handleChangeFirstname}/>
														<input type = "text" placeholder="Last name" onChange={this.handleChangeLastname}/>
														<input type = "text" placeholder="Email" onChange={this.handleChangeEmail}/>
														<input type = "text" placeholder="Phone number (optional)" onChange={this.handleChangePhone}/>
														<input type = "password" placeholder="Password" onChange={this.handleChangePassword}/>
														<input className="formButton" type="submit" value="Submit" />
													</form>
							 					</div>

												<div className={(error) ? "errorLogin" : "notVisible"}>
															<p>Account creation failed</p>
															<p>{error}</p>
												</div>

												<div className="loginBottom">
														<button onClick={this.changeModalContentLogin}>Back to login</button>
												</div>
										</div>
				        </Modal>
				</header>
			)//end of return

	}//end of render

} //end of component
const mapStateToProps = state => ({
  currentTab: state.currentTab,
	loginStatus: state.loginStatus,
	users: state.users
});
export default connect(mapStateToProps,{actionClickTab, actionChangeLoginStatus, actionUpdateCurrentUser, actionFetchUsers, actionFetchTravels})(Menu);
