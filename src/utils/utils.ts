import GeoJSON from "ol/format/GeoJSON";
import VectorSource from "ol/source/Vector";
import { tc } from "../constants";
import { Coordinates } from "../types";

export function createVectorSource(coordinates: Coordinates[]): VectorSource {
  const geoJSON = createGeoJSONPolygonObject(coordinates);
  const source = new VectorSource({
    features: new GeoJSON().readFeatures(geoJSON),
  });
  return source;
}

function createGeoJSONPolygonObject(coordinates: Coordinates[]) {
  return {
    type: 'FeatureCollection',
    crs: {
      'type': 'name',
      'properties': {
        'name': 'EPSG:4326',
      },
    },
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            coordinates.map(coords => tc({
              lng: coords.lng,
              lat: coords.lat,
            }))
          ],
        },
      },
    ],
  }
}