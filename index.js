const express = require('express')
const path = require('path')
const app = express()
const ejsMate = require('ejs-mate')
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.engine('ejs', ejsMate)

app.get('/', (req, res) => {
	const cssUrl = './css/home.css'
	res.render('home', {cssUrl})
})

app.get('/article11230901', (req, res) => {
	const cssUrl = './css/article11230901.css'
	res.render('./articles/article11230901', {cssUrl})
})


app.get('/articles', (req, res) => {
	const cssUrl = './css/home.css'
	res.render('./category/articles', {cssUrl})
})
 
app.get('/articles/:id', (req, res) => {
	const articleUrl = req.params
	res.render(`./articles/${articleUrl}`)
})

app.listen(PORT, () => {
	console.log(`Express listening on port ${PORT} now`)
})