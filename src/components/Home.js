import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';


class Home extends Component {
	componentDidMount(){
		this.props.actionClickTab("home");
	}
	render() {

		return (
			<div className="innerWrap">
				 	Home page
			</div>
		)
	}

} //end of component
const mapStateToProps = state => ({
});

export default connect(mapStateToProps,{actionClickTab})(Home);


//
