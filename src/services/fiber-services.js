import axios from "axios";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function getFibers() {
  return axios.get(`${BASE_URL}/fiber/getFibers`);
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

function getFiber(id) {
  return axios.get(`${BASE_URL}/fiber/getFiber/${id}`);
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

function getOGPrice(name, grade) {
  return fetch(`${BASE_URL}/fiber/getOGPrice/${name}/${grade}`);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       id: 1000,
  //       ...employee,
  //     });
  //   }, DEFAULT_DELAY);
  // });
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
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       name: "Roxie",
  //     });
  //   }, DEFAULT_DELAY);
  // });
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

export default {
  getFibers,
  getFiber,
  getOGPrice,
  searchFiber,
  addFiber,
  updateFiber,
};
