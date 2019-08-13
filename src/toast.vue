<template>
  <div class = "toast">toast</div>
</template>

<script>
import Vue from 'vue'
Vue.prototype.$toast = function(message){
  console.log(message)
}
export default {
  name:'Gulu-toast'
}

</script>

<style lang = "scss" scoped>

</style>
