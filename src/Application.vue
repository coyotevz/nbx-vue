<template>
  <div id="application" v-md-theme="'default'">
    <app-header></app-header>

    <app-sidenav></app-sidenav>

    <main>
      <module-content></module-content>
    </main>

    <footer></footer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppSidenav from './components/AppSidenav'
import ModuleContent from './components/ModuleContent'

export default {
  name: 'application',
  components: {
    AppHeader,
    AppSidenav,
    ModuleContent,
  }
}
</script>
