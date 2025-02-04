import { Container } from "./Container";
import useStore from "../store/store";
import { useMemo, useState } from "react";

export function Info() {
  const getReachable = useStore(state => state.getReachable);
  const time = useStore(state => state.time);
  const [search, setSearch] = useState('');

  const cities = useMemo(() => {
    const matching = getReachable().filter(city => city.name.includes(search));
    const sorted = matching.sort((aCity, bCity) => (
      (aCity.time > bCity.time) ? 1 : -1
    ));
    return sorted;
  // eslint-disable-next-line
  }, [getReachable, search, time])

  return (
    <Container className="bottom-10 right-10 w-[300px]">
      <input type="search" name="search" placeholder="Search for a city" onChange={e => setSearch(e.target.value)} />
      <div className="h-[300px] overflow-y-auto">
        <div className="min-h-0 overflow-y-auto">
          <ul>
            {cities.map(v => (
              <li key={v.name}>{v.name} ({v.time}min)</li>
            ))}
          </ul>
        </div>
      </div>
      <small>{cities.length} cities reachable in {time} minutes (approx.)</small>
    </Container>
  )
}