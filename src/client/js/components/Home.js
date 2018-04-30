// @flow
import React from 'react';
//import css from '../../public/css/home.css'
import '../../public/css/normalize.css'
import '../../public/css/skeleton.css'
import '../../public/css/styles.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button } from 'reactstrap';
import { InputGroup, Input } from 'reactstrap';
import axios from 'axios'
import Slideshow from './Slideshow'

class Home extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			names: "Peter Mocarski (pmm248), Christopher Roman (cr469), Mushaffar Khan (mk2248), Mubeen Sheeraz (ms2689), Ben Zelditch (bz87)",
			project_name: "Company Search",
			dropdownIsOpen: false,
			categories: {},
			user_keywords: "",
			loading_results: false,
			data: {"final_ranking": []},
			visuals: [],
		}
	}

	componentDidMount = () => {
		const data = {
			"data": {
				"company_sentiments": {
					"RHP": [
						-19,
						"Twitter sentiment analysis shows that there is a substantial number of negative tweets surrounding Ryman Hospitality Properties Inc.  This may signal a controversial public presence, which should be taken into account when performing future research.An example of a negative tweet is shown below:\n\nEPS for Ryman Hospitality Properties, Inc. (RHP) Expected At $1.18; Scientific Games (SGMS) Sellers Increased By 5.49% Their Shor..."
					],
					"SEIC": [
						5,
						"Twitter sentiment analysis shows that tweets surrounding SEI Investments Co are largely positive. This may signal a company with a strong public presence and good public relations, which should be taken into account when performing future research.An example of a positive tweet is shown below: \n \nSei Investments Co (SEIC) Market Valuation Rose While Goodnow Investment Group LLC Lowered Its Position by $3.81 Milli..."
					],
					"TOWN": [
						4,
						"Twitter sentiment analysis shows that tweets surrounding Towne Bank are largely positive. This may signal a company with a strong public presence and good public relations, which should be taken into account when performing future research.An example of a positive tweet is shown below: \n \nJoin the U.S. Bank team! See our latest #job opening here: https://t.co/BfRMnWhEHE #branchbanking #Madison, WI #Hiring #CareerArc"
					]
				},
				"cosine_results": [
					"YRCW",
					"VVI",
					"KAI",
					"EBF",
					"BW",
					"BRSS",
					"IIIN",
					"LABL",
					"BMCH",
					"PLUG"
				],
				"final_ranking": [
					"SEIC",
					"TOWN",
					"RHP",
					"BAC",
					"DLX",
					"CLDT",
					"OLP",
					"PRU",
					"DX",
					"FIS"
				],
				"jaccard_results": {
					"BEN": [
						0.0136986301369863,
						"BEN",
						"Franklin Resources Inc",
						"Franklin Resources, Inc. is a holding company, which engages in the provision of financial and investment management services. It offers fund administration, sales, distribution, marketing, shareholder servicing, trustee, custody, and fiduciary services. The firm offers its products and services under the brands Franklin, Templeton, Franklin Mutual Series, Bissett, Fiduciary Trust, Darby, Balanced Equity Management, K2, and LibertyShares. The company was founded by Rupert H. Johnson, Sr. in 1947 and is headquartered in San Mateo, CA."
					],
					"HONE": [
						0.015873015873015872,
						"HONE",
						"HarborOne Bancorp Inc",
						"HarborOne Bancorp, Inc. is a financial holding company, which engages in the business of owning the common stock of HarborOne Bank. It operates through the HarborOne Bank and Merrimack Mortgage segments. The HarborOne Bank segment provides consumer and business banking products and services to customers. The Merrimack Mortgage segment consists of originating residential mortgage loans for sale in the secondary market. The company was founded in 2016 and is headquartered in Brockton, MA."
					],
					"IBTX": [
						0.015151515151515152,
						"IBTX",
						"Independent Bank Group Inc",
						"Independent Bank Group, Inc. operates as a bank holding company. It provides a wide range of relationship-driven commercial banking products and services tailored to meet the needs of businesses, professionals,  and individual through its subsidiary, Independent Bank. Its services include checking, savings, commercial loans, business services, and cash management. The company was founded on September 20, 2002 and is headquartered in McKinney, TX."
					],
					"LSI": [
						0.014084507042253521,
						"LSI",
						"Life Storage Inc",
						"Life Storage, Inc. is a real estate investment trust, which engages in the acquisition, ownership, and management of self storage properties. It also offers truck rental, office and rental space, and vehicle storage. It operates under the trade name Uncle Bob's Self Storage. The company was founded by Robert J. Attea, David L. Rogers, Kenneth F. Myszka, and Charles E. Lannon in 1982 and is headquartered in Buffalo, NY."
					],
					"MAA": [
						0.017241379310344827,
						"MAA",
						"Mid-America Apartment Communities Inc",
						"Mid-America Apartment Communities, Inc. is a real estate investment trust, which owns and manages apartments in the Sunbelt region of the United States. It operates through the following segments: Large Market Same Store Communities, Secondary Market Same Store Communities and Non Same Store Communities & Other. The company was founded in 1994 and is headquartered in Memphis, TN."
					],
					"MAC": [
						0.0136986301369863,
						"MAC",
						"Macerich Co",
						"Macerich Co. operates as a real estate investment trust, which engages in the acquisition, ownership, development, redevelopment, management and leasing of regional and community shopping centers located throughout the United States. It conducts all of its operations through the operating partnership and the management companies. The company was founded by Mace Siegel, Dana K. Anderson, Arthur M. Coppola and Edward C. Coppola in 1964 and is headquartered in Santa Monica, CA."
					],
					"SNH": [
						0.01,
						"SNH",
						"Senior Housing Properties Trust",
						"Senior Housing Properties Trust is a real estate investment trust, which invests in independent living communities It operates its business through the following segments: Triple net senior living communities, Managed senior living communities, MOBs and All Others. The Triple net senior living communities segment provide short term and long term residential care and other services for residents. The Managed senior living communities segment provide short term and long term residential care and other services for residents. The MOBs are office or commercial buildings constructed for use or operated as medical office space for physicians and other healthcare personnel, and other businesses in medical related fields, including clinics and laboratory uses. The Other segment includes the remainder of its operations, including certain properties that offer fitness, wellness and spa services to members. The company was founded on December 16, 1998 and is headquartered in Newton, MA."
					],
					"TRTX": [
						0.018867924528301886,
						"TRTX",
						"TPG RE Finance Trust Inc",
						"TPG RE Finance Trust, Inc. is a commercial real estate finance company. The company acquires a portfolio of commercial real estate related assets. It also originates, acquires, and manages commercial mortgage loans and other commercial real estate-related. The company was founded on October 24, 2014 and is headquartered in New York, NY."
					],
					"VLY": [
						0.018691588785046728,
						"VLY",
						"Valley National Bancorp",
						"Valley National Bancorp is a bank holding company, which engages in the provision of retail and commercial banking services. It operates through the following segments: Consumer Lending; Commercial Lending; Investment Management; and Corporate and other adjustments. The Consumer Lending segment consists of residential mortgage loans, automobile loans and home equity loans, as well as wealth management services including trust, asset management, insurance services, and asset-based lending support. The Commercial Lending segment refers to the floating rate and adjustable rate commercial and industrial loans as well as fixed rate owner occupied and commercial real estate loans. The Investment Management segment is the investments in various types of securities and interest-bearing deposits with other banks which focus on fixed rate securities, federal funds sold and interest-bearing deposits with banks. The Corporate and Other Adjustments segment relates to income and expense items not directly attributable to a specific segment. The company was founded in 1983 and is headquartered in Wayne, NJ."
					],
					"VRTS": [
						0.01639344262295082,
						"VRTS",
						"Virtus Investment Partners Inc",
						"Virtus Investment Partners, Inc. is an asset management company which provides investment management and related services to individuals and institutions. It offers financial solutions and products such as mutual funds, managed accounts, institutional, closed-end funds, Virtus variable insurance trust funds, and other portfolio. The company was founded on November 1, 1995, and is headquartered in Hartford, CT."
					]
				}
			},
			"status": 200,
			"statusText": "OK",
			"headers": {
				"date": "Mon, 23 Apr 2018 16:58:13 GMT",
				"server": "Werkzeug/0.12.2 Python/2.7.14",
				"connection": "keep-alive",
				"x-powered-by": "Express",
				"content-length": "8436",
				"content-type": "application/json"
			},
			"config": {
				"transformRequest": {},
				"transformResponse": {},
				"timeout": 0,
				"xsrfCookieName": "XSRF-TOKEN",
				"xsrfHeaderName": "X-XSRF-TOKEN",
				"maxContentLength": -1,
				"headers": {
					"Accept": "application/json, text/plain, */*",
					"Content-Type": "application/json;charset=utf-8"
				},
				"method": "post",
				"url": "/query",
				"data": "{\"user_keywords\":\"bank\",\"categories\":{\"Industrials\":true}}"
			},
			"request": {}
		}

		const DEBUGGING = false

		if (DEBUGGING)
			this.visualizeResults(data)
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
		this.setState({loading_results: true})
		axios.post('/query', {
			user_keywords: this.state.user_keywords,
			categories: this.state.categories,
		})
			.then((response) => {
				console.log(response)
				this.setState({loading_results: false})
				this.visualizeResults(response)
			})
	}

	visualizeResults = (response) => {
		this.setState({visuals: []})
		this.setState({data: response.data})
		const data = response.data
		const sentiments_view = (
			<ul key="PLACEHOLDER" className="ul-results"> {
				data.final_ranking.map(x => {
					const ticker = x[0]
					const matching_terms = x[1]
					const info = data.company_sentiments[ticker]
					if (info === undefined)
						return (<div></div>)
					return (
						<li key={ticker}>
							<div style={{display: 'flex', justifyContent: 'center'}}>
								<div>
									<br></br>
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<h4> {data.company_sentiments[ticker][2]} ({ticker}) </h4>
									</div>
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<img src={`http://markets.money.cnn.com/services/api/chart/snapshot_chart_api.asp?symb=${ticker}`} width="60%"></img>
									</div>
									<br></br>
									<br></br>
									<br></br>
									<div style={{display: 'flex', justifyContent: 'center'}}>
										<p style={{fontSize: "20px", paddingLeft: "25px", paddingRight: "25px", textAlign: "justify"}}>{matching_terms.concat(' ', info[1])}</p>
									</div>
									<br></br>
								</div>
							</div>
						</li>    
					)
				})
			}
		</ul>
		)
		let new_visuals = this.state.visuals
		new_visuals.push(sentiments_view)
		this.setState({visuals: new_visuals})
	}

  render () {
		let body_view = (<div></div>)
		if (this.state.data.final_ranking !== [] && this.state.data.final_ranking.length > 0) {
			body_view = (

				<div className="Slideshow">

					<div className="csslider infinity" id="slider1">
						{ // Load all the circles (on the bottom of the slideshow)
							this.state.data.final_ranking.map((ticker, curr_index) => {
								const slide_id = (curr_index + 1).toString()
								if (curr_index == 0)
									return (<input type="radio" name="slides" id={"slides_" + slide_id} defaultChecked/>)
								else
									return (<input type="radio" name="slides" id={"slides_" + slide_id}/>)
							})
						}

						{this.state.visuals.map((elt) => {return elt})}

						<div className="arrows">
							{ // Load all the arrows for the slideshow
								this.state.data.final_ranking.map((ticker, curr_index) => {
									const slide_id = (curr_index + 1).toString()
									return (<label htmlFor={"slides_" + slide_id}></label>)
								})
							}
							<label className="goto-first" htmlFor="slides_1"></label>
							<label className="goto-last" htmlFor={"slides_" + this.state.data.final_ranking.length.toString()}></label>
						</div>

						<div className="navigation"> 
							<div>
								{
									this.state.data.final_ranking.map((ticker, curr_index) => {
										const slide_id = (curr_index + 1).toString()
										return (<label htmlFor={"slides_" + slide_id}></label>)
									})
								}
							</div>
						</div>

					</div>
				</div>

			)
		}
		return (
			<div className="Home">

			<div className="header">

				<div className="topcorner">
					<p>Student Names: {this.state.names}</p>
				</div>

				<form className="global-search">
					<h1>CompanySearch</h1>
					<div>
						<Input placeholder="Enter your keywords here..."
							onChange={this.handleChange}
							className="form-control"
							name="user_keywords"
							style={{fontSize: '20px'}}/>
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
								<DropdownItem onClick={this.addCategory}>Utilities</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Large-Cap</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Mid-Cap</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Small-Cap</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Value</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Growth</DropdownItem>
								<DropdownItem onClick={this.addCategory}>Socially Conscious</DropdownItem>
							</DropdownMenu>
						</Dropdown>

						<div className="category-list">
							<Nav card={true} style={{width: "50%", align: "center", margin: "0 auto"}}>
								{Object.keys(this.state.categories).map((category) => {
									<div>
									<Button type="button" color="success"
										size="sm" name={"Categories:"}>
										{' ' + "Categories:"}
									</Button>
									</div>
									return (
										<NavItem key={category}>
											<div>
											<Button className="fa fa-times" type="button" color="success"
												size="sm" name={category} 
												onClick={this.removeCategory}>
												{' ' + category}
											</Button>
											</div>
										</NavItem>
									)
								})}
							</Nav>
						</div>

							<Button type="button" className="btn btn-info" onClick={this.performQuery}> Go! </Button>


					</div>

				<div>
					{(this.state.loading_results)
						? (<div className="loader"></div>)
						: (<div></div>)}
				</div>
				</form>
			</div>


			{/* <Slideshow /> */}
			{body_view}

			</div>
		);
  }
}

export default Home;
