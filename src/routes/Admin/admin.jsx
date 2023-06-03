import { Link, Outlet } from "react-router-dom"
import './admin.css'


const Admin = () => {

	return (
		<section className="admin-choices-container">
			<h2>Välkommen till adminsidan</h2>
			<p className="choice-heading">Välj mellan följande val:</p>
			<div className="admin-links">
			<Link to="products">Produkter</Link>
			<Link to="users">Användare</Link>
		</div>
		<Outlet />

		</section>

	)
}

export default Admin