const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cors=require("cors");
const http = require("http");
const { env } = require('process');

console.log(env)

app.use(express.json())

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

const server = http.createServer(app)

var userDataSchema = new Schema({
	name: String,
	fakultet : String,
	profession : String,
	address : String,
	phoneNumber : String,
	birthDate : String,
}, {collection: 'users'});

var bookDataSchema = new Schema({
	name: String,
	img: String,
	page_number: Number,
	currentNumbe: Number,
	allNumber: Number,
	about: String,
}, {collection: 'books'});


var userData = mongoose.model('UserData', userDataSchema);
var bookData = mongoose.model('BookData', bookDataSchema);


mongoose.connect(env.link)
.then(()=>{
	console.log("[CONNECTED]");
})

app.get('/', (req, res)=> {
	// res.end('Arslan Rejepow');
	userData.find()
	.then((doc)=>{
		res.json({items:doc});
	})
})

app.get('/books/', (req, res)=> {
	bookData.find()
	.then((doc)=>{
		res.contentType('application/json')
		res.json(doc);
	})
})

app.post('/addUser', (req, res) => {
	var item = new userData(req.body);
	item.save()
})

app.post('/addBook', (req, res) => {
	var item = new bookData(req.body);
	item.save()
})

server.listen(5000,()=>{console.log('Listening on port 5000')})
