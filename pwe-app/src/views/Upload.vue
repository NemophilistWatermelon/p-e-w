<template>
<div class="upload-container">
  <p>
    <input type="file"
           ref="oFile"
    >
  </p>

  <p>
    <progress value="0" ref="progress"></progress>
  </p>

  <p>
    <button @click="onUpload">开始上传</button>
  </p>

  <div
    style="width:400px;height:300px"
  >
    <video
      style="width:100%; height: 100%"
      autoplay
      v-if="videoSrc"
      controls
      :src="videoSrc"
      ref="video">
    </video>
  </div>

</div>
</template>

<script>
import axios from 'axios'
const CHUNK_SIZE = 64 * 1024
// eslint-disable-next-line no-unused-vars
const UPLOAD_PATH = 'http://localhost:3000/upload/video'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Upload',

  data () {
    return {
      fileData: [],
      videoShow: false,
      videoSrc: ''
    }
  },

  methods: {
    delay (delay) {
      return new Promise(resolve => {
        setTimeout(_ => {
          resolve()
        }, delay)
      })
    },

    createVideoUrl (o) {
      this.videoSrc = o.src
    },

    async createFileChunk (file, size = CHUNK_SIZE) {
      let cur = 0
      const oProgress = this.$refs.progress
      const fileSize = file.size
      oProgress.max = fileSize
      const fileName = new Date().getTime() + '_' + file.name
      let result = ''
      while (cur < fileSize) {
        const fileChunk = file.slice(cur, cur + size)
        const o = {
          name: file.name,
          size: fileSize,
          fileName: fileName,
          file: fileChunk,
          curChunkSize: cur
        }
        const form = this.uploadFormBody(o)
        try {
          result = await this.uploadAction(form)
        } catch (e) {
          console.log('错了' + e)
        }
        cur += fileChunk.size
        oProgress.value = cur
      }
      console.log('上传完毕', result)
      this.createVideoUrl({
        src: result.data.url
      })
    },

    async uploadAction (formBody) {
      try {
        const data = await axios.post(UPLOAD_PATH, formBody)
        console.log('data', data)
        if (data.data.status === 'failed') {
          axios.isCancel(data.data.msg)
        }
        return await data
      } catch (e) {
        console.log('上传失败:', e)
      }
    },

    uploadFormBody (o) {
      const form = new FormData()
      form.append('name', o.name)
      form.append('file', o.file)
      form.append('curChunkSize', o.curChunkSize)
      form.append('fileName', o.fileName)
      form.append('size', o.size)
      return form
    },

    onUpload () {
      const oFile = this.$refs.oFile
      this.createFileChunk(oFile.files[0])
    }
  }
}
</script>

<style scoped>

</style>
