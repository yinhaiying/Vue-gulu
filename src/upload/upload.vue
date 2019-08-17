<template>
  <div class = "gulu-uploader">
    <div @click = "onUploadClick">
      <slot></slot>
    </div>
    <div ref = "temp" style = "width:0;height:0;overflow:hidden"></div>
  </div>
</template>


<script>
export default {
  name:'Upload',
  methods:{
    onUploadClick(){

      let oInput = document.createElement('input');
      oInput.type = 'file';
      oInput.addEventListener('change',() => {
        let file = oInput.files[0];
        oInput.remove();
        console.log(file);
      })
      this.$refs.temp.appendChild(oInput);
      //在这里手动触发input的click事件。
      oInput.click();
    }
  }

}
</script>script


<style lang="scss">

</style>
