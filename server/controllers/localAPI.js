const models = require("../models");
const Product = models.product;

exports.addAllLocal = async (req, h) => {
  try {
    const datass = await Product.bulkCreate(req.payload.dataProduct, {
      returning: true,
      updateOnDuplicate: [
        "productName",
        "productDetails",
        "price",
        "SKU",
        "created_at",
      ],
    });

    return datass;
  } catch (error) {
    console.log(error);
  }
};
exports.indexDataLocal = async (req, h) => {
  const datass = await Product.findAll();
  return datass;
};
