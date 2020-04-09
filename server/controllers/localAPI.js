const models = require("../models");
const Product = models.product;

exports.addAllLocal = async (req, h) => {
  try {
    const datass = await Product.bulkCreate(req.payload.dataProduct, {
      returning: true,
      updateOnDuplicate: [
        "productName",
        "image",
        "productDetails",
        "price",
        "SKU",
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

exports.deleteLocal = async (req, h) => {
  await Product.destroy({
    where: {
      id: req.payload.id,
    },
  });
  return { msg: "succses" };
};
exports.updateLocal = async (req, h) => {
  console.log(req.payload);
  const { productName, image, productDetails, price, SKU } = req.payload.datass;
  try {
    await Product.update(
      {
        productName,
        image,
        productDetails,
        price,
        SKU,
      },
      {
        where: {
          id: req.payload.datass.id,
        },
      }
    );
    return { msg: "succses" };
  } catch (error) {
    console.log(error);
  }
};
