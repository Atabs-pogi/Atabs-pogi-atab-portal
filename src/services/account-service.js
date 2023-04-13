/* eslint-disable no-unused-vars */
import axios from "axios";
// import BASE_URL from "env";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function authenticate(account) {
  return axios.post(`${BASE_URL}/login/authenticate`, account).then((res) => res.data);
}

function getAllAccount() {
  return axios.get(`${BASE_URL}/login/getAllAccount`);
}

function getAccount(id) {
  return axios.get(`${BASE_URL}/login/getAccount/${id}`);
}

function searchAccounts(search = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/login/search`, { params: { username: search } })
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addAccount(account) {
  return axios.post(`${BASE_URL}/login/addAccount`, account);
}

function updateAccount(account) {
  return axios.put(`${BASE_URL}/login/updateAccount`, account);
}

export default {
  getAllAccount,
  getAccount,
  searchAccounts,
  addAccount,
  updateAccount,
  authenticate,
};
