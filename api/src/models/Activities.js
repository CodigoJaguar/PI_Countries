const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activities', {
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ID : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement:true,
    },
    Dificultad: {
      type : DataTypes.ENUM(['1','2','3','4','5']),
      allowNull : false,
    },
    Duracion : {
      type : DataTypes.STRING,
      allowNull : false,
    },
    Temporada : {
      type : DataTypes.ENUM(['Summer', 'Fall', 'Winter' , 'Spring']),
      allowNull : false,
    },
   
  },{ timestamps: false });
};
