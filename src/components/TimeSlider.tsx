import { ChangeEvent, useState } from "react"
import { MAX_TIME_MIN } from "../constants";
import useStore from "../store/store";
import { Container } from "./Container";

export function TimeSlider() {
  const setTime = useStore(state => state.setTime);

  return (
    <Container className="top-10 left-10">
      <div>Travel time from Budapest:</div>
      <RangeInput defaultValue={60} min={10} max={MAX_TIME_MIN} onChange={setTime} label="minutes" />
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
    <div className="flex flex-col space-y-2">
      <input
        max={max}
        min={min}
        onChange={onChange}
        type="range"
        defaultValue={defaultValue}
      />
      {value} {label}
    </div>
  )
}