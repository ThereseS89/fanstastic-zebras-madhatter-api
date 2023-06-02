import { getProducts } from "../../ApiFunctions/getProducts";
import { useState } from "react";
import { useEffect } from "react";
import './adminProducts.css'
import deleteProduct from "../../ApiFunctions/deleteProduct";
import addProduct from "../../ApiFunctions/addProduct";


const AdminProducts = () => {
	const [hats, sethats] = useState([])
	const [image, setImage] = useState('')
	const [name, setName] = useState('')
	const [price, setPrice] = useState()
	const [tags, setTags] =useState([])


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

const handleAddProduct = async(event) => {
	event.preventDefault()
	console.log('click');
	const tagsArray = tags.split(',').map( tag => tag.trim())
	const priceAsNumber = Number(price)
	try { await addProduct(name, priceAsNumber, image, tagsArray )
			console.log('Produkten tillagd');
			if(addProduct){
				const hatsData = await getProducts()
    			sethats(await hatsData)
			}
			} catch (error) {
				console.log('Något gick fel');
			}
		
}

	return (

		
		<section className="admin-product-container">
			<form >
				<h3>Lägg till ny produkt</h3>
				<label htmlFor="name">Produktnamn</label>
				<input 
					type="text"
					id="name"
					value={name}
					onChange={e => setName(e.target.value)}
				 />
				<label htmlFor="price">Pris</label>
				<input 
					type="number"
					id="price"
					value={price}
					onChange={e => setPrice(e.target.value)} 
				/>
				
				<label htmlFor="image">Bild</label>
				<input 
					type="text"
					id = "image"
					value={image}
					onChange={e => setImage(e.target.value)} 
				/>
				<label htmlFor="tags">Taggar</label>
				<input 
					type="text"
					id="tags"
					placeholder="Separera taggarna med kommatecken"
					value={tags}
					onChange={e => setTags(e.target.value)} 
					/>
					<button onClick={handleAddProduct}>Lägg till</button>
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