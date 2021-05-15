import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon, Col, Card, Row } from 'antd';
import { Link } from 'react-router-dom';

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

function MyVoucher(props) {
	const [products, setProducts] = useState([]);
	const [visible, setVisible] = useState(4);

	useEffect(() => {
		const getResult = async () => {
			const result = await Axios.post(`/api/product/getVoucherShopId/${props.shopId?.id}`);
			setProducts(result.data.product);
			console.log(result.data.product);
		};
		getResult();
	}, []);

	const renderCards = products?.slice(0, visible).map((products, index) => {
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
				<button
					style={{ padding: '0px !important' }}
					className='btn btn-danger'
					onClick={() => {
						Axios.post(`/api/product/blockVoucher/${products._id}`).then((res) => {
							if (res.data.success) {
								alert('Successfully Block Product');
							} else {
								alert('Error,please try again');
							}
						});
					}}
				>
					block
				</button>
			</Col>
		);
	});
	const onLoadMore = () => {
		setVisible(visible + 4);
	};

	return (
		<div style={{ width: '75%', margin: '2rem auto' }}>
			{products?.length === 0 ? (
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
			{products.length > visible && (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<button className='btn btn-primary' onClick={onLoadMore}>
						Load More
					</button>
				</div>
			)}
		</div>
	);
}

export default MyVoucher;
