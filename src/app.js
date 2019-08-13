import Vue from 'vue';
import Button from './button.vue'
import ButtonGroup from './button-group.vue'
import Icon from './icon.vue'
import Input from './input'
import Row from './row.vue'
import Col from './col.vue'
import Toast from './toast.vue'
import Plugin from './plugin'

Vue.component('g-button',Button)
Vue.component('g-icon',Icon)
Vue.component('g-button-group',ButtonGroup)
Vue.component('g-input',Input)
Vue.component('g-row',Row)
Vue.component('g-col',Col)
Vue.component('g-toast',Toast)


Vue.use(Plugin)

new Vue({
  el:'#app',
  data:{
    loading1:false,
    message:'hello world'
  },
  created(){
    
  },
  methods:{
    inputChange(value){
      console.log(value)
    },
    showToast(){
      this.$toast('这是一条展示一条展示这是一条展示',{
        closeButton:{
          text:'关闭',
          callback:function(toast){
          }
        }
      })
    }
  }
})


