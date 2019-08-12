import Vue from 'vue';
import Button from './button.vue'
import ButtonGroup from './button-group.vue'
import Icon from './icon.vue'
import Input from './input'
import Row from './row.vue'
import Col from './col.vue'
Vue.component('g-button',Button)
Vue.component('g-icon',Icon)
Vue.component('g-button-group',ButtonGroup)
Vue.component('g-input',Input)
Vue.component('g-row',Row)
Vue.component('g-col',Col)



new Vue({
  el:'#app',
  data:{
    loading1:false,
    message:'hello world'
  },
  methods:{
    inputChange(value){
      console.log(value)
    }
  }
})


