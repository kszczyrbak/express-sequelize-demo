'use strict';

module.exports = function (sequelize, DataTypes) {
  const Thread = sequelize.define('Thread', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    section_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'thread'
  });

  Thread.associate = (models) => {
    Thread.belongsTo(models.User, {
      foreignKey: 'createdBy_id'
    })

    Thread.hasMany(models.Post, {
      as: 'posts',
      foreignKey: 'thread_id'
    })

    Thread.belongsToMany(models.User, {
      through: 'threadfollowers',
      foreignKey: 'thread_id',
      as: 'followers'
    })
  };

  return Thread;
}