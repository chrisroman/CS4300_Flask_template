// @flow
import React from 'react';
import css from '../../public/css/home.css'
import '../../public/css/normalize.css'
import '../../public/css/skeleton.css'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button } from 'reactstrap';
import { InputGroup, Input } from 'reactstrap';
import axios from 'axios'

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
		const data = response.data
		const sentiments_view = (
			<div style={{overflow: 'auto', margin:'auto'}}>
				<ul key="PLACEHOLDER" className="ul-results"> {
					data.final_ranking.map((ticker) => {
						const info = data.company_sentiments[ticker]
						if (info === undefined)
							return (<div></div>)
						return (
							<li key={ticker} className="li-results">
								{ticker}: {info[0]}, {info[1]}
								<br></br>
								<img src={`http://markets.money.cnn.com/services/api/chart/snapshot_chart_api.asp?symb=${ticker}`}></img>
							</li>
						)
					})
				}
				</ul>
			</div>
		)
		let new_visuals = this.state.visuals
		new_visuals.push(sentiments_view)
		this.setState({visuals: new_visuals})
	}

  render () {
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
				</div>

				<div>
					{(this.state.loading_results)
						? (<div className="loader"></div>)
						: (<div></div>)}
				</div>
				<div className="results">
					{this.state.visuals.map((elt) => {return elt})}
				</div>

				<div className="header__main">
					<div className="slider">
						<svg className="slider__mask" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1920 1080" width="0" height="0">
							<defs>
								<pattern id="bg1" patternUnits="userSpaceOnUse" width="1920" height="1080" viewBox="0 0 1920 1080">
									<image xlinkHref="https://images.unsplash.com/photo-1454328911520-ccf83f1ef41d?dpr=1&auto=format&fit=crop&w=2000&h=2000&q=80&cs=tinysrgb&crop=&bg=" width="100%" height="100%"/>
								</pattern>
								<pattern id="pattern1l" patternUnits="userSpaceOnUse" width="562" height="366" viewBox="0 0 562 366">
									<image xlinkHref="https://images.unsplash.com/photo-1454328911520-ccf83f1ef41d?dpr=1&auto=format&fit=crop&w=600&h=600&q=80&cs=tinysrgb&crop=&bg=" width="600px" height="600px"/>
								</pattern>
								<pattern id="pattern1r" patternUnits="userSpaceOnUse" x="365px" width="562" height="366" viewBox="0 0 562 366">
									<image xlinkHref="https://images.unsplash.com/photo-1497215842964-222b430dc094?dpr=1&auto=format&fit=crop&w=600&h=600&q=80&cs=tinysrgb&crop=&bg=" width="600px" height="600px"/>
								</pattern>

								<pattern id="bg2" patternUnits="userSpaceOnUse" width="1920" height="1080" viewBox="0 0 1920 1080">
									<image xlinkHref="https://images.unsplash.com/photo-1497377825569-02ad2f9edb81?dpr=1&auto=format&fit=crop&w=2000&h=2000&q=80&cs=tinysrgb&crop=&bg=" width="100%" height="100%"/>
								</pattern>
								<pattern id="pattern2l" patternUnits="userSpaceOnUse" width="562" height="366" viewBox="0 0 562 366">
									<image xlinkHref="https://images.unsplash.com/photo-1497377825569-02ad2f9edb81?dpr=1&auto=format&fit=crop&w=600&h=600&q=80&cs=tinysrgb&crop=&bg=" width="600px" height="600px"/>
								</pattern>
								<pattern id="pattern2r" patternUnits="userSpaceOnUse" x="365" width="562" height="366" viewBox="0 0 562 366">
									<image xlinkHref="https://images.unsplash.com/photo-1496060169243-453fde45943b?dpr=1&auto=format&fit=crop&w=600&h=600&q=80&cs=tinysrgb&crop=&bg=" width="600px" height="600px"/>
								</pattern>
							</defs>
						</svg>

						<div className="slide" id="slide-1">
							<svg className="slide__bg" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1920" height="1080">
								<rect x="0" y="0" width="1920" height="1080" fill="url(#bg1)" />
							</svg>
							<div className="slide__images">
								<div className="slide__image slide__image--left">
									<svg viewBox="0 0 900 365" version="1.1"	xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" x="0px" y="0px">
										<path d="M 0 0 L 0 365 L 351.2382 365 L 562 0 L 0 0 Z" fill="url(#pattern1l)"/>
									</svg>
								</div>

								<div className="slide__image slide__image--right">
									<svg viewBox="0 0 900 365" version="1.1"	xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" x="0px" y="0px">
										<path d="M 900 365 L 900 0 L 548.7618 0 L 338 365 L 900 365 Z" fill="url(#pattern1r)"/>
									</svg>
								</div>
							</div>
						</div>

						<div className="slide" id="slide-2">
							<svg className="slide__bg" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1920" height="1080">
								<rect x="0" y="0" width="1920" height="1080" fill="url(#bg2)" />
							</svg>
							<div className="slide__images">
								<div className="slide__image slide__image--left">
									<svg viewBox="0 0 900 365" version="1.1"	xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" x="0px" y="0px">
										<path d="M 0 0 L 0 365 L 351.2382 365 L 562 0 L 0 0 Z" fill="url(#pattern2l)"/>
									</svg>
								</div>

								<div className="slide__image slide__image--right">
									<svg viewBox="0 0 900 365" version="1.1"	xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" x="0px" y="0px">
										<path d="M 900 365 L 900 0 L 548.7618 0 L 338 365 L 900 365 Z" fill="url(#pattern2r)"/>
									</svg>
								</div>
							</div>
						</div>

						<div className="slider__pagination">
							<a href="#slide-1" className="button">Slide 1</a>
							<a href="#slide-2" className="button">Slide 2</a>
						</div>
					</div>
				</div>
			</div>
		);
  }
}

export default Home;
