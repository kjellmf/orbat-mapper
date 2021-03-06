import { defineStore } from "pinia";
import { SymbologyStandard } from "../types/scenarioModels";

export const useSettingsStore = defineStore("settings", {
  state() {
    return {
      mapIconSize: 30,
      orbatIconSize: 20,
      symbologyStandard: "2525" as SymbologyStandard,
    };
  },
});
