import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

export const grahamScanStyle = new Style({
  fill: new Fill({
    color: [255, 255, 0, 0.2],
  }),
  stroke: new Stroke({
    width: 2,
    color: [0, 0, 255, 0.5],
  }),
});

export const circleStyle = new Style({
  image: new CircleStyle({
    radius: 8,
    fill: new Fill({
      color: [255, 255, 0, 1],
    }),
    stroke: new Stroke({
      width: 2,
      color: [0, 0, 255, 1],
    }),
  }),
});

export const bpCircleStyle = new Style({
  image: new CircleStyle({
    radius: 8,
    fill: new Fill({
      color: [255, 0, 0, 1],
    }),
    stroke: new Stroke({
      width: 2,
      color: [0, 0, 255, 1],
    }),
  }),
});