/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// init
import "../init.ts"

// Plugins
import { registerPlugins } from "@/plugins"

// Components
import App from "./App.vue"

// Composables
import { createApp } from "vue"

const app = createApp(App)

app.directive("auto-scroll-bottom", {
  updated: (el) => {
    setTimeout(() => {
      console.log("scrollTop >>", el.scrollTop, el.scrollHeight)
      el.scrollTop = el.scrollHeight
    }, 200)
  }
})

registerPlugins(app)

app.mount("#app")
