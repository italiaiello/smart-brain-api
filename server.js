const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');


const register = require('./Controllers/Register');
const signin = require('./Controllers/Signin');
const profile = require('./Controllers/Profile');
const image = require('./Controllers/Image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'andrew',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send(database.users);})
app.post('/signin', signin.handleSignin(db, bcrypt))   
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})