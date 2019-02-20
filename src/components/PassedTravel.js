import React, {Component} from 'react';
import {connect} from 'react-redux';
import './PassedTravel.css';
//import TravelEdit from './TravelEdit.js';



class PassedTravel extends Component {
	constructor(props) {
			super(props);
			this.state = {
								    noTravels: true,
										noPassedTravels: true,
										travels: [],
										passedtravels: []
		  };
	}//end of constructor
/*
	componentWillReceiveProps(nextProps){
			const travel = nextProps.travel;

	}//end of componentWillReceiveProps

*/
	render() {
		const travel = this.props.travel;

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






		return (
        <div className="TravelWrap2">

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

        </div>
		)
	}

} //end of component
const mapStateToProps = state => ({
});

export default connect(mapStateToProps,{})(PassedTravel);


//
