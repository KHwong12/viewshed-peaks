import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import { LabelSymbol3D, TextSymbol3DLayer } from "@arcgis/core/symbols";

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

export const peaks = new FeatureLayer({
  url: "https://services5.arcgis.com/xH8UmTNerx1qYfXM/arcgis/rest/services/trigo_peaks/FeatureServer",
  outFields: ["*"],
  popupTemplate: peaksPopupTemplate,
  labelingInfo: peaksNameLabel
});
