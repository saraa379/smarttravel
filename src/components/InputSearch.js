/*
		Placeholder component for How It Works page
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateDepartureCityErrorMsgAction} from '../actions/updateDepartureCityErrorMsgAction.js';
import './InputSearch.css';

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

class InputSearch extends Component {
	constructor(props) {
			super(props);
			this.state = {
								    cityResultVisible: false,
										cityResult: [],
										term:""
                    //chosenCity: "empty"
		  };
			this.searchHandler = this.searchHandler.bind(this);
			this.citySelect = this.citySelect.bind(this);
	}//end of constructor

	//selects city from drop down list
 citySelect(city) {
		 //console.log("Selected city is: " + city.title);
		 this.setState({ cityResult: [] });
		 this.setState({ term: city.title });
		 this.setState({ cityResultVisible: false });
		 //this.setState({ chosenCity: city })
		 this.props.callbackGetDepartCity(city);
		 //this.setState({ chosenCityError: false });
		 //this.props.updateDepartureCityErrorMsgAction(false);
 }

 searchHandler(event){
 	var arrayBeg = [];
 	var arrayEnd = [];
 	this.setState({ term: event.target.value });
 	if (event.target.value === "") {
 			this.setState({ cityResult: [] });
 			this.setState({ cityResultVisible: false });
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

	render() {
		const { term, cityResult, cityResultVisible } = this.state;
		const {departureCityErrorMsg} = this.props.departureCityErrorMsg;
		const pText = this.props.pText;
		console.log("Place holder text : " + pText);

		return (
			<div className="InputSearchWrap">
					<div className="InputDiv">
							<img src={require('../img/location.jpg')}/>
							<input type = "text" placeholder={pText} onChange={this.searchHandler} value={term}/>
					</div>
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
		)
	}

} //end of component

const mapStateToProps = state => ({
		departureCityErrorMsg: state.departureCityErrorMsg
});
export default connect(mapStateToProps,{updateDepartureCityErrorMsgAction})(InputSearch);


//
