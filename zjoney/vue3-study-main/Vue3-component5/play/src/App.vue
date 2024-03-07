<script setup lang="ts">
/**
  - 安装icon方式：https://github.com/07akioni/xicons
  - 网站：https://www.xicons.org/#/
  - 命令：npm i -D @vicons/ionicons5
  - import { AddCircle} from '@vicons/ionicons5'
  
 */
import { UploadRawFile } from '@zi-shui/components/upload/src/upload';

  const handleBeforeUpload = (rawFile:UploadRawFile)=>{

    // return false;
    return true
  }
</script>

<template>
<!--  使用方式
  <z-icon :color="'red'" :size="20">
    <AddCircle></AddCircle>
    </z-icon>
-->
  <z-upload multiple :before-upload="handleBeforeUpload" action="http://localhost:4000/upload" drag>
    <z-button>点我上传</z-button>
  </z-upload>
</template>
