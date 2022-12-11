/* eslint-disable no-unused-vars */
import axios from "axios";
import apiUrl from "env";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function authenticate(account) {
  return axios.post(`${BASE_URL}/login/authenticate`, account).then((res) => res.data);
}

function getAccount(id) {
  return axios.get(`${BASE_URL}/login/getAccount/${id}`);
}

function searchAccounts(search = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/login/search`, { params: { name: search } })
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addAccount(account) {
  return axios.post(`${BASE_URL}/login/addAccount`, account);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       id: 1000,
  //       ...employee,
  //     });
  //   }, DEFAULT_DELAY);
  // });
}

function updateAccount(account) {
  return axios.put(`${BASE_URL}/login/updateAccount`, account);
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     // resolve({
  //     //   ...employee,
  //     // });
  //     reject(new Error("Invalid Char"));
  //   }, DEFAULT_DELAY);
  // });
}

export default { getAccount, searchAccounts, addAccount, updateAccount, authenticate };
