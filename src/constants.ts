import { City, Coordinates } from "./types";

export const BUDAPEST_COORDINATES: Coordinates = {
  lat: 47.497720,
  lng: 19.040165,
}

export const CITIES: City[] = [
  { name: 'Ajka', gps: { lat: 47.1036, lng: 17.5518 }, time: 2 * 60 + 12 },
  { name: 'Baja', gps: { lat: 46.1818, lng: 18.9543 }, time: 2 * 60 + 43 },
  { name: 'Budaörs', gps: { lat: 47.4621, lng: 18.9530 }, time: 0 * 60 + 11 },
  { name: 'Békéscsaba', gps: { lat: 46.6736, lng: 21.0877 }, time: 2 * 60 + 29 },
  { name: 'Cegléd', gps: { lat: 47.1738, lng: 19.7966 }, time: 0 * 60 + 56 },
  { name: 'Debrecen', gps: { lat: 47.5289, lng: 21.6254 }, time: 2 * 60 + 35 },
  { name: 'Dunaharaszti', gps: { lat: 47.3537, lng: 19.0971 }, time: -1 }, // no route
  { name: 'Dunakeszi', gps: { lat: 47.6344, lng: 19.1397 }, time: 0 * 60 + 18 },
  { name: 'Dunaújváros', gps: { lat: 46.9619, lng: 18.9355 }, time: 1 * 60 + 8 },
  { name: 'Eger', gps: { lat: 47.9025, lng: 20.3772 }, time: 1 * 60 + 52 },
  { name: 'Esztergom', gps: { lat: 47.7884, lng: 18.7434 }, time: 1 * 60 + 5 },
  { name: 'Érd', gps: { lat: 47.3920, lng: 18.9045 }, time: 0 * 60 + 16 },
  { name: 'Gyula', gps: { lat: 46.6473, lng: 21.2784 }, time: 2 * 60 + 49 },
  { name: 'Gyál', gps: { lat: 47.3837, lng: 19.2171 }, time: 0 * 60 + 42 },
  { name: 'Gyöngyös', gps: { lat: 47.7773, lng: 19.9295 }, time: 1 * 60 + 24 },
  { name: 'Győr', gps: { lat: 47.6875, lng: 17.6504 }, time: 1 * 60 + 24 },
  { name: 'Gödöllő', gps: { lat: 47.6008, lng: 19.3605 }, time: 0 * 60 + 25 },
  { name: 'Hajdúböszörmény', gps: { lat: 47.6719, lng: 21.5127 }, time: 3 * 60 + 29 },
  { name: 'Hódmezővásárhely', gps: { lat: 46.4181, lng: 20.3300 }, time: 3 * 60 + 8 },
  { name: 'Jászberény', gps: { lat: 47.5002, lng: 19.9063 }, time: 1 * 60 + 36 },
  { name: 'Kaposvár', gps: { lat: 46.3594, lng: 17.7968 }, time: 2 * 60 + 24 },
  { name: 'Kazincbarcika', gps: { lat: 48.2489, lng: 20.6190 }, time: 2 * 60 + 45 },
  { name: 'Kecskemét', gps: { lat: 46.8964, lng: 19.6897 }, time: 1 * 60 + 20 },
  { name: 'Kiskunfélegyháza', gps: { lat: 46.7113, lng: 19.8515 }, time: 1 * 60 + 37 },
  { name: 'Kiskunhalas', gps: { lat: 46.4354, lng: 19.4834 }, time: 2 * 60 + 42 },
  { name: 'Miskolc', gps: { lat: 48.1035, lng: 20.7784 }, time: 2 * 60 + 2 },
  { name: 'Mosonmagyaróvár', gps: { lat: 47.8681, lng: 17.2689 }, time: 1 * 60 + 39 },
  { name: 'Nagykanizsa', gps: { lat: 46.4590, lng: 16.9897 }, time: 3 * 60 + 9 },
  { name: 'Nyíregyháza', gps: { lat: 47.9495, lng: 21.7244 }, time: 3 * 60 + 4 },
  { name: 'Orosháza', gps: { lat: 46.5684, lng: 20.6545 }, time: 3 * 60 + 15 },
  { name: 'Ózd', gps: { lat: 48.2241, lng: 20.2889 }, time: 3 * 60 + 27 },
  { name: 'Pápa', gps: { lat: 47.3260, lng: 17.4698 }, time: 2 * 60 + 18 },
  { name: 'Pécs', gps: { lat: 46.0727, lng: 18.2323 }, time: 2 * 60 + 33 },
  { name: 'Salgótarján', gps: { lat: 48.0935, lng: 19.8000 }, time: 2 * 60 + 10 },
  { name: 'Siófok', gps: { lat: 46.9091, lng: 18.0746 }, time: 1 * 60 + 20 },
  { name: 'Sopron', gps: { lat: 47.6817, lng: 16.5845 }, time: 2 * 60 + 25 },
  { name: 'Szeged', gps: { lat: 46.2530, lng: 20.1414 }, time: 2 * 60 + 25 },
  { name: 'Szekszárd', gps: { lat: 46.3474, lng: 18.7062 }, time: 1 * 60 + 52 },
  { name: 'Szentendre', gps: { lat: 47.6795, lng: 19.0669 }, time: -1 }, // no route
  { name: 'Szentes', gps: { lat: 46.6548, lng: 20.2637 }, time: 2 * 60 + 58 },
  { name: 'Szigetszentmiklós', gps: { lat: 46.4181, lng: 20.3300 }, time: -1 }, // no route
  { name: 'Szolnok', gps: { lat: 47.1621, lng: 20.1825 }, time: 1 * 60 + 19 },
  { name: 'Szombathely', gps: { lat: 47.2307, lng: 16.6218 }, time: 2 * 60 + 20 },
  { name: 'Székesfehérvár', gps: { lat: 47.1860, lng: 18.4221 }, time: 0 * 60 + 45 },
  { name: 'Tata', gps: { lat: 47.6458, lng: 18.3303 }, time: 0 * 60 + 37 },
  { name: 'Tatabánya', gps: { lat: 47.5692, lng: 18.4048 }, time: 0 * 60 + 30 },
  { name: 'Veszprém', gps: { lat: 47.1028, lng: 17.9093 }, time: 1 * 60 + 28 },
  { name: 'Vác', gps: { lat: 47.7842, lng: 19.1352 }, time: 0 * 60 + 33 },
  { name: 'Zalaegerszeg', gps: { lat: 46.8417, lng: 16.8416 }, time: 3 * 60 + 38 },
];

export const CITIES_UNREACHABLE = CITIES.filter(c => c.time === -1);
export const COORDINATES_SOURCE_PROJECTION = 'EPSG:4326';
export const COORDINATES_TARGET_PROJECTION = 'EPSG:3857';
export const DEFAULT_TIME_MIN = 60;
export const MAX_DISTANCE_KM = 400;
export const MAX_TIME_MIN = Math.max(...CITIES.map(c => c.time));
