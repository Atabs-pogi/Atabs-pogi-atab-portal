/* eslint-disable no-unused-vars */
import axios from "axios";
import apiUrl from "env";

const DEFAULT_DELAY = 1000;

// const BASE_URL = "http://localhost:8080";

function getPos(id) {
  return axios.get(`${apiUrl}/pos/getPos/${id}`);
}

function searchPos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${apiUrl}/pos/view`)
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function save(pos) {
  return axios.post(`${apiUrl}/pos/save`, pos);
  // return axios.get(`${BASE_URL}/pos/view`);
}

function updatePos(pos) {
  return axios.put(`${apiUrl}/pos/updatePos`, pos);
}

export default { searchPos, save, updatePos, getPos };
