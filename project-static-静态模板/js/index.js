window.onload = async function () {
  try {
    const res = await axios({
      url: '/dashboard',
      method: 'get'
    })
    console.log('res:', res)
    const { year, salaryData, groupData, provinceData } = res.data
    // document.querySelector('[name=age]').innerHTML = res.data.overview.age
    // document.querySelector('[name=salary]').innerHTML = res.data.overview.salary
    // forin
    for (const key in res.data.overview) {
      // console.log('key:', key)
      // console.log('res.data.overview[key]:', res.data.overview[key])
      // 动态的根据key去获取元素
      // 动态的根据key去获取数据
      // 对象[key] ==> key对应的值 key='age' -->对象.age  key='count'  -->对象.count
      // 对象.key==> 属性名为key 的值
      document.querySelector(`[name=${key}]`).innerHTML = res.data.overview[key]
    }

    // ---------- 薪资走势图表 ----------
    function salaryEchart (year) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.querySelector('#line'))

      // 指定图表的配置项和数据
      const option = {
        // 标题部分的设置
        title: {
          text: '2021全学科薪资走势',
          top: '2%',
          left: '3%'
        },
        // 图表
        grid: {
          // 设置上下左右的间隙
          top: '15%',
          left: '10%',
          right: '10%',
          bottom: '10%'
        },
        // x轴的设置
        xAxis: {
          type: 'category',
          data: year.map(v => v.month), // 箭头行数 一行代码 省略 {} return
          // x轴线段设置
          axisLine: {
            // 线段的样式
            lineStyle: {
              // 类型 虚线
              type: 'dashed',
              // 颜色
              color: '#d3d3d3'
            }
          },
          // x轴文本设置
          axisLabel: {
            // 颜色
            color: 'black'
          }
        },
        // y轴的设置
        yAxis: {
          type: 'value',
          // 分割线
          splitLine: {
            // 线的样式
            lineStyle: {
              type: 'dashed', // 类型
              // width:20, // 宽度
              color: 'deepskyblue' // 颜色
            }
          }
        },
        color: ['#5f8eff'],
        // 提示框 设置了才会出现
        tooltip: {
          show: true
        },
        series: [
          {
            data: year.map(v => v.salary),
            type: 'line',
            // 圆圈
            smooth: true,
            // 圆圈大小
            symbolSize: 10,
            // 线宽
            lineStyle: {
              width: 8
            },
            // 区域颜色
            areaStyle: {
              // 渐变
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#aed4ff' // 0% 处的颜色
                  },
                  {
                    offset: 0.7,
                    color: '#ffffff' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
    // 调用+传递数据
    salaryEchart(year)

    // ---------- 薪资分布图 ----------
    function salaryPieEchart (salaryData) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.querySelector('#salary'))

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: '班级薪资分布',
          top: '2%',
          left: '3%'
        },
        tooltip: {
          trigger: 'item'
        },
        // 图例
        legend: {
          bottom: '5%',
          left: 'center'
        },
        // 颜色
        color: ['#fda224', '#5097ff', '#3fceff', '#34d39a', 'yellowgreen'],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: salaryData.map(v => {
              return {
                value: v.g_count + v.b_count,
                name: v.label
              }
            })
            // [
            //   { value: 1048, name: 'Search Engine' },
            //   { value: 735, name: 'Direct' },
            //   { value: 580, name: 'Email' },
            //   { value: 484, name: 'Union Ads' },
            //   { value: 300, name: 'Video Ads' }
            // ]
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
    salaryPieEchart(salaryData)

    // ---------- 每组薪资 ----------
    function groupSalaryEchart (groupData) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.querySelector('#lines'))

      // 指定图表的配置项和数据
      const option = {
        // x轴设置
        xAxis: {
          type: 'category',
          data: groupData[1].map(v => v.name),
          // 线段设置
          axisLine: {
            // 线的样式
            lineStyle: {
              type: 'dashed',
              color: '#d4d4d6'
            }
          }
        },
        yAxis: {
          type: 'value',
          // 分割线设置
          splitLine: {
            // 线的样式
            lineStyle: {
              type: 'dashed',
              color: '#d4d4d6'
            }
          }
        },
        // 颜色
        color: [
          // 渐变
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#34d29a' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#d4f5ea' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#499fed' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#d8eafb' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        ],
        series: [
          // 柱状图 给多个图形,会有柱形
          {
            data: groupData[1].map(v => v.hope_salary),
            type: 'bar'
          },
          {
            data: groupData[1].map(v => v.salary),
            type: 'bar'
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)

      // ---------- 点击按钮高亮 ----------
      const btns = document.querySelectorAll('#btns button')
      btns.forEach(v => {
        v.onclick = function () {
          // console.log('clickme')
          // 移除所有的高亮类名
          btns.forEach(item => item.classList.remove('btn-blue'))
          // 为自己添加高亮类名
          this.classList.add('btn-blue')
          // 更新数据 innerHTML可能会因为格式化多一些内容
          const index = this.innerHTML.trim()
          // console.log('index:', index)
          // 更新图表
          // x轴的数据
          option.xAxis.data = groupData[index].map(v => v.name)
          // 2个柱形图的数据
          option.series[0].data = groupData[index].map(v => v.hope_salary)
          option.series[1].data = groupData[index].map(v => v.salary)

          myChart.setOption(option)
        }
      })

      // 测试代码 测试 重新 setOption图表是否会更新
      // setTimeout(() => {
      //   // 更新数据 重新生成图表
      //   // x轴的数据
      //   option.xAxis.data = groupData[2].map(v => v.name)
      //   // 2个柱形图的数据
      //   option.series[0].data = groupData[2].map(v => v.hope_salary)
      //   option.series[1].data = groupData[2].map(v => v.salary)

      //   myChart.setOption(option)
      // }, 3000)
    }
    groupSalaryEchart(groupData)

    // ---------- 男女薪资分布 ----------
    function boyGirlEchart (salaryData) {
      console.log('groupData:', groupData)
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.querySelector('#gender'))

      // 指定图表的配置项和数据
      const option = {
        // title可以设置一个数组 给多个标题
        title: [
          {
            text: '男女薪资分布',
            top: '3%',
            left: '4%'
          },
          {
            text: '男生',
            left: 'center',
            top: '45%'
          },
          {
            text: '女生',
            left: 'center',
            top: '85%'
          }
        ],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          show: false
        },
        color: ['#fda224', '#5097ff', '#3abcfa', '#34d39a', 'yellowgreen'],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['25%', '35%'],
            // 圆心的位置
            center: ['50%', '30%'],
            data: salaryData.map(v => {
              return {
                value: v.b_count,
                name: v.label
              }
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: 'Access From',
            type: 'pie',
            radius: ['25%', '35%'],
            center: ['50%', '70%'],
            data: salaryData.map(v => {
              return {
                value: v.g_count,
                name: v.label
              }
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
    boyGirlEchart(salaryData)

    // ------------- 地图 -------------
    function initMapChart (provinceData) {
      console.log('provinceData:', provinceData)
      // 找到元素
      const myEchart = echarts.init(document.querySelector('#map'))
      // 选项
      const dataList = [
        { name: '南海诸岛', value: 0 },
        { name: '北京', value: 0 },
        { name: '天津', value: 0 },
        { name: '上海', value: 0 },
        { name: '重庆', value: 0 },
        { name: '河北', value: 0 },
        { name: '河南', value: 0 },
        { name: '云南', value: 0 },
        { name: '辽宁', value: 0 },
        { name: '黑龙江', value: 0 },
        { name: '湖南', value: 0 },
        { name: '安徽', value: 0 },
        { name: '山东', value: 0 },
        { name: '新疆', value: 0 },
        { name: '江苏', value: 0 },
        { name: '浙江', value: 0 },
        { name: '江西', value: 0 },
        { name: '湖北', value: 0 },
        { name: '广西', value: 0 },
        { name: '甘肃', value: 0 },
        { name: '山西', value: 0 },
        { name: '内蒙古', value: 0 },
        { name: '陕西', value: 0 },
        { name: '吉林', value: 0 },
        { name: '福建', value: 0 },
        { name: '贵州', value: 0 },
        { name: '广东', value: 0 },
        { name: '青海', value: 0 },
        { name: '西藏', value: 0 },
        { name: '四川', value: 0 },
        { name: '宁夏', value: 0 },
        { name: '海南', value: 0 },
        { name: '台湾', value: 0 },
        { name: '香港', value: 0 },
        { name: '澳门', value: 0 }
      ]

      // 数据转换
      provinceData.forEach(v => {
        dataList.find(item => {
          // indexOf-1 不存在
          // indexof 0 找到了
          // console.log(v.name.indexOf(item.name))
          if (v.name.indexOf(item.name) === 0) {
            // console.log('item.name:', item.name)
            // console.log('v.name:', v.name)
            // 服务器返回的 value 设置给对应本地数据的value
            item.value = v.value
          }
        })
      })
      // console.log('dataList:', dataList)

      let option = {
        title: {
          text: '籍贯分布',
          top: 10,
          left: 10,
          textStyle: {
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} 位学员',
          borderColor: 'transparent',
          backgroundColor: 'rgba(0,0,0,0.5)',
          textStyle: {
            color: '#fff'
          }
        },
        visualMap: {
          min: 0,
          max: 6,
          left: 'left',
          bottom: '20',
          text: ['6', '0'],
          inRange: {
            color: ['#ffffff', '#0075F0']
          },
          show: true,
          left: 40
        },
        geo: {
          map: 'china',
          roam: false,
          zoom: 1.0,
          label: {
            normal: {
              show: true,
              fontSize: '10',
              color: 'rgba(0,0,0,0.7)'
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)',
              color: '#e0ffff'
            },
            emphasis: {
              areaColor: '#34D39A',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [
          {
            name: '籍贯分布',
            type: 'map',
            geoIndex: 0,
            data: dataList
          }
        ]
      }
      // 生成图表
      myEchart.setOption(option)
    }
    initMapChart(provinceData)
  } catch (error) {
    console.dir(error)
  }
}
