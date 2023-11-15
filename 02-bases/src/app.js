// const { emailTemplate } = require('./js-foundation/01-template');
// require('./js-foundation/02-destructuring');
// const { getUserById } = require('./js-foundation/03-callbacks');
const { getUserByIdArrowFunction } = require('./js-foundation/04-arrows');

// console.log(emailTemplate);

getUserByIdArrowFunction(1, (err,user) => {
  if (err) {
    throw new Error(`${err}`);
  }
  getUserByIdArrowFunction(2, (err,user2) => {
    if (err) {
      throw new Error(`${err}`);
    }
    console.log({user, user2});
  });
});
