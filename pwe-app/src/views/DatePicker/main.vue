<script>
const log = function () {
  console.log.apply(console, arguments)
}
import { ref } from 'vue'
export default {
  name: 'picker',

  data() {
    /**
     * text: 需要显示的中文
     * dateTargetDay： 对应 js date对象里面对一周的结果
     * setShowData: 存储当前算好的周几然后依次进入， 不够的直接补空
     */
    let dayTargetWeek = [
      {
        text: '一',
        dateTargetDay: 1,
        setShowData: []
      },
      {
        text: '二',
        dateTargetDay: 2,
        setShowData: []
      },
      {
        text: '三',
        dateTargetDay: 3,
        setShowData: []
      },
      {
        text: '四',
        dateTargetDay: 4,
        setShowData: []
      },
      {
        text: '五',
        dateTargetDay: 5,
        setShowData: []
      },
      {
        text: '六',
        dateTargetDay: 6,
        setShowData: []
      },
      {
        text: '日',
        dateTargetDay: 0,
        setShowData: []
      }
    ]
    let year = new Date().getFullYear()
    let mounth = new Date().getMonth() + 1
    let date = new Date().getDate()
    return {
      dayTargetWeek,
      mounth,
      year,
      date
    }
  },

  created() {
    this.__main()
  },

  methods: {
    __main() {
      this.renderInWeekByDate(this.year, this.mounth)
    },

    getPrevMounthDay(dateYear, dateMounth) {
      const day = new Date(dateYear, dateMounth - 1, 0).getDate()
      log({
        dateMounth: dateMounth - 1,
        上个月: day
      })
      let list = []
      for (let dayIndex = 1; dayIndex <= day; dayIndex++) {
        const timeStamp = new Date(dateYear, dateMounth - 2, dayIndex).getTime()
        const getWeekDay = new Date(timeStamp).getDay()
        list.push({
          timeStamp,
          dateLocalString: new Date(timeStamp).toLocaleDateString(),
          mark: 'prevMounth',
          year: dateYear,
          mounth: dateMounth,
          dayIndex,
          [`当月第${dayIndex}天`]: dayIndex,
          周几: getWeekDay
        })
      }

      // 通过传递进来的diff 值拿取 上个月的数组中的元素，倒拿
      const OnByDiffGetList = function (diff) {
        var listLen = list.length
        var listDiff = listLen - diff
        return list.slice(listDiff, listLen)
      }

      return {
        list,
        OnByDiffGetList
      }
    },

    /**
     * 根据传进来月份天数 推断每一天对应周几
     * @param {*} day
     */
    getAllWeekDay(dateYear, dateMounth) {
      const day = new Date(dateYear, dateMounth, 0).getDate()
      const getDate = new Date().getDate()
      let list = []
      for (let dayIndex = 1; dayIndex <= day; dayIndex++) {
        const timeStamp = new Date(dateYear, dateMounth - 1, dayIndex).getTime()
        const getWeekDay = new Date(timeStamp).getDay()
        const custtomeDate = new Date(
          dateYear,
          dateMounth - 1,
          dayIndex
        ).getTime()
        const customeSetDate = new Date(custtomeDate).toLocaleString()
        const dateInstance = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          getDate
        ).toLocaleString()
        list.push({
          timeStamp,
          dateLocalString: new Date(timeStamp).toLocaleDateString(),
          isToday: customeSetDate === dateInstance,
          dayIndex,
          [`当月第${dayIndex}天`]: dayIndex,
          周几: getWeekDay
        })
      }
      // 注意周日的情况 js 里面传的是 0
      const diff = list[0].周几 ? list[0].周几 : 7
      console.log({
        diff
      })
      // 补上月差值
      const prevList = this.getPrevMounthDay(
        dateYear,
        dateMounth
      ).OnByDiffGetList(diff - 1)

      return [...prevList, ...list]
    },

    renderInWeekByDate(year, mounth) {
      const { weekList } = this.getMounthDay(year, mounth)

      const len = this.dayTargetWeek.length
      const weekListLen = weekList.length
      for (let weekIndex = 0; weekIndex < len; weekIndex++) {
        const currentWeek = this.dayTargetWeek[weekIndex]

        for (let index = 0; index < weekListLen; index++) {
          const currentWeekList = weekList[index]

          if (currentWeek.dateTargetDay === currentWeekList.周几) {
            currentWeek.setShowData.push(currentWeekList)
          }
        }
      }
    },

    /**
     * 获取当月多少天
     */
    getMounthDay(year, mounth) {
      console.log({
        传递进来: year,
        mounth
      })
      // 拿到所有天数对应的周几
      const weekList = this.getAllWeekDay(year, mounth)

      return {
        weekList
      }
    },

    initShowPage() {
      this.dayTargetWeek.forEach((item) => {
        item.setShowData = []
      })
    },

    /**
     * 控制画面的方法 year  mounth date
     */
    initSetYMD(mark) {
      this.initShowPage()
      let year = this.year
      let mounth = this.mounth
      if (mark === 'prev') {
        mounth = mounth -= 1
        if (mounth <= 0) {
          year -= 1
        }
        mounth = mounth <= 0 ? 12 : mounth
      } else if (mark === 'next') {
        mounth = mounth += 1
        if (mounth > 12) {
          year += 1
        }
        mounth = mounth > 12 ? 1 : mounth
      } else {
        year = new Date().getFullYear()
        mounth = new Date().getMonth() + 1
      }

      const date = this.date
      this.year = year
      this.mounth = mounth
      this.date = date

      return {
        year,
        mounth,
        date
      }
    },

    /**
     * 上个月
     */
    onPrevMonth() {
      const { year, mounth, date } = this.initSetYMD('prev')
      this.renderInWeekByDate(year, mounth)
    },

    /**
     * 当月
     */
    onCurrentMonth() {
      const { year, mounth, date } = this.initSetYMD()
      this.renderInWeekByDate(year, mounth)
    },

    /**
     * 下个月
     */
    onNextMonth() {
      const { year, mounth, date } = this.initSetYMD('next')
      this.renderInWeekByDate(year, mounth)
    }
  }
}
</script>

<template>
  <div class="date-picker">
    <h1>日期选择</h1>
    <p>
      <span> 当前年份{{ year }} </span>
      <span> 当前月份{{ mounth }}</span>
      <span> 当前日期 {{ date }}</span>
    </p>
    <h2>
      <button @click="onPrevMonth">上个月</button>
      <button @click="onNextMonth">下个月</button>
      <button @click="onCurrentMonth">当前月</button>
    </h2>
    <div class="grid-box">
      <div class="column-container">
        <template v-for="(item, index) in dayTargetWeek">
          <div class="column-item">
            <div class="top">{{ item.text }}</div>
            <template v-for="(date, idx) in item.setShowData">
              <div
                :class="[
                  {
                    'prev-month': date.mark === 'prevMounth'
                  },
                  {
                    isToday: date.isToday
                  }
                ]"
                class="calender-item"
                :title="date.dateLocalString"
              >
                <div class="column-index-mid">
                  {{ date.dayIndex }}
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid-box {
  display: grid;
  place-items: center;
}
.column-container {
  display: flex;

  .calender-item {
    padding: 15px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-2px);
      background-color: #eee;
    }
  }

  .prev-month {
    color: #999;
    pointer-events: none;
  }

  .isToday {
    color: red;
    border: 1px solid;
  }
}
</style>
