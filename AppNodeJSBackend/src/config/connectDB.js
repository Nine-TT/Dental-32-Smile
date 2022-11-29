const { Sequelize } = require('sequelize');
//xampp: book_an_appointment
//workben: 
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(`dental_32_smile`, 'root', '2002', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = connectDB;