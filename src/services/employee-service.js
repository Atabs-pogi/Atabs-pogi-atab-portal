/* eslint-disable no-unused-vars */
import axios from "axios";
// import apiUrl from "env";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function getEmployee(id) {
  return axios.get(`${BASE_URL}/employee/getEmployee/${id}`);
}

function getEmployeeCount() {
  return axios.get(`${BASE_URL}/employee/getEmployeeCount/`);
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
  return axios.post(`${BASE_URL}/employee/addEmployee`, {
    ...employee,
    imageLocation:
      employee.imageLocation && employee.imageLocation.replace(`${BASE_URL}/upload/`, ""),
  });
}

function createImgPath(profile, type, img) {
  const formData = new FormData();
  formData.append("profile", profile);
  formData.append("type", type);
  formData.append("img", img);
  return axios
    .post(`${BASE_URL}/image/addProfile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => new URL(res.data, `${BASE_URL}/upload/`).href);
}

function updateEmployee(employee) {
  return axios.put(`${BASE_URL}/employee/updateEmployee`, employee);
}

export default {
  getEmployee,
  getEmployeeCount,
  searchEmployee,
  addEmployee,
  createImgPath,
  updateEmployee,
};
