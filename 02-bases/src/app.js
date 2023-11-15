// const { emailTemplate } = require('./js-foundation/01-template');
// require('./js-foundation/02-destructuring');
// const { getUserById } = require('./js-foundation/03-callbacks');
// const { getUserByIdArrowFunction } = require('./js-foundation/04-arrows');
// const {getUUID, getAge} = require('./plugins/index');
// const { buildMakePerson } = require('./js-foundation/05-factory-fn');

const { getPokemonById } = require("./js-foundation/06-promises");

// console.log(emailTemplate);

// getUserByIdArrowFunction(1, (err,user) => {
//   if (err) {
//     throw new Error(`${err}`);
//   }
//   getUserByIdArrowFunction(2, (err,user2) => {
//     if (err) {
//       throw new Error(`${err}`);
//     }
//     console.log({user, user2});
//   });
// });

// Patron Adaptador y Factory Functions
// const makePerson = buildMakePerson({getUUID, getAge});
// const bryan = makePerson({name: 'Bryan', birthDate:'1999-02-20'});
// console.log(bryan);

getPokemonById(4)
  .then(pok => console.log(pok))
  .catch(error => console.log(error));