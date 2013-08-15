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

pool.connect(function(err, keyspace){
    if(err){
      throw(err);
    } else {
      pool.cql("select * from Users", function(err, results){
	results.forEach(function(row){
  		//all row of result
  		row.forEach(function(name,value,ts,ttl){
   		 //all column of row
    		console.log(name,value,ts,ttl);
  	   });
	});
      });
}  
});
