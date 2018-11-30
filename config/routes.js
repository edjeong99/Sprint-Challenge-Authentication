const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig.js');

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  // server.get('/api/jokes', authenticate, getJokes);
  server.get('/api/jokes',  getJokes);
  server.get('/api/users', getUsers);
};

function register(req, res) {
  // implement user registration
  const newUser = req.body;
  newUser.password = bcrypt.hashSync(newUser.password, 3);

  db('users')
  .insert(newUser)
  .then( id => res.status(200).json(id))
  .catch(err => res.status(500).json({message:"could not register the user", err}))

}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
const getUsers = (req, res, next) => {

  db('users')
      .select('*')
      .then(users =>{res.status(200).json(users)})
      .catch((err)=>
res.status(500).json({ message: 'could not get users', err }))
};
