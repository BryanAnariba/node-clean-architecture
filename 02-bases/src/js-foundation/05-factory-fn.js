const buildMakePerson = ({getUUID, getAge}) => {
  return ({name, birthDate}) => {
    return {
      id: getUUID(),
      name: name,
      birthDate: birthDate,
      age: getAge(birthDate)
    }
  }
}

module.exports = {
  buildMakePerson,
}