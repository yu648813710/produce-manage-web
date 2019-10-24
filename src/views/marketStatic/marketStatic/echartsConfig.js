export default {
  lineEchartsOption(id, self) {
    let option = id.setOption({
      title: '',
      tooltip: {
        formatter(params) {
          return '时间:' + params.name + '</br>' + '价格:' + params.value
        }
      },
      legend: {
        orient: 'horizontal',
        itemWidth: 12,
        itemHeight: 12,
        data: [
          {
            name: '黑木耳',
            // borderColor: 'yellow'
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
          fontStyle: {
            color: '#fff'
          }
        }
      },
      xAxis: {
        data: self.lineTime,
        axisLine: {
          onZero: true,
          lineStyle: {
            color: '#fff'
          }
        },
        splitLine: {
          show: false, // 是否显示分割线，默认为true
          lineStyle: {
            color: ['#fff'] // 分割线颜色
          }
        },
        axisTick: {
          show: false
        }

      },
      yAxis: {
        splitLine: {
          show: false, // 是否显示分割线，默认为true
          lineStyle: {

          }
        },
        axisLabel: {
          formatter: function() {
            return ''
          }
        },
        nameTextStyle: {
          color: '#fff', // X轴标记颜色
          show: false
        },
        axisLine: {
          onZero: true,
          lineStyle: {
            color: '#fff'
          },
          show: false
        },
        axisTick: {
          show: false
        }
      },
      series: [{
        name: '',
        type: 'line',
        data: self.blackData,
        smooth: true,
        itemStyle: {
          normal: {
            color: '#096FF4',
            borderWidth: 3,
            height: 8,
            width: 8
          },
          emphasis: {
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
                { offset: 0, color: '#00EFF2' },
                { offset: 1, color: '#0B4DF4' }
              ]
            )
          }
        }
      }]
    })
    return option
  },
  cycleEchartsOption(id, self) {
    let option = id.setOption({
      tooltip: {
        formatter(params) {
          console.log(params)
          return '地区: ' + params.name + '</br>' + '价格: ' + params.value[1] + '元'
        }
      },
      xAxis: {
        data: self.zoneNameList,
        axisTick: {
          show: false,
          color: '#fff'
        },
        axisLabel: {
          margin: 35
        },
        axisLine: {
          show: false,
          onZero: true,
          lineStyle: {
            color: '#fff'
          }
        },
        splitLine: {
          show: false, // 是否显示分割线，默认为true
          lineStyle: {

          }
        }
      },
      yAxis: {
        splitLine: {
          show: false, // 是否显示分割线，默认为true
          lineStyle: {

          }
        },
        axisLabel: {
          formatter() {
            return ''
          }
        },
        nameTextStyle: {
          color: '#fff', // X轴标记颜色
          show: false
        },
        axisLine: {
          show: false,
          onZero: true,
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        }
      },
      series: [{
        symbolSize: 40,
        itemStyle: { // 图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
          normal: {
            color: function(params) {
              let colorArr = ['#05AEF3']
              return colorArr[0]
            }
          }
        },
        data: [
          [6, self.priceData[6]],
          [5, self.priceData[5]],
          [4, self.priceData[4]],
          [3, self.priceData[3]],
          [2, self.priceData[2]],
          [1, self.priceData[1]],
          [0, self.priceData[0]]
        ],
        type: 'scatter'
      }]
    })
    return option
  },
  loudouEchartsOption(id, self) {
    let option = id.setOption({
      title: {
        text: '',
        left: 'center',
        top: '30%',
        padding: [24, 0],
        textStyle: {
          color: '#fff',
          fontSize: 18,
          align: 'center'
        }
      },
      tooltip: {
        formatter(params) {
          return '地区:' + params.name + '</br>' + '销量:' + params.value + '斤'
        }
      },
      series: [{
        name: '',
        type: 'pie',
        data: self.pieData,
        hoverAnimation: false,
        center: ['50%', '48%'],
        radius: ['40%', '60%'],
        labelLine: {
          type: 'dashed', // 引导线样式为虚线或者实线
          normal: {
            length: 10, // 引导线有两部分，length和length2分别控制两段线的长度
            length2: 100,
            lineStyle: {
              // color: '#fff'
            }
          }
        },
        itemStyle: {
          fontStyle: {
            color: '#fff'
          }
        },
        label: { // 饼图图形上的文本标签
          show: true,
          textStyle: {
            fontWeight: 300,
            fontSize: 12 // 文字的字体大小
          },
          formatter: [
            '{a|{b}}', // 引导线上面文字
            '{b|}', // 引导线上面文字
            '{c|{c}斤}' // 引导线下面文字
          ].join('\n'), // 用\n来换行
          rich: {
            a: {
              height: 10,
              width: 10,
              color: '#fff',
              left: 20
            },
            b: {
              height: 10,
              width: 10,
              color: '#fff',
              left: 20
            },
            c: {
              height: 10,
              width: 10,
              color: '#fff',
              padding: [-10, 0],
              left: 20
            }
          }
        },
        // 饼图颜色，在有的需求里需要把饼图颜色固定，可在此处进行配置
        color: function(params) {
          // 设置需要的颜色集合，把params中的对应数据要显示的颜色进行匹配
          let colorList = ['#40DCE7', '#B6E887', '#6A79F6', '#F7A95D', '#F7DB6B', '#7cd2a7', '#d78506']
          console.log(params)
          if (params.dataIndex === 0) {
            return colorList[0]
          } else if (params.dataIndex === 1) {
            return colorList[1]
          } else if (params.dataIndex === 2) {
            return colorList[2]
          } else if (params.dataIndex === 3) {
            return colorList[3]
          } else if (params.dataIndex === 4) {
            return colorList[4]
          } else if (params.dataIndex === 5) {
            return colorList[5]
          } else if (params.dataIndex === 6) {
            return colorList[6]
          }
        }
      }]
    })
    return option
  }
}
