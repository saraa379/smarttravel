/*
		Placeholder component for How It Works page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import './TravelCard.css';
import firebase from '../firebase/firebase.js';

class TravelCard extends Component {
	constructor(props) {
			super(props);
			this.state = {
										users: []
			};
			this.fbCallback = this.fbCallback.bind(this);
	}//end of constructor

	componentWillMount(){
		firebase.database().ref('users/').on('value', this.fbCallback);
	}
	fbCallback = function(snapshot) {
		var that = this;
		var dataArray = [];
		snapshot.forEach( child => {

			var userTemp = child.val();
			dataArray.push(userTemp);
			//console.log("Pushing travel object into array: " + travelTemp.key);
		})//end of foreach
		that.setState({
				users: dataArray
		});
	}

	render() {
		const travel = this.props.travel;
		//console.log("Travel in card: " + travel.content);
		//Capitalize first letter
		var fromCity = travel.fromCity.title.charAt(0).toUpperCase() + travel.fromCity.title.slice(1);
		var toCity = travel.toCity.title.charAt(0).toUpperCase() + travel.toCity.title.slice(1);
		var title = fromCity + " to " + toCity;
		var month;
		//Convert month string to number string
		switch (travel.dateArray[1]) {
			  case "January":
			    month = "01";
			    break;
			  case "February":
			    month = "02";
			    break;
			  case "March":
			     month = "03";
			    break;
			  case "April":
			    month = "04";
			    break;
			  case "May":
			    month = "05";
			    break;
			  case "June":
			    month = "06";
			    break;
			  case "July":
			    month = "07";
					break;
				case "August":
				  month = "08";
					break;
			  case "September":
					month = "09";
					break;
				case "October":
					month = "10";
					break;
			  case "November":
					month = "11";
					break;
				case "December":
					month = "12";
					break;
		}
		var dateStr = travel.dateArray[0] + "-" + month + "-" + travel.dateArray[2];
		var dayOfWeek = new Date(dateStr).getDay();
		//Convert day of week nr to string name
		var dayOfWeekStr;
		switch (dayOfWeek) {
			  case 1:
			    dayOfWeekStr = "Monday";
			    break;
			  case 2:
			    dayOfWeekStr = "Tuesday";
			    break;
			  case 3:
			     dayOfWeekStr = "Wednesday";
			    break;
			  case 4:
			    dayOfWeekStr = "Thursday";
			    break;
			  case 5:
			    dayOfWeekStr = "Friday";
			    break;
			  case 6:
			    dayOfWeekStr = "Saturday";
			    break;
			  case 7:
			    dayOfWeekStr = "Sunday";
				}

		var date = dayOfWeekStr + ", " + travel.dateArray[1] + " " + travel.dateArray[2] + ", " + travel.dateArray[0];

		return (
			<div className="TravelWrap">
					<div className="TravelInfo">
							<h3>{title}</h3>
							<h4><span>Date : </span><span>{date}</span></h4>
							<p>{travel.content}</p>
					</div>
					<div className="UserInfo">
							User info
					</div>

			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
});
export default connect(mapStateToProps,{actionClickTab})(TravelCard);


//
