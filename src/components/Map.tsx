import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OpenLayersMap from 'ol/Map.js';
import { OSM, Vector } from "ol/source";
import View from "ol/View";
import { useState, useEffect, useRef } from "react";
import { BUDAPEST_COORDINATES } from "../constants";
import useStore from "../store/store";
import { GrahamScan } from "../utils/grahamScan";
import { tc, createVectorSource } from "../utils/utils";
import { Coordinates } from "../types";
import { bpCircleStyle, circleStyle, grahamScanStyle } from "../utils/styles";

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
      controls: [], // disable controls
      layers: [
        new TileLayer({ source: new OSM() }),
      ],
      view: new View({
        center: tc({
          lat: BUDAPEST_COORDINATES.lat - 0.3,
          lng: BUDAPEST_COORDINATES.lng + 0.7,
        }),
        zoom: 8,
      }),
      target: 'map',
    });

    map.current = olMap;

    const bpMarkerLayer = new VectorLayer({
      source: new Vector({
        features: [
          new Feature({
            geometry: new Point(tc(BUDAPEST_COORDINATES))
          })
        ]
      }),
      style: bpCircleStyle,
    });
    map.current.addLayer(bpMarkerLayer);

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
    // marker layer
    const markerLayer = new VectorLayer({
      source: new Vector({
        features: reachableCoords.map(c => (
          new Feature({
            geometry: new Point(tc(c))
          })
        ))
      }),
      style: circleStyle,
    });

    // vector layer
    reachableCoords.push(BUDAPEST_COORDINATES);
    const grahamScan = new GrahamScan();
    reachableCoords.forEach(c => {
      grahamScan.addPoint(c.lng, c.lat);
    })
    const hull = grahamScan.getHull();
    if (!hull) {
      console.error('GrahamScan failed', hull);
      return;
    }
    const hullCoordinates = hull?.map<Coordinates>(p => {
      return {
        lng: p.x,
        lat: p.y,
      }
    })
    const vectorLayer = new VectorLayer({
      source: createVectorSource([
        ...hullCoordinates,
      ]),
      style: grahamScanStyle,
    });

    map.current.addLayer(vectorLayer);
    map.current.addLayer(markerLayer);

    layers.current = [vectorLayer, markerLayer];
    setLoading(false);
  }, [map, time])

  if (loading) {
    return (
      <div className="size-full place-items-center text-center">Loading...</div>
    )
  }

  // pointer-events-none
  return (
    <div
      id="map"
      className="size-full absolute top-0 z-0"
    />
  )
}