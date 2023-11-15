const users = [{id: 1, name: 'Bryan'}, {id: 2, name: 'Ariel'}];

function getUserById (id, callback) {
  const user = users.find(function (user) {
    return user.id === id
  });
  
  if (!user) {
    return callback(`USER not found with id ${id}`);
  }

  return callback(null, user);
}

module.exports = {getUserById,}