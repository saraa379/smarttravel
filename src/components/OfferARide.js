/*
		Offer a ride page
		Here user applies to offer a ride
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import './OfferARide.css';
import { Search } from 'semantic-ui-react';

const cityArray = [];

class OfferARide extends Component {
	constructor(props) {
			super(props);
			this.state = {
										selectBoxValueStartCounty: "Stockholm",
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
										cities: [],
										isLoading: false,
										results: []
		  };
			this.handleChangeStartCounty = this.handleChangeStartCounty.bind(this);
			//this.fetchRate = this.fetchRate.bind(this);
	}//end of constructor
	componentDidMount(){
		this.props.actionClickTab("offeraride");
	}

	handleChangeStartCounty(event) {
    this.setState({selectBoxValueStartCounty: event.target.value});
  }
	render() {
		const {loginStatus} = this.props.loginStatus;
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
															<p>County</p>
															<select value={this.state.selectBoxValue} onChange={this.handleChangeStartCounty}>
																				<option value="Stockholm">Stockholm</option>
																				<option value="Västerbotten">Västerbotten</option>
																				<option value="Norrbotten">Norrbotten</option>
																				<option value="Uppsala">Uppsala</option>
																				<option value="Södermanland">Södermanland</option>
																				<option value="Östergötland">Östergötland</option>
																				<option value="Jonköping">Jonköping</option>
																				<option value="Kronoberg">Kronoberg</option>
																				<option value="Kalmar">Kalmar</option>
																				<option value="Gotland">Gotland</option>
																				<option value="Blekinge">Blekinge</option>
																				<option value="Skåne">Skåne</option>
																				<option value="Halland">Halland</option>
																				<option value="Västra Götaland">Västra Götaland</option>
																				<option value="Varmland">Varmland</option>
																				<option value="Örebro">Örebro</option>
																				<option value="Västmanland">Västmanland</option>
																				<option value="Dalarna">Dalarna</option>
																				<option value="Gävleborg">Gävleborg</option>
																				<option value="Västernorrland">Västernorrland</option>
																				<option value="Jämtland">Jämtland</option>
															</select>
													</div>
													<div className="selectDiv">
															<p>City</p>
															<select value={this.state.selectBoxValue} onChange={this.handleChangeStartCounty}>
																				<option value="Stockholm">Stockholm</option>
																				<option value="Västerbotten">Västerbotten</option>
																				<option value="Norrbotten">Norrbotten</option>
																				<option value="Uppsala">Uppsala</option>
																				<option value="Södermanland">Södermanland</option>
																				<option value="Östergötland">Östergötland</option>
																				<option value="Jonköping">Jonköping</option>
																				<option value="Kronoberg">Kronoberg</option>
																				<option value="Kalmar">Kalmar</option>
																				<option value="Gotland">Gotland</option>
																				<option value="Blekinge">Blekinge</option>
																				<option value="Skåne">Skåne</option>
																				<option value="Halland">Halland</option>
																				<option value="Västra Götaland">Västra Götaland</option>
																				<option value="Varmland">Varmland</option>
																				<option value="Örebro">Örebro</option>
																				<option value="Västmanland">Västmanland</option>
																				<option value="Dalarna">Dalarna</option>
																				<option value="Gävleborg">Gävleborg</option>
																				<option value="Västernorrland">Västernorrland</option>
																				<option value="Jämtland">Jämtland</option>
															</select>
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
