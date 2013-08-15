var Moniker = require('moniker');

 var helenus = require('helenus'),
      pool = new helenus.ConnectionPool({
        hosts      : ['localhost:9160'],
        keyspace   : 'DEMO',
        user       : 'test',
        password   : 'test1233',
        timeout    : 3000
        //cqlVersion : '3.0.0' // specify this if you're using Cassandra 1.1 and want to use CQL 3
      });

  pool.on('error', function(err){
    console.error(err.name, err.message);
  });

for(var i = 0; i < 10000; i++) {


	pool.connect(function(connErr,keyspace){
        if(connErr){
            console.log(connErr);
            return;
        }
		var cql = "INSERT INTO Users (KEY, name, value) VALUES (?, ?, ?);";
		pool.cql(cql, [getRandomInt(1, 99999999), Moniker.choose(), getRandomInt(1, 100000)], function(err, results){
			console.log(err, results);
      		});

	});


}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
