"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useConfigStore from "../store/config-store";
import dateFormatter from "@/utils/dateFormatter";
import useGeoJson, { GeoJson } from "@/hooks/features/trends/useGeoJson";
import { Fragment, useCallback, useState } from "react";
import { Layer, Map as MapGl, Source } from "react-map-gl";
import { useTheme } from "next-themes";
import PH_JSON from "@/data/geojson/ph.json";
import { MAP_THEME } from "@/constants";
import useTrends from "@/hooks/features/useTrends";

const Maps = ({ details }: { details: string }) => {
  const { theme } = useTheme();
  const { category, since, until, level } = useConfigStore();
  const trends = useTrends({
    category,
    level,
    details,
    since: since!,
    until: until!,
  });
  const geoJson = useGeoJson({
    category,
    since: since && dateFormatter("ISO", since),
    until: until && dateFormatter("ISO", until),
  });
  const [feature, setFeature] = useState<{
    data?: GeoJson[0];
    x: number;
    y: number;
  } | null>(null);

  const onMouseMove = useCallback(
    (event: mapboxgl.MapLayerMouseEvent) => {
      const {
        features,
        originalEvent: { offsetX, offsetY },
      } = event;
      const hoveredFeature = features && features[0];

      const data = geoJson.data?.find(
        (f) => f.rid === hoveredFeature?.properties!.regcode
      );

      setFeature(
        hoveredFeature
          ? {
              data,
              x: offsetX,
              y: offsetY,
            }
          : null
      );
    },
    [geoJson.data]
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maps</CardTitle>
      </CardHeader>
      <CardContent className="h-96">
        {geoJson.data && trends.data && (
          <>
            <MapGl
              interactiveLayerIds={["geo-json"]}
              initialViewState={{
                longitude: 122.4,
                latitude: 11.8,
                zoom: 4,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle={theme === "dark" ? MAP_THEME.dark : MAP_THEME.light}
              onMouseMove={onMouseMove}
              onClick={(e) => {
                if (e.features && e.features[0])
                  window.open(
                    `/trends/${e.features[0].properties!.regcode}`,
                    "_blank"
                  );
              }}
            >
              <Source
                type="geojson"
                data={PH_JSON as GeoJSON.FeatureCollection<GeoJSON.Geometry>}
              >
                <Layer
                  id={"geo-json"}
                  key={"geo-json"}
                  type="fill"
                  paint={{
                    "fill-color": {
                      type: "categorical",
                      property: "regcode",
                      stops: geoJson.data.map((item) => [
                        item.rid,
                        trends.data.colors[item.pct_total[0].key],
                      ]),
                    },
                    "fill-opacity": 0.5,
                  }}
                />
              </Source>
              {feature && (
                <Card
                  style={{
                    top: feature.y,
                    left: feature.x,
                    position: "absolute",
                    zIndex: 10,
                  }}
                >
                  <CardHeader>
                    <CardTitle>{feature.data?.region}</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-12 gap-x-2">
                    {feature.data?.pct_total.map((item, index) => (
                      <Fragment key={index}>
                        <span className="col-span-8">
                          #{item.rank} {item.name}:
                        </span>
                        <div className="col-span-4">
                          {(item.value * 100).toFixed(2)}
                        </div>
                      </Fragment>
                    ))}
                  </CardContent>
                </Card>
              )}
            </MapGl>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Maps;
