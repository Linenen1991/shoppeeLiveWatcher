var http = require('http'),
    https = require('https'),
    fs = require('fs');
const url = require('url');


var ID = '';
http.createServer(function(request, response) {
	const queryObject = url.parse(request.url,true).query;
  	console.log(queryObject);
    if(request.url == '/test' )
    {
    https.get('https://live.shopee.tw/api/v1/session/' + ID, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
            response.writeHeader(200, {"Content-Type": "application/json"});
response.write(data);
    console.log(data);
            response.end();

  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

    }
    else{
    ID = queryObject['ID'];
	fs.readFile('./index.html','utf8', function (err, shtml) {
	    if (err) {
        	shtml = "err";
	    	}
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(shtml);
        response.end();
	})}
    }).listen(8000);
