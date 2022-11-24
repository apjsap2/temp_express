const express = require('express')
const path = require('path')
const app = express()
const ejsMate = require('ejs-mate')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.engine('ejs', ejsMate)

app.get('/', (req, res) => {
	res.render('home')
})

app.get('/article11230901', (req, res) => {
	res.render('./articles/article11230901')
})



 

app.listen(3000, () => {
	console.log('Express listening on port 3000 now')
})