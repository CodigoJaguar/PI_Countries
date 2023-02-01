const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    Nombre: {
      type: DataTypes.STRING, 
      allowNull:false,          // try to fix test :(
      validate : {
        notNull:{
          msg: 'It requires a valid name'
        }
      }
      
    },
    ID : {
      type : DataTypes.STRING(3),
      primaryKey : true,
      unique : true,
      //allowNull : false,
    },
    ImagenDeLaBandera : {
      type : DataTypes.STRING,
      defaultValue : null,
    },
    Continente : {
      type : DataTypes.STRING
    },
    Capital : {
      type : DataTypes.STRING
    },
    Subregion : {
      type : DataTypes.STRING
    },
    Area : {
      type : DataTypes.INTEGER
    },
    Poblacion : {
      type : DataTypes.INTEGER 
    }

  },{ timestamps: false });
};
