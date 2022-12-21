/* eslint-disable no-unused-vars */
import axios from "axios";
import apiUrl from "env";

const DEFAULT_DELAY = 1000;

// const BASE_URL = "http://localhost:8080";

function getPos(id) {
  return axios.get(`${apiUrl}/pos/getPos/${id}`);
}

function getTransaction(status) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${apiUrl}/pos/all/${status}`)
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function searchPos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${apiUrl}/pos/all`)
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function save(pos) {
  return axios.post(`${apiUrl}/pos/save`, pos).then((res) => res.data);
  // return axios.get(`${BASE_URL}/pos/view`);
}

function updatePos(pos) {
  return axios.put(`${apiUrl}/pos/updatePos`, pos);
}

function release(transId) {
  return axios.put(`${apiUrl}/pos/update`, { transaction_id: transId, status: 2 });
}

export default { getTransaction, save, updatePos, searchPos, getPos, release };
