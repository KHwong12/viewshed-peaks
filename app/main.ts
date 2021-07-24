import EsriMap from "esri/Map";
import SceneView from "esri/views/SceneView";
import ElevationLayer from "esri/layers/ElevationLayer";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import WebTileLayer from "esri/layers/WebTileLayer";
import Basemap from "esri/Basemap";
import Slider from "esri/widgets/Slider";
import Expand from "esri/widgets/Expand";
import { bookmarks, setBookmarkView } from "./bookmarks";
import { peaks } from "./addFeatures";
import { computeViewshed } from "./viewshed";

// Create a WebTileLayer with a third-party cached service
const landsImageryLayer = new WebTileLayer({
  urlTemplate: "https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/imagery/wgs84/{z}/{x}/{y}.png",
  copyright: "Lands Department"
});

// Create a Basemap with the WebTileLayer
const hkImageryMap = new Basemap({
  baseLayers: [landsImageryLayer],
  title: "LandsD Imagery Map",
  id: "lands-imagery"
});

// Add the custom basemap to the map
const map = new EsriMap({
  basemap: hkImageryMap
  // ground: "world-elevation"
});

// Custom elevation service
const elevLyr = new ElevationLayer({
  url: "https://tiles.arcgis.com/tiles/6j1KwZfY2fZrfNMR/arcgis/rest/services/HK_DTM/ImageServer"
});

// Add elevation layer to the map's ground.
map.ground.layers.add(elevLyr);

const view = new SceneView({
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

const graphicsLayer = new GraphicsLayer();
map.add(graphicsLayer);

/* Add peaks from AGOL */
map.add(peaks);

/* Initialise buffer distance slider */

const queryPanel = document.getElementById("queryDiv");

// TODO: Display queryDiv only after DOM content is fully loaded
queryPanel.style.display = "block";

const queryDivExpand = new Expand({
  expandIconClass: "esri-icon-search",
  view: view,
  expanded: true,
  content: queryPanel,
  expandTooltip: "Expand the settings panel",
  collapseTooltip: "Hide the settings panel"
});

view.ui.add(queryDivExpand, "bottom-left");

const bufferNumSlider = new Slider({
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
let bufferDistance = 0;
bufferDistance = bufferNumSlider.values[0];

// Get user entered values for buffer
bufferNumSlider.on(
  ["thumb-change", "thumb-drag"],
  bufferVariablesChanged
);

function bufferVariablesChanged (event) {
  bufferDistance = event.value;
}

// Clear the geometry and set the default renderer
document
  .getElementById("clearGeometry")
  .addEventListener("click", clearGeometry);

function clearGeometry () {
  graphicsLayer.removeAll();
}


/* Compute viewshed */

view.on("click", (event) => {
  computeViewshed(event, view, bufferDistance, graphicsLayer);
});

/* Set up bookmarks */

Object.keys(bookmarks).forEach(function (key) {
  setBookmarkView(view, key);
});

/* Show last modified date of HTML file */

function showLastModified (span: HTMLElement) {
  span.innerHTML = document.lastModified;
}

const lastModifiedHtml = document.getElementById("lastModified");
showLastModified(lastModifiedHtml);
