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
import chai from 'chai'
let expect = chai.expect
{
  //动态生成组件
  const constructor = Vue.extend(Button);
  const vm = new constructor({
    propsData:{
      icon:'settings'
    }
  });
  vm.$mount();
  let useElement = vm.$el.querySelector('use');
  let href = useElement.getAttribute('xlink:href');
  expect(href).to.eq('#i-settings');
  vm.$el.remove();
  vm.$destroy();
}

// 同时传入icon和loading时,应该只展示loading
{
  const constructor = Vue.extend(Button);
  const vm = new constructor({
    propsData:{
      icon:'settings',
      loading:true
    }
  });
  vm.$mount();
  let useElement = vm.$el.querySelector('use');
  let href = useElement.getAttribute('xlink:href');
  expect(href).to.eq('#i-loading');
  vm.$el.remove();
  vm.$destroy();
}

// iconPosition的值 影响order的值 左侧order 1 
{
  //想要获取属性，必须把它挂载到页面的元素身上
  const div = document.createElement('div');
  document.body.appendChild(div)
  const constructor = Vue.extend(Button);
  const vm = new constructor({
    propsData:{
      icon:'settings',
      loading:true,
      iconPosition:"left"
    }
  });
  vm.$mount(div);
  let svg = vm.$el.querySelector('svg');
  let {order} = window.getComputedStyle(svg)
  expect(order).to.eq('1');
  //如果测试通过，就需要把button这个元素从页面中删除
  vm.$el.remove();
  vm.$destroy();
}
// iconPosition的值 影响order的值 右侧order 2 
{
  //想要获取属性，必须把它挂载到页面的元素身上
  const div = document.createElement('div');
  document.body.appendChild(div)
  const constructor = Vue.extend(Button);
  const vm = new constructor({
    propsData:{
      icon:'settings',
      loading:true,
      iconPosition:"right"
    }
  });
  vm.$mount(div);
  let svg = vm.$el.querySelector('svg');
  let {order} = window.getComputedStyle(svg);
  expect(order).to.eq('2');
  vm.$el.remove();
  vm.$destroy();
}
// 测试button的click事件 
{
  const constructor = Vue.extend(Button);
  const vm = new constructor({
    propsData:{
      icon:'settings',
    }
  });
  vm.$mount();
  vm.$on('click',function(){
    console.log('1')
  })
  //希望监听的这个函数被执行。而不是函数执行中的内容是正确的。
  //哪怕它是错误的，但是它也被执行了，说明click事件被处罚了。
  //这就表示测试通过了。
  let button = vm.$el;
  button.click();
}

