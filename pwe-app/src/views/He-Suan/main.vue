<template>
  <div class="grid-container"
       :style="{backgroundColor: formColor['main-body-color'] || ''}"
  >

    <!--    颜色配置器-->
    <ColorPannel
      @color-config-change="onColorChange"
    />

    <!--    螺旋桨-->
    <div class="vue-text">
      <div :style="{
              backgroundColor: formColor['screw-color'] || '',
              borderColor: formColor['screw-border-color'] || ''
            }"
           class="v"></div>
      <div  :style="{
              backgroundColor: formColor['screw-color'] || '',
              borderColor: formColor['screw-border-color'] || ''
            }"
            class="v l"></div>
    </div>

    <!--    推进器-->
    <div class="vue-wing"
         :style="{backgroundColor: formColor['wing-color'] || ''}"
    ></div>
    <div class="vue-wing right"
         :style="{backgroundColor: formColor['wing-color'] || ''}"
    ></div>

    <div class="he-suan-wrap"
         :style="{backgroundColor: formColor['engine-color'] || '', color: formColor['engine-text-color']}"
    >
      <p>保质机</p>
      <p>上次做的时间： <input @change='onCalcuDateFrom' :disabled="isDisabled" type="datetime-local" v-model="startTime"></p>
      <P>当前时间：{{ currentDate }}</P>
      <p>已过： {{ result }} (小时)</p>
      <p>距离 保质期到期(72h) 剩余进度：： {{ parseInt(72 - result) }}
      </p>
      <p>
        <progress max="72" :value="result"></progress>
      </p>
    </div>
  </div>
</template>

<script>
import HeSuanService from './HeSuanService'
import ColorPannel from '@/views/He-Suan/ColorPannel'

const HesuanService = new HeSuanService()
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'main.vue',
  components: { ColorPannel },
  data () {
    return {
      // 业务相关变量
      result: 0,
      startTime: '',
      currentDate: '',
      // 是否已经选择过了时间
      isDisabled: false,

      // 颜色控制相关变量
      formColor: {}
    }
  },

  created () {
    this.startDelay()
    this.startWebWorker()
  },

  methods: {
    // 配置相关代码
    onColorChange (form) {
      console.log('form', form)
      this.formColor = form
      console.log(this.formColor)
    },

    // 业务相关代码
    startWebWorker () {
      const worker = new Worker('./repeatTimeWorker.js')
      console.log(worker)
      worker.onmessage = args => {
        this.currentDate = args.data || ''
        if (args.data) {
          this.isDisabled = true
        }
      }
    },

    startDelay () {
      setTimeout(_ => {
        this.startDelay()
        this.onInit()
      }, 5000)
    },

    onInit () {
      // 从缓存里面读取自己已经存过的时间
      const localTime = HesuanService.getTime()
      if (localTime) {
        this.result = this.cacuAciton(localTime)
        this.startTime = localTime
      }
    },

    cacuAciton (timeStr) {
      return HesuanService.startAndNow(timeStr)
    },

    onCalcuDateFrom () {
      HesuanService.cacheTime(this.startTime)
      this.result = this.cacuAciton(this.startTime)
    }
  }

}
</script>

<style scoped lang="scss">
@import "./css/main.scss";
</style>
