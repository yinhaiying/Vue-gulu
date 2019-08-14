const expect = chai.expect;
 import Vue from 'vue'
 import Toast from '../src/toast.vue'

 Vue.config.productionTip = false
 Vue.config.devtools = false

 describe('Toast', () => {
     it('存在.', () => {
         expect(Toast).to.exist
     })
     describe('props',() => {
        const Constructor = Vue.extend(Toast);
        let vm;
        afterEach(() => {
            vm.$destroy();
        })
        it('可以接收autoClose',(done) => {
          let oDiv = document.createElement('div');
          document.body.appendChild(oDiv);
            vm = new Constructor({
              propsData:{
                autoClose:true,
                autoCloseDelay:1
              }
            }).$mount(oDiv);
            // 监听它的close事件是否执行
            vm.$on('close',() => {
              // 延迟一秒后它的元素已经不在body中
              expect(document.body.contains(vm.$el)).to.eq(false);
              done()
            })
        })
        it('可以接收autoCloseDelay',(done) => {
          let oDiv = document.createElement('div');
          document.body.appendChild(oDiv);
            vm = new Constructor({
              propsData:{
                autoClose:true,
                autoCloseDelay:1
              }
            }).$mount(oDiv);
            expect(typeof vm.autoCloseDelay === 'number').to.equal(true)
            // 监听它的close事件是否执行
            vm.$on('close',() => {
              // 延迟一秒后它的元素已经不在body中
              expect(document.body.contains(vm.$el)).to.eq(false);
              done()
            })
        })
        it('可以接收closeButton',() => {
          const callback = sinon.fake();
            vm = new Constructor({
              propsData:{
                closeButton:{
                  text:'关闭',
                  callback
                }
              }
            }).$mount();
            let spanElm = vm.$el.querySelector('.close');
            expect(spanElm.innerText).eq('关闭');
            // 这里原生的js可以直接调用
            spanElm.click();
            expect(callback).to.have.been.called;
        })
        it('可以接收position',() => {

            vm = new Constructor({
              propsData:{
                position:'bottom'
              }
            }).$mount();
            //观察toast-bottom这个class是否存在
            expect(vm.$el.classList.contains('position-bottom')).to.eq(true)
        })
     })

 })
