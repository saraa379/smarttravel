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
													<Link className={(currentTab === "howitworks") ? "chosen" : "notChosen"} to="/howitworks">How it works</Link>

											</nav>
								</div>
								<div className="headerSecond">
									 <Link className={(currentTab === "login") ? "chosen" : "notChosen"} to="/login">
									 				<button onClick={this.onOpenModal}>Log in</button>
									 </Link>
								</div>
								<Modal open={modalOpen} onClose={this.onCloseModal} closeOnEsc={true} center>
										<div className={(this.state.currentModal === "login") ? "loginModalContent" : "notVisible"}>
												<h2>Log in</h2>
										</div>
										<div className={(this.state.currentModal === "create") ? "createAccountModalContent" : "notVisible"}>
												<h2>Create new account</h2>
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
