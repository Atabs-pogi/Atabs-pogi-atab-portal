/* eslint-disable no-unused-vars */
import axios from "axios";
// import apiUrl from "env";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function addHoliday(info) {
  return axios
    .post(`${BASE_URL}/holiday/`, info)
    .then((res) => res.data)
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.message) {
        throw new Error(err.response.data.message);
      } else {
        throw new Error("An error occurred while adding the holiday.");
      }
    });
}

function getHoliday(id) {
  return axios.get(`${BASE_URL}/holiday/${id}`).then((res) => res.data);
}

function getHolidays() {
  return axios.get(`${BASE_URL}/holiday/`).then((res) => res.data);
}

function updateHoliday(holiday) {
  return axios.put(`${BASE_URL}/holiday/`, holiday).then((res) => res.data);
}

function deleteHoliday(id) {
  return axios.delete(`${BASE_URL}/holiday/${id}`).then((res) => res.data);
}

function clear() {
  return axios.delete(`${BASE_URL}/holiday/clear`).then((res) => res.data);
}

export default { addHoliday, getHoliday, getHolidays, updateHoliday, deleteHoliday, clear };
