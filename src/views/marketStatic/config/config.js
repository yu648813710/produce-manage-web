export default {
  barEchartsSetting(data){
    var startAngle = -Math.PI / 2 - Math.PI / 4;
    var ds = new DataSet();
    var dv = ds.createView().source(data);
    dv.transform({
      type: 'percent',
      field: 'value',
      dimension: 'type',
      as: 'percent'
    });
    var chart = new G2.Chart({
      container: 'loudoutu',
      forceFit: true,
      height: 260,
      padding: 'auto'
    });
    setInterval(function () {
      dv.rows[0].value += 100;
      chart.source(dv);
    },5000)
    chart.source(dv);
    chart.legend(false);
    chart.coord('theta', {
      radius: 0.75,
      innerRadius: 0.5,
      startAngle: startAngle,
      endAngle: startAngle + Math.PI * 2
    });
    chart.intervalStack().position('value').color('type', ['#0a4291', '#0a57b6', '#1373db', '#2295ff', '#48adff', '#6fc3ff', '#96d7ff', '#bde8ff']).opacity(1).label('percent', {
      offset: -20,
      textStyle: {
        fill: 'white',
        fontSize: 12,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)'
      },
      formatter: function formatter(val) {
        return parseInt(val * 100) + '%';
      }
    });
    chart.guide().html({
      position: ['50%', '50%'],
      html: '<div class="g2-guide-html"><p class="title">总计</p><p class="value"></p></div>'
    });

    chart.render();
    //draw label
    var OFFSET = 20;
    var APPEND_OFFSET = 50;
    var LINEHEIGHT = 60;
    var coord = chart.get('coord'); // 获取坐标系对象
    var center = coord.center; // 极坐标圆心坐标
    var r = coord.radius; // 极坐标半径
    var canvas = chart.get('canvas');
    var canvasWidth = chart.get('width');
    var canvasHeight = chart.get('height');
    var labelGroup = canvas.addGroup();
    var labels = [];
    addPieLabel(chart);
    canvas.draw();
    chart.on('afterpaint', function() {
      addPieLabel(chart);
    });
    //main
    function addPieLabel() {
      var halves = [[], []];
      var data = dv.rows;
      var angle = startAngle;

      for (var i = 0; i < data.length; i++) {
        var percent = data[i].percent;
        var targetAngle = angle + Math.PI * 2 * percent;
        var middleAngle = angle + (targetAngle - angle) / 2;
        angle = targetAngle;
        var edgePoint = getEndPoint(center, middleAngle, r);
        var routerPoint = getEndPoint(center, middleAngle, r + OFFSET);
        //label
        var label = {
          _anchor: edgePoint,
          _router: routerPoint,
          _data: data[i],
          x: routerPoint.x,
          y: routerPoint.y,
          r: r + OFFSET,
          fill: '#fff'
        };
        // 判断文本的方向
        if (edgePoint.x < center.x) {
          label._side = 'left';
          halves[0].push(label);
        } else {
          label._side = 'right';
          halves[1].push(label);
        }
      } // end of for

      var maxCountForOneSide = parseInt(canvasHeight / LINEHEIGHT, 10);
      halves.forEach(function(half, index) {
        // step 2: reduce labels
        if (half.length > maxCountForOneSide) {
          half.sort(function(a, b) {
            return b._percent - a._percent;
          });
          half.splice(maxCountForOneSide, half.length - maxCountForOneSide);
        }

        // step 3: distribute position (x and y)
        half.sort(function(a, b) {
          return a.y - b.y;
        });
        antiCollision(half, index);
      });
    }

    function getEndPoint(center, angle, r) {
      return {
        x: center.x + r * Math.cos(angle),
        y: center.y + r * Math.sin(angle)
      };
    }

    function drawLabel(label) {
      var _anchor = label._anchor,
        _router = label._router,
        fill = label.fill,
        y = label.y;
      //引导线颜色
      var labelAttrs = {
        y: y,
        fontSize: 12, // 字体大小
        fill: '#fff',
        text: label._data.type + '\n' + label._data.value,
        textBaseline: 'bottom'
      };
      var lastPoint = {
        y: y
      };

      if (label._side === 'left') {
        // 具体文本的位置
        lastPoint.x = APPEND_OFFSET;
        labelAttrs.x = APPEND_OFFSET; // 左侧文本左对齐并贴着画布最左侧边缘
        labelAttrs.textAlign = 'left';
      } else {
        lastPoint.x = canvasWidth - APPEND_OFFSET;
        labelAttrs.x = canvasWidth - APPEND_OFFSET; // 右侧文本右对齐并贴着画布最右侧边缘
        labelAttrs.textAlign = 'right';
      }

      // 绘制文本
      var text = labelGroup.addShape('Text', {
        attrs: labelAttrs
      });
      labels.push(text);
      // 绘制连接线
      var points = void 0;
      if (_router.y !== y) {
        // 文本位置做过调整
        points = [[_anchor.x, _anchor.y], [_router.x, y], [lastPoint.x, lastPoint.y]];
      } else {
        points = [[_anchor.x, _anchor.y], [_router.x, _router.y], [lastPoint.x, lastPoint.y]];
      }

      labelGroup.addShape('polyline', {
        attrs: {
          points: points,
          lineWidth: 1,
          stroke: fill
        }
      });
    }

    function antiCollision(half, isRight) {
      var startY = center.y - r - OFFSET - LINEHEIGHT;
      var overlapping = true;
      var totalH = canvasHeight;
      var i = void 0;

      var maxY = 0;
      var minY = Number.MIN_VALUE;
      var boxes = half.map(function(label) {
        var labelY = label.y;
        if (labelY > maxY) {
          maxY = labelY;
        }
        if (labelY < minY) {
          minY = labelY;
        }
        return {
          size: LINEHEIGHT,
          targets: [labelY - startY]
        };
      });
      if (maxY - startY > totalH) {
        totalH = maxY - startY;
      }

      while (overlapping) {
        boxes.forEach(function(box) {
          var target = (Math.min.apply(minY, box.targets) + Math.max.apply(minY, box.targets)) / 2;
          box.pos = Math.min(Math.max(minY, target - box.size / 2), totalH - box.size);
        });

        // detect overlapping and join boxes
        overlapping = false;
        i = boxes.length;
        while (i--) {
          if (i > 0) {
            var previousBox = boxes[i - 1];
            var box = boxes[i];
            if (previousBox.pos + previousBox.size > box.pos) {
              // overlapping
              previousBox.size += box.size;
              previousBox.targets = previousBox.targets.concat(box.targets);

              // overflow, shift up
              if (previousBox.pos + previousBox.size > totalH) {
                previousBox.pos = totalH - previousBox.size;
              }
              boxes.splice(i, 1); // removing box
              overlapping = true;
            }
          }
        }
      }

      // step 4: normalize y and adjust x
      i = 0;
      boxes.forEach(function(b) {
        var posInCompositeBox = startY; // middle of the label
        b.targets.forEach(function() {
          half[i].y = b.pos + posInCompositeBox + LINEHEIGHT / 2;
          posInCompositeBox += LINEHEIGHT;
          i++;
        });
      });

      // (x - cx)^2 + (y - cy)^2 = totalR^2
      half.forEach(function(label) {
        var rPow2 = label.r * label.r;
        var dyPow2 = Math.pow(Math.abs(label.y - center.y), 2);
        if (rPow2 < dyPow2) {
          label.x = center.x;
        } else {
          var dx = Math.sqrt(rPow2 - dyPow2);
          if (!isRight) {
            // left
            label.x = center.x - dx;
          } else {
            // right
            label.x = center.x + dx;
          }
        }
        drawLabel(label);
      });
    }
  },
  lineCycleEcharts(data){
    let Shape = G2.Shape;
    Shape.registerShape('point', 'image', {
      drawShape: function drawShape(cfg, container) {
        cfg.points = this.parsePoints(cfg.points);
        let coord = this._coord;
        container.addShape('line', {
          attrs: {
            x1: cfg.points[0].x,
            y1: cfg.points[0].y,
            x2: cfg.points[0].x,
            y2: coord.start.y,
            stroke: '#ccc',
            lineWidth: 1,
            lineDash: [4, 2]
          }
        });
        return container.addShape('image', {
          attrs: {
            x: cfg.points[0].x - 12 * cfg.size / 2,
            y: cfg.points[0].y - 12 * cfg.size,
            width: 12 * cfg.size,
            height: 12 * cfg.size,
            img: cfg.shape[1]
          }
        });
      }
    });
    let imageMap = {
      '京东商城': 'https://gw.alipayobjects.com/zos/rmsportal/eOYRaLPOmkieVvjyjTzM.png',
      '李宁商城': 'https://gw.alipayobjects.com/zos/rmsportal/dWJWRLWfpOEbwCyxmZwu.png',
      '阿里商城': 'https://gw.alipayobjects.com/zos/rmsportal/ZEPeDluKmAoTioCABBTc.png',
      'Safari': 'https://gw.alipayobjects.com/zos/rmsportal/eZYhlLzqWLAYwOHQAXmc.png',
      'Opera': 'https://gw.alipayobjects.com/zos/rmsportal/vXiGOWCGZNKuVVpVYQAw.png',
      'Undetectable': 'https://gw.alipayobjects.com/zos/rmsportal/NjApYXminrnhBgOXyuaK.png'
    };
    let chart = new G2.Chart({
      container: 'cycleEchart',
      forceFit: true,
      height: 300
    });
    chart.source(data, {
      value: {
        nice: false,
        max: 60,
        min: 0
      }
    });
    chart.legend(false);
    chart.axis('value', false);
    chart.point().position('name*value').size('value').color('name').shape('name', function (name) {
      return ['image', imageMap[name]]; // 根据具体的字段指定 shape
    }).label('value', {
      offset: -20,
      textStyle: {
        fontSize: 16 // 文本大小
      }
    });
    chart.render();
  },
  lineEchart(data){
    let ds = new DataSet();
    let dv = ds.createView().source(data);
    // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
    dv.transform({
      type: 'fold',
      fields: ['black', 'gold', 'white'], // 展开字段集
      key: 'type', // key字段
      value: 'value' // value字段
    });
    console.log(dv)
    let chart = new G2.Chart({
      container: 'line',
      forceFit: true,
      height: 260
    });
    chart.source(dv, {
      time: {
        range: [0, 1]
      }
    });
    chart.legend({
      title: null, // 不展示图例的标题
      marker: 'circle', // 设置图例 marker 的显示样式
      position: 'top-left',
      textStyle: {
        fill: '#FFF',

      },

    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.axis('value', {
      label: {
        formatter: function formatter(val) {
          return val + '°C';
        }
      }
    });
    chart.line().position('time*value').color('type').shape('smooth');
    chart.point().position('time*value').color('type').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    chart.render();
  },
}
