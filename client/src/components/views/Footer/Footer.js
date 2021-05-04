import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import { MDBBtn } from 'mdb-react-ui-kit';

function Footer() {
	return (
		<footer className='page-footer  mdb-color lighten-3 text-center font-small mt-4 wow fadeIn'>
			<div className='pt-4'>
				<a
					className='btn btn-outline-white'
					href='https://mdbootstrap.com/docs/jquery/getting-started/download/'
					target='_blank'
					role='button'
				>
					Download MDB
					<i className='fas fa-download ml-2'></i>
				</a>
				<a
					className='btn btn-outline-white'
					href='https://mdbootstrap.com/education/bootstrap/'
					target='_blank'
					role='button'
				>
					Start free tutorial
					<i className='fas fa-graduation-cap ml-2'></i>
				</a>
			</div>

			<hr className='my-4' />

			<div className='pb-4'>
				<a href='https://www.facebook.com/mdbootstrap' target='_blank'>
					<i className='fab fa-facebook-f mr-3'></i>
				</a>

				<a href='https://twitter.com/MDBootstrap' target='_blank'>
					<i className='fab fa-twitter mr-3'></i>
				</a>

				<a href='https://www.youtube.com/watch?v=7MUISDJ5ZZ4' target='_blank'>
					<i className='fab fa-youtube mr-3'></i>
				</a>

				<a href='https://plus.google.com/u/0/b/107863090883699620484' target='_blank'>
					<i className='fab fa-google-plus-g mr-3'></i>
				</a>

				<a href='https://dribbble.com/mdbootstrap' target='_blank'>
					<i className='fab fa-dribbble mr-3'></i>
				</a>

				<a href='https://pinterest.com/mdbootstrap' target='_blank'>
					<i className='fab fa-pinterest mr-3'></i>
				</a>

				<a href='https://github.com/mdbootstrap/bootstrap-material-design' target='_blank'>
					<i className='fab fa-github mr-3'></i>
				</a>

				<a href='http://codepen.io/mdbootstrap/' target='_blank'>
					<i className='fab fa-codepen mr-3'></i>
				</a>
			</div>

			<div className='footer-copyright py-3'>
				© 2018 Copyright:
				<a href='https://mdbootstrap.com/education/bootstrap/' target='_blank'>
					{' '}
					MDBootstrap.com{' '}
				</a>
			</div>
		</footer>
	);
}

export default Footer;
