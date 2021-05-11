import React from 'react';
import styled from 'styled-components';

const StyleCarVoucher = styled.section`
	background-size: cover;
	background-repeat: no-repeat;
	width: 100%;
	background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
		url('http://a1.odistatic.net/images/creas/campaign/rebajas/jul17/car-fondo.jpg');
	background-position: center center;
	height: 150px;
	margin: auto;
	margin-top: 50px;
	padding-top: 20px;
	padding-bottom: 10px;
	color: #fff !important;
	border-radius: 30px;
	width: 60%;
    display: flex;
    align-items: center;
    padding: 0;
}
`;
function CodeVoucher() {
	return (
		<StyleCarVoucher id='car-voucher' className='content bottom4' style={{ marginTop: '30px' }}>
			<div className='container'>
				<div className='row'>
					<div
						className='col-md-2 margin-top'
						style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
					>
						<span className='car-icon' style={{ fontSize: '34px', fontWeight: '400 !important' }}>
							Code
						</span>
					</div>
					<div className='col-md-1 border-right'></div>
					<div className='col-md-8'>
						<h1
							style={{
								paddingTop: '3%',
								fontWeight: '400 !important',
								fontSize: '3.5rem !important',
								marginBottom: '14px !important',
								color: 'white',
							}}
						>
							{Math.random().toString(36).substring(2)}
						</h1>
					</div>
				</div>
			</div>
		</StyleCarVoucher>
	);
}

export default CodeVoucher;
