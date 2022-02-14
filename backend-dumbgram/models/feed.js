'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      feed.belongsTo(models.users,{
        as: "users",
        foreignKey:{
          name :"idUser"
        }
      })

      feed.hasMany(models.comments,{
        as: "comment",
        foreignKey : {
          name : "idFeed"
        }
      })

      feed.belongsToMany(models.followers,{
        as :"feedfollow",
        through:{
          model : "followFeed",
          as : "bridge"
        },
        foreignKey : 'idFeed'
      })
    }
  }
  feed.init({
    filename: DataTypes.STRING,
    like: DataTypes.INTEGER,
    caption: DataTypes.TEXT,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'feed',
  });
  return feed;
};