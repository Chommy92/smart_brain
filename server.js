// npm install nodemon --save-dev
//npm install express --save
//npm install body-parser
/*
npm install bcrypt-nodejs (it is used to create a secure login)
*/
//npm install knex
//npm install pg

const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//for controllers import
const Register = require('./controllers/Register');
const SignIn = require('./controllers/SignIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//to connect database to server
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'chommy',
    database : 'smart_brain'
  }
});
  
const app = express();

// for body-parser
app.use(express.json());

//for password
app.use(cors());

//for server
app.get('/', (req, res) =>{ res.json(database.users) })

app.post('/SignIn', (req, res) =>{SignIn.handleSignIn(req, res, db, bcrypt)})

app.post('/Register', (req, res) => {Register.handleRegister(req, res, db, bcrypt)})
	

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, () =>{
	console.log('app is running on port 3000');
});