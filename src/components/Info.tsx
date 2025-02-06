import { Container } from "./Container";

export function Info() {
  return (
    <Container className="bottom-5 right-5 max-w-1/2 invisible md:visible">
      <ul className="pl-6 text-sm list-outside list-disc">
        <li>data from <a target="__blank" href="https://jegy.mav.hu/">jegy.mav.hu</a> as of <em>2025.02.06.</em></li>
        <li>based on the quickest route on an average weekday</li>
        <li>includes the <a target="__blank" href="https://hu.wikipedia.org/wiki/Magyarorsz%C3%A1g_legnagyobb_telep%C3%BCl%C3%A9sei_lak%C3%B3n%C3%A9pess%C3%A9g_szerint">50 most populated cities of Hungary</a> (and some) which have direct rail connections to Budapest</li>
        <li>made with <a target="__blank" href="https://react.dev/">React</a>, map by <a target="__blank" href="https://openlayers.org/">OpenLayers</a> - source: <a target="__blank" href="https://github.com/thavixt/mav-travel-times">GitHub</a></li>
      </ul>
    </Container>
  )
}
