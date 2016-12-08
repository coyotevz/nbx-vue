<template>
  <div id="application" v-md-theme="'default'">
    <app-header></app-header>

    <main>
      <module-content></module-content>
    </main>

    <footer></footer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import ModuleContent from './components/ModuleContent'

export default {
  name: 'application',
  components: {
    AppHeader,
    ModuleContent,
  }
}
</script>
