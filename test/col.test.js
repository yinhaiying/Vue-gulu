const expect = chai.expect;
 import Vue from 'vue'
 import Row from '../src/row'
 import Col from '../src/col'

 Vue.config.productionTip = false
 Vue.config.devtools = false

 describe('Col', () => {
    // BDD 行为驱动测试
     it('存在.', () => {
         expect(Row).to.exist // 不是null,undefined
     })
     it('可以接收span', () => {
      const oDiv = document.createElement('div');
      const Constructor = Vue.extend(Col);
      document.body.appendChild(oDiv);
      const vm = new Constructor({
        propsData:{
          span:4
        }
      }).$mount(oDiv)
      expect(vm.$el.classList.contains('col-4')).to.eq(true);
      vm.$el.remove();
      vm.$destroy();
     })
     it('可以接收offset', () => {
      const oDiv = document.createElement('div');
      const Constructor = Vue.extend(Col);
      document.body.appendChild(oDiv);
      const vm = new Constructor({
        propsData:{
          offset:1
        }
      }).$mount(oDiv)
      expect(vm.$el.classList.contains('offset-1')).to.eq(true);
      vm.$el.remove();
      vm.$destroy();
     })
     it('可以接收ipad', () => {
      const oDiv = document.createElement('div');
      const Constructor = Vue.extend(Col);
      document.body.appendChild(oDiv);
      const vm = new Constructor({
        propsData:{
          ipad:{
            span:2,
            offset:1
          }
        }
      }).$mount(oDiv)
      expect(vm.$el.classList.contains('col-ipad-2')).to.eq(true);
      expect(vm.$el.classList.contains('ipad-offset-1')).to.eq(true);
      vm.$el.remove();
      vm.$destroy();
     })
     it('可以接收narrowPc', () => {
      const oDiv = document.createElement('div');
      const Constructor = Vue.extend(Col);
      document.body.appendChild(oDiv);
      const vm = new Constructor({
        propsData:{
          narrowPc:{
            span:2,
            offset:1
          }
        }
      }).$mount(oDiv)
      expect(vm.$el.classList.contains('col-narrow-pc-2')).to.eq(true);
      expect(vm.$el.classList.contains('narrow-pc-offset-1')).to.eq(true);
      vm.$el.remove();
      vm.$destroy();
     })
     it('可以接收widePc', () => {
      const oDiv = document.createElement('div');
      const Constructor = Vue.extend(Col);
      document.body.appendChild(oDiv);
      const vm = new Constructor({
        propsData:{
          widePc:{
            span:2,
            offset:1
          }
        }
      }).$mount(oDiv)
      expect(vm.$el.classList.contains('col-wide-pc-2')).to.eq(true);
      expect(vm.$el.classList.contains('wide-pc-offset-1')).to.eq(true);
      vm.$el.remove();
      vm.$destroy();
     })
     it('可以接收pc', () => {
      const oDiv = document.createElement('div');
      const Constructor = Vue.extend(Col);
      document.body.appendChild(oDiv);
      const vm = new Constructor({
        propsData:{
          pc:{
            span:2,
            offset:1
          }
        }
      }).$mount(oDiv)
      expect(vm.$el.classList.contains('col-pc-2')).to.eq(true);
      expect(vm.$el.classList.contains('pc-offset-1')).to.eq(true);
      vm.$el.remove();
      vm.$destroy();
     })

 })
