import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import firebase from '../firebase/firebase.js';
import './TravelsContent.css';
import TravelEdit from './TravelEdit.js';
import PassedTravel from './PassedTravel.js';



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
			this.cancelEdit = this.cancelEdit.bind(this);
			this.travelDelete = this.travelDelete.bind(this);
			this.callLaterPassed = this.callLaterPassed.bind(this);
	}//end of constructor

	componentWillReceiveProps(nextProps){
			const {currentUser} = nextProps.currentUser;
			var travelsKey = currentUser.offeredtravels;
			var that = this;

			if (travelsKey !== undefined && travelsKey.length > 1) {
					travelsKey.shift();
					let unique = [...new Set(travelsKey)];

      //travels from db
					var dbTravels = [];
							firebase.database().ref('travels/').once('value', function(snapshot) {
								let data = snapshot.val();
								for(let child in data){
									let r = data[child];
										dbTravels.push(r);
								}//end of for
								that.callLater(dbTravels, unique);
							})//end of db.ref


					//passed travels from db
							var dbPassedTravels = [];
							firebase.database().ref('passedtravels/').once('value', function(snapshot) {
									let data = snapshot.val();
									for(let child in data){
											let r = data[child];
											dbPassedTravels.push(r);
											//console.log("passed travel: " + r.key);
									}//end of for
									that.callLaterPassed(dbPassedTravels, unique);
							})//end of db.ref

			}//end of if
	}//end of componentWillReceiveProps

	callLaterPassed(travels, key){
			var passedTravels = [];
			for (var i = 0; i < key.length; i++) {
					//passed travels
					for (var m = 0; m < travels.length; m++) {
							//console.log("Passed travels: " + travels[m].key);
							if(travels[m].key === key[i]){
								passedTravels.push(travels[m]);
							} //end of if else
					}//end of inner for
			}//end of for

			//passed travels
			if (passedTravels.length > 0) {
					let unique = [...new Set(passedTravels)];
					this.setState({ passedtravels: passedTravels});
					this.setState({ noPassedTravels: false});
			}

	}

	callLater(travels, keys){
			var tempTravels = [];
			for (var i = 0; i < keys.length; i++) {
					//offered travel not passed
					for (var it = 0; it < travels.length; it++) {
							if(travels[it].key === keys[i]){
								tempTravels.push(travels[it]);
							} //end of if else
					}//end of inner for
			}//end of for
			if (tempTravels.length > 0) {
					var unique = [...new Set(tempTravels)];
					for (var i = 0; i < unique.length; i++) {
							unique[i].edit = false;
					}
					this.setState({ travels: unique});
					this.setState({ noTravels: false});
			}

			//console.log("Size of travels array is: " + travels.length);

	}

	travelEdit(key){
			var tempArray = this.state.travels;
			//console.log("Travel key for editing: " + key);
			for (var i = 0; i < tempArray.length; i++) {
					if (tempArray[i].key === key) {
							tempArray[i].edit = true;
					}
			}
			this.setState({ travels: tempArray });
	}
	cancelEdit(key){
			var tempArray = this.state.travels;
			//console.log("Travel key for editing: " + key);
			for (var i = 0; i < tempArray.length; i++) {
					if (tempArray[i].key === key) {
							tempArray[i].edit = false;
					}
			}
			this.setState({ travels: tempArray });
	}
//Deletes the travel from db
	travelDelete(key){
			firebase.database().ref('travels/' + key).remove();
	}

	render() {
		const { noTravels, noPassedTravels, travels, passedtravels } = this.state;

		for (var i = 0; i < passedtravels.length; i++) {
			console.log(" passed travels in render: " + passedtravels[i].key);
		}
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
														<TravelEdit travel={travel} cancel={this.cancelEdit}>
														</TravelEdit>

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
															<div className="TravelBtn TravelBtnRemove" onClick={() => this.travelDelete(travel.key)}>
																		Remove
															</div>
													</div>

										 </div>;
					}//end of if
			}, this); //end of map

		const passedTrav = passedtravels.map(function(travel) {
								return <PassedTravel key={travel.key} travel={travel}>
											 </PassedTravel>
		}); //end of map



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
												{passedTrav}
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
