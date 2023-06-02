import { getProducts } from "../../ApiFunctions/getProducts";
import { useState } from "react";
import { useEffect } from "react";
import './adminProducts.css'
import deleteProduct from "../../ApiFunctions/deleteProduct";
import { editProduct } from "../../ApiFunctions/putProducts";


const AdminProducts = () => {
	const [hats, sethats] = useState([])
	const [editProductId, setEditProductId] = useState(null)
	const [editedPrice, setEditedPrice] = useState(0)
	const [editedName, setEditedName] = useState('')
	const [editedImage, setEditedImage] = useState('')
	const [editedTags, setEditedTags] = useState([])


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
// function handleInputChange(event) {
// 	const { name, value } = event.target;
// 	if (name === 'name') {
// 		setEditedName(value)
// 	}  else if (name === 'price') {
// 		setEditedPrice(value);
// 	} else if (name === 'image') {
// 		setEditedImage(value);
// 	} else if (name === 'tags') {
// 		setEditedTags(value);
// 	}
// }

const handleEdit = (productId) => {
	setEditProductId(productId)
	const selectedProduct = hats.find((hat) => hat.id === productId)
	setEditedName(selectedProduct.name);
	setEditedPrice(selectedProduct.price);
    setEditedImage(selectedProduct.image);
    setEditedTags(selectedProduct.tags);

}

const handleCancelEdit = () => {
	setEditProductId(null)
	setEditedName('')
	setEditedPrice(0)
	setEditedImage('')
	setEditedTags([])
}

const handleSubmitEdit = async (productId, event) => {
	event.preventDefault();
	await editProduct(editedName, Number(editedPrice), editedImage, editedTags, productId)
	console.log('handleSubmit: Koden körs 1')

	const hatsData = await getProducts()
	sethats(await hatsData)

	setEditProductId(null)

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
								
							<div>
							<input
								type="text"
								value={editedName}
								onChange={(e) => setEditedName(e.target.value)}/>
							<input
								type="text"
								value={editedImage}
								onChange={(e) => setEditedImage(e.target.value)}
							/>
							<input
								type="text"
								value={editedPrice}
								onChange={(e) => setEditedPrice(e.target.value)}
							/>
							<input
								type="text"
								value={editedTags}
								onChange={(e) => setEditedTags(e.target.value)}
							/>
							<button type="button" onClick={(event) => handleSubmitEdit(hat.id, event)}>Spara</button>
							<button type="button" onClick={handleCancelEdit}>Avbryt</button>
						</div>
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