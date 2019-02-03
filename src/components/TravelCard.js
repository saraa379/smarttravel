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
										users: [],
										user: ""
			};
			this.fbCallback = this.fbCallback.bind(this);
	}//end of constructor

	componentWillMount(){
		firebase.database().ref('users/').on('value', this.fbCallback);
	}
	fbCallback = function(snapshot) {
		var that = this;
		var travel = this.props.travel;
		//console.log("user key in travel object: " + travel.ownerKey);
		//var dataArray = [];
		snapshot.forEach( child => {

			var userTemp = child.val();
			if (userTemp.key === travel.ownerKey) {
					that.setState({user: userTemp});
			}
			//dataArray.push(userTemp);
			//console.log("Pushing travel object into array: " + travelTemp.key);
		})//end of foreach
		/*
		that.setState({
				users: dataArray
		});*/
	}

	render() {
		const travel = this.props.travel;
		const { user } = this.state;
		//console.log("User in travel card: " + user.key);
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
				default:
	        console.log("No month matched");
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
				  break;
					default:
		        console.log("No weekend is matched");
				}

		var date = dayOfWeekStr + ", " + travel.dateArray[1] + " " + travel.dateArray[2] + ", " + travel.dateArray[0];
		/*<img src={require('../img/car1.png')} alt="Travel" />*/

		return (
			<div className="TravelWrap">
					<div className="TravelInfo">
							<div className="TravelTitle">
									<i class="fa fa-car"></i>
									<h3>{fromCity}</h3>
									<i class="fas fa-caret-right"></i>
									<h3>{toCity}</h3>
							</div>
							<h4><span>Date : </span><span>{date}</span></h4>
							<p>{travel.content}</p>
					</div>
					<div className="UserInfo">
							{user.firstname}
					</div>

			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
});
export default connect(mapStateToProps,{actionClickTab})(TravelCard);


//
