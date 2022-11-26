/* eslint-disable no-unused-vars */
import axios from "axios";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function getEmployee(id) {
  return axios.get(`${BASE_URL}/employee/getEmployee/${id}`);
}

function searchEmployee(search = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/employee/search`, { params: { name: search } })
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addEmployee(employee) {
  return axios.post(`${BASE_URL}/employee/addEmployee`, employee);
}

function updateEmployee(employee) {
  return axios.put(`${BASE_URL}/employee/updateEmployee`, employee);
}

export default { getEmployee, searchEmployee, addEmployee, updateEmployee };
