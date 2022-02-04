define(["require", "exports", "tslib", "esri/Map", "esri/views/SceneView", "esri/layers/ElevationLayer", "esri/layers/GraphicsLayer", "esri/layers/WebTileLayer", "esri/Basemap", "esri/widgets/Slider", "esri/widgets/Expand", "./bookmarks", "./addFeatures", "./viewshed", "./visibility", "./ui"], function (require, exports, tslib_1, Map_1, SceneView_1, ElevationLayer_1, GraphicsLayer_1, WebTileLayer_1, Basemap_1, Slider_1, Expand_1, bookmarks_1, addFeatures_1, viewshed_1, visibility_1, ui_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Map_1 = tslib_1.__importDefault(Map_1);
    SceneView_1 = tslib_1.__importDefault(SceneView_1);
    ElevationLayer_1 = tslib_1.__importDefault(ElevationLayer_1);
    GraphicsLayer_1 = tslib_1.__importDefault(GraphicsLayer_1);
    WebTileLayer_1 = tslib_1.__importDefault(WebTileLayer_1);
    Basemap_1 = tslib_1.__importDefault(Basemap_1);
    Slider_1 = tslib_1.__importDefault(Slider_1);
    Expand_1 = tslib_1.__importDefault(Expand_1);
    // Create a WebTileLayer with a third-party cached service
    var landsImageryLayer = new WebTileLayer_1.default({
        urlTemplate: "https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/imagery/wgs84/{z}/{x}/{y}.png",
        copyright: "Lands Department"
    });
    // Create a Basemap with the WebTileLayer
    var hkImageryMap = new Basemap_1.default({
        baseLayers: [landsImageryLayer],
        title: "LandsD Imagery Map",
        id: "lands-imagery"
    });
    // Add the custom basemap to the map
    var map = new Map_1.default({
        basemap: hkImageryMap
        // ground: "world-elevation"
    });
    // Custom elevation service
    var elevLyr = new ElevationLayer_1.default({
        url: "https://tiles.arcgis.com/tiles/6j1KwZfY2fZrfNMR/arcgis/rest/services/HK_DTM/ImageServer"
    });
    // Add elevation layer to the map's ground.
    map.ground.layers.add(elevLyr);
    var view = new SceneView_1.default({
        container: "viewDiv",
        map: map,
        camera: {
            // autocasts as new Camera()
            position: {
                x: 114.2,
                y: 22.223,
                z: 5000
            },
            tilt: 60,
            heading: 345
        },
        constraints: {
            altitude: {
                max: 80000
            }
        }
    });
    var graphicsLayer = new GraphicsLayer_1.default();
    map.add(graphicsLayer);
    /* Add peaks from AGOL */
    map.add(addFeatures_1.peaks);
    /* Initialise buffer distance slider */
    var queryPanel = document.getElementById("queryDiv");
    // TODO: Display queryDiv only after DOM content is fully loaded
    queryPanel.style.display = "block";
    var queryDivExpand = new Expand_1.default({
        expandIconClass: "esri-icon-search",
        view: view,
        expanded: true,
        content: queryPanel,
        // https://community.esri.com/t5/arcgis-api-for-javascript-questions/expand-widget-for-phone-screen/td-p/583206
        mode: "floating",
        expandTooltip: "Expand the settings panel",
        collapseTooltip: "Hide the settings panel"
    });
    view.ui.add(queryDivExpand, "bottom-left");
    var bufferNumSlider = new Slider_1.default({
        container: "bufferNum",
        min: 1,
        max: 20,
        steps: 0.1,
        visibleElements: {
            labels: true
        },
        precision: 4,
        labelFormatFunction: function (value, type) {
            return value.toString() + "km";
        },
        values: [5]
    });
    // Set default buffer size
    var bufferDistance = 0;
    bufferDistance = bufferNumSlider.values[0];
    // Get user entered values for buffer
    bufferNumSlider.on(["thumb-change", "thumb-drag"], bufferVariablesChanged);
    function bufferVariablesChanged(event) {
        bufferDistance = event.value;
    }
    // Clear the geometry and set the default renderer
    document
        .getElementById("clearGeometry")
        .addEventListener("click", clearGeometry);
    function clearGeometry() {
        graphicsLayer.removeAll();
    }
    /* Compute viewshed */
    view.on("click", function (event) {
        viewshed_1.computeViewshed(event, view, bufferDistance, graphicsLayer);
    });
    /* Set up bookmarks */
    Object.keys(bookmarks_1.bookmarks).forEach(function (key) {
        bookmarks_1.setBookmarkView(view, key);
    });
    /* Show last modified date of HTML file */
    function showLastModified(span) {
        span.innerHTML = document.lastModified;
    }
    var lastModifiedHtml = document.getElementById("lastModified");
    showLastModified(lastModifiedHtml);
    /* Generate visibility table */
    visibility_1.generateVisibilityTable(visibility_1.weatherAPI);
    /* sidebar */
    var sidebar = document.querySelector(".sidebar");
    var collapseBtn = document.querySelector("#collapse-button");
    // Show animation of expanding side panel when webpage is first initialised
    sidebar.classList.toggle("open");
    ui_1.changeMenuIcon(sidebar, collapseBtn);
    collapseBtn.addEventListener("click", function () {
        sidebar.classList.toggle("open");
        ui_1.changeMenuIcon(sidebar, collapseBtn);
    });
});
//# sourceMappingURL=main.js.map