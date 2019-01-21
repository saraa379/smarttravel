/*
		Offer a ride page
		Here user applies to offer a ride
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import './OfferARide.css';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

const cityArray = [];

class OfferARide extends Component {
	constructor(props) {
			super(props);
			this.state = {
										kommunStockholm: [
											                 "Botkyrka",
																			 "Danderyd",
																			 "Ekerö",
																			 "Hanninge",
																			 "Hyddinge",
																			 "Järfälla",
																			 "Lidingö",
																			 "Nacka",
																			 "Norrtälje",
																			 "Nykvarn",
																			 "Nynäshamn",
																			 "Salem",
																			 "Sigtuna",
																			 "Sollentuna",
																			 "Solna",
																			 "Stockholm",
																			 "Sundyberg",
																			 "Södertälje",
																			 "Tyresö",
																			 "Täby",
																			 "Upplands-Bro",
																			 "Upplands Väsby",
																			 "Vallentuna",
																			 "Vaxholm",
																			 "Värmdö",
																			 "Österåker"
									                   ],
								    value: "",
										cities: [
															{title: "Alingsås", county: "Västra Götaland"},
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
															{title: "Östhammar", county: "Stockholm"}
										],
										isLoading: false,
										results: []
		  };
			this.resetSearch = this.resetSearch.bind(this);
			this.handleSearchChange = this.handleSearchChange.bind(this);
	}//end of constructor

	componentWillMount() {
		 this.resetSearch();
	 }
	componentDidMount(){
		this.props.actionClickTab("offeraride");
	}

	handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });


  }

	resetSearch() {
    this.setState({ isLoading: false, results: [], value: '' })
  }

	handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) {
        this.resetSearch()
      }
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.cities, isMatch),
      })
    }, 300)
  }

	render() {
		const {loginStatus} = this.props.loginStatus;
		const { isLoading, value, results } = this.state;
		//console.log("Login status inside OfferARide: " + loginStatus);
		//var fromCounty = this.state.selectBoxValueStartCounty;
		//console.log("Selected county name is: " + fromCounty);

		return (
			<div className="innerWrap">
						<div className="OfferARideHero">
									 <p>Wanna offer a ride?</p>
									 <h2>A Good Choice</h2>
									 <p className="lastP">Make your next journey more enjoyable with others</p>
						</div>
						<div className="OfferARideContent">
								<h3>From where</h3>
								<div className="line"></div>
								<div className="From">

										<div className="selects">
													<div className="selectDiv">
															<p>City</p>
															<Search
											            loading={isLoading}
											            onResultSelect={this.handleResultSelect}
											            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
											            results={results}
											            value={value}
										          />
													</div>
													<div className="selectDiv">
															<p>City</p>

													</div>
										</div>
								</div>
						</div>
			</div>
		)
	}

} //end of component

const mapStateToProps = state => ({
		loginStatus: state.loginStatus
});
export default connect(mapStateToProps,{actionClickTab})(OfferARide);


//
