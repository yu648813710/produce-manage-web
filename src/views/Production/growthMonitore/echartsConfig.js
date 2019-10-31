export default {
  pieEchartsOption(id, self) {
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
      legend: {
        orient: 'horizontal',
        x: '20',
        y: '30',
        data: self.pieData,
        icon: 'circle',
        itemGap: 70,
        textStyle: {
          color: '#94B1EE',
          fontSize: 16
        }
      },
      tooltip: {
        formatter(params) {
          return '类型:' + params.name + '</br>' + params.percent + '%'
        }
      },
      series: [
        {
          name: '',
          type: 'pie',
          data: self.pieData,
          hoverAnimation: false,
          center: ['75%', '38%'],
          radius: ['45%', '75%'],
          labelLine: {
            type: 'dashed', // 引导线样式为虚线或者实线
            normal: {
              length: 10, // 引导线有两部分，length和length2分别控制两段线的长度
              length2: 100,
              lineStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {
            fontStyle: {
              color: '#fff'
            }
          },
          label: {
            // 饼图图形上的文本标签
            show: false
          },
          // 饼图颜色，在有的需求里需要把饼图颜色固定，可在此处进行配置
          color: function(params) {
            // 设置需要的颜色集合，把params中的对应数据要显示的颜色进行匹配
            let colorList = [
              '#02FBF8',
              '#FFC100',
              '#6A79F6',
              '#F7A95D',
              '#F7DB6B'
            ]
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
            }
          }
        }
      ]
    })
    return option
  }
}
