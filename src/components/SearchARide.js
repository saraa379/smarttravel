/*
		Placeholder component Investor Relations page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';

class SearchARide extends Component {
	componentDidMount(){
		this.props.actionClickTab("searcharide");
	}
	render() {

		return (
			<div className="innerWrap">
				 	<p>Search a ride page</p>
			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
});

export default connect(mapStateToProps,{actionClickTab})(SearchARide);
