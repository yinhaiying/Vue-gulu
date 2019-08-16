
import Vue from 'vue';
import Button from './button.vue'
import ButtonGroup from './button-group.vue'
import Icon from './icon.vue'
import Input from './input'
import Row from './row.vue'
import Col from './col.vue'
import Toast from './toast.vue'
import Plugin from './plugin'

import Tabs from './tabs/tabs.vue'
import TabsHead from './tabs/tabs-head.vue'
import TabsBody from './tabs/tabs-body.vue'
import TabsItem from './tabs/tabs-item.vue'
import TabsPane from './tabs/tabs-pane.vue'




Vue.component('g-button',Button)
Vue.component('g-icon',Icon)
Vue.component('g-button-group',ButtonGroup)
Vue.component('g-input',Input)
Vue.component('g-row',Row)
Vue.component('g-col',Col)
Vue.component('g-toast',Toast)
Vue.component('g-tabs',Tabs)
Vue.component('g-tabs-head',TabsHead)
Vue.component('g-tabs-body',TabsBody)
Vue.component('g-tabs-item',TabsItem)
Vue.component('g-tabs-pane',TabsPane)


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
    showToast1(){
      this.$toast(`当前数字为${Math.random() * 100}`,{
        position:'top',
        closeButton:{
          text:'关闭',
          callback:function(toast){
          }
        }
      })
    },
    showToast2(){
      this.$toast(`当前数字为${Math.random() * 100}`,{
        position:'middle',
        closeButton:{
          text:'关闭',
          callback:function(toast){
          }
        }
      })
    },
    showToast3(){
      this.$toast(`当前数字为${Math.random() * 100}`,{
        position:'bottom',
        closeButton:{
          text:'关闭',
          callback:function(toast){
          }
        }
      })
    },
  }
})


