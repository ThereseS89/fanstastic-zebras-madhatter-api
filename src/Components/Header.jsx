import { NavLink } from "react-router-dom"
import './Header.css' 

const Header = () => {
	return (
		<div className="header">

		<h1>MAD HATTER</h1>
		<nav>
			<NavLink to="products">Hattar</NavLink>
			<NavLink to="admin">Admin</NavLink>
			
		</nav>
		</div>
	)
}

export default Header