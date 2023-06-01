import express from 'express'
import { getDb } from '../data/database.js'


const router = express.Router()
const db = getDb()

//hämta produkter utifrån tags 
router.get('/', async (req, res) => {
	let searchString = req.query.q

	console.log('this is a posible tag:', searchString);
	await db.read()
	const products = db.data.products;
	let matches = [];

	products.forEach((product) => {
		let isMatch = false;
		product.tags.forEach(tag => {
			if (tag.includes(searchString)) {
				isMatch = true;
			};
		});
		if (isMatch) {
			matches.push(product);
		};
	});

	matches.sort(function (a, b) {
		const nameA = a.name.toLowerCase()
		const nameB = b.name.toLowerCase()

		if (nameA > nameB) {
			return 1
		}

		if (nameA < nameB) {
			return -1
		}
		return 0
	})
	if (matches.length === 0) {
		res.sendStatus(404)
	}
	res.send(matches)
})
export default router