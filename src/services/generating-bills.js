/* eslint-disable no-unused-vars */
import axios from "axios";
// import apiUrl from "env";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function getBillList() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/bills/getList`)
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function getGeneratedBills() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/bills/all`)
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addBill(bills) {
  return axios.post(`${BASE_URL}/bills/save`, bills);
}

export default { addBill, getBillList, getGeneratedBills };
