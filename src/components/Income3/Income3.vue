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
                <li><router-link to="">收入预测</router-link></li>
                <li><router-link to="/Income3">税后反算</router-link></li>
            </ul>
        </div>

        <div class="main_content">
            <div class="main_page">
                <div class="main_comput">
                    <div class="box">
                        <div class="showboxs">
                            <div class="item">
                                <h3>税后工资反算</h3>
                                <div class="label">
                                    <p>税后工资</p>
                                    <div class="change">
                                        <input v-model.number="afterTaxIncome" 
                                               type="number"
                                               placeholder="请输入" />
                                    </div>
                                </div>
                                <div class="label">
                                    <p>社会保险费</p>
                                    <div class="change">
                                        <input v-model.number="insure" 
                                               type="number"
                                               placeholder="请输入" 
                                               value="0" />
                                    </div>
                                </div>
                                <div class="label">
                                    <p>起征点</p>
                                    <div class="change">
                                        <input :value="baseLine" 
                                               type="number"
                                               readonly />
                                    </div>
                                </div>
                            </div>

                            <div class="item">
                                <h3>个人所得税计算结果</h3>
                                <div class="label">
                                    <p>应纳税所得额</p>
                                    <span><em>{{ taxableIncome.toFixed(2) }}</em>元</span>
                                </div>
                                <div class="label">
                                    <p>适用税率</p>
                                    <span><em>{{ (taxRate * 100) }}</em>%</span>
                                </div>
                                <div class="label">
                                    <p>速算扣除数</p>
                                    <span><em>{{ quickDeduction.toFixed(2) }}</em>元</span>
                                </div>
                                <div class="label">
                                    <p>应缴税款</p>
                                    <div class="change">
                                        <input :value="tax.toFixed(2)" readonly />
                                    </div>
                                </div>
                                <div class="label">
                                    <p>实发工资</p>
                                    <div class="change">
                                        <input :value="realIncome.toFixed(2)" readonly />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="button">
                        <div class="btn">
                            <div @click="calculate">
                                <img src="../../assets/img/comp.png" alt="计算"/>
                                <span>计算</span>
                            </div>
                            <div @click="reset">
                                <img src="../../assets/img/icon.png" alt="重置"/>
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
                                <p>个人所得税预扣率表</p>
                            </div>
                        </div>
                        <div class="box">
                            <p class="pcenter">个人所得税预扣率表</p>
                            <table cellpadding="0" border="0" cellspacing="0">
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
            afterTaxIncome: 0, // 税后工资
            insure: 0, // 社会保险费
            baseLine: 5000, // 起征点
            taxableIncome: 0, // 应纳税所得额
            taxRate: 0.03, // 适用税率
            quickDeduction: 0, // 速算扣除数
            tax: 0, // 应缴税款
            realIncome: 0 // 实发工资
        }
    },

    methods: {
        calculate() {
            if (!this.afterTaxIncome) {
                alert("请输入税后工资")
                return
            }

            // 根据应纳税所得额（不含税）确定税率和速算扣除数
            if (this.afterTaxIncome <= 34920) {
                this.taxRate = 0.03
                this.quickDeduction = 0
            } else if (this.afterTaxIncome <= 129600) {
                this.taxRate = 0.1
                this.quickDeduction = 2520
            } else if (this.afterTaxIncome <= 240000) {
                this.taxRate = 0.2
                this.quickDeduction = 16920
            } else if (this.afterTaxIncome <= 315000) {
                this.taxRate = 0.25
                this.quickDeduction = 31920
            } else if (this.afterTaxIncome <= 462000) {
                this.taxRate = 0.3
                this.quickDeduction = 52920
            } else if (this.afterTaxIncome <= 624000) {
                this.taxRate = 0.35
                this.quickDeduction = 85920
            } else {
                this.taxRate = 0.45
                this.quickDeduction = 181920
            }

            // 计算实发工资
            this.realIncome = (this.afterTaxIncome - (this.baseLine + this.insure) * this.taxRate) / (1 - this.taxRate)
            
            // 计算应纳税所得额
            this.taxableIncome = this.realIncome - this.baseLine - this.insure
            
            // 计算应缴税款
            this.tax = this.taxableIncome * this.taxRate - this.quickDeduction
        },

        reset() {
            Object.assign(this.$data, this.$options.data())
        },

        changePage() {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
@import './style.css';
</style>