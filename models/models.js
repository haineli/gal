const sequelize = require('../db')
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user'
  }
}, {
  freezeTableName: true
});

const Favorite = sequelize.define('favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pictureId: {  // Изменено bookId на pictureId
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true
});

const Picture = sequelize.define('picture', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  freezeTableName: true
});

const Author = sequelize.define('author', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true
});

const TypeSink = sequelize.define('typesink', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pictureId: {  // Изменено bookId на pictureId
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  freezeTableName: true
});

User.hasOne(Favorite);
Favorite.belongsTo(User);

Favorite.hasMany(Picture);
Picture.belongsTo(Favorite);

Picture.belongsToMany(Author, { through: TypeSink });
Author.belongsToMany(Picture, { through: TypeSink });

module.exports = {
  User,
  Favorite,
  Picture,
  Author,
  TypeSink
};