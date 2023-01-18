/* eslint-disable no-unused-vars */
import axios from "axios";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function getFiber(id) {
  return axios.get(`${BASE_URL}/fiber/getFiber/${id}`);
}

function searchFiber(search = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/fiber/search`, { params: { name: search } })
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addFiber(fiber) {
  return axios.post(`${BASE_URL}/fiber/addFiber`, fiber);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       id: 1000,
  //       ...employee,
  //     });
  //   }, DEFAULT_DELAY);
  // });
}

function updateFiber(fiber) {
  return axios.put(`${BASE_URL}/fiber/updateFiber`, fiber);
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     // resolve({
  //     //   ...employee,
  //     // });
  //     reject(new Error("Invalid Char"));
  //   }, DEFAULT_DELAY);
  // });
}

export default { getFiber, searchFiber, addFiber, updateFiber };
