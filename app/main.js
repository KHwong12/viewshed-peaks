define(["require", "exports", "tslib", "esri/Map", "esri/views/SceneView", "esri/layers/ElevationLayer", "esri/layers/FeatureLayer", "esri/layers/support/LabelClass", "esri/symbols", "esri/layers/GraphicsLayer", "esri/symbols/PointSymbol3D", "esri/symbols/callouts/LineCallout3D", "esri/geometry/Point", "esri/Graphic", "esri/PopupTemplate", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/tasks/support/FeatureSet", "esri/tasks/Geoprocessor", "esri/layers/WebTileLayer", "esri/Basemap", "esri/tasks/support/LinearUnit", "esri/widgets/Slider", "esri/widgets/Expand"], function (require, exports, tslib_1, Map_1, SceneView_1, ElevationLayer_1, FeatureLayer_1, LabelClass_1, symbols_1, GraphicsLayer_1, PointSymbol3D_1, LineCallout3D_1, Point_1, Graphic_1, PopupTemplate_1, SimpleFillSymbol_1, SimpleLineSymbol_1, FeatureSet_1, Geoprocessor_1, WebTileLayer_1, Basemap_1, LinearUnit_1, Slider_1, Expand_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Map_1 = tslib_1.__importDefault(Map_1);
    SceneView_1 = tslib_1.__importDefault(SceneView_1);
    ElevationLayer_1 = tslib_1.__importDefault(ElevationLayer_1);
    FeatureLayer_1 = tslib_1.__importDefault(FeatureLayer_1);
    LabelClass_1 = tslib_1.__importDefault(LabelClass_1);
    GraphicsLayer_1 = tslib_1.__importDefault(GraphicsLayer_1);
    PointSymbol3D_1 = tslib_1.__importDefault(PointSymbol3D_1);
    LineCallout3D_1 = tslib_1.__importDefault(LineCallout3D_1);
    Point_1 = tslib_1.__importDefault(Point_1);
    Graphic_1 = tslib_1.__importDefault(Graphic_1);
    PopupTemplate_1 = tslib_1.__importDefault(PopupTemplate_1);
    SimpleFillSymbol_1 = tslib_1.__importDefault(SimpleFillSymbol_1);
    SimpleLineSymbol_1 = tslib_1.__importDefault(SimpleLineSymbol_1);
    FeatureSet_1 = tslib_1.__importDefault(FeatureSet_1);
    Geoprocessor_1 = tslib_1.__importDefault(Geoprocessor_1);
    WebTileLayer_1 = tslib_1.__importDefault(WebTileLayer_1);
    Basemap_1 = tslib_1.__importDefault(Basemap_1);
    LinearUnit_1 = tslib_1.__importDefault(LinearUnit_1);
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
    var peaksPopupTemplate = new PopupTemplate_1.default({
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
    var peaksNameLabel = new LabelClass_1.default({
        labelPlacement: "above-center",
        // Return to new line with TextFormatting.NewLine
        // https://community.esri.com/thread/187776-arcade-text-constant-for-textformattingnewline-is-adding-space-instead-of-new-line
        labelExpressionInfo: {
            expression: "$feature.STN_NAME + TextFormatting.NewLine + $feature.HKPD_m + 'm'"
        },
        symbol: new symbols_1.LabelSymbol3D({
            symbolLayers: new symbols_1.TextSymbol3DLayer({
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
    var peaks = new FeatureLayer_1.default({
        url: "https://services5.arcgis.com/xH8UmTNerx1qYfXM/arcgis/rest/services/trigo_peaks/FeatureServer",
        outFields: ["*"],
        popupTemplate: peaksPopupTemplate,
        labelingInfo: peaksNameLabel
    });
    map.add(peaks);
    /* Initialise buffer distance slider */
    // Assign scene layer once webscene is loaded and initialise query buttons
    queryDiv.style.display = "block";
    var queryDivExpand = new Expand_1.default({
        expandIconClass: "esri-icon-search",
        view: view,
        expanded: true,
        content: queryDiv,
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
    /* Initialise symbology for layers to be added on map */
    var selectedLocationSymbol = new PointSymbol3D_1.default({
        symbolLayers: new symbols_1.ObjectSymbol3DLayer({
            width: 150,
            height: 150,
            depth: 150,
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
        callout: new LineCallout3D_1.default({
            size: 1.5,
            color: [150, 150, 150, 0.8],
            border: {
                color: [50, 50, 50, 0.8]
            }
        })
    });
    var viewshedFillSymbol = new SimpleFillSymbol_1.default({
        color: [255, 255, 251, 0.6],
        outline: new SimpleLineSymbol_1.default({
            color: [255, 255, 255],
            width: 0.5
        })
    });
    var viewshedAsyncGpUrl = "https://foa-arcgis.ad.arch.hku.hk/server/rest/services/CommonFunction/ViewshedHKDTM/GPServer/viewshed_50m";
    var viewshedAsyncGp = new Geoprocessor_1.default({ url: viewshedAsyncGpUrl });
    view.on("click", computeViewshed);
    function computeViewshed(event) {
        // showClickedLocation
        graphicsLayer.removeAll();
        var selectedLocation = new Point_1.default({
            longitude: event.mapPoint.longitude,
            latitude: event.mapPoint.latitude
        });
        var selectedLocationGraphic = new Graphic_1.default({
            geometry: selectedLocation,
            symbol: selectedLocationSymbol
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
                    drawAsyncResultData(result);
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
    ;
    function drawAsyncResultData(result) {
        // result from async only have one layer, as we have defined which
        // result layer to get in .getResultData
        var resultFeatures = result.value.features;
        console.log(resultFeatures);
        // Assign the symbol of each reuslt graphics
        var viewshedGraphics = resultFeatures.map(function (feature) {
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
    }
    ;
    /* bookmarks */
    var bookmarks = {
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
    function setBookmarkView(key) {
        var bookmarkElement = document.getElementById(key);
        console.log(bookmarkElement);
        bookmarkElement.addEventListener("click", function () {
            var camera = bookmarks[key];
            view.goTo(camera, {
                duration: 2000
            });
        });
    }
    Object.keys(bookmarks).forEach(function (key) {
        setBookmarkView(key);
    });
});
//# sourceMappingURL=main.js.map