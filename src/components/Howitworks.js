/*
		Placeholder component for How It Works page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';

class Howitworks extends Component {
	componentDidMount(){
		this.props.actionClickTab("howitworks");
	}
	render() {

		return (
			<div className="innerWrap">
				 	<p>How it works page</p>
			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
});
export default connect(mapStateToProps,{actionClickTab})(Howitworks);


//
