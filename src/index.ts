import "../node_modules/bootstrap/js/dist/collapse";

const openContextMenu = new Event("openContextMenu");

let cityRow = document.getElementById("city-row");

const statisticsBase = "https://statistics.equalstreetnames.eu/";
const requestURL =
  "https://raw.githubusercontent.com/EqualStreetNames/equalstreetnames/master/global/cities.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function () {
  const requestData = request.response;
  const countries = Object.keys(requestData);

  let city;

  for (var i = 0; i < countries.length; i++) {
    var currentCountry = countries[i];
    var cities = Object.keys(requestData[currentCountry]);

    var col = document.createElement("div");
    col.className = "col-sm";

    var listGroup = document.createElement("ul");
    listGroup.className = "list-group";
    col.appendChild(listGroup);

    var listGroupHeading = document.createElement("li");
    listGroupHeading.className = "list-group-item list-group-heading";
    listGroupHeading.innerText = requestData[currentCountry][cities[0]][
      "name"
    ].substr(0, 4);
    listGroup.appendChild(listGroupHeading);

    for (var j = 0; j < cities.length; j++) {
      var currentCity = cities[j];

      city = document.createElement("a");
      city.className = "list-group-item city-link";
      city.text = requestData[currentCountry][currentCity]["name"]
        .split(",")[0]
        .substr(4);
      city.href = requestData[currentCountry][currentCity]["url"];
      city.addEventListener("contextmenu", openMenu, false);
      city.addEventListener("openContextMenu", closeMenuOnOpen, false);
      listGroup.appendChild(city);

      var dropdown = document.createElement("ul");
      dropdown.className = "dropdown-menu shadow";
      dropdown.style.display = "none";
      dropdown.addEventListener("mouseleave", closeMenu, false);
      city.appendChild(dropdown);

      var open = document.createElement("a");
      open.className = "dropdown-item";
      open.href = requestData[currentCountry][currentCity]["url"];
      open.innerText = "Open";
      dropdown.appendChild(open);

      var openBlank = document.createElement("a");
      openBlank.className = "dropdown-item";
      openBlank.href = requestData[currentCountry][currentCity]["url"];
      openBlank.target = "_blank";
      openBlank.innerText = "Open in new tab";
      dropdown.appendChild(openBlank);

      var openStatistics = document.createElement("a");
      openStatistics.className = "dropdown-item";
      openStatistics.href =
        statisticsBase + "?city=" + countries[i] + "/" + cities[j];
      openStatistics.innerText = "Open statistics";
      dropdown.appendChild(openStatistics);

      var openStatisticsBlank = document.createElement("a");
      openStatisticsBlank.className = "dropdown-item";
      openStatisticsBlank.href =
        statisticsBase + "?city=" + countries[i] + "/" + cities[j];
      openStatisticsBlank.target = "_blank";
      openStatisticsBlank.innerText = "Open statistics in new tab";
      dropdown.appendChild(openStatisticsBlank);
    }

    cityRow.appendChild(col);
  }
  document.body.classList.add("loaded");
};

function openMenu() {
  var cityLinks = document.getElementsByClassName("city-link");
  for (var i = 0; i < cityLinks.length; i++) {
    cityLinks.item(i).dispatchEvent(openContextMenu);
  }
  //document.dispatchEvent(openContextMenu);
  this.firstElementChild.style.display = "block";
}

function closeMenu() {
  this.style.display = "none";
}

function closeMenuOnOpen() {
  this.firstElementChild.style.display = "none";
}
