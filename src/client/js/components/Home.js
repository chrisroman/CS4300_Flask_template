// @flow
import React from 'react';
import Background from '../../public/images/Stock_Market_Background5.png';
import css from '../../public/css/home.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button } from 'reactstrap';
import { InputGroup, Input } from 'reactstrap';


class Home extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			names: "Peter Mocarski (pmm248), Christopher Roman (cr469), Mushaffar Khan (mk2248), Mubeen Sheeraz (ms2689), Ben Zelditch (bz87)",
			project_name: "Company Search",
			dropdownIsOpen: false,
			categories: {},
			user_keywords: ""
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	toggleDropdown = () => {
		this.setState({
			dropdownIsOpen: !this.state.dropdownIsOpen
		});
	}

	addCategory = (event) => {
		let new_categories = this.state.categories
		new_categories[event.target.innerHTML] = true
		this.setState({
			categories: new_categories
		})
	}

	removeCategory = (event) => {
		let new_categories = this.state.categories
		const category = event.target.name
		delete new_categories[category]
		this.setState({
			categories: new_categories
		})
	}

	performQuery = () => {
		fetch('http://localhost:5000/query', {
			headers: {
				'Content-Type': 'application/json',
				'Accepts': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({
				user_keywords: this.state.user_keywords,
				categories: this.state.categories,
			})
		})
			.then((response) => {
				return response.json()
			})
			.then((body) => {
				console.log(body)
			})
	}

  render () {
		return (
			<div>

				<form className="global-search">
					<h1>CompanySearch</h1>
					<div>
						<Input placeholder="Enter your keywords here"
							onChange={this.handleChange}
							className="form-control"
							name="user_keywords" />
					</div>

					<div className="global-search">
						<Dropdown isOpen={this.state.dropdownIsOpen} toggle={this.toggleDropdown}>
							<DropdownToggle caret>
								Add Company Categories
							</DropdownToggle>
							<DropdownMenu
								modifiers={{
									setMaxHeight: {
										enabled: true,
										order: 890,
										fn: (data) => {
											return {
												...data,
												styles: {
													...data.styles,
													overflow: 'auto',
													maxHeight: 100,
												},
											};
										},
									},
								}}
							>
								<DropdownItem onClick={this.addCategory}>Consumer Discretionary</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Consumer Staples</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Energy</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Financials</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Health Care</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Industrials</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Information Technology</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Materials</DropdownItem>
								<DropdownItem onClick={this.addCategory}>REIT</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Telecom Services</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Utilities Services</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Large-Cap</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Mid-Cap</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Small-Cap</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Values</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Growth</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Socially Conscious</DropdownItem>
							</DropdownMenu>
						</Dropdown>

						<div className="category-list">
							<Nav card={true} justified={true}>
							{Object.keys(this.state.categories).map((category) => {
								return (
									<NavItem key={category}>
										<Button type="button" color="success" size="sm" name={category} onClick={this.removeCategory}>
											{category + '  '}
											<i className="fa fa-times"></i>
										</Button>
									</NavItem>
								)
							})}
							</Nav>

						<Button type="button" className="btn btn-info" onClick={this.performQuery}> Go! </Button>
						</div>
					</div>
				</form>

				<div className="bottomcorner">
					<p>Project Name: {this.state.project_name}</p>
					<p>Student Names: {this.state.names}</p>
				</div>

			</div>
		);
  }
}

export default Home;
