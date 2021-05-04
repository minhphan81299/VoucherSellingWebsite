import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { Icon, Col, Card, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../_actions/user_actions';
import { Link } from 'react-router-dom';

import CarouselPage from './CarouselPage';
import {
	MDBCarousel,
	MDBCarouselCaption,
	MDBCarouselInner,
	MDBCarouselItem,
	MDBView,
	MDBMask,
	MDBContainer,
} from 'mdbreact';

import { continents, price } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';
import styled from 'styled-components';

import Axios from 'axios';
const { Meta } = Card;

const StyledCard = styled(Card)`
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	:hover {
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	}
`;

const NavItem = styled.li`
	cursor: pointer;
`;

function LandingPage() {
	const [Products, setProducts] = useState([]);
	const [PostSize, setPostSize] = useState();
	const [Skip, setSkip] = useState(0);
	const [Limit, setLimit] = useState(8);
	const [visible, setVisible] = useState(4);
	const [SearchTerms, setSearchTerms] = useState([]);
	const [Filters, setFilters] = useState({
		category: [],
		price: [],
	});
	const [isActive, setIsActive] = useState('All');

	const state = useSelector((state) => state.user.cart);
	const dispatch = useDispatch();

	useEffect(() => {
		const variables = {
			skip: Skip,
			limit: Limit,
		};

		const getResult = async () => {
			const result = await Axios.post('/api/product/getVoucher');
			setProducts(result.data.product);
			setSearchTerms(result.data.product);
		};

		getResult();
	}, []);

	const getVoucher = (variables) => {
		Axios.post('/api/product/getVoucher', variables).then((response) => {
			if (response.data.success) {
				if (variables.loadMore) {
					setProducts([...Products, ...response.data.product]);
				} else {
					setProducts(response.data.product);
				}
				setPostSize(response.data.postSize);
			} else {
				alert('Failed to fectch products datas');
			}
		});
	};

	const onLoadMore = () => {
		setVisible(visible + 1);
	};

	const renderCards = SearchTerms.slice(0, visible).map((products, index) => {
		return (
			<Col lg={6} md={8} xs={24}>
				<StyledCard
					hoverable={true}
					cover={
						<Link to={`/product/${products._id}`}>
							{' '}
							<img
								style={{ width: '100%', maxHeight: '150px' }}
								src={`http://localhost:5000/${products.image[0]}`}
								alt='productsImage'
							/>
						</Link>
					}
				>
					<Meta title={products.title} description={`$${products.price}`} />
				</StyledCard>
			</Col>
		);
	});

	const showFilteredResults = (filters) => {
		const variables = {
			skip: 0,
			limit: Limit,
			filters: filters,
		};
		getVoucher(variables);
		setSkip(0);
	};

	const handlePrice = (value) => {
		const data = price;
		let array = [];

		for (let key in data) {
			if (data[key]._id === parseInt(value, 10)) {
				array = data[key].array;
			}
		}
		console.log('array', array);
		return array;
	};

	const handleFilters = (filters, continents) => {
		// const newFilters = { ...Filters };

		// newFilters[category] = filters;

		// if (category === 'Category') {
		// 	// console.log(category);
		// 	// let priceValues = handlePrice(filters);
		// 	newFilters[category] = filters;
		// }

		// showFilteredResults(newFilters);
		// setFilters(newFilters);
		if (continents === 'category') {
			console.log(filters);
		}
	};

	const onSearch = (e, continents, category) => {
		if (continents === 'search') {
			let searchQuery = e.currentTarget.value.toLowerCase();
			setSearchTerms(
				Products.filter((item, index) => {
					var searchValue = item.title.toLowerCase();
					return searchValue.indexOf(searchQuery) !== -1;
				})
			);
		} else if (continents === 'filter') {
			if (category === 'All') {
				setIsActive('All');
				return setSearchTerms(Products);
			}
			setIsActive(category);
			setSearchTerms(
				Products.filter((item, index) => {
					return item.category === category;
				})
			);
		}
	};

	const CarouselPage = () => {
		return (
			<MDBContainer>
				<MDBCarousel activeItem={1} length={3} showControls={false} showIndicators={false} className='z-depth-1' slide>
					<MDBCarouselInner>
						<MDBCarouselItem itemId='1'>
							<MDBView>
								<img
									className='d-block w-100'
									src='https://mdbootstrap.com/img/Photos/Slides/img%20(35).jpg'
									alt='First slide'
								/>
							</MDBView>
						</MDBCarouselItem>
						<MDBCarouselItem itemId='2'>
							<MDBView>
								<img
									className='d-block w-100'
									src='https://mdbootstrap.com/img/Photos/Slides/img%20(33).jpg'
									alt='Second slide'
								/>
							</MDBView>
						</MDBCarouselItem>
						<MDBCarouselItem itemId='3'>
							<MDBView>
								<img
									className='d-block w-100'
									src='https://mdbootstrap.com/img/Photos/Slides/img%20(31).jpg'
									alt='Third slide'
								/>
							</MDBView>
						</MDBCarouselItem>
					</MDBCarouselInner>
				</MDBCarousel>
			</MDBContainer>
		);
	};

	return (
		<>
			<div style={{ width: '75%', margin: '4rem auto' }}>
				<div style={{ textAlign: 'center' }}>
					<h2>
						{' '}
						Get Voucher <Icon style={{ marginLeft: '10px' }} type='dollar' />{' '}
					</h2>
				</div>

				<nav className='navbar navbar-expand-lg navbar-dark mdb-color lighten-3 mt-3 mb-5 wow fadeInUp'>
					<span className='navbar-brand'>Categories:</span>

					<button
						className='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='#basicExampleNav'
						aria-controls='basicExampleNav'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>

					<div className='collapse navbar-collapse' id='basicExampleNav'>
						<ul className='navbar-nav mr-auto'>
							<NavItem className={`nav-item ${isActive === 'All' ? 'active' : ''}`}>
								<div className='nav-link' onClick={(e) => onSearch(e, 'filter', 'All')}>
									All
								</div>
							</NavItem>
							<NavItem className={`nav-item ${isActive === 'Food' ? 'active' : ''}`}>
								<div className='nav-link' onClick={(e) => onSearch(e, 'filter', 'Food')}>
									Food
								</div>
							</NavItem>
							<NavItem className={`nav-item ${isActive === 'Drink' ? 'active' : ''}`}>
								<div className='nav-link' onClick={(e) => onSearch(e, 'filter', 'Drink')}>
									Drink
								</div>
							</NavItem>
						</ul>

						<form className='form-inline'>
							<div className='md-form my-0'>
								<input
									className='form-control mr-sm-2'
									type='text'
									placeholder='Search'
									aria-label='Search'
									onChange={(e) => onSearch(e, 'search')}
								/>
							</div>
						</form>
					</div>
				</nav>

				{Products.length === 0 ? (
					<div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
						<h2>No post yet...</h2>
					</div>
				) : (
					<div>
						<Row gutter={[16, 16]}>{renderCards}</Row>
					</div>
				)}
				<br />
				<br />

				{/* {PostSize >= Limit && (
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<button onClick={onLoadMore}>Load More</button>
					</div>
				)} */}
				{console.log(SearchTerms.length, visible)}
				{SearchTerms.length > visible && (
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<button className='btn btn-primary' onClick={onLoadMore}>
							Load More
						</button>
					</div>
				)}
			</div>
		</>
	);
}

export default LandingPage;
