/*
		The component is a placeholder page for the links that doesn't have a page.
		This page comes when user types wrong url.
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import './TravelEdit.css';

class TravelEdit extends Component {
	constructor(props) {
			super(props);
			this.state = {
										user: "",
										inputFromCity: ""
			};
			this.handleChangeFromCity = this.handleChangeFromCity.bind(this);
			//this.onStarClick = this.onStarClick.bind(this);
	}//end of constructor
	componentDidMount(){
			var travel = this.props.travel;
			console.log("Travel recieved in Edit: " + travel.key);
	}
	handleChangeFromCity(event){
			this.setState({inputFromCity: event.target.value});
	}
	render() {
		const {  } = this.state;
		var fromCity = "Depart city"

		return (
			<div className="TravelEditWrap InnerWrapProfile">
						<div className="InputWrapTravel">
									<label>Departure city</label>
									<input type = "text" placeholder={fromCity} onChange={this.handleChangeFromCity} value={this.state.inputFromCity}/>
						</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({

});
export default connect(mapStateToProps,{})(TravelEdit);
