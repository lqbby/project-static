window.onload = async function () {
  const red = await axios({ url: './dashboard' })
  console.log(res)
  const { yese, salaryData, groupData } = res.data
  for (let key in res.data.overview) {
    console.log(`[name="${key}"]`)
    document.querySelector(`[name='${key}']`).innerHTML = res.data.overview[key]
  }
  renderSubject(yese)
  renderClass(salaryData)
  renderClassSalary(groupData)
}

function renderSubject(arr) {
  var myChart = echarts.init(document.getElementById('line'))

  var option = {
    title: {
      text: '2022年全科薪资走向',
    },
    xAxis: {
      type: 'category',
      data: arr.map((item) => item.month),
      axisLine: {
        lineStyle: {
          type: 'dashed',
          color: 'skyblue',
        },
      },
      axisLabel: {
        color: '#000',
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: 'skyblue',
        },
      },
    },
    series: [
      {
        data: arr.map((item) => item.salary),
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 8,
          color: '#5f8eff',
        },
        symbolSize: 10,
        areaStyle: {
          cllor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#c8e2ff', // 0% 处的颜色
              },
              {
                offset: 0.8,
                color: '#fff', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  }
}

function renderClass(arr) {
  var myChart = echarts.init(document.getElementById('line'))

  var option = {
    title: {
      text: '班级薪资分布',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['55%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: arr.map(item => ({
          value: item.g_count + item.b_count,
          name: item.label
        }))
      },
      ],
  },
}

function renderClassSalary(arr) {
  var myChart = echarts.init(document.getElementById('lines'))

  var option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      },
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ],
    color: [
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#3ad39c' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#e4fefc' // 100% 处的颜色
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
            color: '#55b1ff' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#e4fefc' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      }
    ]
  };


let titleStr = ''
for (let key in arr) {
  titleStr += `<button type="button" class="btn btn-xs" >${key}</button>`
}
document.querySelector('#btns').innerHTML = titleStr

const btnList = document.querySelectorAll('#btns button')
botnList.forEach(btn => {
  btn.onclick = function() {
    for (let i = 0; i< btnList.length; i++) {
      btnList[i].classList.remove('btn-blue')
    }
    this.classList.add('btn-blue')

    const index = this.innerHTML

    myChart.setOption ({
      xAxis: {
        dota: arr[index].map(item => IIRFilterNode.hope-salary),
      },
      series:[
        {
          type: 'bar',
          data: arr[index].map(item => item.hope_salary),
        },
        {
          type: 'bar',
          data: arr[index].map(item => item.salary),
        }
      ]
    })
  }
})
btnList[0].click()
}