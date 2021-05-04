import React, { Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
// pages for this product
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import UploadVoucherPage from './views/UploadVoucherPage/UploadVoucherPage.js';
import ProductItem from './views/Products/ProductItem.js';
import Checkout from './views/CheckOut/CheckOut';
import { WOW } from 'wowjs';

function App() {
	useEffect(() => {
		const wow = new WOW({
			offset: 100,
			mobile: false,
			live: true,
		});

		wow.init();
	}, []);
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<NavBar />
			<div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
				<Switch>
					<Route exact path='/' component={Auth(LandingPage, false)} />
					<Route exact path='/login' component={Auth(LoginPage, false)} />
					<Route exact path='/register' component={Auth(RegisterPage, false)} />
					<Route exact path='/voucher/upload' component={Auth(UploadVoucherPage, true)} />
					<Route exact path='/product/:id' component={ProductItem} />
					<Route exact path='/checkout' component={Checkout} />
				</Switch>
			</div>
			<Footer />
		</Suspense>
	);
}

export default App;
