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
 })
