const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('../config/register');
const login = require('../config/login');
const checkToken = require('../config/check_token');
const profile = require('../config/profile');
const config = require('../config/config');
const path = require('path');

var User = require('../models/user');

//userRouter
const express = require('express');
const userRouter = express.Router();

//login
userRouter.get('/login', (req, res) => {
	
	const credentials = auth(req);
	
	if (!credentials) {
		console.log("credencias nao chegaram.");
		res.status(400).json({ message: 'Request inválido. Utilizar Basic Auth para os parâmetros.' });
	} else {
		login.loginUser(credentials.name, credentials.pass)
		.then(result => {
			const token = jwt.sign(result, config.secret, { expiresIn: '2h' });
			res.status(result.status).json({ message: result.message, token: token });
		})
		.catch(err => res.status(err.status).json({ message: err.message }));
	}
});

//WEB
userRouter.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/website/'));
});

userRouter.get('/bootstrap/css/bootstrap.min.css', (req, res) => {
	res.sendFile(path.join(__dirname + '/website/bootstrap/css/bootstrap.min.css'));
});

userRouter.get('/jquery.min.js', (req, res) => {
	res.sendFile(path.join(__dirname + '/website/jquery.min.js'));
});

userRouter.get('/script.js', (req, res) => {
	res.sendFile(path.join(__dirname + '/website/script.js'));
});

userRouter.get('/logo.png', (req, res) => {
	res.sendFile(path.join(__dirname + '/website/logo.png'));
});
userRouter.get('/bootstrap/js/bootstrap.min.js', (req, res) => {
	res.sendFile(path.join(__dirname + '/website/bootstrap/js/bootstrap.min.js'));
});

userRouter.get('/favicon.ico', (req, res) => {
	res.sendFile(path.join(__dirname + '/website/favicon.ico'));
});


//web main
userRouter.get('/main', (req, res) => {
	res.sendFile(path.join(__dirname + '/website/main/'));
});

userRouter.get('/mainScript.js', (req, res) => {
	res.sendFile(path.join(__dirname + '/website/main/mainScript.js'));
});

//Gerenciamento de dados
userRouter.use(checkToken);

//signup
userRouter.post('/signup', (req, res) => {
	if(req.user.username === "admin"){
		const name = req.body[0].name;
		const username = req.body[1].username;
		const password = req.body[2].password;
		const email = req.body[3].email;
		
		if (req.body.email === "null") email = "";

		if (!name || !username || !password || !name.trim() || !username.trim() || !password.trim()) {
			res.status(400).json({message: 'Request inválido. Deve conter name, username e password.'});
		} else {
			register.registerUser(name, username, password, email)
			.then(result => {
				res.status(result.status).json({ message: result.message })
			})
			.catch(err => res.status(err.status).json({ message: err.message }));
		}	
	} else {
		res.status(401).json({
			message: 'Erro interno!',
		  });
	}
});

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
