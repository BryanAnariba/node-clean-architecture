// const { emailTemplate } = require('./js-foundation/01-template');
// require('./js-foundation/02-destructuring');
// const { getUserById } = require('./js-foundation/03-callbacks');
// const { getUserByIdArrowFunction } = require('./js-foundation/04-arrows');
// const {getUUID, getAge} = require('./plugins/index');
// const { buildMakePerson } = require('./js-foundation/05-factory-fn');
// const { getPokemonById } = require("./js-foundation/06-promises");

const { buildLogger } = require("./plugins");

// console.log(emailTemplate);


// Patron Adaptador y Factory Functions
// const makePerson = buildMakePerson({getUUID, getAge});
// const bryan = makePerson({name: 'Bryan', birthDate:'1999-02-20'});
// console.log(bryan);

// Promises async await
// getPokemonById(4)
//   .then((pokemon) => console.log({pokemon}))
//   .catch(error => console.log(error));

// Uso de winston el logger
const logger = buildLogger('app.js');
logger.log('Test Winston Logger');
logger.error('Test Error Winston')