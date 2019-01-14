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

class Menu extends Component {

	constructor(props) {
			super(props);
			this.state = {menuChecked: false,
										modalOpen: false,
										currentModal: "login"
									 };
	}//end of constructor

	onOpenModal = () => {
	    this.setState({ modalOpen: true });
	};

	onCloseModal = () => {
	    this.setState({ modalOpen: false });
			if(this.state.currentModal === "create"){
				 this.setState({ currentModal: "login" });
			}
	};

	changeModalContentCreate = () => {
	    this.setState({ currentModal: "create" });
	};
	changeModalContentLogin = () => {
	    this.setState({ currentModal: "login" });
	};

	render() {
		const {currentTab} = this.props.currentTab;
		const { modalOpen } = this.state;

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
									 <Link className={(currentTab === "login") ? "chosen" : "notChosen"} to="/login">
									 				<button onClick={this.onOpenModal}>Log in</button>
									 </Link>
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
													<div className="form">
														<input type = "text" placeholder="Epost" />
														<button> Send </button>
													</div>
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
