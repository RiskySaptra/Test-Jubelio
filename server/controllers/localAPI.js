const models = require("../models");
const Product = models.product;

exports.addAllLocal = async (req, h) => {
  try {
    var data = [
      {
        productNo: "25919155",
        productName: "test el5",
        image: "http://image.elevenia.co.id/g/9/1/9/1/5/5/25919155_B_V76.jpeg",
        productDetails:
          "<p>test el4test el4test el4test el4test el4test el4test el4test el4test el4test el4test el4test el4test el4test el4test el4test el4test el4test el4test el4test el4test el4test el4test el4test el4</p>",
        price: "1000000",
        SKU: "test el4",
      },
      {
        productNo: "25919173",
        productName: "test el6",
        image: "http://image.elevenia.co.id/g/9/1/9/1/7/3/25919173_B.jpeg",
        productDetails:
          "<p>test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6test el6</p>",
        price: "1000000",
        SKU: "tes-el6-Hit",
      },
    ];
    const datass = await Product.bulkCreate(data, { returning: true });
    return datass;
  } catch (error) {
    console.log(error);
  }
};
exports.indexDataLocal = async (req, h) => {
  const datass = await Product.findAll();
  return datass;
};
