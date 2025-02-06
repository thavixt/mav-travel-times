import { Map } from "./components/Map";
import { Cities, } from "./components/Citites";
import { TimeSlider } from "./components/TimeSlider";
import { Info } from "./components/Info";
import useStore from "./store/store";
import { useEffect } from "react";

function App() {
  const loadCities = useStore(state => state.loadCities);
  const citiesLoading = useStore(state => state.citiesLoading);

  useEffect(() => {
    loadCities();
  }, [loadCities]);

  if (citiesLoading) {
    return (
      <div className="size-full absolute top-0 z-0 flex flex-col items-center justify-center bg-slate-400">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <TimeSlider />
      <Cities />
      <Info />
      <Map />
    </div>
  )
}

export default App
