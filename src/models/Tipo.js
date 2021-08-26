const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// const { conn } = require('../db')
 // defino el modelo
module.exports = (sequelize) =>{  
   sequelize.define('tipo', {
    name: {
      type: DataTypes.STRING,
    },
  },{
    timestamps: false
  });
}
 
