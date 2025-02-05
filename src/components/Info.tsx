import { CITIES_UNREACHABLE } from "../constants";
import { Container } from "./Container";

export function Info() {
  const except = CITIES_UNREACHABLE.map(c => c.name).join(', ');
  return (
    <Container className="bottom-10 left-10 w-[500px]">
      <ul className="pl-6 text-sm list-outside list-disc">
        <li>data from <a target="__blank" href="https://jegy.mav.hu/">jegy.mav.hu</a> as of <em>2025.02.05.</em></li>
        <li>based on the quickest route on an average weekday</li>
        <li>includes the <a target="__blank" href="https://hu.wikipedia.org/wiki/Magyarorsz%C3%A1g_legnagyobb_telep%C3%BCl%C3%A9sei_lak%C3%B3n%C3%A9pess%C3%A9g_szerint">50 most populated cities of Hungary</a> <small>(except {except} - these cities have no direct rail connections with Budapest)</small></li>
        <li>made with <a target="__blank" href="https://react.dev/">React</a>, map by <a target="__blank" href="https://openlayers.org/">OpenLayers</a></li>
      </ul>
    </Container>
  )
}
