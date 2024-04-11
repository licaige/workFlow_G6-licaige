<template>
    <div carouselColor>
        <el-carousel
            trigger="click"
            height="95px"
            :interval="5000"
            :autoplay="false"
            @click="changeColor($event)"
            arrow="always">
            <el-carousel-item>
                <div style="white-space: nowrap; padding-top: 14px; text-align: center;">
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(255, 255, 255); border: 1px solid rgb(42, 42, 42); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(245, 245, 245); border: 1px solid rgb(102, 102, 102); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(218, 232, 252); border: 1px solid rgb(108, 142, 191); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(213, 232, 212); border: 1px solid rgb(130, 179, 102); border-radius: 0px;"></button>
                    <br>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(255, 230, 204); border: 1px solid rgb(215, 155, 0); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(255, 242, 204); border: 1px solid rgb(214, 182, 86); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(248, 206, 204); border: 1px solid rgb(184, 84, 80); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(225, 213, 231); border: 1px solid rgb(150, 115, 166); border-radius: 0px;"></button>
                </div>
            </el-carousel-item>
            <el-carousel-item>
                <div style="white-space: nowrap; padding-top: 14px; text-align: center;">
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(255, 255, 255); border: 1px solid rgb(42, 42, 42); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(96, 169, 23); border: 1px solid rgb(45, 118, 0); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(0, 138, 0); border: 1px solid rgb(0, 87, 0); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(27, 161, 226); border: 1px solid rgb(0, 110, 175); border-radius: 0px;"></button>
                    <br>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(0, 80, 239); border: 1px solid rgb(0, 29, 188); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(106, 0, 255); border: 1px solid rgb(55, 0, 204); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(216, 0, 115); border: 1px solid rgb(165, 0, 64); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(162, 0, 37); border: 1px solid rgb(111, 0, 0); border-radius: 0px;"></button>
                </div>
            </el-carousel-item>
            <el-carousel-item>
                <div style="white-space: nowrap; padding-top: 14px; text-align: center;">
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(229, 20, 0); border: 1px solid rgb(178, 0, 0); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(250, 104, 0); border: 1px solid rgb(199, 53, 0); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(240, 163, 10); border: 1px solid rgb(189, 112, 0); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(227, 200, 0); border: 1px solid rgb(176, 149, 0); border-radius: 0px;"></button>
                    <br>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(109, 135, 100); border: 1px solid rgb(58, 84, 49); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(100, 118, 135); border: 1px solid rgb(49, 67, 84); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(118, 96, 138); border: 1px solid rgb(67, 45, 87); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(160, 82, 45); border: 1px solid rgb(109, 31, 0); border-radius: 0px;"></button>
                </div>
            </el-carousel-item>
            <el-carousel-item>
                <div style="white-space: nowrap; padding-top: 14px; text-align: center;">
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(255, 255, 255); border: 1px solid rgb(42, 42, 42); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEzRDlBMUUwODYxMTExRTFCMzA4RDdDMjJBMEMxRDM3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEzRDlBMUUxODYxMTExRTFCMzA4RDdDMjJBMEMxRDM3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTNEOUExREU4NjExMTFFMUIzMDhEN0MyMkEwQzFEMzciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTNEOUExREY4NjExMTFFMUIzMDhEN0MyMkEwQzFEMzciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5xh3fmAAAABlBMVEX////MzMw46qqDAAAAGElEQVR42mJggAJGKGAYIIGBth8KAAIMAEUQAIElnLuQAAAAAElFTkSuQmCC&quot;); border: 1px solid rgb(42, 42, 42); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(250, 215, 172); border: 1px solid rgb(180, 101, 4); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(250, 217, 213); border: 1px solid rgb(174, 65, 50); border-radius: 0px;"></button>
                    <br>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(176, 227, 230); border: 1px solid rgb(14, 128, 136); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(177, 221, 240); border: 1px solid rgb(16, 115, 158); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(208, 206, 226); border: 1px solid rgb(86, 81, 126); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(186, 200, 211); border: 1px solid rgb(35, 68, 93); border-radius: 0px;"></button>
                </div>
            </el-carousel-item>
            <el-carousel-item>
                <div style="white-space: nowrap; padding-top: 14px; text-align: center;">
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(255, 255, 255); border: 1px solid rgb(42, 42, 42); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-image: linear-gradient(rgb(245, 245, 245) 0px, rgb(179, 179, 179) 100%); border: 1px solid rgb(102, 102, 102); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-image: linear-gradient(rgb(218, 232, 252) 0px, rgb(126, 166, 224) 100%); border: 1px solid rgb(108, 142, 191); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-image: linear-gradient(rgb(213, 232, 212) 0px, rgb(151, 208, 119) 100%); border: 1px solid rgb(130, 179, 102); border-radius: 0px;"></button>
                    <br>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-image: linear-gradient(rgb(255, 205, 40) 0px, rgb(255, 165, 0) 100%); border: 1px solid rgb(215, 155, 0); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-image: linear-gradient(rgb(255, 242, 204) 0px, rgb(255, 217, 102) 100%); border: 1px solid rgb(214, 182, 86); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-image: linear-gradient(rgb(248, 206, 204) 0px, rgb(234, 107, 102) 100%); border: 1px solid rgb(184, 84, 80); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-image: linear-gradient(rgb(230, 208, 222) 0px, rgb(213, 115, 157) 100%); border: 1px solid rgb(153, 97, 133); border-radius: 0px;"></button>
                </div>
            </el-carousel-item>
            <el-carousel-item>
                <div style="white-space: nowrap; padding-top: 14px; text-align: center;">
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(255, 255, 255); border: 1px solid rgb(42, 42, 42); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(238, 238, 238); border: 1px solid rgb(54, 57, 61); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(249, 247, 237); border: 1px solid rgb(54, 57, 61); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(255, 204, 153); border: 1px solid rgb(54, 57, 61); border-radius: 0px;"></button>
                    <br>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(204, 229, 255); border: 1px solid rgb(54, 57, 61); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(255, 255, 136); border: 1px solid rgb(54, 57, 61); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(205, 235, 139); border: 1px solid rgb(54, 57, 61); border-radius: 0px;"></button>
                    <button style="width: 36px; height: 24px; margin: 0px 6px 6px 0px; background-color: rgb(255, 204, 204); border: 1px solid rgb(54, 57, 61); border-radius: 0px;"></button>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
export default {
    name: 'CarouselColor',
    emits: ['change'],
    methods: {
        changeColor(e) {
            if (e.target.tagName.toLowerCase() == 'button') {
                let backgroundColor = e.target.style.backgroundColor
                this.$emit('change', backgroundColor)
            }
        }
    }
}
</script>