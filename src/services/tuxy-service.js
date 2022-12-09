/* eslint-disable no-unused-vars */
import axios from "axios";

const DEFAULT_DELAY = 1000;

const BASE_URL = "http://localhost:8080";

function getTuxyList() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/tuxy/getTuxyList`)
        .then((res) => resolve(res.data))
        .catch((err) => {
          reject(err);
        });
    }, DEFAULT_DELAY);
  }).then((items) =>
    items?.map?.((item) => ({
      ...item,
      price: {
        good: item?.items?.find((p) => p?.type === "Good")?.price || 0,
        discarte: item?.items?.find((p) => p?.type === "Discarte")?.price || 0,
        reseco: item?.items?.find((p) => p?.type === "Reseco")?.price || 0,
      },
    }))
  );
}

function addTuxy(tuxy) {
  return axios.post(`${BASE_URL}/tuxy/addTuxy`, tuxy);
}

export default { addTuxy, getTuxyList };
