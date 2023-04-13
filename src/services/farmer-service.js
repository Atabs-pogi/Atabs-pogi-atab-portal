/* eslint-disable no-unused-vars */
import axios from "axios";
// import BASE_URL from "env";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function getFarmer(id) {
  return axios.get(`${BASE_URL}/farmer/getFarmer/${id}`);
}

function getFarmerCount() {
  return axios.get(`${BASE_URL}/farmer/getFarmerCount/`);
}

function searchFarmer(search = "") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/farmer/search`, { params: { name: search } })
        .then((res) =>
          res.data.map((farmer) => ({
            ...farmer,
            imageLocation: new URL(farmer.imageLocation, `${BASE_URL}/upload/`).href,
          }))
        )
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  });
}

function addFarmer(farmer) {
  return axios.post(`${BASE_URL}/farmer/addFarmer`, {
    ...farmer,
    imageLocation: farmer.imageLocation && farmer.imageLocation.replace(`${BASE_URL}/upload/`, ""),
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

function updateFarmer(farmer) {
  return axios.put(`${BASE_URL}/farmer/updateFarmer`, farmer);
}

export default { getFarmer, getFarmerCount, searchFarmer, addFarmer, createImgPath, updateFarmer };
