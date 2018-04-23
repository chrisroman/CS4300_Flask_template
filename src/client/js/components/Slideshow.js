import React from 'react';
import '../../public/css/styles.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button } from 'reactstrap';
import { InputGroup, Input } from 'reactstrap';
import axios from 'axios'

class Slideshow extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

  render () {
		return (
			<div className="Slideshow">

			<h1>CSS Slider</h1>
			<h2>Pure CSS Slider. No JS. Because it is possieble!</h2>
			<div className="csslider infinity" id="slider1">
				<input type="radio" name="slides" id="slides_1" defaultChecked/>
				<input type="radio" name="slides" id="slides_2"/>
				<input type="radio" name="slides" id="slides_3"/>
				<input type="radio" name="slides" id="slides_4"/>
				<input type="radio" name="slides" id="slides_5"/>
				<input type="radio" name="slides" id="slides_6"/>
				<ul>
					<li>
						<h1>Say hello to CSS3</h1>
						<p>CSSlider is lightweight & easy to use slider. No JS - pure CSS.</p>
					</li>
					<li><img src="https://rawgithub.com/drygiel/csslider/master/examples/themes/stones.jpg"/>
					</li>
					<li>
						<div id="bg">
							<div>
								<h1>CSS Events</h1>
								<p>When slide 3 is reached - play CSS animation!</p>
							</div>
						</div>
					</li>
					<li className="scrollable">
						<h1>Lots of text</h1>
						<h2>Scrollable one</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit fusce vel sapien elit in malesuada mi,
							semper id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus.
							Lorem ipsum dolor sit amet, consectetur adipiscing elit fusce vel sapien elit in malesuada mi,
							semper id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus.
							Lorem ipsum dolor sit amet, consectetur adipiscing elit fusce vel sapien elit in malesuada mi,
							semper id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus.
							Lorem ipsum dolor sit amet, consectetur adipiscing elit fusce vel sapien elit in malesuada mi,
							semper id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus.
							Lorem ipsum dolor sit amet, consectetur adipiscing elit fusce vel sapien elit in malesuada mi,
							semper id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus.
							Lorem ipsum dolor sit amet, consectetur adipiscing elit fusce vel sapien elit in malesuada mi,
							semper id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus.
						</p>
					</li>
					<li>
						<div id="center"> <a className="nice-link" href="https://github.com/drygiel/csslider" data-text="More examples on github" target="_blank">More examples on github</a></div>
					</li>
					<li>
						<div id="center"><a className="play" id="dex-sign" href="http://drygiel.com" target="_blank"></a></div>
					</li>
				</ul>
				<div className="arrows">
					<label htmlFor="slides_1"></label>
					<label htmlFor="slides_2"></label>
					<label htmlFor="slides_3"></label>
					<label htmlFor="slides_4"></label>
					<label htmlFor="slides_5"></label>
					<label htmlFor="slides_6"></label>
					<label className="goto-first" htmlFor="slides_1"></label>
					<label className="goto-last" htmlFor="slides_6"></label>
				</div>
				<div className="navigation"> 
					<div>
						<label htmlFor="slides_1"></label>
						<label htmlFor="slides_2"></label>
						<label htmlFor="slides_3"></label>
						<label htmlFor="slides_4"></label>
						<label htmlFor="slides_5"></label>
						<label htmlFor="slides_6"></label>
					</div>
				</div>
			</div><a href="https://github.com/drygiel" target="_blank"></a>
		</div>
		);
	}
}

export default Slideshow;
