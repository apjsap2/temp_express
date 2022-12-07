const express = require('express')
const path = require('path')
const app = express()
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 8001;


//   이하 mongoDB연결관련 코드. 추후 atlas connection string으로 대체 해야함
const Comment = require('./models/comment')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/temp_express')
	.then(() => {
		console.log('MONGO CONNECTION OPEN!!')
	})
	.catch(err => {
		console.log('OH NO, mongo ERROR!!')
		console.log(err)
	})

//   이상 mongoDB연결 관련 코드. 추후 atlas connection string으로 대체 해야함


//   이하  local-data.js에서 더미 정보 가져오기
const {articles} = require('./local-data.js')
// const { debug } = require('console')
// const {comments} = require('./local-data.js')    -> db 설정 했으므로 dismiss
//   이상  local-data.js에서 더미 정보 가져오기


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.engine('ejs', ejsMate)
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
	const cssUrl = 'none'
	res.render('index', {cssUrl})
})


app.get('/apps/comments/:id/edit', async (req, res) => {
	const { id } = req.params
	const cssUrl = '/css/new.css'
	const comment = await Comment.findById(id)
	res.render(`comments/edit`, {cssUrl, comment})
})

app.put('/apps/comments/:id', async (req, res) => {
	const {id} = req.params
	await Comment.findByIdAndUpdate(id, {comment: req.body.comment, user: req.body.user, date: req.body.date})
	res.redirect('/apps/comments') // redirect 주의!! render와 다르게 ejs 파일 경로가 아니라 라우트 경로!!!!
})

app.delete('/apps/comments/:id', async (req, res) => {
	const {id} = req.params
	await Comment.findByIdAndDelete(id)
	res.redirect('/apps/comments')
})

app.get('/apps/comments/new', (req, res) => {
	const cssUrl = '/css/new.css'
	res.render('comments/new', {cssUrl})
})

app.get('/apps/comments', async (req, res) => {
	const cssUrl = '/css/comments.css'
	const comments = await Comment.find({})
	res.render(`comments/comments`, {cssUrl, comments})
})

app.get('/apps/basiccardgame', (req, res) => {
	const cssUrl = '/css/basiccardgame.css'
	res.render('basiccardgame/basiccardgame', {cssUrl})
})



app.post('/apps/comments', async (req, res, next) => {
	const comment = req.body.comment
	const user = req.body.user
	const date = req.body.date
	const newComment = new Comment({comment: comment, user: user, date: date})
	await newComment.save()

	res.redirect('/apps/comments')
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