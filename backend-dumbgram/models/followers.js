'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class followers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      followers.belongsTo(models.users, {
        as : "follow",
        foreignKey :{
          name : "idUserFollower"
        }
      })

      followers.belongsToMany(models.feed,{
          as: 'followfeed',
          through: {
            model: "followFeed",
            as: 'bridge',
          },
          foreignKey : "idFollowing"
      })
    
    }
  }
  followers.init({
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'followers',
  });
  return followers;
};