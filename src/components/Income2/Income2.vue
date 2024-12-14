<template>
    <div style="background: #acb1e6">
        <header class="header">
            <div class="welcome">
                <p>个税计算器</p>
            </div>
            <div class="change" @click="changePage">
                <a>切换风格</a>
            </div>
        </header>
        <div class="navbar">
            <ul data-current="0">
                <li><router-link to="/Income2">首页</router-link></li>
                <li><a @click="predictIncome">收入预测</a></li>
                <li><router-link to="/Income3">税后反算</router-link></li>
            </ul>
        </div>
        <div class="main_content">
            <div class="main_page">
                <div class="main_comput">
                    <div class="box">
                        <div class="showboxs">
                            <div class="item">
                                <h3>累计预扣预缴个税计算器</h3>
                                <div class="label">
                                    <p>纳税期数</p>
                                    <div class="change">
                                        <select v-model="taxPeriod">
                                            <option v-for="n in 12" :key="n" :value="n">{{ n }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="label">
                                    <p>本月工资</p>
                                    <div class="change">
                                        <input v-model.number="income" type="number" id="txtIncome" placeholder="请输入" />
                                    </div>
                                </div>
                                <div class="label">
                                    <p>累计</p>
                                    <div class="change">
                                        <input :value="incomeAll" type="number" readonly />
                                    </div>
                                </div>
                                <div class="label">
                                    <p>社会保险费</p>
                                    <div class="change">
                                        <input v-model.number="insure" type="number" placeholder="请输入" />
                                    </div>
                                </div>
                                <div class="label">
                                    <p>累计</p>
                                    <div class="change">
                                        <input :value="insureAll" type="number" readonly />
                                    </div>
                                </div>
                                <div class="label">
                                    <p>专项附加扣除</p>
                                    <div class="change">
                                        <input v-model.number="zxfj" type="number" placeholder="请输入" />
                                    </div>
                                </div>
                                <div class="label">
                                    <p>累计</p>
                                    <div class="change">
                                        <input :value="zxfjAll" type="number" readonly />
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <h3>个人所得税计算结果</h3>
                                <div class="label">
                                    <p>应纳税所得额</p>
                                    <span><em style="color: red">{{ taxableIncome.toFixed(2) }}</em>元</span>
                                </div>
                                <div class="label">
                                    <p>适用税率</p>
                                    <span>{{ taxRate }}</span>
                                </div>
                                <div class="label">
                                    <p>速算扣除数</p>
                                    <span><em style="color: red">{{ quickDeduction }}</em>元</span>
                                </div>
                                <div class="label">
                                    <p>已缴税款</p>
                                    <div class="change">
                                        <input :value="taxAlready.toFixed(2)" type="number" readonly />
                                    </div>
                                </div>
                                <div class="label">
                                    <p>累计应缴税款</p>
                                    <div class="change">
                                        <input :value="taxAll.toFixed(2)" type="number" readonly />
                                    </div>
                                </div>
                                <div class="label">
                                    <p>实扣税额</p>
                                    <div class="change">
                                        <input :value="currentTax.toFixed(2)" type="number" readonly />
                                    </div>
                                </div>
                                <div class="label">
                                    <p>本月税后收入</p>
                                    <div class="change">
                                        <input :value="realIncome.toFixed(2)" type="number" readonly />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="button">
                        <div class="btn">
                            <div @click="getSum">
                                <img src="../../assets/img/comp.png" alt="计算" />
                                <span>计算</span>
                            </div>
                            <div @click="reset">
                                <img src="../../assets/img/icon.png" alt="重置" />
                                <span>重置</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right_box">
                    <div class="label">
                        <div class="tit">
                            <div class="child">
                                <div></div>
                                <p>累计预扣预缴个税计算公式</p>
                            </div>
                        </div>
                        <div class="box">
                            <p>
                                本期应预扣预缴税额=（累计预扣预缴应纳税所得额×预扣率-速算扣除数）-累计减免税额-累计已预扣预缴税额
                            </p>
                            <p>
                                累计预扣预缴应纳税所得额=累计收入-累计免税收入-累计减除费用-累计专项扣除-累计专项附加扣除-累计依法确定的其他扣除
                                其中：累计减除费用，按照5000元/月乘以纳税人当年截至本月在本单位的任职受雇月份数计算。
                            </p>
                        </div>
                    </div>
                    <div class="label">
                        <div class="tit">
                            <div class="child">
                                <div></div>
                                <p>个人所得税预扣率表</p>
                            </div>
                        </div>
                        <div class="box">
                            <table>
                                <tr>
                                    <th>级数</th>
                                    <th>累计预扣预缴应纳税所得额</th>
                                    <th>预扣率（%）</th>
                                    <th>速算扣除数</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>不超过36000元</td>
                                    <td>3</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>超过36000元至144000元的部分</td>
                                    <td>10</td>
                                    <td>2520</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>超过144000元至300000元的部分</td>
                                    <td>20</td>
                                    <td>16920</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>超过300000元至420000元的部分</td>
                                    <td>25</td>
                                    <td>31920</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>超过420000元至660000元的部分</td>
                                    <td>30</td>
                                    <td>52920</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>超过660000元至960000元的部分</td>
                                    <td>35</td>
                                    <td>85920</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>超过960000元的部分</td>
                                    <td>45</td>
                                    <td>181920</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 基础数据
            taxPeriod: 1, // 纳税期数
            income: 0, // 本月工资
            incomeAll: 0, // 累计收入
            insure: 0, // 本月社会保险费 
            insureAll: 0, // 累计社会保险费
            zxfj: 0, // 本月专项附加扣除
            zxfjAll: 0, // 累计专项附加扣除
            taxAlready: 0, // 已缴税款

            // 计算结果
            taxableIncome: 0, // 应纳税所得额
            taxRate: '3%', // 适用税率
            quickDeduction: 0, // 速算扣除数
            taxAll: 0, // 累计应缴税款
            currentTax: 0, // 实扣税额
            realIncome: 0, // 本月税后收入

            // 收入预测
            isShow: false, // 预测窗口显示
            years: [1, 2, 3, 4, 5],
            incomes: ['', '', '', '', ''],
            ratio: 0, // 预测比例
            preResult: [0, 0, 0, 0, 0] // 预测结果
        }
    },

    methods: {
        // 更新计算值
        updateValues() {
            this.incomeAll = this.income * this.taxPeriod
            this.insureAll = this.insure * this.taxPeriod
            this.zxfjAll = this.zxfj * this.taxPeriod
        },

        // 计算应纳税所得额
        calculateTaxableIncome() {
            const deduction = 5000 * this.taxPeriod // 累计减除费用
            const taxableIncome = this.incomeAll - deduction - this.insureAll - this.zxfjAll
            return taxableIncome > 0 ? taxableIncome : 0
        },

        // 计算税率和速算扣除数
        calculateRateAndDeduction(taxableIncome) {
            let rate, deduct
            if (taxableIncome <= 36000) {
                rate = 0.03; deduct = 0
            } else if (taxableIncome <= 144000) {
                rate = 0.1; deduct = 2520
            } else if (taxableIncome <= 300000) {
                rate = 0.2; deduct = 16920
            } else if (taxableIncome <= 420000) {
                rate = 0.25; deduct = 31920
            } else if (taxableIncome <= 660000) {
                rate = 0.3; deduct = 52920
            } else if (taxableIncome <= 960000) {
                rate = 0.35; deduct = 85920
            } else {
                rate = 0.45; deduct = 181920
            }
            return { rate, deduct }
        },

        // 主计算方法
        getSum() {

            // 更新累计值
            this.updateValues()

            // 计算应纳税所得额
            this.taxableIncome = this.calculateTaxableIncome()

            // 获取税率和速算扣除数
            const { rate, deduct } = this.calculateRateAndDeduction(this.taxableIncome)

            // 更新显示的税率和速算扣除数
            this.taxRate = (rate * 100) + '%'
            this.quickDeduction = deduct

            // 计算税款
            this.taxAll = Math.max(0, this.taxableIncome * rate - deduct)
            this.currentTax = this.taxAll - this.taxAlready
            this.realIncome = this.income - this.currentTax
        },

        // 重置方法
        reset() {
            Object.assign(this.$data, this.$options.data())
        },

        // 收入预测相关方法
        predictIncome() {
            this.isShow = true
        },

        linearRegression(x, y) {
            const n = x.length
            const sum_x = x.reduce((a, b) => a + b, 0)
            const sum_y = y.reduce((a, b) => a + b, 0)
            let sum_xy = 0, sum_x2 = 0

            for (let i = 0; i < n; i++) {
                sum_xy += x[i] * y[i]
                sum_x2 += x[i] * x[i]
            }

            const a = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x * sum_x)
            const b = (sum_y - a * sum_x) / n
            return [a, b]
        },

        predict() {
            // 转换输入为数字
            const numericIncomes = this.incomes.map(Number)
            const [a, b] = this.linearRegression(this.years, numericIncomes)

            // 预测未来5年
            for (let i = 6; i <= 10; i++) {
                const predicted = a * i + b + this.ratio * 70000
                this.preResult[i - 6] = predicted
            }
        },

        resetPre() {
            this.incomes = ['', '', '', '', '']
            this.preResult = [0, 0, 0, 0, 0]
            this.ratio = 0
        },

        // 页面切换
        changePage() {
            window.location.href = "/"
        }
    },

    // 监听输入值变化
    watch: {
        income() {
            this.getSum()
        },
        insure() {
            this.getSum()
        },
        zxfj() {
            this.getSum()
        },
        taxPeriod() {
            this.getSum()
        }
    }
}
</script>

<style scoped>
@import './style.css';
</style>
