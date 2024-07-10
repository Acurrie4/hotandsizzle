const bcrypt = require('bcrypt');

const seedUsers = [
  {
    userName: 'chefjohn',
    passWord: bcrypt.hashSync('password123', bcrypt.genSaltSync(10)),
    name: 'John Doe'
  },
  {
    userName: 'bakerbeth',
    passWord: bcrypt.hashSync('password123', bcrypt.genSaltSync(10)),
    name: 'Beth Smith'
  },
  {
    userName: 'johnDoe',
    passWord: bcrypt.hashSync('password123', bcrypt.genSaltSync(10)),
    name: 'John Doe'
  },
  {
    userName: 'janeSmith',
    passWord: bcrypt.hashSync('password456', bcrypt.genSaltSync(10)),
    name: 'Jane Smith'
  },
  {
    userName: 'sara_jones',
    passWord: bcrypt.hashSync('user789', bcrypt.genSaltSync(10)),
    name: 'Sara Jones'
  },
  {
    userName: 'alex_wilson',
    passWord: bcrypt.hashSync('password1234', bcrypt.genSaltSync(10)),
    name: 'Alex Wilson'
  },
  {
    userName: 'emily_brown',
    passWord: bcrypt.hashSync('securePassword567', bcrypt.genSaltSync(10)),
    name: 'Emily Brown'
  }
];

module.exports = seedUsers;