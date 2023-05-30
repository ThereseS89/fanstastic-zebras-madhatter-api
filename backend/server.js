import express from 'express'
import cors from 'cors'
import {join, dirname} from 'path'
import { fileURLToPath } from 'url'
import productsRouter from './routes/products.js'
import usersRouter from './routes/users.js'
import searchRouter from './routes/search .js'

//Konfiguerara server
const port = 2023
const app = express()

//Middleware
//-lägger vi till sen för att använda req.body 
// logger
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url} `, req.body)
	next()
})
app.use( cors() )
const __dirname = dirname(fileURLToPath(import.meta.url))
const pathToStaticFolder = join(__dirname, '../dist')
app.use(express.static(pathToStaticFolder))

app.use('/api', express.json())


//Routes 
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/search', searchRouter)

//starta
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})