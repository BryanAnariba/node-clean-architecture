console.log('Inicio de programa');

setTimeout( () => {
  console.log('Primer Timeout');
}, 3000 );


setTimeout( () => {
  console.log('Segundo Timeout');
}, 1 );


setTimeout( () => {
  console.log('Tercer Timeout');
}, 0 );


console.log('Fin de programa');

/*
  Esto es codigo, este es el orden de ejecucion
  console.log('Inicio de programa');
  console.log('Fin de programa');
  console.log('Segundo Timeout');
  console.log('Tercer Timeout');
  console.log('Primer Timeout');
*/