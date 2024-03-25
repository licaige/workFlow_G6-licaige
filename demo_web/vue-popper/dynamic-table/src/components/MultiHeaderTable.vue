<template>
  <div>
    <h2>Vue3 + Element plus 动态多级表格</h2>
    <h3>「卡拉云 - 极速搭建企业内部工具，十倍提升开发效率」</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in tableHeader"
        :key="index"
      >
        <template v-if="item.children">
          <el-table-column
            :prop="child.prop"
            :label="child.label"
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
          ></el-table-column>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "MultiHeaderTable",
  data() {
    return {
      tableHeader: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "birth",
          label: "生日",
        },
        {
          prop: "phone",
          label: "电话",
        },
        {
          label: "地址",
          children: [
            {
              prop: "province",
              label: "省份",
            },
            {
              prop: "city",
              label: "市区",
            },
            {
              prop: "address",
              label: "详细地址",
            }
          ]
        }
      ],
      tableData: [{
        name: '张三',
        province: "上海市",
        city: "普陀区",
        address: "金沙江路 1518 弄",
        birth: '2016-05-02',
        phone: "12345678910",
      }, {
        name: '李四',
        birth: '2016-05-04',
        province: "上海市",
        city: "普陀区",
        address: '金沙江路 1517 弄',
        age: 19,
        phone: "12345678911",
      }, {
        name: '王五',
        birth: '2016-05-01',
        province: "上海市",
        city: "普陀区",
        address: '金沙江路 1519 弄',
        phone: "12345678912",
      }, {
        name: '赵六',
        birth: '2016-05-03',
        province: "上海市",
        city: "普陀区",
        address: '金沙江路 1516 弄',
        phone: "12345678913",
      }]
    }
  },
}
</script>
