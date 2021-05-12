const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');
const { Selling } = require('../models/Selling');
const multer = require('multer');

const { auth } = require('../middleware/auth');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`);
	},
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		if (ext !== '.jpg' || ext !== '.png') {
			return cb(res.status(400).end('only jpg, png are allowed'), false);
		}
		cb(null, true);
	},
});

var upload = multer({ storage: storage }).single('file');

//=================================
//             Product
//=================================

router.post('/uploadImage', auth, (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			return res.json({ success: false, err });
		}
		return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename });
	});
});

router.post('/uploadVoucher', auth, (req, res) => {
	//save all the data we got from the client into the DB
	const product = new Product(req.body);

	product.save((err) => {
		if (err) return res.status(400).json({ success: false, err });
		return res.status(200).json({ success: true });
	});
});

router.post('/selling', auth, (req, res) => {
	const selling = new Selling(req.body);

	selling.save((err) => {
		if (err) return res.status(400).json({ success: false, err });
		return res.status(200).json({ success: true });
	});
});
router.post('/getSellingProduct/:id', auth, (req, res) => {
	Selling.find({ shopId: req.params.id }).exec((err, product) => {
		if (err) return res.status(400).json({ success: false });

		res.status(200).json({ success: true, product });
	});
});
router.post('/getVoucher', (req, res) => {
	let term = req.body.searchTerm;
	let category = req.body.filters?.Category;

	let categoryDe = { 1: 'Food', 2: 'Drink' };

	if (term) {
		Product.find({ $text: { $search: term } }).exec((err, product) => {
			if (err) return res.status(400).json({ success: false });
			res.status(200).json({ success: true, product, postSize: product.length });
		});
	}
	if (category?.length > 0) {
		Product.find({ category: categoryDe[category] }).exec((err, product) => {
			if (err) return res.status(400).json({ success: false });
			res.status(200).json({ success: true, product, postSize: product.length });
		});
	} else {
		Product.find().exec((err, product) => {
			if (err) return res.status(400).json({ success: false });
			res.status(200).json({ success: true, product, postSize: product.length });
		});
	}
});

router.post('/:id', (req, res) => {
	const _id = req.params.id;

	Product.find({ _id }).exec((err, product) => {
		if (err) return res.status(400).json({ success: false });
		res.status(200).json({ success: true, product });
	});
});

router.post('/getVoucherShopId/:id', (req, res) => {
	const _id = req.params.id;

	Product.find({ _id }).exec((err, product) => {
		if (err) return res.status(400).json({ success: false });

		res.status(200).json({ success: true, shopId: product.shopId });
	});
});

//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array
router.get('/products_by_id', (req, res) => {
	let type = req.query.type;
	let productIds = req.query.id;

	if (type === 'array') {
		let ids = req.query.id.split(',');
		productIds = [];
		productIds = ids.map((item) => {
			return item;
		});
	}

	//we need to find the product information that belong to product Id
	Product.find({ _id: { $in: productIds } })
		.populate('writer')
		.exec((err, product) => {
			if (err) return res.status(400).send(err);
			return res.status(200).send(product);
		});
});

module.exports = router;
