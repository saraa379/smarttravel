/*
		Offer a ride page
		Here user applies to offer a ride
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import './OfferARide.css';
import _ from 'lodash';
import Calendar from './Calendar.js';
import firebase from '../firebase/firebase.js';
import {actionUpdateCurrentUser} from '../actions/updateCurrentUserAction.js';


const style = {
  position: "relative",
  margin: "0 auto"
}

const cityArray = [{title: "Alingsås", county: "Västra Götaland"},
{title: "Arboga", county: "Västmanland"},
{title: "Arvika", county: "Värmland"},
{title: "Askersund", county: "Örebro"},
{title: "Avaskär", county: "Blekinge"},
{title: "Avesta", county: "Kopparberg"},
{title: "Boden", county: "Norrbotten"},
{title: "Bollnäs", county: "Gävleborg"},
{title: "Borgholm", county: "Kalmar"},
{title: "Borlänge", county: "Dalarna"},
{title: "Borås", county: "Västra Götaland"},
{title: "Broo", county: "Värmland"},
{title: "Brätte", county: "Västra Götaland"},
{title: "Båstad", county: "Skåne"},
{title: "Djursholm", county: "Stockholm"},
{title: "Eksjö", county: "Jönköping"},
{title: "Elleholm", county: "Blekinge"},
{title: "Enköping", county: "Uppsala"},
{title: "Eskilstuna", county: "Södermanland"},
{title: "Eslöv", county: "Skåne"},
{title: "Fagersta", county: "Västmanland"},
{title: "Falkenberg", county: "Halland"},
{title: "Falköping", county: "Västra Götaland"},
{title: "Falsterbo", county: "Skåne"},
{title: "Falun", county: "Dalarna"},
{title: "Filipstad", county: "Värmland"},
{title: "Flen", county: "Södermanland"},
{title: "Gamla Lödöse", county: "Västra Götaland"},
{title: "Getakärr", county: "Halland"},
{title: "Gothenburg", county: "Västra Götaland"},
{title: "Gränna", county: "Jönköping"},
{title: "Gustavsberg", county: "Stockholm"},
{title: "Göteborg", county: "Västra Götaland"},
{title: "Gävle", county: "Gävleborg"},
{title: "Hagfors", county: "Värmland"},
{title: "Halmstad", county: "Halland"},
{title: "Haparanda", county: "Norrbotten"},
{title: "Hedemora", county: "Dalarna"},
{title: "Helsinborg", county: "Skåne"},
{title: "Hjo", county: "Västra Götaland"},
{title: "Hudiksvall", county: "Gävleborg"},
{title: "Huskvarna", county: "Jönköping"},
{title: "Härnösand", county: "Västernorrland"},
{title: "Hässelholm", county: "Skåne"},
{title: "Hästholmen", county: "Östergötland"},
{title: "Höganäs", county: "Skåne"},
{title: "Järle", county: "Örebro"},
{title: "Jönköping", county: "Jönköping"},
{title: "Kalmar", county: "Kalmar"},
{title: "Karl Johans stad", county: "Norrbotten"},
{title: "Karlshamn", county: "Blekinge"},
{title: "Karlskoga", county: "Örebro"},
{title: "Karlskrona", county: "Blekinge"},
{title: "Karlstad", county: "Värmland"},
{title: "Katrineholm", county: "Södermanland"},
{title: "Kiruna", county: "Norrbotten"},
{title: "KongaHälla", county: "Västra Götaland"},
{title: "Kramfors", county: "Västernorrland"},
{title: "Kristianopel", county: "Blekinge"},
{title: "Kristianstad", county: "Skåne"},
{title: "Kristinehamn", county: "Värmland"},
{title: "Kumla", county: "Örebro"},
{title: "Kungsbacka", county: "Halland"},
{title: "Kungälv", county: "Västra Götaland"},
{title: "Köping", county: "Västmanland"},
{title: "Landskrona", county: "Skåne"},
{title: "Lerum", county: "Västra Götaland"},
{title: "Ljungby", county: "Kronnoberg"},
{title: "Lidingö", county: "Stockholm"},
{title: "Lidköping", county: "Västra Götaland"},
{title: "Lindesberg", county: "Västmanland"},
{title: "Linköping", county: "Östergötland"},
{title: "Lomma", county: "Skåne"},
{title: "Ludvika", county: "Dalarna"},
{title: "Luleå", county: "Norrbotten"},
{title: "Lund", county: "Skåne"},
{title: "Luntertun", county: "Skåne"},
{title: "Lycksele", county: "Västerbotten"},
{title: "Lyckå", county: "Blekinge"},
{title: "Lysekil", county: "Västra Götaland"},
{title: "Lödöse", county: "Västra Götaland"},
{title: "Malmö", county: "Skåne"},
{title: "Mariefred", county: "Södermanland"},
{title: "Mariestad", county: "Västra Götaland"},
{title: "Marstrand", county: "Västra Götaland"},
{title: "Mjöby", county: "Östergötland"},
{title: "Motala", county: "Östergötland"},
{title: "Märsta", county: "Stockholm"},
{title: "Mölndal", county: "Mölndal"},
{title: "Mönsterås", county: "Kalmar"},
{title: "Norrköping", county: "Östergötland"},
{title: "Nyköping", county: "Södermanland"},
{title: "Nynäshamn", county: "Södermanland"},
{title: "Nässjö", county: "Jönköping"},
{title: "Oskarshamn", county: "Kalmar"},
{title: "Oxelösund", county: "Södermanland"},
{title: "Piteå", county: "Norrbotten"},
{title: "Ronneby", county: "Blekinge"},
{title: "Sala", county: "Västmanland"},
{title: "Sandviken", county: "Gävleborg"},
{title: "Skanör", county: "Skåne"},
{title: "Skanör med Falsterbo", county: "Skåne"},
{title: "Skara", county: "Västra Götaland"},
{title: "Skelleftteå", county: "Västerbotten"},
{title: "Skövde", county: "Västra Götaland"},
{title: "Skänninge", county: "Östergötland"},
{title: "Sigtuna", county: "Stockholm"},
{title: "Simrishamn", county: "Skåne"},
{title: "Sollefteå", county: "Västernorrland"},
{title: "Sollentuna", county: "Stockholm"},
{title: "Solna", county: "Stockholm"},
{title: "Stäcket", county: "Stockholm"},
{title: "Stockholm", county: "Stockholm"},
{title: "Strängnäs", county: "Södermanland"},
{title: "Strömstad", county: "Västra Götaland"},
{title: "Sundbyberg", county: "Stockholm"},
{title: "Sundsvall", county: "Västernorrland"},
{title: "Säffle", county: "Värmland"},
{title: "Säter", county: "Dalarna"},
{title: "Sävsjö", county: "Jönköping"},
{title: "Söderhamn", county: "Gävleborg"},
{title: "Söderköping", county: "Östergötland"},
{title: "Södertälje", county: "Stockholm"},
{title: "Sölvesborg", county: "Blekinge"},
{title: "Tidaholm", county: "Västra Götaland"},
{title: "Torget", county: "Kronnoberg"},
{title: "Torshälla", county: "Södermanland"},
{title: "Torslanda", county: "Västra Götaland"},
{title: "Tranås", county: "Jönköping"},
{title: "Trelleborg", county: "Skåne"},
{title: "Trollhättan", county: "Västra Götaland"},
{title: "Trosa", county: "Södermanland"},
{title: "Tumathorp", county: "Skåne"},
{title: "Tumba", county: "Stockholm"},
{title: "Uddevalla", county: "Västra Götaland"},
{title: "Ulricehamn", county: "Västra Götaland"},
{title: "Umeå", county: "Västerbotten"},
{title: "Upplands Väsby", county: "Stockholm"},
{title: "Uppsala", county: "Uppsala"},
{title: "Vadstena", county: "Östergötland"},
{title: "Vallentuna", county: "Stockholm"},
{title: "Varberg", county: "Halland"},
{title: "Vaxholm", county: "Stockholm"},
{title: "Vetlanda", county: "Jönköping"},
{title: "Vimmerby", county: "Kalmar"},
{title: "Visby", county: "Gotland"},
{title: "Vä", county: "Skåne"},
{title: "Vänersborg", county: "Västra Götaland"},
{title: "Värnämö", county: "Jönköping"},
{title: "Västervik", county: "Kalmar"},
{title: "Västerås", county: "Västmanland"},
{title: "Växjö", county: "Kronoberg"},
{title: "Ystad", county: "Skåne"},
{title: "Åhus", county: "Skåne"},
{title: "Åkersberga", county: "Stockholm"},
{title: "Åmål", county: "Älvsborg"},
{title: "Ängelholm", county: "Stockholm"},
{title: "Älvsborg", county: "Västra Götaland"},
{title: "Öjebyn", county: "Norrbotten"},
{title: "Örebro", county: "Örebro"},
{title: "Öregrund", county: "Stockholm"},
{title: "Örnsköldsvik", county: "Västernorrland"},
{title: "Östersund", county: "Jämtland"},
{title: "Östhammar", county: "Stockholm"}];


class OfferARide extends Component {
	constructor(props) {
			super(props);
			this.state = {
								    cityResultVisible: false,
										cityResult: [],
										term:"",
										toCityResultVisible: false,
										toCityResult: [],
										toTerm:"",
										selectedDay: "",
										datePickerVisible: false,
										dateArray: [],
										checked: false,
										roundSelectedDay: "",
										roundDateArray: [],
										roundDatePickerVisible: false,
                    content: "",
                    price: "",
                    chosenCity: "empty",
                    toChosenCity: "empty",
                    chosenCityError: false,
                    toChosenCityError: false,
                    dateError: false,
                    roundDateError: false,
                    priceError: false,
                    contentError: false
		  };
			this.searchHandler = this.searchHandler.bind(this);
			this.citySelect = this.citySelect.bind(this);
			this.toSearchHandler = this.toSearchHandler.bind(this);
			this.toCitySelect = this.toCitySelect.bind(this);
			this.showDatePicker = this.showDatePicker.bind(this);
			this.datePickerInputChange = this.datePickerInputChange.bind(this);
			this.roundShowDatePicker = this.roundShowDatePicker.bind(this);
			this.roundDatePickerInputChange = this.roundDatePickerInputChange.bind(this);
			this.handleCheck = this.handleCheck.bind(this);
      this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
      this.priceChange = this.priceChange.bind(this);
      this.handleSubmitOffer = this.handleSubmitOffer.bind(this);
	}//end of constructor


	componentDidMount(){
		this.props.actionClickTab("offeraride");
	}

  //Submits the Offfer to database
  handleSubmitOffer(event) {
    event.preventDefault();
    const {currentUser} = this.props.currentUser;

    const {loginStatus} = this.props.loginStatus;
    const { chosenCity, toChosenCity, dateArray, roundDateArray, price, content,
            cityResultVisible, toCityResultVisible, datePickerVisible, checked,
            roundDateError, roundDatePickerVisible } = this.state;
    if (loginStatus === false) {
        console.log("The user is not logged in");
    }
    if (chosenCity === "empty" || cityResultVisible === true){
        this.setState({chosenCityError: true});
    }
    if (toChosenCity === "empty" || toCityResultVisible === true){
        this.setState({toChosenCityError: true});
    }
    if (dateArray.length < 1 || datePickerVisible === true){
        this.setState({dateError: true});
    }
    if ((checked === true && roundDateArray.length < 1) || (checked === true && roundDatePickerVisible === true)){
        this.setState({roundDateError: true});
        //console.log("Round date error message: " + this.state.roundDateError);
    }
    if (price === ""){
        this.setState({priceError: true});
        //console.log("Price in submit: " + price);
    }
    if (content === ""){
        this.setState({contentError: true});
        //console.log("Price in submit: " + price);
    }
    if (loginStatus === true && chosenCity !== "empty" && toChosenCity !== "empty"
        && dateArray.length >= 1 && price !== "" && content !== "" && roundDateError === false){
      console.log("Offer form is submitted");



      const newOffer = {
						fromCity: chosenCity,
						toCity: toChosenCity,
						dateArray: dateArray,
						price: price,
						content: content,
						returntravelkey:"",
						ownerKey: currentUser.key,
						applicants:["empty"],
						key: "",
            passed: false
				}//end of obj
        //Checks if there is return travel
        if (checked === true && roundDateArray.length > 1) {
          const newReturn = {
                fromCity: toChosenCity,
                toCity: chosenCity,
                dateArray: roundDateArray,
                price: price,
                content: content,
                returntravelkey:"",
                ownerKey: currentUser.key,
                applicants:["empty"],
                key: "",
                passed: false
            }//end of obj
            var returnTravelKey = firebase.database().ref('travels/').push(newReturn).key;
       			firebase.database().ref('travels/' + returnTravelKey + '/key').set(returnTravelKey);
            newOffer.returntravelkey = returnTravelKey;
            //Adding travel into user object in the db
            var travelsRet = currentUser.offeredtravels;
            travelsRet.push(returnTravelKey);
            firebase.database().ref('users/' + currentUser.key + '/offeredtravels').set(travelsRet);
            //updating currentUser object in redux store
            currentUser.offeredtravels.push(returnTravelKey);
        }//end of if return

        //Adding travel add to database
        var travelKey = firebase.database().ref('travels/').push(newOffer).key;
        firebase.database().ref('travels/' + travelKey + '/key').set(travelKey);

        //Adding travel into user object in the db
        var travels = currentUser.offeredtravels;
        travels.push(travelKey);

        for (var i = 0; i < travels.length; i++) {
          console.log("Travels from user submit: " + travels[i]);
        }
        firebase.database().ref('users/' + currentUser.key + '/offeredtravels').set(travels);
        //updating currentUser object in redux store
        currentUser.offeredtravels.push(travelKey);

        //updating current user in the redux
  			this.props.actionUpdateCurrentUser(currentUser);

       //Clears the form
       this.setState({chosenCity: "empty"});
       this.setState({toChosenCity: "empty"});
       this.setState({term:""});
       this.setState({toTerm:""});
       this.setState({selectedDay: ""});
       this.setState({dateArray: []});
       this.setState({checked: false});
       this.setState({roundSelectedDay: ""});
       this.setState({roundDateArray: []});
       this.setState({content: ""});
       this.setState({price: ""});
       this.setState({roundDatePickerVisible: false});

    }//end of if


  }//end of function
  //price input
  priceChange(event) {
    this.setState({price: event.target.value});
    if(event.target.value !== ""){
        this.setState({priceError: false});
    }
  }
  //Content add from textarea
  handleChangeTextArea(event) {
    this.setState({content: event.target.value});
    if(event.target.value !== ""){
        this.setState({contentError: false});
    }
  }
	//Toggles the Round trip checkbox
		handleCheck() {
			var checked = this.state.checked;
			this.setState({checked: !checked});
      if (checked = true){
          this.setState({roundDateError: false});
      }

			//console.log("Checkbox status is: " + this.state.checked);
	  }
//Toggles date picker
	showDatePicker() {
		var datePickerVisibility = this.state.datePickerVisible;
    this.setState({ datePickerVisible: !datePickerVisibility });
  }
	roundShowDatePicker() {
		var datePickerVisibility = this.state.roundDatePickerVisible;
    this.setState({ roundDatePickerVisible: !datePickerVisibility });
  }
	datePickerInputChange() {
    this.setState({ datePickerVisible: true });
		this.setState({ selectedDay: "" });
		this.setState({ dateArray: [] });
    this.setState({ dateError: true });
  }
	roundDatePickerInputChange() {
    this.setState({ roundDatePickerVisible: true });
		this.setState({ roundSelectedDay: "" });
		this.setState({ roundDateArray: [] });
    if (this.state.checked === true){
      this.setState({ roundDateError: true });
    }

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

	 RoundOnDayClick = (e, day, month, year) => {
 			var date = year + "/" + month + "/" + day;
 			//console.log("The chosen date is: " + date);
 			this.setState({ roundSelectedDay: date });
 			this.setState({ roundDatePickerVisible: false })
 			var dateArray = [];
 			dateArray.push(year);
 			dateArray.push(month);
 			dateArray.push(day);
 			this.setState({ roundDateArray: dateArray });
      this.setState({ roundDateError: false });
 	 }
   //selects city from drop down list
	citySelect(city) {
			console.log("Selected city is: " + city.title);
			this.setState({ cityResult: [] });
			this.setState({ term: city.title });
			this.setState({ cityResultVisible: false });
      this.setState({ chosenCity: city });
      this.setState({ chosenCityError: false });
	}
  //selects city from drop down list
	toCitySelect(city) {
			console.log("Selected city is: " + city.title);
			this.setState({ toCityResult: [] });
			this.setState({ toTerm: city.title });
			this.setState({ toCityResultVisible: false });
      this.setState({ toChosenCity: city });
      this.setState({ toChosenCityError: false });
	}

searchHandler(event){
	var arrayBeg = [];
	var arrayEnd = [];
	this.setState({ term: event.target.value });
	if (event.target.value === "") {
			this.setState({ cityResult: [] });
			this.setState({ cityResultVisible: false });
      this.setState({ chosenCityError: true });
	} else {
				var term = event.target.value.toLowerCase();
				console.log("Lower case term: " + term);

			  for (var i = 0; i < cityArray.length; i++) {
					var city = cityArray[i].title.toLowerCase();
					//console.log("City in search handler" + city);
			  	if (city.includes(term)) {
							if (city.startsWith(term)) {
									arrayBeg.push(cityArray[i]);
							} else {
									arrayEnd.push(cityArray[i]);
							}
			  	}
			  }
				var array = arrayBeg.concat(arrayEnd);
				this.setState({ cityResult: array });
				this.setState({ cityResultVisible: true });
	}
}
toSearchHandler(event){
	var arrayBeg = [];
	var arrayEnd = [];
	this.setState({ toTerm: event.target.value });
	if (event.target.value === "") {
			this.setState({ toCityResult: [] });
			this.setState({ toCityResultVisible: false });
      this.setState({ toChosenCityError: true });
	} else {
				var term = event.target.value.toLowerCase();
				console.log("Lower case term: " + term);

			  for (var i = 0; i < cityArray.length; i++) {
					var city = cityArray[i].title.toLowerCase();
					//console.log("City in search handler" + city);
			  	if (city.includes(term)) {
							if (city.startsWith(term)) {
									arrayBeg.push(cityArray[i]);
							} else {
									arrayEnd.push(cityArray[i]);
							}
			  	}
			  }
				var array = arrayBeg.concat(arrayEnd);
				this.setState({ toCityResult: array });
				this.setState({ toCityResultVisible: true });
	}
}

	render() {
    const {loginStatus} = this.props.loginStatus;

		const { term, cityResult, cityResultVisible, toTerm, toCityResult,
			toCityResultVisible, selectedDay, datePickerVisible, checked,
		  roundSelectedDay, roundDatePickerVisible, } = this.state;
		//Generating search results
		/*
		const listItems = cityResult.map(city =>
             <div key={city.title}>
                        {city.title}
             </div>
      );*/

		return (
			<div className="innerWrap">
						<div className="OfferARideHero">
									 <p>Wanna offer a ride?</p>
									 <h2>A Good Choice</h2>
									 <p className="lastP">Make your next journey more enjoyable with others</p>
						</div>
						<div className="OfferARideContent">
								<h3>Offer A Ride</h3>
								<div className="line"></div>
								<div className="From">
										<div className="selects">
													<div className="selectDiv">
															<form className="form offer" onSubmit={this.handleSubmitOffer}>

																	<div className="formSection">
																		<label>From</label>
                                    <p className={(this.state.chosenCityError === true) ? "errorMsg" : "notVisible"}>* Please choose a start city</p>
																		<input type = "text" placeholder="Enter a city ..." onChange={this.searchHandler} value={term}/>
																		<div className={(cityResultVisible) ? "cityResultDiv" : "notVisible"}>
																		{
																			cityResult.map(city =>
																             <div className="city" key={city.title} onClick={() => this.citySelect(city)}>
																                        {city.title}
																             </div>
																      )
																		}
																		</div>
																	</div>

																	<div className="formSection">
																		<label>To</label>
                                    <p className={(this.state.toChosenCityError === true) ? "errorMsg" : "notVisible"}>* Please choose a destination city</p>
																		<input type = "text" placeholder="Enter a city ..." onChange={this.toSearchHandler} value={toTerm}/>
																		<div className={(toCityResultVisible) ? "cityResultDiv" : "notVisible"}>
																		{
																			toCityResult.map(city =>
																             <div className="city" key={city.title} onClick={() => this.toCitySelect(city)}>
																                        {city.title}
																             </div>
																      )
																		}
																		</div>
																	</div>

																	<div className="formSection">
																			<label>Date</label>
                                      <p className={(this.state.dateError === true) ? "errorMsg" : "notVisible"}>* Please choose a date</p>
																			<input type = "text" placeholder="Choose a date" onClick={this.showDatePicker} onChange={this.datePickerInputChange} value={selectedDay}/>
																			<div className={(datePickerVisible) ? "datePicker" : "notVisible"}>
																						<Calendar style={style} width="302px"
																						          onDayClick={(e, day, month, year)=> this.onDayClick(e, day, month, year)}
																						/>
																      </div>
																	</div>

																	<div className="formSection checkReturn">
																			<label>Round trip</label>
                                      <p className={(this.state.roundDateError === true) ? "errorMsg" : "notVisible"}>* Please choose a return date</p>
																			<input type="checkbox" onChange={this.handleCheck} checked={this.state.checked}/>
																	</div>

																	<div className={(checked === true) ? "formSection" : "notVisible"}>
																			<label>Return Date</label>
																			<input type = "text" placeholder="Choose a return date" onClick={this.roundShowDatePicker} onChange={this.roundDatePickerInputChange} value={roundSelectedDay}/>
																			<div className={(roundDatePickerVisible) ? "datePicker" : "notVisible"}>
                                            <Calendar style={style} width="302px"
                                                      onDayClick={(e, day, month, year) => this.RoundOnDayClick(e, day, month, year)}
                                            />
																      </div>
																	</div>

                                  <div className="formSection">
																			<label>Price</label>
                                      <p className={(this.state.priceError === true) ? "errorMsg" : "notVisible"}>* Please enter a fee</p>
																			<input type = "text" placeholder="Enter a price" onChange={this.priceChange} value={this.state.price}/>
																	</div>

                                  <div className="formSection">
																			<label>Description</label>
                                      <p className={(this.state.contentError === true) ? "errorMsg" : "notVisible"}>* Please enter a description about a trip</p>
                                      <textarea placeholder="Enter description here ..." rows="7" onChange={this.handleChangeTextArea} value={this.state.content}></textarea>
																	</div>

                                  <div className={(loginStatus === false) ? "formSection" : "notVisible"}>
          															<p className="loginError">* Please login to submit your add!</p>
          												</div>

                                  <div className="formSection">
                                      <input className="formButton" type="submit" value="Submit"/>
                                  </div>

															</form>
													</div>
										</div>
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
export default connect(mapStateToProps,{actionClickTab, actionUpdateCurrentUser})(OfferARide);


//
