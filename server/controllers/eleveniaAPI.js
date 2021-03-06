const axios = require("axios");
const parser = require("xml2json");

exports.indexData = async (req, h) => {
  try {
    // headers
    const value = { openapikey: "721407f393e84a28593374cc2b347a98" };

    //config xml2json
    const options = {
      object: true,
    };

    var data = [];
    for (i = 1; i <= 4; i++) {
      const rslt = await axios.get(
        `http://api.elevenia.co.id/rest/prodservices/product/listing?page=${i}`,
        {
          headers: value,
        }
      );
      const list = await parser.toJson(rslt.data, options);
      const params = list.Products.product.map(({ prdNo }) => prdNo);

      data.push(params);
    }

    var merged = [].concat.apply([], data);

    let dataElevenia = [];
    let promises = [];
    for (i = 0; i < merged.length; i++) {
      promises.push(
        Promise.all([
          axios.get(
            `http://api.elevenia.co.id/rest/prodservices/product/details/${merged[i]}`,
            {
              headers: value,
            }
          ),
          axios.get(
            ` http://api.elevenia.co.id/rest/prodmarketservice/prodmarket/stck/${merged[i]}`,
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
