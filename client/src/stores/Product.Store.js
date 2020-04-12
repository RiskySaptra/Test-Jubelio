import { action, observable, decorate } from "mobx";
import axios from "axios";

class ProductStore {
  // init State
  dataProduct = [];
  loading = true;
  source = "";
  waitingData = false;

  // action
  getData = async () => {
    this.waitingData = true;
    this.loading = true;
    const data = await axios.get("http://localhost:8000/indexData");
    this.source = "ext";
    this.dataProduct = data.data;
    this.loading = false;
  };

  updateDataLocal = async () => {
    this.loading = true;
    const data = await axios.post(
      "http://localhost:8000/addAllLocal",
      this.dataProduct
    );
    this.source = "ext";
    this.dataProduct = data.data;
    this.loading = false;
  };

  getDataLocal = async () => {
    this.waitingData = true;
    this.loading = true;
    const data = await axios.get("http://localhost:8000/indexDataLocal");
    this.source = "local";
    this.dataProduct = data.data;
    this.loading = false;
  };
}
decorate(ProductStore, {
  dataProduct: observable,
  loading: observable,
  source: observable,
  waitingData: observable,
  getData: action,
  updateDataLocal: action.bound,
  getDataLocal: action,
});
export default ProductStore;
