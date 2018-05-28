const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('../config/register');
const login = require('../config/login');
const checkToken = require('../config/check_token');
const profile = require('../config/profile');
const config = require('../config/config');

var User = require('../models/user');

//userRouter
const express = require('express');
const userRouter = express.Router();

//login
userRouter.get('/login', (req, res) => {

	const credentials = auth(req);

	if (!credentials) {
		res.status(400).json({ message: 'Request inválido. Utilizar Basic Auth para os parâmetros.' });
	} else {
		login.loginUser(credentials.name, credentials.pass)
		.then(result => {
			const token = jwt.sign(result, config.secret, { expiresIn: '8760h' });
			res.status(result.status).json({ message: result.message, token: token });
		})
		.catch(err => res.status(err.status).json({ message: err.message }));
	}
});

//signup
userRouter.post('/signup', (req, res) => {
	const name = req.body.name;
	const username = req.body.username;
	const password = req.body.password;
	const sede = req.body.sede;

	if (!name || !username || !password || !name.trim() || !username.trim() || !password.trim()) {
		res.status(400).json({message: 'Request inválido. Deve conter name, username e password.'});
	} else {
		register.registerUser(name, username, password, sede)
		.then(result => {
			res.setHeader('Location', '/users/'+username);
			res.status(result.status).json({ message: result.message })
		})
		.catch(err => res.status(err.status).json({ message: err.message }));
	}
});

//usuarios ativos
userRouter.get('/usuarios', (req,res) => {
		User.find({ativo: true}).select('username name sede -_id')
        .then((user) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(user);
        }, (err) => next(err))
        .catch(err => res.status(err.status).json({ message: err.message }));	
});

userRouter.use(checkToken);

//usuarios todos
userRouter.get('/usuarios/todos', (req,res) => {
	User.find().select('-hashed_password')
	.then((user) => {
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		res.json(user);
	}, (err) => next(err))
	.catch(err => res.status(err.status).json({ message: err.message }));
});

//profile
userRouter.get('/profile', (req,res) => {
	profile.getProfile(req.user.username)
	.then(result => res.json(result))
	.catch(err => res.status(err.status).json({ message: err.message }));
});

//error handlers
userRouter.use(authenticationErrorHandler);
userRouter.use(genericErrorHandler);

//router export
module.exports = userRouter;

//error handlers functions
function authenticationErrorHandler(err, req, res, next){
  if (err.message === "Usuário não autenticado") {
    res.status(401).json({message: err.message});
    return;
  }
  next(err);
}

function genericErrorHandler(err, req, res, next){
  console.log(err.message);
  res.status(500).json({
    message: 'Erro interno!',
  });
  next();
}
