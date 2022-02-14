'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.followers,{
        as: "follow",
        foreignKey:{
          name : "idUser"
        }
      })

      users.hasMany(models.following,{
        as: "following",
        foreignKey:{
          name : "idUser"
        }
      })

      users.hasMany(models.messages,{
        as: "sender",
        foreignKey:{
          name : "idUserSend"
        }
      })

      users.hasMany(models.messages,{
        as: "receiver",
        foreignKey:{
          name : "idUserReceiver"
        }
      })
    }
  }
  
  users.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    image: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};