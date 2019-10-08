<template>
    <div class="tinymce-editor">
        <editor v-model="myValue"
                :init="init"
                :disabled="disabled"
                @onClick="onClick">
        </editor>
    </div>
</template>

<script>
    import tinymce from 'tinymce/tinymce'
    import Editor from '@tinymce/tinymce-vue'
    import 'tinymce/themes/silver/theme'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/media'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/searchreplace'
    import 'tinymce/plugins/code'

    import {uploadImage} from '@/api/login'

    export default {
        components: {
            Editor
        },
        props: {
            //传入一个value，使组件支持v-model绑定
            value: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            plugins: {
                type: [String, Array],
                default: 'lists image media table wordcount link searchreplace code'
            },
            toolbar1: {
                type: [String, Array],
                default: 'styleselect fontsizeselect fontselect | forecolor backcolor | searchreplace bold italic underline strikethrough |'
            },
            toolbar2: {
                type: [String, Array],
                default: 'undo redo | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent table blockquote | link unlink image media code | removeformat'
            }
        },
        data() {
            return {
                //初始化配置
                imageType:['image/jpeg','image/png'],
                init: {
                    language_url: '/tinymce/langs/zh_CN.js',
                    language: 'zh_CN',
                    skin_url: '/tinymce/skins/ui/oxide',
                    height: 500,
                    plugins: this.plugins,
                    toolbar1: this.toolbar1,
                    toolbar2: this.toolbar2,
                    branding: false,
                    menubar: false,
                    //此处为图片上传处理函数
                    images_upload_handler: (blobInfo, success, failure) => {
                        if (blobInfo.blob().size > (50*1024)) {
                            failure('文件体积过大')
                        }
                        if (this.imageType.indexOf(blobInfo.blob().type) >= 0) {
                            let formData = new FormData();
                            // 服务端接收文件的参数名，文件数据，文件名
                            formData.append('file', blobInfo.blob(), blobInfo.filename());
                            uploadImage(formData).then((res) => {
                                // 这里返回的是你图片的地址
                                // console.log(res);
                                success(res.data)
                            }).catch(() => {
                                failure('上传失败')
                            })
                        } else {
                            failure('图片格式错误')
                        }
                        // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
                        // success(img)
                    }
                },
                myValue: this.value
            }
        },
        mounted() {
            tinymce.init({})
        },
        methods: {
            //添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
            //需要什么事件可以自己增加
            onClick(e) {
                this.$emit('onClick', e, tinymce)
            },
            //可以添加一些自己的自定义事件，如清空内容
            clear() {
                this.myValue = ''
            }
        },
        watch: {
            value(newValue) {
                this.myValue = newValue
            },
            myValue(newValue) {
                this.$emit('input', newValue)
            }
        }
    }

</script>
<style scoped>
</style>
