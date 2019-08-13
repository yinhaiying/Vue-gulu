/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 08:58:39
 * @LastEditTime: 2019-08-13 22:05:11
 * @LastEditors: Please set LastEditors
 */

import Toast from './toast'



let currentToast ;
export default {
  install(Vue,options){
    Vue.prototype.$toast = function(message,toastOptions){
      if(currentToast){
        //实例创建完成以后在这里也可以调用toast实例中的方法。
        currentToast.close();
      }
      currentToast = createToast({
        Vue,
        message,
        propsData:toastOptions,
        onClose:() => {
          currentToast = null;
        }
      });
    }
  }
}


/**
 * @description: 创建toast实例的函数
 * @param {type}
 * @return: 返回一个toast
 */
function createToast({Vue,message,propsData,onClose}){
  // 生成一个toast组件，然后放到body中
  const Constructor = Vue.extend(Toast);
  let toast = new Constructor({propsData});
  toast.$slots.default = [message];
  toast.$mount(); //必须使用$mount()进行挂载，否则所有的生命周期的函数都不会执行
  toast.$on('close',onClose)
  document.body.appendChild(toast.$el);
  return toast;
}
