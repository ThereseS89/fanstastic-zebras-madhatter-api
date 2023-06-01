import { getProducts } from "../../ApiFunctions/getProducts";
import { useState } from "react";
import { useEffect } from "react";
import './adminProducts.css'
import deleteProduct from "../../ApiFunctions/deleteProduct";


const AdminProducts = () => {
	const [hats, sethats] = useState([])

	useEffect(() => {
		// loadProducts()
		async function fetchData() {
			const hatsData = await getProducts();
			sethats(await hatsData)
		}
		fetchData()
	}, []);
	console.log(hats)

const handleDelete = async (productId) => {
	await deleteProduct(productId)
}

	return (

		
		<section className="admin-product-container">
			<form >
				<h3>Lägg till ny produkt</h3>
				<label htmlFor="name">Produktnamn</label>
				<input 
					type="text"
					id="name"
				 />
				<label htmlFor="price">Pris</label>
				<input 
					type="text"
					id="price" />
				<label htmlFor="picture">Bild</label>
				<input 
					type="text"
					id = "picture" />
				<label htmlFor="tags">Taggar</label>
				<input 
					type="text"
					id="tags" />
					<button>Lägg till</button>
			</form>
		<h3>Websidans alla produkter</h3>
		<ul className="hats-list">

				{hats && hats.length > 0 ? hats.map((hat, i) => (

					<div
						className="hat-container"
						key={i}>

						<h2 className="head-hat-text">{hat.name}</h2>
						<p>{hat.tags.join(" ")}</p>
						<div className="image-container">

							<img className="hat-image"
								src={hat.image} /></div>

						<div className="price-container-hat">
							<p>{hat.price} Kr</p>
						</div>
						<div className="hat-button-container">
						<button onClick={() => handleDelete(hat.id)}>Ta bort</button>
						<button>Ändra</button>
						</div>
					</div>
				)) : null}
			</ul>
		</section>
	)
}

export default AdminProducts