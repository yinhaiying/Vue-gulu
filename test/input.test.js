const expect = chai.expect;
 import Vue from 'vue'
 import Input from '../src/input'

 Vue.config.productionTip = false
 Vue.config.devtools = false

 describe('Button', () => {
     it('存在.', () => {
         expect(Input).to.be.ok
     })
     describe('props',() => {
        const Constructor = Vue.extend(Input);
        let vm;
        afterEach(() => {
            vm.$destroy();
        })
        it('可以接收value值',() => {
            vm = new Constructor({
                propsData:{
                    value:'123'
                }
            }).$mount();
            const input = vm.$el.querySelector('input');
            const value = input.value;
            expect(value).to.equal('123');

        })
        it('可以接收disabled值',() => {
            vm = new Constructor({
                propsData:{
                    disabled:true
                }
            }).$mount();
            const input = vm.$el.querySelector('input');
            expect(input.disabled).to.equal(true)
        })
        it('可以接收readonly',() => {
            vm = new Constructor({
                propsData:{
                    readonly:true
                }
            }).$mount();
            const input = vm.$el.querySelector('input');
            expect(input.readOnly).to.equal(true)
        })
        it('可以接收error',() => {
            vm = new Constructor({
                propsData:{
                    error:'测试error'
                }
            }).$mount();
            const useElement = vm.$el.querySelector('use');
            expect(useElement.getAttribute('xlink:href')).to.equal('#i-error');
            const errorMessage = vm.$el.querySelector('.error-message');
            expect(errorMessage.innerText).to.equal('测试error')
        })
     })
     describe('事件',() => {
        const Constructor = Vue.extend(Input);
        let vm;
        afterEach(() => {
            vm.$destroy();
        });
        it('支持change/input/focus/blur事件',() => {
          vm = new Constructor({}).$mount();
          const callback = sinon.fake();

          ['change','input','focus','blur'].forEach((eventName) => {
            // 监听事件
            vm.$on(eventName, callback);
            // 触发事件
            let event = new Event(eventName);
            let inputElement = vm.$el.querySelector('input');
            inputElement.dispatchEvent(event);
            // 断言
            expect(callback).to.have.been.calledWith(event);
          })

        })
        // it('支持input事件',() => {
        //   vm = new Constructor({}).$mount();
        //   const callback = sinon.fake();
        //   // 监听事件
        //   vm.$on('input', callback);
        //   // 触发事件
        //   let event = new Event('input');
        //   let inputElement = vm.$el.querySelector('input');
        //   inputElement.dispatchEvent(event);
        //   // 断言
        //   expect(callback).to.have.been.calledWith(event);
        // })
        // it('支持focus事件',() => {
        //   vm = new Constructor({}).$mount();
        //   const callback = sinon.fake();
        //   // 监听事件
        //   vm.$on('focus', callback);
        //   // 触发事件
        //   let event = new Event('focus');
        //   let inputElement = vm.$el.querySelector('input');
        //   inputElement.dispatchEvent(event);
        //   // 断言
        //   expect(callback).to.have.been.calledWith(event);
        // })
        // it('支持blur事件',() => {
        //   vm = new Constructor({}).$mount();
        //   const callback = sinon.fake();
        //   // 监听事件
        //   vm.$on('blur', callback);
        //   // 触发事件
        //   let event = new Event('blur');
        //   let inputElement = vm.$el.querySelector('input');
        //   inputElement.dispatchEvent(event);
        //   // 断言
        //   expect(callback).to.have.been.calledWith(event);
        // })
     })
 })
