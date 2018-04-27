isLoggedIn = require("./is_logged_in.js")

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
    app.get('/profile', isLoggedIn, function (req, res) {       
        res.json({         
            "usuario": req.user.perito.usuario,         
            "nome": req.user.perito.nome,         
            "sede": req.user.perito.sede,         
            "ativo": req.user.perito.ativo       
        });     
    });     
    // =====================================     
    // LOGOUT ==============================     
    // =====================================     
    app.get('/logout', function (req, res) {         
        res.json({mensagem: "Usuário "+ req.user.usuario + " fez logout"});         
        req.logout();     
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

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    throw new Error("Usuário não autenticado")
}