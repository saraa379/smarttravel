import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import './Home.css';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import InputSearch from './InputSearch.js';
import TravelCard from './TravelCard.js';
import firebase from '../firebase/firebase.js';
//content of the slider
const content = [
	{
		title: 'Share your travel with others',
		description:
		'Smart Travel connects passengers with drivers. Save your travel cost and environment through ride sharing.',
		image: require('../img/car1.jpg')
	},
	{
		title: 'Travelling is not as expensive as you think',
		description:
		'If you like travelling, lack of money is not an excuse. With ride-sharing, I became able to travel more often and made a lot of friends who love to travel. - Irine från Örebro',
		image: require('../img/car19.jpg')
	},
	{
		title: 'Shared joy is double joy',
		description:
		'Glad that found out Smart Travel. Had great adventure with amazing people. Highly reccomend it to other travellers. Jenny och Martin från Småland.',
		image: require('../img/car4.jpg')
	}
];


class Home extends Component {
	constructor(props) {
			super(props);
			this.state = {
								    departureCity: "",
										destinationCity: "",
										departureCityError: false,
										destinationCityError: false,
										resultTitle: "Available travels",
										travels: [],
										currentPage: 1,
										itemsPerPage: 5,
										noMatchMsg: false
		  };
			this.getDepartureCity = this.getDepartureCity.bind(this);
			this.getDestinationCity = this.getDestinationCity.bind(this);
			this.pageNrClick = this.pageNrClick.bind(this);
			this.fbCallback = this.fbCallback.bind(this);
			this.searchHandler = this.searchHandler.bind(this);
	}//end of constructor

	componentWillMount(){
		firebase.database().ref('travels/').on('value', this.fbCallback);
	}
	fbCallback = function(snapshot) {
		var that = this;
		var dataArray = [];
		snapshot.forEach( child => {

			var travelTemp = child.val();
			dataArray.push(travelTemp);
			//console.log("Pushing travel object into array: " + travelTemp.key);
		})//end of foreach
		that.setState({
				travels: dataArray
		});
	}

