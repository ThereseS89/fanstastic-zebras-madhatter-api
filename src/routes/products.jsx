import { getProducts } from "../ApiFunctions/getProducts";
import { useState } from "react";
import { useEffect } from "react";
import './products.css'

const Products = () => {
	const [ hats, sethats] = useState([])

	
	useEffect(() => {
		// uploadProducts()
		async function fetchData() {
			const hatsData = await getProducts();
			sethats(hatsData)
		}
		fetchData()
	}, []);
		console.log(hats)
	return (
		<section>
	
		<h2 className="head-hats">Våra Hattar</h2>

		<ul className="hats-list">
			
					{hats.map((hat) => (
					
					<div
						className="hat-container"
						key={hat.id}>
						
								<h2 className="head-hat-text">{hat.name}</h2>

								<div className="image-container">	

									<img className="hat-image"
									src={hat.image}/></div>

							<div className="price-container-hat">
							<p>{hat.price} Kr</p>
							</div>
						</div>
					))}
			</ul>
		</section>
	)
}

export default Products