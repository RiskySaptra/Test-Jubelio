"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productNo: {
        type: Sequelize.STRING,
      },
      productName: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      productDetails: {
        type: Sequelize.STRING(10000),
      },
      price: {
        type: Sequelize.STRING,
      },
      SKU: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("products");
  },
};
