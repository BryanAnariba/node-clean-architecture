import http2 from 'node:http2';
import fs from 'node:fs';

/*
  Como generar un certificado
  Primero debes crear la variable de entorno esto esta en la carpeta C:\Program Files\Git\usr\bin pegar esto en path variables de entorno despues ejecutar lo de abajo
  openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
*/

// http con ssl y es util para por ejemplo a la hora de consumir peticiones desde ios app o android sin esto no podras hacer peticiones
const server = http2.createSecureServer(
  {key: fs.readFileSync('./keys/server.key'), cert: fs.readFileSync('./keys/server.crt')},
  (req, res) => {
  console.log(req.url);

  // res.writeHead(200, {
  //   'Content-Type': 'text/html'
  // });
  // res.write('<h1>Hello World!</h1>');
  // res.end();

  // const user = { name: 'John Doe', age: 30, city: 'New York' };
  // res.writeHead(200, {'Content-Type': 'application/json'});
  // res.end(JSON.stringify(user));

  if (req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(htmlFile);
    return;
  }

  if (req.url?.endsWith('.js')) {
    res.writeHead(200, {'Content-Type': 'application/javascript'});
  } else if (req.url?.endsWith('.css')) {
    res.writeHead(200, {'Content-Type': 'text/css'});
  }
  try {
    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent);
  } catch (error) {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end();
  }
});

server.listen(8080, () => {
  console.log('Server running on port: ' + 8080);
});