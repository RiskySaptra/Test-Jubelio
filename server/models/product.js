"use strict";
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "product",
    {
      productNo: DataTypes.STRING,
      productName: DataTypes.STRING,
      image: DataTypes.STRING,
      productDetails: DataTypes.STRING,
      price: DataTypes.STRING,
      SKU: DataTypes.STRING,
    },
    {}
  );
  product.associate = function (models) {
    // associations can be defined here
  };
  return product;
};
