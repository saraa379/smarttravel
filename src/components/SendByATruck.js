/*
		Placeholder component for How It Works page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';

class SendByATruck extends Component {
	componentDidMount(){
		this.props.actionClickTab("sendbyatruck");
	}
	render() {

		return (
			<div className="innerWrap">
				 	<p>Send by a truck page</p>
			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
});
export default connect(mapStateToProps,{actionClickTab})(SendByATruck);


//
