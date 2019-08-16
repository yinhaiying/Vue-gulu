const expect = chai.expect;
 import Vue from 'vue'
 import Row from '../src/row'
 import Col from '../src/col'

 Vue.config.productionTip = false
 Vue.config.devtools = false

 describe('Row', () => {
    // BDD 行为驱动测试
     it('存在.', () => {
         expect(Row).to.exist // 不是null,undefined
     })
     it('可以接收gutter', (done) => {
         const oDiv = document.createElement('div');
         document.body.appendChild(oDiv);
         Vue.component('g-row',Row);
         Vue.component('g-col',Col);
         oDiv.innerHTML = `
           <g-row gutter = '20' >
             <g-col></g-col>
             <g-col></g-col>
           </g-row>
         `
         const vm = new Vue({
             el:oDiv
         })
         setTimeout(() => {
            const cols = vm.$el.querySelectorAll('.col');
            const row = vm.$el.querySelector('.row');
            expect(getComputedStyle(cols[0]).paddingLeft).to.eq('10px');
            expect(getComputedStyle(cols[1]).paddingRight).to.eq('10px');
            expect(getComputedStyle(row).marginLeft).to.eq('-10px');
            expect(getComputedStyle(row).marginRight).to.eq('-10px');
            done();
            vm.$el.remove();
            vm.$destroy();

         },0)
     })

 })
