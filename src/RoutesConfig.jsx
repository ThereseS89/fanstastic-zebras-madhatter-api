import {createBrowserRouter} from "react-router-dom"
import Root from "./routes/Root.jsx"
import Admin from './routes/admin.jsx'
import Products from './routes/products.jsx'


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
				element: <Admin/>
			}
		]

    }
])


export {router}