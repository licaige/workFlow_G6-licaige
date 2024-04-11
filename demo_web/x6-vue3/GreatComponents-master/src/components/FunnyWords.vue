<template>
  <span v-html="computeWords" class="funny-words">
    
  </span>
</template>

<script lang="jsx">
export default {
  name: 'FunnyWords',

  props: {
    words: String
  },
  computed: {
    computeWords() {
      return (
        '<span class="p">' +
        this.words.split('').join('</span><span class="p">') +
        '</span>'
      )
    }
  },

  mounted () {
  },

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

<style lang="less">
.funny-words {
  & .p:nth-child(odd) {
    // color: red;
    animation:changeSize 2s linear infinite;
  }
  & .p:nth-child(even) {
    // color: blue;
    animation:changeSize 2s linear infinite reverse;
  }
  @keyframes changeSize {
    0%{
      font-size: 1rem;
    }
    25%{
      font-size: 1.2rem;
    }
    50%{
      font-size: 1rem;
    }
    75%{
      font-size: 0.8rem;
    }
    100%{
      font-size: 1rem;
    }
  }
}
</style>