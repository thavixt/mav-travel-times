import { create } from 'zustand'
import { DEFAULT_TIME_MIN } from '../constants';
import { City } from '../types';
import citiesCsv from '../assets/cities.csv';

interface Store {
  time: number;
  setTime: (time: number) => void;

  getReachable: () => City[];
  getUnreachable: () => City[];
  getMaxTime: () => number;

  cities: City[];
  loadCities: () => Promise<void>;
  citiesLoading: boolean;
}

export const DEFAULT_NAME = 'Default Name';
export const DEFAULT_AGE = 20;
export const DEFAULT_GENDER = 'male';
export const DEFAULT_EMPLOYED = false;

const useStore = create<Store>((set, get) => ({
  time: DEFAULT_TIME_MIN,
  setTime: (time) => set(() => ({ time })),

  getReachable: () => {
    const { cities, time } = get();
    return cities.filter(city => {
      return (city.time > 0) && (city.time <= time);
    })
  },
  getUnreachable: () => {
    const { cities } = get();
    return cities.filter(city => city.time < 0 || !city.time)
  },

  getMaxTime: () => {
    const { cities } = get();
    const times = cities.map(c => c.time);
    return Math.max(...times);
  },

  cities: [],
  citiesLoading: true,
  loadCities: async () => {
    console.debug('Loading cities.csv');
    // await new Promise(resolve => setTimeout(resolve, 1_000));
    const cities: City[] = Object.values(citiesCsv).map(record => ({
      name: record.city,
      gps: {
        lat: +record.gps_latitude,
        lng: +record.gps_longitude,
      },
      time: +record.travel_time_min,
    }));
    console.debug('Parsed cities.csv');
    set(() => ({ cities, citiesLoading: false }))
  },
}));

export default useStore;
