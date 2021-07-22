document.getElementById("lastModified").innerHTML = document.lastModified;

const weatherAPI = "https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=LTMV&lang=en&rformat=json";

// http://zetcode.com/javascript/jsonurl/
fetch(weatherAPI)
  .then(res => res.json())
  .then(response => {
    console.log(response);

    const visibilityTable = document.createElement("table");
    visibilityTable.className = "table";

    // Add header row
    let row = visibilityTable.insertRow(-1);

    // i = 1 to omit the first column of json (i.e. Date time)
    for (let j = 1; j < response.fields.length; j++) {
      let headerCell = document.createElement("th");

      headerCell.innerHTML = response.fields[j];
      row.appendChild(headerCell);
    }

    console.log(visibilityTable);

    // Add the html table to the div
    document.getElementById("visibilityDiv").appendChild(visibilityTable);
  })
  .catch(err => console.error(err));
