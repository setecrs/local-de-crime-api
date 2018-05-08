module.exports = function (app) {
  app.get('/healthcheck', function(req, res) {
    res.json({healthcheck: "OK"})
  })
}
