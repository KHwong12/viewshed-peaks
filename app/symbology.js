/* symbology of layers to be added on map */
define(["require", "exports", "tslib", "esri/symbols", "esri/symbols/callouts/LineCallout3D"], function (require, exports, tslib_1, symbols_1, LineCallout3D_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.viewshedFillSymbol = exports.selectedLocationSymbol = void 0;
    LineCallout3D_1 = tslib_1.__importDefault(LineCallout3D_1);
    exports.selectedLocationSymbol = new symbols_1.PointSymbol3D({
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
    exports.viewshedFillSymbol = new symbols_1.SimpleFillSymbol({
        color: [255, 255, 251, 0.6],
        outline: new symbols_1.SimpleLineSymbol({
            color: [255, 255, 255],
            width: 0.5
        })
    });
});
//# sourceMappingURL=symbology.js.map