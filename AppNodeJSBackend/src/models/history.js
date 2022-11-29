'use strict';
const { BOOLEAN } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    
    static associate(models) {
      
    }
  };
  History.init({
    patientId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    file: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};