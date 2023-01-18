/* eslint-disable no-unused-vars */
import axios from "axios";
import apiUrl from "env";

const DEFAULT_DELAY = 1000;

function authenticate(account) {
  return axios.post(`${apiUrl}/login/authenticate`, account).then((res) => res.data);
}

function getAccount(id) {
  return axios.get(`${apiUrl}/login/getAccount/${id}`);
}

function searchAccounts(search = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${apiUrl}/login/search`, { params: { username: search } })
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addAccount(account) {
  return axios.post(`${apiUrl}/login/addAccount`, account);
}

function updateAccount(account) {
  return axios.put(`${apiUrl}/login/updateAccount`, account);
}

export default { getAccount, searchAccounts, addAccount, updateAccount, authenticate };
