/*
		Header component. This component shows on the top of every page.
		The component contains menu.
*/
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Menu.css';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
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
			this.callLater = this.callLater.bind(this);
	}//end of constructor

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
		const { email, password, error, firstname, lastname, phone } = this.state;
		firebase
     .auth()
     .createUserWithEmailAndPassword(email, password)
     .then((user) => {
       console.log("User account is created:" + user);
				 if(error !== null){
	 				 this.setState({ error: null });
	 			}
				this.callLater(email, password, firstname, lastname, phone);
     })
     .catch((error) => {
       this.setState({ error: error.message });
			 //console.log("Can't create account:" + (typeof error));
     });
  }
	callLater(email, password, firstname, lastname, phone){
			console.log("firstname:" + firstname);
			console.log("lastname:" + lastname);
			console.log("phone:" + phone);
			console.log("email:" + email);
			console.log("password:" + password);
			const newUser = {
		        firstname: firstname,
						lastname: lastname,
		        phone: phone,
						email: email,
		        password: password,
		        adds: [],
		        key: ""
		      }//end of obj
			//var userKey = firebase.database.ref('users/').push(newUser).key;
			//firebase.database().ref('users/' + userKey + '/key').set(userKey);
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

		//console.log("Error is: " + error);
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
									 <div className={(currentTab === "login") ? "chosen" : "notChosen"}>
									 				<button onClick={this.onOpenModal}>Log in</button>
									 </div>
								</div>

								<Modal open={modalOpen} onClose={this.onCloseModal} center>
										<div className={(this.state.currentModal === "login") ? "loginModalContent" : "notVisible"}>

												<h2>Log in</h2>
												<div className="form_content">
													<div className="form">
														<input type = "text" placeholder="Epost" />
														<input type = "password" placeholder="Password" />
														<button> Login </button>
													</div>
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
  currentTab: state.currentTab
});
export default connect(mapStateToProps,{actionClickTab})(Menu);
