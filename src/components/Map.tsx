import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import OpenLayersMap from 'ol/Map.js';
import { OSM, Vector } from "ol/source";
import { useState, useEffect, useRef } from "react";
import { BUDAPEST_COORDINATES } from "../constants";
import useStore from "../store/store";
import { GrahamScan } from "../utils/grahamScan";
import { tc, createVectorSource } from "../utils/utils";
import { Coordinates } from "../types";
import { bpCircleStyle, circleStyle, grahamScanStyle } from "../utils/styles";
import { View } from "ol";
import TileLayer from "ol/layer/Tile";

export function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const olMap = useRef<OpenLayersMap>(null);
  const layers = useRef<VectorLayer[]>([]);

  const [mapLoading, setMapLoading] = useState(true);

  const time = useStore(state => state.time);
  const getReachable = useStore(state => state.getReachable);

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    const map = new OpenLayersMap({
      controls: [], // disable controls
      layers: [
        new TileLayer({ source: new OSM() }),
      ],
      view: new View({
        center: tc({
          lat: BUDAPEST_COORDINATES.lat - 0.5,
          lng: BUDAPEST_COORDINATES.lng + 0.6,
        }),
        zoom: 8,
      }),
      target: mapContainerRef.current,
    });

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
    map.addLayer(bpMarkerLayer);
    setMapLoading(false);
    olMap.current = map;

    const mapContainer = mapContainerRef.current;
    return () => {
      olMap.current = null;
      if (mapContainer) {
        mapContainer.innerHTML = '';
      }
    }
  }, [])

  useEffect(() => {
    if (!olMap.current) {
      return;
    }

    if (layers.current) {
      layers.current.forEach(layer => {
        if (!olMap.current) {
          return;
        }
        olMap.current.removeLayer(layer);
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

    olMap.current.addLayer(vectorLayer);
    olMap.current.addLayer(markerLayer); layers.current = [vectorLayer, markerLayer];
  }, [time, getReachable])

  // pointer-events-none
  return (
    <div
      ref={mapContainerRef}
      className="size-full absolute top-0 z-0 flex flex-col items-center justify-center bg-slate-400"
    >
      {mapLoading ? (
        <div>Loading...</div>
      ) : null}
    </div>
  )
}
