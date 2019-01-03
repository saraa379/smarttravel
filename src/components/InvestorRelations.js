/*
		Placeholder component Investor Relations page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';

class InvestorRelations extends Component {
	componentDidMount(){
		this.props.actionClickTab("investorrelations");
	}
	render() {

		return (
			<div className="innerWrap">
				 	<p>Investor Relations page</p>
			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
});

export default connect(mapStateToProps,{actionClickTab})(InvestorRelations);
