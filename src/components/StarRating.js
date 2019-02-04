/*
		Placeholder component for How It Works page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';

class StarRating extends Component {
		static defaultProps = {
	    minRating: 0,
	    maxRating: 10,
	    rating: 5,
	    starRatio: 2,
	    limit: 1000
	  }

	  render() {
	    return (
	      <div className="star-rating">

	      </div>
	    )
	}

} //end of component

const mapStateToProps = state => ({
});
export default connect(mapStateToProps,{actionClickTab})(StarRating);


//
