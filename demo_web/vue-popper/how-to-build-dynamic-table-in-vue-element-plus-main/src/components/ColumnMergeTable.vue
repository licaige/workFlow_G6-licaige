<template>
  <div>
    <h2>Vue3 + Element plus 动态表格列合并</h2>
    <h3>「卡拉云 - 极速搭建企业内部工具，十倍提升开发效率」</h3>
    <el-table
      :data="tableData"
      style="width: 100%"
      :span-method="objectSpanMethod"
      border
    >
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in tableHeader"
        :key="index"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ColumnMergeTable",
  data() {
    return {
      tableHeader: [
        {
          prop: "birth",
          label: "生日",
        },
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "phone",
          label: "电话",
        },
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
        birth: '2016-05-02',
        province: "上海市",
        city: "普陀区",
        address: '金沙江路 1517 弄',
        age: 19,
        phone: "12345678911",
      }, {
        name: '王五',
        birth: '2016-05-03',
        province: "上海市",
        city: "普陀区",
        address: '金沙江路 1519 弄',
        phone: "12345678912",
      }, {
        name: '赵六',
        birth: '2016-05-04',
        province: "上海市",
        city: "普陀区",
        address: '金沙江路 1520 弄',
        phone: "12345678913",
      }, {
        name: '孙七',
        birth: '2016-05-04',
        province: "上海市",
        city: "普陀区",
        address: '金沙江路 1521 弄',
        phone: "12345678913",
      }, {
        name: '周八',
        birth: '2016-05-04',
        province: "上海市",
        city: "普陀区",
        address: '金沙江路 1522 弄',
        phone: "12345678913",
      }, {
        name: '吴九',
        birth: '2016-05-06',
        province: "上海市",
        city: "普陀区",
        address: '金沙江路 1523 弄',
        phone: "12345678913",
      }]
    }
  },
  methods: {
    objectSpanMethod({ rowIndex, columnIndex }) {
      // 隐藏第二行或者第三行的列
      if (rowIndex === 1 || rowIndex === 2) {
        // 合并第二行
        if (columnIndex === 1) {
          // 从第二列开始
          return [1, 3]
          //或者返回如下形式也可以
          // return {
          //    rowspan: 1,
          //    colspan: 3
          //  }
          // 这里的 else if 即使用来处理被合并列的原始数据的情况，需要隐藏原始单元格
        } else if (columnIndex === 2 || columnIndex === 3) {
          return [0, 0]
        }
      }
    }
  }
}
</script>
