/* symbology of layers to be added on map */

import { ObjectSymbol3DLayer, PointSymbol3D, SimpleFillSymbol, SimpleLineSymbol } from "esri/symbols";
import LineCallout3D from "esri/symbols/callouts/LineCallout3D";

export const selectedLocationSymbol = new PointSymbol3D({
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

export const viewshedFillSymbol = new SimpleFillSymbol({
  color: [255, 255, 251, 0.6],
  outline: new SimpleLineSymbol({
    color: [255, 255, 255],
    width: 0.5
  })
});
