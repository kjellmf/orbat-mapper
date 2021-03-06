<template>
  <SimpleModal v-model="open" dialog-title="Keyboard shortcuts">
    <div class="mt-4">
      <div v-for="category in shortcuts">
        <h4 class="border-b-2 border-gray-300 pb-1 text-base font-medium text-gray-900">
          {{ category.label }}
        </h4>
        <ul class="divide-y divide-gray-200 text-sm text-gray-900">
          <li
            v-for="entry in category.shortcuts"
            class="flex items-center justify-between py-2"
          >
            <p class="text-sm text-gray-700">{{ entry.description }}</p>
            <div>
              <ul class="flex divide-x-2 divide-gray-300">
                <li v-for="i in entry.shortcut" class="px-2 py-0.5">
                  <kbd v-for="s in i" class="kbd-shortcut">{{ s }}</kbd>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </SimpleModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SimpleModal from "./SimpleModal.vue";
import { useVModel } from "@vueuse/core";

type KeyboardShortcut = string[];

interface KeyboardEntry {
  description: string;
  shortcut: KeyboardShortcut[];
}

interface KeyboardCategory {
  label: string;
  shortcuts: KeyboardEntry[];
}

const shortcuts: KeyboardCategory[] = [
  {
    label: "Generic",
    shortcuts: [
      { shortcut: [["?"]], description: "Show help" },
      { shortcut: [["ctrl", "k"], ["s"]], description: "Search" },
      { shortcut: [["c"]], description: "Create subordinate unit" },
      { shortcut: [["e"]], description: "Edit active unit" },
      { shortcut: [["d"]], description: "Duplicate unit" },
      { shortcut: [["t"]], description: "Set scenario time" },
      { shortcut: [["ctrl", "z"]], description: "Undo" },
      {
        shortcut: [
          ["ctrl", "shift", "z"],
          ["ctrl", "y"],
        ],
        description: "Redo",
      },
    ],
  },
  {
    label: "Map",
    shortcuts: [
      { shortcut: [["z"]], description: "Zoom to unit" },
      { shortcut: [["p"]], description: "Pan to unit" },
    ],
  },
];

export default defineComponent({
  name: "ShortcutsModal",
  components: {
    SimpleModal,
  },
  props: {
    modelValue: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  setup(props) {
    const open = useVModel(props, "modelValue");

    return {
      open,
      shortcuts,
    };
  },
});
</script>
