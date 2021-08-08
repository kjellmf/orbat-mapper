import { createUnitFeatureAt, createUnitLayer } from "../geo/layers";
import { useScenarioStore } from "../stores/scenarioStore";

export function useUnitLayer() {
  const scenarioStore = useScenarioStore();
  const unitLayer = createUnitLayer();
  const drawUnits = () => {
    unitLayer.getSource().clear();
    const units = scenarioStore.everyVisibleUnits.map((unit) => {
      return createUnitFeatureAt(unit._state!.coordinates!, unit);
    });
    unitLayer.getSource().addFeatures(units);
  };

  return { unitLayer, drawUnits };
}
