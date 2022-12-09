/* eslint-disable no-unused-vars */
import axios from "axios";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function getFarmer(id) {
  return axios.get(`${BASE_URL}/farmer/getFarmer/${id}`);
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

function searchFarmer(search = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/farmer/search`, { params: { name: search } })
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addFarmer(farmer) {
  return axios.post(`${BASE_URL}/farmer/addFarmer`, farmer);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       id: 1000,
  //       ...employee,
  //     });
  //   }, DEFAULT_DELAY);
  // });
}

function updateFarmer(farmer) {
  return axios.put(`${BASE_URL}/farmer/updateFarmer`, farmer);
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     // resolve({
  //     //   ...employee,
  //     // });
  //     reject(new Error("Invalid Char"));
  //   }, DEFAULT_DELAY);
  // });
}

export default { getFarmer, searchFarmer, addFarmer, updateFarmer };