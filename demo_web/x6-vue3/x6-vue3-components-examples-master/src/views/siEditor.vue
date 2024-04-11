<template>
    <div class="si-editor">
        <!-- <div>XXXXX</div> -->
        <!-- <SiMenubarContainer/> -->
        <SiContentContainer/>
    </div>
</template>
<script>
// import SiMenubarContainer from './siMenubarContainer'
import SiContentContainer from './siContentContainer'
export default {
    name: 'SiEditor',
    components: {
        // SiMenubarContainer,
        SiContentContainer
    }
}
</script>