import { transform } from "ol/proj";
import { City, Coordinates } from "./types";

export const MAX_DISTANCE_KM = 400;
export const MAX_TIME_MIN = 12 * 60;
export const DEFAULT_TIME_MIN = 1 * 100;

export const COORDINATES_SOURCE_PROJECTION = 'EPSG:4326';
export const COORDINATES_TARGET_PROJECTION = 'EPSG:3857';

/**
 * Transform coordinates from EPSG:4326 to EPSG:3857 projection
 */
export function tc(coords: Coordinates) {
  return transform(
    [coords.lng, coords.lat],
    COORDINATES_SOURCE_PROJECTION, COORDINATES_TARGET_PROJECTION,
  );
}

export const BUDAPEST_COORDINATES: Coordinates = {
  lng: 19.040165,
  lat: 47.497720,
}

const PLACEHOLDER_CITY_NAMES = new Array(100)
  .fill('City')
  .map(() => `City#${(Math.random() * 10e6).toFixed()}`)


const getRnd = () => {
  return Math.floor(Math.random() * 10e5);
}

export const CITIES: City[] = [
  // { name: 'Székesfehérvár', time: 58, gps: { lon: 123, lat: 123 } },
  ...PLACEHOLDER_CITY_NAMES.map<City>((name, i) => {
    const delta = (getRnd() % 2) ? (i * 0.01) : -(i * 0.01);
    const delta2 = (getRnd() % 2) ? (i * 0.01) : -(i * 0.01);
    return {
      name,
      time: i + Math.round((Math.random() * MAX_TIME_MIN)),
      gps: {
        lng: BUDAPEST_COORDINATES.lng + delta,
        lat: BUDAPEST_COORDINATES.lat + delta2,
      }
    }
  })
];
