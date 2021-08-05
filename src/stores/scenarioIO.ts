import { defineStore } from "pinia";
import { until, useFetch, useLocalStorage } from "@vueuse/core";
import { useScenarioStore } from "./scenarioStore";
import { ObjectMapping, Scenario } from "../types/models";

export const useScenarioIO = defineStore({
  id: "scenarioIO",
  actions: {
    saveToLocalStorage(key = "orbat-scenario") {
      const scn = useLocalStorage(key, "");
      const scenario = useScenarioStore();
      scn.value = scenario.stringify();
    },

    loadFromLocalStorage(key = "orbat-scenario") {
      const scenario = useScenarioStore();
      const scn = useLocalStorage(key, "");

      if (scn.value) {
        scenario.$reset();
        scenario.loadScenario(JSON.parse(scn.value));
      }
    },

    async loadFromUrl(url: string) {
      const scenario = useScenarioStore();
      const { data, isFinished, statusCode, error } =
        useFetch<Scenario>(url).json();
      await until(isFinished).toBe(true);

      if (error.value) {
        console.error(statusCode.value, error.value);
        return;
      }
      scenario.$reset();
      scenario.loadScenario(data.value);
    },

    async loadDemoScenario(id: string) {
      const idUrlMap: ObjectMapping<string> = {
        falkland82: "/scenarios/falkland82.json",
        narvik40: "/scenarios/narvik40.json",
      };
      const url = idUrlMap[id];
      if (!url) {
        console.warn("Unknown scenario id", id);
        return;
      }
      await this.loadFromUrl(url);
    },
  },
});