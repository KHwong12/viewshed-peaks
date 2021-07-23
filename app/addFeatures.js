define(["require", "exports", "tslib", "esri/layers/FeatureLayer", "esri/layers/support/LabelClass", "esri/PopupTemplate", "esri/symbols"], function (require, exports, tslib_1, FeatureLayer_1, LabelClass_1, PopupTemplate_1, symbols_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.peaks = void 0;
    FeatureLayer_1 = tslib_1.__importDefault(FeatureLayer_1);
    LabelClass_1 = tslib_1.__importDefault(LabelClass_1);
    PopupTemplate_1 = tslib_1.__importDefault(PopupTemplate_1);
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
    exports.peaks = new FeatureLayer_1.default({
        url: "https://services5.arcgis.com/xH8UmTNerx1qYfXM/arcgis/rest/services/trigo_peaks/FeatureServer",
        outFields: ["*"],
        popupTemplate: peaksPopupTemplate,
        labelingInfo: peaksNameLabel
    });
});
//# sourceMappingURL=addFeatures.js.map