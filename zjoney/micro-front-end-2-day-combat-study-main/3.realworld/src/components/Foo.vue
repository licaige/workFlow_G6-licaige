<template>
    <div>
        <h2>{{msg}}</h2>
        <button @click="gethappy">get tools</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            msg:"123"
        }
    },
    methods:{
        async gethappy(){
           let toolsModule =  await window.System.import("@study/tools")
            this.msg = toolsModule.happyStar('vue')
        }
    }
}
</script>

<style>

</style>