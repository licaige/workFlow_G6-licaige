<template>
  <div>
    <h2>Vue3 + Element plus 动态修改表格</h2>
    <h3>「卡拉云 - 极速搭建企业内部工具，十倍提升开发效率」</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in tableHeader"
        :key="item.prop"
      >
        <template #default="scope">
          <div
            v-show="item.editable || scope.row.editable"
            class="editable-row"
          >
            <template v-if="item.type === 'input'">
              <el-input
                size="small"
                v-model="scope.row[item.prop]"
                :placeholder="`请输入${item.label}`"
                @change="handleEdit(scope.$index, scope.row)"
              />
            </template>
            <template v-if="item.type === 'date'">
              <el-date-picker
                v-model="scope.row[item.prop]"
                type="date"
                value-format="YYYY-MM-DD"
                :placeholder="`请输入${item.label}`"
                @change="handleEdit(scope.$index, scope.row)"
              />
            </template>
          </div>
          <div
            v-show="!item.editable && !scope.row.editable"
            class="editable-row"
          >
            <span class="editable-row-span">{{ scope.row[item.prop] }}</span>
            <el-popover
              placement="right"
              :width="120"
              trigger="hover"
              content="this is content, this is content, this is content"
            >
              <template #reference>
                <el-icon class="icon" :size="18">
                  <Edit />
                </el-icon>
              </template>
              <div class="menu-list">
                <div
                  class="menu-item"
                  @click="prepend(scope.$index)"
                >
                  上方插入一行
                </div>
                <div
                  class="menu-item divider"
                  @click="append(scope.$index)"
                >
                  下方插入一行
                </div>
                <div class="menu-item" @click="deleteCurrentColumn(index)">
                  删除当前列
                </div>
                <div class="menu-item" @click="insertBefore(index)">
                  前方插入一列
                </div>
                <div class="menu-item" @click="insertAfter(index)">
                  后方插入一列
                </div>
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            v-show="!scope.row.editable"
            size="small"
            @click="scope.row.editable = true"
            >编辑</el-button
          >
          <el-button
            v-show="scope.row.editable"
            size="small"
            type="success"
            @click="scope.row.editable = false"
            >确定</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const item = {
  name: '',
  birth: '',
  province: "",
  city: "",
  address: '',
  phone: "",
}
const header = {
  prop: "key",
  label: "自定义",
  editable: false,
  type: "input",
}
export default {
  name: "DynamicModifyTable",
  data() {
    return {
      tableHeader: [
        {
          prop: "name",
          label: "姓名",
          editable: false,
          type: "input",
        },
        {
          prop: "birth",
          label: "生日",
          editable: false,
          type: "date"
        },
        {
          prop: "phone",
          label: "电话",
          editable: false,
          type: "input"
        },
        {
          prop: "province",
          label: "省份",
          editable: false,
          type: "input"
        },
        {
          prop: "city",
          label: "市区",
          editable: false,
          type: "input"
        },
        {
          prop: "address",
          label: "详细地址",
          editable: false,
          type: "input"
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
  methods: {
    handleEdit(row) {
      row.editable = true;
    },
    handleDelete(index) {
      this.tableData.splice(index, 1);
    },
    prepend(index) {
      item.editable = true
      this.tableData.splice(index, 0, item);
    },
    append(index) {
      item.editable = true
      this.tableData.splice(index + 1, 0, item);
    },
    deleteCurrentColumn(index) {
      this.tableHeader.splice(index, 1);
    },
    insertBefore(index) {
      header.editable = true;
      this.tableHeader.splice(index, 0, header);
    },
    insertAfter(index) {
      header.editable = true;
      this.tableHeader.splice(index + 1, 0, header);
    },
  }
}
</script>

<style scoped>
.edit-icon {
  cursor: pointer;
}
.editable-row {
  display: flex;
  align-items: center;
}
.editable-row-span {
  display: inline-block;
  margin-right: 6px;
}
.menu-item {
  height: 32px;
  line-height: 32px;
  padding-left: 12px;
}
.menu-item:hover {
  color: #fff;
  background: #409eff;
  cursor: pointer;
}
</style>