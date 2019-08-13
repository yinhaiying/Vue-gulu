import Vue from 'vue';
import Button from './button.vue'
import ButtonGroup from './button-group.vue'
import Icon from './icon.vue'
import Input from './input'
import Toast from './toast.vue'
Vue.component('g-button',Button)
Vue.component('g-icon',Icon)
Vue.component('g-button-group',ButtonGroup)
Vue.component('g-input',Input)
Vue.component('g-toast',Toast)



new Vue({
  el:'#app',
  data:{
    loading1:false,
    message:'hello world'
  },
  created(){
    this.$toast('这是一条展示信息');
  },
  methods:{
    inputChange(value){
      console.log(value)
    }
  }
})


