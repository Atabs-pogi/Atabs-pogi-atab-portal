/* eslint-disable no-unused-vars */
import axios from "axios";
// import BASE_URL from "env";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function getAllBills() {
  return axios.get(`${BASE_URL}/bills/getAllBills`).then((res) => res.data);
}

function searchBills(search = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/bills/search`, { params: { name: search } })
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addBills(bills) {
  return axios.post(`${BASE_URL}/bills/addBills`, bills);
}

function updateBills(bills) {
  return axios.put(`${BASE_URL}/bills/updateBills`, bills);
}

export default { getAllBills, searchBills, addBills, updateBills };
