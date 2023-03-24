/* eslint-disable no-unused-vars */
import axios from "axios";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function getFiber(id) {
  return axios.get(`${BASE_URL}/fiber/getFiber/${id}`);
}

function getAllFibers() {
  return axios.get(`${BASE_URL}/fiber/getAllFibers`);
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
  return axios.post(`${BASE_URL}/fiber/generateFiber`, fiber);
}

function updateFiber(fiber) {
  return axios.post(`${BASE_URL}/fiber/UpdateFiber`, fiber);
}

export default { getFiber, getAllFibers, searchFiber, addFiber, updateFiber };
