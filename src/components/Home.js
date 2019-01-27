import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import './Home.css';


class Home extends Component {
	componentDidMount(){
		this.props.actionClickTab("home");
	}
	render() {

		return (
			<div className="innerWrap">
						<div className="HomeHero">
									 <p>Wanna offer a ride?</p>
									 <h2>A Good Choice</h2>
									 <p className="lastP">Make your next journey more enjoyable with others</p>
						</div>
			</div>
		)
	}

} //end of component
const mapStateToProps = state => ({
});

export default connect(mapStateToProps,{actionClickTab})(Home);


//
