'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      messages.belongsTo(models.users,{
        as : "receiver",
        foreignKey : {
          name :"idUserReceiver"
        }
      })
    }
  }
  messages.init({
    idUserSend: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    idUserReceiver: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'messages',
  });
  return messages;
};