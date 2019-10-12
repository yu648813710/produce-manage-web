<template>
  <div class="marketContent">
    <a-row>
      <a-col :span="10">
        <div class="titleLeft"></div>
      </a-col>
      <a-col :span="4">
        <div class="marketTitle">销售市场分析</div>
      </a-col>
      <a-col :span="10">
        <div class="titleRight"></div>
      </a-col>
    </a-row>

    <div class="topContent">
      <div class="echartsBox">
        <div class="echartsLegend">
          <div class="legendBox" v-for="(item,index) in lineLegend" @click="changeLine(index)">
            <span class="legend" :class="lineIndex === index ? 'isSelect' : ''"></span>
            <span>{{item.label}}</span>
          </div>
        </div>
        <span class="echartsLabel">品种全国均价趋势</span>
        <div class="echartsContent">
          <div id="myChart" :style="{width: '100%', height: '250px'}"></div>
        </div>
      </div>
      <div class="echartsBox echartLineFormat">
        <div class="echartsXLine">

        </div>
        <div class="echartsLegend">
          <div class="legendBox" v-for="(item,index) in lineLegend" @click="changePrice(index)">
            <span class="legend" :class="priceIndex === index ? 'isSelect' : ''"></span>
            <span>{{item.label}}</span>
          </div>
        </div>
        <span class="echartsLabel">各区域均价情况</span>
        <div id="piceChart" :style="{width: '100%', height: '230px'}"></div>
      </div>
    </div>
    <div class="topContent">
      <div class="echartsBox echartsBox2">
        <span class="echartsLabel">各区域木耳价格</span>
        <div class="echartsContent">
          <div class="tableContent">
            <div v-for="(item, index) in columns">{{item.title}}</div>
          </div>
          <vue-seamless-scroll
            :data="list"
            :class-option="classOption"
            style="overflow: hidden;"
          >
            <div class="tableBox">
              <div class="tableContent" v-for="(item, index) in list">
                <div>{{item.productType}}</div>
                <div>{{item.cityName}}</div>
                <div>{{item.productPrice}}</div>
                <div v-if="item.periodRatio" :class="(item.periodRatio.indexOf('-')) ? 'greenLine' : 'redLine'">
                  <div>{{formatterRadio(item.periodRatio)}}</div>
                </div>
                <!--<div>{{item.sellAmount}}</div>-->
              </div>
            </div>
          </vue-seamless-scroll>


        </div>
      </div>
      <div class="echartsBox echartsBox2">
        <span class="echartsLabel">销量热区</span>
        <div class="echartsContent">
          <div id="barChart" :style="{width: '100%', height: '250px'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import split_bg from '../ststic/split_bg.png'
  import domUtil from "../../../utils/domUtil";
  import legend_circle from '../ststic/legend_circle.png';
  import Vue from 'vue'
  import { Row,Col} from 'ant-design-vue'
  Vue.use(Row)
  Vue.use(Col)
  import {getLineData , getQipaoData, getTableData, getPieData} from '@/api/marketStatic.js'
    export default {
        name: "marketStatic",
        data() {
            return {
                classOption: {
                    direction: 1,
                    step: 0.5,
                    limitMoveNum: 6,
                },
                split_bg,
                legend_circle,
                lineLegend:[
                    {label: '黑木耳'},
                    {label: '玉木耳'},
                    {label: '金木耳'}
                ],
                list: [
                    {
                        productType: '产品品种',
                        region: '区域',
                        price: '单价',
                        percent: '环比',
                        salesVolume: '销售量'
                    },
                    {
                        productType: '产品品类',
                        productName: '产品名称',
                        region: '区域',
                        price: '单价',
                        percent: '环比',
                        salesVolume: '销售量'
                    }
                ],
                loading: false,
                pagination: {
                    current: 1,
                    pageSize: 10,
                    pageSizeOptions: ['10', '20', '30'],
                    showQuickJumper: true,
                    showSizeChanger: true,
                    total: 0,
                    showTotal: total => `共 ${total} 条`
                },
                columns: [
                    {title: '产品品种', dataIndex: 'productType'},
                    {title: '区域', dataIndex: 'cityName'},
                    {title: '单价', dataIndex: 'price'},
                    {title: '环比', dataIndex: 'periodRatio',},
                    // {title: '销量（斤）', dataIndex: 'sellAmount'},
                ],
                blackData: [],
                lineTime:[],
                priceData: [0,0,0,0,0,0,0],
                zoneNameList: ["华中地区","华南地区","华北地区","华东地区","东北地区","西北地区",'西南地区'],
                pieData:[
                    {value:1000,name:'华中'},
                    {value:2000,name:'华东'},
                    {value:1200,name:'华中2'},
                    {value:1500,name:'华中33'},
                    {value:1400,name:'华中111'},
                ],
                setTime:'',
                lineIndex: 0,
                priceIndex: 0,
                pieTotal: 0,
            }
        },
        mounted() {
            let self = this;
            self.changeLine(0);
            self.changePrice(0);
            self.getPieData();
            self.setTableData();
            window.addEventListener('resize', () => {
                this.myChart.resize()
            })
        },
        beforeDestroy(){
            clearInterval(this.setTime)
        },
        methods: {
            formatterRadio(data){
                if(data.indexOf('-') >= 0){
                    return data.split('-')[1]
                }
                return data
            },
            async changeLine(index){
                this.lineIndex = index;
                if(this.lineIndex === 0){
                    await this.setLineData('black_agaric')
                }else if(this.lineIndex === 1){
                    await this.setLineData('yu_agaric')
                }else if(this.lineIndex === 2){
                    await this.setLineData('jin_agaric')
                }
            },
            changePrice(index){
                debugger
                this.priceIndex = index;
                if(index === 0){
                    this.getPriceData('black_agaric');
                }else if(index === 1){
                    // this.priceData = [33,44,55,66,77,22,11]
                    this.getPriceData('yu_agaric');
                }else if(index === 2){
                    // this.priceData = [33,11,55,11,66,33,44]
                    this.getPriceData('jin_agaric');
                }
            },
            async getPriceData(type){
                await getQipaoData(type).then((res) => {
                    debugger
                    let data = res.data;
                    if(res.data.length === 0 ){
                        this.blackData = []
                        this.lineTime = [];
                        this.priceData = [0,0,0,0,0,0,0];
                        this.initCycleEcharts()
                    }else{
                        for(let i = 0; i< data.length; i++){
                            for(let j = 0; j < this.zoneNameList.length; j++){
                                if(data[i].zoneName == this.zoneNameList[j]){
                                    this.priceData[this.zoneNameList.indexOf(this.zoneNameList[j])] = data[i].productPrice
                                }
                            }
                            this.blackData.push(data[i].productPrice);
                            this.lineTime.push(domUtil.formDate(data[i].time))
                        }
                        this.initCycleEcharts()
                    }

                })
            },
            setTableData(){
                getTableData().then((res) => {
                    debugger
                    this.list = res.data;
                })
            },
            getPieData(){
                let self = this;
                this.pieData = [];
                this.pieTotal = 0;
                for(let i = 0;i<this.pieData.length;i++){
                    this.pieTotal += this.pieData[i].value
                }
                getPieData().then((res) => {
                    for(let i=0; i< res.data.length; i++){
                        this.pieData.push(
                            {value: res.data[i].sellAmount, name: res.data[i].zoneName}
                        )
                        self.initLoudouEcharts()
                    }
                })

            },
            async setLineData(type){
                this.blackData = [];
                this.lineTime = [];
                let dateList = [];
                getLineData(type).then((res) => {
                    let data = res.data;
                    for(let i = 0; i< data.length; i++){
                        dateList.push(domUtil.formDate(data[i].time))
                        this.blackData.push(data[i].productPrice);
                    }
                    this.lineTime = dateList;
                    this.initLineEcharts()
                })
            },
            initLineEcharts() {
                let self = this;
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: '',
                    tooltip: {
                        formatter(params){
                            return '时间:' + params.name + '</br>' + '价格:' + params.value
                        },
                    },
                    legend: {
                        orient: 'horizontal',
                        itemWidth: 12,
                        itemHeight: 12,
                        data:[
                            {
                                name: '黑木耳',
                                //borderColor: 'yellow'
                                // icon: 'circle',
                                icon: 'image://' + self.legend_circle
                            },
                            {
                                name: '玉木耳',
                                icon: 'image://' + self.legend_circle
                            },
                            {
                                name: '金木耳',
                                icon: 'image://' + self.legend_circle
                            }
                        ],
                        textStyle: {
                            color: '#fff',
                            fontStyle:{
                                color: '#fff',
                            }
                        },
                    },
                    xAxis: {
                        data: self.lineTime,
                        axisLine: {
                            onZero: true,
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        splitLine:{
                            show:false, //是否显示分割线，默认为true
                            lineStyle:{
                                color:['#fff'], //分割线颜色
                            }
                        },
                        axisTick:{
                            show: false
                        },

                    },
                    yAxis: {
                        splitLine:{
                            show:false, //是否显示分割线，默认为true
                            lineStyle:{

                            }
                        },
                        axisLabel : {
                            formatter: function(){
                                return "";
                            }
                        },
                        nameTextStyle:{
                            color:'#fff', //X轴标记颜色
                            show: false
                        },
                        axisLine: {
                            onZero: true,
                            lineStyle: {
                                color: '#fff'
                            },
                            show: false,
                        },
                        axisTick:{
                            show: false
                        },
                    },
                    series: [{
                        name: '',
                        type: 'line',
                        data: self.blackData,
                        smooth: true,
                        itemStyle:{
                            normal:{
                                color:'#096FF4',
                                borderWidth: 3,
                                height:8,
                                width:8,
                            },
                            emphasis:{
                                borderWidth: 1,
                                color: '#096FF4',
                                borderColor: 'rgba(255,255,255,1)'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: new self.$echarts.graphic.LinearGradient(
                                    1, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#00EFF2'},
                                        {offset: 1, color: '#0B4DF4'}
                                    ]
                                )
                            }
                        },
                    }]
                });
            },
            initCycleEcharts() {
                let self = this;
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('piceChart'))
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        formatter(params){
                            debugger
                            console.log(params)
                            return '地区: ' + params.name + '</br>' + '价格: ' + params.value[1] + '元'
                        },
                    },
                    xAxis: {
                        data: this.zoneNameList,
                        axisTick:{
                            show: false,
                            color:'#fff'
                        },
                        axisLabel: {
                            margin: 35,
                        },
                        axisLine: {
                            show: false,
                            onZero: true,
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        splitLine:{
                            show:false, //是否显示分割线，默认为true
                            lineStyle:{

                            }
                        },
                    },
                    yAxis: {
                        splitLine:{
                            show:false, //是否显示分割线，默认为true
                            lineStyle:{

                            }
                        },
                        axisLabel: {
                            formatter(){
                                return ''
                            },
                        },
                        nameTextStyle:{
                            color:'#fff', //X轴标记颜色
                            show: false
                        },
                        axisLine: {
                            show:false,
                            onZero: true,
                            lineStyle: {
                                color: '#fff'
                            },
                        },
                        axisTick:{
                            show: false
                        },
                    },
                    series: [{
                        symbolSize: 40,
                        itemStyle:{                 //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                            normal:{
                                color: function(params){
                                    let colorArr = ['#05AEF3'];
                                      return colorArr[0]
                                }
                            },
                        },
                        data: [
                            [6, self.priceData[6]],
                            [5, self.priceData[5]],
                            [4, self.priceData[4]],
                            [3, self.priceData[3]],
                            [2, self.priceData[2]],
                            [1, self.priceData[1]],
                            [0, self.priceData[0]],
                        ],
                        type: 'scatter'
                    }]
                })

            },
            initLoudouEcharts(){
                let self = this;
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('barChart'))
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '',
                        left:'center',
                        top:'30%',
                        padding:[24,0],
                        textStyle:{
                            color:'#fff',
                            fontSize:18,
                            align:'center'
                        }
                    },
                    tooltip: {
                        formatter(params){
                            return '地区:' + params.name + '</br>' + '销量:' + params.value + '斤'
                        },
                    },
                    series: [{
                        name: '',
                        type: 'pie',
                        data: self.pieData,
                        hoverAnimation: false,
                        center: ["50%", "48%"],
                        radius: ['40%', '60%'],
                        labelLine: {
                            type: 'dashed', //引导线样式为虚线或者实线
                            normal: {
                                length: 10, //引导线有两部分，length和length2分别控制两段线的长度
                                length2: 100,
                                lineStyle: {
                                    //color: '#fff'
                                }
                            },
                        },
                        itemStyle: {
                            fontStyle: {
                                color: '#fff'
                            }
                        },
                        label:{            //饼图图形上的文本标签
                            show:true,
                            textStyle : {
                                fontWeight : 300 ,
                                fontSize : 12    //文字的字体大小
                            },
                            formatter:[
                                '{a|{b}}',//引导线上面文字
                                '{b|}',//引导线上面文字
                                '{c|{c}斤}' //引导线下面文字
                            ].join('\n'), //用\n来换行
                            rich:{
                                a:{
                                    height:10,
                                    width:10,
                                    color:'#fff',
                                    left:20,
                                },
                                b:{
                                    height:10,
                                    width:10,
                                    color:'#fff',
                                    left:20,
                                },
                                c:{
                                    height:10,
                                    width:10,
                                    color:'#fff',
                                    padding:[-10,0],
                                    left:20,
                                }
                            },
                        },
                        //饼图颜色，在有的需求里需要把饼图颜色固定，可在此处进行配置
                        color:function(params){
                            //设置需要的颜色集合，把params中的对应数据要显示的颜色进行匹配
                            let colorList = ['#40DCE7','#B6E887','#6A79F6','#F7A95D','#F7DB6B','#7cd2a7','#d78506'];
                            debugger
                            console.log(params)
                            if(params.dataIndex === 0){
                                return colorList[0];
                            }else if(params.dataIndex === 1){
                                return colorList[1];
                            }else if(params.dataIndex === 2){
                                return colorList[2];
                            }else if(params.dataIndex === 3){
                                return colorList[3];
                            }else if(params.dataIndex === 4){
                                return colorList[4];
                            }else if(params.dataIndex === 5){
                                return colorList[5];
                            }else if(params.dataIndex === 6){
                                return colorList[6];
                            }
                        }
                    }]
                });

            },
        },
    }
