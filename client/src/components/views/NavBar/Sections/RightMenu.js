/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RightMenu(props) {
	const user = useSelector((state) => state.user);
	const [quantity, setQuantity] = useState(0);
	const [userId, setUserId] = useState();

	useEffect(() => {
		setQuantity(user.Carts.length);
		if (user) {
			const userId = user.userData?._id;

			setUserId(userId);
		}
	}, [user]);
	const logoutHandler = () => {
		axios.get(`${USER_SERVER}/logout`).then((response) => {
			if (response.status === 200) {
				props.history.push('/login');
			} else {
				alert('Log Out Failed');
			}
		});
	};

	if (user.userData && !user.userData.isAuth) {
		return (
			<Menu mode={props.mode}>
				<Menu.Item key='mail'>
					<Link to='/login'>Signin</Link>
				</Menu.Item>
				<Menu.Item key='app'>
					<Link to='/register'>Signup</Link>
				</Menu.Item>
			</Menu>
		);
	} else {
		return (
			<Menu mode={props.mode}>
				<Menu.Item key='app1'>
					<Link to='/checkout' className='nav-link waves-effect'>
						<span className='badge red z-depth-1 mr-1'>{quantity}</span>
						<i className='fas fa-shopping-cart'></i>
						<span className='clearfix d-none d-sm-inline-block'> Cart </span>
					</Link>
				</Menu.Item>
				<Menu.Item key='app'>
					<Link to={'/myshop/' + userId}>My Shop</Link>
				</Menu.Item>
				<Menu.Item key='logout'>
					<a onClick={logoutHandler}>Logout</a>
				</Menu.Item>
			</Menu>
		);
	}
}

export default withRouter(RightMenu);
