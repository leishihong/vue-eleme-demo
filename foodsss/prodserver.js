var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/',function(req,res,next){
	req.url = 'index.html';
	next();
})

app.use(router);

var apiRouters = express.Router()
var appData = require('./data.json')

var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

apiRouters.get('/seller',function(req,res){
  res.json({
    errno : 0,
    data : seller
  })
})

apiRouters.get('/goods',function(req,res){
  res.json({
    errno : 0,
    data : goods 
  })
})

apiRouters.get('/ratings',function(req,res){
  res.json({
    errno : 0,
    data : ratings
  })
})

app.use('/api',apiRouters)

app.use(express.static('./dist'));

var uri = 'http://localhost:' + port
var server = app.listen(port)

module.exports = server;