</script>

<style scoped lang="less">
  .echartsBox2{
    overflow: hidden;
  }
  .seamless-warp {
    height: 229px;
    overflow: hidden;
  }
  .redLine{
    color: #EB1451 !important;
  }
  .greenLine{
    color: #00D098 !important;
  }
  .marketTitle{
    width: 100%;
    height: 65px;
    line-height: 65px;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    color: #01FFF4;
    position: relative;
  }
  .titleLeft{
    height: 65px;
    margin-top: 16px;
    background: url("../ststic/top_left.png") no-repeat;
    background-size: 100%;
  }
  .tableBox{
  }
  .titleRight{
    height: 65px;
    margin-top: 16px;
    background: url("../ststic/top_right.png") no-repeat;
    background-size: 100%;
  }
  .splitImg{
    position: absolute;
    top: 0;
    left: 0;
    height: 96%;
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
  .echartLineFormat{
    position: relative;
  }
  .echartsXLine{
    height: 1px;
    position: absolute;
    top: 264px;
    left: 58px;
    background-color: #fff;
    width: 80%;
  }
  .marketContent {
    height: 100%;
    //min-width: 1280px;
    overflow: auto;
    background: url("../ststic/market_bg.png") no-repeat;
    background-size: 100% 100%;
    .marketTitle{
      width: 100%;
      height: 65px;
      line-height: 65px;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      color: #01FFF4;
      position: relative;
      .titleLeft{
        width: 50%;
        height: 65px;
        position: absolute;
        top: 21px;
        left: 250px;
        background: url("../ststic/top_left.png") no-repeat;
      }
      .titleRight{
        width: 50%;
        height: 65px;
        position: absolute;
        top: 21px;
        left: 810px;
        background: url("../ststic/top_right.png") no-repeat;
      }
    }

    .topContent {
      width: 100%;
      height: 354px;
      display: -webkit-box;
      flex-flow: nowrap;
      .echartsBox {
        position: relative;
        margin: 1%;
        width: 48%;
        /*border-radius: 15px;*/
        padding: 10px;
        background: url('../ststic/split_bg.png') no-repeat;
        background-size: 100% 99%;

        .echartsLegend{
          display: flex;
          color: #fff;
          position: absolute;
          right: 10%;
          width: 210px;
          top: 33px;
          .legendBox{
            margin-right: 10px;
            cursor: pointer;
            .legend{
              height: 12px;
              width: 12px;
              display: inline-block;
              border: 3px solid #999999;
              border-radius: 50%;
              margin-right: 5px;
            }
          }
          .isSelect{
            border: 3px solid #00DCEB !important;
          }

        }
        .echartsLabel {
          display: inherit;
          font-size: 20px;
          font-weight: bold;
          color: #FFD500;
          text-align: left;
          padding: 20px;
        }

        .echartsContent {
          height: 220px;
          overflow: hidden;

          .tableContent {
            display: flex;
            flex-wrap: nowrap;
            padding: 10px 0;
          }
          .tableContent:nth-of-type(odd){
            background-color: #1F276D;
          }
          /deep/.g2-guide-html{
            color: #fff;
          }
          .tableContent > div {
            color: #fff;
            width: 163px;
          }

          /deep/ .ant-table-thead > tr > th {
            background-color: #04113e;
            color: #fff;
          }

          /deep/ .ant-table-placeholder {
            background-color: #04113e;
            color: #fff;
            border-bottom: none;
          }

          /deep/ .ant-table {
            color: #fff;
          }
        }
      }
    }

    .bottomContent {
      height: 50%;
      width: 100%;
      min-height: 360px;
    }
  }

</style>
