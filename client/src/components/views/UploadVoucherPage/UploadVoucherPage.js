import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload.js';
import Axios from 'axios';
const { Title } = Typography;
const { TextArea } = Input;

function UploadVoucherPage(props) {
	const shopId = props.url.id;
	const [tittle, setTittle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [category, setCategory] = useState('Food');
	const [Images, setImages] = useState();

	const Category = [
		{ key: 1, value: 'Food' },
		{ key: 2, value: 'Drink' },
	];

	const onTitleChange = (e) => {
		setTittle(e.target.value);
	};
	const onDescriptionChange = (e) => {
		setDescription(e.target.value);
	};
	const onPriceChange = (e) => {
		setPrice(e.target.value);
	};
	const onCategoryChange = (e) => {
		console.log(e.target.value);
		setCategory(e.target.value);
	};
	const updateImages = (newImages) => {
		setImages(newImages);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(category);
		console.log(Images);
		const voucher = {
			title: tittle,
			description: description,
			price: price,
			image: Images,
			category: category,
			shopId: shopId,
		};
		console.log(voucher);
		Axios.post('/api/product/uploadVoucher', voucher).then((res) => {
			if (res.data.success) {
				alert('Upload successfully');
			} else {
				alert('Failed to voucher');
			}
		});
	};

	return (
		<div style={{ maxWidth: '700px', margin: '2rem auto' }} className='wow fadeInUp'>
			<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
				<Title level={2}>Upload Voucher</Title>
			</div>
			<Form onSubmit={handleSubmit}>
				<FileUpload refreshFunction={updateImages} />

				<br />
				<br />
				<label>Title</label>
				<Input onChange={onTitleChange} value={tittle} />
				<br />
				<br />
				<label>Description</label>
				<TextArea onChange={onDescriptionChange} value={description}></TextArea>
				<br />
				<br />
				<label>Price</label>
				<Input onChange={onPriceChange} value={price} type='number'></Input>
				<br />
				<br />
				<lable style={{ marginRight: '25px' }}>Category</lable>
				<select onChange={onCategoryChange}>
					{Category.map((item) => (
						<option key={item.key} value={item.value}>
							{item.value}
						</option>
					))}
				</select>

				<br />
				<br />
				<Button onClick={handleSubmit}>Submit</Button>
			</Form>
		</div>
	);
}

export default UploadVoucherPage;
