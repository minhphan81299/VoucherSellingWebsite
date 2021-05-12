import React, { useState, useEffect } from 'react';
import UploadVoucherPage from '../UploadVoucherPage/UploadVoucherPage';
import ShopChart from './ShopChart';
import { Icon, Col, Card, Row } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
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
function MyShop({ match }) {
	const [isActive, setIsActive] = useState('Upload');
	const [uploadStatus, setUploadStatus] = useState(true);
	const [dataTime, setDataTime] = useState();
	useEffect(() => {
		axios.post(`/api/product/getSellingProduct/${match.params.id}`).then((res) => {
			if (res.data.success) {
				const test = res.data.product.map((e) => ({
					quantity: e.quantity,
					dates: e.createdAt.split('T')[0],
				}));

				var date = [];
				var value = [];
				test.forEach((e) => {
					if (date.indexOf(e.dates) === -1) {
						date.push(e.dates);
					}
				});
				date.forEach((e) => {
					let sum = 0;
					test.map((ele) => {
						if (ele.dates === e) {
							sum += ele.quantity;
						}
					});
					value.push({ [e]: sum });
				});
				setDataTime(value);
			}
		});
	}, []);
	const onSearch = (e, continents, category) => {
		if (category === 'Upload') {
			setIsActive('Upload');
			setUploadStatus(true);
			return;
			// return setSearchTerms(Products);
		}
		setIsActive(category);
		setUploadStatus(false);
	};
	return (
		<div>
			<div style={{ width: '20%', margin: '4rem auto' }}>
				<nav className='navbar navbar-expand-lg navbar-dark mdb-color lighten-3 mt-3 mb-5 wow fadeInUp'>
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

					<div className='collapse navbar-collapse' id='basicExampleNav' style={{ justifyContent: 'center' }}>
						<ul className='navbar-nav'>
							<NavItem className={`nav-item ${isActive === 'Upload' ? 'active' : ''}`}>
								<div className='nav-link' onClick={(e) => onSearch(e, 'filter', 'Upload')}>
									Upload
								</div>
							</NavItem>
							<NavItem className={`nav-item ${isActive === 'Chart' ? 'active' : ''}`}>
								<div className='nav-link' onClick={(e) => onSearch(e, 'filter', 'Chart')}>
									Chart
								</div>
							</NavItem>
						</ul>
					</div>
				</nav>
			</div>
			{uploadStatus === true ? <UploadVoucherPage url={match.params} /> : <ShopChart dataTime={dataTime} />}
		</div>
	);
}

export default MyShop;
