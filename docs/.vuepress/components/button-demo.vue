<!--  -->
<template>
  <div>
    <g-button>默认按钮</g-button>
    <g-button icon = "settings">默认按钮</g-button>
    <g-button :loading= "true">默认按钮</g-button>
    <g-button disabled>默认按钮</g-button>
    <code>
      <pre>{{pre}}</pre>
    </code>
  </div>
</template>

<script>
import Button from '../../../src/button.vue'
export default {
  data () {
    return {
      pre:`
          <g-button>默认按钮</g-button>
          <g-button icon = "settings">默认按钮</g-button>
          <g-button :loading= "true">默认按钮</g-button>
          <g-button disabled>默认按钮</g-button>
      `.replace(/\t| +/g,'').trim()
    };
  },

  components: {
    'g-button':Button
  },
}

</script>
<style lang='scss' scoped>
</style>
