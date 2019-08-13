import Toast from './toast'

export default {
  install(Vue,options){
    Vue.prototype.$toast = function(message,toastOptions){
      // 生成一个toast组件，然后放到body中
      const Constructor = Vue.extend(Toast);
      let toast = new Constructor({
        propsData:{
          closeButton:toastOptions.closeButton,
          position:toastOptions.position
        }
      });
      toast.$slots.default = [message];
      toast.$mount(); //必须使用$mount()进行挂载，否则所有的生命周期的函数都不会执行
      document.body.appendChild(toast.$el)
    }
  }
}
