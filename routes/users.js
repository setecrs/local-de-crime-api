const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('../register');
const register = require('../register');
const login = require('../login');
const checkToken = require('../routes/check_token');
const profile = require('../profile');
const password = require('../password');
const config = require('../config/config.json');

module.exports = router => {

	router.get('/login', (req, res) => {

		const credentials = auth(req);

		if (!credentials) {
			res.status(400).json({ message: 'Request inválido. Utilizar Basic Auth para os parametros' });
		} else {
			login.loginUser(credentials.name, credentials.pass)
			.then(result => {
				const token = jwt.sign(result, config.secret, { expiresIn: 1440 });
				res.status(result.status).json({ message: result.message, token: token });
			})
			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	router.post('/signup', (req, res) => {
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;

		if (!name || !email || !password || !name.trim() || !email.trim() || !password.trim()) {
			res.status(400).json({message: 'Request inválido. Deve conter nome, email e senha'});
    } else {
			register.registerUser(name, email, password)
			.then(result => {
				res.setHeader('Location', '/users/'+email);
				res.status(result.status).json({ message: result.message })
			})
			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

  router.get('/profile', (req,res) => {
		if (user = checkToken(req)) {

			profile.getProfile(user.email)
			.then(result => res.json(result))
			.catch(err => res.status(err.status).json({ message: err.message }));
		} else {
			res.status(401).json({ message: 'Token inválido' });
		}
  });

  router.use(authenticationErrorHandler)
  router.use(genericErrorHandler)
};

function authenticationErrorHandler(err, req, res, next){
  if (err.message === "Usuário não autenticado") {
    res.json({message: err.message})
    return
  }
  next(err)
}

function genericErrorHandler(err, req, res, next){
  console.log(err.message)
  res.json({
    message: 'erro interno',
  })
  next()
}
