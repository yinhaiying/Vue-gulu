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
     it('可以接收gutter', (done) => {
         const oDiv = document.createElement('div');
         document.body.appendChild(oDiv);
         Vue.component('g-row',Row);
         Vue.component('g-col',Col);
         oDiv.innerHTML = `
           <g-row gutter = '20' >
             <g-col></g-col>
           </g-row>
         `
         const vm = new Vue({
             el:oDiv
         })
         setTimeout(() => {
            console.log(vm.$el.outerHTML);
            done();
         },0)
     })

 })
