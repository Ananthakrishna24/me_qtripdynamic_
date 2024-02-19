import config from "../conf/index.js";

async function init() {
  try {
    let cities = await fetchCities();
    if (cities) {
      const card = document.getElementById("data");
      const fragment = document.createDocumentFragment();

      cities.forEach((key) => {
        const content = createCityElement(key.id, key.city, key.description, key.image);
        fragment.appendChild(content);
      });

      card.appendChild(fragment);
    }
  } catch (error) {
    console.error("Failed to initialize cities:", error);
  }
}

async function fetchCities() {
  return fetch(config.backendEndpoint + `/cities`)
    .then(response => response.json())
    .catch(error => {
      console.error("Failed to fetch cities:", error);
      return null; 
    });
}

function createCityElement(id, city, description, image) {
  let content = document.createElement("div");
  content.className = "col-6 col-md-4 col-lg-3 mb-4";
  content.innerHTML = `
  <a href="pages/adventures/?city=${id}" id="${id}">
    <div class="tile">
      <div class="tile-text text-center">
        <h5>${city}</h5>
        <p>${description}</p>
      </div>
      <img class="img-responsive" src="${image}">
    </div>
  </a>
  `;
  return content;
}

export { init, fetchCities, createCityElement as addCityToDOM };
