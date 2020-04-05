const axios = require("axios");
const parser = require("xml2json");

exports.indexData = async (request, h) => {
  // headers
  const value = { openapikey: "721407f393e84a28593374cc2b347a98" };

  //config xml2json
  const options = {
    object: true,
  };
  // callback
  const listProduct = await axios.get(
    "http://api.elevenia.co.id/rest/prodservices/product/listing?page=1",
    {
      headers: value,
    }
  );
  const { data } = listProduct;
  const list = await parser.toJson(data, options);

  const params = list.Products.product.map(({ prdNo }) => prdNo);

  let datass = [];
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
        // console.log(productRes, stockRes);
        const parseProduct = parser.toJson(productRes.data, options);
        const parsedStock = parser.toJson(stockRes.data, options);

        const productNo = parseProduct.Product.prdNo;
        const productName = parseProduct.Product.prdNm;
        const price = parseProduct.Product.selPrc;
        const productDetails = parseProduct.Product.htmlDetail;
        const image = parseProduct.Product.prdImage01;
        const SKU = parsedStock.ProductStocks.sellerPrdCd;

        datass.push({
          productNo,
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
    datass.sort((a, b) => parseFloat(a.productNo) - parseFloat(b.productNo))
  );
};
