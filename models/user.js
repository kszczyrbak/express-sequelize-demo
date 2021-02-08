module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    signature: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'user'
  });

  User.associate = (models) => {
    User.hasMany(models.Thread, {
      as: 'threads',
      foreignKey: 'createdBy_id'
    })
    User.hasMany(models.Post, {
      as: 'posts',
      foreignKey: 'createdBy_id'
    })
    User.belongsToMany(models.Thread, {
      through: 'threadfollowers',
      foreignKey: 'user_id',
      as: 'followedThreads'
    })
  };

  return User;
}