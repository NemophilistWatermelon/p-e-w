<style lang="scss">
$color: rgba(11, 114, 2, 0.877);
.dimensional_text {
  font-size: 8em;
  font-weight: bold;
  color: #099217;
  text-shadow: 0px 5px 0px $color, 0px 7px 0px $color, 0px 8px 0px $color,
    0px 9px 0px $color, 0px 10px 0px $color, 0px 11px 0px $color,
    0px 12px 0px $color, 0px 13px 0px $color, 0px 14px 0px $color,
    0px 15px 0px $color, 0px 16px 0px $color, 0px 17px 0px $color,
    0px 18px 0px $color, 0px 19px 0px $color, 0px 20px 0px $color,
    0px 21px 0px $color, 0px 22px 0px $color, 0px 23px 0px $color,
    0px 24px 0px $color, 0px 25px 0px $color, 0px 26px 0px $color,
    0px 27px 0px $color, 0px 28px 0px $color, 0px 29px 0px $color,
    0px 30px 0px $color, 0px 31px 0px $color, 0px 32px 0px $color,
    0px 33px 0px $color, 0px 34px 0px $color, 0px 35px 0px $color;
}
</style>

<template>
  <div class="home">
    <h1>word 预览</h1>
    <input type="file" @input="onChangeWordUpload" />
    <div id="container" />

    <h2>excel</h2>
    <input type="file" @input="onChangeExcelUpload" />
    <div>keys: {{ excelKeys }}</div>
    <div>{{ excelData }}</div>
    <hr>

  </div>
</template>

<script>
// word 文档预览插件
import { defaultOptions, renderAsync } from 'docx-preview'
// excel 解析插件
import xlsx from 'xlsx'
import { ref } from 'vue'
export default {
  name: 'HomeView',
  data() {
    return {
      vHtml: '',
      wordURL: '', //文件地址,
      excelData: {},
      excelKeys: [],
      textInput: '秦凯'
    }
  },
  setup() {
    var abc = ref()
    console.log(abc)
  },
  methods: {
    onChangeWordUpload(event) {
      const file = event.target.files[0]
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file, 'utf-8')
      fileReader.onload = function (args) {
        console.log(args.target.result)
        renderAsync(
          args.target.result,
          document.getElementById('container'),
          null,
          {
            className: 'docx', // 默认和文档样式类的类名/前缀
            inWrapper: true, // 启用围绕文档内容渲染包装器
            ignoreWidth: false, // 禁止页面渲染宽度
            ignoreHeight: false, // 禁止页面渲染高度
            ignoreFonts: false, // 禁止字体渲染
            breakPages: true, // 在分页符上启用分页
            ignoreLastRenderedPageBreak: true, //禁用lastRenderedPageBreak元素的分页
            experimental: true, //启用实验性功能（制表符停止计算）
            trimXmlDeclaration: true, //如果为真，xml声明将在解析之前从xml文档中删除
            debug: false // 启用额外的日志记录
          }
        )
      }
    },

    onChangeExcelUpload(event) {
      const file = event.target.files[0]
      const fileReader = new FileReader()
      // readAsArrayBuffer 方法将文件内容读取到ArrayBuffer对象中
      // readAsBinaryString 方法将文件内容读取到二进制字符串中
      fileReader.readAsBinaryString(file, 'utf-8')
      var me = this
      console.log(me)
      fileReader.onload = function (args) {
        console.log(args.target.result)
        var data = args.target.result
        console.log(data.length)
        // 根据读的调用方法传递type 配置类型
        var workbook = xlsx.read(data, { type: 'binary' })
        var sheetNames = workbook.SheetNames // 工作表名称集合
        var worksheet = workbook.Sheets[sheetNames[0]]
        var excelData = xlsx.utils.sheet_to_json(worksheet)
        console.log(excelData) //最终解析xlsx格式的文件得出来的数据
        me.excelKeys = Object.keys(excelData[0])
        me.excelData = JSON.parse(JSON.stringify(excelData, null, 4))
      }
    }
  }
}
</script>
