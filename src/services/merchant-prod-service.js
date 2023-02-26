/* eslint-disable no-unused-vars */
import axios from "axios";
// import apiUrl from "env";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function getAllMerchProd() {
  return axios.get(`${BASE_URL}/merchant/getAllProducts`);
}

function searchMerchProd(search = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/merchant/search`, { params: { name: search } })
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addMerchProd(merchProd) {
  return axios.post(`${BASE_URL}/merchant/addProduct`, merchProd);
}

function updateMerchProd(merchProd) {
  return axios.put(`${BASE_URL}/merchant/updateProduct`, merchProd);
}

export default { getAllMerchProd, searchMerchProd, addMerchProd, updateMerchProd };
