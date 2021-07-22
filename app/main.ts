import EsriMap from "esri/Map";
import SceneView from "esri/views/SceneView";
import ElevationLayer from "esri/layers/ElevationLayer";
import { ObjectSymbol3DLayer } from "esri/symbols";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import PointSymbol3D from "esri/symbols/PointSymbol3D";
import LineCallout3D from "esri/symbols/callouts/LineCallout3D";
import Point from "esri/geometry/Point";
import Graphic from "esri/Graphic";
import SimpleFillSymbol from "esri/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "esri/symbols/SimpleLineSymbol";
import FeatureSet from "esri/tasks/support/FeatureSet";
import Geoprocessor from "esri/tasks/Geoprocessor";
import JobInfo from "esri/tasks/support/JobInfo";
import ParameterValue from "esri/tasks/support/ParameterValue";
import WebTileLayer from "esri/layers/WebTileLayer";
import Basemap from "esri/Basemap";
import LinearUnit from "esri/tasks/support/LinearUnit";
import Slider from "esri/widgets/Slider";
import Expand from "esri/widgets/Expand";
import { bookmarks, setBookmarkView } from "./bookmarks";
import { peaks } from "./addFeatures";

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


map.add(peaks);

/* Initialise buffer distance slider */

// Assign scene layer once webscene is loaded and initialise query buttons
queryDiv.style.display = "block";

const queryDivExpand = new Expand({
  expandIconClass: "esri-icon-search",
  view: view,
  expanded: true,
  content: queryDiv,
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

/* Initialise symbology for layers to be added on map */

const selectedLocationSymbol = new PointSymbol3D({
  symbolLayers: new ObjectSymbol3DLayer({
    width: 150, // diameter of the object from east to west in meters
    height: 150, // height of object in meters
    depth: 150, // diameter of the object from north to south in meters
    resource: {
      primitive: "sphere"
    },
    material: {
      color: [255, 0, 0, 0.9]
    }
  }),
  verticalOffset: {
    screenLength: 40,
    minWorldLength: 150
  },
  // display a line to connect the symbol with its actual location
  callout: new LineCallout3D({
    size: 1.5,
    color: [150, 150, 150, 0.8],
    border: {
      color: [50, 50, 50, 0.8]
    }
  })
});

const viewshedFillSymbol = new SimpleFillSymbol({
  color: [255, 255, 251, 0.6],
  outline: new SimpleLineSymbol({
    color: [255, 255, 255],
    width: 0.5
  })
});


const viewshedAsyncGpUrl = "https://foa-arcgis.ad.arch.hku.hk/server/rest/services/CommonFunction/ViewshedHKDTM/GPServer/viewshed_50m";
const viewshedAsyncGp = new Geoprocessor({ url: viewshedAsyncGpUrl });

view.on("click", (event) => {
  computeViewshed(event, bufferDistance, graphicsLayer);
});

function computeViewshed (event: any, bufferDistance: number, graphicsLayer: GraphicsLayer) {
  // Remove all current graphic layers on map first
  graphicsLayer.removeAll();

  // TODO: move to separate showClickedLocation function
  const selectedLocation = new Point({
    longitude: event.mapPoint.longitude,
    latitude: event.mapPoint.latitude
  });

  const selectedLocationGraphic = new Graphic({
    geometry: selectedLocation,
    symbol: selectedLocationSymbol
  });

  graphicsLayer.add(selectedLocationGraphic);

  // set up featureSet params for geoprocessing

  // featureSet needs input params to be an array, thus create an array container
  const inputGraphicContainer = [];
  inputGraphicContainer.push(selectedLocationGraphic);

  const featureSet = new FeatureSet();
  featureSet.features = inputGraphicContainer;

  const viewshedDistance = new LinearUnit({
    distance: bufferDistance,
    units: "kilometers"
  });

  const params = {
    Input_Point: featureSet,
    Outer_radius: viewshedDistance
  };

  // submit asnyc viewshed function to ArcGIS server
  viewshedAsyncGp
    .submitJob(params)
    .then((jobInfo: JobInfo) => {
      // show loading indicator gif
      document.getElementById("loading").style.display = "block";

      const jobid = jobInfo.jobId;

      console.log(jobid);

      const options = {
        interval: 1500,
        statusCallback: (j) => {
          console.log("Job Status: ", j.jobStatus);
        }
      };

      viewshedAsyncGp
        // wait until the async job is completed
        .waitForJobCompletion(jobid, options)
        .then(() => {
          console.log("Job Completed. Fetching results...");

          // fetch the results from server
          // request the results and get job status are two different steps
          // see https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-Geoprocessor.html#getResultMapImageLayer
          viewshedAsyncGp
            .getResultData(jobid, "Output_Viewshed_Polygon")
            .then((result) => {
              drawAsyncResultData(view, result);
            });
        })
        .catch((error) => {
          alert("ERROR: Could not complete viewshed! Please try again later.");

          console.error(error);
        })
        .finally(() => {
          // hide loading indicator gif
          document.getElementById("loading").style.display = "none";
        });
    });
};

function drawAsyncResultData (view: SceneView, result: ParameterValue) {
  // result from async only have one layer, as we have defined which
  // result layer to get in .getResultData
  const resultFeatures = result.value.features;

  console.log(resultFeatures);

  // Assign the symbol of each reuslt graphics
  const viewshedGraphics = resultFeatures.map(function (feature: Graphic) {
    feature.symbol = viewshedFillSymbol;
    return feature;
  });

  // Add reuslt graphics to the graphics layer
  graphicsLayer.addMany(viewshedGraphics);

  /********************************************************************
     * Animate to the result. This is a temporary workaround
     * for animating to an array of graphics in a SceneView. In a future
     * release, you will be able to replicate this behavior by passing
     * the graphics directly to the goTo function, like the following:
     *
     * view.goTo(viewshedGraphics);
     ********************************************************************/
  view
    .goTo({
      target: viewshedGraphics,
      // Point to north
      heading: 0,
      // Top view
      tilt: 0
    })
    .catch(function (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    });
};

/* Set up bookmarks */

Object.keys(bookmarks).forEach(function (key) {
  setBookmarkView(view, key);
});
