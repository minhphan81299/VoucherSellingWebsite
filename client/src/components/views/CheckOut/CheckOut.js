import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CodeVoucher from './CodeVoucher';
import axios from 'axios';

function CheckOut(props) {
	const products = useSelector((state) => state.user.Carts);
	const userId = useSelector((state) => state.user?.userData?._id);
	const [quantity, setQuantity] = useState(products?.length);
	const [codeVoucher, setCodeVoucher] = useState({
		sellingStatus: false,
		amount: 0,
	});
	// useEffect(() => {
	// 	return () => {
	// 		cleanup;
	// 	};
	// }, [input]);
	const handleSubmit = (e) => {
		e.preventDefault();
		products.map((item) => {
			axios.post(`/api/product/${item._id}`).then((res) => {
				if (res.data.success) {
					const shopId = res.data?.product[0]?.shopId;

					const selling = {
						userId: userId,
						productId: item._id,
						quantity: item?.quantity,
						shopId: shopId,
					};
					console.log(selling);
					axios.post(`/api/product/updateCountInStock/${item._id}`, selling).then((res) => {
						if (res.data.success) {
							alert('Successfully');
						} else {
							alert('Failed to voucher');
						}
					});
					axios.post('/api/product/selling', selling).then((res) => {
						if (res.data.success) {
							setCodeVoucher({ ...codeVoucher, sellingStatus: true, amount: products.length });
							props.history.push('/code');
						} else {
							alert('Failed to voucher');
						}
					});
				}
			});
		});
	};

	return (
		<main className='mt-5 pt-4'>
			<div className='container wow fadeIn'>
				<h2 className='my-5 h2 text-center'>Check out</h2>

				<div className='row'>
					<div className='col-md-8 mb-4'>
						<div className='card'>
							<form className='card-body' onSubmit={handleSubmit}>
								<div className='md-form input-group pl-0 mb-5'>
									<input
										type='text'
										className='form-control py-0'
										placeholder='Username'
										aria-describedby='basic-addon1'
									/>
								</div>

								<div className='md-form mb-5'>
									<input type='text' id='email' className='form-control' placeholder='youremail@example.com' />
								</div>

								<div className='md-form mb-5'>
									<input type='text' id='address' className='form-control' placeholder='1234 Main St' />
								</div>

								<div className='md-form mb-5'>
									<input type='text' id='address-2' className='form-control' placeholder='Apartment or suite' />
								</div>

								<div className='row'>
									<div className='col-lg-4 col-md-12 mb-4'>
										<label for='country'>Country</label>
										<select className='custom-select d-block w-100' id='country'>
											<option value=''>Choose...</option>
											<option>United States</option>
										</select>
										<div className='invalid-feedback'>Please select a valid country.</div>
									</div>

									<div className='col-lg-4 col-md-6 mb-4'>
										<label for='state'>State</label>
										<select className='custom-select d-block w-100' id='state'>
											<option value=''>Choose...</option>
											<option>California</option>
										</select>
										<div className='invalid-feedback'>Please provide a valid state.</div>
									</div>

									<div className='col-lg-4 col-md-6 mb-4'>
										<label for='zip'>Zip</label>
										<input type='text' className='form-control' id='zip' placeholder='' />
										<div className='invalid-feedback'>Zip code .</div>
									</div>
								</div>

								<hr />

								<div className='row'>
									<div className='col-md-6 mb-3'>
										<label for='cc-name'>Name on card</label>
										<input type='text' className='form-control' id='cc-name' placeholder='' />
										<small className='text-muted'>Full name as displayed on card</small>
										<div className='invalid-feedback'>Name on card is </div>
									</div>
									<div className='col-md-6 mb-3'>
										<label for='cc-number'>Credit card number</label>
										<input type='text' className='form-control' id='cc-number' placeholder='' />
										<div className='invalid-feedback'>Credit card number is </div>
									</div>
								</div>
								<div className='row'>
									<div className='col-md-3 mb-3'>
										<label for='cc-expiration'>Expiration</label>
										<input type='text' className='form-control' id='cc-expiration' placeholder='' />
										<div className='invalid-feedback'>Expiration date </div>
									</div>
									<div className='col-md-3 mb-3'>
										<label for='cc-expiration'>CVV</label>
										<input type='text' className='form-control' id='cc-cvv' placeholder='' />
										<div className='invalid-feedback'>Security code </div>
									</div>
								</div>
								<hr className='mb-4' />
								<button className='btn btn-primary btn-lg btn-block' type='submit'>
									Continue to checkout
								</button>
							</form>
						</div>
					</div>

					<div className='col-md-4 mb-4'>
						<h4 className='d-flex justify-content-between align-items-center mb-3'>
							<span className='text-muted'>Your cart</span>
							<span className='badge badge-secondary badge-pill'>{quantity}</span>
						</h4>

						<ul className='list-group mb-3 z-depth-1'>
							{products.map((item) => {
								return (
									<li className='list-group-item d-flex justify-content-between lh-condensed'>
										<div>
											<h6 className='my-0'>{item.description}</h6>
											<small className='text-muted'>{item.category}</small>
										</div>
										<span className='text-muted'>{item.price}</span>
									</li>
								);
							})}

							<li className='list-group-item d-flex justify-content-between bg-light'>
								<div className='text-success'>
									<h6 className='my-0'>Promo code</h6>
									<small>EXAMPLECODE</small>
								</div>
								<span className='text-success'>-$5</span>
							</li>
							<li className='list-group-item d-flex justify-content-between'>
								<span>Total (USD)</span>
								<strong>
									{products.reduce((acc, cur) => {
										console.log(cur.price);
										return (acc += cur.price);
									}, 0)}
								</strong>
							</li>
						</ul>

						<form className='card p-2'>
							<div className='input-group'>
								<input
									type='text'
									className='form-control'
									placeholder='Promo code'
									aria-label="Recipient's username"
									aria-describedby='basic-addon2'
								/>
								<div className='input-group-append'>
									<button className='btn btn-secondary btn-md waves-effect m-0' type='button'>
										Redeem
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}

export default CheckOut;
