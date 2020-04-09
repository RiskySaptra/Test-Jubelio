const models = require("../models");
const Product = models.product;

exports.addAllLocal = async (req, h) => {
  try {
    const dataLocal = await Product.bulkCreate(req.payload.dataProduct, {
      returning: true,
      updateOnDuplicate: [
        "productName",
        "image",
        "productDetails",
        "price",
        "SKU",
      ],
    });

    return dataLocal;
  } catch (error) {
    console.log(error);
  }
};

// const paginate = (query, { page, pageSize }) => {
//   const offset = page * pageSize;
//   const limit = pageSize;

//   return {
//     ...query,
//     offset,
//     limit,
//   };
// };

exports.indexDataLocal = async (req, h) => {
  try {
    const dataLocal = await Product.findAll();

    return dataLocal.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
  } catch (error) {
    console.log(error);
  }
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
  // console.log(req.payload);
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
