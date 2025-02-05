import { Map } from "./components/Map";
import { Cities, } from "./components/Citites";
import { TimeSlider } from "./components/TimeSlider";
import { Info } from "./components/Info";

function App() {
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
