<template>
  <SimpleModal v-model="open" dialog-title="Load scenario">
    <div
      class="mt-4 h-40 w-full rounded-lg border-2 border-dashed p-4 ring-offset-2 focus-within:ring-2 hover:border-gray-500"
      :class="isDragOver ? 'cursor-crosshair border-green-500' : ''"
      @dragover.prevent="isDragOver = true"
      @drop.prevent="onDrop"
      @dragleave="isDragOver = false"
    >
      <input
        type="file"
        id="file"
        @change="onFileLoad"
        class="absolute h-[0.1px] w-[0.1px] opacity-0"
      />
      <label
        for="file"
        class="flex h-full w-full cursor-pointer items-center justify-center hover:text-gray-700"
        ><p>Drag a file here or click to select local file</p></label
      >
    </div>
    <p v-if="isError" class="p-2 text-center text-base text-red-900">
      Please select a valid scenario file.
    </p>
  </SimpleModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useVModel } from "@vueuse/core";
import SimpleModal from "@/components/SimpleModal.vue";
import { type Scenario } from "@/types/scenarioModels";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
});
const emit = defineEmits(["update:modelValue", "loaded"]);

const open = useVModel(props, "modelValue");
const isDragOver = ref(false);
const isError = ref(false);

function readFile(file: File) {
  const reader = new FileReader();

  reader.onload = function (evt) {
    const content = evt?.target?.result as string;

    try {
      const scenarioData = JSON.parse(content) as Scenario;
      if (scenarioData?.type === "ORBAT-mapper") {
        console.log("do emit", scenarioData);
        emit("loaded", scenarioData);
        open.value = false;
      }
    } catch (e) {
      console.error("Failed to load", file.name);
      isError.value = true;
    }
  };
  reader.readAsText(file);
}

const onFileLoad = (e: Event) => {
  const target = <HTMLInputElement>e.target;
  if (!target?.files?.length) return;
  const file = target.files[0];
  if (file) readFile(file);
};

function onDrop(ev: DragEvent) {
  const file = ev?.dataTransfer?.files[0];
  if (file) readFile(file);
  isDragOver.value = false;
}
</script>
