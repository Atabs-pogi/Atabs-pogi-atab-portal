/* eslint-disable no-unused-vars */
import axios from "axios";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function getEmployee(id) {
  return axios.get(`${BASE_URL}/employee/getEmployee/${id}`);
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

function searchEmployee(search = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/employee/getEmployees`, search)
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addEmployee(employee) {
  return axios.post(`${BASE_URL}/employee/addEmployee`, employee);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       id: 1000,
  //       ...employee,
  //     });
  //   }, DEFAULT_DELAY);
  // });
}

function updateEmployee(employee) {
  return axios.put(`${BASE_URL}/employee/updateEmployee`, employee);
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     // resolve({
  //     //   ...employee,
  //     // });
  //     reject(new Error("Invalid Char"));
  //   }, DEFAULT_DELAY);
  // });
}

export default { getEmployee, searchEmployee, addEmployee, updateEmployee };
