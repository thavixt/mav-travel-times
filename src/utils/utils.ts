import GeoJSON from "ol/format/GeoJSON";
import { transform } from "ol/proj";
import VectorSource from "ol/source/Vector";
import { COORDINATES_SOURCE_PROJECTION, COORDINATES_TARGET_PROJECTION } from "../constants";
import { Coordinates } from "../types";


/**
 * Transform coordinates from EPSG:4326 to EPSG:3857 projection
 */
export function tc(coords: Coordinates) {
  return transform(
    [coords.lng, coords.lat],
    COORDINATES_SOURCE_PROJECTION, COORDINATES_TARGET_PROJECTION,
  );
}

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