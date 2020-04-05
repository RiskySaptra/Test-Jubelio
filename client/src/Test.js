// ... leave other imports untouched ...
import React, { Component } from "react";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";
import Reviews from "./components/Reviews";
import Store from "./MobX/Store";
import "./App.css";
import { decorate, observable, action, computed } from "mobx";

decorate(Store, {
  reviewList: observable,
  addReview: action,
  averageScore: computed,
  reviewCount: computed
});

const reviewStore = new Store();

class App extends Component {
  render() {
    return (
      <div className="container">
        <Form store={reviewStore} />
        <Dashboard store={reviewStore} />
        <Reviews store={reviewStore} />
      </div>
    );
  }
}

export default App;
