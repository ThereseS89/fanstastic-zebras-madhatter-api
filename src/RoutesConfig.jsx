import {createHashRouter} from "react-router-dom"
import Root from "./routes/Root.jsx"


const router = createHashRouter ([


    {
        path: '/',
        element: <Root/>

    }
])


export {router}