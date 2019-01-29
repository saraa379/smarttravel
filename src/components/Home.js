import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import './Home.css';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
//content of the slider
const content = [
	{
		title: 'Share your travel with others',
		description:
		'Smart Travel connects passengers with drivers. Save your travel cost and environment through ride sharing.',
		image: require('../img/car18.jpg')
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
	componentDidMount(){
		this.props.actionClickTab("home");
	}
	render() {

		return (
			<div className="innerWrap">
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
								</div>
						</div>
			</div>
		)
	}

} //end of component
const mapStateToProps = state => ({
});

export default connect(mapStateToProps,{actionClickTab})(Home);


//
