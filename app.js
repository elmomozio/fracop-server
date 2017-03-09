const express = require('express');
const app = express();
const elasticService = require('./elasticService');

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/status', function(req, res) {
    elasticService.status().then(() => res.send('OK')).catch((err) => res.send(404));
});

app.get('/', function(req, res, next) {
    elasticService.init().then((resp) => res.send(resp)).catch(next);
});

app.post('/search', function(req, res, next) {
    elasticService.search(req.body.cp).then((resp) => res.send(resp)).catch(next);
});


app.listen(process.env.PORT || 3333, function() {
    console.log('Example app listening on port ' + (process.env.PORT || '3333'));
});