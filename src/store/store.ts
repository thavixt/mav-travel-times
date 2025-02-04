import { create } from 'zustand'
import { CITIES, DEFAULT_TIME_MIN } from '../constants';
import { City } from '../types';

interface Store {
  time: number;
  setTime: (time: number) => void;

  getReachable: () => City[];
}

export const DEFAULT_NAME = 'Default Name';
export const DEFAULT_AGE = 20;
export const DEFAULT_GENDER = 'male';
export const DEFAULT_EMPLOYED = false;

const useStore = create<Store>((set, get) => ({
  time: DEFAULT_TIME_MIN,
  setTime: (time) => set((state) => ({ ...state, time })),

  getReachable: () => getReachableCities(get().time),
}));

export default useStore;

function getReachableCities(time: number): City[] {
  return CITIES.filter(city => {
    return city.time <= time;
  })
}
