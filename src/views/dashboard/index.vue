<template>
  <div class="homeBox">
    <admin-component></admin-component>
  </div>
</template>

<script>
import adminComponent from './admin'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['user'])
  },
  components: {
    adminComponent
  }
}
</script>
