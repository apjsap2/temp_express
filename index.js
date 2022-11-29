const express = require('express')
const path = require('path')
const app = express()
const ejsMate = require('ejs-mate')
const PORT = process.env.PORT || 3000;


//   이하 mongoDB Atlas 연결 관련 코드

const mongoose = require('mongoose')
// mongoose.connect('mongodb+srv://apjsap:!ab1988127@cluster0.gcuka.mongodb.net/?retryWrites=true&w=majority')
// 	.then(() => {
// 		console.log('MONGO CONNECTION OPEN!!')
// 	})
// 	.catch(err => {
// 		console.log('OH NO, mongo ERROR!!')
// 		console.log(err)
// 	})

//   이상 mongoDB Atlas 연결 관련 코드


//   이하  local-data.js에서 더미 정보 가져오기
const {articles} = require('./local-data.js')
const {comments} = require('./local-data.js')
//   이상  local-data.js에서 더미 정보 가져오기


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.engine('ejs', ejsMate)

app.get('/', (req, res) => {
	const cssUrl = 'none'
	res.render('index', {cssUrl})
})


app.get('/apps/comments/new', (req, res) => {
	const cssUrl = '/css/new.css'
	res.render('comments/new', {cssUrl})
})

app.get('/apps/comments', (req, res) => {
	const cssUrl = '/css/comments.css'
	res.render(`comments/comments`, {cssUrl, comments})
})

app.get('/apps', (req, res) => {
	const cssUrl = '/css/apps.css'
	res.render(`category/apps`, {cssUrl})
})

app.get('/articles/:id', (req, res) => {
	const id = req.params.id
	const cssUrl = `/css/${id}.css`
	res.render(`articles/${id}`, {cssUrl})
})

app.get('/articles', (req, res) => {
	const cssUrl = '/css/articles.css'
	res.render('category/articles', {cssUrl, articles})
})
 


app.listen(PORT, () => {
	console.log(`Express listening on port ${PORT} now`)
})