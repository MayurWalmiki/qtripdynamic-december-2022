



import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

    const urlParams = new URLSearchParams(search);
    const city = urlParams.get("city");
    return city;


}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data



     try {
      const result = await fetch (config.backendEndpoint + `/adventures?city=${city}`);
      const data = await result.json();
      return data;
     } catch (e) {
      return null;
     }
    }








//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM


   adventures.forEach((adventure) => {
    let ele = document.createElement("div");
    ele.className = "col-6 col-lg-3 mb-4 position-relative";
    ele.innerHTML = `
      <a href="detail/?adventure=${adventure.id}" id=${adventure.id}>
        <div class="category-banner">${adventure.category}</div>
        <div class="activity-card">
        <img 
        class="img-responsive" 
        src=${adventure.image} 
        />
        <div class="activity-card-text text-md-center w-100 mt-3">
          <div class="d-block d-md-flex justify-content-between flex-wrap ps-3">
            <h5 class="text-left">${adventure.name}</h5>
            <p>₹${adventure.costPerHead}</p>
          </div>
          <div class="d-block d-md-flex justify-content-between  flex-wrap ps-3">
            <h5 class="text-left">Duration</h5>
            <p>${adventure.duration} Hours</p>
          </div>
        </div>
        </div>
      </a>
    `;
    document.getElementById("data").appendChild(ele);
   });
  }



//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list


  const filteredList = list.filter((adventure)=> {
    const isInRange = adventure.duration >= low && adventure.duration <= high;
    return isInRange;
  });
  return filteredList;


}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list


  const filteredList = list.filter((adventure)=> categoryList.includes(adventure.category));
  return filteredList;



}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


   let filteredList = list;

   if(filters["duration"].length > 0){
    let lowHigh = filters["duration"].split("-");

    filteredList = filterByDuration(filteredList, parseInt(lowHigh[0]), parseInt(lowHigh[1]));
   }

   if (filters["category"].length > 0){
     filteredList = filterByCategory(filteredList, filters["category"]);
   }
  // Place holder for functionality to work in the Stubs
  return filteredList;
  }



  // Place holder for functionality to work in the Stubs
  




  // Place holder for functionality to work in the Stubs




//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage


  localStorage.setItem("filters",JSON.stringify(filters));


  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS

  // 1. Get the<<<<<<< HEAD
  return JSON.parse(localStorage.getItem("filters"));
 
  // Place holder for functionality to work in the Stub


  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return null;

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills


  document.getElementById("duration-select").value = filters.duration;

  filters["category"].forEach((category)=> {
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `<div>${category}</div>`;
    document.getElementById("category-list").appendChild(ele);
  });



}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
