/* eslint-disable no-unused-vars */
import axios from "axios";
// import apiUrl from "env";

const DEFAULT_DELAY = 1000;

const apiUrl = "http://localhost:8080";

function getPos(id) {
  return axios.get(`${apiUrl}/merchant/getPos/${id}`);
}

function getTransaction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${apiUrl}/merchant/getAll/`)
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function save(pos) {
  return axios.post(`${apiUrl}/merchant/saveTransaction`, pos).then((res) => res.data);
  // return axios.get(`${BASE_URL}/pos/view`);
}

export default { getTransaction, save, getPos };
