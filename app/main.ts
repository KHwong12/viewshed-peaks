import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";

const map = new EsriMap({
  basemap: "streets"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [114.1, 22.4],
  zoom: 12
});
