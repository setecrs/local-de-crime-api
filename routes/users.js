var login = require('./login');

module.exports = function (app, passport) {

     // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login_error', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/login_error', function (req, res) {
        res.json({ error_messages: req.flash('loginMessage')[0] });
    });

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', login.isLoggedIn, function (req, res) {
      res.json({
        "usuario": req.user.usuario,
        "nome": req.user.nome,
        "sede": req.user.sede,
        "ativo": req.user.ativo
      });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', login.isLoggedIn, function (req, res) {
        var usuario = req.user.usuario;
        req.logout();
        res.json({mensagem: "Usuário "+ usuario + " fez logout"});
    });

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form

    app.get('/signup_error', function (req, res) {
        res.json({ error_messages: req.flash('signupMessage')[0] });
    });
    
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup_error', // redirect back to the signup page if there is an error
        failureFlash: true
    }));


  app.use(authenticationErrorHandler)
  app.use(genericErrorHandler)
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