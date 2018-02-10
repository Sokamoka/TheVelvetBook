<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
    <main-footer></main-footer>
    <dialogs-wrapper></dialogs-wrapper>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import mainFooter from './components/Footer.vue'
export default {
  name: 'app',
  components: {
    Navbar,
    mainFooter: mainFooter
  }
}
</script>