	componentDidMount(){
		this.props.actionClickTab("home");
	}
//click event on search button
	searchHandler(event){
		this.setState({ departureCityError: false });
		this.setState({ destinationCityError: false });
		this.setState({ noMatchMsg: false });
		//console.log("Search button is clicked");
		const { departureCity, destinationCity, travels } = this.state;
		if (departureCity === "") {
				this.setState({ departureCityError: true });
		}
		if (destinationCity === "") {
				this.setState({ destinationCityError: true });
		}
		//search functionality
		//var tempArray = [];
		var departCityMatchArray = []; //here matches departure cities
		var destCityMatchArray = []; //here matches both departure and dest cities
		var destCountyMatchArray = []; //here matches both departure city and dest county
		if (departureCity !== "" && destinationCity !== ""){
				var departCity = departureCity.title.toLowerCase();
				var destCity = destinationCity.title.toLowerCase();
				var destCounty = destinationCity.county.toLowerCase();
				//console.log("Both cities are chosen: " + departCity);
				//console.log("Both cities are chosen: " + destCity);
				//search departure city match
				for (var i = 0; i < travels.length; i++) {
					var city = travels[i].fromCity.title.toLowerCase();
					//console.log("Matching departure cities: " + travels[i].fromCity.title);
					if (city === departCity) {
							departCityMatchArray.push(travels[i]);
							//console.log("Matching departure cities: " + travels[i].fromCity.title);
					}
				}//end of for

				if (departCityMatchArray.length > 0) {
					//search destination city match

							for (var it = 0; it < departCityMatchArray.length; it++) {
									//console.log("Matching departure cities: " + departCityMatchArray[i].fromCity.title);
									var tempDestCity = departCityMatchArray[it].toCity.title.toLowerCase();
									if (destCity === tempDestCity) {
											destCityMatchArray.push(departCityMatchArray[it]);
											//console.log("Exact match travels: " + departCityMatchArray[i].fromCity.title + ', ' + departCityMatchArray[i].toCity.title);
									}
							}//end of for

							//renders the result for exact match
								if (destCityMatchArray.length > 0) {
										this.setState({ travels: destCityMatchArray });
								} else {
										//checks if there is match in destiny counties
											for (var j = 0; j < departCityMatchArray.length; j++) {
													//console.log("Matching departure cities: " + departCityMatchArray[i].fromCity.title);
													var tempDestCounty = departCityMatchArray[j].toCity.county.toLowerCase();
													if (destCounty === tempDestCounty) {
															destCountyMatchArray.push(departCityMatchArray[j]);
															//console.log("Exact match travels: " + departCityMatchArray[i].fromCity.title + ', ' + departCityMatchArray[i].toCity.title);
													}
											}//end of for

											if (destCountyMatchArray.length > 0) {
													this.setState({ noMatchMsg: true });
													this.setState({ travels: destCountyMatchArray });
											} else {
													this.setState({ noMatchMsg: true });
											}

								}

				} else {
						this.setState({ noMatchMsg: true });
				}

		}

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
	//Click event on page number Link
	pageNrClick(event) {
		this.setState({
				 currentPage: Number(event.target.id)
			 });
  }
	componentWillUnmount() {
		firebase.database().ref('travels/').off('value', this.fbCallback);
	}

	render() {
		const { currentPage, itemsPerPage, travels } = this.state;
		/*
		console.log("Home page render: " + travels.length);
		for (var i = 0; i < travels.length; i++) {
			 console.log("Travels in render: " + travels[i].content);
		}*/


		//Pagination
    const lastPageNr = currentPage * itemsPerPage;
    const firstPageNr = lastPageNr - itemsPerPage;
    const currentItems = travels.slice(firstPageNr, lastPageNr);

		const renderTravels = currentItems.map((travel, index) => {
          return <TravelCard key={index}
										         travel={travel}
					       ></TravelCard>;
        });
		// Logic for displaying page numbers
	  const pageNumbers = [];
	  for (let i = 1; i <= Math.ceil(travels.length / itemsPerPage); i++) {
				 pageNumbers.push(i);
	  }
	  const renderPageNumbers = pageNumbers.map(number => {
				if(currentPage === number){
					return (
											<div
												className="PageNr ChosenNr"
												key={number}
												id={number}
												onClick={this.pageNrClick}
											>
												{number}
											</div>
										);
				} else {
	      return (
				            <div
											className="PageNr"
				              key={number}
				              id={number}
				              onClick={this.pageNrClick}
				            >
				              {number}
				            </div>
				          );
				}
		});
		const nrOfTravels = "Total result: " + travels.length;


		return (
			<div className="innerWrap white">
						<div className="HomeHero">
								<Slider autoplay={6000}>
								  	{content.map((article, index) => <div key={index}
										style={{ background:  'url(' + article.image + ') no-repeat center center', backgroundSize: 'cover' }}>
														<h2 className="HeroTitle">{article.title}</h2>
														<div className="HeroContent">{article.description}</div>
										</div>)}
								</Slider>
						</div>

						<div className="SearchSection">
								<h2>Where do you want to travel?</h2>
								<div className="SearchInputs">
											<div className="InputWrap">
														<InputSearch pText={"From"}
														             callbackGetDepartCity={this.getDepartureCity}>
													  </InputSearch>
														<p className={(this.state.departureCityError === true) ? "errorSearch" : "Invincible"}>* Please choose a departure city</p>
											</div>
											<div className="InputWrap">
														<InputSearch pText={"To"}
														             callbackGetDepartCity={this.getDestinationCity}>
													  </InputSearch>
														<p className={(this.state.destinationCityError === true) ? "errorSearch" : "Invincible"}>* Please choose a destination city</p>
											</div>
											<div className="findBtn" onClick={this.searchHandler}>
														<i className="fas fa-search"></i>
														<p>Find</p>
											</div>
								</div>
						</div>

						<div className="TravelsSection">
								<div className="travelsInner">
										<h4 className={(this.state.noMatchMsg === true) ? "NoMatchMsg" : "Invincible"}>No exact match found</h4>
										<div className="travelResultTitle">
												<h2>{this.state.resultTitle}</h2>
												<p>{nrOfTravels}</p>
										</div>

										<div className="travelResultContent">
												{renderTravels}
										</div>
										<div className="PageNrWrap">
				              	{renderPageNumbers}
				            </div>
								</div>
						</div>
			</div>
		)
	}

} //end of component
const mapStateToProps = state => ({
		users: state.users
});

export default connect(mapStateToProps,{actionClickTab})(Home);


//
