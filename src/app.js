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
import spies from 'chai-spies'
chai.use(spies);
{
  const constructor = Vue.extend(Button);
  const vm = new constructor({
    propsData:{
      icon:'settings',
    }
  });
  vm.$mount();
  // spy间谍函数把原来要监听的函数替代了。
  const spy = chai.spy(function(){});
  vm.$on('click',spy)
  let button = vm.$el;
  button.click();
  //这个spy函数是否被调用可以被监控到
  //把原来不能监控的函数替代成了可以被监控的spy函数。
  expect(spy).to.have.been.called();
}

