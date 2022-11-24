/* eslint-disable no-unused-vars */
import axios from "axios";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function authenticate(account) {
  return axios.post(`${BASE_URL}/login/authenticate`, account);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       id,
  //       lastName: "Roxie",
  //       firstName: "Harvey",
  //       middleName: "Curtis",
  //       birthday: "10/20/1990",
  //       mobileNumber: "9523852567",
  //       email: "JcPogi07@gmail.com",
  //       sex: "Male",
  //     });
  //   }, DEFAULT_DELAY);
  // });
}

function getAccount(id) {
  return axios.get(`${BASE_URL}/account/getAccount/${id}`);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       id,
  //       lastName: "Roxie",
  //       firstName: "Harvey",
  //       middleName: "Curtis",
  //       birthday: "10/20/1990",
  //       mobileNumber: "9523852567",
  //       email: "JcPogi07@gmail.com",
  //       sex: "Male",
  //     });
  //   }, DEFAULT_DELAY);
  // });
}

function searchAccount(search = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/account/search`, { params: { name: search } })
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addAccount(account) {
  return axios.post(`${BASE_URL}/account/addAccount`, account);
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
  return axios.put(`${BASE_URL}/account/updateAccount`, account);
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     // resolve({
  //     //   ...employee,
  //     // });
  //     reject(new Error("Invalid Char"));
  //   }, DEFAULT_DELAY);
  // });
}

export default { getAccount, searchAccount, addAccount, updateAccount, authenticate };
