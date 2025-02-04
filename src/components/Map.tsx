import Feature from "ol/Feature";
import Fill from "ol/style/Fill";
import OpenLayersMap from 'ol/Map.js';
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import View from "ol/View";
import useStore from "../store/store";
import { OSM, Vector } from "ol/source";
import Stroke from "ol/style/Stroke";
import CircleStyle from 'ol/style/Circle';

import { useState, useEffect, useRef } from "react";
import { BUDAPEST_COORDINATES, tc } from "../constants";

// const style = new Style({
//   fill: new Fill({
//     color: [255, 0, 0, 1],
//   }),
//   stroke: new Stroke({
//     width: 6,
//     color: [0, 0, 255, 1],
//   }),
// });

const circleStyle = new Style({
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({
      color: [255, 255, 0, 0.7],
    }),
    stroke: new Stroke({
      width: 6,
      color: [0, 0, 200, 0.7],
    }),
  }),
});

export function Map() {
  const [loading, setLoading] = useState(false);
  const getReachable = useStore(state => state.getReachable);
  const time = useStore(state => state.time);

  // OpenLayers stuff refs
  const map = useRef<OpenLayersMap | null>(null);
  const layers = useRef<VectorLayer[]>([]);

  useEffect(() => {
    setLoading(true);

    const olMap = new OpenLayersMap({
      // disable controls
      // zooming and panning is disabled by blocking pointer events with CSS
      controls: [],
      layers: [
        new TileLayer({ source: new OSM() }),
      ],
      view: new View({
        center: tc({
          lat: BUDAPEST_COORDINATES.lat - 0.6,
          lng: BUDAPEST_COORDINATES.lng + 0.7,
        }),
        zoom: 8,
      }),
      target: 'map',
    });

    map.current = olMap;
    setLoading(false);

    return () => {
      map.current = null;
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        mapContainer.innerHTML = '';
      }
    }
  }, [])

  useEffect(() => {
    if (!map.current) {
      return;
    }
    setLoading(true);
    if (layers.current) {
      layers.current.forEach(layer => {
        map.current?.removeLayer(layer);
      })
      layers.current = [];
    }

    const reachableCities = getReachable();
    const reachableCoords = reachableCities.map(city => city.gps);
    reachableCoords.push(BUDAPEST_COORDINATES);

    // vector layer
    // const grahamScan = new GrahamScan();
    // reachableCoords.forEach(c => {
    //   grahamScan.addPoint(c.lng, c.lat);
    // })
    // const hull = grahamScan.getHull();
    // if (!hull) {
    //   console.error('GrahamScan failed', hull);
    //   return;
    // }
    // const hullCoordinates = hull?.map<Coordinates>(p => {
    //   return {
    //     lng: p.x,
    //     lat: p.y,
    //   }
    // })
    // const vectorLayer = new VectorLayer({
    //   source: createVectorSource([
    //     ...hullCoordinates,
    //   ]),
    //   style,
    // });

    // marker layer
    const markerLayer = new VectorLayer({
      source: new Vector({
        features: reachableCoords.map(c => (
          new Feature({
            geometry: new Point(tc(c))
          })
        ))
        // features: [
        //   new Feature({
        //     geometry: new Point(tc(BUDAPEST_COORDINATES))
        //   })
        // ]
      }),
      style: circleStyle,
    });

    // map.current.addLayer(vectorLayer);
    map.current.addLayer(markerLayer);

    // layers.current = [vectorLayer, markerLayer];
    layers.current = [markerLayer];
    setLoading(false);
  }, [map, time])

  if (loading) {
    return (
      <div className="size-full place-items-center text-center">Loading...</div>
    )
  }

  return (
    <div
      id="map"
      className="size-full absolute top-0 pointer-events-none -z-50"
    />
  )
}