import { Point } from "esri/geometry";
import Graphic from "esri/Graphic";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import Geoprocessor from "esri/tasks/Geoprocessor";
import FeatureSet from "esri/tasks/support/FeatureSet";
import JobInfo from "esri/tasks/support/JobInfo";
import LinearUnit from "esri/tasks/support/LinearUnit";
import ParameterValue from "esri/tasks/support/ParameterValue";
import SceneView from "esri/views/SceneView";
import { selectedLocationSymbol, viewshedFillSymbol } from "./symbology";


const viewshedAsyncGpUrl = "https://foa-arcgis.ad.arch.hku.hk/server/rest/services/CommonFunction/ViewshedHKDTM/GPServer/viewshed_50m";
const viewshedAsyncGp = new Geoprocessor({ url: viewshedAsyncGpUrl });

export function computeViewshed (event: any, view: SceneView, bufferDistance: number, graphicsLayer: GraphicsLayer) {
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
        statusCallback: (j: JobInfo) => {
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
              drawAsyncResultData(view, graphicsLayer, result);
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

export function drawAsyncResultData (view: SceneView, graphicsLayer: GraphicsLayer, result: ParameterValue) {
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

