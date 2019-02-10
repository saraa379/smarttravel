/*
		The component is a placeholder page for the links that doesn't have a page.
		This page comes when user types wrong url.
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './TravelEdit.css';
import InputProfile from './InputProfile.js';
import firebase from '../firebase/firebase.js';
import Calendar from './Calendar.js';

const style = {
  position: "relative",
  margin: "0 auto"
}

class TravelEdit extends Component {
	constructor(props) {
			super(props);
			this.state = {
										travel: {},
										departureCity: "",
										destinationCity: "",
										selectedDay: "",
										datePickerVisible: false,
										dateArray: [],
										price: "",
										content: ""
			};
			this.getDepartureCity = this.getDepartureCity.bind(this);
			this.getDestinationCity = this.getDestinationCity.bind(this);
			this.showDatePicker = this.showDatePicker.bind(this);
			this.datePickerInputChange = this.datePickerInputChange.bind(this);
			this.priceChange = this.priceChange.bind(this);
			this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
			this.editTravel = this.editTravel.bind(this);
			this.editCancel = this.editCancel.bind(this);
	}//end of constructor
	componentDidMount(){
			var travelObj = this.props.travel;
			//console.log("Travel recieved in Edit: " + travelObj.key);
			this.setState({travel: travelObj});
	}
	//Recieves selected city object from InputSearch field
	getDepartureCity(city) {
 		 this.setState({ departureCity: city });
		 //console.log("Departure city is: " + city.title);
  }
	//Recieves selected city object from InputSearch field
	getDestinationCity(city) {
 		 this.setState({ destinationCity: city });
		 //console.log("Departure city is: " + city.title);
  }
	showDatePicker() {
		var datePickerVisibility = this.state.datePickerVisible;
    this.setState({ datePickerVisible: !datePickerVisibility });
  }
	datePickerInputChange() {
    this.setState({ datePickerVisible: true });
		this.setState({ selectedDay: "" });
		this.setState({ dateArray: [] });
    this.setState({ dateError: true });
  }
	onDayClick = (e, day, month, year) => {
			var date = year + "/" + month + "/" + day;
			//console.log("The chosen date is: " + date);
			this.setState({ selectedDay: date });
			this.setState({ datePickerVisible: false });
			var dateArray = [];
			dateArray.push(year);
			dateArray.push(month);
			dateArray.push(day);
			this.setState({ dateArray: dateArray });
      this.setState({ dateError: false });
	 }
	 //price input
   priceChange(event) {
     this.setState({price: event.target.value});
   }
	 //Content add from textarea
   handleChangeTextArea(event) {
     this.setState({content: event.target.value});
   }
//saves the changes of travel into db
	 editTravel() {
			const { departureCity, destinationCity, dateArray,
				      price, content, travel } = this.state;

				if (departureCity !== "") {
						firebase.database().ref('travels/' + travel.key + '/fromCity').set(departureCity);
				}
				if (destinationCity !== "") {
						firebase.database().ref('travels/' + travel.key + '/toCity').set(destinationCity);
				}
				if (dateArray.length > 1) {
						firebase.database().ref('travels/' + travel.key + '/dateArray').set(dateArray);
				}
				if (price !== "") {
						firebase.database().ref('travels/' + travel.key + '/price').set(price);
				}
				if (content !== "") {
						firebase.database().ref('travels/' + travel.key + '/content').set(content);
				}
				
				this.props.cancel(travel.key);
   }
	 //cancels the editing and closes the edit page
	 	 editCancel() {
	 			const { travel } = this.state;
	 				this.props.cancel(travel.key);
	    }

	render() {
		const { travel, selectedDay, datePickerVisible, price, content } = this.state;
		var fromCity = "Departure city";
		var toCity = "Destination city";
		var contentw = "Enter a description";
		var pricew = "Enter a price";

		if (travel.fromCity !== undefined) {

				fromCity = travel.fromCity.title;
				toCity = travel.toCity.title;
				contentw = travel.content;
				pricew = travel.price;
		}
		var date = "Choose a date";
		if (travel.dateArray !== undefined) {
				date = travel.dateArray[0] + "/" + travel.dateArray[1] + "/" + travel.dateArray[2];
		}




		return (
			<div className="TravelEditWrap InnerWrapProfile">

						<div className="InputWrapTravel">
									<label>Departure city</label>
									<InputProfile pText={fromCity}
															 callbackGetDepartCity={this.getDepartureCity}>
									</InputProfile>
						</div>

						<div className="InputWrapTravel">
									<label>Destination city</label>
									<InputProfile pText={toCity}
															 callbackGetDepartCity={this.getDestinationCity}>
									</InputProfile>
						</div>

						<div className="InputWrapTravel">
									<label>Date</label>
									<input type = "text" placeholder={date} onClick={this.showDatePicker} onChange={this.datePickerInputChange} value={selectedDay}/>
									<div className={(datePickerVisible) ? "datePicker" : "notVisible"}>
												<Calendar style={style} width="302px"
																	onDayClick={(e, day, month, year)=> this.onDayClick(e, day, month, year)}
												/>
									</div>
						</div>

						<div className="InputWrapTravel">
									<label>Price</label>
									<input type = "text" placeholder={pricew} onChange={this.priceChange} value={this.state.price}/>
						</div>

						<div className="InputWrapTravel">
									<label>Description</label>
									<textarea placeholder={contentw} rows="7" onChange={this.handleChangeTextArea} value={this.state.content}></textarea>
						</div>

						<div className="InputWrapTravel TravelBtns">
									<div id="cancelBtnTravel" className="TravelBtn" onClick={this.editCancel}>Cancel</div>
									<div className="TravelBtn" onClick={this.editTravel}>Save</div>
						</div>

			</div>
		)
	}
}

const mapStateToProps = state => ({

});
export default connect(mapStateToProps,{})(TravelEdit);
