"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {
        foreignKey: "userId",
        as: "userTodos",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: DataTypes.STRING,
      // isverified: DataTypes.BOOLEAN,
      isverified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verificationOTP: DataTypes.STRING,
      otpExpiresAt: DataTypes.DATE,
      profileImage: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
