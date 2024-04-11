<template>
    <div class="si-content-container">
        <FlowGraph></FlowGraph>
        <!-- <div class="graph-Toolbar"> -->
            <!-- {{colorPickerValue}}
            <X6ColorPicker :predefineColors="predefineColors" @change="changeColorPickerValue" :value="colorPickerValue"></X6ColorPicker> -->
            <!-- 开发案例 -->
            
            <!-- <div style="height: 400px;">
                <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: rgb(245, 245, 245); user-select: none;">
                    <X6SplitBox
                        split="horizontal"
                        :minSize="80"
                        :maxSize="-80"
                        defaultSize='80%'
                        primary="second"
                        :resizerStyle="{background: '#e9e9e9'}"
                    >
                        <template #first>
                            <div style="width: 100%; height: 100%; background: #fff7e6;"/>
                        </template>
                        <template #second>
                            <X6SplitBox
                                split="vertical"
                                :minSize="40"
                                :maxSize="-160"
                                :defaultSize="240"
                                primary="first"
                                :resizerStyle="{background: '#e9e9e9'}"
                            >
                                <template #first>
                                    <div style="width: 100%; height: 100%; background: #fff0f6;"/>
                                </template>
                                <template #second>
                                    <div style="width: 100%; height: 100%;">
                                        <X6SplitBox
                                            split="vertical"
                                            :minSize="40"
                                            :maxSize="-80"
                                            defaultSize='40%'
                                            primary="second"
                                            :resizerStyle="{background: '#e9e9e9'}"
                                        >
                                            <template #first>
                                                <div style="width: 100%; height: 100%;">
                                                    <X6SplitBox
                                                        split="horizontal"
                                                        :minSize="40"
                                                        :maxSize="-40"
                                                        :defaultSize="80"
                                                        primary="first"
                                                        :resizerStyle="{background: '#e9e9e9'}"
                                                    >
                                                        <template #first>
                                                            <div style="width: 100%; height: 100%; background: #e6f7ff;"/>
                                                        </template>
                                                        <template #second>
                                                            <div style="width: 100%; height: 100%; background: #e6fffb;"/>
                                                        </template>
                                                    </X6SplitBox>
                                                </div>
                                            </template>
                                            <template #second>
                                                <div style="width: 100%; height: 100%; background: #f6ffed;"/>
                                            </template>
                                        </X6SplitBox>
                                    </div>
                                </template>
                            </X6SplitBox>
                        </template>
                    </X6SplitBox>
                </div>
            </div>
        </div> -->
        <!-- <X6Scrollbox style="max-height: 350px">
            <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.

                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.

                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.
            </p>
            <p style="width: 120%;">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.

                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.

                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.
            </p>
            <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.

                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.

                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.
            </p>
        </X6Scrollbox> -->
    </div>
</template>
<script>
import FlowGraph from './flowGraph'
import hotkeys from 'hotkeys-js';
export default {
    name: 'SiContentContainer',
    components: {
        FlowGraph
    },
    data() {
        return {
            colorPickerValue: '#000000',
            predefineColors: [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585',
                'rgba(255, 69, 0, 0.68)',
                'rgb(255, 120, 0)',
                'rgba(51, 100, 98)',
                'rgba(120, 40, 94, 0.5)',
                'hsl(181, 100%, 37%)',
                'hsla(209, 100%, 56%, 0.73)',
                '#c7158577'
            ]
        }
    },
    methods: {
        changeColorPickerValue(color) {
            this.colorPickerValue = color
        }
    }
}
</script>