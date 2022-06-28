<template>
  <div class="color-config">
    <h3>颜色编辑器</h3>

    <template
      :key="index"
      v-for="(item, index) in colorConfig"
    >
      <p><span class="option-name">{{ item.name }}:</span> <input @change="onConfigChange" v-model="form[item.value]"
                                                                  type="color"></p>
    </template>

    <div class="config-btn-wrap">
      <button @click="onSaveColorConfig">保存颜色配置到本地</button>
    </div>
  </div>
</template>

<script>
import ColorService from './ColorService'

const colorService = new ColorService()
export default {
  name: 'ColorPannel',

  data () {
    const colorConfig = [
      {
        name: '主题背景颜色',
        value: 'main-body-color'
      },
      {
        name: '螺旋桨颜色',
        value: 'screw-color'
      },
      {
        name: '螺旋桨边框颜色',
        value: 'screw-border-color'
      },
      {
        name: '机翼背景颜色',
        value: 'wing-color'
      },
      {
        name: '机舱颜色',
        value: 'engine-color'
      },
      {
        name: '字体颜色',
        value: 'engine-text-color'
      }
    ]
    return {
      form: {},
      colorConfig
    }
  },

  created () {
    this.init()
  },

  methods: {
    onConfigChange () {
      this.EmitterColor('color-config-change', this.form)
    },

    EmitterColor (event, config) {
      this.$emit(event, config)
    },

    init () {
      const oColor = this.getColorConfig()
      if (oColor) {
        this.form = oColor
        this.EmitterColor('color-config-change', this.form)
      }
    },

    getColorConfig () {
      return colorService.getColorByLocal()
    },

    onSaveColorConfig () {
      if (!(Object.keys(this.form).length)) {
        for (const key in this.colorConfig) {
          this.form[this.colorConfig[key].value] = '#000'
        }
      }
      colorService.saveLocation(this.form)
    }
  }
}
</script>

<style scoped lang="scss">
@import "./css/colorPanel";
</style>
