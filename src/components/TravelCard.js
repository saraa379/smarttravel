/*
		Placeholder component for How It Works page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import './TravelCard.css';
import firebase from '../firebase/firebase.js';
import StarRating from 'react-star-rating-component';

class TravelCard extends Component {
	constructor(props) {
			super(props);
			this.state = {
										user: "",
										rating: 0
			};
			this.fbCallback = this.fbCallback.bind(this);
			this.onStarClick = this.onStarClick.bind(this);
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
					var userRate = userTemp.rates;
					if (userRate.length >= 1) {
							userRate.shift();
							let sum = userRate.reduce((previous, current) => current.rate += previous.rate);
							let avg = sum / userRate.length;
							that.setState({rating: avg});
					}
			}
			//dataArray.push(userTemp);
			//console.log("Pushing travel object into array: " + travelTemp.key);
		})//end of foreach
		/*
		that.setState({
				users: dataArray
		});*/
	}
	componentWillUnmount() {
		firebase.database().ref('users/').off('value', this.fbCallback);
	}
	onStarClick(nextValue, prevValue, name) {
		const {loginStatus} = this.props.loginStatus;
		const {currentUser} = this.props.currentUser;
		var user = this.state.user;
		//const travel = this.props.travel;
		//console.log("Next value for rating is: " + nextValue);
		if (loginStatus === true) {
				this.setState({rating: nextValue});
				//creates new rate when user clicked on star
				var newRate = {
							userkey: currentUser.key,
							rate: nextValue
						}//end of obj
				var rates = currentUser.rates;
				if (rates.length === 1) {
						rates.push(newRate);
				} else {
						var exist = false;
						for (var i = 1; i < rates.length; i++) {
								if(rates[i].userkey === currentUser.key){
										rates[i] = newRate;
										exist = true;
								}
						}
						if (exist === false) {
								rates.push(newRate);
						}
				}
						//rate into db
				firebase.database().ref('users/' + user.key + '/rates').set(rates);
		} else {
			console.log("Please login to rate users");
		}
  }
	render() {
		const travel = this.props.travel;
		const { user, rating } = this.state;
		//console.log("User in travel card: " + user.key);
		//Capitalize first letter
		var fromCity = travel.fromCity.title.charAt(0).toUpperCase() + travel.fromCity.title.slice(1);
		var toCity = travel.toCity.title.charAt(0).toUpperCase() + travel.toCity.title.slice(1);

//Convert month string to number string
		var month;
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
				case 0:
					dayOfWeekStr = "Sunday";
					break;
				default:
		        console.log("No weekend is matched");
				}

		var date = dayOfWeekStr + ", " + travel.dateArray[1] + " " + travel.dateArray[2] + ", " + travel.dateArray[0];
		/*<img src={require('../img/car1.png')} alt="Travel" />*/

		//adds id to the travel AppWrap
		const travelId = travel.key;

		//user image
		var userImg = "";
		if (user.photourl === "") {
				userImg = require('../img/profile.png');
		} else {
				userImg = user.photourl;
		}
		//user gender and age
		//console.log("User gender: " + user.gender);
		var genderAge = "";
		if (user.gender !== undefined && user.age !== undefined) {

					if (user.gender !== "" && user.age !== 0) {
							var gender = user.gender.charAt(0).toUpperCase() + user.gender.slice(1);
							genderAge = gender + ", " + user.age;
					} else if (user.gender === "" && user.age !== 0) {
							genderAge = "Age: " + user.age;
					} else if (user.gender !== "" && user.age === 0){
							genderAge = user.gender.charAt(0).toUpperCase() + user.gender.slice(1);
					}
		}

		return (
			<div id={travelId} className="TravelWrap">
					<div className="TravelInfo">
							<div className="TravelTitle">
									<i className="fa fa-car"></i>
									<h3>{fromCity}</h3>
									<i className="fas fa-caret-right"></i>
									<h3>{toCity}</h3>
							</div>
							<h4><span>Date : </span><span>{date}</span></h4>
							<h4><span>Price : </span><span>{travel.price}</span></h4>
							<p>{travel.content}</p>
					</div>
					<div className="UserInfo">
							<div className="UserTop">
									<img src={userImg} alt="User" />
									<div className="UserText">
											<p>{user.firstname}</p>
											<p>{genderAge}</p>
									</div>
							</div>
							<div className="Rate">
										<StarRating
											name="rate1"
											starCount={5}
											emptyStarColor={"#DCDCDC"}
											value={rating}
											onStarClick={this.onStarClick.bind(this)}
										/>
							</div>
					</div>

			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
		loginStatus: state.loginStatus,
		currentUser: state.currentUser
});
export default connect(mapStateToProps,{actionClickTab})(TravelCard);

//
