var express = require('express')
var app = express()
app.set('port', process.env.PORT || 3000)
app.use(express.static('static'))
app.get('*', (req, res) => {
  res.redirect('/404')
})
app.listen(app.get('port') || 3000, () => {
  console.info('==> 🌎  Go to http://localhost:%s', app.get('port'))
})