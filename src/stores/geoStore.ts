import { defineStore } from "pinia";
import OLMap from "ol/Map";
import BaseLayer from "ol/layer/Base";
import { Collection } from "ol";
import BaseTileLayer from "ol/layer/BaseTile";
import BaseVectorLayer from "ol/layer/BaseVector";
import { Unit } from "../types/models";
import { fromLonLat } from "ol/proj";

export const useGeoStore = defineStore({
  id: "geo",
  state: () => ({
    olMap: null as OLMap | null,
    layers: null as unknown as Collection<
      BaseLayer | BaseTileLayer<any> | BaseVectorLayer<any>
    >,
  }),
  actions: {
    zoomToUnit(unit?: Unit | null, duration = 900) {
      const location = unit?._state?.coordinates;
      if (!location) return;
      const view = this.olMap!.getView();
      view.animate({
        zoom: 10,
        center: fromLonLat(location, view.getProjection()),
        duration,
      });
    },

    panToUnit(unit?: Unit | null, duration = 900) {
      const location = unit?._state?.coordinates;
      if (!location) return;
      const view = this.olMap!.getView();
      view.animate({
        center: fromLonLat(location, view.getProjection()),
        duration,
      });
    },
  },
});