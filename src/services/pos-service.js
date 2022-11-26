/* eslint-disable no-unused-vars */
import axios from "axios";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function searchPos(search = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/pos/search`, { params: { name: search } })
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addPos(pos) {
  return axios.post(`${BASE_URL}/pos/addPos`, pos);
}

function updatePos(pos) {
  return axios.put(`${BASE_URL}/pos/updatePos`, pos);
}

export default { searchPos, addPos, updatePos };
