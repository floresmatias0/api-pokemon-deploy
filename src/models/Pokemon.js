const { DataTypes } = require('sequelize');

// const { conn } = require('../db')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) =>{
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
    },
    strength:{
      type: DataTypes.INTEGER,
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    heigth: {
      type: DataTypes.INTEGER,
    },
    weigth: {
      type: DataTypes.INTEGER,
    },
    img:{
      type: DataTypes.STRING,
    },
    types:{
      type: DataTypes.ARRAY(DataTypes.STRING),
    }   
  },{
    timestamps: false,
  });
} 