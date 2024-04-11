<template>
  <div class="OlympicRings">
    <div class="ring"></div>
    <div class="ring"></div>
    <div class="ring"></div>
    <div class="ring"></div>
    <div class="ring"></div>
  </div>
</template>

<script>
export default {
  name: 'OlympicRings',
  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="less" scoped>
.OlympicRings ::v-deep {
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  justify-content: center;
  perspective: 500px;
  transform-style: preserve-3d;
  & > .ring {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: 10px solid;
    margin: 0 5px;
  }
  & > .ring:nth-child(1) {
    border-color: #3884c2;
  }
  & > .ring:nth-child(2) {
    border-color: #000;
    transform: rotateX(2deg);
    transform-origin: center 80%;
  }
  & > .ring:nth-child(3) {
    border-color: #d83a31;
    transform: rotateX(4deg);
    transform-origin: center 80%;
  }
  & > .ring:nth-child(4) {
    border-color: #f9d549;
    transform-origin: center 15%;
    transform: translateY(-50px) rotateX(1deg);
  }
  & > .ring:nth-child(5) {
    border-color: #55ac58;
    transform-origin: center 20%;
    transform: translateY(-50px) rotateX(3deg);
  }
}
</style>