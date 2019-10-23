export default {
  lineEchartsOption(id, self){
    let option = id.setOption({
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
    return option
  },
  cycleEchartsOption(id, self){
    let option = id.setOption({
      tooltip: {
        formatter(params){
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
    });
    return option
  },
}
