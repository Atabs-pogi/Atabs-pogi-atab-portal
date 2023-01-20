/* eslint-disable no-unused-vars */
import axios from "axios";
import apiUrl from "env";

const DEFAULT_DELAY = 1000;

// const BASE_URL = "http://localhost:8080";

function getAllBills() {
  return axios.get(`${apiUrl}/bills/getAllBills`).then((res) => res.data);
}

function searchBills(search = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${apiUrl}/bills/search`, { params: { name: search } })
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addBills(bills) {
  return axios.post(`${apiUrl}/bills/addBills`, bills);
}

function updateBills(bills) {
  return axios.put(`${apiUrl}/bills/updateBills`, bills);
}

export default { getAllBills, searchBills, addBills, updateBills };