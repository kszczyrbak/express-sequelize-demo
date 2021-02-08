module.exports = function (sequelize, DataTypes) {
  const Section = sequelize.define('Section', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    section_logo: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'section'
  });

  Section.associate = (models) => {
    Section.hasMany(models.Thread, {
      as: 'threads',
      foreignKey: 'section_id'
    })
  }

  return Section;
};