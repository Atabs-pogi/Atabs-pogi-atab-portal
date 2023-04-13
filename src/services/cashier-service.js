/* eslint-disable no-unused-vars */
import { SearchOff } from "@mui/icons-material";
import axios from "axios";

const DEFAULT_DELAY = 300;

const BASE_URL = "http://localhost:8080";

function getCashier(id) {
  // return axios.get(`${BASE_URL}/cashier/${id}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        lastName: "Roxie",
        firstName: "Harvey",
        middleName: "Curtis",
        birthday: "10/20/1990",
        mobileNumber: "9523852567",
        email: "JcPogi07@gmail.com",
        sex: "Male",
      });
    }, DEFAULT_DELAY);
  });
}

function searchCashier(search = "") {
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

function addCashier(cashier) {
  // return axios.post(`${BASE_URL}/cashier`, cashier);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1000,
        ...cashier,
      });
    }, DEFAULT_DELAY);
  });
}

function updateCashier(cashier) {
  // return axios.put(`${BASE_URL}/cashier/${id}`, cashier);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...cashier,
      });
    }, DEFAULT_DELAY);
  });
}

export default { getCashier, searchCashier, addCashier, updateCashier };
