'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class following extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      following.belongsTo(models.users, {
        as : "follow",
        foreignKey :{
          name : "idUserFollowing"
        }
      })
    }
  }
  following.init({
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'following',
  });
  return following;
};