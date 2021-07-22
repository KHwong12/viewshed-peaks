document.getElementById("lastModified").innerHTML = document.lastModified;

const weatherAPI = "https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=LTMV&lang=en&rformat=json";

// http://zetcode.com/javascript/jsonurl/
fetch(weatherAPI)
  .then(res => res.json())
  .then(response => {
    console.log(response);
  })
  .catch(err => console.error(err));
