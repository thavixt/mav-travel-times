export interface City {
  // Name of the city (hungarin)
  name: string;
  // Average travel time in minutes
  time: number;
  // GPS coordinates
  gps: Coordinates
}

export interface Coordinates {
  // Longitude
  lng: number;
  // Latitude
  lat: number;
}