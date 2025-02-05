import { ChangeEvent, useState } from "react"
import { MAX_TIME_MIN } from "../constants";
import useStore from "../store/store";
import { Container } from "./Container";

export function TimeSlider() {
  const time = useStore(state => state.time);
  const setTime = useStore(state => state.setTime);

  return (
    <Container className="top-10 left-10 w-3/5 !space-y-0">
      <div>See how far can you get from Budapest in</div>
      <RangeInput defaultValue={time} min={10} max={MAX_TIME_MIN} onChange={setTime} label="minutes with MÁV" />
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