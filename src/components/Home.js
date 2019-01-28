import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionClickTab} from '../actions/menuActions.js';
import './Home.css';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Car from '../img/car7.jpg';
//content of the slider
const content = [
	{
		title: 'Vulputate Mollis Ultricies Fermentum Parturient',
		description:
		'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
		image: require('../img/car8.jpg')
	},
	{
		title: 'Tortor Dapibus Commodo Aenean Quam',
		description:
		'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
		image: require('../img/car7.jpg')
	},
	{
		title: 'Phasellus volutpat metus',
		description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
		image: require('../img/car15.jpg')
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
										<h2>{article.title}</h2>
										<div>{article.description}</div>
										</div>)}
								</Slider>
						</div>
			</div>
		)
	}

} //end of component
const mapStateToProps = state => ({
});

export default connect(mapStateToProps,{actionClickTab})(Home);


//
