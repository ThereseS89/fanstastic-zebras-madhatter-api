import { getProducts } from "../../ApiFunctions/getProducts";
import { getSearchProducts } from "../../ApiFunctions/getSearchProducts";
import { useState } from "react";
import { useEffect } from "react";
import './products.css'

const Products = () => {
	const [hats, sethats] = useState([])

	useEffect(() => {
		// uploadProducts()
		async function fetchData() {
			const hatsData = await getProducts();
			sethats(await hatsData)
		}
		fetchData()
	}, []);
	console.log(hats)

	const handleOnChange = async (event) => {
		const searchData = await getSearchProducts(event.target.value)
		sethats(await searchData)
	};

	
	return (
		<section>
			<h2 className="head-hats">Våra Hattar</h2>
			<input
				type="text"
				onChange={(event) => handleOnChange(event)}
				placeholder='Sök efter produkt...' />

			<ul className="hats-list">

				{hats && hats.length > 0 ? hats.map((hat, i) => (

					<div
						className="hat-container"
						key={i}>

						<h2 className="head-hat-text">{hat.name}</h2>

						<div className="image-container">

							<img className="hat-image"
								src={hat.image} /></div>

						<div className="price-container-hat">
							<p>{hat.price} Kr</p>
						</div>
					</div>
				)) : null}
			</ul>
		</section>
	)
}

export default Products

