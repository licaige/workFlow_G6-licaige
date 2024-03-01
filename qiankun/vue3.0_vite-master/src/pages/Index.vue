
<template>
  <div class="wrap">
    <div class="leftcontainer">
      <div class="buttonOperate">
        <span @click="showDrawer">新增</span>
        <span>删除</span>
      </div>
      <Table>
        <template #headerCus="{ innerTableData }">
          <template v-if="innerTableData.column.key === 'name'">
            <span>
              Name
            </span>
          </template>
        </template>

        <template #bodyCus="{ innerTableData }">
          <template v-if="innerTableData.column.key === 'name'">
            <a>
              {{ innerTableData.record.name }}
            </a>
          </template>
          <template v-else-if="innerTableData.column.key === 'tags'">
            <span>
              <a-tag v-for="tag in innerTableData.record.tags" :key="tag"
                :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
          </template>
          <template v-else-if="innerTableData.column.key === 'action'">
            <span>
              <a>Invite 一 {{ innerTableData.record.name }}</a>
              <a-divider type="vertical" />
              <a>Delete</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link">
                More actions
                <down-outlined />
              </a>
            </span>
          </template>
        </template>

      </Table>
    </div>
    
    <a-drawer v-model:open="open" class="custom-class" root-class-name="root-class-name" :root-style="{ color: 'blue' }" style="color: red" title="Basic Drawer" placement="right" @after-open-change="afterOpenChange">
      <!-- <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Tab 1"><Tab1></Tab1></a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2"><Tab2></Tab2></a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3"><Tab3></Tab3></a-tab-pane>
      </a-tabs> -->
      <Tabs a="123" :b="Tab3">
        <div>
          <div>222</div>
        </div>
        <div>444</div>
        <template #bbb="reciveData">
          <span @click="()=>{console.log(reciveData)}">接收到的slot传过来的值</span>
          <p>66666</p>
        </template>

      </Tabs>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted, onUpdated } from 'vue';
import Tab1 from './tabscomponent/Tab1.vue'
import Tab2 from './tabscomponent/Tab2.vue'
import Tab3 from './tabscomponent/Tab3.vue'
import Table from './Table.vue'
import Tabs from './Tabs.vue'
const open = ref<boolean>(false);
const activeKey = ref<string | number>('3');
// const com = ref<any>();
// com.value = Tab3;
const afterOpenChange:Function = (openFlag: boolean) :void => {
  console.log('open', openFlag)
}

const showDrawer = () => {
  open.value = true
}

console.log('parent setup')

onMounted(()=>{console.log('parent Mounted')})
onUpdated(()=>{console.log('parent Update')})
</script>
<style scoped>
.wrap {
  display: flex;
  justify-content: space-between;
}

.leftcontainer {
  width: 100%;
  height: 100vh;
  background: #ccc;
}

.buttonOperate span {
  display: inline-block;
  padding: 5px 10px;
  background: #ddd;
  margin: 10px;
  border-radius: 4px;
}

/* .rightcontainer{
  width: 600px;
  height:100vh;
  background:#ddd;
} */
</style>
