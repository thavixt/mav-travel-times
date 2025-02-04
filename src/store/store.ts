import { create } from 'zustand'

interface Store {
  name: string;
  setName: (name: string) => void;
  
  gender: string;
  setGender: (title: string) => void;
  
  age: number;
  setAge: (age: number) => void;
  
  employed: boolean;
  setEmployed: (employed: boolean) => void;
}

export const DEFAULT_NAME = 'Default Name';
export const DEFAULT_AGE = 20;
export const DEFAULT_GENDER = 'male';
export const DEFAULT_EMPLOYED = false;

const useStore = create<Store>((set) => ({
  name: DEFAULT_NAME,
  setName: (name) => set((state) => ({ ...state, name })),
  
  gender: DEFAULT_GENDER,
  setGender: (gender) => set((state) => ({ ...state, gender })),
  
  age: DEFAULT_AGE,
  setAge: (age) => set((state) => ({ ...state, age })),
  
  employed: DEFAULT_EMPLOYED,
  setEmployed: (employed) => set((state) => ({ ...state, employed })),
}));

export default useStore;
