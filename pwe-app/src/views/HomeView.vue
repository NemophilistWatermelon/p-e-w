<template>
  <div class="home">
    <input type="file" @input="onInputFileAction" />
    <div id="container" />
  </div>
</template>

<script>
import { defaultOptions, renderAsync } from 'docx-preview'

export default {
  name: 'HomeView',
  data() {
    return {
      vHtml: '',
      wordURL: '' //文件地址
    }
  },
  methods: {
    onInputFileAction(event) {
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
    }
  }
}
</script>
