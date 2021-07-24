/*
Generate table of current visibility
*/
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateVisibilityTable = exports.weatherAPI = void 0;
    exports.weatherAPI = "https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=LTMV&lang=en&rformat=json";
    function generateVisibilityTable(apiLink) {
        // http://zetcode.com/javascript/jsonurl/
        fetch(apiLink)
            .then(function (res) { return res.json(); })
            .then(function (response) {
            console.log(response);
            var visibilityTable = document.createElement("table");
            visibilityTable.className = "table";
            // Add header row
            var row = visibilityTable.insertRow(-1);
            // i = 1 to omit the first column of json (i.e. Date time)
            for (var j = 1; j < response.fields.length; j++) {
                var headerCell = document.createElement("th");
                headerCell.innerHTML = response.fields[j];
                row.appendChild(headerCell);
            }
            // Add data rows
            // For each row (observation)
            for (var i = 0; i < response.data.length; i++) {
                row = visibilityTable.insertRow(-1);
                // For each column (variable)
                for (var j = 1; j < response.fields.length; j++) {
                    var cell = row.insertCell(-1);
                    cell.innerHTML = response.data[i][j];
                }
            }
            console.log(visibilityTable);
            // Add the html table to the div
            document.getElementById("visibilityDiv").appendChild(visibilityTable);
        })
            .catch(function (err) { return console.error(err); });
    }
    exports.generateVisibilityTable = generateVisibilityTable;
});
//# sourceMappingURL=visibility.js.map