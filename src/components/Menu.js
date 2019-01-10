/*
		Header component. This component shows on the top of every page.
		The component contains menu.
*/
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Menu.css';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';

class Menu extends Component {

	constructor(props) {
			super(props);
			this.state = {menuChecked: false
									 };
	}//end of constructor


	render() {
		const {currentTab} = this.props.currentTab

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
									 				<button>Log in</button>
									 </Link>
								</div>
				</header>
			)//end of return

	}//end of render

} //end of component
const mapStateToProps = state => ({
  currentTab: state.currentTab
});
export default connect(mapStateToProps,{actionClickTab})(Menu);
