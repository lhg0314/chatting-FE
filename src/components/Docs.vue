<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-row class="d-flex align-center justify-center">
        <v-tooltip text="Tooltip">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" @click="testFn">Tooltip</v-btn>
          </template>
        </v-tooltip>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn href="" min-width="164" rel="noopener noreferrer" target="_blank" variant="text">
            <v-icon icon="mdi-view-dashboard" size="large" start />

            test1
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn href="" min-width="164" rel="noopener noreferrer" target="_blank" variant="text">
            <v-icon icon="mdi-view-dashboard" size="large" start />

            test2
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn href="" min-width="164" rel="noopener noreferrer" target="_blank" variant="text">
            <v-icon icon="mdi-view-dashboard" size="large" start />

            test3
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/docs"

const store = useAppStore()

const testFn = () => {
  store.requestFunction()
}
</script>
