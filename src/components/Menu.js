/*
		Header component. This component show on the top of every page.
		The component contains menu and search section.
*/
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Menu.css';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';

class Menu extends Component {

	constructor(props) {
			super(props);
			this.state = {menuChecked: false,
									 };
	}//end of constructor


	render() {
		const {currentTab} = this.props.currentTab

		if (currentTab === "Home"){
			return (
				<header>
						<div className="headerTop">

								<div className="logo">
								</div>
								<nav>
										<Link to="/howitworks">How it works?</Link>
										<Link to="/ourmission">Our Mission</Link>
								</nav>
						</div>

				</header>
			)
		} else {
			return (
				<header>
						<div className="headerTop">

								<div className="logo">
								</div>
								<nav>
										<Link to="/howitworks">How it works?</Link>
										<Link to="/ourmission">Our Mission</Link>
								</nav>
						</div>

				</header>
			)
		}

	}

} //end of component
const mapStateToProps = state => ({
  currentTab: state.currentTab,
});
export default connect(mapStateToProps,{actionClickTab})(Menu);
