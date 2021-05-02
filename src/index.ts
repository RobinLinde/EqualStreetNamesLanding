import "../node_modules/bootstrap/js/dist/collapse"

(function () {
    window.onload = function () {
        let cityRow = document.getElementById("city-row");
        const requestURL = "https://raw.githubusercontent.com/RobinLinde/statistics/master/data/cities.json";
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
                col.appendChild(listGroup)

                var listGroupHeading = document.createElement("li");
                listGroupHeading.className = "list-group-item list-group-heading";
                listGroupHeading.innerText = requestData[currentCountry][cities[0]]['name'].substr(0,4);
                listGroup.appendChild(listGroupHeading);

                console.log(currentCountry);

                for (var j = 0; j < cities.length; j++) {
                    var currentCity = cities[j];
          
                    city = document.createElement("a");
                    city.className = "list-group-item city-link";
                    city.text = requestData[currentCountry][currentCity]["name"].split(',')[0].substr(4);
                    city.href = requestData[currentCountry][currentCity]["url"];
                    listGroup.appendChild(city);
                }

                cityRow.appendChild(col);
            }
        }
    };
  })();