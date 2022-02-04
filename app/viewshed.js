define(["require", "exports", "tslib", "esri/geometry", "esri/Graphic", "esri/tasks/Geoprocessor", "esri/tasks/support/FeatureSet", "esri/tasks/support/LinearUnit", "./symbology"], function (require, exports, tslib_1, geometry_1, Graphic_1, Geoprocessor_1, FeatureSet_1, LinearUnit_1, symbology_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.drawAsyncResultData = exports.computeViewshed = void 0;
    Graphic_1 = tslib_1.__importDefault(Graphic_1);
    Geoprocessor_1 = tslib_1.__importDefault(Geoprocessor_1);
    FeatureSet_1 = tslib_1.__importDefault(FeatureSet_1);
    LinearUnit_1 = tslib_1.__importDefault(LinearUnit_1);
    var viewshedAsyncGpUrl = "https://foa-arcgis.ad.arch.hku.hk/server/rest/services/CommonFunction/ViewshedHKDTM/GPServer/viewshed_50m";
    var viewshedAsyncGp = new Geoprocessor_1.default({ url: viewshedAsyncGpUrl });
    function computeViewshed(event, view, bufferDistance, graphicsLayer) {
        // Remove all current graphic layers on map first
        graphicsLayer.removeAll();
        // TODO: move to separate showClickedLocation function
        var selectedLocation = new geometry_1.Point({
            longitude: event.mapPoint.longitude,
            latitude: event.mapPoint.latitude
        });
        var selectedLocationGraphic = new Graphic_1.default({
            geometry: selectedLocation,
            symbol: symbology_1.selectedLocationSymbol
        });
        graphicsLayer.add(selectedLocationGraphic);
        // set up featureSet params for geoprocessing
        // featureSet needs input params to be an array, thus create an array container
        var inputGraphicContainer = [];
        inputGraphicContainer.push(selectedLocationGraphic);
        var featureSet = new FeatureSet_1.default();
        featureSet.features = inputGraphicContainer;
        var viewshedDistance = new LinearUnit_1.default({
            distance: bufferDistance,
            units: "kilometers"
        });
        var params = {
            Input_Point: featureSet,
            Outer_radius: viewshedDistance
        };
        // submit asnyc viewshed function to ArcGIS server
        viewshedAsyncGp
            .submitJob(params)
            .then(function (jobInfo) {
            // show loading indicator gif
            document.getElementById("loading").style.display = "block";
            var jobid = jobInfo.jobId;
            console.log(jobid);
            var options = {
                interval: 1500,
                statusCallback: function (j) {
                    console.log("Job Status: ", j.jobStatus);
                }
            };
            viewshedAsyncGp
                // wait until the async job is completed
                .waitForJobCompletion(jobid, options)
                .then(function () {
                console.log("Job Completed. Fetching results...");
                // fetch the results from server
                // request the results and get job status are two different steps
                // see https://developers.arcgis.com/javascript/latest/api-reference/esri-tasks-Geoprocessor.html#getResultMapImageLayer
                viewshedAsyncGp
                    .getResultData(jobid, "Output_Viewshed_Polygon")
                    .then(function (result) {
                    drawAsyncResultData(view, graphicsLayer, result);
                });
            })
                .catch(function (error) {
                alert("ERROR: Could not complete viewshed! Please try again later.");
                console.error(error);
            })
                .finally(function () {
                // hide loading indicator gif
                document.getElementById("loading").style.display = "none";
            });
        });
    }
    exports.computeViewshed = computeViewshed;
    ;
    function drawAsyncResultData(view, graphicsLayer, result) {
        // result from async only have one layer, as we have defined which
        // result layer to get in .getResultData
        var resultFeatures = result.value.features;
        console.log(resultFeatures);
        // Assign the symbol of each reuslt graphics
        var viewshedGraphics = resultFeatures.map(function (feature) {
            feature.symbol = symbology_1.viewshedFillSymbol;
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
    }
    exports.drawAsyncResultData = drawAsyncResultData;
    ;
});
//# sourceMappingURL=viewshed.js.map