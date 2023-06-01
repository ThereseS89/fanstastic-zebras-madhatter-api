import {createBrowserRouter} from "react-router-dom"
import Root from "./routes/Root.jsx"
import Admin from './routes/Admin/admin.jsx'
import AdminProducts from "./routes/Admin/adminProducts.jsx"
import AdminUsers from "./routes/Admin/adminUsers.jsx"
import Products from './routes/products/products.jsx'


const router = createBrowserRouter ([


    {
        path: '/',
        element: <Root/>,
		children: [
			{
				path: 'products',
				element: <Products/>
			},
			{
				path: 'admin',
				element: <Admin/>,
				children: [ 
					{
						path: 'products',
						element: <AdminProducts />
					}, 
					{
						path: 'users',
						element: <AdminUsers />
					}

				]
			}
		]

    }
])


export {router}