/* eslint-disable no-unused-vars */
import axios from "axios";
import apiUrl from "env";

const DEFAULT_DELAY = 1000;

// const BASE_URL = "http://localhost:8080";

function getEmployee(id) {
  return axios.get(`${apiUrl}/employee/getEmployee/${id}`);
}

function searchEmployee(search = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${apiUrl}/employee/search`, { params: { name: search } })
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addEmployee(employee) {
  return axios.post(`${apiUrl}/employee/addEmployee`, employee);
}

function updateEmployee(employee) {
  return axios.put(`${apiUrl}/employee/updateEmployee`, employee);
}

export default { getEmployee, searchEmployee, addEmployee, updateEmployee };
