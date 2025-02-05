import { Container } from "./Container";
import useStore from "../store/store";
import { useMemo, useState } from "react";

export function Cities() {
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
      <div className="h-[400px] overflow-y-auto">
        <div className="min-h-0 overflow-y-auto">
          <ul>
            {cities.map(v => (
              <li key={v.name}><a target="__blank" href={`https://hu.wikipedia.org/wiki/${v.name}`}>{v.name}</a> [in {getTime(v.time)}]</li>
            ))}
          </ul>
        </div>
      </div>
      <small>{cities.length} cities reachable in approx. {time} minutes</small>
    </Container>
  )
}

function getTime(minutes: number): string {
  const h = (Math.floor(minutes / 60)).toString().padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}