const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('../config/register');
const login = require('../config/login');
const checkToken = require('../config/check_token');
const profile = require('../config/profile');
const config = require('../config/config');

//userRouter
const express = require('express');
const userRouter = express.Router();

//login
userRouter.get('/login', (req, res) => {

	const credentials = auth(req);

	if (!credentials) {
		res.status(400).json({ message: 'Request inválido. Utilizar Basic Auth para os parâmetros' });
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

	if (!name || !username || !password || !name.trim() || !username.trim() || !password.trim()) {
		res.status(400).json({message: 'Request inválido. Deve conter nome, usuário e senha'});
	} else {
		register.registerUser(name, username, password)
		.then(result => {
			res.setHeader('Location', '/users/'+username);
			res.status(result.status).json({ message: result.message })
		})
		.catch(err => res.status(err.status).json({ message: err.message }));
	}
});

//profile
userRouter.get('/profile', (req,res) => {
	if (user = checkToken(req)) {

		profile.getProfile(user.username)
		.then(result => res.json(result))
		.catch(err => res.status(err.status).json({ message: err.message }));
	} else {
		res.status(401).json({ message: 'Token inválido' });
	}
});

//error handlers
userRouter.use(authenticationErrorHandler);
userRouter.use(genericErrorHandler);

//router export
module.exports = userRouter;

//error handlers functions
function authenticationErrorHandler(err, req, res, next){
  if (err.message === "Usuário não autenticado") {
    res.json({message: err.message});
    return;
  }
  next(err);
}

function genericErrorHandler(err, req, res, next){
  console.log(err.message);
  res.json({
    message: 'Erro interno!',
  });
  next();
}
