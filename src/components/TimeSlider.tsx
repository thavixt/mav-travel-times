import { ChangeEvent, useState } from "react"
import useStore from "../store/store";
import { Container } from "./Container";

export function TimeSlider() {
  const citiesLoaded = useStore(state => state.loadCities);
  const time = useStore(state => state.time);
  const getMaxTime = useStore(state => state.getMaxTime);
  const setTime = useStore(state => state.setTime);

  if (!citiesLoaded) {
    return null;
  }
  
  const max = getMaxTime();
  return (
    <Container className="top-5 left-5 w-fit !space-y-0">
      <div>How far can you get from <a href="https://en.wikipedia.org/wiki/Budapest">Budapest</a> in</div>
      <RangeInput defaultValue={time} min={0} max={max} onChange={setTime} label="minutes with MÁV?" />
    </Container>
  )
}

interface RangeInputProps {
  defaultValue: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  label: string;
}

function RangeInput({ defaultValue, min, max, onChange: onChangeProp, label }: RangeInputProps) {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = +e.target.value;
    setValue(v);
    onChangeProp(v);
  }

  return (
    <div className="flex flex-col">
      <input
        max={max}
        min={min}
        onChange={onChange}
        type="range"
        defaultValue={defaultValue}
      />
      <div>
        <strong>{value}</strong> {label}
      </div>
    </div>
  )
}