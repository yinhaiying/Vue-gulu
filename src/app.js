import Vue from 'vue';
import Button from './button.vue'
import ButtonGroup from './button-group.vue'
import Icon from './icon.vue'
Vue.component('g-button',Button)
Vue.component('g-icon',Icon)
Vue.component('g-button-group',ButtonGroup)

new Vue({
  el:'#app',
  data:{
    loading1:false
  }
})


// 单元测试
{
  console.log(Button) // 这里得到的是一个对象
}

{
  const constructor = Vue.extend(Button);
  console.log(constructor);
  const button = new constructor();
  button.$mount('#test')
}
