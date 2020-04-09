const axios = require("axios");
const parser = require("xml2json");

exports.indexData = async (req, h) => {
  try {
    // headers
    const value = { openapikey: "721407f393e84a28593374cc2b347a98" };
    // parameters
    const page = 4;

    //config xml2json
    const options = {
      object: true,
    };

    const { data } = await axios.get(
      `http://api.elevenia.co.id/rest/prodservices/product/listing?page=${page}`,
      {
        headers: value,
      }
    );

    const list = await parser.toJson(data, options);
    const params = list.Products.product.map(({ prdNo }) => prdNo);

    let dataElevenia = [];
    let promises = [];
    for (i = 0; i < params.length; i++) {
      promises.push(
        Promise.all([
          axios.get(
            `http://api.elevenia.co.id/rest/prodservices/product/details/${params[i]}`,
            {
              headers: value,
            }
          ),
          axios.get(
            ` http://api.elevenia.co.id/rest/prodmarketservice/prodmarket/stck/${params[i]}`,
            {
              headers: value,
            }
          ),
        ]).then(([productRes, stockRes]) => {
          const parseProduct = parser.toJson(productRes.data, options);
          const parsedStock = parser.toJson(stockRes.data, options);

          const id = parseProduct.Product.prdNo;
          const productName = parseProduct.Product.prdNm;
          const price = parseProduct.Product.selPrc;
          const productDetails = parseProduct.Product.htmlDetail;
          const image = parseProduct.Product.prdImage01;
          const SKU = parsedStock.ProductStocks.sellerPrdCd;

          dataElevenia.push({
            id,
            productName,
            image,
            productDetails,
            price,
            SKU,
          });
        })
      );
    }
    return Promise.all(promises).then(() =>
      dataElevenia.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
    );
  } catch (error) {
    console.log(error);
  }
};
