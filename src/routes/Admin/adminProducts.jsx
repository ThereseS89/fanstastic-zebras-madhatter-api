import { getProducts } from "../../ApiFunctions/getProducts";
import { useState } from "react";
import { useEffect } from "react";
import './adminProducts.css'
import deleteProduct from "../../ApiFunctions/deleteProduct";
import { editProduct } from "../../ApiFunctions/putProducts";


const AdminProducts = () => {
	const [hats, sethats] = useState([])
	const [editedData, setEditedData] = useState({name: '', price: 0, image: '', tags: []});
	const [editProductId, setEditProductId] = useState(null)

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

// Här kommer funktioner som har med PUT funktioner -- ändra en produkt
function handleInputChange(event) {
	const { name, value } = event.target;
	setEditedData({ ...editedData, [name]: value
	})
}

const handleEdit = (productId) => {
	setEditProductId(productId)
}

const handleCancelEdit = () => {
	setEditProductId(null)
	setEditedData({name: "", price: 0, image: "", tags: []})
}

const handleSubmitEdit = async (productId, event) => {
	await editProduct(editedData.name, editedData.price, editedData.image, editedData.tags, productId)
	event.preventDefault()
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
							{editProductId === hat.id ? (
								
									<form onSubmit={editProduct()}>
							<input
								type="text"
								name="name"
								value={editedData.name}
								onChange={handleInputChange}
							/>
							<input
								type="text"
								name="image"
								value={editedData.image}
								onChange={handleInputChange}
							/>
							<input
								type="text"
								name="price"
								value={editedData.price}
								onChange={handleInputChange}
							/>
							<button type="submit" onClick={handleSubmitEdit}>Spara</button>
							<button type="button" onClick={handleCancelEdit}>Avbryt</button>
						</form>
							) : ( 
							<div>

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
						
						<button type="submit"
						onClick={() => handleEdit(hat.id)}>Ändra</button>
						</div>
						</div>
							)}
					</div>
				)) : null}
			</ul>
		</section>
	)
}

export default AdminProducts