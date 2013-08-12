var AWS = require('aws-sdk');
var restify = require('restify');
var strftime = require('strftime')

AWS.config.loadFromPath('credentials.json');
AWS.config.update({region: 'ap-southeast-2'});

var dynamodb = new AWS.DynamoDB();

function respondPost(req, res, next) {
    params = {
        TableName: 'mm_userdata',
        Item: {
            'id': {  N: req.params.id },
            'timestamp': { S: strftime('%F %T', new Date())},
            'project': {S: req.params.project},
            'data': {  S: JSON.stringify(req.body) }
        }
    };
    dynamodb.putItem(params, function (err, data) {
        if (err) {
            console.log(err, data);
        }
    });

    console.log(req.body);
    res.send(202);
    return next();
}

var server = restify.createServer();

server.use(restify.bodyParser({ mapParams: false }));

server.post('/mm/:id/:project', respondPost);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});