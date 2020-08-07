// For node
// Npm init -y (init package.json)
// Npm install express(will add all the node modules)
// npm install --save-dev nodemon
// Npm install body-parser
// Npm install crypt
// npm install cors
//npm start


const express =require('express');
const bodyparser =require('body-parser');
var cors = require('cors')
const bcrypt = require('bcrypt-nodejs');
const app = express();
const knex =require('knex')

const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');
const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'ranjeetmallipeddi',
    password : '',
    database : 'facerecognition'
  }
});

// db.select('*').from ('users').then(data=>{
//     console.log(data);
// });
//for using parser
// app.use(express.urlencoded({extended: false}));
app.use(cors())
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('it is working');
})
//signin
app.post('/signin',(req, res)=>{signin.handleSignIn(req, res, db, bcrypt)})

//register
app.post('/register',(req, res)=>{register.handleRegister(req, res, db, bcrypt)})
//profile
app.get('/profile/:id',(req, res)=>{profile.handleProfile(req, res, db)})

//image which updates the entiries
app.put('/image',(req, res)=>{image.handleImage(req, res, db)})
app.post('/imageurl',(req, res)=>{image.handleApiCall(req, res)})


//sync
// var hash = bcrypt.hashSync("bacon");
//
// bcrypt.compareSync("bacon", hash); // true
// bcrypt.compareSync("veggies", hash); // false
//async
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });
//
// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

//port no of the server
app.listen(process.env.PORT || 8000,()=>{
    console.log(`app is running on port ${process.env.PORT}`)
});
