import "../node_modules/bootstrap/js/dist/collapse";
import emojiUnicode from "emoji-unicode";
import emojiSupported from "emoji-supported";

const openContextMenu = new Event("openContextMenu");

const cityRow = document.getElementById("city-row");
const cityCount = document.getElementById("cityCount");
const countryCount = document.getElementById("countryCount");

const themeSwitch = document.querySelector("#themeSwitch") as HTMLInputElement;
let theme!: string;

function changeTheme() {
  document.documentElement.setAttribute("data-theme", theme);

  if (typeof themeSwitch !== "undefined") {
    themeSwitch.checked = theme === "dark";
  }
}

theme =
  window.matchMedia("(prefers-color-scheme: dark)").matches === true
    ? "dark"
    : "light";

changeTheme();

// Update theme when browser configuration changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event: MediaQueryListEvent) => {
    theme = event.matches === true ? "dark" : "light";

    changeTheme();
  });

// Update theme when user click on them switch
themeSwitch?.addEventListener("click", () => {
  theme = themeSwitch.checked === true ? "dark" : "light";

  changeTheme();
});

const statisticsBase = "https://statistics.equalstreetnames.eu/";
const requestURL =
  "https://raw.githubusercontent.com/EqualStreetNames/module-global/master/cities.json";
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function () {
  const requestData = request.response;
  const countries = Object.keys(requestData);

  let city;
  let cityCounter = 0;

  for (let i = 0; i < countries.length; i++) {
    const currentCountry = countries[i];
    const cities = Object.keys(requestData[currentCountry]);

    const col = document.createElement("div");
    col.className = "col-sm";

    const listGroup = document.createElement("ul");
    listGroup.className = "list-group";
    col.appendChild(listGroup);

    const listGroupHeading = document.createElement("li");
    listGroupHeading.className = "list-group-item list-group-heading";
    const emoji = requestData[currentCountry][cities[0]]["name"].substr(0, 4);
    if (emojiSupported(emoji)) {
      listGroupHeading.innerText = requestData[currentCountry][cities[0]][
        "name"
      ].substr(0, 4);
    } else {
      const image = getEmoji(emoji);
      listGroupHeading.appendChild(image);
    }
    listGroup.appendChild(listGroupHeading);

    for (let j = 0; j < cities.length; j++) {
      const currentCity = cities[j];
      cityCounter++;

      city = document.createElement("a");
      city.text = requestData[currentCountry][currentCity]["name"]
        .split(",")[0]
        .substr(4);
      if (requestData[currentCountry][currentCity]["url"]) {
        city.className = "list-group-item city-link";
        city.href = requestData[currentCountry][currentCity]["url"];
      } else {
        city.className = "list-group-item city-link disabled";
      }
      city.addEventListener("contextmenu", openMenu, false);
      city.addEventListener("openContextMenu", closeMenuOnOpen, false);
      listGroup.appendChild(city);

      const dropdown = document.createElement("ul");
      dropdown.className = "dropdown-menu shadow";
      dropdown.style.display = "none";
      dropdown.addEventListener("mouseleave", closeMenu, false);
      city.appendChild(dropdown);

      const open = document.createElement("a");
      open.className = "dropdown-item";
      open.href = requestData[currentCountry][currentCity]["url"];
      open.innerText = "Open";
      dropdown.appendChild(open);

      const openBlank = document.createElement("a");
      openBlank.className = "dropdown-item";
      openBlank.href = requestData[currentCountry][currentCity]["url"];
      openBlank.target = "_blank";
      openBlank.innerText = "Open in new tab";
      dropdown.appendChild(openBlank);

      const openStatistics = document.createElement("a");
      openStatistics.className = "dropdown-item";
      openStatistics.href =
        statisticsBase + "?city=" + countries[i] + "/" + cities[j];
      openStatistics.innerText = "Open statistics";
      dropdown.appendChild(openStatistics);

      const openStatisticsBlank = document.createElement("a");
      openStatisticsBlank.className = "dropdown-item";
      openStatisticsBlank.href =
        statisticsBase + "?city=" + countries[i] + "/" + cities[j];
      openStatisticsBlank.target = "_blank";
      openStatisticsBlank.innerText = "Open statistics in new tab";
      dropdown.appendChild(openStatisticsBlank);
    }

    cityRow.appendChild(col);
  }
  cityCount.innerText = cityCounter.toString();
  countryCount.innerText = countries.length.toString();

  document.body.classList.add("loaded");
};

function openMenu() {
  const cityLinks = document.getElementsByClassName("city-link");
  for (let i = 0; i < cityLinks.length; i++) {
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

function getEmoji(emoji: string) {
  const emojiElement = document.createElement("img");
  emojiElement.src =
    "https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/color/svg/" +
    emojiUnicode(emoji).toUpperCase().replace(" ", "-") +
    ".svg";
  return emojiElement;
}
