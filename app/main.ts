import EsriMap from "esri/Map";
import SceneView from "esri/views/SceneView";
import ElevationLayer from "esri/layers/ElevationLayer";
import FeatureLayer from "esri/layers/FeatureLayer";
import LabelClass from "esri/layers/support/LabelClass";
import { LabelSymbol3D, ObjectSymbol3DLayer, TextSymbol3DLayer } from "esri/symbols";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import PointSymbol3D from "esri/symbols/PointSymbol3D";
import LineCallout3D from "esri/symbols/callouts/LineCallout3D";
import Point from "esri/geometry/Point";
import Graphic from "esri/Graphic";
import PopupTemplate from "esri/PopupTemplate";
import SimpleFillSymbol from "esri/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "esri/symbols/SimpleLineSymbol";
import FeatureSet from "esri/tasks/support/FeatureSet";
import Geoprocessor from "esri/tasks/Geoprocessor";
import JobInfo from "esri/tasks/support/JobInfo";
import ParameterValue from "esri/tasks/support/ParameterValue";

const map = new EsriMap({
  basemap: "satellite"
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
  }
});

const graphicsLayer = new GraphicsLayer();
map.add(graphicsLayer);


const peaksPopupTemplate = new PopupTemplate({
  title: "{STN_NAME}",
  content: [
    {
      type: "fields",
      fieldInfos: [
        {
          fieldName: "STN_NAME",
          label: "STN_NAME"
        },
        {
          fieldName: "HKPD_m",
          label: "HKPD_m"
        },
        {
          fieldName: "Northing_m",
          label: "Northing_m"
        },
        {
          fieldName: "Easting_m",
          label: "Easting_m"
        }
      ]
    }
  ]
});

const peaksNameLabel = new LabelClass({
  labelPlacement: "above-center",
  // Return to new line with TextFormatting.NewLine
  // https://community.esri.com/thread/187776-arcade-text-constant-for-textformattingnewline-is-adding-space-instead-of-new-line
  labelExpressionInfo: {
    expression: "$feature.STN_NAME + TextFormatting.NewLine + $feature.HKPD_m + 'm'"
  },
  symbol: new LabelSymbol3D({
    symbolLayers: new TextSymbol3DLayer({
      material: {
        color: [86, 72, 31]
      },
      halo: {
        color: [244, 239, 227, 0.6],
        size: "3px"
      },
      font: {
        weight: "bold"
      },
      size: 10
    }),
    verticalOffset: {
      screenLength: 50,
      maxWorldLength: 500,
      minWorldLength: 20
    },
    callout: {
      type: "line",
      size: "2px",
      color: [86, 72, 31]
    }
  })
});

const peaks = new FeatureLayer({
  url: "https://services5.arcgis.com/xH8UmTNerx1qYfXM/arcgis/rest/services/trigo_peaks/FeatureServer",
  outFields: ["*"],
  popupTemplate: peaksPopupTemplate,
  labelingInfo: peaksNameLabel
});

map.add(peaks);

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
let viewshedAsyncGp = new Geoprocessor({ url: viewshedAsyncGpUrl });

view.on("click", computeViewshed);


function computeViewshed(event) {
  // showClickedLocation
  graphicsLayer.removeAll();

  let selectedLocation = new Point({
    longitude: event.mapPoint.longitude,
    latitude: event.mapPoint.latitude
  });

  let selectedLocationGraphic = new Graphic({
    geometry: selectedLocation,
    symbol: selectedLocationSymbol
  });

  graphicsLayer.add(selectedLocationGraphic);

  // set up featureSet params for geoprocessing

  // featureSet needs input params to be an array, thus create an array container
  var inputGraphicContainer = [];
  inputGraphicContainer.push(selectedLocationGraphic);

  var featureSet = new FeatureSet();
  featureSet.features = inputGraphicContainer;

  var params = {
    Input_Point: featureSet
  };

  // submit asnyc viewshed function to ArcGIS server
  viewshedAsyncGp
    .submitJob(params)
    .then((jobInfo: JobInfo) => {
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
              drawAsyncResultData(result);
            });
        });
    });
};

function drawAsyncResultData (result: ParameterValue) {
  // result from async only have one layer, as we have defined which
  // result layer to get in .getResultData
  let resultFeatures = result.value.features;

  console.log(resultFeatures);

  // Assign the symbol of each reuslt graphics
  let viewshedGraphics = resultFeatures.map(function (feature: Graphic) {
    feature.symbol = viewshedFillSymbol;
    return feature;
  });

  // Add reuslt graphics to the graphics layer
  graphicsLayer.addMany(viewshedGraphics);
};

/* bookmarks */

const bookmarks = {
  VICTORIA_HARBOUR: {
    position: {
      x: 114.20,
      y: 22.223,
      z: 5000,
      spatialReference: 4326
    },
    heading: 345,
    tilt: 60
  },
  VICTORIA_PEAK: {
    position: {
      x: 114.138,
      y: 22.26,
      z: 1500,
      spatialReference: 4326
    },
    heading: 20,
    tilt: 70
  },
  KOWLOON_PEAKS: {
    position: {
      x: 114.253,
      y: 22.356,
      z: 3000,
      spatialReference: 4326
    },
    heading: 260,
    tilt: 60
  },
  TAI_MO_SHAN: {
    position: {
      x: 114.09,
      y: 22.44,
      z: 3000,
      spatialReference: 4326
    },
    heading: 140,
    tilt: 75
  },
  SHARP_PEAK: {
    position: {
      x: 114.429,
      y: 22.44,
      z: 3000,
      spatialReference: 4326
    },
    heading: 250,
    tilt: 60
  }
};

function setBookmarkView (key: string) {
  const bookmarkElement = document.getElementById(key);

  console.log(bookmarkElement);

  bookmarkElement.addEventListener("click", function () {
    const camera = bookmarks[key];
    view.goTo(camera, {
      duration: 2000
    });
  });
}

Object.keys(bookmarks).forEach(function (key) {
  setBookmarkView(key);
});
