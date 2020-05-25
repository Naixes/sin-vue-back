<template>
  <div class="s-uploader">
      <div @click="upload">
        <slot></slot>
      </div>
      <ol>
          <li v-for="file in fileList" :key="file.name">
              <s-icon v-if="file.status === 'uploading'" class="s-uploader-loading" name="loading"></s-icon>
              <img v-if="file.type.indexOf('image') === 0 && file.status === 'success'" :src="file.url" :alt="file.name">
              <span :class="{fail: file.status === 'fail'}">{{file.name}}</span>
          </li>
      </ol>
      <div ref="temp" style="display:none;"></div>
  </div>
</template>

<script>
import SIcon from './icon'
import http from './http'

export default {
  name: '',
  components: {SIcon},
  props: {
    name: {
        type: String, 
        required: true
    },
    action: {
        type: String,
        required: true
    },
    method: {
        type: String, 
        default: 'POST'
    },
    parseResponse: {
        type: Function, 
        required: true
    },
    fileList: {
        type: Array, default: () => []
    },
    sizeLimit: {
        type: Number
    }
  },
  data() { 
    return {
        url: 'about:blank'
    }
  },
  methods: {
    upload() {
        let input = this.createInput()
        input.addEventListener('change', (e) => {
            let files = Array.from(input.files)
            this.uploadFiles(files)
            input.remove()
        })
        input.click()
    },
    uploadFiles(rowFiles) {
        // 重新命名重复文件的名字
        let newNames = []
        for (let index = 0; index < rowFiles.length; index++) {
            const rowFile = rowFiles[index];
            const {name} = rowFile
            newNames[index] = this.generateName(name)
        }
        // 校验上传文件，更新上传列表
        if(!this.beforeUpload(rowFiles, newNames)) {
            return
        }
        rowFiles.forEach((file, index) => {
            let formData = new FormData()
            formData.append(this.name, file)
            console.log(formData)
            this.doUploadFiles(formData, res => {
                let url = this.parseResponse(res)
                this.url = url
                // 更新上传列表：增加url，修改状态
                this.afterUploadFiles(newNames[index], url)
            }, xhr => {
                this.uploadError(xhr, newNames[index])
            })
        })
    },
    uploadError(xhr, name) {
        let file = this.fileList.filter(f => f.name === name)[0]
        let index = this.fileList.indexOf(file)
        let fileCopy = JSON.parse(JSON.stringify(file))
        fileCopy.status = 'fail'
        let fileListCopy = [...this.fileList]
        fileListCopy.splice(index, 1, fileCopy)
        this.$emit('update:fileList', fileListCopy)
        let error = ''
        if(xhr.status === 0) {
            error = '网络错误'
        }
        this.$emit('error', error)
    },
    doUploadFiles(formData, success, fail) {
        console.log('http')
        http[this.method.toLowerCase()](this.action, {success, fail, data: formData})
    },
    // 更新上传列表：增加url，修改状态
    afterUploadFiles(name, url) {
        let file = this.fileList.filter(f => f.name === name)[0]
        let index = this.fileList.indexOf(file)
        let fileCopy = JSON.parse(JSON.stringify(file))
        fileCopy.url = url
        fileCopy.status = 'success'
        let fileListCopy = [...this.fileList]
        fileListCopy.splice(index, 1, fileCopy)
        this.$emit('update:fileList', fileListCopy)
    },
    // 重新命名重复文件的名字
    generateName(name) {
        while(this.fileList.filter(f => f.name === name).length > 0) {
            let dotIndex = name.lastIndexOf('.')
            let nameWithoutExtension = name.substring(0, dotIndex)
            let extension = name.substring(dotIndex)
            name = nameWithoutExtension + '(1)' + extension
        }
        return name
    },
    // 校验上传文件，更新上传列表
    beforeUpload(rowFiles, newNames) {
        rowFiles.forEach(file => {
            if(file.size > this.sizeLimit) {
                this.$emit('erroe', `文件不能超过${this.sizeLimit}`)
                return false
            }
        });
        let x = rowFiles.map((file, i) => {
            let {type, size} = file
            return {name: newNames[i], type, size, status: 'uploading'}
        })
        this.$emit('update:fileList', [...this.fileList, ...x])
        return true
    },
    createInput() {
        this.$refs.temp.innerHTML = ''
        let input = document.createElement('input')
        input.accept = "image/png"
        input.type = "file"
        input.multiple = true
        this.$refs.temp.appendChild(input)
        return input
    }
  }
 }
</script>

<style lang="scss" scoped>
  @import "var";
.s-uploader {
    .fail {
        color: $red;
    }
    &-loading {
      @include spin;
    }
}
</style>