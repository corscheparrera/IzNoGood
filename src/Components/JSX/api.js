const request = require("superagent");
const APIHOST = "http://localhost:5000";
class Api {
  getProductData(upc) {
    return request.get(`${APIHOST}/?upc=${upc}`);

    // .then(res => {

    //   console.log("inside api", res);
    // });
  }
}

export default new Api();
