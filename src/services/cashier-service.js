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
  // return axios.get(`${BASE_URL}/cashier/search/${search}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          lastName: "Kalbo",
          firstName: "Jude",
          middleName: "Panot",
          birthday: "10/20/1990",
          mobileNumber: "9523852567",
          email: "Judekalbo123@gmail.com",
          sex: "Male",
        },
        {
          id: 2,
          lastName: "Hernandez",
          firstName: "Ray",
          middleName: "Wang od",
          birthday: "10/20/1901",
          mobileNumber: "9425643543",
          email: "Raymapagmahal27@gmail.com",
          sex: "Male",
        },
        {
          id: 3,
          lastName: "Villanueva",
          firstName: "Christian",
          middleName: "Reid",
          birthday: "10/20/2000",
          mobileNumber: "9545232123",
          email: "Christian123@gmail.com",
          sex: "Male",
        },
        {
          id: 4,
          lastName: "Romera",
          firstName: "Mattcha",
          middleName: "Pokwan",
          birthday: "10/20/1990",
          mobileNumber: "9523852567",
          email: "BaklaAko69@gmail.com",
          sex: "Female",
        },
        {
          id: 5,
          lastName: "Ancajas",
          firstName: "Jc",
          middleName: "Padilla",
          birthday: "10/20/2000",
          mobileNumber: "9523852567",
          email: "JcPogi07@gmail.com",
          sex: "Male",
        },
      ]);
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
