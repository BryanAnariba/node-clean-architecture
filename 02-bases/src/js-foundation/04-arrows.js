const users = [{id: 1, name: 'Bryan'}, {id: 2, name: 'Ariel'}];

const getUserByIdArrowFunction = (id, callback) => {
  const user = users.find(user => user.id === id );
  if (!user) {
    return callback(`USER not found with id ${id}`);
  }
  return callback(null, user);
}

module.exports = {getUserByIdArrowFunction,}