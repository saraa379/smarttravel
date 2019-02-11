/*
		Placeholder component for How It Works page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';

class FAQ extends Component {
	componentDidMount(){
		this.props.actionClickTab("faq");
	}
	render() {

		return (
			<div className="innerWrap">
				 	<p>Frequently asked questions page</p>
			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
});
export default connect(mapStateToProps,{actionClickTab})(FAQ);


//
