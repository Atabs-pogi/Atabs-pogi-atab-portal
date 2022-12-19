/* eslint-disable no-unused-vars */
import axios from "axios";
import apiUrl from "env";

const DEFAULT_DELAY = 1000;

// const BASE_URL = "http://localhost:8080";

function getFarmer(id) {
  return axios.get(`${apiUrl}/farmer/getFarmer/${id}`);
}

function searchFarmer(search = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${apiUrl}/farmer/search`, { params: { name: search } })
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addFarmer(farmer) {
  return axios.post(`${apiUrl}/farmer/addFarmer`, farmer);
}

function updateFarmer(farmer) {
  return axios.put(`${apiUrl}/farmer/updateFarmer`, farmer);
}

export default { getFarmer, searchFarmer, addFarmer, updateFarmer };
