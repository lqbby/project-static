window.onload = async function () {
    const res = await axios({ url: '/dashboard' })
    console.log(res);
    const { year, salaryData, groupData } = res.data
    // console.log(year);
    // 设置标题部分
    for (let key in res.data.overview) {
        console.log(`[name="${key}"]`);
        document.querySelector(`[name="${key}"]`).innerHTML = res.data.overview[key];
    }

    // 全学科薪资走势
    renderSubject(year)
    //班级薪资
    renderClass(salaryData)
    // 班级每组薪资
    renderClassSalary(groupData)
}


function renderSubject(arr) {
    var myChart = echarts.init(document.getElementById('line'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2022全学科薪资走势',
            top: '10',
            left: '10'
        },
        xAxis: {
            type: 'category',
            data: arr.map(item => item.month),
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'skyblue'
                }
            },
            axisLabel: {
                color: '#000'
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: 'skyblue'
                }
            }
        },
        series: [
            {
                data: arr.map(item => item.salary),
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 8,
                    color: '#5f8eff'
                },
                symbolSize: 10,
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#c8e2ff' // 0% 处的颜色
                        }, {
                            offset: 0.8, color: '#fff' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
            }
        ]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}

function renderClass(arr) {
    var myChart = echarts.init(document.getElementById('salary'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '班级薪资分布'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '50%'],
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
                data: arr.map(item => ({
                    value: item.g_count + item.b_count,
                    name: item.label
                }))
            }
        ],
        color: ['red', 'blue', 'pink', 'green', 'yellow']
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}


function renderClassSalary(arr) {
    var myChart = echarts.init(document.getElementById('lines'));

    // 指定图表的配置项和数据
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

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    //渲染标题列表
    // const titleStr = arr.map((item, index) => `<button type="button" class="btn btn-xs ">${index + 1}</button>`).join('')
    // document.querySelector('#btns').innerHTML = titleStr

    let titleStr = ''
    for (let key in arr) {
        titleStr += `<button type="button" class="btn btn-xs ">${key}</button>`
    }
    document.querySelector('#btns').innerHTML = titleStr

    // 排他思想 点击切换
    const btnList = document.querySelectorAll('#btns button')
    btnList.forEach(btn => {
        btn.onclick = function () {
            for (let i = 0; i < btnList.length; i++) {
                btnList[i].classList.remove('btn-blue')
            }
            this.classList.add('btn-blue')

            const index = this.innerHTML
            // console.log(arr[index]);
            // console.log(arr[index].map(item => item.hope_salary));
            //echarts数据有变化，我们就可以通过setOption来重绘图表
            myChart.setOption({
                xAxis: {
                    data: arr[index].map(item => item.name)
                },
                series: [
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
    btnList[0].click()//模拟点击
}