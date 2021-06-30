import EsriMap from "esri/Map";
import SceneView from "esri/views/SceneView";
import ElevationLayer from "esri/layers/ElevationLayer";
import FeatureLayer from "esri/layers/FeatureLayer";
import LabelClass from "esri/layers/support/LabelClass";
import { LabelSymbol3D, ObjectSymbol3DLayer, TextSymbol3DLayer } from "esri/symbols";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import PointSymbol3D from "esri/symbols/PointSymbol3D";
import LineCallout3D from "esri/symbols/callouts/LineCallout3D";

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


const peaksPopupTemplate = {
  // autocasts as new PopupTemplate()
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
};

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

/* add marker when user clicks on the map
 */

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

