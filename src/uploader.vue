<template>
  <div class="s-uploader">
      <div @click="upload">
        <slot></slot>
      </div>
      <ol class="s-uploader-list">
          <li v-for="file in fileList" :key="file.name">
            <s-icon v-if="file.status === 'uploading'" class="s-uploader-loading" name="loading"></s-icon>
            <template v-else>
                <!-- 类型为图片时显示缩略图 -->
                <img class="s-uploader-image" height="32" width="32" v-if="file.type.indexOf('image') === 0 && file.status === 'success'" :src="file.url" :alt="file.name">
                <div v-else class="s-uploader-defaultImage"></div>
            </template>
            <span class="s-uploader-name" :class="{[file.status]: file.status}">{{file.name}}</span>
            <span class="s-uploader-remove" @click="onRemove(file)">删除</span>
          </li>
      </ol>
      <!-- 用来存放临时的 file input -->
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
    accept: {
        type: String,
        default: 'image/*'
    },
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
    // 解析函数：解析后台返回的字符串，返回url
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
    onRemove(file) {
        const result = window.confirm('确认删除嘛？')
        if(result) {
            let newList = this.fileList.filter(f => f.name !== file.name)
            this.$emit('update:fileList', newList)
        }
    },
    upload() {
        let input = this.createFileInput()
        input.addEventListener('change', (e) => {
            let files = Array.from(input.files)
            this.uploadFiles(files)
            input.remove()
        })
        input.click()
    },
    createFileInput() {
        this.$refs.temp.innerHTML = ''
        let input = document.createElement('input')
        input.accept = this.accept
        input.type = "file"
        input.multiple = true
        this.$refs.temp.appendChild(input)
        return input
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
                this.$emit('error', `文件不能超过${this.sizeLimit}`)
                return false
            }
        });
        let files = rowFiles.map((file, i) => {
            let {type, size} = file
            return {name: newNames[i], type, size, status: 'uploading'}
        })
        this.$emit('update:fileList', [...this.fileList, ...files])
        return true
    },
    doUploadFiles(formData, success, fail) {
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
  }
 }
</script>

<style lang="scss" scoped>
@import "var";
.s-uploader {
    &-name {
        margin-right: auto;
        &.fail {
            color: $red;
        }
        &.success {
            color: $green;
        }
    }
    &-remove {
        color: $red;
        font-size: 12px;
        margin-right: 8px;
        cursor: pointer;
    }
    &-loading {
        @include spin;
        width: 14px;
        margin: 17px;
        height: 14px;
    }
    &-list {
        list-style: none;
        padding: 0;
        >li {
            border: 1px solid $border-color-lighter;
            display: flex;
            align-items: center;
            margin: 8px 0;
        }
    }
    &-defaultImage {
        border: 1px solid $red;
        width: 32px;
        height: 32px;
        padding: 8px;
    }
    &-image {
        padding: 8px;
    }
}
</style>