<template>
  <div id="app" class="Main">
    <header class="header">
      <div class="dajianshi">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span class="glow-text" style="position: absolute;top: 30px;left: 43%">个税计算器</span>
    </header>
    <button class="zhaomu" @click="predictIncome" style="position: absolute;left: 3%;top: 18%;font-size: 30px;">收 <br>入
      <br>预 <br>测 <br>工 <br>具</button>
    <button class="selectStyle" @click="changePage"
      style="position: absolute;right: 3%;top: 4%;font-size: 28px;">切换风格</button>
    <!-- 收入预测 -->
    <div v-show="isShow" class="predict">
      <el-card style="position: relative;top: 20%;font-family: cursive;left: 7%;
            background-color: rgb(139, 139, 255);font-size: 70px;">收 <br>入 <br>预 <br>测</el-card>
      <div style="position: relative;top: -40%;left: 53%;font-size: 32px;font-family: cursive;color: slategray;">
        |→1←|→2←|→3←|→4←|→5←|
      </div>
      <div style="position: relative;top: -40%;left: 20%;font-size: 30px;color: rgb(235, 161, 49);">请输入过去5年各年份的收入：
        <input v-model="incomes[0]" type="number"
          style="width: 80px;height: 30px;border-radius: 50%;text-align: center;font-size: 20px;">
        <input v-model="incomes[1]" type="number"
          style="width: 80px;height: 30px;border-radius: 50%;text-align: center;font-size: 20px;">
        <input v-model="incomes[2]" type="number"
          style="width: 80px;height: 30px;border-radius: 50%;text-align: center;font-size: 20px;">
        <input v-model="incomes[3]" type="number"
          style="width: 80px;height: 30px;border-radius: 50%;text-align: center;font-size: 20px;">
        <input v-model="incomes[4]" type="number"
          style="width: 80px;height: 30px;border-radius: 50%;text-align: center;font-size: 20px;">

      </div>
      <br><br><br><br>
      <div style="position: relative;top: -40%;left: 20%;font-size: 30px;color: rgb(56, 147, 68);">
        请输入预期加薪比例（如0.1表示10%）：→→→
        <input v-model="ratio" type="number" min="0" max="3"
          style="width: 100px;height: 40px;border-radius: 50%;text-align: center;font-size: 20px;">
        ←←←
      </div>
      <br><br><br>
      <!-- 确定按钮 -->
      <button class="sure" style="position: absolute;left: 20%;top: 60%;font-size: 30px;" @click="predict">确定</button>
      <!-- 重置按钮 -->
      <button class="sure" style="position: absolute;left: 70%;top: 60%;font-size: 30px;" @click="resetPre">重置</button>
      <div style="position: relative;top: -40%;font-size: 30px;color: rgb(59, 91, 170);text-align: center;">
        预测未来五年的收入为：<br><br>
        <el-card style="border: 2px solid #974112;padding: 10px;margin-left: 10px;">{{ preResult[0] }}</el-card>
        <el-card style="border: 2px solid #974112;padding: 10px;margin-left: 10px;">{{ preResult[1] }}</el-card>
        <el-card style="border: 2px solid #974112;padding: 10px;margin-left: 10px;">{{ preResult[2] }}</el-card>
        <el-card style="border: 2px solid #974112;padding: 10px;margin-left: 10px;">{{ preResult[3] }}</el-card>
        <el-card style="border: 2px solid #974112;padding: 10px;margin-left: 10px;">{{ preResult[4] }}</el-card>

      </div>
    </div>
    <button v-show="isShow" class="predictButton1" @click="isShow = false">×</button>

    <main class="main">
      <div class="left">
        <div class="text1">累计预扣预缴个税计算器</div>

        <div style="font-size: 21px;">
          <!-- 1 -->
          <div style="display: inline-block;">
            <h3 style="color: aquamarine;margin: 20px 0px 10px 0px;">纳税期数</h3>
          </div>
          <select @change="getSelectValue" id="select" class="selectStyle" style="text-align: center;">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <br>
          <!-- 2 -->
          <div style="display: inline-block;">
            <h3 style="color: rosybrown;margin: 20px 0px 10px 0px;">本月工资</h3>
          </div>
          <input id="monthMoney" v-model="monthMoney" class="inputStyle" type="number" placeholder="请输入"
            @input="getMonthMoney">
          <br>
          <!-- 3 -->
          <div style="display: inline-block;">
            <h3 style="color: rosybrown;margin: 20px 0px 10px 0px;">累计</h3>
          </div>
          <input id="totalMoney" class="inputStyle" type="number" placeholder="请输入" @input="getTotalMoney"
            v-model="this.totalMoney">
          <br>
          <!-- 4 -->
          <div style="display: inline-block;">
            <h3 style="color: rgb(123, 184, 244);margin: 20px 0px 10px 0px;">社会保险费</h3>
          </div>
          <input id="societyMoney" v-model="societyMoney" class="inputStyle" type="number" @input="getSocietyMoney">
          <br>
          <!-- 5 -->
          <div style="display: inline-block;">
            <h3 style="color: rgb(123, 184, 244);margin: 20px 0px 10px 0px;">累计</h3>
          </div>
          <input class="inputStyle" type="number" v-model="this.societyTotalMoney">
          <br>
          <!-- 6 -->
          <div style="display: inline-block;">
            <h3 style="color: rgb(245, 194, 99);margin: 20px 0px 10px 0px;">专项附加扣除</h3>
          </div>
          <input id="specialMoney" v-model="specialMoney" class="inputStyle" type="number" @input="getSpecialMoney">
          <br>
          <!-- 7 -->
          <div style="display: inline-block;">
            <h3 style="color: rgb(245, 194, 99);margin: 20px 0px 10px 0px;">累计</h3>
          </div>
          <input class="inputStyle" type="number" v-model="this.specialTotalMoney">
        </div>
      </div>
      <br>
      <div class="right">
        <div class="text2">个人所得税计算结果</div>
        <div style="font-size: 21px;">
          <div style="display: inline-block;">
            <h3 style="color: aquamarine;margin: 20px 0px 10px 0px;">应纳税所得额</h3>
          </div>
          <span class="card">
            <span id="sum" :v-bind="sum"></span>
            <span>元</span>
          </span>
          <br>
          <!-- 2 -->
          <div style="display: inline-block;">
            <h3 style="color: rosybrown;margin: 20px 0px 10px 0px;">适用税率</h3>
          </div>
          <span class="card">
            <span id="taxRate" :v-bind="taxRate"></span>
            <span>%</span>
          </span>
          <br>
          <!-- 3 -->
          <div style="display: inline-block;">
            <h3 style="color: rosybrown;margin: 20px 0px 10px 0px;">速算扣除数</h3>
          </div>
          <span class="card">
            <span id="delCount" :v-bind="delCount"></span>
            <span>元</span>
          </span>
          <br>
          <!-- 4 -->
          <div style="display: inline-block;">
            <h3 style="color: rgb(123, 184, 244);margin: 20px 0px 10px 0px;">已缴税款</h3>
          </div>
          <input class="inputStyle" disabled type="number" v-model="paidTax">
          <!-- 5 -->
          <div style="display: inline-block;">
            <h3 style="color: rgb(123, 184, 244);margin: 20px 0px 10px 0px;">累计应缴税款</h3>
          </div>
          <input class="inputStyle" disabled type="number" v-model="sumTax">
          <!-- 6 -->
          <div style="display: inline-block;">
            <h3 style="color: rgb(245, 194, 99);margin: 20px 0px 10px 0px;">应补(退)税款</h3>
          </div>
          <input id="refundTax" class="inputStyle" disabled type="number" v-model="refundTax">
          <!-- 7 -->
          <div style="display: inline-block;">
            <h3 style="color: rgb(245, 194, 99);margin: 20px 0px 10px 0px;">本月税后收入</h3>
          </div>
          <input class="inputStyle" disabled type="number" v-model="income">
        </div>
      </div>
    </main>
    <footer>
      <div style="color: aliceblue">
        <button class="searchStyle" style="position: absolute;left: 36%" @click="getSum">提交</button>
        <button class="resetStyle" style="position: absolute;left: 53%" @click="reset">重置</button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 左半部分
      selectValue: 1,
      monthMoney: '',
      totalMoney: '',
      societyMoney: '',
      societyTotalMoney: 0,
      specialMoney: '',
      specialTotalMoney: 0,
      // 右半部分
      sum: 0,//应纳税所得额
      taxRate: 0,//适用税率
      delCount: 0,//速算扣除数
      paidTax: 0,//已缴税款
      sumTax: 0,//累计应缴税款
      refundTax: 0,//应补(退)税款
      income: 0,//本月税后收入

      //收入预测估计
      isShow: false,//模态窗口显示
      years: [1, 2, 3, 4, 5],
      incomes: ['', '', '', '', ''],

      //预测比例
      ratio: 0,
      //预测结果
      preResult: [0, 0, 0, 0, 0]


    }
  },
  methods: {
    //左半部分
    // 获取当前月份
    getSelectValue() {
      var selectValue = document.getElementById('select')
      this.selectValue = selectValue.value
      this.totalMoney = this.monthMoney * this.selectValue
      this.societyTotalMoney = this.societyMoney * this.selectValue
      this.specialTotalMoney = this.specialMoney * this.selectValue
    },
    // 获取本月工资
    getMonthMoney() {
      var monthMoney = document.getElementById("monthMoney")
      this.monthMoney = monthMoney.value
      this.totalMoney = this.monthMoney * this.selectValue
    },
    //获取总计工资
    getTotalMoney() {
      var totalMoney = document.getElementById("totalMoney")
      this.totalMoney = totalMoney.value
    },
    // 获取当前月份社会保险费
    getSocietyMoney() {
      var societyMoney = document.getElementById("societyMoney")
      this.societyMoney = societyMoney.value
      this.societyTotalMoney = this.societyMoney * this.selectValue
    },
    //获取当前月份专项附加扣除
    getSpecialMoney() {
      var specialMoney = document.getElementById("specialMoney")
      this.specialMoney = specialMoney.value
      this.specialTotalMoney = this.specialMoney * this.selectValue
    },
    // 右半部分
    //计算
    getSum() {
      if (this.monthMoney == '') { alert("请输入本月工资"); return }
      var sum = document.getElementById("sum")
      //计算
      this.sum = this.totalMoney - 5000 * this.selectValue - this.societyTotalMoney - this.specialTotalMoney
      sum.innerText = this.sum
      //获取适用税率
      if (this.sum <= 36000) { this.taxRate = 0.03; this.delCount = 0 }
      else if (this.sum <= 144000) { this.taxRate = 0.1; this.delCount = 2520 }
      else if (this.sum <= 300000) { this.taxRate = 0.2; this.delCount = 16920 }
      else if (this.sum <= 420000) { this.taxRate = 0.25; this.delCount = 31920 }
      else if (this.sum <= 660000) { this.taxRate = 0.3; this.delCount = 52920 }
      else if (this.sum <= 960000) { this.taxRate = 0.35; this.delCount = 85920 }
      else if (this.sum > 960000) { this.taxRate = 0.45; this.delCount = 181920 }
      var taxRate = document.getElementById("taxRate")
      var delCount = document.getElementById("delCount")
      taxRate.innerText = this.taxRate * 100
      delCount.innerText = this.delCount
      //计算累计应缴税款（公式1：应纳税所得额*使用税率-速算扣除数） （公式2(错误的)：已缴税款 + 应补(退)税款）
      this.sumTax = Math.round((this.sum * this.taxRate - this.delCount) * 100) / 100
      //计算应补(退)税款(公式：应补(退)税款=（本月工资-社会保险费-专项附加扣除-5000）*税率)
      this.refundTax = Math.round(((this.monthMoney - this.societyMoney - this.specialMoney - 5000) * this.taxRate) * 100) / 100
      //计算已缴税款（公式1：(累计应缴税款 - 应补(退)税款) ） （公式2(错误的)：上次已缴税款 + 上次应补(退)税款）
      this.paidTax = Math.round((this.sumTax - this.refundTax) * 100) / 100
      //计算本月税后收入（公式：本月工资 - 社会保险费 - 专项附加扣除 - 应补(退)税款）
      this.income = Math.round((this.monthMoney - this.societyMoney - this.specialMoney - this.refundTax) * 100) / 100
    },
    //重置
    reset() {
      this.monthMoney = ''
      this.totalMoney = 0
      this.societyMoney = ''
      this.societyTotalMoney = 0
      this.specialMoney = ''
      this.specialTotalMoney = 0
      this.sum = 0
      document.getElementById("sum").innerText = 0
      this.taxRate = 0
      document.getElementById("taxRate").innerText = 0
      this.delCount = 0
      document.getElementById("delCount").innerText = 0

      this.paidTax = '',//已缴税款
        this.sumTax = '',//累计应缴税款
        this.refundTax = '',//应补(退)税款
        this.income = ''//本月税后收入
    },
    //收入预测工具
    predictIncome() {
      this.isShow = true
    },
    linearRegression(x, y) {
      let n = x.length;
      let sum_x = Number(x.reduce((a, b) => a + b, 0));
      let sum_y = Number(y.reduce((a, b) => a + b, 0));
      let sum_xy = 0;
      let sum_x2 = 0;

      for (let i = 0; i < n; ++i) {
        sum_xy += x[i] * y[i];
        sum_x2 += x[i] * x[i];
      }

      let a = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x * sum_x);
      let b = (sum_y - a * sum_x) / n;
      return [a, b];
    },
    //根据前五年收入工资预测后五年
    predict() {
      // 输入历史收入数据
      this.incomes = [Number(this.incomes[0]), Number(this.incomes[1]), Number(this.incomes[2]), Number(this.incomes[3]), Number(this.incomes[4])]
      let [a, b] = this.linearRegression(this.years, this.incomes);
      function predictIncome1(a, b, ratio, factor) {
        return a * ratio + b + factor;
      }
      // 预测未来5年收入
      for (let i = 6; i <= 10; ++i) {
        let predicted = predictIncome1(a, b, i, this.ratio * 70000);
        this.preResult[i - 6] = predicted
      }
    },
    //重置预测
    resetPre() {
      this.incomes = ['', '', '', '', '']
      this.preResult = [0, 0, 0, 0, 0]
      this.ratio = 0
    },
    //切换页面
    changePage() {
      this.$router.push('/Income2')
    }
  },
  // 监听输入变化
  watch: {
    selectValue() {
      this.getSelectValue()
    },
    monthMoney() {
      this.getMonthMoney()
    }
  }
}
</script>

<style scoped>
/* 导入原有样式 */
@import './style.css';
</style>
