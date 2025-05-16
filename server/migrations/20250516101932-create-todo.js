'use strict';

const { all } = require('../routes/googleRoute');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        // autoIncrement: true,  coz:uuid give random number
        primaryKey: true,
        type: Sequelize.UUID
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references:{
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Todos');
  }
};