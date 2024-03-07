<template>
  <div class="dashboard-container">
    <h2>子应用模块页面</h2>
    <el-table
      ref="elTable"
      border
      :excess-rows="20"
      useVirtual
      :row-height="40"
      :height="600"
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        :index="1"
        key="1"
        align="left"
        fixed="left"
        type="selection"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="baseSalesNO"
        :index="2"
        key="2"
        label="标题一"
        width="185"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.baseSalesNO }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :index="3"
        key="3"
        prop="weightDate"
        label="标题二"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.weightDate }}
        </template>
      </el-table-column>
      <el-table-column
        :index="39"
        key="39"
        prop="weightDate"
        label="标题三"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.statusName }}
        </template>
      </el-table-column>
      <el-table-column
        :index="37"
        key="37"
        prop="pushDownStatusName"
        label="标题四"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.pushDownStatusName }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="是否代理" width="80">
        <template slot-scope="scope">
          {{ scope.row.agentStatus }}
        </template>
      </el-table-column>

      <el-table-column
        :index="17"
        key="17"
        v-if="is_column_show('is_show')"
        prop="commodityName"
        label="标题五"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.commodityName }}
        </template>
      </el-table-column>
      <el-table-column
        :index="43"
        key="43"
        prop="factoryCommodityName"
        label="标题六"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.factoryCommodityName }}
        </template>
      </el-table-column>
      <el-table-column
        :index="18"
        key="18"
        v-if="is_column_show('is_show')"
        prop="specifica"
        label="标题七"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.specifica }}
        </template>
      </el-table-column>
      <el-table-column
        :index="20"
        key="20"
        v-if="is_column_show('is_show')"
        prop="unitPriceWithTax"
        label="标题八"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.unitPriceWithTax }}
        </template>
      </el-table-column>
      <el-table-column
        :index="22"
        key="22"
        v-if="is_column_show('is_show')"
        prop="factoryAmount"
        label="标题九"
        width="130"
      >
        <template slot-scope="scope">
          {{ scope.row.factoryAmount }}
        </template>
      </el-table-column>
      <el-table-column
        :index="23"
        key="23"
        v-if="is_column_show('unit')"
        prop="unit"
        label="标题十"
        width="50"
      >
        <template slot-scope="scope">
          {{ scope.row.unit }}
        </template>
      </el-table-column>
      <el-table-column
        :index="24"
        key="24"
        v-if="is_column_show('is_show')"
        prop="settlementWeight"
        label="标题十一"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.settlementWeight }}
        </template>
      </el-table-column>
      <el-table-column
        :index="25"
        key="25"
        v-if="is_column_show('is_show')"
        prop="grossWeight"
        label="标题十二"
        width="110"
      >
        <template slot-scope="scope">
          {{ scope.row.grossWeight }}
        </template>
      </el-table-column>
      <el-table-column
        :index="26"
        key="26"
        v-if="is_column_show('is_show')"
        prop="tareWeight"
        label="标题十三"
        width="110"
      >
        <template slot-scope="scope">
          {{ scope.row.tareWeight }}
        </template>
      </el-table-column>
      <el-table-column
        :index="27"
        key="27"
        v-if="is_column_show('is_show')"
        prop="factoryWeight"
        label="标题十四"
        width="110"
      >
        <template slot-scope="scope">
          {{ scope.row.factoryWeight }}
        </template>
      </el-table-column>
      <el-table-column
        :index="28"
        key="28"
        v-if="is_column_show('is_show')"
        prop="deductWater"
        label="标题十五"
        width="110"
      >
        <template slot-scope="scope">
          {{ scope.row.deductWater }}
        </template>
      </el-table-column>
      <el-table-column
        :index="29"
        key="29"
        v-if="is_column_show('is_show')"
        prop="deductForeign"
        label="标题十六"
        width="110"
      >
        <template slot-scope="scope">
          {{ scope.row.deductForeign }}
        </template>
      </el-table-column>
      <el-table-column
        :index="30"
        key="30"
        v-if="is_column_show('is_show')"
        prop="deductForeignSubstance"
        label="标题十七"
        width="110"
      >
        <template slot-scope="scope">
          {{ scope.row.deductForeignSubstance }}
        </template>
      </el-table-column>
      <el-table-column
        :index="31"
        key="31"
        v-if="is_column_show('deductWeight')"
        prop="deductWeight"
        label="标题十八"
        width="110"
      >
        <template slot-scope="scope">
          {{ scope.row.deductWeight }}
        </template>
      </el-table-column>
      <el-table-column
        :index="32"
        key="32"
        v-if="is_column_show('is_show')"
        prop="deductPoint"
        label="标题十九"
        width="110"
      >
        <template slot-scope="scope">
          {{ scope.row.deductPoint }}
        </template>
      </el-table-column>
      <el-table-column
        :index="33"
        key="33"
        v-if="is_column_show('is_show')"
        prop="claimPrice"
        label="标题二十"
        width="110"
      >
        <template slot-scope="scope">
          {{ scope.row.claimPrice }}
        </template>
      </el-table-column>
      <el-table-column
        :index="34"
        key="34"
        v-if="is_column_show('is_show')"
        prop="claimAmount"
        label="标题二十一"
        width="130"
      >
        <template slot-scope="scope">
          {{ scope.row.claimAmount }}
        </template>
      </el-table-column>
      <el-table-column
        :index="35"
        key="35"
        v-if="is_column_show('remark')"
        prop="remark"
        label="标题二十二"
        width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="shipmentStatusName"
        label="标题二十三"
        min-width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.shipmentStatusName }}
        </template>
      </el-table-column>
      <el-table-column prop="showId" label="订单编号" min-width="150">
        <template slot-scope="scope">
          {{ scope.row.showId }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="标题二十四" min-width="150">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: "Dashboard",
  data() {
    return {
      list: [],
      listLoading: true,
      columnShowItems: [],
      columnOptions: [
        {
          key: "is_show",
          checked: true,
        },
      ],
    };
  },
  created() {
    let dynamicItems = [];
    this.columnOptions.forEach(function (currentValue, index, arr) {
      if (currentValue.checked) {
        dynamicItems.push(currentValue.key);
      }
    });
    this.columnShowItems = dynamicItems;
    console.log("this.columnShowItems>>", this.columnShowItems);
    this.fetchData();
  },
  methods: {
    is_column_show(key) {
      return this.columnShowItems.indexOf(key) != -1;
    },
    fetchData() {
      this.listLoading = true;
      const list = []
      setTimeout(() => {
        const item = {
          'baseSalesNO': '@id',
          'statusName': '正常',
          'pushDownStatusName': '已下推',
          'factoryId': 27,
          'weightDate': 1629388800000,
          'carNum': '苏L00823',
          'commodityName': '废纸',
          'factoryCommodityName': '废纸',
          'specifica': '2',
          'unitPriceWithTax': 10050.50,
          'factoryAmount': 20001.00,
          'settlementWeight': 2.0000,
          'unit': '吨',
          'grossWeight': 2.2000,
          'tareWeight': 0.1000,
          'factoryWeight': 2.1000,
          'deductWater': 0.1000,
          'deductForeign': 0.1000,
          'deductForeignSubstance': 0.1000,
          'deductWeight': 0.1000,
          'deductPoint': 0.1000,
          'claimPrice': 10.00,
          'claimAmount': 100.00,
          'remark': '1',
          'multiVehicle': '否',
          'totalAmountWithTax': 0,
          'totalAmountWithNotTax': 0,
          'commodityNO': 'QHSP202007150002',
          'status': 2,
          'syncStatus': 1,
          'pushDownStatus': 1,
          'createTime': 1629428336246,
          'updateTime': 1629428336246,
          'createUserId': 100069,
          'updateUserId': 100069,
          'shipmentStatus': 1,
          'shipmentStatusName': '未关联'
        }

        console.time('render')
        for (let i = 0; i < 500; i++) {
          list.push(Object.assign({}, item, {
            baseSalesNO: 1000000000 + i
          }))
        }
        this.list = list
        this.listLoading = false;
        this.$nextTick(function () {
          console.timeEnd('render')
          // console.log(window.a1)
          // console.log(window.a2)
        })
      }, 100);
    },
  },
};
</script>

<style>
.dashboard-container {
  margin: 30px;
}

.dashboard-text {
  font-size: 30px;
  line-height: 46px;
}
</style>
