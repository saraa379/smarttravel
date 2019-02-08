import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import firebase from '../firebase/firebase.js';
import './TravelsContent.css';



class TravelsContent extends Component {
	constructor(props) {
			super(props);
			this.state = {
								    noTravels: true,
										noPassedTravels: true,
										travels: [],
										passedtravels: []
		  };
			this.callLater = this.callLater.bind(this);
			this.travelEdit = this.travelEdit.bind(this);
	}//end of constructor

	componentWillReceiveProps(nextProps){
			const {currentUser} = nextProps.currentUser;
			var travelsKey = currentUser.offeredtravels;
			var tempTravels = [];
			var that = this;

			if (travelsKey !== undefined && travelsKey.length > 1) {
					this.setState({ noTravels: false});
					travelsKey.shift();
					let unique = [...new Set(travelsKey)];

					var dbTravels = [];
					firebase.database().ref('travels/').once('value', function(snapshot) {
						let data = snapshot.val();
						for(let child in data){
							let r = data[child];
								dbTravels.push(r);
						}//end of for
					})//end of db.ref
					for (var i = 0; i < unique.length; i++) {
							//console.log("Offered travels: " + unique[i]);
							for (var it = 0; it < dbTravels.length; it++) {
									if(dbTravels[it].key === unique[i]){
										tempTravels.push(dbTravels[it]);
									} //end of if else
							}//end of inner for
				 }//end of for
				 that.callLater(tempTravels);
			}//end of if
	}//end of componentWillReceiveProps

	callLater(travels){
			let unique = [...new Set(travels)];
			//console.log("Size of travels array is: " + travels.length);
			for (var i = 0; i < unique.length; i++) {
					unique[i].edit = false;
			}
			this.setState({ travels: unique});
	}

	travelEdit(key){
			console.log("Travel key for editing: " + key);
	}

	render() {
		const { noTravels, noPassedTravels, travels } = this.state;
		/*
		for (var i = 0; i < travels.length; i++) {
			console.log("travels in render: " + travels[i].key);
		}*/
		const listItems = travels.map(function(travel) {
			var fromCity = travel.fromCity.title.charAt(0).toUpperCase() + travel.fromCity.title.slice(1);
			var toCity = travel.toCity.title.charAt(0).toUpperCase() + travel.toCity.title.slice(1);
			//var that = this;
			//console.log("Travels editable: " + travel.edit);
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
					//console.log("Day of week: " + dayOfWeek);
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

					if (travel.edit === true) {
							return <div className="TravelWrap2" key={travel.key}>
																Edit page

										 </div>;
					} else {
							return <div className="TravelWrap2" key={travel.key}>

													<div className="TravelInfo2">
															<div className="TravelTitle2">
																	<i className="fa fa-car"></i>
																	<h3>{fromCity}</h3>
																	<i className="fas fa-caret-right"></i>
																	<h3>{toCity}</h3>
															</div>
															<h4><span>Date : </span><span>{date}</span></h4>
															<h4><span>Price : </span><span>{travel.price}</span></h4>
															<p>{travel.content}</p>
													</div>

													<div className="TravelBtnsWrap">
															<div className="TravelBtn" onClick={() => this.travelEdit(travel.key)}>
																		Edit
															</div>
															<div className="TravelBtn TravelBtnRemove">
																		Remove
															</div>
													</div>

										 </div>;
					}//end of if
			}, this); //end of map



		return (
				<div className="TravelsContentInner">

							<div className="TravelsSection">
										<h3 className="TravelsTitle">Currently Offered Travels</h3>
										<p className={(noTravels === true) ? "NoMsg" : "notVisible"}>You have no offered travels!</p>
										<div className={(noTravels === false) ? "TravelList" : "notVisible"}>
												{listItems}
										</div>
							</div>

							<div className="TravelsSection LastTravelSection">
										<h3 className="TravelsTitle">Your Offered Travels That Passed</h3>
										<p className={(noPassedTravels === true) ? "NoMsg LastNoMsg" : "notVisible"}>You have no offered travels that passed!</p>
										<div className={(noPassedTravels === false) ? "TravelList" : "notVisible"}>
												Offered travel list
										</div>
							</div>

				</div>
		)
	}

} //end of component
const mapStateToProps = state => ({
		currentUser: state.currentUser,
		travels: state.travels
});

export default connect(mapStateToProps,{actionClickTab})(TravelsContent);


//
