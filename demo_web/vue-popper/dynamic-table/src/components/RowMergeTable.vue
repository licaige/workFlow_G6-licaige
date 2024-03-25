<template>
  <div>
    <h2>Vue3 + Element plus 动态行合并表格</h2>
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
  name: "RowMergeTable",
  data() {
    this.spanArr = [];
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
  created() {
    this.getSpanArr(this.tableData);
  },
  methods: {
    getSpanArr(data) {
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0
        } else {
          if (data[i].birth === data[i - 1].birth) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  }
}
</script>
