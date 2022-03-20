import { EventBusKey } from "@vueuse/core";
import { Unit } from "../types/scenarioModels";

export const orbatUnitClick = Symbol() as EventBusKey<Unit>;
export const mapUnitClick = Symbol() as EventBusKey<Unit>;
