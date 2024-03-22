<template>
  <div>
    <h2>Vue3 + Element plus 动态表格</h2>
    <h3>「卡拉云 - 极速搭建企业内部工具，十倍提升开发效率」</h3>
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column
        :prop="index"
        :label="item"
        v-for="(item, index) in tableHeader"
        :key="index"
      > -->
      <el-table-column
        :prop="index"
        :label="item.label"
        v-for="(item, index) in tableHeader"
        :sortable="item.sort"
        :key="index"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      // tableHeader: [
      //   {
      //     prop: "name",
      //     label: "姓名",
      //     sort: true,
      //   }
      // ],
      // tableHeader: {
      //   name: "姓名",
      //   birth: "生日",
      //   address: "地址",
      //   age: "年龄",
      //   phone: "电话",
      // },
      tableHeader: {
        name: {
          label: "姓名",
          sort: true,
        },
        birth: {
          label: "生日",
          sort: false,
        },
        address: {
          label: "地址",
          sort: false,
        },
        age: {
          label: "年龄",
          sort: true,
        },
        phone: {
          label: "电话",
          sort: false,
        }
      },
      tableData: [{
        name: '张三',
        address: '上海市普陀区金沙江路 1518 弄',
        birth: '2016-05-02',
        age: 18,
        phone: "12345678910",
      }, {
        name: '李四',
        birth: '2016-05-04',
        address: '上海市普陀区金沙江路 1517 弄',
        age: 19,
        phone: "12345678911",
      }, {
        name: '王五',
        birth: '2016-05-01',
        address: '上海市普陀区金沙江路 1519 弄',
        age: 20,
        phone: "12345678912",
      }, {
        name: '赵六',
        birth: '2016-05-03',
        address: '上海市普陀区金沙江路 1516 弄',
        age: 21,
        phone: "12345678913",
      }]
    }
  },
}
</script>
