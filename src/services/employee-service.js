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

function createImgPath(profile, type, img) {
  const formData = new FormData();
  formData.append("profile", profile);
  formData.append("type", type);
  formData.append("img", img);
  return axios.post(`${apiUrl}/image/addProfile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function updateEmployee(employee) {
  return axios.put(`${apiUrl}/employee/updateEmployee`, employee);
}

export default { getEmployee, searchEmployee, addEmployee, createImgPath, updateEmployee };
