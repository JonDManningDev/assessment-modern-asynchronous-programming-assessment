const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

function isValid({ id, name, meaning, quadrant, starsWithPlanets }) {
  return id && name && meaning && quadrant && starsWithPlanets;
}

function update(constellation) {
  const constellationsURL = `${BASE_URL}/constellations`;
  const { id } = constellation;
  return axios.put(`${constellationsURL}/${id}`, constellation)
  .catch(() => {
   return { error: `Updating constellation (id: ${id}) failed.` };
  });
}

function bulkImport(constellations) {
  if (!Array.isArray(constellations)) {
    return Promise.reject({ error:"Inputted argument must be an array." });
  }

  const promises = constellations.map((constellation) => {
    if (!isValid(constellation)) {
      return Promise.reject({ error: "All constellations must include relevant fields." });
    }

    return update(constellation)
    .catch((error) => {
      return error;
    });
  });

  return Promise.allSettled(promises); 
}

module.exports = { bulkImport, update };
