/* 
 
   ceateServer,request, response are EventEmitters

   request, response are also streams
    

*/
const http = require('node:http');

// will work for all http requests ( GET, POST..etc)
const server = http .createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request
      .on('error', err => {
        console.error(err);
      })
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();

        response.on('error', err => {
          console.error(err);
        });

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        // response.writeHead(200, {'Content-Type': 'application/json'})

        const responseBody = { headers, method, url, body };

        response.write(JSON.stringify(responseBody));
        response.end();
        // response.end(JSON.stringify(responseBody))
      });
  })

  const PORT = 8080
  server.listen(PORT,()=>{console.log(`server is running on port ${PORT}`)});

